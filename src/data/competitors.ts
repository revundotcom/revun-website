/**
 * Competitor data for /compare/[competitor] pages.
 *
 * Each record powers a dedicated "Revun vs {Competitor}" comparison page that
 * targets {competitor} vs revun, {competitor} alternative, and {competitor}
 * pricing intent. Content is structural and durable: it compares how each
 * product is built (all-in-one vs add-ons, native comms, US + Canada coverage,
 * per-unit pricing) rather than quoting prices that drift. Where pricing is
 * referenced it is framed as published/approximate, never a hard quote.
 *
 * Verdicts use the shared DIMENSIONS axis so the table is consistent and
 * comparable across every competitor. Strengths are listed honestly to earn
 * trust; the differentiators are where Revun genuinely wins.
 */

export type Verdict = 'yes' | 'partial' | 'no'

export interface DimensionVerdict {
  /** index into DIMENSIONS */
  key: string
  competitor: Verdict
  note: string
}

export interface Competitor {
  slug: string
  name: string
  /** single letter for the logo tile (we do not ship competitor trademarks) */
  letter: string
  category: string
  tagline: string
  /** one-line search-intent subhead */
  heroSub: string
  /** 2-3 sentence fair overview of what they are */
  intro: string
  /** honest list of what the competitor is genuinely good at */
  theirStrengths: string[]
  /** the structural reasons operators move to Revun */
  whereRevunWins: { title: string; body: string }[]
  /** per-dimension competitor verdict + note (Revun verdict lives in DIMENSIONS) */
  matrix: DimensionVerdict[]
  /** hedged pricing framing */
  pricingNote: string
  bestForThem: string
  bestForRevun: string
  /** migration reassurance */
  migration: string
  faqs: { q: string; a: string }[]
}

/** Shared comparison axis. Revun's verdict is fixed per dimension. */
export const DIMENSIONS: { key: string; label: string; revun: Verdict; revunNote: string }[] = [
  { key: 'na', label: 'US + Canada compliance', revun: 'yes', revunNote: 'Province and state rules, tax forms, and privacy frameworks built in.' },
  { key: 'allinone', label: 'All-in-one, no paid add-ons', revun: 'yes', revunNote: 'Leasing, payments, maintenance, comms, and accounting in one price.' },
  { key: 'comms', label: 'Native email, SMS, VoIP, video', revun: 'yes', revunNote: 'Every conversation logs to the unit. No third-party phone system.' },
  { key: 'screening', label: 'Tenant screening included', revun: 'yes', revunNote: 'Credit, identity, income, and references inside the leasing pipeline.' },
  { key: 'ai', label: 'AI automation', revun: 'yes', revunNote: 'AI drafts replies, summarizes threads, and triages maintenance.' },
  { key: 'pricing', label: 'Per-unit pricing, no minimums', revun: 'yes', revunNote: 'Flat per-door. No unit floor, no monthly minimum to start.' },
  { key: 'accounting', label: 'Built-in property accounting', revun: 'yes', revunNote: 'Trust accounting and owner statements native, not an integration.' },
  { key: 'freetier', label: 'Free tier for small owners', revun: 'yes', revunNote: 'Free for 1-2 units with the full core workflow.' },
]

const m = (key: string, competitor: Verdict, note: string): DimensionVerdict => ({ key, competitor, note })

export const baseCompetitors: Record<string, Competitor> = {
  appfolio: {
    slug: 'appfolio',
    name: 'AppFolio',
    letter: 'A',
    category: 'Enterprise PM software',
    tagline: 'Enterprise US property management suite',
    heroSub: 'A side-by-side look at Revun and AppFolio for operators weighing an all-in-one platform against an enterprise US suite.',
    intro:
      'AppFolio is a mature, well-built platform aimed at mid-market and enterprise US residential portfolios. It is a strong product for large operators who live entirely in the United States and have the volume to clear its minimums. For owners and managers who work across Canada and the US, or who do not want communications and screening sold as separate line items, Revun is the more complete fit.',
    theirStrengths: [
      'Deep feature set proven on large US residential portfolios',
      'Strong reporting and owner-facing financials',
      'Established marketplace of integrations and services',
    ],
    whereRevunWins: [
      { title: 'No unit minimum or monthly floor', body: 'AppFolio publishes a per-unit rate with a monthly minimum that prices out smaller portfolios. Revun is flat per door with no unit minimum, so a 12-unit operator pays for 12 units.' },
      { title: 'US and Canada in one platform', body: 'AppFolio is built around US workflows. Revun ships provincial and state compliance, the right payment rails for each country, and bilingual tenant workflows in the same product.' },
      { title: 'Communications and screening are included', body: 'AppFolio sells communications tooling and several screening and reporting capabilities as add-ons. Revun bundles native comms and full screening into the platform price.' },
    ],
    matrix: [
      m('na', 'partial', 'US-centric; limited Canadian provincial coverage.'),
      m('allinone', 'partial', 'Core suite is broad but key tools are paid add-ons.'),
      m('comms', 'partial', 'Messaging exists; full VoIP and video are not native.'),
      m('screening', 'yes', 'Screening is available within the platform.'),
      m('ai', 'yes', 'Has shipped AI leasing and assistant features.'),
      m('pricing', 'no', 'Per-unit rate with a monthly minimum and onboarding fees.'),
      m('accounting', 'yes', 'Strong built-in accounting.'),
      m('freetier', 'no', 'No free tier; minimum spend applies.'),
    ],
    pricingNote: 'AppFolio publishes per-unit pricing with a monthly minimum (historically a few hundred dollars), plus onboarding. Revun starts free for 1-2 units and scales flat per door with no minimum.',
    bestForThem: 'Large US-only residential and mixed portfolios with the scale to clear minimums.',
    bestForRevun: 'Operators who want one platform with comms and screening included, across the US and Canada, with no unit floor.',
    migration: 'Revun imports your unit, lease, tenant, and ledger data from an AppFolio export and reconciles balances before go-live, so you switch without losing history.',
    faqs: [
      { q: 'Is Revun a good AppFolio alternative?', a: 'Yes, especially for operators below AppFolio’s unit minimum, anyone working across Canada and the US, and teams that do not want communications and screening billed as add-ons.' },
      { q: 'Does AppFolio support Canadian property management?', a: 'AppFolio is built around US workflows and does not provide full provincial compliance or Canadian payment rails. Revun ships both natively.' },
      { q: 'Can I migrate from AppFolio to Revun?', a: 'Yes. Revun imports units, leases, tenants, and ledgers from an AppFolio export and reconciles balances before launch.' },
      { q: 'How does Revun pricing compare to AppFolio?', a: 'Revun is flat per door with no unit minimum and a free tier for 1-2 units. AppFolio uses per-unit pricing with a monthly minimum and onboarding fees.' },
    ],
  },
  buildium: {
    slug: 'buildium',
    name: 'Buildium',
    letter: 'B',
    category: 'Mid-market PM software',
    tagline: 'Mid-market US property management and HOA',
    heroSub: 'How Revun and Buildium compare for residential operators and community associations choosing a core platform.',
    intro:
      'Buildium is a capable mid-market platform for US residential management and community associations. It covers the core workflows well. Where it shows its age is in tiered pricing that climbs as you grow, paid add-ons for e-sign and advanced reporting, and the lack of native voice and video. Revun folds those into one per-door price and adds full Canadian coverage.',
    theirStrengths: [
      'Solid core for US residential and HOA management',
      'Mature accounting and 1099 workflows',
      'Large customer base and learning resources',
    ],
    whereRevunWins: [
      { title: 'One price instead of tiers and add-ons', body: 'Buildium tiers gate features and charge separately for e-sign and advanced reporting. Revun includes them in a single flat per-door price.' },
      { title: 'Native communications', body: 'Buildium has no built-in VoIP or video. Revun ships email, SMS, calling, and video natively, logged to each unit.' },
      { title: 'Built for the US and Canada', body: 'Buildium uses US-only legal templates and tax forms. Revun handles provincial and state compliance in one product.' },
    ],
    matrix: [
      m('na', 'no', 'US-only legal templates and tax forms.'),
      m('allinone', 'partial', 'Core is solid; e-sign and advanced reporting are add-ons.'),
      m('comms', 'no', 'No native VoIP or video.'),
      m('screening', 'yes', 'Screening available in-platform.'),
      m('ai', 'partial', 'Limited automation relative to newer platforms.'),
      m('pricing', 'partial', 'Tiered pricing that inflates as the portfolio grows.'),
      m('accounting', 'yes', 'Mature built-in accounting.'),
      m('freetier', 'no', 'No free tier.'),
    ],
    pricingNote: 'Buildium uses tiered monthly plans that increase with unit count and gate features by tier. Revun is flat per door with a free tier for 1-2 units and no feature gating by plan.',
    bestForThem: 'US residential managers and HOA/community associations that fit its tiers.',
    bestForRevun: 'Operators who want comms, screening, and reporting in one price, and anyone managing in Canada or both countries.',
    migration: 'Revun imports your Buildium units, leases, tenants, and ledgers and reconciles balances before go-live.',
    faqs: [
      { q: 'Is Revun a good Buildium alternative?', a: 'Yes. Revun includes native communications, screening, and advanced reporting in one per-door price and adds full Canadian coverage, which Buildium does not.' },
      { q: 'Does Buildium work in Canada?', a: 'Buildium is built around US legal templates and tax forms. Revun ships provincial compliance and Canadian payment rails natively.' },
      { q: 'Can I move my data from Buildium to Revun?', a: 'Yes. Revun imports units, leases, tenants, and ledgers from a Buildium export and reconciles balances before launch.' },
      { q: 'Is Revun cheaper than Buildium?', a: 'Revun is flat per door with no feature gating and a free tier for 1-2 units. Buildium tiers raise both price and feature access as you grow, so total cost usually favors Revun.' },
    ],
  },
  doorloop: {
    slug: 'doorloop',
    name: 'DoorLoop',
    letter: 'D',
    category: 'All-in-one PM software',
    tagline: 'Fast-growing all-in-one PM platform',
    heroSub: 'A clear comparison of Revun and DoorLoop for operators who want a modern, all-in-one property platform.',
    intro:
      'DoorLoop is a modern, well-designed platform that markets itself as all-in-one and has grown quickly. It is a reasonable choice for smaller US operators. The gaps appear in communications depth, Canadian compliance, and AI automation, and in pricing that is billed annually with onboarding. Revun matches the all-in-one promise with native voice and video, full US and Canada coverage, and a free entry tier.',
    theirStrengths: [
      'Clean, modern interface and quick onboarding',
      'Broad core feature coverage for small operators',
      'Good support reputation',
    ],
    whereRevunWins: [
      { title: 'Communications go deeper', body: 'DoorLoop covers messaging, but Revun ships full native VoIP and video with every call and thread logged to the unit.' },
      { title: 'Real Canadian coverage', body: 'Revun handles provincial compliance, Interac and PAD rails, and bilingual workflows. DoorLoop is US-first.' },
      { title: 'Free to start', body: 'Revun is free for 1-2 units with the full core workflow. DoorLoop has no free tier and bills annually with onboarding.' },
    ],
    matrix: [
      m('na', 'partial', 'US-first; limited Canadian provincial depth.'),
      m('allinone', 'yes', 'Genuinely broad all-in-one core.'),
      m('comms', 'partial', 'Messaging yes; native VoIP and video limited.'),
      m('screening', 'yes', 'Screening included.'),
      m('ai', 'partial', 'Some automation; less AI depth.'),
      m('pricing', 'partial', 'Annual billing with onboarding; no free tier.'),
      m('accounting', 'yes', 'Built-in accounting.'),
      m('freetier', 'no', 'No free tier.'),
    ],
    pricingNote: 'DoorLoop publishes tiered plans billed annually with an onboarding component. Revun starts free for 1-2 units and scales flat per door with monthly billing available.',
    bestForThem: 'Small to mid US operators who want a modern all-in-one and are comfortable with annual billing.',
    bestForRevun: 'Operators who want the same all-in-one promise with deeper comms, Canadian coverage, and a free entry point.',
    migration: 'Revun imports DoorLoop units, leases, tenants, and ledgers and reconciles balances before go-live.',
    faqs: [
      { q: 'Is Revun a good DoorLoop alternative?', a: 'Yes. Revun matches DoorLoop’s all-in-one scope and adds native VoIP and video, full Canadian compliance, and a free tier for 1-2 units.' },
      { q: 'Does DoorLoop support Canada?', a: 'DoorLoop is US-first. Revun ships provincial compliance and Canadian payment rails natively.' },
      { q: 'Can I switch from DoorLoop to Revun?', a: 'Yes. Revun imports your units, leases, tenants, and ledgers and reconciles balances before launch.' },
      { q: 'Does Revun have a free plan like a trial?', a: 'Revun is free for 1-2 units with the full core workflow, so you can run real units before paying anything.' },
    ],
  },
  'yardi-breeze': {
    slug: 'yardi-breeze',
    name: 'Yardi Breeze',
    letter: 'Y',
    category: 'Mid-market PM software',
    tagline: 'Yardi’s simplified property platform',
    heroSub: 'Revun vs Yardi Breeze for operators choosing between a simplified enterprise spin-off and a modern all-in-one.',
    intro:
      'Yardi Breeze is the simplified version of Yardi’s enterprise platform, aimed at small and mid operators who want the Yardi name without the full Voyager complexity. It is dependable but priced per unit with minimums, and communications and some capabilities sit in higher tiers or add-ons. Revun delivers the all-in-one workflow with native comms and US plus Canada coverage in one price.',
    theirStrengths: [
      'Backed by Yardi’s long track record',
      'Reliable accounting and reporting',
      'Path to enterprise Yardi if you scale up',
    ],
    whereRevunWins: [
      { title: 'No minimums, one price', body: 'Breeze prices per unit with monthly minimums and a Premier tier for advanced features. Revun is flat per door with no minimum and no tier gating.' },
      { title: 'Native communications', body: 'Revun ships email, SMS, VoIP, and video natively. Breeze relies on messaging and integrations.' },
      { title: 'Canada built in', body: 'Revun handles provincial compliance and Canadian rails in the same product.' },
    ],
    matrix: [
      m('na', 'partial', 'Some Canadian support; less native than Revun.'),
      m('allinone', 'partial', 'Premier tier and add-ons gate advanced features.'),
      m('comms', 'no', 'No native VoIP or video.'),
      m('screening', 'yes', 'Screening available.'),
      m('ai', 'no', 'Limited AI automation in Breeze.'),
      m('pricing', 'no', 'Per-unit pricing with monthly minimums.'),
      m('accounting', 'yes', 'Solid Yardi accounting.'),
      m('freetier', 'no', 'No free tier.'),
    ],
    pricingNote: 'Yardi Breeze prices per unit per month with a monthly minimum, and a Premier tier for advanced features. Revun is flat per door with a free tier for 1-2 units and no minimum.',
    bestForThem: 'Operators who want the Yardi ecosystem and a path to enterprise Voyager later.',
    bestForRevun: 'Operators who want native comms, AI automation, and Canadian coverage without minimums or tier gating.',
    migration: 'Revun imports Yardi Breeze units, leases, tenants, and ledgers and reconciles balances before go-live.',
    faqs: [
      { q: 'Is Revun a good Yardi Breeze alternative?', a: 'Yes. Revun adds native communications, AI automation, and Canadian compliance, with flat per-door pricing and no minimums.' },
      { q: 'Does Yardi Breeze have a free tier?', a: 'No. Breeze prices per unit with a monthly minimum. Revun is free for 1-2 units.' },
      { q: 'Can I migrate from Yardi Breeze to Revun?', a: 'Yes. Revun imports your data and reconciles balances before launch.' },
      { q: 'Which is better for Canadian operators?', a: 'Revun, because provincial compliance and Canadian payment rails are native rather than partial.' },
    ],
  },
  tenantcloud: {
    slug: 'tenantcloud',
    name: 'TenantCloud',
    letter: 'T',
    category: 'SMB landlord software',
    tagline: 'Budget platform for small landlords',
    heroSub: 'Revun vs TenantCloud for small landlords deciding between a low-cost tool and a free-to-start all-in-one.',
    intro:
      'TenantCloud is a budget-friendly platform for small landlords with a free starter tier and inexpensive paid plans. It covers the basics. As portfolios grow, operators run into limits on automation, communications, and accounting depth. Revun starts free too, but scales into a full operating system with native comms, screening, and accounting as you add doors.',
    theirStrengths: [
      'Low cost of entry for very small landlords',
      'Free starter tier',
      'Covers listing, applications, and basic rent collection',
    ],
    whereRevunWins: [
      { title: 'Scales without hitting a ceiling', body: 'TenantCloud is built for small portfolios. Revun runs the same way at 2 units or 2,000, with full accounting and reporting.' },
      { title: 'Native communications and AI', body: 'Revun ships VoIP, video, and AI automation. TenantCloud relies on basic messaging.' },
      { title: 'US and Canada compliance', body: 'Revun handles provincial and state rules natively.' },
    ],
    matrix: [
      m('na', 'no', 'Limited Canadian compliance.'),
      m('allinone', 'partial', 'Basics covered; depth thins as you grow.'),
      m('comms', 'no', 'Basic messaging only.'),
      m('screening', 'yes', 'Screening available.'),
      m('ai', 'no', 'Minimal automation.'),
      m('pricing', 'yes', 'Low-cost plans and a free starter.'),
      m('accounting', 'partial', 'Light accounting.'),
      m('freetier', 'yes', 'Has a free starter tier.'),
    ],
    pricingNote: 'TenantCloud offers a free starter tier and low-cost paid plans aimed at small landlords. Revun is also free for 1-2 units and scales flat per door into a full platform.',
    bestForThem: 'Very small landlords who want the cheapest possible basic tool.',
    bestForRevun: 'Landlords who want a free start that grows into a complete platform without switching tools later.',
    migration: 'Revun imports TenantCloud units, leases, tenants, and ledgers and reconciles balances before go-live.',
    faqs: [
      { q: 'Is Revun a good TenantCloud alternative?', a: 'Yes, especially for landlords who expect to grow. Revun starts free and scales into full accounting, comms, and screening without a ceiling.' },
      { q: 'Is Revun free like TenantCloud?', a: 'Revun is free for 1-2 units with the full core workflow, then scales flat per door.' },
      { q: 'Can I move from TenantCloud to Revun?', a: 'Yes. Revun imports your data and reconciles balances before launch.' },
      { q: 'Does Revun work for one or two rentals?', a: 'Yes. The free tier is built for 1-2 units, with the same workflows larger operators use.' },
    ],
  },
  'rentec-direct': {
    slug: 'rentec-direct',
    name: 'Rentec Direct',
    letter: 'R',
    category: 'SMB PM software',
    tagline: 'Long-running US landlord and PM tool',
    heroSub: 'Revun vs Rentec Direct for landlords and managers comparing a veteran US tool with a modern all-in-one.',
    intro:
      'Rentec Direct is a long-running, dependable platform popular with US landlords and small managers, known for solid accounting and fair pricing. It is a functional product. Its interface and communications feel dated next to newer platforms, and it is US-focused. Revun offers a modern interface, native comms, AI automation, and full Canadian coverage.',
    theirStrengths: [
      'Reliable, established US product',
      'Good accounting and bank reconciliation',
      'Reasonable pricing for US landlords',
    ],
    whereRevunWins: [
      { title: 'Modern, faster workflow', body: 'Revun’s interface and automation are built for speed. Rentec’s UI is functional but dated.' },
      { title: 'Native communications and AI', body: 'Revun ships VoIP, video, and AI drafting. Rentec relies on basic messaging.' },
      { title: 'US and Canada', body: 'Revun handles both countries; Rentec is US-focused.' },
    ],
    matrix: [
      m('na', 'no', 'US-focused.'),
      m('allinone', 'partial', 'Covers core; comms and automation are light.'),
      m('comms', 'no', 'Basic messaging only.'),
      m('screening', 'yes', 'Screening available.'),
      m('ai', 'no', 'Minimal AI.'),
      m('pricing', 'partial', 'Fair per-unit pricing with a monthly minimum.'),
      m('accounting', 'yes', 'Strong accounting.'),
      m('freetier', 'no', 'No free tier.'),
    ],
    pricingNote: 'Rentec Direct prices per unit per month with a monthly minimum. Revun is flat per door with a free tier for 1-2 units.',
    bestForThem: 'US landlords who value a proven, accounting-first tool and do not need modern comms.',
    bestForRevun: 'Operators who want modern UX, native comms, AI, and Canadian coverage in one platform.',
    migration: 'Revun imports Rentec Direct units, leases, tenants, and ledgers and reconciles balances before go-live.',
    faqs: [
      { q: 'Is Revun a good Rentec Direct alternative?', a: 'Yes. Revun keeps the accounting strength Rentec users value and adds modern UX, native comms, AI, and Canadian coverage.' },
      { q: 'Does Rentec Direct work in Canada?', a: 'Rentec is US-focused. Revun ships Canadian compliance and rails natively.' },
      { q: 'Can I migrate from Rentec Direct to Revun?', a: 'Yes. Revun imports your data and reconciles balances before launch.' },
      { q: 'Does Revun include accounting?', a: 'Yes. Trust accounting and owner statements are native to Revun, not an add-on.' },
    ],
  },
  propertyware: {
    slug: 'propertyware',
    name: 'Propertyware',
    letter: 'P',
    category: 'Single-family PM software',
    tagline: 'RealPage’s single-family platform',
    heroSub: 'Revun vs Propertyware for single-family operators weighing a configurable legacy platform against a modern all-in-one.',
    intro:
      'Propertyware, part of RealPage, targets single-family and scattered-site operators with a configurable platform. It is powerful but can feel complex and dated, prices per unit with minimums, and is US-focused. Revun delivers single-family workflows in a modern interface with native comms, AI, and US plus Canada coverage in one price.',
    theirStrengths: [
      'Configurable for single-family and scattered-site portfolios',
      'Established in the US SFR market',
      'Owner and field-tech tooling',
    ],
    whereRevunWins: [
      { title: 'Modern instead of legacy', body: 'Revun’s interface and automation are current. Propertyware is powerful but dated and can require heavy configuration.' },
      { title: 'No minimum, one price', body: 'Propertyware prices per unit with monthly minimums. Revun is flat per door with no minimum.' },
      { title: 'Native comms and Canadian coverage', body: 'Revun ships VoIP, video, and provincial compliance natively.' },
    ],
    matrix: [
      m('na', 'no', 'US-focused.'),
      m('allinone', 'partial', 'Configurable but comms and AI are not native.'),
      m('comms', 'no', 'No native VoIP or video.'),
      m('screening', 'yes', 'Screening available.'),
      m('ai', 'no', 'Limited AI automation.'),
      m('pricing', 'no', 'Per-unit pricing with monthly minimums.'),
      m('accounting', 'yes', 'Built-in accounting.'),
      m('freetier', 'no', 'No free tier.'),
    ],
    pricingNote: 'Propertyware prices per unit per month with a monthly minimum. Revun is flat per door with a free tier for 1-2 units and no minimum.',
    bestForThem: 'Large US single-family operators who need deep configuration and have the volume for minimums.',
    bestForRevun: 'Single-family operators who want modern UX, native comms, AI, and Canadian coverage without minimums.',
    migration: 'Revun imports Propertyware units, leases, tenants, and ledgers and reconciles balances before go-live.',
    faqs: [
      { q: 'Is Revun a good Propertyware alternative?', a: 'Yes. Revun covers single-family workflows with a modern interface, native comms, AI, and Canadian coverage, with no minimums.' },
      { q: 'Is Propertyware good for small portfolios?', a: 'Its minimums and configuration suit larger operators. Revun is free for 1-2 units and scales without minimums.' },
      { q: 'Can I migrate from Propertyware to Revun?', a: 'Yes. Revun imports your data and reconciles balances before launch.' },
      { q: 'Does Revun support scattered-site single-family?', a: 'Yes. Revun is built for single-family and scattered-site portfolios as well as multifamily.' },
    ],
  },
  hemlane: {
    slug: 'hemlane',
    name: 'Hemlane',
    letter: 'H',
    category: 'Hybrid PM software',
    tagline: 'Software plus local agent network',
    heroSub: 'Revun vs Hemlane for remote landlords choosing between a hybrid software-plus-agents model and a full platform.',
    intro:
      'Hemlane blends self-management software with an optional network of local agents for showings and repairs, which suits remote landlords. The trade-off is that deeper management leans on paid local services, communications are basic, and it is US-focused. Revun gives you the full operating system in software, with native comms, screening, accounting, and Canadian coverage.',
    theirStrengths: [
      'Optional local agent network for remote owners',
      'Good for hands-off, out-of-state landlords',
      'Straightforward leasing and coordination',
    ],
    whereRevunWins: [
      { title: 'Full platform in software', body: 'Revun runs the whole operation in one system. Hemlane’s deeper management depends on paid local services.' },
      { title: 'Native comms, screening, accounting', body: 'Revun ships all three natively. Hemlane is lighter on each.' },
      { title: 'US and Canada', body: 'Revun handles both; Hemlane is US-focused.' },
    ],
    matrix: [
      m('na', 'no', 'US-focused.'),
      m('allinone', 'partial', 'Software plus paid local services, not fully all-in-one.'),
      m('comms', 'no', 'Basic communications.'),
      m('screening', 'yes', 'Screening available.'),
      m('ai', 'no', 'Minimal AI.'),
      m('pricing', 'partial', 'Per-unit tiers plus local service fees.'),
      m('accounting', 'partial', 'Light accounting.'),
      m('freetier', 'no', 'No free tier.'),
    ],
    pricingNote: 'Hemlane prices per unit by tier, with local agent services billed separately. Revun is flat per door with accounting and comms included, free for 1-2 units.',
    bestForThem: 'Remote, hands-off landlords who want optional local agents handling showings and repairs.',
    bestForRevun: 'Operators who want the full operation in software, with comms, screening, and accounting included, in the US or Canada.',
    migration: 'Revun imports Hemlane units, leases, tenants, and ledgers and reconciles balances before go-live.',
    faqs: [
      { q: 'Is Revun a good Hemlane alternative?', a: 'Yes, for owners who want a full software platform rather than software plus paid local services, with comms and accounting included.' },
      { q: 'Does Hemlane work in Canada?', a: 'Hemlane is US-focused. Revun ships Canadian compliance and rails natively.' },
      { q: 'Can I migrate from Hemlane to Revun?', a: 'Yes. Revun imports your data and reconciles balances before launch.' },
      { q: 'Does Revun replace the need for a local agent?', a: 'Revun runs leasing, coordination, and maintenance in software, so most operators do not need a separate local service layer.' },
    ],
  },
  rentredi: {
    slug: 'rentredi',
    name: 'RentRedi',
    letter: 'R',
    category: 'DIY landlord software',
    tagline: 'Mobile-first DIY landlord app',
    heroSub: 'Revun vs RentRedi for DIY landlords comparing a flat-fee mobile app with a full operating system.',
    intro:
      'RentRedi is a mobile-first app for DIY landlords with a simple flat subscription, popular for rent collection and tenant management on small portfolios. It is easy to start. As you grow, the gaps are accounting depth, native communications beyond messaging, AI, and Canadian coverage. Revun starts free and scales into the full platform.',
    theirStrengths: [
      'Simple flat-fee subscription',
      'Strong mobile experience for landlords and tenants',
      'Good fit for DIY rent collection',
    ],
    whereRevunWins: [
      { title: 'Real accounting and reporting', body: 'Revun ships trust accounting and owner statements. RentRedi’s accounting is light and leans on integrations.' },
      { title: 'Native comms and AI', body: 'Revun adds VoIP, video, and AI drafting on top of messaging.' },
      { title: 'US and Canada, free to start', body: 'Revun is free for 1-2 units with provincial and state compliance built in.' },
    ],
    matrix: [
      m('na', 'no', 'US-focused.'),
      m('allinone', 'partial', 'Core landlord tools; accounting and comms thin.'),
      m('comms', 'no', 'Messaging only.'),
      m('screening', 'yes', 'Screening available.'),
      m('ai', 'no', 'Minimal AI.'),
      m('pricing', 'yes', 'Simple flat-fee subscription.'),
      m('accounting', 'partial', 'Light accounting.'),
      m('freetier', 'no', 'No free tier; low flat fee.'),
    ],
    pricingNote: 'RentRedi charges a simple flat subscription billed monthly or annually. Revun is free for 1-2 units and scales flat per door, with accounting and comms included.',
    bestForThem: 'DIY landlords who want a low flat fee and a strong mobile app for the basics.',
    bestForRevun: 'Landlords who want a free start that grows into full accounting, comms, and screening.',
    migration: 'Revun imports RentRedi units, leases, tenants, and ledgers and reconciles balances before go-live.',
    faqs: [
      { q: 'Is Revun a good RentRedi alternative?', a: 'Yes, for landlords who want real accounting, native comms, and room to grow, with a free entry tier.' },
      { q: 'Is Revun cheaper than RentRedi?', a: 'Revun is free for 1-2 units, then flat per door. For small portfolios the total is comparable or lower, with more included.' },
      { q: 'Can I move from RentRedi to Revun?', a: 'Yes. Revun imports your data and reconciles balances before launch.' },
      { q: 'Does Revun have a mobile app?', a: 'Yes. Revun ships native mobile apps for operators and tenants.' },
    ],
  },
  turbotenant: {
    slug: 'turbotenant',
    name: 'TurboTenant',
    letter: 'T',
    category: 'Free landlord software',
    tagline: 'Free, ad-supported landlord tool',
    heroSub: 'Revun vs TurboTenant for landlords comparing a free, fee-funded tool with a free-to-start full platform.',
    intro:
      'TurboTenant is free for landlords, funded by tenant-paid fees and add-ons, and popular for listings, applications, and screening on small portfolios. It is a fine starting point. The limits are accounting, native communications, AI, and Canadian coverage. Revun is also free to start but is built to run the whole operation as you scale.',
    theirStrengths: [
      'Free for landlords to start',
      'Good listing syndication and applications',
      'Solid tenant screening flow',
    ],
    whereRevunWins: [
      { title: 'Built-in accounting', body: 'Revun ships trust accounting and owner statements. TurboTenant leans on integrations.' },
      { title: 'Native comms and AI', body: 'Revun adds VoIP, video, and AI on top of messaging.' },
      { title: 'US and Canada', body: 'Revun handles both countries with compliance built in.' },
    ],
    matrix: [
      m('na', 'no', 'US-focused.'),
      m('allinone', 'partial', 'Strong front-end; accounting and comms thin.'),
      m('comms', 'no', 'Messaging only.'),
      m('screening', 'yes', 'Strong screening flow.'),
      m('ai', 'no', 'Minimal AI.'),
      m('pricing', 'yes', 'Free for landlords; fees fall on tenants and add-ons.'),
      m('accounting', 'no', 'No real built-in accounting.'),
      m('freetier', 'yes', 'Free for landlords.'),
    ],
    pricingNote: 'TurboTenant is free for landlords, funded by tenant-paid fees and paid add-ons. Revun is free for 1-2 units with the full core workflow, then flat per door.',
    bestForThem: 'Landlords who want a free tool for listings, applications, and screening on a few units.',
    bestForRevun: 'Landlords who want a free start that includes accounting and comms and scales into a full platform.',
    migration: 'Revun imports TurboTenant units, leases, tenants, and ledgers and reconciles balances before go-live.',
    faqs: [
      { q: 'Is Revun a good TurboTenant alternative?', a: 'Yes, for landlords who want built-in accounting and native communications, and a path to scale, while still starting free.' },
      { q: 'Is Revun free like TurboTenant?', a: 'Revun is free for 1-2 units with the full core workflow, including accounting and comms.' },
      { q: 'Can I migrate from TurboTenant to Revun?', a: 'Yes. Revun imports your data and reconciles balances before launch.' },
      { q: 'Does Revun charge tenants fees?', a: 'Revun’s model is flat per door for operators rather than shifting costs onto tenants through add-on fees.' },
    ],
  },
  innago: {
    slug: 'innago',
    name: 'Innago',
    letter: 'I',
    category: 'Free landlord software',
    tagline: 'Free software for small landlords',
    heroSub: 'Revun vs Innago for small landlords comparing a free, fee-funded tool with a free-to-start full platform.',
    intro:
      'Innago is free landlord software funded by payment and add-on fees, aimed at small and self-managing landlords. It covers leasing, rent collection, and screening well for that audience. The gaps are accounting depth, native communications, AI, and Canadian coverage. Revun starts free and scales into a complete operating system.',
    theirStrengths: [
      'Free to start for small landlords',
      'Clean leasing and rent collection',
      'Good for self-managing owners',
    ],
    whereRevunWins: [
      { title: 'Scales into full operations', body: 'Revun runs the same at 2 or 2,000 units, with full accounting and reporting.' },
      { title: 'Native comms and AI', body: 'Revun ships VoIP, video, and AI automation.' },
      { title: 'US and Canada compliance', body: 'Revun handles provincial and state rules natively.' },
    ],
    matrix: [
      m('na', 'no', 'US-focused.'),
      m('allinone', 'partial', 'Good basics; depth thins as you grow.'),
      m('comms', 'no', 'Messaging only.'),
      m('screening', 'yes', 'Screening included.'),
      m('ai', 'no', 'Minimal AI.'),
      m('pricing', 'yes', 'Free, funded by fees.'),
      m('accounting', 'partial', 'Light accounting.'),
      m('freetier', 'yes', 'Free for landlords.'),
    ],
    pricingNote: 'Innago is free for landlords, funded by payment and add-on fees. Revun is free for 1-2 units with the full core workflow, then flat per door.',
    bestForThem: 'Small self-managing landlords who want a free tool for the basics.',
    bestForRevun: 'Landlords who want a free start that grows into full accounting, comms, and screening.',
    migration: 'Revun imports Innago units, leases, tenants, and ledgers and reconciles balances before go-live.',
    faqs: [
      { q: 'Is Revun a good Innago alternative?', a: 'Yes, for landlords who want built-in accounting, native comms, and room to scale, while still starting free.' },
      { q: 'Is Revun free like Innago?', a: 'Revun is free for 1-2 units with the full core workflow.' },
      { q: 'Can I migrate from Innago to Revun?', a: 'Yes. Revun imports your data and reconciles balances before launch.' },
      { q: 'Does Innago work in Canada?', a: 'Innago is US-focused. Revun ships Canadian compliance and rails natively.' },
    ],
  },
  avail: {
    slug: 'avail',
    name: 'Avail',
    letter: 'A',
    category: 'DIY landlord software',
    tagline: 'DIY landlord tool by Realtor.com',
    heroSub: 'Revun vs Avail for DIY landlords comparing a per-unit consumer tool with a full operating system.',
    intro:
      'Avail, owned by Realtor.com, is a DIY landlord tool with a free tier and a low-cost paid plan priced per unit, popular with self-managing owners. It handles listings, leases, and rent collection cleanly. The limits are accounting, native communications, AI, and Canadian coverage. Revun starts free and scales into the full platform.',
    theirStrengths: [
      'Clean DIY experience for self-managing owners',
      'Free tier plus low-cost per-unit upgrade',
      'Good leasing and rent collection basics',
    ],
    whereRevunWins: [
      { title: 'Full accounting and reporting', body: 'Revun ships trust accounting and owner statements. Avail is lighter.' },
      { title: 'Native comms and AI', body: 'Revun adds VoIP, video, and AI on top of messaging.' },
      { title: 'US and Canada', body: 'Revun handles both with compliance built in.' },
    ],
    matrix: [
      m('na', 'no', 'US-focused.'),
      m('allinone', 'partial', 'Good DIY basics; not full operations.'),
      m('comms', 'no', 'Messaging only.'),
      m('screening', 'yes', 'Screening included.'),
      m('ai', 'no', 'Minimal AI.'),
      m('pricing', 'yes', 'Free tier plus low per-unit plan.'),
      m('accounting', 'partial', 'Light accounting.'),
      m('freetier', 'yes', 'Has a free tier.'),
    ],
    pricingNote: 'Avail offers a free tier and a low-cost per-unit paid plan. Revun is free for 1-2 units with the full core workflow, then flat per door.',
    bestForThem: 'Self-managing owners who want a clean, low-cost DIY tool for a few units.',
    bestForRevun: 'Owners who want a free start that grows into full accounting, comms, and screening.',
    migration: 'Revun imports Avail units, leases, tenants, and ledgers and reconciles balances before go-live.',
    faqs: [
      { q: 'Is Revun a good Avail alternative?', a: 'Yes, for owners who want built-in accounting, native comms, and room to scale, while still starting free.' },
      { q: 'Is Revun free like Avail?', a: 'Revun is free for 1-2 units with the full core workflow.' },
      { q: 'Can I migrate from Avail to Revun?', a: 'Yes. Revun imports your data and reconciles balances before launch.' },
      { q: 'Does Avail support Canada?', a: 'Avail is US-focused. Revun ships Canadian compliance and rails natively.' },
    ],
  },
}

import { generatedCompetitors } from './competitors-generated'

export const competitors: Record<string, Competitor> = { ...baseCompetitors, ...generatedCompetitors }
export const competitorSlugs = Object.keys(competitors)
