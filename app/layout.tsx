import type { Metadata, Viewport } from 'next';
import {
  Archivo,
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  IBM_Plex_Sans_Devanagari,
} from 'next/font/google';

import './globals.css';
import { seo, business } from '@/content/site';

/**
 * Display. Industrial and load-bearing rather than startup-sleek, which suits a
 * trade that bolts metal boxes to walls.
 *
 * The brief asked for the width axis pushed at large sizes. Measured, that costs
 * 90KB for the preloaded latin subset against 33KB without it — 57KB on the
 * render path, roughly 1.1s on Slow 4G, against a stated LCP target of 2.0s.
 * The axis is dropped and the industrial register is carried by weight and tight
 * tracking instead. Re-add `axes: ['wdth']` below to reverse.
 */
const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
});

/** Body. Drawn for engineering documentation. */
const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-sans',
  display: 'swap',
});

/**
 * Their logo is Devanagari and their customers speak Marathi and Hindi, so the
 * wordmark should not fall back to a system font. Used for exactly two strings,
 * hence preload: false — it must never compete with the hero image for LCP.
 */
const plexDevanagari = IBM_Plex_Sans_Devanagari({
  subsets: ['devanagari'],
  weight: ['600'],
  variable: '--font-plex-devanagari',
  display: 'swap',
  preload: false,
});

/** Genuine tabular engineering figures only. See components/ui/SpecValue.tsx. */
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: seo.title,
  description: seo.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: business.legalName,
    title: seo.title,
    description: seo.description,
    images: [{ url: seo.ogImage, width: 1200, height: 630, alt: seo.description }],
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.title,
    description: seo.description,
    images: [seo.ogImage],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#F8F9F6',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-IN"
      className={`${archivo.variable} ${plexSans.variable} ${plexDevanagari.variable} ${plexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
