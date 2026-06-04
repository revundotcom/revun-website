import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, BookOpen, HelpCircle, Lightbulb } from 'lucide-react'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema, buildFAQPageSchema } from '@/lib/schema-builders'
import { glossaryTerms, glossarySlugs, relatedSlug } from '@/data/glossary'

export function generateStaticParams() {
  return glossarySlugs.map((slug) => ({ slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const t = glossaryTerms[slug]
  if (!t) return { title: 'Term Not Found | Revun' }
  const url = buildCanonicalUrl(`/glossary/${t.slug}`)
  return {
    title: t.metaTitle,
    description: t.description,
    alternates: { canonical: url },
    openGraph: { title: t.metaTitle, description: t.description, url },
  }
}

function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((p, i) =>
        p.startsWith('**') && p.endsWith('**') ? (
          <strong key={i} className="font-semibold text-brand-graphite">{p.slice(2, -2)}</strong>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </>
  )
}

export default async function GlossaryTermPage({ params }: Props) {
  const { slug } = await params
  const t = glossaryTerms[slug]
  if (!t) notFound()
  const pageUrl = `https://revun.com/glossary/${t.slug}/`

  /* DefinedTerm schema for the term itself. */
  const definedTerm = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: t.term,
    description: t.shortDefinition,
    inDefinedTermSet: 'https://revun.com/glossary/',
    url: pageUrl,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(buildBreadcrumbSchema([
        { name: 'Home', url: 'https://revun.com/' },
        { name: 'Glossary', url: 'https://revun.com/glossary/' },
        { name: t.term, url: pageUrl },
      ])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(definedTerm) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(buildFAQPageSchema(t.faqs.map((f) => ({ question: f.q, answer: f.a })))) }} />

      <section className="bg-[#F5F6F8]">
        <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16 lg:px-8">
          <p className="mb-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
            <BookOpen className="h-4 w-4" />
            {t.category} term
          </p>
          <h1 className="font-display text-3xl font-extrabold text-[#0A1628] md:text-5xl">{t.term}</h1>
          <p className="mt-6 text-lg leading-relaxed text-[#475569]">{t.shortDefinition}</p>
        </div>
      </section>

      <article className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4 md:px-6 lg:px-8">
          {t.body.flatMap((p, i) => p.split(/\n\n+/).map((para, j) => (
            <p key={`${i}-${j}`} className="mb-5 text-base leading-relaxed text-[#475569]"><Rich text={para} /></p>
          )))}

          <div className="mt-2 rounded-2xl border border-brand-blue/30 bg-brand-blue/5 p-6">
            <p className="mb-2 inline-flex items-center gap-2 text-sm font-bold text-brand-blue">
              <Lightbulb className="h-4 w-4" /> Worked example
            </p>
            <p className="text-sm leading-relaxed text-[#334155]"><Rich text={t.example} /></p>
          </div>

          {t.relatedTerms?.length > 0 && (
            <div className="mt-8">
              <h2 className="font-heading text-lg font-bold text-brand-graphite">Related terms</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {t.relatedTerms.map((rt) => {
                  const s = relatedSlug(rt)
                  return s ? (
                    <Link key={rt} href={`/glossary/${s}/`} className="rounded-lg border border-border bg-brand-off-white px-3 py-1.5 text-sm text-brand-blue transition-colors hover:border-brand-blue/40">
                      {rt}
                    </Link>
                  ) : (
                    <span key={rt} className="rounded-lg border border-border bg-brand-off-white px-3 py-1.5 text-sm text-[#475569]">{rt}</span>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </article>

      <section className="bg-brand-off-white py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4 md:px-6 lg:px-8">
          <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
            <HelpCircle className="h-4 w-4" /> FAQ
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
          <Link href="/glossary/" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue">
            Browse the full glossary <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
