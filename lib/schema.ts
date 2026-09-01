import { DEMO_MODE, reviews } from '@/content/demo';
import { areas, business, faq, seo, services } from '@/content/site';

/**
 * JSON-LD for the page.
 *
 * The one hard rule here: while DEMO_MODE is true, NO Review or AggregateRating
 * is emitted. The reviews render on screen for the mockup, but review markup is
 * the thing search engines ingest and act on, and shipping fabricated review
 * schema on a real business's domain is how a site earns a manual action.
 *
 * When Rohit has real Google reviews, flipping DEMO_MODE to false in
 * content/demo.ts lights them up correctly with no other change.
 */

type Json = Record<string, unknown>;

const ID_BUSINESS = `${business.siteUrl}/#business`;

function localBusiness(): Json {
  const node: Json = {
    '@type': 'Electrician',
    '@id': ID_BUSINESS,
    name: business.legalName,
    alternateName: business.wordmarkDevanagari,
    url: `${business.siteUrl}/`,
    image: `${business.siteUrl}${seo.ogImage}`,
    telephone: business.phone,
    email: business.email,
    description: seo.description,
    founder: { '@type': 'Person', name: business.owner },
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.locality,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    areaServed: areas.list.map((name) => ({
      '@type': 'City',
      name,
    })),
    sameAs: [business.instagram],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'EV charger installation services',
      itemListElement: [
        services.primary.title,
        ...services.secondary.map((s) => s.title),
      ].map((name) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name, serviceType: name },
      })),
    },
  };

  // Review markup only once the reviews are real. See the note above.
  if (!DEMO_MODE) {
    node.review = reviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.name },
      reviewBody: r.body,
      itemReviewed: { '@id': ID_BUSINESS },
    }));
    node.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: String(reviews.length),
    };
  }

  return node;
}

function faqPage(): Json {
  return {
    '@type': 'FAQPage',
    '@id': `${business.siteUrl}/#faq`,
    mainEntity: faq.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

export function buildSchema(): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      localBusiness(),
      faqPage(),
      {
        '@type': 'WebSite',
        '@id': `${business.siteUrl}/#website`,
        url: `${business.siteUrl}/`,
        name: business.legalName,
        inLanguage: 'en-IN',
        publisher: { '@id': ID_BUSINESS },
      },
    ],
  });
}
