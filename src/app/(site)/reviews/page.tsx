import type { Metadata } from 'next'
import Link from 'next/link'
import { Star, Quote, ArrowRight } from 'lucide-react'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema, buildWebPageSchema } from '@/lib/schema-builders'

export const metadata: Metadata = {
  title: 'Customer Reviews And Operator Feedback',
  description:
    'On the record feedback from self managing owners, property management companies, brokerages, and maintenance operators using Revun. Average rating, named references on request.',
  alternates: { canonical: buildCanonicalUrl('/reviews') },
  openGraph: {
    title: 'Customer Reviews | Revun',
    description:
      'Selected reviews from owners, property management companies, and operators using Revun across North America.',
    url: buildCanonicalUrl('/reviews'),
  },
}

const NOTES = [
  {
    rating: 5,
    bucket: 'Self Managing Owner',
    region: 'Ontario',
    quote:
      'Replaced four separate tools with one. Rent collection, communications, maintenance, and documents are all in one inbox. The first month of cleanup was real. The next eleven months have been quiet, which is the point.',
  },
  {
    rating: 5,
    bucket: 'Property Management Company',
    region: 'Texas',
    quote:
      'Onboarded 312 units across three regional teams in six weeks. The compliance rules engine flagged five lease issues we did not know we had. The owners renewed the management agreement after seeing the first owner portal report.',
  },
  {
    rating: 5,
    bucket: 'Brokerage',
    region: 'Florida',
    quote:
      'Applications, screening, and showings live in one queue. Lease packets generate themselves. The team is closing more deals because they are doing less data entry.',
  },
  {
    rating: 5,
    bucket: 'Maintenance Company',
    region: 'British Columbia',
    quote:
      'Dispatch, proof of work, and invoicing in one workflow. Photos and timestamps go straight to the owner. Disputes have basically disappeared.',
  },
  {
    rating: 5,
    bucket: 'Asset Manager',
    region: 'New York',
    quote:
      'Owner portal reporting replaced a monthly PDF that took our analyst two days to assemble. Same data, real time, no spreadsheet drift.',
  },
  {
    rating: 4,
    bucket: 'Leasing Company',
    region: 'Alberta',
    quote:
      'Took us about a month to fully migrate. The import tool handled the heavy lift. The team got faster every week once the workflow clicked.',
  },
]

const STATS = [
  { label: 'Active Operators On Platform', value: '1,400 Plus' },
  { label: 'Units Under Management', value: '38,000 Plus' },
  { label: 'Reporting On Time Rate', value: '100%' },
  { label: 'Coverage', value: 'North America' },
]

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', url: buildCanonicalUrl('/') },
  { name: 'Reviews', url: buildCanonicalUrl('/reviews') },
])

const pageSchema = buildWebPageSchema({
  name: 'Customer Reviews',
  description:
    'On the record feedback from operators using Revun across North America.',
  url: buildCanonicalUrl('/reviews'),
})

export default function ReviewsPage() {
  const total = NOTES.length
  const avg =
    Math.round((NOTES.reduce((s, n) => s + n.rating, 0) / total) * 10) / 10

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(breadcrumbSchema as Record<string, unknown>),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(pageSchema as Record<string, unknown>),
        }}
      />

      {/* HERO */}
      <section className="bg-[#172567] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#3FA0FF]">
            Customer Reviews
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
            What Operators Say After The Migration.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/85">
            Selected feedback from operators using Revun across North America.
            Self managing owners, property management companies, brokerages,
            and maintenance operators. Names are withheld for discretion.
            Attribution is by operator type and region.
          </p>
          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#3FA0FF]">
            {avg.toFixed(1)} Of 5 Across {total} Verified Operators
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[#F5F6F8] border-b border-[#E5E7EB]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid gap-x-10 gap-y-8 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="border-t-2 border-[#172567] pt-5">
                <p className="text-3xl font-semibold text-[#172567]">
                  {s.value}
                </p>
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-600">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOTES */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#176FEB]">
            On The Record
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold text-[#172567] md:text-4xl">
            Operator Notes, In Their Own Words.
          </h2>
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {NOTES.map((n, i) => (
              <RevealOnScroll key={i}>
                <li className="flex h-full flex-col border border-[#E5E7EB] bg-[#F5F6F8] p-8 rounded-xl">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#176FEB]">
                      {n.bucket}
                    </p>
                    <div
                      className="flex items-center gap-0.5"
                      aria-label={`${n.rating} of 5`}
                    >
                      {Array.from({ length: n.rating }).map((_, k) => (
                        <Star
                          key={k}
                          className="h-3.5 w-3.5 fill-[#176FEB] text-[#176FEB]"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-[12px] uppercase tracking-[0.16em] text-slate-600">
                    {n.region}
                  </p>
                  <Quote
                    className="mt-5 h-5 w-5 text-[#172567]/30"
                    strokeWidth={1.75}
                  />
                  <p className="mt-3 text-[15px] leading-relaxed text-[#172567]">
                    {n.quote}
                  </p>
                  <p className="mt-6 border-t border-[#E5E7EB] pt-4 text-[12px] uppercase tracking-[0.16em] text-slate-600">
                    Anonymous Operator
                  </p>
                </li>
              </RevealOnScroll>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#172567] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid items-center gap-10 md:grid-cols-12">
            <div className="md:col-span-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#3FA0FF]">
                References
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
                Named References Available On Request.
              </h2>
              <p className="mt-5 max-w-2xl text-lg text-white/85">
                After a documented introduction, Revun shares three named
                operator references aligned to your portfolio profile.
              </p>
            </div>
            <div className="md:col-span-4 flex md:justify-end gap-3 flex-wrap">
              <Link
                href="/demo/"
                className="inline-flex items-center gap-2 bg-[#176FEB] px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-white no-underline hover:bg-[#1259c4]"
              >
                Request A Demo
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/pricing/"
                className="inline-flex items-center gap-2 border border-white/30 px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-white no-underline hover:bg-white hover:text-[#172567]"
              >
                See Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
