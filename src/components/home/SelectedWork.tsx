import { useTranslations } from 'next-intl';
import { Section, Kicker, SectionTitle } from '@/components/shared/Section';
import { Chip, ChipList } from '@/components/shared/Chip';
import { Reveal } from '@/components/shared/Reveal';
import { caseKeys, caseStacks, caseVisuals, type CaseKey } from '@/data/content';
import { ChatWidget, GraphNodes, LineFlow, PlatformDiagram } from './visuals';
import styles from './SelectedWork.module.css';

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
    <article className={styles.card}>
      <div className={styles.text}>
        <p className={styles.kicker}>{t('kicker')}</p>
        <h3 className={styles.title}>{t('title')}</h3>
        <p className={styles.body}>{t('body')}</p>

        <ul className={styles.points}>
          {points.map((point) => (
            <li key={point} className={styles.point}>
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <div className={styles.stack}>
          <ChipList>
            {caseStacks[caseKey].map((item) => (
              <li key={item}>
                <Chip>{item}</Chip>
              </li>
            ))}
          </ChipList>
        </div>
      </div>

      <div className={styles.visual}>
        <Visual />
        <span className={styles.shot}>{t('shot')}</span>
      </div>
    </article>
  );
}

export function SelectedWork() {
  const t = useTranslations('home.work');

  return (
    <Section bordered>
      <div className={styles.head}>
        <div>
          <Kicker>{t('kicker')}</Kicker>
          <SectionTitle>{t('title')}</SectionTitle>
        </div>
        <p className={styles.note}>{t('note')}</p>
      </div>

      <div className={styles.grid}>
        {caseKeys.map((key, index) => (
          // Stagger so the cards arrive in reading order rather than at once.
          <Reveal key={key} delay={index * 0.08}>
            <CaseCard caseKey={key} />
          </Reveal>
        ))}
      </div>

      <p className={styles.more}>{t('more')}</p>
    </Section>
  );
}
