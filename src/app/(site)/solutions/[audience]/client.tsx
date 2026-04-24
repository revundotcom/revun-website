'use client'

import { createElement } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  CheckCircle2,
  ArrowRight,
  X,
  Quote,
  Star,
  Building2,
  MapPin,
  Sparkles,
} from 'lucide-react'
import { RevealOnScroll, revealItem, revealItemLeft, revealItemRight } from '@/components/ui/reveal-on-scroll'
import { fadeUp, heroStagger } from '@/lib/motion'
import {
  PropertyOwnerIcon,
  PMCompanyIcon,
  BrokerageIcon,
  LeasingIcon,
  MaintenanceCompanyIcon,
  FinancialReportingIcon,
  TenantScreeningIcon,
  RentIcon,
  MaintenanceIcon,
  CommunicationsIcon,
  ComplianceTrackingIcon,
  OwnerPortalIcon,
  ConnectPropertiesIcon,
  SignUpIcon,
  GoLiveIcon,
} from '@/lib/feature-icons'
import { getAudienceVisuals } from './visuals'
import { getAudienceSections } from './sections'

/* ── Icon lookup ─────────────────────────────────────────────────────────── */

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  Home: PropertyOwnerIcon,
  Building2: PMCompanyIcon,
  Briefcase: BrokerageIcon,
  FileKey2: LeasingIcon,
  Wrench: MaintenanceIcon,
  Landmark: FinancialReportingIcon,
  CheckCircle2: ComplianceTrackingIcon,
  ArrowRight: GoLiveIcon,
  Shield: ComplianceTrackingIcon,
  CreditCard: RentIcon,
  BarChart3: FinancialReportingIcon,
  MessageSquare: CommunicationsIcon,
  Users: TenantScreeningIcon,
  BookOpen: OwnerPortalIcon,
  UserPlus: SignUpIcon,
  Rocket: GoLiveIcon,
  FileText: LeasingIcon,
  Link2: ConnectPropertiesIcon,
}

const solutionIconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  'self-managing-owners': PropertyOwnerIcon,
  'property-management-companies': PMCompanyIcon,
  'brokerages': BrokerageIcon,
  'leasing-companies': LeasingIcon,
  'maintenance-companies': MaintenanceCompanyIcon,
  'reits': FinancialReportingIcon,
  'tenants': PropertyOwnerIcon,
  'internal-ops-teams': PMCompanyIcon,
}

/* ── Types ────────────────────────────────────────────────────────────────── */

interface Feature {
  title: string
  description: string
  iconName: string
}

interface Step {
  number: string
  title: string
  description: string
}

interface SolutionContent {
  title: string
  subtitle: string
  heroEyebrow: string
  problemHeading: string
  problemBody: string
  problemBullets: string[]
  features: Feature[]
  steps: Step[]
  startingPrice: string
  priceUnit: string
  pricingNote: string
  ctaHeading: string
  ctaBody: string
  replaces: string[]
  relatedSolutions: { slug: string; title: string }[]
}

/* ── Client component ────────────────────────────────────────────────────── */

/* ── Helper: render the audience-specific sections slot without
 *    creating a local component at render time (satisfies react-hooks/static-components). ── */
function AudienceExtensionSlot({ slug }: { slug?: string }) {
  if (!slug) return null
  const component = getAudienceSections(slug)
  return component ? createElement(component) : null
}

/* ── Render title with bold/italic segments marked via **...** ── */
function renderTitle(title: string) {
  const parts = title.split(/\*\*(.*?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="italic text-[#176FEB]">
        {part}
      </span>
    ) : (
      part
    )
  )
}

export function SolutionDetailClient({
  data,
  slug,
}: {
  data: SolutionContent
  slug?: string
}) {
  const visuals = slug ? getAudienceVisuals(slug) : undefined

  return (
    <>
      {/* ────────────────────── HERO (split, with audience imagery) ────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F8FAFF] via-white to-[#F5F6F8] pt-16 pb-12 md:pt-24 md:pb-20">
        <div className="absolute inset-0 bg-dot-grid opacity-30" aria-hidden="true" />
        <div className="absolute right-[-12rem] top-[-4rem] h-[28rem] w-[28rem] rounded-full bg-[#176FEB]/[0.08] blur-[130px]" aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className={`grid items-center gap-8 md:gap-12 ${visuals ? 'lg:grid-cols-[1.05fr_0.95fr]' : 'lg:grid-cols-1'}`}>
            <motion.div
              className={visuals ? '' : 'mx-auto max-w-3xl text-center'}
              variants={heroStagger}
              initial="hidden"
              animate="visible"
            >
              <motion.p
                variants={fadeUp}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#176FEB]/20 bg-white px-3 py-1.5 text-xs font-semibold text-[#176FEB] shadow-sm"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#176FEB] animate-pulse" />
                {visuals?.heroBadgeLabel ?? data.heroEyebrow}
              </motion.p>

              <motion.h1
                variants={fadeUp}
                className="font-display text-3xl font-normal leading-[1.05] tracking-tight text-[#0A1628] md:text-5xl lg:text-6xl"
              >
                {renderTitle(data.title)}
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className={`mt-6 max-w-xl text-lg leading-relaxed text-[#475569] ${visuals ? '' : 'mx-auto'}`}
              >
                {data.subtitle}
              </motion.p>

              <motion.div
                variants={fadeUp}
                className={`mt-9 flex flex-col gap-3 sm:flex-row ${visuals ? '' : 'sm:justify-center'}`}
              >
                <Link
                  href="/demo/"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#176FEB] px-8 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(23,111,235,0.5)] transition-all hover:bg-[#0B5AD4] hover:shadow-[0_12px_28px_-8px_rgba(23,111,235,0.6)]"
                >
                  Book a Demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/pricing/"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-8 text-sm font-semibold text-[#0A1628] transition-colors hover:border-[#176FEB]/30 hover:text-[#176FEB]"
                >
                  View Pricing
                </Link>
              </motion.div>

              {visuals && (
                <motion.div
                  variants={fadeUp}
                  className="mt-10 grid gap-4 border-t border-[#E5E7EB] pt-6 sm:grid-cols-3"
                >
                  {visuals.stats.map((s) => (
                    <div key={s.label}>
                      <p className="font-display text-2xl font-bold tabular-nums text-[#0A1628] md:text-3xl">
                        {s.value}
                      </p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#176FEB]">
                        {s.label}
                      </p>
                      {s.sub && (
                        <p className="mt-0.5 text-[11px] text-[#64748B]">{s.sub}</p>
                      )}
                    </div>
                  ))}
                </motion.div>
              )}
            </motion.div>

            {visuals && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="relative"
              >
                <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-tr from-[#176FEB]/15 via-[#4A91F0]/10 to-transparent blur-3xl" aria-hidden="true" />
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-2xl">
                  <Image
                    src={visuals.heroImage.src}
                    alt={visuals.heroImage.alt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/30 via-transparent to-transparent" aria-hidden="true" />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ────────────────────── PROBLEM ────────────────────── */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <motion.p
                variants={revealItemLeft}
                className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]"
              >
                The challenge
              </motion.p>
              <motion.h2
                variants={revealItemLeft}
                className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] sm:text-4xl"
              >
                {data.problemHeading}
              </motion.h2>
              <motion.p
                variants={revealItemLeft}
                className="mt-4 text-lg leading-relaxed text-[#555860]"
              >
                {data.problemBody}
              </motion.p>
            </div>

            <motion.ul variants={revealItemRight} className="space-y-4">
              {data.problemBullets.map((bullet, i) => (
                <li
                  key={bullet}
                  className="flex items-start gap-3 rounded-xl border border-[#D3D5DB] bg-[#F5F6F8] p-4"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E8F2FE] text-[#176FEB]">
                    <span className="text-xs font-bold">{i + 1}</span>
                  </span>
                  <span className="text-[0.938rem] leading-relaxed text-[#2C2E33]">
                    {bullet}
                  </span>
                </li>
              ))}
            </motion.ul>
          </RevealOnScroll>
        </div>
      </section>

      {/* ────────────────────── FEATURES ────────────────────── */}
      <section className="bg-[#F5F6F8] py-12">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll className="mb-10 text-center">
            <motion.p
              variants={revealItem}
              className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]"
            >
              Built for your workflow
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] sm:text-4xl"
            >
              Everything you <span className="text-[#176FEB]">need</span>, nothing you don&apos;t
            </motion.h2>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.08} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.features.map((f) => {
              const Icon = iconMap[f.iconName] || ComplianceTrackingIcon
              return (
                <motion.div
                  key={f.title}
                  variants={revealItem}
                  className="rounded-2xl border border-[#D3D5DB] bg-white p-7 transition-colors duration-150 hover:border-[#176FEB]/40"
                >
                  <div className="mb-4">
                    <Icon className="h-11 w-11" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[#2C2E33]">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-[0.938rem] leading-relaxed text-[#555860]">
                    {f.description}
                  </p>
                </motion.div>
              )
            })}
          </RevealOnScroll>
        </div>
      </section>

      {/* ────────────────────── AUDIENCE-SPECIFIC SECTIONS (2 unique per audience) ────────────────────── */}
      <AudienceExtensionSlot slug={slug} />

      {/* ────────────────────── TESTIMONIAL (audience-specific) ────────────────────── */}
      {visuals && (
        <section className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
            <RevealOnScroll>
              <motion.div
                variants={revealItem}
                className="relative overflow-hidden rounded-3xl border border-[#E5E7EB] bg-gradient-to-br from-[#F8FAFF] to-white p-8 md:p-12"
              >
                <Quote className="absolute right-8 top-8 h-16 w-16 text-[#176FEB]/10" aria-hidden="true" />
                <div className="relative">
                  <div className="mb-5 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#176FEB] stroke-[#176FEB]" />
                    ))}
                  </div>
                  <blockquote className="font-display text-xl leading-snug text-[#0A1628] md:text-2xl">
                    &ldquo;{visuals.testimonial.quote}&rdquo;
                  </blockquote>
                  <footer className="mt-8 flex items-center gap-4 border-t border-[#E5E7EB] pt-6">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-white shadow-sm">
                      <Image
                        src={visuals.testimonial.photo}
                        alt={visuals.testimonial.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-heading text-base font-bold text-[#0A1628]">
                        {visuals.testimonial.name}
                      </p>
                      <p className="mt-0.5 flex items-center gap-1 text-sm text-[#475569]">
                        <Building2 className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">
                          {visuals.testimonial.title} · {visuals.testimonial.company}
                        </span>
                      </p>
                      <p className="mt-0.5 flex items-center gap-1 text-xs text-[#64748B]">
                        <MapPin className="h-3 w-3 shrink-0" />
                        {visuals.testimonial.location}
                      </p>
                    </div>
                  </footer>
                </div>
              </motion.div>
            </RevealOnScroll>
          </div>
        </section>
      )}

      {/* ────────────────────── HOW IT WORKS ────────────────────── */}
      <section className="bg-[#F5F6F8] py-12">
        <div className="mx-auto max-w-5xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll className="mb-10 text-center">
            <motion.p
              variants={revealItem}
              className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]"
            >
              How it works
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] sm:text-4xl"
            >
              Live in <span className="text-[#176FEB]">days</span>, not months
            </motion.h2>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.12} className="relative">
            <div
              className="absolute left-[27px] top-4 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-[#176FEB]/40 via-[#176FEB]/20 to-transparent lg:block"
              aria-hidden
            />

            <div className="space-y-8 lg:space-y-12">
              {data.steps.map((step) => (
                <motion.div
                  key={step.number}
                  variants={revealItem}
                  className="flex gap-6 lg:gap-8"
                >
                  <div className="flex shrink-0 flex-col items-center">
                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#176FEB]/10 text-[#176FEB]">
                      <span className="font-heading text-lg font-bold">{step.number}</span>
                    </div>
                  </div>

                  <div className="pb-2 pt-2">
                    <h3 className="font-heading text-xl font-bold text-[#2C2E33]">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 max-w-xl text-[0.938rem] leading-relaxed text-[#555860]">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ────────────────────── REPLACES (categorized integration cards) ────────────────────── */}
      {(visuals?.integrations?.length ?? data.replaces.length) > 0 && (
        <section className="bg-white py-12">
          <div className="mx-auto max-w-5xl px-4 md:px-6 lg:px-8">
            <RevealOnScroll className="text-center">
              <motion.p
                variants={revealItem}
                className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]"
              >
                One platform, not ten
              </motion.p>
              <motion.h2
                variants={revealItem}
                className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] sm:text-4xl"
              >
                Revun <span className="text-[#176FEB]">replaces</span> your current stack
              </motion.h2>
              <motion.p
                variants={revealItem}
                className="mx-auto mt-4 max-w-lg text-base text-[#555860]"
              >
                Consolidate disconnected tools into one operating system — with a single source of truth.
              </motion.p>
            </RevealOnScroll>

            {visuals?.integrations?.length ? (
              <RevealOnScroll stagger={0.06} className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {visuals.integrations.map((tool) => (
                  <motion.div
                    key={tool.name}
                    variants={revealItem}
                    className="flex items-center gap-3 rounded-xl border border-[#E5E7EB] bg-white p-4 transition-colors hover:border-[#176FEB]/30"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FEE2E2] text-[#DC2626]">
                      <X className="h-4 w-4" strokeWidth={2.5} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-heading text-sm font-semibold text-[#0A1628] line-through decoration-[#94A3B8] decoration-1">
                        {tool.name}
                      </p>
                      <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-[#64748B]">
                        {tool.category}
                      </p>
                    </div>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#DCFCE7] text-[#166534]">
                      <CheckCircle2 className="h-4 w-4" />
                    </span>
                  </motion.div>
                ))}
              </RevealOnScroll>
            ) : (
              <RevealOnScroll stagger={0.06} className="mt-10 flex flex-wrap items-center justify-center gap-3">
                {data.replaces.map((tool) => (
                  <motion.span
                    key={tool}
                    variants={revealItem}
                    className="inline-flex items-center gap-2 rounded-full border border-[#D3D5DB] bg-white px-5 py-2.5 text-sm font-medium text-[#555860] line-through decoration-[#176FEB]/60 decoration-2"
                  >
                    <X className="h-3.5 w-3.5 text-[#176FEB]" strokeWidth={2.5} />
                    {tool}
                  </motion.span>
                ))}
              </RevealOnScroll>
            )}

            <RevealOnScroll className="mt-8 text-center">
              <motion.p
                variants={revealItem}
                className="inline-flex items-center gap-2 rounded-full bg-[#E8F2FE] px-4 py-2 text-sm font-semibold text-[#176FEB]"
              >
                <Sparkles className="h-4 w-4" />
                All consolidated into Revun
              </motion.p>
            </RevealOnScroll>
          </div>
        </section>
      )}

      {/* ────────────────────── PRICING PREVIEW ────────────────────── */}
      <section className="bg-white py-12">
        <RevealOnScroll className="mx-auto max-w-2xl px-4 md:px-6 lg:px-8 text-center">
          <motion.p
            variants={revealItem}
            className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]"
          >
            Streamlined pricing
          </motion.p>
          <motion.div variants={revealItem}>
            <p className="font-heading text-5xl font-bold tracking-tight text-[#2C2E33] sm:text-6xl">
              {data.startingPrice}
            </p>
            <p className="mt-2 text-lg text-[#555860]">{data.priceUnit}</p>
          </motion.div>
          <motion.p
            variants={revealItem}
            className="mt-4 text-sm text-[#555860]"
          >
            {data.pricingNote}
          </motion.p>
          <motion.div variants={revealItem} className="mt-8">
            <Link
              href="/pricing/"
              className="inline-flex items-center gap-2 text-base font-semibold text-[#176FEB] transition-colors duration-150 hover:text-[#005CE8] hover:underline"
            >
              See full pricing details
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </RevealOnScroll>
      </section>

      {/* ────────────────────── RELATED SOLUTIONS ────────────────────── */}
      {data.relatedSolutions.length > 0 && (
        <section className="bg-white py-12">
          <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
            <RevealOnScroll className="mb-8 text-center">
              <motion.p
                variants={revealItem}
                className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]"
              >
                Explore more
              </motion.p>
              <motion.h2
                variants={revealItem}
                className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] sm:text-4xl"
              >
                Related <span className="text-[#176FEB]">solutions</span>
              </motion.h2>
            </RevealOnScroll>

            <RevealOnScroll
              stagger={0.1}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {data.relatedSolutions.map((sol) => {
                const SolIcon = solutionIconMap[sol.slug] || PMCompanyIcon
                return (
                  <motion.div key={sol.slug} variants={revealItem}>
                    <Link
                      href={`/solutions/${sol.slug}/`}
                      className="group flex items-center gap-5 rounded-2xl border border-[#D3D5DB] bg-white p-6 transition-all duration-150 hover:border-[#176FEB]/40 hover:shadow-sm"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E8F2FE]">
                        <SolIcon className="h-6 w-6 text-[#176FEB]" />
                      </span>
                      <span className="flex-1 font-heading text-base font-bold text-[#2C2E33] transition-colors duration-150 group-hover:text-[#176FEB]">
                        {sol.title}
                      </span>
                      <ArrowRight className="h-5 w-5 shrink-0 text-[#D3D5DB] transition-transform duration-150 group-hover:translate-x-1 group-hover:text-[#176FEB]" />
                    </Link>
                  </motion.div>
                )
              })}
            </RevealOnScroll>
          </div>
        </section>
      )}

      {/* ────────────────────── FINAL CTA ────────────────────── */}
      <section className="relative overflow-hidden bg-[#F5F6F8] py-12">
        <div className="absolute inset-0" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
          <div className="absolute left-[20%] top-[30%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(23,111,235,0.18)_0%,transparent_70%)] blur-3xl" />
          <div className="absolute right-[15%] bottom-[20%] h-[350px] w-[350px] rounded-full bg-[radial-gradient(circle,rgba(23,111,235,0.1)_0%,transparent_70%)] blur-3xl" />
        </div>

        <RevealOnScroll className="relative z-10 mx-auto max-w-2xl px-4 md:px-6 lg:px-8 text-center">
          <motion.h2
            variants={revealItem}
            className="font-heading font-extrabold text-3xl leading-tight tracking-tight text-[#0A1628] sm:text-4xl md:text-5xl"
          >
            {data.ctaHeading}
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-[#555860]"
          >
            {data.ctaBody}
          </motion.p>
          <motion.div
            variants={revealItem}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/demo/"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-[#176FEB] px-8 text-base font-semibold text-white transition-colors duration-150 hover:bg-[#005CE8]"
            >
              Book a Demo
            </Link>
            <Link
              href="/signup/"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E5E7EB] px-8 text-base font-semibold text-[#0A1628] transition-colors duration-150 hover:bg-white"
            >
              Start Free
            </Link>
          </motion.div>
          <motion.p
            variants={revealItem}
            className="mt-6 text-sm text-[#64748B]"
          >
            No credit card required. 14-day free trial.
          </motion.p>
        </RevealOnScroll>
      </section>
    </>
  )
}
