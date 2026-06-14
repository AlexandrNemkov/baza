import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import CatalogView from '@/components/CatalogView';
import JsonLd from '@/components/JsonLd';
import { getAllCategories, getCategory, getProductsByCategory } from '@/data';
import { buildMetadata } from '@/lib/seo/metadata';
import { itemList } from '@/lib/seo/jsonld';

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
      <div className="container">
        <Breadcrumbs
          items={[
            { name: 'Главная', path: '/' },
            {
              name: parent?.name ?? category,
              path: '/' + category,
            },
            {
              name: sub.name,
              path: '/' + category + '/' + sub.slug,
            },
          ]}
        />
      </div>
      <CatalogView products={products} title={sub.name} />
      <JsonLd data={itemList(products)} />
    </>
  );
}
