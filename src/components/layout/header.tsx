'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { MobileMenu } from './mobile-menu'
import { RevunLogo } from '@/components/ui/revun-logo'
import { iconMap } from '@/lib/icon-map'
import { dropdownVariants, itemVariants } from '@/lib/motion'

// ─── Types ───────────────────────────────────────────────────────────────────

interface NavChild {
  label: string
  description: string
  href: string
  icon?: string
}

interface NavItem {
  label: string
  href?: string
  children?: NavChild[]
}

// ─── Navigation data ─────────────────────────────────────────────────────────

const SOLUTIONS_ITEMS: NavChild[] = [
  {
    label: 'Self-Managing Owners',
    description: 'Manage your property from one app',
    href: '/solutions/self-managing-owners/',
    icon: 'Home',
  },
  {
    label: 'Property Management Companies',
    description: 'Replace fragmented systems',
    href: '/solutions/property-management-companies/',
    icon: 'Building2',
  },
  {
    label: 'Brokerages & Agents',
    description: 'Run deals, docs, and communication',
    href: '/solutions/brokerages/',
    icon: 'Handshake',
  },
  {
    label: 'Leasing Companies',
    description: 'Automate leasing operations',
    href: '/solutions/leasing-companies/',
    icon: 'FileText',
  },
  {
    label: 'Maintenance Companies',
    description: 'Dispatch, proof of work, invoicing',
    href: '/solutions/maintenance-companies/',
    icon: 'Wrench',
  },
  {
    label: 'REITs & Asset Managers',
    description: 'Scale with consistency',
    href: '/solutions/reits/',
    icon: 'TrendingUp',
  },
]

const PLATFORM_ITEMS: NavChild[] = [
  { label: 'Platform Overview', description: 'The full operating system', href: '/platform/', icon: 'Layers' },
  { label: 'Features', description: 'Six core modules', href: '/features/', icon: 'Sparkles' },
  { label: 'Events & Tours', description: 'Schedule and manage tours', href: '/events/', icon: 'Calendar' },
  { label: 'Wallet', description: 'Payments and financials', href: '/wallet/', icon: 'Wallet' },
  { label: 'Integrations', description: '40+ connected tools', href: '/integrations/', icon: 'Plug' },
  { label: 'Coverage', description: 'Canada & US availability', href: '/coverage/', icon: 'MapPin' },
]

const RESOURCES_ITEMS: NavChild[] = [
  { label: 'Help Center', description: 'Guides and documentation', href: '/help/' },
  { label: 'About', description: 'Our story and mission', href: '/about/' },
  { label: 'Compare', description: 'See how Revun stacks up', href: '/compare/' },
  { label: 'Contact', description: 'Get in touch with our team', href: '/contact/' },
]

export const NAV_ITEMS: NavItem[] = [
  { label: 'Platform', children: PLATFORM_ITEMS },
  { label: 'Solutions', children: SOLUTIONS_ITEMS },
  { label: 'Investment', href: '/investment/' },
  { label: 'Pricing', href: '/pricing/' },
  { label: 'Demo', href: '/demo/' },
  { label: 'Resources', children: RESOURCES_ITEMS },
]

// ─── Reusable dropdown item with icon ───────────────────────────────────────

function DropdownItem({ item, onClose }: { item: NavChild; onClose: () => void }) {
  const Icon = item.icon ? iconMap[item.icon] : null
  return (
    <motion.div variants={itemVariants}>
      <Link
        href={item.href}
        className="group/card flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-brand-off-white"
        role="menuitem"
        onClick={onClose}
      >
        {Icon && (
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-blue/8 text-brand-blue transition-colors group-hover/card:bg-brand-blue/12">
            <Icon className="h-5 w-5" />
          </span>
        )}
        <div className="min-w-0">
          <p className="text-sm font-heading font-semibold text-brand-graphite group-hover/card:text-brand-blue transition-colors">
            {item.label}
          </p>
          <p className="mt-0.5 text-xs text-brand-graphite-mid leading-relaxed">
            {item.description}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}

// ─── Reusable simple dropdown item (no icon) ────────────────────────────────

function SimpleDropdownItem({ item, onClose }: { item: NavChild; onClose: () => void }) {
  return (
    <motion.div variants={itemVariants}>
      <Link
        href={item.href}
        className="flex flex-col rounded-lg px-3 py-2.5 transition-colors hover:bg-brand-off-white"
        role="menuitem"
        onClick={onClose}
      >
        <span className="text-sm font-heading font-semibold text-brand-graphite">
          {item.label}
        </span>
        <span className="text-xs text-brand-graphite-mid">{item.description}</span>
      </Link>
    </motion.div>
  )
}

// ─── Mega menu: Solutions ────────────────────────────────────────────────────

function SolutionsMegaMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      variants={dropdownVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute left-1/2 top-full mt-2 w-[680px] -translate-x-1/2 rounded-xl border border-border bg-white p-5"
      role="menu"
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
    >
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-heading font-semibold uppercase tracking-wider text-[#94A3B8]">
          By audience
        </p>
        <Link
          href="/solutions/"
          className="text-xs font-medium text-brand-blue hover:underline"
          onClick={onClose}
        >
          View all solutions
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-1">
        {SOLUTIONS_ITEMS.map((item) => (
          <DropdownItem key={item.href} item={item} onClose={onClose} />
        ))}
      </div>
    </motion.div>
  )
}

// ─── Dropdown: Platform ──────────────────────────────────────────────────────

function PlatformDropdown({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      variants={dropdownVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute left-1/2 top-full mt-2 w-[360px] -translate-x-1/2 rounded-xl border border-border bg-white p-4"
      role="menu"
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
    >
      <div className="space-y-1">
        {PLATFORM_ITEMS.map((item) => (
          <DropdownItem key={item.href} item={item} onClose={onClose} />
        ))}
      </div>
    </motion.div>
  )
}

// ─── Dropdown: Resources ─────────────────────────────────────────────────────

function ResourcesDropdown({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      variants={dropdownVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute left-1/2 top-full mt-2 w-[280px] -translate-x-1/2 rounded-xl border border-border bg-white p-2"
      role="menu"
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
    >
      {RESOURCES_ITEMS.map((item) => (
        <SimpleDropdownItem key={item.href} item={item} onClose={onClose} />
      ))}
    </motion.div>
  )
}

// ─── Desktop nav item ────────────────────────────────────────────────────────

function DesktopNavItem({
  item,
  scrolled,
  openDropdown,
  setOpenDropdown,
}: {
  item: NavItem
  scrolled: boolean
  openDropdown: string | null
  setOpenDropdown: (label: string | null) => void
}) {
  const pathname = usePathname()
  const isOpen = openDropdown === item.label
  const hasChildren = !!item.children
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const isActive = item.href
    ? pathname === item.href || pathname.startsWith(item.href)
    : item.children?.some((c) => pathname.startsWith(c.href))

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    if (hasChildren) setOpenDropdown(item.label)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 150)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpenDropdown(null)
    }
    if (hasChildren && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      setOpenDropdown(isOpen ? null : item.label)
    }
  }

  const textColor = isActive
    ? 'text-brand-blue'
    : 'text-[#334155] hover:text-brand-graphite'

  if (hasChildren) {
    return (
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          type="button"
          className={cn(
            'inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            textColor
          )}
          aria-expanded={isOpen}
          aria-haspopup="true"
          onKeyDown={handleKeyDown}
        >
          {item.label}
          <ChevronDown
            className={cn(
              'h-3.5 w-3.5 transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
          />
        </button>
        <AnimatePresence>
          {isOpen && (
            item.label === 'Solutions' ? (
              <SolutionsMegaMenu onClose={() => setOpenDropdown(null)} />
            ) : item.label === 'Platform' ? (
              <PlatformDropdown onClose={() => setOpenDropdown(null)} />
            ) : (
              <ResourcesDropdown onClose={() => setOpenDropdown(null)} />
            )
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <Link
      href={item.href!}
      className={cn(
        'rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        textColor
      )}
    >
      {item.label}
    </Link>
  )
}

// ─── CTA cluster ─────────────────────────────────────────────────────────────

function CTACluster() {
  return (
    <div className="hidden items-center gap-2 lg:flex">
      <Link
        href="/login/"
        className="rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring text-brand-graphite-mid hover:text-brand-graphite hover:bg-brand-off-white"
      >
        Log In
      </Link>
      <Link
        href="/signup/"
        className="rounded-lg bg-brand-blue px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-blue-dark outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Get Started
      </Link>
    </div>
  )
}

// ─── Header (main export) ────────────────────────────────────────────────────

const DARK_HERO_PAGES = [
  '/ca/',
  '/us/',
  '/resources/',
  '/solutions/',
  '/compare/',
  '/integrations/',
  '/industries/',
  '/download/',
  '/how-revun-works/',
  '/what-is-revun/',
  '/furnished-rentals/',
  '/relocation-rentals/',
  '/corporate-housing/',
  '/traveling-tenants/',
  '/use-cases/',
  '/powered-by-revun/',
]

const DARK_HERO_PREFIXES = [
  '/solutions/',
  '/compare/',
  '/integrations/',
  '/ca/',
  '/us/',
  '/support/',
  '/use-cases/',
]

function hasDarkHero(pathname: string): boolean {
  if (DARK_HERO_PAGES.includes(pathname)) return true
  return DARK_HERO_PREFIXES.some((prefix) => pathname.startsWith(prefix))
}

export function Header() {
  const pathname = usePathname()
  const forceDarkText = !hasDarkHero(pathname)
  const [scrolled, setScrolled] = useState(forceDarkText)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  useEffect(() => {
    if (forceDarkText) {
      setScrolled(true)
      return
    }
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [forceDarkText])

  const handleGlobalKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setOpenDropdown(null)
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleGlobalKeyDown)
    return () => document.removeEventListener('keydown', handleGlobalKeyDown)
  }, [handleGlobalKeyDown])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300',
        scrolled
          ? 'border-b border-border bg-white/95 backdrop-blur-sm'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <RevunLogo size="h-8" />

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <DesktopNavItem
              key={item.label}
              item={item}
              scrolled={scrolled}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
            />
          ))}
        </nav>

        <CTACluster />
        <MobileMenu scrolled={scrolled} />
      </div>
    </header>
  )
}
