import { Figure } from '@/components/ui/Figure';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { problem } from '@/content/site';

/**
 * The strongest section on the page.
 *
 * Calm and factual, not a red alarm aesthetic. --earth appears once here, as the
 * rule above the heading — one of exactly three uses on the whole page (the
 * others are the unprotected spur on the conduit spine and the marker on the
 * matching FAQ answer). It is a stroke, never text: --earth measures 4.21:1 on
 * paper and fails AA for type.
 */
export function ProblemSocket() {
  return (
    <section
      id={problem.id}
      data-junction="fault"
      className="scroll-mt-28 py-20 md:py-28"
      aria-labelledby="problem-heading"
    >
      <div className="u-container">
        <div className="h-px w-16 bg-earth" aria-hidden="true" />
        <div className="mt-6" id="problem-heading">
          <SectionHeading lead={problem.lead}>{problem.heading}</SectionHeading>
        </div>

        <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-2 md:gap-16">
          <figure className="bg-wall md:sticky md:top-28 md:self-start">
            <Figure
              src="/images/problem-socket.webp"
              alt={problem.imageAlt}
              width={1254}
              height={1254}
              sizes="(min-width: 768px) 45vw, 100vw"
            />
            <figcaption className="text-body-sm px-1 pt-3 text-slate">
              A portable cable into a 15A socket, and an extension board on the floor
              beside it. This is the most common EV charging setup in the MMR.
            </figcaption>
          </figure>

          <ul className="space-y-9">
            {problem.points.map((point) => (
              <li key={point.title} className="border-t border-rule pt-5">
                <h3 className="text-h4 font-display text-navy">{point.title}</h3>
                <p className="mt-2.5 text-slate">{point.body}</p>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-lead u-measure-lead mt-14 border-t border-rule pt-8 text-navy">
          {problem.closing}
        </p>
      </div>
    </section>
  );
}
