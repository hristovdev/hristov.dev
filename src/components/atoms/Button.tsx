'use client';

import { Button as AriaButton, type ButtonProps as AriaButtonProps } from 'react-aria-components';
import { cx } from '@/lib/cx';
import styles from './Button.module.scss';

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonSize = 'md' | 'sm';

export type ButtonProps = Omit<AriaButtonProps, 'className'> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

/**
 * React Aria's Button, which is what makes this worth wrapping a <button> for:
 * it normalises press behaviour across mouse, touch, pen and keyboard, and
 * exposes state as data attributes (`data-pressed`, `data-focus-visible`,
 * `data-disabled`) so the stylesheet can react without any of it going
 * through React state.
 */
export function Button({ variant = 'primary', size = 'md', className, ...props }: ButtonProps) {
  return (
    <AriaButton {...props} className={cx(styles.base, styles[variant], styles[size], className)} />
  );
}
