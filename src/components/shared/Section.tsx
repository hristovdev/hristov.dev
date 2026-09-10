import styles from './Section.module.css';

type SectionProps = {
  children: React.ReactNode;
  /** Adds a hairline separator above the section. */
  bordered?: boolean;
  id?: string;
  className?: string;
};

export function Section({ children, bordered, id, className }: SectionProps) {
  return (
    <section
      id={id}
      className={`${styles.section} ${bordered ? styles.bordered : ''} ${className ?? ''}`}
    >
      {children}
    </section>
  );
}

/** Full-bleed `--surface` band with hairlines, content still on the page column. */
export function Band({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className={styles.band}>
      <div className={styles.bandInner}>{children}</div>
    </section>
  );
}

export function Kicker({ children }: { children: React.ReactNode }) {
  return <p className={styles.kicker}>{children}</p>;
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className={styles.title}>{children}</h2>;
}
