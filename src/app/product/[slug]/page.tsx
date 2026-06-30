import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductGallery from '@/components/ProductGallery';
import { brandInitial } from '@/components/Placeholder';
import Placeholder from '@/components/Placeholder';
import ProductBuyPanel from '@/components/ProductBuyPanel';
import ProductGrid from '@/components/ProductGrid';
import FaqBlock from '@/components/FaqBlock';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import { sampleImage } from '@/lib/sampleImage';
import { asset } from '@/lib/basePath';
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
            <td>{row.label}</td>
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

  const brandHref = '/brands/' + p.brandSlug;

  const breadcrumbItems = [
    { name: 'Главная', href: '/' },
    ...(category ? [{ name: category.name, href: '/' + category.slug }] : []),
    ...(category && subcategory
      ? [
          {
            name: subcategory.name,
            href: '/' + category.slug + '/' + subcategory.slug,
          },
        ]
      : []),
    { name: p.title, href: '/product/' + p.slug },
  ];

  // Brand image for brandblk
  const brandImgSrc = asset(`/img/p${String(((brandHref.length % 16) + 1)).padStart(2, '0')}.jpg`);

  return (
    <>
      {/* Хлебные крошки */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* PDP: 1.5fr / 1fr grid */}
      <section className={styles.pdp}>
        {/* Левая колонка: галерея */}
        <div className={styles.galwrap}>
          <ProductGallery
            images={p.images.map((img, i) => ({
              ...img,
              src: img.src ?? sampleImage(p, i),
            }))}
            mark={brandInitial(brand?.name ?? p.brandSlug)}
            alt={`${brand?.name ?? p.brandSlug} — ${p.title}`}
          />
        </div>

        {/* Правая колонка: инфо (sticky) */}
        <div className={styles.info}>
          <div className={styles.infoIn}>
            {/* Бренд */}
            <div className={styles.br}>
              {brand ? (
                <Link href={brandHref} className={styles.brLink}>
                  {brand.name}
                </Link>
              ) : (
                <span>{p.brandSlug}</span>
              )}
            </div>

            {/* Название */}
            <h1 className={styles.h1}>{p.title}</h1>

            {/* Лид */}
            <p className={styles.lead}>{p.description}</p>

            {/* Панель покупки */}
            <ProductBuyPanel
              slug={p.slug}
              title={p.title}
              price={p.price}
              sizes={p.sizes}
              sizeChart={<SizeChart chart={p.sizeChart} />}
              careContent={
                <>
                  <p className={styles.text}>{p.composition}</p>
                  <p className={styles.text}>{p.care}</p>
                </>
              }
            />
          </div>
        </div>
      </section>

      {/* О бренде */}
      {brand && (
        <section className={styles.brandblk}>
          <div className={styles.brandText}>
            <div className={styles.brandNo}>№ 04 — О бренде</div>
            <h3 className={styles.brandName}>{brand.name}</h3>
            <p className={styles.brandDesc}>{brand.description}</p>
            <Link href={brandHref} className={styles.brandCta}>
              Все вещи бренда →
            </Link>
          </div>
          <div className={styles.brandImg}>
            <Placeholder
              src={brandImgSrc}
              mark={brandInitial(brand.name)}
              alt={`${brand.name} — фото`}
              ratio="auto"
              className={styles.brandPh}
            />
          </div>
        </section>
      )}

      {/* Похожие вещи */}
      {related.length > 0 && (
        <>
          <div className={styles.sbar}>
            <div className={styles.sbarTitle}>
              <h2 className={styles.sbarH}>Похожие вещи</h2>
            </div>
            <Link href="/catalog" className={styles.sbarCta}>
              В каталог →
            </Link>
          </div>
          <div className={styles.relatedGrid}>
            <ProductGrid products={related} />
          </div>
        </>
      )}

      {/* FAQ — под похожими, во всю ширину секции */}
      <FaqBlock items={p.faq} />

      {/* JSON-LD Product */}
      <JsonLd data={productJsonLd(p)} />
    </>
  );
}
