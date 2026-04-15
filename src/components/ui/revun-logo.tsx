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
   * - 'light' (default) → dark-navy wordmark for white/off-white backgrounds
   * - 'dark' → blue wordmark for dark backgrounds
   */
  variant?: 'light' | 'dark'
  className?: string
}

const LOGO_SRC = {
  light: '/revun-logo-on-light.png',
  dark: '/revun-logo-on-dark.png',
} as const

export function RevunLogo({
  size = 'h-8',
  linked = true,
  variant = 'light',
  className,
}: RevunLogoProps) {
  const logo = (
    <Image
      src={LOGO_SRC[variant]}
      alt="Revun"
      width={140}
      height={44}
      priority
      className={cn('w-auto', size, className)}
    />
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
