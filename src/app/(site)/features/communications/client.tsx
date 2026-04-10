'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import { DeviceFrame } from '@/components/ui/device-frame'
import {
  ArrowRight,
  CheckCircle,
  MessageSquare,
  Phone,
  Video,
  Users,
  Search,
  FileText,
  Mic,
  Monitor,
  Shield,
  Bookmark,
  Play,
  PhoneIncoming,
  UserPlus,
  Star,
  CalendarClock,
  ScreenShare,
} from 'lucide-react'

/* ---------- shared ---------- */
const ease = [0.22, 1, 0.36, 1] as const

function SectionWrapper({
  children,
  id,
  dark,
}: {
  children: React.ReactNode
  id: string
  dark?: boolean
}) {
  return (
    <section id={id} className={`py-16 md:py-20 ${dark ? 'bg-[#F5F6F8]' : 'bg-white'}`}>
      <div className="mx-auto max-w-6xl px-6">{children}</div>
    </section>
  )
}

function SectionHeader({
  eyebrow,
  title,
  highlight,
  description,
}: {
  eyebrow: string
  title: string
  highlight: string
  description: string
}) {
  return (
    <RevealOnScroll className="mx-auto max-w-2xl text-center">
      <motion.p
        variants={revealItem}
        className="font-heading text-sm font-semibold uppercase tracking-wider text-[#176FEB]"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        variants={revealItem}
        className="mt-3 font-display text-3xl font-normal text-[#0A1628] md:text-4xl lg:text-5xl"
      >
        {title} <span className="text-[#176FEB]">{highlight}</span>
      </motion.h2>
      <motion.p
        variants={revealItem}
        className="mx-auto mt-4 max-w-xl text-base text-[#555860] sm:text-lg"
      >
        {description}
      </motion.p>
    </RevealOnScroll>
  )
}

function FeatureBullet({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#E8F2FE]">
        <Icon className="size-3.5 text-[#176FEB]" />
      </span>
      <span className="text-sm text-[#0A1628]">{text}</span>
    </div>
  )
}

/* ================================================================== */
/*  Mock data                                                          */
/* ================================================================== */

const INBOX_CONTACTS = [
  { name: '172 King St, London', msg: 'New group created', time: 'Now', initials: '🏠', unread: false, avatar: true },
  { name: 'Beata J', msg: 'I am considering new developm...', time: 'Now', initials: 'BJ', unread: true, avatar: false },
  { name: 'Mark O', msg: 'I am considering new developm...', time: '11:45 AM', initials: 'MO', unread: true, avatar: false },
  { name: 'Sarah & Mike', msg: 'I am considering new develo...', time: '11:00 AM', initials: 'SM', unread: false, avatar: false },
  { name: 'Tony S', msg: 'I am considering new developm...', time: '10:15 AM', initials: 'TS', unread: true, avatar: false },
]

const CHAT_MESSAGES = [
  { sender: 'them', text: 'Hello there! How are you doing?', time: '2:30 PM' },
  { sender: 'them', text: 'I can type a continuous long message for you to understand how it will look in this case.', time: '2:31 PM' },
  { sender: 'them', text: 'This message was sent a few minutes later than the previous ones, so it has a separate timestamp.', time: '2:35 PM' },
  { sender: 'me', text: 'Hi!', time: '2:36 PM' },
  { sender: 'me', text: "Hey! I'm doing good", time: '2:37 PM' },
]

const COMMS_FEATURES = [
  {
    icon: MessageSquare,
    title: 'Unified Messaging',
    description: 'All conversations in one place. Property-linked threads keep context attached to every unit.',
  },
  {
    icon: Phone,
    title: 'Built-in Voice Calls',
    description: 'Call contacts directly from the app with caller ID, property context, and one-tap dialling.',
  },
  {
    icon: Video,
    title: 'Video Conferencing',
    description: 'Group video calls with screen sharing, recording, and automatic transcription.',
  },
  {
    icon: FileText,
    title: 'Auto-Transcription',
    description: 'Every call and voice note transcribed automatically. Search by keyword anytime.',
  },
  {
    icon: Shield,
    title: 'Secure & Compliant',
    description: 'End-to-end encrypted messages and calls. Data stored on Canadian servers.',
  },
  {
    icon: Bookmark,
    title: 'Saved Recordings',
    description: 'Recordings, summaries, and transcripts saved permanently for audit and review.',
  },
]

/* ================================================================== */
/*  HERO                                                               */
/* ================================================================== */

function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-[#E5E7EB] bg-white pb-16 pt-12 lg:pb-20 lg:pt-16">
      {/* Ambient blobs */}
      <div
        className="absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-[#176FEB]/[0.04] blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[#176FEB]/[0.03] blur-[100px]"
        aria-hidden="true"
      />

      <RevealOnScroll className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <motion.p
          variants={revealItem}
          className="font-heading text-xs font-semibold uppercase tracking-widest text-[#176FEB]"
        >
          Communications
        </motion.p>
        <motion.h1
          variants={revealItem}
          className="mt-3 font-display text-4xl font-bold text-[#0A1628] sm:text-5xl lg:text-6xl"
        >
          Every conversation, call, and meeting —{' '}
          <span className="text-[#176FEB]">in one place</span>
        </motion.h1>
        <motion.p
          variants={revealItem}
          className="mx-auto mt-5 max-w-2xl text-base text-[#555860] sm:text-lg"
        >
          Message tenants, owners, vendors, and teams. Voice and video calls built in.
          Every message recorded, every transcript searchable, every file saved.
        </motion.p>

        {/* Quick action buttons */}
        <motion.div variants={revealItem} className="mt-10 flex items-center justify-center gap-8">
          {[
            { icon: MessageSquare, label: 'Messages' },
            { icon: Phone, label: 'Calls' },
            { icon: Video, label: 'Video' },
            { icon: FileText, label: 'Transcripts' },
          ].map((action) => (
            <div key={action.label} className="group flex flex-col items-center gap-2.5">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8F2FE] text-[#176FEB] shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-[#176FEB] group-hover:text-white group-hover:shadow-lg">
                <action.icon className="size-5" />
              </span>
              <span className="text-xs font-medium text-[#555860] transition-colors group-hover:text-[#176FEB]">
                {action.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div variants={revealItem} className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/platform/"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-[#176FEB] px-8 font-heading text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#1260d1] hover:shadow-lg"
          >
            See the Platform <ArrowRight className="ml-2 size-4" />
          </Link>
          <Link
            href="/demo/"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E5E7EB] px-8 font-heading text-sm font-semibold text-[#0A1628] transition-all hover:-translate-y-0.5 hover:border-[#176FEB] hover:text-[#176FEB]"
          >
            Book a Live Demo
          </Link>
        </motion.div>
      </RevealOnScroll>
    </section>
  )
}

/* ================================================================== */
/*  SECTION 1 — Chats In One Place (dark bg)                           */
/* ================================================================== */

function ChatsInboxSection() {
  return (
    <SectionWrapper id="chats-inbox" dark>
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Left: Text */}
        <RevealOnScroll>
          <motion.p
            variants={revealItem}
            className="font-heading text-sm font-semibold uppercase tracking-wider text-[#176FEB]"
          >
            Unified Inbox
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mt-3 font-display text-3xl font-normal text-[#0A1628] md:text-4xl lg:text-5xl"
          >
            Chats <span className="text-[#176FEB]">In One Place</span>
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mt-4 max-w-md text-base text-[#555860] sm:text-lg"
          >
            Message agents, owners, tenants, or groups, right where the conversation belongs.
            All/Unread filters, group chats, property-linked threads.
          </motion.p>
          <motion.div variants={revealItem} className="mt-6 space-y-3">
            <FeatureBullet icon={MessageSquare} text="Unified inbox for all conversations" />
            <FeatureBullet icon={CheckCircle} text="Property-linked conversation threads" />
            <FeatureBullet icon={Users} text="Group chats with owners, tenants, and vendors" />
            <FeatureBullet icon={Search} text="Unread tracking and smart search" />
          </motion.div>
        </RevealOnScroll>

        {/* Right: Device frame with screenshot */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease }}
        >
          <DeviceFrame device="iphone" className="w-[280px]">
            <Image
              src="/screenshots/comms/chats-inbox.png"
              alt="Revun chats inbox showing unified messaging with All and Unread filters, group chats, and property-linked threads"
              width={390}
              height={844}
              className="h-auto w-full"
              quality={90}
            />
          </DeviceFrame>
        </motion.div>
      </div>

      {/* Desktop webapp mockup */}
      <motion.div
        className="mt-16 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-editorial"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, delay: 0.15, ease }}
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-[#E5E7EB] bg-[#F9FAFB] px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="size-3 rounded-full bg-[#EF4444]" />
            <span className="size-3 rounded-full bg-[#F59E0B]" />
            <span className="size-3 rounded-full bg-[#22C55E]" />
          </div>
          <div className="ml-3 flex-1 rounded-md bg-white px-3 py-1 text-xs text-[#555860]">
            app.revun.com/communications
          </div>
        </div>
        {/* Split-panel layout */}
        <div className="flex min-h-[380px]">
          {/* Sidebar - contact list */}
          <div className="w-[320px] shrink-0 border-r border-[#E5E7EB] bg-white">
            <div className="border-b border-[#E5E7EB] p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-base font-bold text-[#0A1628]">Messages</h3>
                <div className="flex gap-2">
                  <span className="flex size-7 items-center justify-center rounded-lg bg-[#F5F6F8] text-[#555860]">
                    <Search className="size-3.5" />
                  </span>
                  <span className="flex size-7 items-center justify-center rounded-lg bg-[#E8F2FE] text-[#176FEB]">
                    <UserPlus className="size-3.5" />
                  </span>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <span className="rounded-full bg-[#176FEB] px-3 py-1 text-xs font-semibold text-white">All</span>
                <span className="rounded-full border border-[#E5E7EB] px-3 py-1 text-xs font-medium text-[#555860]">Unread</span>
                <span className="rounded-full border border-[#E5E7EB] px-3 py-1 text-xs font-medium text-[#555860]">Groups</span>
              </div>
            </div>
            <ul className="divide-y divide-[#E5E7EB]">
              {INBOX_CONTACTS.map((c, i) => (
                <li
                  key={c.name}
                  className={`flex items-center gap-3 px-4 py-3 transition-colors hover:bg-[#F5F6F8] ${i === 1 ? 'bg-[#E8F2FE]/40' : ''}`}
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#E8F2FE] font-heading text-xs font-semibold text-[#176FEB]">
                    {c.initials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="truncate text-sm font-semibold text-[#0A1628]">{c.name}</span>
                      <span className="shrink-0 text-[10px] text-[#555860]">{c.time}</span>
                    </div>
                    <p className="truncate text-xs text-[#555860]">{c.msg}</p>
                  </div>
                  {c.unread && (
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#176FEB] text-[9px] font-bold text-white">
                      1
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Main chat area */}
          <div className="flex flex-1 flex-col">
            {/* Chat header */}
            <div className="flex items-center justify-between border-b border-[#E5E7EB] px-5 py-3">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-full bg-[#E8F2FE] font-heading text-xs font-semibold text-[#176FEB]">
                  BJ
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#0A1628]">Beata J</p>
                  <p className="text-[10px] text-[#22C55E]">Online</p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="flex size-8 items-center justify-center rounded-lg bg-[#F5F6F8] text-[#555860] transition-colors hover:bg-[#E8F2FE] hover:text-[#176FEB]">
                  <Phone className="size-4" />
                </span>
                <span className="flex size-8 items-center justify-center rounded-lg bg-[#F5F6F8] text-[#555860] transition-colors hover:bg-[#E8F2FE] hover:text-[#176FEB]">
                  <Video className="size-4" />
                </span>
                <span className="flex size-8 items-center justify-center rounded-lg bg-[#F5F6F8] text-[#555860] transition-colors hover:bg-[#E8F2FE] hover:text-[#176FEB]">
                  <Search className="size-4" />
                </span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto p-5">
              {CHAT_MESSAGES.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[320px] rounded-2xl px-4 py-2.5 text-sm ${
                      m.sender === 'me'
                        ? 'bg-[#176FEB] text-white'
                        : 'bg-[#F5F6F8] text-[#0A1628]'
                    }`}
                  >
                    <p>{m.text}</p>
                    <p
                      className={`mt-1 text-right text-[10px] ${
                        m.sender === 'me' ? 'text-white/60' : 'text-[#555860]'
                      }`}
                    >
                      {m.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t border-[#E5E7EB] p-4">
              <div className="flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-2.5">
                <Mic className="size-4 text-[#555860]" />
                <span className="flex-1 text-sm text-[#555860]">Type a message...</span>
                <span className="flex size-8 items-center justify-center rounded-lg bg-[#176FEB] text-white">
                  <ArrowRight className="size-4" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  )
}

/* ================================================================== */
/*  SECTION 2 — Clear Conversations (white bg)                         */
/* ================================================================== */

function ClearConversationsSection() {
  return (
    <SectionWrapper id="clear-conversations">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Left: Device frame */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease }}
        >
          <DeviceFrame device="iphone" className="w-[280px]">
            <Image
              src="/screenshots/comms/clear-conversations.png"
              alt="Revun clear conversations view showing messages, voice notes, and transcripts in a clean chat thread"
              width={390}
              height={844}
              className="h-auto w-full"
              quality={90}
            />
          </DeviceFrame>
        </motion.div>

        {/* Right: Text */}
        <RevealOnScroll>
          <motion.p
            variants={revealItem}
            className="font-heading text-sm font-semibold uppercase tracking-wider text-[#176FEB]"
          >
            Messaging
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mt-3 font-display text-3xl font-normal text-[#0A1628] md:text-4xl lg:text-5xl"
          >
            Clear <span className="text-[#176FEB]">Conversations</span>
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mt-4 max-w-md text-base text-[#555860] sm:text-lg"
          >
            See messages, voice notes, and transcripts all in one place. Full message threads
            with timestamps, read receipts, and file sharing.
          </motion.p>
          <motion.div variants={revealItem} className="mt-6 space-y-3">
            <FeatureBullet icon={Mic} text="Voice messages with automatic transcription" />
            <FeatureBullet icon={CheckCircle} text="Read receipts and delivery confirmation" />
            <FeatureBullet icon={FileText} text="File attachments and media sharing" />
            <FeatureBullet icon={Search} text="Full message search across all threads" />
          </motion.div>
        </RevealOnScroll>
      </div>

      {/* Desktop webapp mockup — conversation view */}
      <motion.div
        className="mt-16 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-editorial"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, delay: 0.15, ease }}
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-[#E5E7EB] bg-[#F9FAFB] px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="size-3 rounded-full bg-[#EF4444]" />
            <span className="size-3 rounded-full bg-[#F59E0B]" />
            <span className="size-3 rounded-full bg-[#22C55E]" />
          </div>
          <div className="ml-3 flex-1 rounded-md bg-white px-3 py-1 text-xs text-[#555860]">
            app.revun.com/communications/aiden-o
          </div>
        </div>
        {/* Conversation detail */}
        <div className="p-6">
          <div className="flex items-center gap-3 border-b border-[#E5E7EB] pb-4">
            <span className="flex size-10 items-center justify-center rounded-full bg-[#E8F2FE] font-heading text-sm font-semibold text-[#176FEB]">
              AO
            </span>
            <div>
              <p className="font-heading text-base font-semibold text-[#0A1628]">Aiden O</p>
              <p className="text-xs text-[#555860]">172 King St, London &middot; Unit 4B</p>
            </div>
            <div className="ml-auto flex gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-[#F5F6F8] text-[#555860]">
                <Phone className="size-4" />
              </span>
              <span className="flex size-8 items-center justify-center rounded-lg bg-[#F5F6F8] text-[#555860]">
                <Video className="size-4" />
              </span>
            </div>
          </div>
          {/* Messages */}
          <div className="mt-4 space-y-4">
            <p className="text-center text-xs text-[#555860]">Sat, Aug 30</p>
            <div className="flex justify-start">
              <div className="max-w-sm rounded-2xl bg-[#F5F6F8] px-4 py-2.5 text-sm text-[#0A1628]">
                Hello there! How are you doing?
              </div>
            </div>
            <div className="flex justify-start">
              <div className="max-w-sm rounded-2xl bg-[#F5F6F8] px-4 py-2.5 text-sm text-[#0A1628]">
                I can type a continuous long message for you to understand how it will look in this case. Also, this message was sent along with the previous one so the timestamp is common for both.
              </div>
            </div>
            <div className="flex justify-end">
              <div className="max-w-sm rounded-2xl bg-[#176FEB] px-4 py-2.5 text-sm text-white">
                Hi!
              </div>
            </div>
            <div className="flex justify-end">
              <div className="max-w-sm rounded-2xl bg-[#176FEB] px-4 py-2.5 text-sm text-white">
                Hey! I&apos;m doing good
              </div>
            </div>
            {/* Voice note */}
            <div className="flex justify-start">
              <div className="flex items-center gap-3 rounded-2xl bg-[#F5F6F8] px-4 py-3">
                <span className="flex size-8 items-center justify-center rounded-full bg-[#176FEB] text-white">
                  <Play className="size-3.5" />
                </span>
                <div className="flex h-4 items-center gap-0.5">
                  {[3, 5, 2, 6, 4, 7, 3, 5, 8, 4, 6, 3, 5, 7, 4, 2, 5, 6, 3, 4].map((h, i) => (
                    <span
                      key={i}
                      className="w-[3px] rounded-full bg-[#176FEB]/40"
                      style={{ height: `${h * 2}px` }}
                    />
                  ))}
                </div>
                <span className="text-xs text-[#555860]">0:28</span>
              </div>
            </div>
            <p className="text-xs text-[#555860]">
              <FileText className="mr-1 inline size-3" />
              See transcript
            </p>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  )
}

/* ================================================================== */
/*  SECTION 3 — Connect & Talk (dark bg)                               */
/* ================================================================== */

function ConnectTalkSection() {
  return (
    <SectionWrapper id="connect-talk" dark>
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Left: Text */}
        <RevealOnScroll>
          <motion.p
            variants={revealItem}
            className="font-heading text-sm font-semibold uppercase tracking-wider text-[#176FEB]"
          >
            Contacts
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mt-3 font-display text-3xl font-normal text-[#0A1628] md:text-4xl lg:text-5xl"
          >
            Connect <span className="text-[#176FEB]">& Talk</span>
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mt-4 max-w-md text-base text-[#555860] sm:text-lg"
          >
            Start chats, create groups, or schedule calls with the right people.
            See who&apos;s online, call directly from any contact.
          </motion.p>
          <motion.div variants={revealItem} className="mt-6 space-y-3">
            <FeatureBullet icon={UserPlus} text="New contact and group creation" />
            <FeatureBullet icon={CalendarClock} text="Schedule calls in advance" />
            <FeatureBullet icon={Phone} text="Direct calling from contacts" />
            <FeatureBullet icon={Star} text="Favorites list for quick access" />
          </motion.div>
        </RevealOnScroll>

        {/* Right: Device frame */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease }}
        >
          <DeviceFrame device="iphone" className="w-[280px]">
            <Image
              src="/screenshots/comms/connect-talk.png"
              alt="Revun connect and talk screen showing new contact, group chat creation, scheduled calls, and favorites list"
              width={390}
              height={844}
              className="h-auto w-full"
              quality={90}
            />
          </DeviceFrame>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

/* ================================================================== */
/*  SECTION 4 — Voice & Video Calls (white bg)                         */
/* ================================================================== */

function VoiceVideoSection() {
  return (
    <SectionWrapper id="voice-video">
      <SectionHeader
        eyebrow="Calling"
        title="Voice & video calls,"
        highlight="built in"
        description="Accept incoming calls with caller ID and property context. Crystal-clear voice and video with mute, speaker, and screen share."
      />

      {/* Two device frames side by side */}
      <div className="mt-14 flex flex-wrap items-center justify-center gap-8 lg:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 24, x: -20 }}
          whileInView={{ opacity: 1, y: 0, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease }}
        >
          <DeviceFrame device="iphone" label="Incoming Call" className="w-[250px]">
            <Image
              src="/screenshots/comms/incoming-call.png"
              alt="Revun incoming call screen showing caller ID, property context, and accept or decline options"
              width={390}
              height={844}
              className="h-auto w-full"
              quality={90}
            />
          </DeviceFrame>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, x: 20 }}
          whileInView={{ opacity: 1, y: 0, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
        >
          <DeviceFrame device="iphone" label="On a Call" className="w-[250px]">
            <Image
              src="/screenshots/comms/on-a-call.png"
              alt="Revun active call screen showing call timer, mute, speaker, video, and end call controls"
              width={390}
              height={844}
              className="h-auto w-full"
              quality={90}
            />
          </DeviceFrame>
        </motion.div>
      </div>

      {/* Desktop webapp mockup - call interface */}
      <motion.div
        className="mt-16 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-editorial"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, delay: 0.2, ease }}
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-[#E5E7EB] bg-[#F9FAFB] px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="size-3 rounded-full bg-[#EF4444]" />
            <span className="size-3 rounded-full bg-[#F59E0B]" />
            <span className="size-3 rounded-full bg-[#22C55E]" />
          </div>
          <div className="ml-3 flex-1 rounded-md bg-white px-3 py-1 text-xs text-[#555860]">
            app.revun.com/communications/call
          </div>
        </div>
        {/* Call UI */}
        <div className="flex min-h-[340px] items-center justify-center bg-[#0A1628] p-8">
          <div className="text-center">
            {/* Caller avatar */}
            <div className="mx-auto flex size-24 items-center justify-center rounded-full bg-[#176FEB]/20 ring-4 ring-[#176FEB]/30">
              <span className="font-heading text-2xl font-bold text-white">TS</span>
            </div>
            <p className="mt-4 font-heading text-xl font-semibold text-white">Tony S</p>
            <p className="mt-1 text-sm text-white/60">172 King St, London &middot; Unit 2A</p>
            <div className="mt-2 flex items-center justify-center gap-1.5">
              <span className="size-2 animate-pulse rounded-full bg-[#EF4444]" />
              <span className="text-sm text-white/70">00:03:47</span>
            </div>

            {/* Call controls */}
            <div className="mt-8 flex items-center justify-center gap-4">
              {[
                { icon: Mic, label: 'Mute', bg: 'bg-white/10 hover:bg-white/20' },
                { icon: Monitor, label: 'Speaker', bg: 'bg-white/10 hover:bg-white/20' },
                { icon: Video, label: 'Video', bg: 'bg-[#176FEB] hover:bg-[#1260d1]' },
                { icon: ScreenShare, label: 'Share', bg: 'bg-white/10 hover:bg-white/20' },
              ].map((ctrl) => (
                <div key={ctrl.label} className="flex flex-col items-center gap-2">
                  <span
                    className={`flex size-12 items-center justify-center rounded-full text-white transition-colors ${ctrl.bg}`}
                  >
                    <ctrl.icon className="size-5" />
                  </span>
                  <span className="text-[10px] text-white/50">{ctrl.label}</span>
                </div>
              ))}
              <div className="flex flex-col items-center gap-2">
                <span className="flex size-12 items-center justify-center rounded-full bg-[#EF4444] text-white transition-colors hover:bg-[#DC2626]">
                  <Phone className="size-5 rotate-[135deg]" />
                </span>
                <span className="text-[10px] text-white/50">End</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  )
}

/* ================================================================== */
/*  SECTION 5 — Group Video (dark bg)                                  */
/* ================================================================== */

function GroupVideoSection() {
  return (
    <SectionWrapper id="group-video" dark>
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Left: Text */}
        <RevealOnScroll>
          <motion.p
            variants={revealItem}
            className="font-heading text-sm font-semibold uppercase tracking-wider text-[#176FEB]"
          >
            Video Meetings
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mt-3 font-display text-3xl font-normal text-[#0A1628] md:text-4xl lg:text-5xl"
          >
            Meet Together, <span className="text-[#176FEB]">All at Once</span>
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mt-4 max-w-md text-base text-[#555860] sm:text-lg"
          >
            Group video calls with owners, tenants, or vendors — no external tools needed.
            Property context, recording, and transcription built in.
          </motion.p>
          <motion.div variants={revealItem} className="mt-6 space-y-3">
            <FeatureBullet icon={Users} text="Multi-participant video conferencing" />
            <FeatureBullet icon={ScreenShare} text="Screen sharing for walkthroughs" />
            <FeatureBullet icon={Play} text="Recording with auto-save" />
            <FeatureBullet icon={Shield} text="No Zoom or Teams needed — built in" />
          </motion.div>
        </RevealOnScroll>

        {/* Right: Device frame */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease }}
        >
          <DeviceFrame device="iphone" className="w-[280px]">
            <Image
              src="/screenshots/comms/group-video.png"
              alt="Revun group video call showing four participants with call controls including camera, screen share, and recording"
              width={390}
              height={844}
              className="h-auto w-full"
              quality={90}
            />
          </DeviceFrame>
        </motion.div>
      </div>

      {/* Desktop webapp mockup - group video */}
      <motion.div
        className="mt-16 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-editorial"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, delay: 0.15, ease }}
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-[#E5E7EB] bg-[#F9FAFB] px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="size-3 rounded-full bg-[#EF4444]" />
            <span className="size-3 rounded-full bg-[#F59E0B]" />
            <span className="size-3 rounded-full bg-[#22C55E]" />
          </div>
          <div className="ml-3 flex-1 rounded-md bg-white px-3 py-1 text-xs text-[#555860]">
            app.revun.com/communications/meeting
          </div>
        </div>
        {/* Video grid layout */}
        <div className="bg-[#0A1628] p-6">
          {/* Meeting header */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="size-2 animate-pulse rounded-full bg-[#EF4444]" />
              <span className="text-sm font-medium text-white/80">00:48</span>
              <span className="ml-2 text-sm text-white/50">Property Review — 172 King St</span>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
              <Users className="size-3" /> 4 participants
            </span>
          </div>
          {/* 2x2 video grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: 'John D', role: 'Owner', color: 'from-[#176FEB]/30 to-[#176FEB]/10' },
              { name: 'Alice R', role: 'Property Manager', color: 'from-[#8B5CF6]/30 to-[#8B5CF6]/10' },
              { name: 'Sarah M', role: 'Tenant', color: 'from-[#F59E0B]/30 to-[#F59E0B]/10' },
              { name: 'You', role: 'Agent', color: 'from-[#22C55E]/30 to-[#22C55E]/10' },
            ].map((person) => (
              <div
                key={person.name}
                className={`flex aspect-video flex-col items-center justify-center rounded-xl bg-gradient-to-br ${person.color}`}
              >
                <span className="flex size-14 items-center justify-center rounded-full bg-white/10 font-heading text-lg font-bold text-white">
                  {person.name.split(' ').map((n) => n[0]).join('')}
                </span>
                <p className="mt-2 text-sm font-medium text-white">{person.name}</p>
                <p className="text-[10px] text-white/50">{person.role}</p>
              </div>
            ))}
          </div>
          {/* Controls bar */}
          <div className="mt-4 flex items-center justify-center gap-3">
            {[
              { icon: Mic, active: true },
              { icon: Video, active: true },
              { icon: ScreenShare, active: false },
              { icon: MessageSquare, active: false },
            ].map((ctrl, i) => (
              <span
                key={i}
                className={`flex size-10 items-center justify-center rounded-full text-white transition-colors ${
                  ctrl.active ? 'bg-white/10' : 'bg-white/5'
                }`}
              >
                <ctrl.icon className="size-4" />
              </span>
            ))}
            <span className="flex size-10 items-center justify-center rounded-full bg-[#EF4444] text-white">
              <Phone className="size-4 rotate-[135deg]" />
            </span>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  )
}

/* ================================================================== */
/*  SECTION 6 — Everything Saved (white bg)                            */
/* ================================================================== */

function SavedSection() {
  return (
    <SectionWrapper id="saved">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Left: Device frame */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease }}
        >
          <DeviceFrame device="iphone" className="w-[280px]">
            <Image
              src="/screenshots/comms/saved-later.png"
              alt="Revun saved recordings view with Summary, Recording and Transcript, and Parties tabs"
              width={390}
              height={844}
              className="h-auto w-full"
              quality={90}
            />
          </DeviceFrame>
        </motion.div>

        {/* Right: Text */}
        <RevealOnScroll>
          <motion.p
            variants={revealItem}
            className="font-heading text-sm font-semibold uppercase tracking-wider text-[#176FEB]"
          >
            Records
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mt-3 font-display text-3xl font-normal text-[#0A1628] md:text-4xl lg:text-5xl"
          >
            Everything, <span className="text-[#176FEB]">Saved for Later</span>
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mt-4 max-w-md text-base text-[#555860] sm:text-lg"
          >
            Recordings and transcripts are always available. Review conversations,
            search by keyword, share with team members.
          </motion.p>
          <motion.div variants={revealItem} className="mt-6 space-y-3">
            <FeatureBullet icon={FileText} text="Auto-transcription for every call" />
            <FeatureBullet icon={Play} text="Recording playback with seek controls" />
            <FeatureBullet icon={Users} text="Summary, transcript, and parties tabs" />
            <FeatureBullet icon={Search} text="Searchable archive by keyword or date" />
          </motion.div>
        </RevealOnScroll>
      </div>

      {/* Desktop webapp mockup - transcript viewer */}
      <motion.div
        className="mt-16 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-editorial"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, delay: 0.15, ease }}
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-[#E5E7EB] bg-[#F9FAFB] px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="size-3 rounded-full bg-[#EF4444]" />
            <span className="size-3 rounded-full bg-[#F59E0B]" />
            <span className="size-3 rounded-full bg-[#22C55E]" />
          </div>
          <div className="ml-3 flex-1 rounded-md bg-white px-3 py-1 text-xs text-[#555860]">
            app.revun.com/communications/recordings
          </div>
        </div>
        {/* Recording detail */}
        <div className="p-6">
          <div className="flex items-center gap-3 border-b border-[#E5E7EB] pb-4">
            <div>
              <p className="font-heading text-base font-semibold text-[#0A1628]">
                Property Review — 172 King St
              </p>
              <p className="text-xs text-[#555860]">Apr 8, 2026 &middot; 15:24 duration &middot; 4 participants</p>
            </div>
            <div className="ml-auto flex gap-2">
              <span className="rounded-full bg-[#E8F2FE] px-3 py-1 text-xs font-semibold text-[#176FEB]">
                Download
              </span>
              <span className="rounded-full border border-[#E5E7EB] px-3 py-1 text-xs font-medium text-[#555860]">
                Share
              </span>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-4 flex gap-1 rounded-xl border border-[#E5E7EB] p-1">
            {['Summary', 'Recording & Transcript', 'Parties'].map((tab, i) => (
              <button
                key={tab}
                className={`flex-1 rounded-lg px-3 py-2.5 text-xs font-semibold transition-all ${
                  i === 1
                    ? 'bg-[#176FEB] text-white shadow-sm'
                    : 'text-[#555860] hover:bg-[#F3F4F6]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Video player placeholder */}
          <div className="mt-4 flex aspect-video max-h-[200px] items-center justify-center rounded-xl bg-[#0A1628]">
            <span className="flex size-14 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20">
              <Play className="size-6" />
            </span>
          </div>

          {/* Transcript excerpt */}
          <div className="mt-4 space-y-3">
            <p className="font-heading text-sm font-semibold text-[#0A1628]">Transcript</p>
            {[
              { time: '0:00', speaker: 'John D', text: 'Good afternoon everyone, thanks for joining the call.' },
              { time: '0:05', speaker: 'Alice R', text: 'Thanks John. I wanted to go over the maintenance schedule for this month.' },
              { time: '0:12', speaker: 'Sarah M', text: 'Sounds good. I had a few questions about the HVAC inspection.' },
              { time: '0:18', speaker: 'You', text: 'Let me pull up the property details and we can go through everything.' },
            ].map((line) => (
              <div key={line.time} className="flex gap-3">
                <span className="shrink-0 text-xs text-[#555860]">{line.time}</span>
                <div>
                  <span className="text-xs font-semibold text-[#176FEB]">{line.speaker}</span>
                  <p className="text-sm text-[#0A1628]">{line.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  )
}

/* ================================================================== */
/*  Features Grid                                                      */
/* ================================================================== */

function FeaturesGridSection() {
  return (
    <SectionWrapper id="features" dark>
      <SectionHeader
        eyebrow="Features"
        title="Everything You Need to"
        highlight="Communicate"
        description="From instant messaging to group video — powerful communication tools built for property management."
      />

      <RevealOnScroll className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
        {COMMS_FEATURES.map((feature) => (
          <motion.div
            key={feature.title}
            variants={revealItem}
            className="group rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-editorial transition-all duration-300 hover:-translate-y-1 hover:border-[#176FEB]/30 hover:shadow-card-hover"
          >
            <span className="flex size-12 items-center justify-center rounded-xl bg-[#E8F2FE] text-[#176FEB] transition-colors group-hover:bg-[#176FEB] group-hover:text-white">
              <feature.icon className="size-5" />
            </span>
            <h3 className="mt-4 font-heading text-base font-semibold text-[#0A1628]">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#555860]">{feature.description}</p>
          </motion.div>
        ))}
      </RevealOnScroll>
    </SectionWrapper>
  )
}

/* ================================================================== */
/*  CTA Section                                                        */
/* ================================================================== */

function CTASection() {
  return (
    <section className="bg-[#F5F6F8] py-16 lg:py-20">
      <RevealOnScroll className="mx-auto max-w-3xl px-6 text-center">
        <motion.h2
          variants={revealItem}
          className="font-display text-3xl font-normal text-[#0A1628] md:text-4xl lg:text-5xl"
        >
          Deploy secure communications across your operation
        </motion.h2>
        <motion.p variants={revealItem} className="mx-auto mt-4 max-w-xl text-base text-[#555860]">
          Messaging, calls, video, transcripts, and recordings — all in one platform.
          No more juggling Zoom, Teams, WhatsApp, and email.
        </motion.p>
        <motion.div variants={revealItem} className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/platform/"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-[#176FEB] px-8 font-heading text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            See the Platform <ArrowRight className="ml-2 size-4" />
          </Link>
          <Link
            href="/demo/"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E5E7EB] px-8 font-heading text-sm font-semibold text-[#0A1628] transition-all hover:-translate-y-0.5 hover:border-[#D1D5DB] hover:bg-[#EAECF0]"
          >
            Book a Live Demo
          </Link>
        </motion.div>
      </RevealOnScroll>
    </section>
  )
}

/* ================================================================== */
/*  Main export                                                        */
/* ================================================================== */

export function CommunicationsClient() {
  return (
    <main>
      <HeroSection />
      <ChatsInboxSection />
      <ClearConversationsSection />
      <ConnectTalkSection />
      <VoiceVideoSection />
      <GroupVideoSection />
      <SavedSection />
      <FeaturesGridSection />
      <CTASection />
    </main>
  )
}
