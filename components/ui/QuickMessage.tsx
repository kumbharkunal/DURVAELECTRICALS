'use client';

import { useState } from 'react';

import { business } from '@/content/site';
import { WhatsAppGlyph } from '@/components/icons/WhatsAppGlyph';

const NEEDS = [
  'A new home charger installation',
  'Charge points for our society',
  'A fault on an existing charger',
  'A load and earthing check',
  'Something else',
] as const;

/**
 * Static export means there is no server to post a form to, and shipping a form
 * that silently goes nowhere would repeat the exact fault we are replacing on
 * the old site. So this composes a WhatsApp message instead: it is genuinely
 * functional, needs no backend, and lands in the channel this business actually
 * runs on.
 */
export function QuickMessage() {
  const [name, setName] = useState('');
  const [locality, setLocality] = useState('');
  const [need, setNeed] = useState<string>(NEEDS[0]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const lines = [
      `Hello, I'm ${name.trim() || 'enquiring'}${locality.trim() ? ` from ${locality.trim()}` : ''}.`,
      `I need: ${need}`,
    ];

    const url = `${business.whatsappHref}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  const field =
    'mt-1.5 w-full rounded-md border border-navy/20 bg-paper px-3 py-2.5 text-navy ' +
    'placeholder:text-slate/70 focus-visible:border-live-ink';

  return (
    <form onSubmit={handleSubmit} className="max-w-md">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="qm-name" className="text-micro font-medium text-slate">
            Your name
          </label>
          <input
            id="qm-name"
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={field}
            placeholder="Amit"
          />
        </div>
        <div>
          <label htmlFor="qm-locality" className="text-micro font-medium text-slate">
            Your locality
          </label>
          <input
            id="qm-locality"
            name="locality"
            type="text"
            value={locality}
            onChange={(e) => setLocality(e.target.value)}
            className={field}
            placeholder="Kalyan West"
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="qm-need" className="text-micro font-medium text-slate">
          What you need
        </label>
        <select
          id="qm-need"
          name="need"
          value={need}
          onChange={(e) => setNeed(e.target.value)}
          className={field}
        >
          {NEEDS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="font-display mt-5 inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-full border border-navy/20 bg-paper px-6 font-semibold text-navy transition-colors hover:bg-mist"
      >
        <WhatsAppGlyph className="size-[1.2em] shrink-0" />
        Open in WhatsApp
      </button>

      <p className="text-micro mt-3 text-slate">
        This opens WhatsApp with your message ready to send. Nothing is submitted
        anywhere else.
      </p>
    </form>
  );
}
