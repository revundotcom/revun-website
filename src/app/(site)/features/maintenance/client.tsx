'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import {
  ArrowRight,
  Wrench,
  Clock,
  DollarSign,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Camera,
  FileText,
  MapPin,
  Calendar,
  Star,
  ThumbsUp,
  Sparkles,
  Shield,
  Image as ImageIcon,
  Navigation,
  MessageSquare,
} from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const

function SW({ children, id, dark }: { children: React.ReactNode; id: string; dark?: boolean }) {
  return (
    <section id={id} className={`py-16 md:py-20 ${dark ? 'bg-[#F5F6F8]' : 'bg-white'}`}>
      <div className="mx-auto max-w-6xl px-6">{children}</div>
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

/* Reusable pipeline stages */
function Pipeline({ active }: { active: number }) {
  const stages = ['Submitted', 'Authorized', 'In Progress', 'Completed']
  return (
    <div className="flex items-center gap-1 rounded-xl border border-[#E5E7EB] bg-white p-3">
      {stages.map((s, i) => (
        <div key={s} className={`flex flex-1 flex-col items-center gap-1.5 rounded-lg py-2.5 text-[10px] font-medium ${i === active ? 'bg-brand-blue text-white' : 'text-brand-graphite-mid'}`}>
          <div className={`flex h-6 w-6 items-center justify-center rounded-full ${i === active ? 'bg-white/20' : 'bg-brand-off-white'}`}>
            {i === 0 && <Clock className="h-3 w-3" />}
            {i === 1 && <ThumbsUp className="h-3 w-3" />}
            {i === 2 && <Wrench className="h-3 w-3" />}
            {i === 3 && <CheckCircle2 className="h-3 w-3" />}
          </div>
          {s}
        </div>
      ))}
    </div>
  )
}

/* ── Section 1: Scope of Work ─────────────────────────────────────── */

function ScopeOfWork() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <SW id="scope">
      <SH eyebrow="Work Orders" title="Scope" highlight="of Work" description="View the proposed scope, estimated time, and cost before any action is taken." />
      <div ref={ref} className="mt-12 mx-auto max-w-2xl">
        <motion.div className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden" initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.1 }}>
          <div className="border-b border-[#E5E7EB] px-6 py-4">
            <h3 className="font-heading text-base font-semibold text-brand-graphite">Maintenance Request</h3>
          </div>
          <div className="px-6 py-4"><Pipeline active={0} /></div>

          <div className="px-6 pb-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-heading text-lg font-bold text-brand-graphite">Plumbing</h4>
              <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-500">High Priority</span>
            </div>

            <h5 className="font-heading text-sm font-semibold text-brand-graphite mb-2">Scope of Work</h5>
            <div className="rounded-xl bg-brand-off-white p-4 mb-6">
              <p className="text-sm text-brand-graphite-mid leading-relaxed">
                The toilet in the bathroom is severely clogged and overflowing, creating a messy situation that requires immediate attention. This issue needs to be addressed promptly to maintain a safe and comfortable living environment.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="rounded-xl border border-[#E5E7EB] p-4 text-center">
                <Clock className="mx-auto mb-1.5 h-5 w-5 text-brand-blue" />
                <p className="text-xs text-brand-graphite-mid">Estimated time</p>
                <p className="font-heading text-lg font-bold text-brand-graphite">1.5 - 2</p>
                <p className="text-[10px] text-brand-graphite-mid">hours</p>
              </div>
              <div className="rounded-xl border border-[#E5E7EB] p-4 text-center">
                <DollarSign className="mx-auto mb-1.5 h-5 w-5 text-brand-blue" />
                <p className="text-xs text-brand-graphite-mid">Cost</p>
                <p className="font-heading text-lg font-bold text-brand-graphite">$150.00</p>
                <p className="text-[10px] text-brand-graphite-mid">+ HST</p>
              </div>
            </div>
            <p className="text-xs text-brand-graphite-mid text-center">Price based on similar jobs in your area</p>
          </div>
        </motion.div>
      </div>
    </SW>
  )
}

/* ── Section 2: Easy Request Repair ───────────────────────────────── */

function EasyRequest() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <SW id="request" dark>
      <SH eyebrow="Submit" title="Easy Request" highlight="Repair" description="A request is submitted by you or the tenant, including details, photos, or video." />
      <div ref={ref} className="mt-12 mx-auto max-w-2xl">
        <motion.div className="rounded-2xl border border-[#E5E7EB] bg-white p-6" initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.1 }}>
          <div className="border-b border-[#E5E7EB] pb-4 mb-5">
            <h3 className="font-heading text-base font-semibold text-brand-graphite">New Request</h3>
          </div>

          <h4 className="font-heading text-lg font-semibold text-brand-graphite mb-1">
            Issue <span className="text-brand-blue">Details</span>
          </h4>

          {/* Photo upload area */}
          <div className="my-5 rounded-xl bg-brand-off-white p-8 text-center">
            <Camera className="mx-auto h-8 w-8 text-brand-blue/30" />
            <p className="mt-2 text-xs text-brand-graphite-mid">Add photos or video of the issue</p>
          </div>

          <h5 className="font-heading text-sm font-semibold text-brand-graphite mb-2">Description</h5>
          <p className="text-sm text-brand-graphite-mid mb-4">Please submit one issue per request so we can send the right technician.</p>
          <p className="text-sm text-brand-graphite-mid mb-3">Describe what&apos;s going on. We&apos;ll take care of the rest.</p>

          <ul className="space-y-2 mb-4">
            {['Heat or AC not working', 'Electrical or appliance issue', 'Repair, damage, or cleaning needed'].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-brand-graphite-mid">
                <div className="h-1.5 w-1.5 rounded-full bg-brand-blue" /> {item}
              </li>
            ))}
          </ul>

          <div className="rounded-xl border border-[#E5E7EB] px-4 py-3">
            <span className="text-xs text-brand-graphite-light">0/500 characters</span>
          </div>
        </motion.div>
      </div>
    </SW>
  )
}

/* ── Section 3: AI Analyzes All Requests ──────────────────────────── */

function AIAnalysis() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <SW id="ai-analysis">
      <SH eyebrow="AI Triage" title="AI Analyzes" highlight="All Requests" description="The request is automatically reviewed to understand the issue, urgency, and category." />
      <div ref={ref} className="mt-12 mx-auto max-w-2xl">
        <motion.div className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden" initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.1 }}>
          <div className="border-b border-[#E5E7EB] px-6 py-4">
            <h3 className="font-heading text-base font-semibold text-brand-graphite">Maintenance Request</h3>
          </div>
          <div className="px-6 py-4"><Pipeline active={0} /></div>

          {/* AI analyzing animation */}
          <div className="mx-6 mb-6">
            <motion.div
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#E8F2FE] via-[#FFF9E6] to-[#E8FEF0] p-10 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, ease, delay: 0.3 }}
            >
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="h-5 w-5 text-brand-graphite" />
                <span className="font-heading text-lg font-semibold text-brand-graphite">Analyzing your input</span>
              </div>
            </motion.div>
          </div>

          {/* Reported issue */}
          <div className="px-6 pb-6">
            <h4 className="font-heading text-sm font-semibold text-brand-graphite mb-3">Reported Issue</h4>
            <div className="flex gap-2">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-16 w-16 rounded-lg bg-brand-off-white flex items-center justify-center">
                  <ImageIcon className="h-6 w-6 text-brand-graphite-light" />
                </div>
              ))}
              <div className="h-16 w-16 rounded-lg bg-brand-off-white flex items-center justify-center text-xs font-medium text-brand-graphite-mid">+2</div>
            </div>
          </div>
        </motion.div>
      </div>
    </SW>
  )
}

/* ── Section 4: Maintenance Overview ──────────────────────────────── */

const maintenanceStats = [
  { label: 'Completed', count: 22, color: '#176FEB' },
  { label: 'Pending', count: 8, color: '#F59E0B' },
  { label: 'Canceled', count: 0, color: '#E7000B' },
]

function MaintenanceOverview() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  /* Donut gauge */
  const size = 130; const sw = 10; const r = (size - sw) / 2; const c = 2 * Math.PI * r; const filled = (73 / 100) * c

  return (
    <SW id="overview" dark>
      <SH eyebrow="Dashboard" title="Maintenance" highlight="Overview" description="See all maintenance requests across your property and track their status in real time." />
      <div ref={ref} className="mt-12 grid gap-6 lg:grid-cols-12">
        {/* Left: Donut + stats */}
        <motion.div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 lg:col-span-5" initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.1 }}>
          <h3 className="mb-6 font-heading text-lg font-semibold text-brand-graphite">Request Summary</h3>
          <div className="flex items-center gap-6">
            <div className="relative">
              <svg width={size} height={size} className="-rotate-90 overflow-visible">
                <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E5E7EB" strokeWidth={sw} />
                <motion.circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#176FEB" strokeWidth={sw} strokeLinecap="round" strokeDasharray={c}
                  initial={{ strokeDashoffset: c }} animate={inView ? { strokeDashoffset: c - filled } : {}} transition={{ duration: 1.4, ease, delay: 0.3 }} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-heading text-2xl font-bold text-brand-graphite">30</span>
                <span className="text-[10px] text-brand-graphite-mid">Requests</span>
              </div>
            </div>
            <div className="flex-1 space-y-3">
              {maintenanceStats.map((s, i) => (
                <motion.div key={s.label} className="flex items-center justify-between" initial={{ opacity: 0, x: 8 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.4, ease, delay: 0.4 + i * 0.1 }}>
                  <span className="flex items-center gap-2 text-sm text-brand-graphite-mid">
                    {s.label === 'Completed' && <CheckCircle2 className="h-3.5 w-3.5" style={{ color: s.color }} />}
                    {s.label === 'Pending' && <AlertCircle className="h-3.5 w-3.5" style={{ color: s.color }} />}
                    {s.label === 'Canceled' && <XCircle className="h-3.5 w-3.5" style={{ color: s.color }} />}
                    {s.label}
                  </span>
                  <span className="rounded-md px-2 py-0.5 text-xs font-bold" style={{ backgroundColor: `${s.color}15`, color: s.color }}>
                    {s.count.toString().padStart(2, '0')}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
          <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-brand-blue bg-brand-blue/5 py-3 text-sm font-semibold text-brand-blue hover:bg-brand-blue hover:text-white transition-colors">
            Create Request
          </button>
        </motion.div>

        {/* Right: Pipeline + items */}
        <div className="space-y-4 lg:col-span-7">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease, delay: 0.2 }}>
            <Pipeline active={3} />
          </motion.div>
          {[
            { title: 'Plumbing', priority: 'High', status: 'In Progress', time: '01 hr ago' },
            { title: 'Electrical', priority: 'Medium', status: 'Submitted', time: '3 hrs ago' },
            { title: 'HVAC Filter', priority: 'Low', status: 'Completed', time: '1 day ago' },
          ].map((item, i) => (
            <motion.div key={item.title} className="flex items-center gap-4 rounded-xl border border-[#E5E7EB] bg-white p-5 hover:border-brand-blue/20" initial={{ opacity: 0, x: 12 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.4, ease, delay: 0.35 + i * 0.1 }}>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10"><Wrench className="h-5 w-5 text-brand-blue" /></div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-heading text-sm font-semibold text-brand-graphite">{item.title}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${item.priority === 'High' ? 'bg-red-50 text-red-500' : item.priority === 'Medium' ? 'bg-[#F59E0B]/10 text-[#F59E0B]' : 'bg-brand-off-white text-brand-graphite-mid'}`}>{item.priority} Priority</span>
                </div>
                <p className="mt-0.5 text-xs text-brand-graphite-mid">{item.time}</p>
              </div>
              <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${item.status === 'Completed' ? 'bg-[#176FEB]/15 text-[#176FEB]' : item.status === 'In Progress' ? 'bg-brand-blue/10 text-brand-blue' : 'bg-[#F59E0B]/15 text-[#F59E0B]'}`}>{item.status}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </SW>
  )
}

/* ── Section 5: Approve Or Decline Request ────────────────────────── */

function ApproveDecline() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <SW id="approve">
      <SH eyebrow="Owner Control" title="Approve Or Decline" highlight="Request" description="You choose to approve, decline, or request changes. No work starts without your approval." />
      <div ref={ref} className="mt-12 mx-auto max-w-2xl">
        <motion.div className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden" initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.1 }}>
          <div className="border-b border-[#E5E7EB] px-6 py-4"><h3 className="font-heading text-base font-semibold text-brand-graphite">Maintenance Request</h3></div>
          <div className="px-6 py-4"><Pipeline active={0} /></div>

          <div className="px-6 pb-4">
            <div className="rounded-xl bg-brand-off-white p-4 text-sm text-brand-graphite-mid leading-relaxed">
              The toilet in the bathroom is severely clogged and overflowing, creating a messy situation that requires immediate attention.
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-[#E5E7EB] p-3 text-center">
                <Clock className="mx-auto mb-1 h-4 w-4 text-brand-blue" />
                <p className="text-xs text-brand-graphite-mid">Estimated time</p>
                <p className="font-heading text-base font-bold text-brand-graphite">1.5 - 2 hours</p>
              </div>
              <div className="rounded-xl border border-[#E5E7EB] p-3 text-center">
                <DollarSign className="mx-auto mb-1 h-4 w-4 text-brand-blue" />
                <p className="text-xs text-brand-graphite-mid">Cost</p>
                <p className="font-heading text-base font-bold text-brand-graphite">$150.00 <span className="text-[10px] font-normal text-brand-graphite-mid">+ HST</span></p>
              </div>
            </div>
            <p className="mt-2 text-xs text-brand-graphite-mid text-center">Price based on similar jobs in your area</p>
          </div>

          {/* Reporter */}
          <div className="border-t border-[#E5E7EB] px-6 py-4">
            <p className="text-xs text-brand-graphite-mid mb-2">Reported Issue</p>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue/10"><Wrench className="h-4 w-4 text-brand-blue" /></div>
              <div><p className="text-sm font-medium text-brand-graphite">Mark A</p><p className="text-[10px] text-brand-graphite-mid">Created</p></div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex border-t border-[#E5E7EB]">
            <button className="flex-1 py-4 text-center text-sm font-semibold text-brand-graphite-mid hover:bg-brand-off-white transition-colors">Decline</button>
            <button className="flex-1 bg-brand-blue py-4 text-center text-sm font-semibold text-white hover:bg-brand-blue-dark transition-colors">Approve</button>
          </div>
        </motion.div>
      </div>
    </SW>
  )
}

/* ── Section 6: Complete with Satisfaction ─────────────────────────── */

function CompleteSatisfaction() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <SW id="complete" dark>
      <SH eyebrow="Proof of Work" title="Complete" highlight="with Satisfaction" description="Review before-and-after photos and technician notes once the job is finished." />
      <div ref={ref} className="mt-12 mx-auto max-w-2xl">
        <motion.div className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden" initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.1 }}>
          <div className="border-b border-[#E5E7EB] px-6 py-4"><h3 className="font-heading text-base font-semibold text-brand-graphite">Maintenance Request</h3></div>
          <div className="px-6 py-4"><Pipeline active={3} /></div>

          <div className="px-6 pb-6">
            <h4 className="font-heading text-base font-semibold text-brand-graphite mb-4">Scope of Work</h4>

            {/* Before photos */}
            <p className="text-sm font-medium text-brand-graphite mb-2">Before</p>
            <div className="flex gap-2 mb-5">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-20 w-20 rounded-lg bg-brand-off-white flex items-center justify-center"><ImageIcon className="h-6 w-6 text-brand-graphite-light" /></div>
              ))}
            </div>

            {/* After photos */}
            <p className="text-sm font-medium text-brand-graphite mb-2">After</p>
            <div className="flex gap-2 mb-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-20 w-20 rounded-lg bg-[#E8F2FE] flex items-center justify-center"><CheckCircle2 className="h-6 w-6 text-brand-blue/40" /></div>
              ))}
            </div>

            {/* Closing notes */}
            <h5 className="font-heading text-sm font-semibold text-brand-graphite mb-2">Closing Notes</h5>
            <div className="rounded-xl bg-brand-off-white p-4">
              <p className="text-sm text-brand-graphite-mid leading-relaxed">
                The issue has been successfully resolved. The toilet was snaked to clear the blockage and restore proper drainage. Before and after photos have been provided for reference. No further issues expected.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </SW>
  )
}

/* ── Section 7: Job in Progress ───────────────────────────────────── */

function JobInProgress() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <SW id="tracking">
      <SH eyebrow="Live Tracking" title="Job in" highlight="Progress" description="Track the technician's route, timing, and job status as the work is completed." />
      <div ref={ref} className="mt-12 mx-auto max-w-2xl">
        <motion.div className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden" initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.1 }}>
          {/* Map placeholder */}
          <div className="relative h-56 bg-gradient-to-br from-[#E8F2FE] to-[#F5F6F8]">
            <div className="absolute inset-0 flex items-center justify-center">
              <Navigation className="h-10 w-10 text-brand-blue/30" />
            </div>
            <div className="absolute top-3 right-3 flex gap-2">
              <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-brand-graphite shadow-sm">Safety</span>
            </div>
            <div className="absolute bottom-3 right-3">
              <span className="rounded-full bg-[#22C55E] px-3 py-1 text-xs font-medium text-white">Share location</span>
            </div>
          </div>

          {/* Service details */}
          <div className="px-6 py-5">
            <h4 className="font-heading text-base font-semibold text-brand-graphite mb-4">Service Details</h4>
            <div className="space-y-3">
              {[
                { icon: Wrench, label: 'Plumbing Work Order' },
                { icon: MapPin, label: '704-75 Portland St, Mississauga, ON' },
                { icon: Calendar, label: 'Thursday, May 14, 2025' },
                { icon: Clock, label: '10:30 AM - 1:30 PM' },
              ].map((d) => (
                <div key={d.label} className="flex items-center gap-3">
                  <d.icon className="h-4 w-4 text-brand-blue" />
                  <span className="text-sm text-brand-graphite">{d.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </SW>
  )
}

/* ── Section 8: Rate the Service ──────────────────────────────────── */

function RateService() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <SW id="rate" dark>
      <SH eyebrow="Feedback" title="Rate" highlight="the Service" description="Leave feedback on the technician to maintain quality and accountability." />
      <div ref={ref} className="mt-12 mx-auto max-w-sm">
        <motion.div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 text-center" initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.1 }}>
          {/* Technician profile */}
          <div className="flex flex-col items-center mb-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-blue/10 mb-3">
              <Wrench className="h-8 w-8 text-brand-blue/40" />
            </div>
            <h4 className="font-heading text-lg font-bold text-brand-graphite">Morgan J</h4>
            <p className="text-xs text-brand-graphite-mid">Plumber</p>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-6 mb-6">
            <div className="text-center"><p className="font-heading text-base font-bold text-brand-graphite">4.7</p><p className="text-[10px] text-brand-graphite-mid">Rating</p></div>
            <div className="text-center"><p className="font-heading text-base font-bold text-brand-graphite">1358</p><p className="text-[10px] text-brand-graphite-mid">Points</p></div>
            <div className="text-center"><p className="font-heading text-base font-bold text-brand-graphite">28</p><p className="text-[10px] text-brand-graphite-mid">Jobs</p></div>
          </div>

          {/* Rating */}
          <h5 className="font-heading text-sm font-bold text-brand-graphite mb-1">Tell us your experience!</h5>
          <p className="text-xs text-brand-graphite-mid mb-4">Was the owner polite, respectful, and professionally presented?</p>

          <div className="flex justify-center gap-1.5 mb-6">
            {[1, 2, 3, 4].map((n) => (
              <Star key={n} className="h-8 w-8 text-[#F59E0B] fill-[#F59E0B]" />
            ))}
            <Star className="h-8 w-8 text-[#E5E7EB]" />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {['Friendly & Helpful', 'On-time', 'Fixed in first visit', 'Late'].map((tag, i) => (
              <span key={tag} className={`rounded-full border px-3 py-1.5 text-xs font-medium ${i < 2 ? 'border-brand-blue text-brand-blue bg-brand-blue/5' : 'border-[#E5E7EB] text-brand-graphite-mid'}`}>{tag}</span>
            ))}
          </div>

          <Link href="/signup/" className="flex w-full items-center justify-center rounded-xl bg-brand-blue py-3.5 text-sm font-semibold text-white hover:bg-brand-blue-dark transition-colors">
            Get Started
          </Link>
        </motion.div>
      </div>
    </SW>
  )
}

/* ── Hero ─────────────────────────────────────────────────────────── */

function MaintenanceHero() {
  return (
    <section className="relative overflow-hidden bg-white pb-12 pt-28 md:pt-36">
      <div className="absolute inset-0 bg-grid bg-grid-mask opacity-40" aria-hidden="true" />
      <div className="absolute top-0 right-[-200px] h-[500px] w-[500px] rounded-full bg-brand-blue/[0.04] blur-[120px]" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <RevealOnScroll>
          <motion.div variants={revealItem} className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-1.5 shadow-sm">
            <Wrench className="h-4 w-4 text-brand-blue" /><span className="text-sm font-medium text-brand-graphite-mid">Maintenance</span>
          </motion.div>
          <motion.h1 variants={revealItem} className="font-display text-5xl font-normal leading-[1.1] tracking-tight text-brand-graphite md:text-7xl">
            Maintenance that{' '}<span className="text-brand-blue">runs itself</span>
          </motion.h1>
          <motion.p variants={revealItem} className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-brand-graphite-mid md:text-xl">
            AI-powered triage, scope of work estimates, owner approvals, live technician tracking, before-and-after proof, and service ratings — from request to resolution.
          </motion.p>
          <motion.div variants={revealItem} className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/signup/" className="inline-flex h-14 items-center justify-center rounded-xl bg-brand-blue px-8 text-base font-semibold text-white hover:bg-brand-blue-dark">Get Started Free</Link>
            <Link href="/demo/" className="inline-flex h-14 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-8 text-base font-semibold text-brand-graphite hover:border-brand-blue/30 hover:shadow-sm">Book a Demo</Link>
          </motion.div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

/* ── Assembly ─────────────────────────────────────────────────────── */

export function MaintenanceClient() {
  return (
    <>
      <MaintenanceHero />
      <ScopeOfWork />
      <EasyRequest />
      <AIAnalysis />
      <MaintenanceOverview />
      <ApproveDecline />
      <CompleteSatisfaction />
      <JobInProgress />
      <RateService />
      <p className="sr-only">
        Revun Maintenance provides a complete maintenance workflow for property owners and managers. Features include scope of work with estimated time and cost, easy request submission with photos and video, AI-powered request analysis for urgency and category classification, maintenance overview dashboard with 30 requests tracked across completed, pending, and canceled statuses, owner approve or decline controls, before-and-after photo proof of completion with technician closing notes, live job tracking with technician route and timing, and service rating with feedback tags for quality accountability. Technician profiles show rating, points, and job count.
      </p>
    </>
  )
}
