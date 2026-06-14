'use client';

import { useRef, useState } from 'react';
import styles from './Gallery.module.css';

type GalleryImage = { color: string; label?: string };

/**
 * Horizontal scroll-snap gallery of 3/4 color-swatch placeholders with dot
 * indicators. The active dot follows scroll position; tapping a dot scrolls
 * to that slide.
 */
export default function Gallery({ images }: { images: GalleryImage[] }) {
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
      <div
        ref={trackRef}
        className={styles.track}
        onScroll={onScroll}
        aria-roledescription="carousel"
      >
        {images.map((img, i) => (
          <div
            key={i}
            className={styles.slide}
            style={{ background: img.color }}
            aria-label={img.label ?? `Изображение ${i + 1}`}
          >
            {img.label && <span className={styles.label}>{img.label}</span>}
          </div>
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
  );
}
