import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, CheckCircle2, HelpCircle, User } from 'lucide-react'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema, buildFAQPageSchema, buildServiceSchema } from '@/lib/schema-builders'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

/* ───────────────────────────────────────────────────────────────────────────
 * Data
 * ─────────────────────────────────────────────────────────────────────────── */

interface Persona {
  slug: string
  title: string
  eyebrow: string
  heroSub: string
  context: string
  stats: { label: string; value: string }[]
  valueProps: { title: string; body: string }[]
  faqs: { q: string; a: string }[]
  related: string[]
}

const personas: Record<string, Persona> = {
  'first-time-landlord': {
    slug: 'first-time-landlord',
    title: 'First-time landlord',
    eyebrow: 'Self-manage',
    heroSub: 'You just bought your first rental and you have no idea what to do next. Revun gives you the platform pro operators use, free for your first unit.',
    context: 'About 70% of North American rental units are owned by individuals, not institutions, and the largest single segment of those owners are people renting out one property for the first time. The 2024 Statistics Canada Survey on Financial Security and the US Census American Housing Survey both show first-time landlords spend an average of 18 hours per month managing one rental, mostly because they piece the workflow together from email, text messages, and bank apps. Revun replaces all of it.',
    stats: [
      { label: 'Hours per month, no system', value: '~18' },
      { label: 'Hours per month, with Revun', value: '<4' },
      { label: 'First unit is', value: 'Free' },
      { label: 'Time to set up', value: '<15 min' },
    ],
    valueProps: [
      { title: 'Province + state-compliant lease', body: 'Generate a lease that actually meets your jurisdiction’s legal requirements. Ontario Standard Lease, BC Tenancy Agreement, California-compliant disclosures, NJ Truth-in-Renting. Auto-populated, e-signed, stored forever.' },
      { title: 'Listings + screening for one click', body: 'Publish to Kijiji, Rentals.ca, Zumper, Apartments.com from one form. Applicants submit through your branded portal with credit and ID check built in.' },
      { title: 'Rent collection without sharing your banking', body: 'Tenants pay via Interac e-Transfer, ACH, or card. You never share your personal banking details. Late payments trigger the right notice automatically.' },
      { title: 'Maintenance + privacy', body: 'Tenants submit maintenance requests through the portal with photos. You never share your personal phone number. Every conversation timestamped and saved.' },
    ],
    faqs: [
      { q: 'I have never been a landlord before. Is Revun too much for me?', a: 'No. Revun is designed so that a first-time landlord can be operational in under 15 minutes. The platform handles compliance and workflow so you do not need to know the rules cold; the rules are built in.' },
      { q: 'How much does it cost for my first rental?', a: 'Free. The first 1 to 2 units cost zero. You only start paying when your portfolio grows beyond that.' },
      { q: 'What happens if my tenant disputes something at the LTB or housing court?', a: 'Revun maintains an audit trail of every payment, every conversation, and every maintenance request. Most disputes resolve faster when the landlord shows up with documented timestamps and signed records, which is exactly what Revun produces.' },
      { q: 'Can I switch to Revun mid-tenancy?', a: 'Yes. You can onboard an existing tenant: upload the current lease, set up the rent collection, and they get portal access. Most first-time landlords switch over within 30 minutes.' },
    ],
    related: ['condo-landlord', 'house-landlord', 'small-portfolio'],
  },
  'condo-landlord': {
    slug: 'condo-landlord',
    title: 'Condo landlord',
    eyebrow: 'Self-manage',
    heroSub: 'You own a rental condo and live somewhere else, or just want a system that handles strata rules, condo association approvals, and tenant management without a PMC fee.',
    context: 'Condo rental ownership is the largest segment of investor-held residential real estate in major North American cities. CMHC estimates condos make up 40-60% of rental supply in downtown Toronto, Vancouver, and Montreal. Florida and Hawaii have similar concentrations. Condo rental ownership introduces complexity beyond a typical SFR: condo board approvals, strata bylaw restrictions, special assessments, and amenity-fee allocations. Revun handles each natively.',
    stats: [
      { label: 'Toronto rental supply that is condos', value: '~55%' },
      { label: 'Vancouver rental supply that is condos', value: '~50%' },
      { label: 'Avg. condo board approval time', value: '7-14 days' },
      { label: 'Typical strata rental restriction', value: 'Common' },
    ],
    valueProps: [
      { title: 'Strata + condo board workflow', body: 'Per-property condo association rules tracked centrally. Board approval timelines, fee schedules, and rental restriction status all stored on the unit record.' },
      { title: 'Remote landlord operations', body: 'If you live in another city or country from your condo, Revun runs everything remotely. Maintenance dispatch to local vendors, tenant communication, rent collection, and tribunal evidence packages.' },
      { title: 'Special assessment + fee tracking', body: 'Condo special assessments, monthly maintenance fees, and any pass-through to tenant tracked separately on the unit ledger. Tax reporting accommodates condo-specific deductions.' },
      { title: 'Tenant + strata coordination', body: 'When your tenant has a question about strata rules (parking, pets, garbage), Revun has the rule on the unit record so you can answer without calling the board.' },
    ],
    faqs: [
      { q: 'My strata bylaws limit rentals. Does Revun help me track that?', a: 'Yes. Per-unit strata rental restriction status, exemption status (under BC Bill 44 for example), and AGM voting on rental rule changes all tracked on the unit record.' },
      { q: 'Does Revun handle Toronto Rental Housing Operator Licence (RHOL) tracking?', a: 'Yes. For Toronto condos that require an RHOL (most units built before Nov 15, 2018), licence expiry and renewal windows are tracked centrally.' },
      { q: 'What about Vancouver Empty Homes Tax?', a: 'Yes. Annual EHT declaration deadline tracked in Revun’s compliance calendar with reminders 30 and 7 days out. Avoids the automatic 3% tax assessment from missed declaration.' },
      { q: 'Can my condo board access anything in Revun?', a: 'No. The condo board has no access to your Revun account. You decide what to share with the board (typically tenant contact info if the bylaws require it).' },
    ],
    related: ['first-time-landlord', 'house-landlord', 'investor-owner'],
  },
  'house-landlord': {
    slug: 'house-landlord',
    title: 'House landlord',
    eyebrow: 'Self-manage',
    heroSub: 'You rent out a single-family home or duplex. Maintenance is your biggest cost, tenant communication is your biggest time sink, and you do not need a PMC.',
    context: 'Single-family home rental ownership covers a wide range: an old family home rented to cover the mortgage, a deliberate investment property, an inherited house turned rental. Maintenance volume is higher per door than condos because the landlord owns the building envelope (roof, furnace, water heater, exterior). Revun routes maintenance to local vendors with the kind of structured workflow that PMCs charge 10% of rent for.',
    stats: [
      { label: 'NA single-family rentals', value: '~16M' },
      { label: 'Avg. maintenance cost per door per year', value: '$2,400' },
      { label: 'Time saved with vendor routing', value: '~5 hours / mo' },
      { label: 'PMC fee replaced', value: '8-12% of rent' },
    ],
    valueProps: [
      { title: 'Vendor bench for your area', body: 'Build a preferred vendor list per service category (HVAC, plumbing, roofing, lawn). Revun routes maintenance to the right vendor without you texting around for quotes.' },
      { title: 'Preventive maintenance scheduling', body: 'Annual HVAC service, gutter cleaning, smoke alarm inspection, and seasonal turn checklists schedule automatically. Saves the $4,000 emergency that would have been a $400 preventive job.' },
      { title: 'Inspection workflows', body: 'Move-in, move-out, and periodic inspections with photo-based checklists. The kind of documentation that wins disputes at the LTB or in small claims court.' },
      { title: 'Owner-grade reporting', body: 'Year-end summary by property: rental income, expenses categorized for tax filing, capital improvements separated. Hands directly to your accountant.' },
    ],
    faqs: [
      { q: 'My house has a basement suite. Does Revun handle multi-unit ownership in one building?', a: 'Yes. Primary unit plus secondary suite (legal or non-conforming) tracked as two units on one property. Shared utility allocation, separate leases, and separate ledgers.' },
      { q: 'I am not always available for vendor calls. Can tenants schedule directly with vendors?', a: 'Yes. After you approve the work order, vendors can coordinate scheduling with the tenant in the platform without going through you for every back-and-forth.' },
      { q: 'How does Revun handle annual rent increases for an SFR?', a: 'Annual rent increase windows tracked per unit per jurisdiction. Notice generates with the right form (N1 in Ontario, RTB-7 in BC, AB 1482-compliant notice in California) on the right schedule.' },
      { q: 'Does Revun integrate with my QuickBooks?', a: 'Yes. Sync rent income, maintenance expenses, and owner draws to your QuickBooks file. Most house landlords run QuickBooks Online or Wave for personal accounting; both are supported.' },
    ],
    related: ['condo-landlord', 'small-portfolio', 'investor-owner'],
  },
  'furnished-rental': {
    slug: 'furnished-rental',
    title: 'Furnished rental operator',
    eyebrow: 'Self-manage',
    heroSub: 'Mid-term furnished rentals (30-90 days) sit between short-term and long-term. Revun handles guest screening, turnover cleaning, and the channel mix.',
    context: 'Mid-term furnished rentals have grown faster than any other rental segment over the past five years, driven by remote work, traveling professionals, and insurance-displaced families. Average stay length in the 30-90 day window has pushed many former Airbnb operators to migrate toward mid-term as municipalities tighten short-term rental rules. Revun handles the operational pattern that sits between traditional landlording and Airbnb hosting.',
    stats: [
      { label: 'NA mid-term furnished growth (2020-2024)', value: '+340%' },
      { label: 'Average mid-term stay', value: '52 nights' },
      { label: 'Typical channel mix', value: 'Furnished Finder + direct + LinkedIn' },
      { label: 'Annual occupancy target', value: '75-85%' },
    ],
    valueProps: [
      { title: 'Channel mix for mid-term', body: 'Sync inventory to Furnished Finder, Blueground, AnyPlace, Sabbatical Homes, and your direct booking site. Calendar coordination prevents double-bookings.' },
      { title: 'Mid-term guest screening', body: 'Background check plus employment verification suitable for the longer commitment of a 30 to 90 day stay. Faster than a 12-month lease but more rigorous than an Airbnb booking.' },
      { title: 'Furnished inventory tracking', body: 'Per-unit furniture, appliance, and supply inventory. Photo-based check-in / check-out inspections. Damage allocation against deposit on departure.' },
      { title: 'Mid-term lease + housing agreement', body: 'Generate the right agreement type (residential lease vs hotel-style guest agreement) based on stay length and jurisdiction. Many mid-term cities require lease-style agreements above 30 days.' },
    ],
    faqs: [
      { q: 'Is a mid-term furnished rental a hotel or a residential tenancy?', a: 'Depends on jurisdiction and stay length. Generally, stays over 30 days in most provinces and states fall under residential tenancy law. Revun generates the right document type and tracks the regulatory category per unit.' },
      { q: 'Can I run a mix of short-term, mid-term, and long-term in one portfolio?', a: 'Yes. Many operators have a property mix that includes all three. Each unit carries its own rental category, regulation profile, and channel mix.' },
      { q: 'How does Revun handle cleaning and turnover for mid-term?', a: 'Cleaning workflows configured per turn. Mid-term turns typically include deeper deep-clean plus furniture inspection and supply replenishment. Photo-based proof of work on every turn.' },
      { q: 'What about insurance for furnished rentals?', a: 'Standard homeowner insurance does not cover furnished rental activity. Operators typically carry short-term rental or commercial liability coverage. Revun tracks per-property insurance policies and renewal dates.' },
    ],
    related: ['investor-owner', 'small-portfolio', 'house-landlord'],
  },
  'relocation-landlord': {
    slug: 'relocation-landlord',
    title: 'Relocation landlord',
    eyebrow: 'Self-manage',
    heroSub: 'You are renting out your home while away on a temporary assignment, military posting, or sabbatical. Revun gives you remote management without paying a PMC 10%.',
    context: 'Roughly 8% of North American homeowners rent out their primary residence during a temporary relocation: military PCS orders, expat assignments, sabbaticals, snowbird seasonal moves, and family caregiving relocations. The defining requirement is that you intend to return, so the tenancy must end on schedule. Revun handles fixed-term leasing, return-date workflows, and the remote operational stack to keep the property safe while you are away.',
    stats: [
      { label: 'NA homeowners on temp relocation', value: '~3M' },
      { label: 'Average relocation length', value: '14-36 months' },
      { label: 'Fixed-term return success rate', value: '~85% with documentation' },
      { label: 'Hours saved per month', value: '12+' },
    ],
    valueProps: [
      { title: 'Fixed-term lease + return workflow', body: 'Generate a lease that ends on your return date with the legal grounds documented (owner use in Ontario uses an N12; California requires Just Cause documentation; BC requires specific RTB notice). The platform tracks the return date and triggers the right notices.' },
      { title: 'Remote management stack', body: 'Maintenance dispatch to local vendors, tenant communication via in-app messaging, and rent collection without sharing your personal banking. Runs from anywhere on the planet.' },
      { title: 'Property inspections while you are away', body: 'Periodic interior inspections (quarterly or semi-annual) handled by a local inspector you approve. Photos and reports stored on the property record.' },
      { title: 'Tax handling for non-resident owners', body: 'If you relocate outside the country, Canadian Section 216 withholding and US non-resident landlord tax workflows are supported. Required withholding calculated and remitted; tax filings generated for your accountant.' },
    ],
    faqs: [
      { q: 'I am being relocated for 2 years. Can the tenant be required to leave when I return?', a: 'In most jurisdictions, a fixed-term lease with documented owner-use intent gives you the legal grounds to require return of possession. Documentation matters: Revun generates the lease with the right grounds and tracks the return date.' },
      { q: 'I am in the military and getting PCS orders. Does Revun help with that?', a: 'Yes. SCRA protections, BAH-aware rent setting, and PCS-friendly notice handling are built in. Many active-duty service members use Revun for their stateside rental while on assignment.' },
      { q: 'I am relocating to another country. Does Revun handle non-resident tax obligations?', a: 'Yes. Canadian non-residents face a 25% withholding on gross rent unless a Section 216 election is filed. US non-resident landlords have similar IRS withholding obligations. Revun handles the calculation and remittance.' },
      { q: 'What if I want to return early?', a: 'Depends on jurisdiction and your tenant agreement. Most leases allow for early termination with cause (owner moving back in) but require notice plus sometimes relocation assistance. Revun documents the workflow per jurisdiction.' },
    ],
    related: ['first-time-landlord', 'furnished-rental', 'condo-landlord'],
  },
  'small-portfolio': {
    slug: 'small-portfolio',
    title: 'Small portfolio owner',
    eyebrow: 'Self-manage',
    heroSub: 'You own 3 to 20 units across a city or region. Too small to hire a PMC. Too big to manage on spreadsheets. Revun is the operational layer for your scale.',
    context: 'Small portfolio owners (3-20 units) are the largest underserved segment in property management software. Below 3 units, free or low-tier tools work. Above 20 units, hiring a PMC or full Buildium / AppFolio implementation makes sense. In the middle, owners struggle with spreadsheets and disconnected tools. Revun gives small portfolio owners the same workflow infrastructure pro operators use, priced at the small-portfolio scale.',
    stats: [
      { label: 'NA owners in 3-20 unit range', value: '~2M+' },
      { label: 'Average portfolio size', value: '7 units' },
      { label: 'Hours saved per month with one platform', value: '15-25' },
      { label: 'PMC cost replaced', value: '$200-$2,000 / mo' },
    ],
    valueProps: [
      { title: 'Portfolio-wide reporting', body: 'See all units in one dashboard: occupancy, rent status, maintenance volume, expense categories. Drill into any unit without changing systems.' },
      { title: 'Per-unit operational ledger', body: 'Each unit carries its own lease, payment ledger, maintenance history, and tenant record. Aggregate to portfolio when you want; drill to unit when you need.' },
      { title: 'Bulk operations', body: 'Annual rent increase notices, policy update communications, and lease renewal nudges fire across the portfolio in one operation. Same workflow PMCs use.' },
      { title: 'Vendor + team management', body: 'Add a part-time bookkeeper or maintenance coordinator with role-based access. The portfolio runs without you having to do every keystroke.' },
    ],
    faqs: [
      { q: 'I have 8 units across 3 different buildings. Can Revun handle that?', a: 'Yes. Building, unit, and lease are separate concepts in Revun. Buildings carry property-level data (taxes, insurance, common area); units carry lease-level data; leases carry tenant-level data. Standard for 3-20 unit portfolios.' },
      { q: 'Can my bookkeeper access only the financial data?', a: 'Yes. Role-based access restricts users to specific functions (financial, operational, leasing). Your bookkeeper sees the ledger and reports without seeing maintenance requests.' },
      { q: 'I have a part-time leasing assistant. Can they handle showings and applications?', a: 'Yes. Assistant role with leasing-only permissions handles inquiries, schedules showings, and processes applications. You approve the final lease.' },
      { q: 'What does Revun cost for a 10-unit portfolio?', a: 'At $1 per unit per day, a 10-unit portfolio runs about $300 per month. Compare to a PMC at 8-10% of $2,000 average rent across 10 units, which would run $1,600-$2,000 per month.' },
    ],
    related: ['investor-owner', 'house-landlord', 'condo-landlord'],
  },
  'investor-owner': {
    slug: 'investor-owner',
    title: 'Investor owner',
    eyebrow: 'Self-manage',
    heroSub: 'You hold rentals as an investment, not a hobby. Revun gives you the operating system to scale from 5 doors to 50 without hiring full-time staff.',
    context: 'Investor-class property ownership has been the fastest-growing segment of North American real estate over the past decade. Self-directed investors using cash, lines of credit, and SDIRA structures have built portfolios that compete with institutional operators on a per-door basis. The operational pattern differs from a hobby landlord: scale-focused vendor relationships, sophisticated owner accounting, and infrastructure that does not require the owner to be in every conversation. Revun is built for that.',
    stats: [
      { label: 'NA non-institutional investor portfolios', value: '~3M+' },
      { label: 'Average investor portfolio size', value: '12 doors' },
      { label: 'Target IRR for investors', value: '10-15% net' },
      { label: 'Operational cost per door per month', value: '<$30 with Revun' },
    ],
    valueProps: [
      { title: 'Scale-ready vendor bench', body: 'Preferred vendor lists with volume rate cards, performance scoring, and 1099 / T5018 tax reporting built in. The kind of vendor infrastructure that lets you grow doors without growing headaches.' },
      { title: 'Investor accounting', body: 'Per-property P&L, cap rate tracking, NOI calculation, and debt service coverage ratio (DSCR) by property. Hands directly to your CPA or accountant during tax season.' },
      { title: 'Multi-entity ownership', body: 'LLCs, S-corps, partnerships, and personal ownership entities each configured separately. Cross-entity reporting at the portfolio level for personal IRR tracking.' },
      { title: 'Acquisition + disposition workflows', body: 'Add a new property with bulk import. Sell a property with disposition workflow: tenant notice, sale contingency status, and basis tracking for capital gains.' },
    ],
    faqs: [
      { q: 'I run my properties through multiple LLCs for liability protection. Can Revun handle that?', a: 'Yes. Multi-entity ownership is standard for investor-class operators. Each LLC is configured separately with its own financial reporting; portfolio-level views aggregate across entities.' },
      { q: 'I want to track IRR and cap rate at the portfolio level. Does Revun do that?', a: 'Yes. Per-property NOI, cap rate, DSCR, and IRR calculations available. Comparison views show which properties are pulling weight and which are underperforming.' },
      { q: 'Can Revun handle 1031 exchanges?', a: 'Yes. Disposition workflow integrates with 1031 exchange tracking: relinquished property documentation, identification period, exchange period, and basis carryover.' },
      { q: 'My properties are in 3 different states / provinces. Does that work?', a: 'Yes. Multi-jurisdiction portfolios are standard. Each unit carries its own state or provincial compliance profile while reporting rolls up to the portfolio level.' },
    ],
    related: ['small-portfolio', 'house-landlord', 'condo-landlord'],
  },
}

/* ───────────────────────────────────────────────────────────────────────────
 * Static params + metadata
 * ─────────────────────────────────────────────────────────────────────────── */

export function generateStaticParams() {
  return Object.keys(personas).map((persona) => ({ persona }))
}

type Props = {
  params: Promise<{ persona: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { persona } = await params
  const data = personas[persona]
  if (!data) return { title: 'Self-manage Persona Not Found | Revun' }

  const title = `${data.title} | Self-manage with Revun`
  const description = data.heroSub
  const url = buildCanonicalUrl(`/self-manage/${data.slug}`)

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

export default async function SelfManagePersonaPage({ params }: Props) {
  const { persona } = await params
  const data = personas[persona]
  if (!data) notFound()

  const pageUrl = `https://revun.com/self-manage/${data.slug}/`

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Self-manage', url: 'https://revun.com/self-manage/' },
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
              serviceType: 'Property Management Software for Self-Managing Owners',
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
                href="/self-manage/get-started/"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-blue px-8 text-base font-semibold text-white transition-colors duration-100 hover:bg-brand-blue-dark"
              >
                Get started
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/self-manage/pricing/"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] px-8 text-base font-semibold text-[#0A1628]"
              >
                See pricing
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
              <User className="h-4 w-4" />
              For this kind of operator
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-graphite md:text-4xl">
              Who this is for
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[#475569]">{data.context}</p>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.08} className="mt-12">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {data.stats.map((s) => (
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
                What you get
              </p>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-graphite md:text-4xl">
                What Revun does for {data.title.toLowerCase()}s
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
            <h2 className="mb-6 font-heading text-2xl font-bold text-brand-graphite">If this is not quite you</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {data.related.map((r) => {
                const rel = personas[r]
                if (!rel) return null
                return (
                  <Link
                    key={r}
                    href={`/self-manage/${r}/`}
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
              Start managing your property the right way
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-[#555860]">
              No credit card required to get started. First unit is free.
            </p>
            <div className="mt-10">
              <Link
                href="/self-manage/get-started/"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#176FEB] px-8 text-base font-semibold text-white transition-colors duration-100 hover:bg-[#1260D6]"
              >
                Get started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}
