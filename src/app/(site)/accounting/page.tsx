import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  DollarSign,
  Landmark,
  Send,
  BookOpen,
  BarChart3,
  RefreshCw,
  ArrowDownToLine,
  ArrowUpFromLine,
  Building2,
  Receipt,
  Calculator,
  FileSpreadsheet,
} from 'lucide-react'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema, buildWebPageSchema } from '@/lib/schema-builders'

export const metadata: Metadata = {
  title: 'Accounting & Financial Operations | Revun',
  description:
    'Rent collection, owner disbursements, vendor payouts, trust accounting, statements, reporting, and compliance — all in one unified financial operating layer for property operations.',
  alternates: { canonical: buildCanonicalUrl('/accounting') },
  openGraph: {
    title: 'Accounting & Financial Operations | Revun',
    description:
      'The financial infrastructure for property operations. Rent collection, disbursements, trust accounting, and reporting in one system.',
    url: buildCanonicalUrl('/accounting'),
  },
}

/* ── Data ──────────────────────────────────────────────────────────────── */

const features = [
  {
    title: 'Rent Collection',
    description:
      'Collect rent via ACH, credit card, Interac, and PAD. Automated reminders, late fee rules, split payments, and real-time reconciliation.',
    icon: DollarSign,
  },
  {
    title: 'Owner Disbursements',
    description:
      'Automated owner payouts on your schedule. Net income calculations, reserve holdbacks, and detailed owner statements generated automatically.',
    icon: Send,
  },
  {
    title: 'Vendor Payouts',
    description:
      'Pay vendors and contractors directly from the platform. Track invoices, approve payments, and maintain a complete vendor payment history.',
    icon: ArrowUpFromLine,
  },
  {
    title: 'Trust Accounting',
    description:
      'Maintain compliant trust accounts with full audit trails. Separate trust and operating funds. Provincial and state compliance built in.',
    icon: Landmark,
  },
  {
    title: 'Financial Reporting',
    description:
      'P&L statements, cash flow reports, rent rolls, aging reports, and portfolio performance dashboards. Export-ready for tax season.',
    icon: BarChart3,
  },
  {
    title: 'Accounting Sync',
    description:
      'Two-way sync with QuickBooks and Xero. Chart of accounts mapping, automatic journal entries, and reconciliation without double entry.',
    icon: RefreshCw,
  },
] as const

const moneyFlowSteps = [
  {
    label: 'Rent In',
    description: 'Tenants pay via ACH, credit card, Interac, or PAD',
    icon: ArrowDownToLine,
  },
  {
    label: 'Trust Account',
    description: 'Funds held in compliant trust accounts with full audit trail',
    icon: Landmark,
  },
  {
    label: 'Owner Disbursements',
    description: 'Net income distributed to property owners on schedule',
    icon: Send,
  },
  {
    label: 'Vendor Payouts',
    description: 'Maintenance vendors and contractors paid directly',
    icon: ArrowUpFromLine,
  },
  {
    label: 'Operating Expenses',
    description: 'Management fees, utilities, and operational costs processed',
    icon: Building2,
  },
]

const replacements = [
  {
    old: 'Spreadsheets for tracking rent',
    new: 'Automated rent ledgers with real-time status',
    icon: FileSpreadsheet,
  },
  {
    old: 'Separate payment tools',
    new: 'Unified payment processing across all methods',
    icon: Receipt,
  },
  {
    old: 'Manual reconciliation',
    new: 'Automatic reconciliation with accounting sync',
    icon: Calculator,
  },
  {
    old: 'Paper owner statements',
    new: 'Digital statements generated and delivered automatically',
    icon: BarChart3,
  },
]

/* ── Page ──────────────────────────────────────────────────────────────── */

export default function AccountingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Accounting', url: 'https://revun.com/accounting/' },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildWebPageSchema({
              name: 'Accounting & Financial Operations',
              description: 'The financial infrastructure for property operations.',
              url: 'https://revun.com/accounting/',
            })
          ),
        }}
      />

      {/* ── Hero ── */}
      <section className="bg-[#F5F6F8]">
        <div className="mx-auto max-w-4xl px-6 pt-24 pb-16 text-center">
          <RevealOnScroll>
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-[#176FEB]">
              Financial Operations
            </p>
            <h1 className="font-display font-extrabold text-4xl leading-[1.1] tracking-tight text-[#0A1628] sm:text-5xl lg:text-6xl">
              The financial infrastructure for{' '}
              <span className="text-[#176FEB]">property operations</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#555860]">
              Rent collection, owner disbursements, vendor payouts, trust accounting, statements, reporting, and compliance — all in one financial operating layer.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Money Flow ── */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              How Money Moves
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] md:text-4xl">
              The <span className="text-[#176FEB]">money flow</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[#555860]">
              From rent collection to disbursements — every dollar tracked, reconciled, and accounted for automatically.
            </p>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.1}>
            <div className="grid gap-4 md:grid-cols-5">
              {moneyFlowSteps.map((s, i) => {
                const Icon = s.icon
                return (
                  <div
                    key={s.label}
                    className="relative rounded-2xl border border-[#D3D5DB] bg-white p-6 text-center"
                  >
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F2FE]">
                      <Icon className="h-6 w-6 text-[#176FEB]" />
                    </div>
                    <h3 className="mb-1 font-heading text-sm font-bold text-[#2C2E33]">
                      {s.label}
                    </h3>
                    <p className="text-xs leading-relaxed text-[#555860]">
                      {s.description}
                    </p>
                    {i < moneyFlowSteps.length - 1 && (
                      <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 md:block">
                        <ArrowRight className="h-4 w-4 text-[#176FEB]/40" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Feature Grid ── */}
      <section className="bg-[#F5F6F8] py-12">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              Financial Modules
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] md:text-4xl">
              Every financial <span className="text-[#176FEB]">operation</span>, one system
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[#555860]">
              Six financial modules that cover the full property accounting workflow. Connected, compliant, and audit-ready.
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

      {/* ── Replace your financial stack ── */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              Consolidate
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] md:text-4xl">
              Replace your <span className="text-[#176FEB]">financial stack</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[#555860]">
              Stop juggling spreadsheets, separate payment tools, and manual reconciliation. Revun replaces the fragmented financial workflow with one connected system.
            </p>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.1}>
            <div className="grid gap-6 md:grid-cols-2">
              {replacements.map((r) => {
                const Icon = r.icon
                return (
                  <div
                    key={r.old}
                    className="rounded-2xl border border-[#E5E7EB] bg-[#F5F6F8] p-8 hover:border-[#176FEB]/40"
                  >
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F2FE]">
                      <Icon className="h-6 w-6 text-[#176FEB]" />
                    </div>
                    <p className="mb-2 text-sm font-medium text-[#555860] line-through">
                      {r.old}
                    </p>
                    <p className="font-heading text-lg font-bold text-[#2C2E33]">
                      {r.new}
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
              See how Revun handles your{' '}
              <span className="text-[#176FEB]">finances</span>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-[#555860]">
              From rent collection to owner disbursements, trust accounting to tax reporting — see the full financial operating layer in action.
            </p>
            <div className="mt-10">
              <Link
                href="/demo/"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#176FEB] px-8 text-base font-semibold text-white transition-colors hover:bg-[#1461d0]"
              >
                Book a Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* AEO quick answer */}
      <p className="sr-only">
        Revun provides a unified financial infrastructure for property operations. The platform handles rent collection via ACH, credit card, Interac, and PAD, automated owner disbursements, vendor payouts, trust accounting with full audit trails, financial reporting including P&L and cash flow, and two-way accounting sync with QuickBooks and Xero. All funds flow through compliant trust accounts with automatic reconciliation.
      </p>
    </>
  )
}
