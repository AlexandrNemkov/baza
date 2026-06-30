import { notFound } from 'next/navigation';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductGrid from '@/components/ProductGrid';
import SectionHeading from '@/components/SectionHeading';
import Placeholder, { brandInitial } from '@/components/Placeholder';
import JsonLd from '@/components/JsonLd';
import { getAllBrands, getBrand, getProductsByBrand } from '@/data';
import { buildMetadata } from '@/lib/seo/metadata';
import { itemList } from '@/lib/seo/jsonld';
import { productWord } from '@/lib/pluralize';
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
  const productCount = products.length;

  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Главная', href: '/' },
          { name: 'Бренды', href: '/brands' },
          { name: b.name, href: '/brands/' + b.slug },
        ]}
      />

      {/* Brand Hero */}
      <section className={styles.bhero}>
        <div className={styles.bheroL}>
          <div className={styles.kick}>
            <span>
              {b.city ? `${b.city} · RU` : 'Марка · Россия'}
            </span>
            <span>RU</span>
          </div>
          <h1 className={styles.h1}>{b.name}</h1>
          <p className={styles.lead}>{b.description}</p>
          <div className={styles.stats}>
            {productCount > 0 && (
              <div className={styles.stat}>
                <strong className={styles.statVal}>{productCount}</strong>
                <span className={styles.statLabel}>
                  {productWord(productCount)} в наличии
                </span>
              </div>
            )}
            {b.founded && (
              <div className={styles.stat}>
                <strong className={styles.statVal}>{b.founded}</strong>
                <span className={styles.statLabel}>с года</span>
              </div>
            )}
            <div className={styles.stat}>
              <strong className={styles.statVal}>RU</strong>
              <span className={styles.statLabel}>производство</span>
            </div>
            <div className={styles.stat}>
              <strong className={styles.statVal}>1–2</strong>
              <span className={styles.statLabel}>дня отгрузка</span>
            </div>
          </div>
        </div>
        <div className={styles.bheroR}>
          <Placeholder
            tone={b.cover}
            mark={brandInitial(b.name)}
            alt={`${b.name} — обложка`}
            ratio="auto"
            className={styles.bheroCover}
          />
          <span className={styles.bheroIdx}>
            {b.name.toUpperCase()}
          </span>
        </div>
      </section>

      {/* Products */}
      <SectionHeading
        index="02"
        title="Вещи бренда"
        href="/catalog"
        cta="В общий каталог →"
      />
      <ProductGrid products={products} />

      {/* Story split */}
      <section className={styles.story}>
        <div className={styles.storyImg}>
          <Placeholder
            tone={b.cover}
            mark={brandInitial(b.name)}
            alt={`${b.name} — история`}
            ratio="auto"
            className={styles.storyPlaceholder}
          />
          <span className={styles.storyIdx}>№ 03 / ЦЕХ · РОССИЯ</span>
        </div>
        <div className={styles.storyTxt}>
          <div className={styles.storyNo}>№ 03 — История</div>
          <h3 className={styles.storyH3}>
            Меньше моделей,
            <br />
            больше внимания
          </h3>
          <p className={styles.storyP}>{b.description}</p>
          <p className={styles.storyP}>
            Небольшие партии, собственный цех — только то, что хочется носить
            годами.
          </p>
          <Link href="/brands" className={styles.storyBack}>
            ← Все бренды
          </Link>
        </div>
      </section>

      <JsonLd data={itemList(products)} />
    </>
  );
}

