import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.fgrid}>
        {/* Логотип + слоган */}
        <div className={styles.brand}>
          <div className={styles.fw}>
            BAZA<b className={styles.dot}>.</b>
          </div>
          <p className={styles.tagline}>
            Магазин-журнал одежды и аксессуаров российских дизайнеров.
          </p>
        </div>

        {/* Магазин */}
        <div>
          <h4 className={styles.colHead}>Магазин</h4>
          <Link href="/catalog" className={styles.link}>Новинки</Link>
          <Link href="/catalog" className={styles.link}>Каталог</Link>
          <Link href="/brands" className={styles.link}>Бренды</Link>
          <Link href="/blog" className={styles.link}>Журнал</Link>
        </div>

        {/* Сервис */}
        <div>
          <h4 className={styles.colHead}>Сервис</h4>
          <Link href="/dostavka" className={styles.link}>Доставка</Link>
          <Link href="/oplata" className={styles.link}>Оплата</Link>
          <Link href="/vozvrat" className={styles.link}>Возврат</Link>
          <Link href="/oferta" className={styles.link}>Оферта</Link>
          <Link href="/politika" className={styles.link}>Политика</Link>
        </div>

        {/* Связь */}
        <div>
          <h4 className={styles.colHead}>Связь</h4>
          <span className={styles.linkDummy}>Telegram</span>
          <span className={styles.linkDummy}>Instagram</span>
          <a href="mailto:hello@baza.ru" className={styles.link}>hello@baza.ru</a>
        </div>
      </div>

      <div className={styles.fbot}>
        <span>© 2026 BAZA</span>
        <span>Выпуск №01 · Сделано в России</span>
      </div>
    </footer>
  );
}
