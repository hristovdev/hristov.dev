'use client';

import { ExternalActionLink } from '@/components/atoms';
import { Toast, useToast } from '@/components/molecules';
import { cvFiles } from '@/data/content';
import styles from './ResumeSidebar.module.scss';

/**
 * The only interactive part of the sidebar, so it is the only part that ships
 * as a Client Component. Labels arrive as props rather than through
 * `useTranslations`, which keeps the résumé namespace out of the client
 * payload entirely.
 */
export function CvDownloads({
  enLabel,
  bgLabel,
  downloadingLabel,
}: {
  enLabel: string;
  bgLabel: string;
  downloadingLabel: string;
}) {
  const { message, show } = useToast();
  const items = [
    { key: 'en', href: cvFiles.en, label: enLabel, variant: 'primary' },
    { key: 'bg', href: cvFiles.bg, label: bgLabel, variant: 'secondary' },
  ] as const;

  return (
    <>
      <div className={styles.cvList}>
        {items.map((cv) => (
          <ExternalActionLink
            key={cv.key}
            href={cv.href}
            download
            variant={cv.variant}
            size="sm"
            className={styles.cvButton}
            onClick={() => show(cv.href.split('/').pop() ?? '')}
          >
            {cv.label}
            <span className={styles.pdfTag}>PDF</span>
          </ExternalActionLink>
        ))}
      </div>

      {message ? <Toast label={downloadingLabel} detail={message} /> : null}
    </>
  );
}
