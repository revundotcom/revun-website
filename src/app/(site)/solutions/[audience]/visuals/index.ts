import type { AudienceVisuals } from './types'
import { selfManagingOwnersVisuals } from './self-managing-owners'
import { propertyManagementCompaniesVisuals } from './property-management-companies'
import { brokeragesVisuals } from './brokerages'
import { leasingCompaniesVisuals } from './leasing-companies'
import { maintenanceCompaniesVisuals } from './maintenance-companies'
import { reitsVisuals } from './reits'
import { tenantsVisuals } from './tenants'
import { internalOpsTeamsVisuals } from './internal-ops-teams'

export type { AudienceVisuals } from './types'

export const audienceVisualsMap: Record<string, AudienceVisuals> = {
  'self-managing-owners': selfManagingOwnersVisuals,
  'property-management-companies': propertyManagementCompaniesVisuals,
  brokerages: brokeragesVisuals,
  'leasing-companies': leasingCompaniesVisuals,
  'maintenance-companies': maintenanceCompaniesVisuals,
  reits: reitsVisuals,
  tenants: tenantsVisuals,
  'internal-ops-teams': internalOpsTeamsVisuals,
}

export function getAudienceVisuals(slug: string): AudienceVisuals | undefined {
  return audienceVisualsMap[slug]
}
