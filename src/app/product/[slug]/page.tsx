import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductGallery from '@/components/ProductGallery';
import { brandInitial } from '@/components/Placeholder';
import ProductBuyPanel from '@/components/ProductBuyPanel';
import ProductGrid from '@/components/ProductGrid';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import FaqBlock from '@/components/FaqBlock';
import JsonLd from '@/components/JsonLd';
import { sampleImage } from '@/lib/sampleImage';
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

  const brandHref = '/brands/' + p.brandSlug;

  return (
    <div className={`container ${styles.page}`}>
      <Breadcrumbs items={breadcrumbItems} />

      <div className={styles.layout}>
        {/* Left: gallery column (scrolls naturally on desktop).
            Not wrapped in Reveal — the main product image must be visible
            immediately, never fade in. */}
        <div className={styles.galleryCol}>
          <ProductGallery
            images={p.images.map((img, i) => ({
              ...img,
              src: img.src ?? sampleImage(p, i),
            }))}
            mark={brandInitial(brand?.name ?? p.brandSlug)}
            alt={`${brand?.name ?? p.brandSlug} — ${p.title}`}
          />
        </div>

        {/* Right: sticky info column */}
        <div className={styles.infoCol}>
          <div className={styles.info}>
            {brand && (
              <Link href={brandHref} className={`micro ${styles.brand} link-underline`}>
                {brand.name}
              </Link>
            )}
            <h1 className={styles.title}>{p.title}</h1>

            <p className={styles.lead}>{p.description}</p>

            <ProductBuyPanel
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
      </div>

      {/* Below the fold (full width) */}
      {brand && (
        <section className={styles.brandBlock}>
          <p className="micro">О бренде</p>
          <h2 className={styles.brandName}>{brand.name}</h2>
          <p className={styles.brandText}>{brand.description}</p>
          <Link href={brandHref} className={`link-underline ${styles.brandCta}`}>
            Все вещи бренда
          </Link>
        </section>
      )}

      <FaqBlock items={p.faq} />

      {related.length > 0 && (
        <Reveal as="section" className={styles.related}>
          <SectionHeading index="04" title="Похожие вещи" />
          <ProductGrid products={related} />
        </Reveal>
      )}

      <JsonLd data={productJsonLd(p)} />
    </div>
  );
}
