import Breadcrumbs from '@/components/Breadcrumbs';
import { buildMetadata } from '@/lib/seo/metadata';
import styles from '../page-content.module.css';

export const metadata = buildMetadata({
  title: 'Оплата',
  description:
    'Способы оплаты заказов Baza: банковской картой онлайн и через Систему быстрых платежей (СБП).',
  path: '/oplata',
});

export default function OplataPage() {
  return (
    <div className="container">
      <div className={styles.page}>
        <Breadcrumbs
          items={[
            { name: 'Главная', href: '/' },
            { name: 'Оплата', href: '/oplata' },
          ]}
        />
        <h1 className={styles.title}>Оплата</h1>

        <div className={styles.prose}>
          <p>Оплатить заказ можно онлайн при оформлении.</p>

          <h2>Способы оплаты</h2>
          <ul>
            <li>Банковской картой — Visa, Mastercard, «Мир».</li>
            <li>Через Систему быстрых платежей (СБП) по QR-коду.</li>
          </ul>

          <h2>Безопасность</h2>
          <p>
            Платежи проходят через защищённое соединение на стороне платёжного
            провайдера. Данные карты не сохраняются в магазине.
          </p>

          <p className={styles.note}>
            Это демонстрационная витрина: приём платежей не подключён, оплата не
            списывается.
          </p>
        </div>
      </div>
    </div>
  );
}
