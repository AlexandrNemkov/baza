import Link from 'next/link';
import { getBrand } from '@/data';
import type { Product } from '@/data/types';
import Placeholder, { brandInitial } from './Placeholder';
import FavoriteButton from './FavoriteButton';
import { sampleImage } from '@/lib/sampleImage';
import styles from './ProductCard.module.css';

/**
 * Линейчатая ячейка каталога по дизайну C.
 * Аспект фото 4/5, hover-зум, бренд/имя/цена под фото.
 */
export default function ProductCard({ product }: { product: Product }) {
  const brandName = getBrand(product.brandSlug)?.name ?? product.brandSlug;
  const cover = product.images[0];

  // Форматирование цены с разрядными пробелами: 7 900 ₽
  const price = product.price.toLocaleString('ru-RU') + ' ₽';

  return (
    <Link href={`/product/${product.slug}`} className={styles.card}>
      <div className={styles.imageWrap}>
        <Placeholder
          tone={cover?.color}
          mark={brandInitial(brandName)}
          caption={cover?.label}
          alt={`${brandName} — ${product.title}`}
          ratio="4 / 5"
          src={cover?.src ?? sampleImage(product, 0)}
        />
        <FavoriteButton slug={product.slug} title={product.title} />
      </div>
      <span className={styles.brand}>{brandName}</span>
      <span className={styles.title}>{product.title}</span>
      <span className={styles.price}>{price}</span>
    </Link>
  );
}
