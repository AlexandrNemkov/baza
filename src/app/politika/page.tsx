import Breadcrumbs from '@/components/Breadcrumbs';
import { buildMetadata } from '@/lib/seo/metadata';
import styles from '../page-content.module.css';

export const metadata = buildMetadata({
  title: 'Политика конфиденциальности',
  description:
    'Политика обработки персональных данных интернет-магазина Baza (демонстрационный текст).',
  path: '/politika',
});

export default function PolitikaPage() {
  return (
    <div className="container">
      <div className={styles.page}>
        <Breadcrumbs
          items={[
            { name: 'Главная', path: '/' },
            { name: 'Политика конфиденциальности', path: '/politika' },
          ]}
        />
        <h1 className={styles.title}>Политика конфиденциальности</h1>

        <div className={styles.prose}>
          <p>
            Настоящая политика описывает порядок обработки персональных данных
            пользователей сайта Baza в соответствии с Федеральным законом
            № 152-ФЗ «О персональных данных».
          </p>

          <h2>Какие данные мы обрабатываем</h2>
          <ul>
            <li>Имя и контактные данные, указанные при оформлении заказа.</li>
            <li>Адрес доставки.</li>
            <li>Сведения о составе и истории заказов.</li>
          </ul>

          <h2>Цели обработки</h2>
          <p>
            Данные используются для оформления и доставки заказов, связи с
            покупателем и выполнения обязательств перед ним. Передача данных
            третьим лицам осуществляется только в объёме, необходимом для
            доставки.
          </p>

          <p className={styles.note}>
            Демонстрационный текст для учебного проекта. Реальный сбор и
            обработка персональных данных не производятся.
          </p>
        </div>
      </div>
    </div>
  );
}
