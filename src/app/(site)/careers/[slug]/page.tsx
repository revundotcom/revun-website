import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, MapPin, Briefcase, CheckCircle2 } from 'lucide-react'
import { getJob, jobSlugs } from '../jobs'
import ApplyForm from '../ApplyForm'

export function generateStaticParams() {
  return jobSlugs()
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const job = getJob(slug)
  if (!job) return { title: 'Careers at Revun' }
  return {
    title: `${job.title} | Careers at Revun`,
    description: job.summary.slice(0, 155),
    alternates: { canonical: `/careers/${job.slug}` },
  }
}

export default async function RolePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const job = getJob(slug)
  if (!job) notFound()

  return (
    <>
      {/* Hero */}
      <section className="bg-[#0A1628] text-white py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <Link href="/careers" className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60 hover:text-white transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" /> All open roles
          </Link>
          <h1 className="mt-6 text-4xl md:text-5xl font-semibold text-white text-balance leading-tight">{job.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/80">
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{job.location}</span>
            <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" />{job.type}</span>
            <span className="font-semibold text-[#176FEB]">{job.compensation}</span>
          </div>
        </div>
      </section>

      {/* Body + apply */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="text-base leading-relaxed text-[#555860]">{job.summary}</p>
            <h2 className="mt-10 text-2xl font-semibold text-[#0A1628]">What you bring</h2>
            <ul className="mt-4 space-y-3">
              {job.requirements.map((r) => (
                <li key={r} className="flex items-start gap-3 text-sm text-[#555860]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-[#176FEB]" /> {r}
                </li>
              ))}
            </ul>
          </div>

          <aside className="h-fit rounded-2xl border border-[#E5E7EB] bg-white p-7 shadow-sm lg:sticky lg:top-28">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#176FEB]">Apply now</p>
            <h2 className="mt-1 text-xl font-semibold text-[#0A1628]">Apply for {job.title}</h2>
            <p className="mt-2 text-sm text-[#555860]">We review every application within 5 business days.</p>
            <div className="mt-6">
              <ApplyForm role={job.title} />
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
