import type { Metadata } from 'next'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema, buildServiceSchema } from '@/lib/schema-builders'
import { CategorySEOPage } from '@/components/blocks/category-seo-page'
import type { CategoryPageData } from '@/components/blocks/category-seo-page'

/* ── Metadata ────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: 'Tenant Portal Software for Property Managers | Revun',
  description:
    'Payments, maintenance requests, secure communications, document access, and full transparency — all in one tenant-facing portal. Free for tenants when their property uses Revun.',
  alternates: { canonical: buildCanonicalUrl('/tenant-portal-software') },
  openGraph: {
    title: 'Tenant Portal Software for Property Managers | Revun',
    description:
      'Payments, maintenance requests, secure communications, document access, and full transparency — all in one tenant-facing portal.',
    url: buildCanonicalUrl('/tenant-portal-software'),
  },
}

/* ── Page Data ───────────────────────────────────────────────────────────── */

const pageData: CategoryPageData = {
  eyebrow: 'Tenant Portal Software',
  h1: (
    <>
      Tenant portal software your{' '}
      <span className="text-[#176FEB]">residents actually use</span>
    </>
  ),
  subtitle:
    'Payments, maintenance requests, secure communications, document access, and full transparency — all in one tenant-facing portal.',
  painPointsHeading: 'Why tenants ignore your current portal',
  painPointsBody:
    'Most tenant portals are afterthoughts bolted onto property management software. They are clunky, limited, and force tenants back to email and phone for anything real. The result is zero adoption and zero operational benefit.',
  painPoints: [
    {
      title: 'Payment friction',
      description:
        'Tenants default to e-transfers and cheques because the portal payment flow is confusing, slow, or charges extra fees.',
    },
    {
      title: 'Maintenance black hole',
      description:
        'Tenants submit a request and hear nothing. No status updates, no timeline, no proof of completion. They call you instead.',
    },
    {
      title: 'No communication channel',
      description:
        'The portal has no messaging. Tenants revert to personal text and email. You lose the audit trail.',
    },
    {
      title: 'Documents are inaccessible',
      description:
        'Leases, notices, and receipts are buried in email attachments or never provided digitally at all.',
    },
  ],
  featuresHeading: 'Portal capabilities',
  featuresSubheading: 'Everything tenants need in one place they actually want to use',
  features: [
    {
      title: 'Secure Rent Payments',
      description:
        'Pre-authorized debit, credit card, or e-transfer. Automated receipts, payment history, and late notices. No personal banking details shared.',
      iconName: 'CreditCard',
    },
    {
      title: 'Maintenance Requests',
      description:
        'Submit requests with photos and descriptions. Track status from submission to completion. Full history stored permanently in the tenant profile.',
      iconName: 'Wrench',
    },
    {
      title: 'Secure Messaging',
      description:
        'In-portal messaging with your property manager. No personal phone numbers exchanged. Every conversation documented and tied to the unit.',
      iconName: 'MessageSquare',
    },
    {
      title: 'Document Vault',
      description:
        'Lease agreements, notices, inspection reports, and payment receipts stored securely and accessible anytime. No searching through email.',
      iconName: 'FileKey2',
    },
    {
      title: 'Transparency Dashboard',
      description:
        'Real-time visibility into rent balance, upcoming payments, active maintenance requests, and lease terms. Tenants self-serve instead of calling you.',
      iconName: 'BarChart3',
    },
    {
      title: 'Application & Renewal',
      description:
        'Apply for units, submit renewal requests, and manage move-out notices directly through the portal. Full lifecycle from the tenant side.',
      iconName: 'CheckCircle2',
    },
  ],
  differentiatorHeading: 'Why Revun portals get adopted',
  differentiators: [
    {
      title: 'Designed for tenants, not just managers',
      description:
        'The portal is built from the tenant perspective first. Clean interface, mobile-optimized, and genuinely useful enough that residents choose to use it.',
    },
    {
      title: 'Connected to the full platform',
      description:
        'Payments sync to accounting. Maintenance requests sync to vendor dispatch. Messages sync to the property record. Everything flows both ways.',
    },
    {
      title: 'Free for tenants, always',
      description:
        'Tenants never pay for Revun. Portal access is included when the property uses the platform. No upsells, no premium tiers, no friction.',
    },
  ],
}

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function TenantPortalSoftwarePage() {
  const breadcrumbJsonLd = buildBreadcrumbSchema([
    { name: 'Home', url: 'https://revun.com/' },
    { name: 'Tenant Portal Software', url: buildCanonicalUrl('/tenant-portal-software') },
  ])

  const serviceJsonLd = buildServiceSchema({
    name: 'Revun Tenant Portal Software',
    description:
      'Tenant portal software with secure rent payments, maintenance requests, in-portal messaging, document access, and full transparency for property managers and their residents.',
    serviceType: 'Tenant Portal Software',
    url: buildCanonicalUrl('/tenant-portal-software'),
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
