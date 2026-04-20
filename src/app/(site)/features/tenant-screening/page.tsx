import type { Metadata } from 'next'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'
import { TenantScreeningClient } from './client'

export const metadata: Metadata = {
  title: 'Tenant Screening: Credit, Identity, Income and CA + US Risk Scoring | Revun',
  description:
    'Equifax and TransUnion credit pulls, liveness ID verification, bank-linked income, LTB/RTB and state-court eviction lookups, and a CA + US-tuned risk score, all in one PIPEDA and CCPA-compliant pipeline.',
  alternates: { canonical: buildCanonicalUrl('/features/tenant-screening') },
  openGraph: {
    title: 'Tenant Screening | Revun',
    description:
      'Tenant screening across Canada and the US with Equifax + TransUnion credit, liveness ID, bank-linked income, provincial and state eviction lookups, and a risk score tuned for the North American rental market.',
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
