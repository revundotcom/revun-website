import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Calculator, HelpCircle, Sigma } from 'lucide-react'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema, buildFAQPageSchema } from '@/lib/schema-builders'
import { tools, toolSlugs } from '@/data/tools'
import { CALCULATOR_MAP } from '@/components/tools/calculators'

export function generateStaticParams() {
  return toolSlugs.map((slug) => ({ slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const t = tools[slug]
  if (!t) return { title: 'Tool Not Found | Revun' }
  const url = buildCanonicalUrl(`/tools/${t.slug}`)
  return {
    title: t.metaTitle,
    description: t.description,
    alternates: { canonical: url },
    openGraph: { title: t.metaTitle, description: t.description, url, images: ['/og-default.png'] },
  }
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params
  const t = tools[slug]
  if (!t) notFound()
  const Calc = CALCULATOR_MAP[slug as keyof typeof CALCULATOR_MAP]
  const pageUrl = `https://revun.com/tools/${t.slug}/`

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Tools', url: 'https://revun.com/tools/' },
              { name: t.title, url: pageUrl },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(buildFAQPageSchema(t.faqs.map((f) => ({ question: f.q, answer: f.a })))),
        }}
      />

      {/* Hero */}
      <section className="bg-[#F5F6F8]">
        <div className="mx-auto max-w-3xl px-4 py-12 text-center md:px-6 md:py-16 lg:px-8">
          <p className="mb-4 inline-flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
            <Calculator className="h-4 w-4" />
            {t.category} tool
          </p>
          <h1 className="font-display text-3xl font-extrabold text-[#0A1628] md:text-5xl">{t.title}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[#555860]">{t.intro}</p>
        </div>
      </section>

      {/* Calculator */}
      <section className="bg-white py-10 md:py-14">
        <div className="mx-auto max-w-3xl px-4 md:px-6 lg:px-8">
          {Calc ? <Calc /> : null}
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-border bg-brand-off-white p-4">
            <Sigma className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
            <p className="text-sm text-[#475569]">
              <span className="font-semibold text-brand-graphite">Formula:</span> {t.formula}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white pb-12 md:pb-16">
        <div className="mx-auto max-w-3xl px-4 md:px-6 lg:px-8">
          {t.sections.map((s) => (
            <div key={s.heading} className="mb-10">
              <h2 className="font-heading text-2xl font-bold tracking-tight text-brand-graphite">{s.heading}</h2>
              {s.paragraphs.map((p, i) => (
                <p key={i} className="mt-4 text-base leading-relaxed text-[#475569]">{p}</p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-brand-off-white py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4 md:px-6 lg:px-8">
          <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
            <HelpCircle className="h-4 w-4" />
            FAQ
          </p>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-brand-graphite">Common questions</h2>
          <div className="mt-6 space-y-4">
            {t.faqs.map((f) => (
              <div key={f.q} className="rounded-2xl border border-border bg-white p-6">
                <h3 className="mb-2 font-heading text-base font-bold text-brand-graphite">{f.q}</h3>
                <p className="text-sm leading-relaxed text-[#475569]">{f.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {t.related.map((r) => (
              <Link key={r.href} href={r.href} className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-5 py-3 text-sm font-semibold text-brand-graphite transition-colors hover:border-brand-blue/40">
                {r.label} <ArrowRight className="h-4 w-4 text-brand-blue" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
