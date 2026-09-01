export type Pt = { x: number; y: number };
export type Tick = { x1: number; y1: number; x2: number; y2: number };

const r2 = (n: number) => Math.round(n * 10) / 10;

function dist(a: Pt, b: Pt) {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

/** A point `d` px from `from` in the direction of `to`. */
function towards(from: Pt, to: Pt, d: number): Pt {
  const len = dist(from, to) || 1;
  return { x: from.x + ((to.x - from.x) * d) / len, y: from.y + ((to.y - from.y) * d) / len };
}

/** Drop consecutive duplicates so zero-length segments never reach the path. */
export function dedupe(points: Pt[]): Pt[] {
  const out: Pt[] = [];
  for (const p of points) {
    const last = out[out.length - 1];
    if (!last || Math.abs(last.x - p.x) > 0.5 || Math.abs(last.y - p.y) > 0.5) out.push(p);
  }
  return out;
}

/**
 * An orthogonal polyline with fixed-radius corners — conduit geometry, not a
 * bezier swoosh. Straight runs, 90° bends, one radius throughout, exactly the
 * way the runs in install-05 and og.jpg are dressed.
 */
export function orthogonalPath(points: Pt[], radius: number): string {
  const pts = dedupe(points);
  if (pts.length < 2) return '';

  const parts = [`M ${r2(pts[0].x)} ${r2(pts[0].y)}`];

  for (let i = 1; i < pts.length - 1; i += 1) {
    const prev = pts[i - 1];
    const cur = pts[i];
    const next = pts[i + 1];

    const rr = Math.min(radius, dist(prev, cur) / 2, dist(cur, next) / 2);
    if (rr < 0.5) {
      parts.push(`L ${r2(cur.x)} ${r2(cur.y)}`);
      continue;
    }

    const a = towards(cur, prev, rr);
    const b = towards(cur, next, rr);

    // Screen space is y-down, so a negative cross product is a left turn.
    const cross = (cur.x - prev.x) * (next.y - cur.y) - (cur.y - prev.y) * (next.x - cur.x);
    const sweep = cross < 0 ? 0 : 1;

    parts.push(`L ${r2(a.x)} ${r2(a.y)}`);
    parts.push(`A ${r2(rr)} ${r2(rr)} 0 0 ${sweep} ${r2(b.x)} ${r2(b.y)}`);
  }

  const last = pts[pts.length - 1];
  parts.push(`L ${r2(last.x)} ${r2(last.y)}`);
  return parts.join(' ');
}

/**
 * Saddle clamps at a constant pitch.
 *
 * Every segment is axis-aligned, so the perpendicular is free — no
 * getPointAtLength walk needed. Marks near a corner or a device are skipped,
 * the way you would not clamp right on a bend.
 */
export function clampTicks(
  points: Pt[],
  { pitch, radius, size, max = 90 }: { pitch: number; radius: number; size: number; max?: number },
): Tick[] {
  const pts = dedupe(points);
  const ticks: Tick[] = [];
  const clear = radius * 1.8;

  for (let i = 0; i < pts.length - 1 && ticks.length < max; i += 1) {
    const a = pts[i];
    const b = pts[i + 1];
    const len = dist(a, b);
    if (len < clear * 2 + pitch) continue;

    const vertical = Math.abs(b.x - a.x) < 0.5;

    for (let d = clear + pitch / 2; d < len - clear && ticks.length < max; d += pitch) {
      const p = towards(a, b, d);
      ticks.push(
        vertical
          ? { x1: p.x - size / 2, y1: p.y, x2: p.x + size / 2, y2: p.y }
          : { x1: p.x, y1: p.y - size / 2, x2: p.x, y2: p.y + size / 2 },
      );
    }
  }

  return ticks;
}
