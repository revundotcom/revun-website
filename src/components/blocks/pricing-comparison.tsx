'use client'

import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { Check, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const PLANS = ['Self-Managing Owner', 'Operator', 'Brokerage & Leasing', 'Enterprise & REIT'] as const

type FeatureValue = boolean | string

interface FeatureRow {
  feature: string
  values: [FeatureValue, FeatureValue, FeatureValue, FeatureValue]
}

interface FeatureGroup {
  category: string
  rows: FeatureRow[]
}

const COMPARISON: FeatureGroup[] = [
  {
    category: 'Included Modules',
    rows: [
      { feature: 'Leasing & applications', values: ['Basic', 'Full', 'Full', 'Custom'] },
      { feature: 'Screening integrations', values: [false, true, true, true] },
      { feature: 'Lease automation & renewals', values: [false, true, true, true] },
      { feature: 'Maintenance management', values: ['Intake only', 'Dispatch + SLAs', 'Full + proof-of-work', 'Fleet + capital planning'] },
      { feature: 'Payments & rent collection', values: ['ACH only', 'ACH, CC, Interac', 'Split disbursements', 'Multi-currency'] },
      { feature: 'Accounting & reporting', values: ['Basic log', 'Owner statements', 'Multi-entity GL sync', 'ERP integration'] },
      { feature: 'Dashboards & analytics', values: ['Basic', 'Portfolio view', 'Multi-entity', 'Fund-level'] },
      { feature: 'Mobile app', values: [true, true, true, true] },
      { feature: 'Desktop platform', values: [true, true, true, true] },
      { feature: 'Owner portal', values: [false, true, true, true] },
      { feature: 'Tenant portal', values: [true, true, true, true] },
    ],
  },
  {
    category: 'Communications',
    rows: [
      { feature: 'Tenant chat', values: [true, true, true, true] },
      { feature: 'Email notifications', values: [true, true, true, true] },
      { feature: 'SMS messaging', values: [false, true, true, true] },
      { feature: 'Email campaigns', values: [false, true, true, true] },
      { feature: 'Telephony routing', values: [false, false, true, true] },
      { feature: 'Auto-replies & AI responses', values: [false, false, true, true] },
      { feature: 'Branded tenant portals', values: [false, false, false, true] },
    ],
  },
  {
    category: 'Compliance & Documents',
    rows: [
      { feature: 'Standard lease templates', values: [true, true, true, true] },
      { feature: 'Province/state-specific workflows', values: [false, true, true, true] },
      { feature: 'Document vault', values: [false, false, true, true] },
      { feature: 'Audit trail', values: [false, false, true, true] },
      { feature: 'Governance configuration', values: [false, false, false, true] },
      { feature: 'Security audit', values: [false, false, false, true] },
    ],
  },
  {
    category: 'Onboarding & Migration',
    rows: [
      { feature: 'Self-serve onboarding', values: [true, true, true, true] },
      { feature: 'Guided onboarding sessions', values: [false, '2 sessions', 'Dedicated manager', 'White-glove + phased rollout'] },
      { feature: 'Data migration', values: [false, 'Assisted', 'Full migration', 'Full migration'] },
    ],
  },
  {
    category: 'Support',
    rows: [
      { feature: 'Community support', values: [true, true, true, true] },
      { feature: 'Priority email support', values: [false, true, true, true] },
      { feature: 'Dedicated account manager', values: [false, false, true, true] },
      { feature: 'Phone & Slack support', values: [false, false, false, true] },
      { feature: 'SLA guarantees', values: [false, false, false, true] },
      { feature: 'Dedicated success team', values: [false, false, false, true] },
    ],
  },
  {
    category: 'API & Integrations',
    rows: [
      { feature: 'Standard integrations', values: [false, true, true, true] },
      { feature: 'API access', values: [false, false, true, true] },
      { feature: 'Custom API & infrastructure', values: [false, false, false, true] },
      { feature: 'ERP / PMS connectors', values: [false, false, false, true] },
    ],
  },
  {
    category: 'Optional Add-ons',
    rows: [
      { feature: 'Rent guarantee', values: [false, false, 'Add-on', 'Included'] },
      { feature: 'White-label branding', values: [false, false, 'Add-on', 'Included'] },
      { feature: 'Additional onboarding sessions', values: [false, 'Add-on', 'Add-on', 'Included'] },
    ],
  },
]

/* ------------------------------------------------------------------ */
/*  Cell renderer                                                      */
/* ------------------------------------------------------------------ */

function CellValue({ value }: { value: FeatureValue }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center justify-center rounded-full bg-[#E8F2FE] p-1">
        <Check className="size-3.5 text-[#176FEB]" strokeWidth={2.5} />
      </span>
    )
  }
  if (value === false) {
    return <Minus className="size-3.5 text-[#CBD5E1]" />
  }
  return <span className="text-xs font-medium text-[#2C2E33]">{value}</span>
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function PricingComparison() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll className="text-center mb-12">
          <motion.h2
            variants={revealItem}
            className="font-heading font-extrabold text-3xl text-[#0A1628]"
          >
            Compare every <span className="text-[#176FEB]">feature</span>
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mt-4 text-[#555860] text-base max-w-2xl mx-auto"
          >
            See exactly what is included in each plan across leasing, payments,
            maintenance, communications, compliance, and operations.
          </motion.p>
        </RevealOnScroll>

        {/* Desktop table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left">
            {/* Sticky plan header */}
            <thead>
              <tr className="border-b-2 border-[#E5E7EB]">
                <th className="pb-4 pr-4 text-sm font-heading font-semibold text-[#94A3B8] w-[260px]">
                  Feature
                </th>
                {PLANS.map((plan, i) => (
                  <th
                    key={plan}
                    className={cn(
                      'pb-4 px-4 text-center text-sm font-heading font-bold text-[#0A1628]',
                      i === 2 && 'bg-[#E8F2FE]/50 rounded-t-lg'
                    )}
                  >
                    {plan}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((group) => (
                <Fragment key={group.category}>
                  {/* Category header */}
                  <tr>
                    <td
                      colSpan={5}
                      className="pt-8 pb-3 text-xs font-heading font-bold uppercase tracking-wider text-[#176FEB]"
                    >
                      {group.category}
                    </td>
                  </tr>
                  {/* Feature rows */}
                  {group.rows.map((row) => (
                    <tr
                      key={row.feature}
                      className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC] transition-colors"
                    >
                      <td className="py-3 pr-4 text-sm text-[#2C2E33]">
                        {row.feature}
                      </td>
                      {row.values.map((val, i) => (
                        <td
                          key={i}
                          className={cn(
                            'py-3 px-4 text-center',
                            i === 2 && 'bg-[#E8F2FE]/30'
                          )}
                        >
                          <CellValue value={val} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: collapsed per-plan view */}
        <div className="lg:hidden space-y-8">
          {COMPARISON.map((group) => (
            <div key={group.category}>
              <h3 className="text-xs font-heading font-bold uppercase tracking-wider text-[#176FEB] mb-4">
                {group.category}
              </h3>
              <div className="space-y-3">
                {group.rows.map((row) => (
                  <div key={row.feature} className="rounded-lg border border-[#E5E7EB] p-4">
                    <p className="text-sm font-medium text-[#0A1628] mb-3">{row.feature}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {PLANS.map((plan, i) => (
                        <div key={plan} className="flex items-center gap-2">
                          <CellValue value={row.values[i]} />
                          <span className="text-xs text-[#555860] truncate">{plan}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
