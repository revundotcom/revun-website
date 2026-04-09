'use client'

import { motion } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import {
  RentCollectionIcon,
  OwnerDisbursementsIcon,
  VendorPaymentsIcon,
  FinancialReportingIcon,
} from '@/lib/feature-icons'

const features = [
  {
    icon: RentCollectionIcon,
    title: 'Rent Collection',
    description: 'Accept PAD (pre-authorized debit), credit card, and Interac e-Transfer. Automated reminders and receipts.',
  },
  {
    icon: OwnerDisbursementsIcon,
    title: 'Owner Disbursements',
    description: 'Automated owner payouts with detailed statements. Direct deposit to any Canadian or US bank account.',
  },
  {
    icon: VendorPaymentsIcon,
    title: 'Vendor Payments',
    description: 'Pay maintenance vendors and contractors directly through the platform. Track invoices and approvals.',
  },
  {
    icon: FinancialReportingIcon,
    title: 'Financial Reporting',
    description: 'Real-time P&L, cash flow statements, and tax-ready reports. Export to QuickBooks, Xero, or CSV.',
  },
]

const paymentMethods = [
  'PAD',
  'Credit Card',
  'Interac e-Transfer',
  'Direct Deposit',
  'Wire Transfer',
  'ACH',
]

export function PaymentsFintech() {
  return (
    <section className="relative overflow-hidden bg-brand-off-white py-12 md:py-16">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid bg-grid-mask opacity-[0.03]" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 translate-y-1/3 translate-x-1/4 w-[500px] h-[500px] rounded-full bg-brand-blue/[0.06] blur-[120px]" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <motion.p
            variants={revealItem}
            className="text-sm font-heading font-semibold uppercase tracking-wider text-brand-blue"
          >
            Payments & Fintech
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mt-3 font-display text-4xl font-normal text-[#0A1628] md:text-5xl"
          >
            Money in. Money out. <span className="text-keyword">Automated</span>.
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mx-auto mt-4 max-w-xl text-lg text-brand-graphite-mid"
          >
            Rent collection, owner disbursements, vendor payments, and financial
            reporting - all in one platform.
          </motion.p>
        </RevealOnScroll>

        <RevealOnScroll className="mt-14 grid gap-6 sm:grid-cols-2" stagger={0.1}>
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={revealItem}
              className="group relative rounded-xl border border-border bg-white p-8 transition-all duration-200 hover:border-brand-blue/20 hover:shadow-card-hover"
            >
              <div className="absolute inset-x-0 top-0 h-[2px] bg-brand-blue opacity-0 transition-opacity duration-200 group-hover:opacity-100" aria-hidden="true" />
              <div className="mb-5">
                <feature.icon className="h-12 w-12" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-[#0A1628]">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-graphite-mid">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </RevealOnScroll>

        {/* Payment method pills */}
        <RevealOnScroll className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {paymentMethods.map((method) => (
            <motion.span
              key={method}
              variants={revealItem}
              className="inline-flex items-center rounded-full border border-border bg-white px-4 py-1.5 text-sm font-medium text-brand-graphite-mid"
            >
              {method}
            </motion.span>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  )
}
