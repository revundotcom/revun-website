'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import {
  Sparkles, Bot, Zap, Brain, Target, TrendingUp, Shield, Users,
  CheckCircle2, AlertTriangle, Clock, ArrowRight, Settings, BarChart3,
  Wrench, Flame, Thermometer, Lightbulb, MessageSquare, Star,
  Send, Bell, Eye, Building2, MapPin, Quote, ChevronDown,
} from 'lucide-react'
import { sanitizeJsonLd } from '@/lib/utils'

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

  const pipeline = [
    { icon: Target, label: 'Classified', meta: 'Appliance · Medium', color: '#F59E0B' },
    { icon: Users, label: 'Matched vendor', meta: 'Pro Appliance Co.', color: '#22C55E' },
    { icon: Clock, label: 'Scheduled', meta: 'Tomorrow · 10 AM', color: '#176FEB' },
    { icon: Bell, label: 'Tenant notified', meta: 'SMS + in-app', color: '#176FEB' },
  ]

  return (
    <section id="hero" className="relative overflow-hidden bg-white pb-16 pt-28 md:pb-20 md:pt-32">
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(23,111,235,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(23,111,235,0.035)_1px,transparent_1px)] bg-[size:40px_40px]" aria-hidden="true" />
      <div className="absolute top-0 right-[-200px] h-[500px] w-[500px] rounded-full bg-[#176FEB]/[0.08] blur-[120px]" aria-hidden="true" />
      <div className="absolute bottom-[-100px] left-[-150px] h-[400px] w-[400px] rounded-full bg-[#60A5FA]/[0.06] blur-[100px]" aria-hidden="true" />

      <div ref={ref} className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left: copy */}
          <div>
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-[#176FEB]/20 bg-[#E8F2FE] px-4 py-1.5"
              initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease }}
            >
              <Sparkles className="h-4 w-4 text-[#176FEB]" />
              <span className="text-sm font-heading font-semibold text-[#176FEB]">AI-Powered Operations</span>
            </motion.div>

            <motion.h1
              className="mt-6 font-display text-5xl font-normal leading-[1.05] tracking-tight text-[#0A1628] md:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.1 }}
            >
              AI that runs your operations,{' '}
              <span className="text-[#176FEB]">not just answers questions.</span>
            </motion.h1>

            <motion.p
              className="mt-6 max-w-xl text-lg leading-relaxed text-[#555860] md:text-xl"
              initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.2 }}
            >
              Workflow intelligence that classifies, routes, schedules, and notifies automatically — turning reactive work into predictable execution.
            </motion.p>

            <motion.div
              className="mt-9 flex flex-col items-start gap-3 sm:flex-row"
              initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.3 }}
            >
              <Link href="/pricing/" className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-[#176FEB] px-8 text-base font-semibold text-white shadow-[0_8px_24px_-8px_rgba(23,111,235,0.5)] transition-all hover:bg-[#0B5AD4] hover:shadow-[0_12px_28px_-8px_rgba(23,111,235,0.6)]">
                Start Free Trial <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/demo/" className="inline-flex h-14 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-8 text-base font-semibold text-[#0A1628] transition-all hover:border-[#176FEB]/30 hover:text-[#176FEB] hover:shadow-sm">
                Book a Demo
              </Link>
            </motion.div>

            {/* Trust row */}
            <motion.div
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[#E5E7EB] pt-6"
              initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.4 }}
            >
              {[
                { icon: Brain, label: 'Natural language understanding' },
                { icon: Shield, label: 'Audit-logged decisions' },
                { icon: Zap, label: 'Sub-second orchestration' },
              ].map((t) => (
                <div key={t.label} className="flex items-center gap-2 text-xs text-[#555860]">
                  <t.icon className="h-4 w-4 text-[#176FEB]" />
                  <span>{t.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: animated orchestration preview */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-[#176FEB]/15 to-transparent blur-2xl" aria-hidden="true" />

            <motion.div
              className="relative overflow-hidden rounded-3xl border border-[#E5E7EB] bg-white p-6 shadow-[0_24px_60px_-20px_rgba(10,22,40,0.2)]"
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.7, ease, delay: 0.25 }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#176FEB]/10">
                  <Bot className="h-5 w-5 text-[#176FEB]" />
                </div>
                <div className="flex-1">
                  <p className="font-heading text-sm font-semibold text-[#0A1628]">Revun AI Assistant</p>
                  <p className="text-[11px] text-[#555860]">Orchestrating request · Unit 7C</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#22C55E]/10 px-2.5 py-1 text-[10px] font-semibold text-[#22C55E]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E] animate-pulse" /> Live
                </span>
              </div>

              {/* User message */}
              <motion.div
                className="ml-auto mt-5 max-w-[85%] rounded-2xl rounded-br-md bg-[#176FEB] px-4 py-2.5 text-sm text-white shadow-sm"
                initial={{ opacity: 0, x: 16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, ease, delay: 0.5 }}
              >
                Broken dishwasher in Unit 7C. Handle it.
              </motion.div>

              {/* AI steps */}
              <div className="mt-4 space-y-2">
                <motion.p
                  className="text-xs font-semibold text-[#0A1628]"
                  initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.7 }}
                >
                  On it. Here&apos;s what I did:
                </motion.p>
                {pipeline.map((s, i) => (
                  <motion.div
                    key={s.label}
                    className="flex items-center gap-3 rounded-xl border border-[#E5E7EB] bg-[#F5F6F8] px-3 py-2.5"
                    initial={{ opacity: 0, y: 8 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.35, ease, delay: 0.85 + i * 0.18 }}
                  >
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${s.color}15` }}
                    >
                      <s.icon className="h-4 w-4" style={{ color: s.color }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-heading text-xs font-semibold text-[#0A1628]">{s.label}</p>
                      <p className="text-[11px] text-[#555860]">{s.meta}</p>
                    </div>
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#22C55E]" />
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-4 flex items-center justify-between border-t border-[#E5E7EB] pt-3"
                initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1.7 }}
              >
                <span className="text-[11px] text-[#555860]">Completed in 1.4s</span>
                <span className="text-[11px] font-semibold text-[#22C55E]">4 / 4 steps</span>
              </motion.div>
            </motion.div>

            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-5 -left-5 flex items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 shadow-xl md:-left-8"
              initial={{ opacity: 0, y: 16, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, ease, delay: 1.5 }}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#176FEB]/10">
                <Zap className="h-4 w-4 text-[#176FEB]" />
              </div>
              <div>
                <p className="font-heading text-xs font-semibold text-[#0A1628]">1,243 actions</p>
                <p className="text-[11px] text-[#555860]">auto-orchestrated today</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Stats bar ────────────────────────────────────────────────────── */

function StatsBar() {
  const stats = [
    { value: '23%', label: 'Faster resolution' },
    { value: '12 hrs', label: 'Saved per manager / week' },
    { value: '94%', label: 'Message open rate' },
    { value: '97.8%', label: 'On-time collection' },
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
              {badges.map((b) => (
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
      <div ref={ref} className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        {/* Triage card */}
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

        {/* Image + feature bullets */}
        <div className="space-y-6">
          <motion.div
            className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#E5E7EB]"
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.15 }}
          >
            <Image
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85"
              alt="Property manager reviewing an AI-triaged maintenance queue on a laptop"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/50 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-[#176FEB] backdrop-blur">
                <Brain className="h-3 w-3" /> Trained on 2.4M tickets
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-[#22C55E] backdrop-blur">
                <CheckCircle2 className="h-3 w-3" /> 94% accuracy
              </span>
            </div>
          </motion.div>

          <div className="space-y-3">
            {[
              { icon: Brain, title: 'Reads intent, not keywords', desc: 'Understands slang, typos, and half-sentences — no structured form required.' },
              { icon: Target, title: 'Confidence + category in ms', desc: 'Every ticket gets a category, priority, and a confidence score so you know when to step in.' },
              { icon: Shield, title: 'Escalates what matters', desc: 'Safety and critical tickets surface instantly with the right on-call vendor paged.' },
            ].map((f, i) => (
              <Anim key={f.title} className="rounded-xl border border-[#E5E7EB] bg-white p-4" delay={0.3 + i * 0.08} x={12} y={0}>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#176FEB]/10">
                    <f.icon className="h-5 w-5 text-[#176FEB]" />
                  </div>
                  <div>
                    <h4 className="font-heading text-sm font-semibold text-[#0A1628]">{f.title}</h4>
                    <p className="mt-1 text-xs leading-relaxed text-[#555860]">{f.desc}</p>
                  </div>
                </div>
              </Anim>
            ))}
          </div>
        </div>
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

/* ── Testimonials ─────────────────────────────────────────────────── */

const testimonials = [
  {
    quote: 'Maintenance triage used to eat my Monday mornings. Revun AI classifies and dispatches before I open my laptop — our resolution time dropped 31% in the first quarter.',
    name: 'Jasmine Walsh',
    title: 'Operations Director · Harbourview Rentals',
    location: 'Halifax, NS',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=90',
  },
  {
    quote: 'The workflow builder replaced three Zapier zaps and a Google Sheet. Late-payment reminders, lease renewals, move-out surveys — all automatic, all audited.',
    name: 'Olivier Fortin',
    title: 'Founder · Campus Living Québec',
    location: 'Montréal, QC',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=90',
  },
  {
    quote: 'Predictive insights told us two leases were flight-risks weeks before renewal. We intervened, kept both tenants, saved ~$14k in turnover costs.',
    name: 'Amanda Kaur',
    title: 'Portfolio Manager · Pacific Coast Group',
    location: 'Vancouver, BC',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=90',
  },
]

function Testimonials() {
  return (
    <SW id="testimonials" dark>
      <SH eyebrow="Proof" title="Operators run" highlight="leaner with AI." description="Real numbers from PMs across Canada and the US in the first 90 days on Revun." />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
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
    </SW>
  )
}

/* ── FAQ ──────────────────────────────────────────────────────────── */

const AI_AUTOMATION_FAQS = [
  { q: 'What AI models power Revun automation?', a: 'Revun uses a combination of in-house fine-tuned transformer models for classification and intent, plus best-in-class LLMs for natural-language understanding. Every decision is logged with its model version, confidence, and reasoning.' },
  { q: 'Can I see why the AI made a decision?', a: 'Yes. Every AI action — classification, vendor match, auto-dispatch, reminder — is logged with its inputs, confidence score, and reasoning. You can audit any decision in seconds, and override it one-click.' },
  { q: 'Does the AI ever act without my approval?', a: 'You control the autonomy. Each workflow can run fully automatic, suggest-and-approve, or notify-only. Most operators start in suggest-and-approve and move to full autonomy as trust builds.' },
  { q: 'How accurate is the triage classification?', a: 'Production accuracy sits at 94% on our standard category set (Plumbing, Electrical, HVAC, Appliance, Safety, General). Ambiguous tickets are flagged for human review rather than misclassified.' },
  { q: 'Is my data used to train Revun models?', a: 'No. Customer data is never used to train global models. Per-account fine-tuning is opt-in and isolated to your account only.' },
  { q: 'How does vendor matching score work?', a: 'Each vendor gets a 0-100 match score based on five weighted factors: rating, proximity, availability, past performance on similar tickets, and price. You can tune the weights per property.' },
  { q: 'Can I build custom automations without code?', a: 'Yes. The visual Workflow Builder uses a When [trigger] → Then [action] pattern. Triggers include ticket events, calendar dates, tenant actions, payment events, and more — with any action chained after.' },
  { q: 'Does this work alongside my existing tools?', a: 'Revun connects to Slack, Microsoft Teams, QuickBooks, Xero, Sage, and any webhook/REST endpoint. Actions can be triggered from or pushed out to your existing stack.' },
] as const

function FAQ() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: AI_AUTOMATION_FAQS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
  return (
    <SW id="faq">
      <SH eyebrow="FAQ" title="Questions about" highlight="AI & automation." description="Straight answers on control, accuracy, and how it fits your stack." />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(faqJsonLd) }} />
      <RevealOnScroll className="mx-auto mt-12 max-w-3xl">
        {AI_AUTOMATION_FAQS.map((item, idx) => (
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

/* ── Section 10: CTA ──────────────────────────────────────────────── */

function CTASection() {
  return (
    <section id="cta" className="relative overflow-hidden bg-[#0A1628] px-6 py-24 text-white md:py-28">
      <div className="absolute top-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[#176FEB]/25 blur-[120px]" aria-hidden="true" />
      <RevealOnScroll className="relative mx-auto max-w-3xl text-center" stagger={0.12}>
        <motion.span variants={revealItem} className="inline-flex items-center rounded-full border border-[#176FEB]/30 bg-[#176FEB]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-[#60A5FA]">
          Ready when you are
        </motion.span>
        <motion.h2 variants={revealItem} className="mt-6 font-display text-4xl font-normal tracking-tight md:text-5xl lg:text-6xl">
          Turn reactive operations into{' '}
          <span className="text-[#60A5FA]">predictable execution.</span>
        </motion.h2>
        <motion.p variants={revealItem} className="mx-auto mt-6 max-w-xl text-lg text-white/70">
          Let AI handle classification, routing, scheduling, and follow-ups — so you can focus on growth, not firefighting.
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

/* ── Main Export ───────────────────────────────────────────────────── */

export function AIAutomationClient() {
  return (
    <>
      <Hero />
      <StatsBar />
      <AICommandCenter />
      <SmartTriageEngine />
      <VendorMatching />
      <AutomatedFollowUps />
      <WorkflowBuilder />
      <PredictiveInsights />
      <AIScreening />
      <OperationsAnalytics />
      <Testimonials />
      <FAQ />
      <CTASection />
    </>
  )
}
