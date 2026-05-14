export type SidebarItem = {
  title: string;
  href: string;
};

export type SidebarGroup = {
  title?: string; // optional now
  items: SidebarItem[];
  collapsed?: boolean;
};

export const sidebar: SidebarGroup[] = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', href: '/docs/introduction' }, // Done
      { title: 'Installation', href: '/docs/installation' }, // Done
      { title: 'Usage', href: '/docs/usage' }, // Done
      { title: 'Customization', href: '/docs/customization' }, // Writing currently
    ],
  },
  {
    title: 'Components',
    collapsed: true,
    items: [
      { title: 'Badge', href: '/docs/components/badge' },
      { title: 'Box', href: '/docs/components/box' },
      { title: 'Card', href: '/docs/components/card' },
      { title: 'Checkbox', href: '/docs/components/checkbox' },
      { title: 'Input', href: '/docs/components/input' },
      { title: 'Pressable', href: '/docs/components/pressable' },
      { title: 'Radio', href: '/docs/components/radio' },
      { title: 'Switch', href: '/docs/components/switch' },
      { title: 'Text', href: '/docs/components/text' },
    ],
  },
  {
    items: [
      { title: 'Contributing', href: '/docs/contributing' },
      { title: 'Code of Conduct', href: '/docs/code-of-conduct' },
      { title: 'Changelog', href: '/docs/changelog' },
    ],
  },
];
