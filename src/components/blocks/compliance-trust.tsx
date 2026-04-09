'use client'

import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import { EncryptionIcon, SOC2Icon, DataResidencyIcon, UptimeIcon, PIPEDAIcon } from '@/lib/feature-icons'

/* ── Province data ──────────────────────────────────────────────────────── */

const provinces = [
  {
    name: 'Ontario',
    abbr: 'ON',
    body: 'LTB (Landlord and Tenant Board)',
    bullets: [
      'RTA-compliant lease generation',
      'Automated N-series notices (N4, N5, N12)',
      'Above-guideline increase tracking',
    ],
  },
  {
    name: 'British Columbia',
    abbr: 'BC',
    body: 'RTB (Residential Tenancy Branch)',
    bullets: [
      'Standard lease form auto-fill',
      'Dispute resolution document prep',
      'Rent increase notice scheduling',
    ],
  },
  {
    name: 'Quebec',
    abbr: 'QC',
    body: 'TAL (Tribunal administratif du logement)',
    bullets: [
      'Bail lease form generation',
      'Mandatory clause enforcement',
      'Renewal and fixation workflows',
    ],
  },
  {
    name: 'Alberta',
    abbr: 'AB',
    body: 'RTDRS (Residential Tenancy Dispute Resolution Service)',
    bullets: [
      'Periodic tenancy notice automation',
      'Security deposit tracking',
      'Dispute filing document prep',
    ],
  },
  {
    name: 'Nova Scotia',
    abbr: 'NS',
    body: 'Residential Tenancies Program',
    bullets: [
      'Standard Form of Lease compliance',
      'Rent cap calculation engine',
    ],
  },
  {
    name: 'Manitoba',
    abbr: 'MB',
    body: 'Residential Tenancies Branch',
    bullets: [
      'Guideline rent increase automation',
      'Security deposit interest calculation',
    ],
  },
]

/* ── Trust signals ──────────────────────────────────────────────────────── */

const trustSignals = [
  { label: 'Bank-Grade Encryption', icon: EncryptionIcon },
  { label: 'SOC 2 Type II', icon: SOC2Icon },
  { label: 'Canadian Data Residency', icon: DataResidencyIcon },
  { label: '99.9% Uptime SLA', icon: UptimeIcon },
  { label: 'PIPEDA Compliant', icon: PIPEDAIcon },
]

/* ── Component ──────────────────────────────────────────────────────────── */

export function ComplianceTrust() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        {/* ── Header ─────────────────────────────────────────────────── */}
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <motion.p
            variants={revealItem}
            className="text-xs font-semibold uppercase tracking-widest text-brand-blue"
          >
            Compliance
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mt-3 font-display text-4xl font-bold tracking-tight text-brand-navy md:text-5xl"
          >
            Built for <span className="text-keyword">Canadian</span> regulations
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mt-4 text-base leading-relaxed text-slate-600"
          >
            Revun natively supports provincial tenancy legislation across Canada.
            No workarounds, no manual overrides.
          </motion.p>
        </RevealOnScroll>

        {/* ── Province grid ──────────────────────────────────────────── */}
        <RevealOnScroll
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.08}
        >
          {provinces.map((prov) => (
            <motion.div
              key={prov.name}
              variants={revealItem}
              className="relative rounded-xl border border-border p-6 hover:border-brand-blue/30 transition-all duration-200 cursor-default"
            >
              <span className="absolute top-3 right-3 rounded-full bg-[#E8F2FE] px-2 py-0.5 text-xs font-semibold text-brand-blue">{prov.abbr}</span>
              <h3 className="font-heading text-lg font-semibold text-brand-navy">
                {prov.name}
              </h3>
              <p className="mt-1 text-sm text-slate-500">{prov.body}</p>
              <ul className="mt-4 space-y-2">
                {prov.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </RevealOnScroll>

        {/* ── Divider ────────────────────────────────────────────────── */}
        <div className="mx-auto my-12 h-px w-24 bg-border" />

        {/* ── Trust signals ──────────────────────────────────────────── */}
        <RevealOnScroll className="flex flex-wrap items-center justify-center gap-3">
          {trustSignals.map((signal) => (
            <motion.span
              key={signal.label}
              variants={revealItem}
              className="inline-flex items-center gap-2.5 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-slate-600"
            >
              <signal.icon className="h-5 w-5 shrink-0" />
              {signal.label}
            </motion.span>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  )
}
