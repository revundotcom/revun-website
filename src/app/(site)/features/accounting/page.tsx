import type { Metadata } from 'next'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'
import { AccountingClient } from './client'

export const metadata: Metadata = {
  title: 'Accounting & Reporting — Real-Time Financials, Trust Accounting & Disbursements | Revun',
  description:
    'Real-time financial dashboards, automated bank reconciliation, trust accounting, owner disbursements, tax-ready reporting, and QuickBooks/Xero integration.',
  alternates: { canonical: buildCanonicalUrl('/features/accounting') },
  openGraph: {
    title: 'Accounting & Reporting | Revun',
    description:
      'The complete financial infrastructure for property operations. Revenue tracking, expense management, trust accounting, and automated owner disbursements.',
    url: buildCanonicalUrl('/features/accounting'),
  },
}

export default function AccountingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Features', url: 'https://revun.com/features/' },
              { name: 'Accounting & Reporting', url: 'https://revun.com/features/accounting/' },
            ])
          ),
        }}
      />
      <AccountingClient />
    </>
  )
}
