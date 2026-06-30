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

const PAGE_SIZE = 12;

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

export default function CatalogView({
  products,
}: {
  products: Product[];
  /** @deprecated title переехал в page-уровень; проп оставлен для совместимости */
  title?: string;
}) {
  const [filter, setFilter] = useState<FilterState>(emptyFilterState());
  const [sort, setSort] = useState<SortKey>('new');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

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
  const visible = results.slice(0, visibleCount);
  const hasMore = visibleCount < results.length;

  // Сбрасываем пагинацию при смене фильтра/сортировки
  const handleFilterChange = (next: FilterState) => {
    setFilter(next);
    setVisibleCount(PAGE_SIZE);
  };
  const handleSortChange = (next: SortKey) => {
    setSort(next);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <section className={styles.root}>
      {/* Липкая полоса фильтров */}
      <div className={styles.filters}>
        <div className={styles.filtersInner}>
          <div className={styles.chipSet}>
            <button
              type="button"
              className={[styles.chip, active === 0 ? styles.chipAct : ''].filter(Boolean).join(' ')}
              onClick={() => handleFilterChange(emptyFilterState())}
            >
              Все
            </button>
            <button
              type="button"
              className={[styles.chip, active > 0 ? styles.chipAct : ''].filter(Boolean).join(' ')}
              onClick={() => setSheetOpen(true)}
            >
              Фильтры{active > 0 && <span className={styles.badge}>{active}</span>}
            </button>
          </div>

          <div className={styles.sort}>
            <span className="mono">Сортировка</span>
            <select
              className={styles.sortSelect}
              value={sort}
              onChange={(e) => handleSortChange(e.target.value as SortKey)}
              aria-label="Сортировка"
            >
              {(Object.keys(SORT_LABELS) as SortKey[]).map((key) => (
                <option key={key} value={key}>
                  {SORT_LABELS[key]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Сетка товаров */}
      <div className={styles.results}>
        <ProductGrid products={visible} />
      </div>

      {/* Кнопка «Показать ещё» */}
      {hasMore && (
        <div className={styles.more}>
          <button
            type="button"
            className="btn ghost"
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
          >
            Показать ещё →
          </button>
        </div>
      )}

      <Filters
        options={options}
        brandNames={brandNames}
        value={filter}
        onChange={handleFilterChange}
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
      />
    </section>
  );
}
