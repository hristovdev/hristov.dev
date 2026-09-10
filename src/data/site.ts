export const site = {
  name: 'Hristo Hristov',
  domain: 'hristov.dev',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://hristov.dev',
  email: 'hristo@hristov.dev',
  phone: '+359883466955',
  phoneDisplay: '+359 88 3 466 955',
  location: {
    city: 'Sofia',
    country: 'Bulgaria',
    countryCode: 'BG',
    mapUrl: 'https://goo.gl/maps/U5bda1DQ9HLaT8JT7',
  },
  social: {
    github: 'https://github.com/Xpload',
    linkedin: 'https://www.linkedin.com/in/hvhristov/',
    facebook: 'https://www.facebook.com/xploadz',
  },
  /** Booking link for the "intro call" channel. Empty = row is hidden. */
  callUrl: '',
} as const;

/** Display text for the contact channels, derived from the real values above. */
export const channelValues = {
  email: site.email,
  linkedin: 'linkedin.com/in/hvhristov',
  github: 'github.com/Xpload',
} as const;
