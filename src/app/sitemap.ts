import type { MetadataRoute } from 'next';
import { getAllProducts, getAllCategories, getAllBrands } from '@/data';
import { getAllPodborki } from '@/data/podborki';
import { getAllArticles } from '@/data/blog';
import { SITE } from '@/lib/seo/config';

// Required for `output: export` — generate the sitemap fully at build time.
export const dynamic = 'force-static';

/**
 * Full sitemap with ABSOLUTE urls built from SITE.url (which already carries
 * the basePath). Paths mirror the canonical urls emitted by buildMetadata —
 * `SITE.url + path`, no trailing slash. Harmless while the site is noindex;
 * ready to flip on at launch.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => SITE.url + path;

  const staticPaths = [
    '/',
    '/catalog',
    '/brands',
    '/podborki',
    '/blog',
    '/dostavka',
    '/oplata',
    '/vozvrat',
    '/oferta',
    '/politika',
  ];

  const categoryPaths = getAllCategories().map((c) =>
    c.parentSlug ? `/${c.parentSlug}/${c.slug}` : `/${c.slug}`,
  );
  const productPaths = getAllProducts().map((p) => `/product/${p.slug}`);
  const brandPaths = getAllBrands().map((b) => `/brands/${b.slug}`);
  const podborkaPaths = getAllPodborki().map((p) => `/podborki/${p.slug}`);
  const articlePaths = getAllArticles().map((a) => `/blog/${a.slug}`);

  const all = [
    ...staticPaths,
    ...categoryPaths,
    ...productPaths,
    ...brandPaths,
    ...podborkaPaths,
    ...articlePaths,
  ];

  return all.map((path) => ({ url: url(path) }));
}
