import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductGrid from '@/components/ProductGrid';
import JsonLd from '@/components/JsonLd';
import { getProduct } from '@/data';
import { getAllPodborki, getPodborka } from '@/data/podborki';
import type { Product } from '@/data/types';
import { buildMetadata } from '@/lib/seo/metadata';
import { itemList } from '@/lib/seo/jsonld';
import styles from './page.module.css';

type Params = { slug: string };

export function generateStaticParams() {
  return getAllPodborki().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const pod = getPodborka(slug);
  if (!pod) return buildMetadata({ path: '/podborki/' + slug });
  return buildMetadata({
    title: pod.title,
    description: pod.summary,
    path: '/podborki/' + pod.slug,
  });
}

export default async function PodborkaPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const pod = getPodborka(slug);
  if (!pod) notFound();

  const products = pod.productSlugs
    .map((s) => getProduct(s))
    .filter((p): p is Product => p !== undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Главная', href: '/' },
          { name: 'Подборки', href: '/podborki' },
          { name: pod.title, href: '/podborki/' + pod.slug },
        ]}
      />

      {/* titlebar */}
      <div className={styles.titlebar}>
        <div className={`container ${styles.titlebarInner}`}>
          <h1 className={styles.titleH1}>{pod.title}</h1>
          <div className={`mono ${styles.titleMeta}`}>
            Подборка
            <br />
            {pod.productSlugs.length} позиций
          </div>
        </div>
      </div>

      {/* intro */}
      <div className="container">
        <p className={styles.intro}>{pod.intro}</p>
      </div>

      {/* products */}
      <div className={`container ${styles.section}`}>
        <ProductGrid products={products} />
      </div>

      <JsonLd data={itemList(products)} />
    </>
  );
}
