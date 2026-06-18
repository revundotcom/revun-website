import Link from 'next/link'
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react'

import { TeamAvatar } from './team-avatar'
import type { TeamMember } from '@/data/team'

interface Props {
  member: TeamMember
}

export function TeamCard({ member }: Props) {
  const profileHref = `/meet-the-team/${member.slug}/`

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#176FEB]/30 hover:shadow-card-hover">
      <Link
        href={profileHref}
        aria-label={`View ${member.name}’s profile`}
        className="relative block overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-[#176FEB] focus-visible:ring-offset-2"
      >
        <TeamAvatar
          member={member}
          size="card"
          className="transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        <span className="pointer-events-none absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#2C2E33] shadow-sm backdrop-blur-sm">
          <MapPin className="size-3" aria-hidden="true" />
          {member.office}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl text-[#0A1628]">
          <Link
            href={profileHref}
            className="rounded-sm outline-none transition-colors hover:text-[#176FEB] focus-visible:ring-2 focus-visible:ring-[#176FEB] focus-visible:ring-offset-2"
          >
            {member.name}
          </Link>
        </h3>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[#176FEB]">
          {member.role}{' '}
          <span className="text-[#D3D5DB]">|</span>{' '}
          <span className="text-[#555860]">{member.department}</span>
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[#555860]">
          {member.shortBio}
        </p>

        <div className="mt-auto pt-5">
          <div aria-hidden="true" className="h-px w-full bg-gradient-to-r from-[#E5E7EB] via-[#E5E7EB] to-transparent" />
          <div className="mt-4 space-y-1.5">
            {member.phone && (
              <a
                href={`tel:${member.phone.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 text-sm text-[#2C2E33] transition-colors hover:text-[#176FEB]"
              >
                <Phone className="size-3.5 text-[#176FEB]" strokeWidth={2.25} aria-hidden="true" />
                {member.phone}
              </a>
            )}
            <a
              href={`mailto:${member.email}`}
              className="block text-sm text-[#176FEB] underline-offset-2 hover:underline"
            >
              <span className="inline-flex max-w-full items-center gap-2 align-middle">
                <Mail className="size-3.5 shrink-0 text-[#176FEB]" strokeWidth={2.25} aria-hidden="true" />
                <span className="truncate">{member.email}</span>
              </span>
            </a>
          </div>

          <Link
            href={profileHref}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0A1628] transition-colors hover:text-[#176FEB]"
          >
            View profile
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  )
}
