import { useTranslations } from 'next-intl';
import { educationKeys } from '@/data/content';
import styles from './Experience.module.scss';

type Entry = {
  when: string;
  where: string;
  title: string;
  body: string;
  points: string[];
};

export function Experience() {
  const t = useTranslations('resume.experience');
  const items = t.raw('items') as Entry[];

  return (
    <section>
      <h2 className={styles.title}>{t('title')}</h2>

      <ol className={styles.list}>
        {items.map((entry) => (
          <li key={entry.title + entry.when} className={styles.row}>
            <div>
              <p className={styles.when}>{entry.when}</p>
              <p className={styles.where}>{entry.where}</p>
            </div>

            <div className={styles.content}>
              <h3 className={styles.roleTitle}>{entry.title}</h3>
              <p className={styles.body}>{entry.body}</p>
              {entry.points.length > 0 ? (
                <ul className={styles.points}>
                  {entry.points.map((point) => (
                    <li key={point} className={styles.point}>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Education() {
  const t = useTranslations('resume.education');

  return (
    <section>
      <h2 className={styles.title}>{t('title')}</h2>

      <div className={styles.eduGrid}>
        {educationKeys.map((key) => (
          <article key={key} className={styles.eduCard}>
            <span className={styles.eduWhen}>{t(`items.${key}.when`)}</span>
            <h3 className={styles.eduTitle}>{t(`items.${key}.title`)}</h3>
            <p className={styles.eduBody}>{t(`items.${key}.body`)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
