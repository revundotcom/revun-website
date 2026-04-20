/**
 * Per-audience visual + content config that the shared /solutions/[audience]/ client
 * consumes to render audience-specific hero imagery, stats, testimonials, and integrations.
 */
export interface AudienceStat {
  value: string
  label: string
  sub?: string
}

export interface AudienceTestimonial {
  quote: string
  name: string
  title: string
  company: string
  location: string
  photo: string
}

export interface AudienceIntegration {
  name: string
  category: string
}

export interface AudienceVisuals {
  slug: string
  heroImage: { src: string; alt: string }
  heroBadgeLabel: string
  stats: [AudienceStat, AudienceStat, AudienceStat]
  testimonial: AudienceTestimonial
  integrations: AudienceIntegration[]
}
