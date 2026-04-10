import type { Metadata } from 'next'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema, buildServiceSchema } from '@/lib/schema-builders'
import { CategorySEOPage } from '@/components/blocks/category-seo-page'
import type { CategoryPageData } from '@/components/blocks/category-seo-page'

/* ── Metadata ────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: 'Property Management Operating System | Replace Your Entire Stack | Revun',
  description:
    'Revun is the property management operating system that replaces 5-8 disconnected tools with one infrastructure layer for leasing, payments, maintenance, communications, compliance, and reporting.',
  alternates: { canonical: buildCanonicalUrl('/property-management-operating-system') },
  openGraph: {
    title: 'Property Management Operating System | Replace Your Entire Stack | Revun',
    description:
      'The property management operating system that replaces 5-8 disconnected tools with one infrastructure layer for your entire operation.',
    url: buildCanonicalUrl('/property-management-operating-system'),
  },
}

/* ── Page Data ───────────────────────────────────────────────────────────── */

const pageData: CategoryPageData = {
  eyebrow: 'Property Management Operating System',
  h1: (
    <>
      The property management operating system that replaces{' '}
      <span className="text-[#176FEB]">5-8 disconnected tools</span>
    </>
  ),
  subtitle:
    'One infrastructure layer for leasing, payments, maintenance, communications, compliance, and reporting. Stop paying for and managing a fragmented stack.',
  painPointsHeading: 'The real cost of a fragmented stack',
  painPointsBody:
    'The average property management company uses 5-8 disconnected tools. Each tool has its own login, its own data silo, its own billing, and its own support team. The hidden cost is not just money — it is operational friction that compounds with every unit you add.',
  painPoints: [
    {
      title: '5-8 monthly subscriptions',
      description:
        'PM software, screening tool, accounting package, communications platform, maintenance system, document signing, payment processor — each with its own per-unit fee.',
    },
    {
      title: 'Data lives everywhere',
      description:
        'Tenant data in one system, financial data in another, maintenance history in a third. No single source of truth means no reliable reporting.',
    },
    {
      title: 'Integration fragility',
      description:
        'Sync jobs break, APIs change, middleware fails. Your operations depend on connections between systems that no one fully owns or monitors.',
    },
    {
      title: 'Onboarding complexity',
      description:
        'New staff must learn 5-8 different systems. Training takes weeks instead of days, and institutional knowledge is spread across platforms.',
    },
  ],
  featuresHeading: 'Platform capabilities',
  featuresSubheading: 'One system replaces your entire technology stack',
  features: [
    {
      title: 'Leasing Infrastructure',
      description:
        'Listing syndication, applications, screening, lease generation, e-signatures, and tenant onboarding — from first inquiry to move-in.',
      iconName: 'FileKey2',
    },
    {
      title: 'Payment Processing',
      description:
        'Rent collection, owner disbursements, vendor payments, trust accounting, and bank reconciliation — all processed within the platform.',
      iconName: 'CreditCard',
    },
    {
      title: 'Maintenance Operations',
      description:
        'Tenant intake, work order routing, vendor dispatch, SLA tracking, proof of completion, and invoicing from request to resolution.',
      iconName: 'Wrench',
    },
    {
      title: 'Communications Hub',
      description:
        'Messaging, VoIP, video, SMS, and email for every stakeholder — tied to properties and work orders with full audit trail.',
      iconName: 'MessageSquare',
    },
    {
      title: 'Compliance Engine',
      description:
        'Province- and state-specific notice templates, automated deadline tracking, and audit-ready documentation on every action.',
      iconName: 'Scale',
    },
    {
      title: 'Reporting & Analytics',
      description:
        'Real-time dashboards, owner statements, portfolio analytics, and custom reports — all generated from a single unified data layer.',
      iconName: 'BarChart3',
    },
  ],
  differentiatorHeading: 'Why operators choose an operating system over a feature set',
  differentiators: [
    {
      title: 'One platform, one bill, one login',
      description:
        'Replace 5-8 subscriptions with one platform. Eliminate integration maintenance, reduce training time, and simplify vendor management.',
    },
    {
      title: 'Infrastructure, not features',
      description:
        'Revun is not a PM tool with add-ons. It is an infrastructure layer where every capability shares the same data model and permission system.',
    },
    {
      title: 'Scales without breaking',
      description:
        'Add entities, portfolios, and team members without adding tools. The operating system grows with your business, not against it.',
    },
  ],
}

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function PropertyManagementOperatingSystemPage() {
  const breadcrumbJsonLd = buildBreadcrumbSchema([
    { name: 'Home', url: 'https://revun.com/' },
    { name: 'Property Management Operating System', url: buildCanonicalUrl('/property-management-operating-system') },
  ])

  const serviceJsonLd = buildServiceSchema({
    name: 'Revun Property Management Operating System',
    description:
      'Property management operating system replacing 5-8 disconnected tools with one infrastructure layer for leasing, payments, maintenance, communications, compliance, and reporting.',
    serviceType: 'Property Management Operating System',
    url: buildCanonicalUrl('/property-management-operating-system'),
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
