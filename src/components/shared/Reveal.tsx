'use client';

import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import { useEffect, useRef, useState } from 'react';

type RevealProps = {
  children: React.ReactNode;
  /** Transition delay in ms, for staggering siblings. */
  delay?: number;
  sx?: SxProps<Theme>;
};

/**
 * Fades and slides content in when it scrolls into the viewport.
 * With reduced motion the transition is disabled via CSS, so content
 * simply appears as soon as the observer fires.
 */
export default function Reveal({ children, delay = 0, sx }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={ref}
      sx={[
        {
          height: '100%',
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(24px)',
          transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
          transitionDelay: `${delay}ms`,
          '@media (prefers-reduced-motion: reduce)': {
            transition: 'none',
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  );
}
