export const appName = 'RN Neo';
export const siteUrl = 'https://rn-neo.gs-rumana.com';
export const siteTagline = 'Neubrutalist UI for React Native';
export const siteDescription =
  'RN Neo is an open-source UI library for React Native with a bold, consistent Neubrutalist design: raw borders, hard shadows, flat color. Token-driven, fully typed, Expo-ready.';
export const ogImage = `${siteUrl}/rn-neo-cover.png`;
export const docsRoute = '/docs';
export const docsImageRoute = '/og/docs';

export const gitConfig = {
  user: 'gs-rumana',
  repo: 'rn-neo',
  branch: 'main',
};

export const githubUrl = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;
export const snackUrl = 'https://snack.expo.dev/@gs-rumana/rn-neo-example';
export const npmUrl = 'https://www.npmjs.com/package/rn-neo';

/** Every component exported from `rn-neo`, in alphabetical order. Drives counts and links on the landing page. */
export const components = [
  { name: 'Badge', slug: 'badge' },
  { name: 'Box', slug: 'box' },
  { name: 'Card', slug: 'card' },
  { name: 'Checkbox', slug: 'checkbox' },
  { name: 'Dialog', slug: 'dialog' },
  { name: 'Input', slug: 'input' },
  { name: 'Pressable', slug: 'pressable' },
  { name: 'Radio', slug: 'radio' },
  { name: 'Switch', slug: 'switch' },
  { name: 'Text', slug: 'text' },
] as const;
