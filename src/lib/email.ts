import { site } from '@/data/site';
import type { EngagementType } from '@/lib/contact';

export type ContactEmailInput = {
  name: string;
  email: string;
  company?: string;
  engagement?: EngagementType;
  message: string;
};

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

const ENGAGEMENT_LABELS: Record<EngagementType, string> = {
  b2b: 'B2B contract',
  fulltime: 'Full-time role',
  other: 'Something else',
};

type Web3FormsResponse = {
  success?: boolean;
  message?: string;
};

/**
 * Delivers a contact form submission via Web3Forms.
 *
 * The access key stays server-side (`WEB3FORMS_ACCESS_KEY`, no NEXT_PUBLIC
 * prefix), so it is never shipped to the browser — the form talks to our
 * `/api/contact` route, which validates and rate-limits before forwarding.
 */
export async function sendContactEmail(input: ContactEmailInput): Promise<void> {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    if (process.env.NODE_ENV !== 'production') {
      console.info(
        '[contact] WEB3FORMS_ACCESS_KEY is not set — logging the message instead:',
        input,
      );
      return;
    }
    throw new Error('WEB3FORMS_ACCESS_KEY is not configured');
  }

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `[${site.domain}] New inquiry from ${input.name}`,
      from_name: site.domain,
      name: input.name,
      email: input.email,
      company: input.company ?? '—',
      engagement: input.engagement ? ENGAGEMENT_LABELS[input.engagement] : '—',
      message: input.message,
    }),
  });

  const data = (await response.json().catch(() => null)) as Web3FormsResponse | null;

  if (!response.ok || !data?.success) {
    throw new Error(
      `Web3Forms request failed with status ${response.status}${
        data?.message ? `: ${data.message}` : ''
      }`,
    );
  }
}
