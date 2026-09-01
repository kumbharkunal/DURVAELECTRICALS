/**
 * Verified business details and page copy.
 *
 * Everything in this file is either confirmed from the client's own material
 * (see `business`) or is editorial copy written for the page. Invented figures,
 * prices and reviews live in `content/demo.ts` and are gated behind DEMO_MODE.
 */

export const business = {
  name: 'Durva Electricals',
  legalName: 'Durva Electricals — EV Charging Solutions',
  wordmarkDevanagari: 'दुर्वा इलेक्ट्रिकल्स',
  owner: 'Rohit Talande',
  phone: '+91 82912 37253',
  phoneHref: 'tel:+918291237253',
  phoneDisplayShort: '82912 37253',
  whatsappHref: 'https://wa.me/918291237253',
  email: 'talanderohit03@gmail.com',
  emailHref: 'mailto:talanderohit03@gmail.com',
  instagram: 'https://www.instagram.com/durva_electricals/',
  instagramHandle: '@durva_electricals',
  address: {
    street: 'Ashalepada',
    locality: 'Ulhasnagar-4',
    region: 'Maharashtra',
    district: 'Thane District',
    postalCode: '421004',
    country: 'IN',
  },
  /** One canonical NAP string. The old site had two different ones on one page. */
  addressLine: 'Ashalepada, Ulhasnagar-4, Thane District, Maharashtra 421004',
  /**
   * Map embed and directions both resolve the same query string, so the pin
   * and the directions link can never drift apart. The `output=embed` form
   * needs no API key, which keeps this a pure static export with no billing
   * account attached to the client's site.
   *
   * Replace with a Google Business Profile place ID once Rohit has one — that
   * pins the exact premises and feeds local SEO, which a text query cannot.
   */
  mapQuery: 'Ashalepada, Ulhasnagar-4, Thane, Maharashtra 421004',
  siteUrl: 'https://durvaelectricals.pages.dev',
} as const;

export const seo = {
  title: 'EV charger installation — Ulhasnagar, Kalyan, Thane | Durva Electricals',
  description:
    'Home and society AC EV charger installation across Ulhasnagar, Kalyan, Ambernath and Thane. Dedicated circuit, MCB and RCBO, earthing verified. Prices published.',
  ogImage: '/images/og.jpg',
} as const;

export type NavItem = { label: string; href: string };

/** Desktop pill — kept to four so the Call button has room inside 720px. */
export const navPrimary: NavItem[] = [
  { label: 'Work', href: '#whats-included' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Installations', href: '#installations' },
  { label: 'Areas', href: '#areas' },
];

/** Mobile sheet — the full set. */
export const navFull: NavItem[] = [
  { label: 'The 15A problem', href: '#the-problem' },
  { label: "What's included", href: '#whats-included' },
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Installations', href: '#installations' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'How it works', href: '#process' },
  { label: 'Areas we cover', href: '#areas' },
  { label: 'Questions', href: '#questions' },
];

export const hero = {
  headline: 'Your charger is the cheap part.',
  headlineRest: "The wiring behind it is what you're actually paying for.",
  lead: 'AC charger installation on a dedicated, protected circuit, for homes and housing societies across Ulhasnagar, Kalyan, Ambernath and Thane.',
  imageAlt:
    'A white electric hatchback plugged into a wall-mounted AC charger in covered residential parking, with the protection enclosure and clamped conduit run visible on the wall beside it.',
} as const;

export const trust = {
  heading: 'The person who answers the phone is the person who does the work',
  body: 'Durva Electricals is Rohit Talande and two trained technicians, working out of Ulhasnagar. There is no call centre and no subcontractor. The person who comes and looks at your distribution board is the person who quotes it, installs it, and comes back if it ever gives trouble.',
  imageAlt:
    'A Durva Electricals technician beside a completed Voltriq wallbox installation, pointing at the two protection enclosures mounted alongside it.',
} as const;

export const problem = {
  id: 'the-problem',
  heading: 'What most people are actually doing',
  lead: 'Almost every EV in a Mumbai building spends its first months charging from a 15A socket in the parking. It works. That is the problem — it works right up until it does not.',
  imageAlt:
    'A portable EV charging cable plugged into an ordinary 15A wall socket, with an extension board on the floor beside it.',
  points: [
    {
      title: 'It is a shared circuit',
      body: 'That socket is almost certainly on the same circuit as lights, a geyser or a pump. Your car draws its full current for six to eight hours at a stretch. Nothing in that circuit was designed for it.',
    },
    {
      title: 'There is no dedicated protection',
      body: 'A charger needs its own MCB and its own RCBO. On a shared socket circuit it has neither, so a fault is left to a breaker that was sized for a ceiling fan.',
    },
    {
      title: 'The cable is not rated for it',
      body: 'Ordinary socket wiring is sized for short bursts, not continuous load. Held at full current for hours it runs warm, and warm wiring inside a conduit is how a slow problem becomes a fast one.',
    },
    {
      title: 'Nobody has checked the earthing',
      body: 'This is the one that matters most and gets looked at least. If the earth at that socket is not continuous, the metal body of your car is the thing standing between a fault and you.',
    },
  ],
  closing:
    'None of this means your building is dangerous. It means a socket meant for a mixer grinder is being asked to do a job it was never designed for, every night, for years.',
} as const;

export const included = {
  id: 'whats-included',
  heading: 'What a proper installation includes',
  lead: 'Every job, from the smallest 3.3 kW point to a four-point society basement, gets the same seven things. This is the list to hold any quote against, including ours.',
  imageAlt:
    'An open protection enclosure showing an MCB and an RCBO mounted on a DIN rail, with colour-coded cores ferruled and terminated below.',
  steps: [
    {
      title: 'A dedicated circuit from the distribution board',
      body: 'Its own way out of the DB. Nothing else shares it.',
      spec: null,
    },
    {
      title: 'Its own MCB and RCBO',
      body: 'Overcurrent and earth-leakage protection sized for the charger, in their own enclosure beside it, rather than squeezed into the main DB.',
      spec: 'Type A RCBO, 30 mA',
    },
    {
      title: 'Cable sized for the run, not for the invoice',
      body: 'Sized on current and on the length of the run, because volt-drop over fifteen metres is real and the cheapest quote is usually the one that ignored it.',
      spec: '4–6 sq mm',
    },
    {
      title: 'Earthing verified before anything is energised',
      body: 'Earth continuity measured, not assumed. If the building earth is not good enough, you hear about it before the work starts rather than after.',
      spec: null,
    },
    {
      title: 'Conduit run, clamped and dressed',
      body: 'Flexible conduit on a planned route, saddle-clamped at a regular pitch and squared off. It costs a little more time, and it is the part you will look at every day.',
      spec: '300 mm pitch',
    },
    {
      title: 'Charger mounted level and torqued',
      body: 'Fixed to the wall properly, cores ferruled, terminals torqued to the manufacturer figure.',
      spec: null,
    },
    {
      title: 'Full load test and handover',
      body: 'Run under load, insulation resistance tested, and then five minutes showing you where the isolator is and what to check if it ever trips.',
      spec: null,
    },
  ],
} as const;

export const services = {
  id: 'services',
  heading: 'What we do',
  primary: {
    title: 'Home charger installation',
    body: 'The core of the business. A single AC charge point at your flat, bungalow or allotted parking space — site visit, load check, dedicated circuit, protection, conduit, mounting and handover. Most homes end up on a 3.3 kW or 7.4 kW single-phase point, and which one suits you depends on your car and your sanctioned load rather than on what we would prefer to sell.',
    imageAlt:
      'A compact 3.3 kW AC wallbox mounted on a residential wall, its protection enclosure above it and the charging gun coiled on a holster alongside.',
  },
  secondary: [
    {
      title: 'Housing society and commercial',
      body: 'Two to ten points in a basement or a compound. Load assessment first, then a written proposal your committee can actually put in front of a meeting, then a shared feeder with individual protection per point.',
    },
    {
      title: 'Charger supply and advice',
      body: 'We install Hyundai, Tata, MG, BYD and Voltriq units, and we will tell you when a higher kW rating will not help you — a car that accepts 7.4 kW does not charge faster on a 22 kW point.',
    },
    {
      title: 'Maintenance and AMC',
      body: 'An annual visit per charge point: terminals re-torqued, RCBO trip-tested, earthing re-checked, connector and cable inspected for wear.',
    },
    {
      title: 'Fault diagnosis',
      body: 'A charger that trips at night, a point someone else installed, an RCBO that will not hold. We come and find it, including on work we did not do.',
    },
    {
      title: 'Load and earthing assessment',
      body: 'On its own, before you buy anything. Useful if you have not chosen a car yet, or if the society wants to know what the building can take.',
    },
  ],
} as const;

export const process = {
  id: 'process',
  heading: 'How it works',
  lead: 'Five steps. You get a number in writing before anyone drills anything.',
  steps: [
    {
      title: 'Site visit and load check',
      body: 'We come and look. Where the DB is, where the car parks, what the run between them actually is, and what load your connection is sanctioned for. This is the step the cheap quotes skip, which is why they change later.',
    },
    {
      title: 'Written quote',
      body: 'A number, itemised, with the cable run length it is based on. If something on site could change it, we say so then rather than on the day.',
    },
    {
      title: 'Material and charger selection',
      body: 'Which kW rating suits your car and your sanctioned load, which unit, and the protection and cable to go with it. If you have already bought a charger, we install that.',
    },
    {
      title: 'Installation',
      body: 'Typically three to five hours for a single home point. Conduit routed and clamped, protection mounted, charger fixed and terminated.',
    },
    {
      title: 'Testing and handover',
      body: 'Earth continuity and insulation resistance tested, run under load, and then we show you the isolator, the RCBO test button, and what to do if it ever trips.',
    },
  ],
} as const;

export const brands = {
  id: 'brands',
  heading: 'Chargers we install',
  lead: 'We fit customer-supplied units and we can source them for you. Any AC wallbox with a Type 2 outlet is straightforward.',
  list: ['Hyundai', 'Tata', 'MG', 'BYD', 'Voltriq'],
  closing: 'And others — if it is an AC wallbox, we can almost certainly fit it.',
} as const;

export const areas = {
  id: 'areas',
  heading: 'Where we work',
  lead: 'Based in Ulhasnagar. Most jobs are within about an hour of it.',
  list: [
    'Ulhasnagar',
    'Kalyan',
    'Ambernath',
    'Badlapur',
    'Dombivli',
    'Thane',
    'Navi Mumbai',
    'Mumbai',
  ],
  closing:
    'Somewhere else in the MMR? Call and ask. If it is too far for us to come back and fix something, we will say so rather than take the job.',
} as const;

export const faq = {
  id: 'questions',
  heading: 'Questions',
  items: [
    {
      q: 'Do I need a separate meter for the charger?',
      a: 'For a home charge point, usually not. It runs off your existing connection on its own dedicated circuit. A separate meter is a different conversation and normally comes up only for societies that want to bill residents individually for what they use.',
    },
    {
      q: 'Will I need an MSEDCL load sanction increase?',
      a: 'It depends on what your connection is sanctioned for now and what you are adding. A 3.3 kW point on a typical residential connection often needs nothing. A 7.4 kW point on an already-loaded connection frequently does, and 11 kW or 22 kW three-phase almost always does. We check your sanctioned load at the site visit and tell you before you buy a charger. In Mumbai city the same applies with Adani, BEST or Tata Power rather than MSEDCL.',
    },
    {
      q: 'How long does a load sanction take?',
      a: 'Honestly, there is no reliable number. It depends on the office, the season, and how complete the paperwork is when it goes in. We will help you put the application together and tell you what we are seeing at the time, but anyone who promises you a date for this is guessing.',
    },
    {
      q: 'What does it cost?',
      a: 'Indicative ranges are published above, and the range is driven mostly by how far the cable has to run. What we quote after a site visit is a fixed number, not a starting point.',
    },
    {
      q: 'How long does the installation take?',
      a: 'Three to five hours for a typical single home point, done in one visit. A society basement with several points is usually two days. If a society approval letter is pending, that is the thing that moves the date, not the work.',
    },
    {
      q: '3.3, 7.4, 11 or 22 kW — which one can my car actually use?',
      a: 'Your car has a maximum AC charging rate and a bigger charger will not beat it. Most EVs on sale here — Tata, MG, Hyundai, BYD — take 3.3 kW or 7.4 kW on AC through a Type 2 socket, and a 22 kW point will simply charge them at their own limit. 11 kW and 22 kW three-phase are worth it for cars that genuinely accept them, and for shared points where several cars use one unit. Tell us the car and we will tell you which one is the right buy.',
    },
    {
      q: 'Can I just keep using the 15A socket?',
      a: 'You can, and plenty of people do for months. What you are relying on is that the circuit is in good condition, that the earthing is sound, and that nothing else heavy is on the same run — three things nobody has checked. It is not that a 15A socket is illegal or that your building is unsafe. It is that continuous high current for hours at a time is a duty that socket circuit was never designed for, and it is the cheapest problem in this whole business to fix properly.',
    },
    {
      q: 'What permission do I need from my society?',
      a: 'Almost always a written approval from the managing committee, and that process varies enormously between buildings — some sign the same week, some want it raised at the next meeting. We give you a one-page description of the work, the load it adds and the protection being fitted, which is usually what the committee is actually asking for. We cannot promise a timeline on a committee.',
    },
    {
      q: 'What happens if it faults later?',
      a: 'Call us. If it is our installation, we come and sort it out. If it is someone else’s, we will still come and find the fault — there is a visit charge for that, and it is waived if we do the repair.',
    },
  ],
} as const;

export const contact = {
  id: 'contact',
  heading: 'Talk to Rohit',
  lead: 'Call, or send a WhatsApp with a photo of your distribution board and where the car parks. That is usually enough to get you a sensible answer straight away, without anyone having to visit first.',
  formNote: 'Rather type than talk?',
} as const;

export const footer = {
  tagline: 'AC EV charger installation and maintenance across Thane district and the MMR.',
} as const;
