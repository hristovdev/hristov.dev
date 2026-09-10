/**
 * Language-neutral structure for the site's content.
 *
 * Every human-readable string lives in `messages/{locale}.json` and is looked
 * up by the keys below. What stays here is layout and asset information:
 * which icon a row uses, which visual a case study renders, how a skill is
 * rated. That keeps the two message files a pure translation surface.
 */

/* -------------------------------------------------------------- home ---- */

/** Lucide icon names for the animated industry ticker in the facts strip. */
export const industryIcons = ['landmark', 'plane', 'factory', 'house'] as const;
export type IndustryIcon = (typeof industryIcons)[number];

/** Logo + name pairs shown in the "daily stack" fact. */
export const stackIcons = [
  { slug: 'react', label: 'React' },
  { slug: 'typescript', label: 'TypeScript' },
] as const;

export const caseKeys = ['platform', 'manufacturing', 'chat', 'graph'] as const;
export type CaseKey = (typeof caseKeys)[number];

/** Which hand-built visual sits in each case card's right column. */
export const caseVisuals: Record<CaseKey, 'diagram' | 'chart' | 'widget' | 'graph'> = {
  platform: 'diagram',
  manufacturing: 'chart',
  chat: 'widget',
  graph: 'graph',
};

/** Quieter mono chips under each case card. Product names, never translated. */
export const caseStacks: Record<CaseKey, readonly string[]> = {
  platform: ['TypeScript', 'React', 'Micro-frontends', 'MUI', 'CI/CD'],
  manufacturing: ['TypeScript', 'React', 'ag-Grid', 'ag-Charts', 'Real-time data'],
  chat: ['Preact', 'TypeScript', 'Custom events', 'Bundle budget'],
  graph: ['React', 'TypeScript', 'Graph layouts', 'yFiles'],
};

export const processSteps = ['01', '02', '03', '04', '05'] as const;

/* ------------------------------------------------------------ resume ---- */

export const skillLevels = ['expert', 'advanced', 'working', 'past'] as const;
export type SkillLevel = (typeof skillLevels)[number];

export type SkillGroup = {
  key: string;
  /** `plain` groups render as a wrapping chip list with no level badge. */
  plain: boolean;
  items: readonly { icon: string; level: SkillLevel }[];
};

export const skillGroups: readonly SkillGroup[] = [
  {
    key: 'daily',
    plain: false,
    items: [
      { icon: 'react', level: 'expert' },
      { icon: 'typescript', level: 'expert' },
      { icon: 'sass', level: 'expert' },
      { icon: 'eslint', level: 'expert' },
    ],
  },
  {
    key: 'tooling',
    plain: true,
    items: [
      { icon: '', level: 'advanced' },
      { icon: 'webpack', level: 'advanced' },
      { icon: '', level: 'advanced' },
      { icon: 'github', level: 'advanced' },
      { icon: 'azure', level: 'working' },
      { icon: 'git', level: 'working' },
    ],
  },
  {
    key: 'backend',
    plain: true,
    items: [
      { icon: 'nodejs', level: 'advanced' },
      { icon: 'postgresql', level: 'working' },
      { icon: 'csharp', level: 'past' },
      { icon: '', level: 'past' },
    ],
  },
  {
    key: 'testing',
    plain: false,
    items: [
      { icon: 'playwright', level: 'advanced' },
      { icon: 'jest', level: 'advanced' },
      { icon: 'git', level: 'advanced' },
      { icon: '', level: 'advanced' },
    ],
  },
  {
    key: 'people',
    plain: true,
    items: [
      { icon: '', level: 'advanced' },
      { icon: '', level: 'advanced' },
      { icon: '', level: 'advanced' },
      { icon: '', level: 'advanced' },
    ],
  },
];

/**
 * The horizontal ticker under the skills grid. `icon` is a Devicon slug
 * vendored into /public/icons/tech; an empty string falls back to a
 * two-letter monogram tile.
 */
export const technologies: readonly { name: string; icon: string }[] = [
  { name: 'React', icon: 'react' },
  { name: 'TypeScript', icon: 'typescript' },
  { name: 'JavaScript', icon: 'javascript' },
  { name: 'Preact', icon: '' },
  { name: 'Next.js', icon: 'nextjs' },
  { name: 'MUI', icon: 'materialui' },
  { name: 'emotion', icon: '' },
  { name: 'styled-components', icon: '' },
  { name: 'Sass', icon: 'sass' },
  { name: 'Less', icon: 'less' },
  { name: 'HTML', icon: 'html5' },
  { name: 'CSS', icon: 'css3' },
  { name: 'jQuery', icon: 'jquery' },
  { name: 'TanStack', icon: '' },
  { name: 'MobX', icon: '' },
  { name: 'Yjs', icon: '' },
  { name: 'ag-Grid', icon: '' },
  { name: 'ag-Charts', icon: '' },
  { name: 'ag-Studio', icon: '' },
  { name: 'yFiles', icon: '' },
  { name: 'Axios', icon: '' },
  { name: 'Lodash', icon: '' },
  { name: 'Luxon', icon: '' },
  { name: 'Playwright', icon: 'playwright' },
  { name: 'Jest', icon: 'jest' },
  { name: 'ESLint', icon: 'eslint' },
  { name: 'webpack', icon: 'webpack' },
  { name: 'rsbuild', icon: '' },
  { name: 'esbuild', icon: '' },
  { name: 'Node.js', icon: 'nodejs' },
  { name: 'GitHub', icon: 'github' },
  { name: 'Azure', icon: 'azure' },
  { name: 'SQL', icon: 'postgresql' },
  { name: 'C#', icon: 'csharp' },
  { name: 'PHP', icon: 'php' },
  { name: 'Python', icon: 'python' },
  { name: 'VBA', icon: '' },
];

export const educationKeys = ['telerik', 'certs', 'languages'] as const;

/* ----------------------------------------------------------- contact ---- */

export const channelKeys = ['email', 'linkedin', 'github', 'call'] as const;
export type ChannelKey = (typeof channelKeys)[number];

export const entityKeys = ['entity', 'invoicing', 'paperwork', 'hours'] as const;

/** CV files served from /public/cv. */
export const cvFiles = {
  en: '/cv/Hristo-Hristov-CV-EN.pdf',
  bg: '/cv/Hristo-Hristov-CV-BG.pdf',
} as const;
