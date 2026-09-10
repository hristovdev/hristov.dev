'use client';

import MuiLink, { type LinkProps } from '@mui/material/Link';
import { Link } from '@/i18n/navigation';

type AppLinkProps = LinkProps & { href: string };

/** Locale-aware MUI Link for internal routes, usable from server components. */
export default function AppLink({ href, children, ...props }: AppLinkProps) {
  return (
    <MuiLink component={Link} href={href} {...props}>
      {children}
    </MuiLink>
  );
}
