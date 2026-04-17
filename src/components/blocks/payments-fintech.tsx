'use client'

import { motion } from 'framer-motion'
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
    icon: Wallet,
    title: 'Rent Collection',
    description:
      'Automated collection via PAD, credit card, and Interac, with reminders, receipts, and a full ledger of who paid and who did not.',
    stat: { value: '$1.2M+', label: 'collected monthly' },
  },
  {
    step: '02',
    icon: Send,
    title: 'Owner Disbursements',
    description:
      'Detailed statements and direct deposit to any Canadian or US bank account, on schedule, every time, with full transparency.',
    stat: { value: '99.8%', label: 'on-time payout rate' },
  },
  {
    step: '03',
    icon: Receipt,
    title: 'Vendor Payments',
    description:
      'Invoice matching, approval workflows, and spend visibility across your portfolio. Vendors stop chasing you, jobs stop stalling.',
    stat: { value: '2.4×', label: 'faster invoice settlement' },
  },
  {
    step: '04',
    icon: BarChart3,
    title: 'Financial Reporting',
    description:
      'Real-time P&L, cash flow, and tax-ready reports: export to QuickBooks, Xero, or CSV in one click.',
    stat: { value: '1-click', label: 'to audit-ready books' },
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
   Section
   ═══════════════════════════════════════════════════════════════════════════ */

export function PaymentsFintech() {
  return (
    <section className="relative overflow-hidden bg-brand-off-white py-20 md:py-28">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid bg-grid-mask opacity-[0.03]" aria-hidden="true" />
      <div
        className="absolute bottom-0 right-0 h-[500px] w-[500px] translate-x-1/4 translate-y-1/3 rounded-full bg-brand-blue/[0.05] blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
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
            className="mt-3 font-display text-4xl font-normal leading-[1.1] text-[#0A1628] md:text-5xl"
          >
            Every dollar flows through{' '}
            <span className="text-keyword">one infrastructure layer</span>
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mx-auto mt-4 max-w-xl text-lg text-brand-graphite-mid"
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

        {/* ══ Editorial flow timeline (4 steps, connected, no cards) ══ */}
        <RevealOnScroll className="relative mt-24" stagger={0.1}>
          <motion.div variants={revealItem} className="mb-10 text-center">
            <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.18em] text-brand-graphite-mid">
              What happens inside Revun
            </p>
            <h3 className="mt-2 font-display text-2xl font-normal text-[#0A1628] md:text-3xl">
              Four flows. One connected system.
            </h3>
          </motion.div>

          <div className="relative grid gap-y-10 gap-x-6 lg:grid-cols-4">
            {/* Connector beam - runs through the vertical midpoint of the 48px icons */}
            <div
              className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block"
              aria-hidden="true"
            />

            {flowSteps.map((s) => (
              <motion.div
                key={s.step}
                variants={revealItem}
                className="group relative flex flex-col"
              >
                {/* Icon tile with step-number badge */}
                <div className="relative w-12">
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue text-white shadow-[0_8px_20px_-8px_rgba(23,111,235,0.5)] transition-transform duration-300 group-hover:scale-105">
                    <s.icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  {/* Step number badge */}
                  <span
                    className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-blue text-[9px] font-heading font-semibold text-white ring-2 ring-white"
                    aria-hidden="true"
                  >
                    {s.step}
                  </span>
                  {/* Hover glow */}
                  <div
                    className="absolute -inset-2 -z-10 rounded-2xl bg-brand-blue/10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </div>

                {/* Content */}
                <div className="mt-5">
                  <h4 className="font-heading text-[15px] font-semibold text-[#0A1628]">
                    {s.title}
                  </h4>
                  <p className="mt-2 text-[13px] leading-relaxed text-brand-graphite-mid">
                    {s.description}
                  </p>

                  {/* Inline stat chip */}
                  <div className="mt-4 inline-flex items-baseline gap-2 rounded-lg border border-border bg-white px-3 py-1.5">
                    <span className="font-display text-base font-normal text-brand-blue">
                      {s.stat.value}
                    </span>
                    <span className="text-[10px] text-brand-graphite-mid">
                      {s.stat.label}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
