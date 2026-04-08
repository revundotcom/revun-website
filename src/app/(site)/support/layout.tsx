import type { Metadata } from 'next'
import { buildCanonicalUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Support | Revun',
  description: 'Get help with Revun. Choose your support path for Powered by Revun users or Self-Manage users.',
  alternates: { canonical: buildCanonicalUrl('/support') },
  openGraph: {
    title: 'Support | Revun',
    description: 'Get help with Revun property management.',
    url: buildCanonicalUrl('/support'),
  },
}

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
