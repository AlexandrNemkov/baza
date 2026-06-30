import Breadcrumbs from '@/components/Breadcrumbs';
import FavoritesView from '@/components/FavoritesView';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({
  title: 'Избранное',
  description: 'Сохранённые вещи',
  path: '/izbrannoe',
});

export default function FavoritesPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Главная', href: '/' },
          { name: 'Избранное', href: '/izbrannoe' },
        ]}
      />
      <FavoritesView />
    </>
  );
}
