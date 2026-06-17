import { useEffect, useState } from 'react';
import { Play } from 'lucide-react';

const SNACK_ID = '@gs-rumana/rn-neo-example';

/** Tracks the site's light/dark mode by watching the <html> class. */
function useIsDark() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const el = document.documentElement;
    const update = () => setDark(el.classList.contains('dark'));
    update();
    const obs = new MutationObserver(update);
    obs.observe(el, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);
  return dark;
}

export function Playground() {
  const dark = useIsDark();
  // Gate interaction so the iframe doesn't trap wheel scroll until the user opts in.
  const [active, setActive] = useState(false);

  const theme = dark ? 'dark' : 'light';
  const src =
    `https://snack.expo.dev/embedded/${SNACK_ID}` +
    `?platform=web&preview=true&hideQueryParams=true&theme=${theme}`;

  return (
    <section className="container mx-auto px-4 mt-24">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">Don't take our word for it.</h2>
          <p className="mt-2 text-lg text-fd-muted-foreground">
            Edit the code and watch it run — live, in your browser. No install.
          </p>
        </div>
        <span className="font-outline text-secondary text-xl brutal-text-shadow brutal-shadow-sm self-start md:self-auto">
          Live
        </span>
      </div>

      <div
        className="relative w-full border-2 border-border brutal-shadow brutal-shadow-lg overflow-hidden"
        style={{ height: 505, background: dark ? '#121212' : '#fafafa' }}
      >
        {/* key={theme} forces the iframe to reload with the matching Snack theme */}
        <iframe
          key={theme}
          src={src}
          title="RN Neo live example"
          loading="lazy"
          className="w-full h-full block"
          style={{ border: 0 }}
        />

        {!active && (
          <button
            type="button"
            onClick={() => setActive(true)}
            aria-label="Activate interactive playground"
            className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px] cursor-pointer transition-colors hover:bg-black/20"
          >
            <span className="inline-flex items-center gap-2 bg-primary text-black border-2 border-border brutal-shadow px-5 py-2.5 font-bold">
              <Play className="size-4 fill-black" />
              Click to interact
            </span>
          </button>
        )}
      </div>
    </section>
  );
}
