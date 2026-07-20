import "server-only";

export const ANALYTICS_RANGES = [7, 30, 90] as const;
export type AnalyticsRange = (typeof ANALYTICS_RANGES)[number];

export interface DailyTraffic {
  date: string;
  views: number;
  visitors: number;
}

export interface PageMetric {
  path: string;
  views: number;
  visitors: number;
  averageActiveSeconds: number;
}

export interface AssetMetric {
  type: string;
  name: string;
  id: string;
  views: number;
  visitors: number;
  averageActiveSeconds: number;
  opens: number;
}

export interface AnalyticsData {
  totalViews: number;
  uniqueVisitors: number;
  averageActiveSeconds: number;
  totalAssetViews: number;
  dailyTraffic: DailyTraffic[];
  pages: PageMetric[];
  assets: AssetMetric[];
  fetchedAt: string;
}

interface HogQLResponse {
  results?: unknown[][];
}

const REQUIRED_ENVIRONMENT_VARIABLES = [
  "NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN",
  "NEXT_PUBLIC_POSTHOG_HOST",
  "POSTHOG_PROJECT_ID",
  "POSTHOG_PERSONAL_API_KEY",
  "POSTHOG_API_HOST",
] as const;

export function getMissingAnalyticsEnvironmentVariables() {
  return REQUIRED_ENVIRONMENT_VARIABLES.filter((name) => !process.env[name]);
}

function getPostHogConfiguration() {
  const projectId = process.env.POSTHOG_PROJECT_ID;
  const personalApiKey = process.env.POSTHOG_PERSONAL_API_KEY;
  const apiHost = process.env.POSTHOG_API_HOST;

  if (!projectId || !personalApiKey || !apiHost) {
    throw new Error("PostHog analytics is not configured.");
  }

  return {
    projectId,
    personalApiKey,
    apiHost: apiHost.replace(/\/$/, ""),
  };
}

async function queryPostHog(query: string, name: string) {
  const { projectId, personalApiKey, apiHost } = getPostHogConfiguration();
  const response = await fetch(`${apiHost}/api/projects/${projectId}/query/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${personalApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: { kind: "HogQLQuery", query },
      name,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`PostHog query failed with status ${response.status}.`);
  }

  const payload = (await response.json()) as HogQLResponse;
  return payload.results ?? [];
}

function asString(value: unknown) {
  return typeof value === "string" ? value : String(value ?? "");
}

function asNumber(value: unknown) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function dayKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function fillDailyTraffic(rows: DailyTraffic[], days: AnalyticsRange) {
  const byDate = new Map(rows.map((row) => [row.date, row]));
  const today = new Date();
  const filled: DailyTraffic[] = [];

  for (let offset = days - 1; offset >= 0; offset -= 1) {
    const date = new Date(today);
    date.setUTCDate(today.getUTCDate() - offset);
    const key = dayKey(date);
    filled.push(byDate.get(key) ?? { date: key, views: 0, visitors: 0 });
  }

  return filled;
}

export async function getAnalyticsData(days: AnalyticsRange): Promise<AnalyticsData> {
  const dateFilter = `timestamp >= now() - INTERVAL ${days} DAY`;
  const publicPageFilter = `properties.$pathname != '' AND NOT startsWith(properties.$pathname, '/analytics')`;

  const [summaryRows, dailyRows, pageRows, pageTimeRows, assetRows, assetOpenRows] =
    await Promise.all([
      queryPostHog(
        `SELECT count() AS views, uniq(person_id) AS visitors
         FROM events
         WHERE event = '$pageview' AND ${dateFilter} AND ${publicPageFilter}`,
        `Website summary — ${days} days`
      ),
      queryPostHog(
        `SELECT toDate(timestamp) AS day, count() AS views, uniq(person_id) AS visitors
         FROM events
         WHERE event = '$pageview' AND ${dateFilter} AND ${publicPageFilter}
         GROUP BY day
         ORDER BY day ASC`,
        `Daily website traffic — ${days} days`
      ),
      queryPostHog(
        `SELECT properties.$pathname AS path, count() AS views, uniq(person_id) AS visitors
         FROM events
         WHERE event = '$pageview' AND ${dateFilter} AND ${publicPageFilter}
         GROUP BY path
         ORDER BY views DESC
         LIMIT 100`,
        `Page performance — ${days} days`
      ),
      queryPostHog(
        `SELECT properties.path AS path,
                avg(toFloat(properties.duration_seconds)) AS average_active_seconds,
                count() AS samples
         FROM events
         WHERE event = 'page_engagement' AND ${dateFilter}
         GROUP BY path
         LIMIT 100`,
        `Page active time — ${days} days`
      ),
      queryPostHog(
        `SELECT properties.asset_type AS asset_type,
                properties.asset_name AS asset_name,
                properties.asset_id AS asset_id,
                count() AS views,
                uniq(person_id) AS visitors,
                avg(toFloat(properties.active_seconds)) AS average_active_seconds
         FROM events
         WHERE event = 'asset_viewed' AND ${dateFilter}
         GROUP BY asset_type, asset_name, asset_id
         ORDER BY views DESC
         LIMIT 100`,
        `Asset performance — ${days} days`
      ),
      queryPostHog(
        `SELECT properties.asset_type AS asset_type,
                properties.asset_name AS asset_name,
                properties.asset_id AS asset_id,
                count() AS opens
         FROM events
         WHERE event = 'asset_opened' AND ${dateFilter}
         GROUP BY asset_type, asset_name, asset_id
         LIMIT 100`,
        `Asset opens — ${days} days`
      ),
    ]);

  const pageTimes = new Map(
    pageTimeRows.map((row) => [
      asString(row[0]),
      { average: asNumber(row[1]), samples: asNumber(row[2]) },
    ])
  );
  const assetOpens = new Map(
    assetOpenRows.map((row) => [
      `${asString(row[0])}:${asString(row[2])}`,
      asNumber(row[3]),
    ])
  );

  const pages = pageRows.map((row) => ({
    path: asString(row[0]),
    views: asNumber(row[1]),
    visitors: asNumber(row[2]),
    averageActiveSeconds: pageTimes.get(asString(row[0]))?.average ?? 0,
  }));

  const assets = assetRows.map((row) => {
    const type = asString(row[0]);
    const id = asString(row[2]);

    return {
      type,
      name: asString(row[1]),
      id,
      views: asNumber(row[3]),
      visitors: asNumber(row[4]),
      averageActiveSeconds: asNumber(row[5]),
      opens: assetOpens.get(`${type}:${id}`) ?? 0,
    };
  });

  const totalPageTimeSamples = Array.from(pageTimes.values()).reduce(
    (sum, item) => sum + item.samples,
    0
  );
  const averageActiveSeconds = totalPageTimeSamples
    ? Array.from(pageTimes.values()).reduce(
        (sum, item) => sum + item.average * item.samples,
        0
      ) / totalPageTimeSamples
    : 0;

  const dailyTraffic = fillDailyTraffic(
    dailyRows.map((row) => ({
      date: asString(row[0]),
      views: asNumber(row[1]),
      visitors: asNumber(row[2]),
    })),
    days
  );

  return {
    totalViews: asNumber(summaryRows[0]?.[0]),
    uniqueVisitors: asNumber(summaryRows[0]?.[1]),
    averageActiveSeconds,
    totalAssetViews: assets.reduce((sum, asset) => sum + asset.views, 0),
    dailyTraffic,
    pages,
    assets,
    fetchedAt: new Date().toISOString(),
  };
}
