import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Zap, Scale, Ban, Clock, DollarSign, ShieldAlert, HelpCircle, AlertCircle } from 'lucide-react'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema, buildFAQPageSchema, buildArticleSchema } from '@/lib/schema-builders'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { evictions, evictionSlugs } from '@/data/evictions'

export function generateStaticParams() {
  return evictionSlugs.map((state) => ({ state }))
}

type Props = { params: Promise<{ state: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state } = await params
  const e = evictions[state]
  if (!e) return { title: 'Eviction Guide Not Found | Revun' }
  const url = buildCanonicalUrl(`/evictions/${e.slug}`)
  return {
    title: e.metaTitle,
    description: e.description,
    alternates: { canonical: url },
    openGraph: { title: e.metaTitle, description: e.description, url, type: 'article', images: ['/og-default.png'] },
  }
}

/* Bold **key** phrases; keep copy answer-first and scannable. */
function Rich({ text, dark }: { text: string; dark?: boolean }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((p, i) =>
        p.startsWith('**') && p.endsWith('**') ? (
          <strong key={i} className={dark ? 'font-semibold text-white' : 'font-semibold text-brand-graphite'}>{p.slice(2, -2)}</strong>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </>
  )
}

export default async function EvictionGuidePage({ params }: Props) {
  const { state } = await params
  const e = evictions[state]
  if (!e) notFound()
  const pageUrl = `https://revun.com/evictions/${e.slug}/`
  const lawSlug = `${e.slug}-landlord-tenant-law`

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(buildBreadcrumbSchema([
        { name: 'Home', url: 'https://revun.com/' },
        { name: 'Evictions', url: 'https://revun.com/evictions/' },
        { name: `${e.state} Eviction Process`, url: pageUrl },
      ])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(buildArticleSchema({
        headline: `How to Evict a Tenant in ${e.state}`, description: e.description,
        datePublished: '2026-06-04', dateModified: '2026-06-04', url: pageUrl, category: 'Eviction',
      })) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(buildFAQPageSchema(e.faqs.map((f) => ({ question: f.q, answer: f.a })))) }} />

      <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Evictions', href: '/evictions/' }, { name: e.state }]} />

      {/* Hero + quick answer (the box top rankers lack) */}
      <section className="bg-[#0A1628]">
        <div className="mx-auto max-w-4xl px-4 py-14 md:px-6 md:py-16 lg:px-8">
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/70">
            <Scale className="h-3.5 w-3.5" /> {e.state} ({e.abbr}) eviction guide
          </p>
          <h1 className="font-display text-3xl font-extrabold text-white md:text-5xl">
            How to Evict a Tenant in {e.state}
          </h1>
          <div className="mt-6 rounded-2xl border border-white/15 bg-white/5 p-5 md:p-6">
            <p className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/70">
              <Zap className="h-4 w-4 text-white" /> Quick answer
            </p>
            <p className="text-base leading-relaxed text-white/90"><Rich text={e.quickAnswer} dark /></p>
          </div>
        </div>
      </section>

      {/* At-a-glance table */}
      <section className="bg-[#F5F6F8] py-10 md:py-12">
        <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
          <h2 className="mb-4 font-heading text-xl font-bold text-brand-graphite">{e.state} eviction at a glance</h2>
          <div className="overflow-hidden rounded-2xl border border-border bg-white">
            <table className="w-full text-left text-sm">
              <tbody>
                {[
                  ['Legal grounds', e.atAGlance.grounds],
                  ['Minimum notice', e.atAGlance.minNotice],
                  ['Where to file', e.atAGlance.whereToFile],
                  ['Filing fee', e.atAGlance.filingFee],
                  ['Typical timeframe', e.atAGlance.typicalTimeframe],
                ].map(([k, v]) => (
                  <tr key={k} className="border-b border-border last:border-0">
                    <th className="w-44 bg-[#F5F6F8] px-4 py-3 font-semibold text-brand-graphite md:px-6">{k}</th>
                    <td className="px-4 py-3 text-[#334155] md:px-6"><Rich text={v} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Notice types */}
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-brand-graphite">Eviction notice types in {e.state}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {e.noticeTypes.map((n) => (
              <div key={n.name} className="rounded-2xl border border-border bg-brand-off-white p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-heading text-base font-bold text-brand-graphite">{n.name}</h3>
                  <span className="shrink-0 rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-bold text-brand-blue">{n.period}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[#475569]"><Rich text={n.detail} /></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step-by-step timeline table */}
      <section className="bg-brand-off-white py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-brand-graphite">
            The {e.state} eviction process, step by step
          </h2>
          <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-white">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-[#F5F6F8]">
                  <th className="px-4 py-3 font-bold text-brand-graphite md:px-6">Step</th>
                  <th className="w-32 px-4 py-3 font-bold text-brand-blue md:px-6"><Clock className="mr-1 inline h-4 w-4" />Timeframe</th>
                  <th className="px-4 py-3 font-bold text-brand-graphite md:px-6">What happens</th>
                </tr>
              </thead>
              <tbody>
                {e.steps.map((s, i) => (
                  <tr key={s.title} className="border-b border-border align-top last:border-0">
                    <td className="px-4 py-3 font-semibold text-brand-graphite md:px-6">{i + 1}. {s.title}</td>
                    <td className="px-4 py-3 font-medium text-brand-blue md:px-6"><Rich text={s.timeframe} /></td>
                    <td className="px-4 py-3 text-[#475569] md:px-6"><Rich text={s.detail} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Costs + After judgment */}
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto grid max-w-4xl gap-6 px-4 md:grid-cols-2 md:px-6 lg:px-8">
          <div className="rounded-2xl border border-border bg-brand-off-white p-6">
            <h2 className="mb-2 inline-flex items-center gap-2 font-heading text-lg font-bold text-brand-graphite">
              <DollarSign className="h-5 w-5 text-brand-blue" /> What it costs
            </h2>
            <p className="text-sm leading-relaxed text-[#475569]"><Rich text={e.costs} /></p>
          </div>
          <div className="rounded-2xl border border-border bg-brand-off-white p-6">
            <h2 className="mb-2 inline-flex items-center gap-2 font-heading text-lg font-bold text-brand-graphite">
              <ShieldAlert className="h-5 w-5 text-brand-blue" /> After the judgment
            </h2>
            <p className="text-sm leading-relaxed text-[#475569]"><Rich text={e.afterJudgment} /></p>
          </div>
        </div>
      </section>

      {/* Tenant defenses */}
      <section className="bg-brand-off-white py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-brand-graphite">Common tenant defenses in {e.state}</h2>
          <ul className="mt-5 space-y-3">
            {e.tenantDefenses.map((d) => (
              <li key={d} className="flex items-start gap-3">
                <Ban className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                <span className="text-base leading-relaxed text-[#334155]"><Rich text={d} /></span>
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <p className="flex items-start gap-3 text-sm leading-relaxed text-[#78562a]">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
              <span>General information, not legal advice. Governing statute:{' '}
                <a href={e.statuteUrl} target="_blank" rel="noopener noreferrer" className="font-semibold underline">{e.statute}</a>.
                Self-help eviction is illegal everywhere; always follow the court process.</span>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4 md:px-6 lg:px-8">
          <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
            <HelpCircle className="h-4 w-4" /> {e.state} eviction FAQ
          </p>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-brand-graphite">Common questions</h2>
          <div className="mt-6 space-y-4">
            {e.faqs.map((f) => (
              <div key={f.q} className="rounded-2xl border border-border bg-brand-off-white p-6">
                <h3 className="mb-2 font-heading text-base font-bold text-brand-graphite">{f.q}</h3>
                <p className="text-sm leading-relaxed text-[#475569]">{f.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/laws/${lawSlug}/`} className="inline-flex items-center gap-2 rounded-xl border border-border bg-brand-off-white px-5 py-3 text-sm font-semibold text-brand-graphite transition-colors hover:border-brand-blue/40">
              {e.state} landlord-tenant law <ArrowRight className="h-4 w-4 text-brand-blue" />
            </Link>
            <Link href={`/forms/${e.slug}-residential-lease-agreement/`} className="inline-flex items-center gap-2 rounded-xl border border-border bg-brand-off-white px-5 py-3 text-sm font-semibold text-brand-graphite transition-colors hover:border-brand-blue/40">
              {e.state} lease requirements <ArrowRight className="h-4 w-4 text-brand-blue" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-blue py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-white md:text-3xl">Avoid evictions before they start</h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/80">
            Revun screens tenants, automates rent reminders, and logs every notice, so fewer tenancies ever reach court.
          </p>
          <div className="mt-8">
            <Link href="/demo/" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-8 text-base font-semibold text-brand-blue transition-colors hover:bg-white/90">
              Book a demo <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
