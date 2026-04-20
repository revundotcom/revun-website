import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  CreditCard,
  Wrench,
  FileText,
  MessageSquare,
  ShieldCheck,
  Search,
  ClipboardCheck,
  Home,
  Heart,
  CheckCircle2,
  Star,
  Lock,
  Zap,
  Clock,
  Bell,
  TrendingUp,
  Users,
  Sparkles,
  Apple,
  Play,
  MapPin,
  Quote,
  BadgeCheck,
  Receipt,
  Calendar,
  Camera,
  KeyRound,
} from 'lucide-react'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { RotatingBadge } from '@/components/ui/rotating-badge'
import { ScoreRing } from '@/components/ui/score-ring'
import { CountUp } from '@/components/ui/count-up'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import {
  buildBreadcrumbSchema,
  buildWebPageSchema,
  buildFAQPageSchema,
  buildHowToSchema,
} from '@/lib/schema-builders'

export const metadata: Metadata = {
  title: 'Tenants | Pay Rent, Build Credit, Live Better | Revun',
  description:
    'The rental portal loved by 200,000+ renters across Canada and the US. Pay rent in any method, build credit with every payment, request maintenance with photos, and manage your entire tenancy from one beautiful app.',
  alternates: { canonical: buildCanonicalUrl('/tenants') },
  openGraph: {
    title: 'Tenants | Pay Rent, Build Credit, Live Better | Revun',
    description:
      'One app for every part of renting: payments, maintenance, messaging, documents, and credit reporting for tenants across Canada and the US.',
    url: buildCanonicalUrl('/tenants'),
  },
}

/* ── Helper primitives ──────────────────────────────────────────────────── */

function Section({
  background = 'white',
  children,
}: {
  background?: 'white' | 'off' | 'dark'
  children: React.ReactNode
}) {
  const bg =
    background === 'white'
      ? 'bg-white'
      : background === 'off'
      ? 'bg-[#F5F6F8]'
      : 'bg-[#0A1628] text-white'
  return <section className={`relative ${bg} py-20 md:py-24`}>{children}</section>
}

function SectionHeader({
  eyebrow,
  title,
  highlight,
  description,
  invert = false,
}: {
  eyebrow: string
  title: string
  highlight?: string
  description?: string
  invert?: boolean
}) {
  const titleColor = invert ? 'text-white' : 'text-[#0A1628]'
  const descColor = invert ? 'text-white/75' : 'text-[#475569]'
  const accent = invert ? 'text-[#4A91F0]' : 'text-[#176FEB]'
  return (
    <div className="mb-12 text-center md:mb-14">
      <p className={`text-sm font-semibold uppercase tracking-widest ${accent}`}>
        {eyebrow}
      </p>
      <h2
        className={`mt-3 font-display text-3xl font-normal tracking-tight text-balance md:text-5xl ${titleColor}`}
      >
        {title}
        {highlight && (
          <>
            {' '}
            <span className={`italic ${accent}`}>{highlight}</span>
          </>
        )}
      </h2>
      {description && (
        <p
          className={`mx-auto mt-5 max-w-2xl text-base leading-relaxed md:text-lg ${descColor}`}
        >
          {description}
        </p>
      )}
    </div>
  )
}

function FeatureBullet({
  icon: Icon,
  label,
  invert = false,
}: {
  icon: typeof CheckCircle2
  label: string
  invert?: boolean
}) {
  const tone = invert ? 'bg-white/10 text-[#4A91F0]' : 'bg-[#E8F2FE] text-[#176FEB]'
  const textTone = invert ? 'text-white/90' : 'text-[#0A1628]'
  return (
    <li className={`flex items-start gap-3 ${textTone}`}>
      <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${tone}`}>
        <Icon className="h-4 w-4" />
      </span>
      <span className="text-sm leading-relaxed">{label}</span>
    </li>
  )
}

function ProofPill({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-2xl border border-white/60 bg-white/95 p-4 shadow-xl backdrop-blur-md ${className ?? ''}`}
    >
      {children}
    </div>
  )
}

function SectionImage({
  src,
  alt,
  children,
  captionLeft,
  captionRight,
}: {
  src: string
  alt: string
  children?: React.ReactNode
  captionLeft?: React.ReactNode
  captionRight?: string
}) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl">
      <Image src={src} alt={alt} fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/50 via-transparent to-transparent" aria-hidden="true" />
      {(captionLeft || captionRight) && (
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
          {captionLeft && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold backdrop-blur-md">
              {captionLeft}
            </span>
          )}
          {captionRight && (
            <span className="text-[11px] font-medium text-white/85">{captionRight}</span>
          )}
        </div>
      )}
      {children}
    </div>
  )
}

/* ── Data ──────────────────────────────────────────────────────────────── */

const ROTATING_AUDIENCES = ['renters', 'students', 'families', 'professionals', 'roommates']

const proofPoints = [
  { label: 'App Store rating', value: '4.9', suffix: '★', caption: '12K+ reviews' },
  { label: 'Google Play rating', value: '4.8', suffix: '★', caption: '8K+ reviews' },
  { label: 'Rent processed', value: '$2.4B', suffix: '', caption: 'Across 200K+ renters' },
  { label: 'Fees for tenants', value: '$0', suffix: '', caption: 'Always, forever' },
]

const coreFeatures = [
  {
    icon: CreditCard,
    title: 'Pay rent',
    description: 'ACH, Interac, PAD, or card, with autopay and digital receipts.',
  },
  {
    icon: TrendingUp,
    title: 'Build credit',
    description: 'Every on-time payment reported to Equifax and TransUnion.',
  },
  {
    icon: Wrench,
    title: 'Fix things',
    description: 'Photo-based maintenance tickets with live technician updates.',
  },
  {
    icon: FileText,
    title: 'Keep records',
    description: 'Lease, inspections, receipts, archived for 7 years.',
  },
  {
    icon: MessageSquare,
    title: 'Stay in touch',
    description: 'Encrypted chat with your team, no personal numbers shared.',
  },
  {
    icon: KeyRound,
    title: 'Move in',
    description: 'Digital lease signing, move-in checklist, and portal access.',
  },
]

const steps = [
  {
    step: '01',
    title: 'Browse verified listings',
    description:
      'Search apartments across Canada and the US with verified photos, clear pricing, amenities, and application requirements. Filter by move-in date, pet policy, and roommate preferences.',
    icon: Search,
    time: 'Avg 8 min',
    proof: 'Every listing is landlord-verified, no bait-and-switch pricing',
  },
  {
    step: '02',
    title: 'Apply in one flow',
    description:
      'Submit a single application across multiple units. Upload ID, income proof, and references once, reuse for every application. Track screening status in real time.',
    icon: ClipboardCheck,
    time: 'Under 12 min',
    proof: 'One profile, unlimited applications, full transparency on status',
  },
  {
    step: '03',
    title: 'Sign and move in',
    description:
      'Review your lease in the portal, sign digitally with legally-binding e-signatures, complete your move-in checklist with photos, and receive your tenant portal access the moment keys change hands.',
    icon: Home,
    time: 'Same day',
    proof: 'Lease, keys, portal access, and move-in photos logged in one session',
  },
  {
    step: '04',
    title: 'Live, let Revun handle the rest',
    description:
      'Pay rent on autopilot, submit maintenance with photos, stay in the loop with property updates, and build credit with every on-time payment, all from the same portal.',
    icon: Heart,
    time: 'Ongoing',
    proof: 'Rent, repairs, receipts, and credit, quietly working in the background',
  },
]

const testimonials = [
  {
    name: 'Sarah M.',
    location: 'Toronto, ON',
    since: 'Tenant since 2023',
    managedBy: 'Evergreen Property Mgmt',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&h=160&q=80',
    quote:
      'My lease, the move-in photos from April 3rd, and every receipt since, all in one tab. I pulled my whole rent history in 30 seconds for my mortgage pre-approval. My broker actually thanked me for how clean the paperwork was.',
  },
  {
    name: 'James K.',
    location: 'Austin, TX',
    since: 'Tenant since 2022',
    managedBy: 'Onyx Residential',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&h=160&q=80',
    quote:
      'I bumped my credit score 42 points in six months just by paying rent the way I already was. When I went to finance a car, the lender actually thanked me for the rent history. I didn\u2019t know that was possible until Revun.',
  },
  {
    name: 'Priya R.',
    location: 'Vancouver, BC',
    since: 'Tenant since 2024',
    managedBy: 'Cascade Rentals',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=160&h=160&q=80',
    quote:
      'Maintenance used to be a week of texting back and forth. I took a photo of the leaking faucet at 8 PM, a technician was booked for the next morning, and I got a completion report with before-and-after photos. Nothing to chase.',
  },
]

const faqs = [
  {
    question: 'Is Revun really free for tenants?',
    answer:
      'Yes. Revun charges zero tenant fees. There are no platform fees on rent payments, no fees for using the portal, no fees for maintenance requests, no fees for document storage, and no fees for any feature ever. Revun is paid for entirely by property managers, not by you. The only cost you might encounter is a standard card processing fee if you choose to pay by credit card, and that fee goes to the card network, not Revun. Bank transfer, Interac e-Transfer, and PAD are always free.',
  },
  {
    question: 'How does rent reporting actually build my credit?',
    answer:
      'When your property manager enables Revun, every on-time rent payment you make is automatically reported to Equifax and TransUnion, the same credit bureaus that determine your score for mortgages, auto loans, and credit cards. Each reported payment is treated similarly to a revolving credit account, so consistent on-time payments build a positive payment history. On average, Revun tenants see their credit score increase by 40+ points within six months of joining, though results vary based on your starting profile. Rent reporting is opt-out, never opt-in, and you can disable it anytime from your portal settings.',
  },
  {
    question: 'What payment methods are supported?',
    answer:
      'Revun supports ACH bank transfer, Interac e-Transfer (Canada only), Pre-Authorized Debit (PAD), Visa, Mastercard, American Express, and major debit networks including Interac Debit. You can enable autopay to charge your preferred method on a schedule: monthly, bi-weekly, or custom dates for split-month rent. If you use multiple methods (for example, part of rent on autopay from a bank account and the rest on a credit card for rewards), Revun handles that too with the split-payment feature.',
  },
  {
    question: 'How is my personal information protected?',
    answer:
      'All financial transactions are processed through PCI DSS Level 1 providers, the highest tier of payment security. Your card numbers and bank details are never stored on Revun servers; they\u2019re tokenized by our processor. Messages between you and your property team are encrypted in transit with TLS 1.3 and at rest with AES-256. Revun operates under PIPEDA (Canada) and state-level privacy laws (US), and we never sell, rent, or share tenant data with advertisers, data brokers, or any third party for marketing purposes.',
  },
  {
    question: 'Can I access my lease and receipts after I move out?',
    answer:
      'Yes. Your document vault remains accessible for at least seven years after your tenancy ends. That is long enough to cover tax filing, dispute resolution, and future rental applications. You can download lease copies, signed addendums, move-in checklists, inspection reports, every rent receipt, and your full payment history at any time. Most tenants find this invaluable when applying to a new rental and needing proof of rent history.',
  },
  {
    question: 'My landlord isn\u2019t using Revun yet. Can I still sign up?',
    answer:
      'Revun is activated by property managers, not tenants directly. This is how we guarantee security and keep the platform free for you. You can recommend Revun to your landlord in about 60 seconds using our recommendation form, which sends them a custom onboarding link. Most landlords onboard within a week of receiving a tenant recommendation because tenant demand is the #1 reason property managers switch to Revun.',
  },
  {
    question: 'Does Revun work equally in Canada and the United States?',
    answer:
      'Yes. Revun is built specifically for North American renters. Canadian tenants get province-specific compliance (Ontario LTB forms, BC RTB rules, Quebec TAL requirements, Alberta RTDRS workflows, and more), Interac e-Transfer support, and PAD payments. US tenants get state-specific lease templates, ACH and card support, and all major US credit bureau reporting. You can even rent across the border. Moving from Toronto to Austin? Your rent history follows you.',
  },
  {
    question: 'Do I need to download a mobile app?',
    answer:
      'No. The full tenant portal runs in any modern browser: Chrome, Safari, Firefox, or Edge on desktop, tablet, or mobile. We also offer native iOS and Android apps for push notifications on payment reminders, maintenance updates, and new messages. Most tenants use both: desktop for reviewing leases and documents, mobile for payments and maintenance on the go.',
  },
]

function AppStoreBadges({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className ?? ''}`}>
      <Link
        href="/features/tenant-portal/"
        className="inline-flex items-center gap-2.5 rounded-xl bg-[#0A1628] px-4 py-2.5 text-white transition-transform hover:scale-[1.02]"
        aria-label="Download on the App Store"
      >
        <Apple className="h-5 w-5" />
        <span className="flex flex-col leading-tight">
          <span className="text-[9px] font-medium opacity-80">Download on the</span>
          <span className="text-sm font-semibold">App Store</span>
        </span>
      </Link>
      <Link
        href="/features/tenant-portal/"
        className="inline-flex items-center gap-2.5 rounded-xl bg-[#0A1628] px-4 py-2.5 text-white transition-transform hover:scale-[1.02]"
        aria-label="Get it on Google Play"
      >
        <Play className="h-5 w-5" />
        <span className="flex flex-col leading-tight">
          <span className="text-[9px] font-medium opacity-80">Get it on</span>
          <span className="text-sm font-semibold">Google Play</span>
        </span>
      </Link>
    </div>
  )
}

/* ── Page ──────────────────────────────────────────────────────────────── */

export default function TenantsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Tenants', url: 'https://revun.com/tenants/' },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildWebPageSchema({
              name: 'Tenants: Your Complete Rental Portal',
              description:
                'One secure portal for renters across Canada and the US: pay rent, request maintenance, build credit, and manage documents.',
              url: 'https://revun.com/tenants/',
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(buildFAQPageSchema(faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildHowToSchema({
              name: 'How tenants use Revun',
              description: 'The four-step tenant journey on Revun.',
              steps: steps.map((s) => ({ name: s.title, text: s.description })),
            })
          ),
        }}
      />

      {/* ═════ Hero ═════ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F8FAFF] via-white to-[#F5F6F8] pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="absolute inset-0 bg-dot-grid opacity-30" aria-hidden="true" />
        <div className="absolute left-[-8rem] top-[6rem] h-[28rem] w-[28rem] rounded-full bg-[#176FEB]/8 blur-[120px]" aria-hidden="true" />
        <div className="absolute right-[-10rem] top-[-4rem] h-[32rem] w-[32rem] rounded-full bg-[#4A91F0]/8 blur-[140px]" aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
            <RevealOnScroll>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#176FEB]/20 bg-white/80 px-3 py-1.5 text-xs font-medium text-[#176FEB] backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#176FEB]" />
                Built for Canada and the United States
              </div>

              <h1 className="font-display text-4xl font-normal leading-[1.02] tracking-tight text-[#0A1628] text-balance md:text-5xl lg:text-6xl">
                Renting, finally{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 italic text-[#176FEB]">redesigned</span>
                  <span className="absolute inset-x-0 bottom-1 h-3 bg-[#176FEB]/15 -z-0" aria-hidden="true" />
                </span>.
              </h1>

              {/* Rotating audiences accent */}
              <div className="mt-5 flex items-center gap-3">
                <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.18em] text-[#94A3B8]">
                  Built for
                </span>
                <RotatingBadge phrases={ROTATING_AUDIENCES} />
              </div>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-[#475569] md:text-lg">
                Pay rent, build credit, track maintenance, and manage your entire lease from a single portal. No email chains, no lost receipts, no platform fees for tenants.
              </p>

              {/* Inline stat strip */}
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 font-heading text-[11px] text-[#64748B]">
                <span className="inline-flex items-center gap-1.5">
                  <span className="font-display text-base text-[#0A1628]">200K+</span>
                  <span className="uppercase tracking-[0.12em]">renters</span>
                </span>
                <span className="h-3 w-px bg-[#E5E7EB]" aria-hidden="true" />
                <span className="inline-flex items-center gap-1.5">
                  <span className="font-display text-base text-[#0A1628]">$2.4B</span>
                  <span className="uppercase tracking-[0.12em]">processed</span>
                </span>
                <span className="h-3 w-px bg-[#E5E7EB]" aria-hidden="true" />
                <span className="inline-flex items-center gap-1.5">
                  <span className="font-display text-base text-[#0A1628]">$0</span>
                  <span className="uppercase tracking-[0.12em]">tenant fees</span>
                </span>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/login/"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#176FEB] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#0B5AD4]"
                >
                  Sign in to your portal
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact/"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-6 text-sm font-semibold text-[#0A1628] transition-colors hover:border-[#176FEB]/30"
                >
                  Recommend to your landlord
                </Link>
              </div>
            </RevealOnScroll>

            <RevealOnScroll>
              <div className="relative">
                <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-tr from-[#176FEB]/20 via-[#4A91F0]/10 to-transparent blur-3xl" aria-hidden="true" />
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&w=900&q=80"
                    alt="A renter in a bright modern apartment"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/40 via-transparent to-transparent" aria-hidden="true" />
                </div>

                {/* Floating credit badge */}
                <div className="absolute -left-4 top-10 hidden rounded-2xl border border-[#E5E7EB] bg-white p-3 shadow-xl md:flex md:items-center md:gap-2.5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F2FE] text-[#176FEB]">
                    <TrendingUp className="h-5 w-5" />
                  </span>
                  <div className="pr-1">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#64748B]">
                      Credit boost
                    </p>
                    <p className="font-display text-base font-bold text-[#0A1628]">+42 points</p>
                  </div>
                </div>

                {/* Floating rent paid badge */}
                <div className="absolute -right-4 -bottom-6 hidden rounded-2xl border border-white/60 bg-white/95 p-3 shadow-xl backdrop-blur-md md:block md:w-[220px]">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D1FAE5] px-2 py-0.5 text-[10px] font-semibold text-[#047857]">
                      <CheckCircle2 className="h-3 w-3" /> Rent paid
                    </span>
                    <span className="text-[10px] text-[#64748B]">Apr 1</span>
                  </div>
                  <div className="mt-1.5 flex items-baseline justify-between">
                    <span className="font-display text-lg font-bold text-[#0A1628]">$1,850.00</span>
                    <span className="text-[11px] font-semibold text-[#176FEB]">Autopay on</span>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ═════ Proof Strip ═════ */}
      <section className="border-y border-[#E5E7EB] bg-white py-12">
        <div className="mx-auto max-w-7xl px-6">
          <RevealOnScroll stagger={0.08}>
            <div className="grid gap-y-8 sm:grid-cols-2 sm:divide-x sm:divide-[#E5E7EB] lg:grid-cols-4">
              {proofPoints.map((p) => (
                <div
                  key={p.label}
                  className="flex flex-col items-start gap-1.5 sm:px-8 sm:first:pl-0 lg:first:pl-0"
                >
                  <span className="font-heading text-[10px] font-semibold uppercase tracking-[0.16em] text-[#176FEB]">
                    {p.label}
                  </span>
                  <div className="flex items-baseline gap-1 font-display text-[34px] font-normal leading-none tabular-nums text-[#0A1628] md:text-[40px]">
                    {p.value}
                    <span className="text-[#176FEB]">{p.suffix}</span>
                  </div>
                  <span className="text-[12px] text-[#64748B]">{p.caption}</span>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ═════ Feature overview — 6 quick features ═════ */}
      <Section background="off">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll>
            <SectionHeader
              eyebrow="Everything you need"
              title="Six things, one app"
              description="No more switching between your landlord's email, a payment app, a maintenance form, and a shared folder for your lease. Every part of renting lives in one portal, built for tenants."
            />
          </RevealOnScroll>

          <RevealOnScroll stagger={0.08}>
            <div className="mx-auto grid max-w-5xl gap-x-12 md:grid-cols-2">
              {coreFeatures.map((f, i) => {
                const Icon = f.icon
                const isLastInCol = i === coreFeatures.length - 1 || i === coreFeatures.length - 2
                return (
                  <div
                    key={f.title}
                    className={`group flex items-start gap-5 py-6 transition-colors ${
                      isLastInCol ? '' : 'border-b border-[#E5E7EB]'
                    }`}
                  >
                    <span className="font-display text-4xl font-bold tabular-nums text-[#176FEB]/25 transition-colors group-hover:text-[#176FEB]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E8F2FE] text-[#176FEB]">
                          <Icon className="h-4 w-4" />
                        </span>
                        <h3 className="font-heading text-lg font-semibold text-[#0A1628]">
                          {f.title}
                        </h3>
                      </div>
                      <p className="mt-2 pl-10 text-sm leading-relaxed text-[#475569]">
                        {f.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </RevealOnScroll>
        </div>
      </Section>

      {/* ═════ Pay rent — photo + text ═════ */}
      <Section background="white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <RevealOnScroll>
              <div className="relative">
                <SectionImage
                  src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=900&q=80"
                  alt="A tenant relaxing on the couch while paying rent on her phone"
                  captionLeft={
                    <>
                      <Zap className="h-3 w-3" /> 30 seconds to pay
                    </>
                  }
                  captionRight="Sarah, Toronto"
                />

                {/* Floating receipt pill */}
                <ProofPill className="absolute -bottom-6 -right-6 w-[240px] hidden md:block">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D1FAE5] px-2 py-0.5 text-[10px] font-semibold text-[#047857]">
                      <CheckCircle2 className="h-3 w-3" /> Paid
                    </span>
                    <span className="text-[10px] text-[#64748B]">Receipt #4821</span>
                  </div>
                  <p className="mt-2 font-display text-2xl font-bold text-[#0A1628]">$1,850.00</p>
                  <p className="mt-0.5 text-[11px] text-[#64748B]">
                    Apr 1, 2025 · Scotiabank ****4821
                  </p>
                  <div className="mt-3 flex items-center justify-between border-t border-[#E5E7EB] pt-2.5">
                    <span className="text-[10px] font-semibold text-[#0A1628]">
                      18-month on-time streak
                    </span>
                    <span className="text-[10px] text-[#176FEB] font-semibold">Autopay on</span>
                  </div>
                </ProofPill>
              </div>
            </RevealOnScroll>

            <RevealOnScroll>
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#E8F2FE] px-3 py-1 text-xs font-semibold text-[#176FEB]">
                  <CreditCard className="h-3.5 w-3.5" /> Payments
                </span>
                <h2 className="mt-4 font-display text-3xl font-normal text-[#0A1628] text-balance md:text-5xl">
                  Pay rent,{' '}
                  <span className="italic text-[#176FEB]">however you want</span>.
                </h2>
                <p className="mt-5 text-[#475569]">
                  Revun supports every way North Americans move money. Pay once or schedule autopay. Split rent between a bank account and a rewards card. Switch methods any month. Receipts are digital, instant, and archived forever, so you have proof the moment your landlord asks.
                </p>

                <ul className="mt-7 space-y-3.5">
                  <FeatureBullet icon={CheckCircle2} label="ACH, PAD, and Interac e-Transfer (Canada) at zero fees" />
                  <FeatureBullet icon={CheckCircle2} label="Visa, Mastercard, AMEX, and Interac Debit supported" />
                  <FeatureBullet icon={CheckCircle2} label="Autopay, split payments, and custom schedules" />
                  <FeatureBullet icon={CheckCircle2} label="Instant digital receipts, automatically archived" />
                </ul>

                <div className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#F9FAFB] px-4 py-3 text-sm text-[#475569]">
                  <Lock className="h-4 w-4 text-[#176FEB]" />
                  <span>
                    Payments processed by{' '}
                    <span className="font-semibold text-[#0A1628]">PCI DSS Level 1</span>{' '}
                    providers. Card details never touch Revun servers.
                  </span>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </Section>

      {/* ═════ Build credit ═════ */}
      <Section background="white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <RevealOnScroll>
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#176FEB] to-[#0B5AD4] p-8 text-white md:p-10">
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
                <div className="absolute -bottom-20 -left-12 h-56 w-56 rounded-full bg-white/5 blur-3xl" aria-hidden="true" />

                <div className="relative">
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/80">
                    Average tenant result
                  </p>
                  <div className="mt-6 flex items-center gap-6">
                    <ScoreRing value={82} size={96} />
                    <div>
                      <p className="font-display text-6xl font-bold tabular-nums leading-none md:text-7xl">
                        <CountUp value={47} prefix="+" />
                      </p>
                      <p className="mt-2 text-base font-semibold text-white/85">
                        credit points in 6 months
                      </p>
                    </div>
                  </div>

                  {/* Real tenant quote */}
                  <blockquote className="mt-10 border-t border-white/15 pt-6">
                    <Quote className="h-6 w-6 text-white/30" aria-hidden="true" />
                    <p className="mt-2 text-base italic leading-relaxed text-white/95">
                      I bumped my credit score 42 points in six months just by paying rent the way I already was. When I financed a car, the lender actually thanked me for the rent history.
                    </p>
                    <footer className="mt-4 flex items-center gap-3">
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-white/30">
                        <Image
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80"
                          alt="James K."
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">James K.</p>
                        <p className="text-[11px] text-white/70">Austin, TX · Tenant since 2022</p>
                      </div>
                    </footer>
                  </blockquote>

                  <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-white/15 pt-5">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-white/70">
                      Reported to
                    </span>
                    <span className="rounded-lg bg-white/15 px-2.5 py-1 text-xs font-semibold">
                      Equifax
                    </span>
                    <span className="rounded-lg bg-white/15 px-2.5 py-1 text-xs font-semibold">
                      TransUnion
                    </span>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll>
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#E8F2FE] px-3 py-1 text-xs font-semibold text-[#176FEB]">
                  <TrendingUp className="h-3.5 w-3.5" /> Credit Rent Reporting
                </span>
                <h2 className="mt-4 font-display text-3xl font-normal text-[#0A1628] text-balance md:text-5xl">
                  Revun tenants added +47 points in 6 months. Here&rsquo;s how.
                </h2>
                <p className="mt-5 text-[#475569]">
                  Revun reports every on-time rent payment to{' '}
                  <span className="font-semibold text-[#0A1628]">Equifax</span> and{' '}
                  <span className="font-semibold text-[#0A1628]">TransUnion</span>, the same bureaus that decide your mortgage, auto loan, and credit card rates. Reporting starts the month your property manager activates Revun, and you can backdate up to 24 months of verified rent history.
                </p>

                <ul className="mt-7 space-y-3.5">
                  <FeatureBullet icon={Zap} label="Automatic reporting, zero extra steps for tenants" />
                  <FeatureBullet icon={Calendar} label="Up to 24 months of backdated rent history" />
                  <FeatureBullet icon={MapPin} label="Works in both Canada and the United States" />
                  <FeatureBullet icon={ShieldCheck} label="Optional negative reporting, you stay in control" />
                </ul>

                <div className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#F9FAFB] px-4 py-3 text-sm text-[#475569]">
                  <BadgeCheck className="h-4 w-4 text-[#176FEB]" />
                  <span>
                    <span className="font-semibold text-[#0A1628]">Opt-out anytime.</span>{' '}
                    Your score, your control.
                  </span>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </Section>

      {/* ═════ Maintenance — photo + text ═════ */}
      <Section background="off">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <RevealOnScroll>
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#E8F2FE] px-3 py-1 text-xs font-semibold text-[#176FEB]">
                  <Wrench className="h-3.5 w-3.5" /> Maintenance
                </span>
                <h2 className="mt-4 font-display text-3xl font-normal text-[#0A1628] text-balance md:text-5xl">
                  Snap a photo.{' '}
                  <span className="italic text-[#176FEB]">It gets fixed.</span>
                </h2>
                <p className="mt-5 text-[#475569]">
                  No more late-night texts to your landlord hoping someone follows up. Open the app, snap a photo, add a one-line description, and your property manager gets a structured ticket with everything they need. You see the whole thing happen in real time: triage, assignment, ETA, and completion notes.
                </p>

                <ul className="mt-7 space-y-3.5">
                  <FeatureBullet icon={Camera} label="Photo-first request intake with auto-categorization" />
                  <FeatureBullet icon={Clock} label="Live status: Reported → Triaged → Assigned → In progress → Done" />
                  <FeatureBullet icon={Users} label="Technician name, company, and ETA shown before they arrive" />
                  <FeatureBullet icon={ClipboardCheck} label="Completion report with before/after photos" />
                </ul>

                <div className="mt-8 rounded-2xl border border-[#176FEB]/20 bg-white p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F2FE] text-[#176FEB]">
                      <Clock className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-heading text-sm font-semibold text-[#0A1628]">
                        Under 6 hours on 92% of tickets
                      </p>
                      <p className="text-xs text-[#64748B]">
                        From tenant submission to technician assignment, measured across 847 Revun-enabled portfolios in Q1 2026.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll>
              <div className="relative">
                <SectionImage
                  src="https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=900&q=80"
                  alt="A professional technician repairing a kitchen sink in a tenant's apartment"
                  captionLeft={
                    <>
                      <Clock className="h-3 w-3" /> 4h avg response
                    </>
                  }
                  captionRight="Alex T. · Liberty Plumbing"
                />

                <ProofPill className="absolute -bottom-6 -left-6 w-[240px] hidden md:block">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FEF3C7] px-2 py-0.5 text-[10px] font-semibold text-[#92400E]">
                      <Clock className="h-3 w-3" /> In progress
                    </span>
                    <span className="text-[10px] text-[#64748B]">#MNT-0482</span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-[#0A1628]">Kitchen faucet leak</p>
                  <p className="mt-0.5 text-[11px] text-[#64748B]">
                    Tech arriving Apr 11, 9–11 AM
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 border-t border-[#E5E7EB] pt-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#176FEB]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#176FEB]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#176FEB]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#E5E7EB]" />
                    <span className="ml-auto text-[10px] text-[#64748B]">3 of 5 done</span>
                  </div>
                </ProofPill>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </Section>

      {/* ═════ Documents — photo + text ═════ */}
      <Section background="white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <RevealOnScroll>
              <div className="relative">
                <SectionImage
                  src="https://images.unsplash.com/photo-1483389127117-b6a2102724ae?auto=format&fit=crop&w=900&q=80"
                  alt="A person reviewing their lease documents at a cozy home office"
                  captionLeft={
                    <>
                      <FileText className="h-3 w-3" /> 7-year retention
                    </>
                  }
                  captionRight="Downloadable anytime"
                />

                <ProofPill className="absolute -bottom-6 -right-6 w-[260px] hidden md:block">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#176FEB]">
                    Your document vault
                  </p>
                  <div className="mt-2.5 space-y-1.5">
                    {[
                      { name: 'Lease Agreement', tag: 'Active', color: 'text-[#047857]' },
                      { name: 'Move-in Inspection', tag: 'Signed', color: 'text-[#176FEB]' },
                      { name: 'Receipt · Apr 2025', tag: 'Latest', color: 'text-[#64748B]' },
                    ].map((d) => (
                      <div key={d.name} className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-[11px] font-medium text-[#0A1628]">
                          <FileText className="h-3 w-3 text-[#176FEB]" />
                          {d.name}
                        </span>
                        <span className={`text-[10px] font-semibold ${d.color}`}>{d.tag}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 border-t border-[#E5E7EB] pt-2 text-[10px] text-[#64748B]">
                    + 12 more files · all searchable
                  </p>
                </ProofPill>
              </div>
            </RevealOnScroll>

            <RevealOnScroll>
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#E8F2FE] px-3 py-1 text-xs font-semibold text-[#176FEB]">
                  <FileText className="h-3.5 w-3.5" /> Documents
                </span>
                <h2 className="mt-4 font-display text-3xl font-normal text-[#0A1628] text-balance md:text-5xl">
                  Every document,{' '}
                  <span className="italic text-[#176FEB]">always with you</span>.
                </h2>
                <p className="mt-5 text-[#475569]">
                  Every document related to your tenancy is automatically filed and searchable. Move-in inspection from 2023? There. Last month&rsquo;s rent receipt? There. Pet addendum you signed last July? There. Nothing lives in an email attachment you have to hunt down before a tax filing.
                </p>

                <ul className="mt-7 space-y-3.5">
                  <FeatureBullet icon={FileText} label="Signed leases, addendums, and renewal offers" />
                  <FeatureBullet icon={Camera} label="Move-in and move-out inspection reports with photos" />
                  <FeatureBullet icon={Receipt} label="Every rent receipt and full payment history" />
                  <FeatureBullet icon={Search} label="Search by filename, date, or document type" />
                </ul>

                <div className="mt-8 rounded-2xl bg-[#F5F6F8] p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                    Retention guarantee
                  </p>
                  <p className="mt-1.5 text-sm text-[#475569]">
                    Documents stay accessible for{' '}
                    <span className="font-semibold text-[#0A1628]">7 years</span> after your tenancy ends. Long enough to cover tax filing, dispute resolution, and future rental applications.
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </Section>

      {/* ═════ Process — editorial rail, no cards ═════ */}
      <Section background="off">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll>
            <SectionHeader
              eyebrow="How it works"
              title="From search to settled, in"
              highlight="four steps"
              description="Every part of the rental lifecycle handled from one portal. No email chains, no lost paperwork, no guessing where you stand."
            />
          </RevealOnScroll>

          <RevealOnScroll stagger={0.08}>
            <div className="relative">
              {/* Continuous vertical rail threading through circle badges, desktop only */}
              <div
                className="pointer-events-none absolute left-[27px] top-0 bottom-0 hidden w-px bg-gradient-to-b from-transparent via-[#E5E7EB] to-transparent md:block"
                aria-hidden="true"
              />

              <div className="flex flex-col divide-y divide-[#E5E7EB] border-y border-[#E5E7EB]">
                {steps.map((s) => {
                  const Icon = s.icon
                  return (
                    <div
                      key={s.step}
                      className="group relative grid grid-cols-1 gap-5 py-9 md:grid-cols-[140px_1fr_220px] md:items-start md:gap-10 md:py-12"
                    >
                      {/* Left — circle badge + step label */}
                      <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-4">
                        <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-[#E5E7EB] shadow-[0_0_0_4px_#F5F6F8] transition-all duration-300 group-hover:ring-[#176FEB]">
                          <span className="font-display text-xl font-normal tabular-nums text-[#0A1628] transition-colors duration-300 group-hover:text-[#176FEB]">
                            {s.step}
                          </span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-white px-2.5 py-1 font-heading text-[10px] font-semibold uppercase tracking-[0.14em] text-[#64748B]">
                          <Clock className="h-3 w-3 text-[#176FEB]" aria-hidden="true" />
                          {s.time}
                        </span>
                      </div>

                      {/* Middle — icon + title + description + proof */}
                      <div className="md:pt-2">
                        <div className="flex items-center gap-2.5">
                          <Icon className="h-[18px] w-[18px] shrink-0 text-[#176FEB]" strokeWidth={2} aria-hidden="true" />
                          <h3 className="font-display text-xl font-normal text-[#0A1628] md:text-[26px]">
                            {s.title}
                          </h3>
                        </div>
                        <p className="mt-3 text-[14px] leading-relaxed text-[#475569] md:max-w-[540px]">
                          {s.description}
                        </p>
                        <div className="mt-4 flex items-start gap-1.5 font-heading text-[11.5px] font-medium leading-relaxed text-[#475569]">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#176FEB]" strokeWidth={2.2} aria-hidden="true" />
                          <span>{s.proof}</span>
                        </div>
                      </div>

                      {/* Right — what Revun handles, inline data strip */}
                      <div className="flex flex-col gap-1 border-l-0 border-t border-[#F1F3F5] pt-5 md:border-l md:border-t-0 md:pl-7 md:pt-2">
                        <span className="font-heading text-[10px] font-semibold uppercase tracking-[0.16em] text-[#176FEB]">
                          Handled by Revun
                        </span>
                        <p className="mt-1.5 font-heading text-[13px] leading-relaxed text-[#0A1628]">
                          {s.step === '01' && 'Verified photos, unit availability, rent-regulation zone, and application requirements pulled automatically.'}
                          {s.step === '02' && 'ID verification, credit pull, income proof via Flinks or Plaid, reference checks, screening decision.'}
                          {s.step === '03' && 'Lease templates per province or state, e-signature, move-in inspection, deposit handling, portal provisioning.'}
                          {s.step === '04' && 'Autopay, reminders, receipts, maintenance routing, document archive, credit reporting, renewal prompts.'}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </Section>

      {/* ═════ Your first 30 days — magazine 2-col spread ═════ */}
      <Section background="white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
            {/* Left — portrait photograph with floating day markers */}
            <RevealOnScroll>
              <div className="relative">
                <div
                  className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-[#176FEB]/15 via-[#4A91F0]/8 to-transparent blur-3xl"
                  aria-hidden="true"
                />

                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-[0_25px_60px_-25px_rgba(10,22,40,0.25)]">
                  <Image
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
                    alt="Freshly moved-in apartment with natural light"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/50 via-transparent to-transparent"
                    aria-hidden="true"
                  />

                  {/* Caption inside image */}
                  <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 font-heading text-[10px] font-semibold uppercase tracking-[0.14em] backdrop-blur-md">
                      <Calendar className="h-3 w-3" />
                      Day 0 to Day 30
                    </span>
                    <span className="font-heading text-[10px] text-white/80">Move-in to milestone</span>
                  </div>
                </div>

                {/* Floating marker — Day 1 (top-left) */}
                <div className="absolute -top-3 -left-3 hidden rounded-2xl border border-[#E5E7EB] bg-white px-3 py-2.5 shadow-[0_12px_30px_-12px_rgba(10,22,40,0.2)] md:block">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#176FEB] text-white">
                      <Camera className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-heading text-[9px] font-semibold uppercase tracking-[0.14em] text-[#94A3B8]">
                        Day 1
                      </p>
                      <p className="font-heading text-[12px] font-semibold text-[#0A1628]">
                        Move-in photos logged
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating marker — Day 15 (mid-right) */}
                <div className="absolute top-1/2 -right-4 hidden -translate-y-1/2 rounded-2xl border border-[#E5E7EB] bg-white px-3 py-2.5 shadow-[0_12px_30px_-12px_rgba(10,22,40,0.2)] md:block">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#176FEB] text-white">
                      <CreditCard className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-heading text-[9px] font-semibold uppercase tracking-[0.14em] text-[#94A3B8]">
                        Day 15
                      </p>
                      <p className="font-heading text-[12px] font-semibold text-[#0A1628]">
                        Autopay on, $0 fees
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating marker — Day 30 (bottom-left) */}
                <div className="absolute -bottom-4 -left-3 hidden rounded-2xl border border-[#E5E7EB] bg-white px-3 py-2.5 shadow-[0_12px_30px_-12px_rgba(10,22,40,0.2)] md:block">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#176FEB] text-white">
                      <TrendingUp className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-heading text-[9px] font-semibold uppercase tracking-[0.14em] text-[#94A3B8]">
                        Day 30
                      </p>
                      <p className="font-heading text-[12px] font-semibold text-[#0A1628]">
                        Credit reported, +4 pts
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            {/* Right — editorial narrative with inline day callouts */}
            <RevealOnScroll>
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#E8F2FE] px-3 py-1 font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-[#176FEB]">
                  <Calendar className="h-3.5 w-3.5" />
                  Your first 30 days
                </span>

                <h2 className="mt-5 font-display text-3xl font-normal leading-[1.05] text-[#0A1628] text-balance md:text-5xl lg:text-[56px]">
                  Moving in to settled in,{' '}
                  <span className="italic text-[#176FEB]">without the chaos</span>.
                </h2>

                <p className="mt-5 text-[15px] leading-relaxed text-[#475569] md:text-[17px]">
                  Keys change hands on the first day. Your credit score moves on the thirtieth. Everything between happens quietly, on the same portal, without a single email thread.
                </p>

                {/* Inline day callouts — running editorial text, not a list */}
                <dl className="mt-10 space-y-5 border-t border-[#E5E7EB] pt-8">
                  {[
                    { day: '00', title: 'Keys and portal access, together.', body: 'Lease, deposit, utilities, and emergency contacts arrive in one sequence. Two minutes to activate.' },
                    { day: '03', title: 'First request routed in seconds.', body: 'A photo, one line, an auto-category. Tech name and ETA confirmed before the knock. Under six hours on average.' },
                    { day: '07', title: 'The paperwork quietly files itself.', body: 'Addendums, pet docs, parking, move-in inspection, all signed and archived against the lease.' },
                    { day: '30', title: 'Credit bureaus hear about you.', body: 'Your first reported on-time payment goes to Equifax and TransUnion. Plus four points on average, opt-out anytime.' },
                  ].map((m) => (
                    <div key={m.day} className="grid grid-cols-[56px_1fr] items-baseline gap-4">
                      <dt className="font-display text-2xl font-normal leading-none tabular-nums text-[#176FEB]">
                        {m.day}
                      </dt>
                      <dd>
                        <p className="font-heading text-[14.5px] font-semibold text-[#0A1628]">
                          {m.title}
                        </p>
                        <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#475569]">
                          {m.body}
                        </p>
                      </dd>
                    </div>
                  ))}
                </dl>

                {/* Footer stat strip, no chrome */}
                <div className="mt-10 flex flex-wrap items-baseline gap-x-6 gap-y-3 border-t border-[#E5E7EB] pt-6 font-heading text-[11px] uppercase tracking-[0.14em] text-[#64748B]">
                  <span className="inline-flex items-baseline gap-1.5">
                    <span className="font-display text-base normal-case tracking-normal text-[#0A1628]">6</span>
                    milestones
                  </span>
                  <span className="h-3 w-px bg-[#E5E7EB]" aria-hidden="true" />
                  <span className="inline-flex items-baseline gap-1.5">
                    <span className="font-display text-base normal-case tracking-normal text-[#0A1628]">$0</span>
                    setup cost
                  </span>
                  <span className="h-3 w-px bg-[#E5E7EB]" aria-hidden="true" />
                  <span className="inline-flex items-baseline gap-1.5">
                    <span className="font-display text-base normal-case tracking-normal text-[#0A1628]">30d</span>
                    to first credit bump
                  </span>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </Section>

      {/* ═════ Testimonials — editorial quote stack ═════ */}
      <Section background="white">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <SectionHeader
              eyebrow="Tenant voices"
              title="Loved by renters"
              highlight="coast to coast"
              description="Three tenants. Three cities. One year on Revun."
            />
          </RevealOnScroll>

          <RevealOnScroll stagger={0.1}>
            <div className="flex flex-col divide-y divide-[#E5E7EB] border-y border-[#E5E7EB]">
              {testimonials.map((t) => (
                <figure
                  key={t.name}
                  className="grid grid-cols-1 gap-6 py-10 md:grid-cols-[160px_1fr] md:gap-10 md:py-12"
                >
                  {/* Left — avatar + identity */}
                  <div className="flex items-start gap-4 md:flex-col md:items-start md:gap-4">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-1 ring-[#E5E7EB] md:h-16 md:w-16">
                      <Image src={t.avatar} alt={t.name} fill sizes="64px" className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-heading text-sm font-semibold text-[#0A1628]">{t.name}</p>
                      <p className="mt-0.5 flex items-center gap-1 text-[11px] text-[#64748B]">
                        <MapPin className="h-3 w-3" aria-hidden="true" />
                        {t.location}
                      </p>
                      <p className="mt-0.5 text-[11px] text-[#94A3B8]">{t.since}</p>
                      <p className="mt-2 text-[11px] text-[#94A3B8]">Managed by {t.managedBy}</p>
                      <div className="mt-3 flex items-center gap-0.5">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-[#F59E0B] text-[#F59E0B]" aria-hidden="true" />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right — quote */}
                  <div>
                    <Quote className="h-6 w-6 text-[#176FEB]/30" aria-hidden="true" />
                    <blockquote className="mt-3 font-display text-[20px] font-normal leading-[1.45] text-[#0A1628] md:text-[22px]">
                      {t.quote}
                    </blockquote>
                  </div>
                </figure>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </Section>

      {/* ═════ Roommates spotlight ═════ */}
      <Section background="off">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-[2.5rem] border border-[#E5E7EB] bg-white p-6 shadow-sm md:p-8">
            <div className="grid items-center gap-6 md:grid-cols-2 md:gap-10">
              <RevealOnScroll>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"
                    alt="Two roommates chatting and laughing in a shared apartment"
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-cover"
                  />
                </div>
              </RevealOnScroll>

              <RevealOnScroll>
                <div className="px-0 md:px-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#176FEB]/20 bg-white px-3 py-1 text-xs font-semibold text-[#176FEB]">
                    <Sparkles className="h-3.5 w-3.5" /> New
                  </span>
                  <h2 className="mt-4 font-display text-3xl font-normal text-[#0A1628] text-balance md:text-4xl">
                    Roommates you&rsquo;ll actually{' '}
                    <span className="italic text-[#176FEB]">get along with</span>.
                  </h2>
                  <p className="mt-4 text-[#475569]">
                    Before you sign a lease together, know if you&rsquo;re compatible. Our short quiz covers sleep schedule, cleanliness, guests, noise tolerance, and pets. Match with verified profiles, never anonymous posts, and split rent automatically from day one.
                  </p>
                  <ul className="mt-6 space-y-3">
                    <FeatureBullet icon={Users} label="Compatibility match on habits, schedule, and lifestyle" />
                    <FeatureBullet icon={BadgeCheck} label="Verified profiles with ID confirmation, no catfishing" />
                    <FeatureBullet icon={CreditCard} label="Automatic rent splitting from the first payment" />
                  </ul>
                  <Link
                    href="/features/roommates/"
                    className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-[#176FEB] hover:underline"
                  >
                    Explore Roommate Matching
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </Section>

      {/* ═════ Fee breakdown — editorial comparison with savings hero ═════ */}
      <Section background="white">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll>
            <SectionHeader
              eyebrow="What it costs you"
              title="Pay rent, pay"
              highlight="nothing to pay rent"
              description="Most rent-payment platforms tax tenants for the privilege. Revun does not. Side-by-side on a $2,000 monthly rent, across a full year of tenancy."
            />
          </RevealOnScroll>

          {/* Savings hero — giant number, visual bar, inline context */}
          <RevealOnScroll>
            <div className="mb-10 overflow-hidden rounded-3xl bg-gradient-to-br from-[#176FEB] to-[#0B5AD4] p-8 text-white md:p-10">
              <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end">
                <div>
                  <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75">
                    Average renter saves
                  </p>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="font-display text-[72px] font-normal leading-none tabular-nums md:text-[96px]">
                      <CountUp value={244} prefix="$" />
                    </span>
                    <span className="font-heading text-base font-semibold text-white/80">
                      per year
                    </span>
                  </div>
                  <p className="mt-3 max-w-md text-[14px] leading-relaxed text-white/85">
                    That is the median tenant saving, versus switching between a rent portal, a credit-reporting app, and a document storage service. On Revun, every line below is zero.
                  </p>
                </div>

                {/* Visual bar comparison */}
                <div className="relative rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
                  <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.14em] text-white/75">
                    Annual tenant cost, by provider
                  </p>
                  <div className="mt-4 space-y-3">
                    {[
                      { name: 'Rent portal A', amount: '$244', width: '100%', muted: true },
                      { name: 'Rent portal B', amount: '$192', width: '78%', muted: true },
                      { name: 'Rent portal C', amount: '$156', width: '64%', muted: true },
                      { name: 'Revun', amount: '$0', width: '2%', muted: false },
                    ].map((b) => (
                      <div key={b.name}>
                        <div className="flex items-baseline justify-between">
                          <span className="font-heading text-[11px] font-medium text-white/85">
                            {b.name}
                          </span>
                          <span className={`font-display text-sm tabular-nums ${b.muted ? 'text-white/75' : 'text-white'}`}>
                            {b.amount}
                          </span>
                        </div>
                        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/15">
                          <div
                            className={`h-full rounded-full ${b.muted ? 'bg-white/50' : 'bg-white'}`}
                            style={{ width: b.width }}
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white">
              <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-4 border-b border-[#E5E7EB] bg-[#F8F9FA] px-5 py-3.5 md:px-7">
                <span className="font-heading text-[10px] font-semibold uppercase tracking-[0.14em] text-[#64748B]">
                  Tenant cost
                </span>
                <span className="text-right font-heading text-[10px] font-semibold uppercase tracking-[0.14em] text-[#64748B]">
                  Typical portal
                </span>
                <span className="text-right font-heading text-[10px] font-semibold uppercase tracking-[0.14em] text-[#176FEB]">
                  Revun
                </span>
              </div>

              <div className="divide-y divide-[#F1F3F5]">
                {[
                  { label: 'ACH bank transfer', typical: '$3.00 / txn', revun: '$0' },
                  { label: 'Interac e-Transfer', typical: '$1.50 to $5.00', revun: '$0' },
                  { label: 'Pre-Authorized Debit (PAD)', typical: 'Setup fee + per txn', revun: '$0' },
                  { label: 'Credit or debit card', typical: '2.9% + $0.30 platform', revun: '0% platform fee' },
                  { label: 'Autopay subscription', typical: '$1.95 / month', revun: '$0' },
                  { label: 'Digital receipt copy', typical: '$0.50 each', revun: '$0' },
                  { label: 'Document vault access', typical: '$5 to $10 / month', revun: '$0' },
                  { label: 'Maintenance requests', typical: '$0 to $1.95', revun: '$0' },
                  { label: 'Credit rent reporting', typical: '$6.95 / month', revun: '$0' },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-[1.4fr_1fr_1fr] gap-4 px-5 py-3.5 md:px-7"
                  >
                    <span className="font-heading text-[13px] text-[#0A1628]">{row.label}</span>
                    <span className="text-right font-heading text-[13px] text-[#64748B] line-through decoration-[#CBD5E1]">
                      {row.typical}
                    </span>
                    <span className="text-right font-heading text-[13px] font-semibold text-[#176FEB]">
                      {row.revun}
                    </span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-4 border-t border-[#E5E7EB] bg-[#0A1628] px-5 py-5 text-white md:px-7">
                <span className="font-heading text-[12px] font-semibold">
                  Typical annual tenant cost
                </span>
                <span className="text-right font-display text-[20px] font-normal tabular-nums text-white/70 line-through decoration-white/30">
                  $244+
                </span>
                <span className="text-right font-display text-[24px] font-normal tabular-nums text-[#4A91F0]">
                  $0
                </span>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="mt-5 text-center text-[12px] text-[#64748B]">
              Card-network processing (around 2.9%) is charged by Visa, Mastercard, or AMEX directly, never by Revun. Every bank rail (PAD, Interac, ACH) is free to tenants forever.
            </p>
          </RevealOnScroll>
        </div>
      </Section>

      {/* ═════ Integration partners — editorial strip with visual marks ═════ */}
      <Section background="off">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll>
            <SectionHeader
              eyebrow="Powered by trusted infrastructure"
              title="Connected to the systems"
              highlight="you already use"
              description="Revun does not try to replace your bank, your credit bureau, or your payment network. It connects to the ones tenants and landlords already trust."
            />
          </RevealOnScroll>

          <RevealOnScroll stagger={0.06}>
            <div className="flex flex-col divide-y divide-[#E5E7EB] border-y border-[#E5E7EB]">
              {[
                { category: 'Credit reporting', icon: TrendingUp, count: 4, partners: ['Equifax Canada', 'Equifax US', 'TransUnion Canada', 'TransUnion US'] },
                { category: 'Payment networks', icon: CreditCard, count: 6, partners: ['Interac e-Transfer', 'ACH Network', 'Visa', 'Mastercard', 'American Express', 'Interac Debit'] },
                { category: 'Canadian banking', icon: MapPin, count: 7, partners: ['RBC', 'TD', 'BMO', 'Scotiabank', 'CIBC', 'National Bank', 'Desjardins'] },
                { category: 'US banking', icon: MapPin, count: 6, partners: ['Chase', 'Bank of America', 'Wells Fargo', 'Citi', 'US Bank', 'Capital One'] },
                { category: 'Identity and income', icon: BadgeCheck, count: 3, partners: ['Flinks', 'Plaid', 'Persona'] },
                { category: 'Accounting exports', icon: FileText, count: 5, partners: ['QuickBooks', 'Xero', 'Sage', 'CSV', 'PDF'] },
              ].map((group) => {
                const GroupIcon = group.icon
                return (
                  <div
                    key={group.category}
                    className="group grid grid-cols-1 gap-5 py-7 md:grid-cols-[auto_200px_1fr] md:items-center md:gap-8 md:py-8"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F2FE] text-[#176FEB] transition-all duration-300 group-hover:bg-[#176FEB] group-hover:text-white">
                      <GroupIcon className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden="true" />
                    </span>
                    <div>
                      <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.16em] text-[#176FEB]">
                        {group.category}
                      </span>
                      <p className="mt-1 font-heading text-[11px] font-medium text-[#94A3B8]">
                        {group.count} partners
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {group.partners.map((p) => (
                        <span
                          key={p}
                          className="inline-flex items-center rounded-md border border-[#E5E7EB] bg-white px-2.5 py-1 font-heading text-[11.5px] font-medium text-[#0A1628] transition-colors duration-200 hover:border-[#176FEB]/40 hover:text-[#176FEB]"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </RevealOnScroll>

          {/* Bottom stat strip */}
          <RevealOnScroll>
            <div className="mt-10 grid grid-cols-2 gap-4 rounded-2xl border border-[#E5E7EB] bg-white px-6 py-5 md:grid-cols-4">
              {[
                { value: '31+', label: 'Integration partners' },
                { value: '13', label: 'Canadian provinces' },
                { value: '50', label: 'US states and DC' },
                { value: 'Zero', label: 'Tenant setup fees' },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className={`flex flex-col ${i > 0 ? 'md:border-l md:border-[#E5E7EB] md:pl-5' : ''}`}
                >
                  <span className="font-display text-2xl font-normal tabular-nums text-[#176FEB]">
                    {s.value}
                  </span>
                  <span className="mt-0.5 font-heading text-[10px] font-semibold uppercase tracking-[0.14em] text-[#64748B]">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </Section>

      {/* ═════ Privacy wall — editorial list ═════ */}
      <Section background="white">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <SectionHeader
              eyebrow="Privacy and Security"
              title="Built around your"
              highlight="protection"
              description="Three guarantees that sit underneath every feature, so the things you never want to worry about stay invisible."
            />
          </RevealOnScroll>

          <RevealOnScroll stagger={0.1}>
            <div className="flex flex-col divide-y divide-[#E5E7EB] border-y border-[#E5E7EB]">
              {[
                {
                  title: 'PCI DSS Level 1 payments',
                  description:
                    'Every transaction uses bank-grade encryption. Card numbers and bank details are tokenized, they never touch Revun servers.',
                  icon: Lock,
                  meta: 'Validated quarterly',
                  spec: 'AES-256 at rest · TLS 1.3 in transit · Tokenized via Stripe',
                },
                {
                  title: 'Encrypted messaging',
                  description:
                    'Every message between you and your property team is time-stamped, verifiable, and stored on Canadian and US infrastructure by jurisdiction.',
                  icon: ShieldCheck,
                  meta: 'Independent audit available',
                  spec: 'End-to-end TLS 1.3 · Signed with SHA-256 · 7-year retention',
                },
                {
                  title: 'Privacy-law compliant',
                  description:
                    'PIPEDA in Canada, CCPA and state-level privacy laws in the US. Revun never sells, rents, or shares tenant data with advertisers or data brokers.',
                  icon: BadgeCheck,
                  meta: 'SOC 2 Type II in progress',
                  spec: 'PIPEDA · CCPA · Quebec Law 25 · Opt-out controls in the portal',
                },
              ].map((t) => {
                const Icon = t.icon
                return (
                  <div
                    key={t.title}
                    className="group grid grid-cols-1 gap-5 py-9 md:grid-cols-[auto_1fr_200px] md:items-start md:gap-10 md:py-12"
                  >
                    {/* Icon tile */}
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F2FE] text-[#176FEB] transition-transform duration-300 group-hover:scale-105">
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </span>

                    {/* Title + description + spec line */}
                    <div className="md:pt-1">
                      <h3 className="font-display text-xl font-normal text-[#0A1628] md:text-[26px]">
                        {t.title}
                      </h3>
                      <p className="mt-3 text-[14px] leading-relaxed text-[#475569] md:max-w-[540px]">
                        {t.description}
                      </p>
                      <p className="mt-4 font-heading text-[11px] font-medium text-[#94A3B8]">
                        <span className="uppercase tracking-[0.14em]">Spec</span>
                        <span className="mx-2 text-[#E5E7EB]">/</span>
                        {t.spec}
                      </p>
                    </div>

                    {/* Meta line right */}
                    <div className="flex items-start gap-1.5 border-l-0 border-t border-[#F1F3F5] pt-5 md:border-l md:border-t-0 md:pl-7 md:pt-1">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#176FEB]" strokeWidth={2.2} aria-hidden="true" />
                      <div>
                        <span className="font-heading text-[10px] font-semibold uppercase tracking-[0.16em] text-[#176FEB]">
                          Certification
                        </span>
                        <p className="mt-1 font-heading text-[12.5px] font-medium text-[#0A1628]">
                          {t.meta}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </RevealOnScroll>
        </div>
      </Section>

      {/* ═════ FAQ ═════ */}
      <Section background="off">
        <div className="mx-auto max-w-3xl px-6">
          <RevealOnScroll>
            <SectionHeader
              eyebrow="FAQ"
              title="Answers"
              highlight="before you ask"
              description="The most common questions we get from renters across Canada and the US."
            />
          </RevealOnScroll>

          <RevealOnScroll>
            <Accordion className="divide-y divide-[#E5E7EB] rounded-3xl border border-[#E5E7EB] bg-white">
              {faqs.map((faq) => (
                <AccordionItem key={faq.question} value={faq.question} className="border-none">
                  <AccordionTrigger className="px-6 py-5 text-left text-[15px] font-heading font-semibold text-[#0A1628] hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5 text-sm leading-relaxed text-[#475569]">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </RevealOnScroll>
        </div>
      </Section>

      {/* ═════ Dual-path CTA ═════ */}
      <Section background="white">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll>
            <SectionHeader
              eyebrow="Get started"
              title="Pick your"
              highlight="path"
              description="Tenants join Revun through their property manager. Here's what happens next, either way."
            />
          </RevealOnScroll>

          <RevealOnScroll stagger={0.1}>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="relative overflow-hidden rounded-3xl border border-[#E5E7EB] bg-white p-8 transition-all duration-300 hover:border-[#176FEB]/30 hover:shadow-card-hover">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F2FE] px-3 py-1 text-xs font-semibold text-[#176FEB]">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Already invited
                </span>
                <h3 className="mt-5 font-display text-2xl font-normal text-[#0A1628] md:text-3xl">
                  Your landlord uses Revun.
                </h3>
                <p className="mt-3 text-[#475569]">
                  Check your email or SMS for a setup link. No app install required. Your portal opens in any browser in under two minutes.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/login/"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#176FEB] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#0B5AD4]"
                  >
                    Sign in
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <p className="mt-6 text-xs text-[#64748B]">Prefer mobile?</p>
                <AppStoreBadges className="mt-2" />
              </div>

              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#176FEB] to-[#0B5AD4] p-8 text-white">
                <div className="absolute -top-20 -right-20 h-52 w-52 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
                <span className="relative inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                  <Heart className="h-3.5 w-3.5" /> Not yet invited
                </span>
                <h3 className="relative mt-5 font-display text-2xl font-normal md:text-3xl">
                  Help your landlord find a better way.
                </h3>
                <p className="relative mt-3 text-white/85">
                  Send a one-minute recommendation. We&rsquo;ll share how Revun saves property managers hours every week, and gives you the portal you actually want.
                </p>
                <Link
                  href="/contact/"
                  className="relative mt-7 inline-flex h-11 items-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-[#176FEB] transition-colors hover:bg-white/90"
                >
                  Recommend Revun
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <div className="relative mt-8 flex items-center gap-3 border-t border-white/15 pt-6 text-xs text-white/70">
                  <Bell className="h-3.5 w-3.5" />
                  <span>Most landlords onboard within 7 days of a tenant recommendation.</span>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </Section>

      {/* AEO answer for search engines */}
      <p className="sr-only">
        Revun is a secure rental portal for tenants across Canada and the United States, used by 200,000+ renters. Tenants pay rent via ACH, Interac e-Transfer, PAD, credit, or debit card with zero tenant fees; build credit with every on-time payment reported to Equifax and TransUnion; submit maintenance requests with photos and track real-time status; access lease documents, inspection reports, and receipts for 7 years; and message their property team through encrypted chat without sharing personal phone numbers. All transactions use PCI DSS Level 1 processing. Tenants are invited to Revun by their property manager.
      </p>
    </>
  )
}
