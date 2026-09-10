'use client';

import { useLayoutEffect, useRef } from 'react';
import styles from './Reveal.module.css';

type RevealProps = {
  children: React.ReactNode;
  /** Seconds to stagger this element behind its neighbours. */
  delay?: number;
  /** Element to render. Defaults to a plain div. */
  as?: 'div' | 'section' | 'li' | 'article';
  className?: string;
};

/**
 * Plays the design's `rise` entrance once, when the element scrolls into view.
 *
 * The markup renders visible. This hides it only after mount — in a layout
 * effect, so it happens before paint and never flashes — which means a
 * visitor whose JavaScript fails still sees every section. State lives on the
 * DOM node rather than in React, so revealing costs no re-render.
 */
export function Reveal({ children, delay = 0, as: Tag = 'div', className }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    node.dataset.reveal = 'pending';

    const reveal = () => {
      node.dataset.reveal = 'in';
    };

    // Anything already on screen reveals on the next frame rather than
    // waiting for a scroll that may never come.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          reveal();
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    );

    observer.observe(node);

    // Failsafe: if the observer never reports (a hidden tab, say), show the
    // content anyway rather than leaving the page blank.
    const failsafe = setTimeout(reveal, 2000);

    return () => {
      observer.disconnect();
      clearTimeout(failsafe);
    };
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`${styles.reveal} ${className ?? ''}`.trim()}
      style={delay ? ({ '--reveal-delay': `${delay}s` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
