import type { Metadata } from 'next'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'
import { ComplianceClient } from './client'

export const metadata: Metadata = {
  title: 'North American Rental Compliance (Canada + US) | Revun',
  description:
    'Automated compliance across 13 Canadian provinces and territories plus all 50 US states and DC. LTB, RTB, TAL, RTDRS, DHCR, DRE, TREC, DBPR forms, rent-increase caps, notice deadlines, and a tamper-proof document vault.',
  alternates: { canonical: buildCanonicalUrl('/features/compliance') },
  openGraph: {
    title: 'North American Compliance | Revun',
    description:
      'Every Canadian province and US state. Every tribunal and state agency form. Every deadline. One compliance workflow.',
    url: buildCanonicalUrl('/features/compliance'),
  },
}

export default function CompliancePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Features', url: 'https://revun.com/features/' },
              { name: 'Compliance', url: 'https://revun.com/features/compliance/' },
            ]),
          ),
        }}
      />
      <ComplianceClient />
    </>
  )
}
