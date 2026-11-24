import { useRef, type CSSProperties } from 'react';
import { Link } from 'react-router';
import { motion, useScroll, useSpring, type MotionValue } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { components, snackUrl } from '@/lib/shared';
import { cn } from '@/lib/utils';

/**
 * The headline size `--h`, set on an `@container` wrapper whose width is the
 * hero's content box. The one-line h1 below measures 12.65em (Space Grotesk
 * 700, tracking -0.035em, Tourney 400 "refuses"), so at 7.5cqi it fills ~94.9%
 * of the box: >=3.5% slack at every width. The vw fallback (no container
 * units) is sized so the line still fits at 320px.
 */
const headlineUnit =
  '[--h:min(6.6vw,6rem)] supports-[width:1cqi]:[--h:min(7.5cqi,7rem)]';

const COUNT_WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];
const countWord = COUNT_WORDS[components.length] ?? String(components.length);

/**
 * Gives the phone weight: it trails the scroll by about 150ms and settles without a rebound.
 * More stiffness shortens the trail. Keep damping = 1.84 * sqrt(stiffness) to avoid a rebound.
 * Use stiffness and damping: bounce or duration restart from zero velocity on every retarget.
 * restDelta is in progress units; Motion's default can end on a snap of up to half a pixel.
 * No skipInitialAnimation: at scroll 0 it stays armed and swallows the first real scroll. The
 * cost is that a reload or back navigation mid-hero slides the phone into place.
 */
const PHONE_SPRING = { stiffness: 200, damping: 26, restDelta: 0.0001 };

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  // The hero starts under the 56px nav, so this runs from scroll 0 to 62% of the hero's height.
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start 56px', '62% 56px'] });
  const travel = useSpring(scrollYProgress, PHONE_SPRING);

  return (
    <section ref={heroRef} className="w-full">
      <div className="cross-bg">
        <div className="mx-auto max-w-[1360px] px-4 pt-10 pb-6 md:px-6 md:pt-16 md:pb-8 lg:pt-20">
          <div className={cn('@container', headlineUnit)}>
            {/*
              Spaces live inside the string literals: a bare {' '} becomes a whitespace-only
              text node that Chrome drops from the accessibility tree ("UI thatrefusesto…").
            */}
            <h1 className="whitespace-nowrap text-[length:var(--h)] font-bold leading-[0.95] tracking-[-0.035em]">
              {'UI that '}
              <span
                className="font-outline font-normal tracking-normal text-primary brutal-text-shadow"
                style={{ '--bs-offset': '0.045em' } as CSSProperties}
              >
                refuses
              </span>
              {' to blend in.'}
            </h1>
          </div>

          <div className="mt-6 flex flex-col gap-6 md:mt-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <p className="max-w-[40rem] text-[1.0625rem] leading-relaxed text-fd-muted-foreground md:text-xl md:leading-normal">
              <strong className="font-semibold text-foreground">RN Neo</strong>
              {` is ${countWord} React Native components with raw borders, hard shadows and flat, loud color, driven by one theme.`}
            </p>

            <div className="flex flex-wrap gap-3 md:gap-4 lg:flex-none">
              <Button asChild className="h-12 px-6 text-base max-sm:flex-auto">
                <Link to="/docs">
                  Get started <ArrowRight aria-hidden />
                </Link>
              </Button>
              <Button asChild variant="neutral" className="h-12 px-6 text-base max-sm:flex-auto">
                <a href={snackUrl} target="_blank" rel="noopener noreferrer">
                  Open in Expo Snack <ArrowUpRight aria-hidden />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <PhoneStage travel={travel} />
    </section>
  );
}

/**
 * The example app on a phone, cropped by a yellow frame. Scrolling the page slides the phone
 * through the frame: `travel` (0 to 1) is turned into a position by .hero-phone in app.css.
 */
function PhoneStage({ travel }: { travel: MotionValue<number> }) {
  // Theme is handled by the .dark class toggle, so a media-query <picture> can't be used.
  // The shadow is on the imgs, not .hero-phone, so it is baked into the phone's layer once.
  // On the element with will-change, the compositor would re-apply the filter every frame.
  const img = 'block h-auto w-full [filter:drop-shadow(8px_8px_0_#000)] md:[filter:drop-shadow(12px_12px_0_#000)]';
  // The same widths as --phone-w in app.css, written as media queries.
  const sizes = '(min-width: 1438px) 920px, (min-width: 782px) 64vw, (min-width: 391px) 500px, 128vw';
  return (
    <div className="mx-auto max-w-[1360px] px-4 md:px-6">
      <div className="hero-stage relative overflow-clip border-2 border-border bg-secondary shadow-[8px_8px_0_0_var(--border)] md:shadow-[12px_12px_0_0_var(--border)]">
        <div className="absolute inset-0 motion-safe:animate-in motion-safe:slide-in-from-bottom-8 motion-safe:duration-700 motion-safe:ease-out">
          <motion.div style={{ '--travel': travel } as CSSProperties} className="hero-phone absolute">
            <img
              src="/hero/rn-neo-light@2x.webp"
              srcSet="/hero/rn-neo-light@1x.webp 541w, /hero/rn-neo-light@2x.webp 1081w, /hero/rn-neo-light@3x.webp 1622w"
              sizes={sizes}
              alt="The RN Neo example app on a phone, showing cards, text styles, badges and buttons"
              loading="eager"
              decoding="async"
              className={cn(img, 'dark:hidden')}
            />
            <img
              src="/hero/rn-neo-dark@2x.webp"
              srcSet="/hero/rn-neo-dark@1x.webp 541w, /hero/rn-neo-dark@2x.webp 1081w, /hero/rn-neo-dark@3x.webp 1622w"
              sizes={sizes}
              alt="The RN Neo example app on a phone in the dark theme, showing cards, text styles, badges and buttons"
              loading="eager"
              decoding="async"
              className={cn(img, 'hidden dark:block')}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
