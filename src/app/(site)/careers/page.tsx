import Link from 'next/link'
import { ArrowRight, MapPin, Briefcase } from 'lucide-react'
import { WHY_JOIN } from './jobs'
import { fetchRolesFromApi } from '@/data/careers'
import JobFilterList from './job-filter-list'
import JobFilterControls from './job-filter-controls'
import { CareersFilterProvider } from './careers-filter-context'

export const dynamic = "force-dynamic"
export const metadata = {
  title: 'Careers at Revun',
  description: 'Join Revun. We are hiring engineers, designers, and operators to build the infrastructure layer for property management across North America.',
  alternates: { canonical: '/careers' },
}

export default async function CareersPage() {
  const allRoles = await fetchRolesFromApi()
  const totalRoles = allRoles.length

  return (
    <CareersFilterProvider allRoles={allRoles}>
      {/* Hero */}
      <section className="bg-[#0A1628] text-white py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#176FEB] mb-4">Careers</p>
          <h1 className="text-4xl md:text-5xl font-semibold text-white text-balance leading-tight">
            Build the infrastructure layer for property management.
          </h1>
          <p className="mt-6 text-lg text-white/75 max-w-2xl">
            Revun is a property management platform for landlords, property managers, and tenants across North America. We are building a team of engineers, designers, and operators who care about craft and want to ship software that actually works.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#positions" className="inline-flex items-center gap-2 bg-[#176FEB] text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-[#0B5AD4] transition-colors">
              See open roles <ArrowRight className="h-4 w-4" />
            </a>
            <a href="mailto:careers@revun.com" className="inline-flex items-center gap-2 border border-white/20 text-white px-6 py-3 rounded-lg font-semibold text-sm hover:border-white/40 transition-colors">
              General application
            </a>
          </div>
        </div>
      </section>

      {/* Top Filter Bar */}
      <section className="bg-slate-50 border-b border-slate-200 py-6">
        <div className="mx-auto max-w-5xl px-6">
          <JobFilterControls scrollToId="positions" />
        </div>
      </section>

      {/* Why join */}
      <section className="py-16 bg-[#F5F6F8]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#176FEB] mb-2">Why Revun</p>
            <h2 className="text-3xl font-semibold text-[#0A1628]">A product-focused team shipping real software.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WHY_JOIN.map(({ Icon, title, body }) => (
              <div key={title} className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-sm">
                <Icon className="h-5 w-5 text-[#176FEB] mb-4" strokeWidth={1.5} />
                <h3 className="text-base font-semibold text-[#2C2E33] mb-1.5">{title}</h3>
                <p className="text-sm text-[#555860] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job listings */}
      <section id="positions" className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#176FEB] mb-2">Open positions</p>
            <h2 className="text-3xl font-semibold text-[#0A1628]">{totalRoles} roles open right now.</h2>
            <p className="mt-3 text-base text-[#555860] max-w-xl">Click a role to see the full details and apply.</p>
          </div>
          <div className="mb-8 block">
            <JobFilterControls scrollToId="positions" />
          </div>
          <JobFilterList />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0A1628] text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-white mb-4">No role that fits?</h2>
          <p className="text-white/75 text-base mb-8">We keep a file of strong candidates. Email us at{' '}
            <a href="mailto:careers@revun.com" className="text-[#176FEB] underline">careers@revun.com</a>
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-[#176FEB] text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-[#0B5AD4] transition-colors">
            Get in touch <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </CareersFilterProvider>
  )
}
