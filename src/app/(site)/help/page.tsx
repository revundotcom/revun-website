'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  Rocket,
  CreditCard,
  Home,
  Building2,
  LifeBuoy,
  Search,
  Users,
  Briefcase,
  Wrench,
  ShieldCheck,
  FileText,
  BarChart3,
  UserCheck,
  BookOpen,
  PlayCircle,
  Calendar,
  Mail,
  Activity,
  ArrowRight,
  Sparkles,
  Receipt,
  ClipboardList,
  ChevronRight,
  MessageSquare,
} from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'
import { sanitizeJsonLd } from '@/lib/utils'
import { heroStagger, fadeUp } from '@/lib/motion'

/* ── Data ────────────────────────────────────────────────────────────── */

const popularArticles = [
  {
    icon: CreditCard,
    category: 'Payments',
    title: 'Setting up pre-authorized debit (PAD) for rent collection',
    description: 'Automate tenant rent collection with CAD/USD PAD agreements and bank-level verification.',
    readTime: '5 min read',
  },
  {
    icon: Home,
    category: 'Getting Started',
    title: 'Adding a new property and first unit',
    description: 'Walk through property profiles, unit setup, amenities, and photo uploads in under ten minutes.',
    readTime: '4 min read',
  },
  {
    icon: UserCheck,
    category: 'Screening',
    title: 'Running tenant screening reports (Equifax + TransUnion)',
    description: 'Pull credit, criminal, and eviction reports with consent-first workflows for Canadian and US applicants.',
    readTime: '6 min read',
  },
  {
    icon: FileText,
    category: 'Compliance',
    title: 'Generating N4 / 3-Day Notice in 60 seconds',
    description: 'Produce LTB-compliant notices with the correct form version, signatures, and delivery tracking.',
    readTime: '3 min read',
  },
  {
    icon: Receipt,
    category: 'Accounting',
    title: 'Connecting QuickBooks Online to Revun',
    description: 'Sync ledgers, chart of accounts, and trust balances with QBO in both Canadian and US editions.',
    readTime: '7 min read',
  },
  {
    icon: Users,
    category: 'Investors',
    title: 'Inviting co-owners and investors',
    description: 'Give partners portal access, distribution statements, and read-only views of key KPIs.',
    readTime: '4 min read',
  },
  {
    icon: Home,
    category: 'Tenant Portal',
    title: 'Setting up the tenant portal',
    description: 'Brand your tenant experience, configure payment options, and enable maintenance requests.',
    readTime: '5 min read',
  },
  {
    icon: ClipboardList,
    category: 'Accounting',
    title: 'Month-end close checklist',
    description: 'A repeatable close procedure covering reconciliations, adjustments, and owner statements.',
    readTime: '8 min read',
  },
]

const categories = [
  {
    icon: Rocket,
    title: 'Getting Started',
    count: '24 articles',
    subtopics: ['Account setup', 'Adding properties', 'Inviting your team'],
  },
  {
    icon: CreditCard,
    title: 'Payments & Collections',
    count: '31 articles',
    subtopics: ['PAD & e-transfer', 'Late fees & NSF', 'Reconciliation'],
  },
  {
    icon: UserCheck,
    title: 'Screening & Leasing',
    count: '19 articles',
    subtopics: ['Credit & background checks', 'Application flow', 'Digital lease signing'],
  },
  {
    icon: Wrench,
    title: 'Maintenance & Vendors',
    count: '22 articles',
    subtopics: ['Work orders', 'Vendor dispatch', 'Inspections'],
  },
  {
    icon: BarChart3,
    title: 'Accounting & Reports',
    count: '28 articles',
    subtopics: ['Owner statements', 'Trust accounting', 'GL & chart of accounts'],
  },
  {
    icon: Home,
    title: 'Tenant Portal',
    count: '16 articles',
    subtopics: ['Rent payments', 'Maintenance requests', 'Lease documents'],
  },
]

const audiences = [
  { label: 'Self-managing owners', slug: 'self-managing-owners', icon: Home },
  { label: 'Property management companies', slug: 'property-management-companies', icon: Building2 },
  { label: 'REITs', slug: 'reits', icon: BarChart3 },
  { label: 'Brokerages', slug: 'brokerages', icon: Briefcase },
  { label: 'Leasing companies', slug: 'leasing-companies', icon: Users },
  { label: 'Maintenance companies', slug: 'maintenance-companies', icon: Wrench },
  { label: 'Tenants', slug: 'tenants', icon: UserCheck },
  { label: 'Internal ops teams', slug: 'internal-ops-teams', icon: ShieldCheck },
]

const videos = [
  {
    title: 'Setup walkthrough',
    duration: '5 min',
    thumb: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=640&q=80',
    alt: 'Property manager reviewing Revun dashboard on a laptop',
  },
  {
    title: 'First rent collection',
    duration: '3 min',
    thumb: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=640&q=80',
    alt: 'Banking and payment interface on a modern desk',
  },
  {
    title: 'Running a screening',
    duration: '4 min',
    thumb: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=640&q=80',
    alt: 'Leasing agent meeting with a prospective tenant',
  },
  {
    title: 'Reading owner reports',
    duration: '6 min',
    thumb: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=640&q=80',
    alt: 'Financial reports and charts on a screen',
  },
  {
    title: 'Dispatching maintenance work orders',
    duration: '4 min',
    thumb: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=640&q=80',
    alt: 'Maintenance technician reviewing a work order on a tablet',
  },
  {
    title: 'Tenant portal tour',
    duration: '3 min',
    thumb: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=640&q=80',
    alt: 'Tenant using the Revun portal on a laptop in a kitchen',
  },
]

const supportCards = [
  {
    icon: Calendar,
    title: 'Book a demo call',
    description: 'Walk through Revun with a product specialist and map it to your portfolio.',
    href: '/demo/',
    cta: 'Schedule a time',
  },
  {
    icon: Mail,
    title: 'Email support',
    description: 'Reach our team for account, billing, or product questions. Replies within one business day.',
    href: '/contact/',
    cta: 'Send a message',
  },
  {
    icon: Activity,
    title: 'Check system status',
    description: 'Real-time uptime, incident history, and planned maintenance windows across regions.',
    href: '#',
    cta: 'View status',
  },
]

const resources = [
  {
    icon: BookOpen,
    title: 'Resource library',
    description: 'Playbooks, checklists, and benchmark reports for Canadian and US operators.',
    href: '/resources/',
  },
  {
    icon: Sparkles,
    title: 'How Revun works',
    description: 'A guided tour of the platform, from onboarding to month-end close.',
    href: '/how-revun-works/',
  },
  {
    icon: ShieldCheck,
    title: 'Why Revun',
    description: 'The positioning and proof behind our modern PropTech operating system.',
    href: '/why-revun/',
  },
]

const quickLinks = [
  'Accept first rent payment',
  'Invite your team',
  'Connect QuickBooks',
  'Generate an N4',
  'Run a screening',
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
              { name: 'Help Center', url: 'https://revun.com/help/' },
            ])
          ),
        }}
      />

      {/* ── Hero with search ──────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[#E5E7EB] bg-[#F5F6F8]">
        <motion.div
          className="relative z-10 mx-auto max-w-4xl px-4 md:px-6 lg:px-8 pt-16 md:pt-24 pb-12 md:pb-20 text-center"
          variants={heroStagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={fadeUp}
            className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-3.5 py-1.5 text-xs font-medium text-[#475569]"
          >
            <LifeBuoy className="h-3.5 w-3.5 text-[#176FEB]" strokeWidth={2} />
            Revun Help Center
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="font-display text-balance text-3xl font-extrabold leading-[1.08] tracking-tight text-[#0A1628] md:text-5xl lg:text-6xl"
          >
            How can we{' '}
            <span className="text-[#176FEB]">help you today?</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-[#475569]"
          >
            Guides, walkthroughs, and answers for every role on your team — from first property setup to month-end close.
          </motion.p>

          {/* Search */}
          <motion.div variants={fadeUp} className="mx-auto mt-10 max-w-2xl">
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#94A3B8]"
                strokeWidth={2}
              />
              <input
                type="text"
                placeholder="Search articles, guides, and tutorials..."
                className="h-14 w-full rounded-2xl border border-[#E5E7EB] bg-white py-3.5 pl-14 pr-32 text-base text-[#0A1628] shadow-sm transition-colors placeholder:text-[#94A3B8] focus:border-[#176FEB] focus:outline-none focus:ring-2 focus:ring-[#176FEB]/30"
                readOnly
              />
              <kbd className="absolute right-4 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded-md border border-[#E5E7EB] bg-[#F5F6F8] px-2 py-1 text-[11px] font-medium text-[#475569] sm:inline-flex">
                <span>Ctrl</span>
                <span>K</span>
              </kbd>
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            variants={fadeUp}
            className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-2 text-sm"
          >
            <span className="text-[#475569]">Popular:</span>
            {quickLinks.map((q) => (
              <Link
                key={q}
                href="#"
                className="rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-[#0A1628] transition-colors hover:border-[#176FEB] hover:text-[#176FEB]"
              >
                {q}
              </Link>
            ))}
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-8 text-sm text-[#475569]"
          >
            Need more help?{' '}
            <Link href="/demo/" className="font-semibold text-[#176FEB] hover:underline">
              Book a demo
            </Link>{' '}
            or{' '}
            <Link href="/contact/" className="font-semibold text-[#176FEB] hover:underline">
              contact support
            </Link>
            .
          </motion.p>
        </motion.div>
      </section>

      {/* ── Popular / Featured articles grid ─────────────────────── */}
      <section className="bg-white py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <motion.div variants={revealItem}>
              <h2 className="font-display text-3xl font-bold tracking-tight text-[#0A1628] sm:text-4xl">
                Popular articles
              </h2>
              <p className="mt-2 max-w-xl text-[#475569]">
                Hand-picked guides that answer the questions our support team hears most often.
              </p>
            </motion.div>
            <motion.div variants={revealItem}>
              <Link
                href="#"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#176FEB] hover:underline"
              >
                Browse all articles
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Link>
            </motion.div>
          </RevealOnScroll>

          <RevealOnScroll
            stagger={0.06}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {popularArticles.map((article) => {
              const Icon = article.icon
              return (
                <motion.div key={article.title} variants={revealItem}>
                  <Link
                    href="#"
                    className="group flex h-full flex-col rounded-2xl border border-[#E5E7EB] bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-[#176FEB]/40 hover:shadow-sm"
                  >
                    <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-[#E8F2FE] text-[#176FEB]">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-[#176FEB]">
                      {article.category}
                    </div>
                    <h3 className="font-heading mt-1.5 text-base font-semibold leading-snug text-[#0A1628] group-hover:text-[#176FEB]">
                      {article.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-[#475569]">
                      {article.description}
                    </p>
                    <div className="mt-4 text-xs font-medium text-[#475569]">
                      {article.readTime}
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Browse by category ────────────────────────────────────── */}
      <section className="bg-[#F5F6F8] py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll className="mb-10 max-w-2xl">
            <motion.h2
              variants={revealItem}
              className="font-display text-3xl font-bold tracking-tight text-[#0A1628] sm:text-4xl"
            >
              Browse by category
            </motion.h2>
            <motion.p variants={revealItem} className="mt-3 text-[#475569]">
              Jump into a topic and drill down. Every Revun workflow, documented.
            </motion.p>
          </RevealOnScroll>

          <RevealOnScroll
            stagger={0.06}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {categories.map((cat) => {
              const Icon = cat.icon
              return (
                <motion.div key={cat.title} variants={revealItem}>
                  <Link
                    href="#"
                    className="group flex h-full flex-col rounded-2xl border border-[#E5E7EB] bg-white p-7 transition-all hover:-translate-y-0.5 hover:border-[#176FEB]/40 hover:shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F2FE] text-[#176FEB]">
                        <Icon className="h-5 w-5" strokeWidth={1.8} />
                      </div>
                      <span className="text-xs font-medium text-[#475569]">
                        {cat.count}
                      </span>
                    </div>
                    <h3 className="font-heading mt-5 text-lg font-bold text-[#0A1628] group-hover:text-[#176FEB]">
                      {cat.title}
                    </h3>
                    <ul className="mt-4 space-y-1.5 text-sm text-[#475569]">
                      {cat.subtopics.map((s) => (
                        <li key={s} className="flex items-center gap-2">
                          <ChevronRight className="h-3.5 w-3.5 text-[#94A3B8]" strokeWidth={2} />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </Link>
                </motion.div>
              )
            })}
          </RevealOnScroll>
        </div>
      </section>

      {/* ── By audience ───────────────────────────────────────────── */}
      <section className="bg-white py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll className="mb-10 max-w-2xl">
            <motion.h2
              variants={revealItem}
              className="font-display text-3xl font-bold tracking-tight text-[#0A1628] sm:text-4xl"
            >
              Guides by audience
            </motion.h2>
            <motion.p variants={revealItem} className="mt-3 text-[#475569]">
              Content tailored to the role you play on your property or portfolio team.
            </motion.p>
          </RevealOnScroll>

          <RevealOnScroll
            stagger={0.04}
            className="flex flex-wrap gap-3"
          >
            {audiences.map((a) => {
              const Icon = a.icon
              return (
                <motion.div key={a.slug} variants={revealItem}>
                  <Link
                    href={`/solutions/${a.slug}/`}
                    className="group inline-flex items-center gap-2.5 rounded-full border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-medium text-[#0A1628] transition-all hover:-translate-y-0.5 hover:border-[#176FEB] hover:text-[#176FEB] hover:shadow-sm"
                  >
                    <Icon className="h-4 w-4 text-[#176FEB]" strokeWidth={1.8} />
                    {a.label}
                    <ArrowRight
                      className="h-3.5 w-3.5 text-[#94A3B8] transition-transform group-hover:translate-x-0.5 group-hover:text-[#176FEB]"
                      strokeWidth={2}
                    />
                  </Link>
                </motion.div>
              )
            })}
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Video tutorials ───────────────────────────────────────── */}
      <section className="bg-[#F5F6F8] py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <motion.div variants={revealItem}>
              <h2 className="font-display text-3xl font-bold tracking-tight text-[#0A1628] sm:text-4xl">
                Video tutorials
              </h2>
              <p className="mt-2 max-w-xl text-[#475569]">
                Short, focused walkthroughs for the workflows you run every week.
              </p>
            </motion.div>
            <motion.div variants={revealItem}>
              <Link
                href="#"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#176FEB] hover:underline"
              >
                Watch all tutorials
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Link>
            </motion.div>
          </RevealOnScroll>

          <RevealOnScroll
            stagger={0.06}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {videos.map((v) => (
              <motion.div key={v.title} variants={revealItem}>
                <Link
                  href="#"
                  className="group block overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white transition-all hover:-translate-y-0.5 hover:border-[#176FEB]/40 hover:shadow-sm"
                >
                  <div className="relative aspect-video overflow-hidden bg-[#0A1628]">
                    <Image
                      src={v.thumb}
                      alt={v.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/70 via-[#0A1628]/10 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-[#176FEB] shadow-lg transition-transform group-hover:scale-110">
                        <PlayCircle className="h-8 w-8" strokeWidth={1.6} />
                      </div>
                    </div>
                    <span className="absolute bottom-3 right-3 rounded-md bg-[#0A1628]/85 px-2 py-1 text-[11px] font-semibold text-white">
                      {v.duration}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-base font-semibold text-[#0A1628] group-hover:text-[#176FEB]">
                      {v.title}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Still need help? ──────────────────────────────────────── */}
      <section className="bg-white py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll className="mb-10 max-w-2xl text-center sm:text-left">
            <motion.h2
              variants={revealItem}
              className="font-display text-3xl font-bold tracking-tight text-[#0A1628] sm:text-4xl"
            >
              Still need help?
            </motion.h2>
            <motion.p variants={revealItem} className="mt-3 text-[#475569]">
              Reach our team directly — we answer every message within one business day.
            </motion.p>
          </RevealOnScroll>

          <RevealOnScroll
            stagger={0.07}
            className="grid gap-5 md:grid-cols-3"
          >
            {supportCards.map((card) => {
              const Icon = card.icon
              return (
                <motion.div key={card.title} variants={revealItem}>
                  <Link
                    href={card.href}
                    className="group flex h-full flex-col rounded-2xl border border-[#E5E7EB] bg-white p-7 transition-all hover:-translate-y-0.5 hover:border-[#176FEB]/40 hover:shadow-sm"
                  >
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F2FE] text-[#176FEB]">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-[#0A1628]">
                      {card.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-[#475569]">
                      {card.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#176FEB]">
                      {card.cta}
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        strokeWidth={2}
                      />
                    </span>
                  </Link>
                </motion.div>
              )
            })}
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Community / Resources rail ────────────────────────────── */}
      <section className="border-t border-[#E5E7EB] bg-[#F5F6F8] py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <motion.div variants={revealItem}>
              <h2 className="font-display text-3xl font-bold tracking-tight text-[#0A1628] sm:text-4xl">
                Go deeper
              </h2>
              <p className="mt-2 max-w-xl text-[#475569]">
                Learn the why behind Revun — strategy, workflows, and outcomes from real operators.
              </p>
            </motion.div>
            <motion.div variants={revealItem}>
              <Link
                href="/contact/"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#176FEB] hover:underline"
              >
                <MessageSquare className="h-4 w-4" strokeWidth={2} />
                Talk to our team
              </Link>
            </motion.div>
          </RevealOnScroll>

          <RevealOnScroll
            stagger={0.07}
            className="grid gap-5 md:grid-cols-3"
          >
            {resources.map((r) => {
              const Icon = r.icon
              return (
                <motion.div key={r.title} variants={revealItem}>
                  <Link
                    href={r.href}
                    className="group flex h-full flex-col rounded-2xl border border-[#E5E7EB] bg-white p-7 transition-all hover:-translate-y-0.5 hover:border-[#176FEB]/40 hover:shadow-sm"
                  >
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F2FE] text-[#176FEB]">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-[#0A1628] group-hover:text-[#176FEB]">
                      {r.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-[#475569]">
                      {r.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#176FEB]">
                      Explore
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        strokeWidth={2}
                      />
                    </span>
                  </Link>
                </motion.div>
              )
            })}
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}
