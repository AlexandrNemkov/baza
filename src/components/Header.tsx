'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

const NAV_LINKS = [
  { label: 'Новинки', href: '/catalog' },
  { label: 'Каталог', href: '/catalog' },
  { label: 'Бренды', href: '/brands' },
  { label: 'Журнал', href: '/blog' },
];

const MMENU_LINKS = [
  { label: 'Новинки', href: '/catalog' },
  { label: 'Каталог', href: '/catalog' },
  { label: 'Бренды', href: '/brands' },
  { label: 'Журнал', href: '/blog' },
];

function getActiveHref(pathname: string): string | null {
  if (pathname.startsWith('/blog')) return '/blog';
  if (pathname.startsWith('/brands')) return '/brands';
  if (pathname.startsWith('/catalog')) return '/catalog';
  return null;
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const activeHref = getActiveHref(pathname);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // Закрываем меню при смене роута
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Util-бар */}
      <div className={styles.util}>
        <div className={styles.utilWrap}>
          <span className={`cap ${styles.utilText}`}>
            Бесплатная доставка по РФ от 10&nbsp;000&nbsp;₽
          </span>
          <span className={`cap ${styles.utilText} ${styles.utilRight}`}>
            Выпуск №01 · <span className={styles.accentSpan}>2026</span>
          </span>
        </div>
      </div>

      {/* Шапка */}
      <header className={styles.header}>
        <div className={styles.hrow}>
          {/* Бургер — только мобайл, слева */}
          <button
            type="button"
            className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={open}
            aria-controls="site-mmenu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
          </button>

          {/* Навигация — десктоп, слева */}
          <nav className={styles.main} aria-label="Основная навигация">
            {NAV_LINKS.map((l) => (
              <Link
                key={`${l.label}-${l.href}`}
                href={l.href}
                className={`${styles.mainLink}${activeHref === l.href && l.label !== 'Новинки' ? ` ${styles.on}` : ''}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Логотип — по центру */}
          <Link href="/" className={styles.wordmark} aria-label="Главная — BAZA">
            BAZA<b className={styles.dot}>.</b>
          </Link>

          {/* Правая навигация */}
          <nav className={styles.hnav} aria-label="Действия">
            <button type="button" className={styles.favLink}>
              Избранное
            </button>
            <button type="button">Корзина</button>
          </nav>
        </div>

        {/* Мобильное выпадающее меню */}
        <nav
          id="site-mmenu"
          className={`${styles.mmenu}${open ? ` ${styles.mmenuOpen}` : ''}`}
          aria-label="Мобильное меню"
          aria-hidden={!open}
        >
          {MMENU_LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className={styles.mmenuLink}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <button
            type="button"
            className={styles.mmenuLink}
            onClick={() => setOpen(false)}
          >
            Избранное
          </button>
        </nav>
      </header>
    </>
  );
}
