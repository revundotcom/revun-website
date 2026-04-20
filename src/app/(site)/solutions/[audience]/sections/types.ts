/**
 * Contract for audience-specific section extensions.
 * Each audience exports a single React component that renders 2-3 unique sections
 * tailored to that audience's narrative. The shared client mounts it between the
 * Features section and the Testimonial section.
 */
export type AudienceSectionsComponent = React.ComponentType
