/**
 * Applies the stored (or system) theme before first paint.
 *
 * This has to be a blocking inline script in <head>: any later and the page
 * paints dark, then flips to light. It mirrors the logic in `useTheme`, which
 * takes over once React hydrates.
 */
const script = `(function(){try{var s=localStorage.getItem('theme');var light=s?s==='light':window.matchMedia('(prefers-color-scheme: light)').matches;if(light)document.documentElement.classList.add('lightmode')}catch(e){}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
