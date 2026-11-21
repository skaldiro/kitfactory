---
version: alpha
name: kitmunk
description: Design system v1.0 for the kitmunk family packing app (iOS and Android). Source of design/tokens.json. From the reviewed design canvas, Nov 21, 2026.
colors:
  primary: "#0E2A23"
  ink: "#0E2A23"
  mist: "#EEF1EA"
  card: "#FFFFFF"
  flare: "#FF5B23"
  deep: "#163A31"
  contour: "#21463B"
  danger: "#B42318"
  danger-tint: "#FDECEA"
  line: "#D9DFD6"
  divider: "#EDF0EA"
  track: "#E3E8E0"
  edge: "#7D8B85"
  muted: "#56665F"
  scout-text: "#B23A0B"
  scout-tint: "#FFF9F6"
  row-highlight: "#F6F8F3"
  done: "#0B7A54"
  on-ink-soft: "#B6C8C0"
  on-ink-label: "#9FB5AC"
  on-ink-border: "#5E8A7C"
  scrim: "rgba(14, 42, 35, 0.55)"
  crew:
    blue: "#AFC6FF"
    blue-deep: "#2D55D6"
    mint: "#7BE0B5"
    mint-deep: "#0F8A5F"
    yellow: "#FFC94A"
    yellow-deep: "#B57A00"
    pink: "#FF9BAE"
    pink-deep: "#E0476A"
    lavender: "#C9B8FF"
    lavender-deep: "#6A4FD0"
    peach: "#FFB38F"
    peach-deep: "#C4561D"
    shared: "#0E2A23"
    shared-ink: "#EEF1EA"
typography:
  display:
    fontFamily: Archivo
    fontSize: 64px
    fontWeight: 900
    lineHeight: 0.88
    letterSpacing: -0.01em
    fontVariation: "'wdth' 62.5"
  title:
    fontFamily: Archivo
    fontSize: 40px
    fontWeight: 900
    lineHeight: 0.95
    fontVariation: "'wdth' 62.5"
  heading:
    fontFamily: Archivo
    fontSize: 28px
    fontWeight: 900
    lineHeight: 1
    fontVariation: "'wdth' 62.5"
  subhead:
    fontFamily: Archivo
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: Archivo
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.45
  body-strong:
    fontFamily: Archivo
    fontSize: 16px
    fontWeight: 700
    lineHeight: 1.2
  small:
    fontFamily: Archivo
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
  label:
    fontFamily: Archivo
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: 0.06em
rounded:
  tag: 8px
  control: 14px
  card: 22px
  pill: 999px
spacing:
  1: 4px
  2: 8px
  3: 12px
  4: 16px
  6: 24px
  screen-edge: 16px
  touch: 44px
  input: 48px
  button: 56px
  toast: 52px
motion:
  tap:
    duration: 120ms
    timingFunction: ease-out
  sheet:
    duration: 240ms
    timingFunction: ease-out
  check:
    duration: 160ms
    timingFunction: ease
  row-highlight:
    duration: 300ms
    timingFunction: ease
  scout-stage:
    duration: 1800ms
    timingFunction: linear
  undo-window:
    duration: 5000ms
    timingFunction: linear
components:
  button-scout:
    backgroundColor: "{colors.flare}"
    textColor: "{colors.ink}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.control}"
    height: 56px
    padding: 0 22px
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.mist}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.control}"
    height: 56px
    padding: 0 22px
  button-on-dark:
    backgroundColor: "{colors.mist}"
    textColor: "{colors.ink}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.control}"
    height: 56px
  button-ghost-on-dark:
    textColor: "{colors.mist}"
    borderColor: "{colors.on-ink-border}"
    borderWidth: 1.5px
    typography: "{typography.body-strong}"
    rounded: "{rounded.control}"
    height: 56px
  button-secondary:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    borderColor: "{colors.edge}"
    borderWidth: 1.5px
    typography: "{typography.body-strong}"
    rounded: "{rounded.control}"
    height: 56px
  button-danger:
    backgroundColor: "{colors.danger}"
    textColor: "#FFFFFF"
    typography: "{typography.body-strong}"
    rounded: "{rounded.control}"
    height: 56px
  icon-button:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    size: 44px
  chip:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    borderColor: "{colors.edge}"
    borderWidth: 1.5px
    typography: "{typography.small}"
    rounded: "{rounded.pill}"
    height: 40px
    padding: 0 14px
  chip-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.mist}"
    rounded: "{rounded.pill}"
    height: 40px
  input:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    borderColor: "{colors.edge}"
    focusBorderColor: "{colors.ink}"
    borderWidth: 1.5px
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    height: 48px
    padding: 0 14px
  segmented:
    backgroundColor: "{colors.mist}"
    rounded: "{rounded.control}"
    padding: 4px
    height: 48px
  stepper:
    backgroundColor: "{colors.mist}"
    rounded: "{rounded.control}"
    height: 44px
  item-row:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    borderColor: "{colors.divider}"
    typography: "{typography.body}"
    height: 48px
    padding: 0 16px 0 6px
  pack-check:
    size: 26px
    rounded: "{rounded.tag}"
    borderWidth: 2px
    borderColor: "{colors.edge}"
  category-card:
    backgroundColor: "{colors.card}"
    rounded: "{rounded.card}"
  scout-card:
    backgroundColor: "{colors.scout-tint}"
    borderColor: "{colors.flare}"
    borderStyle: dashed
    borderWidth: 1.5px
    rounded: "{rounded.card}"
    padding: 14px 16px
  scout-bar:
    backgroundColor: "{colors.card}"
    borderColor: "{colors.edge}"
    borderWidth: 1.5px
    rounded: "{rounded.pill}"
    height: 56px
  toast:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.mist}"
    typography: "{typography.small}"
    rounded: "{rounded.control}"
    height: 52px
  sheet:
    backgroundColor: "{colors.card}"
    rounded: "{rounded.card}"
    scrim: "{colors.scrim}"
  tag-to-buy:
    textColor: "{colors.ink}"
    borderColor: "{colors.ink}"
    borderWidth: 1.5px
    rounded: "{rounded.tag}"
    height: 22px
  tag-bought:
    backgroundColor: "{colors.mist}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tag}"
    height: 22px
  avatar:
    rounded: "{rounded.pill}"
    ringWidth: 2.5px
    sizes: 28px 40px 48px 64px
---

# kitmunk design system v1.0

## Overview

**Concept: a calm ground, a bright Scout.** kitmunk helps a parent pack for the whole crew, often one-handed, often in a hurry. Most of the app is quiet: pine `ink` on a pale `mist` ground, white `card` surfaces, one typeface. The only loud color is `flare` orange, and it belongs to Scout, the in-app AI. That makes three things legible at a glance: what is fact (solid, ink), what Scout guessed (dashed, flare) and who something belongs to (a crew color).

Three rules carry the system:

1. **Orange means Scout.** A button is flare only when it hands work to Scout or applies what Scout proposed: Plan a trip, Create our packing list, Ask Scout (and its send button), Apply N changes, Create the list from a past trip, Sort them for me. At most one per screen. Every other main button is ink on light screens and mist on dark ones. (Decision 29.)
2. **Dashed means a guess.** Anything Scout inferred gets a dashed flare underline or a dashed card. Solid means fact. Every Scout suggestion can be skipped; nothing changes a list or memory without a yes.
3. **Everyone is a circle.** Adults and kids look the same: a crew color and an initial. Age is the caption.

The brand is Logo A, the Case: a luggage case whose four ribs are crew colors. The wordmark is "kitmunk", lowercase, Archivo 900 at 62.5% width. Assets: `design/system/assets/Logos/`.

This file and `design/system/` are the source of truth for look. Decisions 29 and 35 on the tracker set the orange-button and contrast rules. If a screen image in `design/screens/` disagrees with this file, this file wins. If this file and `docs/spec-v2.md` disagree on behavior, the spec wins; note the conflict in the pull request.

## Colors

- `mist` is the app background, `card` the surface for cards and sheets, `ink` the text and main-button color. `primary` is an alias of `ink`, kept for the DESIGN.md format.
- `muted` for secondary text, counts, placeholders (5.3:1 on mist). `edge` for every outline a person must see: inputs, unselected chips, secondary buttons, empty checkboxes, the Scout bar (3.6:1 on card). `line` is decoration only (card outlines, swatch borders, the bottom bar edge); `divider` separates rows in a card. (Decision 35.)
- `flare` is a fill, never text on a light ground (2.7:1 on mist). Text on flare is ink (4.9:1). Scout's words in color use `scout-text` on `card` or `scout-tint`.
- Dark screens (first run, hero cards) are `ink` with `mist` text, `on-ink-soft` body, `on-ink-label` labels, `deep` raised surfaces.
- `danger` only on destructive confirm buttons, with white text (6.6:1). `done` (5.4:1 on card) for completed states. Crew mint keeps #0F8A5F as its deep shade for rings and checks; `done` is a separate token.
- The outline button on ink uses `on-ink-border` (3.9:1).
- Crew colors: each person gets a pair in order: blue, mint, yellow, pink, lavender, peach. The light value fills the avatar under an ink initial; the `-deep` value draws the ring, checkbox and progress. Shared items use `shared` with a `shared-ink` initial "Us".

## Typography

Archivo only, variable (`wdth` 62 to 125, `wght` 100 to 900), loaded with expo-font from the Google Fonts static instances or the variable file. Two widths: 100% for reading, 62.5% (`wdth` 62.5) for `display`, `title` and `heading`. On React Native, where variable axes are unreliable, ship a static Archivo Condensed 900 instance (or Archivo at width 62.5 exported as its own family) for the three display styles. Weights 500, 600, 700, 900 only. Sentence case everywhere; `label` (uppercase, 0.06em tracking) is the one exception.

## Layout

Phone frame 390 by 844 points. Screen edge 16. Gaps on a 4-point scale: 4, 8, 12, 16, 24. Touch targets at least 44 by 44. Inputs, item rows and category headers 48 tall. Main buttons and the Scout bar 56. Tablets: not designed (decision 9 open).

## Elevation & Depth

Flat. Hierarchy comes from the card on mist, not from shadows. Sheets sit over `scrim`. The only shadow is on the floating chips of the dark first-run screen: `0 6px 16px rgba(0,0,0,0.18)`, and the case there: `0 14px 30px rgba(0,0,0,0.25)`.

## Shapes

`tag` 8 for tags and item checkboxes; `control` 14 for buttons, inputs, toasts and segmented tracks; `card` 22 for cards, Scout cards and sheet tops; `pill` for chips, filter pills, round icon buttons, the Scout bar and avatars.

## Motion & Micro-interaction

Tap feedback 120ms ease-out. Sheets and toasts 240ms ease-out. Checkbox fill 160ms. The row that just changed holds `row-highlight` for the 5-second undo window. The packing header collapses with scroll on a smoothstep curve. Scout's generating screen moves one stage per 1.8s. The first-run case loops every 8s while its ribs fill. Reduced motion turns every loop off and shows the end state.

## Voice & Content Strategy

- Dates: Nov 20–29; a stop: Nov 23 → 26. Ages: Under 1, 3 yrs, Adult. Counts: "74 of 160 packed", never a bare percentage.
- "People" and "crew", never only "family" or "kids".
- Scout speaks in the first person, short, never cute. It names a trip from its stops: the country, or a route ("Rome to Cinque Terre").
- Privacy promises: never sold, never used for ads or AI training. Voice is turned into text on the phone; audio is never saved.
- Buttons are verbs in sentence case: "Create our packing list", "Keep packing".

## Components

Reference implementations with live previews: the kitmunk design system artifact (https://claude.ai/artifact/R6zQCD9E3A94yNTjBN3MQw), exported to `design/system/`. Rebuild them in React Native from `design/tokens.json`; do not port the HTML.

- **Button**: `button-scout` (flare, Scout only, one per screen), `button-primary` (ink), `button-on-dark` (mist on ink screens), `button-ghost-on-dark` (outline on ink screens), `button-secondary` (card, edge outline), `button-danger` (destructive confirm only), text link (underlined, 14/600). Small size 44 tall.
- **Icon button**: round 44; card tone on mist, mist tone inside sheets. Always an accessibility label.
- **Chip**: one style, 40 tall, edge outline, selected is ink. Filter pills are chips 36 visible inside a 44 hit area, with a count.
- **Segmented**, **Stepper**, **Switch**: one of each. Switch is for settings only.
- **Pack check**: 26 square in the owner's crew color; empty (edge), partial (crew dash), done (crew-deep fill, white check). Hit area 44 by 48.
- **Item row**: check, name, optional tag (To buy outlined, Bought on mist), optional bag, quantity (×3, or 2 of 3). Done rows are struck through in muted.
- **Category card**: white card, 48 header with name and "N left" or "Done", collapses per person.
- **Crew avatar**: fill, 2.5 ring in the deep shade, initial 600. Sizes 28, 40, 48, 64. The ring becomes packing progress on the packing screen.
- **Scout card**: dashed flare on scout-tint, uppercase scout-text label with the Scout mark, ink and secondary actions (never orange inside it). **Assumed**: dashed flare underline on a value.
- **Scout bar**: white pill with an edge outline, Scout mark, placeholder, flare send disc; beside it an ink add button.
- **Mic**: every mic opens the full-screen recorder; recording is a flare disc with a pulse and a stop square.
- **Toast**: ink, 52 tall, text plus Undo, 5 seconds.
- **Confirm card**: destructive actions only; danger icon disc, title, body, danger and secondary buttons.
- **Sheet**: white, 22 top corners, over the scrim; header with title, optional label, mist close button; Scout's sheet adds its mark.

Icons: **lucide-react-native**, `strokeWidth={2.2}`, 20 or 24, color ink or muted. ChevronLeft (back), Ellipsis (menu), Plus, ArrowUp (send), ArrowRight (go), Mic, Calendar, Trash2, Briefcase (bag), X (close), ChevronDown, Check. The kitmunk case and Scout's mark are custom SVGs (`design/system/assets/Logos/`).

## Do's and Don'ts

- Do keep flare for Scout. Don't use it for progress, tags, links or a second button.
- Do mark every inference as dashed. Don't let Scout change a list or memory without a yes.
- Do give every non-destructive action Undo. Don't confirm anything that isn't destructive.
- Do use crew colors only to mean a person. Don't use them as decoration.
- Do use `edge` for any outline a person must see. Don't outline a control with `line` (1.4:1 on white).
- Do keep text at 4.5:1 or better. Don't put flare text on mist or card.
- Don't use emoji, gradients, extra fonts, or a percentage in place of a count.
