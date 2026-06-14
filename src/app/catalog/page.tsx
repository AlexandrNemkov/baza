import Breadcrumbs from '@/components/Breadcrumbs';
import CatalogView from '@/components/CatalogView';
import JsonLd from '@/components/JsonLd';
import { getAllProducts } from '@/data';
import { buildMetadata } from '@/lib/seo/metadata';
import { itemList } from '@/lib/seo/jsonld';

export const metadata = buildMetadata({
  title: 'Каталог',
  description: 'Каталог одежды и аксессуаров российских дизайнеров',
  path: '/catalog',
});

export default function CatalogPage() {
  const products = getAllProducts();

  return (
    <>
      <div className="container">
        <Breadcrumbs
          items={[
            { name: 'Главная', path: '/' },
            { name: 'Каталог', path: '/catalog' },
          ]}
        />
      </div>
      <CatalogView products={products} title="Каталог" />
      <JsonLd data={itemList(products)} />
    </>
  );
}
