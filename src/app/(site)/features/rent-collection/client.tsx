'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Landmark,
  Zap,
  Wallet,
  Bell,
  Repeat,
  Users,
  Calendar,
  AlertTriangle,
  Sparkles,
  Shield,
  FileText,
  Download,
  TrendingUp,
  Clock,
  ChevronDown,
  Send,
  Building2,
  Quote,
  Star,
  MapPin,
  Percent,
  DollarSign,
  PiggyBank,
} from 'lucide-react'
import { sanitizeJsonLd } from '@/lib/utils'

/* ═══════════════════════════════════════════ */
/*  Shared primitives                          */
/* ═══════════════════════════════════════════ */

const ease = [0.22, 1, 0.36, 1] as const

function SectionWrapper({ children, id, dark }: { children: React.ReactNode; id: string; dark?: boolean }) {
  return (
    <section id={id} className={`py-16 md:py-20 ${dark ? 'bg-[#F5F6F8]' : 'bg-white'}`}>
      <div className="mx-auto max-w-6xl px-6">{children}</div>
    </section>
  )
}

function SectionHeader({ eyebrow, title, highlight, description }: {
  eyebrow: string; title: string; highlight: string; description: string
}) {
  return (
    <RevealOnScroll className="mx-auto max-w-2xl text-center">
      <motion.p variants={revealItem} className="text-sm font-heading font-semibold uppercase tracking-wider text-[#176FEB]">
        {eyebrow}
      </motion.p>
      <motion.h2 variants={revealItem} className="mt-3 font-display text-3xl font-normal md:text-4xl lg:text-5xl text-[#0A1628]">
        {title} <span className="text-[#176FEB]">{highlight}</span>
      </motion.h2>
      <motion.p variants={revealItem} className="mx-auto mt-4 max-w-xl text-base md:text-lg text-[#555860]">
        {description}
      </motion.p>
    </RevealOnScroll>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 1: Hero                            */
/* ═══════════════════════════════════════════ */

function Hero() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative overflow-hidden bg-white pb-16 pt-28 md:pb-20 md:pt-32">
      <div className="absolute inset-0 bg-grid bg-grid-mask opacity-40" aria-hidden="true" />
      <div className="absolute top-0 right-[-200px] h-[600px] w-[600px] rounded-full bg-[#176FEB]/[0.06] blur-[140px]" aria-hidden="true" />

      <div ref={ref} className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left: copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease }}
              className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-1.5 shadow-sm"
            >
              <span className="flex h-2 w-2 rounded-full bg-[#22C55E] animate-pulse" />
              <span className="text-sm font-medium text-[#555860]">Rent Collection · Built for Canada</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease, delay: 0.1 }}
              className="mt-6 font-display text-4xl font-normal leading-[1.05] tracking-tight text-[#0A1628] sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Rent collected{' '}
              <span className="text-[#176FEB]">on autopilot.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease, delay: 0.2 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-[#555860] md:text-lg lg:text-xl"
            >
              Pre-Authorized Debit, Interac e-Transfer, credit and debit — with auto-reminders, split payments, late fees, and one-click accounting reconciliation.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease, delay: 0.3 }}
              className="mt-9 flex flex-col items-start gap-3 sm:flex-row"
            >
              <Link
                href="/pricing/"
                className="inline-flex h-14 w-full sm:w-auto items-center justify-center rounded-xl bg-[#176FEB] px-8 text-base font-semibold text-white shadow-[0_8px_24px_-8px_rgba(23,111,235,0.5)] transition-all hover:bg-[#1260d1] hover:shadow-[0_12px_28px_-8px_rgba(23,111,235,0.6)]"
              >
                Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/demo/"
                className="inline-flex h-14 w-full sm:w-auto items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-8 text-base font-semibold text-[#0A1628] transition-all hover:border-[#176FEB]/30 hover:text-[#176FEB] hover:shadow-sm"
              >
                Book a Demo
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease, delay: 0.4 }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[#E5E7EB] pt-6"
            >
              {[
                { icon: Landmark, label: 'PAD (Canadian bank draft)' },
                { icon: Zap, label: 'Interac e-Transfer' },
                { icon: CreditCard, label: 'Credit & Debit Cards' },
                { icon: Shield, label: 'PCI-DSS compliant' },
              ].map((t) => (
                <div key={t.label} className="flex items-center gap-2 text-xs text-[#555860]">
                  <t.icon className="h-4 w-4 text-[#176FEB]" />
                  <span>{t.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: payment flow card */}
          <HeroPaymentCard inView={inView} />
        </div>
      </div>
    </section>
  )
}

function HeroPaymentCard({ inView }: { inView: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-[#176FEB]/10 to-transparent blur-2xl" aria-hidden="true" />

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.97 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.7, ease, delay: 0.2 }}
        className="relative overflow-hidden rounded-3xl border border-[#E5E7EB] bg-white p-6 shadow-[0_24px_60px_-20px_rgba(10,22,40,0.2)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#176FEB]/10">
              <DollarSign className="h-5 w-5 text-[#176FEB]" />
            </div>
            <div>
              <p className="font-heading text-sm font-semibold text-[#0A1628]">Rent Collection</p>
              <p className="text-[11px] text-[#555860]">May 2026</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#22C55E]/10 px-2.5 py-1 text-[10px] font-semibold text-[#22C55E]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E] animate-pulse" />
            Live
          </span>
        </div>

        {/* Big number */}
        <div className="mt-6">
          <p className="text-xs uppercase tracking-wider text-[#555860]">Collected this month</p>
          <motion.p
            className="mt-1 font-display text-5xl font-bold text-[#0A1628]"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            $247,850
          </motion.p>
          <div className="mt-3 flex items-center gap-2 text-xs text-[#22C55E]">
            <TrendingUp className="h-3.5 w-3.5" />
            <span className="font-semibold">98.2% on-time rate</span>
            <span className="text-[#555860]">· 186 of 189 units</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-[#F5F6F8]">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#176FEB] to-[#60A5FA]"
            initial={{ width: 0 }}
            animate={inView ? { width: '98%' } : {}}
            transition={{ duration: 1.2, ease, delay: 0.6 }}
          />
        </div>

        {/* Recent payments */}
        <div className="mt-6 space-y-2.5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#555860]">Recent payments</p>
          {[
            { tenant: 'Sarah M.', unit: '5D', method: 'PAD', amount: '$1,850', time: '2 min ago', status: 'success' },
            { tenant: 'Ravi K.', unit: '3A', method: 'Interac', amount: '$2,100', time: '14 min ago', status: 'success' },
            { tenant: 'Priya S.', unit: '7B', method: 'Credit', amount: '$1,650', time: '1 hr ago', status: 'success' },
          ].map((p, i) => (
            <motion.div
              key={p.tenant}
              initial={{ opacity: 0, x: -8 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, ease, delay: 0.7 + i * 0.1 }}
              className="flex items-center gap-3 rounded-xl border border-[#E5E7EB] bg-[#F5F6F8] px-3 py-2.5"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#22C55E]/10">
                <CheckCircle2 className="h-4 w-4 text-[#22C55E]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-heading text-xs font-semibold text-[#0A1628]">{p.tenant} · Unit {p.unit}</span>
                  <span className="font-heading text-xs font-bold text-[#0A1628]">{p.amount}</span>
                </div>
                <div className="mt-0.5 flex items-center justify-between text-[10px] text-[#555860]">
                  <span>{p.method}</span>
                  <span>{p.time}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Floating notification */}
      <motion.div
        initial={{ opacity: 0, y: 20, x: 20, scale: 0.9 }}
        animate={inView ? { opacity: 1, y: 0, x: 0, scale: 1 } : {}}
        transition={{ duration: 0.5, ease, delay: 1.2 }}
        className="absolute -bottom-6 -left-4 hidden md:flex items-center gap-3 rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 shadow-xl md:-left-8"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#176FEB]/10">
          <Bell className="h-4 w-4 text-[#176FEB]" />
        </div>
        <div>
          <p className="font-heading text-xs font-semibold text-[#0A1628]">Auto-reminder sent</p>
          <p className="text-[11px] text-[#555860]">3 tenants · due in 3 days</p>
        </div>
      </motion.div>
    </div>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 2: Stats bar                       */
/* ═══════════════════════════════════════════ */

function StatsBar() {
  const stats = [
    { value: '98.2%', label: 'On-time collection rate' },
    { value: '< 2 hrs', label: 'Reconciled to books' },
    { value: '$0', label: 'Per-transaction PAD fee' },
    { value: '63 / 63', label: 'Provinces + US states' },
  ]
  return (
    <section className="border-y border-[#E5E7EB] bg-white py-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-3xl font-bold text-[#0A1628] md:text-4xl">{s.value}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-wider text-[#555860]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 3: Payment methods                 */
/* ═══════════════════════════════════════════ */

const paymentMethods = [
  {
    icon: Landmark,
    name: 'Pre-Authorized Debit',
    tag: 'PAD',
    fee: 'Free',
    speed: '1-2 business days',
    pro: 'Best for recurring rent',
    desc: 'Auto-pull rent straight from tenant chequing on the 1st. No tenant action required.',
    color: '#176FEB',
    highlight: true,
  },
  {
    icon: Zap,
    name: 'Interac e-Transfer',
    tag: 'Interac',
    fee: '$0.50',
    speed: 'Same-day',
    pro: 'Canadian favorite',
    desc: 'Auto-deposit-enabled tenants send rent in one tap. No account numbers exchanged.',
    color: '#FF6B35',
  },
  {
    icon: CreditCard,
    name: 'Credit Card',
    tag: 'Visa · MC · Amex',
    fee: '2.9% + $0.30',
    speed: 'Instant',
    pro: 'Tenant pays the fee (optional)',
    desc: 'Let tenants earn points or pass the processing fee to them — your call per property.',
    color: '#22C55E',
  },
  {
    icon: Wallet,
    name: 'Debit Card',
    tag: 'Visa / MC Debit',
    fee: '$0.95 flat',
    speed: 'Instant',
    pro: 'Lowest fixed fee',
    desc: 'Flat-fee debit keeps processing costs predictable for higher-ticket rentals.',
    color: '#8B5CF6',
  },
]

function PaymentMethods() {
  return (
    <SectionWrapper id="methods" dark>
      <SectionHeader
        eyebrow="Payment Methods"
        title="Four rails,"
        highlight="one reconciled ledger."
        description="Let every tenant pay the way they want — Revun normalizes all four into one clean rent roll."
      />
      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {paymentMethods.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease, delay: 0.05 + i * 0.08 }}
            className={`relative flex flex-col rounded-2xl border bg-white p-6 transition-all hover:shadow-lg ${
              m.highlight ? 'border-[#176FEB]/30 ring-1 ring-[#176FEB]/10' : 'border-[#E5E7EB] hover:border-[#176FEB]/30'
            }`}
          >
            {m.highlight && (
              <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-[#176FEB] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow-sm">
                <Sparkles className="h-3 w-3" /> Recommended
              </span>
            )}
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${m.color}15` }}
            >
              <m.icon className="h-6 w-6" style={{ color: m.color }} />
            </div>
            <h3 className="mt-4 font-heading text-lg font-semibold text-[#0A1628]">{m.name}</h3>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider" style={{ color: m.color }}>
              {m.tag}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#555860]">{m.desc}</p>
            <div className="mt-5 space-y-2 border-t border-[#E5E7EB] pt-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#555860]">Fee</span>
                <span className="font-heading font-semibold text-[#0A1628]">{m.fee}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#555860]">Speed</span>
                <span className="font-heading font-semibold text-[#0A1628]">{m.speed}</span>
              </div>
              <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-[#F5F6F8] px-2.5 py-1 text-[10px] font-medium text-[#0A1628]">
                <CheckCircle2 className="h-3 w-3 text-[#22C55E]" /> {m.pro}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 4: Auto-collection flow            */
/* ═══════════════════════════════════════════ */

const flowSteps = [
  {
    day: 'Day -3',
    icon: Bell,
    title: 'Gentle reminder',
    desc: 'Tenant gets SMS + email 3 days before rent is due with a one-tap pay link.',
    color: '#176FEB',
  },
  {
    day: 'Day 1',
    icon: Zap,
    title: 'Auto-debit',
    desc: 'PAD pulls rent at 8am EST. Interac and cards process on file automatically.',
    color: '#22C55E',
  },
  {
    day: 'Day 1',
    icon: CheckCircle2,
    title: 'Reconciled instantly',
    desc: 'Payment posts to the rent roll, owner ledger, and accounting export in under 2 hours.',
    color: '#8B5CF6',
  },
  {
    day: 'Day 4+',
    icon: AlertTriangle,
    title: 'Late-fee escalation',
    desc: 'If unpaid, Revun sends escalating notices and auto-applies late fees per provincial rules.',
    color: '#F59E0B',
  },
]

function AutoCollectionFlow() {
  return (
    <SectionWrapper id="flow">
      <SectionHeader
        eyebrow="Automation"
        title="Set it once."
        highlight="Forget rent day."
        description="Revun runs the whole cycle — from friendly reminder to late-fee enforcement — without you lifting a finger."
      />
      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {flowSteps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease, delay: 0.05 + i * 0.1 }}
            className="relative flex flex-col rounded-2xl border border-[#E5E7EB] bg-white p-6 transition-all hover:border-[#176FEB]/30 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${s.color}15` }}
              >
                <s.icon className="h-5 w-5" style={{ color: s.color }} />
              </div>
              <span
                className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
                style={{ backgroundColor: `${s.color}15`, color: s.color }}
              >
                {s.day}
              </span>
            </div>
            <h3 className="mt-5 font-heading text-base font-semibold text-[#0A1628]">{s.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-[#555860]">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 5: Rent roll dashboard             */
/* ═══════════════════════════════════════════ */

function RentRollDashboard() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const units = [
    { tenant: 'Sarah Mitchell', unit: '5D · Maple Ridge', amount: '$1,850', status: 'Paid', method: 'PAD', color: '#22C55E', pct: 100 },
    { tenant: 'Ravi Khatri', unit: '3A · Queen West', amount: '$2,100', status: 'Paid', method: 'Interac', color: '#22C55E', pct: 100 },
    { tenant: 'Priya Sharma', unit: '7B · Yonge & Eg', amount: '$1,650', status: 'Paid', method: 'Credit', color: '#22C55E', pct: 100 },
    { tenant: 'Marcus Tremblay', unit: '12C · Plateau', amount: '$1,450', status: 'Pending', method: 'PAD', color: '#F59E0B', pct: 45 },
    { tenant: 'Amara Nwosu', unit: '2F · Commercial Dr', amount: '$1,900', status: 'Overdue', method: 'Manual', color: '#EF4444', pct: 0 },
  ]

  return (
    <SectionWrapper id="dashboard" dark>
      <SectionHeader
        eyebrow="Live Dashboard"
        title="Every payment,"
        highlight="every status, one view."
        description="See who paid, who's pending, and who needs a nudge — across your entire portfolio, in real time."
      />

      <div ref={ref} className="mt-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_20px_60px_-20px_rgba(10,22,40,0.15)]"
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-2 border-b border-[#E5E7EB] bg-[#F8F9FA] px-4 py-2.5">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FEBD2F]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
            </div>
            <div className="flex-1 flex justify-center">
              <span className="rounded-md border border-[#E5E7EB] bg-white px-3 py-1 text-xs text-[#94A3B8]">
                app.revun.com/rent-collection
              </span>
            </div>
          </div>

          {/* Summary strip */}
          <div className="grid grid-cols-2 gap-3 border-b border-[#E5E7EB] bg-white p-5 md:grid-cols-4">
            {[
              { label: 'Expected', value: '$252,700', sub: '189 units', color: '#0A1628' },
              { label: 'Collected', value: '$247,850', sub: '186 units', color: '#22C55E' },
              { label: 'Pending', value: '$2,950', sub: '2 units', color: '#F59E0B' },
              { label: 'Overdue', value: '$1,900', sub: '1 unit', color: '#EF4444' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, ease, delay: 0.2 + i * 0.08 }}
                className="rounded-xl border border-[#E5E7EB] p-4"
              >
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#555860]">{s.label}</p>
                <p className="mt-1.5 font-display text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
                <p className="mt-0.5 text-[11px] text-[#555860]">{s.sub}</p>
              </motion.div>
            ))}
          </div>

          {/* Unit rows */}
          <div className="bg-[#F5F6F8] p-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#555860]">Rent roll · May 2026</p>
              <span className="inline-flex items-center gap-1 text-[11px] text-[#555860]">
                <Clock className="h-3 w-3" /> Updated 2 min ago
              </span>
            </div>
            <div className="space-y-2">
              {units.map((u, i) => (
                <motion.div
                  key={u.tenant}
                  initial={{ opacity: 0, x: -8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, ease, delay: 0.4 + i * 0.08 }}
                  className="flex items-center gap-4 rounded-xl border border-[#E5E7EB] bg-white px-4 py-3"
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-heading text-xs font-bold text-white"
                    style={{ backgroundColor: u.color }}
                  >
                    {u.tenant.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2">
                      <span className="font-heading text-sm font-semibold text-[#0A1628]">{u.tenant}</span>
                      <span className="text-xs text-[#555860]">· {u.unit}</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-[#F5F6F8]">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: u.color }}
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${u.pct}%` } : {}}
                        transition={{ duration: 0.8, ease, delay: 0.6 + i * 0.08 }}
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-heading text-sm font-bold text-[#0A1628]">{u.amount}</p>
                    <span
                      className="mt-0.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold"
                      style={{ backgroundColor: `${u.color}15`, color: u.color }}
                    >
                      {u.status} · {u.method}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-[#E5E7EB] bg-white px-5 py-3">
            <span className="inline-flex items-center gap-1.5 text-[11px] text-[#555860]">
              <Sparkles className="h-3 w-3 text-[#176FEB]" />
              AI detected 2 risk signals this month
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#176FEB]">
              Export to accounting <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 6: Smart features grid             */
/* ═══════════════════════════════════════════ */

const smartFeatures = [
  {
    icon: Bell,
    title: 'Smart reminders',
    desc: 'Friendly nudges 3 days before, on due date, and escalating notices after — SMS, email, or push.',
    highlight: '3-stage cadence',
  },
  {
    icon: Users,
    title: 'Split payments',
    desc: 'Roommates split rent automatically. Each pays their share, you see one combined ledger.',
    highlight: 'Up to 6 roommates',
  },
  {
    icon: AlertTriangle,
    title: 'Late fees on autopilot',
    desc: 'Per-province late-fee rules (Ontario RTA, BC RTB, Quebec TAL) enforced automatically.',
    highlight: 'Province-compliant',
  },
  {
    icon: Calendar,
    title: 'Payment plans',
    desc: 'Offer struggling tenants a 2- or 3-payment split with one click. Documented for tribunal.',
    highlight: 'Hardship-ready',
  },
  {
    icon: Percent,
    title: 'Autopay discounts',
    desc: 'Incentivize PAD enrollment with small discounts. Average 40% more tenants opt in.',
    highlight: '+40% PAD adoption',
  },
  {
    icon: Repeat,
    title: 'NSF recovery',
    desc: 'Failed payments auto-retry in 72 hours. NSF fee applied per provincial cap.',
    highlight: 'Auto-retry + NSF',
  },
]

function SmartFeatures() {
  return (
    <SectionWrapper id="smart-features">
      <SectionHeader
        eyebrow="Smart Features"
        title="Everything else"
        highlight="rent collection needs."
        description="From reminders to hardship plans — Revun handles the edge cases that usually live in spreadsheets and email threads."
      />
      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {smartFeatures.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease, delay: 0.05 + i * 0.06 }}
            className="flex flex-col rounded-2xl border border-[#E5E7EB] bg-white p-6 transition-all hover:border-[#176FEB]/30 hover:shadow-md"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#176FEB]/10">
              <f.icon className="h-5 w-5 text-[#176FEB]" />
            </div>
            <h3 className="mt-4 font-heading text-base font-semibold text-[#0A1628]">{f.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-[#555860]">{f.desc}</p>
            <div className="mt-4 inline-flex w-fit items-center gap-1 rounded-full bg-[#F5F6F8] px-2.5 py-1 text-[10px] font-semibold text-[#0A1628]">
              <Sparkles className="h-3 w-3 text-[#176FEB]" /> {f.highlight}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 7: Accounting integrations         */
/* ═══════════════════════════════════════════ */

function AccountingIntegrations() {
  const integrations = [
    { name: 'QuickBooks', tag: 'Online', accent: '#2CA01C' },
    { name: 'Xero', tag: 'Cloud', accent: '#13B5EA' },
    { name: 'Sage', tag: 'Accounting', accent: '#00D639' },
    { name: 'FreshBooks', tag: 'CA', accent: '#0075DD' },
  ]
  return (
    <SectionWrapper id="accounting" dark>
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <RevealOnScroll>
          <motion.p variants={revealItem} className="font-heading text-sm font-semibold uppercase tracking-wider text-[#176FEB]">
            Accounting
          </motion.p>
          <motion.h2 variants={revealItem} className="mt-3 font-display text-3xl font-normal text-[#0A1628] md:text-4xl lg:text-5xl">
            Reconciled to your books{' '}
            <span className="text-[#176FEB]">in under 2 hours.</span>
          </motion.h2>
          <motion.p variants={revealItem} className="mt-4 max-w-md text-lg text-[#555860]">
            Every payment posts with the right GL code, tax split, and property tag — ready for your accountant.
          </motion.p>
          <motion.ul variants={revealItem} className="mt-8 space-y-4">
            {[
              { icon: Download, label: 'One-click CSV or direct sync' },
              { icon: FileText, label: 'GST/HST split-out per province' },
              { icon: PiggyBank, label: 'Owner ledgers separated automatically' },
              { icon: Shield, label: 'CRA-ready audit trail' },
            ].map((f) => (
              <li key={f.label} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#176FEB]/10">
                  <f.icon className="h-4 w-4 text-[#176FEB]" />
                </span>
                <span className="text-base text-[#0A1628]">{f.label}</span>
              </li>
            ))}
          </motion.ul>
        </RevealOnScroll>

        {/* Integration cards */}
        <RevealOnScroll>
          <motion.div variants={revealItem} className="grid grid-cols-2 gap-4">
            {integrations.map((int) => (
              <div
                key={int.name}
                className="flex flex-col items-start rounded-2xl border border-[#E5E7EB] bg-white p-5 transition-all hover:border-[#176FEB]/30 hover:shadow-md"
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl text-white font-heading text-lg font-bold"
                  style={{ backgroundColor: int.accent }}
                >
                  {int.name[0]}
                </div>
                <p className="mt-3 font-heading text-base font-semibold text-[#0A1628]">{int.name}</p>
                <p className="text-xs text-[#555860]">{int.tag}</p>
                <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-[#22C55E]/10 px-2 py-0.5 text-[10px] font-semibold text-[#22C55E]">
                  <CheckCircle2 className="h-3 w-3" /> Connected
                </div>
              </div>
            ))}
            <div className="col-span-2 flex items-center gap-3 rounded-2xl border border-dashed border-[#E5E7EB] bg-white p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#176FEB]/10">
                <Repeat className="h-5 w-5 text-[#176FEB]" />
              </div>
              <div>
                <p className="font-heading text-sm font-semibold text-[#0A1628]">Need another integration?</p>
                <p className="text-xs text-[#555860]">REST API + Zapier support every major accounting platform.</p>
              </div>
            </div>
          </motion.div>
        </RevealOnScroll>
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 8: Owner payouts                   */
/* ═══════════════════════════════════════════ */

function OwnerPayouts() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <SectionWrapper id="payouts">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Left: payout schedule card */}
        <div ref={ref} className="relative order-2 lg:order-1">
          <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-[#22C55E]/10 to-transparent blur-2xl" aria-hidden="true" />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="relative rounded-3xl border border-[#E5E7EB] bg-white p-6 shadow-[0_20px_60px_-20px_rgba(10,22,40,0.15)]"
          >
            <div className="flex items-center justify-between">
              <p className="font-heading text-sm font-semibold text-[#0A1628]">Owner Payouts</p>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#22C55E]/10 px-2.5 py-1 text-[10px] font-semibold text-[#22C55E]">
                <CheckCircle2 className="h-3 w-3" /> All sent
              </span>
            </div>
            <p className="mt-1 text-xs text-[#555860]">May 3, 2026 · Batch #0052</p>

            <div className="mt-5 rounded-2xl bg-gradient-to-br from-[#176FEB] to-[#1260d1] p-5 text-white">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-white/70">Net to owners</p>
              <p className="mt-1 font-display text-4xl font-bold">$218,450</p>
              <p className="mt-1 text-xs text-white/80">After management fee + GST</p>
            </div>

            <div className="mt-5 space-y-2.5">
              {[
                { owner: 'M. Chen', portfolio: '12 units', net: '$18,230' },
                { owner: 'A. Patel', portfolio: '8 units', net: '$12,450' },
                { owner: 'S. Martin', portfolio: '24 units', net: '$42,100' },
              ].map((p, i) => (
                <motion.div
                  key={p.owner}
                  initial={{ opacity: 0, x: 8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, ease, delay: 0.3 + i * 0.1 }}
                  className="flex items-center justify-between rounded-xl border border-[#E5E7EB] bg-[#F5F6F8] px-4 py-3"
                >
                  <div>
                    <p className="font-heading text-sm font-semibold text-[#0A1628]">{p.owner}</p>
                    <p className="text-[11px] text-[#555860]">{p.portfolio}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-heading text-sm font-bold text-[#0A1628]">{p.net}</p>
                    <p className="text-[11px] text-[#22C55E]">Sent · PAD</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-[#E5E7EB] pt-4">
              <span className="inline-flex items-center gap-1.5 text-[11px] text-[#555860]">
                <Clock className="h-3 w-3" /> Next payout: Jun 3
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#176FEB]">
                View statement <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right: copy */}
        <div className="order-1 lg:order-2">
          <RevealOnScroll>
            <motion.p variants={revealItem} className="font-heading text-sm font-semibold uppercase tracking-wider text-[#176FEB]">
              Owner Payouts
            </motion.p>
            <motion.h2 variants={revealItem} className="mt-3 font-display text-3xl font-normal text-[#0A1628] md:text-4xl lg:text-5xl">
              Pay your owners{' '}
              <span className="text-[#176FEB]">the moment rent clears.</span>
            </motion.h2>
            <motion.p variants={revealItem} className="mt-4 max-w-md text-lg text-[#555860]">
              Automatic PAD payouts on your schedule — daily, weekly, or monthly. Every owner gets a statement showing exactly what cleared.
            </motion.p>
            <motion.ul variants={revealItem} className="mt-8 space-y-4">
              {[
                { icon: Send, label: 'Batch payouts to unlimited owners' },
                { icon: FileText, label: 'Auto-generated owner statements (PDF)' },
                { icon: Percent, label: 'Management fee auto-calculated and split' },
                { icon: Shield, label: 'T4A and 1099 generation at year-end' },
              ].map((f) => (
                <li key={f.label} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#176FEB]/10">
                    <f.icon className="h-4 w-4 text-[#176FEB]" />
                  </span>
                  <span className="text-base text-[#0A1628]">{f.label}</span>
                </li>
              ))}
            </motion.ul>
          </RevealOnScroll>
        </div>
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 9: Testimonials                    */
/* ═══════════════════════════════════════════ */

const testimonials = [
  {
    quote:
      'We moved 140 units to PAD in 6 weeks. On-time collection jumped from 81% to 97% and my AR calls dropped to near zero.',
    name: 'Jasmine Walsh',
    title: 'Director of Operations · Harbourview Rentals',
    location: 'Halifax, NS',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=90',
  },
  {
    quote:
      'Split payments for student housing used to be a nightmare. Four roommates, four reminders, one lease — Revun just does it.',
    name: 'Olivier Fortin',
    title: 'Founder · Campus Living Québec',
    location: 'Montréal, QC',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=90',
  },
  {
    quote:
      'Accounting export to QuickBooks used to eat a full day every month. Now it is one click and the GST is already split.',
    name: 'Amanda Kaur',
    title: 'Controller · Pacific Coast Property Group',
    location: 'Vancouver, BC',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=90',
  },
]

function Testimonials() {
  return (
    <SectionWrapper id="testimonials" dark>
      <SectionHeader
        eyebrow="Proof"
        title="North American operators"
        highlight="collect more, chase less."
        description="Real property managers, real numbers — from the first 90 days on Revun."
      />
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease, delay: 0.05 + i * 0.1 }}
            className="relative flex h-full flex-col rounded-2xl border border-[#E5E7EB] bg-white p-6 transition-all hover:border-[#176FEB]/30 hover:shadow-md md:p-8"
          >
            <Quote className="absolute right-6 top-6 h-10 w-10 text-[#176FEB]/10" />
            <div className="mb-4 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star key={s} className="h-4 w-4 fill-[#176FEB] stroke-[#176FEB]" />
              ))}
            </div>
            <p className="relative z-10 font-display text-lg leading-snug text-[#0A1628] md:text-xl">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-3 border-t border-[#E5E7EB] pt-6">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                <Image src={t.photo} alt={`${t.name}, ${t.title}`} fill sizes="48px" className="object-cover" />
              </div>
              <div className="min-w-0">
                <div className="truncate font-bold text-[#0A1628]">{t.name}</div>
                <div className="mt-0.5 flex items-center gap-1 text-xs text-[#555860]">
                  <Building2 className="h-3 w-3 shrink-0" />
                  <span className="truncate">{t.title}</span>
                </div>
                <div className="mt-0.5 flex items-center gap-1 text-xs text-[#555860]">
                  <MapPin className="h-3 w-3 shrink-0" />
                  <span className="truncate">{t.location}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 10: FAQ                            */
/* ═══════════════════════════════════════════ */

const RENT_COLLECTION_FAQS = [
  { q: 'Which payment methods does Revun support?', a: 'In Canada: Pre-Authorized Debit (PAD), Interac e-Transfer with auto-deposit, all major credit cards (Visa, Mastercard, Amex), and Visa/Mastercard debit. In the US: ACH, credit and debit cards. Every method reconciles to the same ledger.' },
  { q: 'How fast do funds land in my account?', a: 'PAD clears in 1-2 business days, Interac e-Transfer same-day, and card payments are instant. Funds post to your bank on your chosen payout schedule — daily, weekly, or monthly.' },
  { q: 'Who pays the processing fee?', a: 'You choose per property. PAD is always free. For cards, you can absorb the fee, pass it to the tenant as a convenience fee, or let tenants opt in to pay it themselves for rewards points.' },
  { q: 'Does Revun enforce province-specific late-fee rules?', a: 'Yes. Late fees follow Ontario RTA, BC RTB, Quebec TAL, Alberta RTDRS, and every other provincial cap automatically. No manual checking required.' },
  { q: 'How are split payments with roommates handled?', a: 'Each roommate gets their own payment method, reminder cadence, and receipt. You see one combined rent roll — Revun handles the math and follow-up per person.' },
  { q: 'What happens if a tenant payment fails (NSF)?', a: 'Revun auto-retries in 72 hours, applies the provincial NSF cap (typically $25-$50), and escalates to the tenant. Full audit trail is retained for tribunal defense.' },
  { q: 'Can I set up autopay discounts to incentivize PAD?', a: 'Yes. Offer a small monthly discount ($10-$25 is common) for PAD enrollment. On average, customers see a 40% lift in PAD adoption within 90 days.' },
  { q: 'How does accounting reconciliation work?', a: 'Every payment posts with the right GL code, property tag, and GST/HST split. Sync directly to QuickBooks Online, Xero, Sage, or FreshBooks — or export CSV. Reconciled to your books in under 2 hours.' },
] as const

function FAQ() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: RENT_COLLECTION_FAQS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  return (
    <SectionWrapper id="faq">
      <SectionHeader
        eyebrow="FAQ"
        title="Questions we hear from"
        highlight="operators switching to Revun."
        description="Straight answers on fees, compliance, speed, and integration."
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(faqJsonLd) }} />
      <RevealOnScroll className="mx-auto mt-12 max-w-3xl">
        {RENT_COLLECTION_FAQS.map((item, idx) => (
          <motion.div key={idx} variants={revealItem}>
            <details className="group border-b border-[#E5E7EB] [&[open]>summary>svg]:rotate-180">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left">
                <span className="text-base font-semibold text-[#0A1628] sm:text-lg">{item.q}</span>
                <ChevronDown className="h-5 w-5 flex-shrink-0 text-[#555860] transition-transform duration-300" aria-hidden="true" />
              </summary>
              <p className="pb-5 pr-10 text-sm leading-relaxed text-[#555860] sm:text-base">{item.a}</p>
            </details>
          </motion.div>
        ))}
      </RevealOnScroll>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 11: Final CTA                      */
/* ═══════════════════════════════════════════ */

function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#0A1628] px-4 py-16 text-white sm:px-6 md:px-8 md:py-24 lg:py-28">
      <div className="absolute top-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[#176FEB]/25 blur-[120px]" aria-hidden="true" />
      <RevealOnScroll className="relative mx-auto max-w-3xl text-center">
        <motion.span variants={revealItem} className="inline-flex items-center rounded-full border border-[#176FEB]/30 bg-[#176FEB]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-[#60A5FA]">
          Start collecting smarter
        </motion.span>
        <motion.h2 variants={revealItem} className="mt-6 font-display text-3xl font-normal tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
          Rent in the bank.{' '}
          <span className="text-[#60A5FA]">Your time back.</span>
        </motion.h2>
        <motion.p variants={revealItem} className="mx-auto mt-6 max-w-xl text-lg text-white/70">
          Try Revun rent collection free for 14 days. No credit card required.
        </motion.p>
        <motion.div variants={revealItem} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/pricing/"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#176FEB] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_40px_-8px_rgba(23,111,235,0.8)] transition-all hover:brightness-110 hover:shadow-[0_0_50px_-4px_rgba(23,111,235,0.9)]"
          >
            Start Free Trial
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
          <Link
            href="/demo/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/15"
          >
            Book a Demo
          </Link>
        </motion.div>
        <motion.p variants={revealItem} className="mt-8 text-xs text-white/50">
          Questions?{' '}
          <Link href="/contact/" className="text-[#60A5FA] transition-colors hover:text-white">Talk to our team →</Link>
        </motion.p>
      </RevealOnScroll>
    </section>
  )
}

/* ═══════════════════════════════════════════ */
/*  Page Assembly                              */
/* ═══════════════════════════════════════════ */

export function RentCollectionClient() {
  return (
    <>
      <Hero />
      <StatsBar />
      <PaymentMethods />
      <AutoCollectionFlow />
      <RentRollDashboard />
      <SmartFeatures />
      <AccountingIntegrations />
      <OwnerPayouts />
      <Testimonials />
      <FAQ />
      <FinalCTA />

      {/* AEO quick answer */}
      <p className="sr-only">
        Revun Rent Collection is automated rent collection software for Canadian landlords and property managers. It supports Pre-Authorized Debit (PAD), Interac e-Transfer, credit cards, and debit cards. Features include auto-reminders, split payments for roommates, province-compliant late fees (Ontario RTA, BC RTB, Quebec TAL), payment plans for tenant hardship, autopay discounts, NSF recovery with auto-retry, and real-time reconciliation to QuickBooks Online, Xero, Sage, and FreshBooks. Funds reach your bank in 1-2 business days via PAD, same-day via Interac, and instantly via card. Owner payouts are fully automated on your chosen schedule with auto-generated PDF statements and year-end T4A/1099 generation.
      </p>
    </>
  )
}
