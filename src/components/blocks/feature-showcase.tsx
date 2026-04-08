'use client'

import { motion } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

/* ── SVG Icons ────────────────────────────────────────────────────────────── */

function WorkflowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  )
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}

function CreditCardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  )
}

function MessageIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      <path d="M8 9h8M8 13h4" />
    </svg>
  )
}

/* ── Feature data ─────────────────────────────────────────────────────────── */

const features = [
  {
    icon: WorkflowIcon,
    title: 'Unified',
    keyword: 'workflows',
    description:
      'One system of record for tenants, owners, and vendors. No more switching between apps.',
    span: 'lg:col-span-2',
  },
  {
    icon: ShieldIcon,
    title: 'Automated',
    keyword: 'compliance',
    description:
      'Province and state-specific workflows built in. Notices, forms, and deadlines handled.',
    span: '',
  },
  {
    icon: CreditCardIcon,
    title: 'Integrated',
    keyword: 'payments',
    description:
      'Rent collection, vendor payouts, and financial reporting in one place.',
    span: '',
  },
  {
    icon: MessageIcon,
    title: 'Communications',
    keyword: 'hub',
    description:
      'Email, SMS, calling, and in-app messaging. Every conversation in context.',
    span: 'lg:col-span-2',
  },
]

/* ── Feature card ─────────────────────────────────────────────────────────── */

function FeatureCard({ feature }: { feature: (typeof features)[number] }) {
  return (
    <motion.div
      variants={revealItem}
      className={`group relative overflow-hidden rounded-xl border border-[#E5E7EB] bg-white p-8 transition-colors duration-300 hover:border-brand-blue/30 ${feature.span}`}
    >
      {/* Blue accent top bar */}
      <div
        className="absolute inset-x-0 top-0 h-[2px] bg-brand-blue"
        aria-hidden
      />

      {/* Icon */}
      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue">
        <feature.icon className="h-6 w-6 text-white" />
      </div>

      {/* Title */}
      <h3 className="font-heading text-lg font-semibold text-brand-graphite">
        {feature.title}{' '}
        <span className="text-brand-blue">{feature.keyword}</span>
      </h3>

      {/* Description */}
      <p className="mt-3 text-sm leading-relaxed text-[#555860]">
        {feature.description}
      </p>
    </motion.div>
  )
}

/* ── Feature showcase section ─────────────────────────────────────────────── */

export function FeatureShowcase() {
  return (
    <section className="bg-brand-off-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <RevealOnScroll className="text-center">
          <motion.p
            variants={revealItem}
            className="font-heading text-sm font-semibold uppercase tracking-wider text-brand-blue"
          >
            Platform
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mx-auto mt-3 max-w-xl font-heading text-3xl font-bold text-brand-graphite md:text-4xl"
          >
            Everything you need.{' '}
            <span className="text-accent">Nothing</span> you don&apos;t.
          </motion.h2>
        </RevealOnScroll>

        <RevealOnScroll className="mt-16 grid gap-5 lg:grid-cols-3" stagger={0.1}>
          {features.map((feature) => (
            <FeatureCard key={feature.keyword} feature={feature} />
          ))}
        </RevealOnScroll>
      </div>
    </section>
  )
}
