import Link from 'next/link';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import NewsletterForm from '@/components/NewsletterForm';
import { getAllProducts, getAllBrands } from '@/data';
import { getAllArticles } from '@/data/blog';
import { asset } from '@/lib/basePath';
import { buildMetadata } from '@/lib/seo/metadata';
import styles from './page.module.css';

export const metadata = buildMetadata({ path: '/' });

export default function Home() {
  const newProducts = getAllProducts().slice(0, 4);
  const brands = getAllBrands().slice(0, 5);
  const articles = getAllArticles().slice(0, 3);

  return (
    <>
      {/* 01 — HERO */}
      <Hero />

      {/* 02 — Новинки выпуска */}
      <SectionHeading
        index="02"
        title="Новинки выпуска"
        href="/catalog"
        cta="Смотреть все →"
      />
      <Reveal>
        <ProductGrid products={newProducts} />
      </Reveal>

      {/* 03 — FEATURE / LOOKBOOK */}
      <section className={styles.feat}>
        <Reveal className={styles.featImg}>
          <img
            src={asset('/img/p03.jpg')}
            alt="Лукбук Baza FW26"
            className={styles.featPhoto}
          />
          <span className={`mono ${styles.featIdx}`}>№ 03 / LOOKBOOK · FW26</span>
        </Reveal>
        <Reveal delay={100} className={styles.featTxt}>
          <div className={`mono ${styles.featNo}`}>№ 03 — Съёмка сезона</div>
          <h3 className={styles.featH3}>
            Капсула,
            <br />
            которая молчит
          </h3>
          <p className={styles.featP}>
            Восемь вещей, из которых собирается месяц образов. Снято в одном
            свете, на одной фактуре — как разворот журнала.
          </p>
          <Link href="/blog" className="btn">
            Смотреть съёмку →
          </Link>
        </Reveal>
      </section>

      {/* 04 — Из журнала */}
      <SectionHeading
        index="04"
        title="Из журнала"
        href="/blog"
        cta="Все статьи →"
      />
      <div className={styles.trio}>
        {articles.map((a, i) => (
          <Reveal key={a.slug} delay={i * 80} className={styles.trioCard}>
            <div className={`mono ${styles.trioNo}`}>№ 0{i + 1}</div>
            <div className={`cap ${styles.trioTag}`}>Журнал</div>
            <h3 className={styles.trioH3}>{a.title}</h3>
            <p className={styles.trioP}>{a.excerpt}</p>
            <Link href={`/blog/${a.slug}`} className={`mono ${styles.trioMore}`}>
              Читать →
            </Link>
          </Reveal>
        ))}
      </div>

      {/* 05 — Бренды выпуска */}
      <SectionHeading
        index="05"
        title="Бренды выпуска"
        href="/brands"
        cta="Все бренды →"
      />
      <div className={styles.bidx}>
        {brands.map((b, i) => (
          <Link key={b.slug} href={`/brands/${b.slug}`} className={styles.bidxRow}>
            <span className={`mono ${styles.bidxN}`}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className={styles.bidxNm}>{b.name}</span>
            <span className={`cap ${styles.bidxMeta}`}>{b.description.slice(0, 40)}…</span>
          </Link>
        ))}
      </div>

      {/* 06 — Баннер-подписка */}
      <Reveal className={styles.banner}>
        <div className={`cap ${styles.bannerCap}`}>№ 06 — Письма Baza</div>
        <h2 className={styles.bannerH2}>
          Меньше, но <em className={styles.bannerEm}>своё</em>
        </h2>
        <NewsletterForm />
      </Reveal>
    </>
  );
}
