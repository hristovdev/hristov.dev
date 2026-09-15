import { useTranslations } from 'next-intl';
import { Section, Kicker, SectionTitle } from '@/components/shared/Section';
import { processSteps } from '@/data/content';
import styles from './Process.module.scss';

export function Process() {
  const t = useTranslations('home.process');
  const steps = t.raw('steps') as { title: string; body: string }[];

  return (
    <Section bordered>
      <Kicker>{t('kicker')}</Kicker>
      <SectionTitle>{t('title')}</SectionTitle>

      <ol className={styles.flow}>
        {steps.map((step, index) => (
          <li key={step.title} className={styles.step}>
            <span className={styles.number}>{processSteps[index]}</span>
            <div className={styles.rule} />
            <h3 className={styles.title}>{step.title}</h3>
            <p className={styles.body}>{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
