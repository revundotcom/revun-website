import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import { getIntegrationIcon } from '@/lib/integration-icons'
import {
  LeasingIcon,
  RentIcon,
  MaintenanceIcon,
  TenantScreeningIcon,
  FinancialReportingIcon,
  CommunicationsIcon,
  SignUpIcon,
  ConnectPropertiesIcon,
  GoLiveIcon,
} from '@/lib/feature-icons'
import { PlatformHero } from '@/components/blocks/platform-hero'
import { PlatformModules } from '@/components/blocks/platform-modules'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildSoftwareApplicationSchema, buildBreadcrumbSchema, buildHowToSchema } from '@/lib/schema-builders'

export const metadata: Metadata = {
  title: 'Platform',
  description:
    'Revun brings owner workflows, tenant management, vendor coordination, compliance, payments, and communications into one platform. The operating system for property management.',
  alternates: { canonical: buildCanonicalUrl('/platform') },
  openGraph: {
    title: 'Platform | Revun',
    description:
      'The operating system for property management. See how every module connects.',
    url: buildCanonicalUrl('/platform'),
  },
}

/* ── Data ──────────────────────────────────────────────────────────────────── */

const modules = [
  {
    title: 'Leasing & Applications',
    description:
      'Listings, showings, screening, offers, and lease execution. From vacancy to signed lease, automated.',
    icon: LeasingIcon,
    span: 'md:col-span-2',
    accent: true,
  },
  {
    title: 'Rent Collection & Payments',
    description:
      'ACH, credit card, and Interac. Automated reminders, split payments, and real-time reconciliation.',
    icon: RentIcon,
    span: 'md:col-span-1',
    accent: false,
  },
  {
    title: 'Maintenance Management',
    description:
      'Work orders, dispatch, proof of work, vendor payments. Full lifecycle visibility.',
    icon: MaintenanceIcon,
    span: 'md:col-span-1',
    accent: false,
  },
  {
    title: 'Tenant Screening',
    description:
      'Credit, criminal, and eviction checks through Equifax and TransUnion. Results in minutes.',
    icon: TenantScreeningIcon,
    span: 'md:col-span-1',
    accent: false,
  },
  {
    title: 'Financial Reporting',
    description:
      'Owner statements, P&L, cash flow, and tax-ready reports. QuickBooks and Xero sync.',
    icon: FinancialReportingIcon,
    span: 'md:col-span-1',
    accent: false,
  },
  {
    title: 'Communications',
    description:
      'Email, SMS, calling, and in-app messaging. Every conversation in context.',
    icon: CommunicationsIcon,
    span: 'md:col-span-2',
    accent: true,
  },
] as const

const steps = [
  {
    step: '01',
    title: 'Sign Up',
    description:
      'Create your account in under 2 minutes. No credit card required for Free plan.',
    icon: SignUpIcon,
  },
  {
    step: '02',
    title: 'Connect Properties',
    description:
      'Add your properties, import tenant data, and connect your existing tools.',
    icon: ConnectPropertiesIcon,
  },
  {
    step: '03',
    title: 'Go Live',
    description:
      'Start managing. Leasing, payments, maintenance, and reporting from day one.',
    icon: GoLiveIcon,
  },
] as const

const integrations = [
  'QuickBooks',
  'Xero',
  'Stripe',
  'Plaid',
  'Twilio',
  'SendGrid',
  'DocuSign',
  'Certn',
  'Equifax',
  'TransUnion',
  'Zapier',
  'Google Workspace',
]

/* ── Page ──────────────────────────────────────────────────────────────────── */

export default function PlatformPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(buildSoftwareApplicationSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(buildBreadcrumbSchema([
            { name: 'Home', url: 'https://revun.com/' },
            { name: 'Platform', url: 'https://revun.com/platform/' },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(buildHowToSchema({
            name: 'How to Get Started with Revun Property Management',
            description: 'Set up your property management account in three streamlined steps.',
            steps: [
              { name: 'Sign Up', text: 'Create your account in under 2 minutes. No credit card required for Free plan.' },
              { name: 'Connect Properties', text: 'Add your properties, import tenant data, and connect your existing tools.' },
              { name: 'Go Live', text: 'Start managing. Leasing, payments, maintenance, and reporting from day one.' },
            ],
          })),
        }}
      />

      {/* ── Hero ── */}
      <PlatformHero />

      {/* ── Core Modules ── */}
      <PlatformModules />

      {/* ── How It Works ── */}
      <section className="bg-[#F5F6F8] py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll className="mb-10 text-center" stagger={0.12}>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              How It Works
            </p>
            <h2 className="font-heading text-3xl font-bold text-[#2C2E33] md:text-4xl">
              Live in <span className="text-[#176FEB]">three</span> steps
            </h2>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.1}>
            <div className="grid gap-8 md:grid-cols-3">
              {steps.map((s) => {
                const Icon = s.icon
                return (
                  <div
                    key={s.step}
                    className="rounded-2xl border border-[#E5E7EB] bg-white p-8 hover:border-[#176FEB]/40"
                  >
                    <span className="mb-4 block font-mono text-sm font-semibold text-[#176FEB]">
                      Step {s.step}
                    </span>
                    <div className="mb-5">
                      <Icon className="h-12 w-12" />
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

      {/* ── Integrations ── */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll className="mb-10 text-center" stagger={0.12}>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              Ecosystem
            </p>
            <h2 className="font-heading text-3xl font-bold text-[#2C2E33] md:text-4xl">
              Connects to <span className="text-[#176FEB]">40+</span> tools
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[#555860]">
              Revun integrates with the accounting, payment, screening, and
              communication tools you already use.
            </p>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.06}>
            <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {integrations.map((name) => {
                const Logo = getIntegrationIcon(name)
                return (
                  <div
                    key={name}
                    className="flex h-20 flex-col items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] bg-white text-sm font-medium text-[#555860] hover:border-[#176FEB]/40 hover:shadow-sm transition-all"
                  >
                    <Logo className="h-8 w-8 shrink-0" />
                    <span className="text-xs font-semibold">{name}</span>
                  </div>
                )
              })}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/integrations/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#176FEB] transition-colors hover:text-[#1259c1]"
              >
                View all integrations
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#F5F6F8] py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll stagger={0.12}>
            <h2 className="font-heading text-4xl font-extrabold tracking-tight text-[#0A1628] md:text-5xl">
              See the full <span className="text-[#176FEB]">platform</span> in action
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-[#555860]">
              Whether you manage 10 units or 10,000, Revun scales with your
              operation. Get a walkthrough from our team.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/demo/"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-[#176FEB] px-8 text-base font-semibold text-white transition-colors hover:bg-[#1259c1]"
              >
                Book a Demo
              </Link>
              <Link
                href="/signup/"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E5E7EB] px-8 text-base font-semibold text-[#0A1628] transition-colors hover:bg-white"
              >
                Start Free
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}
