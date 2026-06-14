'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

const PRIMARY_LINKS = [
  { label: 'Каталог', href: '/catalog' },
  { label: 'Бренды', href: '/brands' },
  { label: 'Подборки', href: '/podborki' },
  { label: 'Блог', href: '/blog' },
];

const SERVICE_LINKS = [
  { label: 'Доставка', href: '/dostavka' },
  { label: 'Оплата', href: '/oplata' },
  { label: 'Возврат', href: '/vozvrat' },
];

function BurgerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <line x1="3" y1="7" x2="21" y2="7" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="17" x2="21" y2="17" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <line x1="16.5" y1="16.5" x2="21" y2="21" />
    </svg>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`${styles.header} glass`}>
      <div className={`${styles.bar} container`}>
        <button
          type="button"
          className={styles.iconBtn}
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon /> : <BurgerIcon />}
        </button>

        <Link href="/" className={styles.wordmark}>
          BAZA
        </Link>

        <button
          type="button"
          className={`${styles.iconBtn} ${styles.searchBtn}`}
          aria-label="Поиск"
        >
          <SearchIcon />
        </button>
      </div>

      {open && (
        <>
          <button
            type="button"
            className={styles.overlay}
            aria-label="Закрыть меню"
            tabIndex={-1}
            onClick={() => setOpen(false)}
          />
          <div id="site-menu" className={`${styles.panel} glass`}>
            <div className="container">
              <p className={`micro ${styles.eyebrow}`}>Меню</p>
              <nav className={styles.nav} aria-label="Основная навигация">
                {PRIMARY_LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={styles.navLink}
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>

              <div className={styles.divider} />

              <nav className={styles.serviceNav} aria-label="Сервис">
                {SERVICE_LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={styles.serviceLink}
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
