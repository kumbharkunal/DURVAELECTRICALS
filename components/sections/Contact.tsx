import { MapPin, Mail } from 'lucide-react';

import { QuickMessage } from '@/components/ui/QuickMessage';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { Type2Glyph } from '@/components/icons/schematic';
import { business, contact } from '@/content/site';

/**
 * The end of the circuit — the conduit spine terminates on this section at the
 * Type 2 connector. The phone number is the hero here, set large and tappable.
 */
export function Contact() {
  return (
    <section
      id={contact.id}
      data-junction="type2"
      className="scroll-mt-28 py-20 md:py-28"
      aria-labelledby="contact-heading"
    >
      <div className="u-container">
        <div className="flex items-start gap-4">
          <Type2Glyph className="mt-1 hidden size-9 shrink-0 text-live-ink md:block" />
          <div id="contact-heading">
            <SectionHeading lead={contact.lead}>{contact.heading}</SectionHeading>
          </div>
        </div>

        <div className="mt-12 grid gap-12 border-t border-rule pt-10 md:mt-16 md:grid-cols-2 md:gap-16">
          <div>
            <a
              href={business.phoneHref}
              className="font-display block text-[clamp(2rem,6vw,3.25rem)] leading-none font-bold tracking-[-0.03em] text-navy hover:text-live-ink"
            >
              {business.phone}
            </a>
            <p className="text-body-sm mt-3 text-slate">
              {business.owner} — call between 9am and 9pm, any day.
            </p>

            <div className="mt-7">
              <WhatsAppButton variant="outline" label="Message on WhatsApp" />
            </div>

            <dl className="mt-10 space-y-5 border-t border-rule pt-8">
              <div className="flex gap-3">
                <dt className="shrink-0">
                  <Mail aria-hidden="true" className="mt-0.5 size-5 text-slate" />
                  <span className="sr-only">Email</span>
                </dt>
                <dd>
                  <a
                    href={business.emailHref}
                    className="text-navy underline decoration-rule underline-offset-4 hover:decoration-live-ink"
                  >
                    {business.email}
                  </a>
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="shrink-0">
                  <MapPin aria-hidden="true" className="mt-0.5 size-5 text-slate" />
                  <span className="sr-only">Address</span>
                </dt>
                <dd className="text-slate">{business.addressLine}</dd>
              </div>
            </dl>
          </div>

          <div>
            <h3 className="text-h4 font-display text-navy">{contact.formNote}</h3>
            <p className="text-body-sm mt-2 text-slate">
              Three fields, and it opens WhatsApp with the message written for you.
            </p>
            <div className="mt-5">
              <QuickMessage />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
