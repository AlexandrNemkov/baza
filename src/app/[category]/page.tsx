import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import CatalogView from '@/components/CatalogView';
import JsonLd from '@/components/JsonLd';
import { getAllCategories, getCategory, getProductsByCategory } from '@/data';
import { buildMetadata } from '@/lib/seo/metadata';
import { itemList } from '@/lib/seo/jsonld';

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
            { name: 'Главная', path: '/' },
            { name: cat.name, path: '/' + cat.slug },
          ]}
        />
      </div>
      <CatalogView products={products} title={cat.name} />
      <JsonLd data={itemList(products)} />
    </>
  );
}
