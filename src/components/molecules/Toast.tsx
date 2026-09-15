'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { StatusDot } from '@/components/atoms';
import styles from './Toast.module.scss';

const DISMISS_AFTER = 2600;

/**
 * Transient confirmation, shown and then dropped after a short delay.
 *
 * Deliberately not React Aria's toast: that API is still exported under an
 * `UNSTABLE_` prefix in 1.21, and this is a single non-interactive
 * confirmation with nothing to focus and no queue — a polite live region says
 * everything that needs saying.
 */
export function useToast() {
  const [message, setMessage] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback((next: string) => {
    setMessage(next);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(null), DISMISS_AFTER);
  }, []);

  useEffect(() => () => void (timer.current && clearTimeout(timer.current)), []);

  return { message, show };
}

export function Toast({ label, detail }: { label: string; detail?: string }) {
  return (
    <div className={styles.toast} role="status" aria-live="polite">
      <StatusDot pulse={false} />
      {label}
      {detail ? <span className={styles.detail}>{detail}</span> : null}
    </div>
  );
}
