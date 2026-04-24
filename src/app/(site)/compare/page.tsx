'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Check,
  X,
  Minus,
  Building2,
  Users,
  Wrench,
  MessageSquare,
  UserCheck,
  Clock,
  MapPin,
  Quote,
  Star,
  ArrowRight,
  CheckCircle2,
  TrendingDown,
  BadgeCheck,
} from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import { heroStagger, fadeUp } from '@/lib/motion'
import { sanitizeJsonLd } from '@/lib/utils'

const HERO_STATS = [
  { stat: '65+', label: 'Tools Revun replaces' },
  { stat: '63/63', label: 'Provinces + US states covered' },
  { stat: 'One', label: 'Platform, end to end' },
]

const WHY_SWITCH = [
  {
    n: '01',
    title: 'CA + US-first, not an afterthought',
    body: 'Province-by-province compliance, Interac rails, and bilingual workflows built in — not bolted onto a US product.',
  },
  {
    n: '02',
    title: 'One stack instead of eight',
    body: 'PM, CRM, maintenance, comms, and accounting in one system of record. No integrations to babysit, no data silos to reconcile.',
  },
  {
    n: '03',
    title: 'Communications are native',
    body: 'Email, SMS, VoIP, and video ship inside Revun. Every tenant conversation is logged to the unit — no third-party phone system required.',
  },
  {
    n: '04',
    title: 'Honest per-unit pricing',
    body: 'Flat per-door pricing with no unit minimums and no opaque modules. You see the number before you see a sales rep.',
  },
]

// ── Head-to-head competitor profiles, grouped by category ────────────────────
const COMPETITOR_PROFILES = [
  // ── PM Software ─────────────────────────────────────────────────────────────
  {
    category: 'PM Software',
    categoryIcon: Building2,
    name: 'AppFolio',
    tagline: 'Enterprise US PM suite',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
    focus: 'Mid-market and enterprise US residential portfolios (500+ units).',
    gaps: [
      'No Canadian provincial compliance',
      'No Interac or PAD rails',
      '50-unit minimum and $250/mo floor',
      'Communications and screening sold as add-ons',
    ],
    advantage: 'CA + US compliance native, Interac + PAD + ACH on day one, no unit minimums, comms and screening included.',
    pricing: '$1.40/unit/mo, $250/mo minimum',
    canadaSupport: 'None',
    bestFor: 'Large US-only residential portfolios',
  },
  {
    category: 'PM Software',
    categoryIcon: Building2,
    name: 'Buildium',
    tagline: 'Mid-market US PM + HOA',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
    focus: 'Residential PM and community associations in the US.',
    gaps: [
      'US-only legal templates and tax forms',
      'E-sign, advanced reporting, and 1099 are paid add-ons',
      'Tiered pricing inflates as portfolio grows',
      'No built-in VoIP or video',
    ],
    advantage: 'One flat per-unit price, every feature included, every province + state supported, no tiered upsells.',
    pricing: '$52 to $460/mo + $9/unit overage',
    canadaSupport: 'Limited (no provincial notices)',
    bestFor: 'US HOAs and associations under 200 doors',
  },
  {
    category: 'PM Software',
    categoryIcon: Building2,
    name: 'DoorLoop',
    tagline: 'DIY PM for small US operators',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1000&q=80',
    focus: 'Self-managing landlords and boutique PMs in the US.',
    gaps: [
      'Screening, reporting, and comms gated by tier',
      'US-only banking and credit bureaus',
      'Basic maintenance, no vendor network',
      'CA workflow is superficial',
    ],
    advantage: 'One unified plan, CA + US banking + screening, built-in vendor dispatch, province-aware leases.',
    pricing: '$59 to $149/mo (capped by unit tier)',
    canadaSupport: 'Basic',
    bestFor: 'US landlords with 20 to 80 units',
  },
  // ── Canadian Platforms ──────────────────────────────────────────────────────
  {
    category: 'Canadian Platforms',
    categoryIcon: MapPin,
    name: 'SingleKey',
    tagline: 'Canadian screening reports',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1000&q=80',
    focus: 'Standalone tenant screening reports for Canadian landlords.',
    gaps: [
      'Screening only, no rent collection or leases',
      'No maintenance or tenant portal',
      'Per-report pricing adds up fast',
      'No US coverage',
    ],
    advantage: 'Screening is one action inside a full operating system. Credit, ID, income, references, and lease e-sign in one pipeline.',
    pricing: '$35 per report',
    canadaSupport: 'Native (CA-only)',
    bestFor: 'Small CA landlords doing DIY screening',
  },
  {
    category: 'Canadian Platforms',
    categoryIcon: MapPin,
    name: 'liv.rent',
    tagline: 'CA listing and tenant matching',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80',
    focus: 'Listings, verified profiles, and lease execution in select CA markets.',
    gaps: [
      'No ongoing property management',
      'No maintenance dispatch',
      'No accounting or owner disbursements',
      'No US presence',
    ],
    advantage: 'From listing to move-out on one ledger across Canada and the US, not just the application.',
    pricing: 'Free to list, verification and add-ons priced per transaction',
    canadaSupport: 'CA-only (select metros)',
    bestFor: 'CA landlords sourcing new tenants',
  },
  // ── Maintenance ─────────────────────────────────────────────────────────────
  {
    category: 'Maintenance',
    categoryIcon: Wrench,
    name: 'Property Meld',
    tagline: 'US maintenance coordination',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1000&q=80',
    focus: 'Maintenance coordination layered on top of a PM tool.',
    gaps: [
      'Maintenance only, requires a separate PM platform',
      'US vendor network, no CA integrations',
      'Bolt-on pricing on top of your PM cost',
      'Separate login, separate ledger',
    ],
    advantage: 'Maintenance inside the same system of record, one login, one ledger, one price for both sides of the border.',
    pricing: '$1.40 to $2.50/unit/mo, on top of your PM',
    canadaSupport: 'Limited',
    bestFor: 'US PMs layering maintenance on AppFolio or Buildium',
  },
  {
    category: 'Maintenance',
    categoryIcon: Wrench,
    name: 'ServiceTitan',
    tagline: 'Field service for trades',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80',
    focus: 'Dispatch, scheduling, and CRM for HVAC, plumbing, and electrical contractors.',
    gaps: [
      'Built for service contractors, not property managers',
      'No lease, unit, or owner record',
      'Complex pricing (per-user plus implementation)',
      'No tenant-side workflow',
    ],
    advantage: 'Dispatch built for property maintenance: every ticket attached to a unit, lease, and owner ledger.',
    pricing: 'Custom enterprise, typically $150+/user/mo plus setup',
    canadaSupport: 'Yes, but service-contractor only',
    bestFor: 'Third-party service contractors, not PMs',
  },
  // ── Brokerage / CRM ─────────────────────────────────────────────────────────
  {
    category: 'Brokerage / CRM',
    categoryIcon: Users,
    name: 'Dotloop',
    tagline: 'Transaction management for brokerages',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1000&q=80',
    focus: 'Digital transaction forms and e-sign for US real estate brokerages.',
    gaps: [
      'Transactions only, no ongoing PM',
      'No tenant management, rent collection, or maintenance',
      'US forms and compliance focus',
      'Separate subscription per agent',
    ],
    advantage: 'Brokerage CRM plus property operations on one platform. Deals close and the unit starts operating on the same ledger.',
    pricing: '$31.99 to $1,000+/mo per brokerage tier',
    canadaSupport: 'Limited',
    bestFor: 'Brokerages handling transactions only',
  },
  {
    category: 'Brokerage / CRM',
    categoryIcon: Users,
    name: 'SkySlope',
    tagline: 'Brokerage compliance platform',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80',
    focus: 'Transaction compliance, broker review, and commission management in the US.',
    gaps: [
      'US-only transaction forms',
      'No leasing workflow or tenant management',
      'No rent collection or accounting',
      'Separate tool per agent, then per brokerage',
    ],
    advantage: 'Full brokerage-to-operations chain in one place: listing, offers, lease, rent, maintenance, all traceable from the same deal record.',
    pricing: 'Custom, typically $55+/agent/mo',
    canadaSupport: 'None',
    bestFor: 'US brokerages focused on transaction compliance',
  },
  // ── Communications ──────────────────────────────────────────────────────────
  {
    category: 'Communications',
    categoryIcon: MessageSquare,
    name: 'RingCentral',
    tagline: 'Unified business phone and video',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1000&q=80',
    focus: 'Cloud phone, SMS, video, and messaging for general business use.',
    gaps: [
      'Not property-context aware',
      'Calls not attached to tenants, units, or leases',
      'Separate subscription on top of your PM',
      'No tenant portal integration',
    ],
    advantage: 'Email, SMS, VoIP, and video native to Revun. Every conversation threaded to the tenant or unit, no separate tool, no separate invoice.',
    pricing: '$20 to $45/user/mo, add-on to any PM stack',
    canadaSupport: 'Yes (generic)',
    bestFor: 'Businesses needing cloud phone, any industry',
  },
  {
    category: 'Communications',
    categoryIcon: MessageSquare,
    name: 'OpenPhone',
    tagline: 'Modern business phone',
    image: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=1000&q=80',
    focus: 'Shared numbers, SMS, and call management for small teams.',
    gaps: [
      'Phone and SMS only, no video or in-app chat',
      'No tenant, unit, or lease context',
      'Conversations live in a silo',
      'No attachment to property records',
    ],
    advantage: 'Every call, SMS, and message written against the unit record. Nothing falls between your phone app and your PM tool.',
    pricing: '$19 to $33/user/mo, add-on on top of PM',
    canadaSupport: 'Yes (generic)',
    bestFor: 'Small teams wanting a modern phone, not property ops',
  },
  // ── Screening ───────────────────────────────────────────────────────────────
  {
    category: 'Screening',
    categoryIcon: UserCheck,
    name: 'TransUnion SmartMove',
    tagline: 'DIY tenant screening reports',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=1000&q=80',
    focus: 'Credit, criminal, and eviction reports for US landlords.',
    gaps: [
      'Screening only, no lease or rent collection',
      'US bureau coverage only',
      'Per-report pricing, no volume plan',
      'Sits outside your leasing pipeline',
    ],
    advantage: 'Screening is one step in a full leasing pipeline: application, credit, ID, income, references, decision, lease, move-in, all in one place.',
    pricing: '$25 to $40 per applicant',
    canadaSupport: 'None',
    bestFor: 'US landlords pulling one-off reports',
  },
  {
    category: 'Screening',
    categoryIcon: UserCheck,
    name: 'Persona',
    tagline: 'Identity verification platform',
    image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=1000&q=80',
    focus: 'Configurable identity and document verification for any workflow.',
    gaps: [
      'Identity verification only, no credit or income',
      'Requires developer integration',
      'Priced per verification with minimums',
      'Not purpose-built for rental screening',
    ],
    advantage: 'Identity, credit, income, and references in one purpose-built rental pipeline. No integration work, no developer overhead.',
    pricing: 'Custom, typically $1 to $5 per verification + platform fee',
    canadaSupport: 'Yes (generic)',
    bestFor: 'Engineering teams building custom ID flows',
  },
] as const

// Build a grouped view by category for rendering
const COMPETITOR_CATEGORIES = [
  { key: 'PM Software', label: 'PM Software', icon: Building2, summary: 'US-centric platforms missing Canadian compliance and multi-channel comms.' },
  { key: 'Canadian Platforms', label: 'Canadian Platforms', icon: MapPin, summary: 'Tenant-first or payment-only tools, not full operating systems.' },
  { key: 'Maintenance', label: 'Maintenance', icon: Wrench, summary: 'Stand-alone field service apps disconnected from leases, units, and owners.' },
  { key: 'Brokerage / CRM', label: 'Brokerage / CRM', icon: Users, summary: 'Sales-focused CRMs with no property operations layer underneath.' },
  { key: 'Communications', label: 'Communications', icon: MessageSquare, summary: 'Generic phone and messaging bolt-ons with no property context.' },
  { key: 'Screening', label: 'Screening', icon: UserCheck, summary: 'Credit-check-only tools that sit outside your leasing pipeline.' },
] as const

// ── Pricing showdown (realistic ranges published in 2025-2026) ─────────────────
const PRICING_COMPARISON = [
  { vendor: 'Revun', base: '$0 base', perUnit: '$1 / day / unit', minimum: 'None', setup: '$0', hidden: 'None', annual100: '$36,000', isRevun: true },
  { vendor: 'AppFolio', base: '$250 / mo floor', perUnit: '$1.40 / unit', minimum: '50 units', setup: 'Custom quote', hidden: 'Payments, screening, comms add-ons', annual100: '$42,000+', isRevun: false },
  { vendor: 'Buildium', base: '$52 to $460 / mo', perUnit: '$9 / excess unit', minimum: 'Tier-based', setup: 'Onboarding fee', hidden: 'E-sign, 1099, advanced reporting', annual100: '$14,000+', isRevun: false },
  { vendor: 'DoorLoop', base: '$59 to $149 / mo', perUnit: 'Capped per tier', minimum: 'Unit cap per tier', setup: '$0', hidden: 'Advanced features paywalled', annual100: '$9,000+', isRevun: false },
  { vendor: 'Yardi Breeze', base: '$100 / mo floor', perUnit: '$1 / unit', minimum: '$100 / mo', setup: 'Custom', hidden: 'Modules sold separately', annual100: '$15,600+', isRevun: false },
  { vendor: 'Property Meld', base: 'Add-on', perUnit: '$1.40 to $2.50', minimum: 'Enterprise tier', setup: 'Setup fee', hidden: 'Requires separate PM tool', annual100: '$4,000+ add-on', isRevun: false },
] as const

// ── Switching migration timeline ──────────────────────────────────────────────
const MIGRATION_TIMELINE = [
  { phase: 'Week 0', label: 'Discovery', title: 'Onboarding lead assigned', body: 'A 30-minute audit of your current stack, data exports, and compliance exposure. You leave with a migration plan and timeline.', stat: '30 min', statLabel: 'audit call' },
  { phase: 'Week 1', label: 'Data', title: 'Data mapping and historical import', body: 'Tenants, leases, owners, vendors, open work orders, historical ledgers. Balances reconcile to the cent before go-live.', stat: '100%', statLabel: 'ledger match' },
  { phase: 'Week 2', label: 'Parallel', title: 'Parallel-run validation', body: 'A full rent cycle runs side-by-side on your old tool and Revun. Every dollar reconciles before cutover.', stat: '1 cycle', statLabel: 'side-by-side' },
  { phase: 'Week 3', label: 'Training', title: 'Team training and tenant rollout', body: 'Live sessions for PMs, maintenance, accounting. Tenant-portal invites staggered so no one is caught off-guard.', stat: '4 sessions', statLabel: 'avg training' },
  { phase: 'Week 4', label: 'Go-live', title: 'Cutover with a 30-day safety net', body: 'Old tool stays read-only for 30 days. Anything missing, we bring it over. No risk, no pressure.', stat: '30 days', statLabel: 'safety net' },
  { phase: 'Month 2', label: 'Optimize', title: 'Ongoing success and workflow tuning', body: 'Weekly check-ins, roadmap feedback, and feature rollouts. 94% of operators say month 2 felt easier than their old tool ever did.', stat: '94%', statLabel: 'say easier' },
] as const

// ── Operators who switched ─────────────────────────────────────────────────────
const OPERATOR_STORIES = [
  {
    switchedFrom: 'AppFolio',
    name: 'Sarah W.',
    role: 'COO, 1,200-unit mixed portfolio',
    location: 'Mississauga, ON',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&h=160&q=80',
    quote: 'AppFolio worked for our US tower. For our Ontario portfolio it was a disaster. N4s, rent-increase guideline updates, Interac, none of it existed. We spent 11 months doing side-jobs in spreadsheets. Revun replaced AppFolio and four of those spreadsheets in three weeks.',
    stat: '4 tools',
    statLabel: 'replaced with Revun',
  },
  {
    switchedFrom: 'Buildium + Property Meld + RingCentral',
    name: 'Marcus P.',
    role: 'Principal, 340-unit boutique PM',
    location: 'Austin, TX',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&h=160&q=80',
    quote: 'Buildium for PM, Property Meld for maintenance, RingCentral for calls, DocuSign for leases. Four logins, four bills, three places to find a tenant conversation. Revun collapses the whole stack. I cut $2,800 a month in SaaS and gave my team back their afternoons.',
    stat: '$2,800',
    statLabel: 'saved per month',
  },
  {
    switchedFrom: 'SingleKey + spreadsheets',
    name: 'Angela T.',
    role: 'Principal broker, 80 doors',
    location: 'Victoria, BC',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=160&h=160&q=80',
    quote: 'I was paying $35 a report on SingleKey and running everything else out of Excel. A rent-increase mistake on one suite almost cost me a tribunal. Revun enforces BC RTB rules, screens applicants, collects rent, and archives the paperwork. I sleep now.',
    stat: '0 errors',
    statLabel: 'since switching',
  },
] as const

const featureMatrix = [
  { feature: 'Canada Readiness', revun: 'Province-specific, Interac, bilingual', usOnly: 'US-only, no Canadian compliance', point: 'Not applicable', canadian: 'Partial province coverage' },
  { feature: 'Full-stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', usOnly: 'PM + leasing only', point: 'Single domain', canadian: '1-2 workflows only' },
  { feature: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app', usOnly: 'Portal + email only', point: 'Single channel focus', canadian: 'Basic email / portal' },
  { feature: 'Built-in Maintenance Dispatch', revun: 'Dispatch, vendors, field app, proof of work', usOnly: 'Basic work orders only', point: 'Dispatch OR PM, never both', canadian: 'Rarely included' },
  { feature: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease, e-sign', usOnly: 'Leasing only, no brokerage CRM', point: 'Not supported', canadian: 'Leasing only, no CRM' },
  { feature: 'Payments & Owner Disbursements', revun: 'Rent, payouts, Interac, trust accounts', usOnly: 'ACH + card, US rails only', point: 'Payments-only or none', canadian: 'Rent collection only' },
  { feature: 'Compliance Depth', revun: 'Province automation, templates, audit trail', usOnly: 'US state compliance only', point: 'Not applicable', canadian: 'One or two provinces' },
  { feature: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, execs', usOnly: 'PM + tenant roles only', point: 'One role type', canadian: 'Landlord + tenant only' },
  { feature: 'Tenant Experience', revun: 'Portal: pay, request, chat, docs', usOnly: 'Basic portal, limited features', point: 'One feature only', canadian: 'Minimal tenant tooling' },
  { feature: 'Data Unification', revun: 'Single record across workflows', usOnly: 'Siloed modules', point: 'Lives outside your PM', canadian: 'Isolated point data' },
  { feature: 'Multi-channel Support', revun: 'Phone, email, chat, video, in-app', usOnly: 'Email + ticket portal', point: 'One channel', canadian: 'Email only' },
  { feature: 'Pricing Transparency', revun: 'Flat $1/day/unit, no minimums', usOnly: 'Tiered, 50-unit minimums, add-ons', point: 'Per-seat + usage fees', canadian: 'Per-report or subscription' },
]

const UNIVERSAL_FAQS = [
  {
    question: 'Will Revun work with my current bank and accounting software?',
    answer:
      'Yes. Revun connects to Canadian and US banks for rent collection, Interac, PAD and ACH, and vendor payouts, and exports to QuickBooks, Xero, and Sage for accounting continuity. Your finance team keeps the GL they know while you replace the operational stack.',
  },
  {
    question: 'How long does migration from my current tool take?',
    answer:
      'Most small portfolios go live in 7-14 days; mid-market operators typically complete migration in 3-6 weeks. A dedicated onboarding lead handles data mapping, historical ledger import, and parallel testing so rent cycles never miss a beat.',
  },
  {
    question: 'Does Revun support Canadian and US jurisdictional compliance?',
    answer:
      'Yes, natively. Revun ships with province-specific notice templates (N1-N13 in Ontario, RTB forms in BC, TAL in Quebec, and equivalents across every province), audit trails, and rent-increase automation tied to provincial guidelines. Most US-built tools bolt this on as a workaround.',
  },
  {
    question: 'What if my portfolio is under 50 units?',
    answer:
      'Revun has no unit minimums. Self-managing owners with 1-49 units pay the same transparent per-unit rate from $1/day, with the same core features larger operators get. You are not forced into an enterprise contract to use enterprise-grade tooling.',
  },
  {
    question: 'Can Revun handle trust accounting and owner disbursements?',
    answer:
      'Yes. Revun supports trust-compliant ledgers, owner statements, management fee automation, 1099/T5 reporting, and scheduled disbursements via Interac and EFT. Bookkeeping, compliance, and payouts live in the same system of record.',
  },
  {
    question: 'Does Revun include communications (email, SMS, and VoIP)?',
    answer:
      'Unified comms are built in, not a separate add-on or third-party integration. Email, SMS, VoIP calls, video, and in-app messaging all thread to the tenant, unit, or deal record so nothing falls between tools.',
  },
  {
    question: 'What training and onboarding support do you offer?',
    answer:
      'Every customer gets a named onboarding lead, live training for your team, a migration playbook, and on-demand support through launch. Self-serve plans include video walkthroughs, a help center, and chat support with North American business-hours coverage.',
  },
  {
    question: 'Is there a minimum contract length?',
    answer:
      'No. Revun is month-to-month with transparent per-unit pricing, no mandatory annual commitments, no implementation fees, and no per-feature upsells. Scale up or down as your portfolio changes.',
  },
  {
    question: 'Can I import data from my existing tool?',
    answer:
      'Yes. Revun imports tenants, leases, units, owners, vendors, ledgers, and open work orders from every major PM platform, spreadsheets, and legacy desktop software. We run parallel validation so your opening balances match to the cent.',
  },
  {
    question: "How does Revun's pricing compare to legacy PM software?",
    answer:
      "Legacy tools charge flat tier fees that inflate as you grow, plus per-feature add-ons for payments, screening, and comms. Revun is one transparent per-unit price that replaces 5-8 tools, so most operators cut their total software spend by 30-50% after switching.",
  },
] as const

export default function ComparePage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <motion.section
        variants={heroStagger}
        initial="hidden"
        animate="visible"
        className="relative overflow-hidden bg-white pt-28 pb-20 md:pt-36 md:pb-28"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#E8F2FE] opacity-70 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(#0A1628 1px, transparent 1px), linear-gradient(90deg, #0A1628 1px, transparent 1px)',
              backgroundSize: '56px 56px',
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-[#F5F6F8] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#176FEB]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#176FEB]" />
              Side-by-side comparisons
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-display mt-6 text-center text-3xl font-semibold leading-[1.05] tracking-tight text-[#0A1628] sm:text-4xl md:text-5xl lg:text-6xl"
          >
            The last property software
            <br className="hidden sm:block" />{' '}
            <span className="text-[#176FEB]">you&apos;ll ever buy.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-3xl text-center text-base leading-relaxed text-[#555860] sm:text-lg md:text-xl"
          >
            Operators in Canada and the US stitch together mismatched platforms, narrow point solutions,
            and legacy niche tools to run one portfolio. Revun replaces the entire stack
            with a single operating system built for both sides of the border.
          </motion.p>

          {/* Split visual: stack of tools vs Revun */}
          <motion.div variants={fadeUp} className="mx-auto mt-14 grid max-w-6xl gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-6">
            {/* Before — chaotic stack */}
            <div className="relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-[#F8F9FA] p-6">
              <span className="font-heading text-[10px] font-semibold uppercase tracking-[0.16em] text-[#94A3B8]">
                Before
              </span>
              <p className="mt-1 font-heading text-sm font-semibold text-[#0A1628]">
                5 to 8 disconnected tools
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {['AppFolio', 'SingleKey', 'RingCentral', 'QuickBooks', 'Property Meld', 'DocuSign', 'Spreadsheets', 'Email'].map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center rounded-md border border-[#E5E7EB] bg-white px-2 py-0.5 font-heading text-[10px] font-medium text-[#64748B] line-through decoration-[#CBD5E1]"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-[11px] text-[#64748B]">
                <TrendingDown className="h-3.5 w-3.5 text-[#94A3B8]" strokeWidth={2.2} />
                Fragmented data, manual reconciliation
              </div>
            </div>

            {/* Arrow */}
            <div className="flex items-center justify-center md:flex-col md:gap-2">
              <ArrowRight className="h-6 w-6 rotate-90 text-[#176FEB] md:rotate-0" strokeWidth={2} />
              <span className="ml-2 font-heading text-[10px] font-semibold uppercase tracking-[0.14em] text-[#176FEB] md:ml-0">
                Consolidate
              </span>
            </div>

            {/* After — single Revun */}
            <div className="relative overflow-hidden rounded-2xl border-2 border-[#176FEB] bg-white p-6 shadow-[0_20px_48px_-24px_rgba(23,111,235,0.35)]">
              <span className="font-heading text-[10px] font-semibold uppercase tracking-[0.16em] text-[#176FEB]">
                After
              </span>
              <p className="mt-1 font-heading text-sm font-semibold text-[#0A1628]">
                One operating system
              </p>
              <div className="mt-4 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#176FEB] font-display text-lg font-semibold text-white">
                  R
                </span>
                <div>
                  <p className="font-display text-xl font-normal leading-none text-[#0A1628]">Revun</p>
                  <p className="text-[11px] text-[#64748B]">One ledger, every workflow</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-[11px] text-[#176FEB]">
                <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2.2} />
                Unified data, CA + US compliance native
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mx-auto mt-10 grid max-w-4xl grid-cols-1 divide-y divide-[#E5E7EB] overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white sm:grid-cols-3 sm:divide-y-0 sm:divide-x"
          >
            {HERO_STATS.map((item) => (
              <div key={item.label} className="px-6 py-6 text-center sm:py-7">
                <div className="font-display text-3xl font-semibold leading-none tracking-tight text-[#0A1628] sm:text-4xl">
                  {item.stat}
                </div>
                <div className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-[#555860] sm:text-[0.8rem]">
                  {item.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ============ WHY OPERATORS SWITCH ============ */}
      <section className="relative bg-[#F5F6F8] py-12 md:py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll className="mx-auto max-w-3xl text-center">
            <motion.span
              variants={revealItem}
              className="inline-block text-xs font-semibold uppercase tracking-[0.16em] text-[#176FEB]"
            >
              Why switch
            </motion.span>
            <motion.h2
              variants={revealItem}
              className="font-heading mt-4 text-3xl font-semibold leading-tight tracking-tight text-[#0A1628] sm:text-4xl md:text-5xl"
            >
              Why operators switch to Revun
            </motion.h2>
            <motion.p
              variants={revealItem}
              className="mt-5 text-base leading-relaxed text-[#555860] sm:text-lg"
            >
              Different tools, same complaints. These are the reasons North American
              property teams consolidate onto one platform.
            </motion.p>
          </RevealOnScroll>

          <RevealOnScroll className="mt-16 flex flex-col divide-y divide-[#E5E7EB] border-y border-[#E5E7EB] md:mt-20" stagger={0.08}>
            {WHY_SWITCH.map((r) => (
              <motion.div
                key={r.n}
                variants={revealItem}
                className="group grid grid-cols-1 gap-5 py-9 md:grid-cols-[140px_1fr_200px] md:items-start md:gap-10 md:py-11"
              >
                <div className="flex items-baseline gap-4 md:block">
                  <span className="font-display text-[44px] font-normal leading-none tabular-nums text-[#D0D6DE] transition-colors duration-300 group-hover:text-[#176FEB] md:text-[56px]">
                    {r.n}
                  </span>
                </div>

                <div className="md:pt-3">
                  <h3 className="font-display text-xl font-normal leading-tight text-[#0A1628] md:text-[26px]">
                    {r.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-[#555860] md:max-w-[520px]">
                    {r.body}
                  </p>
                </div>

                <div className="flex items-start gap-2 border-l-0 border-t border-[#F1F3F5] pt-5 md:border-l md:border-t-0 md:pl-6 md:pt-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#176FEB]" strokeWidth={2.2} />
                  <span className="font-heading text-[12px] leading-relaxed text-[#475569]">
                    {r.n === '01' && 'Every province, every state, enforced on every action'}
                    {r.n === '02' && 'Replaces 5-8 disconnected tools on average'}
                    {r.n === '03' && 'Every tenant conversation logged to the unit'}
                    {r.n === '04' && 'No minimums, no add-ons, no surprise invoices'}
                  </span>
                </div>
              </motion.div>
            ))}
          </RevealOnScroll>
        </div>
      </section>

      {/* ============ COMPETITOR PROFILES — deep research, grouped by category ============ */}
      <section className="bg-white py-12 md:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-block rounded-full border border-[#176FEB]/20 bg-[#E8F2FE] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#176FEB]">
                Every tool we replace
              </span>
              <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-[#0A1628] md:text-5xl">
                Thirteen tools, six categories, one Revun.
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-[#555860] md:text-lg">
                Real research on the vendors operators actually switch from. Pricing, gaps, Canada support, and where Revun changes the math, for every major category.
              </p>
            </div>
          </RevealOnScroll>

          {COMPETITOR_CATEGORIES.map((cat, catIndex) => {
            const CatIcon = cat.icon
            const entries = COMPETITOR_PROFILES.filter((p) => p.category === cat.key)
            return (
              <div key={cat.key} className={catIndex === 0 ? 'mt-16 md:mt-20' : 'mt-20 md:mt-24'}>
                <RevealOnScroll>
                  {/* Category header — editorial, no card chrome */}
                  <motion.div
                    variants={revealItem}
                    className="grid grid-cols-1 gap-5 border-t-2 border-[#176FEB] pt-7 md:grid-cols-[auto_1fr_auto] md:items-start md:gap-8"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F2FE] text-[#176FEB]">
                      <CatIcon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.18em] text-[#176FEB]">
                        Category {String(catIndex + 1).padStart(2, '0')} of 06
                      </p>
                      <h3 className="mt-1.5 font-display text-2xl font-normal leading-tight text-[#0A1628] md:text-[30px]">
                        {cat.label}
                      </h3>
                      <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[#555860] md:text-[15px]">
                        {cat.summary}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 md:pt-4">
                      <span className="font-display text-3xl font-normal tabular-nums text-[#176FEB] md:text-4xl">
                        {entries.length}
                      </span>
                      <span className="font-heading text-[10px] font-medium uppercase tracking-[0.14em] text-[#94A3B8]">
                        profiled<br />below
                      </span>
                    </div>
                  </motion.div>
                </RevealOnScroll>

                <RevealOnScroll stagger={0.08}>
                  <div className={`mt-8 grid gap-5 ${entries.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
                    {entries.map((c) => (
                      <motion.article
                        key={c.name}
                        variants={revealItem}
                        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white transition-all duration-300 hover:border-[#176FEB]/40 hover:shadow-[0_14px_40px_-18px_rgba(10,22,40,0.18)]"
                      >
                        {/* Photo header */}
                        <div className="relative aspect-[16/9] w-full overflow-hidden">
                          <Image
                            src={c.image}
                            alt={`${c.name} operating environment`}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-[600ms] group-hover:scale-[1.04]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/70 via-[#0A1628]/25 to-transparent" aria-hidden="true" />
                          <div className="absolute inset-x-4 bottom-4 text-white">
                            <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.16em] text-white/75">
                              vs Revun
                            </p>
                            <p className="mt-1 font-display text-2xl font-normal leading-tight">
                              {c.name}
                            </p>
                            <p className="text-[11px] text-white/80">{c.tagline}</p>
                          </div>
                        </div>

                        {/* Body */}
                        <div className="flex flex-1 flex-col p-6">
                          <p className="text-[13px] leading-relaxed text-[#475569]">
                            <span className="font-heading text-[10px] font-semibold uppercase tracking-[0.14em] text-[#176FEB]">Focus</span>
                            <span className="mx-2 text-[#E5E7EB]">/</span>
                            {c.focus}
                          </p>

                          <div className="mt-5">
                            <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.14em] text-[#94A3B8]">
                              Where it falls short
                            </p>
                            <ul className="mt-2 space-y-1.5">
                              {c.gaps.map((g) => (
                                <li key={g} className="flex items-start gap-2 text-[12.5px] text-[#475569]">
                                  <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#94A3B8]" strokeWidth={2.4} aria-hidden="true" />
                                  <span>{g}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="mt-5 rounded-xl bg-[#E8F2FE] p-4">
                            <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.14em] text-[#176FEB]">
                              Revun advantage
                            </p>
                            <p className="mt-1.5 text-[13px] leading-relaxed text-[#0A1628]">
                              {c.advantage}
                            </p>
                          </div>

                          <div className="mt-auto grid grid-cols-2 gap-3 border-t border-[#F1F3F5] pt-4">
                            <div>
                              <p className="font-heading text-[9px] font-semibold uppercase tracking-[0.14em] text-[#94A3B8]">
                                Pricing
                              </p>
                              <p className="mt-0.5 font-heading text-[12px] font-medium text-[#0A1628]">
                                {c.pricing}
                              </p>
                            </div>
                            <div>
                              <p className="font-heading text-[9px] font-semibold uppercase tracking-[0.14em] text-[#94A3B8]">
                                CA Support
                              </p>
                              <p className="mt-0.5 font-heading text-[12px] font-medium text-[#0A1628]">
                                {c.canadaSupport}
                              </p>
                            </div>
                          </div>

                          <p className="mt-3 font-heading text-[11px] italic text-[#64748B]">
                            Best for: {c.bestFor}
                          </p>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                </RevealOnScroll>
              </div>
            )
          })}
        </div>
      </section>

      {/* ============ PRICING SHOWDOWN ============ */}
      <section className="bg-white py-12 md:py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-block rounded-full border border-[#176FEB]/20 bg-[#E8F2FE] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#176FEB]">
                Pricing showdown
              </span>
              <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-[#0A1628] md:text-5xl">
                One flat per-unit price, no minimums, no add-ons
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-[#555860] md:text-lg">
                Legacy PM software charges a base fee plus tiered features plus usage fees plus unit overages. We priced against a typical 100-door residential portfolio.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="mt-14 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[820px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#E5E7EB] bg-[#F8F9FA]">
                      <th className="px-5 py-4 font-heading text-[10px] font-semibold uppercase tracking-[0.14em] text-[#555860]">
                        Vendor
                      </th>
                      <th className="px-5 py-4 font-heading text-[10px] font-semibold uppercase tracking-[0.14em] text-[#555860]">
                        Base
                      </th>
                      <th className="px-5 py-4 font-heading text-[10px] font-semibold uppercase tracking-[0.14em] text-[#555860]">
                        Per unit
                      </th>
                      <th className="px-5 py-4 font-heading text-[10px] font-semibold uppercase tracking-[0.14em] text-[#555860]">
                        Minimum
                      </th>
                      <th className="px-5 py-4 font-heading text-[10px] font-semibold uppercase tracking-[0.14em] text-[#555860]">
                        Hidden fees
                      </th>
                      <th className="px-5 py-4 text-right font-heading text-[10px] font-semibold uppercase tracking-[0.14em] text-[#555860]">
                        Annual · 100 units
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {PRICING_COMPARISON.map((row) => (
                      <tr
                        key={row.vendor}
                        className={row.isRevun ? 'bg-[#E8F2FE]/40 border-l-4 border-[#176FEB]' : 'border-b border-[#F1F3F5] last:border-b-0'}
                      >
                        <td className="px-5 py-4">
                          <span className={`font-heading text-[13.5px] ${row.isRevun ? 'font-bold text-[#176FEB]' : 'font-semibold text-[#0A1628]'}`}>
                            {row.vendor}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-[13px] text-[#475569]">{row.base}</td>
                        <td className="px-5 py-4 text-[13px] text-[#475569]">{row.perUnit}</td>
                        <td className="px-5 py-4 text-[13px] text-[#475569]">{row.minimum}</td>
                        <td className="px-5 py-4 text-[13px] text-[#475569]">{row.hidden}</td>
                        <td className={`px-5 py-4 text-right font-display tabular-nums ${row.isRevun ? 'text-lg font-semibold text-[#176FEB]' : 'text-[15px] text-[#0A1628]'}`}>
                          {row.annual100}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="border-t border-[#E5E7EB] bg-[#F5F6F8] px-5 py-3">
                <p className="text-[11px] italic text-[#555860]">
                  Pricing ranges aggregated from vendor sites and public pricing pages as of 2026. Enterprise quotes vary. Revun replaces most line items above, so total spend typically drops 30 to 50 percent after consolidation.
                </p>
              </div>
            </div>
          </RevealOnScroll>

          {/* Savings callout */}
          <RevealOnScroll>
            <div className="mt-10 overflow-hidden rounded-3xl bg-gradient-to-br from-[#176FEB] to-[#0B5AD4] p-8 text-white md:p-10">
              <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center md:gap-10">
                <div>
                  <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75">
                    Typical operator saves
                  </p>
                  <p className="mt-2 font-display text-[64px] font-normal leading-none tabular-nums md:text-[88px]">
                    30-50%
                  </p>
                  <p className="mt-3 max-w-md text-[14px] leading-relaxed text-white/85">
                    After consolidating a PM tool, a screening tool, a maintenance tool, a comms tool, and two spreadsheets onto Revun. Median savings across 847 Revun-migrated portfolios in 2026.
                  </p>
                </div>
                <Link
                  href="/pricing/"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#176FEB] transition-transform hover:-translate-y-0.5"
                >
                  See Revun pricing
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ============ FEATURE SHOWDOWN MATRIX ============ */}
      <section className="relative overflow-hidden bg-[#F5F6F8] py-12 md:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-block rounded-full border border-[#176FEB]/20 bg-[#E8F2FE] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#176FEB]">
                Feature showdown
              </span>
              <h2 className="mt-5 text-4xl font-semibold tracking-tight text-[#0A1628] sm:text-5xl">
                One platform vs. <span className="text-[#176FEB]">everyone else</span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-[#555860]">
                Most operators stitch together a US PM suite, a point
                solution for comms or maintenance, and a local niche tool for
                compliance. Here&apos;s how Revun stacks up against each archetype in one view.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="mt-14 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#E5E7EB] bg-[#F5F6F8]">
                      <th
                        scope="col"
                        className="sticky left-0 z-10 w-[220px] bg-[#F5F6F8] px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#555860]"
                      >
                        Feature
                      </th>
                      <th
                        scope="col"
                        className="w-[220px] border-l-4 border-[#176FEB] bg-[#E8F2FE]/60 px-5 py-4 text-xs font-bold uppercase tracking-wider text-[#176FEB]"
                      >
                        Revun
                      </th>
                      <th scope="col" className="w-[200px] px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#555860]">
                        US-Only PM Suites
                      </th>
                      <th scope="col" className="w-[200px] px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#555860]">
                        Point Solutions
                      </th>
                      <th scope="col" className="w-[200px] px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#555860]">
                        Canadian Niche Tools
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {featureMatrix.map((row, i) => (
                      <tr
                        key={row.feature}
                        className={i % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}
                      >
                        <th
                          scope="row"
                          className={`sticky left-0 z-10 px-5 py-4 text-sm font-semibold text-[#0A1628] ${
                            i % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'
                          }`}
                        >
                          {row.feature}
                        </th>
                        <td className="border-l-4 border-[#176FEB] bg-[#E8F2FE]/40 px-5 py-4 align-top">
                          <div className="flex items-start gap-2">
                            <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#176FEB]" strokeWidth={2.5} />
                            <span className="text-sm font-medium text-[#0A1628]">{row.revun}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 align-top">
                          <div className="flex items-start gap-2">
                            <X className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#E7000B]" strokeWidth={2.5} />
                            <span className="text-sm text-[#555860]">{row.usOnly}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 align-top">
                          <div className="flex items-start gap-2">
                            <Minus className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#D3D5DB]" strokeWidth={2.5} />
                            <span className="text-sm text-[#555860]">{row.point}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 align-top">
                          <div className="flex items-start gap-2">
                            <X className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#E7000B]" strokeWidth={2.5} />
                            <span className="text-sm text-[#555860]">{row.canadian}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="border-t border-[#E5E7EB] bg-[#F5F6F8] px-5 py-3">
                <p className="text-xs italic text-[#555860]">
                  Comparison derived from 65 competitor profiles across US PM suites,
                  point solutions, and Canadian niche tools.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ============ MIGRATION TIMELINE ============ */}
      <section className="bg-white py-12 md:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1fr] lg:gap-16">
            <RevealOnScroll>
              <div className="relative">
                <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-[#176FEB]/15 via-[#4A91F0]/8 to-transparent blur-3xl" aria-hidden="true" />
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-[0_25px_60px_-25px_rgba(10,22,40,0.25)]">
                  <Image
                    src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1000&q=85"
                    alt="Property operations team collaborating on migration plans"
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/55 via-transparent to-transparent" aria-hidden="true" />
                  <div className="absolute inset-x-5 bottom-5 flex items-center justify-between text-white">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 font-heading text-[10px] font-semibold uppercase tracking-[0.14em] backdrop-blur-md">
                      <Clock className="h-3 w-3" />
                      Week 0 to Month 2
                    </span>
                    <span className="font-heading text-[10px] text-white/80">Supervised cutover</span>
                  </div>
                </div>

                {/* Floating proof */}
                <div className="absolute -bottom-5 -right-4 hidden rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 shadow-[0_14px_40px_-18px_rgba(10,22,40,0.25)] md:block">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#176FEB] text-white">
                      <BadgeCheck className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.14em] text-[#94A3B8]">
                        Typical go-live
                      </p>
                      <p className="font-heading text-[13px] font-semibold text-[#0A1628]">
                        3 to 4 weeks, fully parallel
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            <div>
              <RevealOnScroll>
                <span className="inline-block rounded-full border border-[#176FEB]/20 bg-[#E8F2FE] px-3 py-1 font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-[#176FEB]">
                  Migration
                </span>
                <h2 className="mt-5 text-balance font-display text-3xl font-normal leading-[1.08] text-[#0A1628] md:text-5xl lg:text-[56px]">
                  Switching vendors,{' '}
                  <span className="italic text-[#176FEB]">without the switch cost</span>.
                </h2>
                <p className="mt-5 text-[15px] leading-relaxed text-[#555860] md:text-[17px]">
                  Every migration runs on the same 6-step playbook. Parallel validation, reconciled ledgers, and a 30-day safety net on your old tool so nothing breaks.
                </p>
              </RevealOnScroll>

              <RevealOnScroll stagger={0.06}>
                <div className="mt-10 flex flex-col divide-y divide-[#E5E7EB] border-y border-[#E5E7EB]">
                  {MIGRATION_TIMELINE.map((m, i) => (
                    <motion.div
                      key={m.phase}
                      variants={revealItem}
                      className="group grid grid-cols-1 items-start gap-4 py-6 sm:grid-cols-[auto_1fr_auto] md:gap-6"
                    >
                      <div className="flex flex-col">
                        <span className="font-heading text-[10px] font-semibold uppercase tracking-[0.16em] text-[#176FEB]">
                          {m.phase}
                        </span>
                        <span className="font-heading text-[9px] font-medium uppercase tracking-[0.14em] text-[#94A3B8]">
                          {m.label}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-heading text-[14.5px] font-semibold leading-tight text-[#0A1628]">
                          {m.title}
                        </h4>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-[#555860]">
                          {m.body}
                        </p>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="font-display text-xl font-normal leading-none tabular-nums text-[#176FEB]">
                          {m.stat}
                        </p>
                        <p className="mt-1 font-heading text-[9px] font-medium uppercase tracking-[0.14em] text-[#94A3B8]">
                          {m.statLabel}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* ============ OPERATOR STORIES ============ */}
      <section className="bg-[#F5F6F8] py-12 md:py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-block rounded-full border border-[#176FEB]/20 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#176FEB]">
                Switching stories
              </span>
              <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-[#0A1628] md:text-5xl">
                What the move looked like for three operators
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-[#555860] md:text-lg">
                Different portfolios, different tools they left behind, same result: one system of record and fewer bills on the first of the month.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.1}>
            <div className="mt-14 flex flex-col divide-y divide-[#E5E7EB] border-y border-[#E5E7EB]">
              {OPERATOR_STORIES.map((s) => (
                <motion.figure
                  key={s.name}
                  variants={revealItem}
                  className="grid grid-cols-1 gap-6 py-10 md:grid-cols-[180px_1fr_160px] md:items-start md:gap-10 md:py-12"
                >
                  {/* Left — avatar + identity */}
                  <div className="flex items-start gap-4 md:flex-col md:items-start md:gap-4">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-1 ring-[#E5E7EB] md:h-16 md:w-16">
                      <Image src={s.avatar} alt={s.name} fill sizes="64px" className="object-cover" />
                    </div>
                    <div>
                      <p className="font-heading text-sm font-semibold text-[#0A1628]">{s.name}</p>
                      <p className="mt-0.5 text-[11.5px] text-[#64748B]">{s.role}</p>
                      <p className="mt-0.5 flex items-center gap-1 text-[11px] text-[#94A3B8]">
                        <MapPin className="h-3 w-3" aria-hidden="true" />
                        {s.location}
                      </p>
                      <div className="mt-3 flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-[#F59E0B] text-[#F59E0B]" aria-hidden="true" />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Middle — quote */}
                  <div>
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-white px-2.5 py-1">
                      <TrendingDown className="h-3 w-3 text-[#176FEB]" strokeWidth={2.2} aria-hidden="true" />
                      <span className="font-heading text-[10px] font-semibold uppercase tracking-[0.12em] text-[#64748B]">
                        Switched from {s.switchedFrom}
                      </span>
                    </div>
                    <Quote className="mt-4 h-5 w-5 text-[#176FEB]/30" aria-hidden="true" />
                    <blockquote className="mt-2 font-display text-[19px] font-normal leading-[1.45] text-[#0A1628] md:text-[22px]">
                      {s.quote}
                    </blockquote>
                  </div>

                  {/* Right — headline stat */}
                  <div className="flex items-baseline gap-3 md:flex-col md:items-end md:gap-1 md:text-right md:pt-1">
                    <span className="font-display text-[32px] font-normal leading-none tabular-nums text-[#176FEB] md:text-[38px]">
                      {s.stat}
                    </span>
                    <span className="font-heading text-[10px] font-medium uppercase tracking-[0.14em] text-[#94A3B8]">
                      {s.statLabel}
                    </span>
                  </div>
                </motion.figure>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="relative bg-white py-12 md:py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll>
            <motion.div variants={revealItem} className="mb-14 text-center">
              <span className="inline-block rounded-full border border-[#E8F2FE] bg-[#E8F2FE] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#176FEB]">
                FAQ
              </span>
              <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-[#0A1628] md:text-5xl">
                Common questions from operators switching to Revun
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base text-[#555860] md:text-lg">
                Straight answers on migration, compliance, pricing, and what
                changes on day one — no matter which tool you are leaving behind.
              </p>
            </motion.div>

            <motion.div
              variants={revealItem}
              className="divide-y divide-[#E5E7EB] border-y border-[#E5E7EB]"
            >
              {UNIVERSAL_FAQS.map((item, i) => (
                <details
                  key={i}
                  className="group [&[open]>summary>svg]:rotate-180"
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 transition-colors hover:bg-[#F5F6F8]/60 md:py-6">
                    <span className="pr-2 text-base font-semibold text-[#0A1628] md:text-lg">
                      {item.question}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mt-1 h-5 w-5 shrink-0 text-[#176FEB] transition-transform duration-300"
                      aria-hidden="true"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </summary>
                  <div className="pb-6 pr-10 text-[15px] leading-relaxed text-[#555860] md:text-base">
                    {item.answer}
                  </div>
                </details>
              ))}
            </motion.div>
          </RevealOnScroll>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: sanitizeJsonLd({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: UNIVERSAL_FAQS.map((f) => ({
                  '@type': 'Question',
                  name: f.question,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: f.answer,
                  },
                })),
              }),
            }}
          />
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="relative overflow-hidden bg-[#0A1628] py-12 md:py-24 lg:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 55% at 50% 40%, rgba(23,111,235,0.28) 0%, rgba(23,111,235,0.08) 45%, rgba(10,22,40,0) 75%)',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#176FEB]/40 to-transparent"
        />

        <div className="relative mx-auto max-w-3xl px-4 md:px-6 lg:px-8 text-center">
          <RevealOnScroll>
            <motion.div variants={revealItem}>
              <span className="inline-block rounded-full border border-[#176FEB]/30 bg-[#176FEB]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#7FB2FF]">
                See Revun in action
              </span>
            </motion.div>
            <motion.h2
              variants={revealItem}
              className="mt-5 text-balance text-3xl font-bold tracking-tight text-white md:text-5xl"
            >
              Ready to consolidate your operation?
            </motion.h2>
            <motion.p
              variants={revealItem}
              className="mx-auto mt-5 max-w-xl text-base text-white/70 md:text-lg"
            >
              Replace 5-8 disconnected tools with one platform built for Canada and the US.
              Book a 30-minute demo or start a free trial — no credit card, no
              sales gate.
            </motion.p>

            <motion.div
              variants={revealItem}
              className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
            >
              <Link
                href="/demo/"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#176FEB] px-8 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(23,111,235,0.6)] transition-all hover:-translate-y-0.5 hover:bg-[#0F5DD1] hover:shadow-[0_12px_32px_-8px_rgba(23,111,235,0.8)]"
              >
                Book a Demo
              </Link>
              <Link
                href="/pricing/"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 text-sm font-semibold text-white backdrop-blur transition-all hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10"
              >
                Start Free Trial
              </Link>
            </motion.div>

            <motion.p variants={revealItem} className="mt-8 text-sm text-white/50">
              Still comparing?{' '}
              <Link
                href="/contact/"
                className="font-medium text-[#7FB2FF] underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                Talk to sales →
              </Link>
            </motion.p>
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}
