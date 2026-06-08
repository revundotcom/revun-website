import { NextResponse } from 'next/server'
import { z } from 'zod/v4'
import { getClientIp, isRateLimited } from '@/lib/rate-limit'
import { sendLead } from '@/lib/email'

const NO_STORE = { 'cache-control': 'no-store' } as const

const demoSchema = z.object({
  name: z.string().min(2).max(200),
  email: z.email(),
  phone: z.string().min(7).max(40),
  company: z.string().min(1).max(200),
  units: z.string().max(40),
  role: z.string().max(80),
})

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request)
    if (isRateLimited(ip, { windowMs: 60_000, max: 5, key: 'demo' })) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429, headers: NO_STORE })
    }

    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Invalid request body.' }, { status: 400, headers: NO_STORE })
    }

    const parsed = demoSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid form data. Please check your inputs and try again.' }, { status: 400, headers: NO_STORE })
    }

    await sendLead('demo', parsed.data)

    return NextResponse.json({ message: 'Thanks. Our team will reach out to schedule your demo within one business day.' }, { status: 200, headers: NO_STORE })
  } catch {
    return NextResponse.json({ error: 'Something went wrong. Please try again later.' }, { status: 500, headers: NO_STORE })
  }
}
