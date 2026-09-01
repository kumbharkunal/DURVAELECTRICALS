import fs from 'node:fs';
import path from 'node:path';

/**
 * Image with responsive variants and a build-time missing-file fallback.
 *
 * Static export disables Next's image optimisation, so srcset is built from the
 * variants scripts/generate-sizes.mjs emits at prebuild. The existence check
 * runs during SSG, not in the browser: a missing file renders a --mist block at
 * the correct aspect ratio with the filename in it. No broken image icons, no
 * runtime cost, and no CLS when the real file lands.
 */

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const VARIANT_WIDTHS = [640, 1024, 1536] as const;

function buildSrcSet(src: string): string | undefined {
  const ext = path.extname(src);
  const stem = src.slice(0, -ext.length);

  const entries = VARIANT_WIDTHS.filter((w) =>
    fs.existsSync(path.join(PUBLIC_DIR, `${stem}-${w}${ext}`)),
  ).map((w) => `${stem}-${w}${ext} ${w}w`);

  return entries.length > 0 ? entries.join(', ') : undefined;
}

export function Figure({
  src,
  alt,
  width,
  height,
  sizes = '100vw',
  priority = false,
  className = '',
  imgClassName = '',
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}) {
  const exists = fs.existsSync(path.join(PUBLIC_DIR, src));
  const ratio = `${width} / ${height}`;

  if (!exists) {
    return (
      <div
        className={`grid place-items-center bg-mist px-4 text-center ${className}`}
        style={{ aspectRatio: ratio }}
        role="img"
        aria-label={alt}
      >
        <span className="text-micro text-slate">{src.split('/').pop()}</span>
      </div>
    );
  }

  const srcSet = buildSrcSet(src);

  return (
    <>
      {priority ? (
        <link
          rel="preload"
          as="image"
          href={src}
          fetchPriority="high"
          {...(srcSet ? { imageSrcSet: srcSet, imageSizes: sizes } : {})}
        />
      ) : null}
      {/* eslint-disable-next-line @next/next/no-img-element -- static export
          disables next/image optimisation; srcset is built from the variants
          scripts/generate-sizes.mjs emits. */}
      <img
        src={src}
        srcSet={srcSet}
        sizes={srcSet ? sizes : undefined}
        alt={alt}
        width={width}
        height={height}
        decoding={priority ? 'sync' : 'async'}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={`h-auto w-full ${imgClassName} ${className}`}
        style={{ aspectRatio: ratio }}
      />
    </>
  );
}
