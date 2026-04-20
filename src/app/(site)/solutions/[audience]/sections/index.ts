import type { AudienceSectionsComponent } from './types'
import { SelfManagingOwnersSections } from './self-managing-owners'
import { PropertyManagementCompaniesSections } from './property-management-companies'
import { BrokeragesSections } from './brokerages'
import { LeasingCompaniesSections } from './leasing-companies'
import { MaintenanceCompaniesSections } from './maintenance-companies'
import { ReitsSections } from './reits'
import { TenantsSections } from './tenants'
import { InternalOpsTeamsSections } from './internal-ops-teams'

export type { AudienceSectionsComponent } from './types'

export const audienceSectionsMap: Record<string, AudienceSectionsComponent> = {
  'self-managing-owners': SelfManagingOwnersSections,
  'property-management-companies': PropertyManagementCompaniesSections,
  brokerages: BrokeragesSections,
  'leasing-companies': LeasingCompaniesSections,
  'maintenance-companies': MaintenanceCompaniesSections,
  reits: ReitsSections,
  tenants: TenantsSections,
  'internal-ops-teams': InternalOpsTeamsSections,
}

export function getAudienceSections(slug: string): AudienceSectionsComponent | undefined {
  return audienceSectionsMap[slug]
}
