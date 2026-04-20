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

interface NavSection {
  title: string
  items: NavChild[]
}

interface NavItem {
  label: string
  href?: string
  children?: NavChild[]
  sections?: NavSection[]
}

// ─── Navigation data ─────────────────────────────────────────────────────────

const FEATURES_SECTIONS: NavSection[] = [
  {
    title: 'Listings & Screening',
    items: [
      { label: 'Communications', description: 'Unified inbox for owners, tenants, and vendors', href: '/features/communications/', icon: 'MessageSquare' },
      { label: 'Leasing', description: 'Applications, showings, and renewals', href: '/features/leasing/', icon: 'FileText' },
      { label: 'Tenant Screening', description: 'Credit, identity, and risk reports', href: '/features/tenant-screening/', icon: 'ShieldCheck' },
    ],
  },
  {
    title: 'Tenant Operations',
    items: [
      { label: 'Tenant Portal', description: 'Self-service access for renters', href: '/features/tenant-portal/', icon: 'KeyRound' },
      { label: 'Roommate Matching', description: 'Find compatible co-tenants fast', href: '/features/roommates/', icon: 'Users' },
      { label: 'Maintenance', description: 'Requests, dispatch, and proof-of-work', href: '/features/maintenance/', icon: 'Wrench' },
    ],
  },
  {
    title: 'Leases & Documents',
    items: [
      { label: 'Lease Management', description: 'Full contract lifecycle tracking', href: '/features/lease-management/', icon: 'FileText' },
      { label: 'Document Vault', description: 'Encrypted storage with role access', href: '/features/document-vault/', icon: 'Lock' },
      { label: 'Compliance', description: 'Provincial rules enforced automatically', href: '/features/compliance/', icon: 'ShieldCheck' },
    ],
  },
  {
    title: 'Payments & Accounting',
    items: [
      { label: 'Rent Collection', description: 'Automated recurring rent payments', href: '/features/rent-collection/', icon: 'Wallet' },
      { label: 'Accounting', description: 'Property books with zero spreadsheets', href: '/features/accounting/', icon: 'BarChart3' },
      { label: 'Wallet', description: 'Payments and cash flow command center', href: '/wallet/', icon: 'CreditCard' },
    ],
  },
  {
    title: 'Platform & Access',
    items: [
      { label: 'AI & Automation', description: 'Smart workflows across the platform', href: '/features/ai-automation/', icon: 'Bot' },
      { label: 'Dashboards', description: 'Real-time operational insights', href: '/features/dashboards/', icon: 'LayoutDashboard' },
      { label: 'Owner Portal', description: 'Financial transparency for investors', href: '/features/owner-portal/', icon: 'UserCircle' },
    ],
  },
]


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
  {
    label: 'Tenants',
    description: 'Pay rent, submit requests, and more',
    href: '/solutions/tenants/',
    icon: 'KeyRound',
  },
  {
    label: 'Internal Ops Teams',
    description: 'Centralize operations across teams',
    href: '/solutions/internal-ops-teams/',
    icon: 'Briefcase',
  },
]

const RESOURCES_ITEMS: NavChild[] = [
  { label: 'Help Center', description: 'Guides and documentation', href: '/help/' },
  { label: 'Resources', description: 'Articles, guides, and insights', href: '/resources/' },
  { label: 'How It Works', description: 'See the platform in action', href: '/how-revun-works/' },
  { label: 'Why Revun', description: 'What makes Revun different', href: '/why-revun/' },
]

export const NAV_ITEMS: NavItem[] = [
  { label: 'Features', sections: FEATURES_SECTIONS },
  { label: 'Tenants', href: '/tenants/' },
  { label: 'Industries', href: '/industries/' },
  { label: 'Pricing', href: '/pricing/' },
  { label: 'Compare', href: '/compare/' },
  { label: 'Resources', children: RESOURCES_ITEMS },
]

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

// ─── Compact dropdown item (icon + label + short desc) ──────────────────────

function CompactDropdownItem({ item, onClose }: { item: NavChild; onClose: () => void }) {
  const Icon = item.icon ? iconMap[item.icon] : null
  return (
    <motion.div variants={itemVariants}>
      <Link
        href={item.href}
        className="group/card flex min-h-[58px] items-start gap-2.5 rounded-md px-2 py-2 transition-colors hover:bg-brand-off-white"
        role="menuitem"
        onClick={onClose}
      >
        {Icon && (
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-brand-blue">
            <Icon className="h-4 w-4" />
          </span>
        )}
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-heading font-semibold text-brand-graphite group-hover/card:text-brand-blue transition-colors leading-tight">
            {item.label}
          </p>
          <p className="mt-0.5 line-clamp-2 text-[11px] text-brand-graphite-mid leading-snug">
            {item.description}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}

// ─── Mega menu: Features ────────────────────────────────────────────────────

function FeaturesMegaMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      variants={dropdownVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed left-1/2 top-[4.5rem] w-[1100px] max-w-[calc(100vw-2rem)] -translate-x-1/2 rounded-xl border border-border bg-white p-6 shadow-lg"
      role="menu"
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
    >
      <div className="grid grid-cols-5 gap-x-4">
        {FEATURES_SECTIONS.map((section) => (
          <div key={section.title}>
            <p className="mb-3 px-2 pb-2 border-b border-border/60 text-[11px] font-heading font-semibold uppercase tracking-wider text-brand-graphite">
              {section.title}
            </p>
            <div className="flex flex-col gap-0.5">
              {section.items.map((item) => (
                <CompactDropdownItem key={item.label} item={item} onClose={onClose} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* By Audience - solutions integrated into features menu */}
      <div className="mt-6 border-t border-border/60 pt-5">
        <div className="mb-3 px-2">
          <p className="text-[11px] font-heading font-semibold uppercase tracking-wider text-brand-graphite">
            By Audience
          </p>
        </div>
        <div className="grid grid-cols-4 gap-x-4">
          {SOLUTIONS_ITEMS.map((item) => (
            <CompactDropdownItem key={item.href} item={item} onClose={onClose} />
          ))}
        </div>
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
  const hasChildren = !!item.children || !!item.sections
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const dropdownChildren: NavChild[] =
    item.children ?? (item.sections ? item.sections.flatMap((s) => s.items) : [])

  const isActive = item.href
    ? pathname === item.href || pathname.startsWith(item.href)
    : dropdownChildren.some((c) => pathname.startsWith(c.href))

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
            item.label === 'Features' ? (
              <FeaturesMegaMenu onClose={() => setOpenDropdown(null)} />
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
        href="/demo/"
        className="rounded-lg border border-border px-3.5 py-2 text-sm font-semibold transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring text-brand-graphite hover:bg-brand-off-white"
      >
        Book Demo
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
  '/how-revun-works/',
  '/what-is-revun/',
  '/furnished-rentals/',
  '/relocation-rentals/',
  '/corporate-housing/',
  '/traveling-tenants/',
  '/use-cases/',
  '/powered-by-revun/',
  '/why-revun/',
  '/tenants/',
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
        <RevunLogo size="h-8" variant={scrolled ? 'light' : 'dark'} />

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
