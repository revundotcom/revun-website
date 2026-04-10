'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Rocket,
  CreditCard,
  Home,
  Building2,
  Puzzle,
  LifeBuoy,
  Search,
  Users,
  Briefcase,
  KeyRound,
  Wrench,
  ShieldCheck,
} from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'
import { sanitizeJsonLd } from '@/lib/utils'
import { heroStagger, fadeUp } from '@/lib/motion'

/* ── Data ────────────────────────────────────────────────────────────── */

const categories = [
  {
    slug: 'getting-started',
    title: 'Getting Started',
    description: 'Set up your account, add properties, and learn the basics.',
    icon: Rocket,
  },
  {
    slug: 'owners',
    title: 'Owners',
    description: 'Owner portals, statements, distributions, and reporting guides.',
    icon: KeyRound,
  },
  {
    slug: 'tenants',
    title: 'Tenants',
    description: 'Rent payments, maintenance requests, lease documents, and self-service tools.',
    icon: Home,
  },
  {
    slug: 'property-managers',
    title: 'Property Managers',
    description: 'Day-to-day operations, portfolio management, and workflow automation.',
    icon: Building2,
  },
  {
    slug: 'brokerages',
    title: 'Brokerages',
    description: 'Agent onboarding, transaction management, and CRM configuration.',
    icon: Briefcase,
  },
  {
    slug: 'leasing-teams',
    title: 'Leasing Teams',
    description: 'Listings, applications, screening, showings, and lease execution.',
    icon: Users,
  },
  {
    slug: 'maintenance-teams',
    title: 'Maintenance Teams',
    description: 'Work orders, vendor dispatch, inspections, and field coordination.',
    icon: Wrench,
  },
  {
    slug: 'billing',
    title: 'Billing',
    description: 'Manage your subscription, payment methods, invoices, and pricing plans.',
    icon: CreditCard,
  },
  {
    slug: 'integrations',
    title: 'Integrations',
    description: 'Connect Revun with your existing tools and third-party platforms.',
    icon: Puzzle,
  },
  {
    slug: 'compliance',
    title: 'Compliance',
    description: 'Provincial regulations, lease requirements, privacy rules, and audit trails.',
    icon: ShieldCheck,
  },
]

/* ── Page ─────────────────────────────────────────────────────────────── */

export default function HelpPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Support & Training', url: 'https://revun.com/help/' },
            ])
          ),
        }}
      />
      {/* ── Hero with search ──────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#F5F6F8]">
        <motion.div
          className="relative z-10 mx-auto max-w-3xl px-6 pt-24 pb-16 text-center"
          variants={heroStagger}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={fadeUp}
            className="font-display font-extrabold text-4xl leading-[1.1] tracking-tight text-[#0A1628] sm:text-5xl"
          >
            Support and{' '}
            <span className="text-[#176FEB]">training</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#555860]"
          >
            Find guides, tutorials, and answers organized by role and product area.
          </motion.p>

          {/* Search bar (visual only for MVP) */}
          <motion.div
            variants={fadeUp}
            className="mx-auto mt-10 max-w-xl"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#94A3B8]" />
              <input
                type="text"
                placeholder="Search for help articles..."
                className="h-13 w-full rounded-xl border border-[#E5E7EB] bg-white py-3.5 pl-12 pr-4 text-base text-[#0A1628] placeholder:text-[#94A3B8] transition-colors focus:border-[#176FEB] focus:outline-none focus:ring-2 focus:ring-[#176FEB]/30"
                readOnly
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Category cards ────────────────────────────────────────── */}
      <section className="bg-[#F5F6F8] py-12">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll
            stagger={0.08}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {categories.map((cat) => {
              const Icon = cat.icon
              return (
                <motion.div key={cat.slug} variants={revealItem}>
                  <Link
                    href={`/help/${cat.slug}/`}
                    className="group flex flex-col rounded-2xl border border-[#D3D5DB] bg-white p-8 transition-colors hover:border-[#176FEB]/40"
                  >
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F2FE] text-[#176FEB]">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </div>
                    <h2 className="font-heading text-lg font-bold text-foreground">
                      {cat.title}
                    </h2>
                    <p className="mt-2 flex-1 text-[0.938rem] leading-relaxed text-muted-foreground">
                      {cat.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue transition-colors group-hover:underline">
                      Browse articles
                      <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                        &rarr;
                      </span>
                    </span>
                  </Link>
                </motion.div>
              )
            })}
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Contact CTA ───────────────────────────────────────────── */}
      <section className="bg-white py-12">
        <RevealOnScroll className="mx-auto max-w-2xl px-6 text-center">
          <motion.h2
            variants={revealItem}
            className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Can't find what you need?
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mt-4 text-lg leading-relaxed text-muted-foreground"
          >
            Our support team is here to help. Reach out and we will get back to you within one business day.
          </motion.p>
          <motion.div
            variants={revealItem}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/contact/"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-blue px-8 text-base font-semibold text-white transition-colors hover:bg-brand-blue-dark"
            >
              Contact Support
            </Link>
            <Link
              href="/support/"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-border px-8 text-base font-semibold text-foreground transition-colors hover:bg-muted"
            >
              Back to Support
            </Link>
          </motion.div>
        </RevealOnScroll>
      </section>
    </>
  )
}
