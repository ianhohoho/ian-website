import posthog from "posthog-js";

const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

if (projectToken && posthogHost) {
  posthog.init(projectToken, {
    api_host: posthogHost,
    defaults: "2026-05-30",
    autocapture: false,
    capture_pageview: "history_change",
    capture_pageleave: true,
    disable_session_recording: true,
    person_profiles: "identified_only",
    persistence: "localStorage",
    respect_dnt: true,
    before_send: (event) => {
      const pathname = event?.properties?.$pathname;

      return typeof pathname === "string" && pathname.startsWith("/analytics")
        ? null
        : event;
    },
  });
}
