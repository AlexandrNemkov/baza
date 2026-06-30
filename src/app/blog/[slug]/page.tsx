import { notFound } from 'next/navigation';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getAllArticles, getArticle } from '@/data/blog';
import { buildMetadata } from '@/lib/seo/metadata';
import { asset } from '@/lib/basePath';
import styles from './article.module.css';

type Params = { slug: string };

// Картинки для статей
const ARTICLE_IMAGES: Record<string, string> = {
  'kak-sobrat-bazovyy-garderob': '/img/p03.jpg',
  'uhod-za-lnom': '/img/p07.jpg',
  'kto-shit-v-rossii': '/img/p13.jpg',
};

const FALLBACK_IMAGES = ['/img/p05.jpg', '/img/p10.jpg', '/img/p16.jpg'];

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return buildMetadata({ path: '/blog/' + slug });
  return buildMetadata({
    title: a.title,
    description: a.excerpt,
    path: '/blog/' + a.slug,
  });
}

const fmtDateShort = (iso: string) => {
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;
};

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  const allArticles = getAllArticles();
  const related = allArticles.filter((x) => x.slug !== slug).slice(0, 3);

  const coverImg = ARTICLE_IMAGES[slug] ?? '/img/p01.jpg';

  return (
    <>
      <Breadcrumbs
          items={[
            { name: 'Главная', href: '/' },
            { name: 'Журнал', href: '/blog' },
            { name: a.title, href: '/blog/' + a.slug },
          ]}
        />

      {/* article header */}
      <div className={styles.ahead}>
        <div className={styles.aheadTags}>
          <span className={styles.aheadTagAccent}>Гид</span>
          <span>8 мин чтения</span>
          <span>{fmtDateShort(a.date)}</span>
        </div>
        <h1 className={styles.aheadH1}>{a.title}</h1>
        <p className={styles.stand}>{a.excerpt}</p>
        <div className={styles.by}>
          <span>
            Текст —{' '}
            <span className={styles.byName}>Редакция Baza</span>
          </span>
        </div>
      </div>

      {/* cover */}
      <div className={styles.cover}>
        <img
          src={asset(coverImg)}
          alt={a.title}
          className={styles.coverPhoto}
        />
        <span className={`mono ${styles.coverIdx}`}>ОБЛОЖКА · LOOKBOOK FW26</span>
      </div>

      {/* body */}
      <article className={styles.body}>
        {(() => {
          let h2Count = 0;
          return a.body.map((block, i) => {
          if (block.type === 'h2') {
            h2Count += 1;
            return (
              <h2 key={i}>
                <span className={`mono ${styles.num}`}>№ {String(h2Count).padStart(2, '0')}</span>
                {block.text}
              </h2>
            );
          }
          if (block.type === 'ul') {
            return (
              <ul key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          }
          if (block.type === 'quote') {
            return (
              <blockquote key={i} className={styles.blockquote}>
                <p>{block.text}</p>
              </blockquote>
            );
          }
          if (block.type === 'figure') {
            return (
              <figure key={i} className={styles.figure}>
                <img
                  src={asset(block.src)}
                  alt={block.caption ?? ''}
                  className={styles.figureImg}
                />
                {block.caption && (
                  <figcaption className={`mono ${styles.figureCaption}`}>
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          }
          // type === 'p'
          return <p key={i}>{block.text}</p>;
        });
        })()}
      </article>

      {/* related */}
      <div className={styles.sbar}>
        <div className={styles.sbarLeft}>
          <span className={`mono ${styles.sbarNo}`}>06</span>
          <h2 className={styles.sbarH2}>Читать дальше</h2>
        </div>
        <Link href="/blog" className={`mono ${styles.sbarLink}`}>
          Весь журнал →
        </Link>
      </div>

      <div className={styles.ag}>
        {related.map((r, i) => {
          const img = ARTICLE_IMAGES[r.slug] ?? FALLBACK_IMAGES[i] ?? '/img/p05.jpg';
          return (
            <div key={r.slug} className={styles.agCell}>
              <Link href={`/blog/${r.slug}`} className={styles.agLink}>
                <div className={styles.agPhoto}>
                  <img src={asset(img)} alt={r.title} />
                </div>
                <div className={`mono ${styles.agTag}`}>Журнал</div>
                <h3 className={styles.agH3}>{r.title}</h3>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
