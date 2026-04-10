'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import {
  ArrowRight,
  Users,
  Search,
  Heart,
  X,
  Undo2,
  Star,
  MessageCircle,
  ChevronRight,
  UserCheck,
  Settings,
  Link2,
  Briefcase,
  Moon,
  Sun,
  Home,
  Bed,
  DollarSign,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'

/* ═══════════════════════════════════════════ */
/*  Shared                                     */
/* ═══════════════════════════════════════════ */

const ease = [0.22, 1, 0.36, 1] as const

function SectionWrapper({ children, id, dark }: { children: React.ReactNode; id: string; dark?: boolean }) {
  return (
    <section id={id} className={`py-16 md:py-20 ${dark ? 'bg-[#F5F6F8]' : 'bg-white'}`}>
      <div className="mx-auto max-w-6xl px-6">{children}</div>
    </section>
  )
}

function SectionHeader({ eyebrow, title, highlight, description }: {
  eyebrow: string; title: string; highlight: string; description: string
}) {
  return (
    <RevealOnScroll className="mx-auto max-w-2xl text-center">
      <motion.p variants={revealItem} className="text-sm font-heading font-semibold uppercase tracking-wider text-brand-blue">
        {eyebrow}
      </motion.p>
      <motion.h2 variants={revealItem} className="mt-3 font-display text-4xl font-normal md:text-5xl text-brand-graphite">
        {title} <span className="text-keyword">{highlight}</span>
      </motion.h2>
      <motion.p variants={revealItem} className="mx-auto mt-4 max-w-xl text-lg text-brand-graphite/70">
        {description}
      </motion.p>
    </RevealOnScroll>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 1: Find The Right Roommate         */
/* ═══════════════════════════════════════════ */

const matchFeatures = [
  { icon: Users, label: 'Match with tenants who share your lifestyle' },
  { icon: Link2, label: 'Send & receive roommate invites' },
  { icon: Heart, label: 'Save potential matches' },
]

function FindRoommate() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <SectionWrapper id="find">
      <SectionHeader
        eyebrow="Roommate Matching"
        title="Find The Right"
        highlight="Roommate"
        description="Browse verified profiles to find someone who fits your lifestyle and living needs."
      />
      <div ref={ref} className="mt-12 grid gap-8 lg:grid-cols-2">
        {/* Left: Main card */}
        <motion.div
          className="rounded-2xl border border-[#E5E7EB] bg-white p-6"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          <div className="mb-6">
            <h3 className="font-heading text-xl font-semibold text-brand-graphite">
              Find your perfect <span className="text-brand-blue">roommate</span>
            </h3>
            <p className="mt-2 text-sm text-brand-graphite-mid">
              Answer a few quick questions so we can match you with the best roommates.
            </p>
          </div>

          {/* Profile photos mockup */}
          <div className="mb-8 flex justify-center gap-4">
            <div className="relative h-40 w-32 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-blue/10 to-brand-blue/5">
              <div className="absolute inset-0 flex items-center justify-center">
                <Users className="h-10 w-10 text-brand-blue/30" />
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue/10">
                <Link2 className="h-5 w-5 text-brand-blue" />
              </div>
            </div>
            <div className="relative h-40 w-32 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-blue/10 to-brand-blue/5">
              <div className="absolute inset-0 flex items-center justify-center">
                <Users className="h-10 w-10 text-brand-blue/30" />
              </div>
            </div>
          </div>

          {/* Feature list */}
          <div className="space-y-3">
            {matchFeatures.map((feat, i) => (
              <motion.div
                key={feat.label}
                className="flex items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-brand-off-white"
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.35, ease, delay: 0.3 + i * 0.08 }}
              >
                <feat.icon className="h-5 w-5 text-brand-blue" />
                <span className="text-sm text-brand-graphite">{feat.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: How it works quick steps */}
        <div className="space-y-4">
          {[
            { step: '01', title: 'Create your profile', description: 'Share your lifestyle preferences, budget, location, and move-in date.', icon: UserCheck },
            { step: '02', title: 'Browse matches', description: 'Swipe through verified profiles of people looking for roommates in your area.', icon: Search },
            { step: '03', title: 'Connect & chat', description: 'Send invites, start conversations, and decide if you are a good fit before committing.', icon: MessageCircle },
          ].map((s, i) => (
            <motion.div
              key={s.step}
              className="rounded-2xl border border-[#E5E7EB] bg-white p-6"
              initial={{ opacity: 0, x: 16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, ease, delay: 0.2 + i * 0.12 }}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10">
                  <s.icon className="h-5 w-5 text-brand-blue" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">Step {s.step}</span>
                  <h4 className="mt-1 font-heading text-base font-semibold text-brand-graphite">{s.title}</h4>
                  <p className="mt-1 text-sm text-brand-graphite-mid">{s.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 2: Match, Manage & Connect         */
/* ═══════════════════════════════════════════ */

function MatchManageConnect() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <SectionWrapper id="manage" dark>
      <SectionHeader
        eyebrow="Dashboard"
        title="Match, Manage &"
        highlight="Connect"
        description="Match with compatible roommates and manage invites, chats, and connections in one place."
      />
      <div ref={ref} className="mt-12 mx-auto max-w-3xl">
        <motion.div
          className="rounded-2xl border border-[#E5E7EB] bg-white p-6"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          <h3 className="text-lg text-brand-graphite">
            <strong>Match, Manage, &</strong> <span className="text-brand-blue font-semibold">Connect</span> with the right people to share your space.
          </h3>

          {/* Profile + Manage cards */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <motion.div
              className="rounded-xl border border-[#E5E7EB] p-5"
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, ease, delay: 0.2 }}
            >
              <div className="flex items-center justify-between">
                <span className="font-heading text-sm font-semibold text-brand-graphite">Profile</span>
                <ChevronRight className="h-4 w-4 text-brand-graphite-light" />
              </div>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue/10">
                  <UserCheck className="h-6 w-6 text-brand-blue" />
                </div>
                <div>
                  <span className="flex items-center gap-1 text-xs text-brand-blue font-medium">
                    <CheckCircle2 className="h-3 w-3" /> Verified
                  </span>
                  <p className="text-xs text-brand-graphite-mid">Update preferences</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="rounded-xl border border-[#E5E7EB] p-5"
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, ease, delay: 0.3 }}
            >
              <div className="flex items-center justify-between">
                <span className="font-heading text-sm font-semibold text-brand-graphite">Manage</span>
                <ChevronRight className="h-4 w-4 text-brand-graphite-light" />
              </div>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue/10">
                  <Users className="h-6 w-6 text-brand-blue" />
                </div>
                <div>
                  <p className="text-sm font-medium text-brand-graphite">Matches</p>
                  <p className="font-heading text-lg font-bold text-brand-blue">03</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Find a roommate link */}
          <motion.div
            className="mt-6 flex items-center justify-between rounded-xl border border-[#E5E7EB] px-5 py-4 transition-colors hover:border-brand-blue/20"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            <div>
              <p className="font-heading text-sm font-semibold text-brand-graphite">Find a roommate</p>
              <p className="mt-0.5 text-xs text-brand-graphite-mid">Browse and match with tenants who share your lifestyle and budget.</p>
            </div>
            <ChevronRight className="h-5 w-5 shrink-0 text-brand-graphite-light" />
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 3: Swipe To Find Your Match        */
/* ═══════════════════════════════════════════ */

function SwipeMatch() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <SectionWrapper id="swipe">
      <SectionHeader
        eyebrow="Discovery"
        title="Swipe To Find"
        highlight="Your Match"
        description="Swipe through verified profiles to discover potential roommates."
      />
      <div ref={ref} className="mt-12 mx-auto max-w-2xl">
        <motion.div
          className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#E5E7EB] px-6 py-4">
            <h3 className="font-heading text-base font-semibold text-brand-graphite">Find a roommate</h3>
            <Search className="h-5 w-5 text-brand-graphite-mid" />
          </div>

          {/* Profile card */}
          <div className="p-6">
            <div className="relative rounded-2xl bg-gradient-to-br from-[#F5F6F8] to-white p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-brand-blue/10">
                  <Users className="h-10 w-10 text-brand-blue/40" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading text-lg font-bold text-brand-graphite">Ravi K.</span>
                    <CheckCircle2 className="h-4 w-4 text-brand-blue" />
                  </div>
                  <div className="mt-1 space-y-1">
                    <p className="flex items-center gap-1.5 text-xs text-brand-graphite-mid">
                      <Briefcase className="h-3 w-3" /> Software Engineer
                    </p>
                    <p className="flex items-center gap-1.5 text-xs text-brand-graphite-mid">
                      <Home className="h-3 w-3" /> Single Occupant
                    </p>
                    <p className="flex items-center gap-1.5 text-xs text-brand-graphite-mid">
                      <Calendar className="h-3 w-3" /> Move-In: 01 May 2025
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-brand-graphite-mid">
                <MapPin className="h-3 w-3 text-brand-blue" />
                <span>Portland St, Mississauga</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-6 flex items-center justify-center gap-4">
              <button className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E5E7EB] text-brand-graphite-mid transition-colors hover:border-brand-graphite-mid">
                <Undo2 className="h-5 w-5" />
              </button>
              <button className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#E5E7EB] text-brand-graphite-mid transition-colors hover:border-red-300 hover:text-red-400">
                <X className="h-6 w-6" />
              </button>
              <button className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue text-white transition-colors hover:bg-brand-blue-dark">
                <Star className="h-6 w-6" />
              </button>
              <span className="rounded-full bg-brand-blue px-4 py-2 text-xs font-semibold text-white">
                Like
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 4: Get To Know Your Roommate       */
/* ═══════════════════════════════════════════ */

const profileInfo = [
  { label: 'Name', value: 'John D' },
  { label: 'Gender', value: 'Male' },
  { label: 'Age', value: '21' },
  { label: 'Occupation', value: 'Software Engineer' },
  { label: 'Move-In', value: '15 May 2024' },
  { label: 'Stay Duration', value: '6-12 Months' },
  { label: 'Budget', value: '$1000 - $2000 CAD/Month' },
]

const propertyPrefs = [
  { label: 'Location', value: 'Toronto' },
  { label: 'Neighbourhood', value: 'Queen St / Portland St' },
  { label: 'Bedrooms', value: '02' },
]

function KnowYourRoommate() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <SectionWrapper id="profile" dark>
      <SectionHeader
        eyebrow="Profiles"
        title="Get To Know"
        highlight="Your Roommate"
        description="View profiles, habits, and preferences before deciding to connect."
      />
      <div ref={ref} className="mt-12 grid gap-6 lg:grid-cols-2">
        {/* Profile info */}
        <motion.div
          className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          <div className="border-b border-[#E5E7EB] px-6 py-4">
            <h3 className="font-heading text-base font-semibold text-brand-graphite">Profile Info</h3>
          </div>
          <div className="divide-y divide-[#E5E7EB]">
            {profileInfo.map((row, i) => (
              <motion.div
                key={row.label}
                className="flex items-center justify-between px-6 py-3.5"
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, ease, delay: 0.15 + i * 0.05 }}
              >
                <span className="text-sm text-brand-graphite-mid">{row.label}</span>
                <span className="text-sm font-medium text-brand-graphite">{row.value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Property preference */}
        <motion.div
          className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
        >
          <div className="border-b border-[#E5E7EB] px-6 py-4">
            <h3 className="font-heading text-base font-semibold text-brand-graphite">Property Preference</h3>
          </div>
          <div className="divide-y divide-[#E5E7EB]">
            {propertyPrefs.map((row, i) => (
              <motion.div
                key={row.label}
                className="flex items-center justify-between px-6 py-3.5"
                initial={{ opacity: 0, x: 8 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, ease, delay: 0.25 + i * 0.05 }}
              >
                <span className="text-sm text-brand-graphite-mid">{row.label}</span>
                <span className="text-sm font-medium text-brand-graphite">{row.value}</span>
              </motion.div>
            ))}
          </div>

          {/* Why this matters */}
          <div className="p-6">
            <div className="rounded-xl bg-brand-blue/5 border border-brand-blue/10 p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 shrink-0 text-brand-blue" />
                <div>
                  <p className="text-sm font-medium text-brand-graphite">Full transparency</p>
                  <p className="mt-1 text-xs text-brand-graphite-mid">
                    Every profile shows verified details so you can make informed decisions before connecting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 5: Set Your Preferences            */
/* ═══════════════════════════════════════════ */

const workOptions = ['Freelancer', 'Hybrid', 'I work a 9-5', 'I work from home', 'Night shifts', 'Student']
const sleepOptions = ['Early bird', 'Night owl']

function SetPreferences() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <SectionWrapper id="preferences">
      <SectionHeader
        eyebrow="Preferences"
        title="Set Your"
        highlight="Preferences"
        description="Choose what matters to you. Work schedule, lifestyle, and sleep habits."
      />
      <div ref={ref} className="mt-12 mx-auto max-w-2xl">
        <motion.div
          className="rounded-2xl border border-[#E5E7EB] bg-white p-6"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          {/* Work/study setup */}
          <div className="mb-8">
            <h3 className="mb-4 font-heading text-base font-semibold text-brand-graphite">
              Describe your work/study setup.
            </h3>
            <div className="flex flex-wrap gap-2">
              {workOptions.map((opt, i) => (
                <motion.span
                  key={opt}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    i === 0 || i === 3
                      ? 'border-brand-blue bg-brand-blue/5 text-brand-blue'
                      : 'border-[#E5E7EB] text-brand-graphite-mid hover:border-brand-blue/30'
                  }`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, ease, delay: 0.2 + i * 0.05 }}
                >
                  {opt}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Sleep schedule */}
          <div className="mb-8">
            <h3 className="mb-4 font-heading text-base font-semibold text-brand-graphite">
              What&apos;s your sleep schedule?
            </h3>
            <div className="flex gap-3">
              {sleepOptions.map((opt, i) => (
                <motion.div
                  key={opt}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl border py-3 text-sm font-medium transition-colors ${
                    i === 1
                      ? 'border-brand-blue bg-brand-blue/5 text-brand-blue'
                      : 'border-[#E5E7EB] text-brand-graphite-mid hover:border-brand-blue/30'
                  }`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, ease, delay: 0.4 + i * 0.1 }}
                >
                  {i === 0 ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  {opt}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Additional preference pills */}
          <div>
            <h3 className="mb-4 font-heading text-base font-semibold text-brand-graphite">
              More about you
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Non-smoker', 'Pet-friendly', 'Clean & tidy', 'Quiet hours', 'Social', 'Gym-goer'].map((pref, i) => (
                <motion.span
                  key={pref}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    i < 3
                      ? 'border-brand-blue bg-brand-blue/5 text-brand-blue'
                      : 'border-[#E5E7EB] text-brand-graphite-mid hover:border-brand-blue/30'
                  }`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, ease, delay: 0.5 + i * 0.04 }}
                >
                  {pref}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 6: Manage Roommate Invites         */
/* ═══════════════════════════════════════════ */

function ManageInvites() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <SectionWrapper id="invites" dark>
      <SectionHeader
        eyebrow="Invites"
        title="Manage Roommate"
        highlight="Invites"
        description="Review invites and accept or decline matches with one tap."
      />
      <div ref={ref} className="mt-12 mx-auto max-w-2xl">
        <motion.div
          className="rounded-2xl border border-[#E5E7EB] bg-white p-8 text-center"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          <p className="text-sm text-brand-graphite-mid">You have found a</p>
          <motion.h3
            className="mt-2 font-display text-4xl font-bold text-brand-blue md:text-5xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.3 }}
          >
            MATCH!
          </motion.h3>

          {/* Matched profiles */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <motion.div
              className="flex h-24 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-blue/10 to-brand-blue/5"
              initial={{ x: -20, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5, ease, delay: 0.4 }}
            >
              <Users className="h-8 w-8 text-brand-blue/30" />
            </motion.div>
            <motion.div
              className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue/10"
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ duration: 0.4, ease, delay: 0.6 }}
            >
              <Link2 className="h-5 w-5 text-brand-blue" />
            </motion.div>
            <motion.div
              className="flex h-24 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-blue/10 to-brand-blue/5"
              initial={{ x: 20, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5, ease, delay: 0.4 }}
            >
              <Users className="h-8 w-8 text-brand-blue/30" />
            </motion.div>
          </div>

          <motion.p
            className="mt-6 text-sm text-brand-graphite-mid"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7 }}
          >
            Looks like <strong className="text-brand-graphite">You</strong> and <strong className="text-brand-graphite">Ravi K.</strong> are a great fit as potential roommates.
          </motion.p>

          <motion.div
            className="mt-6 flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            <MessageCircle className="h-4 w-4 text-brand-graphite-mid" />
            <span className="text-sm font-medium text-brand-graphite">Start Chat</span>
          </motion.div>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9 }}
          >
            <Link
              href="/signup/"
              className="flex w-full items-center justify-center rounded-xl bg-brand-blue py-4 text-base font-semibold text-white transition-colors hover:bg-brand-blue-dark"
            >
              Get Started
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Hero                                       */
/* ═══════════════════════════════════════════ */

function RoommatesHero() {
  return (
    <section className="relative overflow-hidden bg-white pb-12 pt-28 md:pt-36">
      <div className="absolute inset-0 bg-grid bg-grid-mask opacity-40" aria-hidden="true" />
      <div className="absolute top-0 right-[-200px] h-[500px] w-[500px] rounded-full bg-brand-blue/[0.04] blur-[120px]" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <RevealOnScroll>
          <motion.div variants={revealItem} className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-1.5 shadow-sm">
            <Users className="h-4 w-4 text-brand-blue" />
            <span className="text-sm font-medium text-brand-graphite-mid">Roommate Matching</span>
          </motion.div>
          <motion.h1
            variants={revealItem}
            className="font-display text-5xl font-normal leading-[1.1] tracking-tight text-brand-graphite md:text-7xl"
          >
            Find your perfect{' '}
            <span className="text-brand-blue">roommate</span>
          </motion.h1>
          <motion.p
            variants={revealItem}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-brand-graphite-mid md:text-xl"
          >
            Browse verified profiles, set lifestyle preferences, swipe to match,
            and connect — all built into the Revun tenant experience.
          </motion.p>
          <motion.div variants={revealItem} className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/signup/"
              className="inline-flex h-14 items-center justify-center rounded-xl bg-brand-blue px-8 text-base font-semibold text-white transition-all hover:bg-brand-blue-dark"
            >
              Get Started Free
            </Link>
            <Link
              href="/demo/"
              className="inline-flex h-14 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-8 text-base font-semibold text-brand-graphite transition-all hover:border-brand-blue/30 hover:shadow-sm"
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
      <FindRoommate />
      <MatchManageConnect />
      <SwipeMatch />
      <KnowYourRoommate />
      <SetPreferences />
      <ManageInvites />

      {/* AEO quick answer */}
      <p className="sr-only">
        Revun Roommate Matching lets tenants find compatible roommates through verified profiles, lifestyle preference filters, and swipe-based discovery. Features include profile creation with budget, location, and move-in date; work schedule and sleep habit matching; swipe to like or pass on potential roommates; detailed profile views with occupation, age, stay duration, and property preferences; roommate invite management; and in-app chat to connect before committing. All profiles are verified through Revun identity verification.
      </p>
    </>
  )
}
