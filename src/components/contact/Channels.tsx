import { useTranslations } from 'next-intl';
import { entityKeys } from '@/data/content';
import { channelValues, site } from '@/data/site';
import styles from './Channels.module.scss';

type Channel = { key: string; href: string; value: string; external: boolean };

/**
 * Built from the real values in `site.ts` rather than the design's
 * placeholders. The intro-call row only appears once `site.callUrl` is set.
 */
const CHANNELS: Channel[] = [
  { key: 'email', href: `mailto:${site.email}`, value: channelValues.email, external: false },
  { key: 'linkedin', href: site.social.linkedin, value: channelValues.linkedin, external: true },
  { key: 'github', href: site.social.github, value: channelValues.github, external: true },
];

export function Channels() {
  const t = useTranslations('contact');

  const channels: Channel[] = site.callUrl
    ? [...CHANNELS, { key: 'call', href: site.callUrl, value: '', external: true }]
    : CHANNELS;

  return (
    <div>
      <div className={styles.card}>
        {channels.map((channel) => (
          <a
            key={channel.key}
            href={channel.href}
            className={styles.row}
            {...(channel.external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
          >
            <span className={styles.label}>{t(`channels.${channel.key}.label`)}</span>
            <span className={styles.value}>
              {channel.value || t(`channels.${channel.key}.value`)}
            </span>
            <span className={styles.arrow} aria-hidden="true">
              {channel.key === 'call' ? '→' : '↗'}
            </span>
          </a>
        ))}
      </div>

      <div className={styles.panel}>
        <p className={styles.status}>
          <span className={styles.dot} aria-hidden="true" />
          {t('availabilityStatus')}
        </p>
        <p className={styles.note}>{t('availabilityNote')}</p>
      </div>

      <div className={styles.panel}>
        <p className={styles.panelTitle}>{t('entity.title')}</p>
        <dl>
          {entityKeys.map((key) => (
            <div key={key} className={styles.detailRow}>
              <dt className={styles.detailKey}>{t(`entity.items.${key}.k`)}</dt>
              <dd className={styles.detailValue}>{t(`entity.items.${key}.v`)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
