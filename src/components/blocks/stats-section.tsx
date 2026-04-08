'use client'

import { motion } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

/* ── Stat data ────────────────────────────────────────────────────────────── */

const stats = [
  { value: '12,000+', label: 'Units on Platform' },
  { value: '99.9%', label: 'Uptime' },
  { value: '40+', label: 'Integrations' },
  { value: '2', label: 'Countries' },
] as const

/* ── Stats section ────────────────────────────────────────────────────────── */

export function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-brand-navy py-20 md:py-24">
      {/* Thin decorative lines at top and bottom */}
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute left-1/2 top-0 h-px w-[60%] -translate-x-1/2 bg-white/5" />
        <div className="absolute left-1/2 bottom-0 h-px w-[60%] -translate-x-1/2 bg-white/5" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <RevealOnScroll className="grid grid-cols-2 gap-y-12 md:grid-cols-4" stagger={0.1}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={revealItem}
              className="relative flex flex-col items-center text-center"
            >
              {/* Divider lines between stats (hidden on mobile) */}
              {i > 0 && (
                <div
                  className="absolute left-0 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-white/10 md:block"
                  aria-hidden
                />
              )}

              <span className="font-display text-4xl tracking-tight text-white md:text-5xl">
                {stat.value}
              </span>

              <span className="mt-2 text-sm font-medium text-[#64748B]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  )
}
