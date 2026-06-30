'use client';

import { useState } from 'react';
import styles from './StickyBuyBar.module.css';

type StickyBuyBarProps = {
  price: number;
  selectedSize?: string;
};

/**
 * Fixed mobile-only sticky add-to-cart bar for the product page.
 * Visual only — no cart logic. Shows transient "Добавлено" confirmation.
 * Only visible on mobile (<981px); desktop info column has its own inline CTA.
 */
export default function StickyBuyBar({ price, selectedSize }: StickyBuyBarProps) {
  const [added, setAdded] = useState(false);

  const onAdd = () => {
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className={styles.bar} role="region" aria-label="Покупка">
      <div className={`container ${styles.inner}`}>
        <div className={styles.info}>
          <span className={`micro ${styles.size}`}>
            Размер {selectedSize ?? '—'}
          </span>
          <span className={styles.price}>{price.toLocaleString('ru-RU')} ₽</span>
        </div>
        <button type="button" className={`btn ${styles.cta}`} onClick={onAdd}>
          {added ? 'Добавлено' : 'В корзину'}
        </button>
      </div>
    </div>
  );
}
