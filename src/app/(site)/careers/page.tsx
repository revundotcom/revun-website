import Link from 'next/link'
import { ArrowRight, MapPin, Briefcase } from 'lucide-react'
import { JOBS, WHY_JOIN } from './jobs'

export const metadata = {
  title: 'Careers at Revun',
  description: 'Join Revun. We are hiring engineers, designers, and operators to build the infrastructure layer for property management across North America.',
  alternates: { canonical: '/careers' },
}

export default function CareersPage() {
  return (
    <>
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
            <h2 className="text-3xl font-semibold text-[#0A1628]">{JOBS.length} roles open right now.</h2>
            <p className="mt-3 text-base text-[#555860] max-w-xl">Click a role to see the full details and apply.</p>
          </div>
          <div className="space-y-4">
            {JOBS.map((job) => (
              <Link key={job.slug} href={`/careers/${job.slug}`} className="group block rounded-xl border border-[#E5E7EB] bg-white p-6 md:p-8 shadow-sm hover:border-[#176FEB]/30 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-[#0A1628] group-hover:text-[#176FEB] transition-colors">{job.title}</h3>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-[#555860] uppercase tracking-wide">
                      <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{job.location}</span>
                      <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" />{job.type}</span>
                      <span className="text-[#176FEB] font-bold">{job.compensation}</span>
                    </div>
                    <p className="mt-4 text-sm text-[#555860] leading-relaxed max-w-2xl">{job.summary}</p>
                  </div>
                  <div className="sm:ml-6 flex-none">
                    <span className="inline-flex items-center gap-2 bg-[#176FEB] text-white px-5 py-2.5 rounded-lg text-sm font-semibold group-hover:bg-[#0B5AD4] transition-colors whitespace-nowrap">
                      View role <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
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
    </>
  )
}
