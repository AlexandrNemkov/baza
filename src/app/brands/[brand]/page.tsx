import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductGrid from '@/components/ProductGrid';
import Placeholder, { brandInitial } from '@/components/Placeholder';
import JsonLd from '@/components/JsonLd';
import { getAllBrands, getBrand, getProductsByBrand } from '@/data';
import { buildMetadata } from '@/lib/seo/metadata';
import { itemList } from '@/lib/seo/jsonld';
import styles from './page.module.css';

type Params = { brand: string };

export function generateStaticParams() {
  return getAllBrands().map((b) => ({ brand: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { brand } = await params;
  const b = getBrand(brand);
  if (!b) return buildMetadata({ path: '/brands/' + brand });
  return buildMetadata({
    title: b.name,
    description: b.description.slice(0, 160),
    path: '/brands/' + b.slug,
  });
}

export default async function BrandPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { brand } = await params;
  const b = getBrand(brand);
  if (!b) notFound();

  const products = getProductsByBrand(b.slug);

  return (
    <div className={`container ${styles.page}`}>
      <Breadcrumbs
        items={[
          { name: 'Главная', href: '/' },
          { name: 'Бренды', href: '/brands' },
          { name: b.name, href: '/brands/' + b.slug },
        ]}
      />

      <section className={styles.intro}>
        <Placeholder
          className={styles.cover}
          tone={b.cover}
          ratio="16 / 5"
          mark={brandInitial(b.name)}
          alt={`${b.name} — обложка бренда`}
        />
        <h1 className={styles.title}>{b.name}</h1>
        <p className={styles.desc}>{b.description}</p>
      </section>

      <ProductGrid products={products} />

      <JsonLd data={itemList(products)} />
    </div>
  );
}
