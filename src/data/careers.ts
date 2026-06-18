export interface Role {
  slug: string
  title: string
  department: string
  /** "Full-time" | "Part-time" | "Contract" | "Internship" */
  type: string
  city: string
  province: string
  country: 'Canada' | 'United States'
  /** Display string for the hero meta row, e.g.
   *  "Toronto, ON · Canada · Hybrid". */
  locationDisplay: string
  /** Pattern: ABC-YYYY-NNN. */
  jobId: string
  postingStartDate: string
  /** Display string, e.g. "$75,000 plus commission and benefits". */
  compensation: string
  summary: string
  responsibilities: string[]
  requiredSkills: string[]
  goodToHaveSkills: string[]
  educationAndExperience: string[]
  additionalInfo: string | null
  relocationAssistance: boolean
}

export const ROLES: Role[] = [
  {
    slug: 'senior-leasing-agent-toronto',
    title: 'Senior Leasing Agent',
    department: 'Leasing; Operations',
    type: 'Full-time',
    city: 'Toronto',
    province: 'Ontario',
    country: 'Canada',
    locationDisplay: 'Toronto, ON · Canada · Hybrid',
    jobId: 'RV-2026-001',
    postingStartDate: '2026-06-10',
    compensation: '$75,000 plus commission and benefits',
    summary:
      'We are seeking an experienced Senior Leasing Agent to manage the full lead-to-lease cycle for a residential portfolio in the GTA.',
    responsibilities: [
      'Own the full lead-to-lease cycle for a portfolio of GTA properties.',
      'Conduct in-person and virtual showings on a structured schedule.',
      'Run applicant qualification using the bank-grade rubric.',
      'Coordinate with property managers and owners on move-in handover.',
      'Maintain CRM hygiene: every lead, showing, and application tracked.',
    ],
    requiredSkills: [
      'Strong sales and communication skills with a leasing track record.',
      'Comfort with digital lead-management tools and CRM workflows.',
      'Active RECO registration in good standing.',
      'Self-managed schedule with strong organisational discipline.',
    ],
    goodToHaveSkills: [
      'Experience with multi-unit lease-up campaigns.',
      'Familiarity with Toronto-area rental sub-markets.',
      'AppFolio, Yardi, or similar PM platform experience.',
    ],
    educationAndExperience: [
      'Active RECO registration (Ontario).',
      '3+ years of residential leasing experience in the GTA.',
    ],
    additionalInfo:
      'Toronto-based, hybrid schedule with regular field showings across the GTA.',
    relocationAssistance: false,
  },
  {
    slug: 'director-of-operations-toronto',
    title: 'Director of Operations',
    department: 'Operations; Leadership',
    type: 'Full-time',
    city: 'Toronto',
    province: 'Ontario',
    country: 'Canada',
    locationDisplay: 'Toronto, ON · Canada · Hybrid',
    jobId: 'RV-2026-002',
    postingStartDate: '2026-06-10',
    compensation: '$145,000 plus performance bonus and benefits',
    summary:
      'We are seeking an experienced Director of Operations to build and lead our function across North America.',
    responsibilities: [
      'Build and lead the operations function across Canadian and US markets.',
      'Set process and performance standards for every owner-file.',
      'Manage hiring plans, capacity forecasting, and territory coverage.',
      'Own KPI reporting: time-to-lease, applicant approval accuracy, owner renewal.',
    ],
    requiredSkills: [
      'Proven operations leadership in residential real estate.',
      'Demonstrated ability to scale a team from scratch.',
      'Strong commercial and analytical instincts.',
    ],
    goodToHaveSkills: [
      'Experience launching a US market from a Canadian base.',
      'Familiarity with HubSpot, Salesforce, or AppFolio.',
    ],
    educationAndExperience: [
      'Bachelor’s in Business, Real Estate, or related field.',
      '8+ years in residential leasing or property management.',
    ],
    additionalInfo: 'Toronto-based, with regular travel to active markets.',
    relocationAssistance: true,
  },
  {
    slug: 'marketing-coordinator-toronto',
    title: 'Marketing Coordinator',
    department: 'Marketing; Operations',
    type: 'Full-time',
    city: 'Toronto',
    province: 'Ontario',
    country: 'Canada',
    locationDisplay: 'Toronto, ON · Canada · Hybrid',
    jobId: 'RV-2026-003',
    postingStartDate: '2026-06-10',
    compensation: '$65,000 plus benefits',
    summary:
      'We are seeking a Marketing Coordinator to own listings marketing and digital presence for our active portfolio.',
    responsibilities: [
      'Write conversion-focused listings copy.',
      'Manage listings across Zillow, Rentals.ca, Facebook Marketplace.',
      'Run targeted paid lead-generation campaigns.',
    ],
    requiredSkills: [
      'Strong writing skills.',
      'Familiarity with rental listing platforms and the paid social stack.',
    ],
    goodToHaveSkills: [
      'Canva, Figma, or other lightweight design tools.',
      'HubSpot, Mailchimp, or similar.',
    ],
    educationAndExperience: [
      'Degree in Marketing, Communications, or related field.',
      '2+ years in marketing.',
    ],
    additionalInfo: 'Hybrid schedule, 3 days/week in-office.',
    relocationAssistance: false,
  },
  {
    slug: 'tenant-placement-coordinator-remote',
    title: 'Tenant Placement Coordinator',
    department: 'Operations',
    type: 'Full-time',
    city: 'Remote',
    province: 'Remote — North America',
    country: 'Canada',
    locationDisplay: 'Remote · North America',
    jobId: 'RV-2026-004',
    postingStartDate: '2026-06-10',
    compensation: '$65,000 plus benefits',
    summary:
      'We are seeking a Tenant Placement Coordinator to manage the lead-to-lease workflow across our Canadian and US markets.',
    responsibilities: [
      'Field inbound applicant inquiries and route to the right agent.',
      'Schedule showings, send reminders, chase no-shows.',
      'Run background, credit, and income checks.',
    ],
    requiredSkills: [
      'Strong written and verbal communication.',
      'Detail-oriented with strong follow-through.',
    ],
    goodToHaveSkills: [
      'Familiarity with Canadian and US background-check providers.',
    ],
    educationAndExperience: [
      'Post-secondary diploma or degree.',
      '2+ years in property management or tenant services.',
    ],
    additionalInfo:
      'Fully remote within North America. Office-equipment stipend on start.',
    relocationAssistance: false,
  },
]

/* ── Helpers ───────────────────────────────────────────────────── */

export function getRoleBySlug(slug: string): Role | undefined {
  return ROLES.find((r) => r.slug === slug)
}

export function getAllRoleSlugs(): string[] {
  return ROLES.map((r) => r.slug)
}

export interface CityGroup {
  city: string
  roles: Role[]
}
export interface RegionGroup {
  region: string
  country: 'Canada' | 'United States'
  cities: CityGroup[]
}

/** Group roles by province/state, then by city. Used by the careers
 *  landing page to render a hierarchical list. */
export function getRolesByRegion(): RegionGroup[] {
  const order: string[] = []
  const map = new Map<
    string,
    { country: 'Canada' | 'United States'; cityOrder: string[]; cityMap: Map<string, Role[]> }
  >()

  for (const role of ROLES) {
    if (!map.has(role.province)) {
      order.push(role.province)
      map.set(role.province, { country: role.country, cityOrder: [], cityMap: new Map() })
    }
    const region = map.get(role.province)!
    if (!region.cityMap.has(role.city)) {
      region.cityOrder.push(role.city)
      region.cityMap.set(role.city, [])
    }
    region.cityMap.get(role.city)!.push(role)
  }

  return order.map((province) => {
    const region = map.get(province)!
    return {
      region: province,
      country: region.country,
      cities: region.cityOrder.map((city) => ({ city, roles: region.cityMap.get(city)! })),
    }
  })
}
