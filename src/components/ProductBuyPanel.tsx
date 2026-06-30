'use client';

import { useRef, useState } from 'react';
import type { ReactNode } from 'react';
import Accordion from './Accordion';
import StickyBuyBar from './StickyBuyBar';
import styles from './ProductBuyPanel.module.css';

type ProductBuyPanelProps = {
  price: number;
  sizes: string[];
  /** Rendered SizeChart (table or string) for the Размеры accordion. */
  sizeChart: ReactNode;
  /** Composition + care copy for the "Состав и уход" accordion. */
  careContent: ReactNode;
};

const SIZE_CHART_ID = 'pdp-size-chart';

/**
 * Client info panel for the editorial PDP. Owns the selected-size state and
 * shares it between the sharp segmented size selector and the mobile-only
 * StickyBuyBar. Also owns the open state of the Размеры accordion so the inline
 * "Таблица размеров" link can expand + scroll to it.
 *
 * Visual only — no cart logic. Price is shown mono weight 600.
 */
export default function ProductBuyPanel({
  price,
  sizes,
  sizeChart,
  careContent,
}: ProductBuyPanelProps) {
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    sizes[0],
  );
  const [sizeChartOpen, setSizeChartOpen] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  const openSizeChart = () => {
    setSizeChartOpen(true);
    // Defer to next frame so the panel is expanded before we scroll to it.
    requestAnimationFrame(() => {
      chartRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    });
  };

  const priceFormatted = price.toLocaleString('ru-RU');

  return (
    <div className={styles.panel}>
      {/* Price */}
      <p className={styles.price}>{priceFormatted} ₽</p>

      {/* В наличии */}
      <p className={styles.metaline}>В наличии · Отгрузка 1–2 дня</p>

      {/* Size selector */}
      {sizes.length > 0 && (
        <div className={styles.sizes}>
          <div className={styles.sizeRow}>
            <span className={`cap ${styles.label}`}>Размер</span>
            <button
              type="button"
              className={styles.chartLink}
              onClick={openSizeChart}
            >
              Таблица размеров →
            </button>
          </div>
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

      {/* CTA — В корзину с ценой (скрыт на мобайл, там StickyBuyBar) */}
      <button type="button" className={styles.buy}>
        В корзину — {priceFormatted} ₽
      </button>

      {/* Meta delivery line */}
      <p className={styles.metaline}>
        Доставка по РФ · Возврат 14 дней · Оплата картой и СБП
      </p>

      {/* Accordion block */}
      <div className={styles.acc}>
        <Accordion title="Состав и уход" defaultOpen>
          {careContent}
        </Accordion>
        <div ref={chartRef}>
          <Accordion
            title="Размеры"
            id={SIZE_CHART_ID}
            open={sizeChartOpen}
            onToggle={setSizeChartOpen}
          >
            {sizeChart}
          </Accordion>
        </div>
        <Accordion title="Доставка и возврат">
          <p className={styles.text}>
            СДЭК, Почта России и курьер по Москве. Бесплатно от 10 000 ₽.
            Возврат в течение 14 дней по ЗоЗПП.
          </p>
        </Accordion>
      </div>

      <StickyBuyBar price={price} selectedSize={selectedSize} />
    </div>
  );
}
