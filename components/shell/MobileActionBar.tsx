'use client';

import { CallButton } from '@/components/ui/CallButton';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { useMenuOpen } from '@/lib/uiStore';

/**
 * The highest-value conversion element on the page, so it is built first and
 * nothing is allowed to overlap it: `body` carries a matching padding-bottom
 * (--action-bar-space in globals.css) which collapses to 0 at the md breakpoint.
 *
 * Hidden while the mobile menu is open — the menu carries its own Call and
 * WhatsApp actions, and two stacked bars would fight for the same thumb.
 */
export function MobileActionBar() {
  const menuOpen = useMenuOpen();

  return (
    <div
      className={[
        'fixed inset-x-0 bottom-0 z-40 md:hidden',
        'border-t border-navy/10 bg-paper/95 backdrop-blur-md',
        'transition-[opacity,transform] duration-200 ease-out',
        menuOpen
          ? 'pointer-events-none translate-y-full opacity-0'
          : 'translate-y-0 opacity-100',
      ].join(' ')}
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      inert={menuOpen}
    >
      <div className="grid grid-cols-2 gap-2 p-2">
        <CallButton variant="bar" label="Call" />
        <WhatsAppButton variant="bar" />
      </div>
    </div>
  );
}
