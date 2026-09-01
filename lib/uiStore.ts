'use client';

import { useSyncExternalStore } from 'react';

/**
 * Tiny shared UI state. The mobile menu and the bottom action bar are siblings
 * in different trees, and the bar must hide while the menu is open — this is
 * cheaper than wrapping the whole page in a context provider.
 */

let menuOpen = false;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function setMenuOpen(next: boolean) {
  if (menuOpen === next) return;
  menuOpen = next;
  emit();
}

export function useMenuOpen(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => menuOpen,
    () => false,
  );
}
