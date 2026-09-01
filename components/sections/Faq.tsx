import { Plus } from 'lucide-react';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { faq } from '@/content/site';

/**
 * Native <details>/<summary>. Keyboard-operable, screen-reader correct and
 * open-on-find-in-page for free, with zero JavaScript — which matters more on a
 * mid-range Android than any custom accordion would.
 *
 * The 15A question used to carry an --earth dash, as the third of the three
 * budgeted earth marks. Removed on request, so earth now appears twice: the
 * unprotected spur on the conduit spine, and the rule above the 15A section
 * heading — which is where the warning actually lands.
 */
export function Faq() {
  return (
    <section
      id={faq.id}
      className="scroll-mt-28 border-y border-rule bg-mist py-20 md:py-28"
      aria-labelledby="faq-heading"
    >
      <div className="u-container">
        <div id="faq-heading">
          <SectionHeading>{faq.heading}</SectionHeading>
        </div>

        <div className="mt-12 border-t border-rule md:mt-16">
          {faq.items.map((item) => (
            <details key={item.q} className="group border-b border-rule">
              <summary className="flex cursor-pointer list-none items-start gap-4 py-5 [&::-webkit-details-marker]:hidden">
                <h3 className="text-h4 font-display flex-1 text-navy">{item.q}</h3>
                <Plus
                  aria-hidden="true"
                  className="mt-1 size-5 shrink-0 text-live-ink transition-transform duration-300 group-open:rotate-45"
                />
              </summary>
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-open:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <p className="u-measure pb-6 pt-1 text-slate">{item.a}</p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
