import { Phone } from 'lucide-react';

import { business } from '@/content/site';

type Variant = 'primary' | 'compact' | 'bar';

const base =
  'inline-flex items-center justify-center gap-2 font-display font-semibold ' +
  'transition-colors duration-150 select-none';

/**
 * Navy on --live measures 6.00:1. White on --live is 2.48:1 and must never be
 * used — the label on a green surface is always navy.
 */
const variants: Record<Variant, string> = {
  primary:
    'bg-live text-navy hover:bg-[#7cc61d] rounded-full px-6 min-h-[3rem] text-[1.0625rem] tracking-[-0.01em]',
  compact:
    'bg-live text-navy hover:bg-[#7cc61d] rounded-full px-4 min-h-[2.25rem] text-[0.9375rem]',
  bar: 'bg-live text-navy active:bg-[#63a314] rounded-lg px-4 min-h-[3.25rem] text-[1.0625rem]',
};

export function CallButton({
  variant = 'primary',
  label,
  className = '',
}: {
  variant?: Variant;
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={business.phoneHref}
      className={`${base} ${variants[variant]} ${className}`}
      data-call-cta
    >
      <Phone aria-hidden="true" className="size-[1.15em] shrink-0" strokeWidth={2.25} />
      <span>{label ?? `Call ${business.phoneDisplayShort}`}</span>
    </a>
  );
}
