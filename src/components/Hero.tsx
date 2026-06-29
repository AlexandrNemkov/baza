import Link from 'next/link';
import styles from './Hero.module.css';

type HeroProps = {
  eyebrow?: string;
};

/**
 * Full-height editorial hero — a magazine cover. Eyebrow, oversized Rubik
 * headline with an italic accent, a terracotta rule, a one-line statement, and
 * a primary CTA + secondary link. Elements fade-and-rise in sequence on first
 * load via staggered CSS `animation-delay` (disabled under reduced motion).
 */
export default function Hero({
  eyebrow = 'Мультибренд · Российские дизайнеры',
}: HeroProps) {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        <p
          className={`micro ${styles.eyebrow} load-rise`}
          style={{ '--load-delay': '60ms' } as React.CSSProperties}
        >
          {eyebrow}
        </p>

        <h1
          className={`${styles.headline} load-rise`}
          style={{ '--load-delay': '160ms' } as React.CSSProperties}
        >
          База
          <br />
          <em className={styles.accent}>гардероба</em>
        </h1>

        <span
          className={`${styles.rule} load-rise`}
          style={{ '--load-delay': '280ms' } as React.CSSProperties}
          aria-hidden="true"
        />

        <p
          className={`${styles.subcopy} load-rise`}
          style={{ '--load-delay': '380ms' } as React.CSSProperties}
        >
          Спокойные вещи вне сезона от локальных марок — крой, материалы и тихая
          сборка базового гардероба.
        </p>

        <div
          className={`${styles.actions} load-rise`}
          style={{ '--load-delay': '480ms' } as React.CSSProperties}
        >
          <Link href="/catalog" className={`link-underline ${styles.cta}`}>
            Смотреть каталог
          </Link>
          <Link href="/brands" className={`link-underline ${styles.secondary}`}>
            Бренды
          </Link>
        </div>

        <p
          className={`micro ${styles.meta} load-rise`}
          style={{ '--load-delay': '600ms' } as React.CSSProperties}
        >
          Локальные марки · Доставка по РФ · 2026
        </p>

        <div className={styles.scrollCue} aria-hidden="true">
          <span className={`micro ${styles.scrollLabel}`}>Листать</span>
          <span className={styles.scrollLine} />
        </div>
      </div>
    </section>
  );
}
