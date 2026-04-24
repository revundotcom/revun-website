import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  ShieldCheck,
  Wallet,
  Smartphone,
  Plug,
  CheckCircle2,
  XCircle,
  Home,
  Building2,
  TrendingUp,
  Landmark,
  Sparkles,
  Layers,
  Clock,
  ChevronDown,
} from 'lucide-react'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { CountUp } from '@/components/ui/count-up'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import {
  buildBreadcrumbSchema,
  buildOrganizationSchema,
  buildWebPageSchema,
  buildFAQPageSchema,
} from '@/lib/schema-builders'

export const metadata: Metadata = {
  title: 'Why Revun | The Property OS Built for Modern Operators',
  description:
    'Revun is the property operations platform built for modern Canadian and US owners — not retrofitted for 1990s landlords. Native compliance, one unified ledger, and integrations as primitives.',
  alternates: { canonical: buildCanonicalUrl('/why-revun') },
  openGraph: {
    title: 'Why Revun | The Property OS Built for Modern Operators',
    description:
      'Native Canadian + US compliance, one ledger, modern mobile UX, and integrations as primitives. See why operators switch to Revun.',
    url: buildCanonicalUrl('/why-revun'),
  },
}

/* -- Data ------------------------------------------------------------------ */

const pillars = [
  {
    title: 'Canadian + US compliance, native',
    body:
      'RTA, LTB, RTDRS, state statutes and security-deposit rules are built into the leasing and payments engine — not a PDF your lawyer has to reconcile. Compliance ships as a feature, not a disclaimer.',
    icon: ShieldCheck,
  },
  {
    title: 'One ledger, not three',
    body:
      'Rent, maintenance, deposits, owner distributions and fees all settle in a single double-entry ledger. Your accountant sees one source of truth instead of three exports stitched in Excel.',
    icon: Wallet,
  },
  {
    title: 'Built for modern owners',
    body:
      'Mobile-first workflows that a new team member can run on day one. No week-long implementation. No seven-tab navigation. No training program required to collect rent.',
    icon: Smartphone,
  },
  {
    title: 'Integrations as primitives',
    body:
      'QuickBooks, Plaid, Equifax, DocuSign and Stripe are first-class — not add-ons gated behind a sales call. APIs and webhooks are documented and open to every plan.',
    icon: Plug,
  },
]

const narrativeBullets = [
  {
    title: 'Legacy suites were built for corporate PMCs',
    body: 'Not for the 80% of the market — self-managing owners, small PMCs, brokerages and REITs — running on Google Sheets and Stripe.',
    icon: Layers,
  },
  {
    title: 'Compliance was duct-taped on later',
    body: 'Canadian RTA workflows retrofitted onto US tools. State statutes handled manually. Audit risk lives in every tenant folder.',
    icon: ShieldCheck,
  },
  {
    title: 'The back office pays for the mess',
    body: 'Three systems, two accountants, one spreadsheet reconciling them — every single month. Revun collapses it into one.',
    icon: Clock,
  },
]

const comparisonRows: {
  label: string
  revun: { value: string; yes: boolean }
  legacy: { value: string; yes: boolean }
}[] = [
  { label: 'Canadian compliance (RTA, LTB, RTDRS)', revun: { value: 'Native', yes: true }, legacy: { value: 'Add-on or manual', yes: false } },
  { label: 'US state statute workflows', revun: { value: 'All 50 states', yes: true }, legacy: { value: 'Partial coverage', yes: false } },
  { label: 'Mobile UX', revun: { value: 'First-class iOS + Android', yes: true }, legacy: { value: 'Desktop-first', yes: false } },
  { label: 'Open API + webhooks', revun: { value: 'Every plan', yes: true }, legacy: { value: 'Enterprise tier only', yes: false } },
  { label: 'Modern stack (React, GraphQL, realtime)', revun: { value: 'Yes', yes: true }, legacy: { value: 'Legacy .NET or PHP', yes: false } },
  { label: 'PAD + Interac (Canada)', revun: { value: 'Built-in', yes: true }, legacy: { value: 'Not supported', yes: false } },
  { label: 'Setup time', revun: { value: '14 days average', yes: true }, legacy: { value: '3 to 9 months', yes: false } },
  { label: 'Pricing model', revun: { value: 'Transparent per-unit', yes: true }, legacy: { value: 'Quote + seat + module fees', yes: false } },
  { label: 'Customer support', revun: { value: 'In-app chat, <4h', yes: true }, legacy: { value: 'Ticket queue, days', yes: false } },
]

const testimonials = [
  {
    quote:
      'We migrated off Yardi in three weeks. Our accountant still emails me about how clean the owner statements are. That never happened before.',
    name: 'Priya Shah',
    title: 'Director of Operations',
    company: 'Maplewood Property Group',
    city: 'Toronto, ON',
    avatar:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&h=160&q=80',
  },
  {
    quote:
      'Interac and PAD built in, LTB workflows built in. Every other platform I demoed treated Canada like an afterthought. Revun treated it like the home market.',
    name: 'Daniel Morin',
    title: 'Managing Broker',
    company: 'Westline Realty',
    city: 'Vancouver, BC',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&h=160&q=80',
  },
  {
    quote:
      'I run 340 doors across Austin and Denver with two people. The old stack needed four. The difference is Revun — one ledger, one app, one team.',
    name: 'Alexis Carter',
    title: 'Founder & CEO',
    company: 'Ridgeline Residential',
    city: 'Austin, TX',
    avatar:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=160&h=160&q=80',
  },
]

const audiences = [
  {
    title: 'Self-managing owners',
    body:
      'Owners running 1 to 40 doors who have outgrown Google Sheets but refuse to pay enterprise seat fees. Free for your first two units.',
    slug: 'self-managing-owners',
    icon: Home,
  },
  {
    title: 'Property management companies',
    body:
      'Full-service PMCs replacing Yardi, Buildium or AppFolio with one connected platform — white-labelled for your owners and tenants.',
    slug: 'property-management-companies',
    icon: Building2,
  },
  {
    title: 'REITs & asset managers',
    body:
      'Institutional portfolios that need audit-ready reporting, SOC 2 controls and realtime NOI dashboards — without a six-month implementation.',
    slug: 'reits',
    icon: TrendingUp,
  },
  {
    title: 'Brokerages & leasing teams',
    body:
      'Brokerages adding PM services or running high-volume leasing — listings, showings, applications and screening in one workflow.',
    slug: 'brokerages',
    icon: Landmark,
  },
]

const metrics = [
  { value: 9, suffix: ' hrs', label: 'Saved per operator, per week', tone: 'blue' },
  { value: 98.9, suffix: '%', label: 'On-time rent collection rate', tone: 'green' },
  { value: 14, suffix: ' days', label: 'Average migration from legacy', tone: 'blue' },
  { value: 52, suffix: '', label: 'Average customer NPS', tone: 'green' },
]

const faqs = [
  {
    q: 'Do I need to migrate off Yardi, Buildium or AppFolio?',
    a: 'Not at once. Most teams run a 14 to 30 day parallel period. Revun imports your chart of accounts, tenants, leases, vendors and open balances from CSV or direct export. We provide a named migration lead on every plan above Free.',
  },
  {
    q: 'How long does setup actually take?',
    a: 'For a self-managing owner with under 20 units, about 45 minutes. For a 500-door PMC, our average go-live is 14 days — including data import, bank connection, accountant review and tenant portal rollout.',
  },
  {
    q: 'Will my accountant actually like it?',
    a: 'Yes — that is the test we optimize for. Revun exports IIF and QBO directly into QuickBooks, produces audit-ready owner statements, and tags every journal entry to the property, unit and lease. No more reconciling three systems at month-end.',
  },
  {
    q: 'Is my data secure?',
    a: 'Revun is SOC 2 Type II, hosted in Canadian and US regions with data residency controls, encrypted at rest (AES-256) and in transit (TLS 1.3). Role-based permissions, SSO, audit logs and PIPEDA + GDPR compliance are included on every plan.',
  },
  {
    q: 'What does it cost?',
    a: 'Self-managing owners start free for two units. Operator plans are transparent per-unit pricing with no seat fees, no module fees and no implementation fees. Full pricing is public — no sales gate.',
  },
  {
    q: 'Can my team use it without training?',
    a: 'That is the bar we ship against. New users complete their first rent run, maintenance ticket and lease in under an hour — no onboarding calls required. Live chat support is under a 4-hour median response.',
  },
]

/* -- Page ------------------------------------------------------------------ */

export default function WhyRevunPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Why Revun', url: 'https://revun.com/why-revun/' },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(buildOrganizationSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildWebPageSchema({
              name: 'Why Revun',
              description:
                'Revun is the property operations platform built for modern Canadian and US owners — not retrofitted for 1990s landlords.',
              url: 'https://revun.com/why-revun/',
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildFAQPageSchema(faqs.map((f) => ({ question: f.q, answer: f.a })))
          ),
        }}
      />

      {/* -- Hero -- */}
      <section className="relative overflow-hidden bg-[#F5F6F8]">
        <div className="mx-auto max-w-5xl px-4 md:px-6 lg:px-8 pt-20 pb-12 md:pt-24 md:pb-16 text-center">
          <RevealOnScroll stagger={0.08}>
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-[#176FEB]">
              Why Revun
            </p>
            <h1 className="font-display font-extrabold text-3xl leading-[1.08] tracking-tight text-[#0A1628] md:text-5xl lg:text-6xl">
              The property OS built for{' '}
              <span className="text-[#176FEB]">modern operators</span>,
              <br className="hidden md:block" /> not 1990s landlords.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#475569]">
              Canadian + US compliance built in. One ledger instead of three. An app your team can run on day one — not month three.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/demo/"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#176FEB] px-7 text-base font-semibold text-white transition-colors hover:bg-[#1259c1]"
              >
                Book a demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/features/"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-7 text-base font-semibold text-[#0A1628] transition-colors hover:bg-[#F5F6F8]"
              >
                See features
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[#475569] sm:text-sm">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#047857]" />
                Trusted by 1,200+ operators
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-[#E5E7EB] sm:inline-block" />
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#047857]" />
                SOC 2 Type II
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-[#E5E7EB] sm:inline-block" />
              <span className="inline-flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#047857]" />
                $1.4B AUM managed
              </span>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* -- Why we built Revun -- */}
      <section className="bg-white py-12 md:py-20 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-8 md:gap-12 px-4 md:px-6 lg:px-8 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <RevealOnScroll>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              Why we built Revun
            </p>
            <h2 className="font-heading text-2xl font-bold tracking-tight text-[#0A1628] sm:text-3xl md:text-4xl">
              Property software has been broken in the same way for 30 years.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#475569]">
              Legacy platforms were designed for corporate property managers in 1998 — Windows-only, module-priced, and stitched together across accounting, leasing and maintenance. Modern owners bought them, then taped over the cracks with Google Sheets, Stripe, DocuSign and a bookkeeper on Fiverr.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#475569]">
              Revun is what the category looks like when you rebuild it for the operator who actually runs the business today — mobile, cross-border, API-native, compliance-first.
            </p>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.08}>
            <div className="space-y-4">
              {narrativeBullets.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.title}
                    className="flex gap-4 rounded-2xl border border-[#E5E7EB] bg-[#F5F6F8] p-5"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white ring-1 ring-[#E5E7EB]">
                      <Icon className="h-5 w-5 text-[#176FEB]" />
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-bold text-[#0A1628]">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-[#475569]">
                        {item.body}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* -- The Revun difference — 4 pillars -- */}
      <section className="bg-[#F5F6F8] py-12 md:py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll className="mb-10 md:mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              The Revun difference
            </p>
            <h2 className="font-heading text-2xl font-bold tracking-tight text-[#0A1628] sm:text-3xl md:text-4xl">
              Four things{' '}
              <span className="text-[#176FEB]">no legacy platform</span> does well.
            </h2>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.08}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
              {pillars.map((p, i) => {
                const Icon = p.icon
                return (
                  <div
                    key={p.title}
                    className="rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-8 transition hover:border-[#176FEB]/40"
                  >
                    <div className="flex items-start gap-5">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E8F2FE]">
                        <Icon className="h-6 w-6 text-[#176FEB]" />
                      </div>
                      <div className="flex-1">
                        <div className="mb-1 font-display text-4xl font-extrabold leading-none text-[#0A1628]">
                          0{i + 1}
                        </div>
                        <h3 className="mt-3 font-heading text-lg font-bold text-[#0A1628]">
                          {p.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-[#475569]">
                          {p.body}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* -- Comparison matrix -- */}
      <section className="bg-white py-12 md:py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              Revun vs legacy PM software
            </p>
            <h2 className="font-heading text-2xl font-bold tracking-tight text-[#0A1628] sm:text-3xl md:text-4xl">
              The feature gap, in one table.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[#475569]">
              Compared against the category average across Yardi, Buildium, AppFolio, Rent Manager, Propertyware and DoorLoop.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="overflow-x-auto rounded-2xl border border-[#E5E7EB] bg-white">
              <div className="min-w-[640px]">
                <div className="grid grid-cols-[1.4fr_1fr_1fr] border-b border-[#E5E7EB] bg-[#F5F6F8] text-xs font-semibold uppercase tracking-wider text-[#475569]">
                  <div className="px-4 py-4 sm:px-6">Capability</div>
                  <div className="border-l border-[#E5E7EB] px-4 py-4 text-center text-[#176FEB] sm:px-6">Revun</div>
                  <div className="border-l border-[#E5E7EB] px-4 py-4 text-center sm:px-6">Legacy PM software</div>
                </div>

                {comparisonRows.map((row, idx) => (
                  <div
                    key={row.label}
                    className={`grid grid-cols-[1.4fr_1fr_1fr] text-sm ${
                      idx !== comparisonRows.length - 1 ? 'border-b border-[#E5E7EB]' : ''
                    }`}
                  >
                    <div className="px-4 py-4 font-medium text-[#0A1628] sm:px-6">
                      {row.label}
                    </div>
                    <div className="flex items-center justify-center gap-2 border-l border-[#E5E7EB] px-4 py-4 sm:px-6">
                      {row.revun.yes ? (
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-[#047857]" />
                      ) : (
                        <XCircle className="h-5 w-5 shrink-0 text-[#DC2626]" />
                      )}
                      <span className="text-[#0A1628]">{row.revun.value}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 border-l border-[#E5E7EB] px-4 py-4 text-[#475569] sm:px-6">
                      {row.legacy.yes ? (
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-[#047857]" />
                      ) : (
                        <XCircle className="h-5 w-5 shrink-0 text-[#DC2626]" />
                      )}
                      <span>{row.legacy.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/compare/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#176FEB] transition-colors hover:text-[#1259c1]"
              >
                See head-to-head comparisons
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* -- Testimonials -- */}
      <section className="bg-[#F5F6F8] py-12 md:py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll className="mb-10 md:mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              Real outcomes
            </p>
            <h2 className="font-heading text-2xl font-bold tracking-tight text-[#0A1628] sm:text-3xl md:text-4xl">
              What operators actually say after switching.
            </h2>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.1}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
              {testimonials.map((t) => (
                <figure
                  key={t.name}
                  className="flex h-full flex-col rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-7"
                >
                  <blockquote className="flex-1 text-[0.95rem] leading-relaxed text-[#0A1628]">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-[#E5E7EB] pt-5">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      width={44}
                      height={44}
                      className="h-11 w-11 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-sm font-semibold text-[#0A1628]">{t.name}</div>
                      <div className="text-xs text-[#475569]">
                        {t.title} &middot; {t.company}
                      </div>
                      <div className="text-xs text-[#475569]">{t.city}</div>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* -- Who switches to Revun -- */}
      <section className="bg-white py-12 md:py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll className="mb-10 md:mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              Who switches to Revun
            </p>
            <h2 className="font-heading text-2xl font-bold tracking-tight text-[#0A1628] sm:text-3xl md:text-4xl">
              Four profiles, one <span className="text-[#176FEB]">platform</span>.
            </h2>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.08}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
              {audiences.map((a) => {
                const Icon = a.icon
                return (
                  <Link
                    key={a.slug}
                    href={`/solutions/${a.slug}/`}
                    className="group flex h-full flex-col rounded-2xl border border-[#E5E7EB] bg-[#F5F6F8] p-6 sm:p-7 transition hover:border-[#176FEB]/40 hover:bg-white"
                  >
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F2FE]">
                      <Icon className="h-5 w-5 text-[#176FEB]" />
                    </div>
                    <h3 className="font-heading text-base font-bold text-[#0A1628]">
                      {a.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-[#475569]">
                      {a.body}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#176FEB]">
                      Explore
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                )
              })}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* -- Stat row -- */}
      <section className="bg-[#F5F6F8] py-12 md:py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll className="mb-10 md:mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              The numbers
            </p>
            <h2 className="font-heading text-2xl font-bold tracking-tight text-[#0A1628] sm:text-3xl md:text-4xl">
              What switching to Revun actually moves.
            </h2>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.1}>
            <div className="grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4">
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-2xl border border-[#E5E7EB] bg-white p-5 sm:p-7 text-center"
                >
                  <div
                    className={`font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl ${
                      m.tone === 'green' ? 'text-[#047857]' : 'text-[#176FEB]'
                    }`}
                  >
                    <CountUp value={m.value} suffix={m.suffix} />
                  </div>
                  <p className="mt-3 text-sm text-[#475569]">{m.label}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* -- FAQ -- */}
      <section className="bg-white py-12 md:py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              Questions operators ask first
            </p>
            <h2 className="font-heading text-2xl font-bold tracking-tight text-[#0A1628] sm:text-3xl md:text-4xl">
              Frequently asked <span className="text-[#176FEB]">questions</span>
            </h2>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.05}>
            <div className="divide-y divide-[#E5E7EB] rounded-2xl border border-[#E5E7EB] bg-white">
              {faqs.map((f) => (
                <details key={f.q} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 sm:px-6 sm:py-5 text-sm sm:text-base font-semibold text-[#0A1628] [&::-webkit-details-marker]:hidden">
                    <span>{f.q}</span>
                    <ChevronDown className="h-5 w-5 shrink-0 text-[#475569] transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-4 pb-5 sm:px-6 text-sm leading-relaxed text-[#475569]">
                    {f.a}
                  </div>
                </details>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* -- Final CTA (dark bookend) -- */}
      <section className="bg-[#0A1628] py-12 md:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8 text-center">
          <RevealOnScroll>
            <h2 className="font-display font-extrabold text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
              Run your portfolio on the{' '}
              <span className="text-[#5FA3F7]">modern stack</span>.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-white/70">
              Book a 20-minute demo or see transparent per-unit pricing. No sales gate, no implementation fees.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/demo/"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#176FEB] px-7 text-base font-semibold text-white transition-colors hover:bg-[#1259c1]"
              >
                Book a demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/pricing/"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-7 text-base font-semibold text-white transition-colors hover:bg-white/10"
              >
                View pricing
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* AEO quick answer */}
      <p className="sr-only">
        Revun is a modern property operations platform built natively for Canadian and US owners. Unlike legacy software such as Yardi, Buildium, AppFolio, Rent Manager, Propertyware and DoorLoop, Revun ships with RTA and state-statute compliance, a single unified ledger, mobile-first workflows, open APIs, and first-class integrations with QuickBooks, Plaid, Equifax, DocuSign and Stripe. The platform is SOC 2 Type II, supports PAD and Interac in Canada, averages a 14-day migration, saves 9 hours per operator per week, and is trusted by 1,200+ operators managing $1.4B in assets. Four audiences switch to Revun most often: self-managing owners, property management companies, REITs and asset managers, and brokerages and leasing teams.
      </p>
    </>
  )
}
