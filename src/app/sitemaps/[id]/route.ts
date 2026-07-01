import { sitemapGroups, sitemapGroupIds, urlsetXml } from '@/lib/sitemap-data';

/* Per-silo child sitemaps → /sitemaps/{id}.xml (e.g. /sitemaps/laws.xml). */
export function generateStaticParams() {
  return sitemapGroupIds.map((id) => ({ id: `${id}.xml` }));
}

export const dynamicParams = false;

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const key = id.replace(/\.xml$/, '');
  const group = sitemapGroups[key];
  if (!group) return new Response('Not found', { status: 404 });
  return new Response(urlsetXml(group()), {
    headers: { 'Content-Type': 'application/xml', 'Cache-Control': 'public, max-age=3600, s-maxage=3600' },
  });
}
