# About + Careers + Meet the Team — Full Build Spec

Hand this entire file to Claude in the other project's session. It covers
**all three pages** we shipped on MoveSmart Rentals, adapted to a fresh
codebase with dummy data: About Us, Careers (landing + role detail + apply
modal), and Meet the Team — plus the shared data files, the team grid
components, the nav update, and the sitemap.

---

## 1. Context (read this first)

You are shipping three public marketing pages on an existing client website:

1. **`/about/`** — "About Us" — story, values, leadership grid, final CTA
2. **`/careers/`** — Careers landing — hero, culture, benefits, hybrid, teams,
   community, open-positions list grouped by region → city → role
3. **`/careers/<slug>/`** — Role detail page — dark hero with meta strip,
   responsibilities, required skills, and an **"Apply Now"** button that
   opens a modal-form portaled to `document.body`
4. **`/meet-the-team/`** — Meet the Team — hero, intro, leadership grid,
   join-the-team CTA

All four pages share one team-data file and the team-grid components.
Careers landing + detail share one careers-data file.

After the pages ship, the **About** dropdown in the top nav must show:
**About Us → Meet the Team → Careers → Reviews** (in that order).

For initial launch, use **3 dummy team members** and **4 dummy career
roles** (provided below). Real ones come later.

### Stack assumptions

- Next.js App Router (`src/app/`). Adapt if it's pages-router.
- Tailwind CSS for styling.
- `lucide-react` for icons. Install if missing: `npm i lucide-react`.
- `next/image` for portraits and hero photos.
- Brand colours exposed as CSS variables in the project — typically
  `--brand-navy`, `--brand-emerald`, `--brand-emerald-hover`, `--brand-gold`.
  If they don't exist, **substitute the project's actual brand variables** —
  do not invent new ones, do not change the design system.
- `react-dom`'s `createPortal` (already in any Next.js project).

### Before you touch any file, search for these

1. Nav config — usually `src/lib/nav-config.ts` or `src/data/navigation.ts`
2. Mobile nav — usually `src/components/layout/mobile-nav.tsx`
3. Sitemap — usually `src/app/sitemap.ts`
4. An existing simple page (e.g. `/contact/page.tsx`) — match its
   `metadata`, breadcrumb, and JSON-LD patterns
5. `next.config.ts` — confirm `images.remotePatterns` allows
   `images.unsplash.com` (we use Unsplash photos for hero images)

If a file doesn't exist in the target project (e.g. there's no mobile nav),
**skip that step and report what you skipped**. Do not invent new
infrastructure.

---

## 2. Tasks at a glance

1. Create `src/data/team.ts` with the `TeamMember` interface + 3 dummy members
2. Create `src/data/careers.ts` with the `Role` interface + 4 dummy roles +
   `getRolesByRegion()` helper
3. Create `src/components/team/team-avatar.tsx` (portrait + monogram fallback)
4. Create `src/components/team/team-card.tsx` (directory grid card)
5. Create `src/components/careers/apply-button.tsx` (Apply Now button + modal,
   portaled to `document.body`)
6. Create `src/app/(site)/about/page.tsx` — the About Us page
7. Create `src/app/(site)/careers/page.tsx` — the Careers landing
8. Create `src/app/(site)/careers/[slug]/page.tsx` — the role detail page
9. Create `src/app/(site)/meet-the-team/page.tsx` — the Meet the Team page
10. Update the nav config: insert "Meet the Team" between About Us and Careers,
    move Reviews to last
11. Mirror the same change in the mobile nav
12. Add `/meet-the-team/` to the sitemap
13. Run `npx tsc --noEmit` and `npx next lint` — report clean
14. End-of-turn summary with every file path and the URLs to test

If the target codebase doesn't use the `(site)` route group, drop the
`(site)/` segment from the paths above. The public URL is unaffected
either way.

---

## 3. Shared foundations

### 3.1 `src/data/team.ts`

Single source of truth. Consumed by the About page, the Meet the Team
page, and the sitemap.

```ts
export interface TeamMember {
  slug: string
  name: string
  role: string
  department: string
  office: string
  province: string
  country: string
  email: string
  /** null → phone row hidden on the card. */
  phone: string | null
  /** null → monogram fallback shown instead of a photo. */
  photoUrl: string | null
  photoAlt: string
  quote: string
  shortBio: string
}

export const TEAM: TeamMember[] = [
  {
    slug: 'alex-morgan',
    name: 'Alex Morgan',
    role: 'Director of Operations',
    department: 'Operations',
    office: 'Toronto',
    province: 'Ontario',
    country: 'Canada',
    email: 'amorgan@example.com',
    phone: null,
    photoUrl: null,
    photoAlt: 'Alex Morgan, Director of Operations',
    quote:
      'Execution discipline is what separates a good launch from a great one.',
    shortBio:
      'Director of Operations. Owns end-to-end execution across the pipeline, from intake to handover.',
  },
  {
    slug: 'priya-singh',
    name: 'Priya Singh',
    role: 'Head of Client Success',
    department: 'Client Success',
    office: 'Toronto',
    province: 'Ontario',
    country: 'Canada',
    email: 'psingh@example.com',
    phone: null,
    photoUrl: null,
    photoAlt: 'Priya Singh, Head of Client Success',
    quote: 'A small book and a real relationship. That is how trust compounds.',
    shortBio:
      'Head of Client Success. Owns the relationship from signed engagement through year-two renewal.',
  },
  {
    slug: 'jordan-lee',
    name: 'Jordan Lee',
    role: 'Lead Underwriter',
    department: 'Underwriting',
    office: 'Toronto',
    province: 'Ontario',
    country: 'Canada',
    email: 'jlee@example.com',
    phone: null,
    photoUrl: null,
    photoAlt: 'Jordan Lee, Lead Underwriter',
    quote:
      'A shortlist with a written rationale beats a stack of applications, every time.',
    shortBio:
      'Lead Underwriter. Built the screening rubric used on every applicant: credit, income, references, and risk-flag detection.',
  },
]

export function getTeamMemberBySlug(slug: string): TeamMember | undefined {
  return TEAM.find((m) => m.slug === slug)
}

export function getAllTeamSlugs(): string[] {
  return TEAM.map((m) => m.slug)
}

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export function getMemberAccent(slug: string): 'gold' | 'emerald' | 'navy' {
  let h = 0
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0
  const buckets: Array<'gold' | 'emerald' | 'navy'> = ['gold', 'emerald', 'navy']
  return buckets[h % buckets.length]
}
```

---

### 3.2 `src/data/careers.ts`

Single source of truth for open roles. Consumed by the careers landing,
the role detail page, and the sitemap.

```ts
export interface Role {
  slug: string
  title: string
  department: string
  /** "Full-time" | "Part-time" | "Contract" | "Internship" */
  type: string
  city: string
  province: string
  country: 'Canada' | 'United States'
  /** Display string for the hero meta row, e.g.
   *  "Toronto, ON · Canada · Hybrid". */
  locationDisplay: string
  /** Pattern: ABC-YYYY-NNN. Use the project's own job-ID prefix. */
  jobId: string
  postingStartDate: string
  /** Display string, e.g. "$75,000 plus commission and benefits". */
  compensation: string
  summary: string
  responsibilities: string[]
  requiredSkills: string[]
  goodToHaveSkills: string[]
  educationAndExperience: string[]
  additionalInfo: string | null
  relocationAssistance: boolean
}

export const ROLES: Role[] = [
  {
    slug: 'senior-leasing-agent-toronto',
    title: 'Senior Leasing Agent',
    department: 'Leasing; Operations',
    type: 'Full-time',
    city: 'Toronto',
    province: 'Ontario',
    country: 'Canada',
    locationDisplay: 'Toronto, ON · Canada · Hybrid',
    jobId: 'CO-2026-001',
    postingStartDate: '2026-06-10',
    compensation: '$75,000 plus commission and benefits',
    summary:
      'We are seeking an experienced Senior Leasing Agent to manage the full lead-to-lease cycle for a residential portfolio in the GTA.',
    responsibilities: [
      'Own the full lead-to-lease cycle for a portfolio of GTA properties.',
      'Conduct in-person and virtual showings on a structured schedule.',
      'Run applicant qualification using the bank-grade rubric.',
      'Coordinate with property managers and owners on move-in handover.',
      'Maintain CRM hygiene: every lead, showing, and application tracked.',
    ],
    requiredSkills: [
      'Strong sales and communication skills with a leasing track record.',
      'Comfort with digital lead-management tools and CRM workflows.',
      'Active RECO registration in good standing.',
      'Self-managed schedule with strong organisational discipline.',
    ],
    goodToHaveSkills: [
      'Experience with multi-unit lease-up campaigns.',
      'Familiarity with Toronto-area rental sub-markets.',
      'AppFolio, Yardi, or similar PM platform experience.',
    ],
    educationAndExperience: [
      'Active RECO registration (Ontario).',
      '3+ years of residential leasing experience in the GTA.',
    ],
    additionalInfo:
      'Toronto-based, hybrid schedule with regular field showings across the GTA.',
    relocationAssistance: false,
  },
  {
    slug: 'director-of-operations-toronto',
    title: 'Director of Operations',
    department: 'Operations; Leadership',
    type: 'Full-time',
    city: 'Toronto',
    province: 'Ontario',
    country: 'Canada',
    locationDisplay: 'Toronto, ON · Canada · Hybrid',
    jobId: 'CO-2026-002',
    postingStartDate: '2026-06-10',
    compensation: '$145,000 plus performance bonus and benefits',
    summary:
      'We are seeking an experienced Director of Operations to build and lead our function across North America.',
    responsibilities: [
      'Build and lead the operations function across Canadian and US markets.',
      'Set process and performance standards for every owner-file.',
      'Manage hiring plans, capacity forecasting, and territory coverage.',
      'Own KPI reporting: time-to-lease, applicant approval accuracy, owner renewal.',
    ],
    requiredSkills: [
      'Proven operations leadership in residential real estate.',
      'Demonstrated ability to scale a team from scratch.',
      'Strong commercial and analytical instincts.',
    ],
    goodToHaveSkills: [
      'Experience launching a US market from a Canadian base.',
      'Familiarity with HubSpot, Salesforce, or AppFolio.',
    ],
    educationAndExperience: [
      'Bachelor’s in Business, Real Estate, or related field.',
      '8+ years in residential leasing or property management.',
    ],
    additionalInfo: 'Toronto-based, with regular travel to active markets.',
    relocationAssistance: true,
  },
  {
    slug: 'marketing-coordinator-toronto',
    title: 'Marketing Coordinator',
    department: 'Marketing; Operations',
    type: 'Full-time',
    city: 'Toronto',
    province: 'Ontario',
    country: 'Canada',
    locationDisplay: 'Toronto, ON · Canada · Hybrid',
    jobId: 'CO-2026-003',
    postingStartDate: '2026-06-10',
    compensation: '$65,000 plus benefits',
    summary:
      'We are seeking a Marketing Coordinator to own listings marketing and digital presence for our active portfolio.',
    responsibilities: [
      'Write conversion-focused listings copy.',
      'Manage listings across Zillow, Rentals.ca, Facebook Marketplace.',
      'Run targeted paid lead-generation campaigns.',
    ],
    requiredSkills: [
      'Strong writing skills.',
      'Familiarity with rental listing platforms and the paid social stack.',
    ],
    goodToHaveSkills: [
      'Canva, Figma, or other lightweight design tools.',
      'HubSpot, Mailchimp, or similar.',
    ],
    educationAndExperience: [
      'Degree in Marketing, Communications, or related field.',
      '2+ years in marketing.',
    ],
    additionalInfo:
      'Hybrid schedule, 3 days/week in-office.',
    relocationAssistance: false,
  },
  {
    slug: 'tenant-placement-coordinator-remote',
    title: 'Tenant Placement Coordinator',
    department: 'Operations',
    type: 'Full-time',
    city: 'Remote',
    province: 'Remote — North America',
    country: 'Canada',
    locationDisplay: 'Remote · North America',
    jobId: 'CO-2026-004',
    postingStartDate: '2026-06-10',
    compensation: '$65,000 plus benefits',
    summary:
      'We are seeking a Tenant Placement Coordinator to manage the lead-to-lease workflow across our Canadian and US markets.',
    responsibilities: [
      'Field inbound applicant inquiries and route to the right agent.',
      'Schedule showings, send reminders, chase no-shows.',
      'Run background, credit, and income checks.',
    ],
    requiredSkills: [
      'Strong written and verbal communication.',
      'Detail-oriented with strong follow-through.',
    ],
    goodToHaveSkills: [
      'Familiarity with Canadian and US background-check providers.',
    ],
    educationAndExperience: [
      'Post-secondary diploma or degree.',
      '2+ years in property management or tenant services.',
    ],
    additionalInfo:
      'Fully remote within North America. Office-equipment stipend on start.',
    relocationAssistance: false,
  },
]

/* ── Helpers ───────────────────────────────────────────────────── */

export function getRoleBySlug(slug: string): Role | undefined {
  return ROLES.find((r) => r.slug === slug)
}

export function getAllRoleSlugs(): string[] {
  return ROLES.map((r) => r.slug)
}

export interface CityGroup {
  city: string
  roles: Role[]
}
export interface RegionGroup {
  region: string
  country: 'Canada' | 'United States'
  cities: CityGroup[]
}

/** Group roles by province/state, then by city. Used by the careers
 *  landing page to render a hierarchical list. */
export function getRolesByRegion(): RegionGroup[] {
  const order: string[] = []
  const map = new Map<
    string,
    { country: 'Canada' | 'United States'; cityOrder: string[]; cityMap: Map<string, Role[]> }
  >()

  for (const role of ROLES) {
    if (!map.has(role.province)) {
      order.push(role.province)
      map.set(role.province, { country: role.country, cityOrder: [], cityMap: new Map() })
    }
    const region = map.get(role.province)!
    if (!region.cityMap.has(role.city)) {
      region.cityOrder.push(role.city)
      region.cityMap.set(role.city, [])
    }
    region.cityMap.get(role.city)!.push(role)
  }

  return order.map((province) => {
    const region = map.get(province)!
    return {
      region: province,
      country: region.country,
      cities: region.cityOrder.map((city) => ({ city, roles: region.cityMap.get(city)! })),
    }
  })
}
```

---

### 3.3 `src/components/team/team-avatar.tsx`

```tsx
import Image from 'next/image'

import { getInitials, getMemberAccent, type TeamMember } from '@/data/team'

interface Props {
  member: Pick<TeamMember, 'name' | 'slug' | 'photoUrl' | 'photoAlt'>
  size?: 'card' | 'hero'
  className?: string
}

const sizeMap = { card: 'aspect-[4/5]', hero: 'aspect-[3/4]' } as const
const monogramSizeMap = { card: 'text-[3.5rem]', hero: 'text-[7rem]' } as const

const accentMap = {
  gold: 'bg-gradient-to-br from-amber-400/95 to-amber-500/75 text-white',
  emerald: 'bg-gradient-to-br from-emerald-500 to-emerald-700 text-white',
  navy: 'bg-gradient-to-br from-slate-800 to-slate-900 text-white',
} as const

export function TeamAvatar({ member, size = 'card', className = '' }: Props) {
  const containerClass = `relative w-full overflow-hidden bg-slate-100 ${sizeMap[size]} ${className}`

  if (member.photoUrl) {
    return (
      <div className={containerClass}>
        <Image
          src={member.photoUrl}
          alt={member.photoAlt}
          fill
          className="object-cover"
          sizes={
            size === 'hero'
              ? '(max-width: 1024px) 100vw, 480px'
              : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px'
          }
          unoptimized
        />
      </div>
    )
  }

  const accent = getMemberAccent(member.slug)
  const initials = getInitials(member.name)

  return (
    <div className={containerClass}>
      <div
        aria-hidden="true"
        className={`absolute inset-0 flex items-center justify-center ${accentMap[accent]}`}
      >
        <span className={`font-serif leading-none ${monogramSizeMap[size]}`}>
          {initials}
        </span>
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.18),transparent_55%)]"
      />
    </div>
  )
}
```

---

### 3.4 `src/components/team/team-card.tsx`

```tsx
import { Mail, MapPin, Phone } from 'lucide-react'

import { TeamAvatar } from './team-avatar'
import type { TeamMember } from '@/data/team'

interface Props {
  member: TeamMember
}

export function TeamCard({ member }: Props) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-sm border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative">
        <TeamAvatar member={member} size="card" />
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-800 backdrop-blur-sm">
          <MapPin className="size-3" aria-hidden="true" />
          {member.office}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-xl text-slate-900">{member.name}</h3>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
          {member.role}{' '}
          <span className="text-slate-300">|</span>{' '}
          <span className="text-slate-500">{member.department}</span>
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          {member.shortBio}
        </p>

        <div className="mt-auto pt-5">
          <div aria-hidden="true" className="h-px w-full bg-gradient-to-r from-slate-200 via-slate-200 to-transparent" />
          <div className="mt-4 space-y-1.5">
            {member.phone && (
              <a
                href={`tel:${member.phone.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 text-sm text-slate-700 transition-colors hover:text-emerald-700"
              >
                <Phone className="size-3.5 text-amber-500" strokeWidth={2.25} aria-hidden="true" />
                {member.phone}
              </a>
            )}
            <a
              href={`mailto:${member.email}`}
              className="block truncate text-sm text-emerald-700 underline-offset-2 hover:underline"
            >
              <span className="inline-flex max-w-full items-center gap-2 align-middle">
                <Mail className="size-3.5 shrink-0 text-amber-500" strokeWidth={2.25} aria-hidden="true" />
                <span className="truncate">{member.email}</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}
```

---

## 4. The Apply Now modal — the tricky one

This component took us multiple iterations to get right. Read this whole
section before writing the code.

### Required behaviour

1. **Modal anchored to the top of the viewport** when opened, not the
   vertical centre. Pinned ~5rem below the top edge so it sits cleanly
   under the navbar.
2. **Modal stays sticky in the viewport when the user scrolls the page** —
   like a sticky navbar. The page underneath continues to scroll freely.
3. **Background is dimmed + blurred** for visual focus, but does **NOT**
   capture pointer or wheel events — the user can scroll the page right
   through the dimmed overlay.
4. **Form fits in the viewport without internal scroll** on a standard
   laptop screen (≥650px tall). Compact spacing, two-column rows.
5. **The modal is portaled to `document.body`** via `createPortal`. This is
   essential — parent components in the page tree (framer-motion wrappers,
   blur effects, etc.) create new containing blocks that break
   `position: fixed`. Portaling avoids all of them.
6. **Closes** on: X button, Escape key, click on the dimmed area outside the
   card.
7. **Accessibility**: `role="dialog"`, `aria-modal="true"`,
   `aria-labelledby` pointing to the title's ID.

### `src/components/careers/apply-button.tsx`

```tsx
'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

interface Props {
  role: string
  jobId: string
  className?: string
  variant?: 'primary' | 'ghost'
  label?: string
}

export function ApplyButton({
  role,
  jobId,
  className = '',
  variant = 'primary',
  label = 'Apply Now',
}: Props) {
  const [open, setOpen] = useState(false)

  const triggerBase =
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all whitespace-nowrap'
  const triggerVariant =
    variant === 'primary'
      ? 'bg-[var(--brand-emerald)] text-white hover:-translate-y-0.5 hover:bg-[var(--brand-emerald-hover)]'
      : 'border border-slate-300 bg-white text-slate-900 hover:border-slate-500 hover:bg-slate-50'

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`${triggerBase} ${triggerVariant} ${className}`}
      >
        {label}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
      {open && <ApplyModal role={role} jobId={jobId} onClose={() => setOpen(false)} />}
    </>
  )
}

function ApplyModal({
  role,
  jobId,
  onClose,
}: {
  role: string
  jobId: string
  onClose: () => void
}) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [mounted, setMounted] = useState(false)

  // Portal can only mount after hydration — document.body doesn't exist on the server.
  useEffect(() => {
    setMounted(true)
  }, [])

  // Escape closes. Background scroll is intentionally NOT locked — the
  // page must stay scrollable behind the dialog so the candidate can
  // re-read the job description while filling out the form.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    const fd = new FormData(e.currentTarget)
    const payload = {
      role,
      jobId,
      firstName: fd.get('firstName'),
      lastName: fd.get('lastName'),
      email: fd.get('email'),
      phone: fd.get('phone'),
      linkedin: fd.get('linkedin'),
      resumeUrl: fd.get('resumeUrl'),
      whyYou: fd.get('whyYou'),
      referral: fd.get('referral'),
    }
    try {
      const res = await fetch('/api/careers-apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        setStatus('success')
      } else {
        const data = await res.json()
        setErrorMsg(data.error || 'Something went wrong.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  if (!mounted) return null

  return createPortal(
    <>
      {/* Backdrop — visual only. pointer-events-none lets wheel + clicks
          pass through to the page underneath so it stays scrollable. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-40 bg-[var(--brand-navy)]/70 backdrop-blur-sm"
      />
      {/* Modal frame — fixed at the TOP of the viewport, not centred.
          pointer-events-none on the wrapper means wheel events on the
          dimmed area fall through to the body; only the white card is
          interactive. */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="apply-modal-title"
        className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-20 sm:pt-24"
      >
        <div className="pointer-events-auto relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
          <div className="flex items-center justify-between rounded-t-2xl border-b border-slate-100 bg-white px-5 py-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--brand-emerald)]">
                Apply Now · {jobId}
              </p>
              <h2 id="apply-modal-title" className="mt-0.5 text-[18px] font-bold text-slate-900">
                {role}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 transition-colors hover:text-slate-900"
              aria-label="Close"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center gap-4 p-10 text-center">
              <CheckCircle2 className="h-12 w-12 text-[var(--brand-emerald)]" />
              <h3 className="text-xl font-bold text-slate-900">Application received</h3>
              <p className="max-w-sm text-sm text-slate-600">
                Thank you for applying to the {role} position. We will be in touch within 5 business days.
              </p>
              <button onClick={onClose} className="mt-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white">
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 p-5">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field name="firstName" label="First Name" required placeholder="Jane" />
                <Field name="lastName" label="Last Name" required placeholder="Smith" />
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field name="email" type="email" label="Email" required placeholder="you@email.com" />
                <Field name="phone" type="tel" label="Phone" placeholder="+1 416 555 0100" />
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field name="linkedin" type="url" label="LinkedIn URL" placeholder="linkedin.com/in/yourprofile" />
                <Field name="resumeUrl" type="url" label="Resume URL" placeholder="Google Drive, Dropbox, etc." />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">
                  Why do you want this role? <span className="font-normal text-slate-400">(optional)</span>
                </label>
                <textarea
                  name="whyYou"
                  rows={2}
                  className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-emerald)]"
                  placeholder="What draws you to this position..."
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">How did you hear about us?</label>
                <select
                  name="referral"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-emerald)]"
                >
                  <option value="">Select one</option>
                  <option>Google Search</option>
                  <option>LinkedIn</option>
                  <option>Indeed</option>
                  <option>Referral</option>
                  <option>Other</option>
                </select>
              </div>
              {status === 'error' && (
                <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">{errorMsg}</p>
              )}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--brand-emerald)] py-2.5 text-sm font-bold text-white transition-colors hover:bg-[var(--brand-emerald-hover)] disabled:opacity-60"
              >
                {status === 'loading' ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          )}
        </div>
      </div>
    </>,
    document.body,
  )
}

function Field({
  name,
  label,
  type = 'text',
  required,
  placeholder,
}: {
  name: string
  label: string
  type?: string
  required?: boolean
  placeholder?: string
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold text-slate-600">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-emerald)]"
      />
    </div>
  )
}
```

> **API endpoint**: the form posts to `/api/careers-apply`. If the target
> project doesn't have that route yet, either stub it (return 200) or
> swap the fetch for a `mailto:` for now and leave a TODO.

---

## 5. The pages

All four pages use the same layout pattern: a hero section + content
sections + a final CTA. Use the project's existing layout primitives if
they exist. The code below is self-contained — adapt class names to match
the project's design tokens.

### 5.1 `src/app/(site)/about/page.tsx` — About Us

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

import { TeamCard } from '@/components/team/team-card'
import { TEAM } from '@/data/team'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'

export const metadata: Metadata = {
  title: 'About Us | Our Story',
  description:
    'We are a full-service leasing and tenant placement company built for landlords, property managers, builders, and institutional rental operators.',
  alternates: { canonical: '/about/' },
}

export default function AboutPage() {
  return (
    <main>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-[var(--brand-navy)] py-24 text-white md:py-32">
        <Image
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2400&q=80"
          alt="Team collaborating in modern office"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-center"
          unoptimized
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-[var(--brand-navy)] via-[var(--brand-navy)]/85 to-[var(--brand-navy)]/55"
        />
        <div className="relative mx-auto max-w-5xl px-6">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--brand-emerald)]">About</p>
          <h1 className="text-balance text-4xl font-bold leading-tight text-white md:text-5xl">
            Full-service execution for serious operators.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/85">
            We are a full-service company built for landlords, property managers, builders, and institutional rental operators who refuse to leave the leasing phase to chance.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/meet-the-team/"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-emerald)] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-900/20 transition-colors hover:bg-[var(--brand-emerald-hover)]"
            >
              Meet the team <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact/"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/70 hover:bg-white/10"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>

      {/* ── OUR STORY ────────────────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-emerald)]">Our story</p>
          <h2 className="mt-4 font-serif text-4xl text-slate-900 sm:text-5xl">Why we exist.</h2>
          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
            <blockquote className="rounded-sm border border-slate-200 bg-slate-50 p-8 font-serif text-2xl italic leading-relaxed text-slate-900">
              “Brokers sell. Managers operate. We were built to obsess over the leasing phase itself.”
            </blockquote>
            <div className="space-y-6 text-base leading-relaxed text-slate-700">
              <p>
                The rental market is busy and fragmented. Brokers are wired to sell. Property managers are wired to operate the years after move-in. Almost nobody is purpose-built for the leasing phase itself.
              </p>
              <p>
                We built our practice for that window. Strategic pricing. Polished listing presentation. Structured showings. Disciplined applicant qualification. A complete move-in handover.
              </p>
              <p className="font-serif text-xl italic text-emerald-700">
                Owners do not need warmth alone. They need proof the work was done.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-emerald)]">Our values</p>
          <h2 className="mt-4 font-serif text-4xl text-slate-900 sm:text-5xl">How we work.</h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              { title: 'Named leads', body: 'Every owner-file has a named lead. No anonymous queues, no dropped handoffs.' },
              { title: 'Written rationale', body: 'Every applicant comes with a written rationale, not a stack of paperwork.' },
              { title: 'Documented handover', body: 'Move-in is a checklist: keys, utilities, insurance, walkthrough. All archived.' },
            ].map((v) => (
              <div key={v.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ─────────────────────────────────────────────────── */}
      <section id="team" className="scroll-mt-24 bg-[#FBFAF6] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Our team</p>
            <h2 className="mt-4 font-serif text-4xl text-slate-900 sm:text-5xl">Meet Our Leadership Team.</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((member) => (
              <TeamCard key={member.slug} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────── */}
      <section className="bg-[var(--brand-navy)] py-16 text-white sm:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-400">Work with us</p>
          <h2 className="mt-3 font-serif text-3xl text-white sm:text-4xl md:text-5xl">Get the right person on your file.</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            Tell us about your property and we will route you to the lead with the right market and asset-class fit, usually within one business day.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact/"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-emerald)] px-6 py-3 text-sm font-bold text-white shadow-lg"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
```

---

### 5.2 `src/app/(site)/careers/page.tsx` — Careers landing

Uses six high-quality Unsplash images, one per section (hero background,
culture, benefits, hybrid work, teams banner, community). All IDs below
are verified-working Unsplash photos.

```tsx
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Briefcase,
  Globe2,
  HeartHandshake,
  Laptop2,
  LineChart,
  MapPin,
  Sparkles,
  Star,
  Users,
} from 'lucide-react'

import { getRolesByRegion, ROLES } from '@/data/careers'

const UNSPLASH = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

const IMG = {
  heroSkyline: { src: UNSPLASH('1517935706615-2717063c2225', 2400), alt: 'Toronto skyline at golden hour' },
  cultureTeam: { src: UNSPLASH('1521737711867-e3b97375f902', 1400), alt: 'Team collaborating on laptops' },
  benefitsLearning: { src: UNSPLASH('1517048676732-d65bc937f952', 1400), alt: 'Colleagues taking notes' },
  hybridOffice: { src: UNSPLASH('1531973576160-7125cd663d86', 1600), alt: 'Modern open-concept office' },
  teamsBoardroom: { src: UNSPLASH('1542744173-8e7e53415bb0', 1600), alt: 'Boardroom team review' },
  communityOffice: { src: UNSPLASH('1556761175-b413da4baf72', 1600), alt: 'Open-plan workspace' },
} as const

export const metadata: Metadata = {
  title: 'Careers | Join Our Team',
  description: 'Open roles across Canada and the United States. Leasing, operations, marketing, and trade roles.',
  alternates: { canonical: '/careers/' },
}

const WHY_JOIN = [
  { Icon: LineChart, title: 'Scale your career', body: 'We are expanding. The team you join today will be many times the size in three years.' },
  { Icon: Globe2, title: 'North American markets', body: 'Work across Canada and the US.' },
  { Icon: Users, title: 'Owner-first culture', body: 'We take the work seriously.' },
  { Icon: Star, title: 'Performance-backed comp', body: 'Strong base salaries with real upside.' },
]
const BENEFITS = [
  { Icon: Sparkles, title: 'Competitive comp', body: 'Competitive base salaries and performance incentives.' },
  { Icon: HeartHandshake, title: 'Health & wellness', body: 'Health, dental, mental-wellness support, and annual wellness allowance.' },
  { Icon: Sparkles, title: 'Learning', body: 'Educational reimbursement and professional designation fees covered.' },
]
const HYBRID = [
  { Icon: Users, title: 'In-person connection', body: 'When we are together, we build real relationships and move faster.' },
  { Icon: LineChart, title: 'Challenge the status quo', body: 'Being together turns good ideas into real products.' },
  { Icon: Laptop2, title: 'Right tech', body: 'Modern collaboration tools across every workstation.' },
]
const TEAMS = [
  { title: 'Business & Support', body: 'Marketing, ops, finance, people, legal, and risk.' },
  { title: 'Client Service & Sales', body: 'The voice of the brand on every interaction.' },
  { title: 'Leasing & Real Estate', body: 'Licensed agents on the ground in our markets.' },
  { title: 'Engineering & Technology', body: 'Software, data, AI, and platform reliability.' },
  { title: 'Trades & Field Services', body: 'Technicians who keep the portfolio in showing-ready condition.' },
  { title: 'Students & Interns', body: 'Internships across ops, marketing, tech, and trades.' },
]

export default function CareersPage() {
  const jobsByRegion = getRolesByRegion()
  const totalRoles = ROLES.length

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-[var(--brand-navy)] py-24 text-white md:py-32">
        <Image src={IMG.heroSkyline.src} alt={IMG.heroSkyline.alt} fill priority sizes="100vw" className="absolute inset-0 -z-20 object-cover object-center" unoptimized />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-[var(--brand-navy)] via-[var(--brand-navy)]/85 to-[var(--brand-navy)]/55" />
        <div className="relative mx-auto max-w-5xl px-6">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--brand-emerald)]">Careers</p>
          <h1 className="text-balance text-4xl font-bold leading-tight text-white md:text-5xl">
            Join the team building a better rental market across North America.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/85">
            We connect landlords and tenants across Canada and the United States.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#positions" className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-emerald)] px-6 py-3 text-sm font-bold text-white">See open positions <ArrowRight className="h-4 w-4" /></a>
            <a href="mailto:careers@example.com" className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm">General application</a>
          </div>
        </div>
      </section>

      {/* ── CULTURE ─────────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--brand-emerald)]">Our culture</p>
              <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">People are the key to our success.</h2>
              <p className="mt-6 text-base leading-relaxed text-slate-600">
                We are highly collaborative. You will conquer challenges, push boundaries, and discover what you are truly capable of.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-200">
              <Image src={IMG.cultureTeam.src} alt={IMG.cultureTeam.alt} fill sizes="(max-width: 1024px) 100vw, 480px" className="object-cover" unoptimized />
            </div>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_JOIN.map(({ Icon, title, body }) => (
              <div key={title} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <Icon className="mb-3 h-5 w-5 text-[var(--brand-emerald)]" strokeWidth={1.5} />
                <h3 className="text-sm font-bold text-slate-900">{title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--brand-emerald)]">Benefits</p>
              <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">Why people love working here.</h2>
            </div>
            <div className="relative aspect-[5/4] overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-200 lg:col-span-5">
              <Image src={IMG.benefitsLearning.src} alt={IMG.benefitsLearning.alt} fill sizes="(max-width: 1024px) 100vw, 420px" className="object-cover" unoptimized />
            </div>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {BENEFITS.map(({ Icon, title, body }) => (
              <div key={title}>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--brand-emerald)]/10 ring-1 ring-[var(--brand-emerald)]/15">
                  <Icon className="h-6 w-6 text-[var(--brand-emerald)]" strokeWidth={1.6} />
                </span>
                <h3 className="mt-5 text-base font-bold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HYBRID ──────────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="relative aspect-[5/4] overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-200 lg:order-1 lg:col-span-5">
              <Image src={IMG.hybridOffice.src} alt={IMG.hybridOffice.alt} fill sizes="(max-width: 1024px) 100vw, 420px" className="object-cover" unoptimized />
            </div>
            <div className="lg:order-2 lg:col-span-7">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--brand-emerald)]">How we work</p>
              <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">Hybrid work is the future.</h2>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {HYBRID.map(({ Icon, title, body }) => (
              <div key={title}>
                <Icon className="h-7 w-7 text-[var(--brand-emerald)]" strokeWidth={1.6} />
                <h3 className="mt-5 text-base font-bold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAMS ───────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--brand-emerald)]">Teams</p>
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">Choose your path with us.</h2>
          <div className="relative mt-10 aspect-[21/9] overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-200">
            <Image src={IMG.teamsBoardroom.src} alt={IMG.teamsBoardroom.alt} fill sizes="(max-width: 1024px) 100vw, 960px" className="object-cover" unoptimized />
          </div>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {TEAMS.map((t) => (
              <div key={t.title} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMUNITY ───────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--brand-emerald)]">Community</p>
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">We care.</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600">
              Our community approach is to engage and support the cities we operate in, including paid community-care days.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-200 lg:col-span-6">
            <Image src={IMG.communityOffice.src} alt={IMG.communityOffice.alt} fill sizes="(max-width: 1024px) 100vw, 480px" className="object-cover" unoptimized />
          </div>
        </div>
      </section>

      {/* ── OPEN POSITIONS ──────────────────────────────────────── */}
      <section id="positions" className="bg-slate-50 py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--brand-emerald)]">Open positions</p>
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">{totalRoles} {totalRoles === 1 ? 'role' : 'roles'} open right now.</h2>

          <div className="mt-10 space-y-10">
            {jobsByRegion.map((region) => (
              <div key={`${region.country}-${region.region}`} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-100 pb-4">
                  <h3 className="flex items-center gap-2 text-xl font-bold text-slate-900">
                    <MapPin className="h-4 w-4 text-[var(--brand-emerald)]" aria-hidden="true" />
                    {region.region}
                  </h3>
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{region.country}</span>
                </div>
                <div className="mt-6 space-y-7">
                  {region.cities.map((city) => (
                    <div key={city.city}>
                      <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-900/65">{city.city}</h4>
                      <ul className="mt-3 space-y-3">
                        {city.roles.map((role) => (
                          <li key={role.slug}>
                            <Link href={`/careers/${role.slug}/`} className="group flex flex-col gap-2 rounded-xl border border-slate-100 bg-slate-50/60 p-4 transition-all hover:-translate-y-0.5 hover:border-[var(--brand-emerald)]/40 hover:bg-white hover:shadow-md md:flex-row md:items-center md:justify-between md:gap-6 md:p-5">
                              <div className="min-w-0 flex-1">
                                <h5 className="text-base font-bold text-slate-900 transition-colors group-hover:text-[var(--brand-emerald)]">{role.title}</h5>
                                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-slate-500">
                                  <span className="inline-flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" />{role.type}</span>
                                  <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{role.locationDisplay}</span>
                                  <span className="font-bold text-[var(--brand-emerald)]">{role.compensation}</span>
                                </div>
                              </div>
                              <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-slate-900 transition-colors group-hover:text-[var(--brand-emerald)]">View role <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
```

---

### 5.3 `src/app/(site)/careers/[slug]/page.tsx` — Role detail

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Briefcase, Calendar, Hash, MapPin } from 'lucide-react'

import { getAllRoleSlugs, getRoleBySlug, type Role } from '@/data/careers'
import { ApplyButton } from '@/components/careers/apply-button'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'

interface RouteParams {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllRoleSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { slug } = await params
  const role = getRoleBySlug(slug)
  if (!role) return { title: 'Role Not Found', robots: { index: false, follow: false } }
  return {
    title: `${role.title}, ${role.locationDisplay} | Careers`,
    description: `${role.title} (${role.type}). ${role.summary.slice(0, 150)}`,
    alternates: { canonical: `/careers/${role.slug}/` },
  }
}

function buildJobPostingSchema(role: Role) {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    '@id': `${SITE_URL}/careers/${role.slug}/#jobposting`,
    title: role.title,
    description: [role.summary, 'Key Responsibilities:', ...role.responsibilities.map((r) => `• ${r}`)].join('\n'),
    identifier: { '@type': 'PropertyValue', name: 'Example', value: role.jobId },
    datePosted: role.postingStartDate,
    employmentType: role.type.toLowerCase() === 'full-time' ? 'FULL_TIME' : 'OTHER',
    hiringOrganization: { '@type': 'Organization', name: 'Example', sameAs: SITE_URL },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: role.city,
        addressRegion: role.province,
        addressCountry: role.country === 'United States' ? 'US' : 'CA',
      },
    },
    url: `${SITE_URL}/careers/${role.slug}/`,
  }
}

function formatDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function CareerRolePage({ params }: RouteParams) {
  const { slug } = await params
  const role = getRoleBySlug(slug)
  if (!role) notFound()

  return (
    <main className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJobPostingSchema(role)) }} />

      {/* ── DARK HERO ────────────────────────────────────────────── */}
      <section className="bg-[var(--brand-navy)] text-white">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
          <Link href="/careers/#positions" className="inline-flex items-center gap-1.5 text-sm font-medium text-white/85 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" /> See All Jobs
          </Link>
          <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-4xl">
              <h1 className="font-serif text-5xl uppercase leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl">{role.title}</h1>
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.22em] text-[var(--brand-emerald)]">{role.department}</p>
              <dl className="mt-8 grid grid-cols-1 gap-2 text-sm sm:grid-cols-[180px_1fr] sm:gap-y-3">
                <MetaRow label="Type">{role.type}</MetaRow>
                <MetaRow label="Location(s)">{role.locationDisplay}</MetaRow>
                <MetaRow label="Job posting start date">{formatDate(role.postingStartDate)}</MetaRow>
                <MetaRow label="Job ID">{role.jobId}</MetaRow>
                <MetaRow label="Compensation">{role.compensation}</MetaRow>
              </dl>
            </div>
            <div className="lg:self-start">
              <div className="flex flex-wrap gap-3 lg:flex-col lg:items-end">
                <ApplyButton role={role.title} jobId={role.jobId} />
                <a
                  href={`mailto:careers@example.com?subject=${encodeURIComponent(`Question — ${role.title}`)}`}
                  className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/60"
                >
                  Ask a question
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BODY ─────────────────────────────────────────────────── */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_280px] lg:px-10">
          <div className="space-y-10">
            <Block title="Job Description Summary">
              <p className="text-base leading-relaxed text-slate-700">{role.summary}</p>
            </Block>
            <Block title="Key Responsibilities">
              <Bulleted items={role.responsibilities} />
            </Block>
            <Block title="Required Skills">
              <Bulleted items={role.requiredSkills} />
            </Block>
            {role.goodToHaveSkills.length > 0 && (
              <Block title="Good to Have Skills">
                <Bulleted items={role.goodToHaveSkills} />
              </Block>
            )}
            <Block title="Education and Experience">
              <Bulleted items={role.educationAndExperience} />
            </Block>
            {role.additionalInfo && (
              <Block title="Additional Information">
                <p className="text-base leading-relaxed text-slate-700">{role.additionalInfo}</p>
                {role.relocationAssistance && (
                  <p className="mt-3 text-sm font-semibold text-emerald-700">Relocation assistance provided.</p>
                )}
              </Block>
            )}
            {/* Bottom apply CTA */}
            <div className="mt-12 flex flex-wrap gap-3 border-t border-slate-100 pt-10">
              <ApplyButton role={role.title} jobId={role.jobId} />
              <Link href="/careers/#positions" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:border-slate-500">
                See all jobs
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">At a glance</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2"><Briefcase className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />{role.type}</li>
                <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />{role.locationDisplay}</li>
                <li className="flex items-start gap-2"><Calendar className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />{formatDate(role.postingStartDate)}</li>
                <li className="flex items-start gap-2"><Hash className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />{role.jobId}</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}

function MetaRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <>
      <dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">{label}</dt>
      <dd className="text-base text-white">{children}</dd>
    </>
  )
}
function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-serif text-2xl text-slate-900 sm:text-3xl">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  )
}
function Bulleted({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3 text-base leading-relaxed text-slate-700">
          <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-emerald-500" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  )
}
```

---

### 5.4 `src/app/(site)/meet-the-team/page.tsx` — Meet the Team

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

import { TeamCard } from '@/components/team/team-card'
import { TEAM } from '@/data/team'

export const metadata: Metadata = {
  title: 'Meet the Team | Our Leadership',
  description: 'The operators, leads, and client-success specialists running the business day-to-day.',
  alternates: { canonical: '/meet-the-team/' },
}

export default function MeetTheTeamPage() {
  return (
    <main>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-[var(--brand-navy)] py-24 text-white md:py-32">
        <Image src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2400&q=80" alt="Team collaborating around a wooden meeting table" fill priority sizes="100vw" className="absolute inset-0 -z-20 object-cover object-center" unoptimized />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-[var(--brand-navy)] via-[var(--brand-navy)]/85 to-[var(--brand-navy)]/55" />
        <div className="relative mx-auto max-w-5xl px-6">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--brand-emerald)]">Our people</p>
          <h1 className="text-balance text-4xl font-bold leading-tight text-white md:text-5xl">The team behind every owner-file.</h1>
          <p className="mt-6 max-w-2xl text-lg text-white/85">
            Operators, leads, and client-success specialists running the work end-to-end so landlords and institutional operators do not have to.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#team" className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-emerald)] px-6 py-3 text-sm font-bold text-white">Meet our leadership <ArrowRight className="h-4 w-4" /></a>
            <a href="#join" className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm">Join the team</a>
          </div>
        </div>
      </section>

      {/* ── INTRO ────────────────────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">How we are built</p>
              <h2 className="mt-3 font-serif text-3xl text-slate-900 sm:text-4xl">A bench of operators, not a roster of brokers.</h2>
            </div>
            <div className="space-y-6 text-base leading-relaxed text-slate-700 lg:col-span-7">
              <p>The market is busy. Brokers are wired to sell. Managers are wired to operate the years after. Almost nobody is purpose-built for the window in between.</p>
              <p>Our team is structured around that window. Every owner-file has a named lead. Every handoff is logged.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM GRID ────────────────────────────────────────────── */}
      <section id="team" className="scroll-mt-24 bg-[#FBFAF6] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Our team</p>
            <h2 className="mt-4 font-serif text-4xl text-slate-900 sm:text-5xl">Meet Our Leadership Team.</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((member) => (
              <TeamCard key={member.slug} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* ── JOIN THE TEAM ────────────────────────────────────────── */}
      <section id="join" className="relative scroll-mt-24 overflow-hidden bg-[var(--brand-navy)] py-16 text-white sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-400">Join the team</p>
              <h2 className="mt-3 font-serif text-3xl text-white sm:text-4xl md:text-5xl">We are hiring across North America.</h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
                We are growing every desk that touches an owner-file. If you take your craft seriously and want to ship work you are proud of, we want to meet you.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/careers/" className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-emerald)] px-6 py-3 text-sm font-bold text-white">View open roles <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
                <a href="mailto:careers@example.com" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white">General application</a>
              </div>
            </div>
            <div className="lg:col-span-5">
              <ul className="space-y-4 rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm">
                {[
                  'Performance-backed comp with clear targets and real upside.',
                  'Educational reimbursement and professional designation fees covered.',
                  'Hybrid schedule with modern collaboration tools.',
                  'Paid community-care days.',
                ].map((p) => (
                  <li key={p} className="flex gap-3"><span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-400" /><span className="text-sm leading-relaxed text-white/85">{p}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
```

---

## 6. Nav config — About dropdown order

Find the file with the top-nav data — usually `src/lib/nav-config.ts` or
`src/data/navigation.ts`. Reorder the **About** group so the items appear:

1. **About Us** → `/about/`
2. **Meet the Team** → `/meet-the-team/` *(new)*
3. **Careers** → `/careers/`
4. **Reviews** → `/reviews/` *(moves to last)*

Example shape (adapt to project's actual schema):

```ts
{
  label: 'About',
  items: [
    { title: 'About Us', href: '/about/', description: 'Who we are' },
    { title: 'Meet the Team', href: '/meet-the-team/', description: 'The operators behind every owner-file' },
    { title: 'Careers', href: '/careers/', description: 'Join the team' },
    { title: 'Reviews', href: '/reviews/', description: 'What clients say' },
  ],
}
```

Mirror the same four entries in the same order in the mobile nav file
(usually `src/components/layout/mobile-nav.tsx`).

---

## 7. Sitemap

Find `src/app/sitemap.ts`. Add **one entry** near `/about/`:

```ts
{
  url: `${siteUrl}/meet-the-team/`,
  lastModified: new Date(),
  changeFrequency: 'monthly' as const,
  priority: 0.55,
},
```

The careers landing and detail routes are likely already in the sitemap;
if not, add the same shape with `priority: 0.6` for `/careers/` and
`0.55` for each `/careers/${slug}/`.

---

## 8. `next.config.ts` — Unsplash image host

The pages reference `images.unsplash.com`. Confirm this is in
`next.config.ts`:

```ts
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'images.unsplash.com' },
  ],
},
```

If it's not there and you cannot edit the config, add `unoptimized` to
each `<Image>` so Next.js bypasses the optimization pipeline. The page
code above already includes `unoptimized` on the relevant images, so this
is a non-blocker.

---

## 9. Verification (do this before reporting done)

```bash
# 1. Type check
npx tsc --noEmit

# 2. Lint (run on every file you created)
npx next lint --file "src/app/(site)/about/page.tsx" \
              --file "src/app/(site)/careers/page.tsx" \
              --file "src/app/(site)/careers/[slug]/page.tsx" \
              --file "src/app/(site)/meet-the-team/page.tsx" \
              --file "src/data/team.ts" \
              --file "src/data/careers.ts" \
              --file "src/components/team/team-avatar.tsx" \
              --file "src/components/team/team-card.tsx" \
              --file "src/components/careers/apply-button.tsx" \
              --file "src/lib/nav-config.ts"

# 3. Visit these URLs:
#    /about/
#    /careers/
#    /careers/senior-leasing-agent-toronto/
#    /meet-the-team/
#
#    Verify:
#    - Hover the "About" menu: About Us → Meet the Team → Careers → Reviews
#    - On the role detail page: click "Apply Now"; the form opens anchored
#      at the top of the viewport; scroll the page — the form stays put,
#      the dimmed page scrolls behind it
```

---

## 10. End-of-turn summary (what to report)

Tell the user exactly:

- Every file you created (with full path)
- Every file you modified (with the line range)
- The order the About dropdown shows now
- Confirmation that TypeScript + ESLint passed cleanly
- The four URLs to test
- The dummy data you inserted (3 team, 4 roles)
- Any TODOs you punted (real photos, real role data, profile detail pages, an actual `/api/careers-apply` endpoint, etc.)

---

## 11. Things NOT to do

- **Do not lock body scroll** on the apply modal — the client explicitly
  wants the page to remain scrollable behind it. The implementation above
  uses `pointer-events-none` on the backdrop and modal frame to make this
  work; do not change that pattern.
- **Do not centre the apply modal vertically.** It must be anchored to the
  top (`top-0` + `pt-20 sm:pt-24`). Do not use `items-center`.
- **Do not skip the `createPortal`** on the apply modal. Without it, parent
  CSS transforms break `position: fixed`. The portal is essential.
- **Do not add internal scroll** (`overflow-y-auto`, `max-h-...`) to the
  modal card. The form must fit on screen at the compact spacing provided.
- **Do not invent phone numbers** for team members. `phone: null` is
  intentional — the team card hides the phone row when null.
- **Do not change the existing About Us, Careers, or Reviews routes** that
  may already exist in the target project. If they exist, the user will
  guide you on whether to overwrite or skip. Ask before overwriting.
- **Do not change brand colours, fonts, or design tokens.** Substitute the
  project's actual brand variables; do not invent new ones.
- **Do not generate profile detail pages** at `/team/<slug>/` unless asked.
- **Do not create CLAUDE.md, README updates, or any extra documentation.**
  Work from conversation context.
- **Do not add `unoptimized` to every `<Image>`.** It's only on hero/team
  photos because the source is Unsplash. Local images should stay
  optimized.

---

End of spec.
