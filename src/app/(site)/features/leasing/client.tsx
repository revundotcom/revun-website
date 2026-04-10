'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import {
  ArrowRight, FileText, Clock, Timer, MapPin, Calendar,
  CheckCircle2, XCircle, PenTool, Users, Shield,
  Home, Fingerprint, BarChart3, Sparkles, MessageCircle,
  Wrench, ShoppingCart, AlertTriangle,
} from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const
const fadeUp = { initial: { opacity: 0, y: 12 }, transition: { duration: 0.6, ease, delay: 0.1 } }

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

/* ── Section 1: Review Offers ──────────────────────────────────────── */

function ReviewOffers() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const offers = [
    { status: 'Pending', term: '6 months', amount: '$2,000.00', color: '#F59E0B' },
    { status: 'Accepted', term: '12 months', amount: '$2,100.00', color: '#176FEB' },
    { status: 'Declined', term: '24 months', amount: '$1,900.00', color: '#EF4444' },
  ]
  return (
    <SW id="review-offers">
      <SH eyebrow="Offers" title="Review" highlight="Offers" description="Compare rent, move-in dates, and terms side by side." />
      <div ref={ref} className="mt-12 grid gap-8 lg:grid-cols-2">
        <motion.div className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden" {...fadeUp} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <div className="border-b border-[#E5E7EB] px-6 py-4">
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-brand-blue" /><span className="font-heading text-base font-semibold text-brand-graphite">75 Portland St, Mississauga</span></div>
            <div className="mt-3 flex gap-3">
              {[{ icon: Wrench, label: 'Maintenance' }, { icon: Calendar, label: 'Tours' }, { icon: ShoppingCart, label: 'Services' }].map((t) => (
                <div key={t.label} className="flex flex-col items-center rounded-xl border border-[#E5E7EB] px-4 py-2"><t.icon className="h-4 w-4 text-brand-blue" /><span className="mt-0.5 text-[10px] text-brand-graphite-mid">{t.label}</span></div>
              ))}
            </div>
          </div>
          <div className="flex border-b border-[#E5E7EB]">
            {['Stays', 'Offers', 'Active', 'Moved-Out'].map((tab, i) => (
              <div key={tab} className={`flex-1 py-3 text-center text-xs font-medium ${i === 1 ? 'border-b-2 border-brand-blue text-brand-blue' : 'text-brand-graphite-mid'}`}>{tab}</div>
            ))}
          </div>
          <div className="divide-y divide-[#E5E7EB]">
            {offers.map((o, i) => (
              <motion.div key={o.status} className="flex items-center gap-4 px-6 py-4" initial={{ opacity: 0, x: -8 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.35, ease, delay: 0.2 + i * 0.08 }}>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-blue/10"><Users className="h-5 w-5 text-brand-blue/40" /></div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between"><span className="text-xs text-brand-graphite-mid">Status</span><span className="text-xs font-semibold" style={{ color: o.color }}>{o.status}</span></div>
                  <div className="flex justify-between"><span className="text-xs text-brand-graphite-mid">Term</span><span className="text-xs text-brand-graphite">{o.term}</span></div>
                  <div className="flex justify-between"><span className="text-xs text-brand-graphite-mid">Amount</span><span className="text-sm font-bold text-brand-graphite">{o.amount}</span></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <div className="space-y-4">
          {[
            { icon: BarChart3, title: 'Side-by-side comparison', desc: 'Compare rent amounts, lease terms, and move-in dates across all offers.' },
            { icon: Clock, title: 'Status tracking', desc: 'See pending, accepted, and declined offers at a glance.' },
            { icon: Users, title: 'Tenant context', desc: 'View tenant profiles alongside their offers — occupation, references, and verification.' },
          ].map((f, i) => (
            <Anim key={f.title} className="rounded-2xl border border-[#E5E7EB] bg-white p-6" delay={0.2 + i * 0.12} x={16} y={0}>
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10"><f.icon className="h-5 w-5 text-brand-blue" /></div>
                <div><h4 className="font-heading text-base font-semibold text-brand-graphite">{f.title}</h4><p className="mt-1 text-sm text-brand-graphite-mid">{f.desc}</p></div>
              </div>
            </Anim>
          ))}
        </div>
      </div>
    </SW>
  )
}

/* ── Section 2: Time-Sensitive Offers ──────────────────────────────── */

function TimeSensitiveOffers() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const offers = [
    { property: 'Unit 704 · Portland St, Mississauga, ON', amount: '$1,650', moveIn: 'Mar 1, 2026', expires: '19h 59m' },
    { property: 'Unit 301 · Queen St W, Toronto, ON', amount: '$2,100', moveIn: 'Apr 1, 2026', expires: '3h 12m' },
  ]
  return (
    <SW id="time-offers" dark>
      <SH eyebrow="Offer Pipeline" title="Time-Sensitive" highlight="Offers" description="Review incoming offers and respond before they expire." />
      <div ref={ref} className="mt-12 mx-auto max-w-3xl">
        <motion.div className="rounded-2xl border border-[#E5E7EB] bg-white" {...fadeUp} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <div className="flex flex-col gap-4 border-b border-[#E5E7EB] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="font-heading text-lg font-semibold text-brand-graphite">Offers <span className="ml-1 text-brand-graphite-mid">7</span></h3>
            <div className="flex gap-1.5">
              {['All', 'Pending', 'Approved', 'Declined'].map((t, i) => (
                <span key={t} className={`rounded-full px-3.5 py-1.5 text-xs font-medium ${i === 0 ? 'bg-brand-blue text-white' : 'bg-brand-off-white text-brand-graphite-mid'}`}>{t}</span>
              ))}
            </div>
          </div>
          <div className="divide-y divide-[#E5E7EB]">
            {offers.map((o, i) => (
              <motion.div key={o.property} className="px-6 py-5" initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, ease, delay: 0.2 + i * 0.1 }}>
                <div className="mb-3 flex items-center gap-2">
                  <span className="rounded-full bg-[#F59E0B]/15 px-3 py-1 text-xs font-medium text-[#F59E0B]">Pending</span>
                  <span className="flex items-center gap-1 text-[11px] text-brand-graphite-mid"><Timer className="h-3 w-3" /> Expires in {o.expires}</span>
                </div>
                <p className="flex items-center gap-1.5 text-sm font-medium text-brand-graphite"><MapPin className="h-3.5 w-3.5 text-brand-blue" /> {o.property}</p>
                <div className="mt-3 flex gap-8">
                  <div><p className="text-[10px] uppercase text-brand-graphite-mid">Offer amount</p><p className="font-heading text-lg font-bold text-brand-blue">{o.amount}</p></div>
                  <div><p className="text-[10px] uppercase text-brand-graphite-mid">Move-in date</p><p className="text-sm font-medium text-brand-graphite">{o.moveIn}</p></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </SW>
  )
}

/* ── Section 3: Negotiation (merged Decline/Counter) ─────────────── */

function Negotiation() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <SW id="negotiation">
      <SH eyebrow="Negotiation" title="Decline or" highlight="Counter" description="Reject offers or counter with updated rent, terms, or dates — instantly." />
      <div ref={ref} className="mt-12 grid gap-8 lg:grid-cols-2">
        {/* Left: decline/counter choice */}
        <motion.div className="rounded-2xl border border-[#E5E7EB] bg-white p-6" {...fadeUp} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <h3 className="mb-2 font-heading text-lg font-semibold text-brand-graphite">Respond to offer</h3>
          <p className="mb-5 text-sm text-brand-graphite-mid">Decline or send a counter offer with updated terms.</p>
          <div className="space-y-3">
            <div className="flex items-start gap-4 rounded-xl border border-[#E5E7EB] p-5 hover:border-red-200 transition-colors">
              <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
              <div><h4 className="font-heading text-sm font-semibold text-brand-graphite">Decline Offer</h4><p className="mt-1 text-xs text-brand-graphite-mid">Reject the offer. The tenant will be notified.</p></div>
            </div>
            <div className="flex items-start gap-4 rounded-xl border-2 border-brand-blue bg-brand-blue/5 p-5">
              <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
              <div><h4 className="font-heading text-sm font-semibold text-brand-blue">Counter Offer</h4><p className="mt-1 text-xs text-brand-graphite-mid">Suggest a different rental amount, lease term, or move-in date.</p></div>
            </div>
          </div>
        </motion.div>
        {/* Right: counter form */}
        <motion.div className="rounded-2xl border border-[#E5E7EB] bg-white p-6" initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.2 }}>
          <h3 className="mb-2 font-heading text-lg font-semibold text-brand-graphite">Counter <span className="text-brand-blue">details</span></h3>
          <p className="mb-5 text-sm text-brand-graphite-mid">Adjust <strong className="text-brand-graphite">rent, move-in date, or lease term</strong>.</p>
          <div className="space-y-4">
            {[
              { label: 'Monthly Rent', icon: null, placeholder: 'Enter the rent you\'re offering', note: 'Tenant\'s current offer: $2,400 / month' },
              { label: 'Move-in Date', icon: Calendar, placeholder: 'Select new move-in date', note: null },
              { label: 'Lease Term', icon: Clock, placeholder: 'Select lease duration', note: null },
            ].map((f) => (
              <div key={f.label}>
                <label className="mb-2 block font-heading text-sm font-semibold text-brand-graphite">{f.label}</label>
                <div className="flex items-center rounded-xl border border-[#E5E7EB] px-4 py-3">
                  {f.icon && <f.icon className="h-4 w-4 text-brand-graphite-mid mr-2" />}
                  <span className="text-sm text-brand-graphite-light">{f.placeholder}</span>
                </div>
                {f.note && <p className="mt-1.5 text-xs text-brand-graphite-mid">{f.note}</p>}
              </div>
            ))}
          </div>
          <button className="mt-6 flex w-full items-center justify-center rounded-xl bg-brand-blue py-3 text-sm font-semibold text-white hover:bg-brand-blue-dark transition-colors">Send Counter Offer</button>
        </motion.div>
      </div>
    </SW>
  )
}

/* ── Section 4: E-Signatures & Signing (merged) ─────────────────── */

function Signing() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <SW id="signing" dark>
      <SH eyebrow="E-Signatures" title="Sign the" highlight="Deal" description="Sign electronically using a secure, legally valid digital signature." />
      <div ref={ref} className="mt-12 grid gap-8 lg:grid-cols-2">
        {/* Signature options */}
        <motion.div className="rounded-2xl border border-[#E5E7EB] bg-white p-6" {...fadeUp} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <h3 className="mb-4 font-heading text-base font-semibold text-brand-graphite">Choose how to <span className="text-brand-blue">sign</span></h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {[{ label: 'Initials', desc: 'Quick initials for acknowledgements', active: false }, { label: 'Signature', desc: 'Full signature for lease agreements', active: true }].map((m) => (
              <div key={m.label} className={`rounded-xl border p-5 text-center ${m.active ? 'border-brand-blue bg-brand-blue/5' : 'border-[#E5E7EB]'}`}>
                <PenTool className="mx-auto h-6 w-6 text-brand-blue" /><p className="mt-2 font-heading text-sm font-semibold text-brand-graphite">{m.label}</p><p className="mt-1 text-xs text-brand-graphite-mid">{m.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-xl border-2 border-dashed border-[#E5E7EB] bg-brand-off-white/50 p-6 text-center">
            <PenTool className="mx-auto h-7 w-7 text-brand-graphite-light" /><p className="mt-2 text-sm text-brand-graphite-mid">Draw your signature</p>
          </div>
        </motion.div>
        {/* Signers status */}
        <motion.div className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden" initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.2 }}>
          <div className="border-b border-[#E5E7EB] px-6 py-4"><h3 className="font-heading text-base font-semibold text-brand-graphite">Signers</h3></div>
          <div className="divide-y divide-[#E5E7EB]">
            {['Mark A', 'John D', 'Emily C'].map((name, i) => (
              <motion.div key={name} className="flex items-center justify-between px-6 py-4" initial={{ opacity: 0, x: -8 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.3, ease, delay: 0.3 + i * 0.08 }}>
                <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue/10"><Users className="h-5 w-5 text-brand-blue/40" /></div><span className="text-sm font-medium text-brand-graphite">{name}</span></div>
                <span className="flex items-center gap-1.5 text-xs font-medium text-brand-blue">Signed <CheckCircle2 className="h-3.5 w-3.5" /></span>
              </motion.div>
            ))}
          </div>
          <div className="border-t border-[#E5E7EB] px-6 py-4">
            <h4 className="mb-3 font-heading text-sm font-semibold text-brand-graphite">Signed Documents</h4>
            {['Offer to Lease', 'Offer Certificate'].map((d) => (
              <div key={d} className="flex items-center gap-2 py-1.5"><CheckCircle2 className="h-4 w-4 text-brand-blue" /><span className="text-sm text-brand-graphite">{d}</span></div>
            ))}
          </div>
        </motion.div>
      </div>
    </SW>
  )
}

/* ── Section 5: Lease Info ─────────────────────────────────────────── */

function LeaseInfo() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <SW id="lease-info">
      <SH eyebrow="Lease Details" title="Lease Info" highlight="Organized" description="View tenant details, occupants, and documents in one place." />
      <div ref={ref} className="mt-12 mx-auto max-w-2xl">
        <motion.div className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden" {...fadeUp} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <div className="border-b border-[#E5E7EB] px-6 py-4"><h3 className="font-heading text-base font-semibold text-brand-graphite">Lease Information</h3></div>
          <div className="flex border-b border-[#E5E7EB]">
            {['Information', 'Documents', 'People & Pets'].map((t, i) => (
              <div key={t} className={`flex-1 py-3 text-center text-xs font-medium ${i === 2 ? 'border-b-2 border-brand-blue text-brand-blue' : 'text-brand-graphite-mid'}`}>{t}</div>
            ))}
          </div>
          <div className="px-6 py-5">
            <h4 className="font-heading text-sm font-semibold text-brand-graphite">Tenants</h4>
            <p className="text-xs text-brand-graphite-mid">On the lease. Responsible for rent.</p>
            <div className="mt-3 space-y-2">
              {['John D', 'Emily C'].map((n, i) => (
                <motion.div key={n} className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-brand-off-white" initial={{ opacity: 0, x: -8 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.3, ease, delay: 0.2 + i * 0.08 }}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue/10"><Users className="h-5 w-5 text-brand-blue/40" /></div><span className="text-sm font-medium text-brand-graphite">{n}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="border-t border-[#E5E7EB] px-6 py-5">
            <h4 className="font-heading text-sm font-semibold text-brand-graphite">Occupants</h4>
            <p className="text-xs text-brand-graphite-mid">Live in the home. Not on the lease.</p>
            <div className="mt-3 flex items-center gap-3 rounded-xl px-4 py-3"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue/10"><Users className="h-5 w-5 text-brand-blue/40" /></div><span className="text-sm font-medium text-brand-graphite">Olivia G</span></div>
          </div>
        </motion.div>
      </div>
    </SW>
  )
}

/* ── Section 6: Identity & Credit (merged 3 sections) ────────────── */

function IdentityCredit() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const size = 160; const sw = 10; const r = (size - sw) / 2; const circ = Math.PI * r; const filled = (493 / 900) * circ
  const idChecks = [
    { label: 'Name match', pass: true }, { label: 'Date of birth match', pass: true },
    { label: 'Valid ID', pass: false }, { label: 'Valid selfie', pass: true },
    { label: 'Selfie matches ID photo', pass: false },
  ]
  return (
    <SW id="screening" dark>
      <SH eyebrow="Screening" title="Identity &" highlight="Credit" description="Verify tenant identity and assess financial risk — all inline." />
      <div ref={ref} className="mt-12 grid gap-8 lg:grid-cols-2">
        {/* ID Verification */}
        <motion.div className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden" {...fadeUp} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <div className="flex items-center justify-between border-b border-[#E5E7EB] px-6 py-4">
            <h3 className="font-heading text-base font-semibold text-brand-graphite">ID Verification</h3>
            <span className="text-xs text-brand-graphite-mid">Verified by <strong className="text-brand-graphite">Persona</strong></span>
          </div>
          <div className="divide-y divide-[#E5E7EB]">
            {idChecks.map((c, i) => (
              <motion.div key={c.label} className="flex items-center justify-between px-6 py-3.5" initial={{ opacity: 0, x: -8 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.3, ease, delay: 0.2 + i * 0.06 }}>
                <div className="flex items-center gap-3"><Fingerprint className="h-4 w-4 text-brand-graphite-mid" /><span className="text-sm text-brand-graphite">{c.label}</span></div>
                <span className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${c.pass ? 'bg-[#176FEB]/10 text-[#176FEB]' : 'bg-red-50 text-red-500'}`}>
                  {c.pass ? <CheckCircle2 className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />} {c.pass ? 'Pass' : 'Fail'}
                </span>
              </motion.div>
            ))}
          </div>
          {/* Government ID types */}
          <div className="border-t border-[#E5E7EB] px-6 py-4">
            <div className="flex gap-3">
              {[{ name: 'John D', type: 'Drivers License' }, { name: 'Emily C', type: 'Passport' }].map((p) => (
                <div key={p.name} className="flex-1 rounded-xl bg-brand-off-white p-3 text-center">
                  <Fingerprint className="mx-auto h-6 w-6 text-brand-blue/30" />
                  <p className="mt-1 text-xs font-medium text-brand-graphite">{p.name}</p>
                  <p className="text-[10px] text-brand-graphite-mid">{p.type}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        {/* Credit Report */}
        <motion.div className="rounded-2xl border border-[#E5E7EB] bg-white p-6" initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.2 }}>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-heading text-base font-semibold text-brand-graphite">Credit Report</h3>
            <span className="text-xs text-brand-graphite-mid">Powered by <strong className="text-brand-graphite">Equifax</strong></span>
          </div>
          <div className="flex flex-col items-center">
            <svg width={size} height={size / 2 + 20} className="overflow-visible">
              {/* Background arc (semicircle) */}
              <circle
                cx={size / 2} cy={size / 2} r={r}
                fill="none" stroke="#E5E7EB" strokeWidth={sw}
                strokeLinecap="round"
                strokeDasharray={`${circ} ${2 * Math.PI * r}`}
                transform={`rotate(180 ${size / 2} ${size / 2})`}
              />
              {/* Filled arc — red score gauge */}
              <motion.circle
                cx={size / 2} cy={size / 2} r={r}
                fill="none" stroke="#EF4444" strokeWidth={sw}
                strokeLinecap="round"
                strokeDasharray={`${circ} ${2 * Math.PI * r}`}
                initial={{ strokeDashoffset: circ }}
                animate={inView ? { strokeDashoffset: circ - filled } : {}}
                transition={{ duration: 1.4, ease, delay: 0.3 }}
                transform={`rotate(180 ${size / 2} ${size / 2})`}
              />
            </svg>
            <div className="relative -mt-10 text-center">
              <p className="font-heading text-3xl font-bold text-brand-graphite">493</p>
              <p className="text-xs text-brand-graphite-mid">Credit Score</p>
              <p className="text-[10px] text-brand-graphite-light">Out of 900</p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            {[{ label: 'Debt to Income', value: '14%' }, { label: 'Rent to Income', value: '19%' }].map((m) => (
              <div key={m.label} className="rounded-xl bg-brand-off-white p-4 text-center"><p className="font-heading text-xl font-bold text-brand-graphite">{m.value}</p><p className="text-xs text-brand-graphite">{m.label}</p></div>
            ))}
          </div>
          <div className="mt-5 rounded-xl bg-brand-blue/5 border border-brand-blue/10 p-4">
            <div className="flex items-start gap-3"><Sparkles className="h-5 w-5 shrink-0 text-brand-blue" /><div><p className="text-sm font-medium text-brand-graphite">Inline credit review</p><p className="mt-1 text-xs text-brand-graphite-mid">Credit reports display directly in the leasing workflow — no separate portal required.</p></div></div>
          </div>
        </motion.div>
      </div>
    </SW>
  )
}

/* ── Section 7: Rental Protection (fixed layout) ─────────────────── */

function RentalProtection() {
  return (
    <SW id="protection">
      <SH eyebrow="Protection" title="Rental" highlight="Protection" description="Optional protection to help safeguard your rental income and property." />
      <div className="mt-12 mx-auto max-w-3xl">
        <Anim className="rounded-xl border border-brand-blue/20 bg-brand-blue/5 px-6 py-5 mb-6">
          <p className="text-xs font-medium text-brand-blue">With Rental Guarantee Protection</p>
          <p className="mt-1 font-heading text-xl font-semibold text-brand-graphite">Never miss a rent payment again</p>
          <p className="mt-1 text-sm text-brand-graphite-mid">Your rental income is protected, even if tenants default.</p>
        </Anim>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: Home, title: 'Guaranteed Rent', desc: 'Up to 12 months or $60,000 if a tenant defaults' },
            { icon: Shield, title: 'Damage Protection', desc: 'Covered up to $10,000 for vandalism or misuse' },
            { icon: FileText, title: 'Legal Support', desc: 'Paralegal services and court fees covered up to $2,000' },
          ].map((f, i) => (
            <Anim key={f.title} className="rounded-xl border border-[#E5E7EB] bg-white p-5" delay={0.15 + i * 0.1}>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue/10 mb-3"><f.icon className="h-5 w-5 text-brand-blue" /></div>
              <h4 className="font-heading text-sm font-semibold text-brand-graphite">{f.title}</h4>
              <p className="mt-1 text-sm text-brand-graphite-mid">{f.desc}</p>
            </Anim>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/signup/" className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-blue px-10 text-base font-semibold text-white hover:bg-brand-blue-dark transition-colors">
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </SW>
  )
}

/* ── Hero ─────────────────────────────────────────────────────────── */

function LeasingHero() {
  return (
    <section className="relative overflow-hidden bg-white pb-12 pt-28 md:pt-36">
      <div className="absolute inset-0 bg-grid bg-grid-mask opacity-40" aria-hidden="true" />
      <div className="absolute top-0 right-[-200px] h-[500px] w-[500px] rounded-full bg-brand-blue/[0.04] blur-[120px]" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <RevealOnScroll>
          <motion.div variants={revealItem} className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-1.5 shadow-sm">
            <FileText className="h-4 w-4 text-brand-blue" /><span className="text-sm font-medium text-brand-graphite-mid">Leasing</span>
          </motion.div>
          <motion.h1 variants={revealItem} className="font-display text-5xl font-normal leading-[1.1] tracking-tight text-brand-graphite md:text-7xl">
            The complete{' '}<span className="text-brand-blue">leasing workflow</span>
          </motion.h1>
          <motion.p variants={revealItem} className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-brand-graphite-mid md:text-xl">
            Review offers, negotiate terms, sign leases electronically, verify tenant IDs, pull credit reports, and activate rental protection — all in one flow.
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

export function LeasingClient() {
  return (
    <>
      <LeasingHero />
      <ReviewOffers />
      <TimeSensitiveOffers />
      <Negotiation />
      <Signing />
      <LeaseInfo />
      <IdentityCredit />
      <RentalProtection />
      <p className="sr-only">
        Revun Leasing provides a complete leasing workflow including offer review with side-by-side comparison, time-sensitive offer tracking, offer decline and counter capabilities, electronic signatures with multi-party execution, lease information management, government ID verification powered by Persona, Equifax credit report review, and rental protection with guaranteed rent up to $60,000, property damage coverage up to $10,000, and legal support up to $2,000.
      </p>
    </>
  )
}
