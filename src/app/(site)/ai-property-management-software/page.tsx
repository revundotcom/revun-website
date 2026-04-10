import type { Metadata } from 'next'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema, buildServiceSchema } from '@/lib/schema-builders'
import { CategorySEOPage } from '@/components/blocks/category-seo-page'
import type { CategoryPageData } from '@/components/blocks/category-seo-page'

/* ── Metadata ────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: 'AI Property Management Software | Intelligent Automation for Operations | Revun',
  description:
    'Revun AI runs property operations — auto-classification, vendor matching, smart dispatch, predictive maintenance, automated follow-ups, and workflow intelligence that goes beyond chatbots.',
  alternates: { canonical: buildCanonicalUrl('/ai-property-management-software') },
  openGraph: {
    title: 'AI Property Management Software | Intelligent Automation for Operations | Revun',
    description:
      'AI that runs property operations — auto-classification, vendor matching, smart dispatch, predictive maintenance, and workflow intelligence.',
    url: buildCanonicalUrl('/ai-property-management-software'),
  },
}

/* ── Page Data ───────────────────────────────────────────────────────────── */

const pageData: CategoryPageData = {
  eyebrow: 'AI Property Management Software',
  h1: (
    <>
      AI that runs property operations, not just{' '}
      <span className="text-[#176FEB]">answers questions</span>
    </>
  ),
  subtitle:
    'Auto-classification, vendor matching, smart dispatch, predictive maintenance, automated follow-ups, and workflow intelligence — embedded into every operation, not bolted on as a chatbot.',
  painPointsHeading: 'Why AI chatbots are not enough',
  painPointsBody:
    'Most property management platforms slap a chatbot on the front end and call it AI. Real operational intelligence requires deep integration with your data, workflows, and decision-making processes.',
  painPoints: [
    {
      title: 'Chatbot theater',
      description:
        'A tenant-facing chatbot that answers FAQs does not reduce your team\'s workload. It just deflects questions that still require human follow-up.',
    },
    {
      title: 'No operational context',
      description:
        'AI that cannot access lease data, maintenance history, vendor performance, and financial records cannot make meaningful operational decisions.',
    },
    {
      title: 'Manual classification',
      description:
        'Staff manually categorize maintenance requests, route work orders, and match vendors — repetitive tasks that should be automated.',
    },
    {
      title: 'Reactive maintenance',
      description:
        'Without predictive intelligence, every maintenance issue is a surprise. Patterns in work order data go unanalyzed and preventable failures repeat.',
    },
  ],
  featuresHeading: 'AI capabilities',
  featuresSubheading: 'Intelligence embedded in every operational workflow',
  features: [
    {
      title: 'Auto-Classification',
      description:
        'Incoming maintenance requests are automatically categorized by trade, urgency, and affected system — reducing triage time to zero.',
      iconName: 'Tags',
    },
    {
      title: 'Vendor Matching',
      description:
        'AI selects the best vendor based on trade specialty, availability, proximity, historical performance, and cost — then dispatches automatically.',
      iconName: 'UserCheck',
    },
    {
      title: 'Smart Dispatch',
      description:
        'Work orders are routed to the right person or vendor based on skills, workload, location, and SLA requirements without manual assignment.',
      iconName: 'Route',
    },
    {
      title: 'Predictive Maintenance',
      description:
        'Pattern analysis across work order history identifies recurring issues and predicts failures before they become emergencies or tenant complaints.',
      iconName: 'Activity',
    },
    {
      title: 'Automated Follow-Ups',
      description:
        'AI monitors open tasks, pending approvals, and unanswered messages — then sends follow-ups and escalations based on configurable rules.',
      iconName: 'BellRing',
    },
    {
      title: 'Workflow Intelligence',
      description:
        'The system learns from your operational patterns and suggests process improvements, staffing adjustments, and cost optimization opportunities.',
      iconName: 'Brain',
    },
  ],
  differentiatorHeading: 'What makes Revun\'s AI different',
  differentiators: [
    {
      title: 'Operational AI, not conversational AI',
      description:
        'Revun AI makes decisions, routes work, and takes action. It is not a chatbot — it is an operational layer that reduces your team\'s manual workload.',
    },
    {
      title: 'Full data access from day one',
      description:
        'Because AI is embedded in the platform, it has access to every lease, work order, payment, and conversation — no data pipeline required.',
    },
    {
      title: 'Continuous learning',
      description:
        'The system improves over time by analyzing outcomes. Vendor performance, resolution times, and cost patterns feed back into smarter decisions.',
    },
  ],
}

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function AiPropertyManagementSoftwarePage() {
  const breadcrumbJsonLd = buildBreadcrumbSchema([
    { name: 'Home', url: 'https://revun.com/' },
    { name: 'AI Property Management Software', url: buildCanonicalUrl('/ai-property-management-software') },
  ])

  const serviceJsonLd = buildServiceSchema({
    name: 'Revun AI Property Management Software',
    description:
      'AI-powered property management software with auto-classification, vendor matching, smart dispatch, predictive maintenance, automated follow-ups, and workflow intelligence.',
    serviceType: 'AI Property Management Software',
    url: buildCanonicalUrl('/ai-property-management-software'),
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
