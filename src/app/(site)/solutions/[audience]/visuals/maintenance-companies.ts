import type { AudienceVisuals } from './types'

export const maintenanceCompaniesVisuals: AudienceVisuals = {
  slug: 'maintenance-companies',
  heroImage: {
    src: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1400&q=85',
    alt: 'Maintenance technician completing a repair in a residential property',
  },
  heroBadgeLabel: 'For Maintenance Companies',
  stats: [
    {
      value: '62%',
      label: 'Faster dispatch',
      sub: 'From intake to tech on-site, vs. phone-based scheduling',
    },
    {
      value: '3.2 days',
      label: 'Average time to invoice',
      sub: 'Down from 14+ days with handwritten tickets',
    },
    {
      value: '40+',
      label: 'Technicians supported per dispatcher',
      sub: 'Mobile field app with photo proof of completion',
    },
  ],
  testimonial: {
    quote:
      'We cut dispatch time by more than half and now invoice the same week a job closes. Photo proof of completion has basically ended client disputes with our property manager accounts.',
    name: 'Marcus Delaney',
    title: 'Operations Lead',
    company: 'Northline Plumbing & Mechanical',
    location: 'Hamilton, ON',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=90',
  },
  integrations: [
    { name: 'Jobber', category: 'Field service' },
    { name: 'ServiceTitan', category: 'Field service' },
    { name: 'Housecall Pro', category: 'Dispatch' },
    { name: 'FieldPulse', category: 'Dispatch' },
    { name: 'Breezeway', category: 'Work order management' },
    { name: 'QuickBooks', category: 'Invoicing' },
  ],
}
