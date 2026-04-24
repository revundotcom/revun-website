'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import {
  MessageSquare, Wallet, FileText, Users, Home,
  KeyRound, Calendar,
  MapPin, TrendingUp, PartyPopper,
  CheckCircle2, Sparkles,
} from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

const ease = [0.22, 1, 0.36, 1] as const
const IMAGE_DWELL_MS = 3200 // milliseconds each image stays before crossfading

type AppImage = { src: string; alt: string }

type AppSection = {
  slug: string
  name: string
  icon: LucideIcon
  eyebrow: string
  title: string
  highlight: string
  description: string
  bullets: string[]
  images?: AppImage[]
  ready: boolean
}

/* ═══════════════════════════════════════════════════════════════════════════
   Section content
   ═══════════════════════════════════════════════════════════════════════════ */

const sections: AppSection[] = [
  {
    slug: 'chats',
    name: 'Chats',
    icon: MessageSquare,
    eyebrow: 'Secure in-app messaging',
    title: 'One inbox for residents,',
    highlight: 'roommates & property teams',
    description:
      'Every property conversation lives in one place — messaging, voice, and video. Group chats scoped to each address, full transcripts, and an audit trail on every call.',
    bullets: [
      'Property-scoped group chats for tenants, owners, and vendors',
      'In-app voice & HD video calls — no personal numbers exposed',
      'Searchable message history with voice transcripts on every call',
    ],
    images: [
      { src: '/screenshots/app/chats/inbox.png', alt: 'Revun app chat inbox with property group chats and unread counts' },
      { src: '/screenshots/app/chats/thread.png', alt: 'One-on-one chat thread with voice transcript playback' },
      { src: '/screenshots/app/chats/video-call.png', alt: 'Multi-party in-app video call' },
    ],
    ready: true,
  },
  {
    slug: 'wallet',
    name: 'Wallet',
    icon: Wallet,
    eyebrow: 'Rent, dues & investment returns',
    title: 'Pay rent, track dues,',
    highlight: 'watch your wealth grow',
    description:
      'One wallet view for everything: amount due, payment options, transaction receipts, and live investment returns. CAD and USD native, Apple Pay ready.',
    bullets: [
      'Flexible rent payment — weekly, monthly, or via Flex Loan',
      'Receipts with lease number, reference ID, and payment method',
      'Live investment dashboard with income vs expense by month',
    ],
    images: [
      { src: '/screenshots/app/wallet/dues.png', alt: 'Wallet dues screen with flexible rent payment options' },
      { src: '/screenshots/app/wallet/investment.png', alt: 'Monthly income vs expense investment dashboard' },
      { src: '/screenshots/app/wallet/transaction.png', alt: 'Rent transaction detail with currency breakdown' },
    ],
    ready: true,
  },
  {
    slug: 'my-investments',
    name: 'My Investments',
    icon: TrendingUp,
    eyebrow: 'Portfolio performance',
    title: 'Your properties,',
    highlight: 'by the numbers',
    description:
      'Track income, occupancy, and property mix across every unit you own. Real-time charts replace month-end spreadsheets, and Revun services are one tap away when you want to delegate the ops.',
    bullets: [
      'Live income vs expense by week, month, and year',
      'Occupancy and property-type breakdown at a glance',
      'Delegate placement, management, or maintenance on demand',
    ],
    images: [
      { src: '/screenshots/app/my-investments/01.png', alt: 'Net income chart with weekly income and expense bars' },
      { src: '/screenshots/app/my-investments/02.png', alt: 'Portfolio occupancy and property-type breakdown' },
      { src: '/screenshots/app/my-investments/03.png', alt: 'Managed services: tenant placement, property management, maintenance' },
    ],
    ready: true,
  },
  {
    slug: 'documents',
    name: 'Documents',
    icon: FileText,
    eyebrow: 'Secure document vault',
    title: 'Every lease, ID, and receipt —',
    highlight: 'one encrypted vault',
    description:
      'Scan, store, and share every important document with bank-grade encryption. Government ID, credit reports, pay stubs, and lease PDFs all live in one place, always at your fingertips.',
    bullets: [
      'End-to-end encrypted storage, audit-logged access',
      'Scan + OCR for government ID, pay stubs, and tax forms',
      'One-tap share with timestamp proof for landlords',
    ],
    images: [
      { src: '/screenshots/app/documents/01.png', alt: 'Document vault with categorised personal records' },
      { src: '/screenshots/app/documents/02.png', alt: 'Document upload and scan view' },
      { src: '/screenshots/app/documents/03.png', alt: 'Individual document detail' },
    ],
    ready: true,
  },
  {
    slug: 'roommates',
    name: 'Roommates',
    icon: Users,
    eyebrow: 'Verified roommate matching',
    title: 'Find roommates,',
    highlight: 'not random strangers',
    description:
      'Match with ID-verified roommates based on lifestyle, budget, and schedule. Chat before you commit, then sign the lease together — all inside one app.',
    bullets: [
      'Verified profiles with ID, background, and references',
      'Lifestyle, budget, and schedule-based matching',
      'In-app chat and co-signing for shared leases',
    ],
    images: [
      { src: '/screenshots/app/roommates/01.png', alt: 'Roommate match confirmation screen' },
      { src: '/screenshots/app/roommates/02.png', alt: 'Roommate profile detail' },
      { src: '/screenshots/app/roommates/03.png', alt: 'Roommate browsing feed' },
    ],
    ready: true,
  },
  {
    slug: 'reserve',
    name: 'Reserve',
    icon: Home,
    eyebrow: 'End-to-end applications',
    title: 'Apply, add occupants,',
    highlight: 'and sign — all in the app',
    description:
      'Verify your income, invite roommates or family as named occupants, and e-sign the lease in one flow. No printing, no scanning, no chasing signatures — finish a full rental application in minutes.',
    bullets: [
      'In-app income and employment verification',
      'Invite roommates or family as named occupants',
      'Legally-valid e-signatures with a tamper-proof audit trail',
    ],
    images: [
      { src: '/screenshots/app/reserve/01.png', alt: 'Income and employment verification form' },
      { src: '/screenshots/app/reserve/02.png', alt: 'Add occupant flow — invite roommates or family' },
      { src: '/screenshots/app/reserve/03.png', alt: 'Legally-valid electronic signature screen' },
    ],
    ready: true,
  },
  {
    slug: 'tours',
    name: 'Tours',
    icon: MapPin,
    eyebrow: 'Self-guided & virtual tours',
    title: 'Tour any home,',
    highlight: 'your way',
    description:
      'Self-guided walk-throughs, live video tours, or in-person showings — every tour type bookable in-app with real-time confirmation and secure entry access.',
    bullets: [
      'Self-guided, virtual, or in-person — your choice',
      'Real-time calendar availability and instant confirmation',
      'Secure one-time entry codes for self-guided tours',
    ],
    images: [
      { src: '/screenshots/app/tours/01.png', alt: 'Tour property main view with Reserve and Schedule tour actions' },
      { src: '/screenshots/app/tours/02.png', alt: 'Tour secondary property view' },
      { src: '/screenshots/app/tours/03.png', alt: 'Tour property with full-screen photos' },
    ],
    ready: true,
  },
  {
    slug: 'my-stays',
    name: 'My Stays',
    icon: KeyRound,
    eyebrow: 'Every lease, every tour',
    title: 'Your rental history,',
    highlight: 'all in one place',
    description:
      'Active leases, past homes, confirmed tours, move-in checklists, and service ratings — centralised, searchable, and always ready when you need receipts or references.',
    bullets: [
      'Active and past leases with move-in/out checklists',
      'Confirmed tour history with property contacts',
      'Rate and review vendors and property managers',
    ],
    images: [
      { src: '/screenshots/app/my-stays/01.png', alt: 'Confirmed tours list' },
      { src: '/screenshots/app/my-stays/02.png', alt: 'Confirmed tour detail' },
      { src: '/screenshots/app/my-stays/03.png', alt: 'Schedule tour screen' },
    ],
    ready: true,
  },
  {
    slug: 'schedule',
    name: 'Schedule',
    icon: Calendar,
    eyebrow: 'Smart scheduling',
    title: 'Book tours',
    highlight: 'around your calendar',
    description:
      'Pick a time that works for you — Revun syncs with the property calendar, sends auto-reminders, and handles re-scheduling when life gets in the way.',
    bullets: [
      'Two-way sync with Google, Apple, and Outlook calendars',
      'Time-zone-aware booking with auto-reminders',
      'One-tap reschedule without emails or phone calls',
    ],
    images: [
      { src: '/screenshots/app/schedule/01.png', alt: 'Schedule home screen' },
      { src: '/screenshots/app/schedule/02.png', alt: 'Tour scheduling flow' },
      { src: '/screenshots/app/schedule/03.png', alt: 'Schedule confirmation' },
    ],
    ready: true,
  },
  {
    slug: 'events',
    name: 'Events',
    icon: PartyPopper,
    eyebrow: 'Tour events & safety',
    title: 'Every in-person tour,',
    highlight: 'with safety built in',
    description:
      'See every tour on a live map, share one-time PINs only when your host asks, and reach safety tools in one tap — record audio, report issues, or dial 911 — so every showing stays secure.',
    bullets: [
      'Pinned tour locations on a live map with host details',
      'One-time PIN codes shared only when your host asks',
      'In-app safety tools: record audio, report, or call 911',
    ],
    images: [
      { src: '/screenshots/app/events/01.png', alt: 'In-tour safety tools: record audio, report safety issue, call 911' },
      { src: '/screenshots/app/events/02.png', alt: 'My Events map view with pinned tour locations' },
      { src: '/screenshots/app/events/03.png', alt: 'Tour event detail with PIN and safety tips' },
    ],
    ready: true,
  },
]

const readySections = sections.filter((s) => s.ready)

/* ═══════════════════════════════════════════════════════════════════════════
   Image showcase — each screenshot is shown at its NATURAL aspect ratio
   (no forced phone shape), fitted inside a fixed-height container with
   object-contain. A drop-shadow filter gives the UI a floating feel. Dots
   below navigate between screens. No card, no ring, no forced cropping.
   ═══════════════════════════════════════════════════════════════════════════ */

function ImageMosaic({
  section,
  imageIdx,
  onImageIdxChange,
}: {
  section: AppSection
  imageIdx: number
  onImageIdxChange: (idx: number) => void
}) {
  const images = section.images ?? []
  if (images.length === 0) return null

  const count = images.length
  const safeIdx = Math.min(imageIdx, count - 1)
  const active = images[safeIdx]

  return (
    <div className="relative mx-auto w-full max-w-[400px]">
      {/* One consistent stage for every feature:
          - Fixed 4:5 card gives every slide identical outer dimensions
          - Image uses `fill` + `object-contain` so it always fits within the
            same bounding box (no more "short/tall" variance between widget
            exports and full-phone exports)
          - Uniform inner padding creates the same whitespace ratio whatever
            the source aspect ratio
          - Drop-shadow gives a single floating-UI feel across all slides
          No CSS mask is applied — it was haloing widget exports whose content
          reached the fade edge. Cleanest presentation regardless of whether
          an export has baked device chrome or not. */}
      <div
        className="relative overflow-hidden rounded-[28px] bg-white"
        style={{
          aspectRatio: '4 / 5',
          boxShadow:
            '0 24px 48px -20px rgba(10, 22, 40, 0.18), inset 0 0 0 1px rgba(10, 22, 40, 0.04)',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.src}
            initial={{ opacity: 0, scale: 0.98, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -4 }}
            transition={{ duration: 0.45, ease }}
            className="absolute inset-0"
          >
            <div className="relative h-full w-full p-6 md:p-7">
              <Image
                src={active.src}
                alt={active.alt}
                fill
                sizes="(max-width: 768px) 320px, 400px"
                className="object-contain"
                style={{
                  filter:
                    'drop-shadow(0 14px 28px rgba(10, 22, 40, 0.10))',
                }}
                priority
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot indicators — direct navigation + progress indicator */}
      {count > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {images.map((_, i) => {
            const isActive = i === safeIdx
            return (
              <button
                key={i}
                type="button"
                onClick={() => onImageIdxChange(i)}
                aria-label={`Show screen ${i + 1} of ${count}`}
                aria-current={isActive ? 'true' : undefined}
                className={`h-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-8 bg-[#176FEB]'
                    : 'w-2 bg-[#D0D5DD] hover:bg-[#94A3B8]'
                }`}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Copy panel
   ═══════════════════════════════════════════════════════════════════════════ */

function CopyPanel({ section }: { section: AppSection }) {
  const Icon = section.icon

  return (
    <div>
      <div className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-3 py-1.5 shadow-sm">
        <Icon className="h-3.5 w-3.5 text-[#176FEB]" />
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#176FEB]">
          {section.eyebrow}
        </span>
      </div>
      <h3 className="mt-5 font-display text-3xl font-normal leading-[1.15] text-[#0A1628] md:text-4xl">
        {section.title} <span className="text-keyword">{section.highlight}</span>
      </h3>
      <p className="mt-5 text-base leading-relaxed text-[#555860]">
        {section.description}
      </p>
      <ul className="mt-6 space-y-3">
        {section.bullets.map((b, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, ease, delay: 0.15 + i * 0.08 }}
            className="flex items-start gap-3 text-[14px] leading-relaxed text-[#0A1628]"
          >
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#22C55E]/12">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#22C55E]" />
            </span>
            <span>{b}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Coming-soon placeholders (shown when user clicks a Soon nav item)
   ═══════════════════════════════════════════════════════════════════════════ */

function ImagePlaceholder({ section }: { section: AppSection }) {
  const Icon = section.icon
  return (
    <div className="mx-auto w-full max-w-[280px] md:max-w-[300px]">
      <div
        className="flex items-center justify-center overflow-hidden rounded-[24px] border border-dashed border-[#176FEB]/30 bg-[#E8F2FE]/40"
        style={{ aspectRatio: '312 / 540' }}
      >
        <Icon className="h-14 w-14 text-[#176FEB]/60" />
      </div>
    </div>
  )
}

function CopyPlaceholder({ section }: { section: AppSection }) {
  return (
    <div>
      <div className="inline-flex items-center gap-2 rounded-full border border-[#176FEB]/20 bg-[#E8F2FE] px-3 py-1.5">
        <Sparkles className="h-3.5 w-3.5 text-[#176FEB]" />
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#176FEB]">
          Preview in progress
        </span>
      </div>
      <h3 className="mt-5 font-display text-3xl font-normal leading-[1.15] text-[#0A1628] md:text-4xl">
        {section.name} is <span className="text-keyword">polishing up</span>
      </h3>
      <p className="mt-5 max-w-md text-base leading-relaxed text-[#555860]">
        We&apos;re still dialling in the final screens for this feature. Once the Figma exports are
        locked, this tab will light up with a full walkthrough.
      </p>
      <div className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-white px-3 py-1.5 text-[11px] font-medium text-[#555860]">
        <Sparkles className="h-3 w-3 text-[#176FEB]" />
        Shipping in the next update
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Nav rail — vertical on desktop, horizontal scroll on mobile
   ═══════════════════════════════════════════════════════════════════════════ */

function NavItemVertical({
  section,
  isActive,
  onSelect,
  showProgress,
  progressDurationMs,
}: {
  section: AppSection
  isActive: boolean
  onSelect: (slug: string) => void
  showProgress: boolean
  progressDurationMs: number
}) {
  const Icon = section.icon
  const isReady = section.ready
  const canClick = isReady

  return (
    <button
      type="button"
      disabled={!canClick}
      onClick={() => canClick && onSelect(section.slug)}
      aria-selected={isActive}
      role="tab"
      className={`group relative flex items-center gap-3 overflow-hidden rounded-xl px-3 py-2.5 text-left transition-colors duration-200 ${
        isActive && isReady
          ? 'bg-[#E8F2FE] text-[#0A1628]'
          : isActive
          ? 'bg-[#F5F6F8] text-[#0A1628]'
          : canClick
          ? 'text-[#555860] hover:bg-[#F5F6F8] hover:text-[#176FEB] cursor-pointer'
          : 'text-[#555860]/60 cursor-default'
      }`}
    >
      {/* Progress bar on left edge of active item — fills over full feature duration */}
      {showProgress && (
        <motion.div
          key={`progress-${section.slug}`}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: progressDurationMs / 1000, ease: 'linear' }}
          className="absolute left-0 top-0 h-full w-[3px] origin-top rounded-r-full bg-[#176FEB]"
          aria-hidden="true"
        />
      )}

      <Icon
        className={`h-4 w-4 shrink-0 transition-colors ${
          isActive && isReady
            ? 'text-[#176FEB]'
            : canClick
            ? 'text-[#555860] group-hover:text-[#176FEB]'
            : 'text-[#555860]/50'
        }`}
      />
      <span className="text-[13px] font-medium truncate">{section.name}</span>
      {!isReady && (
        <span className="ml-auto rounded bg-[#F5F6F8] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#555860]">
          Soon
        </span>
      )}
    </button>
  )
}

function NavItemHorizontal({
  section,
  isActive,
  onSelect,
}: {
  section: AppSection
  isActive: boolean
  onSelect: (slug: string) => void
}) {
  const Icon = section.icon
  const isReady = section.ready

  return (
    <button
      type="button"
      disabled={!isReady}
      onClick={() => isReady && onSelect(section.slug)}
      aria-selected={isActive}
      role="tab"
      className={`shrink-0 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-medium transition-all duration-200 ${
        isActive && isReady
          ? 'border-[#176FEB] bg-[#176FEB] text-white shadow-sm'
          : isActive
          ? 'border-[#E5E7EB] bg-[#F5F6F8] text-[#0A1628]'
          : isReady
          ? 'border-[#E5E7EB] bg-white text-[#555860]'
          : 'border-[#E5E7EB] bg-white/60 text-[#555860]/60 cursor-default'
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      {section.name}
      {!isReady && (
        <span
          className={`rounded px-1 py-0.5 text-[8px] font-bold uppercase ${
            isActive && isReady ? 'bg-white/20 text-white' : 'bg-[#F5F6F8] text-[#555860]'
          }`}
        >
          Soon
        </span>
      )}
    </button>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Main export
   ═══════════════════════════════════════════════════════════════════════════ */

export default function AppShowcase() {
  const [activeSlug, setActiveSlug] = useState<string>(readySections[0]?.slug ?? 'chats')
  const [imageIdx, setImageIdx] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { margin: '-10% 0px -10% 0px', once: false })
  const prefersReducedMotion = useReducedMotion()

  const active = sections.find((s) => s.slug === activeSlug) ?? readySections[0]
  const isActiveReady = active.ready
  const imageCount = active.images?.length ?? 0

  // When user clicks a nav tab, reset image index alongside slug change
  const selectFeature = (slug: string) => {
    setActiveSlug(slug)
    setImageIdx(0)
  }

  // Auto-advance: cycle images within a feature, then hop to next feature
  useEffect(() => {
    if (!isInView || isPaused || prefersReducedMotion || !isActiveReady) return
    if (imageCount === 0) return

    const timer = window.setTimeout(() => {
      if (imageIdx < imageCount - 1) {
        // Next image within the current feature
        setImageIdx(imageIdx + 1)
      } else if (readySections.length > 1) {
        // Last image — advance to next feature and reset image index
        const currentIdx = readySections.findIndex((s) => s.slug === activeSlug)
        const nextIdx = (currentIdx + 1) % readySections.length
        setActiveSlug(readySections[nextIdx].slug)
        setImageIdx(0)
      } else {
        // Only one feature ready — loop its images
        setImageIdx(0)
      }
    }, IMAGE_DWELL_MS)

    return () => window.clearTimeout(timer)
  }, [activeSlug, imageIdx, isInView, isPaused, prefersReducedMotion, isActiveReady, imageCount])

  const shouldShowProgress =
    isActiveReady && !isPaused && isInView && !prefersReducedMotion && imageCount > 0
  const featureDurationMs = Math.max(imageCount, 1) * IMAGE_DWELL_MS

  return (
    <section className="bg-[#F5F6F8] py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Header */}
        <RevealOnScroll className="mx-auto max-w-3xl text-center">
          <motion.p
            variants={revealItem}
            className="text-sm font-heading font-semibold uppercase tracking-wider text-brand-blue"
          >
            The Mobile App
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mt-3 font-display text-3xl font-normal leading-[1.1] tracking-tight text-[#0A1628] md:text-5xl lg:text-6xl"
          >
            Everything residents and owners need,{' '}
            <span className="text-keyword">in one app</span>
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mx-auto mt-5 max-w-2xl text-base md:text-lg leading-relaxed text-brand-graphite-mid"
          >
            Every feature for tenants, owners, and property teams — in one place. Watch it cycle,
            or jump to any feature.
          </motion.p>
        </RevealOnScroll>

        {/* Main showcase card */}
        <div
          ref={containerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          className="mt-8 rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm md:mt-10 md:p-6"
        >
          {/* Mobile: horizontal nav above content */}
          <div className="md:hidden -mx-1 mb-5 overflow-x-auto px-1 pb-2">
            <div
              role="tablist"
              aria-label="Revun app features"
              className="flex min-w-max items-center gap-2"
            >
              {sections.map((s) => (
                <NavItemHorizontal
                  key={s.slug}
                  section={s}
                  isActive={s.slug === activeSlug}
                  onSelect={selectFeature}
                />
              ))}
            </div>
          </div>

          {/* 3-column desktop layout / stacked mobile.
              Image column is given ~1.3fr so the 3-card row (~550px) fits
              with breathing room. Copy column 1fr keeps heading wrapping
              sensible. */}
          <div className="grid gap-6 md:grid-cols-[200px_1.25fr_1fr] md:gap-8 lg:grid-cols-[220px_1.3fr_1fr] lg:gap-10">
            {/* Desktop vertical nav rail */}
            <div className="hidden md:block">
              <p className="px-3 pt-1 pb-2 text-[10px] font-semibold uppercase tracking-wider text-[#555860]/70">
                App features
              </p>
              <div role="tablist" aria-label="Revun app features" className="flex flex-col gap-0.5">
                {sections.map((s) => (
                  <NavItemVertical
                    key={s.slug}
                    section={s}
                    isActive={s.slug === activeSlug}
                    onSelect={selectFeature}
                    showProgress={shouldShowProgress && s.slug === activeSlug}
                    progressDurationMs={featureDurationMs}
                  />
                ))}
              </div>
            </div>

            {/* Image panel — the inner AnimatePresence inside ImageMosaic
                handles all crossfades (image-to-image AND section-to-section)
                because the motion key includes both slug and imageIdx. No
                outer wrapper needed — the hero card stays mounted as a stable
                container so only the image swaps, never the frame. */}
            <div className="md:self-center">
              {isActiveReady ? (
                <ImageMosaic
                  section={active}
                  imageIdx={imageIdx}
                  onImageIdxChange={setImageIdx}
                />
              ) : (
                <ImagePlaceholder section={active} />
              )}
            </div>

            {/* Copy panel — crisper transition on section change */}
            <div className="md:self-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`copy-${active.slug}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.28, ease }}
                >
                  {isActiveReady ? (
                    <CopyPanel section={active} />
                  ) : (
                    <CopyPlaceholder section={active} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
