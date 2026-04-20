'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, ScanLine, Landmark, BadgeCheck, CheckCircle2, Clock, TrendingUp, Users, FileText } from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

export function LeasingCompaniesSections() {
  const funnelStages = [
    {
      number: '01',
      name: 'Inquiry',
      metric: '1,240 leads',
      benefit: 'Captured from every source, deduped automatically.',
      icon: Users,
    },
    {
      number: '02',
      name: 'Application',
      metric: '820 applications',
      benefit: 'Single online form, mobile-friendly, auto-saved.',
      icon: FileText,
    },
    {
      number: '03',
      name: 'Screened',
      metric: '640 approved',
      benefit: 'Bureau pulls and fraud checks in minutes.',
      icon: BadgeCheck,
    },
    {
      number: '04',
      name: 'Offer',
      metric: '510 offers sent',
      benefit: 'Lease generated, sent, countersigned in one click.',
      icon: TrendingUp,
    },
    {
      number: '05',
      name: 'Signed',
      metric: '480 signed',
      benefit: 'Locked to the unit and synced to your PMS.',
      icon: CheckCircle2,
    },
  ]

  const verificationSteps = [
    {
      number: '01',
      name: 'Identity scan',
      description: 'Persona-powered ID capture with liveness and document authenticity checks.',
      icon: ScanLine,
    },
    {
      number: '02',
      name: 'Income connect',
      description: 'Plaid pulls 90 days of bank history, paystubs, and direct deposit patterns.',
      icon: Landmark,
    },
    {
      number: '03',
      name: 'Bureau pull',
      description: 'Soft or hard credit pull through Equifax, with evictions and criminal overlays.',
      icon: BadgeCheck,
    },
  ]

  return (
    <>
      {/* SECTION 1 — Application pipeline, end to end */}
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll>
            <motion.div variants={revealItem} className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-medium uppercase tracking-wider text-[#176FEB]">
                Application Pipeline
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-[#0A1628] md:text-4xl lg:text-5xl">
                From inquiry to{' '}
                <span className="italic text-[#176FEB]">signed lease</span> in under 72 hours
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[#475569] md:text-lg">
                Every stage of the leasing funnel runs on autopilot — from the first website
                inquiry to a countersigned lease synced into your PMS.
              </p>
            </motion.div>

            <motion.div
              variants={revealItem}
              className="relative mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border border-[#E5E7EB]"
            >
              <Image
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85"
                alt="New tenants receiving keys to their apartment after signing a lease"
                width={1200}
                height={500}
                className="h-48 w-full object-cover md:h-64"
              />
            </motion.div>

            <motion.div variants={revealItem} className="mt-14">
              <div className="flex flex-col items-stretch gap-4 md:flex-row md:items-center md:gap-2">
                {funnelStages.map((stage, index) => {
                  const Icon = stage.icon
                  return (
                    <div key={stage.number} className="flex flex-col items-stretch gap-4 md:flex-1 md:flex-row md:items-center md:gap-2">
                      <div className="flex-1 rounded-2xl border border-[#E5E7EB] bg-white p-5 transition-all hover:border-[#176FEB]/40 hover:shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#176FEB]/10 text-sm font-semibold text-[#176FEB]">
                            {stage.number}
                          </div>
                          <Icon className="h-4 w-4 text-[#64748B]" aria-hidden="true" />
                        </div>
                        <h3 className="mt-4 text-base font-semibold text-[#0A1628]">
                          {stage.name}
                        </h3>
                        <p className="mt-1 text-lg font-semibold text-[#176FEB]">
                          {stage.metric}
                        </p>
                        <p className="mt-2 text-xs leading-relaxed text-[#64748B]">
                          {stage.benefit}
                        </p>
                      </div>
                      {index < funnelStages.length - 1 && (
                        <div className="flex justify-center md:justify-start">
                          <ArrowRight
                            className="h-5 w-5 rotate-90 text-[#176FEB] md:rotate-0"
                            aria-hidden="true"
                          />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </motion.div>

            <motion.div
              variants={revealItem}
              className="mx-auto mt-10 flex max-w-2xl flex-col items-stretch gap-3 sm:flex-row"
            >
              <div className="flex-1 rounded-xl border border-[#E5E7EB] bg-[#F5F6F8] px-5 py-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-[#047857]" aria-hidden="true" />
                  <p className="text-xs font-medium uppercase tracking-wider text-[#64748B]">
                    Overall conversion
                  </p>
                </div>
                <p className="mt-2 text-2xl font-semibold text-[#0A1628]">38.7%</p>
              </div>
              <div className="flex-1 rounded-xl border border-[#E5E7EB] bg-[#F5F6F8] px-5 py-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#176FEB]" aria-hidden="true" />
                  <p className="text-xs font-medium uppercase tracking-wider text-[#64748B]">
                    Average time-to-lease
                  </p>
                </div>
                <p className="mt-2 text-2xl font-semibold text-[#0A1628]">2.4 days</p>
              </div>
            </motion.div>
          </RevealOnScroll>
        </div>
      </section>

      {/* SECTION 2 — ID + income verified in one flow */}
      <section className="bg-[#F5F6F8] py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll>
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Left column — content */}
              <motion.div variants={revealItem}>
                <p className="text-sm font-medium uppercase tracking-wider text-[#176FEB]">
                  Verification Layer
                </p>
                <h2 className="mt-3 text-3xl font-semibold leading-tight text-[#0A1628] md:text-4xl lg:text-5xl">
                  Every applicant{' '}
                  <span className="italic text-[#176FEB]">identity-proofed</span>, bank-verified,
                  income-confirmed
                </h2>
                <p className="mt-5 text-base leading-relaxed text-[#475569] md:text-lg">
                  Revun chains Persona identity checks, Plaid bank connections, and Equifax bureau
                  pulls into a single applicant flow — so your team never chases documents or
                  second-guesses income again.
                </p>

                <ul className="mt-8 space-y-4">
                  {verificationSteps.map((step) => {
                    const Icon = step.icon
                    return (
                      <li
                        key={step.number}
                        className="flex items-start gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-5 transition-all hover:border-[#176FEB]/40 hover:shadow-sm"
                      >
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#176FEB]/10">
                          <Icon className="h-5 w-5 text-[#176FEB]" aria-hidden="true" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-[#176FEB]">
                              {step.number}
                            </span>
                            <h3 className="text-base font-semibold text-[#0A1628]">
                              {step.name}
                            </h3>
                          </div>
                          <p className="mt-1 text-sm leading-relaxed text-[#475569]">
                            {step.description}
                          </p>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </motion.div>

              {/* Right column — image */}
              <motion.div variants={revealItem} className="relative">
                <div className="relative overflow-hidden rounded-2xl border border-[#E5E7EB] shadow-sm">
                  <Image
                    src="https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&w=1200&q=85"
                    alt="Applicant scanning their government ID for identity verification"
                    width={1200}
                    height={1400}
                    className="h-[480px] w-full object-cover md:h-[560px]"
                  />
                </div>

                {/* Floating card — bottom-left */}
                <div className="absolute bottom-5 left-5 flex items-center gap-3 rounded-xl border border-[#E5E7EB] bg-white/95 px-4 py-3 shadow-md backdrop-blur-sm">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#047857]/10">
                    <CheckCircle2 className="h-5 w-5 text-[#047857]" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-[#64748B]">
                      Verified
                    </p>
                    <p className="text-sm font-semibold text-[#0A1628]">in 94 seconds</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}
