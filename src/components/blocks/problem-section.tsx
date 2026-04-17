'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import { ArrowRight } from 'lucide-react'

/* ---------------------------------------------------------------------------
 * Pain chapter data
 * ------------------------------------------------------------------------- */

const painPoints = [
  {
    tag: 'Operations',
    stat: '5–8',
    statLabel: 'Tools per PM',
    title: 'Property managers juggle five to eight disconnected tools every day',
    description:
      'CRM, email, calendars, forms, spreadsheets, and payment platforms. Nothing talks to anything else. Context switching alone eats hours each week.',
  },
  {
    tag: 'Data',
    stat: '0',
    statLabel: 'Sources of truth',
    title: 'There is no single source of truth for tenants, units, or money',
    description:
      'Records live in silos. Nothing syncs in real time. Teams duplicate work, entries drift out of date, and leadership makes decisions on stale numbers.',
  },
  {
    tag: 'Risk',
    stat: '4x',
    statLabel: 'Rule changes per year',
    title: 'Provincial rules shift quarterly and manual tracking quietly fails',
    description:
      'Notice periods, deposit limits, and reporting requirements move constantly. Missed deadlines create real liability and slow-burn legal exposure.',
  },
  {
    tag: 'Experience',
    stat: '32%',
    statLabel: 'Trust decline',
    title: 'Tenants and owners feel the chaos long before the team admits it',
    description:
      'Slow responses, lost maintenance tickets, and zero transparency erode trust month after month. Churn follows quietly, and reviews tell the rest.',
  },
]

/* ---------------------------------------------------------------------------
 * Cinematic slideshow at the top of the section
 * ------------------------------------------------------------------------- */

interface Scenario {
  time: string
  image: string
  imageAlt: string
  headline: string[]
  caption: string
  stat: { value: string; label: string }
  toolChaos: string[]
}

const scenarios: Scenario[] = [
  {
    time: 'Monday, 9:04 AM',
    image:
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=2000&q=85',
    imageAlt: 'A desk cluttered with phones, paperwork, and coffee, the morning chaos',
    headline: ['Seven tabs.', 'Three tenants waiting.', 'Nothing connected.'],
    caption:
      'Every disconnected tool quietly taxes your team, your tenants, and your bottom line.',
    stat: { value: '14h', label: 'lost per week to tool switching' },
    toolChaos: ['CRM', 'Email', 'Sheets', 'Slack', 'PDF', 'Calendar', 'Stripe'],
  },
  {
    time: 'Tuesday, 2:41 PM',
    image:
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=2000&q=85',
    imageAlt: 'A stressed property manager on phone calls juggling requests',
    headline: ['Five missed messages.', 'Two lost work orders.', 'One angry owner.'],
    caption:
      'Tenant requests arrive over text, email, and voicemail, and die in the gaps between systems.',
    stat: { value: '38%', label: 'of tenant messages go unanswered' },
    toolChaos: ['iMessage', 'Gmail', 'Voicemail', 'Notes', 'Helpdesk'],
  },
  {
    time: 'Friday, 4:58 PM',
    image:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=2000&q=85',
    imageAlt: 'Contracts and compliance paperwork spread across a desk',
    headline: ['Notice deadline missed.', 'Wrong provincial clause.', 'Legal exposure.'],
    caption:
      'Provincial and state rules change quarterly. Manual tracking turns small oversights into real liability.',
    stat: { value: '$2.4k', label: 'average compliance fine per missed notice' },
    toolChaos: ['LTB', 'RTB', 'TAL', 'Fair Housing', 'Word Doc'],
  },
]

function ChaosSlideshow() {
  const [idx, setIdx] = useState(0)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    timer.current = setInterval(() => setIdx((i) => (i + 1) % scenarios.length), 5500)
    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [])

  const s = scenarios[idx]

  return (
    <div className="relative mt-12 overflow-hidden rounded-3xl border border-border bg-[#0A1628] shadow-[0_30px_80px_-30px_rgba(10,22,40,0.4)]">
      {/* Image + headline area */}
      <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
        {/* Crossfade the image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={s.image}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={s.image}
              alt={s.imageAlt}
              fill
              priority={idx === 0}
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1100px"
            />
          </motion.div>
        </AnimatePresence>

        {/* Left-weighted editorial gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(10,22,40,0.92) 0%, rgba(10,22,40,0.7) 45%, rgba(10,22,40,0.35) 100%)',
          }}
          aria-hidden="true"
        />

        {/* Live chip (top-left) */}
        <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm md:left-10 md:top-10">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4A91F0] opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#4A91F0]" />
          </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={s.time}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.3 }}
            >
              {s.time}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Floating tool chaos chips (top-right) */}
        <div className="pointer-events-none absolute right-6 top-6 hidden max-w-[280px] flex-wrap justify-end gap-1.5 md:right-10 md:top-10 md:flex">
          <AnimatePresence mode="popLayout">
            {s.toolChaos.map((tool, i) => (
              <motion.span
                key={`${idx}-${tool}`}
                initial={{ opacity: 0, y: -6, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.35, delay: 0.6 + i * 0.08 }}
                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium text-white/60 backdrop-blur-sm"
              >
                {tool}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>

        {/* Centered editorial headline */}
        <div className="absolute inset-y-0 left-0 flex w-full max-w-3xl flex-col justify-center px-6 md:px-10 lg:px-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={s.headline.join('|')}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-display text-3xl font-normal leading-[1.05] text-white md:text-5xl lg:text-6xl">
                {s.headline[0]}
                <br />
                <span className="text-white/80">{s.headline[1]}</span>
                <br />
                <span className="text-white/60">{s.headline[2]}</span>
              </p>
              <p className="mt-6 max-w-md text-base leading-relaxed text-white/70">
                {s.caption}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slideshow dots (bottom-left) */}
        <div className="absolute bottom-6 left-6 flex items-center gap-2 md:bottom-10 md:left-10">
          {scenarios.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className="group relative h-1 overflow-hidden rounded-full bg-white/20 transition-all"
              style={{ width: i === idx ? 40 : 14 }}
              aria-label={`Scenario ${i + 1}`}
            >
              {i === idx && (
                <motion.span
                  key={`bar-${idx}`}
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  transition={{ duration: 5.5, ease: 'linear' }}
                  className="absolute inset-0 bg-white"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom stats strip + CTA */}
      <div className="grid border-t border-white/10 md:grid-cols-[1fr_auto] md:items-stretch">
        <div className="grid grid-cols-1 divide-y divide-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">
          {scenarios.map((sc, i) => (
            <button
              key={sc.time}
              onClick={() => setIdx(i)}
              className={`group relative flex flex-col gap-1 px-6 py-5 text-left transition-colors md:px-8 md:py-7 ${
                i === idx ? 'bg-white/5' : 'hover:bg-white/[0.03]'
              }`}
            >
              <div className="flex items-baseline gap-3">
                <span
                  className="font-heading text-3xl font-bold transition-colors md:text-4xl"
                  style={{ color: i === idx ? '#4A91F0' : 'rgba(255,255,255,0.5)' }}
                >
                  {sc.stat.value}
                </span>
                <span className="text-xs uppercase tracking-wider text-white/50">
                  Hidden cost
                </span>
              </div>
              <p className="text-sm leading-snug text-white/70">{sc.stat.label}</p>
              <span
                className="absolute bottom-0 left-0 h-[2px] bg-[#4A91F0] transition-all duration-300"
                style={{ width: i === idx ? '100%' : '0%' }}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
        <a
          href="#ecosystem"
          className="group flex items-center justify-between gap-4 border-t border-white/10 bg-[#0A1628] px-6 py-5 text-sm font-semibold text-white/90 transition-colors hover:bg-white/[0.04] md:min-w-[280px] md:border-l md:border-t-0 md:px-7"
        >
          <span>See how Revun replaces the mess</span>
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-blue transition-transform duration-300 group-hover:translate-x-1">
            <ArrowRight className="h-3.5 w-3.5 text-white" />
          </span>
        </a>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------------------
 * Chapter visualizations (one per pain point)
 * ------------------------------------------------------------------------- */

const TOOL_CHIPS = [
  { label: 'CRM', x: 8, y: 18 },
  { label: 'Gmail', x: 62, y: 8 },
  { label: 'Sheets', x: 30, y: 46 },
  { label: 'Calendar', x: 72, y: 54 },
  { label: 'Stripe', x: 10, y: 72 },
  { label: 'PDF', x: 48, y: 80 },
  { label: 'Slack', x: 82, y: 28 },
]

const CHIP_LINES: Array<[number, number]> = [
  [0, 1],
  [0, 2],
  [1, 6],
  [2, 3],
  [2, 4],
  [3, 5],
  [4, 5],
  [5, 6],
  [1, 3],
]

function OperationsVisual() {
  return (
    <div className="relative h-full w-full">
      <svg
        viewBox="0 0 400 300"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {CHIP_LINES.map(([a, b], i) => {
          const A = TOOL_CHIPS[a]
          const B = TOOL_CHIPS[b]
          const x1 = (A.x / 100) * 400 + 36
          const y1 = (A.y / 100) * 300 + 14
          const x2 = (B.x / 100) * 400 + 36
          const y2 = (B.y / 100) * 300 + 14
          return (
            <motion.line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#176FEB"
              strokeOpacity={0.45}
              strokeWidth={1}
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.15 + i * 0.06 }}
            />
          )
        })}
      </svg>

      {TOOL_CHIPS.map((chip, i) => (
        <motion.div
          key={chip.label}
          initial={{ opacity: 0, y: 6, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, delay: i * 0.05 }}
          className="absolute flex items-center rounded-full border border-[#E5E7EB] bg-white px-3 py-1.5 shadow-[0_2px_6px_rgba(10,22,40,0.06)]"
          style={{
            left: `${chip.x}%`,
            top: `${chip.y}%`,
            fontSize: '11px',
            color: '#0A1628',
            fontWeight: 600,
            letterSpacing: '0.01em',
          }}
        >
          {chip.label}
        </motion.div>
      ))}
    </div>
  )
}

const SILO_HIGHLIGHTS: Record<number, number[]> = {
  0: [0, 4],
  1: [1, 3],
  2: [2, 5],
}
const SILO_LABELS = ['CRM', 'Pay', 'Maint']

function DataVisual() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex items-end gap-10 md:gap-14">
        {SILO_LABELS.map((label, siloIdx) => {
          const highlights = SILO_HIGHLIGHTS[siloIdx]
          return (
            <div key={label} className="flex flex-col items-center gap-3">
              <div className="flex flex-col gap-1.5">
                {Array.from({ length: 6 }).map((_, row) => {
                  const lit = highlights.includes(row)
                  return (
                    <motion.div
                      key={row}
                      initial={{ opacity: 0, scaleX: 0.4 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: siloIdx * 0.1 + row * 0.04,
                      }}
                      style={{
                        width: 96,
                        height: 2.5,
                        background: lit ? '#176FEB' : '#E5E7EB',
                        borderRadius: 2,
                        transformOrigin: 'left',
                      }}
                    />
                  )
                })}
              </div>
              <span
                className="rounded-full bg-[#EEF0F3] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]"
                style={{ color: '#555860' }}
              >
                {label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const ALERT_DATES = new Set([3, 9, 14, 21, 26])

function RiskVisual() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="grid grid-cols-7 gap-1.5 md:gap-2">
        {Array.from({ length: 28 }).map((_, i) => {
          const lit = ALERT_DATES.has(i)
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: i * 0.015 }}
              className="flex items-center justify-center rounded-md"
              style={{
                width: 30,
                height: 30,
                background: lit ? '#176FEB' : '#FFFFFF',
                border: lit ? 'none' : '1px solid #E5E7EB',
                color: lit ? '#FFFFFF' : '#9097A3',
                fontSize: 11,
                fontWeight: 600,
                boxShadow: lit ? '0 0 16px rgba(23,111,235,0.4)' : 'none',
              }}
            >
              {lit ? '!' : i + 1}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

const TRUST_BARS = [95, 88, 82, 76, 68, 62, 54, 48, 42, 36, 30, 24]

function ExperienceVisual() {
  const max = 100
  return (
    <div className="relative h-full w-full">
      {/* legend */}
      <div
        className="absolute left-0 top-0 z-10 text-[10px] font-semibold uppercase tracking-[0.14em]"
        style={{ color: '#555860' }}
      >
        Trust score, 12 months
      </div>

      {/* guide lines */}
      <div className="absolute inset-0" aria-hidden="true">
        {[25, 50, 75].map((pct) => (
          <div
            key={pct}
            className="absolute left-0 right-0"
            style={{
              bottom: `${pct}%`,
              height: 0,
              borderTop: '1px dotted #E5E7EB',
            }}
          />
        ))}
      </div>

      {/* trend line */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <motion.line
          x1="2"
          y1="8"
          x2="98"
          y2="88"
          stroke="#176FEB"
          strokeOpacity={0.55}
          strokeWidth={0.6}
          strokeDasharray="1.5 1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, delay: 0.4 }}
        />
      </svg>

      {/* bars */}
      <div className="absolute inset-0 flex items-end gap-1 pt-6">
        {TRUST_BARS.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${(h / max) * 100}%` }}
            transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 rounded-t-sm"
            style={{
              background: '#176FEB',
              opacity: 1 - i * 0.055,
            }}
          />
        ))}
      </div>
    </div>
  )
}

function ChapterVisual({ idx }: { idx: number }) {
  if (idx === 0) return <OperationsVisual />
  if (idx === 1) return <DataVisual />
  if (idx === 2) return <RiskVisual />
  return <ExperienceVisual />
}

/* ---------------------------------------------------------------------------
 * Tabbed chapter panel
 * ------------------------------------------------------------------------- */

function PainChapters() {
  const [active, setActive] = useState(0)
  const chapter = painPoints[active]

  return (
    <div className="mt-20">
      {/* tab bar */}
      <div className="border-b border-border">
        <div className="flex flex-wrap gap-x-6 gap-y-2 md:gap-x-10">
          {painPoints.map((p, i) => {
            const isActive = i === active
            return (
              <button
                key={p.tag}
                type="button"
                onClick={() => setActive(i)}
                className="group relative flex items-baseline gap-3 pb-4 pt-2 text-left transition-colors"
              >
                <span
                  className={`font-display text-2xl font-normal leading-none transition-colors ${
                    isActive ? 'text-brand-blue' : 'text-[#9097A3]'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className={`text-xs font-heading font-semibold uppercase tracking-[0.18em] transition-colors ${
                    isActive ? 'text-[#0A1628]' : 'text-[#555860] group-hover:text-[#0A1628]'
                  }`}
                >
                  {p.tag}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="chapter-underline"
                    className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-brand-blue"
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* content */}
      <div className="mt-10 md:mt-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={chapter.tag}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="grid items-start gap-10 md:grid-cols-[1.05fr_1fr] md:gap-16"
          >
            {/* left */}
            <div>
              <p className="text-xs font-heading font-semibold uppercase tracking-[0.2em] text-brand-blue">
                Chapter {String(active + 1).padStart(2, '0')} of 04, {chapter.tag}
              </p>
              <h4
                className="mt-5 font-display text-4xl font-normal text-[#0A1628] md:text-[56px]"
                style={{ lineHeight: 1.05, letterSpacing: '-0.01em' }}
              >
                {chapter.title}.
              </h4>
              <p className="mt-6 max-w-xl text-[18px] leading-relaxed text-brand-graphite-mid">
                {chapter.description}
              </p>

              <div className="mt-8 flex items-end gap-5 border-t border-border pt-6">
                <span className="font-display text-5xl font-normal leading-none text-brand-blue md:text-6xl">
                  {chapter.stat}
                </span>
                <span className="pb-1 text-xs font-heading font-semibold uppercase tracking-[0.18em] text-brand-graphite-mid">
                  {chapter.statLabel}
                </span>
              </div>
            </div>

            {/* right */}
            <div className="h-[260px] w-full md:h-[320px]">
              <ChapterVisual idx={active} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* progress rail */}
      <div className="mt-14 flex items-center gap-6">
        <span className="text-[10px] font-heading font-semibold uppercase tracking-[0.2em] text-brand-graphite-mid">
          Progress
        </span>
        <div className="flex flex-1 items-center gap-2">
          {painPoints.map((_, i) => {
            const filled = i <= active
            return (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Go to chapter ${i + 1}`}
                className="group flex-1"
              >
                <span
                  className="block h-[3px] w-full overflow-hidden rounded-full"
                  style={{ background: '#E5E7EB' }}
                >
                  <motion.span
                    className="block h-full"
                    style={{ background: '#176FEB' }}
                    initial={false}
                    animate={{ width: filled ? '100%' : '0%' }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                </span>
              </button>
            )
          })}
        </div>
        <span className="font-display text-sm text-[#0A1628]">
          {String(active + 1).padStart(2, '0')} / 04
        </span>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------------------
 * Section wrapper
 * ------------------------------------------------------------------------- */

export default function ProblemSection() {
  return (
    <section className="relative overflow-hidden bg-brand-off-white py-12 md:py-16">
      <div className="absolute inset-0 bg-grid bg-grid-mask opacity-[0.03]" aria-hidden="true" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-[#176FEB]/[0.04] blur-[140px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <motion.p
            variants={revealItem}
            className="text-sm font-heading font-semibold uppercase tracking-wider text-brand-blue"
          >
            The Problem
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mt-3 font-display text-4xl font-normal text-[#0A1628] md:text-5xl"
          >
            Property businesses break under{' '}
            <span className="text-keyword">disconnected systems</span>
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mx-auto mt-4 max-w-xl text-lg text-brand-graphite-mid"
          >
            Most operators run their business on a patchwork of tools that were
            never designed to work together. The result is wasted hours,
            compliance risk, and frustrated stakeholders.
          </motion.p>
        </RevealOnScroll>

        <RevealOnScroll>
          <ChaosSlideshow />
        </RevealOnScroll>

        <PainChapters />
      </div>
    </section>
  )
}
