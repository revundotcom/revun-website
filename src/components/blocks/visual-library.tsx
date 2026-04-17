'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import {
  Building2,
  FileSignature,
  DollarSign,
  MessageSquare,
  Shield,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import { FeatureMockup, type MockupType } from '@/components/ui/feature-mockup'

/* ═══════════════════════════════════════════════════════════════════════════
   Visual entries - real imagery, real pain/resolution narrative
   ═══════════════════════════════════════════════════════════════════════════ */

interface VisualEntry {
  title: string
  pain: string
  resolution: string
  mockup: MockupType
  mockupLabel: string
  imageAlt: string
  tag: string
}

const visuals: VisualEntry[] = [
  // -- Pillar 1 - Property & Tenant Management (3)
  {
    title: 'Owner dashboard',
    tag: 'Portfolio visibility',
    pain: 'You check three different spreadsheets, two bank accounts, and an email thread just to know where your portfolio stands today.',
    resolution: 'Revun shows occupancy, collections, and overdue balances in one owner dashboard, updated in real time, every time.',
    mockup: 'dashboard',
    mockupLabel: 'Portfolio overview',
    imageAlt: 'Revun Pro owner dashboard preview with occupancy, collections, and portfolio metrics',
  },
  {
    title: 'Tenant portal',
    tag: 'Self-serve living',
    pain: 'Tenants call, text, and email your personal number for everything from rent to repairs. Nothing gets tracked.',
    resolution: 'Every tenant gets a self-serve portal for payments, maintenance, documents, and lease actions, all logged automatically.',
    mockup: 'portal',
    mockupLabel: 'Tenant portal',
    imageAlt: 'Revun tenant portal preview with rent payment and self-serve actions',
  },
  {
    title: 'Listings & tour booking',
    tag: 'Search + self-schedule',
    pain: 'Prospective tenants bounce between listing sites, miss availability updates, and chase you for tour times.',
    resolution: 'Revun runs a branded listings engine with live availability, and prospects self-schedule tours straight from your calendar.',
    mockup: 'listings',
    mockupLabel: 'Property listings',
    imageAlt: 'Revun property search and tour booking preview with live availability',
  },

  // -- Pillar 2 - Leasing & Screening (3)
  {
    title: 'Offer submission',
    tag: 'Structured applications',
    pain: 'Applications arrive by email, PDF, and text: half incomplete, impossible to compare, and none verified.',
    resolution: 'Revun captures applications in a structured pipeline with verification, credit checks, and scoring, so every applicant is treated equally.',
    mockup: 'document',
    mockupLabel: 'Rental application',
    imageAlt: 'Revun rental application with structured verification fields',
  },
  {
    title: 'Screening & verification',
    tag: 'Identity + credit',
    pain: 'You call references manually, accept unverified IDs, and chase income documents for days.',
    resolution: 'Revun runs government ID verification, selfie matching, and Equifax credit reports in one automated flow. Applicants are verified in minutes.',
    mockup: 'document',
    mockupLabel: 'Screening report',
    imageAlt: 'Revun screening report with ID, credit, and income verification',
  },
  {
    title: 'Lease generation',
    tag: 'Signed in minutes',
    pain: 'You draft leases manually, miss provincial clauses, and chase signatures for weeks.',
    resolution: 'Revun auto-generates province-compliant lease documents with pre-filled terms and sends them for digital signature in minutes.',
    mockup: 'document',
    mockupLabel: 'Lease agreement',
    imageAlt: 'Revun auto-generated lease agreement ready to sign',
  },

  // -- Pillar 3 - Financial Operations (3)
  {
    title: 'Wallet & owner disbursements',
    tag: 'Automated payouts',
    pain: 'Owner payouts involve manual calculations, spreadsheet reconciliation, and delayed transfers that erode trust.',
    resolution: 'Revun calculates net payouts automatically and disburses on schedule with a full audit trail: rent, fees, reserves, expenses, all reconciled.',
    mockup: 'dashboard',
    mockupLabel: 'Wallet & disbursements',
    imageAlt: 'Revun wallet dashboard with owner disbursement schedule and ledger entries',
  },
  {
    title: 'Accounting & reporting',
    tag: 'Real-time ledger',
    pain: 'Your bookkeeper reconciles rent, expenses, and trust balances across three disconnected systems every month.',
    resolution: 'Revun runs a real-time ledger with auto-reconciliation, trust accounting, and one-click reporting, ready for your accountant or auditor.',
    mockup: 'dashboard',
    mockupLabel: 'Accounting ledger',
    imageAlt: 'Revun accounting dashboard with live ledger and reconciled transactions',
  },
  {
    title: 'Maintenance & work orders',
    tag: 'Dispatch + invoice',
    pain: 'Tenants report issues by text, vendors invoice by email, and you lose every thread within hours.',
    resolution: 'Every request is captured with photos and categories, dispatched to the right vendor, and invoiced straight into the ledger.',
    mockup: 'chat',
    mockupLabel: 'Maintenance request',
    imageAlt: 'Revun maintenance thread with vendor dispatch and invoice reconciliation',
  },

  // -- Pillar 4 - Communications & Operations (3)
  {
    title: 'Operations dashboard',
    tag: 'Live portfolio feed',
    pain: 'You have no single view of what happened today, leases signed, payments received, work orders opened, until you aggregate it manually.',
    resolution: 'Revun surfaces a live operations feed of every event across your portfolio: leases, payments, maintenance, tours, all in one command centre.',
    mockup: 'dashboard',
    mockupLabel: 'Live operations',
    imageAlt: 'Revun operations command centre with live portfolio event feed',
  },
  {
    title: 'Team inbox',
    tag: 'Tagged + assigned',
    pain: 'Tenant messages, vendor invoices, and compliance notices land in five different inboxes that nobody owns.',
    resolution: 'Revun routes every inbound message to one team inbox: tagged, prioritized, and assignable so nothing falls through.',
    mockup: 'chat',
    mockupLabel: 'Team inbox',
    imageAlt: 'Revun team inbox with tags and assignments',
  },
  {
    title: 'Unit conversations',
    tag: 'One thread per unit',
    pain: 'Context about a unit lives across emails, texts, forms, and PDFs, and nobody on your team can find it fast.',
    resolution: 'Revun keeps every conversation, request, document, and transaction inside one record: full audit trail, no context switching.',
    mockup: 'chat',
    mockupLabel: 'Unit conversation',
    imageAlt: 'Revun unified conversation thread linked to a specific unit',
  },

  // -- Pillar 5 - Administration & Intelligence (3)
  {
    title: 'AI assistant flows',
    tag: 'Ops on autopilot',
    pain: 'Manual triage, vendor matching, and tenant follow-ups consume hours that should go to growth.',
    resolution: 'Revun deploys AI that classifies issues, matches vendors, schedules appointments, and notifies tenants, automatically, in seconds.',
    mockup: 'chat',
    mockupLabel: 'AI assistant',
    imageAlt: 'Revun AI assistant auto-triaging a tenant request and dispatching a vendor',
  },
  {
    title: 'Portfolio analytics',
    tag: 'NOI, cap rate, trend',
    pain: 'You calculate NOI, cap rates, and occupancy across properties manually, and the numbers are always a month behind.',
    resolution: 'Revun surfaces real-time portfolio analytics: NOI by property, occupancy trends, average rent, and cap rate, updated as transactions happen.',
    mockup: 'dashboard',
    mockupLabel: 'Portfolio analytics',
    imageAlt: 'Revun portfolio analytics dashboard with NOI, cap rate, and occupancy charts',
  },
  {
    title: 'Vendor network',
    tag: 'Rated + routed',
    pain: 'You track vendors in a spreadsheet, chase invoices by email, and have no visibility into performance or coverage.',
    resolution: 'Every vendor gets a portal with dispatch, invoicing, ratings, and job history, so the right contractor shows up every time.',
    mockup: 'listings',
    mockupLabel: 'Vendor roster',
    imageAlt: 'Revun vendor network with dispatch, ratings, and invoice reconciliation',
  },
]

/* ═══════════════════════════════════════════════════════════════════════════
   Categories - 5 pillars with hero imagery + plain-English explanations
   ═══════════════════════════════════════════════════════════════════════════ */

interface Category {
  name: string
  tagline: string
  plainEnglish: string
  icon: LucideIcon
  entries: number[]
  bannerImage: string
  bannerAlt: string
  highlights: string[]
  accent: string
}

const categories: Category[] = [
  {
    name: 'Property & Tenant Management',
    tagline: 'Find homes. Rent them out. Keep tenants happy.',
    plainEnglish:
      'Everything owners, tenants, and prospects touch: from browsing listings and booking tours, to moving in and managing daily life in the unit.',
    icon: Building2,
    entries: [0, 1, 2],
    bannerImage:
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80',
    bannerAlt: 'Modern residential building, homes being rented through Revun',
    highlights: [
      'Branded owner + tenant dashboards',
      'Real-time listing search and availability',
      'Self-serve tour scheduling, synced to your calendar',
    ],
    accent: '#176FEB',
  },
  // --- accent palette below uses only brand-blue variants ---
  {
    name: 'Leasing & Screening',
    tagline: 'Turn applications into signed leases, safely.',
    plainEnglish:
      'A safe, fast path from "I want this unit" to "welcome home", with identity checks, credit reports, and provincial lease templates already built in.',
    icon: FileSignature,
    entries: [3, 4, 5],
    bannerImage:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80',
    bannerAlt: 'Signing a lease agreement, digital leasing and screening',
    highlights: [
      'Government ID + selfie verification',
      'Equifax credit and risk reports',
      'Province-compliant leases auto-generated',
    ],
    accent: '#0B5AD4',
  }, // brand-blue-dark
  {
    name: 'Financial Operations',
    tagline: 'Rent comes in. Owners get paid. Books balance.',
    plainEnglish:
      'Every dollar that moves through your property business, rent, fees, owner payouts, vendor invoices, tracked automatically, so nothing goes missing.',
    icon: DollarSign,
    entries: [6, 7, 8],
    bannerImage:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80',
    bannerAlt: 'Financial reports and accounting, property finances on Revun',
    highlights: [
      'Automated rent collection + receipts',
      'Owner disbursements on schedule, every time',
      'Trust-compliant accounting and one-click reports',
    ],
    accent: '#176FEB',
  }, // brand-blue
  {
    name: 'Communications & Operations',
    tagline: 'One inbox. Every conversation. Nothing lost.',
    plainEnglish:
      'Every message from tenants, owners, and vendors lands in one shared place: tagged, assigned, and linked to the right unit, so your team never drops a ball.',
    icon: MessageSquare,
    entries: [9, 10, 11],
    bannerImage:
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1600&q=80',
    bannerAlt: 'Property team collaborating around a unified communications inbox',
    highlights: [
      'Unified inbox for tenants, vendors, and owners',
      'Full audit trail on every conversation',
      'Live operations feed across your portfolio',
    ],
    accent: '#4A91F0',
  }, // brand-blue-light
  {
    name: 'Administration & Intelligence',
    tagline: 'Control access. Automate decisions. See everything.',
    plainEnglish:
      'Who can do what, what your AI handles without you, which vendors perform, and how your whole portfolio is performing, all in one command centre.',
    icon: Shield,
    entries: [12, 13, 14],
    bannerImage:
      'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80',
    bannerAlt: 'Operations command centre with live portfolio analytics and AI automation',
    highlights: [
      'Role-based permissions for every team member',
      'AI that triages tickets and matches vendors',
      'Compliance auto-updated when rules change',
    ],
    accent: '#0B5AD4',
  }, // brand-blue-dark
]

/* ═══════════════════════════════════════════════════════════════════════════
   Featured entry - first card per pillar, full-width editorial layout
   ═══════════════════════════════════════════════════════════════════════════ */

function FeaturedEntry({ entry, index, accent }: { entry: VisualEntry; index: number; accent: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group grid overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white transition-all duration-300 hover:shadow-xl md:grid-cols-[1.1fr_1fr]"
    >
      {/* Mockup zone - clean accent-tinted canvas, NO overlays on top of the app chrome */}
      <div
        className="relative flex aspect-[16/10] w-full items-center justify-center p-5 md:aspect-auto md:p-6 lg:p-8"
        style={{ background: `linear-gradient(135deg, ${accent}0A 0%, ${accent}1C 100%)` }}
      >
        {/* Decorative grid pattern */}
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.06]" aria-hidden="true" />

        {/* Soft glow behind mockup */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: `${accent}22` }}
          aria-hidden="true"
        />

        {/* The mockup itself */}
        <div className="relative h-full w-full overflow-hidden rounded-xl border border-[#E5E7EB] bg-white shadow-[0_30px_80px_-30px_rgba(10,22,40,0.3)] transition-transform duration-[600ms] group-hover:-translate-y-1">
          <FeatureMockup
            type={entry.mockup}
            accent={accent}
            subtitle={entry.mockupLabel}
            className="h-full w-full"
          />
        </div>
      </div>

      {/* Text panel */}
      <div className="flex flex-col justify-center gap-5 p-6 md:p-8 lg:p-10">
        {/* Tag row - moved out of the mockup, now lives above the title */}
        <div className="flex items-center gap-2">
          <span
            className="flex h-5 w-5 items-center justify-center rounded-md text-[10px] font-bold text-white"
            style={{ backgroundColor: accent }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-[10px] font-heading font-semibold uppercase tracking-[0.16em] text-brand-graphite-mid">
            Featured
          </span>
          <span className="h-3 w-px bg-border" aria-hidden="true" />
          <span
            className="text-[10px] font-heading font-semibold uppercase tracking-[0.12em]"
            style={{ color: accent }}
          >
            {entry.tag}
          </span>
        </div>

        <h4 className="font-display text-2xl font-normal leading-tight text-[#0A1628] md:text-3xl">
          {entry.title}
        </h4>

        <div className="flex gap-3">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EEF0F3]">
            <span className="h-2 w-2 rounded-full bg-[#555860]" />
          </span>
          <div>
            <p className="text-[10px] font-heading font-semibold uppercase tracking-wider text-[#555860]">
              Before Revun
            </p>
            <p className="mt-1 text-sm leading-relaxed text-[#555860]">{entry.pain}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <span
            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: `${accent}1A` }}
          >
            <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke={accent} strokeWidth={2.5}>
              <path d="M2 6l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div>
            <p className="text-[10px] font-heading font-semibold uppercase tracking-wider" style={{ color: accent }}>
              With Revun
            </p>
            <p className="mt-1 text-sm leading-relaxed text-[#0A1628]">{entry.resolution}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Standard entry card - compact 3-col grid companion to featured entry
   ═══════════════════════════════════════════════════════════════════════════ */

function VisualEntryRow({ entry, index, accent }: { entry: VisualEntry; index: number; accent: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-20px_rgba(10,22,40,0.15)]"
    >
      {/* Header row - tag + number + arrow chip, all OUTSIDE the mockup area */}
      <div className="flex items-center justify-between border-b border-[#EEF0F3] px-5 py-3.5">
        <div className="flex items-center gap-2">
          <span
            className="flex h-5 w-5 items-center justify-center rounded-md text-[9px] font-bold text-white"
            style={{ backgroundColor: accent }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <span
            className="text-[10px] font-heading font-semibold uppercase tracking-[0.14em]"
            style={{ color: accent }}
          >
            {entry.tag}
          </span>
        </div>
        <span
          className="flex h-6 w-6 items-center justify-center rounded-full transition-all duration-300 group-hover:translate-x-0.5"
          style={{ backgroundColor: `${accent}14`, color: accent }}
          aria-hidden="true"
        >
          <svg className="h-3 w-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      {/* Mockup zone - clean, no overlapping chips */}
      <div
        className="relative aspect-[16/10] w-full overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${accent}0A 0%, ${accent}1C 100%)` }}
      >
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.05]" aria-hidden="true" />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[90%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: `${accent}1A` }}
          aria-hidden="true"
        />
        <div className="absolute inset-4 overflow-hidden rounded-lg border border-[#E5E7EB] bg-white shadow-[0_14px_40px_-20px_rgba(10,22,40,0.25)] transition-transform duration-[600ms] group-hover:scale-[1.02]">
          <FeatureMockup
            type={entry.mockup}
            accent={accent}
            subtitle={entry.mockupLabel}
            className="h-full w-full"
          />
        </div>
      </div>

      {/* Title + Before/After split */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h4 className="font-display text-lg font-normal leading-tight text-[#0A1628]">
          {entry.title}
        </h4>
        <div className="flex gap-2.5">
          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#EEF0F3]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#555860]" />
          </span>
          <p className="text-xs leading-relaxed text-[#555860]">{entry.pain}</p>
        </div>
        <div className="flex gap-2.5">
          <span
            className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: `${accent}1A` }}
          >
            <svg className="h-2.5 w-2.5" viewBox="0 0 12 12" fill="none" stroke={accent} strokeWidth={2.5}>
              <path d="M2 6l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <p className="text-xs leading-relaxed text-[#0A1628]">{entry.resolution}</p>
        </div>
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Pillar banner - cinematic category intro with real imagery
   ═══════════════════════════════════════════════════════════════════════════ */

function PillarBanner({ category, index }: { category: Category; index: number }) {
  const Icon = category.icon
  return (
    <div className="relative mb-10 overflow-hidden rounded-3xl border border-[#E5E7EB] bg-white shadow-[0_30px_80px_-40px_rgba(10,22,40,0.25)]">
      <div className="grid lg:grid-cols-[1.2fr_1fr]">
        {/* Image */}
        <div className="relative h-[280px] lg:h-auto">
          <Image
            src={category.bannerImage}
            alt={category.bannerAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(90deg, ${category.accent}D9 0%, ${category.accent}66 55%, transparent 100%)`,
            }}
            aria-hidden="true"
          />
          <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-[#0A1628] shadow-sm backdrop-blur">
            <Icon className="h-3.5 w-3.5" style={{ color: category.accent }} />
            Pillar {index + 1} of 5
          </div>
          <div className="absolute inset-x-6 bottom-6 text-white md:inset-x-10 md:bottom-10">
            <p className="font-display text-3xl font-normal leading-[1.05] md:text-4xl lg:text-5xl">
              {category.tagline}
            </p>
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col justify-center gap-5 p-6 md:p-8 lg:p-10">
          <div>
            <p
              className="text-xs font-heading font-semibold uppercase tracking-wider"
              style={{ color: category.accent }}
            >
              {category.name}
            </p>
            <p className="mt-3 text-base leading-relaxed text-[#555860]">
              {category.plainEnglish}
            </p>
          </div>
          <ul className="space-y-2.5">
            {category.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 text-sm text-[#0A1628]">
                <span
                  className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${category.accent}1A` }}
                >
                  <svg className="h-2.5 w-2.5" viewBox="0 0 12 12" fill="none" stroke={category.accent} strokeWidth={2.5}>
                    <path d="M2 6l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Main export - 5 pillars, each with banner + entry grid
   ═══════════════════════════════════════════════════════════════════════════ */

export default function VisualLibrary() {
  return (
    <section className="bg-[#F5F6F8] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <RevealOnScroll className="mx-auto max-w-3xl text-center mb-10">
          <motion.p
            variants={revealItem}
            className="text-sm font-heading font-semibold uppercase tracking-wider text-brand-blue"
          >
            The Platform in Action
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mt-3 font-display text-4xl font-normal leading-[1.1] tracking-tight text-[#0A1628] md:text-5xl lg:text-6xl"
          >
            Five pillars. One <span className="text-keyword">operating system</span>.
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-brand-graphite-mid"
          >
            Every part of your property business runs on Revun. Here&apos;s what that
            looks like, pillar by pillar, with the real scenarios, the real problems,
            and the exact outcomes.
          </motion.p>
        </RevealOnScroll>

        {/* Jump-to navigation pills */}
        <div className="mb-16 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat, i) => (
            <a
              key={cat.name}
              href={`#platform-${i}`}
              className="group inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-medium text-[#555860] transition-all hover:border-[#176FEB]/40 hover:text-[#176FEB] hover:shadow-sm"
            >
              <span
                className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white transition-transform group-hover:scale-105"
                style={{ backgroundColor: cat.accent }}
              >
                {i + 1}
              </span>
              <cat.icon className="h-3.5 w-3.5" />
              {cat.name}
            </a>
          ))}
        </div>

        {/* Pillars */}
        {categories.map((category, catIndex) => (
          <div
            key={category.name}
            id={`platform-${catIndex}`}
            className="mb-24 last:mb-0 scroll-mt-24"
          >
            <RevealOnScroll>
              <motion.div variants={revealItem}>
                <PillarBanner category={category} index={catIndex} />
              </motion.div>
            </RevealOnScroll>

            {/* First entry = featured, full-width editorial layout */}
            {category.entries.length > 0 && (
              <div className="mb-6">
                <FeaturedEntry
                  entry={visuals[category.entries[0]]}
                  index={category.entries[0]}
                  accent={category.accent}
                />
              </div>
            )}

            {/* Remaining entries - symmetric 2-col grid so every pillar has exactly 3 */}
            {category.entries.length > 1 && (
              <div className="grid gap-6 md:grid-cols-2">
                {category.entries.slice(1).map((idx) => (
                  <VisualEntryRow
                    key={visuals[idx].title}
                    entry={visuals[idx]}
                    index={idx}
                    accent={category.accent}
                  />
                ))}
              </div>
            )}

            {/* Divider between categories */}
            {catIndex < categories.length - 1 && (
              <div className="mt-24 flex items-center gap-4">
                <div className="h-px flex-1 bg-[#E5E7EB]" />
                <div
                  className="h-2 w-2 rounded-full opacity-40"
                  style={{ backgroundColor: category.accent }}
                />
                <div className="h-px flex-1 bg-[#E5E7EB]" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
