import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, FileText } from 'lucide-react'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'
import { forms, formSlugs } from '@/data/forms'

export const metadata: Metadata = {
  title: 'State Residential Lease Agreement Requirements | Revun',
  description:
    'State-by-state guides to residential lease agreements: required disclosures, mandatory and prohibited clauses, and a compliant template for each state.',
  alternates: { canonical: buildCanonicalUrl('/forms') },
}

export default function FormsHub() {
  const list = formSlugs.map((s) => forms[s])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(buildBreadcrumbSchema([
        { name: 'Home', url: 'https://revun.com/' },
        { name: 'Lease Forms', url: 'https://revun.com/forms/' },
      ])) }} />
      <section className="bg-[#F5F6F8]">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center md:px-6 md:py-20 lg:px-8">
          <p className="mb-4 inline-flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
            <FileText className="h-4 w-4" /> Lease forms by state
          </p>
          <h1 className="font-display text-3xl font-extrabold text-[#0A1628] md:text-5xl">
            Residential lease agreement requirements by state
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[#555860]">
            What every state requires in a residential lease: disclosures, mandatory clauses, and terms to avoid. General information, not legal advice.
          </p>
        </div>
      </section>
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((f) => (
              <Link key={f.slug} href={`/forms/${f.slug}/`} className="group flex items-center justify-between rounded-2xl border border-border bg-white p-5 transition-colors hover:border-brand-blue/40">
                <span className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue/10 font-heading text-sm font-bold text-brand-blue">{f.abbr}</span>
                  <span className="font-heading text-base font-bold text-brand-graphite">{f.state}</span>
                </span>
                <ArrowRight className="h-4 w-4 text-brand-blue transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-[#94A3B8]">More state lease guides are being added.</p>
        </div>
      </section>
    </>
  )
}
