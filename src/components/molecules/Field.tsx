'use client';

import {
  FieldError,
  Input,
  Label,
  TextArea,
  TextField,
  type TextFieldProps,
} from 'react-aria-components';
import { cx } from '@/lib/cx';
import styles from './Field.module.scss';

type FieldProps = Omit<TextFieldProps, 'className' | 'children'> & {
  label: string;
  placeholder?: string;
  /** Server-side or client-side message. Presence also marks the field invalid. */
  error?: string;
  /** Renders a textarea instead of a single-line input. */
  multiline?: boolean;
  className?: string;
};

/**
 * A labelled text field.
 *
 * React Aria's TextField wires the label, the control and the error message
 * together — it generates the ids, sets `aria-labelledby`/`aria-describedby`
 * and `aria-invalid`, and makes the message a live region so a validation
 * error that appears after submit is actually announced. All of that was
 * hand-rolled per field before, with `useId` and manual `aria-describedby`.
 */
export function Field({ label, placeholder, error, multiline, className, ...props }: FieldProps) {
  const Control = multiline ? TextArea : Input;

  return (
    <TextField
      {...props}
      // Drives the invalid styling and announcement from one source.
      isInvalid={Boolean(error)}
      className={cx(styles.field, className)}
    >
      <Label className={styles.label}>{label}</Label>
      <Control placeholder={placeholder} className={cx(styles.control, multiline && styles.area)} />
      <FieldError className={styles.error}>{error}</FieldError>
    </TextField>
  );
}
