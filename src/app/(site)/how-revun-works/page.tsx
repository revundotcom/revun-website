import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Building2,
  User,
  ArrowRight,
  FileText,
  CreditCard,
  Wrench,
  Shield,
  BarChart3,
  MessageSquare,
  ClipboardCheck,
  Settings,
  Rocket,
  UserPlus,
  Home,
  Layers,
  Puzzle,
} from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import { getIntegrationIcon } from '@/lib/integration-icons'
import { OperatorPlatformBlock } from '@/components/blocks/operator-platform-block'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema, buildHowToSchema, buildWebPageSchema } from '@/lib/schema-builders'

export const metadata: Metadata = {
  title: 'How Revun Gets Deployed | Product Overview',
  description:
    'See how Revun gets deployed for operators and self-managing owners. From onboarding to full-scale operations: leasing, maintenance, payments, compliance, analytics, and integrations.',
  alternates: { canonical: buildCanonicalUrl('/how-revun-works') },
  openGraph: {
    title: 'How Revun Gets Deployed | Product Overview',
    description:
      'Revun can be rolled out as the operating system for your company, or used directly by self-managing owners. One system for the full workflow.',
    url: buildCanonicalUrl('/how-revun-works'),
  },
}

/* ── Data ──────────────────────────────────────────────────────────────── */

const operatorSteps = [
  {
    step: '01',
    title: 'Apply',
    description: 'Submit your operator application. Provide your portfolio size, current tech stack, and operational scope. Our team reviews and responds within 48 hours.',
    icon: ClipboardCheck,
  },
  {
    step: '02',
    title: 'Onboard',
    description: 'Our deployment team migrates your data, configures workflows, and provisions your branded portal. Standard onboarding completes in 1-2 weeks.',
    icon: Settings,
  },
  {
    step: '03',
    title: 'Configure',
    description: 'Configure portal branding, payment workflows, maintenance routing, lease templates, and reporting dashboards to match your operational requirements.',
    icon: Layers,
  },
  {
    step: '04',
    title: 'Launch',
    description: 'Roll out your Powered by Revun operation. Onboard your team, tenants, owners, and vendors. Full-scale operations begin on day one.',
    icon: Rocket,
  },
]

const ownerSteps = [
  {
    step: '01',
    title: 'Register',
    description: 'Create your account in under 2 minutes. No credit card required. Select the Self-Manage deployment path during onboarding.',
    icon: UserPlus,
  },
  {
    step: '02',
    title: 'Configure Property',
    description: 'Enter property details, configure units, set rental rates, and upload photos. Import existing tenant data to accelerate setup.',
    icon: Home,
  },
  {
    step: '03',
    title: 'Operate',
    description: 'List vacancies, screen tenants, generate leases, collect rent, handle maintenance, and track finances. One dashboard, full control.',
    icon: BarChart3,
  },
]

const modules = [
  {
    title: 'Leasing',
    description: 'Listings, showings, screening, applications, offers, and lease execution. From vacancy to signed lease.',
    icon: FileText,
  },
  {
    title: 'Maintenance',
    description: 'Work orders, vendor dispatch, progress tracking, proof of work, and invoice processing.',
    icon: Wrench,
  },
  {
    title: 'Communications',
    description: 'Email, SMS, in-app messaging, and calling. Every conversation in context with the right property and tenant.',
    icon: MessageSquare,
  },
  {
    title: 'Payments',
    description: 'ACH, credit card, Interac, and PAD. Automated reminders, split payments, late fees, and real-time reconciliation.',
    icon: CreditCard,
  },
  {
    title: 'Compliance',
    description: 'Province-specific lease templates, notice generators, regulatory tracking, and tribunal-ready documentation.',
    icon: Shield,
  },
  {
    title: 'Analytics',
    description: 'Owner statements, P&L, cash flow, occupancy rates, maintenance spend, and portfolio performance dashboards.',
    icon: BarChart3,
  },
]

const integrations = [
  'QuickBooks', 'Xero', 'Stripe', 'Plaid', 'Twilio', 'SendGrid',
  'DocuSign', 'Certn', 'Equifax', 'TransUnion', 'Zapier', 'Google Workspace',
]

/* ── Page ──────────────────────────────────────────────────────────────── */

export default function HowRevunWorksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'How Revun Works', url: 'https://revun.com/how-revun-works/' },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildHowToSchema({
              name: 'How to Deploy Revun as an Operator',
              description: 'Deployment steps for property management companies rolling out Revun as their operating system.',
              steps: operatorSteps.map((s) => ({ name: s.title, text: s.description })),
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildHowToSchema({
              name: 'How to Self-Manage Properties with Revun',
              description: 'Deployment steps for property owners to self-manage with Revun.',
              steps: ownerSteps.map((s) => ({ name: s.title, text: s.description })),
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildWebPageSchema({
              name: 'How Revun Works',
              description: 'Product overview and workflow for Revun property operations platform.',
              url: 'https://revun.com/how-revun-works/',
            })
          ),
        }}
      />

      {/* ── Hero ── */}
      <section className="bg-[#F5F6F8]">
        <div className="mx-auto max-w-4xl px-6 pt-24 pb-16 text-center">
          <RevealOnScroll>
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-[#176FEB]">
              Product Overview
            </p>
            <h1 className="font-display font-extrabold text-4xl leading-[1.1] tracking-tight text-[#0A1628] sm:text-5xl lg:text-6xl">
              How Revun gets{' '}
              <span className="text-[#176FEB]">deployed</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#555860]">
              Revun can be rolled out as the operating system for your company, or used directly by self-managing owners. Either way, the result is the same: one system for the full workflow.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── B2B: Operator Path ── */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll className="mb-10 text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#176FEB]/10">
              <Building2 className="h-7 w-7 text-[#176FEB]" strokeWidth={1.8} />
            </div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              For Operators (B2B)
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] md:text-4xl">
              Deploy Revun as your{' '}
              <span className="text-[#176FEB]">technology stack</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[#555860]">
              Property management companies, brokerages, and maintenance companies go through a structured deployment process to roll out Revun as their operating system.
            </p>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.1}>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {operatorSteps.map((s) => {
                const Icon = s.icon
                return (
                  <div
                    key={s.step}
                    className="rounded-2xl border border-[#D3D5DB] bg-white p-8"
                  >
                    <span className="mb-4 block font-mono text-sm font-semibold text-[#176FEB]">
                      Step {s.step}
                    </span>
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F2FE]">
                      <Icon className="h-6 w-6 text-[#176FEB]" />
                    </div>
                    <h3 className="mb-2 font-heading text-lg font-bold text-[#2C2E33]">
                      {s.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#555860]">
                      {s.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── B2C: Self-Manage Path ── */}
      <section className="bg-[#F5F6F8] py-12">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll className="mb-10 text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8F2FE]">
              <User className="h-7 w-7 text-[#176FEB]" strokeWidth={1.8} />
            </div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              For Self-Managing Owners (B2C)
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] md:text-4xl">
              Self-manage in{' '}
              <span className="text-[#176FEB]">three steps</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[#555860]">
              Individual property owners deploy Revun directly and begin operations immediately. No sales call required.
            </p>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.1}>
            <div className="grid gap-8 md:grid-cols-3">
              {ownerSteps.map((s) => {
                const Icon = s.icon
                return (
                  <div
                    key={s.step}
                    className="rounded-2xl border border-[#D3D5DB] bg-white p-8"
                  >
                    <span className="mb-4 block font-mono text-sm font-semibold text-[#176FEB]">
                      Step {s.step}
                    </span>
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F2FE]">
                      <Icon className="h-6 w-6 text-[#176FEB]" />
                    </div>
                    <h3 className="mb-2 font-heading text-lg font-bold text-[#2C2E33]">
                      {s.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#555860]">
                      {s.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Platform Modules ── */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              Platform Modules
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] md:text-4xl">
              Core <span className="text-[#176FEB]">operational modules</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[#555860]">
              Six modules that cover the full property operations workflow. All connected, all configurable, all in one system.
            </p>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.08}>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {modules.map((m) => {
                const Icon = m.icon
                return (
                  <div
                    key={m.title}
                    className="rounded-2xl border border-[#D3D5DB] bg-white p-8 transition hover:border-[#176FEB]/40"
                  >
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F2FE]">
                      <Icon className="h-6 w-6 text-[#176FEB]" />
                    </div>
                    <h3 className="mb-2 font-heading text-lg font-bold text-[#2C2E33]">
                      {m.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#555860]">
                      {m.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Integration Capabilities ── */}
      <section className="bg-[#F5F6F8] py-12">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              Integrations
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] md:text-4xl">
              Plugs into <span className="text-[#176FEB]">40+</span> systems
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[#555860]">
              Revun connects to the accounting, payment, screening, and communication infrastructure your team already relies on.
            </p>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.06}>
            <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {integrations.map((name) => {
                const Logo = getIntegrationIcon(name)
                return (
                  <div
                    key={name}
                    className="flex h-20 flex-col items-center justify-center gap-2 rounded-xl border border-[#D3D5DB] bg-white text-sm font-medium text-[#555860] transition hover:border-[#176FEB]/40 hover:shadow-sm"
                  >
                    <Logo className="h-8 w-8 shrink-0" />
                    <span className="text-xs font-semibold">{name}</span>
                  </div>
                )
              })}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/integrations/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#176FEB] transition-colors hover:text-[#1259c1]"
              >
                View all integrations
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <OperatorPlatformBlock />

      {/* ── CTA Cluster ── */}
      <section className="bg-[#F5F6F8] py-12">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <h2 className="font-heading font-extrabold text-4xl tracking-tight text-[#0A1628] md:text-5xl">
              Ready to{' '}
              <span className="text-[#176FEB]">deploy?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-[#555860]">
              Whether you are an operator rolling out your technology stack or an owner configuring your first property, we are ready when you are.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/demo/"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-[#176FEB] px-8 text-base font-semibold text-white transition-colors hover:bg-[#1259c1]"
              >
                Book a Demo
              </Link>
              <Link
                href="/signup/"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E5E7EB] px-8 text-base font-semibold text-[#0A1628] transition-colors hover:bg-white"
              >
                Start Free
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* AEO quick answer */}
      <p className="sr-only">
        Revun gets deployed two ways. For B2B operators like property management companies and brokerages, the deployment process is: apply, onboard, configure, and roll out. For self-managing owners, the process is: register, configure your property, and begin operations. The platform includes six operational modules: leasing, maintenance, communications, payments, compliance, and analytics. Revun plugs into 40+ systems including QuickBooks, Xero, Stripe, DocuSign, and more.
      </p>
    </>
  )
}
