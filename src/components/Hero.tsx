import Link from 'next/link';
import { asset } from '@/lib/basePath';
import { getAllProducts, getAllBrands } from '@/data';
import styles from './Hero.module.css';

/**
 * Hero в стиле C: сплит 1.45fr / 1fr с бордером --rule.
 * Слева — текст + CTA; справа — фото-плашка с подписью.
 * Появляется сразу через load-rise (без IntersectionObserver).
 */
export default function Hero() {
  const brandCount = getAllBrands().length;
  const productCount = getAllProducts().length;

  return (
    <section className={styles.hero}>
      {/* ЛЕВАЯ КОЛОНКА */}
      <div className={`${styles.L} load-rise`}>
        <div className={`${styles.kick} mono`}>
          <span>Бренды РФ дизайнеров</span>
          <span>РОССИЯ · RU</span>
        </div>

        <h1 className={styles.headline}>
          База
          <br />
          <em className={styles.accent}>гардероба</em>
        </h1>

        <p className={styles.lead}>
          Российские дизайнеры под одной обложкой. Спокойные вещи, честные
          материалы и тексты о том, как собрать гардероб, который служит годами.
        </p>

        <div className={styles.acts}>
          <Link href="/catalog" className="btn">
            В каталог →
          </Link>
          <Link href="/brands" className="btn ghost">
            Бренды
          </Link>
          <span className={`mono ${styles.stat}`}>
            {brandCount} брендов · {productCount}+ вещей
          </span>
        </div>
      </div>

      {/* ПРАВАЯ КОЛОНКА */}
      <div
        className={`${styles.R} load-rise`}
        style={{ '--load-delay': '120ms' } as React.CSSProperties}
      >
        <img
          src={asset('/img/p01.jpg')}
          alt="Образ выпуска Baza — лён"
          className={styles.photo}
        />
        <span className={`mono ${styles.idx}`}>VOLCHOK · FW26</span>
        <span className={`cap ${styles.caption}`}>Образ выпуска</span>
      </div>
    </section>
  );
}
