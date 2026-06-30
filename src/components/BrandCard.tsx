import Link from 'next/link';
import type { Brand } from '@/data/types';
import Placeholder, { brandInitial } from './Placeholder';
import { productWord } from '@/lib/pluralize';
import styles from './BrandCard.module.css';

type BrandCardProps = {
  brand: Brand;
  /** Порядковый номер в сетке (1-based). */
  index?: number;
  /** Количество вещей бренда. */
  productCount?: number;
};

/**
 * Карточка бренда в стиле C (.bgrid): фото 5/4, имя, регион/описание,
 * счётчик вещей. Гарантированно нет undefined в className.
 */
export default function BrandCard({ brand, index, productCount }: BrandCardProps) {
  const countLabel =
    productCount !== undefined
      ? `${productCount} ${productWord(productCount)}`
      : undefined;

  return (
    <div className={styles.cell}>
      <Link href={`/brands/${brand.slug}`} className={styles.link}>
        <div className={styles.photo}>
          <Placeholder
            tone={brand.cover}
            mark={brandInitial(brand.name)}
            alt={brand.name}
            ratio="5 / 4"
            className={styles.placeholder}
          />
          {index !== undefined && (
            <span className={styles.photoNo}>
              {String(index).padStart(2, '0')}
            </span>
          )}
          {countLabel && (
            <span className={styles.photoCt}>{countLabel}</span>
          )}
        </div>
        <div className={styles.nm}>{brand.name}</div>
        <div className={styles.rg}>Россия</div>
        <div className={styles.ds}>{brand.description}</div>
      </Link>
    </div>
  );
}

