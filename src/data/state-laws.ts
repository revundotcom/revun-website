/**
 * State landlord-tenant law silo for /laws/[slug] pages.
 *
 * Each record is a comprehensive, source-verified per-state guide targeting
 * "{state} landlord tenant law", "{state} eviction process", "{state} security
 * deposit law", and "{state} rent increase" intent. Content is general
 * information, not legal advice; every page carries a verify-current-statute
 * disclaimer and cites the governing statute.
 *
 * Numbers here were verified against authoritative sources (state statutes,
 * AG/consumer-protection guidance, apartment associations) as of the
 * reviewedDate. Update reviewedDate when a fact is re-verified.
 */

export interface LawQuickFact {
  label: string
  value: string
}

export interface LawTopic {
  id: string
  heading: string
  paragraphs: string[]
  bullets?: string[]
}

export interface StateLaw {
  slug: string
  state: string
  abbr: string
  metaTitle: string
  description: string
  reviewedDate: string
  landlordFriendliness: string
  statute: string
  statuteUrl: string
  intro: string
  quickFacts: LawQuickFact[]
  topics: LawTopic[]
  faqs: { q: string; a: string }[]
}

export const stateLaws: Record<string, StateLaw> = {
  'california-landlord-tenant-law': {
    slug: 'california-landlord-tenant-law',
    state: 'California',
    abbr: 'CA',
    metaTitle: 'California Landlord Tenant Law (2026): Deposits, Eviction, Rent | Revun',
    description:
      'A clear guide to California landlord-tenant law in 2026: security deposit limits under AB 12, the 21-day return rule, AB 1482 rent caps, rent-increase notice, and the eviction process.',
    reviewedDate: '2026-06-04',
    landlordFriendliness: 'Tenant-protective',
    statute: 'California Civil Code 1940 et seq. and the Tenant Protection Act (AB 1482)',
    statuteUrl: 'https://leginfo.legislature.ca.gov/faces/codes_displayexpandedbranch.xhtml?tocCode=CIV',
    intro:
      'California is one of the most tenant-protective states in the country. Statewide rent caps under the Tenant Protection Act, just-cause eviction rules, and a one-month security deposit limit all shape how owners and managers operate here. This guide covers the rules that matter most for day-to-day property operations, with the governing statute cited so you can verify the detail.',
    quickFacts: [
      { label: 'Security deposit limit', value: 'One month rent (two months for qualifying small landlords)' },
      { label: 'Deposit return deadline', value: '21 days after move-out' },
      { label: 'Statewide rent cap', value: 'Yes, AB 1482: 5% plus CPI, capped at 10% per year' },
      { label: 'Nonpayment eviction notice', value: '3-day notice to pay or quit' },
    ],
    topics: [
      {
        id: 'security-deposits',
        heading: 'Security deposits',
        paragraphs: [
          'As of July 1, 2024, AB 12 limits security deposits to one month of rent, whether the unit is furnished or unfurnished. This replaced the old rule that allowed two months for unfurnished and three months for furnished units.',
          'A narrow small-landlord exception allows up to two months of rent. It applies only when the owner is a natural person, an LLC whose members are all natural persons, or a family trust, and owns no more than two residential rental properties totalling no more than four units. The exception does not apply when the tenant is a service member.',
          'The landlord must return the deposit, with an itemized statement of any deductions, within 21 days after the tenant moves out. For deductions effective January 1, 2026, landlords must also provide photographs documenting the unit condition at move-in, move-out, and after any repairs or cleaning.',
        ],
      },
      {
        id: 'rent-control',
        heading: 'Rent increases and AB 1482',
        paragraphs: [
          'The Tenant Protection Act (AB 1482) caps annual rent increases for most residential units at 5% plus the regional change in the cost of living, with a hard ceiling of 10% in any 12-month period, whichever is lower. Some units are exempt, including certain single-family homes not owned by a corporation and housing built within the last 15 years.',
          'Notice requirements scale with the size of the increase: at least 30 days written notice for a cumulative increase of 10% or less over the prior 12 months, and at least 90 days for an increase above 10%.',
        ],
      },
      {
        id: 'eviction',
        heading: 'The eviction process',
        paragraphs: [
          'Eviction in California begins with the correct written notice. For nonpayment of rent, the landlord serves a 3-day notice to pay or quit. For a curable lease violation, a 3-day notice to cure or quit applies.',
          'For units covered by AB 1482, the landlord must have a just cause to end a tenancy once the tenant has occupied the unit for 12 months, and no-fault terminations can require relocation assistance. If the tenant does not comply with a valid notice, the landlord files an unlawful detainer action; self-help eviction is illegal.',
        ],
      },
      {
        id: 'tenant-rights',
        heading: 'Key tenant rights and landlord duties',
        paragraphs: [
          'Landlords must maintain habitable housing under the implied warranty of habitability and provide proper notice, generally 24 hours, before entering an occupied unit except in emergencies. Retaliation against tenants who exercise their legal rights is prohibited.',
        ],
        bullets: [
          'Habitable conditions: working plumbing, heat, electrical, and weatherproofing',
          'Entry notice: generally 24 hours written notice for non-emergency entry',
          'Anti-retaliation and anti-discrimination protections apply',
        ],
      },
    ],
    faqs: [
      { q: 'How much can a landlord charge for a security deposit in California?', a: 'One month of rent as of July 1, 2024 under AB 12, regardless of furnishing. Qualifying small landlords (a natural person, family trust, or LLC of natural persons owning no more than two properties and four units) may charge up to two months, except for service-member tenants.' },
      { q: 'How long does a California landlord have to return a deposit?', a: 'Within 21 days after the tenant moves out, with an itemized statement of any deductions.' },
      { q: 'How much can rent be raised in California?', a: 'For units covered by AB 1482, the cap is 5% plus the regional cost-of-living change, with a maximum of 10% in any 12-month period. Some units are exempt.' },
      { q: 'How much notice is required to raise rent in California?', a: 'At least 30 days for a cumulative increase of 10% or less in the prior 12 months, and at least 90 days for an increase above 10%.' },
    ],
  },
  'texas-landlord-tenant-law': {
    slug: 'texas-landlord-tenant-law',
    state: 'Texas',
    abbr: 'TX',
    metaTitle: 'Texas Landlord Tenant Law (2026): Deposits, Eviction, Rent | Revun',
    description:
      'A clear guide to Texas landlord-tenant law in 2026: no security deposit cap, the 30-day return rule, the 3-day notice to vacate, eviction process, and rent rules with no statewide rent control.',
    reviewedDate: '2026-06-04',
    landlordFriendliness: 'Landlord-friendly',
    statute: 'Texas Property Code, Chapters 91, 92, and 24',
    statuteUrl: 'https://statutes.capitol.texas.gov/Docs/PR/htm/PR.92.htm',
    intro:
      'Texas is one of the most landlord-friendly states in the country. There is no statewide rent control, no statutory cap on security deposits, and a relatively streamlined eviction process. The rules that follow govern deposits, notices, and evictions for residential tenancies under the Texas Property Code.',
    quickFacts: [
      { label: 'Security deposit limit', value: 'No statutory cap' },
      { label: 'Deposit return deadline', value: '30 days after move-out (with forwarding address)' },
      { label: 'Statewide rent control', value: 'None' },
      { label: 'Nonpayment eviction notice', value: '3-day notice to vacate (lease may vary)' },
    ],
    topics: [
      {
        id: 'security-deposits',
        heading: 'Security deposits',
        paragraphs: [
          'Texas does not cap the amount a landlord can charge for a security deposit. The market and the lease set the amount.',
          'After a tenant moves out, the landlord must refund the deposit, less any lawful deductions, within 30 days. The tenant must provide a forwarding address for the refund obligation to apply. If the landlord withholds part of the deposit, an itemized list of deductions is generally required.',
        ],
      },
      {
        id: 'rent-control',
        heading: 'Rent increases',
        paragraphs: [
          'There is no statewide rent control in Texas and no cap on how much rent can be increased. For a month-to-month tenancy, a landlord generally provides at least 30 days written notice before raising the rent. For a fixed-term lease, rent cannot be raised mid-term unless the lease allows it.',
        ],
      },
      {
        id: 'eviction',
        heading: 'The eviction process',
        paragraphs: [
          'Before filing an eviction suit, a Texas landlord must deliver a written notice to vacate. The default period is at least 3 days, though the lease may specify a different length.',
          'If the tenant does not move out, the landlord files a forcible detainer (eviction) suit in justice court. Texas evictions move relatively quickly, but the landlord must follow the statutory steps; self-help measures such as changing locks or shutting off utilities are restricted by statute.',
        ],
      },
      {
        id: 'tenant-rights',
        heading: 'Key tenant rights and landlord duties',
        paragraphs: [
          'Even in a landlord-friendly state, landlords must make a diligent effort to repair conditions that materially affect health or safety after proper notice, and there are statutory rules around security devices like locks and smoke alarms.',
        ],
        bullets: [
          'Duty to repair conditions affecting health or safety after proper notice',
          'Statutory requirements for locks, security devices, and smoke alarms',
          'Restrictions on lockouts and utility shutoffs as eviction tactics',
        ],
      },
    ],
    faqs: [
      { q: 'Is there a security deposit limit in Texas?', a: 'No. Texas does not cap security deposits; the amount is set by the lease and the market.' },
      { q: 'How long does a Texas landlord have to return a deposit?', a: 'Within 30 days after the tenant moves out, provided the tenant gave a forwarding address.' },
      { q: 'Can a landlord raise rent any amount in Texas?', a: 'Yes. There is no statewide rent control. For month-to-month tenancies, landlords generally give at least 30 days notice; fixed-term rent cannot change mid-lease unless the lease allows it.' },
      { q: 'How much notice before eviction in Texas?', a: 'At least a 3-day written notice to vacate by default, unless the lease specifies a different period.' },
    ],
  },
  'florida-landlord-tenant-law': {
    slug: 'florida-landlord-tenant-law',
    state: 'Florida',
    abbr: 'FL',
    metaTitle: 'Florida Landlord Tenant Law (2026): Deposits, Eviction, Rent | Revun',
    description:
      'A clear guide to Florida landlord-tenant law in 2026 under Chapter 83: security deposit return timelines, the 3-day notice for nonpayment, eviction process, and rent rules.',
    reviewedDate: '2026-06-04',
    landlordFriendliness: 'Landlord-friendly',
    statute: 'Florida Statutes Chapter 83, Part II (Florida Residential Landlord and Tenant Act)',
    statuteUrl: 'https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0000-0099/0083/0083.html',
    intro:
      'Florida residential tenancies are governed by Chapter 83, Part II of the Florida Statutes, the Florida Residential Landlord and Tenant Act, which supersedes local rules on deposits, notices, and evictions. Florida has no statewide rent control. This guide covers the deposit, notice, and eviction rules operators rely on most.',
    quickFacts: [
      { label: 'Security deposit limit', value: 'No statutory cap' },
      { label: 'Deposit return deadline', value: '15 days, or 30 days with a written claim notice' },
      { label: 'Statewide rent control', value: 'None' },
      { label: 'Nonpayment eviction notice', value: '3-day notice (excludes weekends and holidays)' },
    ],
    topics: [
      {
        id: 'security-deposits',
        heading: 'Security deposits',
        paragraphs: [
          'Florida does not cap security deposit amounts. What is tightly regulated is how the deposit is held and returned. Within 30 days of receiving a deposit, the landlord must give the tenant written notice of how the deposit is held.',
          'After the tenant moves out, if the landlord does not intend to make any claim, the deposit must be returned within 15 days. If the landlord intends to keep part of the deposit, the landlord must send written notice of the claim within 30 days; the tenant then has 15 days to object before deductions are finalized.',
        ],
      },
      {
        id: 'rent-control',
        heading: 'Rent increases',
        paragraphs: [
          'Florida has no statewide rent control and no cap on rent increases. For a fixed-term lease, rent cannot change mid-term unless the lease provides for it. For a month-to-month tenancy, the tenancy and any increase generally require at least 30 days written notice before the end of a monthly period.',
        ],
      },
      {
        id: 'eviction',
        heading: 'The eviction process',
        paragraphs: [
          'For nonpayment of rent, a Florida landlord serves a 3-day notice to pay or vacate, and the three days exclude weekends and legal holidays. For other lease violations, a 7-day notice to cure or a 7-day unconditional notice may apply depending on the violation.',
          'If the tenant does not comply, the landlord files an eviction action in county court. Florida prohibits self-help eviction, including lockouts and utility shutoffs.',
        ],
      },
      {
        id: 'tenant-rights',
        heading: 'Key tenant rights and landlord duties',
        paragraphs: [
          'Landlords must comply with building, housing, and health codes and maintain the dwelling in habitable condition. Reasonable notice, generally at least 12 hours, is required before entering for repairs, and entry must be at a reasonable time.',
        ],
        bullets: [
          'Compliance with building, housing, and health codes',
          'Entry generally requires at least 12 hours notice at a reasonable time',
          'Self-help eviction (lockouts, utility shutoffs) is prohibited',
        ],
      },
    ],
    faqs: [
      { q: 'Is there a security deposit limit in Florida?', a: 'No. Florida does not cap security deposits, but it strictly regulates how deposits are held and returned under Chapter 83.' },
      { q: 'How long does a Florida landlord have to return a deposit?', a: 'Within 15 days if no deductions are claimed. If the landlord intends to keep part of it, the landlord must send written notice of the claim within 30 days, and the tenant has 15 days to object.' },
      { q: 'Is there rent control in Florida?', a: 'No. Florida has no statewide rent control and no cap on rent increases. Fixed-term rent cannot change mid-lease unless the lease allows it.' },
      { q: 'How much notice for nonpayment eviction in Florida?', a: 'A 3-day notice to pay or vacate, excluding weekends and legal holidays.' },
    ],
  },
}

export const stateLawSlugs = Object.keys(stateLaws)
