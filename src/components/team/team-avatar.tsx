import Image from 'next/image'

import { getInitials, getMemberAccent, type TeamMember } from '@/data/team'

interface Props {
  member: Pick<TeamMember, 'name' | 'slug' | 'photoUrl' | 'photoAlt'>
  size?: 'card' | 'hero'
  className?: string
}

const sizeMap = { card: 'aspect-[4/5]', hero: 'aspect-[3/4]' } as const
const monogramSizeMap = { card: 'text-[3.5rem]', hero: 'text-[7rem]' } as const

/** Revun blue palette — no off-brand gold/emerald. */
const accentMap = {
  sky: 'bg-gradient-to-br from-[#4A91F0] to-[#176FEB] text-white',
  blue: 'bg-gradient-to-br from-[#176FEB] to-[#0B5AD4] text-white',
  navy: 'bg-gradient-to-br from-[#0F2040] to-[#0A1628] text-white',
} as const

export function TeamAvatar({ member, size = 'card', className = '' }: Props) {
  const containerClass = `relative w-full overflow-hidden bg-[#F5F6F8] ${sizeMap[size]} ${className}`

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
        <span className={`font-display leading-none ${monogramSizeMap[size]}`}>
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
