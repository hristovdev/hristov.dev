'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button, ActionLink } from '@/components/atoms';
import styles from '@/components/organisms/MessagePage.module.scss';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('error');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>{t('title')}</h1>
      <p className={styles.text}>{t('text')}</p>
      <div className={styles.actions}>
        <Button onClick={reset}>{t('retry')}</Button>
        <ActionLink href="/" variant="secondary">
          {t('home')}
        </ActionLink>
      </div>
    </div>
  );
}
