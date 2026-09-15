import { useTranslations } from 'next-intl';
import { Factory, House, Landmark, Plane, type LucideIcon } from 'lucide-react';
import { TechIcon, Text } from '@/components/atoms';
import { industryIcons, stackIcons } from '@/data/content';
import styles from './FactsStrip.module.scss';

const ICONS: Record<string, LucideIcon> = {
  landmark: Landmark,
  plane: Plane,
  factory: Factory,
  house: House,
};

/**
 * Vertical ticker of industries. The keyframes step through five rows — the
 * four industries plus a repeat of the first — so the loop closes without a
 * visible jump.
 */
function IndustryTicker({ items }: { items: string[] }) {
  const rows = [...items, items[0] ?? ''];

  return (
    <div className={styles.ticker}>
      <div className={styles.tickerInner}>
        {rows.map((label, index) => {
          const iconName = industryIcons[index % industryIcons.length] ?? 'landmark';
          const Icon = ICONS[iconName] ?? Landmark;
          return (
            <div className={styles.tickerRow} key={`${label}-${index}`}>
              <Icon className={styles.tickerIcon} strokeWidth={1.75} aria-hidden="true" />
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Fact({ children, value }: { children: React.ReactNode; value: string }) {
  return (
    <div className={styles.cell}>
      {children}
      <Text size="meta" measure="fact" className={styles.value}>
        {value}
      </Text>
    </div>
  );
}

export function FactsStrip() {
  const t = useTranslations('home.facts');
  const industries = t.raw('industries.items') as string[];

  return (
    <section className={styles.band} aria-label={t('years.v')}>
      <div className={styles.grid}>
        <Fact value={t('years.v')}>
          <div className={styles.key}>{t('years.k')}</div>
        </Fact>

        <Fact value={t('industries.v')}>
          <IndustryTicker items={industries} />
        </Fact>

        <Fact value={t('stack.v')}>
          <div className={styles.key}>
            {stackIcons.map((icon) => (
              <span key={icon.slug} className={styles.iconItem}>
                <TechIcon icon={icon.slug} name={icon.label} size="inline" />
                <span>{icon.label}</span>
              </span>
            ))}
          </div>
        </Fact>

        <Fact value={t('start.v')}>
          <div className={styles.key}>{t('start.k')}</div>
        </Fact>
      </div>
    </section>
  );
}
