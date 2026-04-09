import crypto from 'crypto'
import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

function timingSafeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    // Compare against self to spend constant time, then return false
    crypto.timingSafeEqual(Buffer.from(a), Buffer.from(a))
    return false
  }
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b))
}

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-sanity-webhook-secret')
  const expected = process.env.SANITY_WEBHOOK_SECRET

  if (!expected || !secret || !timingSafeCompare(secret, expected)) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const type = typeof body?._type === 'string' ? body._type.replace(/[^a-zA-Z0-9._-]/g, '') : null

    if (type) {
      revalidateTag(type, 'max')
    }

    return NextResponse.json({ revalidated: true, type: type || null })
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Revalidation error:', err)
    }
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}
