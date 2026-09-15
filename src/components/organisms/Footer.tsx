import { useTranslations } from 'next-intl';
import { Text } from '@/components/atoms';
import { site } from '@/data/site';
import styles from './Footer.module.scss';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <Text size="meta" measure="note">
          {t('text')}
        </Text>
        <span className={styles.mark}>{site.domain}</span>
      </div>
    </footer>
  );
}
