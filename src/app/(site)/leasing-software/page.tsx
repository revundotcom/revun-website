import type { Metadata } from 'next'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema, buildServiceSchema } from '@/lib/schema-builders'
import { CategorySEOPage } from '@/components/blocks/category-seo-page'
import type { CategoryPageData } from '@/components/blocks/category-seo-page'

/* ── Metadata ────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: 'Leasing Software — Automate Your Full Leasing Lifecycle | Revun',
  description:
    'From inquiry to application to offer to lease to move-in — Revun automates the full leasing lifecycle. Applications, screening, offers, lease generation, signing, and onboarding in one system.',
  alternates: { canonical: buildCanonicalUrl('/leasing-software') },
  openGraph: {
    title: 'Leasing Software — Automate Your Full Leasing Lifecycle | Revun',
    description:
      'From inquiry to application to offer to lease to move-in — Revun automates the full leasing lifecycle.',
    url: buildCanonicalUrl('/leasing-software'),
  },
}

/* ── Page Data ───────────────────────────────────────────────────────────── */

const pageData: CategoryPageData = {
  eyebrow: 'Leasing Software',
  h1: (
    <>
      Leasing software that turns applications into{' '}
      <span className="text-[#176FEB]">signed leases</span>
    </>
  ),
  subtitle:
    'From inquiry to application to offer to lease to move-in — Revun automates the full leasing lifecycle.',
  painPointsHeading: 'Why leasing still breaks at every handoff',
  painPointsBody:
    'Applications arrive by email. Screening runs through a separate tool. Leases are assembled manually. Signatures chase tenants for days. Every handoff is a delay, a liability, or a lost applicant.',
  painPoints: [
    {
      title: 'Scattered intake',
      description:
        'Applications arrive through Kijiji, email, walk-ins, and web forms with no centralized pipeline or tracking.',
    },
    {
      title: 'Manual lease assembly',
      description:
        'Clause selection, field population, and provincial compliance handled by copy-paste instead of automation.',
    },
    {
      title: 'Disconnected screening',
      description:
        'Credit checks, identity verification, and references run through separate tools that do not feed back into the application.',
    },
    {
      title: 'No audit trail',
      description:
        'When regulators, boards, or tribunals ask for documentation, there is no centralized record of the leasing process.',
    },
  ],
  featuresHeading: 'Leasing capabilities',
  featuresSubheading: 'Every step from inquiry to move-in, automated',
  features: [
    {
      title: 'Application Pipeline',
      description:
        'Branded intake portal with conditional logic, document uploads, and automatic screening triggers. Every applicant enters one system.',
      iconName: 'CheckCircle2',
    },
    {
      title: 'Tenant Screening',
      description:
        'Credit, identity, employment, and reference verification in one pipeline. Score-based ranking eliminates guesswork on every applicant.',
      iconName: 'Users',
    },
    {
      title: 'Offer Management',
      description:
        'Generate, send, and track lease offers with configurable approval chains and automatic counter-offer handling. No email ping-pong.',
      iconName: 'FileKey2',
    },
    {
      title: 'Lease Generation',
      description:
        'Province-compliant templates, clause libraries, auto-populated fields, and e-signatures. Leases assembled in minutes, not hours.',
      iconName: 'FileKey2',
    },
    {
      title: 'Digital Signing',
      description:
        'E-signatures with full audit trail, timestamp verification, and automatic storage. Tenants sign from any device.',
      iconName: 'CheckCircle2',
    },
    {
      title: 'Tenant Onboarding',
      description:
        'Welcome packages, portal activation, move-in inspection checklists, utility setup reminders, and first-payment collection — all automated.',
      iconName: 'Home',
    },
  ],
  differentiatorHeading: 'Why operators choose Revun for leasing',
  differentiators: [
    {
      title: 'End-to-end, not point solution',
      description:
        'Revun does not just handle applications or just handle signing. It runs the full pipeline from first inquiry to move-in day without a single handoff to another tool.',
    },
    {
      title: 'Built for CA + US compliance',
      description:
        'Ontario Standard Lease, Alberta RTAR, BC RTB forms, and provincial notice requirements are built into every lease template by default.',
    },
    {
      title: 'Leasing feeds into operations',
      description:
        'When a lease is signed, the tenant portal activates, rent collection starts, and maintenance access opens. No re-entry into a separate PM system.',
    },
  ],
}

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function LeasingSoftwarePage() {
  const breadcrumbJsonLd = buildBreadcrumbSchema([
    { name: 'Home', url: 'https://revun.com/' },
    { name: 'Leasing Software', url: buildCanonicalUrl('/leasing-software') },
  ])

  const serviceJsonLd = buildServiceSchema({
    name: 'Revun Leasing Software',
    description:
      'Automated leasing lifecycle software covering applications, screening, offers, lease generation, e-signatures, and tenant onboarding for property operators across Canada and the US.',
    serviceType: 'Leasing Software',
    url: buildCanonicalUrl('/leasing-software'),
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(serviceJsonLd) }}
      />
      <CategorySEOPage data={pageData} />
    </>
  )
}
