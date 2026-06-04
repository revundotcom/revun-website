/**
 * Calculator/tool silo for /tools/[slug] pages.
 * Each entry pairs SEO content with an interactive calculator component
 * (resolved by slug in the route via CALCULATOR_MAP).
 */
export interface ToolPage {
  slug: string
  title: string
  metaTitle: string
  description: string
  category: string
  intro: string
  formula: string
  sections: { heading: string; paragraphs: string[] }[]
  faqs: { q: string; a: string }[]
  related: { label: string; href: string }[]
}

export const tools: Record<string, ToolPage> = {
  'rent-to-income-calculator': {
    slug: 'rent-to-income-calculator',
    title: 'Rent-to-Income Ratio Calculator',
    metaTitle: 'Rent to Income Ratio Calculator (Free) | Revun',
    description:
      'Free rent-to-income calculator. Enter monthly income and rent to see the percentage of income spent on rent and whether it meets the standard 30% guideline.',
    category: 'Leasing',
    intro:
      'The rent-to-income ratio is the fastest screen for whether an applicant can comfortably afford a unit. Enter the applicant gross monthly income and the rent to see the ratio and how it compares to the common 30% guideline.',
    formula: 'Rent-to-income ratio = (monthly rent / gross monthly income) x 100',
    sections: [
      {
        heading: 'What is a good rent-to-income ratio?',
        paragraphs: [
          'The widely used benchmark is the 30% rule: rent should consume no more than 30% of gross monthly income. Many operators also use an income-of-3x-rent threshold, which is the same idea expressed differently.',
          'In high-cost markets, a higher ratio can still be workable, especially for applicants with savings or strong credit. Treat the ratio as one input alongside credit, employment, and rental history, and apply the same standard to every applicant for fair-housing consistency.',
        ],
      },
    ],
    faqs: [
      { q: 'What is the 30% rule for rent?', a: 'It suggests spending no more than 30% of gross monthly income on rent. A $6,000 monthly income would point to about $1,800 in rent.' },
      { q: 'Should I use gross or net income?', a: 'The standard ratio uses gross (pre-tax) monthly income, which is how the 3x-rent benchmark is also calculated.' },
    ],
    related: [
      { label: 'Tenant screening in Revun', href: '/use-cases/tenant-screening/' },
      { label: 'All landlord tools', href: '/tools/' },
    ],
  },
  'prorated-rent-calculator': {
    slug: 'prorated-rent-calculator',
    title: 'Prorated Rent Calculator',
    metaTitle: 'Prorated Rent Calculator (Free) | Revun',
    description:
      'Free prorated rent calculator. Enter monthly rent, days in the month, and days occupied to get the exact prorated amount using the actual-days method.',
    category: 'Leasing',
    intro:
      'When a tenant moves in or out mid-month, you charge only for the days they occupy the unit. Enter the rent, the days in the month, and the days occupied to get the prorated amount.',
    formula: 'Prorated rent = (monthly rent / days in the month) x days occupied',
    sections: [
      {
        heading: 'How prorated rent is calculated',
        paragraphs: [
          'The most common and most defensible approach is the actual-days method: divide the monthly rent by the number of days in that specific month to get a daily rate, then multiply by the number of days the tenant occupies the unit.',
          'Some leases instead use a fixed 30-day divisor (the banker-month method). Whichever method you use, state it in the lease so the math is transparent and consistent for every tenant.',
        ],
      },
    ],
    faqs: [
      { q: 'How do you calculate prorated rent?', a: 'Divide the monthly rent by the number of days in the month to get the daily rate, then multiply by the days the tenant occupies the unit.' },
      { q: 'Which proration method should I use?', a: 'The actual-days method (using the real number of days in that month) is the most precise and the easiest to defend. State the method in the lease.' },
    ],
    related: [
      { label: 'Lease management in Revun', href: '/use-cases/lease-management/' },
      { label: 'All landlord tools', href: '/tools/' },
    ],
  },
  'cap-rate-calculator': {
    slug: 'cap-rate-calculator',
    title: 'Cap Rate Calculator',
    metaTitle: 'Cap Rate Calculator (Free) | Revun',
    description:
      'Free capitalization rate calculator. Enter annual net operating income and property value to get the cap rate, a core metric for comparing rental investments.',
    category: 'Investing',
    intro:
      'Capitalization rate measures the unlevered annual return on a property. Enter the annual net operating income and the property price or value to get the cap rate.',
    formula: 'Cap rate = (annual net operating income / property value) x 100',
    sections: [
      {
        heading: 'What is a good cap rate?',
        paragraphs: [
          'Cap rate expresses annual NOI as a percentage of value, so it lets you compare properties independent of financing. A higher cap rate implies higher return and usually higher risk; a lower cap rate implies a more stable, often more expensive market.',
          'Typical residential cap rates fall in a 4% to 10% band depending on the market, asset quality, and interest-rate environment. Use NOI that excludes mortgage payments, since cap rate is an unlevered measure.',
        ],
      },
    ],
    faqs: [
      { q: 'What is a good cap rate for rental property?', a: 'It varies by market, but many residential investors look for roughly 5% to 8%. Higher cap rates suggest more return and more risk.' },
      { q: 'Does cap rate include the mortgage?', a: 'No. Cap rate uses net operating income, which excludes debt service, so it measures the unlevered return.' },
    ],
    related: [
      { label: 'Revun for investors', href: '/investment/' },
      { label: 'All landlord tools', href: '/tools/' },
    ],
  },
  'cash-on-cash-return-calculator': {
    slug: 'cash-on-cash-return-calculator',
    title: 'Cash-on-Cash Return Calculator',
    metaTitle: 'Cash on Cash Return Calculator (Free) | Revun',
    description:
      'Free cash-on-cash return calculator. Enter annual pre-tax cash flow and total cash invested to measure the levered return on the actual cash you put in.',
    category: 'Investing',
    intro:
      'Cash-on-cash return measures the annual return on the actual cash you invested, after financing. Enter your annual pre-tax cash flow and total cash invested to get the percentage.',
    formula: 'Cash on cash return = (annual pre-tax cash flow / total cash invested) x 100',
    sections: [
      {
        heading: 'Cash-on-cash vs cap rate',
        paragraphs: [
          'Unlike cap rate, cash-on-cash return accounts for financing. It compares the cash you actually take home each year against the cash you actually put in, including the down payment, closing costs, and any upfront rehab.',
          'It is the better metric when you use a mortgage, because leverage can lift cash-on-cash return well above the property cap rate when the loan terms are favorable.',
        ],
      },
    ],
    faqs: [
      { q: 'What is a good cash-on-cash return?', a: 'Many rental investors target 8% or higher, but acceptable returns depend on the market, risk, and your alternatives.' },
      { q: 'What counts as cash invested?', a: 'The total out-of-pocket cash: down payment, closing costs, and any upfront renovation or make-ready spend.' },
    ],
    related: [
      { label: 'Revun for investors', href: '/investment/' },
      { label: 'All landlord tools', href: '/tools/' },
    ],
  },
}

export const toolSlugs = Object.keys(tools)
