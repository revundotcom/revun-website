import type { AudienceVisuals } from './types'

export const reitsVisuals: AudienceVisuals = {
  slug: 'reits',
  heroImage: {
    src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85',
    alt: 'Modern high-rise residential buildings against a city skyline',
  },
  heroBadgeLabel: 'For REITs & Asset Managers',
  stats: [
    {
      value: '50K+',
      label: 'Units under management',
      sub: 'Single portfolio command layer across every entity and asset class',
    },
    {
      value: '8x',
      label: 'Faster quarterly reporting',
      sub: 'Multi-entity consolidation in hours, not a three-week fire drill',
    },
    {
      value: '99.99%',
      label: 'API uptime, SOC 2 Type II',
      sub: 'Audit-ready permission architecture with full change history',
    },
  ],
  testimonial: {
    quote:
      'We inherited seven property management systems across three acquisitions. Revun became the consolidation layer on top of Yardi and MRI, and our quarterly board reporting went from a 19-day scramble to a two-day close. That alone paid for the platform.',
    name: 'Margaret Chen',
    title: 'SVP, Asset Management',
    company: 'Northbridge Residential REIT',
    location: 'Toronto, ON',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=256&q=90',
  },
  integrations: [
    { name: 'Yardi Voyager', category: 'PM platform' },
    { name: 'MRI Software', category: 'PM platform' },
    { name: 'RealPage', category: 'PM platform' },
    { name: 'Sage Intacct', category: 'Accounting' },
    { name: 'SAP', category: 'ERP' },
    { name: 'Workday', category: 'ERP' },
  ],
}
