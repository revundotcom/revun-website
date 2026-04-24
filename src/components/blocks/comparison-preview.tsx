'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Check, X } from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

/* ═══════════════════════════════════════════ */
/*  Comparison data                            */
/* ═══════════════════════════════════════════ */
const rows = [
  {
    feature: 'Canada readiness',
    revun: true,
    others: 'US-first',
  },
  {
    feature: 'Full-stack capability',
    revun: true,
    others: 'Partial / Point solution',
  },
  {
    feature: 'Built-in communications',
    revun: true,
    others: 'Add-on / Not included',
  },
  {
    feature: 'Built-in maintenance',
    revun: true,
    others: 'Separate tool',
  },
  {
    feature: 'Brokerage & leasing workflows',
    revun: true,
    others: 'Not included',
  },
  {
    feature: 'Payments & owner disbursements',
    revun: true,
    others: 'Basic / Third-party',
  },
  {
    feature: 'Compliance depth',
    revun: true,
    others: 'Limited / Manual',
  },
  {
    feature: 'User-role flexibility',
    revun: true,
    others: 'One-size-fits-all',
  },
  {
    feature: 'Tenant experience',
    revun: true,
    others: 'Basic portal',
  },
  {
    feature: 'Data unification',
    revun: true,
    others: 'Fragmented',
  },
  {
    feature: 'Total stack replaced',
    revun: true,
    others: '1-2 tools only',
  },
]

/* ═══════════════════════════════════════════ */
/*  Main export                                */
/* ═══════════════════════════════════════════ */
export default function ComparisonPreview() {
  return (
    <section className="overflow-hidden bg-white py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        {/* Section header */}
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <motion.p
            variants={revealItem}
            className="text-sm font-heading font-semibold uppercase tracking-wider text-brand-blue"
          >
            Why Revun
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mt-3 font-display text-3xl font-normal text-[#0A1628] md:text-5xl"
          >
            Why operators are <span className="text-keyword">switching to Revun</span>
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mx-auto mt-4 max-w-xl text-base md:text-lg text-brand-graphite-mid"
          >
            Compare Revun against fragmented legacy software, US-first
            platforms, and point solutions.
          </motion.p>
        </RevealOnScroll>

        {/* Comparison grid */}
        <RevealOnScroll className="mx-auto mt-14 max-w-2xl">
          <motion.div
            variants={revealItem}
            className="overflow-hidden rounded-xl border border-border bg-white shadow-sm"
          >
            {/* Header row */}
            <div className="grid grid-cols-3 border-b border-border bg-[#FAFBFC]">
              <div className="px-3 md:px-6 py-4">
                <span className="text-sm font-semibold text-brand-graphite-mid">Feature</span>
              </div>
              <div className="px-3 md:px-6 py-4 text-center">
                <span className="text-sm font-bold text-brand-blue">Revun</span>
              </div>
              <div className="px-3 md:px-6 py-4 text-center">
                <span className="text-sm font-semibold text-brand-graphite-mid">Others</span>
              </div>
            </div>

            {/* Data rows */}
            {rows.map((row, i) => (
              <motion.div
                key={row.feature}
                className={`grid grid-cols-3 items-center ${
                  i < rows.length - 1 ? 'border-b border-border' : ''
                }`}
                variants={revealItem}
              >
                <div className="px-3 md:px-6 py-4">
                  <span className="text-sm font-medium text-brand-graphite">
                    {row.feature}
                  </span>
                </div>
                <div className="flex justify-center px-3 md:px-6 py-4">
                  {row.revun ? (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#22C55E]/10">
                      <Check className="h-3.5 w-3.5 text-[#22C55E]" />
                    </span>
                  ) : (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-error/10">
                      <X className="h-3.5 w-3.5 text-brand-error" />
                    </span>
                  )}
                </div>
                <div className="flex justify-center px-3 md:px-6 py-4">
                  <span className="rounded-full bg-brand-off-white px-3 py-1 text-xs font-medium text-brand-graphite-mid">
                    {row.others}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </RevealOnScroll>

        {/* CTA */}
        <RevealOnScroll className="mt-10 text-center">
          <motion.div variants={revealItem}>
            <Link
              href="/compare/"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-6 py-3 text-sm font-semibold text-brand-graphite transition-all duration-200 hover:border-brand-blue/30 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
            >
              See Full Comparisons
              <ArrowRight className="h-4 w-4 text-brand-blue" />
            </Link>
          </motion.div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
