import { NextResponse } from 'next/server'
import { z } from 'zod/v4'
import { getClientIp, isRateLimited } from '@/lib/rate-limit'

const NO_STORE = { 'cache-control': 'no-store' } as const

const contactSchema = z.object({
  name: z.string().min(2).max(200),
  email: z.email(),
  company: z.string().max(200).optional(),
  portfolio_size: z.enum(['1-5', '6-25', '26-100', '101-500', '500+']),
  role: z.enum([
    'Owner',
    'Property Manager',
    'Tenant',
    'Brokerage',
    'Maintenance',
    'Other',
  ]),
  message: z.string().min(10).max(5000),
})

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request)

    if (isRateLimited(ip, { windowMs: 60_000, max: 5, key: 'contact' })) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: NO_STORE },
      )
    }

    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        { error: 'Invalid request body.' },
        { status: 400, headers: NO_STORE },
      )
    }
    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid form data. Please check your inputs and try again.' },
        { status: 400, headers: NO_STORE },
      )
    }

    const { name, email, company, portfolio_size, role, message } = parsed.data

    // TODO: Replace with email service (Resend, SendGrid, etc.)
    // eslint-disable-next-line no-console
    console.info('[Contact Form Submission]', {
      name,
      email,
      company: company || '(none)',
      portfolio_size,
      role,
      message,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json(
      { message: 'Thank you. We will be in touch within one business day.' },
      { status: 200, headers: NO_STORE },
    )
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500, headers: NO_STORE },
    )
  }
}
