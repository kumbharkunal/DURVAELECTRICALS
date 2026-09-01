import { Figure } from '@/components/ui/Figure';
import { figures } from '@/content/demo';
import { brands, trust } from '@/content/site';

export function TrustStrip() {
  return (
    <section className="border-y border-rule bg-mist py-14 md:py-20">
      <div className="u-container">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
          {figures.map((f) => (
            <div key={f.key} className="border-t border-rule pt-4">
              <dt className="text-micro text-slate">{f.label}</dt>
              <dd className="text-display-2 font-display mt-1 text-navy">{f.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-14 grid gap-10 md:mt-16 md:grid-cols-[1fr_18rem] md:items-start md:gap-14">
          <div>
            <h2 className="text-h3 font-display u-measure text-navy">{trust.heading}</h2>
            <p className="u-measure mt-4 text-slate">{trust.body}</p>

            <div className="mt-8 border-t border-rule pt-5">
              <p className="text-micro text-slate">Chargers we install</p>
              <p className="mt-2 flex flex-wrap items-baseline gap-x-5 gap-y-1">
                {brands.list.map((b) => (
                  <span key={b} className="font-display text-h4 text-navy">
                    {b}
                  </span>
                ))}
                <span className="text-body-sm text-slate">and others</span>
              </p>
              <p className="text-body-sm mt-4 text-slate">
                Any AC wallbox with a Type 2 outlet, from 3.3 kW to 22 kW.
              </p>
            </div>
          </div>

          <figure className="bg-wall">
            <Figure
              src="/images/install-01.webp"
              alt={trust.imageAlt}
              width={1200}
              height={1600}
              sizes="(min-width: 768px) 18rem, 100vw"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
