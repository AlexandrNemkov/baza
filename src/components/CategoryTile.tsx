import Link from 'next/link';
import type { Category } from '@/data/types';
import { brandInitial } from './Placeholder';
import styles from './CategoryTile.module.css';

/**
 * Large category entry tile. Renders a 3/4 art-directed plate (tonal ground +
 * oversized serif initial) with the category name overlaid in the corner.
 * Links to the top-level category route `/<slug>`.
 */
export default function CategoryTile({ category }: { category: Category }) {
  return (
    <Link href={`/${category.slug}`} className={styles.tile}>
      <div
        className={styles.image}
        style={{ background: category.cover ?? 'var(--line)' }}
      >
        <span className={styles.mark} aria-hidden="true">
          {brandInitial(category.name)}
        </span>
        <span className={styles.name}>{category.name}</span>
      </div>
    </Link>
  );
}
