import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  CreditCard,
  Wrench,
  Shield,
  Layers,
  Database,
  Globe2,
  ClipboardList,
  Users,
  UserCheck,
  HardHat,
  LineChart,
  Lock,
  KeyRound,
  FileCheck2,
  ScrollText,
  ServerCog,
  Banknote,
  Mail,
  Sun,
  Coffee,
  Home,
  AlertTriangle,
  Plus,
  CheckCircle2,
  Clock,
  Building2,
  Sparkles,
} from 'lucide-react'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { CountUp } from '@/components/ui/count-up'
import { getIntegrationIcon } from '@/lib/integration-icons'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import {
  buildBreadcrumbSchema,
  buildHowToSchema,
  buildWebPageSchema,
} from '@/lib/schema-builders'

export const metadata: Metadata = {
  title: 'How Revun Works | Product Architecture & Daily Operator Workflow',
  description:
    'A visual tour of how Revun works. One ledger, one portal, one audit trail. See the end-to-end rent pipeline, the daily operator workflow, compliance posture, and every integration powering Canadian and US property operations.',
  alternates: { canonical: buildCanonicalUrl('/how-revun-works') },
  openGraph: {
    title: 'How Revun Works | Product Architecture & Daily Workflow',
    description:
      'A visual tour of the Revun architecture: one ledger, one portal, one audit trail. End-to-end rent pipeline, role-based experience, compliance posture, and 40+ integrations.',
    url: buildCanonicalUrl('/how-revun-works'),
  },
}

/* ── Data ──────────────────────────────────────────────────────────────── */

const kpis = [
  { value: 14, suffix: ' min', label: 'Median time to onboard a property' },
  { value: 37, suffix: '+', label: 'Certified integrations (CA + US)' },
  { value: 99.99, suffix: '%', label: 'Payments uptime, last 12 months' },
  { value: 2, prefix: 'SOC ', suffix: ' Type II', label: 'Security posture', raw: true },
] as const

const pillars = [
  {
    icon: Database,
    title: 'One ledger',
    description:
      'Every rent charge, late fee, vendor invoice, owner draw, and GL posting lives in a single double-entry ledger. No exports, no reconciliation wars, no orphaned transactions.',
  },
  {
    icon: Globe2,
    title: 'One portal',
    description:
      'Tenants, owners, vendors, and your team log into one branded portal. Every message, document, and payment is tied to a unit, a lease, and a user — not an inbox.',
  },
  {
    icon: ScrollText,
    title: 'One audit trail',
    description:
      'Who did what, when, and why — captured for every lease, notice, payment, and unit change. Built for SOC 2, PIPEDA, CCPA, and tribunal-ready documentation.',
  },
]

const timeline = [
  {
    time: '7:00 AM',
    icon: Sun,
    title: 'Tenant auto-pays rent',
    detail:
      'PAD, Interac e-Transfer, and ACH debits clear overnight. 342 payments posted to the ledger before you open the app.',
    badge: 'PAD / ACH',
  },
  {
    time: '9:15 AM',
    icon: Wrench,
    title: 'Maintenance ticket auto-routed',
    detail:
      'A tenant reports a leaking dishwasher via the portal. Revun classifies it as plumbing, dispatches the preferred vendor, and schedules a window.',
    badge: 'Auto-dispatch',
  },
  {
    time: '11:00 AM',
    icon: FileCheck2,
    title: 'Lease renewal generated',
    detail:
      'Three leases hit their 60-day window. Revun drafts province-specific renewal offers with the legal rent increase and sends them for e-signature.',
    badge: 'ON / BC / AB',
  },
  {
    time: '2:00 PM',
    icon: AlertTriangle,
    title: 'N4 / 3-Day notice drafted',
    detail:
      'A tenant is 14 days behind. Revun prepares a LTB-compliant N4 (Ontario) or a state-specific 3-Day Pay-or-Quit (US). You review, sign, serve.',
    badge: 'Compliance',
  },
  {
    time: '4:30 PM',
    icon: Mail,
    title: 'Owner statement emailed',
    detail:
      'Month-to-date P&L, rent roll, vacancy, and maintenance spend assembled and sent to every owner — with a signed PDF in their portal.',
    badge: 'Owner reporting',
  },
  {
    time: '5:00 PM',
    icon: ServerCog,
    title: 'QuickBooks synced',
    detail:
      'Today\'s journal entries stream to QuickBooks, Xero, or Sage Intacct. GL codes, classes, and entities reconcile automatically. Books close themselves.',
    badge: 'GL sync',
  },
  {
    time: '6:30 PM',
    icon: Coffee,
    title: 'You go home',
    detail:
      'Tomorrow\'s rent reminders, late-fee triggers, showing confirmations, and vendor check-ins are already queued. Revun works while you sleep.',
    badge: 'Autopilot',
  },
]

const flow = [
  {
    step: '01',
    icon: Users,
    title: 'Tenant',
    body: 'Tenant opens the portal on web or mobile, sees their balance, autopay status, and next charge.',
  },
  {
    step: '02',
    icon: Home,
    title: 'Portal',
    body: 'Payment captured with CVV, bank auth, or PAD agreement. Receipt issued instantly in-app and by email.',
  },
  {
    step: '03',
    icon: CreditCard,
    title: 'PAD / Interac / ACH',
    body: 'Revun routes the charge through Stripe, Flinks, Plaid, or Interac — whichever costs least and clears fastest.',
  },
  {
    step: '04',
    icon: Database,
    title: 'Revun ledger',
    body: 'Double-entry posting: debit cash-in-trust, credit tenant receivable. Tagged by unit, lease, owner, and entity.',
  },
  {
    step: '05',
    icon: ServerCog,
    title: 'GL export',
    body: 'Nightly sync to QuickBooks, Xero, Sage Intacct, or NetSuite. Classes and entities mapped one-to-one.',
  },
  {
    step: '06',
    icon: Banknote,
    title: 'Owner payout',
    body: 'Monthly distribution to each owner bank account, with a cryptographically signed statement attached.',
  },
]

const roles = [
  {
    icon: Building2,
    label: 'Landlord / PMC',
    color: '#176FEB',
    sees: [
      'Unified dashboard across every entity, portfolio, and region',
      'Real-time rent roll, occupancy, arrears, and maintenance SLA',
      'Owner statements, tribunal filings, and vendor AP queue',
    ],
    does: [
      'Approve leases, renewals, and price changes',
      'Dispatch maintenance and sign off on invoices',
      'Close the books with one click to QuickBooks / Xero',
    ],
  },
  {
    icon: UserCheck,
    label: 'Tenant',
    color: '#047857',
    sees: [
      'Balance, autopay status, next charge, and payment history',
      'Lease documents, move-in report, and renewal offers',
      'Maintenance ticket status and scheduled windows',
    ],
    does: [
      'Pay rent via PAD, Interac, ACH, or card',
      'Submit a maintenance request with photos in 20 seconds',
      'Sign a renewal or submit a notice to vacate',
    ],
  },
  {
    icon: HardHat,
    label: 'Vendor',
    color: '#B45309',
    sees: [
      'Assigned work orders with unit access and scope',
      'Tenant contact, preferred times, and past-work history',
      'Invoice status, approvals, and ACH payout schedule',
    ],
    does: [
      'Accept or decline jobs from mobile',
      'Upload proof-of-work photos and invoices',
      'Get paid by ACH or EFT the same week',
    ],
  },
  {
    icon: LineChart,
    label: 'Owner / Investor',
    color: '#7C3AED',
    sees: [
      'Monthly P&L, cash distributions, and occupancy',
      'Capex tracker, reserve balance, and tax-package exports',
      'Signed statements with full ledger drill-down',
    ],
    does: [
      'Approve major capex and reserve draws',
      'Request a draw or a tax package on demand',
      'Share read-only access with their accountant',
    ],
  },
]

const compliance = [
  {
    icon: Shield,
    title: 'SOC 2 Type II',
    detail: 'Independently audited controls across security, availability, and confidentiality — annually refreshed.',
  },
  {
    icon: Lock,
    title: 'ISO 27001',
    detail: 'ISMS certified across the data platform, with documented risk treatment and continuous monitoring.',
  },
  {
    icon: ScrollText,
    title: 'PIPEDA · CCPA · GDPR-ready',
    detail: 'Canadian and US privacy postures with data-subject rights, consent flows, and regional data residency.',
  },
  {
    icon: KeyRound,
    title: 'Role-based access',
    detail: 'Granular permissions by entity, portfolio, region, and role — with just-in-time elevation for finance.',
  },
  {
    icon: ServerCog,
    title: 'AES-256 + TLS 1.3',
    detail: 'Bank-grade encryption at rest and in transit, with hardware-backed keys and zero-trust networking.',
  },
  {
    icon: ClipboardList,
    title: 'Immutable audit log',
    detail: 'Every mutation to a lease, payment, or unit is append-only and cryptographically chained — court-ready.',
  },
]

const integrations = [
  'QuickBooks',
  'Xero',
  'Sage Intacct',
  'NetSuite',
  'Stripe',
  'Plaid',
  'Flinks',
  'Interac',
  'Equifax',
  'TransUnion',
  'Certn',
  'DocuSign',
  'Twilio',
  'SendGrid',
  'Google Maps',
  'Google Workspace',
]

const faqs = [
  {
    q: 'How long does onboarding actually take?',
    a: 'A single-property owner can be live in under 14 minutes: sign up, add the unit, invite the tenant. For multi-entity PMCs with 500+ units, our deployment team completes data migration, branded-portal setup, and team training in 1 to 2 weeks.',
  },
  {
    q: 'Can we migrate from Buildium, AppFolio, Yardi, or a spreadsheet?',
    a: 'Yes. Revun\'s migration tooling imports tenants, leases, balances, historical payments, and vendor records from the major platforms — including CSVs from Excel, Yardi Voyager, AppFolio, Buildium, Rentec Direct, and TenantCloud. Our team handles the mapping; you approve the result.',
  },
  {
    q: 'Does Revun support multiple entities, portfolios, and currencies?',
    a: 'Revun is built entity-first. You can model unlimited holding companies, LPs, trusts, or personal names — each with its own bank accounts, tax IDs, chart of accounts, and owners. Canadian and US operators run side-by-side with CAD and USD ledgers.',
  },
  {
    q: 'Is there a mobile app for tenants, owners, and vendors?',
    a: 'Every role gets a progressive-web-app experience that installs like a native app on iOS and Android — no app-store friction. Tenants pay rent, owners read statements, and vendors accept jobs from the same codebase we build on the web.',
  },
  {
    q: 'Can we export our data if we ever leave?',
    a: 'Yes. You own your data. At any time you can export full ledger history, lease documents, tenant records, and signed statements as CSV, PDF, and JSON. There are no lock-in clauses and no export fees. Ever.',
  },
  {
    q: 'What does cancellation look like?',
    a: 'Month-to-month billing. Cancel any time from the billing settings — no retention call, no cancellation fee. Your data remains exportable for 90 days after cancellation, then is permanently purged per our data-retention policy.',
  },
]

/* ── Page ──────────────────────────────────────────────────────────────── */

export default function HowRevunWorksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'How Revun Works', url: 'https://revun.com/how-revun-works/' },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildHowToSchema({
              name: 'How the Revun rent-to-ledger pipeline works',
              description:
                'End-to-end flow from tenant payment to owner payout inside Revun.',
              steps: flow.map((s) => ({ name: s.title, text: s.body })),
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildWebPageSchema({
              name: 'How Revun Works',
              description:
                'A visual tour of Revun: one ledger, one portal, one audit trail. End-to-end architecture for Canadian and US property operators.',
              url: 'https://revun.com/how-revun-works/',
            })
          ),
        }}
      />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[#F5F6F8]">
        <div
          className="absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(ellipse_at_top,_rgba(23,111,235,0.10),_transparent_60%)]"
          aria-hidden
        />
        <div className="absolute left-[-160px] top-40 h-[400px] w-[400px] rounded-full bg-[#176FEB]/[0.05] blur-[120px]" aria-hidden />
        <div className="absolute right-[-180px] top-24 h-[380px] w-[380px] rounded-full bg-[#047857]/[0.04] blur-[120px]" aria-hidden />

        <div className="relative mx-auto max-w-6xl px-6 pt-28 pb-20 md:pt-36">
          <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
            <RevealOnScroll>
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#176FEB]">
                <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
                How Revun works
              </p>
              <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-[#0A1628] sm:text-5xl lg:text-[3.75rem]">
                How Revun turns{' '}
                <span className="text-[#176FEB]">property chaos</span>{' '}
                into one clean ledger.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#475569]">
                One portal for tenants, owners, vendors, and your team. One double-entry ledger for every dollar. One audit trail for every action. Here is exactly how the product works — end to end.
              </p>
              <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
                <Link
                  href="/demo/"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#176FEB] px-7 text-base font-semibold text-white shadow-sm transition-all hover:bg-[#1259c1] hover:shadow-md"
                >
                  Book a demo
                  <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                </Link>
                <Link
                  href="/features/"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-7 text-base font-semibold text-[#0A1628] transition-colors hover:border-[#176FEB]/40 hover:text-[#176FEB]"
                >
                  See features
                </Link>
              </div>
            </RevealOnScroll>

            <RevealOnScroll>
              <div className="relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-[#E5E7EB] bg-white shadow-[0_24px_60px_-24px_rgba(10,22,40,0.25)]">
                  <Image
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85"
                    alt="Property manager reviewing Revun dashboard in a modern office"
                    fill
                    sizes="(min-width: 1024px) 44vw, 100vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0A1628]/80 via-[#0A1628]/20 to-transparent p-6 text-white">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest">
                      <span className="h-2 w-2 rounded-full bg-[#047857]" />
                      Live rent pipeline
                    </div>
                    <p className="mt-2 font-heading text-xl font-bold">
                      342 payments · $ 847K cleared today
                    </p>
                  </div>
                </div>
                <div className="absolute -left-6 bottom-12 hidden rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-lg md:block">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#047857]/10">
                      <CheckCircle2 className="h-5 w-5 text-[#047857]" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[#475569]">GL sync</p>
                      <p className="text-sm font-semibold text-[#0A1628]">QuickBooks · 0 errors</p>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* KPI strip */}
          <RevealOnScroll>
            <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#E5E7EB] bg-[#E5E7EB] md:grid-cols-4">
              {kpis.map((k) => (
                <div
                  key={k.label}
                  className="flex flex-col items-start bg-white px-6 py-5"
                >
                  <div className="font-display text-2xl font-extrabold tracking-tight text-[#0A1628] md:text-3xl">
                    {'raw' in k && k.raw ? (
                      <span>
                        {k.prefix}
                        {k.value}
                        {k.suffix}
                      </span>
                    ) : (
                      <CountUp value={k.value} suffix={k.suffix} />
                    )}
                  </div>
                  <p className="mt-1 text-xs font-medium text-[#475569]">{k.label}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── The Revun Model ── */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              The Revun model
            </p>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-[#0A1628] md:text-[2.5rem]">
              Three ideas define how Revun is built.
            </h2>
            <p className="mt-5 text-[#475569]">
              Every feature is downstream of these three decisions. They are what make Revun feel different from the patchwork of software most operators run today.
            </p>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.1}>
            <div className="grid gap-6 md:grid-cols-3">
              {pillars.map((p) => {
                const Icon = p.icon
                return (
                  <div
                    key={p.title}
                    className="group relative flex flex-col rounded-2xl border border-[#E5E7EB] bg-[#F5F6F8] p-8 transition-all hover:-translate-y-0.5 hover:border-[#176FEB]/40 hover:bg-white hover:shadow-[0_16px_40px_-20px_rgba(10,22,40,0.25)]"
                  >
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#176FEB]/10 text-[#176FEB]">
                      <Icon className="h-6 w-6" strokeWidth={1.8} />
                    </div>
                    <h3 className="font-heading text-xl font-bold tracking-tight text-[#0A1628]">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#475569]">
                      {p.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Operator Day-in-the-Life ── */}
      <section className="relative bg-[#0A1628] py-24 text-white">
        <div
          className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_at_top,_rgba(23,111,235,0.25),_transparent_70%)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-6">
          <RevealOnScroll className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#67A0FF]">
              A day in the life
            </p>
            <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-[2.5rem]">
              What Tuesday looks like inside Revun.
            </h2>
            <p className="mt-5 text-[#CBD5E1]">
              Seven checkpoints, zero spreadsheets. Here is the real workflow of a mid-market operator running 400 doors across Ontario, Alberta, and Washington.
            </p>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.08}>
            <ol className="relative mx-auto max-w-3xl">
              <span
                className="absolute left-[27px] top-2 bottom-2 w-px bg-gradient-to-b from-[#176FEB]/60 via-[#176FEB]/25 to-transparent"
                aria-hidden
              />
              {timeline.map((t) => {
                const Icon = t.icon
                return (
                  <li key={t.time} className="relative mb-6 flex gap-5 pl-0 last:mb-0">
                    <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#0F1F38] shadow-[0_0_0_6px_rgba(10,22,40,1)]">
                      <Icon className="h-6 w-6 text-[#67A0FF]" strokeWidth={1.8} />
                    </div>
                    <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-[#176FEB]/50 hover:bg-white/[0.05]">
                      <div className="mb-2 flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#67A0FF]">
                          <Clock className="h-3.5 w-3.5" />
                          {t.time}
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#CBD5E1]">
                          {t.badge}
                        </span>
                      </div>
                      <h3 className="font-heading text-lg font-bold text-white">{t.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-[#CBD5E1]">
                        {t.detail}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ol>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── End-to-End Flow ── */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              End-to-end flow
            </p>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-[#0A1628] md:text-[2.5rem]">
              From tenant tap to owner payout.
            </h2>
            <p className="mt-5 text-[#475569]">
              A single rent charge moves through six stages. Each one is logged, reversible, and auditable. Here is the full pipeline.
            </p>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.08}>
            <div className="relative">
              <span
                className="absolute left-0 right-0 top-[38px] hidden h-px bg-[linear-gradient(90deg,transparent,rgba(23,111,235,0.4),transparent)] lg:block"
                aria-hidden
              />
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
                {flow.map((f) => {
                  const Icon = f.icon
                  return (
                    <div
                      key={f.step}
                      className="relative rounded-2xl border border-[#E5E7EB] bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-[#176FEB]/40 hover:shadow-[0_16px_40px_-20px_rgba(10,22,40,0.25)]"
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#176FEB] text-white">
                          <Icon className="h-5 w-5" strokeWidth={1.8} />
                        </div>
                        <span className="font-mono text-xs font-bold text-[#176FEB]">
                          {f.step}
                        </span>
                      </div>
                      <h3 className="font-heading text-sm font-bold text-[#0A1628]">
                        {f.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-[#475569]">
                        {f.body}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-[#E5E7EB] bg-[#F5F6F8] px-6 py-5 text-sm text-[#475569]">
              <Layers className="h-4 w-4 text-[#176FEB]" />
              <span>
                The same pipeline runs for security deposits, late fees, utility recoveries, and vendor payables — with role-aware views for every stakeholder.
              </span>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Who Does What ── */}
      <section className="bg-[#F5F6F8] py-24">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              Who does what
            </p>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-[#0A1628] md:text-[2.5rem]">
              One platform, four experiences.
            </h2>
            <p className="mt-5 text-[#475569]">
              Every role sees what they need and nothing they don&apos;t. The data is the same; the interface is tuned to the job.
            </p>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.08}>
            <div className="grid gap-5 md:grid-cols-2">
              {roles.map((r) => {
                const Icon = r.icon
                return (
                  <div
                    key={r.label}
                    className="group flex flex-col rounded-2xl border border-[#E5E7EB] bg-white p-7 transition-all hover:-translate-y-0.5 hover:border-[#176FEB]/40 hover:shadow-[0_16px_40px_-20px_rgba(10,22,40,0.2)]"
                  >
                    <div className="mb-5 flex items-center gap-4">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-xl"
                        style={{ backgroundColor: `${r.color}15`, color: r.color }}
                      >
                        <Icon className="h-6 w-6" strokeWidth={1.8} />
                      </div>
                      <h3 className="font-heading text-xl font-bold text-[#0A1628]">
                        {r.label}
                      </h3>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#475569]">
                          Sees
                        </p>
                        <ul className="space-y-2">
                          {r.sees.map((item) => (
                            <li key={item} className="flex gap-2 text-sm text-[#0A1628]">
                              <span
                                className="mt-2 h-1 w-1 shrink-0 rounded-full"
                                style={{ backgroundColor: r.color }}
                                aria-hidden
                              />
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#475569]">
                          Does
                        </p>
                        <ul className="space-y-2">
                          {r.does.map((item) => (
                            <li key={item} className="flex gap-2 text-sm text-[#0A1628]">
                              <span
                                className="mt-2 h-1 w-1 shrink-0 rounded-full"
                                style={{ backgroundColor: r.color }}
                                aria-hidden
                              />
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Compliance & Trust ── */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
            <RevealOnScroll>
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
                Compliance &amp; trust
              </p>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-[#0A1628] md:text-[2.5rem]">
                Built to the standard your auditor asks for.
              </h2>
              <p className="mt-5 text-[#475569]">
                Revun holds SOC 2 Type II and ISO 27001 certifications, operates under PIPEDA and CCPA, and encrypts every byte in transit and at rest. The audit log is cryptographically chained — tamper-evident and tribunal-ready.
              </p>
              <div className="mt-8 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-[#F5F6F8]">
                <Image
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=85"
                  alt="Security team reviewing compliance controls on laptop"
                  width={900}
                  height={560}
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="aspect-[16/10] w-full object-cover"
                />
              </div>
            </RevealOnScroll>

            <RevealOnScroll stagger={0.06}>
              <div className="grid gap-4 sm:grid-cols-2">
                {compliance.map((c) => {
                  const Icon = c.icon
                  return (
                    <div
                      key={c.title}
                      className="flex flex-col rounded-2xl border border-[#E5E7EB] bg-white p-6 transition-all hover:border-[#176FEB]/40 hover:shadow-[0_12px_32px_-16px_rgba(10,22,40,0.2)]"
                    >
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#047857]/10 text-[#047857]">
                        <Icon className="h-5 w-5" strokeWidth={1.8} />
                      </div>
                      <h3 className="font-heading text-base font-bold text-[#0A1628]">
                        {c.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#475569]">
                        {c.detail}
                      </p>
                    </div>
                  )
                })}
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ── Integrations preview ── */}
      <section className="bg-[#F5F6F8] py-24">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              Integrations
            </p>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-[#0A1628] md:text-[2.5rem]">
              Plugs into every system you already run.
            </h2>
            <p className="mt-5 text-[#475569]">
              Accounting, banking, screening, identity, communications, and geo. If your team uses it, we probably already talk to it.
            </p>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.04}>
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
              {integrations.map((name) => {
                const Logo = getIntegrationIcon(name)
                return (
                  <div
                    key={name}
                    className="flex items-center gap-3 rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 transition-all hover:-translate-y-0.5 hover:border-[#176FEB]/40 hover:shadow-sm"
                  >
                    <Logo className="h-8 w-8 shrink-0" />
                    <span className="truncate text-sm font-semibold text-[#0A1628]">
                      {name}
                    </span>
                  </div>
                )
              })}
            </div>
            <div className="mt-10 text-center">
              <Link
                href="/integrations/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#176FEB] transition-colors hover:text-[#1259c1]"
              >
                Browse all 37+ integrations
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-3xl px-6">
          <RevealOnScroll className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              Frequently asked
            </p>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-[#0A1628] md:text-[2.5rem]">
              Questions about how Revun works.
            </h2>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.05}>
            <div className="divide-y divide-[#E5E7EB] overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white">
              {faqs.map((item) => (
                <details key={item.q} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 transition-colors hover:bg-[#F5F6F8]">
                    <h3 className="font-heading text-base font-semibold text-[#0A1628] md:text-lg">
                      {item.q}
                    </h3>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#176FEB] transition-transform duration-200 group-open:rotate-45">
                      <Plus className="h-4 w-4" strokeWidth={2.2} />
                    </span>
                  </summary>
                  <div className="px-6 pb-6 pr-16 text-sm leading-relaxed text-[#475569]">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="mt-8 text-center text-sm text-[#475569]">
              Still have questions?{' '}
              <Link
                href="/contact/"
                className="font-semibold text-[#176FEB] underline-offset-4 hover:underline"
              >
                Talk to our team
              </Link>
              .
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative overflow-hidden bg-[#0A1628] py-24 text-white">
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(23,111,235,0.25),_transparent_60%)]"
          aria-hidden
        />
        <div className="absolute left-[-120px] top-10 h-[300px] w-[300px] rounded-full bg-[#176FEB]/20 blur-[100px]" aria-hidden />
        <div className="absolute right-[-120px] bottom-0 h-[280px] w-[280px] rounded-full bg-[#047857]/15 blur-[100px]" aria-hidden />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <RevealOnScroll>
            <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-[2.75rem]">
              Ready to run your portfolio on{' '}
              <span className="text-[#67A0FF]">one system?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-[#CBD5E1]">
              Book a live walkthrough with our team, or explore pricing built for single-property owners up to enterprise PMCs.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/demo/"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#176FEB] px-8 text-base font-semibold text-white transition-colors hover:bg-[#1259c1]"
              >
                Book a demo
                <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
              </Link>
              <Link
                href="/pricing/"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-8 text-base font-semibold text-white transition-colors hover:bg-white/10"
              >
                View pricing
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[#CBD5E1]">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#67A0FF]" />
                No credit card required
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#67A0FF]" />
                CA + US deployments
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#67A0FF]" />
                Migrate in 14 days
              </span>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* AEO quick answer */}
      <p className="sr-only">
        Revun works by consolidating every property workflow into one double-entry ledger, one branded portal, and one immutable audit trail. Tenants pay through PAD, Interac, ACH, or card. Payments post instantly to the Revun ledger, sync nightly to QuickBooks, Xero, Sage Intacct, or NetSuite, and settle monthly to owners. Maintenance, leasing, communications, compliance, and owner reporting run on the same data. Revun holds SOC 2 Type II and ISO 27001 certifications, operates under PIPEDA and CCPA, and integrates with 37+ accounting, banking, screening, and communication platforms including QuickBooks, Xero, Stripe, Plaid, Flinks, Equifax, TransUnion, DocuSign, and Twilio.
      </p>
    </>
  )
}
