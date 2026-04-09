'use client'

import { motion } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import {
  LeaseGenerationIcon,
  ProvinceTemplatesIcon,
  DigitalSignaturesIcon,
  ComplianceTrackingIcon,
} from '@/lib/feature-icons'

const features = [
  {
    icon: LeaseGenerationIcon,
    title: 'Automated Lease Generation',
    description: 'Generate province and state-specific leases with pre-filled clauses and regulatory requirements.',
  },
  {
    icon: ProvinceTemplatesIcon,
    title: 'Provincial/State Templates',
    description: 'Pre-built templates for every Canadian province and US state. Always up to date with legislation.',
  },
  {
    icon: DigitalSignaturesIcon,
    title: 'Digital Signatures',
    description: 'Legally binding e-signatures for leases, notices, and amendments. No printing required.',
  },
  {
    icon: ComplianceTrackingIcon,
    title: 'Compliance Tracking',
    description: 'Automated deadline tracking, notice scheduling, and regulatory filing reminders across jurisdictions.',
  },
]

export function DocumentCompliance() {
  return (
    <section className="bg-brand-off-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <motion.p
            variants={revealItem}
            className="text-sm font-heading font-semibold uppercase tracking-wider text-brand-blue"
          >
            Documents & Compliance
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mt-3 font-display text-4xl font-normal text-brand-graphite md:text-5xl"
          >
            Every document. Every <span className="text-keyword">jurisdiction</span>.
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mx-auto mt-4 max-w-xl text-lg text-brand-graphite/70"
          >
            Automated document generation and compliance tracking built for
            Canadian and US regulatory requirements.
          </motion.p>
        </RevealOnScroll>

        <RevealOnScroll className="mt-14 grid gap-6 sm:grid-cols-2" stagger={0.1}>
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={revealItem}
              className="group relative rounded-xl border border-border bg-white p-8 transition-all duration-200 hover:border-brand-blue/20 hover:shadow-card-hover"
            >
              <div className="absolute inset-x-0 top-0 h-[2px] bg-brand-blue opacity-0 transition-opacity duration-200 group-hover:opacity-100" aria-hidden="true" />
              <div className="mb-5">
                <feature.icon className="h-12 w-12" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-brand-graphite">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-graphite-mid">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  )
}
