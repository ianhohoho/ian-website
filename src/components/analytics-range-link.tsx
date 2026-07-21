"use client";

import Link, { useLinkStatus } from "next/link";
import { LoaderCircle } from "lucide-react";

interface AnalyticsRangeLinkProps {
  days: number;
  active: boolean;
}

function AnalyticsRangeLinkContent({ days }: { days: number }) {
  const { pending } = useLinkStatus();

  return (
    <>
      {pending && (
        <LoaderCircle
          aria-hidden="true"
          className="h-3.5 w-3.5 animate-spin"
        />
      )}
      <span>{days} days</span>
      <span className="sr-only" aria-live="polite">
        {pending ? `Loading ${days}-day analytics` : ""}
      </span>
    </>
  );
}

export function AnalyticsRangeLink({ days, active }: AnalyticsRangeLinkProps) {
  return (
    <Link
      href={`/analytics?range=${days}`}
      className={`inline-flex min-w-[5.5rem] items-center justify-center gap-2 rounded-full border px-4 py-2 text-xs transition-colors ${
        active
          ? "border-primary/40 bg-primary/10 text-primary"
          : "border-border text-muted-foreground hover:border-primary/30 hover:text-primary"
      }`}
    >
      <AnalyticsRangeLinkContent days={days} />
    </Link>
  );
}
