import type { Metadata } from 'next'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'
import { DocumentVaultClient } from './client'

export const metadata: Metadata = {
  title: 'Document Vault — Secure Digital Safe for Tenants & Owners | Revun',
  description:
    'All rental documents in one encrypted vault. Government ID verification, immigration docs, credit reports, income verification, pay stubs, bank statements, and vehicle ownership — verified and reusable.',
  alternates: { canonical: buildCanonicalUrl('/features/document-vault') },
  openGraph: {
    title: 'Document Vault | Revun',
    description:
      'Your secure digital safe. Upload, verify, and reuse rental documents across applications. Identity verification, credit reports, and income proof in one place.',
    url: buildCanonicalUrl('/features/document-vault'),
  },
}

export default function DocumentVaultPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Features', url: 'https://revun.com/features/' },
              { name: 'Document Vault', url: 'https://revun.com/features/document-vault/' },
            ])
          ),
        }}
      />
      <DocumentVaultClient />
    </>
  )
}
