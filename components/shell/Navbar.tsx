'use client';

import { LazyMotion, domAnimation, m } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { CallButton } from '@/components/ui/CallButton';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { Wordmark } from '@/components/ui/Wordmark';
import { business, navFull, navPrimary } from '@/content/site';
import { setMenuOpen } from '@/lib/uiStore';
import { startLenis, stopLenis } from '@/lib/lenis';
import { useActiveSection } from '@/lib/useActiveSection';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';

const SECTION_IDS = navPrimary.map((item) => item.href.slice(1));

/** Shared between the closed pill and the open panel so the morph lines up. */
const SURFACE = 'u-glass rounded-[1.75rem]';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const reduced = usePrefersReducedMotion();
  const active = useActiveSection(SECTION_IDS);

  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [indicator, setIndicator] = useState<{ x: number; w: number } | null>(null);

  useEffect(() => setMenuOpen(open), [open]);

  /* Condense after 80px; hide on scroll down, reveal on scroll up. */
  useEffect(() => {
    let last = window.scrollY;
    let travel = 0;
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        const delta = y - last;
        if (delta === 0) return;
        // Reset the accumulator on a direction change so the smooth-scroll
        // deceleration tail cannot flip the bar back open on its own.
        if (Math.sign(delta) !== Math.sign(travel)) travel = 0;
        travel += delta;

        setCondensed(y > 80);
        if (travel > 28 && y > 160) setHidden(true);
        else if (travel < -28) setHidden(false);
        last = y;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /* Active-item indicator. A 1px bar translated and scaled — transform only,
     which is why it is a hairline rule rather than a rounded pill background. */
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    if (!active) {
      setIndicator(null);
      return;
    }
    const item = list.querySelector<HTMLElement>(`[data-section="${active}"]`);
    if (!item) {
      setIndicator(null);
      return;
    }
    setIndicator({ x: item.offsetLeft, w: item.offsetWidth });
  }, [active]);

  const close = useCallback(() => setOpen(false), []);

  /* Body scroll lock AND lenis.stop(). Doing only one is the standard bug. */
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    stopLenis();
    return () => {
      document.body.style.overflow = previous;
      startLenis();
    };
  }, [open]);

  /* Focus trap, Escape, and focus restored to the hamburger on close. */
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;
    const trigger = triggerRef.current;

    const focusable = () =>
      Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, [tabindex]:not([tabindex="-1"])',
        ),
      );

    focusable()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== 'Tab') return;

      const items = focusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      trigger?.focus();
    };
  }, [open, close]);

  /* Swipe down on the panel to close. */
  const touchStart = useRef<number | null>(null);
  const onTouchStart = (event: React.TouchEvent) => {
    touchStart.current = (panelRef.current?.scrollTop ?? 0) <= 0 ? event.touches[0].clientY : null;
  };
  const onTouchMove = (event: React.TouchEvent) => {
    if (touchStart.current === null) return;
    if (event.touches[0].clientY - touchStart.current > 64) {
      touchStart.current = null;
      close();
    }
  };

  // Links stagger only after the container has settled. The panel container
  // itself is animated in CSS (.u-menu-panel), so nothing propagates down —
  // the list drives its own state.
  const listVariants = reduced
    ? { closed: {}, open: {} }
    : { closed: {}, open: { transition: { delayChildren: 0.18, staggerChildren: 0.04 } } };

  const itemVariants = reduced
    ? { closed: { opacity: 1 }, open: { opacity: 1 } }
    : { closed: { opacity: 0, y: 6 }, open: { opacity: 1, y: 0 } };

  return (
    <LazyMotion features={domAnimation} strict>
      <header
        className={[
          'fixed inset-x-0 top-5 z-50 px-4',
          'transition-transform duration-300 ease-out',
          // Mobile pill is always visible — the hamburger must always be reachable.
          // Desktop pill hides when scrolling down.
          hidden && !open ? 'md:-translate-y-[150%]' : 'translate-y-0',
        ].join(' ')}
      >
        {/* Desktop pill */}
        <nav
          aria-label="Primary"
          className={[
            SURFACE,
            'mx-auto hidden max-w-[45rem] items-center gap-6 md:flex',
            'transition-[padding,background-color] duration-200',
            condensed ? 'u-glass-dense py-1.5 pr-1.5 pl-5' : 'py-2.5 pr-2.5 pl-6',
          ].join(' ')}
        >
          <a href="#top" className="shrink-0" aria-label={`${business.name} — home`}>
            <Wordmark showDevanagari={!condensed} />
          </a>

          <ul ref={listRef} className="relative ml-auto flex items-center gap-1">
            {navPrimary.map((item) => {
              const id = item.href.slice(1);
              return (
                <li key={item.href} data-section={id}>
                  <a
                    href={item.href}
                    aria-current={active === id ? 'true' : undefined}
                    className={[
                      'text-body-sm block rounded-full px-3 py-2 font-medium transition-colors',
                      active === id ? 'text-navy' : 'text-slate hover:text-navy',
                    ].join(' ')}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}

            {indicator ? (
              <m.li
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-0 h-0.5 w-px origin-left bg-live"
                initial={false}
                animate={{ x: indicator.x, scaleX: indicator.w }}
                transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 38 }}
              />
            ) : null}
          </ul>

          <CallButton variant="compact" label="Call" className="shrink-0" />
        </nav>

        {/* Mobile: the pill stays mounted and the panel overlays it at the same
            position with the same surface, so the panel reads as the pill
            growing downward.

            The panel is always mounted and toggled by variant rather than by
            AnimatePresence: its staggered children are variant-driven with no
            exit variant to resolve, which left AnimatePresence waiting forever
            and the panel stuck in the DOM at opacity 0. Keeping it mounted also
            keeps the hamburger ref valid for focus restoration. */}
        <div className="relative mx-auto max-w-[30rem] md:hidden">
          <div
            inert={open}
            className={[
              SURFACE,
              'flex items-center justify-between transition-[padding] duration-150',
              condensed ? 'u-glass-dense py-1 pr-1 pl-3' : 'py-1.5 pr-1.5 pl-4',
            ].join(' ')}
          >
            <a href="#top" aria-label={`${business.name} — home`}>
              <Wordmark showDevanagari={!condensed} />
            </a>
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-haspopup="dialog"
              className="grid size-11 shrink-0 place-items-center rounded-full text-navy"
            >
              <Menu aria-hidden="true" className="size-6" />
              <span className="sr-only">Open menu</span>
            </button>
          </div>

          <div
            ref={panelRef}
            inert={!open}
            data-open={open}
            className={[
              SURFACE,
              'u-glass-panel u-menu-panel absolute inset-x-0 top-0 max-h-[calc(100dvh-3.5rem)] overflow-y-auto p-2',
              'will-change-[transform,opacity]',
              open
                ? 'pointer-events-auto opacity-100 motion-safe:translate-y-0 motion-safe:scale-y-100'
                : 'pointer-events-none opacity-0 motion-safe:scale-y-[0.6]',
            ].join(' ')}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            role="dialog"
            aria-modal={open}
            aria-label="Menu"
          >
            <div className="flex items-center justify-between pt-1 pr-1 pl-3">
              <Wordmark />
              <button
                type="button"
                onClick={close}
                className="grid size-11 place-items-center rounded-full text-navy"
              >
                <X aria-hidden="true" className="size-5" />
                <span className="sr-only">Close menu</span>
              </button>
            </div>

            <m.ul
              className="mt-2 px-1"
              initial={false}
              animate={open ? 'open' : 'closed'}
              variants={listVariants}
            >
              {navFull.map((item) => (
                <m.li key={item.href} variants={itemVariants}>
                  <a
                    href={item.href}
                    onClick={close}
                    className="font-display block border-b border-rule py-3 text-[1.0625rem] font-medium text-navy"
                  >
                    {item.label}
                  </a>
                </m.li>
              ))}
            </m.ul>

            <div
              className="mt-4 grid gap-2 px-1 pb-1"
              style={{ paddingBottom: 'max(0.25rem, env(safe-area-inset-bottom, 0px))' }}
            >
              <CallButton variant="bar" />
              <WhatsAppButton variant="bar" />
            </div>
          </div>
        </div>
      </header>

      {/* Backdrop — tap to close. Plain CSS transition; no presence tracking. */}
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        inert={!open}
        onClick={close}
        className={[
          'fixed inset-0 z-40 cursor-default bg-navy/25 transition-opacity duration-200 md:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        ].join(' ')}
      />
    </LazyMotion>
  );
}
