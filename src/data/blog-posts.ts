/**
 * Blog / resources content for /resources/[slug] pages.
 *
 * Each post targets a real commercial or informational query and links up into
 * the matching hub (features, use-cases, pricing, compare). Content is original
 * and genuinely useful. No visible date is rendered; datePublished and
 * dateModified live in Article JSON-LD only, per the silo date rule.
 */

export interface BlogSection {
  h2: string
  paragraphs: string[]
  bullets?: string[]
}

export interface BlogPost {
  slug: string
  title: string
  metaTitle: string
  description: string
  category: string
  datePublished: string
  dateModified: string
  readMinutes: number
  intro: string
  sections: BlogSection[]
  keyTakeaways: string[]
  faqs: { q: string; a: string }[]
  related: { label: string; href: string }[]
}

export const baseBlogPosts: Record<string, BlogPost> = {
  'best-property-management-software-for-small-landlords': {
    slug: 'best-property-management-software-for-small-landlords',
    title: 'Best Property Management Software for Small Landlords',
    metaTitle: 'Best Property Management Software for Small Landlords (2026 Guide) | Revun',
    description:
      'How small landlords should choose property management software: the features that matter, what to ignore, pricing models, and how to avoid outgrowing your tool.',
    category: 'Landlord tips',
    datePublished: '2026-06-04',
    dateModified: '2026-06-04',
    readMinutes: 8,
    intro:
      'If you own a handful of rentals, the right software pays for itself the first time it catches a late payment, screens out a bad applicant, or saves you an afternoon of paperwork. The wrong tool either does too little or charges like you run a thousand doors. This guide walks through how a small landlord should actually choose, and what separates a starter app from a platform you will not outgrow.',
    sections: [
      {
        h2: 'What small landlords actually need',
        paragraphs: [
          'Most small portfolios live and die on four workflows: collecting rent on time, screening applicants properly, handling maintenance without phone tag, and keeping clean records for tax season. Everything else is a bonus. Start by making sure those four are genuinely covered, not just listed on a feature page.',
        ],
        bullets: [
          'Rent collection with automatic reminders and a clear ledger per unit',
          'Tenant screening that pulls credit, identity, and income in one place',
          'A maintenance request flow your tenants will actually use',
          'Accounting that exports cleanly for your accountant or tax filing',
        ],
      },
      {
        h2: 'The trap: tools you outgrow',
        paragraphs: [
          'The most common mistake is choosing a tool built only for one or two units. It feels great at first, then you add a third property and discover the accounting is thin, the communications are basic, and there is no real reporting. Now you are migrating data and retraining yourself a year in.',
          'Pick something that runs the same way at two units or two hundred. You want a free or low entry point that scales into full accounting, communications, and reporting as you grow, without a forced platform change later.',
        ],
      },
      {
        h2: 'Pricing models, decoded',
        paragraphs: [
          'Property management software is usually priced one of three ways: a flat per-door rate, tiered monthly plans, or free software funded by tenant-paid fees. Flat per-door is the most predictable. Tiered plans look cheap at the bottom and climb as you grow. Free tools are appealing until you realize the cost is shifted onto your tenants or buried in add-ons.',
          'Watch for monthly minimums and onboarding fees, which quietly make a small portfolio pay enterprise prices. A tool with no unit minimum and a free tier for one or two units is the friendliest entry point for a small landlord.',
        ],
      },
      {
        h2: 'How Revun fits',
        paragraphs: [
          'Revun is free for one to two units with the full core workflow, then scales flat per door with no minimum. Screening, native communications, and accounting are included rather than sold as add-ons, and the same platform keeps working as you add properties. It covers both the US and Canada, so a move or a cross-border purchase does not force a tool change.',
        ],
      },
    ],
    keyTakeaways: [
      'Cover the four core workflows first: rent, screening, maintenance, records.',
      'Choose a tool you will not outgrow at three or thirty units.',
      'Prefer flat per-door pricing with no minimum over tiers or fee-funded free tools.',
    ],
    faqs: [
      { q: 'Do I need property management software for just one rental?', a: 'Even one unit benefits from automatic rent reminders, a clean ledger, and proper screening. A free tier means there is no cost to start, and you keep the same system as you add units.' },
      { q: 'What is the cheapest way to manage a small portfolio?', a: 'A platform with a free tier for one to two units and flat per-door pricing above that is usually cheapest over time, because you avoid tier jumps, minimums, and add-on fees.' },
      { q: 'Will I have to switch tools as I grow?', a: 'Not if you pick a platform built to scale. Choosing a starter-only app is the most common reason landlords migrate later.' },
    ],
    related: [
      { label: 'See Revun pricing', href: '/pricing/' },
      { label: 'Revun for self-managing owners', href: '/self-manage/' },
      { label: 'Compare Revun to other tools', href: '/compare/' },
    ],
  },
  'how-to-screen-tenants': {
    slug: 'how-to-screen-tenants',
    title: 'How to Screen Tenants: A Step by Step Guide for Landlords',
    metaTitle: 'How to Screen Tenants: A Landlord Guide to Credit, Income, and References | Revun',
    description:
      'A practical, compliant tenant screening process: what to check, how to read a credit report, verifying income, and avoiding fair housing and FCRA mistakes.',
    category: 'Tenant screening',
    datePublished: '2026-06-04',
    dateModified: '2026-06-04',
    readMinutes: 9,
    intro:
      'Under-screening a tenant is the single most expensive mistake a landlord can make. A missed eviction record or an inflated income claim can cost months of lost rent and legal fees. Good screening is not about gut feel; it is a repeatable process that checks the same things, in the same order, for every applicant, and documents the decision.',
    sections: [
      {
        h2: 'Run the same process for every applicant',
        paragraphs: [
          'Consistency is both better screening and your best legal protection. Applying the same criteria to everyone is how you stay on the right side of fair housing rules. Write down your standards before you advertise the unit, then apply them uniformly.',
        ],
        bullets: [
          'Credit and payment history',
          'Identity and fraud verification',
          'Income and employment verification',
          'Rental history and landlord references',
          'Eviction and public records, where permitted',
        ],
      },
      {
        h2: 'How to read a credit report',
        paragraphs: [
          'You are not looking for a perfect score. You are looking for patterns: chronic late payments, collections tied to housing or utilities, and a debt load that leaves little room for rent. A thin file is not automatically a rejection, especially for younger applicants; weigh it against income and references.',
        ],
      },
      {
        h2: 'Verify income against the source',
        paragraphs: [
          'Stated income is not verified income. Ask for pay stubs, bank statements, or a payroll connection, and confirm the numbers against the underlying source. A common rule of thumb is monthly income of roughly three times the rent, but adjust for the local market and the applicant total picture.',
        ],
      },
      {
        h2: 'Stay compliant',
        paragraphs: [
          'Screening is regulated. In the US, the Fair Credit Reporting Act requires applicant consent and a proper adverse action notice if you decline based on a report. Canadian provinces add their own privacy rules. The safest approach is a system that captures consent, runs the checks, and generates the required notices automatically so nothing is missed.',
        ],
      },
      {
        h2: 'Do it inside your leasing pipeline',
        paragraphs: [
          'Screening that lives in a separate tool never connects to the lease or the ledger, so the report disappears the moment you make a decision. Revun runs credit, identity, income, and reference checks inside the leasing pipeline, so the score and the report stay attached to the applicant record and the eventual lease.',
        ],
      },
    ],
    keyTakeaways: [
      'Define your criteria first, then apply them identically to every applicant.',
      'Verify income against source documents, not just the application.',
      'Automate consent and adverse action notices to stay FCRA and privacy compliant.',
    ],
    faqs: [
      { q: 'What credit score should a tenant have?', a: 'There is no universal cutoff. Look at payment patterns and debt load relative to income rather than the number alone, and apply the same standard to everyone.' },
      { q: 'What income should a tenant have to qualify?', a: 'A common benchmark is monthly income around three times the rent, adjusted for the local market and the applicant overall profile.' },
      { q: 'Do I need the applicant consent to run a credit check?', a: 'Yes. US FCRA and Canadian provincial privacy laws require consent, and FCRA requires an adverse action notice if you decline based on a report.' },
    ],
    related: [
      { label: 'Tenant screening in Revun', href: '/use-cases/tenant-screening/' },
      { label: 'Screening feature details', href: '/features/tenant-screening/' },
      { label: 'Book a demo', href: '/demo/' },
    ],
  },
  'online-rent-collection-guide': {
    slug: 'online-rent-collection-guide',
    title: 'Online Rent Collection: Methods, Fees, and How to Get Paid on Time',
    metaTitle: 'Online Rent Collection Guide: ACH, Cards, Interac, and Late Fees | Revun',
    description:
      'Compare online rent collection methods for landlords: ACH and pre-authorized debit, cards, and Interac e-Transfer, plus how to reduce late payments.',
    category: 'Rent collection',
    datePublished: '2026-06-04',
    dateModified: '2026-06-04',
    readMinutes: 7,
    intro:
      'Rent collection is the highest-volume workflow in property management and the most likely place to leak money. Chasing checks, untracked partial payments, and waived late fees add up fast. Moving collection online fixes most of it, if you pick the right rails and automate the follow-up.',
    sections: [
      {
        h2: 'The main payment methods',
        paragraphs: [
          'Each method trades cost against speed and convenience. The best setup usually offers tenants more than one option while steering them toward the cheapest reliable rail.',
        ],
        bullets: [
          'ACH and pre-authorized debit: low cost, ideal for recurring rent',
          'Credit and debit cards: convenient for tenants, higher processing fees',
          'Interac e-Transfer: common in Canada, fast and familiar to tenants',
        ],
      },
      {
        h2: 'Automate the parts that leak money',
        paragraphs: [
          'The revenue you lose is rarely the rent itself; it is the friction around it. Automatic reminders before the due date, automatic late notices after, and automatic reconciliation of partial payments and returned items close most of the gap. Set the rules once and let the system enforce them consistently.',
        ],
      },
      {
        h2: 'Reconcile to the ledger automatically',
        paragraphs: [
          'A payment that is not tied to the tenant ledger is a payment you will eventually argue about. Choose a system where every channel, including NSF returns and chargebacks, reconciles against the unit automatically. That is the difference between a payment app and an accounting system of record.',
        ],
      },
      {
        h2: 'How Revun handles it',
        paragraphs: [
          'Revun unifies ACH, pre-authorized debit, card, and Interac e-Transfer into one tenant ledger, with NSF tracking and automatic late notices. Because collection lives in the same platform as accounting, every payment reconciles to the unit without manual matching.',
        ],
      },
    ],
    keyTakeaways: [
      'Offer multiple rails but steer tenants to low-cost ACH or pre-authorized debit.',
      'Automate reminders, late notices, and reconciliation to stop revenue leaks.',
      'Make sure every payment ties back to the tenant ledger automatically.',
    ],
    faqs: [
      { q: 'What is the cheapest way to collect rent online?', a: 'ACH in the US and pre-authorized debit or Interac e-Transfer in Canada are the lowest-cost rails for recurring rent. Cards are convenient but carry higher processing fees.' },
      { q: 'How do I reduce late rent payments?', a: 'Automatic pre-due reminders, automatic late notices, and a clear, consistently enforced late-fee policy reduce late payments more than manual follow-up.' },
      { q: 'Can tenants pay by Interac e-Transfer?', a: 'Yes. Revun supports Interac e-Transfer alongside ACH, pre-authorized debit, and cards, all reconciled to the tenant ledger.' },
    ],
    related: [
      { label: 'Rent collection in Revun', href: '/use-cases/rent-collection/' },
      { label: 'Rent collection feature', href: '/features/rent-collection/' },
      { label: 'See pricing', href: '/pricing/' },
    ],
  },
  'property-management-software-pricing-guide': {
    slug: 'property-management-software-pricing-guide',
    title: 'Property Management Software Pricing: What to Expect',
    metaTitle: 'Property Management Software Pricing Guide: Models and Hidden Costs | Revun',
    description:
      'How property management software pricing works: per-unit vs tiered vs free models, monthly minimums, onboarding fees, and the add-ons that inflate your bill.',
    category: 'Buying guide',
    datePublished: '2026-06-04',
    dateModified: '2026-06-04',
    readMinutes: 7,
    intro:
      'Property management software pricing is deliberately hard to compare. Two products with similar sticker prices can cost very different amounts once you account for minimums, onboarding, and the features sold separately. Here is how to read past the headline number.',
    sections: [
      {
        h2: 'The three pricing models',
        paragraphs: [
          'Almost every product uses one of three structures. Knowing which one you are looking at tells you where the real cost hides.',
        ],
        bullets: [
          'Per-unit: a flat rate per door, sometimes with a monthly minimum',
          'Tiered: monthly plans that gate features and raise price as you grow',
          'Free or freemium: funded by tenant-paid fees or paid add-ons',
        ],
      },
      {
        h2: 'Where the hidden costs live',
        paragraphs: [
          'The sticker price rarely tells the whole story. Monthly minimums make small portfolios pay enterprise rates. Onboarding and implementation fees add a large one-time cost. And capabilities like e-signature, advanced reporting, communications, and screening are frequently add-ons that quietly double the effective price.',
        ],
      },
      {
        h2: 'How to compare like for like',
        paragraphs: [
          'Build your real number by adding the base price, any minimum, onboarding, and the add-ons you actually need. Compare that total across products, not the headline. A plan that includes communications and screening at a slightly higher base often beats a cheaper plan that bills both separately.',
        ],
      },
      {
        h2: 'The Revun approach',
        paragraphs: [
          'Revun is flat per door with no unit minimum and a free tier for one to two units. Communications, screening, and accounting are included rather than billed as modules, so the number you see is close to the number you pay. You can compare Revun directly against specific products on our comparison pages.',
        ],
      },
    ],
    keyTakeaways: [
      'Identify the pricing model first; it tells you where costs hide.',
      'Add minimums, onboarding, and required add-ons before comparing.',
      'An inclusive base price often beats a cheaper plan with paid modules.',
    ],
    faqs: [
      { q: 'How much does property management software cost?', a: 'It ranges from free tiers to a few dollars per unit per month, but the real cost depends on minimums, onboarding, and add-ons. Always build a total that includes the features you need.' },
      { q: 'What are typical hidden fees?', a: 'Monthly minimums, onboarding and implementation fees, and add-on charges for e-sign, advanced reporting, communications, and screening are the most common.' },
      { q: 'Is there free property management software?', a: 'Yes, but free usually means tenant-paid fees or paid add-ons. Revun offers a genuinely free tier for one to two units with the full core workflow.' },
    ],
    related: [
      { label: 'Revun pricing', href: '/pricing/' },
      { label: 'Compare Revun to alternatives', href: '/compare/' },
      { label: 'Why Revun', href: '/why-revun/' },
    ],
  },
  'best-appfolio-alternatives': {
    slug: 'best-appfolio-alternatives',
    title: 'Best AppFolio Alternatives for 2026',
    metaTitle: 'Best AppFolio Alternatives for 2026: Top Picks Compared | Revun',
    description:
      'Looking for an AppFolio alternative? Compare the top options for operators below the minimum, Canadian portfolios, and teams that want communications and screening included.',
    category: 'Buying guide',
    datePublished: '2026-06-04',
    dateModified: '2026-06-04',
    readMinutes: 8,
    intro:
      'AppFolio is a strong enterprise platform, but it is not the right fit for everyone. Smaller operators run into its unit minimum, Canadian portfolios hit compliance gaps, and many teams do not want communications and screening billed as add-ons. If any of those sound familiar, here are the alternatives worth a look and how to choose.',
    sections: [
      {
        h2: 'Why operators look for an alternative',
        paragraphs: [
          'The reasons are consistent. AppFolio publishes a per-unit rate with a monthly minimum that prices out smaller portfolios. It is built around US workflows, so Canadian provincial compliance and payment rails are weak. And several capabilities operators consider core, including communications and parts of screening, are positioned as add-ons.',
        ],
      },
      {
        h2: 'What to look for instead',
        paragraphs: [
          'Match the alternative to the reason you are leaving. If price is the issue, prioritize no minimums and a free or low entry tier. If you operate in Canada, prioritize native provincial compliance and Canadian rails. If you are tired of add-ons, prioritize an all-in-one platform that includes communications and screening in the base price.',
        ],
        bullets: [
          'No unit minimum and transparent per-door pricing',
          'US and Canada compliance built in, not bolted on',
          'Communications and screening included, not add-ons',
          'A migration path that preserves your data and balances',
        ],
      },
      {
        h2: 'Revun as an AppFolio alternative',
        paragraphs: [
          'Revun is built for exactly the operators AppFolio leaves behind: it has no unit minimum, a free tier for one to two units, native US and Canada compliance, and communications, screening, and accounting included in one per-door price. Migration imports your units, leases, tenants, and ledgers from an AppFolio export and reconciles balances before go-live.',
          'For a full feature-by-feature breakdown, see our dedicated comparison.',
        ],
      },
      {
        h2: 'Compare the specific options',
        paragraphs: [
          'The fastest way to decide is a head-to-head comparison against the products you are actually considering. We maintain detailed comparisons for the most common AppFolio alternatives.',
        ],
      },
    ],
    keyTakeaways: [
      'Most operators leave AppFolio over minimums, Canadian gaps, or add-on pricing.',
      'Match the alternative to your specific reason for switching.',
      'Revun fits operators who want no minimums, Canadian coverage, and an all-in-one price.',
    ],
    faqs: [
      { q: 'What is the best AppFolio alternative?', a: 'It depends on why you are switching. For operators below the minimum, Canadian portfolios, or teams that want communications and screening included, Revun is a strong fit. Compare options head to head before deciding.' },
      { q: 'Is there a cheaper alternative to AppFolio?', a: 'Yes. Tools without a monthly minimum, including Revun with its free tier for one to two units, are typically cheaper for small and mid portfolios.' },
      { q: 'Which AppFolio alternative works in Canada?', a: 'Revun ships Canadian provincial compliance and payment rails natively, which most US-built alternatives do not.' },
    ],
    related: [
      { label: 'Revun vs AppFolio', href: '/compare/appfolio/' },
      { label: 'Revun vs Buildium', href: '/compare/buildium/' },
      { label: 'Revun vs DoorLoop', href: '/compare/doorloop/' },
    ],
  },
}

import { generatedBlogPosts } from './blog-posts-generated'

export const blogPosts: Record<string, BlogPost> = { ...baseBlogPosts, ...generatedBlogPosts }
export const blogSlugs = Object.keys(blogPosts)
