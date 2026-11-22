// Fails when the "Decided" sync date in family-packing/CLAUDE.md is more than 8 days old (decision 33).
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const MAX_DAYS = 8;
const root = new URL('..', import.meta.url).pathname;
const text = readFileSync(join(root, 'CLAUDE.md'), 'utf8');
const match = /Synced from the tracker's Decisions tab on (\d{4}-\d{2}-\d{2})/.exec(text);
if (!match) {
  console.error('check-decided: no "Synced from the tracker\'s Decisions tab on YYYY-MM-DD" line in CLAUDE.md');
  process.exit(1);
}
const synced = new Date(`${match[1]}T00:00:00Z`);
const today = new Date(`${new Date().toISOString().slice(0, 10)}T00:00:00Z`);
const days = Math.round((today - synced) / 86_400_000);
if (days > MAX_DAYS) {
  console.error(`check-decided: Decided was synced ${match[1]}, ${days} days ago (limit ${MAX_DAYS}). Sync it from the tracker's Decisions tab.`);
  process.exit(1);
}
console.log(`check-decided: synced ${match[1]}, ${days} days ago`);
