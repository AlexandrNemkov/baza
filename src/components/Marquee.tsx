import styles from './Marquee.module.css';

/**
 * Slow horizontal marquee of repeating words — a quiet editorial signature
 * strip. The visible track is duplicated (and aria-hidden) so the loop is
 * seamless; the whole strip is decorative (`aria-hidden`) since real
 * navigation lives elsewhere. Under reduced motion it renders static and the
 * overflow is simply clipped.
 */
export default function Marquee({ items }: { items: string[] }) {
  // One rendered group = the items joined with an em-dash separator.
  const group = items.join(' — ') + ' — ';

  return (
    <div className={styles.marquee} aria-hidden="true">
      <div className={styles.track}>
        <span className={styles.group}>{group}</span>
        <span className={styles.group}>{group}</span>
      </div>
    </div>
  );
}
