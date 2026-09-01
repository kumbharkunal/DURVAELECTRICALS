import { business } from '@/content/site';
import { WhatsAppGlyph } from '@/components/icons/WhatsAppGlyph';

type Variant = 'outline' | 'bar' | 'floating';

const base =
  'inline-flex items-center justify-center gap-2 font-display font-semibold ' +
  'transition-colors duration-150 select-none';

/**
 * Deliberately not a second green slab. The WhatsApp brand green appears only
 * in the official glyph, so it never competes with --live, which on this page
 * means one thing: live current.
 */
const variants: Record<Variant, string> = {
  outline:
    'rounded-full px-6 min-h-[3rem] text-[1.0625rem] tracking-[-0.01em] ' +
    'border border-navy/20 bg-paper text-navy hover:bg-mist hover:border-navy/35',
  bar:
    'rounded-lg px-4 min-h-[3.25rem] text-[1.0625rem] ' +
    'border border-navy/20 bg-paper text-navy active:bg-mist',
  floating:
    'rounded-full size-14 border border-navy/15 bg-paper text-navy shadow-[0_4px_16px_-4px_rgb(18_41_61/0.25)] hover:bg-mist',
};

export function WhatsAppButton({
  variant = 'outline',
  label = 'WhatsApp',
  className = '',
}: {
  variant?: Variant;
  label?: string;
  className?: string;
}) {
  const iconOnly = variant === 'floating';

  return (
    <a
      href={business.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={iconOnly ? `Message ${business.name} on WhatsApp` : undefined}
      className={`${base} ${variants[variant]} ${className}`}
    >
      <WhatsAppGlyph className={iconOnly ? 'size-7' : 'size-[1.2em] shrink-0'} />
      {iconOnly ? null : <span>{label}</span>}
    </a>
  );
}
