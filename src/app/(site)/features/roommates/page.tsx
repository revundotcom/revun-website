import type { Metadata } from 'next'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'
import { RoommatesClient } from './client'

export const metadata: Metadata = {
  title: 'Roommate Matching — Find Compatible Tenants | Revun',
  description:
    'Browse verified profiles, swipe to match, set lifestyle preferences, and connect with compatible roommates. Built into the Revun tenant experience.',
  alternates: { canonical: buildCanonicalUrl('/features/roommates') },
  openGraph: {
    title: 'Roommate Matching | Revun',
    description:
      'Find your perfect roommate. Verified profiles, lifestyle matching, preference filters, and in-app chat — all inside Revun.',
    url: buildCanonicalUrl('/features/roommates'),
  },
}

export default function RoommatesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Features', url: 'https://revun.com/features/' },
              { name: 'Roommates', url: 'https://revun.com/features/roommates/' },
            ])
          ),
        }}
      />
      <RoommatesClient />
    </>
  )
}
