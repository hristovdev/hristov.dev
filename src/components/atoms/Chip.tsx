import { cx } from '@/lib/cx';
import { TechIcon } from './TechIcon';
import styles from './Chip.module.scss';

type ChipProps = {
  children: React.ReactNode;
  /** Logo slug. Pass with `name` to show a technology mark before the label. */
  icon?: string;
  name?: string;
  /** `outline` sits on the page; `solid` sits on a --surface panel. */
  variant?: 'outline' | 'solid';
  /** The mark's size. The design runs larger on the résumé than on the cards. */
  iconSize?: 'sm' | 'md' | 'lg';
  className?: string;
};

export function Chip({
  children,
  icon,
  name,
  variant = 'outline',
  iconSize = 'sm',
  className,
}: ChipProps) {
  return (
    <span className={cx(styles.chip, styles[variant], className)}>
      {icon !== undefined && name !== undefined ? (
        <TechIcon icon={icon} name={name} size={iconSize} />
      ) : null}
      {children}
    </span>
  );
}
