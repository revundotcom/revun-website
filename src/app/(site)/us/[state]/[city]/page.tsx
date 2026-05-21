import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, MapPin, TrendingUp, CheckCircle2, HelpCircle } from 'lucide-react'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema, buildFAQPageSchema, buildLocalBusinessSchema } from '@/lib/schema-builders'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { usCities, usCityBySlug, type UsCityRecord } from '@/data/us-cities'

/* ───────────────────────────────────────────────────────────────────────────
 * Static params + metadata
 * ─────────────────────────────────────────────────────────────────────────── */

export function generateStaticParams() {
  return usCities.map((c) => ({ state: c.stateSlug, city: c.slug }))
}

type Props = {
  params: Promise<{ state: string; city: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state, city } = await params
  const data = usCityBySlug(city, state)

  if (!data) {
    return { title: 'City Not Found | Revun' }
  }

  const title = `Property Management Software in ${data.name}, ${stateShort(data.stateSlug)} | Revun`
  const description = `Revun gives ${data.name} property managers one platform for leasing, payments, maintenance, communications, and compliance. Built for ${data.state} regulations and ${data.name} rental market dynamics.`
  const url = buildCanonicalUrl(`/us/${data.stateSlug}/${data.slug}`)

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

export default async function UsCityPage({ params }: Props) {
  const { state, city } = await params
  const data = usCityBySlug(city, state)

  if (!data) notFound()

  const valueProps = buildValueProps(data)
  const faqs = buildFaqs(data)
  const pageUrl = `https://revun.com/us/${data.stateSlug}/${data.slug}/`

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'United States', url: 'https://revun.com/us/' },
              { name: data.state, url: `https://revun.com/us/${data.stateSlug}/` },
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
              province: data.state,
              country: 'United States',
            })
          ),
        }}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#F5F6F8]">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-blue">
              United States / {data.state} / {data.name}
            </p>
            <h1 className="font-display font-extrabold text-3xl text-[#0A1628] md:text-5xl lg:text-6xl">
              Property Management Software in{' '}
              <span className="text-brand-blue">{data.name}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-[#555860]">
              One platform for leasing, payments, maintenance, communications, and {data.state} compliance.
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
                href={`/us/${data.stateSlug}/`}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] px-8 text-base font-semibold text-[#0A1628] transition-colors duration-100 hover:text-[#555860]"
              >
                All of {data.state}
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
              See how Revun handles your {data.state} compliance, your tenant communications, and your rent collection in one workflow.
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

function stateShort(slug: string): string {
  const map: Record<string, string> = {
    'florida': 'FL',
    'texas': 'TX',
    'california': 'CA',
    'new-york': 'NY',
    'illinois': 'IL',
    'georgia': 'GA',
    'north-carolina': 'NC',
    'arizona': 'AZ',
    'colorado': 'CO',
    'new-jersey': 'NJ',
    'virginia': 'VA',
    'washington': 'WA',
    'nevada': 'NV',
    'pennsylvania': 'PA',
    'ohio': 'OH',
    'michigan': 'MI',
    'massachusetts': 'MA',
    'tennessee': 'TN',
  }
  return map[slug] ?? 'US'
}

function buildValueProps(data: UsCityRecord) {
  const stateVoice: Record<string, { title: string; body: string }> = {
    Florida: {
      title: 'Chapter 83 notices + HOA coordination',
      body: `Generate 3-day, 7-day, and 15-day notices pre-filled with tenant data for your ${data.name} portfolio. HOA approval timelines tracked unit by unit.`,
    },
    Texas: {
      title: 'Texas Property Code + JP Court filings',
      body: `3-day notice to vacate, statutory disclosure documents, and Justice Court eviction filings ready in minutes. Built for ${data.name}’s fast-eviction timeline.`,
    },
    California: {
      title: 'AB 1482 + local just-cause workflows',
      body: `California’s 5% + CPI cap calculated automatically. Just-cause eviction documentation, relocation assistance tracking, and rent registries for ${data.name} operators.`,
    },
    'New York': {
      title: 'NYC + statewide tenant protections',
      body: `Rent-stabilization records, statewide HSTPA notice requirements, and lease renewal workflows tuned for ${data.name}. Court evidence packages ready when you need them.`,
    },
    Illinois: {
      title: 'RLTO + Illinois eviction workflow',
      body: `Chicago-area Residential Landlord and Tenant Ordinance compliance baked in. Statewide notice templates and Cook County / Illinois eviction filing support for your ${data.name} units.`,
    },
    Georgia: {
      title: 'Georgia dispossessory affidavits',
      body: `Magistrate court dispossessory filings, 7-day notice generation, and security deposit tracking under the Georgia Landlord-Tenant Act for ${data.name} portfolios.`,
    },
    'North Carolina': {
      title: 'NC eviction + magistrate workflow',
      body: `North Carolina Residential Rental Agreements Act compliance with 10-day notice generation and Small Claims Court filing support tuned to your ${data.name} county.`,
    },
    Arizona: {
      title: 'ARLTA notices + Justice Court filings',
      body: `Arizona Residential Landlord and Tenant Act 5-day and 10-day notices pre-filled. ${data.name} Justice Court eviction filing support with case-status tracking.`,
    },
    Colorado: {
      title: 'Colorado warranty of habitability + Demand for Possession',
      body: `10-day Demand for Possession generation, warranty-of-habitability response workflows, and ${data.name} county court filing support.`,
    },
    'New Jersey': {
      title: 'NJ Anti-Eviction Act + just-cause',
      body: `New Jersey’s grounds-based eviction framework handled per cause. Truth-in-Renting disclosures, lease registration, and ${data.name} Special Civil Part filing support.`,
    },
    Virginia: {
      title: 'VRLTA notices + General District Court',
      body: `Virginia Residential Landlord and Tenant Act 5-day notices, written rental agreements, and ${data.name} General District Court unlawful detainer filing support.`,
    },
    Washington: {
      title: 'Washington Just Cause + 14-day notice',
      body: `Statewide Just Cause for Eviction Reform Act compliance, 14-day notice generation, and rent increase cap tracking for ${data.name} operators.`,
    },
    Nevada: {
      title: 'Nevada 5/7-day notices + Justice Court',
      body: `Nevada NRS 118A notice generation (5-day, 7-day, 30-day) and ${data.name} Justice Court summary eviction filing support, with sealed eviction tracking.`,
    },
    Pennsylvania: {
      title: 'Pennsylvania Landlord-Tenant Act',
      body: `Statewide 10-day notice for non-payment and 15-day or 30-day notices for lease term ends. ${data.name} Magisterial District Court filing support.`,
    },
    Ohio: {
      title: 'Ohio 3-day notice + Forcible Entry',
      body: `Ohio Revised Code 5321 compliance, 3-day notices to leave, and Forcible Entry and Detainer filing in your ${data.name} county.`,
    },
    Michigan: {
      title: 'Michigan demand notices + Truth in Renting',
      body: `7-day Demand for Possession for non-payment, 30-day notices for other grounds, and ${data.name} District Court eviction filing support with Truth in Renting compliance.`,
    },
    Massachusetts: {
      title: 'Massachusetts 14-day notice + Housing Court',
      body: `Notice to Quit generation, security deposit interest tracking under MGL 186-15B, and ${data.name} Housing Court summary process filing support.`,
    },
    Tennessee: {
      title: 'Tennessee URLTA + detainer warrants',
      body: `Tennessee Uniform Residential Landlord and Tenant Act 14-day cure notices and ${data.name} General Sessions Court detainer warrant filing support.`,
    },
  }

  const stateProp = stateVoice[data.state] ?? {
    title: `Built for ${data.state} compliance`,
    body: `State-specific notice periods, deposit rules, and eviction workflows applied automatically to your ${data.name} portfolio.`,
  }

  return [
    stateProp,
    {
      title: 'Leasing pipeline tuned to local supply',
      body: `${data.name} runs at ${data.vacancyRate} vacancy. Revun syndicates listings, runs screening, and turns approved applicants into signed leases in one workflow so units do not sit empty.`,
    },
    {
      title: 'Rent collection + ACH + cards',
      body: `Native ACH and card collection plus pay-by-check workflows. Late-payment cycles trigger automatically against your ${data.medianRent1BR}/mo median 1BR rent expectations.`,
    },
    {
      title: 'Owner portal + maintenance dispatch',
      body: `Owners see their ${data.name} portfolio P&L in real time. Maintenance requests route to your preferred vendors with photo-and-receipt proof of completion on every job.`,
    },
  ]
}

function buildFaqs(data: UsCityRecord) {
  return [
    {
      q: `Does Revun handle ${data.state} compliance for ${data.name} landlords?`,
      a: `Yes. ${data.state}’s residential tenancy framework is baked into Revun: notice templates, statutory disclosures, deposit rules, and court filing workflows are kept current for every unit in ${data.name}.`,
    },
    {
      q: `What does Revun cost for a ${data.name} portfolio?`,
      a: `Self-managing owners with 1 or 2 units use Revun for free. Operators with growing portfolios start at $1 per unit per day. Pricing scales with units, not with feature gates, so ${data.name} owner-operators and institutional managers run the same platform.`,
    },
    {
      q: `Can Revun replace my existing property management software in ${data.name}?`,
      a: `Yes. Operators in ${data.name} have migrated from AppFolio, Buildium, Yardi, Propertyware, and Rent Manager onto Revun. Bulk imports for properties, owners, tenants, leases, and payment ledgers are part of onboarding.`,
    },
    {
      q: `Does Revun handle ${data.name} HOA or condo association coordination?`,
      a: `Yes. Revun tracks per-unit HOA or condo association rules, application timelines, fee schedules, and approval status. ${data.state} HOA-prevalent markets like ${data.name} use Revun to keep board approvals from holding up move-ins.`,
    },
  ]
}
