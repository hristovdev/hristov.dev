/**
 * Language-neutral content data. All human-readable, translatable text lives
 * in `messages/{locale}.json` and is looked up by the `key` of each entry.
 */

export const stats = [
  { key: 'years', value: '10+' },
  { key: 'projects', value: '40+' },
  { key: 'industries', value: '8+' },
  { key: 'response', value: '<24h' },
] as const;

export const skillGroups = [
  {
    key: 'frontend',
    chips: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Material UI',
      'TanStack Query',
      'Zustand',
      'Emotion / CSS',
      'Accessibility',
    ],
  },
  {
    key: 'backend',
    chips: ['Node.js', 'NestJS', 'REST APIs', 'GraphQL', 'PostgreSQL', 'Redis', 'Prisma'],
  },
  {
    key: 'devops',
    chips: ['Docker', 'GitHub Actions', 'Linux', 'Nginx', 'AWS', 'Vercel', 'Git', 'Sentry'],
  },
  {
    key: 'testing',
    chips: ['Jest', 'Testing Library', 'Playwright', 'TDD', 'ESLint', 'Prettier', 'Code reviews'],
  },
] as const;

export type SkillGroupKey = (typeof skillGroups)[number]['key'];

export const experience = [
  {
    key: 'freelance',
    current: true,
    tech: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'Playwright'],
  },
  {
    key: 'senior',
    current: false,
    tech: ['React', 'TypeScript', 'Redux', 'Storybook', 'Jest'],
  },
  {
    key: 'fullstack',
    current: false,
    tech: ['JavaScript', 'Node.js', 'PHP', 'MySQL', 'PostgreSQL'],
  },
  {
    key: 'junior',
    current: false,
    tech: ['JavaScript', 'jQuery', 'PHP', 'MySQL'],
  },
] as const;

export type ExperienceKey = (typeof experience)[number]['key'];
