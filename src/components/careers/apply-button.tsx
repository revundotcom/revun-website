'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

interface Props {
  role: string
  jobId: string
  className?: string
  variant?: 'primary' | 'ghost'
  label?: string
}

export function ApplyButton({
  role,
  jobId,
  className = '',
  variant = 'primary',
  label = 'Apply Now',
}: Props) {
  const [open, setOpen] = useState(false)

  const triggerBase =
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all whitespace-nowrap'
  const triggerVariant =
    variant === 'primary'
      ? 'bg-[var(--brand-blue)] text-white hover:-translate-y-0.5 hover:bg-[var(--brand-blue-dark)]'
      : 'border border-[#D3D5DB] bg-white text-[#0A1628] hover:border-[#555860] hover:bg-[#F5F6F8]'

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`${triggerBase} ${triggerVariant} ${className}`}
      >
        {label}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
      {open && <ApplyModal role={role} jobId={jobId} onClose={() => setOpen(false)} />}
    </>
  )
}

function ApplyModal({
  role,
  jobId,
  onClose,
}: {
  role: string
  jobId: string
  onClose: () => void
}) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  // No mount guard needed: ApplyModal only ever renders after a client-side
  // click (open starts false, so it never renders during SSR), which means
  // document.body is always present when createPortal runs below.

  // Escape closes. Background scroll is intentionally NOT locked — the
  // page must stay scrollable behind the dialog so the candidate can
  // re-read the job description while filling out the form.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    const fd = new FormData(e.currentTarget)
    const payload = {
      role,
      jobId,
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

  return createPortal(
    <>
      {/* Backdrop — visual only. pointer-events-none lets wheel + clicks
          pass through to the page underneath so it stays scrollable. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-40 bg-[#0A1628]/70 backdrop-blur-sm"
      />
      {/* Modal frame — fixed at the TOP of the viewport, not centred.
          pointer-events-none on the wrapper means wheel events on the
          dimmed area fall through to the body; only the white card is
          interactive. */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="apply-modal-title"
        className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-20 sm:pt-24"
      >
        <div className="pointer-events-auto relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
          <div className="flex items-center justify-between rounded-t-2xl border-b border-[#E5E7EB] bg-white px-5 py-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--brand-blue)]">
                Apply Now · {jobId}
              </p>
              <h2 id="apply-modal-title" className="mt-0.5 text-[18px] font-bold text-[#0A1628]">
                {role}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-[#555860] transition-colors hover:text-[#0A1628]"
              aria-label="Close"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center gap-4 p-10 text-center">
              <CheckCircle2 className="h-12 w-12 text-[var(--brand-blue)]" />
              <h3 className="text-xl font-bold text-[#0A1628]">Application received</h3>
              <p className="max-w-sm text-sm text-[#555860]">
                Thank you for applying to the {role} position. We will be in touch within 5 business days.
              </p>
              <button onClick={onClose} className="mt-2 rounded-full bg-[#0A1628] px-6 py-3 text-sm font-semibold text-white">
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 p-5">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field name="firstName" label="First Name" required placeholder="Jane" />
                <Field name="lastName" label="Last Name" required placeholder="Smith" />
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field name="email" type="email" label="Email" required placeholder="you@email.com" />
                <Field name="phone" type="tel" label="Phone" placeholder="+1 416 555 0100" />
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field name="linkedin" type="url" label="LinkedIn URL" placeholder="linkedin.com/in/yourprofile" />
                <Field name="resumeUrl" type="url" label="Resume URL" placeholder="Google Drive, Dropbox, etc." />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-[#555860]">
                  Why do you want this role? <span className="font-normal text-[#94A3B8]">(optional)</span>
                </label>
                <textarea
                  name="whyYou"
                  rows={2}
                  className="w-full resize-none rounded-lg border border-[#E5E7EB] bg-[#F5F6F8] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)]"
                  placeholder="What draws you to this position..."
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-[#555860]">How did you hear about us?</label>
                <select
                  name="referral"
                  className="w-full rounded-lg border border-[#E5E7EB] bg-[#F5F6F8] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)]"
                >
                  <option value="">Select one</option>
                  <option>Google Search</option>
                  <option>LinkedIn</option>
                  <option>Indeed</option>
                  <option>Referral</option>
                  <option>Other</option>
                </select>
              </div>
              {status === 'error' && (
                <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">{errorMsg}</p>
              )}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--brand-blue)] py-2.5 text-sm font-bold text-white transition-colors hover:bg-[var(--brand-blue-dark)] disabled:opacity-60"
              >
                {status === 'loading' ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          )}
        </div>
      </div>
    </>,
    document.body,
  )
}

function Field({
  name,
  label,
  type = 'text',
  required,
  placeholder,
}: {
  name: string
  label: string
  type?: string
  required?: boolean
  placeholder?: string
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold text-[#555860]">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg border border-[#E5E7EB] bg-[#F5F6F8] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)]"
      />
    </div>
  )
}
