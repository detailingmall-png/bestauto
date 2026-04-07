/**
 * Removes hidden Tilda blocks (t-screenmin-640px / t-screenmax-640px)
 * from blog body files in public/files/.
 *
 * These are duplicate CTA / contact blocks that are hidden via CSS
 * on certain viewports. The site already provides ba-sticky-cta and
 * ba-contacts, so these Tilda originals are dead weight.
 *
 * Navigation blocks (t-screenmin/max-1200px) are preserved.
 *
 * Run: npx tsx scripts/clean-blog-hidden-blocks.ts
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const FILES_DIR = join(import.meta.dirname ?? __dirname, '../astro/public/files');

function removeBlockByScreenClass(html: string, screenClass: string): string {
  let result = html;

  while (true) {
    // Match any .t-rec block that contains the screen class (handles extra classes like t-rec_pt_0)
    const markerIdx = result.indexOf(screenClass);
    if (markerIdx < 0) break;

    // Verify this is inside a t-rec class attribute
    const classStart = result.lastIndexOf('class="', markerIdx);
    if (classStart < 0 || markerIdx - classStart > 200) break;
    if (!result.slice(classStart, markerIdx).includes('t-rec')) break;

    const divStart = result.lastIndexOf('<div', markerIdx);
    if (divStart < 0) break;

    // Count nested divs to find closing </div>
    let depth = 0;
    let pos = divStart;
    let blockEnd = -1;
    while (pos < result.length) {
      if (result.startsWith('<div', pos)) {
        depth++;
        pos += 4;
      } else if (result.startsWith('</div>', pos)) {
        depth--;
        if (depth === 0) {
          blockEnd = pos + 6;
          break;
        }
        pos += 6;
      } else {
        pos++;
      }
    }

    if (blockEnd <= divStart) break;
    result = result.slice(0, divStart) + result.slice(blockEnd);
  }

  return result;
}

const files = readdirSync(FILES_DIR).filter((f) => f.endsWith('body.html'));
let totalRemoved = 0;
let filesChanged = 0;

for (const file of files) {
  const filePath = join(FILES_DIR, file);
  const original = readFileSync(filePath, 'utf8');

  let cleaned = original;
  cleaned = removeBlockByScreenClass(cleaned, 't-screenmin-640px');
  cleaned = removeBlockByScreenClass(cleaned, 't-screenmax-640px');

  if (cleaned !== original) {
    writeFileSync(filePath, cleaned, 'utf8');
    const removed = (original.length - cleaned.length);
    totalRemoved += removed;
    filesChanged++;
  }
}

console.log(`Cleaned ${filesChanged}/${files.length} files, removed ~${(totalRemoved / 1024).toFixed(0)} KB`);
