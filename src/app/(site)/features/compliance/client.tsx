'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import {
  ArrowRight,
  ArrowDown,
  ShieldCheck,
  MapPin,
  FileText,
  Calendar,
  Clock,
  Lock,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  Plus,
  BookOpen,
  Scale,
  Flag,
  Zap,
} from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const
const fadeUp = {
  initial: { opacity: 0, y: 12 },
  transition: { duration: 0.6, ease, delay: 0.1 },
}

/* ── Workflow steps: single source of truth ──────────────────────── */

const workflowSteps = [
  { id: 'detect', num: '01', label: 'Detect', handoff: 'Jurisdiction loaded from the property address' },
  { id: 'template', num: '02', label: 'Template', handoff: 'Province-compliant leases and notices on demand' },
  { id: 'deadline', num: '03', label: 'Deadline', handoff: 'Notice periods and rent windows counted for you' },
  { id: 'audit', num: '04', label: 'Audit', handoff: 'Every document versioned and tribunal-ready' },
  { id: 'update', num: '05', label: 'Update', handoff: 'Regulatory changes synced to your templates' },
  { id: 'coverage', num: '06', label: 'Coverage', handoff: 'Every province, every territory, one workflow' },
] as const

type StepId = (typeof workflowSteps)[number]['id']

/* ── Between-section handoff cue ─────────────────────────────────── */

function StepHandoff({ currentId }: { currentId: StepId }) {
  const idx = workflowSteps.findIndex((s) => s.id === currentId)
  const next = workflowSteps[idx + 1]
  if (!next) return null
  return (
    <div className="bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-4 px-6 py-8">
        <span className="h-px max-w-[120px] flex-1 bg-[#E5E7EB]" />
        <a
          href={`#${next.id}`}
          className="group flex items-center gap-2.5 text-xs uppercase tracking-widest text-brand-graphite-mid transition-colors hover:text-brand-blue"
        >
          <span>Up next</span>
          <span className="font-heading font-bold text-brand-blue">{next.num}</span>
          <span className="font-semibold text-brand-graphite">{next.label}</span>
          <span className="text-brand-graphite-mid normal-case tracking-normal">· {next.handoff}</span>
          <ArrowDown
            className="h-3.5 w-3.5 text-brand-blue transition-transform duration-200 group-hover:translate-y-0.5"
            strokeWidth={2}
          />
        </a>
        <span className="h-px max-w-[120px] flex-1 bg-[#E5E7EB]" />
      </div>
    </div>
  )
}

/* ── Section wrappers ────────────────────────────────────────────── */

function SW({
  children,
  id,
  dark,
}: {
  children: React.ReactNode
  id: string
  dark?: boolean
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 py-16 md:py-20 ${dark ? 'bg-[#F5F6F8]' : 'bg-white'}`}
    >
      <div className="mx-auto max-w-6xl px-6">{children}</div>
    </section>
  )
}

function SH({
  step,
  eyebrow,
  title,
  highlight,
  description,
}: {
  step?: string
  eyebrow: string
  title: string
  highlight: string
  description: string
}) {
  return (
    <RevealOnScroll className="mx-auto max-w-2xl text-center">
      <motion.div variants={revealItem} className="mb-4 flex items-center justify-center gap-3">
        {step && (
          <>
            <span className="font-display text-2xl font-normal leading-none text-brand-blue">
              Step {step}
            </span>
            <span className="h-px w-8 bg-brand-blue/30" />
          </>
        )}
        <span className="text-sm font-heading font-semibold uppercase tracking-wider text-brand-blue">
          {eyebrow}
        </span>
      </motion.div>
      <motion.h2
        variants={revealItem}
        className="text-balance font-display text-4xl font-normal text-brand-graphite md:text-5xl"
      >
        {title} <span className="text-keyword">{highlight}</span>
      </motion.h2>
      <motion.p
        variants={revealItem}
        className="mx-auto mt-4 max-w-xl text-balance text-lg text-brand-graphite/70"
      >
        {description}
      </motion.p>
    </RevealOnScroll>
  )
}

function Anim({
  children,
  className,
  delay = 0.1,
  x,
  y = 12,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  x?: number
  y?: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x: x ?? 0, y }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.5, ease, delay }}
    >
      {children}
    </motion.div>
  )
}

/* ── Province + jurisdiction data ────────────────────────────────── */

interface Province {
  abbr: string
  name: string
  tribunal: string
  tribunalAcronym: string
  rtaName: string
  keyForms: string
  rentCap2025: string
  rentCap2026: string
  ruleCount: number
}

const provinces: readonly Province[] = [
  {
    abbr: 'ON',
    name: 'Ontario',
    tribunal: 'Landlord and Tenant Board',
    tribunalAcronym: 'LTB',
    rtaName: 'Residential Tenancies Act, 2006',
    keyForms: 'N1, N4, N12, L1, L2',
    rentCap2025: '2.5%',
    rentCap2026: '2.1%',
    ruleCount: 42,
  },
  {
    abbr: 'BC',
    name: 'British Columbia',
    tribunal: 'Residential Tenancy Branch',
    tribunalAcronym: 'RTB',
    rtaName: 'Residential Tenancy Act',
    keyForms: 'RTB-7, RTB-32L, RTB-33',
    rentCap2025: '3.0%',
    rentCap2026: '2.3%',
    ruleCount: 38,
  },
  {
    abbr: 'QC',
    name: 'Quebec',
    tribunal: 'Tribunal administratif du logement',
    tribunalAcronym: 'TAL',
    rtaName: 'Civil Code of Québec (art. 1851 to 2000)',
    keyForms: 'TAL-806A, TAL-810A, RN Form',
    rentCap2025: 'Indexed',
    rentCap2026: '3.1%',
    ruleCount: 35,
  },
  {
    abbr: 'AB',
    name: 'Alberta',
    tribunal: 'Residential Tenancy Dispute Resolution Service',
    tribunalAcronym: 'RTDRS',
    rtaName: 'Residential Tenancies Act (RSA 2000, c. R-17.1)',
    keyForms: '14-Day Notice, 24-Hour Notice',
    rentCap2025: 'No cap',
    rentCap2026: '12-month rule',
    ruleCount: 24,
  },
  {
    abbr: 'MB',
    name: 'Manitoba',
    tribunal: 'Residential Tenancies Branch',
    tribunalAcronym: 'RTB',
    rtaName: 'Residential Tenancies Act (C.C.S.M. c. R119)',
    keyForms: 'Notice of Rent Increase, Termination',
    rentCap2025: '1.7%',
    rentCap2026: '1.8%',
    ruleCount: 22,
  },
  {
    abbr: 'SK',
    name: 'Saskatchewan',
    tribunal: 'Office of Residential Tenancies',
    tribunalAcronym: 'ORT',
    rtaName: 'Residential Tenancies Act, 2006',
    keyForms: 'Two-Month Notice, ORT Application',
    rentCap2025: 'No cap',
    rentCap2026: 'No cap',
    ruleCount: 18,
  },
  {
    abbr: 'NS',
    name: 'Nova Scotia',
    tribunal: 'Residential Tenancies Program',
    tribunalAcronym: 'RTP',
    rtaName: 'Residential Tenancies Act (RSNS 1989)',
    keyForms: 'Form J, Form D, Form C',
    rentCap2025: '5.0%',
    rentCap2026: '5.0%',
    ruleCount: 20,
  },
  {
    abbr: 'NB',
    name: 'New Brunswick',
    tribunal: 'Residential Tenancies Tribunal',
    tribunalAcronym: 'RTT',
    rtaName: 'Residential Tenancies Act (SNB 1975)',
    keyForms: 'Form 6, Form 12, Notice of Increase',
    rentCap2025: '3.0%',
    rentCap2026: '3.0%',
    ruleCount: 16,
  },
  {
    abbr: 'NL',
    name: 'Newfoundland & Labrador',
    tribunal: 'Residential Tenancies Office',
    tribunalAcronym: 'RTO',
    rtaName: 'Residential Tenancies Act, 2018',
    keyForms: 'Notice to Increase, Termination',
    rentCap2025: 'No cap',
    rentCap2026: '12-month rule',
    ruleCount: 14,
  },
  {
    abbr: 'PE',
    name: 'Prince Edward Island',
    tribunal: 'IRAC Residential Tenancy Office',
    tribunalAcronym: 'IRAC',
    rtaName: 'Residential Tenancy Act (2022)',
    keyForms: 'Annual Allowable Increase Notice',
    rentCap2025: '3.0%',
    rentCap2026: '2.0%',
    ruleCount: 15,
  },
  {
    abbr: 'YT',
    name: 'Yukon',
    tribunal: 'Rental Officer',
    tribunalAcronym: 'RO',
    rtaName: 'Residential Landlord and Tenant Act',
    keyForms: 'Notice of Termination, Application',
    rentCap2025: 'No cap',
    rentCap2026: 'No cap',
    ruleCount: 10,
  },
  {
    abbr: 'NT',
    name: 'Northwest Territories',
    tribunal: 'Rental Officer',
    tribunalAcronym: 'RO',
    rtaName: 'Residential Tenancies Act (RSNWT 1988)',
    keyForms: 'Rental Officer Application',
    rentCap2025: 'No cap',
    rentCap2026: 'No cap',
    ruleCount: 9,
  },
  {
    abbr: 'NU',
    name: 'Nunavut',
    tribunal: 'Rental Officer',
    tribunalAcronym: 'RO',
    rtaName: 'Residential Tenancies Act (C.S.Nu.)',
    keyForms: 'Rental Officer Application',
    rentCap2025: 'No cap',
    rentCap2026: 'No cap',
    ruleCount: 8,
  },
]

/* ── Hero ────────────────────────────────────────────────────────── */

function ComplianceHero() {
  return (
    <section className="relative overflow-hidden bg-white pb-12 pt-28 md:pt-36">
      {/* Subtle courthouse backdrop image */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Image
          src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=2000&q=80"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.08]"
        />
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white"
        aria-hidden="true"
      />
      <div className="bg-grid bg-grid-mask absolute inset-0 opacity-40" aria-hidden="true" />
      <div
        className="absolute right-[-200px] top-0 h-[500px] w-[500px] rounded-full bg-brand-blue/[0.04] blur-[120px]"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <RevealOnScroll>
          <motion.div
            variants={revealItem}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-1.5 shadow-sm"
          >
            <ShieldCheck className="h-4 w-4 text-brand-blue" />
            <span className="text-sm font-medium text-brand-graphite-mid">Compliance</span>
          </motion.div>
          <motion.h1
            variants={revealItem}
            className="text-balance font-display text-5xl font-normal leading-[1.1] tracking-tight text-brand-graphite md:text-7xl"
          >
            North American compliance,{' '}
            <span className="text-brand-blue">built for every jurisdiction</span>
          </motion.h1>
          <motion.p
            variants={revealItem}
            className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-brand-graphite-mid md:text-xl"
          >
            Detect the jurisdiction, generate the right lease, serve the right notice, and hit
            every deadline. LTB, RTB, TAL, RTDRS across Canada, plus DHCR, DRE, TREC, DBPR
            across the US. 13 provinces, 50 states, one workflow.
          </motion.p>
          <motion.div
            variants={revealItem}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link
              href="/demo/"
              className="inline-flex h-14 items-center justify-center rounded-xl bg-brand-blue px-8 text-base font-semibold text-white hover:bg-brand-blue-dark"
            >
              Book a Demo
            </Link>
            <Link
              href="/pricing/"
              className="inline-flex h-14 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-8 text-base font-semibold text-brand-graphite hover:border-brand-blue/30 hover:shadow-sm"
            >
              See Pricing
            </Link>
          </motion.div>

          {/* Scroll cue pointing at the sticky workflow nav below */}
          <motion.div
            variants={revealItem}
            className="mt-14 flex items-center justify-center gap-2 text-[11px] uppercase tracking-widest text-brand-graphite-mid"
          >
            <span className="h-px w-8 bg-[#E5E7EB]" />
            <span>Scroll for the full compliance walkthrough</span>
            <ArrowDown className="h-3 w-3 text-brand-blue" strokeWidth={2} />
            <span className="h-px w-8 bg-[#E5E7EB]" />
          </motion.div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

/* ── Step 01 · Detect jurisdiction from address ──────────────────── */

function DetectSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <SW id="detect">
      <SH
        step="01"
        eyebrow="Detect"
        title="Jurisdiction from the"
        highlight="property address"
        description="The moment a property is added, Revun resolves the province, pulls the correct tribunal, and activates the rule set. No manual setup, no wrong forms."
      />
      <div ref={ref} className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left: mockup card */}
        <motion.div
          className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white"
          {...fadeUp}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <div className="border-b border-[#E5E7EB] bg-[#F8F9FA] px-6 py-3">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-brand-graphite-mid">
              Property address resolver
            </span>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-2 rounded-xl border border-[#E5E7EB] px-4 py-3">
              <MapPin className="h-4 w-4 text-brand-blue" />
              <span className="text-sm text-brand-graphite">
                75 Portland St, Mississauga, ON L5H 3P1
              </span>
            </div>

            {/* Parsed results */}
            <div className="mt-5 space-y-3">
              {[
                { label: 'Province', value: 'ON · Ontario', Icon: Flag },
                { label: 'Tribunal', value: 'Landlord and Tenant Board (LTB)', Icon: Scale },
                { label: 'Statute', value: 'Residential Tenancies Act, 2006', Icon: BookOpen },
                { label: 'Rent cap 2026', value: '2.1% annual guideline', Icon: Calendar },
                { label: 'Notice forms', value: 'N1 · N2 · N4 · N5 · N11 · N12 · N13', Icon: FileText },
              ].map((row, i) => {
                const Icon = row.Icon
                return (
                  <motion.div
                    key={row.label}
                    className="flex items-start gap-3 rounded-xl bg-[#F5F6F8] px-4 py-3"
                    initial={{ opacity: 0, x: -8 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, ease, delay: 0.25 + i * 0.08 }}
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E8F2FE]">
                      <Icon className="h-4 w-4 text-brand-blue" strokeWidth={2} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] uppercase tracking-widest text-brand-graphite-mid">
                        {row.label}
                      </p>
                      <p className="truncate text-sm font-medium text-brand-graphite">
                        {row.value}
                      </p>
                    </div>
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" strokeWidth={2} />
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Right: editorial list */}
        <div className="flex flex-col divide-y divide-[#E5E7EB] border-y border-[#E5E7EB]">
          {[
            {
              icon: MapPin,
              title: 'Address parsing',
              desc: 'Postal-code resolution across Canada and the US pins every property to a province or state, municipality, and rent regulation zone.',
            },
            {
              icon: Scale,
              title: 'Regulator lookup',
              desc: 'Provincial tribunal, statute version, and active notice forms activate automatically per property.',
            },
            {
              icon: Zap,
              title: 'Rule-set activation',
              desc: 'The correct lease template, rent cap, notice periods, and French language requirements load before you write a single clause.',
            },
          ].map((f, i) => {
            const Icon = f.icon
            return (
              <Anim
                key={f.title}
                className="group flex flex-1 items-start gap-5 py-6"
                delay={0.2 + i * 0.1}
                x={16}
                y={0}
              >
                <Icon
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue transition-transform duration-200 group-hover:scale-110"
                  strokeWidth={1.8}
                />
                <div className="flex-1">
                  <h4 className="font-heading text-base font-semibold text-brand-graphite">
                    {f.title}
                  </h4>
                  <p className="mt-1 text-sm leading-relaxed text-brand-graphite-mid">
                    {f.desc}
                  </p>
                </div>
              </Anim>
            )
          })}
        </div>
      </div>
    </SW>
  )
}

/* ── Step 02 · Template generator ────────────────────────────────── */

function TemplateSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const tabs = ['Lease', 'N1', 'N4', 'N12', 'Inspection']
  const [active, setActive] = useState('N4')
  return (
    <SW id="template" dark>
      <SH
        step="02"
        eyebrow="Template"
        title="Lease and notice"
        highlight="generators"
        description="Pre-filled, province-compliant documents in seconds. Ontario Standard Form of Lease (2229E), LTB N-series notices, BC RTB filings, and TAL French schedules, all generated from property and tenant data."
      />

      {/* Editorial banner image */}
      <div className="relative mx-auto mt-10 aspect-[21/7] max-w-5xl overflow-hidden rounded-2xl">
        <Image
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=2000&q=80"
          alt="Legal reference books lined on a shelf, representing provincial tenancy statutes"
          fill
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#F5F6F8] via-[#F5F6F8]/20 to-transparent"
          aria-hidden="true"
        />
      </div>

      <div ref={ref} className="mt-12 grid gap-8 lg:grid-cols-[1fr_1fr]">
        {/* Left: Lease preview */}
        <motion.div
          className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white"
          {...fadeUp}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <div className="flex items-center justify-between border-b border-[#E5E7EB] px-6 py-4">
            <div>
              <h3 className="font-heading text-sm font-semibold text-brand-graphite">
                Ontario Standard Form of Lease
              </h3>
              <p className="text-[11px] text-brand-graphite-mid">Form 2229E · Mandatory since 2018</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#E8F2FE] px-2.5 py-1 text-[10px] font-semibold text-brand-blue">
              <CheckCircle2 className="h-3 w-3" strokeWidth={2.5} />
              Compliant
            </span>
          </div>
          <div className="space-y-3 p-6">
            {[
              { label: 'Landlord', value: 'Meridian Property Holdings Inc.' },
              { label: 'Tenant', value: 'John Doe, Emily Chen' },
              { label: 'Rental unit', value: 'Unit 5D, 75 Portland St, Mississauga' },
              { label: 'Monthly rent', value: '$2,100.00 CAD' },
              { label: 'Rent deposit', value: 'Last month rent only (ON rule)' },
              { label: 'Term', value: '12 months · Jun 1, 2025 to May 31, 2026' },
            ].map((row, i) => (
              <motion.div
                key={row.label}
                className="flex items-baseline justify-between border-b border-dashed border-[#E5E7EB] pb-2 last:border-0"
                initial={{ opacity: 0, x: -6 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.25, ease, delay: 0.25 + i * 0.05 }}
              >
                <span className="text-[11px] uppercase tracking-widest text-brand-graphite-mid">
                  {row.label}
                </span>
                <span className="text-sm text-brand-graphite">{row.value}</span>
              </motion.div>
            ))}
          </div>
          <div className="border-t border-[#E5E7EB] bg-[#F5F6F8] px-6 py-3 text-[11px] text-brand-graphite-mid">
            Generated in 1.4s. Signable under Ontario Electronic Commerce Act, 2000.
          </div>
        </motion.div>

        {/* Right: Notice tab previewer */}
        <motion.div
          className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
        >
          <div className="flex overflow-x-auto border-b border-[#E5E7EB]">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setActive(t)}
                className={`shrink-0 px-5 py-3 text-xs font-semibold transition-colors ${
                  active === t
                    ? 'border-b-2 border-brand-blue text-brand-blue'
                    : 'text-brand-graphite-mid hover:text-brand-graphite'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease }}
              className="p-6"
            >
              {active === 'N4' ? (
                <>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-brand-blue">
                    N4 · Notice to End Tenancy
                  </p>
                  <p className="mt-1 font-heading text-lg font-semibold text-brand-graphite">
                    Non-payment of rent
                  </p>
                  <div className="mt-4 space-y-2.5 text-sm text-brand-graphite-mid">
                    <p>
                      <span className="font-semibold text-brand-graphite">Purpose.</span> Notify
                      a tenant that rent is owed and tenancy will end unless cured.
                    </p>
                    <p>
                      <span className="font-semibold text-brand-graphite">Service.</span> In
                      person, by mail, or by email with consent. Mail adds 5 days to the
                      termination date.
                    </p>
                    <p>
                      <span className="font-semibold text-brand-graphite">Cure window.</span> 14
                      days from service to pay in full and void the notice.
                    </p>
                    <p>
                      <span className="font-semibold text-brand-graphite">Next step.</span> File
                      an L1 with the LTB if unpaid after the termination date.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-brand-blue">
                    {active}
                  </p>
                  <p className="mt-1 font-heading text-lg font-semibold text-brand-graphite">
                    Select a tab to preview another form
                  </p>
                  <p className="mt-3 text-sm text-brand-graphite-mid">
                    Every notice preview shows purpose, service method, waiting period, and
                    downstream filing action. Swap back to N4 for the detailed example.
                  </p>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </SW>
  )
}

/* ── Step 03 · Deadline windows ──────────────────────────────────── */

function DeadlineSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <SW id="deadline">
      <SH
        step="03"
        eyebrow="Deadline"
        title="Notice periods and"
        highlight="rent windows"
        description="Every province counts days differently. Revun tracks service dates, cure windows, rent-increase anniversaries, and filing eligibility per jurisdiction. The deadline never sneaks up."
      />
      <div ref={ref} className="mt-12 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch lg:gap-16">
        {/* Left: editorial timeline, no card wrapper */}
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          <div className="mb-6 flex items-center justify-between border-b border-[#E5E7EB] pb-3">
            <h3 className="font-heading text-sm font-semibold text-brand-graphite">
              Active N4 timeline
            </h3>
            <span className="text-[10px] uppercase tracking-widest text-brand-graphite-mid tabular-nums">
              Ontario · Unit 5D
            </span>
          </div>

          <div className="relative flex-1">
            {/* Animated SVG connector */}
            <svg
              className="absolute left-[5px] top-2 h-[calc(100%-16px)] w-px overflow-visible"
              aria-hidden="true"
            >
              <motion.line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="#176FEB"
                strokeOpacity="0.25"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.4, ease, delay: 0.3 }}
              />
            </svg>

            <div className="flex h-full flex-col justify-between gap-7">
              {[
                {
                  day: 'Day 0',
                  title: 'N4 served',
                  detail: 'Served by email with tenant consent at 09:14 EST',
                  dot: 'solid',
                },
                {
                  day: 'Day 14',
                  title: 'Cure window closes',
                  detail: 'Tenant may pay in full to void the notice',
                  dot: 'solid',
                },
                {
                  day: 'Day 15',
                  title: 'L1 filing eligible',
                  detail: 'Application to end tenancy and collect arrears opens',
                  dot: 'ring',
                },
                {
                  day: 'Day 30',
                  title: 'Hearing scheduled',
                  detail: 'LTB targets a median 30-day hearing window',
                  dot: 'ring',
                },
              ].map((row, i) => (
                <motion.div
                  key={row.title}
                  className="relative flex items-start gap-4 pl-7"
                  initial={{ opacity: 0, x: -8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, ease, delay: 0.55 + i * 0.1 }}
                >
                  <span
                    className={`absolute left-0 top-1 h-3 w-3 rounded-full ${
                      row.dot === 'solid'
                        ? 'bg-brand-blue ring-4 ring-brand-blue/15'
                        : 'bg-white ring-2 ring-brand-blue'
                    }`}
                  />
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-heading text-sm font-bold text-brand-blue tabular-nums">
                        {row.day}
                      </span>
                      <span className="text-sm font-semibold text-brand-graphite">
                        {row.title}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs leading-relaxed text-brand-graphite-mid">
                      {row.detail}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right: editorial rules list, no card wrapper */}
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
        >
          <div className="mb-6 flex items-center justify-between border-b border-[#E5E7EB] pb-3">
            <h3 className="font-heading text-sm font-semibold text-brand-graphite">
              Rent-increase rules the engine enforces
            </h3>
            <span className="text-[10px] uppercase tracking-widest text-brand-graphite-mid">
              Across Canada
            </span>
          </div>

          <div className="flex flex-1 flex-col divide-y divide-[#E5E7EB]">
            {[
              {
                rule: '12-month rent increase rule',
                pill: 'All RTA provinces',
                detail: 'No increase within 12 months of tenancy start or the last increase.',
              },
              {
                rule: '90-day written notice',
                pill: 'Ontario',
                detail: 'Form N1 must be served at least 90 days before the effective date or the increase is void.',
              },
              {
                rule: '3 full months notice',
                pill: 'British Columbia',
                detail: 'RTB-7 served three complete rental months before the effective date.',
              },
              {
                rule: 'Quebec indexation',
                pill: 'TAL formula',
                detail: 'Annual TAL formula published each January, applied to registered leases.',
              },
              {
                rule: '2026 annual guidelines',
                pill: 'Published',
                detail: 'ON 2.1%, BC 2.3%, MB 1.8%, PE 2.0%, NS 5.0%, NB 3.0%, QC 3.1%.',
              },
            ].map((r, i) => (
              <motion.div
                key={r.rule}
                className="group flex flex-1 items-start gap-4 py-4"
                initial={{ opacity: 0, x: 8 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, ease, delay: 0.35 + i * 0.08 }}
              >
                <Clock
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue transition-transform duration-200 group-hover:scale-110"
                  strokeWidth={2}
                />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-heading text-sm font-semibold text-brand-graphite">
                      {r.rule}
                    </span>
                    <span className="rounded-full bg-[#E8F2FE] px-2 py-0.5 text-[10px] font-semibold text-brand-blue">
                      {r.pill}
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-brand-graphite-mid tabular-nums">
                    {r.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="mt-4 border-t border-[#E5E7EB] pt-3 text-[11px] text-brand-graphite-mid">
            Guideline figures sourced from provincial gazettes. Verified quarterly.
          </p>
        </motion.div>
      </div>
    </SW>
  )
}

/* ── Step 04 · Audit + version history ───────────────────────────── */

function AuditSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const events = [
    { at: 'Mar 14, 09:02', who: 'Landlord · Mark A.', what: 'Lease v1.0 generated from Form 2229E', type: 'solid' },
    { at: 'Mar 14, 14:28', who: 'Landlord · Mark A.', what: 'Clause 14 edited (rent deposit wording)', type: 'solid' },
    { at: 'Mar 15, 10:11', who: 'Tenant · Emily C.', what: 'Signed (Persona ID verified · 99.6% match)', type: 'solid' },
    { at: 'Mar 15, 10:12', who: 'Tenant · John D.', what: 'Signed (Persona ID verified · 99.4% match)', type: 'solid' },
    { at: 'Apr 02, 09:14', who: 'Landlord · Mark A.', what: 'N4 served via email with consent on file', type: 'ring' },
    { at: 'Apr 02, 09:15', who: 'System', what: 'Filing packet prepared for L1 (ready in 14 days)', type: 'ring' },
  ]
  return (
    <SW id="audit" dark>
      <SH
        step="04"
        eyebrow="Audit"
        title="Tamper-proof"
        highlight="version history"
        description="Every document edit, signature, and service action is hash-chained with timestamps and actor identity. Export tribunal-ready packets with one click."
      />

      {/* Editorial banner image: secure vault motif */}
      <div className="relative mx-auto mt-10 aspect-[21/6] max-w-5xl overflow-hidden rounded-2xl">
        <Image
          src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=2000&q=80"
          alt="Secure vault door representing tamper-proof document storage"
          fill
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#F5F6F8] via-[#F5F6F8]/30 to-transparent"
          aria-hidden="true"
        />
      </div>

      <div ref={ref} className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Left: event feed */}
        <motion.div
          className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white"
          {...fadeUp}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <div className="flex items-center justify-between border-b border-[#E5E7EB] px-6 py-4">
            <h3 className="font-heading text-sm font-semibold text-brand-graphite">
              Lease 2025-0482 · Audit log
            </h3>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#E8F2FE] px-2.5 py-1 text-[10px] font-semibold text-brand-blue">
              <Lock className="h-3 w-3" strokeWidth={2.5} />
              Hash-chained
            </span>
          </div>
          <div className="divide-y divide-[#E5E7EB]">
            {events.map((e, i) => (
              <motion.div
                key={`${e.at}-${e.what}`}
                className="flex items-start gap-4 px-6 py-3.5"
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, ease, delay: 0.2 + i * 0.06 }}
              >
                <span
                  className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                    e.type === 'solid'
                      ? 'bg-brand-blue ring-4 ring-brand-blue/15'
                      : 'bg-white ring-2 ring-brand-blue'
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-brand-graphite">{e.what}</p>
                  <p className="mt-0.5 text-[11px] text-brand-graphite-mid">
                    {e.who} · {e.at}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="border-t border-[#E5E7EB] bg-[#F5F6F8] px-6 py-3 text-[11px] text-brand-graphite-mid">
            SHA-256 chain · Exportable as PDF + signed CSV manifest
          </div>
        </motion.div>

        {/* Right: compliance guarantees */}
        <div className="flex flex-col divide-y divide-[#E5E7EB] border-y border-[#E5E7EB]">
          {[
            {
              icon: Lock,
              title: 'PIPEDA-aligned storage',
              desc: 'AES-256 encryption at rest and in transit. Access logged, tokenized identifiers for tenant records.',
            },
            {
              icon: ShieldCheck,
              title: 'Quebec Law 25 data residency',
              desc: 'Canadian and US hosting with breach reporting workflows aligned to Law 25 and state breach-notification timelines.',
            },
            {
              icon: Scale,
              title: 'One-click tribunal export',
              desc: 'Bundle lease, notices, service receipts, and audit log into a PDF packet formatted for LTB, RTB, TAL, and RTDRS intake.',
            },
          ].map((f, i) => {
            const Icon = f.icon
            return (
              <Anim
                key={f.title}
                className="group flex flex-1 items-start gap-5 py-6"
                delay={0.2 + i * 0.1}
                x={16}
                y={0}
              >
                <Icon
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue transition-transform duration-200 group-hover:scale-110"
                  strokeWidth={1.8}
                />
                <div className="flex-1">
                  <h4 className="font-heading text-base font-semibold text-brand-graphite">
                    {f.title}
                  </h4>
                  <p className="mt-1 text-sm leading-relaxed text-brand-graphite-mid">
                    {f.desc}
                  </p>
                </div>
              </Anim>
            )
          })}
        </div>
      </div>
    </SW>
  )
}

/* ── Step 05 · Regulatory updates ────────────────────────────────── */

function UpdateSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const updates = [
    { date: 'Oct 2025', province: 'ON', summary: '2026 annual rent-increase guideline published at 2.1%', impact: 'Deadline' },
    { date: 'Sep 2025', province: 'BC', summary: 'RTB portal now mandatory for RTB-32L landlord-use notices', impact: 'Form' },
    { date: 'Jul 2025', province: 'QC', summary: 'Bill 31 amendments come into force for lease-assignment refusal', impact: 'Template' },
    { date: 'Apr 2025', province: 'PE', summary: '2026 allowable increase set at 2.0% by IRAC', impact: 'Deadline' },
    { date: 'Jan 2025', province: 'MB', summary: 'Annual rent-increase guideline set at 1.7% for 2025', impact: 'Deadline' },
  ]
  return (
    <SW id="update">
      <SH
        step="05"
        eyebrow="Update"
        title="Quarterly"
        highlight="regulatory sync"
        description="Provincial gazettes, tribunal bulletins, and legislative amendments are tracked continuously. When a rule changes, your templates, deadlines, and notice defaults update within 48 hours."
      />
      <div ref={ref} className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Left: updates feed */}
        <motion.div
          className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white"
          {...fadeUp}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <div className="flex items-center justify-between border-b border-[#E5E7EB] px-6 py-4">
            <h3 className="font-heading text-sm font-semibold text-brand-graphite">
              Regulatory updates feed
            </h3>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-brand-blue">
              <RefreshCw className="h-3 w-3" strokeWidth={2.5} />
              Synced 2 hrs ago
            </span>
          </div>
          <div className="divide-y divide-[#E5E7EB]">
            {updates.map((u, i) => (
              <motion.div
                key={`${u.date}-${u.province}`}
                className="flex items-start gap-4 px-6 py-4"
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.35, ease, delay: 0.2 + i * 0.08 }}
              >
                <div className="w-20 shrink-0">
                  <p className="text-[11px] uppercase tracking-widest text-brand-graphite-mid">
                    {u.date}
                  </p>
                </div>
                <span className="inline-flex h-6 shrink-0 items-center rounded-full bg-[#E8F2FE] px-2.5 text-[11px] font-bold text-brand-blue">
                  {u.province}
                </span>
                <p className="flex-1 text-sm text-brand-graphite">{u.summary}</p>
                <span className="shrink-0 rounded-full bg-[#F5F6F8] px-2.5 py-1 text-[10px] font-semibold text-brand-graphite-mid">
                  {u.impact}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: stat wall */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { value: '13', label: 'Jurisdictions tracked' },
            { value: 'Quarterly', label: 'Full sync cycle' },
            { value: '48 hr', label: 'Rule push SLA' },
            { value: '0', label: 'Manual template swaps' },
          ].map((s, i) => (
            <Anim
              key={s.label}
              className="rounded-2xl border border-[#E5E7EB] bg-white p-5"
              delay={0.2 + i * 0.08}
              y={12}
            >
              <p className="font-display text-3xl font-normal tabular-nums text-brand-graphite">
                {s.value}
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-widest text-brand-graphite-mid">
                {s.label}
              </p>
            </Anim>
          ))}
        </div>
      </div>
    </SW>
  )
}

/* ── Step 06 · Coverage (Canada + United States) ─────────────────── */

/* US jurisdictions (featured 4 + compact 9, representative of 50 states + DC) */
const usJurisdictions: readonly Province[] = [
  {
    abbr: 'CA',
    name: 'California',
    tribunal: 'Department of Real Estate',
    tribunalAcronym: 'DRE',
    rtaName: 'Civil Code §§1940 to 1954.05 · AB 1482',
    keyForms: '3-Day Notice, 30/60-Day Notice, UD-100',
    rentCap2025: '5% + CPI (cap 10%)',
    rentCap2026: 'AB 1482 formula',
    ruleCount: 52,
  },
  {
    abbr: 'TX',
    name: 'Texas',
    tribunal: 'Texas Real Estate Commission',
    tribunalAcronym: 'TREC',
    rtaName: 'Property Code Ch. 92',
    keyForms: '3-Day Notice to Vacate, Eviction Petition',
    rentCap2025: 'No state cap',
    rentCap2026: 'No state cap',
    ruleCount: 38,
  },
  {
    abbr: 'NY',
    name: 'New York',
    tribunal: 'Division of Housing and Community Renewal',
    tribunalAcronym: 'DHCR',
    rtaName: 'RPL Art. 7 · RPAPL Art. 7 · HSTPA 2019',
    keyForms: '14-Day Rent Demand, Notice of Petition, RA-LR1',
    rentCap2025: 'ETPA / Rent Stabilization',
    rentCap2026: 'RGB annual adjustment',
    ruleCount: 61,
  },
  {
    abbr: 'FL',
    name: 'Florida',
    tribunal: 'Department of Business and Professional Regulation',
    tribunalAcronym: 'DBPR',
    rtaName: 'Fla. Stat. Ch. 83, Part II',
    keyForms: '3-Day Notice, 7-Day Notice to Cure, Complaint',
    rentCap2025: 'No state cap',
    rentCap2026: 'No state cap',
    ruleCount: 41,
  },
  {
    abbr: 'OR',
    name: 'Oregon',
    tribunal: 'Real Estate Agency',
    tribunalAcronym: 'OREA',
    rtaName: 'ORS Ch. 90 · SB 608 / 611',
    keyForms: '72-Hour Notice, 30-Day No-Cause',
    rentCap2025: '7% + CPI (cap 10%)',
    rentCap2026: 'SB 608 formula',
    ruleCount: 44,
  },
  {
    abbr: 'WA',
    name: 'Washington',
    tribunal: 'Department of Commerce',
    tribunalAcronym: 'WA DOC',
    rtaName: 'RCW 59.18 · HB 1217 (2025)',
    keyForms: '14-Day Pay or Vacate, 20-Day Notice',
    rentCap2025: '7% + CPI (cap 10%)',
    rentCap2026: 'HB 1217 formula',
    ruleCount: 40,
  },
  {
    abbr: 'CO',
    name: 'Colorado',
    tribunal: 'Division of Real Estate',
    tribunalAcronym: 'CO DRE',
    rtaName: 'C.R.S. Title 38, Art. 12',
    keyForms: '10-Day Demand, JDF 101, Notice to Quit',
    rentCap2025: 'No state cap',
    rentCap2026: 'No state cap',
    ruleCount: 36,
  },
  {
    abbr: 'GA',
    name: 'Georgia',
    tribunal: 'Real Estate Commission',
    tribunalAcronym: 'GREC',
    rtaName: 'O.C.G.A. Title 44, Ch. 7',
    keyForms: 'Demand for Possession, Dispossessory',
    rentCap2025: 'No state cap',
    rentCap2026: 'No state cap',
    ruleCount: 32,
  },
  {
    abbr: 'NC',
    name: 'North Carolina',
    tribunal: 'Real Estate Commission',
    tribunalAcronym: 'NCREC',
    rtaName: 'N.C.G.S. Ch. 42',
    keyForms: '10-Day Demand, AOC-CVM-201',
    rentCap2025: 'No state cap',
    rentCap2026: 'No state cap',
    ruleCount: 34,
  },
  {
    abbr: 'IL',
    name: 'Illinois',
    tribunal: 'Dept. of Financial and Professional Regulation',
    tribunalAcronym: 'IDFPR',
    rtaName: '735 ILCS 5/9',
    keyForms: '5-Day Notice, 10-Day Notice, FED Complaint',
    rentCap2025: 'No state cap',
    rentCap2026: 'No state cap',
    ruleCount: 37,
  },
  {
    abbr: 'MI',
    name: 'Michigan',
    tribunal: 'Licensing and Regulatory Affairs',
    tribunalAcronym: 'LARA',
    rtaName: 'MCL 554.131 · 600.5701',
    keyForms: 'DC 100c, Notice to Quit, Summons',
    rentCap2025: 'No state cap',
    rentCap2026: 'No state cap',
    ruleCount: 33,
  },
  {
    abbr: 'OH',
    name: 'Ohio',
    tribunal: 'Division of Real Estate',
    tribunalAcronym: 'Ohio DRE',
    rtaName: 'ORC Ch. 5321',
    keyForms: '3-Day Notice to Leave, FED Complaint',
    rentCap2025: 'No state cap',
    rentCap2026: 'No state cap',
    ruleCount: 31,
  },
  {
    abbr: 'NJ',
    name: 'New Jersey',
    tribunal: 'Department of Community Affairs',
    tribunalAcronym: 'NJ DCA',
    rtaName: 'N.J.S.A. 2A:18-61.1 et seq.',
    keyForms: 'Notice to Cease, Notice to Quit, LT Complaint',
    rentCap2025: 'Municipal rent leveling',
    rentCap2026: 'Municipal rent leveling',
    ruleCount: 48,
  },
]

const CA_FEATURED_ABBRS = ['ON', 'BC', 'QC', 'AB'] as const
const US_FEATURED_ABBRS = ['CA', 'TX', 'NY', 'FL'] as const

const featuredImages: Record<string, { src: string; alt: string }> = {
  // Canada
  ON: {
    src: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=1200&q=80',
    alt: 'Toronto skyline at dusk representing Ontario coverage',
  },
  BC: {
    src: 'https://images.unsplash.com/photo-1609825488888-3a766db05542?auto=format&fit=crop&w=1200&q=80',
    alt: 'Vancouver waterfront skyline representing British Columbia coverage',
  },
  QC: {
    src: 'https://images.unsplash.com/photo-1519178614-68673b201f36?auto=format&fit=crop&w=1200&q=80',
    alt: 'Old Quebec street scene representing Quebec coverage',
  },
  AB: {
    src: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200&q=80',
    alt: 'Canadian Rocky Mountains representing Alberta coverage',
  },
  // United States (use US- prefix to avoid collision with Canadian 'CA' abbr)
  'US-CA': {
    src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=80',
    alt: 'Golden Gate Bridge at sunset representing California coverage',
  },
  TX: {
    src: 'https://images.unsplash.com/photo-1531218150217-54595bc2b934?auto=format&fit=crop&w=1200&q=80',
    alt: 'Austin downtown skyline at dusk representing Texas coverage',
  },
  NY: {
    src: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80',
    alt: 'Manhattan skyline and Empire State Building representing New York coverage',
  },
  FL: {
    src: 'https://images.unsplash.com/photo-1535498730771-e735b998cd64?auto=format&fit=crop&w=1200&q=80',
    alt: 'Miami Beach skyline with Atlantic coastline representing Florida coverage',
  },
}

function imageKeyFor(country: 'CA' | 'US', abbr: string): string {
  // Canadian 'CA' (California) collides with Canadian province abbreviation style.
  // We key California under 'US-CA' to disambiguate.
  if (country === 'US' && abbr === 'CA') return 'US-CA'
  return abbr
}

function CoverageSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [country, setCountry] = useState<'CA' | 'US'>('CA')

  const isCanada = country === 'CA'
  const dataset = isCanada ? provinces : usJurisdictions
  const featuredAbbrs: readonly string[] = isCanada
    ? CA_FEATURED_ABBRS
    : US_FEATURED_ABBRS
  const featured = dataset.filter((p) => featuredAbbrs.includes(p.abbr))
  const compact = dataset.filter((p) => !featuredAbbrs.includes(p.abbr))

  return (
    <SW id="coverage" dark>
      <SH
        step="06"
        eyebrow="Coverage"
        title="13 provinces, 50 states,"
        highlight="one compliance engine"
        description="Every Canadian RTA and every US state statute. Tribunal, agency, notice forms, and rent rules activate automatically the moment you add a property."
      />

      {/* Coverage headline: combined stat strip + North America silhouette */}
      <div
        ref={ref}
        className="mx-auto mt-12 grid max-w-5xl items-center gap-8 border-y border-[#E5E7EB] py-10 md:grid-cols-[1fr_0.9fr]"
      >
        {/* Left: combined stat strip (CA + US) */}
        <RevealOnScroll
          stagger={0.08}
          className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4 md:grid-cols-2"
        >
          {[
            { value: '64', label: 'Jurisdictions' },
            { value: '20+', label: 'Regulators' },
            { value: '200+', label: 'Statutory forms' },
            { value: 'EN · FR', label: 'Languages' },
          ].map((s) => (
            <motion.div key={s.label} variants={revealItem}>
              <p className="font-display text-4xl font-normal tabular-nums text-brand-graphite md:text-5xl">
                {s.value}
              </p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-brand-graphite-mid">
                {s.label}
              </p>
            </motion.div>
          ))}
        </RevealOnScroll>

        {/* Right: stylized North America silhouette (CA + US) */}
        <div className="relative mx-auto w-full max-w-[440px]" aria-hidden="true">
          <svg
            viewBox="0 0 500 360"
            className="w-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Canada (top) */}
            <motion.path
              d="M32 120 L56 108 L84 114 L112 100 L142 108 L172 92 L206 102 L240 86 L274 96 L308 78 L344 88 L380 72 L414 84 L446 70 L476 80 L476 172 L450 178 L418 184 L386 180 L354 186 L322 180 L290 188 L258 184 L226 190 L194 184 L162 188 L130 182 L98 186 L68 180 L40 172 Z"
              stroke="#176FEB"
              strokeOpacity="0.35"
              strokeWidth="1.5"
              fill="#E8F2FE"
              fillOpacity="0.35"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1.6, ease, delay: 0.2 }}
            />
            {/* United States (below Canada) */}
            <motion.path
              d="M54 192 L90 186 L130 192 L172 188 L214 194 L260 190 L306 196 L352 192 L398 198 L440 194 L462 246 L442 288 L410 302 L370 314 L330 320 L286 322 L244 326 L200 322 L158 320 L118 312 L84 300 L60 282 L48 252 Z"
              stroke="#176FEB"
              strokeOpacity="0.4"
              strokeWidth="1.5"
              fill="#176FEB"
              fillOpacity="0.08"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1.6, ease, delay: 0.4 }}
            />
            {/* Accent dots: CA + US major markets */}
            {[
              // Canada markets
              { cx: 310, cy: 150, label: 'CA-ON' },
              { cx: 130, cy: 150, label: 'CA-BC' },
              { cx: 356, cy: 132, label: 'CA-QC' },
              { cx: 200, cy: 140, label: 'CA-AB' },
              // US markets
              { cx: 112, cy: 258, label: 'US-CA' }, // California
              { cx: 240, cy: 296, label: 'US-TX' }, // Texas
              { cx: 390, cy: 230, label: 'US-NY' }, // New York
              { cx: 372, cy: 306, label: 'US-FL' }, // Florida
            ].map((d, i) => (
              <motion.circle
                key={d.label}
                cx={d.cx}
                cy={d.cy}
                r={5}
                fill="#176FEB"
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.4,
                  ease,
                  delay: 0.9 + i * 0.06,
                }}
              />
            ))}
          </svg>
          <p className="mt-2 text-center text-[10px] font-semibold uppercase tracking-widest text-brand-graphite-mid">
            Every province. Every state. Live.
          </p>
        </div>
      </div>

      {/* Country toggle */}
      <div className="mx-auto mt-14 flex justify-center">
        <div
          role="tablist"
          aria-label="Select country for coverage details"
          className="inline-flex rounded-full border border-[#E5E7EB] bg-white p-1 shadow-sm"
        >
          {[
            { id: 'CA' as const, label: 'Canada', count: '13' },
            { id: 'US' as const, label: 'United States', count: '50 + DC' },
          ].map((tab) => {
            const active = country === tab.id
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={active}
                tabIndex={active ? 0 : -1}
                onClick={() => setCountry(tab.id)}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-200 ${
                  active
                    ? 'bg-brand-blue text-white shadow-[0_8px_20px_-8px_rgba(23,111,235,0.45)]'
                    : 'text-brand-graphite-mid hover:text-brand-graphite'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold tabular-nums ${
                    active ? 'bg-white/20 text-white' : 'bg-[#F5F6F8] text-brand-graphite-mid'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={country}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease }}
        >
          {/* Featured markets */}
          <div className="mx-auto mt-12 max-w-6xl">
            <div className="mb-6 flex items-baseline justify-between gap-4">
              <h3 className="font-heading text-sm font-semibold uppercase tracking-widest text-brand-graphite-mid">
                Flagship markets
              </h3>
              <span className="text-[11px] text-brand-graphite-mid">
                {isCanada
                  ? '~80% of Canadian rental volume'
                  : '4 largest US rental markets'}
              </span>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {featured.map((p, i) => (
                <motion.article
                  key={p.abbr}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease, delay: i * 0.08 }}
                  className="group relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white transition-shadow duration-300 hover:shadow-[0_16px_40px_-16px_rgba(10,22,40,0.12)]"
                >
                  {/* Image banner */}
                  <div className="relative h-36 w-full overflow-hidden">
                    <Image
                      src={featuredImages[imageKeyFor(country, p.abbr)].src}
                      alt={featuredImages[imageKeyFor(country, p.abbr)].alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"
                      aria-hidden="true"
                    />
                    {/* Abbr badge */}
                    <div className="absolute left-4 top-4 inline-flex h-9 w-12 items-center justify-center rounded-lg bg-white/95 font-heading text-sm font-bold text-brand-blue shadow-sm backdrop-blur">
                      {p.abbr}
                    </div>
                    <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold text-brand-graphite-mid shadow-sm backdrop-blur tabular-nums">
                      {p.ruleCount} rules
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <h4 className="font-heading text-lg font-semibold text-brand-graphite">
                      {p.name}
                    </h4>
                    <p className="mt-1 text-xs text-brand-graphite-mid">
                      <span className="font-semibold text-brand-graphite">
                        {p.tribunalAcronym}
                      </span>{' '}
                      · {p.tribunal}
                    </p>
                    <p className="mt-1 text-[11px] italic text-brand-graphite-mid">
                      {p.rtaName}
                    </p>

                    <div className="mt-4 space-y-2 border-t border-[#E5E7EB] pt-4">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-[11px] uppercase tracking-widest text-brand-graphite-mid">
                          Key forms
                        </span>
                        <span className="text-right text-xs font-medium text-brand-graphite">
                          {p.keyForms}
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <span className="text-[11px] uppercase tracking-widest text-brand-graphite-mid">
                          Rent cap 2025
                        </span>
                        <span className="text-xs font-medium tabular-nums text-brand-graphite">
                          {p.rentCap2025}
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <span className="text-[11px] uppercase tracking-widest text-brand-graphite-mid">
                          Rent cap 2026
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F2FE] px-2.5 py-0.5 text-xs font-semibold tabular-nums text-brand-blue">
                          {p.rentCap2026}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          {/* Compact editorial table */}
          <div className="mx-auto mt-16 max-w-6xl">
            <div className="mb-6 flex items-baseline justify-between gap-4">
              <h3 className="font-heading text-sm font-semibold uppercase tracking-widest text-brand-graphite-mid">
                {isCanada ? 'Rest of Canada' : 'Other major US markets'}
              </h3>
              <span className="text-[11px] text-brand-graphite-mid tabular-nums">
                {isCanada
                  ? `${compact.length} jurisdictions`
                  : `${compact.length} shown · 50 states + DC supported`}
              </span>
            </div>

            {/* Header row (desktop). Fixed widths prevent the Saskatchewan/ORT collision. */}
            <div className="hidden grid-cols-[200px_minmax(0,1.3fr)_minmax(0,1.4fr)_110px_70px] gap-4 border-b border-[#E5E7EB] pb-3 text-[10px] font-semibold uppercase tracking-widest text-brand-graphite-mid md:grid">
              <span>Jurisdiction</span>
              <span>{isCanada ? 'Tribunal' : 'Agency'}</span>
              <span>Key forms</span>
              <span>Rent cap 2026</span>
              <span className="text-right">Rules</span>
            </div>

            <div>
              {compact.map((p, i) => (
                <motion.div
                  key={p.abbr}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, ease, delay: 0.1 + i * 0.04 }}
                  className="group grid grid-cols-1 gap-2 border-b border-[#E5E7EB] py-4 transition-colors hover:bg-white/60 md:grid-cols-[200px_minmax(0,1.3fr)_minmax(0,1.4fr)_110px_70px] md:items-center md:gap-4"
                >
                  {/* Jurisdiction chip + name (widened column) */}
                  <div className="flex items-center gap-2 md:min-w-0">
                    <span className="inline-flex h-7 w-9 shrink-0 items-center justify-center rounded-md bg-[#E8F2FE] font-heading text-[11px] font-bold text-brand-blue">
                      {p.abbr}
                    </span>
                    <span className="font-heading text-sm font-semibold text-brand-graphite">
                      {p.name}
                    </span>
                  </div>

                  {/* Tribunal / Agency */}
                  <div className="md:min-w-0">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-brand-graphite-mid md:hidden">
                      {isCanada ? 'Tribunal · ' : 'Agency · '}
                    </span>
                    <span className="text-xs font-medium text-brand-graphite">
                      {p.tribunalAcronym}
                    </span>
                    <span className="text-xs text-brand-graphite-mid"> · {p.tribunal}</span>
                  </div>

                  {/* Key forms */}
                  <div className="md:min-w-0">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-brand-graphite-mid md:hidden">
                      Forms ·{' '}
                    </span>
                    <span className="text-xs text-brand-graphite">{p.keyForms}</span>
                  </div>

                  {/* Rent cap 2026 */}
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-brand-graphite-mid md:hidden">
                      Rent cap 2026 ·{' '}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-[#E8F2FE] px-2 py-0.5 text-[11px] font-semibold tabular-nums text-brand-blue">
                      {p.rentCap2026}
                    </span>
                  </div>

                  {/* Rule count */}
                  <div className="md:text-right">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-brand-graphite-mid md:hidden">
                      Rules ·{' '}
                    </span>
                    <span className="text-xs font-medium tabular-nums text-brand-graphite">
                      {p.ruleCount}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {!isCanada && (
              <p className="mt-4 text-center text-[11px] text-brand-graphite-mid">
                Full coverage across all 50 states and the District of Columbia. Reach out for
                a specific state mapping during onboarding.
              </p>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Unified legend: CA tribunals + US agencies */}
      <div className="mx-auto mt-12 grid max-w-5xl gap-6 border-t border-[#E5E7EB] pt-10 md:grid-cols-2">
        <Anim delay={0.1}>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-brand-graphite-mid">
            Canadian tribunals covered
          </p>
          <p className="mt-2 text-balance text-sm text-brand-graphite">
            LTB · RTB · TAL · RTDRS · ORT · RTP · RTT · RTO · IRAC · Rental Officer (YT, NT, NU)
          </p>
        </Anim>
        <Anim delay={0.2}>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-brand-graphite-mid">
            US regulators covered
          </p>
          <p className="mt-2 text-balance text-sm text-brand-graphite">
            DRE · TREC · DHCR · DBPR · OREA · IDFPR · LARA · HUD · FHFA · CFPB · State RECs
          </p>
        </Anim>
      </div>
    </SW>
  )
}

/* ── FAQ ─────────────────────────────────────────────────────────── */

interface Faq {
  q: string
  a: string
}

const faqs: readonly Faq[] = [
  {
    q: 'Which jurisdictions does Revun cover across Canada and the US?',
    a: 'All 10 Canadian provinces and 3 territories, plus all 50 US states and DC. Ontario (LTB), British Columbia (RTB), Quebec (TAL), Alberta (RTDRS), Manitoba (RTB), Saskatchewan (ORT), Nova Scotia (RTP), New Brunswick (RTT), Newfoundland and Labrador (RTO), Prince Edward Island (IRAC), and the three territorial Rental Officer regimes. US coverage spans every state statute and agency, including DRE, TREC, DHCR, DBPR, OREA, IDFPR, LARA, HUD, FHFA, CFPB, and state real estate commissions.',
  },
  {
    q: 'Does Revun auto-update when the annual rent-increase guideline changes?',
    a: 'Yes. Every provincial gazette and tribunal bulletin is monitored continuously. When a new guideline is published, the rule set syncs within 48 hours and your templates, reminders, and notice defaults are refreshed without manual intervention.',
  },
  {
    q: 'Does Revun handle the mandatory Ontario Standard Form of Lease (2229E)?',
    a: 'Yes. Every Ontario lease generated by Revun uses Form 2229E, pre-filled with property and tenant data. The form has been mandatory for most residential tenancies in Ontario since April 2018.',
  },
  {
    q: 'Is the document vault compliant with PIPEDA and Quebec Law 25?',
    a: 'Yes. Data is hosted in Canada with AES-256 encryption at rest and in transit, access-logged per user, and breach reporting workflows are aligned to Law 25 timelines. Tenant personal information is tokenized wherever possible.',
  },
  {
    q: 'Can I export a tribunal-ready packet for an LTB or RTB hearing?',
    a: 'Yes. One click bundles the lease, served notices, service receipts, communications log, and hash-chained audit trail into a single PDF plus a signed CSV manifest, formatted for LTB, RTB, TAL, and RTDRS intake requirements.',
  },
  {
    q: 'Does Revun generate French-language leases for Quebec (Bill 96)?',
    a: 'Yes. Quebec leases and the RN form schedule generate in French by default. Notices of lease registered on title are produced in French to meet Bill 96 obligations, with English co-renders available by mutual consent.',
  },
]

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
        <span className="font-heading text-base font-semibold text-brand-graphite transition-colors group-hover:text-brand-blue md:text-lg">
          {q}
        </span>
        <Plus
          className="h-5 w-5 flex-shrink-0 text-brand-blue transition-transform duration-300"
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
            transition={{ duration: 0.28, ease }}
            className="overflow-hidden"
          >
            <p className="pb-5 pr-8 text-[0.95rem] leading-relaxed text-brand-graphite-mid">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ComplianceFaq() {
  const [openFaq, setOpenFaq] = useState<number>(0)
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-6">
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <motion.p
            variants={revealItem}
            className="text-sm font-heading font-semibold uppercase tracking-wider text-brand-blue"
          >
            Common questions
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mt-3 text-balance font-display text-4xl font-normal text-brand-graphite md:text-5xl"
          >
            Compliance,{' '}
            <span className="text-keyword">answered plainly</span>
          </motion.h2>
        </RevealOnScroll>
        <div className="mt-10 border-t border-[#E5E7EB]">
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
  )
}

/* ── Final CTA ───────────────────────────────────────────────────── */

function ComplianceCTA() {
  return (
    <section className="relative overflow-hidden bg-[#0A1628] py-20 text-white md:py-24">
      <div
        className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, #176FEB33 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, #4A91F022 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      <RevealOnScroll
        stagger={0.1}
        className="relative z-10 mx-auto max-w-3xl px-6 text-center"
      >
        <motion.p
          variants={revealItem}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs uppercase tracking-widest text-white/70"
        >
          <Sparkles className="h-3.5 w-3.5" strokeWidth={1.8} />
          Compliance infrastructure for Canadian and US rentals
        </motion.p>
        <motion.h2
          variants={revealItem}
          className="mt-6 text-balance font-display text-4xl font-normal leading-[1.05] tracking-tight md:text-6xl"
        >
          Stop reading gazettes.{' '}
          <span className="text-[#4A91F0]">Start signing leases.</span>
        </motion.h2>
        <motion.p
          variants={revealItem}
          className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/70"
        >
          Book a walkthrough. We will map your portfolio to its provinces and show you exactly
          which rules, forms, and deadlines activate on day one.
        </motion.p>
        <motion.div
          variants={revealItem}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/70"
        >
          {[
            'Every province and territory',
            'Bilingual EN and FR',
            'Tribunal-ready packets',
          ].map((r) => (
            <span key={r} className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-[#4A91F0]" strokeWidth={2} />
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
            className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-blue px-8 text-base font-semibold text-white shadow-[0_8px_24px_-8px_#176FEB] transition-colors duration-150 hover:bg-brand-blue-dark"
          >
            Book a Demo <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            href="/features/leasing/"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 bg-transparent px-8 text-base font-semibold text-white transition-colors duration-150 hover:bg-white/10"
          >
            See Leasing Workflow
          </Link>
        </motion.div>
      </RevealOnScroll>
    </section>
  )
}

/* ── Related-features strip ──────────────────────────────────────── */

function RelatedFeatures() {
  const related = [
    { href: '/features/leasing/', label: 'Leasing', desc: 'Intake, screen, compare, negotiate, sign.' },
    { href: '/features/document-vault/', label: 'Document Vault', desc: 'Hash-chained storage with tribunal exports.' },
    { href: '/features/communications/', label: 'Communications', desc: 'Encrypted, audit-logged tenant and owner messaging.' },
  ]
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-brand-graphite-mid">
          Pairs well with
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {related.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="group flex items-start justify-between gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-5 transition-colors hover:border-brand-blue/40"
            >
              <div>
                <p className="font-heading text-base font-semibold text-brand-graphite group-hover:text-brand-blue">
                  {r.label}
                </p>
                <p className="mt-1 text-sm text-brand-graphite-mid">{r.desc}</p>
              </div>
              <ArrowRight
                className="mt-1 h-4 w-4 shrink-0 text-brand-blue transition-transform duration-200 group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Assembly ────────────────────────────────────────────────────── */

export function ComplianceClient() {
  return (
    <>
      <ComplianceHero />
      <DetectSection />
      <StepHandoff currentId="detect" />
      <TemplateSection />
      <StepHandoff currentId="template" />
      <DeadlineSection />
      <StepHandoff currentId="deadline" />
      <AuditSection />
      <StepHandoff currentId="audit" />
      <UpdateSection />
      <StepHandoff currentId="update" />
      <CoverageSection />
      <ComplianceFaq />
      <RelatedFeatures />
      <ComplianceCTA />

      <p className="sr-only">
        Revun Compliance orchestrates rental regulation across all 13 Canadian provinces and
        territories and all 50 US states and DC. Supported tribunals include the Ontario Landlord and Tenant Board (LTB),
        British Columbia Residential Tenancy Branch (RTB), Quebec Tribunal administratif du
        logement (TAL), Alberta RTDRS, Manitoba RTB, Saskatchewan ORT, Nova Scotia RTP, New
        Brunswick RTT, Newfoundland and Labrador RTO, Prince Edward Island IRAC, and the Rental
        Officer offices of Yukon, Northwest Territories, and Nunavut. The platform generates
        province-compliant lease agreements including the mandatory Ontario Standard Form of
        Lease (2229E), LTB notices N1, N2, N4, N5, N11, N12, N13 and applications L1, L2, BC
        RTB-7, RTB-32L, RTB-33, Quebec TAL-806A, TAL-810A, and RN form schedules, Alberta
        14-day and 24-hour notices, and every other provincial notice and application form.
        Rent-increase guidelines including Ontario 2.5 percent for 2025 and 2.1 percent for
        2026, BC 3.0 percent for 2025 and 2.3 percent for 2026, Quebec TAL indexation, Manitoba
        1.7 percent for 2025 and 1.8 percent for 2026, Prince Edward Island 3.0 percent for
        2025 and 2.0 percent for 2026, Nova Scotia 5.0 percent, and New Brunswick 3.0 percent
        are tracked and synced within 48 hours of publication. Document storage is
        PIPEDA and US state privacy law aligned, with Canadian and US data residency, AES-256 encryption at rest and in
        transit, hash-chained audit logs, and Quebec Law 25 breach reporting workflows.
        Tribunal-ready export packets bundle lease, notices, service receipts, communications,
        and audit log for LTB, RTB, TAL, and RTDRS hearings. Coverage varies by plan.
      </p>
    </>
  )
}
