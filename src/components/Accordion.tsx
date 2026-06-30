'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import styles from './Accordion.module.css';

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

/**
 * Single collapsible row using native <details>/<summary>.
 * Icon: + when closed, − when open (via CSS ::after on summary).
 * Supports both uncontrolled (defaultOpen) and controlled (open + onToggle) modes.
 */
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

  const handleToggle = (e: React.SyntheticEvent<HTMLDetailsElement>) => {
    const next = (e.currentTarget as HTMLDetailsElement).open;
    if (!isControlled) setUncontrolledOpen(next);
    onToggle?.(next);
  };

  return (
    <details
      className={styles.item}
      id={id}
      open={open}
      onToggle={handleToggle}
    >
      <summary className={styles.summary}>
        <span className={styles.title}>{title}</span>
      </summary>
      <div className={styles.panel}>
        {children}
      </div>
    </details>
  );
}
