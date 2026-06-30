'use client';

import Link from 'next/link';
import { useState } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getAllArticles } from '@/data/blog';
import { asset } from '@/lib/basePath';
import styles from './page.module.css';

// Картинки для статей (по порядку slug)
const ARTICLE_IMAGES: Record<string, string> = {
  'kak-sobrat-bazovyy-garderob': '/img/p03.jpg',
  'uhod-za-lnom': '/img/p07.jpg',
  'kto-shit-v-rossii': '/img/p13.jpg',
};

const CHIPS = ['Всё', 'Гид', 'Уход', 'Люди', 'Съёмка', 'Материалы'];

const fmtDateShort = (iso: string) => {
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;
};

export default function BlogPage() {
  const articles = getAllArticles();
  const [activeChip, setActiveChip] = useState('Всё');

  const [lead, ...rest] = articles;

  const leadImg = ARTICLE_IMAGES[lead.slug] ?? '/img/p01.jpg';

  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Главная', href: '/' },
          { name: 'Журнал', href: '/blog' },
        ]}
      />

      {/* titlebar */}
      <div className={styles.titlebar}>
        <div className={styles.titlebarInner}>
          <h1 className={styles.titleH1}>Журнал</h1>
          <div className={`mono ${styles.titleMeta}`}>
            Выпуск №01
            <br />
            Гиды · Уход · Люди
          </div>
        </div>
      </div>

      {/* rubrics */}
      <div className={styles.rubr}>
        <div className={styles.rubrInner}>
          {CHIPS.map((chip) => (
            <button
              key={chip}
              className={`${styles.chip} ${activeChip === chip ? styles.chipActive : ''}`}
              onClick={() => setActiveChip(chip)}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* lead article */}
      <section className={styles.leadart}>
        <div className={styles.leadImg}>
          <img
            src={asset(leadImg)}
            alt={lead.title}
            className={styles.leadPhoto}
          />
          <span className={`mono ${styles.leadIdx}`}>№ 01 / ОБЛОЖКА · FW26</span>
        </div>
        <div className={styles.leadTxt}>
          <div className={styles.leadTags}>
            <span className={styles.leadTagAccent}>Гид</span>
            <span>8 мин чтения</span>
            <span>{fmtDateShort(lead.date)}</span>
          </div>
          <h2 className={styles.leadH2}>{lead.title}</h2>
          <p className={styles.leadExcerpt}>{lead.excerpt}</p>
          <Link href={`/blog/${lead.slug}`} className={styles.leadMore}>
            Читать материал →
          </Link>
        </div>
      </section>

      {/* article grid */}
      <div className={styles.ag}>
        {rest.map((a, i) => {
          const img = ARTICLE_IMAGES[a.slug] ?? `/img/p${String((i + 2) % 16 + 1).padStart(2, '0')}.jpg`;
          return (
            <div key={a.slug} className={styles.agCell}>
              <Link href={`/blog/${a.slug}`} className={styles.agLink}>
                <div className={styles.agPhoto}>
                  <img src={asset(img)} alt={a.title} />
                  <span className={`mono ${styles.agNo}`}>0{i + 2}</span>
                </div>
                <div className={styles.agTags}>
                  <span className={styles.agTagAccent}>Уход</span>
                  <span>5 мин</span>
                </div>
                <h3 className={styles.agH3}>{a.title}</h3>
                <p className={styles.agExcerpt}>{a.excerpt}</p>
              </Link>
            </div>
          );
        })}
      </div>

      {/* banner / newsletter */}
      <div className={styles.banner}>
        <div className={`mono cap ${styles.bannerCap}`}>№ 11 — Письма Baza</div>
        <h2 className={styles.bannerH2}>
          Тексты <em className={styles.bannerEm}>раз в неделю</em>
        </h2>
        <form
          className={styles.field}
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Ваша почта"
            className={styles.fieldInput}
            aria-label="Электронная почта"
          />
          <button type="submit" className={`mono ${styles.fieldBtn}`}>
            Подписаться
          </button>
        </form>
      </div>
    </>
  );
}
