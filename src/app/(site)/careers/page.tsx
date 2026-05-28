'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, MapPin, Briefcase, CheckCircle2, Code2, Layers, Users, Cpu } from 'lucide-react'

interface ModalProps {
  role: string
  onClose: () => void
}

function ApplyModal({ role, onClose }: ModalProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    const fd = new FormData(e.currentTarget)
    const payload = {
      role,
      firstName: fd.get('firstName'),
      lastName: fd.get('lastName'),
      email: fd.get('email'),
      phone: fd.get('phone'),
      linkedin: fd.get('linkedin'),
      resumeUrl: fd.get('resumeUrl'),
      whyYou: fd.get('whyYou'),
      referral: fd.get('referral'),
    }
    try {
      const res = await fetch('/api/careers-apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        setStatus('success')
      } else {
        const data = await res.json()
        setErrorMsg(data.error || 'Something went wrong.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A1628]/70 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl ring-1 ring-[#E5E7EB]">
        <div className="sticky top-0 flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB] bg-white rounded-t-2xl z-10">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#176FEB]">Apply Now</p>
            <h2 className="mt-0.5 text-[18px] font-semibold text-[#0A1628]">{role}</h2>
          </div>
          <button onClick={onClose} className="text-[#555860] hover:text-[#0A1628] p-1 transition-colors" aria-label="Close">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        {status === 'success' ? (
          <div className="flex flex-col items-center justify-center gap-4 p-10 text-center">
            <CheckCircle2 className="h-12 w-12 text-[#176FEB]" />
            <h3 className="text-xl font-semibold text-[#0A1628]">Application received</h3>
            <p className="text-[#555860] text-sm max-w-sm">Thank you for applying to the {role} position at Revun. Our team will review your application within 5 business days.</p>
            <button onClick={onClose} className="mt-2 px-6 py-3 bg-[#176FEB] text-white rounded-lg text-sm font-semibold hover:bg-[#0B5AD4] transition-colors">Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="block text-xs font-semibold text-[#555860] mb-1.5">First Name <span className="text-red-500">*</span></label><input name="firstName" required className="w-full border border-[#E5E7EB] rounded-lg bg-[#F5F6F8] px-3 py-2.5 text-sm text-[#2C2E33] focus:outline-none focus:ring-2 focus:ring-[#176FEB]" placeholder="Jane" /></div>
              <div><label className="block text-xs font-semibold text-[#555860] mb-1.5">Last Name <span className="text-red-500">*</span></label><input name="lastName" required className="w-full border border-[#E5E7EB] rounded-lg bg-[#F5F6F8] px-3 py-2.5 text-sm text-[#2C2E33] focus:outline-none focus:ring-2 focus:ring-[#176FEB]" placeholder="Smith" /></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="block text-xs font-semibold text-[#555860] mb-1.5">Email <span className="text-red-500">*</span></label><input name="email" type="email" required className="w-full border border-[#E5E7EB] rounded-lg bg-[#F5F6F8] px-3 py-2.5 text-sm text-[#2C2E33] focus:outline-none focus:ring-2 focus:ring-[#176FEB]" placeholder="you@email.com" /></div>
              <div><label className="block text-xs font-semibold text-[#555860] mb-1.5">Phone</label><input name="phone" type="tel" className="w-full border border-[#E5E7EB] rounded-lg bg-[#F5F6F8] px-3 py-2.5 text-sm text-[#2C2E33] focus:outline-none focus:ring-2 focus:ring-[#176FEB]" placeholder="+1 416 555 0100" /></div>
            </div>
            <div><label className="block text-xs font-semibold text-[#555860] mb-1.5">LinkedIn Profile URL</label><input name="linkedin" type="url" className="w-full border border-[#E5E7EB] rounded-lg bg-[#F5F6F8] px-3 py-2.5 text-sm text-[#2C2E33] focus:outline-none focus:ring-2 focus:ring-[#176FEB]" placeholder="https://linkedin.com/in/yourprofile" /></div>
            <div><label className="block text-xs font-semibold text-[#555860] mb-1.5">Resume / Portfolio URL</label><input name="resumeUrl" type="url" className="w-full border border-[#E5E7EB] rounded-lg bg-[#F5F6F8] px-3 py-2.5 text-sm text-[#2C2E33] focus:outline-none focus:ring-2 focus:ring-[#176FEB]" placeholder="https://github.com/ or drive.google.com/..." /></div>
            <div><label className="block text-xs font-semibold text-[#555860] mb-1.5">Why do you want this role? <span className="text-[#555860]/50 font-normal">(optional)</span></label><textarea name="whyYou" rows={3} className="w-full border border-[#E5E7EB] rounded-lg bg-[#F5F6F8] px-3 py-2.5 text-sm text-[#2C2E33] focus:outline-none focus:ring-2 focus:ring-[#176FEB] resize-none" placeholder="What draws you to this position..." /></div>
            <div><label className="block text-xs font-semibold text-[#555860] mb-1.5">How did you hear about us?</label><select name="referral" className="w-full border border-[#E5E7EB] rounded-lg bg-[#F5F6F8] px-3 py-2.5 text-sm text-[#2C2E33] focus:outline-none focus:ring-2 focus:ring-[#176FEB]"><option value="">Select one</option><option>Google Search</option><option>LinkedIn</option><option>Hacker News</option><option>GitHub</option><option>Referral</option><option>Other</option></select></div>
            {status === 'error' && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{errorMsg}</p>}
            <button type="submit" disabled={status === 'loading'} className="w-full py-3 bg-[#176FEB] text-white rounded-lg text-sm font-semibold hover:bg-[#0B5AD4] transition-colors disabled:opacity-60">
              {status === 'loading' ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

const WHY_JOIN = [
  { Icon: Code2, title: 'Remote-first engineering', body: 'Our engineering team is distributed across North America. We ship fast, review code thoroughly, and trust people to do great work without micromanagement.' },
  { Icon: Layers, title: 'Modern stack, real scale', body: 'Next.js, TypeScript, Postgres, Redis. Infrastructure that handles real property management volumes across thousands of units.' },
  { Icon: Users, title: 'Small team, high impact', body: 'Every engineer, designer, and PM owns a meaningful piece of the product. You are not a ticket-triager; you are a builder.' },
  { Icon: Cpu, title: 'AI-native product development', body: 'We are building AI features into the core of property management. If you want to work on applied AI in a production product, this is the team.' },
]

const JOBS = [
  {
    title: 'Senior Software Engineer',
    location: 'Remote, North America',
    type: 'Full-time',
    summary: 'You will build and own features across the Revun platform, from property listing infrastructure to tenant payment flows and owner reporting dashboards. You work closely with product and design, contribute to architectural decisions, and help establish engineering standards for the team.',
    requirements: ['5 or more years of full-stack engineering experience', 'Proficient in TypeScript, React, and Node.js or equivalent modern stack', 'Experience building and scaling production systems, not just prototypes', 'Strong communication: you write clear technical docs and code reviews'],
    compensation: '$140,000 to $180,000 USD base',
  },
  {
    title: 'Product Designer',
    location: 'Remote, North America',
    type: 'Full-time',
    summary: 'You will own design across the Revun product: landlord dashboards, tenant portals, leasing flows, and mobile experiences. You think in systems, build in Figma, and work closely with engineering to ship high-quality UI. Your standard is Stripe meets real estate software.',
    requirements: ['4 or more years of product design experience, SaaS preferred', 'Strong portfolio showing end-to-end design work, not just visual comps', 'Proficient in Figma, with experience building and maintaining design systems', 'Comfortable doing user research and translating insights into product decisions'],
    compensation: '$110,000 to $145,000 USD base',
  },
  {
    title: 'Customer Success Manager',
    location: 'Toronto, ON or Remote',
    type: 'Full-time',
    summary: 'You will manage a book of Revun accounts: onboarding new property management companies, driving feature adoption, resolving issues, and ensuring customers achieve their desired outcomes. You are the primary relationship owner and an internal advocate for product improvements the customer base needs.',
    requirements: ['3 or more years of customer success or account management experience, SaaS preferred', 'Strong communicator who can translate technical concepts for non-technical customers', 'Experience with property management or real estate software is a real advantage', 'Data-driven: you track and report on your accounts with discipline'],
    compensation: '$75,000 to $100,000 USD base plus variable',
  },
  {
    title: 'Solutions Architect',
    location: 'Remote, North America',
    type: 'Full-time',
    summary: 'You will lead complex technical integrations and enterprise implementations for Revun. That means scoping integration work, designing data migration approaches, building custom API workflows for large customers, and working closely with engineering and sales to close and onboard enterprise accounts.',
    requirements: ['5 or more years of solutions architecture, technical consulting, or integration engineering experience', 'Proficient with REST APIs, webhooks, and integration patterns', 'Experience with property management software or real estate tech is a strong advantage', 'Ability to communicate technical architecture to both engineering teams and non-technical executives'],
    compensation: '$130,000 to $170,000 USD base',
  },
  {
    title: 'Sales Engineer',
    location: 'Toronto, ON or New York, NY',
    type: 'Full-time',
    summary: 'You will work with the sales team on technical evaluations, demos, and POCs for enterprise and mid-market prospects. You own the technical side of the sales process: answering integration questions, running product demonstrations, scoping implementation requirements, and building confidence in Revun before close.',
    requirements: ['3 or more years of sales engineering, pre-sales, or technical account management', 'Ability to demonstrate complex software products to a technical and non-technical audience', 'Comfortable with APIs, data models, and integration discussions at a detailed level', 'Property management software or proptech experience is a meaningful plus'],
    compensation: '$100,000 to $135,000 USD base plus commission',
  },
]

export default function CareersPage() {
  const [activeRole, setActiveRole] = useState<string | null>(null)

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
            <h2 className="text-3xl font-semibold text-[#0A1628]">Five roles open right now.</h2>
          </div>
          <div className="space-y-4">
            {JOBS.map((job) => (
              <div key={job.title} className="rounded-xl border border-[#E5E7EB] bg-white p-6 md:p-8 shadow-sm hover:border-[#176FEB]/30 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-[#0A1628]">{job.title}</h3>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-[#555860] uppercase tracking-wide">
                      <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{job.location}</span>
                      <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" />{job.type}</span>
                      <span className="text-[#176FEB] font-bold">{job.compensation}</span>
                    </div>
                    <p className="mt-4 text-sm text-[#555860] leading-relaxed max-w-2xl">{job.summary}</p>
                    <ul className="mt-4 space-y-1.5">
                      {job.requirements.map((req) => (
                        <li key={req} className="flex items-start gap-2 text-xs text-[#555860]">
                          <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-[#176FEB] flex-none" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="sm:ml-6 flex-none">
                    <button onClick={() => setActiveRole(job.title)} className="inline-flex items-center gap-2 bg-[#176FEB] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#0B5AD4] transition-colors whitespace-nowrap">
                      Apply <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
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

      {activeRole && <ApplyModal role={activeRole} onClose={() => setActiveRole(null)} />}
    </>
  )
}
