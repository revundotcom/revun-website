'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Building2, FileSignature, DollarSign, MessageSquare, Shield } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

/* ═══════════════════════════════════════════════════════════════════════════
   Figma screenshot carousel for mobile frames
   ═══════════════════════════════════════════════════════════════════════════ */

function FigmaCarousel({ screens }: { screens: { src: string; label: string }[] }) {
  const [idx, setIdx] = useState(0)
  const prev = () => setIdx((i) => (i - 1 + screens.length) % screens.length)
  const next = () => setIdx((i) => (i + 1) % screens.length)

  return (
    <div className="relative flex flex-col h-full">
      {/* Screen */}
      <div className="relative flex-1 w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            <Image
              src={screens[idx].src}
              alt={screens[idx].label}
              fill
              className="object-cover object-top"
              sizes="320px"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Label + nav */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#FAFBFC] border-t border-[#E5E7EB]">
        <button onClick={prev} className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-[#E5E7EB] transition-colors" aria-label="Previous">
          <ChevronLeft className="h-3.5 w-3.5 text-[#555860]" />
        </button>
        <span className="text-[9px] font-semibold text-[#0A1628]">{screens[idx].label}</span>
        <button onClick={next} className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-[#E5E7EB] transition-colors" aria-label="Next">
          <ChevronRight className="h-3.5 w-3.5 text-[#555860]" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1 pb-1">
        {screens.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`h-1 rounded-full transition-all ${i === idx ? 'w-4 bg-[#176FEB]' : 'w-1 bg-[#D3D5DB]'}`}
            aria-label={`Screen ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Browser frame wrapper (consistent with existing codebase pattern)
   ═══════════════════════════════════════════════════════════════════════════ */

function BrowserFrame({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-white shadow-editorial">
      <div className="flex items-center gap-2 border-b border-border bg-[#F8F9FA] px-3 py-2">
        <div className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
          <span className="h-2 w-2 rounded-full bg-[#FEBD2F]" />
          <span className="h-2 w-2 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex flex-1 justify-center">
          <span className="rounded border border-border bg-white px-2.5 py-0.5 text-[9px] text-[#94A3B8]">
            {url}
          </span>
        </div>
      </div>
      <div className="min-h-[260px] md:min-h-[300px]">{children}</div>
    </div>
  )
}

function MobileFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[28px] border-2 border-[#1a1a1a] bg-[#1a1a1a] shadow-[0_4px_24px_rgba(0,0,0,0.10)]">
      {/* Dynamic Island only — Figma screenshots have their own status bar */}
      <div className="flex justify-center bg-white pt-1">
        <div className="h-[14px] w-[60px] rounded-full bg-[#1a1a1a]" />
      </div>
      {/* Content — aspect ratio locked so every phone is same size */}
      <div className="aspect-[9/16] overflow-hidden">{children}</div>
      {/* Home indicator */}
      <div className="flex justify-center bg-white py-1.5">
        <div className="h-1 w-24 rounded-full bg-[#1a1a1a]/20" />
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   14 Rich UI Mockups
   ═══════════════════════════════════════════════════════════════════════════ */

function OwnerAppMock() {
  return (
    <div className="flex h-[300px]">
      {/* Dark sidebar */}
      <div className="w-[48px] bg-[#0A1628] flex flex-col items-center py-3 gap-3 shrink-0">
        <div className="h-5 w-5 rounded bg-[#176FEB] flex items-center justify-center text-[7px] font-bold text-white">R</div>
        <div className="w-full h-px bg-white/10" />
        {['⌂', '🏢', '👤', '🔧', '💰', '✉', '⚙'].map((icon, i) => (
          <div key={i} className={`h-6 w-6 rounded-md flex items-center justify-center text-[10px] cursor-pointer transition-colors ${i === 0 ? 'bg-[#176FEB]/20 text-[#176FEB]' : 'text-white/40 hover:text-white/70'}`}>{icon}</div>
        ))}
      </div>
      {/* Main content */}
      <div className="flex-1 bg-[#F5F6F8] p-3 overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-bold text-[#0A1628]">Dashboard</p>
          <div className="flex items-center gap-1.5">
            <span className="text-[8px] text-[#94A3B8]">Apr 10, 2026</span>
            <div className="h-5 w-5 rounded-full bg-[#176FEB] flex items-center justify-center text-[7px] text-white font-bold">JC</div>
          </div>
        </div>
        {/* 4 stat cards */}
        <div className="grid grid-cols-4 gap-1.5 mb-2">
          {[
            { label: 'Portfolio', value: '$1.24M', sub: '+8.2%', color: '#0A1628', subColor: '#22C55E' },
            { label: 'Occupancy', value: '96.4%', sub: '+1.2%', color: '#22C55E', subColor: '#22C55E' },
            { label: 'Units', value: '847', sub: '3 vacant', color: '#176FEB', subColor: '#F59E0B' },
            { label: 'Collected', value: '$284.5K', sub: 'This month', color: '#0A1628', subColor: '#94A3B8' },
          ].map((s) => (
            <div key={s.label} className="rounded-md bg-white p-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <p className="text-[7px] text-[#94A3B8] mb-0.5">{s.label}</p>
              <p className="text-[11px] font-bold" style={{ color: s.color }}>{s.value}</p>
              <p className="text-[7px] font-medium" style={{ color: s.subColor }}>{s.sub}</p>
            </div>
          ))}
        </div>
        {/* Revenue chart + Activity side by side */}
        <div className="grid grid-cols-5 gap-1.5 mb-2">
          <div className="col-span-3 rounded-md bg-white p-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <p className="text-[8px] font-semibold text-[#0A1628] mb-1">Monthly Revenue</p>
            <div className="flex items-end gap-[3px] h-[50px]">
              {[65, 72, 58, 80, 74, 88, 92, 78, 85, 96, 90, 94].map((h, i) => (
                <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, backgroundColor: i === 11 ? '#176FEB' : '#176FEB', opacity: i === 11 ? 1 : 0.2 + (h / 100) * 0.4 }} />
              ))}
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[6px] text-[#94A3B8]">Jan</span>
              <span className="text-[6px] text-[#94A3B8]">Jun</span>
              <span className="text-[6px] text-[#94A3B8]">Dec</span>
            </div>
          </div>
          <div className="col-span-2 rounded-md bg-white p-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <p className="text-[8px] font-semibold text-[#0A1628] mb-1">Recent Activity</p>
            <div className="space-y-1.5">
              {[
                { text: 'Lease signed — 5D', color: '#22C55E' },
                { text: 'Payment — $1,850', color: '#176FEB' },
                { text: 'WO assigned', color: '#F59E0B' },
                { text: 'Tour booked — 2C', color: '#176FEB' },
              ].map((a, i) => (
                <div key={i} className="flex items-center gap-1">
                  <span className="h-1 w-1 rounded-full shrink-0" style={{ backgroundColor: a.color }} />
                  <span className="text-[7px] text-[#555860] truncate">{a.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Property cards */}
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { name: '45 Queen St', price: '$1.2M', occ: '96%', gradient: 'from-[#176FEB]/20 to-[#176FEB]/5' },
            { name: '120 King Ave', price: '$840K', occ: '100%', gradient: 'from-[#22C55E]/20 to-[#22C55E]/5' },
            { name: '88 Bay Blvd', price: '$620K', occ: '88%', gradient: 'from-[#F59E0B]/20 to-[#F59E0B]/5' },
          ].map((p) => (
            <div key={p.name} className="rounded-md bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden">
              <div className={`h-[28px] bg-gradient-to-br ${p.gradient}`} />
              <div className="px-1.5 py-1">
                <p className="text-[7px] font-semibold text-[#0A1628]">{p.name}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[7px] font-bold text-[#176FEB]">{p.price}</span>
                  <span className="text-[6px] text-[#22C55E] font-medium">{p.occ}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TenantAppMock() {
  return (
    <div className="space-y-3 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] text-[#94A3B8]">Welcome back,</p>
          <p className="text-sm font-bold text-[#0A1628]">Sarah Mitchell</p>
        </div>
        <div className="rounded-full bg-[#22C55E]/10 px-2.5 py-0.5 text-[9px] font-bold text-[#22C55E]">Lease Active</div>
      </div>
      <div className="rounded-lg border border-[#E5E7EB] p-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-semibold text-[#0A1628]">Next Payment</p>
          <p className="text-[10px] text-[#94A3B8]">Due May 1</p>
        </div>
        <p className="text-lg font-bold text-[#176FEB]">$1,850.00</p>
        <div className="mt-2 rounded-lg bg-[#176FEB] py-1.5 text-center text-[10px] font-semibold text-white">Pay Now</div>
      </div>
      <div className="space-y-1.5">
        {[
          { label: 'Maintenance: Kitchen faucet', status: 'In Progress', color: '#F59E0B' },
          { label: 'Lease renewal available', status: 'Action Needed', color: '#176FEB' },
          { label: 'Insurance uploaded', status: 'Complete', color: '#22C55E' },
          { label: 'Move-in inspection', status: 'Signed', color: '#22C55E' },
          { label: 'Parking pass renewal', status: 'Due Jun 15', color: '#F59E0B' },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between rounded-md bg-[#F5F6F8] px-2.5 py-2">
            <span className="text-[10px] text-[#555860]">{item.label}</span>
            <span className="text-[8px] font-semibold" style={{ color: item.color }}>{item.status}</span>
          </div>
        ))}
      </div>
      {/* Quick actions */}
      <div className="grid grid-cols-3 gap-2 pt-2">
        {[
          { label: 'Pay Rent', icon: '💳' },
          { label: 'Request', icon: '🔧' },
          { label: 'Documents', icon: '📄' },
        ].map((a) => (
          <div key={a.label} className="flex flex-col items-center gap-1 rounded-lg bg-[#F5F6F8] py-2.5">
            <span className="text-base">{a.icon}</span>
            <span className="text-[8px] font-semibold text-[#555860]">{a.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function PropertySearchMock() {
  return (
    <div className="flex h-[300px]">
      {/* Main listings area */}
      <div className="flex-1 bg-[#F5F6F8] overflow-hidden">
        {/* Search bar */}
        <div className="bg-white px-3 py-2 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="flex-1 rounded-md border border-[#E5E7EB] bg-[#F5F6F8] px-2 py-1 text-[8px] text-[#94A3B8]">
              🔍 Search by city, postal code, or address...
            </div>
            <div className="rounded-md bg-[#176FEB] px-2.5 py-1 text-[8px] font-semibold text-white">Search</div>
          </div>
          <div className="flex gap-1 flex-wrap">
            {['1BR+', '$1,200–$1,800', 'Pet Friendly', 'In-Suite Laundry'].map((f) => (
              <span key={f} className="rounded-full border border-[#176FEB]/20 bg-[#176FEB]/5 px-1.5 py-px text-[7px] font-medium text-[#176FEB]">{f}</span>
            ))}
            <span className="rounded-full border border-[#E5E7EB] bg-white px-1.5 py-px text-[7px] text-[#94A3B8]">+ More</span>
          </div>
        </div>
        {/* Results count */}
        <div className="px-3 py-1.5 flex items-center justify-between">
          <span className="text-[8px] text-[#555860] font-medium">24 listings found</span>
          <span className="text-[7px] text-[#94A3B8]">Sort: Newest</span>
        </div>
        {/* Listing cards grid */}
        <div className="px-3 grid grid-cols-3 gap-1.5">
          {[
            { name: '220 King St W, Unit 814', price: '$1,650/mo', beds: '1 BR', sqft: '580 sqft', avail: 'Available Now', gradient: 'from-[#176FEB]/15 to-[#176FEB]/5' },
            { name: '45 Charles St E, Unit 2201', price: '$2,100/mo', beds: '2 BR', sqft: '820 sqft', avail: 'May 1', gradient: 'from-[#22C55E]/15 to-[#22C55E]/5' },
            { name: '88 Scott St, Unit 1406', price: '$1,450/mo', beds: 'Studio', sqft: '420 sqft', avail: 'Available Now', gradient: 'from-[#F59E0B]/15 to-[#F59E0B]/5' },
          ].map((p) => (
            <div key={p.name} className="rounded-md bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden">
              <div className={`h-[60px] bg-gradient-to-br ${p.gradient} relative`}>
                <span className={`absolute top-1 right-1 rounded px-1 py-px text-[6px] font-bold ${p.avail === 'Available Now' ? 'bg-[#22C55E] text-white' : 'bg-[#F59E0B] text-white'}`}>{p.avail}</span>
              </div>
              <div className="p-1.5">
                <p className="text-[7px] font-bold text-[#176FEB] mb-0.5">{p.price}</p>
                <p className="text-[7px] font-medium text-[#0A1628] truncate">{p.name}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[6px] text-[#94A3B8]">{p.beds}</span>
                  <span className="text-[6px] text-[#94A3B8]">·</span>
                  <span className="text-[6px] text-[#94A3B8]">{p.sqft}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Right sidebar - Tour scheduling */}
      <div className="w-[120px] bg-white border-l border-[#E5E7EB] p-2 shrink-0">
        <p className="text-[8px] font-bold text-[#0A1628] mb-1.5">Schedule Tour</p>
        <div className="rounded-md bg-[#F5F6F8] p-1.5 mb-2">
          <p className="text-[7px] font-semibold text-[#0A1628] text-center mb-1">April 2026</p>
          <div className="grid grid-cols-7 gap-px text-center">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
              <span key={i} className="text-[5px] text-[#94A3B8] font-medium">{d}</span>
            ))}
            {[7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((d) => (
              <div key={d} className={`rounded text-[6px] py-px ${d === 10 ? 'bg-[#176FEB] text-white font-bold' : d === 12 || d === 13 || d === 19 || d === 20 ? 'text-[#D3D5DB]' : 'text-[#555860]'}`}>{d}</div>
            ))}
          </div>
        </div>
        <p className="text-[7px] font-semibold text-[#0A1628] mb-1">Available Slots</p>
        {['10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM'].map((t, i) => (
          <div key={t} className={`rounded-md px-1.5 py-1 mb-1 text-center text-[7px] font-medium border ${i === 0 ? 'border-[#176FEB] bg-[#176FEB]/5 text-[#176FEB]' : 'border-[#E5E7EB] text-[#555860]'}`}>{t}</div>
        ))}
        <div className="rounded-md bg-[#176FEB] py-1 text-center text-[7px] font-semibold text-white mt-1">Book Tour</div>
      </div>
    </div>
  )
}

function TourBookingMock() {
  return (
    <div className="space-y-3 p-4">
      <div className="flex items-center justify-between mb-1">
        <p className="text-[10px] font-semibold text-[#0A1628]">Schedule a Tour</p>
        <span className="rounded-full bg-[#176FEB]/10 px-2 py-0.5 text-[8px] font-bold text-[#176FEB]">Self-Serve</span>
      </div>
      <div className="rounded-lg border border-[#E5E7EB] p-2.5">
        <p className="text-[9px] text-[#94A3B8] mb-1.5">220 King St W, Unit 814</p>
        <div className="grid grid-cols-7 gap-0.5 text-center">
          {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((d) => (
            <span key={d} className="text-[7px] text-[#94A3B8] font-medium">{d}</span>
          ))}
          {[14, 15, 16, 17, 18, 19, 20].map((d) => (
            <div
              key={d}
              className={`rounded py-1 text-[9px] font-medium ${d === 17 ? 'bg-[#176FEB] text-white' : d === 19 || d === 20 ? 'text-[#D3D5DB]' : 'text-[#555860] hover:bg-[#F5F6F8]'}`}
            >
              {d}
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-[9px] font-semibold text-[#0A1628]">Available Time Slots — Apr 17</p>
        <div className="grid grid-cols-3 gap-1.5">
          {['10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM', '5:30 PM'].map((t, i) => (
            <div key={t} className={`rounded-md border px-2 py-1.5 text-center text-[9px] font-medium ${i === 1 ? 'border-[#176FEB] bg-[#176FEB]/5 text-[#176FEB]' : 'border-[#E5E7EB] text-[#555860]'}`}>
              {t}
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-lg bg-[#176FEB] py-2 text-center text-[10px] font-semibold text-white">Confirm Tour — Apr 17, 11:30 AM</div>
    </div>
  )
}

function OfferSubmissionMock() {
  return (
    <FigmaCarousel
      screens={[
        { src: '/screenshots/leasing/time-sensitive-offers.png', label: 'Time-Sensitive Offers' },
        { src: '/screenshots/leasing/review-offers.png', label: 'Review & Compare Offers' },
        { src: '/screenshots/leasing/decline-counter.png', label: 'Decline or Counter' },
        { src: '/screenshots/leasing/counter-offer.png', label: 'Counter Offer' },
      ]}
    />
  )
}

function LeaseGenerationMock() {
  return (
    <FigmaCarousel
      screens={[
        { src: '/screenshots/leasing/lease-info.png', label: 'Lease Info & Occupants' },
        { src: '/screenshots/leasing/flexible-signature.png', label: 'Flexible Signature' },
        { src: '/screenshots/leasing/signing-deal.png', label: 'Signing The Deal' },
        { src: '/screenshots/leasing/rental-protection.png', label: 'Rental Protection' },
      ]}
    />
  )
}

function ScreeningVerificationMock() {
  return (
    <FigmaCarousel
      screens={[
        { src: '/screenshots/leasing/government-id.png', label: 'Review Government ID' },
        { src: '/screenshots/leasing/id-verification.png', label: 'ID & Selfie Verification' },
        { src: '/screenshots/leasing/credit-report.png', label: 'Credit Report (Equifax)' },
      ]}
    />
  )
}

function WalletDisbursementsMock() {
  return (
    <div className="flex h-[300px]">
      {/* Dark sidebar */}
      <div className="w-[48px] bg-[#0A1628] flex flex-col items-center py-3 gap-3 shrink-0">
        <div className="h-5 w-5 rounded bg-[#176FEB] flex items-center justify-center text-[7px] font-bold text-white">R</div>
        <div className="w-full h-px bg-white/10" />
        {['⌂', '💰', '📊', '📄', '⚙'].map((icon, i) => (
          <div key={i} className={`h-6 w-6 rounded-md flex items-center justify-center text-[10px] ${i === 1 ? 'bg-[#176FEB]/20 text-[#176FEB]' : 'text-white/40'}`}>{icon}</div>
        ))}
      </div>
      {/* Main content */}
      <div className="flex-1 bg-[#F5F6F8] overflow-hidden">
        {/* Header */}
        <div className="bg-white px-3 py-2 border-b border-[#E5E7EB] flex items-center justify-between">
          <div>
            <p className="text-[8px] text-[#94A3B8] uppercase tracking-wider font-semibold">Owner Wallet</p>
            <p className="text-[14px] font-bold text-[#0A1628]">$18,640.00</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-full bg-[#22C55E]/10 px-2 py-0.5">
              <div className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
              <span className="text-[7px] font-bold text-[#22C55E]">Auto-Disburse</span>
            </div>
            <div className="h-3 w-6 rounded-full bg-[#22C55E] relative"><div className="absolute right-0.5 top-0.5 h-2 w-2 rounded-full bg-white" /></div>
          </div>
        </div>
        {/* Two column layout */}
        <div className="grid grid-cols-2 gap-2 p-3">
          {/* Left - Breakdown table */}
          <div className="rounded-md bg-white p-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <p className="text-[8px] font-bold text-[#0A1628] mb-2">Next Disbursement — Apr 15</p>
            <div className="space-y-1.5">
              {[
                { label: 'Rent collected', amount: '+$22,400', color: '#22C55E' },
                { label: 'Management fee (8%)', amount: '-$1,792', color: '#EF4444' },
                { label: 'Maintenance reserve', amount: '-$1,120', color: '#F59E0B' },
                { label: 'Insurance', amount: '-$848', color: '#EF4444' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-[8px] text-[#555860]">{item.label}</span>
                  <span className="text-[8px] font-semibold" style={{ color: item.color }}>{item.amount}</span>
                </div>
              ))}
            </div>
            <div className="mt-2 border-t border-[#E5E7EB] pt-2 flex items-center justify-between">
              <span className="text-[8px] font-bold text-[#0A1628]">Net to owner</span>
              <span className="text-[10px] font-bold text-[#176FEB]">$18,640.00</span>
            </div>
            {/* Mini bar visualization */}
            <div className="mt-2 h-2 rounded-full bg-[#F5F6F8] overflow-hidden flex">
              <div className="bg-[#22C55E] h-full" style={{ width: '83%' }} />
              <div className="bg-[#EF4444] h-full" style={{ width: '8%' }} />
              <div className="bg-[#F59E0B] h-full" style={{ width: '5%' }} />
              <div className="bg-[#EF4444] h-full" style={{ width: '4%' }} />
            </div>
            <div className="flex justify-between mt-0.5">
              <span className="text-[6px] text-[#22C55E]">83% net</span>
              <span className="text-[6px] text-[#94A3B8]">17% deductions</span>
            </div>
          </div>
          {/* Right - Disbursement history */}
          <div className="rounded-md bg-white p-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <p className="text-[8px] font-bold text-[#0A1628] mb-2">Disbursement History</p>
            <div className="space-y-2">
              {[
                { month: 'Mar 2026', value: '$17,920', date: 'Mar 15', status: 'Sent' },
                { month: 'Feb 2026', value: '$18,100', date: 'Feb 15', status: 'Sent' },
                { month: 'Jan 2026', value: '$17,640', date: 'Jan 15', status: 'Sent' },
                { month: 'Dec 2025', value: '$16,880', date: 'Dec 15', status: 'Sent' },
              ].map((h) => (
                <div key={h.month} className="flex items-center justify-between py-1 border-b border-[#F5F6F8] last:border-0">
                  <div>
                    <p className="text-[8px] font-medium text-[#0A1628]">{h.month}</p>
                    <p className="text-[6px] text-[#94A3B8]">{h.date}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[8px] font-bold text-[#0A1628]">{h.value}</span>
                    <span className="rounded bg-[#176FEB]/10 px-1 py-px text-[6px] font-bold text-[#176FEB]">Interac</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 rounded-md bg-[#22C55E]/5 px-2 py-1 text-center">
              <span className="text-[7px] text-[#22C55E] font-semibold">All disbursements on time</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MaintenanceReportingMock() {
  return (
    <FigmaCarousel
      screens={[
        { src: '/screenshots/maintenance/request-repair.png', label: 'Easy Request Repair' },
        { src: '/screenshots/maintenance/ai-analyzes.png', label: 'AI Analyzes Request' },
        { src: '/screenshots/maintenance/overview.png', label: 'Maintenance Overview' },
        { src: '/screenshots/maintenance/scope-of-work.png', label: 'Scope of Work' },
      ]}
    />
  )
}

function InternalCommsMock() {
  return (
    <div className="flex h-[300px]">
      {/* Contact sidebar */}
      <div className="w-[130px] bg-white border-r border-[#E5E7EB] shrink-0 flex flex-col">
        <div className="px-2 py-2 border-b border-[#E5E7EB]">
          <p className="text-[9px] font-bold text-[#0A1628]">Messages</p>
          <div className="mt-1 rounded-md bg-[#F5F6F8] px-2 py-1 text-[7px] text-[#94A3B8]">🔍 Search...</div>
        </div>
        <div className="flex-1 overflow-hidden">
          {[
            { name: 'James K.', unit: '4B', msg: 'Hallway light on floor 3...', online: true, unread: true },
            { name: 'Sarah M.', unit: '7A', msg: 'Thanks for the update!', online: true, unread: false },
            { name: 'Pro Appliance', unit: 'Vendor', msg: 'Invoice attached for...', online: false, unread: true },
            { name: 'David L.', unit: '8A', msg: 'Move-out confirmed for...', online: false, unread: false },
            { name: 'Emily R.', unit: '5D', msg: 'Lease signed, thank you!', online: true, unread: false },
          ].map((c, i) => (
            <div key={c.name} className={`px-2 py-2 border-b border-[#F5F6F8] cursor-pointer ${i === 0 ? 'bg-[#176FEB]/5' : 'hover:bg-[#F5F6F8]'}`}>
              <div className="flex items-center gap-1.5">
                <div className="relative shrink-0">
                  <div className="h-5 w-5 rounded-full bg-[#176FEB]/10 flex items-center justify-center text-[6px] font-bold text-[#176FEB]">{c.name.split(' ').map(n=>n[0]).join('')}</div>
                  {c.online && <div className="absolute -bottom-px -right-px h-1.5 w-1.5 rounded-full bg-[#22C55E] border border-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[7px] font-semibold text-[#0A1628]">{c.name}</span>
                    {c.unread && <span className="h-1.5 w-1.5 rounded-full bg-[#176FEB] shrink-0" />}
                  </div>
                  <p className="text-[6px] text-[#94A3B8] truncate">{c.msg}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Chat area */}
      <div className="flex-1 bg-[#F5F6F8] flex flex-col">
        {/* Chat header */}
        <div className="bg-white px-3 py-2 border-b border-[#E5E7EB] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-[#176FEB]/10 flex items-center justify-center text-[7px] font-bold text-[#176FEB]">JK</div>
            <div>
              <p className="text-[9px] font-semibold text-[#0A1628]">James K. — Unit 4B</p>
              <p className="text-[7px] text-[#22C55E] flex items-center gap-0.5"><span className="h-1 w-1 rounded-full bg-[#22C55E] inline-block" /> Online</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span className="rounded bg-[#F5F6F8] px-1.5 py-0.5 text-[7px] text-[#94A3B8]">📎</span>
            <span className="rounded bg-[#F5F6F8] px-1.5 py-0.5 text-[7px] text-[#94A3B8]">⋯</span>
          </div>
        </div>
        {/* Messages */}
        <div className="flex-1 px-3 py-2 space-y-2 overflow-hidden">
          <div className="text-center"><span className="text-[6px] text-[#94A3B8] bg-[#E5E7EB]/50 rounded-full px-2 py-0.5">Today, 3:22 PM</span></div>
          <div className="flex">
            <div className="max-w-[70%] rounded-lg rounded-bl-sm bg-white px-2.5 py-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <p className="text-[8px] text-[#555860]">Hey, the hallway light on floor 3 is out again.</p>
              <p className="text-[6px] text-[#94A3B8] text-right mt-0.5">3:22 PM</p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="max-w-[70%] rounded-lg rounded-br-sm bg-[#176FEB] px-2.5 py-1.5">
              <p className="text-[8px] text-white">Thanks for letting us know. Maintenance has been notified and will replace it by tomorrow morning.</p>
              <p className="text-[6px] text-white/50 text-right mt-0.5">3:24 PM</p>
            </div>
          </div>
          <div className="flex">
            <div className="max-w-[70%] rounded-lg rounded-bl-sm bg-white px-2.5 py-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <p className="text-[8px] text-[#555860]">Great, appreciate the fast response!</p>
              <p className="text-[6px] text-[#94A3B8] text-right mt-0.5">3:25 PM</p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="max-w-[70%] rounded-lg rounded-br-sm bg-[#176FEB] px-2.5 py-1.5">
              <p className="text-[8px] text-white">WO-2851 created and assigned. You&apos;ll get an update once it&apos;s done.</p>
              <p className="text-[6px] text-white/50 text-right mt-0.5">3:26 PM</p>
            </div>
          </div>
        </div>
        {/* Message input */}
        <div className="bg-white px-3 py-2 border-t border-[#E5E7EB] flex items-center gap-2">
          <span className="text-[9px]">📎</span>
          <div className="flex-1 rounded-md bg-[#F5F6F8] px-2 py-1.5 text-[8px] text-[#94A3B8]">Type a message...</div>
          <div className="rounded-md bg-[#176FEB] px-2 py-1 text-[7px] font-semibold text-white">Send</div>
        </div>
      </div>
    </div>
  )
}

function TeamInboxMock() {
  return (
    <div className="flex h-[300px]">
      {/* Dark sidebar */}
      <div className="w-[48px] bg-[#0A1628] flex flex-col items-center py-3 gap-3 shrink-0">
        <div className="h-5 w-5 rounded bg-[#176FEB] flex items-center justify-center text-[7px] font-bold text-white">R</div>
        <div className="w-full h-px bg-white/10" />
        {['⌂', '📥', '✉', '📋', '⚙'].map((icon, i) => (
          <div key={i} className={`h-6 w-6 rounded-md flex items-center justify-center text-[10px] ${i === 1 ? 'bg-[#176FEB]/20 text-[#176FEB]' : 'text-white/40'}`}>{icon}</div>
        ))}
      </div>
      {/* Main content */}
      <div className="flex-1 bg-[#F5F6F8] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-white px-3 py-2 border-b border-[#E5E7EB] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-[10px] font-bold text-[#0A1628]">Team Inbox</p>
            <div className="flex gap-1">
              <span className="rounded-full bg-[#EF4444]/10 px-1.5 py-px text-[7px] font-bold text-[#EF4444]">4 Unread</span>
              <span className="rounded-full bg-[#F59E0B]/10 px-1.5 py-px text-[7px] font-bold text-[#F59E0B]">2 Flagged</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="rounded-md bg-[#F5F6F8] px-1.5 py-0.5 text-[7px] text-[#94A3B8]">🔍 Filter</span>
            <span className="rounded-md bg-[#176FEB] px-1.5 py-0.5 text-[7px] font-semibold text-white">Compose</span>
          </div>
        </div>
        {/* Table header */}
        <div className="bg-white px-3 py-1 border-b border-[#E5E7EB] flex items-center gap-2">
          <span className="w-[14px] text-[6px] text-[#94A3B8]">●</span>
          <span className="flex-1 text-[7px] font-semibold text-[#94A3B8] uppercase tracking-wider">Sender</span>
          <span className="flex-[2] text-[7px] font-semibold text-[#94A3B8] uppercase tracking-wider">Subject</span>
          <span className="w-[40px] text-[7px] font-semibold text-[#94A3B8] uppercase tracking-wider">Tag</span>
          <span className="w-[40px] text-[7px] font-semibold text-[#94A3B8] uppercase tracking-wider text-right">Time</span>
        </div>
        {/* Inbox items */}
        <div className="flex-1 overflow-hidden">
          {[
            { from: 'Sarah M.', avatar: 'SM', subject: 'Parking spot request — need assigned spot for unit 4B', time: '2m', unread: true, tag: 'Tenant', tagColor: '#176FEB', priority: '#EF4444' },
            { from: 'Pro Appliance', avatar: 'PA', subject: 'Invoice #2847 — Dishwasher repair completed', time: '18m', unread: true, tag: 'Vendor', tagColor: '#F59E0B', priority: '#F59E0B' },
            { from: 'Emily R.', avatar: 'ER', subject: 'Lease renewal inquiry — Unit 5D expiring May 31', time: '45m', unread: true, tag: 'Tenant', tagColor: '#176FEB', priority: '#176FEB' },
            { from: 'David L.', avatar: 'DL', subject: 'Move-out date confirmed — Unit 8A, June 1', time: '1h', unread: false, tag: 'Tenant', tagColor: '#176FEB', priority: null },
            { from: 'City of Toronto', avatar: 'CT', subject: 'Fire inspection scheduled — Building A, April 22', time: '3h', unread: false, tag: 'Compliance', tagColor: '#EF4444', priority: '#EF4444' },
            { from: 'CleanPro Svc', avatar: 'CP', subject: 'Monthly cleaning schedule — April units confirmed', time: '5h', unread: true, tag: 'Vendor', tagColor: '#F59E0B', priority: null },
          ].map((msg) => (
            <div key={msg.subject} className={`px-3 py-2 border-b border-[#F5F6F8] flex items-center gap-2 ${msg.unread ? 'bg-white' : 'bg-[#FAFBFC]'}`}>
              <div className="w-[14px] flex justify-center">
                {msg.priority ? <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: msg.priority }} /> : <span className="h-1.5 w-1.5" />}
              </div>
              <div className="flex items-center gap-1.5 flex-1 min-w-0">
                <div className="h-5 w-5 rounded-full bg-[#176FEB]/10 flex items-center justify-center text-[6px] font-bold text-[#176FEB] shrink-0">{msg.avatar}</div>
                <span className={`text-[8px] truncate ${msg.unread ? 'font-semibold text-[#0A1628]' : 'text-[#555860]'}`}>{msg.from}</span>
              </div>
              <p className={`flex-[2] text-[8px] truncate ${msg.unread ? 'font-medium text-[#0A1628]' : 'text-[#555860]'}`}>{msg.subject}</p>
              <span className="w-[40px] shrink-0"><span className="rounded px-1 py-px text-[6px] font-bold" style={{ backgroundColor: msg.tagColor + '15', color: msg.tagColor }}>{msg.tag}</span></span>
              <span className="w-[40px] text-[7px] text-[#94A3B8] text-right shrink-0">{msg.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AccountingLedgerMock() {
  return (
    <div className="flex h-[300px]">
      {/* Dark sidebar */}
      <div className="w-[48px] bg-[#0A1628] flex flex-col items-center py-3 gap-3 shrink-0">
        <div className="h-5 w-5 rounded bg-[#176FEB] flex items-center justify-center text-[7px] font-bold text-white">R</div>
        <div className="w-full h-px bg-white/10" />
        {['⌂', '📊', '💰', '📄', '⚙'].map((icon, i) => (
          <div key={i} className={`h-6 w-6 rounded-md flex items-center justify-center text-[10px] ${i === 1 ? 'bg-[#176FEB]/20 text-[#176FEB]' : 'text-white/40'}`}>{icon}</div>
        ))}
      </div>
      {/* Main content */}
      <div className="flex-1 bg-[#F5F6F8] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-white px-3 py-2 border-b border-[#E5E7EB] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-[10px] font-bold text-[#0A1628]">General Ledger — April 2026</p>
            <span className="rounded-full bg-[#22C55E]/10 px-1.5 py-px text-[7px] font-bold text-[#22C55E] flex items-center gap-0.5"><span className="h-1 w-1 rounded-full bg-[#22C55E]" />Reconciled</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="rounded-md bg-[#F5F6F8] px-1.5 py-0.5 text-[7px] text-[#94A3B8]">📥 Export</span>
            <span className="rounded-md bg-[#176FEB] px-1.5 py-0.5 text-[7px] font-semibold text-white">New Entry</span>
          </div>
        </div>
        {/* 4 summary cards */}
        <div className="grid grid-cols-4 gap-1.5 px-3 pt-3 pb-2">
          {[
            { label: 'Revenue', value: '$342,800', icon: '↑', color: '#22C55E', bg: '#22C55E' },
            { label: 'Expenses', value: '$128,450', icon: '↓', color: '#EF4444', bg: '#EF4444' },
            { label: 'NOI', value: '$214,350', icon: '◆', color: '#176FEB', bg: '#176FEB' },
            { label: 'Trust Balance', value: '$1,847,200', icon: '◈', color: '#0A1628', bg: '#0A1628' },
          ].map((s) => (
            <div key={s.label} className="rounded-md bg-white p-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[7px] text-[#94A3B8]">{s.label}</p>
                <span className="h-4 w-4 rounded flex items-center justify-center text-[8px]" style={{ backgroundColor: s.bg + '10', color: s.color }}>{s.icon}</span>
              </div>
              <p className="text-[11px] font-bold" style={{ color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>
        {/* Transaction table */}
        <div className="mx-3 rounded-md bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] flex-1 overflow-hidden">
          <div className="px-2.5 py-1.5 border-b border-[#F5F6F8] flex items-center justify-between">
            <p className="text-[8px] font-bold text-[#0A1628]">Recent Transactions</p>
            <span className="text-[7px] text-[#176FEB] font-medium">View All →</span>
          </div>
          {/* Table header */}
          <div className="px-2.5 py-1 bg-[#FAFBFC] border-b border-[#F5F6F8] flex items-center">
            <span className="flex-[2] text-[6px] font-semibold text-[#94A3B8] uppercase tracking-wider">Description</span>
            <span className="flex-1 text-[6px] font-semibold text-[#94A3B8] uppercase tracking-wider">Category</span>
            <span className="w-[60px] text-[6px] font-semibold text-[#94A3B8] uppercase tracking-wider text-right">Amount</span>
            <span className="w-[40px] text-[6px] font-semibold text-[#94A3B8] uppercase tracking-wider text-right">Status</span>
          </div>
          {[
            { desc: 'Owner disbursements — March', cat: 'Disbursement', amount: '$186,400', status: 'Sent', statusColor: '#22C55E' },
            { desc: 'Pro Appliance Co. — Invoice #2847', cat: 'Vendor Invoice', amount: '$42,100', status: 'Paid', statusColor: '#176FEB' },
            { desc: 'Q1 2026 tax remittances', cat: 'Tax', amount: '$18,640', status: 'Filed', statusColor: '#F59E0B' },
            { desc: 'Insurance premium — Building A', cat: 'Insurance', amount: '$8,480', status: 'Paid', statusColor: '#176FEB' },
            { desc: 'Maintenance reserve contribution', cat: 'Reserve', amount: '$11,200', status: 'Posted', statusColor: '#22C55E' },
          ].map((t) => (
            <div key={t.desc} className="px-2.5 py-1.5 border-b border-[#F5F6F8] flex items-center last:border-0">
              <span className="flex-[2] text-[7px] text-[#0A1628] truncate">{t.desc}</span>
              <span className="flex-1 text-[7px] text-[#94A3B8]">{t.cat}</span>
              <span className="w-[60px] text-[7px] font-semibold text-[#0A1628] text-right">{t.amount}</span>
              <span className="w-[40px] text-right"><span className="rounded px-1 py-px text-[6px] font-bold" style={{ backgroundColor: t.statusColor + '15', color: t.statusColor }}>{t.status}</span></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function DesktopOpsDashboardMock() {
  return (
    <div className="flex h-[300px]">
      {/* Dark sidebar */}
      <div className="w-[48px] bg-[#0A1628] flex flex-col items-center py-3 gap-3 shrink-0">
        <div className="h-5 w-5 rounded bg-[#176FEB] flex items-center justify-center text-[7px] font-bold text-white">R</div>
        <div className="w-full h-px bg-white/10" />
        {['⌂', '📋', '🔧', '👤', '⚙'].map((icon, i) => (
          <div key={i} className={`h-6 w-6 rounded-md flex items-center justify-center text-[10px] ${i === 1 ? 'bg-[#176FEB]/20 text-[#176FEB]' : 'text-white/40'}`}>{icon}</div>
        ))}
      </div>
      {/* Main content */}
      <div className="flex-1 bg-[#F5F6F8] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-white px-3 py-2 border-b border-[#E5E7EB] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-[10px] font-bold text-[#0A1628]">Operations Command Centre</p>
            <span className="flex items-center gap-1 rounded-full bg-[#22C55E]/10 px-1.5 py-px text-[7px] font-bold text-[#22C55E]"><span className="h-1.5 w-1.5 rounded-full bg-[#22C55E] animate-pulse" />Live</span>
          </div>
          <span className="text-[7px] text-[#94A3B8]">Apr 10, 2026 · 2:14 PM</span>
        </div>
        {/* 4 stat pills */}
        <div className="grid grid-cols-4 gap-1.5 px-3 pt-2 pb-1.5">
          {[
            { label: 'Total Units', value: '847', color: '#176FEB', bg: '#176FEB' },
            { label: 'Occupancy', value: '96.4%', color: '#22C55E', bg: '#22C55E' },
            { label: 'Open WOs', value: '12', color: '#F59E0B', bg: '#F59E0B' },
            { label: 'Overdue', value: '3', color: '#EF4444', bg: '#EF4444' },
          ].map((k) => (
            <div key={k.label} className="rounded-md bg-white p-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)] flex items-center gap-2">
              <div className="h-6 w-6 rounded-md flex items-center justify-center text-[10px] font-bold text-white shrink-0" style={{ backgroundColor: k.bg }}>{k.value === '847' ? '■' : k.value === '96.4%' ? '▲' : k.value === '12' ? '⚡' : '⚠'}</div>
              <div>
                <p className="text-[10px] font-bold" style={{ color: k.color }}>{k.value}</p>
                <p className="text-[6px] text-[#94A3B8]">{k.label}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Activity feed */}
        <div className="mx-3 rounded-md bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] flex-1 overflow-hidden flex flex-col">
          <div className="px-2.5 py-1.5 border-b border-[#F5F6F8] flex items-center justify-between">
            <p className="text-[8px] font-bold text-[#0A1628]">Today&apos;s Activity Feed</p>
            <span className="rounded-full bg-[#176FEB]/10 px-1.5 py-px text-[6px] font-bold text-[#176FEB]">23 events</span>
          </div>
          <div className="flex-1 px-2.5 py-1">
            {[
              { action: 'Lease signed — Unit 5D, Emily R.', time: '9:14 AM', type: 'Lease', color: '#22C55E', icon: '📝' },
              { action: 'WO-2847 assigned to Pro Appliance Co.', time: '10:02 AM', type: 'Maintenance', color: '#176FEB', icon: '🔧' },
              { action: 'Rent payment received — Sarah M. $1,850', time: '10:45 AM', type: 'Payment', color: '#22C55E', icon: '💳' },
              { action: 'Tour scheduled — Unit 2C, 2:30 PM today', time: '11:18 AM', type: 'Tour', color: '#176FEB', icon: '🏠' },
              { action: 'Insurance doc uploaded — David L., Unit 8A', time: '12:05 PM', type: 'Document', color: '#F59E0B', icon: '📄' },
              { action: 'Vendor invoice submitted — $420 plumbing', time: '1:30 PM', type: 'Invoice', color: '#F59E0B', icon: '💰' },
              { action: 'New application received — Unit 3B', time: '2:10 PM', type: 'Application', color: '#176FEB', icon: '📋' },
            ].map((a) => (
              <div key={a.action} className="flex items-center gap-2 py-1.5 border-b border-[#F5F6F8] last:border-0">
                <span className="text-[8px] shrink-0">{a.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[7px] text-[#0A1628] truncate">{a.action}</p>
                </div>
                <span className="rounded px-1 py-px text-[5px] font-bold shrink-0" style={{ backgroundColor: a.color + '15', color: a.color }}>{a.type}</span>
                <span className="text-[7px] text-[#94A3B8] shrink-0 w-[40px] text-right">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function RolePermissionsMock() {
  return (
    <div className="flex h-[300px]">
      {/* Dark sidebar */}
      <div className="w-[48px] bg-[#0A1628] flex flex-col items-center py-3 gap-3 shrink-0">
        <div className="h-5 w-5 rounded bg-[#176FEB] flex items-center justify-center text-[7px] font-bold text-white">R</div>
        <div className="w-full h-px bg-white/10" />
        {['⌂', '👥', '🔒', '📋', '⚙'].map((icon, i) => (
          <div key={i} className={`h-6 w-6 rounded-md flex items-center justify-center text-[10px] ${i === 2 ? 'bg-[#176FEB]/20 text-[#176FEB]' : 'text-white/40'}`}>{icon}</div>
        ))}
      </div>
      {/* Main content */}
      <div className="flex-1 bg-[#F5F6F8] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-white px-3 py-2 border-b border-[#E5E7EB] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-[10px] font-bold text-[#0A1628]">Team Roles & Permissions</p>
            <span className="rounded-full bg-[#176FEB]/10 px-1.5 py-px text-[7px] font-bold text-[#176FEB]">5 Active Roles</span>
          </div>
          <span className="rounded-md bg-[#176FEB] px-1.5 py-0.5 text-[7px] font-semibold text-white">+ Add Role</span>
        </div>
        {/* Role cards grid */}
        <div className="p-3 grid grid-cols-3 gap-1.5 auto-rows-min flex-1 overflow-hidden">
          {[
            { role: 'Portfolio Manager', members: 3, icon: '👔', color: '#176FEB', perms: ['Full Access', 'Financials', 'Compliance'] },
            { role: 'Leasing Agent', members: 6, icon: '🏠', color: '#22C55E', perms: ['Listings', 'Tours', 'Applications'] },
            { role: 'Maintenance Coord.', members: 4, icon: '🔧', color: '#F59E0B', perms: ['Work Orders', 'Vendors', 'Scheduling'] },
            { role: 'Accountant', members: 2, icon: '📊', color: '#EF4444', perms: ['Ledger', 'Reports', 'Disbursements'] },
            { role: 'Front Desk', members: 5, icon: '🖥', color: '#176FEB', perms: ['Messages', 'Packages', 'Visitors'] },
          ].map((r) => (
            <div key={r.role} className="rounded-md bg-white p-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <div className="flex items-center gap-1.5 mb-2">
                <div className="h-6 w-6 rounded-md flex items-center justify-center text-[10px]" style={{ backgroundColor: r.color + '15' }}>{r.icon}</div>
                <div>
                  <p className="text-[8px] font-bold text-[#0A1628]">{r.role}</p>
                  <p className="text-[6px] text-[#94A3B8]">{r.members} members</p>
                </div>
              </div>
              {/* Member avatars */}
              <div className="flex -space-x-1 mb-2">
                {Array.from({ length: Math.min(r.members, 4) }).map((_, i) => (
                  <div key={i} className="h-4 w-4 rounded-full border border-white text-[5px] font-bold flex items-center justify-center" style={{ backgroundColor: r.color + '20', color: r.color }}>
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
                {r.members > 4 && <div className="h-4 w-4 rounded-full border border-white bg-[#F5F6F8] text-[5px] font-bold flex items-center justify-center text-[#94A3B8]">+{r.members - 4}</div>}
              </div>
              {/* Permission tags */}
              <div className="flex gap-0.5 flex-wrap">
                {r.perms.map((p) => (
                  <span key={p} className="rounded-full px-1.5 py-px text-[6px] font-medium" style={{ backgroundColor: r.color + '10', color: r.color }}>{p}</span>
                ))}
              </div>
            </div>
          ))}
          {/* Add role card */}
          <div className="rounded-md border border-dashed border-[#D3D5DB] p-2.5 flex flex-col items-center justify-center">
            <div className="h-6 w-6 rounded-full bg-[#F5F6F8] flex items-center justify-center text-[10px] text-[#94A3B8] mb-1">+</div>
            <p className="text-[7px] text-[#94A3B8]">Create Role</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function AIAssistantMock() {
  return (
    <div className="flex h-[300px]">
      {/* Dark sidebar */}
      <div className="w-[48px] bg-[#0A1628] flex flex-col items-center py-3 gap-3 shrink-0">
        <div className="h-5 w-5 rounded bg-[#176FEB] flex items-center justify-center text-[7px] font-bold text-white">R</div>
        <div className="w-full h-px bg-white/10" />
        {['⌂', '🤖', '📋', '📊', '⚙'].map((icon, i) => (
          <div key={i} className={`h-6 w-6 rounded-md flex items-center justify-center text-[10px] ${i === 1 ? 'bg-[#176FEB]/20 text-[#176FEB]' : 'text-white/40'}`}>{icon}</div>
        ))}
      </div>
      {/* Main content */}
      <div className="flex-1 bg-[#F5F6F8] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-white px-3 py-2 border-b border-[#E5E7EB] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#176FEB] to-[#176FEB]/60 flex items-center justify-center text-[7px] text-white font-bold">AI</div>
            <p className="text-[10px] font-bold text-[#0A1628]">AI Operations Assistant</p>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-[#22C55E]/10 px-1.5 py-px text-[7px] font-bold text-[#22C55E]"><span className="h-1 w-1 rounded-full bg-[#22C55E]" />Active</span>
        </div>
        {/* Chat area */}
        <div className="flex-1 px-3 py-2 space-y-2 overflow-hidden">
          {/* User message */}
          <div className="flex justify-end">
            <div className="rounded-lg rounded-br-sm bg-[#176FEB]/10 px-2.5 py-1.5 max-w-[75%]">
              <p className="text-[8px] font-medium text-[#0A1628]">Broken dishwasher in Unit 7C. Handle it.</p>
              <p className="text-[6px] text-[#94A3B8] text-right mt-0.5">2:14 PM</p>
            </div>
          </div>
          {/* AI response */}
          <div className="flex items-start gap-1.5">
            <div className="mt-0.5 h-5 w-5 rounded-full bg-gradient-to-br from-[#176FEB] to-[#176FEB]/60 flex items-center justify-center text-[6px] text-white font-bold shrink-0">AI</div>
            <div className="rounded-lg rounded-bl-sm bg-white p-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] max-w-[80%]">
              <p className="text-[8px] text-[#555860] mb-2">Done. Here&apos;s what I handled:</p>
              <div className="space-y-1.5">
                {[
                  { step: 1, text: 'Classified as', highlight: 'Appliance — Priority: Medium', color: '#F59E0B', icon: '🏷' },
                  { step: 2, text: 'Matched vendor:', highlight: 'Pro Appliance Co. (4.9★)', color: '#22C55E', icon: '🔧' },
                  { step: 3, text: 'Scheduled for', highlight: 'Tomorrow, 10 AM', color: '#176FEB', icon: '📅' },
                  { step: 4, text: 'Tenant notified via', highlight: 'SMS + in-app', color: '#176FEB', icon: '📱' },
                ].map((s) => (
                  <div key={s.step} className="flex items-center gap-1.5">
                    <div className="h-4 w-4 rounded-full bg-[#22C55E] flex items-center justify-center shrink-0">
                      <span className="text-[6px] text-white font-bold">✓</span>
                    </div>
                    <p className="text-[8px] text-[#555860]">
                      {s.text} <span className="font-semibold" style={{ color: s.color }}>{s.highlight}</span>
                    </p>
                  </div>
                ))}
              </div>
              {/* Progress bar */}
              <div className="mt-2 pt-2 border-t border-[#F5F6F8]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[7px] text-[#94A3B8]">Automation Progress</span>
                  <span className="text-[7px] font-bold text-[#22C55E]">4/4 complete</span>
                </div>
                <div className="h-1.5 rounded-full bg-[#F5F6F8] overflow-hidden">
                  <div className="h-full rounded-full bg-[#22C55E] w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Action pills + input */}
        <div className="bg-white px-3 py-2 border-t border-[#E5E7EB]">
          <div className="flex items-center gap-1 mb-1.5">
            {['Classify', 'Match', 'Schedule', 'Notify'].map((b) => (
              <span key={b} className="rounded-full bg-[#22C55E]/10 px-1.5 py-0.5 text-[7px] font-medium text-[#22C55E] flex items-center gap-0.5"><span className="text-[6px]">✓</span>{b}</span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 rounded-md bg-[#F5F6F8] px-2 py-1.5 text-[8px] text-[#94A3B8]">Ask AI to handle something...</div>
            <div className="rounded-md bg-[#176FEB] px-2 py-1 text-[7px] font-semibold text-white">Send</div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   15. Vendor Portal
   ═══════════════════════════════════════════════════════════════════════════ */

function VendorPortalMock() {
  return (
    <div className="flex h-[300px]">
      {/* Dark sidebar */}
      <div className="w-[48px] bg-[#0A1628] flex flex-col items-center py-3 gap-3 shrink-0">
        <div className="h-5 w-5 rounded bg-[#176FEB] flex items-center justify-center text-[7px] font-bold text-white">R</div>
        <div className="w-full h-px bg-white/10" />
        {['⌂', '🏢', '🔧', '📋', '⚙'].map((icon, i) => (
          <div key={i} className={`h-6 w-6 rounded-md flex items-center justify-center text-[10px] ${i === 2 ? 'bg-[#176FEB]/20 text-[#176FEB]' : 'text-white/40'}`}>{icon}</div>
        ))}
      </div>
      {/* Main content */}
      <div className="flex-1 bg-[#F5F6F8] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-white px-3 py-2 border-b border-[#E5E7EB] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-[10px] font-bold text-[#0A1628]">Vendor Management</p>
            <span className="rounded-full bg-[#22C55E]/10 px-1.5 py-px text-[7px] font-bold text-[#22C55E]">12 active</span>
          </div>
          <span className="rounded-md bg-[#176FEB] px-1.5 py-0.5 text-[7px] font-semibold text-white">+ Invite Vendor</span>
        </div>
        {/* Table header */}
        <div className="bg-white px-3 py-1.5 border-b border-[#E5E7EB] flex items-center">
          <span className="w-[28px] shrink-0" />
          <span className="flex-[2] text-[6px] font-semibold text-[#94A3B8] uppercase tracking-wider">Vendor</span>
          <span className="flex-1 text-[6px] font-semibold text-[#94A3B8] uppercase tracking-wider">Category</span>
          <span className="w-[35px] text-[6px] font-semibold text-[#94A3B8] uppercase tracking-wider text-center">Jobs</span>
          <span className="w-[35px] text-[6px] font-semibold text-[#94A3B8] uppercase tracking-wider text-center">Rating</span>
          <span className="w-[40px] text-[6px] font-semibold text-[#94A3B8] uppercase tracking-wider text-right">Status</span>
        </div>
        {/* Vendor rows */}
        <div className="flex-1 overflow-hidden">
          {[
            { name: 'ProFix Plumbing', avatar: 'PF', category: 'Plumbing', jobs: 47, rating: '4.9', status: 'Active', color: '#176FEB' },
            { name: 'Spark Electric Co.', avatar: 'SE', category: 'Electrical', jobs: 31, rating: '4.8', status: 'Active', color: '#F59E0B' },
            { name: 'CleanPro Services', avatar: 'CP', category: 'Cleaning', jobs: 23, rating: '4.7', status: 'Active', color: '#22C55E' },
            { name: 'SafeGuard Security', avatar: 'SG', category: 'Security', jobs: 15, rating: '4.6', status: 'Active', color: '#EF4444' },
            { name: 'GreenScape Lawn', avatar: 'GL', category: 'Landscaping', jobs: 19, rating: '4.8', status: 'Active', color: '#22C55E' },
            { name: 'TechFix HVAC', avatar: 'TH', category: 'HVAC', jobs: 28, rating: '4.5', status: 'Active', color: '#176FEB' },
          ].map((v) => (
            <div key={v.name} className="px-3 py-2 border-b border-[#F5F6F8] flex items-center bg-white hover:bg-[#FAFBFC]">
              <div className="w-[28px] shrink-0">
                <div className="h-6 w-6 rounded-full flex items-center justify-center text-[6px] font-bold" style={{ backgroundColor: v.color + '15', color: v.color }}>{v.avatar}</div>
              </div>
              <div className="flex-[2] min-w-0">
                <p className="text-[8px] font-semibold text-[#0A1628] truncate">{v.name}</p>
              </div>
              <span className="flex-1 text-[7px] text-[#555860]">{v.category}</span>
              <span className="w-[35px] text-[8px] font-medium text-[#0A1628] text-center">{v.jobs}</span>
              <span className="w-[35px] text-[8px] font-bold text-[#F59E0B] text-center">★{v.rating}</span>
              <span className="w-[40px] text-right"><span className="rounded-full bg-[#22C55E]/10 px-1 py-px text-[6px] font-bold text-[#22C55E]">{v.status}</span></span>
            </div>
          ))}
        </div>
        {/* Footer */}
        <div className="bg-white px-3 py-1.5 border-t border-[#E5E7EB] flex items-center justify-between">
          <span className="text-[7px] text-[#94A3B8]">Showing 6 of 12 vendors</span>
          <div className="flex items-center gap-1">
            <span className="rounded bg-[#F5F6F8] px-1.5 py-0.5 text-[7px] text-[#94A3B8]">← Prev</span>
            <span className="rounded bg-[#176FEB] px-1.5 py-0.5 text-[7px] text-white font-medium">1</span>
            <span className="rounded bg-[#F5F6F8] px-1.5 py-0.5 text-[7px] text-[#94A3B8]">2</span>
            <span className="rounded bg-[#F5F6F8] px-1.5 py-0.5 text-[7px] text-[#94A3B8]">Next →</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   16. Mobile Field App
   ═══════════════════════════════════════════════════════════════════════════ */

function MobileFieldAppMock() {
  return (
    <FigmaCarousel
      screens={[
        { src: '/screenshots/maintenance/serviceman-tracking.png', label: 'Serviceman On The Way' },
        { src: '/screenshots/maintenance/schedule-technician.png', label: 'Schedule Technician' },
        { src: '/screenshots/maintenance/complete-satisfaction.png', label: 'Complete with Satisfaction' },
        { src: '/screenshots/maintenance/rate-service.png', label: 'Rate the Service' },
      ]}
    />
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   17. Compliance & Documents
   ═══════════════════════════════════════════════════════════════════════════ */

function ComplianceDocsMock() {
  return (
    <div className="flex h-[300px]">
      {/* Dark sidebar */}
      <div className="w-[48px] bg-[#0A1628] flex flex-col items-center py-3 gap-3 shrink-0">
        <div className="h-5 w-5 rounded bg-[#176FEB] flex items-center justify-center text-[7px] font-bold text-white">R</div>
        <div className="w-full h-px bg-white/10" />
        {['⌂', '📋', '📄', '🔒', '⚙'].map((icon, i) => (
          <div key={i} className={`h-6 w-6 rounded-md flex items-center justify-center text-[10px] ${i === 2 ? 'bg-[#176FEB]/20 text-[#176FEB]' : 'text-white/40'}`}>{icon}</div>
        ))}
      </div>
      {/* Main content */}
      <div className="flex-1 bg-[#F5F6F8] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-white px-3 py-2 border-b border-[#E5E7EB] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-[10px] font-bold text-[#0A1628]">Compliance Documents</p>
            <span className="rounded-full bg-[#22C55E]/10 px-1.5 py-px text-[7px] font-bold text-[#22C55E] flex items-center gap-0.5"><span className="h-1 w-1 rounded-full bg-[#22C55E]" />10/10 provinces</span>
          </div>
          <span className="rounded-md bg-[#F5F6F8] px-1.5 py-0.5 text-[7px] text-[#94A3B8]">📥 Export All</span>
        </div>
        {/* Province cards grid */}
        <div className="p-3 grid grid-cols-4 gap-1.5 flex-1 overflow-hidden">
          {[
            { province: 'ON', name: 'ON Standard Lease', updated: 'Mar 2026', status: 'Current', docs: 8 },
            { province: 'BC', name: 'BC RTB Notice', updated: 'Feb 2026', status: 'Current', docs: 6 },
            { province: 'AB', name: 'AB RTDRS Forms', updated: 'Jan 2026', status: 'Review', docs: 5 },
            { province: 'QC', name: 'QC TAL Templates', updated: 'Mar 2026', status: 'Current', docs: 7 },
            { province: 'MB', name: 'MB RTB Forms', updated: 'Mar 2026', status: 'Current', docs: 4 },
            { province: 'SK', name: 'SK ORT Templates', updated: 'Feb 2026', status: 'Current', docs: 4 },
            { province: 'NS', name: 'NS RTT Forms', updated: 'Mar 2026', status: 'Current', docs: 3 },
            { province: 'NB', name: 'NB RTT Forms', updated: 'Feb 2026', status: 'Current', docs: 3 },
          ].map((d) => (
            <div key={d.province} className="rounded-md bg-white p-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)] flex flex-col">
              <div className="flex items-center justify-between mb-1.5">
                <div className="h-6 w-6 rounded-md bg-[#176FEB]/10 flex items-center justify-center text-[8px] font-bold text-[#176FEB]">{d.province}</div>
                <span className={`rounded-full px-1 py-px text-[5px] font-bold ${d.status === 'Current' ? 'bg-[#22C55E]/10 text-[#22C55E]' : 'bg-[#F59E0B]/10 text-[#F59E0B]'}`}>{d.status}</span>
              </div>
              <p className="text-[7px] font-semibold text-[#0A1628] mb-0.5">{d.name}</p>
              <p className="text-[6px] text-[#94A3B8]">Updated {d.updated}</p>
              <p className="text-[6px] text-[#94A3B8] mt-auto pt-1">{d.docs} documents</p>
            </div>
          ))}
        </div>
        {/* Footer */}
        <div className="bg-white px-3 py-1.5 border-t border-[#E5E7EB] flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E] animate-pulse" />
            <p className="text-[7px] text-[#555860]">Auto-updated when provincial regulations change</p>
          </div>
          <span className="text-[7px] text-[#94A3B8]">Last sync: 2h ago</span>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   18. Investment & Portfolio Overview
   ═══════════════════════════════════════════════════════════════════════════ */

function InvestmentPortfolioMock() {
  return (
    <div className="flex h-[300px]">
      {/* Dark sidebar */}
      <div className="w-[48px] bg-[#0A1628] flex flex-col items-center py-3 gap-3 shrink-0">
        <div className="h-5 w-5 rounded bg-[#176FEB] flex items-center justify-center text-[7px] font-bold text-white">R</div>
        <div className="w-full h-px bg-white/10" />
        {['⌂', '📈', '🏢', '💰', '⚙'].map((icon, i) => (
          <div key={i} className={`h-6 w-6 rounded-md flex items-center justify-center text-[10px] ${i === 1 ? 'bg-[#176FEB]/20 text-[#176FEB]' : 'text-white/40'}`}>{icon}</div>
        ))}
      </div>
      {/* Main content */}
      <div className="flex-1 bg-[#F5F6F8] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-white px-3 py-2 border-b border-[#E5E7EB] flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-[#0A1628]">Portfolio Overview</p>
            <p className="text-[7px] text-[#94A3B8]">48 total units · 3 properties</p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="rounded-md bg-[#F5F6F8] px-1.5 py-0.5 text-[7px] text-[#94A3B8]">📥 Report</span>
            <span className="rounded-md bg-[#176FEB] px-1.5 py-0.5 text-[7px] font-semibold text-white">+ Property</span>
          </div>
        </div>
        {/* 4 stat cards */}
        <div className="grid grid-cols-4 gap-1.5 px-3 pt-2 pb-1.5">
          {[
            { label: 'Total NOI', value: '$36,400', sub: '/month', color: '#22C55E' },
            { label: 'Avg Occupancy', value: '95.8%', sub: '+2.1% YoY', color: '#22C55E' },
            { label: 'Avg Rent', value: '$1,820', sub: '/unit', color: '#176FEB' },
            { label: 'Cap Rate', value: '6.2%', sub: 'Portfolio avg', color: '#176FEB' },
          ].map((s) => (
            <div key={s.label} className="rounded-md bg-white p-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <p className="text-[7px] text-[#94A3B8] mb-0.5">{s.label}</p>
              <p className="text-[11px] font-bold" style={{ color: s.color }}>{s.value}</p>
              <p className="text-[6px] text-[#94A3B8]">{s.sub}</p>
            </div>
          ))}
        </div>
        {/* Property table */}
        <div className="mx-3 rounded-md bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] flex-1 overflow-hidden">
          <div className="px-2.5 py-1.5 border-b border-[#F5F6F8] flex items-center justify-between">
            <p className="text-[8px] font-bold text-[#0A1628]">Properties</p>
            <span className="text-[7px] text-[#176FEB] font-medium">View Details →</span>
          </div>
          {/* Table header */}
          <div className="px-2.5 py-1 bg-[#FAFBFC] border-b border-[#F5F6F8] flex items-center">
            <span className="flex-[2] text-[6px] font-semibold text-[#94A3B8] uppercase tracking-wider">Property</span>
            <span className="w-[35px] text-[6px] font-semibold text-[#94A3B8] uppercase tracking-wider text-center">Units</span>
            <span className="w-[50px] text-[6px] font-semibold text-[#94A3B8] uppercase tracking-wider text-center">Occupancy</span>
            <span className="w-[55px] text-[6px] font-semibold text-[#94A3B8] uppercase tracking-wider text-right">NOI/mo</span>
          </div>
          {[
            { name: '45 Queen St', type: 'Mid-Rise · Downtown', units: 24, occupancy: 96, noi: '$18,400' },
            { name: '120 King Ave', type: 'Low-Rise · Midtown', units: 16, occupancy: 100, noi: '$12,800' },
            { name: '88 Bay Blvd', type: 'Townhomes · West End', units: 8, occupancy: 87.5, noi: '$5,200' },
          ].map((p) => (
            <div key={p.name} className="px-2.5 py-2 border-b border-[#F5F6F8] flex items-center last:border-0">
              <div className="flex-[2] min-w-0">
                <p className="text-[8px] font-semibold text-[#0A1628]">{p.name}</p>
                <p className="text-[6px] text-[#94A3B8]">{p.type}</p>
              </div>
              <span className="w-[35px] text-[8px] font-medium text-[#0A1628] text-center">{p.units}</span>
              <div className="w-[50px] flex items-center gap-1 justify-center">
                <div className="h-1 w-[24px] rounded-full bg-[#F5F6F8] overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${p.occupancy}%`, backgroundColor: p.occupancy >= 95 ? '#22C55E' : '#F59E0B' }} />
                </div>
                <span className="text-[7px] font-medium" style={{ color: p.occupancy >= 95 ? '#22C55E' : '#F59E0B' }}>{p.occupancy}%</span>
              </div>
              <span className="w-[55px] text-[8px] font-bold text-[#22C55E] text-right">{p.noi}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Visual Library Data — 18 entries with pain/resolution pairs
   ═══════════════════════════════════════════════════════════════════════════ */

interface VisualEntry {
  title: string
  pain: string
  resolution: string
  mockup: () => React.JSX.Element
  frameType: 'desktop' | 'mobile'
  url: string
  figmaScreenshot?: { src: string; alt: string }
}

const visuals: VisualEntry[] = [
  {
    title: 'Owner App Home',
    pain: 'You check three different spreadsheets, two bank accounts, and an email thread just to know where your portfolio stands today.',
    resolution: 'Revun shows occupancy, collections, and overdue balances in one owner dashboard — updated in real time, every time.',
    mockup: OwnerAppMock,
    frameType: 'desktop',
    url: 'app.revun.com/dashboard',
  },
  {
    title: 'Tenant App Home',
    pain: 'Tenants call, text, and email your personal number for everything from rent to repairs — and nothing gets tracked.',
    resolution: 'Revun gives every tenant a self-serve portal for payments, maintenance, documents, and lease actions — all logged automatically.',
    mockup: TenantAppMock,
    frameType: 'mobile',
    url: 'app.revun.com/tenant',
    figmaScreenshot: { src: '/screenshots/platform/tenant-app-home.png', alt: 'Revun tenant app home — property listings and search' },
  },
  {
    title: 'Property Search',
    pain: 'Prospective tenants bounce between listing sites, miss availability updates, and never find the right fit.',
    resolution: 'Revun powers a searchable listings engine with real-time availability, unit details, and filters — branded to your portfolio.',
    mockup: PropertySearchMock,
    frameType: 'desktop',
    url: 'app.revun.com/listings',
  },
  {
    title: 'Tour Booking',
    pain: 'Scheduling tours means back-and-forth messages, double bookings, and agents losing weekends to no-shows.',
    resolution: 'Revun lets prospects self-schedule tours from available time slots — synced to your calendar, confirmed instantly.',
    mockup: TourBookingMock,
    frameType: 'mobile',
    url: 'app.revun.com/tours',
    figmaScreenshot: { src: '/screenshots/tours/book-instantly.png', alt: 'Revun tour booking screen — instant self-scheduling' },
  },
  {
    title: 'Offer Submission',
    pain: 'Applications arrive by email, PDF, and text — half incomplete, impossible to compare, and none verified.',
    resolution: 'Revun captures applications in a structured pipeline with identity verification, credit checks, and scoring — every applicant treated equally.',
    mockup: OfferSubmissionMock,
    frameType: 'mobile',
    url: 'app.revun.com/applications',
    figmaScreenshot: { src: '/screenshots/platform/offer-submission.png', alt: 'Revun offer submission — review and approve rental offers' },
  },
  {
    title: 'Screening & Verification',
    pain: 'You call references manually, accept unverified IDs, and have no way to confirm income or credit without chasing documents for days.',
    resolution: 'Revun runs government ID verification, selfie matching, and Equifax credit reports in one automated flow — applicants verified in minutes, not days.',
    mockup: ScreeningVerificationMock,
    frameType: 'mobile',
    url: 'app.revun.com/screening',
    figmaScreenshot: { src: '/screenshots/platform/screening-verification.png', alt: 'Revun screening — document vault and identity verification' },
  },
  {
    title: 'Lease Generation',
    pain: 'You draft leases manually, miss provincial clauses, and chase signatures for weeks.',
    resolution: 'Revun auto-generates province-compliant lease documents with pre-filled terms and sends them for digital signature in minutes.',
    mockup: LeaseGenerationMock,
    frameType: 'mobile',
    url: 'app.revun.com/leases',
    figmaScreenshot: { src: '/screenshots/platform/lease-generation.png', alt: 'Revun lease generation — organized lease info with tenants and occupants' },
  },
  {
    title: 'Wallet & Owner Disbursements',
    pain: 'Owner payouts involve manual calculations, spreadsheet reconciliation, and delayed transfers that erode trust.',
    resolution: 'Revun calculates net payouts automatically — rent minus fees, reserves, and expenses — then disburses on schedule with a full audit trail.',
    mockup: WalletDisbursementsMock,
    frameType: 'desktop',
    url: 'app.revun.com/wallet',
  },
  {
    title: 'Maintenance Reporting',
    pain: 'Tenants report issues by text message and you lose the thread, the photos, and the urgency within hours.',
    resolution: 'Revun captures every maintenance request with photos, categories, entry permissions, and instant vendor dispatch — nothing gets lost.',
    mockup: MaintenanceReportingMock,
    frameType: 'mobile',
    url: 'app.revun.com/maintenance',
    figmaScreenshot: { src: '/screenshots/platform/maintenance-reporting.png', alt: 'Revun maintenance — easy request repair with photo upload' },
  },
  {
    title: 'Internal Communications',
    pain: 'Your team loses time jumping between CRM, email, calendars, forms, and payment tools.',
    resolution: 'Revun keeps every conversation, request, document, and transaction inside one record — no context switching, full audit trail.',
    mockup: InternalCommsMock,
    frameType: 'desktop',
    url: 'app.revun.com/messages',
  },
  {
    title: 'Team Inbox',
    pain: 'Tenant messages, vendor invoices, and compliance notices land in five different inboxes that nobody owns.',
    resolution: 'Revun routes every inbound message to one team inbox — tagged, prioritized, and assignable so nothing falls through the cracks.',
    mockup: TeamInboxMock,
    frameType: 'desktop',
    url: 'app.revun.com/inbox',
  },
  {
    title: 'Accounting & Reporting',
    pain: 'Your bookkeeper reconciles rent, expenses, and trust balances across three disconnected systems every month.',
    resolution: 'Revun runs a real-time ledger with auto-reconciliation, trust accounting, and one-click reporting — ready for your accountant or auditor.',
    mockup: AccountingLedgerMock,
    frameType: 'desktop',
    url: 'app.revun.com/accounting',
  },
  {
    title: 'Operations Dashboard',
    pain: 'You have no single view of what happened today — leases signed, payments received, work orders opened — until you manually aggregate it.',
    resolution: 'Revun surfaces a live operations feed showing every event across your portfolio — leases, payments, maintenance, tours — in one command centre.',
    mockup: DesktopOpsDashboardMock,
    frameType: 'desktop',
    url: 'app.revun.com/operations',
  },
  {
    title: 'Role-Based Permissions',
    pain: 'Everyone on your team has access to everything — or nothing. There is no middle ground and no accountability.',
    resolution: 'Revun assigns granular permissions by role — leasing agents see applications, accountants see ledgers, front desk sees messages — nothing more, nothing less.',
    mockup: RolePermissionsMock,
    frameType: 'desktop',
    url: 'app.revun.com/settings/roles',
  },
  {
    title: 'AI Assistant Flows',
    pain: 'Manual triage, vendor matching, and tenant follow-ups consume hours that should go to growth.',
    resolution: 'Revun deploys AI that classifies issues, matches vendors, schedules appointments, and notifies tenants — automatically, in seconds.',
    mockup: AIAssistantMock,
    frameType: 'desktop',
    url: 'app.revun.com/ai-ops',
  },
  {
    title: 'Vendor Portal',
    pain: 'You track vendors in a spreadsheet, chase invoices by email, and have no visibility into performance or reliability.',
    resolution: 'Revun gives every vendor a portal to receive work orders, submit invoices, and track payments — with ratings, job history, and dispatch built in.',
    mockup: VendorPortalMock,
    frameType: 'desktop',
    url: 'app.revun.com/vendors',
  },
  {
    title: 'Mobile Field App',
    pain: 'Field technicians get dispatched via phone call, navigate with personal GPS, and report completion by text message.',
    resolution: 'Revun routes field teams through a mobile app with daily schedules, navigation, photo capture, and one-tap completion — all synced to the main dashboard.',
    mockup: MobileFieldAppMock,
    frameType: 'mobile',
    url: 'app.revun.com/field',
    figmaScreenshot: { src: '/screenshots/events/navigate-route.png', alt: 'Revun field app — serviceman route navigation and tracking' },
  },
  {
    title: 'Compliance & Documents',
    pain: 'Provincial regulations change quarterly and you find out when a tenant files a complaint — not before.',
    resolution: 'Revun auto-updates lease templates, notice forms, and compliance checklists when provincial rules change — so you are always current, never exposed.',
    mockup: ComplianceDocsMock,
    frameType: 'desktop',
    url: 'app.revun.com/compliance',
  },
  {
    title: 'Investment & Portfolio Overview',
    pain: 'You calculate NOI, cap rates, and occupancy across properties manually — and the numbers are always a month behind.',
    resolution: 'Revun surfaces real-time portfolio analytics: NOI by property, occupancy trends, average rent, and cap rate — updated as transactions happen.',
    mockup: InvestmentPortfolioMock,
    frameType: 'desktop',
    url: 'app.revun.com/portfolio',
  },
]

/* ═══════════════════════════════════════════════════════════════════════════
   Categories — group the 19 entries into logical sections
   ═══════════════════════════════════════════════════════════════════════════ */

const categories: { name: string; subtitle: string; icon: LucideIcon; entries: number[] }[] = [
  {
    name: 'Property & Tenant Management',
    subtitle: 'How owners manage properties and tenants find, tour, and rent homes.',
    icon: Building2,
    entries: [0, 1, 2, 3],
  },
  {
    name: 'Leasing & Screening',
    subtitle: 'How applications turn into signed leases — with verification at every step.',
    icon: FileSignature,
    entries: [4, 5, 6],
  },
  {
    name: 'Financial Operations',
    subtitle: 'How money flows — rent collection, owner payouts, and maintenance costs.',
    icon: DollarSign,
    entries: [7, 8],
  },
  {
    name: 'Communications & Operations',
    subtitle: 'How your team talks to tenants, vendors, and each other — and how everything gets tracked.',
    icon: MessageSquare,
    entries: [9, 10, 11, 12],
  },
  {
    name: 'Administration & Intelligence',
    subtitle: 'How you control access, automate decisions, manage vendors, stay compliant, and see the big picture.',
    icon: Shield,
    entries: [13, 14, 15, 16, 17, 18],
  },
]

/* ═══════════════════════════════════════════════════════════════════════════
   Visual entry card component — clean card layout
   ═══════════════════════════════════════════════════════════════════════════ */

function VisualEntryRow({ entry, index }: { entry: VisualEntry; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })
  const Mockup = entry.mockup

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden hover:shadow-lg transition-shadow"
    >
      {/* Top section — mockup */}
      <div className="bg-[#F5F6F8] p-4 md:p-6">
        {entry.frameType === 'desktop' ? (
          <BrowserFrame url={entry.url}>
            <Mockup />
          </BrowserFrame>
        ) : (
          <div className="flex justify-center py-4">
            <div className="w-[200px]">
              {entry.figmaScreenshot ? (
                <MobileFrame>
                  <div className="relative h-full w-full">
                    <Image
                      src={entry.figmaScreenshot.src}
                      alt={entry.figmaScreenshot.alt}
                      fill
                      className="object-cover object-top"
                      sizes="320px"
                    />
                  </div>
                </MobileFrame>
              ) : (
                <MobileFrame>
                  <Mockup />
                </MobileFrame>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom section — text content */}
      <div className="px-5 py-4 md:px-6 md:py-5">
        {/* Number badge + title */}
        <div className="flex items-center gap-2.5 mb-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#176FEB]/10 text-xs font-bold text-[#176FEB]">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h4 className="font-heading text-lg font-semibold text-[#0A1628]">{entry.title}</h4>
        </div>

        {/* Pain — short italic quote */}
        <p className="text-sm leading-relaxed text-[#94A3B8] italic mb-2">
          &ldquo;{entry.pain}&rdquo;
        </p>

        {/* Resolution — blue accent line */}
        <div className="border-l-2 border-[#176FEB] pl-3">
          <p className="text-sm leading-relaxed text-[#555860]">
            {entry.resolution}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Main export
   ═══════════════════════════════════════════════════════════════════════════ */

export default function VisualLibrary() {
  return (
    <section className="bg-[#F5F6F8] py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <RevealOnScroll className="mx-auto max-w-3xl text-center mb-8">
          <motion.p
            variants={revealItem}
            className="text-sm font-heading font-semibold uppercase tracking-wider text-brand-blue"
          >
            The Platform in Action
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mt-3 font-display text-4xl font-normal text-[#0A1628] md:text-5xl"
          >
            Every workflow. One <span className="text-keyword">system</span>.
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mx-auto mt-4 max-w-2xl text-lg text-brand-graphite-mid"
          >
            See the actual screens your team, tenants, and owners use every day — and the problems they eliminate.
          </motion.p>
        </RevealOnScroll>

        {/* Jump-to navigation pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
          {categories.map((cat, i) => (
            <a
              key={cat.name}
              href={`#platform-${i}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-medium text-[#555860] transition-all hover:border-[#176FEB]/30 hover:text-[#176FEB] hover:shadow-sm"
            >
              <cat.icon className="h-3.5 w-3.5" />
              {cat.name}
            </a>
          ))}
        </div>

        {/* Categories */}
        {categories.map((category, catIndex) => (
          <div key={category.name} id={`platform-${catIndex}`} className="mb-20 last:mb-0 scroll-mt-24">
            {/* Category header with step number */}
            <RevealOnScroll className="mb-10">
              <motion.div variants={revealItem} className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left md:gap-5">
                {/* Step circle */}
                <div className="mb-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#176FEB] shadow-lg shadow-[#176FEB]/20 md:mb-0">
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#176FEB] mb-1">
                    Part {catIndex + 1} of {categories.length}
                  </p>
                  <h3 className="font-heading text-2xl font-bold text-[#0A1628] md:text-3xl">
                    {category.name}
                  </h3>
                  <p className="mt-2 text-base text-[#555860] max-w-xl">
                    {category.subtitle}
                  </p>
                </div>
              </motion.div>
            </RevealOnScroll>

            {/* Cards grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {category.entries.map((idx) => (
                <VisualEntryRow key={visuals[idx].title} entry={visuals[idx]} index={idx} />
              ))}
            </div>

            {/* Divider between categories */}
            {catIndex < categories.length - 1 && (
              <div className="mt-20 flex items-center gap-4">
                <div className="h-px flex-1 bg-[#E5E7EB]" />
                <div className="h-2 w-2 rounded-full bg-[#176FEB]/30" />
                <div className="h-px flex-1 bg-[#E5E7EB]" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
