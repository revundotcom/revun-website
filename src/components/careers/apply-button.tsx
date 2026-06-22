'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import PhoneInput, { isValidPhoneNumber, type Country } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

interface Props {
  role: string
  jobId: string
  workType: 'remote' | 'hybrid'
  className?: string
  variant?: 'primary' | 'ghost'
  label?: string
}

export function ApplyButton({
  role,
  jobId,
  workType,
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
        data-apply-trigger
        className={`${triggerBase} ${triggerVariant} ${className}`}
      >
        {label}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>

      {open && <ApplyModal role={role} jobId={jobId} workType={workType} onClose={() => setOpen(false)} />}
    </>
  )
}

function ApplyModal({
  role,
  jobId,
  workType,
  onClose,
}: {
  role: string
  jobId: string
  workType: 'remote' | 'hybrid'
  onClose: () => void
}) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [mounted, setMounted] = useState(false)
  const [num1, setNum1] = useState(0)
  const [num2, setNum2] = useState(0)
  const [phone, setPhone] = useState('')
  const [countryCode, setCountryCode] = useState<string>('US')
  const [businessType, setBusinessType] = useState('')
  const [hasVehicle, setHasVehicle] = useState('')

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then((res) => res.json())
      .then((data) => {
        if (data.country_code) {
          setCountryCode(data.country_code)
        }
      })
      .catch(() => { })
  }, [])

  useEffect(() => {
    setMounted(true)
    setNum1(Math.floor(Math.random() * 10) + 1)
    setNum2(Math.floor(Math.random() * 10) + 1)
  }, [])

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.classList.add('overflow-hidden')
    document.documentElement.classList.add('overflow-hidden')
    return () => {
      document.body.classList.remove('overflow-hidden')
      document.documentElement.classList.remove('overflow-hidden')
    }
  }, [])

  // Close on Escape.
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
    setErrorMsg('')
    const form = e.currentTarget
    const fd = new FormData(form)

    // Explicit Validation
    const firstName = fd.get('first_name') as string
    const lastName = fd.get('last_name') as string
    if (!firstName?.trim() || !lastName?.trim()) {
      setErrorMsg('First name and last name are required.')
      setStatus('error')
      return
    }

    const email = fd.get('email') as string
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg('Please enter a valid email address.')
      setStatus('error')
      return
    }

    if (!phone || !isValidPhoneNumber(phone)) {
      setErrorMsg('Please enter a valid phone number.')
      setStatus('error')
      return
    }

    const resume = fd.get('resume') as File | null
    if (!resume || resume.size === 0) {
      setErrorMsg('Please upload a resume.')
      setStatus('error')
      return
    }

    if (workType === 'remote') {
      const workedFromHome = fd.get('worked_from_home')
      const noiseCancelling = fd.get('noise_cancelling_headset')
      const ram = fd.get('computer_ram')
      const internet = fd.get('internet_speed')

      if (!workedFromHome || !noiseCancelling || !ram || !internet) {
        setErrorMsg('Please fill out all remote work requirements.')
        setStatus('error')
        return
      }
    }

    // Verify Captcha
    const captchaVal = parseInt(fd.get('captcha') as string, 10)
    if (captchaVal !== num1 + num2) {
      setErrorMsg('Incorrect math verification. Please try again.')
      setStatus('error')
      return
    }
    fd.delete('captcha')

    // Append hidden fields
    fd.append('job_id', jobId)
    fd.append('source', 'revun')

    // Process mobile
    fd.set('mobile', phone)

    const baseUrl = process.env.NEXT_PUBLIC_PORTAL_BASE_URL || 'https://portal.revun.com'

    try {
      const res = await fetch(`${baseUrl}/api/v1/job-postings/apply`, {
        method: 'POST',
        body: fd, // Browser automatically sets multipart/form-data boundary
      })
      if (res.ok) {
        setStatus('success')
      } else {
        const data = await res.json().catch(() => ({}))
        setErrorMsg(data.message || data.error || 'Something went wrong. Please try again.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  if (!mounted) return null

  return createPortal(
    <>
      <div
        aria-hidden="true"
        className="fixed inset-0 z-40 bg-[#0A1628]/70 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="apply-modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:p-6 sm:pb-6"
      >
        <div className="relative flex w-full max-w-2xl max-h-full sm:max-h-[90vh] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
          <div className="flex shrink-0 items-center justify-between border-b border-[#E5E7EB] bg-white px-5 py-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--brand-blue)]">
                Apply Now · {jobId}
              </p>
              <h2
                id="apply-modal-title"
                className="mt-0.5 text-[18px] font-bold text-[#0A1628]"
              >
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

          <div className="overflow-y-auto p-5">
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
                <CheckCircle2 className="h-12 w-12 text-[var(--brand-blue)]" />
                <h3 className="text-xl font-bold text-[#0A1628]">
                  Application Received
                </h3>
                <div className="space-y-3 text-sm text-[#555860] max-w-md">
                  <p>Thank you for applying to Revun.</p>
                  <p>
                    Our recruitment partner,{' '}
                    <a
                      href="https://www.langfordstaffing.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[var(--brand-blue)] hover:underline"
                    >
                      Langford Staffing
                    </a>
                    , will contact you by email and text message if you are approved for the next step.
                  </p>
                  <p>
                    Revun is an equal opportunity employer. All applications are reviewed based on qualifications, experience, and role requirements.
                  </p>
                  <p className="font-semibold text-[#0A1628]">
                    Please follow the instructions sent to you as soon as possible.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="mt-4 rounded-full bg-[#0A1628] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0A1628]/80"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-[#555860]">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="first_name"
                      required
                      className="w-full rounded-lg border border-[#E5E7EB] bg-[#F5F6F8] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)]"
                      placeholder="Jane"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-[#555860]">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="last_name"
                      required
                      className="w-full rounded-lg border border-[#E5E7EB] bg-[#F5F6F8] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)]"
                      placeholder="Smith"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-[#555860]">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      className="w-full rounded-lg border border-[#E5E7EB] bg-[#F5F6F8] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)]"
                      placeholder="you@email.com"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-[#555860]">
                      Mobile <span className="text-red-500">*</span>
                    </label>
                    <style dangerouslySetInnerHTML={{
                      __html: `
                      .PhoneInput {
                        display: flex;
                        align-items: center;
                      }
                      .PhoneInputInput {
                        flex: 1;
                        border: none;
                        background: transparent;
                        outline: none;
                        padding: 0.5rem;
                        font-size: 0.875rem;
                      }
                      .PhoneInputCountry {
                        display: flex;
                        align-items: center;
                        margin-right: 0.5rem;
                      }
                      .PhoneInputCountryIcon {
                        width: 1.5rem;
                        height: 1rem;
                      }
                      .PhoneInputCountryIcon--square {
                        width: 1rem;
                      }
                      .PhoneInputCountryIcon--border {
                        border: 1px solid rgba(0,0,0,0.2);
                        box-shadow: 0 1px 2px rgba(0,0,0,0.1);
                      }
                      .PhoneInputCountryIconImg {
                        display: block;
                        width: 100%;
                        height: 100%;
                      }
                    `}} />
                    <div className="flex w-full overflow-hidden rounded-lg border border-[#E5E7EB] bg-[#F5F6F8] px-3 focus-within:ring-2 focus-within:ring-[var(--brand-blue)]">
                      <PhoneInput
                        international
                        defaultCountry={countryCode as Country}
                        value={phone}
                        onChange={(val) => setPhone(val || '')}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {workType === 'remote' && (
                  <>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-semibold text-[#555860]">
                          Worked from home for a minimum of 2 years? <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="worked_from_home"
                          required
                          className="w-full rounded-lg border border-[#E5E7EB] bg-[#F5F6F8] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)]"
                        >
                          <option value="">Select an option</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-semibold text-[#555860]">
                          Own a noise-cancelling headset? <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="noise_cancelling_headset"
                          required
                          className="w-full rounded-lg border border-[#E5E7EB] bg-[#F5F6F8] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)]"
                        >
                          <option value="">Select an option</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-semibold text-[#555860]">
                          Your Computer RAM (in GB)? <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            name="computer_ram"
                            type="number"
                            min="1"
                            required
                            className="w-full rounded-lg border border-[#E5E7EB] bg-[#F5F6F8] pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)]"
                            placeholder="e.g., 16"
                          />
                          <span className="absolute inset-y-0 right-3 flex items-center text-sm font-semibold text-[#555860] pointer-events-none">
                            GB
                          </span>
                        </div>
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-semibold text-[#555860]">
                          Home internet speed (Download Mbps)? <span className="text-red-500">*</span>
                        </label>
                        <input
                          name="internet_speed"
                          type="number"
                          min="1"
                          required
                          className="w-full rounded-lg border border-[#E5E7EB] bg-[#F5F6F8] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)]"
                          placeholder="e.g., 100"
                        />
                      </div>
                    </div>
                  </>
                )}

                {workType !== 'remote' && (
                  <>
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-[#555860]">
                        Do you currently operate a business under your name, such as a sole proprietorship, or do you have an incorporated company? <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="business_type"
                        required
                        value={businessType}
                        onChange={(e) => setBusinessType(e.target.value)}
                        className="w-full rounded-lg border border-[#E5E7EB] bg-[#F5F6F8] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)]"
                      >
                        <option value="">Select an option</option>
                        <option value="Yes, Sole Proprietorship">Yes, Sole Proprietorship</option>
                        <option value="Yes, Corporation under my name">Yes, Corporation under my name</option>
                        <option value="No">No</option>
                      </select>
                    </div>

                    {(businessType === 'Yes, Sole Proprietorship' || businessType === 'Yes, Corporation under my name') && (
                      <>
                        <div>
                          <label className="mb-1 block text-xs font-semibold text-[#555860]">
                            Legal Business/Sole Proprietorship Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            name="legal_business_name"
                            type="text"
                            required
                            className="w-full rounded-lg border border-[#E5E7EB] bg-[#F5F6F8] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)]"
                            placeholder="Enter business name"
                          />
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <label className="mb-1 block text-xs font-semibold text-[#555860]">
                              WSIB Number <span className="text-red-500">*</span>
                            </label>
                            <input
                              name="wsib_number"
                              type="text"
                              required
                              className="w-full rounded-lg border border-[#E5E7EB] bg-[#F5F6F8] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)]"
                              placeholder="Enter WSIB Number"
                            />
                          </div>
                          <div>
                            <label className="mb-1 block text-xs font-semibold text-[#555860]">
                              WSIB Clearance Certificate <span className="text-red-500">*</span>
                            </label>
                            <input
                              name="wsib_certificate"
                              type="file"
                              required
                              accept=".pdf,.doc,.docx,.jpg,.png"
                              className="w-full rounded-lg border border-[#E5E7EB] bg-[#F5F6F8] px-3 py-2 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-[var(--brand-blue)]/10 file:px-4 file:py-1 file:text-xs file:font-semibold file:text-[var(--brand-blue)] hover:file:bg-[var(--brand-blue)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)]"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <label className="mb-1 block text-xs font-semibold text-[#555860]">
                              Business Number <span className="text-red-500">*</span>
                            </label>
                            <input
                              name="business_number"
                              type="text"
                              required
                              className="w-full rounded-lg border border-[#E5E7EB] bg-[#F5F6F8] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)]"
                              placeholder="Enter Business Number"
                            />
                          </div>
                          <div>
                            <label className="mb-1 block text-xs font-semibold text-[#555860]">
                              HST Number <span className="text-red-500">*</span>
                            </label>
                            <input
                              name="hst_number"
                              type="text"
                              required
                              className="w-full rounded-lg border border-[#E5E7EB] bg-[#F5F6F8] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)]"
                              placeholder="Enter HST Number"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-semibold text-[#555860]">
                          Do you have a valid driver&apos;s license? <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="has_drivers_license"
                          required
                          className="w-full rounded-lg border border-[#E5E7EB] bg-[#F5F6F8] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)]"
                        >
                          <option value="">Select an option</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-semibold text-[#555860]">
                          Do you currently have a reliable vehicle? <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="has_vehicle"
                          required
                          value={hasVehicle}
                          onChange={(e) => setHasVehicle(e.target.value)}
                          className="w-full rounded-lg border border-[#E5E7EB] bg-[#F5F6F8] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)]"
                        >
                          <option value="">Select an option</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                    </div>

                    {hasVehicle === 'Yes' && (
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-1 block text-xs font-semibold text-[#555860]">
                            Vehicle Make <span className="text-red-500">*</span>
                          </label>
                          <input
                            name="vehicle_make"
                            type="text"
                            required
                            className="w-full rounded-lg border border-[#E5E7EB] bg-[#F5F6F8] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)]"
                            placeholder="e.g. Toyota"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-xs font-semibold text-[#555860]">
                            Vehicle Model <span className="text-red-500">*</span>
                          </label>
                          <input
                            name="vehicle_model"
                            type="text"
                            required
                            className="w-full rounded-lg border border-[#E5E7EB] bg-[#F5F6F8] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)]"
                            placeholder="e.g. Corolla"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-xs font-semibold text-[#555860]">
                            Vehicle Year <span className="text-red-500">*</span>
                          </label>
                          <input
                            name="vehicle_year"
                            type="number"
                            required
                            className="w-full rounded-lg border border-[#E5E7EB] bg-[#F5F6F8] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)]"
                            placeholder="e.g. 2018"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-xs font-semibold text-[#555860]">
                            Approximate Mileage <span className="text-red-500">*</span>
                          </label>
                          <input
                            name="vehicle_mileage"
                            type="text"
                            required
                            className="w-full rounded-lg border border-[#E5E7EB] bg-[#F5F6F8] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)]"
                            placeholder="e.g. 50 kmpl"
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="mb-1 block text-xs font-semibold text-[#555860]">
                        What is your current smartphone model? <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="smartphone_model"
                        type="text"
                        required
                        className="w-full rounded-lg border border-[#E5E7EB] bg-[#F5F6F8] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)]"
                        placeholder="e.g. iPhone 13, Samsung Galaxy S21"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="mb-1 block text-xs font-semibold text-[#555860]">
                    Resume / CV <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="resume"
                    type="file"
                    required
                    accept=".pdf,.doc,.docx"
                    className="w-full rounded-lg border border-[#E5E7EB] bg-[#F5F6F8] px-3 py-2 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-[var(--brand-blue)]/10 file:px-4 file:py-1 file:text-xs file:font-semibold file:text-[var(--brand-blue)] hover:file:bg-[var(--brand-blue)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)]"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-[#555860]">
                    Human Verification: What is {num1} + {num2}? <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="captcha"
                    type="number"
                    required
                    className="w-full rounded-lg border border-[#E5E7EB] bg-[#F5F6F8] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)]"
                    placeholder="Enter the sum"
                  />
                </div>

                {status === 'error' && (
                  <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--brand-blue)] py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--brand-blue-dark)] disabled:opacity-60"
                >
                  {status === 'loading' ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>,
    document.body
  )
}
