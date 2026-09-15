import { useTranslations } from 'next-intl';
import { Heading, Label, Rule, Text } from '@/components/atoms';
import { Section, SectionHeader } from '@/components/molecules';
import { processSteps } from '@/data/content';
import styles from './Process.module.scss';

export function Process() {
  const t = useTranslations('home.process');
  const steps = t.raw('steps') as { title: string; body: string }[];

  return (
    <Section bordered>
      <SectionHeader kicker={t('kicker')} title={t('title')} />

      <ol className={styles.flow}>
        {steps.map((step, index) => (
          <li key={step.title} className={styles.step}>
            <Label size="md" tone="accent" className={styles.number}>
              {processSteps[index]}
            </Label>
            <Rule className={styles.rule} />
            <Heading level={3} size="cardSm">
              {step.title}
            </Heading>
            <Text size="bodySm" className={styles.body}>
              {step.body}
            </Text>
          </li>
        ))}
      </ol>
    </Section>
  );
}
