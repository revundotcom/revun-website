'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
  Camera,
  Download,
  Search,
} from 'lucide-react'
import { useCounter } from '@/hooks/use-counter'

/* ═══════════════════════════════════════════ */
/*  Shared primitives                          */
/* ═══════════════════════════════════════════ */

const ease = [0.22, 1, 0.36, 1] as const

function SectionWrapper({ children, id, dark }: { children: React.ReactNode; id: string; dark?: boolean }) {
  return (
    <section id={id} className={`py-12 md:py-20 lg:py-28 ${dark ? 'bg-[#F5F6F8]' : 'bg-white'}`}>
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">{children}</div>
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
      <motion.h2 variants={revealItem} className="mt-3 font-display text-3xl font-normal md:text-4xl lg:text-5xl text-brand-graphite">
        {title} <span className="text-keyword">{highlight}</span>
      </motion.h2>
      <motion.p variants={revealItem} className="mx-auto mt-4 max-w-xl text-base md:text-lg text-brand-graphite/70">
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

type ActivityTone = 'accent' | 'active' | 'muted'

const toneClasses: Record<ActivityTone, { icon: string; pill: string }> = {
  // Solid brand for attention items
  accent: { icon: 'text-white', pill: 'bg-[#176FEB] text-white' },
  // Brand-tinted for in-progress items
  active: { icon: 'text-[#176FEB]', pill: 'bg-[#E8F2FE] text-[#176FEB]' },
  // Neutral graphite for completed items
  muted: { icon: 'text-[#555860]', pill: 'bg-[#F5F6F8] text-[#555860]' },
}

const activity = [
  { icon: Wrench, label: 'Kitchen faucet repair scheduled for Thu, May 8', status: 'In Progress', tone: 'active' as ActivityTone, time: '2 hrs ago' },
  { icon: FileText, label: 'Lease renewal ready for your signature', status: 'Action Needed', tone: 'accent' as ActivityTone, time: '1 day ago' },
  { icon: CheckCircle2, label: 'Renter insurance verified (Sonnet policy)', status: 'Done', tone: 'muted' as ActivityTone, time: '3 days ago' },
  { icon: CreditCard, label: 'April rent $1,850 processed via PAD', status: 'Confirmed', tone: 'muted' as ActivityTone, time: '5 days ago' },
]

function DashboardPreview() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const rent = useCounter(1850, 1200, inView)

  return (
    <SectionWrapper id="dashboard">
      <SectionHeader eyebrow="Tenant Dashboard" title="Everything tenants need," highlight="on the home screen" description="Next payment due, open work orders, lease documents, and building announcements. No more 'where do I find…' emails at 9pm." />
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
              className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F2FE] px-3 py-1 text-xs font-semibold text-brand-blue"
              initial={{ opacity: 0, x: 10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" />
              Lease Active
            </motion.span>
          </div>

          {/* Dashboard body */}
          <div className="bg-[#F5F6F8] p-5">
            <div className="grid gap-4 md:grid-cols-3">
              {/* Payment card */}
              <motion.div
                className="flex flex-col rounded-xl border border-[#E5E7EB] bg-white p-5"
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease, delay: 0.3 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-brand-graphite">Next Payment</p>
                  <span className="text-[10px] text-brand-graphite-mid">Due May 1, 2026</span>
                </div>
                <p className="text-3xl font-bold text-brand-blue">
                  ${rent.toLocaleString()}
                  <span className="text-sm font-normal text-brand-graphite-mid">.00 CAD</span>
                </p>

                {/* Method row */}
                <div className="mt-3 flex items-center justify-between text-[10px]">
                  <span className="inline-flex items-center gap-1 text-brand-graphite-mid">
                    <CreditCard className="h-3 w-3" strokeWidth={2} />
                    PAD · TD Canada Trust ••••4821
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-brand-blue">
                    <CheckCircle2 className="h-3 w-3" strokeWidth={2.5} />
                    Autopay on
                  </span>
                </div>

                {/* CTA buttons */}
                <div className="mt-4 flex gap-2">
                  <div className="flex-1 rounded-lg bg-brand-blue py-2.5 text-center text-xs font-semibold text-white cursor-default">
                    Pay Now
                  </div>
                  <div className="rounded-lg border border-[#E5E7EB] px-3 py-2.5 text-center text-xs font-medium text-brand-graphite-mid cursor-default">
                    Manage
                  </div>
                </div>

                {/* Payment history compact */}
                <div className="mt-4 flex-1 border-t border-[#E5E7EB] pt-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-graphite-mid">
                      Last 3 payments
                    </span>
                    <span className="text-[10px] font-medium text-brand-blue cursor-default">
                      View all
                    </span>
                  </div>
                  <ul className="space-y-1.5 text-[11px]">
                    {[
                      { month: 'Apr 2026', amount: '$1,850', on: true },
                      { month: 'Mar 2026', amount: '$1,850', on: true },
                      { month: 'Feb 2026', amount: '$1,850', on: true },
                    ].map((p) => (
                      <li
                        key={p.month}
                        className="flex items-center justify-between"
                      >
                        <span className="inline-flex items-center gap-1.5 text-brand-graphite-mid">
                          <CheckCircle2 className="h-3 w-3 text-brand-blue" strokeWidth={2.5} />
                          {p.month}
                        </span>
                        <span className="font-medium text-brand-graphite">{p.amount}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Activity feed */}
              <motion.div
                className="rounded-xl border border-[#E5E7EB] bg-white p-5 md:col-span-2"
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease, delay: 0.4 }}
              >
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-semibold text-brand-graphite">Recent Activity</p>
                  <span className="text-[10px] text-brand-graphite-mid">Last 7 days</span>
                </div>
                <div className="space-y-2">
                  {activity.map((item, i) => {
                    const Icon = item.icon
                    const tone = toneClasses[item.tone]
                    return (
                      <motion.div
                        key={item.label}
                        className="flex items-center gap-3 rounded-lg border border-[#E5E7EB] bg-white px-3 py-2.5 transition-colors hover:border-brand-blue/30"
                        initial={{ opacity: 0, x: -8 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.3, ease, delay: 0.5 + i * 0.1 }}
                      >
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#E8F2FE]">
                          <Icon className="h-3.5 w-3.5 text-brand-blue" strokeWidth={2} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="truncate text-xs text-brand-graphite">{item.label}</p>
                          <p className="text-[10px] text-brand-graphite-mid">{item.time}</p>
                        </div>
                        <span
                          className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${tone.pill}`}
                        >
                          {item.status}
                        </span>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            </div>

            {/* Bottom row */}
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <motion.div
                className="rounded-xl border border-[#E5E7EB] bg-white p-5"
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, ease, delay: 0.7 }}
              >
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-semibold text-brand-graphite">Document Vault</p>
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium text-brand-blue cursor-default">
                    <Download className="h-3 w-3" strokeWidth={2} />
                    Upload
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {[
                    { name: 'Lease Agreement 2025-2026.pdf', size: '284 KB' },
                    { name: 'Renter Insurance (Sonnet).pdf', size: '112 KB' },
                    { name: 'Move-in Inspection Report.pdf', size: '3.2 MB' },
                  ].map((doc) => (
                    <li
                      key={doc.name}
                      className="flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-xs hover:bg-[#F5F6F8]"
                    >
                      <span className="flex items-center gap-2 truncate text-brand-graphite">
                        <FileText className="h-3.5 w-3.5 shrink-0 text-brand-blue" strokeWidth={2} />
                        <span className="truncate">{doc.name}</span>
                      </span>
                      <span className="shrink-0 text-[10px] text-brand-graphite-mid">
                        {doc.size}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                className="rounded-xl border border-[#E5E7EB] bg-white p-5"
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, ease, delay: 0.8 }}
              >
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-semibold text-brand-graphite">Lease Details</p>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#E8F2FE] px-2 py-0.5 text-[10px] font-semibold text-brand-blue">
                    <Sparkles className="h-2.5 w-2.5" strokeWidth={2.5} />
                    Renewal open
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
                  {[
                    { label: 'Term', value: '12 months' },
                    { label: 'Rent', value: '$1,850 / mo' },
                    { label: 'Start', value: 'Jun 1, 2025' },
                    { label: 'End', value: 'May 31, 2026' },
                  ].map((d) => (
                    <div key={d.label}>
                      <p className="text-[10px] uppercase tracking-wider text-brand-graphite-mid">
                        {d.label}
                      </p>
                      <p className="text-xs font-medium text-brand-graphite">{d.value}</p>
                    </div>
                  ))}
                </div>
                {/* Lease progress bar */}
                <div className="mt-3 border-t border-[#E5E7EB] pt-3">
                  <div className="mb-1 flex items-center justify-between text-[10px] text-brand-graphite-mid">
                    <span>Lease progress</span>
                    <span className="font-semibold text-brand-graphite">10 / 12 months</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#E5E7EB]">
                    <motion.div
                      className="h-full rounded-full bg-brand-blue"
                      initial={{ width: 0 }}
                      animate={inView ? { width: '83%' } : {}}
                      transition={{ duration: 1.1, ease, delay: 0.9 }}
                    />
                  </div>
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
      <SectionHeader eyebrow="Payment health" title="Autopay cuts delinquency" highlight="nearly in half" description="Industry data from NMHC, TransUnion, and major PM platforms: residents on autopay are roughly 2× less likely to pay late, and 79% of renters already prefer to pay rent online." />
      <div ref={ref} className="mt-12 grid gap-6 lg:grid-cols-12">
        {/* Left: Payment health gauge */}
        <motion.div
          className="rounded-2xl border border-[#E5E7EB] bg-white p-6 lg:col-span-5"
          initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          <h3 className="mb-6 font-heading text-lg font-semibold text-brand-graphite">Payment Health</h3>
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
            <DonutGauge value={100} size={130} sw={10} color="#176FEB" label="On-time" inView={inView} delay={0.3} />
            <div className="w-full flex-1 space-y-3">
              {[
                { label: 'Payments made', value: '11 of 11', color: '#176FEB' },
                { label: 'Next due', value: 'May 1', color: '#176FEB' },
                { label: 'Late fees', value: '$0', color: '#176FEB' },
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
            { icon: CreditCard, label: 'Total Paid (YTD)', value: '$20,350', spark: [1850, 1850, 1850, 1850, 1850, 1850, 1850, 1850, 1850, 1850, 1850], color: '#176FEB' },
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

  const mobileFeatures = [
    { icon: CreditCard, title: 'Pay rent instantly', desc: 'ACH, credit card, and Interac e-Transfer. Set up autopay and never think about it again.' },
    { icon: Camera, title: 'Photo maintenance requests', desc: 'Snap a photo, describe the issue, submit. Track progress and get notified when it is fixed.' },
    { icon: MessageSquare, title: 'Message your team', desc: 'Direct messaging with your property manager. No personal numbers. Full conversation history.' },
    { icon: Bell, title: 'Push notifications', desc: 'Payment reminders, maintenance updates, and lease renewals. Pushed to your phone in real time.' },
    { icon: Download, title: 'Documents on demand', desc: 'Download your lease, receipts, and notices anytime. Everything stored securely in your vault.' },
  ]

  return (
    <SectionWrapper id="mobile">
      <SectionHeader eyebrow="Mobile" title="Manage from" highlight="anywhere" description="The full tenant experience on your phone. Pay rent, request repairs, and message your property team on the go." />
      <div
        ref={ref}
        className="mt-12 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch lg:gap-16"
      >
        {/* Left: lifestyle image as anchor + tight editorial copy block */}
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          {/* Anchor image, landscape aspect for tight column */}
          <div className="relative aspect-[5/3] overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&w=1400&q=80"
              alt="Tenant reviewing rent payment on smartphone at home"
              fill
              sizes="(max-width: 1024px) 92vw, 44vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-tr from-[#0A1628]/50 via-transparent to-transparent"
              aria-hidden="true"
            />
            {/* Floating spec badge */}
            <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#0A1628]/70 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
              <Smartphone className="h-3 w-3" strokeWidth={2} />
              iOS 16+ · Android 12+ · Web
            </div>
          </div>

          {/* Eyebrow + compact headline + desc */}
          <p className="mt-7 text-xs font-heading font-semibold uppercase tracking-wider text-brand-blue">
            On every device
          </p>
          <h3 className="mt-3 font-display text-4xl font-normal leading-[1] text-brand-graphite md:text-5xl">
            Rent day,{' '}
            <span className="text-brand-blue">every</span> day.
          </h3>
          <p className="mt-4 text-base leading-relaxed text-brand-graphite-mid">
            Native apps with Face ID and biometric unlock. Offline drafts for
            work orders from the basement laundry room. Push notifications that
            actually matter. Plus a web fallback for the browser holdouts.
          </p>

          {/* Platform chips, tight inline */}
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
            {[
              'Offline-capable',
              'Biometric login',
              'Push alerts',
              'Dark mode',
              'EN + FR',
            ].map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 text-sm text-brand-graphite-mid"
              >
                <span className="h-1 w-1 rounded-full bg-brand-blue" />
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right: editorial feature list, tighter rows, hairline dividers */}
        <div className="flex flex-col divide-y divide-[#E5E7EB] border-y border-[#E5E7EB]">
          {mobileFeatures.map((feat, i) => {
            const Icon = feat.icon
            return (
              <motion.div
                key={feat.title}
                className="group flex flex-1 items-start gap-5 py-5"
                initial={{ opacity: 0, x: 16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, ease, delay: 0.2 + i * 0.08 }}
              >
                <Icon
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue transition-transform duration-200 group-hover:scale-110"
                  strokeWidth={1.8}
                />
                <div className="flex-1">
                  <h4 className="font-heading text-base font-semibold text-brand-graphite">
                    {feat.title}
                  </h4>
                  <p className="mt-1 text-sm leading-relaxed text-brand-graphite-mid">
                    {feat.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
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
      <SectionHeader eyebrow="Maintenance" title="From leaky faucet to" highlight="resolved, end to end" description="Tenants attach up to 5 photos or a short video, pick an access window, and watch status update in real time. Submitted → Authorized → In Progress → Completed, with push updates at every stage." />

      {/* Editorial banner image */}
      <div className="relative mx-auto mt-10 aspect-[21/6] max-w-5xl overflow-hidden rounded-2xl">
        <Image
          src="https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=2000&q=80"
          alt="Technician repairing a kitchen faucet"
          fill
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#F5F6F8] via-[#F5F6F8]/10 to-transparent"
          aria-hidden="true"
        />
      </div>

      <div ref={ref} className="mt-12 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Pipeline visualization (kept as a product frame, densified with real data) */}
        <motion.div
          className="flex flex-col rounded-2xl border border-[#E5E7EB] bg-white p-6"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-heading text-base font-semibold text-brand-graphite">
              Request Pipeline
            </h3>
            <span className="text-[10px] uppercase tracking-wider text-brand-graphite-mid">
              4 open · 23 this year
            </span>
          </div>

          {/* Stage pipeline with counts */}
          <div className="mb-5 flex gap-1 rounded-xl border border-[#E5E7EB] p-2">
            {[
              { stage: 'Submitted', count: 1 },
              { stage: 'Authorized', count: 1 },
              { stage: 'In Progress', count: 2 },
              { stage: 'Completed', count: 19 },
            ].map(({ stage, count }, i) => {
              const active = i === 2
              return (
                <div
                  key={stage}
                  className={`flex flex-1 flex-col items-center gap-0.5 rounded-lg py-2 text-center transition-colors ${
                    active
                      ? 'bg-brand-blue text-white'
                      : 'text-brand-graphite-mid'
                  }`}
                >
                  <span className="text-[10px] font-medium">{stage}</span>
                  <span
                    className={`font-heading text-xs font-bold ${
                      active ? 'text-white' : 'text-brand-graphite'
                    }`}
                  >
                    {count}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Average SLA strip */}
          <div className="mb-5 grid grid-cols-3 gap-2 rounded-xl bg-[#F5F6F8] p-3 text-center">
            {[
              { value: '3.8 hr', label: 'Avg. first response' },
              { value: '1.9 day', label: 'Avg. resolution' },
              { value: '94%', label: 'On first visit' },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-heading text-sm font-bold text-brand-graphite">
                  {s.value}
                </p>
                <p className="text-[9px] uppercase tracking-wider text-brand-graphite-mid">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Active requests */}
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-brand-graphite-mid">
            Your active requests
          </p>
          <div className="flex flex-1 flex-col gap-2.5">
            {[
              {
                title: 'Kitchen faucet leak',
                priority: 'Urgent',
                status: 'In Progress',
                statusTone: 'active',
                time: '2 hrs ago',
                detail: 'Technician: Mike R. · ETA Thu 1–3 PM',
              },
              {
                title: 'Hallway light flickering',
                priority: 'Standard',
                status: 'Authorized',
                statusTone: 'muted',
                time: '1 day ago',
                detail: 'Vendor assigned: Bright Electric Co.',
              },
              {
                title: 'Dishwasher loud rattle',
                priority: 'Standard',
                status: 'Submitted',
                statusTone: 'muted',
                time: '3 days ago',
                detail: 'Triage: appliance repair queue',
              },
            ].map((item, i) => {
              const urgent = item.priority === 'Urgent'
              const statusPill =
                item.statusTone === 'active'
                  ? 'bg-[#E8F2FE] text-brand-blue'
                  : 'bg-[#F5F6F8] text-brand-graphite-mid'
              return (
                <motion.div
                  key={item.title}
                  className="flex items-start gap-3 rounded-xl border border-[#E5E7EB] p-3.5 transition-colors hover:border-brand-blue/40"
                  initial={{ opacity: 0, x: -8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, ease, delay: 0.3 + i * 0.08 }}
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#E8F2FE]">
                    <Wrench className="h-4 w-4 text-brand-blue" strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="font-heading text-sm font-semibold text-brand-graphite">
                        {item.title}
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                          urgent
                            ? 'bg-brand-blue text-white'
                            : 'bg-[#F5F6F8] text-brand-graphite-mid'
                        }`}
                      >
                        {item.priority}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-[11px] text-brand-graphite-mid">
                      {item.detail}
                    </p>
                    <p className="mt-0.5 text-[10px] text-brand-graphite-mid">
                      {item.time}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${statusPill}`}
                  >
                    {item.status}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Steps: editorial list, no cards */}
        <div className="flex flex-col divide-y divide-[#E5E7EB] border-y border-[#E5E7EB]">
          {maintenanceSteps.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.step}
                className="group grid flex-1 grid-cols-[auto_1fr_auto] items-start gap-5 py-6"
                initial={{ opacity: 0, x: 16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, ease, delay: 0.2 + i * 0.12 }}
              >
                <span className="font-display text-4xl leading-none text-brand-blue md:text-5xl">
                  {s.step}
                </span>
                <div>
                  <h4 className="font-heading text-base font-semibold text-brand-graphite md:text-lg">
                    {s.title}
                  </h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-brand-graphite-mid">
                    {s.desc}
                  </p>
                </div>
                <Icon
                  className="mt-1 h-5 w-5 text-brand-blue transition-transform duration-200 group-hover:scale-110"
                  strokeWidth={1.8}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 5: Security & Trust                */
/* ═══════════════════════════════════════════ */

const complianceBadges = [
  { label: 'SOC 2 Type II', sub: 'Audited controls' },
  { label: 'PCI-DSS Level 1', sub: 'Tokenized payments' },
  { label: 'PIPEDA + CCPA', sub: 'CA + US residency' },
  { label: 'AES-256', sub: 'At rest + in transit' },
]

function SecurityTrust() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <SectionWrapper id="trust">
      <SectionHeader
        eyebrow="North American data, local rules"
        title="Privacy by"
        highlight="design"
        description="Data residency in Canada. AES-256 at rest and in transit. SOC 2 Type II controls. Payment details never touch Revun servers; everything is tokenized through a PCI-DSS Level 1 processor."
      />

      {/* Compliance strip */}
      <div ref={ref} className="mx-auto mt-12 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#E5E7EB] bg-[#E5E7EB] md:grid-cols-4"
        >
          {complianceBadges.map((b, i) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, ease, delay: 0.1 + i * 0.06 }}
              className="flex items-center gap-3 bg-white px-5 py-4"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-blue/10">
                <CheckCircle2 className="h-4 w-4 text-brand-blue" strokeWidth={2.5} />
              </div>
              <div className="min-w-0">
                <div className="font-heading text-sm font-bold text-brand-graphite">{b.label}</div>
                <div className="truncate text-[11px] text-brand-graphite-mid">{b.sub}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bento grid */}
      <div className="mx-auto mt-6 max-w-5xl">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-6">
          {/* Featured: Encryption */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease, delay: 0.15 }}
            className="group relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-7 md:col-span-1 lg:col-span-4"
          >
            <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-blue/5 blur-2xl" />
            <div className="relative flex items-start gap-6 md:flex-row">
              <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-brand-blue/10 md:h-24 md:w-24">
                <span className="absolute inset-0 animate-ping rounded-2xl bg-brand-blue/10 opacity-75" style={{ animationDuration: '3s' }} />
                <Lock className="relative h-9 w-9 text-brand-blue md:h-10 md:w-10" strokeWidth={1.8} />
              </div>
              <div className="flex-1">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-blue/10 px-2.5 py-1 text-[10px] font-heading font-bold uppercase tracking-wider text-brand-blue">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" /> Featured
                </span>
                <h3 className="mt-3 font-heading text-xl font-bold text-brand-graphite md:text-2xl">
                  End-to-end encryption
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-graphite-mid md:text-base">
                  AES-256 encryption on every byte — at rest, in transit, on backups. Keys rotated automatically, managed by HSM. Nothing leaves Canada.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['AES-256-GCM', 'TLS 1.3', 'HSM Key Rotation', 'Zero-Trust'].map((chip) => (
                    <span key={chip} className="rounded-full bg-[#F5F6F8] px-2.5 py-1 text-[11px] font-medium text-brand-graphite">
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Biometric */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease, delay: 0.22 }}
            className="group relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-gradient-to-br from-brand-blue/5 to-white p-7 lg:col-span-2"
          >
            <div className="flex h-full flex-col">
              <div className="relative mx-auto mb-4 flex h-14 w-14 items-center justify-center">
                <span className="absolute inset-0 animate-ping rounded-full bg-brand-blue/20 opacity-75" style={{ animationDuration: '2.5s' }} />
                <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue">
                  <Fingerprint className="h-7 w-7 text-white" strokeWidth={1.8} />
                </span>
              </div>
              <h3 className="text-center font-heading text-lg font-bold text-brand-graphite">Biometric login</h3>
              <p className="mt-2 text-center text-sm text-brand-graphite-mid">
                Face ID and fingerprint. No passwords to forget, no SMS codes to intercept.
              </p>
            </div>
          </motion.div>

          {/* No personal numbers */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease, delay: 0.28 }}
            className="group rounded-2xl border border-[#E5E7EB] bg-white p-6 transition-all hover:border-brand-blue/40 hover:shadow-sm lg:col-span-2"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue/10">
              <Shield className="h-5 w-5 text-brand-blue" strokeWidth={2} />
            </div>
            <h3 className="mt-4 font-heading text-base font-bold text-brand-graphite">
              No personal numbers shared
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-brand-graphite-mid">
              All messaging and calls route through the platform. Your phone number stays yours.
            </p>
          </motion.div>

          {/* Full audit trail */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease, delay: 0.34 }}
            className="group rounded-2xl border border-[#E5E7EB] bg-white p-6 transition-all hover:border-brand-blue/40 hover:shadow-sm lg:col-span-2"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue/10">
              <Eye className="h-5 w-5 text-brand-blue" strokeWidth={2} />
            </div>
            <h3 className="mt-4 font-heading text-base font-bold text-brand-graphite">
              Full audit trail
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-brand-graphite-mid">
              Every payment, request, and message timestamped and immutable. Tribunal-ready.
            </p>
          </motion.div>

          {/* Document security */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease, delay: 0.4 }}
            className="group rounded-2xl border border-[#E5E7EB] bg-white p-6 transition-all hover:border-brand-blue/40 hover:shadow-sm lg:col-span-2"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue/10">
              <FileText className="h-5 w-5 text-brand-blue" strokeWidth={2} />
            </div>
            <h3 className="mt-4 font-heading text-base font-bold text-brand-graphite">
              Document security
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-brand-graphite-mid">
              Encrypted storage, access-logged downloads, tamper-proof e-signatures.
            </p>
          </motion.div>

          {/* Featured: Reusable verification */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease, delay: 0.46 }}
            className="group relative overflow-hidden rounded-2xl border border-brand-blue/20 bg-gradient-to-br from-brand-blue/[0.04] via-white to-white p-7 lg:col-span-6"
          >
            <div aria-hidden className="pointer-events-none absolute -left-10 -bottom-10 h-48 w-48 rounded-full bg-brand-blue/5 blur-3xl" />
            <div className="relative grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10">
                    <Sparkles className="h-5 w-5 text-brand-blue" strokeWidth={2} />
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-blue/10 px-2.5 py-1 text-[10px] font-heading font-bold uppercase tracking-wider text-brand-blue">
                    North American-first
                  </span>
                </div>
                <h3 className="mt-4 font-heading text-xl font-bold text-brand-graphite md:text-2xl">
                  Reusable verification, zero repeat credit hits
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-brand-graphite-mid md:text-base">
                  Verify your identity once with Certn — then reuse that verified profile across every Revun-powered application. No repeated hard credit pulls. No duplicate document uploads. Your score stays intact.
                </p>
              </div>

              {/* Verification badge mockup */}
              <div className="relative w-full md:w-[260px]">
                <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-[0_10px_30px_-12px_rgba(23,111,235,0.25)]">
                  <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
                    <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-brand-graphite-mid">
                      Verified ID
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-brand-blue">
                      <span className="relative flex size-1.5">
                        <span className="absolute inline-flex size-1.5 animate-ping rounded-full bg-brand-blue" />
                        <span className="relative inline-flex size-1.5 rounded-full bg-brand-blue" />
                      </span>
                      Active
                    </span>
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue text-sm font-heading font-bold text-white">
                      JS
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-heading text-sm font-bold text-brand-graphite">Jordan Smith</div>
                      <div className="text-[11px] text-brand-graphite-mid">Verified · Mar 12, 2026</div>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-[11px]">
                    {[
                      { label: 'ID', ok: true },
                      { label: 'Credit', ok: true },
                      { label: 'Income', ok: true },
                      { label: 'References', ok: true },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-1.5 rounded-md bg-brand-blue/5 px-2 py-1.5">
                        <CheckCircle2 className="h-3 w-3 text-brand-blue" />
                        <span className="text-brand-graphite">{item.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 rounded-md border border-dashed border-brand-blue/30 bg-brand-blue/5 px-2 py-1.5 text-center text-[10px] font-mono text-brand-blue">
                    ID: RVN-CERTN-4829
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
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
    {
      num: '01',
      title: 'Receive your invite',
      desc: 'Your property manager sends a portal invitation by email or SMS. Self-onboard in under 3 minutes. No app store download required.',
      icon: KeyRound,
      timeBadge: '< 3 min',
    },
    {
      num: '02',
      title: 'Set up autopay',
      desc: 'Link a Canadian bank for PAD or Interac e-Transfer, or a US bank for ACH. Opt in to report on-time rent to build credit.',
      icon: Smartphone,
      timeBadge: '~ 2 min',
    },
    {
      num: '03',
      title: 'Live in your rental, not your inbox',
      desc: 'Pay, request, e-sign, and message — all from one app. Push alerts for payments, repairs, and lease renewals. Offline drafts supported.',
      icon: Bell,
      timeBadge: 'Always on',
    },
  ]

  return (
    <SectionWrapper id="how" dark>
      <SectionHeader
        eyebrow="Getting Started"
        title="Three steps to"
        highlight="get started"
        description="From invite to full access in minutes."
      />

      <div ref={ref} className="relative mx-auto mt-14 max-w-5xl">
        {/* Desktop connector line */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 right-0 top-[86px] hidden h-px bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent lg:block"
        />

        <div className="grid gap-6 lg:grid-cols-3 lg:gap-6">
          {steps.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.num}
                className="group relative"
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, ease, delay: 0.12 + i * 0.14 }}
              >
                {/* Step badge (sits on the connector line) */}
                <div className="mb-6 flex items-center justify-center">
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_10px_30px_-12px_rgba(23,111,235,0.25)]">
                    {i === 0 && inView && (
                      <span aria-hidden className="absolute inset-0 animate-ping rounded-2xl bg-brand-blue/20 opacity-75" style={{ animationDuration: '2.5s' }} />
                    )}
                    <span className="relative font-display text-2xl font-normal text-brand-blue">
                      {s.num}
                    </span>
                  </div>
                </div>

                {/* Step card */}
                <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 transition-all group-hover:border-brand-blue/40 group-hover:shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue/10">
                      <Icon className="h-5 w-5 text-brand-blue" strokeWidth={2} />
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-brand-blue/10 px-2.5 py-1 text-[10px] font-heading font-bold uppercase tracking-wider text-brand-blue">
                      {s.timeBadge}
                    </span>
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-bold text-brand-graphite md:text-xl">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-graphite-mid">
                    {s.desc}
                  </p>

                  {/* Per-step mini mockup */}
                  <div className="mt-5 rounded-xl border border-[#E5E7EB] bg-[#FAFBFC] p-4">
                    {i === 0 && (
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-brand-graphite-mid">SMS · 2m ago</span>
                          <MessageSquare className="h-3.5 w-3.5 text-brand-blue" />
                        </div>
                        <div className="mt-2 rounded-lg bg-white p-3 shadow-sm">
                          <div className="text-[11px] font-semibold text-brand-graphite">Acme Properties</div>
                          <div className="mt-1 text-[11px] leading-snug text-brand-graphite-mid">
                            Welcome! Set up your tenant portal: <span className="font-mono text-brand-blue">revun.app/invite/A3K9</span>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-brand-blue py-2 text-[11px] font-semibold text-white">
                          <KeyRound className="h-3 w-3" /> Open portal
                        </div>
                      </div>
                    )}

                    {i === 1 && (
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-brand-graphite-mid">Autopay</span>
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-brand-blue">
                            <CheckCircle2 className="h-3 w-3" /> Linked
                          </span>
                        </div>
                        <div className="mt-2 rounded-lg bg-white p-3">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-blue/10 text-[9px] font-heading font-bold text-brand-blue">
                              RBC
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-[11px] font-semibold text-brand-graphite">Chequing</div>
                              <div className="font-mono text-[10px] text-brand-graphite-mid">•••• 4829</div>
                            </div>
                            <CheckCircle2 className="h-4 w-4 text-brand-blue" />
                          </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between rounded-lg border border-dashed border-brand-blue/30 bg-brand-blue/5 px-3 py-2 text-[10px]">
                          <span className="font-medium text-brand-graphite">Report to Equifax</span>
                          <span className="inline-flex h-4 w-7 items-center rounded-full bg-brand-blue px-0.5">
                            <span className="h-3 w-3 rounded-full bg-white translate-x-3" />
                          </span>
                        </div>
                      </div>
                    )}

                    {i === 2 && (
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-brand-graphite-mid">Today</span>
                          <Bell className="h-3.5 w-3.5 text-brand-blue" />
                        </div>
                        <div className="mt-2 space-y-1.5">
                          <div className="rounded-lg bg-white p-2.5 shadow-sm">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-brand-blue" />
                              <span className="text-[11px] font-semibold text-brand-graphite">Rent confirmed</span>
                              <span className="ml-auto text-[10px] text-brand-graphite-mid">9:00 AM</span>
                            </div>
                            <div className="mt-0.5 pl-5 text-[10px] text-brand-graphite-mid">$1,850.00 · Mar 1, 2026</div>
                          </div>
                          <div className="rounded-lg bg-white p-2.5 shadow-sm">
                            <div className="flex items-center gap-2">
                              <Wrench className="h-3.5 w-3.5 shrink-0 text-brand-blue" />
                              <span className="text-[11px] font-semibold text-brand-graphite">Tech arriving</span>
                              <span className="ml-auto text-[10px] text-brand-graphite-mid">10:24 AM</span>
                            </div>
                            <div className="mt-0.5 pl-5 text-[10px] text-brand-graphite-mid">Plumbing · ETA 24 min</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Arrow connector (between cards, desktop only) */}
                {i < steps.length - 1 && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute right-[-14px] top-[86px] hidden h-px w-7 translate-y-[-50%] lg:block"
                  >
                    <ArrowRight className="absolute -right-1 -top-[9px] h-4 w-4 text-brand-blue" strokeWidth={2} />
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease, delay: 0.6 }}
          className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full border border-[#E5E7EB] bg-white px-5 py-3"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-graphite">
            <CheckCircle2 className="h-3.5 w-3.5 text-brand-blue" /> No app store required
          </span>
          <span className="h-3 w-px bg-[#E5E7EB]" />
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-graphite">
            <CheckCircle2 className="h-3.5 w-3.5 text-brand-blue" /> Works offline
          </span>
          <span className="h-3 w-px bg-[#E5E7EB]" />
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-graphite">
            <CheckCircle2 className="h-3.5 w-3.5 text-brand-blue" /> North American support hours
          </span>
        </motion.div>
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

      <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-6 lg:px-8 pt-20 md:pt-24 pb-16 md:pb-20 text-center">
        <RevealOnScroll>
          <motion.div variants={revealItem} className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#E5E7EB] bg-white px-4 py-1.5 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-blue opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-blue" />
            </span>
            <span className="text-sm font-medium text-brand-graphite-mid">
              Tenant Portal · CA + US native
            </span>
          </motion.div>

          <motion.h1
            variants={revealItem}
            className="font-display text-3xl font-normal leading-[1.1] tracking-tight text-[#0A1628] md:text-5xl lg:text-6xl xl:text-[5.5rem]"
          >
            Your entire rental life,
            <br className="hidden md:block" />
            {' '}<span className="text-brand-blue font-semibold">one portal</span>
          </motion.h1>

          <motion.p
            variants={revealItem}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-brand-graphite-mid md:text-lg lg:text-xl"
          >
            Pay rent by Interac e-Transfer or Pre-Authorized Debit, submit
            maintenance with photos, e-sign leases, and build credit history
            with Equifax Canada. Available on web, iOS, and Android.
          </motion.p>

          <motion.div variants={revealItem} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/demo/"
              className="inline-flex h-14 items-center justify-center rounded-xl bg-brand-blue px-8 text-base font-semibold text-white transition-all hover:bg-brand-blue-dark shadow-cta-glow"
            >
              Book a Demo
            </Link>
            <Link
              href="/pricing/"
              className="inline-flex h-14 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-8 text-base font-semibold text-brand-graphite transition-all hover:border-brand-blue/30 hover:shadow-sm"
            >
              See Pricing
            </Link>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            variants={revealItem}
            className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-brand-graphite-mid"
          >
            {[
              'Hosted in Canada',
              'Bilingual EN / FR',
              'PIPEDA + Law 25 compliant',
              'SOC 2 Type II',
              'PCI-DSS Level 1 processor',
            ].map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-brand-blue" strokeWidth={2} />
                {item}
              </span>
            ))}
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
    <section id="cta" className="relative overflow-hidden bg-[#0A1628] py-16 text-white md:py-20 lg:py-24">
      {/* Background image */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1600&q=80"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-20"
        />
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#0A1628] via-[#0A1628]/85 to-[#0A1628]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, #176FEB33 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, #4A91F022 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-4 md:px-6 lg:px-8 text-center">
        <RevealOnScroll>
          <motion.p
            variants={revealItem}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs uppercase tracking-widest text-white/70"
          >
            <Sparkles className="h-3.5 w-3.5" strokeWidth={1.8} />
            For property operators
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mt-6 font-display text-3xl leading-[1.05] tracking-tight md:text-5xl lg:text-6xl"
          >
            Give your residents the portal they already{' '}
            <span className="text-[#4A91F0]">expect</span>
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/70 md:text-lg"
          >
            Book a 20-minute walkthrough. We will migrate your first 50 units
            free and have residents self-onboarding within a week.
          </motion.p>

          <motion.div
            variants={revealItem}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/70"
          >
            {[
              'Free white-glove migration',
              'Live in under 14 days',
              'Cancel anytime',
            ].map((r) => (
              <span key={r} className="inline-flex items-center gap-1.5">
                <CheckCircle2
                  className="h-4 w-4 flex-shrink-0 text-[#4A91F0]"
                  strokeWidth={2}
                />
                {r}
              </span>
            ))}
          </motion.div>

          <motion.div
            variants={revealItem}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link
              href="/demo/"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#176FEB] px-8 text-base font-semibold text-white shadow-[0_8px_24px_-8px_#176FEB] transition-colors duration-150 hover:bg-[#0B5AD4]"
            >
              Book a Demo <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing/"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 bg-transparent px-8 text-base font-semibold text-white transition-colors duration-150 hover:bg-white/10"
            >
              See Pricing
            </Link>
          </motion.div>
        </RevealOnScroll>
      </div>
    </section>
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
