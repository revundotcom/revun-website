'use client'

import { motion } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import { Layers, DatabaseZap, ShieldAlert, MessageSquareWarning } from 'lucide-react'

const painPoints = [
  {
    icon: Layers,
    title: '5-8 disconnected tools',
    description:
      'PMs juggle CRM, email, calendars, forms, and payment tools every day. Nothing talks to anything else.',
  },
  {
    icon: DatabaseZap,
    title: 'No single source of truth',
    description:
      'Data scattered across platforms, nothing syncs in real time, and teams duplicate work constantly.',
  },
  {
    icon: ShieldAlert,
    title: 'Compliance gaps everywhere',
    description:
      'Provincial rules change quarterly. Manual tracking fails, and missed deadlines create real liability.',
  },
  {
    icon: MessageSquareWarning,
    title: 'Tenants and owners feel the chaos',
    description:
      'Slow responses, lost maintenance requests, and zero transparency erode trust and drive churn.',
  },
]

export default function ProblemSection() {
  return (
    <section className="relative overflow-hidden bg-brand-off-white py-12 md:py-16">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid bg-grid-mask opacity-[0.03]" aria-hidden="true" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-[#176FEB]/[0.04] blur-[140px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Section header */}
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <motion.p
            variants={revealItem}
            className="text-sm font-heading font-semibold uppercase tracking-wider text-brand-blue"
          >
            The Problem
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mt-3 font-display text-4xl font-normal text-[#0A1628] md:text-5xl"
          >
            Why property businesses break under{' '}
            <span className="text-keyword">disconnected systems</span>
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mx-auto mt-4 max-w-xl text-lg text-brand-graphite-mid"
          >
            Most operators run their business on a patchwork of tools that were
            never designed to work together. The result: wasted hours, compliance
            risk, and frustrated stakeholders.
          </motion.p>
        </RevealOnScroll>

        {/* Pain point cards */}
        <RevealOnScroll className="mt-14 grid gap-6 sm:grid-cols-2" stagger={0.1}>
          {painPoints.map((point, i) => (
            <motion.div
              key={point.title}
              variants={revealItem}
              className="group relative overflow-hidden rounded-2xl border border-border bg-white p-8 transition-all duration-300 hover:border-brand-blue/30 hover:shadow-card-hover hover:-translate-y-1"
            >
              {/* Top gradient accent bar */}
              <div
                className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand-blue via-[#4A91F0] to-brand-blue scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"
                aria-hidden="true"
              />

              {/* Corner glow */}
              <div
                className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-brand-blue/[0.06] blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden="true"
              />

              {/* Step number watermark */}
              <span
                className="absolute top-4 right-5 font-display text-[56px] font-bold leading-none text-brand-blue/[0.04] transition-colors duration-300 group-hover:text-brand-blue/[0.08] select-none"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Icon with animated ring */}
              <div className="relative mb-5 flex h-14 w-14 items-center justify-center">
                <div className="absolute inset-0 rounded-xl bg-brand-blue/8 transition-all duration-300 group-hover:bg-brand-blue/12 group-hover:scale-110" />
                <div className="absolute inset-0 rounded-xl ring-1 ring-brand-blue/0 transition-all duration-300 group-hover:ring-brand-blue/20" />
                <point.icon className="relative z-10 h-6 w-6 text-brand-blue transition-transform duration-300 group-hover:scale-110" />
              </div>

              <h3 className="font-heading text-lg font-semibold text-[#0A1628] transition-colors duration-200 group-hover:text-brand-blue">
                {point.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-graphite-mid">
                {point.description}
              </p>

              {/* Bottom-right arrow indicator */}
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-brand-blue/0 transition-all duration-300 group-hover:text-brand-blue/70">
                <span>Learn more</span>
                <svg className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2}><path d="M2 6h8M7 3l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
            </motion.div>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  )
}
