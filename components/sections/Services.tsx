import { Figure } from '@/components/ui/Figure';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { services } from '@/content/site';

/**
 * Deliberately not six identical cards with identical shadows. Home
 * installation is the business, so it gets a full-width treatment carrying a
 * photograph; the five that support it are a compact hairline list.
 */
export function Services() {
  return (
    <section
      id={services.id}
      className="scroll-mt-28 py-20 md:py-28"
      aria-labelledby="services-heading"
    >
      <div className="u-container">
        <div id="services-heading">
          <SectionHeading>{services.heading}</SectionHeading>
        </div>

        <div className="mt-12 grid gap-10 border-t border-rule pt-10 md:mt-16 md:grid-cols-[16rem_1fr] md:gap-14">
          <figure className="bg-wall">
            <Figure
              src="/images/install-07.webp"
              alt={services.primary.imageAlt}
              width={1024}
              height={1536}
              sizes="(min-width: 768px) 16rem, 100vw"
            />
          </figure>
          <div>
            <h3 className="text-display-2 font-display u-measure text-navy">
              {services.primary.title}
            </h3>
            <p className="text-lead u-measure-lead mt-5 text-slate">
              {services.primary.body}
            </p>
          </div>
        </div>

        <ul className="mt-14 grid gap-x-12 border-t border-rule md:mt-16 md:grid-cols-2">
          {services.secondary.map((s) => (
            <li key={s.title} className="border-b border-rule py-6">
              <h3 className="text-h4 font-display text-navy">{s.title}</h3>
              <p className="u-measure mt-2 text-slate">{s.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
