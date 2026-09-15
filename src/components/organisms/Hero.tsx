import { useTranslations } from 'next-intl';
import { ActionLink, Heading, Text } from '@/components/atoms';
import { CodeWatermark } from './CodeWatermark';
import styles from './Hero.module.scss';

export function Hero() {
  const t = useTranslations('home');

  return (
    <section className={styles.hero}>
      <CodeWatermark />

      <Heading level={1} size="hero" className={styles.title}>
        {t('hero.a')}
        <em>{t('hero.b')}</em>
        {t('hero.c')}
      </Heading>

      <Text size="lead" measure="lead" className={styles.lead}>
        {t('hero.lead')}
      </Text>

      <div className={styles.actions}>
        <ActionLink href="/contact">{t('cta.primary')}</ActionLink>
        <ActionLink href="/resume" variant="secondary">
          {t('cta.secondary')}
        </ActionLink>
      </div>
    </section>
  );
}
