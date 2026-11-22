// The only source of visual values in the app. Everything here is read from
// design/tokens.json, which is generated from design/DESIGN.md. Never put a
// color, font or size literal anywhere else.
import type { TextStyle, ViewStyle } from 'react-native';

import tokens from '../../design/tokens.json';

type Tokens = typeof tokens;
export type TypographyName = keyof Tokens['typography'];
export type ColorName = Exclude<keyof Tokens['color'], 'crew'>;
export type ComponentName = keyof Tokens['components'];

export const color = tokens.color;
export const radius = tokens.radius;
export const spacing = tokens.spacing;
export const motion = tokens.motion;
export const components = tokens.components;

// Archivo ships as static instances because variable axes are unreliable on
// React Native (DESIGN.md, Typography). The keys are the names passed to
// expo-font; the files live in assets/fonts.
export const fontFiles = {
  'Archivo-Medium': require('../../assets/fonts/Archivo-Medium.ttf'),
  'Archivo-SemiBold': require('../../assets/fonts/Archivo-SemiBold.ttf'),
  'Archivo-Bold': require('../../assets/fonts/Archivo-Bold.ttf'),
  'Archivo-Black': require('../../assets/fonts/Archivo-Black.ttf'),
  'ArchivoCondensed-Black': require('../../assets/fonts/ArchivoCondensed-Black.ttf'),
} as const;

export type FontFamily = keyof typeof fontFiles;

type FontSpec = { fontFamily: string; fontWeight: string; width?: number };

/** Maps a token's family, weight and width to one of the bundled font files. */
export function fontFamilyFor(spec: FontSpec): FontFamily {
  if (spec.fontFamily !== 'Archivo') {
    throw new Error(`Unknown font family ${spec.fontFamily}: DESIGN.md allows Archivo only`);
  }
  const condensed = spec.width !== undefined && spec.width < 100;
  if (condensed) {
    if (spec.fontWeight !== '900') {
      throw new Error(`No condensed Archivo at weight ${spec.fontWeight}`);
    }
    return 'ArchivoCondensed-Black';
  }
  switch (spec.fontWeight) {
    case '500':
      return 'Archivo-Medium';
    case '600':
      return 'Archivo-SemiBold';
    case '700':
      return 'Archivo-Bold';
    case '900':
      return 'Archivo-Black';
    default:
      throw new Error(`Archivo weight ${spec.fontWeight} is not one of 500, 600, 700, 900`);
  }
}

/** The Archivo file for a weight at reading width. Weights 500, 600, 700, 900 only. */
export function archivo(weight: '500' | '600' | '700' | '900'): FontFamily {
  return fontFamilyFor({ fontFamily: tokens.typography.body.fontFamily, fontWeight: weight });
}

type TypographyToken = {
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  lineHeight: number;
  letterSpacing?: number;
  textTransform?: string;
  width?: number;
};

/**
 * A React Native text style for a typography token. fontWeight is left out on
 * purpose: each weight is its own font file, and setting both makes Android
 * fall back to the system font.
 */
export function textStyle(token: TypographyToken): TextStyle {
  return {
    fontFamily: fontFamilyFor(token),
    fontSize: token.fontSize,
    lineHeight: token.lineHeight,
    ...(token.letterSpacing !== undefined && { letterSpacing: token.letterSpacing }),
    ...(token.textTransform === 'uppercase' && { textTransform: 'uppercase' as const }),
  };
}

export const type = Object.fromEntries(
  Object.entries(tokens.typography).map(([name, token]) => [name, textStyle(token)]),
) as Record<TypographyName, TextStyle>;

/** Parses a CSS padding shorthand from the tokens ("0 22px", "14px 16px", "0 16px 0 6px", 4). */
export function padding(value: string | number | undefined): ViewStyle {
  if (value === undefined) return {};
  if (typeof value === 'number') return { padding: value };
  const parts = value
    .trim()
    .split(/\s+/)
    .map((part) => Number.parseFloat(part));
  if (parts.some((part) => Number.isNaN(part))) {
    throw new Error(`Cannot read padding "${value}"`);
  }
  const [top, right = top, bottom = top, left = right] = parts;
  return { paddingTop: top, paddingRight: right, paddingBottom: bottom, paddingLeft: left };
}

/** A person's crew colors, in the order DESIGN.md assigns them. */
export type CrewName = 'blue' | 'mint' | 'yellow' | 'pink' | 'lavender' | 'peach';
export const crewOrder: CrewName[] = ['blue', 'mint', 'yellow', 'pink', 'lavender', 'peach'];

export type CrewColors = { fill: string; deep: string; initial: string };

export function crewColors(name: CrewName | 'shared'): CrewColors {
  const crew = tokens.color.crew;
  if (name === 'shared') {
    return { fill: crew.shared, deep: crew.shared, initial: crew['shared-ink'] };
  }
  return { fill: crew[name], deep: crew[`${name}-deep`], initial: tokens.color.ink };
}

/**
 * Icon sizes. DESIGN.md (Components, Icons) says "20 or 24", but tokens.json
 * has no icon token yet; these are the only two icon sizes code may use.
 * TODO(#40): move into DESIGN.md front matter so tokens.json carries them.
 */
export const iconSize = { regular: 20, large: 24 } as const;

/** The scrim's color, for sheets and dialogs. */
export const scrim = tokens.color.scrim;
