'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Plug } from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import { getIntegrationIcon } from '@/lib/integration-icons'

interface Integration {
  name: string
  slug: string
  category: string
  description: string
}

const integrations: Integration[] = [
  {
    name: 'QuickBooks',
    slug: 'quickbooks',
    category: 'Accounting',
    description: 'Sync invoices, payments, and expenses with QuickBooks Online.',
  },
  {
    name: 'Salesforce',
    slug: 'salesforce',
    category: 'CRM',
    description: 'Push lead and deal data directly into Salesforce CRM.',
  },
  {
    name: 'Twilio',
    slug: 'twilio',
    category: 'Communications',
    description: 'SMS, voice, and WhatsApp messaging for tenant communication.',
  },
  {
    name: 'DocuSign',
    slug: 'docusign',
    category: 'Signatures',
    description: 'Electronic lease signing and document management.',
  },
  {
    name: 'Stripe',
    slug: 'stripe',
    category: 'Payments',
    description: 'Accept rent payments via card, ACH, and bank debit.',
  },
  {
    name: 'Zapier',
    slug: 'zapier',
    category: 'Analytics',
    description: 'Connect Revun to 5,000+ apps with custom automations.',
  },
]

const categoryOrder = [
  'Accounting',
  'Communications',
  'Payments',
  'Signatures',
  'CRM',
  'Analytics',
] as const

function IntegrationCard({ integration }: { integration: Integration }) {
  return (
    <Link
      href={`/integrations/${integration.slug}/`}
      className="group flex flex-col justify-between rounded-2xl border border-[#D3D5DB] bg-white p-6 transition-all duration-200 hover:border-[#176FEB] hover:shadow-md"
    >
      <div>
        <div className="flex items-start justify-between">
          {(() => {
            const Logo = getIntegrationIcon(integration.name)
            return (
              <div className="inline-flex size-10 items-center justify-center">
                <Logo className="size-10" />
              </div>
            )
          })()}
          <span className="rounded-full bg-[#E8F2FE] px-2.5 py-0.5 text-xs font-semibold text-[#176FEB]">
            Available
          </span>
        </div>
        <h3 className="mt-4 font-heading text-lg font-bold text-[#2C2E33]">
          {integration.name}
        </h3>
        <span className="mt-1 inline-block text-xs text-[#555860]">
          {integration.category}
        </span>
        <p className="mt-2 text-sm text-[#555860]">
          {integration.description}
        </p>
      </div>
      <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#176FEB] transition-colors">
        Learn more
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  )
}

export default function IntegrationsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#F5F6F8]">
        <div className="relative mx-auto max-w-6xl px-6 py-16 text-center sm:py-16 lg:px-8">
          <RevealOnScroll>
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-1.5 text-sm text-[#555860]">
              <Plug className="size-4" />
              Integrations
            </div>
            <h1 className="font-display text-4xl font-normal text-[#0A1628] sm:text-5xl lg:text-6xl">
              Connect Revun to the systems your{' '}
              <span className="text-[#176FEB]">business already relies on</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-[#555860]">
              Revun sits at the center of your operation, connecting accounting, communications, screening, identity verification, signatures, CRM, and reporting.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Integrations grouped by category */}
      {categoryOrder.map((category) => {
        const items = integrations.filter((i) => i.category === category)
        if (items.length === 0) return null
        return (
          <section key={category} className="bg-[#F5F6F8] py-12">
            <div className="mx-auto max-w-6xl px-6 lg:px-8">
              <h2 className="font-heading text-2xl font-bold text-[#2C2E33] sm:text-3xl">
                {category}
              </h2>
              <RevealOnScroll stagger={0.05}>
                <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((integration) => (
                    <motion.div key={integration.slug} variants={revealItem}>
                      <IntegrationCard integration={integration} />
                    </motion.div>
                  ))}
                </div>
              </RevealOnScroll>
            </div>
          </section>
        )
      })}

      {/* Bottom CTA */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-3xl border-t border-[#D3D5DB] px-6 pt-20 text-center lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-[#2C2E33] sm:text-3xl">
            Need a Custom <span className="text-[#176FEB]">Integration</span>?
          </h2>
          <p className="mt-4 text-[#555860]">
            Our API and Zapier connector let you build integrations with any tool
            in your stack.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact/"
              className="inline-flex h-11 items-center rounded-lg bg-[#176FEB] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#1260d1]"
            >
              Talk to Our Team
            </Link>
            <Link
              href="/contact/"
              className="inline-flex h-11 items-center rounded-lg border border-[#D3D5DB] px-6 text-sm font-semibold text-[#2C2E33] transition-colors hover:bg-[#F5F6F8]"
            >
              View API Docs
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
