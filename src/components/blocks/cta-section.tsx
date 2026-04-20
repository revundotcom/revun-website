'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

/* ── CTA Section ──────────────────────────────────────────────────────────── */

export function CTASection() {
  return (
    <section className="bg-[#F5F6F8] py-12 md:py-16">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <RevealOnScroll>
          <motion.h2
            variants={revealItem}
            className="font-heading text-3xl font-extrabold tracking-tight text-[#0A1628] md:text-5xl"
          >
            Deploy <span className="font-display italic">Revun</span> across your operation today
          </motion.h2>

          <motion.p
            variants={revealItem}
            className="mx-auto mt-5 max-w-lg text-lg text-[#555860]"
          >
            Join property managers, brokerages, leasing teams, and self-managing owners already
            running their entire business on Revun.
          </motion.p>

          <motion.div
            variants={revealItem}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/features/"
              className="inline-flex h-14 items-center justify-center rounded-lg bg-[#176FEB] px-8 text-base font-semibold text-white transition-colors hover:bg-[#1260D6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176FEB] focus-visible:ring-offset-2"
            >
              See the Platform
            </Link>
            <Link
              href="/demo/"
              className="inline-flex h-14 items-center justify-center rounded-lg border border-[#E5E7EB] px-8 text-base font-semibold text-[#0A1628] transition-colors hover:bg-[#EAECF0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176FEB] focus-visible:ring-offset-2"
            >
              Book a Live Demo
            </Link>
          </motion.div>

          <motion.p
            variants={revealItem}
            className="mt-6 text-sm text-[#555860]"
          >
            From $1/day per unit. No long-term contracts.
          </motion.p>
        </RevealOnScroll>
      </div>
    </section>
  )
}
