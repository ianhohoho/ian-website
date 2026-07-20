"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";

function canCapture() {
  return Boolean(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN);
}

export function AnalyticsPageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!canCapture() || pathname.startsWith("/analytics")) return;

    let activeStartedAt = document.hidden ? null : performance.now();
    let activeMilliseconds = 0;
    let captured = false;

    const pause = () => {
      if (activeStartedAt === null) return;
      activeMilliseconds += performance.now() - activeStartedAt;
      activeStartedAt = null;
    };

    const resume = () => {
      if (activeStartedAt === null && !document.hidden) {
        activeStartedAt = performance.now();
      }
    };

    const capture = () => {
      if (captured) return;
      captured = true;
      pause();

      const durationSeconds = Math.round(activeMilliseconds / 100) / 10;
      if (durationSeconds < 1) return;

      posthog.capture("page_engagement", {
        path: pathname,
        duration_seconds: durationSeconds,
      }, {
        transport: "sendBeacon",
        send_instantly: true,
      });
    };

    const handleVisibilityChange = () => {
      if (document.hidden) pause();
      else resume();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", capture);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", capture);
      capture();
    };
  }, [pathname]);

  return null;
}
