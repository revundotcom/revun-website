import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Banknote,
  Briefcase,
  Globe2,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Laptop2,
  Lightbulb,
  LineChart,
  MapPin,
  Star,
  Users,
} from 'lucide-react'

import { getRolesByRegion, fetchRolesFromApi } from '@/data/careers'
import { buildCanonicalUrl } from '@/lib/utils'

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
  title: 'Careers | Revun',
  description: 'Open roles across Canada and the United States. Leasing, operations, marketing, and trade roles.',
  alternates: { canonical: buildCanonicalUrl('/careers') },
}

const WHY_JOIN = [
  { Icon: LineChart, title: 'Scale your career', body: 'We are expanding. The team you join today will be many times the size in three years.' },
  { Icon: Globe2, title: 'North American markets', body: 'Work across Canada and the US.' },
  { Icon: Users, title: 'Owner-first culture', body: 'We take the work seriously.' },
  { Icon: Star, title: 'Performance-backed comp', body: 'Strong base salaries with real upside.' },
]
const BENEFITS = [
  { Icon: Banknote, title: 'Competitive comp', body: 'Competitive base salaries and performance incentives.' },
  { Icon: HeartHandshake, title: 'Health & wellness', body: 'Health, dental, mental-wellness support, and annual wellness allowance.' },
  { Icon: GraduationCap, title: 'Learning', body: 'Educational reimbursement and professional designation fees covered.' },
]
const HYBRID = [
  { Icon: Handshake, title: 'In-person connection', body: 'When we are together, we build real relationships and move faster.' },
  { Icon: Lightbulb, title: 'Challenge the status quo', body: 'Being together turns good ideas into real products.' },
  { Icon: Laptop2, title: 'Right tech', body: 'Modern collaboration tools across every workstation.' },
]
const COMMUNITY = [
  'Paid community-care days for every employee.',
  'Local housing and shelter partnerships in our markets.',
  'Volunteer time-matching for the causes you care about.',
  'Pro-bono guidance for first-time landlords in the communities we serve.',
]
const TEAMS = [
  { title: 'Business & Support', body: 'Marketing, ops, finance, people, legal, and risk.' },
  { title: 'Client Service & Sales', body: 'The voice of the brand on every interaction.' },
  { title: 'Leasing & Real Estate', body: 'Licensed agents on the ground in our markets.' },
  { title: 'Engineering & Technology', body: 'Software, data, AI, and platform reliability.' },
  { title: 'Trades & Field Services', body: 'Technicians who keep the portfolio in showing-ready condition.' },
  { title: 'Students & Interns', body: 'Internships across ops, marketing, tech, and trades.' },
]

export default async function CareersPage() {
  const jobsByRegion = await getRolesByRegion()
  const allRoles = await fetchRolesFromApi()
  const totalRoles = allRoles.length

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-[#0A1628] py-24 text-white md:py-32">
        <Image src={IMG.heroSkyline.src} alt={IMG.heroSkyline.alt} fill priority sizes="100vw" className="absolute inset-0 -z-20 object-cover object-center" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0A1628] via-[#0A1628]/85 to-[#0A1628]/55" />
        <div className="relative mx-auto max-w-5xl px-6">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--brand-blue)]">Careers</p>
          <h1 className="text-balance text-4xl font-bold leading-tight text-white md:text-5xl">
            Join the team building a better rental market across North America.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/85">
            We connect landlords and tenants across Canada and the United States.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#positions" className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-blue)] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--brand-blue-dark)]">See open positions <ArrowRight className="h-4 w-4" /></a>
            <a href="mailto:careers@revun.com" className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/70 hover:bg-white/10">General application</a>
          </div>
        </div>
      </section>

      {/* ── CULTURE ─────────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--brand-blue)]">Our culture</p>
              <h2 className="text-3xl font-bold text-[#0A1628] md:text-4xl">People are the key to our success.</h2>
              <p className="mt-6 text-base leading-relaxed text-[#555860]">
                We are highly collaborative. You will conquer challenges, push boundaries, and discover what you are truly capable of.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg ring-1 ring-[#E5E7EB]">
              <Image src={IMG.cultureTeam.src} alt={IMG.cultureTeam.alt} fill sizes="(max-width: 1024px) 100vw, 480px" className="object-cover" />
            </div>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_JOIN.map(({ Icon, title, body }) => (
              <div key={title} className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
                <Icon className="mb-3 h-5 w-5 text-[var(--brand-blue)]" strokeWidth={1.5} />
                <h3 className="text-sm font-bold text-[#0A1628]">{title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-[#555860]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ────────────────────────────────────────────── */}
      <section className="bg-[#F5F6F8] py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg ring-1 ring-[#E5E7EB]">
              <Image src={IMG.benefitsLearning.src} alt={IMG.benefitsLearning.alt} fill sizes="(max-width: 1024px) 100vw, 480px" className="object-cover" />
            </div>
            {/* Heading + benefit rows */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B5AD4]">Benefits</p>
              <h2 className="mt-3 text-3xl font-bold text-[#0A1628] md:text-4xl">Why people love working here.</h2>
              <p className="mt-4 text-base leading-relaxed text-[#555860]">
                We invest in the people who do the work — your pay, your health, and your growth, backed by real budget.
              </p>
              <div className="mt-8 space-y-6">
                {BENEFITS.map(({ Icon, title, body }) => (
                  <div key={title} className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#176FEB]/10 ring-1 ring-[#176FEB]/15">
                      <Icon className="h-5 w-5 text-[#176FEB]" strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-[#0A1628]">{title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-[#555860]">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HYBRID ──────────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Heading + rows */}
            <div className="lg:order-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--brand-blue)]">How we work</p>
              <h2 className="mt-3 text-3xl font-bold text-[#0A1628] md:text-4xl">Hybrid work is the future.</h2>
              <p className="mt-4 text-base leading-relaxed text-[#555860]">
                We come together on purpose, then give you the tools to do your best work wherever you are.
              </p>
              <div className="mt-8 space-y-6">
                {HYBRID.map(({ Icon, title, body }) => (
                  <div key={title} className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#176FEB]/10 ring-1 ring-[#176FEB]/15">
                      <Icon className="h-5 w-5 text-[#176FEB]" strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-[#0A1628]">{title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-[#555860]">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg ring-1 ring-[#E5E7EB] lg:order-2">
              <Image src={IMG.hybridOffice.src} alt={IMG.hybridOffice.alt} fill sizes="(max-width: 1024px) 100vw, 480px" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAMS ───────────────────────────────────────────────── */}
      <section className="bg-[#F5F6F8] py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--brand-blue)]">Teams</p>
          <h2 className="text-3xl font-bold text-[#0A1628] md:text-4xl">Choose your path with us.</h2>
          <div className="relative mt-10 aspect-[21/9] overflow-hidden rounded-2xl shadow-lg ring-1 ring-[#E5E7EB]">
            <Image src={IMG.teamsBoardroom.src} alt={IMG.teamsBoardroom.alt} fill sizes="(max-width: 1024px) 100vw, 960px" className="object-cover" />
          </div>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {TEAMS.map((t) => (
              <div key={t.title} className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[#0A1628]">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#555860]">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMUNITY ───────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg ring-1 ring-[#E5E7EB]">
              <Image src={IMG.communityOffice.src} alt={IMG.communityOffice.alt} fill sizes="(max-width: 1024px) 100vw, 480px" className="object-cover" />
            </div>
            {/* Heading + commitments */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--brand-blue)]">Community</p>
              <h2 className="mt-3 text-3xl font-bold text-[#0A1628] md:text-4xl">We care.</h2>
              <p className="mt-4 text-base leading-relaxed text-[#555860]">
                Our community approach is to engage and support the cities we operate in — backed with real time and budget, not just words.
              </p>
              <ul className="mt-6 space-y-3">
                {COMMUNITY.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-[#2C2E33]">
                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-[#176FEB]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── OPEN POSITIONS ──────────────────────────────────────── */}
      <section id="positions" className="bg-[#F5F6F8] py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--brand-blue)]">Open positions</p>
          <h2 className="text-3xl font-bold text-[#0A1628] md:text-4xl">{totalRoles} {totalRoles === 1 ? 'role' : 'roles'} open right now.</h2>

          <div className="mt-10 space-y-10">
            {jobsByRegion.map((region) => (
              <div key={`${region.country}-${region.region}`} className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm md:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[#E5E7EB] pb-4">
                  <h3 className="flex items-center gap-2 text-xl font-bold text-[#0A1628]">
                    <MapPin className="h-4 w-4 text-[var(--brand-blue)]" aria-hidden="true" />
                    {region.region}
                  </h3>
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#555860]">{region.country}</span>
                </div>
                <div className="mt-6 space-y-7">
                  {region.cities.map((city) => (
                    <div key={city.city}>
                      <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0A1628]/65">{city.city}</h4>
                      <ul className="mt-3 space-y-3">
                        {city.roles.map((role) => (
                          <li key={role.slug}>
                            <Link href={`/careers/${role.slug}/`} className="group flex flex-col gap-2 rounded-xl border border-[#E5E7EB] bg-[#F5F6F8]/60 p-4 transition-all hover:-translate-y-0.5 hover:border-[var(--brand-blue)]/40 hover:bg-white hover:shadow-md md:flex-row md:items-center md:justify-between md:gap-6 md:p-5">
                              <div className="min-w-0 flex-1">
                                <h5 className="text-base font-bold text-[#0A1628] transition-colors group-hover:text-[var(--brand-blue)]">{role.title}</h5>
                                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-[#555860]">
                                  <span className="inline-flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" />{role.type}</span>
                                  <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{role.locationDisplay}</span>
                                  <span className="font-bold text-[var(--brand-blue)]">{role.compensation}</span>
                                </div>
                              </div>
                              <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-[#0A1628] transition-colors group-hover:text-[var(--brand-blue)]">View role <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
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
