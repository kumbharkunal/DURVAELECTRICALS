'use client';

import { useEffect, useState } from 'react';

/**
 * Tracks which anchored section is currently in view, for the nav indicator.
 *
 * IntersectionObserver rather than ScrollTrigger, deliberately: the indicator
 * then works before GSAP has finished loading, and it keeps working under
 * prefers-reduced-motion, where GSAP is never imported at all.
 */
export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (targets.length === 0) return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        let best: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }
        setActive(bestRatio > 0 ? best : null);
      },
      {
        // Ignore the band behind the floating pill, and favour the upper half.
        rootMargin: '-96px 0px -45% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    for (const target of targets) observer.observe(target);
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
