import {
  Palette,
  Blocks,
  SunMoon,
  Braces,
  Smartphone,
  Layers,
  type LucideIcon,
} from 'lucide-react';

const FEATURES: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Palette,
    title: 'Token-driven',
    body: 'Colors, spacing, radius, shadows and type live in one theme. Change a token, the whole app follows.',
  },
  {
    icon: Blocks,
    title: 'Composable',
    body: 'Small primitives you extend, not rigid widgets you fight. Build your own on top.',
  },
  {
    icon: SunMoon,
    title: 'Theming that scales',
    body: 'Light, dark, and custom themes with runtime switching — consistent across every component.',
  },
  {
    icon: Braces,
    title: 'Typed APIs',
    body: 'TypeScript-first props with sane defaults. Autocomplete every variant, catch mistakes early.',
  },
  {
    icon: Smartphone,
    title: 'Expo-ready',
    body: 'Works out of the box with Expo and bare React Native. No native config gymnastics.',
  },
  {
    icon: Layers,
    title: 'Built for real apps',
    body: 'Handles complex layouts and large codebases — reusable patterns, stable structure.',
  },
];

export function Features() {
  return (
    <section className="container mx-auto px-5 mt-28">
      <h2 className="text-3xl md:text-4xl font-bold">
        Not just components. <span className="u-line">A system.</span>
      </h2>
      <p className="mt-3 text-lg text-fd-muted-foreground max-w-2xl">
        Everything snaps to one design language, so your screens stay consistent without effort.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {FEATURES.map(({ icon: Icon, title, body }) => (
          <div
            key={title}
            className="bg-card border-2 border-border brutal-shadow brutal-shadow-lg brutal-shadow-hover p-6 transition-shadow"
          >
            <span className="inline-flex items-center justify-center size-11 bg-primary text-black border-2 border-border brutal-shadow brutal-shadow-sm">
              <Icon className="size-5" />
            </span>
            <h3 className="mt-4 text-xl font-bold">{title}</h3>
            <p className="mt-2 text-fd-muted-foreground">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
