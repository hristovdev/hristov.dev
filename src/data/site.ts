export const site = {
  name: 'Hristo Hristov',
  domain: 'hristov.dev',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hristov.dev',
  email: 'hristo@hristov.dev',
  phone: '+359883466955',
  phoneDisplay: '+359 88 3 466 955',
  location: {
    city: 'Sofia',
    country: 'Bulgaria',
    mapUrl: 'https://goo.gl/maps/U5bda1DQ9HLaT8JT7',
  },
  social: {
    github: 'https://github.com/Xpload',
    linkedin: 'https://www.linkedin.com/in/hvhristov/',
    facebook: 'https://www.facebook.com/xploadz',
  },
} as const;
