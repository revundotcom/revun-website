import type { SVGProps } from 'react'

/* ═══════════════════════════════════════════════════════════════════════════
   Feature SVG Icons - rich, filled, multi-element brand-style icons
   Each renders a 40×40 SVG with a colored rounded background
   ═══════════════════════════════════════════════════════════════════════════ */

/* ── Documents & Compliance ───────────────────────────────────────────────── */

export function LeaseGenerationIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="10" fill="#176FEB" />
      <rect x="11" y="8" width="14" height="18" rx="2" fill="white" opacity="0.25" />
      <rect x="13" y="10" width="14" height="18" rx="2" fill="white" />
      <path d="M16 15h8M16 18h6M16 21h7" stroke="#176FEB" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="26" cy="27" r="5" fill="#0B5AD4" />
      <path d="M24.5 27l1 1 2-2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ProvinceTemplatesIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="10" fill="#176FEB" />
      <rect x="10" y="10" width="20" height="20" rx="3" fill="white" opacity="0.2" />
      <path d="M11 18h18" stroke="white" strokeWidth="1.5" />
      <rect x="10" y="10" width="20" height="8" rx="3" fill="white" opacity="0.35" />
      <rect x="13" y="20" width="6" height="4" rx="1" fill="white" opacity="0.6" />
      <rect x="21" y="20" width="6" height="4" rx="1" fill="white" opacity="0.6" />
      <rect x="13" y="26" width="6" height="3" rx="1" fill="white" opacity="0.4" />
      <rect x="21" y="26" width="6" height="3" rx="1" fill="white" opacity="0.4" />
      <circle cx="20" cy="14" r="2.5" fill="white" />
      <path d="M18.5 14l1 1 2-2" stroke="#176FEB" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function DigitalSignaturesIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="10" fill="#176FEB" />
      <rect x="10" y="12" width="16" height="18" rx="2" fill="white" opacity="0.25" />
      <rect x="10" y="12" width="16" height="18" rx="2" stroke="white" strokeWidth="1.5" fill="none" />
      <path d="M13 17h10M13 20h7" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <path d="M14 25c1-2 2.5 1 3.5-1s2 2 3-0.5" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="28" cy="14" r="6" fill="#0B5AD4" />
      <path d="M26 14.5l3.5-3.5M28 11.5l1.5 1.5M25 16l1-3.5 2 2L25 16z" fill="white" />
    </svg>
  )
}

export function ComplianceTrackingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="10" fill="#176FEB" />
      <path d="M20 8l10 5v9c0 5.5-4 10-10 12-6-2-10-6.5-10-12v-9l10-5z" fill="white" opacity="0.2" />
      <path d="M20 10l8 4v7.5c0 4.5-3.3 8.2-8 9.8-4.7-1.6-8-5.3-8-9.8V14l8-4z" stroke="white" strokeWidth="1.5" fill="none" />
      <path d="M16 20l3 3 5-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ── Payments & Fintech ───────────────────────────────────────────────────── */

export function RentCollectionIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="10" fill="#176FEB" />
      <rect x="8" y="13" width="20" height="14" rx="2.5" fill="white" opacity="0.25" />
      <rect x="10" y="15" width="20" height="14" rx="2.5" fill="white" />
      <path d="M10 20h20" stroke="#176FEB" strokeWidth="2" />
      <rect x="13" y="23" width="5" height="3" rx="1" fill="#176FEB" opacity="0.3" />
      <circle cx="27" cy="24.5" r="1.5" fill="#176FEB" opacity="0.4" />
      <circle cx="8" cy="12" r="5" fill="#0B5AD4" />
      <path d="M8 10v4M6.5 11.5h3" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function OwnerDisbursementsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="10" fill="#176FEB" />
      <circle cx="20" cy="20" r="10" fill="white" opacity="0.15" />
      <circle cx="20" cy="20" r="7" stroke="white" strokeWidth="1.5" fill="none" />
      <path d="M20 16v8M18 17.5h4a1.5 1.5 0 0 1 0 3h-4M18 20.5h3.5a1.5 1.5 0 0 1 0 3H18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M28 10l3 3M31 10l-3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <path d="M9 27l3 3M12 27l-3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    </svg>
  )
}

export function VendorPaymentsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="10" fill="#176FEB" />
      <rect x="10" y="11" width="15" height="18" rx="2" fill="white" opacity="0.25" />
      <rect x="12" y="13" width="15" height="18" rx="2" fill="white" />
      <path d="M15 18h9M15 21h6M15 24h7" stroke="#176FEB" strokeWidth="1.3" strokeLinecap="round" opacity="0.5" />
      <circle cx="28" cy="27" r="5" fill="#0B5AD4" />
      <path d="M26 27h4M28 25v4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function FinancialReportingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="10" fill="#176FEB" />
      <rect x="9" y="10" width="22" height="16" rx="2" fill="white" opacity="0.15" />
      <rect x="9" y="10" width="22" height="16" rx="2" stroke="white" strokeWidth="1.5" fill="none" />
      <rect x="13" y="18" width="3" height="5" rx="0.5" fill="white" opacity="0.6" />
      <rect x="18.5" y="15" width="3" height="8" rx="0.5" fill="white" opacity="0.8" />
      <rect x="24" y="13" width="3" height="10" rx="0.5" fill="white" />
      <path d="M11 30h18" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <path d="M12 17l5-3 5 2 5-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
    </svg>
  )
}

/* ── Platform Modules ─────────────────────────────────────────────────────── */

export function LeasingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="10" fill="#176FEB" />
      <rect x="11" y="8" width="13" height="17" rx="2" fill="white" opacity="0.3" />
      <rect x="14" y="11" width="13" height="17" rx="2" fill="white" />
      <path d="M17 16h7M17 19h5M17 22h6" stroke="#176FEB" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="27" cy="28" r="5" fill="#0B5AD4" />
      <path d="M25 28h4M27 26v4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function RentIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="10" fill="#176FEB" />
      <rect x="9" y="14" width="22" height="15" rx="3" fill="white" opacity="0.2" />
      <rect x="9" y="12" width="22" height="15" rx="3" fill="white" />
      <path d="M9 17h22" stroke="#176FEB" strokeWidth="2" />
      <rect x="12" y="21" width="5" height="3" rx="1" fill="#176FEB" opacity="0.25" />
      <circle cx="28" cy="22.5" r="1.5" fill="#176FEB" opacity="0.3" />
      <path d="M15 30l5-3 5 2 5-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  )
}

export function MaintenanceIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="10" fill="#176FEB" />
      <circle cx="18" cy="18" r="6" fill="white" opacity="0.2" />
      <path d="M15.5 15.5a3.5 3.5 0 0 1 5 0l-1.2 1.2a1.8 1.8 0 0 0-2.6 0L15.5 15.5z" fill="white" opacity="0.5" />
      <path d="M22 22l6 6M25 28l3-3" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 26a4 4 0 0 1 0-5.6l1.2 1.2a2 2 0 0 0 0 3.2L14 26z" fill="white" opacity="0.4" />
      <circle cx="18" cy="18" r="3" stroke="white" strokeWidth="1.5" fill="none" />
      <circle cx="18" cy="18" r="1" fill="white" />
      <path d="M18 14v-2M18 22v2M14 18h-2M22 18h2" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    </svg>
  )
}

export function TenantScreeningIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="10" fill="#176FEB" />
      <circle cx="17" cy="16" r="4" fill="white" opacity="0.3" />
      <circle cx="17" cy="16" r="4" stroke="white" strokeWidth="1.5" fill="none" />
      <path d="M10 28c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle cx="27" cy="24" r="5.5" fill="#0B5AD4" />
      <circle cx="26" cy="23" r="2.5" stroke="white" strokeWidth="1.5" fill="none" />
      <path d="M28 25l2.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function CommunicationsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="10" fill="#176FEB" />
      <rect x="8" y="10" width="16" height="12" rx="3" fill="white" opacity="0.3" />
      <rect x="8" y="10" width="16" height="12" rx="3" stroke="white" strokeWidth="1.5" fill="none" />
      <path d="M8 22l4-2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 15h8M12 18h5" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <rect x="18" y="17" width="14" height="10" rx="3" fill="white" opacity="0.15" />
      <rect x="18" y="17" width="14" height="10" rx="3" stroke="white" strokeWidth="1.5" fill="none" />
      <path d="M32 27l-3-2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M22 21h6M22 24h4" stroke="white" strokeWidth="1.3" strokeLinecap="round" opacity="0.5" />
    </svg>
  )
}

/* ── Platform Steps ───────────────────────────────────────────────────────── */

export function SignUpIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="10" fill="#176FEB" />
      <circle cx="18" cy="16" r="5" fill="white" opacity="0.25" />
      <circle cx="18" cy="16" r="5" stroke="white" strokeWidth="1.5" fill="none" />
      <path d="M11 29c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="28" cy="14" r="5" fill="#0B5AD4" />
      <path d="M26 14h4M28 12v4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function ConnectPropertiesIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="10" fill="#176FEB" />
      <path d="M12 28V16l8-6 8 6v12H12z" fill="white" opacity="0.2" />
      <path d="M12 28V16l8-6 8 6v12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <rect x="17" y="22" width="6" height="6" rx="1" stroke="white" strokeWidth="1.5" fill="none" />
      <path d="M20 22v6" stroke="white" strokeWidth="1" opacity="0.5" />
      <circle cx="9" cy="20" r="2" fill="white" opacity="0.4" />
      <circle cx="31" cy="20" r="2" fill="white" opacity="0.4" />
      <path d="M11 20h1M28 20h3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="1.5 1.5" opacity="0.5" />
    </svg>
  )
}

export function GoLiveIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="10" fill="#176FEB" />
      <path d="M20 30V14" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
      <path d="M15 22l5-10 5 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M13 26l7-14 7 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.4" />
      <circle cx="20" cy="10" r="2.5" fill="white" />
      <path d="M16 30h8" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <path d="M12 28c1-1 2 0 3-1s2 0 3-1M22 28c1-1 2 0 3-1s2 0 3-1" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
    </svg>
  )
}

/* ── Help Routing ─────────────────────────────────────────────────────────── */

export function PoweredByIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="10" fill="#176FEB" />
      <rect x="13" y="8" width="14" height="22" rx="3" fill="white" opacity="0.2" />
      <rect x="13" y="8" width="14" height="22" rx="3" stroke="white" strokeWidth="1.5" fill="none" />
      <path d="M13 12h14" stroke="white" strokeWidth="1" opacity="0.3" />
      <path d="M13 26h14" stroke="white" strokeWidth="1" opacity="0.3" />
      <rect x="16" y="15" width="8" height="8" rx="1.5" fill="white" opacity="0.3" />
      <path d="M18 19l2 2 2-2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="20" cy="28" r="1" fill="white" opacity="0.6" />
    </svg>
  )
}

export function SelfManageIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="10" fill="#22C55E" />
      <path d="M12 28V17l8-6 8 6v11a1 1 0 01-1 1H13a1 1 0 01-1-1z" fill="white" opacity="0.2" />
      <path d="M12 28V17l8-6 8 6v11a1 1 0 01-1 1H13a1 1 0 01-1-1z" stroke="white" strokeWidth="1.5" fill="none" />
      <rect x="17" y="22" width="6" height="7" rx="1" fill="white" opacity="0.4" />
      <circle cx="20" cy="17" r="2.5" stroke="white" strokeWidth="1.5" fill="none" />
      <path d="M20 17v0" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/* ── Operator Types (Powered by Revun) ────────────────────────────────────── */

export function PMCompanyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="10" fill="#176FEB" opacity="0.1" />
      <rect x="10" y="14" width="20" height="16" rx="2" fill="#176FEB" opacity="0.15" />
      <rect x="10" y="14" width="20" height="16" rx="2" stroke="#176FEB" strokeWidth="1.5" fill="none" />
      <path d="M15 10h10l3 4H12l3-4z" fill="#176FEB" opacity="0.2" />
      <path d="M15 10h10l3 4H12l3-4z" stroke="#176FEB" strokeWidth="1.5" fill="none" />
      <rect x="14" y="18" width="3" height="4" rx="0.5" fill="#176FEB" opacity="0.4" />
      <rect x="19" y="18" width="3" height="4" rx="0.5" fill="#176FEB" opacity="0.4" />
      <rect x="24" y="18" width="3" height="4" rx="0.5" fill="#176FEB" opacity="0.4" />
      <rect x="17" y="25" width="6" height="5" rx="1" fill="#176FEB" opacity="0.3" />
    </svg>
  )
}

export function BrokerageIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="10" fill="#0B5AD4" opacity="0.1" />
      <circle cx="16" cy="15" r="3.5" stroke="#0B5AD4" strokeWidth="1.5" fill="none" />
      <circle cx="24" cy="15" r="3.5" stroke="#0B5AD4" strokeWidth="1.5" fill="none" />
      <path d="M10 28c0-3.3 2.7-6 6-6 1.5 0 2.8.5 3.9 1.4" stroke="#0B5AD4" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M30 28c0-3.3-2.7-6-6-6-1.5 0-2.8.5-3.9 1.4" stroke="#0B5AD4" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="20" cy="24" r="2" fill="#0B5AD4" opacity="0.3" />
    </svg>
  )
}

export function MaintenanceCompanyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="10" fill="#4A91F0" opacity="0.1" />
      <path d="M14 14a6 6 0 0 1 8.5 8.5l-2-2a3.5 3.5 0 0 0-5-5l-1.5-1.5z" fill="#4A91F0" opacity="0.25" />
      <path d="M22.5 22.5l6 6" stroke="#4A91F0" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M25.5 28.5l3-3" stroke="#4A91F0" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="17" cy="17" r="5" stroke="#4A91F0" strokeWidth="1.5" fill="none" />
      <circle cx="17" cy="17" r="2" fill="#4A91F0" opacity="0.3" />
      <path d="M17 12v-1M17 23v1M12 17h-1M23 17h1" stroke="#4A91F0" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    </svg>
  )
}

/* ── Audience Router ──────────────────────────────────────────────────────── */

export function PropertyOwnerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="10" fill="#176FEB" opacity="0.1" />
      <path d="M11 28V16l9-7 9 7v12H11z" fill="#176FEB" opacity="0.1" />
      <path d="M11 28V16l9-7 9 7v12" stroke="#176FEB" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
      <rect x="17" y="22" width="6" height="6" rx="1" fill="#176FEB" opacity="0.25" />
      <path d="M20 22v6" stroke="#176FEB" strokeWidth="1" opacity="0.4" />
      <path d="M8 17l12-9 12 9" stroke="#176FEB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

export function PropertyManagerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="10" fill="#0B5AD4" opacity="0.1" />
      <rect x="10" y="14" width="20" height="16" rx="2" fill="#0B5AD4" opacity="0.1" />
      <rect x="10" y="14" width="20" height="16" rx="2" stroke="#0B5AD4" strokeWidth="1.5" fill="none" />
      <path d="M15 10h10l3 4H12l3-4z" stroke="#0B5AD4" strokeWidth="1.5" fill="#0B5AD4" opacity="0.15" />
      <rect x="14" y="18" width="3" height="3" rx="0.5" fill="#0B5AD4" opacity="0.35" />
      <rect x="19" y="18" width="3" height="3" rx="0.5" fill="#0B5AD4" opacity="0.35" />
      <rect x="24" y="18" width="3" height="3" rx="0.5" fill="#0B5AD4" opacity="0.35" />
      <rect x="17" y="25" width="6" height="5" rx="1" fill="#0B5AD4" opacity="0.25" />
    </svg>
  )
}

export function TenantIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="10" fill="#4A91F0" opacity="0.1" />
      <circle cx="15" cy="15" r="3" stroke="#4A91F0" strokeWidth="1.5" fill="none" />
      <circle cx="25" cy="15" r="3" stroke="#4A91F0" strokeWidth="1.5" fill="none" />
      <circle cx="20" cy="22" r="3" stroke="#4A91F0" strokeWidth="1.5" fill="none" />
      <path d="M9 30c0-3.3 2.7-6 6-6" stroke="#4A91F0" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M31 30c0-3.3-2.7-6-6-6" stroke="#4A91F0" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 32c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#4A91F0" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/* ── Trust Signals ────────────────────────────────────────────────────────── */

export function EncryptionIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="5" y="11" width="14" height="10" rx="2" fill="#176FEB" opacity="0.15" />
      <rect x="5" y="11" width="14" height="10" rx="2" stroke="#176FEB" strokeWidth="1.5" fill="none" />
      <path d="M8 11V8a4 4 0 1 1 8 0v3" stroke="#176FEB" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="16" r="1.5" fill="#176FEB" />
      <path d="M12 17.5v1.5" stroke="#176FEB" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function SOC2Icon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 3l8 4v5c0 5-3.3 9.5-8 11-4.7-1.5-8-6-8-11V7l8-4z" fill="#176FEB" opacity="0.1" />
      <path d="M12 3l8 4v5c0 5-3.3 9.5-8 11-4.7-1.5-8-6-8-11V7l8-4z" stroke="#176FEB" strokeWidth="1.5" fill="none" />
      <path d="M9 12l2 2 4-4" stroke="#176FEB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function DataResidencyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="9" fill="#176FEB" opacity="0.08" />
      <circle cx="12" cy="12" r="9" stroke="#176FEB" strokeWidth="1.5" fill="none" />
      <path d="M3 12h18M12 3c-2.5 3-4 6-4 9s1.5 6 4 9M12 3c2.5 3 4 6 4 9s-1.5 6-4 9" stroke="#176FEB" strokeWidth="1.2" fill="none" />
      <circle cx="12" cy="8" r="2" fill="#176FEB" opacity="0.3" />
      <path d="M12 6l-1.5 2h3L12 6z" fill="#C41230" />
    </svg>
  )
}

export function UptimeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="9" fill="#176FEB" opacity="0.08" />
      <circle cx="12" cy="12" r="9" stroke="#176FEB" strokeWidth="1.5" fill="none" />
      <path d="M9 12l2 2 4-4" stroke="#176FEB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function PIPEDAIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="5" y="3" width="14" height="18" rx="2" fill="#176FEB" opacity="0.08" />
      <rect x="5" y="3" width="14" height="18" rx="2" stroke="#176FEB" strokeWidth="1.5" fill="none" />
      <path d="M9 8h6M9 11h4M9 14h5" stroke="#176FEB" strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />
      <circle cx="17" cy="18" r="4" fill="white" />
      <path d="M17 15l3 1.5v2c0 1.5-1.2 3-3 3.5-1.8-.5-3-2-3-3.5v-2l3-1.5z" fill="#176FEB" opacity="0.2" />
      <path d="M17 15l3 1.5v2c0 1.5-1.2 3-3 3.5-1.8-.5-3-2-3-3.5v-2l3-1.5z" stroke="#176FEB" strokeWidth="1" fill="none" />
    </svg>
  )
}

/* ── Self-Manage Steps ────────────────────────────────────────────────────── */

export function ListIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="10" fill="#176FEB" />
      <rect x="10" y="10" width="20" height="14" rx="2" fill="white" opacity="0.25" />
      <rect x="10" y="10" width="20" height="14" rx="2" stroke="white" strokeWidth="1.5" fill="none" />
      <path d="M16 28h8" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 24v4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="15" cy="17" r="2" fill="white" opacity="0.6" />
      <path d="M19 15h6M19 18h4" stroke="white" strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />
    </svg>
  )
}

export function ScreenIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="10" fill="#176FEB" />
      <circle cx="18" cy="17" r="4.5" stroke="white" strokeWidth="1.5" fill="none" />
      <path d="M22 21l5 5" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 17h4M18 15v4" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
    </svg>
  )
}

export function LeaseStepIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="10" fill="#176FEB" />
      <rect x="12" y="10" width="16" height="20" rx="2" fill="white" opacity="0.2" />
      <rect x="12" y="10" width="16" height="20" rx="2" stroke="white" strokeWidth="1.5" fill="none" />
      <path d="M16 15h8M16 18h6M16 21h5" stroke="white" strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />
      <path d="M16 25c1-1.5 2.5 1 3.5-.5s2 1.5 3-.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function CollectIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="10" fill="#176FEB" />
      <circle cx="20" cy="20" r="8" fill="white" opacity="0.15" />
      <circle cx="20" cy="20" r="8" stroke="white" strokeWidth="1.5" fill="none" />
      <path d="M20 16v8M18 17.5h4a1.5 1.5 0 0 1 0 3h-4M18 20.5h3.5a1.5 1.5 0 0 1 0 3H18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function MaintainIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="10" fill="#176FEB" />
      <path d="M16 14a6 6 0 0 1 8.5 8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <path d="M24.5 22.5l4.5 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M26.5 27l2.5-2.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <rect x="11" y="22" width="9" height="7" rx="1.5" stroke="white" strokeWidth="1.5" fill="none" />
      <path d="M14 22v-2a1.5 1.5 0 0 1 3 0v2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/* ── Owner Portal ─────────────────────────────────────────────────────────── */

export function OwnerPortalIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="10" fill="#176FEB" />
      <rect x="9" y="10" width="22" height="16" rx="2.5" fill="white" opacity="0.2" />
      <rect x="9" y="10" width="22" height="16" rx="2.5" stroke="white" strokeWidth="1.5" fill="none" />
      <path d="M9 15h22" stroke="white" strokeWidth="1" opacity="0.3" />
      <rect x="12" y="17" width="7" height="6" rx="1" fill="white" opacity="0.3" />
      <rect x="21" y="17" width="7" height="3" rx="0.5" fill="white" opacity="0.2" />
      <rect x="21" y="21.5" width="7" height="2" rx="0.5" fill="white" opacity="0.15" />
      <path d="M16 30h8M20 26v4" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  )
}
