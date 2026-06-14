import Breadcrumbs from '@/components/Breadcrumbs';
import { buildMetadata } from '@/lib/seo/metadata';
import styles from '../page-content.module.css';

export const metadata = buildMetadata({
  title: 'Доставка',
  description:
    'Способы и сроки доставки заказов Baza по России: курьерские службы, Почта России, постаматы.',
  path: '/dostavka',
});

export default function DostavkaPage() {
  return (
    <div className="container">
      <div className={styles.page}>
        <Breadcrumbs
          items={[
            { name: 'Главная', path: '/' },
            { name: 'Доставка', path: '/dostavka' },
          ]}
        />
        <h1 className={styles.title}>Доставка</h1>

        <div className={styles.prose}>
          <p>
            Доставляем заказы по всей России. Способ и срок вы выбираете при
            оформлении — ниже общие ориентиры.
          </p>

          <h2>Способы доставки</h2>
          <ul>
            <li>Курьером СДЭК — до двери или в пункт выдачи.</li>
            <li>Почтой России — в населённые пункты без курьерских служб.</li>
            <li>Яндекс Доставка — по крупным городам, день в день.</li>
          </ul>

          <h2>Сроки</h2>
          <ul>
            <li>Москва и Санкт-Петербург — 1–3 рабочих дня.</li>
            <li>Города-миллионники — 2–5 рабочих дней.</li>
            <li>Удалённые регионы — от 5 рабочих дней.</li>
          </ul>

          <h2>Стоимость</h2>
          <p>
            Стоимость рассчитывается при оформлении заказа и зависит от региона,
            веса и выбранной службы. Точную сумму вы видите до подтверждения
            заказа.
          </p>

          <p className={styles.note}>
            Это демонстрационная витрина: реальная отправка заказов не
            производится.
          </p>
        </div>
      </div>
    </div>
  );
}
