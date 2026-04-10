'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Image from 'next/image'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import {
  Phone,
  Video,
  Users,
  Send,
  Paperclip,
  Smile,
  Search,
  MoreVertical,
  Mic,
  MicOff,
  PhoneOff,
  CheckCheck,
  ChevronLeft,
  ChevronRight,
  Volume2,
} from 'lucide-react'

/* ═══════════════════════════════════════════ */
/*  Screen data                                */
/* ═══════════════════════════════════════════ */
const screens = [
  {
    title: 'Chats In',
    highlight: 'One Place',
    description: 'Manage tenants, owners, vendors, and team messages all in one unified inbox.',
    screenshot: '/screenshots/comms/chats-inbox.png',
  },
  {
    title: 'Connect &',
    highlight: 'Talk',
    description: 'Voice and video calls built in. See who\u2019s online and call directly from any record.',
    screenshot: '/screenshots/comms/connect-talk.png',
  },
  {
    title: 'Clear',
    highlight: 'Conversations',
    description: 'Full message threads with timestamps, read receipts, and file attachments.',
    screenshot: '/screenshots/comms/clear-conversations.png',
  },
  {
    title: 'Incoming',
    highlight: 'Call',
    description: 'Accept calls from tenants and team members with caller ID and property context.',
    screenshot: '/screenshots/comms/incoming-call.png',
  },
  {
    title: 'On a',
    highlight: 'Call',
    description: 'Crystal-clear voice and video with mute, speaker, and screen share controls.',
    screenshot: '/screenshots/comms/on-a-call.png',
  },
  {
    title: 'Meet Together,',
    highlight: 'All at Once',
    description: 'Group video calls with your team, owners, or vendors \u2014 no external tools needed.',
    screenshot: '/screenshots/comms/group-video.png',
  },
  {
    title: 'Everything,',
    highlight: 'Saved for Later',
    description: 'Every message, call recording, file, and document saved and searchable.',
    screenshot: '/screenshots/comms/saved-later.png',
  },
] as const

/* ─── Mock data matching Figma designs ─── */
const chatThreads = [
  { name: '172 King St London', role: 'Group', message: 'Sarah: Meeting confirmed for Thursday', time: '2m', unread: 0, initials: '172', online: false, isGroup: true },
  { name: 'Beata J', role: '', message: 'Can you check the lease terms?', time: '15m', unread: 2, initials: 'BJ', online: true, isGroup: false },
  { name: 'Mark O', role: '', message: 'Thanks for the update!', time: '1h', unread: 0, initials: 'MO', online: false, isGroup: false },
  { name: 'Sarah & Mike', role: '', message: 'We will be there at 10am', time: '3h', unread: 0, initials: 'SM', online: false, isGroup: false },
  { name: 'Tony S', role: '', message: 'Call me when you get a chance', time: '5h', unread: 0, initials: 'TS', online: true, isGroup: false },
  { name: 'London peeps 3bhk', role: 'Group', message: 'Anyone available this weekend?', time: '1d', unread: 0, initials: 'LP', online: false, isGroup: true },
  { name: 'Jessica W', role: '', message: 'Document signed and sent', time: '2d', unread: 0, initials: 'JW', online: false, isGroup: false },
]

const connectMenuItems = [
  { icon: '👤', label: 'New contact' },
  { icon: '👥', label: 'Create group chat' },
  { icon: '📅', label: 'Schedule call' },
  { icon: '📞', label: 'Call a number' },
]

const favoriteContacts = [
  { name: 'Amelia W', initials: 'AW' },
  { name: 'Bella F', initials: 'BF' },
  { name: 'Aiden O', initials: 'AO' },
  { name: 'Amelia W', initials: 'AW' },
  { name: 'Asher S', initials: 'AS' },
]

const chatMessages = [
  { text: 'Hey, are you available for a quick call?', time: '', mine: false },
  { text: 'Sure, give me 5 minutes', time: '', mine: true, status: 'read' as const },
]

const meetParticipants = [
  { name: 'You', initials: 'YO', muted: false },
  { name: 'David K.', initials: 'DK', muted: false },
  { name: 'Sarah M.', initials: 'SM', muted: true },
  { name: 'James L.', initials: 'JL', muted: false },
]

/* ─── Reusable: Avatar ─── */
function Av({ initials, size = 10, online, dark }: { initials: string; size?: number; online?: boolean; dark?: boolean }) {
  return (
    <div className="relative shrink-0">
      <div
        className={`flex items-center justify-center rounded-full font-heading font-semibold ${dark ? 'bg-white/15 text-white' : 'bg-brand-blue/10 text-brand-blue'}`}
        style={{ width: size * 4, height: size * 4, fontSize: size < 10 ? 10 : 12 }}
      >
        {initials}
      </div>
      {online !== undefined && (
        <span className={`absolute -bottom-0.5 -right-0.5 block h-2.5 w-2.5 rounded-full ring-2 ring-white ${online ? 'bg-brand-success' : 'bg-brand-graphite-light'}`} />
      )}
    </div>
  )
}

/* ─── Phone chrome ─── */
function PhoneStatusBar({ dark }: { dark?: boolean }) {
  return (
    <div className={`flex items-center justify-between px-5 py-1.5 ${dark ? 'bg-[#0A1628]' : 'bg-[#FAFBFC]'}`}>
      <span className={`text-[10px] font-medium ${dark ? 'text-white/50' : 'text-brand-graphite-mid/60'}`}>9:41</span>
      <div className={`mx-auto h-5 w-20 rounded-full ${dark ? 'bg-white/10' : 'bg-black/5'}`} />
      <div className="flex items-center gap-1">
        {[40, 30, 20].map((o) => (
          <div key={o} className={`h-1.5 w-1 rounded-full ${dark ? `bg-white/${o}` : `bg-brand-graphite-mid/${o}`}`} />
        ))}
      </div>
    </div>
  )
}

function PhoneHomeBar({ dark }: { dark?: boolean }) {
  return (
    <div className="flex justify-center pb-1 pt-1.5">
      <div className={`h-1 w-28 rounded-full ${dark ? 'bg-white/20' : 'bg-black/10'}`} />
    </div>
  )
}

/* ═══════════════════════════════════════════ */
/*  7 Phone Screen Contents                   */
/* ═══════════════════════════════════════════ */

/* Screen 1: Chats In One Place — Inbox with All/Unread tabs, chat list */
function Screen1() {
  return (
    <div className="flex h-full flex-col bg-white">
      <PhoneStatusBar />
      {/* Header with Chats title + search/plus icons */}
      <div className="flex items-center justify-between px-4 py-2.5">
        <span className="font-heading text-lg font-bold text-brand-graphite">Chats</span>
        <div className="flex items-center gap-2.5">
          <Search className="h-4 w-4 text-brand-graphite-mid" />
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-blue text-xs font-bold text-white">+</div>
        </div>
      </div>
      {/* All / Unread tabs */}
      <div className="flex gap-1 px-4 pb-2">
        <span className="rounded-full bg-brand-blue px-3 py-1 text-[10px] font-semibold text-white">All</span>
        <span className="rounded-full bg-brand-off-white px-3 py-1 text-[10px] font-medium text-brand-graphite-mid">Unread</span>
      </div>
      {/* Chat list */}
      <div className="flex-1 overflow-hidden">
        {chatThreads.map((t) => (
          <div key={t.name} className="flex items-center gap-2.5 px-4 py-2.5">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full font-heading text-xs font-semibold ${t.isGroup ? 'bg-brand-blue/15 text-brand-blue' : 'bg-brand-blue/10 text-brand-blue'}`}>
                {t.isGroup ? (
                  <Users className="h-4 w-4" />
                ) : (
                  t.initials
                )}
              </div>
              {t.online && (
                <span className="absolute -bottom-0.5 -right-0.5 block h-2.5 w-2.5 rounded-full bg-brand-success ring-2 ring-white" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-semibold text-brand-graphite">{t.name}</span>
                <span className="text-[9px] text-brand-graphite-mid">{t.time}</span>
              </div>
              <p className="mt-0.5 truncate text-[11px] text-brand-graphite/60">{t.message}</p>
            </div>
            {t.unread > 0 && (
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-blue text-[9px] font-bold text-white">{t.unread}</span>
            )}
          </div>
        ))}
      </div>
      {/* Chats / Calls bottom tabs */}
      <div className="flex border-t border-border">
        <div className="flex flex-1 flex-col items-center gap-0.5 py-2">
          <Send className="h-4 w-4 text-brand-blue" />
          <span className="text-[9px] font-semibold text-brand-blue">Chats</span>
        </div>
        <div className="flex flex-1 flex-col items-center gap-0.5 py-2">
          <Phone className="h-4 w-4 text-brand-graphite-mid" />
          <span className="text-[9px] text-brand-graphite-mid">Calls</span>
        </div>
      </div>
      <PhoneHomeBar />
    </div>
  )
}

/* Screen 2: Connect & Talk — Menu + Favorites list */
function Screen2() {
  return (
    <div className="flex h-full flex-col bg-white">
      <PhoneStatusBar />
      {/* Header */}
      <div className="px-4 py-2.5">
        <span className="font-heading text-lg font-bold text-brand-graphite">Connect</span>
      </div>
      {/* Menu items */}
      <div className="border-b border-border px-4 pb-3">
        {connectMenuItems.map((item) => (
          <div key={item.label} className="flex items-center gap-3 py-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue/10">
              <span className="text-sm">{item.icon}</span>
            </div>
            <span className="text-[12px] font-medium text-brand-graphite">{item.label}</span>
          </div>
        ))}
      </div>
      {/* Favorites section */}
      <div className="flex-1 px-4 pt-3">
        <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-brand-graphite-mid">Favorites</p>
        {favoriteContacts.map((c, i) => (
          <div key={`${c.name}-${i}`} className="flex items-center gap-2.5 py-2">
            <Av initials={c.initials} size={9} />
            <span className="text-[12px] font-medium text-brand-graphite">{c.name}</span>
            <div className="ml-auto flex gap-2">
              <Phone className="h-3.5 w-3.5 text-brand-graphite-mid" />
              <Video className="h-3.5 w-3.5 text-brand-graphite-mid" />
            </div>
          </div>
        ))}
      </div>
      <PhoneHomeBar />
    </div>
  )
}

/* Screen 3: Clear Conversations — Chat with Aiden O */
function Screen3() {
  return (
    <div className="flex h-full flex-col bg-white">
      <PhoneStatusBar />
      {/* Chat header */}
      <div className="flex items-center gap-2.5 border-b border-border px-4 py-2">
        <ChevronLeft className="h-4 w-4 text-brand-graphite-mid" />
        <Av initials="AO" size={8} />
        <div className="flex-1">
          <span className="text-xs font-semibold text-brand-graphite">Aiden O</span>
        </div>
        <Phone className="h-3.5 w-3.5 text-brand-graphite-mid" />
        <Video className="h-3.5 w-3.5 text-brand-graphite-mid" />
        <MoreVertical className="h-3.5 w-3.5 text-brand-graphite-mid" />
      </div>
      {/* Date marker */}
      <div className="px-4 py-2 text-center">
        <span className="text-[9px] text-brand-graphite-mid">Sat, Aug 30</span>
      </div>
      {/* New messages badge */}
      <div className="flex justify-center py-1">
        <span className="rounded-full bg-brand-blue/10 px-3 py-0.5 text-[9px] font-medium text-brand-blue">New messages (2) Today</span>
      </div>
      {/* Messages */}
      <div className="flex-1 space-y-2.5 overflow-hidden px-3 py-2">
        {/* Received */}
        <div className="flex justify-start">
          <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-[#F0F2F5] px-3 py-2">
            <p className="text-[11px] leading-snug text-brand-graphite">Hey, are you available for a quick call?</p>
          </div>
        </div>
        {/* Sent */}
        <div className="flex justify-end">
          <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-brand-blue px-3 py-2">
            <p className="text-[11px] leading-snug text-white">Sure, give me 5 minutes</p>
            <div className="mt-0.5 flex items-center justify-end gap-0.5 text-white/50">
              <CheckCheck className="h-2.5 w-2.5" />
            </div>
          </div>
        </div>
        {/* Received */}
        <div className="flex justify-start">
          <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-[#F0F2F5] px-3 py-2">
            <p className="text-[11px] leading-snug text-brand-graphite">Sounds good!</p>
          </div>
        </div>
        {/* Voice message */}
        <div className="flex justify-start">
          <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-[#F0F2F5] px-3 py-2">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-blue">
                <span className="text-[10px] text-white">&#9654;</span>
              </div>
              <div className="flex-1">
                {/* Waveform bars */}
                <div className="flex items-center gap-[1.5px]">
                  {[3, 5, 8, 6, 10, 7, 4, 8, 5, 9, 6, 3, 7, 5, 8, 4, 6, 9, 5, 7].map((h, i) => (
                    <div key={i} className="w-[2px] rounded-full bg-brand-graphite-mid/40" style={{ height: h }} />
                  ))}
                </div>
                <p className="mt-0.5 text-[8px] text-brand-graphite-mid">0:12</p>
              </div>
            </div>
            <p className="mt-1 text-[9px] font-medium text-brand-blue">See transcript</p>
          </div>
        </div>
      </div>
      {/* Input bar */}
      <div className="border-t border-border px-3 py-2">
        <div className="flex items-center gap-1.5 rounded-xl border border-border bg-white px-2.5 py-1.5">
          <Smile className="h-4 w-4 text-brand-graphite-mid" />
          <span className="flex-1 text-[10px] text-brand-graphite-light">Type a message...</span>
          <Paperclip className="h-4 w-4 text-brand-graphite-mid" />
          <Mic className="h-4 w-4 text-brand-graphite-mid" />
        </div>
      </div>
      <PhoneHomeBar />
    </div>
  )
}

/* Screen 4: Incoming Call — Tony S */
function Screen4() {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-gradient-to-b from-white to-brand-blue-tint text-center">
      <PhoneStatusBar />
      <div className="flex flex-1 flex-col items-center justify-center px-6">
        <p className="mb-4 text-[10px] font-medium uppercase tracking-widest text-brand-graphite-mid">Incoming voice call</p>
        <div className="relative mb-4">
          <motion.div
            className="absolute -inset-3 rounded-full border-2 border-brand-blue/20"
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -inset-6 rounded-full border border-brand-blue/10"
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          />
          {/* Large circular avatar for Tony S */}
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue to-brand-blue/80">
            <span className="font-heading text-2xl font-bold text-white">TS</span>
          </div>
        </div>
        <p className="mt-2 font-heading text-xl font-semibold text-brand-graphite">Tony S</p>
        <p className="mt-3 text-[11px] text-brand-graphite-mid">Decline with a message</p>
        <div className="mt-8 flex items-center gap-10">
          <motion.div
            className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-error shadow-lg"
            whileHover={{ scale: 1.1 }}
          >
            <PhoneOff className="h-5 w-5 text-white" />
          </motion.div>
          <motion.div
            className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-success shadow-lg"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Phone className="h-5 w-5 text-white" />
          </motion.div>
        </div>
      </div>
      <PhoneHomeBar />
    </div>
  )
}

/* Screen 5: On a Call — Recording indicator, Alice R */
function Screen5() {
  return (
    <div className="flex h-full flex-col bg-[#0A1628] text-white">
      <PhoneStatusBar dark />
      <div className="flex flex-1 flex-col items-center justify-center px-6">
        {/* Recording indicator */}
        <div className="mb-6 flex items-center gap-1.5">
          <motion.span
            className="h-2 w-2 rounded-full bg-brand-error"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="font-mono text-xs text-white/60">00:01</span>
        </div>
        {/* Large circular avatar */}
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue to-brand-blue/70">
          <span className="font-heading text-3xl font-bold text-white">AR</span>
        </div>
        <p className="mt-4 font-heading text-base font-semibold">Alice R</p>
        <div className="mt-10 flex items-center gap-3.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
            <Volume2 className="h-4.5 w-4.5 text-white/70" />
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
            <MicOff className="h-4.5 w-4.5 text-white/70" />
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
            <Video className="h-4.5 w-4.5 text-white/70" />
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-error">
            <PhoneOff className="h-5 w-5 text-white" />
          </div>
        </div>
      </div>
      <PhoneHomeBar dark />
    </div>
  )
}

/* Screen 6: Meet Together, All at Once — Group video with John D, Ali... */
function Screen6() {
  return (
    <div className="flex h-full flex-col bg-[#0A1628]">
      <PhoneStatusBar dark />
      {/* Header with name and recording */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <div>
          <span className="text-xs font-semibold text-white">John D, Ali...</span>
          <div className="mt-0.5 flex items-center gap-1">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-brand-error"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="font-mono text-[9px] text-white/40">00:48</span>
          </div>
        </div>
        <Users className="h-4 w-4 text-white/50" />
      </div>
      {/* 4 participant video tiles */}
      <div className="grid flex-1 grid-cols-2 gap-1.5 p-2">
        {meetParticipants.map((p) => (
          <div key={p.name} className="relative flex flex-col items-center justify-center rounded-xl bg-white/5">
            <Av initials={p.initials} size={12} dark />
            <p className="mt-1.5 text-[10px] font-medium text-white/70">{p.name}</p>
            {p.muted && (
              <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-error/80">
                <MicOff className="h-2.5 w-2.5 text-white" />
              </span>
            )}
          </div>
        ))}
      </div>
      {/* Bottom controls: camera, share, video, cast, end */}
      <div className="flex items-center justify-center gap-3 border-t border-white/10 px-4 py-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10"><Video className="h-3.5 w-3.5 text-white/70" /></div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10"><Send className="h-3.5 w-3.5 text-white/70" /></div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10"><Mic className="h-3.5 w-3.5 text-white/70" /></div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-error"><PhoneOff className="h-4 w-4 text-white" /></div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10"><MoreVertical className="h-3.5 w-3.5 text-white/70" /></div>
      </div>
      <PhoneHomeBar dark />
    </div>
  )
}

/* Screen 7: Everything, Saved for Later — Overview with tabs */
function Screen7() {
  return (
    <div className="flex h-full flex-col bg-white">
      <PhoneStatusBar />
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-border px-4 py-2.5">
        <ChevronLeft className="h-4 w-4 text-brand-graphite-mid" />
        <span className="font-heading text-sm font-bold text-brand-graphite">Overview</span>
      </div>
      {/* Tabs: Summary / Recording & Transcript / Parties */}
      <div className="flex border-b border-border">
        {['Summary', 'Recording & Transcript', 'Parties'].map((tab, i) => (
          <span
            key={tab}
            className={`flex-1 py-2 text-center text-[9px] font-medium ${i === 1 ? 'border-b-2 border-brand-blue text-brand-blue' : 'text-brand-graphite-mid'}`}
          >
            {tab}
          </span>
        ))}
      </div>
      {/* Video player area */}
      <div className="mx-4 mt-3 overflow-hidden rounded-xl bg-[#0A1628]">
        <div className="relative flex h-36 items-center justify-center">
          {/* Play button overlay */}
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <span className="ml-0.5 text-lg text-white">&#9654;</span>
          </div>
          {/* Duration badge */}
          <span className="absolute bottom-2 right-2 rounded bg-black/50 px-1.5 py-0.5 text-[8px] text-white/80">12:34</span>
        </div>
      </div>
      {/* Playback controls */}
      <div className="mt-2 px-4">
        {/* Progress bar */}
        <div className="h-1 w-full rounded-full bg-brand-graphite-light/20">
          <div className="h-1 w-[35%] rounded-full bg-brand-blue" />
        </div>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-[8px] text-brand-graphite-mid">4:21</span>
          <span className="text-[8px] text-brand-graphite-mid">12:34</span>
        </div>
      </div>
      {/* Transcript preview */}
      <div className="flex-1 overflow-hidden px-4 pt-3">
        <p className="mb-2 text-[10px] font-semibold text-brand-graphite">Transcript</p>
        <div className="space-y-2">
          <div>
            <p className="text-[8px] font-semibold text-brand-blue">John D · 0:00</p>
            <p className="text-[10px] leading-snug text-brand-graphite/70">Hey everyone, thanks for joining. Let&apos;s go over the quarterly numbers.</p>
          </div>
          <div>
            <p className="text-[8px] font-semibold text-brand-blue">Alice R · 0:15</p>
            <p className="text-[10px] leading-snug text-brand-graphite/70">Sure, I have the occupancy report ready to share.</p>
          </div>
          <div>
            <p className="text-[8px] font-semibold text-brand-blue">Sarah M · 0:28</p>
            <p className="text-[10px] leading-snug text-brand-graphite/70">Great, I also prepared the maintenance summary...</p>
          </div>
        </div>
      </div>
      <PhoneHomeBar />
    </div>
  )
}

const screenComponents = [Screen1, Screen2, Screen3, Screen4, Screen5, Screen6, Screen7]

/* ═══════════════════════════════════════════ */
/*  3D Carousel                                */
/* ═══════════════════════════════════════════ */
function PhoneCarousel() {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(0)
  const total = screens.length
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: false, margin: '-100px 0px' })

  const go = useCallback((to: number) => {
    setDirection(to > active ? 1 : -1)
    setActive(((to % total) + total) % total)
  }, [active, total])

  const next = useCallback(() => go(active + 1), [active, go])
  const prev = useCallback(() => go(active - 1), [active, go])

  /* Autoplay - pause on hover */
  useEffect(() => {
    if (!inView) return
    autoplayRef.current = setInterval(next, 4000)
    return () => { if (autoplayRef.current) clearInterval(autoplayRef.current) }
  }, [next, inView])

  const pauseAutoplay = () => { if (autoplayRef.current) clearInterval(autoplayRef.current) }
  const resumeAutoplay = () => {
    pauseAutoplay()
    autoplayRef.current = setInterval(next, 4000)
  }

  /* Visible indices: prev, active, next */
  const getVisible = () => {
    const p = ((active - 1) + total) % total
    const n = (active + 1) % total
    return [p, active, n]
  }

  const visible = getVisible()

  /* Position config for the 3 visible phones */
  const positionConfig = (slot: number) => {
    // slot 0 = left, 1 = center, 2 = right
    if (slot === 1) return { x: 0, scale: 1, z: 20, opacity: 1, rotateY: 0 }
    if (slot === 0) return { x: -340, scale: 0.82, z: 0, opacity: 0.6, rotateY: 12 }
    return { x: 340, scale: 0.82, z: 0, opacity: 0.6, rotateY: -12 }
  }

  return (
    <div
      ref={sectionRef}
      className="relative"
      onMouseEnter={pauseAutoplay}
      onMouseLeave={resumeAutoplay}
    >
      {/* Carousel viewport */}
      <div className="relative mx-auto h-[680px] max-w-4xl" style={{ perspective: 1200 }}>
        <AnimatePresence mode="popLayout">
          {visible.map((screenIdx, slot) => {
            const config = positionConfig(slot)
            const screen = screens[screenIdx]
            const ScreenComp = screenComponents[screenIdx]
            const isDark = screenIdx === 4 || screenIdx === 5

            return (
              <motion.div
                key={screenIdx}
                className="absolute left-1/2 top-0 w-[300px] cursor-pointer"
                style={{ transformStyle: 'preserve-3d', zIndex: config.z }}
                initial={{
                  x: direction > 0 ? 480 : -480,
                  scale: 0.7,
                  opacity: 0,
                  rotateY: direction > 0 ? -20 : 20,
                  marginLeft: -150,
                }}
                animate={{
                  x: config.x,
                  scale: config.scale,
                  opacity: config.opacity,
                  rotateY: config.rotateY,
                  marginLeft: -150,
                }}
                exit={{
                  x: direction > 0 ? -480 : 480,
                  scale: 0.7,
                  opacity: 0,
                  rotateY: direction > 0 ? 20 : -20,
                  marginLeft: -150,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
                onClick={() => {
                  if (slot === 0) prev()
                  if (slot === 2) next()
                }}
              >
                {/* Title + description */}
                <motion.div
                  className="mb-4 text-center"
                  animate={{ opacity: slot === 1 ? 1 : 0.4 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-heading text-base font-semibold leading-tight text-brand-graphite md:text-lg">
                    {screen.title}{' '}
                    <span className="text-brand-blue">{screen.highlight}</span>
                  </h3>
                  <p className="mt-1.5 text-xs leading-snug text-brand-graphite-mid md:text-sm">
                    {screen.description}
                  </p>
                </motion.div>

                {/* Phone frame */}
                <motion.div
                  className={`overflow-hidden rounded-[32px] border-2 ${isDark ? 'border-white/10 bg-[#0A1628]' : 'border-border bg-white'}`}
                  animate={{
                    boxShadow: slot === 1
                      ? '0 20px 60px rgba(10,22,40,0.18), 0 8px 20px rgba(10,22,40,0.1)'
                      : '0 4px 16px rgba(10,22,40,0.08)',
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="h-[500px]">
                    <ScreenComp />
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Navigation arrows */}
      <div className="mt-6 flex items-center justify-center gap-6">
        <button
          onClick={() => { pauseAutoplay(); prev(); resumeAutoplay() }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-brand-graphite-mid shadow-sm transition-all hover:border-brand-blue/30 hover:text-brand-blue hover:shadow-md"
          aria-label="Previous screen"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {screens.map((_, i) => (
            <button
              key={i}
              onClick={() => { pauseAutoplay(); go(i); resumeAutoplay() }}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active ? 'w-6 bg-brand-blue' : 'w-2 bg-brand-graphite-light hover:bg-brand-blue/40'
              }`}
              aria-label={`Go to screen ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => { pauseAutoplay(); next(); resumeAutoplay() }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-brand-graphite-mid shadow-sm transition-all hover:border-brand-blue/30 hover:text-brand-blue hover:shadow-md"
          aria-label="Next screen"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════ */
/*  Main export                               */
/* ═══════════════════════════════════════════ */
export function CommunicationsSystem() {
  return (
    <section className="overflow-hidden bg-white py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <motion.p
            variants={revealItem}
            className="text-sm font-heading font-semibold uppercase tracking-wider text-brand-blue"
          >
            Communications Infrastructure
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mt-3 font-display text-4xl font-normal text-brand-graphite md:text-5xl"
          >
            Personal phones, scattered emails, and zero <span className="text-keyword">audit trail</span>
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mx-auto mt-4 max-w-xl text-lg text-brand-graphite/70"
          >
            Every time a tenant texts your personal number or a vendor call goes unlogged, you lose control. Disputes escalate without proof. Boundaries disappear. Revun deploys encrypted messaging, calling, and video with a full audit trail — no personal information shared, every conversation documented and under your control.
          </motion.p>
        </RevealOnScroll>

        {/* 3D Phone Carousel */}
        <div className="mt-16">
          <PhoneCarousel />
        </div>
      </div>

      {/* Individual screenshot showcase */}
      <div className="mx-auto mt-16 max-w-6xl px-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {screens.map((s) => (
            <div key={s.screenshot} className="overflow-hidden rounded-xl border border-border shadow-sm transition-shadow hover:shadow-md">
              <Image
                src={s.screenshot}
                alt={`Revun ${s.title} ${s.highlight}`}
                width={340}
                height={680}
                className="h-auto w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
