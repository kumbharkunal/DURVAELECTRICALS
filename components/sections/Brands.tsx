import { SectionHeading } from '@/components/ui/SectionHeading';
import { brands } from '@/content/site';

/**
 * Set as type, not as logo image files. We do not have permission to use these
 * OEM trademarks as assets, and a row of borrowed logos looks cheap anyway.
 * Archivo at weight carries it.
 */
export function Brands() {
  return (
    <section
      id={brands.id}
      className="scroll-mt-28 py-20 md:py-28"
      aria-labelledby="brands-heading"
    >
      <div className="u-container">
        <div id="brands-heading">
          <SectionHeading lead={brands.lead}>{brands.heading}</SectionHeading>
        </div>

        <ul className="mt-10 flex flex-wrap items-baseline gap-x-10 gap-y-4 border-t border-rule pt-10 md:mt-14 md:gap-x-14">
          {brands.list.map((brand) => (
            <li
              key={brand}
              className="font-display text-[clamp(1.75rem,4.2vw,2.75rem)] leading-none font-semibold tracking-[-0.02em] text-navy"
            >
              {brand}
            </li>
          ))}
        </ul>

        <p className="text-body-sm mt-6 text-slate">{brands.closing}</p>
      </div>
    </section>
  );
}
