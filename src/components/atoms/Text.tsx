import { cx } from '@/lib/cx';
import styles from './Text.module.scss';

type TextSize = 'lead' | 'leadSm' | 'bodyLg' | 'body' | 'bodySm' | 'bodyXs' | 'meta' | 'note';
type TextTone = 'default' | 'muted';
/** Caps the line length at one of the design's measures. */
type TextMeasure = 'lead' | 'intro' | 'body' | 'prose' | 'note' | 'role' | 'fact';

type TextProps = {
  children: React.ReactNode;
  size?: TextSize;
  tone?: TextTone;
  measure?: TextMeasure;
  as?: 'p' | 'span' | 'div' | 'dd';
  className?: string;
  /** For copy that has to announce itself, such as a form-level error. */
  role?: 'alert' | 'status';
};

/** Body copy, at one of the design's type steps and optional measures. */
export function Text({
  children,
  size = 'body',
  tone = 'muted',
  measure,
  as: Tag = 'p',
  className,
  role,
}: TextProps) {
  return (
    <Tag
      role={role}
      className={cx(
        styles.text,
        styles[size],
        styles[tone],
        measure && styles[`measure-${measure}`],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
