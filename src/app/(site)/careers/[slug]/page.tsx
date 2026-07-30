import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Briefcase, Mail, MapPin } from 'lucide-react'

import { JsonLd } from '@/components/json-ld'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'
import { getAllRoleSlugs, getRoleBySlug, type Role } from '@/data/careers'
import { ApplyButton, StickyApplyButton } from './apply-button'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://revun.com'

interface RouteParams {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllRoleSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata(
  { params }: RouteParams,
): Promise<Metadata> {
  const { slug } = await params
  const role = await getRoleBySlug(slug)
  if (!role) {
    return {
      title: 'Role Not Found | Revun',
      robots: { index: false, follow: false },
    }
  }
  const title = `${role.title}, ${role.locationDisplay} | Revun Careers`
  const description = `${role.title} (${role.type}) at Revun in ${role.locationDisplay}. ${role.summary ? role.summary.slice(0, 150) : role.title}`
  return {
    title,
    description,
    alternates: { canonical: `/careers/${role.slug}/` },
    openGraph: {
      title,
      description,
      images: ['/og-share.png'],
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

function buildJobPostingSchema(role: Role) {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    '@id': `${SITE_URL}/careers/${role.slug}/#jobposting`,
    title: role.title,
    description: role.htmlDescription || [
      role.summary,
      'Key Responsibilities:',
      ...role.responsibilities.map((r) => `• ${r}`),
      'Required Skills:',
      ...role.requiredSkills.map((r) => `• ${r}`),
    ].join('\n'),
    identifier: {
      '@type': 'PropertyValue',
      name: 'Revun',
      value: role.jobId,
    },
    datePosted: role.postingStartDate,
    employmentType:
      role.type.toLowerCase() === 'full-time' ? 'FULL_TIME' : 'OTHER',
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Revun',
      sameAs: SITE_URL,
    },
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

export default async function CareerRolePage({ params }: RouteParams) {
  const { slug } = await params
  const role = await getRoleBySlug(slug)
  if (!role) notFound()

  const shareUrl = `${SITE_URL}/careers/${role.slug}/`
  const shareSubject = `${role.title} at Revun`

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Careers', url: `${SITE_URL}/careers/` },
    { name: role.title, url: shareUrl },
  ])

  const formattedCategories =
    role.categories && role.categories.length > 0
      ? role.categories
          .map((c) =>
            c
              .trim()
              .toLowerCase()
              .replace(/\b\w/g, (char) => char.toUpperCase())
          )
          .join(', ')
      : (role.category || role.department || '')
          .toLowerCase()
          .replace(/\b\w/g, (char) => char.toUpperCase())

  // Format the posting date in a friendlier form for the hero meta line.
  // const postingDateDisplay = formatDate(role.postingStartDate)

  return (
    <main className="bg-white">
      <JsonLd data={buildJobPostingSchema(role)} />
      <JsonLd data={breadcrumbSchema} />

      {/* ── DARK HERO ───────────────────────────────────────────────
          Mirrors the GE Vernova reference: huge title, structured
          meta rows (Type / Location / Posting Date / Job ID), share
          row, and a primary Apply button anchored top-right. */}
      <section className="bg-[#0A1628] text-white">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
          {/* Back link */}
          <Link
            href="/careers/#positions"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/85 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            See All Jobs
          </Link>

          <div className="mt-8 grid grid-cols-1 gap-10 lg:gap-12">
            {/* LEFT: title + meta + share */}
            <div className="min-w-0">
              <h1 className="font-display text-4xl font-bold uppercase leading-[1.05] tracking-wide text-white sm:text-5xl md:text-6xl lg:text-[4.25rem]">
                {role.title}
              </h1>

              {formattedCategories && (
                <p className="mt-3 text-xs sm:text-sm font-medium tracking-wide text-white/80">
                  {formattedCategories}
                </p>
              )}

              <dl className="mt-8 space-y-2 text-sm sm:text-base">
                <MetaRow label="Type">{role.type}</MetaRow>
                <MetaRow label="Location(s)">{role.locationDisplay}</MetaRow>
                {/* <MetaRow label="Job Posting Start Date">
                  {postingDateDisplay}
                </MetaRow> */}
                {/* <MetaRow label="Job ID">{role.jobId}</MetaRow> */}
                {role.compensation && (
                  <MetaRow label="Compensation">{role.compensation} Annually</MetaRow>
                )}
              </dl>

              {/* Share row */}
              <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:gap-12">
                <div>
                  <p className="text-sm font-semibold text-white/80">
                    Share this job:
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <ShareIcon
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                      label="Share on Facebook"
                    >
                      <FacebookIcon />
                    </ShareIcon>
                    <ShareIcon
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                      label="Share on LinkedIn"
                    >
                      <LinkedInIcon />
                    </ShareIcon>
                    <ShareIcon
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareSubject)}`}
                      label="Share on X"
                    >
                      <XIcon />
                    </ShareIcon>
                    <ShareIcon
                      href={`mailto:?subject=${encodeURIComponent(shareSubject)}&body=${encodeURIComponent(shareUrl)}`}
                      label="Share by email"
                    >
                      <Mail className="h-4 w-4" aria-hidden="true" />
                    </ShareIcon>
                  </div>
                </div>

                {/* Apply CTA */}
                <div className="flex flex-wrap gap-3 lg:pb-1">
                  <ApplyButton role={role.title} jobId={role.jobId} locId={role.locId || ''} workType={role.workType} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHITE BODY ────────────────────────────────────────────── */}
      <section className="bg-white pt-14 pb-32 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[14rem_1fr] lg:gap-16">
            {/* Sidebar label */}
            <aside className="lg:pt-2 lg:sticky lg:top-24 lg:self-start">
              <h2 className="font-display text-2xl font-bold text-[#0A1628] sm:text-3xl tracking-wider">
                Job
                <br />
                Description
              </h2>

              {/* Compact meta box for quick scan on long pages */}
              <ul className="mt-8 hidden space-y-3 text-xs text-slate-600 lg:block">
                <li className="flex items-start gap-2">
                  <Briefcase
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#176FEB]"
                    aria-hidden="true"
                  />
                  <span>{role.type}</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#176FEB]"
                    aria-hidden="true"
                  />
                  <span>{role.locationDisplay}</span>
                </li>
                {/* <li className="flex items-start gap-2">
                  <Calendar
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#176FEB]"
                    aria-hidden="true"
                  />
                  <span>{postingDateDisplay}</span>
                </li> */}
                {/* <li className="flex items-start gap-2">
                  <Hash
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#176FEB]"
                    aria-hidden="true"
                  />
                  <span>{role.jobId}</span>
                </li> */}
              </ul>

              <div className="mt-8 hidden lg:block rounded-xl bg-slate-50 p-4 border border-slate-100">
                <h3 className="text-lg font-bold text-[#0A1628] mb-2 tracking-wider">Important Location Requirement:</h3>
                <div className="text-sm text-slate-900 space-y-3 tracking-wider">
                  <p>
                    This is a remote position; however, candidates must be located in the same country, city, or region where the job is posted. The successful candidate must be available to attend a local office, meeting, training session, or company event if requested.
                  </p>
                  <p className="text-sm font-semibold text-slate-900 tracking-wider">
                    Please only apply if you are based in the location listed on this job posting. Remote does not mean the position is open worldwide.
                  </p>
                </div>
              </div>
            </aside>

            {/* Main content */}
            <article className="min-w-0">
              {role.htmlDescription ? (
                <>
                  <style dangerouslySetInnerHTML={{
                    __html: `
                    .job-desc h3,
                    .job-desc > p > strong:only-child,
                    .job-desc > p > b:only-child,
                    .job-desc > div > strong:only-child,
                    .job-desc > div > b:only-child {
                      display: block;
                      font-size: 1.125rem;
                      font-weight: 800;
                      color: #0A1628;
                      margin-top: 2.5rem;
                      margin-bottom: 0.75rem;
                      text-transform: uppercase;
                      letter-spacing: 0.05em;
                      border-bottom: 2px solid #176FEB;
                      padding-bottom: 0.25rem;
                      width: fit-content;
                    }
                    .job-desc h1, .job-desc h2, .job-desc h4 {
                      color: #0A1628;
                      font-weight: 800;
                      margin-top: 2.5rem;
                      margin-bottom: 0.75rem;
                    }
                    .job-desc ul {
                      list-style-type: none !important;
                      padding-left: 0 !important;
                      margin-top: 0.75rem;
                      margin-bottom: 1.5rem;
                    }
                    .job-desc ul > li {
                      position: relative;
                      padding-left: 1.25rem !important;
                      margin-top: 0.5rem;
                      margin-bottom: 0.5rem;
                    }
                    .job-desc ul > li::before {
                      content: "";
                      position: absolute;
                      left: 0;
                      top: 0.65rem;
                      width: 0.375rem;
                      height: 0.375rem;
                      border-radius: 9999px;
                      background-color: #176FEB;
                    }
                    .job-desc > *:first-child {
                      margin-top: 0 !important;
                    }
                  `}} />
                  <div
                    className="job-desc prose prose-slate max-w-none prose-p:leading-[1.8] prose-p:text-[15px] prose-li:text-[15px]"
                    dangerouslySetInnerHTML={{ __html: role.htmlDescription }}
                  />
                </>
              ) : (
                <>
                  {/* Summary */}
                  <Block title="Job Description Summary">
                    <p className="text-[15px] leading-[1.8] text-slate-700">
                      {role.summary}
                    </p>
                  </Block>

                  {/* Responsibilities */}
                  <Block title="Job Description">
                    <h4 className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#0A1628]">
                      Key Responsibilities
                    </h4>
                    <BulletList items={role.responsibilities} />
                  </Block>

                  {/* Required Skills */}
                  <Block title="Required Skills">
                    <BulletList items={role.requiredSkills} />
                  </Block>

                  {/* Good-to-have */}
                  {role.goodToHaveSkills && role.goodToHaveSkills.length > 0 && (
                    <Block title="Good to have Skills">
                      <BulletList items={role.goodToHaveSkills} />
                    </Block>
                  )}

                  {/* Education and Experience */}
                  <Block title="Education and Experience">
                    <BulletList items={role.educationAndExperience} />
                  </Block>

                  {/* Additional Information */}
                  <Block title="Additional Information">
                    {role.additionalInfo && (
                      <p className="text-[15px] leading-[1.8] text-slate-700">
                        {role.additionalInfo}
                      </p>
                    )}
                    <p className="mt-3 text-[15px] leading-[1.8] text-slate-700">
                      <span className="font-bold text-[#0A1628]">
                        Relocation Assistance Provided:
                      </span>{' '}
                      {role.relocationAssistance ? 'Yes' : 'No'}
                    </p>
                  </Block>
                </>
              )}

              <div className="mt-12 flex flex-wrap gap-3 border-t border-slate-100 pt-10">
                <ApplyButton role={role.title} jobId={role.jobId} locId={role.locId || ''} workType={role.workType} />
                <Link
                  href="/careers/#positions"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[#0A1628]/20 bg-white px-6 py-3 text-sm font-bold text-[#0A1628] transition-colors hover:border-[#0A1628]/40 hover:bg-slate-50"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  See all open roles
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Mobile Sticky Apply Button */}
      <StickyApplyButton role={role.title} jobId={role.jobId} locId={role.locId || ''} workType={role.workType} />
    </main>
  )
}

// ─────────────────────────────────────────────────────────────────────
// Sub-components — local because they only render on this page.
// ─────────────────────────────────────────────────────────────────────

function MetaRow({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="grid grid-cols-[10rem_1fr] items-baseline gap-x-4 sm:grid-cols-[12.5rem_1fr]">
      <dt className="text-xs font-bold uppercase tracking-[0.14em] text-white/65">
        {label}
      </dt>
      <dd className="font-semibold text-white">{children}</dd>
    </div>
  )
}

function ShareIcon({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  // Email links can't open in a new tab, the rest can.
  const isMailto = href.startsWith('mailto:')
  return (
    <a
      href={href}
      aria-label={label}
      {...(isMailto
        ? {}
        : { target: '_blank', rel: 'noopener noreferrer' })}
      className="inline-flex size-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-colors hover:border-white/60 hover:bg-white/10"
    >
      {children}
    </a>
  )
}

function Block({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mt-8 first:mt-0">
      <h3 className="font-bold text-[#0A1628]">{title}</h3>
      <div className="mt-3">{children}</div>
    </section>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-2.5 text-[15px] leading-[1.7] text-slate-700"
        >
          <span
            aria-hidden="true"
            className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-[#176FEB]"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/* Brand share-icons — inline SVG so we don't depend on lucide-react
   shipping social-brand icons (this project's version doesn't). */

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073C0 18.062 4.388 23.027 10.125 23.927v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}
