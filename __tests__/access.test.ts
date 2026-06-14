import { describe, it, expect } from 'vitest';
import {
  getAllProducts,
  getProduct,
  getAllBrands,
  getBrand,
  getAllCategories,
  getCategory,
  getProductsByBrand,
  getProductsByCategory,
  relatedProducts,
} from '@/data';

describe('getAllProducts / getProduct', () => {
  it('returns the full product list', () => {
    const all = getAllProducts();
    expect(all.length).toBe(12);
    expect(all.every((p) => typeof p.slug === 'string' && p.price > 0)).toBe(true);
  });

  it('finds a product by slug', () => {
    const p = getProduct('volchok-rubashka-len-natural');
    expect(p).toBeDefined();
    expect(p!.title).toBe('Льняная рубашка «Натурель»');
    expect(p!.brandSlug).toBe('volchok');
  });

  it('returns undefined for an unknown slug', () => {
    expect(getProduct('does-not-exist')).toBeUndefined();
  });
});

describe('brands', () => {
  it('returns all brands', () => {
    const brands = getAllBrands();
    expect(brands.length).toBe(3);
    expect(brands.map((b) => b.slug).sort()).toEqual(['lesyanebo', 'tgrunge', 'volchok']);
  });

  it('finds a brand by slug, undefined for unknown', () => {
    expect(getBrand('volchok')?.name).toBe('Volchok');
    expect(getBrand('nope')).toBeUndefined();
  });
});

describe('categories', () => {
  it('returns all categories', () => {
    expect(getAllCategories().length).toBe(7);
  });

  it('finds a category by slug, undefined for unknown', () => {
    expect(getCategory('odezhda')?.name).toBe('Одежда');
    expect(getCategory('rubashki')?.parentSlug).toBe('odezhda');
    expect(getCategory('nope')).toBeUndefined();
  });
});

describe('getProductsByBrand', () => {
  it('filters products by brand', () => {
    const volchok = getProductsByBrand('volchok');
    expect(volchok.length).toBeGreaterThan(0);
    expect(volchok.every((p) => p.brandSlug === 'volchok')).toBe(true);
  });

  it('returns [] for unknown brand', () => {
    expect(getProductsByBrand('nope')).toEqual([]);
  });
});

describe('getProductsByCategory', () => {
  it('filters by top-level category', () => {
    const odezhda = getProductsByCategory('odezhda');
    expect(odezhda.length).toBeGreaterThan(0);
    expect(odezhda.every((p) => p.category === 'odezhda')).toBe(true);
  });

  it('filters by category and subcategory', () => {
    const rubashki = getProductsByCategory('odezhda', 'rubashki');
    expect(rubashki.length).toBeGreaterThan(0);
    expect(rubashki.every((p) => p.category === 'odezhda' && p.subcategory === 'rubashki')).toBe(true);
  });

  it('returns [] for unknown category', () => {
    expect(getProductsByCategory('nope')).toEqual([]);
  });
});

describe('relatedProducts', () => {
  it('excludes the product itself and caps at n', () => {
    const p = getProduct('volchok-rubashka-len-natural')!;
    const related = relatedProducts(p, 4);
    expect(related.length).toBeGreaterThan(0);
    expect(related.length).toBeLessThanOrEqual(4);
    expect(related.every((r) => r.slug !== p.slug)).toBe(true);
  });

  it('prefers same subcategory', () => {
    const p = getProduct('volchok-rubashka-len-natural')!;
    const related = relatedProducts(p, 10);
    // Other рубашки exist across brands; they should appear.
    expect(related.some((r) => r.subcategory === 'rubashki')).toBe(true);
  });

  it('respects the n limit', () => {
    const p = getProduct('volchok-rubashka-len-natural')!;
    expect(relatedProducts(p, 1).length).toBe(1);
  });

  it('uses default of 4 when n is omitted', () => {
    const p = getProduct('volchok-rubashka-len-natural')!;
    expect(relatedProducts(p).length).toBeLessThanOrEqual(4);
  });
});
