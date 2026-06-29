import Link from 'next/link';
import { getBrand } from '@/data';
import type { Product } from '@/data/types';
import Placeholder, { brandInitial } from './Placeholder';
import { sampleImage } from '@/lib/sampleImage';
import styles from './ProductCard.module.css';

/**
 * Presentational product card. The page supplies the product; the card
 * resolves the brand display name and renders an art-directed lookbook
 * placeholder for the (not-yet-wired) hero photo.
 */
export default function ProductCard({ product }: { product: Product }) {
  const brandName = getBrand(product.brandSlug)?.name ?? product.brandSlug;
  const cover = product.images[0];

  return (
    <Link href={`/product/${product.slug}`} className={styles.card}>
      <div className={styles.imageWrap}>
        <Placeholder
          className={styles.imageInner}
          tone={cover?.color}
          mark={brandInitial(brandName)}
          caption={cover?.label}
          alt={`${brandName} — ${product.title}`}
          src={cover?.src ?? sampleImage(product, 0)}
        />
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
