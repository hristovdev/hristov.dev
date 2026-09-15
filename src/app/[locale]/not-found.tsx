import { useTranslations } from 'next-intl';
import { ButtonLink } from '@/components/shared/Button';
import styles from '@/components/shared/Message.module.scss';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <div className={styles.wrap}>
      <p className={styles.code}>{t('code')}</p>
      <h1 className={styles.title}>{t('title')}</h1>
      <p className={styles.text}>{t('text')}</p>
      <div className={styles.actions}>
        <ButtonLink href="/">{t('cta')}</ButtonLink>
      </div>
    </div>
  );
}
