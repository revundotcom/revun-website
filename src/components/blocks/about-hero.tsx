'use client'

import { motion } from 'framer-motion'
import { stagger, fadeUp } from '@/lib/motion'

export function AboutHero() {
  return (
    <section className="relative flex min-h-[65vh] items-center justify-center overflow-hidden bg-[#F5F6F8]">
      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 bg-dot-grid opacity-40"
        aria-hidden
      />

      <motion.div
        className="relative z-10 mx-auto max-w-4xl px-6 pt-28 pb-20 text-center"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow pill */}
        <motion.div
          variants={fadeUp}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-1.5"
        >
          <span className="text-sm font-medium text-[#555860]">
            About Revun
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="font-display font-extrabold text-5xl leading-[1.08] tracking-tight text-[#0A1628] md:text-7xl"
        >
          Built for property operations across{' '}
          <span className="text-[#176FEB]">Canada and the United States</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#555860]"
        >
          The software platform and infrastructure layer behind modern property
          operations for owners, property managers, brokerages, leasing teams,
          maintenance companies, and REITs.
        </motion.p>
      </motion.div>
    </section>
  )
}
