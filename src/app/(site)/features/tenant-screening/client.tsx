'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import {
  ArrowRight, ShieldCheck, AlertTriangle,
  BarChart3, Fingerprint, Wallet, Gauge, Users2, Users,
  CheckCircle2, Lock, Filter, Sparkles, Shield, MapPin, FileText,
  Gavel, Check, X, Minus, ChevronDown,
  AlertCircle, Clock, Quote, Star, Building2, Home, Briefcase, Key,
} from 'lucide-react'
import { sanitizeJsonLd } from '@/lib/utils'

const ease = [0.22, 1, 0.36, 1] as const
const fadeUp = { initial: { opacity: 0, y: 12 }, transition: { duration: 0.6, ease, delay: 0.1 } }

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

/* ── Section 1: Hero ───────────────────────────────────────────────── */

function Hero() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const trust = [
    { icon: BarChart3, label: 'Equifax partner' },
    { icon: ShieldCheck, label: 'TransUnion partner' },
    { icon: Lock, label: 'PIPEDA compliant' },
    { icon: CheckCircle2, label: 'Built for CA + US' },
  ]
  const subCards = [
    { icon: BarChart3, label: 'Credit', score: '742', status: 'Verified' },
    { icon: Fingerprint, label: 'Identity', score: '100%', status: 'Verified' },
    { icon: Wallet, label: 'Income', score: '3.2x', status: 'Verified' },
  ]
  return (
    <section id="hero" className="relative overflow-hidden bg-white pb-12 pt-20 md:pb-16 md:pt-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: 'radial-gradient(#E5E7EB 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <div ref={ref} className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <motion.p {...fadeUp} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-sm font-heading font-semibold uppercase tracking-wider text-brand-blue">
              Tenant Screening
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease, delay: 0.15 }}
              className="mt-4 font-display text-5xl font-normal leading-tight md:text-6xl text-brand-graphite"
            >
              Screen tenants in minutes. <span className="text-keyword">Trust the result for years.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease, delay: 0.25 }}
              className="mt-5 max-w-xl text-lg text-brand-graphite/70"
            >
              Equifax + TransUnion credit, identity verification, income checks, and risk scoring tuned for Canada and the US. Every applicant runs through one pipeline.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease, delay: 0.35 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link href="/pricing/" className="inline-flex items-center gap-2 rounded-xl bg-brand-blue px-6 py-3 text-sm font-heading font-semibold text-white transition hover:brightness-110">
                Start Free Trial <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/demo/" className="inline-flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-6 py-3 text-sm font-heading font-semibold text-brand-graphite transition hover:border-brand-blue hover:text-brand-blue">
                Book a Demo
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease, delay: 0.45 }}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
            >
              {trust.map((t) => (
                <div key={t.label} className="flex items-center gap-2 text-xs text-brand-graphite-mid">
                  <t.icon className="h-4 w-4 text-brand-blue" />
                  <span>{t.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <div>
            <Anim delay={0.3} x={20} y={0}>
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-[0_20px_60px_-20px_rgba(10,22,40,0.15)]">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-blue/10">
                  <Users2 className="h-6 w-6 text-brand-blue" />
                </div>
                <div className="flex-1">
                  <div className="font-heading text-base font-semibold text-brand-graphite">Sarah M.</div>
                  <div className="text-xs text-brand-graphite-mid">Applicant · 75 Portland St</div>
                </div>
                <span className="rounded-full bg-brand-blue/10 px-2.5 py-1 text-[10px] font-semibold text-brand-blue">Approved</span>
              </div>
              <div className="mt-6">
                <div className="flex items-end justify-between">
                  <span className="text-xs uppercase tracking-wider text-brand-graphite-mid">Risk Score</span>
                  <span className="font-display text-3xl text-brand-graphite">842<span className="text-base text-brand-graphite-mid">/900</span></span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#F5F6F8]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: '93%' } : {}}
                    transition={{ duration: 1.2, ease, delay: 0.6 }}
                    className="h-full rounded-full bg-brand-blue"
                  />
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {subCards.map((c, i) => (
                  <motion.div
                    key={c.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, ease, delay: 0.7 + i * 0.1 }}
                    className="rounded-xl border border-[#E5E7EB] bg-white p-3"
                  >
                    <c.icon className="h-4 w-4 text-brand-blue" />
                    <div className="mt-2 text-[10px] uppercase tracking-wider text-brand-graphite-mid">{c.label}</div>
                    <div className="mt-0.5 font-heading text-sm font-semibold text-brand-graphite">{c.score}</div>
                    <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-brand-blue/10 px-2 py-0.5 text-[9px] font-semibold text-brand-blue">
                      <CheckCircle2 className="h-2.5 w-2.5" />{c.status}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            </Anim>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Section 2: Problem (Before / After) ──────────────────────────── */

function ProblemSection() {
  const oldWay = [
    'Credit pulls live in a separate vendor login',
    'ID photos reviewed by eye, over email',
    'Income proofs chase applicants through four inboxes',
    'No audit trail when LTB/RTB asks why',
  ]
  const revunWay = [
    'One dashboard: credit, ID, income, background',
    'Liveness + ID match in 90 seconds',
    'Flinks/Plaid bank-linked income proof',
    'Every decision logged for tribunal defense',
  ]
  return (
    <SW id="problem" dark>
      <Anim className="mb-12 max-w-3xl lg:mb-16">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-3 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-graphite-mid">Why screening breaks</span>
        </div>
        <h2 className="font-display text-3xl font-normal leading-[1.1] text-brand-graphite md:text-4xl lg:text-5xl">
          Most screening stacks are held together
          <br className="hidden md:block" /> with <span className="text-keyword">PDFs and promises.</span>
        </h2>
        <p className="mt-5 max-w-2xl text-base text-brand-graphite-mid md:text-lg">
          Every handoff between tools is a place decisions get lost, delayed, or disputed. Here is what the swap looks like.
        </p>
      </Anim>

      <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:flex">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E5E7EB] bg-white shadow-lg">
            <span className="font-heading text-xs font-bold tracking-wider text-brand-graphite">VS</span>
          </div>
        </div>

        <Anim x={-20} delay={0.1}>
          <div className="flex h-full flex-col">
            <div className="mb-4 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-red-100 bg-red-50 px-2.5 py-1">
                <X className="h-3.5 w-3.5 text-red-500" strokeWidth={2.5} />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-red-600">Status quo</span>
              </span>
              <h3 className="font-heading text-lg font-semibold text-brand-graphite">The old way</h3>
            </div>
            <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-2xl bg-[#E5E7EB]">
              <Image
                src="https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=900&q=80"
                alt="Messy screening workflow"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover grayscale-[30%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-white/95 px-2 py-1 backdrop-blur-sm">
                  <Clock className="h-3 w-3 text-red-500" />
                  <span className="text-[11px] font-medium text-brand-graphite">3–5 days per applicant</span>
                </span>
              </div>
            </div>
            <ul className="space-y-2.5 rounded-xl border border-red-100/60 bg-red-50/40 p-4">
              {oldWay.map((problem, i) => (
                <motion.li key={problem}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.05 }}
                  className="flex items-start gap-2.5 text-sm text-brand-graphite">
                  <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                  <span>{problem}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </Anim>

        <Anim x={20} delay={0.2}>
          <div className="flex h-full flex-col">
            <div className="mb-4 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-brand-blue/20 bg-brand-blue/10 px-2.5 py-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-brand-blue" strokeWidth={2.5} />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-blue">The Revun way</span>
              </span>
              <h3 className="font-heading text-lg font-semibold text-brand-graphite">With Revun</h3>
            </div>
            <div className="relative mb-5">
              <div aria-hidden className="pointer-events-none absolute -inset-4 rounded-full bg-brand-blue/20 opacity-60 blur-3xl" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#F5F6F8] ring-1 ring-brand-blue/10">
                <Image
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80"
                  alt="Unified screening dashboard"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/20 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-white/95 px-2 py-1 backdrop-blur-sm">
                    <CheckCircle2 className="h-3 w-3 text-brand-blue" />
                    <span className="text-[11px] font-medium text-brand-graphite">Under 4 minutes, end-to-end</span>
                  </span>
                </div>
              </div>
            </div>
            <ul className="space-y-2.5 rounded-xl border border-brand-blue/15 bg-brand-blue/5 p-4">
              {revunWay.map((win, i) => (
                <motion.li key={win}
                  initial={{ opacity: 0, x: 8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: 0.25 + i * 0.05 }}
                  className="flex items-start gap-2.5 text-sm text-brand-graphite">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-blue" />
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

/* ── Section 3: Capabilities Showcase (alternating image+content) ─── */

function CapabilitiesShowcase() {
  const showcases = [
    {
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1000&q=90',
      alt: 'Equifax and TransUnion credit reports',
      eyebrow: 'Credit',
      title: 'Two bureaus.',
      highlight: 'One unified report.',
      body: 'Equifax and TransUnion across both countries with a single consent, normalized into one credit view per applicant.',
      pill: '2 bureaus, 1 pull',
      bullets: [
        'Full trade lines, balances, and utilization',
        'Hard or soft inquiry, your call',
        'Canadian and US scoring models, provincial and state flags',
      ],
    },
    {
      image: 'https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&w=1000&q=90',
      alt: 'Liveness-based identity verification',
      eyebrow: 'Identity & Background',
      title: 'Verify identity in',
      highlight: '90 seconds flat.',
      body: 'Government ID scan, liveness check, and criminal / eviction background in one consent flow.',
      pill: '~90s verification',
      bullets: [
        "Passport, driver's licence, or PR card",
        'Liveness + face-match blocks stolen IDs',
        'LTB / RTB eviction lookups per province',
      ],
    },
    {
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=90',
      alt: 'North American rental risk dashboard',
      eyebrow: 'Income & Risk',
      title: 'Bank-linked income.',
      highlight: 'CA + US-tuned score.',
      body: 'Flinks connects Canadian bank accounts and Plaid connects US bank accounts for instant 60-day income proof plus explainable scoring.',
      pill: '60 days of bank data',
      bullets: [
        'Flinks / Plaid bank-linked income proof',
        'Pay stub OCR as a fallback',
        'Roommate stack scoring (combined incomes)',
      ],
    },
  ]
  return (
    <SW id="capabilities">
      <SH eyebrow="Capabilities" title="Every signal," highlight="one pipeline." description="Credit, identity, and income. Each a first-class feature, not a bolt-on." />
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {showcases.map((block, i) => (
          <Anim key={block.eyebrow} delay={0.1 + i * 0.08} y={16}>
            <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white transition-all hover:border-brand-blue/40 hover:shadow-lg">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={block.image} alt={block.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                <div className="absolute left-3 top-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold text-brand-blue backdrop-blur">
                    <Gauge className="h-3 w-3" /> {block.pill}
                  </span>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="text-[11px] font-heading font-semibold uppercase tracking-wider text-brand-blue">{block.eyebrow}</div>
                <h3 className="mt-2 font-display text-2xl font-normal leading-tight text-brand-graphite">
                  {block.title} <span className="text-keyword">{block.highlight}</span>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-graphite-mid">{block.body}</p>
                <ul className="mt-5 space-y-2.5 border-t border-[#E5E7EB] pt-5">
                  {block.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2 text-sm text-brand-graphite">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" aria-hidden />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Anim>
        ))}
      </div>
    </SW>
  )
}

/* ── Section 4: Applicant Pipeline (contextual UI mockup) ─────────── */

function ApplicantPipeline() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const applicants = [
    {
      initials: 'SC', name: 'Sarah Chen', score: '842', label: 'Excellent',
      avatar: 'bg-[#176FEB] text-white shadow-[0_10px_20px_-8px_rgba(23,111,235,0.5)]',
      pillBg: 'bg-[#176FEB]/10', pillText: 'text-[#176FEB]',
      chips: [{ label: 'Credit', ok: true }, { label: 'ID', ok: true }, { label: 'Income', ok: true }],
    },
    {
      initials: 'MP', name: 'Mike Patel', score: '715', label: 'Good',
      avatar: 'bg-[#0A1628] text-white',
      pillBg: 'bg-[#4A91F0]/15', pillText: 'text-[#4A91F0]',
      chips: [{ label: 'Credit', ok: true }, { label: 'ID', ok: true }, { label: 'Income', ok: false }],
    },
    {
      initials: 'EW', name: 'Emily Wong', score: '580', label: 'Review',
      avatar: 'bg-[#E5E7EB] text-[#555860]',
      pillBg: 'bg-[#0A1628]/8', pillText: 'text-[#0A1628]',
      chips: [{ label: 'Credit', ok: false }, { label: 'ID', ok: true }, { label: 'Income', ok: false }],
    },
  ]
  return (
    <SW id="applicant-pipeline" dark>
      <SH eyebrow="Applicant Pipeline" title="See every applicant" highlight="side by side." description="Score, compare, and decide from one dashboard." />
      <div ref={ref} className="mx-auto mt-12 max-w-3xl">
        <motion.div className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_20px_60px_-20px_rgba(10,22,40,0.15)]"
          {...fadeUp} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <div className="flex items-center justify-between border-b border-[#E5E7EB] bg-white px-5 py-3">
            <p className="flex items-center gap-1.5 text-[11px] font-heading font-semibold uppercase tracking-wider text-[#176FEB]">
              <Users className="size-3" /> 3 Applicants
            </p>
            <span className="flex items-center gap-1 text-[11px] text-[#555860]">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-1.5 animate-ping rounded-full bg-[#176FEB]" />
                <span className="relative inline-flex size-1.5 rounded-full bg-[#176FEB]" />
              </span>
              Live
            </span>
          </div>

          <div className="flex flex-col gap-3 bg-[#FAFBFC] px-6 py-8">
            {applicants.map((a, i) => (
              <motion.div key={a.name}
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                className="flex items-center gap-4 rounded-xl border border-[#E5E7EB] bg-white px-4 py-3">
                <div className={`flex size-11 shrink-0 items-center justify-center rounded-full text-xs font-heading font-semibold ${a.avatar}`}>{a.initials}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-heading text-sm font-semibold text-[#0A1628]">{a.name}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${a.pillBg} ${a.pillText}`}>{a.score} · {a.label}</span>
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {a.chips.map((c) => (
                      <span key={c.label} className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] ${c.ok ? 'bg-[#176FEB]/10 text-[#176FEB]' : 'bg-[#0A1628]/8 text-[#0A1628]'}`}>
                        {c.label} {c.ok ? <CheckCircle2 className="size-2.5" /> : <AlertTriangle className="size-2.5" />}
                      </span>
                    ))}
                  </div>
                </div>
                <button aria-label={`View ${a.name}`} className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#176FEB] transition hover:border-[#176FEB]/40">
                  <ArrowRight className="size-3.5" />
                </button>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-[#E5E7EB] bg-white px-5 py-3">
            <span className="flex items-center gap-1.5 text-[11px] text-[#555860]">
              <Filter className="size-3" /> Sorted by score
            </span>
            <span className="flex items-center gap-1 text-[11px] font-heading font-semibold text-[#176FEB]">
              <Sparkles className="size-3" /> Recommend Sarah Chen
            </span>
          </div>
        </motion.div>
      </div>

      {/* Horizontal 3-col feature strip below the pipeline */}
      <div className="mx-auto mt-10 grid max-w-5xl gap-5 sm:grid-cols-3">
        {[
          { icon: BarChart3, title: 'Weighted ranking', desc: 'Credit 40%, Income 30%, History 20%, References 10%.' },
          { icon: Shield, title: 'Risk explanations', desc: 'Every score shows what drove it. Approve with confidence.' },
          { icon: CheckCircle2, title: 'One-click decide', desc: 'Approve, decline, or request docs without leaving the pipeline.' },
        ].map((f, i) => (
          <Anim key={f.title} className="rounded-2xl border border-[#E5E7EB] bg-white p-6" delay={0.4 + i * 0.08} y={12}>
            <div className="flex size-11 items-center justify-center rounded-xl bg-[#176FEB]/10">
              <f.icon className="size-5 text-[#176FEB]" />
            </div>
            <h4 className="mt-4 font-heading text-base font-semibold text-[#0A1628]">{f.title}</h4>
            <p className="mt-1.5 text-sm leading-relaxed text-[#555860]">{f.desc}</p>
          </Anim>
        ))}
      </div>
    </SW>
  )
}

/* ── Section 5: Risk Score Card ───────────────────────────────────── */

function RiskScoreCard() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const explainers = [
    { icon: MapPin, title: 'Weighted for CA + US factors', desc: 'NOA integration in Canada, 1040 income verification in the US, bilingual employer verification.' },
    { icon: Users, title: 'Roommate stacks scored together', desc: 'Combined incomes and joint risk, not just one lead applicant.' },
    { icon: Shield, title: 'Provincial compliance rules applied', desc: 'Ontario LTB history, BC RTB, and Quebec TAL lookups baked in.' },
    { icon: Fingerprint, title: 'Explainable decisions', desc: 'Every applicant sees which factor moved the score, up or down.' },
  ]
  const bars = [
    { label: 'Credit Score', value: '780', note: 'Excellent', pct: 87 },
    { label: 'Payment History', value: '100%', note: 'on-time', pct: 100 },
    { label: 'Income Ratio', value: '3.2×', note: 'rent', pct: 80 },
  ]
  const scorePct = 842 / 900
  const circumference = 2 * Math.PI * 54
  return (
    <SW id="risk-score">
      <SH eyebrow="Risk Score" title="A score tuned for" highlight="North American renters." description="Provincial and state factors, roommate stacks, and credit depth weighted for the actual rental market across Canada and the US." />

      {/* Hero: risk score card centered */}
      <div ref={ref} className="mx-auto mt-12 max-w-md">
        <motion.div className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_20px_60px_-20px_rgba(10,22,40,0.15)]" {...fadeUp} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <div className="flex items-center gap-3 border-b border-[#E5E7EB] px-6 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue/10 text-xs font-heading font-semibold text-brand-blue">SC</div>
            <div className="flex-1">
              <p className="font-heading text-sm font-semibold text-brand-graphite">Sarah Chen</p>
              <p className="text-[11px] text-brand-graphite-mid">Risk Score</p>
            </div>
            <span className="rounded-full bg-brand-blue/10 px-3 py-1 text-[11px] font-semibold text-brand-blue">Excellent</span>
          </div>

          <div className="flex flex-col items-center px-6 pt-6 pb-4">
            <div className="relative h-40 w-40">
              <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                <circle cx="60" cy="60" r="54" stroke="#E5E7EB" strokeWidth="10" fill="none" />
                <motion.circle cx="60" cy="60" r="54" stroke="#176FEB" strokeWidth="10" strokeLinecap="round" fill="none"
                  initial={{ strokeDasharray: `0 ${circumference}` }}
                  animate={inView ? { strokeDasharray: `${circumference * scorePct} ${circumference}` } : {}}
                  transition={{ duration: 1.2, ease, delay: 0.3 }} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-4xl font-normal text-brand-graphite">842</span>
                <span className="text-[11px] text-brand-graphite-mid">/ 900 Excellent</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 px-6 pb-4">
            {bars.map((b, i) => (
              <motion.div key={b.label}
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, ease, delay: 0.5 + i * 0.1 }}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-brand-graphite-mid">{b.label}</span>
                  <span className="text-brand-graphite"><span className="font-semibold">{b.value}</span> <span className="text-brand-graphite-mid">· {b.note}</span></span>
                </div>
                <div className="h-2 rounded-full bg-[#F5F6F8]">
                  <motion.div className="h-full rounded-full bg-brand-blue"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${b.pct}%` } : {}}
                    transition={{ duration: 0.8, ease, delay: 0.6 + i * 0.1 }} />
                </div>
              </motion.div>
            ))}
            {[{ label: 'Identity', note: 'Verified' }, { label: 'Eviction Record', note: 'None' }].map((r) => (
              <div key={r.label} className="flex items-center justify-between py-1">
                <span className="text-xs text-brand-graphite-mid">{r.label}</span>
                <span className="flex items-center gap-1 text-xs font-medium text-brand-blue">{r.note} <CheckCircle2 className="h-3.5 w-3.5" /></span>
              </div>
            ))}
          </div>

          <div className="border-t border-[#E5E7EB] px-6 py-4">
            <span className="flex items-center gap-1 text-sm font-medium text-brand-blue">Pull full report <ArrowRight className="h-3.5 w-3.5" /></span>
          </div>
        </motion.div>
      </div>

      {/* 2x2 explainer grid surrounding the score */}
      <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2">
        {explainers.map((f, i) => (
          <Anim key={f.title} className="rounded-2xl border border-[#E5E7EB] bg-white p-6" delay={0.3 + i * 0.08} y={12}>
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10"><f.icon className="h-5 w-5 text-brand-blue" /></div>
              <div>
                <h4 className="font-heading text-base font-semibold text-brand-graphite">{f.title}</h4>
                <p className="mt-1 text-sm leading-relaxed text-brand-graphite-mid">{f.desc}</p>
              </div>
            </div>
          </Anim>
        ))}
      </div>
    </SW>
  )
}

/* ── Section 6: How It Works ─────────────────────────────────────── */

function HowItWorks() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const steps = [
    { num: '01', icon: FileText, title: 'Send screening link', desc: 'Branded intake link — tenant fills consent and docs in minutes.' },
    { num: '02', icon: Fingerprint, title: 'Identity + credit pull', desc: 'Equifax/TransUnion and IDV run automatically within 5 minutes.' },
    { num: '03', icon: BarChart3, title: 'Risk score + ranking', desc: "Revun's CA + US-tuned model ranks applicants side by side." },
    { num: '04', icon: CheckCircle2, title: 'Approve in one click', desc: 'Decision flows straight into lease generation — no re-entry.' },
  ]
  return (
    <SW id="how-it-works" dark>
      <SH eyebrow="How it works" title="From application to approval" highlight="in days, not weeks." description="One branded intake link, every signal verified automatically, decision in your dashboard." />
      <div ref={ref} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <motion.div
            key={s.num}
            className="flex h-full flex-col rounded-2xl border border-[#E5E7EB] bg-white p-6 transition-all hover:border-brand-blue/40 hover:shadow-md"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease, delay: 0.1 + i * 0.08 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10">
                <s.icon className="h-5 w-5 text-brand-blue" />
              </div>
              <span className="font-display text-3xl font-normal text-[#E5E7EB]">{s.num}</span>
            </div>
            <h4 className="mt-5 font-heading text-base font-semibold text-brand-graphite">{s.title}</h4>
            <p className="mt-1.5 text-sm leading-relaxed text-brand-graphite-mid">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </SW>
  )
}

/* ── Section 7: Compliance ───────────────────────────────────────── */

function Compliance() {
  const features = [
    { icon: ShieldCheck, title: 'PIPEDA-compliant consent', body: 'Every credit pull captured with timestamped tenant consent and IP.' },
    { icon: Lock, title: 'CA + US data residency', body: 'Applicant data stored on Canadian or US servers by jurisdiction. No unwanted cross-border transfer.' },
    { icon: Gavel, title: 'Province-aware rule engine', body: 'Ontario, BC, Quebec, Alberta screening limits enforced automatically.' },
    { icon: FileText, title: 'Complete audit trail', body: 'Every decision, pull, and document archived with who, when, and why.' },
  ]
  return (
    <SW id="compliance">
      <SH eyebrow="Compliance" title="Screening that stands up to" highlight="PIPEDA and provincial law." description="Credit pulls with explicit consent, province-aware rules, and audit trails that make tribunal defense trivial." />

      {/* 4-up feature strip across the top */}
      <div className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => {
          const Icon = f.icon
          return (
            <Anim key={f.title} className="rounded-2xl border border-[#E5E7EB] bg-white p-5" delay={0.1 + i * 0.08} y={12}>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue/10">
                <Icon className="h-5 w-5 text-brand-blue" strokeWidth={2} />
              </div>
              <h3 className="mt-4 font-heading text-base font-semibold text-brand-graphite">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-brand-graphite-mid">{f.body}</p>
            </Anim>
          )
        })}
      </div>

      {/* Consent record card, centered and dominant */}
      <Anim delay={0.35} className="mx-auto mt-12 max-w-2xl">
        <div className="relative">
          <div className="absolute -top-3 -right-3 h-24 w-24 rounded-full bg-brand-blue/5 blur-2xl" aria-hidden />
          <div className="relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_20px_60px_-20px_rgba(10,22,40,0.15)]">
            <div className="flex items-center gap-3 border-b border-[#E5E7EB] bg-brand-blue/5 px-6 py-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue shadow-sm">
                <Check className="h-5 w-5 text-white" strokeWidth={3} />
              </div>
              <div className="flex-1">
                <div className="text-xs font-medium uppercase tracking-wide text-brand-blue">Verified Consent</div>
                <div className="font-mono text-sm font-semibold text-[#0A1628]">Consent Record #SC-4829</div>
              </div>
              <ShieldCheck className="h-5 w-5 text-brand-blue" />
            </div>

            <div className="space-y-4 px-6 py-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[11px] font-medium uppercase tracking-wide text-brand-graphite-mid">Applicant</div>
                  <div className="mt-0.5 text-sm font-semibold text-brand-graphite">Priya Ramanathan</div>
                </div>
                <div>
                  <div className="text-[11px] font-medium uppercase tracking-wide text-brand-graphite-mid">Timestamp</div>
                  <div className="mt-0.5 font-mono text-sm text-brand-graphite">2026-04-18 14:32 EST</div>
                </div>
                <div>
                  <div className="text-[11px] font-medium uppercase tracking-wide text-brand-graphite-mid">IP Address</div>
                  <div className="mt-0.5 font-mono text-sm text-brand-graphite">198.51.100.47</div>
                </div>
                <div>
                  <div className="text-[11px] font-medium uppercase tracking-wide text-brand-graphite-mid">Signature</div>
                  <div className="mt-0.5 flex items-center gap-1 text-sm font-semibold text-brand-blue"><Check className="h-4 w-4" /> Signed</div>
                </div>
              </div>

              <div className="border-t border-[#E5E7EB] pt-3">
                <div className="mb-2 text-[11px] font-medium uppercase tracking-wide text-brand-graphite-mid">Consent Scope</div>
                <div className="flex flex-wrap gap-2">
                  {['Credit', 'ID', 'Background', 'Income'].map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1.5 rounded-md bg-brand-blue/10 px-2.5 py-1 text-xs font-medium text-brand-blue">
                      <Check className="h-3 w-3" strokeWidth={3} />{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#E5E7EB] pt-3 font-mono text-[11px] leading-relaxed text-brand-graphite-mid">
                PIPEDA s.6.1 / Ontario RTA s.234, consent retained 7y
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-[#E5E7EB] bg-[#F5F6F8] px-6 py-3">
              <div className="flex items-center gap-2 text-xs text-brand-graphite-mid">
                <FileText className="h-4 w-4" />
                <span className="font-mono">SC-4829.pdf</span>
              </div>
              <span className="text-xs font-semibold text-brand-blue">Download PDF for tribunal →</span>
            </div>
          </div>
        </div>
      </Anim>
    </SW>
  )
}

/* ── Section 8: Use Cases (audience tiles with photos) ───────────── */

function UseCases() {
  const tiles = [
    { img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80', alt: 'Self-managing condo owner', Icon: Home, role: 'Owners', title: 'Self-Managing Landlords', desc: '1-49 units. No 50-door minimum.', href: '/solutions/self-managing-owners/' },
    { img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80', alt: 'Property management office building', Icon: Building2, role: 'PMCs', title: 'Property Management Companies', desc: 'Standardize screening across every property and team.', href: '/solutions/property-management-companies/' },
    { img: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80', alt: 'Real estate brokerage screening rental applicants', Icon: Briefcase, role: 'Brokerages', title: 'Real Estate Brokerages', desc: 'Screen rental applicants inside your transaction workflow.', href: '/solutions/brokerages/' },
    { img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80', alt: 'Leasing company office screening applicants', Icon: Key, role: 'Leasing', title: 'Leasing Companies', desc: 'Turn-key intake, screening, and lease execution in one pipeline.', href: '/solutions/leasing-companies/' },
  ]
  return (
    <SW id="use-cases" dark>
      <SH eyebrow="Built for" title="Screening that scales with" highlight="your operation." description="Whether you manage 5 doors or 5,000, the same compliance-grade pipeline runs under every applicant." />
      <RevealOnScroll className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {tiles.map((t) => (
          <motion.div key={t.href} variants={revealItem}>
            <Link href={t.href} className="group block h-full overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white transition-all hover:border-brand-blue/40 hover:shadow-md">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={t.img} alt={t.alt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2">
                  <t.Icon className="h-4 w-4 text-brand-blue" aria-hidden />
                  <span className="text-[11px] font-heading font-semibold uppercase tracking-wider text-brand-blue">{t.role}</span>
                </div>
                <h3 className="mt-2 font-heading text-lg font-semibold text-brand-graphite">{t.title}</h3>
                <p className="mt-1 text-sm text-brand-graphite-mid">{t.desc}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-blue">
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

/* ── Section 9: Testimonials (real photos + stat banner) ─────────── */

function Testimonials() {
  const testimonials = [
    {
      quote: 'We used to lose two days per applicant chasing paystubs and Equifax reports. Revun runs all three checks in under five minutes. Our time-to-lease dropped from 11 days to 3.',
      name: 'Priya Sharma',
      title: 'Leasing Manager · MapleView Properties',
      location: 'Toronto, ON',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      alt: 'Priya Sharma, Leasing Manager at MapleView Properties',
    },
    {
      quote: 'The province-specific eviction lookups and PIPEDA consent record alone saved us at an LTB hearing last quarter. No other screening tool had that audit trail baked in.',
      name: 'Marcus Lévesque',
      title: 'Co-Founder · Nord Habitat Gestion',
      location: 'Montréal, QC',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      alt: 'Marcus Lévesque, Co-Founder at Nord Habitat',
    },
    {
      quote: 'Flinks-based income verification is a game changer. Applicants connect their bank once and we see 60 days of deposits. No more blurry paystub PDFs, no more follow-up emails.',
      name: 'Amanda Kaur',
      title: 'Director of Operations · Coastline Property Group',
      location: 'Vancouver, BC',
      photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
      alt: 'Amanda Kaur, Director of Operations at Coastline Property Group',
    },
  ]
  const stats = [
    { number: '11 → 3 days', label: 'Avg. time-to-lease' },
    { number: '< 5 min', label: 'Credit + ID + Income' },
    { number: '100%', label: 'PIPEDA compliant pulls' },
    { number: '0', label: 'Tribunal decisions overturned*' },
  ]
  return (
    <SW id="testimonials">
      <SH eyebrow="Proof" title="Operators are already" highlight="screening faster." description="Real property managers across Canada and the US, real numbers, from the first month of using Revun." />
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Anim key={t.name} delay={0.1 * (i + 1)}>
            <div className="relative h-full rounded-2xl border border-[#E5E7EB] bg-white p-6 transition-all hover:border-brand-blue/40 hover:shadow-sm md:p-8">
              <Quote className="absolute right-6 top-6 h-10 w-10 text-brand-blue/10" />
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-brand-blue stroke-brand-blue" />
                ))}
              </div>
              <p className="relative z-10 font-display text-lg leading-snug text-brand-graphite md:text-xl">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-[#E5E7EB] pt-6">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                  <Image src={t.photo} alt={t.alt} fill sizes="48px" className="object-cover" />
                </div>
                <div className="min-w-0">
                  <div className="truncate font-bold text-brand-graphite">{t.name}</div>
                  <div className="mt-0.5 flex items-center gap-1 text-xs text-brand-graphite-mid">
                    <Building2 className="h-3 w-3 shrink-0" />
                    <span className="truncate">{t.title}</span>
                  </div>
                  <div className="mt-0.5 flex items-center gap-1 text-xs text-brand-graphite-mid">
                    <MapPin className="h-3 w-3 shrink-0" />
                    <span className="truncate">{t.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </Anim>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-brand-blue/20 bg-brand-blue/5 p-6 md:p-8">
        <div className="grid grid-cols-2 gap-y-6 sm:grid-cols-4 sm:divide-x sm:divide-[#E5E7EB]">
          {stats.map((s) => (
            <div key={s.label} className="px-4 text-center">
              <div className="font-display text-2xl text-brand-graphite md:text-3xl">{s.number}</div>
              <div className="mt-2 text-xs uppercase tracking-wide text-brand-graphite-mid">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-brand-graphite-mid">*Across Revun customers in 2025.</p>
    </SW>
  )
}

/* ── Section 10: Comparison Table ────────────────────────────────── */

type Status = 'yes' | 'no' | 'partial'
type ComparisonRow = {
  feature: string
  revun: string
  singlekey: string
  transunion: string
  certn: string
  status: { revun: Status; singlekey: Status; transunion: Status; certn: Status }
}

function Comparison() {
  const columns = [
    { key: 'feature', label: 'Feature' },
    { key: 'revun', label: 'Revun', highlight: true },
    { key: 'singlekey', label: 'SingleKey / Naborly' },
    { key: 'transunion', label: 'TransUnion SmartMove' },
    { key: 'certn', label: 'Certn / Persona' },
  ]

  const rows: ComparisonRow[] = [
    { feature: 'CA + US credit (Equifax, TransUnion, Experian)', revun: 'All bureaus, province and state-scored', singlekey: 'One bureau only', transunion: 'TransUnion only, US-centric', certn: 'Not included', status: { revun: 'yes', singlekey: 'partial', transunion: 'partial', certn: 'no' } },
    { feature: 'Identity verification', revun: 'Liveness + ID match, 90s', singlekey: 'Document upload only', transunion: 'Basic ID match', certn: 'Core feature', status: { revun: 'yes', singlekey: 'partial', transunion: 'partial', certn: 'partial' } },
    { feature: 'Income verification', revun: 'Flinks / Plaid bank-linked', singlekey: 'Paystub upload manual', transunion: 'Not included', certn: 'Not included', status: { revun: 'yes', singlekey: 'partial', transunion: 'no', certn: 'no' } },
    { feature: 'LTB / RTB eviction lookup', revun: 'Automated per province', singlekey: 'Manual reference check', transunion: 'US eviction only', certn: 'Not included', status: { revun: 'yes', singlekey: 'partial', transunion: 'partial', certn: 'no' } },
    { feature: 'Risk scoring model', revun: 'CA + US-tuned, roommate-stack aware', singlekey: 'Generic score', transunion: 'US SmartMove score', certn: 'Not included', status: { revun: 'yes', singlekey: 'partial', transunion: 'partial', certn: 'no' } },
    { feature: 'Flows into leasing / payments', revun: 'One click to lease + payment', singlekey: 'Export PDF, re-enter data', transunion: 'Export only', certn: 'Export only', status: { revun: 'yes', singlekey: 'no', transunion: 'no', certn: 'no' } },
    { feature: 'Compliance audit trail', revun: 'Full consent + decision log', singlekey: 'Report only, no decision log', transunion: 'Report only', certn: 'Verification record only', status: { revun: 'yes', singlekey: 'partial', transunion: 'partial', certn: 'partial' } },
    { feature: 'Pricing model', revun: 'Included in plan, no per-pull fees', singlekey: '$20-35 per report', transunion: '$30-40 per check', certn: '$1.50 per check + no screening', status: { revun: 'yes', singlekey: 'no', transunion: 'no', certn: 'no' } },
  ]

  const StatusIcon = ({ status }: { status: Status }) => {
    if (status === 'yes') return <Check className="h-4 w-4 shrink-0 text-brand-blue" strokeWidth={3} />
    if (status === 'no') return <X className="h-4 w-4 shrink-0 text-[#E7000B]" strokeWidth={3} />
    return <Minus className="h-4 w-4 shrink-0 text-[#D3D5DB]" strokeWidth={3} />
  }

  return (
    <SW id="comparison" dark>
      <SH eyebrow="vs. the rest" title="Why screening tools alone" highlight="leave you exposed." description="Point solutions verify one signal. Revun ties screening to the lease, the portal, and the audit trail." />

      <Anim delay={0.05}>
        <div className="mt-14 overflow-x-auto rounded-2xl border border-[#E5E7EB] shadow-sm">
          <table className="w-full min-w-[900px] border-collapse bg-white">
            <thead>
              <tr className="bg-brand-graphite">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide ${
                      col.highlight ? 'border-l-4 border-brand-blue bg-brand-blue text-white' : 'text-white/80'
                    } ${col.key === 'feature' ? 'sticky left-0 z-10 bg-brand-graphite min-w-[220px]' : 'min-w-[170px]'}`}
                  >
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
                const zebra = i % 2 === 1 ? 'bg-[#F9FAFB]' : 'bg-white'
                return (
                  <tr key={row.feature} className={`${zebra} border-t border-[#E5E7EB]`}>
                    <td className={`sticky left-0 z-10 border-r border-[#E5E7EB] px-5 py-4 ${zebra}`}>
                      <div className="text-sm font-semibold text-brand-graphite">{row.feature}</div>
                    </td>
                    <td className="border-l-4 border-brand-blue bg-brand-blue/5 px-5 py-4">
                      <div className="flex items-start gap-2">
                        <StatusIcon status={row.status.revun} />
                        <span className="text-sm font-semibold text-brand-graphite">{row.revun}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-start gap-2">
                        <StatusIcon status={row.status.singlekey} />
                        <span className="text-sm text-brand-graphite-mid">{row.singlekey}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-start gap-2">
                        <StatusIcon status={row.status.transunion} />
                        <span className="text-sm text-brand-graphite-mid">{row.transunion}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-start gap-2">
                        <StatusIcon status={row.status.certn} />
                        <span className="text-sm text-brand-graphite-mid">{row.certn}</span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Anim>

      <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-brand-graphite-mid">
        Comparison based on publicly listed features as of 2026. Pricing reflects standard reports; enterprise tiers vary.
      </p>
    </SW>
  )
}

/* ── Section 9: FAQ ──────────────────────────────────────────────── */

const TENANT_SCREENING_FAQS = [
  { q: 'How long does a screening take from application to decision?', a: 'Credit + ID + income typically complete in under 5 minutes. Background and eviction checks add 1-3 hours depending on provincial registries.' },
  { q: 'Which credit bureaus does Revun pull from?', a: 'Both Equifax Canada and TransUnion Canada. You choose one or both per property. Reports include full trade lines, payment history, and soft-inquiry impact.' },
  { q: 'Is identity verification PIPEDA-compliant?', a: 'Yes. Revun captures consent with timestamp and IP before any pull. Liveness and ID match use a SOC 2 certified IDV partner with Canadian and US data residency.' },
  { q: 'Can I screen without credit pull (pre-screen only)?', a: 'Yes. Run identity + income + eviction lookups first, then escalate to a soft or hard credit pull only on shortlisted applicants.' },
  { q: 'Does screening flow into lease generation?', a: 'Directly. Approved applicants move from screening into lease templates with their verified info pre-filled. No re-entry, no lost documents.' },
  { q: 'What happens if an applicant disputes a screening decision?', a: 'Revun stores the full consent record, decision log, and bureau response per applicant. You can produce a tribunal-ready audit trail in under a minute.' },
  { q: 'Is there a per-report fee?', a: 'No per-pull charges inside your Revun plan. Credit bureau pass-throughs are optional and transparent, never marked up.' },
  { q: 'Can I white-label the application form for my brand?', a: 'Yes. Upload your logo, customize the intake questions, and send the link from your branded domain. Applicants never see "Revun."' },
] as const

function FAQ() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: TENANT_SCREENING_FAQS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  return (
    <SW id="faq">
      <SH eyebrow="FAQ" title="Questions we hear from" highlight="operators switching to Revun." description="Straight answers on compliance, speed, and integration." />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(faqJsonLd) }} />
      <RevealOnScroll className="mx-auto mt-12 max-w-3xl">
        {TENANT_SCREENING_FAQS.map((item, idx) => (
          <motion.div key={idx} variants={revealItem}>
            <details className="group border-b border-[#E5E7EB] [&[open]>summary>svg]:rotate-180">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left">
                <span className="text-base font-semibold text-brand-graphite sm:text-lg">{item.q}</span>
                <ChevronDown className="h-5 w-5 flex-shrink-0 text-brand-graphite-mid transition-transform duration-300" aria-hidden="true" />
              </summary>
              <p className="pb-5 pr-10 text-sm leading-relaxed text-brand-graphite-mid sm:text-base">{item.a}</p>
            </details>
          </motion.div>
        ))}
      </RevealOnScroll>
    </SW>
  )
}

/* ── Section 10: Final CTA ───────────────────────────────────────── */

function CTASection() {
  return (
    <section id="cta" className="relative overflow-hidden bg-[#0A1628] px-6 py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 55% at 50% 40%, rgba(23,111,235,0.28), rgba(23,111,235,0.08), transparent 75%)' }} />
      <RevealOnScroll className="relative mx-auto max-w-3xl text-center">
        <motion.div variants={revealItem}>
          <span className="inline-flex items-center rounded-full border border-brand-blue/30 bg-brand-blue/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-brand-blue">
            Start screening today
          </span>
        </motion.div>

        <motion.h2 variants={revealItem} className="mt-6 font-display text-4xl font-normal tracking-tight text-white sm:text-5xl lg:text-6xl">
          Screen with confidence. <span className="text-brand-blue">Lease with speed.</span>
        </motion.h2>

        <motion.p variants={revealItem} className="mx-auto mt-6 max-w-xl text-base text-white/70 sm:text-lg">
          Try Revun screening free for 14 days. No credit card, no sales gate.
        </motion.p>

        <motion.div variants={revealItem} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/pricing/" className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand-blue px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_40px_-8px_rgba(23,111,235,0.8)] transition-all hover:brightness-110 hover:shadow-[0_0_50px_-4px_rgba(23,111,235,0.9)]">
            Start Free Trial
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
          <Link href="/demo/" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/15">
            Book a Demo
          </Link>
        </motion.div>

        <motion.p variants={revealItem} className="mt-8 text-xs text-white/50">
          Questions?{' '}
          <Link href="/contact/" className="text-brand-blue transition-colors hover:text-white">Talk to our team →</Link>
        </motion.p>
      </RevealOnScroll>
    </section>
  )
}

/* ── Page Export ─────────────────────────────────────────────────── */

function FeaturesGrid() {
  const FEATURES = [
    { icon: BarChart3, title: 'Dual Bureau Credit', description: 'Equifax + TransUnion in one pull. Full credit report, scores, and trade lines, across Canada and the US.' },
    { icon: Fingerprint, title: 'Liveness ID Verification', description: 'Government ID scan plus liveness check. Fraud rings fail before they reach your inbox.' },
    { icon: Wallet, title: 'Bank-Linked Income', description: 'Flinks and Plaid connect instantly. 60 days of deposit data with consent.' },
    { icon: ShieldCheck, title: 'Eviction & Background', description: 'LTB/RTB provincial lookups, criminal records, and reference automation.' },
    { icon: Gauge, title: 'CA + US Risk Score', description: 'Tuned for the North American rental market, with roommate-stack, province and state-aware scoring.' },
    { icon: Users2, title: 'Side-by-Side Ranking', description: 'Weighted comparison across credit, income, history, and references — one dashboard.' },
  ]
  return (
    <SW id="features-grid" dark>
      <SH eyebrow="Capabilities at a glance" title="Every screening signal," highlight="in one pipeline." description="Credit, identity, income, background, and risk — all under a single PIPEDA-compliant consent." />
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

export function TenantScreeningClient() {
  return (
    <>
      <Hero />
      <FeaturesGrid />
      <ProblemSection />
      <CapabilitiesShowcase />
      <ApplicantPipeline />
      <RiskScoreCard />
      <HowItWorks />
      <Compliance />
      <UseCases />
      <Testimonials />
      <Comparison />
      <FAQ />
      <CTASection />
    </>
  )
}
