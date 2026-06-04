import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'
import { glossaryTerms, glossarySlugs } from '@/data/glossary'

export const metadata: Metadata = {
  title: 'Property Management & Real Estate Glossary | Revun',
  description:
    'Clear definitions of property-management and real-estate investing terms, with formulas and worked examples: cap rate, NOI, cash flow, DSCR, and more.',
  alternates: { canonical: buildCanonicalUrl('/glossary') },
}

export default function GlossaryHub() {
  const terms = glossarySlugs.map((s) => glossaryTerms[s])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(buildBreadcrumbSchema([
        { name: 'Home', url: 'https://revun.com/' },
        { name: 'Glossary', url: 'https://revun.com/glossary/' },
      ])) }} />
      <section className="bg-[#F5F6F8]">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center md:px-6 md:py-20 lg:px-8">
          <p className="mb-4 inline-flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
            <BookOpen className="h-4 w-4" /> Glossary
          </p>
          <h1 className="font-display text-3xl font-extrabold text-[#0A1628] md:text-5xl">
            Property management and real estate terms
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[#555860]">
            Plain-English definitions with formulas and worked examples, written for landlords, managers, and investors.
          </p>
        </div>
      </section>
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {terms.map((t) => (
              <Link key={t.slug} href={`/glossary/${t.slug}/`} className="group flex flex-col rounded-2xl border border-border bg-white p-5 transition-colors hover:border-brand-blue/40">
                <h2 className="font-heading text-base font-bold text-brand-graphite">{t.term}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#475569] line-clamp-3">{t.shortDefinition}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue">
                  Read <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
