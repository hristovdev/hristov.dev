'use client';

import { useEffect, useRef, useState } from 'react';

const DURATION_MS = 1400;
const VALUE_PATTERN = /^([^0-9]*)(\d+)(.*)$/;

/**
 * Animates the numeric part of values like "10+", "40+" or "<24h"
 * from zero when the element first scrolls into view.
 */
export default function NumberTicker({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(() => {
    const match = value.match(VALUE_PATTERN);
    return match ? `${match[1]}0${match[3]}` : value;
  });

  useEffect(() => {
    const element = ref.current;
    const match = value.match(VALUE_PATTERN);
    if (!element || !match) {
      return;
    }

    const [, prefix = '', digits = '0', suffix = ''] = match;
    const target = Number(digits);
    let frame = 0;

    const animate = () => {
      const startedAt = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - startedAt) / DURATION_MS, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        setDisplay(`${prefix}${Math.round(eased * target)}${suffix}`);
        if (progress < 1) {
          frame = requestAnimationFrame(tick);
        }
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          observer.disconnect();
          if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setDisplay(value);
          } else {
            animate();
          }
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {display}
    </span>
  );
}
