'use client';

import { useEffect, useRef, useState } from 'react';
import {
  emptyFilterState,
  type FilterState,
} from '@/lib/filter';
import styles from './Filters.module.css';

type Options = { brands: string[]; sizes: string[]; colors: string[] };

type FiltersProps = {
  options: Options;
  /** slug → display name, for brand labels. */
  brandNames: Record<string, string>;
  value: FilterState;
  onChange: (next: FilterState) => void;
  open: boolean;
  onClose: () => void;
};

/** Toggle a value in a string-array facet (immutably). */
function toggle(list: string[], v: string): string[] {
  return list.includes(v) ? list.filter((x) => x !== v) : [...list, v];
}

/** Parse a number input into a price bound (null when empty/invalid). */
function parsePrice(raw: string): number | null {
  const trimmed = raw.trim();
  if (trimmed === '') return null;
  const n = Number(trimmed);
  return Number.isFinite(n) ? n : null;
}

export default function Filters({
  options,
  brandNames,
  value,
  onChange,
  open,
  onClose,
}: FiltersProps) {
  // Local draft: edits stay uncommitted until "Применить".
  const [draft, setDraft] = useState<FilterState>(value);
  const panelRef = useRef<HTMLDivElement>(null);

  // Re-seed the draft whenever the sheet (re)opens with the committed value.
  useEffect(() => {
    if (open) setDraft(value);
  }, [open, value]);

  // Esc closes; lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  // Move focus into the panel when it opens.
  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  if (!open) return null;

  const apply = () => {
    onChange(draft);
    onClose();
  };

  const reset = () => setDraft(emptyFilterState());

  return (
    <div className={styles.layer}>
      <button
        type="button"
        className={styles.overlay}
        aria-label="Закрыть фильтры"
        tabIndex={-1}
        onClick={onClose}
      />

      <div
        ref={panelRef}
        className={`${styles.panel} glass`}
        role="dialog"
        aria-modal="true"
        aria-label="Фильтры"
        tabIndex={-1}
      >
        <div className={styles.header}>
          <span className="micro">Фильтры</span>
          <button
            type="button"
            className={styles.closeBtn}
            aria-label="Закрыть фильтры"
            onClick={onClose}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <line x1="5" y1="5" x2="19" y2="19" />
              <line x1="19" y1="5" x2="5" y2="19" />
            </svg>
          </button>
        </div>

        <div className={styles.body}>
          {/* Бренд */}
          {options.brands.length > 0 && (
            <fieldset className={styles.group}>
              <legend className={`micro ${styles.legend}`}>Бренд</legend>
              <div className={styles.brandList}>
                {options.brands.map((slug) => (
                  <label key={slug} className={styles.checkRow}>
                    <input
                      type="checkbox"
                      checked={draft.brands.includes(slug)}
                      onChange={() =>
                        setDraft((d) => ({ ...d, brands: toggle(d.brands, slug) }))
                      }
                    />
                    <span>{brandNames[slug] ?? slug}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          {/* Размер */}
          {options.sizes.length > 0 && (
            <fieldset className={styles.group}>
              <legend className={`micro ${styles.legend}`}>Размер</legend>
              <div className={styles.chips}>
                {options.sizes.map((size) => {
                  const active = draft.sizes.includes(size);
                  return (
                    <button
                      key={size}
                      type="button"
                      className={`${styles.chip} ${active ? styles.chipActive : ''}`}
                      aria-pressed={active}
                      onClick={() =>
                        setDraft((d) => ({ ...d, sizes: toggle(d.sizes, size) }))
                      }
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          )}

          {/* Цвет */}
          {options.colors.length > 0 && (
            <fieldset className={styles.group}>
              <legend className={`micro ${styles.legend}`}>Цвет</legend>
              <div className={styles.chips}>
                {options.colors.map((color) => {
                  const active = draft.colors.includes(color);
                  return (
                    <button
                      key={color}
                      type="button"
                      className={`${styles.chip} ${active ? styles.chipActive : ''}`}
                      aria-pressed={active}
                      onClick={() =>
                        setDraft((d) => ({ ...d, colors: toggle(d.colors, color) }))
                      }
                    >
                      {color}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          )}

          {/* Цена */}
          <fieldset className={styles.group}>
            <legend className={`micro ${styles.legend}`}>Цена, ₽</legend>
            <div className={styles.priceRow}>
              <label className={styles.priceField}>
                <span className={styles.priceLabel}>Мин</span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  className={styles.priceInput}
                  value={draft.priceMin ?? ''}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, priceMin: parsePrice(e.target.value) }))
                  }
                  aria-label="Минимальная цена"
                />
              </label>
              <span className={styles.priceDash} aria-hidden="true">—</span>
              <label className={styles.priceField}>
                <span className={styles.priceLabel}>Макс</span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  className={styles.priceInput}
                  value={draft.priceMax ?? ''}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, priceMax: parsePrice(e.target.value) }))
                  }
                  aria-label="Максимальная цена"
                />
              </label>
            </div>
          </fieldset>
        </div>

        <div className={styles.footer}>
          <button type="button" className={styles.ghostBtn} onClick={reset}>
            Сбросить
          </button>
          <button type="button" className={`btn ${styles.applyBtn}`} onClick={apply}>
            Применить
          </button>
        </div>
      </div>
    </div>
  );
}
