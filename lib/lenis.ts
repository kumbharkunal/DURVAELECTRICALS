import type Lenis from 'lenis';

/**
 * Module-level handle on the single Lenis instance.
 *
 * The mobile menu needs to call stop()/start() on open and close. Locking body
 * scroll without also stopping Lenis is the standard bug — the page keeps
 * scrolling underneath the open menu.
 */
let instance: Lenis | null = null;

export function setLenis(next: Lenis | null) {
  instance = next;
}

export function stopLenis() {
  instance?.stop();
}

export function startLenis() {
  instance?.start();
}
