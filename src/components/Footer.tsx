import Link from 'next/link';
import styles from './Footer.module.css';

const NAV_LINKS = [
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

const LEGAL_LINKS = [
  { label: 'Оферта', href: '/oferta' },
  { label: 'Политика', href: '/politika' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <p className={styles.wordmark} aria-hidden="true">
          Baza
        </p>

        <div className={styles.cols}>
          <div className={styles.col}>
            <span className={styles.brand}>BAZA</span>
            <p className={styles.brandLine}>
              Baza — одежда и аксессуары российских дизайнеров
            </p>
          </div>

          <div className={styles.col}>
            <p className={`micro ${styles.label}`}>Навигация</p>
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={styles.link}>
                {l.label}
              </Link>
            ))}
          </div>

          <div className={styles.col}>
            <p className={`micro ${styles.label}`}>Сервис</p>
            {SERVICE_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={styles.link}>
                {l.label}
              </Link>
            ))}
            {LEGAL_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={styles.link}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <p className={styles.bottom}>© {new Date().getFullYear()} Baza</p>
      </div>
    </footer>
  );
}
