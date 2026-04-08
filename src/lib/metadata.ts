import type { Metadata } from 'next'
import type { SeoFields } from '@/types/sanity'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://revun.com'
const SITE_NAME = 'Revun'
const DEFAULT_OG_IMAGE = '/og-default.png'

export function generatePageMetadata({
  seo,
  path,
  fallbackTitle,
  fallbackDescription,
}: {
  seo?: SeoFields
  path: string
  fallbackTitle: string
  fallbackDescription: string
}): Metadata {
  const title = seo?.metaTitle || fallbackTitle
  const description = seo?.metaDescription || fallbackDescription
  const canonicalPath = path.endsWith('/') ? path : `${path}/`

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      images: ['/og-default.png'],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title,
      description,
      images: ['/og-default.png'],
    },
  }
}

export function withTitleTemplate(pageTitle: string): string {
  return `${pageTitle} | ${SITE_NAME}`
}

export function generateGeoMetadata({
  seo,
  path,
  fallbackTitle,
  fallbackDescription,
  geo,
}: {
  seo?: SeoFields
  path: string
  fallbackTitle: string
  fallbackDescription: string
  geo: {
    city?: string
    province?: string
    country?: string
    region?: string
  }
}): Metadata {
  const title = seo?.metaTitle || fallbackTitle
  const description = seo?.metaDescription || fallbackDescription
  const canonicalUrl = `${SITE_URL}${path.endsWith('/') ? path : `${path}/`}`

  const ogImages = seo?.ogImage
    ? [{ url: seo.ogImage.asset._ref, alt: seo.ogImage.alt || title }]
    : [{ url: `${SITE_URL}${DEFAULT_OG_IMAGE}`, alt: title }]

  return {
    title,
    description,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_CA',
      images: ogImages,
    },
    twitter: {
      card: 'summary_large_image' as const,
      title,
      description,
      images: ogImages.map((img) => img.url),
    },
    other: {
      ...(geo.city ? { 'geo.placename': geo.city } : {}),
      ...(geo.region ? { 'geo.region': geo.region } : {}),
      ...(geo.country ? { 'geo.country': geo.country } : {}),
    },
  }
}

export function generateDefaultRobots(noindex = false): Metadata['robots'] {
  if (noindex) {
    return { index: false, follow: false }
  }
  return {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  }
}
