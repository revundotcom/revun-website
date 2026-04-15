import type { NextRequest } from 'next/server'

/**
 * Extract a best-effort client IP from request headers.
 *
 * Precedence matches how Vercel, Cloudflare, and generic reverse proxies
 * actually populate headers:
 *   1. cf-connecting-ip   (Cloudflare; single trusted IP)
 *   2. x-real-ip          (Nginx / many proxies)
 *   3. x-forwarded-for    (standard; first entry = original client)
 *
 * Callers MUST accept that upstream proxies can spoof these headers — this
 * is adequate for rate-limit bucketing, NOT for security-critical identity.
 */
export function getClientIp(request: Request | NextRequest): string {
  const headers = request.headers
  const cf = headers.get('cf-connecting-ip')
  if (cf) return cf.trim()
  const real = headers.get('x-real-ip')
  if (real) return real.trim()
  const forwarded = headers.get('x-forwarded-for')
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim()
    if (first) return first
  }
  return 'unknown'
}

interface RateLimitEntry {
  count: number
  resetAt: number
}

interface RateLimitOptions {
  /** Window size in milliseconds. Default 60s. */
  windowMs?: number
  /** Max requests allowed per IP per window. Default 5. */
  max?: number
  /** Namespace so different routes don't share a counter. Default 'default'. */
  key?: string
}

// Per-namespace stores. Keeps routes isolated so one abusive endpoint
// can't drain another's quota.
const stores = new Map<string, Map<string, RateLimitEntry>>()
const lastCleanup = new Map<string, number>()

/**
 * Simple in-memory per-IP rate limiter. Works fine for single-instance
 * Vercel deployments; swap for Upstash/Redis if scaling to multiple
 * regions or needing durable counters.
 */
export function isRateLimited(
  ip: string,
  { windowMs = 60_000, max = 5, key = 'default' }: RateLimitOptions = {},
): boolean {
  let store = stores.get(key)
  if (!store) {
    store = new Map()
    stores.set(key, store)
    lastCleanup.set(key, Date.now())
  }

  const now = Date.now()
  const last = lastCleanup.get(key) ?? now

  // Lazy GC: every 2 windows, purge expired entries. Avoids setInterval
  // (which blocks serverless shutdown) and bounds memory growth.
  if (now - last > windowMs * 2) {
    for (const [k, entry] of store) {
      if (now > entry.resetAt) store.delete(k)
    }
    lastCleanup.set(key, now)
  }

  const entry = store.get(ip)
  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + windowMs })
    return false
  }
  entry.count++
  return entry.count > max
}
