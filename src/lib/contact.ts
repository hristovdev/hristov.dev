export const CONTACT_LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 200 },
  company: { max: 200 },
  message: { min: 20, max: 5000 },
} as const;

export const ENGAGEMENT_TYPES = ['b2b', 'fulltime', 'short', 'other'] as const;
export type EngagementType = (typeof ENGAGEMENT_TYPES)[number];

export function isEngagementType(value: unknown): value is EngagementType {
  return typeof value === 'string' && (ENGAGEMENT_TYPES as readonly string[]).includes(value);
}

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type ContactFields = {
  name: string;
  email: string;
  message: string;
};

export type ContactFieldErrorKey =
  'nameRequired' | 'emailRequired' | 'emailInvalid' | 'messageRequired' | 'messageTooShort';

export type ContactFieldErrors = Partial<Record<keyof ContactFields, ContactFieldErrorKey>>;

/**
 * Validation shared by the form (client) and the route handler (server), so a
 * submission can never pass in the browser and fail silently on the server.
 */
export function getFieldErrors(fields: ContactFields): ContactFieldErrors {
  const errors: ContactFieldErrors = {};

  if (fields.name.trim().length < CONTACT_LIMITS.name.min) {
    errors.name = 'nameRequired';
  }

  const email = fields.email.trim();
  if (!email) {
    errors.email = 'emailRequired';
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'emailInvalid';
  }

  const message = fields.message.trim();
  if (!message) {
    errors.message = 'messageRequired';
  } else if (message.length < CONTACT_LIMITS.message.min) {
    errors.message = 'messageTooShort';
  }

  return errors;
}
