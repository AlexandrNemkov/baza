'use client';

import { useRef, useState } from 'react';
import Placeholder from './Placeholder';
import styles from './ProductGallery.module.css';

type GalleryImage = { color: string; label?: string };

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

/**
 * Responsive product gallery.
 *
 * Desktop (≥1024px): a quiet vertical stack of full-width 4/5 plates that
 * scrolls naturally inside the editorial left column.
 *
 * Mobile (<1024px): the familiar full-bleed horizontal scroll-snap carousel
 * with dot indicators. The two presentations render the same art-directed
 * plates; CSS toggles which container is shown so markup stays a11y-clean.
 */
export default function ProductGallery({
  images,
  mark = '·',
  alt,
}: ProductGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  if (images.length === 0) return null;

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

  return (
    <div className={styles.gallery}>
      {/* Desktop: vertical stack */}
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
          />
        ))}
      </div>

      {/* Mobile: swipeable carousel */}
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
            />
          ))}
        </div>

        {images.length > 1 && (
          <div className={styles.dots}>
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
                aria-label={`Перейти к изображению ${i + 1}`}
                aria-current={i === active}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
