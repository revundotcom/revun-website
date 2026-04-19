'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
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
  Shield,
  Bookmark,
  Play,
  UserPlus,
  Star,
  CalendarClock,
  ScreenShare,
  PhoneIncoming,
  PhoneOff,
  Volume2,
  Plus,
  MoreHorizontal,
  ChevronDown,
  Paperclip,
  Send,
  Hash,
  Pause,
} from 'lucide-react'

/* ═════════════════════════════════════════════════════════════════════════
   Shared primitives
   ═════════════════════════════════════════════════════════════════════════ */

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

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      variants={revealItem}
      className="font-heading text-sm font-semibold uppercase tracking-wider text-[#176FEB]"
    >
      {children}
    </motion.p>
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

function UIShell({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`flex h-full flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_20px_50px_-25px_rgba(10,22,40,0.15)] ${className}`}
    >
      {children}
    </div>
  )
}

/* ═════════════════════════════════════════════════════════════════════════
   Hero
   ═════════════════════════════════════════════════════════════════════════ */

function HeroSection() {
  return (
    <section className="relative border-b border-[#E5E7EB] bg-white pb-16 pt-12 lg:pb-20 lg:pt-16">
      <RevealOnScroll className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <Eyebrow>Communications</Eyebrow>
        <motion.h1
          variants={revealItem}
          className="mt-3 font-display text-4xl font-bold text-[#0A1628] sm:text-5xl lg:text-6xl"
        >
          Every conversation, call, and meeting,{' '}
          <span className="text-[#176FEB]">in one place</span>
        </motion.h1>
        <motion.p
          variants={revealItem}
          className="mx-auto mt-5 max-w-2xl text-base text-[#555860] sm:text-lg"
        >
          Message tenants, owners, vendors, and teams. Voice and video calls built in.
          Every message recorded, every transcript searchable, every file saved.
        </motion.p>
        <motion.div
          variants={revealItem}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/platform/"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-[#176FEB] px-8 font-heading text-sm font-semibold text-white transition-colors hover:bg-[#1260d1]"
          >
            See the Platform <ArrowRight className="ml-2 size-4" />
          </Link>
          <Link
            href="/demo/"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E5E7EB] px-8 font-heading text-sm font-semibold text-[#0A1628] transition-colors hover:border-[#176FEB] hover:text-[#176FEB]"
          >
            Book a Live Demo
          </Link>
        </motion.div>
      </RevealOnScroll>
    </section>
  )
}

/* ═════════════════════════════════════════════════════════════════════════
   Section 1 — Chats In One Place
   Representation: functional inbox card
   ═════════════════════════════════════════════════════════════════════════ */

const INBOX_ROWS = [
  { initials: 'SW', name: '172 King St, London', preview: 'New group created', time: 'Now', unread: 0, group: true },
  { initials: 'BJ', name: 'Beata J', preview: 'I am considering new development...', time: 'Now', unread: 2 },
  { initials: 'MO', name: 'Mark O', preview: 'When would be a good time to tour?', time: '11:45 AM', unread: 1 },
  { initials: 'SM', name: 'Sarah & Mike', preview: 'Thanks, see you Friday', time: '11:00 AM', unread: 0 },
  { initials: 'TS', name: 'Tony S', preview: 'Can we discuss the lease?', time: '10:15 AM', unread: 1 },
  { initials: 'JW', name: 'Jessica W', preview: 'I am considering new development...', time: 'Yesterday', unread: 0 },
]

function InboxCard() {
  return (
    <UIShell>
      {/* header */}
      <div className="border-b border-[#E5E7EB] bg-white p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-base font-bold text-[#0A1628]">Messages</h3>
          <div className="flex items-center gap-2">
            <button className="flex size-8 items-center justify-center rounded-lg bg-[#F5F6F8] text-[#555860]">
              <Search className="size-3.5" />
            </button>
            <button className="flex size-8 items-center justify-center rounded-lg bg-[#176FEB] text-white">
              <Plus className="size-3.5" />
            </button>
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <span className="rounded-full bg-[#0A1628] px-3 py-1 text-[11px] font-semibold text-white">
            All
          </span>
          <span className="rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-[11px] font-medium text-[#555860]">
            Unread
          </span>
          <span className="rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-[11px] font-medium text-[#555860]">
            Groups
          </span>
        </div>
      </div>

      {/* conversation rows */}
      <ul className="divide-y divide-[#E5E7EB]">
        {INBOX_ROWS.map((r, i) => (
          <motion.li
            key={r.name}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.05 + i * 0.04 }}
            className={`flex items-center gap-3 px-4 py-3 ${i === 1 ? 'bg-[#EEF4FE]/60' : 'bg-white'}`}
          >
            <span
              className={`flex size-10 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white ${
                r.group ? 'bg-[#0A1628]' : 'bg-[#176FEB]'
              }`}
            >
              {r.initials}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-sm font-semibold text-[#0A1628]">{r.name}</span>
                <span className="shrink-0 text-[10px] text-[#9097A3]">{r.time}</span>
              </div>
              <p className="truncate text-xs text-[#555860]">{r.preview}</p>
            </div>
            {r.unread > 0 && (
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#176FEB] text-[10px] font-bold text-white">
                {r.unread}
              </span>
            )}
          </motion.li>
        ))}
      </ul>
    </UIShell>
  )
}

function ChatsInboxSection() {
  return (
    <SectionWrapper id="chats-inbox" dark>
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <RevealOnScroll>
          <Eyebrow>Unified Inbox</Eyebrow>
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
            Message agents, owners, tenants, or groups right where the conversation belongs.
            All and Unread filters, group chats, property-linked threads.
          </motion.p>
          <motion.div variants={revealItem} className="mt-6 space-y-3">
            <FeatureBullet icon={MessageSquare} text="Unified inbox for all conversations" />
            <FeatureBullet icon={CheckCircle} text="Property-linked conversation threads" />
            <FeatureBullet icon={Users} text="Group chats with owners, tenants, and vendors" />
            <FeatureBullet icon={Search} text="Unread tracking and smart search" />
          </motion.div>
        </RevealOnScroll>

        <RevealOnScroll>
          <motion.div variants={revealItem}>
            <InboxCard />
          </motion.div>
        </RevealOnScroll>
      </div>
    </SectionWrapper>
  )
}

/* ═════════════════════════════════════════════════════════════════════════
   Section 2 — Clear Conversations
   Representation: chat thread card with message bubbles + voice note
   ═════════════════════════════════════════════════════════════════════════ */

function ChatThreadCard() {
  const bars = [3, 5, 2, 6, 4, 7, 3, 5, 8, 4, 6, 3, 5, 7, 4, 2, 5, 6, 3, 4, 5, 2]
  return (
    <UIShell>
      {/* header */}
      <div className="flex items-center justify-between border-b border-[#E5E7EB] bg-white px-5 py-3">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-full bg-[#176FEB] text-[11px] font-bold text-white">
            AO
          </span>
          <div>
            <p className="text-sm font-semibold text-[#0A1628]">Aiden O</p>
            <p className="text-[10px] text-[#176FEB]">Online · 172 King St, Unit 4B</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex size-8 items-center justify-center rounded-lg bg-[#F5F6F8] text-[#555860]">
            <Phone className="size-3.5" />
          </button>
          <button className="flex size-8 items-center justify-center rounded-lg bg-[#F5F6F8] text-[#555860]">
            <Video className="size-3.5" />
          </button>
        </div>
      </div>

      {/* messages */}
      <div className="space-y-3 bg-[#FAFBFC] p-5">
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.15em] text-[#9097A3]">
          Sat, Aug 30
        </p>
        {[
          { side: 'them', text: 'Hello there! How are you doing?', time: '2:30 PM' },
          {
            side: 'them',
            text: 'I can type a continuous long message. Also, this was sent along with the previous one so the timestamp is shared.',
            time: '2:30 PM',
          },
          { side: 'me', text: 'Hi!', time: '2:36 PM' },
          { side: 'me', text: "Hey! I'm doing good", time: '2:37 PM' },
        ].map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 4 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, delay: 0.1 + i * 0.06 }}
            className={`flex ${m.side === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[78%] rounded-2xl px-3.5 py-2 text-[13px] ${
                m.side === 'me'
                  ? 'bg-[#176FEB] text-white'
                  : 'border border-[#E5E7EB] bg-white text-[#0A1628]'
              }`}
            >
              <p className="leading-snug">{m.text}</p>
              <p
                className={`mt-1 text-right text-[9px] ${
                  m.side === 'me' ? 'text-white/70' : 'text-[#9097A3]'
                }`}
              >
                {m.time}
              </p>
            </div>
          </motion.div>
        ))}

        {/* voice note */}
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="flex justify-end"
        >
          <div className="flex items-center gap-2.5 rounded-2xl bg-[#176FEB] px-3 py-2">
            <button className="flex size-6 items-center justify-center rounded-full bg-white/20">
              <Play className="size-3 text-white" />
            </button>
            <div className="flex h-4 items-center gap-[2px]">
              {bars.map((h, i) => (
                <span
                  key={i}
                  className="w-[2px] rounded-full bg-white/80"
                  style={{ height: `${h * 1.6}px` }}
                />
              ))}
            </div>
            <span className="text-[10px] text-white/80">0:28</span>
          </div>
        </motion.div>

        <p className="flex items-center justify-end gap-1 pt-1 text-[10px] text-[#176FEB]">
          <FileText className="size-2.5" />
          See transcript
        </p>
      </div>

      {/* composer */}
      <div className="flex items-center gap-2 border-t border-[#E5E7EB] bg-white px-4 py-3">
        <Paperclip className="size-4 text-[#9097A3]" />
        <span className="flex-1 text-xs text-[#9097A3]">Type a message...</span>
        <button className="flex size-8 items-center justify-center rounded-lg bg-[#176FEB] text-white">
          <Send className="size-3.5" />
        </button>
      </div>
    </UIShell>
  )
}

function ClearConversationsSection() {
  return (
    <SectionWrapper id="clear-conversations">
      <RevealOnScroll className="mx-auto max-w-2xl text-center">
        <Eyebrow>Messaging</Eyebrow>
        <motion.h2
          variants={revealItem}
          className="mt-3 font-display text-3xl font-normal text-[#0A1628] md:text-4xl lg:text-5xl"
        >
          Clear <span className="text-[#176FEB]">Conversations</span>
        </motion.h2>
        <motion.p
          variants={revealItem}
          className="mx-auto mt-4 max-w-xl text-base text-[#555860] sm:text-lg"
        >
          See messages, voice notes, and transcripts all in one place. Full message threads
          with timestamps, read receipts, and file sharing.
        </motion.p>
      </RevealOnScroll>

      <RevealOnScroll className="mx-auto mt-12 max-w-2xl">
        <motion.div variants={revealItem}>
          <ChatThreadCard />
        </motion.div>
      </RevealOnScroll>

      <RevealOnScroll className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
        {[
          { icon: Mic, text: 'Voice messages with auto-transcription' },
          { icon: CheckCircle, text: 'Read receipts and delivery status' },
          { icon: FileText, text: 'File attachments and media sharing' },
          { icon: Search, text: 'Full search across every thread' },
        ].map((b) => (
          <motion.div
            key={b.text}
            variants={revealItem}
            className="rounded-xl border border-[#E5E7EB] bg-white p-4"
          >
            <span className="flex size-9 items-center justify-center rounded-lg bg-[#E8F2FE]">
              <b.icon className="size-4 text-[#176FEB]" />
            </span>
            <p className="mt-3 text-sm leading-relaxed text-[#0A1628]">{b.text}</p>
          </motion.div>
        ))}
      </RevealOnScroll>
    </SectionWrapper>
  )
}

/* ═════════════════════════════════════════════════════════════════════════
   Section 3 — Connect & Talk
   Representation: action grid + directory card
   ═════════════════════════════════════════════════════════════════════════ */

function ConnectCard() {
  const actions = [
    { icon: UserPlus, label: 'New contact', sub: 'Start fresh' },
    { icon: Users, label: 'Create group', sub: 'Invite up to 50' },
    { icon: CalendarClock, label: 'Schedule call', sub: 'Pick a time' },
    { icon: Hash, label: 'Call a number', sub: 'Any phone line' },
  ]

  const favorites = [
    { initials: 'AO', name: 'Aiden O', role: 'Tenant · Unit 4B', online: true },
    { initials: 'SM', name: 'Sarah M', role: 'Owner · 3 units', online: true },
    { initials: 'TS', name: 'Tony S', role: 'Vendor · HVAC', online: false },
  ]

  return (
    <UIShell>
      <div className="border-b border-[#E5E7EB] bg-white px-5 py-4">
        <h3 className="font-heading text-base font-bold text-[#0A1628]">Start a conversation</h3>
      </div>
      <div className="grid grid-cols-2 gap-3 bg-[#FAFBFC] p-5">
        {actions.map((a, i) => (
          <motion.button
            key={a.label}
            type="button"
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.05 + i * 0.05 }}
            className="group flex items-start gap-3 rounded-xl border border-[#E5E7EB] bg-white p-3.5 text-left transition-colors hover:border-[#176FEB]/40 hover:bg-[#EEF4FE]/40"
          >
            <span className="flex size-9 items-center justify-center rounded-lg bg-[#E8F2FE]">
              <a.icon className="size-4 text-[#176FEB]" />
            </span>
            <div>
              <p className="text-sm font-semibold text-[#0A1628]">{a.label}</p>
              <p className="text-[11px] text-[#555860]">{a.sub}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="border-t border-[#E5E7EB] bg-white px-5 py-4">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-1.5 text-[11px] font-heading font-semibold uppercase tracking-wider text-[#555860]">
            <Star className="size-3 text-[#176FEB]" />
            Favorites
          </p>
          <span className="text-[11px] text-[#9097A3]">3 online</span>
        </div>
        <ul className="mt-3 space-y-2">
          {favorites.map((f) => (
            <li key={f.name} className="flex items-center gap-3">
              <span className="relative flex size-8 items-center justify-center rounded-full bg-[#176FEB] text-[10px] font-bold text-white">
                {f.initials}
                {f.online && (
                  <span className="absolute -bottom-0.5 -right-0.5 size-2 rounded-full bg-[#176FEB] ring-2 ring-white" />
                )}
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#0A1628]">{f.name}</p>
                <p className="text-[11px] text-[#555860]">{f.role}</p>
              </div>
              <button className="flex size-7 items-center justify-center rounded-md bg-[#F5F6F8] text-[#555860]">
                <Phone className="size-3" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </UIShell>
  )
}

function ConnectTalkSection() {
  return (
    <SectionWrapper id="connect-talk" dark>
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
        <RevealOnScroll>
          <Eyebrow>Contacts</Eyebrow>
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
            See who is online, call directly from any contact.
          </motion.p>
          <motion.div variants={revealItem} className="mt-6 space-y-3">
            <FeatureBullet icon={UserPlus} text="New contact and group creation" />
            <FeatureBullet icon={CalendarClock} text="Schedule calls in advance" />
            <FeatureBullet icon={Phone} text="Direct calling from contacts" />
            <FeatureBullet icon={Star} text="Favorites list for quick access" />
          </motion.div>
        </RevealOnScroll>

        <RevealOnScroll>
          <motion.div variants={revealItem}>
            <ConnectCard />
          </motion.div>
        </RevealOnScroll>
      </div>
    </SectionWrapper>
  )
}

/* ═════════════════════════════════════════════════════════════════════════
   Section 4 — Voice & Video Calls
   Representation: two call cards side by side (incoming + on-call)
   ═════════════════════════════════════════════════════════════════════════ */

function IncomingCallCard() {
  return (
    <UIShell>
      <div className="flex items-center justify-between border-b border-[#E5E7EB] bg-white px-5 py-3">
        <p className="flex items-center gap-1.5 text-[11px] font-heading font-semibold uppercase tracking-wider text-[#176FEB]">
          <PhoneIncoming className="size-3" /> Incoming
        </p>
        <span className="flex items-center gap-1 text-[11px] text-[#555860]">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-1.5 animate-ping rounded-full bg-[#176FEB]" />
            <span className="relative inline-flex size-1.5 rounded-full bg-[#176FEB]" />
          </span>
          Ringing
        </span>
      </div>

      <div className="flex flex-1 flex-col items-center justify-between gap-5 bg-[#FAFBFC] px-6 py-7">
        <div className="flex flex-col items-center gap-4">
          <div className="flex size-20 items-center justify-center rounded-full bg-[#176FEB] text-2xl font-bold text-white shadow-[0_16px_32px_-12px_rgba(23,111,235,0.45)]">
            TS
          </div>
          <div className="text-center">
            <p className="font-heading text-lg font-bold text-[#0A1628]">Tony S</p>
            <p className="mt-0.5 text-xs text-[#555860]">172 King St · Unit 4B · Owner</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-5">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-[11px] text-[#555860]">
            <MessageSquare className="size-3" />
            Decline with a message
          </div>

          <div className="flex items-center gap-5">
            <button
              aria-label="Decline call"
              className="flex size-12 items-center justify-center rounded-full bg-[#E7000B] text-white shadow-[0_8px_16px_-6px_rgba(231,0,11,0.4)] transition-transform duration-150 hover:scale-105"
            >
              <PhoneOff className="size-4" />
            </button>
            <button
              aria-label="Accept call"
              className="flex size-12 items-center justify-center rounded-full bg-[#176FEB] text-white shadow-[0_8px_16px_-6px_rgba(23,111,235,0.4)] transition-transform duration-150 hover:scale-105"
            >
              <Phone className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </UIShell>
  )
}

function OnCallCard() {
  return (
    <UIShell>
      <div className="flex items-center justify-between border-b border-[#E5E7EB] bg-white px-5 py-3">
        <p className="flex items-center gap-1.5 text-[11px] font-heading font-semibold uppercase tracking-wider text-[#176FEB]">
          <Phone className="size-3" /> Live call
        </p>
        <span className="flex items-center gap-1 text-[11px] tabular-nums text-[#555860]">
          <span className="size-1.5 rounded-full bg-[#176FEB]" />
          00:03:47
        </span>
      </div>

      <div className="flex flex-1 flex-col items-center justify-between gap-5 bg-[#FAFBFC] px-6 py-7">
        <div className="flex flex-col items-center gap-4">
          <div className="flex size-20 items-center justify-center rounded-full bg-[#0A1628] text-2xl font-bold text-white">
            AR
          </div>
          <div className="text-center">
            <p className="font-heading text-lg font-bold text-[#0A1628]">Alice R</p>
            <p className="mt-0.5 text-xs text-[#555860]">Property manager · 3 units</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-5">
          {/* waveform indicator */}
          <div className="flex h-4 items-end gap-[3px]">
            {[4, 7, 3, 8, 5, 9, 4, 6, 8, 3, 7, 5, 9, 4, 7, 3, 8, 5].map((h, i) => (
              <motion.span
                key={i}
                initial={{ height: 2 }}
                animate={{ height: h * 2 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.04,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                }}
                className="w-[3px] rounded-full bg-[#176FEB]"
              />
            ))}
          </div>

          {/* call controls */}
          <div className="flex items-center gap-2.5">
            {[
              { icon: Mic, active: true, label: 'Mute' },
              { icon: Volume2, active: false, label: 'Speaker' },
              { icon: Video, active: false, label: 'Video' },
              { icon: ScreenShare, active: false, label: 'Share screen' },
            ].map((c, i) => (
              <button
                key={i}
                aria-label={c.label}
                className={`flex size-11 items-center justify-center rounded-full border transition-colors duration-150 ${
                  c.active
                    ? 'border-[#176FEB] bg-[#EEF4FE] text-[#176FEB]'
                    : 'border-[#E5E7EB] bg-white text-[#555860] hover:border-[#176FEB]/40'
                }`}
              >
                <c.icon className="size-4" />
              </button>
            ))}
            <button
              aria-label="End call"
              className="flex size-12 items-center justify-center rounded-full bg-[#E7000B] text-white shadow-[0_8px_16px_-6px_rgba(231,0,11,0.4)] transition-transform duration-150 hover:scale-105"
            >
              <PhoneOff className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </UIShell>
  )
}

function VoiceVideoSection() {
  return (
    <SectionWrapper id="voice-video">
      <RevealOnScroll className="mx-auto max-w-3xl text-center">
        <Eyebrow>Voice and Video Calls</Eyebrow>
        <motion.h2
          variants={revealItem}
          className="mt-3 font-display text-3xl font-normal text-[#0A1628] md:text-4xl lg:text-5xl"
        >
          From the first ring to{' '}
          <span className="text-[#176FEB]">the last goodbye</span>
        </motion.h2>
        <motion.p
          variants={revealItem}
          className="mx-auto mt-4 max-w-2xl text-base text-[#555860] sm:text-lg"
        >
          Accept calls with full caller ID and property context. Crystal-clear voice with mute,
          speaker, screen share, and one-tap switch to video.
        </motion.p>
      </RevealOnScroll>

      <RevealOnScroll className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2" stagger={0.1}>
        <motion.div variants={revealItem}>
          <IncomingCallCard />
        </motion.div>
        <motion.div variants={revealItem}>
          <OnCallCard />
        </motion.div>
      </RevealOnScroll>

      <RevealOnScroll className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-4" stagger={0.06}>
        {[
          { value: 'HD', label: 'Voice quality' },
          { value: '1-tap', label: 'Switch to video' },
          { value: 'Built in', label: 'No Zoom or Teams' },
          { value: 'Auto', label: 'Recording & transcripts' },
        ].map((s) => (
          <motion.div
            key={s.label}
            variants={revealItem}
            className="rounded-xl border border-[#E5E7EB] bg-white p-4 text-center"
          >
            <p className="font-display text-2xl font-normal text-[#176FEB]">{s.value}</p>
            <p className="mt-1 text-[11px] font-heading font-semibold uppercase tracking-wider text-[#555860]">
              {s.label}
            </p>
          </motion.div>
        ))}
      </RevealOnScroll>
    </SectionWrapper>
  )
}

/* ═════════════════════════════════════════════════════════════════════════
   Section 5 — Meet Together
   Representation: 2x2 video grid + controls, all browser-style
   ═════════════════════════════════════════════════════════════════════════ */

function VideoGridCard() {
  const participants = [
    { name: 'John D', role: 'Owner', initials: 'JD', speaking: true },
    { name: 'Alice R', role: 'Property manager', initials: 'AR' },
    { name: 'Sarah M', role: 'Tenant', initials: 'SM' },
    { name: 'You', role: 'Agent', initials: 'YO' },
  ]
  return (
    <UIShell className="bg-[#0A1628]">
      {/* meeting header */}
      <div className="flex items-center justify-between border-b border-white/10 bg-[#0A1628] px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-2 animate-ping rounded-full bg-[#176FEB] opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-[#176FEB]" />
          </span>
          <p className="text-[11px] font-semibold text-white">00:48</p>
          <span className="ml-2 text-[11px] text-white/50">Property review · 172 King St</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[10px] text-white/80">
          <Users className="size-3" /> 4 participants
        </div>
      </div>

      {/* 2x2 grid */}
      <div className="grid grid-cols-2 gap-1.5 bg-[#0A1628] p-3">
        {participants.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
            className={`relative flex aspect-video flex-col items-center justify-center rounded-lg ${
              p.speaking ? 'ring-2 ring-[#176FEB]' : ''
            }`}
            style={{
              background:
                'linear-gradient(135deg, rgba(23,111,235,0.15) 0%, rgba(11,90,212,0.25) 100%)',
            }}
          >
            <span className="flex size-12 items-center justify-center rounded-full bg-white/10 font-heading text-sm font-bold text-white backdrop-blur-sm">
              {p.initials}
            </span>
            <p className="mt-2 text-[11px] font-medium text-white">{p.name}</p>
            <p className="text-[9px] text-white/50">{p.role}</p>
            {p.speaking && (
              <span className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-[#176FEB]/80 px-2 py-0.5 text-[8px] font-semibold text-white">
                <Mic className="size-2" />
                Speaking
              </span>
            )}
          </motion.div>
        ))}
      </div>

      {/* call controls */}
      <div className="flex items-center justify-center gap-2 border-t border-white/10 bg-[#0A1628] px-5 py-4">
        {[
          { icon: Mic, active: true },
          { icon: Video, active: true },
          { icon: ScreenShare, active: false },
          { icon: MessageSquare, active: false },
          { icon: MoreHorizontal, active: false },
        ].map((c, i) => (
          <button
            key={i}
            className={`flex size-9 items-center justify-center rounded-full text-white transition-colors ${
              c.active ? 'bg-white/15' : 'bg-white/5'
            }`}
          >
            <c.icon className="size-4" />
          </button>
        ))}
        <button className="ml-2 flex size-9 items-center justify-center rounded-full bg-[#E7000B] text-white">
          <PhoneOff className="size-4" />
        </button>
      </div>
    </UIShell>
  )
}

function GroupVideoSection() {
  const tiles = [
    {
      icon: Users,
      title: 'Multi-party video',
      description: 'Owners, tenants, vendors in a single call. No external tool needed.',
    },
    {
      icon: ScreenShare,
      title: 'Screen share',
      description: 'Walk through documents, floor plans, and photos live.',
    },
    {
      icon: Play,
      title: 'Auto-recording',
      description: 'Every meeting saved with transcript, ready to search.',
    },
  ]
  return (
    <SectionWrapper id="group-video" dark>
      <RevealOnScroll className="mx-auto max-w-2xl text-center">
        <Eyebrow>Video Meetings</Eyebrow>
        <motion.h2
          variants={revealItem}
          className="mt-3 font-display text-3xl font-normal text-[#0A1628] md:text-4xl lg:text-5xl"
        >
          Meet Together, <span className="text-[#176FEB]">All at Once</span>
        </motion.h2>
      </RevealOnScroll>

      <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
        <RevealOnScroll className="space-y-4" stagger={0.1}>
          {tiles.map((t) => (
            <motion.div
              key={t.title}
              variants={revealItem}
              className="rounded-2xl border border-[#E5E7EB] bg-white p-5"
            >
              <div className="flex items-start gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#E8F2FE]">
                  <t.icon className="size-5 text-[#176FEB]" />
                </span>
                <div>
                  <h3 className="font-heading text-base font-semibold text-[#0A1628]">
                    {t.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#555860]">{t.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </RevealOnScroll>

        <RevealOnScroll>
          <motion.div variants={revealItem}>
            <VideoGridCard />
          </motion.div>
        </RevealOnScroll>
      </div>
    </SectionWrapper>
  )
}

/* ═════════════════════════════════════════════════════════════════════════
   Section 6 — Everything Saved
   Representation: recording detail card with tabs + transcript + waveform
   ═════════════════════════════════════════════════════════════════════════ */

function RecordingCard() {
  const lines = [
    { time: '0:00', speaker: 'John D', text: 'Good afternoon everyone, thanks for joining.' },
    { time: '0:05', speaker: 'Alice R', text: 'Thanks John. Lets go over the maintenance schedule.' },
    { time: '0:12', speaker: 'Sarah M', text: 'I had a few questions about the HVAC inspection.' },
    { time: '0:18', speaker: 'You', text: 'Let me pull up the property details.' },
  ]
  const bars = [4, 7, 5, 9, 3, 8, 6, 4, 7, 5, 9, 4, 8, 6, 5, 9, 3, 7, 5, 8, 4, 7, 6, 9]

  return (
    <UIShell>
      {/* header */}
      <div className="flex items-center justify-between border-b border-[#E5E7EB] bg-white px-5 py-4">
        <div>
          <p className="font-heading text-sm font-bold text-[#0A1628]">
            Property review, 172 King St
          </p>
          <p className="text-[11px] text-[#555860]">Apr 8 · 15:24 duration · 4 participants</p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-lg border border-[#E5E7EB] px-3 py-1.5 text-[11px] font-semibold text-[#555860]">
            Share
          </button>
          <button className="rounded-lg bg-[#176FEB] px-3 py-1.5 text-[11px] font-semibold text-white">
            Download
          </button>
        </div>
      </div>

      {/* tabs */}
      <div className="flex gap-1 border-b border-[#E5E7EB] bg-white px-5 py-2">
        {['Summary', 'Recording & Transcript', 'Parties'].map((t, i) => (
          <button
            key={t}
            className={`rounded-lg px-3 py-1.5 text-[11px] font-semibold ${
              i === 1 ? 'bg-[#176FEB] text-white' : 'text-[#555860]'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* player */}
      <div className="border-b border-[#E5E7EB] bg-[#FAFBFC] p-5">
        <div className="flex items-center gap-4">
          <button className="flex size-11 items-center justify-center rounded-full bg-[#176FEB] text-white">
            <Pause className="size-4" />
          </button>
          <div className="flex-1">
            <div className="flex h-6 items-center gap-[2px]">
              {bars.map((h, i) => (
                <span
                  key={i}
                  className="w-[3px] rounded-full"
                  style={{
                    height: `${h * 2.4}px`,
                    backgroundColor: i < 10 ? '#176FEB' : '#D1D5DB',
                  }}
                />
              ))}
            </div>
            <div className="mt-1.5 flex justify-between text-[10px] text-[#9097A3]">
              <span>04:12</span>
              <span>15:24</span>
            </div>
          </div>
        </div>
      </div>

      {/* transcript */}
      <div className="bg-white px-5 py-4">
        <p className="mb-3 flex items-center gap-1.5 text-[11px] font-heading font-semibold uppercase tracking-wider text-[#555860]">
          <FileText className="size-3 text-[#176FEB]" />
          Transcript
        </p>
        <div className="space-y-3">
          {lines.map((l, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -4 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: 0.1 + i * 0.06 }}
              className="flex gap-3"
            >
              <span className="w-10 shrink-0 text-[11px] text-[#9097A3]">{l.time}</span>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold text-[#176FEB]">{l.speaker}</p>
                <p className="text-[12px] leading-snug text-[#0A1628]">{l.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <button className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-[#176FEB]">
          Show full transcript
          <ChevronDown className="size-3" />
        </button>
      </div>
    </UIShell>
  )
}

function SavedSection() {
  return (
    <SectionWrapper id="saved">
      <RevealOnScroll className="mx-auto max-w-3xl text-center">
        <Eyebrow>Records</Eyebrow>
        <motion.h2
          variants={revealItem}
          className="mt-3 font-display text-3xl font-normal text-[#0A1628] md:text-4xl lg:text-5xl"
        >
          Everything, <span className="text-[#176FEB]">Saved for Later</span>
        </motion.h2>
        <motion.p
          variants={revealItem}
          className="mx-auto mt-4 max-w-xl text-base text-[#555860] sm:text-lg"
        >
          Recordings and transcripts are always available. Review conversations,
          search by keyword, share with team members.
        </motion.p>
      </RevealOnScroll>

      <RevealOnScroll className="mx-auto mt-12 max-w-3xl">
        <motion.div variants={revealItem}>
          <RecordingCard />
        </motion.div>
      </RevealOnScroll>

      <RevealOnScroll className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
        {[
          { icon: FileText, text: 'Auto-transcription on every call' },
          { icon: Play, text: 'Playback with seek controls' },
          { icon: Users, text: 'Summary, transcript, and parties' },
          { icon: Search, text: 'Searchable archive by keyword' },
        ].map((b) => (
          <motion.div
            key={b.text}
            variants={revealItem}
            className="rounded-xl border border-[#E5E7EB] bg-white p-4"
          >
            <span className="flex size-9 items-center justify-center rounded-lg bg-[#E8F2FE]">
              <b.icon className="size-4 text-[#176FEB]" />
            </span>
            <p className="mt-3 text-sm leading-relaxed text-[#0A1628]">{b.text}</p>
          </motion.div>
        ))}
      </RevealOnScroll>
    </SectionWrapper>
  )
}

/* ═════════════════════════════════════════════════════════════════════════
   Features grid + CTA
   ═════════════════════════════════════════════════════════════════════════ */

const COMMS_FEATURES = [
  { icon: MessageSquare, title: 'Unified Messaging', description: 'All conversations in one place. Property-linked threads keep context attached to every unit.' },
  { icon: Phone, title: 'Built-in Voice Calls', description: 'Call contacts directly from the app with caller ID, property context, and one-tap dialling.' },
  { icon: Video, title: 'Video Conferencing', description: 'Group video calls with screen sharing, recording, and automatic transcription.' },
  { icon: FileText, title: 'Auto-Transcription', description: 'Every call and voice note transcribed automatically. Search by keyword anytime.' },
  { icon: Shield, title: 'Secure and Compliant', description: 'End-to-end encrypted messages and calls. Data stored on Canadian servers.' },
  { icon: Bookmark, title: 'Saved Recordings', description: 'Recordings, summaries, and transcripts saved permanently for audit and review.' },
]

function FeaturesGridSection() {
  return (
    <SectionWrapper id="features" dark>
      <RevealOnScroll className="mx-auto max-w-2xl text-center">
        <Eyebrow>Features</Eyebrow>
        <motion.h2
          variants={revealItem}
          className="mt-3 font-display text-3xl font-normal text-[#0A1628] md:text-4xl lg:text-5xl"
        >
          Everything you need to <span className="text-[#176FEB]">communicate</span>
        </motion.h2>
        <motion.p
          variants={revealItem}
          className="mx-auto mt-4 max-w-xl text-base text-[#555860] sm:text-lg"
        >
          From instant messaging to group video. Powerful communication tools built for property management.
        </motion.p>
      </RevealOnScroll>

      <RevealOnScroll className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
        {COMMS_FEATURES.map((feature) => (
          <motion.div
            key={feature.title}
            variants={revealItem}
            className="rounded-2xl border border-[#E5E7EB] bg-white p-6"
          >
            <span className="flex size-12 items-center justify-center rounded-xl bg-[#E8F2FE] text-[#176FEB]">
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

function CTASection() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <RevealOnScroll className="mx-auto max-w-3xl px-6 text-center">
        <motion.h2
          variants={revealItem}
          className="font-display text-3xl font-normal text-[#0A1628] md:text-4xl lg:text-5xl"
        >
          Deploy secure communications across your operation
        </motion.h2>
        <motion.p variants={revealItem} className="mx-auto mt-4 max-w-xl text-base text-[#555860]">
          Messaging, calls, video, transcripts, and recordings, all in one platform.
          No more juggling Zoom, Teams, WhatsApp, and email.
        </motion.p>
        <motion.div variants={revealItem} className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/platform/"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-[#176FEB] px-8 font-heading text-sm font-semibold text-white transition-colors hover:bg-[#1260d1]"
          >
            See the Platform <ArrowRight className="ml-2 size-4" />
          </Link>
          <Link
            href="/demo/"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E5E7EB] px-8 font-heading text-sm font-semibold text-[#0A1628] transition-colors hover:border-[#D1D5DB] hover:bg-[#EAECF0]"
          >
            Book a Live Demo
          </Link>
        </motion.div>
      </RevealOnScroll>
    </section>
  )
}

/* ═════════════════════════════════════════════════════════════════════════
   Main export
   ═════════════════════════════════════════════════════════════════════════ */

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
