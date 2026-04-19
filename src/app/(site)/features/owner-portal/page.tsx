import type { Metadata } from 'next'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'
import { OwnerPortalClient } from './client'

export const metadata: Metadata = {
  title: 'Owner Portal — Real-Time Visibility for Property Owners | Revun',
  description:
    'Give property owners real-time financial dashboards, document access, communication history, disbursement tracking, performance analytics, and approval workflows — all white-label ready.',
  alternates: { canonical: buildCanonicalUrl('/features/owner-portal') },
  openGraph: {
    title: 'Owner Portal | Revun',
    description:
      'Real-time dashboards, disbursement tracking, document vault, secure communications, and approval workflows — white-label ready for your brand.',
    url: buildCanonicalUrl('/features/owner-portal'),
  },
}

export default function OwnerPortalPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Features', url: 'https://revun.com/features/' },
              { name: 'Owner Portal', url: 'https://revun.com/features/owner-portal/' },
            ])
          ),
        }}
      />
      <OwnerPortalClient />
    </>
  )
}
