import { useTranslations } from 'next-intl';
import { Badge, Heading, Text } from '@/components/atoms';
import { Reveal, Section, SectionHeader } from '@/components/molecules';
import styles from './Engagement.module.scss';

export function Engagement() {
  const t = useTranslations('home.engagement');
  const items = t.raw('items') as { tag: string; title: string; body: string }[];

  return (
    <Section bordered>
      <SectionHeader title={t('title')} />

      <div className={styles.grid}>
        {items.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.08} className={styles.cardWrap}>
            <article className={styles.card}>
              <Badge variant="accent" className={styles.tag}>
                {item.tag}
              </Badge>
              <Heading level={3} size="cardXs">
                {item.title}
              </Heading>
              <Text size="bodySm" className={styles.body}>
                {item.body}
              </Text>
            </article>
          </Reveal>
        ))}
      </div>

      <Text size="bodySm" measure="note" className={styles.note}>
        {t('note')}
      </Text>
    </Section>
  );
}
