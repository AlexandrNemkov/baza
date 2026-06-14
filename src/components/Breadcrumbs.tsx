import Link from 'next/link';
import JsonLd from './JsonLd';
import { breadcrumb } from '@/lib/seo/jsonld';
import styles from './Breadcrumbs.module.css';

type Crumb = { name: string; url: string };

/**
 * Breadcrumb trail. Pages pass `items` with absolute urls (built from
 * SITE.url) so the emitted BreadcrumbList JSON-LD carries canonical links.
 * The last item is rendered as plain text (current page), others as links.
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  if (items.length === 0) return null;

  return (
    <>
      <nav aria-label="breadcrumbs" className={styles.nav}>
        <ol className={`micro ${styles.list}`}>
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={item.url} className={styles.item}>
                {isLast ? (
                  <span className={styles.current} aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.url} className={styles.link}>
                    {item.name}
                  </Link>
                )}
                {!isLast && (
                  <span className={styles.sep} aria-hidden="true">
                    —
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumb(items)} />
    </>
  );
}
