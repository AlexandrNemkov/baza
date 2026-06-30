'use client';

import { useRef, useState } from 'react';
import Placeholder from './Placeholder';
import styles from './ProductGallery.module.css';

type GalleryImage = { color: string; label?: string; src?: string };

type ProductGalleryProps = {
  images: GalleryImage[];
  /** Large serif mark for each plate (e.g. brand initial). */
  mark?: string;
  /** Accessible product name, used as the plate alt. */
  alt?: string;
};

function plateAlt(alt: string | undefined, img: GalleryImage, i: number) {
  if (alt) return `${alt} — ${img.label ?? `вид ${i + 1}`}`;
  return img.label ?? `Изображение ${i + 1}`;
}

function pad2(n: number) {
  return n < 10 ? '0' + n : String(n);
}

/**
 * Responsive product gallery.
 *
 * Desktop (≥981px): vertical stack of full-width 4/5 plates with --line borders.
 *
 * Mobile (<981px): horizontal scroll-snap carousel with .galbar panel
 * (счётчик NN/NN, кнопки ‹/›).
 */
export default function ProductGallery({
  images,
  mark = '·',
  alt,
}: ProductGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  if (images.length === 0) return null;

  const total = images.length;

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const index = Math.round(track.scrollLeft / track.clientWidth);
    setActive(index);
  };

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: index * track.clientWidth, behavior: 'smooth' });
  };

  const goPrev = () => goTo(Math.max(0, active - 1));
  const goNext = () => goTo(Math.min(total - 1, active + 1));

  return (
    <div className={styles.gallery}>
      {/* Desktop: vertical stack with border separators */}
      <div className={styles.stack} aria-hidden={undefined}>
        {images.map((img, i) => (
          <Placeholder
            key={i}
            className={styles.plate}
            tone={img.color}
            mark={mark}
            caption={img.label}
            alt={plateAlt(alt, img, i)}
            ratio="4 / 5"
            src={img.src}
          />
        ))}
      </div>

      {/* Mobile: swipeable carousel + galbar */}
      <div className={styles.carousel}>
        <div
          ref={trackRef}
          className={styles.track}
          onScroll={onScroll}
          aria-roledescription="carousel"
        >
          {images.map((img, i) => (
            <Placeholder
              key={i}
              className={styles.slide}
              tone={img.color}
              mark={mark}
              caption={img.label}
              alt={plateAlt(alt, img, i)}
              src={img.src}
            />
          ))}
        </div>

        {total > 1 && (
          <div className={styles.galbar}>
            <span className={styles.counter}>
              {pad2(active + 1)} / {pad2(total)}
            </span>
            <div className={styles.arrows}>
              <button
                type="button"
                className={styles.arrowBtn}
                onClick={goPrev}
                disabled={active === 0}
                aria-label="Предыдущее фото"
              >
                ‹
              </button>
              <button
                type="button"
                className={styles.arrowBtn}
                onClick={goNext}
                disabled={active === total - 1}
                aria-label="Следующее фото"
              >
                ›
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
