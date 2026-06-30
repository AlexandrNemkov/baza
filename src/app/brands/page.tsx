import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import BrandCard from '@/components/BrandCard';
import { getAllBrands, getAllProducts, getProductsByBrand } from '@/data';
import { buildMetadata } from '@/lib/seo/metadata';
import { productWord } from '@/lib/pluralize';
import styles from './page.module.css';

export const metadata = buildMetadata({
  title: 'Бренды',
  description: 'Российские дизайнеры на Baza',
  path: '/brands',
});

export default function BrandsPage() {
  const brands = getAllBrands();
  const allProducts = getAllProducts();

  const totalProducts = allProducts.length;
  const totalBrands = brands.length;
  const totalCities = new Set(brands.map((b) => b.city).filter(Boolean)).size;

  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Главная', href: '/' },
          { name: 'Бренды', href: '/brands' },
        ]}
      />

      {/* Titlebar */}
      <div className={styles.titlebar}>
        <div className={styles.titlebarInner}>
          <h1 className={styles.h1}>Бренды</h1>
          <div className={styles.meta}>
            <span className={styles.metaLine}>ВЫПУСК №01</span>
            <span className={styles.metaLine}>{totalBrands} МАРОК · РОССИЯ</span>
          </div>
        </div>
      </div>

      {/* Lead row */}
      <div className={styles.leadRow}>
        <div className={styles.leadL}>
          <p className={styles.leadText}>
            Марки, которые шьют и делают вещи в России — небольшими партиями,
            в собственных цехах. Мы собираем спокойный минимализм, честные
            материалы и людей, для которых одежда — это про годы, а не про сезон.
          </p>
        </div>
        <div className={styles.leadR}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Марок в выпуске</span>
            <strong className={styles.statVal}>{totalBrands}</strong>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Городов</span>
            <strong className={styles.statVal}>{totalCities}</strong>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Вещей в наличии</span>
            <strong className={styles.statVal}>{totalProducts}+</strong>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Производство</span>
            <strong className={styles.statVal}>RU</strong>
          </div>
        </div>
      </div>

      {/* Brand cards grid */}
      <div className={styles.bgrid}>
        {brands.map((b, i) => {
          const count = getProductsByBrand(b.slug).length;
          return (
            <BrandCard
              key={b.slug}
              brand={b}
              index={i + 1}
              productCount={count}
            />
          );
        })}
      </div>

      {/* A–Z index */}
      <div className={styles.ixhead}>
        <div className={styles.ixheadLeft}>
          <h2 className={styles.ixTitle}>Все марки · указатель</h2>
        </div>
        <span className={[styles.ixMeta, 'cap'].join(' ')}>Россия · RU</span>
      </div>
      <div className={styles.bidx}>
        {brands.map((b, i) => {
          const count = getProductsByBrand(b.slug).length;
          return (
            <Link key={b.slug} href={`/brands/${b.slug}`} className={styles.bidxRow}>
              <span className={styles.bidxN}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className={styles.bidxNm}>{b.name}</span>
              <span className={styles.bidxMeta}>
                {b.specialization && b.city
                  ? `${b.specialization} · ${b.city}`
                  : 'Россия'}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Banner для марок */}
      <div className={styles.banner}>
        <span className={[styles.bannerCap, 'cap'].join(' ')}>
          № {totalBrands + 1} — Для марок
        </span>
        <h2 className={styles.bannerH2}>
          Шьёте в России?{' '}
          <em className={styles.bannerEm}>Давайте дружить</em>
        </h2>
        <a href="mailto:hello@baza.ru" className="btn">
          Написать нам →
        </a>
      </div>
    </>
  );
}

