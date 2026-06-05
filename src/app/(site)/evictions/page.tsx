import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Scale } from 'lucide-react'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'
import { evictions, evictionSlugs } from '@/data/evictions'

export const metadata: Metadata = {
  title: 'How to Evict a Tenant by State: Process, Timeline, Cost | Revun',
  description:
    'State-by-state eviction guides: notice periods, the step-by-step court process, timelines, costs, and tenant defenses. Clear, source-verified, at a glance.',
  alternates: { canonical: buildCanonicalUrl('/evictions') },
}

export default function EvictionsHub() {
  const list = evictionSlugs.map((s) => evictions[s])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(buildBreadcrumbSchema([
        { name: 'Home', url: 'https://revun.com/' },
        { name: 'Evictions', url: 'https://revun.com/evictions/' },
      ])) }} />
      <section className="bg-[#F5F6F8]">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center md:px-6 md:py-20 lg:px-8">
          <p className="mb-4 inline-flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
            <Scale className="h-4 w-4" /> Eviction guides by state
          </p>
          <h1 className="font-display text-3xl font-extrabold text-[#0A1628] md:text-5xl">
            How to evict a tenant, by state
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[#555860]">
            The notice periods, court steps, timelines, and costs for a legal eviction in each state. Answer-first and source-verified. General information, not legal advice.
          </p>
        </div>
      </section>
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((e) => (
              <Link key={e.slug} href={`/evictions/${e.slug}/`} className="group flex items-center justify-between rounded-2xl border border-border bg-white p-5 transition-colors hover:border-brand-blue/40">
                <span className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue/10 font-heading text-sm font-bold text-brand-blue">{e.abbr}</span>
                  <span>
                    <span className="block font-heading text-base font-bold text-brand-graphite">{e.state}</span>
                    <span className="block text-xs text-[#94A3B8]">{e.atAGlance.typicalTimeframe}</span>
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 text-brand-blue transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
