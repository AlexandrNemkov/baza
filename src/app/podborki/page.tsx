import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getAllPodborki } from '@/data/podborki';
import { buildMetadata } from '@/lib/seo/metadata';
import styles from '../card-list.module.css';

export const metadata = buildMetadata({
  title: 'Подборки',
  description:
    'Тематические подборки одежды и аксессуаров российских дизайнеров: готовые капсулы и сезонные образы.',
  path: '/podborki',
});

export default function PodborkiPage() {
  const podborki = getAllPodborki();

  return (
    <div className="container">
      <div className={styles.page}>
        <Breadcrumbs
          items={[
            { name: 'Главная', href: '/' },
            { name: 'Подборки', href: '/podborki' },
          ]}
        />
        <h1 className={styles.title}>Подборки</h1>

        <div className={styles.list}>
          {podborki.map((p) => (
            <Link key={p.slug} href={`/podborki/${p.slug}`} className={styles.card}>
              <p className={`micro ${styles.cardMeta}`}>Подборка</p>
              <span className={styles.cardTitle}>{p.title}</span>
              <p className={styles.cardText}>{p.summary}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
