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
  /**
   * Full-bleed-режим: хайрлайн во всю ширину, а текст summary/панели инсетится
   * на `--pad` (как секции/шапка). Используется в FAQ карточки товара.
   */
  inset?: boolean;
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
  inset = false,
}: AccordionProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  // Uncontrolled: let native <details> drive; mirror its open state to React
  // (for the +/− icon) and forward to onToggle if a listener is present.
  const handleNativeToggle = (e: React.SyntheticEvent<HTMLDetailsElement>) => {
    const next = (e.currentTarget as HTMLDetailsElement).open;
    setUncontrolledOpen(next);
    onToggle?.(next);
  };

  // Controlled: suppress the browser's native toggle and ask the parent to
  // flip the state. The DOM `open` attribute is then always determined by the
  // `open` prop, never by native behaviour.
  const handleControlledClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    onToggle?.(!open);
  };

  return (
    <details
      className={styles.item}
      id={id}
      open={open}
      onToggle={isControlled ? undefined : handleNativeToggle}
    >
      <summary
        className={`${styles.summary}${inset ? ` ${styles.summaryInset}` : ''}`}
        onClick={isControlled ? handleControlledClick : undefined}
      >
        <span className={styles.title}>{title}</span>
      </summary>
      <div className={`${styles.panel}${inset ? ` ${styles.panelInset}` : ''}`}>
        {children}
      </div>
    </details>
  );
}
