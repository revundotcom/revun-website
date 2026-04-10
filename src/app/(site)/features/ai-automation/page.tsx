import type { Metadata } from 'next'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'
import { AIAutomationClient } from './client'

export const metadata: Metadata = {
  title: 'AI & Automation — Intelligent Property Operations | Revun',
  description:
    'Automate maintenance triage, vendor matching, tenant follow-ups, workflow routing, and operational intelligence with AI built into every layer of Revun.',
  alternates: { canonical: buildCanonicalUrl('/features/ai-automation') },
  openGraph: {
    title: 'AI & Automation | Revun',
    description:
      'Workflow intelligence that classifies, routes, schedules, and notifies automatically — turning reactive operations into predictable execution.',
    url: buildCanonicalUrl('/features/ai-automation'),
  },
}

export default function AIAutomationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Features', url: 'https://revun.com/features/' },
              { name: 'AI & Automation', url: 'https://revun.com/features/ai-automation/' },
            ])
          ),
        }}
      />
      <AIAutomationClient />
    </>
  )
}
