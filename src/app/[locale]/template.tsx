import styles from '@/components/molecules/PageFade.module.scss';

/**
 * A template (rather than a layout) re-mounts on navigation, which is what
 * replays the fade between pages that the design calls for.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className={styles.fade}>{children}</div>;
}
