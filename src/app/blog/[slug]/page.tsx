import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getAllArticles, getArticle } from '@/data/blog';
import { buildMetadata } from '@/lib/seo/metadata';
import styles from '../../page-content.module.css';

type Params = { slug: string };

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

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  return (
    <div className="container">
      <article className={styles.page}>
        <Breadcrumbs
          items={[
            { name: 'Главная', href: '/' },
            { name: 'Журнал', href: '/blog' },
            { name: a.title, href: '/blog/' + a.slug },
          ]}
        />

        <header>
          <p className={`micro ${styles.meta}`}>{fmtDate(a.date)}</p>
          <h1 className={styles.title}>{a.title}</h1>
        </header>

        <div className={styles.prose}>
          {a.body.map((block, i) => {
            if (block.type === 'h2') return <h2 key={i}>{block.text}</h2>;
            if (block.type === 'ul') {
              return (
                <ul key={i}>
                  {block.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              );
            }
            return <p key={i}>{block.text}</p>;
          })}
        </div>
      </article>
    </div>
  );
}
