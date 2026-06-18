import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Briefcase, Calendar, Hash, MapPin } from 'lucide-react'

import { getAllRoleSlugs, getRoleBySlug, type Role } from '@/data/careers'
import { ApplyButton } from '@/components/careers/apply-button'
import { SITE_URL } from '@/lib/metadata'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'

interface RouteParams {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllRoleSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { slug } = await params
  const role = getRoleBySlug(slug)
  if (!role) return { title: 'Role Not Found | Revun', robots: { index: false, follow: false } }
  return {
    title: `${role.title} — ${role.city} | Revun`,
    description: `${role.title} (${role.type}). ${role.summary.slice(0, 150)}`,
    alternates: { canonical: buildCanonicalUrl(`/careers/${role.slug}`) },
  }
}

function buildJobPostingSchema(role: Role): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    '@id': `${SITE_URL}/careers/${role.slug}/#jobposting`,
    title: role.title,
    description: [role.summary, 'Key Responsibilities:', ...role.responsibilities.map((r) => `• ${r}`)].join('\n'),
    identifier: { '@type': 'PropertyValue', name: 'Revun', value: role.jobId },
    datePosted: role.postingStartDate,
    employmentType: role.type.toLowerCase() === 'full-time' ? 'FULL_TIME' : 'OTHER',
    hiringOrganization: { '@type': 'Organization', name: 'Revun', url: SITE_URL },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(buildJobPostingSchema(role)) }} />

      {/* ── DARK HERO ────────────────────────────────────────────── */}
      <section className="bg-[#0A1628] text-white">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
          <Link href="/careers/#positions" className="inline-flex items-center gap-1.5 text-sm font-medium text-white/85 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" /> See All Jobs
          </Link>
          <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-4xl">
              <h1 className="font-display text-5xl uppercase leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl">{role.title}</h1>
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.22em] text-[var(--brand-blue)]">{role.department}</p>
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
                  href={`mailto:careers@revun.com?subject=${encodeURIComponent(`Question — ${role.title}`)}`}
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
              <p className="text-base leading-relaxed text-[#555860]">{role.summary}</p>
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
                <p className="text-base leading-relaxed text-[#555860]">{role.additionalInfo}</p>
                {role.relocationAssistance && (
                  <p className="mt-3 text-sm font-semibold text-[#176FEB]">Relocation assistance provided.</p>
                )}
              </Block>
            )}
            {/* Bottom apply CTA */}
            <div className="mt-12 flex flex-wrap gap-3 border-t border-[#E5E7EB] pt-10">
              <ApplyButton role={role.title} jobId={role.jobId} />
              <Link href="/careers/#positions" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#D3D5DB] bg-white px-6 py-3 text-sm font-semibold text-[#0A1628] transition-colors hover:border-[#555860]">
                See all jobs
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-[#E5E7EB] bg-[#F5F6F8] p-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#555860]">At a glance</p>
              <ul className="mt-4 space-y-3 text-sm text-[#2C2E33]">
                <li className="flex items-start gap-2"><Briefcase className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-blue)]" />{role.type}</li>
                <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-blue)]" />{role.locationDisplay}</li>
                <li className="flex items-start gap-2"><Calendar className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-blue)]" />{formatDate(role.postingStartDate)}</li>
                <li className="flex items-start gap-2"><Hash className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-blue)]" />{role.jobId}</li>
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
      <h2 className="font-display text-2xl text-[#0A1628] sm:text-3xl">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  )
}
function Bulleted({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3 text-base leading-relaxed text-[#555860]">
          <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--brand-blue)]" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  )
}
