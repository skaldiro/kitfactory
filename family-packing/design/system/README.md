# kitmunk

Packing for the whole crew, minus the thinking.

kitmunk is a family packing app for iOS and Android. Parents describe a trip; Scout, the in-app AI, makes a list for every person; the family packs together. This system is v1.0 of its design, taken from the reviewed design canvas on Nov 21, 2026. If a screen and this system disagree, this system wins and the screen gets fixed. If this system and `docs/spec-v2.md` disagree on behavior, the spec wins.

## The concept: a calm ground, a bright Scout

Most of the app is quiet: pine ink on a pale mist ground, white cards, one typeface. The only loud color is flare orange, and it belongs to Scout. That makes three things legible at a glance: what is fact (solid, ink), what Scout guessed (dashed, flare) and who something belongs to (a crew color). Everything else stays out of the way so a parent can pack with a toddler on one arm.

## Three rules

1. **Orange means Scout.** A button is `flare` only when it hands work to Scout or applies what Scout proposed: Plan a trip, Create our packing list, Ask Scout (and its send button), Apply N changes, Create the list from a past trip, Sort them for me. At most one per screen. Every other main button is `ink` on light screens and `mist` on dark ones. Progress, tags and links never use flare. (Decision 29.)
2. **Dashed means a guess.** Anything Scout inferred gets a dashed flare underline (`Assumed`) or a dashed card (`ScoutCard`) so people know what to check. Solid means fact. Every Scout suggestion can be skipped, and nothing changes a list or memory without a yes.
3. **Everyone is a circle.** Adults and kids look the same: a crew color and an initial (`CrewAvatar`). Age is the caption, not a different shape.

## Color

- Ground `mist`, surfaces `card`, text and main buttons `ink`. Secondary text `muted`. Dark screens are `ink` with `mist` text, `on-ink-soft` body and `on-ink-label` labels.
- `flare` is a fill, never text on light grounds. Scout's words in color use `scout-text`.
- Every outline a person must see uses `edge`: inputs, unselected chips, secondary buttons, empty checkboxes. `line` is decoration only; `divider` separates rows. (Decision 35.)
- `danger` only on a destructive confirm. `done` (#0B7A54) for completed states; crew mint keeps #0F8A5F as its deep shade.
- Crew colors: each person gets a pair in order (blue, mint, yellow, pink, lavender, peach). The light one fills the avatar under an ink initial; the `-deep` one draws their ring, checkbox and progress. Shared items use `crew-shared` (ink) with the initials Us.

## Type

Archivo only, from Google Fonts (variable, `wdth` 62 to 125, `wght` 100 to 900). Two widths: 100% for reading, 62.5% (`font-stretch: 62.5%`) for display, title and heading. Weights 500, 600, 700 and 900 only. Sentence case everywhere; the uppercase `label` style is the one exception. Numbers in counts are never a bare percentage: "74 of 160 packed".

## Layout and shape

- Phone frame 390 by 844 points. Screen edge `space-4` (16). Gaps from 4, 8, 12, 16, 24.
- Touch targets at least `size-touch` (44). Inputs, item rows and category headers 48. Main buttons and the Scout bar 56.
- Radii: `radius-tag` 8 for tags and item checkboxes, `radius-control` 14 for buttons, inputs and toasts, `radius-card` 22 for cards and sheet tops, `radius-pill` for chips, round buttons and avatars.
- Flat. The only shadow, `shadow-float`, is for the floating chips on the dark first-run screen.

## Motion

- Tap feedback 120ms ease-out. Sheets and toasts 240ms ease-out. The packing header collapses with scroll (smoothstep).
- Scout progress moves one stage per 1.8s. The first-run case loops every 8s while its ribs fill.
- Reduced motion turns every loop off and shows the end state.

## Iconography

Line icons on a 24 grid, round caps and joins, stroke 2.2 (2.4 for close, arrows and chevrons), in `ink` or `muted`. In the app use **lucide-react-native** with `strokeWidth={2.2}`: back is `ChevronLeft`, menu is `Ellipsis` (filled dots), add `Plus`, send `ArrowUp`, go `ArrowRight`, mic `Mic`, dates `Calendar`, delete `Trash2`, bag `Briefcase`. Two marks are custom and live in `assets/Logos/`: the kitmunk case and Scout's mark. Never emoji. Icon-only buttons always carry an accessibility label.

## Words

- Dates: Nov 20–29; a stop: Nov 23 → 26.
- Ages: Under 1, 3 yrs, Adult.
- People: "people" and "crew", never only "family" or "kids".
- Scout speaks in the first person, short, never cute. Scout names a trip from its stops: the country, or a route ("Rome to Cinque Terre").
- Privacy: never sold, never used for ads or AI training. Voice is turned into text on the phone; audio is never saved.

## Feedback

Everything that is not destructive gets Undo (`Toast`, 5 seconds) instead of a confirm. Destructive actions always confirm (`ConfirmCard`).

## Components

`window.Kitmunk` (React 18, `components/bundle.js`): Logo, ScoutMark, Button, IconButton, Chip, Segmented, Stepper, Switch, PackCheck, Tag, TextField, CrewAvatar, ItemRow, CategoryCard, ScoutCard, Assumed, ScoutBar, MicButton, Toast, ConfirmCard, SheetHeader. These are web references for the look and behavior. The app rebuilds them in React Native from `design/DESIGN.md` and `design/tokens.json`; do not port this HTML.

## Settled on Nov 21 (decisions 29 and 35)

- Inputs and unselected chips are outlined in `edge` (3.6:1), not `line` (1.4:1).
- `done` is #0B7A54 (5.4:1 on card).
- The outline button on ink uses `on-ink-border` #5E8A7C (3.9:1).
- Orange also covers "Apply N changes" (Scout sheet) and "Sort them for me" (bags): both apply or request Scout's work.

## Not drawn yet

App icon and splash at final size (W3-06), paywall (only if decision 6 is paid), offline banner, push prompts.
