'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './DownloadToast.module.scss';

const DISMISS_AFTER = 2600;

/**
 * Confirms a CV download with the design's `toastin` entrance.
 *
 * The anchor still performs the real download — this only acknowledges it, so
 * the page never depends on JavaScript to hand over the file.
 */
export function useDownloadToast() {
  const [file, setFile] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback((name: string) => {
    setFile(name);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setFile(null), DISMISS_AFTER);
  }, []);

  useEffect(() => () => void (timer.current && clearTimeout(timer.current)), []);

  return { file, show };
}

export function DownloadToast({ file, label }: { file: string; label: string }) {
  return (
    <div className={styles.toast} role="status" aria-live="polite">
      <span className={styles.dot} aria-hidden="true" />
      {label}
      <span className={styles.name}>{file}</span>
    </div>
  );
}
