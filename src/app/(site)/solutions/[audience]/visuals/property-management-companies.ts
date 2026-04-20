import type { AudienceVisuals } from './types'

export const propertyManagementCompaniesVisuals: AudienceVisuals = {
  slug: 'property-management-companies',
  heroImage: {
    src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=85',
    alt: 'Property management team collaborating in a modern office',
  },
  heroBadgeLabel: 'For Property Management Companies',
  stats: [
    {
      value: '11',
      label: 'Point tools retired',
      sub: 'Consolidated PM, comms, maintenance, and reporting into one platform',
    },
    {
      value: '14 hrs',
      label: 'Saved per PM each week',
      sub: 'Less swivel-chair work across owners, tenants, and vendors',
    },
    {
      value: '+3.2%',
      label: 'NOI lift in year one',
      sub: 'Driven by a 98.4% on-time collection rate and faster turns',
    },
  ],
  testimonial: {
    quote:
      'We were running Buildium plus nine other tools across three regions. After moving our 320-unit portfolio onto Revun, our on-time collections climbed from 91% to 98%, turn time dropped by six days, and my PMs finally have one screen instead of ten.',
    name: 'Priya Shah',
    title: 'Director of Operations',
    company: 'Northbridge Residential',
    location: 'Toronto, ON',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=90',
  },
  integrations: [
    { name: 'Buildium', category: 'PM platform' },
    { name: 'AppFolio', category: 'PM platform' },
    { name: 'Yardi Breeze', category: 'PM platform' },
    { name: 'DoorLoop', category: 'PM platform' },
    { name: 'Rent Manager', category: 'PM platform' },
    { name: 'Propertyware', category: 'PM platform' },
  ],
}
