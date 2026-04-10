'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import {
  ArrowRight,
  ShieldCheck,
  FileText,
  CreditCard,
  Banknote,
  Car,
  Building2,
  Globe,
  Upload,
  Camera,
  Image as ImageIcon,
  FolderOpen,
  CheckCircle2,
  ChevronRight,
  Download,
  RefreshCw,
  Eye,
  UserCheck,
  Sparkles,
  Lock,
  Fingerprint,
  ScanLine,
} from 'lucide-react'

/* ═══════════════════════════════════════════ */
/*  Shared                                     */
/* ═══════════════════════════════════════════ */

const ease = [0.22, 1, 0.36, 1] as const

function SectionWrapper({ children, id, dark }: { children: React.ReactNode; id: string; dark?: boolean }) {
  return (
    <section id={id} className={`py-16 md:py-20 ${dark ? 'bg-[#F5F6F8]' : 'bg-white'}`}>
      <div className="mx-auto max-w-6xl px-6">{children}</div>
    </section>
  )
}

function SectionHeader({ eyebrow, title, highlight, description }: {
  eyebrow: string; title: string; highlight: string; description: string
}) {
  return (
    <RevealOnScroll className="mx-auto max-w-2xl text-center">
      <motion.p variants={revealItem} className="text-sm font-heading font-semibold uppercase tracking-wider text-brand-blue">
        {eyebrow}
      </motion.p>
      <motion.h2 variants={revealItem} className="mt-3 font-display text-4xl font-normal md:text-5xl text-brand-graphite">
        {title} <span className="text-keyword">{highlight}</span>
      </motion.h2>
      <motion.p variants={revealItem} className="mx-auto mt-4 max-w-xl text-lg text-brand-graphite/70">
        {description}
      </motion.p>
    </RevealOnScroll>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 1: Your Secure Digital Safe        */
/* ═══════════════════════════════════════════ */

const documentCategories = [
  { icon: ShieldCheck, label: 'Government ID', description: 'Passport, driver\'s licence, or provincial ID' },
  { icon: Globe, label: 'Immigration', description: 'Work permits, study permits, PR cards' },
  { icon: CreditCard, label: 'Credit Report', description: 'Equifax credit score and history' },
  { icon: FileText, label: 'Income Verification Letter', description: 'Employer-issued employment and income letter' },
  { icon: Banknote, label: 'Pay Stubs', description: 'Recent pay stubs or deposit records' },
  { icon: Car, label: 'Ownership of Vehicle', description: 'Vehicle registration and ownership docs' },
  { icon: Building2, label: 'Bank Statements', description: 'Recent bank or financial statements' },
]

function DigitalSafe() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <SectionWrapper id="digital-safe">
      <SectionHeader
        eyebrow="Document Vault"
        title="Your Secure"
        highlight="Digital Safe"
        description="All your rental documents in one secure place. Everything is encrypted and easy to access."
      />
      <div ref={ref} className="mt-12 grid gap-6 lg:grid-cols-12">
        {/* Main vault card */}
        <motion.div
          className="rounded-2xl border border-[#E5E7EB] bg-white p-6 lg:col-span-7"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-heading text-lg font-semibold text-brand-graphite">Documents Vault</h3>
            <span className="flex items-center gap-1.5 rounded-full bg-[#176FEB]/10 px-3 py-1 text-xs font-medium text-[#176FEB]">
              <Lock className="h-3 w-3" /> Encrypted
            </span>
          </div>

          <div className="space-y-1">
            {documentCategories.map((doc, i) => {
              const Icon = doc.icon
              return (
                <motion.div
                  key={doc.label}
                  className="flex items-center justify-between rounded-xl px-4 py-3.5 transition-colors hover:bg-brand-off-white"
                  initial={{ opacity: 0, x: -8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.35, ease, delay: 0.2 + i * 0.06 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-blue/8">
                      <Icon className="h-5 w-5 text-brand-blue" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-brand-graphite">{doc.label}</p>
                      <p className="text-xs text-brand-graphite-mid">{doc.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-brand-graphite-light" />
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Security sidebar */}
        <div className="space-y-4 lg:col-span-5">
          {[
            { icon: Lock, label: 'End-to-End Encryption', value: 'AES-256', description: 'All documents encrypted at rest and in transit' },
            { icon: Fingerprint, label: 'Biometric Access', value: 'Enabled', description: 'Face ID and fingerprint authentication' },
            { icon: Eye, label: 'Access Logging', value: 'Full Audit', description: 'Every view, download, and share is logged' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="rounded-xl border border-[#E5E7EB] bg-white p-5"
              initial={{ opacity: 0, x: 16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, ease, delay: 0.3 + i * 0.12 }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue/10">
                  <stat.icon className="h-5 w-5 text-brand-blue" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-brand-graphite-mid">{stat.label}</p>
                  <p className="font-heading text-lg font-bold text-brand-graphite">{stat.value}</p>
                </div>
              </div>
              <p className="mt-2 text-xs text-brand-graphite-mid">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 2: Immigration Verification        */
/* ═══════════════════════════════════════════ */

const documentTypes = [
  'Residence / Work / Study Permit',
  'Permanent Resident Card',
  'Immigration or Entry Document',
  'Visitor / Student Authorization',
]

function ImmigrationVerification() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <SectionWrapper id="immigration" dark>
      <SectionHeader
        eyebrow="Immigration"
        title="Choose How To"
        highlight="Get Verified"
        description="Select the document type you want to upload to get verified quickly and securely."
      />
      <div ref={ref} className="mt-12 mx-auto max-w-2xl">
        <motion.div
          className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          {/* Header */}
          <div className="border-b border-[#E5E7EB] px-6 py-4">
            <h3 className="font-heading text-lg font-semibold text-brand-graphite">Immigration</h3>
          </div>

          {/* Country selector */}
          <div className="border-b border-[#E5E7EB] px-6 py-5">
            <p className="text-xs font-medium uppercase tracking-wider text-brand-graphite-mid">Document Issuing Country</p>
            <div className="mt-3 flex items-center gap-3 rounded-xl border border-[#E5E7EB] px-4 py-3">
              <span className="text-lg">🇨🇦</span>
              <span className="text-sm font-medium text-brand-graphite">Canada</span>
              <ChevronRight className="ml-auto h-4 w-4 text-brand-graphite-light" />
            </div>
          </div>

          {/* Document types */}
          <div className="px-6 py-4">
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-brand-graphite-mid">Select Document Type</p>
            <div className="space-y-1">
              {documentTypes.map((type, i) => (
                <motion.div
                  key={type}
                  className="flex items-center justify-between rounded-xl px-4 py-3.5 transition-colors hover:bg-brand-off-white"
                  initial={{ opacity: 0, x: -8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.35, ease, delay: 0.3 + i * 0.08 }}
                >
                  <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-brand-blue" />
                    <span className="text-sm font-medium text-brand-graphite">{type}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-brand-graphite-light" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 3: Proof of Income                 */
/* ═══════════════════════════════════════════ */

function ProofOfIncome() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <SectionWrapper id="income">
      <SectionHeader
        eyebrow="Income Verification"
        title="Proof Of Income"
        highlight="Made Easy"
        description="Verify your income once and reuse it for future rental applications with one click."
      />
      <div ref={ref} className="mt-12 grid gap-8 lg:grid-cols-2">
        {/* Letter preview */}
        <motion.div
          className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          <div className="border-b border-[#E5E7EB] px-6 py-4">
            <h3 className="font-heading text-base font-semibold text-brand-graphite">Income Verification Letter</h3>
          </div>
          <div className="p-6">
            <div className="rounded-xl bg-brand-off-white p-5">
              <p className="text-xs text-brand-graphite-mid">April 24, 2026</p>
              <p className="mt-3 text-sm font-medium text-brand-graphite">Employment Letter</p>
              <p className="mt-2 text-xs leading-relaxed text-brand-graphite-mid">
                This letter confirms that <strong className="text-brand-graphite">John Doe</strong> has been
                employed at <strong className="text-brand-graphite">ABC Company</strong> since January 2022
                as a <strong className="text-brand-graphite">Software Engineer</strong> with an annual
                salary of <strong className="text-brand-graphite">$95,000</strong>.
              </p>
              <p className="mt-3 text-xs text-brand-blue font-medium">Read more</p>
            </div>
            <p className="mt-5 text-sm text-brand-graphite-mid">
              This letter is issued by your employer to confirm your <strong className="text-brand-graphite">current employment status, income, and position</strong>.
            </p>
          </div>
        </motion.div>

        {/* Company selector */}
        <motion.div
          className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
        >
          <div className="border-b border-[#E5E7EB] px-6 py-4">
            <p className="text-sm text-brand-graphite-mid">
              Select the company below for where you want to upload your proof of income.
            </p>
          </div>
          <div className="divide-y divide-[#E5E7EB]">
            {['ABC Company', 'TD Bank'].map((company, i) => (
              <motion.div
                key={company}
                className="flex items-center justify-between px-6 py-5 transition-colors hover:bg-brand-off-white/50"
                initial={{ opacity: 0, x: 8 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, ease, delay: 0.3 + i * 0.1 }}
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-blue" />
                  <span className="text-sm font-medium text-brand-graphite">{company}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-brand-graphite-light" />
              </motion.div>
            ))}
          </div>
          <div className="px-6 py-5">
            <Link
              href="/signup/"
              className="flex w-full items-center justify-center rounded-xl bg-brand-blue py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-dark"
            >
              Get Started
            </Link>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 4: Identity Verification           */
/* ═══════════════════════════════════════════ */

function IdentityVerification() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <SectionWrapper id="identity" dark>
      <SectionHeader
        eyebrow="Identity"
        title="Simple Identity"
        highlight="Verification"
        description="Upload a government ID to confirm your identity and build trust with property owners."
      />
      <div ref={ref} className="mt-12 mx-auto max-w-3xl">
        <motion.div
          className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          <div className="border-b border-[#E5E7EB] px-6 py-4">
            <h3 className="font-heading text-lg font-semibold text-brand-graphite">Identity Verification</h3>
          </div>

          {/* Front side uploaded */}
          <div className="border-b border-[#E5E7EB] p-6">
            <div className="rounded-xl bg-brand-off-white p-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-blue/10">
                <ScanLine className="h-8 w-8 text-brand-blue" />
              </div>
              <p className="mt-4 text-sm font-medium text-brand-graphite">Government ID (Front Side)</p>
              <p className="mt-1 text-xs text-brand-graphite-mid">Document uploaded and verified</p>
            </div>
            <div className="mt-4 flex justify-center gap-4">
              <button className="flex items-center gap-1.5 text-sm font-medium text-brand-graphite-mid transition-colors hover:text-brand-graphite">
                <RefreshCw className="h-3.5 w-3.5" /> Replace
              </button>
              <button className="flex items-center gap-1.5 text-sm font-medium text-brand-graphite-mid transition-colors hover:text-brand-graphite">
                <Download className="h-3.5 w-3.5" /> Download
              </button>
            </div>
          </div>

          {/* Back side upload */}
          <div className="p-6">
            <p className="mb-4 font-heading text-sm font-semibold text-brand-graphite">Back Side</p>
            <motion.div
              className="flex flex-col items-center rounded-xl border-2 border-dashed border-[#E5E7EB] bg-brand-off-white/50 px-6 py-10 text-center transition-colors hover:border-brand-blue/30"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-blue/10">
                <Upload className="h-6 w-6 text-brand-blue" />
              </div>
              <p className="mt-4 text-sm font-medium text-brand-graphite">Upload or scan Government ID</p>
              <p className="mt-1 text-xs text-brand-graphite-mid">PDF, JPEG or PNG only</p>
              <div className="mt-5 flex gap-3">
                <button className="rounded-lg bg-brand-off-white px-4 py-2 text-xs font-medium text-brand-graphite-mid transition-colors hover:bg-brand-blue/5">
                  Replace
                </button>
                <button className="rounded-lg bg-brand-blue px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-blue-dark">
                  Upload
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 5: Upload Documents                */
/* ═══════════════════════════════════════════ */

const uploadTips = [
  'Start with good lighting. Avoid glare by using a well-lit space and no flash.',
  'Set your document on a flat surface — a solid color that contrasts with your document.',
  'Make sure all four corners of the document are visible in the frame.',
  'Hold your device steady and parallel to the document for the clearest capture.',
]

function UploadDocuments() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <SectionWrapper id="upload">
      <SectionHeader
        eyebrow="Upload"
        title="Upload"
        highlight="Documents"
        description="Upload documents using your camera, photo library, or files. Clear steps to help guide you."
      />
      <div ref={ref} className="mt-12 grid gap-8 lg:grid-cols-2">
        {/* Upload methods */}
        <motion.div
          className="rounded-2xl border border-[#E5E7EB] bg-white p-6"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          <h3 className="mb-6 font-heading text-lg font-semibold text-brand-graphite">Upload Methods</h3>
          <div className="space-y-3">
            {[
              { icon: Camera, label: 'Camera', description: 'Take a photo directly from your device camera' },
              { icon: ImageIcon, label: 'Photo Library', description: 'Select an existing photo from your gallery' },
              { icon: FolderOpen, label: 'Files', description: 'Upload a PDF, JPEG, or PNG from your device' },
            ].map((method, i) => (
              <motion.div
                key={method.label}
                className="flex items-center gap-4 rounded-xl border border-[#E5E7EB] p-4 transition-all hover:border-brand-blue/20"
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, ease, delay: 0.2 + i * 0.1 }}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10">
                  <method.icon className="h-5 w-5 text-brand-blue" />
                </div>
                <div>
                  <p className="text-sm font-medium text-brand-graphite">{method.label}</p>
                  <p className="text-xs text-brand-graphite-mid">{method.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tips card */}
        <motion.div
          className="rounded-2xl border border-[#E5E7EB] bg-white p-6"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
        >
          <h3 className="mb-6 font-heading text-lg font-semibold text-brand-graphite">Tips for Clear Photos</h3>
          <ul className="space-y-4">
            {uploadTips.map((tip, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: 8 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, ease, delay: 0.3 + i * 0.08 }}
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                <span className="text-sm text-brand-graphite-mid">{tip}</span>
              </motion.li>
            ))}
          </ul>

          <div className="mt-6 rounded-xl bg-brand-blue/5 p-4">
            <p className="text-xs font-medium text-brand-blue">Supported formats</p>
            <p className="mt-1 text-sm text-brand-graphite-mid">PDF, JPEG, PNG — max 10MB per file</p>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 6: ID Verification Results         */
/* ═══════════════════════════════════════════ */

const verificationChecks = [
  { label: 'Name match', status: 'Pass' },
  { label: 'Date of birth match', status: 'Pass' },
  { label: 'Valid ID', status: 'Pass' },
  { label: 'Valid selfie', status: 'Pass' },
  { label: 'Selfie matches ID photo', status: 'Pass' },
]

function IDVerificationResults() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <SectionWrapper id="verification" dark>
      <SectionHeader
        eyebrow="Verification"
        title="ID"
        highlight="Verification"
        description="Your ID is checked for accuracy, validity, and matching details to ensure everything is correct."
      />
      <div ref={ref} className="mt-12 mx-auto max-w-2xl">
        <motion.div
          className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#E5E7EB] px-6 py-4">
            <h3 className="font-heading text-base font-semibold text-brand-graphite">John D · Government ID</h3>
            <div className="flex gap-2">
              <span className="rounded-full bg-brand-off-white px-3 py-1 text-xs text-brand-graphite-mid">Document</span>
              <span className="rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-medium text-brand-blue">Verification</span>
            </div>
          </div>

          {/* Persona badge */}
          <div className="border-b border-[#E5E7EB] px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-brand-blue" />
                <span className="font-heading text-sm font-semibold text-brand-graphite">ID & Selfie Verify</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-brand-graphite-mid">
                <span>Verified by</span>
                <span className="font-heading font-bold text-brand-graphite">persona</span>
              </div>
            </div>
          </div>

          {/* Check results */}
          <div className="divide-y divide-[#E5E7EB]">
            {verificationChecks.map((check, i) => (
              <motion.div
                key={check.label}
                className="flex items-center justify-between px-6 py-4"
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.35, ease, delay: 0.2 + i * 0.08 }}
              >
                <div className="flex items-center gap-3">
                  <Fingerprint className="h-4 w-4 text-brand-graphite-mid" />
                  <span className="text-sm text-brand-graphite">{check.label}</span>
                </div>
                <span className="flex items-center gap-1.5 rounded-full bg-[#176FEB]/10 px-3 py-1 text-xs font-semibold text-[#176FEB]">
                  <CheckCircle2 className="h-3 w-3" /> {check.status}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Selfie verification */}
          <div className="border-t border-[#E5E7EB] px-6 py-5">
            <div className="rounded-xl bg-brand-blue/5 p-5 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue/10">
                <UserCheck className="h-7 w-7 text-brand-blue" />
              </div>
              <p className="mt-3 font-heading text-sm font-semibold text-brand-graphite">Selfie Verification</p>
              <p className="mt-1 text-xs text-brand-graphite-mid">Identity confirmed via live selfie match</p>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 7: Built-In Credit Report          */
/* ═══════════════════════════════════════════ */

/* Score gauge arc */
function ScoreGauge({ score, inView }: { score: number; inView: boolean }) {
  const size = 180
  const sw = 12
  const r = (size - sw) / 2
  const c = Math.PI * r /* semicircle */
  const pct = Math.min(score / 900, 1)
  const filled = pct * c

  const getColor = (s: number) => {
    if (s >= 700) return '#22C55E'
    if (s >= 600) return '#F59E0B'
    return '#EF4444'
  }

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size / 2 + 20} className="overflow-visible">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E5E7EB" strokeWidth={sw}
          strokeDasharray={c} strokeDashoffset={0} strokeLinecap="round"
          transform={`rotate(180 ${size / 2} ${size / 2})`} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={getColor(score)}
          strokeWidth={sw} strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={inView ? { strokeDashoffset: c - filled } : {}}
          transition={{ duration: 1.4, ease, delay: 0.3 }}
          transform={`rotate(180 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="relative -mt-16 text-center">
        <p className="font-heading text-4xl font-bold text-brand-graphite">{score}</p>
        <p className="text-xs text-brand-graphite-mid">Credit Score</p>
        <p className="text-[10px] text-brand-graphite-light">Out of 900</p>
      </div>
    </div>
  )
}

function CreditReport() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <SectionWrapper id="credit-report">
      <SectionHeader
        eyebrow="Credit"
        title="Built-In"
        highlight="Credit Report"
        description="View your credit report instantly. Your score and details are securely pulled."
      />
      <div ref={ref} className="mt-12 grid gap-8 lg:grid-cols-12">
        {/* Score card */}
        <motion.div
          className="rounded-2xl border border-[#E5E7EB] bg-white p-6 lg:col-span-5"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-heading text-base font-semibold text-brand-graphite">Credit Report Overview</h3>
            <div className="flex items-center gap-1.5 text-xs text-brand-graphite-mid">
              <span>Powered by</span>
              <span className="font-heading font-bold text-brand-graphite">EQUIFAX</span>
            </div>
          </div>

          <ScoreGauge score={493} inView={inView} />

          {/* Key metrics */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            {[
              { label: 'Debt to Income', value: '14%', sub: 'As a % of monthly income' },
              { label: 'Rent to Income', value: '19%', sub: 'As a % of monthly income' },
            ].map((metric) => (
              <div key={metric.label} className="rounded-xl bg-brand-off-white p-4 text-center">
                <p className="font-heading text-2xl font-bold text-brand-graphite">{metric.value}</p>
                <p className="mt-0.5 text-xs font-medium text-brand-graphite">{metric.label}</p>
                <p className="text-[10px] text-brand-graphite-mid">{metric.sub}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Report details */}
        <div className="space-y-4 lg:col-span-7">
          {/* Tabs */}
          <motion.div
            className="flex gap-1 rounded-xl border border-[#E5E7EB] bg-white p-1.5"
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease, delay: 0.2 }}
          >
            {['Credit Overview', 'Public Record', 'Tradelines'].map((tab, i) => (
              <div
                key={tab}
                className={`flex-1 rounded-lg py-2.5 text-center text-xs font-medium transition-colors ${i === 0 ? 'bg-brand-blue text-white' : 'text-brand-graphite-mid hover:text-brand-graphite'}`}
              >
                {tab}
              </div>
            ))}
          </motion.div>

          {/* Positives */}
          <motion.div
            className="rounded-2xl border border-[#E5E7EB] bg-white p-5"
            initial={{ opacity: 0, x: 12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease, delay: 0.3 }}
          >
            <div className="mb-4 flex items-center gap-2">
              <h4 className="font-heading text-sm font-semibold text-brand-graphite">Positives</h4>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-blue text-[10px] font-bold text-white">2</span>
            </div>
            <ul className="space-y-3">
              {[
                'Good rent to income affordability',
                'Good landlord reference',
              ].map((positive, i) => (
                <motion.li
                  key={positive}
                  className="flex items-center gap-2.5 text-sm text-brand-graphite-mid"
                  initial={{ opacity: 0, x: 8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.35, ease, delay: 0.4 + i * 0.08 }}
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#22C55E]" />
                  {positive}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Info box */}
          <motion.div
            className="rounded-xl bg-brand-blue/5 border border-brand-blue/10 p-5"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 shrink-0 text-brand-blue" />
              <div>
                <p className="text-sm font-medium text-brand-graphite">Reusable across applications</p>
                <p className="mt-1 text-xs text-brand-graphite-mid">
                  Your credit report is pulled once and can be shared with multiple landlords — no repeated hard inquiries.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Hero                                       */
/* ═══════════════════════════════════════════ */

function DocumentVaultHero() {
  return (
    <section className="relative overflow-hidden bg-white pb-12 pt-28 md:pt-36">
      <div className="absolute inset-0 bg-grid bg-grid-mask opacity-40" aria-hidden="true" />
      <div className="absolute top-0 right-[-200px] h-[500px] w-[500px] rounded-full bg-brand-blue/[0.04] blur-[120px]" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <RevealOnScroll>
          <motion.div variants={revealItem} className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-1.5 shadow-sm">
            <Lock className="h-4 w-4 text-brand-blue" />
            <span className="text-sm font-medium text-brand-graphite-mid">Document Vault</span>
          </motion.div>
          <motion.h1
            variants={revealItem}
            className="font-display text-5xl font-normal leading-[1.1] tracking-tight text-brand-graphite md:text-7xl"
          >
            Your secure{' '}
            <span className="text-brand-blue">digital safe</span>
          </motion.h1>
          <motion.p
            variants={revealItem}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-brand-graphite-mid md:text-xl"
          >
            All your rental documents in one encrypted vault. Upload once, verify once,
            reuse everywhere — from government IDs to credit reports.
          </motion.p>
          <motion.div variants={revealItem} className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/signup/"
              className="inline-flex h-14 items-center justify-center rounded-xl bg-brand-blue px-8 text-base font-semibold text-white transition-all hover:bg-brand-blue-dark"
            >
              Get Started Free
            </Link>
            <Link
              href="/demo/"
              className="inline-flex h-14 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-8 text-base font-semibold text-brand-graphite transition-all hover:border-brand-blue/30 hover:shadow-sm"
            >
              Book a Demo
            </Link>
          </motion.div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════ */
/*  CTA                                        */
/* ═══════════════════════════════════════════ */

function VaultCTA() {
  return (
    <SectionWrapper id="cta" dark>
      <div className="mx-auto max-w-3xl text-center">
        <RevealOnScroll>
          <motion.h2
            variants={revealItem}
            className="font-heading font-extrabold text-4xl tracking-tight text-[#0A1628] md:text-5xl"
          >
            Stop uploading the same documents{' '}
            <span className="text-brand-blue">over and over</span>
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mx-auto mt-5 max-w-lg text-lg text-[#555860]"
          >
            Upload once, verify once, reuse across every rental application. Your documents, your control, one secure vault.
          </motion.p>
          <motion.div variants={revealItem} className="mt-10">
            <Link
              href="/signup/"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-blue px-8 text-base font-semibold text-white transition-colors hover:bg-brand-blue-dark"
            >
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </RevealOnScroll>
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Page Assembly                              */
/* ═══════════════════════════════════════════ */

export function DocumentVaultClient() {
  return (
    <>
      <DocumentVaultHero />
      <DigitalSafe />
      <ImmigrationVerification />
      <ProofOfIncome />
      <IdentityVerification />
      <UploadDocuments />
      <IDVerificationResults />
      <CreditReport />
      <VaultCTA />

      {/* AEO quick answer */}
      <p className="sr-only">
        Revun Document Vault is a secure digital safe for all rental documents. Tenants and owners can store government IDs, immigration documents, credit reports, income verification letters, pay stubs, vehicle ownership documents, and bank statements in one encrypted vault. Features include identity verification powered by Persona with selfie matching, built-in Equifax credit reports, income verification, and document upload via camera, photo library, or files. All documents are encrypted with AES-256, access-logged, and reusable across multiple rental applications.
      </p>
    </>
  )
}
