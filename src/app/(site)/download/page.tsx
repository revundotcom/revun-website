import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  Smartphone,
  ArrowRight,
  Bell,
  CreditCard,
  Wrench,
  MessageSquare,
  Camera,
  BarChart3,
  FileText,
  Shield,
} from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema, buildWebPageSchema } from '@/lib/schema-builders'
import { SITE_URL } from '@/lib/metadata'
import { OperatorPlatformBlock } from '@/components/blocks/operator-platform-block'

export const metadata: Metadata = {
  title: 'Download Revun | Mobile, Desktop & Web Access',
  description:
    'Access Revun across mobile, desktop, and web. Whether you are on iPhone, Android, tablet, laptop, or desktop, Revun keeps your entire operation connected.',
  alternates: { canonical: buildCanonicalUrl('/download') },
  openGraph: {
    title: 'Download Revun | Mobile, Desktop & Web Access',
    description:
      'Access Revun across mobile, desktop, and web. Owner app, tenant app, field team app, and operator dashboard — all connected.',
    url: buildCanonicalUrl('/download'),
  },
}

/* ── Data ──────────────────────────────────────────────────────────────── */

const mobileFeatures = [
  {
    title: 'Push Notifications',
    description: 'Instant alerts for rent payments, maintenance requests, lease expirations, and tenant messages.',
    icon: Bell,
  },
  {
    title: 'Rent Collection',
    description: 'Track payments in real time. Send reminders, process late fees, and view payment history across mobile, desktop, and web.',
    icon: CreditCard,
  },
  {
    title: 'Maintenance Management',
    description: 'Receive work orders, assign vendors, approve estimates, and track completion from any device.',
    icon: Wrench,
  },
  {
    title: 'Tenant Communication',
    description: 'Message tenants, send notices, and respond to inquiries with full conversation context.',
    icon: MessageSquare,
  },
  {
    title: 'Photo Documentation',
    description: 'Capture move-in/out photos, document maintenance issues, and attach images to work orders.',
    icon: Camera,
  },
  {
    title: 'Financial Overview',
    description: 'View owner statements, P&L summaries, and portfolio performance across mobile, desktop, and web.',
    icon: BarChart3,
  },
  {
    title: 'Lease Management',
    description: 'Review applications, send lease agreements for signature, and track lease status.',
    icon: FileText,
  },
  {
    title: 'Secure Access',
    description: 'Biometric login, bank-level encryption, and role-based permissions protect your data.',
    icon: Shield,
  },
]

/* ── SoftwareApplication schema for mobile app ── */

function buildMobileAppSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Revun Mobile App',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'iOS, Android',
    url: `${SITE_URL}/download/`,
    description:
      'Manage properties across mobile, desktop, and web with the Revun mobile app. Rent collection, maintenance management, tenant communication, and financial reporting from your phone.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CAD',
      description: 'Free to download. Subscription required for premium features.',
    },
    provider: {
      '@type': 'Organization',
      name: 'Revun',
      url: SITE_URL,
    },
    featureList: [
      'Push Notifications',
      'Rent Collection',
      'Maintenance Management',
      'Tenant Communication',
      'Photo Documentation',
      'Financial Overview',
      'Lease Management',
      'Biometric Login',
    ],
  }
}

/* ── Page ──────────────────────────────────────────────────────────────── */

export default function DownloadPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Download', url: 'https://revun.com/download/' },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(buildMobileAppSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildWebPageSchema({
              name: 'Download the Revun App',
              description: 'Download the Revun mobile app for iOS and Android.',
              url: 'https://revun.com/download/',
            })
          ),
        }}
      />

      {/* ── Hero ── */}
      <section className="bg-[#F5F6F8]">
        <div className="mx-auto max-w-4xl px-6 pt-24 pb-16 text-center">
          <RevealOnScroll>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#176FEB]/10">
              <Smartphone className="h-8 w-8 text-[#176FEB]" strokeWidth={1.8} />
            </div>
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-[#176FEB]">
              Mobile App
            </p>
            <h1 className="font-display font-extrabold text-4xl leading-[1.1] tracking-tight text-[#0A1628] sm:text-5xl lg:text-6xl">
              Revun works across{' '}
              <span className="text-[#176FEB]">mobile, desktop, and web</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#555860]">
              Whether you are on iPhone, Android, Samsung, tablet, laptop, or desktop, Revun keeps your entire operation connected.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Download Section ── */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll className="text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              Download
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] md:text-4xl">
              Get the <span className="text-[#176FEB]">app</span>
            </h2>
          </RevealOnScroll>

          <RevealOnScroll className="mt-10 text-center">
            <p className="mx-auto max-w-xl text-[#555860]">
              Mobile access is being rolled out in phases. Join the early access list for iPhone and Android. Access Revun today on desktop and mobile web.
            </p>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.12} className="mt-12">
            <div className="grid gap-6 md:grid-cols-2">
              {/* iOS */}
              <div className="rounded-2xl border border-[#D3D5DB] bg-[#F5F6F8] p-8 text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8F2FE]">
                  <svg className="h-7 w-7 text-[#176FEB]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-bold text-[#2C2E33]">iOS</h3>
                <p className="mt-2 text-sm text-[#555860]">iPhone and iPad</p>
                <Link
                  href="/contact/"
                  className="mt-6 inline-flex h-12 items-center justify-center rounded-xl bg-[#176FEB] px-8 text-base font-semibold text-white transition-colors hover:bg-[#1259c1]"
                >
                  Join Early Access
                </Link>
                <p className="mt-3 text-xs text-[#94A3B8]">iOS 16.0 or later required</p>
              </div>

              {/* Android */}
              <div className="rounded-2xl border border-[#D3D5DB] bg-[#F5F6F8] p-8 text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8F2FE]">
                  <svg className="h-7 w-7 text-[#176FEB]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.523 15.341c-.5 0-.91.41-.91.91s.41.91.91.91.91-.41.91-.91-.41-.91-.91-.91m-11.046 0c-.5 0-.91.41-.91.91s.41.91.91.91.91-.41.91-.91-.41-.91-.91-.91m11.4-6.027l1.95-3.37c.11-.19.04-.43-.15-.54-.19-.11-.43-.04-.54.15l-1.97 3.42c-1.47-.67-3.12-1.04-4.87-1.04s-3.4.37-4.87 1.04l-1.97-3.42c-.11-.19-.35-.26-.54-.15-.19.11-.26.35-.15.54l1.95 3.37C3.09 11.16 1.09 14.27 1 17.82h22c-.09-3.55-2.09-6.66-5.12-8.51M7 15.25a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5m10 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-bold text-[#2C2E33]">Android</h3>
                <p className="mt-2 text-sm text-[#555860]">Phone and tablet</p>
                <Link
                  href="/contact/"
                  className="mt-6 inline-flex h-12 items-center justify-center rounded-xl bg-[#176FEB] px-8 text-base font-semibold text-white transition-colors hover:bg-[#1259c1]"
                >
                  Join Early Access
                </Link>
                <p className="mt-3 text-xs text-[#94A3B8]">Android 10 or later required</p>
              </div>
            </div>
          </RevealOnScroll>

          {/* App Types */}
          <RevealOnScroll stagger={0.1} className="mt-12">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: 'Owner app', desc: 'Portfolio overview, financials, and approvals' },
                { label: 'Tenant app', desc: 'Payments, requests, and lease documents' },
                { label: 'Field team app', desc: 'Work orders, inspections, and photo capture' },
                { label: 'Operator dashboard', desc: 'Full operations, reporting, and team management' },
              ].map((app) => (
                <div
                  key={app.label}
                  className="rounded-2xl border border-[#D3D5DB] bg-[#F5F6F8] p-6 text-center"
                >
                  <h3 className="font-heading text-base font-bold text-[#2C2E33]">
                    {app.label}
                  </h3>
                  <p className="mt-2 text-sm text-[#555860]">{app.desc}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── What the App Does ── */}
      <section className="bg-[#F5F6F8] py-12">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              Everything You Need
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] md:text-4xl">
              Your <span className="text-[#176FEB]">full operation</span> across every device
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[#555860]">
              Revun is not a stripped-down companion app. It is the full platform, optimized for every screen. Everything you do on desktop, you can do across mobile and web.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Key Mobile Features ── */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              Key Features
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] md:text-4xl">
              Mobile <span className="text-[#176FEB]">features</span>
            </h2>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.06}>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {mobileFeatures.map((f) => {
                const Icon = f.icon
                return (
                  <div
                    key={f.title}
                    className="rounded-2xl border border-[#D3D5DB] bg-white p-6 transition hover:border-[#176FEB]/40"
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F2FE]">
                      <Icon className="h-5 w-5 text-[#176FEB]" />
                    </div>
                    <h3 className="mb-2 font-heading text-base font-bold text-[#2C2E33]">
                      {f.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#555860]">
                      {f.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── App Screenshots ── */}
      <section className="bg-[#F5F6F8] py-16">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              Screenshots
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] md:text-4xl">
              See it in <span className="text-[#176FEB]">action</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[#555860]">
              Real screens from the Revun app. Every feature designed for property managers who need speed, clarity, and control.
            </p>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.08}>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
              {[
                { src: '/screenshots/app/home-listings.png', label: 'Property Listings', alt: 'Revun app home screen showing property listings' },
                { src: '/screenshots/app/events-scheduled.png', label: 'Events & Tours', alt: 'Revun app events and scheduled tours screen' },
                { src: '/screenshots/app/investment-portfolio.png', label: 'Investment Portfolio', alt: 'Revun app investment portfolio overview' },
                { src: '/screenshots/comms/chats-inbox.png', label: 'Communications', alt: 'Revun app messaging and communications inbox' },
                { src: '/screenshots/app/maintenance-overview.png', label: 'Maintenance', alt: 'Revun app maintenance management overview' },
                { src: '/screenshots/app/financial-overview.png', label: 'Financials', alt: 'Revun app financial overview and reporting' },
              ].map((s) => (
                <div key={s.label} className="group flex flex-col items-center gap-3">
                  <div className="w-full max-w-[200px] transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-[1.03]">
                    <div className="overflow-hidden rounded-[28px] border-2 border-[#1a1a1a] bg-[#1a1a1a] shadow-[0_4px_24px_rgba(0,0,0,0.10)] transition-shadow duration-300 group-hover:shadow-[0_12px_40px_rgba(23,111,235,0.20)]">
                      {/* Dynamic Island only — no status bar (Figma has its own) */}
                      <div className="flex justify-center bg-white pt-1">
                        <div className="h-[14px] w-[60px] rounded-full bg-[#1a1a1a]" />
                      </div>
                      {/* Screenshot — locked 9:16, Figma includes its own status bar */}
                      <div className="relative aspect-[9/16] w-full overflow-hidden">
                        <Image
                          src={s.src}
                          alt={s.alt}
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 640px) 50vw, 200px"
                          quality={95}
                        />
                      </div>
                      {/* Home indicator */}
                      <div className="flex justify-center bg-white py-1.5">
                        <div className="h-[3px] w-16 rounded-full bg-[#1a1a1a]/20" />
                      </div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-[#0A1628] transition-colors duration-200 group-hover:text-[#176FEB]">{s.label}</span>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <OperatorPlatformBlock />

      {/* ── CTA ── */}
      <section className="bg-[#F5F6F8] py-12">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <h2 className="font-heading font-extrabold text-4xl tracking-tight text-[#0A1628] md:text-5xl">
              Access Revun{' '}
              <span className="text-[#176FEB]">today</span>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-[#555860]">
              Start with the desktop and mobile web platform now. Join the early access list to be first in line when native iPhone and Android apps roll out.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/signup/"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-[#176FEB] px-8 text-base font-semibold text-white transition-colors hover:bg-[#1259c1]"
              >
                Start Free on Web
              </Link>
              <Link
                href="/contact/"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E5E7EB] px-8 text-base font-semibold text-[#0A1628] transition-colors hover:bg-white"
              >
                Get Launch Updates
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* AEO quick answer */}
      <p className="sr-only">
        Revun works across mobile, desktop, and web. Mobile access is being rolled out in phases for iPhone and Android. Access Revun today on desktop and mobile web. The platform includes owner app, tenant app, field team app, and operator dashboard for rent collection, maintenance management, tenant communication, photo documentation, financial reporting, and lease management.
      </p>
    </>
  )
}
