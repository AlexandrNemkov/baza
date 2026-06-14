import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Gallery from '@/components/Gallery';
import ProductBuyPanel from '@/components/ProductBuyPanel';
import ProductGrid from '@/components/ProductGrid';
import Accordion from '@/components/Accordion';
import FaqBlock from '@/components/FaqBlock';
import JsonLd from '@/components/JsonLd';
import {
  getAllProducts,
  getProduct,
  getBrand,
  getCategory,
  relatedProducts,
} from '@/data';
import type { SizeChartRow } from '@/data/types';
import { buildMetadata } from '@/lib/seo/metadata';
import { product as productJsonLd } from '@/lib/seo/jsonld';
import styles from './page.module.css';

type Params = { slug: string };

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return buildMetadata({ path: '/product/' + slug });
  return buildMetadata({
    title: p.title,
    description: p.description.slice(0, 160),
    path: '/product/' + p.slug,
  });
}

function SizeChart({ chart }: { chart: SizeChartRow[] | string }) {
  if (typeof chart === 'string') {
    return <p className={styles.text}>{chart}</p>;
  }
  return (
    <table className={styles.sizeTable}>
      <tbody>
        {chart.map((row) => (
          <tr key={row.label}>
            <th scope="row">{row.label}</th>
            <td>{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const brand = getBrand(p.brandSlug);
  const category = getCategory(p.category);
  const subcategory = p.subcategory ? getCategory(p.subcategory) : undefined;
  const related = relatedProducts(p, 4);

  const breadcrumbItems = [
    { name: 'Главная', path: '/' },
    ...(category
      ? [{ name: category.name, path: '/' + category.slug }]
      : []),
    ...(category && subcategory
      ? [
          {
            name: subcategory.name,
            path: '/' + category.slug + '/' + subcategory.slug,
          },
        ]
      : []),
    { name: p.title, path: '/product/' + p.slug },
  ];

  return (
    <div className={`container ${styles.page}`}>
      <Breadcrumbs items={breadcrumbItems} />

      <Gallery images={p.images} />

      <div className={styles.head}>
        {brand && <p className={`micro ${styles.brand}`}>{brand.name}</p>}
        <h1 className={styles.title}>{p.title}</h1>
      </div>

      <ProductBuyPanel price={p.price} sizes={p.sizes} />

      <div className={styles.accordions}>
        <Accordion title="Описание" defaultOpen>
          <p className={styles.text}>{p.description}</p>
        </Accordion>
        <Accordion title="Состав и уход">
          <p className={styles.text}>{p.composition}</p>
          <p className={styles.text}>{p.care}</p>
        </Accordion>
        <Accordion title="Размеры">
          <SizeChart chart={p.sizeChart} />
        </Accordion>
        <Accordion title="Доставка">
          <p className={styles.text}>
            Доставляем по всей России курьерскими службами и почтой. Сроки и
            стоимость рассчитываются при оформлении заказа. Возврат — в течение
            14 дней при сохранении товарного вида.
          </p>
        </Accordion>
      </div>

      <FaqBlock items={p.faq} />

      {related.length > 0 && (
        <section className={styles.related}>
          <p className="micro">Похожее</p>
          <ProductGrid products={related} />
        </section>
      )}

      <JsonLd data={productJsonLd(p)} />
    </div>
  );
}
