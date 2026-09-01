import { Figure } from '@/components/ui/Figure';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SpecValue } from '@/components/ui/SpecValue';
import { included } from '@/content/site';
import {
  ClampGlyph,
  ConduitGlyph,
  DistributionBoardGlyph,
  EarthGlyph,
  IsolatorGlyph,
  RcboGlyph,
  Type2Glyph,
} from '@/components/icons/schematic';

/** One glyph per step, in circuit order. No repeats. */
const glyphs = [
  DistributionBoardGlyph,
  RcboGlyph,
  ConduitGlyph,
  EarthGlyph,
  ClampGlyph,
  Type2Glyph,
  IsolatorGlyph,
];

export function ProperInstall() {
  return (
    <section
      id={included.id}
      data-junction="mcb"
      className="scroll-mt-28 border-y border-rule bg-mist py-20 md:py-28"
      aria-labelledby="included-heading"
    >
      <div className="u-container">
        <div id="included-heading">
          <SectionHeading lead={included.lead}>{included.heading}</SectionHeading>
        </div>

        <div className="mt-12 grid gap-12 md:mt-16 lg:grid-cols-[1fr_20rem] lg:gap-16">
          <ol className="border-t border-rule">
            {included.steps.map((step, i) => {
              const Glyph = glyphs[i] ?? ClampGlyph;
              return (
                <li
                  key={step.title}
                  className="grid grid-cols-[2rem_1fr] gap-x-4 border-b border-rule py-6 md:grid-cols-[2.5rem_1fr] md:gap-x-6"
                  data-junction={i === 2 ? 'rcbo' : undefined}
                >
                  <Glyph className="mt-0.5 size-7 text-live-ink md:size-8" />
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="text-h4 font-display text-navy">{step.title}</h3>
                      {step.spec ? (
                        <SpecValue className="text-slate">{step.spec}</SpecValue>
                      ) : null}
                    </div>
                    <p className="u-measure mt-2 text-slate">{step.body}</p>
                  </div>
                </li>
              );
            })}
          </ol>

          <figure className="bg-wall lg:sticky lg:top-28 lg:self-start">
            <Figure
              src="/images/detail-protection.webp"
              alt={included.imageAlt}
              width={1254}
              height={1254}
              sizes="(min-width: 1024px) 20rem, 100vw"
            />
            <figcaption className="text-body-sm px-1 pt-3 text-slate">
              MCB and RCBO on a DIN rail in their own enclosure, cores ferruled and
              terminated. This is what you are actually paying for.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
