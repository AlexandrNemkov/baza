import Link from 'next/link';
import type { Brand } from '@/data/types';
import styles from './BrandCard.module.css';

/** Brand entry card: letter-spaced name + short description. */
export default function BrandCard({ brand }: { brand: Brand }) {
  return (
    <Link href={`/brands/${brand.slug}`} className={styles.card}>
      <span className={styles.name}>{brand.name}</span>
      <p className={styles.desc}>{brand.description}</p>
    </Link>
  );
}
