import type { Metadata } from 'next'
import { buildCanonicalUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Support & Training | Revun',
  description: 'Find guides, tutorials, and answers organized by role and product area. Support for owners, tenants, property managers, and more.',
  alternates: { canonical: buildCanonicalUrl('/help') },
  openGraph: {
    title: 'Support & Training | Revun',
    description: 'Guides, tutorials, and answers organized by role and product area.',
    url: buildCanonicalUrl('/help'),
  },
}

export default function HelpLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
