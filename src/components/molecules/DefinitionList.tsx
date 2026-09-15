import { cx } from '@/lib/cx';
import { Label } from '@/components/atoms';
import styles from './DefinitionList.module.scss';

export type Definition = { key: string; term: string; value: string };

/**
 * Key/value rows separated by hairlines — the résumé's metadata and the
 * contact page's company details. A real <dl>, so the pairing survives being
 * read aloud.
 */
export function DefinitionList({
  items,
  className,
}: {
  items: readonly Definition[];
  className?: string;
}) {
  return (
    <dl className={cx(styles.list, className)}>
      {items.map((item) => (
        <div key={item.key} className={styles.row}>
          <Label as="dt" size="xs" tone="muted">
            {item.term}
          </Label>
          <dd className={styles.value}>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
