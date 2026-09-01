'use client';

import { useEffect, useState } from 'react';

/**
 * Starts true so nothing animates before we know the user's preference — the
 * safe default is the static end state, not a motion-first guess.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return reduced;
}
