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
      'Leasing, payments, maintenance, and communications run on one ledger. No more toggling between disconnected tools to piece together a tenant, a unit, or a dollar.',
    icon: Workflow,
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Modern office workspace with unified team operations',
    metric: { value: '5 → 1', label: 'tools replaced' },
    href: '/platform/',
    accent: '#176FEB',
  },
  {
    title: 'Compliance Engine',
    tag: 'Rules enforced automatically',
    description:
      'Provincial and state rules change quarterly. Revun enforces them automatically: notices, forms, deadlines, and audit trails generated on every action, not after.',
    icon: ShieldCheck,
    image:
      'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Legal and compliance documents on a desk, provincial regulatory compliance',
    metric: { value: '10 / 10', label: 'provinces monitored' },
    href: '/features/compliance/',
    accent: '#0B5AD4',
  },
  {
    title: 'Payments Infrastructure',
    tag: 'Every dollar reconciled',
    description:
      'Rent collection, owner disbursements, vendor payouts, and trust accounting run through one ledger: auto-reconciled, audit-ready, and on schedule every time.',
    icon: Wallet,
    image:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Financial reports and transactions, payments infrastructure',
    metric: { value: '97.8%', label: 'on-time collection' },
    href: '/features/rent-collection/',
    accent: '#4A91F0',
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
      'One missed payment cascades into owner distrust and cash-flow pressure. Built-in rent coverage protects your revenue and shields owner confidence.',
    icon: Umbrella,
    image:
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Protected rental home, rent protection and coverage',
    metric: { value: 'Up to $60K', label: 'rent coverage' },
    href: '/features/',
    accent: '#0B5AD4',
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
    accent: '#4A91F0',
  },
]

/* -- Feature card - clean, editorial, image-led ------------------------- */

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const Icon = feature.icon
  return (
    <motion.div
      variants={revealItem}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Image header */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={feature.image}
          alt={feature.imageAlt}
          fill
          className="object-cover transition-transform duration-[600ms] group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, transparent 45%, ${feature.accent}80 100%)`,
          }}
          aria-hidden="true"
        />

        {/* Floating icon + tag */}
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-xl shadow-lg"
            style={{ backgroundColor: feature.accent }}
          >
            <Icon className="h-5 w-5 text-white" />
          </span>
          <span className="rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-[#0A1628] shadow-sm backdrop-blur">
            {String(index + 1).padStart(2, '0')} &nbsp;·&nbsp; {feature.tag}
          </span>
        </div>

        {/* Floating metric pill (bottom-right) */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 shadow-sm backdrop-blur">
          <span
            className="font-heading text-sm font-bold"
            style={{ color: feature.accent }}
          >
            {feature.metric.value}
          </span>
          <span className="text-[10px] font-medium text-[#555860]">
            {feature.metric.label}
          </span>
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-heading text-lg font-semibold leading-snug text-[#0A1628]">
          {feature.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-graphite-mid">
          {feature.description}
        </p>
        <Link
          href={feature.href}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
          style={{ color: feature.accent }}
        >
          Explore {feature.title.toLowerCase()}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
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

        {/* 6-feature grid */}
        <RevealOnScroll
          className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          stagger={0.08}
        >
          {features.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </RevealOnScroll>
      </div>
    </section>
  )
}
