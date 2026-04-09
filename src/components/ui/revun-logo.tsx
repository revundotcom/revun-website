import { cn } from '@/lib/utils'
import Link from 'next/link'

interface RevunLogoProps {
  /** Height class — e.g. "h-8", "h-9", "h-7" */
  size?: string
  /** Wrap in a Link to "/" */
  linked?: boolean
  className?: string
}

/**
 * Revun brand logo — Instrument Sans Bold, white text on brand-blue bg.
 * Renders as real text so the font stays pixel-perfect everywhere.
 */
export function RevunLogo({ size = 'h-8', linked = true, className }: RevunLogoProps) {
  const logo = (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-lg bg-brand-blue px-3 py-1 font-heading font-bold text-white select-none tracking-tight',
        size,
        className,
      )}
    >
      Revun
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
