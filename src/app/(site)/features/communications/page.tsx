import type { Metadata } from 'next'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'
import { CommunicationsClient } from './client'

export const metadata: Metadata = {
  title: 'Communications — Messaging, Calls, Video & Transcripts | Revun',
  description:
    'Message tenants, owners, vendors, and teams. Voice and video calls built in. Every message recorded, every transcript searchable, every file saved.',
  alternates: { canonical: buildCanonicalUrl('/features/communications') },
  openGraph: {
    title: 'Communications | Revun',
    description:
      'Unified messaging, voice and video calls, group meetings, transcription, and recordings — all built into one property management platform.',
    url: buildCanonicalUrl('/features/communications'),
  },
}

export default function CommunicationsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Features', url: 'https://revun.com/features/' },
              { name: 'Communications', url: 'https://revun.com/features/communications/' },
            ])
          ),
        }}
      />
      <CommunicationsClient />
    </>
  )
}
