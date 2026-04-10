import type { Metadata } from 'next'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'

export const metadata: Metadata = {
  title: 'Integrations | Connect Revun to Your Business Systems',
  description:
    'Revun sits at the center of your operation, connecting accounting, communications, screening, identity verification, signatures, CRM, and reporting.',
  alternates: { canonical: buildCanonicalUrl('/integrations') },
  openGraph: {
    title: 'Integrations | Connect Revun to Your Business Systems',
    description:
      'Connect Revun to accounting, communications, payments, screening, signatures, CRM, and reporting.',
    url: buildCanonicalUrl('/integrations'),
  },
}

export default function IntegrationsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(buildBreadcrumbSchema([
            { name: 'Home', url: 'https://revun.com/' },
            { name: 'Integrations', url: 'https://revun.com/integrations/' },
          ])),
        }}
      />
      {children}
    </>
  )
}
