/**
 * Electrical glyphs, drawn in the page's schematic register.
 *
 * Lucide has no accurate equivalent for any of these, and approximating a
 * distribution board or an RCBO with a generic "zap" icon is exactly the
 * genericism this page exists to avoid. All stroke-based, all currentColor,
 * all on a 24x24 grid so they line up with the conduit spine.
 */

export type GlyphProps = {
  className?: string;
  strokeWidth?: number;
};

function Frame({
  children,
  className,
  strokeWidth = 1.5,
}: GlyphProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

/** Enclosure with a DIN rail and three devices on it. */
export function DistributionBoardGlyph(props: GlyphProps) {
  return (
    <Frame {...props}>
      <rect x="3" y="3.5" width="18" height="17" rx="1.5" />
      <path d="M6 11.5h12" />
      <rect x="7" y="8" width="2.6" height="7" rx="0.5" />
      <rect x="10.7" y="8" width="2.6" height="7" rx="0.5" />
      <rect x="14.4" y="8" width="2.6" height="7" rx="0.5" />
    </Frame>
  );
}

/** Miniature circuit breaker: DIN body, toggle, terminals top and bottom. */
export function McbGlyph(props: GlyphProps) {
  return (
    <Frame {...props}>
      <rect x="7.5" y="5" width="9" height="14" rx="1.2" />
      <path d="M12 5V2.5M12 19v2.5" />
      <path d="M9.8 9.2l4.4 5.6" />
      <path d="M9.8 9.2h1.6" />
    </Frame>
  );
}

/** RCBO: same body, plus the residual-current loop and the test button. */
export function RcboGlyph(props: GlyphProps) {
  return (
    <Frame {...props}>
      <rect x="7.5" y="5" width="9" height="14" rx="1.2" />
      <path d="M12 5V2.5M12 19v2.5" />
      <circle cx="12" cy="11" r="2.6" />
      <path d="M12 8.4v5.2" />
      <rect x="10.6" y="15.6" width="2.8" height="1.8" rx="0.5" />
    </Frame>
  );
}

/** Standard earth symbol. */
export function EarthGlyph(props: GlyphProps) {
  return (
    <Frame {...props}>
      <path d="M12 3v9" />
      <path d="M5 12h14" />
      <path d="M7.8 15.6h8.4" />
      <path d="M10.4 19.2h3.2" />
    </Frame>
  );
}

/** Type 2 (Mennekes) connector face: flat top, five power pins, two signal. */
export function Type2Glyph(props: GlyphProps) {
  return (
    <Frame {...props}>
      <path d="M4.5 9.5h15a8 8 0 1 1-15 0Z" />
      <circle cx="8.4" cy="13.4" r="1.5" />
      <circle cx="15.6" cy="13.4" r="1.5" />
      <circle cx="12" cy="17.6" r="1.5" />
    </Frame>
  );
}

/** Ordinary 3-pin wall socket — the thing the page argues against charging from. */
export function SocketGlyph(props: GlyphProps) {
  return (
    <Frame {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <circle cx="12" cy="9" r="1.45" />
      <circle cx="9" cy="14.6" r="1.25" />
      <circle cx="15" cy="14.6" r="1.25" />
    </Frame>
  );
}

/** Multi-pole isolator: blades open, terminals dotted. */
export function IsolatorGlyph(props: GlyphProps) {
  return (
    <Frame {...props}>
      <path d="M6 3v5M6 21v-5M12 3v5M12 21v-5M18 3v5M18 21v-5" />
      <path d="M6 8.4l3.2 6M12 8.4l3.2 6M18 8.4l3.2 6" />
    </Frame>
  );
}

/** Saddle clamp, as used every 300 mm along a conduit run. */
export function ClampGlyph(props: GlyphProps) {
  return (
    <Frame {...props}>
      <path d="M7 16v-3a5 5 0 0 1 10 0v3" />
      <path d="M3.5 16h5.5M15 16h5.5" />
      <circle cx="5.6" cy="16" r="0.75" />
      <circle cx="18.4" cy="16" r="0.75" />
    </Frame>
  );
}

/** Conduit run: a clamped orthogonal bend. The page's own motif. */
export function ConduitGlyph(props: GlyphProps) {
  return (
    <Frame {...props}>
      <path d="M6 21V11a4 4 0 0 1 4-4h8" />
      <path d="M3 17h6M3 13h6" />
      <path d="M15 4.5v5" />
    </Frame>
  );
}
