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
    description: 'Chasing e-transfers and tracking manual payments burns hours and misses deadlines. Revun automates collection via PAD, credit card, and Interac e-Transfer with automated reminders, receipts, and a full payment ledger — so you know exactly who paid and who did not.',
  },
  {
    icon: OwnerDisbursementsIcon,
    title: 'Owner Disbursements',
    description: 'Owners waiting on manual payouts lose trust fast. Revun automates disbursements with detailed statements and direct deposit to any Canadian or US bank account — on schedule, every time, with full transparency.',
  },
  {
    icon: VendorPaymentsIcon,
    title: 'Vendor Payments',
    description: 'Disconnected invoicing means vendors chase you for payment and jobs stall. Revun routes vendor payments through the platform with invoice matching, approval workflows, and complete spend visibility across your portfolio.',
  },
  {
    icon: FinancialReportingIcon,
    title: 'Financial Reporting',
    description: 'Manually assembling financial reports from three different systems is a quarterly fire drill. Revun generates real-time P&L, cash flow statements, and tax-ready reports on demand — export to QuickBooks, Xero, or CSV in one click.',
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

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <motion.p
            variants={revealItem}
            className="text-sm font-heading font-semibold uppercase tracking-wider text-brand-blue"
          >
            Financial Operating Layer
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mt-3 font-display text-4xl font-normal text-[#0A1628] md:text-5xl"
          >
            E-transfers, spreadsheets, and manual reconciliation are <span className="text-keyword">destroying your visibility</span>
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mx-auto mt-4 max-w-xl text-lg text-brand-graphite-mid"
          >
            When rent collection, owner payouts, and vendor invoicing run through disconnected tools, you lose track of every dollar. Late payments go unnoticed. Trust accounting fails audits. Revun replaces your entire financial stack with one infrastructure layer — full revenue visibility, automated compliance, and complete control over every transaction.
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
