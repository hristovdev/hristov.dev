import { useTranslations } from 'next-intl';
import { ActionLink } from '@/components/atoms';
import styles from '@/components/organisms/MessagePage.module.scss';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <div className={styles.wrap}>
      <p className={styles.code}>{t('code')}</p>
      <h1 className={styles.title}>{t('title')}</h1>
      <p className={styles.text}>{t('text')}</p>
      <div className={styles.actions}>
        <ActionLink href="/">{t('cta')}</ActionLink>
      </div>
    </div>
  );
}
