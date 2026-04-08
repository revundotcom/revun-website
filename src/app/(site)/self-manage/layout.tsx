import type { Metadata } from 'next'
import { buildCanonicalUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Self-Manage Your Properties | Revun',
  description: 'Manage your own rental properties like a pro. Listings, screening, leases, rent collection, and maintenance from $1/day per unit.',
  alternates: { canonical: buildCanonicalUrl('/self-manage') },
  openGraph: {
    title: 'Self-Manage Your Properties | Revun',
    description: 'Manage your own rental properties with Revun.',
    url: buildCanonicalUrl('/self-manage'),
  },
}

export default function SelfManageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
