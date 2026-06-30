'use client';

import Link from 'next/link';
import { getAllProducts } from '@/data';
import type { Product } from '@/data/types';
import ProductGrid from './ProductGrid';
import { useFavorites } from '@/lib/useFavorites';
import styles from '@/app/izbrannoe/page.module.css';

/**
 * Клиентское представление страницы «Избранное». Берёт сохранённые slug из
 * localStorage-стора (useFavorites), сопоставляет с товарами в порядке
 * добавления и рисует сетку либо пустое состояние. До гидратации список пуст
 * (как на сервере), поэтому статический экспорт не ломается.
 */
export default function FavoritesView() {
  const { favorites } = useFavorites();
  const all = getAllProducts();

  const items: Product[] = favorites
    .map((slug) => all.find((p) => p.slug === slug))
    .filter((p): p is Product => Boolean(p));

  return (
    <>
      <div className={styles.titlebar}>
        <div className={styles.titlebarInner}>
          <h1 className={styles.h1}>Избранное</h1>
          <div className={`mono ${styles.meta}`}>{items.length} ВЕЩЕЙ</div>
        </div>
      </div>

      {items.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyText}>
            В избранном пока пусто. Нажмите на сердечко на карточке товара —
            и вещь сохранится сюда.
          </p>
          <Link href="/catalog" className="btn ghost">
            В каталог
          </Link>
        </div>
      ) : (
        <ProductGrid products={items} />
      )}
    </>
  );
}
