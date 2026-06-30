'use client';

import { useCallback, useSyncExternalStore } from 'react';

/**
 * Клиентское «Избранное» на localStorage. Хранит массив slug товаров.
 * Один общий стор на приложение: кнопки на карточках, в карточке товара и
 * счётчик в шапке остаются синхронными (через useSyncExternalStore), плюс
 * синхронизация между вкладками по событию `storage`.
 *
 * SSR-safe: на сервере и при первой гидратации снимок — пустой массив (та же
 * ссылка), реальные данные подтягиваются в подписке после монтирования, что
 * не ломает гидратацию статического экспорта.
 */
const KEY = 'baza:favorites';
const EMPTY: string[] = [];

let store: string[] = EMPTY;
let hydrated = false;
const listeners = new Set<() => void>();

function readStorage(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function hydrateOnce(): void {
  if (hydrated || typeof window === 'undefined') return;
  hydrated = true;
  const next = readStorage();
  if (next.length > 0) store = next;
}

function emit(): void {
  for (const l of listeners) l();
}

function subscribe(onChange: () => void): () => void {
  // Гидратация на клиенте после первого рендера: React перечитает снимок
  // после subscribe и перерисует с реальными данными.
  hydrateOnce();
  listeners.add(onChange);

  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      store = readStorage();
      emit();
    }
  };
  window.addEventListener('storage', onStorage);

  return () => {
    listeners.delete(onChange);
    window.removeEventListener('storage', onStorage);
  };
}

function getSnapshot(): string[] {
  return store;
}

function getServerSnapshot(): string[] {
  return EMPTY;
}

function setStore(next: string[]): void {
  store = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* приватный режим / переполнение — молча игнорируем */
  }
  emit();
}

export function useFavorites(): {
  favorites: string[];
  toggle: (slug: string) => void;
  isFavorite: (slug: string) => boolean;
} {
  const favorites = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const toggle = useCallback((slug: string) => {
    hydrateOnce();
    const set = new Set(store);
    if (set.has(slug)) set.delete(slug);
    else set.add(slug);
    setStore([...set]);
  }, []);

  const isFavorite = useCallback(
    (slug: string) => favorites.includes(slug),
    [favorites],
  );

  return { favorites, toggle, isFavorite };
}
