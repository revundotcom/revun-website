/** Glossary silo data. Terms are produced by the revun-glossary-silo workflow. */
export interface GlossaryTerm {
  slug: string
  term: string
  metaTitle: string
  description: string
  category: string
  shortDefinition: string
  body: string[]
  example: string
  relatedTerms: string[]
  faqs: { q: string; a: string }[]
}

import { generatedGlossary } from './glossary-generated'

export const glossaryTerms: Record<string, GlossaryTerm> = generatedGlossary
export const glossarySlugs = Object.keys(glossaryTerms).sort((a, b) =>
  glossaryTerms[a].term.localeCompare(glossaryTerms[b].term)
)

/* Map a related-term display name to a glossary slug, when one exists. */
const byNormalizedName: Record<string, string> = Object.fromEntries(
  Object.values(glossaryTerms).map((t) => [t.term.toLowerCase().replace(/\(.*?\)/g, '').trim(), t.slug])
)
export function relatedSlug(displayName: string): string | null {
  const key = displayName.toLowerCase().replace(/\(.*?\)/g, '').trim()
  return byNormalizedName[key] ?? null
}
