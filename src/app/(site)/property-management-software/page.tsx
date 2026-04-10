import type { Metadata } from 'next'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema, buildServiceSchema } from '@/lib/schema-builders'
import { CategorySEOPage } from '@/components/blocks/category-seo-page'
import type { CategoryPageData } from '@/components/blocks/category-seo-page'

/* ── Metadata ────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: 'Property Management Software for Canadian Operators | Revun',
  description:
    'Revun replaces disconnected property management tools with one infrastructure layer for leasing, maintenance, communications, payments, compliance, and reporting. Built for Canada.',
  alternates: { canonical: buildCanonicalUrl('/property-management-software') },
  openGraph: {
    title: 'Property Management Software for Canadian Operators | Revun',
    description:
      'Revun replaces disconnected property management tools with one infrastructure layer for leasing, maintenance, communications, payments, compliance, and reporting.',
    url: buildCanonicalUrl('/property-management-software'),
  },
}

/* ── Page Data ───────────────────────────────────────────────────────────── */

const pageData: CategoryPageData = {
  eyebrow: 'Property Management Software',
  h1: (
    <>
      Property management software that runs your{' '}
      <span className="text-[#176FEB]">entire operation</span>
    </>
  ),
  subtitle:
    'Revun replaces disconnected property management tools with one infrastructure layer for leasing, maintenance, communications, payments, compliance, and reporting.',
  painPointsHeading: 'Why existing PM software fails operators',
  painPointsBody:
    'Most property operations platforms were built for a US market in 2012. They bolt on features instead of building them in. The result is fragmented data, manual workarounds, and zero Canadian compliance.',
  painPoints: [
    {
      title: 'Fragmented systems',
      description:
        'Leasing in one tool, accounting in another, maintenance in a third. Nothing talks to anything else.',
    },
    {
      title: 'US-first, Canada-never',
      description:
        'Provincial lease forms, N-series notices, and Canadian banking rails are afterthoughts — or missing entirely.',
    },
    {
      title: 'No communication layer',
      description:
        'Tenant and owner communication happens outside the platform through email, text, and phone — leaving no audit trail.',
    },
    {
      title: 'Reporting requires assembly',
      description:
        'Owner reports, financial statements, and compliance documentation are manually compiled from multiple disconnected sources.',
    },
  ],
  featuresHeading: 'Platform capabilities',
  featuresSubheading: 'One system for your entire property operations workflow',
  features: [
    {
      title: 'Leasing Pipeline',
      description:
        'Listing syndication, applications, screening, lease generation, e-signatures, and tenant onboarding in one continuous workflow.',
      iconName: 'FileKey2',
    },
    {
      title: 'Maintenance Operations',
      description:
        'Tenant intake portal, work order routing, vendor dispatch, SLA tracking, proof of completion, and invoicing from one system.',
      iconName: 'Wrench',
    },
    {
      title: 'Financial Infrastructure',
      description:
        'Trust accounting, rent collection, owner disbursements, expense categorization, bank reconciliation, and tax document generation.',
      iconName: 'Landmark',
    },
    {
      title: 'Communications Hub',
      description:
        'In-platform messaging for tenants, owners, and vendors. No personal phone numbers. Full conversation history tied to each property.',
      iconName: 'MessageSquare',
    },
    {
      title: 'Compliance Automation',
      description:
        'Province-specific notice templates, automated deadline tracking, and audit-ready logs on every action. Built for Canadian law.',
      iconName: 'CheckCircle2',
    },
    {
      title: 'Owner & Tenant Portals',
      description:
        'Self-serve dashboards for owners and tenants. Real-time financials, document access, maintenance tracking, and secure communication.',
      iconName: 'Building2',
    },
  ],
  differentiatorHeading: 'What makes Revun different from every other PM platform',
  differentiators: [
    {
      title: 'Full-stack, not bolted-on',
      description:
        'Every feature is built into the core platform. No third-party integrations required for essential operations like payments, screening, or communications.',
    },
    {
      title: 'Canadian-native from day one',
      description:
        'Provincial lease forms, N-series notices, Canadian banking rails, and bilingual support are not add-ons. They are the foundation.',
    },
    {
      title: 'One system replaces your entire stack',
      description:
        'Stop paying for Buildium plus AppFolio plus a screening tool plus a communications tool. Revun handles it all under one login.',
    },
  ],
}

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function PropertyManagementSoftwarePage() {
  const breadcrumbJsonLd = buildBreadcrumbSchema([
    { name: 'Home', url: 'https://revun.com/' },
    { name: 'Property Management Software', url: buildCanonicalUrl('/property-management-software') },
  ])

  const serviceJsonLd = buildServiceSchema({
    name: 'Revun Property Management Software',
    description:
      'All-in-one property management software covering leasing, maintenance, communications, payments, compliance, and reporting for Canadian property operators.',
    serviceType: 'Property Management Software',
    url: buildCanonicalUrl('/property-management-software'),
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
