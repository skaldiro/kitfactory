# Design files

- `DESIGN.md`: the design system v1.0 in Google's DESIGN.md format: tokens in the front matter, rules in the body, opening with the design concept. **The source of truth for look.** Read it first.
- `tokens.json`: generated from `DESIGN.md` by `build-tokens.py`, shaped for React Native (numbers in points, references resolved). The only allowed source of visual values in code. Never edit it by hand.
- `build-tokens.py`: `python3 family-packing/design/build-tokens.py` rewrites `tokens.json`; `--check` fails when it is stale (for `scripts/check.sh`).
- `system/`: export of the kitmunk design system artifact (https://claude.ai/artifact/R6zQCD9E3A94yNTjBN3MQw): brand book (`README.md`), its tokens, web reference components with previews (`components/`), and the logo and Scout mark SVGs (`assets/Logos/`).
- `screens.md`: every screen, its route, where it goes and which states to build. Start here for behavior and navigation.
- `screens/*.png`: one image per artboard of the v1.0 canvas, rendered at 2x from `source/` and named after its file (W1-14).
- `source/*.dc.html`: the v1.0 canvas files (Nov 21), one per artboard. Reference, not code to ship.

## Reading a `.dc.html` source file

Each file is a self-contained screen at 390 by 844 points.

- The markup inside `<x-dc>` is the layout. Inline `style` values are exact sizes, colors and spacing.
- `{{name}}` is a value computed in the script at the bottom, in `renderVals()`. The script's sample data shows real copy, item names and counts.
- `<sc-for list=...>` repeats its contents for each item. `<sc-if value=...>` shows its contents only when true. Together they show every state the screen has.
- `onClick` handlers in the script show the intended behavior, for example how undo restores the previous packed quantity.
- `<a href="Other.dc.html">` is a link to another screen. See `screens.md` for the route each file maps to.

Rebuild screens as React Native components using `tokens.json`. Do not port the HTML or its script directly. Where a source file and `DESIGN.md` disagree on a value, `DESIGN.md` wins.

## Keeping this folder current

The design canvas (https://claude.ai/artifact/LokjSwqPYHJoJDvZWz5auF) is where screens are drawn. When a design changes there, Claude exports the changed files here in a pull request titled `family-packing/design: <what changed>`, and updates `DESIGN.md` first if a token or rule changed.
