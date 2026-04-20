import type { AudienceVisuals } from './types'

export const brokeragesVisuals: AudienceVisuals = {
  slug: 'brokerages',
  heroImage: {
    src: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=85',
    alt: 'Real estate agent showing a modern home to clients',
  },
  heroBadgeLabel: 'For Brokerages & Agents',
  stats: [
    {
      value: '62%',
      label: 'less admin time per agent',
      sub: 'Offer prep, disclosures, and compliance forms auto-populated from CRM',
    },
    {
      value: '2.4x',
      label: 'faster offer turnaround',
      sub: 'From showing request to signed offer in under 24 hours',
    },
    {
      value: '+9',
      label: 'extra deals per agent, per year',
      sub: 'Reclaimed pipeline time converted into closed transactions',
    },
  ],
  testimonial: {
    quote:
      'We cut 14 hours of admin per agent every week and closed 31% more deals last quarter. Offers, FINTRAC checks, and compliance packets now move in one flow instead of five tools.',
    name: 'Priya Basra',
    title: 'Managing Broker',
    company: 'Harbourline Realty',
    location: 'Toronto, ON',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&q=90',
  },
  integrations: [
    { name: 'Follow Up Boss', category: 'CRM' },
    { name: 'kvCORE', category: 'CRM' },
    { name: 'Lone Wolf', category: 'Back Office' },
    { name: 'DocuSign', category: 'Signatures' },
    { name: 'Matrix MLS', category: 'MLS' },
    { name: 'BrokerWOLF', category: 'Accounting' },
  ],
}
