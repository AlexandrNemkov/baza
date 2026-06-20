import Link from 'next/link';
import styles from './Hero.module.css';

type HeroProps = {
  eyebrow?: string;
};

/** Full-bleed muted hero block with eyebrow, display headline, and catalog CTA. */
export default function Hero({
  eyebrow = 'Российские дизайнеры',
}: HeroProps) {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        <p className={`micro ${styles.eyebrow}`}>{eyebrow}</p>
        <h1 className={styles.headline}>
          База
          <br />
          <em className={styles.accent}>гардероба</em>
        </h1>
        <span className={styles.rule} aria-hidden="true" />
        <p className={styles.subcopy}>
          Спокойные вещи вне сезона от локальных марок — крой, материалы и тихая
          сборка базового гардероба.
        </p>
        <Link href="/catalog" className={`link-underline ${styles.cta}`}>
          Смотреть каталог
        </Link>
      </div>
    </section>
  );
}
