import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, MapPin, TrendingUp, Building2, FileText, CheckCircle2, HelpCircle } from 'lucide-react'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema, buildFAQPageSchema, buildLocalBusinessSchema } from '@/lib/schema-builders'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { caCities, caCityBySlug, type CaCityRecord } from '@/data/ca-cities'

/* ───────────────────────────────────────────────────────────────────────────
 * Static params + metadata
 * ─────────────────────────────────────────────────────────────────────────── */

export function generateStaticParams() {
  return caCities.map((c) => ({ province: c.provinceSlug, city: c.slug }))
}

type Props = {
  params: Promise<{ province: string; city: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { province, city } = await params
  const data = caCityBySlug(city, province)

  if (!data) {
    return { title: 'City Not Found | Revun' }
  }

  const title = `Property Management Software in ${data.name}, ${provinceShort(data.provinceSlug)} | Revun`
  const description = `Revun gives ${data.name} property managers one platform for leasing, payments, maintenance, communications, and compliance. Built for ${data.province} regulations and ${data.name} rental market dynamics.`
  const url = buildCanonicalUrl(`/ca/${data.provinceSlug}/${data.slug}`)

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
  }
}

/* ───────────────────────────────────────────────────────────────────────────
 * Page
 * ─────────────────────────────────────────────────────────────────────────── */

export default async function CaCityPage({ params }: Props) {
  const { province, city } = await params
  const data = caCityBySlug(city, province)

  if (!data) notFound()

  const valueProps = buildValueProps(data)
  const faqs = buildFaqs(data)
  const pageUrl = `https://revun.com/ca/${data.provinceSlug}/${data.slug}/`

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Canada', url: 'https://revun.com/ca/' },
              { name: data.province, url: `https://revun.com/ca/${data.provinceSlug}/` },
              { name: data.name, url: pageUrl },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildFAQPageSchema(
              faqs.map((f) => ({ question: f.q, answer: f.a }))
            )
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildLocalBusinessSchema({
              name: `Revun ${data.name}`,
              city: data.name,
              province: data.province,
              country: 'Canada',
            })
          ),
        }}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#F5F6F8]">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-blue">
              Canada / {data.province} / {data.name}
            </p>
            <h1 className="font-display font-extrabold text-3xl text-[#0A1628] md:text-5xl lg:text-6xl">
              Property Management Software in{' '}
              <span className="text-brand-blue">{data.name}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-[#555860]">
              One platform for leasing, payments, maintenance, communications, and {data.province} compliance.
              Built for {data.name}{"'"}s {data.medianRent1BR}/mo median 1BR rental market.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/demo/"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-blue px-8 text-base font-semibold text-white transition-colors duration-100 hover:bg-brand-blue-dark"
              >
                Book a {data.name} demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={`/ca/${data.provinceSlug}/`}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] px-8 text-base font-semibold text-[#0A1628] transition-colors duration-100 hover:text-[#555860]"
              >
                All of {data.province}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Market Stats ─────────────────────────────────────────────────── */}
      <section className="bg-white py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="mb-10 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-blue">
                {data.name} rental market
              </p>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-graphite md:text-4xl">
                Why operators run their {data.name} portfolios on Revun
              </h2>
            </div>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.08}>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              <Stat label="Population" value={data.population} />
              <Stat label="Rental households" value={data.rentalHouseholds} />
              <Stat label="Median 1BR rent" value={data.medianRent1BR} />
              <Stat label="Vacancy rate" value={data.vacancyRate} />
            </div>
          </RevealOnScroll>

          <RevealOnScroll className="mt-10">
            <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-brand-off-white p-6 md:p-8">
              <p className="mb-2 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
                <TrendingUp className="h-4 w-4" />
                Market context
              </p>
              <p className="text-base leading-relaxed text-[#334155]">
                {data.marketNote}
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Value Props ──────────────────────────────────────────────────── */}
      <section className="bg-brand-off-white py-12 md:py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="mb-10 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-blue">
                Built for {data.name}
              </p>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-graphite md:text-4xl">
                What Revun does for{' '}
                <span className="text-brand-blue">{data.name}</span> operators
              </h2>
            </div>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.1}>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
              {valueProps.map((prop) => (
                <div
                  key={prop.title}
                  className="flex flex-col rounded-2xl border border-border bg-white p-6"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue/10">
                    <CheckCircle2 className="h-5 w-5 text-brand-blue" />
                  </div>
                  <h3 className="mb-2 font-heading text-base font-bold text-brand-graphite">
                    {prop.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#475569]">
                    {prop.body}
                  </p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Neighbourhoods ───────────────────────────────────────────────── */}
      <section className="bg-white py-12 md:py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="mb-10 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-blue">
                Local coverage
              </p>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-graphite md:text-4xl">
                {data.name} submarkets we serve
              </h2>
            </div>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.08}>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {data.areas.map((area) => (
                <div
                  key={area.name}
                  className="rounded-2xl border border-border bg-brand-off-white p-6"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <MapPin className="h-4 w-4 shrink-0 text-brand-blue" />
                    <h3 className="font-heading text-base font-bold text-brand-graphite">
                      {area.name}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-[#475569]">
                    {area.note}
                  </p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="bg-brand-off-white py-12 md:py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="mb-10 text-center">
              <p className="mb-3 inline-flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
                <HelpCircle className="h-4 w-4" />
                FAQ
              </p>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-graphite md:text-4xl">
                Questions {data.name} operators ask us
              </h2>
            </div>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.07}>
            <div className="space-y-4">
              {faqs.map((f) => (
                <div key={f.q} className="rounded-2xl border border-border bg-white p-6">
                  <h3 className="mb-2 font-heading text-base font-bold text-brand-graphite">
                    {f.q}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#475569]">{f.a}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#F5F6F8] py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-6 lg:px-8">
          <RevealOnScroll>
            <h2 className="font-heading font-extrabold text-3xl tracking-tight text-[#0A1628] md:text-5xl">
              Run your {data.name} portfolio on one platform
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-[#555860]">
              See how Revun handles your {data.province} compliance, your tenant communications, and your rent collection in one workflow.
            </p>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/demo/"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#176FEB] px-8 text-base font-semibold text-white transition-colors duration-100 hover:bg-[#1260D6]"
              >
                Book a demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/pricing/"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] px-8 text-base font-semibold text-[#0A1628]"
              >
                See pricing
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}

/* ───────────────────────────────────────────────────────────────────────────
 * Helpers
 * ─────────────────────────────────────────────────────────────────────────── */

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-5 text-center md:p-6">
      <p className="font-heading text-xl font-extrabold text-brand-graphite md:text-2xl">
        {value}
      </p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-[#64748B]">
        {label}
      </p>
    </div>
  )
}

function provinceShort(slug: string): string {
  const map: Record<string, string> = {
    'ontario': 'ON',
    'british-columbia': 'BC',
    'quebec': 'QC',
    'alberta': 'AB',
    'nova-scotia': 'NS',
    'manitoba': 'MB',
    'saskatchewan': 'SK',
    'new-brunswick': 'NB',
    'prince-edward-island': 'PE',
    'newfoundland-and-labrador': 'NL',
  }
  return map[slug] ?? 'CA'
}

function buildValueProps(data: CaCityRecord) {
  const province = data.province
  const provinceVoice: Record<string, { title: string; body: string }> = {
    Ontario: {
      title: 'RTA + LTB workflows out of the box',
      body: `Generate N4, N8, N12, and N13 notices pre-filled with tenant data. Track LTB applications and hearing dates for every ${data.name} unit in one queue.`,
    },
    'British Columbia': {
      title: 'BC RTB + rent increase formula',
      body: `Annual rent increase limits calculated from the RTB announcement, with the mandatory 3-month notice baked in. RTDRS-ready evidence packages for ${data.name} disputes.`,
    },
    Quebec: {
      title: 'TAL Bail in French and English',
      body: `Mandatory TAL Bail form generated in French with English translation. Rent increase notices and refusal workflows that match TAL’s timelines for ${data.name}.`,
    },
    Alberta: {
      title: 'Alberta RTDRS + no-rent-control flexibility',
      body: `Set ${data.name} market rents freely with 3-month written notice generated automatically. RTDRS application bundles ready in minutes.`,
    },
    'Nova Scotia': {
      title: 'NS rent cap + prescribed forms',
      body: `Annual NS rent cap applied automatically to scheduled increases for your ${data.name} portfolio. Form J, Form P, and RTB submissions pre-filled.`,
    },
    Manitoba: {
      title: 'Manitoba RTB guideline + deposit accounts',
      body: `Above-guideline rent increase documentation prepared on request. Deposit tracking with RTB-compliant designated accounts for your ${data.name} units.`,
    },
    Saskatchewan: {
      title: 'Saskatchewan ORT + interest-bearing deposits',
      body: `Notice periods calculated under the SK RTA. Security deposit interest calculated at the prescribed rate, reconciled automatically at move-out.`,
    },
    'New Brunswick': {
      title: 'NB rent cap + bilingual documents',
      body: `Annual NB rent increase cap enforced with 2-month notice periods. Lease agreements and tenant notices generated in English and French.`,
    },
    'Prince Edward Island': {
      title: 'IRAC rent cap tracking',
      body: `Annual IRAC cap applied to ${data.name} scheduled increases. Above-guideline application packages prepared when capital improvements justify it.`,
    },
    'Newfoundland and Labrador': {
      title: 'NL notice periods + deposit caps',
      body: `Six-month yearly tenancy and three-month monthly tenancy notice periods calculated automatically. Deposits enforced at the 75% statutory cap.`,
    },
  }

  const provinceProp = provinceVoice[province] ?? {
    title: `Built for ${province} compliance`,
    body: `Provincial notice periods, deposit rules, and tenancy regulations applied automatically to your ${data.name} portfolio.`,
  }

  return [
    provinceProp,
    {
      title: 'Leasing pipeline for tight markets',
      body: `${data.name}’s ${data.vacancyRate} vacancy rate means listings rent fast. Revun syndicates listings, runs screening, and turns approved applicants into signed leases in one workflow.`,
    },
    {
      title: 'Rent collection + Interac e-Transfer',
      body: `Native Interac integration plus pre-authorized debit. Late-payment workflows trigger automatically against your ${data.medianRent1BR}/mo median 1BR rent expectations.`,
    },
    {
      title: 'Owner portal + maintenance dispatch',
      body: `Owners see their ${data.name} portfolio P&L in real time. Maintenance requests route to your preferred vendors with photo-and-receipt proof of completion on every job.`,
    },
  ]
}

function buildFaqs(data: CaCityRecord) {
  const province = data.province
  return [
    {
      q: `Does Revun handle ${province} compliance for ${data.name} landlords?`,
      a: `Yes. ${province}’s tenancy framework is baked into Revun: notice templates, prescribed forms, and tenancy board workflows are kept current for every unit in ${data.name}. You do not need a separate compliance tool to operate here.`,
    },
    {
      q: `What does Revun cost for a small ${data.name} portfolio?`,
      a: `Self-managing owners with 1 or 2 units use Revun for free. Operators with growing portfolios start at $1 per unit per day. Pricing scales with units, not with feature gates, so ${data.name} small and mid-sized PMCs use the same platform as institutional operators.`,
    },
    {
      q: `Will Revun work for older ${data.name} buildings with mixed unit types?`,
      a: `Yes. Revun handles legal non-conforming suites, secondary suites, condo units with strata or condo board layered rules, and purpose-built rentals in one portfolio. Each unit carries its own rule set so that ${data.name}’s mixed building stock does not break your reporting.`,
    },
    {
      q: `Can ${data.name} property managers use Revun for owner reporting?`,
      a: `Yes. The owner portal shows real-time financial dashboards, document access, and a complete communication trail. ${data.name} portfolio owners self-serve, which cuts the phone calls and emails most PMCs spend their week on.`,
    },
  ]
}
