import { useTranslations } from 'next-intl';
import { Chip, Heading, Label, Surface, Text } from '@/components/atoms';
import { ChipList, PointList, Reveal, Section, SectionHeader } from '@/components/molecules';
import { caseKeys, caseStacks, caseVisuals, type CaseKey } from '@/data/content';
import { ChatWidget, GraphNodes, LineFlow, PlatformDiagram } from './visuals';
import styles from './SelectedWork.module.scss';

const VISUALS = {
  diagram: PlatformDiagram,
  chart: LineFlow,
  widget: ChatWidget,
  graph: GraphNodes,
} as const;

function CaseCard({ caseKey }: { caseKey: CaseKey }) {
  const t = useTranslations(`home.work.cases.${caseKey}`);
  const points = t.raw('points') as string[];
  const Visual = VISUALS[caseVisuals[caseKey]];

  return (
    <Surface as="article" radius="card" interactive="edge" clip className={styles.card}>
      <div className={styles.text}>
        <Label as="p" size="xs" tone="muted" className={styles.kicker}>
          {t('kicker')}
        </Label>
        <Heading level={3} size="case">
          {t('title')}
        </Heading>
        <Text size="body" className={styles.body}>
          {t('body')}
        </Text>

        <PointList items={points} className={styles.points} />

        <ChipList className={styles.stack}>
          {caseStacks[caseKey].map((item) => (
            <li key={item}>
              <Chip>{item}</Chip>
            </li>
          ))}
        </ChipList>
      </div>

      <div className={styles.visual}>
        <Visual />
        <span className={styles.shot}>{t('shot')}</span>
      </div>
    </Surface>
  );
}

export function SelectedWork() {
  const t = useTranslations('home.work');

  return (
    <Section bordered>
      <div className={styles.head}>
        <div>
          <SectionHeader kicker={t('kicker')} title={t('title')} />
        </div>
        <Text size="bodySm" measure="intro">
          {t('note')}
        </Text>
      </div>

      <div className={styles.grid}>
        {caseKeys.map((key, index) => (
          // Stagger so the cards arrive in reading order rather than at once.
          <Reveal key={key} delay={index * 0.08}>
            <CaseCard caseKey={key} />
          </Reveal>
        ))}
      </div>

      <Text size="note" className={styles.more}>
        {t('more')}
      </Text>
    </Section>
  );
}
