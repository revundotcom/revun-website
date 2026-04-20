'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ListTodo, CheckCircle2, Clock, AlertTriangle, ArrowRight, Zap, Bell, Shield, Users } from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

export function InternalOpsTeamsSections() {
  const openTasks = [
    { title: 'Vendor insurance expired', owner: 'GC', sla: 'SLA 12h', tone: 'warn' as const },
    { title: 'Lease compliance review', owner: 'AK', sla: 'SLA 1h', tone: 'warn' as const },
  ]

  const inProgressTasks = [
    { title: 'Renewal offer draft', owner: 'JM', sla: 'SLA 4h' },
    { title: 'Move-out inspection backlog', owner: 'RL', sla: 'SLA 6h' },
    { title: 'Unit inspection Tues', owner: 'SM', sla: 'SLA 2d' },
  ]

  const resolvedTasks = [
    { title: 'HVAC work order #3481', owner: 'TM', sla: 'Closed 2h' },
    { title: 'Tenant welcome packet', owner: 'JM', sla: 'Closed 1d' },
  ]

  const metricRow = [
    { label: 'SLA met', value: '96.4%' },
    { label: 'Avg close time', value: '4.2h' },
    { label: 'Weekly task leakage', value: '0 (was 12)' },
  ]

  const rules = [
    {
      when: 'When lease is 60 days from renewal',
      then: 'Create task for leasing lead',
      icon: Clock,
    },
    {
      when: 'When vendor insurance expires in 7 days',
      then: 'Block new work orders + alert ops',
      icon: Shield,
    },
    {
      when: 'When maintenance request exits New for >4h',
      then: 'Escalate to Ops Manager',
      icon: Bell,
    },
  ]

  return (
    <>
      {/* ============================================================ */}
      {/* SECTION 1 — Tasks that actually get closed                   */}
      {/* ============================================================ */}
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll>
            <motion.div variants={revealItem} className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#176FEB]">
                Task Visibility
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#0A1628] md:text-4xl">
                Every task has an{' '}
                <span className="italic text-[#176FEB]">owner, an SLA, and an audit trail</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[#475569] md:text-lg">
                No more work dying in Slack threads or getting lost between spreadsheets. Every request
                routes to a named owner with a clock, so nothing slips through the operational cracks.
              </p>
            </motion.div>

            {/* Task board card */}
            <motion.div
              variants={revealItem}
              className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_1px_2px_rgba(10,22,40,0.04),0_8px_24px_-12px_rgba(10,22,40,0.10)]"
            >
              {/* Card header */}
              <div className="flex items-center justify-between border-b border-[#E5E7EB] bg-[#F5F6F8] px-6 py-3">
                <div className="flex items-center gap-2">
                  <ListTodo className="h-4 w-4 text-[#64748B]" strokeWidth={1.75} />
                  <span className="text-sm font-medium text-[#0A1628]">Operations</span>
                  <span className="text-sm text-[#64748B]">· Today</span>
                </div>
                <span className="text-xs font-medium text-[#64748B]">Live</span>
              </div>

              {/* Three columns */}
              <div className="grid grid-cols-1 divide-y divide-[#E5E7EB] md:grid-cols-3 md:divide-x md:divide-y-0">
                {/* Open */}
                <div className="p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-[#F59E0B]" strokeWidth={1.75} />
                      <h3 className="text-sm font-semibold tracking-tight text-[#0A1628]">Open</h3>
                    </div>
                    <span className="rounded-full bg-[#F5F6F8] px-2 py-0.5 text-xs font-medium text-[#475569]">
                      {openTasks.length}
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {openTasks.map((t) => (
                      <li
                        key={t.title}
                        className="rounded-lg border border-[#E5E7EB] bg-white p-3"
                      >
                        <p className="text-sm font-medium leading-snug text-[#0A1628]">{t.title}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#F5F6F8] text-[10px] font-semibold text-[#475569]">
                            {t.owner}
                          </span>
                          <span className="rounded-md bg-[#FEF3C7] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#F59E0B]">
                            {t.sla}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* In progress */}
                <div className="p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-[#176FEB]" strokeWidth={1.75} />
                      <h3 className="text-sm font-semibold tracking-tight text-[#0A1628]">In progress</h3>
                    </div>
                    <span className="rounded-full bg-[#F5F6F8] px-2 py-0.5 text-xs font-medium text-[#475569]">
                      {inProgressTasks.length}
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {inProgressTasks.map((t) => (
                      <li
                        key={t.title}
                        className="rounded-lg border border-[#E5E7EB] bg-white p-3"
                      >
                        <p className="text-sm font-medium leading-snug text-[#0A1628]">{t.title}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#F5F6F8] text-[10px] font-semibold text-[#475569]">
                            {t.owner}
                          </span>
                          <span className="rounded-md bg-[#EFF6FF] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#176FEB]">
                            {t.sla}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Resolved */}
                <div className="p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#047857]" strokeWidth={1.75} />
                      <h3 className="text-sm font-semibold tracking-tight text-[#0A1628]">Resolved</h3>
                    </div>
                    <span className="rounded-full bg-[#F5F6F8] px-2 py-0.5 text-xs font-medium text-[#475569]">
                      {resolvedTasks.length}
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {resolvedTasks.map((t) => (
                      <li
                        key={t.title}
                        className="rounded-lg border border-[#E5E7EB] bg-white p-3"
                      >
                        <p className="text-sm font-medium leading-snug text-[#0A1628]">{t.title}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#F5F6F8] text-[10px] font-semibold text-[#475569]">
                            {t.owner}
                          </span>
                          <span className="rounded-md bg-[#ECFDF5] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#047857]">
                            {t.sla}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Metric row */}
            <motion.div
              variants={revealItem}
              className="mx-auto mt-8 max-w-5xl"
            >
              <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-[#E5E7EB] bg-[#E5E7EB] sm:grid-cols-3">
                {metricRow.map((m) => (
                  <div key={m.label} className="bg-white px-6 py-5 text-center sm:text-left">
                    <p className="text-xs font-medium uppercase tracking-wider text-[#64748B]">
                      {m.label}
                    </p>
                    <p className="mt-1.5 text-xl font-semibold tracking-tight text-[#0A1628]">
                      {m.value}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — Automation that your team actually uses          */}
      {/* ============================================================ */}
      <section className="bg-[#F5F6F8] py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left — content */}
            <RevealOnScroll>
              <motion.div variants={revealItem}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#176FEB]">
                  Workflow Automation
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#0A1628] md:text-4xl">
                  Turn repetitive ops into{' '}
                  <span className="italic text-[#176FEB]">rules that run themselves</span>
                </h2>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-[#475569]">
                  Build simple WHEN/THEN rules around renewals, compliance, and maintenance so the
                  busywork doesn&apos;t land on your ops manager&apos;s desk every morning.
                </p>
              </motion.div>

              <motion.div variants={revealItem} className="mt-8 space-y-4">
                {rules.map((r) => {
                  const Icon = r.icon
                  return (
                    <div
                      key={r.when}
                      className="overflow-hidden rounded-xl border border-[#E5E7EB] bg-white"
                    >
                      <div className="flex items-start gap-3 border-b border-[#E5E7EB] bg-[#F5F6F8] px-4 py-3">
                        <span className="mt-0.5 rounded-md bg-white px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#64748B] ring-1 ring-[#E5E7EB]">
                          When
                        </span>
                        <p className="text-sm leading-snug text-[#475569]">{r.when}</p>
                      </div>
                      <div className="flex items-start gap-3 px-4 py-3">
                        <span className="mt-0.5 rounded-md bg-[#EFF6FF] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#176FEB]">
                          Then
                        </span>
                        <div className="flex flex-1 items-start gap-2">
                          <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#176FEB]" strokeWidth={1.75} />
                          <p className="text-sm font-medium leading-snug text-[#0A1628]">
                            {r.then}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </motion.div>

              <motion.div variants={revealItem} className="mt-6 flex items-center gap-2 text-sm text-[#475569]">
                <Users className="h-4 w-4 text-[#64748B]" strokeWidth={1.75} />
                <span>Built by ops, for ops — no developer required.</span>
                <ArrowRight className="h-4 w-4 text-[#176FEB]" strokeWidth={1.75} />
              </motion.div>
            </RevealOnScroll>

            {/* Right — image */}
            <RevealOnScroll>
              <motion.div variants={revealItem} className="relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_1px_2px_rgba(10,22,40,0.04),0_12px_32px_-16px_rgba(10,22,40,0.18)]">
                  <Image
                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=85"
                    alt="Operations team reviewing a task board and workflow automation dashboard"
                    fill
                    sizes="(min-width: 1024px) 560px, 100vw"
                    className="object-cover"
                  />
                </div>

                {/* Floating card */}
                <div className="absolute -bottom-5 right-4 flex items-center gap-3 rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 shadow-[0_8px_24px_-12px_rgba(10,22,40,0.20)] sm:right-6">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EFF6FF]">
                    <Zap className="h-4 w-4 text-[#176FEB]" strokeWidth={2} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold tracking-tight text-[#0A1628]">
                      1,800 automation runs
                    </p>
                    <p className="text-xs text-[#64748B]">per month</p>
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
