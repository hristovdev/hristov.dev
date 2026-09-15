import { useTranslations } from 'next-intl';
import { Band } from '@/components/shared/Section';
import { ButtonLink } from '@/components/shared/Button';
import styles from './ClosingCta.module.scss';

export function ClosingCta() {
  const t = useTranslations('home');

  return (
    <Band>
      <div className={styles.wrap}>
        <h2 className={styles.title}>{t('final.title')}</h2>
        <p className={styles.body}>{t('final.body')}</p>
        <div className={styles.action}>
          <ButtonLink href="/contact">{t('cta.primary')}</ButtonLink>
        </div>
      </div>
    </Band>
  );
}
