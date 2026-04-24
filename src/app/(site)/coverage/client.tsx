'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle2, MapPin, Shield, Globe, Scale } from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

const ease = [0.22, 1, 0.36, 1] as const

/* ═══════════════════════════════════════════ */
/*  Data                                       */
/* ═══════════════════════════════════════════ */

const canadianProvinces = [
  { name: 'Ontario', abbr: 'ON', slug: 'ontario', board: 'LTB', status: 'live' as const },
  { name: 'British Columbia', abbr: 'BC', slug: 'british-columbia', board: 'RTB', status: 'live' as const },
  { name: 'Alberta', abbr: 'AB', slug: 'alberta', board: 'RTDRS', status: 'live' as const },
  { name: 'Quebec', abbr: 'QC', slug: 'quebec', board: 'TAL', status: 'live' as const },
  { name: 'Manitoba', abbr: 'MB', slug: 'manitoba', board: 'RTB', status: 'live' as const },
  { name: 'Saskatchewan', abbr: 'SK', slug: 'saskatchewan', board: 'ORT', status: 'live' as const },
  { name: 'Nova Scotia', abbr: 'NS', slug: 'nova-scotia', board: 'RTP', status: 'live' as const },
  { name: 'New Brunswick', abbr: 'NB', slug: 'new-brunswick', board: 'SNBRTC', status: 'live' as const },
  { name: 'Newfoundland', abbr: 'NL', slug: 'newfoundland', board: 'RTA', status: 'live' as const },
  { name: 'Prince Edward Island', abbr: 'PE', slug: 'prince-edward-island', board: 'IRAC', status: 'live' as const },
]

const usStates = [
  { name: 'New York', abbr: 'NY', status: 'live' as const },
  { name: 'California', abbr: 'CA', status: 'live' as const },
  { name: 'Texas', abbr: 'TX', status: 'live' as const },
  { name: 'Florida', abbr: 'FL', status: 'live' as const },
  { name: 'Illinois', abbr: 'IL', status: 'live' as const },
  { name: 'Washington', abbr: 'WA', status: 'live' as const },
  { name: 'Colorado', abbr: 'CO', status: 'coming' as const },
  { name: 'Arizona', abbr: 'AZ', status: 'coming' as const },
  { name: 'Georgia', abbr: 'GA', status: 'coming' as const },
  { name: 'Ohio', abbr: 'OH', status: 'coming' as const },
]

const complianceDetails = [
  {
    province: 'Ontario',
    abbr: 'ON',
    board: 'LTB (Landlord and Tenant Board)',
    features: ['RTA-compliant lease generation', 'Automated N-series notices (N4, N5, N12)', 'Above-guideline increase tracking', 'LTB hearing document preparation'],
  },
  {
    province: 'British Columbia',
    abbr: 'BC',
    board: 'RTB (Residential Tenancy Branch)',
    features: ['Standard lease form auto-fill', 'Dispute resolution document prep', 'Rent increase notice scheduling', 'Manufactured home park rules'],
  },
  {
    province: 'Quebec',
    abbr: 'QC',
    board: 'TAL (Tribunal administratif du logement)',
    features: ['Bail lease form generation', 'Mandatory clause enforcement', 'Renewal and fixation workflows', 'French-language document support'],
  },
  {
    province: 'Alberta',
    abbr: 'AB',
    board: 'RTDRS (Residential Tenancy Dispute Resolution)',
    features: ['Periodic tenancy notice automation', 'Security deposit tracking', 'Dispute filing document prep', 'Rent increase templates'],
  },
  {
    province: 'Nova Scotia',
    abbr: 'NS',
    board: 'Residential Tenancies Program',
    features: ['Standard Form of Lease compliance', 'Rent cap calculation engine', 'Dispute resolution support'],
  },
  {
    province: 'Manitoba',
    abbr: 'MB',
    board: 'Residential Tenancies Branch',
    features: ['Guideline rent increase automation', 'Security deposit interest calculation', 'Notice period management'],
  },
]

const whyCompliance = [
  {
    icon: Shield,
    title: 'Province-Specific Rules',
    description: 'Each province has unique tenancy legislation. Revun embeds the rules natively - not as add-ons.',
  },
  {
    icon: Scale,
    title: 'Tribunal-Ready Documents',
    description: 'Notices, applications, and forms pre-formatted for LTB, RTB, TAL, and every other board.',
  },
  {
    icon: Globe,
    title: 'Cross-Border Operations',
    description: 'Manage properties in multiple provinces from one dashboard. Rules switch automatically.',
  },
  {
    icon: MapPin,
    title: 'Automatic Updates',
    description: 'When legislation changes, Revun updates templates and deadlines. No manual tracking needed.',
  },
]

/* ═══════════════════════════════════════════ */
/*  Animated counter                           */
/* ═══════════════════════════════════════════ */

function AnimatedNumber({ target, suffix = '', inView, delay = 0 }: {
  target: number; suffix?: string; inView: boolean; delay?: number
}) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!inView) return
    const timeout = setTimeout(() => {
      const duration = 1200
      const start = performance.now()
      const step = (now: number) => {
        const elapsed = now - start
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setValue(Math.round(eased * target))
        if (progress < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }, delay * 1000)
    return () => clearTimeout(timeout)
  }, [inView, target, delay])
  return <span>{value}{suffix}</span>
}

/* ═══════════════════════════════════════════ */
/*  SVG Map of North America (simplified)      */
/* ═══════════════════════════════════════════ */

function CoverageMapSVG({ inView }: { inView: boolean }) {
  return (
    <div className="relative mx-auto max-w-lg">
      <svg viewBox="0 0 400 320" fill="none" className="w-full">
        {/* Canada shape (simplified) */}
        <motion.path
          d="M60 40 L90 25 L140 20 L180 15 L220 18 L260 25 L300 20 L340 30 L350 50 L345 80 L330 100 L340 120 L320 140 L280 145 L250 135 L220 140 L190 135 L160 140 L130 138 L100 145 L80 130 L60 120 L50 90 L55 60 Z"
          fill="#176FEB"
          fillOpacity={0.15}
          stroke="#176FEB"
          strokeWidth={1.5}
          initial={{ pathLength: 0, fillOpacity: 0 }}
          animate={inView ? { pathLength: 1, fillOpacity: 0.15 } : {}}
          transition={{ duration: 2, ease }}
        />
        {/* Canada label */}
        <motion.text
          x="200" y="85"
          textAnchor="middle"
          className="fill-[#176FEB] font-heading text-[14px] font-bold"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
        >
          CANADA
        </motion.text>
        <motion.text
          x="200" y="100"
          textAnchor="middle"
          className="fill-[#176FEB] text-[10px]"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.7 } : {}}
          transition={{ delay: 1.2 }}
        >
          10 provinces covered
        </motion.text>

        {/* US shape (simplified) */}
        <motion.path
          d="M80 145 L100 150 L130 145 L160 148 L190 143 L220 148 L250 143 L280 150 L320 148 L340 155 L350 180 L340 210 L320 230 L300 250 L270 260 L240 255 L210 265 L180 258 L150 260 L120 250 L100 235 L80 215 L70 190 L75 165 Z"
          fill="#176FEB"
          fillOpacity={0.07}
          stroke="#176FEB"
          strokeWidth={1.5}
          strokeDasharray="4 3"
          initial={{ pathLength: 0, fillOpacity: 0 }}
          animate={inView ? { pathLength: 1, fillOpacity: 0.07 } : {}}
          transition={{ duration: 2, delay: 0.5, ease }}
        />
        {/* US label */}
        <motion.text
          x="210" y="195"
          textAnchor="middle"
          className="fill-[#555860] font-heading text-[14px] font-bold"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5 }}
        >
          UNITED STATES
        </motion.text>
        <motion.text
          x="210" y="210"
          textAnchor="middle"
          className="fill-[#555860] text-[10px]"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.6 } : {}}
          transition={{ delay: 1.7 }}
        >
          6 states live, expanding
        </motion.text>

        {/* Animated dots for Canadian cities */}
        {[
          { cx: 270, cy: 115, delay: 1.8 }, // Toronto/ON
          { cx: 120, cy: 95, delay: 2.0 },  // Vancouver/BC
          { cx: 175, cy: 80, delay: 2.2 },  // Calgary/AB
          { cx: 310, cy: 100, delay: 2.4 },  // Montreal/QC
          { cx: 195, cy: 110, delay: 2.6 },  // Winnipeg/MB
        ].map((dot, i) => (
          <g key={i}>
            <motion.circle
              cx={dot.cx} cy={dot.cy} r={6}
              fill="#176FEB" fillOpacity={0.2}
              initial={{ scale: 0 }}
              animate={inView ? { scale: [0, 1.5, 1] } : {}}
              transition={{ delay: dot.delay, duration: 0.6, ease }}
            />
            <motion.circle
              cx={dot.cx} cy={dot.cy} r={3}
              fill="#176FEB"
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: dot.delay + 0.1, duration: 0.4, ease }}
            />
          </g>
        ))}

        {/* US dots */}
        {[
          { cx: 300, cy: 175, delay: 2.8 }, // NYC
          { cx: 100, cy: 200, delay: 3.0 },  // CA
          { cx: 200, cy: 230, delay: 3.2 },  // TX
        ].map((dot, i) => (
          <g key={`us-${i}`}>
            <motion.circle
              cx={dot.cx} cy={dot.cy} r={5}
              fill="#555860" fillOpacity={0.15}
              initial={{ scale: 0 }}
              animate={inView ? { scale: [0, 1.5, 1] } : {}}
              transition={{ delay: dot.delay, duration: 0.6, ease }}
            />
            <motion.circle
              cx={dot.cx} cy={dot.cy} r={2.5}
              fill="#555860" fillOpacity={0.4}
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: dot.delay + 0.1, duration: 0.4, ease }}
            />
          </g>
        ))}
      </svg>

      {/* Animated pulse on Canada */}
      <motion.div
        className="absolute left-1/2 top-[28%] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#176FEB]"
        animate={{ scale: [1, 2, 1], opacity: [0.8, 0, 0.8] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

/* ═══════════════════════════════════════════ */
/*  Province card with expand                  */
/* ═══════════════════════════════════════════ */

function ProvinceCard({ item, index, inView }: {
  item: typeof complianceDetails[number]; index: number; inView: boolean
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease }}
      className="group relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white transition-all duration-300 hover:border-[#176FEB]/30 hover:shadow-card-hover"
    >
      {/* Top accent */}
      <div className="h-1 w-full bg-gradient-to-r from-[#176FEB] to-[#4A91F0]" />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#176FEB] font-heading text-sm font-bold text-white">
              {item.abbr}
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-[#0A1628]">{item.province}</h3>
              <p className="text-xs font-medium text-[#176FEB]">{item.board}</p>
            </div>
          </div>
          <span className="rounded-full bg-[#E8F2FE] px-2.5 py-0.5 text-[10px] font-semibold text-[#176FEB]">
            Live
          </span>
        </div>

        {/* Features (always show first 2, expand for rest) */}
        <ul className="mt-5 space-y-2.5">
          {(expanded ? item.features : item.features.slice(0, 2)).map((f) => (
            <li key={f} className="flex items-start gap-2.5">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#176FEB]" />
              <span className="text-sm text-[#555860]">{f}</span>
            </li>
          ))}
        </ul>

        {item.features.length > 2 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 text-xs font-semibold text-[#176FEB] hover:text-[#0B5AD4] transition-colors"
          >
            {expanded ? 'Show less' : `+${item.features.length - 2} more capabilities`}
          </button>
        )}
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════ */
/*  Main export                                */
/* ═══════════════════════════════════════════ */

export function CoveragePageClient() {
  const heroRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: true, margin: '-50px' })
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInView = useInView(mapRef, { once: true, margin: '-80px' })
  const complianceRef = useRef<HTMLDivElement>(null)
  const complianceInView = useInView(complianceRef, { once: true, margin: '-60px' })
  const [activeCountry, setActiveCountry] = useState<'ca' | 'us'>('ca')

  return (
    <>
      {/* ────────────────────── HERO ────────────────────── */}
      <section className="relative overflow-hidden bg-[#F5F6F8] pb-12 pt-24 md:pb-20 md:pt-32 lg:pt-40">
        {/* Ambient blobs */}
        <div className="absolute -right-40 top-10 h-[500px] w-[500px] rounded-full bg-[#176FEB]/[0.04] blur-[120px]" aria-hidden="true" />
        <div className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[#4A91F0]/[0.03] blur-[100px]" aria-hidden="true" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(23,111,235,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(23,111,235,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" aria-hidden="true" />

        <div ref={heroRef} className="relative mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-8 md:gap-12 lg:grid-cols-2">
            {/* Left: text */}
            <div>
              <motion.div
                className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-1.5"
                initial={{ opacity: 0, y: 12 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease }}
              >
                <span className="h-2 w-2 rounded-full bg-[#22C55E] animate-pulse" />
                <span className="text-xs font-medium text-[#555860]">All 13 provinces and 50 US states live</span>
              </motion.div>

              <motion.h1
                className="font-display text-3xl font-normal text-[#0A1628] md:text-5xl lg:text-6xl"
                initial={{ opacity: 0, y: 16 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1, ease }}
              >
                Compliance built into{' '}
                <span className="text-[#4A91F0]">every workflow</span>
              </motion.h1>

              <motion.p
                className="mt-5 max-w-lg text-base leading-relaxed text-[#555860] sm:text-lg"
                initial={{ opacity: 0, y: 16 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2, ease }}
              >
                Provincial and state tenancy rules embedded natively. Lease templates, notice forms, and deadline tracking automated per jurisdiction.
              </motion.p>

              {/* Stats row */}
              <motion.div
                className="mt-10 grid grid-cols-3 gap-4 md:gap-6"
                initial={{ opacity: 0, y: 16 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3, ease }}
              >
                {[
                  { value: 10, suffix: '', label: 'Provinces' },
                  { value: 6, suffix: '+', label: 'US States' },
                  { value: 6, suffix: '', label: 'Regulatory Boards' },
                ].map((stat, i) => (
                  <div key={stat.label}>
                    <p className="font-heading text-2xl font-bold text-[#0A1628] md:text-3xl lg:text-4xl">
                      <AnimatedNumber target={stat.value} suffix={stat.suffix} inView={heroInView} delay={0.5 + i * 0.15} />
                    </p>
                    <p className="mt-1 text-sm text-[#555860]">{stat.label}</p>
                  </div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                className="mt-10 flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 16 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4, ease }}
              >
                <Link
                  href="/demo/"
                  className="inline-flex h-12 items-center rounded-xl bg-[#176FEB] px-7 font-heading text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#0B5AD4] hover:shadow-lg"
                >
                  Book a Demo
                </Link>
                <Link
                  href="/ca/"
                  className="inline-flex h-12 items-center gap-2 rounded-xl border border-[#E5E7EB] px-7 text-sm font-semibold text-[#0A1628] transition-all hover:-translate-y-0.5 hover:bg-[#176FEB]/5"
                >
                  Explore Canada <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>

            {/* Right: map */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease }}
            >
              <CoverageMapSVG inView={heroInView} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ────────────────────── COVERAGE TABS ────────────────────── */}
      <section ref={mapRef} className="bg-white py-12 md:py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll className="mx-auto max-w-2xl text-center" stagger={0.1}>
            <motion.p variants={revealItem} className="font-heading text-sm font-semibold uppercase tracking-wider text-[#176FEB]">
              Where We Operate
            </motion.p>
            <motion.h2 variants={revealItem} className="mt-3 font-display text-2xl font-normal text-[#0A1628] md:text-4xl lg:text-5xl">
              <span className="text-[#176FEB]">Canada</span> first. North America next.
            </motion.h2>
          </RevealOnScroll>

          {/* Tab switcher */}
          <div className="mx-auto mt-10 flex w-fit rounded-full border border-[#E5E7EB] bg-[#F5F6F8] p-1">
            {([
              { key: 'ca' as const, label: 'Canada', count: '10 provinces' },
              { key: 'us' as const, label: 'United States', count: '6+ states' },
            ]).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveCountry(tab.key)}
                className={`relative flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-colors ${
                  activeCountry === tab.key ? 'text-white' : 'text-[#555860] hover:text-[#0A1628]'
                }`}
              >
                {activeCountry === tab.key && (
                  <motion.div
                    layoutId="coverage-tab-bg"
                    className="absolute inset-0 rounded-full bg-[#176FEB]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative">{tab.label}</span>
                <span className={`relative rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                  activeCountry === tab.key ? 'bg-white/20 text-white' : 'bg-[#E5E7EB] text-[#555860]'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {activeCountry === 'ca' ? (
              <motion.div
                key="ca"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease }}
                className="mt-10"
              >
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                  {canadianProvinces.map((prov, i) => (
                    <motion.div
                      key={prov.abbr}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.4, ease }}
                    >
                      <Link
                        href={`/ca/${prov.slug}/`}
                        className="group flex flex-col items-center rounded-xl border border-[#E5E7EB] bg-white p-5 text-center transition-all duration-200 hover:border-[#176FEB]/40 hover:shadow-md hover:-translate-y-0.5"
                      >
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#176FEB] font-heading text-sm font-bold text-white transition-transform duration-200 group-hover:scale-110">
                          {prov.abbr}
                        </div>
                        <p className="font-heading text-sm font-semibold text-[#0A1628]">{prov.name}</p>
                        <p className="mt-1 text-[10px] font-medium text-[#176FEB]">{prov.board}</p>
                        <div className="mt-2 flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                          <span className="text-[10px] text-[#555860]">Live</span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <Link
                    href="/ca/"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#176FEB] transition-colors hover:text-[#0B5AD4]"
                  >
                    View all province pages <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="us"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease }}
                className="mt-10"
              >
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                  {usStates.map((state, i) => (
                    <motion.div
                      key={state.abbr}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.4, ease }}
                      className={`flex flex-col items-center rounded-xl border p-5 text-center transition-all duration-200 ${
                        state.status === 'live'
                          ? 'border-[#E5E7EB] bg-white hover:border-[#176FEB]/40 hover:shadow-md hover:-translate-y-0.5'
                          : 'border-dashed border-[#D3D5DB] bg-[#FAFBFC]'
                      }`}
                    >
                      <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl font-heading text-sm font-bold ${
                        state.status === 'live'
                          ? 'bg-[#176FEB] text-white'
                          : 'bg-[#E5E7EB] text-[#555860]'
                      }`}>
                        {state.abbr}
                      </div>
                      <p className="font-heading text-sm font-semibold text-[#0A1628]">{state.name}</p>
                      <div className="mt-2 flex items-center gap-1">
                        <span className={`h-1.5 w-1.5 rounded-full ${state.status === 'live' ? 'bg-[#22C55E]' : 'bg-[#D3D5DB]'}`} />
                        <span className="text-[10px] text-[#555860]">{state.status === 'live' ? 'Live' : 'Coming Soon'}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 mx-auto max-w-md rounded-xl border border-[#E5E7EB] bg-[#F5F6F8] p-5 text-center">
                  <p className="text-sm font-medium text-[#0A1628]">More states coming soon</p>
                  <p className="mt-1 text-xs text-[#555860]">Contact us for early access in your state.</p>
                  <Link
                    href="/contact/"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#176FEB] hover:text-[#0B5AD4]"
                  >
                    Request early access <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ────────────────────── WHY COMPLIANCE MATTERS ────────────────────── */}
      <section className="bg-[#F5F6F8] py-12 md:py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll className="mx-auto max-w-2xl text-center" stagger={0.1}>
            <motion.p variants={revealItem} className="font-heading text-sm font-semibold uppercase tracking-wider text-[#176FEB]">
              Why It Matters
            </motion.p>
            <motion.h2 variants={revealItem} className="mt-3 font-display text-2xl font-normal text-[#0A1628] md:text-4xl lg:text-5xl">
              Compliance is not a <span className="text-[#176FEB]">feature</span>. It is the foundation.
            </motion.h2>
            <motion.p variants={revealItem} className="mx-auto mt-4 max-w-xl text-base text-[#555860]">
              Wrong notice period? Wrong lease clause? One compliance gap can cost thousands. Revun eliminates that risk.
            </motion.p>
          </RevealOnScroll>

          <RevealOnScroll className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-8" stagger={0.08}>
            {whyCompliance.map((item) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  variants={revealItem}
                  className="group rounded-2xl border border-[#E5E7EB] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#176FEB]/30 hover:shadow-card-hover"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F2FE] text-[#176FEB] transition-colors duration-200 group-hover:bg-[#176FEB] group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-base font-semibold text-[#0A1628]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#555860]">{item.description}</p>
                </motion.div>
              )
            })}
          </RevealOnScroll>
        </div>
      </section>

      {/* ────────────────────── PROVINCIAL COMPLIANCE DETAIL ────────────────────── */}
      <section className="bg-white py-12 md:py-20 lg:py-28">
        <div ref={complianceRef} className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll className="mb-12" stagger={0.1}>
            <motion.p variants={revealItem} className="font-heading text-sm font-semibold uppercase tracking-wider text-[#176FEB]">
              Compliance by Province
            </motion.p>
            <motion.h2 variants={revealItem} className="mt-3 font-display text-2xl font-normal text-[#0A1628] md:text-4xl">
              Every province, every <span className="text-[#176FEB]">regulation</span>
            </motion.h2>
            <motion.p variants={revealItem} className="mt-3 max-w-2xl text-base text-[#555860]">
              Lease templates, notice forms, and deadline tracking are automated per jurisdiction. Here is how Revun handles the major provinces.
            </motion.p>
          </RevealOnScroll>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
            {complianceDetails.map((item, i) => (
              <ProvinceCard key={item.province} item={item} index={i} inView={complianceInView} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/ca/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#176FEB] transition-colors hover:text-[#0B5AD4]"
            >
              View all province pages <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ────────────────────── CTA ────────────────────── */}
      <section className="relative overflow-hidden bg-[#F5F6F8] py-12 md:py-20 lg:py-28">
        <div className="absolute -right-20 top-0 h-[400px] w-[400px] rounded-full bg-[#176FEB]/[0.04] blur-[120px]" aria-hidden="true" />
        <div className="absolute -left-20 bottom-0 h-[300px] w-[300px] rounded-full bg-[#4A91F0]/[0.03] blur-[100px]" aria-hidden="true" />

        <RevealOnScroll className="relative mx-auto max-w-3xl px-4 text-center md:px-6 lg:px-8" stagger={0.1}>
          <motion.h2
            variants={revealItem}
            className="font-display text-2xl font-normal text-[#0A1628] md:text-4xl lg:text-5xl"
          >
            Operating in a province or state{' '}
            <span className="text-[#4A91F0]">not listed</span>?
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mx-auto mt-4 max-w-lg text-base text-[#555860]"
          >
            We are expanding coverage across North America. Contact us for early access or to request your jurisdiction.
          </motion.p>
          <motion.div
            variants={revealItem}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/contact/"
              className="inline-flex h-12 items-center rounded-xl bg-[#176FEB] px-7 font-heading text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#0B5AD4] hover:shadow-lg"
            >
              Contact Us
            </Link>
            <Link
              href="/demo/"
              className="inline-flex h-12 items-center gap-2 rounded-xl border border-[#E5E7EB] px-7 text-sm font-semibold text-[#0A1628] transition-all hover:-translate-y-0.5 hover:bg-[#176FEB]/5"
            >
              Book a Demo <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </RevealOnScroll>
      </section>
    </>
  )
}
