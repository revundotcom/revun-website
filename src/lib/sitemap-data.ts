import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/metadata';
import { caCities } from '@/data/ca-cities';
import { usCities } from '@/data/us-cities';
import { competitorSlugs } from '@/data/competitors';
import { blogSlugs } from '@/data/blog-posts';
import { stateLawSlugs } from '@/data/state-laws';
import { toolSlugs } from '@/data/tools';
import { glossarySlugs } from '@/data/glossary';
import { formSlugs } from '@/data/forms';
import { evictionSlugs } from '@/data/evictions';

export type Entry = MetadataRoute.Sitemap[number];
type Freq = Entry['changeFrequency'];

const url = (path: string) => `${SITE_URL}${path}`;
export const SITEMAP_DATE = new Date('2026-06-07');
const d = SITEMAP_DATE;

function pages(prefix: string, slugs: string[], opts: { changeFrequency: Freq; priority: number }): MetadataRoute.Sitemap {
  return slugs.map((s) => ({ url: url(`${prefix}${s}/`), lastModified: d, changeFrequency: opts.changeFrequency, priority: opts.priority }));
}
const e = (path: string, priority: number, changeFrequency: Freq = 'monthly'): Entry => ({ url: url(path), lastModified: d, changeFrequency, priority });

/** Typed child sitemaps, one per silo. Keys become /sitemaps/{key}.xml */
export const sitemapGroups: Record<string, () => MetadataRoute.Sitemap> = {
  core: () => [
    e('/', 1.0, 'weekly'), e('/pricing/', 0.9, 'weekly'), e('/reviews/', 0.8, 'weekly'),
    e('/about/', 0.7), e('/contact/', 0.7), e('/demo/', 0.8), e('/events/', 0.6),
    e('/what-is-revun/', 0.8), e('/powered-by-revun/', 0.8), e('/how-revun-works/', 0.8), e('/why-revun/', 0.8),
    e('/operators/', 0.7), e('/tenants/', 0.7), e('/investment/', 0.7), e('/coverage/', 0.7),
    e('/traveling-tenants/', 0.7), e('/relocation-rentals/', 0.7), e('/furnished-rentals/', 0.7), e('/corporate-housing/', 0.7),
    e('/wallet/', 0.7), e('/wallet/pay/', 0.6), e('/wallet/receipt/', 0.6),
    e('/help/', 0.6), e('/support/', 0.6), e('/support/powered-by-revun/', 0.6), e('/support/self-manage/', 0.6),
    e('/privacy/', 0.3, 'yearly'), e('/terms/', 0.3, 'yearly'),
    e('/owner-portal/', 0.8), e('/property-operations-software/', 0.8), e('/real-estate-communications-software/', 0.8),
    e('/ai-property-management-software/', 0.8), e('/property-management-operating-system/', 0.8), e('/property-management-software/', 0.8),
    e('/leasing-software/', 0.8), e('/brokerage-software/', 0.8), e('/maintenance-management-software/', 0.8),
    e('/tenant-portal-software/', 0.8), e('/accounting/', 0.7),
  ],
  product: () => [
    e('/features/', 0.8, 'weekly'),
    ...pages('/features/', ['accounting','ai-automation','communications','compliance','dashboards','document-vault','lease-management','leasing','maintenance','owner-portal','rent-collection','roommates','tenant-portal','tenant-screening'], { changeFrequency: 'monthly', priority: 0.7 }),
    e('/use-cases/', 0.8, 'weekly'),
    ...pages('/use-cases/', ['tenant-screening','rent-collection','lease-management','maintenance-management','property-listing','showing-scheduling','owner-reporting','vendor-management','document-automation','communication-hub','accounting-integration','compliance-tracking'], { changeFrequency: 'monthly', priority: 0.7 }),
  ],
  'solutions-industries': () => [
    e('/solutions/', 0.9, 'weekly'),
    ...pages('/solutions/', ['self-managing-owners','property-management-companies','brokerages','leasing-companies','maintenance-companies','reits','tenants','internal-ops-teams'], { changeFrequency: 'monthly', priority: 0.8 }),
    e('/industries/', 0.8, 'weekly'),
    ...pages('/industries/', ['reits-and-asset-managers','single-family-operators','multifamily-operators','student-housing','senior-living','vacation-rentals','commercial-property','affordable-housing','military-housing','mixed-use'], { changeFrequency: 'monthly', priority: 0.7 }),
  ],
  'self-manage': () => [
    e('/self-manage/', 0.9, 'weekly'),
    ...pages('/self-manage/', ['pricing','how-it-works','add-ons','get-started','faq','first-time-landlord','condo-landlord','house-landlord','furnished-rental','relocation-landlord','small-portfolio','investor-owner'], { changeFrequency: 'monthly', priority: 0.7 }),
  ],
  compare: () => [e('/compare/', 0.8, 'weekly'), ...pages('/compare/', competitorSlugs, { changeFrequency: 'monthly', priority: 0.8 })],
  laws: () => [e('/laws/', 0.8, 'weekly'), ...pages('/laws/', stateLawSlugs, { changeFrequency: 'monthly', priority: 0.7 })],
  evictions: () => [e('/evictions/', 0.8, 'weekly'), ...pages('/evictions/', evictionSlugs, { changeFrequency: 'monthly', priority: 0.7 })],
  forms: () => [e('/forms/', 0.7, 'weekly'), ...pages('/forms/', formSlugs, { changeFrequency: 'monthly', priority: 0.6 })],
  glossary: () => [e('/glossary/', 0.7), ...pages('/glossary/', glossarySlugs, { changeFrequency: 'monthly', priority: 0.5 })],
  tools: () => [e('/tools/', 0.7), ...pages('/tools/', toolSlugs, { changeFrequency: 'monthly', priority: 0.6 })],
  resources: () => [
    e('/resources/', 0.7, 'weekly'),
    ...pages('/resources/', blogSlugs, { changeFrequency: 'monthly', priority: 0.6 }),
    e('/reports/2026-rental-market-report/', 0.7),
  ],
  integrations: () => [
    e('/integrations/', 0.8, 'weekly'),
    ...pages('/integrations/', ['quickbooks','salesforce','twilio','docusign','stripe','zapier'], { changeFrequency: 'monthly', priority: 0.6 }),
  ],
  'locations-us': () => [
    e('/us/', 0.8, 'weekly'),
    ...pages('/us/', ['florida','texas','california','new-york','illinois','georgia','north-carolina','arizona','colorado','new-jersey','virginia','washington','nevada','pennsylvania','ohio','michigan','massachusetts','tennessee'], { changeFrequency: 'monthly', priority: 0.7 }),
    ...usCities.map((c) => ({ url: url(`/us/${c.stateSlug}/${c.slug}/`), lastModified: d, changeFrequency: 'monthly' as const, priority: 0.6 })),
  ],
  'locations-ca': () => [
    e('/ca/', 0.8, 'weekly'),
    ...pages('/ca/', ['ontario','british-columbia','quebec','alberta','nova-scotia','manitoba','saskatchewan','new-brunswick','prince-edward-island','newfoundland-and-labrador'], { changeFrequency: 'monthly', priority: 0.7 }),
    ...caCities.map((c) => ({ url: url(`/ca/${c.provinceSlug}/${c.slug}/`), lastModified: d, changeFrequency: 'monthly' as const, priority: 0.6 })),
  ],
};

export const sitemapGroupIds = Object.keys(sitemapGroups);
export const sitemapIndexUrl = (id: string) => `${SITE_URL}/sitemaps/${id}.xml`;

/** Flat list of every URL (for the legacy /sitemap.xml). */
export function allSitemapEntries(): MetadataRoute.Sitemap {
  return sitemapGroupIds.flatMap((id) => sitemapGroups[id]());
}

/** Serialize a group of entries to a urlset XML string. */
export function urlsetXml(entries: MetadataRoute.Sitemap): string {
  const rows = entries.map((it) => {
    const lm = it.lastModified ? new Date(it.lastModified as Date).toISOString() : undefined;
    return `  <url><loc>${it.url}</loc>${lm ? `<lastmod>${lm}</lastmod>` : ''}${it.changeFrequency ? `<changefreq>${it.changeFrequency}</changefreq>` : ''}${typeof it.priority === 'number' ? `<priority>${it.priority}</priority>` : ''}</url>`;
  }).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows}\n</urlset>\n`;
}
