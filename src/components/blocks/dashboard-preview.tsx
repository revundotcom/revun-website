'use client'

import { motion } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import {
  LayoutGrid,
  BookOpen,
  Calendar,
  Users,
  BarChart3,
  Building2,
  Clock,
  Settings,
  Bell,
  LogOut,
  TrendingUp,
  Phone,
  AlertTriangle,
  UserPlus,
  CalendarDays,
  Wrench,
  PlusSquare,
  CalendarPlus,
  UserRoundPlus,
  CheckCircle2,
  Table2,
  ChevronDown,
  MessageCircle,
  Mail,
  PanelLeftClose,
  Sparkles,
  ShieldCheck,
} from 'lucide-react'

/* ── Revun Pro dashboard mockup ─────────────────────────────────────────── */

function RevunLogo() {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#0A1628] to-[#1a2f4e]">
      <div className="h-4 w-4 rounded-full border-2 border-white/90 border-t-transparent" />
    </div>
  )
}

const sidebarNav = [
  { icon: LayoutGrid, label: 'Dashboard' },
  { icon: BookOpen, label: 'Learn' },
  { icon: Calendar, label: 'Events' },
  { icon: Users, label: 'Contacts' },
  { icon: BarChart3, label: 'Reports' },
]

const manageNav = [
  { icon: Building2, label: 'Properties' },
  { icon: Clock, label: 'Requests' },
]

const statCards = [
  {
    label: 'Progress',
    value: '65%',
    sub: 'Completed calls',
    icon: TrendingUp,
    accent: '#176FEB',
    accentBg: 'bg-[#EEF4FE]',
    showBar: true,
  },
  {
    label: 'Calls Made',
    value: '15',
    sub: 'Completed calls',
    icon: Phone,
    accent: '#176FEB',
    accentBg: 'bg-[#EEF4FE]',
  },
  {
    label: 'Overdue',
    value: '2',
    sub: 'Pending dues',
    icon: AlertTriangle,
    accent: '#10B981',
    accentBg: 'bg-[#E8F8F1]',
  },
  {
    label: 'Active Leads',
    value: '3',
    sub: 'Needs follow-up',
    icon: UserPlus,
    accent: '#8B5CF6',
    accentBg: 'bg-[#F1EBFE]',
  },
  {
    label: 'Events Today',
    value: '2',
    sub: 'Scheduled appointments',
    icon: CalendarDays,
    accent: '#F59E0B',
    accentBg: 'bg-[#FEF3E2]',
  },
]

const quickActions = [
  { icon: Wrench, label: 'Create Work Order' },
  { icon: PlusSquare, label: 'List a Property' },
  { icon: CalendarPlus, label: 'Schedule Showing' },
  { icon: UserRoundPlus, label: 'Create Contact' },
]

const activityTiles = [
  { icon: Table2, label: 'Tasks', value: '0', color: '#176FEB', selected: true },
  { icon: Calendar, label: 'Meetings', value: '174', color: '#10B981' },
  { icon: Phone, label: 'Calls', value: '0', color: '#8B5CF6' },
  { icon: MessageCircle, label: 'Chats', value: '27', color: '#F59E0B' },
  { icon: Mail, label: 'Email', value: '5', color: '#EF4444' },
]

function DashboardMockup() {
  return (
    <div className="relative grid grid-cols-[220px_1fr] bg-white">
      {/* ── Sidebar ───────────────────────────────────────────── */}
      <aside className="flex min-h-[620px] flex-col border-r border-[#EEF0F3] bg-white px-3 py-4">
        {/* Logo row */}
        <div className="flex items-center justify-between px-2 pb-5">
          <div className="flex items-center gap-2">
            <RevunLogo />
            <span className="font-heading text-[13px] font-semibold text-[#0A1628]">
              Revun Pro
            </span>
          </div>
          <PanelLeftClose className="h-3.5 w-3.5 text-[#9097A3]" />
        </div>

        {/* Main nav */}
        <nav className="flex flex-col gap-0.5">
          {sidebarNav.map((item, i) => (
            <div
              key={item.label}
              className={`flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[12px] ${
                i === 0
                  ? 'bg-[#F5F6F8] font-medium text-[#0A1628]'
                  : 'text-[#555860] hover:bg-[#F5F6F8]'
              }`}
            >
              <item.icon className="h-3.5 w-3.5" />
              {item.label}
            </div>
          ))}
        </nav>

        {/* MANAGE section */}
        <div className="mt-5 px-2.5 pb-1.5 text-[9px] font-heading font-semibold uppercase tracking-wider text-[#9097A3]">
          Manage
        </div>
        <nav className="flex flex-col gap-0.5">
          {manageNav.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[12px] text-[#555860] hover:bg-[#F5F6F8]"
            >
              <span className="flex items-center gap-2.5">
                <item.icon className="h-3.5 w-3.5" />
                {item.label}
              </span>
              <ChevronDown className="h-3 w-3 text-[#9097A3]" />
            </div>
          ))}
        </nav>

        {/* SYSTEM section */}
        <div className="mt-5 px-2.5 pb-1.5 text-[9px] font-heading font-semibold uppercase tracking-wider text-[#9097A3]">
          System
        </div>
        <nav className="flex flex-col gap-0.5">
          <div className="flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[12px] text-[#555860] hover:bg-[#F5F6F8]">
            <span className="flex items-center gap-2.5">
              <Settings className="h-3.5 w-3.5" />
              Settings
            </span>
            <ChevronDown className="h-3 w-3 text-[#9097A3]" />
          </div>
        </nav>

        <div className="flex-1" />

        {/* Footer user */}
        <div className="mt-5 border-t border-[#EEF0F3] pt-3">
          <div className="flex items-center gap-2.5 px-1.5">
            <div className="relative">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0A1628] text-[10px] font-semibold text-white">
                S
              </div>
              <span className="absolute bottom-0 right-0 h-1.5 w-1.5 rounded-full bg-[#10B981] ring-[1.5px] ring-white" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#0A1628]">Super Admin</p>
              <p className="text-[9px] uppercase tracking-wider text-[#9097A3]">Admin</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 px-1.5 text-[11px] text-[#555860]">
            <LogOut className="h-3 w-3" />
            Logout
          </div>
        </div>
      </aside>

      {/* ── Main content ──────────────────────────────────────── */}
      <main className="flex min-h-[620px] flex-col bg-[#FAFBFC]">
        {/* Top bar */}
        <div className="flex items-center justify-end gap-3 border-b border-[#EEF0F3] bg-white px-6 py-3">
          <div className="relative">
            <Bell className="h-4 w-4 text-[#555860]" />
            <span className="absolute -right-1.5 -top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#E7000B] text-[8px] font-bold text-white">
              2
            </span>
          </div>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0A1628] text-[10px] font-semibold text-white">
            SA
          </div>
        </div>

        {/* Page padding */}
        <div className="flex flex-col gap-4 p-5">
          {/* Tabs */}
          <div className="flex items-center gap-2">
            <button className="rounded-md bg-[#0A1628] px-3 py-1.5 text-[11px] font-semibold text-white">
              Overview
            </button>
            <button className="rounded-md bg-white px-3 py-1.5 text-[11px] font-medium text-[#555860] ring-1 ring-[#EEF0F3]">
              Focus Mode
            </button>
            <button className="rounded-md bg-white px-3 py-1.5 text-[11px] font-medium text-[#555860] ring-1 ring-[#EEF0F3]">
              Performance
            </button>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-5 gap-2.5">
            {statCards.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                className="relative overflow-hidden rounded-lg border border-[#EEF0F3] bg-white p-3"
              >
                <div className="flex items-start justify-between">
                  <div className="min-w-0">
                    <p className="text-[10px] font-medium text-[#9097A3]">{card.label}</p>
                    <p
                      className="mt-1 font-heading text-xl font-bold leading-none"
                      style={{ color: card.accent }}
                    >
                      {card.value}
                    </p>
                  </div>
                  <div
                    className={`${card.accentBg} flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md`}
                  >
                    <card.icon className="h-3.5 w-3.5" style={{ color: card.accent }} />
                  </div>
                </div>
                {card.showBar && (
                  <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-[#EEF0F3]">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '65%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, delay: 0.4, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: card.accent }}
                    />
                  </div>
                )}
                <p className="mt-1.5 text-[9px] text-[#9097A3]">{card.sub}</p>
              </motion.div>
            ))}
          </div>

          {/* Quick actions */}
          <div className="flex flex-wrap gap-2">
            {quickActions.map((a) => (
              <button
                key={a.label}
                className="flex items-center gap-2 rounded-lg border border-[#EEF0F3] bg-white px-3 py-2 text-[11px] font-medium text-[#0A1628] transition-colors hover:border-[#176FEB]/30 hover:bg-[#EEF4FE]/40"
              >
                <a.icon className="h-3.5 w-3.5 text-[#176FEB]" />
                {a.label}
              </button>
            ))}
          </div>

          {/* User card */}
          <div className="flex items-center justify-between rounded-xl border border-[#EEF0F3] bg-white px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0A1628] text-[11px] font-semibold text-white">
                SA
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-[12px] font-semibold text-[#0A1628]">Super Admin</p>
                  <span className="rounded-full bg-[#0A1628] px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white">
                    Admin
                  </span>
                </div>
                <p className="text-[10px] text-[#9097A3]">admin@rypm.com</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-[#EEF0F3] px-3 py-1.5">
              <Users className="h-3.5 w-3.5 text-[#555860]" />
              <span className="text-[11px] text-[#555860]">Super Admin</span>
              <ChevronDown className="h-3 w-3 text-[#9097A3]" />
            </div>
          </div>

          {/* Activities */}
          <div className="rounded-xl border border-[#EEF0F3] bg-white p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEF4FE]">
                  <CheckCircle2 className="h-4 w-4 text-[#176FEB]" />
                </div>
                <div>
                  <h4 className="font-heading text-[14px] font-bold text-[#0A1628]">Activities</h4>
                  <p className="text-[10px] text-[#9097A3]">
                    Track and manage your pending tasks
                  </p>
                </div>
              </div>
              <button className="flex items-center gap-1.5 rounded-lg bg-[#0A1628] px-2.5 py-1.5 text-[10px] font-semibold text-white">
                <Table2 className="h-3 w-3" />
                Add Task
              </button>
            </div>

            {/* Activity tiles */}
            <div className="mt-4 grid grid-cols-5 gap-2">
              {activityTiles.map((t, i) => (
                <motion.div
                  key={t.label}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.5 + i * 0.05 }}
                  className={`relative flex items-start gap-2 rounded-lg p-3 transition-colors ${
                    t.selected
                      ? 'bg-white ring-2 ring-[#176FEB]'
                      : 'bg-white ring-1 ring-[#EEF0F3]'
                  }`}
                >
                  <div
                    className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md"
                    style={{ backgroundColor: `${t.color}14` }}
                  >
                    <t.icon className="h-3 w-3" style={{ color: t.color }} />
                  </div>
                  <div>
                    <p className="text-[10px] text-[#9097A3]">{t.label}</p>
                    <p
                      className="font-heading text-lg font-bold leading-none"
                      style={{ color: t.color }}
                    >
                      {t.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Empty state */}
            <div className="mt-4 flex flex-col items-center justify-center py-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F5F6F8]">
                <Table2 className="h-5 w-5 text-[#9097A3]" />
              </div>
            </div>
          </div>
        </div>

        {/* Floating chat bubble */}
        <div className="absolute bottom-5 right-5 flex h-8 w-8 items-center justify-center rounded-full bg-[#0A1628] shadow-[0_8px_20px_-6px_rgba(10,22,40,0.3)]">
          <MessageCircle className="h-3.5 w-3.5 text-white" />
        </div>
      </main>
    </div>
  )
}

/* ── Browser chrome frame ───────────────────────────────────────────────── */

function BrowserFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E3E6EC] bg-white shadow-[0_40px_80px_-30px_rgba(10,22,40,0.25),0_10px_30px_-15px_rgba(10,22,40,0.12)]">
      {/* Chrome bar */}
      <div className="flex items-center gap-3 border-b border-[#EEF0F3] bg-[#F8F9FB] px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="mx-auto flex max-w-md flex-1 items-center gap-2 rounded-md bg-white px-3 py-1 text-[11px] text-[#9097A3] ring-1 ring-[#EEF0F3]">
          <ShieldCheck className="h-3 w-3 text-[#10B981]" />
          <span>app.revun.com/dashboard</span>
        </div>
      </div>
      {children}
    </div>
  )
}

/* ── Section ────────────────────────────────────────────────────────────── */

export default function DashboardPreview() {
  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      {/* Background decor */}
      <div
        className="absolute inset-0 bg-grid bg-grid-mask opacity-[0.035]"
        aria-hidden="true"
      />
      <div
        className="absolute left-1/2 top-[20%] h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[#176FEB]/[0.05] blur-[140px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Intro */}
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <motion.div
            variants={revealItem}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1 text-[11px] font-heading font-semibold uppercase tracking-wider text-brand-blue shadow-sm"
          >
            <Sparkles className="h-3 w-3" />
            The Revun Pro Dashboard
          </motion.div>
          <motion.h2
            variants={revealItem}
            className="mt-4 font-display text-4xl font-normal leading-[1.1] tracking-tight text-[#0A1628] md:text-5xl lg:text-6xl"
          >
            A command center that{' '}
            <span className="text-keyword">sees everything</span>
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-brand-graphite-mid"
          >
            Progress, calls, leads, events, work orders, and conversations: every
            signal from your property business in one live view, built for operators
            who need answers in seconds.
          </motion.p>
        </RevealOnScroll>

        {/* Browser-framed dashboard */}
        <RevealOnScroll className="relative mt-16">
          <motion.div variants={revealItem} className="relative">
            {/* Floating feature callouts */}
            <motion.div
              initial={{ opacity: 0, x: -12, y: 6 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pointer-events-none absolute -left-4 top-[22%] z-20 hidden lg:block"
            >
              <div className="relative rounded-xl border border-[#EEF0F3] bg-white px-4 py-3 shadow-[0_10px_30px_-10px_rgba(10,22,40,0.15)]">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#EEF4FE]">
                    <TrendingUp className="h-3 w-3 text-[#176FEB]" />
                  </div>
                  <p className="text-[11px] font-semibold text-[#0A1628]">
                    Real-time KPIs
                  </p>
                </div>
                <p className="mt-1 max-w-[150px] text-[10px] leading-snug text-[#555860]">
                  Every metric updates live, no refresh, no waiting.
                </p>
                <span className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 border-r border-t border-[#EEF0F3] bg-white" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 12, y: 6 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="pointer-events-none absolute -right-4 top-[52%] z-20 hidden lg:block"
            >
              <div className="relative rounded-xl border border-[#EEF0F3] bg-white px-4 py-3 shadow-[0_10px_30px_-10px_rgba(10,22,40,0.15)]">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#F1EBFE]">
                    <CheckCircle2 className="h-3 w-3 text-[#8B5CF6]" />
                  </div>
                  <p className="text-[11px] font-semibold text-[#0A1628]">
                    One-click actions
                  </p>
                </div>
                <p className="mt-1 max-w-[150px] text-[10px] leading-snug text-[#555860]">
                  Create work orders, list properties, book showings in seconds.
                </p>
                <span className="absolute -left-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 border-b border-l border-[#EEF0F3] bg-white" />
              </div>
            </motion.div>

            <BrowserFrame>
              <DashboardMockup />
            </BrowserFrame>
          </motion.div>
        </RevealOnScroll>

        {/* Feature strip below */}
        <RevealOnScroll className="mt-12 grid gap-4 sm:grid-cols-3" stagger={0.08}>
          {[
            {
              icon: TrendingUp,
              title: 'Live progress & performance',
              desc: 'Track completion rates, pending dues, and daily wins without switching tabs.',
            },
            {
              icon: UserPlus,
              title: 'Leads, tenants, and owners',
              desc: 'One contact record unifies CRM, communications, and lifecycle context.',
            },
            {
              icon: CheckCircle2,
              title: 'Tasks, meetings, and chats',
              desc: 'Every activity rolls up so nothing falls through the cracks.',
            },
          ].map((f) => (
            <motion.div
              key={f.title}
              variants={revealItem}
              className="rounded-2xl border border-border bg-white p-5"
            >
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-brand-blue/8">
                <f.icon className="h-4 w-4 text-brand-blue" />
              </div>
              <h3 className="font-heading text-base font-semibold text-[#0A1628]">
                {f.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-brand-graphite-mid">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  )
}

