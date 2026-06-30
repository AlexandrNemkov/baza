import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import CatalogView from '@/components/CatalogView';
import JsonLd from '@/components/JsonLd';
import { getAllCategories, getCategory, getProductsByCategory } from '@/data';
import { buildMetadata } from '@/lib/seo/metadata';
import { itemList } from '@/lib/seo/jsonld';
import styles from './page.module.css';

type Params = { category: string; subcategory: string };

export function generateStaticParams() {
  return getAllCategories()
    .filter((c) => c.parentSlug)
    .map((c) => ({ category: c.parentSlug as string, subcategory: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category, subcategory } = await params;
  const sub = getCategory(subcategory);
  if (!sub || sub.parentSlug !== category) {
    return buildMetadata({ path: '/' + category + '/' + subcategory });
  }
  return buildMetadata({
    title: sub.name,
    description: `${sub.name} от российских дизайнеров`,
    path: '/' + category + '/' + sub.slug,
  });
}

export default async function SubcategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category, subcategory } = await params;
  const sub = getCategory(subcategory);
  if (!sub || sub.parentSlug !== category) notFound();

  const parent = getCategory(category);
  const products = getProductsByCategory(category, sub.slug);

  return (
    <>
      <Breadcrumbs
          items={[
            { name: 'Главная', href: '/' },
            {
              name: parent?.name ?? category,
              href: '/' + category,
            },
            {
              name: sub.name,
              href: '/' + category + '/' + sub.slug,
            },
          ]}
        />

      <div className={styles.titlebar}>
        <div className={styles.titlebarInner}>
          <h1 className={styles.h1}>{sub.name}</h1>
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
