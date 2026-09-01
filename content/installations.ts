/**
 * Gallery entries.
 *
 * `demo: false` marks a real photograph of the client's own work.
 * `install-01` and `install-02` are real; the other six are generated for the
 * pitch and get swapped for Rohit's own photographs once we sign.
 *
 * Two notes for the client conversation:
 *
 *  1. install-01 and install-02 are the SAME installation shot from two angles —
 *     same Voltriq unit, same two enclosures, same wall. They are presented as
 *     one job in two views rather than two jobs, and their locality is left
 *     blank until Rohit confirms where it was.
 *
 *  2. The original caption for install-01 paired a 40 A MCB with 4 sq mm cable.
 *     At 7.4 kW / 230 V that is ~32 A continuous, and 4 sq mm in conduit is
 *     rated well below 40 A — an over-fused circuit. Corrected to 6 sq mm,
 *     which is also what the volt-drop over a 15 m run calls for.
 */

export type Orientation = 'portrait' | 'landscape';

export type Installation = {
  id: string;
  image: string;
  width: number;
  height: number;
  orientation: Orientation;
  /** Describes the picture, for screen readers. */
  alt: string;
  /** Describes the work, the way an electrician would. Rendered on screen. */
  caption: string;
  /** Null where the real locality is not yet confirmed by the client. */
  location: string | null;
  demo: boolean;
};

export const installations: Installation[] = [
  {
    id: 'install-01',
    image: '/images/install-01.webp',
    width: 1200,
    height: 1600,
    orientation: 'portrait',
    alt: 'A Durva Electricals technician standing beside a completed Voltriq AC wallbox, with two white protection enclosures and a clamped grey conduit run on the wall alongside it.',
    caption:
      '7.4 kW single-phase Voltriq wallbox. Dedicated 40 A MCB in its own enclosure, 6 sq mm cable in flexible conduit, saddle-clamped at 300 mm.',
    location: null,
    demo: false,
  },
  {
    id: 'install-02',
    image: '/images/install-02.webp',
    width: 1200,
    height: 1600,
    orientation: 'portrait',
    alt: 'The same installation seen closer, with a technician pointing at the two separate protection enclosures beside the Voltriq wallbox and its Type 2 gun resting on a wall holster.',
    caption:
      'The same job, closer. Separate MCB and RCBO enclosures, Type 2 tethered gun on a wall holster, earth continuity verified at handover.',
    location: null,
    demo: false,
  },
  {
    id: 'install-03',
    image: '/images/install-03.webp',
    width: 1024,
    height: 1536,
    orientation: 'portrait',
    alt: 'An open metal enclosure showing a four-pole isolator and rows of protection devices on DIN rails, with a dark AC charger mounted on the wall beside it.',
    caption:
      '22 kW three-phase, Thane West bungalow. Four-pole isolator and Type A RCBO, 6 sq mm run from the main DB.',
    location: 'Thane West',
    demo: true,
  },
  {
    id: 'install-04',
    image: '/images/install-04.webp',
    width: 1536,
    height: 1024,
    orientation: 'landscape',
    alt: 'Two wall-mounted charge points in a society basement, each fed from its own small enclosure by a clamped conduit run along the wall.',
    caption:
      'Two charge points, society basement, Dombivli East. Shared feeder with individual protection per point.',
    location: 'Dombivli East',
    demo: true,
  },
  {
    id: 'install-05',
    image: '/images/install-05.webp',
    width: 1024,
    height: 1536,
    orientation: 'portrait',
    alt: 'A black flexible conduit running vertically up a beige plaster wall, held by evenly spaced saddle clamps, turning through a right angle at the top.',
    caption:
      'Conduit run detail, Ulhasnagar-4. Vertical rise from the DB, clamped and dressed before the charger was mounted.',
    location: 'Ulhasnagar-4',
    demo: true,
  },
  {
    id: 'install-06',
    image: '/images/install-06.webp',
    width: 1536,
    height: 1024,
    orientation: 'landscape',
    alt: 'A charge point on the outside wall of a commercial building under a small weather shield, with its enclosure and galvanised conduit run beside the parking bay.',
    caption:
      'Commercial premises, Kalyan-Shil Road. Charge point for staff and visitor parking, weather-shielded mounting.',
    location: 'Kalyan-Shil Road',
    demo: true,
  },
  {
    id: 'install-07',
    image: '/images/install-07.webp',
    width: 1024,
    height: 1536,
    orientation: 'portrait',
    alt: 'A small white AC wallbox on a residential wall with its protection enclosure above it, connected by a short clamped conduit, and a car parked just in frame.',
    caption:
      '3.3 kW install for a Tiago EV, Badlapur. Smallest job we do, same protection standard as the largest.',
    location: 'Badlapur',
    demo: true,
  },
  {
    id: 'install-08',
    image: '/images/install-08.webp',
    width: 1536,
    height: 1024,
    orientation: 'landscape',
    alt: 'Close view of two hands terminating colour-coded cores into a charger terminal block with an insulated screwdriver, cores ferruled and the gland tightened below.',
    caption:
      'Cable termination in progress, Ulhasnagar. Ferruled cores, torqued terminals, insulation resistance tested before energising.',
    location: 'Ulhasnagar',
    demo: true,
  },
];
