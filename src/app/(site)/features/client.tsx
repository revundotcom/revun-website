'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  Zap,
  Globe,
  Lock,
  RefreshCw,
  Smartphone,
  BrainCircuit,
  Workflow,
  Database,
} from 'lucide-react'
import {
  TenantScreeningIcon,
  RentIcon,
  MaintenanceIcon,
  LeasingIcon,
  FinancialReportingIcon,
  OwnerPortalIcon,
} from '@/lib/feature-icons'

/* ═══════════════════════════════════════════ */
/*  Shared                                     */
/* ═══════════════════════════════════════════ */

const ease = [0.22, 1, 0.36, 1] as const

/* ═══════════════════════════════════════════ */
/*  Data                                       */
/* ═══════════════════════════════════════════ */

const CORE_MODULES = [
  {
    slug: 'tenant-screening',
    icon: TenantScreeningIcon,
    title: 'Tenant Screening',
    description:
      'Credit checks, identity verification, and background screening powered by Equifax and TransUnion.',
    stats: '< 3 min',
    statsLabel: 'Average report time',
    capabilities: [
      'Equifax & TransUnion reports',
      'AI risk scoring',
      'Applicant comparison',
      'Identity verification',
    ],
  },
  {
    slug: 'rent-collection',
    icon: RentIcon,
    title: 'Rent Collection',
    description:
      'Automated collection via ACH, credit card, and Interac e-Transfer with real-time reconciliation.',
    stats: '99.2%',
    statsLabel: 'On-time payment rate',
    capabilities: [
      'Multiple payment methods',
      'Auto-reminders',
      'Split payments',
      'Instant reconciliation',
    ],
  },
  {
    slug: 'maintenance-management',
    icon: MaintenanceIcon,
    title: 'Maintenance',
    description:
      'Tenant request portal, vendor routing, work order tracking, and proof-of-completion photos.',
    stats: '4.2 hrs',
    statsLabel: 'Avg. resolution time',
    capabilities: [
      'AI priority routing',
      'Vendor matching',
      'Work order lifecycle',
      'Before/after photos',
    ],
  },
  {
    slug: 'lease-management',
    icon: LeasingIcon,
    title: 'Lease Management',
    description:
      'Province-specific templates, e-signatures, automated renewals, and compliance tracking.',
    stats: '10+',
    statsLabel: 'Provincial templates',
    capabilities: [
      'LTB, RTB, TAL, RTDRS',
      'E-signatures built in',
      'Auto renewals',
      'Deadline tracking',
    ],
  },
  {
    slug: 'accounting',
    icon: FinancialReportingIcon,
    title: 'Accounting & Reporting',
    description:
      'Real-time financials, automated reconciliation, tax-ready statements, and owner disbursements.',
    stats: '1-click',
    statsLabel: 'Export to QuickBooks',
    capabilities: [
      'Real-time dashboards',
      'Bank reconciliation',
      'T4A & CRA reports',
      'Owner disbursements',
    ],
  },
  {
    slug: 'owner-portal',
    icon: OwnerPortalIcon,
    title: 'Owner Portal',
    description:
      'Transparent dashboards with real-time occupancy, revenue tracking, and document access.',
    stats: '60%',
    statsLabel: 'Fewer owner calls',
    capabilities: [
      'Live occupancy data',
      'Financial transparency',
      'Document vault',
      'White-label ready',
    ],
  },
]

const PLATFORM_PILLARS = [
  {
    icon: BrainCircuit,
    title: 'AI-Powered Automation',
    description:
      'From maintenance triage to rent reminders, AI handles the repetitive work so your team focuses on growth.',
    items: [
      'Smart priority routing for maintenance',
      'Automated lease renewal workflows',
      'Predictive late payment alerts',
      'AI tenant risk assessment',
    ],
  },
  {
    icon: Workflow,
    title: 'Connected Workflows',
    description:
      'Every module talks to every other module. A lease renewal updates accounting, triggers notices, and logs to the owner portal.',
    items: [
      'Cross-module data sync',
      'Event-driven automation',
      'Custom workflow builder',
      'Zero duplicate data entry',
    ],
  },
  {
    icon: Shield,
    title: 'Compliance Built In',
    description:
      'Province-specific rules, tribunal deadlines, and regulatory templates are embedded - not bolted on.',
    items: [
      'LTB, RTB, TAL, RTDRS rules',
      'Automated notice deadlines',
      'Rent increase calculators',
      'Audit-ready records',
    ],
  },
]

const DIFFERENTIATORS = [
  {
    icon: Globe,
    title: 'Canadian-First',
    description: 'Built for Canadian provinces and their unique tenancy laws from day one.',
  },
  {
    icon: Lock,
    title: 'Bank-Grade Security',
    description: '256-bit encryption, SOC 2 compliance, and multi-factor authentication.',
  },
  {
    icon: Smartphone,
    title: 'Mobile-Native',
    description: 'Full functionality on any device. Tenants, owners, and managers stay connected.',
  },
  {
    icon: Zap,
    title: 'Setup in Minutes',
    description: 'Import your portfolio, invite your team, and go live the same day.',
  },
  {
    icon: RefreshCw,
    title: 'Always Up to Date',
    description: 'Regulation changes, rate updates, and new integrations ship automatically.',
  },
  {
    icon: Database,
    title: 'Open API',
    description: 'Extend Revun with 40+ integrations or build your own with our REST API.',
  },
]

const WORKFLOW_STEPS = [
  {
    number: '01',
    title: 'Tenant Applies',
    description: 'Applicant fills out a branded form. Screening runs automatically.',
    module: 'Tenant Screening',
    moduleIcon: TenantScreeningIcon,
  },
  {
    number: '02',
    title: 'Lease Signed',
    description: 'Province-compliant lease generated and e-signed by both parties.',
    module: 'Lease Management',
    moduleIcon: LeasingIcon,
  },
  {
    number: '03',
    title: 'Rent Collected',
    description: 'First rent auto-collected. Reminders and late fees are hands-off.',
    module: 'Rent Collection',
    moduleIcon: RentIcon,
  },
  {
    number: '04',
    title: 'Issue Reported',
    description: 'Tenant submits a maintenance request. AI routes it to the right vendor.',
    module: 'Maintenance',
    moduleIcon: MaintenanceIcon,
  },
  {
    number: '05',
    title: 'Books Updated',
    description: 'Every transaction reconciles in real-time. Tax reports are ready.',
    module: 'Accounting',
    moduleIcon: FinancialReportingIcon,
  },
  {
    number: '06',
    title: 'Owner Informed',
    description: 'Owner sees everything in their portal - no phone call needed.',
    module: 'Owner Portal',
    moduleIcon: OwnerPortalIcon,
  },
]

/* ═══════════════════════════════════════════ */
/*  SECTION 1 - Hero                           */
/* ═══════════════════════════════════════════ */

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#F5F6F8] pb-16 pt-32 md:pb-20 md:pt-40">
      <div className="absolute inset-0 bg-dot-grid opacity-40" aria-hidden="true" />
      <div
        className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-[#176FEB]/[0.04] blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <RevealOnScroll stagger={0.1}>
          <motion.p
            variants={revealItem}
            className="font-heading text-sm font-semibold uppercase tracking-wider text-[#176FEB]"
          >
            Platform Features
          </motion.p>
          <motion.h1
            variants={revealItem}
            className="mt-3 font-display text-4xl font-normal text-[#0A1628] md:text-5xl lg:text-6xl"
          >
            Everything your property{' '}
            <span className="text-[#176FEB]">needs</span>
          </motion.h1>
          <motion.p
            variants={revealItem}
            className="mx-auto mt-5 max-w-2xl text-base text-[#555860] sm:text-lg"
          >
            Six core modules that replace fragmented tools with one connected platform.
            Built for Canadian property managers who want to grow, not just manage.
          </motion.p>
          <motion.div variants={revealItem} className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/pricing/"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-[#176FEB] px-8 font-heading text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#0B5AD4] hover:shadow-md"
            >
              Start Free Trial
            </Link>
            <Link
              href="/demo/"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-8 font-heading text-sm font-semibold text-[#0A1628] transition-all hover:-translate-y-0.5 hover:border-[#176FEB]/30"
            >
              Book a Demo
            </Link>
          </motion.div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════ */
/*  SECTION 2 - Core Modules                   */
/* ═══════════════════════════════════════════ */

function ModuleCard({
  mod,
  index,
}: {
  mod: (typeof CORE_MODULES)[number]
  index: number
}) {
  const Icon = mod.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.07, ease }}
      className="group relative flex flex-col rounded-2xl border border-[#E5E7EB] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#176FEB]/30 hover:shadow-card-hover"
    >
      <Link href={`/features/${mod.slug}/`} className="flex h-full flex-col p-7">
        {/* Header: icon + stat */}
        <div className="flex items-center justify-between">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F2FE]">
            <Icon className="h-6 w-6 text-[#176FEB]" />
          </span>
          <div className="rounded-lg bg-[#F5F6F8] px-3 py-1.5 text-right">
            <p className="font-heading text-lg font-bold leading-tight text-[#176FEB]">{mod.stats}</p>
            <p className="text-[10px] leading-tight text-[#555860]">{mod.statsLabel}</p>
          </div>
        </div>

        {/* Title + description */}
        <h3 className="mt-5 font-heading text-lg font-bold text-[#0A1628]">{mod.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[#555860]">{mod.description}</p>

        {/* Capabilities */}
        <ul className="mt-5 space-y-2">
          {mod.capabilities.map((cap) => (
            <li key={cap} className="flex items-center gap-2.5">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#176FEB]" />
              <span className="text-sm text-[#2C2E33]">{cap}</span>
            </li>
          ))}
        </ul>

        {/* Explore link */}
        <div className="mt-auto pt-6">
          <span className="inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-[#176FEB] transition-all group-hover:gap-2.5">
            Explore {mod.title}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

function CoreModulesSection() {
  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <RevealOnScroll className="mx-auto max-w-2xl text-center" stagger={0.1}>
          <motion.p
            variants={revealItem}
            className="font-heading text-sm font-semibold uppercase tracking-wider text-[#176FEB]"
          >
            Core Modules
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mt-3 font-display text-3xl font-normal text-[#0A1628] md:text-4xl lg:text-5xl"
          >
            Six modules, <span className="text-[#176FEB]">one platform</span>
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mx-auto mt-4 max-w-xl text-base text-[#555860] sm:text-lg"
          >
            Every module works alone. Together, they eliminate your entire tool stack.
          </motion.p>
        </RevealOnScroll>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CORE_MODULES.map((mod, i) => (
            <ModuleCard key={mod.slug} mod={mod} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════ */
/*  SECTION 3 - How it all connects            */
/* ═══════════════════════════════════════════ */

function WorkflowSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="bg-[#F5F6F8] py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <RevealOnScroll className="mx-auto max-w-2xl text-center" stagger={0.1}>
          <motion.p
            variants={revealItem}
            className="font-heading text-sm font-semibold uppercase tracking-wider text-[#176FEB]"
          >
            Connected Workflow
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mt-3 font-display text-3xl font-normal text-[#0A1628] md:text-4xl lg:text-5xl"
          >
            See how it all{' '}
            <span className="text-[#176FEB]">connects</span>
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mx-auto mt-4 max-w-xl text-base text-[#555860] sm:text-lg"
          >
            Follow a tenant from application to move-in. Every step triggers the next
            automatically.
          </motion.p>
        </RevealOnScroll>

        <div ref={ref} className="relative mt-14">
          {/* Connector line */}
          <div className="absolute left-6 top-0 hidden h-full w-px bg-[#176FEB]/15 lg:left-1/2 lg:block" aria-hidden="true" />

          <div className="space-y-6 lg:space-y-0">
            {WORKFLOW_STEPS.map((step, i) => {
              const Icon = step.moduleIcon
              const isLeft = i % 2 === 0
              return (
                <motion.div
                  key={step.number}
                  className={`relative lg:flex lg:items-center lg:gap-8 ${
                    i > 0 ? 'lg:mt-4' : ''
                  } ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1, ease }}
                >
                  {/* Content card */}
                  <div
                    className={`flex-1 rounded-xl border border-[#E5E7EB] bg-white p-5 shadow-editorial transition-all hover:border-[#176FEB]/30 hover:shadow-card-hover ${
                      isLeft ? 'lg:text-right' : 'lg:text-left'
                    }`}
                  >
                    <div
                      className={`flex items-center gap-2.5 ${
                        isLeft ? 'lg:flex-row-reverse' : ''
                      }`}
                    >
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#E8F2FE]">
                        <Icon className="size-4 text-[#176FEB]" />
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#176FEB]">
                        {step.module}
                      </span>
                    </div>
                    <h3 className="mt-3 font-heading text-base font-semibold text-[#0A1628]">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm text-[#555860]">{step.description}</p>
                  </div>

                  {/* Center dot */}
                  <div className="hidden lg:flex lg:shrink-0 lg:items-center lg:justify-center">
                    <span className="relative z-10 flex size-10 items-center justify-center rounded-full border-2 border-[#176FEB] bg-white font-heading text-xs font-bold text-[#176FEB]">
                      {step.number}
                    </span>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden flex-1 lg:block" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════ */
/*  SECTION 4 - Platform Pillars               */
/* ═══════════════════════════════════════════ */

function PlatformPillarsSection() {
  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <RevealOnScroll className="mx-auto max-w-2xl text-center" stagger={0.1}>
          <motion.p
            variants={revealItem}
            className="font-heading text-sm font-semibold uppercase tracking-wider text-[#176FEB]"
          >
            Platform Architecture
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mt-3 font-display text-3xl font-normal text-[#0A1628] md:text-4xl lg:text-5xl"
          >
            Built different,{' '}
            <span className="text-[#176FEB]">on purpose</span>
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mx-auto mt-4 max-w-xl text-base text-[#555860] sm:text-lg"
          >
            Three architectural pillars that make Revun more than a collection of tools.
          </motion.p>
        </RevealOnScroll>

        <RevealOnScroll className="mt-12 grid gap-6 lg:grid-cols-3" stagger={0.08}>
          {PLATFORM_PILLARS.map((pillar) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.title}
                variants={revealItem}
                className="group rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-editorial transition-all duration-300 hover:-translate-y-1 hover:border-[#176FEB]/30 hover:shadow-card-hover"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-[#E8F2FE] text-[#176FEB] transition-colors group-hover:bg-[#176FEB] group-hover:text-white">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 font-heading text-lg font-semibold text-[#0A1628]">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#555860]">
                  {pillar.description}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {pillar.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#176FEB]" />
                      <span className="text-sm text-[#0A1628]">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </RevealOnScroll>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════ */
/*  SECTION 5 - Why Revun Differentiators      */
/* ═══════════════════════════════════════════ */

function DifferentiatorsSection() {
  return (
    <section className="bg-[#F5F6F8] py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <RevealOnScroll className="mx-auto max-w-2xl text-center" stagger={0.1}>
          <motion.p
            variants={revealItem}
            className="font-heading text-sm font-semibold uppercase tracking-wider text-[#176FEB]"
          >
            Why Revun
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mt-3 font-display text-3xl font-normal text-[#0A1628] md:text-4xl lg:text-5xl"
          >
            The details that{' '}
            <span className="text-[#176FEB]">matter</span>
          </motion.h2>
        </RevealOnScroll>

        <RevealOnScroll
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.06}
        >
          {DIFFERENTIATORS.map((d) => {
            const Icon = d.icon
            return (
              <motion.div
                key={d.title}
                variants={revealItem}
                className="flex items-start gap-4 rounded-xl border border-[#E5E7EB] bg-white p-5 transition-all duration-200 hover:border-[#176FEB]/30 hover:shadow-sm"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#E8F2FE] text-[#176FEB]">
                  <Icon className="size-5" />
                </span>
                <div>
                  <h3 className="font-heading text-sm font-semibold text-[#0A1628]">{d.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#555860]">{d.description}</p>
                </div>
              </motion.div>
            )
          })}
        </RevealOnScroll>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════ */
/*  SECTION 6 - Comparison strip               */
/* ═══════════════════════════════════════════ */

const COMPARISON_ROWS = [
  { feature: 'Canadian compliance (LTB, RTB, TAL)', revun: true, others: false },
  { feature: 'Built-in communications (phone, video, chat)', revun: true, others: false },
  { feature: 'Interac e-Transfer support', revun: true, others: false },
  { feature: 'AI maintenance triage', revun: true, others: false },
  { feature: 'Owner portal with white-label', revun: true, others: 'Partial' as const },
  { feature: 'Tenant screening (Equifax + TransUnion)', revun: true, others: 'Partial' as const },
  { feature: 'No per-unit pricing caps', revun: true, others: false },
  { feature: 'Open REST API', revun: true, others: true },
]

function ComparisonSection() {
  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-4xl px-6">
        <RevealOnScroll className="mx-auto max-w-2xl text-center" stagger={0.1}>
          <motion.p
            variants={revealItem}
            className="font-heading text-sm font-semibold uppercase tracking-wider text-[#176FEB]"
          >
            Comparison
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mt-3 font-display text-3xl font-normal text-[#0A1628] md:text-4xl lg:text-5xl"
          >
            Revun vs. <span className="text-[#176FEB]">the rest</span>
          </motion.h2>
        </RevealOnScroll>

        <motion.div
          className="mt-10 overflow-hidden rounded-2xl border border-[#E5E7EB] shadow-editorial"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease }}
        >
          {/* Header */}
          <div className="grid grid-cols-[1fr_100px_100px] gap-4 border-b border-[#E5E7EB] bg-[#F5F6F8] px-6 py-4 sm:grid-cols-[1fr_120px_120px]">
            <span className="text-sm font-semibold text-[#0A1628]">Feature</span>
            <span className="text-center font-heading text-sm font-bold text-[#176FEB]">
              Revun
            </span>
            <span className="text-center text-sm font-semibold text-[#555860]">Others</span>
          </div>

          {/* Rows */}
          {COMPARISON_ROWS.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-[1fr_100px_100px] items-center gap-4 px-6 py-3.5 sm:grid-cols-[1fr_120px_120px] ${
                i < COMPARISON_ROWS.length - 1 ? 'border-b border-[#E5E7EB]' : ''
              }`}
            >
              <span className="text-sm text-[#0A1628]">{row.feature}</span>
              <span className="flex justify-center">
                {row.revun && (
                  <CheckCircle2 className="size-5 text-[#176FEB]" />
                )}
              </span>
              <span className="flex justify-center">
                {row.others === true ? (
                  <CheckCircle2 className="size-5 text-[#D3D5DB]" />
                ) : row.others === 'Partial' ? (
                  <span className="rounded-full bg-[#FEF3C7] px-2 py-0.5 text-[10px] font-semibold text-[#92400E]">
                    Partial
                  </span>
                ) : (
                  <span className="text-sm text-[#D3D5DB]">-</span>
                )}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════ */
/*  SECTION 7 - CTA                            */
/* ═══════════════════════════════════════════ */

function CTASection() {
  return (
    <section className="bg-[#0A1628] py-16 lg:py-20">
      <RevealOnScroll className="mx-auto max-w-3xl px-6 text-center" stagger={0.1}>
        <motion.h2
          variants={revealItem}
          className="font-display text-3xl font-normal text-white md:text-4xl lg:text-5xl"
        >
          Ready to replace your{' '}
          <span className="text-[#4A91F0]">tool stack</span>?
        </motion.h2>
        <motion.p
          variants={revealItem}
          className="mx-auto mt-4 max-w-xl text-base text-white/70"
        >
          Start your free trial today. Import your portfolio, invite your team, and go live in
          minutes - not months.
        </motion.p>
        <motion.div
          variants={revealItem}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/pricing/"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-[#176FEB] px-8 font-heading text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#1260d1] hover:shadow-lg"
          >
            Start Free Trial <ArrowRight className="ml-2 size-4" />
          </Link>
          <Link
            href="/demo/"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 px-8 font-heading text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/5"
          >
            Book a Demo
          </Link>
        </motion.div>
      </RevealOnScroll>
    </section>
  )
}

/* ═══════════════════════════════════════════ */
/*  Main export                                */
/* ═══════════════════════════════════════════ */

export function FeaturesPageClient() {
  return (
    <main>
      <HeroSection />
      <CoreModulesSection />
      <WorkflowSection />
      <PlatformPillarsSection />
      <DifferentiatorsSection />
      <ComparisonSection />
      <CTASection />
    </main>
  )
}
