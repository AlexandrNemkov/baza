/**
 * Prefixes a non-`<Link>` asset path (image, font, file) with the app's
 * basePath so it resolves correctly when the site is served from a subpath
 * (e.g. GitHub Pages `/baza`). Route navigation should always use Next
 * `<Link>`, which already handles basePath.
 */
export const asset = (p: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${p}`;
