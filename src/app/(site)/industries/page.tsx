'use client'

import { useState, type ComponentType } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  Building2,
  Home,
  Building,
  GraduationCap,
  Heart,
  Palmtree,
  Briefcase,
  Shield,
  Flag,
  Layers,
  ArrowRight,
  CheckCircle2,
  Plus,
  Quote,
  MapPin,
  Sparkles,
  TrendingUp,
  Globe2,
} from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import { heroStagger, fadeUp } from '@/lib/motion'
import { CountUp } from '@/components/ui/count-up'
import { FeatureMockup, type MockupType } from '@/components/ui/feature-mockup'

/* ── Types ──────────────────────────────────────────────────────────────── */

type LucideIcon = ComponentType<{ className?: string; strokeWidth?: number }>

interface Industry {
  slug: string
  icon: LucideIcon
  title: string
  titleHighlight: string
  description: string
  highlights: readonly string[]
  cta: string
  stat: string
  chipLabel: string
  image: { src: string; alt: string }
}

/* ── Industry data ──────────────────────────────────────────────────────── */

const industries: readonly Industry[] = [
  {
    slug: 'reits-and-asset-managers',
    icon: Building2,
    title: 'REITs &',
    titleHighlight: 'Asset Managers',
    description:
      'Standardize operations across properties and regions. Enterprise-grade reporting, governance controls, and API integrations for institutional portfolios.',
    highlights: [
      'Portfolio-wide KPI dashboards with region filters',
      'Granular role-based access with audit logging',
      'Pre-built connectors for Yardi, MRI, and Sage',
    ],
    cta: 'Explore for REITs',
    stat: 'Avg. 1,200+ units · 12 regions',
    chipLabel: 'REITs',
    image: {
      src: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=85',
      alt: 'Institutional office tower representing a multi-region REIT portfolio',
    },
  },
  {
    slug: 'single-family-operators',
    icon: Home,
    title: 'Single-Family',
    titleHighlight: 'Operators',
    description:
      'Manage scattered-site portfolios from a single dashboard. Route maintenance by location, track per-property financials, and automate lease renewals.',
    highlights: [
      'Per-property P&L statements and owner reports',
      'Location-based vendor routing and dispatch',
      'Automated lease renewal workflows',
    ],
    cta: 'Explore for SFR',
    stat: 'Avg. 340 scattered-site doors',
    chipLabel: 'Single-Family',
    image: {
      src: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=85',
      alt: 'Single-family detached home in a suburban neighborhood',
    },
  },
  {
    slug: 'multifamily-operators',
    icon: Building,
    title: 'Multifamily',
    titleHighlight: 'Operators',
    description:
      'High-density living demands high-efficiency tools. Unit-level tracking, bulk operations, common area management, and resident experience tools.',
    highlights: [
      'Unit-level maintenance and billing tracking',
      'Bulk lease renewals and rent adjustments',
      'Common area scheduling and amenity booking',
    ],
    cta: 'Explore for Multifamily',
    stat: 'Avg. 180 units · 22 amenities',
    chipLabel: 'Multifamily',
    image: {
      src: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85',
      alt: 'Multifamily apartment building with balconies',
    },
  },
  {
    slug: 'student-housing',
    icon: GraduationCap,
    title: 'Student',
    titleHighlight: 'Housing',
    description:
      'Handle seasonal turnover, guarantor management, and per-bed leasing. Built for the unique rhythms of university housing.',
    highlights: [
      'Per-bed and per-room lease structures',
      'Guarantor/co-signer management workflows',
      'Seasonal turnover checklists and scheduling',
    ],
    cta: 'Explore for Student Housing',
    stat: 'Per-bed leasing · seasonal cycles',
    chipLabel: 'Student',
    image: {
      src: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=85',
      alt: 'University campus residence building with students walking by',
    },
  },
  {
    slug: 'senior-living',
    icon: Heart,
    title: 'Senior',
    titleHighlight: 'Living',
    description:
      'Accessibility-first design, care coordination hooks, and family communication tools for assisted living and retirement communities.',
    highlights: [
      'Accessibility-focused maintenance prioritization',
      'Family member portal access and updates',
      'Emergency contact and care coordination',
    ],
    cta: 'Explore for Senior Living',
    stat: 'Family portals · care-coordinated',
    chipLabel: 'Senior',
    image: {
      src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
      alt: 'Warm modern senior living community common room',
    },
  },
  {
    slug: 'vacation-rentals',
    icon: Palmtree,
    title: 'Vacation &',
    titleHighlight: 'Short-Term Rentals',
    description:
      'Manage furnished units, cleaning schedules, guest communications, and pricing. An Airbnb alternative for professional operators.',
    highlights: [
      'Turnover cleaning scheduling and tracking',
      'Guest communication templates and automation',
      'Dynamic pricing integration support',
    ],
    cta: 'Explore for Vacation Rentals',
    stat: 'Dynamic pricing · turnover automation',
    chipLabel: 'Vacation',
    image: {
      src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=85',
      alt: 'Modern vacation rental home with an open-air view',
    },
  },
  {
    slug: 'commercial-property',
    icon: Briefcase,
    title: 'Commercial',
    titleHighlight: 'Property',
    description:
      'Office, retail, and industrial property management with CAM reconciliation, NNN lease support, and tenant improvement tracking.',
    highlights: [
      'CAM reconciliation and operating expense recovery',
      'NNN, gross, and modified lease structures',
      'Tenant improvement (TI) project tracking',
    ],
    cta: 'Explore for Commercial',
    stat: 'CAM recovery · NNN-ready',
    chipLabel: 'Commercial',
    image: {
      src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85',
      alt: 'Commercial office interior with workstations and meeting rooms',
    },
  },
  {
    slug: 'affordable-housing',
    icon: Shield,
    title: 'Affordable',
    titleHighlight: 'Housing',
    description:
      'Compliance-heavy portfolios need compliance-heavy tools. HUD reporting, income certification, and subsidy tracking built in.',
    highlights: [
      'Income certification and recertification workflows',
      'HUD and CMHC compliance automation',
      'Subsidy tracking and reporting',
    ],
    cta: 'Explore for Affordable Housing',
    stat: 'HUD + CMHC compliance built-in',
    chipLabel: 'Affordable',
    image: {
      src: 'https://images.unsplash.com/photo-1543269664-56d93c1b41a6?auto=format&fit=crop&w=1200&q=85',
      alt: 'Row of welcoming community homes representing affordable housing',
    },
  },
  {
    slug: 'military-housing',
    icon: Flag,
    title: 'Military',
    titleHighlight: 'Housing',
    description:
      'BAH-based rent calculations, PCS move coordination, and base housing compliance for military family communities.',
    highlights: [
      'BAH-based rent calculation engine',
      'PCS move-in/move-out automation',
      'DoD compliance and reporting',
    ],
    cta: 'Explore for Military Housing',
    stat: 'BAH-calc engine · PCS workflows',
    chipLabel: 'Military',
    image: {
      src: 'https://images.unsplash.com/photo-1517994112540-009c47ea476b?auto=format&fit=crop&w=1200&q=85',
      alt: 'Orderly row of base family housing units',
    },
  },
  {
    slug: 'mixed-use',
    icon: Layers,
    title: 'Mixed-Use',
    titleHighlight: 'Properties',
    description:
      'Residential, commercial, and retail under one roof. Unified accounting, split billing, and property-wide operations from a single dashboard.',
    highlights: [
      'Unified accounting across property types',
      'Split billing for shared utilities and services',
      'Cross-use tenant and lease management',
    ],
    cta: 'Explore for Mixed-Use',
    stat: 'Unified books across use types',
    chipLabel: 'Mixed-Use',
    image: {
      src: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=1200&q=85',
      alt: 'Urban mixed-use building with street-level retail and residential above',
    },
  },
]

/* ── Shapeshifter platform tabs ─────────────────────────────────────────── */

interface PlatformTab {
  slug: string
  label: string
  mockup: MockupType
  subtitle: string
}

const platformTabs: readonly PlatformTab[] = [
  { slug: 'reits', label: 'REITs', mockup: 'dashboard', subtitle: 'Portfolio overview' },
  { slug: 'multifamily', label: 'Multifamily', mockup: 'portal', subtitle: 'Resident portal' },
  { slug: 'sfr', label: 'Single-Family', mockup: 'listings', subtitle: 'Scattered-site map' },
  { slug: 'commercial', label: 'Commercial', mockup: 'document', subtitle: 'CAM reconciliation' },
]

/* ── Coverage data ──────────────────────────────────────────────────────── */

const provinces: readonly (readonly [string, string])[] = [
  ['ON', 'Ontario'],
  ['BC', 'British Columbia'],
  ['AB', 'Alberta'],
  ['QC', 'Quebec'],
  ['MB', 'Manitoba'],
  ['SK', 'Saskatchewan'],
  ['NS', 'Nova Scotia'],
  ['NB', 'New Brunswick'],
  ['NL', 'Newfoundland & Labrador'],
  ['PE', 'Prince Edward Island'],
  ['YT', 'Yukon'],
  ['NT', 'Northwest Territories'],
  ['NU', 'Nunavut'],
]

const coverageChecks: readonly string[] = [
  'All 10 provinces + 3 territories',
  'LTB · RTB · TAL · RTDRS tribunal-ready docs',
  'PIPEDA + provincial privacy compliance',
  'CMHC + HUD reporting templates',
  'English and French document generation',
]

/* ── Testimonials ───────────────────────────────────────────────────────── */

interface Testimonial {
  industry: string
  quote: string
  name: string
  title: string
  company: string
  city: string
  avatar: string
}

const testimonials: readonly Testimonial[] = [
  {
    industry: 'REITs',
    quote:
      "We consolidated five tools into one. Revun's compliance engine alone saved us 60 hours per quarter on audit prep.",
    name: 'Alexandra Chen',
    title: 'VP, Asset Strategy',
    company: 'Meridian REIT',
    city: 'Toronto, ON',
    avatar:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
  },
  {
    industry: 'Multifamily',
    quote:
      'Our on-time rent rate jumped to 99%. Residents pay in-portal, owners see live disbursements — nothing gets lost in email anymore.',
    name: 'David Okonkwo',
    title: 'Director of Operations',
    company: 'Harbourfront Residential',
    city: 'Vancouver, BC',
    avatar:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
  },
  {
    industry: 'Student Housing',
    quote:
      'Per-bed leasing, guarantors, seasonal turnover — Revun handles the chaos of student housing without a dozen workarounds.',
    name: 'Priya Rao',
    title: 'Portfolio Manager',
    company: 'Campus Living Co.',
    city: 'Waterloo, ON',
    avatar:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
  },
  {
    industry: 'Commercial',
    quote:
      'CAM reconciliation used to eat our month-end. Now it runs on autopilot, and tenant improvement tracking lives in the same dashboard.',
    name: 'James Whitmore',
    title: 'Managing Partner',
    company: 'North Star Commercial',
    city: 'Calgary, AB',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
]

/* ── FAQ ────────────────────────────────────────────────────────────────── */

interface Faq {
  q: string
  a: string
}

const faqs: readonly Faq[] = [
  {
    q: 'Can Revun handle a mixed portfolio across multiple property types?',
    a: 'Yes. Revun is built for mixed portfolios — a single account can operate REIT-scale multifamily alongside single-family scattered sites, commercial suites, or student residences. Unified accounting, role-based access, and per-property workflows keep the books clean across every asset class.',
  },
  {
    q: 'Do you support US and Canadian properties on one platform?',
    a: 'Yes. Revun supports both CMHC and HUD reporting templates, along with multi-currency ledgers, PIPEDA-compliant data handling in Canada, and US-side compliance for affordable and military housing. You can run cross-border portfolios from one login.',
  },
  {
    q: 'How do you handle HUD and CMHC reporting for affordable housing?',
    a: 'Income certification and recertification workflows are built into the lease lifecycle, and subsidy tracking feeds directly into HUD- and CMHC-ready reports. Recerts never fall through the cracks because the system flags them ahead of the compliance deadline.',
  },
  {
    q: 'Can REITs export data to Yardi, MRI, or Sage?',
    a: 'Yes — we ship pre-built connectors for Yardi, MRI, and Sage, plus a typed API for anything else. Portfolio-level KPI dashboards, audit logs, and general ledger exports are all built for institutional governance out of the box.',
  },
  {
    q: 'Does Revun support per-bed leasing for student housing?',
    a: 'Yes. Student housing gets per-bed and per-room lease structures, guarantor/co-signer workflows, and seasonal turnover checklists tuned to the academic calendar. The same property can flex to grad-year or summer-sublet models without reconfiguration.',
  },
  {
    q: 'What if my portfolio spans residential, retail, and office?',
    a: 'Mixed-use is a first-class property type in Revun. Accounting unifies across residential, retail, and office under the same property, while split billing handles shared utilities and services. Leases, tenants, and CAM reconciliation all live in one dashboard.',
  },
]

/* ── FAQ Row ────────────────────────────────────────────────────────────── */

function FaqRow({
  q,
  a,
  idx,
  openIdx,
  setOpenIdx,
}: {
  q: string
  a: string
  idx: number
  openIdx: number
  setOpenIdx: (i: number) => void
}) {
  const open = openIdx === idx
  const panelId = `faq-panel-${idx}`
  const buttonId = `faq-button-${idx}`
  return (
    <div className="border-b border-[#E5E7EB]">
      <button
        id={buttonId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpenIdx(open ? -1 : idx)}
        className="group flex w-full items-center justify-between gap-6 py-5 text-left"
      >
        <span className="font-heading text-base font-semibold text-[#0A1628] transition-colors group-hover:text-[#0A1628] md:text-lg">
          {q}
        </span>
        <Plus
          className="h-5 w-5 flex-shrink-0 text-[#0A1628] transition-transform duration-300"
          strokeWidth={2}
          style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 pr-8 text-[0.95rem] leading-relaxed text-[#555860]">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Page
   ═══════════════════════════════════════════════════════════════════════════ */

export default function IndustriesPage() {
  const [activeTabSlug, setActiveTabSlug] = useState<string>(
    platformTabs[0].slug,
  )
  const [openFaq, setOpenFaq] = useState<number>(0)
  const [quoteIdx, setQuoteIdx] = useState<number>(0)

  const activeTab =
    platformTabs.find((t) => t.slug === activeTabSlug) ?? platformTabs[0]
  const activeQuote = testimonials[quoteIdx]

  return (
    <>
      {/* ─────────── Hero ─────────── */}
      <section className="relative overflow-hidden bg-[#0A1628] pb-20 pt-28 text-white md:pb-24 md:pt-32">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=2000&q=80"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-20"
          />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#0A1628] via-[#0A1628]/80 to-[#0A1628]"
          aria-hidden
        />
        <div
          className="absolute inset-0"
          aria-hidden
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            maskImage:
              'radial-gradient(ellipse at center, black 40%, transparent 75%)',
            WebkitMaskImage:
              'radial-gradient(ellipse at center, black 40%, transparent 75%)',
          }}
        />

        <motion.div
          className="relative z-10 mx-auto max-w-4xl px-6 text-center"
          variants={heroStagger}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs uppercase tracking-widest text-white/70"
          >
            <Sparkles className="h-3.5 w-3.5" strokeWidth={1.8} />
            10 property types · 1 platform
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-balance font-display text-5xl leading-[0.98] tracking-tight md:text-7xl"
          >
            Property management, built for{' '}
            <em className="text-white/90">
              every kind of building.
            </em>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70"
          >
            From scattered single-family homes to institutional REITs, student
            residences to mixed-use towers — Revun adapts to the compliance,
            workflows, and scale of your portfolio.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mx-auto mt-12 grid max-w-xl grid-cols-3 divide-x divide-white/10"
          >
            {[
              { value: 10, label: 'Property types' },
              { value: 13, label: 'Provinces & territories' },
              { value: 1, label: 'Unified platform' },
            ].map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center justify-center px-2"
              >
                <CountUp
                  value={s.value}
                  className="font-display text-3xl md:text-4xl"
                />
                <span className="mt-2 text-[11px] uppercase tracking-widest text-white/50">
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/demo/"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-7 text-base font-semibold text-[#0A1628] transition-colors duration-150 hover:bg-white/90"
            >
              Book a Demo
              <ArrowRight className="ml-2 h-4 w-4" strokeWidth={2} />
            </Link>
            <Link
              href="#industries-list"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 px-7 text-base font-semibold text-white transition-colors duration-150 hover:bg-white/10"
            >
              See all industries
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ─────────── Industries — Editorial List ─────────── */}
      <section
        id="industries-list"
        className="scroll-mt-40 bg-white py-20 md:py-24"
      >
        <div className="mx-auto max-w-5xl px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#0A1628]">
              Every property type
            </p>
            <h2 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight text-[#0A1628] md:text-5xl">
              Ten playbooks,{' '}
              <em className="font-normal text-[#0A1628]">one dashboard.</em>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[#555860]">
              Each industry has its own workflows, compliance surface, and
              financial rhythm. Revun ships real playbooks for all ten — no
              generic templates.
            </p>
          </div>

          <RevealOnScroll stagger={0.05} className="mt-14 divide-y divide-[#E5E7EB] border-y border-[#E5E7EB]">
            {industries.map((ind, idx) => {
              const Icon = ind.icon
              const num = String(idx + 1).padStart(2, '0')
              return (
                <motion.article
                  key={ind.slug}
                  id={ind.slug}
                  variants={revealItem}
                  className="group relative scroll-mt-40"
                >
                  <Link
                    href="/demo/"
                    className="grid grid-cols-1 gap-6 py-8 transition-colors duration-200 hover:bg-[#F8FAFC] md:grid-cols-[260px_1fr_auto] md:items-center md:gap-10 md:px-6"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#F5F6F8] md:w-[260px]">
                      <Image
                        src={ind.image.src}
                        alt={ind.image.alt}
                        fill
                        sizes="(min-width: 768px) 260px, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col">
                      <div className="flex items-center gap-3">
                        <span className="font-display text-sm font-medium text-[#94A3B8]">
                          {num}
                        </span>
                        <span className="h-px w-8 bg-[#E5E7EB]" />
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-[#0A1628]">
                          <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                          {ind.chipLabel}
                        </span>
                      </div>

                      <h3 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-tight text-[#0A1628] md:text-[1.75rem]">
                        {ind.title}{' '}
                        <em className="font-normal text-[#0A1628]">{ind.titleHighlight}</em>
                      </h3>

                      <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-[#555860]">
                        {ind.description}
                      </p>

                      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                        {ind.highlights.slice(0, 2).map((h) => (
                          <span
                            key={h}
                            className="inline-flex items-center gap-1.5 text-xs text-[#2C2E33]"
                          >
                            <CheckCircle2
                              className="h-3.5 w-3.5 shrink-0 text-[#0A1628]"
                              strokeWidth={2}
                            />
                            {h}
                          </span>
                        ))}
                      </div>

                      <span className="mt-4 text-[11px] font-medium uppercase tracking-wider text-[#94A3B8]">
                        {ind.stat}
                      </span>
                    </div>

                    {/* CTA arrow */}
                    <div className="hidden md:flex md:items-center md:justify-end">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#0A1628] transition-all duration-200 group-hover:border-[#0A1628] group-hover:bg-[#0A1628] group-hover:text-white">
                        <ArrowRight className="h-5 w-5" strokeWidth={2} />
                      </span>
                    </div>

                    {/* Mobile CTA */}
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0A1628] md:hidden">
                      {ind.cta}
                      <ArrowRight className="h-4 w-4" strokeWidth={2} />
                    </span>
                  </Link>
                </motion.article>
              )
            })}
          </RevealOnScroll>
        </div>
      </section>

      {/* ─────────── Shapeshifter Platform Demo ─────────── */}
      <section className="relative overflow-hidden bg-[#0A1628] py-20 text-white md:py-28">
        <div
          className="pointer-events-none absolute -left-32 top-12 h-80 w-80 rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-32 bottom-12 h-96 w-96 rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
          }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto max-w-5xl px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/80">
              Adaptive by design
            </p>
            <h2 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight md:text-5xl">
              One platform that{' '}
              <em className="font-normal text-white">
                shapeshifts to your portfolio.
              </em>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/70">
              Same core, different surface. Pick a property type to see how the
              Revun UI re-shapes itself around the workflows that matter.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Platform property types"
            className="mt-10 flex justify-center"
          >
            <div className="inline-flex rounded-full border border-white/15 bg-white/5 p-1">
              {platformTabs.map((tab) => {
                const active = activeTabSlug === tab.slug
                return (
                  <button
                    key={tab.slug}
                    id={`platform-tab-${tab.slug}`}
                    role="tab"
                    aria-selected={active}
                    aria-controls={`platform-panel-${tab.slug}`}
                    tabIndex={active ? 0 : -1}
                    onClick={() => setActiveTabSlug(tab.slug)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors duration-150 md:text-sm ${
                      active
                        ? 'bg-white text-[#0A1628]'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="relative mx-auto mt-10 max-w-5xl rounded-2xl border border-white/10 bg-[#0F1E33] p-4 shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.slug}
                id={`platform-panel-${activeTab.slug}`}
                role="tabpanel"
                aria-labelledby={`platform-tab-${activeTab.slug}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden rounded-xl"
              >
                <FeatureMockup
                  type={activeTab.mockup}
                  accent="#FFFFFF"
                  subtitle={activeTab.subtitle}
                  className="h-[520px]"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <RevealOnScroll
            stagger={0.08}
            className="mt-12 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            {[
              { icon: Sparkles, label: 'Unified accounting' },
              { icon: Shield, label: 'Role-based access' },
              { icon: Globe2, label: 'API integrations' },
              { icon: CheckCircle2, label: 'Audit logging' },
            ].map((f) => {
              const Icon = f.icon
              return (
                <motion.div
                  key={f.label}
                  variants={revealItem}
                  className="flex items-center gap-2.5"
                >
                  <Icon
                    className="h-4 w-4 text-white/80"
                    strokeWidth={1.8}
                  />
                  <span className="text-sm text-white/85">{f.label}</span>
                </motion.div>
              )
            })}
          </RevealOnScroll>
        </div>
      </section>

      {/* ─────────── Coverage (minimal, no tiles) ─────────── */}
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#0A1628]">
              Canadian coverage
            </p>
            <h2 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight text-[#0A1628] md:text-5xl">
              Every province.{' '}
              <em className="font-normal text-[#0A1628]">Every territory.</em>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[#555860]">
              Revun ships tribunal-ready documents, bilingual leases, and
              province-specific compliance from day one.
            </p>
          </div>

          {/* Inline province list */}
          <RevealOnScroll
            stagger={0.03}
            className="mt-12 flex flex-wrap gap-x-6 gap-y-3"
          >
            {provinces.map(([abbr, full]) => (
              <motion.div
                key={abbr}
                variants={revealItem}
                className="inline-flex items-center gap-2 text-sm"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#0A1628]" />
                <span className="font-heading font-semibold text-[#0A1628]">
                  {abbr}
                </span>
                <span className="text-[#555860]">{full}</span>
              </motion.div>
            ))}
          </RevealOnScroll>

          {/* Plain checklist — no card backgrounds */}
          <RevealOnScroll
            stagger={0.08}
            className="mt-12 max-w-2xl border-t border-[#E5E7EB] pt-8"
          >
            <ul className="space-y-4">
              {coverageChecks.map((check) => (
                <motion.li
                  key={check}
                  variants={revealItem}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#0A1628]"
                    strokeWidth={2}
                  />
                  <span className="text-base leading-relaxed text-[#0A1628]">
                    {check}
                  </span>
                </motion.li>
              ))}
            </ul>

            <motion.div variants={revealItem}>
              <Link
                href="/coverage/"
                className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0A1628] transition-colors duration-150 hover:text-black"
              >
                See detailed provincial compliance
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Link>
            </motion.div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ─────────── Single Pull-Quote Testimonial ─────────── */}
      <section className="bg-[#F5F6F8] py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#0A1628]">
              In production
            </p>
            <h2 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight text-[#0A1628] md:text-5xl">
              Operators across every{' '}
              <em className="font-normal text-[#0A1628]">property type.</em>
            </h2>
          </div>

          <div className="mt-14">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeQuote.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <Quote
                  className="mx-auto h-10 w-10 text-[#0A1628]/25"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <p className="mx-auto mt-6 max-w-3xl text-balance font-display text-2xl leading-snug text-[#0A1628] md:text-3xl">
                  &ldquo;{activeQuote.quote}&rdquo;
                </p>
                <div className="mt-8 flex items-center justify-center gap-3">
                  <div className="relative h-11 w-11 overflow-hidden rounded-full">
                    <Image
                      src={activeQuote.avatar}
                      alt={`${activeQuote.name}, ${activeQuote.title} at ${activeQuote.company}`}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <p className="font-heading text-sm font-semibold text-[#0A1628]">
                      {activeQuote.name}
                    </p>
                    <p className="text-xs text-[#555860]">
                      {activeQuote.title} · {activeQuote.company}
                    </p>
                    <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-[#555860]">
                      <MapPin className="h-3 w-3" strokeWidth={1.8} />
                      {activeQuote.city} · {activeQuote.industry}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex justify-center gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  onClick={() => setQuoteIdx(i)}
                  aria-label={`Show testimonial ${i + 1} of ${testimonials.length}`}
                  aria-current={quoteIdx === i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    quoteIdx === i
                      ? 'w-8 bg-[#0A1628]'
                      : 'w-1.5 bg-[#D3D5DB] hover:bg-[#0A1628]/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── FAQ ─────────── */}
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#0A1628]">
              Common questions
            </p>
            <h2 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight text-[#0A1628] md:text-5xl">
              Built for your exact{' '}
              <em className="font-normal text-[#0A1628]">portfolio mix.</em>
            </h2>
          </div>

          <div className="mt-12 border-t border-[#E5E7EB]">
            {faqs.map((f, i) => (
              <FaqRow
                key={f.q}
                q={f.q}
                a={f.a}
                idx={i}
                openIdx={openFaq}
                setOpenIdx={setOpenFaq}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── Final CTA ─────────── */}
      <section className="relative overflow-hidden bg-[#0A1628] py-20 text-white md:py-28">
        <div
          className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
          }}
          aria-hidden
        />

        <RevealOnScroll
          stagger={0.1}
          className="relative z-10 mx-auto max-w-3xl px-6 text-center"
        >
          <motion.p
            variants={revealItem}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs uppercase tracking-widest text-white/70"
          >
            <TrendingUp className="h-3.5 w-3.5" strokeWidth={1.8} />
            10 industries · 1 platform · 0 migration pain
          </motion.p>

          <motion.h2
            variants={revealItem}
            className="mt-6 font-display text-4xl leading-[1.05] tracking-tight md:text-6xl"
          >
            Tell us about your{' '}
            <em className="font-normal text-white">portfolio</em>
          </motion.h2>

          <motion.p
            variants={revealItem}
            className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/70"
          >
            Book a 15-minute discovery call and we will map Revun to your exact
            property type and workflow.
          </motion.p>

          <motion.div
            variants={revealItem}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/70"
          >
            {[
              '15-minute discovery call',
              'Custom demo per property type',
              'Free migration assistance',
            ].map((r) => (
              <span key={r} className="inline-flex items-center gap-1.5">
                <CheckCircle2
                  className="h-4 w-4 flex-shrink-0 text-white/80"
                  strokeWidth={2}
                />
                {r}
              </span>
            ))}
          </motion.div>

          <motion.div
            variants={revealItem}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link
              href="/demo/"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-7 text-base font-semibold text-[#0A1628] shadow-[0_8px_24px_-8px_rgba(255,255,255,0.25)] transition-colors duration-150 hover:bg-white/90"
            >
              Book a Demo
              <ArrowRight className="ml-2 h-4 w-4" strokeWidth={2} />
            </Link>
            <Link
              href="/pricing/"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 px-7 text-base font-semibold text-white transition-colors duration-150 hover:bg-white/10"
            >
              View Pricing
            </Link>
          </motion.div>
        </RevealOnScroll>
      </section>
    </>
  )
}
