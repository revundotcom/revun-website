import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/metadata';

const url = (path: string) => `${SITE_URL}${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // Core
    { url: url('/'), lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: url('/platform/'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: url('/pricing/'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: url('/about/'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: url('/contact/'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },

    // Solutions
    { url: url('/solutions/'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: url('/solutions/self-managing-owners/'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: url('/solutions/property-managers/'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: url('/solutions/brokerages/'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: url('/solutions/leasing/'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: url('/solutions/maintenance/'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: url('/solutions/investors/'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },

    // Compare
    { url: url('/compare/'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: url('/compare/singlekey/'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: url('/compare/buildium/'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: url('/compare/appfolio/'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: url('/compare/propertyware/'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: url('/compare/liv-rent/'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: url('/compare/rhenti/'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: url('/compare/frontlobby/'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },

    // Integrations
    { url: url('/integrations/'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: url('/integrations/stripe/'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: url('/integrations/quickbooks/'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: url('/integrations/xero/'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: url('/integrations/equifax/'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: url('/integrations/transunion/'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: url('/integrations/twilio/'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: url('/integrations/docusign/'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: url('/integrations/salesforce/'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: url('/integrations/hubspot/'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: url('/integrations/zapier/'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: url('/integrations/google-workspace/'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: url('/integrations/microsoft-365/'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },

    // Geographic: Canada
    { url: url('/ca/'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: url('/ca/ontario/'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: url('/ca/british-columbia/'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: url('/ca/quebec/'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: url('/ca/alberta/'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: url('/ca/nova-scotia/'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: url('/ca/manitoba/'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: url('/ca/ontario/toronto/'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: url('/ca/british-columbia/vancouver/'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: url('/ca/alberta/calgary/'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },

    // Geographic: US
    { url: url('/us/'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },

    // Self-manage
    { url: url('/self-manage/'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: url('/self-manage/how-it-works/'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },

    // Resources & Support
    { url: url('/resources/'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: url('/help/'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: url('/support/'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },

    // Legal
    { url: url('/privacy/'), lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: url('/terms/'), lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];
}
