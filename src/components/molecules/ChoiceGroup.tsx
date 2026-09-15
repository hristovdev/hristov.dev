'use client';

import { Label, Radio, RadioGroup, type RadioGroupProps } from 'react-aria-components';
import { cx } from '@/lib/cx';
import styles from './ChoiceGroup.module.scss';

export type Choice = { value: string; label: string };

/**
 * A row of mutually exclusive pills.
 *
 * React Aria's RadioGroup gives this real radio semantics with roving focus —
 * arrow keys move between the options and Tab leaves the group — which the
 * previous hand-built fieldset of styled radios did not do.
 */
export function ChoiceGroup({
  label,
  choices,
  className,
  ...props
}: Omit<RadioGroupProps, 'className' | 'children'> & {
  label: string;
  choices: readonly Choice[];
  className?: string;
}) {
  return (
    <RadioGroup {...props} className={cx(styles.group, className)}>
      <Label className={styles.legend}>{label}</Label>
      <div className={styles.options}>
        {choices.map((choice) => (
          <Radio key={choice.value} value={choice.value} className={styles.option}>
            {choice.label}
          </Radio>
        ))}
      </div>
    </RadioGroup>
  );
}
