import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import CatalogView from '@/components/CatalogView';
import JsonLd from '@/components/JsonLd';
import { getAllCategories, getCategory, getProductsByCategory } from '@/data';
import { buildMetadata } from '@/lib/seo/metadata';
import { itemList } from '@/lib/seo/jsonld';
import styles from './page.module.css';

type Params = { category: string };

export function generateStaticParams() {
  return getAllCategories()
    .filter((c) => !c.parentSlug)
    .map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat || cat.parentSlug) return buildMetadata({ path: '/' + category });
  return buildMetadata({
    title: cat.name,
    description: `${cat.name} от российских дизайнеров`,
    path: '/' + cat.slug,
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat || cat.parentSlug) notFound();

  const products = getProductsByCategory(cat.slug);

  return (
    <>
      <div className="container">
        <Breadcrumbs
          items={[
            { name: 'Главная', href: '/' },
            { name: cat.name, href: '/' + cat.slug },
          ]}
        />
      </div>

      <div className={styles.titlebar}>
        <div className={`container ${styles.titlebarInner}`}>
          <h1 className={styles.h1}>{cat.name}</h1>
          <div className={`mono ${styles.meta}`}>
            {products.length} ВЕЩЕЙ
          </div>
        </div>
      </div>

      <CatalogView products={products} />
      <JsonLd data={itemList(products)} />
    </>
  );
}
