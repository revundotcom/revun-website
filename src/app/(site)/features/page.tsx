import type { Metadata } from 'next'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { FeaturesPageClient } from './client'

export const metadata: Metadata = {
  title: 'Features',
  description:
    'Explore Revun platform features: tenant screening, rent collection, maintenance management, lease management, accounting, and owner portal. Built for property managers across Canada and the United States.',
  alternates: { canonical: buildCanonicalUrl('/features') },
  openGraph: {
    title: 'Features | Revun',
    description:
      'Six core modules that replace fragmented tools with one connected property operations platform.',
    url: buildCanonicalUrl('/features'),
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Revun Platform Features',
  description:
    'Explore Revun platform features: tenant screening, rent collection, maintenance management, lease management, accounting, and owner portal.',
  url: 'https://revun.com/features/',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Revun',
    url: 'https://revun.com/',
  },
}

export default function FeaturesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(jsonLd as Record<string, unknown>) }}
      />
      <FeaturesPageClient />
    </>
  )
}
