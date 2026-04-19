'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import {
  Landmark, Building2, Home, FileText, MessageSquare, BarChart3,
  TrendingUp, TrendingDown, CheckCircle2, AlertTriangle, ArrowRight,
  ArrowUpRight, Download, Eye, Shield, Lock, Users, Clock, Bell,
  Settings, ChevronRight, Sparkles, Calendar,
  PieChart, Wallet, UserCheck, Paintbrush, Send, Search,
} from 'lucide-react'
import { useCounter } from '@/hooks/use-counter'

/* ═══════════════════════════════════════════════════════════════════
   Shared primitives
   ═══════════════════════════════════════════════════════════════════ */

const ease = [0.22, 1, 0.36, 1] as const

function SW({ children, id, dark }: { children: React.ReactNode; id: string; dark?: boolean }) {
  return (
    <section id={id} className={`py-16 md:py-20 ${dark ? 'bg-[#F5F6F8]' : 'bg-white'}`}>
      <div className="mx-auto max-w-6xl px-6">{children}</div>
    </section>
  )
}

function SH({ eyebrow, title, highlight, description }: {
  eyebrow: string; title: string; highlight: string; description: string
}) {
  return (
    <RevealOnScroll className="mx-auto max-w-2xl text-center">
      <motion.p variants={revealItem} className="text-sm font-heading font-semibold uppercase tracking-wider text-brand-blue">
        {eyebrow}
      </motion.p>
      <motion.h2 variants={revealItem} className="mt-3 font-display text-4xl font-normal md:text-5xl text-brand-graphite">
        {title} <span className="text-keyword">{highlight}</span>
      </motion.h2>
      <motion.p variants={revealItem} className="mx-auto mt-4 max-w-xl text-lg text-brand-graphite/70">
        {description}
      </motion.p>
    </RevealOnScroll>
  )
}

function Anim({ children, className, delay = 0.1, y = 12 }: {
  children: React.ReactNode; className?: string; delay?: number; y?: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease, delay }}
    >{children}</motion.div>
  )
}

function BrowserChrome({ url, children, className = '' }: {
  url: string; children: React.ReactNode; className?: string
}) {
  return (
    <div className={`rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden shadow-lg ${className}`}>
      <div className="flex items-center gap-2 border-b border-[#E5E7EB] bg-[#FAFAFA] px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBD2F]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex-1 flex justify-center">
          <span className="rounded-md bg-white border border-[#E5E7EB] px-3 py-1 text-[11px] text-[#94A3B8]">{url}</span>
        </div>
      </div>
      {children}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   Section 1: Hero
   ═══════════════════════════════════════════════════════════════════ */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(23,111,235,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(23,111,235,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" aria-hidden="true" />
      <div className="absolute top-24 left-1/2 -translate-x-1/2 h-[400px] w-[720px] rounded-full bg-[#176FEB]/[0.06] blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E8F2FE]">
          <Landmark className="h-8 w-8 text-[#176FEB]" />
        </motion.div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, ease, delay: 0.05 }}
          className="font-heading text-sm font-semibold uppercase tracking-wider text-[#176FEB]">
          Owner Portal
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="mt-3 font-display text-4xl font-normal text-[#0A1628] md:text-6xl">
          Real-time visibility for<br />
          <span className="text-keyword">property owners</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: 0.2 }}
          className="mx-auto mt-5 max-w-2xl text-lg text-[#555860]">
          Replace monthly PDF statements with an always-on portal. Owners see live financials, disbursements, documents, and communications — white-label ready for your brand.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: 0.3 }}
          className="mt-8 flex items-center justify-center gap-4">
          <Link href="/pricing/" className="inline-flex h-12 items-center justify-center rounded-xl bg-[#176FEB] px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#0B5AD4]">
            Start Free Trial
          </Link>
          <Link href="/demo/" className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-6 text-sm font-semibold text-[#2C2E33] transition-colors duration-200 hover:border-[#176FEB]/30">
            Book a Demo
          </Link>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, ease, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11px] text-[#555860]">
          <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-[#22C55E]" /> Real-time financials</span>
          <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-[#22C55E]" /> White-label ready</span>
          <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-[#22C55E]" /> Multi-owner access</span>
          <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-[#22C55E]" /> SOC 2 secure</span>
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   Section 2: Live Owner Dashboard (flagship)
   ═══════════════════════════════════════════════════════════════════ */

function OwnerDashboard() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const noi = useCounter(47280, 1400, inView)
  const ytd = useCounter(138450, 1500, inView)

  const properties = [
    { name: '220 King St W, Toronto', units: 24, occupancy: 96, revenue: 9240, color: '#176FEB' },
    { name: '18 Bloor St E, Toronto', units: 18, occupancy: 100, revenue: 11820, color: '#22C55E' },
    { name: '477 Queen St W, Toronto', units: 12, occupancy: 92, revenue: 8180, color: '#F59E0B' },
    { name: '155 Bay St, Toronto', units: 16, occupancy: 94, revenue: 11040, color: '#8B5CF6' },
  ]

  const kpis = [
    { label: 'MTD NOI', value: `$${noi.toLocaleString()}`, delta: '+8.2%', deltaUp: true, icon: TrendingUp, accent: '#176FEB' },
    { label: 'Occupancy', value: '95.5%', delta: '+1.4pt', deltaUp: true, icon: Home, accent: '#22C55E' },
    { label: 'YTD Disbursed', value: `$${ytd.toLocaleString()}`, delta: '+12.6%', deltaUp: true, icon: Wallet, accent: '#0A1628' },
    { label: 'Avg Cap Rate', value: '5.8%', delta: '-0.2pt', deltaUp: false, icon: PieChart, accent: '#F59E0B' },
  ]

  return (
    <SW id="owner-dashboard" dark>
      <SH eyebrow="Owner Dashboard" title="Everything owners need," highlight="on one command centre" description="Portfolio KPIs, property performance, next disbursement, and pending approvals — live and always available." />
      <div ref={ref} className="mt-12">
        <Anim delay={0.15}>
          <BrowserChrome url="app.revun.com/owner-portal">
            {/* Header bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E7EB] px-6 py-4">
              <div className="flex items-center gap-3">
                <motion.div
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#176FEB] to-[#60A5FA] text-sm font-bold text-white"
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.3 }}
                >RP</motion.div>
                <div>
                  <p className="text-[13px] font-semibold text-[#0A1628]">Rajesh Patel</p>
                  <p className="text-[11px] text-[#555860]">Portfolio Owner · 4 Properties · 70 Units</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F2FE] px-3 py-1 text-[11px] font-semibold text-[#176FEB]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#176FEB] animate-pulse" />
                  Live data
                </span>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E7EB] text-[#555860] hover:bg-[#F5F6F8]" aria-label="Notifications">
                  <Bell className="h-3.5 w-3.5" />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E7EB] text-[#555860] hover:bg-[#F5F6F8]" aria-label="Settings">
                  <Settings className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-[#E5E7EB] bg-[#FAFBFC] px-6 py-3">
              {['Portfolio', 'Financials', 'Documents', 'Communications', 'Approvals'].map((tab, i) => (
                <motion.div key={tab}
                  initial={{ opacity: 0, y: 6 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, ease, delay: 0.35 + i * 0.05 }}
                  className={`rounded-lg px-3 py-1.5 text-[11px] font-semibold cursor-default ${i === 0 ? 'bg-[#176FEB] text-white' : 'text-[#555860] hover:bg-white'}`}
                >{tab}</motion.div>
              ))}
            </div>

            {/* Body */}
            <div className="bg-[#F5F6F8] p-5 md:p-6">
              {/* KPI tiles */}
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {kpis.map((k, i) => {
                  const Icon = k.icon
                  const Delta = k.deltaUp ? TrendingUp : TrendingDown
                  return (
                    <motion.div key={k.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, ease, delay: 0.5 + i * 0.08 }}
                      className="rounded-xl border border-[#E5E7EB] bg-white p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#555860]">{k.label}</span>
                        <Icon className="h-3.5 w-3.5" style={{ color: k.accent }} />
                      </div>
                      <p className="font-display text-xl font-semibold tabular-nums text-[#0A1628]">{k.value}</p>
                      <p className={`mt-1 inline-flex items-center gap-1 text-[10px] font-semibold ${k.deltaUp ? 'text-[#22C55E]' : 'text-[#F59E0B]'}`}>
                        <Delta className="h-2.5 w-2.5" /> {k.delta} vs prev
                      </p>
                    </motion.div>
                  )
                })}
              </div>

              {/* Content grid */}
              <div className="mt-4 grid gap-4 md:grid-cols-5">
                {/* Properties list */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, ease, delay: 0.9 }}
                  className="md:col-span-3 rounded-xl border border-[#E5E7EB] bg-white p-5"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-heading font-semibold text-[#0A1628]">My Properties</h3>
                    <span className="text-[11px] text-[#555860]">4 of 4</span>
                  </div>
                  <div className="space-y-2.5">
                    {properties.map((p, i) => (
                      <motion.div key={p.name}
                        initial={{ opacity: 0, x: -8 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.35, ease, delay: 1.0 + i * 0.08 }}
                        className="flex items-center gap-3 rounded-lg border border-[#E5E7EB] p-3 hover:border-[#176FEB]/30 cursor-default"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: p.color + '18' }}>
                          <Building2 className="h-4 w-4" style={{ color: p.color }} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[12px] font-semibold text-[#0A1628] truncate">{p.name}</p>
                          <p className="text-[10px] text-[#555860]">{p.units} units · {p.occupancy}% occupied</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-[12px] font-semibold tabular-nums text-[#0A1628]">${p.revenue.toLocaleString()}</p>
                          <p className="text-[10px] text-[#555860]">NOI/mo</p>
                        </div>
                        <ChevronRight className="h-3.5 w-3.5 text-[#555860]/50 shrink-0" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Side column */}
                <div className="md:col-span-2 space-y-4">
                  {/* Next disbursement */}
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, ease, delay: 1.0 }}
                    className="rounded-xl border border-[#176FEB]/20 bg-gradient-to-br from-[#176FEB] to-[#0B5AD4] p-5 text-white shadow-lg shadow-[#176FEB]/20"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wider opacity-80">Next Disbursement</span>
                      <Wallet className="h-3.5 w-3.5 opacity-80" />
                    </div>
                    <p className="font-display text-3xl font-semibold tabular-nums">$13,670<span className="text-sm font-normal opacity-80">.50</span></p>
                    <p className="text-[11px] opacity-80 mt-1">Scheduled May 15, 2026 · CAD</p>
                    <div className="mt-4 flex items-center gap-1.5 text-[11px]">
                      <span className="rounded-md bg-white/15 px-2 py-0.5 font-medium">ACH</span>
                      <span className="opacity-70">•••• 4821</span>
                    </div>
                  </motion.div>

                  {/* Alerts */}
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, ease, delay: 1.1 }}
                    className="rounded-xl border border-[#E5E7EB] bg-white p-5"
                  >
                    <h3 className="text-sm font-heading font-semibold text-[#0A1628] mb-3">Action Needed</h3>
                    <div className="space-y-2">
                      {[
                        { icon: AlertTriangle, color: '#F59E0B', label: '2 expense approvals pending', sub: 'Review by May 10' },
                        { icon: FileText, color: '#176FEB', label: 'Lease renewal ready', sub: '220 King St · Unit 814' },
                      ].map((a) => {
                        const AIcon = a.icon
                        return (
                          <div key={a.label} className="flex items-start gap-2 rounded-lg bg-[#F5F6F8] p-2.5">
                            <AIcon className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: a.color }} />
                            <div className="min-w-0">
                              <p className="text-[11px] font-semibold text-[#0A1628]">{a.label}</p>
                              <p className="text-[10px] text-[#555860]">{a.sub}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </BrowserChrome>
        </Anim>
      </div>
    </SW>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   Section 3: Financials & Performance Analytics
   ═══════════════════════════════════════════════════════════════════ */

function Financials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const revenueByMonth = [82, 85, 88, 84, 90, 92, 88, 95, 97, 94, 98, 102]
  const expenseByMonth = [28, 30, 32, 29, 34, 33, 31, 36, 38, 35, 37, 40]

  const expenseBreakdown = [
    { label: 'Management Fee', value: 8, amount: 1480, color: '#176FEB' },
    { label: 'Maintenance', value: 3.5, amount: 650, color: '#F59E0B' },
    { label: 'Property Tax', value: 11.3, amount: 2100, color: '#8B5CF6' },
    { label: 'Insurance', value: 2.3, amount: 420, color: '#22C55E' },
    { label: 'Utilities', value: 1.0, amount: 180, color: '#555860' },
  ]
  const totalExpense = expenseBreakdown.reduce((s, e) => s + e.value, 0)

  let cumulative = 0
  const donutSegments = expenseBreakdown.map((e) => {
    const start = cumulative
    cumulative += e.value
    return { ...e, start, end: cumulative }
  })

  return (
    <SW id="financials">
      <SH eyebrow="Financials" title="Real-time financial" highlight="transparency" description="NOI, revenue, and expenses updated as transactions hit the ledger. No more month-end mystery." />
      <div ref={ref} className="mt-12 grid gap-6 md:grid-cols-5">
        {/* Revenue vs Expenses chart */}
        <Anim delay={0.15} className="md:col-span-3">
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 h-full">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div>
                <h3 className="font-heading text-base font-semibold text-[#0A1628]">Revenue vs Expenses</h3>
                <p className="text-[11px] text-[#555860] mt-0.5">Monthly · 2026 · CAD</p>
              </div>
              <div className="flex gap-3 text-[11px]">
                <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#176FEB]" /> Revenue</span>
                <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#E5E7EB]" /> Expenses</span>
              </div>
            </div>
            <div className="flex items-end gap-2 h-40">
              {revenueByMonth.map((rev, i) => {
                const maxVal = 110
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                    <div className="w-full flex gap-0.5 items-end h-full">
                      <motion.div className="flex-1 rounded-t-md bg-[#176FEB]"
                        initial={{ height: 0 }}
                        animate={inView ? { height: `${(rev / maxVal) * 100}%` } : {}}
                        transition={{ duration: 0.6, ease, delay: 0.3 + i * 0.04 }}
                      />
                      <motion.div className="flex-1 rounded-t-md bg-[#E5E7EB]"
                        initial={{ height: 0 }}
                        animate={inView ? { height: `${(expenseByMonth[i] / maxVal) * 100}%` } : {}}
                        transition={{ duration: 0.6, ease, delay: 0.35 + i * 0.04 }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex gap-2 mt-2">
              {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'].map((m, i) => (
                <span key={i} className="flex-1 text-center text-[9px] text-[#555860]">{m}</span>
              ))}
            </div>
            {/* KPI strip */}
            <div className="mt-5 grid grid-cols-3 gap-3 pt-5 border-t border-[#E5E7EB]">
              {[
                { label: 'YTD Revenue', value: '$1.09M', delta: '+12.6%', up: true },
                { label: 'YTD Expenses', value: '$403K', delta: '+6.8%', up: false },
                { label: 'YTD NOI', value: '$687K', delta: '+15.9%', up: true },
              ].map((k, i) => (
                <motion.div key={k.label}
                  initial={{ opacity: 0, y: 6 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, ease, delay: 0.9 + i * 0.08 }}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#555860]">{k.label}</p>
                  <p className="mt-0.5 font-display text-xl font-semibold tabular-nums text-[#0A1628]">{k.value}</p>
                  <p className={`text-[10px] font-semibold ${k.up ? 'text-[#22C55E]' : 'text-[#F59E0B]'}`}>{k.delta} YoY</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Anim>

        {/* Expense breakdown donut */}
        <Anim delay={0.3} className="md:col-span-2">
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 h-full">
            <h3 className="font-heading text-base font-semibold text-[#0A1628]">Expense Breakdown</h3>
            <p className="text-[11px] text-[#555860] mt-0.5 mb-4">April 2026 · % of revenue</p>
            <div className="flex items-center justify-center my-4">
              <div className="relative h-36 w-36">
                <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                  <circle cx="60" cy="60" r="48" fill="none" stroke="#F5F6F8" strokeWidth="14" />
                  {donutSegments.map((seg, i) => {
                    const c = 2 * Math.PI * 48
                    const segLen = ((seg.end - seg.start) / 100) * c
                    const offset = (seg.start / 100) * c
                    return (
                      <motion.circle key={seg.label}
                        cx="60" cy="60" r="48" fill="none" stroke={seg.color}
                        strokeWidth="14" strokeLinecap="butt"
                        strokeDasharray={`${segLen} ${c}`}
                        initial={{ strokeDashoffset: -offset, opacity: 0 }}
                        animate={inView ? { strokeDashoffset: -offset, opacity: 1 } : {}}
                        transition={{ duration: 0.5, ease, delay: 0.5 + i * 0.08 }}
                      />
                    )
                  })}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-display text-2xl font-semibold text-[#0A1628]">{totalExpense.toFixed(1)}%</span>
                  <span className="text-[10px] text-[#555860]">of revenue</span>
                </div>
              </div>
            </div>
            <div className="space-y-2 mt-4">
              {expenseBreakdown.map((e, i) => (
                <motion.div key={e.label}
                  initial={{ opacity: 0, x: -6 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.35, ease, delay: 0.8 + i * 0.06 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: e.color }} />
                    <span className="text-[12px] text-[#0A1628] truncate">{e.label}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[11px] font-semibold tabular-nums text-[#0A1628]">${e.amount.toLocaleString()}</span>
                    <span className="ml-2 text-[10px] text-[#555860]">{e.value}%</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Anim>
      </div>
    </SW>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   Section 4: Disbursement Tracking
   ═══════════════════════════════════════════════════════════════════ */

function Disbursements() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const lines = [
    { label: 'Rent collected', sub: '15 of 15 units paid', amount: 18500, isPositive: true },
    { label: 'Management fee', sub: '8% of collected', amount: -1480, isPositive: false },
    { label: 'Maintenance', sub: '3 work orders this month', amount: -650, isPositive: false },
    { label: 'Property tax reserve', sub: 'Q2 2026 allocation', amount: -2100, isPositive: false },
    { label: 'Insurance premium', sub: 'Monthly policy fee', amount: -420, isPositive: false },
    { label: 'Utilities (common area)', sub: 'Hydro + water', amount: -180, isPositive: false },
  ]
  const net = lines.reduce((s, l) => s + l.amount, 0)

  const history = [
    { date: 'Apr 15, 2026', amount: 13670.50, status: 'Deposited' },
    { date: 'Mar 15, 2026', amount: 12940.00, status: 'Deposited' },
    { date: 'Feb 15, 2026', amount: 13215.75, status: 'Deposited' },
    { date: 'Jan 15, 2026', amount: 12880.25, status: 'Deposited' },
  ]

  return (
    <SW id="disbursements" dark>
      <SH eyebrow="Disbursement Tracking" title="Every deduction," highlight="down to the dollar" description="Line-by-line visibility into how net disbursements are calculated. No more guessing what came out of your rent." />
      <div ref={ref} className="mt-12 grid gap-6 md:grid-cols-5">
        {/* Breakdown card */}
        <Anim delay={0.15} className="md:col-span-3">
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#E5E7EB]">
              <div>
                <h3 className="font-heading text-base font-semibold text-[#0A1628]">April 2026 Disbursement</h3>
                <p className="text-[11px] text-[#555860] mt-0.5">220 King St W · 15 units</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#22C55E]/10 px-3 py-1 text-[11px] font-semibold text-[#22C55E]">
                <CheckCircle2 className="h-3 w-3" /> Deposited Apr 15
              </span>
            </div>

            <div className="mt-5 space-y-2.5">
              {lines.map((l, i) => (
                <motion.div key={l.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, ease, delay: 0.25 + i * 0.07 }}
                  className="flex items-center justify-between gap-4 rounded-lg border border-[#F5F6F8] p-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${l.isPositive ? 'bg-[#22C55E]/10 text-[#22C55E]' : 'bg-[#F5F6F8] text-[#555860]'}`}>
                      {l.isPositive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowRight className="h-3.5 w-3.5 rotate-180" />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[12px] font-semibold text-[#0A1628] truncate">{l.label}</p>
                      <p className="text-[10px] text-[#555860] truncate">{l.sub}</p>
                    </div>
                  </div>
                  <span className={`font-display text-sm font-semibold tabular-nums shrink-0 ${l.isPositive ? 'text-[#22C55E]' : 'text-[#0A1628]'}`}>
                    {l.isPositive ? '+' : ''}${Math.abs(l.amount).toLocaleString()}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease, delay: 0.8 }}
              className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#176FEB]/20 bg-gradient-to-br from-[#176FEB] to-[#0B5AD4] p-5 text-white"
            >
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider opacity-80">Net disbursed</p>
                <p className="font-display text-3xl font-semibold tabular-nums">${net.toLocaleString()}.00</p>
              </div>
              <button className="inline-flex items-center gap-1.5 rounded-lg bg-white/15 px-3 py-1.5 text-[11px] font-semibold hover:bg-white/25 transition-colors">
                <Download className="h-3 w-3" /> Download PDF
              </button>
            </motion.div>
          </div>
        </Anim>

        {/* Disbursement history */}
        <Anim delay={0.3} className="md:col-span-2">
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 h-full">
            <h3 className="font-heading text-base font-semibold text-[#0A1628] mb-4">Payment History</h3>
            <div className="space-y-2">
              {history.map((h, i) => (
                <motion.div key={h.date}
                  initial={{ opacity: 0, y: 6 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.35, ease, delay: 0.4 + i * 0.08 }}
                  className="flex items-center justify-between rounded-lg border border-[#E5E7EB] p-3"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Calendar className="h-3.5 w-3.5 text-[#555860] shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold text-[#0A1628] truncate">{h.date}</p>
                      <p className="text-[10px] text-[#22C55E]">{h.status}</p>
                    </div>
                  </div>
                  <span className="text-[12px] font-semibold tabular-nums text-[#0A1628] shrink-0">${h.amount.toLocaleString()}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-5 pt-5 border-t border-[#E5E7EB]">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#555860]">Total YTD</p>
              <p className="mt-1 font-display text-2xl font-semibold tabular-nums text-[#0A1628]">$52,706.50</p>
              <p className="text-[11px] text-[#22C55E] mt-0.5">+12.6% vs 2025</p>
            </div>
          </div>
        </Anim>
      </div>
    </SW>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   Section 5: Document Vault
   ═══════════════════════════════════════════════════════════════════ */

function DocumentVault() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const categories = [
    { label: 'Leases', count: 12, icon: FileText, color: '#176FEB', recent: 'Unit 814 Renewal · Apr 12' },
    { label: 'Tax Documents', count: 8, icon: Landmark, color: '#8B5CF6', recent: 'T5 Statement 2025 · Mar 31' },
    { label: 'Insurance', count: 4, icon: Shield, color: '#22C55E', recent: 'Liability Cert · Apr 1' },
    { label: 'Inspections', count: 6, icon: CheckCircle2, color: '#F59E0B', recent: 'Annual Safety · Mar 18' },
    { label: 'Financial Reports', count: 24, icon: BarChart3, color: '#0A1628', recent: 'Q1 2026 P&L · Apr 5' },
    { label: 'Contracts', count: 3, icon: FileText, color: '#555860', recent: 'HVAC Service · Feb 11' },
  ]

  return (
    <SW id="document-vault">
      <SH eyebrow="Document Vault" title="Every document," highlight="available 24/7" description="Leases, inspections, tax forms, and insurance certificates — organised by property and indexed for instant search." />
      <div ref={ref} className="mt-12 grid gap-4 md:grid-cols-3">
        {categories.map((c, i) => {
          const Icon = c.icon
          return (
            <motion.div key={c.label}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, ease, delay: 0.15 + i * 0.08 }}
              className="group relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-6 transition-all duration-300 hover:border-[#176FEB]/30 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ backgroundColor: c.color + '20' }}
                aria-hidden="true"
              />
              <div className="relative flex items-start justify-between mb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: c.color + '18' }}>
                  <Icon className="h-5 w-5" style={{ color: c.color }} />
                </div>
                <span className="rounded-full bg-[#F5F6F8] px-2.5 py-1 text-[10px] font-semibold tabular-nums text-[#555860]">{c.count} files</span>
              </div>
              <h3 className="font-heading text-base font-semibold text-[#0A1628] transition-colors duration-200 group-hover:text-[#176FEB]">{c.label}</h3>
              <p className="mt-1 text-[11px] text-[#555860]">Latest: {c.recent}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-[11px] font-semibold text-[#176FEB] opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                Browse vault <ArrowRight className="h-3 w-3" />
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Search hint bar */}
      <Anim delay={0.6} className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#E5E7EB] bg-[#F5F6F8] p-5">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white border border-[#E5E7EB]">
              <Search className="h-4 w-4 text-[#555860]" />
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-[#0A1628]">Full-text search across every document</p>
              <p className="text-[11px] text-[#555860]">OCR-indexed. Find a clause, an invoice number, a date — in milliseconds.</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-[#0A1628] border border-[#E5E7EB]">
            <Lock className="h-3 w-3 text-[#22C55E]" /> Encrypted at rest
          </span>
        </div>
      </Anim>
    </SW>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   Section 6: Secure Communications
   ═══════════════════════════════════════════════════════════════════ */

function Communications() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const thread = [
    { from: 'manager', name: 'Priya (Property Mgr)', time: '10:12 AM', text: 'Hi Rajesh — the HVAC quote for 220 King St is in. $3,420 from Pro Appliance. Want me to schedule for next week?', attach: null },
    { from: 'owner', name: 'You', time: '10:24 AM', text: 'Can you attach the quote? Want to see the line items before approving.', attach: null },
    { from: 'manager', name: 'Priya (Property Mgr)', time: '10:31 AM', text: 'Attached below. They\'re including the 2-year parts warranty.', attach: { name: 'HVAC_Quote_220King.pdf', size: '248 KB' } },
    { from: 'owner', name: 'You', time: '10:45 AM', text: 'Looks good. Approved — let\'s get it scheduled.', attach: null },
  ]

  return (
    <SW id="communications" dark>
      <SH eyebrow="Communications" title="Every conversation," highlight="tied to a property" description="Secure messaging between owners and property managers — searchable, audit-ready, and linked to the right unit." />
      <div ref={ref} className="mt-12 grid gap-6 md:grid-cols-5">
        {/* Thread */}
        <Anim delay={0.15} className="md:col-span-3">
          <div className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden h-full">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8F2FE]">
                  <Building2 className="h-4 w-4 text-[#176FEB]" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-[#0A1628]">220 King St W · Toronto</p>
                  <p className="text-[10px] text-[#555860]">HVAC Maintenance Thread</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#22C55E]/10 px-2.5 py-0.5 text-[10px] font-semibold text-[#22C55E]">
                <Lock className="h-2.5 w-2.5" /> E2E encrypted
              </span>
            </div>

            <div className="bg-[#FAFBFC] p-5 space-y-4">
              {thread.map((m, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, ease, delay: 0.3 + i * 0.1 }}
                  className={`flex gap-2.5 ${m.from === 'owner' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${m.from === 'owner' ? 'bg-[#176FEB] text-white' : 'bg-[#8B5CF6] text-white'}`}>
                    {m.from === 'owner' ? 'RP' : 'PK'}
                  </div>
                  <div className={`max-w-[80%] ${m.from === 'owner' ? 'text-right' : ''}`}>
                    <div className="flex items-baseline gap-2 mb-1 text-[10px]">
                      <span className="font-semibold text-[#0A1628]">{m.name}</span>
                      <span className="text-[#555860]">{m.time}</span>
                    </div>
                    <div className={`rounded-2xl p-3 text-[12px] ${m.from === 'owner' ? 'bg-[#176FEB] text-white' : 'bg-white border border-[#E5E7EB] text-[#0A1628]'}`}>
                      {m.text}
                      {m.attach && (
                        <div className={`mt-2 flex items-center gap-2 rounded-lg px-2.5 py-1.5 ${m.from === 'owner' ? 'bg-white/15' : 'bg-[#F5F6F8]'}`}>
                          <FileText className="h-3 w-3 shrink-0" />
                          <span className="text-[11px] font-medium truncate">{m.attach.name}</span>
                          <span className={`text-[10px] shrink-0 ${m.from === 'owner' ? 'opacity-70' : 'text-[#555860]'}`}>{m.attach.size}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="border-t border-[#E5E7EB] p-3">
              <div className="flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-3 py-2">
                <span className="text-[12px] text-[#94A3B8] flex-1">Type a message…</span>
                <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#176FEB] text-white" aria-label="Send">
                  <Send className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </Anim>

        {/* Side panel: audit + quick stats */}
        <Anim delay={0.3} className="md:col-span-2">
          <div className="space-y-4 h-full flex flex-col">
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6">
              <h3 className="font-heading text-base font-semibold text-[#0A1628] mb-4">Why it matters</h3>
              <div className="space-y-3">
                {[
                  { icon: Shield, title: 'Audit-ready trail', desc: 'Every message timestamped, signed, and archived for 7 years.' },
                  { icon: Search, title: 'Searchable by property', desc: 'Find any conversation by address, unit, or topic.' },
                  { icon: Eye, title: 'Full context, no silos', desc: 'Linked to leases, work orders, and invoices automatically.' },
                ].map((b) => {
                  const Icon = b.icon
                  return (
                    <div key={b.title} className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#176FEB]/10">
                        <Icon className="h-4 w-4 text-[#176FEB]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[12px] font-semibold text-[#0A1628]">{b.title}</p>
                        <p className="text-[11px] text-[#555860]">{b.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-[#176FEB]/20 bg-gradient-to-br from-[#E8F2FE] to-white p-6 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-[#176FEB]" />
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#176FEB]">Impact</p>
              </div>
              <p className="font-display text-3xl font-semibold text-[#0A1628]">-60%</p>
              <p className="text-[12px] text-[#555860] mt-1">fewer owner support calls after moving conversations into the portal.</p>
            </div>
          </div>
        </Anim>
      </div>
    </SW>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   Section 7: Approvals + White-Label + Multi-Owner (bento)
   ═══════════════════════════════════════════════════════════════════ */

function BentoExtras() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <SW id="extras">
      <SH eyebrow="Built for owners" title="Purpose-built for" highlight="real-world portfolios" description="Approval workflows, white-label branding, and granular role-based access — out of the box." />
      <div ref={ref} className="mt-12 grid gap-5 md:grid-cols-6 md:grid-rows-2">

        {/* Approvals queue (spans 3x2 on left) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease, delay: 0.15 }}
          className="md:col-span-3 md:row-span-2 rounded-2xl border border-[#E5E7EB] bg-white p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#176FEB]">Approval Workflows</p>
              <h3 className="mt-1 font-heading text-lg font-semibold text-[#0A1628]">Approve expenses with one click</h3>
            </div>
            <span className="rounded-full bg-[#F59E0B]/10 px-2.5 py-1 text-[10px] font-semibold text-[#F59E0B]">2 pending</span>
          </div>
          <div className="space-y-2.5">
            {[
              { type: 'CapEx', amount: 3420, vendor: 'Pro Appliance Co.', desc: 'HVAC replacement · 220 King St', age: '2 days', priority: 'High' },
              { type: 'Invoice', amount: 850, vendor: 'Elite Cleaning', desc: 'Q2 common area deep clean', age: '5 hrs', priority: 'Normal' },
              { type: 'Concession', amount: 250, vendor: 'Unit 507', desc: 'One-month rent credit · retention', age: '1 day', priority: 'Normal' },
            ].map((a, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.35, ease, delay: 0.3 + i * 0.08 }}
                className="rounded-xl border border-[#E5E7EB] p-4"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="rounded-md bg-[#F5F6F8] px-1.5 py-0.5 text-[9px] font-bold uppercase text-[#555860]">{a.type}</span>
                    <span className="font-display text-sm font-semibold tabular-nums text-[#0A1628]">${a.amount.toLocaleString()}</span>
                  </div>
                  <span className="text-[10px] text-[#555860] shrink-0">{a.age} ago</span>
                </div>
                <p className="text-[11px] font-semibold text-[#0A1628]">{a.vendor}</p>
                <p className="text-[10px] text-[#555860]">{a.desc}</p>
                <div className="mt-3 flex items-center gap-2">
                  <button className="flex-1 rounded-lg bg-[#22C55E] px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-[#16A34A] transition-colors">Approve</button>
                  <button className="flex-1 rounded-lg border border-[#E5E7EB] px-3 py-1.5 text-[11px] font-semibold text-[#0A1628] hover:bg-[#F5F6F8] transition-colors">Request info</button>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-[10px] text-[#555860]">
            <Shield className="h-3 w-3 text-[#22C55E]" />
            Every approval signed with timestamp + IP address for audit compliance.
          </div>
        </motion.div>

        {/* White-label card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease, delay: 0.25 }}
          className="md:col-span-3 rounded-2xl border border-[#E5E7EB] bg-gradient-to-br from-[#0A1628] to-[#1E293B] p-6 text-white overflow-hidden relative"
        >
          <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-[#176FEB]/20 blur-3xl" aria-hidden="true" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <Paintbrush className="h-4 w-4 text-[#60A5FA]" />
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#60A5FA]">White-Label</p>
            </div>
            <h3 className="font-heading text-lg font-semibold">Your brand, not ours</h3>
            <p className="mt-2 text-[12px] text-white/70 max-w-sm">Custom logo, colors, domain, and email templates. Owners see your brand end-to-end — we stay invisible.</p>
            <div className="mt-5 flex items-center gap-3">
              <div className="flex h-10 items-center gap-2 rounded-xl bg-white/10 px-3">
                <div className="h-5 w-5 rounded-md bg-white flex items-center justify-center text-[10px] font-bold text-[#0A1628]">A</div>
                <span className="text-[11px] font-semibold">Acme PM</span>
              </div>
              <ArrowRight className="h-4 w-4 text-white/40" />
              <div className="flex items-center gap-1.5 text-[10px] text-white/60">
                <span>portal.acmepm.com</span>
              </div>
            </div>
            <div className="mt-4 inline-flex items-center gap-1.5 text-[10px] text-[#22C55E]">
              <CheckCircle2 className="h-3 w-3" /> Set up in under 30 minutes
            </div>
          </div>
        </motion.div>

        {/* Multi-owner access card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease, delay: 0.35 }}
          className="md:col-span-3 rounded-2xl border border-[#E5E7EB] bg-white p-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <Users className="h-4 w-4 text-[#176FEB]" />
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#176FEB]">Multi-Owner Access</p>
          </div>
          <h3 className="font-heading text-lg font-semibold text-[#0A1628]">One portal, many roles</h3>
          <p className="mt-2 text-[12px] text-[#555860]">Co-owners, accountants, and tax preparers each get scoped access. You control what they see.</p>
          <div className="mt-5 space-y-2">
            {[
              { role: 'Co-Owner', name: 'Arjun Patel', perms: 'Full access', color: '#176FEB' },
              { role: 'Accountant', name: 'Maya Tax & CPA', perms: 'Financials · Read-only', color: '#8B5CF6' },
              { role: 'Tax Preparer', name: 'Deloitte · Seasonal', perms: 'T5 & Reports only', color: '#22C55E' },
            ].map((r, i) => (
              <motion.div key={r.name}
                initial={{ opacity: 0, x: -6 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.35, ease, delay: 0.55 + i * 0.08 }}
                className="flex items-center gap-3 rounded-lg border border-[#E5E7EB] p-2.5"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: r.color + '18' }}>
                  <UserCheck className="h-3.5 w-3.5" style={{ color: r.color }} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-[12px] font-semibold text-[#0A1628] truncate">{r.name}</p>
                    <span className="rounded bg-[#F5F6F8] px-1.5 py-0.5 text-[9px] font-bold uppercase text-[#555860] shrink-0">{r.role}</span>
                  </div>
                  <p className="text-[10px] text-[#555860] truncate">{r.perms}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </SW>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   Section 8: Use cases / "Built into the OS" strip
   ═══════════════════════════════════════════════════════════════════ */

function BuiltIntoOS() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const differentiators = [
    {
      icon: Clock,
      title: 'Real-time, not monthly',
      desc: 'Every metric updates as transactions hit the ledger. No waiting for month-end close.',
    },
    {
      icon: Sparkles,
      title: 'Part of the operating system',
      desc: 'Not a bolt-on — pulls directly from the same data your team uses for leasing, maintenance, and accounting.',
    },
    {
      icon: MessageSquare,
      title: 'Communication without silos',
      desc: 'Owners message their PM from the same screen where they review financials. No more email tag.',
    },
  ]

  return (
    <SW id="built-into-os" dark>
      <SH eyebrow="What makes it different" title="Not a bolt-on portal —" highlight="the operating system" description="Other owner portals sit outside the PM software. Revun's is native: every number is live, every document is linked, every conversation has context." />
      <div ref={ref} className="mt-12 grid gap-5 md:grid-cols-3">
        {differentiators.map((d, i) => {
          const Icon = d.icon
          return (
            <motion.div key={d.title}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease, delay: 0.15 + i * 0.1 }}
              className="group rounded-2xl border border-[#E5E7EB] bg-white p-6 transition-all duration-300 hover:border-[#176FEB]/30 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F2FE] transition-colors duration-300 group-hover:bg-[#176FEB]">
                <Icon className="h-5 w-5 text-[#176FEB] transition-colors duration-300 group-hover:text-white" />
              </div>
              <h3 className="font-heading text-base font-semibold text-[#0A1628]">{d.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[#555860]">{d.desc}</p>
            </motion.div>
          )
        })}
      </div>
    </SW>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   Section 9: CTA
   ═══════════════════════════════════════════════════════════════════ */

function CTASection() {
  return (
    <section id="cta" className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <RevealOnScroll stagger={0.12}>
          <motion.p variants={revealItem} className="text-sm font-heading font-semibold uppercase tracking-wider text-brand-blue">
            Get Started
          </motion.p>
          <motion.h2 variants={revealItem} className="mt-3 font-display text-3xl font-normal md:text-4xl text-brand-graphite">
            Give owners the transparency<br /><span className="text-keyword">they deserve</span>
          </motion.h2>
          <motion.p variants={revealItem} className="mx-auto mt-4 max-w-lg text-base text-[#555860]">
            Start your free trial today. No credit card required. Invite your first owner in under 5 minutes.
          </motion.p>
          <motion.div variants={revealItem} className="mt-8 flex items-center justify-center gap-4">
            <Link href="/pricing/" className="inline-flex h-12 items-center justify-center rounded-xl bg-[#176FEB] px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#1260D6]">
              Start Free Trial
            </Link>
            <Link href="/contact/" className="inline-flex h-12 items-center gap-2 rounded-xl border border-[#E5E7EB] px-6 text-sm font-semibold text-[#0A1628] transition-colors duration-200 hover:bg-[#EAECF0]">
              Contact Sales <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
          <motion.p variants={revealItem} className="mt-6 text-[11px] text-[#555860]">
            SOC 2 Type II · PIPEDA compliant · White-label ready
          </motion.p>
        </RevealOnScroll>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   Main export
   ═══════════════════════════════════════════════════════════════════ */

export function OwnerPortalClient() {
  return (
    <>
      <Hero />
      <OwnerDashboard />
      <Financials />
      <Disbursements />
      <DocumentVault />
      <Communications />
      <BentoExtras />
      <BuiltIntoOS />
      <CTASection />
    </>
  )
}
