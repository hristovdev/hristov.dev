import type { ComponentProps } from 'react';
import { Link } from '@/i18n/navigation';
import { cx } from '@/lib/cx';
import styles from './Button.module.scss';
import type { ButtonSize, ButtonVariant } from './Button';

type Shared = { variant?: ButtonVariant; size?: ButtonSize; className?: string };

function classes({ variant = 'primary', size = 'md', className }: Shared) {
  return cx(styles.base, styles.link, styles[variant], styles[size], className);
}

/**
 * A link that looks like a button.
 *
 * Deliberately *not* React Aria's Link. A navigation anchor already has the
 * behaviour React Aria would add, and wrapping it would make every page that
 * has a call to action a Client Component — the hero, the closing band and the
 * 404 would all start shipping JavaScript to render a link that works without
 * any. React Aria is used where it buys something: the buttons, the locale and
 * theme toggles, the menu disclosure and the contact form.
 */
export function ActionLink({
  variant,
  size,
  className,
  ...props
}: ComponentProps<typeof Link> & Shared) {
  return <Link {...props} className={classes({ variant, size, className })} />;
}

/** For destinations outside the app's own routes (mailto:, PDFs, social). */
export function ExternalActionLink({
  variant,
  size,
  className,
  ...props
}: ComponentProps<'a'> & Shared) {
  // oxlint-disable-next-line jsx-a11y/anchor-has-content -- children arrive via {...props}
  return <a {...props} className={classes({ variant, size, className })} />;
}
