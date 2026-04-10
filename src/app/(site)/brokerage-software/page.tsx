import type { Metadata } from 'next'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema, buildServiceSchema } from '@/lib/schema-builders'
import { CategorySEOPage } from '@/components/blocks/category-seo-page'
import type { CategoryPageData } from '@/components/blocks/category-seo-page'

/* ── Metadata ────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: 'Brokerage Software for Real Estate Transaction Management | Revun',
  description:
    'Client communication, showing coordination, offer submission, document automation, signatures, and compliance — one system for your entire brokerage. Built for Canadian real estate.',
  alternates: { canonical: buildCanonicalUrl('/brokerage-software') },
  openGraph: {
    title: 'Brokerage Software for Real Estate Transaction Management | Revun',
    description:
      'Client communication, showing coordination, offer submission, document automation, signatures, and compliance — one system for your entire brokerage.',
    url: buildCanonicalUrl('/brokerage-software'),
  },
}

/* ── Page Data ───────────────────────────────────────────────────────────── */

const pageData: CategoryPageData = {
  eyebrow: 'Brokerage Software',
  h1: (
    <>
      Brokerage software that closes deals{' '}
      <span className="text-[#176FEB]">without the chaos</span>
    </>
  ),
  subtitle:
    'Client communication, showing coordination, offer submission, document automation, signatures, and compliance — one system for your entire brokerage.',
  painPointsHeading: 'Why admin overhead kills deals before they close',
  painPointsBody:
    'Agents lose transactions because they are buried in paperwork. Offer packages take hours. Showing schedules collide. Compliance documentation is assembled after the fact. Every disconnected tool adds friction to the deal.',
  painPoints: [
    {
      title: 'CRM-to-transaction gap',
      description:
        'Contact data never flows into transaction execution. Agents re-enter information from CRM into offer documents manually.',
    },
    {
      title: 'Manual offer assembly',
      description:
        'Offer packages rely on email attachments, phone calls, and PDF editing. Assembly takes hours when it should take minutes.',
    },
    {
      title: 'Showing chaos',
      description:
        'Calendar conflicts, double-bookings, and no centralized feedback collection. Coordination burns hours every week.',
    },
    {
      title: 'Reactive compliance',
      description:
        'FINTRAC, RECO, and provincial form requirements are checked after the fact instead of being enforced during the transaction.',
    },
  ],
  featuresHeading: 'Brokerage capabilities',
  featuresSubheading: 'From first contact to closed deal, one system',
  features: [
    {
      title: 'Transaction CRM',
      description:
        'Contact management, pipeline tracking, activity logging, and automated follow-ups engineered for real estate deal flow. Every interaction recorded.',
      iconName: 'Briefcase',
    },
    {
      title: 'Document Automation',
      description:
        'Template-based offer packages, auto-populated fields from CRM data, e-signatures, and version control. Zero manual assembly.',
      iconName: 'FileKey2',
    },
    {
      title: 'Offer Command Center',
      description:
        'Submit, track, and compare offers in real time. Automatic notifications to all parties. Full audit trail on every submission.',
      iconName: 'CheckCircle2',
    },
    {
      title: 'Showing Operations',
      description:
        'Centralized calendar, lockbox integration, automated feedback collection, and route optimization. No double-bookings.',
      iconName: 'Home',
    },
    {
      title: 'Client Communications',
      description:
        'Branded email and SMS templates, automated drip sequences, and a shared activity timeline per client. Every touchpoint documented.',
      iconName: 'MessageSquare',
    },
    {
      title: 'Compliance Infrastructure',
      description:
        'FINTRAC, RECO, and provincial form libraries baked into every transaction. Auto-reminders enforce deadlines. Audit-ready at all times.',
      iconName: 'Landmark',
    },
  ],
  differentiatorHeading: 'Why brokerages are switching to Revun',
  differentiators: [
    {
      title: 'CRM and transactions in one system',
      description:
        'No more exporting contacts from your CRM into a separate transaction tool. Client data flows directly into offers, documents, and compliance records.',
    },
    {
      title: 'Canadian compliance built in',
      description:
        'FINTRAC identification requirements, RECO forms, and provincial contract templates are enforced during the transaction, not checked after close.',
    },
    {
      title: 'Brokerage-wide visibility',
      description:
        'Managing brokers see every deal, every agent, every compliance deadline from one dashboard. No chasing agents for status updates.',
    },
  ],
}

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function BrokerageSoftwarePage() {
  const breadcrumbJsonLd = buildBreadcrumbSchema([
    { name: 'Home', url: 'https://revun.com/' },
    { name: 'Brokerage Software', url: buildCanonicalUrl('/brokerage-software') },
  ])

  const serviceJsonLd = buildServiceSchema({
    name: 'Revun Brokerage Software',
    description:
      'Real estate brokerage software covering CRM, document automation, offer management, showing coordination, client communications, and compliance for Canadian brokerages.',
    serviceType: 'Real Estate Brokerage Software',
    url: buildCanonicalUrl('/brokerage-software'),
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
