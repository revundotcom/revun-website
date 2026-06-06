import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Check, X, Minus, CheckCircle2, HelpCircle, Sparkles, Scale } from 'lucide-react'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema, buildFAQPageSchema, buildComparisonSchema } from '@/lib/schema-builders'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { competitors, competitorSlugs, DIMENSIONS, type Verdict } from '@/data/competitors'

/* ───────────────────────────────────────────────────────────────────────────
 * Static params + metadata
 * ─────────────────────────────────────────────────────────────────────────── */

export function generateStaticParams() {
  return competitorSlugs.map((competitor) => ({ competitor }))
}

type Props = { params: Promise<{ competitor: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { competitor } = await params
  const data = competitors[competitor]
  if (!data) return { title: 'Comparison Not Found | Revun' }

  const title = `Revun vs ${data.name}: Comparison and ${data.name} Alternative | Revun`
  const description = `${data.name} vs Revun compared feature by feature: US and Canada coverage, all-in-one pricing, native communications, screening, and accounting. See why operators choose Revun as a ${data.name} alternative.`
  const url = buildCanonicalUrl(`/compare/${data.slug}`)

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, images: ['/og-default.png'] },
  }
}

/* ───────────────────────────────────────────────────────────────────────────
 * Verdict cell
 * ─────────────────────────────────────────────────────────────────────────── */

function VerdictIcon({ v }: { v: Verdict }) {
  if (v === 'yes') return <Check className="h-5 w-5 text-emerald-600" aria-label="Yes" />
  if (v === 'no') return <X className="h-5 w-5 text-rose-500" aria-label="No" />
  return <Minus className="h-5 w-5 text-amber-500" aria-label="Partial" />
}

/* ───────────────────────────────────────────────────────────────────────────
 * Page
 * ─────────────────────────────────────────────────────────────────────────── */

export default async function ComparePage({ params }: Props) {
  const { competitor } = await params
  const data = competitors[competitor]
  if (!data) notFound()

  const pageUrl = `https://revun.com/compare/${data.slug}/`
  const verdictByKey = Object.fromEntries(data.matrix.map((row) => [row.key, row]))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Compare', url: 'https://revun.com/compare/' },
              { name: `Revun vs ${data.name}`, url: pageUrl },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildComparisonSchema({
              revunName: 'Revun',
              competitorName: data.name,
              url: pageUrl,
              description: `A feature-by-feature comparison of Revun and ${data.name} for property operators.`,
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildFAQPageSchema(data.faqs.map((f) => ({ question: f.q, answer: f.a })))
          ),
        }}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#F5F6F8]">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 inline-flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
              <Scale className="h-4 w-4" />
              {data.category} comparison
            </p>
            <h1 className="font-display font-extrabold text-3xl text-[#0A1628] md:text-5xl lg:text-6xl">
              <span className="text-brand-blue">Revun</span> vs {data.name}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-[#555860]">{data.heroSub}</p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/demo/"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-blue px-8 text-base font-semibold text-white transition-colors duration-100 hover:bg-brand-blue-dark"
              >
                See Revun in action
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/compare/"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] px-8 text-base font-semibold text-[#0A1628]"
              >
                All comparisons
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Intro ────────────────────────────────────────────────────────── */}
      <section className="bg-white py-12 md:py-20">
        <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-blue">The short version</p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-graphite md:text-4xl">
              Revun and {data.name} at a glance
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[#475569]">{data.intro}</p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Comparison matrix ────────────────────────────────────────────── */}
      <section className="bg-brand-off-white py-12 md:py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="mb-10 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-blue">Feature by feature</p>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-graphite md:text-4xl">
                Revun vs {data.name}, compared
              </h2>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="overflow-hidden rounded-2xl border border-border bg-white">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border bg-[#F5F6F8]">
                    <th className="px-4 py-4 text-sm font-bold text-brand-graphite md:px-6">Capability</th>
                    <th className="px-4 py-4 text-center text-sm font-bold text-brand-blue md:px-6">Revun</th>
                    <th className="px-4 py-4 text-center text-sm font-bold text-brand-graphite md:px-6">{data.name}</th>
                  </tr>
                </thead>
                <tbody>
                  {DIMENSIONS.map((dim) => {
                    const row = verdictByKey[dim.key]
                    return (
                      <tr key={dim.key} className="border-b border-border last:border-0 align-top">
                        <td className="px-4 py-4 md:px-6">
                          <div className="text-sm font-semibold text-brand-graphite">{dim.label}</div>
                        </td>
                        <td className="px-4 py-4 md:px-6">
                          <div className="flex flex-col items-center gap-1 text-center">
                            <VerdictIcon v={dim.revun} />
                            <span className="text-xs leading-snug text-[#64748B]">{dim.revunNote}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 md:px-6">
                          <div className="flex flex-col items-center gap-1 text-center">
                            <VerdictIcon v={row?.competitor ?? 'partial'} />
                            <span className="text-xs leading-snug text-[#64748B]">{row?.note ?? ''}</span>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-center text-xs text-[#94A3B8]">
              Comparison reflects published product capabilities and positioning. Verify current details with each vendor.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Where Revun wins ─────────────────────────────────────────────── */}
      <section className="bg-white py-12 md:py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="mb-10 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-blue">Why operators switch</p>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-graphite md:text-4xl">
                Where Revun pulls ahead
              </h2>
            </div>
          </RevealOnScroll>
          <RevealOnScroll stagger={0.1}>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {data.whereRevunWins.map((w) => (
                <div key={w.title} className="flex flex-col rounded-2xl border border-border bg-brand-off-white p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue/10">
                    <CheckCircle2 className="h-5 w-5 text-brand-blue" />
                  </div>
                  <h3 className="mb-2 font-heading text-base font-bold text-brand-graphite">{w.title}</h3>
                  <p className="text-sm leading-relaxed text-[#475569]">{w.body}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Fair view: their strengths ───────────────────────────────────── */}
      <section className="bg-brand-off-white py-12 md:py-20">
        <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-blue">A fair look</p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-graphite md:text-4xl">
              What {data.name} does well
            </h2>
            <ul className="mt-6 space-y-3">
              {data.theirStrengths.map((s) => (
                <li key={s} className="flex items-start gap-3 rounded-xl border border-border bg-white p-4">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <span className="text-base leading-relaxed text-[#334155]">{s}</span>
                </li>
              ))}
            </ul>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Pricing + best for ───────────────────────────────────────────── */}
      <section className="bg-white py-12 md:py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="rounded-2xl border border-border bg-brand-off-white p-6 md:p-8">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-blue">Pricing</p>
              <p className="text-base leading-relaxed text-[#334155]">{data.pricingNote}</p>
            </div>
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-brand-blue/30 bg-brand-blue/5 p-6">
                <h3 className="mb-2 font-heading text-base font-bold text-brand-blue">Choose Revun if</h3>
                <p className="text-sm leading-relaxed text-[#334155]">{data.bestForRevun}</p>
              </div>
              <div className="rounded-2xl border border-border bg-white p-6">
                <h3 className="mb-2 font-heading text-base font-bold text-brand-graphite">Choose {data.name} if</h3>
                <p className="text-sm leading-relaxed text-[#475569]">{data.bestForThem}</p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Migration ────────────────────────────────────────────────────── */}
      <section className="bg-brand-off-white py-12 md:py-20">
        <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll>
            <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
              <Sparkles className="h-4 w-4" />
              Switching is handled
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-graphite md:text-4xl">
              Moving from {data.name} to Revun
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[#475569]">{data.migration}</p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="bg-white py-12 md:py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="mb-10 text-center">
              <p className="mb-3 inline-flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
                <HelpCircle className="h-4 w-4" />
                FAQ
              </p>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-graphite md:text-4xl">
                Common questions
              </h2>
            </div>
          </RevealOnScroll>
          <RevealOnScroll stagger={0.08} className="space-y-4">
            {data.faqs.map((f) => (
              <div key={f.q} className="rounded-2xl border border-border bg-brand-off-white p-6">
                <h3 className="mb-2 font-heading text-base font-bold text-brand-graphite">{f.q}</h3>
                <p className="text-sm leading-relaxed text-[#475569]">{f.a}</p>
              </div>
            ))}
          </RevealOnScroll>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-brand-blue py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
            See why operators pick Revun over {data.name}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/80">
            One platform for leasing, payments, maintenance, communications, and accounting across the US and Canada.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/demo/"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-8 text-base font-semibold text-brand-blue transition-colors duration-100 hover:bg-white/90"
            >
              Book a demo
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing/"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/40 px-8 text-base font-semibold text-white"
            >
              See pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
