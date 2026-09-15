'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useId, useRef, useState, useTransition } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from 'react-aria-components';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { SegmentedControl } from '@/components/molecules';
import { useTheme } from '@/components/layout/useTheme';
import { cx } from '@/lib/cx';
import { ThemeToggle } from './ThemeToggle';
import styles from './Header.module.scss';

const LOCALE_SEGMENTS = routing.locales.map((code) => ({ id: code, label: code.toUpperCase() }));

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

  // The menu remembers the path it was opened on, so any navigation — a link
  // in the panel, a locale switch, back/forward — closes it with no effect
  // needed: the path changes, the comparison fails.
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;
  const close = () => setOpenFor(null);
  const menuId = useId();
  const headerRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || buttonRef.current?.getAttribute('aria-expanded') !== 'true') {
        return;
      }
      setOpenFor(null);
      buttonRef.current?.focus();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpenFor(null);
    };

    // Widening past the breakpoint hides the panel in CSS; reset the state too
    // so it doesn't reappear open when the viewport narrows again.
    const media = window.matchMedia('(min-width: 701px)');
    const onMedia = (event: MediaQueryListEvent) => {
      if (event.matches) setOpenFor(null);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    media.addEventListener('change', onMedia);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
      media.removeEventListener('change', onMedia);
    };
  }, []);

  function switchLocale(next: string) {
    if (next === locale) return;
    startTransition(() => {
      // No dynamic segments in this app, so the pathname alone round-trips.
      router.replace(pathname, { locale: next as Locale });
    });
  }

  return (
    <header ref={headerRef} className={styles.header}>
      <div className={styles.row}>
        <Link href="/" className={styles.wordmark}>
          hristov<span>.dev</span>
        </Link>

        {/*
         * React Aria's Button rather than its Disclosure. Disclosure marks a
         * collapsed panel `hidden`, and this panel is only a panel below the
         * breakpoint — above it the same markup is the desktop navigation,
         * shown by CSS alone with no JavaScript involved. Hiding it from
         * assistive technology whenever React happened to think the menu was
         * closed would be a real regression, so the expanded/controls wiring
         * stays explicit and the Button supplies the press handling.
         */}
        <Button
          ref={buttonRef}
          className={styles.menuButton}
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? t('nav.close') : t('nav.menu')}
          onPress={() => setOpenFor(open ? null : pathname)}
        >
          {open ? (
            <X className={styles.menuIcon} strokeWidth={1.75} aria-hidden="true" />
          ) : (
            <Menu className={styles.menuIcon} strokeWidth={1.75} aria-hidden="true" />
          )}
        </Button>

        {/*
         * On wide screens this wrapper is `display: contents`, so the nav and
         * controls sit in the row as before. Below the breakpoint it becomes
         * the panel the menu button toggles, so there is one DOM and one set
         * of links whichever layout is showing.
         */}
        <div id={menuId} className={cx(styles.menu, open && styles.menuOpen)}>
          <nav className={styles.nav} aria-label={t('nav.label')}>
            {NAV.map(({ href, key }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={cx(styles.navLink, active && styles.navLinkActive)}
                  onClick={close}
                >
                  {t(`nav.${key}`)}
                </Link>
              );
            })}
          </nav>

          <div className={styles.controls}>
            <SegmentedControl
              label={t('locale.label')}
              segments={LOCALE_SEGMENTS}
              value={locale}
              onChange={switchLocale}
              isDisabled={isPending}
            />

            <ThemeToggle
              onToggle={toggleTheme}
              label={t('theme.aria')}
              toLight={t('theme.toLight')}
              toDark={t('theme.toDark')}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
