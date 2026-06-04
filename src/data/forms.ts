/** Forms silo data: per-state residential lease agreement requirement pages. */
export interface FormPage {
  slug: string
  state: string
  abbr: string
  metaTitle: string
  description: string
  intro: string
  requiredDisclosures: { name: string; detail: string }[]
  mandatoryClauses: string[]
  prohibitedTerms: string[]
  bestPractices: string[]
  statute: string
  statuteUrl: string
  faqs: { q: string; a: string }[]
}

import { generatedForms } from './forms-generated'

export const forms: Record<string, FormPage> = generatedForms
export const formSlugs = Object.keys(forms).sort((a, b) => forms[a].state.localeCompare(forms[b].state))
