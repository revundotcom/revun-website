'use client'

import { motion } from 'framer-motion'
import {
  TrendingUp,
  Home,
  Wallet,
  Users,
  Search,
  MapPin,
  Calendar as CalendarIcon,
  CheckCircle2,
  FileText,
  Shield,
  MessageCircle,
  Bell,
  Bot,
  Wrench,
  Receipt,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
} from 'lucide-react'

export type MockupType =
  | 'dashboard'
  | 'portal'
  | 'listings'
  | 'calendar'
  | 'document'
  | 'chat'

interface FeatureMockupProps {
  type: MockupType
  accent?: string
  subtitle?: string
  className?: string
}

const DEFAULT_ACCENT = '#176FEB'

/* ═══════════════════════════════════════════════════════════════════════════
   Shared browser-style frame
   ═══════════════════════════════════════════════════════════════════════════ */

function Frame({
  children,
  title,
  accent = DEFAULT_ACCENT,
}: {
  children: React.ReactNode
  title: string
  accent?: string
}) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#FAFBFC]">
      {/* Minimal chrome - 3 traffic-light dots + breadcrumb path */}
      <div className="flex items-center justify-between border-b border-[#EEF0F3] bg-white px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF5F57]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex items-center gap-1.5 rounded-md bg-[#F5F6F8] px-2 py-0.5 text-[9px] text-[#555860]">
          <span
            className="h-1 w-1 rounded-full"
            style={{ backgroundColor: accent }}
          />
          <span className="font-medium">revun.app</span>
          <span className="text-[#9097A3]">/</span>
          <span className="text-[#0A1628]">{title.toLowerCase()}</span>
        </div>
        <div className="flex items-center gap-1">
          <Bell className="h-2.5 w-2.5 text-[#9097A3]" />
        </div>
      </div>
      {children}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Dashboard variant - stat cards + chart (for owner/ops/accounting/analytics)
   ═══════════════════════════════════════════════════════════════════════════ */

function DashboardView({ accent, subtitle }: { accent: string; subtitle: string }) {
  const stats = [
    { label: 'Occupied', value: '94%', icon: Home, delta: '+2.1%', up: true },
    { label: 'Collected', value: '$182K', icon: Wallet, delta: '+8.4%', up: true },
    { label: 'Active leads', value: '47', icon: Users, delta: '+12', up: true },
    { label: 'Overdue', value: '3', icon: Clock, delta: '-1', up: false },
  ]

  const chartBars = [32, 45, 38, 52, 48, 62, 58, 72, 68, 80, 75, 88]

  return (
    <Frame title={subtitle} accent={accent}>
      <div className="p-4">
        {/* Header - single line, no duplication */}
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-heading text-[13px] font-bold text-[#0A1628]">
            {subtitle}
          </h3>
          <div className="flex items-center gap-1 rounded-md border border-[#E5E7EB] bg-white px-2 py-1 text-[9px] font-medium text-[#555860]">
            <CalendarIcon className="h-2.5 w-2.5" />
            Last 30 days
          </div>
        </div>

        {/* Stat grid */}
        <div className="grid grid-cols-4 gap-2">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.05 + i * 0.05 }}
              className="rounded-lg border border-[#E5E7EB] bg-white p-2"
            >
              <div className="flex items-start justify-between">
                <p className="text-[9px] text-[#9097A3]">{s.label}</p>
                <s.icon className="h-2.5 w-2.5" style={{ color: accent }} />
              </div>
              <p
                className="mt-0.5 font-heading text-sm font-bold leading-none"
                style={{ color: accent }}
              >
                {s.value}
              </p>
              <p
                className={`mt-1 flex items-center gap-0.5 text-[8px] font-medium ${
                  s.up ? 'text-brand-blue' : 'text-[#0A1628]'
                }`}
              >
                {s.up ? (
                  <ArrowUpRight className="h-2 w-2" />
                ) : (
                  <ArrowDownRight className="h-2 w-2" />
                )}
                {s.delta}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Chart area */}
        <div className="mt-3 rounded-lg border border-[#E5E7EB] bg-white p-3">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[10px] font-semibold text-[#0A1628]">Monthly collections</p>
            <div className="flex items-center gap-1 text-[9px] text-brand-blue">
              <TrendingUp className="h-2.5 w-2.5" />
              +14.2% MoM
            </div>
          </div>
          {/* Chart rendered as SVG for reliable rendering + clean animations */}
          <div className="relative h-16 w-full">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 240 64" preserveAspectRatio="none">
              {/* Grid lines */}
              {[0.25, 0.5, 0.75].map((y) => (
                <line
                  key={y}
                  x1="0"
                  y1={64 * y}
                  x2="240"
                  y2={64 * y}
                  stroke="#EEF0F3"
                  strokeWidth="0.5"
                  strokeDasharray="2 2"
                />
              ))}
              {/* Bars */}
              {chartBars.map((h, i) => {
                const barWidth = 240 / chartBars.length - 2
                const x = i * (240 / chartBars.length) + 1
                const barHeight = (h / 100) * 60
                return (
                  <motion.rect
                    key={i}
                    x={x}
                    width={barWidth}
                    rx="1.5"
                    fill={i >= 9 ? accent : `${accent}55`}
                    initial={{ y: 64, height: 0 }}
                    whileInView={{ y: 64 - barHeight, height: barHeight }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.03 }}
                  />
                )
              })}
            </svg>
          </div>
        </div>

        {/* Mini log rows */}
        <div className="mt-3 space-y-1.5">
          {[
            { label: 'Rent received, Unit 4B', amount: '+$2,400', color: '#176FEB' },
            { label: 'Vendor payout, Plumbing', amount: '-$340', color: '#555860' },
            { label: 'Late fee collected, 12A', amount: '+$85', color: '#176FEB' },
          ].map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between rounded-md border border-[#E5E7EB] bg-white px-2.5 py-1.5"
            >
              <span className="text-[9px] text-[#555860]">{row.label}</span>
              <span
                className="font-heading text-[9px] font-bold"
                style={{ color: row.color }}
              >
                {row.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Portal variant - tenant/self-serve welcome + actions
   ═══════════════════════════════════════════════════════════════════════════ */

function PortalView({ accent, subtitle }: { accent: string; subtitle: string }) {
  const actions = [
    { label: 'Pay rent', icon: Wallet, highlight: true },
    { label: 'Maintenance', icon: Wrench },
    { label: 'Documents', icon: FileText },
    { label: 'Messages', icon: MessageCircle },
  ]

  return (
    <Frame title={subtitle} accent={accent}>
      <div className="p-4">
        {/* Hero card */}
        <div
          className="relative overflow-hidden rounded-xl p-3 text-white"
          style={{
            background: `linear-gradient(135deg, ${accent} 0%, ${accent}CC 100%)`,
          }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[9px] opacity-80">Welcome back</p>
              <p className="font-heading text-[13px] font-bold">Sarah Mitchell</p>
              <p className="mt-0.5 text-[9px] opacity-80">Unit 4B · 1420 Bay St</p>
            </div>
            <div className="h-7 w-7 rounded-full bg-white/20 ring-2 ring-white/30" />
          </div>

          <div className="mt-3 rounded-lg bg-white/15 p-2 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[9px] opacity-80">Rent due Nov 1</p>
                <p className="font-heading text-base font-bold leading-none">$2,400</p>
              </div>
              <button className="rounded-md bg-white px-2.5 py-1 text-[9px] font-bold" style={{ color: accent }}>
                Pay now
              </button>
            </div>
          </div>
        </div>

        {/* Action grid */}
        <div className="mt-3 grid grid-cols-4 gap-2">
          {actions.map((a) => (
            <div
              key={a.label}
              className={`flex flex-col items-center gap-1 rounded-lg border p-2 ${
                a.highlight
                  ? 'border-transparent bg-white shadow-sm ring-2'
                  : 'border-[#E5E7EB] bg-white'
              }`}
              style={a.highlight ? { ['--tw-ring-color' as string]: `${accent}40` } : undefined}
            >
              <div
                className="flex h-6 w-6 items-center justify-center rounded-md"
                style={{ backgroundColor: `${accent}18` }}
              >
                <a.icon className="h-3 w-3" style={{ color: accent }} />
              </div>
              <p className="text-[8px] font-medium text-[#0A1628]">{a.label}</p>
            </div>
          ))}
        </div>

        {/* Recent activity list */}
        <div className="mt-3">
          <p className="mb-1.5 text-[9px] font-heading font-semibold uppercase tracking-wider text-[#9097A3]">
            Recent activity
          </p>
          <div className="space-y-1.5">
            {[
              { label: 'Rent payment confirmed', time: 'Oct 1', icon: CheckCircle2, color: accent },
              { label: 'Maintenance scheduled', time: 'Sep 28', icon: Wrench, color: '#0B5AD4' },
              { label: 'Lease renewed for 12 months', time: 'Sep 22', icon: FileText, color: '#4A91F0' },
            ].map((r) => (
              <div
                key={r.label}
                className="flex items-center gap-2 rounded-md border border-[#E5E7EB] bg-white px-2.5 py-1.5"
              >
                <r.icon className="h-3 w-3" style={{ color: r.color }} />
                <span className="flex-1 text-[9px] text-[#0A1628]">{r.label}</span>
                <span className="text-[8px] text-[#9097A3]">{r.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Listings variant - property/vendor grid with filters
   ═══════════════════════════════════════════════════════════════════════════ */

function ListingsView({ accent, subtitle }: { accent: string; subtitle: string }) {
  const listings = [
    { title: '1420 Bay St · 4B', price: '$2,400', beds: '2bd', status: 'Available', statusColor: '#176FEB' },
    { title: '88 Harbour · 12A', price: '$3,100', beds: '3bd', status: 'Tour today', statusColor: accent },
    { title: '250 Queen W · 7', price: '$1,950', beds: '1bd', status: 'Pending', statusColor: '#4A91F0' },
    { title: '5 Lombard · 22F', price: '$2,750', beds: '2bd', status: 'Available', statusColor: '#176FEB' },
  ]

  return (
    <Frame title={subtitle} accent={accent}>
      <div className="p-4">
        {/* Search bar */}
        <div className="flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-3 py-2">
          <Search className="h-3 w-3 text-[#9097A3]" />
          <span className="flex-1 text-[10px] text-[#555860]">Toronto, ON · 1–3 beds</span>
          <div className="rounded-md border border-[#E5E7EB] bg-[#F5F6F8] px-1.5 py-0.5 text-[8px] font-medium text-[#555860]">
            4 filters
          </div>
        </div>

        {/* Filter chips */}
        <div className="mt-2 flex flex-wrap gap-1.5">
          {['Available now', 'Pet-friendly', 'In-suite laundry', 'Parking'].map((f, i) => (
            <span
              key={f}
              className={`rounded-full border px-2 py-0.5 text-[8px] font-medium ${
                i === 0
                  ? 'border-transparent text-white'
                  : 'border-[#E5E7EB] bg-white text-[#555860]'
              }`}
              style={i === 0 ? { backgroundColor: accent } : undefined}
            >
              {f}
            </span>
          ))}
        </div>

        {/* Listing grid */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          {listings.map((l, i) => (
            <motion.div
              key={l.title}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.1 + i * 0.06 }}
              className="overflow-hidden rounded-lg border border-[#E5E7EB] bg-white"
            >
              {/* Image placeholder */}
              <div
                className="relative h-10 w-full"
                style={{
                  background: `linear-gradient(135deg, ${accent}30 0%, ${accent}10 100%)`,
                }}
              >
                <div className="absolute left-1.5 top-1.5">
                  <span
                    className="rounded-full px-1.5 py-0.5 text-[7px] font-bold text-white"
                    style={{ backgroundColor: l.statusColor }}
                  >
                    {l.status}
                  </span>
                </div>
                <div className="absolute bottom-1 right-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-white/90">
                  <Home className="h-1.5 w-1.5" style={{ color: accent }} />
                </div>
              </div>

              {/* Info */}
              <div className="p-2">
                <p className="truncate text-[9px] font-semibold text-[#0A1628]">{l.title}</p>
                <div className="mt-0.5 flex items-center justify-between">
                  <span className="font-heading text-[10px] font-bold" style={{ color: accent }}>
                    {l.price}
                  </span>
                  <span className="text-[8px] text-[#9097A3]">{l.beds}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Map hint */}
        <div className="mt-2 flex items-center gap-1.5 rounded-md border border-[#E5E7EB] bg-white px-2.5 py-1.5">
          <MapPin className="h-3 w-3" style={{ color: accent }} />
          <span className="text-[9px] text-[#555860]">42 units within 5km</span>
          <span className="ml-auto text-[8px] font-medium" style={{ color: accent }}>
            View map →
          </span>
        </div>
      </div>
    </Frame>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Calendar variant - weekly tour booking view
   ═══════════════════════════════════════════════════════════════════════════ */

function CalendarView({ accent, subtitle }: { accent: string; subtitle: string }) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const bookings: Record<number, { time: string; type: 'booked' | 'available' }[]> = {
    0: [{ time: '10 AM', type: 'available' }, { time: '2 PM', type: 'booked' }],
    1: [{ time: '11 AM', type: 'available' }],
    2: [{ time: '9 AM', type: 'booked' }, { time: '3 PM', type: 'available' }, { time: '5 PM', type: 'available' }],
    3: [{ time: '1 PM', type: 'available' }],
    4: [{ time: '10 AM', type: 'booked' }, { time: '4 PM', type: 'booked' }],
    5: [{ time: '11 AM', type: 'available' }, { time: '2 PM', type: 'available' }],
    6: [],
  }

  return (
    <Frame title={subtitle} accent={accent}>
      <div className="p-4">
        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-[#9097A3]">November 2026</p>
            <h3 className="font-heading text-[13px] font-bold text-[#0A1628]">Tour schedule</h3>
          </div>
          <div className="flex items-center gap-1 rounded-md border text-[9px] font-semibold text-white"
            style={{ backgroundColor: accent, borderColor: accent }}>
            <span className="px-2 py-1">+ Book tour</span>
          </div>
        </div>

        {/* Week grid */}
        <div className="grid grid-cols-7 gap-1.5">
          {days.map((day, i) => (
            <motion.div
              key={day}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.05 + i * 0.04 }}
              className="flex flex-col gap-1"
            >
              <div className="text-center">
                <p className="text-[8px] font-semibold uppercase text-[#9097A3]">{day}</p>
                <p
                  className={`font-heading text-[11px] font-bold ${
                    i === 2 ? 'text-white' : 'text-[#0A1628]'
                  }`}
                >
                  <span
                    className={`inline-flex h-4 w-4 items-center justify-center rounded-full ${
                      i === 2 ? '' : ''
                    }`}
                    style={i === 2 ? { backgroundColor: accent } : undefined}
                  >
                    {12 + i}
                  </span>
                </p>
              </div>

              {/* Slots */}
              <div className="flex flex-col gap-0.5">
                {bookings[i].map((b, j) => (
                  <div
                    key={j}
                    className="rounded px-1 py-0.5 text-[7px] font-semibold"
                    style={{
                      backgroundColor: b.type === 'booked' ? accent : `${accent}18`,
                      color: b.type === 'booked' ? 'white' : accent,
                    }}
                  >
                    {b.time}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Upcoming tours list */}
        <div className="mt-3">
          <p className="mb-1.5 text-[9px] font-heading font-semibold uppercase tracking-wider text-[#9097A3]">
            Next up
          </p>
          <div className="space-y-1.5">
            {[
              { time: 'Today · 2:00 PM', unit: '1420 Bay St · 4B', name: 'Sarah Mitchell' },
              { time: 'Tomorrow · 11:00 AM', unit: '88 Harbour · 12A', name: 'David Chen' },
            ].map((t) => (
              <div
                key={t.time}
                className="flex items-center gap-2 rounded-md border border-[#E5E7EB] bg-white px-2.5 py-1.5"
              >
                <div
                  className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md"
                  style={{ backgroundColor: `${accent}18` }}
                >
                  <CalendarIcon className="h-2.5 w-2.5" style={{ color: accent }} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[9px] font-semibold text-[#0A1628]">{t.unit}</p>
                  <p className="text-[8px] text-[#9097A3]">
                    {t.time} · {t.name}
                  </p>
                </div>
                <CheckCircle2 className="h-3 w-3" style={{ color: accent }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Document variant - form/lease/compliance preview
   ═══════════════════════════════════════════════════════════════════════════ */

function DocumentView({ accent, subtitle }: { accent: string; subtitle: string }) {
  return (
    <Frame title={subtitle} accent={accent}>
      <div className="p-4">
        {/* Document header */}
        <div className="rounded-lg border border-[#E5E7EB] bg-white">
          <div
            className="flex items-center justify-between rounded-t-lg px-3 py-2"
            style={{ backgroundColor: `${accent}10` }}
          >
            <div className="flex items-center gap-2">
              <div
                className="flex h-5 w-5 items-center justify-center rounded-md"
                style={{ backgroundColor: accent }}
              >
                <FileText className="h-2.5 w-2.5 text-white" />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-[#0A1628]">{subtitle}</p>
                <p className="text-[8px] text-[#9097A3]">Auto-generated · Province: ON</p>
              </div>
            </div>
            <span
              className="rounded-full px-2 py-0.5 text-[8px] font-bold text-white"
              style={{ backgroundColor: accent }}
            >
              Verified
            </span>
          </div>

          {/* Form fields */}
          <div className="space-y-2 p-3">
            {[
              { label: 'Applicant name', value: 'Sarah Mitchell', verified: true },
              { label: 'Government ID', value: '•••• 4829', verified: true },
              { label: 'Annual income', value: '$94,500 verified', verified: true },
              { label: 'Credit score', value: '742 · Excellent', verified: true },
            ].map((field, i) => (
              <motion.div
                key={field.label}
                initial={{ opacity: 0, x: -6 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.06 }}
              >
                <p className="text-[8px] uppercase tracking-wider text-[#9097A3]">
                  {field.label}
                </p>
                <div className="mt-0.5 flex items-center justify-between rounded-md border border-[#E5E7EB] bg-[#FAFBFC] px-2 py-1.5">
                  <span className="text-[9px] font-medium text-[#0A1628]">
                    {field.value}
                  </span>
                  {field.verified && (
                    <CheckCircle2 className="h-3 w-3" style={{ color: accent }} />
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Signature row */}
          <div className="flex items-center justify-between rounded-b-lg border-t border-[#E5E7EB] bg-[#FAFBFC] px-3 py-2">
            <div className="flex items-center gap-2">
              <Shield className="h-3 w-3" style={{ color: accent }} />
              <span className="text-[9px] text-[#555860]">Equifax · ID.me</span>
            </div>
            <button
              className="rounded-md px-2.5 py-1 text-[9px] font-bold text-white"
              style={{ backgroundColor: accent }}
            >
              Send to sign
            </button>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-3 space-y-1.5">
          {[
            { label: 'ID verified', time: '2 min ago', done: true },
            { label: 'Credit check complete', time: '4 min ago', done: true },
            { label: 'Landlord review pending', time: 'Now', done: false },
          ].map((step) => (
            <div key={step.label} className="flex items-center gap-2">
              <div
                className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full"
                style={{
                  backgroundColor: step.done ? accent : '#E5E7EB',
                }}
              >
                {step.done ? (
                  <CheckCircle2 className="h-2.5 w-2.5 text-white" />
                ) : (
                  <div className="h-1.5 w-1.5 rounded-full bg-white" />
                )}
              </div>
              <span
                className={`text-[9px] ${
                  step.done ? 'text-[#0A1628]' : 'text-[#555860]'
                }`}
              >
                {step.label}
              </span>
              <span className="ml-auto text-[8px] text-[#9097A3]">{step.time}</span>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Chat variant - messages/inbox/maintenance thread
   ═══════════════════════════════════════════════════════════════════════════ */

function ChatView({ accent, subtitle }: { accent: string; subtitle: string }) {
  const isAI = subtitle.toLowerCase().includes('ai')
  const messages = [
    {
      from: isAI ? 'AI Assistant' : 'Sarah Mitchell',
      avatar: isAI ? 'AI' : 'SM',
      isMe: false,
      text: isAI
        ? 'I detected a leak report from Unit 4B. Dispatching top-rated plumber, ETA 2 hours. Tenant notified.'
        : 'Hi! The kitchen sink is leaking under the cabinet. Water pooling, can someone come today?',
      time: '10:42 AM',
      highlight: isAI,
    },
    {
      from: 'You',
      avatar: 'YO',
      isMe: true,
      text: isAI
        ? 'Great. Log the vendor invoice when complete.'
        : 'Got it. Dispatching a plumber now. Will confirm ETA in 10 min.',
      time: '10:44 AM',
    },
    {
      from: 'System',
      avatar: '-',
      isMe: false,
      text: isAI
        ? 'Vendor confirmed · Invoice auto-reconciled · $340 · Paid from operating account.'
        : 'Vendor dispatched · Arrival ETA 12:30 PM · Tracking link sent to tenant.',
      time: '10:46 AM',
      system: true,
    },
  ]

  return (
    <Frame title={subtitle} accent={accent}>
      <div className="flex h-[calc(100%-37px)] flex-col">
        {/* Thread header */}
        <div className="flex items-center gap-2 border-b border-[#E5E7EB] bg-white px-4 py-2.5">
          <div
            className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white"
            style={{ backgroundColor: accent }}
          >
            {isAI ? <Bot className="h-3 w-3" /> : 'SM'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-semibold text-[#0A1628]">
              {isAI ? 'Revun AI Assistant' : 'Sarah Mitchell · Unit 4B'}
            </p>
            <p className="text-[9px] text-brand-blue">● {isAI ? 'Online · auto-triaging' : 'Active now'}</p>
          </div>
          <div className="flex items-center gap-1">
            {['Maintenance', 'Urgent'].map((tag) => (
              <span
                key={tag}
                className="rounded-full px-1.5 py-0.5 text-[7px] font-bold"
                style={{
                  backgroundColor: tag === 'Urgent' ? '#0A1628' : `${accent}18`,
                  color: tag === 'Urgent' ? 'white' : accent,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-2 overflow-hidden bg-[#FAFBFC] p-3">
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 4 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 + i * 0.08 }}
              className={`flex gap-2 ${m.isMe ? 'flex-row-reverse' : ''}`}
            >
              {!m.system && (
                <div
                  className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[8px] font-bold text-white"
                  style={{
                    backgroundColor: m.isMe ? '#0A1628' : m.highlight ? accent : '#9097A3',
                  }}
                >
                  {m.avatar}
                </div>
              )}
              <div
                className={`max-w-[78%] rounded-lg px-2.5 py-1.5 ${
                  m.system
                    ? 'mx-auto border border-dashed border-[#E5E7EB] bg-white text-center'
                    : m.isMe
                    ? 'text-white'
                    : 'border border-[#E5E7EB] bg-white'
                }`}
                style={m.isMe && !m.system ? { backgroundColor: accent } : undefined}
              >
                <p
                  className={`text-[9px] leading-snug ${
                    m.isMe ? 'text-white' : m.system ? 'text-[#9097A3]' : 'text-[#0A1628]'
                  }`}
                >
                  {m.text}
                </p>
                <p
                  className={`mt-0.5 text-[7px] ${
                    m.isMe ? 'text-white/70' : 'text-[#9097A3]'
                  }`}
                >
                  {m.time}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input bar */}
        <div className="flex items-center gap-2 border-t border-[#E5E7EB] bg-white px-3 py-2">
          <div className="flex-1 rounded-full border border-[#E5E7EB] bg-[#F5F6F8] px-3 py-1 text-[9px] text-[#9097A3]">
            Type a message…
          </div>
          <button
            className="flex h-6 w-6 items-center justify-center rounded-full"
            style={{ backgroundColor: accent }}
          >
            <Receipt className="h-3 w-3 text-white" />
          </button>
        </div>
      </div>
    </Frame>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Router
   ═══════════════════════════════════════════════════════════════════════════ */

export function FeatureMockup({
  type,
  accent = DEFAULT_ACCENT,
  subtitle = 'Dashboard',
  className,
}: FeatureMockupProps) {
  const common = { accent, subtitle }

  return (
    <div className={className} role="img" aria-label={`${subtitle} product view`}>
      {type === 'dashboard' && <DashboardView {...common} />}
      {type === 'portal' && <PortalView {...common} />}
      {type === 'listings' && <ListingsView {...common} />}
      {type === 'calendar' && <CalendarView {...common} />}
      {type === 'document' && <DocumentView {...common} />}
      {type === 'chat' && <ChatView {...common} />}
    </div>
  )
}

