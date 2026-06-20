'use client';

import { useEffect, useRef, useState } from 'react';
import type { ElementType, ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  /** Stagger in milliseconds applied via CSS transition-delay. */
  delay?: number;
  /** Render element (defaults to a div). */
  as?: ElementType;
  className?: string;
};

/**
 * Fades + rises its children into view once, the first time they intersect the
 * viewport. Purely additive: the CSS (`.reveal` / `.is-visible` in globals.css)
 * does the work and is `prefers-reduced-motion` safe — if a user opts out, the
 * media query renders everything fully visible regardless of the class state.
 */
export default function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Guard for environments without IntersectionObserver (SSR is fine since
    // this only runs in the browser, but stay defensive).
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal${visible ? ' is-visible' : ''}${
        className ? ` ${className}` : ''
      }`}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
