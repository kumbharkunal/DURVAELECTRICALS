import { ConduitSpine } from '@/components/conduit/ConduitSpine';
import { DesktopWhatsApp } from '@/components/shell/DesktopWhatsApp';
import { Navbar } from '@/components/shell/Navbar';
import { SmoothScroll } from '@/components/shell/SmoothScroll';

import { Brands } from '@/components/sections/Brands';
import { Contact } from '@/components/sections/Contact';
import { Faq } from '@/components/sections/Faq';
import { Gallery } from '@/components/sections/Gallery';
import { Hero } from '@/components/sections/Hero';
import { Pricing } from '@/components/sections/Pricing';
import { Process } from '@/components/sections/Process';
import { ProblemSocket } from '@/components/sections/ProblemSocket';
import { ProperInstall } from '@/components/sections/ProperInstall';
import { Reviews } from '@/components/sections/Reviews';
import { ServiceAreas } from '@/components/sections/ServiceAreas';
import { Services } from '@/components/sections/Services';
import { SiteFooter } from '@/components/sections/SiteFooter';
import { TrustStrip } from '@/components/sections/TrustStrip';

import { buildSchema } from '@/lib/schema';

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // Built from content/site.ts and content/demo.ts. Review markup is
        // suppressed while DEMO_MODE is true — see lib/schema.ts.
        dangerouslySetInnerHTML={{ __html: buildSchema() }}
      />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-live focus:px-5 focus:py-3 focus:font-semibold focus:text-navy"
      >
        Skip to content
      </a>

      <div
        aria-hidden="true"
        className="schematic-grid pointer-events-none fixed inset-0 -z-10"
      />

      <SmoothScroll />
      <ConduitSpine />
      <Navbar />

      <main id="main" className="relative">
        <div id="top" />
        <Hero />
        <TrustStrip />
        <ProblemSocket />
        <ProperInstall />
        <Services />
        <Pricing />
        <Brands />
        <Gallery />
        <Reviews />
        <Process />
        <ServiceAreas />
        <Faq />
        <Contact />
      </main>

      <SiteFooter />
      <DesktopWhatsApp />
    </>
  );
}
