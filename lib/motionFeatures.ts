import { domMax } from 'motion/react';

/**
 * The LazyMotion feature set, isolated in its own module purely to give the
 * bundler a split point.
 *
 * `import('motion/react')` inside the component does not split: the component
 * already imports `m`, `LazyMotion` and `AnimatePresence` from that same
 * specifier, so webpack merges the two and `domMax` lands in the entry chunk —
 * measured at +27 KB of first-load JS. Importing this file instead gives the
 * dynamic import a distinct module to hang an async chunk off, so the layout
 * projection code is fetched after first paint by the only thing that needs
 * it: the mobile menu, on tap.
 */
export default domMax;
