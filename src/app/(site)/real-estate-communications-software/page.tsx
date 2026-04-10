import type { Metadata } from 'next'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema, buildServiceSchema } from '@/lib/schema-builders'
import { CategorySEOPage } from '@/components/blocks/category-seo-page'
import type { CategoryPageData } from '@/components/blocks/category-seo-page'

/* ── Metadata ────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: 'Real Estate Communications Software | Secure Messaging, Calls & Video | Revun',
  description:
    'Revun provides secure communications infrastructure for property operations — in-app messaging, VoIP, video, SMS, and email with full audit trail, role-based threads, and no personal phone numbers.',
  alternates: { canonical: buildCanonicalUrl('/real-estate-communications-software') },
  openGraph: {
    title: 'Real Estate Communications Software | Secure Messaging, Calls & Video | Revun',
    description:
      'Secure communications infrastructure for property operations — messaging, VoIP, video, SMS, and email with full audit trail and role-based threads.',
    url: buildCanonicalUrl('/real-estate-communications-software'),
  },
}

/* ── Page Data ───────────────────────────────────────────────────────────── */

const pageData: CategoryPageData = {
  eyebrow: 'Real Estate Communications Software',
  h1: (
    <>
      Secure communications infrastructure built for{' '}
      <span className="text-[#176FEB]">property operations</span>
    </>
  ),
  subtitle:
    'In-app messaging, VoIP, video, SMS, and email — no personal phone numbers, full audit trail, and role-based threads for every stakeholder in your portfolio.',
  painPointsHeading: 'Why property communication is a liability',
  painPointsBody:
    'Property managers, tenants, owners, and vendors communicate through personal phones, email, and text. There is no audit trail, no accountability, and no way to transfer context when staff changes.',
  painPoints: [
    {
      title: 'Personal phone numbers',
      description:
        'Staff use personal cell phones for tenant and vendor communication. When they leave, the conversation history walks out the door.',
    },
    {
      title: 'No audit trail',
      description:
        'Critical conversations about lease terms, maintenance approvals, and compliance notices happen in channels with no record tied to the property.',
    },
    {
      title: 'Channel fragmentation',
      description:
        'Some tenants text, some email, some call. Owners prefer email. Vendors use phone. Nothing is consolidated or searchable.',
    },
    {
      title: 'Compliance exposure',
      description:
        'Without documented communication history, disputes become he-said-she-said situations with no evidence trail for tribunals or legal proceedings.',
    },
  ],
  featuresHeading: 'Communications capabilities',
  featuresSubheading: 'Every channel, every stakeholder, one platform',
  features: [
    {
      title: 'In-App Messaging',
      description:
        'Threaded conversations between tenants, owners, vendors, and staff — tied to specific properties, units, and work orders with full search.',
      iconName: 'MessageSquare',
    },
    {
      title: 'Built-In VoIP',
      description:
        'Business phone numbers for every team member. Inbound and outbound calls logged automatically with call recordings and transcriptions.',
      iconName: 'Phone',
    },
    {
      title: 'Video Conferencing',
      description:
        'Secure video calls for virtual showings, owner meetings, and vendor consultations — launched directly from within the platform.',
      iconName: 'Video',
    },
    {
      title: 'SMS & Email Integration',
      description:
        'Send and receive SMS and email from the platform. All messages are logged to the property record regardless of which channel was used.',
      iconName: 'Mail',
    },
    {
      title: 'Role-Based Threads',
      description:
        'Conversations are scoped by role. Tenants see tenant threads, owners see owner threads, and vendors see only the work orders they are assigned to.',
      iconName: 'Users',
    },
    {
      title: 'Full Audit Trail',
      description:
        'Every message, call, and video session is logged with timestamps, participants, and content — searchable and exportable for compliance.',
      iconName: 'FileSearch',
    },
  ],
  differentiatorHeading: 'What makes Revun\'s communications different',
  differentiators: [
    {
      title: 'Built into operations, not bolted on',
      description:
        'Communications are not a separate tool. Every message is tied to a property, unit, lease, or work order in the system of record.',
    },
    {
      title: 'No personal phone numbers required',
      description:
        'Every team member gets a business number. When staff changes, the number and conversation history stay with the organization.',
    },
    {
      title: 'Compliance-ready by default',
      description:
        'Full audit trail on every interaction means you are always prepared for disputes, tribunals, and regulatory inquiries.',
    },
  ],
}

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function RealEstateCommunicationsSoftwarePage() {
  const breadcrumbJsonLd = buildBreadcrumbSchema([
    { name: 'Home', url: 'https://revun.com/' },
    { name: 'Real Estate Communications Software', url: buildCanonicalUrl('/real-estate-communications-software') },
  ])

  const serviceJsonLd = buildServiceSchema({
    name: 'Revun Real Estate Communications Software',
    description:
      'Secure communications infrastructure for property operations with in-app messaging, VoIP, video, SMS, email, full audit trail, and role-based threads.',
    serviceType: 'Real Estate Communications Software',
    url: buildCanonicalUrl('/real-estate-communications-software'),
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
