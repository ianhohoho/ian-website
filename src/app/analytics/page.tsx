import type { Metadata } from "next";
import { Clock3, Database, Eye, LockKeyhole, LogOut, Users } from "lucide-react";
import { AnimateIn } from "@/components/animate-in";
import { AnalyticsRangeLink } from "@/components/analytics-range-link";
import { TrafficChart } from "@/components/traffic-chart";
import { getAllPosts } from "@/lib/blog";
import { getAllArticles, getAllProjects, getAllSideQuests } from "@/lib/content";
import {
  isAnalyticsAuthorized,
  isAnalyticsPasswordConfigured,
} from "@/lib/analytics-auth";
import {
  ANALYTICS_RANGES,
  getAnalyticsData,
  getMissingAnalyticsEnvironmentVariables,
  type AnalyticsData,
  type AnalyticsRange,
} from "@/lib/posthog-analytics";
import { signInToAnalytics, signOutOfAnalytics } from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Analytics",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
};

interface AnalyticsPageProps {
  searchParams: Promise<{ range?: string; error?: string }>;
}

function parseRange(value?: string): AnalyticsRange {
  const parsed = Number(value);
  return ANALYTICS_RANGES.includes(parsed as AnalyticsRange)
    ? (parsed as AnalyticsRange)
    : 30;
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en", { maximumFractionDigits: 0 }).format(value);
}

function formatDuration(seconds: number) {
  if (!seconds) return "—";
  if (seconds < 60) return `${Math.round(seconds)}s`;

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);
  return `${minutes}m ${remainingSeconds}s`;
}

function formatTimestamp(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function assetTypeLabel(type: string) {
  return type.replaceAll("_", " ");
}

function assetId(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

function completeAnalyticsData(data: AnalyticsData): AnalyticsData {
  const knownPages = [
    "/",
    "/about",
    "/blog",
    "/contact",
    "/portfolio",
    "/resume",
    ...getAllPosts().map((post) => `/blog/${post.slug}`),
  ];
  const pagesByPath = new Map(data.pages.map((page) => [page.path, page]));
  const knownAssets = [
    ...getAllPosts().map((post) => ({
      type: "blog",
      name: post.title,
      id: post.slug,
    })),
    ...getAllArticles().map((article) => ({
      type: "article",
      name: article.title,
      id: assetId(article.title),
    })),
    ...getAllProjects().map((project) => ({
      type: "project",
      name: project.title,
      id: assetId(project.title),
    })),
    ...getAllSideQuests().map((quest) => ({
      type: "side_quest",
      name: quest.title,
      id: assetId(quest.title),
    })),
  ];
  const assetsByKey = new Map(
    data.assets.map((asset) => [`${asset.type}:${asset.id}`, asset])
  );

  return {
    ...data,
    pages: Array.from(new Set([...knownPages, ...data.pages.map((page) => page.path)]))
      .map(
        (path) =>
          pagesByPath.get(path) ?? {
            path,
            views: 0,
            visitors: 0,
            averageActiveSeconds: 0,
          }
      )
      .sort((left, right) => right.views - left.views || left.path.localeCompare(right.path)),
    assets: [
      ...knownAssets.map(
        (asset) =>
          assetsByKey.get(`${asset.type}:${asset.id}`) ?? {
            ...asset,
            views: 0,
            visitors: 0,
            averageActiveSeconds: 0,
            opens: 0,
          }
      ),
      ...data.assets.filter(
        (asset) => !knownAssets.some((known) => known.type === asset.type && known.id === asset.id)
      ),
    ].sort((left, right) => right.views - left.views || left.name.localeCompare(right.name)),
  };
}

function pageLabel(path: string) {
  const fixedLabels = new Map([
    ["/", "Home"],
    ["/about", "About"],
    ["/blog", "Blog"],
    ["/contact", "Contact"],
    ["/portfolio", "Portfolio"],
    ["/resume", "Resume"],
  ]);
  const blogLabels = new Map(
    getAllPosts().map((post) => [`/blog/${post.slug}`, post.title])
  );

  return fixedLabels.get(path) ?? blogLabels.get(path) ?? path;
}

function ConfigurationRequired({ missing }: { missing: string[] }) {
  return (
    <div className="rounded-lg border border-border bg-card/60 p-6 card-glow">
      <div className="flex items-start gap-4">
        <Database className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <div>
          <h2 className="font-semibold text-foreground">Configuration required</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Add the remaining values to <code className="text-primary">.env.local</code>
            {" "}and the matching Vercel environment variables.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {missing.map((name) => (
              <code
                key={name}
                className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs text-primary"
              >
                {name}
              </code>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Login({ error, missing }: { error?: string; missing: string[] }) {
  const passwordConfigured = isAnalyticsPasswordConfigured();

  return (
    <div className="mx-auto flex min-h-[65vh] max-w-md items-center px-6 py-16">
      <div className="w-full">
        <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/5 text-primary shadow-[0_0_20px_hsl(var(--glow)/0.12)]">
          <LockKeyhole className="h-5 w-5" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="text-primary">$</span> Analytics
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Private site performance and content engagement.
        </p>

        <form action={signInToAnalytics} className="mt-8 space-y-4">
          <div>
            <label htmlFor="password" className="text-sm font-medium text-foreground">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              disabled={!passwordConfigured}
              className="mt-2 w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter analytics password"
            />
          </div>
          {error === "invalid-password" && (
            <p role="alert" className="text-sm text-primary">
              That password is incorrect.
            </p>
          )}
          <button
            type="submit"
            disabled={!passwordConfigured}
            className="w-full rounded-md border border-primary/30 bg-primary/5 px-4 py-3 text-sm font-medium text-primary transition-all hover:border-primary/50 hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Unlock dashboard
          </button>
        </form>

        {(!passwordConfigured || missing.length > 0) && (
          <div className="mt-8">
            <ConfigurationRequired
              missing={[
                ...(!passwordConfigured ? ["ANALYTICS_PASSWORD"] : []),
                ...missing,
              ]}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  description,
  icon: Icon,
}: {
  label: string;
  value: string;
  description: string;
  icon: typeof Eye;
}) {
  return (
    <div className="rounded-lg border border-border bg-card/60 p-5 card-glow hover:border-primary/30">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <p className="mt-3 text-3xl font-bold tracking-tight text-foreground">{value}</p>
      <p className="mt-2 text-xs text-muted-foreground">{description}</p>
    </div>
  );
}

function Dashboard({ data, range }: { data: AnalyticsData; range: AnalyticsRange }) {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="text-primary">$</span> Analytics
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Site traffic and content engagement for the last {range} days.
          </p>
        </div>
        <form action={signOutOfAnalytics}>
          <button
            type="submit"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <LogOut className="h-4 w-4" />
            Lock dashboard
          </button>
        </form>
      </div>

      <nav aria-label="Analytics date range" className="mt-8 flex gap-2">
        {ANALYTICS_RANGES.map((days) => (
          <AnalyticsRangeLink
            key={days}
            days={days}
            active={range === days}
          />
        ))}
      </nav>

      <AnimateIn className="mt-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            label="Page views"
            value={formatNumber(data.totalViews)}
            description="Every public route load"
            icon={Eye}
          />
          <MetricCard
            label="Visitors"
            value={formatNumber(data.uniqueVisitors)}
            description="Unique anonymous visitors"
            icon={Users}
          />
          <MetricCard
            label="Avg. active time"
            value={formatDuration(data.averageActiveSeconds)}
            description="Foreground time per page visit"
            icon={Clock3}
          />
          <MetricCard
            label="Asset views"
            value={formatNumber(data.totalAssetViews)}
            description="Content visible for at least one second"
            icon={Database}
          />
        </div>
      </AnimateIn>

      <AnimateIn delay={0.1} className="mt-8">
        <div className="rounded-lg border border-border bg-card/60 p-5 sm:p-6 card-glow">
          <TrafficChart data={data.dailyTraffic} />
        </div>
      </AnimateIn>

      <AnimateIn delay={0.2} className="mt-8">
        <section className="overflow-hidden rounded-lg border border-border bg-card/60 card-glow">
          <div className="border-b border-border px-5 py-4 sm:px-6">
            <h2 className="text-lg font-semibold text-foreground">Page performance</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Views, reach, and foreground engagement by route.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-5 py-3 font-medium sm:px-6">Page</th>
                  <th className="px-5 py-3 text-right font-medium">Views</th>
                  <th className="px-5 py-3 text-right font-medium">Visitors</th>
                  <th className="px-5 py-3 text-right font-medium sm:px-6">Avg. active</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {data.pages.length > 0 ? (
                  data.pages.map((page) => (
                    <tr key={page.path}>
                      <td className="px-5 py-4 sm:px-6">
                        <p className="font-medium text-foreground">{pageLabel(page.path)}</p>
                        <code className="mt-1 block text-xs text-muted-foreground">{page.path}</code>
                      </td>
                      <td className="px-5 py-4 text-right text-foreground">{formatNumber(page.views)}</td>
                      <td className="px-5 py-4 text-right text-foreground">{formatNumber(page.visitors)}</td>
                      <td className="px-5 py-4 text-right text-foreground sm:px-6">
                        {formatDuration(page.averageActiveSeconds)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-muted-foreground">
                      No page views in this date range yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </AnimateIn>

      <AnimateIn delay={0.3} className="mt-8">
        <section className="overflow-hidden rounded-lg border border-border bg-card/60 card-glow">
          <div className="border-b border-border px-5 py-4 sm:px-6">
            <h2 className="text-lg font-semibold text-foreground">Asset performance</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Blog cards, articles, projects, and side quests visible in the viewport.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-5 py-3 font-medium sm:px-6">Asset</th>
                  <th className="px-5 py-3 text-right font-medium">Views</th>
                  <th className="px-5 py-3 text-right font-medium">Visitors</th>
                  <th className="px-5 py-3 text-right font-medium">Avg. visible</th>
                  <th className="px-5 py-3 text-right font-medium sm:px-6">Opens</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {data.assets.length > 0 ? (
                  data.assets.map((asset) => (
                    <tr key={`${asset.type}:${asset.id}`}>
                      <td className="px-5 py-4 sm:px-6">
                        <p className="font-medium text-foreground">{asset.name}</p>
                        <span className="mt-1 inline-block rounded-full border border-primary/20 bg-primary/5 px-2 py-0.5 text-[10px] uppercase tracking-wider text-primary">
                          {assetTypeLabel(asset.type)}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right text-foreground">{formatNumber(asset.views)}</td>
                      <td className="px-5 py-4 text-right text-foreground">{formatNumber(asset.visitors)}</td>
                      <td className="px-5 py-4 text-right text-foreground">
                        {formatDuration(asset.averageActiveSeconds)}
                      </td>
                      <td className="px-5 py-4 text-right text-foreground sm:px-6">{formatNumber(asset.opens)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-muted-foreground">
                      No asset views in this date range yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </AnimateIn>

      <p className="mt-6 text-xs leading-5 text-muted-foreground">
        Updated {formatTimestamp(data.fetchedAt)}. Views honor browser Do Not Track;
        session recording and automatic element capture are disabled.
      </p>
    </div>
  );
}

export default async function AnalyticsPage({ searchParams }: AnalyticsPageProps) {
  const { range: rangeValue, error } = await searchParams;
  const missing = getMissingAnalyticsEnvironmentVariables();
  const authorized = await isAnalyticsAuthorized();

  if (!authorized) return <Login error={error} missing={missing} />;

  const range = parseRange(rangeValue);
  if (missing.length > 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="text-primary">$</span> Analytics
        </h1>
        <div className="mt-8">
          <ConfigurationRequired missing={missing} />
        </div>
      </div>
    );
  }

  try {
    const data = completeAnalyticsData(await getAnalyticsData(range));
    return <Dashboard data={data} range={range} />;
  } catch (analyticsError) {
    console.error("Unable to load PostHog analytics", analyticsError);

    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="text-primary">$</span> Analytics
        </h1>
        <div className="mt-8 rounded-lg border border-primary/30 bg-primary/5 p-6">
          <h2 className="font-semibold text-foreground">PostHog could not be reached</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Check the project ID, Query Read key, and regional API host, then refresh this page.
          </p>
        </div>
      </div>
    );
  }
}
