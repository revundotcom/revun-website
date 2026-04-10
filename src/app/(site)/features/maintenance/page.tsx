import type { Metadata } from 'next'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'
import { MaintenanceClient } from './client'

export const metadata: Metadata = {
  title: 'Maintenance — AI Triage, Vendor Dispatch & Proof of Work | Revun',
  description:
    'Submit maintenance requests, AI analyzes urgency and category, owners approve or decline, track technicians in real time, review before/after photos, and rate service quality.',
  alternates: { canonical: buildCanonicalUrl('/features/maintenance') },
  openGraph: {
    title: 'Maintenance | Revun',
    description:
      'The complete maintenance workflow. AI triage, scope of work, vendor dispatch, live tracking, proof of completion, and service ratings.',
    url: buildCanonicalUrl('/features/maintenance'),
  },
}

export default function MaintenancePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Features', url: 'https://revun.com/features/' },
              { name: 'Maintenance', url: 'https://revun.com/features/maintenance/' },
            ])
          ),
        }}
      />
      <MaintenanceClient />
    </>
  )
}
