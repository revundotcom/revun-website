import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/metadata';

const url = (path: string) => `${SITE_URL}${path}`;
const d = new Date('2026-05-21');

/* Helper to generate entries from slug arrays */
function pages(
  prefix: string,
  slugs: string[],
  opts: { changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number },
): MetadataRoute.Sitemap {
  return slugs.map((s) => ({
    url: url(`${prefix}${s}/`),
    lastModified: d,
    changeFrequency: opts.changeFrequency,
    priority: opts.priority,
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // ─── Core ───────────────────────────────────────────────────────
    { url: url('/'), lastModified: d, changeFrequency: 'weekly', priority: 1.0 },
    { url: url('/pricing/'), lastModified: d, changeFrequency: 'weekly', priority: 0.9 },
    { url: url('/about/'), lastModified: d, changeFrequency: 'monthly', priority: 0.7 },
    { url: url('/contact/'), lastModified: d, changeFrequency: 'monthly', priority: 0.7 },
    { url: url('/resources/'), lastModified: d, changeFrequency: 'weekly', priority: 0.7 },
    { url: url('/demo/'), lastModified: d, changeFrequency: 'monthly', priority: 0.8 },
    { url: url('/events/'), lastModified: d, changeFrequency: 'monthly', priority: 0.6 },

    // ─── Entity / Branded ───────────────────────────────────────────
    { url: url('/what-is-revun/'), lastModified: d, changeFrequency: 'monthly', priority: 0.8 },
    { url: url('/powered-by-revun/'), lastModified: d, changeFrequency: 'monthly', priority: 0.8 },
    { url: url('/how-revun-works/'), lastModified: d, changeFrequency: 'monthly', priority: 0.8 },
    { url: url('/why-revun/'), lastModified: d, changeFrequency: 'monthly', priority: 0.8 },

    // ─── Solutions ──────────────────────────────────────────────────
    { url: url('/solutions/'), lastModified: d, changeFrequency: 'weekly', priority: 0.9 },
    ...pages('/solutions/', [
      'self-managing-owners', 'property-management-companies', 'brokerages',
      'leasing-companies', 'maintenance-companies', 'reits', 'tenants', 'internal-ops-teams',
    ], { changeFrequency: 'monthly', priority: 0.8 }),

    // ─── Industries hub (sub-pages render as in-page sections) ──────
    { url: url('/industries/'), lastModified: d, changeFrequency: 'weekly', priority: 0.8 },

    // ─── Self-Manage ────────────────────────────────────────────────
    { url: url('/self-manage/'), lastModified: d, changeFrequency: 'weekly', priority: 0.9 },
    ...pages('/self-manage/', [
      'pricing', 'how-it-works', 'add-ons', 'get-started', 'faq',
    ], { changeFrequency: 'monthly', priority: 0.7 }),

    // ─── Use Cases hub (sub-pages render as in-page sections) ───────
    { url: url('/use-cases/'), lastModified: d, changeFrequency: 'weekly', priority: 0.8 },

    // ─── Features ───────────────────────────────────────────────────
    { url: url('/features/'), lastModified: d, changeFrequency: 'weekly', priority: 0.8 },
    ...pages('/features/', [
      'accounting', 'ai-automation', 'communications', 'compliance', 'dashboards',
      'document-vault', 'lease-management', 'leasing', 'maintenance', 'owner-portal',
      'rent-collection', 'roommates', 'tenant-portal', 'tenant-screening',
    ], { changeFrequency: 'monthly', priority: 0.7 }),

    // ─── Category Landing Pages ───────────────────────────────────────
    { url: url('/owner-portal/'), lastModified: d, changeFrequency: 'monthly', priority: 0.8 },
    { url: url('/property-operations-software/'), lastModified: d, changeFrequency: 'monthly', priority: 0.8 },
    { url: url('/real-estate-communications-software/'), lastModified: d, changeFrequency: 'monthly', priority: 0.8 },
    { url: url('/ai-property-management-software/'), lastModified: d, changeFrequency: 'monthly', priority: 0.8 },
    { url: url('/property-management-operating-system/'), lastModified: d, changeFrequency: 'monthly', priority: 0.8 },
    { url: url('/property-management-software/'), lastModified: d, changeFrequency: 'monthly', priority: 0.8 },
    { url: url('/leasing-software/'), lastModified: d, changeFrequency: 'monthly', priority: 0.8 },
    { url: url('/brokerage-software/'), lastModified: d, changeFrequency: 'monthly', priority: 0.8 },
    { url: url('/maintenance-management-software/'), lastModified: d, changeFrequency: 'monthly', priority: 0.8 },
    { url: url('/tenant-portal-software/'), lastModified: d, changeFrequency: 'monthly', priority: 0.8 },
    { url: url('/accounting/'), lastModified: d, changeFrequency: 'monthly', priority: 0.7 },

    // ─── Audience ────────────────────────────────────────────────────
    { url: url('/operators/'), lastModified: d, changeFrequency: 'monthly', priority: 0.7 },
    { url: url('/tenants/'), lastModified: d, changeFrequency: 'monthly', priority: 0.7 },
    { url: url('/investment/'), lastModified: d, changeFrequency: 'monthly', priority: 0.7 },
    { url: url('/coverage/'), lastModified: d, changeFrequency: 'monthly', priority: 0.7 },

    // ─── Tenant / Travel / Relocation ───────────────────────────────
    { url: url('/traveling-tenants/'), lastModified: d, changeFrequency: 'monthly', priority: 0.7 },
    { url: url('/relocation-rentals/'), lastModified: d, changeFrequency: 'monthly', priority: 0.7 },
    { url: url('/furnished-rentals/'), lastModified: d, changeFrequency: 'monthly', priority: 0.7 },
    { url: url('/corporate-housing/'), lastModified: d, changeFrequency: 'monthly', priority: 0.7 },

    // ─── Wallet ─────────────────────────────────────────────────────
    { url: url('/wallet/'), lastModified: d, changeFrequency: 'monthly', priority: 0.7 },
    { url: url('/wallet/pay/'), lastModified: d, changeFrequency: 'monthly', priority: 0.6 },
    { url: url('/wallet/receipt/'), lastModified: d, changeFrequency: 'monthly', priority: 0.6 },

    // ─── Compare ────────────────────────────────────────────────────
    { url: url('/compare/'), lastModified: d, changeFrequency: 'weekly', priority: 0.8 },

    // ─── Integrations ───────────────────────────────────────────────
    { url: url('/integrations/'), lastModified: d, changeFrequency: 'weekly', priority: 0.8 },
    ...pages('/integrations/', [
      'quickbooks', 'xero', 'sage-intacct', 'netsuite', 'zoho-books', 'zoho-crm', 'zoho-desk',
      'salesforce', 'hubspot', 'pipedrive',
      'twilio', 'ringcentral', 'openphone', 'dialpad', 'aircall', 'zoom-phone',
      'intercom', 'zendesk', 'freshdesk',
      'stripe', 'plaid', 'interac', 'klarna', 'affirm', 'paybright',
      'persona', 'trustii', 'flinks', 'singlekey-integration',
      'equifax', 'transunion', 'checkr',
      'docusign', 'dropbox-sign', 'adobe-sign',
      'slack', 'zapier', 'make',
      'microsoft-365', 'google-workspace', 'calendly', 'google-calendar',
      'google-maps', 'mapbox',
      'brokerbay', 'mls-idx',
    ], { changeFrequency: 'monthly', priority: 0.6 }),

    // ─── Support ────────────────────────────────────────────────────
    { url: url('/help/'), lastModified: d, changeFrequency: 'monthly', priority: 0.6 },
    { url: url('/support/'), lastModified: d, changeFrequency: 'monthly', priority: 0.6 },
    { url: url('/support/powered-by-revun/'), lastModified: d, changeFrequency: 'monthly', priority: 0.6 },
    { url: url('/support/self-manage/'), lastModified: d, changeFrequency: 'monthly', priority: 0.6 },

    // ─── Canada (province hubs only; city sub-routes not yet built) ──
    { url: url('/ca/'), lastModified: d, changeFrequency: 'weekly', priority: 0.8 },
    ...pages('/ca/', [
      'ontario', 'british-columbia', 'quebec', 'alberta', 'nova-scotia', 'manitoba',
      'saskatchewan', 'new-brunswick', 'prince-edward-island', 'newfoundland-and-labrador',
    ], { changeFrequency: 'monthly', priority: 0.7 }),

    // ─── United States (state hubs only; city sub-routes not yet built) ──
    { url: url('/us/'), lastModified: d, changeFrequency: 'weekly', priority: 0.8 },
    ...pages('/us/', [
      'florida', 'texas', 'california', 'new-york', 'illinois', 'georgia',
      'north-carolina', 'arizona', 'colorado', 'new-jersey', 'virginia',
      'washington', 'nevada', 'pennsylvania', 'ohio', 'michigan', 'massachusetts', 'tennessee',
    ], { changeFrequency: 'monthly', priority: 0.7 }),

    // ─── Legal ──────────────────────────────────────────────────────
    { url: url('/privacy/'), lastModified: d, changeFrequency: 'yearly', priority: 0.3 },
    { url: url('/terms/'), lastModified: d, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
