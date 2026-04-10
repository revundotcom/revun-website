import type { Metadata } from 'next'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'
import { LeasingClient } from './client'

export const metadata: Metadata = {
  title: 'Leasing — Offers, E-Signatures, Screening & Lease Management | Revun',
  description:
    'Review offers, counter or decline, sign leases electronically, verify tenant IDs, pull credit reports, and activate rental protection — all in one leasing workflow.',
  alternates: { canonical: buildCanonicalUrl('/features/leasing') },
  openGraph: {
    title: 'Leasing | Revun',
    description:
      'The complete leasing workflow. Offers, e-signatures, tenant screening, credit reports, and rental protection in one system.',
    url: buildCanonicalUrl('/features/leasing'),
  },
}

export default function LeasingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Features', url: 'https://revun.com/features/' },
              { name: 'Leasing', url: 'https://revun.com/features/leasing/' },
            ])
          ),
        }}
      />
      <LeasingClient />
    </>
  )
}
