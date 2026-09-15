import { cx } from '@/lib/cx';
import styles from './Rule.module.scss';

/**
 * The short accent bar under a step number. Decorative, and it stretches when
 * its card is hovered — which is why the hover lives on the parent's class.
 */
export function Rule({ className }: { className?: string }) {
  return <div className={cx(styles.rule, className)} aria-hidden="true" />;
}
