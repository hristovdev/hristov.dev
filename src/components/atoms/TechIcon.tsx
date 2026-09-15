import { cx } from '@/lib/cx';
import styles from './TechIcon.module.scss';

/** Two-letter fallback tile for technologies without a vendored logo. */
export function monogram(name: string): string {
  const words = name
    .replace(/[^\p{L}\p{N} ]/gu, ' ')
    .trim()
    .split(/\s+/);
  const first = words[0] ?? '';
  const second = words[1];
  return (
    (first.charAt(0) ?? '') + (second ? second.charAt(0) : (first.charAt(1) ?? ''))
  ).toUpperCase();
}

type TechIconSize = 'inline' | 'sm' | 'md' | 'lg';

/**
 * A vendored technology logo, or its initials when there is no logo for it.
 *
 * The logo is a background-image rather than an <img> so `--icon-filter` can
 * flatten every vendor's colours to one monochrome silhouette per theme.
 *
 * This existed four times over — in the chip, the skills list, the tech ticker
 * and the facts strip — each with its own copy of the monogram fallback.
 */
export function TechIcon({
  icon,
  name,
  size = 'sm',
  className,
}: {
  /** Slug under /icons/tech. Empty falls back to the monogram. */
  icon: string;
  name: string;
  size?: TechIconSize;
  className?: string;
}) {
  if (!icon) {
    return (
      <span className={cx(styles.monogram, styles[size], className)} aria-hidden="true">
        {monogram(name)}
      </span>
    );
  }

  return (
    <span
      className={cx(styles.icon, styles[size], className)}
      aria-hidden="true"
      style={{ backgroundImage: `url(/icons/tech/${icon}.svg)` }}
    />
  );
}
