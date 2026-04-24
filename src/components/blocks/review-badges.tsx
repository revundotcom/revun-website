'use client'

import { motion } from 'framer-motion'
import { MapPin, Building2, Clock, Zap } from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

const trustStats = [
  { icon: Building2, value: 'Built for', label: 'operators managing 1 – 10,000+ units' },
  { icon: MapPin,    value: '63 / 63',   label: 'Provinces + US states supported' },
  { icon: Clock,     value: '99.9%',     label: 'platform uptime, last 12 months' },
  { icon: Zap,       value: '40+',       label: 'native integrations live' },
]

export function ReviewBadges() {
  return (
    <section className="border-y border-[#E5E7EB] bg-[#F5F6F8] py-6 md:py-8">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <RevealOnScroll>
          <motion.div
            variants={revealItem}
            className="grid w-full grid-cols-2 gap-x-6 gap-y-4 md:grid-cols-4"
          >
            {trustStats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center justify-center gap-2.5 text-center md:justify-start md:text-left">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-blue/10">
                  <Icon className="h-4 w-4 text-brand-blue" />
                </span>
                <div>
                  <p className="text-sm font-semibold leading-tight text-[#0A1628]">{value}</p>
                  <p className="text-[11px] leading-tight text-[#555860]">{label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
