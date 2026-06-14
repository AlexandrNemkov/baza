// Pure catalog filtering & sorting logic for the storefront.
// No React, no I/O — just data in, data out. Kept side-effect free so it is
// trivially testable and safe to call on every render.

import type { Product } from '@/data/types';

/**
 * Selected filter facets. An empty array (or null price bound) imposes no
 * constraint. Within a facet the selected values are combined with OR;
 * across facets the constraints are combined with AND.
 */
export type FilterState = {
  brands: string[];
  categories: string[];
  subcategories: string[];
  sizes: string[];
  colors: string[];
  priceMin: number | null;
  priceMax: number | null;
};

export type SortKey = 'new' | 'price-asc' | 'price-desc';

/** A fresh, fully-empty filter state (no constraints). */
export function emptyFilterState(): FilterState {
  return {
    brands: [],
    categories: [],
    subcategories: [],
    sizes: [],
    colors: [],
    priceMin: null,
    priceMax: null,
  };
}

/** True when at least one of `values` is present in `selected`. */
function intersects(values: string[], selected: string[]): boolean {
  return values.some((v) => selected.includes(v));
}

function matches(product: Product, f: FilterState): boolean {
  if (f.brands.length > 0 && !f.brands.includes(product.brandSlug)) return false;
  if (f.categories.length > 0 && !f.categories.includes(product.category)) return false;
  if (f.subcategories.length > 0) {
    if (product.subcategory === undefined || !f.subcategories.includes(product.subcategory)) {
      return false;
    }
  }
  if (f.sizes.length > 0 && !intersects(product.sizes, f.sizes)) return false;
  if (f.colors.length > 0 && !intersects(product.colors, f.colors)) return false;
  if (f.priceMin !== null && product.price < f.priceMin) return false;
  if (f.priceMax !== null && product.price > f.priceMax) return false;
  return true;
}

/**
 * Filters then sorts `products`. Never mutates the input array — always
 * returns a new array. 'new' preserves the input (filtered) order.
 */
export function applyFilters(products: Product[], f: FilterState, sort: SortKey): Product[] {
  const filtered = products.filter((p) => matches(p, f));

  switch (sort) {
    case 'price-asc':
      return filtered.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return filtered.sort((a, b) => b.price - a.price);
    case 'new':
    default:
      // `filter` already produced a fresh array in original order.
      return filtered;
  }
}

/**
 * Unique, sorted facet option lists derived from the products, for building
 * the filter UI. Brands/sizes/colors only — categories come from the data
 * layer where display names live.
 */
export function facetOptions(products: Product[]): {
  brands: string[];
  sizes: string[];
  colors: string[];
} {
  const brands = new Set<string>();
  const sizes = new Set<string>();
  const colors = new Set<string>();

  for (const p of products) {
    brands.add(p.brandSlug);
    for (const s of p.sizes) sizes.add(s);
    for (const c of p.colors) colors.add(c);
  }

  const sorted = (set: Set<string>) => [...set].sort((a, b) => a.localeCompare(b, 'ru'));

  // Sizes need garment progression (XS<S<M<L<XL…), not alphabetical order.
  const SIZE_RANK: Record<string, number> = { XS: 0, S: 1, M: 2, L: 3, XL: 4, XXL: 5, ONE: 99 };
  const sortedSizes = [...sizes].sort(
    (a, b) => (SIZE_RANK[a] ?? 50) - (SIZE_RANK[b] ?? 50) || a.localeCompare(b, 'ru'),
  );

  return {
    brands: sorted(brands),
    sizes: sortedSizes,
    colors: sorted(colors),
  };
}
