'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import {
  ArrowRight, Wrench, Clock, DollarSign, CheckCircle2, XCircle, AlertCircle,
  Camera, FileText, MapPin, Calendar, Star, ThumbsUp, Sparkles,
  Navigation, MessageSquare,
  Bot, Briefcase, Gauge, AlertTriangle, X, Quote, Home, Building2,
  ChevronDown, Check, Minus, ShieldCheck,
} from 'lucide-react'
import { sanitizeJsonLd } from '@/lib/utils'

const ease = [0.22, 1, 0.36, 1] as const
const fadeUp = { initial: { opacity: 0, y: 12 }, transition: { duration: 0.6, ease, delay: 0.1 } }

function Anim({ children, className, delay = 0.1, x, y = 12 }: { children: React.ReactNode; className?: string; delay?: number; x?: number; y?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, x: x ?? 0, y }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.5, ease, delay }}
    >{children}</motion.div>
  )
}

function SW({ children, id, dark }: { children: React.ReactNode; id: string; dark?: boolean }) {
  return (
    <section id={id} className={`py-12 md:py-20 lg:py-24 ${dark ? 'bg-[#F5F6F8]' : 'bg-white'}`}>
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">{children}</div>
    </section>
  )
}

function SH({ eyebrow, title, highlight, description }: { eyebrow: string; title: string; highlight: string; description: string }) {
  return (
    <RevealOnScroll className="mx-auto max-w-2xl text-center">
      <motion.p variants={revealItem} className="text-sm font-heading font-semibold uppercase tracking-wider text-brand-blue">{eyebrow}</motion.p>
      <motion.h2 variants={revealItem} className="mt-3 font-display text-2xl sm:text-3xl font-normal md:text-4xl lg:text-5xl text-brand-graphite">
        {title} <span className="text-keyword">{highlight}</span>
      </motion.h2>
      <motion.p variants={revealItem} className="mx-auto mt-4 max-w-xl text-base sm:text-lg text-brand-graphite/70">{description}</motion.p>
    </RevealOnScroll>
  )
}

/* Reusable pipeline stages */
function Pipeline({ active }: { active: number }) {
  const stages = ['Submitted', 'Authorized', 'In Progress', 'Completed']
  return (
    <div className="flex items-center gap-1 rounded-xl border border-[#E5E7EB] bg-white p-3">
      {stages.map((s, i) => (
        <div key={s} className={`flex flex-1 flex-col items-center gap-1.5 rounded-lg py-2.5 text-[10px] font-medium ${i === active ? 'bg-brand-blue text-white' : 'text-brand-graphite-mid'}`}>
          <div className={`flex h-6 w-6 items-center justify-center rounded-full ${i === active ? 'bg-white/20' : 'bg-brand-off-white'}`}>
            {i === 0 && <Clock className="h-3 w-3" />}
            {i === 1 && <ThumbsUp className="h-3 w-3" />}
            {i === 2 && <Wrench className="h-3 w-3" />}
            {i === 3 && <CheckCircle2 className="h-3 w-3" />}
          </div>
          {s}
        </div>
      ))}
    </div>
  )
}

/* ── Section 1: Scope of Work ─────────────────────────────────────── */

function ScopeOfWork() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <SW id="scope">
      <SH eyebrow="Work Orders" title="Scope" highlight="of Work" description="View the proposed scope, estimated time, and cost before any action is taken." />
      <div ref={ref} className="mt-10 md:mt-12 grid gap-6 lg:grid-cols-12 lg:items-start">
        {/* Main work order card */}
        <motion.div className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden lg:col-span-7" initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.1 }}>
          <div className="border-b border-[#E5E7EB] px-6 py-4">
            <h3 className="font-heading text-base font-semibold text-brand-graphite">Maintenance Request</h3>
          </div>
          <div className="px-6 py-4"><Pipeline active={0} /></div>

          <div className="px-6 pb-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-heading text-lg font-bold text-brand-graphite">Plumbing</h4>
              <span className="rounded-full bg-[#176FEB]/10 px-3 py-1 text-xs font-semibold text-[#176FEB]">High Priority</span>
            </div>

            <h5 className="font-heading text-sm font-semibold text-brand-graphite mb-2">Scope of Work</h5>
            <div className="rounded-xl bg-brand-off-white p-4 mb-6">
              <p className="text-sm text-brand-graphite-mid leading-relaxed">
                The toilet in the bathroom is severely clogged and overflowing, creating a messy situation that requires immediate attention. This issue needs to be addressed promptly to maintain a safe and comfortable living environment.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="rounded-xl border border-[#E5E7EB] p-4 text-center">
                <Clock className="mx-auto mb-1.5 h-5 w-5 text-brand-blue" />
                <p className="text-xs text-brand-graphite-mid">Estimated time</p>
                <p className="font-heading text-lg font-bold text-brand-graphite">1.5 - 2</p>
                <p className="text-[10px] text-brand-graphite-mid">hours</p>
              </div>
              <div className="rounded-xl border border-[#E5E7EB] p-4 text-center">
                <DollarSign className="mx-auto mb-1.5 h-5 w-5 text-brand-blue" />
                <p className="text-xs text-brand-graphite-mid">Cost</p>
                <p className="font-heading text-lg font-bold text-brand-graphite">$150.00</p>
                <p className="text-[10px] text-brand-graphite-mid">+ HST</p>
              </div>
            </div>
            <p className="text-xs text-brand-graphite-mid text-center">Price based on similar jobs in your area</p>
          </div>
        </motion.div>

        {/* Editorial sidebar */}
        <div className="flex flex-col gap-4 lg:col-span-5">
          <motion.div
            className="relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white"
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
          >
            <div className="relative aspect-[5/3] w-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=900&q=80"
                alt="Plumber inspecting the pipes under a sink"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/70 via-[#0A1628]/10 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-white/80">Priced from real data</p>
                  <p className="mt-0.5 font-heading text-base font-semibold text-white">12,400+ jobs across North America</p>
                </div>
                <span className="rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold text-brand-graphite">GTA · Avg $148</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="rounded-2xl border border-[#E5E7EB] bg-white p-5"
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease, delay: 0.3 }}
          >
            <p className="text-xs font-heading font-semibold uppercase tracking-wider text-brand-blue">How pricing is scoped</p>
            <ul className="mt-4 space-y-3">
              {[
                { icon: Bot, title: 'AI-classified trade', sub: 'Plumbing / Electrical / HVAC auto-detected' },
                { icon: MapPin, title: 'Comparable jobs nearby', sub: 'Median of last 90 days in your area' },
                { icon: ShieldCheck, title: 'HST / sales tax shown separately', sub: 'Transparent pricing in CAD and USD' },
              ].map((it) => (
                <li key={it.title} className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-blue/10">
                    <it.icon className="h-4 w-4 text-brand-blue" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-brand-graphite">{it.title}</p>
                    <p className="text-xs text-brand-graphite-mid">{it.sub}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </SW>
  )
}

/* ── Section 2: Easy Request Repair ───────────────────────────────── */

function EasyRequest() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <SW id="request" dark>
      <SH eyebrow="Submit" title="Easy Request" highlight="Repair" description="A request is submitted by you or the tenant, including details, photos, or video." />
      <div ref={ref} className="mt-10 md:mt-12 grid gap-6 lg:grid-cols-12 lg:items-start">
        {/* Main form card */}
        <motion.div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 lg:col-span-7" initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.1 }}>
          <div className="border-b border-[#E5E7EB] pb-4 mb-5">
            <h3 className="font-heading text-base font-semibold text-brand-graphite">New Request</h3>
          </div>

          <h4 className="font-heading text-lg font-semibold text-brand-graphite mb-1">
            Issue <span className="text-brand-blue">Details</span>
          </h4>

          {/* Photo upload area */}
          <div className="my-5 rounded-xl bg-brand-off-white p-8 text-center">
            <Camera className="mx-auto h-8 w-8 text-brand-blue/30" />
            <p className="mt-2 text-xs text-brand-graphite-mid">Add photos or video of the issue</p>
          </div>

          <h5 className="font-heading text-sm font-semibold text-brand-graphite mb-2">Description</h5>
          <p className="text-sm text-brand-graphite-mid mb-4">Please submit one issue per request so we can send the right technician.</p>
          <p className="text-sm text-brand-graphite-mid mb-3">Describe what&apos;s going on. We&apos;ll take care of the rest.</p>

          <ul className="space-y-2 mb-4">
            {['Heat or AC not working', 'Electrical or appliance issue', 'Repair, damage, or cleaning needed'].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-brand-graphite-mid">
                <div className="h-1.5 w-1.5 rounded-full bg-brand-blue" /> {item}
              </li>
            ))}
          </ul>

          <div className="rounded-xl border border-[#E5E7EB] px-4 py-3">
            <span className="text-xs text-brand-graphite-light">0/500 characters</span>
          </div>
        </motion.div>

        {/* Editorial sidebar */}
        <div className="flex flex-col gap-4 lg:col-span-5">
          <motion.div
            className="relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white"
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
          >
            <div className="relative aspect-[5/3] w-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80"
                alt="Tenant submitting a maintenance request from the Revun app at home"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/70 via-[#0A1628]/10 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/80">Built for tenants</p>
                <p className="mt-0.5 font-heading text-base font-semibold text-white">3 taps from issue to dispatch</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="rounded-2xl border border-[#E5E7EB] bg-white p-5"
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease, delay: 0.3 }}
          >
            <p className="text-xs font-heading font-semibold uppercase tracking-wider text-brand-blue">Who can submit</p>
            <ul className="mt-4 space-y-3">
              {[
                { icon: Home, title: 'Tenants', sub: 'From the Revun tenant app, in their language' },
                { icon: Briefcase, title: 'Property managers', sub: 'On behalf of a tenant or after an inspection' },
                { icon: MessageSquare, title: 'SMS fallback', sub: 'Text a number if the app is unreachable' },
              ].map((it) => (
                <li key={it.title} className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-blue/10">
                    <it.icon className="h-4 w-4 text-brand-blue" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-brand-graphite">{it.title}</p>
                    <p className="text-xs text-brand-graphite-mid">{it.sub}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </SW>
  )
}

/* ── Section 3: AI Analyzes All Requests ──────────────────────────── */

function AIAnalysis() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const issuePhotos = [
    { src: 'https://images.unsplash.com/photo-1585128792020-803d29415281?auto=format&fit=crop&w=240&q=80', alt: 'Leaky bathroom sink close-up' },
    { src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=240&q=80', alt: 'Bathroom interior photo submitted by tenant' },
    { src: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=240&q=80', alt: 'Close-up of tools beside repair area' },
  ]
  const aiTags = [
    { label: 'Trade', value: 'Plumbing' },
    { label: 'Urgency', value: 'High' },
    { label: 'Category', value: 'Clog / Overflow' },
    { label: 'Estimated scope', value: '1.5 to 2 hrs' },
  ]
  return (
    <SW id="ai-analysis">
      <SH eyebrow="AI Triage" title="AI Analyzes" highlight="All Requests" description="The request is automatically reviewed to understand the issue, urgency, and category." />
      <div ref={ref} className="mt-10 md:mt-12 grid gap-6 lg:grid-cols-12 lg:items-start">
        {/* Main request card */}
        <motion.div className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden lg:col-span-7" initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.1 }}>
          <div className="border-b border-[#E5E7EB] px-6 py-4">
            <h3 className="font-heading text-base font-semibold text-brand-graphite">Maintenance Request</h3>
          </div>
          <div className="px-6 py-4"><Pipeline active={0} /></div>

          {/* AI analyzing panel */}
          <div className="mx-6 mb-6">
            <motion.div
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#E8F2FE] via-[#F5F9FF] to-[#D8E9FE] p-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, ease, delay: 0.3 }}
            >
              {/* Animated scan line */}
              <motion.div
                className="pointer-events-none absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#176FEB] to-transparent"
                initial={{ top: '0%' }}
                animate={inView ? { top: ['0%', '100%', '0%'] } : {}}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'linear', delay: 0.8 }}
              />
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="h-5 w-5 text-[#176FEB]" />
                <span className="font-heading text-lg font-semibold text-brand-graphite">Analyzing your input</span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-2">
                {aiTags.map((t, i) => (
                  <motion.div
                    key={t.label}
                    className="flex items-center justify-between rounded-lg bg-white/70 px-3 py-2 backdrop-blur"
                    initial={{ opacity: 0, y: 6 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.35, ease, delay: 0.9 + i * 0.1 }}
                  >
                    <span className="text-[10px] uppercase tracking-wider text-brand-graphite-mid">{t.label}</span>
                    <span className="text-xs font-semibold text-brand-graphite">{t.value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Reported issue with real photos */}
          <div className="px-6 pb-6">
            <h4 className="font-heading text-sm font-semibold text-brand-graphite mb-3">Reported Issue</h4>
            <div className="flex gap-2">
              {issuePhotos.map((p, i) => (
                <motion.div
                  key={p.src}
                  className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg ring-1 ring-[#E5E7EB]"
                  initial={{ opacity: 0, y: 6 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, ease, delay: 1.1 + i * 0.08 }}
                >
                  <Image src={p.src} alt={p.alt} fill sizes="64px" className="object-cover" />
                </motion.div>
              ))}
              <div className="h-16 w-16 shrink-0 rounded-lg bg-brand-off-white flex items-center justify-center text-xs font-medium text-brand-graphite-mid">+2</div>
            </div>
          </div>
        </motion.div>

        {/* Right: "What the AI catches" explainer */}
        <motion.div
          className="rounded-2xl border border-[#E5E7EB] bg-white p-6 lg:col-span-5"
          initial={{ opacity: 0, x: 16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.25 }}
        >
          <div className="flex items-center gap-2">
            <Bot className="h-4 w-4 text-brand-blue" />
            <p className="text-xs font-heading font-semibold uppercase tracking-wider text-brand-blue">What the AI catches</p>
          </div>
          <h4 className="mt-3 font-heading text-lg font-semibold text-brand-graphite">Built on North American property data</h4>
          <p className="mt-2 text-sm leading-relaxed text-brand-graphite-mid">
            Every request is classified by trade, urgency, and safety risk so the right technician lands on site without a phone call.
          </p>
          <ul className="mt-5 space-y-3">
            {[
              { icon: AlertTriangle, label: 'Safety flags', sub: 'Gas, water damage, electrical hazards escalated' },
              { icon: Briefcase, label: 'Trade matching', sub: 'Plumbing, HVAC, electrical, appliances' },
              { icon: Gauge, label: 'Urgency score', sub: 'Emergency, same-day, standard, scheduled' },
              { icon: FileText, label: 'Similar past jobs', sub: 'Historical cost and time predictions' },
            ].map((it) => (
              <li key={it.label} className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-blue/10">
                  <it.icon className="h-4 w-4 text-brand-blue" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-graphite">{it.label}</p>
                  <p className="text-xs text-brand-graphite-mid">{it.sub}</p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </SW>
  )
}

/* ── Section 4: Maintenance Overview ──────────────────────────────── */

const maintenanceStats = [
  { label: 'Completed', count: 22, color: '#176FEB' },
  { label: 'Pending', count: 8, color: '#4A91F0' },
  { label: 'Canceled', count: 0, color: '#94A3B8' },
]

function MaintenanceOverview() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  /* Donut gauge */
  const size = 130; const sw = 10; const r = (size - sw) / 2; const c = 2 * Math.PI * r; const filled = (73 / 100) * c

  return (
    <SW id="overview" dark>
      <SH eyebrow="Dashboard" title="Maintenance" highlight="Overview" description="See all maintenance requests across your property and track their status in real time." />
      <div ref={ref} className="mt-10 md:mt-12 grid gap-6 lg:grid-cols-12">
        {/* Left: Donut + stats */}
        <motion.div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 lg:col-span-5" initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.1 }}>
          <h3 className="mb-6 font-heading text-lg font-semibold text-brand-graphite">Request Summary</h3>
          <div className="flex items-center gap-6">
            <div className="relative">
              <svg width={size} height={size} className="-rotate-90 overflow-visible">
                <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E5E7EB" strokeWidth={sw} />
                <motion.circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#176FEB" strokeWidth={sw} strokeLinecap="round" strokeDasharray={c}
                  initial={{ strokeDashoffset: c }} animate={inView ? { strokeDashoffset: c - filled } : {}} transition={{ duration: 1.4, ease, delay: 0.3 }} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-heading text-2xl font-bold text-brand-graphite">30</span>
                <span className="text-[10px] text-brand-graphite-mid">Requests</span>
              </div>
            </div>
            <div className="flex-1 space-y-3">
              {maintenanceStats.map((s, i) => (
                <motion.div key={s.label} className="flex items-center justify-between" initial={{ opacity: 0, x: 8 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.4, ease, delay: 0.4 + i * 0.1 }}>
                  <span className="flex items-center gap-2 text-sm text-brand-graphite-mid">
                    {s.label === 'Completed' && <CheckCircle2 className="h-3.5 w-3.5" style={{ color: s.color }} />}
                    {s.label === 'Pending' && <AlertCircle className="h-3.5 w-3.5" style={{ color: s.color }} />}
                    {s.label === 'Canceled' && <XCircle className="h-3.5 w-3.5" style={{ color: s.color }} />}
                    {s.label}
                  </span>
                  <span className="rounded-md px-2 py-0.5 text-xs font-bold" style={{ backgroundColor: `${s.color}15`, color: s.color }}>
                    {s.count.toString().padStart(2, '0')}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
          <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-brand-blue bg-brand-blue/5 py-3 text-sm font-semibold text-brand-blue hover:bg-brand-blue hover:text-white transition-colors">
            Create Request
          </button>
        </motion.div>

        {/* Right: Pipeline + items */}
        <div className="space-y-4 lg:col-span-7">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease, delay: 0.2 }}>
            <Pipeline active={3} />
          </motion.div>
          {[
            { title: 'Plumbing', priority: 'High', status: 'In Progress', time: '01 hr ago' },
            { title: 'Electrical', priority: 'Medium', status: 'Submitted', time: '3 hrs ago' },
            { title: 'HVAC Filter', priority: 'Low', status: 'Completed', time: '1 day ago' },
          ].map((item, i) => (
            <motion.div key={item.title} className="flex items-center gap-4 rounded-xl border border-[#E5E7EB] bg-white p-5 hover:border-brand-blue/20" initial={{ opacity: 0, x: 12 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.4, ease, delay: 0.35 + i * 0.1 }}>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10"><Wrench className="h-5 w-5 text-brand-blue" /></div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-heading text-sm font-semibold text-brand-graphite">{item.title}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${item.priority === 'High' ? 'bg-[#176FEB]/10 text-[#176FEB]' : item.priority === 'Medium' ? 'bg-[#4A91F0]/10 text-[#4A91F0]' : 'bg-brand-off-white text-brand-graphite-mid'}`}>{item.priority} Priority</span>
                </div>
                <p className="mt-0.5 text-xs text-brand-graphite-mid">{item.time}</p>
              </div>
              <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${item.status === 'Completed' ? 'bg-[#176FEB]/15 text-[#176FEB]' : item.status === 'In Progress' ? 'bg-brand-blue/10 text-brand-blue' : 'bg-[#4A91F0]/15 text-[#4A91F0]'}`}>{item.status}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </SW>
  )
}

/* ── Section 5: Approve Or Decline Request ────────────────────────── */

function ApproveDecline() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <SW id="approve">
      <SH eyebrow="Owner Control" title="Approve Or Decline" highlight="Request" description="You choose to approve, decline, or request changes. No work starts without your approval." />
      <div ref={ref} className="mt-10 md:mt-12 grid gap-6 lg:grid-cols-12 lg:items-start">
        <motion.div className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden lg:col-span-7" initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.1 }}>
          <div className="border-b border-[#E5E7EB] px-6 py-4"><h3 className="font-heading text-base font-semibold text-brand-graphite">Maintenance Request</h3></div>
          <div className="px-6 py-4"><Pipeline active={0} /></div>

          <div className="px-6 pb-4">
            <div className="rounded-xl bg-brand-off-white p-4 text-sm text-brand-graphite-mid leading-relaxed">
              The toilet in the bathroom is severely clogged and overflowing, creating a messy situation that requires immediate attention.
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-[#E5E7EB] p-3 text-center">
                <Clock className="mx-auto mb-1 h-4 w-4 text-brand-blue" />
                <p className="text-xs text-brand-graphite-mid">Estimated time</p>
                <p className="font-heading text-base font-bold text-brand-graphite">1.5 - 2 hours</p>
              </div>
              <div className="rounded-xl border border-[#E5E7EB] p-3 text-center">
                <DollarSign className="mx-auto mb-1 h-4 w-4 text-brand-blue" />
                <p className="text-xs text-brand-graphite-mid">Cost</p>
                <p className="font-heading text-base font-bold text-brand-graphite">$150.00 <span className="text-[10px] font-normal text-brand-graphite-mid">+ HST</span></p>
              </div>
            </div>
            <p className="mt-2 text-xs text-brand-graphite-mid text-center">Price based on similar jobs in your area</p>
          </div>

          {/* Reporter */}
          <div className="border-t border-[#E5E7EB] px-6 py-4">
            <p className="text-xs text-brand-graphite-mid mb-2">Reported Issue</p>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue/10"><Wrench className="h-4 w-4 text-brand-blue" /></div>
              <div><p className="text-sm font-medium text-brand-graphite">Mark A</p><p className="text-[10px] text-brand-graphite-mid">Created</p></div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex border-t border-[#E5E7EB]">
            <button className="flex-1 py-4 text-center text-sm font-semibold text-brand-graphite-mid hover:bg-brand-off-white transition-colors">Decline</button>
            <button className="flex-1 bg-brand-blue py-4 text-center text-sm font-semibold text-white hover:bg-brand-blue-dark transition-colors">Approve</button>
          </div>
        </motion.div>

        {/* Auto-approve rules sidebar */}
        <div className="flex flex-col gap-4 lg:col-span-5">
          <motion.div
            className="rounded-2xl border border-[#E5E7EB] bg-white p-6"
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-brand-blue" />
                <p className="text-xs font-heading font-semibold uppercase tracking-wider text-brand-blue">Your auto-approve rules</p>
              </div>
              <span className="rounded-full bg-brand-blue/10 px-2.5 py-1 text-[10px] font-semibold text-brand-blue">Live</span>
            </div>
            <h4 className="mt-3 font-heading text-lg font-semibold text-brand-graphite">Skip the $40 approvals</h4>
            <p className="mt-2 text-sm leading-relaxed text-brand-graphite-mid">
              Set thresholds per property. Revun routes smaller jobs straight to dispatch and escalates the rest so owners stay in the loop.
            </p>
            <ul className="mt-5 space-y-3">
              {[
                { cap: 'Under $250', action: 'Auto-approved · dispatched instantly' },
                { cap: '$250 to $1,000', action: 'One-tap approval from the owner' },
                { cap: 'Over $1,000', action: 'Scope review + 2 vendor quotes' },
              ].map((rule) => (
                <li key={rule.cap} className="flex items-start gap-3 rounded-xl border border-[#E5E7EB] bg-brand-off-white/50 p-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-blue/10">
                    <DollarSign className="h-4 w-4 text-brand-blue" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-brand-graphite">{rule.cap}</p>
                    <p className="text-xs text-brand-graphite-mid">{rule.action}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="rounded-2xl border border-brand-blue/20 bg-brand-blue/5 p-5"
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.3 }}
          >
            <p className="text-xs font-heading font-semibold uppercase tracking-wider text-brand-blue">Weekly owner digest</p>
            <p className="mt-2 text-sm leading-relaxed text-brand-graphite-mid">
              Every Friday, owners receive a digest of auto-approved jobs with photos, costs, and outcomes. Full visibility without 50 push notifications per week.
            </p>
          </motion.div>
        </div>
      </div>
    </SW>
  )
}

/* ── Section 6: Complete with Satisfaction ─────────────────────────── */

function CompleteSatisfaction() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const beforePhotos = [
    { src: 'https://images.unsplash.com/photo-1585128792020-803d29415281?auto=format&fit=crop&w=240&q=80', alt: 'Clogged fixture before repair' },
    { src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=240&q=80', alt: 'Bathroom condition before repair' },
    { src: 'https://images.unsplash.com/photo-1604014237744-6a5c9a6b3e7a?auto=format&fit=crop&w=240&q=80', alt: 'Pipework before technician arrival' },
  ]
  const afterPhotos = [
    { src: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=240&q=80', alt: 'Clean pipework after repair' },
    { src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=240&q=80', alt: 'Restored bathroom sink after fix' },
    { src: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=240&q=80', alt: 'Sparkling clean bathroom after repair' },
  ]
  return (
    <SW id="complete" dark>
      <SH eyebrow="Proof of Work" title="Complete" highlight="with Satisfaction" description="Review before-and-after photos and technician notes once the job is finished." />
      <div ref={ref} className="mt-10 md:mt-12 grid gap-6 lg:grid-cols-12 lg:items-start">
        {/* Main card */}
        <motion.div className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden lg:col-span-7" initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.1 }}>
          <div className="border-b border-[#E5E7EB] px-6 py-4"><h3 className="font-heading text-base font-semibold text-brand-graphite">Maintenance Request</h3></div>
          <div className="px-6 py-4"><Pipeline active={3} /></div>

          <div className="px-6 pb-6">
            <h4 className="font-heading text-base font-semibold text-brand-graphite mb-4">Scope of Work</h4>

            {/* Before photos */}
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-semibold text-brand-graphite">Before</p>
              <span className="rounded-full bg-brand-off-white px-2 py-0.5 text-[10px] font-medium text-brand-graphite-mid">3 photos · timestamped</span>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-5">
              {beforePhotos.map((p, i) => (
                <motion.div
                  key={p.src}
                  className="relative aspect-square overflow-hidden rounded-lg ring-1 ring-[#E5E7EB]"
                  initial={{ opacity: 0, y: 6 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, ease, delay: 0.2 + i * 0.08 }}
                >
                  <Image src={p.src} alt={p.alt} fill sizes="120px" className="object-cover" />
                </motion.div>
              ))}
            </div>

            {/* After photos */}
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-semibold text-brand-graphite">After</p>
              <span className="inline-flex items-center gap-1 rounded-full bg-brand-blue/10 px-2 py-0.5 text-[10px] font-semibold text-brand-blue">
                <CheckCircle2 className="h-3 w-3" /> Tenant signed off
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-6">
              {afterPhotos.map((p, i) => (
                <motion.div
                  key={p.src}
                  className="relative aspect-square overflow-hidden rounded-lg ring-1 ring-brand-blue/20"
                  initial={{ opacity: 0, y: 6 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, ease, delay: 0.5 + i * 0.08 }}
                >
                  <Image src={p.src} alt={p.alt} fill sizes="120px" className="object-cover" />
                </motion.div>
              ))}
            </div>

            {/* Closing notes */}
            <h5 className="font-heading text-sm font-semibold text-brand-graphite mb-2">Closing Notes</h5>
            <div className="rounded-xl bg-brand-off-white p-4">
              <p className="text-sm text-brand-graphite-mid leading-relaxed">
                The issue has been successfully resolved. The toilet was snaked to clear the blockage and restore proper drainage. Before and after photos have been provided for reference. No further issues expected.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Audit sidebar */}
        <div className="flex flex-col gap-4 lg:col-span-5">
          <motion.div
            className="rounded-2xl border border-[#E5E7EB] bg-white p-6"
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.25 }}
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-brand-blue" />
              <p className="text-xs font-heading font-semibold uppercase tracking-wider text-brand-blue">Audit-ready archive</p>
            </div>
            <h4 className="mt-3 font-heading text-lg font-semibold text-brand-graphite">Why operators close at LTB</h4>
            <p className="mt-2 text-sm leading-relaxed text-brand-graphite-mid">
              Every job ships with geotagged photos, technician sign-off, and a tenant acknowledgement. The same record defends you at a hearing without lawyers digging through emails.
            </p>
            <ul className="mt-5 space-y-3">
              {[
                { label: 'Before / after photos', sub: 'Required to close any work order' },
                { label: 'Tenant acknowledgement', sub: 'E-signed receipt of completion' },
                { label: 'Timestamped audit trail', sub: 'Every status change logged' },
              ].map((it) => (
                <li key={it.label} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                  <div>
                    <p className="text-sm font-semibold text-brand-graphite">{it.label}</p>
                    <p className="text-xs text-brand-graphite-mid">{it.sub}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="rounded-2xl border border-brand-blue/20 bg-brand-blue/5 p-5"
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.4 }}
          >
            <div className="flex items-center gap-2">
              <Quote className="h-4 w-4 text-brand-blue" />
              <p className="text-xs font-heading font-semibold uppercase tracking-wider text-brand-blue">Operator note</p>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-brand-graphite">
              &ldquo;Photo archives saved us at two LTB hearings this year. The audit trail Revun builds is worth the platform cost on its own.&rdquo;
            </p>
            <p className="mt-3 text-xs font-semibold text-brand-graphite">Harbourside Management, NS</p>
          </motion.div>
        </div>
      </div>
    </SW>
  )
}

/* ── Section 7: Job in Progress ───────────────────────────────────── */

function JobInProgress() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <SW id="tracking">
      <SH eyebrow="Live Tracking" title="Job in" highlight="Progress" description="Track the technician's route, timing, and job status as the work is completed." />
      <div ref={ref} className="mt-10 md:mt-12 grid gap-6 lg:grid-cols-12 lg:items-start">
        {/* Live tracking card with richer "map" visual */}
        <motion.div className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white lg:col-span-7" initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.1 }}>
          {/* Fake map */}
          <div className="relative h-64 overflow-hidden bg-gradient-to-br from-[#E8F2FE] via-[#F5F9FF] to-[#D8E9FE]">
            {/* Grid roads */}
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 260" preserveAspectRatio="none" aria-hidden>
              <defs>
                <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#C9DCF4" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="400" height="260" fill="url(#map-grid)" />
              {/* Curved street paths */}
              <path d="M 0 190 Q 120 170 210 140 T 400 70" fill="none" stroke="#A6C4EC" strokeWidth="2" />
              <path d="M 60 0 L 60 260" fill="none" stroke="#A6C4EC" strokeWidth="1.5" />
              <path d="M 240 0 L 240 260" fill="none" stroke="#A6C4EC" strokeWidth="1.5" />
              <path d="M 0 80 L 400 80" fill="none" stroke="#A6C4EC" strokeWidth="1.2" />
              {/* Route */}
              <motion.path
                d="M 50 210 Q 150 190 200 150 T 320 70"
                fill="none"
                stroke="#176FEB"
                strokeWidth="3"
                strokeDasharray="6 6"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.6, ease, delay: 0.4 }}
              />
            </svg>

            {/* Start pin (technician) */}
            <motion.div
              className="absolute bottom-10 left-[10%] flex items-center gap-2"
              initial={{ opacity: 0, y: 6 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease, delay: 0.5 }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue text-white shadow-lg ring-4 ring-brand-blue/25">
                <Wrench className="h-4 w-4" />
              </div>
              <div className="rounded-lg bg-white px-2.5 py-1.5 shadow-md">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-graphite-mid">Technician</p>
                <p className="text-xs font-bold text-brand-graphite">Morgan J</p>
              </div>
            </motion.div>

            {/* Destination pin (unit) */}
            <motion.div
              className="absolute right-[16%] top-6 flex items-center gap-2"
              initial={{ opacity: 0, y: 6 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease, delay: 1.6 }}
            >
              <div className="rounded-lg bg-white px-2.5 py-1.5 shadow-md">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-graphite-mid">Unit 704</p>
                <p className="text-xs font-bold text-brand-graphite">Portland St</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0A1628] text-white shadow-lg">
                <MapPin className="h-4 w-4" />
              </div>
            </motion.div>

            {/* ETA chip */}
            <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-blue opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-blue" />
              </span>
              <span className="text-[11px] font-semibold text-brand-graphite">ETA 24 min</span>
            </div>

            {/* Safety + Share location chips */}
            <div className="absolute top-3 right-3 flex gap-2">
              <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-brand-graphite shadow-sm">Safety</span>
            </div>
            <div className="absolute bottom-3 right-3">
              <span className="rounded-full bg-[#176FEB] px-3 py-1 text-xs font-medium text-white shadow-sm">Share location</span>
            </div>
          </div>

          {/* Service details */}
          <div className="px-6 py-5">
            <h4 className="font-heading text-base font-semibold text-brand-graphite mb-4">Service Details</h4>
            <div className="space-y-3">
              {[
                { icon: Wrench, label: 'Plumbing Work Order' },
                { icon: MapPin, label: '704-75 Portland St, Mississauga, ON' },
                { icon: Calendar, label: 'Thursday, May 14, 2025' },
                { icon: Clock, label: '10:30 AM - 1:30 PM' },
              ].map((d) => (
                <div key={d.label} className="flex items-center gap-3">
                  <d.icon className="h-4 w-4 text-brand-blue" />
                  <span className="text-sm text-brand-graphite">{d.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right: Live updates panel */}
        <motion.div
          className="flex flex-col gap-4 lg:col-span-5"
          initial={{ opacity: 0, x: 16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.25 }}
        >
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Navigation className="h-4 w-4 text-brand-blue" />
                <p className="text-xs font-heading font-semibold uppercase tracking-wider text-brand-blue">Live activity</p>
              </div>
              <span className="rounded-full bg-brand-blue/10 px-2.5 py-1 text-[10px] font-semibold text-brand-blue">Now</span>
            </div>
            <ol className="mt-4 space-y-4">
              {[
                { time: '10:28 AM', title: 'En route', sub: 'Left depot on Dundas St' },
                { time: '10:52 AM', title: 'Arrived on site', sub: 'Tenant notified automatically' },
                { time: '11:14 AM', title: 'Before photos captured', sub: '3 of 3 required' },
                { time: 'In progress', title: 'Repair underway', sub: 'Toilet snaked, leak traced' },
              ].map((step, i) => (
                <motion.li
                  key={step.title}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: 8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, ease, delay: 0.4 + i * 0.08 }}
                >
                  <div className="relative mt-0.5">
                    <span className={`flex h-5 w-5 items-center justify-center rounded-full ${i === 3 ? 'bg-brand-blue' : 'bg-brand-blue/15'}`}>
                      {i === 3 ? (
                        <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                      ) : (
                        <CheckCircle2 className="h-3.5 w-3.5 text-brand-blue" />
                      )}
                    </span>
                    {i < 3 && <span className="absolute left-1/2 top-5 h-4 w-px -translate-x-1/2 bg-brand-blue/20" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-brand-graphite">{step.title}</p>
                      <span className="text-[10px] uppercase tracking-wider text-brand-graphite-mid">{step.time}</span>
                    </div>
                    <p className="text-xs text-brand-graphite-mid">{step.sub}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>

          <div className="rounded-2xl border border-brand-blue/20 bg-brand-blue/5 p-5">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-brand-blue" />
              <p className="text-xs font-heading font-semibold uppercase tracking-wider text-brand-blue">Tenant loop</p>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-brand-graphite-mid">
              Tenants get the same live view without calling the office. Fewer &ldquo;when will they be here?&rdquo; texts, cleaner reviews after the job.
            </p>
          </div>
        </motion.div>
      </div>
    </SW>
  )
}

/* ── Section 8: Rate the Service ──────────────────────────────────── */

function RateService() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <SW id="rate" dark>
      <SH eyebrow="Feedback" title="Rate" highlight="the Service" description="Leave feedback on the technician to maintain quality and accountability." />
      <div ref={ref} className="mt-10 md:mt-12 grid gap-6 lg:grid-cols-12 lg:items-start">
        {/* Rating card */}
        <motion.div
          className="rounded-2xl border border-[#E5E7EB] bg-white p-6 text-center lg:col-span-5"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          {/* Technician profile */}
          <div className="flex flex-col items-center mb-5">
            <div className="relative mb-3 h-20 w-20 overflow-hidden rounded-full ring-2 ring-brand-blue/15">
              <Image
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80"
                alt="Morgan J, plumber on the Revun network"
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
            <h4 className="font-heading text-lg font-bold text-brand-graphite">Morgan J</h4>
            <p className="text-xs text-brand-graphite-mid">Plumber · Red Seal certified</p>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-6 mb-6">
            <div className="text-center"><p className="font-heading text-base font-bold text-brand-graphite">4.7</p><p className="text-[10px] text-brand-graphite-mid">Rating</p></div>
            <div className="text-center"><p className="font-heading text-base font-bold text-brand-graphite">1358</p><p className="text-[10px] text-brand-graphite-mid">Points</p></div>
            <div className="text-center"><p className="font-heading text-base font-bold text-brand-graphite">28</p><p className="text-[10px] text-brand-graphite-mid">Jobs</p></div>
          </div>

          {/* Rating */}
          <h5 className="font-heading text-sm font-bold text-brand-graphite mb-1">Tell us your experience!</h5>
          <p className="text-xs text-brand-graphite-mid mb-4">Was the technician polite, respectful, and professionally presented?</p>

          <div className="flex justify-center gap-1.5 mb-6">
            {[1, 2, 3, 4].map((n) => (
              <Star key={n} className="h-8 w-8 text-[#176FEB] fill-[#176FEB]" />
            ))}
            <Star className="h-8 w-8 text-[#E5E7EB]" />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {['Friendly & Helpful', 'On-time', 'Fixed in first visit', 'Late'].map((tag, i) => (
              <span key={tag} className={`rounded-full border px-3 py-1.5 text-xs font-medium ${i < 2 ? 'border-brand-blue text-brand-blue bg-brand-blue/5' : 'border-[#E5E7EB] text-brand-graphite-mid'}`}>{tag}</span>
            ))}
          </div>

          <Link href="/signup/" className="flex w-full items-center justify-center rounded-xl bg-brand-blue py-3.5 text-sm font-semibold text-white hover:bg-brand-blue-dark transition-colors">
            Get Started
          </Link>
        </motion.div>

        {/* Right: Leaderboard editorial */}
        <div className="flex flex-col gap-4 lg:col-span-7">
          <motion.div
            className="rounded-2xl border border-[#E5E7EB] bg-white p-6"
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-brand-blue text-brand-blue" />
                <p className="text-xs font-heading font-semibold uppercase tracking-wider text-brand-blue">Tech leaderboard</p>
              </div>
              <span className="text-xs text-brand-graphite-mid">This week</span>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Morgan J.', role: 'Plumber', jobs: 28, rating: 4.9, avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&q=80' },
                { name: 'Priya N.', role: 'HVAC', jobs: 24, rating: 4.8, avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80' },
                { name: 'Daniel L.', role: 'Electrician', jobs: 19, rating: 4.7, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80' },
              ].map((t, i) => (
                <motion.div
                  key={t.name}
                  className="flex items-center gap-3 rounded-xl border border-[#E5E7EB] p-3"
                  initial={{ opacity: 0, y: 6 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.35, ease, delay: 0.35 + i * 0.08 }}
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 font-heading text-xs font-bold text-brand-blue">
                    {i + 1}
                  </span>
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                    <Image src={t.avatar} alt={`${t.name}, ${t.role}`} fill sizes="40px" className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-brand-graphite">{t.name}</p>
                    <p className="text-xs text-brand-graphite-mid">{t.role} · {t.jobs} jobs</p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-blue/10 px-2.5 py-1 text-xs font-semibold text-brand-blue">
                    <Star className="h-3 w-3 fill-brand-blue" /> {t.rating}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="rounded-2xl border border-[#E5E7EB] bg-white p-6"
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.35 }}
          >
            <p className="text-xs font-heading font-semibold uppercase tracking-wider text-brand-blue">Why ratings matter</p>
            <p className="mt-2 text-sm leading-relaxed text-brand-graphite-mid">
              Every rating feeds back into dispatch. High performers see more jobs. Chronically low ratings trigger a manual review before the tech gets another Revun-routed work order.
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3 border-t border-[#E5E7EB] pt-4 text-center">
              <div>
                <p className="font-heading text-lg font-bold text-brand-graphite">92%</p>
                <p className="mt-0.5 text-[10px] uppercase tracking-wider text-brand-graphite-mid">5 star rate</p>
              </div>
              <div>
                <p className="font-heading text-lg font-bold text-brand-graphite">1.4%</p>
                <p className="mt-0.5 text-[10px] uppercase tracking-wider text-brand-graphite-mid">Recall rate</p>
              </div>
              <div>
                <p className="font-heading text-lg font-bold text-brand-graphite">Q1 2026</p>
                <p className="mt-0.5 text-[10px] uppercase tracking-wider text-brand-graphite-mid">Latest data</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SW>
  )
}

/* ── Hero ─────────────────────────────────────────────────────────── */

function MaintenanceHero() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -40])
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 60])
  const trust = [
    { icon: ShieldCheck, label: 'SOC 2 Compliant' },
    { icon: ShieldCheck, label: 'PIPEDA Compliant' },
    { icon: Clock, label: '24/7 Dispatch' },
    { icon: MapPin, label: 'Provincial Coverage' },
  ]
  const stats = [
    { value: '-60%', label: 'Dispatch time' },
    { value: '100%', label: 'Proof archive' },
    { value: '24/7', label: 'Auto-triage' },
    { value: '10', label: 'Provinces' },
  ]
  const pipelineStages = ['Accepted', 'En route', 'On site', 'Complete']
  return (
    <section id="hero" className="relative overflow-hidden bg-white pb-10 pt-16 md:pb-16 md:pt-20 lg:pt-24">
      <motion.div aria-hidden style={{ y: gridY }} className="pointer-events-none absolute inset-0 opacity-[0.35]">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#E5E7EB 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      </motion.div>
      <div className="relative mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <div ref={ref} className="grid gap-8 md:gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <motion.div {...fadeUp} animate={inView ? { opacity: 1, y: 0 } : {}} className="inline-flex items-center gap-2 text-sm font-heading font-semibold uppercase tracking-wider text-[#176FEB]">
              <Wrench className="h-4 w-4" /><span>Maintenance</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.15 }} className="mt-4 font-display text-3xl font-normal leading-tight text-[#0A1628] sm:text-4xl md:text-5xl lg:text-6xl">
              Maintenance that <span className="text-[#176FEB]">runs itself.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.25 }} className="mt-5 max-w-xl text-base sm:text-lg text-[#555860]">
              AI triage categorizes every request, dispatch finds the closest available tech, and photo-verified proof archives automatically. One property-linked workflow, from request to resolution.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.35 }} className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
              <Link href="/signup/" className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#176FEB] px-6 py-3 text-sm font-heading font-semibold text-white transition hover:brightness-110">
                Get Started Free <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/demo/" className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-6 py-3 text-sm font-heading font-semibold text-[#0A1628] transition hover:border-[#176FEB] hover:text-[#176FEB]">
                Book a Demo
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.45 }} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              {trust.map((t) => (
                <div key={t.label} className="flex items-center gap-2 text-xs text-[#555860]">
                  <t.icon className="h-4 w-4 text-[#176FEB]" /><span>{t.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div style={{ y: cardY }}>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.3 }} className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-[0_20px_60px_-20px_rgba(10,22,40,0.15)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#176FEB] opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#176FEB]" />
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#176FEB]">In Progress</span>
                </div>
                <span className="font-heading text-xs font-semibold text-[#555860]">Work Order #WO-0427</span>
              </div>
              <div className="mt-4">
                <div className="font-heading text-base font-semibold text-[#0A1628]">Leaky faucet</div>
                <div className="mt-1 flex items-center gap-1.5 text-xs text-[#555860]">
                  <MapPin className="h-3.5 w-3.5 text-[#176FEB]" />
                  <span>Unit 704, Portland St &middot; Toronto, ON</span>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider text-[#555860]">Priority</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#176FEB]/10 px-2.5 py-1 text-[10px] font-semibold text-[#176FEB] ring-1 ring-[#176FEB]/20">
                  <AlertTriangle className="h-3 w-3" /> Urgent
                </span>
              </div>
              <div className="mt-5 flex items-center gap-3 rounded-xl border border-[#E5E7EB] bg-[#FAFBFC] p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F2FE] font-heading text-sm font-semibold text-[#176FEB]">DL</div>
                <div className="flex-1">
                  <div className="font-heading text-sm font-semibold text-[#0A1628]">Dave L.</div>
                  <div className="flex items-center gap-1 text-[11px] text-[#555860]"><Clock className="h-3 w-3" /><span>ETA 24 min</span></div>
                </div>
                <Gauge className="h-4 w-4 text-[#176FEB]" />
              </div>
              <div className="mt-5">
                <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-[#555860]">
                  {pipelineStages.map((s, i) => (
                    <span key={s} className={i <= 1 ? 'text-[#176FEB]' : ''}>{s}</span>
                  ))}
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#F5F6F8]">
                  <motion.div initial={{ width: 0 }} animate={inView ? { width: '50%' } : {}} transition={{ duration: 1.4, ease, delay: 0.7 }} className="h-full rounded-full bg-[#176FEB]" />
                </div>
              </div>
              <div className="mt-5 flex items-center gap-2 border-t border-[#E5E7EB] pt-4 text-[11px] text-[#555860]">
                <Bot className="h-3.5 w-3.5 text-[#176FEB]" /><span>Auto-dispatched by Revun AI</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.55 }} className="mt-12 grid grid-cols-2 gap-4 rounded-2xl border border-[#E5E7EB] bg-[#FAFBFC] p-6 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-3xl font-normal text-[#0A1628] md:text-4xl">{s.value}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-[#555860]">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ── Scroll Progress Bar ─────────────────────────────────────────── */

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
      className="fixed left-0 right-0 top-0 z-50 h-1 bg-[#176FEB]"
    />
  )
}

/* ── Sticky Section Nav ──────────────────────────────────────────── */

function SectionNav() {
  const items = [
    { id: 'features-grid', label: 'At a glance' },
    { id: 'problem', label: 'Why switch' },
    { id: 'overview', label: 'Workflow' },
    { id: 'comparison', label: 'Compare' },
    { id: 'faq', label: 'FAQ' },
  ]
  return (
    <div className="sticky top-0 z-40 hidden border-b border-[#E5E7EB] bg-white/80 backdrop-blur-md md:block">
      <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-6 py-3">
        {items.map((it) => (
          <a key={it.id} href={`#${it.id}`} className="shrink-0 rounded-full px-3 py-1 text-xs font-medium text-[#555860] transition-colors hover:bg-[#F5F6F8] hover:text-[#0A1628]">
            {it.label}
          </a>
        ))}
      </nav>
    </div>
  )
}

/* ── Features Grid (at-a-glance) ─────────────────────────────────── */

function FeaturesGrid() {
  const FEATURES = [
    { icon: Bot, title: 'AI Triage', description: 'Every request auto-categorized, prioritized, and routed in seconds.' },
    { icon: Briefcase, title: 'Vendor Dispatch', description: 'Auto-match the right trade and closest available tech. No phone tag.' },
    { icon: Camera, title: 'Proof of Work', description: 'Before/after photos, time logs, and tenant sign-off on every job.' },
    { icon: Clock, title: 'Live Tracking', description: 'Map view of tech location and ETA. Tenants and owners stay informed.' },
    { icon: FileText, title: 'Smart Invoicing', description: 'Auto-generate invoices from completed work orders. Approvals built in.' },
    { icon: ShieldCheck, title: 'Compliance-Ready', description: 'PIPEDA-compliant logs, province-aware safety rules, audit trails archived.' },
  ]
  return (
    <SW id="features-grid" dark>
      <SH eyebrow="Capabilities at a glance" title="From request to resolution," highlight="without the chaos." description="AI triage, vendor dispatch, live tracking, proof of work, all under one property-linked workflow." />
      <RevealOnScroll className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
        {FEATURES.map((feature) => (
          <motion.div key={feature.title} variants={revealItem} className="rounded-2xl border border-[#E5E7EB] bg-white p-6">
            <span className="flex size-12 items-center justify-center rounded-xl bg-[#E8F2FE] text-[#176FEB]">
              <feature.icon className="size-5" />
            </span>
            <h3 className="mt-4 font-heading text-base font-semibold text-[#0A1628]">{feature.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#555860]">{feature.description}</p>
          </motion.div>
        ))}
      </RevealOnScroll>
    </SW>
  )
}

/* ── Problem (before / after with Unsplash) ──────────────────────── */

function ProblemSection() {
  const oldWay = [
    'Work orders arrive by phone, email, and text, with nothing categorized',
    "Dispatch is 'Call Dave, see who is closer', not a system",
    "Proof of work lives in the tech's camera roll, never shared",
    'Invoices lag weeks behind completion, owners stop approving',
  ]
  const revunWay = [
    'AI categorizes, prioritizes, and auto-routes every request',
    'Closest-available, right-trade technician dispatched in one tap',
    'Before/after photos, sign-off, and time logs archived per job',
    'Invoices auto-generated on completion, approved in one click',
  ]
  return (
    <SW id="problem" dark>
      <RevealOnScroll className="mb-12 max-w-3xl lg:mb-16">
        <motion.div variants={revealItem} className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-3 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[#176FEB]" />
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#555860]">Why maintenance breaks</span>
        </motion.div>
        <motion.h2 variants={revealItem} className="font-display text-3xl font-normal leading-[1.1] text-[#0A1628] md:text-4xl lg:text-5xl">
          Most maintenance workflows are run on
          <br className="hidden md:block" /> <span className="text-[#176FEB]">phone calls and text threads.</span>
        </motion.h2>
        <motion.p variants={revealItem} className="mt-5 max-w-2xl text-base text-[#555860] md:text-lg">
          Every handoff between a tenant request and a completed job is a place work gets lost, delayed, or disputed. Here is what the swap looks like.
        </motion.p>
      </RevealOnScroll>

      <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:flex">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E5E7EB] bg-white shadow-lg">
            <span className="font-heading text-xs font-bold tracking-wider text-[#0A1628]">VS</span>
          </div>
        </div>

        <Anim x={-20} delay={0.1}>
          <div className="flex h-full flex-col">
            <div className="mb-4 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-[#E5E7EB] bg-[#F5F6F8] px-2.5 py-1">
                <X className="h-3.5 w-3.5 text-[#555860]" strokeWidth={2.5} />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#555860]">Status quo</span>
              </span>
              <h3 className="font-heading text-lg font-semibold text-[#0A1628]">The old way</h3>
            </div>
            {/* Custom "chaos" panel (no external image) */}
            <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-2xl border border-[#E5E7EB] bg-gradient-to-br from-[#2A313C] via-[#1F252F] to-[#0A1628]">
              {/* Scattered sticky notes */}
              <div className="absolute left-6 top-6 h-20 w-24 rotate-[-8deg] rounded bg-[#FCD34D]/90 p-2 shadow-lg">
                <p className="font-handwriting text-[10px] leading-tight text-[#0A1628]">Call Dave re: 704 toilet?!</p>
              </div>
              <div className="absolute right-8 top-10 h-16 w-20 rotate-[12deg] rounded bg-[#FCA5A5]/90 p-2 shadow-lg">
                <p className="text-[9px] font-bold leading-tight text-[#0A1628]">URGENT tenant called 3x</p>
              </div>
              <div className="absolute left-10 top-32 h-16 w-24 rotate-[4deg] rounded bg-[#86EFAC]/85 p-2 shadow-lg">
                <p className="text-[9px] leading-tight text-[#0A1628]">Mike? Dan? Who is free Thursday</p>
              </div>
              <div className="absolute right-6 bottom-16 h-14 w-20 rotate-[-6deg] rounded bg-white/90 p-2 shadow-lg">
                <p className="text-[9px] leading-tight text-[#0A1628]">Send photo?!</p>
              </div>

              {/* SMS bubble */}
              <div className="absolute right-14 top-28 max-w-[120px] rounded-2xl rounded-br-sm bg-[#22B362]/90 px-3 py-1.5 shadow-lg">
                <p className="text-[10px] font-medium text-white">is plumber coming or not</p>
              </div>

              {/* Phone icon with pulse */}
              <div className="absolute left-16 bottom-12 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 ring-2 ring-white/25 backdrop-blur">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="h-5 w-5" aria-hidden>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white">Missed calls</p>
                  <p className="text-[14px] font-display text-white">07</p>
                </div>
              </div>

              {/* Dim overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/60 via-transparent to-transparent" />

              <div className="absolute bottom-3 left-3">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-white/95 px-2 py-1 backdrop-blur-sm">
                  <Clock className="h-3 w-3 text-[#555860]" />
                  <span className="text-[11px] font-medium text-[#0A1628]">3-5 phone calls per job</span>
                </span>
              </div>
            </div>
            <ul className="space-y-2.5 rounded-xl border border-[#E5E7EB] bg-[#F5F6F8] p-4">
              {oldWay.map((problem, i) => (
                <motion.li key={problem} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.4, delay: 0.15 + i * 0.05 }} className="flex items-start gap-2.5 text-sm text-[#0A1628]">
                  <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#555860]" strokeWidth={2.5} />
                  <span>{problem}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </Anim>

        <Anim x={20} delay={0.2}>
          <div className="flex h-full flex-col">
            <div className="mb-4 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-[#176FEB]/20 bg-[#E8F2FE] px-2.5 py-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#176FEB]" strokeWidth={2.5} />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#176FEB]">The Revun way</span>
              </span>
              <h3 className="font-heading text-lg font-semibold text-[#0A1628]">With Revun</h3>
            </div>
            <div className="relative mb-5">
              <div aria-hidden className="pointer-events-none absolute -inset-4 rounded-full bg-[#176FEB]/20 opacity-60 blur-3xl" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#F5F6F8] ring-1 ring-[#176FEB]/10">
                <Image src="https://images.unsplash.com/photo-1529220502050-f15e570c634e?auto=format&fit=crop&w=900&q=80" alt="Technician using a tablet with maintenance dashboard" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#176FEB]/20 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-white/95 px-2 py-1 backdrop-blur-sm">
                    <CheckCircle2 className="h-3 w-3 text-[#176FEB]" />
                    <span className="text-[11px] font-medium text-[#0A1628]">One request, one workflow</span>
                  </span>
                </div>
              </div>
            </div>
            <ul className="space-y-2.5 rounded-xl border border-[#176FEB]/15 bg-[#176FEB]/5 p-4">
              {revunWay.map((win, i) => (
                <motion.li key={win} initial={{ opacity: 0, x: 8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.4, delay: 0.25 + i * 0.05 }} className="flex items-start gap-2.5 text-sm text-[#0A1628]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#176FEB]" />
                  <span className="font-medium">{win}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </Anim>
      </div>
    </SW>
  )
}

/* ── Use Cases ───────────────────────────────────────────────────── */

function UseCases() {
  const tiles = [
    { img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80', alt: 'Property management company operations', Icon: Building2, role: 'PMCs', title: 'Property Management Companies', desc: 'Centralize vendor relationships, SLAs, and every invoice across properties.', href: '/solutions/property-management-companies/' },
    { img: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80', alt: 'Maintenance company dispatching technicians', Icon: Wrench, role: 'Maintenance', title: 'Maintenance Companies', desc: "Run dispatch, work orders, and invoicing inside your property manager's platform.", href: '/solutions/maintenance-companies/' },
    { img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80', alt: 'Self-managing landlord reviewing maintenance request', Icon: Home, role: 'Owners', title: 'Self-Managing Landlords', desc: 'One-tap approvals, real-time job updates, no phone tag with vendors.', href: '/solutions/self-managing-owners/' },
    { img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80', alt: 'Institutional multifamily operator', Icon: Briefcase, role: 'Enterprise', title: 'REITs & Leasing Ops', desc: 'Standardize maintenance workflows across 1,000+ units with full audit trails.', href: '/solutions/reits/' },
  ]
  return (
    <SW id="use-cases" dark>
      <SH eyebrow="Built for" title="Maintenance that scales with" highlight="your operation." description="Whether you dispatch 10 work orders a week or 10,000, the same intake, triage, and proof-of-work runs under every job." />
      <RevealOnScroll className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
        {tiles.map((t) => (
          <motion.div key={t.href} variants={revealItem}>
            <Link href={t.href} className="group block h-full overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white transition-all hover:border-[#176FEB]/40 hover:shadow-md">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={t.img} alt={t.alt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2">
                  <t.Icon className="h-4 w-4 text-[#176FEB]" aria-hidden />
                  <span className="text-[11px] font-heading font-semibold uppercase tracking-wider text-[#176FEB]">{t.role}</span>
                </div>
                <h3 className="mt-2 font-heading text-lg font-semibold text-[#0A1628]">{t.title}</h3>
                <p className="mt-1 text-sm text-[#555860]">{t.desc}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#176FEB]">
                  Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </RevealOnScroll>
    </SW>
  )
}

/* ── Testimonials ────────────────────────────────────────────────── */

function Testimonials() {
  const testimonials = [
    { quote: "We used to lose track of work orders in group chats. Revun's AI triage routes every request to the right trade in seconds, and the owner sees the photo proof before the tech leaves the driveway.", name: 'Emma Tremblay', title: 'Operations Lead · Riverwalk Property Group', location: 'Ottawa, ON', photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80', alt: 'Emma Tremblay, Operations Lead at Riverwalk Property Group' },
    { quote: "Our average time-to-dispatch dropped from 2.5 hours to 18 minutes. Techs get jobs with full context: photos, unit info, tenant contact. Tenants rate the job when it is done. Zero confusion.", name: 'Jordan Singh', title: 'VP Operations · WestGate Residential', location: 'Calgary, AB', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', alt: 'Jordan Singh, VP Operations at WestGate Residential' },
    { quote: 'Before-and-after photos and technician sign-off on every job saved us at two LTB hearings this year. The audit trail Revun builds is worth the platform cost on its own.', name: 'Lucia Fernandes', title: 'Director · Harbourside Management', location: 'Halifax, NS', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80', alt: 'Lucia Fernandes, Director at Harbourside Management' },
  ]
  const stats = [
    { number: '2.5h → 18min', label: 'Avg. dispatch time' },
    { number: '100%', label: 'Proof-of-work archive' },
    { number: '-60%', label: 'Work order cycle time' },
    { number: '0', label: 'Disputed completions*' },
  ]
  return (
    <SW id="testimonials">
      <SH eyebrow="Proof" title="Operators are dispatching" highlight="60% faster." description="Real property managers, real numbers, from the first quarter of using Revun Maintenance." />
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Anim key={t.name} delay={0.1 * (i + 1)}>
            <div className="relative h-full rounded-2xl border border-[#E5E7EB] bg-white p-6 transition-all hover:border-[#176FEB]/40 hover:shadow-sm md:p-8">
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
                  <Image src={t.photo} alt={t.alt} fill sizes="48px" className="object-cover" />
                </div>
                <div className="min-w-0">
                  <div className="truncate font-bold text-[#0A1628]">{t.name}</div>
                  <div className="mt-0.5 flex items-center gap-1 text-xs text-[#555860]">
                    <Building2 className="h-3 w-3 shrink-0" /><span className="truncate">{t.title}</span>
                  </div>
                  <div className="mt-0.5 flex items-center gap-1 text-xs text-[#555860]">
                    <MapPin className="h-3 w-3 shrink-0" /><span className="truncate">{t.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </Anim>
        ))}
      </div>
      <div className="mt-10 rounded-2xl border border-[#176FEB]/20 bg-[#176FEB]/5 p-6 md:p-8">
        <div className="grid grid-cols-2 gap-y-6 sm:grid-cols-4 sm:divide-x sm:divide-[#E5E7EB]">
          {stats.map((s) => (
            <div key={s.label} className="px-4 text-center">
              <div className="font-display text-2xl text-[#0A1628] md:text-3xl">{s.number}</div>
              <div className="mt-2 text-xs uppercase tracking-wide text-[#555860]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-[#555860]">*Across Revun customers in Q1 2026.</p>
    </SW>
  )
}

/* ── Comparison Table ────────────────────────────────────────────── */

type CmpStatus = 'yes' | 'no' | 'partial'
type CmpRow = { feature: string; revun: string; pmeld: string; jobber: string; svctitan: string; status: { revun: CmpStatus; pmeld: CmpStatus; jobber: CmpStatus; svctitan: CmpStatus } }

function Comparison() {
  const columns = [
    { key: 'feature', label: 'Feature' },
    { key: 'revun', label: 'Revun', highlight: true },
    { key: 'pmeld', label: 'Property Meld / MaintainX' },
    { key: 'jobber', label: 'Jobber / Housecall Pro' },
    { key: 'svctitan', label: 'ServiceTitan / UpKeep' },
  ]
  const rows: CmpRow[] = [
    { feature: 'Property context on every work order', revun: 'Unit, lease, tenant, history attached', pmeld: 'Property field only', jobber: 'Not applicable', svctitan: 'Not applicable', status: { revun: 'yes', pmeld: 'partial', jobber: 'no', svctitan: 'no' } },
    { feature: 'AI-powered triage + priority', revun: 'Auto-categorize and prioritize', pmeld: 'Manual tagging only', jobber: 'No AI', svctitan: 'No AI', status: { revun: 'yes', pmeld: 'no', jobber: 'no', svctitan: 'no' } },
    { feature: 'Vendor/tech marketplace', revun: 'Revun vetted network + your own', pmeld: 'Your own vendors only', jobber: 'Your own only', svctitan: 'Your own only', status: { revun: 'yes', pmeld: 'partial', jobber: 'partial', svctitan: 'partial' } },
    { feature: 'Tenant self-serve portal', revun: 'Request, track, rate from one portal', pmeld: 'Basic portal', jobber: 'No tenant portal', svctitan: 'Customer portal, not tenant', status: { revun: 'yes', pmeld: 'partial', jobber: 'no', svctitan: 'no' } },
    { feature: 'Owner approval workflow', revun: 'Threshold-based auto-approvals', pmeld: 'Manual approve per request', jobber: 'Not applicable', svctitan: 'Not applicable', status: { revun: 'yes', pmeld: 'partial', jobber: 'no', svctitan: 'no' } },
    { feature: 'Before/after photo archive', revun: 'Required per job, audit-ready', pmeld: 'Optional upload', jobber: 'Optional upload', svctitan: 'Optional upload', status: { revun: 'yes', pmeld: 'partial', jobber: 'partial', svctitan: 'partial' } },
    { feature: 'Flows into accounting + invoicing', revun: 'Direct to Revun ledger + QBO/Xero', pmeld: 'Export CSV only', jobber: 'Jobber invoicing only', svctitan: 'ST invoicing only', status: { revun: 'yes', pmeld: 'no', jobber: 'partial', svctitan: 'partial' } },
    { feature: 'CA + US compliance (PIPEDA, state privacy laws, province/state-aware)', revun: 'Native', pmeld: 'US-only', jobber: 'US-only', svctitan: 'US-only', status: { revun: 'yes', pmeld: 'no', jobber: 'no', svctitan: 'no' } },
  ]
  const StatusIcon = ({ status }: { status: CmpStatus }) => {
    if (status === 'yes') return <Check className="h-4 w-4 shrink-0 text-[#176FEB]" strokeWidth={3} />
    if (status === 'no') return <X className="h-4 w-4 shrink-0 text-[#94A3B8]" strokeWidth={3} />
    return <Minus className="h-4 w-4 shrink-0 text-[#D3D5DB]" strokeWidth={3} />
  }
  return (
    <SW id="comparison" dark>
      <SH eyebrow="vs. the rest" title="Why maintenance-only tools" highlight="leave owners in the dark." description="Point solutions dispatch work orders. Revun ties dispatch to the property, the lease, and the owner approval chain." />
      <Anim delay={0.05}>
        <div className="mt-14 overflow-x-auto rounded-2xl border border-[#E5E7EB] shadow-sm">
          <table className="w-full min-w-[900px] border-collapse bg-white">
            <thead>
              <tr className="bg-[#0A1628]">
                {columns.map((col) => (
                  <th key={col.key} className={`px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide ${col.highlight ? 'border-l-4 border-[#176FEB] bg-[#176FEB] text-white' : 'text-white/80'} ${col.key === 'feature' ? 'sticky left-0 z-10 bg-[#0A1628] min-w-[220px]' : 'min-w-[170px]'}`}>
                    <div className="flex items-center gap-2">
                      {col.highlight && <ShieldCheck className="h-4 w-4" />}
                      {col.label}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => {
                const zebra = i % 2 === 1 ? 'bg-[#FAFBFC]' : 'bg-white'
                return (
                  <tr key={row.feature} className={`${zebra} border-t border-[#E5E7EB]`}>
                    <td className={`sticky left-0 z-10 border-r border-[#E5E7EB] px-5 py-4 ${zebra}`}>
                      <div className="text-sm font-semibold text-[#0A1628]">{row.feature}</div>
                    </td>
                    <td className="border-l-4 border-[#176FEB] bg-[#176FEB]/5 px-5 py-4">
                      <div className="flex items-start gap-2"><StatusIcon status={row.status.revun} /><span className="text-sm font-semibold text-[#0A1628]">{row.revun}</span></div>
                    </td>
                    <td className="px-5 py-4"><div className="flex items-start gap-2"><StatusIcon status={row.status.pmeld} /><span className="text-sm text-[#555860]">{row.pmeld}</span></div></td>
                    <td className="px-5 py-4"><div className="flex items-start gap-2"><StatusIcon status={row.status.jobber} /><span className="text-sm text-[#555860]">{row.jobber}</span></div></td>
                    <td className="px-5 py-4"><div className="flex items-start gap-2"><StatusIcon status={row.status.svctitan} /><span className="text-sm text-[#555860]">{row.svctitan}</span></div></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Anim>
      <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-[#555860]">Comparison based on publicly listed features as of 2026.</p>
    </SW>
  )
}

/* ── FAQ ─────────────────────────────────────────────────────────── */

const MAINTENANCE_FAQS = [
  { q: "Do I have to use Revun's vendor network?", a: "No. Bring your own vendors and techs, or mix with Revun's vetted network. You control the dispatch rules per property." },
  { q: 'How does the AI triage work exactly?', a: 'Every submitted request is classified by trade, urgency, and estimated scope. The model is trained on Canadian and US property maintenance data and flags safety-critical issues for immediate dispatch.' },
  { q: 'What if a technician skips the before/after photos?', a: "Work orders can't be closed without them. The tech app blocks submission until the required media is captured and tenant sign-off is collected." },
  { q: "Can I set approval thresholds so owners don't see every $40 job?", a: 'Yes. Set auto-approve limits per property (e.g., under $250) with routing rules for bigger spends. Owners get weekly digests on everything auto-approved.' },
  { q: 'Does this work for commercial properties?', a: 'Yes. Revun supports residential, commercial, and mixed-use with configurable compliance rules, trade specializations, and SLA tiers per property.' },
  { q: 'How fast is dispatch, really?', a: 'Median time from request submission to technician accepting is 18 minutes for non-emergency, under 4 minutes for emergency, across all Revun customers in Canada and the US in Q1 2026.' },
  { q: 'Can I export historical work orders?', a: 'Yes. Every work order, photo, invoice, and tenant rating is exportable as PDF, CSV, or JSON. Your data is yours.' },
  { q: 'What happens if Revun goes down during an emergency?', a: 'Work order intake has a failover SMS gateway: tenants text a number and the request lands in Revun when the service restores. Emergency contacts for every property are also stored offline in the tech app.' },
] as const

function FAQ() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: MAINTENANCE_FAQS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
  return (
    <SW id="faq">
      <SH eyebrow="FAQ" title="Questions we hear from" highlight="operators switching to Revun." description="Straight answers on AI triage, vendor networks, SLAs, and data handoff." />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(faqJsonLd) }} />
      <RevealOnScroll className="mx-auto mt-12 max-w-3xl">
        {MAINTENANCE_FAQS.map((item, idx) => (
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
    </SW>
  )
}

/* ── Final CTA ───────────────────────────────────────────────────── */

function CTASection() {
  return (
    <section id="cta" className="relative overflow-hidden bg-[#0A1628] px-4 md:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 55% at 50% 40%, rgba(23,111,235,0.28), rgba(23,111,235,0.08), transparent 75%)' }} />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#176FEB]/40 to-transparent" />
      <RevealOnScroll className="relative mx-auto max-w-3xl text-center">
        <motion.div variants={revealItem}>
          <span className="inline-flex items-center rounded-full border border-[#176FEB]/30 bg-[#176FEB]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-[#176FEB]">
            Deploy in 14 days
          </span>
        </motion.div>
        <motion.h2 variants={revealItem} className="mt-6 font-display text-3xl font-normal tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
          Stop fighting with phone calls. <span className="text-[#176FEB]">Start dispatching with clarity.</span>
        </motion.h2>
        <motion.p variants={revealItem} className="mx-auto mt-6 max-w-xl text-base text-white/70 sm:text-lg">
          Try Revun Maintenance free for 14 days. No credit card, no sales gate.
        </motion.p>
        <motion.div variants={revealItem} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/signup/" className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#176FEB] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_40px_-8px_rgba(23,111,235,0.8)] transition-all hover:brightness-110 hover:shadow-[0_0_50px_-4px_rgba(23,111,235,0.9)]">
            Get Started Free
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
          <Link href="/demo/" className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/15">
            Book a Demo
          </Link>
        </motion.div>
        <motion.p variants={revealItem} className="mt-8 text-xs text-white/50">
          Questions? <Link href="/contact/" className="text-[#176FEB] transition-colors hover:text-white">Talk to our dispatch team →</Link>
        </motion.p>
      </RevealOnScroll>
    </section>
  )
}

/* ── Assembly ─────────────────────────────────────────────────────── */

export function MaintenanceClient() {
  return (
    <>
      <ScrollProgressBar />
      <MaintenanceHero />
      <SectionNav />
      <FeaturesGrid />
      <ProblemSection />
      <ScopeOfWork />
      <EasyRequest />
      <AIAnalysis />
      <MaintenanceOverview />
      <ApproveDecline />
      <CompleteSatisfaction />
      <JobInProgress />
      <RateService />
      <UseCases />
      <Testimonials />
      <Comparison />
      <FAQ />
      <CTASection />
      <p className="sr-only">
        Revun Maintenance provides a complete maintenance workflow for property owners and managers. Features include scope of work with estimated time and cost, easy request submission with photos and video, AI-powered request analysis for urgency and category classification, maintenance overview dashboard with 30 requests tracked across completed, pending, and canceled statuses, owner approve or decline controls, before-and-after photo proof of completion with technician closing notes, live job tracking with technician route and timing, and service rating with feedback tags for quality accountability. Technician profiles show rating, points, and job count.
      </p>
    </>
  )
}
