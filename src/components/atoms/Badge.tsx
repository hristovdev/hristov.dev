import { cx } from '@/lib/cx';
import styles from './Badge.module.scss';

/**
 * A small uppercase pill. `accent` marks an engagement type, `neutral` a
 * skill level.
 */
export function Badge({
  children,
  variant = 'neutral',
  className,
}: {
  children: React.ReactNode;
  variant?: 'accent' | 'neutral';
  className?: string;
}) {
  return <span className={cx(styles.badge, styles[variant], className)}>{children}</span>;
}
