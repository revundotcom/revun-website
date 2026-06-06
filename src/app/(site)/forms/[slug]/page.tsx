import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, FileText, Check, Ban, Lightbulb, HelpCircle, AlertCircle } from 'lucide-react'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema, buildFAQPageSchema, buildArticleSchema } from '@/lib/schema-builders'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { forms, formSlugs } from '@/data/forms'

export function generateStaticParams() {
  return formSlugs.map((slug) => ({ slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const f = forms[slug]
  if (!f) return { title: 'Form Guide Not Found | Revun' }
  const url = buildCanonicalUrl(`/forms/${f.slug}`)
  return {
    title: f.metaTitle,
    description: f.description,
    alternates: { canonical: url },
    openGraph: { title: f.metaTitle, description: f.description, url, type: 'article' },
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

export default async function FormPageView({ params }: Props) {
  const { slug } = await params
  const f = forms[slug]
  if (!f) notFound()
  const pageUrl = `https://revun.com/forms/${f.slug}/`

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(buildBreadcrumbSchema([
        { name: 'Home', url: 'https://revun.com/' },
        { name: 'Lease Forms', url: 'https://revun.com/forms/' },
        { name: `${f.state} Residential Lease Agreement`, url: pageUrl },
      ])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(buildArticleSchema({
        headline: `${f.state} Residential Lease Agreement Requirements`,
        description: f.description, datePublished: '2026-06-04', dateModified: '2026-06-04',
        url: pageUrl, category: 'Lease Forms',
      })) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(buildFAQPageSchema(f.faqs.map((q) => ({ question: q.q, answer: q.a })))) }} />

      <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Lease Forms', href: '/forms/' }, { name: f.state }]} />

      {/* Hero */}
      <section className="bg-[#F5F6F8]">
        <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16 lg:px-8">
          <p className="mb-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
            <FileText className="h-4 w-4" /> {f.state} ({f.abbr}) lease form
          </p>
          <h1 className="font-display text-3xl font-extrabold text-[#0A1628] md:text-5xl">
            {f.state} Residential Lease Agreement
          </h1>
          {f.quickAnswer ? (
            <div className="mt-6 rounded-2xl border border-brand-blue/30 bg-brand-blue/5 p-5 md:p-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-blue">Quick answer</p>
              <p className="text-base leading-relaxed text-[#334155]"><Rich text={f.quickAnswer} /></p>
            </div>
          ) : (
            <p className="mt-6 text-lg leading-relaxed text-[#475569]"><Rich text={f.intro} /></p>
          )}
        </div>
      </section>

      {/* Lead-capture CTA */}
      <section className="bg-white pt-10">
        <div className="mx-auto max-w-3xl px-4 md:px-6 lg:px-8">
          <div className="rounded-2xl border border-brand-blue/30 bg-brand-blue/5 p-6 md:p-8">
            <h2 className="font-heading text-lg font-bold text-brand-graphite">Build a compliant {f.state} lease in minutes</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#475569]">
              Revun generates a {f.state}-ready lease with the required disclosures and clauses built in, then handles
              e-signature, rent, and renewals on the same platform.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/demo/" className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-brand-blue px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-dark">
                Get the {f.state} lease template <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={`/laws/${f.slug.replace('-residential-lease-agreement','-landlord-tenant-law')}/`} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border px-6 text-sm font-semibold text-brand-graphite">
                {f.state} landlord-tenant law
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Required disclosures */}
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll>
            <h2 className="font-heading text-2xl font-bold tracking-tight text-brand-graphite">Required disclosures</h2>
            <div className="mt-6 space-y-4">
              {f.requiredDisclosures.map((d) => (
                <div key={d.name} className="rounded-2xl border border-border bg-brand-off-white p-5">
                  <h3 className="font-heading text-base font-bold text-brand-graphite">{d.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#475569]"><Rich text={d.detail} /></p>
                </div>
              ))}
            </div>
          </RevealOnScroll>

          {/* Mandatory clauses */}
          <RevealOnScroll className="mt-12">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-brand-graphite">Clauses your lease should include</h2>
            <ul className="mt-5 space-y-3">
              {f.mandatoryClauses.map((c) => (
                <li key={c} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <span className="text-base leading-relaxed text-[#334155]"><Rich text={c} /></span>
                </li>
              ))}
            </ul>
          </RevealOnScroll>

          {/* Prohibited */}
          <RevealOnScroll className="mt-12">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-brand-graphite">Clauses to avoid in {f.state}</h2>
            <ul className="mt-5 space-y-3">
              {f.prohibitedTerms.map((c) => (
                <li key={c} className="flex items-start gap-3">
                  <Ban className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
                  <span className="text-base leading-relaxed text-[#334155]"><Rich text={c} /></span>
                </li>
              ))}
            </ul>
          </RevealOnScroll>

          {/* Best practices */}
          {f.bestPractices?.length > 0 && (
            <RevealOnScroll className="mt-12">
              <h2 className="font-heading text-2xl font-bold tracking-tight text-brand-graphite">Drafting tips</h2>
              <ul className="mt-5 space-y-3">
                {f.bestPractices.map((c) => (
                  <li key={c} className="flex items-start gap-3">
                    <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
                    <span className="text-base leading-relaxed text-[#334155]"><Rich text={c} /></span>
                  </li>
                ))}
              </ul>
            </RevealOnScroll>
          )}

          {/* Statute + disclaimer */}
          <div className="mt-12 rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <p className="flex items-start gap-3 text-sm leading-relaxed text-[#78562a]">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
              <span>
                General information, not legal advice. Governing statute:{' '}
                <a href={f.statuteUrl} target="_blank" rel="noopener noreferrer" className="font-semibold underline">{f.statute}</a>.
                Confirm current requirements or consult an attorney before finalizing a lease.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-brand-off-white py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4 md:px-6 lg:px-8">
          <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
            <HelpCircle className="h-4 w-4" /> {f.state} lease FAQ
          </p>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-brand-graphite">Common questions</h2>
          <div className="mt-6 space-y-4">
            {f.faqs.map((q) => (
              <div key={q.q} className="rounded-2xl border border-border bg-white p-6">
                <h3 className="mb-2 font-heading text-base font-bold text-brand-graphite">{q.q}</h3>
                <p className="text-sm leading-relaxed text-[#475569]">{q.a}</p>
              </div>
            ))}
          </div>
          <Link href="/forms/" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue">
            All state lease forms <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
