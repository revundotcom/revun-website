'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import {
  Sparkles, Check, MapPin, Navigation, CalendarCheck,
  FileText, CreditCard, Landmark, IdCard, Send,
} from 'lucide-react'

/* ═══════════════════════════════════════════════════════════════════════════
   Feature visuals

   Built in code rather than cropped from the PNG library. Cropping a 786x1704
   phone screenshot into a 16/10 card always lands on a thin band at ~50% scale,
   which is why those cards read as small and messy. These are composed at card
   size, so the type is legible and the motion can carry the idea.

   Content mirrors the real screens 1:1 — the maintenance numbers below are the
   ones in maintenance/scope-of-work.png, the vault rows are the ones in
   platform/screening-verification.png, and so on.

   Every loop animates transform/opacity only, and stops dead under
   prefers-reduced-motion (the final frame is the resting state).
   ═══════════════════════════════════════════════════════════════════════════ */

const EASE = [0.22, 1, 0.36, 1] as const

function useLoop() {
  return !useReducedMotion()
}

/** Staggered "settle into place" used by most visuals. */
function pop(delay: number, loop: boolean): Variants {
  return {
    hidden: { opacity: 0, y: 8, scale: 0.96 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: loop
        ? { delay, duration: 0.45, ease: EASE, repeat: Infinity, repeatDelay: 3.2, repeatType: 'reverse' as const }
        : { duration: 0 },
    },
  }
}

/* ── 1. AI triage ────────────────────────────────────────────────────────── */
export function TriageVisual() {
  const loop = useLoop()
  const chips = [
    { label: 'Plumbing', tone: 'text-brand-blue bg-brand-blue/10' },
    { label: 'High priority', tone: 'text-[#EF4444] bg-[#EF4444]/10' },
    { label: '1.5–2 hrs', tone: 'text-[#0A1628] bg-[#0A1628]/[0.06]' },
  ]
  return (
    <VisualShell>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: !loop, amount: 0.5 }}
        className="w-full max-w-[300px]"
      >
        {/* the incoming request */}
        <motion.div
          variants={pop(0, loop)}
          className="flex items-start gap-2.5 rounded-xl border border-[#E5E7EB] bg-white p-3 shadow-sm"
        >
          <span className="mt-0.5 h-7 w-7 shrink-0 rounded-lg bg-[#0A1628]/[0.06]" />
          <p className="text-[13px] leading-snug text-brand-graphite-mid">
            “Toilet is overflowing, water on the floor.”
          </p>
        </motion.div>

        {/* AI reading it */}
        <motion.div
          variants={pop(0.35, loop)}
          className="mx-auto my-2.5 inline-flex w-full items-center justify-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-brand-blue"
        >
          <motion.span
            animate={loop ? { rotate: [0, 180, 360] } : undefined}
            transition={loop ? { duration: 3, repeat: Infinity, ease: 'linear' } : undefined}
            className="inline-flex"
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          </motion.span>
          Revun AI is reading it
        </motion.div>

        {/* what it produced */}
        <div className="flex flex-wrap items-center gap-1.5">
          {chips.map((c, i) => (
            <motion.span
              key={c.label}
              variants={pop(0.6 + i * 0.14, loop)}
              className={`rounded-lg px-2.5 py-1.5 text-[12px] font-semibold ${c.tone}`}
            >
              {c.label}
            </motion.span>
          ))}
        </div>

        <motion.div
          variants={pop(1.1, loop)}
          className="mt-2 flex items-baseline justify-between rounded-xl border border-[#E5E7EB] bg-white px-3 py-2.5 shadow-sm"
        >
          <span className="text-[12px] text-brand-graphite-mid">Priced from nearby jobs</span>
          <span className="font-heading text-[17px] font-bold text-[#0A1628]">$150</span>
        </motion.div>
      </motion.div>
    </VisualShell>
  )
}

/* ── 2. Live GPS ─────────────────────────────────────────────────────────── */
export function GpsVisual() {
  const loop = useLoop()
  return (
    <VisualShell>
      <div className="relative w-full max-w-[320px]">
        <svg viewBox="0 0 320 150" className="w-full" role="img" aria-label="Technician route on a map">
          {/* faint street grid */}
          <g stroke="#0A1628" strokeOpacity="0.07" strokeWidth="1">
            {[30, 70, 110].map((y) => <line key={y} x1="0" y1={y} x2="320" y2={y} />)}
            {[70, 150, 230].map((x) => <line key={x} x1={x} y1="0" x2={x} y2="150" />)}
          </g>
          <path d="M8 132 H92 V74 H206 V26 H300" fill="none" stroke="#176FEB" strokeOpacity="0.18" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          <motion.path
            d="M8 132 H92 V74 H206 V26 H300"
            fill="none" stroke="#176FEB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray="1 1" pathLength={1}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: !loop, amount: 0.5 }}
            transition={loop ? { duration: 2.6, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1.4 } : { duration: 0 }}
          />
          {/* destination */}
          <circle cx="300" cy="26" r="7" fill="#22C55E" />
          <circle cx="300" cy="26" r="12" fill="#22C55E" fillOpacity="0.18" />
        </svg>

        {/* technician travelling the route */}
        <motion.div
          className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-brand-blue shadow-lg"
          style={{ marginLeft: -16, marginTop: -16 }}
          initial={{ left: '2.5%', top: '88%' }}
          whileInView={loop ? { left: ['2.5%', '28.7%', '28.7%', '64.4%', '64.4%', '93.7%'], top: ['88%', '88%', '49.3%', '49.3%', '17.3%', '17.3%'] } : { left: '64.4%', top: '17.3%' }}
          viewport={{ once: !loop, amount: 0.5 }}
          transition={loop ? { duration: 2.6, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1.4, times: [0, 0.28, 0.34, 0.66, 0.72, 1] } : { duration: 0 }}
        >
          <Navigation className="h-3.5 w-3.5 text-white" aria-hidden="true" />
        </motion.div>

        <div className="mt-1 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1.5 text-[12px] font-semibold text-[#0A1628] shadow-sm ring-1 ring-[#E5E7EB]">
            <MapPin className="h-3.5 w-3.5 text-[#F59E0B]" aria-hidden="true" />
            David A. · 6 min away
          </span>
          <span className="rounded-full bg-[#0A1628] px-2.5 py-1.5 text-[11px] font-semibold text-white">
            Share location
          </span>
        </div>
      </div>
    </VisualShell>
  )
}

/* ── 3. Self-serve booking ───────────────────────────────────────────────── */
export function BookingVisual() {
  const loop = useLoop()
  const slots = ['Thu 10:30', 'Thu 2:00', 'Fri 11:00']
  return (
    <VisualShell>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: !loop, amount: 0.5 }}
        className="w-full max-w-[280px]"
      >
        <motion.p variants={pop(0, loop)} className="mb-2 text-[12px] font-semibold text-brand-graphite-mid">
          Pick a showing time
        </motion.p>
        <div className="space-y-1.5">
          {slots.map((s, i) => {
            const chosen = i === 1
            return (
              <motion.div
                key={s}
                variants={pop(0.15 + i * 0.12, loop)}
                className={`flex items-center justify-between rounded-xl border px-3 py-2.5 text-[13px] font-semibold ${
                  chosen
                    ? 'border-[#22C55E] bg-[#22C55E]/[0.08] text-[#0A1628]'
                    : 'border-[#E5E7EB] bg-white text-brand-graphite-mid'
                }`}
              >
                {s}
                {chosen && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#22C55E]">
                    <Check className="h-3 w-3 text-white" strokeWidth={3} aria-hidden="true" />
                  </span>
                )}
              </motion.div>
            )
          })}
        </div>
        <motion.div
          variants={pop(0.75, loop)}
          className="mt-2.5 flex items-center justify-center gap-1.5 rounded-xl bg-[#0A1628] py-2.5 text-[13px] font-semibold text-white"
        >
          <CalendarCheck className="h-4 w-4" aria-hidden="true" />
          Tour confirmed — no call needed
        </motion.div>
      </motion.div>
    </VisualShell>
  )
}

/* ── 4. Verified & vaulted ───────────────────────────────────────────────── */
export function VaultVisual() {
  const loop = useLoop()
  const docs = [
    { icon: IdCard, label: 'Government ID' },
    { icon: CreditCard, label: 'Credit report' },
    { icon: FileText, label: 'Income verification' },
    { icon: Landmark, label: 'Bank statements' },
  ]
  return (
    <VisualShell>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: !loop, amount: 0.5 }}
        className="w-full max-w-[300px] space-y-1.5"
      >
        {docs.map((d, i) => (
          <motion.div
            key={d.label}
            variants={pop(i * 0.16, loop)}
            className="flex items-center gap-2.5 rounded-xl border border-[#E5E7EB] bg-white px-3 py-2.5 shadow-sm"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#8B5CF6]/10">
              <d.icon className="h-3.5 w-3.5 text-[#8B5CF6]" aria-hidden="true" />
            </span>
            <span className="flex-1 text-[13px] font-medium text-[#0A1628]">{d.label}</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#22C55E]">
              <Check className="h-3 w-3 text-white" strokeWidth={3} aria-hidden="true" />
            </span>
          </motion.div>
        ))}
      </motion.div>
    </VisualShell>
  )
}

/* ── 5. One inbox ────────────────────────────────────────────────────────── */
export function InboxVisual() {
  const loop = useLoop()
  return (
    <VisualShell>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: !loop, amount: 0.5 }}
        className="w-full max-w-[400px] space-y-2"
      >
        <motion.div variants={pop(0, loop)} className="flex items-end gap-2">
          <span className="h-7 w-7 shrink-0 rounded-full bg-[#0A1628]/10" />
          <p className="max-w-[80%] rounded-2xl rounded-bl-md bg-white px-3 py-2 text-[13px] leading-snug text-[#0A1628] shadow-sm ring-1 ring-[#E5E7EB]">
            Is the 1BR at 12 Pine still available?
          </p>
        </motion.div>

        <motion.div variants={pop(0.4, loop)} className="flex justify-end">
          <p className="max-w-[82%] rounded-2xl rounded-br-md bg-brand-blue px-3 py-2 text-[13px] leading-snug text-white shadow-sm">
            Yes — $1,850/mo, available May 1. Want to tour Friday 2pm?
          </p>
        </motion.div>

        <motion.div variants={pop(0.85, loop)} className="flex items-center justify-end gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#14B8A6]/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#14B8A6]">
            <Send className="h-2.5 w-2.5" aria-hidden="true" />
            Sent by AI · 4s
          </span>
        </motion.div>
      </motion.div>
    </VisualShell>
  )
}

/* ── 6. Owner-ready books ────────────────────────────────────────────────── */
export function BooksVisual() {
  const loop = useLoop()
  const bars = [62, 78, 70, 55, 84, 74]
  const months = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
  return (
    <VisualShell>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: !loop, amount: 0.5 }}
        className="w-full max-w-[420px]"
      >
        <motion.div variants={pop(0, loop)} className="flex items-baseline justify-between">
          <span className="text-[12px] text-brand-graphite-mid">Net income</span>
          <span className="font-heading text-[20px] font-bold text-[#0A1628]">$200,900</span>
        </motion.div>

        <div className="mt-3 flex h-[104px] items-end gap-2.5">
          {bars.map((h, i) => (
            <motion.div
              key={months[i]}
              className="flex-1 rounded-t-md bg-brand-blue"
              // height carries the data, scaleY only animates it in from the baseline
              style={{ height: `${h}%`, transformOrigin: 'bottom' }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: !loop, amount: 0.5 }}
              transition={
                loop
                  ? { delay: i * 0.08, duration: 0.5, ease: EASE, repeat: Infinity, repeatDelay: 3.2, repeatType: 'reverse' }
                  : { duration: 0 }
              }
            />
          ))}
        </div>
        <div className="mt-1.5 flex gap-2">
          {months.map((m) => (
            <span key={m} className="flex-1 text-center text-[10px] text-brand-graphite-mid">{m}</span>
          ))}
        </div>
      </motion.div>
    </VisualShell>
  )
}

/* ── shared shell ────────────────────────────────────────────────────────── */
function VisualShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[linear-gradient(160deg,#F0F5FF_0%,#F7FAFF_45%,#FFFFFF_100%)] px-5 py-6">
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-blue/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative flex w-full items-center justify-center">{children}</div>
    </div>
  )
}
