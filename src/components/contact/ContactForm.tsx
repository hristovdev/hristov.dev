'use client';

import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { site } from '@/data/site';
import {
  CONTACT_LIMITS,
  ENGAGEMENT_TYPES,
  getFieldErrors,
  type EngagementType,
} from '@/lib/contact';

type FieldKey = 'name' | 'email' | 'message';
type Status = 'idle' | 'sending' | 'success';

const INITIAL_VALUES = {
  name: '',
  email: '',
  company: '',
  engagement: 'b2b' as EngagementType,
  message: '',
  website: '', // honeypot — humans never see or fill this
};

export default function ContactForm() {
  const t = useTranslations('contact.form');
  const [values, setValues] = useState(INITIAL_VALUES);
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);

  const errors = getFieldErrors(values);

  const setValue =
    (field: keyof typeof INITIAL_VALUES) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const markTouched = (field: FieldKey) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const helperTextFor = (field: FieldKey): string | undefined => {
    if (!attempted && !touched[field]) {
      return undefined;
    }
    const errorKey = errors[field];
    return errorKey
      ? t(`errors.${errorKey}`, { min: CONTACT_LIMITS.message.min, email: site.email })
      : undefined;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAttempted(true);
    setSubmitError(null);
    if (Object.keys(errors).length > 0) {
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;

      if (response.ok && data?.ok) {
        setStatus('success');
        return;
      }

      const errorKey = data?.error === 'rate_limited' ? 'rateLimited' : 'generic';
      setSubmitError(t(`errors.${errorKey}`, { email: site.email }));
      setStatus('idle');
    } catch {
      setSubmitError(t('errors.generic', { email: site.email }));
      setStatus('idle');
    }
  };

  const reset = () => {
    setValues(INITIAL_VALUES);
    setTouched({});
    setAttempted(false);
    setSubmitError(null);
    setStatus('idle');
  };

  if (status === 'success') {
    return (
      <Paper
        variant="outlined"
        sx={{
          p: { xs: 4, md: 6 },
          borderRadius: '22px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <CheckCircleRoundedIcon sx={{ fontSize: 56, color: 'primary.main' }} />
        <Typography variant="h5" component="p">
          {t('success.title')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('success.text')}
        </Typography>
        <Button variant="outlined" onClick={reset} sx={{ mt: 1.5 }}>
          {t('success.again')}
        </Button>
      </Paper>
    );
  }

  return (
    <Paper
      component="form"
      variant="outlined"
      noValidate
      onSubmit={handleSubmit}
      sx={{ p: { xs: 3, md: 4 }, borderRadius: '22px' }}
    >
      <Stack spacing={2.5}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2.5 }}>
          <TextField
            label={t('name')}
            value={values.name}
            onChange={setValue('name')}
            onBlur={markTouched('name')}
            error={Boolean(helperTextFor('name'))}
            helperText={helperTextFor('name')}
            required
            fullWidth
            autoComplete="name"
          />
          <TextField
            label={t('email')}
            type="email"
            value={values.email}
            onChange={setValue('email')}
            onBlur={markTouched('email')}
            error={Boolean(helperTextFor('email'))}
            helperText={helperTextFor('email')}
            required
            fullWidth
            autoComplete="email"
          />
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2.5 }}>
          <TextField
            label={t('company')}
            value={values.company}
            onChange={setValue('company')}
            fullWidth
            autoComplete="organization"
          />
          <TextField
            label={t('engagement')}
            value={values.engagement}
            onChange={setValue('engagement')}
            select
            fullWidth
          >
            {ENGAGEMENT_TYPES.map((type) => (
              <MenuItem key={type} value={type}>
                {t(`engagementOptions.${type}`)}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <TextField
          label={t('message')}
          placeholder={t('messagePlaceholder')}
          value={values.message}
          onChange={setValue('message')}
          onBlur={markTouched('message')}
          error={Boolean(helperTextFor('message'))}
          helperText={helperTextFor('message')}
          required
          fullWidth
          multiline
          minRows={5}
        />

        <input
          type="text"
          name="website"
          value={values.website}
          onChange={setValue('website')}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{
            position: 'absolute',
            width: 1,
            height: 1,
            opacity: 0,
            pointerEvents: 'none',
          }}
        />

        {submitError && (
          <Alert severity="error" sx={{ borderRadius: 3 }}>
            {submitError}
          </Alert>
        )}

        <Box>
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={status === 'sending'}
            endIcon={
              status === 'sending' ? (
                <CircularProgress size={18} color="inherit" />
              ) : (
                <SendRoundedIcon />
              )
            }
          >
            {status === 'sending' ? t('sending') : t('submit')}
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
}
