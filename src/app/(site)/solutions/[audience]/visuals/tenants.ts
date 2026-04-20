import type { AudienceVisuals } from './types'

export const tenantsVisuals: AudienceVisuals = {
  slug: 'tenants',
  heroImage: {
    src: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&w=1400&q=85',
    alt: 'Modern sunlit apartment interior where a renter manages their tenancy',
  },
  heroBadgeLabel: 'For Tenants',
  stats: [
    {
      value: '+42 pts',
      label: 'Avg. credit score lift',
      sub: 'From 12 months of on-time rent reporting',
    },
    {
      value: '<36 hrs',
      label: 'Avg. maintenance resolution',
      sub: 'From request submitted to issue closed',
    },
    {
      value: '$0',
      label: 'Tenant fees on Revun',
      sub: '4.9 out of 5 average renter rating',
    },
  ],
  testimonial: {
    quote:
      'I used to send rent by e-Transfer and pray my landlord kept a record. Since switching to Revun, every payment is logged, my credit score is up 58 points from rent reporting, and the one time my dishwasher died it was fixed in under 24 hours.',
    name: 'Priya Anand',
    title: 'Software Engineer, Tenant since 2022',
    company: 'Maplewood Residential Group',
    location: 'Toronto, ON',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=90',
  },
  integrations: [
    { name: 'Interac e-Transfer', category: 'Payments' },
    { name: 'Venmo', category: 'Payments' },
    { name: 'Paper receipts', category: 'Documents' },
    { name: 'SMS with landlord', category: 'Messaging' },
    { name: 'Email lease threads', category: 'Documents' },
  ],
}
