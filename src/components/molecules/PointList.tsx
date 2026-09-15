import { cx } from '@/lib/cx';
import styles from './PointList.module.scss';

/**
 * The accent-bulleted list used for case-study highlights and role
 * responsibilities. The bullet is a pseudo-element so it never becomes
 * selectable text or reaches a screen reader.
 */
export function PointList({
  items,
  gap = 'md',
  className,
}: {
  items: readonly string[];
  /** `sm` on the résumé, where the rows sit closer together. */
  gap?: 'md' | 'sm';
  className?: string;
}) {
  return (
    <ul className={cx(styles.list, styles[gap], className)}>
      {items.map((point) => (
        <li key={point} className={styles.point}>
          <span>{point}</span>
        </li>
      ))}
    </ul>
  );
}
