import { cx } from '@/lib/cx';
import styles from './ChipList.module.scss';

/** Wrapping row of chips. Children are <li> elements holding a Chip. */
export function ChipList({
  children,
  gap = 'md',
  className,
}: {
  children: React.ReactNode;
  gap?: 'md' | 'sm';
  className?: string;
}) {
  return <ul className={cx(styles.list, styles[gap], className)}>{children}</ul>;
}
