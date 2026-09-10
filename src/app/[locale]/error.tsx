'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button, ButtonLink } from '@/components/shared/Button';
import styles from '@/components/shared/Message.module.css';

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
        <ButtonLink href="/" variant="secondary">
          {t('home')}
        </ButtonLink>
      </div>
    </div>
  );
}
