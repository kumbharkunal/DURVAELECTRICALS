import { SectionHeading } from '@/components/ui/SectionHeading';
import { SpecValue } from '@/components/ui/SpecValue';
import { pricing, pricingNote } from '@/content/demo';

/**
 * Almost nobody in this category publishes prices, and doing it is the single
 * most disarming thing on the page. A real <table> with mono figures — these
 * are tabular engineering values, so mono is semantically correct here.
 */
export function Pricing() {
  return (
    <section
      id="pricing"
      className="scroll-mt-28 border-y border-rule bg-mist py-20 md:py-28"
      aria-labelledby="pricing-heading"
    >
      <div className="u-container">
        <div id="pricing-heading">
          <SectionHeading lead="Installation charges, published. The range is driven by how far the cable has to run — that is what actually moves the price.">
            What it costs
          </SectionHeading>
        </div>

        <div className="mt-12 max-w-3xl overflow-x-auto md:mt-16">
          <table className="w-full min-w-[34rem] border-collapse text-left">
            <caption className="sr-only">
              Indicative installation charges. Charger not included. Subject to a site
              visit.
            </caption>
            <thead>
              <tr className="border-b border-navy/25">
                <th scope="col" className="text-micro pb-3 pr-6 font-medium text-slate">
                  Installation
                </th>
                <th scope="col" className="text-micro pb-3 text-right font-medium text-slate">
                  Indicative charge
                </th>
              </tr>
            </thead>
            <tbody>
              {pricing.map((row) => (
                <tr key={row.id} className="border-b border-rule align-baseline">
                  <th scope="row" className="py-4 pr-6 font-normal">
                    <span className="text-navy">{row.service}</span>
                    {row.detail ? (
                      <span className="text-body-sm block text-slate">{row.detail}</span>
                    ) : null}
                  </th>
                  <td className="py-4 text-right whitespace-nowrap">
                    <SpecValue size="lg" className="text-navy">
                      {row.price}
                    </SpecValue>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="u-measure mt-8 text-slate">{pricingNote}</p>
      </div>
    </section>
  );
}
