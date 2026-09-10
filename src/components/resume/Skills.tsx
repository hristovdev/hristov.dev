import { useTranslations } from 'next-intl';
import { skillGroups } from '@/data/content';
import { monogram } from '@/components/shared/Chip';
import styles from './Skills.module.css';

function Icon({ icon, name, className }: { icon: string; name: string; className: string }) {
  if (!icon) {
    return (
      <span className={`${styles.monogram} ${className}`} aria-hidden="true">
        {monogram(name)}
      </span>
    );
  }
  return (
    <span
      className={`${styles.icon} ${className}`}
      aria-hidden="true"
      style={{ backgroundImage: `url(/icons/tech/${icon}.svg)` }}
    />
  );
}

export function Skills() {
  const t = useTranslations('resume.skills');

  return (
    <section>
      <div className={styles.head}>
        <h2 className={styles.title}>{t('title')}</h2>
        <span className={styles.legend}>{t('legend')}</span>
      </div>

      <div className={styles.grid}>
        {skillGroups.map((group) => {
          const names = t.raw(`groups.${group.key}.items`) as string[];

          return (
            <div key={group.key}>
              <h3 className={styles.groupTitle}>{t(`groups.${group.key}.title`)}</h3>

              {group.plain ? (
                <ul className={styles.plainList}>
                  {group.items.map((item, index) => {
                    const name = names[index] ?? '';
                    return (
                      <li key={name} className={styles.plainChip}>
                        <Icon icon={item.icon} name={name} className="" />
                        {name}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <ul className={styles.list}>
                  {group.items.map((item, index) => {
                    const name = names[index] ?? '';
                    return (
                      <li key={name} className={styles.ratedRow}>
                        <Icon icon={item.icon} name={name} className="" />
                        <span className={styles.name}>{name}</span>
                        <span className={styles.badge}>{t(`levels.${item.level}`)}</span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
