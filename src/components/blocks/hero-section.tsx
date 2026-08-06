'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Map, Heart, Tag, Images, MessageSquare } from 'lucide-react'
import { RotatingBadge } from '@/components/ui/rotating-badge'
import { stagger, fadeUp } from '@/lib/motion'
import { cn } from '@/lib/utils'

/**
 * Annotations pinned to the app screenshot. `top` is the element's real vertical
 * position inside the 786x1704 asset (tab bar sits at y=1540 -> 90%), so each dot
 * lands on the UI it names.
 *
 * `side` drives the breakpoint too: left callouts run off into the column gap and
 * appear from xl. Right callouts run outward past the container, which only clears
 * the viewport from 2xl (measured: at 1536 the far edge lands at 1415px).
 */
const CALLOUTS = [
  { side: 'left',  top: '10%', icon: Map,           color: '#176FEB', title: 'Live map search', body: 'Filter by rent & beds' },
  { side: 'right', top: '24%', icon: Heart,         color: '#EF4444', title: 'Save & compare',  body: 'Shortlist in one tap' },
  { side: 'left',  top: '56%', icon: Tag,           color: '#22C55E', title: 'Rent & specs',    body: 'Priced upfront' },
  { side: 'right', top: '70%', icon: Images,        color: '#8B5CF6', title: 'Photo-first',     body: 'See every room' },
  { side: 'left',  top: '90%', icon: MessageSquare, color: '#14B8A6', title: 'Chat & tours',    body: 'No switching apps' },
] as const

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-grid bg-grid-mask opacity-40" aria-hidden="true" />

      {/* Radial blush glows - weighted right to sit behind the device */}
      <div className="absolute top-[6%] right-[6%] h-[620px] w-[620px] rounded-full bg-[#176FEB]/[0.10] blur-[140px]" aria-hidden="true" />
      <div className="absolute top-[-8%] left-[-6%] h-[500px] w-[500px] rounded-full bg-[#4A91F0]/[0.07] blur-[120px]" aria-hidden="true" />
      <div className="absolute bottom-[-12%] left-[18%] h-[400px] w-[400px] rounded-full bg-[#0B5AD4]/[0.05] blur-[100px]" aria-hidden="true" />

      <motion.div
        className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 pt-10 pb-12 md:px-6 md:pt-14 md:pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch lg:gap-14 lg:px-8 xl:gap-20"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* ─── Left column: copy ─── */}
        <div className="text-center lg:text-left">
          {/* Eyebrow badge */}
          <motion.div variants={fadeUp}>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-border bg-white px-4 py-1.5 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-blue opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-blue" />
              </span>
              <span className="text-base font-medium text-brand-graphite-mid">Built for</span>
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

          {/* H1 */}
          <motion.h1
            variants={fadeUp}
            className="font-display text-4xl font-normal leading-[1.08] tracking-tight text-[#0A1628] text-balance sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4rem]"
          >
            Run your entire property business
            {' '}on <span className="text-brand-blue font-semibold">one system</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-brand-graphite-mid md:text-lg lg:mx-0 lg:text-xl"
          >
            Revun replaces the disconnected software stack behind your property
            business with one infrastructure layer built for Canada, the United
            States, and every workflow in between.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
          >
            <Link
              href="/features/"
              className="inline-flex h-14 w-full sm:w-auto items-center justify-center rounded-xl bg-brand-blue px-8 text-base font-semibold text-white shadow-cta-glow transition-all duration-200 hover:bg-brand-blue-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
            >
              See the Platform
            </Link>
            <Link
              href="/demo/"
              className="inline-flex h-14 w-full sm:w-auto items-center justify-center rounded-xl border border-border bg-white px-8 text-base font-semibold text-brand-graphite transition-all duration-200 hover:border-brand-blue/30 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
            >
              Book a Live Demo
            </Link>
          </motion.div>

          {/* Trust row - wraps freely inside the narrower column */}
          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm text-brand-graphite-mid sm:flex-row lg:justify-start"
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
                    className="h-9 w-9 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <span>
                Built with{' '}
                <span className="font-semibold text-[#0A1628]">owners, PMCs, and brokerages</span>
              </span>
            </div>
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
            <span className="basis-full text-center lg:text-left">
              Across <span className="font-semibold text-[#0A1628]">Canada and the United States</span>
            </span>
          </motion.div>
        </div>

        {/* ─── Right column: the app, in a phone ─── */}
        <motion.div
          variants={fadeUp}
          className="flex justify-center lg:h-full lg:justify-end 2xl:justify-center"
        >
          {/*
            Sizing model, and why it is written this way:
            - below lg the column is stacked, so the device is WIDTH-driven (fixed w, aspect gives h)
            - at lg+ it is HEIGHT-driven: `h-full` resolves against the grid row, and a percentage
              height does not feed back into the row's intrinsic size. So the row height is set by
              the LEFT column alone, and the device lands exactly flush with "Across Canada…".
            `aspect` then derives the width, so it can never grow past the section.
          */}
          <div className="relative aspect-[786/1704] w-[248px] sm:w-[280px] lg:h-full lg:w-auto">
            {/* Stage behind the device: halo + concentric rings, echoing the ecosystem map */}
            <div
              className="absolute left-1/2 top-1/2 -z-10 h-[135%] w-[190%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(23,111,235,0.16),rgba(23,111,235,0.05)_55%,transparent_78%)]"
              aria-hidden="true"
            />
            <div
              className="absolute left-1/2 top-1/2 -z-10 aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-blue/12"
              aria-hidden="true"
            />
            <div
              className="absolute left-1/2 top-1/2 -z-10 aspect-square w-[118%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-brand-blue/15"
              aria-hidden="true"
            />

            {/* Soft pedestal so the device reads as lifted off the page */}
            <div
              className="absolute -bottom-6 left-1/2 h-20 w-[88%] -translate-x-1/2 rounded-[50%] bg-[#0A1628]/22 blur-2xl"
              aria-hidden="true"
            />

            {/* Phone shell — mirrors the IPhoneFrame styling in components/ui/device-frame */}
            <div className="relative h-full w-full rounded-[32px] border-[2.5px] border-[#1a1a1a] bg-[#1a1a1a] p-[6px] shadow-[0_32px_70px_-18px_rgba(10,22,40,0.55),0_8px_24px_-8px_rgba(10,22,40,0.3)]">
              {/* Dynamic Island */}
              <div className="absolute left-1/2 top-[10px] z-10 h-[18px] w-[76px] -translate-x-1/2 rounded-full bg-[#0d0d0d]" />
              {/* Screen */}
              <div className="relative h-full w-full overflow-hidden rounded-[26px] bg-white">
                <Image
                  src="/screenshots/app/home-listings.png"
                  alt="The Revun app showing rental listings with price, beds, baths, and location"
                  fill
                  priority
                  sizes="(max-width: 640px) 248px, (max-width: 1024px) 280px, 340px"
                  className="object-cover object-top"
                />
              </div>
            </div>

            {/*
              Feature callouts. `top` values are the real vertical position of each
              element inside the 786x1704 screenshot, so the dot lands on the thing
              it names. xl-only: below 1280px the gap beside the device is ~168px,
              too narrow for a card + connector without colliding with the copy.
            */}
            {CALLOUTS.map((c, i) => {
              const isLeft = c.side === 'left'
              return (
                <motion.div
                  key={c.title}
                  className={cn(
                    'pointer-events-none absolute top-(--callout-top) hidden items-center',
                    isLeft
                      ? 'right-full translate-x-2 xl:flex'
                      : 'left-full -translate-x-2 flex-row-reverse 2xl:flex'
                  )}
                  style={{ '--callout-top': c.top } as React.CSSProperties}
                  initial={{ opacity: 0, x: isLeft ? -12 : 12 }}
                  animate={{ opacity: 1, x: isLeft ? 8 : -8 }}
                  transition={{ delay: 0.55 + i * 0.1, duration: 0.5, ease: 'easeOut' }}
                >
                  <div className="flex items-center gap-2.5 whitespace-nowrap rounded-xl border border-[#E5E7EB]/80 bg-white/90 py-2.5 pl-2.5 pr-4 shadow-[0_8px_24px_-8px_rgba(10,22,40,0.22)] ring-1 ring-white/60 backdrop-blur-md">
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${c.color}18` }}
                    >
                      <c.icon className="h-4 w-4" style={{ color: c.color }} aria-hidden="true" />
                    </span>
                    <span className="block">
                      <span
                        className="block text-[10px] font-semibold uppercase tracking-wider"
                        style={{ color: c.color }}
                      >
                        {c.title}
                      </span>
                      <span className="mt-0.5 block text-[13px] font-medium leading-snug text-[#0A1628]">
                        {c.body}
                      </span>
                    </span>
                  </div>
                  {/* Short connector into a dot that sits on the device */}
                  <span
                    className="h-px w-7"
                    style={{
                      backgroundImage: `linear-gradient(to ${isLeft ? 'right' : 'left'}, ${c.color}33, ${c.color})`,
                    }}
                    aria-hidden="true"
                  />
                  <span
                    className={cn('relative flex h-2.5 w-2.5', isLeft ? '-ml-[4px]' : '-mr-[4px]')}
                    aria-hidden="true"
                  >
                    <span
                      className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                      style={{ backgroundColor: c.color }}
                    />
                    <span
                      className="relative inline-flex h-2.5 w-2.5 rounded-full ring-[3px] ring-white"
                      style={{ backgroundColor: c.color }}
                    />
                  </span>
                </motion.div>
              )
            })}

            {/* Below xl there is no room for the callouts, so one compact badge stands in */}
            <div className="pointer-events-none absolute -left-16 top-[18%] hidden rounded-xl border border-[#E5E7EB] bg-white/95 px-3.5 py-2.5 shadow-xl backdrop-blur-sm sm:block lg:-left-20 xl:hidden">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-blue">
                On iOS &amp; Android
              </p>
              <p className="mt-0.5 text-sm font-semibold text-[#0A1628]">
                Owners, tenants &amp; techs
              </p>
            </div>
          </div>
        </motion.div>

        {/* AEO quick answer for AI search engines */}
        <p className="sr-only">
          Revun is the infrastructure layer for modern property operations. Leasing,
          payments, maintenance, compliance, communications, accounting, and reporting
          all run in one system. Built natively for Canadian and US regulations including the
          LTB, RTB, TAL, and RTDRS, Revun serves landlords, property managers,
          brokerages, and operators across all Canadian provinces and US states.
        </p>
      </motion.div>
    </section>
  )
}
