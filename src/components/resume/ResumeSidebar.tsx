import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Kicker } from '@/components/shared/Section';
import { site } from '@/data/site';
import portrait from '@/../public/images/portrait.jpg';
import { CvDownloads } from './CvDownloads';
import styles from './ResumeSidebar.module.css';

const META_KEYS = ['based', 'languages', 'availability', 'engagement'] as const;

export function ResumeSidebar() {
  const t = useTranslations('resume');
  const nav = useTranslations('nav');

  return (
    <aside className={styles.aside}>
      <div>
        <Kicker>{nav('resume')}</Kicker>
        <h1 className={styles.name}>{t('name')}</h1>
        <p className={styles.role}>{t('role')}</p>
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

      <dl className={styles.meta}>
        {META_KEYS.map((key) => (
          <div key={key} className={styles.metaRow}>
            <dt className={styles.metaKey}>{t(`meta.${key}.k`)}</dt>
            <dd className={styles.metaValue}>{t(`meta.${key}.v`)}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
