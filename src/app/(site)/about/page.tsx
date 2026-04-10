import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { AboutHero } from '@/components/blocks/about-hero'
import { OperatorPlatformBlock } from '@/components/blocks/operator-platform-block'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'

export const metadata: Metadata = {
  title: 'About — The Infrastructure Layer for Property Operations',
  description:
    'Revun is the software platform and infrastructure layer behind modern property operations across Canada and the United States. Built for owners, property managers, brokerages, leasing teams, maintenance companies, and REITs.',
  alternates: { canonical: buildCanonicalUrl('/about') },
  openGraph: {
    title: 'About | Revun',
    description:
      'The infrastructure layer for property operations across Canada and the United States.',
    url: buildCanonicalUrl('/about'),
  },
}

const problems = [
  {
    title: "US tools don't understand Canada",
    body: 'Most property operations software is built for the US market. Canadian compliance, provincial regulations, and local payment methods are afterthoughts.',
  },
  {
    title: 'Fragmented tools, fragmented data',
    body: 'Owners, property managers, brokerages, leasing teams, maintenance companies, and REITs juggle 5-8 disconnected tools for leasing, payments, maintenance, and reporting. Data lives in silos. Nothing talks to anything.',
  },
  {
    title: 'No other platform combines it all',
    body: 'No other platform combines property management, brokerage workflows, maintenance operations, rent protection, communications, compliance, and reporting in one infrastructure layer. Revun does.',
  },
] as const

const values = [
  {
    title: 'Infrastructure',
    body: 'We build the foundation layer for property operations, not point solutions. Every feature connects to a shared data model that serves owners, operators, brokerages, and maintenance teams.',
  },
  {
    title: 'Authority',
    body: 'Built by people who understand property operations across Canada and the United States. Provincial and state compliance, local payment rails, market-specific workflows.',
  },
  {
    title: 'Accountability',
    body: 'Honest pricing, no hidden fees, open roadmap. We earn trust through consistent delivery and measurable outcomes for every stakeholder in the property lifecycle.',
  },
  {
    title: 'Scale',
    body: 'From 1 unit to 10,000. The architecture is the same. The experience adapts to your portfolio, team size, and operational complexity.',
  },
] as const

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(buildBreadcrumbSchema([
            { name: 'Home', url: 'https://revun.com/' },
            { name: 'About', url: 'https://revun.com/about/' },
          ])),
        }}
      />
      {/* ── Hero ── */}
      <AboutHero />

      {/* ── Mission ── */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll className="text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              Our Mission
            </p>
            <blockquote className="font-heading text-2xl font-bold leading-snug tracking-tight text-[#2C2E33] md:text-3xl">
              &ldquo;To give every property operation in North America, from a
              single self-managing owner to a national REIT, access to
              institutional-grade software infrastructure.&rdquo;
            </blockquote>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Why Revun Exists ── */}
      <section className="bg-[#F5F6F8] py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              The Problem
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33]">
              Why <span className="text-[#176FEB]">Revun</span> exists
            </h2>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.1}>
            <div className="grid gap-6 md:grid-cols-3">
              {problems.map((p) => (
                <div
                  key={p.title}
                  className="rounded-2xl border border-[#E5E7EB] bg-white p-8 hover:border-[#176FEB]/40"
                >
                  <h3 className="mb-3 font-heading text-lg font-bold text-[#2C2E33]">
                    {p.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#555860]">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              Our Pillars
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33]">
              What we <span className="text-[#176FEB]">stand</span> for
            </h2>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.1}>
            <div className="grid gap-6 md:grid-cols-2">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="rounded-2xl border border-[#E5E7EB] bg-[#F5F6F8] p-8 hover:border-[#176FEB]/40"
                >
                  <h3 className="mb-3 border-l-4 border-l-[#176FEB] pl-4 font-heading text-lg font-bold text-[#2C2E33]">
                    {v.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#555860]">
                    {v.body}
                  </p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Operator vs Platform ── */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll className="text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              Platform, Not Point Solution
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33]">
              What makes Revun <span className="text-[#176FEB]">different</span>
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-[#555860]">
              Revun is the software platform and infrastructure layer behind
              modern property operations. Where other tools solve one piece of
              the puzzle, Revun unifies leasing, payments, maintenance,
              communications, compliance, reporting, and brokerage workflows
              into a single operating system. Owners, property managers,
              brokerages, leasing teams, maintenance companies, and REITs all
              operate from the same connected platform, with role-based
              experiences that adapt to each stakeholder.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <OperatorPlatformBlock />

      {/* ── CTA ── */}
      <section className="bg-[#F5F6F8] py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <h2 className="font-heading font-extrabold text-4xl tracking-tight text-[#0A1628] md:text-5xl">
              Want to <span className="text-[#176FEB]">learn</span> more?
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-[#555860]">
              We would love to hear from you. Whether you are an operator, an
              investor, or just curious about what we are building.
            </p>
            <div className="mt-10">
              <Link
                href="/contact/"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#176FEB] px-8 text-base font-semibold text-white transition-colors hover:bg-[#1461d0]"
              >
                Get in Touch
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}
