import type { Metadata } from 'next'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'
import { DashboardsClient } from './client'

export const metadata: Metadata = {
  title: 'Dashboards — Real-Time Property Operations Command Centre | Revun',
  description:
    'Real-time dashboards for occupancy, revenue, maintenance, leasing pipeline, and portfolio performance. Role-based views for owners, operators, and teams.',
  alternates: { canonical: buildCanonicalUrl('/features/dashboards') },
  openGraph: {
    title: 'Dashboards | Revun',
    description:
      'Real-time operational visibility across your entire portfolio. Role-based dashboards for owners, operators, leasing agents, and maintenance teams.',
    url: buildCanonicalUrl('/features/dashboards'),
  },
}

export default function DashboardsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Features', url: 'https://revun.com/features/' },
              { name: 'Dashboards', url: 'https://revun.com/features/dashboards/' },
            ])
          ),
        }}
      />
      <DashboardsClient />
    </>
  )
}
