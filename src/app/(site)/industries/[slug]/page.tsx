import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, CheckCircle2, HelpCircle, BarChart3 } from 'lucide-react'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema, buildFAQPageSchema, buildServiceSchema } from '@/lib/schema-builders'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

/* ───────────────────────────────────────────────────────────────────────────
 * Data
 * ─────────────────────────────────────────────────────────────────────────── */

interface Industry {
  slug: string
  title: string
  eyebrow: string
  heroSub: string
  context: string
  marketStats: { label: string; value: string }[]
  valueProps: { title: string; body: string }[]
  faqs: { q: string; a: string }[]
  related: string[]
}

const industries: Record<string, Industry> = {
  'reits-and-asset-managers': {
    slug: 'reits-and-asset-managers',
    title: 'REITs & Asset Managers',
    eyebrow: 'Industry',
    heroSub: 'Standardize operations across regions and asset classes. Enterprise reporting, governance controls, and API integrations for institutional portfolios.',
    context: 'Publicly traded and private REITs in North America hold roughly $4.5 trillion in real estate assets under management. Institutional operators run on a different stack than mom-and-pop: standardized chart of accounts, multi-region governance, role-based access, audit readiness, and API integrations into Yardi, MRI, and treasury systems. Revun gives institutional teams the operational layer that fits inside that stack.',
    marketStats: [
      { label: 'NA AUM in residential REITs', value: '$1.2T' },
      { label: 'Average REIT portfolio', value: '12,000+ units' },
      { label: 'Regions per portfolio', value: '8-15' },
      { label: 'Audit cycles per year', value: '4' },
    ],
    valueProps: [
      { title: 'Portfolio + region dashboards', body: 'Aggregate KPIs by region, asset class, manager, or fund. Drill from portfolio to property to unit without changing systems.' },
      { title: 'Role-based access + audit', body: 'Granular permissions per region, per fund, per role. Every action logged with timestamp and user. SOC 2 and audit-ready.' },
      { title: 'Yardi + MRI + Sage connectors', body: 'Pre-built connectors push financial summaries upstream while operational workflows stay in Revun. No replacement, no rip-out.' },
      { title: 'API-first reporting', body: 'Investor reporting and treasury integrations via REST and GraphQL APIs. Custom reports without a vendor change request.' },
    ],
    faqs: [
      { q: 'Does Revun replace Yardi or MRI?', a: 'Most REITs run Yardi or MRI as their financial system of record and use Revun for the operational layer (leasing, maintenance, communications, tenant experience). Pre-built connectors push the data summary upstream.' },
      { q: 'How does Revun handle multi-entity portfolios?', a: 'Each fund, ownership entity, and management company is configured separately. Cross-entity reporting at the portfolio level is built in.' },
      { q: 'Is Revun SOC 2 compliant?', a: 'Yes. Revun maintains SOC 2 Type II compliance with annual audits. Reports available under NDA during procurement.' },
      { q: 'Can Revun scale to 50,000+ units?', a: 'Yes. Revun has been architected for institutional scale from day one. Largest deployments today exceed 30,000 units across multiple regions.' },
    ],
    related: ['multifamily-operators', 'commercial-property', 'single-family-operators'],
  },
  'single-family-operators': {
    slug: 'single-family-operators',
    title: 'Single-Family Operators',
    eyebrow: 'Industry',
    heroSub: 'Manage scattered-site portfolios from one dashboard. Route maintenance by location, track per-property financials, and automate lease renewals.',
    context: 'The single-family rental (SFR) market in North America has grown from $1.5 trillion in 2010 to over $4.5 trillion today, driven by institutional acquirers (Invitation Homes, AMH, Tricon Residential) and a growing mid-market operator class. Scattered-site portfolios introduce operational complexity multifamily does not face: per-property financials, geographically dispersed maintenance, per-tenant communication, and per-HOA coordination. Revun is built for scattered-site reality.',
    marketStats: [
      { label: 'Total SFR units in NA', value: '~16M' },
      { label: 'Average mid-market portfolio', value: '340 doors' },
      { label: 'Cities per typical portfolio', value: '3-12' },
      { label: 'HOAs per typical portfolio', value: '15+' },
    ],
    valueProps: [
      { title: 'Per-property P&L', body: 'Income, expenses, and owner returns tracked at the property level. Roll up to portfolio, drill down to unit.' },
      { title: 'Location-based vendor dispatch', body: 'Maintenance routes geographically to your preferred vendor for that zip code. No more 90-minute service calls because the vendor lives an hour away.' },
      { title: 'HOA coordination', body: 'Per-property HOA rules, approval timelines, and fee schedules tracked centrally. No more move-ins delayed because HOA approval missed a deadline.' },
      { title: 'Renewal automation', body: 'Renewal workflows fire 90 days before lease end, generate the right notice, and execute the rent increase against your portfolio rules.' },
    ],
    faqs: [
      { q: 'Does Revun handle build-to-rent (BTR) communities?', a: 'Yes. BTR communities combine SFR per-unit reporting with multifamily-style central operations. Revun supports both models in one portfolio.' },
      { q: 'Can I onboard from a legacy SFR system like Propertyware or Rentec Direct?', a: 'Yes. Bulk import for properties, owners, tenants, leases, and payment ledgers is part of onboarding. Most operators migrate in 4 to 8 weeks.' },
      { q: 'Does Revun handle 1031 exchanges and property disposition workflows?', a: 'Yes. Disposition workflows including tenant notice, sale-contingency status, and basis tracking integrate with your accounting platform.' },
      { q: 'How does Revun handle scattered-site insurance and tax tracking?', a: 'Per-property insurance policies, property tax accounts, and renewal cycles tracked centrally. Expiring policies and assessment protests alert in advance.' },
    ],
    related: ['multifamily-operators', 'reits-and-asset-managers', 'vacation-rentals'],
  },
  'multifamily-operators': {
    slug: 'multifamily-operators',
    title: 'Multifamily Operators',
    eyebrow: 'Industry',
    heroSub: 'High-density operations demand high-efficiency tools. Unit-level tracking, bulk operations, common area management, and resident experience tools.',
    context: 'Multifamily is the largest commercial real estate asset class in North America by total value at over $4 trillion. Operators range from 25-unit garden communities to 4,000-unit institutional portfolios. The operational pattern is consistent: high tenant volume, recurring maintenance, common area management, and a resident experience program that drives renewal. Revun runs the full operational pattern for multifamily teams of any size.',
    marketStats: [
      { label: 'NA multifamily units', value: '~23M' },
      { label: 'Average operator portfolio', value: '180 units' },
      { label: 'Average lease term', value: '12 months' },
      { label: 'Renewal target rate', value: '55-65%' },
    ],
    valueProps: [
      { title: 'Unit-level operations', body: 'Per-unit maintenance, lease, payment, and communication ledgers. Roll up to building, property, and portfolio for management reporting.' },
      { title: 'Bulk operations', body: 'Lease renewals, rent increase notices, and policy update communications execute across hundreds of units in one operation.' },
      { title: 'Common area + amenities', body: 'Common area maintenance scheduling, amenity bookings (gym, pool, party room), and visitor management all in one platform.' },
      { title: 'Resident experience', body: 'Resident portal, event programming, community communications, and renewal incentive workflows that drive retention.' },
    ],
    faqs: [
      { q: 'Does Revun handle revenue management for multifamily?', a: 'Revun integrates with dynamic pricing tools (Yieldstar, LRO, RealPage) and supports manual pricing models. Most mid-market operators use Revun for operations and a dedicated tool for revenue management.' },
      { q: 'Can Revun run a class-A multifamily community with a 24/7 concierge?', a: 'Yes. Resident portal, concierge ticketing, and event programming workflows support class-A operations. Used by several class-A operators in major NA metros.' },
      { q: 'How does Revun handle utility billing (RUBS, submetering)?', a: 'Submeter integration with major providers (American Utility Management, Conservice, Yardi Utility Expense Management). RUBS calculations and tenant billing run inside the platform.' },
      { q: 'Does Revun support affordable housing compliance?', a: 'Yes. LIHTC, Section 8, and CMHC compliance modules support affordable units within mixed portfolios. See the affordable housing industry page for detail.' },
    ],
    related: ['reits-and-asset-managers', 'single-family-operators', 'student-housing'],
  },
  'student-housing': {
    slug: 'student-housing',
    title: 'Student Housing',
    eyebrow: 'Industry',
    heroSub: 'Seasonal turnover, guarantor management, and per-bed leasing built for the unique rhythms of university housing.',
    context: 'Purpose-built student housing in North America has grown to over $80 billion in market value, with institutional operators (Greystar, American Campus Communities, Scion) leading consolidation. Student housing operates on a fundamentally different cycle than conventional multifamily: per-bed leases, August / September turnover, parent-guarantor structures, and academic-year calendar planning. Revun handles each of these natively.',
    marketStats: [
      { label: 'NA purpose-built student beds', value: '~1.3M' },
      { label: 'Average lease term', value: '11.5 months' },
      { label: 'Peak turnover window', value: 'Aug 15 - Sep 5' },
      { label: 'Guarantor share', value: '~85% of leases' },
    ],
    valueProps: [
      { title: 'Per-bed leasing', body: 'Each bedroom in a shared unit leases separately. Roommate matching, shared common area billing, and per-tenant ledgers handled natively.' },
      { title: 'Guarantor workflows', body: 'Parent or third-party guarantors signed onto each lease with separate screening and rent responsibility. Liability rolls forward at renewal automatically.' },
      { title: 'Turnover automation', body: 'August / September turn-cycle checklists across hundreds of beds in one workflow. Vendor dispatch, inspection, and re-leasing pipeline orchestrated centrally.' },
      { title: 'Academic calendar integration', body: 'Pre-lease windows, summer-storage handling, and renewal nudges tied to the university calendar. Pre-leasing campaigns fire automatically before peak demand.' },
    ],
    faqs: [
      { q: 'Does Revun handle international student tenants?', a: 'Yes. International applicant screening uses passport ID verification and home-country credit (where available) or guarantor-based approval. Common for graduate program housing.' },
      { q: 'Can Revun manage off-campus student housing as well as purpose-built?', a: 'Yes. Both off-campus house-share rentals (4 to 8 beds per unit) and purpose-built communities (200 to 800 beds) run in the same platform.' },
      { q: 'How does Revun handle the September move-in surge?', a: 'Bulk move-in workflows, vendor scheduling, and inspection checklists are built for high-volume periods. Most operators complete a full property turn in 14 to 21 days using Revun.' },
      { q: 'Does Revun integrate with university housing portals?', a: 'Yes for several major university systems. Custom integrations available for institutional operators serving specific university partnerships.' },
    ],
    related: ['multifamily-operators', 'senior-living', 'reits-and-asset-managers'],
  },
  'senior-living': {
    slug: 'senior-living',
    title: 'Senior Living',
    eyebrow: 'Industry',
    heroSub: 'Accessibility-first operations, care coordination hooks, and family communication tools for independent living, assisted living, and retirement communities.',
    context: 'Senior living in North America is a $500 billion sector growing at 5-6% annually as the population ages. Independent living (IL), assisted living (AL), memory care, and continuing care retirement communities (CCRCs) each operate differently from conventional multifamily. Family member involvement, accessibility maintenance prioritization, and care coordination with third-party providers are central. Revun supports the operational pattern without trying to replace clinical software.',
    marketStats: [
      { label: 'NA senior living units', value: '~3M' },
      { label: 'Average IL community size', value: '120 units' },
      { label: 'Average resident length of stay', value: '2.4 years' },
      { label: 'Family portal usage', value: '~70% of residents' },
    ],
    valueProps: [
      { title: 'Family portal access', body: 'Adult children and designated family members get role-based access to the resident portal. Maintenance updates, community announcements, and billing summaries shared at the right level.' },
      { title: 'Accessibility-first maintenance', body: 'ADA and accessibility maintenance requests auto-escalate to priority queues. Mobility equipment service, grab-bar installations, and accessibility inspections tracked separately.' },
      { title: 'Care coordination hooks', body: 'Integrations with care platforms (PointClickCare, Caremerge) for AL and CCRC operators. Operational data stays in Revun; clinical data stays in the care system.' },
      { title: 'Emergency contact + wellness', body: 'Per-resident emergency contact tree, wellness check workflows, and incident reporting tied to the resident record.' },
    ],
    faqs: [
      { q: 'Does Revun replace clinical care software?', a: 'No. Revun runs the operational and hospitality layer (leasing, maintenance, communications, billing). Clinical care, medication management, and care plans run in dedicated systems we integrate with.' },
      { q: 'Can Revun handle a continuing care retirement community (CCRC)?', a: 'Yes for the IL portion of CCRCs. AL and memory care portions typically run on PointClickCare or Eldermark with Revun integrating for operational reporting.' },
      { q: 'Does Revun handle Medicare or Medicaid billing?', a: 'No. Medicare and Medicaid billing run through your clinical software (PointClickCare, MatrixCare). Revun handles private-pay rent, ancillary fees, and operational billing.' },
      { q: 'How does Revun handle the family communication relationship?', a: 'Each resident designates one or more family contacts with configurable access levels. Family members can view maintenance status, community announcements, and billing summaries from the family portal.' },
    ],
    related: ['multifamily-operators', 'affordable-housing', 'reits-and-asset-managers'],
  },
  'vacation-rentals': {
    slug: 'vacation-rentals',
    title: 'Vacation & Short-Term Rentals',
    eyebrow: 'Industry',
    heroSub: 'Manage furnished units, cleaning schedules, guest communications, and pricing. A professional alternative to managing through Airbnb and Vrbo dashboards alone.',
    context: 'Short-term rental supply in North America has grown to over 2 million active listings on Airbnb and Vrbo combined. Professional operators (Vacasa, Evolve, AvantStay, Sonder) have consolidated significant share but the long tail is dominated by mid-market operators running 10 to 200 units. Revun gives professional STR operators the operations layer that the platforms (Airbnb, Vrbo, Booking.com) intentionally do not provide.',
    marketStats: [
      { label: 'NA active STR listings', value: '~2M' },
      { label: 'Average professional portfolio', value: '40 units' },
      { label: 'Average stay length', value: '4.2 nights' },
      { label: 'Average turnover cleaning time', value: '3.5 hours' },
    ],
    valueProps: [
      { title: 'Channel manager + PMS', body: 'Sync inventory and rates to Airbnb, Vrbo, Booking.com, and direct-booking sites. One calendar, no double-bookings.' },
      { title: 'Turnover cleaning workflow', body: 'Cleaning team assignment, photo-based inspection, and supply replenishment tracking per turn. Average turn time reduces 30% with structured workflow.' },
      { title: 'Guest communication automation', body: 'Pre-stay, mid-stay, and post-stay messaging templates per property. Local recommendations, check-in instructions, and review-request workflows fire automatically.' },
      { title: 'Dynamic pricing integration', body: 'Native integration with PriceLabs, Wheelhouse, and Beyond. Pricing recommendations sync to channel listings without manual adjustment.' },
    ],
    faqs: [
      { q: 'Does Revun replace Airbnb or Vrbo?', a: 'No. Airbnb and Vrbo remain the demand channels. Revun is the operational layer behind them: inventory management, cleaning, guest communication, and direct-booking infrastructure.' },
      { q: 'Can Revun handle mid-term (30 to 90 day) furnished rentals?', a: 'Yes. Many operators run a blended portfolio of short-term (under 30 days), mid-term (30 to 90 days), and corporate housing. Revun handles all three within one portfolio.' },
      { q: 'How does Revun handle municipal STR regulations?', a: 'Per-property licence tracking, occupancy tax remittance, and regulation-specific operational rules (registration renewals, primary residence requirements, maximum night caps) tracked centrally.' },
      { q: 'Does Revun support direct bookings on my own website?', a: 'Yes. Branded direct-booking pages with calendar sync, payment processing, and guest screening integrated. Reduces channel fees on repeat guests.' },
    ],
    related: ['multifamily-operators', 'single-family-operators', 'commercial-property'],
  },
  'commercial-property': {
    slug: 'commercial-property',
    title: 'Commercial Property',
    eyebrow: 'Industry',
    heroSub: 'Office, retail, and industrial property management with CAM reconciliation, NNN lease support, and tenant improvement project tracking.',
    context: 'Commercial real estate operations differ fundamentally from residential: triple-net (NNN) lease structures, common area maintenance (CAM) reconciliations, percentage rent for retail, tenant improvement (TI) allowances, and complex escalation clauses. Revun supports the commercial operational pattern alongside residential portfolios so mixed operators do not need two systems.',
    marketStats: [
      { label: 'NA commercial property value', value: '~$22T' },
      { label: 'Average CAM reconciliation cycle', value: 'Annual' },
      { label: 'Typical commercial lease term', value: '5-10 years' },
      { label: 'TI allowance per sq ft', value: '$25-$75' },
    ],
    valueProps: [
      { title: 'CAM reconciliation', body: 'Operating expense pools tracked per property. Annual reconciliation with tenant pro-rata share calculation and audit-ready supporting documentation.' },
      { title: 'NNN + gross + modified leases', body: 'All three commercial lease structures supported. Pass-throughs, base year stops, and operating expense gross-ups calculated per lease.' },
      { title: 'Tenant improvement tracking', body: 'TI allowance, draws, change orders, and tenant-completion certifications tracked per project. Project budget vs actual reporting per tenant.' },
      { title: 'Percentage rent (retail)', body: 'Sales reporting from tenants, percentage rent calculation against breakpoints, and audit workflows for major retail tenancies.' },
    ],
    faqs: [
      { q: 'Does Revun handle CAM reconciliation for a 50-tenant office building?', a: 'Yes. CAM pools, tenant pro-rata shares, base year stops, and gross-ups all support reconciliations at any scale.' },
      { q: 'Can Revun integrate with Yardi Commercial or MRI?', a: 'Yes. Pre-built connectors for Yardi Voyager Commercial and MRI Commercial Management. Revun handles tenant-facing operations; Yardi or MRI remains the system of record.' },
      { q: 'How does Revun handle industrial properties?', a: 'Industrial leases (warehouse, manufacturing, flex) supported with NNN structures, expansion options, and the long-term renewal workflows industrial tenants typically negotiate.' },
      { q: 'Does Revun support medical office buildings (MOBs)?', a: 'Yes. Healthcare-specific MOB requirements including HIPAA-aligned tenant communications, shared common space allocation among medical tenants, and accessibility compliance.' },
    ],
    related: ['multifamily-operators', 'mixed-use', 'reits-and-asset-managers'],
  },
  'affordable-housing': {
    slug: 'affordable-housing',
    title: 'Affordable Housing',
    eyebrow: 'Industry',
    heroSub: 'Compliance-heavy portfolios need compliance-heavy tools. LIHTC, Section 8, HUD reporting, income certification, and CMHC subsidy tracking built in.',
    context: 'Affordable housing in North America covers LIHTC (Low Income Housing Tax Credit) properties in the US, Section 8 voucher and project-based units, HUD-administered programs, and CMHC affordable housing programs in Canada. The defining operational characteristic is compliance: income certifications, recertifications, set-aside calculations, and subsidy reporting that does not exist in market-rate housing. Revun handles the compliance layer natively.',
    marketStats: [
      { label: 'US LIHTC units', value: '~3M' },
      { label: 'US Section 8 voucher units', value: '~2.3M' },
      { label: 'CMHC-supported units', value: '~600K' },
      { label: 'Compliance recerts per year', value: '1-3 per unit' },
    ],
    valueProps: [
      { title: 'LIHTC compliance', body: 'Tenant Income Certification (TIC), annual recertification, set-aside calculation, and Form 8823 audit-ready documentation built in.' },
      { title: 'Section 8 + voucher workflows', body: 'PHA submissions, voucher payments tracking, HQS inspection coordination, and tenant portion calculation handled per unit.' },
      { title: 'HUD reporting', body: 'TRACS submissions for Section 8 project-based, EIV verification, and 50059 form generation. CMHC ASR reporting for Canadian affordable operators.' },
      { title: 'Mixed-income portfolios', body: 'Operators running both affordable and market-rate units in the same property can run them in one portfolio with unit-level compliance flags.' },
    ],
    faqs: [
      { q: 'Does Revun handle LIHTC year-15 compliance?', a: 'Yes. Initial compliance period (15 years), extended use period (15+ years), and qualified contract workflows all supported.' },
      { q: 'Can Revun handle HUD multifamily (Section 8 PBV / PBRA)?', a: 'Yes. Project-Based Voucher and Project-Based Rental Assistance properties supported with TRACS submission and HUD reporting.' },
      { q: 'Does Revun integrate with WCMS or Yardi Affordable?', a: 'Yes for major affordable-housing systems. Integration depth varies; speak with onboarding about your specific stack.' },
      { q: 'How does Revun handle Canadian affordable housing under CMHC?', a: 'CMHC-supported units track ASR reporting, end-of-operating-agreement transitions, and provincial affordable program compliance (eg. Ontario’s HSA framework, BC’s BC Housing programs).' },
    ],
    related: ['multifamily-operators', 'reits-and-asset-managers', 'senior-living'],
  },
  'military-housing': {
    slug: 'military-housing',
    title: 'Military Housing',
    eyebrow: 'Industry',
    heroSub: 'BAH-based rent calculations, PCS move coordination, and base housing compliance for military family communities.',
    context: 'Privatized military housing in the US (the Military Housing Privatization Initiative, MHPI) covers roughly 200,000 units operated by private partners including Lendlease, Hunt Companies, Lincoln Military Housing, and Balfour Beatty Communities. Off-base military rental serves an additional 1.5+ million service member households. The defining operational characteristics: BAH-based rent, PCS (Permanent Change of Station) move volume, and DoD compliance.',
    marketStats: [
      { label: 'US MHPI privatized units', value: '~200K' },
      { label: 'Off-base military rental households', value: '~1.5M' },
      { label: 'Average PCS moves per service member', value: '6-8 lifetime' },
      { label: 'Annual BAH cycles', value: 'Updated each Jan 1' },
    ],
    valueProps: [
      { title: 'BAH rent calculation', body: 'Basic Allowance for Housing rates by service member rank, ZIP code, and dependency status calculated automatically per lease. Annual BAH updates propagate to renewal cycles.' },
      { title: 'PCS workflow automation', body: 'Permanent Change of Station orders trigger move-out workflows: pro-rated rent, security deposit return, and PCS-friendly notice timelines that respect deployment realities.' },
      { title: 'DoD reporting', body: 'MHPI operator reporting, deployment data integration, and DoD inspector general audit-ready documentation built in.' },
      { title: 'Service member protections', body: 'Servicemembers Civil Relief Act (SCRA) lease termination protections, foreclosure protections, and interest rate cap workflows honored automatically.' },
    ],
    faqs: [
      { q: 'Does Revun handle BAH overage and gap calculations?', a: 'Yes. Where BAH exceeds market rent, the protocol for service member benefit handling varies by program. Where BAH falls short, gap-payment workflows can be configured.' },
      { q: 'How does Revun handle SCRA?', a: 'SCRA lease termination on PCS orders or deployment, interest rate caps, and protections from default judgment all built into the workflow. Documentation requirements automated.' },
      { q: 'Can Revun handle a 5,000-unit MHPI privatized community?', a: 'Yes. Several large privatized housing operators run portions of their portfolios on Revun. Integration with DoD systems and joint-venture partner reporting supported.' },
      { q: 'Does Revun support off-base military landlords?', a: 'Yes. Individual landlords and small portfolios renting to military families use Revun for BAH-aware pricing, PCS workflow handling, and SCRA compliance.' },
    ],
    related: ['multifamily-operators', 'affordable-housing', 'single-family-operators'],
  },
  'mixed-use': {
    slug: 'mixed-use',
    title: 'Mixed-Use Properties',
    eyebrow: 'Industry',
    heroSub: 'Residential, commercial, and retail under one roof. Unified accounting, split billing, and property-wide operations from one dashboard.',
    context: 'Mixed-use development has been the dominant form of urban infill construction in major North American cities over the past decade. A typical mixed-use property combines retail ground floor, office or institutional mezzanine, and residential apartments above. Each use type carries different lease structures, different operational needs, and different reporting requirements. Revun runs all three use types within one property record.',
    marketStats: [
      { label: 'NA mixed-use projects (2010-2024)', value: '~6,000+' },
      { label: 'Typical retail / residential split', value: '20% / 80%' },
      { label: 'Lease types per property', value: 'NNN + gross + residential' },
      { label: 'Shared utilities / services', value: 'High' },
    ],
    valueProps: [
      { title: 'Unified accounting across use types', body: 'Residential, retail, and office lease economics run in one ledger. Roll up to property and portfolio without exporting between systems.' },
      { title: 'Split billing for shared services', body: 'Common area maintenance, shared utilities, and shared security services split among use types via configurable allocation rules.' },
      { title: 'Multi-use leasing pipeline', body: 'One leasing pipeline handles retail prospects, office prospects, and residential prospects with the right workflow and document templates for each.' },
      { title: 'Property-wide operations', body: 'Maintenance, security, and amenity programs run property-wide while billing flows per use type and per tenant.' },
    ],
    faqs: [
      { q: 'Does Revun handle a 50-unit residential / 5-tenant retail property?', a: 'Yes. Most mixed-use properties run on Revun with both use types in the same property record. Common area maintenance, shared utilities, and split-billing supported.' },
      { q: 'Can Revun separate residential and commercial reporting?', a: 'Yes. Reports filter by use type, by lease structure, or by tenant category. Owners and investors see use-type-specific summaries or unified property-level views.' },
      { q: 'How does Revun handle properties with hotel or short-term rental components?', a: 'Yes. Mixed-use properties that include hotel or short-term rental units run those in the Revun STR module with the residential and commercial units in their respective modules, all within the property record.' },
      { q: 'Does Revun handle ground leases?', a: 'Yes. Ground lease structures (long-term land lease underlying buildings owned by another entity) are supported. Common in institutional mixed-use development.' },
    ],
    related: ['commercial-property', 'multifamily-operators', 'reits-and-asset-managers'],
  },
}

/* ───────────────────────────────────────────────────────────────────────────
 * Static params + metadata
 * ─────────────────────────────────────────────────────────────────────────── */

export function generateStaticParams() {
  return Object.keys(industries).map((slug) => ({ slug }))
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = industries[slug]
  if (!data) return { title: 'Industry Not Found | Revun' }

  const title = `${data.title} Property Management Software | Revun`
  const description = data.heroSub
  const url = buildCanonicalUrl(`/industries/${data.slug}`)

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
  }
}

/* ───────────────────────────────────────────────────────────────────────────
 * Page
 * ─────────────────────────────────────────────────────────────────────────── */

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params
  const data = industries[slug]
  if (!data) notFound()

  const pageUrl = `https://revun.com/industries/${data.slug}/`

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Industries', url: 'https://revun.com/industries/' },
              { name: data.title, url: pageUrl },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildFAQPageSchema(
              data.faqs.map((f) => ({ question: f.q, answer: f.a }))
            )
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildServiceSchema({
              name: data.title,
              description: data.heroSub,
              serviceType: 'Property Management Software',
              url: pageUrl,
            })
          ),
        }}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#F5F6F8]">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-blue">
              {data.eyebrow}
            </p>
            <h1 className="font-display font-extrabold text-3xl text-[#0A1628] md:text-5xl lg:text-6xl">
              <span className="text-brand-blue">{data.title}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-[#555860]">
              {data.heroSub}
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/demo/"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-blue px-8 text-base font-semibold text-white transition-colors duration-100 hover:bg-brand-blue-dark"
              >
                Book a demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/industries/"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] px-8 text-base font-semibold text-[#0A1628]"
              >
                All industries
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Context + Stats ──────────────────────────────────────────────── */}
      <section className="bg-white py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll className="mx-auto max-w-4xl">
            <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
              <BarChart3 className="h-4 w-4" />
              Industry context
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-graphite md:text-4xl">
              What makes {data.title.toLowerCase()} different
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[#475569]">{data.context}</p>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.08} className="mt-12">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {data.marketStats.map((s) => (
                <div key={s.label} className="rounded-2xl border border-border bg-brand-off-white p-5 text-center md:p-6">
                  <p className="font-heading text-xl font-extrabold text-brand-graphite md:text-2xl">{s.value}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-[#64748B]">{s.label}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Value Props ──────────────────────────────────────────────────── */}
      <section className="bg-brand-off-white py-12 md:py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="mb-10 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-blue">
                Built for {data.title.toLowerCase()}
              </p>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-graphite md:text-4xl">
                What Revun does for {data.title.toLowerCase()}
              </h2>
            </div>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.1}>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {data.valueProps.map((prop) => (
                <div key={prop.title} className="flex flex-col rounded-2xl border border-border bg-white p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue/10">
                    <CheckCircle2 className="h-5 w-5 text-brand-blue" />
                  </div>
                  <h3 className="mb-2 font-heading text-base font-bold text-brand-graphite">{prop.title}</h3>
                  <p className="text-sm leading-relaxed text-[#475569]">{prop.body}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="bg-white py-12 md:py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="mb-10 text-center">
              <p className="mb-3 inline-flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
                <HelpCircle className="h-4 w-4" />
                FAQ
              </p>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-graphite md:text-4xl">Common questions</h2>
            </div>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.07}>
            <div className="space-y-4">
              {data.faqs.map((f) => (
                <div key={f.q} className="rounded-2xl border border-border bg-brand-off-white p-6">
                  <h3 className="mb-2 font-heading text-base font-bold text-brand-graphite">{f.q}</h3>
                  <p className="text-sm leading-relaxed text-[#475569]">{f.a}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Related ──────────────────────────────────────────────────────── */}
      <section className="bg-brand-off-white py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll>
            <h2 className="mb-6 font-heading text-2xl font-bold text-brand-graphite">Related industries</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {data.related.map((r) => {
                const rel = industries[r]
                if (!rel) return null
                return (
                  <Link
                    key={r}
                    href={`/industries/${r}/`}
                    className="rounded-2xl border border-border bg-white p-5 transition-colors duration-150 hover:border-brand-blue"
                  >
                    <h3 className="font-heading text-base font-semibold text-brand-graphite">{rel.title}</h3>
                    <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue">
                      Learn more
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                )
              })}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#F5F6F8] py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-6 lg:px-8">
          <RevealOnScroll>
            <h2 className="font-heading font-extrabold text-3xl tracking-tight text-[#0A1628] md:text-5xl">
              Run your {data.title.toLowerCase()} portfolio on Revun
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-[#555860]">
              Book a demo and we will walk through the exact workflows that matter to {data.title.toLowerCase()} operators.
            </p>
            <div className="mt-10">
              <Link
                href="/demo/"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#176FEB] px-8 text-base font-semibold text-white transition-colors duration-100 hover:bg-[#1260D6]"
              >
                Book a demo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}
