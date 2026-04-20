'use client'

import Link from 'next/link'
import Image from 'next/image'
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
  Search,
  Clock,
  Sparkles,
} from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import { heroStagger, fadeUp } from '@/lib/motion'

/* ── Authors (validated avatars) ──────────────────────────────────────── */

const authors = {
  maya: {
    name: 'Maya Chen',
    role: 'Head of Operator Success',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&h=160&q=80',
  },
  daniel: {
    name: 'Daniel Okafor',
    role: 'Platform Product Lead',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&h=160&q=80',
  },
  priya: {
    name: 'Priya Shah',
    role: 'Market Intelligence',
    avatar:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=160&h=160&q=80',
  },
  jordan: {
    name: 'Jordan Reyes',
    role: 'Implementation Architect',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&h=160&q=80',
  },
  elena: {
    name: 'Elena Park',
    role: 'Compliance Counsel',
    avatar:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&h=160&q=80',
  },
  marcus: {
    name: 'Marcus Leblanc',
    role: 'Portfolio Strategy',
    avatar:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=160&h=160&q=80',
  },
} as const

type Author = (typeof authors)[keyof typeof authors]

/* ── Featured Article ─────────────────────────────────────────────────── */

const featuredArticle = {
  category: 'Market Intelligence',
  title: 'The 2025 operator playbook: what top 10% portfolios do differently',
  excerpt:
    'We analyzed 18 months of performance data across 200+ Canadian and US property management firms. The operators in the top decile share five habits — here is the full breakdown.',
  image:
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
  href: '#',
  author: authors.priya,
  readTime: '12 min read',
  date: 'Apr 14, 2025',
}

/* ── Resource Cards Data ──────────────────────────────────────────────── */

const guidesAndPlaybooks = [
  {
    icon: Building2,
    title: 'The Complete Property Onboarding Playbook',
    description:
      'A step-by-step guide covering tenant screening, lease execution, move-in inspections, and first-month setup. Built for operators across Canada and the US managing 10 to 500 units.',
    cta: 'Read Guide',
    tag: 'Playbook',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    author: authors.maya,
    readTime: '14 min read',
    date: 'Apr 9, 2025',
  },
  {
    icon: Users,
    title: 'Leasing Best Practices for Multi-Family',
    description:
      'Reduce vacancy days by optimizing your listing-to-lease pipeline. Covers syndication, showing coordination, application scoring, and follow-up cadences.',
    cta: 'Read Guide',
    tag: 'Guide',
    image:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
    author: authors.marcus,
    readTime: '9 min read',
    date: 'Mar 28, 2025',
  },
  {
    icon: Shield,
    title: 'Provincial Compliance Handbook',
    description:
      'Navigate landlord-tenant legislation across Ontario, BC, Alberta, and Quebec. Includes notice periods, rent increase rules, and eviction procedures by province.',
    cta: 'Read Guide',
    tag: 'Compliance',
    image:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
    author: authors.elena,
    readTime: '18 min read',
    date: 'Mar 20, 2025',
  },
  {
    icon: TrendingUp,
    title: 'Revenue Optimization for Property Managers',
    description:
      'Strategies for maximizing NOI through dynamic pricing, ancillary revenue streams, expense reduction, and operational efficiency benchmarks.',
    cta: 'Read Guide',
    tag: 'Playbook',
    image:
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
    author: authors.priya,
    readTime: '11 min read',
    date: 'Mar 14, 2025',
  },
]

const comparisonReports = [
  {
    icon: GitCompareArrows,
    title: 'Revun vs AppFolio: Feature-by-Feature Analysis',
    description:
      'Side-by-side comparison of platform capabilities, pricing models, CA + US compliance features, and integration ecosystems. See why operators are switching.',
    cta: 'Read Report',
    href: '/compare/',
    tag: 'Analysis',
    image:
      'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=1200&q=80',
    author: authors.daniel,
    readTime: '10 min read',
    date: 'Apr 2, 2025',
  },
  {
    icon: GitCompareArrows,
    title: 'Revun vs Buildium: Total Cost of Ownership',
    description:
      'A detailed breakdown of subscription costs, per-unit fees, add-on charges, and hidden costs over a 3-year period for portfolios of 50, 200, and 500+ units.',
    cta: 'Read Report',
    href: '/compare/',
    tag: 'TCO',
    image:
      'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&w=1200&q=80',
    author: authors.marcus,
    readTime: '13 min read',
    date: 'Mar 25, 2025',
  },
  {
    icon: BarChart3,
    title: 'Property Management Software Landscape 2025',
    description:
      'Annual overview of the North American property management software market. Covers market share shifts, feature trends, and what operators are prioritizing this year.',
    cta: 'Read Report',
    tag: 'Market',
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    author: authors.priya,
    readTime: '16 min read',
    date: 'Feb 18, 2025',
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
    image:
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80',
    author: authors.jordan,
    readTime: '7 min read',
    date: 'Apr 10, 2025',
  },
  {
    icon: RefreshCw,
    title: 'Migration Guide: Legacy Software to Revun',
    description:
      'Step-by-step data migration playbook for moving from spreadsheets, Yardi, AppFolio, or Buildium. Covers tenant records, lease history, financial data, and document transfers.',
    cta: 'Read Guide',
    tag: 'Migration',
    image:
      'https://images.unsplash.com/photo-1517994112540-009c47ea476b?auto=format&fit=crop&w=1200&q=80',
    author: authors.jordan,
    readTime: '15 min read',
    date: 'Mar 31, 2025',
  },
  {
    icon: Calendar,
    title: 'Deployment Timeline Templates',
    description:
      'Pre-built project plans for small (under 50 units), mid-market (50 to 500 units), and enterprise (500+ units) deployments. Includes resource allocation and training schedules.',
    cta: 'Open Template',
    tag: 'Template',
    image:
      'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=1200&q=80',
    author: authors.daniel,
    readTime: '6 min read',
    date: 'Mar 17, 2025',
  },
  {
    icon: Rocket,
    title: 'Team Training & Adoption Framework',
    description:
      'Structured training curriculum for property managers, leasing agents, maintenance coordinators, and owners. Includes role-based learning paths and proficiency assessments.',
    cta: 'Read Guide',
    tag: 'Training',
    image:
      'https://images.unsplash.com/photo-1543269664-56d93c1b41a6?auto=format&fit=crop&w=1200&q=80',
    author: authors.maya,
    readTime: '10 min read',
    date: 'Mar 5, 2025',
  },
]

const marketIntelligence = [
  {
    icon: MapPin,
    title: 'North American Rental Market Report: Q1 2025',
    description:
      'Vacancy rates, average rents, and absorption trends across 25 major Canadian and US markets. Includes year-over-year comparisons and 12-month forecasts by metro area.',
    cta: 'Read Report',
    tag: 'Data',
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
    author: authors.priya,
    readTime: '17 min read',
    date: 'Apr 7, 2025',
  },
  {
    icon: Scale,
    title: 'Provincial Regulation Tracker',
    description:
      'Monthly updates on landlord-tenant legislation changes across all provinces. Covers rent control adjustments, new disclosure requirements, and enforcement trends.',
    cta: 'Read Update',
    tag: 'Regulation',
    image:
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
    author: authors.elena,
    readTime: '8 min read',
    date: 'Apr 3, 2025',
  },
  {
    icon: Landmark,
    title: 'Operator Benchmark Study 2025',
    description:
      'Anonymized performance data from 200+ property management firms across Canada and the US. Compare your maintenance response times, collection rates, and occupancy against peers.',
    cta: 'Read Study',
    tag: 'Benchmark',
    image:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    author: authors.marcus,
    readTime: '14 min read',
    date: 'Mar 12, 2025',
  },
]

const templatesAndDownloads = [
  {
    icon: FileCheck,
    title: 'Lease Clause Library',
    description:
      'Province and state-specific lease clauses covering pet policies, maintenance responsibilities, subletting rules, and early termination. Reviewed by Canadian and US real estate attorneys.',
    cta: 'Get Template',
    tag: 'Legal',
    image:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
    author: authors.elena,
    readTime: '4 min read',
    date: 'Apr 1, 2025',
  },
  {
    icon: ClipboardList,
    title: 'Move-In / Move-Out Inspection Checklists',
    description:
      'Room-by-room inspection forms with photo documentation guidelines, condition grading scales, and damage assessment frameworks. Print-ready and digital formats.',
    cta: 'Get Template',
    tag: 'Inspection',
    image:
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
    author: authors.maya,
    readTime: '3 min read',
    date: 'Mar 22, 2025',
  },
  {
    icon: FileText,
    title: 'Notice Templates by Province',
    description:
      'Pre-formatted notice templates for rent increases, lease terminations, entry notices, and maintenance advisories. Auto-populated with required statutory language.',
    cta: 'Get Template',
    tag: 'Template',
    image:
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=80',
    author: authors.elena,
    readTime: '5 min read',
    date: 'Mar 10, 2025',
  },
  {
    icon: BookOpen,
    title: 'Tenant Communication Scripts',
    description:
      'Ready-to-use email and SMS templates for rent reminders, maintenance updates, lease renewals, and community announcements. Tested across 10,000+ tenant interactions.',
    cta: 'Get Template',
    tag: 'Comms',
    image:
      'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
    author: authors.maya,
    readTime: '6 min read',
    date: 'Feb 28, 2025',
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
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    author: authors.daniel,
    readTime: '5 min read',
    date: 'Apr 15, 2025',
  },
  {
    icon: Rocket,
    title: 'Spring 2025 Feature Releases',
    description:
      'Highlights from the latest release cycle: AI-powered maintenance triage, bulk lease renewal workflows, enhanced owner reporting dashboards, and mobile app improvements.',
    cta: 'Read More',
    tag: 'Release',
    image:
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
    author: authors.daniel,
    readTime: '9 min read',
    date: 'Apr 5, 2025',
  },
  {
    icon: TrendingUp,
    title: 'Product Roadmap Highlights',
    description:
      'A look at what the Revun team is building next. Preview upcoming features, vote on priorities, and understand the strategic direction of the platform.',
    cta: 'View Roadmap',
    tag: 'Roadmap',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    author: authors.daniel,
    readTime: '7 min read',
    date: 'Mar 18, 2025',
  },
]

/* ── Card & Section Types ─────────────────────────────────────────────── */

type ResourceCard = {
  icon: typeof BookOpen
  title: string
  description: string
  cta: string
  tag?: string
  href?: string
  image: string
  author: Author
  readTime: string
  date: string
}

type Section = {
  id: string
  eyebrow: string
  label: string
  heading: string
  headingAccent: string
  description: string
  cards: ResourceCard[]
  icon: typeof BookOpen
  cols: 3 | 4
  viewAllHref: string
  crossLink: { text: string; href: string; icon: typeof BookOpen }
}

/* ── Category Sections ────────────────────────────────────────────────── */

const sections: Section[] = [
  {
    id: 'guides',
    eyebrow: 'Guides & Playbooks',
    label: 'Guides',
    heading: 'Operational playbooks built for',
    headingAccent: 'North American operators',
    description:
      'Practical, step-by-step guides covering every aspect of property management — from onboarding your first tenant to scaling a multi-market portfolio.',
    cards: guidesAndPlaybooks,
    icon: BookOpen,
    cols: 4,
    viewAllHref: '#guides',
    crossLink: {
      text: 'See every capability inside the Revun platform',
      href: '/features/',
      icon: Sparkles,
    },
  },
  {
    id: 'comparisons',
    eyebrow: 'Comparison Reports',
    label: 'Compare',
    heading: 'See how Revun',
    headingAccent: 'stacks up',
    description:
      'Transparent, data-driven comparisons against alternatives. We publish the numbers so you can make the right decision for your portfolio.',
    cards: comparisonReports,
    icon: GitCompareArrows,
    cols: 3,
    viewAllHref: '/compare/',
    crossLink: {
      text: 'Open the full head-to-head comparison matrix',
      href: '/compare/',
      icon: GitCompareArrows,
    },
  },
  {
    id: 'implementation',
    eyebrow: 'Implementation',
    label: 'Implementation',
    heading: 'Go live with',
    headingAccent: 'confidence',
    description:
      'Everything you need to plan, execute, and verify a successful Revun deployment — whether you manage 20 units or 2,000.',
    cards: implementationResources,
    icon: Rocket,
    cols: 4,
    viewAllHref: '/how-revun-works/',
    crossLink: {
      text: 'Walk through exactly how a Revun rollout unfolds',
      href: '/how-revun-works/',
      icon: Rocket,
    },
  },
  {
    id: 'market-intelligence',
    eyebrow: 'Market Intelligence',
    label: 'Intelligence',
    heading: 'Data-driven decisions for',
    headingAccent: 'North American rental markets',
    description:
      'Market reports, regulatory updates, and operator benchmarks to help you stay ahead of trends and make informed portfolio decisions.',
    cards: marketIntelligence,
    icon: BarChart3,
    cols: 3,
    viewAllHref: '/solutions/',
    crossLink: {
      text: 'Find the solution stack for your operator profile',
      href: '/solutions/',
      icon: Users,
    },
  },
  {
    id: 'templates',
    eyebrow: 'Templates & Downloads',
    label: 'Templates',
    heading: 'Ready-to-use templates for',
    headingAccent: 'daily operations',
    description:
      'Lease clauses, inspection checklists, notice templates, and communication scripts, built for CA + US compliance and tested by operators.',
    cards: templatesAndDownloads,
    icon: Download,
    cols: 4,
    viewAllHref: '/help/',
    crossLink: {
      text: 'Browse the full Help Center for operator resources',
      href: '/help/',
      icon: BookOpen,
    },
  },
  {
    id: 'product-updates',
    eyebrow: 'Product Updates',
    label: 'Updates',
    heading: 'What we shipped and',
    headingAccent: "what's next",
    description:
      'Stay current with platform improvements, feature releases, and roadmap highlights. We build in public and ship every week.',
    cards: productUpdates,
    icon: Megaphone,
    cols: 3,
    viewAllHref: '/features/',
    crossLink: {
      text: 'See why thousands of operators pick Revun',
      href: '/why-revun/',
      icon: Sparkles,
    },
  },
]

/* ── Helpers ──────────────────────────────────────────────────────────── */

function AuthorLine({ author, readTime }: { author: Author; readTime: string }) {
  return (
    <div className="flex items-center gap-3">
      <Image
        src={author.avatar}
        alt={author.name}
        width={32}
        height={32}
        className="size-8 rounded-full object-cover ring-1 ring-[#E5E7EB]"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-semibold text-[#0A1628]">{author.name}</p>
        <p className="truncate text-[11px] text-[#475569]">{author.role}</p>
      </div>
      <div className="flex shrink-0 items-center gap-1 text-[11px] text-[#475569]">
        <Clock className="size-3" strokeWidth={2} />
        <span>{readTime}</span>
      </div>
    </div>
  )
}

/* ── Component ────────────────────────────────────────────────────────── */

export function ResourcesPageClient() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[#E5E7EB] bg-[#F5F6F8]">
        <motion.div
          className="relative z-10 mx-auto max-w-6xl px-6 pt-20 pb-12 lg:px-8"
          variants={heroStagger}
          initial="hidden"
          animate="visible"
        >
          <div className="mx-auto max-w-3xl text-center">
            <motion.p
              variants={fadeUp}
              className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-blue"
            >
              Revun Resource Center
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-balance text-[#0A1628] sm:text-5xl lg:text-6xl"
            >
              Software education and operational intelligence for{' '}
              <span className="text-brand-blue">property operators</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#475569]"
            >
              Playbooks, market data, compliance guides, and implementation resources, built around the real decisions North American property managers make every week.
            </motion.p>

            {/* Search-style input */}
            <motion.form
              variants={fadeUp}
              action="#"
              className="group mx-auto mt-8 flex h-12 w-full max-w-xl items-center gap-3 rounded-xl border border-[#E5E7EB] bg-white pl-4 pr-1 shadow-sm transition-colors focus-within:border-brand-blue focus-within:ring-2 focus-within:ring-brand-blue/20"
              role="search"
              aria-label="Search resources"
            >
              <Search className="size-4 shrink-0 text-[#475569]" strokeWidth={2} />
              <input
                type="search"
                placeholder="Search guides, reports, templates..."
                className="h-full flex-1 bg-transparent text-sm text-[#0A1628] placeholder:text-[#94A3B8] focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex h-10 shrink-0 items-center justify-center rounded-lg bg-brand-blue px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-dark"
              >
                Search
              </button>
            </motion.form>
          </div>
        </motion.div>

        {/* Category chip rail */}
        <motion.nav
          className="sticky top-0 z-20 border-t border-[#E5E7EB] bg-[#F5F6F8]/95 backdrop-blur supports-[backdrop-filter]:bg-[#F5F6F8]/80"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          aria-label="Resource categories"
        >
          <div className="mx-auto flex max-w-6xl items-center gap-2 overflow-x-auto px-6 py-3 lg:px-8">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-white px-3.5 py-1.5 text-sm font-medium text-[#0A1628] transition-all hover:-translate-y-0.5 hover:border-brand-blue hover:text-brand-blue hover:shadow-sm"
              >
                <s.icon className="size-3.5" strokeWidth={2} />
                {s.label}
              </a>
            ))}
          </div>
        </motion.nav>
      </section>

      {/* ── Featured Article Spotlight ─────────────────────────────── */}
      <section className="bg-white py-14 md:py-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <RevealOnScroll className="mb-6 flex items-end justify-between gap-4">
            <div>
              <motion.p
                variants={revealItem}
                className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-blue"
              >
                Featured
              </motion.p>
              <motion.h2
                variants={revealItem}
                className="font-heading text-2xl font-bold tracking-tight text-[#0A1628] md:text-3xl"
              >
                This week on the Revun desk
              </motion.h2>
            </div>
            <motion.a
              variants={revealItem}
              href="#market-intelligence"
              className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-blue hover:underline sm:inline-flex"
            >
              All market intelligence
              <ArrowRight className="size-3.5" />
            </motion.a>
          </RevealOnScroll>

          <RevealOnScroll>
            <motion.div variants={revealItem}>
              <Link
                href={featuredArticle.href}
                className="group grid overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-blue hover:shadow-md md:grid-cols-2"
              >
                <div className="relative aspect-[16/10] md:aspect-auto">
                  <Image
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-brand-blue shadow-sm backdrop-blur">
                    <BarChart3 className="size-3.5" strokeWidth={2} />
                    {featuredArticle.category}
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-5 p-8 md:p-10">
                  <div className="flex items-center gap-2 text-xs font-medium text-[#475569]">
                    <span>{featuredArticle.date}</span>
                    <span aria-hidden="true" className="size-1 rounded-full bg-[#E5E7EB]" />
                    <span>{featuredArticle.readTime}</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold leading-tight tracking-tight text-balance text-[#0A1628] md:text-3xl">
                    {featuredArticle.title}
                  </h3>
                  <p className="text-base leading-relaxed text-[#475569]">
                    {featuredArticle.excerpt}
                  </p>
                  <AuthorLine
                    author={featuredArticle.author}
                    readTime={featuredArticle.readTime}
                  />
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue transition-transform group-hover:gap-2.5">
                    Read the full report
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Content Sections ───────────────────────────────────────── */}
      {sections.map((section, sectionIdx) => (
        <section
          key={section.id}
          id={section.id}
          className={
            sectionIdx % 2 === 0
              ? 'scroll-mt-20 bg-[#F5F6F8] py-16 md:py-20'
              : 'scroll-mt-20 bg-white py-16 md:py-20'
          }
        >
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            {/* Editorial section header */}
            <RevealOnScroll className="mb-10 flex flex-col gap-6 border-b border-[#E5E7EB] pb-8 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <motion.p
                  variants={revealItem}
                  className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-blue"
                >
                  <section.icon className="size-3.5" strokeWidth={2} />
                  {section.eyebrow}
                </motion.p>
                <motion.h2
                  variants={revealItem}
                  className="font-display text-3xl font-bold tracking-tight text-balance text-[#0A1628] md:text-4xl"
                >
                  {section.heading}{' '}
                  <span className="text-brand-blue">{section.headingAccent}</span>
                </motion.h2>
                <motion.p
                  variants={revealItem}
                  className="mt-3 text-base leading-relaxed text-[#475569]"
                >
                  {section.description}
                </motion.p>
              </div>
              <motion.div variants={revealItem} className="shrink-0">
                <Link
                  href={section.viewAllHref}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:underline"
                >
                  View all
                  <ArrowRight className="size-3.5" />
                </Link>
              </motion.div>
            </RevealOnScroll>

            {/* Card grid */}
            <RevealOnScroll
              stagger={0.08}
              className={`grid gap-6 ${
                section.cols === 4
                  ? 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : 'sm:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {section.cards.map((card) => {
                const cardInner = (
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-blue hover:shadow-sm">
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#F5F6F8]">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                      {card.tag && (
                        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#0A1628] shadow-sm backdrop-blur">
                          <card.icon className="size-3" strokeWidth={2} />
                          {card.tag}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col gap-4 p-6">
                      <div className="flex items-center gap-2 text-[11px] font-medium text-[#475569]">
                        <span>{card.date}</span>
                        <span aria-hidden="true" className="size-1 rounded-full bg-[#E5E7EB]" />
                        <span className="inline-flex items-center gap-1">
                          <Clock className="size-3" strokeWidth={2} />
                          {card.readTime}
                        </span>
                      </div>

                      <h3 className="font-heading text-lg font-bold leading-snug tracking-tight text-[#0A1628]">
                        {card.title}
                      </h3>
                      <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-[#475569]">
                        {card.description}
                      </p>

                      <div className="mt-auto space-y-4 border-t border-[#E5E7EB] pt-4">
                        <AuthorLine author={card.author} readTime={card.readTime} />
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue transition-transform group-hover:gap-2.5">
                          {card.cta}
                          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </article>
                )

                return (
                  <motion.div key={card.title} variants={revealItem} className="h-full">
                    {card.href ? (
                      <Link href={card.href} className="block h-full">
                        {cardInner}
                      </Link>
                    ) : (
                      <div className="h-full">{cardInner}</div>
                    )}
                  </motion.div>
                )
              })}
            </RevealOnScroll>

            {/* Editorial cross-link bar */}
            <RevealOnScroll className="mt-10">
              <motion.div variants={revealItem}>
                <Link
                  href={section.crossLink.href}
                  className="group flex items-center justify-between gap-4 rounded-xl border border-[#E5E7EB] bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-brand-blue hover:shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#E8F2FE] text-brand-blue transition-colors group-hover:bg-brand-blue group-hover:text-white">
                      <section.crossLink.icon className="size-5" strokeWidth={1.8} />
                    </div>
                    <p className="text-sm font-semibold text-[#0A1628] md:text-base">
                      {section.crossLink.text}
                    </p>
                  </div>
                  <ArrowRight className="size-5 shrink-0 text-brand-blue transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </RevealOnScroll>
          </div>
        </section>
      ))}

      {/* ── Newsletter CTA ─────────────────────────────────────────── */}
      <section className="border-y border-[#E5E7EB] bg-[#F5F6F8] py-16 md:py-20">
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
              className="font-display text-4xl font-extrabold tracking-tight text-balance text-[#0A1628] md:text-5xl"
            >
              Get notified when we publish
            </motion.h2>
            <motion.p
              variants={revealItem}
              className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-[#475569]"
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

            <motion.p variants={revealItem} className="mt-4 text-sm text-[#475569]">
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
            className="font-display text-3xl font-bold tracking-tight text-balance text-[#0A1628] sm:text-4xl"
          >
            Ready to see Revun in action?
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mt-4 text-lg leading-relaxed text-[#475569]"
          >
            Explore the platform, compare it against alternatives, or talk to our team about your portfolio.
          </motion.p>
          <motion.div
            variants={revealItem}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/features/"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-blue px-8 text-base font-semibold text-white transition-colors hover:bg-brand-blue-dark"
            >
              Explore Features
            </Link>
            <Link
              href="/demo/"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-8 text-base font-semibold text-[#0A1628] transition-colors hover:border-brand-blue hover:text-brand-blue"
            >
              Book a Demo
            </Link>
            <Link
              href="/contact/"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-8 text-base font-semibold text-[#0A1628] transition-colors hover:border-brand-blue hover:text-brand-blue"
            >
              Contact Us
            </Link>
          </motion.div>
        </RevealOnScroll>
      </section>
    </>
  )
}
