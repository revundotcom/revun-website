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
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'US-only — no Canadian compliance' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'PM and leasing only — no brokerage or built-in comms' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'Portal messaging + email only' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'Basic work orders — no dispatch or field app' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'Leasing only — no brokerage CRM' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'ACH + credit card only' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'US state compliance only' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'PM and tenant roles only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'Basic portal with limited features' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Siloed data across modules' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '1-2 tools replaced (PM basics only)' },
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
        answer: 'AppFolio charges from $1.40/unit/month with a 50-unit minimum. Revun offers clear per-unit pricing from $1/day with no minimums and no hidden fees.',
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
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'Limited Canadian support — no province-specific compliance' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'PM and leasing — no brokerage CRM or comms hub' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'Email + portal messaging only' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'Work order system — no dispatch or vendor coordination' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'Leasing only — no brokerage tools' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'ACH + credit card — no Interac' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'US-focused compliance only' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'PM, tenant, and association roles' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'Basic tenant and owner portals' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'PM data only — no brokerage or comms data' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '1-2 tools replaced (PM + basic accounting)' },
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
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'US-focused — no Canadian compliance' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'PM and leasing — no brokerage or comms' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'Email + portal messaging only' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'Basic maintenance module — no vendor dispatch' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'Leasing only — no brokerage CRM' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'ACH + credit card — no Interac' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'US-focused — no Canadian compliance automation' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'PM and tenant roles only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'Basic portal with limited self-service' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'PM data only — no brokerage integration' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '1-2 tools replaced (PM basics only)' },
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
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'Global but not Canada-specific — no provincial compliance' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Short-term rental PM + channel management — no long-term leasing or brokerage' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'Unified inbox for guest messaging only' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'Task automation — no vendor dispatch or field app' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'No brokerage or long-term leasing workflows' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'Revenue-share based — takes 3-5% of bookings' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'Short-term rental regulations only — no lease compliance' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Host and guest roles only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'Guest experience only — no long-term tenant portal' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Channel data unified — no long-term PM data' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '1-2 tools replaced (short-term PM + channel manager)' },
    ],
    whyRevun: [
      {
        title: 'Built for long-term rentals',
        body: 'Guesty is designed for short-term and vacation rentals. Revun is purpose-built for long-term residential and commercial property management.',
      },
      {
        title: 'Predictable, clear pricing',
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
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'Some Canadian support — but US-centric architecture' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Broad suite via paid modules — not unified out of the box' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'RentCafe messaging only — no VoIP or SMS' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'Maintenance IQ module — requires separate license' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'Commercial CRM focus — limited residential brokerage' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'Full payments — but complex setup and legacy workflows' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'US compliance deep — Canadian compliance limited' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'All roles — but requires per-module licensing' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'RentCafe portal — solid but legacy UI' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Data unified if all modules purchased — siloed otherwise' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '3-5 tools replaced — but 6-24 month implementation' },
    ],
    whyRevun: [
      {
        title: 'Get started in days, not months',
        body: 'Yardi implementations take 3-12 months and require consultants. Revun launches in days with guided onboarding.',
      },
      {
        title: 'Modern interface, modern pricing',
        body: 'Revun offers a clean, intuitive interface with clear per-unit pricing. No legacy UI or opaque enterprise contracts.',
      },
      {
        title: 'Same power, less overhead',
        body: 'Revun delivers enterprise features without requiring a dedicated IT team to manage and maintain the system.',
      },
    ],
    tldr: [
      'Revun launches in days; Yardi takes 3-12 months to implement',
      'Revun has clear per-unit pricing; Yardi uses opaque enterprise contracts',
      'Revun offers a modern interface; Yardi has a legacy UI requiring IT support',
    ],
    faq: [
      {
        question: 'Is Yardi overkill for mid-size portfolios?',
        answer: 'Yardi is built for enterprise portfolios and REITs, with long implementation timelines and high costs. Revun delivers comparable features for mid-size portfolios with faster setup and clear pricing.',
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
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'Canadian — but screening and rent guarantee only' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Screening + rent guarantee — no PM, maintenance, or accounting' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'No communications hub' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'No maintenance features' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'No brokerage or leasing tools' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'Rent collection only — no vendor payouts or owner disbursements' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'Screening compliance only — no PM compliance automation' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Landlord role only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'No tenant portal' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Screening data only — no operational data' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '0-1 tools replaced (screening only)' },
    ],
    whyRevun: [
      {
        title: 'Complete platform vs. single feature',
        body: 'SingleKey focuses on screening and rent guarantees. Revun is a complete property operations platform that includes screening as one of many features.',
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
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'US-only — no Canadian support' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Single-family PM — no brokerage or comms hub' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'Email + portal messaging only' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'Work order system — limited dispatch' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'Basic leasing — no brokerage CRM' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'ACH + credit card — no Interac, $250/mo minimum' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'US compliance only' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'PM, owner, and tenant roles — single-family focused' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'Basic tenant and owner portal' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'PM data only — single-family scope' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '1-2 tools replaced (single-family PM only)' },
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
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'Canadian — but listings marketplace only' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Listing marketplace — no PM, maintenance, or accounting' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'In-app messaging only' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'No maintenance features' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'Listing and tenant discovery — no brokerage CRM or lease management' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'No payment processing' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'No compliance automation' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Landlord and renter roles only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'Listing search experience — no post-move-in portal' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Listing data only — no operational data' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '0 tools replaced (listing marketplace only)' },
    ],
    whyRevun: [
      {
        title: 'Full platform vs. listing marketplace',
        body: 'liv.rent is a rental listing marketplace. Revun is a complete property operations platform that includes listings as one of many features.',
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
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'Canadian — but leasing automation only' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Lead-to-lease automation — no PM, maintenance, or accounting' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'Lead communications only — no multi-channel comms' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'No maintenance features' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'Lead-to-lease automation — mid-market multifamily only' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'No payment processing' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'Leasing compliance only — no PM compliance' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Leasing team role only — mid-market multifamily' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'Application experience only — no post-move-in portal' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Leasing funnel data only' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '1 tool replaced (leasing automation only)' },
    ],
    whyRevun: [
      {
        title: 'Serves every audience segment',
        body: 'Rhenti targets mid-market multifamily operators only. Revun serves self-managing owners, property managers, brokerages, and franchises across all property types.',
      },
      {
        title: 'Clear, self-serve pricing',
        body: 'Rhenti requires custom quotes for pricing. Revun offers clear, self-serve pricing from $1/day per unit with no sales calls required.',
      },
      {
        title: 'Full PM ops, not just leasing',
        body: 'Rhenti focuses on lead-to-lease automation. Revun covers the full property management lifecycle including maintenance, accounting, compliance, and vendor management.',
      },
    ],
    tldr: [
      'Revun covers all audience segments; Rhenti targets mid-market multifamily only',
      'Revun has clear self-serve pricing; Rhenti requires custom quotes',
      'Revun includes rent guarantee and full PM ops; Rhenti focuses on lead-to-lease',
    ],
    faq: [
      {
        question: 'Is Rhenti a full property management platform?',
        answer: 'No. Rhenti focuses on leasing automation (lead-to-lease workflows) for mid-market multifamily operators. It does not include maintenance tracking, accounting, vendor management, or compliance tools. Revun is a full PM platform.',
      },
      {
        question: 'Can small landlords use Rhenti?',
        answer: 'Rhenti targets mid-market multifamily operators and requires custom quotes. Revun serves all audience segments including self-managing owners, with clear pricing from $1/day per unit.',
      },
      {
        question: 'How does Rhenti pricing compare to Revun?',
        answer: 'Rhenti requires custom quotes with no published pricing. Revun offers clear, self-serve pricing from $1/day per unit with no sales calls or custom negotiations required.',
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
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'Canadian — but rent reporting only' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Rent reporting to credit bureaus — no PM, leasing, or maintenance' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'No communications hub' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'No maintenance features' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'No brokerage or leasing tools' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'Rent tracking only — no payment processing' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'Credit reporting compliance only' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Landlord role only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'No tenant portal — rent reporting benefit only' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Rent payment data only' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '0 tools replaced (rent reporting add-on only)' },
    ],
    whyRevun: [
      {
        title: 'Complete platform vs. single feature',
        body: 'FrontLobby does rent reporting only. Revun is a complete property operations platform that includes rent reporting as part of the subscription.',
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
  /* ── PM Software (additional) ──────────────────────────────────────────── */
  {
    slug: 'entrata',
    name: 'Entrata',
    category: 'PM Software',
    description: 'Enterprise property management platform for large multifamily portfolios with integrated marketing, leasing, and resident services.',
    pricingSummary: 'Custom enterprise pricing',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'US-only — no Canadian compliance' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Broad suite for multifamily — but enterprise-only (250+ units)' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'Email + portal messaging — no VoIP' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'Maintenance module included — enterprise scale' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'Leasing and marketing — no brokerage CRM' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'ACH + credit card — no Interac' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'US compliance only — no Canadian support' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Multiple roles — but enterprise-tier only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'ResidentPortal — feature-rich but US-only' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Unified within Entrata — but 6-18 month setup' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '3-5 tools replaced — but requires 250+ units and long onboarding' },
    ],
    whyRevun: [
      {
        title: 'No enterprise-only gatekeeping',
        body: 'Entrata requires 250+ units and months of implementation. Revun serves any portfolio size with setup in days.',
      },
      {
        title: 'Built for Canadian operations',
        body: 'Revun includes province-specific compliance, Interac payments, and Canadian lease templates. Entrata is US-only.',
      },
      {
        title: 'Clear, predictable pricing',
        body: 'Entrata requires custom enterprise quotes. Revun offers self-serve pricing from $1/day per unit with no hidden fees.',
      },
    ],
    tldr: [
      'Revun serves any portfolio size; Entrata requires 250+ units minimum',
      'Revun launches in days; Entrata takes 6-18 months to implement',
      'Revun includes Canadian compliance; Entrata is US-only',
    ],
    faq: [
      {
        question: 'Is Entrata available in Canada?',
        answer: 'No. Entrata is designed for the US multifamily market and does not include Canadian provincial compliance, Interac payments, or province-specific lease templates. Revun is built for the Canadian market from the ground up.',
      },
      {
        question: 'Can mid-size portfolios use Entrata?',
        answer: 'Entrata is enterprise-focused with a 250+ unit minimum and lengthy implementation. Revun has no minimum unit requirement and launches in days.',
      },
      {
        question: 'How does Entrata pricing compare to Revun?',
        answer: 'Entrata uses custom enterprise pricing with long contracts. Revun offers clear per-unit pricing from $1/day with no minimums and no hidden fees.',
      },
      {
        question: 'Who should choose Entrata over Revun?',
        answer: 'Entrata is a strong choice for large US-based multifamily operators with 1,000+ units who need deep integration with US-specific marketing and leasing tools. For Canadian operators or mid-size portfolios, Revun is the better fit.',
      },
    ],
  },
  {
    slug: 'mri-software',
    name: 'MRI Software',
    category: 'PM Software',
    description: 'Enterprise real estate software covering commercial, residential, and investment management for global operators.',
    pricingSummary: 'Custom enterprise pricing',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'Some Canadian support — but US-centric platform' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Broad but modular — each module sold separately' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'Email + portal messaging — no unified comms hub' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'MRI WorkSpecs — separate paid module' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'Commercial CRM only — no residential brokerage' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'Payments via modules — complex configuration' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'US-focused — limited Canadian automation' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'All roles — but requires per-module licensing' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'Resident portal — legacy interface' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Data fragmented across purchased modules' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '3-5 tools replaced — but 6-24 month implementation and IT team required' },
    ],
    whyRevun: [
      {
        title: 'Modern platform, modern timeline',
        body: 'MRI implementations take 6-24 months with consultants. Revun launches in days with guided onboarding and a modern interface.',
      },
      {
        title: 'All-in-one without the modules',
        body: 'MRI sells modules separately. Revun includes everything - PM, brokerage CRM, maintenance, communications - in one subscription.',
      },
      {
        title: 'No IT team required',
        body: 'MRI often requires dedicated IT support. Revun is self-serve with no technical expertise needed.',
      },
    ],
    tldr: [
      'Revun launches in days; MRI takes 6-24 months',
      'Revun includes all features in one subscription; MRI charges for modules',
      'Revun is self-serve; MRI requires dedicated IT support',
    ],
    faq: [
      {
        question: 'Is MRI Software overkill for residential portfolios?',
        answer: 'MRI is built for enterprise commercial and residential. For most residential portfolios, Revun delivers the same core features with faster deployment and streamlined pricing.',
      },
      {
        question: 'How does MRI pricing compare to Revun?',
        answer: 'MRI uses custom enterprise pricing with modular add-ons. Revun offers clear per-unit pricing from $1/day with all features included.',
      },
      {
        question: 'Who should choose MRI over Revun?',
        answer: 'MRI is strong for large global operators managing billions in commercial assets who need deep investment management tools. For residential and mid-market portfolios, Revun deploys faster, scales better, and costs less.',
      },
    ],
  },
  {
    slug: 'tenantcloud',
    name: 'TenantCloud',
    category: 'PM Software',
    description: 'Cloud-based property management software targeting small landlords and self-managing owners.',
    pricingSummary: 'Free plan + paid from $15.60/month',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'US-focused — no Canadian compliance' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Basic PM — no brokerage, limited accounting' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'In-app messaging only' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'Basic work orders — no vendor dispatch' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'Basic leasing — no brokerage CRM' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'ACH + credit card — no Interac' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'US-focused — no Canadian compliance' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Landlord and tenant roles only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'Basic tenant portal — limited self-service' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Basic PM data — no brokerage or comms unification' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '1 tool replaced (basic PM only — best for <75 units)' },
    ],
    whyRevun: [
      {
        title: 'Grows with you',
        body: 'TenantCloud works for small portfolios but struggles at scale. Revun handles 1 to 10,000+ units without changing platforms.',
      },
      {
        title: 'Canadian-first compliance',
        body: 'TenantCloud is US-focused. Revun includes provincial compliance, Interac payments, and Canadian lease templates natively.',
      },
      {
        title: 'Professional-grade vendor dispatch',
        body: 'TenantCloud offers basic vendor directories. Revun includes full dispatch workflows, GPS tracking, and vendor payouts.',
      },
    ],
    tldr: [
      'Revun scales to any size; TenantCloud is best for small portfolios under 75 units',
      'Revun includes Canadian compliance natively; TenantCloud is US-focused',
      'Revun includes full vendor dispatch; TenantCloud has basic vendor features',
    ],
    faq: [
      {
        question: 'Is TenantCloud free?',
        answer: 'TenantCloud offers a free plan with limited features for up to 75 units, plus paid plans from $15.60/month. Revun offers a complete platform from $1/day per unit with all features included.',
      },
      {
        question: 'Who should choose TenantCloud over Revun?',
        answer: 'TenantCloud is a solid choice for US-based landlords with fewer than 10 units who want a free basic tool. For Canadian operators or anyone planning to scale, Revun is the better long-term investment.',
      },
      {
        question: 'Can I switch from TenantCloud to Revun?',
        answer: 'Yes. Revun offers guided onboarding and data migration support to help you transition from TenantCloud with minimal disruption.',
      },
    ],
  },
  {
    slug: 'hemlane',
    name: 'Hemlane',
    category: 'PM Software',
    description: 'Hybrid property management platform blending DIY tools with optional local agent support.',
    pricingSummary: 'From $2/unit/month (self-manage)',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'US-only — no Canadian support' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Hybrid DIY + agent model — no brokerage or full accounting' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'Email + phone forwarding — no unified comms' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'Agent-assisted repairs — no direct vendor dispatch' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'Basic leasing — no brokerage CRM' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'ACH only — no Interac or vendor payouts' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'US-focused — no Canadian compliance' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Owner and tenant roles — relies on third-party agents' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'Basic dashboard — limited tenant self-service' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Fragmented between DIY tools and agent network' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '1 tool replaced (hybrid PM only)' },
    ],
    whyRevun: [
      {
        title: 'Full platform, not a hybrid',
        body: 'Hemlane mixes DIY tools with optional local agents. Revun gives you a complete platform you control without relying on third-party agents.',
      },
      {
        title: 'Canadian compliance built in',
        body: 'Hemlane is US-only. Revun includes province-specific compliance, Interac, and Canadian lease templates natively.',
      },
      {
        title: 'Scale through franchise, not agents',
        body: 'Revun offers a franchise model for scaling your business. Hemlane depends on local agent networks you do not control.',
      },
    ],
    tldr: [
      'Revun is a full PM platform; Hemlane is a hybrid DIY + agent model',
      'Revun includes Canadian compliance; Hemlane is US-only',
      'Revun scales via franchise model; Hemlane relies on local agent networks',
    ],
    faq: [
      {
        question: 'Is Hemlane available in Canada?',
        answer: 'No. Hemlane is a US-only platform. It does not include Canadian provincial compliance, Interac payments, or province-specific lease templates.',
      },
      {
        question: 'Who should choose Hemlane over Revun?',
        answer: 'Hemlane is good for US landlords who want a mix of DIY tools and local agent support for maintenance. For Canadian operators or those wanting full control, Revun is the better choice.',
      },
      {
        question: 'Can I switch from Hemlane to Revun?',
        answer: 'Yes. Revun offers guided onboarding and data migration support to help you transition from Hemlane.',
      },
    ],
  },
  {
    slug: 'avail',
    name: 'Avail',
    category: 'PM Software',
    description: 'DIY landlord tools from Realtor.com for finding tenants, signing leases, and collecting rent.',
    pricingSummary: 'Free plan + Unlimited Plus at $7/unit/month',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'US-only — no Canadian support' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'DIY landlord tools — no brokerage, vendor dispatch, or accounting' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'In-app messaging only' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'Basic maintenance requests — no dispatch or vendor management' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'Basic listings and leasing — no brokerage CRM' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'ACH rent collection only — no vendor payouts or Interac' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'US-focused — no Canadian compliance' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Landlord and tenant roles only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'Basic tenant features — limited portal' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Basic data — no unified operations view' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '1 tool replaced (DIY landlord basics — best for 1-3 units)' },
    ],
    whyRevun: [
      {
        title: 'Professional-grade tools',
        body: 'Avail is designed for DIY landlords. Revun delivers professional-grade features like vendor dispatch, full accounting, and owner portals.',
      },
      {
        title: 'Canadian market support',
        body: 'Avail is US-only. Revun includes Interac, provincial compliance, and Canadian lease templates.',
      },
      {
        title: 'Scale without switching',
        body: 'Avail works for a few units but lacks the depth for growth. Revun scales from one unit to thousands without changing platforms.',
      },
    ],
    tldr: [
      'Revun is professional-grade PM; Avail is DIY landlord tools',
      'Revun includes Canadian compliance; Avail is US-only',
      'Revun scales to any portfolio size; Avail is best for small landlords',
    ],
    faq: [
      {
        question: 'Is Avail free?',
        answer: 'Avail offers a free plan with limited features. The Unlimited Plus plan costs $7/unit/month. Revun offers a complete PM platform from $1/day per unit.',
      },
      {
        question: 'Who should choose Avail over Revun?',
        answer: 'Avail is a good choice for US-based landlords with 1-3 units who want basic free tools. For Canadian operators or anyone managing more than a handful of units, Revun provides much more value.',
      },
      {
        question: 'Can I switch from Avail to Revun?',
        answer: 'Yes. Revun offers guided onboarding and data migration support. Many landlords upgrade from Avail when they outgrow basic tools.',
      },
    ],
  },
  {
    slug: 'turbo-tenant',
    name: 'TurboTenant',
    category: 'PM Software',
    description: 'Free landlord software for marketing rentals, screening tenants, and collecting rent online.',
    pricingSummary: 'Free for landlords (tenant-paid screening)',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'US-only — no Canadian support' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Free landlord tools — no brokerage, accounting, or vendor dispatch' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'In-app messaging only' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'Basic maintenance requests — no dispatch' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'Listing + screening — no brokerage CRM or lease management' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'ACH rent collection — no vendor payouts or Interac' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'US-focused — no Canadian compliance' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Landlord and tenant roles only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'Tenant pays for screening — limited portal' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Basic data — no unified operations view' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '1 tool replaced (free basics — best for 1-2 units)' },
    ],
    whyRevun: [
      {
        title: 'Beyond free basics',
        body: 'TurboTenant is free but limited. Revun includes full accounting, vendor dispatch, and owner portals that TurboTenant does not offer.',
      },
      {
        title: 'Canadian compliance included',
        body: 'TurboTenant is US-only. Revun includes provincial compliance, Interac payments, and Canadian-specific lease templates.',
      },
      {
        title: 'Tenant-friendly screening model',
        body: 'TurboTenant charges tenants for screening. Revun includes screening in the platform subscription so landlords control the experience.',
      },
    ],
    tldr: [
      'Revun is a complete PM platform; TurboTenant offers limited free tools',
      'Revun includes screening in the subscription; TurboTenant charges tenants separately',
      'Revun supports Canadian compliance; TurboTenant is US-only',
    ],
    faq: [
      {
        question: 'Is TurboTenant really free?',
        answer: 'TurboTenant is free for landlords, but tenants pay for screening and the feature set is limited. Revun includes screening in the platform fee alongside full accounting, vendor dispatch, and compliance tools.',
      },
      {
        question: 'Who should choose TurboTenant over Revun?',
        answer: 'TurboTenant is a reasonable choice for US landlords with 1-2 units who want zero cost. For Canadian operators or anyone needing professional features, Revun is the better investment.',
      },
      {
        question: 'Can I switch from TurboTenant to Revun?',
        answer: 'Yes. Revun offers guided onboarding to help you upgrade from TurboTenant free tools to a complete property operations platform.',
      },
    ],
  },
  {
    slug: 'innago',
    name: 'Innago',
    category: 'PM Software',
    description: 'Free property management software for small to mid-size landlords with online rent collection and lease management.',
    pricingSummary: 'Free (revenue from tenant services)',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'US-only — no Canadian support' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Free PM basics — no brokerage, vendor dispatch, or comms hub' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'Email only' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'Basic work orders — no dispatch or vendor management' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'Basic leasing — no brokerage CRM' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'ACH rent collection — no vendor payouts or Interac' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'US-focused — no Canadian compliance' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Landlord and tenant roles only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'Basic tenant portal — limited features' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Basic data — no unified operations view' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '1 tool replaced (free PM basics only)' },
    ],
    whyRevun: [
      {
        title: 'Professional features, not just free',
        body: 'Innago is free but basic. Revun includes vendor dispatch, full accounting, communications hub, and owner portals.',
      },
      {
        title: 'Built for Canada',
        body: 'Innago is US-only. Revun includes provincial compliance, Interac, and Canadian lease templates.',
      },
      {
        title: 'Scales with your business',
        body: 'Innago works for small landlords but lacks enterprise features. Revun scales from one unit to thousands.',
      },
    ],
    tldr: [
      'Revun is a full PM platform; Innago is free but basic',
      'Revun includes Canadian compliance; Innago is US-only',
      'Revun scales to enterprise; Innago is best for small landlords',
    ],
    faq: [
      {
        question: 'Is Innago really free?',
        answer: 'Innago is free for landlords but generates revenue through tenant services and has limited features. Revun offers a complete platform from $1/day per unit.',
      },
      {
        question: 'Who should choose Innago over Revun?',
        answer: 'Innago works for US landlords with a few units who want zero upfront cost. For Canadian operators or growing portfolios, Revun is the better investment.',
      },
      {
        question: 'Can I switch from Innago to Revun?',
        answer: 'Yes. Revun offers guided onboarding and data migration to help you upgrade from Innago.',
      },
    ],
  },
  {
    slug: 'rentec-direct',
    name: 'Rentec Direct',
    category: 'PM Software',
    description: 'Affordable property management and tenant screening software for landlords and property managers.',
    pricingSummary: 'From $45/month (up to 25 units)',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'US-only — no Canadian support' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'PM + trust accounting — no brokerage or comms hub' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'Email + portal messaging only' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'Basic work orders — limited vendor tracking' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'Basic leasing — no brokerage CRM' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'ACH rent collection — no Interac' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'US-focused — no Canadian compliance' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'PM, owner, and tenant roles only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'Basic tenant and owner portal' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'PM + accounting data — no brokerage or comms data' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '1-2 tools replaced (PM + trust accounting)' },
    ],
    whyRevun: [
      {
        title: 'Canadian-first platform',
        body: 'Rentec Direct is US-only. Revun includes Interac, provincial compliance, and Canadian lease templates.',
      },
      {
        title: 'Deeper maintenance automation',
        body: 'Rentec Direct has basic work orders. Revun includes full vendor dispatch with GPS tracking, photo capture, and automated invoicing.',
      },
      {
        title: 'Multi-channel communications',
        body: 'Rentec Direct offers email and portal messaging. Revun adds SMS, VoIP calling, and in-app messaging in one hub.',
      },
    ],
    tldr: [
      'Revun includes Canadian compliance; Rentec Direct is US-only',
      'Revun has full vendor dispatch; Rentec Direct has basic work orders',
      'Revun includes multi-channel communications; Rentec Direct is email-only',
    ],
    faq: [
      {
        question: 'Is Rentec Direct available in Canada?',
        answer: 'No. Rentec Direct is a US-only platform. Revun is built for the Canadian market with provincial compliance and Interac payments.',
      },
      {
        question: 'Who should choose Rentec Direct over Revun?',
        answer: 'Rentec Direct is strong for US-based property managers who need affordable trust accounting. For Canadian operators, Revun is the clear choice.',
      },
      {
        question: 'Can I switch from Rentec Direct to Revun?',
        answer: 'Yes. Revun offers guided onboarding and data migration support for Rentec Direct users.',
      },
    ],
  },
  {
    slug: 'simplifyem',
    name: 'SimplifyEm',
    category: 'PM Software',
    description: 'Straightforward property management software for landlords who want basics without complexity.',
    pricingSummary: 'From $25/month (up to 10 units)',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'US-only — no Canadian support' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Basic PM only — no brokerage, comms, or vendor dispatch' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'Email only' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'Basic tracking only — no dispatch or vendor management' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'Basic leasing — no brokerage CRM' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'ACH rent collection — no Interac or vendor payouts' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'US-focused — no Canadian compliance' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Landlord role only — limited multi-user support' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'Basic reports only — no tenant portal' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Basic PM data — no unified view' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '1 tool replaced (basic PM only — best for <10 units)' },
    ],
    whyRevun: [
      {
        title: 'Streamlined and powerful',
        body: 'SimplifyEm keeps it basic but lacks depth. Revun is equally intuitive but includes vendor dispatch, communications, and compliance.',
      },
      {
        title: 'Canadian compliance included',
        body: 'SimplifyEm is US-only. Revun includes provincial compliance, Interac, and Canadian lease templates.',
      },
      {
        title: 'Room to grow',
        body: 'SimplifyEm works for small portfolios but cannot scale. Revun grows with your business from 1 to 10,000+ units.',
      },
    ],
    tldr: [
      'Revun is streamlined and powerful; SimplifyEm is basic but limited',
      'Revun includes Canadian compliance; SimplifyEm is US-only',
      'Revun scales to enterprise; SimplifyEm is best for small portfolios',
    ],
    faq: [
      {
        question: 'Is SimplifyEm good for Canadian landlords?',
        answer: 'No. SimplifyEm is US-only and lacks Canadian compliance. Revun is purpose-built for the Canadian market.',
      },
      {
        question: 'Who should choose SimplifyEm over Revun?',
        answer: 'SimplifyEm works for US landlords with fewer than 10 units who want a bare-minimum tool. For anyone planning to scale, Revun is the better choice.',
      },
      {
        question: 'Can I switch from SimplifyEm to Revun?',
        answer: 'Yes. Revun offers guided onboarding to help you upgrade from SimplifyEm.',
      },
    ],
  },
  {
    slug: 'resman',
    name: 'ResMan',
    category: 'PM Software',
    description: 'Multifamily property management platform with accounting, maintenance, and marketing tools.',
    pricingSummary: 'Custom pricing per unit',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'US-only — no Canadian compliance' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Multifamily PM + marketing — no brokerage CRM' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'Email + portal messaging only' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'Built-in work orders — limited dispatch' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'Leasing + marketing — no brokerage CRM' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'ACH + credit card — no Interac' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'US compliance only' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'PM and tenant roles — multifamily only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'Resident portal — multifamily focused' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'PM data unified — no brokerage or comms data' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '1-2 tools replaced (multifamily PM + marketing)' },
    ],
    whyRevun: [
      {
        title: 'All property types, one platform',
        body: 'ResMan focuses on multifamily only. Revun handles residential, commercial, and mixed-use portfolios.',
      },
      {
        title: 'Canadian market support',
        body: 'ResMan is US-only. Revun includes provincial compliance, Interac, and Canadian lease templates.',
      },
      {
        title: 'Clear pricing',
        body: 'ResMan requires custom quotes. Revun offers self-serve pricing from $1/day per unit with no sales calls needed.',
      },
    ],
    tldr: [
      'Revun covers all property types; ResMan is multifamily only',
      'Revun includes Canadian compliance; ResMan is US-only',
      'Revun has clear pricing; ResMan requires custom quotes',
    ],
    faq: [
      {
        question: 'Can ResMan handle commercial properties?',
        answer: 'ResMan focuses on multifamily. Revun handles residential, commercial, and mixed-use properties in one platform.',
      },
      {
        question: 'Who should choose ResMan over Revun?',
        answer: 'ResMan is strong for large US multifamily operators who want deep marketing tools. For Canadian operators or mixed-use portfolios, Revun is the better fit.',
      },
      {
        question: 'Can I switch from ResMan to Revun?',
        answer: 'Yes. Revun offers guided onboarding and data migration to help you transition from ResMan.',
      },
    ],
  },
  {
    slug: 'payrop',
    name: 'PayProp',
    category: 'PM Software',
    description: 'Automated rental payment platform that handles tenant payments, reconciliation, and owner disbursements.',
    pricingSummary: 'Percentage-based fee on collections',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'Global payments — but no Canadian PM compliance' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Payments and reconciliation only — no PM, leasing, or maintenance' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'No communications hub' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'No maintenance features' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'No brokerage or leasing tools' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'Core strength — real-time reconciliation and disbursements' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'Payment compliance only — no property compliance' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'PM and owner roles for payment reporting only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'Payment reports only — no tenant portal' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Payment data only — no PM or maintenance data' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '1 tool replaced (payment automation only)' },
    ],
    whyRevun: [
      {
        title: 'Complete platform vs. payment tool',
        body: 'PayProp handles rental payments only. Revun is a complete PM platform that includes automated payments alongside maintenance, leasing, and compliance.',
      },
      {
        title: 'Flat pricing, not percentage-based',
        body: 'PayProp charges a percentage of collections. Revun charges flat per-unit pricing that does not increase as your revenue grows.',
      },
      {
        title: 'All PM operations in one place',
        body: 'With Revun, payments are part of a unified workflow including screening, leasing, maintenance, and owner reporting.',
      },
    ],
    tldr: [
      'Revun is a full PM platform; PayProp handles payments only',
      'Revun uses flat per-unit pricing; PayProp charges a percentage of collections',
      'Revun includes maintenance, leasing, and compliance; PayProp has one function',
    ],
    faq: [
      {
        question: 'Is PayProp a property management platform?',
        answer: 'No. PayProp is a rental payment automation tool. It does not include maintenance, leasing, screening, or compliance features. Revun is a full PM platform.',
      },
      {
        question: 'Who should choose PayProp over Revun?',
        answer: 'PayProp is a good choice if you already have a PM system and only need better payment automation. If you want an all-in-one platform, Revun is the better investment.',
      },
      {
        question: 'Can I switch from PayProp to Revun?',
        answer: 'Yes. Revun includes automated rent collection and owner disbursements, so you can consolidate PayProp into your PM platform.',
      },
    ],
  },
  /* ── Canadian Platforms (additional) ────────────────────────────────────── */
  {
    slug: 'rentmoola',
    name: 'RentMoola',
    category: 'Canadian Platforms',
    description: 'Canadian online rent payment platform enabling tenants to pay rent digitally and earn rewards.',
    pricingSummary: 'Transaction-based fees',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'Canadian — but rent payments only' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Rent payments — no PM, leasing, or maintenance' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'No communications hub' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'No maintenance features' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'No brokerage or leasing tools' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'Rent payments core — but transaction fees on every payment' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'Payment compliance only — no property compliance' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Tenant and landlord payment roles only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'Payment portal with rewards — no PM portal' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Payment data only' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '1 tool replaced (rent payments only)' },
    ],
    whyRevun: [
      {
        title: 'Complete platform vs. payment tool',
        body: 'RentMoola handles rent payments. Revun handles payments plus screening, leasing, maintenance, accounting, and compliance.',
      },
      {
        title: 'No per-transaction fees',
        body: 'RentMoola charges transaction fees on every payment. Revun includes payments in the flat per-unit subscription.',
      },
      {
        title: 'Full property operations',
        body: 'Revun covers every aspect of property management. RentMoola covers one step in the workflow.',
      },
    ],
    tldr: [
      'Revun is a full PM platform; RentMoola handles payments only',
      'Revun includes payments in the subscription; RentMoola charges per transaction',
      'Revun includes maintenance, leasing, and compliance; RentMoola has one function',
    ],
    faq: [
      {
        question: 'Is RentMoola a property management platform?',
        answer: 'No. RentMoola is a rent payment platform. It does not include PM features like maintenance, leasing, screening, or compliance.',
      },
      {
        question: 'Does Revun support the same payment methods as RentMoola?',
        answer: 'Yes. Revun supports Interac, ACH, credit card, and other payment methods alongside full PM features.',
      },
      {
        question: 'Can I switch from RentMoola to Revun?',
        answer: 'Yes. Revun includes rent collection natively, so you can consolidate RentMoola into your full PM platform.',
      },
    ],
  },
  {
    slug: 'openroom',
    name: 'Openroom',
    category: 'Canadian Platforms',
    description: 'Canadian rental platform connecting landlords with potential tenants through listings and applications.',
    pricingSummary: 'Free listings + premium features',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'Canadian — but rental listings only' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Rental listings + applications — no PM, maintenance, or accounting' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'In-app messaging for inquiries only' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'No maintenance features' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'Application collection — no brokerage CRM or lease management' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'No payment processing' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'No compliance automation' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Landlord and renter roles only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'Listing search experience only' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Listing and application data only' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '0 tools replaced (listing platform only)' },
    ],
    whyRevun: [
      {
        title: 'Full operations, not just listings',
        body: 'Openroom is a rental listing platform. Revun handles the entire property lifecycle from listing through ongoing management.',
      },
      {
        title: 'One platform for everything',
        body: 'Instead of using Openroom for listings and separate tools for everything else, Revun consolidates all PM functions.',
      },
      {
        title: 'Professional screening and accounting',
        body: 'Openroom collects applications. Revun includes full screening, accounting, and compliance tools.',
      },
    ],
    tldr: [
      'Revun is a full PM platform; Openroom is a listing platform',
      'Revun includes screening, accounting, and maintenance; Openroom does not',
      'Revun consolidates all PM tools; Openroom covers one step in the workflow',
    ],
    faq: [
      {
        question: 'Is Openroom a property management platform?',
        answer: 'No. Openroom is a rental listing and application platform. Revun is a full PM platform that includes listings alongside maintenance, accounting, and compliance.',
      },
      {
        question: 'Can I use Openroom with Revun?',
        answer: 'Yes, but Revun includes listing syndication tools, so you may not need Openroom separately.',
      },
      {
        question: 'Can I switch from Openroom to Revun?',
        answer: 'Yes. Revun includes listing tools plus a complete PM suite. You can consolidate your listing and management tools into one platform.',
      },
    ],
  },
  {
    slug: 'zumper',
    name: 'Zumper',
    category: 'Canadian Platforms',
    description: 'Online rental marketplace for apartment and home listings with instant applications.',
    pricingSummary: 'Free for landlords',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'Available in Canada — but rental marketplace only' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Rental marketplace — no PM, maintenance, or accounting' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'Listing inquiries only — no multi-channel comms' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'No maintenance features' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'Listing + Zumper Pro screening — no brokerage or lease management' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'No payment processing' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'No compliance automation' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Renter and landlord listing roles only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'Apartment search experience — no post-move-in portal' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Listing data only — no operational data' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '0 tools replaced (listing marketplace only)' },
    ],
    whyRevun: [
      {
        title: 'Beyond the marketplace',
        body: 'Zumper helps you find tenants. Revun helps you find tenants and manage the entire property lifecycle after move-in.',
      },
      {
        title: 'Full property management',
        body: 'Zumper is a listing marketplace. Revun includes listings plus maintenance, accounting, compliance, and communications.',
      },
      {
        title: 'One platform, zero gaps',
        body: 'Revun eliminates the need for separate listing, screening, leasing, and management tools.',
      },
    ],
    tldr: [
      'Revun is a full PM platform; Zumper is a rental marketplace',
      'Revun covers the entire property lifecycle; Zumper covers tenant discovery only',
      'Revun includes compliance and accounting; Zumper has no PM features',
    ],
    faq: [
      {
        question: 'Is Zumper a property management platform?',
        answer: 'No. Zumper is a rental marketplace that helps landlords list properties and find tenants. Revun is a full PM platform covering leasing through ongoing management.',
      },
      {
        question: 'Can I use Zumper with Revun?',
        answer: 'Yes. Some landlords use Zumper for additional listing exposure alongside Revun for full property management.',
      },
      {
        question: 'Does Revun include listing syndication?',
        answer: 'Yes. Revun includes listing syndication tools so you can publish to multiple platforms from one place.',
      },
    ],
  },
  {
    slug: 'padmapper',
    name: 'PadMapper',
    category: 'Canadian Platforms',
    description: 'Apartment search platform aggregating rental listings from across the web with map-based search.',
    pricingSummary: 'Free for landlords',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'Available in Canada — but listing aggregator only' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Listing aggregator — no PM, leasing, maintenance, or accounting' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'No communications features' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'No maintenance features' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'No brokerage or leasing tools' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'No payment processing' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'No compliance features' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Tenant search role only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'Map-based apartment search — no PM portal' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Aggregated listing data only' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '0 tools replaced (tenant-facing search tool only)' },
    ],
    whyRevun: [
      {
        title: 'Full platform vs. listing aggregator',
        body: 'PadMapper aggregates listings for tenants. Revun is a complete property operations platform for landlords and managers.',
      },
      {
        title: 'Manage, not just market',
        body: 'PadMapper helps tenants find apartments. Revun helps property managers run their entire operation.',
      },
      {
        title: 'All PM functions included',
        body: 'Revun includes screening, leasing, maintenance, accounting, and compliance. PadMapper has none of these.',
      },
    ],
    tldr: [
      'Revun is a full PM platform; PadMapper is a listing aggregator',
      'Revun covers all PM functions; PadMapper covers tenant search only',
      'Revun serves property managers; PadMapper serves apartment seekers',
    ],
    faq: [
      {
        question: 'Is PadMapper for landlords or tenants?',
        answer: 'PadMapper is primarily a tenant-facing search tool. Revun is built for landlords and property managers who need operational tools.',
      },
      {
        question: 'Can I list on PadMapper through Revun?',
        answer: 'Revun includes listing syndication tools. Check current integrations for PadMapper compatibility, or list separately alongside Revun.',
      },
      {
        question: 'Does PadMapper help with property management?',
        answer: 'No. PadMapper is a listing aggregator only. Revun is a complete property operations platform.',
      },
    ],
  },
  {
    slug: 'rent-panda',
    name: 'Rent Panda',
    category: 'Canadian Platforms',
    description: 'Ontario-focused landlord tools for tenant screening, lease agreements, and landlord education.',
    pricingSummary: 'Pay-per-service (screening, leases)',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'Ontario-focused — not nationwide' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Screening + Ontario lease templates — no PM, maintenance, or accounting' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'No communications hub' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'No maintenance features' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'Ontario lease templates — no brokerage CRM' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'No payment processing' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'Ontario compliance only — no other provinces' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Ontario landlord role only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'No tenant portal' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Screening data only — Ontario-specific' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '0 tools replaced (per-service screening and templates only)' },
    ],
    whyRevun: [
      {
        title: 'Nationwide, not Ontario-only',
        body: 'Rent Panda focuses on Ontario. Revun covers all Canadian provinces with province-specific compliance.',
      },
      {
        title: 'Complete platform vs. point tools',
        body: 'Rent Panda offers screening and leases as separate purchases. Revun includes everything in one subscription.',
      },
      {
        title: 'Full PM operations',
        body: 'Revun handles maintenance, accounting, payments, and communications. Rent Panda offers screening and templates only.',
      },
    ],
    tldr: [
      'Revun covers all provinces; Rent Panda focuses on Ontario',
      'Revun is a full PM platform; Rent Panda offers screening and leases only',
      'Revun uses flat subscription pricing; Rent Panda charges per service',
    ],
    faq: [
      {
        question: 'Does Rent Panda work outside Ontario?',
        answer: 'Rent Panda focuses primarily on Ontario. Revun covers all Canadian provinces with province-specific compliance, lease templates, and notice workflows.',
      },
      {
        question: 'Who should choose Rent Panda over Revun?',
        answer: 'Rent Panda is reasonable for Ontario landlords who only need occasional screening or lease generation. For ongoing property management, Revun is the better investment.',
      },
      {
        question: 'Can I switch from Rent Panda to Revun?',
        answer: 'Yes. Revun includes tenant screening and lease templates for all provinces, plus full PM operations.',
      },
    ],
  },
  /* ── Brokerage/CRM (additional) ────────────────────────────────────────── */
  {
    slug: 'dotloop',
    name: 'Dotloop',
    category: 'Brokerage/CRM',
    description: 'Transaction management platform for real estate brokerages with e-signatures and compliance tracking.',
    pricingSummary: 'From $31.99/month (individual)',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'US-focused — no Canadian compliance' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Transaction management + e-signatures — no PM, maintenance, or accounting' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'No communications hub' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'No maintenance features' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'Transaction management + e-signatures — no CRM or showings' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'No payment processing' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'US transaction compliance — no Canadian compliance' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Agent and broker roles only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'No tenant experience — transaction-focused' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Transaction data only — no PM or operational data' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '1 tool replaced (transaction management only)' },
    ],
    whyRevun: [
      {
        title: 'Beyond transactions',
        body: 'Dotloop ends at closing. Revun covers transactions plus ongoing property management, maintenance, and accounting.',
      },
      {
        title: 'Canadian compliance built in',
        body: 'Dotloop is US-focused. Revun includes provincial compliance for FINTRAC, RECO, and province-specific regulations.',
      },
      {
        title: 'One platform for the full lifecycle',
        body: 'Revun handles transactions, leasing, maintenance, and accounting in one place. No need for Dotloop plus separate PM tools.',
      },
    ],
    tldr: [
      'Revun covers the full property lifecycle; Dotloop covers transactions only',
      'Revun includes Canadian compliance; Dotloop is US-focused',
      'Revun replaces Dotloop plus your PM tools with one platform',
    ],
    faq: [
      {
        question: 'Is Dotloop a property management platform?',
        answer: 'No. Dotloop focuses on transaction management and e-signatures. It does not include PM features like maintenance, accounting, or rent collection.',
      },
      {
        question: 'Who should choose Dotloop over Revun?',
        answer: 'Dotloop is strong for US brokerages that need deep transaction compliance and already have a separate PM system. For Canadian brokerages or those wanting one platform, Revun is the better choice.',
      },
      {
        question: 'Can I switch from Dotloop to Revun?',
        answer: 'Yes. Revun includes transaction management and e-signatures plus full PM operations.',
      },
    ],
  },
  {
    slug: 'skyslope',
    name: 'SkySlope',
    category: 'Brokerage/CRM',
    description: 'Real estate compliance and transaction management platform with audit trails and digital forms.',
    pricingSummary: 'Custom brokerage pricing',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'US-focused — no Canadian compliance' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Compliance + digital forms — no PM, maintenance, or accounting' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'No communications hub' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'No maintenance features' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'Forms + audit trail — no CRM, showings, or offers' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'No payment processing' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'US transaction audit trails — no Canadian regulatory compliance' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Agent and broker compliance roles only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'No tenant experience — compliance-focused' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Compliance/audit data only' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '1 tool replaced (compliance tracking only)' },
    ],
    whyRevun: [
      {
        title: 'Compliance plus operations',
        body: 'SkySlope focuses on transaction compliance. Revun includes compliance inside a full PM platform with maintenance, accounting, and communications.',
      },
      {
        title: 'Canadian regulatory support',
        body: 'SkySlope targets US regulations. Revun covers FINTRAC, RECO, and province-specific compliance for Canadian brokerages.',
      },
      {
        title: 'One subscription, everything included',
        body: 'Revun includes compliance, forms, CRM, and PM in one platform. No need for SkySlope plus separate operational tools.',
      },
    ],
    tldr: [
      'Revun includes compliance inside a full PM platform; SkySlope is compliance-only',
      'Revun covers Canadian regulations; SkySlope is US-focused',
      'Revun replaces SkySlope plus your PM tools with one platform',
    ],
    faq: [
      {
        question: 'Is SkySlope available in Canada?',
        answer: 'SkySlope is primarily US-focused. Revun includes Canadian provincial compliance, FINTRAC, and RECO workflows.',
      },
      {
        question: 'Who should choose SkySlope over Revun?',
        answer: 'SkySlope is excellent for large US brokerages with deep compliance audit needs. For Canadian brokerages or those wanting compliance inside a PM platform, Revun is better.',
      },
      {
        question: 'Can I switch from SkySlope to Revun?',
        answer: 'Yes. Revun includes compliance tracking and audit trails plus full property management operations.',
      },
    ],
  },
  {
    slug: 'brokermint',
    name: 'BrokerMint',
    category: 'Brokerage/CRM',
    description: 'Real estate back office platform for commission tracking, transaction management, and agent accounting.',
    pricingSummary: 'From $99/month per office',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'US-focused — no Canadian compliance' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Back office — commission tracking and agent accounting only' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'No communications hub' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'No maintenance features' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'Commission tracking — no CRM, showings, or lease generation' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'Commission payouts only — no rent or vendor payments' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'US brokerage compliance — no Canadian compliance' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Agent and broker back-office roles only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'No tenant experience — back-office only' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Commission and transaction data only' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '1 tool replaced (brokerage back office only)' },
    ],
    whyRevun: [
      {
        title: 'Front-to-back platform',
        body: 'BrokerMint is back office only. Revun covers front office (CRM, listings) through back office (accounting, compliance) in one platform.',
      },
      {
        title: 'Property management included',
        body: 'BrokerMint does not include PM features. Revun includes maintenance, tenant screening, and rent collection.',
      },
      {
        title: 'Canadian compliance',
        body: 'BrokerMint is US-focused. Revun includes FINTRAC, RECO, and provincial compliance workflows.',
      },
    ],
    tldr: [
      'Revun is a front-to-back platform; BrokerMint is back office only',
      'Revun includes PM features; BrokerMint covers commissions and accounting only',
      'Revun includes Canadian compliance; BrokerMint is US-focused',
    ],
    faq: [
      {
        question: 'Is BrokerMint a property management platform?',
        answer: 'No. BrokerMint focuses on brokerage back office operations like commission tracking. Revun covers both brokerage and property management.',
      },
      {
        question: 'Who should choose BrokerMint over Revun?',
        answer: 'BrokerMint is good for US brokerages that need deep commission tracking and already have separate PM tools. For Canadian brokerages wanting one platform, Revun is better.',
      },
      {
        question: 'Can I switch from BrokerMint to Revun?',
        answer: 'Yes. Revun includes commission management plus full PM operations in one platform.',
      },
    ],
  },
  {
    slug: 'transaction-desk',
    name: 'TransactionDesk',
    category: 'Brokerage/CRM',
    description: 'Digital forms and transaction management platform from Lone Wolf for real estate agents and brokerages.',
    pricingSummary: 'Included with Lone Wolf or per-agent pricing',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'Canadian forms via Lone Wolf — but no PM compliance' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Digital forms + transactions — no PM, maintenance, or accounting' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'No communications hub' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'No maintenance features' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'Digital forms + Authentisign — no CRM or showings' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'No payment processing' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'Canadian forms available — but no automated compliance workflows' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Agent and broker roles only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'No tenant experience — transaction-focused' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Transaction form data only' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '1 tool replaced (digital forms only)' },
    ],
    whyRevun: [
      {
        title: 'Beyond forms and transactions',
        body: 'TransactionDesk manages forms and transactions. Revun manages forms plus ongoing PM operations, maintenance, and accounting.',
      },
      {
        title: 'One platform, not a point tool',
        body: 'TransactionDesk requires additional tools for PM. Revun covers transactions and property management in one subscription.',
      },
      {
        title: 'Deeper compliance automation',
        body: 'TransactionDesk has Canadian forms. Revun automates province-specific compliance workflows, notices, and audit trails.',
      },
    ],
    tldr: [
      'Revun covers transactions plus full PM; TransactionDesk covers forms only',
      'Revun automates compliance workflows; TransactionDesk provides forms',
      'Revun is one platform; TransactionDesk requires additional PM tools',
    ],
    faq: [
      {
        question: 'Is TransactionDesk a property management platform?',
        answer: 'No. TransactionDesk manages digital forms and transactions. It does not include PM features like maintenance, accounting, or rent collection.',
      },
      {
        question: 'Does TransactionDesk work in Canada?',
        answer: 'TransactionDesk has Canadian forms through its Lone Wolf partnership. Revun goes further with automated provincial compliance workflows.',
      },
      {
        question: 'Can I switch from TransactionDesk to Revun?',
        answer: 'Yes. Revun includes digital forms, e-signatures, and transaction management plus full PM operations.',
      },
    ],
  },
  {
    slug: 'wise-agent',
    name: 'Wise Agent',
    category: 'Brokerage/CRM',
    description: 'Real estate CRM with contact management, transaction tracking, and marketing automation for agents.',
    pricingSummary: 'From $49/month per agent',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'US-focused — no Canadian compliance' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'CRM + marketing automation — no PM, maintenance, or accounting' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'Email + some texting — no VoIP or unified comms' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'No maintenance features' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'CRM + basic transaction tracking — no lease generation or showings management' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'No payment processing' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'US-focused — no Canadian compliance' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Agent CRM role only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'No tenant experience — agent CRM only' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Contact and lead data only — no PM or operational data' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '1 tool replaced (agent CRM only)' },
    ],
    whyRevun: [
      {
        title: 'CRM plus property management',
        body: 'Wise Agent is a CRM only. Revun combines CRM with full property management, maintenance, and accounting.',
      },
      {
        title: 'Canadian market support',
        body: 'Wise Agent is US-focused. Revun includes Canadian compliance, Interac, and provincial lease templates.',
      },
      {
        title: 'End-to-end workflow',
        body: 'Wise Agent manages contacts. Revun manages contacts through the entire property lifecycle.',
      },
    ],
    tldr: [
      'Revun combines CRM with full PM; Wise Agent is CRM only',
      'Revun includes Canadian compliance; Wise Agent is US-focused',
      'Revun covers the full property lifecycle; Wise Agent covers lead management',
    ],
    faq: [
      {
        question: 'Is Wise Agent a property management platform?',
        answer: 'No. Wise Agent is a real estate CRM. It does not include PM features like maintenance, accounting, or rent collection.',
      },
      {
        question: 'Who should choose Wise Agent over Revun?',
        answer: 'Wise Agent is strong for US agents who need deep drip campaigns and landing pages. For agents who also manage properties, Revun covers both.',
      },
      {
        question: 'Can I switch from Wise Agent to Revun?',
        answer: 'Yes. Revun includes CRM plus full PM operations, so you can consolidate Wise Agent into one platform.',
      },
    ],
  },
  {
    slug: 'top-producer',
    name: 'Top Producer',
    category: 'Brokerage/CRM',
    description: 'Real estate CRM and lead management platform with MLS integration and automated follow-up.',
    pricingSummary: 'From $129/month',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'US + some Canadian MLS — but no PM compliance' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'CRM + lead management — no PM, maintenance, or accounting' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'Email + phone — no unified comms hub' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'No maintenance features' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'Lead management + MLS integration — no lease generation or PM workflows' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'No payment processing' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'No property compliance — CRM-only' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Agent CRM role only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'No tenant experience — lead-focused' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Lead and MLS data only' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '1 tool replaced (CRM only)' },
    ],
    whyRevun: [
      {
        title: 'CRM plus operations',
        body: 'Top Producer is a CRM. Revun combines CRM with property management, maintenance, and accounting.',
      },
      {
        title: 'From lead to long-term management',
        body: 'Top Producer helps you close deals. Revun helps you close deals and manage properties long-term.',
      },
      {
        title: 'Better value',
        body: 'Top Producer starts at $129/month for CRM only. Revun includes CRM plus full PM from $1/day per unit.',
      },
    ],
    tldr: [
      'Revun combines CRM with full PM; Top Producer is CRM only',
      'Revun covers lead to long-term management; Top Producer covers lead to close',
      'Revun offers better value with PM included; Top Producer is $129/month for CRM',
    ],
    faq: [
      {
        question: 'Is Top Producer a property management platform?',
        answer: 'No. Top Producer is a real estate CRM focused on lead management and deal closing. Revun combines CRM with full PM.',
      },
      {
        question: 'Who should choose Top Producer over Revun?',
        answer: 'Top Producer is strong for high-volume agents who need deep MLS integration and automated follow-up. For agents who also manage properties, Revun covers both.',
      },
      {
        question: 'Can I switch from Top Producer to Revun?',
        answer: 'Yes. Revun includes CRM and lead management plus full property management in one platform.',
      },
    ],
  },
  {
    slug: 'boomtown',
    name: 'BoomTown',
    category: 'Brokerage/CRM',
    description: 'Real estate lead generation and CRM platform with IDX websites and predictive analytics.',
    pricingSummary: 'From $1,000+/month',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'US-focused — no Canadian support' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Lead generation + CRM — no PM, maintenance, or accounting' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'Email + text — no VoIP or unified comms' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'No maintenance features' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'IDX websites + lead gen CRM — no lease or PM workflows' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'No payment processing' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'No property compliance' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Agent and team lead roles only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'No tenant experience — buyer/seller lead focus' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Lead and advertising data only' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '1 tool replaced (lead gen only — $1,000+/month)' },
    ],
    whyRevun: [
      {
        title: 'Lead gen plus property management',
        body: 'BoomTown generates leads. Revun manages leads plus the entire property lifecycle after conversion.',
      },
      {
        title: 'Fraction of the cost',
        body: 'BoomTown costs $1,000+/month for lead generation. Revun includes CRM plus full PM from $1/day per unit.',
      },
      {
        title: 'Canadian market focus',
        body: 'BoomTown targets US markets. Revun is built for the Canadian market with provincial compliance.',
      },
    ],
    tldr: [
      'Revun includes CRM plus full PM; BoomTown is lead generation only',
      'Revun costs a fraction of BoomTown; BoomTown starts at $1,000+/month',
      'Revun is Canadian-first; BoomTown is US-focused',
    ],
    faq: [
      {
        question: 'Is BoomTown worth the cost?',
        answer: 'BoomTown is effective for high-volume lead generation but costs $1,000+/month. Revun includes CRM and PM from $1/day per unit. The right choice depends on whether you need lead gen or operational tools.',
      },
      {
        question: 'Who should choose BoomTown over Revun?',
        answer: 'BoomTown is ideal for teams spending heavily on lead generation who already have PM tools. For those wanting one platform for leads and operations, Revun is better.',
      },
      {
        question: 'Can I use BoomTown with Revun?',
        answer: 'Yes. Some teams use BoomTown for lead gen and Revun for property management. Revun also includes its own CRM if you want to consolidate.',
      },
    ],
  },
  {
    slug: 'real-geeks',
    name: 'Real Geeks',
    category: 'Brokerage/CRM',
    description: 'Real estate agent websites and CRM platform with IDX integration and lead management tools.',
    pricingSummary: 'From $299/month',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'US-focused — no Canadian support' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Agent websites + CRM — no PM, maintenance, or accounting' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'Email + text — no VoIP or unified comms' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'No maintenance features' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'IDX websites + CRM — no lease generation or PM workflows' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'No payment processing' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'No property compliance' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Agent website role only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'No tenant experience — buyer/seller lead focus' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Website lead data only' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '1 tool replaced (agent website + basic CRM)' },
    ],
    whyRevun: [
      {
        title: 'Operations, not just marketing',
        body: 'Real Geeks builds agent websites. Revun manages properties and operations after the marketing brings in leads.',
      },
      {
        title: 'Property management included',
        body: 'Real Geeks does not include PM. Revun covers CRM, maintenance, accounting, and compliance in one platform.',
      },
      {
        title: 'Canadian compliance',
        body: 'Real Geeks is US-focused. Revun includes provincial compliance, FINTRAC, and RECO workflows.',
      },
    ],
    tldr: [
      'Revun is a PM platform with CRM; Real Geeks builds agent websites',
      'Revun includes property management; Real Geeks does not',
      'Revun includes Canadian compliance; Real Geeks is US-focused',
    ],
    faq: [
      {
        question: 'Does Real Geeks include property management?',
        answer: 'No. Real Geeks focuses on agent websites and lead generation. Revun focuses on property management with built-in CRM.',
      },
      {
        question: 'Who should choose Real Geeks over Revun?',
        answer: 'Real Geeks is ideal for agents who need IDX websites for lead generation. For agents who manage properties, Revun is the better platform.',
      },
      {
        question: 'Can I use Real Geeks with Revun?',
        answer: 'Yes. Use Real Geeks for your agent website and Revun for property management and CRM.',
      },
    ],
  },
  {
    slug: 'cinc',
    name: 'CINC',
    category: 'Brokerage/CRM',
    description: 'Real estate lead generation platform with AI-powered CRM, IDX websites, and advertising management.',
    pricingSummary: 'From $899/month',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'US-focused — no Canadian support' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'AI lead gen + ad management — no PM, maintenance, or accounting' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'AI text + email — no VoIP or unified comms' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'No maintenance features' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'AI CRM + lead scoring — no lease or PM workflows' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'No payment processing' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'No property compliance' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Agent and team lead roles only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'No tenant experience — lead gen focus' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Lead and advertising data only' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '1 tool replaced (lead gen only — $899+/month)' },
    ],
    whyRevun: [
      {
        title: 'PM platform, not lead gen',
        body: 'CINC focuses on lead generation and ad management. Revun focuses on property management with built-in CRM.',
      },
      {
        title: 'Dramatically lower cost',
        body: 'CINC starts at $899/month for lead generation. Revun includes CRM plus full PM from $1/day per unit.',
      },
      {
        title: 'Canadian market',
        body: 'CINC targets US real estate markets. Revun is built for Canada with provincial compliance.',
      },
    ],
    tldr: [
      'Revun is a PM platform with CRM; CINC is a lead generation platform',
      'Revun starts at $1/day per unit; CINC starts at $899/month',
      'Revun is Canadian-first; CINC is US-focused',
    ],
    faq: [
      {
        question: 'Is CINC a property management platform?',
        answer: 'No. CINC is a lead generation and advertising platform for real estate agents. Revun is a property operations platform with CRM.',
      },
      {
        question: 'Who should choose CINC over Revun?',
        answer: 'CINC is ideal for teams spending heavily on real estate advertising. For property management, Revun is the better tool.',
      },
      {
        question: 'Can I use CINC with Revun?',
        answer: 'Yes. Use CINC for lead generation and Revun for property management. They serve different purposes.',
      },
    ],
  },
  {
    slug: 'liondesk',
    name: 'LionDesk',
    category: 'Brokerage/CRM',
    description: 'Real estate CRM with video email, texting, and lead management for agents and teams.',
    pricingSummary: 'From $25/month',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'US-focused — no Canadian compliance' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'CRM + video email — no PM, maintenance, or accounting' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'Email, text, video — no VoIP or property-based routing' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'No maintenance features' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'Contact CRM — no lease generation, showings, or PM workflows' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'No payment processing' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'No property compliance' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Agent CRM role only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'No tenant experience — agent-focused' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Contact data only — no PM or operational data' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '1 tool replaced (agent CRM only)' },
    ],
    whyRevun: [
      {
        title: 'CRM plus property management',
        body: 'LionDesk is a CRM. Revun combines CRM with full property management, maintenance, and accounting.',
      },
      {
        title: 'Property operations included',
        body: 'LionDesk has no PM features. Revun includes rent collection, maintenance, compliance, and owner portals.',
      },
      {
        title: 'Canadian compliance',
        body: 'LionDesk is US-focused. Revun includes provincial compliance for the Canadian market.',
      },
    ],
    tldr: [
      'Revun combines CRM with full PM; LionDesk is CRM only',
      'Revun includes property operations; LionDesk has no PM features',
      'Revun is Canadian-first; LionDesk is US-focused',
    ],
    faq: [
      {
        question: 'Is LionDesk a property management platform?',
        answer: 'No. LionDesk is a real estate CRM focused on communication and lead management. Revun combines CRM with full PM.',
      },
      {
        question: 'Who should choose LionDesk over Revun?',
        answer: 'LionDesk is good for agents who want video email and texting features. For agents who also manage properties, Revun covers both CRM and PM.',
      },
      {
        question: 'Can I switch from LionDesk to Revun?',
        answer: 'Yes. Revun includes CRM with multi-channel communications plus full property management.',
      },
    ],
  },
  /* ── Maintenance (additional) ──────────────────────────────────────────── */
  {
    slug: 'happyco',
    name: 'HappyCo',
    category: 'Maintenance',
    description: 'Property inspections and operations platform for multifamily operators with mobile-first tools.',
    pricingSummary: 'Custom pricing per property',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'US-focused — no Canadian compliance' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Inspections + turn management — no PM, leasing, or accounting' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'No communications hub' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'Inspections and turn management — no vendor dispatch or ongoing maintenance' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'No brokerage or leasing tools' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'No payment processing' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'Inspection compliance only — no property compliance' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Inspector and operations roles only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'No tenant portal' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Inspection data only — no PM or financial data' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '1 tool replaced (inspections only)' },
    ],
    whyRevun: [
      {
        title: 'Inspections inside a full PM platform',
        body: 'HappyCo focuses on inspections and turn management. Revun includes inspections alongside maintenance, accounting, and compliance.',
      },
      {
        title: 'One platform for everything',
        body: 'HappyCo requires separate PM tools. Revun covers inspections, maintenance, leasing, and accounting in one subscription.',
      },
      {
        title: 'Canadian compliance',
        body: 'HappyCo is US-focused. Revun includes provincial compliance for Canadian operators.',
      },
    ],
    tldr: [
      'Revun is a full PM platform with inspections; HappyCo is inspections-only',
      'Revun includes accounting and compliance; HappyCo requires separate tools',
      'Revun covers Canadian compliance; HappyCo is US-focused',
    ],
    faq: [
      {
        question: 'Is HappyCo a property management platform?',
        answer: 'No. HappyCo focuses on inspections and turn management. Revun is a full PM platform that includes inspection workflows.',
      },
      {
        question: 'Who should choose HappyCo over Revun?',
        answer: 'HappyCo is strong for large US multifamily operators who need deep inspection analytics and already have a PM system. For Canadian operators or those wanting one platform, Revun is better.',
      },
      {
        question: 'Can I switch from HappyCo to Revun?',
        answer: 'Yes. Revun includes inspection workflows plus full property management.',
      },
    ],
  },
  {
    slug: 'upkeep',
    name: 'UpKeep',
    category: 'Maintenance',
    description: 'Maintenance management platform with work order tracking, asset management, and mobile-first tools.',
    pricingSummary: 'From $45/user/month',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'Not property-specific — no Canadian PM compliance' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Work orders + asset management — no PM, leasing, or accounting' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'No communications hub' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'Strong work orders + asset tracking — but general-purpose, not property-specific' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'No brokerage or leasing tools' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'No payment processing' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'No property compliance — general maintenance compliance' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Maintenance technician roles only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'No tenant portal — requester interface only' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Maintenance data only — no PM or financial data' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '1 tool replaced (maintenance management only)' },
    ],
    whyRevun: [
      {
        title: 'PM-integrated maintenance',
        body: 'UpKeep is a standalone maintenance tool. Revun integrates maintenance into the full property management workflow.',
      },
      {
        title: 'Property management included',
        body: 'UpKeep does not include PM features. Revun includes rent collection, screening, leasing, and compliance.',
      },
      {
        title: 'Per-unit vs. per-user pricing',
        body: 'UpKeep charges per user. Revun charges per unit, which scales better as your team grows.',
      },
    ],
    tldr: [
      'Revun integrates maintenance into full PM; UpKeep is maintenance-only',
      'Revun includes PM features; UpKeep requires separate tools',
      'Revun charges per unit; UpKeep charges per user',
    ],
    faq: [
      {
        question: 'Is UpKeep designed for property management?',
        answer: 'UpKeep is a general maintenance management tool used across industries. Revun is purpose-built for property management with maintenance integrated.',
      },
      {
        question: 'Who should choose UpKeep over Revun?',
        answer: 'UpKeep is strong for facility management teams who need deep asset tracking. For property managers, Revun integrates maintenance with PM operations.',
      },
      {
        question: 'Can I switch from UpKeep to Revun?',
        answer: 'Yes. Revun includes maintenance management plus full PM operations in one platform.',
      },
    ],
  },
  {
    slug: 'housecall-pro',
    name: 'Housecall Pro',
    category: 'Maintenance',
    description: 'Field service management software for home service contractors with scheduling, dispatch, and invoicing.',
    pricingSummary: 'From $65/month',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'Not property-specific — built for contractors' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Field service for contractors — no PM, leasing, or compliance' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'Customer notifications only — no multi-channel comms' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'Contractor scheduling + dispatch — from the contractor side, not PM side' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'No brokerage or leasing tools' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'Job invoicing — no rent or owner payments' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'No property compliance — contractor licensing only' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Contractor and technician roles only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'No tenant experience — homeowner customer interface' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Job and invoice data only — no property context' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '0 tools replaced for PMs (contractor tool, not PM tool)' },
    ],
    whyRevun: [
      {
        title: 'Built for property managers, not contractors',
        body: 'Housecall Pro is built for contractors. Revun is built for property managers who hire contractors.',
      },
      {
        title: 'Full PM platform included',
        body: 'Housecall Pro handles field service only. Revun includes leasing, accounting, screening, and compliance.',
      },
      {
        title: 'Vendor management from the PM side',
        body: 'Revun lets you dispatch, track, and pay vendors within your property management workflow.',
      },
    ],
    tldr: [
      'Revun is for property managers; Housecall Pro is for contractors',
      'Revun includes full PM; Housecall Pro is field service only',
      'Revun manages vendors from the PM perspective; Housecall Pro manages jobs from the contractor perspective',
    ],
    faq: [
      {
        question: 'Is Housecall Pro for property managers?',
        answer: 'No. Housecall Pro is designed for home service contractors. Revun is designed for property managers who coordinate with contractors.',
      },
      {
        question: 'Who should choose Housecall Pro over Revun?',
        answer: 'Housecall Pro is right for contractors and maintenance companies. For property managers who dispatch and manage vendors, Revun is the better tool.',
      },
      {
        question: 'Can my vendors use Housecall Pro while I use Revun?',
        answer: 'Yes. Your vendors can use Housecall Pro for their business while you use Revun for property management and vendor coordination.',
      },
    ],
  },
  {
    slug: 'maintainx',
    name: 'MaintainX',
    category: 'Maintenance',
    description: 'Work order and procedure management platform for maintenance teams with mobile-first design.',
    pricingSummary: 'Free plan + paid from $16/user/month',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'Not property-specific — general maintenance platform' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Work orders + SOPs — no PM, leasing, or accounting' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'In-app messaging — no VoIP or multi-channel comms' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'Strong work orders + procedures — but cross-industry, not property-specific' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'No brokerage or leasing tools' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'No payment processing' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'No property compliance — industrial SOP compliance' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Maintenance team roles only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'No tenant portal' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Work order data only — no PM or financial data' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '1 tool replaced (work orders only — per-user pricing)' },
    ],
    whyRevun: [
      {
        title: 'Property-focused maintenance',
        body: 'MaintainX is a general work order tool. Revun integrates maintenance into property management with tenant and owner context.',
      },
      {
        title: 'Full PM operations',
        body: 'MaintainX requires separate PM tools. Revun includes maintenance, leasing, accounting, and compliance in one platform.',
      },
      {
        title: 'Per-unit pricing',
        body: 'MaintainX charges per user. Revun charges per unit, which is more predictable as your team grows.',
      },
    ],
    tldr: [
      'Revun integrates maintenance into PM; MaintainX is standalone work orders',
      'Revun includes full PM operations; MaintainX requires additional tools',
      'Revun charges per unit; MaintainX charges per user',
    ],
    faq: [
      {
        question: 'Is MaintainX designed for property management?',
        answer: 'MaintainX is a general maintenance platform used across industries. Revun is purpose-built for property management with maintenance integrated.',
      },
      {
        question: 'Who should choose MaintainX over Revun?',
        answer: 'MaintainX is great for maintenance teams who need deep SOP management across industries. For property managers, Revun integrates maintenance with PM.',
      },
      {
        question: 'Can I switch from MaintainX to Revun?',
        answer: 'Yes. Revun includes work order management plus full PM operations.',
      },
    ],
  },
  {
    slug: 'fieldpulse',
    name: 'FieldPulse',
    category: 'Maintenance',
    description: 'Field service management platform for contractors with scheduling, invoicing, and customer management.',
    pricingSummary: 'From $99/month',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'Not property-specific — built for contractors' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Field service management — no PM, leasing, or compliance' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'Customer notifications only' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'Contractor scheduling + invoicing — from contractor side, not PM side' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'No brokerage or leasing tools' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'Job payment collection — no rent or owner payments' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'No property compliance' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Contractor and technician roles only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'No tenant experience — customer interface for contractors' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Job data only — no property context' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '0 tools replaced for PMs (contractor tool, not PM tool)' },
    ],
    whyRevun: [
      {
        title: 'For property managers, not contractors',
        body: 'FieldPulse is built for service contractors. Revun is built for property managers who coordinate maintenance.',
      },
      {
        title: 'Full PM platform',
        body: 'FieldPulse handles field service. Revun handles field service coordination plus leasing, accounting, and compliance.',
      },
      {
        title: 'Vendor management perspective',
        body: 'Revun manages vendors from the property manager side, including dispatch, tracking, and automated payments.',
      },
    ],
    tldr: [
      'Revun is for property managers; FieldPulse is for contractors',
      'Revun includes full PM; FieldPulse is field service only',
      'Revun coordinates vendors from PM side; FieldPulse manages jobs from contractor side',
    ],
    faq: [
      {
        question: 'Is FieldPulse for property managers?',
        answer: 'No. FieldPulse is designed for field service contractors. Revun is designed for property managers.',
      },
      {
        question: 'Who should choose FieldPulse over Revun?',
        answer: 'FieldPulse is right for maintenance contractors. Property managers should use Revun for vendor coordination within their PM workflow.',
      },
      {
        question: 'Can I switch from FieldPulse to Revun?',
        answer: 'If you are a property manager using FieldPulse, yes. Revun includes maintenance coordination plus full PM.',
      },
    ],
  },
  {
    slug: 'appwork',
    name: 'AppWork',
    category: 'Maintenance',
    description: 'Property inspection and maintenance app for multifamily operators with photo-based workflows.',
    pricingSummary: 'Custom pricing',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'US-focused — no Canadian compliance' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Inspections + photo documentation — no PM, leasing, or accounting' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'No communications hub' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'Inspections + before/after photos — no vendor dispatch or ongoing work orders' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'No brokerage or leasing tools' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'No payment processing' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'Inspection documentation only — no property compliance' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Inspector roles only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'No tenant portal' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Inspection photo data only' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '1 tool replaced (inspections only)' },
    ],
    whyRevun: [
      {
        title: 'Inspections inside full PM',
        body: 'AppWork is inspection-focused. Revun includes inspections alongside maintenance, leasing, accounting, and compliance.',
      },
      {
        title: 'One platform, not a point tool',
        body: 'AppWork requires separate PM tools. Revun consolidates inspections with all PM operations.',
      },
      {
        title: 'Canadian compliance',
        body: 'AppWork is US-focused. Revun includes provincial compliance for Canadian operators.',
      },
    ],
    tldr: [
      'Revun is a full PM platform with inspections; AppWork is inspections only',
      'Revun includes accounting and compliance; AppWork requires separate tools',
      'Revun covers Canadian compliance; AppWork is US-focused',
    ],
    faq: [
      {
        question: 'Is AppWork a property management platform?',
        answer: 'No. AppWork focuses on property inspections and maintenance documentation. Revun is a full PM platform.',
      },
      {
        question: 'Who should choose AppWork over Revun?',
        answer: 'AppWork is strong for operators who need deep inspection analytics alongside an existing PM system. For one-platform operations, Revun is better.',
      },
      {
        question: 'Can I switch from AppWork to Revun?',
        answer: 'Yes. Revun includes inspection workflows plus full PM operations.',
      },
    ],
  },
  {
    slug: 'building-engines',
    name: 'Building Engines',
    category: 'Maintenance',
    description: 'Building operations platform for commercial property teams with work orders, inspections, and tenant experience tools.',
    pricingSummary: 'Custom enterprise pricing',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'US-focused — no Canadian compliance' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Building operations — no leasing, accounting, or brokerage' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'Tenant request portal — no multi-channel comms' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'Work orders + inspections — commercial focus only' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'No brokerage or leasing tools' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'No payment processing' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'Building operations compliance — no residential property compliance' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Building ops and commercial tenant roles only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'Commercial tenant experience — no residential portal' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Building ops data only — no financial or leasing data' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '1 tool replaced (building operations only — commercial focus)' },
    ],
    whyRevun: [
      {
        title: 'Full PM, not just building ops',
        body: 'Building Engines focuses on building operations. Revun covers building ops plus leasing, accounting, and compliance.',
      },
      {
        title: 'Residential and commercial',
        body: 'Building Engines targets commercial. Revun handles residential, commercial, and mixed-use properties.',
      },
      {
        title: 'Clear pricing',
        body: 'Building Engines uses custom enterprise pricing. Revun offers clear per-unit pricing.',
      },
    ],
    tldr: [
      'Revun is a full PM platform; Building Engines focuses on building operations',
      'Revun covers residential and commercial; Building Engines is commercial-only',
      'Revun has clear pricing; Building Engines uses enterprise quotes',
    ],
    faq: [
      {
        question: 'Is Building Engines a property management platform?',
        answer: 'Building Engines focuses on building operations for commercial properties. Revun is a full PM platform covering leasing, accounting, and compliance.',
      },
      {
        question: 'Who should choose Building Engines over Revun?',
        answer: 'Building Engines is strong for large commercial operators who need deep building ops tools. For mixed-use or residential, Revun is the better fit.',
      },
      {
        question: 'Can I switch from Building Engines to Revun?',
        answer: 'Yes. Revun includes building operations plus full PM for residential and commercial properties.',
      },
    ],
  },
  /* ── Communications (additional) ───────────────────────────────────────── */
  {
    slug: 'aircall',
    name: 'Aircall',
    category: 'Communications',
    description: 'Cloud phone system for teams with call routing, analytics, and CRM integrations.',
    pricingSummary: 'From $30/user/month',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'Not property-specific — general cloud phone system' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Phone system — no PM, leasing, maintenance, or accounting' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'Phone + some SMS — no email, in-app, or property context' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'No maintenance features' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'No brokerage or leasing tools' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'No payment processing' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'No property compliance' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Call agent roles only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'No tenant experience — phone system only' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Call log data only — no PM or property context' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '1 tool replaced (phone system only)' },
    ],
    whyRevun: [
      {
        title: 'Calling inside your PM workflow',
        body: 'Aircall is a standalone phone system. Revun embeds calling into your property management workflow with tenant and owner context.',
      },
      {
        title: 'No separate phone subscription',
        body: 'With Revun, communications are included in your PM subscription. No need for a separate Aircall account.',
      },
      {
        title: 'Full PM platform',
        body: 'Aircall handles phone calls. Revun handles calls plus maintenance, leasing, accounting, and compliance.',
      },
    ],
    tldr: [
      'Revun includes calling in the PM platform; Aircall is a standalone phone system',
      'Revun includes full PM; Aircall handles calls only',
      'Revun eliminates the need for a separate phone subscription',
    ],
    faq: [
      {
        question: 'Does Revun include phone calling?',
        answer: 'Yes. Revun includes built-in VoIP calling as part of the communications hub alongside email, SMS, and in-app messaging.',
      },
      {
        question: 'Who should choose Aircall over Revun?',
        answer: 'Aircall is excellent for teams that need advanced call center features. For property managers, Revun includes calling inside the PM workflow.',
      },
      {
        question: 'Can I use Aircall with Revun?',
        answer: 'You can, but Revun includes built-in calling so it may not be necessary.',
      },
    ],
  },
  {
    slug: 'zoom-phone',
    name: 'Zoom Phone',
    category: 'Communications',
    description: 'Business phone system from Zoom with cloud PBX, call routing, and video integration.',
    pricingSummary: 'From $13/user/month',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'Not property-specific — general business phone' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Business phone — no PM, leasing, maintenance, or accounting' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'Phone + SMS + video — but no property context or unified thread' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'No maintenance features' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'No brokerage or leasing tools' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'No payment processing' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'No property compliance' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Phone user roles only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'No tenant experience — business phone only' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Call and meeting data only — no property context' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '1 tool replaced (business phone only)' },
    ],
    whyRevun: [
      {
        title: 'Communications in context',
        body: 'Zoom Phone is a generic phone system. Revun provides calling within your property management workflow with full tenant and owner context.',
      },
      {
        title: 'All PM features included',
        body: 'Zoom Phone handles calls only. Revun handles calls plus maintenance, leasing, accounting, and compliance.',
      },
      {
        title: 'One subscription',
        body: 'Revun includes calling in the PM subscription. No separate Zoom Phone account needed.',
      },
    ],
    tldr: [
      'Revun includes calling in the PM platform; Zoom Phone is standalone',
      'Revun provides property context for calls; Zoom Phone is generic',
      'Revun includes full PM; Zoom Phone is phone-only',
    ],
    faq: [
      {
        question: 'Does Revun replace Zoom Phone?',
        answer: 'For property management communications, yes. Revun includes built-in VoIP calling. You may still want Zoom for video meetings.',
      },
      {
        question: 'Who should choose Zoom Phone over Revun?',
        answer: 'Zoom Phone is ideal for teams that need deep video conferencing integration. For PM-focused calling, Revun is more efficient.',
      },
      {
        question: 'Can I use Zoom Phone with Revun?',
        answer: 'Yes. Some teams use Zoom for video meetings and Revun for PM-integrated calling and communications.',
      },
    ],
  },
  {
    slug: 'intercom',
    name: 'Intercom',
    category: 'Communications',
    description: 'Customer messaging platform with live chat, chatbots, and help center for support teams.',
    pricingSummary: 'From $39/seat/month',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'Not property-specific — general messaging platform' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Messaging + chatbots — no PM, leasing, maintenance, or accounting' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'Chat, email, social — but no property context or VoIP' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'No maintenance features' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'No brokerage or leasing tools' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'No payment processing' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'No property compliance' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Support agent roles only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'Chat widget — no PM-specific tenant portal' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Conversation data only — no property or operational context' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '1 tool replaced (messaging only)' },
    ],
    whyRevun: [
      {
        title: 'PM-native messaging',
        body: 'Intercom is a generic messaging platform. Revun builds tenant and owner communications into your property management workflow.',
      },
      {
        title: 'Full PM included',
        body: 'Intercom handles messaging only. Revun handles messaging plus maintenance, leasing, accounting, and compliance.',
      },
      {
        title: 'Property context in every conversation',
        body: 'Revun connects every message to the relevant property, unit, lease, and maintenance history.',
      },
    ],
    tldr: [
      'Revun includes messaging in the PM platform; Intercom is standalone messaging',
      'Revun connects messages to property context; Intercom is generic',
      'Revun includes full PM; Intercom handles communications only',
    ],
    faq: [
      {
        question: 'Does Revun include live chat?',
        answer: 'Revun includes in-app messaging, email, SMS, and calling as part of the communications hub. Every conversation is connected to property context.',
      },
      {
        question: 'Who should choose Intercom over Revun?',
        answer: 'Intercom is excellent for SaaS companies and e-commerce. For property management communications, Revun provides better context and workflow integration.',
      },
      {
        question: 'Can I use Intercom with Revun?',
        answer: 'You can, but Revun includes built-in communications that are purpose-built for property management.',
      },
    ],
  },
  {
    slug: 'zendesk',
    name: 'Zendesk',
    category: 'Communications',
    description: 'Customer service software with ticketing, help center, and multi-channel support for service teams.',
    pricingSummary: 'From $55/agent/month',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'Not property-specific — general support platform' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Ticketing + support — no PM, leasing, maintenance, or accounting' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'Email, chat, phone, social — but no property context' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'No maintenance features' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'No brokerage or leasing tools' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'No payment processing' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'No property compliance — general SLA compliance' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Support agent roles only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'Help center — not property-specific' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Ticket data only — no property or financial data' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '1 tool replaced (support ticketing only)' },
    ],
    whyRevun: [
      {
        title: 'Property-native ticketing',
        body: 'Zendesk is generic customer service. Revun connects every request to properties, units, leases, and maintenance history.',
      },
      {
        title: 'Full PM operations',
        body: 'Zendesk handles tickets. Revun handles tickets plus maintenance dispatch, accounting, leasing, and compliance.',
      },
      {
        title: 'Built for property management',
        body: 'Revun ticketing is designed for tenant requests, maintenance coordination, and owner communications.',
      },
    ],
    tldr: [
      'Revun includes ticketing in the PM platform; Zendesk is generic customer service',
      'Revun connects tickets to property context; Zendesk is industry-agnostic',
      'Revun includes full PM; Zendesk handles support only',
    ],
    faq: [
      {
        question: 'Does Revun replace Zendesk?',
        answer: 'For property management communications and ticketing, yes. Revun includes request tracking connected to your PM operations.',
      },
      {
        question: 'Who should choose Zendesk over Revun?',
        answer: 'Zendesk is ideal for large support teams across industries. For property management, Revun provides better workflow integration.',
      },
      {
        question: 'Can I use Zendesk with Revun?',
        answer: 'You can, but Revun includes built-in communications and ticketing purpose-built for property management.',
      },
    ],
  },
  {
    slug: 'freshdesk',
    name: 'Freshdesk',
    category: 'Communications',
    description: 'Help desk software with ticketing, automation, and multi-channel support for customer service teams.',
    pricingSummary: 'Free plan + paid from $15/agent/month',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'Not property-specific — general help desk' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Help desk + ticketing — no PM, leasing, maintenance, or accounting' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'Email, chat, phone — but no property context' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'No maintenance features' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'No brokerage or leasing tools' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'No payment processing' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'No property compliance — general SLA compliance' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Support agent roles only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'Self-service knowledge base — not property-specific' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Ticket data only — no property or financial data' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '1 tool replaced (help desk only)' },
    ],
    whyRevun: [
      {
        title: 'PM-specific help desk',
        body: 'Freshdesk is a generic help desk. Revun provides property-specific request tracking connected to units, leases, and maintenance.',
      },
      {
        title: 'Full PM platform',
        body: 'Freshdesk handles tickets. Revun handles tickets plus the full property management lifecycle.',
      },
      {
        title: 'One platform for everything',
        body: 'Revun eliminates the need for Freshdesk plus separate PM tools. Everything lives in one subscription.',
      },
    ],
    tldr: [
      'Revun includes help desk in the PM platform; Freshdesk is standalone',
      'Revun connects tickets to PM context; Freshdesk is industry-agnostic',
      'Revun replaces Freshdesk plus PM tools with one platform',
    ],
    faq: [
      {
        question: 'Does Revun include help desk features?',
        answer: 'Yes. Revun includes request tracking, ticketing, and multi-channel communications connected to your PM operations.',
      },
      {
        question: 'Who should choose Freshdesk over Revun?',
        answer: 'Freshdesk is excellent for general customer support teams. For property management, Revun provides better context and workflow integration.',
      },
      {
        question: 'Can I switch from Freshdesk to Revun?',
        answer: 'Yes. Revun includes help desk features plus full PM operations in one platform.',
      },
    ],
  },
  /* ── Screening (additional) ────────────────────────────────────────────── */
  {
    slug: 'sure',
    name: 'Sure',
    category: 'Screening',
    description: 'Rent guarantee and insurance platform protecting landlords from missed rent payments.',
    pricingSummary: 'Premium-based (% of rent)',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'US-focused — rent guarantee insurance' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Rent guarantee only — no PM, leasing, or maintenance' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'No communications hub' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'No maintenance features' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'No brokerage or leasing tools' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'Guarantee payouts only — no rent collection' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'Insurance compliance only — no property compliance' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Landlord and insurer roles only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'No tenant portal — claims process only' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Insurance policy data only' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '0 tools replaced (insurance product, not operational tool)' },
    ],
    whyRevun: [
      {
        title: 'Full platform, not just insurance',
        body: 'Sure provides rent guarantee insurance. Revun provides a full PM platform with rent guarantee coming soon as an integrated feature.',
      },
      {
        title: 'Screening included',
        body: 'Sure uses screening for underwriting only. Revun includes full tenant screening as part of your leasing pipeline.',
      },
      {
        title: 'All PM operations',
        body: 'Revun handles maintenance, accounting, communications, and compliance. Sure covers one financial product.',
      },
    ],
    tldr: [
      'Revun is a full PM platform; Sure offers rent guarantee only',
      'Revun includes screening and leasing; Sure uses screening for underwriting',
      'Revun covers all PM operations; Sure covers one financial product',
    ],
    faq: [
      {
        question: 'Does Revun offer rent guarantee?',
        answer: 'Revun is building rent guarantee into the platform (coming soon). In the meantime, you can use Sure alongside Revun.',
      },
      {
        question: 'Who should choose Sure over Revun?',
        answer: 'Sure is right if you only need rent guarantee and already have a PM system. For full PM plus upcoming guarantee, choose Revun.',
      },
      {
        question: 'Can I use Sure with Revun?',
        answer: 'Yes. You can use Sure for rent guarantee while Revun handles property management. As Revun adds guarantee, you can consolidate.',
      },
    ],
  },
  {
    slug: 'the-guarantors',
    name: 'TheGuarantors',
    category: 'Screening',
    description: 'Lease guarantee and renters insurance platform helping tenants qualify for apartments they could not otherwise afford.',
    pricingSummary: 'Premium-based (tenant-paid)',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'US-focused — lease guarantee product' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Lease guarantee + renters insurance — no PM or operations' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'No communications hub' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'No maintenance features' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'No brokerage or leasing tools — guarantee product only' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'No rent collection or payment processing' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'Insurance compliance only — no property compliance' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Applicant and landlord roles only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'Guarantee application only — no ongoing portal' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Guarantee underwriting data only' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '0 tools replaced (financial product, not operational tool)' },
    ],
    whyRevun: [
      {
        title: 'Full PM vs. financial product',
        body: 'TheGuarantors offers lease guarantees. Revun is a full PM platform with guarantee coming soon as an integrated feature.',
      },
      {
        title: 'Operational tools included',
        body: 'TheGuarantors has no PM features. Revun includes maintenance, accounting, leasing, and communications.',
      },
      {
        title: 'Canadian compliance',
        body: 'TheGuarantors focuses on US markets. Revun includes provincial compliance for Canadian operators.',
      },
    ],
    tldr: [
      'Revun is a full PM platform; TheGuarantors offers lease guarantees only',
      'Revun includes PM operations; TheGuarantors is a financial product',
      'Revun covers Canadian compliance; TheGuarantors is US-focused',
    ],
    faq: [
      {
        question: 'Is TheGuarantors available in Canada?',
        answer: 'TheGuarantors primarily serves US markets. Revun is built for Canadian operations with provincial compliance.',
      },
      {
        question: 'Can I use TheGuarantors with Revun?',
        answer: 'Yes. You can use TheGuarantors for lease guarantees while Revun handles property management.',
      },
      {
        question: 'Does Revun offer lease guarantees?',
        answer: 'Revun is building lease guarantee into the platform (coming soon). Currently, you can use TheGuarantors alongside Revun.',
      },
    ],
  },
  {
    slug: 'insurent',
    name: 'Insurent',
    category: 'Screening',
    description: 'Lease guaranty program helping renters qualify for apartments without traditional guarantors.',
    pricingSummary: 'Premium-based (tenant-paid)',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'US-focused — primarily New York market' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Lease guaranty only — no PM or operations' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'No communications hub' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'No maintenance features' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'No brokerage or leasing tools — guaranty product only' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'No rent collection or payment processing' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'Insurance compliance only — no property compliance' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Applicant and landlord roles only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'Guaranty application only — no ongoing portal' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Guaranty data only' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '0 tools replaced (financial product, not operational tool)' },
    ],
    whyRevun: [
      {
        title: 'Full platform, not just guaranty',
        body: 'Insurent provides lease guaranty. Revun provides a full PM platform with guaranty coming soon as an integrated feature.',
      },
      {
        title: 'Operational infrastructure',
        body: 'Insurent has no PM features. Revun covers maintenance, accounting, communications, and compliance.',
      },
      {
        title: 'Canadian market focus',
        body: 'Insurent is US-focused. Revun is built for the Canadian market.',
      },
    ],
    tldr: [
      'Revun is a full PM platform; Insurent is lease guaranty only',
      'Revun includes all PM operations; Insurent is a single financial product',
      'Revun is Canadian-first; Insurent is US-focused',
    ],
    faq: [
      {
        question: 'Is Insurent available in Canada?',
        answer: 'Insurent primarily serves US markets, mainly New York. Revun is built for Canadian operations.',
      },
      {
        question: 'Can I use Insurent with Revun?',
        answer: 'Yes. You can use Insurent for lease guaranty while Revun handles property management.',
      },
      {
        question: 'Does Revun offer lease guaranty?',
        answer: 'Revun is building lease guarantee into the platform (coming soon).',
      },
    ],
  },
  {
    slug: 'rhino',
    name: 'Rhino',
    category: 'Screening',
    description: 'Security deposit insurance replacing traditional cash deposits with affordable monthly insurance premiums.',
    pricingSummary: 'From $19/month (tenant-paid)',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'US-focused — deposit insurance product' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Deposit replacement insurance — no PM or operations' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'No communications hub' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'No maintenance features' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'No brokerage or leasing tools — insurance product only' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'No rent collection or payment processing' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'Insurance compliance only — no property compliance' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Tenant and landlord roles for deposit only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'Deposit insurance signup — no ongoing portal' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Deposit insurance data only' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '0 tools replaced (deposit insurance only)' },
    ],
    whyRevun: [
      {
        title: 'Full PM platform',
        body: 'Rhino replaces security deposits. Revun is a complete PM platform with deposit alternatives coming soon.',
      },
      {
        title: 'One platform for all operations',
        body: 'Rhino handles one aspect of leasing. Revun handles all aspects of property management.',
      },
      {
        title: 'Canadian compliance',
        body: 'Rhino is US-focused. Revun includes provincial compliance for Canadian operations.',
      },
    ],
    tldr: [
      'Revun is a full PM platform; Rhino is deposit insurance only',
      'Revun covers all PM operations; Rhino covers one leasing step',
      'Revun is Canadian-first; Rhino is US-focused',
    ],
    faq: [
      {
        question: 'Does Revun offer deposit alternatives?',
        answer: 'Revun is building deposit alternatives into the platform (coming soon). Currently, you can use Rhino alongside Revun.',
      },
      {
        question: 'Who should choose Rhino over Revun?',
        answer: 'Rhino is right if you only need deposit insurance and already have a PM system. For full PM operations, choose Revun.',
      },
      {
        question: 'Is Rhino available in Canada?',
        answer: 'Rhino primarily serves US markets. Revun is built for Canadian operations.',
      },
    ],
  },
  {
    slug: 'jetty',
    name: 'Jetty',
    category: 'Screening',
    description: 'Renters insurance and security deposit alternatives helping renters move in faster with lower upfront costs.',
    pricingSummary: 'From $5/month (renters insurance)',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'US-focused — insurance products' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Renters insurance + deposit alternative — no PM or operations' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'No communications hub' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'No maintenance features' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'No brokerage or leasing tools — insurance products only' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'No rent collection or payment processing' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'Insurance compliance only — no property compliance' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Renter and landlord roles for insurance only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'Insurance purchase experience — no PM portal' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Insurance policy data only' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '0 tools replaced (insurance products only)' },
    ],
    whyRevun: [
      {
        title: 'Full PM vs. insurance product',
        body: 'Jetty offers renters insurance and deposit alternatives. Revun is a full PM platform with deposit alternatives coming soon.',
      },
      {
        title: 'Complete property operations',
        body: 'Jetty covers two financial products. Revun covers the entire property management lifecycle.',
      },
      {
        title: 'Canadian market',
        body: 'Jetty is US-focused. Revun is built for the Canadian market.',
      },
    ],
    tldr: [
      'Revun is a full PM platform; Jetty offers insurance and deposit alternatives',
      'Revun covers all PM operations; Jetty covers two financial products',
      'Revun is Canadian-first; Jetty is US-focused',
    ],
    faq: [
      {
        question: 'Is Jetty available in Canada?',
        answer: 'Jetty primarily serves US markets. Revun is built for Canadian operations with provincial compliance.',
      },
      {
        question: 'Can I use Jetty with Revun?',
        answer: 'Yes. You can use Jetty for renters insurance and deposit alternatives while Revun handles property management.',
      },
      {
        question: 'Does Revun offer renters insurance?',
        answer: 'Revun does not currently offer renters insurance. Deposit alternatives are coming soon.',
      },
    ],
  },
  {
    slug: 'leaselock',
    name: 'LeaseLock',
    category: 'Screening',
    description: 'Lease insurance platform eliminating security deposits entirely with AI-powered risk assessment.',
    pricingSummary: 'Premium-based (operator-paid)',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'US multifamily focused — no Canadian support' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Lease insurance + AI risk — no PM or operations' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'No communications hub' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'No maintenance features' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'No brokerage or leasing tools — insurance product only' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'No rent collection or payment processing' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'Insurance compliance only — no property compliance' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Operator and insurer roles only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'Deposit elimination at move-in — no ongoing portal' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Risk assessment data only' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '0 tools replaced (lease insurance only)' },
    ],
    whyRevun: [
      {
        title: 'Full PM platform',
        body: 'LeaseLock provides lease insurance. Revun provides a full PM platform with lease insurance coming soon.',
      },
      {
        title: 'End-to-end operations',
        body: 'LeaseLock covers one financial product. Revun covers the entire property management lifecycle.',
      },
      {
        title: 'Canadian compliance',
        body: 'LeaseLock focuses on US multifamily. Revun includes Canadian provincial compliance.',
      },
    ],
    tldr: [
      'Revun is a full PM platform; LeaseLock provides lease insurance',
      'Revun covers all operations; LeaseLock handles one financial product',
      'Revun is Canadian-first; LeaseLock targets US multifamily',
    ],
    faq: [
      {
        question: 'Is LeaseLock available in Canada?',
        answer: 'LeaseLock primarily serves US multifamily operators. Revun is built for Canadian operations.',
      },
      {
        question: 'Can I use LeaseLock with Revun?',
        answer: 'Yes. You can use LeaseLock for deposit elimination while Revun handles PM. As Revun builds this in, you can consolidate.',
      },
      {
        question: 'Does Revun eliminate security deposits?',
        answer: 'Revun is building deposit alternatives into the platform (coming soon).',
      },
    ],
  },
  {
    slug: 'trustii',
    name: 'Trustii',
    category: 'Screening',
    description: 'Identity verification and tenant screening platform using biometric and document verification for landlords.',
    pricingSummary: 'Per-verification fees',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'Identity verification — not Canada-specific PM' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Identity + biometric verification — no PM, leasing, or operations' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'No communications hub' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'No maintenance features' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'No brokerage or leasing tools — verification only' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'No payment processing' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'ID verification compliance — no property compliance' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Verifier and applicant roles only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'Verification flow only — no ongoing portal' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Verification data only' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '0 tools replaced (identity verification point tool)' },
    ],
    whyRevun: [
      {
        title: 'Full screening pipeline',
        body: 'Trustii handles identity verification. Revun includes identity verification as part of a full screening and leasing pipeline.',
      },
      {
        title: 'Complete PM platform',
        body: 'Trustii is a point tool. Revun is a full PM platform that includes verification inside the leasing workflow.',
      },
      {
        title: 'No per-verification fees',
        body: 'Trustii charges per verification. Revun includes screening in the platform subscription.',
      },
    ],
    tldr: [
      'Revun includes ID verification in the full PM platform; Trustii is verification only',
      'Revun includes screening in the subscription; Trustii charges per verification',
      'Revun is a complete PM platform; Trustii is a point tool',
    ],
    faq: [
      {
        question: 'Does Revun include identity verification?',
        answer: 'Yes. Revun includes identity verification as part of the screening pipeline, integrated with your leasing workflow.',
      },
      {
        question: 'Who should choose Trustii over Revun?',
        answer: 'Trustii is right for operators who need deep biometric verification. For full PM with integrated screening, choose Revun.',
      },
      {
        question: 'Can I use Trustii with Revun?',
        answer: 'Yes. Some operators use Trustii for enhanced verification alongside Revun for property management.',
      },
    ],
  },
  {
    slug: 'persona',
    name: 'Persona',
    category: 'Screening',
    description: 'Identity verification platform used across industries for KYC, document verification, and fraud prevention.',
    pricingSummary: 'Custom pricing (per verification)',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'Global KYC platform — not property-specific' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Identity verification API — no PM, leasing, or operations' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'No communications hub' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'No maintenance features' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'No brokerage or leasing tools — developer API only' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'No payment processing' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'KYC/AML compliance — no property compliance' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Developer integration — no end-user roles' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'No tenant experience — API-based verification' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Verification data only — requires API integration' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '0 tools replaced (developer API, not an operational tool)' },
    ],
    whyRevun: [
      {
        title: 'Property-specific verification',
        body: 'Persona is a general identity platform. Revun includes tenant-specific verification inside the leasing pipeline.',
      },
      {
        title: 'Full PM platform',
        body: 'Persona is an API tool. Revun is a complete PM platform with verification built into the screening workflow.',
      },
      {
        title: 'No integration required',
        body: 'Persona requires API integration. Revun includes verification out of the box as part of the platform.',
      },
    ],
    tldr: [
      'Revun includes verification in the PM platform; Persona is a developer API',
      'Revun is ready to use; Persona requires API integration',
      'Revun is a complete PM platform; Persona is an identity verification tool',
    ],
    faq: [
      {
        question: 'Is Persona designed for property management?',
        answer: 'No. Persona is a general identity verification platform used across industries. Revun includes property-specific verification in the leasing pipeline.',
      },
      {
        question: 'Who should choose Persona over Revun?',
        answer: 'Persona is right for companies building custom identity verification flows. For property managers, Revun includes verification out of the box.',
      },
      {
        question: 'Does Revun use Persona?',
        answer: 'Revun uses partner integrations for identity verification. The specific providers may vary but the feature is included in the platform.',
      },
    ],
  },
  {
    slug: 'rent-manager',
    name: 'Rent Manager',
    category: 'PM Software',
    description:
      'Property management software for residential, commercial, and HOA managers.',
    pricingSummary: 'Custom pricing based on unit count',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'US-only — no Canadian compliance or Interac support' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'PM and accounting — no brokerage CRM or built-in comms' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'No built-in communications hub — requires third-party tools' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'Basic work orders — no dispatch, vendor coordination, or field app' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'Leasing basics only — no brokerage CRM or showing scheduler' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'ACH and check payments — no Interac or modern payment rails' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'US state compliance — no Canadian provincial rules' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'PM and tenant roles — limited role customization' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'Basic tenant portal with limited self-service' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'PM data siloed — comms and brokerage data live elsewhere' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '1-2 tools replaced (PM + basic accounting)' },
    ],
    whyRevun: [
      {
        title: 'Canadian compliance out of the box',
        body: 'Rent Manager is built for the US market with no Canadian provincial compliance. Revun includes province-specific lease templates, Interac payments, and Canadian tax workflows natively.',
      },
      {
        title: 'Modern interface, faster onboarding',
        body: 'Rent Manager has a legacy desktop-era interface. Revun is a modern cloud platform with intuitive UX that teams adopt in days, not weeks.',
      },
      {
        title: 'Built-in communications',
        body: 'Rent Manager requires third-party tools for phone, SMS, and messaging. Revun includes email, SMS, VoIP, and in-app messaging in one thread per record.',
      },
    ],
    tldr: [
      'Revun supports Canadian provincial compliance; Rent Manager is US-only',
      'Revun includes built-in communications; Rent Manager requires third-party tools',
      'Revun offers modern cloud UX; Rent Manager has a legacy interface',
    ],
    faq: [
      {
        question: 'Is Rent Manager available in Canada?',
        answer: 'Rent Manager is designed for the US market and does not include Canadian provincial compliance, Interac payments, or province-specific templates. Revun is built for Canada from the ground up.',
      },
      {
        question: 'How does Rent Manager pricing compare to Revun?',
        answer: 'Rent Manager uses custom pricing based on unit count, which can be opaque. Revun offers transparent per-unit pricing from $1/day with no hidden fees.',
      },
      {
        question: 'Does Rent Manager include a communications hub?',
        answer: 'No. Rent Manager requires separate tools for phone, SMS, and messaging. Revun includes email, SMS, VoIP, and in-app messaging built into every workflow.',
      },
      {
        question: 'Can I migrate from Rent Manager to Revun?',
        answer: 'Yes. Revun offers guided onboarding and data migration support to help you transition from Rent Manager with minimal disruption.',
      },
    ],
  },
  {
    slug: 'follow-up-boss',
    name: 'Follow Up Boss',
    category: 'Real Estate CRM',
    description:
      'CRM and lead management platform for real estate agents and teams.',
    pricingSummary: 'From $69/user/month',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'US-focused CRM — no Canadian compliance features' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'CRM only — no PM, maintenance, payments, or accounting' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'Email and calling built in — no VoIP or in-app tenant messaging' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'No maintenance features whatsoever' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'CRM and lead routing — no lease generation or signatures' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'No payment processing or disbursements' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'No compliance automation — sales CRM only' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Agent and team lead roles only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'No tenant portal — buyer/seller focused' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'CRM data only — no property operations data' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '1 tool replaced (CRM only)' },
    ],
    whyRevun: [
      {
        title: 'CRM plus full property management',
        body: 'Follow Up Boss is a sales CRM for agents. Revun includes CRM capabilities inside a full property management platform with maintenance, payments, and compliance.',
      },
      {
        title: 'Post-lease lifecycle covered',
        body: 'Follow Up Boss stops at the deal. Revun manages the entire lifecycle from lead to lease to ongoing operations, maintenance, and renewals.',
      },
      {
        title: 'One platform, not two subscriptions',
        body: 'Using Follow Up Boss plus a PM tool means two subscriptions, two databases, and manual data syncing. Revun combines both into one platform.',
      },
    ],
    tldr: [
      'Revun is a full PM platform with CRM; Follow Up Boss is CRM only',
      'Revun covers the post-lease lifecycle; Follow Up Boss stops at the deal',
      'Revun replaces 5-8 tools; Follow Up Boss replaces 1',
    ],
    faq: [
      {
        question: 'Is Follow Up Boss a property management tool?',
        answer: 'No. Follow Up Boss is a real estate sales CRM for agents and teams. It does not include property management, maintenance, or tenant features. Revun is a full PM platform with built-in CRM.',
      },
      {
        question: 'Can I use Follow Up Boss with Revun?',
        answer: 'You could, but Revun includes lead management and CRM features built into the platform, eliminating the need for a separate CRM tool.',
      },
      {
        question: 'How does Follow Up Boss pricing compare to Revun?',
        answer: 'Follow Up Boss charges from $69/user/month for CRM only. Revun offers a full PM platform from $1/day per unit, including CRM, maintenance, and payments.',
      },
      {
        question: 'Does Follow Up Boss work in Canada?',
        answer: 'Follow Up Boss is US-focused and does not include Canadian compliance features. Revun is built for the Canadian market with province-specific workflows.',
      },
    ],
  },
  {
    slug: 'transunion-smartmove',
    name: 'TransUnion SmartMove',
    category: 'Tenant Screening',
    description:
      'Online tenant screening service powered by TransUnion credit data.',
    pricingSummary: 'From $25/report',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'US credit data only — no Canadian credit bureau integration' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Screening reports only — no PM, leasing, or operations' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'No communications — email notifications only' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'No maintenance features' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'No leasing workflows — screening reports only' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'No payment processing' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'FCRA compliance for screening — no property compliance' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Landlord and applicant roles only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'No tenant portal — one-time screening report' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Screening data only — no connection to PM workflow' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '0 tools replaced (point solution for screening only)' },
    ],
    whyRevun: [
      {
        title: 'Screening inside the leasing pipeline',
        body: 'TransUnion SmartMove is a standalone screening tool. Revun integrates screening directly into the application and leasing workflow, so results flow into lease generation automatically.',
      },
      {
        title: 'Canadian credit data included',
        body: 'SmartMove uses US TransUnion data only. Revun partners with Canadian credit bureaus to deliver screening reports relevant to the Canadian market.',
      },
      {
        title: 'Full platform, not a point solution',
        body: 'SmartMove handles one step. Revun handles the entire lifecycle from listing to screening to lease to ongoing management.',
      },
    ],
    tldr: [
      'Revun integrates screening into the leasing pipeline; SmartMove is standalone',
      'Revun includes Canadian credit data; SmartMove is US-only',
      'Revun is a full PM platform; SmartMove is a single screening tool',
    ],
    faq: [
      {
        question: 'Does TransUnion SmartMove work in Canada?',
        answer: 'SmartMove uses US TransUnion credit data and is not designed for Canadian screening. Revun includes Canadian credit bureau integrations for the Canadian market.',
      },
      {
        question: 'Can I use SmartMove with Revun?',
        answer: 'Revun includes built-in screening, so a separate SmartMove subscription is unnecessary. Screening results flow directly into your leasing workflow.',
      },
      {
        question: 'How does SmartMove pricing compare to Revun?',
        answer: 'SmartMove charges from $25/report for screening only. Revun includes screening as part of the full platform from $1/day per unit.',
      },
      {
        question: 'Is SmartMove a property management tool?',
        answer: 'No. SmartMove is a screening-only service. Revun is a full property management platform with screening, leasing, maintenance, payments, and more.',
      },
      {
        question: 'Does Revun include credit checks?',
        answer: 'Yes. Revun includes credit checks, background screening, and income verification as part of the integrated leasing pipeline.',
      },
    ],
  },
  {
    slug: 'property-meld',
    name: 'Property Meld',
    category: 'Maintenance Software',
    description:
      'Maintenance coordination platform for property management companies.',
    pricingSummary: 'From $1/unit/month',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'US-focused — no Canadian compliance features' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Maintenance coordination only — no PM, leasing, or accounting' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'Maintenance-specific messaging — no general comms hub' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'Strong maintenance coordination and scheduling' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'No leasing or brokerage features' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'No payment processing or disbursements' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'No property compliance — maintenance SLAs only' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'PM, tenant, and vendor roles for maintenance only' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'Maintenance request portal only' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Maintenance data only — requires PM integration' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '1 tool replaced (maintenance coordination only)' },
    ],
    whyRevun: [
      {
        title: 'Maintenance inside the full PM platform',
        body: 'Property Meld is maintenance-only. Revun includes equivalent maintenance coordination inside a platform that also handles leasing, payments, accounting, and compliance.',
      },
      {
        title: 'No integration overhead',
        body: 'Property Meld requires integration with your PM software. Revun is the PM software with maintenance built in, eliminating sync issues and extra costs.',
      },
      {
        title: 'One vendor, one bill',
        body: 'Using Property Meld means paying for both a PM tool and a maintenance tool. Revun includes both in one subscription.',
      },
    ],
    tldr: [
      'Revun includes maintenance in the PM platform; Property Meld is maintenance-only',
      'Revun eliminates PM-to-maintenance integration; Property Meld requires it',
      'Revun is one subscription; Property Meld is an add-on cost',
    ],
    faq: [
      {
        question: 'Is Property Meld a property management tool?',
        answer: 'No. Property Meld is a maintenance coordination platform that integrates with PM tools. Revun is a full PM platform with maintenance built in.',
      },
      {
        question: 'How does Property Meld pricing compare to Revun?',
        answer: 'Property Meld charges from $1/unit/month on top of your PM software costs. Revun includes maintenance as part of the full platform from $1/day per unit.',
      },
      {
        question: 'Does Revun match Property Meld for maintenance features?',
        answer: 'Yes. Revun includes work order management, vendor dispatch, scheduling, tenant communication, and proof-of-work tracking comparable to Property Meld.',
      },
      {
        question: 'Can I use Property Meld with Revun?',
        answer: 'Revun includes built-in maintenance coordination, so a separate Property Meld subscription is unnecessary. All maintenance workflows are native to the platform.',
      },
    ],
  },
  {
    slug: 'jobber',
    name: 'Jobber',
    category: 'Field Service Software',
    description:
      'Job management software for home service businesses.',
    pricingSummary: 'From $69/month',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'Canadian company but not property-specific' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Field service only — no PM, leasing, or tenant management' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'Client messaging and reminders — not property-context-aware' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'Job scheduling and dispatch for service businesses' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'No leasing or brokerage features' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'Client invoicing — no rent collection or owner disbursements' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'No property compliance — generic business tools' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Manager and field tech roles — no tenant or owner roles' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'No tenant portal — client-facing only' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Service job data only — no property or tenant context' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '1 tool replaced (field service scheduling only)' },
    ],
    whyRevun: [
      {
        title: 'Property-aware maintenance',
        body: 'Jobber is built for generic service businesses. Revun ties maintenance to units, tenants, leases, and owners so every work order has full property context.',
      },
      {
        title: 'Full property management included',
        body: 'Jobber handles field jobs. Revun handles field jobs inside a platform that also manages leasing, payments, compliance, and tenant communications.',
      },
      {
        title: 'No double entry',
        body: 'Using Jobber alongside a PM tool means re-entering property and tenant data. Revun keeps everything in one system of record.',
      },
    ],
    tldr: [
      'Revun ties maintenance to property context; Jobber is generic field service',
      'Revun is a full PM platform; Jobber handles job scheduling only',
      'Revun eliminates double data entry; Jobber requires PM integration',
    ],
    faq: [
      {
        question: 'Is Jobber designed for property management?',
        answer: 'No. Jobber is built for home service businesses like plumbers, cleaners, and landscapers. Revun is built for property managers who coordinate those services.',
      },
      {
        question: 'How does Jobber pricing compare to Revun?',
        answer: 'Jobber charges from $69/month for field service management. Revun offers a full PM platform from $1/day per unit, including maintenance coordination.',
      },
      {
        question: 'Can property managers use Jobber?',
        answer: 'Property managers can use Jobber for vendor coordination, but it lacks tenant portals, lease management, rent collection, and compliance. Revun includes all of these.',
      },
      {
        question: 'Does Revun replace Jobber for maintenance?',
        answer: 'Yes. Revun includes work order management, vendor dispatch, scheduling, and proof-of-work tracking with the added context of tenant, unit, and lease data.',
      },
    ],
  },
  {
    slug: 'ringcentral',
    name: 'RingCentral',
    category: 'Communications',
    description:
      'Cloud-based business phone and messaging platform.',
    pricingSummary: 'From $30/user/month',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'Available in Canada — but not property-specific' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Phone and messaging only — no PM, leasing, or maintenance' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'Enterprise-grade phone, video, and messaging platform' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'No maintenance features' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'No brokerage or leasing features' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'No payment processing' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'Telecom compliance — no property compliance' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Employee roles only — no tenant or owner roles' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'No tenant portal — general business phone system' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Call and message data only — disconnected from PM workflows' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '1 tool replaced (business phone system only)' },
    ],
    whyRevun: [
      {
        title: 'Communications in property context',
        body: 'RingCentral is a generic business phone system. Revun ties every call, SMS, and message to the relevant tenant, unit, work order, or lease record.',
      },
      {
        title: 'No extra subscription needed',
        body: 'RingCentral is an additional cost on top of your PM software. Revun includes communications in the platform — no separate phone system required.',
      },
      {
        title: 'Full PM platform included',
        body: 'RingCentral handles calls. Revun handles calls inside a platform that also manages leasing, maintenance, payments, and compliance.',
      },
    ],
    tldr: [
      'Revun ties comms to property records; RingCentral is a generic phone system',
      'Revun includes comms in the PM platform; RingCentral is an extra subscription',
      'Revun replaces 5-8 tools; RingCentral replaces 1',
    ],
    faq: [
      {
        question: 'Is RingCentral designed for property management?',
        answer: 'No. RingCentral is a general business phone platform. Revun includes communications purpose-built for property management with tenant, unit, and lease context.',
      },
      {
        question: 'How does RingCentral pricing compare to Revun?',
        answer: 'RingCentral charges from $30/user/month for phone and messaging. Revun offers a full PM platform with built-in comms from $1/day per unit.',
      },
      {
        question: 'Can I use RingCentral with Revun?',
        answer: 'Revun includes built-in phone, SMS, and messaging, so a separate RingCentral subscription is unnecessary for most property management teams.',
      },
      {
        question: 'Does Revun support VoIP calling?',
        answer: 'Yes. Revun includes VoIP calling, SMS, email, and in-app messaging — all tied to your property records in a single communication thread.',
      },
    ],
  },
  {
    slug: 'openphone',
    name: 'OpenPhone',
    category: 'Communications',
    description:
      'Business phone system for startups and small teams.',
    pricingSummary: 'From $19/user/month',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'Canadian company — but not property-specific' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Phone and SMS only — no PM, leasing, or maintenance' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'Phone and SMS with shared numbers and CRM-lite features' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'No maintenance features' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'No brokerage or leasing features' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'No payment processing' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'No property compliance — phone system only' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Team member roles only — no tenant or owner roles' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'No tenant portal — business phone app only' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Call and SMS logs only — no property context' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '1 tool replaced (business phone only)' },
    ],
    whyRevun: [
      {
        title: 'Property-aware communications',
        body: 'OpenPhone is a generic business phone. Revun links every call and message to the relevant tenant, unit, work order, or lease — giving your team instant context.',
      },
      {
        title: 'Full PM platform, not just a phone',
        body: 'OpenPhone handles calls and texts. Revun handles calls and texts inside a platform that also manages leasing, maintenance, payments, and compliance.',
      },
      {
        title: 'Eliminate the extra subscription',
        body: 'OpenPhone is an added cost on top of your PM tool. Revun includes phone, SMS, email, and in-app messaging in the platform subscription.',
      },
    ],
    tldr: [
      'Revun links comms to property records; OpenPhone is a generic phone app',
      'Revun includes comms in the full PM platform; OpenPhone is an add-on cost',
      'Revun replaces 5-8 tools; OpenPhone replaces 1',
    ],
    faq: [
      {
        question: 'Is OpenPhone designed for property managers?',
        answer: 'No. OpenPhone is a general business phone system for startups and small teams. Revun includes communications purpose-built for property management workflows.',
      },
      {
        question: 'How does OpenPhone pricing compare to Revun?',
        answer: 'OpenPhone charges from $19/user/month for phone and SMS only. Revun offers a full PM platform with built-in comms from $1/day per unit.',
      },
      {
        question: 'Does Revun include shared phone numbers?',
        answer: 'Yes. Revun includes shared numbers, call routing, SMS, and in-app messaging — all tied to your property management records automatically.',
      },
      {
        question: 'Can I port my OpenPhone number to Revun?',
        answer: 'Revun supports number provisioning as part of onboarding. Contact the Revun team to discuss number porting during your transition.',
      },
    ],
  },
  {
    slug: 'dialpad',
    name: 'Dialpad',
    category: 'Communications',
    description:
      'AI-powered business communications platform.',
    pricingSummary: 'From $27/user/month',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'Available in Canada — but not property-specific' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'Phone, video, and AI features — no PM, leasing, or maintenance' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'Enterprise phone, video, and AI transcription platform' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'No maintenance features whatsoever' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'No brokerage or leasing features' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'No payment processing' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'Telecom and AI compliance — no property compliance' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Employee roles only — no tenant or owner roles' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'No tenant portal — enterprise comms platform' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Call and meeting data only — no property context' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '1 tool replaced (business phone/video only)' },
    ],
    whyRevun: [
      {
        title: 'Comms with property context',
        body: 'Dialpad is a powerful AI phone platform, but it has zero property awareness. Revun ties every communication to the relevant tenant, unit, lease, or work order.',
      },
      {
        title: 'Full PM platform included',
        body: 'Dialpad handles calls and meetings. Revun handles calls inside a platform that also manages leasing, maintenance, payments, accounting, and compliance.',
      },
      {
        title: 'One subscription covers everything',
        body: 'Dialpad plus a PM tool means two subscriptions and disconnected data. Revun combines communications and property management in one platform.',
      },
    ],
    tldr: [
      'Revun ties comms to property records; Dialpad has no property awareness',
      'Revun includes comms in the PM platform; Dialpad is a separate subscription',
      'Revun is a full PM platform; Dialpad is phone and video only',
    ],
    faq: [
      {
        question: 'Is Dialpad designed for property management?',
        answer: 'No. Dialpad is a general AI-powered business communications platform. Revun includes communications built specifically for property management workflows.',
      },
      {
        question: 'How does Dialpad pricing compare to Revun?',
        answer: 'Dialpad charges from $27/user/month for phone and video. Revun offers a full PM platform with built-in comms from $1/day per unit.',
      },
      {
        question: 'Does Revun have AI features like Dialpad?',
        answer: 'Revun focuses on property-specific intelligence — automated compliance, smart maintenance routing, and tenant communication workflows tailored to PM operations.',
      },
      {
        question: 'Can I replace Dialpad with Revun?',
        answer: 'If your primary use case is property management communications, yes. Revun includes VoIP, SMS, email, and messaging built into the PM platform.',
      },
      {
        question: 'Does Dialpad integrate with PM software?',
        answer: 'Dialpad offers generic CRM integrations but no PM-specific integrations. Revun eliminates the integration problem by including comms natively.',
      },
    ],
  },
  {
    slug: 'servicetitan',
    name: 'ServiceTitan',
    category: 'Field Service Software',
    description:
      'Operations platform for residential and commercial service contractors.',
    pricingSummary: 'Custom pricing',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canada Readiness', revun: 'Province-specific compliance, Interac, Canadian-first', competitor: 'US-focused — limited Canadian market support' },
      { name: 'Full-Stack Capability', revun: 'Leasing + PM + maintenance + brokerage + accounting + comms', competitor: 'HVAC/plumbing/electrical operations — no PM, leasing, or tenant management' },
      { name: 'Built-in Communications', revun: 'Email, SMS, VoIP, video, in-app — one thread per record', competitor: 'Dispatch communications — not tenant or owner facing' },
      { name: 'Built-in Maintenance', revun: 'Full dispatch, vendor management, field app, proof of work', competitor: 'Strong dispatch and field service management for contractors' },
      { name: 'Brokerage & Leasing Workflows', revun: 'CRM, showings, offers, lease generation, signatures', competitor: 'No leasing or brokerage features' },
      { name: 'Payments & Owner Disbursements', revun: 'Rent, vendor payouts, Interac, owner disbursements, trust', competitor: 'Customer invoicing — no rent collection or owner disbursements' },
      { name: 'Compliance Depth', revun: 'Province-specific automation, document templates, audit trail', competitor: 'Trade licensing compliance — no property compliance' },
      { name: 'User-Role Flexibility', revun: 'Owners, tenants, PMs, brokers, maintenance, executives', competitor: 'Dispatcher, technician, and office roles — no tenant or owner roles' },
      { name: 'Tenant Experience', revun: 'Full portal: payments, maintenance, comms, documents', competitor: 'Customer portal for service appointments — not tenant-specific' },
      { name: 'Data Unification', revun: 'Single system of record across all workflows', competitor: 'Service job data only — no property or lease context' },
      { name: 'Total Stack Replaced', revun: '5-8 tools replaced (PM + CRM + comms + maintenance + payments + accounting)', competitor: '1 tool replaced (field service operations only)' },
    ],
    whyRevun: [
      {
        title: 'Built for property managers, not contractors',
        body: 'ServiceTitan is built for HVAC, plumbing, and electrical contractors. Revun is built for the property managers who hire and coordinate those contractors.',
      },
      {
        title: 'Full property lifecycle coverage',
        body: 'ServiceTitan handles service calls. Revun handles the entire property lifecycle — from leasing to maintenance to payments to compliance.',
      },
      {
        title: 'Tenant and owner context',
        body: 'ServiceTitan tracks jobs by customer. Revun tracks jobs by tenant, unit, building, and owner — giving you full property context on every work order.',
      },
    ],
    tldr: [
      'Revun is built for property managers; ServiceTitan is built for contractors',
      'Revun covers the full property lifecycle; ServiceTitan covers field service only',
      'Revun provides tenant and unit context; ServiceTitan tracks generic customers',
    ],
    faq: [
      {
        question: 'Is ServiceTitan a property management tool?',
        answer: 'No. ServiceTitan is an operations platform for HVAC, plumbing, and electrical contractors. Revun is a property management platform that coordinates maintenance vendors.',
      },
      {
        question: 'How does ServiceTitan pricing compare to Revun?',
        answer: 'ServiceTitan uses custom pricing typically suited for large service contractors. Revun offers transparent per-unit pricing from $1/day for a full PM platform.',
      },
      {
        question: 'Can property managers use ServiceTitan?',
        answer: 'Property managers could use ServiceTitan for vendor dispatch, but it lacks tenant portals, lease management, rent collection, and compliance. Revun includes all of these.',
      },
      {
        question: 'Does Revun replace ServiceTitan for maintenance?',
        answer: 'For property managers, yes. Revun includes work order management, vendor dispatch, and field coordination with the added context of tenants, units, and leases.',
      },
      {
        question: 'Does ServiceTitan work in Canada?',
        answer: 'ServiceTitan has limited Canadian market support. Revun is built for the Canadian market with province-specific compliance, Interac payments, and Canadian tax workflows.',
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
