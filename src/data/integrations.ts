/** All Revun integrations. Powers /integrations and /integrations/[slug].
 * Each entry is unique (title + H1 + description + features come from here). */
export type SetupDifficulty = 'Easy' | 'Medium' | 'Advanced'
export interface IntegrationDetail {
  name: string
  slug: string
  category: string
  description: string
  features: string[]
  setup: SetupDifficulty
  status: 'Available' | 'Coming Soon' | 'Beta'
}

const mk = (
  slug: string, name: string, category: string, description: string,
  features: string[], setup: SetupDifficulty = 'Medium', status: IntegrationDetail['status'] = 'Available',
): [string, IntegrationDetail] => [slug, { slug, name, category, description, features, setup, status }]

export const integrationData: Record<string, IntegrationDetail> = Object.fromEntries([
  // ── Accounting ──
  mk('quickbooks', 'QuickBooks', 'Accounting', 'Sync rent payments, invoices, expenses, and vendor bills between Revun and QuickBooks Online so your books stay current without double entry.', ['Two-way sync of invoices and payments', 'Map properties to QuickBooks classes and locations', 'Automatic expense categorization and GL mapping', 'Owner statement data pushed to QuickBooks'], 'Easy'),
  mk('xero', 'Xero', 'Accounting', 'Connect Revun to Xero to push rent, expenses, and owner disbursements into your chart of accounts and reconcile bank feeds automatically.', ['Sync invoices, bills, and payments to Xero', 'Per-property tracking categories', 'Automatic bank reconciliation matching', 'Owner and trust account reporting'], 'Easy'),
  mk('sage-intacct', 'Sage Intacct', 'Accounting', 'Push Revun financial data into Sage Intacct for multi-entity property portfolios that need dimensional reporting and audit-grade controls.', ['Multi-entity and dimensional GL mapping', 'Automated journal entries from rent and expenses', 'Trust accounting compliance support', 'Consolidated owner and investor reporting'], 'Advanced'),
  mk('netsuite', 'NetSuite', 'Accounting', 'Integrate Revun with Oracle NetSuite to feed rent, AP, and AR into enterprise ERP workflows for large operators and asset managers.', ['Sync AR, AP, and GL postings to NetSuite', 'Class and subsidiary mapping per property', 'Scheduled financial data exports', 'Revenue recognition support'], 'Advanced'),
  mk('zoho-books', 'Zoho Books', 'Accounting', 'Keep Revun and Zoho Books in sync so rent collection, expenses, and vendor payments flow into your Zoho accounting ledger.', ['Two-way invoice and payment sync', 'Expense and bill categorization', 'Per-property bookkeeping', 'Owner statement export'], 'Easy'),
  // ── CRM ──
  mk('salesforce', 'Salesforce', 'CRM', 'Push leads, pipeline updates, and owner communications from Revun into Salesforce so sales and property teams share one source of truth.', ['Automatic lead creation from Revun inquiries', 'Custom field mapping for property and unit data', 'Bi-directional contact and deal sync', 'Activity timeline sync for a full audit trail'], 'Medium'),
  mk('zoho-crm', 'Zoho CRM', 'CRM', 'Connect Revun to Zoho CRM to turn rental inquiries into tracked leads and keep owner and prospect records in sync.', ['Lead capture from Revun forms', 'Contact and deal sync', 'Pipeline automation triggers', 'Owner relationship tracking'], 'Medium'),
  mk('hubspot', 'HubSpot', 'CRM', 'Send Revun leads and owner activity into HubSpot to run marketing and nurture sequences against your rental pipeline.', ['Lead and contact sync to HubSpot', 'Workflow and email sequence triggers', 'Deal pipeline mapping', 'Form submission capture'], 'Medium'),
  mk('pipedrive', 'Pipedrive', 'CRM', 'Pipe Revun inquiries into Pipedrive deals so your team can track every prospective owner and tenant through a visual pipeline.', ['Auto-create deals from Revun leads', 'Contact and organization sync', 'Activity logging', 'Pipeline stage automation'], 'Medium'),
  // ── Support / Helpdesk ──
  mk('zoho-desk', 'Zoho Desk', 'Support', 'Route tenant and owner support requests from Revun into Zoho Desk for ticketing, SLAs, and a full support history per property.', ['Ticket creation from Revun messages', 'Per-property and per-unit context', 'SLA and escalation tracking', 'Knowledge base linking'], 'Medium'),
  mk('intercom', 'Intercom', 'Support', 'Connect Revun to Intercom to support tenants and owners over live chat with full account context attached to each conversation.', ['Live chat with property and lease context', 'Automated responses and triage', 'Conversation history per contact', 'Help center deflection'], 'Medium'),
  mk('zendesk', 'Zendesk', 'Support', 'Sync Revun conversations into Zendesk so support agents handle tenant and owner issues with ticketing, macros, and reporting.', ['Ticket sync from Revun messages', 'Macros and automation rules', 'CSAT and SLA reporting', 'Per-unit context on tickets'], 'Medium'),
  mk('freshdesk', 'Freshdesk', 'Support', 'Push tenant and owner requests from Revun into Freshdesk for organized ticketing, assignment, and resolution tracking.', ['Ticket creation and sync', 'Round-robin agent assignment', 'SLA tracking', 'Property context on every ticket'], 'Medium'),
  // ── Communications ──
  mk('twilio', 'Twilio', 'Communications', 'Power tenant and owner communications with Twilio for automated SMS reminders, voice routing, and WhatsApp, all from inside Revun.', ['Automated SMS rent reminders and notices', 'Programmable voice for maintenance routing', 'WhatsApp Business messaging', 'Delivery tracking and analytics'], 'Medium'),
  mk('ringcentral', 'RingCentral', 'Communications', 'Bring RingCentral calling and SMS into Revun so every tenant and owner conversation is logged to the right unit.', ['Click-to-call from Revun records', 'Inbound call routing and logging', 'SMS to tenants and owners', 'Call recording and history per unit'], 'Medium'),
  mk('openphone', 'OpenPhone', 'Communications', 'Connect OpenPhone to Revun for shared business numbers, texting, and call logging tied to each property and contact.', ['Shared numbers for your team', 'Two-way SMS with tenants', 'Call and text history on the unit', 'Voicemail transcription'], 'Easy'),
  mk('dialpad', 'Dialpad', 'Communications', 'Integrate Dialpad AI calling and messaging with Revun so conversations and transcripts attach to the right tenant or owner.', ['AI call transcription and summaries', 'Click-to-call and SMS', 'Call logging per property', 'Voicemail and routing'], 'Medium'),
  mk('aircall', 'Aircall', 'Communications', 'Connect Aircall to Revun for a cloud phone system with call routing, logging, and analytics across your property team.', ['Inbound and outbound call logging', 'IVR and routing rules', 'Call notes synced to contacts', 'Team performance analytics'], 'Medium'),
  mk('zoom-phone', 'Zoom Phone', 'Communications', 'Bring Zoom Phone calling into Revun so calls with tenants, owners, and vendors are tracked against the right records.', ['Click-to-call from Revun', 'Call logging and recording', 'Voicemail transcription', 'Contact context on calls'], 'Medium'),
  // ── Payments ──
  mk('stripe', 'Stripe', 'Payments', 'Process card and ACH rent payments through Stripe with automatic reconciliation to the tenant ledger inside Revun.', ['Card and ACH rent collection', 'Automatic ledger reconciliation', 'Failed-payment retries and dunning', 'Payout reporting'], 'Easy'),
  mk('plaid', 'Plaid', 'Payments', 'Use Plaid to verify bank accounts and power low-cost ACH rent collection with instant account linking in Revun.', ['Instant bank account verification', 'Low-cost ACH debit setup', 'Balance and identity checks', 'Reduced NSF risk'], 'Easy'),
  mk('interac', 'Interac e-Transfer', 'Payments', 'Collect rent from Canadian tenants via Interac e-Transfer with automatic matching to the tenant ledger in Revun.', ['Interac e-Transfer rent collection', 'Automatic payment matching', 'Request-money reminders', 'CAD reconciliation'], 'Easy'),
  mk('klarna', 'Klarna', 'Payments', 'Offer flexible move-in payment options through Klarna so tenants can split deposits and first-month costs.', ['Split move-in cost payments', 'Tenant-facing checkout', 'Settlement reporting', 'Reduced upfront friction'], 'Medium', 'Beta'),
  mk('affirm', 'Affirm', 'Payments', 'Give tenants the option to finance large upfront rental costs through Affirm at lease signing.', ['Pay-over-time for deposits and fees', 'Instant eligibility checks', 'Settlement to your account', 'Tenant checkout flow'], 'Medium', 'Beta'),
  mk('paybright', 'PayBright', 'Payments', 'Offer Canadian tenants buy-now-pay-later financing for move-in costs through PayBright.', ['Installments for move-in costs (Canada)', 'Instant approval checks', 'Settlement reporting', 'Tenant checkout'], 'Medium', 'Beta'),
  // ── Screening / Identity ──
  mk('persona', 'Persona', 'Screening', 'Verify applicant identity and detect fraud with Persona before a lease is signed, inside the Revun leasing pipeline.', ['Government ID verification', 'Selfie and liveness checks', 'Synthetic-fraud detection', 'Results attached to the applicant'], 'Medium'),
  mk('trustii', 'Trustii', 'Screening', 'Run Canadian background and credit checks through Trustii directly from the Revun application flow.', ['Canadian credit and background checks', 'Applicant-initiated consent', 'Scored results on the applicant record', 'Compliance-ready reporting'], 'Medium'),
  mk('flinks', 'Flinks', 'Screening', 'Use Flinks to verify income and bank data for Canadian applicants and reduce rental risk in Revun.', ['Bank and income verification (Canada)', 'Affordability insights', 'Consent-based data pulls', 'Results on the applicant record'], 'Medium'),
  mk('singlekey-integration', 'SingleKey', 'Screening', 'Pull SingleKey tenant reports and risk scores into Revun to screen applicants across Canada and the US.', ['Credit and background reports', 'Tenant risk score', 'Landlord references', 'Rent guarantee options'], 'Medium'),
  mk('equifax', 'Equifax', 'Screening', 'Run Equifax credit checks on applicants from within the Revun leasing pipeline with consent and adverse-action handling.', ['Soft and hard credit pulls', 'FCRA-compliant consent flow', 'Score and report on the applicant', 'Adverse-action support'], 'Medium'),
  mk('transunion', 'TransUnion', 'Screening', 'Screen applicants with TransUnion SmartMove credit, criminal, and eviction reports inside Revun.', ['Credit, criminal, and eviction reports', 'Resident score and recommendation', 'Applicant-paid option', 'Results on the applicant record'], 'Medium'),
  mk('checkr', 'Checkr', 'Screening', 'Run background checks on applicants and vendors through Checkr without leaving Revun.', ['Criminal background checks', 'Vendor and contractor screening', 'Continuous monitoring options', 'Compliant adverse-action workflow'], 'Medium'),
  // ── Documents / E-sign ──
  mk('docusign', 'DocuSign', 'Documents', 'Send, sign, and store leases and amendments with DocuSign directly inside Revun, with a full audit trail.', ['E-signature for leases and amendments', 'Template library with auto-filled fields', 'Audit trail and completion tracking', 'Mobile signing for tenants and owners'], 'Easy'),
  mk('dropbox-sign', 'Dropbox Sign', 'Documents', 'Use Dropbox Sign (formerly HelloSign) to collect legally binding e-signatures on Revun leases and documents.', ['E-signature with audit trail', 'Reusable lease templates', 'In-person and remote signing', 'Automatic document storage'], 'Easy'),
  mk('adobe-sign', 'Adobe Acrobat Sign', 'Documents', 'Send Revun leases for signature through Adobe Acrobat Sign with enterprise compliance and template controls.', ['Enterprise e-signature workflows', 'Template and field mapping', 'Compliance and audit logging', 'Bulk send for portfolios'], 'Medium'),
  // ── Automation ──
  mk('zapier', 'Zapier', 'Automation', 'Connect Revun to 6,000+ apps with Zapier to automate workflows without code, from lead routing to reporting.', ['Trigger Zaps from Revun events', 'Push data to 6,000+ apps', 'No-code multi-step automations', 'Two-way data flow'], 'Easy'),
  mk('make', 'Make', 'Automation', 'Build visual, multi-step automations between Revun and your stack with Make (formerly Integromat).', ['Visual scenario builder', 'Revun triggers and actions', 'Branching and filters', 'Scheduled and real-time runs'], 'Medium'),
  mk('slack', 'Slack', 'Automation', 'Get Revun alerts for new leads, payments, and maintenance in Slack so your team acts in real time.', ['Real-time alerts to channels', 'New lead and payment notifications', 'Maintenance request pings', 'Customizable event routing'], 'Easy'),
  // ── Productivity ──
  mk('microsoft-365', 'Microsoft 365', 'Productivity', 'Connect Revun to Microsoft 365 for email, calendar, and document sync across your property operations.', ['Email and calendar sync', 'Outlook contact integration', 'Document storage in OneDrive', 'Single sign-on (SSO)'], 'Medium'),
  mk('google-workspace', 'Google Workspace', 'Productivity', 'Sync Revun with Google Workspace for Gmail, Calendar, Drive, and SSO across your team.', ['Gmail and Calendar sync', 'Drive document storage', 'Contact sync', 'Single sign-on (SSO)'], 'Medium'),
  mk('calendly', 'Calendly', 'Productivity', 'Let prospects book showings and owner calls through Calendly with availability synced to your Revun team.', ['Self-serve showing scheduling', 'Owner and demo call booking', 'Calendar availability sync', 'Automated reminders'], 'Easy'),
  mk('google-calendar', 'Google Calendar', 'Productivity', 'Sync showings, inspections, and maintenance visits between Revun and Google Calendar in real time.', ['Two-way event sync', 'Showing and inspection scheduling', 'Team availability', 'Automated reminders'], 'Easy'),
  // ── Maps / Listings ──
  mk('google-maps', 'Google Maps', 'Maps & Listings', 'Use Google Maps in Revun for property geocoding, coverage maps, and location context on every listing.', ['Property geocoding', 'Interactive coverage maps', 'Location context on listings', 'Distance and routing for vendors'], 'Easy'),
  mk('mapbox', 'Mapbox', 'Maps & Listings', 'Render custom, branded maps in Revun with Mapbox for portfolio views and tenant-facing location pages.', ['Custom branded map styles', 'Portfolio map views', 'Geocoding and search', 'Tenant-facing location maps'], 'Medium'),
  mk('brokerbay', 'BrokerBay', 'Maps & Listings', 'Connect BrokerBay to Revun to coordinate showings and brokerage workflows for listed rental units.', ['Showing scheduling for listings', 'Brokerage workflow sync', 'Feedback collection', 'Listing status updates'], 'Medium', 'Beta'),
  mk('mls-idx', 'MLS / IDX', 'Maps & Listings', 'Syndicate Revun rental listings to MLS and IDX feeds to maximize exposure across real-estate portals.', ['Listing syndication to MLS/IDX', 'Automatic status updates', 'Photo and detail sync', 'Lead routing back to Revun'], 'Advanced', 'Beta'),
])

export const integrationSlugs = Object.keys(integrationData)
