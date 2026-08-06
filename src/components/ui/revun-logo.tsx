import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

interface RevunLogoProps {
  /** Height class - e.g. "h-8", "h-9", "h-7" */
  size?: string
  /** Wrap in a Link to "/" */
  linked?: boolean
  /**
   * Background context the logo is being placed on.
   * Both variants now render the blue Revun wordmark per brand direction.
   * The prop is kept for API compatibility with existing callsites.
   */
  variant?: 'light' | 'dark'
  /**
   * Drop the wordmark below `xl` and show the mark alone. The header needs this:
   * between lg and xl the full nav + CTAs only have ~960px, and the lockup
   * pushes "Features" into the logo.
   */
  compact?: boolean
  className?: string
}

// Brand direction: use the blue Revun wordmark everywhere.
// The file revun-logo-on-dark.png contains the blue wordmark on transparent
// background and reads cleanly on both light and dark surfaces.
const LOGO_SRC = {
  light: '/revun-logo-on-dark.png',
  dark: '/revun-logo-on-dark.png',
} as const

export function RevunLogo({
  size = 'h-8',
  linked = true,
  variant = 'light',
  compact = false,
  className,
}: RevunLogoProps) {
  // Lockup: square R mark (same mark as the favicon) + Revun wordmark.
  // The mark carries brand recognition at small sizes where the wordmark
  // becomes unreadable (mobile nav, browser tab, app icon).
  const logo = (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <Image
        src="/revun-mark.png"
        alt=""
        width={512}
        height={512}
        priority
        aria-hidden="true"
        className={cn('aspect-square w-auto rounded-[22%]', size)}
      />
      <Image
        src={LOGO_SRC[variant]}
        alt="Revun"
        width={140}
        height={44}
        priority
        className={cn('w-auto', size, compact && 'hidden xl:block')}
      />
      {/* Below xl the wordmark is display:none, which strips it from the a11y
          tree. This carries the name in that range only, so it is never doubled. */}
      {compact && <span className="sr-only xl:hidden">Revun</span>}
    </span>
  )

  if (!linked) return logo

  return (
    <Link
      href="/"
      className="inline-flex items-center outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
    >
      {logo}
    </Link>
  )
}
