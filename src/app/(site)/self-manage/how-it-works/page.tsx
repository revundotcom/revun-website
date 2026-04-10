'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  UserPlus,
  Building,
  Megaphone,
  CalendarCheck,
  ShieldCheck,
  FileSignature,
  Settings,
} from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import { sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema, buildHowToSchema } from '@/lib/schema-builders'
import { heroStagger, fadeUp } from '@/lib/motion'

/* ── Data ────────────────────────────────────────────────────────────── */

const stepIllustrations = [
  /* Step 1: Create account */
  () => (
    <div className="mt-6 overflow-hidden rounded-xl border border-border bg-white p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="h-8 w-8 rounded-full bg-brand-blue/10 flex items-center justify-center"><UserPlus className="h-4 w-4 text-brand-blue" /></div>
        <div><p className="text-xs font-semibold text-foreground">Create Your Account</p><p className="text-[10px] text-muted-foreground">No credit card required</p></div>
      </div>
      <div className="space-y-2">
        <div className="rounded-lg bg-brand-off-white px-3 py-2"><p className="text-[10px] text-muted-foreground">Full Name</p><p className="text-xs text-foreground">Sarah Mitchell</p></div>
        <div className="rounded-lg bg-brand-off-white px-3 py-2"><p className="text-[10px] text-muted-foreground">Email</p><p className="text-xs text-foreground">sarah@example.com</p></div>
        <div className="rounded-lg bg-brand-blue py-2 text-center text-xs font-semibold text-white">Get Started Free</div>
      </div>
    </div>
  ),
  /* Step 2: Add properties */
  () => (
    <div className="mt-6 overflow-hidden rounded-xl border border-border bg-white p-4">
      <p className="text-xs font-semibold text-foreground mb-3">Your Properties</p>
      <div className="space-y-2">
        {[
          { addr: '245 King St W, Toronto', units: '12 units', occ: '100%' },
          { addr: '88 Harbord St, Toronto', units: '6 units', occ: '83%' },
          { addr: '1420 Rue Crescent, Montreal', units: '8 units', occ: '100%' },
        ].map((p) => (
          <div key={p.addr} className="flex items-center justify-between rounded-lg bg-brand-off-white px-3 py-2">
            <div><p className="text-[11px] font-medium text-foreground">{p.addr}</p><p className="text-[10px] text-muted-foreground">{p.units}</p></div>
            <span className="text-[10px] font-semibold text-[#22C55E]">{p.occ}</span>
          </div>
        ))}
      </div>
    </div>
  ),
  /* Step 3: Create listings */
  () => (
    <div className="mt-6 overflow-hidden rounded-xl border border-border bg-white p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold text-foreground">Active Listings</p>
        <span className="rounded-full bg-[#22C55E]/10 px-2 py-0.5 text-[9px] font-bold text-[#22C55E]">3 Live</span>
      </div>
      <div className="space-y-2">
        {[
          { unit: 'Unit 4B - 2BR', price: '$2,100/mo', views: '847 views', platforms: 'Revun, Kijiji, FB' },
          { unit: 'Unit 7A - 1BR', price: '$1,650/mo', views: '612 views', platforms: 'Revun, Kijiji' },
        ].map((l) => (
          <div key={l.unit} className="rounded-lg bg-brand-off-white px-3 py-2">
            <div className="flex items-center justify-between"><p className="text-[11px] font-medium text-foreground">{l.unit}</p><p className="text-[11px] font-bold text-brand-blue">{l.price}</p></div>
            <div className="flex items-center justify-between mt-1"><span className="text-[9px] text-muted-foreground">{l.platforms}</span><span className="text-[9px] text-muted-foreground">{l.views}</span></div>
          </div>
        ))}
      </div>
    </div>
  ),
  /* Step 4: Schedule showings */
  () => (
    <div className="mt-6 overflow-hidden rounded-xl border border-border bg-white p-4">
      <p className="text-xs font-semibold text-foreground mb-3">Upcoming Showings</p>
      <div className="space-y-2">
        {[
          { name: 'Emily R.', time: 'Today, 2:00 PM', unit: 'Unit 4B' },
          { name: 'David L.', time: 'Tomorrow, 10:30 AM', unit: 'Unit 7A' },
          { name: 'Maria S.', time: 'Tomorrow, 3:00 PM', unit: 'Unit 4B' },
        ].map((s) => (
          <div key={s.name} className="flex items-center justify-between rounded-lg bg-brand-off-white px-3 py-2">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-brand-blue/10 flex items-center justify-center text-[9px] font-bold text-brand-blue">{s.name[0]}</div>
              <div><p className="text-[11px] font-medium text-foreground">{s.name}</p><p className="text-[9px] text-muted-foreground">{s.unit}</p></div>
            </div>
            <span className="text-[10px] text-brand-blue font-medium">{s.time}</span>
          </div>
        ))}
      </div>
    </div>
  ),
  /* Step 5: Screen tenants */
  () => (
    <div className="mt-6 overflow-hidden rounded-xl border border-border bg-white p-4">
      <p className="text-xs font-semibold text-foreground mb-3">Applicant Comparison</p>
      <div className="space-y-2">
        {[
          { name: 'Emily R.', score: 94, credit: 'Excellent', income: '$78K', status: 'Recommended' },
          { name: 'David L.', score: 82, credit: 'Good', income: '$62K', status: 'Review' },
        ].map((a) => (
          <div key={a.name} className="rounded-lg bg-brand-off-white px-3 py-2">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-medium text-foreground">{a.name}</p>
              <span className={`text-[9px] font-bold ${a.status === 'Recommended' ? 'text-[#22C55E]' : 'text-[#F59E0B]'}`}>{a.status}</span>
            </div>
            <div className="flex gap-3 mt-1">
              <span className="text-[9px] text-muted-foreground">Score: <strong className="text-foreground">{a.score}/100</strong></span>
              <span className="text-[9px] text-muted-foreground">Credit: <strong className="text-foreground">{a.credit}</strong></span>
              <span className="text-[9px] text-muted-foreground">Income: <strong className="text-foreground">{a.income}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
  /* Step 6: Execute leases */
  () => (
    <div className="mt-6 overflow-hidden rounded-xl border border-border bg-white p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold text-foreground">Lease Agreement</p>
        <span className="rounded-full bg-[#22C55E]/10 px-2 py-0.5 text-[9px] font-bold text-[#22C55E]">Signed</span>
      </div>
      <div className="space-y-2">
        <div className="rounded-lg bg-brand-off-white px-3 py-2">
          <div className="flex justify-between"><span className="text-[10px] text-muted-foreground">Tenant</span><span className="text-[10px] font-medium text-foreground">Emily R.</span></div>
          <div className="flex justify-between mt-1"><span className="text-[10px] text-muted-foreground">Unit</span><span className="text-[10px] font-medium text-foreground">4B - 2BR, 245 King St W</span></div>
          <div className="flex justify-between mt-1"><span className="text-[10px] text-muted-foreground">Term</span><span className="text-[10px] font-medium text-foreground">12 months ($2,100/mo)</span></div>
          <div className="flex justify-between mt-1"><span className="text-[10px] text-muted-foreground">Template</span><span className="text-[10px] font-medium text-foreground">Ontario Standard Lease</span></div>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-[#22C55E]/5 px-3 py-2">
          <svg width="14" height="14" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8" fill="#22C55E" fillOpacity={0.15} /><path d="M5 8l2 2 4-4" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span className="text-[10px] text-[#22C55E] font-medium">Both parties signed electronically</span>
        </div>
      </div>
    </div>
  ),
  /* Step 7: Ongoing management */
  () => (
    <div className="mt-6 overflow-hidden rounded-xl border border-border bg-white p-4">
      <p className="text-xs font-semibold text-foreground mb-3">Monthly Snapshot</p>
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="rounded-lg bg-brand-off-white p-2 text-center"><p className="text-[10px] text-muted-foreground">Collected</p><p className="text-xs font-bold text-[#22C55E]">$8,450</p></div>
        <div className="rounded-lg bg-brand-off-white p-2 text-center"><p className="text-[10px] text-muted-foreground">Requests</p><p className="text-xs font-bold text-brand-blue">3</p></div>
        <div className="rounded-lg bg-brand-off-white p-2 text-center"><p className="text-[10px] text-muted-foreground">Occupancy</p><p className="text-xs font-bold text-[#22C55E]">96%</p></div>
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between rounded-md bg-brand-off-white px-3 py-1.5">
          <span className="text-[10px] text-foreground">Rent autopay</span><span className="text-[9px] font-semibold text-[#22C55E]">Active for 4/5 tenants</span>
        </div>
        <div className="flex items-center justify-between rounded-md bg-brand-off-white px-3 py-1.5">
          <span className="text-[10px] text-foreground">Next lease renewal</span><span className="text-[9px] text-muted-foreground">Unit 7A - Aug 2026</span>
        </div>
      </div>
    </div>
  ),
]

const timelineSteps = [
  {
    icon: UserPlus,
    title: 'Create your account',
    description:
      'Sign up in under two minutes. No credit card required to start. Choose your plan later once you have explored the platform.',
  },
  {
    icon: Building,
    title: 'Add your properties and units',
    description:
      'Enter your property address, unit details, amenities, and photos. Revun structures the data so every downstream workflow, from listings to leases, pulls from the same source of truth.',
  },
  {
    icon: Megaphone,
    title: 'Create and publish listings',
    description:
      'Build professional listings from your property data. Publish to Revun, Kijiji, Facebook Marketplace, and other platforms with one click. Edit once, update everywhere.',
  },
  {
    icon: CalendarCheck,
    title: 'Schedule and manage showings',
    description:
      'Prospective tenants book showings online based on your availability. Calendar sync prevents double-bookings. Automated reminders reduce no-shows.',
  },
  {
    icon: ShieldCheck,
    title: 'Screen and select tenants',
    description:
      'Run credit checks, identity verification, and background screening directly from the application. Compare applicants side by side and make informed decisions.',
  },
  {
    icon: FileSignature,
    title: 'Execute leases digitally',
    description:
      'Generate leases from jurisdiction-specific templates. Both parties sign electronically. Documents are stored securely and accessible anytime.',
  },
  {
    icon: Settings,
    title: 'Manage your rental ongoing',
    description:
      'Collect rent with auto-reminders, handle maintenance requests, store documents, track expenses, and communicate with tenants. Everything lives in one place.',
  },
]

/* ── Page ─────────────────────────────────────────────────────────────── */

export default function SelfManageHowItWorksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Self-Manage', url: 'https://revun.com/self-manage/' },
              { name: 'How It Works', url: 'https://revun.com/self-manage/how-it-works/' },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildHowToSchema({
              name: 'How to Self-Manage Your Rental Property with Revun',
              description:
                'A step-by-step guide to setting up and managing your rental property using the Revun platform. From account creation to ongoing management.',
              steps: timelineSteps.map((step) => ({
                name: step.title,
                text: step.description,
              })),
            })
          ),
        }}
      />
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="bg-white">
        <motion.div
          className="mx-auto max-w-3xl px-6 pt-28 pb-16 text-center"
          variants={heroStagger}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 text-sm font-medium uppercase tracking-widest text-brand-blue"
          >
            How it works
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display font-extrabold text-4xl leading-[1.1] tracking-tight text-foreground md:text-5xl"
          >
            From signup to{' '}
            <span className="text-brand-blue">fully managed</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
          >
            From account creation to ongoing management, here is the full walkthrough.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Timeline ──────────────────────────────────────────────── */}
      <section className="bg-brand-off-white py-12">
        <div className="mx-auto max-w-3xl px-6">
          <RevealOnScroll className="mb-10 text-center">
            <motion.p
              variants={revealItem}
              className="mb-3 text-sm font-medium uppercase tracking-widest text-brand-blue"
            >
              Step by step
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Your complete{' '}
              <span className="text-brand-blue">walkthrough</span>
            </motion.h2>
          </RevealOnScroll>

          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-6 top-0 bottom-0 w-px bg-border md:left-8"
              aria-hidden
            />

            {timelineSteps.map((step, i) => {
              const Icon = step.icon
              return (
                <RevealOnScroll key={step.title} className="relative mb-16 last:mb-0">
                  <motion.div
                    variants={revealItem}
                    className="flex gap-6 md:gap-8"
                  >
                    {/* Icon circle */}
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-brand-blue/20 bg-brand-blue/10 text-brand-blue md:h-16 md:w-16">
                      <Icon className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.8} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-brand-blue">
                        Step {i + 1}
                      </span>
                      <h3 className="font-heading text-xl font-bold text-foreground md:text-2xl">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-[0.938rem] leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>

                      {/* Step illustration */}
                      {stepIllustrations[i] ? stepIllustrations[i]() : null}
                    </div>
                  </motion.div>
                </RevealOnScroll>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────────────── */}
      <section className="bg-white py-12">
        <RevealOnScroll className="mx-auto max-w-2xl px-6 text-center">
          <motion.h2
            variants={revealItem}
            className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Ready to get{' '}
            <span className="text-brand-blue">started?</span>
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mt-4 text-lg leading-relaxed text-muted-foreground"
          >
            Set up your first property in minutes. No credit card required.
          </motion.p>
          <motion.div
            variants={revealItem}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/pricing/"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-blue px-8 text-base font-semibold text-white transition-colors hover:bg-brand-blue-dark"
            >
              Start for $1/day
            </Link>
            <Link
              href="/self-manage/"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-border px-8 text-base font-semibold text-foreground transition-colors hover:bg-muted"
            >
              Back to Self-Manage
            </Link>
          </motion.div>
        </RevealOnScroll>
      </section>
    </>
  )
}
