'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import {
  Sparkles, Bot, Zap, Brain, Target, TrendingUp, Shield, Users,
  CheckCircle2, AlertTriangle, Clock, ArrowRight, Settings, BarChart3,
  Wrench, Flame, Thermometer, Lightbulb, MessageSquare, Star,
  Send, Bell, ToggleRight, Play, Eye, Phone, Mail,
} from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const

function SW({ children, id, dark }: { children: React.ReactNode; id: string; dark?: boolean }) {
  return (
    <section id={id} className={`py-16 md:py-20 ${dark ? 'bg-[#F5F6F8]' : 'bg-white'}`}>
      <div className="mx-auto max-w-6xl px-6">{children}</div>
    </section>
  )
}

function SH({ eyebrow, title, highlight, description }: { eyebrow: string; title: string; highlight: string; description: string }) {
  return (
    <RevealOnScroll className="mx-auto max-w-2xl text-center">
      <motion.p variants={revealItem} className="text-sm font-heading font-semibold uppercase tracking-wider text-brand-blue">{eyebrow}</motion.p>
      <motion.h2 variants={revealItem} className="mt-3 font-display text-4xl font-normal md:text-5xl text-brand-graphite">
        {title} <span className="text-keyword">{highlight}</span>
      </motion.h2>
      <motion.p variants={revealItem} className="mx-auto mt-4 max-w-xl text-lg text-brand-graphite/70">{description}</motion.p>
    </RevealOnScroll>
  )
}

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

/* ── Section 1: Hero ──────────────────────────────────────────────── */

function Hero() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <section id="hero" className="relative overflow-hidden bg-white pt-32 pb-16 md:pt-40 md:pb-20">
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(23,111,235,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(23,111,235,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" aria-hidden="true" />
      {/* Blue blur */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[420px] w-[420px] rounded-full bg-[#176FEB]/[0.06] blur-[100px]" aria-hidden="true" />

      <div ref={ref} className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.div
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-[#176FEB]/20 bg-[#E8F2FE] px-4 py-1.5"
          initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease }}
        >
          <Sparkles className="h-4 w-4 text-[#176FEB]" />
          <span className="text-sm font-heading font-semibold text-[#176FEB]">AI-Powered Operations</span>
        </motion.div>

        <motion.h1
          className="font-display text-4xl font-normal text-[#0A1628] md:text-6xl"
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          AI that runs property operations,{' '}
          <span className="text-[#176FEB]">not just answers questions</span>
        </motion.h1>

        <motion.p
          className="mx-auto mt-5 max-w-2xl text-lg text-[#555860] md:text-xl"
          initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.2 }}
        >
          Workflow intelligence that classifies, routes, schedules, and notifies automatically — turning reactive operations into predictable execution.
        </motion.p>

        <motion.div
          className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.3 }}
        >
          <Link href="/pricing/" className="inline-flex h-12 items-center justify-center rounded-xl bg-[#176FEB] px-7 text-sm font-semibold text-white transition-colors hover:bg-[#0B5AD4]">
            Start Free Trial
          </Link>
          <Link href="/demo/" className="inline-flex h-12 items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-7 text-sm font-semibold text-[#2C2E33] transition-colors hover:border-[#176FEB]/30">
            Book a Demo <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

/* ── Section 2: AI Command Center ─────────────────────────────────── */

function AICommandCenter() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const steps = [
    { text: 'Classified as Appliance — Priority: Medium', color: '#F59E0B', icon: Target },
    { text: 'Matched vendor: Pro Appliance Co. (4.9\u2605)', color: '#22C55E', icon: Users },
    { text: 'Scheduled for Tomorrow, 10 AM', color: '#176FEB', icon: Clock },
    { text: 'Tenant notified via SMS + in-app', color: '#176FEB', icon: Bell },
  ]

  const badges = ['Classify', 'Match', 'Schedule', 'Notify']

  const features = [
    { icon: Brain, title: 'Natural Language Understanding', desc: 'Describe the issue in plain language. AI parses intent, category, urgency, and location automatically.' },
    { icon: Zap, title: 'Instant Orchestration', desc: 'From a single message, AI triggers classification, vendor matching, scheduling, and notifications in sequence.' },
    { icon: Shield, title: 'Audit-Ready Logs', desc: 'Every AI decision is logged with reasoning, confidence scores, and timestamps for full accountability.' },
  ]

  return (
    <SW id="ai-command-center" dark>
      <SH eyebrow="Command Center" title="One message." highlight="Four actions." description="Tell the AI what happened. It handles the rest." />
      <div ref={ref} className="mt-12 grid gap-8 lg:grid-cols-2">
        {/* Chat mockup */}
        <motion.div
          className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden"
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease }}
        >
          <div className="border-b border-[#E5E7EB] px-6 py-4 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#176FEB]/10"><Bot className="h-4 w-4 text-[#176FEB]" /></div>
            <span className="font-heading text-sm font-semibold text-[#0A1628]">Revun AI Assistant</span>
            <span className="ml-auto flex items-center gap-1.5 text-xs text-[#22C55E]"><span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />Online</span>
          </div>
          <div className="p-6 space-y-4">
            {/* User message */}
            <motion.div
              className="ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-[#176FEB] px-4 py-3 text-sm text-white"
              initial={{ opacity: 0, x: 16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.4, ease, delay: 0.2 }}
            >
              Broken dishwasher in Unit 7C. Handle it.
            </motion.div>
            {/* AI response */}
            <motion.div
              className="max-w-[90%] space-y-2"
              initial={{ opacity: 0, x: -12 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.4, ease, delay: 0.5 }}
            >
              <div className="rounded-2xl rounded-bl-md bg-[#F5F6F8] px-4 py-3 text-sm text-[#0A1628]">
                <p className="font-medium mb-3">On it. Here&apos;s what I did:</p>
                <div className="space-y-2">
                  {steps.map((s, i) => (
                    <motion.div
                      key={s.text}
                      className="flex items-start gap-2.5 rounded-lg border border-[#E5E7EB] bg-white px-3 py-2"
                      initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.35, ease, delay: 0.7 + i * 0.2 }}
                    >
                      <s.icon className="mt-0.5 h-4 w-4 shrink-0" style={{ color: s.color }} />
                      <span className="text-xs text-[#555860]">{s.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
            {/* Workflow badges */}
            <motion.div
              className="flex flex-wrap items-center gap-2 pt-2"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.4, ease, delay: 1.6 }}
            >
              {badges.map((b, i) => (
                <span key={b} className="inline-flex items-center rounded-full bg-[#E8F2FE] px-3 py-1 text-xs font-medium text-[#176FEB]">
                  <CheckCircle2 className="mr-1 h-3 w-3" />{b}
                </span>
              ))}
              <span className="ml-auto text-xs font-semibold text-[#22C55E]">4/4 complete</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Feature cards */}
        <div className="space-y-4">
          {features.map((f, i) => (
            <Anim key={f.title} className="rounded-2xl border border-[#E5E7EB] bg-white p-6" delay={0.2 + i * 0.12} x={16} y={0}>
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#176FEB]/10"><f.icon className="h-5 w-5 text-[#176FEB]" /></div>
                <div><h4 className="font-heading text-base font-semibold text-[#0A1628]">{f.title}</h4><p className="mt-1 text-sm text-[#555860]">{f.desc}</p></div>
              </div>
            </Anim>
          ))}
        </div>
      </div>
    </SW>
  )
}

/* ── Section 3: Smart Triage Engine ───────────────────────────────── */

function SmartTriageEngine() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const requests = [
    { text: 'Water leak under kitchen sink', category: 'Plumbing', priority: 'High', color: '#EF4444', confidence: 95 },
    { text: 'Hallway light out floor 3', category: 'Electrical', priority: 'Low', color: '#22C55E', confidence: 92 },
    { text: 'AC not cooling unit 5D', category: 'HVAC', priority: 'High', color: '#EF4444', confidence: 97 },
    { text: 'Squeaky door hinge', category: 'General', priority: 'Low', color: '#22C55E', confidence: 88 },
    { text: 'Smoke detector beeping', category: 'Safety', priority: 'Critical', color: '#DC2626', confidence: 99 },
  ]

  const categoryIcons: Record<string, typeof Wrench> = {
    Plumbing: Wrench,
    Electrical: Lightbulb,
    HVAC: Thermometer,
    General: Settings,
    Safety: Flame,
  }

  return (
    <SW id="smart-triage">
      <SH eyebrow="Triage" title="Auto-classify every" highlight="request" description="AI reads the description, assigns category, priority, and confidence in milliseconds." />
      <div ref={ref} className="mt-12 mx-auto max-w-3xl">
        <motion.div
          className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden"
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease }}
        >
          <div className="border-b border-[#E5E7EB] px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-[#176FEB]" />
              <span className="font-heading text-sm font-semibold text-[#0A1628]">Incoming Requests</span>
            </div>
            <span className="text-xs text-[#555860]">{requests.length} pending</span>
          </div>
          <div className="divide-y divide-[#E5E7EB]">
            {requests.map((r, i) => {
              const Icon = categoryIcons[r.category] || Wrench
              return (
                <motion.div
                  key={r.text}
                  className="flex items-center gap-4 px-6 py-4"
                  initial={{ opacity: 0, x: -12 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.35, ease, delay: 0.15 + i * 0.1 }}
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F5F6F8]">
                    <Icon className="h-4 w-4 text-[#555860]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#0A1628] truncate">{r.text}</p>
                    <p className="text-xs text-[#555860] mt-0.5">{r.category}</p>
                  </div>
                  <motion.span
                    className="shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold text-white"
                    style={{ backgroundColor: r.color }}
                    initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}} transition={{ duration: 0.3, ease, delay: 0.4 + i * 0.1 }}
                  >
                    {r.priority}
                  </motion.span>
                  <motion.span
                    className="shrink-0 text-xs font-medium text-[#555860] tabular-nums"
                    initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.3, delay: 0.6 + i * 0.1 }}
                  >
                    {r.confidence}%
                  </motion.span>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </SW>
  )
}

/* ── Section 4: Vendor Matching ───────────────────────────────────── */

function VendorMatching() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const vendors = [
    { name: 'Pro Appliance Co.', rating: 4.9, distance: '2.1km', available: 'Available today', score: 96 },
    { name: 'City Appliance Repair', rating: 4.7, distance: '4.8km', available: 'Available tomorrow', score: 82 },
    { name: 'QuickFix Services', rating: 4.5, distance: '7.2km', available: 'Available today', score: 74 },
  ]

  const factors = ['Rating', 'Proximity', 'Availability', 'Past Performance', 'Price']

  return (
    <SW id="vendor-matching" dark>
      <SH eyebrow="Vendor Intelligence" title="AI-ranked" highlight="vendor matching" description="Every work order gets matched to the best vendor based on five weighted factors." />
      <div ref={ref} className="mt-12 grid gap-8 lg:grid-cols-2">
        {/* Work order card */}
        <motion.div
          className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden"
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease }}
        >
          <div className="border-b border-[#E5E7EB] px-6 py-4">
            <div className="flex items-center gap-2">
              <Wrench className="h-4 w-4 text-[#F59E0B]" />
              <span className="font-heading text-sm font-semibold text-[#0A1628]">WO-2847</span>
              <span className="ml-auto rounded-full bg-[#F59E0B]/10 px-2.5 py-0.5 text-xs font-medium text-[#F59E0B]">Open</span>
            </div>
            <p className="mt-2 text-sm text-[#555860]">Dishwasher not draining, Unit 3A</p>
          </div>
          <div className="p-6">
            <p className="text-xs font-heading font-semibold uppercase tracking-wider text-[#176FEB] mb-3">AI Matched Vendors</p>
            <div className="space-y-3">
              {vendors.map((v, i) => (
                <motion.div
                  key={v.name}
                  className={`rounded-xl border p-4 ${i === 0 ? 'border-[#176FEB]/30 bg-[#E8F2FE]/30' : 'border-[#E5E7EB]'}`}
                  initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, ease, delay: 0.2 + i * 0.12 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-[#0A1628]">{i === 0 && <span className="mr-1.5 text-[#176FEB]">#1</span>}{v.name}</p>
                      <div className="mt-1 flex items-center gap-3 text-xs text-[#555860]">
                        <span className="flex items-center gap-1"><Star className="h-3 w-3 text-[#F59E0B]" />{v.rating}</span>
                        <span>{v.distance}</span>
                        <span className="text-[#22C55E]">{v.available}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-lg font-bold ${i === 0 ? 'text-[#176FEB]' : 'text-[#555860]'}`}>{v.score}</span>
                      <p className="text-[10px] text-[#555860]">Match Score</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          {/* Factors */}
          <div className="border-t border-[#E5E7EB] px-6 py-4">
            <div className="flex flex-wrap gap-2">
              {factors.map((f) => (
                <span key={f} className="rounded-full bg-[#F5F6F8] px-3 py-1 text-xs text-[#555860]">{f}</span>
              ))}
            </div>
          </div>
          {/* Auto-dispatch toggle */}
          <div className="border-t border-[#E5E7EB] px-6 py-4 flex items-center justify-between">
            <span className="text-sm font-medium text-[#0A1628]">Auto-dispatch to top match</span>
            <div className="flex h-6 w-11 items-center rounded-full bg-[#176FEB] px-0.5">
              <motion.div
                className="h-5 w-5 rounded-full bg-white shadow-sm"
                initial={{ x: 0 }} animate={inView ? { x: 20 } : {}} transition={{ duration: 0.4, ease, delay: 0.8 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Feature cards */}
        <div className="space-y-4">
          {[
            { icon: Target, title: 'Multi-factor scoring', desc: 'Vendors are ranked on rating, proximity, availability, past performance, and pricing — weighted to your preferences.' },
            { icon: TrendingUp, title: 'Learning system', desc: 'AI improves matches over time based on completion rates, tenant satisfaction, and cost efficiency.' },
            { icon: Zap, title: 'Instant dispatch', desc: 'Top-ranked vendor is auto-dispatched with work order details, scheduling, and tenant access instructions.' },
          ].map((f, i) => (
            <Anim key={f.title} className="rounded-2xl border border-[#E5E7EB] bg-white p-6" delay={0.2 + i * 0.12} x={16} y={0}>
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#176FEB]/10"><f.icon className="h-5 w-5 text-[#176FEB]" /></div>
                <div><h4 className="font-heading text-base font-semibold text-[#0A1628]">{f.title}</h4><p className="mt-1 text-sm text-[#555860]">{f.desc}</p></div>
              </div>
            </Anim>
          ))}
        </div>
      </div>
    </SW>
  )
}

/* ── Section 5: Automated Follow-Ups ─────────────────────────────── */

function AutomatedFollowUps() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const timeline = [
    { day: 'Day 0', event: 'Lease renewal sent', status: 'auto-generated', color: '#176FEB' },
    { day: 'Day 3', event: 'Reminder: Lease expires in 27 days', status: 'auto-sent', color: '#176FEB' },
    { day: 'Day 7', event: 'Second reminder sent', status: 'auto-sent', color: '#F59E0B' },
    { day: 'Day 10', event: 'Tenant signed renewal', status: 'completed', color: '#22C55E' },
  ]

  const stats = [
    { label: 'Auto-messages sent', value: '340', sub: 'this month' },
    { label: 'Open rate', value: '94%', sub: 'industry avg: 68%' },
    { label: 'Hours saved', value: '12', sub: 'per month' },
  ]

  return (
    <SW id="follow-ups">
      <SH eyebrow="Follow-Ups" title="Automated tenant" highlight="communications" description="Lease renewals, payment reminders, and check-ins — triggered automatically, tracked centrally." />
      <div ref={ref} className="mt-12 grid gap-8 lg:grid-cols-2">
        {/* Timeline mockup */}
        <motion.div
          className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden"
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease }}
        >
          <div className="border-b border-[#E5E7EB] px-6 py-4 flex items-center gap-2">
            <Send className="h-4 w-4 text-[#176FEB]" />
            <span className="font-heading text-sm font-semibold text-[#0A1628]">Follow-Up Timeline</span>
          </div>
          <div className="p-6">
            <div className="relative pl-6">
              {/* Vertical line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[#E5E7EB]" />
              <div className="space-y-5">
                {timeline.map((t, i) => (
                  <motion.div
                    key={t.day}
                    className="relative flex items-start gap-4"
                    initial={{ opacity: 0, x: -10 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.35, ease, delay: 0.2 + i * 0.15 }}
                  >
                    <div className="absolute -left-6 top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-white" style={{ backgroundColor: t.color }} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-[#0A1628]">{t.day}</span>
                        <span className="rounded-full px-2 py-0.5 text-[10px] font-medium text-white" style={{ backgroundColor: t.color }}>{t.status}</span>
                      </div>
                      <p className="mt-1 text-sm text-[#555860]">{t.event}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          {/* Trigger rule */}
          <div className="border-t border-[#E5E7EB] px-6 py-4">
            <div className="rounded-xl bg-[#F5F6F8] p-4">
              <div className="flex items-center gap-2 text-xs text-[#555860]">
                <Settings className="h-3.5 w-3.5 text-[#176FEB]" />
                <span className="font-medium text-[#0A1628]">Trigger Rule:</span>
              </div>
              <p className="mt-1.5 text-sm text-[#555860]">When lease expires in <span className="font-semibold text-[#0A1628]">30 days</span> → Send renewal notice</p>
            </div>
          </div>
        </motion.div>

        {/* Stats + feature cards */}
        <div className="space-y-4">
          {/* Stats row */}
          <Anim className="grid grid-cols-3 gap-3" delay={0.15}>
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-[#E5E7EB] bg-white p-4 text-center">
                <p className="text-2xl font-bold text-[#176FEB]">{s.value}</p>
                <p className="mt-1 text-xs font-medium text-[#0A1628]">{s.label}</p>
                <p className="text-[10px] text-[#555860]">{s.sub}</p>
              </div>
            ))}
          </Anim>
          {[
            { icon: Clock, title: 'Configurable timing', desc: 'Set reminder intervals per workflow — 3 days, 7 days, 14 days. Customize cadence for lease renewals, payments, and inspections.' },
            { icon: MessageSquare, title: 'Multi-channel delivery', desc: 'Messages go via SMS, email, and in-app push simultaneously. Tenants engage on their preferred channel.' },
            { icon: Eye, title: 'Full visibility', desc: 'Track every message sent, opened, and acted on. No communication falls through the cracks.' },
          ].map((f, i) => (
            <Anim key={f.title} className="rounded-2xl border border-[#E5E7EB] bg-white p-6" delay={0.3 + i * 0.12} x={16} y={0}>
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#176FEB]/10"><f.icon className="h-5 w-5 text-[#176FEB]" /></div>
                <div><h4 className="font-heading text-base font-semibold text-[#0A1628]">{f.title}</h4><p className="mt-1 text-sm text-[#555860]">{f.desc}</p></div>
              </div>
            </Anim>
          ))}
        </div>
      </div>
    </SW>
  )
}

/* ── Section 6: Workflow Automation Builder ────────────────────────── */

function WorkflowBuilder() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const rules = [
    { trigger: 'When rent is 3 days late', action: 'Send payment reminder via SMS + email', runs: 847, active: true },
    { trigger: 'When maintenance request filed', action: 'Classify, match vendor, notify tenant', runs: 1243, active: true },
    { trigger: 'When lease signed', action: 'Activate portal, schedule move-in inspection, send welcome pack', runs: 312, active: true },
    { trigger: 'When work order completed', action: 'Send satisfaction survey, close ticket, update ledger', runs: 589, active: false },
  ]

  return (
    <SW id="workflow-builder" dark>
      <SH eyebrow="Automation" title="Visual" highlight="rule builder" description="When [trigger] then [action]. Build custom workflows without code." />
      <div ref={ref} className="mt-12 mx-auto max-w-3xl">
        <motion.div
          className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden"
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease }}
        >
          <div className="border-b border-[#E5E7EB] px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-[#176FEB]" />
              <span className="font-heading text-sm font-semibold text-[#0A1628]">Automation Rules</span>
            </div>
            <span className="text-xs text-[#555860]">{rules.filter(r => r.active).length} active</span>
          </div>
          <div className="divide-y divide-[#E5E7EB]">
            {rules.map((r, i) => (
              <motion.div
                key={r.trigger}
                className="px-6 py-5"
                initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.35, ease, delay: 0.15 + i * 0.1 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-1.5">
                      <span className="rounded bg-[#E8F2FE] px-2 py-0.5 text-xs font-medium text-[#176FEB]">{r.trigger}</span>
                      <span className="text-xs text-[#555860]">→</span>
                      <span className="text-sm text-[#0A1628]">{r.action}</span>
                    </div>
                    <p className="mt-2 text-xs text-[#555860]">{r.runs.toLocaleString()} runs</p>
                  </div>
                  <div className={`flex h-6 w-11 shrink-0 items-center rounded-full px-0.5 ${r.active ? 'bg-[#176FEB]' : 'bg-[#E5E7EB]'}`}>
                    <motion.div
                      className="h-5 w-5 rounded-full bg-white shadow-sm"
                      initial={{ x: 0 }} animate={inView ? { x: r.active ? 20 : 0 } : {}} transition={{ duration: 0.4, ease, delay: 0.5 + i * 0.1 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="border-t border-[#E5E7EB] px-6 py-4">
            <motion.button
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#176FEB]/30 py-3 text-sm font-medium text-[#176FEB] transition-colors hover:bg-[#E8F2FE]/50"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.4, delay: 0.8 }}
            >
              <Zap className="h-4 w-4" /> Add New Rule
            </motion.button>
          </div>
        </motion.div>
      </div>
    </SW>
  )
}

/* ── Section 7: Predictive Insights ───────────────────────────────── */

function PredictiveInsights() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const predictions = [
    { text: '3 leases expiring next month — 2 likely to renew (87% confidence)', confidence: 87, action: 'Send early renewal offers', icon: Users },
    { text: 'Maintenance spike predicted for HVAC in July — schedule preventive service', confidence: 73, action: 'Schedule HVAC service', icon: Thermometer },
    { text: 'Unit 4B rent collection risk elevated — payment history shows pattern', confidence: 91, action: 'Set up auto-reminders', icon: AlertTriangle },
  ]

  return (
    <SW id="predictive-insights">
      <SH eyebrow="Predictions" title="Know what happens" highlight="before it happens" description="AI analyzes patterns across your portfolio to surface risks and opportunities proactively." />
      <div ref={ref} className="mt-12 grid gap-8 lg:grid-cols-5">
        {/* Predictions list */}
        <div className="lg:col-span-3 space-y-4">
          {predictions.map((p, i) => (
            <motion.div
              key={p.text}
              className="rounded-2xl border border-[#E5E7EB] bg-white p-6"
              initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, ease, delay: 0.15 + i * 0.12 }}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F59E0B]/10">
                  <p.icon className="h-5 w-5 text-[#F59E0B]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#0A1628]">{p.text}</p>
                  {/* Confidence bar */}
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex-1 h-2 rounded-full bg-[#F5F6F8] overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-[#176FEB]"
                        initial={{ width: 0 }} animate={inView ? { width: `${p.confidence}%` } : {}} transition={{ duration: 0.8, ease, delay: 0.4 + i * 0.12 }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-[#176FEB] tabular-nums">{p.confidence}%</span>
                  </div>
                  <button className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-[#E8F2FE] px-3 py-1.5 text-xs font-medium text-[#176FEB] transition-colors hover:bg-[#176FEB]/20">
                    {p.action} <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Portfolio health score */}
        <div className="lg:col-span-2">
          <Anim className="rounded-2xl border border-[#E5E7EB] bg-white p-6 text-center" delay={0.3}>
            <p className="text-xs font-heading font-semibold uppercase tracking-wider text-[#176FEB]">Portfolio Health</p>
            <div className="relative mx-auto mt-6 h-40 w-40">
              <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                <circle cx="60" cy="60" r="52" fill="none" stroke="#F5F6F8" strokeWidth="8" />
                <motion.circle
                  cx="60" cy="60" r="52" fill="none" stroke="#176FEB" strokeWidth="8" strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 52}
                  initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
                  animate={inView ? { strokeDashoffset: 2 * Math.PI * 52 * (1 - 0.94) } : {}}
                  transition={{ duration: 1.2, ease, delay: 0.4 }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                  className="text-3xl font-bold text-[#0A1628]"
                  initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.4, delay: 0.8 }}
                >94</motion.span>
                <span className="text-xs text-[#555860]">out of 100</span>
              </div>
            </div>
            <p className="mt-4 text-sm text-[#555860]">Your portfolio is performing in the <span className="font-semibold text-[#22C55E]">top 6%</span> of Revun operators.</p>
            <div className="mt-4 rounded-xl bg-[#F5F6F8] px-4 py-3">
              <div className="flex items-center gap-2 text-xs">
                <Lightbulb className="h-3.5 w-3.5 text-[#F59E0B]" />
                <span className="text-[#0A1628] font-medium">AI identified 4 optimization opportunities</span>
                <ArrowRight className="ml-auto h-3 w-3 text-[#555860]" />
              </div>
            </div>
          </Anim>
        </div>
      </div>
    </SW>
  )
}

/* ── Section 8: AI-Powered Tenant Screening ───────────────────────── */

function AIScreening() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const checks = [
    { label: 'Identity', status: 'pass' },
    { label: 'Employment', status: 'pass' },
    { label: 'Credit (493)', status: 'warn' },
    { label: 'References', status: 'pass' },
    { label: 'Landlord History', status: 'pass' },
  ]

  return (
    <SW id="ai-screening" dark>
      <SH eyebrow="Screening" title="AI-powered tenant" highlight="risk assessment" description="From application to decision in 12 minutes, not 2 hours. AI verifies, scores, and recommends." />
      <div ref={ref} className="mt-12 mx-auto max-w-3xl">
        <motion.div
          className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden"
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease }}
        >
          {/* Applicant header */}
          <div className="border-b border-[#E5E7EB] px-6 py-5 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F2FE] text-lg font-bold text-[#176FEB]">SM</div>
            <div>
              <p className="font-heading text-base font-semibold text-[#0A1628]">Sarah Mitchell</p>
              <p className="text-xs text-[#555860]">Applying for Unit 814</p>
            </div>
            <div className="ml-auto text-right">
              <motion.div
                className="inline-flex items-center gap-1.5 rounded-full bg-[#22C55E]/10 px-3 py-1"
                initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}} transition={{ duration: 0.4, ease, delay: 0.3 }}
              >
                <Shield className="h-3.5 w-3.5 text-[#22C55E]" />
                <span className="text-xs font-semibold text-[#22C55E]">Low Risk</span>
              </motion.div>
            </div>
          </div>

          <div className="p-6 grid gap-6 md:grid-cols-2">
            {/* Risk score ring */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative h-32 w-32">
                <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#F5F6F8" strokeWidth="8" />
                  <motion.circle
                    cx="60" cy="60" r="50" fill="none" stroke="#22C55E" strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 50}
                    initial={{ strokeDashoffset: 2 * Math.PI * 50 }}
                    animate={inView ? { strokeDashoffset: 2 * Math.PI * 50 * (1 - 0.92) } : {}}
                    transition={{ duration: 1, ease, delay: 0.4 }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span
                    className="text-2xl font-bold text-[#0A1628]"
                    initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.8 }}
                  >92</motion.span>
                  <span className="text-[10px] text-[#555860]">Risk Score</span>
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-3">
              <p className="text-xs font-heading font-semibold uppercase tracking-wider text-[#176FEB]">Auto-Verified</p>
              {checks.map((c, i) => (
                <motion.div
                  key={c.label}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: 8 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.3, ease, delay: 0.3 + i * 0.08 }}
                >
                  {c.status === 'pass'
                    ? <CheckCircle2 className="h-4 w-4 text-[#22C55E]" />
                    : <AlertTriangle className="h-4 w-4 text-[#F59E0B]" />
                  }
                  <span className="text-sm text-[#0A1628]">{c.label}</span>
                  <span className={`ml-auto text-xs font-medium ${c.status === 'pass' ? 'text-[#22C55E]' : 'text-[#F59E0B]'}`}>
                    {c.status === 'pass' ? 'Verified' : 'Review'}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* AI recommendation */}
          <div className="border-t border-[#E5E7EB] px-6 py-4">
            <motion.div
              className="rounded-xl bg-[#E8F2FE] p-4 flex items-start gap-3"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.4, delay: 0.7 }}
            >
              <Brain className="h-5 w-5 shrink-0 text-[#176FEB] mt-0.5" />
              <div>
                <p className="text-sm font-medium text-[#0A1628]">AI Recommendation</p>
                <p className="mt-1 text-sm text-[#555860]">Approve with conditions — suggest rental guarantee protection due to credit score.</p>
              </div>
            </motion.div>
          </div>

          {/* Time comparison */}
          <div className="border-t border-[#E5E7EB] px-6 py-4 flex items-center justify-center gap-6">
            <div className="text-center">
              <p className="text-lg font-bold text-[#176FEB]">12 min</p>
              <p className="text-[10px] text-[#555860]">with AI</p>
            </div>
            <span className="text-xs text-[#555860]">vs</span>
            <div className="text-center">
              <p className="text-lg font-bold text-[#555860] line-through">2 hours</p>
              <p className="text-[10px] text-[#555860]">manual process</p>
            </div>
          </div>
        </motion.div>
      </div>
    </SW>
  )
}

/* ── Section 9: Operations Analytics ──────────────────────────────── */

function OperationsAnalytics() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const insights = [
    { text: 'Your maintenance resolution time improved 23% this month', metric: '23%', label: 'Faster resolution', barWidth: 77 },
    { text: 'Rent collection rate: 97.8% — up from 94.2% last quarter', metric: '97.8%', label: 'Collection rate', barWidth: 98 },
    { text: 'Top performing property: 220 King St (98.4% occupancy)', metric: '98.4%', label: 'Occupancy', barWidth: 98 },
  ]

  return (
    <SW id="operations-analytics">
      <SH eyebrow="Analytics" title="AI-generated" highlight="operational insights" description="Revun analyzes every data point across your portfolio and surfaces what matters most." />
      <div ref={ref} className="mt-12 mx-auto max-w-3xl space-y-4">
        {insights.map((ins, i) => (
          <motion.div
            key={ins.text}
            className="rounded-2xl border border-[#E5E7EB] bg-white p-6"
            initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, ease, delay: 0.1 + i * 0.12 }}
          >
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#176FEB]/10">
                <BarChart3 className="h-5 w-5 text-[#176FEB]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#0A1628]">{ins.text}</p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex-1 h-2 rounded-full bg-[#F5F6F8] overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-[#176FEB]"
                      initial={{ width: 0 }} animate={inView ? { width: `${ins.barWidth}%` } : {}} transition={{ duration: 0.8, ease, delay: 0.3 + i * 0.12 }}
                    />
                  </div>
                  <span className="text-sm font-bold text-[#176FEB] tabular-nums">{ins.metric}</span>
                </div>
                <p className="mt-1 text-xs text-[#555860]">{ins.label}</p>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Optimization opportunities */}
        <motion.div
          className="rounded-2xl border border-[#176FEB]/20 bg-[#E8F2FE]/30 p-5 flex items-center gap-4"
          initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, ease, delay: 0.6 }}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#176FEB]/10">
            <Lightbulb className="h-5 w-5 text-[#176FEB]" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-[#0A1628]">AI identified 4 optimization opportunities</p>
            <p className="mt-0.5 text-xs text-[#555860]">Based on your portfolio data from the last 30 days</p>
          </div>
          <ArrowRight className="h-5 w-5 shrink-0 text-[#176FEB]" />
        </motion.div>
      </div>
    </SW>
  )
}

/* ── Section 10: CTA ──────────────────────────────────────────────── */

function CTASection() {
  return (
    <section id="cta" className="bg-[#F5F6F8] py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <RevealOnScroll stagger={0.12}>
          <motion.h2 variants={revealItem} className="font-display text-3xl font-normal text-[#0A1628] md:text-4xl">
            Turn reactive operations into{' '}
            <span className="text-[#176FEB]">predictable execution</span>
          </motion.h2>
          <motion.p variants={revealItem} className="mx-auto mt-4 max-w-lg text-base text-[#555860]">
            Let AI handle classification, routing, scheduling, and follow-ups — so you can focus on growth, not firefighting.
          </motion.p>
          <motion.div variants={revealItem} className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/pricing/" className="inline-flex h-12 items-center justify-center rounded-xl bg-[#176FEB] px-7 text-sm font-semibold text-white transition-colors hover:bg-[#0B5AD4]">
              Start Free Trial
            </Link>
            <Link href="/contact/" className="inline-flex h-12 items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-7 text-sm font-semibold text-[#2C2E33] transition-colors hover:border-[#176FEB]/30">
              Contact Sales <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

/* ── Main Export ───────────────────────────────────────────────────── */

export function AIAutomationClient() {
  return (
    <>
      <Hero />
      <AICommandCenter />
      <SmartTriageEngine />
      <VendorMatching />
      <AutomatedFollowUps />
      <WorkflowBuilder />
      <PredictiveInsights />
      <AIScreening />
      <OperationsAnalytics />
      <CTASection />
    </>
  )
}
