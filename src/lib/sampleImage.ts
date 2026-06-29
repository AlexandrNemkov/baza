import type { Product } from '@/data/types';
import { asset } from './basePath';

/**
 * Локальные курированные фэшн-фото из public/img (p01.jpg … p16.jpg).
 * Каждый продукт получает стабильное фото: номер определяется детерминированным
 * хэшом slug + индекс слайда. При реальной съёмке заменяются на image.src
 * из собственных данных продукта.
 */

/** Малый стабильный хэш строки → неотрицательное целое. */
function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/**
 * Детерминированный путь к локальному фото для продукта при индексе `i`.
 * Параметры `_width` / `_height` оставлены для совместимости вызовов — не используются.
 */
export function sampleImage(product: Product, i = 0, _width?: number, _height?: number): string {
  const n = ((hash(product.slug) + i) % 16) + 1;
  const nn = String(n).padStart(2, '0');
  return asset(`/img/p${nn}.jpg`);
}
