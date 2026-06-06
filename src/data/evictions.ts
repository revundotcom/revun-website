/** Eviction-process silo data (built to the SERP-teardown spec). */
export interface EvictionGuide {
  slug: string
  state: string
  abbr: string
  metaTitle: string
  description: string
  quickAnswer: string
  atAGlance: {
    grounds: string
    minNotice: string
    whereToFile: string
    filingFee: string
    typicalTimeframe: string
  }
  noticeTypes: { name: string; period: string; detail: string }[]
  steps: { title: string; timeframe: string; detail: string }[]
  costs: string
  tenantDefenses: string[]
  afterJudgment: string
  statute: string
  statuteUrl: string
  faqs: { q: string; a: string }[]
}

import { generatedEvictions } from './evictions-generated'
import { caEvictions } from './evictions-ca-generated'

export const evictions: Record<string, EvictionGuide> = { ...generatedEvictions, ...caEvictions }
export const evictionSlugs = Object.keys(evictions).sort((a, b) =>
  evictions[a].state.localeCompare(evictions[b].state)
)
