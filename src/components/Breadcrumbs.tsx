import Link from 'next/link';
import JsonLd from './JsonLd';
import { breadcrumb } from '@/lib/seo/jsonld';
import styles from './Breadcrumbs.module.css';

type Crumb = { name: string; href: string };

/**
 * Хлебные крошки в стиле C: mono 11px uppercase, разделитель «/»,
 * последний пункт цветом --accent.
 *
 * Страницы передают `items` с относительными путями приложения.
 * JSON-LD BreadcrumbList не изменён — данные/структура сохранены.
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  if (items.length === 0) return null;

  return (
    <>
      <nav aria-label="breadcrumbs" className={styles.nav}>
        <ol className={styles.list}>
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={item.href} className={styles.item}>
                {isLast ? (
                  <span className={styles.current} aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.href} className={styles.link}>
                    {item.name}
                  </Link>
                )}
                {!isLast && (
                  <span className={styles.sep} aria-hidden="true">
                    /
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
