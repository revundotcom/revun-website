'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import {
  ArrowRight,
  Users,
  Heart,
  X,
  MessageCircle,
  UserCheck,
  Link2,
  Briefcase,
  Moon,
  Sun,
  Home,
  MapPin,
  Calendar,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Coffee,
  BookOpen,
  Music,
  Dumbbell,
  PawPrint,
  Cigarette,
  Send,
} from 'lucide-react'

/* ═══════════════════════════════════════════ */
/*  Design tokens                              */
/* ═══════════════════════════════════════════ */

const ease = [0.22, 1, 0.36, 1] as const

/* Stable Unsplash portrait IDs — already allowlisted in next.config.ts */
const AVATARS = {
  ravi: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=90',
  priya: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=90',
  marcus: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=90',
  amara: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=90',
  jordan: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=90',
  sophie: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=90',
} as const

function Avatar({ src, alt, size = 48, ring = false }: { src: string; alt: string; size?: number; ring?: boolean }) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full bg-[#F5F6F8] ${ring ? 'ring-2 ring-white shadow-sm' : ''}`}
      style={{ width: size, height: size }}
    >
      <Image src={src} alt={alt} fill sizes={`${size}px`} className="object-cover" />
    </div>
  )
}

/* ═══════════════════════════════════════════ */
/*  Shared primitives                          */
/* ═══════════════════════════════════════════ */

function SectionWrapper({ children, id, dark }: { children: React.ReactNode; id: string; dark?: boolean }) {
  return (
    <section id={id} className={`py-16 md:py-24 ${dark ? 'bg-[#F5F6F8]' : 'bg-white'}`}>
      <div className="mx-auto max-w-6xl px-6">{children}</div>
    </section>
  )
}

function SectionHeader({ eyebrow, title, highlight, description }: {
  eyebrow: string; title: string; highlight: string; description: string
}) {
  return (
    <RevealOnScroll className="mx-auto max-w-2xl text-center">
      <motion.p variants={revealItem} className="text-sm font-heading font-semibold uppercase tracking-wider text-[#176FEB]">
        {eyebrow}
      </motion.p>
      <motion.h2 variants={revealItem} className="mt-3 font-display text-4xl font-normal md:text-5xl text-[#0A1628]">
        {title} <span className="text-[#176FEB]">{highlight}</span>
      </motion.h2>
      <motion.p variants={revealItem} className="mx-auto mt-4 max-w-xl text-lg text-[#555860]">
        {description}
      </motion.p>
    </RevealOnScroll>
  )
}

/* ═══════════════════════════════════════════ */
/*  Hero — split layout with stacked preview   */
/* ═══════════════════════════════════════════ */

function RoommatesHero() {
  return (
    <section className="relative overflow-hidden bg-white pb-16 pt-28 md:pt-36">
      <div className="absolute inset-0 bg-grid bg-grid-mask opacity-40" aria-hidden="true" />
      <div className="absolute top-0 right-[-200px] h-[600px] w-[600px] rounded-full bg-[#176FEB]/[0.06] blur-[140px]" aria-hidden="true" />
      <div className="absolute bottom-0 left-[-200px] h-[500px] w-[500px] rounded-full bg-[#60A5FA]/[0.04] blur-[120px]" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left: copy */}
          <RevealOnScroll>
            <motion.div
              variants={revealItem}
              className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-1.5 shadow-sm"
            >
              <span className="flex h-2 w-2 rounded-full bg-[#22C55E] animate-pulse" />
              <span className="text-sm font-medium text-[#555860]">Now matching in 10 countries</span>
            </motion.div>
            <motion.h1
              variants={revealItem}
              className="mt-6 font-display text-5xl font-normal leading-[1.05] tracking-tight text-[#0A1628] md:text-6xl lg:text-7xl"
            >
              Find your perfect{' '}
              <span className="text-[#176FEB]">roommate.</span>
            </motion.h1>
            <motion.p
              variants={revealItem}
              className="mt-6 max-w-xl text-lg leading-relaxed text-[#555860] md:text-xl"
            >
              Swipe through verified profiles, match on lifestyle, and chat in one tap — all inside the Revun tenant app.
            </motion.p>
            <motion.div variants={revealItem} className="mt-9 flex flex-col items-start gap-3 sm:flex-row">
              <Link
                href="/signup/"
                className="inline-flex h-14 items-center justify-center rounded-xl bg-[#176FEB] px-8 text-base font-semibold text-white shadow-[0_8px_24px_-8px_rgba(23,111,235,0.5)] transition-all hover:bg-[#1260d1] hover:shadow-[0_12px_28px_-8px_rgba(23,111,235,0.6)]"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/demo/"
                className="inline-flex h-14 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-8 text-base font-semibold text-[#0A1628] transition-all hover:border-[#176FEB]/30 hover:text-[#176FEB] hover:shadow-sm"
              >
                Book a Demo
              </Link>
            </motion.div>

            {/* Trust row */}
            <motion.div
              variants={revealItem}
              className="mt-10 flex flex-wrap items-center gap-6 border-t border-[#E5E7EB] pt-6"
            >
              <div className="flex -space-x-2">
                <Avatar src={AVATARS.priya} alt="Verified tenant" size={32} ring />
                <Avatar src={AVATARS.ravi} alt="Verified tenant" size={32} ring />
                <Avatar src={AVATARS.amara} alt="Verified tenant" size={32} ring />
                <Avatar src={AVATARS.marcus} alt="Verified tenant" size={32} ring />
              </div>
              <div>
                <p className="font-heading text-sm font-semibold text-[#0A1628]">12,000+ verified profiles</p>
                <p className="text-xs text-[#555860]">Government-ID verified · Real people, real matches</p>
              </div>
            </motion.div>
          </RevealOnScroll>

          {/* Right: stacked profile deck */}
          <HeroDeckPreview />
        </div>
      </div>
    </section>
  )
}

function HeroDeckPreview() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const cards = [
    { src: AVATARS.priya, name: 'Priya S.', role: 'UX Designer', match: 94, tint: 'from-[#176FEB]/10 to-[#60A5FA]/5', y: 0, x: 0, rot: -4, z: 30 },
    { src: AVATARS.ravi, name: 'Ravi K.', role: 'Software Engineer', match: 88, tint: 'from-[#22C55E]/10 to-[#16A34A]/5', y: 14, x: 30, rot: 2, z: 20 },
    { src: AVATARS.amara, name: 'Amara N.', role: 'Marketing Lead', match: 82, tint: 'from-[#F59E0B]/10 to-[#F97316]/5', y: 28, x: 60, rot: 8, z: 10 },
  ]

  return (
    <div ref={ref} className="relative mx-auto h-[440px] w-full max-w-md lg:h-[480px]">
      {/* Soft glow behind deck */}
      <div className="absolute inset-8 rounded-[32px] bg-gradient-to-br from-[#176FEB]/10 to-transparent blur-2xl" aria-hidden="true" />

      {cards.map((c, i) => (
        <motion.div
          key={c.name}
          className="absolute inset-0 rounded-3xl border border-[#E5E7EB] bg-white p-6 shadow-[0_20px_50px_-20px_rgba(10,22,40,0.2)]"
          initial={{ opacity: 0, y: 40 + c.y, x: c.x, rotate: c.rot, scale: 0.95 }}
          animate={inView ? { opacity: 1, y: c.y, x: c.x, rotate: c.rot, scale: 1 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.15 + (cards.length - 1 - i) * 0.12 }}
          style={{ zIndex: c.z }}
        >
          {/* Match chip */}
          <div className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-[#176FEB] px-3 py-1 text-xs font-semibold text-white shadow-lg">
            <Sparkles className="h-3 w-3" />
            {c.match}% match
          </div>
          <div className="absolute right-4 top-4 z-10 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-[#22C55E] shadow-sm backdrop-blur">
            <ShieldCheck className="h-3 w-3" /> Verified
          </div>

          {/* Portrait */}
          <div className={`relative mx-auto mt-6 h-56 w-full overflow-hidden rounded-2xl bg-gradient-to-br ${c.tint}`}>
            <Image src={c.src} alt={c.name} fill sizes="400px" className="object-cover" priority={i === 0} />
          </div>

          {/* Info */}
          <div className="mt-5">
            <div className="flex items-baseline justify-between">
              <h3 className="font-heading text-xl font-bold text-[#0A1628]">{c.name}</h3>
              <span className="text-xs text-[#94A3B8]">24</span>
            </div>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-[#555860]">
              <Briefcase className="h-3.5 w-3.5" /> {c.role}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              <span className="rounded-full bg-[#F5F6F8] px-2.5 py-1 text-[11px] font-medium text-[#555860]">Non-smoker</span>
              <span className="rounded-full bg-[#F5F6F8] px-2.5 py-1 text-[11px] font-medium text-[#555860]">Early bird</span>
              <span className="rounded-full bg-[#F5F6F8] px-2.5 py-1 text-[11px] font-medium text-[#555860]">Clean</span>
            </div>
          </div>

          {/* Actions (only on top card) */}
          {i === 0 && (
            <div className="mt-5 flex items-center justify-center gap-3">
              <button className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#E5E7EB] text-[#94A3B8] transition-colors hover:border-red-300 hover:text-red-400" aria-label="Pass">
                <X className="h-5 w-5" />
              </button>
              <button className="flex h-11 w-11 items-center justify-center rounded-full bg-[#176FEB] text-white transition-colors hover:bg-[#1260d1]" aria-label="Like">
                <Heart className="h-5 w-5 fill-white" />
              </button>
            </div>
          )}
        </motion.div>
      ))}

      {/* Floating match notification */}
      <motion.div
        className="absolute -left-4 bottom-8 z-40 flex items-center gap-3 rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 shadow-xl md:-left-8"
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.5, ease, delay: 1.2 }}
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#22C55E]/10">
          <MessageCircle className="h-4 w-4 text-[#22C55E]" />
        </div>
        <div>
          <p className="font-heading text-xs font-semibold text-[#0A1628]">New message</p>
          <p className="text-[11px] text-[#555860]">Priya: Hey! Want to grab coffee?</p>
        </div>
      </motion.div>
    </div>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section: Screenshot showcase               */
/* ═══════════════════════════════════════════ */

function ScreenshotShowcase() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <SectionWrapper id="showcase" dark>
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <RevealOnScroll>
          <motion.p variants={revealItem} className="font-heading text-sm font-semibold uppercase tracking-wider text-[#176FEB]">
            In the Tenant App
          </motion.p>
          <motion.h2 variants={revealItem} className="mt-3 font-display text-3xl font-normal text-[#0A1628] md:text-4xl lg:text-5xl">
            Right inside your{' '}
            <span className="text-[#176FEB]">rental journey</span>
          </motion.h2>
          <motion.p variants={revealItem} className="mt-4 max-w-md text-lg text-[#555860]">
            No separate app, no extra login. Roommate matching lives inside Revun — next to your lease, maintenance, and payments.
          </motion.p>
          <motion.ul variants={revealItem} className="mt-8 space-y-4">
            {[
              { icon: ShieldCheck, label: 'Every profile government-ID verified' },
              { icon: UserCheck, label: 'Credit and employment pre-screened' },
              { icon: MessageCircle, label: 'Chat, voice, and video — built in' },
              { icon: Home, label: 'Link to a shared listing in one tap' },
            ].map((f) => (
              <li key={f.label} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#176FEB]/10">
                  <f.icon className="h-4 w-4 text-[#176FEB]" />
                </span>
                <span className="text-base text-[#0A1628]">{f.label}</span>
              </li>
            ))}
          </motion.ul>
        </RevealOnScroll>

        {/* Native feature preview — no device frame */}
        <div ref={ref} className="relative">
          <div className="absolute -inset-6 rounded-[32px] bg-gradient-to-br from-[#176FEB]/10 to-transparent blur-3xl" aria-hidden="true" />

          <motion.div
            className="relative rounded-3xl border border-[#E5E7EB] bg-white p-8 shadow-[0_24px_60px_-20px_rgba(10,22,40,0.15)]"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
          >
            <p className="text-center text-xs font-semibold uppercase tracking-wider text-[#176FEB]">Roommate Matching</p>
            <h3 className="mt-2 text-center font-display text-3xl font-normal text-[#0A1628]">
              Find your perfect <span className="text-[#176FEB]">roommate</span>
            </h3>
            <p className="mx-auto mt-3 max-w-sm text-center text-sm text-[#555860]">
              Answer a few quick questions so we can match you with the best roommates in your area.
            </p>

            {/* Two portrait cards with link icon */}
            <div className="relative mx-auto mt-8 flex max-w-md items-center justify-center">
              <motion.div
                className="relative h-60 w-44 -rotate-[6deg] overflow-hidden rounded-2xl shadow-xl"
                initial={{ opacity: 0, x: -20, rotate: -12 }}
                animate={inView ? { opacity: 1, x: 0, rotate: -6 } : {}}
                transition={{ duration: 0.6, ease, delay: 0.3 }}
              >
                <Image src={AVATARS.priya} alt="Verified roommate Priya" fill sizes="300px" className="object-cover" />
              </motion.div>

              <motion.div
                className="absolute z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg ring-4 ring-[#F5F6F8]"
                initial={{ scale: 0, rotate: -90 }}
                animate={inView ? { scale: 1, rotate: 0 } : {}}
                transition={{ duration: 0.5, ease, delay: 0.6, type: 'spring', stiffness: 200 }}
              >
                <Link2 className="h-7 w-7 text-[#176FEB]" />
              </motion.div>

              <motion.div
                className="relative h-60 w-44 rotate-[6deg] overflow-hidden rounded-2xl shadow-xl"
                initial={{ opacity: 0, x: 20, rotate: 12 }}
                animate={inView ? { opacity: 1, x: 0, rotate: 6 } : {}}
                transition={{ duration: 0.6, ease, delay: 0.3 }}
              >
                <Image src={AVATARS.ravi} alt="Verified roommate Ravi" fill sizes="300px" className="object-cover" />
              </motion.div>
            </div>

            {/* Feature rows */}
            <div className="mt-10 space-y-3">
              {[
                { icon: Users, label: 'Match with tenants who share your lifestyle' },
                { icon: Link2, label: 'Send & receive roommate invites' },
                { icon: Heart, label: 'Save potential matches' },
              ].map((f, i) => (
                <motion.div
                  key={f.label}
                  className="flex items-center gap-3 rounded-xl bg-[#F5F6F8] px-4 py-3"
                  initial={{ opacity: 0, x: -8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, ease, delay: 0.7 + i * 0.08 }}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white">
                    <f.icon className="h-4 w-4 text-[#176FEB]" />
                  </span>
                  <span className="text-sm font-medium text-[#0A1628]">{f.label}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.button
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#176FEB] py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#1260d1]"
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, ease, delay: 1 }}
            >
              Continue <ArrowRight className="h-4 w-4" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section: How it works (3-step)             */
/* ═══════════════════════════════════════════ */

const steps = [
  {
    n: '01',
    title: 'Build your profile',
    body: 'Share your lifestyle, sleep schedule, budget, location, and move-in date in under 2 minutes.',
    icon: UserCheck,
    tint: '#176FEB',
  },
  {
    n: '02',
    title: 'Swipe to match',
    body: 'See verified profiles with compatibility scores. Heart the ones you vibe with, skip the rest.',
    icon: Heart,
    tint: '#EC4899',
  },
  {
    n: '03',
    title: 'Chat & move in',
    body: 'Mutual match? Chat, video call, tour together, and link to a shared listing — all inside Revun.',
    icon: MessageCircle,
    tint: '#22C55E',
  },
]

function HowItWorks() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <SectionWrapper id="how">
      <SectionHeader
        eyebrow="How it works"
        title="Three steps to a"
        highlight="great match"
        description="From profile to move-in day — the whole flow is baked into the Revun tenant app."
      />
      <div ref={ref} className="relative mt-14 grid gap-6 md:grid-cols-3">
        {/* Connector line (desktop) */}
        <div className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-12 hidden h-px bg-gradient-to-r from-transparent via-[#E5E7EB] to-transparent md:block" aria-hidden="true" />

        {steps.map((s, i) => (
          <motion.div
            key={s.n}
            className="relative rounded-2xl border border-[#E5E7EB] bg-white p-7 transition-all hover:border-[#176FEB]/30 hover:shadow-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease, delay: 0.1 + i * 0.1 }}
          >
            <div
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl"
              style={{ backgroundColor: `${s.tint}15` }}
            >
              <s.icon className="h-8 w-8" style={{ color: s.tint }} />
            </div>
            <p className="mt-4 text-center text-xs font-bold uppercase tracking-wider" style={{ color: s.tint }}>
              Step {s.n}
            </p>
            <h3 className="mt-2 text-center font-heading text-xl font-semibold text-[#0A1628]">{s.title}</h3>
            <p className="mt-2 text-center text-sm leading-relaxed text-[#555860]">{s.body}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section: Compatibility score               */
/* ═══════════════════════════════════════════ */

const compatBars = [
  { label: 'Sleep schedule', value: 96, icon: Moon },
  { label: 'Cleanliness', value: 92, icon: Sparkles },
  { label: 'Work routine', value: 88, icon: Briefcase },
  { label: 'Budget range', value: 94, icon: Home },
  { label: 'Social vibe', value: 78, icon: Users },
  { label: 'Pet preferences', value: 100, icon: PawPrint },
]

function CompatibilityScore() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const avg = Math.round(compatBars.reduce((s, b) => s + b.value, 0) / compatBars.length)

  return (
    <SectionWrapper id="compatibility" dark>
      <SectionHeader
        eyebrow="Compatibility Score"
        title="Match on what"
        highlight="actually matters"
        description="Our matching engine scores compatibility across six lifestyle dimensions — not just a yes/no."
      />
      <div ref={ref} className="mt-14 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Left: overall score ring */}
        <motion.div
          className="relative flex flex-col items-center justify-center rounded-2xl border border-[#E5E7EB] bg-white p-8"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          <div className="flex items-center gap-3">
            <Avatar src={AVATARS.jordan} alt="You" size={56} ring />
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#176FEB]/10">
              <Link2 className="h-4 w-4 text-[#176FEB]" />
            </div>
            <Avatar src={AVATARS.priya} alt="Match" size={56} ring />
          </div>
          <p className="mt-4 text-sm text-[#555860]">You &amp; Priya S.</p>

          <div className="relative mt-6">
            <svg width="200" height="200" className="-rotate-90 overflow-visible">
              <circle cx="100" cy="100" r="88" fill="none" stroke="#E5E7EB" strokeWidth="12" />
              <motion.circle
                cx="100"
                cy="100"
                r="88"
                fill="none"
                stroke="#176FEB"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 88}
                initial={{ strokeDashoffset: 2 * Math.PI * 88 }}
                animate={inView ? { strokeDashoffset: 2 * Math.PI * 88 * (1 - avg / 100) } : {}}
                transition={{ duration: 1.6, ease, delay: 0.3 }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                className="font-display text-5xl font-bold text-[#0A1628]"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.9 }}
              >
                {avg}%
              </motion.span>
              <span className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#22C55E]">Great match</span>
            </div>
          </div>
          <p className="mt-6 max-w-xs text-center text-sm text-[#555860]">
            Overall compatibility based on verified preferences and shared lifestyle signals.
          </p>
        </motion.div>

        {/* Right: bars */}
        <motion.div
          className="rounded-2xl border border-[#E5E7EB] bg-white p-8"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
        >
          <h3 className="font-heading text-lg font-semibold text-[#0A1628]">Breakdown by dimension</h3>
          <p className="mt-1 text-sm text-[#555860]">Where you align — and where you&apos;ll need a house rule.</p>
          <div className="mt-6 space-y-5">
            {compatBars.map((b, i) => (
              <div key={b.label}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm font-medium text-[#0A1628]">
                    <b.icon className="h-4 w-4 text-[#176FEB]" />
                    {b.label}
                  </span>
                  <span className="font-heading text-sm font-bold text-[#0A1628]">{b.value}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#F5F6F8]">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background:
                        b.value >= 90
                          ? 'linear-gradient(90deg, #22C55E, #16A34A)'
                          : b.value >= 75
                            ? 'linear-gradient(90deg, #176FEB, #60A5FA)'
                            : 'linear-gradient(90deg, #F59E0B, #F97316)',
                    }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${b.value}%` } : {}}
                    transition={{ duration: 1.1, ease, delay: 0.35 + i * 0.08 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section: Swipe deck (interactive demo)     */
/* ═══════════════════════════════════════════ */

const deckProfiles = [
  { id: 1, name: 'Priya S.', age: 26, src: AVATARS.priya, role: 'UX Designer', city: 'Toronto', budget: '$1,500', match: 94, move: 'May 1', tags: ['Early bird', 'Non-smoker', 'Clean'] },
  { id: 2, name: 'Ravi K.', age: 24, src: AVATARS.ravi, role: 'Software Engineer', city: 'Mississauga', budget: '$1,800', match: 88, move: 'May 15', tags: ['Night owl', 'Gym-goer', 'Pet-friendly'] },
  { id: 3, name: 'Amara N.', age: 28, src: AVATARS.amara, role: 'Marketing Lead', city: 'Vancouver', budget: '$1,600', match: 82, move: 'June 1', tags: ['Hybrid work', 'Social', 'Chef at heart'] },
  { id: 4, name: 'Marcus T.', age: 25, src: AVATARS.marcus, role: 'PhD Student', city: 'Montreal', budget: '$1,200', match: 76, move: 'Aug 1', tags: ['Quiet hours', 'Reader', 'Non-smoker'] },
]

function SwipeDeckSection() {
  const [deck, setDeck] = useState(deckProfiles)
  const [liked, setLiked] = useState<number[]>([])
  const [passed, setPassed] = useState<number[]>([])
  const [dir, setDir] = useState<'left' | 'right' | null>(null)

  const top = deck[0]

  const act = (type: 'like' | 'pass') => {
    if (!top) return
    setDir(type === 'like' ? 'right' : 'left')
    setTimeout(() => {
      if (type === 'like') setLiked((l) => [...l, top.id])
      else setPassed((p) => [...p, top.id])
      setDeck((d) => d.slice(1))
      setDir(null)
    }, 280)
  }

  const reset = () => {
    setDeck(deckProfiles)
    setLiked([])
    setPassed([])
  }

  return (
    <SectionWrapper id="swipe">
      <SectionHeader
        eyebrow="Discovery"
        title="Swipe to find your"
        highlight="match"
        description="Try the real interaction. Tap the heart or the X to cycle through profiles."
      />
      <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Deck + actions (natural flow, no negative positioning) */}
        <div className="mx-auto w-full max-w-sm">
          <div className="relative h-[520px] w-full">
          {deck.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-dashed border-[#E5E7EB] bg-[#F5F6F8] p-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#176FEB]/10">
                <Sparkles className="h-8 w-8 text-[#176FEB]" />
              </div>
              <h3 className="mt-4 font-heading text-xl font-semibold text-[#0A1628]">You&apos;re all caught up!</h3>
              <p className="mt-2 text-sm text-[#555860]">
                {liked.length} like{liked.length !== 1 ? 's' : ''} · {passed.length} pass{passed.length !== 1 ? 'es' : ''}
              </p>
              <button
                onClick={reset}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#176FEB] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1260d1]"
              >
                Start over
              </button>
            </div>
          ) : (
            <AnimatePresence>
              {deck.slice(0, 3).reverse().map((p, idxReversed) => {
                const idx = Math.min(2, deck.length - 1) - idxReversed
                const isTop = idx === 0
                return (
                  <motion.div
                    key={p.id}
                    className="absolute inset-0 overflow-hidden rounded-3xl border border-[#E5E7EB] bg-white shadow-[0_24px_60px_-24px_rgba(10,22,40,0.25)]"
                    initial={{ scale: 0.92, y: 30, opacity: 0 }}
                    animate={{
                      scale: 1 - idx * 0.04,
                      y: idx * 12,
                      opacity: 1,
                      ...(isTop && dir === 'right'
                        ? { x: 420, rotate: 18, opacity: 0 }
                        : isTop && dir === 'left'
                          ? { x: -420, rotate: -18, opacity: 0 }
                          : {}),
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease }}
                    style={{ zIndex: 10 - idx }}
                  >
                    {/* Portrait */}
                    <div className="relative h-64 w-full bg-[#F5F6F8]">
                      <Image src={p.src} alt={p.name} fill sizes="400px" className="object-cover" />
                      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-[#176FEB] px-3 py-1 text-xs font-semibold text-white shadow-lg">
                        <Sparkles className="h-3 w-3" />
                        {p.match}% match
                      </div>
                      <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold text-[#176FEB] shadow-sm backdrop-blur">
                        <ShieldCheck className="h-3 w-3" /> Verified
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-5">
                      <div className="flex items-baseline justify-between">
                        <h3 className="font-heading text-2xl font-bold text-[#0A1628]">
                          {p.name} <span className="font-normal text-[#94A3B8]">{p.age}</span>
                        </h3>
                      </div>
                      <p className="mt-1 flex items-center gap-1.5 text-sm text-[#555860]">
                        <Briefcase className="h-3.5 w-3.5" /> {p.role}
                      </p>
                      <div className="mt-3 grid grid-cols-3 gap-2">
                        <div className="rounded-lg bg-[#F5F6F8] px-2.5 py-2 text-center">
                          <p className="text-[10px] uppercase tracking-wider text-[#94A3B8]">City</p>
                          <p className="mt-0.5 text-xs font-semibold text-[#0A1628]">{p.city}</p>
                        </div>
                        <div className="rounded-lg bg-[#F5F6F8] px-2.5 py-2 text-center">
                          <p className="text-[10px] uppercase tracking-wider text-[#94A3B8]">Budget</p>
                          <p className="mt-0.5 text-xs font-semibold text-[#0A1628]">{p.budget}</p>
                        </div>
                        <div className="rounded-lg bg-[#F5F6F8] px-2.5 py-2 text-center">
                          <p className="text-[10px] uppercase tracking-wider text-[#94A3B8]">Move-in</p>
                          <p className="mt-0.5 text-xs font-semibold text-[#0A1628]">{p.move}</p>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {p.tags.map((t) => (
                          <span key={t} className="rounded-full bg-[#176FEB]/8 px-2.5 py-1 text-[11px] font-medium text-[#176FEB]">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Overlay stamps */}
                    {isTop && dir === 'right' && (
                      <div className="absolute left-6 top-20 rotate-[-16deg] rounded-lg border-4 border-[#176FEB] px-3 py-1 font-heading text-2xl font-bold text-[#176FEB]">
                        LIKE
                      </div>
                    )}
                    {isTop && dir === 'left' && (
                      <div className="absolute right-6 top-20 rotate-[16deg] rounded-lg border-4 border-[#555860] px-3 py-1 font-heading text-2xl font-bold text-[#555860]">
                        NOPE
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </AnimatePresence>
          )}

          </div>

          {/* Actions (in natural flow under the deck) */}
          {deck.length > 0 && (
            <div className="mt-8 flex items-center justify-center gap-5">
              <button
                onClick={() => act('pass')}
                className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#E5E7EB] bg-white text-[#555860] shadow-[0_8px_20px_-8px_rgba(10,22,40,0.15)] transition-all hover:border-[#176FEB]/40 hover:text-[#0A1628] hover:shadow-[0_12px_24px_-8px_rgba(10,22,40,0.2)] active:scale-95"
                aria-label="Pass"
              >
                <X className="h-6 w-6" />
              </button>
              <button
                onClick={() => act('like')}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-[#176FEB] text-white shadow-[0_12px_24px_-8px_rgba(23,111,235,0.5)] transition-all hover:bg-[#1260d1] hover:shadow-[0_16px_32px_-8px_rgba(23,111,235,0.6)] active:scale-95"
                aria-label="Like"
              >
                <Heart className="h-7 w-7 fill-white" />
              </button>
            </div>
          )}
        </div>

        {/* Right side copy */}
        <div className="px-2">
          <RevealOnScroll>
            <motion.p variants={revealItem} className="font-heading text-sm font-semibold uppercase tracking-wider text-[#176FEB]">
              Built for speed
            </motion.p>
            <motion.h3 variants={revealItem} className="mt-3 font-display text-3xl font-normal text-[#0A1628] md:text-4xl">
              A decision in{' '}
              <span className="text-[#176FEB]">under 10 seconds</span>
            </motion.h3>
            <motion.p variants={revealItem} className="mt-4 text-lg text-[#555860]">
              Every card tells you what you need to know — compatibility, budget, move-in, and the tags that actually matter.
            </motion.p>
            <motion.div variants={revealItem} className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                { icon: Sparkles, label: 'Match score' },
                { icon: ShieldCheck, label: 'ID verified' },
                { icon: Home, label: 'Budget + city' },
                { icon: Calendar, label: 'Move-in date' },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-2.5 rounded-xl border border-[#E5E7EB] bg-white px-4 py-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#176FEB]/10">
                    <c.icon className="h-4 w-4 text-[#176FEB]" />
                  </span>
                  <span className="text-sm font-medium text-[#0A1628]">{c.label}</span>
                </div>
              ))}
            </motion.div>
            <motion.div variants={revealItem} className="mt-6 flex items-center gap-2 text-sm text-[#555860]">
              <Heart className="h-4 w-4 fill-[#176FEB] text-[#176FEB]" />
              <span>
                <strong className="text-[#0A1628]">{liked.length}</strong> liked &nbsp;·&nbsp;
                <strong className="text-[#0A1628]">{passed.length}</strong> passed in this demo
              </span>
            </motion.div>
          </RevealOnScroll>
        </div>
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section: Profile deep dive                 */
/* ═══════════════════════════════════════════ */

const profileInfo = [
  { label: 'Name', value: 'Priya Sharma' },
  { label: 'Age', value: '26' },
  { label: 'Gender', value: 'Female' },
  { label: 'Occupation', value: 'UX Designer' },
  { label: 'Move-In', value: '01 May 2026' },
  { label: 'Stay Duration', value: '12+ months' },
  { label: 'Budget', value: '$1,500 CAD/mo' },
]

const propertyPrefs = [
  { label: 'City', value: 'Toronto' },
  { label: 'Neighbourhood', value: 'Queen West' },
  { label: 'Bedrooms', value: '2' },
  { label: 'Pets', value: 'OK with cats' },
]

function ProfileDeepDive() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <SectionWrapper id="profile" dark>
      <SectionHeader
        eyebrow="Profiles"
        title="Know before you"
        highlight="connect"
        description="Every profile shows verified details — so you make informed decisions before saying hi."
      />
      <div ref={ref} className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Profile header card */}
        <motion.div
          className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          <div className="relative h-48 bg-gradient-to-br from-[#176FEB] to-[#60A5FA]">
            <div className="absolute inset-0 bg-grid opacity-20" aria-hidden="true" />
          </div>
          <div className="relative -mt-16 px-6 pb-6">
            <div className="relative inline-block">
              <Avatar src={AVATARS.priya} alt="Priya Sharma" size={112} ring />
              <span className="absolute bottom-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#22C55E] ring-2 ring-white">
                <CheckCircle2 className="h-3.5 w-3.5 text-white" />
              </span>
            </div>
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <h3 className="font-heading text-2xl font-bold text-[#0A1628]">Priya Sharma</h3>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#22C55E]/10 px-2 py-0.5 text-[10px] font-semibold text-[#22C55E]">
                  <ShieldCheck className="h-3 w-3" /> ID Verified
                </span>
              </div>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-[#555860]">
                <Briefcase className="h-3.5 w-3.5" /> UX Designer · 26
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-[#555860]">
                <MapPin className="h-3.5 w-3.5 text-[#176FEB]" /> Queen West, Toronto
              </p>
            </div>

            <div className="mt-5 rounded-xl border border-[#176FEB]/20 bg-[#176FEB]/5 p-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#176FEB]">About me</p>
              <p className="mt-1.5 text-sm leading-relaxed text-[#0A1628]">
                Looking for a chill, clean, responsible roommate to share a 2BR in Queen West. I&apos;m quiet on weekdays, love to cook, and down to hang on weekends.
              </p>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#176FEB] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1260d1]">
                <MessageCircle className="h-4 w-4" /> Message
              </button>
              <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#E5E7EB] text-[#555860] transition-colors hover:border-[#176FEB]/30 hover:text-[#176FEB]">
                <Heart className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Info + preferences */}
        <motion.div
          className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
        >
          <div className="border-b border-[#E5E7EB] px-6 py-4">
            <h4 className="font-heading text-base font-semibold text-[#0A1628]">Profile info</h4>
          </div>
          <div className="divide-y divide-[#E5E7EB]">
            {profileInfo.map((row, i) => (
              <motion.div
                key={row.label}
                className="flex items-center justify-between px-6 py-3"
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, ease, delay: 0.25 + i * 0.04 }}
              >
                <span className="text-sm text-[#555860]">{row.label}</span>
                <span className="text-sm font-medium text-[#0A1628]">{row.value}</span>
              </motion.div>
            ))}
          </div>

          <div className="border-b border-t border-[#E5E7EB] bg-[#F5F6F8] px-6 py-3">
            <h4 className="font-heading text-base font-semibold text-[#0A1628]">Property preferences</h4>
          </div>
          <div className="divide-y divide-[#E5E7EB]">
            {propertyPrefs.map((row, i) => (
              <motion.div
                key={row.label}
                className="flex items-center justify-between px-6 py-3"
                initial={{ opacity: 0, x: 8 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, ease, delay: 0.4 + i * 0.04 }}
              >
                <span className="text-sm text-[#555860]">{row.label}</span>
                <span className="text-sm font-medium text-[#0A1628]">{row.value}</span>
              </motion.div>
            ))}
          </div>

          <div className="p-6">
            <div className="flex items-start gap-3 rounded-xl border border-[#176FEB]/20 bg-[#176FEB]/5 p-4">
              <Sparkles className="h-5 w-5 shrink-0 text-[#176FEB]" />
              <div>
                <p className="text-sm font-medium text-[#0A1628]">Full transparency</p>
                <p className="mt-1 text-xs text-[#555860]">
                  Every profile shows verified government ID, employment status, and credit range — so you can commit with confidence.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section: Preferences builder (interactive) */
/* ═══════════════════════════════════════════ */

const workOptions = ['Freelancer', 'Hybrid', '9-to-5', 'Work from home', 'Night shifts', 'Student']
const sleepOptions = [
  { id: 'early', label: 'Early bird', icon: Sun },
  { id: 'night', label: 'Night owl', icon: Moon },
]
const lifestyleOptions = [
  { id: 'non-smoker', label: 'Non-smoker', icon: Cigarette },
  { id: 'pet-friendly', label: 'Pet-friendly', icon: PawPrint },
  { id: 'clean', label: 'Clean & tidy', icon: Sparkles },
  { id: 'quiet', label: 'Quiet hours', icon: BookOpen },
  { id: 'social', label: 'Social', icon: Users },
  { id: 'gym', label: 'Gym-goer', icon: Dumbbell },
  { id: 'cook', label: 'Loves cooking', icon: Coffee },
  { id: 'music', label: 'Music lover', icon: Music },
]

function PreferencesBuilder() {
  const [work, setWork] = useState<string[]>(['Hybrid', 'Work from home'])
  const [sleep, setSleep] = useState<string>('early')
  const [lifestyle, setLifestyle] = useState<string[]>(['non-smoker', 'clean', 'quiet'])

  const toggle = (arr: string[], setArr: (v: string[]) => void, v: string) => {
    setArr(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v])
  }

  const selectedCount = work.length + (sleep ? 1 : 0) + lifestyle.length
  const estMatches = Math.max(12, Math.min(240, selectedCount * 18 + 60))

  return (
    <SectionWrapper id="preferences">
      <SectionHeader
        eyebrow="Preferences"
        title="Dial in"
        highlight="what matters"
        description="Pick your work pattern, sleep schedule, and lifestyle traits — we find people whose vibes match yours."
      />
      <div className="mt-14 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Builder card */}
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8">
          {/* Work */}
          <div className="mb-8">
            <h3 className="mb-4 font-heading text-base font-semibold text-[#0A1628]">Describe your work or study setup.</h3>
            <div className="flex flex-wrap gap-2">
              {workOptions.map((opt) => {
                const active = work.includes(opt)
                return (
                  <button
                    key={opt}
                    onClick={() => toggle(work, setWork, opt)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                      active
                        ? 'border-[#176FEB] bg-[#176FEB] text-white shadow-sm'
                        : 'border-[#E5E7EB] text-[#555860] hover:border-[#176FEB]/40 hover:text-[#176FEB]'
                    }`}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Sleep */}
          <div className="mb-8">
            <h3 className="mb-4 font-heading text-base font-semibold text-[#0A1628]">What&apos;s your sleep schedule?</h3>
            <div className="grid grid-cols-2 gap-3">
              {sleepOptions.map((o) => {
                const active = sleep === o.id
                return (
                  <button
                    key={o.id}
                    onClick={() => setSleep(o.id)}
                    className={`flex items-center justify-center gap-2 rounded-xl border py-3.5 text-sm font-medium transition-all ${
                      active
                        ? 'border-[#176FEB] bg-[#176FEB]/5 text-[#176FEB] shadow-sm'
                        : 'border-[#E5E7EB] text-[#555860] hover:border-[#176FEB]/40'
                    }`}
                  >
                    <o.icon className="h-4 w-4" />
                    {o.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Lifestyle */}
          <div>
            <h3 className="mb-4 font-heading text-base font-semibold text-[#0A1628]">More about you</h3>
            <div className="flex flex-wrap gap-2">
              {lifestyleOptions.map((o) => {
                const active = lifestyle.includes(o.id)
                return (
                  <button
                    key={o.id}
                    onClick={() => toggle(lifestyle, setLifestyle, o.id)}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-all ${
                      active
                        ? 'border-[#176FEB] bg-[#176FEB]/5 text-[#176FEB]'
                        : 'border-[#E5E7EB] text-[#555860] hover:border-[#176FEB]/40'
                    }`}
                  >
                    <o.icon className="h-3.5 w-3.5" />
                    {o.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Live preview */}
        <div className="rounded-2xl border border-[#E5E7EB] bg-gradient-to-br from-[#176FEB] to-[#1260d1] p-8 text-white">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/70">Live preview</p>
          <h3 className="mt-2 font-display text-3xl font-normal">Based on your picks</h3>
          <motion.div
            key={estMatches}
            className="mt-6 font-display text-6xl font-bold"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease }}
          >
            {estMatches}
          </motion.div>
          <p className="mt-1 text-sm text-white/80">compatible tenants in your area</p>

          <div className="mt-8 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/80">Work profiles</span>
              <span className="font-semibold">{work.length} selected</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/80">Sleep schedule</span>
              <span className="font-semibold capitalize">{sleep || 'not set'}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/80">Lifestyle traits</span>
              <span className="font-semibold">{lifestyle.length} selected</span>
            </div>
          </div>

          <div className="mt-8 flex -space-x-2">
            <Avatar src={AVATARS.priya} alt="Match 1" size={36} ring />
            <Avatar src={AVATARS.ravi} alt="Match 2" size={36} ring />
            <Avatar src={AVATARS.amara} alt="Match 3" size={36} ring />
            <Avatar src={AVATARS.sophie} alt="Match 4" size={36} ring />
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-xs font-bold text-white ring-2 ring-white backdrop-blur">
              +{Math.max(0, estMatches - 4)}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section: Match moment + chat preview       */
/* ═══════════════════════════════════════════ */

function MatchMoment() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <SectionWrapper id="match" dark>
      <SectionHeader
        eyebrow="It's a match"
        title="From swipe to"
        highlight="move-in"
        description="Mutual match? Chat, plan the tour, and link to a shared listing — all without leaving Revun."
      />
      <div ref={ref} className="mt-14 grid gap-8 lg:grid-cols-2">
        {/* Celebration card */}
        <motion.div
          className="relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-10 text-center"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          {/* Confetti dots */}
          {[...Array(12)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute h-2 w-2 rounded-full"
              style={{
                background: ['#176FEB', '#22C55E', '#F59E0B', '#EC4899'][i % 4],
                left: `${10 + ((i * 7) % 80)}%`,
                top: `${15 + ((i * 11) % 60)}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: [0, 1, 1, 0], scale: [0, 1, 1, 0.5], y: [0, -20, -10, 20] } : {}}
              transition={{ duration: 2, delay: 0.5 + i * 0.05, repeat: Infinity, repeatDelay: 3 }}
            />
          ))}

          <p className="text-sm font-semibold uppercase tracking-wider text-[#555860]">You found a</p>
          <motion.h3
            className="mt-2 font-display text-6xl font-bold text-[#176FEB] md:text-7xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.3, type: 'spring', stiffness: 150 }}
          >
            MATCH!
          </motion.h3>

          {/* Avatars colliding */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, ease, delay: 0.5 }}
            >
              <Avatar src={AVATARS.jordan} alt="You" size={96} ring />
            </motion.div>
            <motion.div
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#176FEB] shadow-lg"
              initial={{ scale: 0, rotate: -90 }}
              animate={inView ? { scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.5, ease, delay: 0.7, type: 'spring' }}
            >
              <Heart className="h-6 w-6 fill-white text-white" />
            </motion.div>
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, ease, delay: 0.5 }}
            >
              <Avatar src={AVATARS.priya} alt="Priya" size={96} ring />
            </motion.div>
          </div>

          <motion.p
            className="mt-6 text-sm text-[#555860]"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.9 }}
          >
            Looks like <strong className="text-[#0A1628]">you</strong> and{' '}
            <strong className="text-[#0A1628]">Priya</strong> could be great roommates.
          </motion.p>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1 }}
          >
            <Link
              href="/signup/"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#176FEB] text-base font-semibold text-white transition-colors hover:bg-[#1260d1]"
            >
              Start matching <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Chat preview */}
        <motion.div
          className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
        >
          <div className="flex items-center justify-between border-b border-[#E5E7EB] px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar src={AVATARS.priya} alt="Priya" size={40} />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-[#22C55E] ring-2 ring-white" />
              </div>
              <div>
                <p className="font-heading text-sm font-semibold text-[#0A1628]">Priya Sharma</p>
                <p className="text-[11px] text-[#22C55E]">Online now</p>
              </div>
            </div>
            <MessageCircle className="h-5 w-5 text-[#94A3B8]" />
          </div>

          {/* Messages */}
          <div className="space-y-3 bg-[#F5F6F8] p-5">
            {[
              { me: false, text: 'Hey! Just matched — your profile looks great.', delay: 0.3 },
              { me: true, text: 'Same here! The Queen West place you linked looks amazing.', delay: 0.7 },
              { me: false, text: 'Want to tour it together on Saturday? 2pm works for me.', delay: 1.1 },
              { me: true, text: 'Perfect. Booking a slot now 👍', delay: 1.5 },
            ].map((m, i) => (
              <motion.div
                key={i}
                className={`flex ${m.me ? 'justify-end' : 'justify-start'}`}
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, ease, delay: m.delay }}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                    m.me
                      ? 'rounded-br-md bg-[#176FEB] text-white'
                      : 'rounded-bl-md bg-white text-[#0A1628]'
                  }`}
                >
                  {m.text}
                </div>
              </motion.div>
            ))}

            {/* Tour booking card */}
            <motion.div
              className="flex justify-start"
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, ease, delay: 1.9 }}
            >
              <div className="max-w-[85%] rounded-2xl rounded-bl-md border border-[#176FEB]/20 bg-white p-3.5 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#176FEB]/10">
                    <Calendar className="h-4 w-4 text-[#176FEB]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#0A1628]">Tour booked</p>
                    <p className="text-[11px] text-[#555860]">Sat, May 3 · 2:00 PM · Queen West 2BR</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-[#E5E7EB] px-5 py-3">
            <div className="flex-1 rounded-full bg-[#F5F6F8] px-4 py-2 text-sm text-[#94A3B8]">Type a message…</div>
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-[#176FEB] text-white">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Final CTA                                  */
/* ═══════════════════════════════════════════ */

function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#0A1628] py-20 text-white md:py-24">
      <div className="absolute top-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[#176FEB]/20 blur-[120px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <RevealOnScroll>
          <motion.p variants={revealItem} className="font-heading text-sm font-semibold uppercase tracking-wider text-[#60A5FA]">
            Ready when you are
          </motion.p>
          <motion.h2 variants={revealItem} className="mt-3 font-display text-4xl font-normal md:text-5xl">
            Your next roommate is already{' '}
            <span className="text-[#60A5FA]">on Revun.</span>
          </motion.h2>
          <motion.p variants={revealItem} className="mx-auto mt-5 max-w-xl text-lg text-white/70">
            Create your free profile in under 2 minutes. Start swiping today.
          </motion.p>
          <motion.div variants={revealItem} className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/signup/"
              className="inline-flex h-14 items-center justify-center rounded-xl bg-white px-8 text-base font-semibold text-[#0A1628] transition-all hover:bg-[#F5F6F8]"
            >
              Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/demo/"
              className="inline-flex h-14 items-center justify-center rounded-xl border border-white/20 px-8 text-base font-semibold text-white transition-all hover:bg-white/10"
            >
              Book a Demo
            </Link>
          </motion.div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════ */
/*  Page Assembly                              */
/* ═══════════════════════════════════════════ */

export function RoommatesClient() {
  return (
    <>
      <RoommatesHero />
      <ScreenshotShowcase />
      <HowItWorks />
      <CompatibilityScore />
      <SwipeDeckSection />
      <ProfileDeepDive />
      <PreferencesBuilder />
      <MatchMoment />
      <FinalCTA />

      {/* AEO quick answer */}
      <p className="sr-only">
        Revun Roommate Matching lets tenants find compatible roommates through verified profiles, lifestyle preference filters, and swipe-based discovery. Features include profile creation with budget, location, and move-in date; work schedule and sleep habit matching; swipe to like or pass on potential roommates; detailed profile views with occupation, age, stay duration, and property preferences; roommate invite management; and in-app chat, voice, and video to connect before committing. All profiles are government-ID verified through Revun identity verification, with credit and employment pre-screening.
      </p>
    </>
  )
}
