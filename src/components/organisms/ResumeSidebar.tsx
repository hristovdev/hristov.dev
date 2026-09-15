import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Heading, Label, Text } from '@/components/atoms';
import { DefinitionList, type Definition } from '@/components/molecules';
import { site } from '@/data/site';
import portrait from '@/../public/images/portrait.jpg';
import { CvDownloads } from './CvDownloads';
import styles from './ResumeSidebar.module.scss';

const META_KEYS = ['based', 'languages', 'availability', 'engagement'] as const;

export function ResumeSidebar() {
  const t = useTranslations('resume');
  const nav = useTranslations('nav');

  const meta: Definition[] = META_KEYS.map((key) => ({
    key,
    term: t(`meta.${key}.k`),
    value: t(`meta.${key}.v`),
  }));

  return (
    <aside className={styles.aside}>
      <div>
        <Label as="p" size="md" tone="accent">
          {nav('resume')}
        </Label>
        <Heading level={1} size="name" className={styles.name}>
          {t('name')}
        </Heading>
        <Text size="bodyLg" measure="role" className={styles.role}>
          {t('role')}
        </Text>
      </div>

      <div className={styles.portrait}>
        <Image
          src={portrait}
          alt={site.name}
          fill
          placeholder="blur"
          sizes="210px"
          className={styles.portraitImage}
        />
      </div>

      <CvDownloads
        enLabel={t('cv.en')}
        bgLabel={t('cv.bg')}
        downloadingLabel={t('cv.downloading')}
      />

      <DefinitionList items={meta} className={styles.meta} />
    </aside>
  );
}
