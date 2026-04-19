'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import {
  ArrowRight,
  ShieldCheck,
  FileText,
  CreditCard,
  Banknote,
  Car,
  Building2,
  Globe,
  Camera,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Eye,
  UserCheck,
  Sparkles,
  Lock,
  Fingerprint,
  ScanLine,
  FileWarning,
  Users,
  Home,
  Briefcase,
  BadgeCheck,
  Flag,
  Database,
  ShieldAlert,
} from 'lucide-react'

/* ═══════════════════════════════════════════ */
/*  Shared                                     */
/* ═══════════════════════════════════════════ */

const ease = [0.22, 1, 0.36, 1] as const

function SectionWrapper({ children, id, dark }: { children: React.ReactNode; id: string; dark?: boolean }) {
  return (
    <section id={id} className={`py-16 md:py-20 ${dark ? 'bg-[#F5F6F8]' : 'bg-white'}`}>
      <div className="mx-auto max-w-6xl px-6">{children}</div>
    </section>
  )
}

function SectionHeader({ eyebrow, title, highlight, description }: {
  eyebrow: string; title: string; highlight: string; description: string
}) {
  return (
    <RevealOnScroll className="mx-auto max-w-2xl text-center">
      <motion.p variants={revealItem} className="text-sm font-heading font-semibold uppercase tracking-wider text-brand-blue">
        {eyebrow}
      </motion.p>
      <motion.h2 variants={revealItem} className="mt-3 font-display text-4xl font-normal md:text-5xl text-brand-graphite">
        {title} <span className="text-keyword">{highlight}</span>
      </motion.h2>
      <motion.p variants={revealItem} className="mx-auto mt-4 max-w-xl text-lg text-brand-graphite/70">
        {description}
      </motion.p>
    </RevealOnScroll>
  )
}

/* Star rating (brand-blue fill) */
function StarRow({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-brand-blue">
          <path d="M10 1.5l2.6 5.9 6.4.6-4.8 4.4 1.4 6.3L10 15.3l-5.6 3.3 1.4-6.3L1 7.9l6.4-.5L10 1.5z" />
        </svg>
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 1: Hero                            */
/* ═══════════════════════════════════════════ */

function DocumentVaultHero() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const floatingDocs = [
    { icon: ShieldCheck, label: 'Government ID', status: 'Verified', delay: 0.3, offset: 'top-4 right-0' },
    { icon: CreditCard, label: 'Credit Report', status: '742', delay: 0.45, offset: 'top-24 left-4' },
    { icon: Banknote, label: 'Pay Stub', status: 'Reviewed', delay: 0.6, offset: 'top-44 right-8' },
  ]

  return (
    <section className="relative overflow-hidden bg-white pb-16 pt-24 md:pt-32">
      <div className="absolute inset-0 bg-grid bg-grid-mask opacity-40" aria-hidden="true" />
      <div className="absolute top-0 right-[-200px] h-[500px] w-[500px] rounded-full bg-brand-blue/[0.04] blur-[120px]" aria-hidden="true" />

      <div ref={ref} className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          {/* Left: copy */}
          <RevealOnScroll>
            <motion.div variants={revealItem} className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-1.5 shadow-sm">
              <Lock className="h-4 w-4 text-brand-blue" />
              <span className="text-sm font-medium text-brand-graphite-mid">Document Vault</span>
            </motion.div>
            <motion.h1
              variants={revealItem}
              className="font-display text-5xl font-normal leading-[1.1] tracking-tight text-brand-graphite md:text-6xl"
            >
              Your secure{' '}
              <span className="text-brand-blue">digital safe</span> for every rental document
            </motion.h1>
            <motion.p
              variants={revealItem}
              className="mt-6 max-w-xl text-lg leading-relaxed text-brand-graphite-mid"
            >
              All your rental documents in one encrypted vault. Upload once, verify once, reuse everywhere. From government IDs to credit reports, Revun keeps every file safe, signed, and tenant-portable.
            </motion.p>
            <motion.div variants={revealItem} className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
              <Link
                href="/signup/"
                className="inline-flex h-14 items-center justify-center rounded-xl bg-brand-blue px-8 text-base font-semibold text-white transition-all hover:bg-brand-blue-dark"
              >
                Get Started Free
              </Link>
              <Link
                href="/demo/"
                className="inline-flex h-14 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-8 text-base font-semibold text-brand-graphite transition-all hover:border-brand-blue/30 hover:shadow-sm"
              >
                Book a Demo
              </Link>
            </motion.div>
            <motion.div variants={revealItem} className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-brand-graphite-mid">
              <span className="flex items-center gap-1.5"><Lock className="h-3.5 w-3.5 text-brand-blue" /> AES-256 encrypted</span>
              <span className="flex items-center gap-1.5"><Flag className="h-3.5 w-3.5 text-brand-blue" /> PIPEDA aligned</span>
              <span className="flex items-center gap-1.5"><UserCheck className="h-3.5 w-3.5 text-brand-blue" /> Persona verified</span>
            </motion.div>
          </RevealOnScroll>

          {/* Right: floating card collage */}
          <div className="relative mx-auto h-[420px] w-full max-w-md">
            {/* Main vault card */}
            <motion.div
              className="absolute inset-x-2 top-2 rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-[0_30px_80px_-30px_rgba(10,22,40,0.25)]"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease, delay: 0.15 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-blue/10">
                    <Lock className="h-4 w-4 text-brand-blue" />
                  </div>
                  <div>
                    <p className="text-xs text-brand-graphite-mid">Vault</p>
                    <p className="font-heading text-sm font-semibold text-brand-graphite">7 documents</p>
                  </div>
                </div>
                <span className="rounded-full bg-brand-blue/10 px-2.5 py-1 text-[10px] font-semibold text-brand-blue">Encrypted</span>
              </div>
              <div className="mt-5 space-y-2">
                {[
                  { icon: ShieldCheck, label: 'Government ID', sub: 'Verified by Persona' },
                  { icon: CreditCard, label: 'Credit Report', sub: 'Equifax · 742' },
                  { icon: Banknote, label: 'Pay Stub', sub: 'Apr 2026' },
                  { icon: Building2, label: 'Bank Statement', sub: 'Last 60 days' },
                ].map((doc, i) => (
                  <motion.div
                    key={doc.label}
                    className="flex items-center gap-3 rounded-xl border border-[#E5E7EB] bg-brand-off-white/40 px-3 py-2.5"
                    initial={{ opacity: 0, x: -8 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, ease, delay: 0.35 + i * 0.08 }}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
                      <doc.icon className="h-4 w-4 text-brand-blue" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium text-brand-graphite">{doc.label}</p>
                      <p className="truncate text-[10px] text-brand-graphite-mid">{doc.sub}</p>
                    </div>
                    <CheckCircle2 className="h-4 w-4 text-brand-blue" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Floating verification badges */}
            {floatingDocs.map((doc, i) => (
              <motion.div
                key={doc.label}
                className={`absolute ${doc.offset} hidden rounded-xl border border-[#E5E7EB] bg-white px-3 py-2 shadow-lg lg:flex`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? {
                  opacity: 1,
                  scale: 1,
                  y: [0, -6, 0],
                } : {}}
                transition={{
                  opacity: { duration: 0.5, delay: doc.delay },
                  scale: { duration: 0.5, delay: doc.delay },
                  y: { duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: doc.delay },
                }}
              >
                <div className="flex items-center gap-2">
                  <doc.icon className="h-4 w-4 text-brand-blue" />
                  <div>
                    <p className="text-[10px] text-brand-graphite-mid">{doc.label}</p>
                    <p className="text-xs font-semibold text-brand-graphite">{doc.status}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 2: Stat Bar                        */
/* ═══════════════════════════════════════════ */

function StatTile({ icon: Icon, value, label, delay, inView }: {
  icon: React.ElementType; value: string; label: string; delay: number; inView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease, delay }}
      className="flex items-start gap-3 rounded-2xl border border-[#E5E7EB] bg-white p-5"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10">
        <Icon className="h-5 w-5 text-brand-blue" />
      </div>
      <div>
        <p className="font-heading text-lg font-bold text-brand-graphite">{value}</p>
        <p className="text-xs text-brand-graphite-mid">{label}</p>
      </div>
    </motion.div>
  )
}

function StatBar() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const stats = [
    { icon: FileText, value: '7 document types', label: 'Stored and shareable in one vault' },
    { icon: Lock, value: 'AES-256 encryption', label: 'At rest and in transit' },
    { icon: Sparkles, value: 'Reusable across applications', label: 'Upload once, share many times' },
    { icon: Flag, value: 'PIPEDA and FINTRAC aligned', label: 'Canadian compliance built in' },
  ]
  return (
    <section id="stat-bar" className="border-y border-[#E5E7EB] bg-brand-off-white py-12">
      <div ref={ref} className="mx-auto max-w-6xl px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <StatTile key={s.value} {...s} delay={0.1 + i * 0.08} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 3: Your Secure Digital Safe        */
/* ═══════════════════════════════════════════ */

const documentCategories = [
  { icon: ShieldCheck, label: 'Government ID', description: 'Passport, driver\'s licence, or provincial ID' },
  { icon: Globe, label: 'Immigration', description: 'Work permits, study permits, PR cards' },
  { icon: CreditCard, label: 'Credit Report', description: 'Equifax credit score and history' },
  { icon: FileText, label: 'Income Verification Letter', description: 'Employer-issued employment and income letter' },
  { icon: Banknote, label: 'Pay Stubs', description: 'Recent pay stubs or deposit records' },
  { icon: Car, label: 'Ownership of Vehicle', description: 'Vehicle registration and ownership docs' },
  { icon: Building2, label: 'Bank Statements', description: 'Recent bank or financial statements' },
]

function DigitalSafe() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <SectionWrapper id="digital-safe">
      <SectionHeader
        eyebrow="Document Vault"
        title="Your Secure"
        highlight="Digital Safe"
        description="All your rental documents in one secure place. Everything is encrypted and easy to access."
      />
      <div ref={ref} className="mt-12 grid gap-6 lg:grid-cols-12 lg:items-stretch">
        {/* Main vault card */}
        <motion.div
          className="flex flex-col rounded-2xl border border-[#E5E7EB] bg-white p-6 lg:col-span-7"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-heading text-lg font-semibold text-brand-graphite">Documents Vault</h3>
            <span className="flex items-center gap-1.5 rounded-full bg-[#176FEB]/10 px-3 py-1 text-xs font-medium text-[#176FEB]">
              <Lock className="h-3 w-3" /> Encrypted
            </span>
          </div>

          <div className="space-y-1">
            {documentCategories.map((doc, i) => {
              const Icon = doc.icon
              return (
                <motion.div
                  key={doc.label}
                  className="flex items-center justify-between rounded-xl px-4 py-3.5 transition-colors hover:bg-brand-off-white"
                  initial={{ opacity: 0, x: -8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.35, ease, delay: 0.2 + i * 0.06 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-blue/8">
                      <Icon className="h-5 w-5 text-brand-blue" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-brand-graphite">{doc.label}</p>
                      <p className="text-xs text-brand-graphite-mid">{doc.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-brand-graphite-light" />
                </motion.div>
              )
            })}
          </div>

          {/* Upload footer — balances column height + adds action context */}
          <motion.div
            className="mt-6 flex items-center gap-3 rounded-xl border border-dashed border-brand-blue/30 bg-brand-blue/5 p-4"
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, ease, delay: 0.7 }}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10">
              <Sparkles className="h-5 w-5 text-brand-blue" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-brand-graphite">Upload once, reuse forever</p>
              <p className="text-xs text-brand-graphite-mid">Drop a file or snap a photo — we verify and file it for every future application.</p>
            </div>
            <span className="shrink-0 rounded-lg bg-brand-blue px-3 py-1.5 text-xs font-semibold text-white">
              Upload
            </span>
          </motion.div>
        </motion.div>

        {/* Security sidebar — 5 tiles, auto-distributed to match left column */}
        <div className="flex flex-col gap-4 lg:col-span-5">
          {[
            { icon: Lock, label: 'End-to-End Encryption', value: 'AES-256', description: 'All documents encrypted at rest and in transit' },
            { icon: Fingerprint, label: 'Biometric Access', value: 'Enabled', description: 'Face ID and fingerprint authentication' },
            { icon: Eye, label: 'Access Logging', value: 'Full Audit', description: 'Every view, download, and share is logged' },
            { icon: BadgeCheck, label: 'Revocable Sharing', value: 'One-Tap', description: 'Revoke access to any document instantly, anytime' },
            { icon: Flag, label: 'Canadian Data Residency', value: 'Toronto + Montreal', description: 'Stored on Canadian infrastructure, PIPEDA aligned' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex-1 rounded-xl border border-[#E5E7EB] bg-white p-5"
              initial={{ opacity: 0, x: 16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, ease, delay: 0.3 + i * 0.1 }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10">
                  <stat.icon className="h-5 w-5 text-brand-blue" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-brand-graphite-mid">{stat.label}</p>
                  <p className="font-heading text-lg font-bold text-brand-graphite">{stat.value}</p>
                </div>
              </div>
              <p className="mt-2 text-xs text-brand-graphite-mid">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 4: Before vs After                 */
/* ═══════════════════════════════════════════ */

function BeforeAfter() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const pains = [
    'Scanned IDs scattered across 5 email threads',
    'Paystubs re-uploaded for every new landlord',
    'Credit pulled again and again, each a hard inquiry',
    'No single place to revoke access when you move on',
  ]
  const wins = [
    'One encrypted vault, every document in its place',
    'Upload once, reuse across every application',
    'One credit pull, shared with permission, no re-inquiries',
    'Revoke access any time with a single tap',
  ]

  return (
    <SectionWrapper id="before-after" dark>
      <SectionHeader
        eyebrow="Before and After"
        title="From scattered paperwork to"
        highlight="one tidy vault."
        description="See the difference the Document Vault makes on the day you apply for your next home."
      />
      <div ref={ref} className="mt-12 grid gap-6 lg:grid-cols-2">
        {/* Without Revun */}
        <motion.div
          className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white"
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80"
              alt="Cluttered desk with scattered papers and documents"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/60 via-[#0A1628]/10 to-transparent" />
            <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/90 px-3 py-1 backdrop-blur">
              <FileWarning className="h-3.5 w-3.5 text-brand-blue" />
              <span className="text-xs font-semibold text-brand-graphite">Without Revun</span>
            </div>
            <div className="absolute bottom-5 left-5 right-5">
              <p className="font-heading text-xl font-bold text-white">Paper chase, every time</p>
            </div>
          </div>
          <div className="p-6">
            <ul className="space-y-3">
              {pains.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-brand-graphite-mid">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-brand-graphite-light">
                    <span className="block h-1.5 w-1.5 rounded-full bg-brand-graphite-light" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* With Revun */}
        <motion.div
          className="overflow-hidden rounded-2xl border border-brand-blue/25 bg-white"
          initial={{ opacity: 0, x: 16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
        >
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=900&q=85"
              alt="Person organizing documents on a tidy desk with a laptop"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            {/* Brand blue overlay for narrative continuity */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/85 via-[#1B77F0]/75 to-brand-blue-dark/85" />
            <div
              className="absolute inset-0 opacity-15"
              style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize: '18px 18px' }}
            />
            <div className="relative flex h-full flex-col justify-between p-6">
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/20 px-3 py-1 backdrop-blur">
                <BadgeCheck className="h-3.5 w-3.5 text-white" />
                <span className="text-xs font-semibold text-white">With Revun</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[ShieldCheck, CreditCard, Banknote, FileText, Building2, Globe].map((Icon, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-1.5 rounded-lg bg-white/15 px-2 py-1.5 backdrop-blur"
                    initial={{ opacity: 0, y: 6 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.35, ease, delay: 0.4 + i * 0.06 }}
                  >
                    <Icon className="h-3 w-3 text-white" />
                    <CheckCircle2 className="h-3 w-3 text-white" />
                  </motion.div>
                ))}
              </div>
              <p className="font-heading text-xl font-bold text-white drop-shadow-sm">One vault, always ready</p>
            </div>
          </div>
          <div className="p-6">
            <ul className="space-y-3">
              {wins.map((w) => (
                <li key={w} className="flex items-start gap-2.5 text-sm text-brand-graphite">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 5: Immigration Verification        */
/* ═══════════════════════════════════════════ */

const documentTypes = [
  'Residence / Work / Study Permit',
  'Permanent Resident Card',
  'Immigration or Entry Document',
  'Visitor / Student Authorization',
]

function ImmigrationVerification() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <SectionWrapper id="immigration">
      <SectionHeader
        eyebrow="Immigration"
        title="Choose How To"
        highlight="Get Verified"
        description="Select the document type you want to upload to get verified quickly and securely."
      />
      <div ref={ref} className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-stretch">
        {/* Left: document type picker */}
        <motion.div
          className="flex flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white"
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          <div className="border-b border-[#E5E7EB] px-6 py-4">
            <h3 className="font-heading text-lg font-semibold text-brand-graphite">Immigration</h3>
          </div>

          <div className="border-b border-[#E5E7EB] px-6 py-5">
            <p className="text-xs font-medium uppercase tracking-wider text-brand-graphite-mid">Document Issuing Country</p>
            <div className="mt-3 flex items-center gap-3 rounded-xl border border-[#E5E7EB] px-4 py-3">
              <span className="text-lg">🇨🇦</span>
              <span className="text-sm font-medium text-brand-graphite">Canada</span>
              <ChevronRight className="ml-auto h-4 w-4 text-brand-graphite-light" />
            </div>
          </div>

          <div className="flex-1 px-6 py-4">
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-brand-graphite-mid">Select Document Type</p>
            <div className="space-y-1">
              {documentTypes.map((type, i) => (
                <motion.div
                  key={type}
                  className="flex items-center justify-between rounded-xl px-4 py-3.5 transition-colors hover:bg-brand-off-white"
                  initial={{ opacity: 0, x: -8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.35, ease, delay: 0.3 + i * 0.08 }}
                >
                  <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-brand-blue" />
                    <span className="text-sm font-medium text-brand-graphite">{type}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-brand-graphite-light" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Footer trust strip */}
          <div className="border-t border-[#E5E7EB] bg-brand-off-white/40 px-6 py-4">
            <div className="flex items-center gap-3">
              <UserCheck className="h-4 w-4 shrink-0 text-brand-blue" />
              <p className="text-xs text-brand-graphite-mid">
                <span className="font-semibold text-brand-graphite">Verified via Persona.</span>{' '}Permits and PR cards validated in under 90 seconds.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right: custom editorial panel (no external image) */}
        <motion.div
          className="relative overflow-hidden rounded-2xl border border-brand-blue/20 bg-gradient-to-br from-brand-blue via-[#1B77F0] to-brand-blue-dark"
          initial={{ opacity: 0, x: 16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.25 }}
        >
          {/* Dotted texture */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />

          {/* Large maple leaf watermark */}
          <svg
            viewBox="0 0 100 100"
            className="absolute -right-10 -top-10 h-72 w-72 text-white/10"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M50 5 L55 25 L70 18 L65 38 L85 35 L72 50 L88 60 L68 62 L72 78 L55 70 L50 95 L45 70 L28 78 L32 62 L12 60 L28 50 L15 35 L35 38 L30 18 L45 25 Z"
            />
          </svg>

          <div className="relative flex h-full min-h-[440px] flex-col p-8">
            {/* Top: country badge */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 backdrop-blur">
                <span className="text-base leading-none">🇨🇦</span>
                <span className="text-xs font-heading font-semibold uppercase tracking-wider text-white">Built for Canada</span>
              </span>
            </div>

            {/* Middle: floating passport card */}
            <div className="relative mt-6 flex flex-1 items-center justify-center">
              <motion.div
                className="relative w-52 rounded-2xl bg-white p-5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.4)]"
                initial={{ rotate: -5, y: 10, opacity: 0 }}
                animate={inView ? { rotate: -4, y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.7, ease, delay: 0.4 }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-brand-graphite">Canada</span>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-brand-graphite-mid">Passport</span>
                </div>
                <div className="mt-4 flex h-16 w-16 items-center justify-center rounded-lg bg-brand-blue/10">
                  <Globe className="h-8 w-8 text-brand-blue" />
                </div>
                <div className="mt-4 space-y-1.5">
                  <div className="h-1.5 w-full rounded-full bg-brand-off-white" />
                  <div className="h-1.5 w-3/4 rounded-full bg-brand-off-white" />
                  <div className="h-1.5 w-1/2 rounded-full bg-brand-off-white" />
                </div>
                <div className="mt-4 flex items-center gap-1.5 rounded-lg bg-brand-blue/10 px-2.5 py-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-brand-blue" />
                  <span className="text-[10px] font-semibold text-brand-blue">Verified by Persona</span>
                </div>
              </motion.div>

              {/* Floating secondary card */}
              <motion.div
                className="absolute right-6 top-2 hidden w-32 rounded-xl border border-white/40 bg-white/95 p-3 shadow-lg backdrop-blur md:block"
                initial={{ rotate: 8, y: 16, opacity: 0 }}
                animate={inView ? { rotate: 8, y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.7, ease, delay: 0.55 }}
              >
                <div className="flex items-center gap-1.5">
                  <Flag className="h-3 w-3 text-brand-blue" />
                  <span className="text-[9px] font-bold uppercase tracking-wider text-brand-graphite">PR Card</span>
                </div>
                <div className="mt-2 space-y-1">
                  <div className="h-1 w-full rounded-full bg-brand-off-white" />
                  <div className="h-1 w-4/5 rounded-full bg-brand-off-white" />
                </div>
                <div className="mt-2 text-[9px] font-semibold text-brand-blue">Approved</div>
              </motion.div>
            </div>

            {/* Bottom: stats + headline */}
            <motion.div
              className="rounded-xl border border-white/20 bg-white/95 p-4 backdrop-blur"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease, delay: 0.55 }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10">
                  <Globe className="h-5 w-5 text-brand-blue" />
                </div>
                <div>
                  <p className="font-heading text-sm font-semibold text-brand-graphite">Global newcomers welcome</p>
                  <p className="text-xs text-brand-graphite-mid">Permits, PR cards, and study visas, all across Canada</p>
                </div>
              </div>
              <div className="mt-3 flex gap-3 border-t border-[#E5E7EB] pt-3">
                <div>
                  <p className="font-heading text-lg font-bold text-brand-graphite">150+</p>
                  <p className="text-[10px] uppercase tracking-wider text-brand-graphite-mid">Countries accepted</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="font-heading text-lg font-bold text-brand-graphite">90 sec</p>
                  <p className="text-[10px] uppercase tracking-wider text-brand-graphite-mid">Avg. verification</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 6: Identity Verification (3-step)  */
/* ═══════════════════════════════════════════ */

const idSteps = [
  {
    n: '01',
    icon: Camera,
    title: 'Capture ID',
    body: 'Snap front and back of your government ID from any device. Auto-crop and glare detection included.',
    tip: 'Use a flat surface and bright, even lighting',
  },
  {
    n: '02',
    icon: ScanLine,
    title: 'Selfie Verify',
    body: 'A live Face ID match confirms the real person behind the document. Liveness check stops spoofing.',
    tip: 'Look at the camera and follow the prompt',
  },
  {
    n: '03',
    icon: CheckCircle2,
    title: 'Verified',
    body: 'Five Persona checks run in parallel and return a verdict in under 90 seconds. Your vault is ready.',
    tip: 'Results saved to your encrypted vault',
  },
]

const verificationChecks = [
  'Name match',
  'Date of birth match',
  'Valid ID',
  'Valid selfie',
  'Selfie matches ID photo',
]

function IdentityVerificationFlow() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <SectionWrapper id="identity" dark>
      <SectionHeader
        eyebrow="Identity"
        title="Three steps to a"
        highlight="Verified Identity"
        description="Persona runs the ID capture, selfie match, and validity checks. Revun stores the signed verdict in your vault."
      />

      <div ref={ref} className="relative mt-14">
        {/* Connector line (desktop) */}
        <div className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px lg:block">
          <div className="mx-auto h-full max-w-4xl bg-gradient-to-r from-transparent via-brand-blue/40 to-transparent" />
        </div>

        {/* Steps */}
        <div className="relative grid gap-5 lg:grid-cols-3">
          {idSteps.map((s, i) => (
            <motion.div
              key={s.n}
              className="relative rounded-2xl border border-[#E5E7EB] bg-white p-6"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease, delay: 0.1 + i * 0.12 }}
            >
              <div className="flex items-center justify-between">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-white bg-brand-blue text-white shadow-[0_12px_30px_-10px_rgba(23,111,235,0.5)]">
                  <s.icon className="h-7 w-7" />
                </span>
                <span className="font-display text-4xl font-normal text-brand-blue/25">{s.n}</span>
              </div>
              <h3 className="mt-5 font-heading text-lg font-semibold text-brand-graphite">{s.title}</h3>
              <p className="mt-2 text-sm text-brand-graphite-mid">{s.body}</p>
              <div className="mt-5 flex items-start gap-2 rounded-xl bg-brand-blue/5 px-3 py-2.5 text-xs text-brand-graphite">
                <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-blue" />
                <span>{s.tip}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Persona results strip */}
        <motion.div
          className="mt-8 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.5 }}
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E7EB] bg-brand-off-white/50 px-6 py-4">
            <div className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-brand-blue" />
              <span className="font-heading text-sm font-semibold text-brand-graphite">Verification complete</span>
              <span className="rounded-full bg-brand-blue/10 px-2.5 py-0.5 text-[10px] font-semibold text-brand-blue">5 / 5 passed</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-brand-graphite-mid">
              <span>Verified by</span>
              <span className="font-heading font-bold text-brand-graphite">persona</span>
            </div>
          </div>
          <div className="grid gap-0 divide-y divide-[#E5E7EB] md:grid-cols-5 md:divide-x md:divide-y-0">
            {verificationChecks.map((check, i) => (
              <motion.div
                key={check}
                className="flex items-center gap-2 px-5 py-4"
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, ease, delay: 0.6 + i * 0.06 }}
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-blue" />
                <span className="text-xs font-medium text-brand-graphite">{check}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 7: Proof of Income                 */
/* ═══════════════════════════════════════════ */

function ProofOfIncome() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <SectionWrapper id="income">
      <SectionHeader
        eyebrow="Income Verification"
        title="Proof Of Income"
        highlight="Made Easy"
        description="Verify your income once and reuse it for future rental applications with one click."
      />
      <div ref={ref} className="mt-12 grid gap-8 lg:grid-cols-2">
        {/* Letter preview */}
        <motion.div
          className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          <div className="border-b border-[#E5E7EB] px-6 py-4">
            <h3 className="font-heading text-base font-semibold text-brand-graphite">Income Verification Letter</h3>
          </div>
          <div className="p-6">
            <div className="rounded-xl bg-brand-off-white p-5">
              <p className="text-xs text-brand-graphite-mid">April 24, 2026</p>
              <p className="mt-3 text-sm font-medium text-brand-graphite">Employment Letter</p>
              <p className="mt-2 text-xs leading-relaxed text-brand-graphite-mid">
                This letter confirms that <strong className="text-brand-graphite">John Doe</strong> has been
                employed at <strong className="text-brand-graphite">ABC Company</strong> since January 2022
                as a <strong className="text-brand-graphite">Software Engineer</strong> with an annual
                salary of <strong className="text-brand-graphite">$95,000</strong>.
              </p>
              <p className="mt-3 text-xs text-brand-blue font-medium">Read more</p>
            </div>
            <p className="mt-5 text-sm text-brand-graphite-mid">
              This letter is issued by your employer to confirm your <strong className="text-brand-graphite">current employment status, income, and position</strong>.
            </p>
          </div>
        </motion.div>

        {/* Company selector */}
        <motion.div
          className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
        >
          <div className="border-b border-[#E5E7EB] px-6 py-4">
            <p className="text-sm text-brand-graphite-mid">
              Select the company below for where you want to upload your proof of income.
            </p>
          </div>
          <div className="divide-y divide-[#E5E7EB]">
            {['ABC Company', 'TD Bank'].map((company, i) => (
              <motion.div
                key={company}
                className="flex items-center justify-between px-6 py-5 transition-colors hover:bg-brand-off-white/50"
                initial={{ opacity: 0, x: 8 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, ease, delay: 0.3 + i * 0.1 }}
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-blue" />
                  <span className="text-sm font-medium text-brand-graphite">{company}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-brand-graphite-light" />
              </motion.div>
            ))}
          </div>
          <div className="px-6 py-5">
            <Link
              href="/signup/"
              className="flex w-full items-center justify-center rounded-xl bg-brand-blue py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-dark"
            >
              Get Started
            </Link>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 8: Built-In Credit Report          */
/* ═══════════════════════════════════════════ */

function ScoreGauge({ score, inView }: { score: number; inView: boolean }) {
  const size = 200
  const sw = 14
  const r = (size - sw) / 2
  const cy = size / 2
  const arcLen = Math.PI * r
  const pct = Math.min(Math.max(score / 900, 0), 1)
  const filled = pct * arcLen

  const arcPath = `M ${sw / 2} ${cy} A ${r} ${r} 0 0 1 ${size - sw / 2} ${cy}`
  const svgHeight = size / 2 + sw

  return (
    <div className="flex flex-col items-center">
      <svg
        width={size}
        height={svgHeight}
        viewBox={`0 0 ${size} ${svgHeight}`}
        className="block"
      >
        <path
          d={arcPath}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={sw}
          strokeLinecap="round"
        />
        <motion.path
          d={arcPath}
          fill="none"
          stroke="#176FEB"
          strokeWidth={sw}
          strokeLinecap="round"
          strokeDasharray={arcLen}
          initial={{ strokeDashoffset: arcLen }}
          animate={inView ? { strokeDashoffset: arcLen - filled } : {}}
          transition={{ duration: 1.4, ease, delay: 0.3 }}
        />
      </svg>
      <div className="-mt-2 text-center">
        <p className="font-heading text-4xl font-bold leading-none text-brand-graphite">{score}</p>
        <p className="mt-1.5 text-xs font-medium text-brand-graphite-mid">Credit Score</p>
        <p className="mt-0.5 text-[10px] text-brand-graphite-light">Out of 900</p>
      </div>
    </div>
  )
}

function CreditReport() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <SectionWrapper id="credit-report" dark>
      <SectionHeader
        eyebrow="Credit"
        title="Built-In"
        highlight="Credit Report"
        description="View your credit report instantly. Your score and details are securely pulled."
      />
      <div ref={ref} className="mt-12 grid gap-8 lg:grid-cols-12">
        {/* Score card */}
        <motion.div
          className="rounded-2xl border border-[#E5E7EB] bg-white p-6 lg:col-span-5"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-heading text-base font-semibold text-brand-graphite">Credit Report Overview</h3>
            <div className="flex items-center gap-1.5 text-xs text-brand-graphite-mid">
              <span>Powered by</span>
              <span className="font-heading font-bold text-brand-graphite">EQUIFAX</span>
            </div>
          </div>

          <ScoreGauge score={742} inView={inView} />

          {/* Key metrics */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            {[
              { label: 'Debt to Income', value: '14%', sub: 'As a % of monthly income' },
              { label: 'Rent to Income', value: '19%', sub: 'As a % of monthly income' },
            ].map((metric) => (
              <div key={metric.label} className="rounded-xl bg-brand-off-white p-4 text-center">
                <p className="font-heading text-2xl font-bold text-brand-graphite">{metric.value}</p>
                <p className="mt-0.5 text-xs font-medium text-brand-graphite">{metric.label}</p>
                <p className="text-[10px] text-brand-graphite-mid">{metric.sub}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Report details */}
        <div className="space-y-4 lg:col-span-7">
          {/* Tabs */}
          <motion.div
            className="flex gap-1 rounded-xl border border-[#E5E7EB] bg-white p-1.5"
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease, delay: 0.2 }}
          >
            {['Credit Overview', 'Public Record', 'Tradelines'].map((tab, i) => (
              <div
                key={tab}
                className={`flex-1 rounded-lg py-2.5 text-center text-xs font-medium transition-colors ${i === 0 ? 'bg-brand-blue text-white' : 'text-brand-graphite-mid hover:text-brand-graphite'}`}
              >
                {tab}
              </div>
            ))}
          </motion.div>

          {/* Positives */}
          <motion.div
            className="rounded-2xl border border-[#E5E7EB] bg-white p-5"
            initial={{ opacity: 0, x: 12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease, delay: 0.3 }}
          >
            <div className="mb-4 flex items-center gap-2">
              <h4 className="font-heading text-sm font-semibold text-brand-graphite">Positives</h4>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-blue text-[10px] font-bold text-white">2</span>
            </div>
            <ul className="space-y-3">
              {[
                'Good rent to income affordability',
                'Good landlord reference',
              ].map((positive, i) => (
                <motion.li
                  key={positive}
                  className="flex items-center gap-2.5 text-sm text-brand-graphite-mid"
                  initial={{ opacity: 0, x: 8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.35, ease, delay: 0.4 + i * 0.08 }}
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-blue" />
                  {positive}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Info box */}
          <motion.div
            className="rounded-xl bg-brand-blue/5 border border-brand-blue/10 p-5"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 shrink-0 text-brand-blue" />
              <div>
                <p className="text-sm font-medium text-brand-graphite">Reusable across applications</p>
                <p className="mt-1 text-xs text-brand-graphite-mid">
                  Your credit report is pulled once and can be shared with multiple landlords. No repeated hard inquiries.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 9: Use Cases                       */
/* ═══════════════════════════════════════════ */

type Persona = {
  role: string
  title: string
  description: string
  image: string
  alt: string
  icon: React.ElementType
  benefits: string[]
}

function PersonaCard({ p, delay }: { p: Persona; delay: number }) {
  return (
    <motion.div
      variants={revealItem}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white transition-all hover:border-brand-blue/40 hover:shadow-md"
      transition={{ delay }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={p.image}
          alt={p.alt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/40 via-transparent to-transparent" />
        <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 backdrop-blur">
          <p.icon className="h-3 w-3 text-brand-blue" />
          <span className="text-[10px] font-heading font-semibold uppercase tracking-wider text-brand-graphite">{p.role}</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-base font-semibold text-brand-graphite">{p.title}</h3>
        <p className="mt-1.5 text-sm text-brand-graphite-mid">{p.description}</p>
        <ul className="mt-4 space-y-2">
          {p.benefits.map((b) => (
            <li key={b} className="flex items-start gap-2 text-xs text-brand-graphite">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-blue" />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

function UseCases() {
  const personas: Persona[] = [
    {
      role: 'Tenants',
      title: 'Rent with less paperwork',
      description: 'One vault you carry across every application.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      alt: 'Young tenant with documents ready for rental application',
      icon: Users,
      benefits: [
        'Upload documents once, share with any landlord',
        'Instant identity and income verification',
        'Revoke access the moment you move on',
      ],
    },
    {
      role: 'Property Managers',
      title: 'Close applications faster',
      description: 'Clean, verified files in a single dashboard.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
      alt: 'Property manager reviewing tenant applications',
      icon: Briefcase,
      benefits: [
        'Verified Persona and Equifax packages per applicant',
        'Full audit trail for tribunal defense',
        'Move from review to lease in minutes',
      ],
    },
    {
      role: 'Brokerages',
      title: 'Standardize across agents',
      description: 'Same compliance bar on every file your team submits.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      alt: 'Real estate broker working with rental clients',
      icon: Building2,
      benefits: [
        'PIPEDA-aligned consent flow baked in',
        'Branded document requests to applicants',
        'Central library with controlled access',
      ],
    },
    {
      role: 'Owners',
      title: 'Confidence in every signature',
      description: 'Know the file before you hand over the keys.',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      alt: 'Self-managing property owner reviewing a rental file',
      icon: Home,
      benefits: [
        'Clear verdicts, no more guess work',
        'Secure sharing with co-owners and partners',
        'Peace of mind backed by audit logs',
      ],
    },
  ]
  return (
    <SectionWrapper id="use-cases">
      <SectionHeader
        eyebrow="Built for"
        title="One vault,"
        highlight="every stakeholder."
        description="Tenants, property managers, brokerages, and owners each get the tools they need in a single secure place."
      />
      <RevealOnScroll className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
        {personas.map((p, i) => (
          <PersonaCard key={p.role} p={p} delay={0.05 + i * 0.06} />
        ))}
      </RevealOnScroll>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 10: Testimonials                   */
/* ═══════════════════════════════════════════ */

type Testimonial = {
  name: string
  title: string
  location: string
  photo: string
  alt: string
  quote: string
}

function TestimonialCard({ t, delay }: { t: Testimonial; delay: number }) {
  return (
    <motion.div
      variants={revealItem}
      transition={{ delay }}
      className="flex h-full flex-col rounded-2xl border border-[#E5E7EB] bg-white p-6 transition-all hover:border-brand-blue/40 hover:shadow-sm"
    >
      <StarRow />
      <p className="mt-4 font-display text-lg leading-snug text-brand-graphite">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="mt-6 flex items-center gap-3 border-t border-[#E5E7EB] pt-5">
        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
          <Image src={t.photo} alt={t.alt} fill sizes="44px" className="object-cover" />
        </div>
        <div className="min-w-0">
          <p className="truncate font-heading font-bold text-brand-graphite">{t.name}</p>
          <p className="truncate text-xs text-brand-graphite-mid">{t.title}</p>
          <p className="truncate text-xs text-brand-graphite-mid">{t.location}</p>
        </div>
      </div>
    </motion.div>
  )
}

function Testimonials() {
  const items: Testimonial[] = [
    {
      name: 'Alex Morin',
      title: 'Leasing Coordinator, Nord Habitat',
      location: 'Montreal, QC',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      alt: 'Alex Morin, Leasing Coordinator in Montreal',
      quote: 'The vault cut our turnaround from five days to under one. Every applicant walks in with a verified file, and our team finally stopped chasing PDFs.',
    },
    {
      name: 'Priya Sharma',
      title: 'Property Manager, MapleView Properties',
      location: 'Toronto, ON',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      alt: 'Priya Sharma, Property Manager in Toronto',
      quote: 'Persona and Equifax side by side, with a clean consent log. Revun makes the screening package my team presents look more professional overnight.',
    },
    {
      name: 'Daniel Chen',
      title: 'Self-Managing Owner, Pacific Lofts',
      location: 'Vancouver, BC',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      alt: 'Daniel Chen, self-managing owner in Vancouver',
      quote: 'I manage four condos on my own. The vault lets me verify ID, income, and credit without juggling apps. It feels like a team without hiring one.',
    },
  ]
  return (
    <SectionWrapper id="testimonials" dark>
      <SectionHeader
        eyebrow="Loved by operators"
        title="Canadian property pros"
        highlight="already trust the vault."
        description="Real stories from teams using Revun to run cleaner, faster, audit-ready leasing pipelines."
      />
      <RevealOnScroll className="mt-12 grid gap-6 md:grid-cols-3" stagger={0.1}>
        {items.map((t, i) => (
          <TestimonialCard key={t.name} t={t} delay={0.1 + i * 0.08} />
        ))}
      </RevealOnScroll>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 11: Trust Strip                    */
/* ═══════════════════════════════════════════ */

function TrustStrip() {
  const badges = [
    { icon: Lock, label: 'AES-256 Encryption' },
    { icon: Flag, label: 'PIPEDA Aligned' },
    { icon: ShieldAlert, label: 'FINTRAC Compliant' },
    { icon: ShieldCheck, label: 'SOC 2 Ready' },
    { icon: UserCheck, label: 'Persona Verified' },
    { icon: Database, label: 'Equifax Partner' },
  ]
  return (
    <SectionWrapper id="trust">
      <RevealOnScroll className="mx-auto max-w-2xl text-center">
        <motion.p variants={revealItem} className="text-sm font-heading font-semibold uppercase tracking-wider text-brand-blue">
          Compliance and Security
        </motion.p>
        <motion.h2 variants={revealItem} className="mt-3 font-display text-3xl font-normal md:text-4xl text-brand-graphite">
          Held to the standards Canadian{' '}
          <span className="text-keyword">operators expect.</span>
        </motion.h2>
      </RevealOnScroll>

      <RevealOnScroll className="mx-auto mt-10 flex max-w-5xl flex-wrap items-center justify-center gap-3" stagger={0.05}>
        {badges.map((b) => (
          <motion.div
            key={b.label}
            variants={revealItem}
            className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-2"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-blue/10">
              <b.icon className="h-3.5 w-3.5 text-brand-blue" />
            </span>
            <span className="text-xs font-heading font-semibold text-brand-graphite">{b.label}</span>
          </motion.div>
        ))}
      </RevealOnScroll>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 12: FAQ                            */
/* ═══════════════════════════════════════════ */

type FAQ = { q: string; a: string }

function FAQItem({ item, open, onToggle }: { item: FAQ; open: boolean; onToggle: () => void }) {
  return (
    <motion.div
      variants={revealItem}
      className={`overflow-hidden rounded-2xl border bg-white transition-colors ${open ? 'border-brand-blue/30' : 'border-[#E5E7EB]'}`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="font-heading text-sm font-semibold text-brand-graphite md:text-base">{item.q}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm leading-relaxed text-brand-graphite-mid">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function FAQSection() {
  const faqs: FAQ[] = [
    {
      q: 'How secure is my data in the Document Vault?',
      a: 'Every document is encrypted with AES-256 at rest and in transit. Access requires biometric or password authentication, and every view, download, and share is logged for audit.',
    },
    {
      q: 'Can I share verified documents with multiple landlords?',
      a: 'Yes. Your vault is reusable across applications. Share a time-bound link with any landlord, and revoke it any time. No need to upload the same file twice.',
    },
    {
      q: 'What document types does Revun support?',
      a: 'Government ID, immigration documents, Equifax credit reports, income verification letters, pay stubs, vehicle ownership papers, and bank statements. More formats are added as partners expand.',
    },
    {
      q: 'How does identity verification work?',
      a: 'Revun uses Persona to capture your ID, run a live selfie match, and perform five integrity checks in under 90 seconds. The signed verdict is stored permanently in your vault.',
    },
    {
      q: 'Is my credit check a hard inquiry?',
      a: 'No. Revun performs a soft pull through Equifax. Your score is never affected, and the report can be shared with multiple landlords without new inquiries each time.',
    },
    {
      q: 'Who can see my documents?',
      a: 'Only you and the parties you explicitly grant access to. Landlords and property managers see what you choose, when you choose. Revoke access instantly from your dashboard.',
    },
  ]
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <SectionWrapper id="faq" dark>
      <SectionHeader
        eyebrow="FAQ"
        title="Answers for"
        highlight="peace of mind."
        description="The most common questions about how the Document Vault keeps your files safe and portable."
      />
      <RevealOnScroll className="mx-auto mt-10 grid max-w-4xl gap-3 md:grid-cols-2" stagger={0.06}>
        {faqs.map((f, i) => (
          <FAQItem
            key={f.q}
            item={f}
            open={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </RevealOnScroll>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 13: CTA                            */
/* ═══════════════════════════════════════════ */

function VaultCTA() {
  return (
    <SectionWrapper id="cta">
      <div className="mx-auto max-w-3xl text-center">
        <RevealOnScroll>
          <motion.h2
            variants={revealItem}
            className="font-heading font-extrabold text-4xl tracking-tight text-[#0A1628] md:text-5xl"
          >
            Stop uploading the same documents{' '}
            <span className="text-brand-blue">over and over</span>
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mx-auto mt-5 max-w-lg text-lg text-[#555860]"
          >
            Upload once, verify once, reuse across every rental application. Your documents, your control, one secure vault.
          </motion.p>
          <motion.div variants={revealItem} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/signup/"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-blue px-8 text-base font-semibold text-white transition-colors hover:bg-brand-blue-dark"
            >
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/demo/"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-8 text-base font-semibold text-brand-graphite transition-colors hover:border-brand-blue/30 hover:shadow-sm"
            >
              Book a Demo
            </Link>
          </motion.div>
        </RevealOnScroll>
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Page Assembly                              */
/* ═══════════════════════════════════════════ */

export function DocumentVaultClient() {
  return (
    <>
      <DocumentVaultHero />
      <StatBar />
      <DigitalSafe />
      <BeforeAfter />
      <ImmigrationVerification />
      <IdentityVerificationFlow />
      <ProofOfIncome />
      <CreditReport />
      <UseCases />
      <Testimonials />
      <TrustStrip />
      <FAQSection />
      <VaultCTA />

      {/* AEO quick answer */}
      <p className="sr-only">
        Revun Document Vault is a secure digital safe for all rental documents. Tenants and owners can store government IDs, immigration documents, credit reports, income verification letters, pay stubs, vehicle ownership documents, and bank statements in one encrypted vault. Features include identity verification powered by Persona with selfie matching, built-in Equifax credit reports, income verification, and document upload via camera, photo library, or files. All documents are encrypted with AES-256, access-logged, and reusable across multiple rental applications. Revun is PIPEDA aligned, FINTRAC compliant, SOC 2 ready, and partners with Persona and Equifax for identity and credit verification.
      </p>
    </>
  )
}
