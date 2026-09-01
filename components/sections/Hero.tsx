import { CallButton } from '@/components/ui/CallButton';
import { Figure } from '@/components/ui/Figure';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { hero } from '@/content/site';

/**
 * Callouts on the hero photograph, set like a drawing rather than a product
 * shot. Positions are percentages of the image box, chosen against empty wall
 * in hero-install.webp. Hidden below md — at 390px they would be clutter.
 */
const callouts = [
  {
    id: 'enclosure',
    label: 'The enclosure: MCB and RCBO',
    // dot on the white enclosure, label above it on empty wall
    dot: { left: '14%', top: '26%' },
    label_: { left: '4.5%', top: '7%' },
    leader: 'M 9.5 12 L 9.5 20 L 13.4 25.5',
    xlOnly: false,
  },
  {
    id: 'conduit',
    label: 'Cable sized in sq mm, clamped',
    dot: { left: '16.5%', top: '43%' },
    label_: { left: '4.5%', top: '58%' },
    leader: 'M 11 55 L 11 47 L 15.9 43.6',
    xlOnly: false,
  },
  {
    id: 'point',
    label: 'The charge point',
    dot: { left: '33%', top: '31%' },
    label_: { left: '38%', top: '13%' },
    leader: 'M 42 17.5 L 36 17.5 L 33.4 30',
    xlOnly: true,
  },
] as const;

export function Hero() {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24" aria-labelledby="hero-heading">
      <div className="u-container">
        <h1
          id="hero-heading"
          className="text-display-1 font-display u-measure text-navy"
        >
          {hero.headline}
          <span className="block text-slate">{hero.headlineRest}</span>
        </h1>

        <p className="text-lead u-measure-lead mt-7 text-navy">{hero.lead}</p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <CallButton variant="primary" className="w-full sm:w-auto" />
          <WhatsAppButton variant="outline" className="w-full sm:w-auto" />
        </div>

        <p className="text-body-sm mt-5 text-slate">
          Site visit same day or next day. You get a fixed number in writing before
          anyone drills anything.
        </p>
      </div>

      {/* The conduit spine's first junction sits on this element, so the drawn
          line appears to leave the conduit inside the photograph. */}
      <div className="u-container mt-12 md:mt-16">
        <div className="relative" data-junction="db">
          <div className="overflow-hidden bg-wall">
            <Figure
              src="/images/hero-install.webp"
              alt={hero.imageAlt}
              width={1536}
              height={1024}
              sizes="(min-width: 1280px) 1100px, (min-width: 768px) 92vw, 100vw"
              priority
            />
          </div>

          {/* Annotation overlay — hairline leaders, no fills, no shadows. */}
          <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              fill="none"
            >
              {callouts.map((c) => (
                <path
                  key={c.id}
                  d={c.leader}
                  stroke="#12293D"
                  strokeOpacity="0.55"
                  strokeWidth="0.18"
                  vectorEffect="non-scaling-stroke"
                  className={c.xlOnly ? 'hidden xl:block' : undefined}
                />
              ))}
            </svg>

            {callouts.map((c) => (
              <div key={c.id} className={c.xlOnly ? 'hidden xl:block' : undefined}>
                <span
                  className="absolute size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-navy"
                  style={{ left: c.dot.left, top: c.dot.top }}
                />
                <span
                  className="text-micro absolute whitespace-nowrap bg-paper/85 px-1.5 py-0.5 font-medium text-navy"
                  style={{ left: c.label_.left, top: c.label_.top }}
                >
                  {c.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
