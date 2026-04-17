import type { Metadata } from 'next'
import { buildFAQPageSchema, buildBreadcrumbSchema } from '@/lib/schema-builders'
import { sanitizeJsonLd } from '@/lib/utils'
import { HeroSection } from '@/components/blocks/hero-section'
import { AudienceRouter } from '@/components/blocks/audience-router'
import { FeatureShowcase } from '@/components/blocks/feature-showcase'
import { PaymentsFintech } from '@/components/blocks/payments-fintech'
import { Testimonials } from '@/components/blocks/testimonials'
import { HomepageFaq } from '@/components/blocks/homepage-faq'
import { CTASection } from '@/components/blocks/cta-section'
import { OperatorPlatformBlock } from '@/components/blocks/operator-platform-block'
import { ReviewBadges } from '@/components/blocks/review-badges'
import ProblemSection from '@/components/blocks/problem-section'
import EcosystemMap from '@/components/blocks/ecosystem-map'
import VisualLibrary from '@/components/blocks/visual-library'
import ComparisonPreview from '@/components/blocks/comparison-preview'
import DashboardPreview from '@/components/blocks/dashboard-preview'

export const metadata: Metadata = {
  title: 'Revun | The Operating System for Property Operations',
  description:
    'Revun is the infrastructure layer for modern property operations. Leasing, payments, maintenance, compliance, communications, accounting, and reporting: all unified in one system for Canada and the United States.',
  alternates: {
    canonical: '/',
  },
}

const homepageFaqs = [
  { question: 'What is Revun?', answer: 'Revun is the operating system for property operations: an infrastructure layer that unifies leasing, payments, maintenance, compliance, communications, accounting, and reporting into one system. It replaces disconnected tools with a single platform built for Canada and the United States.' },
  { question: 'Who is Revun built for?', answer: 'Revun serves self-managing property owners, property management companies, brokerages, leasing teams, maintenance companies, REITs, and tenants. Whether you manage one unit or an entire national portfolio, the platform gives every role, including internal ops teams, the exact workflows and visibility they need.' },
  { question: 'How much does Revun cost?', answer: 'Revun is free for self-managing owners with 1-2 units. The Operator plan starts at $29/unit/month, Brokerage & Leasing at $49/unit/month, and Enterprise & REIT pricing is custom. All paid plans include a 14-day free trial with no credit card required.' },
  { question: 'Is Revun available in my province or state?', answer: 'Revun currently operates across all Canadian provinces including Ontario, British Columbia, Alberta, Quebec, Nova Scotia, and Manitoba. US expansion is underway with initial coverage in key states.' },
  { question: 'What integrations does Revun support?', answer: 'Revun integrates with 40+ tools including Stripe, QuickBooks, Xero, DocuSign, Twilio, Salesforce, HubSpot, Zapier, Google Workspace, Microsoft 365, Plaid, and Interac.' },
  { question: 'How do I get started?', answer: 'See the full platform at revun.com/platform, or book a live demo to walk through it with our team. You can also sign up for a free account, no credit card required, and start managing properties immediately.' },
]

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(buildBreadcrumbSchema([
            { name: 'Home', url: 'https://revun.com/' },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(buildFAQPageSchema(homepageFaqs)),
        }}
      />
      <HeroSection />
      <DashboardPreview />
      <ReviewBadges />
      <ProblemSection />
      <EcosystemMap />
      <AudienceRouter />
      <VisualLibrary />
      <PaymentsFintech />
      <FeatureShowcase />
      <ComparisonPreview />
      <Testimonials />
      <CTASection />
      <HomepageFaq />
      <OperatorPlatformBlock />
    </>
  )
}
