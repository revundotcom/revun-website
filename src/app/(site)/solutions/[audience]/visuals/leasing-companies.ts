import type { AudienceVisuals } from './types'

export const leasingCompaniesVisuals: AudienceVisuals = {
  slug: 'leasing-companies',
  heroImage: {
    src: 'https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?auto=format&fit=crop&w=1400&q=85',
    alt: 'Lease agreement being signed with keys on the table',
  },
  heroBadgeLabel: 'For Leasing Companies',
  stats: [
    {
      value: '71%',
      label: 'Faster time-to-lease',
      sub: 'From application to signed lease in under 48 hours',
    },
    {
      value: '3.4x',
      label: 'More applications processed',
      sub: 'Per leasing agent, per month, without extra headcount',
    },
    {
      value: '99.2%',
      label: 'ID verification pass rate',
      sub: 'Automated compliance checks across every applicant',
    },
  ],
  testimonial: {
    quote:
      'We used to spend six hours per lease between chasing applications, generating documents, and running compliance checks. Revun pulled that down to under forty minutes. My team now closes 280+ leases a month with the same headcount, and every file is audit-ready because ID verification and compliance automation run before a lease ever hits my desk.',
    name: 'Marissa Whelan',
    title: 'Director of Leasing Operations',
    company: 'Northbridge Residential',
    location: 'Toronto, ON',
    photo:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=90',
  },
  integrations: [
    { name: 'RENTCafe CRM', category: 'Lease CRM' },
    { name: 'Entrata Leasing', category: 'Lease CRM' },
    { name: 'Knock', category: 'Leasing CRM' },
    { name: 'ShowMojo', category: 'Tour scheduling' },
    { name: 'Persona', category: 'ID verification' },
    { name: 'Plaid', category: 'Income verification' },
  ],
}
