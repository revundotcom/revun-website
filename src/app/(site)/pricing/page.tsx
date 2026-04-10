import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildProductSchema, buildBreadcrumbSchema, buildFAQPageSchema } from '@/lib/schema-builders'
import { PricingFaq } from '@/components/blocks/pricing-faq'
import { PricingComparison } from '@/components/blocks/pricing-comparison'

const PricingTabs = dynamic(() => import('@/components/blocks/pricing-tabs').then(m => ({ default: m.PricingTabs })), {
  loading: () => (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-[600px] animate-pulse rounded-xl bg-[#F5F6F8]" />
      </div>
    </section>
  ),
})

export const metadata: Metadata = {
  title: 'Pricing — Replace Your Entire Property Operations Stack',
  description:
    'Revun replaces disconnected tools across leasing, payments, maintenance, communications, compliance, and reporting. Free for 1-2 units. Plans for owners, agents, brokerages, operators, and maintenance companies.',
  alternates: { canonical: buildCanonicalUrl('/pricing') },
  openGraph: {
    title: 'Pricing — Replace Your Entire Stack | Revun',
    description:
      'One platform for leasing, payments, maintenance, communications, compliance, and reporting. Free for 1-2 units. Scale as you grow.',
    url: buildCanonicalUrl('/pricing'),
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Revun Pricing',
  description:
    'Pricing built to replace your entire property operations stack. Free for 1-2 units. Scale as your portfolio grows.',
  url: 'https://revun.com/pricing/',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Revun',
    url: 'https://revun.com/',
  },
}

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(jsonLd as Record<string, unknown>) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildProductSchema([
              { name: 'Self-Managing Owner', price: '0', description: 'Free for 1-2 units. Leasing, payments, maintenance, communications, and mobile app.' },
              { name: 'Operator', price: '29', description: 'For property managers and growing portfolios. Full automation, vendor dispatch, and owner reporting.' },
              { name: 'Brokerage & Leasing', price: '49', description: 'For brokerages, leasing companies, and PMCs. Multi-entity reporting, API access, and telephony.' },
              { name: 'Enterprise & REIT', price: '0', description: 'Custom pricing for large operators, REITs, and asset managers. White-glove onboarding and SLA guarantees.' },
            ])
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(buildBreadcrumbSchema([
            { name: 'Home', url: 'https://revun.com/' },
            { name: 'Pricing', url: 'https://revun.com/pricing/' },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(buildFAQPageSchema([
            { question: 'Can I switch plans later?', answer: 'Yes. Upgrade or downgrade anytime. Changes take effect on your next billing cycle. No penalties.' },
            { question: 'What counts as a unit?', answer: 'Any property with a current lease or active listing. Vacant, unlisted units are not billed.' },
            { question: 'Is there a free trial?', answer: 'The Self-Managing Owner plan is free forever for 1-2 units. Operator and Brokerage & Leasing plans include a 14-day free trial with full access.' },
            { question: 'What payment methods do you accept?', answer: 'Credit card, ACH, and Interac (Canada). All payments processed securely through Stripe.' },
            { question: 'Do you offer annual billing?', answer: 'Yes. Save 20% with annual billing on Operator and Brokerage & Leasing plans.' },
            { question: 'What happens if I exceed my plan limits?', answer: 'We notify you before any changes. No surprise charges. You can upgrade or we can discuss custom pricing.' },
            { question: 'Can I use Revun for properties in both Canada and the US?', answer: 'Yes. Revun supports both markets with province and state-specific compliance workflows built in.' },
            { question: 'How do I cancel?', answer: 'Cancel anytime from your account settings. No long-term contracts, no cancellation fees.' },
          ])),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#F5F6F8] pt-32 pb-16 md:pt-40 md:pb-20">
        {/* Decorative dot grid */}
        <div className="absolute inset-0 bg-dot-grid opacity-40" aria-hidden="true" />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="animate-fade-up font-display font-extrabold text-4xl text-[#0A1628] md:text-5xl lg:text-6xl">
            Pricing built to replace your{' '}
            <span className="text-[#176FEB]">entire stack</span>
          </h1>
          <p className="animate-fade-up delay-150 mt-6 text-lg text-[#555860]">
            Choose the operating system that matches your portfolio, team size,
            and workflow complexity.
          </p>
          <p className="animate-fade-up delay-150 mt-4 max-w-2xl mx-auto text-sm leading-relaxed text-[#555860]/70">
            Revun is not another point solution. It replaces disconnected tools
            across leasing, payments, maintenance, communications, compliance,
            reporting, and operations. Choose the plan that fits your scale.
          </p>
        </div>
      </section>

      {/* Pricing tiers */}
      <PricingTabs />

      {/* Feature comparison */}
      <PricingComparison />

      {/* FAQ */}
      <PricingFaq />
    </>
  )
}
