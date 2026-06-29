import styles from './Placeholder.module.css';

type PlaceholderProps = {
  /** Tonal background color (e.g. an image swatch). Falls back to paper line. */
  tone?: string;
  /**
   * Large serif mark shown centred — typically the brand initial or short
   * name. Decorative; the meaningful name lives in `alt`.
   */
  mark: string;
  /** Tiny caption in the corner — image label or product/brand title. */
  caption?: string;
  /** Accessible name for the plate (real product/brand name, for SEO/a11y). */
  alt: string;
  /** Aspect ratio as a CSS `aspect-ratio` value. Defaults to 3 / 4. */
  ratio?: string;
  className?: string;
  /** Optional photo URL. When set, renders the image instead of the plate. */
  src?: string;
};

/**
 * Art-directed image placeholder — a tonal "lookbook plate" used until real
 * photography is wired in. Renders a large, low-contrast Spectral mark over a
 * tonal ground with a micro caption in the corner, evoking a fashion plate
 * rather than an empty box. Decorative glyphs are aria-hidden; the plate
 * carries the real name via `role="img"` + `aria-label` for SEO/a11y.
 */
export default function Placeholder({
  tone,
  mark,
  caption,
  alt,
  ratio = '3 / 4',
  className,
  src,
}: PlaceholderProps) {
  // Photo present → render the image (the tone shows while it loads); the
  // monogram plate is the fallback used until real photography is wired in.
  if (src) {
    return (
      <div
        className={`${styles.plate}${className ? ' ' + className : ''}`}
        style={{ background: tone ?? 'var(--line-strong)', aspectRatio: ratio }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.photo} src={src} alt={alt} loading="lazy" />
      </div>
    );
  }

  return (
    <div
      className={`${styles.plate}${className ? ' ' + className : ''}`}
      style={{
        background: tone ?? 'var(--line-strong)',
        aspectRatio: ratio,
      }}
      role="img"
      aria-label={alt}
    >
      <span className={styles.mark} aria-hidden="true">
        {mark}
      </span>
      {caption && (
        <span className={styles.caption} aria-hidden="true">
          {caption}
        </span>
      )}
    </div>
  );
}

/** Brand initial(s) from a display name — 1–2 letters, uppercased. */
export function brandInitial(name: string): string {
  const words = name.trim().split(/[\s—–-]+/).filter(Boolean);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return name.trim().slice(0, 2).toUpperCase();
}
