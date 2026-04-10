import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildServiceSchema } from '@/lib/schema-builders'
import { SolutionDetailClient } from './client'

/* ── Types ────────────────────────────────────────────────────────────────── */

interface Feature {
  title: string
  description: string
  iconName: string
}

interface Step {
  number: string
  title: string
  description: string
}

interface SolutionContent {
  title: string
  subtitle: string
  heroEyebrow: string
  problemHeading: string
  problemBody: string
  problemBullets: string[]
  features: Feature[]
  steps: Step[]
  startingPrice: string
  priceUnit: string
  pricingNote: string
  ctaHeading: string
  ctaBody: string
  replaces: string[]
  relatedSolutions: { slug: string; title: string }[]
  metaTitle: string
  metaDescription: string
}

/* ── Data ─────────────────────────────────────────────────────────────────── */

const solutionData: Record<string, SolutionContent> = {
  'self-managing-owners': {
    title: 'Run your rentals like a **full property operation**',
    subtitle:
      'List units, screen tenants, generate leases, collect rent, manage maintenance, communicate securely, and track everything from one system.',
    heroEyebrow: 'For Self-Managing Owners',
    problemHeading: 'Scattered tools destroy your time and expose your risk',
    problemBody:
      'You are running a property operation with Kijiji, email, PDF leases, e-transfers, and a phone full of tenant texts. Every gap is a missed payment, a compliance failure, or a dispute you cannot prove.',
    problemBullets: [
      'No unified ledger for rent status, lease terms, or outstanding balances',
      'Sharing your personal phone number with tenants eliminates boundaries',
      'Maintenance requests lost in text threads with zero documentation',
      'No audit trail when disputes escalate to the board or tribunal',
    ],
    features: [
      { title: 'Listing Syndication', description: 'Publish to Kijiji, Rentals.ca, and your branded site in one action. Auto-refresh keeps units visible. No duplicate entry.', iconName: 'Home' },
      { title: 'Tenant Screening Engine', description: 'Credit, identity, employment, and reference verification in one pipeline. Score-based ranking eliminates guesswork.', iconName: 'CheckCircle2' },
      { title: 'Lease Generation', description: 'Province-compliant lease templates with auto-populated fields and e-signatures. Executed leases stored permanently.', iconName: 'FileKey2' },
      { title: 'Secure Rent Collection', description: 'Pre-authorized debit, credit card, or e-transfer. Automated receipts, late notices, and full payment ledger. No personal banking details shared.', iconName: 'CreditCard' },
      { title: 'Maintenance System', description: 'Tenants submit requests through the portal with photos and descriptions. You assign vendors, track progress, and close with documented proof of completion.', iconName: 'Wrench' },
      { title: 'Private Communications', description: 'In-platform messaging between you and tenants. No personal phone numbers exchanged. Full conversation history tied to each unit.', iconName: 'MessageSquare' },
    ],
    steps: [
      { number: '01', title: 'Register your property', description: 'Enter address, unit details, upload photos, and set rental terms. Operational in under five minutes.' },
      { number: '02', title: 'List and screen', description: 'Syndicate listings across platforms, schedule showings, and run screening on every applicant from one workflow.' },
      { number: '03', title: 'Execute the lease', description: 'Generate a compliant lease, collect e-signatures, receive first-and-last payment, and activate tenant portal access.' },
      { number: '04', title: 'Operate and document', description: 'Collect rent automatically, manage maintenance with full audit trails, communicate securely, and generate year-end reporting.' },
    ],
    startingPrice: '$1/day',
    priceUnit: 'per unit',
    pricingNote: 'No credit card required to start. Cancel anytime.',
    ctaHeading: 'Stop managing rentals with disconnected tools',
    ctaBody: 'Owners using Revun replaced 5+ tools with one system. Every payment, message, and maintenance request documented and auditable.',
    replaces: ['Kijiji listings', 'Spreadsheet tracking', 'Email chains', 'Paper leases', 'E-transfer tracking', 'Personal phone for tenant contact'],
    relatedSolutions: [
      { slug: 'tenants', title: 'Tenants' },
      { slug: 'property-management-companies', title: 'Property Management Companies' },
      { slug: 'maintenance-companies', title: 'Maintenance Companies' },
    ],
    metaTitle: 'Full Property Operations for Self-Managing Owners | Revun',
    metaDescription:
      'List units, screen tenants, generate leases, collect rent, manage maintenance, and communicate securely from one system. No personal phone numbers shared. Full audit trail on every action.',
  },
  'property-management-companies': {
    title: 'Run your entire property management company on **one system**',
    subtitle:
      'Owners, tenants, vendors, maintenance, compliance, communications, reporting, leasing, and payments all run through Revun.',
    heroEyebrow: 'For Property Management Companies',
    problemHeading: 'Five disconnected tools means five points of failure',
    problemBody:
      'Your operation runs on a patchwork of legacy software, spreadsheets, and email. Data is siloed. Reporting takes days. Scaling means more headcount instead of more throughput.',
    problemBullets: [
      'Owner reporting requires manual assembly from multiple systems',
      'Tenant communication fragmented across email, text, phone, and portal',
      'Vendor invoicing disconnected from work order completion',
      'Compliance deadlines tracked manually with zero enforcement',
    ],
    features: [
      { title: 'Owner Portal', description: 'Real-time financial dashboards, document access, and full communication history. Owners self-serve. Your phone stops ringing.', iconName: 'Building2' },
      { title: 'Tenant Lifecycle Engine', description: 'Applications, screening, lease execution, renewals, and move-outs in one continuous pipeline. No handoffs between systems.', iconName: 'CheckCircle2' },
      { title: 'Vendor Operations', description: 'Preferred vendor lists, automated work order routing, invoice matching against completed jobs, and performance scoring.', iconName: 'Wrench' },
      { title: 'Compliance Enforcement', description: 'Province and state-specific notice templates, automated deadline tracking, and audit-ready logs generated on every action.', iconName: 'FileKey2' },
      { title: 'Financial Infrastructure', description: 'Trust accounting, owner disbursements, expense categorization, bank reconciliation, and 1099/T4A generation. One ledger for everything.', iconName: 'Landmark' },
      { title: 'Team Command Center', description: 'Role-based access, task assignment with deadlines, internal notes, and activity feeds per property. Full visibility across your staff.', iconName: 'Users' },
    ],
    steps: [
      { number: '01', title: 'Import your portfolio', description: 'Bulk import properties, owners, tenants, and lease data. Dedicated migration support handles the heavy lift.' },
      { number: '02', title: 'Configure your operations', description: 'Define approval chains, notice templates, accounting rules, vendor routing, and compliance workflows for your company.' },
      { number: '03', title: 'Deploy your team', description: 'Invite staff, assign roles and permissions, and execute a guided 60-day launch program with milestone tracking.' },
      { number: '04', title: 'Scale without headcount', description: 'Add properties without adding staff. Every workflow, approval, and report stays consistent as you grow.' },
    ],
    startingPrice: '$2/day',
    priceUnit: 'per unit',
    pricingNote: 'Volume discounts for 100+ units. Custom plans available.',
    ctaHeading: 'Consolidate your entire operation into one platform',
    ctaBody: 'Book a portfolio review. We will map every workflow in your company to Revun and show you what disappears.',
    replaces: ['Buildium', 'AppFolio', 'Propertyware', 'Spreadsheets', 'Multiple disconnected tools'],
    relatedSolutions: [
      { slug: 'self-managing-owners', title: 'Self-Managing Owners' },
      { slug: 'leasing-companies', title: 'Leasing Companies' },
      { slug: 'reits', title: 'REITs & Asset Managers' },
    ],
    metaTitle: 'Complete Property Management Operating System for PMCs | Revun',
    metaDescription:
      'Owners, tenants, vendors, maintenance, compliance, communications, reporting, leasing, and payments on one platform. Replace Buildium, AppFolio, and every disconnected tool in your stack.',
  },
  brokerages: {
    title: 'Close deals faster without paperwork, chasing, or **disconnected tools**',
    subtitle:
      'Revun gives brokerages and agents one system for client communication, showing coordination, offer submission, document automation, signatures, compliance, and deal visibility.',
    heroEyebrow: 'For Brokerages & Agents',
    problemHeading: 'Admin overhead kills deals before they close',
    problemBody:
      'Agents lose transactions because they are buried in paperwork. Offer packages take hours to assemble. Showing schedules collide. Compliance is reactive instead of built into the workflow.',
    problemBullets: [
      'CRM data never flows into transaction execution',
      'Offer assembly relies on email attachments, phone calls, and manual entry',
      'Showing coordination burns hours on scheduling conflicts',
      'Compliance documentation assembled after the fact, not during the deal',
    ],
    features: [
      { title: 'Transaction CRM', description: 'Contact management, pipeline tracking, activity logging, and automated follow-ups engineered for real estate deal flow. Every interaction recorded.', iconName: 'Briefcase' },
      { title: 'Document Automation', description: 'Template-based offer packages, auto-populated fields from CRM data, e-signatures, and version control. Zero manual assembly.', iconName: 'FileKey2' },
      { title: 'Offer Command Center', description: 'Submit, track, and compare offers in real time. Automatic notifications to all parties. Full audit trail on every submission.', iconName: 'CheckCircle2' },
      { title: 'Showing Operations', description: 'Centralized calendar, lockbox integration, automated feedback collection, and route optimization. No double-bookings.', iconName: 'Home' },
      { title: 'Client Communications', description: 'Branded email and SMS templates, automated drip sequences, and a shared activity timeline per client. Every touchpoint documented.', iconName: 'MessageSquare' },
      { title: 'Compliance Infrastructure', description: 'FINTRAC, RECO, and provincial form libraries baked into every transaction. Auto-reminders enforce deadlines. Audit-ready at all times.', iconName: 'Landmark' },
    ],
    steps: [
      { number: '01', title: 'Connect your brokerage', description: 'Import your agent roster, brokerage branding, and existing contacts in a single onboarding session.' },
      { number: '02', title: 'Configure deal workflows', description: 'Set up offer packages, email sequences, compliance checklists, and approval chains for your market.' },
      { number: '03', title: 'Deploy to agents', description: '60-day guided rollout with hands-on training, support escalation, and adoption tracking per agent.' },
      { number: '04', title: 'Accelerate closings', description: 'Faster offer assembly, zero compliance gaps, full deal visibility. Measure the impact in your first quarter.' },
    ],
    startingPrice: '$49/mo',
    priceUnit: 'per agent',
    pricingNote: 'Brokerage-wide plans with volume discounts available.',
    ctaHeading: 'Give your agents an operational advantage',
    ctaBody: 'Top brokerages using Revun eliminated 60% of admin time. Book a demo and see the difference.',
    replaces: ['Follow Up Boss', 'kvCORE', 'Lone Wolf', 'Paper offer packages', 'Manual showing coordination'],
    relatedSolutions: [
      { slug: 'leasing-companies', title: 'Leasing Companies' },
      { slug: 'property-management-companies', title: 'Property Management Companies' },
    ],
    metaTitle: 'Brokerage Operations Platform for Real Estate | Revun',
    metaDescription:
      'One system for client communication, showing coordination, offer submission, document automation, signatures, compliance, and deal visibility. Replace every disconnected tool in your brokerage.',
  },
  'leasing-companies': {
    title: 'Turn leasing into a fast, auditable, **repeatable machine**',
    subtitle:
      'From inquiry to application to offer to lease to move-in, Revun runs the full leasing workflow in one place.',
    heroEyebrow: 'For Leasing Companies',
    problemHeading: 'Manual leasing operations break at scale',
    problemBody:
      'Leasing teams drown in repetitive data entry. Applications arrive by email. Lease clauses are copied and pasted. Compliance notices ship late or not at all. Every manual step is a liability.',
    problemBullets: [
      'Application intake scattered across PDFs, web forms, and walk-in paperwork',
      'Lease generation requires manual clause selection and field entry',
      'Identity verification runs through a separate, disconnected system',
      'No centralized audit trail when regulators or boards come asking',
    ],
    features: [
      { title: 'Application Pipeline', description: 'Branded intake portal with conditional logic, document uploads, and automatic screening triggers. Every applicant enters one system.', iconName: 'CheckCircle2' },
      { title: 'Offer Execution', description: 'Generate, send, and track lease offers with configurable approval chains and automatic counter-offer handling. No email ping-pong.', iconName: 'FileKey2' },
      { title: 'Lease Generation Engine', description: 'Clause libraries, auto-populated fields, province-specific defaults, and e-signatures. Leases assembled in minutes, not hours.', iconName: 'CheckCircle2' },
      { title: 'Identity Verification', description: 'Integrated ID checks, credit pulls, and reference verification. Results flow directly into the applicant profile. One pipeline.', iconName: 'Users' },
      { title: 'Compliance Automation', description: 'N-series and state-specific notices triggered automatically by lease events. PDF generation, delivery tracking, and audit logging on every action.', iconName: 'Landmark' },
      { title: 'Tenant Activation', description: 'Welcome packages, portal activation, move-in inspection checklists, utility setup reminders, and first-payment collection. Move-in is a workflow, not a scramble.', iconName: 'Home' },
    ],
    steps: [
      { number: '01', title: 'Build your lease infrastructure', description: 'Configure lease templates, clause libraries, application forms, and screening criteria for your portfolio.' },
      { number: '02', title: 'Connect your inventory', description: 'Sync vacant units and automatically generate application links tied to each listing.' },
      { number: '03', title: 'Process at speed', description: 'Screen, verify, approve, generate lease, collect signatures, and onboard. One workflow, zero handoffs.' },
      { number: '04', title: 'Activate tenants', description: 'Portal access, welcome documentation, move-in inspection, and first-payment confirmation triggered automatically.' },
    ],
    startingPrice: '$1.50/day',
    priceUnit: 'per unit',
    pricingNote: 'Includes unlimited applications and lease generations.',
    ctaHeading: 'Eliminate manual leasing permanently',
    ctaBody: 'Leasing companies using Revun cut time-to-lease by 40%. Every step documented, every action auditable.',
    replaces: ['PDF applications', 'Manual lease assembly', 'Separate screening tools', 'Email-based workflows'],
    relatedSolutions: [
      { slug: 'property-management-companies', title: 'Property Management Companies' },
      { slug: 'brokerages', title: 'Brokerages & Agents' },
      { slug: 'self-managing-owners', title: 'Self-Managing Owners' },
    ],
    metaTitle: 'Leasing Operations Platform for Leasing Companies | Revun',
    metaDescription:
      'From inquiry to application to offer to lease to move-in in one system. Automate applications, lease generation, identity verification, compliance notices, and tenant activation.',
  },
  'maintenance-companies': {
    title: 'Run your maintenance operation from intake to proof of work to **payment**',
    subtitle:
      'Revun gives maintenance companies one system for dispatch, scheduling, technician updates, approvals, proof of completion, invoicing, and customer communication.',
    heroEyebrow: 'For Maintenance Companies',
    problemHeading: 'Phone calls and text messages are not an operating system',
    problemBody:
      'Your operation runs on phone calls, group chats, and handwritten invoices. Scheduling conflicts burn hours. Proof of work is a photo buried in a camera roll. Invoicing lags weeks behind completion.',
    problemBullets: [
      'Work orders arrive by phone, email, and text with no centralized intake or prioritization',
      'Technician scheduling relies on memory, group chats, and verbal commitments',
      'Proof of completion scattered across personal devices with no chain of custody',
      'Invoicing is manual and delayed, directly eroding cash flow',
    ],
    features: [
      { title: 'Work Order Command', description: 'Centralized intake portal for property managers. Auto-categorization by trade, priority, and location. Routing rules enforce assignment logic.', iconName: 'CheckCircle2' },
      { title: 'Dispatch Operations', description: 'Drag-and-drop scheduling, availability management, GPS tracking, and automatic notifications to technicians. Zero scheduling conflicts.', iconName: 'Wrench' },
      { title: 'Field Execution App', description: 'Technicians view assignments, update status in real time, upload photos, capture signatures, and log materials from the job site.', iconName: 'CheckCircle2' },
      { title: 'Proof of Completion', description: 'Before/after photos, time logs, materials used, and tenant sign-off captured and stored per job. Auditable chain of custody on every work order.', iconName: 'CheckCircle2' },
      { title: 'Invoicing Engine', description: 'Auto-generate invoices from completed work orders with materials, labor, and markup. Payment tracking and automated reminders eliminate collection delays.', iconName: 'Landmark' },
      { title: 'Client Visibility Portal', description: 'Property managers see real-time job status, full work history, and spend analytics across their entire portfolio. Transparency drives retention.', iconName: 'Building2' },
    ],
    steps: [
      { number: '01', title: 'Configure your operation', description: 'Add technicians, define trade specialties, set service areas, configure availability windows, and establish routing rules.' },
      { number: '02', title: 'Onboard your clients', description: 'Invite property managers to submit work orders through your branded portal. Set SLAs and escalation paths per client.' },
      { number: '03', title: 'Dispatch and execute', description: 'Assign jobs based on trade, location, and availability. Monitor progress in real time. Collect proof of completion at the job site.' },
      { number: '04', title: 'Invoice and optimize', description: 'Auto-generate invoices on job close, track payments, and use operational analytics to identify efficiency gains.' },
    ],
    startingPrice: '$99/mo',
    priceUnit: 'per team',
    pricingNote: 'Unlimited work orders. Add technicians for $19/mo each.',
    ctaHeading: 'Replace phone dispatch with a real operating system',
    ctaBody: 'Maintenance companies using Revun cut dispatch time by 70% and eliminated invoicing delays. Book a demo.',
    replaces: ['Jobber', 'ServiceTitan', 'Paper work orders', 'Phone dispatch', 'Manual invoicing'],
    relatedSolutions: [
      { slug: 'property-management-companies', title: 'Property Management Companies' },
      { slug: 'self-managing-owners', title: 'Self-Managing Owners' },
      { slug: 'reits', title: 'REITs & Asset Managers' },
    ],
    metaTitle: 'Maintenance Operations Platform for Property Maintenance | Revun',
    metaDescription:
      'One system for dispatch, scheduling, technician updates, approvals, proof of completion, invoicing, and customer communication. Replace Jobber, ServiceTitan, and every disconnected tool.',
  },
  reits: {
    title: 'Institutional control across every property, team, and **workflow**',
    subtitle:
      'Standardize operating procedures, reporting, permissions, communications, payments, and oversight across your full portfolio.',
    heroEyebrow: 'For REITs & Asset Managers',
    problemHeading: 'Fragmented operations scale risk, not efficiency',
    problemBody:
      'Every acquisition inherits a different system. Reporting is a quarterly fire drill. Compliance risk multiplies with unit count. Board visibility permanently lags reality.',
    problemBullets: [
      'Each property operates on a different system with incompatible data formats',
      'Consolidated reporting requires weeks of manual reconciliation across entities',
      'Compliance gaps surface after audits, never before',
      'No real-time portfolio-level dashboard for leadership or board reporting',
    ],
    features: [
      { title: 'Portfolio Command Dashboard', description: 'Real-time KPIs across every property: occupancy, collections, maintenance spend, and NOI. Filter by region, asset class, manager, or entity.', iconName: 'Landmark' },
      { title: 'Operational Standardization', description: 'Enforce consistent workflows, approval chains, document templates, and procedures across all properties. Acquisition history becomes irrelevant.', iconName: 'Building2' },
      { title: 'Permission Architecture', description: 'Granular access control by property, region, function, and seniority. Every action audit-logged. Every permission enforced at the system level.', iconName: 'FileKey2' },
      { title: 'Reporting Infrastructure', description: 'Custom report builder, scheduled distribution, and export to your BI stack. Board-ready decks generated on demand with live data.', iconName: 'CheckCircle2' },
      { title: 'Integration Layer', description: 'REST APIs, webhooks, and pre-built connectors for Yardi, MRI, Sage, QuickBooks, and major banking platforms. Your data flows where it needs to go.', iconName: 'Link2' },
      { title: 'Governance Framework', description: 'Configurable approval workflows, spending limits, exception escalation, and policy enforcement per entity. Compliance is structural, not aspirational.', iconName: 'CheckCircle2' },
    ],
    steps: [
      { number: '01', title: 'Portfolio assessment', description: 'We map your current systems, data flows, operational gaps, and compliance exposure across every property and entity.' },
      { number: '02', title: 'Configuration and migration', description: 'Standardize workflows, migrate data, integrate with your financial systems, and establish governance rules per entity.' },
      { number: '03', title: 'Phased deployment', description: 'Roll out region-by-region with dedicated onboarding support for each property team. Zero disruption to active operations.' },
      { number: '04', title: 'Optimize and govern', description: 'Continuous improvement with quarterly business reviews, performance benchmarking, and a dedicated enterprise account team.' },
    ],
    startingPrice: 'Custom',
    priceUnit: 'portfolio pricing',
    pricingNote: 'Dedicated account team. Enterprise SLA. SOC 2 compliant.',
    ctaHeading: 'Unify your portfolio under one operating system',
    ctaBody: 'Schedule a portfolio assessment with our enterprise team. We will map every gap and show you what consolidation looks like.',
    replaces: ['Yardi', 'MRI Software', 'Multiple legacy systems', 'Manual consolidation', 'Excel reporting'],
    relatedSolutions: [
      { slug: 'property-management-companies', title: 'Property Management Companies' },
      { slug: 'maintenance-companies', title: 'Maintenance Companies' },
      { slug: 'internal-ops-teams', title: 'Internal Ops Teams' },
    ],
    metaTitle: 'Institutional Property Operations for REITs & Asset Managers | Revun',
    metaDescription:
      'Standardize operating procedures, reporting, permissions, communications, payments, and oversight across your full portfolio. Replace Yardi, MRI, and every legacy system.',
  },
  tenants: {
    title: 'One secure portal for your **entire rental experience**',
    subtitle:
      'Browse listings, apply online, pay rent, submit maintenance requests, communicate securely with your property team, and access all documents in one place.',
    heroEyebrow: 'For Tenants',
    problemHeading: 'Renting should not require five apps and a paper trail',
    problemBody:
      'You pay rent through e-transfer, report maintenance by text, sign leases on paper, and have no record of anything. Every interaction is scattered, undocumented, and impossible to reference later.',
    problemBullets: [
      'Rent payments leave no structured record tied to your lease',
      'Maintenance requests disappear into text threads with no tracking',
      'Lease documents buried in email attachments or lost entirely',
      'No secure communication channel — everything runs through personal phone numbers',
    ],
    features: [
      { title: 'Tenant Portal', description: 'One dashboard for your lease, payment history, maintenance status, documents, and messages. Everything about your rental in one place.', iconName: 'Home' },
      { title: 'Secure Payments', description: 'Pay rent by pre-authorized debit, credit card, or e-transfer. Automated receipts and full payment history. No personal banking details shared with landlords.', iconName: 'CreditCard' },
      { title: 'Maintenance Requests', description: 'Submit requests with photos and descriptions. Track status from submission to completion. Full history stored permanently.', iconName: 'Wrench' },
      { title: 'Document Access', description: 'Your lease, notices, inspection reports, and receipts stored securely and accessible anytime. No searching through email.', iconName: 'FileKey2' },
      { title: 'Private Communications', description: 'Message your property manager or landlord through the platform. No personal phone numbers exchanged. Every conversation documented.', iconName: 'MessageSquare' },
      { title: 'Application & Screening', description: 'Apply to listings directly through Revun. Upload documents, authorize screening, and track your application status in real time.', iconName: 'CheckCircle2' },
    ],
    steps: [
      { number: '01', title: 'Find your rental', description: 'Browse available listings, schedule viewings, and submit applications directly through the platform.' },
      { number: '02', title: 'Apply and get approved', description: 'Complete your application, authorize screening, upload documents, and receive your approval notification.' },
      { number: '03', title: 'Sign and move in', description: 'Review and e-sign your lease, set up payment method, and access your tenant portal with all move-in details.' },
      { number: '04', title: 'Live and manage', description: 'Pay rent, submit maintenance requests, communicate with your property team, and access documents — all from one portal.' },
    ],
    startingPrice: 'Free',
    priceUnit: 'included with property manager account',
    pricingNote: 'Tenants never pay for Revun. Access is included when your property uses the platform.',
    ctaHeading: 'Your rental, fully organized',
    ctaBody: 'When your property manager or landlord uses Revun, you get a secure portal for payments, maintenance, documents, and communication at no cost.',
    replaces: ['E-transfer rent payments', 'Text message maintenance', 'Paper leases', 'Email document chains', 'Personal phone contact'],
    relatedSolutions: [
      { slug: 'self-managing-owners', title: 'Self-Managing Owners' },
      { slug: 'property-management-companies', title: 'Property Management Companies' },
      { slug: 'leasing-companies', title: 'Leasing Companies' },
    ],
    metaTitle: 'Tenant Portal for Secure Rent, Maintenance & Communication | Revun',
    metaDescription:
      'One portal for rent payments, maintenance requests, lease documents, and secure communication with your property team. Free for tenants when your property uses Revun.',
  },
  'internal-ops-teams': {
    title: 'The operating system your **team actually uses**',
    subtitle:
      'Task management, role-based access, team coordination, internal communications, and full operational visibility — all in one system.',
    heroEyebrow: 'For Internal Ops Teams',
    problemHeading: 'Your team runs on chat threads and shared drives',
    problemBody:
      'Internal operations rely on Slack messages, shared spreadsheets, and tribal knowledge. Tasks fall through cracks. Permissions are inconsistent. Nobody has a clear view of who owns what.',
    problemBullets: [
      'Task assignment and tracking scattered across email, chat, and spreadsheets',
      'Role permissions managed manually with no enforcement or audit trail',
      'Team coordination depends on meetings instead of system visibility',
      'Operational reporting requires manual compilation from multiple sources',
    ],
    features: [
      { title: 'Task Management', description: 'Assign, prioritize, and track tasks across your team with deadlines, dependencies, and status updates. Nothing falls through the cracks.', iconName: 'CheckCircle2' },
      { title: 'Role-Based Access', description: 'Granular permissions by function, property, and seniority. Enforced at the system level with full audit logging on every action.', iconName: 'FileKey2' },
      { title: 'Team Coordination', description: 'Shared dashboards, workload visibility, and assignment routing. Every team member sees their responsibilities and deadlines in one view.', iconName: 'Users' },
      { title: 'Internal Communications', description: 'In-platform messaging tied to properties, tasks, and tenants. Conversations are contextual, searchable, and permanently documented.', iconName: 'MessageSquare' },
      { title: 'Operational Dashboards', description: 'Real-time visibility into team performance, task completion rates, response times, and workload distribution. No manual reporting.', iconName: 'BarChart3' },
      { title: 'Workflow Automation', description: 'Trigger task creation, notifications, escalations, and approvals based on system events. Reduce manual coordination to zero.', iconName: 'Rocket' },
    ],
    steps: [
      { number: '01', title: 'Map your team structure', description: 'Define roles, departments, reporting lines, and permission levels for your organization.' },
      { number: '02', title: 'Configure workflows', description: 'Set up task templates, automation rules, escalation paths, and approval chains for your operations.' },
      { number: '03', title: 'Onboard your team', description: 'Invite team members, assign roles, and run guided training. Every person sees only what they need to see.' },
      { number: '04', title: 'Operate with visibility', description: 'Track tasks, monitor performance, coordinate across teams, and generate reports automatically. Full operational control.' },
    ],
    startingPrice: 'Included',
    priceUnit: 'with operator plans',
    pricingNote: 'Internal ops tools are included with all property management and enterprise plans.',
    ctaHeading: 'Give your team one system to run everything',
    ctaBody: 'Internal ops teams using Revun eliminated spreadsheet coordination and reduced task leakage to zero. Book a demo.',
    replaces: ['Shared spreadsheets', 'Slack task tracking', 'Manual permission management', 'Email coordination', 'Meeting-based status updates'],
    relatedSolutions: [
      { slug: 'property-management-companies', title: 'Property Management Companies' },
      { slug: 'reits', title: 'REITs & Asset Managers' },
      { slug: 'maintenance-companies', title: 'Maintenance Companies' },
    ],
    metaTitle: 'Internal Operations Platform for Property Teams | Revun',
    metaDescription:
      'Task management, role-based access, team coordination, internal communications, and operational dashboards in one system. Included with all operator plans.',
  },
}

const allSlugs = Object.keys(solutionData)

/* ── Static params ────────────────────────────────────────────────────────── */

export function generateStaticParams() {
  return allSlugs.map((audience) => ({ audience }))
}

/* ── Metadata ─────────────────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ audience: string }>
}): Promise<Metadata> {
  const { audience } = await params
  const data = solutionData[audience]
  if (!data) return {}
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: { canonical: buildCanonicalUrl(`/solutions/${audience}`) },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      url: buildCanonicalUrl(`/solutions/${audience}`),
    },
  }
}

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ audience: string }>
}) {
  const { audience } = await params
  const data = solutionData[audience]
  if (!data) notFound()

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://revun.com/' },
      { '@type': 'ListItem', position: 2, name: 'Solutions', item: 'https://revun.com/solutions/' },
      { '@type': 'ListItem', position: 3, name: data.metaTitle.split(' | ')[0], item: buildCanonicalUrl(`/solutions/${audience}`) },
    ],
  }

  const serviceJsonLd = buildServiceSchema({
    name: `Revun for ${data.metaTitle.split(' | ')[0]}`,
    description: data.metaDescription,
    serviceType: 'Property Operations Software',
    url: buildCanonicalUrl(`/solutions/${audience}`),
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(serviceJsonLd) }}
      />
      <SolutionDetailClient
        data={data}
        slug={audience}
      />
    </>
  )
}
