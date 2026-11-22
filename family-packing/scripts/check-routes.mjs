// Fails when a route in design/screens.md has no route file under app/.
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const screens = readFileSync(join(root, 'design/screens.md'), 'utf8');

const routes = new Set();
for (const line of screens.split('\n')) {
  if (!line.startsWith('| ')) continue;
  const cells = line.split('|').map((cell) => cell.trim());
  // | ID | Source | Screen | Route or type | ...
  const routeCell = cells[4] ?? '';
  for (const match of routeCell.matchAll(/`(\/[^`]*)`/g)) routes.add(match[1]);
}

if (routes.size === 0) {
  console.error('check-routes: found no routes in design/screens.md; has the table changed?');
  process.exit(1);
}

const missing = [];
for (const route of routes) {
  const path = route === '/' ? '' : route.slice(1);
  const candidates = [join(root, 'app', `${path}.tsx`), join(root, 'app', path, 'index.tsx')];
  if (!candidates.some((file) => existsSync(file))) missing.push(route);
}

if (missing.length) {
  console.error(`check-routes: no route file for ${missing.join(', ')}`);
  process.exit(1);
}
console.log(`check-routes: all ${routes.size} routes in design/screens.md have a file under app/`);
