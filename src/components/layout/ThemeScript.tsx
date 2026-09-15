'use client';

/**
 * Applies the stored (or system) theme before first paint.
 *
 * This has to be a blocking inline script in <head>: any later and the page
 * paints dark, then flips to light. It mirrors the logic in `useTheme`, which
 * takes over once React hydrates.
 *
 * The locale layout remounts on a client-side locale switch, and React warns
 * whenever it creates an executable <script> on the client (it would never run
 * anyway). So the server emits a real script, while the client renders it as
 * an inert `text/plain` data block. `suppressHydrationWarning` covers the
 * resulting `type` mismatch on hydration; the DOM keeps the server's value.
 */
const script = `(function(){try{var s=localStorage.getItem('theme');var light=s?s==='light':window.matchMedia('(prefers-color-scheme: light)').matches;if(light)document.documentElement.classList.add('lightmode')}catch(e){}})();`;

export function ThemeScript() {
  return (
    <script
      type={typeof window === 'undefined' ? 'text/javascript' : 'text/plain'}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: script }}
    />
  );
}
