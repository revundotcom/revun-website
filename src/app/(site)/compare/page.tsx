'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, X, Minus } from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import { heroStagger, fadeUp } from '@/lib/motion'
import { sanitizeJsonLd } from '@/lib/utils'

const HERO_STATS = [
  { stat: '65+', label: 'Tools Revun replaces' },
  { stat: '10/10', label: 'Canadian provinces covered' },
  { stat: 'One', label: 'Platform, end to end' },
]

const WHY_SWITCH = [
  {
    n: '01',
    title: 'Canadian-first, not an afterthought',
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

const REPLACES_CATEGORIES = [
  {
    name: 'PM Software',
    summary: 'US-centric platforms missing Canadian compliance and multi-channel comms.',
    competitors: 'AppFolio, Buildium, DoorLoop, Yardi, Entrata, MRI Software, Propertyware, Rent Manager, Guesty, TenantCloud',
    more: '+8 more',
  },
  {
    name: 'Canadian Platforms',
    summary: 'Tenant-first or payment-only tools — not full operating systems.',
    competitors: 'SingleKey, liv.rent, Rhenti, FrontLobby, RentMoola, Openroom, Zumper, PadMapper, Rent Panda',
  },
  {
    name: 'Brokerage / CRM',
    summary: 'Sales-focused CRMs with no property operations layer underneath.',
    competitors: 'Dotloop, SkySlope, Top Producer, BoomTown, Real Geeks, CINC, LionDesk, Follow Up Boss, BrokerMint, TransactionDesk',
    more: '+1 more',
  },
  {
    name: 'Maintenance',
    summary: 'Stand-alone field service apps disconnected from leases, units, and owners.',
    competitors: 'ServiceTitan, Jobber, Housecall Pro, UpKeep, MaintainX, Property Meld, Building Engines, HappyCo, FieldPulse, AppWork',
  },
  {
    name: 'Communications',
    summary: 'Generic phone and messaging bolt-ons with no property context.',
    competitors: 'RingCentral, Zoom Phone, Dialpad, Aircall, OpenPhone, Intercom, Zendesk, Freshdesk',
  },
  {
    name: 'Screening',
    summary: 'Credit-check-only tools that sit outside your leasing pipeline.',
    competitors: 'TransUnion SmartMove, Persona, Trustii, Rhino, Jetty, LeaseLock, TheGuarantors, Insurent, Sure',
  },
]

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
      'Yes. Revun connects to Canadian banks for rent collection, Interac, and vendor payouts, and exports to QuickBooks, Xero, and Sage for accounting continuity. Your finance team keeps the GL they know while you replace the operational stack.',
  },
  {
    question: 'How long does migration from my current tool take?',
    answer:
      'Most small portfolios go live in 7-14 days; mid-market operators typically complete migration in 3-6 weeks. A dedicated onboarding lead handles data mapping, historical ledger import, and parallel testing so rent cycles never miss a beat.',
  },
  {
    question: 'Does Revun support Canadian provincial compliance?',
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
      'Every customer gets a named onboarding lead, live training for your team, a migration playbook, and on-demand support through launch. Self-serve plans include video walkthroughs, a help center, and chat support with Canadian-hours coverage.',
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

        <div className="relative mx-auto max-w-6xl px-6">
          <motion.div variants={fadeUp} className="flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-[#F5F6F8] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#176FEB]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#176FEB]" />
              Comparisons
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-display mt-6 text-center text-4xl font-semibold leading-[1.05] tracking-tight text-[#0A1628] sm:text-5xl md:text-6xl lg:text-7xl"
          >
            The last property software
            <br className="hidden sm:block" />{' '}
            <span className="text-[#176FEB]">you&apos;ll ever buy.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-3xl text-center text-base leading-relaxed text-[#555860] sm:text-lg md:text-xl"
          >
            Canadian operators stitch together US-first platforms, narrow point solutions,
            and legacy niche tools to run one portfolio. Revun replaces the entire stack
            with a single operating system built for Canada.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mx-auto mt-14 grid max-w-4xl grid-cols-1 divide-y divide-[#E5E7EB] overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white sm:grid-cols-3 sm:divide-y-0 sm:divide-x"
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
      <section className="relative bg-[#F5F6F8] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
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
              Different tools, same complaints. These are the reasons Canadian
              property teams consolidate onto one platform.
            </motion.p>
          </RevealOnScroll>

          <RevealOnScroll className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[#E5E7EB] bg-[#E5E7EB] md:mt-20 md:grid-cols-2 lg:grid-cols-4">
            {WHY_SWITCH.map((r) => (
              <motion.div
                key={r.n}
                variants={revealItem}
                className="relative bg-white p-8 md:p-10"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-sm font-semibold tracking-[0.2em] text-[#176FEB]">
                    {r.n}
                  </span>
                  <span className="h-px flex-1 bg-[#E5E7EB]" />
                </div>
                <h3 className="font-heading mt-6 text-xl font-semibold leading-snug text-[#0A1628]">
                  {r.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-[#555860]">
                  {r.body}
                </p>
              </motion.div>
            ))}
          </RevealOnScroll>
        </div>
      </section>

      {/* ============ WHAT REVUN REPLACES ============ */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll>
            <motion.div variants={revealItem} className="max-w-3xl">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.18em] text-[#176FEB]">
                What Revun replaces
              </span>
              <h2 className="mt-4 text-3xl font-semibold leading-[1.05] tracking-tight text-[#0A1628] md:text-5xl">
                One platform. Every tool your operation runs on.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[#555860] md:text-lg">
                Most Canadian operators stitch together 5&ndash;8 tools to run leasing, payments,
                maintenance, and comms. Revun consolidates 60+ of them into one property operations
                platform &mdash; built Canadian-first.
              </p>
            </motion.div>

            <motion.div variants={revealItem} className="mt-12 h-px w-full bg-[#E5E7EB]" />

            {REPLACES_CATEGORIES.map((cat) => (
              <motion.div
                key={cat.name}
                variants={revealItem}
                className="grid grid-cols-1 gap-3 border-b border-[#E5E7EB] py-7 md:grid-cols-[220px_1fr] md:gap-10"
              >
                <div className="text-lg font-semibold text-[#176FEB] md:text-xl">
                  {cat.name}
                </div>
                <div>
                  <p className="text-sm font-medium leading-snug text-[#0A1628] md:text-base">
                    {cat.summary}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[#555860]">
                    {cat.competitors}
                    {cat.more && <span className="text-[#8A8F98]"> {cat.more}</span>}
                  </p>
                </div>
              </motion.div>
            ))}

            <motion.div
              variants={revealItem}
              className="mt-10 flex flex-wrap items-baseline gap-x-3 gap-y-1"
            >
              <span className="text-3xl font-semibold text-[#0A1628] md:text-4xl">65+ tools.</span>
              <span className="text-lg text-[#555860] md:text-xl">One Revun.</span>
            </motion.div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ============ FEATURE SHOWDOWN MATRIX ============ */}
      <section className="relative overflow-hidden bg-[#F5F6F8] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-block rounded-full border border-[#176FEB]/20 bg-[#E8F2FE] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#176FEB]">
                Feature showdown
              </span>
              <h2 className="mt-5 text-4xl font-semibold tracking-tight text-[#0A1628] sm:text-5xl">
                One platform vs. <span className="text-[#176FEB]">everyone else</span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-[#555860]">
                Most Canadian operators stitch together a US PM suite, a point
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

      {/* ============ FAQ ============ */}
      <section className="relative bg-white py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6">
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
      <section className="relative overflow-hidden bg-[#0A1628] py-24 md:py-32">
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

        <div className="relative mx-auto max-w-3xl px-6 text-center">
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
              Replace 5-8 disconnected tools with one Canadian-built platform.
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
