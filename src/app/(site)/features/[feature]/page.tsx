import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  Users,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { iconMap } from '@/lib/icon-map'

interface Capability {
  title: string
  description: string
}

interface Step {
  number: string
  title: string
  description: string
}

interface FeatureData {
  title: string
  metaTitle: string
  metaDescription: string
  iconName: string
  heroDescription: string
  capabilities: Capability[]
  steps: Step[]
}

const featureData: Record<string, FeatureData> = {
  /* tenant-screening has a dedicated rich page at /features/tenant-screening/ */
  /* rent-collection has a dedicated rich page at /features/rent-collection/ */
  'maintenance-management': {
    title: 'Maintenance Management',
    metaTitle: 'Property Maintenance Management Software',
    metaDescription:
      'Streamline maintenance requests with tenant portals, vendor routing, work order tracking, and AI-powered priority routing for property managers.',
    iconName: 'Wrench',
    heroDescription:
      'Tenant request portals, AI-powered priority routing, vendor dispatch, and proof-of-completion tracking. From request to resolution in one system.',
    capabilities: [
      { title: 'Tenant Request Portal', description: 'Tenants submit requests with photos and descriptions. AI categorizes and prioritizes automatically.' },
      { title: 'Vendor Routing', description: 'Smart vendor matching based on skill, availability, location, and cost. Automatic dispatch and scheduling.' },
      { title: 'Work Order Tracking', description: 'Full lifecycle tracking from request to completion with status updates, time logs, and cost tracking.' },
      { title: 'Proof of Completion', description: 'Before/after photos, tenant sign-off, and invoice capture. Complete audit trail for every job.' },
    ],
    steps: [
      { number: '01', title: 'Tenant submits request', description: 'Tenants describe the issue with photos through the portal. AI categorizes and sets priority.' },
      { number: '02', title: 'Vendor dispatched', description: 'The right vendor is matched and dispatched automatically based on issue type and location.' },
      { number: '03', title: 'Resolved and documented', description: 'Vendor completes the work, uploads proof, and the tenant confirms resolution.' },
    ],
  },
  /* lease-management redirects to /features/leasing/ which has the full rich page */
  /* accounting redirects to /features/accounting/ which has the full rich page */
  /* owner-portal has dedicated rich page at /features/owner-portal/ */
  communications: {
    title: 'Communications',
    metaTitle: 'Secure Property Communications Platform | Revun',
    metaDescription:
      'Encrypted messaging, calling, and video for property operations. Full audit trail, no personal numbers shared. One inbox for owners, tenants, vendors, and applicants.',
    iconName: 'MessageSquare',
    heroDescription:
      'Stop toggling between email, text, and voicemail. Revun deploys encrypted messaging, calling, and video with a full audit trail — every owner, tenant, vendor, and applicant in one unified command center.',
    capabilities: [
      { title: 'Unified Inbox', description: 'Every conversation with owners, tenants, vendors, and applicants in one place — tagged by property, unit, and contact type.' },
      { title: 'Encrypted Messaging', description: 'End-to-end encrypted messaging with read receipts, delivery status, and full conversation history. No personal phone numbers shared.' },
      { title: 'Voice & Video Calls', description: 'Call tenants, owners, and vendors directly through the platform. Calls are recorded, logged, and tied to the right property record.' },
      { title: 'Audit-Ready Documentation', description: 'Every message, call, and file is automatically saved with timestamps — ready for disputes, compliance reviews, or tribunal proceedings.' },
    ],
    steps: [
      { number: '01', title: 'Connect your contacts', description: 'Owners, tenants, vendors, and applicants are automatically linked to their properties and units.' },
      { number: '02', title: 'Communicate from one inbox', description: 'Send messages, make calls, and share files without leaving the platform or sharing personal contact details.' },
      { number: '03', title: 'Everything documented', description: 'Full conversation history, call recordings, and file attachments are stored and searchable — no context ever lost.' },
    ],
  },
  maintenance: {
    title: 'Maintenance Management',
    metaTitle: 'Property Maintenance Management Software | Revun',
    metaDescription:
      'Streamline maintenance requests with tenant portals, vendor routing, work order tracking, and AI-powered priority routing for property managers.',
    iconName: 'Wrench',
    heroDescription:
      'Tenant request portals, AI-powered priority routing, vendor dispatch, and proof-of-completion tracking. From request to resolution in one system.',
    capabilities: [
      { title: 'Tenant Request Portal', description: 'Tenants submit requests with photos and descriptions. AI categorizes and prioritizes automatically.' },
      { title: 'Vendor Routing', description: 'Smart vendor matching based on skill, availability, location, and cost. Automatic dispatch and scheduling.' },
      { title: 'Work Order Tracking', description: 'Full lifecycle tracking from request to completion with status updates, time logs, and cost tracking.' },
      { title: 'Proof of Completion', description: 'Before/after photos, tenant sign-off, and invoice capture. Complete audit trail for every job.' },
    ],
    steps: [
      { number: '01', title: 'Tenant submits request', description: 'Tenants describe the issue with photos through the portal. AI categorizes and sets priority.' },
      { number: '02', title: 'Vendor dispatched', description: 'The right vendor is matched and dispatched automatically based on issue type and location.' },
      { number: '03', title: 'Resolved and documented', description: 'Vendor completes the work, uploads proof, and the tenant confirms resolution.' },
    ],
  },
  /* compliance has dedicated rich page at /features/compliance/ */
  /* ai-automation has dedicated rich page at /features/ai-automation/ */
  /* dashboards has dedicated rich page at /features/dashboards/ */
  'tenant-portal': {
    title: 'Tenant Portal',
    metaTitle: 'Self-Service Tenant Portal Software | Revun',
    metaDescription:
      'Give tenants a self-service portal for rent payments, maintenance requests, lease documents, and secure communication — accessible 24/7 from any device.',
    iconName: 'KeyRound',
    heroDescription:
      'One secure portal for the entire rental experience. Tenants pay rent, submit maintenance requests, access lease documents, and communicate with their property team — all from one place, on any device.',
    capabilities: [
      { title: 'Online Rent Payments', description: 'Tenants pay rent via ACH, credit card, or Interac e-Transfer with auto-reminders and instant receipts.' },
      { title: 'Maintenance Requests', description: 'Submit and track maintenance requests with photos, status updates, and real-time notifications on progress.' },
      { title: 'Document Access', description: 'Lease agreements, move-in checklists, notices, and receipts available 24/7 in a secure document vault.' },
      { title: 'Secure Messaging', description: 'Message the property team directly through the portal — no personal numbers, full conversation history, and read receipts.' },
    ],
    steps: [
      { number: '01', title: 'Tenant receives invite', description: 'New tenants get a portal invitation during onboarding. They set up their account in under 2 minutes.' },
      { number: '02', title: 'Self-serve everything', description: 'Pay rent, request maintenance, download documents, and message the property team — all from the portal.' },
      { number: '03', title: 'Stay connected 24/7', description: 'Access the portal from any device, any time. Push notifications keep tenants informed on payments and requests.' },
    ],
  },
}

export function generateStaticParams() {
  return Object.keys(featureData).map((feature) => ({ feature }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ feature: string }>
}): Promise<Metadata> {
  const { feature } = await params
  const data = featureData[feature]
  if (!data) return {}
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: { canonical: buildCanonicalUrl(`/features/${feature}`) },
    openGraph: {
      title: `${data.metaTitle} | Revun`,
      description: data.metaDescription,
      url: buildCanonicalUrl(`/features/${feature}`),
    },
  }
}

export default async function FeatureDetailPage({
  params,
}: {
  params: Promise<{ feature: string }>
}) {
  const { feature } = await params
  const data = featureData[feature]
  if (!data) notFound()

  const Icon = iconMap[data.iconName] || Users

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Features', url: 'https://revun.com/features/' },
              { name: data.title, url: buildCanonicalUrl(`/features/${feature}`) },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#F5F6F8] pt-24 pb-12 md:pt-32 md:pb-16 lg:pt-40 lg:pb-20">
        {/* Decorative dot grid */}
        <div className="absolute inset-0 bg-dot-grid opacity-40" aria-hidden="true" />

        <div className="relative mx-auto max-w-4xl px-4 md:px-6 lg:px-8 text-center">
          <div className="animate-fade-up mx-auto mb-6 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-[#E8F2FE]">
            <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-[#176FEB]" />
          </div>
          <h1 className="animate-fade-up font-display text-3xl font-normal text-[#0A1628] md:text-5xl lg:text-6xl">
            {data.title}
          </h1>
          <p className="animate-fade-up delay-150 mx-auto mt-4 max-w-2xl text-base sm:text-lg text-[#555860]">
            {data.heroDescription}
          </p>
          <div className="animate-fade-up delay-300 mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/pricing/"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-[#176FEB] px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#0B5AD4]"
            >
              Start Free Trial
            </Link>
            <Link
              href="/demo/"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-6 text-sm font-semibold text-[#2C2E33] transition-colors duration-200 hover:border-[#176FEB]/30"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-white py-12 md:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll stagger={0.12}>
            <p className="font-heading text-sm font-semibold uppercase tracking-wider text-[#176FEB]">
              Capabilities
            </p>
            <h2 className="mt-3 font-heading text-xl font-bold text-[#0A1628] sm:text-2xl md:text-3xl">
              What you get with {data.title}
            </h2>
          </RevealOnScroll>
          <RevealOnScroll stagger={0.08}>
            <div className="mt-8 md:mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
              {data.capabilities.map((cap, i) => (
                <div
                  key={cap.title}
                  className="group relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-6 transition-all duration-300 hover:border-[#176FEB]/30 hover:shadow-card-hover hover:-translate-y-1"
                >
                  {/* Top gradient accent */}
                  <div
                    className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#176FEB] via-[#4A91F0] to-[#176FEB] scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"
                    aria-hidden="true"
                  />

                  {/* Corner glow */}
                  <div
                    className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-[#176FEB]/[0.05] blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden="true"
                  />

                  {/* Step number watermark */}
                  <span
                    className="absolute top-3 right-4 font-display text-[48px] font-bold leading-none text-[#176FEB]/[0.04] transition-colors duration-300 group-hover:text-[#176FEB]/[0.08] select-none"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="flex gap-4">
                    {/* Animated icon container */}
                    <div className="relative mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center">
                      <div className="absolute inset-0 rounded-xl bg-[#176FEB]/8 transition-all duration-300 group-hover:bg-[#176FEB]/12 group-hover:scale-110" />
                      <div className="absolute inset-0 rounded-xl ring-1 ring-[#176FEB]/0 transition-all duration-300 group-hover:ring-[#176FEB]/20" />
                      <CheckCircle2 className="relative z-10 h-5 w-5 text-[#176FEB] transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-heading text-base font-semibold text-[#0A1628] transition-colors duration-200 group-hover:text-[#176FEB]">
                        {cap.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-[#555860]">
                        {cap.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#F5F6F8] py-12 md:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll className="text-center" stagger={0.12}>
            <p className="font-heading text-sm font-semibold uppercase tracking-wider text-[#176FEB]">
              How it works
            </p>
            <h2 className="mt-3 font-heading text-xl font-bold text-[#0A1628] sm:text-2xl md:text-3xl">
              Three steps to get started
            </h2>
          </RevealOnScroll>
          <RevealOnScroll stagger={0.1}>
            <div className="mt-8 md:mt-10 space-y-4 md:space-y-6">
              {data.steps.map((step) => (
                <div
                  key={step.number}
                  className="flex gap-4 sm:gap-5 rounded-xl border border-[#E5E7EB] bg-white p-5 sm:p-6 transition-all duration-200 hover:border-[#176FEB]/30 hover:shadow-sm"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F2FE] font-heading text-sm font-bold text-[#176FEB]">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-semibold text-[#0A1628]">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#555860]">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F5F6F8] py-12 md:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 md:px-6 lg:px-8 text-center">
          <RevealOnScroll stagger={0.12}>
            <h2 className="font-heading text-xl font-bold text-[#0A1628] sm:text-2xl md:text-3xl">
              Ready to try {data.title}?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base text-[#555860]">
              Start your free trial today. No credit card required.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/pricing/"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-[#176FEB] px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#1260D6]"
              >
                Start Free Trial
              </Link>
              <Link
                href="/contact/"
                className="inline-flex h-12 items-center gap-2 rounded-xl border border-[#E5E7EB] px-6 text-sm font-semibold text-[#0A1628] transition-colors duration-200 hover:bg-[#EAECF0]"
              >
                Contact Sales <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}
