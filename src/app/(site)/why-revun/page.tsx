import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Building2,
  User,
  Layers,
  ArrowRight,
  Shield,
  CreditCard,
  Wrench,
  FileText,
  BarChart3,
  MessageSquare,
  Users,
  Landmark,
  Home,
  TrendingUp,
} from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema, buildOrganizationSchema, buildWebPageSchema } from '@/lib/schema-builders'

export const metadata: Metadata = {
  title: 'Why Revun | The Infrastructure Layer for Property Operations',
  description:
    'Revun exists because property businesses should not need five to ten disconnected systems to run one portfolio. One platform for leasing, payments, maintenance, screening, compliance, and reporting.',
  alternates: { canonical: buildCanonicalUrl('/why-revun') },
  openGraph: {
    title: 'Why Revun | The Infrastructure Layer for Property Operations',
    description:
      'Revun exists because property businesses should not need five to ten disconnected systems to run one portfolio.',
    url: buildCanonicalUrl('/why-revun'),
  },
}

/* -- Data ------------------------------------------------------------------ */

const audiences = [
  { title: 'Property Management Companies', description: 'Full-service PMCs that need infrastructure, not another app to babysit.', icon: Building2 },
  { title: 'Real Estate Brokerages', description: 'Brokerages adding PM services without bolting on five separate tools.', icon: Landmark },
  { title: 'Leasing Agents', description: 'Agents who need listings, showings, and applications in one workflow.', icon: Users },
  { title: 'Maintenance Companies', description: 'Service providers running work orders, dispatch, and vendor coordination from one system.', icon: Wrench },
  { title: 'Self-Managing Owners', description: 'Individual landlords who refuse to manage properties from a spreadsheet.', icon: Home },
  { title: 'REITs & Institutional', description: 'Large portfolios that demand institutional-grade tooling without institutional-grade complexity.', icon: TrendingUp },
]

const capabilities = [
  { title: 'Leasing & Applications', icon: FileText },
  { title: 'Rent Collection', icon: CreditCard },
  { title: 'Maintenance Management', icon: Wrench },
  { title: 'Tenant Screening', icon: Shield },
  { title: 'Financial Reporting', icon: BarChart3 },
  { title: 'Communications', icon: MessageSquare },
]

/* -- Page ------------------------------------------------------------------ */

export default function WhyRevunPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Why Revun', url: 'https://revun.com/why-revun/' },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(buildOrganizationSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildWebPageSchema({
              name: 'Why Revun',
              description: 'Revun exists because property businesses should not need five to ten disconnected systems to run one portfolio.',
              url: 'https://revun.com/why-revun/',
            })
          ),
        }}
      />

      {/* -- Hero -- */}
      <section className="bg-[#F5F6F8]">
        <div className="mx-auto max-w-4xl px-6 pt-24 pb-16 text-center">
          <RevealOnScroll>
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-[#176FEB]">
              The Problem We Solve
            </p>
            <h1 className="font-display font-extrabold text-4xl leading-[1.1] tracking-tight text-[#0A1628] sm:text-5xl lg:text-6xl">
              Why{' '}
              <span className="text-[#176FEB]">Revun</span>{' '}
              exists
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#555860]">
              Revun exists because property businesses should not need five to ten disconnected systems to run one portfolio. One platform replaces them all: leasing, payments, maintenance, screening, compliance, and reporting &mdash; connected, not stitched together.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* -- Operator vs Platform -- */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll className="rounded-2xl border border-[#176FEB]/20 bg-[#E8F2FE]/40 p-8 md:p-10">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              Platform, Not Product
            </p>
            <h2 className="font-heading text-2xl font-bold tracking-tight text-[#2C2E33] md:text-3xl">
              The operator runs the business.{' '}
              <span className="text-[#176FEB]">Revun</span> runs the infrastructure.
            </h2>
            <p className="mt-4 text-[0.938rem] leading-relaxed text-[#555860]">
              Revun is the software platform and infrastructure layer behind modern property operations. Property managers, leasing teams, brokerages, maintenance operators, and other real estate companies may use Revun to power workflows, communication, transparency, and user portals. Revun provides the platform. The operating company provides the service.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* -- What Revun Is -- */}
      <section className="bg-[#F5F6F8] py-12">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              The Platform
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] md:text-4xl">
              One infrastructure layer for{' '}
              <span className="text-[#176FEB]">everything</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[#555860]">
              Property operations do not fail because of bad people. They fail because of bad plumbing &mdash; disconnected tools, duplicated data, and manual hand-offs that break at scale. Revun replaces the plumbing.
            </p>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.08}>
            <div className="grid gap-5 md:grid-cols-3">
              {[
                {
                  title: 'Single Source of Truth',
                  description: 'Every property, tenant, owner, vendor, and transaction lives in one connected data model. No spreadsheets. No reconciliation. No excuses.',
                  icon: Layers,
                },
                {
                  title: 'Canadian-Native Infrastructure',
                  description: 'Built from day one for Canadian compliance, provincial regulations, Interac payments, and local market requirements. Not a US product with a flag swap.',
                  icon: Shield,
                },
                {
                  title: 'Two Paths, One Platform',
                  description: 'B2B operators deploy Revun as their technology stack. B2C owners use it directly to self-manage. Same infrastructure, different entry points.',
                  icon: Users,
                },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-[#D3D5DB] bg-white p-8 transition hover:border-[#176FEB]/40"
                  >
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F2FE]">
                      <Icon className="h-6 w-6 text-[#176FEB]" />
                    </div>
                    <h3 className="mb-2 font-heading text-lg font-bold text-[#2C2E33]">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#555860]">
                      {item.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* -- Who It's For -- */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              Who It Serves
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] md:text-4xl">
              Built for every{' '}
              <span className="text-[#176FEB]">operator</span> in property management
            </h2>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.06}>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {audiences.map((aud) => {
                const Icon = aud.icon
                return (
                  <div
                    key={aud.title}
                    className="rounded-2xl border border-[#D3D5DB] bg-[#F5F6F8] p-8"
                  >
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F2FE]">
                      <Icon className="h-6 w-6 text-[#176FEB]" />
                    </div>
                    <h3 className="mb-2 font-heading text-lg font-bold text-[#2C2E33]">
                      {aud.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#555860]">
                      {aud.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* -- How It Works (Two Paths) -- */}
      <section className="bg-[#F5F6F8] py-12">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              Two Paths
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] md:text-4xl">
              How <span className="text-[#176FEB]">Revun</span> works
            </h2>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.12}>
            <div className="grid gap-6 md:grid-cols-2">
              {/* B2B Path */}
              <div className="rounded-2xl border border-[#D3D5DB] bg-white p-8 text-[#0A1628]">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#176FEB]/10">
                  <Building2 className="h-6 w-6 text-[#176FEB]" strokeWidth={1.8} />
                </div>
                <h3 className="font-heading text-xl font-bold">
                  For Operators (B2B)
                </h3>
                <p className="mt-3 text-[0.938rem] leading-relaxed text-[#555860]">
                  Property management companies, brokerages, and maintenance companies deploy Revun as their entire technology stack. They become &ldquo;Powered by Revun&rdquo; operators &mdash; running their business on one system while their clients see only their brand.
                </p>
                <ul className="mt-5 space-y-2.5">
                  {['White-label portal under your brand', 'Full operations suite from day one', 'Client, vendor, and owner management', 'Revenue and reporting dashboard'].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[#555860]">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#176FEB]" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/demo/"
                  className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#176FEB] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#1461d0]"
                >
                  Book a Demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* B2C Path */}
              <div className="rounded-2xl border border-[#D3D5DB] bg-white p-8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F2FE]">
                  <User className="h-6 w-6 text-[#176FEB]" strokeWidth={1.8} />
                </div>
                <h3 className="font-heading text-xl font-bold text-[#2C2E33]">
                  For Self-Managing Owners (B2C)
                </h3>
                <p className="mt-3 text-[0.938rem] leading-relaxed text-[#555860]">
                  Individual property owners sign up directly on Revun to manage their own properties. Same powerful infrastructure, configured for owners who want professional-grade tools without hiring a property manager.
                </p>
                <ul className="mt-5 space-y-2.5">
                  {['Free plan for 1-2 units', 'Tenant screening and leases', 'Rent collection with guarantee', 'Maintenance tracking'].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[#555860]">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#176FEB]" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/self-manage/how-it-works/"
                  className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#176FEB] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#1461d0]"
                >
                  Start Self-Managing
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* -- Powered by Revun Concept -- */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll className="text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              Powered by Revun
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] md:text-4xl">
              The <span className="text-[#176FEB]">infrastructure</span> behind the brand
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[#555860]">
              When a property management company is &ldquo;Powered by Revun,&rdquo; it means Revun is their operating system. Their tenants, owners, and vendors interact with the operator&apos;s brand. Revun provides the technology infrastructure that makes it all work.
            </p>
            <div className="mt-8">
              <Link
                href="/powered-by-revun/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#176FEB] transition-colors hover:text-[#1259c1]"
              >
                Learn more about Powered by Revun
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* -- Key Capabilities -- */}
      <section className="bg-[#F5F6F8] py-12">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              Capabilities
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] md:text-4xl">
              Everything in <span className="text-[#176FEB]">one platform</span>
            </h2>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.06}>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((cap) => {
                const Icon = cap.icon
                return (
                  <div
                    key={cap.title}
                    className="flex items-center gap-4 rounded-2xl border border-[#D3D5DB] bg-white p-6 transition hover:border-[#176FEB]/40"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8F2FE]">
                      <Icon className="h-5 w-5 text-[#176FEB]" />
                    </div>
                    <span className="font-heading text-base font-bold text-[#2C2E33]">
                      {cap.title}
                    </span>
                  </div>
                )
              })}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/platform/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#176FEB] transition-colors hover:text-[#1259c1]"
              >
                Explore the full platform
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* -- CTA Cluster -- */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <h2 className="font-heading font-extrabold text-4xl tracking-tight text-[#0A1628] md:text-5xl">
              Ready to run on{' '}
              <span className="text-[#176FEB]">Revun?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-[#555860]">
              Whether you are an operator looking for infrastructure or an owner ready to self-manage, Revun has a path for you.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/demo/"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-[#176FEB] px-8 text-base font-semibold text-white transition-colors hover:bg-[#1259c1]"
              >
                Book a Demo (B2B)
              </Link>
              <Link
                href="/signup/"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E5E7EB] px-8 text-base font-semibold text-[#0A1628] transition-colors hover:bg-[#F5F6F8]"
              >
                Start Self-Managing (B2C)
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* AEO quick answer */}
      <p className="sr-only">
        Revun is the software platform and infrastructure layer behind modern property operations. It exists because property businesses should not need five to ten disconnected systems to run one portfolio. Property managers, leasing teams, brokerages, maintenance operators, and other real estate companies use Revun to power workflows, communication, transparency, and user portals. Revun provides the platform. The operating company provides the service. Revun works two ways: B2B operators deploy it as their technology stack and become Powered by Revun companies, while B2C owners sign up directly to self-manage their properties. Key capabilities include leasing, rent collection, maintenance management, tenant screening, financial reporting, and communications.
      </p>
    </>
  )
}
