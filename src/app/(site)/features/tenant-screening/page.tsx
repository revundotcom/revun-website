import type { Metadata } from 'next'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'
import { TenantScreeningClient } from './client'

export const metadata: Metadata = {
  title: 'Tenant Screening — Credit, Identity, Income & Canadian Risk Scoring | Revun',
  description:
    'Equifax and TransUnion credit pulls, liveness ID verification, bank-linked income, LTB/RTB eviction lookups, and a Canadian-tuned risk score — all in one PIPEDA-compliant pipeline.',
  alternates: { canonical: buildCanonicalUrl('/features/tenant-screening') },
  openGraph: {
    title: 'Tenant Screening | Revun',
    description:
      'Canadian tenant screening with Equifax + TransUnion credit, liveness ID, bank-linked income, provincial eviction lookups, and a risk score tuned for the Canadian rental market.',
    url: buildCanonicalUrl('/features/tenant-screening'),
  },
}

export default function TenantScreeningPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Features', url: 'https://revun.com/features/' },
              { name: 'Tenant Screening', url: 'https://revun.com/features/tenant-screening/' },
            ])
          ),
        }}
      />
      <TenantScreeningClient />
    </>
  )
}
