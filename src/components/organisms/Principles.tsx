import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Heading, StatusDot, Text } from '@/components/atoms';
import { Section, SectionHeader } from '@/components/molecules';
import { site } from '@/data/site';
import portrait from '@/../public/images/portrait.jpg';
import styles from './Principles.module.scss';

export function Principles() {
  const t = useTranslations('home.principles');
  const items = t.raw('items') as { title: string; body: string }[];

  return (
    <Section bordered>
      <div className={styles.layout}>
        <div>
          <SectionHeader kicker={t('kicker')} title={t('title')} />

          <div className={styles.portraitCard}>
            <Image
              src={portrait}
              alt={site.name}
              fill
              placeholder="blur"
              sizes="(max-width: 860px) 290px, 290px"
              className={styles.portrait}
            />
            <div className={styles.scrim}>
              <StatusDot size="md" />
              {site.name}
            </div>
          </div>
        </div>

        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.title} className={styles.item}>
              <Heading level={3} size="card">
                {item.title}
              </Heading>
              <Text size="body" measure="body" className={styles.itemBody}>
                {item.body}
              </Text>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
