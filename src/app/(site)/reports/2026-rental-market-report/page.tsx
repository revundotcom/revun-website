import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, TrendingUp, TrendingDown, Home, MapPin } from 'lucide-react'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema, buildArticleSchema } from '@/lib/schema-builders'
import { usCities } from '@/data/us-cities'
import { caCities } from '@/data/ca-cities'

export const metadata: Metadata = {
  title: '2026 Rental Market Report: Median Rent & Vacancy (US + Canada) | Revun',
  description:
    'Revun 2026 rental market report: median 1-bedroom rent and vacancy rates across 163 US and Canadian metros, with the most expensive, most affordable, and tightest markets ranked.',
  alternates: { canonical: buildCanonicalUrl('/reports/2026-rental-market-report') },
  openGraph: { title: '2026 Rental Market Report (US + Canada) | Revun', description: 'Median 1BR rent and vacancy across 163 US and Canadian metros, ranked.', url: buildCanonicalUrl('/reports/2026-rental-market-report'), type: 'article' },
}

type Row = { name: string; region: string; country: 'US' | 'Canada'; rent: number; vacancy: number }

const num = (s: string) => Number((s || '').replace(/[^0-9.]/g, '')) || 0

function buildRows(): Row[] {
  const us = usCities.map((c) => ({ name: c.name, region: c.state, country: 'US' as const, rent: num(c.medianRent1BR), vacancy: num(c.vacancyRate) }))
  const ca = caCities.map((c) => ({ name: c.name, region: c.province, country: 'Canada' as const, rent: num(c.medianRent1BR), vacancy: num(c.vacancyRate) }))
  return [...us, ...ca].filter((r) => r.rent > 0)
}

function Table({ rows, metric }: { rows: Row[]; metric: 'rent' | 'vacancy' }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-[#F5F6F8]">
            <th className="px-4 py-3 font-bold text-brand-graphite md:px-6">#</th>
            <th className="px-4 py-3 font-bold text-brand-graphite md:px-6">Metro</th>
            <th className="px-4 py-3 font-bold text-brand-graphite md:px-6">Region</th>
            <th className="px-4 py-3 text-right font-bold text-brand-blue md:px-6">{metric === 'rent' ? 'Median 1BR rent' : 'Vacancy rate'}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={`${r.name}-${r.region}`} className="border-b border-border last:border-0">
              <td className="px-4 py-3 text-[#94A3B8] md:px-6">{i + 1}</td>
              <td className="px-4 py-3 font-semibold text-brand-graphite md:px-6">{r.name}<span className="ml-2 rounded bg-brand-blue/10 px-1.5 py-0.5 text-[10px] font-bold text-brand-blue">{r.country}</span></td>
              <td className="px-4 py-3 text-[#475569] md:px-6">{r.region}</td>
              <td className="px-4 py-3 text-right font-bold text-brand-graphite md:px-6">{metric === 'rent' ? `$${r.rent.toLocaleString()}` : `${r.vacancy}%`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function RentalMarketReport() {
  const rows = buildRows()
  const byRentDesc = [...rows].sort((a, b) => b.rent - a.rent)
  const byRentAsc = [...rows].sort((a, b) => a.rent - b.rent)
  const byVacancyAsc = [...rows].sort((a, b) => a.vacancy - b.vacancy)
  const mostExpensive = byRentDesc.slice(0, 15)
  const mostAffordable = byRentAsc.slice(0, 15)
  const tightest = byVacancyAsc.slice(0, 15)
  const avgRent = Math.round(rows.reduce((s, r) => s + r.rent, 0) / rows.length)
  const usAvg = Math.round(rows.filter(r => r.country === 'US').reduce((s, r) => s + r.rent, 0) / rows.filter(r => r.country === 'US').length)
  const caAvg = Math.round(rows.filter(r => r.country === 'Canada').reduce((s, r) => s + r.rent, 0) / rows.filter(r => r.country === 'Canada').length)
  const pageUrl = 'https://revun.com/reports/2026-rental-market-report/'

  const datasetSchema = {
    '@context': 'https://schema.org', '@type': 'Dataset',
    name: '2026 Rental Market Report: Median 1BR Rent and Vacancy by Metro (US and Canada)',
    description: `Median one-bedroom rent and rental vacancy rates across ${rows.length} US and Canadian metropolitan markets, compiled by Revun for 2026.`,
    creator: { '@type': 'Organization', name: 'Revun', url: 'https://revun.com' },
    url: pageUrl, license: 'https://creativecommons.org/licenses/by/4.0/',
    temporalCoverage: '2026', spatialCoverage: 'United States and Canada',
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(buildBreadcrumbSchema([
        { name: 'Home', url: 'https://revun.com/' },
        { name: 'Reports', url: 'https://revun.com/reports/' },
        { name: '2026 Rental Market Report', url: pageUrl },
      ])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(buildArticleSchema({
        headline: '2026 Rental Market Report: Median Rent and Vacancy Across the US and Canada',
        description: metadata.description as string, datePublished: '2026-06-06', dateModified: '2026-06-06', url: pageUrl, category: 'Market Report',
      })) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(datasetSchema) }} />

      {/* Hero */}
      <section className="bg-[#0A1628]">
        <div className="mx-auto max-w-4xl px-4 py-14 md:px-6 md:py-20 lg:px-8">
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/70"><Home className="h-4 w-4" /> Revun data report</p>
          <h1 className="font-display text-3xl font-extrabold text-white md:text-5xl">2026 Rental Market Report: Rent &amp; Vacancy Across the US and Canada</h1>
          <p className="mt-6 text-lg leading-relaxed text-white/80">Revun analyzed median one-bedroom rent and rental vacancy across <strong className="text-white">{rows.length} metros</strong> in the US and Canada. The full rankings, key findings, and methodology are below. Journalists and analysts are welcome to cite this report with a link to Revun.</p>
        </div>
      </section>

      {/* Key findings */}
      <section className="bg-[#F5F6F8] py-10 md:py-12">
        <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              ['Metros analyzed', `${rows.length}`],
              ['Avg 1BR rent', `$${avgRent.toLocaleString()}`],
              ['US avg 1BR', `$${usAvg.toLocaleString()}`],
              ['Canada avg 1BR', `$${caAvg.toLocaleString()}`],
            ].map(([k, v]) => (
              <div key={k} className="rounded-2xl border border-border bg-white p-5 text-center">
                <p className="font-display text-3xl font-extrabold text-brand-blue">{v}</p>
                <p className="mt-1 text-xs text-[#64748B]">{k}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Most expensive */}
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
          <h2 className="mb-4 inline-flex items-center gap-2 font-heading text-2xl font-bold text-brand-graphite"><TrendingUp className="h-6 w-6 text-brand-blue" /> Most expensive rental markets</h2>
          <Table rows={mostExpensive} metric="rent" />
        </div>
      </section>
      {/* Most affordable */}
      <section className="bg-brand-off-white py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
          <h2 className="mb-4 inline-flex items-center gap-2 font-heading text-2xl font-bold text-brand-graphite"><TrendingDown className="h-6 w-6 text-brand-blue" /> Most affordable rental markets</h2>
          <Table rows={mostAffordable} metric="rent" />
        </div>
      </section>
      {/* Tightest vacancy */}
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
          <h2 className="mb-4 inline-flex items-center gap-2 font-heading text-2xl font-bold text-brand-graphite"><MapPin className="h-6 w-6 text-brand-blue" /> Tightest markets (lowest vacancy)</h2>
          <Table rows={tightest} metric="vacancy" />
        </div>
      </section>

      {/* Methodology + cite */}
      <section className="bg-brand-off-white py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
          <h2 className="font-heading text-xl font-bold text-brand-graphite">Methodology</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#475569]">Figures reflect median advertised one-bedroom rent and reported rental vacancy for each metro, compiled by Revun for 2026 across {rows.length} US and Canadian markets. Rent is shown in each market's local currency. Rankings are drawn from the same market data that powers Revun's city pages.</p>
          <div className="mt-6 rounded-2xl border border-brand-blue/30 bg-brand-blue/5 p-6">
            <h3 className="font-heading text-base font-bold text-brand-graphite">Cite this report</h3>
            <p className="mt-2 text-sm text-[#475569]">Free to reference with attribution. Please credit <strong>Revun</strong> and link to <span className="font-semibold text-brand-blue">revun.com/reports/2026-rental-market-report</span>.</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/tools/rent-to-income-calculator/" className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-5 py-3 text-sm font-semibold text-brand-graphite transition-colors hover:border-brand-blue/40">Rent-to-income calculator <ArrowRight className="h-4 w-4 text-brand-blue" /></Link>
            <Link href="/laws/" className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-5 py-3 text-sm font-semibold text-brand-graphite transition-colors hover:border-brand-blue/40">Landlord-tenant law by state <ArrowRight className="h-4 w-4 text-brand-blue" /></Link>
          </div>
        </div>
      </section>
    </>
  )
}
