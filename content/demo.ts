/* -----------------------------------------------------------------------------
 * PLACEHOLDER CONTENT FOR THE PITCH.
 *
 * Every figure, price and review in this file is INVENTED. It is written to be
 * plausible for a small Thane-district electrical contractor so the mockup looks
 * finished rather than half-populated. None of it has been confirmed by the
 * client and none of it should go live unchanged.
 *
 * Every object below carries `demo: true`.
 *
 * DEMO_MODE is the single switch to audit against before launch. While it is
 * true, `lib/schema.ts` emits NO Review or AggregateRating structured data —
 * shipping fabricated review markup on a real business's domain is how a site
 * earns a manual action. The reviews still render on screen for the mockup.
 * -------------------------------------------------------------------------- */

export const DEMO_MODE = true;

export type Demo<T> = T & { demo: true };

/* -------------------------------------------------------------------------- */
/* Headline figures                                                            */
/* -------------------------------------------------------------------------- */

export type Figure = Demo<{
  key: string;
  value: string;
  label: string;
}>;

export const figures: Figure[] = [
  { key: 'established', value: '2022', label: 'Working since', demo: true },
  { key: 'installs', value: '340+', label: 'Installations completed', demo: true },
  { key: 'localities', value: '8', label: 'Localities served', demo: true },
  { key: 'visit', value: 'Same day', label: 'Site visit, or next day', demo: true },
];

export const facts = {
  established: '2022',
  installations: '340+',
  localities: '8',
  siteVisit: 'same day or next day',
  installTime: '3 to 5 hours',
  workmanshipWarranty: '1 year on installation',
  chargerWarranty: 'as per manufacturer, typically 1 to 3 years',
  team: 'Rohit Talande plus 2 trained technicians',
  demo: true,
} as const;

/* -------------------------------------------------------------------------- */
/* Indicative pricing — installation only, charger not included                */
/* -------------------------------------------------------------------------- */

export type PriceRow = Demo<{
  id: string;
  service: string;
  detail: string | null;
  price: string;
}>;

export const pricing: PriceRow[] = [
  {
    id: 'p-3-3',
    service: '3.3 kW single phase',
    detail: 'run up to 10 m',
    price: '₹4,500 – ₹7,500',
    demo: true,
  },
  {
    id: 'p-7-4',
    service: '7.4 kW single phase',
    detail: 'run up to 15 m',
    price: '₹8,500 – ₹14,000',
    demo: true,
  },
  {
    id: 'p-three-phase',
    service: '11 kW / 22 kW three phase',
    detail: null,
    price: '₹18,000 – ₹32,000',
    demo: true,
  },
  {
    id: 'p-society',
    service: 'Housing society, 2+ points',
    detail: 'quoted per site',
    price: 'from ₹25,000',
    demo: true,
  },
  {
    id: 'p-fault',
    service: 'Fault diagnosis on an existing install',
    detail: 'waived if we do the repair',
    price: '₹800 visit charge',
    demo: true,
  },
  {
    id: 'p-amc',
    service: 'Annual maintenance visit',
    detail: 'per charge point',
    price: '₹1,200',
    demo: true,
  },
];

export const pricingNote =
  'These are installation charges only — the charger itself is not included. The range is driven almost entirely by how far the cable has to run from your distribution board to the parking space, which is why we measure it before quoting. What you get after a site visit is a fixed number.';

/* -------------------------------------------------------------------------- */
/* Reviews                                                                     */
/*                                                                             */
/* No stars, no numeric rating, no review count anywhere in the UI. The         */
/* specificity is what makes these credible; an aggregate rating that does not  */
/* exist would do the opposite.                                                 */
/* -------------------------------------------------------------------------- */

export type Review = Demo<{
  id: string;
  name: string;
  locality: string;
  vehicle: string;
  body: string;
}>;

export const reviews: Review[] = [
  {
    id: 'r-amit',
    name: 'Amit Deshmukh',
    locality: 'Kalyan West',
    vehicle: 'Tata Nexon EV',
    body: "Was charging off a normal socket for two months before someone told me that's not safe. Rohit came the same evening, checked the load and the earthing, and did the whole 7.4 kW install two days later. Conduit work is neater than the wiring in the rest of my flat honestly.",
    demo: true,
  },
  {
    id: 'r-priya',
    name: 'Priya Nair',
    locality: 'Dombivli East',
    vehicle: 'MG Windsor EV',
    body: "Got three quotes. Two of them just said a number on WhatsApp. Rohit actually came and measured the cable run first and explained why the price was what it was. That's why I went with him.",
    demo: true,
  },
  {
    id: 'r-suresh',
    name: 'Suresh Bhatia',
    locality: 'Ulhasnagar-4',
    vehicle: 'Tata Punch EV',
    body: 'Good work and fair rate. Took slightly longer than the day he first said because our society needed the committee approval letter, but that was not his fault. He handled the paperwork side also.',
    demo: true,
  },
  {
    id: 'r-rahul',
    name: 'Rahul Pawar',
    locality: 'Ambernath',
    vehicle: 'Hyundai Creta Electric',
    body: 'Separate MCB, RCBO, proper earthing, everything tested in front of me before he left. He also showed me what to check if the charger ever trips. Very few people explain like that.',
    demo: true,
  },
  {
    id: 'r-sneha',
    name: 'Sneha Kulkarni',
    locality: 'Thane West',
    vehicle: 'BYD Atto 3',
    body: 'Our society wanted four points in the basement parking. Durva did the load assessment, gave the committee a written proposal, and finished all four in two days without any drama.',
    demo: true,
  },
  {
    id: 'r-vikas',
    name: 'Vikas Jethwani',
    locality: 'Ulhasnagar-3',
    vehicle: 'Tata Tiago EV',
    body: 'Charger was tripping every night. Two other electricians could not find the issue. He traced it to a loose neutral in the DB in about forty minutes.',
    demo: true,
  },
];
