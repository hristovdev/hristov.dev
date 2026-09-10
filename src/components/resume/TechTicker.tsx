import { useTranslations } from 'next-intl';
import { technologies } from '@/data/content';
import { monogram } from '@/components/shared/Chip';
import styles from './TechTicker.module.css';

const HALF = Math.ceil(technologies.length / 2);
const ROWS = [technologies.slice(0, HALF), technologies.slice(HALF)];

function Item({ name, icon }: { name: string; icon: string }) {
  return (
    <span className={styles.item}>
      {icon ? (
        <span
          className={styles.icon}
          aria-hidden="true"
          style={{ backgroundImage: `url(/icons/tech/${icon}.svg)` }}
        />
      ) : (
        <span className={styles.monogram} aria-hidden="true">
          {monogram(name)}
        </span>
      )}
      {name}
    </span>
  );
}

/**
 * Two rows of technologies scrolling in opposite directions. Each row's items
 * are duplicated so the -50% translate loops seamlessly; under reduced motion
 * the rows become plain wrapping lists.
 */
export function TechTicker() {
  const t = useTranslations('resume.tech');

  return (
    <section className={styles.wrap} aria-label={t('label')}>
      <p className={styles.label}>{t('label')}</p>

      {ROWS.map((row, index) => (
        <div key={index} className={styles.row}>
          <div className={styles.track}>
            {[...row, ...row].map((tech, i) => (
              <Item key={`${tech.name}-${i}`} name={tech.name} icon={tech.icon} />
            ))}
          </div>
        </div>
      ))}

      <p className={styles.note}>{t('list')}</p>
    </section>
  );
}
