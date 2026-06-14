import Link from 'next/link';
import { getBrand } from '@/data';
import type { Product } from '@/data/types';
import styles from './ProductCard.module.css';

/**
 * Presentational product card. The page supplies the product; the card
 * resolves the brand display name and renders a color-swatch placeholder
 * for the (not-yet-wired) hero photo.
 */
export default function ProductCard({ product }: { product: Product }) {
  const brandName = getBrand(product.brandSlug)?.name ?? product.brandSlug;
  const cover = product.images[0];

  return (
    <Link href={`/product/${product.slug}`} className={styles.card}>
      <div
        className={styles.imageWrap}
        style={{ background: cover?.color ?? 'var(--line-strong)' }}
      >
        {cover?.label && <span className={styles.placeholder}>{cover.label}</span>}
      </div>
      <div className={styles.body}>
        <span className={`micro ${styles.brand}`}>{brandName}</span>
        <span className={styles.title}>{product.title}</span>
        <span className={styles.price}>
          {product.price.toLocaleString('ru-RU')} ₽
        </span>
      </div>
    </Link>
  );
}
