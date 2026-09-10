import { ImageResponse } from 'next/og';
import { site } from '@/data/site';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Hristo Hristov — Senior full-stack developer';

const ROLE = {
  en: 'Senior full-stack developer · React & TypeScript',
  bg: 'Старши full-stack разработчик · React и TypeScript',
} as const;

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const role = locale === 'bg' ? ROLE.bg : ROLE.en;

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 88,
        background: '#0c0a0e',
        backgroundImage:
          'radial-gradient(760px circle at 88% -10%, rgba(255, 54, 80, 0.30), transparent 62%), radial-gradient(620px circle at 2% 106%, rgba(176, 64, 196, 0.22), transparent 64%)',
        color: '#f4f1f7',
      }}
    >
      <div style={{ display: 'flex', fontSize: 27, letterSpacing: 2, color: '#a29caf' }}>
        hristov<span style={{ color: '#ff3650' }}>.dev</span>
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: 22,
          fontSize: 88,
          fontWeight: 600,
          letterSpacing: -3,
        }}
      >
        {site.name}
      </div>
      <div style={{ display: 'flex', marginTop: 20, fontSize: 36, color: '#a29caf' }}>{role}</div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          marginTop: 60,
          fontSize: 25,
          color: 'rgba(244, 241, 247, 0.62)',
        }}
      >
        <div
          style={{ display: 'flex', width: 12, height: 12, borderRadius: 6, background: '#ff3650' }}
        />
        {site.location.city}, {site.location.country}
      </div>
    </div>,
    size,
  );
}
