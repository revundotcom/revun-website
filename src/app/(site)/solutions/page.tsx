'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Home,
  Building2,
  Briefcase,
  FileKey2,
  Wrench,
  Landmark,
  ArrowRight,
  Users,
  Shield,
} from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import { heroStagger, fadeUp } from '@/lib/motion'

/* ── Audience card data ─────────────────────────────────────────────────── */

const solutions = [
  {
    slug: 'self-managing-owners',
    icon: Home,
    title: 'Self-Managing',
    titleHighlight: 'Owners',
    description:
      'List units, screen tenants, generate leases, collect rent, manage maintenance, communicate securely, and track everything from one system.',
    highlights: [
      'Listing syndication to Kijiji, Rentals.ca, and more',
      'Secure rent collection — no personal banking details shared',
      'Private communications — no personal phone numbers exchanged',
    ],
    cta: 'Explore for Owners',
  },
  {
    slug: 'property-management-companies',
    icon: Building2,
    title: 'Property Management',
    titleHighlight: 'Companies',
    description:
      'Owners, tenants, vendors, maintenance, compliance, communications, reporting, leasing, and payments all run through Revun.',
    highlights: [
      'Real-time owner portals with financial dashboards',
      'Province-specific compliance enforcement',
      'Trust accounting and owner disbursements',
    ],
    cta: 'Explore for PMCs',
  },
  {
    slug: 'brokerages',
    icon: Briefcase,
    title: 'Brokerages',
    titleHighlight: '& Agents',
    description:
      'One system for client communication, showing coordination, offer submission, document automation, signatures, compliance, and deal visibility.',
    highlights: [
      'Template-based offer packages with e-signatures',
      'Centralized showing calendar with feedback capture',
      'FINTRAC and RECO compliance infrastructure built in',
    ],
    cta: 'Explore for Brokerages',
  },
  {
    slug: 'leasing-companies',
    icon: FileKey2,
    title: 'Leasing',
    titleHighlight: 'Companies',
    description:
      'From inquiry to application to offer to lease to move-in, Revun runs the full leasing workflow in one place.',
    highlights: [
      'Branded application pipeline with screening triggers',
      'Clause-library lease generation engine',
      'Automatic N-series and provincial notice enforcement',
    ],
    cta: 'Explore for Leasing',
  },
  {
    slug: 'maintenance-companies',
    icon: Wrench,
    title: 'Maintenance',
    titleHighlight: 'Companies',
    description:
      'One system for dispatch, scheduling, technician updates, approvals, proof of completion, invoicing, and customer communication.',
    highlights: [
      'Drag-and-drop dispatch with GPS tracking and routing',
      'Proof of completion with photos, signatures, and audit trail',
      'Auto-generated invoices from completed work orders',
    ],
    cta: 'Explore for Maintenance',
  },
  {
    slug: 'reits',
    icon: Landmark,
    title: 'REITs',
    titleHighlight: '& Investors',
    description:
      'Standardize operating procedures, reporting, permissions, communications, payments, and oversight across your full portfolio.',
    highlights: [
      'Portfolio-wide KPI dashboard with region filters',
      'Granular role-based access with audit logging',
      'Pre-built connectors for Yardi, MRI, and Sage',
    ],
    cta: 'Explore for REITs',
  },
  {
    slug: 'tenants',
    icon: Users,
    title: 'Tenant',
    titleHighlight: 'Portal',
    description:
      'Browse listings, apply online, pay rent, submit maintenance requests, communicate securely, and access all documents in one place.',
    highlights: [
      'Secure rent payments with automated receipts',
      'Maintenance requests with photo uploads and status tracking',
      'Private messaging — no personal phone numbers exchanged',
    ],
    cta: 'Explore for Tenants',
  },
  {
    slug: 'internal-ops-teams',
    icon: Shield,
    title: 'Internal Ops',
    titleHighlight: 'Teams',
    description:
      'Task management, role-based access, team coordination, internal communications, and full operational visibility in one system.',
    highlights: [
      'Task assignment with deadlines and dependency tracking',
      'Role-based permissions enforced at the system level',
      'Real-time operational dashboards with zero manual reporting',
    ],
    cta: 'Explore for Ops Teams',
  },
] as const

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function SolutionsPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#F5F6F8]">
        <motion.div
          className="relative z-10 mx-auto max-w-3xl px-4 py-12 text-center md:px-6 md:py-16 lg:px-8 lg:py-20"
          variants={heroStagger}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 text-sm font-medium uppercase tracking-widest text-[#176FEB]"
          >
            Solutions
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display text-3xl font-normal leading-[1.1] tracking-tight text-[#0A1628] md:text-5xl lg:text-6xl"
          >
            Built for How You{' '}
            <span className="text-[#176FEB]">Work</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#555860]"
          >
            From self-managing a single unit to operating a national portfolio,
            Revun adapts to your role, your workflow, and your scale.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Solutions grid ────────────────────────────────────────────── */}
      <section className="bg-[#F5F6F8] py-12 md:py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll
            stagger={0.08}
            className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8"
          >
            {solutions.map((s) => {
              const Icon = s.icon
              return (
                <motion.div
                  key={s.slug}
                  variants={revealItem}
                  className="group flex flex-col rounded-2xl border border-[#D3D5DB] bg-white p-8 transition-colors duration-150 hover:border-[#176FEB]"
                >
                  {/* Icon */}
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F2FE] text-[#176FEB]">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>

                  {/* Title */}
                  <h2 className="font-heading text-xl font-bold text-[#2C2E33]">
                    {s.title}{' '}
                    <span className="text-[#176FEB]">{s.titleHighlight}</span>
                  </h2>

                  {/* Description */}
                  <p className="mt-3 text-[0.938rem] leading-relaxed text-[#555860]">
                    {s.description}
                  </p>

                  {/* Feature highlights */}
                  <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                    {s.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2.5 text-sm text-[#555860]"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#176FEB]" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={`/solutions/${s.slug}/`}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#176FEB] transition-colors duration-150 hover:text-[#1259c0]"
                  >
                    {s.cta}
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1"
                      strokeWidth={2}
                    />
                  </Link>
                </motion.div>
              )
            })}
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white py-12 md:py-20 lg:py-28">
        <RevealOnScroll className="relative z-10 mx-auto max-w-2xl px-4 md:px-6 lg:px-8 text-center">
          <motion.p
            variants={revealItem}
            className="mb-3 text-sm font-medium uppercase tracking-widest text-[#176FEB]"
          >
            Not sure where to start?
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="font-heading text-3xl font-bold tracking-tight text-[#0A1628] sm:text-4xl"
          >
            Tell us about your{' '}
            <span className="text-[#176FEB]">operation</span>
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mt-4 text-lg leading-relaxed text-[#555860]"
          >
            Book a 15-minute discovery call and we will map Revun to your exact
            workflow.
          </motion.p>
          <motion.div
            variants={revealItem}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/demo/"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-[#176FEB] px-8 text-base font-semibold text-white transition-colors duration-150 hover:bg-[#1259c0]"
            >
              Book a Demo
            </Link>
            <Link
              href="/pricing/"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E5E7EB] px-8 text-base font-semibold text-[#0A1628] transition-colors duration-150 hover:border-[#176FEB]/40 hover:bg-white"
            >
              View Pricing
            </Link>
          </motion.div>
        </RevealOnScroll>
      </section>
    </>
  )
}
