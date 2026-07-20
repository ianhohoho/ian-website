import type { DailyTraffic } from "@/lib/posthog-analytics";

interface TrafficChartProps {
  data: DailyTraffic[];
}

const WIDTH = 720;
const HEIGHT = 240;
const PADDING = { top: 18, right: 18, bottom: 38, left: 44 };

function shortDate(date: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(
    new Date(`${date}T00:00:00Z`)
  );
}

export function TrafficChart({ data }: TrafficChartProps) {
  const plotWidth = WIDTH - PADDING.left - PADDING.right;
  const plotHeight = HEIGHT - PADDING.top - PADDING.bottom;
  const maximum = Math.max(1, ...data.map((point) => point.views));
  const x = (index: number) =>
    PADDING.left + (index / Math.max(1, data.length - 1)) * plotWidth;
  const y = (value: number) => PADDING.top + plotHeight - (value / maximum) * plotHeight;
  const path = data
    .map((point, index) => `${index === 0 ? "M" : "L"} ${x(index)} ${y(point.views)}`)
    .join(" ");
  const labelIndexes = Array.from(
    new Set([0, Math.floor((data.length - 1) / 2), data.length - 1])
  );
  const gridValues = [0, 0.5, 1].map((ratio) => Math.round(maximum * ratio));
  const useBars = data.length <= 7;
  const barWidth = Math.max(8, (plotWidth / Math.max(1, data.length)) * 0.55);

  return (
    <figure>
      <figcaption className="mb-5">
        <h2 className="text-lg font-semibold text-foreground">Page views over time</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Daily page views; the analytics page itself is excluded.
        </p>
      </figcaption>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label="Daily page views"
        className="h-auto w-full overflow-visible text-primary"
      >
        {gridValues.map((value) => (
          <g key={value}>
            <line
              x1={PADDING.left}
              x2={WIDTH - PADDING.right}
              y1={y(value)}
              y2={y(value)}
              className="stroke-border"
              strokeWidth="1"
            />
            <text
              x={PADDING.left - 10}
              y={y(value) + 4}
              textAnchor="end"
              className="fill-muted-foreground text-[11px]"
            >
              {value}
            </text>
          </g>
        ))}

        {useBars ? (
          data.map((point, index) => (
            <rect
              key={point.date}
              x={x(index) - barWidth / 2}
              y={y(point.views)}
              width={barWidth}
              height={Math.max(1, PADDING.top + plotHeight - y(point.views))}
              rx="2"
              fill="currentColor"
            >
              <title>{`${shortDate(point.date)}: ${point.views} views`}</title>
            </rect>
          ))
        ) : (
          <>
            <path
              d={path}
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {data.map((point, index) => (
              <circle
                key={point.date}
                cx={x(index)}
                cy={y(point.views)}
                r="3"
                fill="hsl(var(--background))"
                stroke="currentColor"
                strokeWidth="2"
              >
                <title>{`${shortDate(point.date)}: ${point.views} views`}</title>
              </circle>
            ))}
          </>
        )}

        {labelIndexes.map((index) => (
          <text
            key={data[index]?.date ?? index}
            x={x(index)}
            y={HEIGHT - 10}
            textAnchor={index === 0 ? "start" : index === data.length - 1 ? "end" : "middle"}
            className="fill-muted-foreground text-[11px]"
          >
            {data[index] ? shortDate(data[index].date) : ""}
          </text>
        ))}
      </svg>
    </figure>
  );
}
