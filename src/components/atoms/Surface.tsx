import { cx } from '@/lib/cx';
import styles from './Surface.module.scss';

type SurfaceProps = {
  children: React.ReactNode;
  /** Corner size. `card` is the large panel, `panel` the smaller one. */
  radius?: 'card' | 'panel';
  /** Adds the hover response cards use: a brighter edge, and a small lift. */
  interactive?: 'edge' | 'lift' | 'accent';
  /** Clips children to the rounded corners — needed when a child is flush. */
  clip?: boolean;
  as?: 'div' | 'article' | 'section' | 'li';
  className?: string;
};

/** The bordered `--surface` panel that cards, channel rows and the form share. */
export function Surface({
  children,
  radius = 'card',
  interactive,
  clip,
  as: Tag = 'div',
  className,
}: SurfaceProps) {
  return (
    <Tag
      className={cx(
        styles.surface,
        styles[radius],
        interactive && styles[interactive],
        clip && styles.clip,
        className,
      )}
    >
      {children}
    </Tag>
  );
}
