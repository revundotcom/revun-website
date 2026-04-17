'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import {
  FileText, Wrench, MessageSquare, CreditCard, ShieldCheck,
  BarChart3, Bot, UserCircle, KeyRound,
} from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

const CX = 350, CY = 350, R = 280, SIZE = 700

const nodes = [
  { label: 'Leasing',        href: '/features/lease-management/', angle: -90,  icon: FileText,      color: '#176FEB' },
  { label: 'Maintenance',    href: '/features/maintenance/',      angle: -50,  icon: Wrench,        color: '#F59E0B' },
  { label: 'Tenant Portal',  href: '/features/tenant-portal/',    angle: -10,  icon: KeyRound,      color: '#14B8A6' },
  { label: 'Communications', href: '/features/communications/',   angle: 30,   icon: MessageSquare, color: '#8B5CF6' },
  { label: 'Payments',       href: '/features/rent-collection/',  angle: 70,   icon: CreditCard,    color: '#22C55E' },
  { label: 'Compliance',     href: '/features/compliance/',       angle: 110,  icon: ShieldCheck,    color: '#EF4444' },
  { label: 'Reporting',      href: '/features/accounting/',       angle: 150,  icon: BarChart3,     color: '#06B6D4' },
  { label: 'AI Automation',  href: '/features/ai-automation/',    angle: 190,  icon: Bot,           color: '#EC4899' },
  { label: 'Owner Portal',   href: '/features/owner-portal/',     angle: 230,  icon: UserCircle,    color: '#F97316' },
].map((n) => {
  const rad = (n.angle * Math.PI) / 180
  return {
    ...n,
    svgX: Math.round(CX + R * Math.cos(rad)),
    svgY: Math.round(CY + R * Math.sin(rad)),
    pctX: +((( CX + R * Math.cos(rad)) / SIZE) * 100).toFixed(2),
    pctY: +((( CY + R * Math.sin(rad)) / SIZE) * 100).toFixed(2),
  }
})

const spring = { type: 'spring' as const, stiffness: 220, damping: 15 }

function WorkflowMap() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[700px]">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full h-auto" aria-label="Revun ecosystem workflow map">
        <defs>
          <linearGradient id="orbit-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#176FEB" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#22C55E" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* Orbit rings */}
        <motion.circle cx={CX} cy={CY} r={R} fill="none" stroke="url(#orbit-grad)" strokeWidth={1.5} strokeDasharray="8 6"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.2 }} />
        <motion.circle cx={CX} cy={CY} r={R * 0.55} fill="none" stroke="url(#orbit-grad)" strokeWidth={1} strokeDasharray="4 8"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 0.5 } : {}} transition={{ duration: 0.8, delay: 0.3 }} />

        {/* Spoke lines */}
        {nodes.map((n, i) => (
          <motion.line key={n.label} x1={CX} y1={CY} x2={n.svgX} y2={n.svgY}
            stroke={n.color} strokeWidth={1.5} strokeOpacity={0.25}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 + i * 0.06 }} />
        ))}

        {/* Pulse rings */}
        {[0, 1, 2].map((ring) => (
          <motion.circle key={ring} cx={CX} cy={CY} r={50} fill="none" stroke="#176FEB" strokeWidth={1}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: [0, 0.2, 0], r: [50, 140, 140] } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeOut', delay: 1.5 + ring }} />
        ))}
      </svg>

      {/* Center hub */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#176FEB] to-[#0B5AD4] shadow-[0_0_40px_rgba(23,111,235,0.35)]"
        initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}} transition={{ delay: 0.1, ...spring }}
      >
        <div className="flex h-[84px] w-[84px] items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-[#176FEB] to-[#0B5AD4]">
          <span className="font-heading text-base font-bold text-white tracking-wide">Revun</span>
        </div>
      </motion.div>

      {/* Node cards */}
      {nodes.map((n, i) => {
        const Icon = n.icon
        return (
          <motion.div key={n.label} className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${n.pctX}%`, top: `${n.pctY}%` }}
            initial={{ scale: 0, opacity: 0 }} animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.5 + i * 0.06, ...spring }}
          >
            <Link href={n.href}
              className="group flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-3 py-2 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: `${n.color}15` }}>
                <Icon className="h-3.5 w-3.5" style={{ color: n.color }} />
              </span>
              <span className="text-[11px] font-semibold text-[#0A1628] group-hover:text-[#176FEB] md:text-xs whitespace-nowrap">
                {n.label}
              </span>
            </Link>
          </motion.div>
        )
      })}
    </div>
  )
}

export default function EcosystemMap() {
  return (
    <section id="ecosystem" className="relative overflow-hidden bg-white py-12 md:py-16 scroll-mt-24">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full bg-[#176FEB]/[0.03] blur-[120px]" aria-hidden />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <motion.p variants={revealItem} className="text-sm font-heading font-semibold uppercase tracking-wider text-brand-blue">
            Ecosystem
          </motion.p>
          <motion.h2 variants={revealItem} className="mt-3 font-display text-4xl font-normal text-[#0A1628] md:text-5xl">
            One platform. Every <span className="text-keyword">workflow.</span>
          </motion.h2>
          <motion.p variants={revealItem} className="mx-auto mt-4 max-w-xl text-lg text-brand-graphite-mid">
            See how every part of your property operation connects through Revun.
          </motion.p>
        </RevealOnScroll>

        <div className="mt-16">
          <WorkflowMap />
        </div>
      </div>
    </section>
  )
}
