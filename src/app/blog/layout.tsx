import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({
  title: 'Журнал',
  description:
    'Журнал Baza: статьи о базовом гардеробе, российских дизайнерах и уходе за вещами.',
  path: '/blog',
});

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
