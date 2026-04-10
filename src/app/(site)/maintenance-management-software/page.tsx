import type { Metadata } from 'next'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema, buildServiceSchema } from '@/lib/schema-builders'
import { CategorySEOPage } from '@/components/blocks/category-seo-page'
import type { CategoryPageData } from '@/components/blocks/category-seo-page'

/* ── Metadata ────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: 'Maintenance Management Software for Property Operations | Revun',
  description:
    'Dispatch, track, document, and invoice — all from one system built for property maintenance operations. Work order intake, vendor dispatch, SLA tracking, and proof of completion.',
  alternates: { canonical: buildCanonicalUrl('/maintenance-management-software') },
  openGraph: {
    title: 'Maintenance Management Software for Property Operations | Revun',
    description:
      'Dispatch, track, document, and invoice — all from one system built for property maintenance operations.',
    url: buildCanonicalUrl('/maintenance-management-software'),
  },
}

/* ── Page Data ───────────────────────────────────────────────────────────── */

const pageData: CategoryPageData = {
  eyebrow: 'Maintenance Management Software',
  h1: (
    <>
      Maintenance management software from{' '}
      <span className="text-[#176FEB]">intake to payment</span>
    </>
  ),
  subtitle:
    'Dispatch, track, document, and invoice — all from one system built for property maintenance operations.',
  painPointsHeading: 'Why property maintenance still runs on phone calls',
  painPointsBody:
    'Maintenance requests arrive by text, email, and voicemail. Dispatch depends on memory. Proof of work is a photo lost in a camera roll. Invoicing lags weeks behind completion. Every manual step costs you money.',
  painPoints: [
    {
      title: 'No centralized intake',
      description:
        'Work orders arrive through phone, text, email, and walk-ups with no prioritization, categorization, or routing logic.',
    },
    {
      title: 'Phone-based dispatch',
      description:
        'Technician scheduling relies on verbal commitments, group chats, and memory. Conflicts burn hours every week.',
    },
    {
      title: 'Missing proof of work',
      description:
        'Before/after photos scattered across personal devices. No chain of custody. No tenant sign-off. No audit trail.',
    },
    {
      title: 'Delayed invoicing',
      description:
        'Manual invoice assembly after job completion causes cash flow delays and disputes over materials, labor, and markup.',
    },
  ],
  featuresHeading: 'Maintenance capabilities',
  featuresSubheading: 'From request to resolution to invoice, one system',
  features: [
    {
      title: 'Tenant Intake Portal',
      description:
        'Tenants submit maintenance requests with photos, descriptions, and priority through the portal. Auto-categorization by trade and location.',
      iconName: 'Home',
    },
    {
      title: 'Vendor Dispatch',
      description:
        'Preferred vendor lists, automated routing rules, availability management, and GPS tracking. Zero scheduling conflicts.',
      iconName: 'Wrench',
    },
    {
      title: 'Mobile Field Execution',
      description:
        'Technicians view assignments, update status in real time, upload photos, capture signatures, and log materials from the job site.',
      iconName: 'CheckCircle2',
    },
    {
      title: 'Proof of Completion',
      description:
        'Before/after photos, time logs, materials used, and tenant sign-off captured and stored per job. Auditable chain of custody.',
      iconName: 'CheckCircle2',
    },
    {
      title: 'SLA Tracking',
      description:
        'Configurable response and resolution time targets per category and priority. Automatic escalation when deadlines approach.',
      iconName: 'BarChart3',
    },
    {
      title: 'Invoicing Engine',
      description:
        'Auto-generate invoices from completed work orders with materials, labor, and markup. Payment tracking and automated collection reminders.',
      iconName: 'Landmark',
    },
  ],
  differentiatorHeading: 'Why Revun beats standalone maintenance tools',
  differentiators: [
    {
      title: 'Maintenance inside PM, not alongside it',
      description:
        'Work orders connect to units, tenants, leases, and financials. No re-keying data between a maintenance app and your property management system.',
    },
    {
      title: 'Tenant-facing from the start',
      description:
        'Tenants submit requests, track status, and receive updates through their portal. No phone tag, no lost messages, no he-said-she-said.',
    },
    {
      title: 'Financial close-the-loop',
      description:
        'Completed work orders flow directly into accounting. Owner charges, vendor payments, and expense categorization happen automatically.',
    },
  ],
}

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function MaintenanceManagementSoftwarePage() {
  const breadcrumbJsonLd = buildBreadcrumbSchema([
    { name: 'Home', url: 'https://revun.com/' },
    { name: 'Maintenance Management Software', url: buildCanonicalUrl('/maintenance-management-software') },
  ])

  const serviceJsonLd = buildServiceSchema({
    name: 'Revun Maintenance Management Software',
    description:
      'Property maintenance management software covering work order intake, vendor dispatch, SLA tracking, proof of completion, and invoicing for property operators.',
    serviceType: 'Maintenance Management Software',
    url: buildCanonicalUrl('/maintenance-management-software'),
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
