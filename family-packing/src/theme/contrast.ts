// WCAG 2 contrast, used by the gate (scripts/check.sh runs the tests).
import { color, components } from './index';

function channel(value: number): number {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

export function luminance(hex: string): number {
  const match = /^#([0-9a-f]{6})$/i.exec(hex);
  if (!match) throw new Error(`Not a 6-digit hex color: ${hex}`);
  const n = Number.parseInt(match[1], 16);
  return 0.2126 * channel((n >> 16) & 255) + 0.7152 * channel((n >> 8) & 255) + 0.0722 * channel(n & 255);
}

export function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

export const MIN_TEXT_CONTRAST = 4.5;

type Pair = { text: string; on: string; textHex: string; onHex: string };

const crew = color.crew as Record<string, string>;
const named = color as unknown as Record<string, string>;

function hex(name: string): string {
  const value = name.startsWith('crew.') ? crew[name.slice(5)] : named[name];
  if (typeof value !== 'string') throw new Error(`No color token ${name}`);
  return value;
}

/**
 * Every text color DESIGN.md puts on each background (Colors section), by
 * token name. A new text use goes here so the gate checks it.
 */
const TEXT_ON_BACKGROUND: [string, string[]][] = [
  ['ink', ['mist', 'card', 'row-highlight', 'scout-tint', 'flare', 'divider', 'track']],
  ['ink', ['crew.blue', 'crew.mint', 'crew.yellow', 'crew.pink', 'crew.lavender', 'crew.peach']],
  ['muted', ['mist', 'card', 'row-highlight']],
  ['scout-text', ['card', 'scout-tint']],
  ['mist', ['ink', 'deep']],
  ['on-ink-soft', ['ink', 'deep']],
  ['on-ink-label', ['ink', 'deep']],
  ['done', ['card']],
  ['card', ['danger']],
  ['danger', ['card', 'danger-tint']],
  ['crew.shared-ink', ['crew.shared']],
];

/** Every text and background pair the design uses: the list above plus each component token. */
export function textPairs(): Pair[] {
  const pairs: Pair[] = [];
  for (const [text, backgrounds] of TEXT_ON_BACKGROUND) {
    for (const on of backgrounds) {
      pairs.push({ text, on, textHex: hex(text), onHex: hex(on) });
    }
  }
  for (const [name, spec] of Object.entries(components) as [string, Record<string, unknown>][]) {
    const text = spec.textColor;
    const on = spec.backgroundColor;
    if (typeof text === 'string' && typeof on === 'string') {
      pairs.push({ text: `${name}.textColor`, on: `${name}.backgroundColor`, textHex: text, onHex: on });
    }
  }
  return pairs;
}
