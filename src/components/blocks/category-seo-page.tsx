'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  RevealOnScroll,
  revealItem,
  revealItemLeft,
  revealItemRight,
} from '@/components/ui/reveal-on-scroll'
import { fadeUp, heroStagger } from '@/lib/motion'
import {
  PropertyOwnerIcon,
  PMCompanyIcon,
  BrokerageIcon,
  LeasingIcon,
  MaintenanceIcon,
  FinancialReportingIcon,
  ComplianceTrackingIcon,
  CommunicationsIcon,
  RentIcon,
  TenantScreeningIcon,
  OwnerPortalIcon,
  ConnectPropertiesIcon,
  GoLiveIcon,
  MaintenanceCompanyIcon,
} from '@/lib/feature-icons'
import { CTASection } from '@/components/blocks/cta-section'

/* ── Icon lookup ────────────────────────────────────────────────────────── */

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  Home: PropertyOwnerIcon,
  Building2: PMCompanyIcon,
  Briefcase: BrokerageIcon,
  FileKey2: LeasingIcon,
  Wrench: MaintenanceIcon,
  Landmark: FinancialReportingIcon,
  CheckCircle2: ComplianceTrackingIcon,
  CreditCard: RentIcon,
  BarChart3: FinancialReportingIcon,
  MessageSquare: CommunicationsIcon,
  Users: TenantScreeningIcon,
  BookOpen: OwnerPortalIcon,
  Rocket: GoLiveIcon,
  Link2: ConnectPropertiesIcon,
  Shield: ComplianceTrackingIcon,
  MaintenanceCompany: MaintenanceCompanyIcon,
}

/* ── Types ──────────────────────────────────────────────────────────────── */

export interface PainPoint {
  title: string
  description: string
}

export interface FeatureCard {
  title: string
  description: string
  iconName: string
}

export interface Differentiator {
  title: string
  description: string
}

export interface CategoryPageData {
  eyebrow: string
  h1: React.ReactNode
  subtitle: string
  painPointsHeading: string
  painPointsBody: string
  painPoints: PainPoint[]
  featuresHeading: string
  featuresSubheading: string
  features: FeatureCard[]
  differentiators: Differentiator[]
  differentiatorHeading: string
}

/* ── Component ─────────────────────────────────────────────────────────── */

export function CategorySEOPage({ data }: { data: CategoryPageData }) {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-[#F5F6F8]">
        <motion.div
          className="relative z-10 mx-auto max-w-4xl px-6 py-16 text-center"
          variants={heroStagger}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-1.5 text-sm font-medium text-[#555860]"
          >
            {data.eyebrow}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-display text-4xl font-normal leading-[1.1] tracking-tight text-[#0A1628] sm:text-5xl md:text-6xl"
          >
            {data.h1}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#555860]"
          >
            {data.subtitle}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/features/"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-[#176FEB] px-8 text-base font-semibold text-white transition-colors duration-150 hover:bg-[#005CE8]"
            >
              See the Platform
            </Link>
            <Link
              href="/demo/"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E5E7EB] px-8 text-base font-semibold text-[#0A1628] transition-colors duration-150 hover:border-[#176FEB]/40 hover:bg-white"
            >
              Book a Live Demo
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Pain Points ─── */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <motion.p
                variants={revealItemLeft}
                className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]"
              >
                The problem
              </motion.p>
              <motion.h2
                variants={revealItemLeft}
                className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] sm:text-4xl"
              >
                {data.painPointsHeading}
              </motion.h2>
              <motion.p
                variants={revealItemLeft}
                className="mt-4 text-lg leading-relaxed text-[#555860]"
              >
                {data.painPointsBody}
              </motion.p>
            </div>

            <motion.ul variants={revealItemRight} className="space-y-4">
              {data.painPoints.map((point, i) => (
                <li
                  key={point.title}
                  className="flex items-start gap-3 rounded-xl border border-[#D3D5DB] bg-[#F5F6F8] p-4"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E8F2FE] text-[#176FEB]">
                    <span className="text-xs font-bold">{i + 1}</span>
                  </span>
                  <div>
                    <span className="font-heading text-[0.938rem] font-bold text-[#2C2E33]">
                      {point.title}
                    </span>
                    <p className="mt-0.5 text-[0.938rem] leading-relaxed text-[#555860]">
                      {point.description}
                    </p>
                  </div>
                </li>
              ))}
            </motion.ul>
          </RevealOnScroll>
        </div>
      </section>

      {/* ─── Feature Grid ─── */}
      <section className="bg-[#F5F6F8] py-12">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll className="mb-10 text-center">
            <motion.p
              variants={revealItem}
              className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]"
            >
              {data.featuresHeading}
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] sm:text-4xl"
            >
              {data.featuresSubheading}
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

      {/* ─── Differentiator Section ─── */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll className="mb-10 text-center">
            <motion.p
              variants={revealItem}
              className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]"
            >
              Why Revun
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] sm:text-4xl"
            >
              {data.differentiatorHeading}
            </motion.h2>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.1} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.differentiators.map((d) => (
              <motion.div
                key={d.title}
                variants={revealItem}
                className="rounded-2xl border border-[#D3D5DB] bg-[#F5F6F8] p-6"
              >
                <h3 className="font-heading text-lg font-bold text-[#2C2E33]">
                  {d.title}
                </h3>
                <p className="mt-2 text-[0.938rem] leading-relaxed text-[#555860]">
                  {d.description}
                </p>
              </motion.div>
            ))}
          </RevealOnScroll>
        </div>
      </section>

      {/* ─── Competitor Comparison Teaser ─── */}
      <section className="bg-[#F5F6F8] py-12">
        <RevealOnScroll className="mx-auto max-w-2xl px-6 text-center">
          <motion.p
            variants={revealItem}
            className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]"
          >
            Comparisons
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="font-heading text-2xl font-bold tracking-tight text-[#2C2E33] sm:text-3xl"
          >
            See how Revun compares to the tools you already know
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mx-auto mt-4 max-w-lg text-[#555860]"
          >
            We have detailed, feature-by-feature comparison pages against every major competitor in the market.
          </motion.p>
          <motion.div variants={revealItem} className="mt-8">
            <Link
              href="/compare/"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-[#176FEB] px-8 text-base font-semibold text-[#176FEB] transition-colors duration-150 hover:bg-[#E8F2FE]"
            >
              Browse All Comparisons
            </Link>
          </motion.div>
        </RevealOnScroll>
      </section>

      {/* ─── CTA ─── */}
      <CTASection />
    </>
  )
}
