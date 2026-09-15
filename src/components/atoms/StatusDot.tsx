import { cx } from '@/lib/cx';
import styles from './StatusDot.module.scss';

/**
 * The accent dot that marks an "available" state, with the design's expanding
 * halo.
 *
 * Always decorative — whatever it signals is spelled out in the text beside
 * it — so it is hidden from assistive technology.
 */
export function StatusDot({
  size = 'sm',
  pulse = true,
  className,
}: {
  size?: 'sm' | 'md';
  pulse?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cx(styles.dot, styles[size], pulse && styles.pulse, className)}
      aria-hidden="true"
    />
  );
}
