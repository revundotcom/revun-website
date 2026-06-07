import { sitemapGroupIds, sitemapIndexUrl, SITEMAP_DATE } from '@/lib/sitemap-data';

/* Typed sitemap index → /sitemap_index.xml, listing one child sitemap per silo. */
export function GET() {
  const lastmod = SITEMAP_DATE.toISOString();
  const rows = sitemapGroupIds
    .map((id) => `  <sitemap><loc>${sitemapIndexUrl(id)}</loc><lastmod>${lastmod}</lastmod></sitemap>`)
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows}\n</sitemapindex>\n`;
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml', 'Cache-Control': 'public, max-age=3600, s-maxage=3600' },
  });
}
