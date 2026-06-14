import { describe, it, expect } from 'vitest';
import {
  applyFilters,
  emptyFilterState,
  facetOptions,
  type FilterState,
} from '@/lib/filter';
import type { Product } from '@/data/types';

// Minimal product factory: only the fields applyFilters reads matter.
function makeProduct(over: Partial<Product> & { slug: string }): Product {
  return {
    slug: over.slug,
    title: over.title ?? over.slug,
    brandSlug: over.brandSlug ?? 'volchok',
    category: over.category ?? 'odezhda',
    subcategory: over.subcategory,
    price: over.price ?? 1000,
    sizes: over.sizes ?? ['M'],
    colors: over.colors ?? ['Чёрный'],
    images: over.images ?? [],
    description: over.description ?? '',
    composition: over.composition ?? '',
    care: over.care ?? '',
    sizeChart: over.sizeChart ?? '',
    faq: over.faq ?? [],
  };
}

const products: Product[] = [
  makeProduct({ slug: 'a', brandSlug: 'volchok', category: 'odezhda', subcategory: 'rubashki', price: 1000, sizes: ['S', 'M'], colors: ['Чёрный'] }),
  makeProduct({ slug: 'b', brandSlug: 'tgrunge', category: 'odezhda', subcategory: 'bryuki', price: 2000, sizes: ['M', 'L'], colors: ['Белый', 'Синий'] }),
  makeProduct({ slug: 'c', brandSlug: 'lesyanebo', category: 'aksessuary', subcategory: undefined, price: 3000, sizes: ['L'], colors: ['Синий'] }),
  makeProduct({ slug: 'd', brandSlug: 'volchok', category: 'odezhda', subcategory: 'rubashki', price: 1500, sizes: ['XL'], colors: ['Чёрный', 'Белый'] }),
];

function slugs(list: Product[]): string[] {
  return list.map((p) => p.slug);
}

describe('emptyFilterState', () => {
  it('has all facets empty and price bounds null', () => {
    const f = emptyFilterState();
    expect(f).toEqual({
      brands: [],
      categories: [],
      subcategories: [],
      sizes: [],
      colors: [],
      priceMin: null,
      priceMax: null,
    });
  });

  it('returns a fresh object each call', () => {
    expect(emptyFilterState()).not.toBe(emptyFilterState());
    emptyFilterState().brands.push('x');
    expect(emptyFilterState().brands).toEqual([]);
  });
});

describe('applyFilters — empty state', () => {
  it('empty state + "new" returns all products in original order', () => {
    expect(slugs(applyFilters(products, emptyFilterState(), 'new'))).toEqual(['a', 'b', 'c', 'd']);
  });
});

describe('applyFilters — single facets', () => {
  it('filters by brand (OR within facet)', () => {
    const f: FilterState = { ...emptyFilterState(), brands: ['volchok'] };
    expect(slugs(applyFilters(products, f, 'new'))).toEqual(['a', 'd']);
    const f2: FilterState = { ...emptyFilterState(), brands: ['volchok', 'lesyanebo'] };
    expect(slugs(applyFilters(products, f2, 'new'))).toEqual(['a', 'c', 'd']);
  });

  it('filters by category', () => {
    const f: FilterState = { ...emptyFilterState(), categories: ['aksessuary'] };
    expect(slugs(applyFilters(products, f, 'new'))).toEqual(['c']);
  });

  it('filters by subcategory', () => {
    const f: FilterState = { ...emptyFilterState(), subcategories: ['rubashki'] };
    expect(slugs(applyFilters(products, f, 'new'))).toEqual(['a', 'd']);
  });

  it('filters by size (array intersection)', () => {
    const f: FilterState = { ...emptyFilterState(), sizes: ['M'] };
    expect(slugs(applyFilters(products, f, 'new'))).toEqual(['a', 'b']);
  });

  it('filters by color (array intersection)', () => {
    const f: FilterState = { ...emptyFilterState(), colors: ['Белый'] };
    expect(slugs(applyFilters(products, f, 'new'))).toEqual(['b', 'd']);
  });
});

describe('applyFilters — price bounds (inclusive)', () => {
  it('priceMin is inclusive', () => {
    const f: FilterState = { ...emptyFilterState(), priceMin: 1500 };
    expect(slugs(applyFilters(products, f, 'new'))).toEqual(['b', 'c', 'd']);
  });

  it('priceMax is inclusive', () => {
    const f: FilterState = { ...emptyFilterState(), priceMax: 1500 };
    expect(slugs(applyFilters(products, f, 'new'))).toEqual(['a', 'd']);
  });

  it('both bounds form an inclusive range', () => {
    const f: FilterState = { ...emptyFilterState(), priceMin: 1000, priceMax: 2000 };
    expect(slugs(applyFilters(products, f, 'new'))).toEqual(['a', 'b', 'd']);
  });
});

describe('applyFilters — AND across facets', () => {
  it('combines brand AND size', () => {
    const f: FilterState = { ...emptyFilterState(), brands: ['volchok'], sizes: ['S'] };
    expect(slugs(applyFilters(products, f, 'new'))).toEqual(['a']);
  });

  it('combines subcategory AND price', () => {
    const f: FilterState = { ...emptyFilterState(), subcategories: ['rubashki'], priceMin: 1200 };
    expect(slugs(applyFilters(products, f, 'new'))).toEqual(['d']);
  });

  it('returns [] when facets cannot be satisfied together', () => {
    const f: FilterState = { ...emptyFilterState(), brands: ['lesyanebo'], subcategories: ['rubashki'] };
    expect(slugs(applyFilters(products, f, 'new'))).toEqual([]);
  });
});

describe('applyFilters — sorting', () => {
  it('price-asc sorts ascending by price', () => {
    expect(slugs(applyFilters(products, emptyFilterState(), 'price-asc'))).toEqual(['a', 'd', 'b', 'c']);
  });

  it('price-desc sorts descending by price', () => {
    expect(slugs(applyFilters(products, emptyFilterState(), 'price-desc'))).toEqual(['c', 'b', 'd', 'a']);
  });

  it('"new" preserves input order (stable)', () => {
    const f: FilterState = { ...emptyFilterState(), categories: ['odezhda'] };
    expect(slugs(applyFilters(products, f, 'new'))).toEqual(['a', 'b', 'd']);
  });
});

describe('applyFilters — purity', () => {
  it('does not mutate the input array', () => {
    const before = slugs(products);
    applyFilters(products, emptyFilterState(), 'price-desc');
    expect(slugs(products)).toEqual(before);
  });

  it('returns a new array instance', () => {
    expect(applyFilters(products, emptyFilterState(), 'new')).not.toBe(products);
  });
});

describe('facetOptions', () => {
  it('returns unique, sorted brand/size/color options', () => {
    const opts = facetOptions(products);
    expect(opts.brands).toEqual(['lesyanebo', 'tgrunge', 'volchok']);
    expect(opts.sizes).toEqual(['L', 'M', 'S', 'XL']);
    expect(opts.colors).toEqual(['Белый', 'Синий', 'Чёрный']);
  });
});
