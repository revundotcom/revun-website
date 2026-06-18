import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ClipboardCheck, FileText, UserCheck } from 'lucide-react'

import { TeamCard } from '@/components/team/team-card'
import { TEAM } from '@/data/team'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'

const UNSPLASH = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

export const metadata: Metadata = {
  title: 'About Us | Revun',
  description:
    'We are a full-service leasing and tenant placement company built for landlords, property managers, builders, and institutional rental operators.',
  alternates: { canonical: buildCanonicalUrl('/about') },
  openGraph: {
    title: 'About | Revun',
    description:
      'Full-service execution for serious operators across Canada and the United States.',
    url: buildCanonicalUrl('/about'),
  },
}

const VALUES = [
  {
    Icon: UserCheck,
    title: 'Named leads',
    body: 'Every owner-file has a named lead. No anonymous queues, no dropped handoffs.',
  },
  {
    Icon: FileText,
    title: 'Written rationale',
    body: 'Every applicant comes with a written rationale, not a stack of paperwork.',
  },
  {
    Icon: ClipboardCheck,
    title: 'Documented handover',
    body: 'Move-in is a checklist: keys, utilities, insurance, walkthrough. All archived.',
  },
]

const WHAT_WE_DO = [
  'Strategic pricing and polished listing presentation.',
  'Structured showings and disciplined applicant qualification.',
  'A complete, documented move-in handover.',
]

export default function AboutPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'About', url: 'https://revun.com/about/' },
            ]),
          ),
        }}
      />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-[#0A1628] py-24 text-white md:py-32">
        <Image
          src={UNSPLASH('1521737604893-d14cc237f11d', 2400)}
          alt="Team collaborating in a modern office"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0A1628] via-[#0A1628]/85 to-[#0A1628]/55"
        />
        <div className="relative mx-auto max-w-5xl px-6">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#4A91F0]">About</p>
          <h1 className="text-balance font-display text-4xl leading-tight text-white md:text-6xl">
            Full-service execution for serious operators.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85">
            We are a full-service company built for landlords, property managers, builders, and institutional rental operators who refuse to leave the leasing phase to chance.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/meet-the-team/"
              className="inline-flex items-center gap-2 rounded-full bg-[#176FEB] px-6 py-3 text-sm font-bold text-white shadow-cta-glow transition-colors hover:bg-[#0B5AD4]"
            >
              Meet the team <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact/"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/70 hover:bg-white/10"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>

      {/* ── OUR STORY ────────────────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#176FEB]">Our story</p>
          <h2 className="mt-4 font-display text-4xl text-[#0A1628] sm:text-5xl">Why we exist.</h2>
          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
            <blockquote className="relative rounded-2xl border border-[#E5E7EB] bg-[#F5F6F8] p-8 font-display text-2xl italic leading-relaxed text-[#0A1628]">
              <span aria-hidden="true" className="absolute left-6 top-3 font-display text-6xl leading-none text-[#176FEB]/15">“</span>
              <span className="relative">Brokers sell. Managers operate. We were built to obsess over the leasing phase itself.</span>
            </blockquote>
            <div className="space-y-6 text-base leading-relaxed text-[#555860]">
              <p>
                The rental market is busy and fragmented. Brokers are wired to sell. Property managers are wired to operate the years after move-in. Almost nobody is purpose-built for the leasing phase itself.
              </p>
              <p>
                We built our practice for that window. Strategic pricing. Polished listing presentation. Structured showings. Disciplined applicant qualification. A complete move-in handover.
              </p>
              <p className="font-display text-xl italic text-[#176FEB]">
                Owners do not need warmth alone. They need proof the work was done.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO (image + text) ────────────────────────────── */}
      <section className="bg-[#F5F6F8] py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card-hover ring-1 ring-[#E5E7EB]">
              <Image
                src={UNSPLASH('1542744173-8e7e53415bb0', 1400)}
                alt="Team reviewing a portfolio together in a boardroom"
                fill
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0B5AD4]">What we do</p>
              <h2 className="mt-4 font-display text-3xl text-[#0A1628] sm:text-4xl">
                From listing to signed lease — handled.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[#555860]">
                We own the window between an empty unit and a qualified tenant in place. Every step is run to a standard and documented, so owners get a great result and the proof behind it.
              </p>
              <ul className="mt-6 space-y-3">
                {WHAT_WE_DO.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-[15px] leading-relaxed text-[#2C2E33]">
                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-[#176FEB]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#176FEB]">Our values</p>
          <h2 className="mt-4 font-display text-4xl text-[#0A1628] sm:text-5xl">How we work.</h2>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {VALUES.map(({ Icon, title, body }) => (
              <div
                key={title}
                className="group rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#176FEB]/30 hover:shadow-card-hover"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#176FEB]/10 ring-1 ring-[#176FEB]/15">
                  <Icon className="h-6 w-6 text-[#176FEB]" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-[#0A1628]">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#555860]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IMAGE BAND ───────────────────────────────────────────── */}
      <section className="bg-white pb-20 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl sm:aspect-[16/7]">
            <Image
              src={UNSPLASH('1531973576160-7125cd663d86', 2000)}
              alt="Open-concept office where the team works"
              fill
              sizes="(max-width: 1280px) 100vw, 1216px"
              className="object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/85 via-[#0A1628]/35 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-12">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#4A91F0]">In the field</p>
              <h3 className="mt-2 max-w-2xl font-display text-2xl leading-tight text-white sm:text-4xl">
                Boots on the ground in every market we serve.
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM ─────────────────────────────────────────────────── */}
      <section id="team" className="scroll-mt-24 bg-[#F5F6F8] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#555860]">Our team</p>
            <h2 className="mt-4 font-display text-4xl text-[#0A1628] sm:text-5xl">Meet Our Leadership Team.</h2>
            <p className="mt-4 text-base leading-relaxed text-[#555860]">
              The operators and specialists who own every owner-file end to end. Select a profile to see how each one works.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((member) => (
              <TeamCard key={member.slug} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────── */}
      <section className="bg-[#0A1628] py-16 text-white sm:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#4A91F0]">Work with us</p>
          <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl md:text-5xl">Get the right person on your file.</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            Tell us about your property and we will route you to the lead with the right market and asset-class fit, usually within one business day.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact/"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#176FEB] px-6 py-3 text-sm font-bold text-white shadow-cta-glow transition-colors hover:bg-[#0B5AD4]"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
