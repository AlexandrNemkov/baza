import Breadcrumbs from '@/components/Breadcrumbs';
import CatalogView from '@/components/CatalogView';
import JsonLd from '@/components/JsonLd';
import { getAllBrands, getAllProducts } from '@/data';
import { buildMetadata } from '@/lib/seo/metadata';
import { itemList } from '@/lib/seo/jsonld';
import styles from './page.module.css';

export const metadata = buildMetadata({
  title: 'Каталог',
  description: 'Каталог одежды и аксессуаров российских дизайнеров',
  path: '/catalog',
});

export default function CatalogPage() {
  const products = getAllProducts();
  const brands = getAllBrands();

  return (
    <>
      <div className="container">
        <Breadcrumbs
          items={[
            { name: 'Главная', href: '/' },
            { name: 'Каталог', href: '/catalog' },
          ]}
        />
      </div>

      <div className={styles.titlebar}>
        <div className={`container ${styles.titlebarInner}`}>
          <h1 className={styles.h1}>Каталог</h1>
          <div className={`mono ${styles.meta}`}>
            ВЫПУСК №01<br />{products.length} ВЕЩЕЙ · {brands.length} БРЕНДОВ
          </div>
        </div>
      </div>

      <CatalogView products={products} />
      <JsonLd data={itemList(products)} />
    </>
  );
}
