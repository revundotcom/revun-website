import type { Metadata } from 'next'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema, buildServiceSchema } from '@/lib/schema-builders'
import { CategorySEOPage } from '@/components/blocks/category-seo-page'
import type { CategoryPageData } from '@/components/blocks/category-seo-page'

/* ── Metadata ────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: 'Owner Portal Software | Real-Time Visibility for Property Owners | Revun',
  description:
    'Revun replaces monthly PDF reports with a real-time owner portal featuring financial dashboards, document access, communication history, disbursement tracking, and performance analytics.',
  alternates: { canonical: buildCanonicalUrl('/owner-portal') },
  openGraph: {
    title: 'Owner Portal Software | Real-Time Visibility for Property Owners | Revun',
    description:
      'Revun replaces monthly PDF reports with a real-time owner portal featuring financial dashboards, document access, communication history, disbursement tracking, and performance analytics.',
    url: buildCanonicalUrl('/owner-portal'),
  },
}

/* ── Page Data ───────────────────────────────────────────────────────────── */

const pageData: CategoryPageData = {
  eyebrow: 'Owner Portal Software',
  h1: (
    <>
      The owner portal that replaces monthly PDF reports with{' '}
      <span className="text-[#176FEB]">real-time control</span>
    </>
  ),
  subtitle:
    'Give property owners instant access to financial dashboards, documents, communication history, disbursement tracking, and performance analytics — all from one secure portal.',
  painPointsHeading: 'Why owner reporting is still broken',
  painPointsBody:
    'Most property managers still email PDF statements at month-end. Owners have no visibility between reports, no way to drill into line items, and no direct communication channel tied to their properties.',
  painPoints: [
    {
      title: 'Monthly PDF statements',
      description:
        'Owners wait 30 days for a static report that is outdated the moment it arrives. Questions require back-and-forth emails to resolve.',
    },
    {
      title: 'No self-serve access',
      description:
        'Owners cannot look up a lease, check a maintenance status, or download a tax document without calling their property manager.',
    },
    {
      title: 'Scattered communication',
      description:
        'Owner conversations happen across email, phone, and text with no central record tied to the property or unit.',
    },
    {
      title: 'Disbursement opacity',
      description:
        'Owners cannot see when funds were disbursed, which expenses were deducted, or how net income was calculated without manual assembly.',
    },
  ],
  featuresHeading: 'Portal capabilities',
  featuresSubheading: 'Everything an owner needs in one secure dashboard',
  features: [
    {
      title: 'Financial Dashboards',
      description:
        'Real-time revenue, expenses, NOI, and cash flow visualizations updated automatically as transactions are recorded in the system.',
      iconName: 'BarChart3',
    },
    {
      title: 'Document Access',
      description:
        'Leases, invoices, inspection reports, insurance certificates, and tax documents accessible on demand from a centralized document vault.',
      iconName: 'FileText',
    },
    {
      title: 'Communication History',
      description:
        'Full conversation log between owner, property manager, tenants, and vendors — tied to each property and searchable by date or topic.',
      iconName: 'MessageSquare',
    },
    {
      title: 'Disbursement Tracking',
      description:
        'Line-by-line visibility into every disbursement: rent collected, expenses deducted, reserves held, and net amount transferred.',
      iconName: 'Landmark',
    },
    {
      title: 'Performance Analytics',
      description:
        'Occupancy rates, lease renewal projections, maintenance cost trends, and year-over-year comparisons across the entire portfolio.',
      iconName: 'TrendingUp',
    },
    {
      title: 'Approval Workflows',
      description:
        'Owners review and approve expenses, capital expenditures, and vendor invoices directly in the portal with full audit trail.',
      iconName: 'CheckCircle2',
    },
  ],
  differentiatorHeading: 'What makes Revun\'s owner portal different',
  differentiators: [
    {
      title: 'Real-time, not monthly',
      description:
        'Every financial metric updates as transactions happen. No waiting for month-end close to see how your properties are performing.',
    },
    {
      title: 'Built into the operating system',
      description:
        'The owner portal is not a bolt-on add-on. It pulls directly from the same system your team uses for leasing, maintenance, and accounting.',
    },
    {
      title: 'Communication without context-switching',
      description:
        'Owners message their property manager from the same portal where they review financials — no separate email threads or phone tag.',
    },
  ],
}

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function OwnerPortalPage() {
  const breadcrumbJsonLd = buildBreadcrumbSchema([
    { name: 'Home', url: 'https://revun.com/' },
    { name: 'Owner Portal Software', url: buildCanonicalUrl('/owner-portal') },
  ])

  const serviceJsonLd = buildServiceSchema({
    name: 'Revun Owner Portal Software',
    description:
      'Real-time owner portal with financial dashboards, document access, communication history, disbursement tracking, and performance analytics for property owners.',
    serviceType: 'Owner Portal Software',
    url: buildCanonicalUrl('/owner-portal'),
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
