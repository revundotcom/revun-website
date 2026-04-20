'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Megaphone, UserCheck, Wallet, Wrench, Calculator, Scale, MessageSquare,
  ArrowRight, Download, Zap, Receipt, CheckCircle2, Clock, FileText, CalendarCheck
} from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

export function SelfManagingOwnersSections() {
  const hats = [
    {
      icon: Megaphone,
      name: 'Marketer',
      pain: 'Re-posting Kijiji ads every few days to stay visible.',
    },
    {
      icon: UserCheck,
      name: 'Screener',
      pain: 'Chasing pay stubs and guessing on credit checks.',
    },
    {
      icon: Wallet,
      name: 'Collector',
      pain: 'Polite reminders on the 3rd, awkward ones on the 10th.',
    },
    {
      icon: Wrench,
      name: 'Dispatcher',
      pain: 'Coordinating plumbers over four different text threads.',
    },
    {
      icon: Calculator,
      name: 'Accountant',
      pain: 'A shoebox of receipts you sort out every April.',
    },
    {
      icon: Scale,
      name: 'Compliance officer',
      pain: 'Decoding RTA or state notice rules on your own time.',
    },
    {
      icon: MessageSquare,
      name: 'Customer Service',
      pain: 'Answering the same questions at 10pm on a Sunday.',
    },
  ]

  const steps = [
    {
      icon: CalendarCheck,
      label: 'Tenant schedules PAD',
      detail: 'They authorize pre-authorized debit once, from their phone.',
    },
    {
      icon: Zap,
      label: 'Auto-charge on the 1st',
      detail: 'Rent pulls on schedule, no awkward follow-ups needed.',
    },
    {
      icon: Receipt,
      label: 'Receipt auto-emailed',
      detail: 'Tenant gets a branded receipt, you get a timestamped log.',
    },
    {
      icon: FileText,
      label: 'CRA-ready record filed',
      detail: 'Every payment lands in a clean, exportable ledger.',
    },
  ]

  return (
    <>
      {/* Section 1: 7-hat workday */}
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll>
            <motion.div variants={revealItem} className="mx-auto max-w-3xl text-center">
              <span className="font-heading text-sm font-semibold uppercase tracking-wider text-[#176FEB]">
                For the one-person operation
              </span>
              <h2 className="font-display mt-4 text-balance text-4xl font-bold text-[#0A1628] md:text-5xl">
                Your 7-hat workday, simplified
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-[#475569]">
                Managing a handful of units means you do every job yourself. Revun hands six of
                those jobs to software so the only title left on your business card is the one you
                actually want.
              </p>
            </motion.div>
          </RevealOnScroll>

          {/* Full-width banner image with stat overlay */}
          <RevealOnScroll>
            <motion.div variants={revealItem} className="mt-14">
              <div className="relative overflow-hidden rounded-3xl border border-[#E5E7EB] bg-[#F5F6F8] shadow-sm">
                <div className="relative aspect-[21/9] w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1800&q=85"
                    alt="Self-managing landlord reviewing a rent ledger and maintenance notes on a laptop"
                    fill
                    sizes="(min-width: 1024px) 1100px, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#0A1628]/55 via-[#0A1628]/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
                    <div className="max-w-md">
                      <p className="text-xs font-semibold uppercase tracking-widest text-white/80">
                        Real-world outcome
                      </p>
                      <p className="mt-2 font-display text-2xl font-semibold leading-tight text-white md:text-3xl">
                        Owners save <span className="text-[#60A5FA]">9 hours a week</span>, on average.
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-xl bg-white/95 px-4 py-2.5 text-sm font-semibold text-[#0A1628] shadow-sm backdrop-blur">
                      <Clock className="h-4 w-4 text-[#176FEB]" aria-hidden="true" />
                      From 14 hrs &rarr; 5 hrs/week
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </RevealOnScroll>

          {/* 4x2 hat grid below the banner */}
          <RevealOnScroll>
            <motion.div variants={revealItem} className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {hats.map((hat) => {
                const Icon = hat.icon
                return (
                  <div
                    key={hat.name}
                    className="rounded-2xl border border-[#E5E7EB] bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#176FEB]/40 hover:shadow-sm"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F5F6F8]">
                      <Icon className="h-5 w-5 text-[#0A1628]" aria-hidden="true" />
                    </div>
                    <h3 className="font-heading mt-4 text-base font-semibold text-[#0A1628]">
                      {hat.name}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#64748B]">{hat.pain}</p>
                  </div>
                )
              })}

              {/* 8th consolidation card */}
              <div className="relative overflow-hidden rounded-2xl border border-[#176FEB] bg-[#176FEB] p-5 text-white shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/25">
                  <ArrowRight className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <h3 className="font-heading mt-4 text-base font-semibold text-white">
                  Now just the owner
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/85">
                  Revun runs the other six hats in the background, around the clock.
                </p>
              </div>
            </motion.div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Section 2: PAD autopilot + tax export */}
      <section className="bg-[#F5F6F8] py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll>
            <motion.div variants={revealItem} className="mx-auto max-w-3xl text-center">
              <span className="font-heading text-sm font-semibold uppercase tracking-wider text-[#176FEB]">
                Rent day, without the chasing
              </span>
              <h2 className="font-display mt-4 text-balance text-4xl font-bold text-[#0A1628] md:text-5xl">
                Your rental on autopilot
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-[#475569]">
                Set pre-authorized debit up once. From schedule to receipt to tax record, every
                step runs itself and leaves a clean paper trail behind it.
              </p>
            </motion.div>
          </RevealOnScroll>

          <RevealOnScroll>
            <motion.div
              variants={revealItem}
              className="mt-14 rounded-3xl border border-[#E5E7EB] bg-white p-8 shadow-sm md:p-10"
            >
              {/* Timeline */}
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-[#E5E7EB] via-[#176FEB]/40 to-[#E5E7EB] md:block"
                />
                <ol className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-6">
                  {steps.map((step, idx) => {
                    const Icon = step.icon
                    return (
                      <li key={step.label} className="relative">
                        <div className="flex items-start gap-4 md:flex-col md:items-start md:gap-4">
                          <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white text-[#176FEB] shadow-sm">
                            <Icon className="h-5 w-5" aria-hidden="true" />
                            <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#0A1628] text-[10px] font-semibold text-white">
                              {idx + 1}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-heading text-base font-semibold text-[#0A1628]">
                              {step.label}
                            </h3>
                            <p className="mt-1.5 text-sm leading-relaxed text-[#64748B]">
                              {step.detail}
                            </p>
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ol>
              </div>

              {/* Tax export panel */}
              <div className="mt-10 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-[#F5F6F8]">
                <div className="grid grid-cols-1 items-stretch gap-0 md:grid-cols-[220px_1fr]">
                  <div className="relative h-40 w-full md:h-full">
                    <Image
                      src="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=800&q=85"
                      alt="Tax documents and receipts organized by quarter"
                      fill
                      sizes="(min-width: 768px) 220px, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-between gap-5 p-6 md:flex-row md:items-center md:gap-8 md:p-8">
                    <div className="max-w-lg">
                      <div className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-xs font-semibold text-[#047857]">
                        <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                        Year-end ready
                      </div>
                      <h3 className="font-heading mt-3 text-xl font-semibold text-[#0A1628]">
                        CRA and IRS tax export, one click
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#475569]">
                        Export a T776-ready summary for Canadian owners or a Schedule E breakdown
                        for US filers. Rent roll, expenses, and receipts, all pre-sorted per
                        property.
                      </p>
                    </div>
                    <Link
                      href="/pricing/"
                      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0A1628] px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#176FEB] focus:outline-none focus:ring-2 focus:ring-[#176FEB] focus:ring-offset-2"
                    >
                      <Download className="h-4 w-4" aria-hidden="true" />
                      Download tax pack
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}
