import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowRight, ShieldCheck, Scale, FileText, AlertCircle, HelpCircle, Building2, Users, DollarSign, MapPin } from 'lucide-react'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema, buildFAQPageSchema, buildArticleSchema } from '@/lib/schema-builders'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { stateLaws, stateLawSlugs } from '@/data/state-laws'

export function generateStaticParams() {
  return stateLawSlugs.map((slug) => ({ slug }))
}

/* Render **bolded** key phrases inside body copy as <strong>. */
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('**') && p.endsWith('**') ? (
          <strong key={i} className="font-semibold text-brand-graphite">
            {p.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </>
  )
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const law = stateLaws[slug]
  if (!law) return { title: 'Guide Not Found | Revun' }
  const url = buildCanonicalUrl(`/laws/${law.slug}`)
  return {
    title: law.metaTitle,
    description: law.description,
    alternates: { canonical: url },
    openGraph: { title: law.metaTitle, description: law.description, url, type: 'article' },
  }
}

export default async function StateLawPage({ params }: Props) {
  const { slug } = await params
  const law = stateLaws[slug]
  if (!law) notFound()

  const pageUrl = `https://revun.com/laws/${law.slug}/`

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Landlord-Tenant Law', url: 'https://revun.com/laws/' },
              { name: `${law.state} Landlord-Tenant Law`, url: pageUrl },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildArticleSchema({
              headline: `${law.state} Landlord-Tenant Law`,
              description: law.description,
              datePublished: law.reviewedDate,
              dateModified: law.reviewedDate,
              url: pageUrl,
              category: 'Landlord-Tenant Law',
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildFAQPageSchema(law.faqs.map((f) => ({ question: f.q, answer: f.a })))
          ),
        }}
      />

      <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Landlord-Tenant Law', href: '/laws/' }, { name: law.state }]} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0A1628]">
        <Image
          src="/laws/hero.webp"
          alt={`${law.state} landlord-tenant law guide`}
          fill
          priority
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628] via-[#0A1628]/85 to-[#0A1628]/40" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/90">
              <Scale className="h-3.5 w-3.5" />
              {law.state} ({law.abbr}) law guide
            </p>
            <h1 className="font-display text-3xl font-extrabold text-white md:text-5xl lg:text-6xl">
              {law.state} Landlord-Tenant Law
            </h1>
            {law.quickAnswer ? (
              <div className="mt-6 rounded-2xl border border-white/15 bg-white/5 p-5 md:p-6">
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/70">Quick answer</p>
                <p className="text-base leading-relaxed text-white/90"><RichText text={law.quickAnswer} /></p>
              </div>
            ) : (
              <p className="mt-6 text-lg leading-relaxed text-white/80">{law.intro}</p>
            )}
            <div className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white/90">
              <ShieldCheck className="h-4 w-4" />
              {law.landlordFriendliness}
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick facts ──────────────────────────────────────────────────── */}
      <section className="bg-[#F5F6F8] py-10 md:py-12">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {law.quickFacts.map((f) => (
              <div key={f.label} className="rounded-2xl border border-border bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-blue">{f.label}</p>
                <p className="mt-2 text-base font-bold leading-snug text-brand-graphite">{f.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Local market snapshot (uniqueness: real per-state data) ──────── */}
      {law.localData && (
        <section className="bg-white pt-10 md:pt-14">
          <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
            <div className="rounded-2xl border border-border bg-brand-off-white p-6 md:p-8">
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-brand-blue">
                {law.state} rental market snapshot
              </p>
              <h2 className="font-heading text-xl font-bold text-brand-graphite">
                The numbers behind {law.state} rentals
              </h2>
              <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
                <div className="flex items-start gap-3">
                  <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
                  <div>
                    <p className="text-xs text-[#94A3B8]">Population</p>
                    <p className="text-sm font-bold text-brand-graphite">{law.localData.population}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
                  <div>
                    <p className="text-xs text-[#94A3B8]">Renter households</p>
                    <p className="text-sm font-bold text-brand-graphite">{law.localData.renterShare}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <DollarSign className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
                  <div>
                    <p className="text-xs text-[#94A3B8]">Median rent</p>
                    <p className="text-sm font-bold text-brand-graphite">{law.localData.medianRent}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
                  <div>
                    <p className="text-xs text-[#94A3B8]">Largest rental markets</p>
                    <p className="text-sm font-bold text-brand-graphite">{law.localData.metros.join(', ')}</p>
                  </div>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-[#475569]">
                <RichText text={law.localData.marketNote} />
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── Body: TOC + topics ───────────────────────────────────────────── */}
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:px-6 lg:grid-cols-[220px_1fr] lg:px-8">
          {/* TOC */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">On this page</p>
            <nav className="flex flex-col gap-2">
              {law.topics.map((t) => (
                <a key={t.id} href={`#${t.id}`} className="text-sm text-[#475569] transition-colors hover:text-brand-blue">
                  {t.heading}
                </a>
              ))}
              <a href="#faq" className="text-sm text-[#475569] transition-colors hover:text-brand-blue">
                FAQ
              </a>
            </nav>
          </aside>

          {/* Topics */}
          <div>
            {law.topics.map((t) => (
              <RevealOnScroll key={t.id} className="mb-12 scroll-mt-24" >
                <div id={t.id}>
                  <h2 className="font-heading text-2xl font-bold tracking-tight text-brand-graphite md:text-3xl">
                    {t.heading}
                  </h2>
                  {t.paragraphs.map((p, i) => (
                    <p key={i} className="mt-5 text-base leading-relaxed text-[#475569]">
                      <RichText text={p} />
                    </p>
                  ))}
                  {t.bullets && (
                    <ul className="mt-5 space-y-3">
                      {t.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-3">
                          <FileText className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
                          <span className="text-base leading-relaxed text-[#334155]">{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </RevealOnScroll>
            ))}

            {/* Statute + disclaimer */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <p className="flex items-start gap-3 text-sm leading-relaxed text-[#78562a]">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                <span>
                  This guide is general information, not legal advice. Governing statute:{' '}
                  <a href={law.statuteUrl} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
                    {law.statute}
                  </a>
                  . Laws change; confirm the current statute or consult an attorney before acting. Last reviewed {law.reviewedDate}.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section id="faq" className="scroll-mt-24 bg-brand-off-white py-12 md:py-20">
        <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
          <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
            <HelpCircle className="h-4 w-4" />
            {law.state} FAQ
          </p>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-brand-graphite md:text-3xl">
            Common questions
          </h2>
          <div className="mt-8 space-y-4">
            {law.faqs.map((f) => (
              <div key={f.q} className="rounded-2xl border border-border bg-white p-6">
                <h3 className="mb-2 font-heading text-base font-bold text-brand-graphite">{f.q}</h3>
                <p className="text-sm leading-relaxed text-[#475569]">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Product tie-in ───────────────────────────────────────────────── */}
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
          <h2 className="font-heading text-xl font-bold text-brand-graphite">Stay compliant automatically</h2>
          <p className="mt-3 text-base leading-relaxed text-[#475569]">
            Revun builds {law.state} notice periods, deposit timelines, and compliant workflows into leasing, payments,
            and communications, so the rules above are handled inside the platform instead of tracked by hand.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/features/compliance/" className="inline-flex items-center gap-2 rounded-xl border border-border bg-brand-off-white px-5 py-3 text-sm font-semibold text-brand-graphite transition-colors hover:border-brand-blue/40">
              Compliance features <ArrowRight className="h-4 w-4 text-brand-blue" />
            </Link>
            <Link href="/use-cases/lease-management/" className="inline-flex items-center gap-2 rounded-xl border border-border bg-brand-off-white px-5 py-3 text-sm font-semibold text-brand-graphite transition-colors hover:border-brand-blue/40">
              Lease management <ArrowRight className="h-4 w-4 text-brand-blue" />
            </Link>
            <Link href={`/forms/${law.slug.replace('-landlord-tenant-law', '-residential-lease-agreement')}/`} className="inline-flex items-center gap-2 rounded-xl border border-border bg-brand-off-white px-5 py-3 text-sm font-semibold text-brand-graphite transition-colors hover:border-brand-blue/40">
              {law.state} lease agreement requirements <ArrowRight className="h-4 w-4 text-brand-blue" />
            </Link>
            <Link href={`/evictions/${law.slug.replace('-landlord-tenant-law', '')}/`} className="inline-flex items-center gap-2 rounded-xl border border-border bg-brand-off-white px-5 py-3 text-sm font-semibold text-brand-graphite transition-colors hover:border-brand-blue/40">
              How to evict a tenant in {law.state} <ArrowRight className="h-4 w-4 text-brand-blue" />
            </Link>
            <Link href="/laws/" className="inline-flex items-center gap-2 rounded-xl border border-border bg-brand-off-white px-5 py-3 text-sm font-semibold text-brand-graphite transition-colors hover:border-brand-blue/40">
              All state guides <ArrowRight className="h-4 w-4 text-brand-blue" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-brand-blue py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-white md:text-4xl">
            Run {law.state} properties on one compliant platform
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/80">
            Leasing, payments, maintenance, communications, and accounting, with compliance built in.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/demo/" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-8 text-base font-semibold text-brand-blue transition-colors hover:bg-white/90">
              Book a demo <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/pricing/" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/40 px-8 text-base font-semibold text-white">
              See pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
