import { cx } from '@/lib/cx';
import styles from './Heading.module.scss';

/** Type step, named for the role it plays rather than for a tag. */
type HeadingSize =
  'hero' | 'page' | 'section' | 'sub' | 'name' | 'case' | 'card' | 'cardSm' | 'cardXs';

type HeadingProps = {
  children: React.ReactNode;
  /** The heading rank. Chosen for document structure, not for size. */
  level: 1 | 2 | 3 | 4;
  /** Defaults to the step that usually goes with `level`. */
  size?: HeadingSize;
  /** Balances short headings across lines. On by default for the big steps. */
  balance?: boolean;
  className?: string;
};

const DEFAULT_SIZE: Record<HeadingProps['level'], HeadingSize> = {
  1: 'page',
  2: 'section',
  3: 'card',
  4: 'cardSm',
};

/**
 * Rank and size are separate props on purpose: the design puts a `sub` step on
 * an <h2> in the résumé and a `section` step on an <h2> on the home page, and
 * a heading's rank should follow the outline rather than the type scale.
 */
export function Heading({ children, level, size, balance, className }: HeadingProps) {
  const Tag = `h${level}` as const;
  const step = size ?? DEFAULT_SIZE[level];
  const wrap = balance ?? (step === 'hero' || step === 'page' || step === 'section');

  return (
    <Tag className={cx(styles.heading, styles[step], wrap && styles.balance, className)}>
      {children}
    </Tag>
  );
}
