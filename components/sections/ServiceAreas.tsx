import { SectionHeading } from '@/components/ui/SectionHeading';
import { areas } from '@/content/site';

/** A typographic list beats a fake coverage map. */
export function ServiceAreas() {
  return (
    <section
      id={areas.id}
      className="scroll-mt-28 py-20 md:py-28"
      aria-labelledby="areas-heading"
    >
      <div className="u-container">
        <div id="areas-heading">
          <SectionHeading lead={areas.lead}>{areas.heading}</SectionHeading>
        </div>

        <ul className="mt-10 grid grid-cols-2 border-t border-rule sm:grid-cols-3 md:mt-14 lg:grid-cols-4">
          {areas.list.map((place) => (
            <li
              key={place}
              className="font-display border-b border-rule py-4 text-[clamp(1.25rem,2.4vw,1.75rem)] font-semibold tracking-[-0.02em] text-navy"
            >
              {place}
            </li>
          ))}
        </ul>

        <p className="u-measure mt-8 text-slate">{areas.closing}</p>
      </div>
    </section>
  );
}
