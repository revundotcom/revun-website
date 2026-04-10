import type { Metadata } from 'next'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'
import { TenantPortalClient } from './client'

export const metadata: Metadata = {
  title: 'Tenant Portal — Self-Service for Rent, Maintenance & Documents | Revun',
  description:
    'One secure portal for the entire rental experience. Pay rent, submit maintenance requests, access lease documents, communicate with your property team, and manage your rental life — all from one place.',
  alternates: { canonical: buildCanonicalUrl('/features/tenant-portal') },
  openGraph: {
    title: 'Tenant Portal | Revun',
    description:
      'Pay rent, request maintenance, access documents, and communicate securely — all in one tenant portal.',
    url: buildCanonicalUrl('/features/tenant-portal'),
  },
}

export default function TenantPortalPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Features', url: 'https://revun.com/features/' },
              { name: 'Tenant Portal', url: 'https://revun.com/features/tenant-portal/' },
            ])
          ),
        }}
      />
      <TenantPortalClient />
    </>
  )
}
