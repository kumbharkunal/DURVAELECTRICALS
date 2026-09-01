import { business } from '@/content/site';

export function Wordmark({
  className = '',
  showDevanagari = true,
  size = 'sm',
}: {
  className?: string;
  showDevanagari?: boolean;
  size?: 'sm' | 'lg';
}) {
  const hClass = size === 'lg' ? 'h-9' : 'h-7';

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/logo.png"
        alt=""
        aria-hidden="true"
        className={`${hClass} w-auto shrink-0 object-contain`}
      />

      <span className="flex flex-col leading-none">
        <span
          className={`font-display font-bold tracking-[-0.02em] text-navy ${
            size === 'lg' ? 'text-[1.25rem]' : 'text-[1.0625rem]'
          }`}
        >
          {business.name}
        </span>
        {showDevanagari ? (
          <span
            className={`font-devanagari font-semibold text-slate ${
              size === 'lg' ? 'mt-1 text-[0.9375rem]' : 'mt-0.5 text-micro'
            }`}
          >
            {business.wordmarkDevanagari}
          </span>
        ) : null}
      </span>
    </span>
  );
}
