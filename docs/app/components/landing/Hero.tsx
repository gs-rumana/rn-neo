import { Link } from 'react-router';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { gitConfig } from '@/lib/shared';
import { LineShadowText } from '../ui/line-shadow-text';

export function Hero() {
  return (
    <section className="cross-bg px-4 pt-16 pb-20 md:pt-24">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
        {/* copy */}
        <div>
          {/* <span className="inline-flex items-center gap-2 bg-secondary text-black border-2 border-border px-3 py-1 text-sm font-bold brutal-shadow brutal-shadow-sm">
            <Star className="size-3.5 fill-black" />
            React Native · Neubrutalist UI
          </span> */}

          <h1 className="mt-6 text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight">
            UI that
            <br />
            <span className="font-outline text-primary brutal-text-shadow">refuses</span>{' '}
            to <LineShadowText>blend</LineShadowText> in.
          </h1>

          <p className="mt-6 text-lg md:text-xl text-fd-muted-foreground max-w-xl">
            <span className="font-semibold text-foreground">RN Neo</span> is a component
            library for React Native — raw borders, hard zero-blur shadows, flat loud color.
            Token-driven, fully typed, Expo-ready.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild className="border-2 border-border h-12 px-7 text-base">
              <Link to="/docs">
                Get Started <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="neutral" className="border-2 border-border h-12 px-7 text-base">
              <a
                href={`https://github.com/${gitConfig.user}/${gitConfig.repo}`}
                target="_blank"
                rel="noreferrer"
              >
                <Star className="size-4" /> Star on GitHub
              </a>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-fd-muted-foreground font-mono">
            <span>7+ components</span>
            <span>· dark mode</span>
            <span>· runtime theming</span>
            <span>· zero boilerplate</span>
          </div>
        </div>

        {/* live showcase */}
        <ShowcaseCard />
      </div>
    </section>
  );
}

function ShowcaseCard() {
  // Density handled by srcSet (1x/2x/3x); theme handled by .dark class toggle.
  // Media-query <picture> can't be used — dark mode is class-based here.
  const common =
    'w-full max-w-[360px] mx-auto';
  return (
    <div className="relative">
      <img
        src="/hero/rn-neo-light@1x.webp"
        srcSet="/hero/rn-neo-light@1x.webp 1x, /hero/rn-neo-light@2x.webp 2x, /hero/rn-neo-light@3x.webp 3x"
        width={497}
        height={801}
        alt="RN Neo components showcased in a mobile app"
        loading="eager"
        decoding="async"
        className={`${common} block dark:hidden`}
      />
      <img
        src="/hero/rn-neo-dark@1x.webp"
        srcSet="/hero/rn-neo-dark@1x.webp 1x, /hero/rn-neo-dark@2x.webp 2x, /hero/rn-neo-dark@3x.webp 3x"
        width={497}
        height={801}
        alt="RN Neo components showcased in a mobile app, dark theme"
        loading="eager"
        decoding="async"
        className={`${common} hidden dark:block`}
      />
    </div>
  );
}
