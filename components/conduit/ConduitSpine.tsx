'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { clampTicks, orthogonalPath, type Pt, type Tick } from './buildPath';
import {
  DistributionBoardGlyph,
  McbGlyph,
  RcboGlyph,
  SocketGlyph,
  Type2Glyph,
} from '@/components/icons/schematic';
import { getScrollEngine } from '@/lib/scrollEngine';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';

/**
 * The signature moment: a single-line schematic of the circuit the visitor is
 * buying, running from the distribution board in the hero to the Type 2
 * connector at the contact section.
 *
 * One SVG, one path, one ScrollTrigger. The path is generated from measured DOM
 * positions rather than hand-authored, so it cannot drift from the layout.
 * Costs ~3.5KB gzipped and adds no dependency.
 */

type JunctionKind = 'db' | 'mcb' | 'rcbo' | 'fault' | 'type2' | 'step';

type Junction = { key: string; kind: JunctionKind; x: number; y: number; at: number };

const GLYPHS: Record<Exclude<JunctionKind, 'step'>, React.ComponentType<{ className?: string }>> = {
  db: DistributionBoardGlyph,
  mcb: McbGlyph,
  rcbo: RcboGlyph,
  fault: SocketGlyph,
  type2: Type2Glyph,
};

const PULSE_LENGTH = 96;

function kindOf(value: string): JunctionKind {
  if (value.startsWith('step-')) return 'step';
  if (value === 'db' || value === 'mcb' || value === 'rcbo' || value === 'fault' || value === 'type2') {
    return value;
  }
  return 'step';
}

export function ConduitSpine() {
  const reduced = usePrefersReducedMotion();

  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const pulseRef = useRef<SVGPathElement>(null);

  const [geometry, setGeometry] = useState<{
    d: string;
    ticks: Tick[];
    junctions: Junction[];
    height: number;
    width: number;
    desktop: boolean;
  } | null>(null);

  const [lit, setLit] = useState(0);

  /** Measure the page and rebuild the path. */
  const measure = useCallback(() => {
    const container = document.querySelector<HTMLElement>('.u-container');
    if (!container) return;

    const desktop = window.innerWidth >= 1024;
    const rect = container.getBoundingClientRect();
    const padLeft = parseFloat(getComputedStyle(container).paddingLeft) || 0;
    const contentLeft = rect.left + padLeft;

    const railX = desktop ? Math.max(24, contentLeft - 46) : 8;
    const jog = desktop ? 22 : 6;
    const radius = desktop ? 11 : 6;
    const height = document.documentElement.scrollHeight;

    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-junction]'));
    if (nodes.length === 0) return;

    const anchors = nodes.map((el, i) => {
      const box = el.getBoundingClientRect();
      return {
        key: el.dataset.junction ?? `j-${i}`,
        kind: kindOf(el.dataset.junction ?? ''),
        y: box.top + window.scrollY + Math.min(56, box.height / 2),
      };
    });

    // Alternating x keeps the run genuinely orthogonal — real 90° bends between
    // sections rather than one straight line pretending to be conduit.
    const points: Pt[] = [{ x: railX, y: Math.max(0, anchors[0].y - 150) }];
    const junctions: Junction[] = [];
    let currentX = railX;

    anchors.forEach((anchor, i) => {
      const targetX = i % 2 === 0 ? railX : railX + jog;
      if (targetX !== currentX) {
        points.push({ x: currentX, y: anchor.y - 46 });
        points.push({ x: targetX, y: anchor.y - 46 });
        currentX = targetX;
      }
      points.push({ x: currentX, y: anchor.y });
      junctions.push({ key: anchor.key, kind: anchor.kind, x: currentX, y: anchor.y, at: 0 });
    });

    // Not querySelector('footer') — each review's attribution is a <footer>
    // scoped to its blockquote, and that would stop the run at the reviews.
    const footer = document.querySelector('[data-site-footer]');
    const footerTop = footer
      ? footer.getBoundingClientRect().top + window.scrollY
      : height;
    points.push({
      x: currentX,
      y: Math.min(anchors[anchors.length - 1].y + 160, footerTop - 32),
    });

    const d = orthogonalPath(points, radius);
    const ticks = clampTicks(points, {
      pitch: desktop ? 52 : 40,
      radius,
      size: desktop ? 11 : 5,
    });

    setGeometry({ d, ticks, junctions, height, width: window.innerWidth, desktop });
  }, []);

  /* Measure on mount, on resize, and once fonts have settled — a font swap
     changes layout and is the classic cause of a spine that lines up in dev
     and not in production. */
  useEffect(() => {
    let frame = 0;
    let timer: number | undefined;

    const schedule = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(measure);
      }, 120);
    };

    measure();

    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    document.fonts?.ready.then(schedule).catch(() => {});

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [measure]);

  /* Normalised position of each junction along the path, for lighting. */
  const stops = useRef<number[]>([]);
  useEffect(() => {
    const path = pathRef.current;
    if (!path || !geometry) return;

    const total = path.getTotalLength();
    if (!total) return;

    // Walk the path once and record where it passes closest to each junction.
    const samples = 240;
    const best = geometry.junctions.map(() => ({ dist: Infinity, at: 0 }));

    for (let i = 0; i <= samples; i += 1) {
      const at = i / samples;
      const p = path.getPointAtLength(total * at);
      geometry.junctions.forEach((j, index) => {
        const d = Math.hypot(p.x - j.x, p.y - j.y);
        if (d < best[index].dist) best[index] = { dist: d, at };
      });
    }

    stops.current = best.map((b) => b.at);
  }, [geometry]);

  /* Draw and pulse — driven directly by Lenis scroll events.
     Bypasses ScrollTrigger entirely so there is no intermediate scrub lag.
     Lenis fires 'scroll' with itself as the argument; .progress is scroll/limit
     already clamped to [0, 1]. */
  useEffect(() => {
    const path = pathRef.current;
    const pulse = pulseRef.current;
    if (!path || !pulse || !geometry) return;

    const total = path.getTotalLength();
    if (!total) return;

    path.style.strokeDasharray = `${total}`;
    pulse.style.strokeDasharray = `${PULSE_LENGTH} ${total + PULSE_LENGTH}`;
    pulse.style.strokeDashoffset = `${PULSE_LENGTH}`;

    // Static end state under reduced motion: fully drawn, no pulse, all lit.
    if (reduced) {
      path.style.strokeDashoffset = '0';
      pulse.style.opacity = '0';
      setLit(geometry.junctions.length);
      return;
    }

    path.style.strokeDashoffset = `${total}`;

    let cancelled = false;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let lenisInstance: any = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let boundHandler: ((l: any) => void) | null = null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const applyProgress = (progress: number) => {
      path.style.strokeDashoffset = `${total * (1 - progress)}`;
      // Pulse rides just behind the draw head — board to charger only.
      pulse.style.strokeDashoffset = `${PULSE_LENGTH - total * progress}`;
      let count = 0;
      for (const at of stops.current) if (progress >= at) count += 1;
      setLit(count);
    };

    getScrollEngine().then(({ lenis }) => {
      if (cancelled) return;

      lenisInstance = lenis;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      boundHandler = (l: any) => {
        applyProgress(typeof l?.progress === 'number' ? l.progress : 0);
      };

      lenis.on('scroll', boundHandler);

      // Sync to wherever the user already is (page might not be at top).
      applyProgress(typeof lenis.progress === 'number' ? lenis.progress : 0);
    });

    return () => {
      cancelled = true;
      if (lenisInstance && boundHandler) {
        lenisInstance.off('scroll', boundHandler);
      }
    };
  }, [geometry, reduced]);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 z-30 select-none"
      style={{ height: geometry?.height ?? 0 }}
    >
      {geometry ? (
        <>
          <svg
            width="100%"
            height={geometry.height}
            viewBox={`0 0 ${geometry.width} ${geometry.height}`}
            fill="none"
            className="absolute inset-0"
            preserveAspectRatio="none"
          >
            {/* Undrawn conduit — the run that is always there. */}
            <path
              d={geometry.d}
              stroke="var(--color-rule)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Saddle clamps at a constant pitch. */}
            <g stroke="var(--color-rule)" strokeWidth="2" strokeLinecap="round">
              {geometry.ticks.map((t, i) => (
                <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} />
              ))}
            </g>
            {/* The drawn run. */}
            <path
              ref={pathRef}
              d={geometry.d}
              stroke="var(--color-navy)"
              strokeOpacity="0.55"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Live current. The only green that moves on this page. */}
            <path
              ref={pulseRef}
              d={geometry.d}
              stroke="var(--color-live)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {geometry.junctions.map((junction, i) => {
            const isLit = i < lit;
            const Glyph =
              geometry.desktop && junction.kind !== 'step' ? GLYPHS[junction.kind] : null;
            const fault = junction.kind === 'fault';

            return (
              <div
                key={`${junction.key}-${i}`}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: junction.x, top: junction.y }}
              >
                {Glyph ? (
                  <span
                    className={[
                      'grid size-8 place-items-center rounded-full border bg-paper transition-colors duration-300 lg:size-9',
                      fault
                        ? 'border-earth/60 text-earth'
                        : isLit
                          ? 'border-live text-live-ink'
                          : 'border-rule text-slate',
                    ].join(' ')}
                  >
                    <Glyph className="size-4.5 lg:size-5" />
                  </span>
                ) : (
                  <span
                    className={[
                      'block size-2.5 rounded-full border-2 bg-paper transition-colors duration-300',
                      isLit ? 'border-live' : 'border-rule',
                    ].join(' ')}
                  />
                )}
              </div>
            );
          })}
        </>
      ) : null}
    </div>
  );
}
