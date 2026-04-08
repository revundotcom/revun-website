import type { Metadata } from 'next'
import { buildCanonicalUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Help Center | Revun',
  description: 'Find guides, tutorials, and answers to common questions about using Revun for property management.',
  alternates: { canonical: buildCanonicalUrl('/help') },
  openGraph: {
    title: 'Help Center | Revun',
    description: 'Guides and answers for Revun property management.',
    url: buildCanonicalUrl('/help'),
  },
}

export default function HelpLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
