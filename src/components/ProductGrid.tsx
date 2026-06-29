import type { Product } from '@/data/types';
import ProductCard from './ProductCard';
import styles from './ProductGrid.module.css';

/** Сетка товаров: 4 колонки с бордерами в стиле C (4→2→1 по ширине). */
export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className={styles.grid}>
      {products.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}
