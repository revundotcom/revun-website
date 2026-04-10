'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import {
  ArrowRight, BarChart3, TrendingUp, FileText, Building2,
  CheckCircle2, Wallet, PiggyBank, Calculator, Receipt, Landmark,
  ArrowDownToLine, CreditCard, Shield, CalendarCheck,
  Download, RefreshCw, Sparkles,
} from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const
const fadeUp = (delay = 0.1) => ({ initial: { opacity: 0, y: 14 }, transition: { duration: 0.55, ease, delay } })

function SW({ children, id, dark }: { children: React.ReactNode; id: string; dark?: boolean }) {
  return (
    <section id={id} className={`py-16 md:py-20 ${dark ? 'bg-[#F5F6F8]' : 'bg-white'}`}>
      <div className="mx-auto max-w-6xl px-6">{children}</div>
    </section>
  )
}

function SH({ eyebrow, title, highlight, desc }: { eyebrow: string; title: string; highlight: string; desc: string }) {
  return (
    <RevealOnScroll className="mx-auto max-w-2xl text-center">
      <motion.p variants={revealItem} className="text-sm font-heading font-semibold uppercase tracking-wider text-brand-blue">{eyebrow}</motion.p>
      <motion.h2 variants={revealItem} className="mt-3 font-display text-4xl font-normal md:text-5xl text-brand-graphite">
        {title} <span className="text-keyword">{highlight}</span>
      </motion.h2>
      <motion.p variants={revealItem} className="mx-auto mt-4 max-w-xl text-lg text-brand-graphite/70">{desc}</motion.p>
    </RevealOnScroll>
  )
}

/* Reusable animated wrapper */
function A({ children, className, delay = 0.1, x }: { children: React.ReactNode; className?: string; delay?: number; x?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, x: x ?? 0, y: x ? 0 : 14 }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.5, ease, delay }}
    >{children}</motion.div>
  )
}

/* ── Hero ─────────────────────────────────────────────────────────── */

function AccountingHero() {
  return (
    <section className="relative overflow-hidden bg-white pb-12 pt-28 md:pt-36">
      <div className="absolute inset-0 bg-grid bg-grid-mask opacity-40" aria-hidden="true" />
      <div className="absolute top-0 right-[-200px] h-[500px] w-[500px] rounded-full bg-brand-blue/[0.04] blur-[120px]" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <RevealOnScroll>
          <motion.div variants={revealItem} className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-1.5 shadow-sm">
            <Calculator className="h-4 w-4 text-brand-blue" /><span className="text-sm font-medium text-brand-graphite-mid">Accounting & Reporting</span>
          </motion.div>
          <motion.h1 variants={revealItem} className="font-display text-5xl font-normal leading-[1.1] tracking-tight text-brand-graphite md:text-7xl">
            The financial{' '}<span className="text-brand-blue">infrastructure</span>{' '}for property operations
          </motion.h1>
          <motion.p variants={revealItem} className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-brand-graphite-mid md:text-xl">
            Real-time dashboards, automated reconciliation, trust accounting, owner disbursements, tax reporting, and QuickBooks/Xero sync — all in one system.
          </motion.p>
          <motion.div variants={revealItem} className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/signup/" className="inline-flex h-14 items-center justify-center rounded-xl bg-brand-blue px-8 text-base font-semibold text-white hover:bg-brand-blue-dark">Get Started Free</Link>
            <Link href="/demo/" className="inline-flex h-14 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-8 text-base font-semibold text-brand-graphite hover:border-brand-blue/30 hover:shadow-sm">Book a Demo</Link>
          </motion.div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

/* ── Revenue Dashboard ────────────────────────────────────────────── */

const monthlyRevenue = [
  { m: 'Jan', v: 265 }, { m: 'Feb', v: 278 }, { m: 'Mar', v: 295 }, { m: 'Apr', v: 310 },
  { m: 'May', v: 305 }, { m: 'Jun', v: 318 }, { m: 'Jul', v: 325 }, { m: 'Aug', v: 332 },
  { m: 'Sep', v: 328 }, { m: 'Oct', v: 338 }, { m: 'Nov', v: 340 }, { m: 'Dec', v: 343 },
]
const maxRev = Math.max(...monthlyRevenue.map((d) => d.v))

const summaryCards = [
  { label: 'Revenue', amount: '$342,800', icon: TrendingUp, color: '#22C55E', sub: '96.4% occupancy' },
  { label: 'Expenses', amount: '$128,450', icon: ArrowDownToLine, color: '#EF4444', sub: '97.8% collection' },
  { label: 'NOI', amount: '$214,350', icon: BarChart3, color: '#176FEB', sub: '$1,850 avg rent' },
]

function RevenueDashboard() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <SW id="revenue" dark>
      <SH eyebrow="Financials" title="Real-time" highlight="revenue dashboard" desc="Track revenue, expenses, and NOI across your entire portfolio." />
      <div ref={ref} className="mt-12 grid gap-6 sm:grid-cols-3">
        {summaryCards.map((c, i) => (
          <motion.div key={c.label} className="rounded-2xl border border-[#E5E7EB] bg-white p-5" {...fadeUp(0.1 + i * 0.1)} animate={inView ? { opacity: 1, y: 0 } : {}}>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: `${c.color}15` }}><c.icon className="h-5 w-5" style={{ color: c.color }} /></div>
              <span className="text-sm font-medium text-brand-graphite-mid">{c.label}</span>
            </div>
            <p className="mt-3 font-display text-3xl font-normal text-brand-graphite">{c.amount}</p>
            <p className="mt-1 text-xs text-brand-graphite-mid">{c.sub}</p>
          </motion.div>
        ))}
      </div>
      {/* Chart */}
      <motion.div className="mt-6 rounded-2xl border border-[#E5E7EB] bg-white p-6" {...fadeUp(0.4)} animate={inView ? { opacity: 1, y: 0 } : {}}>
        <div className="mb-4 flex items-center justify-between">
          <h4 className="font-heading text-base font-semibold text-brand-graphite">Monthly Revenue ($K)</h4>
          <span className="text-xs text-brand-graphite-mid">2025</span>
        </div>
        <div className="flex items-end gap-2" style={{ height: 160 }}>
          {monthlyRevenue.map((d, i) => (
            <div key={d.m} className="flex flex-1 flex-col items-center gap-1">
              <motion.div className="w-full rounded-t-md bg-brand-blue" style={{ minWidth: 8 }}
                initial={{ height: 0 }} animate={inView ? { height: `${(d.v / maxRev) * 140}px` } : { height: 0 }}
                transition={{ duration: 0.6, ease, delay: 0.5 + i * 0.04 }} />
              <span className="text-[10px] text-brand-graphite-mid">{d.m}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </SW>
  )
}

/* ── Trust Accounting ─────────────────────────────────────────────── */

const trustEntries = [
  { date: 'Mar 1', desc: 'Security deposit received', prop: '75 Portland St #704', amount: '+$3,300', bal: '$48,600', cr: true },
  { date: 'Mar 1', desc: 'Rent collected', prop: '120 Queen St W #301', amount: '+$2,100', bal: '$50,700', cr: true },
  { date: 'Mar 5', desc: 'Owner disbursement', prop: '75 Portland St', amount: '-$4,200', bal: '$46,500', cr: false },
  { date: 'Mar 8', desc: 'Vendor payment — HVAC', prop: '120 Queen St W', amount: '-$850', bal: '$45,650', cr: false },
]

function TrustAccounting() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <SW id="trust">
      <SH eyebrow="Trust" title="Provincial" highlight="trust accounting" desc="Compliant trust ledgers with property-level balances and full audit trails." />
      <div ref={ref} className="mt-12">
        <motion.div className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden" {...fadeUp()} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <div className="flex items-center justify-between border-b border-[#E5E7EB] px-6 py-4">
            <div className="flex items-center gap-3"><Landmark className="h-5 w-5 text-brand-blue" /><h4 className="font-heading text-base font-semibold text-brand-graphite">Trust Ledger</h4></div>
            <div className="flex items-center gap-2 rounded-full bg-[#22C55E]/10 px-3 py-1"><CheckCircle2 className="h-3.5 w-3.5 text-[#22C55E]" /><span className="text-xs font-medium text-[#22C55E]">Reconciled</span></div>
          </div>
          {/* Responsive table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr className="border-b border-[#E5E7EB] bg-[#F5F6F8] text-xs font-medium text-brand-graphite-mid">
                  <th className="px-6 py-3 text-left font-medium">Date</th>
                  <th className="px-2 py-3 text-left font-medium">Description</th>
                  <th className="px-2 py-3 text-left font-medium">Property</th>
                  <th className="px-2 py-3 text-right font-medium">Amount</th>
                  <th className="px-6 py-3 text-right font-medium">Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {trustEntries.map((e, i) => (
                  <motion.tr key={i} initial={{ opacity: 0, x: -8 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.3, ease, delay: 0.2 + i * 0.07 }}>
                    <td className="px-6 py-3.5 text-xs text-brand-graphite-mid whitespace-nowrap">{e.date}</td>
                    <td className="px-2 py-3.5 text-brand-graphite">{e.desc}</td>
                    <td className="px-2 py-3.5 text-xs text-brand-graphite-mid">{e.prop}</td>
                    <td className={`px-2 py-3.5 text-right font-semibold ${e.cr ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>{e.amount}</td>
                    <td className="px-6 py-3.5 text-right font-medium text-brand-graphite">{e.bal}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-[#E5E7EB] bg-[#F5F6F8] px-6 py-3">
            <div className="flex items-center gap-2"><Shield className="h-4 w-4 text-brand-blue" /><span className="text-xs text-brand-graphite-mid">Compliant with Ontario RECO trust accounting regulations.</span></div>
          </div>
        </motion.div>
      </div>
    </SW>
  )
}

/* ── Owner Disbursements ──────────────────────────────────────────── */

function OwnerDisbursements() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const statementLines = [
    { label: 'Gross Rent Collected', value: '$4,200.00', color: 'text-brand-graphite' },
    { label: 'Management Fee (8%)', value: '-$336.00', color: 'text-[#EF4444]' },
    { label: 'Maintenance Reserve', value: '-$100.00', color: 'text-[#EF4444]' },
    { label: 'Insurance', value: '-$85.00', color: 'text-[#EF4444]' },
  ]
  const history = [
    { date: 'Mar 1, 2026', amount: '$3,864', method: 'Interac e-Transfer' },
    { date: 'Feb 1, 2026', amount: '$3,720', method: 'ACH' },
    { date: 'Jan 1, 2026', amount: '$3,950', method: 'Interac e-Transfer' },
  ]
  return (
    <SW id="disbursements" dark>
      <SH eyebrow="Disbursements" title="Automated" highlight="owner payouts" desc="Generate owner statements and disburse net proceeds automatically." />
      <div ref={ref} className="mt-12 grid gap-8 lg:grid-cols-2">
        {/* Statement */}
        <motion.div className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden" {...fadeUp()} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <div className="border-b border-[#E5E7EB] px-6 py-4">
            <div className="flex items-center gap-2"><Wallet className="h-4 w-4 text-brand-blue" /><span className="font-heading text-base font-semibold text-brand-graphite">Owner Statement</span></div>
            <p className="mt-1 text-xs text-brand-graphite-mid">75 Portland St, Mississauga &middot; March 2026</p>
          </div>
          <div className="divide-y divide-[#E5E7EB] px-6">
            {statementLines.map((l) => (
              <div key={l.label} className="flex items-center justify-between py-3">
                <span className="text-sm text-brand-graphite-mid">{l.label}</span>
                <span className={`text-sm font-semibold ${l.color}`}>{l.value}</span>
              </div>
            ))}
            <div className="flex items-center justify-between py-4">
              <span className="text-sm font-semibold text-brand-graphite">Net Payout</span>
              <span className="font-display text-2xl font-normal text-[#22C55E]">$3,679.00</span>
            </div>
          </div>
          <div className="border-t border-[#E5E7EB] bg-[#F5F6F8] px-6 py-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 text-brand-blue" />
                <span className="text-xs font-medium text-brand-graphite">Auto-disburse</span>
                <div className="ml-1 h-5 w-9 rounded-full bg-brand-blue p-0.5"><div className="ml-auto h-4 w-4 rounded-full bg-white" /></div>
              </div>
              <div className="flex items-center gap-1.5"><CalendarCheck className="h-3.5 w-3.5 text-brand-graphite-mid" /><span className="text-xs text-brand-graphite-mid">Next: Apr 1 &middot; 21 days</span></div>
            </div>
          </div>
        </motion.div>
        {/* History */}
        <motion.div className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden" {...fadeUp(0.2)} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <div className="border-b border-[#E5E7EB] px-6 py-4">
            <div className="flex items-center gap-2"><CreditCard className="h-4 w-4 text-brand-blue" /><span className="font-heading text-base font-semibold text-brand-graphite">Disbursement History</span></div>
          </div>
          <div className="divide-y divide-[#E5E7EB]">
            {history.map((d, i) => (
              <motion.div key={d.date} className="flex items-center justify-between px-6 py-4" initial={{ opacity: 0, x: 8 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.35, ease, delay: 0.3 + i * 0.08 }}>
                <div><p className="text-sm text-brand-graphite">{d.date}</p><p className="text-xs text-brand-graphite-mid">{d.method}</p></div>
                <div className="flex items-center gap-3">
                  <span className="font-display text-lg font-normal text-brand-graphite">{d.amount}</span>
                  <span className="rounded-full bg-[#22C55E]/10 px-2.5 py-0.5 text-[10px] font-medium text-[#22C55E]">Sent</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </SW>
  )
}

/* ── Bank Reconciliation ──────────────────────────────────────────── */

function BankReconciliation() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const bankTx = [
    { desc: 'Rent — Unit 704', amount: '$2,100', ok: true },
    { desc: 'Rent — Unit 301', amount: '$1,650', ok: true },
    { desc: 'Insurance premium', amount: '$425', ok: true },
    { desc: 'ATM withdrawal', amount: '$200', ok: false },
  ]
  const ledgerTx = [
    { desc: 'Rent receivable — 704', amount: '$2,100', ok: true },
    { desc: 'Rent receivable — 301', amount: '$1,650', ok: true },
    { desc: 'Insurance expense', amount: '$425', ok: true },
    { desc: 'Unmatched', amount: '$340', ok: false },
  ]
  const MatchRow = ({ items, dir }: { items: typeof bankTx; dir: 'l' | 'r' }) => (
    <div className="divide-y divide-[#E5E7EB]">
      {items.map((t, i) => (
        <motion.div key={i} className="flex items-center justify-between px-5 py-3" initial={{ opacity: 0, x: dir === 'l' ? -8 : 8 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.3, ease, delay: 0.25 + i * 0.06 }}>
          <div className="flex items-center gap-2">
            {t.ok ? <CheckCircle2 className="h-4 w-4 text-[#22C55E]" /> : <div className="h-4 w-4 rounded-full border-2 border-[#F59E0B]" />}
            <span className={`text-sm ${t.ok ? 'text-brand-graphite' : 'text-[#F59E0B] font-medium'}`}>{t.desc}</span>
          </div>
          <span className="text-sm font-medium text-brand-graphite">{t.amount}</span>
        </motion.div>
      ))}
    </div>
  )
  return (
    <SW id="reconciliation">
      <SH eyebrow="Reconciliation" title="Automated bank" highlight="reconciliation" desc="Match bank transactions to ledger entries automatically." />
      <div ref={ref} className="mt-12">
        <A className="mb-6 flex justify-center">
          <div className="flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-2 shadow-sm">
            <Sparkles className="h-4 w-4 text-brand-blue" />
            <span className="text-sm text-brand-graphite-mid">Auto-match rate:</span>
            <span className="font-display text-lg font-normal text-brand-blue">94.2%</span>
          </div>
        </A>
        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden" {...fadeUp(0.15)} animate={inView ? { opacity: 1, y: 0 } : {}}>
            <div className="border-b border-[#E5E7EB] bg-[#F5F6F8] px-5 py-3.5">
              <div className="flex items-center gap-2"><Landmark className="h-4 w-4 text-brand-blue" /><span className="font-heading text-sm font-semibold text-brand-graphite">Bank Transactions</span></div>
            </div>
            <MatchRow items={bankTx} dir="l" />
          </motion.div>
          <motion.div className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden" {...fadeUp(0.15)} animate={inView ? { opacity: 1, y: 0 } : {}}>
            <div className="border-b border-[#E5E7EB] bg-[#F5F6F8] px-5 py-3.5">
              <div className="flex items-center gap-2"><FileText className="h-4 w-4 text-brand-blue" /><span className="font-heading text-sm font-semibold text-brand-graphite">Ledger Entries</span></div>
            </div>
            <MatchRow items={ledgerTx} dir="r" />
          </motion.div>
        </div>
        <A className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center" delay={0.5}>
          <button className="inline-flex h-11 items-center justify-center rounded-xl bg-brand-blue px-6 text-sm font-semibold text-white">Reconcile All Matched</button>
          <span className="text-xs text-[#F59E0B]">2 unmatched items require manual review</span>
        </A>
      </div>
    </SW>
  )
}

/* ── Expense Tracking ─────────────────────────────────────────────── */

const expenses = [
  { cat: 'Maintenance', amt: 42100, bgt: 45000, chg: -3.2 },
  { cat: 'Insurance', amt: 18200, bgt: 18000, chg: 1.1 },
  { cat: 'Utilities', amt: 12800, bgt: 14000, chg: -8.6 },
  { cat: 'Legal', amt: 4500, bgt: 5000, chg: -10.0 },
  { cat: 'Admin', amt: 8900, bgt: 9500, chg: -6.3 },
]
const maxBgt = Math.max(...expenses.map((e) => e.bgt))

function ExpenseTracking() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <SW id="expenses" dark>
      <SH eyebrow="Expenses" title="Detailed" highlight="expense tracking" desc="Categorize expenses automatically, compare to budget, and track trends." />
      <div ref={ref} className="mt-12">
        <motion.div className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden" {...fadeUp()} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <div className="border-b border-[#E5E7EB] px-6 py-4">
            <div className="flex items-center gap-2"><Receipt className="h-4 w-4 text-brand-blue" /><span className="font-heading text-base font-semibold text-brand-graphite">Expense Categories &middot; YTD</span></div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr className="border-b border-[#E5E7EB] bg-[#F5F6F8] text-xs font-medium text-brand-graphite-mid">
                  <th className="w-24 px-6 py-2.5 text-left font-medium">Category</th>
                  <th className="px-2 py-2.5 text-left font-medium">Actual vs Budget</th>
                  <th className="w-20 px-2 py-2.5 text-right font-medium">Actual</th>
                  <th className="w-20 px-2 py-2.5 text-right font-medium">Budget</th>
                  <th className="w-16 px-6 py-2.5 text-right font-medium">MoM</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {expenses.map((e, i) => (
                  <motion.tr key={e.cat} initial={{ opacity: 0, x: -8 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.35, ease, delay: 0.2 + i * 0.07 }}>
                    <td className="px-6 py-3.5 font-medium text-brand-graphite">{e.cat}</td>
                    <td className="px-2 py-3.5">
                      <div className="relative h-5 w-full rounded-full bg-[#F5F6F8]">
                        <motion.div className="absolute inset-y-0 left-0 rounded-full bg-[#E5E7EB]" initial={{ width: 0 }} animate={inView ? { width: `${(e.bgt / maxBgt) * 100}%` } : { width: 0 }} transition={{ duration: 0.5, ease, delay: 0.3 + i * 0.07 }} />
                        <motion.div className={`absolute inset-y-0 left-0 rounded-full ${e.amt <= e.bgt ? 'bg-brand-blue' : 'bg-[#F59E0B]'}`} initial={{ width: 0 }} animate={inView ? { width: `${(e.amt / maxBgt) * 100}%` } : { width: 0 }} transition={{ duration: 0.6, ease, delay: 0.35 + i * 0.07 }} />
                      </div>
                    </td>
                    <td className="px-2 py-3.5 text-right font-semibold text-brand-graphite">${(e.amt / 1000).toFixed(1)}K</td>
                    <td className="px-2 py-3.5 text-right text-xs text-brand-graphite-mid">${(e.bgt / 1000).toFixed(1)}K</td>
                    <td className={`px-6 py-3.5 text-right text-xs font-medium ${e.chg < 0 ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                      {e.chg < 0 ? '↓' : '↑'}{Math.abs(e.chg)}%
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </SW>
  )
}

/* ── Tax Reports & Integrations (merged) ──────────────────────────── */

const reports = [
  { name: 'Income Statement', status: 'Generated', sc: '#22C55E' },
  { name: 'Balance Sheet', status: 'Generated', sc: '#22C55E' },
  { name: 'T4A Slips', status: 'Filed', sc: '#176FEB' },
  { name: 'Expense Summary', status: 'Generated', sc: '#22C55E' },
  { name: 'Capital Cost Allowance', status: 'Pending', sc: '#F59E0B' },
]

function TaxAndIntegrations() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <SW id="tax-integrations">
      <SH eyebrow="Reporting" title="Tax-ready reports &" highlight="integrations" desc="CRA-compliant reports, T4A slips, and two-way sync with QuickBooks and Xero." />
      <div ref={ref} className="mt-12 grid gap-8 lg:grid-cols-2">
        {/* Reports */}
        <motion.div className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden" {...fadeUp()} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <div className="flex items-center justify-between border-b border-[#E5E7EB] px-6 py-4">
            <div className="flex items-center gap-2"><FileText className="h-4 w-4 text-brand-blue" /><span className="font-heading text-base font-semibold text-brand-graphite">Financial Reports</span></div>
            <div className="flex items-center gap-2 rounded-full bg-brand-blue/10 px-3 py-1"><Shield className="h-3.5 w-3.5 text-brand-blue" /><span className="text-xs font-medium text-brand-blue">CRA Compliant</span></div>
          </div>
          <div className="divide-y divide-[#E5E7EB]">
            {reports.map((r, i) => (
              <motion.div key={r.name} className="flex items-center justify-between px-6 py-3.5" initial={{ opacity: 0, x: -8 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.3, ease, delay: 0.2 + i * 0.06 }}>
                <div className="flex items-center gap-3"><FileText className="h-4 w-4 text-brand-graphite-mid" /><span className="text-sm text-brand-graphite">{r.name}</span></div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full px-2.5 py-0.5 text-[10px] font-medium" style={{ backgroundColor: `${r.sc}15`, color: r.sc }}>{r.status}</span>
                  <Download className="h-4 w-4 text-brand-graphite-mid" />
                </div>
              </motion.div>
            ))}
          </div>
          <div className="border-t border-[#E5E7EB] bg-[#F5F6F8] px-6 py-3">
            <div className="flex items-center gap-3">
              <span className="text-xs text-brand-graphite-mid">Export:</span>
              {['PDF', 'CSV', 'QuickBooks', 'Xero'].map((f) => (
                <span key={f} className="rounded-lg border border-[#E5E7EB] bg-white px-2.5 py-1 text-xs font-medium text-brand-graphite">{f}</span>
              ))}
            </div>
          </div>
        </motion.div>
        {/* Integrations */}
        <div className="space-y-4">
          {[
            { name: 'QuickBooks', sync: '2 min ago', count: '1,847', freq: 'Every 15 min', color: '#22C55E' },
            { name: 'Xero', sync: '5 min ago', count: '2,314', freq: 'Every 30 min', color: '#176FEB' },
          ].map((int, i) => (
            <A key={int.name} className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden" delay={0.15 + i * 0.12}>
              <div className="border-b border-[#E5E7EB] px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue/10"><RefreshCw className="h-5 w-5 text-brand-blue" /></div>
                    <div><h4 className="font-heading text-sm font-semibold text-brand-graphite">{int.name}</h4><p className="text-xs text-brand-graphite-mid">{int.freq}</p></div>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full bg-[#22C55E]/10 px-3 py-1"><CheckCircle2 className="h-3.5 w-3.5 text-[#22C55E]" /><span className="text-xs font-medium text-[#22C55E]">Connected</span></div>
                </div>
              </div>
              <div className="flex items-center justify-between px-6 py-3">
                <span className="text-xs text-brand-graphite-mid">Synced {int.sync} &middot; {int.count} error-free</span>
                <div className="flex items-center gap-1 text-xs"><span className="font-medium text-brand-blue">Revun</span><ArrowRight className="h-3 w-3 text-brand-graphite-mid" /><span className="font-medium" style={{ color: int.color }}>{int.name}</span></div>
              </div>
            </A>
          ))}
        </div>
      </div>
    </SW>
  )
}

/* ── Multi-Entity Reporting ───────────────────────────────────────── */

const entities = [
  { name: 'Maple Properties Inc.', rev: '$182,400', exp: '$68,200', noi: '$114,200' },
  { name: 'Oak Management Corp.', rev: '$98,600', exp: '$37,100', noi: '$61,500' },
  { name: 'Cedar Holdings Ltd.', rev: '$61,800', exp: '$23,150', noi: '$38,650' },
]

function MultiEntityReporting() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <SW id="multi-entity" dark>
      <SH eyebrow="Multi-Entity" title="Consolidated" highlight="reporting" desc="Roll up financials across legal entities with board-ready exports." />
      <div ref={ref} className="mt-12">
        <motion.div className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden" {...fadeUp()} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <div className="flex flex-col gap-3 border-b border-[#E5E7EB] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2"><Building2 className="h-4 w-4 text-brand-blue" /><span className="font-heading text-base font-semibold text-brand-graphite">Consolidated P&L</span></div>
            <div className="flex items-center gap-2">
              <span className="rounded-lg border border-[#E5E7EB] px-3 py-1.5 text-xs text-brand-graphite">Filter by Entity</span>
              <span className="rounded-lg border border-[#E5E7EB] px-3 py-1.5 text-xs text-brand-graphite">Date Range</span>
              <span className="rounded-lg bg-brand-blue px-3 py-1.5 text-xs font-semibold text-white">Export</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px] text-sm">
              <thead>
                <tr className="border-b border-[#E5E7EB] bg-[#F5F6F8] text-xs font-medium text-brand-graphite-mid">
                  <th className="px-6 py-2.5 text-left font-medium">Entity</th>
                  <th className="px-2 py-2.5 text-right font-medium">Revenue</th>
                  <th className="px-2 py-2.5 text-right font-medium">Expenses</th>
                  <th className="px-6 py-2.5 text-right font-medium">NOI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {entities.map((e, i) => (
                  <motion.tr key={e.name} initial={{ opacity: 0, x: -8 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.35, ease, delay: 0.2 + i * 0.08 }}>
                    <td className="px-6 py-4"><div className="flex items-center gap-2"><PiggyBank className="h-4 w-4 text-brand-blue" /><span className="font-medium text-brand-graphite">{e.name}</span></div></td>
                    <td className="px-2 py-4 text-right font-semibold text-[#22C55E]">{e.rev}</td>
                    <td className="px-2 py-4 text-right text-[#EF4444]">{e.exp}</td>
                    <td className="px-6 py-4 text-right font-semibold text-brand-graphite">{e.noi}</td>
                  </motion.tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-brand-blue/20 bg-[#F5F6F8]">
                  <td className="px-6 py-4 font-semibold text-brand-graphite">Total</td>
                  <td className="px-2 py-4 text-right font-display text-lg font-normal text-[#22C55E]">$342,800</td>
                  <td className="px-2 py-4 text-right font-display text-lg font-normal text-[#EF4444]">$128,450</td>
                  <td className="px-6 py-4 text-right font-display text-lg font-normal text-brand-graphite">$214,350</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </motion.div>
      </div>
    </SW>
  )
}

/* ── CTA ──────────────────────────────────────────────────────────── */

function AccountingCTA() {
  return (
    <section className="bg-[#F5F6F8] py-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <RevealOnScroll>
          <motion.h2 variants={revealItem} className="font-display text-4xl font-normal text-brand-graphite md:text-5xl">
            Replace your entire{' '}<span className="text-brand-blue">accounting stack</span>
          </motion.h2>
          <motion.p variants={revealItem} className="mx-auto mt-4 max-w-lg text-lg text-brand-graphite-mid">
            Revenue tracking, expense management, trust accounting, disbursements, tax reporting, and integrations — all built into Revun.
          </motion.p>
          <motion.div variants={revealItem} className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/signup/" className="inline-flex h-14 items-center justify-center rounded-xl bg-brand-blue px-8 text-base font-semibold text-white hover:bg-brand-blue-dark">Get Started Free</Link>
            <Link href="/demo/" className="inline-flex h-14 items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-8 text-base font-semibold text-brand-graphite hover:border-brand-blue/30 hover:shadow-sm">
              Book a Demo <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

/* ── Assembly ─────────────────────────────────────────────────────── */

export function AccountingClient() {
  return (
    <>
      <AccountingHero />
      <RevenueDashboard />
      <TrustAccounting />
      <OwnerDisbursements />
      <BankReconciliation />
      <ExpenseTracking />
      <TaxAndIntegrations />
      <MultiEntityReporting />
      <AccountingCTA />
      <p className="sr-only">
        Revun Accounting provides complete financial infrastructure for property operations including real-time revenue dashboards, provincial trust accounting with RECO compliance, automated owner disbursements, bank reconciliation with 94.2% auto-match, categorized expense tracking with budget comparison, CRA-compliant tax-ready reports with T4A slips, QuickBooks and Xero two-way sync, and multi-entity consolidated reporting with board-ready exports.
      </p>
    </>
  )
}
