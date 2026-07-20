"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ANALYTICS_COOKIE_NAME,
  createAnalyticsSessionToken,
  verifyAnalyticsPassword,
} from "@/lib/analytics-auth";

export async function signInToAnalytics(formData: FormData) {
  const password = formData.get("password");

  if (typeof password !== "string" || !verifyAnalyticsPassword(password)) {
    redirect("/analytics?error=invalid-password");
  }

  const token = createAnalyticsSessionToken();
  if (!token) redirect("/analytics?error=not-configured");

  const cookieStore = await cookies();
  cookieStore.set(ANALYTICS_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/analytics",
    maxAge: 60 * 60 * 12,
  });

  redirect("/analytics");
}

export async function signOutOfAnalytics() {
  const cookieStore = await cookies();
  cookieStore.set(ANALYTICS_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/analytics",
    maxAge: 0,
  });

  redirect("/analytics");
}
