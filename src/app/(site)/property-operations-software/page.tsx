import type { Metadata } from 'next'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema, buildServiceSchema } from '@/lib/schema-builders'
import { CategorySEOPage } from '@/components/blocks/category-seo-page'
import type { CategoryPageData } from '@/components/blocks/category-seo-page'

/* ── Metadata ────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: 'Property Operations Software | The Operating System for Real Estate | Revun',
  description:
    'Revun unifies every property workflow — leasing, maintenance, payments, communications, compliance, and reporting — into one full-stack operating system with role-based access and multi-entity management.',
  alternates: { canonical: buildCanonicalUrl('/property-operations-software') },
  openGraph: {
    title: 'Property Operations Software | The Operating System for Real Estate | Revun',
    description:
      'Revun unifies every property workflow into one full-stack operating system with role-based access, compliance automation, and multi-entity management.',
    url: buildCanonicalUrl('/property-operations-software'),
  },
}

/* ── Page Data ───────────────────────────────────────────────────────────── */

const pageData: CategoryPageData = {
  eyebrow: 'Property Operations Software',
  h1: (
    <>
      The operating system that unifies every property workflow in{' '}
      <span className="text-[#176FEB]">one platform</span>
    </>
  ),
  subtitle:
    'Stop stitching together disconnected tools. Revun provides full-stack operations with unified data, role-based access, compliance automation, and multi-entity management.',
  painPointsHeading: 'Why property operations break down at scale',
  painPointsBody:
    'Growing portfolios expose every gap in your technology stack. What worked for 50 units collapses at 500. Data lives in silos, workflows require manual handoffs, and compliance becomes a liability.',
  painPoints: [
    {
      title: 'Tool sprawl',
      description:
        'Leasing, accounting, maintenance, communications, and compliance each live in a different system with separate logins and data formats.',
    },
    {
      title: 'Manual data transfer',
      description:
        'Teams copy data between systems, re-enter information, and reconcile spreadsheets because nothing shares a single source of truth.',
    },
    {
      title: 'No role-based control',
      description:
        'Everyone sees everything or nothing. There is no way to give regional managers, site staff, owners, and vendors the right level of access.',
    },
    {
      title: 'Compliance gaps',
      description:
        'Province- and state-specific requirements are tracked manually. Missed deadlines and incorrect notices create legal exposure.',
    },
  ],
  featuresHeading: 'Operations capabilities',
  featuresSubheading: 'One system of record for your entire property portfolio',
  features: [
    {
      title: 'Full-Stack Operations',
      description:
        'Leasing, maintenance, payments, communications, compliance, and reporting built into one platform — not bolted on through integrations.',
      iconName: 'Layers',
    },
    {
      title: 'Unified Data Layer',
      description:
        'Every transaction, conversation, work order, and document lives in one system of record with real-time cross-functional visibility.',
      iconName: 'Database',
    },
    {
      title: 'Role-Based Access',
      description:
        'Granular permissions for site staff, regional managers, executives, owners, tenants, and vendors. Everyone sees exactly what they need.',
      iconName: 'Shield',
    },
    {
      title: 'Compliance Automation',
      description:
        'Province- and state-specific notice templates, automated deadline tracking, and audit-ready logs on every action taken in the system.',
      iconName: 'CheckCircle2',
    },
    {
      title: 'Multi-Entity Management',
      description:
        'Manage multiple legal entities, funds, and portfolios from one platform with consolidated reporting and entity-level financial isolation.',
      iconName: 'Building2',
    },
    {
      title: 'Workflow Engine',
      description:
        'Automated task routing, approval chains, escalation rules, and SLA tracking that adapt to your organizational structure.',
      iconName: 'GitBranch',
    },
  ],
  differentiatorHeading: 'What makes Revun different from point solutions',
  differentiators: [
    {
      title: 'Operating system, not a feature set',
      description:
        'Revun is infrastructure. Every capability shares the same data model, the same permission system, and the same audit trail.',
    },
    {
      title: 'Built for multi-entity complexity',
      description:
        'REITs, asset managers, and growing operators need entity-level isolation with portfolio-wide visibility. Revun handles both natively.',
    },
    {
      title: 'Zero integration tax',
      description:
        'No middleware, no sync failures, no duplicate data. Everything runs on one platform with one login and one support line.',
    },
  ],
}

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function PropertyOperationsSoftwarePage() {
  const breadcrumbJsonLd = buildBreadcrumbSchema([
    { name: 'Home', url: 'https://revun.com/' },
    { name: 'Property Operations Software', url: buildCanonicalUrl('/property-operations-software') },
  ])

  const serviceJsonLd = buildServiceSchema({
    name: 'Revun Property Operations Software',
    description:
      'Full-stack property operations software unifying leasing, maintenance, payments, communications, compliance, and reporting with role-based access and multi-entity management.',
    serviceType: 'Property Operations Software',
    url: buildCanonicalUrl('/property-operations-software'),
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
