# Screens

36 screens from the design canvas (Design v1.0, reviewed Nov 21 2026). Each row names its canvas file; the image is `screens/<same name>.png` (for example `Pack.dc.html` → `screens/Pack.png`). The files in `source/` are still the v0.9 export and are being refreshed; where a `source/` file and its image differ, the image and `DESIGN.md` win. Routes are proposals for Expo Router. Sheets open over the screen named in "Opens from".

`DESIGN.md` and `tokens.json` are the source of truth for values, the images for layout. `docs/spec-v2.md` (week 2) is the source of truth for behavior.

## 01 · Start a trip

| ID | Source | Screen | Route or type | Opens from | Goes to | States to build |
| --- | --- | --- | --- | --- | --- | --- |
| S01a | `Main.dc.html` | Home, first run | `/` (no trips) | App launch | S02, S13 sign in | Default |
| S02 | `Describe.dc.html` | Trip basics: stops, when, crew, activities, notes | `/trips/new` | S01 | S02b, S03 | Dates or length mode; mic idle or listening; Scout caught chips |
| S02b | `DatePicker.dc.html` | Date picker | Sheet | S02 | S02 | Leave picked; range picked; past days disabled |
| S03 | `Clarify.dc.html` | Scout's tailored questions, auto weather | `/trips/new/questions` | S02 | S04 | Question 1 to 3; answered with Change; skipped shows ASSUMED; done |
| S04 | `Review.dc.html` | Trip ticket review | `/trips/new/review` | S03 | S04b | Assumptions dashed orange |
| S04b | `Generating.dc.html` | Generating | `/trips/new/generating` | S04 | S05 or S04c | Stage 1 to 3; done |
| S04c | `GenError.dc.html` | Generation failed | `/trips/new/error` | S04b | Retry, basic checklist, edit | Retrying |

## 02 · Pack it

| ID | Source | Screen | Route or type | Opens from | Goes to | States to build |
| --- | --- | --- | --- | --- | --- | --- |
| S05 | `Reveal.dc.html` | Trip home | `/trips/[id]` | S04b, home | S06, Bags, menu, Scout | First visit vs in progress; Scout card 1 to 3, answered, undo, caught up |
| S06 | `Pack.dc.html` | Packing workspace | `/trips/[id]/pack` | S05 | S07, S07b, S08 | Person selected; filter To pack, Packed, To buy; category open or closed; toast with undo; empty filter |
| S06b | `PackScrolled.dc.html` | Packing, header collapsed | Same route, scrolled | S06 | Same | Collapses when list scrolls past about 170 points |
| S07 | `Item.dc.html` | Item sheet | Sheet | S06 row tap | S06 | Need and packed steppers; zero warning; have, need to buy, bought; bag; note with mic |
| S07b | `AddItem.dc.html` | Add an item | Sheet | S06 plus button | S06 | Parsed name, quantity, owner, category; quick adds; mic |
| S08a | `ScoutStart.dc.html` | Ask Scout, opening | Sheet | S06 Scout bar, S05 | S08 | Idle; listening |
| S08 | `Scout.dc.html` | Ask Scout, change preview | Sheet | S08a | S06 | Per-line toggles; apply count; memory prompt remember, just this trip, change |
| S10 | `Bags.dc.html` | Bags | `/trips/[id]/bags` | S05 tile, menu | S10b | Bag expanded; Scout sort idle, preview, done, undo |
| S10b | `BagSheet.dc.html` | Bag setup | Sheet | S10 | S10 | Rename, type, remove, add; Scout suggestion |
| M1 | `TripMenu.dc.html` | Trip menu | Sheet | S05, S06 | S04, S10, S11, S12 | Archive confirm; delete confirm |
| D1 | `Done.dc.html` | All packed | `/trips/[id]/done` | S06 at 100 percent | Home | Door checklist |

## 03 · Home and family memory

| ID | Source | Screen | Route or type | Opens from | Goes to | States to build |
| --- | --- | --- | --- | --- | --- | --- |
| S01b | `Trips.dc.html` | Home, returning family | `/` (has trips) | App launch | S05, S02, S12, S09, account | Upcoming, past rows |
| S01c | `Loading.dc.html` | Home loading | `/` | App launch | S01b | Skeletons |
| S01d | `HomeError.dc.html` | Home could not load | `/` | App launch | Retry, cached trip | Retrying |
| S01e | `PastTrips.dc.html` | Past and archived trips | `/trips/past` | S01b | S12, S05 | Past tab, Archived tab, empty |
| S09 | `Crew.dc.html` | Crew and Scout's memory | `/family` | S01b, account | S09b | Pattern prompt; forget and undo |
| S09b | `Profile.dc.html` | One person, edit or add | `/family/[id]`, `/family/new` | S09 | S09 | Kid or adult; color; type or talk; Scout heard cards; always pack; travels with; notes |
| S12 | `Repeat.dc.html` | Pack like a past trip | `/trips/new/from/[id]` | S01b, S01e, M1 | S01b | Kept, swapped, added, dropped |

## 04 · Accounts and sharing

| ID | Source | Screen | Route or type | Opens from | Goes to | States to build |
| --- | --- | --- | --- | --- | --- | --- |
| S13 | `SignIn.dc.html` | Sign in or save | Modal | S01, S05, S13b | Back to origin | Apple, Google, email link sent |
| S13b | `Join.dc.html` | Join from an invite | Deep link | Invite link | S13 | Default |
| S11 | `Share.dc.html` | Pack together, invites | `/household` | S06 Live chip, M1, account | Same | Pending invite resend; link copied; invite sent |
| A1 | `Account.dc.html` | Account and settings | `/account` | S01b | S11, S09 | Units, packing style, toggles, export, delete, sign out |

## 05 · Shared patterns (added in v1.0)

| ID | Source | Screen | Route or type | Opens from | Goes to | States to build |
| --- | --- | --- | --- | --- | --- | --- |
| S09c | `Memory.dc.html` | What Scout remembers | `/family/memory` | S09 | S09 | Waiting-for-OK card; filter by person; search; forget with undo |
| A2 | `Privacy.dc.html` | Your data and privacy | `/account/privacy` | A1, S13 | A1 | Default |
| V1 | `VoiceRecord.dc.html` | Voice, recording | Full-screen modal | Every mic | V2 | Listening with live text; cancel |
| V2 | `VoiceTranscribe.dc.html` | Voice, transcribing | Full-screen modal | V1 | Back to origin, fields filled | Transcribing; done |
| C1 | `Confirm.dc.html` | Destructive confirm (9 variants in the canvas props) | Dialog | Trip menu, A1, S09b, S11 | Back to origin | Delete trip, remove person, leave household, delete account and others |

## Reference boards (not screens)

| Source | What it is |
| --- | --- |
| `V2System.dc.html` | Design system v1.0 board (image `screens/V2System.png`). Replaces `System.dc.html` and `Logo.dc.html`, which are v0.9 leftovers in `source/` |
| `canvas.json` | Canvas layout and artboard titles |

## Not drawn yet

Paywall and manage plan (only if decision 6 is paid), app icon and splash at final size (W3-06), push notification prompts, onboarding for a second adult after joining, offline banner.
