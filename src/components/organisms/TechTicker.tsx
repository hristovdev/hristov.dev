import { useTranslations } from 'next-intl';
import { Chip, Label, Text } from '@/components/atoms';
import { technologies } from '@/data/content';
import styles from './TechTicker.module.scss';

const HALF = Math.ceil(technologies.length / 2);
const ROWS = [technologies.slice(0, HALF), technologies.slice(HALF)];

/**
 * Two rows of technologies scrolling in opposite directions. Each row's items
 * are duplicated so the -50% translate loops seamlessly; under reduced motion
 * the rows become plain wrapping lists.
 */
export function TechTicker() {
  const t = useTranslations('resume.tech');

  return (
    <section className={styles.wrap} aria-label={t('label')}>
      <Label as="p" size="sm" tone="muted" className={styles.label}>
        {t('label')}
      </Label>

      {ROWS.map((row, index) => (
        <div key={index} className={styles.row}>
          <div className={styles.track}>
            {[...row, ...row].map((tech, i) => (
              <Chip
                key={`${tech.name}-${i}`}
                variant="solid"
                iconSize="md"
                icon={tech.icon}
                name={tech.name}
              >
                {tech.name}
              </Chip>
            ))}
          </div>
        </div>
      ))}

      <Text size="bodySm" measure="note" className={styles.note}>
        {t('list')}
      </Text>
    </section>
  );
}
