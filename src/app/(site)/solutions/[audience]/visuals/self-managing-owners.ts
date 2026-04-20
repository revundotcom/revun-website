import type { AudienceVisuals } from './types'

export const selfManagingOwnersVisuals: AudienceVisuals = {
  slug: 'self-managing-owners',
  heroImage: {
    src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1400&q=85',
    alt: 'Self-managing landlord reviewing rental paperwork at a home desk',
  },
  heroBadgeLabel: 'For Self-Managing Owners',
  stats: [
    {
      value: '14 hrs',
      label: 'Reclaimed each month',
      sub: 'No more chasing e-transfers or rebuilding spreadsheets',
    },
    {
      value: '97%',
      label: 'On-time rent collection',
      sub: 'Automated reminders and pre-authorized debits across units',
    },
    {
      value: '11 days',
      label: 'Average time to fill a vacancy',
      sub: 'Syndicated listings plus screening in a single workflow',
    },
  ],
  testimonial: {
    quote:
      'I replaced Kijiji, a shared Google Sheet, and a stack of PDF leases with Revun and got roughly ten hours of my weekends back every month across my four doors.',
    name: 'Priya Rana',
    title: 'Triplex owner',
    company: 'Rana Family Rentals',
    location: 'Mississauga, ON',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=90',
  },
  integrations: [
    { name: 'Kijiji', category: 'Listings' },
    { name: 'Rentals.ca', category: 'Listings' },
    { name: 'Interac e-Transfer', category: 'Payments' },
    { name: 'QuickBooks Self-Employed', category: 'Accounting' },
    { name: 'TurboTax', category: 'Tax' },
    { name: 'Google Sheets', category: 'Tracking' },
  ],
}
