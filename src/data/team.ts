export interface ExperienceEntry {
  role: string
  org: string
  period: string
}

export interface TeamMember {
  slug: string
  name: string
  role: string
  department: string
  office: string
  province: string
  country: string
  email: string
  /** null → phone row hidden on the card. */
  phone: string | null
  /** null → monogram fallback shown instead of a photo. */
  photoUrl: string | null
  photoAlt: string
  quote: string
  shortBio: string
  /* ── Profile-detail fields (consumed by /meet-the-team/<slug>/) ── */
  jurisdiction: string
  languages: string[]
  /** Long-form bio paragraphs. */
  overview: string[]
  relatedServices: string[]
  achievements: string[]
  experience: ExperienceEntry[]
  /** "Career & Education" bullet list. */
  education: string[]
}

export const TEAM: TeamMember[] = [
  {
    slug: 'alex-morgan',
    name: 'Alex Morgan',
    role: 'Director of Operations',
    department: 'Operations',
    office: 'Toronto',
    province: 'Ontario',
    country: 'Canada',
    email: 'amorgan@example.com',
    phone: null,
    photoUrl: null,
    photoAlt: 'Alex Morgan, Director of Operations',
    quote:
      'Execution discipline is what separates a good launch from a great one.',
    shortBio:
      'Director of Operations. Owns end-to-end execution across the pipeline, from intake to handover.',
    jurisdiction: 'Ontario, Canada',
    languages: ['English'],
    overview: [
      'Alex leads operations across the business, accountable for the operational performance of the leasing division: speed, quality, consistency, and client experience.',
      'Their remit covers execution discipline across teams and handoffs, SOPs and QA, KPI tracking and performance coaching, continuous improvement of the CRM pipeline and workflows, and the budgeting, forecasting, and capacity planning needed to scale volume without breaking quality.',
      'Alex joined after a decade in residential operations, where they held senior operations roles and built the playbooks the team runs on today.',
    ],
    relatedServices: [
      'Operational performance management',
      'KPI tracking and performance coaching',
      'SOPs, QA, and training reinforcement',
      'CRM pipeline and workflow automation',
      'Budgeting, forecasting, and capacity planning',
      'Contact-centre and back-office operations',
    ],
    achievements: [
      'Cut average time-to-lease by 31% across the GTA portfolio in 18 months.',
      'Stood up the QA rubric now used on every owner-file.',
      'Scaled the operations team from 4 to 22 without lowering the quality bar.',
    ],
    experience: [
      { role: 'Director of Operations', org: 'Current company', period: '2023 — Present' },
      { role: 'Senior Operations Manager', org: 'Residential portfolio operator', period: '2018 — 2023' },
      { role: 'Operations Lead', org: 'Property services firm', period: '2014 — 2018' },
    ],
    education: [
      'Bachelor of Commerce, Operations Management',
      'Lean Six Sigma — Green Belt',
    ],
  },
  {
    slug: 'priya-singh',
    name: 'Priya Singh',
    role: 'Head of Client Success',
    department: 'Client Success',
    office: 'Toronto',
    province: 'Ontario',
    country: 'Canada',
    email: 'psingh@example.com',
    phone: null,
    photoUrl: null,
    photoAlt: 'Priya Singh, Head of Client Success',
    quote: 'A small book and a real relationship. That is how trust compounds.',
    shortBio:
      'Head of Client Success. Owns the relationship from signed engagement through year-two renewal.',
    jurisdiction: 'Ontario, Canada',
    languages: ['English', 'Punjabi', 'Hindi'],
    overview: [
      'Priya owns the client relationship end-to-end, from a signed engagement through onboarding, adoption, and year-two renewal.',
      'She runs a deliberately small book so every owner gets a named lead, a real relationship, and proactive reporting instead of a ticket queue. Her team translates owner goals into operational plans and keeps the feedback loop tight between clients and the operations floor.',
      'Before leading Client Success here, Priya spent years in account management for residential operators, where she learned that retention is earned in the quiet months, not the renewal call.',
    ],
    relatedServices: [
      'Owner onboarding and account planning',
      'Quarterly business reviews and reporting',
      'Adoption and renewal management',
      'Escalation handling and resolution',
      'Voice-of-customer feedback into operations',
      'Relationship and retention strategy',
    ],
    achievements: [
      'Held net revenue retention above 110% across two consecutive years.',
      'Built the onboarding playbook that cut time-to-first-value in half.',
      'Personally retained the firm’s ten largest owner accounts through a pricing change.',
    ],
    experience: [
      { role: 'Head of Client Success', org: 'Current company', period: '2022 — Present' },
      { role: 'Senior Account Manager', org: 'Residential operator', period: '2017 — 2022' },
      { role: 'Client Relationship Manager', org: 'Property management group', period: '2013 — 2017' },
    ],
    education: [
      'Bachelor of Business Administration, Marketing',
      'Certified Customer Success Manager (CCSM)',
    ],
  },
  {
    slug: 'jordan-lee',
    name: 'Jordan Lee',
    role: 'Lead Underwriter',
    department: 'Underwriting',
    office: 'Toronto',
    province: 'Ontario',
    country: 'Canada',
    email: 'jlee@example.com',
    phone: null,
    photoUrl: null,
    photoAlt: 'Jordan Lee, Lead Underwriter',
    quote:
      'A shortlist with a written rationale beats a stack of applications, every time.',
    shortBio:
      'Lead Underwriter. Built the screening rubric used on every applicant: credit, income, references, and risk-flag detection.',
    jurisdiction: 'Ontario, Canada',
    languages: ['English', 'French'],
    overview: [
      'Jordan leads underwriting and applicant screening, owning the rubric applied to every applicant: credit, income verification, references, and risk-flag detection.',
      'The goal is a defensible shortlist with a written rationale for every recommendation, so owners can make a confident decision in minutes instead of second-guessing a stack of paperwork. Jordan also maintains the firm’s compliance posture around fair-housing and provincial screening rules.',
      'Jordan came up through credit and risk analysis before specialising in residential tenant underwriting, and now sets the standard the whole screening team works to.',
    ],
    relatedServices: [
      'Applicant screening and qualification',
      'Credit and income verification',
      'Reference and employment checks',
      'Risk-flag detection and fraud review',
      'Written underwriting rationale per applicant',
      'Fair-housing and provincial compliance',
    ],
    achievements: [
      'Designed the bank-grade screening rubric now used on every applicant.',
      'Reduced post-move-in payment incidents by 40% through tighter income verification.',
      'Built the fraud-flag checklist that catches falsified paystubs before approval.',
    ],
    experience: [
      { role: 'Lead Underwriter', org: 'Current company', period: '2021 — Present' },
      { role: 'Tenant Underwriter', org: 'Residential screening provider', period: '2016 — 2021' },
      { role: 'Credit & Risk Analyst', org: 'Financial services', period: '2012 — 2016' },
    ],
    education: [
      'Bachelor of Arts, Economics',
      'Certificate in Credit & Risk Analysis',
    ],
  },
]

export function getTeamMemberBySlug(slug: string): TeamMember | undefined {
  return TEAM.find((m) => m.slug === slug)
}

export function getAllTeamSlugs(): string[] {
  return TEAM.map((m) => m.slug)
}

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

/** Deterministic accent per member, drawn from the Revun blue palette
 *  (no off-brand gold/emerald). Used for the monogram fallback gradient. */
export function getMemberAccent(slug: string): 'sky' | 'blue' | 'navy' {
  let h = 0
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0
  const buckets: Array<'sky' | 'blue' | 'navy'> = ['sky', 'blue', 'navy']
  return buckets[h % buckets.length]
}
