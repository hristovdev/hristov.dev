'use client';

import { useCallback, useEffect } from 'react';

/**
 * Toggles the `lightmode` class on <html>.
 *
 * Deliberately holds no React state: every colour is a CSS custom property and
 * the button's two labels are swapped in CSS, so a theme change repaints
 * without re-rendering anything. That also avoids a hydration mismatch — the
 * server has no way to know which theme `ThemeScript` will apply.
 */
export function useTheme() {
  useEffect(() => {
    // Follow the system until the visitor makes an explicit choice.
    const media = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = (event: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem('theme')) return;
      } catch {
        return;
      }
      document.documentElement.classList.toggle('lightmode', event.matches);
    };

    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return useCallback(() => {
    const root = document.documentElement;
    const nextIsLight = !root.classList.contains('lightmode');
    root.classList.toggle('lightmode', nextIsLight);
    try {
      localStorage.setItem('theme', nextIsLight ? 'light' : 'dark');
    } catch {
      // Private mode or blocked storage — the toggle still works for this visit.
    }
  }, []);
}
