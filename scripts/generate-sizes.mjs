/**
 * Emits 640 / 1024 / 1536px variants beside every source image in
 * public/images, for the srcset that components/ui/Figure.tsx builds.
 *
 * Static export disables Next's image optimisation, so this runs at `prebuild`.
 * Idempotent: a variant is only rebuilt if it is missing or older than its
 * source, and widths at or above the original are skipped rather than upscaled.
 * Variants are gitignored.
 */

import { createRequire } from 'node:module';
import fs from 'node:fs/promises';
import path from 'node:path';

const require = createRequire(import.meta.url);

const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');
const WIDTHS = [640, 1024, 1536];
const SOURCE_EXT = new Set(['.webp', '.jpg', '.jpeg', '.png']);

/** og.jpg is a social card; logo.png is a UI asset — neither needs size variants. */
const SKIP = new Set(['og.jpg', 'logo.png']);

const VARIANT_RE = new RegExp(`-(${WIDTHS.join('|')})\\.[a-z]+$`, 'i');

async function mtime(file) {
  try {
    return (await fs.stat(file)).mtimeMs;
  } catch {
    return null;
  }
}

async function main() {
  let sharp;
  try {
    sharp = require('sharp');
  } catch {
    console.warn('[generate-sizes] sharp not installed — skipping variant generation.');
    return;
  }

  let entries;
  try {
    entries = await fs.readdir(IMAGES_DIR);
  } catch {
    console.warn(`[generate-sizes] no ${IMAGES_DIR} — nothing to do.`);
    return;
  }

  const sources = entries.filter(
    (name) =>
      SOURCE_EXT.has(path.extname(name).toLowerCase()) &&
      !VARIANT_RE.test(name) &&
      !SKIP.has(name),
  );

  let written = 0;
  let skipped = 0;

  for (const name of sources) {
    const srcPath = path.join(IMAGES_DIR, name);
    const ext = path.extname(name);
    const stem = name.slice(0, -ext.length);
    const srcTime = await mtime(srcPath);

    const image = sharp(srcPath);
    const { width: srcWidth } = await image.metadata();
    if (!srcWidth) continue;

    for (const width of WIDTHS) {
      // Never upscale.
      if (width >= srcWidth) {
        skipped += 1;
        continue;
      }

      const outPath = path.join(IMAGES_DIR, `${stem}-${width}${ext}`);
      const outTime = await mtime(outPath);
      if (outTime !== null && srcTime !== null && outTime >= srcTime) {
        skipped += 1;
        continue;
      }

      const pipeline = sharp(srcPath).resize({ width, withoutEnlargement: true });
      const out =
        ext.toLowerCase() === '.jpg' || ext.toLowerCase() === '.jpeg'
          ? pipeline.jpeg({ quality: 82, mozjpeg: true })
          : ext.toLowerCase() === '.png'
            ? pipeline.png({ compressionLevel: 9 })
            : pipeline.webp({ quality: 80 });

      await out.toFile(outPath);
      written += 1;
    }
  }

  console.log(
    `[generate-sizes] ${sources.length} sources · ${written} written · ${skipped} up to date or skipped`,
  );
}

main().catch((error) => {
  console.error('[generate-sizes] failed:', error);
  process.exit(1);
});
