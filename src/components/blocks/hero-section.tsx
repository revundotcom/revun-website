'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-navy">
      {/* CSS grid background with radial fade mask */}
      <div className="absolute inset-0 bg-grid-dark bg-grid-mask" aria-hidden />

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto max-w-4xl px-6 pt-32 pb-24 text-center"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow badge */}
        <motion.div
          variants={fadeUp}
          className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5"
        >
          <span className="text-sm font-medium text-[#94A3B8]">
            Property Management Infrastructure
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          variants={fadeUp}
          className="font-display italic text-5xl leading-[1.08] tracking-tight text-white md:text-7xl"
        >
          One platform for{' '}
          <span className="text-accent">every</span> property
          <br className="hidden sm:block" />
          {' '}workflow
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#94A3B8]"
        >
          Revun replaces disconnected tools with a single operating system for
          property management, leasing, brokerage, maintenance, and self-managing
          owners across Canada and the United States.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/signup/"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-brand-blue px-8 text-base font-semibold text-white transition-colors hover:bg-brand-blue-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
          >
            Start Free
          </Link>
          <Link
            href="/demo/"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-white/20 px-8 text-base font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
          >
            Book a Demo
          </Link>
        </motion.div>

        {/* Trust line */}
        <motion.p
          variants={fadeUp}
          className="mt-6 text-sm text-[#64748B]"
        >
          Trusted by property managers across Canada and the US
        </motion.p>
      </motion.div>
    </section>
  )
}
