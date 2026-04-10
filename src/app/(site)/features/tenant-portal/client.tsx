'use client'

import { useRef, useId } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import {
  ArrowRight,
  KeyRound,
  CreditCard,
  Wrench,
  FileText,
  MessageSquare,
  Bell,
  Shield,
  Smartphone,
  CheckCircle2,
  Eye,
  Sparkles,
  Lock,
  Fingerprint,
  Calendar,
  DollarSign,
  Camera,
  Download,
  Search,
  ChevronRight,
} from 'lucide-react'
import { useCounter } from '@/hooks/use-counter'

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

/* Animated donut gauge */
function DonutGauge({ value, size, sw, color, label, inView, delay = 0 }: {
  value: number; size: number; sw: number; color: string; label: string; inView: boolean; delay?: number
}) {
  const r = (size - sw) / 2
  const c = 2 * Math.PI * r
  const filled = (value / 100) * c
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width={size} height={size} className="-rotate-90 overflow-visible">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E5E7EB" strokeWidth={sw} />
          <motion.circle
            cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color}
            strokeWidth={sw} strokeLinecap="round" strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            animate={inView ? { strokeDashoffset: c - filled } : {}}
            transition={{ duration: 1.4, ease, delay }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-heading text-2xl font-bold text-brand-graphite">{value}%</span>
          <span className="text-[10px] text-brand-graphite-mid">{label}</span>
        </div>
      </div>
    </div>
  )
}

/* Mini sparkline */
function Spark({ data, color, w = 80, h = 24, inView, delay = 0 }: {
  data: number[]; color: string; w?: number; h?: number; inView: boolean; delay?: number
}) {
  const id = useId()
  const max = Math.max(...data)
  const min = Math.min(...data) * 0.85
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / (max - min)) * h}`).join(' ')
  return (
    <svg width={w} height={h} className="overflow-visible">
      <motion.polyline points={pts} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1, ease, delay }}
      />
    </svg>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 1: Live Dashboard (Desktop frame)  */
/* ═══════════════════════════════════════════ */

const activity = [
  { icon: Wrench, label: 'Maintenance: Kitchen faucet repair', status: 'In Progress', color: '#F59E0B', time: '2 hrs ago' },
  { icon: FileText, label: 'Lease renewal available for review', status: 'Action Needed', color: '#176FEB', time: '1 day ago' },
  { icon: CheckCircle2, label: 'Renter insurance document uploaded', status: 'Complete', color: '#22C55E', time: '3 days ago' },
  { icon: CreditCard, label: 'April rent payment processed', status: 'Confirmed', color: '#22C55E', time: '5 days ago' },
]

function DashboardPreview() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const rent = useCounter(1850, 1200, inView)

  return (
    <SectionWrapper id="dashboard">
      <SectionHeader eyebrow="Tenant Dashboard" title="Everything in" highlight="one place" description="Your entire rental life — payments, maintenance, documents, and communications — accessible from a single dashboard." />
      <div ref={ref} className="mt-12">
        {/* Browser frame */}
        <motion.div
          className="overflow-hidden rounded-xl border border-[#E5E7EB] bg-white shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
        >
          {/* Chrome bar */}
          <div className="flex items-center gap-2 border-b border-[#E5E7EB] bg-[#F8F9FA] px-4 py-2.5">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FEBD2F]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
            </div>
            <div className="flex-1 flex justify-center">
              <span className="rounded-md bg-white border border-[#E5E7EB] px-3 py-1 text-xs text-[#94A3B8]">app.revun.com/tenant-portal</span>
            </div>
          </div>

          {/* Tenant header bar */}
          <div className="flex items-center justify-between border-b border-[#E5E7EB] px-6 py-4">
            <div className="flex items-center gap-3">
              <motion.div
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue to-[#60A5FA] text-sm font-bold text-white"
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.3 }}
              >SM</motion.div>
              <div>
                <p className="text-sm font-semibold text-brand-graphite">Sarah Mitchell</p>
                <p className="text-xs text-brand-graphite-mid">Unit 5D · Maple Ridge Apartments</p>
              </div>
            </div>
            <motion.span
              className="rounded-full bg-[#22C55E]/10 px-3 py-1 text-xs font-semibold text-[#22C55E]"
              initial={{ opacity: 0, x: 10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 }}
            >Lease Active</motion.span>
          </div>

          {/* Dashboard body */}
          <div className="bg-[#F5F6F8] p-5">
            <div className="grid gap-4 md:grid-cols-3">
              {/* Payment card */}
              <motion.div
                className="rounded-xl border border-[#E5E7EB] bg-white p-5"
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease, delay: 0.3 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-brand-graphite">Next Payment</p>
                  <span className="text-[10px] text-brand-graphite-mid">Due May 1</span>
                </div>
                <p className="text-3xl font-bold text-brand-blue">${rent.toLocaleString()}<span className="text-sm font-normal">.00</span></p>
                <div className="mt-3 h-1.5 w-full rounded-full bg-[#E5E7EB] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-brand-blue to-[#60A5FA]"
                    initial={{ width: 0 }}
                    animate={inView ? { width: '0%' } : {}}
                    transition={{ duration: 1, ease, delay: 0.5 }}
                  />
                </div>
                <div className="mt-4 flex gap-2">
                  <div className="flex-1 rounded-lg bg-brand-blue py-2.5 text-center text-xs font-semibold text-white cursor-default">Pay Now</div>
                  <div className="rounded-lg border border-[#E5E7EB] px-3 py-2.5 text-center text-xs font-medium text-brand-graphite-mid cursor-default">Auto-Pay</div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[10px] text-brand-graphite-mid">Payment History</span>
                  <span className="text-[10px] text-brand-blue font-medium">View →</span>
                </div>
              </motion.div>

              {/* Activity feed */}
              <motion.div
                className="rounded-xl border border-[#E5E7EB] bg-white p-5 md:col-span-2"
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease, delay: 0.4 }}
              >
                <p className="text-xs font-semibold text-brand-graphite mb-3">Recent Activity</p>
                <div className="space-y-2">
                  {activity.map((item, i) => {
                    const Icon = item.icon
                    return (
                      <motion.div key={item.label} className="flex items-center gap-3 rounded-lg bg-[#F5F6F8] px-3 py-2.5"
                        initial={{ opacity: 0, x: -8 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.3, ease, delay: 0.5 + i * 0.1 }}
                      >
                        <Icon className="h-4 w-4 shrink-0" style={{ color: item.color }} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-[#555860] truncate">{item.label}</p>
                          <p className="text-[10px] text-[#94A3B8]">{item.time}</p>
                        </div>
                        <span className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ color: item.color, backgroundColor: `${item.color}15` }}>{item.status}</span>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            </div>

            {/* Bottom row */}
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <motion.div className="rounded-xl border border-[#E5E7EB] bg-white p-5"
                initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, ease, delay: 0.7 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-brand-graphite">Documents</p>
                  <span className="text-[10px] text-brand-blue font-medium cursor-default">Upload</span>
                </div>
                {['Lease Agreement.pdf', 'Renter Insurance.pdf', 'Move-in Checklist.pdf'].map((doc) => (
                  <div key={doc} className="flex items-center gap-2 py-1">
                    <div className="h-2 w-2 rounded-sm bg-red-400" />
                    <span className="text-xs text-[#555860]">{doc}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div className="rounded-xl border border-[#E5E7EB] bg-white p-5"
                initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, ease, delay: 0.8 }}
              >
                <p className="text-xs font-semibold text-brand-graphite mb-3">Lease Details</p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                  {[
                    { label: 'Term', value: '12 months' },
                    { label: 'Start', value: 'Jun 1, 2025' },
                    { label: 'End', value: 'May 31, 2026' },
                    { label: 'Rent', value: '$1,850/mo' },
                  ].map((d) => (
                    <div key={d.label}>
                      <p className="text-[10px] text-[#94A3B8]">{d.label}</p>
                      <p className="text-xs font-medium text-brand-graphite">{d.value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 2: Tenant Stats at a Glance        */
/* ═══════════════════════════════════════════ */

function TenantStats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <SectionWrapper id="stats" dark>
      <SectionHeader eyebrow="Your Numbers" title="Tenant stats" highlight="at a glance" description="Real-time visibility into your payments, requests, and lease status — no digging required." />
      <div ref={ref} className="mt-12 grid gap-6 lg:grid-cols-12">
        {/* Left: Payment health gauge */}
        <motion.div
          className="rounded-2xl border border-[#E5E7EB] bg-white p-6 lg:col-span-5"
          initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          <h3 className="mb-6 font-heading text-lg font-semibold text-brand-graphite">Payment Health</h3>
          <div className="flex items-center gap-8">
            <DonutGauge value={100} size={130} sw={10} color="#22C55E" label="On-time" inView={inView} delay={0.3} />
            <div className="flex-1 space-y-3">
              {[
                { label: 'Payments made', value: '11 of 11', color: '#22C55E' },
                { label: 'Next due', value: 'May 1', color: '#176FEB' },
                { label: 'Late fees', value: '$0', color: '#22C55E' },
              ].map((s, i) => (
                <motion.div key={s.label} className="flex items-center justify-between"
                  initial={{ opacity: 0, x: 8 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, ease, delay: 0.5 + i * 0.1 }}
                >
                  <span className="text-sm text-brand-graphite-mid">{s.label}</span>
                  <span className="font-heading text-sm font-bold" style={{ color: s.color }}>{s.value}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right: Quick stat cards */}
        <div className="space-y-4 lg:col-span-7">
          {[
            { icon: CreditCard, label: 'Total Paid (YTD)', value: '$20,350', spark: [1850, 1850, 1850, 1850, 1850, 1850, 1850, 1850, 1850, 1850, 1850], color: '#22C55E' },
            { icon: Wrench, label: 'Maintenance Requests', value: '3 total', spark: [0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0], color: '#176FEB' },
            { icon: FileText, label: 'Documents', value: '7 files', spark: [2, 2, 3, 3, 4, 5, 5, 6, 6, 7, 7], color: '#176FEB' },
          ].map((stat, i) => (
            <motion.div key={stat.label}
              className="flex items-center justify-between rounded-xl border border-[#E5E7EB] bg-white p-5"
              initial={{ opacity: 0, x: 16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, ease, delay: 0.3 + i * 0.12 }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue/10">
                  <stat.icon className="h-5 w-5 text-brand-blue" />
                </div>
                <div>
                  <p className="text-xs text-brand-graphite-mid">{stat.label}</p>
                  <p className="font-heading text-xl font-bold text-brand-graphite">{stat.value}</p>
                </div>
              </div>
              <Spark data={stat.spark} color={stat.color} inView={inView} delay={0.5 + i * 0.12} />
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 3: Mobile App (Phone frame)        */
/* ═══════════════════════════════════════════ */

function MobileApp() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <SectionWrapper id="mobile">
      <SectionHeader eyebrow="Mobile" title="Manage from" highlight="anywhere" description="The full tenant experience on your phone. Pay rent, request repairs, and message your property team on the go." />
      <div ref={ref} className="mt-12 grid items-center gap-12 lg:grid-cols-2">
        {/* Phone — slim realistic iPhone frame */}
        <div className="flex justify-center">
          <motion.div
            className="relative w-[300px] rounded-[3rem] bg-gradient-to-b from-[#2C2C2E] to-[#1C1C1E] p-[10px] shadow-[0_25px_60px_rgba(0,0,0,0.3)]"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
          >
            {/* Screen */}
            <div className="overflow-hidden rounded-[2.2rem] bg-white">
              {/* Dynamic Island */}
              <div className="relative flex items-center justify-between px-6 pt-3 pb-1">
                <span className="text-[11px] font-semibold text-[#0A1628]">9:41</span>
                <div className="absolute left-1/2 top-2 -translate-x-1/2 h-[22px] w-[90px] rounded-full bg-[#0A0A0A]" />
                <div className="flex items-center gap-1">
                  <svg width="16" height="11" viewBox="0 0 16 11" fill="#0A1628"><rect x="0" y="7" width="3" height="4" rx="0.5"/><rect x="4" y="5" width="3" height="6" rx="0.5"/><rect x="8" y="2" width="3" height="9" rx="0.5"/><rect x="12" y="0" width="3" height="11" rx="0.5"/></svg>
                  <svg width="16" height="11" viewBox="0 0 16 11" fill="#0A1628"><path d="M8 2C5.5 2 3.2 3 1.5 4.7L0 3.2C2.1 1.2 4.9 0 8 0s5.9 1.2 8 3.2L14.5 4.7C12.8 3 10.5 2 8 2z" opacity="0.3"/><path d="M8 5C6.3 5 4.8 5.7 3.7 6.8L2.2 5.3C3.7 3.8 5.7 3 8 3s4.3.8 5.8 2.3L12.3 6.8C11.2 5.7 9.7 5 8 5z" opacity="0.5"/><path d="M8 8c-1 0-1.9.4-2.6 1.1L4 7.7C5 6.6 6.4 6 8 6s3 .6 4 1.7l-1.4 1.4C9.9 8.4 9 8 8 8z" opacity="0.8"/><circle cx="8" cy="11" r="1.5"/></svg>
                  <svg width="22" height="11" viewBox="0 0 22 11" fill="#0A1628"><rect x="0.5" y="0.5" width="18" height="10" rx="2" stroke="#0A1628" strokeWidth="1" fill="none"/><rect x="19" y="3" width="2.5" height="5" rx="1" opacity="0.4"/><rect x="2" y="2" width="12" height="7" rx="1"/></svg>
                </div>
              </div>

              {/* App content */}
              <div className="px-5 pb-6 pt-2">
                {/* Profile header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#176FEB] to-[#60A5FA] text-xs font-bold text-white shadow-sm">SM</div>
                    <div>
                      <p className="text-[13px] font-semibold text-[#0A1628]">Sarah Mitchell</p>
                      <p className="text-[10px] text-[#94A3B8]">Unit 5D · Maple Ridge</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-[#22C55E]/12 px-2.5 py-1 text-[10px] font-bold text-[#22C55E]">Active</span>
                </div>

                {/* Payment card */}
                <motion.div className="rounded-2xl border border-[#E5E7EB] p-4 mb-5"
                  initial={{ opacity: 0, y: 6 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, ease, delay: 0.4 }}
                >
                  <p className="text-[10px] text-[#94A3B8]">Next Payment · Due May 1</p>
                  <p className="mt-1 text-2xl font-bold text-[#0A1628]">$1,850</p>
                  <div className="mt-3 rounded-xl bg-[#176FEB] py-2.5 text-center text-[11px] font-semibold text-white">Pay Now</div>
                </motion.div>

                {/* Activity items */}
                <div className="space-y-0">
                  {[
                    { label: 'Kitchen faucet', status: 'In Progress', color: '#F59E0B' },
                    { label: 'Lease renewal', status: 'Action', color: '#176FEB' },
                    { label: 'Insurance', status: 'Done', color: '#22C55E' },
                  ].map((item, i) => (
                    <motion.div key={item.label}
                      className="flex items-center justify-between border-b border-[#F1F5F9] py-3 last:border-0"
                      initial={{ opacity: 0, x: -4 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.25, ease, delay: 0.5 + i * 0.08 }}
                    >
                      <span className="text-[12px] text-[#2C2E33]">{item.label}</span>
                      <span className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold" style={{ color: item.color, backgroundColor: `${item.color}12` }}>{item.status}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Quick actions */}
                <div className="mt-4 flex gap-2">
                  <div className="flex-1 rounded-xl border border-[#E5E7EB] py-2.5 text-center text-[11px] font-medium text-[#2C2E33]">Documents</div>
                  <div className="flex-1 rounded-xl border border-[#E5E7EB] py-2.5 text-center text-[11px] font-medium text-[#2C2E33]">Lease</div>
                </div>
              </div>
            </div>

            {/* Home indicator */}
            <div className="flex justify-center pt-2 pb-1">
              <div className="h-[4px] w-[100px] rounded-full bg-white/20" />
            </div>
          </motion.div>
        </div>

        {/* Feature list */}
        <div className="space-y-4">
          {[
            { icon: CreditCard, title: 'Pay rent instantly', desc: 'ACH, credit card, and Interac e-Transfer. Set up autopay and never think about it again.' },
            { icon: Camera, title: 'Photo maintenance requests', desc: 'Snap a photo, describe the issue, submit. Track progress and get notified when it is fixed.' },
            { icon: MessageSquare, title: 'Message your team', desc: 'Direct messaging with your property manager. No personal numbers. Full conversation history.' },
            { icon: Bell, title: 'Push notifications', desc: 'Payment reminders, maintenance updates, lease renewals — pushed to your phone in real time.' },
            { icon: Download, title: 'Documents on demand', desc: 'Download your lease, receipts, and notices anytime. Everything stored securely in your vault.' },
          ].map((feat, i) => (
            <motion.div key={feat.title}
              className="flex items-start gap-4 rounded-xl border border-[#E5E7EB] bg-white p-5 transition-all hover:border-brand-blue/20 hover:shadow-sm"
              initial={{ opacity: 0, x: 16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, ease, delay: 0.2 + i * 0.1 }}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10">
                <feat.icon className="h-5 w-5 text-brand-blue" />
              </div>
              <div>
                <h4 className="font-heading text-sm font-semibold text-brand-graphite">{feat.title}</h4>
                <p className="mt-1 text-sm text-brand-graphite-mid">{feat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 4: Maintenance Flow                */
/* ═══════════════════════════════════════════ */

const maintenanceSteps = [
  { step: '01', title: 'Submit request', desc: 'Describe the issue, attach photos. AI classifies urgency and category automatically.', icon: Wrench },
  { step: '02', title: 'Track progress', desc: 'See real-time status: Submitted → Authorized → In Progress → Completed.', icon: Search },
  { step: '03', title: 'Get notified', desc: 'Push notifications at every stage. Before/after photos when the job is done.', icon: Bell },
]

function MaintenanceFlow() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <SectionWrapper id="maintenance" dark>
      <SectionHeader eyebrow="Maintenance" title="Request repairs" highlight="in seconds" description="Submit, track, and confirm maintenance — all from your portal. No phone calls, no chasing." />
      <div ref={ref} className="mt-12 grid gap-8 lg:grid-cols-2">
        {/* Pipeline visualization */}
        <motion.div className="rounded-2xl border border-[#E5E7EB] bg-white p-6"
          initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          <h3 className="mb-4 font-heading text-base font-semibold text-brand-graphite">Request Pipeline</h3>

          {/* Stage pipeline */}
          <div className="flex gap-1 rounded-xl border border-[#E5E7EB] p-2 mb-6">
            {['Submitted', 'Authorized', 'In Progress', 'Completed'].map((stage, i) => (
              <div key={stage} className={`flex-1 rounded-lg py-2.5 text-center text-[10px] font-medium ${i === 2 ? 'bg-brand-blue text-white' : 'text-brand-graphite-mid'}`}>
                {stage}
              </div>
            ))}
          </div>

          {/* Active requests */}
          <div className="space-y-3">
            {[
              { title: 'Kitchen faucet', priority: 'High', status: 'In Progress', time: '2 hrs ago' },
              { title: 'Hallway light', priority: 'Low', status: 'Submitted', time: '1 day ago' },
            ].map((item, i) => (
              <motion.div key={item.title}
                className="flex items-center gap-3 rounded-xl border border-[#E5E7EB] p-4 transition-colors hover:border-brand-blue/20"
                initial={{ opacity: 0, x: -8 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, ease, delay: 0.3 + i * 0.1 }}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10">
                  <Wrench className="h-5 w-5 text-brand-blue" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-heading text-sm font-semibold text-brand-graphite">{item.title}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${item.priority === 'High' ? 'bg-red-50 text-red-500' : 'bg-brand-off-white text-brand-graphite-mid'}`}>{item.priority}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-brand-graphite-mid">{item.time}</p>
                </div>
                <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${item.status === 'In Progress' ? 'bg-brand-blue/10 text-brand-blue' : 'bg-[#F59E0B]/15 text-[#F59E0B]'}`}>{item.status}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Steps */}
        <div className="space-y-4">
          {maintenanceSteps.map((s, i) => (
            <motion.div key={s.step}
              className="rounded-2xl border border-[#E5E7EB] bg-white p-6"
              initial={{ opacity: 0, x: 16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, ease, delay: 0.2 + i * 0.12 }}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10">
                  <s.icon className="h-5 w-5 text-brand-blue" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">Step {s.step}</span>
                  <h4 className="mt-1 font-heading text-base font-semibold text-brand-graphite">{s.title}</h4>
                  <p className="mt-1 text-sm text-brand-graphite-mid">{s.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 5: Security & Trust                */
/* ═══════════════════════════════════════════ */

const trustPoints = [
  { icon: Lock, title: 'End-to-end encryption', desc: 'AES-256 encryption on all data at rest and in transit. Your information is always protected.' },
  { icon: Shield, title: 'No personal numbers shared', desc: 'All communications happen through the platform. Your contact info stays private.' },
  { icon: Fingerprint, title: 'Biometric login', desc: 'Face ID and fingerprint authentication. Fast, secure access on every device.' },
  { icon: Eye, title: 'Full audit trail', desc: 'Every payment, request, and message logged with timestamps. Verifiable records always.' },
  { icon: FileText, title: 'Document security', desc: 'All documents encrypted, access-logged, and tamper-proof. Download anytime.' },
  { icon: Sparkles, title: 'Reusable verification', desc: 'Verify your ID once — reuse across applications. No repeated hard credit inquiries.' },
]

function SecurityTrust() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <SectionWrapper id="trust">
      <SectionHeader eyebrow="Privacy & Security" title="Built for tenant" highlight="privacy" description="Your personal information, financial data, and communications are secure by design." />
      <div ref={ref} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {trustPoints.map((t, i) => (
          <motion.div key={t.title}
            className="group rounded-2xl border border-[#E5E7EB] bg-white p-6 transition-all hover:border-brand-blue/30 hover:shadow-sm"
            initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease, delay: 0.08 + i * 0.08 }}
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue/8 transition-colors group-hover:bg-brand-blue/12">
              <t.icon className="h-5 w-5 text-brand-blue" />
            </div>
            <h3 className="font-heading text-base font-semibold text-brand-graphite">{t.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-brand-graphite-mid">{t.desc}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 6: How It Works                    */
/* ═══════════════════════════════════════════ */

function HowItWorks() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const steps = [
    { num: '01', title: 'Receive your invite', desc: 'Your property manager sends a portal invitation. Set up your account in under 2 minutes.', icon: KeyRound },
    { num: '02', title: 'Self-serve everything', desc: 'Pay rent, request maintenance, download documents, and message your property team.', icon: Smartphone },
    { num: '03', title: 'Stay connected 24/7', desc: 'Access from any device. Push notifications keep you informed on payments, repairs, and renewals.', icon: Bell },
  ]

  return (
    <SectionWrapper id="how" dark>
      <SectionHeader eyebrow="Getting Started" title="Three steps to" highlight="get started" description="From invite to full access in minutes." />
      <div ref={ref} className="mt-12 grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <motion.div key={s.num}
            className="relative rounded-2xl border border-[#E5E7EB] bg-white p-6 transition-all hover:border-brand-blue/30 hover:shadow-sm"
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.1 + i * 0.15 }}
          >
            {/* Step connector line */}
            {i < 2 && <div className="absolute -right-3 top-1/2 hidden h-px w-6 bg-[#E5E7EB] md:block" />}
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue text-sm font-bold text-white"
                initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
                transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.3 + i * 0.15 }}
              >{s.num}</motion.div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue/10">
                <s.icon className="h-5 w-5 text-brand-blue" />
              </div>
            </div>
            <h3 className="font-heading text-base font-semibold text-brand-graphite">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-brand-graphite-mid">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Hero                                       */
/* ═══════════════════════════════════════════ */

function TenantPortalHero() {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-white">
      <div className="absolute inset-0 bg-grid bg-grid-mask opacity-40" aria-hidden="true" />
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-[#176FEB]/[0.06] blur-[140px]" aria-hidden="true" />
      <div className="absolute top-[-5%] right-[-10%] h-[500px] w-[500px] rounded-full bg-[#4A91F0]/[0.05] blur-[120px]" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-24 pb-20 text-center">
        <RevealOnScroll>
          <motion.div variants={revealItem} className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#E5E7EB] bg-white px-4 py-1.5 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-blue opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-blue" />
            </span>
            <span className="text-sm font-medium text-brand-graphite-mid">Tenant Portal</span>
          </motion.div>

          <motion.h1
            variants={revealItem}
            className="font-display text-5xl font-normal leading-[1.1] tracking-tight text-[#0A1628] md:text-7xl lg:text-[5.5rem]"
          >
            Your entire rental life,
            <br className="hidden md:block" />
            {' '}<span className="text-brand-blue font-semibold">one portal</span>
          </motion.h1>

          <motion.p
            variants={revealItem}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-brand-graphite-mid md:text-xl"
          >
            Pay rent, submit maintenance requests, access lease documents, and communicate
            with your property team — all from one secure place, on any device.
          </motion.p>

          <motion.div variants={revealItem} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/signup/"
              className="inline-flex h-14 items-center justify-center rounded-xl bg-brand-blue px-8 text-base font-semibold text-white transition-all hover:bg-brand-blue-dark shadow-cta-glow"
            >
              Get Started Free
            </Link>
            <Link
              href="/demo/"
              className="inline-flex h-14 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-8 text-base font-semibold text-brand-graphite transition-all hover:border-brand-blue/30 hover:shadow-sm"
            >
              Book a Demo
            </Link>
          </motion.div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════ */
/*  CTA                                        */
/* ═══════════════════════════════════════════ */

function PortalCTA() {
  return (
    <SectionWrapper id="cta">
      <div className="mx-auto max-w-3xl text-center">
        <RevealOnScroll>
          <motion.h2 variants={revealItem} className="font-heading font-extrabold text-4xl tracking-tight text-[#0A1628] md:text-5xl">
            Your property team may already use{' '}<span className="text-brand-blue">Revun</span>
          </motion.h2>
          <motion.p variants={revealItem} className="mx-auto mt-5 max-w-lg text-lg text-[#555860]">
            Ask your landlord or property manager if they use Revun. If they do, you already have access to a better rental experience.
          </motion.p>
          <motion.div variants={revealItem} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/contact/" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-blue px-8 text-base font-semibold text-white hover:bg-brand-blue-dark">
              Get in Touch <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/tenants/" className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-8 text-base font-semibold text-brand-graphite hover:border-brand-blue/30">
              Learn More
            </Link>
          </motion.div>
        </RevealOnScroll>
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Page Assembly                              */
/* ═══════════════════════════════════════════ */

export function TenantPortalClient() {
  return (
    <>
      <TenantPortalHero />
      <DashboardPreview />
      <TenantStats />
      <MobileApp />
      <MaintenanceFlow />
      <SecurityTrust />
      <HowItWorks />
      <PortalCTA />

      <p className="sr-only">
        Revun Tenant Portal provides a self-service dashboard for tenants. Features include online rent payments via ACH, credit card, and Interac with autopay and instant receipts, maintenance request submission with photos and real-time status tracking through a four-stage pipeline, secure document vault for leases and receipts, encrypted messaging with the property team, push notifications for payments and maintenance updates, and privacy-first design with AES-256 encryption, biometric login, and full audit trail. The portal is accessible 24/7 from any device with a dedicated mobile app experience.
      </p>
    </>
  )
}
