import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

import { TeamCard } from '@/components/team/team-card'
import { TEAM } from '@/data/team'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'

const UNSPLASH = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

export const metadata: Metadata = {
  title: 'Meet the Team | Revun',
  description: 'The operators, leads, and client-success specialists running the business day-to-day.',
  alternates: { canonical: buildCanonicalUrl('/meet-the-team') },
  openGraph: {
    title: 'Meet the Team | Revun',
    description: 'The operators, leads, and client-success specialists running the business day-to-day.',
    url: buildCanonicalUrl('/meet-the-team'),
  },
}

export default function MeetTheTeamPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Meet the Team', url: 'https://revun.com/meet-the-team/' },
            ]),
          ),
        }}
      />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-[#0A1628] py-24 text-white md:py-32">
        <Image
          src={UNSPLASH('1521737711867-e3b97375f902', 2400)}
          alt="Team collaborating around a meeting table"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-center"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0A1628] via-[#0A1628]/85 to-[#0A1628]/55" />
        <div className="relative mx-auto max-w-5xl px-6">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#4A91F0]">Our people</p>
          <h1 className="text-balance font-display text-4xl leading-tight text-white md:text-6xl">The team behind every owner-file.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85">
            Operators, leads, and client-success specialists running the work end-to-end so landlords and institutional operators do not have to.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#team" className="inline-flex items-center gap-2 rounded-full bg-[#176FEB] px-6 py-3 text-sm font-bold text-white shadow-cta-glow transition-colors hover:bg-[#0B5AD4]">Meet our leadership <ArrowRight className="h-4 w-4" /></a>
            <a href="#join" className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/70 hover:bg-white/10">Join the team</a>
          </div>
        </div>
      </section>

      {/* ── INTRO (image + editorial) ────────────────────────────── */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#176FEB]">How we are built</p>
              <h2 className="mt-3 font-display text-3xl text-[#0A1628] sm:text-4xl md:text-5xl">
                A bench of operators, not a roster of brokers.
              </h2>
              <div className="mt-6 space-y-5 text-base leading-relaxed text-[#555860]">
                <p>The market is busy. Brokers are wired to sell. Managers are wired to operate the years after. Almost nobody is purpose-built for the window in between.</p>
                <p>Our team is structured around that window. Every owner-file has a named lead. Every handoff is logged, and every recommendation comes with the reasoning behind it.</p>
              </div>
            </div>
            <div className="relative aspect-[5/4] overflow-hidden rounded-2xl shadow-card-hover ring-1 ring-[#E5E7EB]">
              <Image
                src={UNSPLASH('1517048676732-d65bc937f952', 1400)}
                alt="Operators reviewing files together"
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM GRID ────────────────────────────────────────────── */}
      <section id="team" className="scroll-mt-24 bg-[#F5F6F8] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#555860]">Our team</p>
            <h2 className="mt-4 font-display text-4xl text-[#0A1628] sm:text-5xl">Meet Our Leadership Team.</h2>
            <p className="mt-4 text-base leading-relaxed text-[#555860]">
              Select any profile to see how each lead works — their focus, track record, and the services they own.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((member) => (
              <TeamCard key={member.slug} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* ── JOIN THE TEAM ────────────────────────────────────────── */}
      <section id="join" className="relative scroll-mt-24 overflow-hidden bg-[#0A1628] py-16 text-white sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#4A91F0]">Join the team</p>
              <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl md:text-5xl">We are hiring across North America.</h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
                We are growing every desk that touches an owner-file. If you take your craft seriously and want to ship work you are proud of, we want to meet you.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/careers/" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#176FEB] px-6 py-3 text-sm font-bold text-white shadow-cta-glow transition-colors hover:bg-[#0B5AD4]">View open roles <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
                <a href="mailto:careers@revun.com" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/60">General application</a>
              </div>
            </div>
            <div className="lg:col-span-5">
              <ul className="space-y-4 rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm">
                {[
                  'Performance-backed comp with clear targets and real upside.',
                  'Educational reimbursement and professional designation fees covered.',
                  'Hybrid schedule with modern collaboration tools.',
                  'Paid community-care days.',
                ].map((p) => (
                  <li key={p} className="flex gap-3"><span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-[#4A91F0]" /><span className="text-sm leading-relaxed text-white/85">{p}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
