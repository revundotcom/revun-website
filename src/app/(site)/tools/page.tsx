import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Calculator } from 'lucide-react'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'
import { tools, toolSlugs } from '@/data/tools'

export const metadata: Metadata = {
  title: 'Free Landlord and Real Estate Calculators | Revun',
  description:
    'Free calculators for landlords and real-estate investors: rent-to-income, prorated rent, cap rate, and cash-on-cash return.',
  alternates: { canonical: buildCanonicalUrl('/tools') },
}

export default function ToolsHub() {
  const list = toolSlugs.map((s) => tools[s])
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Tools', url: 'https://revun.com/tools/' },
            ])
          ),
        }}
      />
      <section className="bg-[#F5F6F8]">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center md:px-6 md:py-20 lg:px-8">
          <p className="mb-4 inline-flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
            <Calculator className="h-4 w-4" />
            Free tools
          </p>
          <h1 className="font-display text-3xl font-extrabold text-[#0A1628] md:text-5xl">
            Calculators for landlords and investors
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[#555860]">
            Fast, free calculators for the numbers you run every week, from screening applicants to sizing up a deal.
          </p>
        </div>
      </section>
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {list.map((t) => (
              <Link key={t.slug} href={`/tools/${t.slug}/`} className="group flex flex-col rounded-2xl border border-border bg-white p-6 transition-colors hover:border-brand-blue/40">
                <Calculator className="h-6 w-6 text-brand-blue" />
                <h2 className="mt-4 font-heading text-lg font-bold text-brand-graphite">{t.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#475569]">{t.description}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue">
                  Open calculator <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
