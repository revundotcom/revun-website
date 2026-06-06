import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, CheckCircle2, HelpCircle, Sparkles } from 'lucide-react'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema, buildFAQPageSchema, buildServiceSchema } from '@/lib/schema-builders'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

/* ───────────────────────────────────────────────────────────────────────────
 * Data
 * ─────────────────────────────────────────────────────────────────────────── */

interface UseCase {
  slug: string
  title: string
  eyebrow: string
  heroSub: string
  context: string
  valueProps: { title: string; body: string }[]
  workflow: string[]
  faqs: { q: string; a: string }[]
  related: string[]
}

const useCases: Record<string, UseCase> = {
  'tenant-screening': {
    slug: 'tenant-screening',
    title: 'Tenant Screening',
    eyebrow: 'Use case',
    heroSub: 'End-to-end credit, identity, employment, and reference verification on every applicant. One pipeline, scored results, audit-ready.',
    context:
      'Property operators in North America lose more money to under-screened tenants than to any other operational decision. The TransUnion 2024 Residential Renter Report found that 89% of operators consider credit history their top screening criterion, yet most run screening through a separate tool that never connects to the lease or the ledger. Revun runs screening inside the leasing pipeline, so the score, the report, and the decision live on the applicant record forever.',
    valueProps: [
      { title: 'Credit + identity in one pull', body: 'Soft-pull credit, government-ID verification, and synthetic-fraud checks run in parallel. Decisions surface in minutes, not hours, with the full report attached to the applicant.' },
      { title: 'Employment + income verification', body: 'Connect to payroll data sources or upload pay stubs; Revun verifies stated income against the underlying source and flags inconsistencies before they cost you.' },
      { title: 'Reference automation', body: 'Previous-landlord and personal references are emailed and texted automatically with structured response forms. No more chasing voicemails.' },
      { title: 'Scoring + adverse action', body: 'Configure your scoring criteria, set adverse-action thresholds, and Revun handles the FCRA-compliant declination letters automatically.' },
    ],
    workflow: [
      'Applicant submits the application through your branded intake form with consent language baked in.',
      'Credit, ID, and fraud checks fire in parallel within seconds of submission.',
      'Employment, income, and reference checks run automatically; you see the score build live.',
      'Approve, decline, or request more info in one click; adverse action letters generate automatically.',
    ],
    faqs: [
      { q: 'Which credit bureau does Revun use?', a: 'Revun integrates with TransUnion ResidentScreening, Equifax Insite, and Experian Connect. You can run any one of them or layer multiple for higher-stakes applications.' },
      { q: 'Is screening compliant with FCRA and provincial privacy laws?', a: 'Yes. Revun handles applicant consent, adverse-action notification, and retention-period rules per US FCRA and Canadian provincial privacy frameworks (PIPEDA, BC PIPA, Alberta PIPA, Quebec Law 25).' },
      { q: 'Can I screen tenants for short-term or furnished rentals?', a: 'Yes. Revun supports configurable screening workflows by lease type, so vacation rentals, corporate housing, and traditional 12-month leases each run their own logic.' },
      { q: 'How much does screening cost per applicant?', a: 'Screening is bundled into Revun’s leasing pipeline. Marginal cost per applicant is roughly $25 to $40 depending on which bureaus and verifications you enable.' },
    ],
    related: ['lease-management', 'property-listing', 'showing-scheduling'],
  },
  'rent-collection': {
    slug: 'rent-collection',
    title: 'Rent Collection',
    eyebrow: 'Use case',
    heroSub: 'Pre-authorized debit, ACH, credit card, and Interac e-Transfer all reconciled to the tenant ledger. NSF tracking and late notices fire automatically.',
    context:
      'Rent collection is the single highest-volume workflow in property operations, and the single most likely to leak revenue. The 2024 Buildium Industry Report estimated that 8% of US small-portfolio rent goes uncollected each year due to delays, fee waivers, and untracked partial payments. Revun unifies collection channels into one ledger, so partial payments, NSF returns, and chargebacks all reconcile against the unit automatically.',
    valueProps: [
      { title: 'Multi-rail collection', body: 'ACH, credit card, debit card, Interac e-Transfer, and physical check workflows in one ledger. Tenants choose the rail; you see the result the same way.' },
      { title: 'NSF + chargeback workflows', body: 'When a payment fails, Revun fires the late-payment workflow automatically: notification, NSF fee, ledger debit, and notice generation if the cure period lapses.' },
      { title: 'Owner disbursements', body: 'Trust-account workflows for property managers: hold tenant payments, reconcile against the bank statement, and disburse to owners on your schedule.' },
      { title: 'Tax reporting + statements', body: '1099-MISC and 1099-K generation for US owners. T4A and T5018 for Canadian property managers. Monthly and year-end statements ready to send.' },
    ],
    workflow: [
      'Tenant authorizes preferred payment method during onboarding (PAD, ACH, card, or e-Transfer).',
      'Rent debits automatically on the due date; reconciliation hits the ledger in real time.',
      'NSF returns trigger the late-payment workflow: notification, fee, and notice timer.',
      'Monthly owner statement and disbursement generated automatically.',
    ],
    faqs: [
      { q: 'Can Revun handle trust accounting for property management companies?', a: 'Yes. Revun supports US state trust account requirements and Canadian provincial broker trust rules. Reconciliation reports, three-way reconciliation, and audit logs are built in.' },
      { q: 'What happens when a tenant disputes a charge?', a: 'Disputes are flagged on the ledger and routed to your team queue. Full payment history, communications, and lease documents are attached so you can respond inside one workflow.' },
      { q: 'Can tenants pay in installments?', a: 'Yes. Configurable per lease. Most operators allow split payments only for explicit hardship cases with documentation, and Revun tracks the agreement against the unit.' },
      { q: 'What about late fees and grace periods?', a: 'Late fees, grace periods, and notice schedules are configured per lease (or as a portfolio default). Revun enforces the jurisdiction-specific limits where applicable.' },
    ],
    related: ['accounting-integration', 'tenant-screening', 'compliance-tracking'],
  },
  'lease-management': {
    slug: 'lease-management',
    title: 'Lease Management',
    eyebrow: 'Use case',
    heroSub: 'Generate compliant leases with auto-populated tenant data, e-signatures, renewal workflows, and amendment tracking. Built for North American regulatory variance.',
    context:
      'Every Canadian province and most US states require specific lease forms or mandatory clauses. The Ontario Standard Lease, BC Tenancy Agreement, TAL Bail in Quebec, and AB 1482-disclosed leases in California are just the start. Revun maintains current province and state-specific lease libraries and auto-populates them with tenant and unit data, so you are never serving an out-of-date document.',
    valueProps: [
      { title: 'Province + state-specific libraries', body: 'Current lease templates kept up to date as legislation changes. New provincial amendments and state rent control updates propagate to your portfolio automatically.' },
      { title: 'Auto-populated fields', body: 'Tenant, unit, deposit, and lease term fields populate from the applicant record. No copy-paste, no typos in your legal documents.' },
      { title: 'E-signature + delivery proof', body: 'Compliant e-signature flow with audit trail. Tenant signature, landlord countersignature, and delivery confirmation logged for tribunal evidence.' },
      { title: 'Renewals + amendments', body: 'Renewal workflows fire 90 days before lease end. Amendments (rent increase, pet addendum, occupant change) generated and signed in the same system.' },
    ],
    workflow: [
      'Applicant approved; lease template selected based on unit jurisdiction.',
      'Fields auto-populate from the applicant and unit records.',
      'Tenant signs electronically; landlord countersigns.',
      'Renewal and amendment workflows track from lease execution onward.',
    ],
    faqs: [
      { q: 'Does Revun keep lease templates current with legislative changes?', a: 'Yes. Revun’s compliance team maintains the lease libraries for every Canadian province and US state we cover. When legislation changes, the template updates within the cadence required by law.' },
      { q: 'Can I upload my own custom lease?', a: 'Yes. Custom templates can be uploaded with field mapping for auto-population. We recommend running custom leases past your counsel before deployment.' },
      { q: 'How are e-signatures legally binding?', a: 'Revun uses ESIGN-Act and Canada PIPEDA-compliant e-signature workflows. Audit trails, IP logging, and timestamp records are admissible in residential tenancy tribunal evidence.' },
      { q: 'Can multiple tenants sign one lease?', a: 'Yes. Co-tenants and guarantors sign separately, each with their own audit trail. The fully-executed lease is delivered to all parties.' },
    ],
    related: ['tenant-screening', 'document-automation', 'compliance-tracking'],
  },
  'maintenance-management': {
    slug: 'maintenance-management',
    title: 'Maintenance Management',
    eyebrow: 'Use case',
    heroSub: 'Work order creation, vendor dispatch, proof-of-work capture, and invoice reconciliation from request to resolution.',
    context:
      'Maintenance is the most common reason tenants leave a building, and the most common reason owners change property managers. The 2024 NMHC Resident Preferences Survey found that 71% of multifamily residents rank maintenance response time as a top-three factor in their renewal decision. Revun routes requests to your preferred vendors with photos and a structured intake, tracks the work in real time, and reconciles the invoice against completed scope.',
    valueProps: [
      { title: 'Tenant request intake', body: 'Tenants submit through the portal or mobile app with photos, video, and structured fields. Categories route automatically to the right team or vendor.' },
      { title: 'Vendor dispatch + scheduling', body: 'Preferred vendor lists per property and per work category. Vendors accept jobs in app and confirm scheduling with the tenant directly.' },
      { title: 'Proof of work + invoicing', body: 'Vendors upload before/after photos, time on site, and parts used. Invoice generates automatically from the recorded scope, matched against your approved rate card.' },
      { title: 'Recurring + preventive workflows', body: 'HVAC service, smoke alarm checks, gutter cleaning, and turn checklists schedule automatically. Compliance maintenance (fire safety, elevator inspections) tracked with reminders.' },
    ],
    workflow: [
      'Tenant submits a request with photos and category.',
      'Work order routes to vendor or in-house team based on category, property, and rate card.',
      'Vendor accepts, schedules with tenant, completes work, uploads proof.',
      'Invoice generates, matches scope, and queues for owner approval and disbursement.',
    ],
    faqs: [
      { q: 'Can tenants submit maintenance requests from their phone?', a: 'Yes. The tenant portal is mobile-first and the dedicated tenant app supports photo and video uploads. Most requests come in from mobile.' },
      { q: 'How does Revun handle emergency maintenance?', a: 'Emergencies (water leaks, heat loss, lock-outs, electrical hazards) route immediately to your 24/7 on-call team or designated vendor. SLA timers track response and resolution.' },
      { q: 'Can I track per-vendor performance?', a: 'Yes. Response time, completion time, callback rate, and tenant satisfaction track per vendor. Underperforming vendors surface in the dashboard for rotation or removal.' },
      { q: 'Does Revun handle make-ready and turn workflows?', a: 'Yes. Move-out triggers a configurable turn checklist with vendor assignments per task. Cost tracking against the budgeted turn ledger is built in.' },
    ],
    related: ['vendor-management', 'communication-hub', 'document-automation'],
  },
  'property-listing': {
    slug: 'property-listing',
    title: 'Property Listing',
    eyebrow: 'Use case',
    heroSub: 'Create one listing, syndicate to every major rental platform in North America, and turn inquiries into showings without leaving the system.',
    context:
      'A vacant unit in a 1.5% vacancy market costs the equivalent of 4 to 5 days of rent for every day on market. Speed-to-listing is operational alpha. Revun publishes once and pushes to Kijiji, Rentals.ca, Zumper, Rent.com, Apartments.com, RentCafe, and your own branded site, then collects inquiries into the leasing pipeline so nothing falls through the cracks.',
    valueProps: [
      { title: 'Multi-platform syndication', body: 'One unit, one listing, every major platform. Kijiji and Rentals.ca in Canada, Zumper, Rent.com, and Apartments.com in the US, plus your branded site.' },
      { title: 'Photo + virtual tour management', body: 'Drag-and-drop photo galleries, virtual tour links, and floor plans. Auto-resize and CDN distribution across syndication targets.' },
      { title: 'Inquiry capture + qualification', body: 'Inbound inquiries route into the leasing pipeline with auto-qualification questions. Pre-screened leads surface to your team within minutes.' },
      { title: 'Refresh + repost automation', body: 'Listing platforms decay quickly. Revun refreshes posts on the cadence each platform rewards so your unit stays visible without manual reposting.' },
    ],
    workflow: [
      'Create unit listing with photos, copy, virtual tour, and rental terms.',
      'Publish to every connected platform with one click.',
      'Inquiries flow into the leasing pipeline with auto-qualification.',
      'Refresh automation keeps the listing at the top of platform feeds.',
    ],
    faqs: [
      { q: 'Which platforms does Revun syndicate to?', a: 'In Canada: Kijiji, Rentals.ca, RentBoard, Zumper, Rent Panda, PadMapper. In the US: Zillow Rentals, Rent.com, Apartments.com, Trulia, RentCafe, Zumper. Plus your own branded marketing site.' },
      { q: 'Can I use my own photos and virtual tours?', a: 'Yes. Upload photos, link Matterport or YouTube virtual tours, and Revun distributes across platforms in the right size and format for each target.' },
      { q: 'How fast does a listing go live?', a: 'Most platforms refresh within 1 to 4 hours. Branded sites are real-time. Zillow Rentals has historically taken longest to propagate.' },
      { q: 'Can I run paid promotion through Revun?', a: 'Yes. Boosted listings on Kijiji, Rentals.ca, and Zumper are configurable per listing with budget tracking against your monthly marketing spend.' },
    ],
    related: ['showing-scheduling', 'tenant-screening', 'lease-management'],
  },
  'showing-scheduling': {
    slug: 'showing-scheduling',
    title: 'Showing Scheduling',
    eyebrow: 'Use case',
    heroSub: 'Calendar booking, automated confirmations, self-guided tour options, and structured feedback collection. Showings become a workflow, not a scramble.',
    context:
      'The average lease takes 4.7 showings to close in a balanced market, and double that in a tight market. Without coordination, leasing agents lose 60 to 90 minutes per day to scheduling conflicts and no-shows. Revun replaces phone tag with a booking calendar that the prospect manages themselves, with self-guided tour options for properties that support them.',
    valueProps: [
      { title: 'Booking calendar + confirmations', body: 'Prospects pick a time slot from your agent calendar. Automated SMS and email confirmations plus reminders cut no-show rates by half.' },
      { title: 'Self-guided tours', body: 'Smart lock integration with August, Yale, and SmartRent. ID verification at booking, time-windowed access, and audit trail of every entry.' },
      { title: 'Route + agent optimization', body: 'When the same agent runs multiple showings in a day, Revun routes them geographically and packs the calendar.' },
      { title: 'Feedback capture', body: 'Post-showing automated feedback request with structured questions. Aggregated insights show why units linger and where to adjust price or condition.' },
    ],
    workflow: [
      'Prospect requests a showing from the listing.',
      'Calendar surfaces available slots; prospect confirms.',
      'Automated reminders fire; ID verified for self-guided access if applicable.',
      'Post-showing feedback captured; lead status updated automatically.',
    ],
    faqs: [
      { q: 'Does Revun support self-guided tours?', a: 'Yes. Smart-lock integrations with August, Yale, SmartRent, and several others enable time-windowed access after applicant ID verification. Audit trails track every entry.' },
      { q: 'Can multiple agents share one calendar?', a: 'Yes. Brokerage-wide and team calendars are configurable. Round-robin assignment, prospect preference, and territory rules all supported.' },
      { q: 'What happens if a prospect no-shows?', a: 'No-show is logged automatically when the booking window closes without confirmation. The lead status updates and the prospect receives a reschedule prompt.' },
      { q: 'Can I integrate with my existing calendar (Google, Outlook)?', a: 'Yes. Two-way sync with Google Calendar and Microsoft 365 prevents double-booking against personal appointments.' },
    ],
    related: ['property-listing', 'tenant-screening', 'communication-hub'],
  },
  'owner-reporting': {
    slug: 'owner-reporting',
    title: 'Owner Reporting',
    eyebrow: 'Use case',
    heroSub: 'Real-time portfolio dashboards, financial statements, expense tracking, and tax-ready year-end packages for every owner you serve.',
    context:
      'Owner retention is one of the most underrated metrics in property management. The 2024 NARPM Operations Benchmark found that property managers spend 21% of weekly hours on owner communication and reporting. Revun moves that workload to a self-serve portal so owners see their portfolio in real time and reach out only when something needs a decision.',
    valueProps: [
      { title: 'Self-serve owner portal', body: 'Owners log in to see occupancy, rent collection status, maintenance activity, and the full ledger. The phone stops ringing for routine status questions.' },
      { title: 'Statements + disbursements', body: 'Monthly statements with categorized expenses generate automatically. Disbursements to owner accounts fire on your trust-account schedule.' },
      { title: 'Document access', body: 'Leases, inspection reports, vendor invoices, and tax documents accessible per owner per property. No more email attachments lost in inbox archives.' },
      { title: 'Tax-ready year-end', body: '1099 (US) and T4A or T5018 (Canada) packages, owner tax summaries, and expense categorization ready by January 31.' },
    ],
    workflow: [
      'Property added; owner invited to portal with role-based permissions.',
      'Real-time financial and operational data populates as leases, payments, and maintenance happen.',
      'Monthly statement and disbursement fire automatically.',
      'Year-end tax package generates by January 31; owner downloads from portal.',
    ],
    faqs: [
      { q: 'Can owners with multiple properties see them all in one view?', a: 'Yes. Multi-property owners see portfolio-wide dashboards with per-property drill-down. Useful for investor-owners who hold across multiple cities.' },
      { q: 'How are owner statements customized?', a: 'Statement templates support custom branding, expense categorization, and the level of detail your owners want. Some operators send summary-only; others send full transactional detail.' },
      { q: 'Can owners message me through the portal?', a: 'Yes. Owners can send messages from the portal to your team queue, with full conversation history attached to the property record.' },
      { q: 'Does Revun handle owner trust accounting?', a: 'Yes. Trust-account workflows with three-way reconciliation, audit logs, and provincial/state-specific broker trust rules built in.' },
    ],
    related: ['accounting-integration', 'rent-collection', 'document-automation'],
  },
  'vendor-management': {
    slug: 'vendor-management',
    title: 'Vendor Management',
    eyebrow: 'Use case',
    heroSub: 'Vendor directory, work assignment, payment tracking, and performance ratings across your portfolio. Build a vendor bench that scales with you.',
    context:
      'Maintenance-heavy portfolios live and die by their vendor bench. The right mix of in-house technicians and outside vendors determines whether move-outs cost $400 or $4,000. Revun gives you per-vendor performance data, rate-card tracking, and insurance/compliance documentation in one directory so the bench gets better over time.',
    valueProps: [
      { title: 'Vendor directory + COI tracking', body: 'Every vendor profile includes contact, services, insurance certificates, and W-9 or T4A info. Expiring COIs alert before they lapse.' },
      { title: 'Rate cards + scope', body: 'Per-vendor rate cards and scope-of-work templates. Invoices reconcile against the agreed rate, not against a one-off quote.' },
      { title: 'Performance scoring', body: 'Response time, completion rate, callback rate, and tenant satisfaction track per vendor. Use the data to rotate and rebuild the bench.' },
      { title: 'Payment workflows', body: 'Invoice approval, payment scheduling, and 1099 or T4A reporting all flow from the same vendor record.' },
    ],
    workflow: [
      'Add vendor with services, rate card, COI, and W-9 / T4A info.',
      'Work orders route to the vendor based on category, property, and availability.',
      'Vendor completes work, uploads proof, and submits invoice through the portal.',
      'Performance scoring updates automatically; payment and tax forms generate from the same record.',
    ],
    faqs: [
      { q: 'Can vendors use Revun without paying for it?', a: 'Yes. Vendor accounts are free. They accept jobs, upload proof of work, and submit invoices through the vendor portal at no cost.' },
      { q: 'How does Revun track vendor insurance compliance?', a: 'COIs upload with expiry dates; alerts fire 30 days before expiry. Lapsed-COI vendors are blocked from new work orders until refreshed.' },
      { q: 'Can I rate vendors?', a: 'Yes. Per-vendor performance scoring tracks response time, completion rate, callback rate, and tenant feedback. Use it to rotate or remove vendors.' },
      { q: 'Does Revun generate vendor tax forms automatically?', a: 'Yes. 1099-MISC and 1099-NEC for US vendors, T4A and T5018 for Canadian contractors. Generated and distributed by January 31.' },
    ],
    related: ['maintenance-management', 'accounting-integration', 'document-automation'],
  },
  'document-automation': {
    slug: 'document-automation',
    title: 'Document Automation',
    eyebrow: 'Use case',
    heroSub: 'Template library with auto-fill, compliance document generation, secure storage, and sharing. Every document tied to the unit, the tenant, and the action that created it.',
    context:
      'A typical operating portfolio generates 30 to 50 documents per unit per year: leases, addenda, notices, inspection reports, work orders, invoices, and disclosures. Without automation, documents live in email, Dropbox, and Google Drive folders no one updates. Revun generates documents from data, stores them per unit, and ties every document to the action that created it.',
    valueProps: [
      { title: 'Templates + auto-fill', body: 'Lease templates, notice forms, inspection checklists, and disclosure documents auto-fill from tenant and unit records. No copy-paste, no typos.' },
      { title: 'Compliance document generation', body: 'Province and state-specific notices (N4, N12, BC RTB forms, NJ Truth-in-Renting, California disclosures) generated correctly the first time.' },
      { title: 'Secure storage + audit trail', body: 'Documents stored per unit and per tenant with permissions, version history, and an audit trail of who accessed what and when.' },
      { title: 'E-signature + delivery proof', body: 'Documents sent for e-signature with delivery confirmation. Audit-trail timestamps are admissible in tenancy tribunal proceedings.' },
    ],
    workflow: [
      'Event triggers a document: lease execution, rent increase notice, work order completion.',
      'Template auto-fills from tenant and unit records.',
      'Document sent for signature or stored with audit trail.',
      'Document accessible per unit, per tenant, with role-based permissions forever.',
    ],
    faqs: [
      { q: 'Can I upload my own custom document templates?', a: 'Yes. Custom templates can be uploaded with field-mapping for auto-population. Most operators run a mix of platform templates and custom-branded versions.' },
      { q: 'How long does Revun retain documents?', a: 'Document retention follows your jurisdiction’s residential tenancy record-keeping rules (typically 2 to 7 years). Configurable per portfolio.' },
      { q: 'Are e-signed documents legally binding?', a: 'Yes. US ESIGN Act, Canadian PIPEDA, and Quebec Law 25 compliant e-signature with audit trail. Admissible at LTB, RTB, TAL, and state-level housing tribunals.' },
      { q: 'Can I bulk-generate documents (eg. portfolio rent increase notices)?', a: 'Yes. Bulk generation across hundreds or thousands of units in one operation. Useful for portfolio rent increase cycles and policy update notices.' },
    ],
    related: ['lease-management', 'compliance-tracking', 'communication-hub'],
  },
  'communication-hub': {
    slug: 'communication-hub',
    title: 'Communication Hub',
    eyebrow: 'Use case',
    heroSub: 'Unified inbox with phone, video, SMS, email, and automated notifications. Every conversation tied to the unit, the tenant, the owner, or the vendor.',
    context:
      'A property management company runs on thousands of conversations a month: tenant requests, owner updates, vendor coordination, prospect inquiries. When those conversations live in personal phones and email inboxes, the company depends on individual memories. Revun puts every conversation inside the platform, tied to the property and the participant, so the business does not lose context when someone takes vacation.',
    valueProps: [
      { title: 'Multi-channel inbox', body: 'SMS, email, voice, and in-app messaging in one queue. Every message tied to the unit, the tenant, the owner, or the vendor it concerns.' },
      { title: 'Auto-routing + assignment', body: 'Inbound messages route to the right team member based on property, category, or assigned account manager. Round-robin and territory rules supported.' },
      { title: 'Templates + automation', body: 'Lease renewal nudges, rent payment reminders, maintenance follow-ups, and prospect drips all configured once and triggered automatically.' },
      { title: 'Privacy + audit trail', body: 'No personal phone numbers exchanged. Every conversation logged with timestamp and participant. Admissible in tenancy proceedings.' },
    ],
    workflow: [
      'Inbound message routes to the right team queue based on tenant, property, or category.',
      'Templates and automation handle routine responses (rent reminders, lease renewal nudges).',
      'Complex issues escalate to your team; full conversation history is attached.',
      'Audit trail captures every message tied to the property or person.',
    ],
    faqs: [
      { q: 'Does Revun replace my phone system?', a: 'Yes for most teams. Revun’s voice + SMS infrastructure handles tenant, owner, and vendor calls. Larger operators sometimes integrate with RingCentral, OpenPhone, or Dialpad alongside.' },
      { q: 'Can I keep my existing phone number?', a: 'Yes. Number porting from any carrier (RingCentral, AT&T, Verizon, Bell, Rogers) handled during onboarding.' },
      { q: 'Are SMS messages compliant with TCPA and Canadian CASL?', a: 'Yes. Tenant and prospect consent captured at intake. Opt-out workflows automatic. CASL and TCPA record retention built in.' },
      { q: 'Can my team share an inbox?', a: 'Yes. Shared team inboxes with assignment, mentions, and internal notes are standard. Slack-style collaboration built into the inbox.' },
    ],
    related: ['maintenance-management', 'owner-reporting', 'showing-scheduling'],
  },
  'accounting-integration': {
    slug: 'accounting-integration',
    title: 'Accounting Integration',
    eyebrow: 'Use case',
    heroSub: 'QuickBooks Online, Xero, and Sage Intacct sync. Trust accounting, bank reconciliation, owner statement generation, and tax-ready year-end packages.',
    context:
      'Property accounting differs from standard small-business accounting in three ways: trust accounts, multi-entity reporting, and complex revenue recognition around prepayments and security deposits. Most general-purpose accounting tools treat these as edge cases. Revun’s ledger handles them natively and syncs the financial summary back to your QuickBooks, Xero, or Sage entity.',
    valueProps: [
      { title: 'Trust accounting', body: 'Three-way reconciliation, designated trust account workflows, and broker-trust rules per US state and Canadian province built in.' },
      { title: 'QuickBooks + Xero sync', body: 'Real-time sync of rent, expenses, owner disbursements, and vendor payments to your QuickBooks Online or Xero entity. Multi-entity portfolios supported.' },
      { title: 'Bank reconciliation', body: 'Connect your operating and trust accounts via Plaid or Flinks. Automatic transaction matching reduces manual reconciliation to minutes per month.' },
      { title: 'Year-end tax packages', body: '1099, T4A, T5018, and owner tax summaries generated and distributed by January 31. CPA-ready handoff packages.' },
    ],
    workflow: [
      'Connect operating and trust bank accounts via Plaid (US) or Flinks (Canada).',
      'Map your QuickBooks or Xero chart of accounts to Revun’s ledger categories.',
      'Transactions sync in real time; reconciliation runs automatically against bank data.',
      'Monthly owner statements and year-end tax packages generate from the same ledger.',
    ],
    faqs: [
      { q: 'Which accounting platforms does Revun integrate with?', a: 'QuickBooks Online, Xero, Sage Intacct, and NetSuite. Plus Zoho Books for smaller operators and AccountEdge for legacy users.' },
      { q: 'Does Revun replace my accountant?', a: 'No. Revun replaces the bookkeeping work (transaction entry, reconciliation, statement generation) so your accountant can focus on strategy, tax planning, and audit.' },
      { q: 'How does Revun handle trust accounts?', a: 'Three-way reconciliation (bank, ledger, owner liabilities), designated trust account workflows, and audit trails per US state and Canadian province broker-trust rules.' },
      { q: 'Can Revun handle multi-entity portfolios?', a: 'Yes. Operators with multiple LLCs, corporations, or partnerships configure each entity separately with cross-entity reporting at the portfolio level.' },
    ],
    related: ['rent-collection', 'owner-reporting', 'document-automation'],
  },
  'compliance-tracking': {
    slug: 'compliance-tracking',
    title: 'Compliance Tracking',
    eyebrow: 'Use case',
    heroSub: 'Provincial and state regulation tracking, notice deadlines, rent increase limits, and form generation. Compliance becomes a workflow, not a memory test.',
    context:
      'Residential tenancy regulation in North America is a moving target: Ontario\'s annual rent guideline, BC\'s CPI + 2% formula, California\'s AB 1482 cap, New York\'s HSTPA notice requirements, Washington\'s Just Cause for Eviction Reform Act. Every jurisdiction has its own deadlines, forms, and limits. Revun maintains the compliance library and surfaces the right action at the right time per unit.',
    valueProps: [
      { title: 'Per-unit compliance calendar', body: 'Notice deadlines, rent increase windows, inspection requirements, and licensing renewals tracked per unit. Alerts fire 90 / 30 / 7 days out.' },
      { title: 'Notice + form generation', body: 'Province and state-specific notices (N-series, NJ TRA forms, CA AB 1482 disclosures, NY HSTPA notices) generated correctly with proof of delivery.' },
      { title: 'Rent increase enforcement', body: 'Annual rent cap calculations per jurisdiction (Ontario 2.5%, BC CPI+2%, California 5%+CPI, NJ municipal caps) applied automatically with notice generation.' },
      { title: 'Audit-ready trail', body: 'Every compliance action timestamped, attributed, and tied to the unit. Tribunal evidence packages export in one click.' },
    ],
    workflow: [
      'Unit added with jurisdiction; compliance calendar populates automatically.',
      'Notice deadlines and rent increase windows surface in the operator dashboard.',
      'Actions generate correct forms with proof of delivery.',
      'Audit trail captures everything; tribunal evidence packages export in one click.',
    ],
    faqs: [
      { q: 'How does Revun stay current with legislative changes?', a: 'Revun’s compliance team monitors every Canadian provincial RTA and US state landlord-tenant statute. Updates push to your portfolio within the cadence required by law.' },
      { q: 'Does Revun handle municipal-level compliance (eg. Toronto Rental Housing Operator Licence)?', a: 'Yes for major North American markets including Toronto RHOL, NYC HPD violations, Chicago RLTO, Seattle RRIO, and more. Per-city compliance modules layer on top of provincial / state baselines.' },
      { q: 'What about above-guideline rent increases?', a: 'Where jurisdictions allow above-guideline increases (Ontario AGI, Manitoba RTB applications), Revun assembles the documentation package and tracks the application through approval.' },
      { q: 'Can Revun help with tribunal evidence packages?', a: 'Yes. One-click evidence packaging exports payment history, communications, maintenance records, lease documents, and notices in the format the LTB, RTB, TAL, RTDRS, or your state housing court accepts.' },
    ],
    related: ['document-automation', 'lease-management', 'rent-collection'],
  },
}

/* ───────────────────────────────────────────────────────────────────────────
 * Static params + metadata
 * ─────────────────────────────────────────────────────────────────────────── */

export function generateStaticParams() {
  return Object.keys(useCases).map((slug) => ({ slug }))
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = useCases[slug]
  if (!data) return { title: 'Use Case Not Found | Revun' }

  const title = `${data.title} | Revun`
  const description = data.heroSub
  const url = buildCanonicalUrl(`/use-cases/${data.slug}`)

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, images: ['/og-default.png'] },
  }
}

/* ───────────────────────────────────────────────────────────────────────────
 * Page
 * ─────────────────────────────────────────────────────────────────────────── */

export default async function UseCasePage({ params }: Props) {
  const { slug } = await params
  const data = useCases[slug]
  if (!data) notFound()

  const pageUrl = `https://revun.com/use-cases/${data.slug}/`

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Use Cases', url: 'https://revun.com/use-cases/' },
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
                See {data.title.toLowerCase()} in Revun
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/use-cases/"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] px-8 text-base font-semibold text-[#0A1628]"
              >
                All use cases
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Context ──────────────────────────────────────────────────────── */}
      <section className="bg-white py-12 md:py-20">
        <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-blue">
              Industry context
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-graphite md:text-4xl">
              Why {data.title.toLowerCase()} matters
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[#475569]">
              {data.context}
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Value Props ──────────────────────────────────────────────────── */}
      <section className="bg-brand-off-white py-12 md:py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="mb-10 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-blue">
                What Revun does
              </p>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-graphite md:text-4xl">
                How {data.title.toLowerCase()} runs in Revun
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

      {/* ── Workflow ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-12 md:py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll>
            <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
              <Sparkles className="h-4 w-4" />
              Workflow
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-graphite md:text-4xl">
              How it works, step by step
            </h2>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.08} className="mt-10 space-y-4">
            {data.workflow.map((step, i) => (
              <div key={i} className="flex items-start gap-4 rounded-2xl border border-border bg-brand-off-white p-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-blue text-sm font-bold text-white">
                  {i + 1}
                </span>
                <p className="text-base leading-relaxed text-[#334155]">{step}</p>
              </div>
            ))}
          </RevealOnScroll>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="bg-brand-off-white py-12 md:py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="mb-10 text-center">
              <p className="mb-3 inline-flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
                <HelpCircle className="h-4 w-4" />
                FAQ
              </p>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-graphite md:text-4xl">
                Common questions
              </h2>
            </div>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.07}>
            <div className="space-y-4">
              {data.faqs.map((f) => (
                <div key={f.q} className="rounded-2xl border border-border bg-white p-6">
                  <h3 className="mb-2 font-heading text-base font-bold text-brand-graphite">{f.q}</h3>
                  <p className="text-sm leading-relaxed text-[#475569]">{f.a}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Related ──────────────────────────────────────────────────────── */}
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll>
            <h2 className="mb-6 font-heading text-2xl font-bold text-brand-graphite">Related use cases</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {data.related.map((r) => {
                const rel = useCases[r]
                if (!rel) return null
                return (
                  <Link
                    key={r}
                    href={`/use-cases/${r}/`}
                    className="rounded-2xl border border-border bg-brand-off-white p-5 transition-colors duration-150 hover:border-brand-blue"
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
              Run {data.title.toLowerCase()} on one platform
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-[#555860]">
              Book a demo and see {data.title.toLowerCase()} working end-to-end inside Revun against your own portfolio.
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
