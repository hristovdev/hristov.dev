import { Resend } from 'resend';
import { site } from '@/data/site';
import type { EngagementType } from '@/lib/contact';

export type ContactEmailInput = {
  name: string;
  email: string;
  company?: string;
  engagement?: EngagementType;
  message: string;
  locale: string;
};

const ENGAGEMENT_LABELS: Record<EngagementType, string> = {
  b2b: 'B2B contract',
  fulltime: 'Full-time role',
  short: 'Short engagement',
  other: 'Something else',
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderRows(rows: readonly (readonly [string, string])[]): string {
  return rows
    .map(
      ([label, value]) =>
        `<tr>
           <td style="padding:6px 16px 6px 0;color:#6a6478;font:500 12px/1.4 -apple-system,sans-serif;text-transform:uppercase;letter-spacing:.08em;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td>
           <td style="padding:6px 0;color:#171520;font:400 14px/1.5 -apple-system,sans-serif">${escapeHtml(value)}</td>
         </tr>`,
    )
    .join('');
}

/**
 * Delivers a contact form submission through Resend.
 *
 * `RESEND_API_KEY` is server-only (no NEXT_PUBLIC prefix), so it never reaches
 * the browser — the form posts to /api/contact, which validates and
 * rate-limits before calling this.
 *
 * In development, a missing key logs the submission instead of throwing, so
 * the form can be exercised without secrets.
 */
export async function sendContactEmail(input: ContactEmailInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    if (process.env.NODE_ENV !== 'production') {
      console.info('[contact] RESEND_API_KEY is not set — logging the message instead:', input);
      return;
    }
    throw new Error('RESEND_API_KEY is not configured');
  }

  // Compose passes unconfigured optionals through as empty strings, so fall
  // back on falsy rather than nullish.
  const from = process.env.CONTACT_FROM_EMAIL || `${site.domain} <website@${site.domain}>`;
  const to = process.env.CONTACT_TO_EMAIL || site.email;

  const rows = [
    ['Name', input.name],
    ['Email', input.email],
    ['Company', input.company?.trim() || '—'],
    ['About', input.engagement ? ENGAGEMENT_LABELS[input.engagement] : '—'],
    ['Locale', input.locale],
  ] as const;

  const text = [...rows.map(([label, value]) => `${label}: ${value}`), '', input.message].join(
    '\n',
  );

  const html = `
    <div style="background:#f6f4f9;padding:24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
      <div style="max-width:600px;margin:0 auto;background:#fffdff;border:1px solid rgba(60,45,90,.13);border-radius:14px;padding:28px">
        <p style="margin:0 0 4px;color:#ff3650;font:500 11px/1 monospace;text-transform:uppercase;letter-spacing:.12em">New enquiry</p>
        <h1 style="margin:0 0 20px;color:#171520;font:600 20px/1.25 -apple-system,sans-serif;letter-spacing:-.02em">${escapeHtml(input.name)} got in touch</h1>
        <table style="border-collapse:collapse;margin-bottom:20px">${renderRows(rows)}</table>
        <div style="border-top:1px solid rgba(60,45,90,.13);padding-top:18px;color:#171520;font:400 15px/1.65 -apple-system,sans-serif;white-space:pre-wrap">${escapeHtml(input.message)}</div>
      </div>
    </div>`;

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: input.email,
    subject: `[${site.domain}] ${ENGAGEMENT_LABELS[input.engagement ?? 'other']} — ${input.name}`,
    text,
    html,
  });

  if (error) {
    throw new Error(`Resend rejected the message: ${error.name} — ${error.message}`);
  }
}
