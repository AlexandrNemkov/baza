import Link from 'next/link';
import styles from './SectionHeading.module.css';

type SectionHeadingProps = {
  /** Serif index numeral rendered in terracotta, e.g. "01". */
  index?: string;
  /** Uppercase tracked eyebrow title (Manrope micro). */
  title: string;
  /** Optional relative path for the right-aligned CTA link. */
  href?: string;
  /** CTA label; defaults to a sensible "Все". */
  cta?: string;
};

/**
 * Editorial section heading: a hairline-bottom row pairing an optional serif
 * index numeral in terracotta with an uppercase tracked eyebrow and an optional
 * right-aligned CTA. NOT an <h1>; the eyebrow is a <p> so the one-h1-per-page
 * rule is preserved.
 */
export default function SectionHeading({
  index,
  title,
  href,
  cta = 'Все',
}: SectionHeadingProps) {
  return (
    <div className={styles.row}>
      <p className={styles.label}>
        {index && <span className={styles.index}>{index}</span>}
        <span className={`micro ${styles.title}`}>{title}</span>
      </p>
      {href && (
        <Link href={href} className={`link-underline ${styles.cta}`}>
          {cta}
        </Link>
      )}
    </div>
  );
}
