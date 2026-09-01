'use client';

import { useEffect } from 'react';

import { getScrollEngine } from '@/lib/scrollEngine';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';

/**
 * Renders nothing — it just brings the scroll engine up.
 *
 * Disabled entirely under prefers-reduced-motion, where neither Lenis nor GSAP
 * is loaded. The engine is a singleton for the lifetime of the page, so there
 * is deliberately no teardown here: destroying it on effect cleanup would break
 * under React's double-invoked effects in development.
 */
export function SmoothScroll() {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    void getScrollEngine();
  }, [reduced]);

  return null;
}
