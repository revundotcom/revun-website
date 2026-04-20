import type { Metadata } from 'next'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'
import { CoveragePageClient } from './client'

export const metadata: Metadata = {
  title: 'Coverage',
  description:
    'Revun operates across all 13 Canadian provinces and territories plus all 50 US states and DC, with jurisdiction-specific compliance built in.',
  alternates: { canonical: buildCanonicalUrl('/coverage') },
  openGraph: {
    title: 'Coverage | Revun',
    description:
      'Provincial and state compliance built into every workflow. See where Revun operates.',
    url: buildCanonicalUrl('/coverage'),
  },
}

export default function CoveragePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Coverage', url: 'https://revun.com/coverage/' },
            ])
          ),
        }}
      />
      <CoveragePageClient />
    </>
  )
}
