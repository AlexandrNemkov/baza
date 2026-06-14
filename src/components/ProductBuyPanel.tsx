'use client';

import { useState } from 'react';
import StickyBuyBar from './StickyBuyBar';
import styles from './ProductBuyPanel.module.css';

type ProductBuyPanelProps = {
  price: number;
  sizes: string[];
};

/**
 * Client panel that owns the selected-size state and shares it between the
 * sharp segmented size selector and the fixed StickyBuyBar. Visual only — no
 * cart logic. Price is shown with weight 500.
 */
export default function ProductBuyPanel({ price, sizes }: ProductBuyPanelProps) {
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    sizes[0],
  );

  return (
    <div className={styles.panel}>
      <p className={styles.price}>{price.toLocaleString('ru-RU')} ₽</p>

      {sizes.length > 0 && (
        <div className={styles.sizes}>
          <p className={`micro ${styles.label}`}>Размер</p>
          <div className={styles.chips} role="group" aria-label="Размер">
            {sizes.map((size) => {
              const active = size === selectedSize;
              return (
                <button
                  key={size}
                  type="button"
                  className={`${styles.chip} ${active ? styles.chipActive : ''}`}
                  aria-pressed={active}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <StickyBuyBar price={price} selectedSize={selectedSize} />
    </div>
  );
}
