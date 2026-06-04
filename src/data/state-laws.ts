/**
 * State landlord-tenant law silo data.
 *
 * - baseStateLaws: hand-verified flagship states (CA, TX, FL).
 * - generatedStateLaws: 48 jurisdictions produced + source-verified by the
 *   revun-state-law-silo research workflow.
 *
 * The route imports stateLaws + stateLawSlugs from here.
 */
export type {
  StateLaw,
  StateLocalData,
  LawQuickFact,
  LawTopic,
} from './state-laws-base'

import { baseStateLaws, type StateLaw } from './state-laws-base'
import { generatedStateLaws } from './state-laws-generated'

export const stateLaws: Record<string, StateLaw> = {
  ...generatedStateLaws,
  ...baseStateLaws, // hand-verified flagship states win on any slug collision
}

/* Sorted alphabetically by state name for stable hub + sitemap ordering. */
export const stateLawSlugs = Object.keys(stateLaws).sort((a, b) =>
  stateLaws[a].state.localeCompare(stateLaws[b].state)
)
