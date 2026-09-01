import { SectionHeading } from '@/components/ui/SectionHeading';
import { process } from '@/content/site';

/**
 * The only numbered content on the page. Process is a genuine sequence, so
 * numbering is correct here — and nowhere else.
 */
export function Process() {
  return (
    <section
      id={process.id}
      className="scroll-mt-28 border-y border-rule bg-mist py-20 md:py-28"
      aria-labelledby="process-heading"
    >
      <div className="u-container">
        <div id="process-heading">
          <SectionHeading lead={process.lead}>{process.heading}</SectionHeading>
        </div>

        <ol className="mt-12 border-t border-rule md:mt-16">
          {process.steps.map((step, i) => (
            <li
              key={step.title}
              data-junction={`step-${i + 1}`}
              className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-rule py-7 md:grid-cols-[4rem_1fr] md:gap-x-8"
            >
              <span
                aria-hidden="true"
                className="font-display text-h3 leading-none font-semibold text-live-ink tabular-nums"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-h3 font-display text-navy">{step.title}</h3>
                <p className="u-measure mt-2.5 text-slate">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
