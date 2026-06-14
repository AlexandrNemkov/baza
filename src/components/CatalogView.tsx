'use client';

import { useMemo, useState } from 'react';
import type { Product } from '@/data/types';
import { getAllBrands } from '@/data';
import {
  applyFilters,
  emptyFilterState,
  facetOptions,
  type FilterState,
  type SortKey,
} from '@/lib/filter';
import ProductGrid from './ProductGrid';
import Filters from './Filters';
import styles from './CatalogView.module.css';

const SORT_LABELS: Record<SortKey, string> = {
  new: 'Новинки',
  'price-asc': 'Цена ↑',
  'price-desc': 'Цена ↓',
};

/** Count of facets currently constraining the result. */
function activeCount(f: FilterState): number {
  let n = 0;
  if (f.brands.length > 0) n += 1;
  if (f.categories.length > 0) n += 1;
  if (f.subcategories.length > 0) n += 1;
  if (f.sizes.length > 0) n += 1;
  if (f.colors.length > 0) n += 1;
  if (f.priceMin !== null || f.priceMax !== null) n += 1;
  return n;
}

/** Russian plural for «товар». */
function plural(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return 'товар';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'товара';
  return 'товаров';
}

export default function CatalogView({
  products,
  title,
}: {
  products: Product[];
  title?: string;
}) {
  const [filter, setFilter] = useState<FilterState>(emptyFilterState());
  const [sort, setSort] = useState<SortKey>('new');
  const [sheetOpen, setSheetOpen] = useState(false);

  const options = useMemo(() => facetOptions(products), [products]);
  const brandNames = useMemo(() => {
    const map: Record<string, string> = {};
    for (const b of getAllBrands()) map[b.slug] = b.name;
    return map;
  }, []);

  const results = useMemo(
    () => applyFilters(products, filter, sort),
    [products, filter, sort],
  );

  const active = activeCount(filter);

  return (
    <section className={styles.root}>
      {title && <h1 className={styles.title}>{title}</h1>}

      <div className={`${styles.bar} glass`}>
        <div className={`${styles.barInner} container`}>
          <button
            type="button"
            className={styles.filterBtn}
            onClick={() => setSheetOpen(true)}
          >
            Фильтры
            {active > 0 && <span className={styles.badge}>{active}</span>}
          </button>

          <label className={styles.sortControl}>
            <span className="micro">Сортировка</span>
            <select
              className={styles.sortSelect}
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              aria-label="Сортировка"
            >
              {(Object.keys(SORT_LABELS) as SortKey[]).map((key) => (
                <option key={key} value={key}>
                  {SORT_LABELS[key]}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className={`${styles.results} container`}>
        <p className={`micro ${styles.count}`}>
          {results.length} {plural(results.length)}
        </p>
        <ProductGrid products={results} />
      </div>

      <Filters
        options={options}
        brandNames={brandNames}
        value={filter}
        onChange={setFilter}
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
      />
    </section>
  );
}
