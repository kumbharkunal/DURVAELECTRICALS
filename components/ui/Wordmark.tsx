import { business } from '@/content/site';

type Size = 'sm' | 'md' | 'lg';

/**
 * The logo carries the brand here, not the type — it is the one asset the
 * client already owns and recognises — so it is set a step larger than the
 * wordmark beside it at every size.
 */
const sizes: Record<Size, { logo: string; name: string; devanagari: string }> = {
  sm: { logo: 'h-8', name: 'text-[1.0625rem]', devanagari: 'mt-0.5 text-micro' },
  md: { logo: 'h-10', name: 'text-[1.0625rem]', devanagari: 'mt-0.5 text-micro' },
  lg: { logo: 'h-11', name: 'text-[1.25rem]', devanagari: 'mt-1 text-[0.9375rem]' },
};

export function Wordmark({
  className = '',
  showDevanagari = true,
  size = 'sm',
}: {
  className?: string;
  showDevanagari?: boolean;
  size?: Size;
}) {
  const s = sizes[size];

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/logo.png"
        alt=""
        aria-hidden="true"
        className={`${s.logo} w-auto shrink-0 object-contain`}
      />

      <span className="flex min-w-0 flex-col leading-none">
        <span className={`font-display font-bold tracking-[-0.02em] text-navy ${s.name}`}>
          {business.name}
        </span>
        {showDevanagari ? (
          <span className={`font-devanagari font-semibold text-slate ${s.devanagari}`}>
            {business.wordmarkDevanagari}
          </span>
        ) : null}
      </span>
    </span>
  );
}
