'use client';

import { useId, useState } from 'react';
import type { ReactNode } from 'react';
import styles from './Accordion.module.css';

function PlusIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

type AccordionProps = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

/** Single hairline-bordered collapsible row with a uppercase micro title. */
export default function Accordion({ title, children, defaultOpen = false }: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <div className={styles.item}>
      <button
        type="button"
        className={styles.header}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={`micro ${styles.title}`}>{title}</span>
        {open ? <MinusIcon /> : <PlusIcon />}
      </button>
      {open && (
        <div id={panelId} className={styles.panel}>
          {children}
        </div>
      )}
    </div>
  );
}
