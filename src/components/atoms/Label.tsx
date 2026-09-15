import { cx } from '@/lib/cx';
import styles from './Label.module.scss';

type LabelSize = 'md' | 'sm' | 'xs';
type LabelTone = 'accent' | 'muted';

type LabelProps = {
  children: React.ReactNode;
  /** Type step: md is the section kicker, xs the smallest card label. */
  size?: LabelSize;
  tone?: LabelTone;
  /** `p` when the label is a line of its own, `span` when it sits inline. */
  as?: 'p' | 'span' | 'dt' | 'h3';
  className?: string;
};

/**
 * The monospaced, uppercase, tracked label the design uses above titles, on
 * cards and beside metadata.
 *
 * This collapses eight near-identical rules that differed only in type step
 * and tracking; the tracking now follows the size rather than being picked
 * per component.
 */
export function Label({
  children,
  size = 'md',
  tone = 'accent',
  as: Tag = 'span',
  className,
}: LabelProps) {
  return <Tag className={cx(styles.label, styles[size], styles[tone], className)}>{children}</Tag>;
}
