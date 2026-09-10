'use client';

import { ExternalButtonLink } from '@/components/shared/Button';
import { cvFiles } from '@/data/content';
import { DownloadToast, useDownloadToast } from './DownloadToast';
import styles from './ResumeSidebar.module.css';

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
  const { file, show } = useDownloadToast();
  const items = [
    { key: 'en', href: cvFiles.en, label: enLabel, variant: 'primary' },
    { key: 'bg', href: cvFiles.bg, label: bgLabel, variant: 'secondary' },
  ] as const;

  return (
    <>
      <div className={styles.cvList}>
        {items.map((cv) => (
          <ExternalButtonLink
            key={cv.key}
            href={cv.href}
            download
            variant={cv.variant}
            className={styles.cvButton}
            onClick={() => show(cv.href.split('/').pop() ?? '')}
          >
            {cv.label}
            <span className={styles.pdfTag}>PDF</span>
          </ExternalButtonLink>
        ))}
      </div>

      {file ? <DownloadToast file={file} label={downloadingLabel} /> : null}
    </>
  );
}
