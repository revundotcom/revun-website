'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Calendar,
  MapPin,
  Clock,
  Navigation,
  Shield,
  Star,
  Plus,
  SlidersHorizontal,
  Phone,
  Mic,
  AlertTriangle,
  Users,
  Car,
  Share2,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Heart,
  CalendarCheck,
  Send,
  Compass,
  Bookmark,
  Library,
  Home,
  Search,
  Grid3X3,
  List,
  Eye,
} from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import { DeviceFrame } from '@/components/ui/device-frame'

/* ── Sample event data ── */

const upcomingEvents = [
  {
    id: 1,
    type: 'Confirmed Tour',
    status: 'confirmed',
    property: '1241-123 Main Street',
    city: 'Niagara Falls, ON',
    date: 'Thu, May 15',
    time: '10:30 AM',
    image: null,
  },
  {
    id: 2,
    type: 'Scheduled Tour',
    status: 'scheduled',
    property: '704-75 Portland St.',
    city: 'Mississauga, ON',
    date: 'Wed, May 14',
    time: '10:30 AM',
    image: null,
  },
  {
    id: 3,
    type: 'Pending Confirmation',
    status: 'pending',
    property: '55 Harbour Square, Unit 3201',
    city: 'Toronto, ON',
    date: 'Fri, May 16',
    time: '2:00 PM',
    image: null,
  },
]

const features = [
  {
    icon: Calendar,
    title: 'Everything, Scheduled',
    description: 'Update events, reschedule if needed, or use directions and ride options to get there on time.',
    color: 'bg-[#176FEB]',
    screenshot: '/screenshots/events/everything-scheduled.png',
    bullets: ['Reschedule or cancel with one tap', 'Integrated directions and ride options', 'Real-time status updates for every event'],
  },
  {
    icon: MapPin,
    title: 'See Events on the Map',
    description: 'View all your upcoming events by location, so you can plan where you are going next.',
    color: 'bg-[#176FEB]',
    screenshot: '/screenshots/events/map-view.png',
    bullets: ['Interactive map with all tour locations', 'Plan your route across multiple events', 'See nearby properties and amenities'],
  },
  {
    icon: Navigation,
    title: 'Navigate the Best Route',
    description: 'See the route, share your location, and invite others so everyone arrives on time.',
    color: 'bg-[#176FEB]',
    screenshot: '/screenshots/events/navigate-route.png',
    bullets: ['Turn-by-turn navigation built in', 'Share your live location with others', 'Invite attendees so everyone arrives together'],
  },
  {
    icon: Shield,
    title: 'Start Your Tour Safely',
    description: 'Live arrival updates, property details, and a secure PIN to start once your agent arrives.',
    color: 'bg-[#176FEB]',
    screenshot: '/screenshots/events/tour-safety.png',
    bullets: ['Secure PIN verification before entry', 'Live arrival updates for all parties', 'Full property details at your fingertips'],
  },
  {
    icon: Star,
    title: 'Rate Your Experience',
    description: 'Your feedback helps keep schedules accurate and events running smoothly.',
    color: 'bg-[#176FEB]',
    screenshot: '/screenshots/events/rate-experience.png',
    bullets: ['Star ratings and detailed feedback', 'Tag agents with helpful traits', 'Improve the community for everyone'],
  },
  {
    icon: Phone,
    title: 'Safety Tools, Built In',
    description: 'Quick access to help, recordings, and verification, so you feel confident during the tour.',
    color: 'bg-[#176FEB]',
    screenshot: '/screenshots/events/safety-tools.png',
    bullets: ['Audio recording for your records', 'One-tap access to emergency services', 'Share location with trusted contacts'],
  },
]

const tourDiscoveryFeatures = [
  {
    icon: Heart,
    title: 'Like What You See',
    description: 'Like tours to get more homes that match your style.',
    src: '/screenshots/tours/like-tours.png',
    bullets: ['AI-powered recommendations', 'Personalized feed', 'One-tap interaction'],
  },
  {
    icon: CalendarCheck,
    title: 'Book Tours Instantly',
    description: 'Schedule a tour or reserve a unit while browsing.',
    src: '/screenshots/tours/book-instantly.png',
    bullets: ['Real-time availability', 'Instant booking', 'Reserve before visiting'],
  },
  {
    icon: Send,
    title: 'Share with Others',
    description: 'Share tours with friends, family, or anyone helping you decide.',
    src: '/screenshots/tours/share-tours.png',
    bullets: ['Share via any app', 'Invite co-viewers', 'Collaborative decisions'],
  },
  {
    icon: Compass,
    title: 'Swipe to Discover',
    description: 'Browse tours by swiping to explore available homes nearby.',
    src: '/screenshots/tours/swipe-discover.png',
    bullets: ['Location-based discovery', 'Swipe interface', 'Explore neighborhoods'],
  },
  {
    icon: Bookmark,
    title: 'Saved Tours & Homes',
    description: 'Keep all your saved tours and properties in one place.',
    src: '/screenshots/tours/saved-tours.png',
    bullets: ['Video & photo library', 'Create collections', 'Quick access'],
  },
  {
    icon: Library,
    title: 'Save Your Favorites',
    description: 'Save tours and organize them so you can come back later.',
    src: '/screenshots/tours/save-favorites.png',
    bullets: ['Organized by city', 'Custom libraries', 'Properties & tours tabs'],
  },
]

const safetyTools = [
  { icon: Mic, label: 'Meet Audio Recording', description: 'Record tours for your records' },
  { icon: CheckCircle2, label: 'Verify Meet with Codes', description: 'PIN-based agent verification' },
  { icon: Share2, label: 'Share Location', description: 'Share live location with contacts' },
  { icon: Phone, label: 'Emergency Services', description: 'Quick access to 911' },
]

/* ── Status badge ── */

function StatusBadge({ status }: { status: string }) {
  const styles = {
    confirmed: 'bg-[#176FEB]/10 text-[#176FEB]',
    scheduled: 'bg-[#176FEB]/10 text-[#176FEB]',
    pending: 'bg-[#F59E0B]/10 text-[#F59E0B]',
  }
  const labels = {
    confirmed: 'Confirmed',
    scheduled: 'Scheduled',
    pending: 'Pending',
  }
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles[status as keyof typeof styles] || styles.pending}`}>
      {labels[status as keyof typeof labels] || status}
    </span>
  )
}

/* ── Main component ── */

export function EventsClient() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming')

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#F5F6F8] py-12 md:py-20 overflow-hidden">
        {/* Ambient blob */}
        <div className="absolute top-[-100px] left-[-150px] h-[400px] w-[400px] rounded-full bg-[#176FEB]/[0.04] blur-[100px]" aria-hidden="true" />
        <RevealOnScroll className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8 text-center relative z-10">
          <motion.p variants={revealItem} className="font-heading text-sm font-semibold uppercase tracking-wider text-[#176FEB]">
            Events & Tours
          </motion.p>
          <motion.h1 variants={revealItem} className="mt-3 font-display text-3xl font-normal text-[#0A1628] md:text-5xl lg:text-6xl">
            Schedule, navigate, and <span className="text-[#176FEB]">tour</span> with confidence
          </motion.h1>
          <motion.p variants={revealItem} className="mx-auto mt-4 max-w-2xl text-lg text-[#555860]">
            Book property tours, get directions, verify agents with secure PINs, and rate your experience. All with built-in safety tools.
          </motion.p>
          <motion.div variants={revealItem} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/features/"
              className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-xl bg-[#176FEB] px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#0B5AD4]"
            >
              See the Platform
            </Link>
            <Link
              href="/demo/"
              className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-6 text-sm font-semibold text-[#2C2E33] transition-colors duration-200 hover:border-[#176FEB]/30"
            >
              Book a Live Demo
            </Link>
          </motion.div>
        </RevealOnScroll>
      </section>

      {/* Feature sections — alternating layout with real screenshots */}
      <section className="bg-white py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll className="text-center mb-12 md:mb-16">
            <motion.h2 variants={revealItem} className="font-heading text-2xl font-bold text-[#0A1628] md:text-3xl">
              How it works
            </motion.h2>
          </RevealOnScroll>

          <div className="space-y-20 md:space-y-28">
            {features.map((f, i) => {
              const isReversed = i % 2 === 1
              return (
                <RevealOnScroll key={f.title}>
                  <motion.div
                    variants={revealItem}
                    className={`flex flex-col items-center gap-10 md:gap-16 ${
                      isReversed ? 'md:flex-row-reverse' : 'md:flex-row'
                    }`}
                  >
                    {/* Text side */}
                    <div className="flex-1 space-y-5">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${f.color}`}>
                        <f.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-heading text-xl font-bold text-[#0A1628] md:text-2xl">
                        {f.title}
                      </h3>
                      <p className="text-base leading-relaxed text-[#555860]">
                        {f.description}
                      </p>
                      <ul className="space-y-2.5">
                        {f.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-2.5 text-sm text-[#555860]">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#176FEB]" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Screenshot side */}
                    <div className="flex-1 flex justify-center">
                      <DeviceFrame device="iphone" className="max-w-[260px] w-full">
                        <Image
                          src={f.screenshot}
                          alt={`${f.title} — Revun mobile screenshot`}
                          width={390}
                          height={844}
                          className="h-auto w-full"
                        />
                      </DeviceFrame>
                    </div>
                  </motion.div>
                </RevealOnScroll>
              )
            })}
          </div>
        </div>
      </section>

      {/* Tour Discovery — alternating layout */}
      <section className="bg-[#F5F6F8] py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll className="text-center mb-12 md:mb-16">
            <motion.p variants={revealItem} className="font-heading text-sm font-semibold uppercase tracking-wider text-[#176FEB]">
              Tour Discovery
            </motion.p>
            <motion.h2 variants={revealItem} className="mt-3 font-display text-3xl font-normal text-[#0A1628] md:text-4xl lg:text-5xl">
              Find your next home with <span className="text-[#176FEB] font-semibold">intelligent tours</span>
            </motion.h2>
            <motion.p variants={revealItem} className="mx-auto mt-4 max-w-2xl text-lg text-[#555860]">
              Like, swipe, save, share, and book — all from one app.
            </motion.p>
          </RevealOnScroll>

          <div className="space-y-20 md:space-y-28">
            {tourDiscoveryFeatures.map((f, i) => {
              const isReversed = i % 2 === 1
              return (
                <RevealOnScroll key={f.title}>
                  <motion.div
                    variants={revealItem}
                    className={`flex flex-col items-center gap-10 md:gap-16 ${
                      isReversed ? 'md:flex-row-reverse' : 'md:flex-row'
                    }`}
                  >
                    {/* Text side */}
                    <div className="flex-1 space-y-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#176FEB]">
                        <f.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-heading text-xl font-bold text-[#0A1628] md:text-2xl">
                        {f.title}
                      </h3>
                      <p className="text-base leading-relaxed text-[#555860]">
                        {f.description}
                      </p>
                      <ul className="space-y-2.5">
                        {f.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-2.5 text-sm text-[#555860]">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#176FEB]" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Screenshot side */}
                    <div className="flex-1 flex justify-center">
                      <DeviceFrame device="iphone" className="max-w-[260px] w-full">
                        <Image
                          src={f.src}
                          alt={`${f.title} — Revun tour discovery screenshot`}
                          width={390}
                          height={844}
                          className="h-auto w-full object-contain"
                        />
                      </DeviceFrame>
                    </div>
                  </motion.div>
                </RevealOnScroll>
              )
            })}
          </div>
        </div>
      </section>

      {/* Desktop / Webapp events dashboard */}
      <section className="bg-[#F5F6F8] py-12 md:py-20 overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll className="text-center mb-12">
            <motion.p variants={revealItem} className="font-heading text-sm font-semibold uppercase tracking-wider text-[#176FEB]">
              Desktop &amp; Web
            </motion.p>
            <motion.h2 variants={revealItem} className="mt-3 font-display text-3xl font-normal text-[#0A1628] md:text-4xl lg:text-5xl">
              Full event management on the <span className="text-[#176FEB] font-semibold">web</span>
            </motion.h2>
            <motion.p variants={revealItem} className="mx-auto mt-4 max-w-2xl text-lg text-[#555860]">
              The same powerful events system, designed for desktop operators and property teams.
            </motion.p>
          </RevealOnScroll>

          <RevealOnScroll>
            <motion.div variants={revealItem}>
              <DeviceFrame device="desktop" className="w-full max-w-5xl mx-auto">
                {/* Browser-style webapp mockup */}
                <div className="min-h-[420px] bg-[#F5F6F8] text-left select-none" style={{ fontSize: 13 }}>
                  {/* Top bar */}
                  <div className="flex items-center justify-between border-b border-[#E5E7EB] bg-white px-5 py-3">
                    <div className="flex items-center gap-3">
                      <h3 className="font-heading text-base font-bold text-[#0A1628]">My Events</h3>
                      <div className="flex items-center gap-1.5">
                        <span className="flex h-7 w-7 items-center justify-center rounded-md border border-[#E5E7EB] bg-[#F5F6F8] text-[#555860]">
                          <Plus className="h-3.5 w-3.5" />
                        </span>
                        <span className="flex h-7 w-7 items-center justify-center rounded-md border border-[#E5E7EB] bg-[#F5F6F8] text-[#555860]">
                          <SlidersHorizontal className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-[#F5F6F8] px-3 py-1.5 text-xs text-[#555860]">
                      <Calendar className="h-3.5 w-3.5 text-[#176FEB]" />
                      Thursday, 15 May
                    </div>
                  </div>

                  {/* Body: list + map */}
                  <div className="flex">
                    {/* Left: event list (60%) */}
                    <div className="w-[60%] border-r border-[#E5E7EB] bg-white">
                      {/* Tabs */}
                      <div className="flex gap-0 border-b border-[#E5E7EB]">
                        <span className="border-b-2 border-[#176FEB] px-4 py-2.5 text-xs font-semibold text-[#176FEB]">Upcoming</span>
                        <span className="px-4 py-2.5 text-xs font-medium text-[#9CA3AF]">Past</span>
                      </div>

                      {/* Event card 1 - Confirmed */}
                      <div className="border-b border-[#E5E7EB] p-4 hover:bg-[#F5F6F8]/50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="min-w-0 flex-1">
                            <div className="mb-1 flex items-center gap-2">
                              <span className="inline-flex rounded-full bg-[#176FEB]/10 px-2 py-0.5 text-[10px] font-semibold text-[#176FEB]">Confirmed Tour</span>
                            </div>
                            <p className="truncate font-heading text-sm font-semibold text-[#0A1628]">1241-123 Main Street</p>
                            <p className="text-xs text-[#555860]">Niagara Falls, ON</p>
                            <div className="mt-1.5 flex items-center gap-3 text-[10px] text-[#9CA3AF]">
                              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />Thu May 15</span>
                              <span className="flex items-center gap-1"><Clock className="h-3 w-3" />10:30 AM</span>
                            </div>
                          </div>
                          <div className="ml-3 flex shrink-0 items-center gap-1.5">
                            <span className="rounded-md border border-[#E5E7EB] px-2.5 py-1 text-[10px] font-medium text-[#555860]">Cancel</span>
                            <span className="rounded-md border border-[#F59E0B]/30 bg-[#F59E0B]/5 px-2.5 py-1 text-[10px] font-medium text-[#F59E0B]">Running Late?</span>
                          </div>
                        </div>
                      </div>

                      {/* Event card 2 - Scheduled */}
                      <div className="border-b border-[#E5E7EB] p-4 hover:bg-[#F5F6F8]/50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="min-w-0 flex-1">
                            <div className="mb-1 flex items-center gap-2">
                              <span className="inline-flex rounded-full bg-[#176FEB]/10 px-2 py-0.5 text-[10px] font-semibold text-[#176FEB]">Scheduled Tour</span>
                            </div>
                            <p className="truncate font-heading text-sm font-semibold text-[#0A1628]">704-75 Portland St.</p>
                            <p className="text-xs text-[#555860]">Mississauga, ON</p>
                            <div className="mt-1.5 flex items-center gap-3 text-[10px] text-[#9CA3AF]">
                              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />Wed May 14</span>
                              <span className="flex items-center gap-1"><Clock className="h-3 w-3" />10:30 AM</span>
                            </div>
                          </div>
                          <div className="ml-3 flex shrink-0 items-center gap-1.5">
                            <span className="rounded-md bg-[#176FEB] px-2.5 py-1 text-[10px] font-medium text-white">View Details</span>
                          </div>
                        </div>
                      </div>

                      {/* Event card 3 - Pending */}
                      <div className="border-b border-[#E5E7EB] p-4 hover:bg-[#F5F6F8]/50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="min-w-0 flex-1">
                            <div className="mb-1 flex items-center gap-2">
                              <span className="inline-flex rounded-full bg-[#F59E0B]/10 px-2 py-0.5 text-[10px] font-semibold text-[#F59E0B]">Pending</span>
                            </div>
                            <p className="truncate font-heading text-sm font-semibold text-[#0A1628]">55 Harbour Square</p>
                            <p className="text-xs text-[#555860]">Toronto, ON</p>
                            <div className="mt-1.5 flex items-center gap-3 text-[10px] text-[#9CA3AF]">
                              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />Fri May 16</span>
                              <span className="flex items-center gap-1"><Clock className="h-3 w-3" />2:00 PM</span>
                            </div>
                          </div>
                          <div className="ml-3 flex shrink-0 items-center gap-1.5">
                            <span className="rounded-md border border-[#E5E7EB] px-2.5 py-1 text-[10px] font-medium text-[#555860]">Awaiting confirmation</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: map placeholder (40%) */}
                    <div className="relative min-h-[370px] w-[40%] bg-[#E8EDF3]">
                      {/* Fake map grid lines */}
                      <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'linear-gradient(#9CA3AF 1px, transparent 1px), linear-gradient(90deg, #9CA3AF 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
                      {/* Map road lines */}
                      <div className="absolute top-[40%] right-0 left-0 h-[2px] bg-[#D3D5DB]" />
                      <div className="absolute top-0 bottom-0 left-[35%] w-[2px] bg-[#D3D5DB]" />
                      <div className="absolute top-[65%] right-[10%] left-[20%] h-[2px] origin-left rotate-[15deg] bg-[#D3D5DB]" />

                      {/* Pin 1 - Niagara */}
                      <div className="absolute top-[30%] left-[25%] flex flex-col items-center">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#176FEB] shadow-md shadow-[#176FEB]/30">
                          <MapPin className="h-3.5 w-3.5 text-white" />
                        </div>
                        <div className="h-2 w-[2px] bg-[#176FEB]" />
                      </div>

                      {/* Pin 2 - Mississauga */}
                      <div className="absolute top-[50%] left-[55%] flex flex-col items-center">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#176FEB] shadow-md shadow-[#176FEB]/30">
                          <MapPin className="h-3.5 w-3.5 text-white" />
                        </div>
                        <div className="h-2 w-[2px] bg-[#176FEB]" />
                      </div>

                      {/* Pin 3 - Toronto (pending = amber) */}
                      <div className="absolute top-[70%] left-[70%] flex flex-col items-center">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F59E0B] shadow-md shadow-[#F59E0B]/30">
                          <MapPin className="h-3.5 w-3.5 text-white" />
                        </div>
                        <div className="h-2 w-[2px] bg-[#F59E0B]" />
                      </div>

                      {/* Map label */}
                      <div className="absolute bottom-3 left-3 rounded-md bg-white/90 px-2.5 py-1.5 text-[10px] font-medium text-[#555860] shadow-sm backdrop-blur-sm">
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3 text-[#176FEB]" /> 3 events on map</span>
                      </div>
                    </div>
                  </div>
                </div>
              </DeviceFrame>
            </motion.div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Upcoming events preview */}
      <section className="bg-white py-12 md:py-20">
        <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="font-heading text-2xl font-bold text-[#0A1628]">My Events</h2>
              <p className="mt-1 text-sm text-[#555860]">Manage your upcoming property tours</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#555860] transition-colors hover:border-[#176FEB]/30">
                <Plus className="h-4 w-4" />
              </button>
              <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#555860] transition-colors hover:border-[#176FEB]/30">
                <SlidersHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6 flex gap-1 rounded-lg border border-[#E5E7EB] bg-white p-1 w-fit">
            {(['upcoming', 'past'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  activeTab === tab
                    ? 'bg-[#176FEB] text-white'
                    : 'text-[#555860] hover:text-[#0A1628]'
                }`}
              >
                {tab === 'upcoming' ? 'Upcoming' : 'Past'}
              </button>
            ))}
          </div>

          {/* Event cards */}
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="group flex items-center gap-5 rounded-xl border border-[#E5E7EB] bg-white p-5 transition-all duration-200 hover:border-[#176FEB]/30 cursor-pointer"
              >
                {/* Property image */}
                <div className="hidden sm:block h-20 w-28 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src="/screenshots/events/everything-scheduled.png"
                    alt={`Property tour — ${event.property}`}
                    width={112}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Event details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <StatusBadge status={event.status} />
                  </div>
                  <h3 className="font-heading text-base font-semibold text-[#0A1628] truncate">
                    {event.property}
                  </h3>
                  <p className="text-sm text-[#555860]">{event.city}</p>
                  <div className="mt-2 flex items-center gap-4 text-xs text-[#9CA3AF]">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {event.time}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="hidden sm:flex items-center gap-2">
                  <button className="flex h-9 items-center gap-1.5 rounded-lg border border-[#E5E7EB] px-3 text-xs font-medium text-[#555860] transition-colors hover:border-[#176FEB]/30 hover:text-[#176FEB]">
                    <Navigation className="h-3.5 w-3.5" />
                    Directions
                  </button>
                  <button className="flex h-9 items-center gap-1.5 rounded-lg bg-[#176FEB] px-3 text-xs font-medium text-white transition-colors hover:bg-[#0B5AD4]">
                    <Car className="h-3.5 w-3.5" />
                    Uber
                  </button>
                </div>

                <ChevronRight className="h-5 w-5 text-[#D3D5DB] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[#176FEB]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tour safety section */}
      <section className="bg-white py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <div className="grid items-center gap-8 md:gap-12 lg:grid-cols-2">
            {/* Left: info */}
            <RevealOnScroll>
              <motion.p variants={revealItem} className="font-heading text-sm font-semibold uppercase tracking-wider text-[#176FEB]">
                Safety First
              </motion.p>
              <motion.h2 variants={revealItem} className="mt-3 font-display text-3xl font-normal text-[#0A1628] md:text-4xl lg:text-5xl">
                Safety tools, <span className="text-[#176FEB]">built in</span>
              </motion.h2>
              <motion.p variants={revealItem} className="mt-4 text-lg text-[#555860]">
                Quick access to help, recordings, and verification, so you feel confident during every tour.
              </motion.p>

              {/* PIN preview */}
              <motion.div variants={revealItem} className="mt-6 inline-flex items-center gap-3 rounded-xl border border-[#E5E7EB] bg-[#F5F6F8] p-4">
                <Shield className="h-5 w-5 text-[#176FEB]" />
                <div>
                  <p className="text-xs text-[#555860]">Secure meeting PIN</p>
                  <p className="font-heading text-lg font-bold tracking-widest text-[#0A1628]">9 5 6 8</p>
                </div>
              </motion.div>
            </RevealOnScroll>

            {/* Right: safety tools grid */}
            <RevealOnScroll className="grid grid-cols-2 gap-4" stagger={0.08}>
              {safetyTools.map((tool) => (
                <motion.div
                  key={tool.label}
                  variants={revealItem}
                  className="flex flex-col items-center rounded-xl border border-[#E5E7EB] bg-white p-5 text-center transition-all duration-200 hover:border-[#176FEB]/30"
                >
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F2FE]">
                    <tool.icon className="h-5 w-5 text-[#176FEB]" />
                  </div>
                  <h3 className="font-heading text-sm font-semibold text-[#0A1628]">{tool.label}</h3>
                  <p className="mt-1 text-xs text-[#555860]">{tool.description}</p>
                </motion.div>
              ))}
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Desktop Tours Discovery webapp mockup */}
      <section className="bg-[#F5F6F8] py-12 md:py-20 overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll className="text-center mb-12">
            <motion.p variants={revealItem} className="font-heading text-sm font-semibold uppercase tracking-wider text-[#176FEB]">
              Desktop &amp; Web
            </motion.p>
            <motion.h2 variants={revealItem} className="mt-3 font-display text-3xl font-normal text-[#0A1628] md:text-4xl lg:text-5xl">
              Tour discovery on the <span className="text-[#176FEB] font-semibold">web</span>
            </motion.h2>
            <motion.p variants={revealItem} className="mx-auto mt-4 max-w-2xl text-lg text-[#555860]">
              Browse, save, share, and book tours from your desktop with the same powerful discovery tools.
            </motion.p>
          </RevealOnScroll>

          <RevealOnScroll>
            <motion.div variants={revealItem}>
              {/* Browser chrome frame */}
              <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-xl border border-[#E5E7EB] bg-white shadow-lg">
                {/* Browser title bar */}
                <div className="flex items-center gap-3 border-b border-[#E5E7EB] bg-[#F5F6F8] px-4 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                    <div className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
                    <div className="h-3 w-3 rounded-full bg-[#28C840]" />
                  </div>
                  <div className="flex flex-1 items-center justify-center">
                    <div className="flex h-7 w-full max-w-md items-center gap-2 rounded-md border border-[#E5E7EB] bg-white px-3 text-[10px] text-[#9CA3AF]">
                      <div className="h-3 w-3 rounded-full border border-[#28C840] flex items-center justify-center">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#28C840]" />
                      </div>
                      app.revun.com/discover
                    </div>
                  </div>
                  <div className="w-[52px]" />
                </div>

                {/* Webapp content */}
                <div className="min-h-[440px] bg-[#F5F6F8] text-left select-none" style={{ fontSize: 11 }}>
                  {/* Top bar */}
                  <div className="flex items-center justify-between border-b border-[#E5E7EB] bg-white px-4 py-2.5">
                    <div className="flex items-center gap-2.5">
                      <Home className="h-3.5 w-3.5 text-[#176FEB]" />
                      <h3 className="font-heading text-[13px] font-bold text-[#0A1628]">Discover Properties</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Search bar */}
                      <div className="flex h-7 w-48 items-center gap-1.5 rounded-md border border-[#E5E7EB] bg-[#F5F6F8] px-2 text-[10px] text-[#9CA3AF]">
                        <Search className="h-3 w-3" />
                        Search by city, address...
                      </div>
                      {/* View toggles */}
                      <div className="flex items-center rounded-md border border-[#E5E7EB] bg-[#F5F6F8]">
                        <span className="flex h-7 items-center gap-1 rounded-l-md bg-[#176FEB] px-2 text-[9px] font-semibold text-white">
                          <Grid3X3 className="h-3 w-3" /> Grid
                        </span>
                        <span className="flex h-7 items-center gap-1 border-l border-[#E5E7EB] px-2 text-[9px] text-[#9CA3AF]">
                          <MapPin className="h-3 w-3" /> Map
                        </span>
                        <span className="flex h-7 items-center gap-1 border-l border-[#E5E7EB] rounded-r-md px-2 text-[9px] text-[#9CA3AF]">
                          <Eye className="h-3 w-3" /> Swipe
                        </span>
                      </div>
                      {/* Filter button */}
                      <span className="flex h-7 items-center gap-1 rounded-md border border-[#E5E7EB] bg-white px-2 text-[9px] text-[#555860]">
                        <SlidersHorizontal className="h-3 w-3" /> Filters
                      </span>
                    </div>
                  </div>

                  {/* Body: discovery feed + sidebar */}
                  <div className="flex">
                    {/* Left panel: property grid (65%) */}
                    <div className="w-[65%] border-r border-[#E5E7EB] bg-white p-3">
                      <div className="grid grid-cols-2 gap-3">
                        {/* Property card 1 */}
                        <div className="group overflow-hidden rounded-lg border border-[#E5E7EB] bg-white transition-all hover:border-[#176FEB]/30">
                          <div className="relative h-28 w-full" style={{ background: 'linear-gradient(135deg, #E8926A 0%, #D4734E 50%, #C4613E 100%)' }}>
                            <div className="absolute top-2 right-2 flex items-center gap-1">
                              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-[#555860] shadow-sm backdrop-blur-sm">
                                <Heart className="h-3 w-3" />
                              </span>
                              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-[#555860] shadow-sm backdrop-blur-sm">
                                <Share2 className="h-3 w-3" />
                              </span>
                            </div>
                          </div>
                          <div className="p-2.5">
                            <p className="font-heading text-[12px] font-bold text-[#0A1628]">$1,650<span className="font-normal text-[#9CA3AF]">/mo</span></p>
                            <p className="mt-0.5 text-[10px] text-[#555860] flex items-center gap-1"><MapPin className="h-2.5 w-2.5 text-[#176FEB]" />123 Anywhere St, Toronto</p>
                            <div className="mt-1 flex items-center gap-2 text-[9px] text-[#9CA3AF]">
                              <span>2B / 2B</span>
                              <span className="h-0.5 w-0.5 rounded-full bg-[#D3D5DB]" />
                              <span>850 sqft</span>
                            </div>
                            <div className="mt-2 flex items-center gap-1.5">
                              <span className="rounded-md bg-[#176FEB] px-2 py-1 text-[9px] font-semibold text-white">Reserve</span>
                              <span className="rounded-md border border-[#E5E7EB] px-2 py-1 text-[9px] font-medium text-[#555860]">Schedule Tour</span>
                            </div>
                          </div>
                        </div>

                        {/* Property card 2 */}
                        <div className="group overflow-hidden rounded-lg border border-[#E5E7EB] bg-white transition-all hover:border-[#176FEB]/30">
                          <div className="relative h-28 w-full" style={{ background: 'linear-gradient(135deg, #C9865B 0%, #B07347 50%, #9A6340 100%)' }}>
                            <div className="absolute top-2 right-2 flex items-center gap-1">
                              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-[#176FEB] shadow-sm backdrop-blur-sm">
                                <Heart className="h-3 w-3 fill-[#176FEB]" />
                              </span>
                              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-[#555860] shadow-sm backdrop-blur-sm">
                                <Share2 className="h-3 w-3" />
                              </span>
                            </div>
                          </div>
                          <div className="p-2.5">
                            <p className="font-heading text-[12px] font-bold text-[#0A1628]">$2,100<span className="font-normal text-[#9CA3AF]">/mo</span></p>
                            <p className="mt-0.5 text-[10px] text-[#555860] flex items-center gap-1"><MapPin className="h-2.5 w-2.5 text-[#176FEB]" />75 Portland St, Mississauga</p>
                            <div className="mt-1 flex items-center gap-2 text-[9px] text-[#9CA3AF]">
                              <span>3B / 2B</span>
                              <span className="h-0.5 w-0.5 rounded-full bg-[#D3D5DB]" />
                              <span>1,120 sqft</span>
                            </div>
                            <div className="mt-2 flex items-center gap-1.5">
                              <span className="rounded-md bg-[#176FEB] px-2 py-1 text-[9px] font-semibold text-white">Reserve</span>
                              <span className="rounded-md border border-[#E5E7EB] px-2 py-1 text-[9px] font-medium text-[#555860]">Schedule Tour</span>
                            </div>
                          </div>
                        </div>

                        {/* Property card 3 — spans bottom left */}
                        <div className="group overflow-hidden rounded-lg border border-[#E5E7EB] bg-white transition-all hover:border-[#176FEB]/30">
                          <div className="relative h-28 w-full" style={{ background: 'linear-gradient(135deg, #D9A07A 0%, #C48B63 50%, #B57A55 100%)' }}>
                            <div className="absolute top-2 right-2 flex items-center gap-1">
                              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-[#555860] shadow-sm backdrop-blur-sm">
                                <Heart className="h-3 w-3" />
                              </span>
                              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-[#555860] shadow-sm backdrop-blur-sm">
                                <Share2 className="h-3 w-3" />
                              </span>
                            </div>
                          </div>
                          <div className="p-2.5">
                            <p className="font-heading text-[12px] font-bold text-[#0A1628]">$1,850<span className="font-normal text-[#9CA3AF]">/mo</span></p>
                            <p className="mt-0.5 text-[10px] text-[#555860] flex items-center gap-1"><MapPin className="h-2.5 w-2.5 text-[#176FEB]" />55 Harbour Square, Toronto</p>
                            <div className="mt-1 flex items-center gap-2 text-[9px] text-[#9CA3AF]">
                              <span>1B / 1B</span>
                              <span className="h-0.5 w-0.5 rounded-full bg-[#D3D5DB]" />
                              <span>580 sqft</span>
                            </div>
                            <div className="mt-2 flex items-center gap-1.5">
                              <span className="rounded-md bg-[#176FEB] px-2 py-1 text-[9px] font-semibold text-white">Reserve</span>
                              <span className="rounded-md border border-[#E5E7EB] px-2 py-1 text-[9px] font-medium text-[#555860]">Schedule Tour</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right panel: activity sidebar (35%) */}
                    <div className="w-[35%] bg-white p-3 space-y-4">
                      {/* Saved Properties */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-heading text-[11px] font-bold text-[#0A1628]">Saved Properties</h4>
                          <span className="rounded-full bg-[#176FEB]/10 px-2 py-0.5 text-[9px] font-semibold text-[#176FEB]">20 saved</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-md border border-[#E5E7EB] p-2">
                          <Heart className="h-3.5 w-3.5 text-[#176FEB] fill-[#176FEB]" />
                          <div>
                            <p className="text-[10px] font-medium text-[#0A1628]">View all saved</p>
                            <p className="text-[9px] text-[#9CA3AF]">3 new this week</p>
                          </div>
                          <ChevronRight className="ml-auto h-3 w-3 text-[#D3D5DB]" />
                        </div>
                      </div>

                      {/* Upcoming Tours */}
                      <div>
                        <h4 className="font-heading text-[11px] font-bold text-[#0A1628] mb-2">Upcoming Tours</h4>
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 rounded-md border border-[#E5E7EB] p-2">
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#176FEB]/10">
                              <Calendar className="h-3 w-3 text-[#176FEB]" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-[10px] font-medium text-[#0A1628]">123 Anywhere St</p>
                              <p className="text-[9px] text-[#9CA3AF]">Thu, May 15 - 10:30 AM</p>
                            </div>
                            <span className="shrink-0 rounded-full bg-[#176FEB]/10 px-1.5 py-0.5 text-[8px] font-semibold text-[#176FEB]">Confirmed</span>
                          </div>
                          <div className="flex items-center gap-2 rounded-md border border-[#E5E7EB] p-2">
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#F59E0B]/10">
                              <Calendar className="h-3 w-3 text-[#F59E0B]" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-[10px] font-medium text-[#0A1628]">55 Harbour Square</p>
                              <p className="text-[9px] text-[#9CA3AF]">Fri, May 16 - 2:00 PM</p>
                            </div>
                            <span className="shrink-0 rounded-full bg-[#F59E0B]/10 px-1.5 py-0.5 text-[8px] font-semibold text-[#F59E0B]">Pending</span>
                          </div>
                        </div>
                      </div>

                      {/* Shared With You */}
                      <div>
                        <h4 className="font-heading text-[11px] font-bold text-[#0A1628] mb-2">Shared With You</h4>
                        <div className="flex items-center gap-2 rounded-md border border-[#E5E7EB] p-2">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8F2FE] font-heading text-[10px] font-bold text-[#176FEB]">
                            SK
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[10px] font-medium text-[#0A1628]">Sarah shared 704-75 Portland St</p>
                            <p className="text-[9px] text-[#9CA3AF]">2 hours ago</p>
                          </div>
                        </div>
                      </div>

                      {/* Your Libraries */}
                      <div>
                        <h4 className="font-heading text-[11px] font-bold text-[#0A1628] mb-2">Your Libraries</h4>
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between rounded-md border border-[#E5E7EB] px-2 py-1.5">
                            <div className="flex items-center gap-2">
                              <Bookmark className="h-3 w-3 text-[#176FEB]" />
                              <span className="text-[10px] font-medium text-[#0A1628]">Toronto</span>
                            </div>
                            <span className="text-[9px] text-[#9CA3AF]">8</span>
                          </div>
                          <div className="flex items-center justify-between rounded-md border border-[#E5E7EB] px-2 py-1.5">
                            <div className="flex items-center gap-2">
                              <Bookmark className="h-3 w-3 text-[#176FEB]" />
                              <span className="text-[10px] font-medium text-[#0A1628]">Good Ones</span>
                            </div>
                            <span className="text-[9px] text-[#9CA3AF]">3</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Agent rating preview */}
      <section className="bg-white py-12 md:py-20">
        <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll className="text-center mb-10">
            <motion.h2 variants={revealItem} className="font-heading text-2xl font-bold text-[#0A1628] md:text-3xl">
              Rate your experience
            </motion.h2>
            <motion.p variants={revealItem} className="mt-3 text-[#555860]">
              Your feedback helps keep schedules accurate and events running smoothly.
            </motion.p>
          </RevealOnScroll>

          <RevealOnScroll>
            <motion.div
              variants={revealItem}
              className="mx-auto max-w-md rounded-2xl border border-[#E5E7EB] bg-white p-6"
            >
              {/* Agent card */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F2FE] font-heading text-xl font-bold text-[#176FEB]">
                  AM
                </div>
                <h3 className="font-heading text-lg font-semibold text-[#0A1628]">Anthony M</h3>
                <div className="mt-2 flex items-center gap-4 text-sm text-[#555860]">
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-[#F59E0B] text-[#F59E0B]" />
                    4.7
                  </span>
                  <span>1,358 Tours</span>
                  <span>6 Properties</span>
                </div>
              </div>

              {/* Star rating */}
              <div className="mt-6 flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`h-8 w-8 cursor-pointer transition-colors duration-150 ${
                      s <= 4 ? 'fill-[#F59E0B] text-[#F59E0B]' : 'text-[#E5E7EB]'
                    }`}
                  />
                ))}
              </div>

              {/* Feedback tags */}
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {['Friendly & Helpful', 'On Time', 'Knowledgeable', 'Professional'].map((tag, i) => (
                  <span
                    key={tag}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                      i < 2
                        ? 'border-[#176FEB] bg-[#E8F2FE] text-[#176FEB]'
                        : 'border-[#E5E7EB] text-[#555860] hover:border-[#176FEB]/30'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button className="mt-6 w-full rounded-xl bg-[#176FEB] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0B5AD4]">
                Submit Review
              </button>
            </motion.div>
          </RevealOnScroll>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F5F6F8] py-12 md:py-20">
        <div className="mx-auto max-w-3xl px-4 md:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl font-bold text-[#0A1628] md:text-3xl">
            Ready to schedule your first tour?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-[#555860]">
            Start your free trial today. No credit card required.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/pricing/"
              className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-xl bg-[#176FEB] px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#1260D6]"
            >
              Start Free Trial
            </Link>
            <Link
              href="/contact/"
              className="inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] px-6 text-sm font-semibold text-[#0A1628] transition-colors duration-200 hover:bg-[#EAECF0]"
            >
              Contact Sales <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
