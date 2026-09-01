'use client';

import type Lenis from 'lenis';
import type { gsap as GsapType } from 'gsap';

import { setLenis } from '@/lib/lenis';

export type ScrollEngine = {
  gsap: typeof GsapType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ScrollTrigger: any;
  lenis: Lenis;
};

let pending: Promise<ScrollEngine> | null = null;

/**
 * Loads GSAP, ScrollTrigger and Lenis once, behind a dynamic import, and wires
 * them together. Both SmoothScroll and ConduitSpine await the same promise, so
 * there is a single Lenis instance and a single ticker.
 *
 * Under prefers-reduced-motion nothing here is ever called, so none of these
 * three libraries reach the browser at all — a real bundle saving, not just a
 * courtesy.
 *
 * Note on the integration: Lenis scrolls the window itself, so the correct
 * wiring is `lenis.on('scroll', ScrollTrigger.update)` plus driving lenis.raf
 * from the GSAP ticker. `ScrollTrigger.scrollerProxy` is for custom scroll
 * containers and would be wrong here.
 */
export function getScrollEngine(): Promise<ScrollEngine> {
  pending ??= init();
  return pending;
}

async function init(): Promise<ScrollEngine> {
  const [{ gsap }, scrollTriggerMod, lenisMod] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
    import('lenis'),
  ]);

  const { ScrollTrigger } = scrollTriggerMod;
  const LenisCtor = lenisMod.default;

  gsap.registerPlugin(ScrollTrigger);

  const lenis = new LenisCtor({
    duration: 1.05,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    // Native momentum on touch beats an emulated one on a mid-range Android.
    syncTouch: false,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time: number) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  setLenis(lenis);

  return { gsap, ScrollTrigger, lenis };
}
