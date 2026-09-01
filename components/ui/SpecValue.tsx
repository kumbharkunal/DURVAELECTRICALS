/**
 * The only component in the codebase that applies IBM Plex Mono.
 *
 * Mono is semantically correct for genuine tabular engineering figures — kW,
 * amperes, sq mm, MCB/RCBO ratings, rupee amounts — inside the spec list, the
 * pricing table and the charger comparison. It is not a decorative face: no
 * mono eyebrows, timestamps or section numbers anywhere on this page.
 */
export function SpecValue({
  children,
  size = 'sm',
  className = '',
}: {
  children: React.ReactNode;
  size?: 'sm' | 'lg';
  className?: string;
}) {
  return (
    <span
      className={[
        'font-mono font-medium tabular-nums',
        size === 'lg' ? 'text-spec-lg' : 'text-spec',
        className,
      ].join(' ')}
    >
      {children}
    </span>
  );
}
