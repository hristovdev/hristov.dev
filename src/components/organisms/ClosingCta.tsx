import { useTranslations } from 'next-intl';
import { ActionLink, Heading, Text } from '@/components/atoms';
import { Band } from '@/components/molecules';
import styles from './ClosingCta.module.scss';

export function ClosingCta() {
  const t = useTranslations('home');

  return (
    <Band>
      <div className={styles.wrap}>
        <Heading level={2} size="section" className={styles.title}>
          {t('final.title')}
        </Heading>
        <Text size="leadSm" measure="lead">
          {t('final.body')}
        </Text>
        <div className={styles.action}>
          <ActionLink href="/contact">{t('cta.primary')}</ActionLink>
        </div>
      </div>
    </Band>
  );
}
