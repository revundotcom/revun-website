import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

/** Visible breadcrumb trail. JSON-LD BreadcrumbList is emitted separately by each page. */
export function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl px-4 pt-4 md:px-6 lg:px-8">
      <ol className="flex flex-wrap items-center gap-1 text-xs text-[#64748B]">
        {items.map((it, i) => (
          <li key={`${it.name}-${i}`} className="flex items-center gap-1">
            {it.href ? (
              <Link href={it.href} className="transition-colors hover:text-brand-blue">{it.name}</Link>
            ) : (
              <span className="text-[#94A3B8]">{it.name}</span>
            )}
            {i < items.length - 1 && <ChevronRight className="h-3.5 w-3.5 text-[#CBD5E1]" />}
          </li>
        ))}
      </ol>
    </nav>
  )
}
