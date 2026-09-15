'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Form } from 'react-aria-components';
import { Button, Heading, Text } from '@/components/atoms';
import { ChoiceGroup, Field } from '@/components/molecules';
import {
  CONTACT_LIMITS,
  ENGAGEMENT_TYPES,
  getFieldErrors,
  type ContactFieldErrors,
  type EngagementType,
} from '@/lib/contact';
import styles from './ContactForm.module.scss';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const EMPTY = { name: '', company: '', email: '', message: '' };

export function ContactForm() {
  const t = useTranslations('contact.form');
  const locale = useLocale();

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
          <Heading level={2} size="cardSm">
            {t('sent.title')}
          </Heading>
          <Text size="bodySm" className={styles.sentBody}>
            {t('sent.body')}
          </Text>
          <Button variant="secondary" onPress={() => setStatus('idle')}>
            {t('sent.again')}
          </Button>
        </div>
      </div>
    );
  }

  const sending = status === 'sending';

  return (
    <div className={styles.card}>
      <Heading level={2} size="cardSm" className={styles.title}>
        {t('title')}
      </Heading>

      {/*
       * React Aria's Form and TextField carry the label/control/error wiring
       * that this component used to assemble by hand with useId and manual
       * aria-describedby: each Field generates its own ids, sets aria-invalid,
       * and publishes its error message as a live region so a message that
       * appears on submit is announced rather than only drawn.
       */}
      <Form onSubmit={onSubmit} validationBehavior="aria">
        <div className={styles.twoUp}>
          <Field
            name="name"
            label={t('label.name')}
            placeholder={t('placeholder.name')}
            value={values.name}
            onChange={(value) => update('name', value)}
            maxLength={CONTACT_LIMITS.name.max}
            autoComplete="name"
            isRequired
            error={errors.name && t(`error.${errors.name}`)}
          />

          <Field
            name="company"
            label={t('label.company')}
            placeholder={t('placeholder.company')}
            value={values.company}
            onChange={(value) => update('company', value)}
            maxLength={CONTACT_LIMITS.company.max}
            autoComplete="organization"
          />
        </div>

        <Field
          name="email"
          type="email"
          label={t('label.email')}
          placeholder={t('placeholder.email')}
          value={values.email}
          onChange={(value) => update('email', value)}
          maxLength={CONTACT_LIMITS.email.max}
          autoComplete="email"
          isRequired
          error={errors.email && t(`error.${errors.email}`)}
        />

        <ChoiceGroup
          name="engagement"
          label={t('label.kind')}
          value={kind}
          onChange={(value) => setKind(value as EngagementType)}
          choices={ENGAGEMENT_TYPES.map((type) => ({ value: type, label: t(`kinds.${type}`) }))}
        />

        <Field
          multiline
          name="message"
          label={t('label.message')}
          placeholder={t('placeholder.message')}
          value={values.message}
          onChange={(value) => update('message', value)}
          maxLength={CONTACT_LIMITS.message.max}
          isRequired
          error={errors.message && t(`error.${errors.message}`)}
        />

        {/* Honeypot — hidden from people, tempting to bots. */}
        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <Button type="submit" className={styles.submit} isDisabled={sending}>
          {sending ? t('sending') : t('submit')}
        </Button>

        {formError ? (
          <Text size="bodySm" className={styles.formError} role="alert">
            {formError}
          </Text>
        ) : null}

        <Text size="bodyXs" className={styles.note}>
          {t('note')}
        </Text>
      </Form>
    </div>
  );
}
