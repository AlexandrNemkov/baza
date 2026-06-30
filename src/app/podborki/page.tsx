import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getAllPodborki } from '@/data/podborki';
import { buildMetadata } from '@/lib/seo/metadata';
import { asset } from '@/lib/basePath';
import styles from './page.module.css';

export const metadata = buildMetadata({
  title: 'Подборки',
  description:
    'Тематические подборки одежды и аксессуаров российских дизайнеров: готовые капсулы и сезонные образы.',
  path: '/podborki',
});

/** Стабильный хэш slug → номер фото 01–16 */
function slugImg(slug: string): string {
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = (h * 31 + slug.charCodeAt(i)) | 0;
  }
  const n = (Math.abs(h) % 16) + 1;
  return asset(`/img/p${String(n).padStart(2, '0')}.jpg`);
}

export default function PodborkiPage() {
  const podborki = getAllPodborki();

  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Главная', href: '/' },
          { name: 'Подборки', href: '/podborki' },
        ]}
      />

      {/* titlebar */}
      <div className={styles.titlebar}>
        <div className={`container ${styles.titlebarInner}`}>
          <h1 className={styles.titleH1}>Подборки</h1>
          <div className={`mono ${styles.titleMeta}`}>
            Капсулы · Образы
            <br />
            Сезон FW26
          </div>
        </div>
      </div>

      {/* grid */}
      <div className={`container ${styles.grid}`}>
        {podborki.map((p) => (
          <Link key={p.slug} href={`/podborki/${p.slug}`} className={styles.card}>
            <div className={styles.cardPhoto}>
              <img src={slugImg(p.slug)} alt={p.title} />
            </div>
            <div className={styles.cardBody}>
              <p className={styles.cardMeta}>Подборка</p>
              <p className={styles.cardTitle}>{p.title}</p>
              <p className={styles.cardText}>{p.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
