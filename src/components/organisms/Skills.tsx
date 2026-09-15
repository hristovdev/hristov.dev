import { useTranslations } from 'next-intl';
import { Badge, Chip, Heading, Label, TechIcon } from '@/components/atoms';
import { ChipList } from '@/components/molecules';
import { skillGroups } from '@/data/content';
import styles from './Skills.module.scss';

export function Skills() {
  const t = useTranslations('resume.skills');

  return (
    <section>
      <div className={styles.head}>
        <Heading level={2} size="sub">
          {t('title')}
        </Heading>
        <Label size="xs" tone="muted">
          {t('legend')}
        </Label>
      </div>

      <div className={styles.grid}>
        {skillGroups.map((group) => {
          const names = t.raw(`groups.${group.key}.items`) as string[];

          return (
            <div key={group.key}>
              <Label as="h3" size="sm" tone="accent" className={styles.groupTitle}>
                {t(`groups.${group.key}.title`)}
              </Label>

              {group.plain ? (
                <ChipList gap="sm">
                  {group.items.map((item, index) => {
                    const name = names[index] ?? '';
                    return (
                      <li key={name}>
                        <Chip variant="solid" iconSize="lg" icon={item.icon} name={name}>
                          {name}
                        </Chip>
                      </li>
                    );
                  })}
                </ChipList>
              ) : (
                <ul className={styles.list}>
                  {group.items.map((item, index) => {
                    const name = names[index] ?? '';
                    return (
                      <li key={name} className={styles.ratedRow}>
                        <TechIcon icon={item.icon} name={name} size="lg" />
                        <span className={styles.name}>{name}</span>
                        <Badge>{t(`levels.${item.level}`)}</Badge>
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
