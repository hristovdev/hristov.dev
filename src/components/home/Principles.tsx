import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Section, Kicker, SectionTitle } from '@/components/shared/Section';
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
          <Kicker>{t('kicker')}</Kicker>
          <SectionTitle>{t('title')}</SectionTitle>

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
              <span className={styles.statusDot} aria-hidden="true" />
              {site.name}
            </div>
          </div>
        </div>

        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.title} className={styles.item}>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.itemBody}>{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
