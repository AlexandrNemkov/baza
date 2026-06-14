import Link from 'next/link';
import styles from './Hero.module.css';

type HeroProps = {
  eyebrow?: string;
  headline?: string;
};

/** Full-bleed muted hero block with eyebrow, headline, and catalog CTA. */
export default function Hero({
  eyebrow = 'Российские дизайнеры',
  headline = 'База гардероба',
}: HeroProps) {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        <p className={`micro ${styles.eyebrow}`}>{eyebrow}</p>
        <h1 className={styles.headline}>{headline}</h1>
        <Link href="/catalog" className={`link-underline ${styles.cta}`}>
          Смотреть каталог
        </Link>
      </div>
    </section>
  );
}
