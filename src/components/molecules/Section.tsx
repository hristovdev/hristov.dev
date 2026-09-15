import { cx } from '@/lib/cx';
import { Heading, Label } from '@/components/atoms';
import styles from './Section.module.scss';

/** A page section on the shared column, with an optional hairline above. */
export function Section({
  children,
  bordered,
  id,
  className,
}: {
  children: React.ReactNode;
  bordered?: boolean;
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={cx(styles.section, bordered && styles.bordered, className)}>
      {children}
    </section>
  );
}

/** Full-bleed `--surface` band with hairlines; content stays on the column. */
export function Band({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className={styles.band}>
      <div className={styles.bandInner}>{children}</div>
    </section>
  );
}

/** The kicker-over-title pair that opens most sections. */
export function SectionHeader({ kicker, title }: { kicker?: string; title: string }) {
  return (
    <>
      {kicker ? (
        <Label as="p" size="md" tone="accent" className={styles.kicker}>
          {kicker}
        </Label>
      ) : null}
      <Heading level={2} size="section">
        {title}
      </Heading>
    </>
  );
}
