import { useTranslations } from 'next-intl';
import { Heading, Label, Surface, Text } from '@/components/atoms';
import { PointList } from '@/components/molecules';
import { educationKeys } from '@/data/content';
import styles from './Experience.module.scss';

type Entry = {
  when: string;
  where: string;
  title: string;
  body: string;
  points: string[];
};

export function Experience() {
  const t = useTranslations('resume.experience');
  const items = t.raw('items') as Entry[];

  return (
    <section>
      <Heading level={2} size="sub" className={styles.title}>
        {t('title')}
      </Heading>

      <ol className={styles.list}>
        {items.map((entry) => (
          <li key={entry.title + entry.when} className={styles.row}>
            <div>
              <Label as="p" size="md" tone="accent">
                {entry.when}
              </Label>
              <Text size="bodyXs" className={styles.where}>
                {entry.where}
              </Text>
            </div>

            <div className={styles.content}>
              <Heading level={3} size="cardXs">
                {entry.title}
              </Heading>
              <Text size="body" className={styles.body}>
                {entry.body}
              </Text>
              {entry.points.length > 0 ? (
                <PointList items={entry.points} gap="sm" className={styles.points} />
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Education() {
  const t = useTranslations('resume.education');

  return (
    <section>
      <Heading level={2} size="sub" className={styles.title}>
        {t('title')}
      </Heading>

      <div className={styles.eduGrid}>
        {educationKeys.map((key) => (
          <Surface
            key={key}
            as="article"
            radius="panel"
            interactive="lift"
            className={styles.eduCard}
          >
            <Label size="xs" tone="accent">
              {t(`items.${key}.when`)}
            </Label>
            <Heading level={3} size="cardXs" className={styles.eduTitle}>
              {t(`items.${key}.title`)}
            </Heading>
            <Text size="bodySm" className={styles.eduBody}>
              {t(`items.${key}.body`)}
            </Text>
          </Surface>
        ))}
      </div>
    </section>
  );
}
