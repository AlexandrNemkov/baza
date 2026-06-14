import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getAllArticles } from '@/data/blog';
import { buildMetadata } from '@/lib/seo/metadata';
import styles from '../card-list.module.css';

export const metadata = buildMetadata({
  title: 'Журнал',
  description:
    'Журнал Baza: статьи о базовом гардеробе, российских дизайнерах и уходе за вещами.',
  path: '/blog',
});

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

export default function BlogPage() {
  const articles = getAllArticles();

  return (
    <div className="container">
      <div className={styles.page}>
        <Breadcrumbs
          items={[
            { name: 'Главная', path: '/' },
            { name: 'Журнал', path: '/blog' },
          ]}
        />
        <h1 className={styles.title}>Журнал</h1>

        <div className={styles.list}>
          {articles.map((a) => (
            <Link key={a.slug} href={`/blog/${a.slug}`} className={styles.card}>
              <p className={`micro ${styles.cardMeta}`}>{fmtDate(a.date)}</p>
              <span className={styles.cardTitle}>{a.title}</span>
              <p className={styles.cardText}>{a.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
