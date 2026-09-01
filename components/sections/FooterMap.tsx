'use client';

import { MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

import { business } from '@/content/site';

const query = encodeURIComponent(business.mapQuery);
const EMBED = `https://maps.google.com/maps?q=${query}&z=14&output=embed`;
const DIRECTIONS = `https://www.google.com/maps/search/?api=1&query=${query}`;

/**
 * A Google Maps embed pulls roughly a megabyte across several requests and
 * runs its own scripts, so it is held back until two seconds after the window
 * load event — not two seconds after mount. Anchoring to load is what keeps it
 * off the critical path entirely: it cannot compete with the hero image for
 * bandwidth, and it cannot land inside the window where LCP is decided.
 *
 * The frame is a fixed height at every breakpoint, so the space is reserved
 * from first paint and the swap costs no layout shift.
 */
export function FooterMap() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timer: number;
    const start = () => {
      timer = window.setTimeout(() => setShow(true), 2000);
    };

    if (document.readyState === 'complete') {
      start();
      return () => window.clearTimeout(timer);
    }

    window.addEventListener('load', start, { once: true });
    return () => {
      window.removeEventListener('load', start);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <section className="mt-14" aria-labelledby="footer-map-heading">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h2 id="footer-map-heading" className="font-display text-h4 font-semibold">
          Where we are
        </h2>
        <a
          href={DIRECTIONS}
          target="_blank"
          rel="noopener noreferrer"
          className="text-body-sm text-paper/75 underline-offset-4 hover:text-paper hover:underline"
        >
          Get directions
        </a>
      </div>

      <p className="text-body-sm mt-2 text-paper/60">{business.addressLine}</p>

      <div className="mt-5 h-64 overflow-hidden rounded-xl border border-paper/15 bg-paper/5 md:h-72">
        {show ? (
          <iframe
            title={`Map showing ${business.name} in ${business.address.locality}`}
            src={EMBED}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="size-full border-0"
          />
        ) : (
          <div className="grid size-full place-items-center text-paper/40">
            <MapPin aria-hidden="true" className="size-7" />
            <span className="sr-only">Map loading</span>
          </div>
        )}
      </div>
    </section>
  );
}
