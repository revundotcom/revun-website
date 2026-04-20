import type { Metadata } from 'next'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'
import { ResourcesPageClient } from './client'

export const metadata: Metadata = {
  title: 'Resources | Playbooks, Templates & Market Intelligence | Revun',
  description:
    'Software education and operational intelligence for property operators across Canada and the US. Guides, comparison reports, compliance resources, market data, templates, and product updates.',
  alternates: { canonical: buildCanonicalUrl('/resources') },
  openGraph: {
    title: 'Resources | Playbooks, Templates & Market Intelligence | Revun',
    description:
      'Playbooks, comparison reports, implementation guides, market intelligence, and templates for modern property operations.',
    url: buildCanonicalUrl('/resources'),
  },
}

export default function ResourcesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Resources', url: 'https://revun.com/resources/' },
            ])
          ),
        }}
      />
      <ResourcesPageClient />
    </>
  )
}
