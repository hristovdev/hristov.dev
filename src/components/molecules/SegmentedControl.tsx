'use client';

import { Radio, RadioGroup } from 'react-aria-components';
import { cx } from '@/lib/cx';
import styles from './SegmentedControl.module.scss';

export type Segment = { id: string; label: string };

/**
 * A joined pill of mutually exclusive options — the locale switch.
 *
 * Built on RadioGroup rather than ToggleButtonGroup. Both report a
 * `radiogroup` to assistive technology, but only RadioGroup implements the
 * roving tabindex the pattern calls for: the group is a single tab stop and
 * the arrow keys move within it. ToggleButtonGroup leaves every segment
 * tabbable, which reads as N separate controls that claim to be one.
 */
export function SegmentedControl({
  label,
  segments,
  value,
  onChange,
  isDisabled,
  className,
}: {
  label: string;
  segments: readonly Segment[];
  value: string;
  onChange: (value: string) => void;
  isDisabled?: boolean;
  className?: string;
}) {
  return (
    <RadioGroup
      aria-label={label}
      orientation="horizontal"
      value={value}
      onChange={onChange}
      isDisabled={isDisabled}
      className={cx(styles.group, className)}
    >
      {segments.map((segment) => (
        <Radio key={segment.id} value={segment.id} className={styles.segment}>
          {segment.label}
        </Radio>
      ))}
    </RadioGroup>
  );
}
