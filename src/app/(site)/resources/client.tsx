'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  BookOpen,
  FileText,
  BarChart3,
  ArrowRight,
  GitCompareArrows,
  Rocket,
  MapPin,
  ClipboardList,
  Megaphone,
  Download,
  TrendingUp,
  Shield,
  Building2,
  Scale,
  Calendar,
  Users,
  CheckCircle2,
  FileCheck,
  Landmark,
  RefreshCw,
} from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import { heroStagger, fadeUp } from '@/lib/motion'

/* ── Resource Cards Data ──────────────────────────────────────────────── */

const guidesAndPlaybooks = [
  {
    icon: Building2,
    title: 'The Complete Property Onboarding Playbook',
    description:
      'A step-by-step guide covering tenant screening, lease execution, move-in inspections, and first-month setup. Built for Canadian operators managing 10 to 500 units.',
    cta: 'Read Guide',
    tag: 'Playbook',
  },
  {
    icon: Users,
    title: 'Leasing Best Practices for Multi-Family',
    description:
      'Reduce vacancy days by optimizing your listing-to-lease pipeline. Covers syndication, showing coordination, application scoring, and follow-up cadences.',
    cta: 'Read Guide',
    tag: 'Guide',
  },
  {
    icon: Shield,
    title: 'Provincial Compliance Handbook',
    description:
      'Navigate landlord-tenant legislation across Ontario, BC, Alberta, and Quebec. Includes notice periods, rent increase rules, and eviction procedures by province.',
    cta: 'Read Guide',
    tag: 'Compliance',
  },
  {
    icon: TrendingUp,
    title: 'Revenue Optimization for Property Managers',
    description:
      'Strategies for maximizing NOI through dynamic pricing, ancillary revenue streams, expense reduction, and operational efficiency benchmarks.',
    cta: 'Read Guide',
    tag: 'Playbook',
  },
]

const comparisonReports = [
  {
    icon: GitCompareArrows,
    title: 'Revun vs AppFolio: Feature-by-Feature Analysis',
    description:
      'Side-by-side comparison of platform capabilities, pricing models, Canadian compliance features, and integration ecosystems. See why operators are switching.',
    cta: 'Read Report',
    href: '/compare/',
  },
  {
    icon: GitCompareArrows,
    title: 'Revun vs Buildium: Total Cost of Ownership',
    description:
      'A detailed breakdown of subscription costs, per-unit fees, add-on charges, and hidden costs over a 3-year period for portfolios of 50, 200, and 500+ units.',
    cta: 'Read Report',
    href: '/compare/',
  },
  {
    icon: BarChart3,
    title: 'Property Management Software Landscape 2025',
    description:
      'Annual overview of the Canadian property management software market. Covers market share shifts, feature trends, and what operators are prioritizing this year.',
    cta: 'Read Report',
  },
]

const implementationResources = [
  {
    icon: CheckCircle2,
    title: '30-Day Onboarding Checklist',
    description:
      'Week-by-week implementation plan covering account setup, data migration, team training, and go-live readiness. Includes milestone markers and rollback protocols.',
    cta: 'View Checklist',
    tag: 'Checklist',
  },
  {
    icon: RefreshCw,
    title: 'Migration Guide: Legacy Software to Revun',
    description:
      'Step-by-step data migration playbook for moving from spreadsheets, Yardi, AppFolio, or Buildium. Covers tenant records, lease history, financial data, and document transfers.',
    cta: 'Read Guide',
    tag: 'Migration',
  },
  {
    icon: Calendar,
    title: 'Deployment Timeline Templates',
    description:
      'Pre-built project plans for small (under 50 units), mid-market (50 to 500 units), and enterprise (500+ units) deployments. Includes resource allocation and training schedules.',
    cta: 'Download Template',
    tag: 'Template',
  },
  {
    icon: Rocket,
    title: 'Team Training & Adoption Framework',
    description:
      'Structured training curriculum for property managers, leasing agents, maintenance coordinators, and owners. Includes role-based learning paths and proficiency assessments.',
    cta: 'Read Guide',
    tag: 'Training',
  },
]

const marketIntelligence = [
  {
    icon: MapPin,
    title: 'Canadian Rental Market Report — Q1 2025',
    description:
      'Vacancy rates, average rents, and absorption trends across 25 major Canadian markets. Includes year-over-year comparisons and 12-month forecasts by metro area.',
    cta: 'Read Report',
    tag: 'Data',
  },
  {
    icon: Scale,
    title: 'Provincial Regulation Tracker',
    description:
      'Monthly updates on landlord-tenant legislation changes across all provinces. Covers rent control adjustments, new disclosure requirements, and enforcement trends.',
    cta: 'Read Update',
    tag: 'Regulation',
  },
  {
    icon: Landmark,
    title: 'Operator Benchmark Study 2025',
    description:
      'Anonymized performance data from 200+ Canadian property management firms. Compare your maintenance response times, collection rates, and occupancy against peers.',
    cta: 'Read Study',
    tag: 'Benchmark',
  },
]

const templatesAndDownloads = [
  {
    icon: FileCheck,
    title: 'Lease Clause Library',
    description:
      'Province-specific lease clauses covering pet policies, maintenance responsibilities, subletting rules, and early termination. Reviewed by Canadian real estate attorneys.',
    cta: 'Download',
    tag: 'Legal',
  },
  {
    icon: ClipboardList,
    title: 'Move-In / Move-Out Inspection Checklists',
    description:
      'Room-by-room inspection forms with photo documentation guidelines, condition grading scales, and damage assessment frameworks. Print-ready and digital formats.',
    cta: 'Download',
    tag: 'Inspection',
  },
  {
    icon: FileText,
    title: 'Notice Templates by Province',
    description:
      'Pre-formatted notice templates for rent increases, lease terminations, entry notices, and maintenance advisories. Auto-populated with required statutory language.',
    cta: 'Download',
    tag: 'Template',
  },
  {
    icon: BookOpen,
    title: 'Tenant Communication Scripts',
    description:
      'Ready-to-use email and SMS templates for rent reminders, maintenance updates, lease renewals, and community announcements. Tested across 10,000+ tenant interactions.',
    cta: 'Download',
    tag: 'Communications',
  },
]

const productUpdates = [
  {
    icon: Megaphone,
    title: 'Product Changelog',
    description:
      'A running log of every feature release, improvement, and bug fix shipped to the Revun platform. Updated weekly with detailed release notes and usage guidance.',
    cta: 'View Changelog',
    tag: 'Changelog',
  },
  {
    icon: Rocket,
    title: 'Spring 2025 Feature Releases',
    description:
      'Highlights from the latest release cycle: AI-powered maintenance triage, bulk lease renewal workflows, enhanced owner reporting dashboards, and mobile app improvements.',
    cta: 'Read More',
    tag: 'Release',
  },
  {
    icon: TrendingUp,
    title: 'Product Roadmap Highlights',
    description:
      'A look at what the Revun team is building next. Preview upcoming features, vote on priorities, and understand the strategic direction of the platform.',
    cta: 'View Roadmap',
    tag: 'Roadmap',
  },
]

/* ── Category Sections ────────────────────────────────────────────────── */

const sections = [
  {
    id: 'guides',
    label: 'Guides & Playbooks',
    heading: 'Operational playbooks built for',
    headingAccent: 'Canadian operators',
    description:
      'Practical, step-by-step guides covering every aspect of property management — from onboarding your first tenant to scaling a multi-market portfolio.',
    cards: guidesAndPlaybooks,
    icon: BookOpen,
    cols: 4 as const,
    crossLink: { text: 'Explore Revun features', href: '/features/' },
  },
  {
    id: 'comparisons',
    label: 'Comparison Reports',
    heading: 'See how Revun',
    headingAccent: 'stacks up',
    description:
      'Transparent, data-driven comparisons against alternatives. We publish the numbers so you can make the right decision for your portfolio.',
    cards: comparisonReports,
    icon: GitCompareArrows,
    cols: 3 as const,
    crossLink: { text: 'Full comparison matrix', href: '/compare/' },
  },
  {
    id: 'implementation',
    label: 'Implementation Resources',
    heading: 'Go live with',
    headingAccent: 'confidence',
    description:
      'Everything you need to plan, execute, and verify a successful Revun deployment — whether you manage 20 units or 2,000.',
    cards: implementationResources,
    icon: Rocket,
    cols: 4 as const,
    crossLink: { text: 'See how Revun works', href: '/platform/' },
  },
  {
    id: 'market-intelligence',
    label: 'Market Intelligence',
    heading: 'Data-driven decisions for',
    headingAccent: 'Canadian rental markets',
    description:
      'Market reports, regulatory updates, and operator benchmarks to help you stay ahead of trends and make informed portfolio decisions.',
    cards: marketIntelligence,
    icon: BarChart3,
    cols: 3 as const,
    crossLink: { text: 'Solutions by audience', href: '/solutions/' },
  },
  {
    id: 'templates',
    label: 'Templates & Downloads',
    heading: 'Ready-to-use templates for',
    headingAccent: 'daily operations',
    description:
      'Lease clauses, inspection checklists, notice templates, and communication scripts — built for Canadian compliance and tested by operators.',
    cards: templatesAndDownloads,
    icon: Download,
    cols: 4 as const,
    crossLink: { text: 'Visit Help Center', href: '/help/' },
  },
  {
    id: 'product-updates',
    label: 'Product Updates',
    heading: 'What we shipped and',
    headingAccent: "what's next",
    description:
      'Stay current with platform improvements, feature releases, and roadmap highlights. We build in public and ship every week.',
    cards: productUpdates,
    icon: Megaphone,
    cols: 3 as const,
    crossLink: { text: 'Explore platform', href: '/platform/' },
  },
]

/* ── Component ────────────────────────────────────────────────────────── */

export function ResourcesPageClient() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#F5F6F8]">
        <motion.div
          className="relative z-10 mx-auto max-w-4xl px-6 pt-24 pb-16 text-center"
          variants={heroStagger}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-blue"
          >
            Resource Center
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display font-extrabold text-4xl leading-[1.1] tracking-tight text-[#0A1628] sm:text-5xl lg:text-6xl"
          >
            Software education and operational intelligence for{' '}
            <span className="text-brand-blue">property operators</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#555860]"
          >
            Playbooks, market data, compliance guides, and implementation resources — built around the real decisions Canadian property managers make every week.
          </motion.p>

          {/* Quick-nav pills */}
          <motion.div
            variants={fadeUp}
            className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-2"
          >
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-medium text-[#0A1628] transition-colors hover:border-brand-blue hover:text-brand-blue"
              >
                <s.icon className="size-3.5" />
                {s.label}
              </a>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── Content Sections ───────────────────────────────────────── */}
      {sections.map((section, sectionIdx) => (
        <section
          key={section.id}
          id={section.id}
          className={sectionIdx % 2 === 0 ? 'bg-white py-16 md:py-20' : 'bg-[#F5F6F8] py-16 md:py-20'}
        >
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <RevealOnScroll className="mb-12 text-center">
              <motion.p
                variants={revealItem}
                className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-blue"
              >
                {section.label}
              </motion.p>
              <motion.h2
                variants={revealItem}
                className="font-heading text-3xl font-bold tracking-tight text-[#0A1628] md:text-4xl"
              >
                {section.heading}{' '}
                <span className="text-brand-blue">{section.headingAccent}</span>
              </motion.h2>
              <motion.p
                variants={revealItem}
                className="mx-auto mt-4 max-w-2xl text-[#555860]"
              >
                {section.description}
              </motion.p>
            </RevealOnScroll>

            <RevealOnScroll
              stagger={0.08}
              className={`grid gap-6 ${
                section.cols === 4
                  ? 'sm:grid-cols-2 lg:grid-cols-4'
                  : 'sm:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {section.cards.map((card) => {
                const Icon = card.icon
                const cardContent = (
                  <div className="group relative flex h-full flex-col rounded-2xl border border-[#E5E7EB] bg-white p-7 transition-all duration-200 hover:border-brand-blue hover:shadow-md">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex size-11 items-center justify-center rounded-xl bg-[#E8F2FE] text-brand-blue transition-colors duration-150 group-hover:bg-brand-blue group-hover:text-white">
                        <Icon className="size-5" strokeWidth={1.8} />
                      </div>
                      {'tag' in card && card.tag && (
                        <span className="rounded-full bg-[#F5F6F8] px-2.5 py-0.5 text-xs font-medium text-[#555860]">
                          {card.tag}
                        </span>
                      )}
                    </div>
                    <h3 className="mb-2 font-heading text-base font-bold leading-snug text-[#0A1628]">
                      {card.title}
                    </h3>
                    <p className="mb-5 flex-1 text-sm leading-relaxed text-[#555860]">
                      {card.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue transition-transform group-hover:gap-2.5">
                      {card.cta}
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                )

                return (
                  <motion.div key={card.title} variants={revealItem}>
                    {'href' in card && card.href ? (
                      <Link href={card.href} className="block h-full">
                        {cardContent}
                      </Link>
                    ) : (
                      cardContent
                    )}
                  </motion.div>
                )
              })}
            </RevealOnScroll>

            {/* Cross-link */}
            <RevealOnScroll className="mt-8 text-center">
              <motion.div variants={revealItem}>
                <Link
                  href={section.crossLink.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue transition-colors hover:underline"
                >
                  {section.crossLink.text}
                  <ArrowRight className="size-3.5" />
                </Link>
              </motion.div>
            </RevealOnScroll>
          </div>
        </section>
      ))}

      {/* ── Newsletter CTA ─────────────────────────────────────────── */}
      <section className="bg-[#F5F6F8] py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <motion.p
              variants={revealItem}
              className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-blue"
            >
              Stay ahead
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="font-heading font-extrabold text-4xl tracking-tight text-[#0A1628] md:text-5xl"
            >
              Get notified when we publish
            </motion.h2>
            <motion.p
              variants={revealItem}
              className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-[#555860]"
            >
              One email per publish — new guides, market reports, templates, and product updates delivered the day they go live. No noise.
            </motion.p>

            <motion.form
              variants={revealItem}
              action="#"
              className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
              aria-label="Newsletter signup"
            >
              <input
                type="email"
                required
                placeholder="your@email.com"
                className="h-12 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 text-base text-[#0A1628] placeholder:text-[#94A3B8] focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
              />
              <button
                type="submit"
                className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-blue px-6 text-base font-semibold text-white transition-colors duration-150 hover:bg-brand-blue-dark"
              >
                Subscribe
                <ArrowRight className="size-4" />
              </button>
            </motion.form>

            <motion.p variants={revealItem} className="mt-4 text-sm text-[#555860]">
              No spam. Unsubscribe any time.
            </motion.p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Cross-link CTA ─────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-20">
        <RevealOnScroll className="mx-auto max-w-3xl px-6 text-center">
          <motion.h2
            variants={revealItem}
            className="font-heading text-3xl font-bold tracking-tight text-[#0A1628] sm:text-4xl"
          >
            Ready to see Revun in action?
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mt-4 text-lg leading-relaxed text-[#555860]"
          >
            Explore the platform, compare it against alternatives, or talk to our team about your portfolio.
          </motion.p>
          <motion.div
            variants={revealItem}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/platform/"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-blue px-8 text-base font-semibold text-white transition-colors hover:bg-brand-blue-dark"
            >
              Explore Platform
            </Link>
            <Link
              href="/compare/"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E5E7EB] px-8 text-base font-semibold text-[#0A1628] transition-colors hover:border-brand-blue hover:text-brand-blue"
            >
              Compare Software
            </Link>
            <Link
              href="/contact/"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E5E7EB] px-8 text-base font-semibold text-[#0A1628] transition-colors hover:border-brand-blue hover:text-brand-blue"
            >
              Contact Us
            </Link>
          </motion.div>
        </RevealOnScroll>
      </section>
    </>
  )
}
