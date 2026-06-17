import type { Route } from './+types/home';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { appName, siteTagline, siteDescription, siteUrl, ogImage } from '@/lib/shared';
import { Hero } from '@/components/landing/Hero';
import { Playground } from '@/components/landing/Playground';
import { Features } from '@/components/landing/Features';
import { Install } from '@/components/landing/Install';
import { FinalCta } from '@/components/landing/FinalCta';
import { Footer } from '@/components/landing/Footer';

export function meta({}: Route.MetaArgs) {
  const title = `${appName} — ${siteTagline}`;
  return [
    { title },
    { name: 'description', content: siteDescription },
    { tagName: 'link', rel: 'canonical', href: siteUrl },
    { name: 'theme-color', content: '#a3e635' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: appName },
    { property: 'og:title', content: title },
    { property: 'og:description', content: siteDescription },
    { property: 'og:url', content: siteUrl },
    { property: 'og:image', content: ogImage },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: siteDescription },
    { name: 'twitter:image', content: ogImage },
  ];
}

export default function Home() {
  return (
    <HomeLayout {...baseOptions()} className="overflow-x-hidden">
      <Hero />
      <Playground />
      <Features />
      <Install />
      <FinalCta />
      <Footer />
    </HomeLayout>
  );
}
