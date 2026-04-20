'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Workflow,
  ShieldCheck,
  Wallet,
  MessageSquare,
  Umbrella,
  Bot,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

/* ═══════════════════════════════════════════════════════════════════════════
   Six infrastructure pillars - clean icon cards, real imagery, no fake UI
   ═══════════════════════════════════════════════════════════════════════════ */

interface Feature {
  title: string
  tag: string
  description: string
  icon: LucideIcon
  image: string
  imageAlt: string
  metric: { value: string; label: string }
  href: string
  accent: string
}

const features: Feature[] = [
  {
    title: 'Unified Operations',
    tag: 'One system of record',
    description:
      'Leasing, payments, maintenance, and communications run on one ledger across Canada and the US. No more toggling between disconnected tools to piece together a tenant, a unit, or a dollar.',
    icon: Workflow,
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Modern office workspace with unified team operations',
    metric: { value: '5 → 1', label: 'tools replaced' },
    href: '/features/',
    accent: '#176FEB',
  },
  {
    title: 'Compliance Engine',
    tag: 'Rules enforced automatically',
    description:
      'Provincial RTAs and state statutes change quarterly. Revun enforces them automatically: LTB, RTB, TAL, DHCR, DRE notices, forms, deadlines, and audit trails generated on every action, not after.',
    icon: ShieldCheck,
    image:
      'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Legal and compliance documents on a desk, provincial and state regulatory compliance',
    metric: { value: '63 / 63', label: 'provinces + states monitored' },
    href: '/features/compliance/',
    accent: '#176FEB',
  },
  {
    title: 'Payments Infrastructure',
    tag: 'Every dollar reconciled',
    description:
      'Rent collection, owner disbursements, vendor payouts, and trust accounting run through one ledger: PAD, Interac, ACH, and cards, auto-reconciled, audit-ready, and on schedule every time.',
    icon: Wallet,
    image:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Financial reports and transactions, payments infrastructure',
    metric: { value: '97.8%', label: 'on-time collection' },
    href: '/features/rent-collection/',
    accent: '#176FEB',
  },
  {
    title: 'Communications Layer',
    tag: 'One thread per unit',
    description:
      'Personal phone numbers, scattered emails, and unlogged calls leave you exposed. Revun deploys encrypted messaging tied to every unit. Nothing slips, nothing leaks.',
    icon: MessageSquare,
    image:
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Property team in conversation, unified communications',
    metric: { value: '< 2 min', label: 'avg response time' },
    href: '/features/communications/',
    accent: '#176FEB',
  },
  {
    title: 'Rent Protection',
    tag: 'Revenue, guaranteed',
    description:
      'One missed payment cascades into owner distrust and cash-flow pressure. Built-in rent coverage, backed by Canadian and US underwriters, protects your revenue and shields owner confidence.',
    icon: Umbrella,
    image:
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Protected rental home, rent protection and coverage',
    metric: { value: 'Up to $60K', label: 'rent coverage' },
    href: '/features/',
    accent: '#176FEB',
  },
  {
    title: 'AI Operations',
    tag: 'Ops on autopilot',
    description:
      'Manual triage and vendor matching consume hours that should go to growth. Revun classifies, routes, schedules, and notifies automatically, in seconds, not days.',
    icon: Bot,
    image:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'AI automation and intelligent workflow, operations on autopilot',
    metric: { value: '4 / 4', label: 'workflows automated' },
    href: '/features/ai-automation/',
    accent: '#176FEB',
  },
]

/* -- Feature row - editorial list, no cards, hairline-divided -------------- */

function FeatureRow({ feature, index }: { feature: Feature; index: number }) {
  const Icon = feature.icon
  const stepNum = String(index + 1).padStart(2, '0')
  return (
    <motion.div
      variants={revealItem}
      className="group grid grid-cols-1 gap-6 py-8 md:grid-cols-[220px_1fr_200px] md:items-center md:gap-10 md:py-10 lg:grid-cols-[260px_1fr_220px]"
    >
      {/* Thumbnail image (rounded, no card chrome) */}
      <Link
        href={feature.href}
        aria-label={`Explore ${feature.title}`}
        className="relative block aspect-[4/3] w-full overflow-hidden rounded-xl"
      >
        <Image
          src={feature.image}
          alt={feature.imageAlt}
          fill
          className="object-cover transition-transform duration-[600ms] group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 260px"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/45 via-transparent to-transparent"
          aria-hidden="true"
        />
        <span className="absolute left-3 top-3 flex h-8 min-w-8 items-center justify-center rounded-md bg-white/95 px-2 font-heading text-[11px] font-semibold tabular-nums text-[#0A1628] shadow-sm backdrop-blur">
          {stepNum}
        </span>
        <span className="absolute bottom-3 left-3 inline-flex h-8 w-8 items-center justify-center rounded-md bg-brand-blue text-white shadow-[0_6px_16px_-6px_rgba(23,111,235,0.55)]">
          <Icon className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
        </span>
      </Link>

      {/* Content */}
      <div>
        <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-blue">
          {feature.tag}
        </p>
        <h3 className="mt-2 font-display text-2xl font-normal leading-tight text-[#0A1628] md:text-[28px]">
          {feature.title}
        </h3>
        <p className="mt-3 text-[14px] leading-relaxed text-brand-graphite-mid md:max-w-[540px]">
          {feature.description}
        </p>
        <Link
          href={feature.href}
          className="mt-4 inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-brand-blue transition-colors hover:text-brand-blue-dark"
        >
          Explore {feature.title.toLowerCase()}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Stat block */}
      <div className="flex items-baseline gap-3 md:flex-col md:items-end md:gap-1 md:text-right">
        <span className="font-display text-3xl font-normal leading-none tabular-nums text-brand-blue md:text-[40px]">
          {feature.metric.value}
        </span>
        <span className="font-heading text-[10px] font-medium uppercase tracking-[0.14em] text-brand-graphite-mid">
          {feature.metric.label}
        </span>
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Main export
   ═══════════════════════════════════════════════════════════════════════════ */

export function FeatureShowcase() {
  return (
    <section className="relative overflow-hidden bg-brand-off-white py-20 md:py-28">
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-[#176FEB]/[0.02] blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Header */}
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <motion.p
            variants={revealItem}
            className="text-sm font-heading font-semibold uppercase tracking-wider text-brand-blue"
          >
            The Operating System
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mt-3 font-display text-4xl font-normal leading-[1.1] tracking-tight text-[#0A1628] md:text-5xl lg:text-6xl"
          >
            Disconnected tools cost you{' '}
            <span className="text-keyword">speed, control, and revenue</span>
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-brand-graphite-mid"
          >
            Every gap between your systems is a missed payment, a compliance failure,
            or a tenant you lose. Revun unifies it all into one infrastructure layer,
            so nothing falls through.
          </motion.p>
        </RevealOnScroll>

        {/* Editorial feature list — hairline dividers, no cards */}
        <RevealOnScroll
          className="mt-14 flex flex-col divide-y divide-[#E5E7EB] border-y border-[#E5E7EB]"
          stagger={0.06}
        >
          {features.map((f, i) => (
            <FeatureRow key={f.title} feature={f} index={i} />
          ))}
        </RevealOnScroll>
      </div>
    </section>
  )
}
