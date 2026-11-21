// Design drift: visual values come only from design/tokens.json (CLAUDE.md, Design rules).
// Fails on a color literal, a font other than Archivo, or the retired name in app code.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const dirs = ['app', 'src'];
const rules = [
  { re: /#[0-9a-fA-F]{3,8}\b/, why: 'color literal; read it from design/tokens.json via @/theme' },
  { re: /\brgba?\(/, why: 'color literal; read it from design/tokens.json via @/theme' },
  { re: /fontFamily:\s*['"]/, why: 'font name literal; use a typography token or fontFamilyFor()' },
  { re: /<(?!CrewAvatar)[A-Z]\w*[^>]*\bsize=\{\d/, why: 'size literal; use iconSize, spacing or a component token from @/theme' },
  { re: /DM Mono/, why: 'DESIGN.md allows Archivo only' },
  { re: /Kitbag/i, why: 'the retired name must never appear (decision 1)' },
];

function files(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return files(path);
    return /\.(tsx?|jsx?)$/.test(name) && !/\.test\./.test(name) ? [path] : [];
  });
}

const problems = [];
for (const file of dirs.flatMap((dir) => files(join(root, dir)))) {
  readFileSync(file, 'utf8')
    .split('\n')
    .forEach((line, i) => {
      if (line.trim().startsWith('//') || line.trim().startsWith('*')) return;
      for (const rule of rules) {
        if (rule.re.test(line)) problems.push(`${relative(root, file)}:${i + 1} - ${rule.why}`);
      }
    });
}
if (problems.length) {
  console.error(`check-drift:\n${problems.join('\n')}`);
  process.exit(1);
}
console.log('check-drift: no color, font or name drift in app/ and src/');
