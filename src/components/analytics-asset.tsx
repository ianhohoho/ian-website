"use client";

import { useEffect, useRef, type ReactNode } from "react";
import posthog from "posthog-js";

type AssetType = "article" | "blog" | "project" | "side_quest";

interface AnalyticsAssetProps {
  assetType: AssetType;
  assetName: string;
  assetId: string;
  children: ReactNode;
  className?: string;
}

export function AnalyticsAsset({
  assetType,
  assetName,
  assetId,
  children,
  className,
}: AnalyticsAssetProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) return;

    let isVisible = false;
    let hasBeenViewed = false;
    let activeStartedAt: number | null = null;
    let activeMilliseconds = 0;
    let captured = false;

    const pause = () => {
      if (activeStartedAt === null) return;
      activeMilliseconds += performance.now() - activeStartedAt;
      activeStartedAt = null;
    };

    const resume = () => {
      if (isVisible && !document.hidden && activeStartedAt === null) {
        activeStartedAt = performance.now();
      }
    };

    const captureView = () => {
      if (captured || !hasBeenViewed) return;
      captured = true;
      pause();

      const activeSeconds = Math.round(activeMilliseconds / 100) / 10;
      if (activeSeconds < 1) return;

      posthog.capture("asset_viewed", {
        asset_type: assetType,
        asset_name: assetName,
        asset_id: assetId,
        active_seconds: activeSeconds,
      }, {
        transport: "sendBeacon",
        send_instantly: true,
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.5;
        if (isVisible) hasBeenViewed = true;
        if (isVisible) resume();
        else pause();
      },
      { threshold: [0, 0.5, 1] }
    );

    const handleVisibilityChange = () => {
      if (document.hidden) pause();
      else resume();
    };

    const handleClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest("a");
      if (!link) return;

      posthog.capture("asset_opened", {
        asset_type: assetType,
        asset_name: assetName,
        asset_id: assetId,
        link_label: link.textContent?.trim() || "Open",
        target_url: link.href,
      });
    };

    observer.observe(element);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    element.addEventListener("click", handleClick);
    window.addEventListener("pagehide", captureView);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      element.removeEventListener("click", handleClick);
      window.removeEventListener("pagehide", captureView);
      captureView();
    };
  }, [assetId, assetName, assetType]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
