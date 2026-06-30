'use client';

import { useFavorites } from '@/lib/useFavorites';
import styles from './FavoriteButton.module.css';

type FavoriteButtonProps = {
  slug: string;
  /** Название товара — для доступной подписи. */
  title: string;
  /** 'icon' — кружок-сердечко в углу карточки; 'full' — кнопка с текстом. */
  variant?: 'icon' | 'full';
};

function Heart({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20.5 4.2 12.7a4.6 4.6 0 0 1 0-6.5 4.6 4.6 0 0 1 6.5 0l1.3 1.3 1.3-1.3a4.6 4.6 0 0 1 6.5 0 4.6 4.6 0 0 1 0 6.5z" />
    </svg>
  );
}

/**
 * Переключатель «в избранное» поверх localStorage-стора (см. useFavorites).
 * На карточке (`icon`) лежит в `position:absolute`-углу внутри ссылки, поэтому
 * глушит клик, чтобы не уводить на страницу товара.
 */
export default function FavoriteButton({
  slug,
  title,
  variant = 'icon',
}: FavoriteButtonProps) {
  const { isFavorite, toggle } = useFavorites();
  const active = isFavorite(slug);

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(slug);
  };

  const label = active
    ? `Убрать «${title}» из избранного`
    : `Добавить «${title}» в избранное`;

  if (variant === 'full') {
    return (
      <button
        type="button"
        className={`${styles.full}${active ? ` ${styles.fullActive}` : ''}`}
        aria-pressed={active}
        aria-label={label}
        onClick={onClick}
      >
        <Heart filled={active} />
        {active ? 'В избранном' : 'В избранное'}
      </button>
    );
  }

  return (
    <button
      type="button"
      className={`${styles.icon}${active ? ` ${styles.iconActive}` : ''}`}
      aria-pressed={active}
      aria-label={label}
      title={label}
      onClick={onClick}
    >
      <Heart filled={active} />
    </button>
  );
}
