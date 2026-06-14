import Breadcrumbs from '@/components/Breadcrumbs';
import BrandCard from '@/components/BrandCard';
import { getAllBrands } from '@/data';
import { buildMetadata } from '@/lib/seo/metadata';
import { SITE } from '@/lib/seo/config';
import styles from './page.module.css';

export const metadata = buildMetadata({
  title: 'Бренды',
  description: 'Российские дизайнеры на Baza',
  path: '/brands',
});

export default function BrandsPage() {
  const brands = getAllBrands();

  return (
    <div className={`container ${styles.page}`}>
      <Breadcrumbs
        items={[
          { name: 'Главная', url: SITE.url + '/' },
          { name: 'Бренды', url: SITE.url + '/brands' },
        ]}
      />
      <h1 className={styles.title}>Бренды</h1>
      <div className={styles.grid}>
        {brands.map((b) => (
          <BrandCard key={b.slug} brand={b} />
        ))}
      </div>
    </div>
  );
}
