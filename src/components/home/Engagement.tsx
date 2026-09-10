import { useTranslations } from 'next-intl';
import { Section, SectionTitle } from '@/components/shared/Section';
import { Reveal } from '@/components/shared/Reveal';
import styles from './Engagement.module.css';

export function Engagement() {
  const t = useTranslations('home.engagement');
  const items = t.raw('items') as { tag: string; title: string; body: string }[];

  return (
    <Section bordered>
      <SectionTitle>{t('title')}</SectionTitle>

      <div className={styles.grid}>
        {items.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.08} className={styles.cardWrap}>
            <article className={styles.card}>
              <span className={styles.tag}>{item.tag}</span>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.body}>{item.body}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <p className={styles.note}>{t('note')}</p>
    </Section>
  );
}
