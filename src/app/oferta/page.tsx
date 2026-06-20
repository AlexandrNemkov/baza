import Breadcrumbs from '@/components/Breadcrumbs';
import { buildMetadata } from '@/lib/seo/metadata';
import styles from '../page-content.module.css';

export const metadata = buildMetadata({
  title: 'Публичная оферта',
  description: 'Публичная оферта интернет-магазина Baza (демонстрационный текст).',
  path: '/oferta',
});

export default function OfertaPage() {
  return (
    <div className="container">
      <div className={styles.page}>
        <Breadcrumbs
          items={[
            { name: 'Главная', href: '/' },
            { name: 'Публичная оферта', href: '/oferta' },
          ]}
        />
        <h1 className={styles.title}>Публичная оферта</h1>

        <div className={styles.prose}>
          <p>
            Настоящий документ является публичной офертой интернет-магазина Baza
            и определяет условия приобретения товаров через сайт. Оформляя заказ,
            покупатель принимает условия оферты в полном объёме.
          </p>

          <h2>Предмет оферты</h2>
          <p>
            Продавец обязуется передать покупателю товар, представленный в
            каталоге, а покупатель — принять и оплатить его на условиях,
            указанных при оформлении заказа.
          </p>

          <h2>Цена и оплата</h2>
          <p>
            Цена товара указывается на странице товара в рублях. Оплата
            производится способами, описанными в разделе «Оплата».
          </p>

          <p className={styles.note}>
            Демонстрационный текст для учебного проекта. Не является юридически
            значимой публичной офертой.
          </p>
        </div>
      </div>
    </div>
  );
}
