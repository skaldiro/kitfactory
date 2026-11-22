import { contrast, MIN_TEXT_CONTRAST, textPairs } from './contrast';
import { crewColors, crewOrder, fontFamilyFor, fontFiles, padding, type } from './index';

describe('text contrast', () => {
  const pairs = textPairs();

  it('checks the component tokens as well as the listed pairs', () => {
    expect(pairs.some((pair) => pair.text === 'button-scout.textColor')).toBe(true);
    expect(pairs.length).toBeGreaterThan(30);
  });

  it.each(pairs.map((pair) => [pair.text, pair.on, pair.textHex, pair.onHex]))(
    '%s on %s is at least 4.5:1',
    (_text, _on, textHex, onHex) => {
      expect(contrast(textHex, onHex)).toBeGreaterThanOrEqual(MIN_TEXT_CONTRAST);
    },
  );

  it('fails a pair under 4.5:1 (flare text on mist)', () => {
    expect(contrast('#FF5B23', '#EEF1EA')).toBeLessThan(MIN_TEXT_CONTRAST);
  });
});

describe('typography', () => {
  it('maps every token to a bundled Archivo file', () => {
    for (const style of Object.values(type)) {
      expect(Object.keys(fontFiles)).toContain(style.fontFamily);
    }
  });

  it('uses the condensed cut for display, title and heading', () => {
    expect(type.display.fontFamily).toBe('ArchivoCondensed-Black');
    expect(type.title.fontFamily).toBe('ArchivoCondensed-Black');
    expect(type.heading.fontFamily).toBe('ArchivoCondensed-Black');
    expect(type.body.fontFamily).toBe('Archivo-Medium');
  });

  it('refuses fonts DESIGN.md does not allow', () => {
    expect(() => fontFamilyFor({ fontFamily: 'DM Mono', fontWeight: '500' })).toThrow();
    expect(() => fontFamilyFor({ fontFamily: 'Archivo', fontWeight: '400' })).toThrow();
  });
});

describe('padding', () => {
  it('reads CSS shorthands', () => {
    expect(padding('0 22px')).toEqual({ paddingTop: 0, paddingRight: 22, paddingBottom: 0, paddingLeft: 22 });
    expect(padding('0 16px 0 6px')).toEqual({ paddingTop: 0, paddingRight: 16, paddingBottom: 0, paddingLeft: 6 });
    expect(padding(4)).toEqual({ padding: 4 });
  });
});

describe('crew colors', () => {
  it('has a fill and a deep shade for every crew color', () => {
    for (const name of crewOrder) {
      const crew = crewColors(name);
      expect(crew.fill).toMatch(/^#/);
      expect(crew.deep).toMatch(/^#/);
      expect(crew.deep).not.toBe(crew.fill);
    }
  });
});
