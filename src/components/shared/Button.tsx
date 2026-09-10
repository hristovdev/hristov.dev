import type { ComponentProps } from 'react';
import { Link } from '@/i18n/navigation';
import styles from './Button.module.css';

type Variant = 'primary' | 'secondary';

function classesFor(variant: Variant, className?: string) {
  return `${styles.base} ${styles[variant]} ${className ?? ''}`.trim();
}

export function Button({
  variant = 'primary',
  className,
  ...props
}: ComponentProps<'button'> & { variant?: Variant }) {
  return <button {...props} className={classesFor(variant, className)} />;
}

export function ButtonLink({
  variant = 'primary',
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link {...props} className={classesFor(variant, className)} />;
}

/** For destinations outside the app's own routes (mailto:, PDFs, social). */
export function ExternalButtonLink({
  variant = 'primary',
  className,
  ...props
}: ComponentProps<'a'> & { variant?: Variant }) {
  // oxlint-disable-next-line jsx-a11y/anchor-has-content -- children arrive via {...props}
  return <a {...props} className={classesFor(variant, className)} />;
}
