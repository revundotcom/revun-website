import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Scale, ShieldCheck } from 'lucide-react'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { stateLaws, stateLawSlugs } from '@/data/state-laws'

export const metadata: Metadata = {
  title: 'Landlord-Tenant Law by State: Deposits, Eviction, Rent | Revun',
  description:
    'Clear, source-verified landlord-tenant law guides by state: security deposit limits and return deadlines, rent rules, notice periods, and the eviction process.',
  alternates: { canonical: buildCanonicalUrl('/laws') },
}

export default function LawsHub() {
  const guides = stateLawSlugs.map((s) => stateLaws[s])
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Landlord-Tenant Law', url: 'https://revun.com/laws/' },
            ])
          ),
        }}
      />

      <section className="bg-[#F5F6F8]">
        <div className="mx-auto max-w-5xl px-4 py-14 text-center md:px-6 md:py-20 lg:px-8">
          <p className="mb-4 inline-flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
            <Scale className="h-4 w-4" />
            Landlord-tenant law by state
          </p>
          <h1 className="font-display text-3xl font-extrabold text-[#0A1628] md:text-5xl">
            Know the rules in every state you operate
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[#555860]">
            Clear, source-verified guides to security deposits, rent rules, notice periods, and the eviction process,
            written for owners and managers. General information, not legal advice.
          </p>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll stagger={0.08}>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {guides.map((g) => (
                <Link
                  key={g.slug}
                  href={`/laws/${g.slug}/`}
                  className="group flex flex-col rounded-2xl border border-border bg-white p-6 transition-colors hover:border-brand-blue/40"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-blue/10 font-heading text-base font-bold text-brand-blue">
                      {g.abbr}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-[#94A3B8]">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      {g.landlordFriendliness}
                    </span>
                  </div>
                  <h2 className="mt-4 font-heading text-lg font-bold text-brand-graphite">{g.state}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[#475569]">
                    Deposits, rent rules, notice periods, and the eviction process in {g.state}.
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue">
                    Read the {g.state} guide
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </RevealOnScroll>
          <p className="mt-8 text-center text-sm text-[#94A3B8]">More state guides are being added.</p>
        </div>
      </section>
    </>
  )
}
