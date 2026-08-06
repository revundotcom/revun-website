import type { Metadata } from 'next'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'
import { CommunicationsClient } from './client'

export const metadata: Metadata = {
  title: 'Communications — Messaging, Calls, Video & Transcripts | Revun',
  description:
    'Every tenant, owner, and vendor conversation stays attached to the unit — calls, video, and searchable transcripts on the record. No personal numbers exposed, no context lost between staff.',
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
