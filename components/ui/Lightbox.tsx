'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export type LightboxItem = {
  id: string;
  image: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  location: string | null;
};

/**
 * Gallery grid plus a native <dialog> lightbox.
 *
 * <dialog showModal()> gives focus trapping, Escape, and focus restoration for
 * free, which is both less JavaScript and more robust than hand-rolling them.
 * The tiles are server-rendered <Figure> elements passed in as `figures`, so the
 * build-time missing-file fallback still applies.
 */
export function Lightbox({
  items,
  figures,
}: {
  items: LightboxItem[];
  figures: React.ReactNode[];
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const show = useCallback((i: number) => {
    setIndex(i);
    setOpen(true);
    dialogRef.current?.showModal();
  }, []);

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  const step = useCallback(
    (delta: number) => {
      setIndex((current) => (current + delta + items.length) % items.length);
    },
    [items.length],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const onClose = () => setOpen(false);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        step(1);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        step(-1);
      }
    };

    dialog.addEventListener('close', onClose);
    dialog.addEventListener('keydown', onKeyDown);
    return () => {
      dialog.removeEventListener('close', onClose);
      dialog.removeEventListener('keydown', onKeyDown);
    };
  }, [step]);

  const active = items[index];

  return (
    <>
      <ul className="mt-12 gap-4 md:mt-16 [&>li]:mb-4 [&>li]:break-inside-avoid columns-1 sm:columns-2 lg:columns-3">
        {items.map((item, i) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => show(i)}
              aria-haspopup="dialog"
              className="group block w-full cursor-zoom-in text-left"
            >
              <span className="block overflow-hidden bg-wall">{figures[i]}</span>
              <span className="text-body-sm mt-3 block text-slate group-hover:text-navy">
                {item.caption}
              </span>
              {item.location ? (
                <span className="text-micro mt-1 block text-slate">{item.location}</span>
              ) : null}
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label="Installation photographs"
        className="max-h-none max-w-none bg-transparent backdrop:bg-navy/80 open:fixed open:inset-0 open:grid open:h-full open:w-full open:place-items-center"
        onClick={(event) => {
          if (event.target === dialogRef.current) close();
        }}
      >
        {open && active ? (
          <div className="flex max-h-[100dvh] w-full max-w-5xl flex-col gap-3 p-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-micro text-paper/80">
                {index + 1} of {items.length}
              </p>
              <button
                type="button"
                onClick={close}
                className="inline-flex size-11 items-center justify-center rounded-full bg-paper text-navy"
              >
                <X aria-hidden="true" className="size-5" />
                <span className="sr-only">Close</span>
              </button>
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
            <img
              src={active.image}
              alt={active.alt}
              width={active.width}
              height={active.height}
              className="max-h-[70dvh] w-auto self-center object-contain"
            />

            <div className="flex items-start justify-between gap-4">
              <p className="text-body-sm max-w-2xl text-paper">
                {active.caption}
                {active.location ? (
                  <span className="mt-1 block text-paper/70">{active.location}</span>
                ) : null}
              </p>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  className="inline-flex size-11 items-center justify-center rounded-full bg-paper text-navy"
                >
                  <ChevronLeft aria-hidden="true" className="size-5" />
                  <span className="sr-only">Previous photograph</span>
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  className="inline-flex size-11 items-center justify-center rounded-full bg-paper text-navy"
                >
                  <ChevronRight aria-hidden="true" className="size-5" />
                  <span className="sr-only">Next photograph</span>
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
