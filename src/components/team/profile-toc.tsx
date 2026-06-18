'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export interface TocSection {
  id: string
  label: string
}

/** Sticky in-page navigation with scroll-spy highlighting. Smooth scroll is
 *  done via JS (globals.css intentionally disables CSS scroll-behavior on
 *  Windows). Sections must carry `scroll-mt-*` to clear the fixed header. */
export function ProfileToc({ sections }: { sections: TocSection[] }) {
  const [active, setActive] = useState<string>(sections[0]?.id ?? '')

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null)
    if (els.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length === 0) return
        const topMost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
        )
        setActive(topMost.target.id)
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sections])

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
      setActive(id)
    }
  }

  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#555860]">
        On this page
      </p>
      <ul className="space-y-0.5">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              onClick={(e) => handleClick(e, s.id)}
              aria-current={active === s.id ? 'true' : undefined}
              className={cn(
                'block border-l-2 py-1.5 pl-3 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#176FEB]',
                active === s.id
                  ? 'border-[#176FEB] font-semibold text-[#176FEB]'
                  : 'border-[#E5E7EB] text-[#555860] hover:border-[#94A3B8] hover:text-[#0A1628]',
              )}
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
