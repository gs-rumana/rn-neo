import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { gitConfig } from '@/lib/shared';

export function FinalCta() {
  return (
    <section className="mt-28 px-4">
      <div className="container mx-auto bg-primary text-black border-2 border-border brutal-shadow brutal-shadow-lg px-6 py-14 text-center">
        <h2 className="text-3xl md:text-5xl font-bold">Build something loud.</h2>
        <p className="mt-3 text-lg text-black/70 max-w-xl mx-auto">
          Drop RN Neo into your next React Native app and ship a UI with attitude.
        </p>
        <div className="flex justify-center flex-wrap gap-4 mt-8">
          <Button
            asChild
            variant="noShadow"
            className="bg-black text-white border-2 border-border h-11 px-8"
          >
            <Link to="/docs">Get Started</Link>
          </Button>
          <Button
            asChild
            variant="noShadow"
            className="bg-card text-foreground border-2 border-border h-11 px-8"
          >
            <a
              href={`https://github.com/${gitConfig.user}/${gitConfig.repo}`}
              target="_blank"
              rel="noreferrer"
            >
              Star on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
