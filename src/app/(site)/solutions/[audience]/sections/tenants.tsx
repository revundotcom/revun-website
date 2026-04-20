'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  Wrench,
  FileText,
  Heart,
  CheckCircle2,
  CreditCard,
  MessageSquare,
  PenLine,
  Apple,
  Play,
} from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

export function TenantsSections() {
  const gains = [
    {
      icon: TrendingUp,
      metric: '+47 pts',
      metricSuffix: 'avg in 6 months',
      title: 'Rent that builds your credit',
      description:
        'Every on-time rent payment is reported to Equifax and TransUnion — no extra fee, no paperwork.',
    },
    {
      icon: Wrench,
      metric: '6 hrs',
      metricSuffix: 'median, photo to tech assigned',
      title: 'Maintenance, solved',
      description:
        'Snap a photo, describe the issue, and track status in real time until the job is closed.',
    },
    {
      icon: FileText,
      metric: '7 years',
      metricSuffix: 'document retention',
      title: 'Every receipt, forever',
      description:
        'Lease PDFs, rent receipts, and payment history stay accessible for mortgage applications and tax proof.',
    },
  ]

  const benefits = [
    {
      icon: CreditCard,
      text: 'Pay by Interac e-Transfer, pre-authorized debit, credit, or debit.',
    },
    {
      icon: FileText,
      text: 'Receipts auto-saved to your document vault the moment a payment clears.',
    },
    {
      icon: MessageSquare,
      text: 'Message your landlord without ever sharing a personal phone number.',
    },
    {
      icon: PenLine,
      text: 'Sign and countersign leases on-screen in minutes — no printer required.',
    },
  ]

  return (
    <>
      {/* SECTION 1 — What you gain the day your landlord joins */}
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll className="mb-14 max-w-3xl">
            <motion.div variants={revealItem}>
              <p className="mb-3 text-sm font-medium uppercase tracking-wider text-[#176FEB]">
                Day one wins
              </p>
            </motion.div>
            <motion.h2
              variants={revealItem}
              className="text-3xl font-bold leading-tight tracking-tight text-[#0A1628] md:text-4xl"
            >
              What you gain the day your landlord{' '}
              <span className="italic text-[#176FEB]">joins Revun</span>
            </motion.h2>
            <motion.p
              variants={revealItem}
              className="mt-4 text-lg leading-relaxed text-[#475569]"
            >
              No more e-transfer guesswork, lost lease PDFs, or unanswered maintenance texts.
              Here&rsquo;s what flips on the moment you accept the invite.
            </motion.p>
          </RevealOnScroll>

          <RevealOnScroll className="grid gap-6 md:grid-cols-3">
            {gains.map((g) => {
              const Icon = g.icon
              return (
                <motion.div
                  key={g.title}
                  variants={revealItem}
                  className="flex flex-col rounded-2xl border border-[#E5E7EB] bg-white p-7 transition-shadow hover:shadow-md"
                >
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#F5F6F8] text-[#176FEB]">
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                  <div className="mb-1 text-3xl font-bold tracking-tight text-[#0A1628]">
                    {g.metric}
                  </div>
                  <div className="mb-4 text-sm text-[#64748B]">{g.metricSuffix}</div>
                  <h3 className="mb-2 text-lg font-semibold text-[#0A1628]">{g.title}</h3>
                  <p className="text-sm leading-relaxed text-[#475569]">{g.description}</p>
                </motion.div>
              )
            })}
          </RevealOnScroll>

          <RevealOnScroll className="mt-10">
            <motion.div
              variants={revealItem}
              className="flex items-center gap-4 rounded-2xl border border-[#E5E7EB] bg-[#F5F6F8] px-6 py-5"
            >
              <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#047857]">
                <Heart className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <p className="text-sm leading-relaxed text-[#0A1628] md:text-base">
                <span className="font-semibold">All of this at $0 to you</span>
                <span className="text-[#475569]">
                  {' '}
                  — your landlord pays the platform fee. Revun is completely free for tenants.
                </span>
              </p>
            </motion.div>
          </RevealOnScroll>
        </div>
      </section>

      {/* SECTION 2 — The portal, in your pocket */}
      <section className="bg-[#F5F6F8] py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
            {/* Left column — image */}
            <RevealOnScroll>
              <motion.div variants={revealItem} className="relative">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-[#E5E7EB] bg-white">
                  <Image
                    src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=85"
                    alt="Tenant using a mobile banking app in a modern kitchen"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                {/* Floating receipt card */}
                <div className="absolute -bottom-6 -right-4 flex items-center gap-3 rounded-2xl border border-[#E5E7EB] bg-white px-5 py-4 shadow-lg md:-right-6">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#ECFDF5] text-[#047857]">
                    <CheckCircle2 className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wider text-[#64748B]">
                      Rent paid
                    </div>
                    <div className="text-sm font-semibold text-[#0A1628]">
                      Apr 1 &middot; $1,850
                    </div>
                  </div>
                </div>
              </motion.div>
            </RevealOnScroll>

            {/* Right column — content */}
            <RevealOnScroll>
              <motion.div variants={revealItem}>
                <p className="mb-3 text-sm font-medium uppercase tracking-wider text-[#176FEB]">
                  Tenant App
                </p>
              </motion.div>
              <motion.h2
                variants={revealItem}
                className="text-3xl font-bold leading-tight tracking-tight text-[#0A1628] md:text-4xl"
              >
                One app,{' '}
                <span className="italic text-[#176FEB]">
                  zero apps on your phone to pay rent
                </span>
              </motion.h2>
              <motion.p
                variants={revealItem}
                className="mt-4 text-lg leading-relaxed text-[#475569]"
              >
                The tenant portal lives in your browser or in a lightweight app — your pick.
                Either way, everything about your tenancy is one tap away.
              </motion.p>

              <motion.ul variants={revealItem} className="mt-8 space-y-4">
                {benefits.map((b) => {
                  const Icon = b.icon
                  return (
                    <li key={b.text} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-[#176FEB] ring-1 ring-[#E5E7EB]">
                        <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                      </span>
                      <span className="text-base leading-relaxed text-[#0A1628]">{b.text}</span>
                    </li>
                  )
                })}
              </motion.ul>

              <motion.div variants={revealItem} className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/features/tenant-portal/"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0A1628] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1e293b]"
                >
                  <Apple className="h-5 w-5" strokeWidth={1.75} />
                  <span className="flex flex-col items-start leading-tight">
                    <span className="text-[10px] font-normal uppercase tracking-wider opacity-80">
                      Download on the
                    </span>
                    <span>App Store</span>
                  </span>
                </Link>
                <Link
                  href="/features/tenant-portal/"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0A1628] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1e293b]"
                >
                  <Play className="h-5 w-5" strokeWidth={1.75} />
                  <span className="flex flex-col items-start leading-tight">
                    <span className="text-[10px] font-normal uppercase tracking-wider opacity-80">
                      Get it on
                    </span>
                    <span>Google Play</span>
                  </span>
                </Link>
              </motion.div>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </>
  )
}
