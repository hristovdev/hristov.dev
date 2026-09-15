import styles from './VisuallyHidden.module.scss';

/**
 * Hidden from sighted visitors, still announced. Use for text that gives a
 * control its name when the visual design carries the meaning some other way.
 */
export function VisuallyHidden({ children }: { children: React.ReactNode }) {
  return <span className={styles.hidden}>{children}</span>;
}
