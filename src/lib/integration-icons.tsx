import type { ComponentType, SVGProps } from 'react'

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { className?: string }>

/* ── Brand SVG logos ──────────────────────────────────────────────────────── */

function StripeLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="8" fill="#635BFF" />
      <path d="M18.64 16.95c0-1.05.86-1.45 2.29-1.45 2.05 0 4.63.62 6.68 1.73V11.2c-2.23-.89-4.44-1.24-6.68-1.24-5.46 0-9.09 2.85-9.09 7.62 0 7.43 10.23 6.24 10.23 9.45 0 1.24-1.08 1.64-2.59 1.64-2.24 0-5.1-.92-7.37-2.16v6.14c2.51 1.08 5.04 1.54 7.37 1.54 5.59 0 9.44-2.77 9.44-7.6-.01-8.02-10.28-6.59-10.28-9.64z" fill="white" />
    </svg>
  )
}

function QuickBooksLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="8" fill="#2CA01C" />
      <path d="M10 20a6 6 0 0 1 6-6h1v2.4h-1a3.6 3.6 0 0 0 0 7.2h1V20h2.4v6H16a6 6 0 0 1-6-6z" fill="white" />
      <path d="M30 20a6 6 0 0 1-6 6h-1v-2.4h1a3.6 3.6 0 0 0 0-7.2h-1V20h-2.4v-6H24a6 6 0 0 1 6 6z" fill="white" />
    </svg>
  )
}

function XeroLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="8" fill="#13B5EA" />
      <path d="M12.5 14l7.5 6-7.5 6M27.5 14l-7.5 6 7.5 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function TwilioLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="8" fill="#F22F46" />
      <circle cx="20" cy="20" r="10" fill="none" stroke="white" strokeWidth="2" />
      <circle cx="17" cy="17" r="2.2" fill="white" />
      <circle cx="23" cy="17" r="2.2" fill="white" />
      <circle cx="17" cy="23" r="2.2" fill="white" />
      <circle cx="23" cy="23" r="2.2" fill="white" />
    </svg>
  )
}

function DocuSignLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="8" fill="#FFCC22" />
      <path d="M12 28l4-4 3 2 5-6 4 3" stroke="#1A1A2E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="28" cy="13" r="3" fill="#1A1A2E" />
    </svg>
  )
}

function SalesforceLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="8" fill="#00A1E0" />
      <path d="M16.5 13a5.5 5.5 0 0 1 9.9 2A4.5 4.5 0 0 1 27 24H13a4 4 0 0 1-.5-7.97A5.48 5.48 0 0 1 16.5 13z" fill="white" />
    </svg>
  )
}

function HubSpotLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="8" fill="#FF7A59" />
      <circle cx="20" cy="18" r="3" stroke="white" strokeWidth="2" fill="none" />
      <path d="M20 15V11M20 21v4M23 18h4M17 18h-4" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <circle cx="27" cy="25" r="2" fill="white" />
      <line x1="23" y1="20.5" x2="25.5" y2="23.5" stroke="white" strokeWidth="1.5" />
    </svg>
  )
}

function ZapierLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="8" fill="#FF4F00" />
      <path d="M24.5 12H15l7 8-7 8h9.5l7-8-7-8z" fill="white" />
    </svg>
  )
}

function GoogleWorkspaceLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="8" fill="white" />
      <rect x="0.5" y="0.5" width="39" height="39" rx="7.5" stroke="#E5E7EB" />
      <path d="M28.6 20.2h-8.4v2.8h4.8c-.4 2.4-2.4 3.6-4.8 3.6a5.4 5.4 0 1 1 0-10.8c1.4 0 2.6.4 3.6 1.2l2-2.2A8.2 8.2 0 1 0 20.2 28.4c4.4 0 8.6-3 8.6-8.2 0-.4 0-1.2-.2-2z" fill="#4285F4" />
      <path d="M13 17.4l2.4 1.8a5.4 5.4 0 0 1 4.8-3c1.4 0 2.6.4 3.6 1.2l2-2.2A8.18 8.18 0 0 0 12 19.8c0 .4.4-1.2 1-2.4z" fill="#EA4335" />
      <path d="M20.2 28.4c2.2 0 4.2-.8 5.6-2l-2.6-2c-.8.6-1.8 1-3 1a5.36 5.36 0 0 1-5-3.6L13 23.6a8.2 8.2 0 0 0 7.2 4.8z" fill="#34A853" />
      <path d="M28.6 20.2c0-.4 0-1.2-.2-2h-8.2v2.8h4.8c-.2 1.2-.8 2-1.6 2.6l2.6 2c1.4-1.4 2.6-3.4 2.6-5.4z" fill="#4285F4" />
    </svg>
  )
}

function Microsoft365Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="8" fill="white" />
      <rect x="0.5" y="0.5" width="39" height="39" rx="7.5" stroke="#E5E7EB" />
      <rect x="11" y="11" width="8" height="8" rx="1" fill="#F25022" />
      <rect x="21" y="11" width="8" height="8" rx="1" fill="#7FBA00" />
      <rect x="11" y="21" width="8" height="8" rx="1" fill="#00A4EF" />
      <rect x="21" y="21" width="8" height="8" rx="1" fill="#FFB900" />
    </svg>
  )
}

function PlaidLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="8" fill="#111111" />
      <rect x="10" y="10" width="5" height="5" rx="1" fill="white" />
      <rect x="17.5" y="10" width="5" height="5" rx="1" fill="white" />
      <rect x="25" y="10" width="5" height="5" rx="1" fill="white" />
      <rect x="10" y="17.5" width="5" height="5" rx="1" fill="white" />
      <rect x="17.5" y="17.5" width="5" height="5" rx="1" fill="white" />
      <rect x="10" y="25" width="5" height="5" rx="1" fill="white" />
      <rect x="17.5" y="25" width="5" height="5" rx="1" fill="white" />
      <rect x="25" y="25" width="5" height="5" rx="1" fill="white" />
    </svg>
  )
}

function InteracLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="8" fill="#FDBF14" />
      <path d="M14 20a6 6 0 1 1 12 0 6 6 0 0 1-12 0z" stroke="#1A1A2E" strokeWidth="2.5" />
      <path d="M20 16v8M16 20h8" stroke="#1A1A2E" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

function SendGridLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="8" fill="#1A82E2" />
      <path d="M10 14l10 7 10-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="10" y="13" width="20" height="14" rx="2" stroke="white" strokeWidth="2" fill="none" />
    </svg>
  )
}

function CertnLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="8" fill="#4A6CF7" />
      <path d="M20 10l8 4v8c0 4.4-3.2 8.4-8 9.6-4.8-1.2-8-5.2-8-9.6v-8l8-4z" stroke="white" strokeWidth="2" fill="none" />
      <path d="M16 20l3 3 5-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function EquifaxLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="8" fill="#C41230" />
      <path d="M14 16h12M14 20h8M14 24h10" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="26" cy="24" r="3" stroke="white" strokeWidth="1.5" fill="none" />
    </svg>
  )
}

function TransUnionLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="8" fill="#0073CF" />
      <path d="M12 14h16M20 14v14" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <path d="M24 20a4 4 0 0 1 0 8h-1v-8h1z" fill="white" />
    </svg>
  )
}

function SlackLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="8" fill="white" />
      <rect x="0.5" y="0.5" width="39" height="39" rx="7.5" stroke="#E5E7EB" />
      <path d="M16 24a2 2 0 1 1-2-2h2v2zm1 0a2 2 0 1 1 2 2h-2v-2z" fill="#E01E5A" />
      <path d="M17 16a2 2 0 1 1 2-2v2h-2zm0 1a2 2 0 1 1-2 2v-2h2z" fill="#36C5F0" />
      <path d="M25 17a2 2 0 1 1 2 2h-2v-2zm-1 0a2 2 0 1 1-2-2h2v2z" fill="#2EB67D" />
      <path d="M24 25a2 2 0 1 1-2 2v-2h2zm0-1a2 2 0 1 1 2-2v2h-2z" fill="#ECB22E" />
    </svg>
  )
}

function CalendlyLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="8" fill="#006BFF" />
      <rect x="11" y="13" width="18" height="16" rx="2" stroke="white" strokeWidth="2" fill="none" />
      <path d="M11 18h18" stroke="white" strokeWidth="2" />
      <path d="M16 10v5M24 10v5" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <circle cx="20" cy="23" r="2" fill="white" />
    </svg>
  )
}

function GoogleCalendarLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="8" fill="white" />
      <rect x="0.5" y="0.5" width="39" height="39" rx="7.5" stroke="#E5E7EB" />
      <rect x="10" y="12" width="20" height="18" rx="2" fill="#4285F4" />
      <rect x="12" y="17" width="16" height="11" fill="white" />
      <path d="M15 10v5M25 10v5" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" />
      <rect x="14" y="19" width="4" height="3" rx="0.5" fill="#EA4335" />
      <rect x="22" y="19" width="4" height="3" rx="0.5" fill="#34A853" />
      <rect x="14" y="24" width="4" height="3" rx="0.5" fill="#FBBC04" />
      <rect x="22" y="24" width="4" height="3" rx="0.5" fill="#4285F4" />
    </svg>
  )
}

function GoogleMapsLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="8" fill="white" />
      <rect x="0.5" y="0.5" width="39" height="39" rx="7.5" stroke="#E5E7EB" />
      <path d="M20 10c-4.4 0-8 3.6-8 8 0 6 8 14 8 14s8-8 8-14c0-4.4-3.6-8-8-8z" fill="#EA4335" />
      <circle cx="20" cy="18" r="3" fill="white" />
    </svg>
  )
}

function MapboxLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="8" fill="#000000" />
      <circle cx="20" cy="20" r="9" stroke="white" strokeWidth="2" fill="none" />
      <path d="M16 24l4-10 4 10-8-6h8z" fill="white" />
    </svg>
  )
}

function RingCentralLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="8" fill="#F47321" />
      <path d="M15 13a7 7 0 0 1 10 0M17 17a4 4 0 0 1 6 0" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <circle cx="20" cy="22" r="2.5" fill="white" />
      <path d="M20 24.5v4" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function DialpadLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="8" fill="#7C52FF" />
      <rect x="18" y="11" width="4" height="4" rx="1" fill="white" />
      <rect x="12" y="17" width="4" height="4" rx="1" fill="white" />
      <rect x="18" y="17" width="4" height="4" rx="1" fill="white" />
      <rect x="24" y="17" width="4" height="4" rx="1" fill="white" />
      <rect x="18" y="23" width="4" height="4" rx="1" fill="white" />
    </svg>
  )
}

function OpenPhoneLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="8" fill="#0C99FF" />
      <path d="M14 12h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2V14a2 2 0 0 1 2-2z" stroke="white" strokeWidth="2" fill="none" />
      <path d="M16 22c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <circle cx="20" cy="24" r="1.5" fill="white" />
    </svg>
  )
}

function AircallLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="8" fill="#00B388" />
      <path d="M14 16c0-1.1.9-2 2-2h1l1 4-1.5 1a8.1 8.1 0 0 0 3.5 3.5L21 22l4 1v1a2 2 0 0 1-2 2A12 12 0 0 1 14 16z" fill="white" />
    </svg>
  )
}

function ZoomPhoneLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="8" fill="#2D8CFF" />
      <path d="M11 16a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2v-8z" stroke="white" strokeWidth="2" fill="none" />
      <path d="M24 17l5-2v10l-5-2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IntercomLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="8" fill="#1F8DED" />
      <rect x="11" y="11" width="18" height="16" rx="3" stroke="white" strokeWidth="2" fill="none" />
      <path d="M16 16v5M20 15v6M24 16v5" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 28l3-2h6l3 2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ZendeskLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="8" fill="#03363D" />
      <path d="M20 12v12l-8 4V16l8-4z" fill="white" opacity="0.8" />
      <path d="M20 12v12l8 4V16l-8-4z" fill="white" />
    </svg>
  )
}

function FreshdeskLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="8" fill="#25C16F" />
      <path d="M20 12a7 7 0 0 0-7 7v3h3v-3a4 4 0 0 1 8 0v3h3v-3a7 7 0 0 0-7-7z" fill="white" />
      <circle cx="16" cy="25" r="2" fill="white" />
      <circle cx="24" cy="25" r="2" fill="white" />
    </svg>
  )
}

function ZohoDeskLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="8" fill="#C8202B" />
      <path d="M12 16h16l-3 4 3 4H12l3-4-3-4z" fill="white" />
    </svg>
  )
}

function DropboxSignLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="8" fill="#0061FF" />
      <path d="M20 12l-6 4 6 4-6 4 6 4 6-4-6-4 6-4-6-4z" fill="white" />
    </svg>
  )
}

function AdobeSignLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="8" fill="#FA0F00" />
      <path d="M12 28l8-18 8 18h-5l-1.5-3.5h-3L17 28h-5zm8-11l-2 5h4l-2-5z" fill="white" />
    </svg>
  )
}

function PersonaLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="8" fill="#5865F2" />
      <circle cx="20" cy="16" r="4" stroke="white" strokeWidth="2" fill="none" />
      <path d="M12 28c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function TrustiiLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="8" fill="#0EA5E9" />
      <path d="M20 10l8 4v8c0 4.4-3.2 8.4-8 9.6-4.8-1.2-8-5.2-8-9.6v-8l8-4z" fill="white" opacity="0.2" />
      <path d="M20 10l8 4v8c0 4.4-3.2 8.4-8 9.6-4.8-1.2-8-5.2-8-9.6v-8l8-4z" stroke="white" strokeWidth="2" fill="none" />
      <path d="M16 20l3 3 5-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function FlinksLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="8" fill="#6366F1" />
      <circle cx="14" cy="20" r="3" stroke="white" strokeWidth="2" fill="none" />
      <circle cx="26" cy="20" r="3" stroke="white" strokeWidth="2" fill="none" />
      <path d="M17 20h6" stroke="white" strokeWidth="2" />
    </svg>
  )
}

function SingleKeyLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="8" fill="#14B8A6" />
      <circle cx="18" cy="18" r="5" stroke="white" strokeWidth="2" fill="none" />
      <path d="M22 22l6 6M25 28h3v-3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SageIntacctLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="8" fill="#00DC00" />
      <path d="M14 17h12M14 20h9M14 23h11" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

function NetSuiteLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="8" fill="#1B1B1B" />
      <path d="M13 26V14l14 12V14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ZohoBooksLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="8" fill="#C8202B" />
      <path d="M12 14h16v3H12zM14 20h12v2H14zM15 25h10v2H15z" fill="white" rx="1" />
    </svg>
  )
}

function PipedriveLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="8" fill="#1A1A1A" />
      <circle cx="16" cy="17" r="4" stroke="#25C26E" strokeWidth="2" fill="none" />
      <circle cx="24" cy="22" r="4" stroke="#25C26E" strokeWidth="2" fill="none" />
      <line x1="19" y1="19.5" x2="21" y2="20.5" stroke="#25C26E" strokeWidth="2" />
    </svg>
  )
}

function ZohoCRMLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="8" fill="#E42527" />
      <circle cx="20" cy="15" r="4" stroke="white" strokeWidth="2" fill="none" />
      <path d="M13 27c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function BrokerBayLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="8" fill="#1E3A5F" />
      <path d="M12 26V14l6 4-6-4 8 6 8-6-6 4 6-4v12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 20v8" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function MLSIDXLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="8" fill="#2563EB" />
      <path d="M12 26l4-12 4 8 4-6 4 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="26" r="1.5" fill="white" />
      <circle cx="16" cy="14" r="1.5" fill="white" />
      <circle cx="20" cy="22" r="1.5" fill="white" />
      <circle cx="24" cy="18" r="1.5" fill="white" />
      <circle cx="28" cy="26" r="1.5" fill="white" />
    </svg>
  )
}

function KlarnaLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="8" fill="#FFB3C7" />
      <path d="M14 12v16M18 12c0 4-2.5 7.5-6 9.5M18 12h3v16h-3" fill="#1A1A2E" />
      <circle cx="27" cy="26" r="2.5" fill="#1A1A2E" />
    </svg>
  )
}

function AffirmLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="8" fill="#0FA0EA" />
      <path d="M16 26V18a4 4 0 0 1 8 0v8" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M14 22h12" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

function PayBrightLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="8" fill="#002D72" />
      <circle cx="20" cy="20" r="7" stroke="white" strokeWidth="2" fill="none" />
      <path d="M18 16h4a2.5 2.5 0 0 1 0 5h-4v-5zM18 21h3.5a2.5 2.5 0 0 1 0 5H18v-5z" fill="white" />
    </svg>
  )
}

function DefaultLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="8" fill="#6366F1" />
      <circle cx="20" cy="20" r="8" stroke="white" strokeWidth="2" fill="none" />
      <path d="M16 20h8M20 16v8" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/* ── Icon lookup ──────────────────────────────────────────────────────────── */

export const integrationLogoMap: Record<string, IconComponent> = {
  Stripe: StripeLogo,
  QuickBooks: QuickBooksLogo,
  Xero: XeroLogo,
  Twilio: TwilioLogo,
  DocuSign: DocuSignLogo,
  Salesforce: SalesforceLogo,
  HubSpot: HubSpotLogo,
  Zapier: ZapierLogo,
  'Google Workspace': GoogleWorkspaceLogo,
  'Microsoft 365': Microsoft365Logo,
  Plaid: PlaidLogo,
  Interac: InteracLogo,
  SendGrid: SendGridLogo,
  Certn: CertnLogo,
  Equifax: EquifaxLogo,
  TransUnion: TransUnionLogo,
  Slack: SlackLogo,
  Calendly: CalendlyLogo,
  'Google Calendar': GoogleCalendarLogo,
  'Google Maps': GoogleMapsLogo,
  Mapbox: MapboxLogo,
  RingCentral: RingCentralLogo,
  Dialpad: DialpadLogo,
  OpenPhone: OpenPhoneLogo,
  Aircall: AircallLogo,
  'Zoom Phone': ZoomPhoneLogo,
  Intercom: IntercomLogo,
  Zendesk: ZendeskLogo,
  Freshdesk: FreshdeskLogo,
  'Zoho Desk': ZohoDeskLogo,
  'Dropbox Sign': DropboxSignLogo,
  'Adobe Acrobat Sign': AdobeSignLogo,
  Persona: PersonaLogo,
  Trustii: TrustiiLogo,
  Flinks: FlinksLogo,
  SingleKey: SingleKeyLogo,
  'Sage Intacct': SageIntacctLogo,
  NetSuite: NetSuiteLogo,
  'Zoho Books': ZohoBooksLogo,
  Pipedrive: PipedriveLogo,
  'Zoho CRM': ZohoCRMLogo,
  BrokerBay: BrokerBayLogo,
  'MLS/IDX': MLSIDXLogo,
  Klarna: KlarnaLogo,
  Affirm: AffirmLogo,
  PayBright: PayBrightLogo,
}

export function getIntegrationIcon(name: string): IconComponent {
  return integrationLogoMap[name] ?? DefaultLogo
}
