/**
 * Extracts the new contacts block and WhatsApp widget from the main RU page
 * at module load time. These blocks are injected into all other RU pages
 * to replace the old "Запишитесь на бесплатный осмотр" block.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { makePathsAbsolute } from './html-extractor';

function extractRecordBlock(html: string, recId: string): string {
  const startMarker = `id="${recId}"`;
  const startIdx = html.indexOf(startMarker);
  if (startIdx < 0) return '';
  const divStart = html.lastIndexOf('<div', startIdx);
  let depth = 0;
  let pos = divStart;
  while (pos < html.length) {
    const nextOpen = html.indexOf('<div', pos + 1);
    const nextClose = html.indexOf('</div>', pos + 1);
    if (nextClose < 0) break;
    if (nextOpen >= 0 && nextOpen < nextClose) {
      depth++;
      pos = nextOpen;
    } else {
      if (depth === 0) return html.slice(divStart, nextClose + 6);
      depth--;
      pos = nextClose;
    }
  }
  return '';
}

const sourceHtml = readFileSync(
  join(process.cwd(), '../tilda-export/project6825691/page36438811.html'),
  'utf8'
);

export const WHATSAPP_BLOCK = makePathsAbsolute(
  extractRecordBlock(sourceHtml, 'rec2090615423')
);

export const CONTACTS_BLOCK = makePathsAbsolute(
  extractRecordBlock(sourceHtml, 'rec2091246563')
);
