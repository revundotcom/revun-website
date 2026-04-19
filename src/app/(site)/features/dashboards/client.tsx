'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import {
  LayoutDashboard, Home, BookOpen, Calendar, Users, BarChart3,
  Building2, Clock, Settings, LogOut, Bell, Plus, Wrench,
  FileText, Phone, MessageCircle, Mail, TrendingUp, TrendingDown,
  CheckCircle2, AlertTriangle, ChevronDown, ChevronRight,
  Search, Filter, Download, ArrowRight, Sparkles,
} from 'lucide-react'

/* ── Shared helpers ──────────────────────────────────────────────── */

const ease = [0.22, 1, 0.36, 1] as const

function SW({ children, id, dark }: { children: React.ReactNode; id: string; dark?: boolean }) {
  return (
    <section id={id} className={`py-14 ${dark ? 'bg-[#F5F6F8]' : 'bg-white'}`}>
      <div className="mx-auto max-w-7xl px-6">{children}</div>
    </section>
  )
}

function SH({ eyebrow, title, highlight, description }: { eyebrow: string; title: string; highlight: string; description: string }) {
  return (
    <RevealOnScroll className="mx-auto max-w-2xl text-center">
      <motion.p variants={revealItem} className="text-sm font-heading font-semibold uppercase tracking-wider text-brand-blue">{eyebrow}</motion.p>
      <motion.h2 variants={revealItem} className="mt-3 font-display text-4xl font-normal md:text-5xl text-brand-graphite">
        {title} <span className="text-keyword">{highlight}</span>
      </motion.h2>
      <motion.p variants={revealItem} className="mx-auto mt-4 max-w-xl text-lg text-brand-graphite/70">{description}</motion.p>
    </RevealOnScroll>
  )
}

function Anim({ children, className, delay = 0.1, x, y = 12 }: { children: React.ReactNode; className?: string; delay?: number; x?: number; y?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, x: x ?? 0, y }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.5, ease, delay }}
    >{children}</motion.div>
  )
}

function AnimatedCounter({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.span ref={ref} className="tabular-nums">
      {prefix}
      <motion.span
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.3, ease }}
      >
        {inView ? value.toLocaleString() : '0'}
      </motion.span>
      {suffix}
    </motion.span>
  )
}

function BrowserChrome({ url, children, className = '' }: { url: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden shadow-sm ${className}`}>
      <div className="flex items-center gap-2 border-b border-[#E5E7EB] bg-[#FAFAFA] px-4 py-2.5">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-[#EF4444]/60" />
          <div className="h-3 w-3 rounded-full bg-[#F59E0B]/60" />
          <div className="h-3 w-3 rounded-full bg-[#22C55E]/60" />
        </div>
        <div className="ml-3 flex-1 rounded-md bg-white border border-[#E5E7EB] px-3 py-1 text-[11px] text-[#555860]">{url}</div>
      </div>
      {children}
    </div>
  )
}

/* ── Section 1: Hero ─────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(23,111,235,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(23,111,235,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E8F2FE]">
          <LayoutDashboard className="h-8 w-8 text-[#176FEB]" />
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="font-display text-4xl font-normal text-[#0A1628] md:text-6xl">
          The command centre for<br /><span className="text-keyword">property operations</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: 0.2 }}
          className="mx-auto mt-5 max-w-2xl text-lg text-[#555860]">
          Real-time dashboards that give every team member the exact view they need. Occupancy, revenue, maintenance, leasing, and compliance — all in one place.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: 0.3 }}
          className="mt-8 flex items-center justify-center gap-4">
          <Link href="/pricing/" className="inline-flex h-12 items-center justify-center rounded-xl bg-[#176FEB] px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#0B5AD4]">
            Start Free Trial
          </Link>
          <Link href="/demo/" className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-6 text-sm font-semibold text-[#2C2E33] transition-colors duration-200 hover:border-[#176FEB]/30">
            Book a Demo
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

/* ── Section 2: Operations Dashboard (Flagship) ──────────────────── */

function OperationsDashboard() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const sidebarMain = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: BookOpen, label: 'Learn', active: false },
    { icon: Calendar, label: 'Events', active: false },
    { icon: Users, label: 'Contacts', active: false },
    { icon: BarChart3, label: 'Reports', active: false },
  ]
  const sidebarManage = [
    { icon: Building2, label: 'Properties', chevron: true },
    { icon: Wrench, label: 'Requests', chevron: true },
  ]
  const sidebarSystem = [
    { icon: Settings, label: 'Settings', chevron: true },
  ]

  const kpis = [
    { label: 'Progress', value: '65%', color: '#176FEB', hasBar: true, barWidth: 65 },
    { label: 'Calls Made', value: '15', color: '#176FEB' },
    { label: 'Overdue', value: '2', color: '#F59E0B', icon: AlertTriangle },
    { label: 'Active Leads', value: '3', color: '#22C55E' },
    { label: 'Events Today', value: '2', color: '#176FEB' },
  ]

  const activities = [
    { label: 'Tasks', count: 0, color: '#555860' },
    { label: 'Meetings', count: 163, color: '#176FEB' },
    { label: 'Calls', count: 0, color: '#555860' },
    { label: 'Chats', count: 27, color: '#8B5CF6' },
    { label: 'Email', count: 5, color: '#EF4444' },
  ]

  return (
    <SW id="operations-dashboard" dark>
      <SH eyebrow="Command Centre" title="Your complete" highlight="operations dashboard" description="Everything your team needs to manage properties, tenants, and vendors — all in one unified view." />
      <div ref={ref} className="mt-12">
        <Anim className="mx-auto max-w-6xl" delay={0.15}>
          <BrowserChrome url="app.revun.com/dashboard">
            <div className="flex min-h-[520px]">
              {/* Sidebar */}
              <div className="w-52 shrink-0 border-r border-[#E5E7EB] bg-white flex flex-col">
                <div className="px-4 py-4 border-b border-[#E5E7EB]">
                  <span className="font-heading text-sm font-bold text-[#176FEB]">Revun Pro</span>
                </div>
                <div className="flex-1 py-2 text-[12px]">
                  <p className="px-4 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-[#555860]/60">Main</p>
                  {sidebarMain.map((item, i) => (
                    <motion.div key={item.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.35, ease, delay: 0.3 + i * 0.05 }}
                      className={`mx-2 mb-0.5 flex items-center gap-2.5 rounded-lg px-3 py-2 cursor-default ${item.active ? 'bg-[#E8F2FE] text-[#176FEB] border-l-2 border-[#176FEB]' : 'text-[#555860] hover:bg-[#F5F6F8]'}`}
                    >
                      <item.icon className="h-3.5 w-3.5" />
                      <span className={`font-medium ${item.active ? 'text-[#176FEB]' : ''}`}>{item.label}</span>
                    </motion.div>
                  ))}
                  <p className="px-4 pt-4 pb-1 text-[10px] font-semibold uppercase tracking-wider text-[#555860]/60">Manage</p>
                  {sidebarManage.map((item, i) => (
                    <motion.div key={item.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.35, ease, delay: 0.55 + i * 0.05 }}
                      className="mx-2 mb-0.5 flex items-center justify-between rounded-lg px-3 py-2 text-[#555860] hover:bg-[#F5F6F8] cursor-default"
                    >
                      <div className="flex items-center gap-2.5"><item.icon className="h-3.5 w-3.5" /><span className="font-medium">{item.label}</span></div>
                      <ChevronRight className="h-3 w-3 text-[#555860]/40" />
                    </motion.div>
                  ))}
                  <p className="px-4 pt-4 pb-1 text-[10px] font-semibold uppercase tracking-wider text-[#555860]/60">System</p>
                  {sidebarSystem.map((item) => (
                    <motion.div key={item.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.35, ease, delay: 0.65 }}
                      className="mx-2 mb-0.5 flex items-center justify-between rounded-lg px-3 py-2 text-[#555860] hover:bg-[#F5F6F8] cursor-default"
                    >
                      <div className="flex items-center gap-2.5"><item.icon className="h-3.5 w-3.5" /><span className="font-medium">{item.label}</span></div>
                      <ChevronRight className="h-3 w-3 text-[#555860]/40" />
                    </motion.div>
                  ))}
                </div>
                {/* Bottom user */}
                <div className="border-t border-[#E5E7EB] px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#176FEB] text-[10px] font-bold text-white">SA</div>
                    <div>
                      <p className="text-[11px] font-semibold text-[#0A1628]">Super Admin</p>
                      <span className="inline-block rounded bg-[#E8F2FE] px-1.5 py-0.5 text-[9px] font-bold text-[#176FEB]">ADMIN</span>
                    </div>
                  </div>
                  <button className="mt-2 flex items-center gap-1.5 text-[11px] text-[#555860] hover:text-[#EF4444]">
                    <LogOut className="h-3 w-3" />Logout
                  </button>
                </div>
              </div>

              {/* Content area */}
              <div className="flex-1 bg-[#FAFBFC] p-5 overflow-hidden">
                {/* Top bar */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <Search className="h-4 w-4 text-[#555860]/50" />
                    <div className="h-8 w-48 rounded-lg border border-[#E5E7EB] bg-white px-3 flex items-center">
                      <span className="text-[11px] text-[#555860]/40">Search...</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Bell className="h-4 w-4 text-[#555860]" />
                      <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#EF4444] text-[8px] font-bold text-white">2</span>
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#176FEB] text-[10px] font-bold text-white">SA</div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-5">
                  {['Overview', 'Focus Mode', 'Performance'].map((tab, i) => (
                    <motion.div key={tab}
                      initial={{ opacity: 0, y: 6 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.3, ease, delay: 0.4 + i * 0.06 }}
                      className={`rounded-lg px-4 py-1.5 text-[11px] font-semibold cursor-default ${i === 0 ? 'bg-[#176FEB] text-white' : 'bg-white border border-[#E5E7EB] text-[#555860]'}`}
                    >{tab}</motion.div>
                  ))}
                </div>

                {/* KPI cards */}
                <div className="grid grid-cols-5 gap-3 mb-5">
                  {kpis.map((kpi, i) => (
                    <motion.div key={kpi.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, ease, delay: 0.5 + i * 0.07 }}
                      className="rounded-xl border border-[#E5E7EB] bg-white p-3"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-[#555860]">{kpi.label}</span>
                        {kpi.icon && <kpi.icon className="h-3 w-3" style={{ color: kpi.color }} />}
                      </div>
                      <p className="text-lg font-bold" style={{ color: kpi.color }}>{kpi.value}</p>
                      {kpi.hasBar && (
                        <div className="mt-1.5 h-1.5 rounded-full bg-[#E5E7EB]">
                          <motion.div className="h-full rounded-full bg-[#176FEB]"
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${kpi.barWidth}%` } : {}}
                            transition={{ duration: 1, ease, delay: 0.8 }}
                          />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Quick actions */}
                <div className="flex gap-2 mb-5">
                  {[
                    { icon: Plus, label: 'Create Work Order' },
                    { icon: Building2, label: 'List a Property' },
                    { icon: Calendar, label: 'Schedule Showing' },
                    { icon: Users, label: 'Create Contact' },
                  ].map((action, i) => (
                    <motion.div key={action.label}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, ease, delay: 0.7 + i * 0.05 }}
                      className="flex items-center gap-1.5 rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-[10px] font-medium text-[#555860] cursor-default hover:border-[#176FEB]/30"
                    >
                      <action.icon className="h-3 w-3 text-[#176FEB]" />{action.label}
                    </motion.div>
                  ))}
                </div>

                {/* User profile + Activities row */}
                <div className="grid grid-cols-3 gap-4">
                  {/* Profile card */}
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, ease, delay: 0.85 }}
                    className="rounded-xl border border-[#E5E7EB] bg-white p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#176FEB] text-sm font-bold text-white">SA</div>
                      <div>
                        <p className="text-[12px] font-semibold text-[#0A1628]">Super Admin</p>
                        <p className="text-[10px] text-[#555860]">admin@rvpm.com</p>
                      </div>
                    </div>
                    <span className="inline-block rounded bg-[#E8F2FE] px-2 py-0.5 text-[9px] font-bold text-[#176FEB]">ADMIN</span>
                  </motion.div>

                  {/* Activities */}
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, ease, delay: 0.9 }}
                    className="col-span-2 rounded-xl border border-[#E5E7EB] bg-white p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-[12px] font-semibold text-[#0A1628]">Activities</p>
                        <p className="text-[10px] text-[#555860]">Track and manage your pending tasks</p>
                      </div>
                      <div className="flex items-center gap-1.5 rounded-lg bg-[#176FEB] px-3 py-1.5 text-[10px] font-semibold text-white">
                        <Plus className="h-3 w-3" />Add Task
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      {activities.map((act, i) => (
                        <motion.div key={act.label}
                          initial={{ opacity: 0, y: 8 }}
                          animate={inView ? { opacity: 1, y: 0 } : {}}
                          transition={{ duration: 0.35, ease, delay: 1.0 + i * 0.06 }}
                          className="rounded-lg border border-[#E5E7EB] p-2.5 text-center"
                        >
                          <p className="text-lg font-bold" style={{ color: act.color }}>{act.count}</p>
                          <p className="text-[10px] text-[#555860]">{act.label}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </BrowserChrome>
        </Anim>
      </div>
    </SW>
  )
}

/* ── Section 3: Role-Based Views ─────────────────────────────────── */

function RoleBasedViews() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const roles = [
    {
      role: 'Portfolio Manager',
      icon: BarChart3,
      metrics: [
        { label: 'Revenue', value: '$1.24M', color: '#22C55E' },
        { label: 'Occupancy', value: '96.4%', color: '#176FEB' },
        { label: 'NOI Trend', value: '+8.2%', color: '#22C55E', trend: true },
        { label: 'Total Units', value: '847', color: '#0A1628' },
      ],
    },
    {
      role: 'Leasing Agent',
      icon: FileText,
      metrics: [
        { label: 'Applied', value: '8', color: '#176FEB' },
        { label: 'Screening', value: '5', color: '#F59E0B' },
        { label: 'Approved', value: '3', color: '#22C55E' },
        { label: 'Signed', value: '2', color: '#8B5CF6' },
      ],
    },
    {
      role: 'Maintenance Coordinator',
      icon: Wrench,
      metrics: [
        { label: 'Open WOs', value: '12', color: '#F59E0B' },
        { label: 'High Priority', value: '3', color: '#EF4444' },
        { label: 'Avg Resolution', value: '2.4d', color: '#176FEB' },
        { label: 'Completed', value: '156', color: '#22C55E' },
      ],
    },
    {
      role: 'Accountant',
      icon: BarChart3,
      metrics: [
        { label: 'Collected', value: '$284K', color: '#22C55E' },
        { label: 'Trust Balance', value: '$1.8M', color: '#176FEB' },
        { label: 'Pending', value: '3', color: '#F59E0B' },
        { label: 'Disbursements', value: '$142K', color: '#0A1628' },
      ],
    },
  ]

  return (
    <SW id="role-views">
      <SH eyebrow="Role-Based Access" title="Every role gets their" highlight="perfect view" description="Operators see the full picture. Leasing agents see pipeline. Accountants see financials. Each role gets exactly what they need." />
      <div ref={ref} className="mt-12 grid gap-6 md:grid-cols-2">
        {roles.map((r, ri) => (
          <motion.div key={r.role}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease, delay: 0.15 + ri * 0.1 }}
          >
            <BrowserChrome url={`app.revun.com/${r.role.toLowerCase().replace(/ /g, '-')}`}>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E8F2FE]">
                    <r.icon className="h-3.5 w-3.5 text-[#176FEB]" />
                  </div>
                  <span className="text-[12px] font-semibold text-[#0A1628]">{r.role}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {r.metrics.map((m, mi) => (
                    <motion.div key={m.label}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, ease, delay: 0.3 + ri * 0.1 + mi * 0.05 }}
                      className="rounded-lg border border-[#E5E7EB] p-3"
                    >
                      <p className="text-[10px] text-[#555860]">{m.label}</p>
                      <div className="flex items-center gap-1">
                        <span className="text-base font-bold" style={{ color: m.color }}>{m.value}</span>
                        {m.trend && <TrendingUp className="h-3 w-3 text-[#22C55E]" />}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </BrowserChrome>
            <p className="mt-2 text-center text-sm font-heading font-semibold text-[#0A1628]">{r.role}</p>
          </motion.div>
        ))}
      </div>
    </SW>
  )
}

/* ── Section 4: Real-Time Activity Feed ──────────────────────────── */

function ActivityFeed() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const entries = [
    { time: '10:45 AM', text: 'Rent payment received — Sarah M., $1,850', color: '#22C55E' },
    { time: '10:32 AM', text: 'Lease signed — Unit 5D, Emily R.', color: '#176FEB' },
    { time: '10:18 AM', text: 'WO-2847 assigned to Pro Appliance Co.', color: '#F59E0B' },
    { time: '10:02 AM', text: 'Tour scheduled — Unit 2C, 2:30 PM', color: '#176FEB' },
    { time: '9:48 AM', text: 'Insurance doc uploaded — Unit 8A', color: '#555860' },
    { time: '9:14 AM', text: 'New application — David L., Unit 8A', color: '#176FEB' },
  ]

  return (
    <SW id="activity-feed" dark>
      <SH eyebrow="Live Feed" title="Real-time" highlight="activity stream" description="Every payment, lease, work order, and application appears the moment it happens. No refresh required." />
      <div ref={ref} className="mx-auto mt-12 max-w-2xl">
        <Anim delay={0.15}>
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-heading font-semibold text-[#0A1628]">Activity Feed</h3>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#22C55E]" />
                </span>
                <span className="text-[11px] font-semibold text-[#22C55E]">Live</span>
              </div>
            </div>
            <div className="space-y-0">
              {entries.map((entry, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, ease, delay: 0.25 + i * 0.1 }}
                  className="flex items-start gap-3 py-3 border-b border-[#E5E7EB] last:border-b-0"
                >
                  <div className="mt-1.5 flex flex-col items-center">
                    <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
                    {i < entries.length - 1 && <div className="mt-1 w-px flex-1 bg-[#E5E7EB]" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#0A1628]">{entry.text}</p>
                    <p className="text-[11px] text-[#555860] mt-0.5">{entry.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Anim>
      </div>
    </SW>
  )
}

/* ── Section 5: Portfolio KPIs ───────────────────────────────────── */

function PortfolioKPIs() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const bigMetrics = [
    { label: 'Total Units', value: 847, prefix: '', suffix: '', color: '#0A1628' },
    { label: 'Occupancy Rate', value: 96.4, prefix: '', suffix: '%', color: '#176FEB', ring: true },
    { label: 'Collection Rate', value: 97.8, prefix: '', suffix: '%', color: '#22C55E', bar: true },
    { label: 'Avg Rent', value: 1850, prefix: '$', suffix: '', color: '#0A1628' },
  ]

  const monthlyRevenue = [82, 85, 88, 84, 90, 92, 88, 95, 97, 94, 98, 102]

  return (
    <SW id="portfolio-kpis">
      <SH eyebrow="Portfolio Metrics" title="Track what matters" highlight="in real time" description="Animated KPI cards and sparklines give you instant insight into portfolio health." />
      <div ref={ref} className="mt-12 grid gap-6 grid-cols-2 md:grid-cols-4">
        {bigMetrics.map((m, i) => (
          <motion.div key={m.label}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease, delay: 0.15 + i * 0.1 }}
            className="rounded-2xl border border-[#E5E7EB] bg-white p-6 text-center"
          >
            <p className="text-sm text-[#555860] mb-2">{m.label}</p>
            {m.ring ? (
              <div className="relative mx-auto h-20 w-20 mb-2">
                <svg viewBox="0 0 80 80" className="h-20 w-20 -rotate-90">
                  <circle cx="40" cy="40" r="34" fill="none" stroke="#E5E7EB" strokeWidth="6" />
                  <motion.circle cx="40" cy="40" r="34" fill="none" stroke={m.color} strokeWidth="6" strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 34}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 34 }}
                    animate={inView ? { strokeDashoffset: 2 * Math.PI * 34 * (1 - m.value / 100) } : {}}
                    transition={{ duration: 1.2, ease, delay: 0.3 + i * 0.1 }}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-lg font-bold" style={{ color: m.color }}>
                  {m.value}{m.suffix}
                </span>
              </div>
            ) : m.bar ? (
              <div className="mb-2">
                <p className="text-3xl font-bold mb-2" style={{ color: m.color }}>{m.prefix}{m.value}{m.suffix}</p>
                <div className="h-2 rounded-full bg-[#E5E7EB]">
                  <motion.div className="h-full rounded-full" style={{ backgroundColor: m.color }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${m.value}%` } : {}}
                    transition={{ duration: 1, ease, delay: 0.3 + i * 0.1 }}
                  />
                </div>
              </div>
            ) : (
              <p className="text-3xl font-bold" style={{ color: m.color }}>
                <AnimatedCounter value={m.value} prefix={m.prefix} suffix={m.suffix} />
              </p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Sparkline */}
      <div className="mt-8 mx-auto max-w-3xl rounded-2xl border border-[#E5E7EB] bg-white p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-heading font-semibold text-[#0A1628]">Monthly Revenue ($K)</p>
          <TrendingUp className="h-4 w-4 text-[#22C55E]" />
        </div>
        <div className="flex items-end gap-2 h-28">
          {monthlyRevenue.map((val, i) => (
            <motion.div key={i} className="flex-1 rounded-t-md bg-[#176FEB]"
              initial={{ height: 0 }}
              animate={inView ? { height: `${(val / 110) * 100}%` } : {}}
              transition={{ duration: 0.6, ease, delay: 0.4 + i * 0.05 }}
            />
          ))}
        </div>
        <div className="flex gap-2 mt-2">
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
            <span key={m} className="flex-1 text-center text-[9px] text-[#555860]">{m}</span>
          ))}
        </div>
      </div>
    </SW>
  )
}

/* ── Section 6: Property Drill-Down ──────────────────────────────── */

function PropertyDrillDown() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const units = [
    { unit: 'Unit 814', tenant: 'Sarah M.', rent: '$1,650/mo', status: 'Lease Active', payment: 'Paid', paymentColor: '#22C55E' },
    { unit: 'Unit 1201', tenant: 'James K.', rent: '$2,100/mo', status: 'Lease Active', payment: 'Pending', paymentColor: '#F59E0B' },
    { unit: 'Unit 507', tenant: 'Vacant', rent: '$1,450/mo', status: 'Listed', payment: '3 Applications', paymentColor: '#176FEB' },
  ]

  return (
    <SW id="property-drilldown" dark>
      <SH eyebrow="Drill Down" title="From portfolio to" highlight="unit-level detail" description="Click any property to see unit-level occupancy, lease status, and payment history. Full transparency at every level." />
      <div ref={ref} className="mx-auto mt-12 max-w-3xl">
        <Anim delay={0.15}>
          <BrowserChrome url="app.revun.com/properties/220-king-st-w">
            <div className="p-5">
              {/* Breadcrumb */}
              <div className="flex items-center gap-1.5 text-[11px] text-[#555860] mb-4">
                <span className="text-[#176FEB] font-medium cursor-default">Portfolio</span>
                <ChevronRight className="h-3 w-3" />
                <span className="text-[#176FEB] font-medium cursor-default">Property</span>
                <ChevronRight className="h-3 w-3" />
                <span className="font-medium text-[#0A1628]">Units</span>
              </div>

              {/* Property header */}
              <motion.div initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, ease, delay: 0.3 }}
                className="flex items-center justify-between mb-5 rounded-xl border border-[#E5E7EB] bg-[#FAFBFC] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F2FE]">
                    <Building2 className="h-5 w-5 text-[#176FEB]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0A1628]">220 King St W, Toronto</p>
                    <p className="text-[11px] text-[#555860]">24 Units  |  92% Occupied  |  $38,400/mo</p>
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 text-[#555860]" />
              </motion.div>

              {/* Units list */}
              <div className="space-y-2">
                {units.map((u, i) => (
                  <motion.div key={u.unit}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, ease, delay: 0.45 + i * 0.08 }}
                    className="flex items-center justify-between rounded-xl border border-[#E5E7EB] bg-white p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F5F6F8]">
                        <Home className="h-4 w-4 text-[#555860]" />
                      </div>
                      <div>
                        <p className="text-[12px] font-semibold text-[#0A1628]">{u.unit}: {u.tenant}</p>
                        <p className="text-[11px] text-[#555860]">{u.rent}  |  {u.status}</p>
                      </div>
                    </div>
                    <span className="rounded-lg px-2.5 py-1 text-[10px] font-semibold" style={{ backgroundColor: u.paymentColor + '18', color: u.paymentColor }}>
                      {u.payment}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </BrowserChrome>
        </Anim>
      </div>
    </SW>
  )
}

/* ── Section 7: Maintenance Dashboard ────────────────────────────── */

function MaintenanceDashboard() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const pipeline = [
    { label: 'Open', value: 12, color: '#F59E0B' },
    { label: 'In Progress', value: 5, color: '#176FEB' },
    { label: 'Awaiting Parts', value: 3, color: '#8B5CF6' },
    { label: 'Completed', value: 156, color: '#22C55E' },
  ]

  const priorities = [
    { label: 'Critical', value: 2, color: '#EF4444' },
    { label: 'High', value: 4, color: '#F59E0B' },
    { label: 'Medium', value: 6, color: '#176FEB' },
  ]

  const vendors = [
    { name: 'Pro Appliance Co.', rate: '98%', jobs: 42 },
    { name: 'QuickFix Plumbing', rate: '95%', jobs: 38 },
    { name: 'Elite HVAC', rate: '94%', jobs: 27 },
  ]

  return (
    <SW id="maintenance-dashboard">
      <SH eyebrow="Maintenance" title="Work order" highlight="command centre" description="Track every maintenance request from submission to completion. See priorities, vendor performance, and resolution times at a glance." />
      <div ref={ref} className="mt-12 grid gap-6 md:grid-cols-2">
        {/* Pipeline */}
        <Anim delay={0.15}>
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6">
            <h3 className="text-sm font-heading font-semibold text-[#0A1628] mb-4">Work Order Pipeline</h3>
            <div className="grid grid-cols-2 gap-3">
              {pipeline.map((p, i) => (
                <motion.div key={p.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.35, ease, delay: 0.3 + i * 0.07 }}
                  className="rounded-xl border border-[#E5E7EB] p-3 text-center"
                >
                  <p className="text-2xl font-bold" style={{ color: p.color }}>{p.value}</p>
                  <p className="text-[11px] text-[#555860]">{p.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Anim>

        {/* Priority + Resolution */}
        <Anim delay={0.25}>
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6">
            <h3 className="text-sm font-heading font-semibold text-[#0A1628] mb-4">Priority Breakdown</h3>
            <div className="space-y-3 mb-5">
              {priorities.map((p, i) => (
                <motion.div key={p.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.35, ease, delay: 0.4 + i * 0.07 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                    <span className="text-sm text-[#0A1628]">{p.label}</span>
                  </div>
                  <span className="text-sm font-bold" style={{ color: p.color }}>{p.value}</span>
                </motion.div>
              ))}
            </div>
            <div className="rounded-xl bg-[#F5F6F8] p-4">
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-[#555860]">Avg Resolution Time</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-bold text-[#0A1628]">2.4 days</span>
                  <TrendingDown className="h-4 w-4 text-[#22C55E]" />
                </div>
              </div>
            </div>
          </div>
        </Anim>

        {/* Top Vendors */}
        <Anim className="md:col-span-2" delay={0.3}>
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6">
            <h3 className="text-sm font-heading font-semibold text-[#0A1628] mb-4">Top Vendors by Completion Rate</h3>
            <div className="grid gap-3 md:grid-cols-3">
              {vendors.map((v, i) => (
                <motion.div key={v.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.35, ease, delay: 0.45 + i * 0.07 }}
                  className="flex items-center justify-between rounded-xl border border-[#E5E7EB] p-4"
                >
                  <div>
                    <p className="text-[12px] font-semibold text-[#0A1628]">{v.name}</p>
                    <p className="text-[11px] text-[#555860]">{v.jobs} jobs completed</p>
                  </div>
                  <span className="text-sm font-bold text-[#22C55E]">{v.rate}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </Anim>
      </div>
    </SW>
  )
}

/* ── Section 8: Leasing Pipeline ─────────────────────────────────── */

function LeasingPipeline() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const stages = [
    { label: 'Inquiries', description: 'Top-of-funnel leads captured', value: 45, icon: Users, color: '#176FEB' },
    { label: 'Applications', description: 'Applicants who submitted forms', value: 18, icon: FileText, color: '#2563EB' },
    { label: 'Screening', description: 'Credit & background checks', value: 8, icon: Search, color: '#3B82F6' },
    { label: 'Approved', description: 'Cleared to sign a lease', value: 5, icon: CheckCircle2, color: '#60A5FA' },
    { label: 'Lease Signed', description: 'Closed & ready for move-in', value: 3, icon: Sparkles, color: '#22C55E' },
  ]

  const maxValue = stages[0].value
  const conversions = ['40%', '44%', '63%', '60%']
  const dropOffs = [
    { from: 'Inquiries', to: 'Applications', lost: 27, rate: 60 },
  ]

  const summary = [
    { label: 'Total Leads', value: '45', accent: '#176FEB' },
    { label: 'Signed Leases', value: '3', accent: '#22C55E' },
    { label: 'Overall Conversion', value: '6.7%', accent: '#0A1628' },
  ]

  return (
    <SW id="leasing-pipeline" dark>
      <SH eyebrow="Leasing" title="Visualize your" highlight="leasing funnel" description="From inquiry to signed lease. See conversion rates at every stage and identify where leads drop off." />
      <div ref={ref} className="mx-auto mt-12 max-w-5xl">
        <Anim delay={0.15}>
          <div className="rounded-3xl border border-[#E5E7EB] bg-white p-6 md:p-8 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E7EB] pb-5">
              <div>
                <h3 className="font-heading text-lg font-semibold text-[#0A1628]">Leasing Pipeline</h3>
                <p className="text-[11px] text-[#555860] mt-0.5">Last 30 days · Portfolio-wide</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#22C55E]/10 px-3 py-1 text-[11px] font-semibold text-[#22C55E]">
                <TrendingUp className="h-3 w-3" /> +12% vs prev period
              </span>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {summary.map((k, i) => (
                <motion.div key={k.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, ease, delay: 0.2 + i * 0.08 }}
                  className="rounded-xl bg-[#F5F6F8] p-4"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#555860]">{k.label}</p>
                  <p className="mt-1 font-display text-2xl font-semibold tabular-nums" style={{ color: k.accent }}>{k.value}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 space-y-1">
              {stages.map((s, i) => {
                const Icon = s.icon
                const widthPct = Math.max(6, (s.value / maxValue) * 100)
                return (
                  <div key={s.label}>
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.45, ease, delay: 0.35 + i * 0.1 }}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: s.color + '18' }}>
                            <Icon className="h-4 w-4" style={{ color: s.color }} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[13px] font-semibold text-[#0A1628] truncate">{s.label}</p>
                            <p className="text-[11px] text-[#555860] truncate">{s.description}</p>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-display text-lg font-semibold tabular-nums text-[#0A1628]">{s.value}</p>
                          <p className="text-[10px] text-[#555860]">{((s.value / maxValue) * 100).toFixed(1)}% of top</p>
                        </div>
                      </div>
                      <div className="mt-2.5 h-2.5 w-full rounded-full bg-[#F5F6F8] overflow-hidden">
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={inView ? { scaleX: 1 } : {}}
                          transition={{ duration: 0.7, ease, delay: 0.45 + i * 0.1 }}
                          className="h-full rounded-full origin-left"
                          style={{ width: `${widthPct}%`, backgroundColor: s.color }}
                        />
                      </div>
                    </motion.div>

                    {i < conversions.length && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.3, ease, delay: 0.55 + i * 0.1 }}
                        className="flex items-center gap-2 py-2 pl-4"
                      >
                        <div className="h-4 w-px bg-[#E5E7EB]" />
                        <span className="inline-flex items-center gap-1 rounded-md bg-[#22C55E]/10 px-1.5 py-0.5 text-[10px] font-semibold text-[#22C55E]">
                          <ChevronDown className="h-2.5 w-2.5" /> {conversions[i]} conversion
                        </span>
                        <span className="text-[10px] text-[#555860]">{stages[i].value - stages[i + 1].value} dropped off</span>
                      </motion.div>
                    )}
                  </div>
                )
              })}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, ease, delay: 1.15 }}
              className="mt-7 flex items-start gap-3 rounded-xl border border-[#176FEB]/20 bg-[#176FEB]/5 p-4"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#176FEB]">
                <AlertTriangle className="h-4 w-4 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-[12px] font-semibold text-[#0A1628]">Biggest drop-off: {dropOffs[0].from} → {dropOffs[0].to}</p>
                <p className="text-[11px] text-[#555860] mt-0.5">{dropOffs[0].lost} of 45 leads ({dropOffs[0].rate}%) never completed an application. Trigger automated follow-ups to recover them.</p>
              </div>
            </motion.div>
          </div>
        </Anim>
      </div>
    </SW>
  )
}

/* ── Section 9: Custom Reports Builder ───────────────────────────── */

function CustomReports() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const reportTypes = ['Income Statement', 'Rent Roll', 'Vacancy Report', 'Maintenance Summary', 'Owner Statement']
  const exportFormats = [
    { label: 'PDF', icon: FileText },
    { label: 'CSV', icon: Download },
    { label: 'Excel', icon: BarChart3 },
    { label: 'QuickBooks', icon: Sparkles },
  ]

  return (
    <SW id="custom-reports">
      <SH eyebrow="Reporting" title="Build and schedule" highlight="custom reports" description="Generate any report on demand or schedule automatic delivery. Export to PDF, CSV, Excel, or directly to your accounting software." />
      <div ref={ref} className="mx-auto mt-12 max-w-3xl">
        <Anim delay={0.15}>
          <BrowserChrome url="app.revun.com/reports/builder">
            <div className="p-5">
              {/* Report type */}
              <div className="mb-5">
                <p className="text-[11px] font-semibold text-[#555860] mb-2">Report Type</p>
                <div className="flex flex-wrap gap-2">
                  {reportTypes.map((r, i) => (
                    <motion.div key={r}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, ease, delay: 0.3 + i * 0.05 }}
                      className={`rounded-lg px-3 py-1.5 text-[11px] font-medium cursor-default ${i === 0 ? 'bg-[#176FEB] text-white' : 'border border-[#E5E7EB] text-[#555860] hover:border-[#176FEB]/30'}`}
                    >{r}</motion.div>
                  ))}
                </div>
              </div>

              {/* Date range */}
              <div className="mb-5">
                <p className="text-[11px] font-semibold text-[#555860] mb-2">Date Range</p>
                <div className="flex gap-3">
                  <div className="flex items-center gap-2 rounded-lg border border-[#E5E7EB] px-3 py-2">
                    <Calendar className="h-3.5 w-3.5 text-[#176FEB]" />
                    <span className="text-[11px] text-[#0A1628]">Jan 1, 2026</span>
                  </div>
                  <span className="flex items-center text-[11px] text-[#555860]">to</span>
                  <div className="flex items-center gap-2 rounded-lg border border-[#E5E7EB] px-3 py-2">
                    <Calendar className="h-3.5 w-3.5 text-[#176FEB]" />
                    <span className="text-[11px] text-[#0A1628]">Mar 31, 2026</span>
                  </div>
                </div>
              </div>

              {/* Export formats */}
              <div className="mb-5">
                <p className="text-[11px] font-semibold text-[#555860] mb-2">Export Format</p>
                <div className="flex gap-2">
                  {exportFormats.map((f, i) => (
                    <motion.div key={f.label}
                      initial={{ opacity: 0, y: 6 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.3, ease, delay: 0.5 + i * 0.06 }}
                      className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-[11px] font-medium cursor-default ${i === 0 ? 'bg-[#176FEB] text-white' : 'border border-[#E5E7EB] text-[#555860] hover:border-[#176FEB]/30'}`}
                    >
                      <f.icon className="h-3 w-3" />{f.label}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Schedule toggle */}
              <motion.div initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, ease, delay: 0.65 }}
                className="flex items-center justify-between rounded-xl bg-[#F5F6F8] p-4 mb-5">
                <div>
                  <p className="text-[12px] font-semibold text-[#0A1628]">Auto-send weekly to owners</p>
                  <p className="text-[10px] text-[#555860]">Reports delivered every Monday at 9:00 AM</p>
                </div>
                <div className="h-6 w-10 rounded-full bg-[#176FEB] flex items-center justify-end px-0.5">
                  <div className="h-5 w-5 rounded-full bg-white shadow-sm" />
                </div>
              </motion.div>

              {/* Preview */}
              <motion.div initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, ease, delay: 0.75 }}
                className="rounded-xl border border-[#E5E7EB] p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-[#176FEB]" />
                    <span className="text-[12px] font-semibold text-[#0A1628]">Income Statement Preview</span>
                  </div>
                  <span className="text-[10px] text-[#555860]">Q1 2026</span>
                </div>
                <div className="space-y-2">
                  {[
                    { label: 'Gross Rental Income', value: '$384,200', bold: true },
                    { label: 'Operating Expenses', value: '($142,800)', color: '#EF4444' },
                    { label: 'Net Operating Income', value: '$241,400', color: '#22C55E', bold: true },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between py-1.5 border-b border-[#E5E7EB] last:border-b-0">
                      <span className={`text-[11px] ${row.bold ? 'font-semibold text-[#0A1628]' : 'text-[#555860]'}`}>{row.label}</span>
                      <span className={`text-[12px] font-semibold`} style={{ color: row.color || '#0A1628' }}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </BrowserChrome>
        </Anim>
      </div>
    </SW>
  )
}

/* ── Section 10: CTA ─────────────────────────────────────────────── */

function CTASection() {
  return (
    <section id="cta" className="bg-[#F5F6F8] py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <RevealOnScroll stagger={0.12}>
          <motion.p variants={revealItem} className="text-sm font-heading font-semibold uppercase tracking-wider text-brand-blue">Get Started</motion.p>
          <motion.h2 variants={revealItem} className="mt-3 font-display text-3xl font-normal md:text-4xl text-brand-graphite">
            Full operational visibility<br /><span className="text-keyword">from day one</span>
          </motion.h2>
          <motion.p variants={revealItem} className="mx-auto mt-4 max-w-lg text-base text-[#555860]">
            Start your free trial today. No credit card required. See your entire portfolio in one unified dashboard within minutes.
          </motion.p>
          <motion.div variants={revealItem} className="mt-8 flex items-center justify-center gap-4">
            <Link href="/pricing/" className="inline-flex h-12 items-center justify-center rounded-xl bg-[#176FEB] px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#1260D6]">
              Start Free Trial
            </Link>
            <Link href="/contact/" className="inline-flex h-12 items-center gap-2 rounded-xl border border-[#E5E7EB] px-6 text-sm font-semibold text-[#0A1628] transition-colors duration-200 hover:bg-[#EAECF0]">
              Contact Sales <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

/* ── Main Export ──────────────────────────────────────────────────── */

export function DashboardsClient() {
  return (
    <>
      <Hero />
      <OperationsDashboard />
      <RoleBasedViews />
      <ActivityFeed />
      <PortfolioKPIs />
      <PropertyDrillDown />
      <MaintenanceDashboard />
      <LeasingPipeline />
      <CustomReports />
      <CTASection />
    </>
  )
}
