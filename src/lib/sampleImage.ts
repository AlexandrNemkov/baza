import type { Product } from '@/data/types';

/**
 * TEMPORARY sample imagery. Until real product photography is shot, we hotlink
 * free keyword-based photos from LoremFlickr so the demo reads like a real
 * shop. Each product gets a stable, on-theme image (keyword chosen by
 * subcategory; a slug-derived `lock` keeps it deterministic and distinct).
 *
 * Replace with real `image.src` values (own CDN / public/ assets) at launch —
 * see the spec. Nothing here is meant to ship to production.
 */

const KEYWORD_BY_SUBCATEGORY: Record<string, string> = {
  rubashki: 'shirt,fashion',
  palto: 'coat,fashion',
  platya: 'dress,fashion',
  sumki: 'handbag',
  platki: 'scarf',
};

function keywordFor(product: Product): string {
  if (product.subcategory && KEYWORD_BY_SUBCATEGORY[product.subcategory]) {
    return KEYWORD_BY_SUBCATEGORY[product.subcategory];
  }
  if (product.category === 'aksessuary') return 'accessory,fashion';
  return 'fashion,clothing';
}

/** Small stable hash of a string → non-negative integer. */
function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/**
 * Deterministic sample-photo URL for a product image at index `i`.
 * @param width / @param height — requested pixel size (cover-cropped).
 */
export function sampleImage(product: Product, i = 0, width = 640, height = 800): string {
  const lock = (hash(product.slug) % 400) + i + 1;
  return `https://loremflickr.com/${width}/${height}/${keywordFor(product)}?lock=${lock}`;
}
