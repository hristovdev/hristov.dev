import { useTranslations } from 'next-intl';
import { ButtonLink } from '@/components/shared/Button';
import { CodeWatermark } from './CodeWatermark';
import styles from './Hero.module.scss';

export function Hero() {
  const t = useTranslations('home');

  return (
    <section className={styles.hero}>
      <CodeWatermark />

      <h1 className={styles.title}>
        {t('hero.a')}
        <em>{t('hero.b')}</em>
        {t('hero.c')}
      </h1>

      <p className={styles.lead}>{t('hero.lead')}</p>

      <div className={styles.actions}>
        <ButtonLink href="/contact">{t('cta.primary')}</ButtonLink>
        <ButtonLink href="/resume" variant="secondary">
          {t('cta.secondary')}
        </ButtonLink>
      </div>
    </section>
  );
}
