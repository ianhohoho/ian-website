import "server-only";

import { createHash, createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ANALYTICS_COOKIE_NAME = "ian_analytics_access";

function getAnalyticsPassword() {
  return process.env.ANALYTICS_PASSWORD;
}

function hash(value: string) {
  return createHash("sha256").update(value).digest();
}

function safelyCompare(left: string, right: string) {
  return timingSafeEqual(hash(left), hash(right));
}

export function isAnalyticsPasswordConfigured() {
  return Boolean(getAnalyticsPassword());
}

export function verifyAnalyticsPassword(candidate: string) {
  const password = getAnalyticsPassword();
  return Boolean(password && safelyCompare(candidate, password));
}

export function createAnalyticsSessionToken() {
  const password = getAnalyticsPassword();
  if (!password) return null;

  return createHmac("sha256", password)
    .update("ian-analytics-session-v1")
    .digest("base64url");
}

export async function isAnalyticsAuthorized() {
  const expectedToken = createAnalyticsSessionToken();
  if (!expectedToken) return false;

  const cookieStore = await cookies();
  const token = cookieStore.get(ANALYTICS_COOKIE_NAME)?.value;
  return Boolean(token && safelyCompare(token, expectedToken));
}
