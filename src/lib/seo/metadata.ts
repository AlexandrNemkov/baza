import type { Metadata } from 'next';
import { SITE } from './config';

type BuildMetadataArgs = {
  title?: string;
  description?: string;
  path: string;
};

/**
 * Central metadata builder. noindex is enforced unconditionally — this is a
 * private/staging storefront and must never be indexable, so `robots` is
 * always `{ index: false, follow: false }` and is intentionally not overridable.
 */
export function buildMetadata({
  title,
  description,
  path,
}: BuildMetadataArgs): Metadata {
  const resolvedTitle = title ?? SITE.title;
  const resolvedDescription = description ?? SITE.description;
  const canonical = SITE.url + path;

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    robots: { index: false, follow: false },
    alternates: { canonical },
    openGraph: {
      type: 'website',
      title: resolvedTitle,
      description: resolvedDescription,
      url: canonical,
      siteName: SITE.name,
      locale: SITE.locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description: resolvedDescription,
    },
  };
}
