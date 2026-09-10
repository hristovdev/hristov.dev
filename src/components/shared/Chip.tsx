import styles from './Chip.module.css';

/** Two-letter fallback tile for technologies without a vendored logo. */
export function monogram(name: string): string {
  const words = name
    .replace(/[^\p{L}\p{N} ]/gu, ' ')
    .trim()
    .split(/\s+/);
  const first = words[0] ?? '';
  const second = words[1];
  return (
    (first.charAt(0) ?? '') + (second ? second.charAt(0) : (first.charAt(1) ?? ''))
  ).toUpperCase();
}

function TechIcon({ icon, name }: { icon: string; name: string }) {
  if (!icon) {
    return (
      <span className={styles.monogram} aria-hidden="true">
        {monogram(name)}
      </span>
    );
  }
  return (
    <span
      className={styles.icon}
      aria-hidden="true"
      style={{ backgroundImage: `url(/icons/tech/${icon}.svg)` }}
    />
  );
}

export function Chip({
  children,
  icon,
  name,
}: {
  children: React.ReactNode;
  icon?: string;
  name?: string;
}) {
  return (
    <span className={styles.chip}>
      {icon !== undefined && name !== undefined ? <TechIcon icon={icon} name={name} /> : null}
      {children}
    </span>
  );
}

export function ChipList({ children }: { children: React.ReactNode }) {
  return <ul className={styles.list}>{children}</ul>;
}
