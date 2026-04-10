'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import { PropertyOwnerIcon, PropertyManagerIcon, TenantIcon } from '@/lib/feature-icons'

/* ── Audience data ── */

const audiences = [
  {
    id: 'owners',
    tab: 'Property Owners',
    icon: PropertyOwnerIcon,
    headline: 'Run your rentals like a full property operation.',
    description:
      'List units, screen tenants, generate leases, collect rent, manage maintenance, communicate securely, and track everything from one system.',
    bullets: [
      'Tenant screening with credit, criminal & eviction checks',
      'Automated rent collection via ACH, card & Interac',
      'Maintenance requests with vendor dispatch',
      'Provincial lease templates auto-filled',
      'List on 20+ sites with one click',
    ],
    stats: [
      { value: '$1/day', label: 'Starting price' },
      { value: '20+', label: 'Listing sites' },
      { value: '< 5 min', label: 'To list a unit' },
    ],
    href: '/solutions/self-managing-owners/',
    color: '#176FEB',
  },
  {
    id: 'managers',
    tab: 'Property Managers',
    icon: PropertyManagerIcon,
    headline: 'Run your entire property management company on one system.',
    description:
      'Owners, tenants, vendors, maintenance, compliance, communications, reporting, leasing, and payments all run through Revun.',
    bullets: [
      'Portfolio-wide analytics & reporting dashboard',
      'White-label owner portals with live financials',
      'Team management with role-based permissions',
      'Automated compliance across all provinces',
      'Vendor management & invoice reconciliation',
    ],
    stats: [
      { value: '5+', label: 'Tools replaced' },
      { value: '60%', label: 'Less admin time' },
      { value: '847', label: 'Avg units managed' },
    ],
    href: '/solutions/property-management-companies/',
    color: '#0B5AD4',
  },
  {
    id: 'tenants',
    tab: 'Tenants',
    icon: TenantIcon,
    headline: 'One secure portal for your entire rental experience.',
    description:
      'Browse listings, apply online, pay rent, submit maintenance requests, communicate with your property team, and access all your documents in one place.',
    bullets: [
      'Browse verified listings with virtual tours',
      'Apply online in under 2 minutes',
      'Pay rent via any method, auto-reminders included',
      'Submit & track maintenance requests in real time',
      '24/7 portal access from any device',
    ],
    stats: [
      { value: '24/7', label: 'Portal access' },
      { value: '< 2 min', label: 'To apply' },
      { value: '98%', label: 'Satisfaction' },
    ],
    href: '/solutions/tenants/',
    color: '#4A91F0',
  },
]

/* ── Section ── */

export function AudienceRouter() {
  const [active, setActive] = useState(0)
  const audience = audiences[active]

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <motion.p
            variants={revealItem}
            className="text-sm font-heading font-semibold uppercase tracking-wider text-brand-blue"
          >
            Solutions
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mt-3 font-display text-4xl font-normal text-brand-graphite md:text-5xl"
          >
            Built for every role in <span className="text-keyword">property operations</span>
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mx-auto mt-4 max-w-2xl text-lg text-brand-graphite/70"
          >
            Whether you manage one unit, one hundred units, or an entire national portfolio, Revun gives every role the exact workflows, controls, and visibility they need.
          </motion.p>
        </RevealOnScroll>

        {/* Tab selector */}
        <RevealOnScroll className="mt-12">
          <motion.div
            variants={revealItem}
            className="mx-auto flex w-fit rounded-full border border-border bg-brand-off-white p-1"
          >
            {audiences.map((a, i) => {
              const Icon = a.icon
              const isActive = active === i
              return (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-white'
                      : 'text-brand-graphite-mid hover:text-brand-graphite'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="audience-tab-bg"
                      className="absolute inset-0 rounded-full bg-brand-blue"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{a.tab}</span>
                  </span>
                </button>
              )
            })}
          </motion.div>
        </RevealOnScroll>

        {/* Content panel */}
        <div className="mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={audience.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid items-start gap-12 lg:grid-cols-2"
            >
              {/* Left: text content */}
              <div>
                <h3 className="font-display text-3xl font-normal text-brand-graphite md:text-4xl">
                  {audience.headline}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-brand-graphite-mid">
                  {audience.description}
                </p>

                {/* Checklist */}
                <ul className="mt-8 space-y-3">
                  {audience.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                        style={{ backgroundColor: `${audience.color}12` }}
                      >
                        <Check className="h-3 w-3" style={{ color: audience.color }} />
                      </span>
                      <span className="text-sm text-brand-graphite-mid">{bullet}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={audience.href}
                  className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue transition-colors hover:text-brand-blue-dark"
                >
                  Explore {audience.tab.toLowerCase()} solutions
                  <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Right: stats panel */}
              <div className="rounded-2xl border border-border bg-brand-off-white p-8 lg:p-10">
                <p className="text-xs font-heading font-semibold uppercase tracking-wider text-[#94A3B8] mb-6">
                  Key numbers
                </p>
                <div className="space-y-6">
                  {audience.stats.map((stat, i) => (
                    <div key={stat.label}>
                      <div className="flex items-baseline justify-between">
                        <span
                          className="font-heading text-3xl font-bold md:text-4xl"
                          style={{ color: audience.color }}
                        >
                          {stat.value}
                        </span>
                        <span className="text-sm text-brand-graphite-mid">{stat.label}</span>
                      </div>
                      {i < audience.stats.length - 1 && (
                        <div className="mt-4 h-px bg-border" />
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Link
                    href={audience.href}
                    className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-brand-blue px-6 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-blue-dark"
                  >
                    Get started as {audience.tab.toLowerCase().replace('property ', '')}
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}