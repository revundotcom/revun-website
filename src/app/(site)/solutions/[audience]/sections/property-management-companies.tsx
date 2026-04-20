'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { CheckCircle2, Minus, Lock, Shield, Clock, Database, Users, Zap } from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

type Permission = 'allow' | 'deny' | 'lock'

const roles = ['Owner', 'Property Manager', 'Leasing Agent', 'Maintenance Coordinator'] as const

const capabilities: { label: string; values: [Permission, Permission, Permission, Permission] }[] = [
  { label: 'View rent roll', values: ['allow', 'allow', 'deny', 'deny'] },
  { label: 'Approve vendors', values: ['allow', 'allow', 'deny', 'allow'] },
  { label: 'Sign leases', values: ['allow', 'allow', 'allow', 'deny'] },
  { label: 'Access owner statements', values: ['allow', 'allow', 'lock', 'lock'] },
  { label: 'Run screening', values: ['deny', 'allow', 'allow', 'deny'] },
  { label: 'See payroll', values: ['allow', 'lock', 'lock', 'lock'] },
]

function PermissionCell({ value }: { value: Permission }) {
  if (value === 'allow') {
    return (
      <div className="flex items-center justify-center">
        <CheckCircle2 className="h-5 w-5 text-[#047857]" strokeWidth={2} />
      </div>
    )
  }
  if (value === 'deny') {
    return (
      <div className="flex items-center justify-center">
        <Minus className="h-5 w-5 text-[#64748B]" strokeWidth={2} />
      </div>
    )
  }
  return (
    <div className="flex items-center justify-center">
      <Lock className="h-4 w-4 text-[#64748B]" strokeWidth={2} />
    </div>
  )
}

const phases = [
  {
    number: '01',
    window: 'Days 1–30',
    name: 'Assess',
    bullets: [
      'Full portfolio audit across units, owners, and vendors',
      'Data mapping from Buildium, AppFolio, or Yardi Breeze',
      'Role and permission blueprint signed off by COO',
      'Migration runbook with rollback checkpoints',
    ],
  },
  {
    number: '02',
    window: 'Days 31–60',
    name: 'Migrate',
    bullets: [
      'Historical leases, ledgers, and owner statements imported',
      'Parallel run alongside your legacy system',
      'Team-by-team training with recorded playbooks',
      'Reconciliation reports validated by accounting',
    ],
  },
  {
    number: '03',
    window: 'Days 61–90',
    name: 'Go Live',
    bullets: [
      'Cutover weekend with dedicated migration engineer',
      'Legacy tools decommissioned on your schedule',
      '30-day hypercare with named success manager',
      'Quarterly business review cadence established',
    ],
  },
]

const aggregateStats = [
  { icon: Users, value: '4', label: 'Role archetypes', sub: 'Owner, PM, Leasing, Maintenance' },
  { icon: Zap, value: '24', label: 'Granular permissions', sub: 'Scoped per property group' },
  { icon: Database, value: '100%', label: 'Actions audit-logged', sub: 'Immutable, exportable trail' },
]

export function PropertyManagementCompaniesSections() {
  return (
    <>
      {/* SECTION 1 — Team roles, permissions, and visibility */}
      <section className="relative bg-white py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll className="mb-14 max-w-3xl">
            <motion.p
              variants={revealItem}
              className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#176FEB]"
            >
              Built for teams
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="text-3xl font-semibold leading-tight tracking-tight text-[#0A1628] md:text-4xl"
            >
              Every role sees exactly what they need
            </motion.h2>
            <motion.p
              variants={revealItem}
              className="mt-4 text-base leading-relaxed text-[#475569] md:text-lg"
            >
              Permissions aren&rsquo;t a checkbox exercise. Revun enforces role boundaries at the system
              level, so a leasing agent can&rsquo;t stumble into payroll and a maintenance coordinator
              can&rsquo;t touch owner statements — regardless of which screen they land on.
            </motion.p>
          </RevealOnScroll>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Role matrix card */}
            <RevealOnScroll className="lg:col-span-2">
              <motion.div
                variants={revealItem}
                className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm"
              >
                {/* Card header with secondary image */}
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85"
                    alt="Property management analytics dashboard showing portfolio KPIs"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 640px, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/85 via-[#0A1628]/70 to-[#176FEB]/60" />
                  <div className="absolute inset-0 flex items-end p-6">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
                        Role matrix
                      </p>
                      <p className="mt-1 text-lg font-semibold text-white">
                        Portfolio-wide permission controls
                      </p>
                    </div>
                  </div>
                </div>

                {/* Matrix grid */}
                <div className="p-6 md:p-8">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px] border-collapse">
                      <thead>
                        <tr>
                          <th className="pb-4 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                            Capability
                          </th>
                          {roles.map((role) => (
                            <th
                              key={role}
                              className="pb-4 text-center text-xs font-semibold uppercase tracking-wider text-[#0A1628]"
                            >
                              {role}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {capabilities.map((cap, i) => (
                          <tr
                            key={cap.label}
                            className={i % 2 === 0 ? 'bg-[#F5F6F8]' : 'bg-white'}
                          >
                            <td className="rounded-l-md py-3 pl-4 pr-4 text-sm font-medium text-[#0A1628]">
                              {cap.label}
                            </td>
                            {cap.values.map((v, idx) => (
                              <td
                                key={idx}
                                className={
                                  idx === cap.values.length - 1
                                    ? 'rounded-r-md py-3'
                                    : 'py-3'
                                }
                              >
                                <PermissionCell value={v} />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Legend */}
                  <div className="mt-6 flex flex-wrap items-center gap-5 border-t border-[#E5E7EB] pt-5 text-xs text-[#475569]">
                    <span className="inline-flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#047857]" />
                      Allowed
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Minus className="h-4 w-4 text-[#64748B]" />
                      Not applicable
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Lock className="h-4 w-4 text-[#64748B]" />
                      Restricted
                    </span>
                  </div>
                </div>
              </motion.div>
            </RevealOnScroll>

            {/* Stat rail */}
            <RevealOnScroll className="lg:col-span-1">
              <div className="flex h-full flex-col gap-4">
                {aggregateStats.map((s) => {
                  const Icon = s.icon
                  return (
                    <motion.div
                      key={s.label}
                      variants={revealItem}
                      className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm"
                    >
                      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#176FEB]/10">
                        <Icon className="h-5 w-5 text-[#176FEB]" />
                      </div>
                      <div className="text-3xl font-semibold tracking-tight text-[#0A1628]">
                        {s.value}
                      </div>
                      <div className="mt-1 text-sm font-medium text-[#0A1628]">{s.label}</div>
                      <div className="mt-1 text-xs text-[#64748B]">{s.sub}</div>
                    </motion.div>
                  )
                })}
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Migration that doesn't stall your operation */}
      <section className="relative bg-[#F5F6F8] py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll className="mb-14 max-w-3xl">
            <motion.p
              variants={revealItem}
              className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#176FEB]"
            >
              90-day migration
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="text-3xl font-semibold leading-tight tracking-tight text-[#0A1628] md:text-4xl"
            >
              Migration that doesn&rsquo;t stall your operation
            </motion.h2>
            <motion.p
              variants={revealItem}
              className="mt-4 text-base leading-relaxed text-[#475569] md:text-lg"
            >
              Ripping out Buildium, AppFolio, or Yardi Breeze shouldn&rsquo;t cost you a quarter of lost
              productivity. We move portfolios of 50 to 5,000+ units on a predictable 30/60/90
              cadence — with a parallel run so your team never flies blind.
            </motion.p>
          </RevealOnScroll>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Timeline card spans 2/3 */}
            <RevealOnScroll className="lg:col-span-2">
              <motion.div
                variants={revealItem}
                className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm md:p-8"
              >
                <div className="mb-8 flex items-center gap-3">
                  <Clock className="h-5 w-5 text-[#176FEB]" />
                  <p className="text-sm font-semibold text-[#0A1628]">
                    Typical enterprise timeline
                  </p>
                </div>

                {/* Timeline line indicator */}
                <div className="relative mb-6 hidden md:block">
                  <div className="absolute left-0 right-0 top-5 h-px bg-gradient-to-r from-[#176FEB]/30 via-[#176FEB]/60 to-[#176FEB]/30" />
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                  {phases.map((phase) => (
                    <div key={phase.number} className="relative">
                      <div className="relative z-10 mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#176FEB] to-[#0A52C9] text-sm font-semibold text-white shadow-md shadow-[#176FEB]/20">
                        {phase.number}
                      </div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#176FEB]">
                        {phase.window}
                      </p>
                      <h3 className="mt-1 text-lg font-semibold text-[#0A1628]">{phase.name}</h3>
                      <ul className="mt-4 space-y-2.5">
                        {phase.bullets.map((b) => (
                          <li key={b} className="flex gap-2 text-sm leading-relaxed text-[#475569]">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#047857]" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            </RevealOnScroll>

            {/* Image side panel */}
            <RevealOnScroll className="lg:col-span-1">
              <motion.div
                variants={revealItem}
                className="relative h-full min-h-[320px] overflow-hidden rounded-2xl border border-[#E5E7EB] shadow-sm"
              >
                <Image
                  src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=1200&q=85"
                  alt="Property management team onboarding a new operations platform"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 400px, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-[#0A1628]/20 to-transparent" />

                {/* Overlay card */}
                <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/20 bg-white/95 p-5 backdrop-blur-sm">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#047857]/10">
                      <Shield className="h-5 w-5 text-[#047857]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#0A1628]">
                        Zero disruption. Zero data loss.
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-[#475569]">
                        Parallel-run cutover with reconciled ledgers before legacy shutdown.
                      </p>
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
