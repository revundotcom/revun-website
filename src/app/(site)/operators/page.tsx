import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Wrench,
  UserCog,
  KeyRound,
  ClipboardList,
  Users,
  MessageSquare,
  BarChart3,
  Workflow,
  Shield,
  Eye,
  CheckCircle2,
} from 'lucide-react'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema, buildWebPageSchema } from '@/lib/schema-builders'

export const metadata: Metadata = {
  title: 'Operator Experience | Revun',
  description:
    'Task management, role-based access, team coordination, internal communications, and full operational visibility — all in one system built for property operations teams.',
  alternates: { canonical: buildCanonicalUrl('/operators') },
  openGraph: {
    title: 'Operator Experience | Revun',
    description:
      'The operating system your team actually uses. Task management, role-based access, and operational visibility in one platform.',
    url: buildCanonicalUrl('/operators'),
  },
}

/* ── Data ──────────────────────────────────────────────────────────────── */

const roles = [
  {
    title: 'Maintenance Specialist',
    description:
      'Receive work orders, update progress, upload proof of work, and close tickets. Mobile-first experience built for field teams.',
    icon: Wrench,
  },
  {
    title: 'Account Manager',
    description:
      'Manage tenant relationships, handle renewals, process applications, track arrears, and generate owner reports from one dashboard.',
    icon: UserCog,
  },
  {
    title: 'Leasing Coordinator',
    description:
      'Manage listings, schedule showings, process applications, run screening, and execute leases. Full leasing pipeline visibility.',
    icon: KeyRound,
  },
  {
    title: 'Executive / Owner',
    description:
      'Portfolio-level dashboards, financial summaries, occupancy metrics, and operational KPIs. Full visibility without operational noise.',
    icon: BarChart3,
  },
] as const

const features = [
  {
    title: 'Task Management',
    description:
      'Assign, track, and complete tasks across your team. Priority levels, due dates, dependencies, and automatic escalation rules.',
    icon: ClipboardList,
  },
  {
    title: 'Role-Based Access',
    description:
      'Control exactly what each team member can see and do. Granular permissions by role, property, and function.',
    icon: KeyRound,
  },
  {
    title: 'Team Coordination',
    description:
      'Shared calendars, task assignments, handoff workflows, and team-wide visibility. Everyone knows who is doing what.',
    icon: Users,
  },
  {
    title: 'Internal Communications',
    description:
      'Team messaging, property-specific threads, and contextual notes. Every conversation tied to the right property and task.',
    icon: MessageSquare,
  },
  {
    title: 'Operational Dashboards',
    description:
      'Real-time KPIs for occupancy, arrears, maintenance response times, leasing velocity, and team performance.',
    icon: BarChart3,
  },
  {
    title: 'Workflow Automation',
    description:
      'Automate routine tasks: lease renewal reminders, payment follow-ups, maintenance escalations, and compliance deadlines.',
    icon: Workflow,
  },
] as const

const accountabilityPoints = [
  {
    title: 'Full audit trail',
    description: 'Every action logged with who did what, when, and why. Complete accountability across your entire operation.',
    icon: Eye,
  },
  {
    title: 'Granular permissions',
    description: 'Control access at the role, property, and function level. Team members see only what they need to do their job.',
    icon: Shield,
  },
  {
    title: 'Built-in accountability',
    description: 'Task ownership, completion tracking, SLA monitoring, and performance metrics. No ambiguity about who is responsible.',
    icon: CheckCircle2,
  },
] as const

/* ── Page ──────────────────────────────────────────────────────────────── */

export default function OperatorsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Operators', url: 'https://revun.com/operators/' },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildWebPageSchema({
              name: 'Operator Experience',
              description: 'The operating system your team actually uses.',
              url: 'https://revun.com/operators/',
            })
          ),
        }}
      />

      {/* ── Hero ── */}
      <section className="bg-[#F5F6F8]">
        <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8 pt-24 pb-16 text-center">
          <RevealOnScroll>
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-[#176FEB]">
              Operator Experience
            </p>
            <h1 className="font-display font-extrabold text-3xl leading-[1.1] tracking-tight text-[#0A1628] md:text-5xl lg:text-6xl">
              The operating system your{' '}
              <span className="text-[#176FEB]">team actually uses</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#555860]">
              Task management, role-based access, team coordination, internal communications, and full operational visibility — all in one system.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Every role, one system ── */}
      <section className="bg-white py-12 md:py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              Role-Based Experience
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] md:text-4xl">
              Every role, <span className="text-[#176FEB]">one system</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[#555860]">
              Each team member gets an experience tailored to their role. Same platform, different views, full coordination.
            </p>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.1}>
            <div className="grid gap-6 md:grid-cols-2">
              {roles.map((r) => {
                const Icon = r.icon
                return (
                  <div
                    key={r.title}
                    className="rounded-2xl border border-[#D3D5DB] bg-white p-8 transition hover:border-[#176FEB]/40"
                  >
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F2FE]">
                      <Icon className="h-6 w-6 text-[#176FEB]" />
                    </div>
                    <h3 className="mb-2 font-heading text-lg font-bold text-[#2C2E33]">
                      {r.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#555860]">
                      {r.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Feature Grid ── */}
      <section className="bg-[#F5F6F8] py-12 md:py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              Operational Tools
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] md:text-4xl">
              Tools that <span className="text-[#176FEB]">teams</span> rely on
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[#555860]">
              Six operational modules built for teams that execute. All connected, all configurable, all in one system.
            </p>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.08}>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => {
                const Icon = f.icon
                return (
                  <div
                    key={f.title}
                    className="rounded-2xl border border-[#D3D5DB] bg-white p-8 transition hover:border-[#176FEB]/40"
                  >
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F2FE]">
                      <Icon className="h-6 w-6 text-[#176FEB]" />
                    </div>
                    <h3 className="mb-2 font-heading text-lg font-bold text-[#2C2E33]">
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

      {/* ── Built for teams that execute ── */}
      <section className="bg-white py-12 md:py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-4 md:px-6 lg:px-8">
          <RevealOnScroll className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              Accountability
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] md:text-4xl">
              Built for teams that{' '}
              <span className="text-[#176FEB]">execute</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[#555860]">
              Every action tracked. Every permission controlled. Every team member accountable. No black boxes.
            </p>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.1}>
            <div className="grid gap-6 md:grid-cols-3">
              {accountabilityPoints.map((a) => {
                const Icon = a.icon
                return (
                  <div
                    key={a.title}
                    className="rounded-2xl border border-[#E5E7EB] bg-[#F5F6F8] p-8 hover:border-[#176FEB]/40"
                  >
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F2FE]">
                      <Icon className="h-6 w-6 text-[#176FEB]" />
                    </div>
                    <h3 className="mb-3 font-heading text-lg font-bold text-[#2C2E33]">
                      {a.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#555860]">
                      {a.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#F5F6F8] py-12 md:py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 md:px-6 lg:px-8 text-center">
          <RevealOnScroll>
            <h2 className="font-heading font-extrabold text-3xl tracking-tight text-[#0A1628] md:text-5xl">
              Deploy Revun across your{' '}
              <span className="text-[#176FEB]">team</span>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-[#555860]">
              Give every team member the tools they need to execute. One system, role-based access, full operational visibility.
            </p>
            <div className="mt-10">
              <Link
                href="/demo/"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#176FEB] px-8 text-base font-semibold text-white transition-colors hover:bg-[#1461d0]"
              >
                Book a Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* AEO quick answer */}
      <p className="sr-only">
        Revun provides an operator experience built for property management teams. The platform offers role-based views for maintenance specialists, account managers, leasing coordinators, and executives. Core operational tools include task management, role-based access control, team coordination, internal communications, operational dashboards, and workflow automation. Every action is logged with a full audit trail for complete accountability.
      </p>
    </>
  )
}
