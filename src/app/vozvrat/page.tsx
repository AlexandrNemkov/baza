import Breadcrumbs from '@/components/Breadcrumbs';
import { buildMetadata } from '@/lib/seo/metadata';
import styles from '../page-content.module.css';

export const metadata = buildMetadata({
  title: 'Возврат',
  description:
    'Условия возврата и обмена товара Baza: 14 дней на возврат при сохранении товарного вида.',
  path: '/vozvrat',
});

export default function VozvratPage() {
  return (
    <div className="container">
      <div className={styles.page}>
        <Breadcrumbs
          items={[
            { name: 'Главная', href: '/' },
            { name: 'Возврат', href: '/vozvrat' },
          ]}
        />
        <h1 className={styles.title}>Возврат</h1>

        <div className={styles.prose}>
          <p>
            Вещь надлежащего качества можно вернуть в течение 14 дней с момента
            получения.
          </p>

          <h2>Условия возврата</h2>
          <ul>
            <li>Товар не был в употреблении, сохранён его товарный вид.</li>
            <li>Сохранены бирки, ярлыки и фабричная упаковка.</li>
            <li>Есть документ, подтверждающий покупку.</li>
          </ul>

          <h2>Как оформить</h2>
          <p>
            Свяжитесь с поддержкой, опишите причину возврата и согласуйте способ
            отправки. После проверки состояния товара деньги возвращаются тем же
            способом, которым была произведена оплата.
          </p>

          <p className={styles.note}>
            Это демонстрационная витрина: оформить реальный возврат нельзя.
          </p>
        </div>
      </div>
    </div>
  );
}
