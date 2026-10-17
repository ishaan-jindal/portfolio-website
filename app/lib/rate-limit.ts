import { NextRequest } from "next/server";

type RateLimitConfig = {
  // Namespace so separate limiters (contact, admin login) don't share buckets
  name: string;
  windowMs: number;
  max: number;
};

type RateLimitResult =
  | { allowed: true; retryAfterSeconds: number }
  | { allowed: false; retryAfterSeconds: number };

// In-memory sliding window, keyed by client IP.
// Note: on serverless platforms (Vercel) this is per-instance, so it guards
// against casual spam/brute force but not distributed abuse. For stronger
// protection use an external counter (e.g. Vercel KV / Upstash Redis).
const buckets = new Map<string, number[]>();

export function getClientIp(req: NextRequest): string {
  // Trust model: on Vercel the edge sets x-forwarded-for to the verified
  // client IP (spoofed values are overwritten — verified live). On other
  // hosts, only trust this header behind a proxy that strips client input.
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return req.headers.get("x-real-ip") ?? "unknown";
}

export function rateLimit(
  req: NextRequest,
  { name, windowMs, max }: RateLimitConfig
): RateLimitResult {
  const key = `${name}:${getClientIp(req)}`;
  const now = Date.now();

  const windowStart = now - windowMs;
  const timestamps = (buckets.get(key) ?? []).filter((t) => t > windowStart);

  if (timestamps.length >= max) {
    buckets.set(key, timestamps);
    const retryAfterSeconds = Math.max(
      Math.ceil((timestamps[0] + windowMs - now) / 1000),
      1
    );
    return { allowed: false, retryAfterSeconds };
  }

  timestamps.push(now);
  buckets.set(key, timestamps);

  // Opportunistic cleanup to avoid unbounded growth
  if (buckets.size > 10_000) {
    for (const [k, ts] of buckets) {
      if (ts[ts.length - 1] < windowStart) buckets.delete(k);
    }
  }

  return { allowed: true, retryAfterSeconds: 0 };
}
