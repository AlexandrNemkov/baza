// Pure data-access helpers over the mock catalog JSON.
// No side effects, no caching, no I/O — just typed reads/filters.

import brandsJson from './brands.json';
import categoriesJson from './categories.json';
import productsJson from './products.json';
import type { Brand, Category, Product } from './types';

const brands = brandsJson as Brand[];
const categories = categoriesJson as Category[];
const products = productsJson as Product[];

export function getAllProducts(): Product[] {
  return products;
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAllBrands(): Brand[] {
  return brands;
}

export function getBrand(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}

export function getAllCategories(): Category[] {
  return categories;
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProductsByBrand(brandSlug: string): Product[] {
  return products.filter((p) => p.brandSlug === brandSlug);
}

export function getProductsByCategory(
  category: string,
  subcategory?: string,
): Product[] {
  return products.filter(
    (p) =>
      p.category === category &&
      (subcategory === undefined || p.subcategory === subcategory),
  );
}

/**
 * Suggests related products by progressively widening the net:
 * same subcategory first, then same category, then same brand.
 * Always excludes `product` itself and returns at most `n`.
 */
export function relatedProducts(product: Product, n = 4): Product[] {
  const others = products.filter((p) => p.slug !== product.slug);
  const seen = new Set<string>();
  const result: Product[] = [];

  const tiers: ((p: Product) => boolean)[] = [
    (p) => product.subcategory !== undefined && p.subcategory === product.subcategory,
    (p) => p.category === product.category,
    (p) => p.brandSlug === product.brandSlug,
  ];

  for (const matches of tiers) {
    for (const p of others) {
      if (result.length >= n) break;
      if (seen.has(p.slug)) continue;
      if (matches(p)) {
        seen.add(p.slug);
        result.push(p);
      }
    }
    if (result.length >= n) break;
  }

  return result;
}
