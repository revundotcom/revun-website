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
          className="font-display text-5xl font-normal leading-[1.1] tracking-tight text-[#0A1628] md:text-7xl lg:text-[5.5rem]"
        >
          Run your entire property business on
          <br className="hidden md:block" />
          {' '}<span className="text-brand-blue font-semibold">one system</span>
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
