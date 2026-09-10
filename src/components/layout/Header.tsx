'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { useTheme } from './useTheme';
import styles from './Header.module.css';

const NAV = [
  { href: '/', key: 'home' },
  { href: '/resume', key: 'resume' },
  { href: '/contact', key: 'contact' },
] as const;

export function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale() as Locale;
  const [isPending, startTransition] = useTransition();
  const toggleTheme = useTheme();

  function switchLocale(next: Locale) {
    if (next === locale) return;
    startTransition(() => {
      // No dynamic segments in this app, so the pathname alone round-trips.
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <header className={styles.header}>
      <div className={styles.row}>
        <Link href="/" className={styles.wordmark}>
          hristov<span>.dev</span>
        </Link>

        <nav className={styles.nav} aria-label={t('nav.home')}>
          {NAV.map(({ href, key }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={`${styles.navLink} ${active ? styles.navLinkActive : ''}`}
              >
                {t(`nav.${key}`)}
              </Link>
            );
          })}
        </nav>

        <div className={styles.controls}>
          <div className={styles.segmented} aria-label={t('locale.label')} role="group">
            {routing.locales.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => switchLocale(code)}
                disabled={isPending}
                aria-pressed={code === locale}
                className={`${styles.segment} ${code === locale ? styles.segmentActive : ''}`}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className={styles.themeButton}
            aria-label={t('theme.aria')}
          >
            {/* The label names the theme you would switch *to*. Both are
                rendered and swapped in CSS, so the markup is theme-agnostic
                and hydration-safe. */}
            <span className={styles.whenDark}>{t('theme.toLight')}</span>
            <span className={styles.whenLight}>{t('theme.toDark')}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
