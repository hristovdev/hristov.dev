'use client';

import { useCallback, useEffect, useLayoutEffect } from 'react';

const LIGHT_QUERY = '(prefers-color-scheme: light)';

/** Stored choice if there is one, otherwise the system preference. */
function prefersLight() {
  try {
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'light';
  } catch {
    // Private mode or blocked storage — fall through to the system setting.
  }
  return window.matchMedia(LIGHT_QUERY).matches;
}

/**
 * Toggles the `lightmode` class on <html>.
 *
 * Deliberately holds no React state: every colour is a CSS custom property and
 * the button's two labels are swapped in CSS, so a theme change repaints
 * without re-rendering anything. That also avoids a hydration mismatch — the
 * server has no way to know which theme `ThemeScript` will apply.
 */
export function useTheme() {
  // `ThemeScript` sets the class during HTML parsing, but React resets <html>
  // to its JSX attributes whenever the root layout remounts — on a client-side
  // locale switch, and on the Strict Mode dev remount. Re-apply before paint.
  useLayoutEffect(() => {
    document.documentElement.classList.toggle('lightmode', prefersLight());
  }, []);

  useEffect(() => {
    // Follow the system until the visitor makes an explicit choice.
    const media = window.matchMedia(LIGHT_QUERY);
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
