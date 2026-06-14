import Link from 'next/link';
import JsonLd from './JsonLd';
import { breadcrumb } from '@/lib/seo/jsonld';
import styles from './Breadcrumbs.module.css';

type Crumb = { name: string; path: string };

/**
 * Breadcrumb trail. Pages pass `items` with RELATIVE app paths (e.g. `/`,
 * `/odezhda`). Links use those relative paths so navigation stays client-side
 * (Next `<Link>` handles basePath). The emitted BreadcrumbList JSON-LD rebuilds
 * absolute urls from SITE.url so the structured data stays canonical. The last
 * item is rendered as plain text (current page), others as links.
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
              <li key={item.path} className={styles.item}>
                {isLast ? (
                  <span className={styles.current} aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.path} className={styles.link}>
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
