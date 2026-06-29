'use client';

import styles from '@/app/page.module.css';

/**
 * Форма подписки на рассылку. Статическая — preventDefault без реальной отправки.
 */
export default function NewsletterForm() {
  return (
    <form
      className={styles.field}
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="Ваша почта"
        className={styles.fieldInput}
        aria-label="Электронная почта"
      />
      <button type="submit" className={`mono ${styles.fieldBtn}`}>
        Подписаться
      </button>
    </form>
  );
}
