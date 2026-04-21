#!/usr/bin/env node
/**
 * hash-skills.mjs
 *
 * Rebuilds /public/.well-known/agent-skills/index.json with fresh SHA-256
 * digests for every SKILL.md file. Run whenever a SKILL.md changes.
 *
 * Usage:
 *   node scripts/hash-skills.mjs
 *
 * The Agent Skills Discovery RFC v0.2.0 requires a sha256 digest so agents
 * can verify they fetched the version announced in the index.
 */

import { createHash } from 'node:crypto';
import { readFile, writeFile, readdir, stat } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SKILLS_DIR = join(ROOT, 'public', '.well-known', 'agent-skills');
const INDEX_PATH = join(SKILLS_DIR, 'index.json');
const SITE_BASE = 'https://bestauto.ge/.well-known/agent-skills';

/** Map of skill folder name -> metadata embedded in index entries. */
const SKILL_META = {
  'submit-lead': {
    name: 'bestauto.submit-lead',
    type: 'action',
    description:
      'Submit a booking request to a BESTAUTO detailing studio in Tbilisi',
  },
  'browse-services': {
    name: 'bestauto.browse-services',
    type: 'reference',
    description:
      'List BESTAUTO detailing services with minimum prices and service pages',
  },
  'locate-studio': {
    name: 'bestauto.locate-studio',
    type: 'reference',
    description:
      'BESTAUTO studio addresses, hours, phones, and map links in Tbilisi',
  },
};

async function sha256(filePath) {
  const buf = await readFile(filePath);
  return createHash('sha256').update(buf).digest('hex');
}

async function main() {
  const entries = await readdir(SKILLS_DIR, { withFileTypes: true });
  const skills = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const skillDir = join(SKILLS_DIR, entry.name);
    const skillFile = join(skillDir, 'SKILL.md');
    try {
      await stat(skillFile);
    } catch {
      console.warn(`[hash-skills] no SKILL.md in ${entry.name}, skipping`);
      continue;
    }
    const meta = SKILL_META[entry.name];
    if (!meta) {
      console.warn(
        `[hash-skills] no metadata for ${entry.name}; add it to SKILL_META`,
      );
      continue;
    }
    const digest = await sha256(skillFile);
    skills.push({
      name: meta.name,
      type: meta.type,
      description: meta.description,
      url: `${SITE_BASE}/${entry.name}/SKILL.md`,
      sha256: digest,
    });
  }

  skills.sort((a, b) => a.name.localeCompare(b.name));

  const index = {
    $schema:
      'https://raw.githubusercontent.com/cloudflare/agent-skills-discovery-rfc/main/schemas/v0.2.0.json',
    version: '0.2.0',
    generated: new Date().toISOString(),
    site: 'https://bestauto.ge',
    skills,
  };

  await writeFile(INDEX_PATH, JSON.stringify(index, null, 2) + '\n', 'utf8');
  console.log(
    `[hash-skills] wrote ${INDEX_PATH} with ${skills.length} skill(s)`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
