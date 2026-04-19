'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { RotatingBadge } from '@/components/ui/rotating-badge'
import { stagger, fadeUp } from '@/lib/motion'

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-grid bg-grid-mask opacity-40" aria-hidden="true" />

      {/* Radial blush glows - brand blue palette */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-[#176FEB]/[0.08] blur-[140px]" aria-hidden="true" />
      <div className="absolute top-[-5%] right-[-10%] h-[500px] w-[500px] rounded-full bg-[#4A91F0]/[0.07] blur-[120px]" aria-hidden="true" />
      <div className="absolute bottom-[-10%] left-[-5%] h-[400px] w-[400px] rounded-full bg-[#0B5AD4]/[0.06] blur-[100px]" aria-hidden="true" />

      <motion.div
        className="relative z-10 mx-auto max-w-5xl px-6 pt-24 pb-20 text-center"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow badge */}
        <motion.div variants={fadeUp}>
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-border bg-white px-4 py-1.5 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-blue opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-blue" />
            </span>
            <span className="text-sm font-medium text-brand-graphite-mid">Built for</span>
            <RotatingBadge
              phrases={[
                'Unified Operations',
                'Full-Stack Infrastructure',
                'Deploy Anywhere',
                'Institutional-Grade',
              ]}
              interval={2500}
            />
          </div>
        </motion.div>

        {/* H1 - use font-display for the serif impact */}
        <motion.h1
          variants={fadeUp}
          className="font-display text-4xl font-normal leading-[1.1] tracking-tight text-[#0A1628] text-balance md:text-6xl lg:text-[4.5rem]"
        >
          Run your entire property business
          <br className="hidden md:block" />
          {' '}on <span className="text-brand-blue font-semibold">one system</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-brand-graphite-mid md:text-xl"
        >
          Revun replaces the disconnected software stack behind your property
          business with one infrastructure layer built for Canada, the United
          States, and every workflow in between.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/platform/"
            className="inline-flex h-14 items-center justify-center rounded-xl bg-brand-blue px-8 text-base font-semibold text-white shadow-cta-glow transition-all duration-200 hover:bg-brand-blue-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
          >
            See the Platform
          </Link>
          <Link
            href="/demo/"
            className="inline-flex h-14 items-center justify-center rounded-xl border border-border bg-white px-8 text-base font-semibold text-brand-graphite transition-all duration-200 hover:border-brand-blue/30 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
          >
            Book a Live Demo
          </Link>
        </motion.div>

        {/* Trust row under CTAs */}
        <motion.div
          variants={fadeUp}
          className="mt-8 flex flex-col items-center justify-center gap-3 text-xs text-brand-graphite-mid sm:flex-row sm:gap-6"
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[
                'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100&q=80',
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80',
                'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&h=100&q=80',
                'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100&q=80',
              ].map((src) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={src}
                  src={src}
                  alt=""
                  loading="lazy"
                  className="h-7 w-7 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
            <span>
              Built with{' '}
              <span className="font-semibold text-[#0A1628]">owners, PMCs, and brokerages</span>
            </span>
          </div>
          <span className="hidden h-3 w-px bg-border sm:block" aria-hidden="true" />
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-0.5 text-[#F59E0B]">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="h-3.5 w-3.5" viewBox="0 0 20 20" fill={i < 4 ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path d="M10 1.5l2.6 5.9 6.4.6-4.8 4.4 1.4 6.3L10 15.3l-5.6 3.3 1.4-6.3L1 7.9l6.4-.5L10 1.5z" />
                </svg>
              ))}
            </span>
            <span>
              <span className="font-semibold text-[#0A1628]">4.7 / 5</span>{' '}
              operator satisfaction
            </span>
          </div>
          <span className="hidden h-3 w-px bg-border sm:block" aria-hidden="true" />
          <span>
            Across <span className="font-semibold text-[#0A1628]">Canada and the United States</span>
          </span>
        </motion.div>

        {/* AEO quick answer for AI search engines */}
        <p className="sr-only">
          Revun is the infrastructure layer for modern property operations. Leasing,
          payments, maintenance, compliance, communications, accounting, and reporting
          all run in one system. Built natively for Canadian regulations including the
          LTB, RTB, TAL, and RTDRS, Revun serves landlords, property managers,
          brokerages, and operators across all Canadian provinces and US states.
        </p>
      </motion.div>
    </section>
  )
}
