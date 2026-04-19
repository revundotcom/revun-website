import type { Metadata } from 'next'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'
import { RentCollectionClient } from './client'

export const metadata: Metadata = {
  title: 'Automated Rent Collection — PAD, Interac, Credit & Debit | Revun',
  description:
    'Automated rent collection for Canadian landlords and property managers. Pre-Authorized Debit, Interac e-Transfer, credit and debit cards — with auto-reminders, split payments, late fees, and real-time accounting reconciliation.',
  alternates: { canonical: buildCanonicalUrl('/features/rent-collection') },
  openGraph: {
    title: 'Rent Collection | Revun',
    description:
      'Collect rent on time, every time. PAD, Interac, credit, and debit with auto-reminders, split payments, late fees, and QuickBooks/Xero/Sage reconciliation.',
    url: buildCanonicalUrl('/features/rent-collection'),
  },
}

export default function RentCollectionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Features', url: 'https://revun.com/features/' },
              { name: 'Rent Collection', url: 'https://revun.com/features/rent-collection/' },
            ])
          ),
        }}
      />
      <RentCollectionClient />
    </>
  )
}
