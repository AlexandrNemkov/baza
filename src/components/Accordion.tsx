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
  /**
   * Controlled mode: when `open` is provided, the parent owns the open state
   * and must update it via `onToggle`. Used by the PDP "Таблица размеров" link
   * to expand the Размеры row. Omit both for the default uncontrolled mode.
   */
  open?: boolean;
  onToggle?: (next: boolean) => void;
  /** Optional anchor id so the panel can be smooth-scrolled into view. */
  id?: string;
};

/** Single hairline-bordered collapsible row with a uppercase micro title. */
export default function Accordion({
  title,
  children,
  defaultOpen = false,
  open: controlledOpen,
  onToggle,
  id,
}: AccordionProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const panelId = useId();

  const toggle = () => {
    const next = !open;
    if (!isControlled) setUncontrolledOpen(next);
    onToggle?.(next);
  };

  return (
    <div className={styles.item} id={id}>
      <button
        type="button"
        className={styles.header}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={toggle}
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
