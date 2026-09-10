'use client';

import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import Button from '@mui/material/Button';

/** Prints the About page, which doubles as a clean CV via print styles. */
export default function DownloadCvButton({ label }: { label: string }) {
  return (
    <Button
      className="no-print"
      variant="outlined"
      startIcon={<DownloadRoundedIcon />}
      onClick={() => window.print()}
    >
      {label}
    </Button>
  );
}
