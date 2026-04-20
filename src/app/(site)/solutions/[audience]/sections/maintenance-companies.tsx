'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Wrench, Camera, FileText, Zap, CheckCircle2, PenLine, Clock, MapPin, TrendingUp } from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

export function MaintenanceCompaniesSections() {
  return (
    <>
      {/* SECTION 1 — Dispatch in 30 seconds, proof in 30 minutes */}
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            {/* Left column — content */}
            <RevealOnScroll>
              <motion.div variants={revealItem}>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#176FEB]">
                  Dispatch Operations
                </span>
              </motion.div>

              <motion.h2
                variants={revealItem}
                className="mt-4 text-3xl font-semibold leading-tight text-[#0A1628] md:text-4xl lg:text-[44px]"
              >
                Your techs in the field, your{' '}
                <span className="italic text-[#176FEB]">ops in command</span>
              </motion.h2>

              <motion.p
                variants={revealItem}
                className="mt-5 max-w-xl text-base leading-relaxed text-[#475569] md:text-lg"
              >
                Replace the phone-tree chaos with a live view of every job, every tech,
                and every ETA. Dispatchers assign work in seconds and clients get notified
                automatically — no more &ldquo;did they show up yet?&rdquo; calls.
              </motion.p>

              <motion.ul variants={revealItem} className="mt-8 space-y-4">
                {[
                  {
                    icon: Clock,
                    title: 'Drag-and-drop scheduling',
                    desc: 'Reassign jobs across techs without picking up the phone.',
                  },
                  {
                    icon: MapPin,
                    title: 'GPS tech tracking',
                    desc: 'See every truck on a live map with real-time status.',
                  },
                  {
                    icon: CheckCircle2,
                    title: 'Automatic client notifications',
                    desc: 'Tenants and PMs get SMS updates on ETA and completion.',
                  },
                  {
                    icon: TrendingUp,
                    title: 'Route optimization',
                    desc: 'Cut drive time by sequencing jobs by proximity.',
                  },
                ].map(({ icon: Icon, title, desc }) => (
                  <li key={title} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-[#E5E7EB] bg-[#F5F6F8]">
                      <Icon className="h-4 w-4 text-[#176FEB]" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-[#0A1628] md:text-base">{title}</p>
                      <p className="mt-0.5 text-sm text-[#64748B]">{desc}</p>
                    </div>
                  </li>
                ))}
              </motion.ul>

              {/* 3 mini stat tiles */}
              <motion.div
                variants={revealItem}
                className="mt-10 grid grid-cols-3 gap-3 md:gap-4"
              >
                {[
                  { stat: '62%', label: 'faster dispatch' },
                  { stat: '40+', label: 'techs per dispatcher' },
                  { stat: 'Zero', label: 'scheduling conflicts' },
                ].map(({ stat, label }) => (
                  <div
                    key={label}
                    className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-4 text-center"
                  >
                    <p className="text-xl font-semibold text-[#0A1628] md:text-2xl">{stat}</p>
                    <p className="mt-1 text-xs leading-snug text-[#64748B]">{label}</p>
                  </div>
                ))}
              </motion.div>
            </RevealOnScroll>

            {/* Right column — image */}
            <RevealOnScroll>
              <motion.div variants={revealItem} className="relative">
                <div className="relative overflow-hidden rounded-2xl border border-[#E5E7EB] shadow-sm">
                  <div className="relative aspect-[4/5] w-full md:aspect-[5/6]">
                    <Image
                      src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=85"
                      alt="Maintenance technician using a tablet to review a work order on site"
                      fill
                      sizes="(min-width: 1024px) 560px, 100vw"
                      className="object-cover"
                      priority={false}
                    />
                  </div>
                </div>

                {/* Floating card top-right */}
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: 0.25, duration: 0.5 }}
                  className="absolute right-4 top-4 flex items-center gap-3 rounded-xl border border-[#E5E7EB] bg-white/95 px-4 py-3 shadow-lg backdrop-blur-sm md:right-6 md:top-6"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#F5F6F8]">
                    <Wrench className="h-4 w-4 text-[#176FEB]" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                      Job #MNT-4821
                    </p>
                    <p className="text-sm font-medium text-[#0A1628]">
                      In progress <span className="text-[#64748B]">·</span> ETA 30 min
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Proof of work. Paid on time. */}
      <section className="bg-[#F5F6F8] py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          {/* Header */}
          <RevealOnScroll>
            <motion.div variants={revealItem} className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#176FEB]">
                From Job to Cash
              </span>
              <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#0A1628] md:text-4xl lg:text-[44px]">
                Every job ends with{' '}
                <span className="italic text-[#176FEB]">documented proof and a paid invoice</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[#475569] md:text-lg">
                No more chasing down techs for photos or waiting weeks to bill. The lifecycle
                captures itself — and the invoice sends itself.
              </p>
            </motion.div>
          </RevealOnScroll>

          {/* 4-card horizontal flow */}
          <RevealOnScroll>
            <motion.div
              variants={revealItem}
              className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
            >
              {[
                {
                  step: '01',
                  title: 'Before photo',
                  desc: 'Tech captures site condition on arrival',
                  icons: [Camera],
                },
                {
                  step: '02',
                  title: 'Work done',
                  desc: 'Tech logs materials + time',
                  icons: [Wrench, CheckCircle2],
                },
                {
                  step: '03',
                  title: 'After photo + signature',
                  desc: 'Tenant/PM signs off',
                  icons: [Camera, PenLine],
                },
                {
                  step: '04',
                  title: 'Invoice auto-sent',
                  desc: 'Client receives within 2 hours',
                  icons: [FileText, Zap],
                },
              ].map(({ step, title, desc, icons }) => (
                <div
                  key={step}
                  className="relative rounded-2xl border border-[#E5E7EB] bg-white p-6"
                >
                  <span className="absolute right-4 top-4 text-xs font-semibold tracking-wider text-[#64748B]">
                    {step}
                  </span>

                  <div className="inline-flex h-12 w-12 items-center justify-center gap-1 rounded-xl border border-[#E5E7EB] bg-[#F5F6F8]">
                    {icons.map((Icon, i) => (
                      <Icon
                        key={i}
                        className="h-[18px] w-[18px] text-[#176FEB]"
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  <h3 className="mt-5 text-base font-semibold text-[#0A1628] md:text-lg">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#64748B]">{desc}</p>
                </div>
              ))}
            </motion.div>
          </RevealOnScroll>

          {/* Bottom row — days-to-invoice progress bar */}
          <RevealOnScroll>
            <motion.div
              variants={revealItem}
              className="mx-auto mt-12 max-w-2xl rounded-2xl border border-[#E5E7EB] bg-white p-6"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                    Days to invoice
                  </p>
                  <p className="mt-1 text-base font-medium text-[#0A1628] md:text-lg">
                    Dropped from{' '}
                    <span className="text-[#64748B] line-through">18 days</span>{' '}
                    <span className="mx-1 text-[#64748B]">to</span>
                    <span className="font-semibold text-[#047857]">2.3 days</span>
                  </p>
                </div>
                <span className="hidden text-xs font-semibold uppercase tracking-wider text-[#047857] sm:inline">
                  87% faster
                </span>
              </div>

              <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-[#F5F6F8]">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '87%' }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 1.1, ease: 'easeOut' }}
                  className="h-full rounded-full bg-[#047857]"
                />
              </div>

              <div className="mt-2 flex justify-between text-[11px] font-medium text-[#64748B]">
                <span>Day 0</span>
                <span>Day 18</span>
              </div>
            </motion.div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}
