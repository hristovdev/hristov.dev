import { NextResponse } from 'next/server';
import {
  CONTACT_LIMITS,
  getFieldErrors,
  isEngagementType,
  type ContactFieldErrors,
} from '@/lib/contact';
import { sendContactEmail } from '@/lib/email';

/** Always run on the server at request time; never prerendered. */
export const dynamic = 'force-dynamic';

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

/**
 * In-memory rate limit. The site runs as a single container on one machine, so
 * a process-local map is sufficient; it resets on restart, which is fine for
 * spam control.
 */
const hits = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((at) => now - at < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  if (hits.size > 500) {
    for (const [k, times] of hits) {
      if (times.every((at) => now - at >= WINDOW_MS)) hits.delete(k);
    }
  }

  return recent.length > MAX_PER_WINDOW;
}

function clientKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
}

function str(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

export async function POST(request: Request) {
  if (isRateLimited(clientKey(request))) {
    return NextResponse.json({ error: 'rateLimited' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalidBody' }, { status: 400 });
  }

  const payload = (body ?? {}) as Record<string, unknown>;

  // Honeypot: a hidden field only a bot would fill. Accept and drop silently
  // so the bot sees success and does not retry with a different shape.
  if (str(payload.website, 100)) {
    return NextResponse.json({ ok: true });
  }

  const fields = {
    name: str(payload.name, CONTACT_LIMITS.name.max),
    email: str(payload.email, CONTACT_LIMITS.email.max),
    message: str(payload.message, CONTACT_LIMITS.message.max),
  };
  const company = str(payload.company, CONTACT_LIMITS.company.max);
  const engagement = isEngagementType(payload.engagement) ? payload.engagement : undefined;
  const locale = str(payload.locale, 5) || 'en';

  const errors: ContactFieldErrors = getFieldErrors(fields);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  try {
    await sendContactEmail({ ...fields, company, engagement, locale });
  } catch (error) {
    console.error('[contact] delivery failed:', error);
    return NextResponse.json({ error: 'deliveryFailed' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
