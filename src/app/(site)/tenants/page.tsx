import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  LayoutDashboard,
  CreditCard,
  Wrench,
  FileText,
  MessageSquare,
  UserCheck,
  ShieldCheck,
  Eye,
  Search,
  ClipboardCheck,
  Home,
  Heart,
} from 'lucide-react'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema, buildWebPageSchema } from '@/lib/schema-builders'

export const metadata: Metadata = {
  title: 'Tenants | Your Complete Rental Portal | Revun',
  description:
    'Browse listings, apply online, pay rent, submit maintenance requests, communicate securely with your property team, and access all your documents — all in one place.',
  alternates: { canonical: buildCanonicalUrl('/tenants') },
  openGraph: {
    title: 'Tenants | Your Complete Rental Portal | Revun',
    description:
      'One secure portal for your entire rental experience. Payments, maintenance, documents, and communications in one place.',
    url: buildCanonicalUrl('/tenants'),
  },
}

/* ── Data ──────────────────────────────────────────────────────────────── */

const features = [
  {
    title: 'Tenant Portal',
    description:
      'A single dashboard for your entire rental life. View lease details, upcoming payments, maintenance status, and messages — all in one place.',
    icon: LayoutDashboard,
  },
  {
    title: 'Secure Payments',
    description:
      'Pay rent online via ACH, credit card, Interac, or PAD. Set up autopay, view payment history, and get instant receipts.',
    icon: CreditCard,
  },
  {
    title: 'Maintenance Requests',
    description:
      'Submit maintenance requests with photos, track progress in real time, and get notified when work is completed. No more chasing by phone.',
    icon: Wrench,
  },
  {
    title: 'Document Access',
    description:
      'Access your lease, move-in checklist, notices, and receipts anytime. Everything is stored securely and available on demand.',
    icon: FileText,
  },
  {
    title: 'Private Communications',
    description:
      'Message your property team directly through the platform. No need to share personal phone numbers or rely on scattered emails.',
    icon: MessageSquare,
  },
  {
    title: 'Application & Screening',
    description:
      'Apply for rentals online with a streamlined application. Upload documents, consent to screening, and track your application status.',
    icon: UserCheck,
  },
] as const

const trustPoints = [
  {
    title: 'No sharing personal phone numbers',
    description: 'All communications happen through the platform. Your personal contact information stays private.',
    icon: ShieldCheck,
  },
  {
    title: 'No chasing by text',
    description: 'Structured communication channels mean no random texts or calls. Everything is organized and documented.',
    icon: MessageSquare,
  },
  {
    title: 'Clear maintenance reporting',
    description: 'Submit requests with photos, get status updates, and see exactly when work is scheduled and completed.',
    icon: ClipboardCheck,
  },
  {
    title: 'Real records',
    description: 'Every payment, every request, every communication is logged. You always have a verifiable record.',
    icon: FileText,
  },
  {
    title: 'Secure payments',
    description: 'Bank-level encryption on every transaction. PCI-compliant processing. Your financial data is protected.',
    icon: CreditCard,
  },
  {
    title: 'Encrypted messaging',
    description: 'All messages between you and your property team are encrypted in transit and at rest.',
    icon: Eye,
  },
] as const

const steps = [
  {
    step: '01',
    title: 'Browse',
    description: 'Explore verified listings with photos, pricing, amenities, and availability. Filter by location, price, and features.',
    icon: Search,
  },
  {
    step: '02',
    title: 'Apply',
    description: 'Submit your application online. Upload documents, consent to screening, and track your status in real time.',
    icon: ClipboardCheck,
  },
  {
    step: '03',
    title: 'Move In',
    description: 'Sign your lease digitally, complete your move-in checklist, set up payments, and get access to your tenant portal.',
    icon: Home,
  },
  {
    step: '04',
    title: 'Live',
    description: 'Pay rent, submit maintenance requests, access documents, and communicate with your property team — all from one place.',
    icon: Heart,
  },
]

/* ── Page ──────────────────────────────────────────────────────────────── */

export default function TenantsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Tenants', url: 'https://revun.com/tenants/' },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildWebPageSchema({
              name: 'Tenants',
              description: 'One secure portal for your entire rental experience.',
              url: 'https://revun.com/tenants/',
            })
          ),
        }}
      />

      {/* ── Hero ── */}
      <section className="bg-[#F5F6F8]">
        <div className="mx-auto max-w-4xl px-6 pt-24 pb-16 text-center">
          <RevealOnScroll>
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-[#176FEB]">
              For Tenants
            </p>
            <h1 className="font-display font-extrabold text-4xl leading-[1.1] tracking-tight text-[#0A1628] sm:text-5xl lg:text-6xl">
              One secure portal for your{' '}
              <span className="text-[#176FEB]">entire rental experience</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#555860]">
              Browse listings, apply online, pay rent, submit maintenance requests, communicate securely with your property team, and access all your documents — all in one place.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── What tenants get ── */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              Tenant Features
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] md:text-4xl">
              What tenants <span className="text-[#176FEB]">get</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[#555860]">
              Everything you need to manage your rental life, from application to move-out — accessible from any device.
            </p>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.08}>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => {
                const Icon = f.icon
                return (
                  <div
                    key={f.title}
                    className="rounded-2xl border border-[#D3D5DB] bg-white p-8 transition hover:border-[#176FEB]/40"
                  >
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F2FE]">
                      <Icon className="h-6 w-6 text-[#176FEB]" />
                    </div>
                    <h3 className="mb-2 font-heading text-lg font-bold text-[#2C2E33]">
                      {f.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#555860]">
                      {f.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Trust: Your privacy matters ── */}
      <section className="bg-[#F5F6F8] py-12">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              Privacy & Security
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] md:text-4xl">
              Your privacy <span className="text-[#176FEB]">matters</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[#555860]">
              Revun is built to protect tenants. Your personal information, financial data, and communications are secure by design.
            </p>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.08}>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {trustPoints.map((t) => {
                const Icon = t.icon
                return (
                  <div
                    key={t.title}
                    className="rounded-2xl border border-[#D3D5DB] bg-white p-8 transition hover:border-[#176FEB]/40"
                  >
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F2FE]">
                      <Icon className="h-6 w-6 text-[#176FEB]" />
                    </div>
                    <h3 className="mb-2 font-heading text-lg font-bold text-[#2C2E33]">
                      {t.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#555860]">
                      {t.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              Your Journey
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] md:text-4xl">
              How it <span className="text-[#176FEB]">works</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[#555860]">
              From browsing to living — four steps to your new home.
            </p>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.1}>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((s) => {
                const Icon = s.icon
                return (
                  <div
                    key={s.step}
                    className="rounded-2xl border border-[#D3D5DB] bg-white p-8"
                  >
                    <span className="mb-4 block font-mono text-sm font-semibold text-[#176FEB]">
                      Step {s.step}
                    </span>
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F2FE]">
                      <Icon className="h-6 w-6 text-[#176FEB]" />
                    </div>
                    <h3 className="mb-2 font-heading text-lg font-bold text-[#2C2E33]">
                      {s.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#555860]">
                      {s.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#F5F6F8] py-12">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <h2 className="font-heading font-extrabold text-4xl tracking-tight text-[#0A1628] md:text-5xl">
              Your property team may already use{' '}
              <span className="text-[#176FEB]">Revun</span>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-[#555860]">
              Ask your landlord or property manager if they use Revun. If they do, you already have access to a better rental experience.
            </p>
            <div className="mt-10">
              <Link
                href="/contact/"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#176FEB] px-8 text-base font-semibold text-white transition-colors hover:bg-[#1461d0]"
              >
                Get in Touch
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* AEO quick answer */}
      <p className="sr-only">
        Revun gives tenants a single secure portal for their entire rental experience. Tenants can browse listings, apply online, pay rent via ACH, credit card, Interac, or PAD, submit maintenance requests with photos, access lease documents and receipts, and communicate privately with their property team. All personal information and financial data is encrypted and protected.
      </p>
    </>
  )
}
