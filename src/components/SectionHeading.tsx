import Link from 'next/link';
import styles from './SectionHeading.module.css';

type SectionHeadingProps = {
  /** Номер секции — больше не рисуется; проп оставлен для совместимости вызовов. */
  index?: string;
  /** Заголовок секции. */
  title: string;
  /** Опциональный путь для CTA-ссылки справа. */
  href?: string;
  /** Текст CTA; по умолчанию «Все →». */
  cta?: string;
};

/**
 * Заголовок секции в стиле C (.sbar из product.html):
 * слева — номер (mono --accent) + заголовок;
 * справа — опциональная CTA-ссылка (mono --accent).
 *
 * Не <h1>; заголовок — <h2> (как в эталоне .sbar h2).
 * API пропсов сохранён для совместимости с вызовами на страницах.
 */
export default function SectionHeading({
  title,
  href,
  cta = 'Все →',
}: SectionHeadingProps) {
  return (
    <div className={styles.row}>
      <div className={styles.label}>
        <h2 className={styles.title}>{title}</h2>
      </div>
      {href && (
        <Link href={href} className={styles.cta}>
          {cta}
        </Link>
      )}
    </div>
  );
}
