'use client'

import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'

export default function ApplyForm({ role }: { role: string }) {
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

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-[#176FEB]" />
        <h3 className="text-xl font-semibold text-[#0A1628]">Application received</h3>
        <p className="text-[#555860] text-sm max-w-sm">Thank you for applying to the {role} position at Revun. Our team will review your application within 5 business days.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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
  )
}
