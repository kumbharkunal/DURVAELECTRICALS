'use client';

import { AnimatePresence, LazyMotion, m, type PanInfo } from 'motion/react';
import { Menu, Phone, X } from 'lucide-react';
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

/**
 * `domMax` rather than `domAnimation`.
 *
 * The mobile pill morphs into the menu by growing a single shell, which needs
 * layout projection — `domAnimation` does not carry it. The reason the brief
 * asked for `domAnimation` was to keep the full motion bundle out of first
 * load, and this still does: see lib/motionFeatures for why the split point
 * has to be its own module to actually produce a separate chunk.
 */
const loadFeatures = () => import('@/lib/motionFeatures').then((mod) => mod.default);

/** Tuple, not number[] — motion types the cubic-bezier as a fixed 4-tuple. */
const SOFT_CLOSE = [0.22, 0.85, 0.24, 1] as const;
const SPRING = { type: 'spring', stiffness: 260, damping: 30, mass: 0.9 } as const;
const CROSSFADE = { duration: 0.15, ease: 'linear' } as const;
const FOCUSABLE = 'a[href], button:not([disabled]), input, select, [tabindex]:not([tabindex="-1"])';

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

  /* Escape closes; focus is trapped inside the shell and returned on close.
     The trap scopes to the whole shell rather than a panel element, because
     the header row and the menu now live in the same box. */
  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== 'Tab') return;

      const shell = panelRef.current;
      if (!shell) return;

      const items = Array.from(shell.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null,
      );
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

  /* Swipe down to close. onPanEnd rather than a raw touch handler, so the
     gesture never fights the layout animation for control of the transform. */
  const onPanEnd = (_: PointerEvent, info: PanInfo) => {
    if (!open) return;
    if (info.offset.y > 60 || info.velocity.y > 500) close();
  };

  // Links stagger only once the shell has finished growing — starting them
  // during the morph makes both animations read as one smear.
  const listVariants = reduced
    ? { hidden: {}, shown: {}, exit: {} }
    : {
        hidden: {},
        shown: { transition: { delayChildren: 0.2, staggerChildren: 0.04 } },
        exit: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
      };

  const itemVariants = reduced
    ? { hidden: {}, shown: {}, exit: {} }
    : {
        hidden: { opacity: 0, y: 8 },
        shown: { opacity: 1, y: 0, transition: { duration: 0.4, ease: SOFT_CLOSE } },
        exit: { opacity: 0, y: 4, transition: { duration: 0.12 } },
      };

  return (
    <LazyMotion features={loadFeatures} strict>
      <header
        className={[
          'fixed inset-x-0 top-5 z-50 px-4',
          'transition-transform duration-300 ease-out',
          // Hides on scroll down, returns on scroll up — on both breakpoints.
          // Any upward scroll brings the hamburger straight back.
          hidden && !open ? '-translate-y-[150%]' : 'translate-y-0',
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

        {/* Mobile: ONE shell carrying both the header row and the menu.
            The menu mounts inside it and the shell's layout animation grows the
            box to fit — so the pill genuinely becomes the card, rather than a
            second card fading in on top of it. `overflow-hidden` clips the
            content while the box is still growing. */}
        <m.div
          ref={panelRef}
          layout
          transition={reduced ? CROSSFADE : SPRING}
          onPanEnd={onPanEnd}
          style={{ willChange: open ? 'transform' : 'auto' }}
          className={[
            SURFACE,
            'mx-auto w-full max-w-[30rem] overflow-hidden md:hidden',
            open ? 'u-glass-panel' : '',
          ].join(' ')}
        >
          {/* Header row. `layout="position"` keeps it pinned to the top of the
              shell instead of being stretched as the box grows. */}
          <m.div
            layout="position"
            transition={reduced ? CROSSFADE : SPRING}
            className={[
              'flex items-center gap-2 transition-[padding] duration-150',
              condensed && !open ? 'py-1.5 pr-1.5 pl-4' : 'py-2 pr-2 pl-4.5',
            ].join(' ')}
          >
            <a href="#top" onClick={close} className="min-w-0 flex-1" aria-label={`${business.name} — home`}>
              <Wordmark size="md" showDevanagari={!condensed || open} />
            </a>

            {/* Calling is the whole point of the site on a phone, so the gap
                carries the action — mirroring the desktop pill. */}
            <a
              href={business.phoneHref}
              data-call-cta
              aria-label={`Call ${business.phone}`}
              className="grid size-11 shrink-0 place-items-center rounded-full bg-live text-navy active:bg-[#63a314]"
            >
              <Phone aria-hidden="true" className="size-5" strokeWidth={2.25} />
            </a>

            {/* One button that swaps its glyph in place, rather than a separate
                close button in a separate panel — the control stays put while
                the box around it changes shape. */}
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid size-11 shrink-0 place-items-center rounded-full bg-navy/[0.07] text-navy active:bg-navy/[0.14]"
            >
              {open ? (
                <X aria-hidden="true" className="size-5" />
              ) : (
                <Menu aria-hidden="true" className="size-6" />
              )}
            </button>
          </m.div>

          <AnimatePresence initial={false}>
            {open ? (
              <m.div
                id="mobile-menu"
                variants={listVariants}
                initial="hidden"
                animate="shown"
                exit="exit"
                className="px-3 pb-3"
                style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom, 0px))' }}
              >
                <ul className="flex flex-col">
                  {navFull.map((item) => (
                    <m.li key={item.href} variants={itemVariants}>
                      <a
                        href={item.href}
                        onClick={close}
                        className="font-display flex min-h-11 items-center rounded-xl px-2 text-[1.0625rem] font-medium text-navy transition-colors duration-200 active:bg-navy/[0.06]"
                      >
                        {item.label}
                      </a>
                    </m.li>
                  ))}
                </ul>

                <m.div variants={itemVariants} className="px-2 pt-3">
                  <div className="h-px w-full bg-rule" />
                </m.div>

                <m.div variants={itemVariants} className="grid gap-2 px-2 pt-3">
                  <CallButton variant="bar" />
                  <WhatsAppButton variant="bar" />
                </m.div>
              </m.div>
            ) : null}
          </AnimatePresence>
        </m.div>
      </header>

      {/* Backdrop — tap to close. Plain CSS transition; no presence tracking. */}
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        inert={!open}
        onClick={close}
        className={[
          'fixed inset-0 z-40 cursor-default bg-navy/25 backdrop-blur-[2px] transition-opacity duration-200 md:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        ].join(' ')}
      />
    </LazyMotion>
  );
}
