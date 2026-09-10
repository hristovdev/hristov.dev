import { ImageResponse } from 'next/og';
import bg from '../../../messages/bg.json';
import en from '../../../messages/en.json';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Hristo Hristov — Freelance Full-Stack Developer';

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const role = locale === 'bg' ? bg.meta.ogRole : en.meta.ogRole;

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 88,
        background: '#0a0910',
        backgroundImage:
          'radial-gradient(640px circle at 12% -5%, rgba(135, 43, 255, 0.4), transparent 60%), radial-gradient(720px circle at 105% 105%, rgba(135, 43, 255, 0.3), transparent 60%)',
        color: '#f4f2fa',
      }}
    >
      <div
        style={{
          display: 'flex',
          fontSize: 26,
          color: '#b388ff',
          letterSpacing: 6,
          textTransform: 'uppercase',
        }}
      >
        hristov.dev
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: 20,
          fontSize: 92,
          fontWeight: 800,
          letterSpacing: -3,
        }}
      >
        Hristo Hristov
      </div>
      <div style={{ display: 'flex', marginTop: 18, fontSize: 38, color: '#b7b2cc' }}>{role}</div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          marginTop: 64,
          fontSize: 26,
          color: 'rgba(244, 242, 250, 0.65)',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: 14,
            height: 14,
            borderRadius: 99,
            background: '#22c55e',
          }}
        />
        Sofia, Bulgaria · EET (UTC+2)
      </div>
    </div>,
    { ...size },
  );
}
