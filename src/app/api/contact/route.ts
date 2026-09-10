import { NextResponse, type NextRequest } from 'next/server';
import {
  CONTACT_LIMITS,
  ENGAGEMENT_TYPES,
  getFieldErrors,
  type EngagementType,
} from '@/lib/contact';
import { sendContactEmail } from '@/lib/email';

export const runtime = 'nodejs';

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MAX_TRACKED_IPS = 1000;

const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  if (requestLog.size > MAX_TRACKED_IPS) {
    for (const [key, timestamps] of requestLog) {
      if (timestamps.every((timestamp) => now - timestamp >= RATE_LIMIT_WINDOW_MS)) {
        requestLog.delete(key);
      }
    }
  }

  const recent = (requestLog.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );
  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(ip, recent);
    return true;
  }
  recent.push(now);
  requestLog.set(ip, recent);
  return false;
}

function asTrimmedString(value: unknown, maxLength: number): string {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'validation' }, { status: 400 });
  }

  // Honeypot: bots fill the hidden "website" field — pretend everything went fine
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  const name = asTrimmedString(body.name, CONTACT_LIMITS.name.max);
  const email = asTrimmedString(body.email, CONTACT_LIMITS.email.max);
  const company = asTrimmedString(body.company, CONTACT_LIMITS.company.max);
  const message = asTrimmedString(body.message, CONTACT_LIMITS.message.max);
  const engagement = ENGAGEMENT_TYPES.includes(body.engagement as EngagementType)
    ? (body.engagement as EngagementType)
    : undefined;

  const errors = getFieldErrors({ name, email, message });
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, error: 'validation', fields: errors }, { status: 400 });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }

  try {
    await sendContactEmail({ name, email, company: company || undefined, engagement, message });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[contact] failed to send email:', error);
    return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 502 });
  }
}
