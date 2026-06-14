import Accordion from './Accordion';
import JsonLd from './JsonLd';
import { faq } from '@/lib/seo/jsonld';
import styles from './FaqBlock.module.css';

type FaqItem = { q: string; a: string };

/** Renders FAQ items as accordions plus FAQPage JSON-LD. */
export default function FaqBlock({ items }: { items: FaqItem[] }) {
  if (items.length === 0) return null;

  return (
    <section className={styles.block}>
      <p className={`micro ${styles.heading}`}>Вопросы и ответы</p>
      <div className={styles.list}>
        {items.map((item) => (
          <Accordion key={item.q} title={item.q}>
            {item.a}
          </Accordion>
        ))}
      </div>
      <JsonLd data={faq(items)} />
    </section>
  );
}
