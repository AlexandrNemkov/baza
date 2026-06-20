import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import CategoryTile from '@/components/CategoryTile';
import BrandCard from '@/components/BrandCard';
import FaqBlock from '@/components/FaqBlock';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import { getAllProducts, getAllBrands, getAllCategories } from '@/data';
import { buildMetadata } from '@/lib/seo/metadata';
import styles from './page.module.css';

export const metadata = buildMetadata({ path: '/' });

const HOME_FAQ = [
  {
    q: 'Что такое Baza?',
    a: 'Baza — мультибренд-магазин одежды и аксессуаров российских дизайнеров. Мы собираем базу гардероба от локальных марок: спокойные вещи вне сезона с акцентом на крой и материалы.',
  },
  {
    q: 'Как происходит доставка?',
    a: 'Доставляем по всей России курьерскими службами и почтой. Сроки зависят от региона; стоимость рассчитывается при оформлении заказа.',
  },
  {
    q: 'Какие способы оплаты доступны?',
    a: 'Оплата картой онлайн при оформлении заказа. Все платежи проходят через защищённое соединение.',
  },
  {
    q: 'Можно ли вернуть товар?',
    a: 'Да. Вещь надлежащего качества можно вернуть в течение 14 дней с момента получения, если она не была в употреблении и сохранён товарный вид.',
  },
];

const ADVANTAGES = [
  { title: 'Доставка по РФ', text: 'Курьер и почта во все регионы.' },
  { title: 'Удобная оплата', text: 'Картой онлайн, защищённое соединение.' },
  { title: 'Локальные дизайнеры', text: 'Поддерживаем российские марки.' },
];

export default function Home() {
  const newProducts = getAllProducts().slice(0, 4);
  const topCategories = getAllCategories().filter((c) => !c.parentSlug);
  const brands = getAllBrands();

  return (
    <>
      <Hero />

      <section className={`container ${styles.section}`}>
        <SectionHeading index="01" title="Новинки" href="/catalog" cta="Каталог" />
        <Reveal>
          <ProductGrid products={newProducts} />
        </Reveal>
      </section>

      <section className={`container ${styles.section}`}>
        <SectionHeading index="02" title="Категории" />
        <Reveal>
          <div className={styles.categories}>
            {topCategories.map((c) => (
              <CategoryTile key={c.slug} category={c} />
            ))}
          </div>
        </Reveal>
      </section>

      <section className={`container ${styles.section}`}>
        <SectionHeading index="03" title="Бренды" href="/brands" cta="Все" />
        <Reveal>
          <div className={styles.brands}>
            {brands.map((b) => (
              <BrandCard key={b.slug} brand={b} />
            ))}
          </div>
        </Reveal>
      </section>

      <section className={`container ${styles.section}`}>
        <div className={styles.advantages}>
          {ADVANTAGES.map((a) => (
            <div key={a.title} className={styles.advantage}>
              <p className={`micro ${styles.advTitle}`}>{a.title}</p>
              <p className={styles.advText}>{a.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`container ${styles.section}`}>
        <FaqBlock items={HOME_FAQ} />
      </section>
    </>
  );
}
