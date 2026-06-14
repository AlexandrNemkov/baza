import Link from 'next/link';
import type { Category } from '@/data/types';
import styles from './CategoryTile.module.css';

/**
 * Large category entry tile. Renders a 3/4 image block (cover color or a
 * neutral placeholder) with the category name overlaid in the corner.
 * Links to the top-level category route `/<slug>`.
 */
export default function CategoryTile({ category }: { category: Category }) {
  const hasCover = Boolean(category.cover);

  return (
    <Link href={`/${category.slug}`} className={styles.tile}>
      <div
        className={styles.image}
        style={{ background: category.cover ?? '#E6E4DF' }}
      >
        <span
          className={`${styles.name} ${hasCover ? styles.nameOnImage : ''}`}
        >
          {category.name}
        </span>
      </div>
    </Link>
  );
}
