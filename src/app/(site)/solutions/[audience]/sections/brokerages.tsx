'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Users, FileText, ShieldCheck, CheckCircle2, Landmark, Clock, TrendingUp, Award } from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

type DealCard = {
  address: string
  price: string
  initials: string
}

type PipelineStage = {
  name: string
  count: string
  tone: string
  deals: DealCard[]
}

const pipelineStages: PipelineStage[] = [
  {
    name: 'Lead',
    count: '12 new',
    tone: 'bg-[#E0ECFD] text-[#176FEB]',
    deals: [
      { address: '412 Queen St W, Toronto', price: '$849K', initials: 'AM' },
      { address: '88 Rainier Ave, Seattle', price: '$712K', initials: 'JP' },
      { address: '1501 Peel, Montreal', price: '$615K', initials: 'SC' },
    ],
  },
  {
    name: 'Showing',
    count: '4 active',
    tone: 'bg-[#FEF3C7] text-[#B45309]',
    deals: [
      { address: '220 Robson St, Vancouver', price: '$1.24M', initials: 'RK' },
      { address: '905 S Lamar, Austin', price: '$689K', initials: 'DL' },
    ],
  },
  {
    name: 'Offer',
    count: '3 open',
    tone: 'bg-[#EDE9FE] text-[#6D28D9]',
    deals: [
      { address: '340 17th Ave SW, Calgary', price: '$925K', initials: 'MT' },
      { address: '77 Brickell Ave, Miami', price: '$1.08M', initials: 'EV' },
    ],
  },
  {
    name: 'Pending',
    count: '2 in escrow',
    tone: 'bg-[#FFE4E6] text-[#BE123C]',
    deals: [
      { address: '56 Yorkville Ave, Toronto', price: '$1.62M', initials: 'HN' },
      { address: '14 Granville, Vancouver', price: '$995K', initials: 'AK' },
    ],
  },
  {
    name: 'Closed',
    count: '48 this QTR',
    tone: 'bg-[#D1FAE5] text-[#047857]',
    deals: [
      { address: '201 Front St E, Toronto', price: '$780K', initials: 'LC' },
      { address: '3100 Burnet Rd, Austin', price: '$540K', initials: 'BW' },
      { address: '900 Ste-Catherine, Montreal', price: '$465K', initials: 'FT' },
    ],
  },
]

const complianceBadges = [
  { label: 'FINTRAC' },
  { label: 'RECO' },
  { label: 'TREC' },
  { label: 'DRE' },
]

const complianceBullets = [
  {
    icon: FileText,
    title: 'Form libraries by province and state',
    body: 'OREA, BCREA, CAR and TREC templates kept current — the right disclosure for the right jurisdiction, every time.',
  },
  {
    icon: Clock,
    title: 'Auto-reminders for signatures',
    body: 'Nudges to buyers, sellers and co-operating agents until every initial and signature lands where it needs to.',
  },
  {
    icon: Landmark,
    title: 'Deadline enforcement',
    body: 'Conditions, deposits and closing dates tracked against the agreement — no more calendar roulette the week before closing.',
  },
  {
    icon: Award,
    title: 'Audit-ready transaction logs',
    body: 'Every document, approval and communication time-stamped so a FINTRAC or state audit is a two-minute export.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

function renderHeading(parts: Array<string | { italic: string }>) {
  return parts.map((part, i) =>
    typeof part === 'string' ? (
      <span key={i}>{part}</span>
    ) : (
      <span key={i} className="italic text-[#176FEB]">
        {part.italic}
      </span>
    ),
  )
}

export function BrokeragesSections() {
  return (
    <>
      {/* SECTION 1 — Deal Pipeline */}
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll>
            <motion.div variants={containerVariants} className="mx-auto max-w-3xl text-center">
              <motion.div variants={revealItem} className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-[#F5F6F8] px-3 py-1 text-xs font-medium tracking-wide text-[#475569]">
                <TrendingUp className="h-3.5 w-3.5 text-[#176FEB]" />
                Deal Pipeline
              </motion.div>
              <motion.h2
                variants={revealItem}
                className="text-3xl font-semibold tracking-tight text-[#0A1628] md:text-4xl"
              >
                {renderHeading([
                  'Your agents stop ',
                  { italic: 'drowning in admin' },
                ])}
              </motion.h2>
              <motion.p variants={revealItem} className="mt-4 text-base leading-relaxed text-[#475569] md:text-lg">
                One pipeline for listings, offers and compliance. Leads move from first showing to closed file
                without bouncing between a CRM, a transaction platform and three group chats.
              </motion.p>
            </motion.div>
          </RevealOnScroll>

          <RevealOnScroll>
            <motion.div
              variants={containerVariants}
              className="mt-12 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-[#F5F6F8] p-4 md:p-6"
            >
              <motion.div variants={revealItem} className="mb-4 flex items-center justify-between px-1">
                <div className="flex items-center gap-2 text-sm font-medium text-[#0A1628]">
                  <Users className="h-4 w-4 text-[#176FEB]" />
                  Spring 2026 pipeline
                </div>
                <div className="hidden text-xs text-[#64748B] md:block">Updated live across the brokerage</div>
              </motion.div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {pipelineStages.map((stage) => (
                  <motion.div
                    key={stage.name}
                    variants={revealItem}
                    className="flex flex-col rounded-xl border border-[#E5E7EB] bg-white p-3"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#0A1628]">{stage.name}</span>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${stage.tone}`}>
                        {stage.count}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      {stage.deals.map((deal) => (
                        <div
                          key={deal.address}
                          className="rounded-lg border border-[#E5E7EB] bg-[#F5F6F8] p-2.5"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="truncate text-[11px] font-medium text-[#0A1628]">{deal.address}</p>
                              <p className="mt-0.5 text-[11px] text-[#475569]">{deal.price}</p>
                            </div>
                            <div className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[#E0ECFD] text-[9px] font-semibold text-[#176FEB]">
                              {deal.initials}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                variants={revealItem}
                className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-xs text-[#475569]"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#047857]" />
                  <span>
                    <span className="font-semibold text-[#0A1628]">48 closed</span> this quarter, zero re-keyed
                    into the transaction system
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#176FEB]" />
                  <span>Avg. file close time down <span className="font-semibold text-[#0A1628]">38%</span></span>
                </div>
              </motion.div>
            </motion.div>
          </RevealOnScroll>
        </div>
      </section>

      {/* SECTION 2 — Compliance */}
      <section className="bg-[#F5F6F8] py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <RevealOnScroll>
              <motion.div variants={containerVariants}>
                <motion.div
                  variants={revealItem}
                  className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=85"
                    alt="Real estate agent reviewing a signed offer package and compliance documents"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 520px, 100vw"
                  />
                </motion.div>
              </motion.div>
            </RevealOnScroll>

            <RevealOnScroll>
              <motion.div variants={containerVariants}>
                <motion.div
                  variants={revealItem}
                  className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-xs font-medium tracking-wide text-[#475569]"
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-[#047857]" />
                  Compliance
                </motion.div>

                <motion.h2
                  variants={revealItem}
                  className="text-3xl font-semibold tracking-tight text-[#0A1628] md:text-4xl"
                >
                  {renderHeading([
                    'FINTRAC, RECO, ',
                    { italic: 'state licensing' },
                    ' — handled',
                  ])}
                </motion.h2>

                <motion.p variants={revealItem} className="mt-4 text-base leading-relaxed text-[#475569]">
                  Compliance templates live inside every deal — not in a shared drive your managing broker has to
                  chase. The platform pulls the right forms for the right jurisdiction, tracks conditions and
                  deadlines, and keeps a signed audit trail of every step.
                </motion.p>

                <motion.div variants={revealItem} className="mt-6 flex flex-wrap gap-2">
                  {complianceBadges.map((badge) => (
                    <span
                      key={badge.label}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-xs font-medium text-[#0A1628]"
                    >
                      <ShieldCheck className="h-3.5 w-3.5 text-[#047857]" />
                      {badge.label}
                    </span>
                  ))}
                </motion.div>

                <motion.ul variants={containerVariants} className="mt-8 space-y-5">
                  {complianceBullets.map((bullet) => {
                    const Icon = bullet.icon
                    return (
                      <motion.li key={bullet.title} variants={revealItem} className="flex gap-3">
                        <div className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-lg border border-[#E5E7EB] bg-white">
                          <Icon className="h-4 w-4 text-[#176FEB]" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#0A1628]">{bullet.title}</p>
                          <p className="mt-1 text-sm leading-relaxed text-[#475569]">{bullet.body}</p>
                        </div>
                      </motion.li>
                    )
                  })}
                </motion.ul>
              </motion.div>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </>
  )
}
