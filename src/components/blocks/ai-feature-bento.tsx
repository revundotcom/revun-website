'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import {
  Sparkles, Wrench, Navigation, CalendarCheck,
  ShieldCheck, MessageSquare, BarChart3, ArrowRight,
} from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import {
  TriageVisual, GpsVisual, BookingVisual,
  VaultVisual, InboxVisual, BooksVisual,
} from '@/components/blocks/ai-feature-visuals'
import { cn } from '@/lib/utils'

/* ════════════════════════════════════════════════════════════════════════════
   Feature bento

   Visuals are composed in code (see ai-feature-visuals.tsx), not cropped from
   the screenshot library. A 786x1704 phone PNG cropped into a 16/10 card only
   ever shows a thin band at ~50% scale, which is why those cards read small and
   messy. Building at card size keeps the type legible and lets the motion carry
   the idea — the same approach dashboard-preview and product-screenshot-showcase
   already use elsewhere on this site.

   The content in each visual mirrors a real screen 1:1, so nothing here claims a
   capability the app does not have.
   ════════════════════════════════════════════════════════════════════════════ */

type Feature = {
  icon: LucideIcon
  accent: string
  kicker: string
  title: string
  body: string
  caption: string
  Visual: () => React.JSX.Element
  span: string
  wide?: boolean
}

const FEATURES: Feature[] = [
  {
    icon: Wrench,
    accent: '#176FEB',
    kicker: 'AI triage',
    Visual: TriageVisual,
    title: 'Every request read, scoped and priced',
    body:
      'A tenant sends photos and a sentence. AI names the trade, sets the priority, writes the scope of work, and prices it against similar jobs nearby — before anyone on your team opens the ticket.',
    caption: 'Submitted → scoped & priced in seconds',
    span: 'lg:col-span-4',
    wide: true,
  },
  {
    icon: Navigation,
    accent: '#F59E0B',
    kicker: 'Live GPS',
    Visual: GpsVisual,
    title: 'Watch the tech arrive',
    body: 'Owners and tenants follow the route in real time and share their own location back.',
    caption: 'Track · share · arrive on time',
    span: 'lg:col-span-2',
  },
  {
    icon: CalendarCheck,
    accent: '#22C55E',
    kicker: 'Self-serve booking',
    Visual: BookingVisual,
    title: 'Tours book themselves',
    body: 'Renters reserve a unit or schedule a showing mid-scroll. No phone tag, no coordinator.',
    caption: 'Browse → booked in one tap',
    span: 'lg:col-span-2',
  },
  {
    icon: ShieldCheck,
    accent: '#8B5CF6',
    kicker: 'Verified & vaulted',
    Visual: VaultVisual,
    title: 'Every document, checked and encrypted',
    body:
      'Government ID, credit report, income verification, pay stubs, bank statements — captured once, verified, and locked in an encrypted vault the whole file can be approved from.',
    caption: 'One upload · reused across every application',
    span: 'lg:col-span-4',
    wide: true,
  },
  {
    icon: MessageSquare,
    accent: '#14B8A6',
    kicker: 'One inbox',
    Visual: InboxVisual,
    title: 'Tenants, owners and vendors in one thread',
    body: 'Messaging, voice and video scoped to each address, with transcripts on every call.',
    caption: 'Nothing lost to personal phones',
    span: 'lg:col-span-3',
  },
  {
    icon: BarChart3,
    accent: '#EF4444',
    kicker: 'Owner-ready',
    Visual: BooksVisual,
    title: 'Books that close themselves',
    body: 'Income, expenses and net position per property, updated as money moves.',
    caption: 'No spreadsheet, no month-end scramble',
    span: 'lg:col-span-3',
  },
]

function FeatureCard({ f, index }: { f: Feature; index: number }) {
  const Icon = f.icon
  return (
    <motion.article
      variants={revealItem}
      className={cn(
        'group relative flex overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white',
        'shadow-[0_1px_2px_rgba(10,22,40,0.04)] transition-all duration-300',
        'hover:-translate-y-1 hover:border-brand-blue/25 hover:shadow-[0_18px_40px_-16px_rgba(10,22,40,0.22)]',
        f.wide ? 'flex-col md:flex-row' : 'flex-col',
        f.span
      )}
    >
      {/* Copy — centred on wide cards so the taller image column doesn't leave
          a block of dead space under the text */}
      <div
        className={cn(
          'flex flex-col p-6 lg:p-7',
          f.wide && 'md:w-[52%] md:shrink-0 md:justify-center'
        )}
      >
        <div className="flex items-center gap-2">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${f.accent}16` }}
          >
            <Icon className="h-[18px] w-[18px]" style={{ color: f.accent }} aria-hidden="true" />
          </span>
          <span
            className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider"
            style={{ backgroundColor: `${f.accent}12`, color: f.accent }}
          >
            <Sparkles className="h-3 w-3" aria-hidden="true" />
            {f.kicker}
          </span>
        </div>

        <h3 className="mt-4 font-heading text-xl font-bold leading-snug text-[#0A1628] lg:text-[1.35rem]">
          {f.title}
        </h3>
        <p className="mt-2.5 text-base leading-relaxed text-brand-graphite-mid">{f.body}</p>

        <p className="mt-4 flex items-center gap-2 text-sm font-medium text-brand-graphite-mid">
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: f.accent }} aria-hidden="true" />
          {f.caption}
        </p>
      </div>

      {/* Feature visual */}
      <div
        className={cn(
          'relative overflow-hidden',
          f.wide
            ? 'min-h-[240px] flex-1 border-t border-[#E5E7EB] md:border-l md:border-t-0'
            : 'mt-auto aspect-[16/10] w-full border-t border-[#E5E7EB]'
        )}
      >
        <f.Visual />
      </div>
    </motion.article>
  )
}

export default function AiFeatureBento() {
  return (
    <section className="relative overflow-hidden bg-[#F5F6F8] py-10 md:py-14 lg:py-16">
      <div
        className="absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(23,111,235,0.10),transparent_75%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <RevealOnScroll className="mx-auto max-w-3xl text-center">
          <motion.p
            variants={revealItem}
            className="inline-flex items-center gap-2 rounded-full border border-brand-blue/20 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-brand-blue shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            AI across the whole operation
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mt-5 font-display text-3xl font-normal leading-[1.12] text-[#0A1628] text-balance md:text-5xl"
          >
            AI does the busywork.{' '}
            <span className="text-brand-blue">Your team does the work.</span>
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mx-auto mt-4 max-w-2xl text-base text-brand-graphite-mid md:text-lg"
          >
            Not a chatbot bolted onto a dashboard. AI reads maintenance requests, verifies
            documents, books showings and closes the books — inside the same app your tenants,
            owners and technicians already use.
          </motion.p>
        </RevealOnScroll>

        <RevealOnScroll className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:mt-12 lg:grid-cols-6">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} f={f} index={i} />
          ))}
        </RevealOnScroll>

        <RevealOnScroll className="mt-10 flex justify-center">
          <motion.div variants={revealItem}>
            <Link
              href="/features/ai-automation/"
              className="group inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-brand-blue px-7 py-3.5 text-base font-semibold text-white shadow-cta-glow transition-all duration-200 hover:bg-brand-blue-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
            >
              See how the AI works
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </motion.div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
