'use client';

import Button, { type ButtonProps } from '@mui/material/Button';
import { Link } from '@/i18n/navigation';

type ButtonLinkProps = ButtonProps & { href: string };

/**
 * Locale-aware Button-as-Link. Lives on the client so server components can
 * render internal navigation buttons without passing the Link component
 * across the RSC serialization boundary.
 */
export default function ButtonLink({ href, children, ...props }: ButtonLinkProps) {
  return (
    <Button component={Link} href={href} {...props}>
      {children}
    </Button>
  );
}
