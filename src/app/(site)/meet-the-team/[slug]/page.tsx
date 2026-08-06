import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, Languages as LanguagesIcon, Mail, MapPin } from 'lucide-react'

import { TeamAvatar } from '@/components/team/team-avatar'
import { ProfileToc, type TocSection } from '@/components/team/profile-toc'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { getAllTeamSlugs, getTeamMemberBySlug, type TeamMember } from '@/data/team'
import { SITE_URL } from '@/lib/metadata'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'

interface RouteParams {
  params: Promise<{ slug: string }>
}

const SECTIONS: TocSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'related-services', label: 'Related Services' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Career & Education' },
]

export async function generateStaticParams() {
  return getAllTeamSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { slug } = await params
  const member = getTeamMemberBySlug(slug)
  if (!member) return { title: 'Profile Not Found | Revun', robots: { index: false, follow: false } }
  return {
    title: `${member.name} — ${member.role} | Revun`,
    description: member.shortBio,
    alternates: { canonical: buildCanonicalUrl(`/meet-the-team/${member.slug}`) },
    openGraph: {
      title: `${member.name} — ${member.role}`,
      description: member.shortBio,
      url: buildCanonicalUrl(`/meet-the-team/${member.slug}`),
    },
  }
}

function buildPersonSchema(member: TeamMember): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/meet-the-team/${member.slug}/#person`,
    name: member.name,
    jobTitle: member.role,
    email: `mailto:${member.email}`,
    knowsLanguage: member.languages,
    url: `${SITE_URL}/meet-the-team/${member.slug}/`,
    worksFor: { '@type': 'Organization', name: 'Revun', url: SITE_URL },
    workLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: member.office,
        addressRegion: member.province,
        addressCountry: member.country === 'United States' ? 'US' : 'CA',
      },
    },
  }
}

export default async function TeamMemberPage({ params }: RouteParams) {
  const { slug } = await params
  const member = getTeamMemberBySlug(slug)
  if (!member) notFound()

  const firstName = member.name.split(/\s+/)[0]

  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(buildPersonSchema(member)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Meet the Team', url: 'https://revun.com/meet-the-team/' },
              { name: member.name, url: `https://revun.com/meet-the-team/${member.slug}/` },
            ]),
          ),
        }}
      />

      {/* ── PROFILE HEADER ───────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-[#F5F6F8]">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-dot-grid opacity-40" />
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Meet the Team', href: '/meet-the-team/' },
            { name: member.name },
          ]}
        />
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-8 md:px-6 md:pb-20 md:pt-10 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[300px_1fr] md:gap-12 lg:items-start">
            {/* Portrait */}
            <div className="relative w-full max-w-[300px] overflow-hidden rounded-2xl shadow-card-hover ring-1 ring-[#E5E7EB]">
              <TeamAvatar member={member} size="hero" />
            </div>

            {/* Identity */}
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0B5AD4]">
                {member.role}
              </p>
              <h1 className="mt-2 font-display text-4xl leading-tight text-[#0A1628] sm:text-5xl md:text-6xl">
                {member.name}
              </h1>
              <p className="mt-5 max-w-2xl border-l-2 border-[#176FEB] pl-4 font-display text-xl italic leading-relaxed text-[#2C2E33] sm:text-2xl">
                “{member.quote}”
              </p>

              <dl className="mt-8 max-w-xl divide-y divide-[#E5E7EB] border-y border-[#E5E7EB]">
                <MetaRow icon={<MapPin className="size-4 text-[#176FEB]" aria-hidden="true" />} label="Jurisdiction">
                  {member.jurisdiction}
                </MetaRow>
                <MetaRow icon={<LanguagesIcon className="size-4 text-[#176FEB]" aria-hidden="true" />} label="Language(s)">
                  {member.languages.join(' · ')}
                </MetaRow>
                <MetaRow icon={<Mail className="size-4 text-[#176FEB]" aria-hidden="true" />} label="Contact">
                  <a href={`mailto:${member.email}`} className="text-[#176FEB] underline-offset-2 hover:underline">
                    {member.email}
                  </a>
                </MetaRow>
              </dl>

              <div className="mt-8">
                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#176FEB] px-6 py-3 text-sm font-bold text-white shadow-cta-glow transition-colors hover:bg-[#0B5AD4]"
                >
                  <Mail className="size-4" aria-hidden="true" />
                  Email {firstName}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BODY ─────────────────────────────────────────────────── */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 py-14 md:px-6 md:py-20 lg:grid-cols-[1fr_240px] lg:px-8">
        <div className="min-w-0 space-y-14">
          <Section id="overview" title="Overview">
            <div className="space-y-4 text-base leading-relaxed text-[#555860]">
              {member.overview.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Section>

          <Section id="related-services" title="Related Services">
            <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              {member.relatedServices.map((s) => (
                <li key={s} className="flex items-start gap-3 text-[15px] leading-relaxed text-[#2C2E33]">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-[#176FEB]" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="achievements" title="Achievements">
            <ul className="space-y-3">
              {member.achievements.map((a) => (
                <li key={a} className="flex items-start gap-3 text-base leading-relaxed text-[#555860]">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-[#176FEB]" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="experience" title="Experience">
            <ol className="relative space-y-6 border-l border-[#E5E7EB] pl-6">
              {member.experience.map((x, i) => (
                <li key={`${x.role}-${i}`} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[1.6rem] top-1.5 size-2.5 rounded-full border-2 border-white bg-[#176FEB] shadow-sm"
                  />
                  <p className="font-semibold text-[#0A1628]">{x.role}</p>
                  <p className="text-sm text-[#555860]">
                    {x.org} <span className="text-[#D3D5DB]">·</span> {x.period}
                  </p>
                </li>
              ))}
            </ol>
          </Section>

          <Section id="education" title="Career & Education">
            <ul className="space-y-3">
              {member.education.map((e) => (
                <li key={e} className="flex items-start gap-3 text-base leading-relaxed text-[#555860]">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-[#176FEB]" />
                  <span>{e}</span>
                </li>
              ))}
            </ul>
          </Section>

          <div className="flex flex-wrap gap-3 border-t border-[#E5E7EB] pt-10">
            <Link
              href="/meet-the-team/"
              className="inline-flex items-center gap-2 rounded-full border border-[#D3D5DB] bg-white px-6 py-3 text-sm font-semibold text-[#0A1628] transition-colors hover:border-[#555860]"
            >
              <ArrowLeft className="size-4" aria-hidden="true" /> Back to the team
            </Link>
            <Link
              href="/careers/"
              className="inline-flex items-center gap-2 rounded-full bg-[#176FEB] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0B5AD4]"
            >
              See open roles <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Sticky TOC */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <ProfileToc sections={SECTIONS} />
          </div>
        </aside>
      </div>
    </main>
  )
}

function MetaRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="grid grid-cols-[110px_1fr] items-center gap-4 py-3 sm:grid-cols-[140px_1fr]">
      <dt className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#555860]">
        {icon}
        {label}
      </dt>
      <dd className="text-sm text-[#2C2E33]">{children}</dd>
    </div>
  )
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="font-display text-2xl text-[#0A1628] sm:text-3xl">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  )
}
