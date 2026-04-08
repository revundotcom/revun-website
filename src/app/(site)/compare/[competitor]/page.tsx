import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { CompareDetailClient } from './client'

/* ── Types ────────────────────────────────────────────────────────────────── */

export interface CompareFeature {
  name: string
  revun: string
  competitor: string
}

export interface CompetitorFaq {
  question: string
  answer: string
}

export interface CompetitorData {
  slug: string
  name: string
  category: string
  description: string
  pricingSummary: string
  revunPricingSummary: string
  features: CompareFeature[]
  whyRevun: { title: string; body: string }[]
  tldr: string[]
  faq: CompetitorFaq[]
}

/* ── Data ─────────────────────────────────────────────────────────────────── */

const competitors: CompetitorData[] = [
  {
    slug: 'appfolio',
    name: 'AppFolio',
    category: 'PM Software',
    description:
      'Cloud-based property management software for residential and commercial managers.',
    pricingSummary: 'From $1.40/unit/month',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Owner Portals', revun: 'Full portal with financials', competitor: 'Basic portal' },
      { name: 'Tenant Screening', revun: 'Built-in with partner integrations', competitor: 'Built-in' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Basic work orders' },
      { name: 'Self-Manage Option', revun: 'From $1/day per unit', competitor: 'Not available' },
      { name: 'Canadian Compliance', revun: 'Province-specific workflows', competitor: 'US-focused' },
      { name: 'Brokerage Tools', revun: 'Full CRM + deal management', competitor: 'Not included' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'Email + portal messaging' },
      { name: 'Payments', revun: 'Rent, vendor payouts, Interac', competitor: 'ACH, credit card' },
    ],
    whyRevun: [
      {
        title: 'Built for North America, not just the US',
        body: 'Revun includes province-specific compliance workflows, Interac payments, and Canadian-first features that AppFolio does not support.',
      },
      {
        title: 'Self-manage option included',
        body: 'Unlike AppFolio, Revun offers a lightweight plan for self-managing owners starting at $1/day per unit, so your clients can self-serve.',
      },
      {
        title: 'All-in-one communications',
        body: 'Email, SMS, VoIP calling, and in-app messaging are built in. No need for a separate phone system or messaging tool.',
      },
    ],
    tldr: [
      'Revun supports Canadian provincial compliance natively; AppFolio is US-only',
      'Revun offers self-managing owner plans from $1/day; AppFolio requires 50+ units',
      'Revun includes brokerage and maintenance dispatch; AppFolio does not',
    ],
    faq: [
      {
        question: 'Is AppFolio available in Canada?',
        answer: 'AppFolio is designed for the US market and does not include Canadian provincial compliance, Interac payments, or province-specific lease templates. Revun is built for the Canadian market from the ground up.',
      },
      {
        question: 'Can small landlords use AppFolio?',
        answer: 'AppFolio requires a minimum of 50 units, which excludes most small landlords. Revun has no minimum unit requirement and offers self-managing owner plans starting at $1/day per unit.',
      },
      {
        question: 'Does Revun have the same features as AppFolio?',
        answer: 'Revun covers all core PM features (accounting, maintenance, screening, portals) and adds brokerage CRM, Canadian compliance, and multi-channel communications that AppFolio does not include.',
      },
      {
        question: 'How does Revun pricing compare to AppFolio?',
        answer: 'AppFolio charges from $1.40/unit/month with a 50-unit minimum. Revun offers transparent per-unit pricing from $1/day with no minimums and no hidden fees.',
      },
      {
        question: 'Can I switch from AppFolio to Revun?',
        answer: 'Yes. Revun offers guided onboarding and data migration support to help you transition from AppFolio with minimal disruption to your operations.',
      },
    ],
  },
  {
    slug: 'buildium',
    name: 'Buildium',
    category: 'PM Software',
    description:
      'Property management platform for residential managers and community associations.',
    pricingSummary: 'From $55/month (up to 20 units)',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Owner Portals', revun: 'Full portal with real-time financials', competitor: 'Basic owner portal' },
      { name: 'Tenant Screening', revun: 'Built-in with partner integrations', competitor: 'TransUnion integration' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Work order system' },
      { name: 'Self-Manage Option', revun: 'From $1/day per unit', competitor: 'Not available' },
      { name: 'Canadian Compliance', revun: 'Province-specific workflows', competitor: 'Limited Canadian support' },
      { name: 'Brokerage Tools', revun: 'Full CRM + deal management', competitor: 'Not included' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'Email + portal' },
      { name: 'Payments', revun: 'Rent, vendor payouts, Interac', competitor: 'ACH, credit card' },
    ],
    whyRevun: [
      {
        title: 'No flat-fee pricing traps',
        body: 'Buildium charges flat monthly fees that get expensive fast. Revun scales with your portfolio at $1/day per unit.',
      },
      {
        title: 'Brokerage and leasing built in',
        body: 'Revun includes CRM, deal management, and leasing workflows. Buildium focuses only on property management.',
      },
      {
        title: 'True Canadian compliance',
        body: 'Province-specific notice templates, N-series forms, and local payment methods like Interac are native to Revun.',
      },
    ],
    tldr: [
      'Revun has native Canadian compliance; Buildium is US-focused',
      'Revun includes brokerage CRM and leasing tools; Buildium does not',
      'Revun scales per-unit; Buildium uses flat monthly fees',
    ],
    faq: [
      {
        question: 'Is Buildium better than Revun for Canadian property managers?',
        answer: 'No. Buildium has limited Canadian support and lacks province-specific compliance workflows, Interac payments, and Canadian lease templates that Revun includes natively.',
      },
      {
        question: 'How does Buildium pricing compare to Revun?',
        answer: 'Buildium starts at $55/month for up to 20 units and increases with flat-fee tiers. Revun charges per-unit from $1/day, so you only pay for what you manage.',
      },
      {
        question: 'Does Revun include brokerage tools like Buildium?',
        answer: 'Revun includes a full brokerage CRM with deal management and leasing workflows. Buildium does not offer brokerage tools at all.',
      },
      {
        question: 'Can I migrate from Buildium to Revun?',
        answer: 'Yes. Revun provides guided onboarding and data migration assistance to help you move from Buildium without losing your operational history.',
      },
      {
        question: 'Does Buildium support Interac payments?',
        answer: 'No. Buildium supports ACH and credit card payments only. Revun supports Interac, rent collection, and vendor payouts natively for the Canadian market.',
      },
    ],
  },
  {
    slug: 'doorloop',
    name: 'DoorLoop',
    category: 'PM Software',
    description:
      'Modern property management software with an emphasis on ease of use and quick setup.',
    pricingSummary: 'From $59/month (up to 20 units)',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Owner Portals', revun: 'Full portal with financials', competitor: 'Owner portal included' },
      { name: 'Tenant Screening', revun: 'Built-in with partner integrations', competitor: 'TransUnion integration' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Basic maintenance module' },
      { name: 'Self-Manage Option', revun: 'From $1/day per unit', competitor: 'Starter plan available' },
      { name: 'Canadian Compliance', revun: 'Province-specific workflows', competitor: 'US-focused' },
      { name: 'Brokerage Tools', revun: 'Full CRM + deal management', competitor: 'Not included' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'Email + portal messaging' },
      { name: 'Payments', revun: 'Rent, vendor payouts, Interac', competitor: 'ACH, credit card' },
    ],
    whyRevun: [
      {
        title: 'Deeper workflow automation',
        body: 'While DoorLoop prioritizes simplicity, Revun offers deeper automation for compliance, vendor dispatch, and multi-entity operations.',
      },
      {
        title: 'Canadian-first design',
        body: 'Revun is built for the Canadian market with Interac, provincial compliance, and local integrations. DoorLoop is US-first.',
      },
      {
        title: 'Brokerage and maintenance in one',
        body: 'Revun combines PM, brokerage CRM, and maintenance dispatch. No need for separate tools for each function.',
      },
    ],
    tldr: [
      'Revun includes Canadian provincial compliance; DoorLoop is US-focused',
      'Revun offers deeper workflow automation for vendor dispatch and multi-entity ops',
      'Revun combines PM, brokerage CRM, and maintenance dispatch in one platform',
    ],
    faq: [
      {
        question: 'Is DoorLoop available in Canada?',
        answer: 'DoorLoop is primarily designed for the US market. It does not include Canadian provincial compliance, Interac payments, or province-specific lease templates that Revun offers natively.',
      },
      {
        question: 'How does DoorLoop compare to Revun on pricing?',
        answer: 'DoorLoop starts at $59/month for up to 20 units with flat-fee tiers. Revun charges per-unit from $1/day with no minimums, making it more cost-effective as your portfolio scales.',
      },
      {
        question: 'Does Revun offer the same ease of use as DoorLoop?',
        answer: 'Yes. Revun provides a clean, modern interface with guided onboarding. It matches DoorLoop on usability while adding deeper automation for compliance and vendor workflows.',
      },
      {
        question: 'Can I switch from DoorLoop to Revun?',
        answer: 'Yes. Revun offers migration support and guided onboarding to help you transition from DoorLoop with minimal disruption.',
      },
    ],
  },
  {
    slug: 'guesty',
    name: 'Guesty',
    category: 'PM Software',
    description:
      'Property management platform for short-term and vacation rental operators.',
    pricingSummary: 'Custom pricing (3-5% of revenue)',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Owner Portals', revun: 'Full portal with financials', competitor: 'Owner statements' },
      { name: 'Channel Management', revun: 'Long-term focused listings', competitor: 'Airbnb, VRBO, Booking.com' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Task automation' },
      { name: 'Self-Manage Option', revun: 'From $1/day per unit', competitor: 'Guesty for Hosts (lite)' },
      { name: 'Canadian Compliance', revun: 'Province-specific workflows', competitor: 'Global, not Canada-specific' },
      { name: 'Brokerage Tools', revun: 'Full CRM + deal management', competitor: 'Not included' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'Unified inbox' },
      { name: 'Long-Term Leasing', revun: 'Full lease lifecycle', competitor: 'Short-term focused' },
    ],
    whyRevun: [
      {
        title: 'Built for long-term rentals',
        body: 'Guesty is designed for short-term and vacation rentals. Revun is purpose-built for long-term residential and commercial property management.',
      },
      {
        title: 'Predictable, transparent pricing',
        body: 'Guesty takes a percentage of revenue. Revun charges a flat per-unit rate so your costs stay predictable as revenue grows.',
      },
      {
        title: 'Full compliance and leasing',
        body: 'Provincial lease templates, N-series notices, and full tenant lifecycle management are core to Revun, not an afterthought.',
      },
    ],
    tldr: [
      'Revun is built for long-term rentals; Guesty targets short-term and vacation rentals',
      'Revun charges flat per-unit pricing; Guesty takes 3-5% of revenue',
      'Revun includes provincial compliance and full lease lifecycle; Guesty does not',
    ],
    faq: [
      {
        question: 'Is Guesty good for long-term rentals?',
        answer: 'Guesty is designed primarily for short-term and vacation rentals with channel management for Airbnb, VRBO, and Booking.com. For long-term residential or commercial property management, Revun is purpose-built with full lease lifecycle tools.',
      },
      {
        question: 'How does Guesty pricing compare to Revun?',
        answer: 'Guesty charges 3-5% of revenue, which increases as your portfolio grows. Revun uses flat per-unit pricing from $1/day, keeping costs predictable regardless of revenue.',
      },
      {
        question: 'Does Revun support short-term rentals?',
        answer: 'Revun is focused on long-term residential and commercial property management. If you manage a mix of long-term and short-term, Revun handles the long-term portfolio while Guesty may complement for short-term.',
      },
      {
        question: 'Can I switch from Guesty to Revun?',
        answer: 'Yes. If you are transitioning your portfolio to long-term rentals, Revun offers guided onboarding and migration support.',
      },
    ],
  },
  {
    slug: 'yardi',
    name: 'Yardi',
    category: 'PM Software',
    description:
      'Enterprise property management and accounting platform for large portfolios and REITs.',
    pricingSummary: 'Custom enterprise pricing',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Owner Portals', revun: 'Full portal with financials', competitor: 'RentCafe portal' },
      { name: 'Tenant Screening', revun: 'Built-in with partner integrations', competitor: 'ScreeningWorks Pro' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Yardi Maintenance IQ' },
      { name: 'Self-Manage Option', revun: 'From $1/day per unit', competitor: 'Not available' },
      { name: 'Setup Time', revun: 'Days, not months', competitor: '3-12 month implementation' },
      { name: 'Brokerage Tools', revun: 'Full CRM + deal management', competitor: 'Commercial focus only' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'RentCafe messaging' },
      { name: 'Modern UX', revun: 'Clean, intuitive interface', competitor: 'Legacy interface' },
    ],
    whyRevun: [
      {
        title: 'Get started in days, not months',
        body: 'Yardi implementations take 3-12 months and require consultants. Revun launches in days with guided onboarding.',
      },
      {
        title: 'Modern interface, modern pricing',
        body: 'Revun offers a clean, intuitive interface with transparent per-unit pricing. No legacy UI or opaque enterprise contracts.',
      },
      {
        title: 'Same power, less overhead',
        body: 'Revun delivers enterprise features without requiring a dedicated IT team to manage and maintain the system.',
      },
    ],
    tldr: [
      'Revun launches in days; Yardi takes 3-12 months to implement',
      'Revun has transparent per-unit pricing; Yardi uses opaque enterprise contracts',
      'Revun offers a modern interface; Yardi has a legacy UI requiring IT support',
    ],
    faq: [
      {
        question: 'Is Yardi overkill for mid-size portfolios?',
        answer: 'Yardi is built for enterprise portfolios and REITs, with long implementation timelines and high costs. Revun delivers comparable features for mid-size portfolios with faster setup and transparent pricing.',
      },
      {
        question: 'How long does it take to set up Revun vs Yardi?',
        answer: 'Revun launches in days with guided onboarding. Yardi implementations typically take 3-12 months and require dedicated consultants.',
      },
      {
        question: 'Does Revun have the same accounting features as Yardi?',
        answer: 'Revun includes full property accounting, owner statements, and financial reporting. For most residential and mixed-use portfolios, Revun covers the same accounting needs without Yardi complexity.',
      },
      {
        question: 'Can I switch from Yardi to Revun?',
        answer: 'Yes. Revun offers data migration support and guided onboarding to help you transition from Yardi without losing your financial history.',
      },
    ],
  },
  {
    slug: 'singlekey',
    name: 'SingleKey',
    category: 'Canadian Platforms',
    description:
      'Canadian tenant screening and rent guarantee platform for landlords and property managers.',
    pricingSummary: 'Pay-per-screening + rent guarantee fees',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Tenant Screening', revun: 'Built-in with partner integrations', competitor: 'Core product' },
      { name: 'Rent Guarantee', revun: 'Coming soon', competitor: 'Up to $60K coverage' },
      { name: 'Property Management', revun: 'Full PM platform', competitor: 'Not included' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Not included' },
      { name: 'Owner Portals', revun: 'Full portal with financials', competitor: 'Not included' },
      { name: 'Brokerage Tools', revun: 'Full CRM + deal management', competitor: 'Not included' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'Not included' },
      { name: 'Payments', revun: 'Rent, vendor payouts, Interac', competitor: 'Rent collection only' },
    ],
    whyRevun: [
      {
        title: 'Complete platform vs. single feature',
        body: 'SingleKey focuses on screening and rent guarantees. Revun is a complete property management platform that includes screening as one of many features.',
      },
      {
        title: 'One subscription, everything included',
        body: 'Instead of paying per-screening fees, Revun includes screening as part of your platform subscription alongside all PM tools.',
      },
      {
        title: 'Operational infrastructure',
        body: 'Revun handles leasing, maintenance, accounting, communications, and compliance. SingleKey covers one slice of the workflow.',
      },
    ],
    tldr: [
      'Revun is a full PM platform; SingleKey is screening + rent guarantee only',
      'Revun includes maintenance, accounting, and communications; SingleKey does not',
      'Revun offers flat per-unit pricing; SingleKey charges per-screening fees',
    ],
    faq: [
      {
        question: 'Is SingleKey better than Revun?',
        answer: 'SingleKey excels at tenant screening and rent guarantees, but it is not a property management platform. Revun includes screening as part of a complete PM system with maintenance, accounting, communications, and compliance tools.',
      },
      {
        question: 'Does Revun offer rent guarantee?',
        answer: 'Revun is building rent guarantee into the platform (coming soon). In the meantime, you can use SingleKey for rent guarantee alongside Revun for full property management.',
      },
      {
        question: 'Can I use SingleKey with Revun?',
        answer: 'Yes. Some property managers use SingleKey for rent guarantee while using Revun as their primary PM platform. As Revun adds rent guarantee, you will be able to consolidate into one platform.',
      },
      {
        question: 'Can I switch from SingleKey to Revun?',
        answer: 'Yes. Revun includes built-in tenant screening and a full PM suite. You can replace SingleKey for screening while gaining maintenance, accounting, leasing, and communications tools.',
      },
      {
        question: 'How does pricing compare between SingleKey and Revun?',
        answer: 'SingleKey charges per-screening fees plus rent guarantee premiums. Revun offers flat per-unit pricing from $1/day that includes screening and all PM features in one subscription.',
      },
    ],
  },
  {
    slug: 'propertyware',
    name: 'Propertyware',
    category: 'PM Software',
    description:
      'Property management software from RealPage focused on single-family rental portfolios.',
    pricingSummary: 'From $1/unit/month ($250 minimum)',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Property Types', revun: 'Residential, commercial, mixed-use', competitor: 'Single-family focused' },
      { name: 'Canadian Compliance', revun: 'Province-specific workflows', competitor: 'US-only' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Work order system' },
      { name: 'Self-Manage Option', revun: 'From $1/day per unit', competitor: 'Not available' },
      { name: 'Monthly Minimums', revun: 'No minimums', competitor: '$250/month minimum' },
      { name: 'Brokerage Tools', revun: 'Full CRM + deal management', competitor: 'Not included' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'Email + portal messaging' },
      { name: 'Payments', revun: 'Rent, vendor payouts, Interac', competitor: 'ACH, credit card' },
    ],
    whyRevun: [
      {
        title: 'All property types, one platform',
        body: 'Propertyware focuses on single-family rentals. Revun handles residential, commercial, and mixed-use portfolios in one system.',
      },
      {
        title: 'No monthly minimums',
        body: 'Propertyware requires a $250/month minimum. Revun starts at $1/day per unit with no minimums, making it accessible for any portfolio size.',
      },
      {
        title: 'Built for Canada',
        body: 'Revun includes Canadian provincial compliance, Interac payments, and local lease templates. Propertyware is US-only.',
      },
    ],
    tldr: [
      'Revun covers all property types; Propertyware focuses on single-family',
      'Revun includes Canadian compliance; Propertyware is US-only',
      'Revun starts lower with no monthly minimums; Propertyware has $250+ minimums',
    ],
    faq: [
      {
        question: 'Is Propertyware available in Canada?',
        answer: 'No. Propertyware is a US-only platform from RealPage. It does not include Canadian provincial compliance, Interac payments, or province-specific lease templates. Revun is built for the Canadian market.',
      },
      {
        question: 'Can Propertyware handle multi-family or commercial properties?',
        answer: 'Propertyware is designed primarily for single-family rental portfolios. Revun handles residential, commercial, and mixed-use properties in one platform.',
      },
      {
        question: 'How does Propertyware pricing compare to Revun?',
        answer: 'Propertyware charges from $1/unit/month with a $250/month minimum. Revun starts at $1/day per unit with no minimums and no hidden fees.',
      },
      {
        question: 'Can I switch from Propertyware to Revun?',
        answer: 'Yes. Revun offers guided onboarding and data migration support to help you transition from Propertyware with minimal disruption to your operations.',
      },
      {
        question: 'Does Revun include vendor management like Propertyware?',
        answer: 'Yes. Revun includes full vendor management with dispatch workflows, work order tracking, and vendor payouts. It goes beyond Propertyware by adding multi-channel communications and brokerage CRM.',
      },
    ],
  },
  {
    slug: 'liv-rent',
    name: 'liv.rent',
    category: 'Canadian Platforms',
    description:
      'Canadian rental listing marketplace connecting landlords with tenants through verified listings.',
    pricingSummary: 'Free listings + premium plans',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Property Management', revun: 'Full PM platform', competitor: 'Not included' },
      { name: 'Rental Listings', revun: 'Syndicated listing tools', competitor: 'Core product' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Not included' },
      { name: 'Accounting', revun: 'Full property accounting', competitor: 'Not included' },
      { name: 'Vendor Management', revun: 'Full vendor dispatch + payouts', competitor: 'Not included' },
      { name: 'Owner Portals', revun: 'Full portal with financials', competitor: 'Not included' },
      { name: 'Franchise Model', revun: 'Franchise offering for scale', competitor: 'Not available' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'In-app messaging only' },
    ],
    whyRevun: [
      {
        title: 'Full platform vs. listing marketplace',
        body: 'liv.rent is a rental listing marketplace. Revun is a complete property management platform that includes listings as one of many features.',
      },
      {
        title: 'Operations, not just discovery',
        body: 'Revun handles everything after the listing: screening, leasing, maintenance, accounting, vendor management, and compliance.',
      },
      {
        title: 'Scale with the franchise model',
        body: 'Revun offers a franchise model for property managers looking to scale their business. liv.rent has no franchise or scaling infrastructure.',
      },
    ],
    tldr: [
      'Revun is a full PM platform; liv.rent is a rental listing marketplace',
      'Revun includes maintenance, accounting, and vendor management; liv.rent does not',
      'Revun offers franchise model for scale; liv.rent has no franchise offering',
    ],
    faq: [
      {
        question: 'Is liv.rent a property management platform?',
        answer: 'No. liv.rent is a rental listing marketplace that helps landlords find tenants. It does not include property management features like maintenance tracking, accounting, vendor management, or compliance tools. Revun is a full PM platform.',
      },
      {
        question: 'Can I use liv.rent with Revun?',
        answer: 'Yes. Some property managers use liv.rent for listing exposure while using Revun as their primary PM platform for operations, accounting, and compliance.',
      },
      {
        question: 'Does Revun include rental listings?',
        answer: 'Yes. Revun includes syndicated listing tools as part of the platform, along with screening, leasing, maintenance, accounting, and communications.',
      },
      {
        question: 'How does liv.rent pricing compare to Revun?',
        answer: 'liv.rent offers free listings with premium plans for additional features. Revun charges $1/day per unit for a complete PM platform. They serve different needs: liv.rent for tenant discovery, Revun for full property operations.',
      },
      {
        question: 'Does Revun offer a franchise model?',
        answer: 'Yes. Revun offers a franchise model for property managers looking to scale their business across multiple locations. liv.rent does not offer any franchise or scaling infrastructure.',
      },
    ],
  },
  {
    slug: 'rhenti',
    name: 'Rhenti',
    category: 'Canadian Platforms',
    description:
      'Canadian leasing automation platform targeting mid-market multifamily operators with lead-to-lease workflows.',
    pricingSummary: 'Custom quotes only',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Audience Segments', revun: 'Owners, managers, brokerages, franchises', competitor: 'Mid-market multifamily only' },
      { name: 'Pricing Transparency', revun: 'Self-serve transparent pricing', competitor: 'Custom quotes required' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Not included' },
      { name: 'Accounting', revun: 'Full property accounting', competitor: 'Not included' },
      { name: 'Rent Guarantee', revun: 'Coming soon', competitor: 'Not included' },
      { name: 'Owner Portals', revun: 'Full portal with financials', competitor: 'Not included' },
      { name: 'Leasing Automation', revun: 'Full lease lifecycle', competitor: 'Core product (lead-to-lease)' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'Lead communications only' },
    ],
    whyRevun: [
      {
        title: 'Serves every audience segment',
        body: 'Rhenti targets mid-market multifamily operators only. Revun serves self-managing owners, property managers, brokerages, and franchises across all property types.',
      },
      {
        title: 'Transparent, self-serve pricing',
        body: 'Rhenti requires custom quotes for pricing. Revun offers transparent, self-serve pricing from $1/day per unit with no sales calls required.',
      },
      {
        title: 'Full PM ops, not just leasing',
        body: 'Rhenti focuses on lead-to-lease automation. Revun covers the full property management lifecycle including maintenance, accounting, compliance, and vendor management.',
      },
    ],
    tldr: [
      'Revun covers all audience segments; Rhenti targets mid-market multifamily only',
      'Revun has transparent self-serve pricing; Rhenti requires custom quotes',
      'Revun includes rent guarantee and full PM ops; Rhenti focuses on lead-to-lease',
    ],
    faq: [
      {
        question: 'Is Rhenti a full property management platform?',
        answer: 'No. Rhenti focuses on leasing automation (lead-to-lease workflows) for mid-market multifamily operators. It does not include maintenance tracking, accounting, vendor management, or compliance tools. Revun is a full PM platform.',
      },
      {
        question: 'Can small landlords use Rhenti?',
        answer: 'Rhenti targets mid-market multifamily operators and requires custom quotes. Revun serves all audience segments including self-managing owners, with transparent pricing from $1/day per unit.',
      },
      {
        question: 'How does Rhenti pricing compare to Revun?',
        answer: 'Rhenti requires custom quotes with no published pricing. Revun offers transparent, self-serve pricing from $1/day per unit with no sales calls or custom negotiations required.',
      },
      {
        question: 'Does Revun include leasing automation like Rhenti?',
        answer: 'Yes. Revun includes full lease lifecycle management from lead generation through lease signing, renewals, and compliance. It covers the same leasing workflows as Rhenti plus full property operations.',
      },
      {
        question: 'Can I switch from Rhenti to Revun?',
        answer: 'Yes. Revun covers all of Rhenti leasing automation features plus maintenance, accounting, vendor management, and compliance. Migration support is available.',
      },
    ],
  },
  {
    slug: 'frontlobby',
    name: 'FrontLobby',
    category: 'Canadian Platforms',
    description:
      'Canadian rent reporting platform that reports tenant rent payments to credit bureaus.',
    pricingSummary: 'Per-tenant rent reporting fees',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Rent Reporting', revun: 'Included in platform', competitor: 'Core product' },
      { name: 'Property Management', revun: 'Full PM platform', competitor: 'Not included' },
      { name: 'Tenant Screening', revun: 'Built-in with partner integrations', competitor: 'Not included' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Not included' },
      { name: 'Accounting', revun: 'Full property accounting', competitor: 'Not included' },
      { name: 'Owner Portals', revun: 'Full portal with financials', competitor: 'Not included' },
      { name: 'Leasing Tools', revun: 'Full lease lifecycle', competitor: 'Not included' },
      { name: 'Payments', revun: 'Rent, vendor payouts, Interac', competitor: 'Rent tracking only' },
    ],
    whyRevun: [
      {
        title: 'Complete platform vs. single feature',
        body: 'FrontLobby does rent reporting only. Revun is a complete property management platform that includes rent reporting as part of the subscription.',
      },
      {
        title: 'Everything in one subscription',
        body: 'Revun includes screening, leasing, maintenance, accounting, payments, and rent reporting in one platform. FrontLobby requires separate tools for all other PM functions.',
      },
      {
        title: 'No per-tenant fees for reporting',
        body: 'FrontLobby charges per-tenant for rent reporting. Revun includes rent reporting as part of the flat per-unit platform fee.',
      },
    ],
    tldr: [
      'Revun is a complete PM platform; FrontLobby does rent reporting only',
      'Revun includes screening, leasing, maintenance, and payments; FrontLobby has one feature',
      'Revun includes rent reporting as part of the platform; FrontLobby charges separately',
    ],
    faq: [
      {
        question: 'Is FrontLobby a property management platform?',
        answer: 'No. FrontLobby is a rent reporting platform that reports tenant payments to credit bureaus. It does not include property management features like screening, maintenance, accounting, or leasing. Revun is a full PM platform that includes rent reporting.',
      },
      {
        question: 'Does Revun include rent reporting?',
        answer: 'Yes. Revun includes rent reporting as part of the platform subscription. You do not need a separate tool like FrontLobby for credit bureau reporting.',
      },
      {
        question: 'Can I use FrontLobby with Revun?',
        answer: 'You can, but it is not necessary. Revun includes rent reporting as part of the platform, so you would not need to pay separately for FrontLobby.',
      },
      {
        question: 'How does FrontLobby pricing compare to Revun?',
        answer: 'FrontLobby charges per-tenant fees for rent reporting only. Revun charges $1/day per unit for a complete PM platform that includes rent reporting, screening, maintenance, accounting, and more.',
      },
      {
        question: 'Can I switch from FrontLobby to Revun?',
        answer: 'Yes. Revun includes rent reporting natively, so you can consolidate from FrontLobby plus your existing PM tools into one platform.',
      },
    ],
  },
]

const competitorMap = Object.fromEntries(competitors.map((c) => [`revun-vs-${c.slug}`, c]))
const allSlugs = Object.keys(competitorMap)

/* ── Static params ────────────────────────────────────────────────────────── */

export function generateStaticParams() {
  return allSlugs.map((competitor) => ({ competitor }))
}

/* ── Metadata ─────────────────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ competitor: string }>
}): Promise<Metadata> {
  const { competitor } = await params
  const data = competitorMap[competitor]
  if (!data) return {}
  return {
    title: `Revun vs ${data.name} | Compare`,
    description: `See how Revun compares to ${data.name} across features, pricing, and support. ${data.description}`,
    alternates: { canonical: buildCanonicalUrl(`/compare/${competitor}`) },
    openGraph: {
      title: `Revun vs ${data.name} | Comparison`,
      description: `Detailed comparison of Revun and ${data.name} for property management.`,
      url: buildCanonicalUrl(`/compare/${competitor}`),
    },
  }
}

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default async function CompareDetailPage({
  params,
}: {
  params: Promise<{ competitor: string }>
}) {
  const { competitor } = await params
  const data = competitorMap[competitor]
  if (!data) notFound()

  const canonicalUrl = buildCanonicalUrl(`/compare/${competitor}`)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://revun.com'

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Compare',
        item: buildCanonicalUrl('/compare'),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `Revun vs ${data.name}`,
        item: canonicalUrl,
      },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Revun vs ${data.name}: Property Management Software Comparison`,
    description: `See how Revun compares to ${data.name} across features, pricing, and support. ${data.description}`,
    datePublished: '2026-04-08',
    publisher: {
      '@type': 'Organization',
      name: 'Revun',
      url: siteUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(breadcrumbSchema as Record<string, unknown>) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(faqSchema as Record<string, unknown>) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(articleSchema as Record<string, unknown>) }}
      />
      <CompareDetailClient data={data} />
    </>
  )
}
