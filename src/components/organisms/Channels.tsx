import { useTranslations } from 'next-intl';
import { Label, StatusDot, Surface, Text } from '@/components/atoms';
import { DefinitionList, type Definition } from '@/components/molecules';
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

  const entity: Definition[] = entityKeys.map((key) => ({
    key,
    term: t(`entity.items.${key}.k`),
    value: t(`entity.items.${key}.v`),
  }));

  return (
    <div>
      <Surface radius="card" clip>
        {channels.map((channel) => (
          <a
            key={channel.key}
            href={channel.href}
            className={styles.row}
            {...(channel.external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
          >
            <Label size="xs" tone="muted" className={styles.label}>
              {t(`channels.${channel.key}.label`)}
            </Label>
            <span className={styles.value}>
              {channel.value || t(`channels.${channel.key}.value`)}
            </span>
            <span className={styles.arrow} aria-hidden="true">
              {channel.key === 'call' ? '→' : '↗'}
            </span>
          </a>
        ))}
      </Surface>

      <div className={styles.panel}>
        <p className={styles.status}>
          <StatusDot />
          {t('availabilityStatus')}
        </p>
        <Text size="bodySm" className={styles.note}>
          {t('availabilityNote')}
        </Text>
      </div>

      <div className={styles.panel}>
        <Label as="p" size="sm" tone="accent" className={styles.panelTitle}>
          {t('entity.title')}
        </Label>
        <DefinitionList items={entity} />
      </div>
    </div>
  );
}
