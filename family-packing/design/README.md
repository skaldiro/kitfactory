# Design files

- `screens.md`: every screen, its route, where it goes and which states to build. Start here.
- `tokens.json`: colors, type, radii, spacing. The only allowed source of visual values.
- `source/*.dc.html`: one file per artboard from the design canvas. These are reference, not code to ship.
- `screens/*.png`: one image per screen. Added in a later export.

## Reading a `.dc.html` source file

Each file is a self-contained screen at 390 by 844 points.

- The markup inside `<x-dc>` is the layout. Inline `style` values are exact sizes, colors and spacing.
- `{{name}}` is a value computed in the script at the bottom, in `renderVals()`. The script's sample data shows real copy, item names and counts.
- `<sc-for list=...>` repeats its contents for each item. `<sc-if value=...>` shows its contents only when true. Together they show every state the screen has.
- `onClick` handlers in the script show the intended behavior, for example how undo restores the previous packed quantity.
- `<a href="Other.dc.html">` is a link to another screen. See `screens.md` for the route each file maps to.

Rebuild screens as React Native components using `tokens.json`. Do not port the HTML or its script directly.

## Keeping this folder current

The design canvas lives in the founders' Claude chat. When a design changes there, Claude exports the changed files here in a pull request titled `family-packing/design: <what changed>`.

## Brand placeholders

The "kitbag" wordmark and the logo on these screens are placeholders. The name has a legal conflict and will be replaced (decision 1), with a new logo after it (decision 2).
