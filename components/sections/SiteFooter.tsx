import { FooterMap } from '@/components/sections/FooterMap';
import { InstagramGlyph } from '@/components/icons/InstagramGlyph';
import { business, footer, navFull } from '@/content/site';

/**
 * No placeholder social icons and no TikTok — the old site shipped five unedited
 * Wix defaults, all on http://, including a TikTok link, which is banned in
 * India. Instagram is the only account they actually have, so it is the only one
 * linked.
 */
export function SiteFooter() {
  return (
    <footer data-site-footer className="bg-navy text-paper">
      <div className="u-container py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1fr_auto] md:gap-16">
          <div>
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo.png"
                alt=""
                aria-hidden="true"
                className="h-9 w-auto shrink-0 object-contain brightness-0 invert"
              />
              <span className="flex flex-col leading-none">
                <span className="font-display text-[1.25rem] font-bold tracking-[-0.02em]">
                  {business.name}
                </span>
                <span className="font-devanagari mt-1 text-[0.9375rem] font-semibold text-paper/75">
                  {business.wordmarkDevanagari}
                </span>
              </span>
            </div>

            <p className="u-measure mt-6 text-paper/75">{footer.tagline}</p>

            <address className="mt-8 space-y-2 not-italic">
              <a
                href={business.phoneHref}
                className="font-display block text-h3 font-semibold hover:text-live"
              >
                {business.phone}
              </a>
              <a href={business.emailHref} className="block text-paper/75 hover:text-paper">
                {business.email}
              </a>
              <p className="text-body-sm text-paper/60">{business.addressLine}</p>
            </address>

            <a
              href={business.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2.5 text-paper/85 hover:text-paper"
            >
              <InstagramGlyph className="size-6" />
              <span className="text-body-sm">{business.instagramHandle}</span>
            </a>
          </div>

          <nav aria-label="Footer">
            <ul className="grid gap-y-2.5 sm:grid-cols-2 sm:gap-x-12 md:grid-cols-1">
              {navFull.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-body-sm text-paper/75 hover:text-paper">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <FooterMap />

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-paper/15 pt-8">
          <p className="text-micro text-paper/60">
            © {new Date().getFullYear()} {business.legalName}
          </p>
          <p className="text-micro text-paper/60">
            {business.owner} — {business.address.locality}, {business.address.district}
          </p>
        </div>
      </div>
    </footer>
  );
}
