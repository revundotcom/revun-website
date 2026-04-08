import { SITE_URL } from '@/lib/metadata'

export interface BreadcrumbItem {
  name: string
  url: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface LocalBusinessData {
  name: string
  city: string
  province: string
  country: string
}

export interface WebPageData {
  name: string
  description: string
  url: string
}

export function buildOrganizationSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Revun',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@revun.com',
      contactType: 'customer support',
      availableLanguage: 'English',
    },
  }
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function buildFAQPageSchema(faqs: FAQItem[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function buildLocalBusinessSchema(data: LocalBusinessData): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: data.name,
    url: SITE_URL,
    address: {
      '@type': 'PostalAddress',
      addressLocality: data.city,
      addressRegion: data.province,
      addressCountry: data.country,
    },
    areaServed: {
      '@type': 'City',
      name: data.city,
    },
  }
}

export function buildWebPageSchema(data: WebPageData): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: data.name,
    description: data.description,
    url: data.url,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Revun',
      url: SITE_URL,
    },
  }
}
