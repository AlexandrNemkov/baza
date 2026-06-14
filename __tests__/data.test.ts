import { describe, it, expect } from 'vitest';
import brands from '@/data/brands.json';
import categories from '@/data/categories.json';
import products from '@/data/products.json';
import type { Brand, Category, Product } from '@/data/types';

const brandList = brands as Brand[];
const categoryList = categories as Category[];
const productList = products as Product[];

const HEX = /^#[0-9A-Fa-f]{6}$/;

function uniqueSlugs(items: { slug: string }[]): boolean {
  const slugs = items.map((i) => i.slug);
  return new Set(slugs).size === slugs.length;
}

describe('catalog data integrity', () => {
  it('has enough records in each collection', () => {
    expect(brandList.length).toBeGreaterThanOrEqual(2);
    expect(productList.length).toBeGreaterThanOrEqual(8);
    expect(categoryList.length).toBeGreaterThan(0);
  });

  it('has unique slugs within each collection', () => {
    expect(uniqueSlugs(brandList)).toBe(true);
    expect(uniqueSlugs(categoryList)).toBe(true);
    expect(uniqueSlugs(productList)).toBe(true);
  });

  it('every product references an existing brand', () => {
    const brandSlugs = new Set(brandList.map((b) => b.slug));
    for (const p of productList) {
      expect(brandSlugs.has(p.brandSlug)).toBe(true);
    }
  });

  it('every product references an existing category, and subcategory parents match', () => {
    const bySlug = new Map(categoryList.map((c) => [c.slug, c]));
    for (const p of productList) {
      expect(bySlug.has(p.category)).toBe(true);
      if (p.subcategory) {
        const sub = bySlug.get(p.subcategory);
        expect(sub).toBeDefined();
        expect(sub!.parentSlug).toBe(p.category);
      }
    }
  });

  it('every product has valid price, sizes, images and faq', () => {
    for (const p of productList) {
      expect(p.price).toBeGreaterThan(0);
      expect(p.sizes.length).toBeGreaterThan(0);
      expect(p.images.length).toBeGreaterThan(0);
      for (const img of p.images) {
        expect(img.color).toMatch(HEX);
      }
      expect(p.faq.length).toBeGreaterThan(0);
    }
  });
});
