'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus, Shield, ShieldCheck, Database, Lock, Building2 } from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

export function ReitsSections() {
  const kpis = [
    {
      label: 'Occupancy',
      value: '94.2%',
      trend: '+1.1',
      trendDir: 'up' as const,
      note: 'vs. prior quarter',
    },
    {
      label: 'Net effective rent',
      value: '$2,184',
      unit: '/unit',
      trend: '+$47',
      trendDir: 'up' as const,
      note: 'YoY',
    },
    {
      label: 'Maintenance spend',
      value: '$0.62',
      unit: '/sqft',
      trend: '-$0.08',
      trendDir: 'down' as const,
      note: 'YoY',
    },
    {
      label: 'Collections',
      value: '98.9%',
      trend: 'Stable',
      trendDir: 'flat' as const,
      note: 'trailing 12 mo.',
    },
  ]

  const regions = [
    { name: 'West Coast', properties: '12 properties', aum: '$340M AUM' },
    { name: 'Central', properties: '18 properties', aum: '$485M AUM' },
    { name: 'East Coast', properties: '22 properties', aum: '$612M AUM' },
  ]

  const governanceBullets = [
    { icon: ShieldCheck, text: 'SOC 2 Type II audited annually' },
    { icon: Lock, text: 'ISO 27001 certified' },
    { icon: Database, text: 'Role-based permissions enforced across every entity' },
    { icon: Shield, text: 'Every action captured in an immutable audit log' },
  ]

  const complianceChips = ['SOC 2', 'ISO 27001', 'GDPR-ready', 'CCPA-ready']

  return (
    <>
      {/* ============================================================= */}
      {/* SECTION 1 — PORTFOLIO COMMAND                                    */}
      {/* ============================================================= */}
      <section className="relative overflow-hidden bg-white py-20 md:py-24">
        {/* Subtle background image — very low opacity, institutional feel */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.035]">
          <Image
            src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=1200&q=85"
            alt="High-rise multi-family residential towers viewed from below"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        <div className="relative mx-auto max-w-6xl px-6">
          <RevealOnScroll>
            <motion.div variants={revealItem} className="mb-12 max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-[#F5F6F8] px-3 py-1">
                <Building2 className="h-3.5 w-3.5 text-[#176FEB]" />
                <span className="text-xs font-medium uppercase tracking-[0.12em] text-[#475569]">
                  Portfolio Command
                </span>
              </div>
              <h2 className="text-3xl font-semibold tracking-tight text-[#0A1628] md:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
                See every property, every entity,{' '}
                <span className="italic text-[#176FEB]">every variance</span> — in real time
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[#475569] md:text-lg">
                Institutional-grade consolidation across funds, SPEs and operating entities.
                One consistent data model. One reconciled source of truth. No quarterly fire drills.
              </p>
            </motion.div>

            {/* Editorial command card */}
            <motion.div
              variants={revealItem}
              className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_1px_2px_rgba(10,22,40,0.04),0_8px_24px_-12px_rgba(10,22,40,0.08)]"
            >
              {/* Header bar */}
              <div className="flex items-center justify-between border-b border-[#E5E7EB] bg-[#F5F6F8] px-6 py-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#047857]" />
                  <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#475569]">
                    Portfolio · All Entities · Live
                  </span>
                </div>
                <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#64748B]">
                  As of 09:42 ET
                </span>
              </div>

              {/* KPI strip */}
              <div className="grid grid-cols-1 divide-y divide-[#E5E7EB] md:grid-cols-4 md:divide-x md:divide-y-0">
                {kpis.map((kpi) => {
                  const TrendIcon =
                    kpi.trendDir === 'up'
                      ? TrendingUp
                      : kpi.trendDir === 'down'
                        ? TrendingDown
                        : Minus
                  // Maintenance spend down is GOOD → green. Collections stable → muted.
                  const trendColor =
                    kpi.trendDir === 'flat' ? 'text-[#64748B]' : 'text-[#047857]'

                  return (
                    <div key={kpi.label} className="px-6 py-7">
                      <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#64748B]">
                        {kpi.label}
                      </div>
                      <div className="mt-3 flex items-baseline gap-1">
                        <span className="text-3xl font-semibold tracking-tight text-[#0A1628]">
                          {kpi.value}
                        </span>
                        {kpi.unit && (
                          <span className="text-sm font-medium text-[#64748B]">{kpi.unit}</span>
                        )}
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-medium ${trendColor}`}
                        >
                          <TrendIcon className="h-3.5 w-3.5" />
                          {kpi.trend}
                        </span>
                        <span className="text-xs text-[#64748B]">{kpi.note}</span>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* By Region */}
              <div className="border-t border-[#E5E7EB] bg-[#F5F6F8] px-6 py-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#475569]">
                    By Region
                  </span>
                  <span className="text-[11px] text-[#64748B]">52 properties · $1.44B AUM</span>
                </div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  {regions.map((region) => (
                    <div
                      key={region.name}
                      className="rounded-lg border border-[#E5E7EB] bg-white px-4 py-3.5"
                    >
                      <div className="text-sm font-semibold text-[#0A1628]">{region.name}</div>
                      <div className="mt-1 text-xs text-[#475569]">
                        {region.properties} · <span className="text-[#0A1628]">{region.aum}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.p
              variants={revealItem}
              className="mx-auto mt-6 max-w-3xl text-center text-sm text-[#64748B]"
            >
              Every figure above is reconciled to the entity ledger — no exports, no midnight macros,
              no parallel spreadsheets.
            </motion.p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ============================================================= */}
      {/* SECTION 2 — INSTITUTIONAL GOVERNANCE                            */}
      {/* ============================================================= */}
      <section className="bg-[#F5F6F8] py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* LEFT — content */}
            <RevealOnScroll>
              <motion.div variants={revealItem}>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-3 py-1">
                  <Lock className="h-3.5 w-3.5 text-[#176FEB]" />
                  <span className="text-xs font-medium uppercase tracking-[0.12em] text-[#475569]">
                    Enterprise Governance
                  </span>
                </div>
                <h2 className="text-3xl font-semibold tracking-tight text-[#0A1628] md:text-4xl lg:text-[2.5rem] lg:leading-[1.15]">
                  SOC 2 Type II, ISO 27001,{' '}
                  <span className="italic text-[#176FEB]">your auditors will thank you</span>
                </h2>
                <p className="mt-5 text-base leading-relaxed text-[#475569] md:text-lg">
                  Controls designed for multi-entity operators. Evidence generated automatically.
                  Access enforced by policy, not by goodwill.
                </p>
              </motion.div>

              <motion.ul variants={revealItem} className="mt-8 space-y-4">
                {governanceBullets.map((bullet) => {
                  const Icon = bullet.icon
                  return (
                    <li key={bullet.text} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white ring-1 ring-[#E5E7EB]">
                        <Icon className="h-3.5 w-3.5 text-[#176FEB]" />
                      </span>
                      <span className="text-[15px] leading-relaxed text-[#0A1628]">
                        {bullet.text}
                      </span>
                    </li>
                  )
                })}
              </motion.ul>

              {/* Compliance chips */}
              <motion.div variants={revealItem} className="mt-8 flex flex-wrap gap-2.5">
                {complianceChips.map((chip) => (
                  <span
                    key={chip}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-white px-3 py-1.5 text-xs font-medium text-[#0A1628]"
                  >
                    <ShieldCheck className="h-3.5 w-3.5 text-[#047857]" />
                    {chip}
                  </span>
                ))}
              </motion.div>
            </RevealOnScroll>

            {/* RIGHT — image */}
            <RevealOnScroll>
              <motion.div variants={revealItem} className="relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_1px_2px_rgba(10,22,40,0.04),0_16px_40px_-20px_rgba(10,22,40,0.2)] sm:aspect-[5/4] lg:aspect-[4/5]">
                  <Image
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=85"
                    alt="Executive team reviewing institutional portfolio metrics in a boardroom"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {/* Gentle gradient for legibility of floating card */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0A1628]/40 to-transparent" />
                </div>

                {/* Floating card */}
                <div className="absolute bottom-5 left-5 max-w-[260px] rounded-xl border border-[#E5E7EB] bg-white/95 px-4 py-3 shadow-[0_8px_28px_-8px_rgba(10,22,40,0.25)] backdrop-blur">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F5F6F8] ring-1 ring-[#E5E7EB]">
                      <Shield className="h-4 w-4 text-[#176FEB]" />
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-[#0A1628]">
                        99.99% uptime SLA
                      </div>
                      <div className="mt-0.5 text-xs text-[#475569]">
                        24/7 enterprise support
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </>
  )
}
