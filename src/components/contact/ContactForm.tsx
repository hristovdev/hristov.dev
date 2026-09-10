'use client';

import { useId, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/components/shared/Button';
import {
  CONTACT_LIMITS,
  ENGAGEMENT_TYPES,
  getFieldErrors,
  type ContactFieldErrors,
  type EngagementType,
} from '@/lib/contact';
import styles from './ContactForm.module.css';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const EMPTY = { name: '', company: '', email: '', message: '' };

export function ContactForm() {
  const t = useTranslations('contact.form');
  const locale = useLocale();
  const formId = useId();

  const [values, setValues] = useState(EMPTY);
  const [kind, setKind] = useState<EngagementType>('b2b');
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [formError, setFormError] = useState<string | null>(null);

  function update(field: keyof typeof EMPTY, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Clear a field's error as soon as the visitor starts fixing it.
    if (field !== 'company' && errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const found = getFieldErrors(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus('sending');

    const honeypot = new FormData(event.currentTarget).get('website');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, engagement: kind, locale, website: honeypot ?? '' }),
      });

      if (response.ok) {
        setStatus('sent');
        setValues(EMPTY);
        return;
      }

      if (response.status === 422) {
        const data = (await response.json()) as { errors?: ContactFieldErrors };
        setErrors(data.errors ?? {});
        setStatus('idle');
        return;
      }

      setFormError(t(response.status === 429 ? 'error.rateLimited' : 'error.body'));
      setStatus('error');
    } catch {
      setFormError(t('error.body'));
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className={styles.card}>
        <div className={styles.sent}>
          <div className={styles.check} aria-hidden="true">
            ✓
          </div>
          <h2 className={styles.sentTitle}>{t('sent.title')}</h2>
          <p className={styles.sentBody}>{t('sent.body')}</p>
          <Button type="button" variant="secondary" onClick={() => setStatus('idle')}>
            {t('sent.again')}
          </Button>
        </div>
      </div>
    );
  }

  const sending = status === 'sending';

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{t('title')}</h2>

      <form onSubmit={onSubmit} noValidate>
        <div className={styles.twoUp}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor={`${formId}-name`}>
              {t('label.name')}
            </label>
            <input
              id={`${formId}-name`}
              name="name"
              value={values.name}
              onChange={(e) => update('name', e.target.value)}
              placeholder={t('placeholder.name')}
              maxLength={CONTACT_LIMITS.name.max}
              autoComplete="name"
              required
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? `${formId}-name-error` : undefined}
              className={`${styles.input} ${errors.name ? styles.invalid : ''}`}
            />
            {errors.name ? (
              <p id={`${formId}-name-error`} className={styles.error}>
                {t(`error.${errors.name}`)}
              </p>
            ) : null}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor={`${formId}-company`}>
              {t('label.company')}
            </label>
            <input
              id={`${formId}-company`}
              name="company"
              value={values.company}
              onChange={(e) => update('company', e.target.value)}
              placeholder={t('placeholder.company')}
              maxLength={CONTACT_LIMITS.company.max}
              autoComplete="organization"
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor={`${formId}-email`}>
            {t('label.email')}
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            value={values.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder={t('placeholder.email')}
            maxLength={CONTACT_LIMITS.email.max}
            autoComplete="email"
            required
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? `${formId}-email-error` : undefined}
            className={`${styles.input} ${errors.email ? styles.invalid : ''}`}
          />
          {errors.email ? (
            <p id={`${formId}-email-error`} className={styles.error}>
              {t(`error.${errors.email}`)}
            </p>
          ) : null}
        </div>

        <fieldset className={styles.kinds}>
          <legend className={styles.legend}>{t('label.kind')}</legend>
          {ENGAGEMENT_TYPES.map((type) => (
            <span key={type} className={styles.kind}>
              <input
                className={styles.kindInput}
                type="radio"
                name="engagement"
                id={`${formId}-kind-${type}`}
                value={type}
                checked={kind === type}
                onChange={() => setKind(type)}
              />
              <label className={styles.kindLabel} htmlFor={`${formId}-kind-${type}`}>
                {t(`kinds.${type}`)}
              </label>
            </span>
          ))}
        </fieldset>

        <div className={styles.field}>
          <label className={styles.label} htmlFor={`${formId}-message`}>
            {t('label.message')}
          </label>
          <textarea
            id={`${formId}-message`}
            name="message"
            value={values.message}
            onChange={(e) => update('message', e.target.value)}
            placeholder={t('placeholder.message')}
            maxLength={CONTACT_LIMITS.message.max}
            required
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? `${formId}-message-error` : undefined}
            className={`${styles.textarea} ${errors.message ? styles.invalid : ''}`}
          />
          {errors.message ? (
            <p id={`${formId}-message-error`} className={styles.error}>
              {t(`error.${errors.message}`)}
            </p>
          ) : null}
        </div>

        {/* Honeypot — hidden from people, tempting to bots. */}
        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor={`${formId}-website`}>Website</label>
          <input id={`${formId}-website`} name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <Button type="submit" className={styles.submit} disabled={sending}>
          {sending ? t('sending') : t('submit')}
        </Button>

        {formError ? (
          <p className={styles.formError} role="alert">
            {formError}
          </p>
        ) : null}

        <p className={styles.note}>{t('note')}</p>
      </form>
    </div>
  );
}
