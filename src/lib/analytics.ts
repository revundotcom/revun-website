export type GTMEvent =
  | { event: 'book_demo'; page: string; audience?: string }
  | { event: 'start_trial'; page: string; package?: string }
  | { event: 'enterprise_consultation'; page: string }
  | { event: 'self_manage_signup'; page: string; tier?: string }
  | { event: 'compare_click'; page: string; competitor: string }
  | { event: 'integration_click'; page: string; integration: string }
  | { event: 'pricing_tab_switch'; page: string; tab: string }
  | { event: 'contact_form_submit'; page: string; inquiry_type: string }
  | { event: 'scroll_depth'; page: string; depth: 25 | 50 | 75 | 100 }
  | { event: 'outbound_click'; page: string; url: string; link_text: string }
  | { event: 'phone_click'; page: string; phone_number: string }
  | { event: 'email_click'; page: string; email_address: string }
  | { event: 'newsletter_signup'; page: string; source?: string }
  | { event: 'resource_download'; page: string; resource_name: string; resource_type: string }
  | { event: 'help_article_view'; page: string; category: string; article?: string }
  | { event: 'province_page_view'; page: string; province: string; country: string }
  | { event: 'city_page_view'; page: string; city: string; province: string }
  | { event: 'support_path_click'; page: string; path: 'powered_by_revun' | 'self_manage' }
  | { event: 'faq_expand'; page: string; question: string }
  | { event: 'pricing_page_view'; page: string; source?: string }

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

export function pushEvent(event: GTMEvent): void {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({ ...event })
  }
}

function getPage(): string {
  return typeof window !== 'undefined' ? window.location.pathname : ''
}

export function trackOutboundClick(url: string, linkText: string): void {
  pushEvent({ event: 'outbound_click', page: getPage(), url, link_text: linkText })
}

export function trackDemoRequest(audience?: string): void {
  pushEvent({ event: 'book_demo', page: getPage(), audience })
}

export function trackTrialStart(pkg?: string): void {
  pushEvent({ event: 'start_trial', page: getPage(), package: pkg })
}

export function trackContactFormSubmit(inquiryType: string): void {
  pushEvent({ event: 'contact_form_submit', page: getPage(), inquiry_type: inquiryType })
}

export function trackNewsletterSignup(source?: string): void {
  pushEvent({ event: 'newsletter_signup', page: getPage(), source })
}

export function trackProvinceView(province: string, country: string): void {
  pushEvent({ event: 'province_page_view', page: getPage(), province, country })
}

export function trackCityView(city: string, province: string): void {
  pushEvent({ event: 'city_page_view', page: getPage(), city, province })
}

export function trackFAQExpand(question: string): void {
  pushEvent({ event: 'faq_expand', page: getPage(), question })
}

export function trackPricingView(source?: string): void {
  pushEvent({ event: 'pricing_page_view', page: getPage(), source })
}
