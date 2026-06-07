import type { MetadataRoute } from 'next';
import { allSitemapEntries } from '@/lib/sitemap-data';

/* Flat sitemap at /sitemap.xml (every URL). A typed sitemap index also exists
 * at /sitemap_index.xml with per-silo child sitemaps at /sitemaps/{id}.xml. */
export default function sitemap(): MetadataRoute.Sitemap {
  return allSitemapEntries();
}
