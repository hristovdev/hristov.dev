import { useTranslations } from 'next-intl';
import { site } from '@/data/site';
import styles from './Footer.module.css';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.text}>{t('text')}</p>
        <span className={styles.mark}>{site.domain}</span>
      </div>
    </footer>
  );
}
