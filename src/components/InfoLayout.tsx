import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import styles from './InfoLayout.module.css';

export type InfoNavItem = 'dostavka' | 'oplata' | 'vozvrat' | 'oferta';

const NAV_ITEMS: { key: InfoNavItem; label: string; href: string; num: string }[] = [
  { key: 'dostavka', label: 'Доставка', href: '/dostavka', num: '01' },
  { key: 'oplata',   label: 'Оплата',   href: '/oplata',   num: '02' },
  { key: 'vozvrat',  label: 'Возврат',  href: '/vozvrat',  num: '03' },
  { key: 'oferta',   label: 'Оферта',   href: '/oferta',   num: '04' },
];

interface InfoLayoutProps {
  /** Заголовок страницы (h1) */
  title: string;
  /** Mono-мета справа в titlebar, например «СЕРВИС · 01 / 04\nПО ВСЕЙ РОССИИ» */
  meta: React.ReactNode;
  /** Активный пункт суб-навигации */
  active?: InfoNavItem;
  /** Хлебные крошки — если не передан, генерируется ГЛАВНАЯ / СЕРВИС / title */
  breadcrumbs?: { name: string; href: string }[];
  children: React.ReactNode;
}

/**
 * Общий layout для сервисных страниц (Доставка, Оплата, Возврат, Оферта, Политика).
 * Рендерит: breadcrumbs → titlebar → двухколоночник (snav + content).
 */
export default function InfoLayout({
  title,
  meta,
  active,
  breadcrumbs,
  children,
}: InfoLayoutProps) {
  const crumbs = breadcrumbs ?? [
    { name: 'Главная', href: '/' },
    { name: 'Сервис', href: '/dostavka' },
    { name: title, href: '#' },
  ];

  return (
    <>
      <Breadcrumbs items={crumbs} />

      <div className={styles.titlebar}>
        <div className={`container ${styles.titlebarInner}`}>
          <h1 className={styles.titleH1}>{title}</h1>
          <div className={`mono ${styles.titleMeta}`}>{meta}</div>
        </div>
      </div>

      <div className={`container ${styles.info}`}>
        <aside className={styles.snav}>
          <div className={styles.snavIn}>
            <div className={`mono ${styles.snavLabel}`}>Сервис</div>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`${styles.snavLink}${active === item.key ? ` ${styles.active}` : ''}`}
              >
                <span>{item.label}</span>
                <span className={styles.snavNum}>{item.num}</span>
              </Link>
            ))}
          </div>
        </aside>

        <div className={styles.scontent}>{children}</div>
      </div>
    </>
  );
}

/* ── вспомогательные под-компоненты ────────────────────────── */

interface InfoBlockProps {
  /** Номер блока, например «№ 01» */
  no: string;
  /** Заголовок раздела */
  heading: string;
  children: React.ReactNode;
}

export function InfoBlock({ no, heading, children }: InfoBlockProps) {
  return (
    <div className={styles.sblock}>
      <div className={styles.sblockNo}>{no}</div>
      <h2>{heading}</h2>
      {children}
    </div>
  );
}

interface InfoTableProps {
  rows: [string, string][];
}

export function InfoTable({ rows }: InfoTableProps) {
  return (
    <table className={styles.tbl}>
      <tbody>
        {rows.map(([label, value]) => (
          <tr key={label}>
            <td>{label}</td>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function InfoNote({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.note}>
      <p>{children}</p>
    </div>
  );
}

interface InfoStepsProps {
  steps: React.ReactNode[];
}

export function InfoSteps({ steps }: InfoStepsProps) {
  return (
    <ol className={styles.steps}>
      {steps.map((step, i) => (
        <li key={i}>
          <span className={styles.stepNum}>{String(i + 1).padStart(2, '0')}</span>
          <span>{step}</span>
        </li>
      ))}
    </ol>
  );
}

/** Нумерованный список пунктов оферты вида «2.1 — текст» */
interface InfoClauseProps {
  items: { num: string; text: React.ReactNode }[];
}

export function InfoClause({ items }: InfoClauseProps) {
  return (
    <ul className={styles.clause}>
      {items.map((item) => (
        <li key={item.num}>
          <span className={styles.clauseNum}>{item.num}</span>
          <span>{item.text}</span>
        </li>
      ))}
    </ul>
  );
}

/** Таблица реквизитов (левая колонка — моно-метка, правая — значение) */
interface InfoReqsProps {
  rows: [string, string][];
}

export function InfoReqs({ rows }: InfoReqsProps) {
  return (
    <table className={styles.reqs}>
      <tbody>
        {rows.map(([label, value]) => (
          <tr key={label}>
            <td>{label}</td>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
