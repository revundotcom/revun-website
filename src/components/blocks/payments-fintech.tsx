'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import {
  Users,
  Building2,
  Wrench,
  ArrowRight,
  Wallet,
  Send,
  Receipt,
  BarChart3,
  CheckCircle2,
  Zap,
} from 'lucide-react'

/* ═══════════════════════════════════════════════════════════════════════════
   Money-flow data
   ═══════════════════════════════════════════════════════════════════════════ */

const inboundMethods = ['PAD', 'Credit Card', 'Interac e-Transfer', 'ACH']
const outboundMethods = ['Direct Deposit', 'Wire Transfer', 'ACH']

const flowSteps = [
  {
    step: '01',
    direction: 'Inflow',
    icon: Wallet,
    title: 'Rent Collection',
    description:
      'Automated collection via PAD, Interac, credit card, and ACH, with reminders, receipts, and a full ledger of who paid and who did not.',
    methods: ['PAD', 'Interac', 'Cards', 'ACH'],
    status: 'Auto-reconciled daily',
    stat: { value: '$1.2M+', label: 'collected monthly' },
    process: [
      'Tenant receives reminder the day rent is due',
      'Payment captured via PAD, Interac, card, or ACH',
      'Receipt issued and posted to the ledger',
      'Reconciled to the lease and unit automatically',
    ],
  },
  {
    step: '02',
    direction: 'Outflow',
    icon: Send,
    title: 'Owner Disbursements',
    description:
      'Detailed statements and direct deposit to any Canadian or US bank account, on schedule, every time, with full transparency.',
    methods: ['Direct deposit', 'Wire', 'EFT'],
    status: 'Zero late payouts',
    stat: { value: '99.8%', label: 'on-time payout rate' },
    process: [
      'Rent and fees settle into the trust account',
      'Management fees, expenses, and holdbacks calculated',
      'Net payout scheduled for the next disbursement run',
      'Direct deposit sent with a full statement',
    ],
  },
  {
    step: '03',
    direction: 'Outflow',
    icon: Receipt,
    title: 'Vendor Payments',
    description:
      'Invoice matching, approval workflows, and spend visibility across your portfolio. Vendors stop chasing you, jobs stop stalling.',
    methods: ['Same-day ACH', 'EFT', 'Batch'],
    status: 'Approval workflows built in',
    stat: { value: '2.4×', label: 'faster invoice settlement' },
    process: [
      'Invoice submitted against an active work order',
      'Line items matched and routed for approval',
      'Once approved, batched for the next payment run',
      'Paid via same-day ACH or EFT with a full audit trail',
    ],
  },
  {
    step: '04',
    direction: 'Live',
    icon: BarChart3,
    title: 'Financial Reporting',
    description:
      'Real-time P&L, cash flow, and tax-ready reports (T5, NR4, 1099). Export to QuickBooks, Xero, or CSV in one click.',
    methods: ['QuickBooks', 'Xero', 'CSV', 'PDF'],
    status: 'Real-time, always audit-ready',
    stat: { value: '1-click', label: 'to audit-ready books' },
    process: [
      'Every transaction tagged with unit, owner, and category',
      'P&L, cash flow, and tax-ready reports generated live',
      'Variance flags surface anomalies in real time',
      'One-click export to QuickBooks, Xero, CSV, or PDF',
    ],
  },
]

/* ═══════════════════════════════════════════════════════════════════════════
   Animated arrow connecting two flow nodes
   ═══════════════════════════════════════════════════════════════════════════ */

function FlowArrow({ methods, label }: { methods: string[]; label: string }) {
  return (
    <div className="relative flex flex-col items-center justify-center gap-2 py-2 lg:w-[160px] lg:gap-3 lg:py-0">
      {/* Label */}
      <p className="text-[10px] font-heading font-semibold uppercase tracking-[0.18em] text-brand-graphite-mid">
        {label}
      </p>

      {/* Arrow line + animated dot - horizontal on desktop, vertical on mobile */}
      <div className="relative h-20 w-px bg-gradient-to-b from-brand-blue/20 via-brand-blue to-brand-blue/20 lg:h-px lg:w-full lg:bg-gradient-to-r">
        <motion.div
          initial={{ top: '0%', left: '50%' }}
          animate={{ top: '100%', left: '50%' }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
          className="absolute -translate-x-1/2 -translate-y-1/2 lg:hidden"
        >
          <div className="h-1.5 w-1.5 rounded-full bg-brand-blue shadow-[0_0_12px_rgba(23,111,235,0.8)]" />
        </motion.div>
        <motion.div
          initial={{ left: '0%', top: '50%' }}
          animate={{ left: '100%', top: '50%' }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
          className="absolute hidden -translate-x-1/2 -translate-y-1/2 lg:block"
        >
          <div className="h-1.5 w-1.5 rounded-full bg-brand-blue shadow-[0_0_12px_rgba(23,111,235,0.8)]" />
        </motion.div>
        {/* Arrow head - down on mobile, right on desktop */}
        <ArrowRight
          className="absolute left-1/2 -bottom-1 h-3 w-3 -translate-x-1/2 rotate-90 text-brand-blue lg:bottom-auto lg:-right-1 lg:left-auto lg:top-1/2 lg:-translate-x-0 lg:-translate-y-1/2 lg:rotate-0"
        />
      </div>

      {/* Method chips */}
      <div className="flex max-w-[220px] flex-wrap justify-center gap-1">
        {methods.map((m) => (
          <span
            key={m}
            className="rounded-full border border-border bg-white px-2 py-0.5 text-[9px] font-medium text-brand-graphite-mid"
          >
            {m}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   End-node (Tenants / Owners / Vendors)
   ═══════════════════════════════════════════════════════════════════════════ */

function EndNode({
  icon: Icon,
  label,
  count,
  countLabel,
  variant = 'inbound',
}: {
  icon: typeof Users
  label: string
  count: string
  countLabel: string
  variant?: 'inbound' | 'outbound'
}) {
  return (
    <motion.div
      variants={revealItem}
      className="relative flex flex-col items-center gap-3 rounded-2xl border border-border bg-white px-5 py-6 text-center shadow-[0_1px_2px_rgba(10,22,40,0.04)] lg:min-w-[160px]"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/8">
        <Icon className="h-5 w-5 text-brand-blue" strokeWidth={2} />
      </div>
      <div>
        <p className="text-[10px] font-heading font-semibold uppercase tracking-wider text-brand-graphite-mid">
          {variant === 'inbound' ? 'Inbound' : 'Outbound'}
        </p>
        <p className="mt-0.5 font-heading text-sm font-semibold text-[#0A1628]">{label}</p>
      </div>
      <div className="border-t border-border pt-2.5 w-full">
        <p className="font-display text-xl font-normal text-brand-blue">{count}</p>
        <p className="text-[10px] text-brand-graphite-mid">{countLabel}</p>
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Central Revun payments hub
   ═══════════════════════════════════════════════════════════════════════════ */

function PaymentsHub() {
  return (
    <motion.div
      variants={revealItem}
      className="relative flex-1 overflow-hidden rounded-2xl border border-brand-blue/20 bg-gradient-to-br from-[#0A1628] via-[#0B1F3A] to-[#0A1628] p-6 text-white shadow-[0_30px_60px_-30px_rgba(10,22,40,0.35)] lg:p-8"
    >
      {/* Decorative glow */}
      <div className="pointer-events-none absolute -top-10 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-brand-blue/30 blur-3xl" aria-hidden="true" />

      <div className="relative flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-blue opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-blue" />
            </span>
            <p className="text-[10px] font-heading font-semibold uppercase tracking-[0.18em] text-white/70">
              Revun · Financial Core
            </p>
          </div>
          <h3 className="mt-2 font-display text-2xl font-normal leading-tight md:text-3xl">
            One ledger. Every dollar.
          </h3>
        </div>
        <div className="hidden items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-2.5 py-1 text-[10px] font-semibold text-white/80 backdrop-blur-sm md:flex">
          <Zap className="h-3 w-3 text-brand-blue" />
          Live
        </div>
      </div>

      {/* Live transaction feed */}
      <div className="mt-5 space-y-1.5">
        {[
          { label: 'Rent received · Unit 4B', amount: '+$2,400', accent: '#176FEB' },
          { label: 'Owner payout · Portfolio 12', amount: '-$18,250', accent: '#4A91F0' },
          { label: 'Vendor invoice · HVAC repair', amount: '-$640', accent: '#4A91F0' },
          { label: 'Late fee · Unit 12A', amount: '+$85', accent: '#176FEB' },
        ].map((t, i) => (
          <motion.div
            key={t.label}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.1 + i * 0.08 }}
            className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] backdrop-blur-sm"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-3 w-3" style={{ color: t.accent }} />
              <span className="text-white/80">{t.label}</span>
            </div>
            <span className="font-heading text-[11px] font-bold" style={{ color: t.accent }}>
              {t.amount}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Metrics strip */}
      <div className="mt-5 grid grid-cols-3 gap-3 border-t border-white/10 pt-4">
        {[
          { value: '$1.2M+', label: 'Processed monthly' },
          { value: '99.8%', label: 'On-time payouts' },
          { value: '< 0.1%', label: 'Reconciliation drift' },
        ].map((m) => (
          <div key={m.label}>
            <p className="font-display text-lg font-normal text-white">{m.value}</p>
            <p className="text-[9px] text-white/50">{m.label}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Operations Console — 4 tabs, each renders the flow as a process diagram
   ═══════════════════════════════════════════════════════════════════════════ */

type FlowStep = typeof flowSteps[number]

function ProcessDiagram({ flow }: { flow: FlowStep }) {
  return (
    <div className="relative h-full overflow-hidden rounded-xl border border-[#E5E7EB] bg-white p-7 md:p-9">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand-blue/[0.05] blur-3xl"
        aria-hidden="true"
      />

      {/* Direction chip */}
      <div className="relative">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-white px-2.5 py-1 font-heading text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-graphite-mid">
          <span className="h-1 w-1 rounded-full bg-brand-blue" aria-hidden="true" />
          Flow {flow.step} · {flow.direction}
        </span>
      </div>

      {/* Stat hero */}
      <div className="relative mt-6">
        <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-graphite-mid">
          Result
        </p>
        <p className="mt-2 font-display text-[52px] font-normal leading-[0.92] tabular-nums text-brand-blue md:text-[64px]">
          {flow.stat.value}
        </p>
        <p className="mt-2 font-heading text-[11px] font-medium uppercase tracking-[0.14em] text-brand-graphite-mid">
          {flow.stat.label}
        </p>
      </div>

      {/* Process rail */}
      <div className="relative mt-10 border-t border-[#F1F3F5] pt-6">
        <p className="mb-5 font-heading text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-graphite-mid">
          How it runs
        </p>
        <div
          className="pointer-events-none absolute left-[11px] top-[4.2rem] bottom-2 w-px bg-gradient-to-b from-brand-blue/40 via-[#E5E7EB] to-transparent"
          aria-hidden="true"
        />
        <ol className="space-y-4">
          {flow.process.map((s, i) => (
            <li key={i} className="relative flex items-start gap-4">
              <span className="relative z-10 mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-white font-heading text-[10px] font-semibold tabular-nums text-brand-blue ring-1 ring-brand-blue/40">
                {i + 1}
              </span>
              <p className="pt-0.5 font-heading text-[13.5px] leading-relaxed text-[#0A1628]">
                {s}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

function FlowsConsole() {
  const [active, setActive] = useState(0)
  const current = flowSteps[active]
  const Icon = current.icon

  return (
    <div>
      {/* Tab strip */}
      <div
        role="tablist"
        aria-label="Revun flow views"
        className="grid grid-cols-2 gap-2 sm:grid-cols-4"
      >
        {flowSteps.map((s, i) => {
          const isActive = i === active
          return (
            <button
              key={s.step}
              role="tab"
              type="button"
              aria-selected={isActive}
              onClick={() => setActive(i)}
              className={`group relative flex items-center gap-3 rounded-xl border px-3 py-3 text-left transition-all duration-200 md:px-4 ${
                isActive
                  ? 'border-brand-blue bg-white shadow-[0_8px_24px_-12px_rgba(23,111,235,0.35)]'
                  : 'border-[#E5E7EB] bg-white/60 hover:border-brand-blue/40 hover:bg-white'
              }`}
            >
              <span
                className={`font-display text-lg leading-none tabular-nums transition-colors duration-200 md:text-2xl ${
                  isActive ? 'text-brand-blue' : 'text-[#B0B6BD] group-hover:text-brand-blue/70'
                }`}
              >
                {s.step}
              </span>
              <span className="min-w-0">
                <span
                  className={`block font-heading text-[9px] font-semibold uppercase tracking-[0.14em] ${
                    isActive ? 'text-brand-blue' : 'text-brand-graphite-mid'
                  }`}
                >
                  {s.direction}
                </span>
                <span
                  className={`block truncate font-heading text-[13px] font-semibold ${
                    isActive ? 'text-[#0A1628]' : 'text-[#555860]'
                  }`}
                >
                  {s.title}
                </span>
              </span>
              {isActive && (
                <span
                  className="absolute inset-x-0 -bottom-px hidden h-[2px] bg-brand-blue sm:block"
                  aria-hidden="true"
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Panel — two balanced content cells, no outer chrome */}
      <div className="mt-6 grid gap-4 md:grid-cols-[1fr_340px] md:gap-5">
        {/* Visual */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`v-${active}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="h-full"
          >
            <ProcessDiagram flow={current} />
          </motion.div>
        </AnimatePresence>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`c-${active}`}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1], delay: 0.04 }}
            className="flex h-full flex-col rounded-xl border border-[#E5E7EB] bg-white p-6 md:p-7"
          >
            <div>
              <div className="flex items-center gap-2.5">
                <Icon className="h-5 w-5 shrink-0 text-brand-blue" strokeWidth={2} aria-hidden="true" />
                <h4 className="font-display text-2xl font-normal leading-tight text-[#0A1628]">
                  {current.title}
                </h4>
              </div>
              <p className="mt-3 text-[13.5px] leading-relaxed text-brand-graphite-mid">
                {current.description}
              </p>

              <div className="mt-5">
                <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-graphite-mid">
                  Methods
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {current.methods.map((m) => (
                    <span
                      key={m}
                      className="inline-flex items-center rounded-md border border-[#E5E7EB] bg-white px-2 py-0.5 font-heading text-[10px] font-semibold uppercase tracking-[0.08em] text-[#3A4148]"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer — proof line anchored to the bottom of the panel */}
            <div className="mt-auto flex items-center gap-1.5 border-t border-[#F1F3F5] pt-5 font-heading text-[11px] font-medium text-brand-graphite-mid">
              <CheckCircle2 className="h-3.5 w-3.5 text-brand-blue" strokeWidth={2.2} aria-hidden="true" />
              {current.status}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Section
   ═══════════════════════════════════════════════════════════════════════════ */

export function PaymentsFintech() {
  return (
    <section className="relative overflow-hidden bg-brand-off-white py-12 md:py-20 lg:py-28">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid bg-grid-mask opacity-[0.03]" aria-hidden="true" />
      <div
        className="absolute bottom-0 right-0 h-[500px] w-[500px] translate-x-1/4 translate-y-1/3 rounded-full bg-brand-blue/[0.05] blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        {/* Header */}
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <motion.p
            variants={revealItem}
            className="text-sm font-heading font-semibold uppercase tracking-wider text-brand-blue"
          >
            Financial Operating Layer
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mt-3 font-display text-3xl font-normal leading-[1.1] text-[#0A1628] md:text-5xl"
          >
            Every dollar flows through{' '}
            <span className="text-keyword">one infrastructure layer</span>
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mx-auto mt-4 max-w-xl text-base md:text-lg text-brand-graphite-mid"
          >
            Rent comes in. Owners get paid. Vendors get paid. Reports reconcile
            themselves. No more e-transfer chases, no more spreadsheet patches, no
            more audit panic.
          </motion.p>
        </RevealOnScroll>

        {/* ══ Money flow diagram ══ */}
        <RevealOnScroll className="mt-16" stagger={0.1}>
          <div className="flex flex-col items-stretch gap-2 lg:flex-row lg:items-center">
            {/* Inbound zone */}
            <div className="flex justify-center lg:w-[180px]">
              <EndNode
                icon={Users}
                label="Tenants"
                count="12,400+"
                countLabel="active renters"
                variant="inbound"
              />
            </div>

            {/* Inbound arrow */}
            <FlowArrow methods={inboundMethods} label="Inbound" />

            {/* Central hub */}
            <div className="flex-1">
              <PaymentsHub />
            </div>

            {/* Outbound arrow */}
            <FlowArrow methods={outboundMethods} label="Outbound" />

            {/* Outbound zone */}
            <div className="flex flex-col gap-3 lg:w-[180px]">
              <EndNode
                icon={Building2}
                label="Owners"
                count="847"
                countLabel="portfolios paid"
                variant="outbound"
              />
              <EndNode
                icon={Wrench}
                label="Vendors"
                count="320+"
                countLabel="network partners"
                variant="outbound"
              />
            </div>
          </div>
        </RevealOnScroll>

        {/* ══ Operations Console — tabbed, each tab renders a live mini-UI ══ */}
        <RevealOnScroll className="relative mt-24" stagger={0.08}>
          <motion.div variants={revealItem} className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.18em] text-brand-graphite-mid">
                What happens inside Revun
              </p>
              <h3 className="mt-2 font-display text-2xl font-normal leading-[1.1] text-[#0A1628] md:text-[40px]">
                Four flows. One connected system.
              </h3>
            </div>
            <p className="text-[12px] text-brand-graphite-mid md:max-w-[280px] md:text-right">
              Tap a flow to see the live view. Every row you see below runs on the same ledger.
            </p>
          </motion.div>

          <motion.div variants={revealItem}>
            <FlowsConsole />
          </motion.div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
