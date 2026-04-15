import crypto from 'crypto'
import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod/v4'
import { getClientIp, isRateLimited } from '@/lib/rate-limit'

/**
 * Constant-time string comparison. Short-circuits on length mismatch but
 * still spends constant time on that branch so an attacker can't probe
 * secret length via timing.
 */
function timingSafeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    crypto.timingSafeEqual(Buffer.from(a), Buffer.from(a))
    return false
  }
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b))
}

const bodySchema = z
  .object({
    _type: z
      .string()
      .min(1)
      .max(64)
      .regex(/^[a-zA-Z0-9._-]+$/, 'Invalid type'),
  })
  .passthrough()

const NO_STORE = { 'cache-control': 'no-store' } as const

export async function POST(request: NextRequest) {
  // Rate limit first so we don't spend CPU on crypto-compare for a flood
  // of unauth'd requests. Per-route namespace so contact form quota is
  // independent.
  const ip = getClientIp(request)
  if (isRateLimited(ip, { windowMs: 60_000, max: 30, key: 'revalidate' })) {
    return NextResponse.json(
      { message: 'Too many requests' },
      { status: 429, headers: NO_STORE },
    )
  }

  const secret = request.headers.get('x-sanity-webhook-secret')
  const expected = process.env.SANITY_WEBHOOK_SECRET

  if (!expected || !secret || !timingSafeCompare(secret, expected)) {
    return NextResponse.json(
      { message: 'Invalid secret' },
      { status: 401, headers: NO_STORE },
    )
  }

  try {
    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        { message: 'Invalid JSON' },
        { status: 400, headers: NO_STORE },
      )
    }

    const parsed = bodySchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { message: 'Invalid payload' },
        { status: 400, headers: NO_STORE },
      )
    }

    revalidateTag(parsed.data._type, 'max')
    return NextResponse.json(
      { revalidated: true, type: parsed.data._type },
      { headers: NO_STORE },
    )
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Revalidation error:', err)
    }
    return NextResponse.json(
      { message: 'Error revalidating' },
      { status: 500, headers: NO_STORE },
    )
  }
}
