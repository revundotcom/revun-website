import type { AudienceVisuals } from './types'

export const internalOpsTeamsVisuals: AudienceVisuals = {
  slug: 'internal-ops-teams',
  heroImage: {
    src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=85',
    alt: 'Operations team collaborating around laptops and dashboards in an open office',
  },
  heroBadgeLabel: 'For Internal Ops Teams',
  stats: [
    {
      value: '92%',
      label: 'Less task leakage',
      sub: 'Work no longer falls through Slack threads and spreadsheets',
    },
    {
      value: '< 15 min',
      label: 'Average response SLA',
      sub: 'Role-based routing gets requests to the right teammate fast',
    },
    {
      value: '1,800+',
      label: 'Automation runs / month',
      sub: 'Recurring ops workflows executed without manual follow-up',
    },
  ],
  testimonial: {
    quote:
      'Before Revun, half our operations lived in Slack DMs and a shared Google Sheet that nobody trusted. Within a quarter, task leakage was effectively gone, our first-response SLA dropped under fifteen minutes, and my team finally has one dashboard that tells us what is actually happening across our portfolio.',
    name: 'Meghan Doyle',
    title: 'Head of Operations',
    company: 'Northbridge Residential',
    location: 'Toronto, ON',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=90',
  },
  integrations: [
    { name: 'Slack', category: 'Messaging' },
    { name: 'Asana', category: 'Task tracking' },
    { name: 'Monday.com', category: 'Task tracking' },
    { name: 'Trello', category: 'Task tracking' },
    { name: 'Google Sheets', category: 'Spreadsheets' },
    { name: 'Notion', category: 'Docs' },
  ],
}
