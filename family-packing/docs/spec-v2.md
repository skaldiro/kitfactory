# Kitmunk requirements spec v2

Status: **draft for review** (tracker W1-16, reviewed in W2-09, signed at the W2-13 meeting on Fri Nov 27 by approving its pull request).
Built from: design v1.0 (`design/source/`, exported Nov 21 2026), `design/DESIGN.md`, `docs/prd.md` v1.0, `docs/architecture.md` and the tracker's Decisions tab as of Nov 21 2026.

## How to use this spec

- This file is the source of truth for **behavior**. `DESIGN.md` wins on values (color, type, spacing, motion). The screen images and `design/source/` files win on layout and sample copy. The tracker's Decisions tab wins over everything; when a decision closes, this spec changes by pull request the same week.
- It replaces `docs/prd.md` and the "Decided" section of `family-packing/CLAUDE.md` once signed. Until then both stay.
- Every screen has an ID from `design/screens.md`. Every acceptance criterion has an ID (`S06-7`) so issues, tests and pull requests can quote it.
- Nothing here assumes an open decision. Where a screen depends on one, the text says **Depends on decision N** and gives the behavior to build until it closes.
- "Must" is a launch requirement. "Should" is wanted but can slip with a note in the pull request. Anything not written here is not required.
- Sample names (Nadia, Sam, Leo, Ivy; Italy, Nov 20 to 29) come from the canvas and are examples only.

## Contents

1. Open questions for the founders
2. Scope, design vs PRD conflicts, glossary
3. Rules that hold on every screen
4. Sections written by W2-16, W2-17, W2-18 and W2-26
5. Screens: start a trip (S01a, S02, S02b, V1, V2, S03, S04, S04b, S04c)
6. Screens: pack it (S05, S06, S06b, S07, S07b, S08a, S08, S10, S10b, M1, D1)
7. Screens: home and family memory (S01b, S01c, S01d, S01e, S09, S09b, S09c, S12)
8. Screens: accounts and sharing (S13, S13b, S11, A1, A2)
9. Shared dialogs (C1)
10. Not designed yet
11. Where each screen is built

---

## 1. Open questions for the founders

Answer these in W2-09 (comment on the pull request or tell Claude in the Project). Each has a recommendation; a question that maps to a tracker decision is closed there, not here. Every design vs PRD conflict is in section 2.2; the open ones point here (Q2, Q7, Q9, Q15 to Q19).

| # | Question | Where it bites | Recommendation |
| --- | --- | --- | --- |
| Q1 | Children's data: the tracker's proposal for decision 13 is "first name and age", but the design (S09b, A2) stores **birth month and year** so ages update on their own. Which? | S02, S09b, A2, data model | Birth month and year for kids, no full dates (matches the design and the W2-26 proposal). Close in decision 13. |
| Q2 | Trips entered by **length** ("10 days") instead of dates: what does Scout use for the weather on S03? | S02, S03 | Ask for the month in S02 when length mode is on ("Roughly when?", month picker, optional). With no month, S03 shows no weather card and Scout asks one weather question instead. |
| Q3 | Bags show "Sam carries it" (S10). Is a carrier per bag in scope, given decision 5 (no packing assignment)? S10b has no carrier field. | S10, S10b | Out of scope at launch. Show the bag type ("Checked", "Carry-on") in that line. Revisit with packing assignment. |
| Q4 | Who can delete a trip, remove a person, or invite? Today every adult in the household can do everything. | M1, C1, S11 | Every adult can do everything, and every destructive action names the household impact in its confirm. No roles at launch. |
| Q5 | The household creator is shown as "owner" (S11). What happens when the owner leaves or deletes their account? | S11, A1, C1 | Ownership passes to the adult who joined earliest. If no adult is left, the household and its trips are deleted with the account (the confirm says so). |
| Q6 | A guest with their own trip on the phone accepts an invite to another household (S13b). What happens to the guest's trip and crew? | S13b, data model | The guest's trips and crew move into the household they join; nothing is dropped. The join screen says "Your Italy trip comes with you" when there is one. |
| Q7 | Item quantity zero: screens.md lists a "zero warning" on S07, the canvas clamps Need at 1, and the PRD says zero-quantity items are removed. | S07 | Need never goes below 1. Pressing minus at 1 shows "Remove from list?" inline; tapping it removes the line with undo (2.2). |
| Q8 | D1 (All packed) is listed with a "door checklist" in screens.md, but the canvas shows only the crew. Is a last-minute door checklist (passports, chargers, keys) wanted at launch? | D1 | Not at launch. D1 ships as drawn; door checklist is in Later (2.1). |
| Q9 | S04b's stages show real trip details ("Rome 46 to 60°F"). The PRD says loading text must not claim model steps it didn't do. | S04b | Stage text is built from the trip and the run's real results where they exist (weather, counts); timing is cosmetic (one stage per 1.8 s) and the last stage waits for the real result. |
| Q10 | "Default packing style" in A1 and the style question in S03 overlap. | S03, A1 | When a default is set, Scout does not ask the style question; S04 shows the style as a fact with Change. |
| Q11 | Guest Scout limit (W6-03): how many Scout runs before sign-in? | S02 to S08 for guests | Proposed: 3 list builds and 10 change requests per phone per 30 days. Set with decisions 6 and 11. |
| Q12 | Temperatures are drawn in °F and A1 has a °F/°C switch. Default unit? | S03, S04, S05, A1 | Depends on decision 10. Until then: °F if the phone's region is US, else °C; the A1 switch overrides. |
| Q13 | A2 promises "deletes them within 30 days" for Anthropic and "never used to train AI models". | A2, W2-26 | Keep the copy, but W2-26 must confirm the vendor terms (and whether to ask for zero data retention) before beta. A promise we can't back is removed, not softened. |
| Q14 | Limits and timings this draft had to pick, none from a decision: item name 60 and note 300 characters; quantities 1 to 99; trip name 40; person name 30; invite valid 7 days; list result within 20 s at p95; tap response within 100 ms; magic link 15 minutes (from the design); sync retries 3 times before showing "Not synced yet". | Throughout | Accept as drafted unless one looks wrong. Latency budgets per Scout job are replaced by W2-17's. |
| Q15 | Confirm the four cuts in section 2.1: Scout bag sort and bag suggestion, memory pattern suggestions, presence and the Recent feed, and in-app voice. | S10, S10b, S09c, S11, S01b, V1, V2 | Cut all four. Voice is closed by decision 8; recommend keyboard dictation for launch. |
| Q16 | Trip creation: the PRD's single free-text box or the design's form with a note (P5)? | S02 | The form. It works offline and without Scout, which a free-text-first flow can't. "Rather just talk?" covers the free-text feel. |
| Q17 | Where a new trip lands: trip home (S05) or straight into packing (S06)? (P8) | S04b, S05 | S05. Scout noticed cards need a place to be seen once; every later visit is one tap from packing. |
| Q18 | Is an "All items" view (every person's items in one list) needed? (P10) | S06 | No. The To buy tile and per-person filters cover the real uses; Later if testers ask. |
| Q19 | Should guest data expire? (P15) | Guest storage | No expiry. Deleting the app deletes it. |

---

## 2. Scope and glossary

### 2.1 Scope for launch (week of March 1, 2027)

Sized to the tracker's 16 weeks: 9 build weeks (3 to 11, with weeks 6 and 7 over the holidays), feature freeze at the W11-07 meeting on Sat Jan 30, then beta and launch. About 24 build issues fit if each lands in its week; the heavy weeks are 5 (four screen issues), 8 (Scout changes plus voice) and 11 (Apple sign-in, invites, live packing, concurrent edits). The cuts below take load out of exactly those weeks.

**Amendment rule.** An item moves up from Later or Never only with evidence from at least 3 testers (beta notes, tester calls or filed issues), recorded on the tracker's Decisions tab and changed here by pull request. After feature freeze (W11-07), nothing moves up before launch; it goes to the first post-launch cycle. Must-have items can move down at any time by a founders' decision, to protect the date.

**Must have** (every screen in sections 5 to 9 unless listed below)

| Area | What | Built in |
| --- | --- | --- |
| Start a trip | S01a, S02 (form, stops with dates or length, crew, activities, note), S02b, S04 | W3-01, W3-02 |
| Rule-based list | Catalog v1, quantity rules, list for every traveler plus Shared, works offline | W3-03, W4-01 |
| Packing | S05, S06, S06b, S07, S07b, D1; progress by item lines; undo everywhere | W4-02, W5-03, W5-04 |
| Bags | S10 and S10b, manual only (no Scout sort, no Scout bag suggestion) | W5-03 |
| Trips | M1, S01b, S01c, S01d, S01e; archive, restore, delete | W5-04, W5-05, W10-04 |
| Scout: intake | Notes become Scout caught chips; up to 3 tailored questions; usual weather per stop (source per decision 7) | W6-02, W6-03 |
| Scout: list | Additions with reasons on top of the rule list; S04b, S04c; every fallback in architecture.md | W7-01, W7-02, W7-03 |
| Scout: changes | S08a, S08 with per-line preview, apply, undo; S05 Scout noticed cards (up to 3) | W8-01, W8-02 |
| Accounts | S13 with Apple (iOS), Google and email link; guest move with no rebuild; A1, A2; export; delete | W9-02, W9-03, W11-02 |
| Crew and memory | S09, S09b, S09c; memories only from an explicit yes in S08, S09b or S09c; forget with undo | W10-03 |
| Pack like a past trip | S12 with kept, swapped, added, dropped and per-line toggles | W10-04 |
| Sharing | S11 invites by link and email, S13b join, live check marks between phones, concurrent-edit rule, offline check marks | W11-04, W11-05 |
| Quality | Crash reporting, the agreed usage events (decision 13), scout_runs logging and alerts, accessibility pass (R18 to R22), security pass | W5-05, W12-01, W12-02 |

**Cut to Later to fit 16 weeks** (recommendation; confirm in W2-09, see Q15)

| Item | Why it goes | Effect on issues |
| --- | --- | --- |
| Scout "Sort them for me" in S10 and the Scout bag suggestion in S10b | A sixth Scout job with its own eval, for a screen decision 5 already moved off the main path | W5-03 unchanged; nothing added to W8 |
| Pattern suggestions in S09c ("You removed the umbrella from your last 3 trips") | Needs history across trips that beta families won't have yet; memory from explicit yes covers launch | W10-03 smaller |
| Presence ("Sam is packing now", "Packing Ivy's list now") and the Recent feed in S11 | Nice, not needed for two phones to pack one list; Realtime presence is extra work in the busiest week | W11-04 smaller |
| In-app voice (V1, V2), if decision 8 picks keyboard dictation | Native speech module needs a development build (week 11) and a permission flow; dictation on the keyboard already works in every text field | W8-02 loses voice; mics removed |

**Later** (not at launch; each needs the amendment rule to move up)

- Everything in the cut list above.
- Web version (decision 12, proposed later) and tablet layouts (decision 9).
- Packing assignment, "who packs it", and a carrier per bag (decision 5, Q3).
- Door checklist on D1 (Q8).
- Quick adds in S07b; moving an item to another person; drag to reorder; cancel a pending invite.
- Roles or permissions between adults (Q4).
- Place autocomplete in S02 (depends on decision 7's provider).
- Weather forecasts close to departure (if decision 7 picks climate averages).
- Push notifications (no prompts at launch).
- Paywall and purchases, if decision 6 is free at launch.
- Languages other than the launch language (decision 10).

**Never** (conflicts with a product rule or isn't this product)

- Scout changing a list, a trip or a memory without a yes (R2).
- Child accounts, child photos, full birth dates (R6).
- Ads, ad or tracking SDKs, selling data, using trips to train models (A2 promises).
- Uploading or storing voice audio.
- Itinerary planning, reservations, flight imports, passport storage, price comparison and shopping integrations, jet-lag advice, photo recognition of items (PRD "Not in this MVP"; none of them is packing).

### 2.2 Design vs PRD conflicts

The PRD (`docs/prd.md`) is v1.0 and its copy stops partway through S06; for S07 to S13 there is nothing to compare, and the design is the only source. Every conflict found is listed. **Resolved** means a closed decision, the stack, or a DESIGN.md rule already settles it and this spec follows that; **Open** points to a question in section 1.

| # | PRD says | Design or decisions say | Status | This spec does |
| --- | --- | --- | --- | --- |
| P1 | Mobile-first web app or PWA, not native | Native iOS and Android with Expo | Resolved by the stack (CLAUDE.md); web is decision 12 | Native only; web Later |
| P2 | No voice in v1 | Mic on S02, S07, S07b, S08a, S09b with V1 and V2 | Open: decision 8, Q15 | R17; cut to dictation recommended |
| P3 | Up to two collaborating adults | No cap on adults | Resolved by decision 15 | Any number of adults |
| P4 | No live weather APIs | Usual weather per stop on S03, S04, S05 | Open: decision 7, Q2 | Climate per stop, source per decision 7 |
| P5 | Trip creation is one free-text box ("Tell me about your trip"), AI parses it, manual form only as a failure fallback | Structured form with a note field and "Rather just talk?" voice | Open: Q16 | Follows the design: form first, Scout reads the note |
| P6 | Clarification asks who is coming, laundry and weather as questions | Crew and activities are in S02; weather is automatic; Scout asks only what's left | Resolved by the design (fewer questions, same facts) | S03 rules |
| P7 | Clarification may group related details in one round | One question per screen, at most 3 | Resolved by the design | S03 rules |
| P8 | After creating a trip, the checklist is the primary screen; overview is optional | Generating lands on trip home (S05), then Open the packing list | Open: Q17 | S05 first on a new trip; reopening a trip goes to S05 too |
| P9 | S05 actions "Start packing", "Make changes with AI", "Add family details"; a per-person preview | Scout noticed cards, Everyone's lists, To buy, Bags, Open the packing list; no "Add family details" | Resolved by the design | S05 as drawn; crew editing lives in S09 |
| P10 | Packing views By person, By bag, All items | By person only; bags on their own screen | Resolved by decision 5 for bags; "All items" is Open: Q18 | No All items view |
| P11 | Filters All, Unpacked, Packed, Need to buy | To pack, Packed, To buy; tap again for all | Resolved (same filters, different words) | S06 rules |
| P12 | Item row shows an optional responsibility label | No responsibility; packing assignment out | Resolved by decision 5 | No responsibility label |
| P13 | Zero-quantity items are removed or excluded | Need stepper stops at 1; screens.md lists a "zero warning" | Open: Q7 | Need ≥ 1; minus at 1 offers remove |
| P14 | Trip card actions: open, duplicate, edit, archive | Card opens S05; menu has edit, new trip from this one, archive, delete; past trips have Pack like this | Resolved by the design (duplicate is S12) | M1, S01e |
| P15 | Guest drafts discarded after migration **or expiration** | No expiry in the design | Open: Q19 | No expiry; guest data stays until moved or the app is deleted |
| P16 | Excludes complex offline synchronization | Tracker W11-05 includes check marks made with no signal | Resolved by the tracker (W11-05 is planned) | R10, R11; only check marks and item edits sync offline-first |
| P17 | Headline "Packing for the whole family" | "Packing for the whole crew" | Resolved by DESIGN.md words rule (R16) | Design copy |
| P18 | Children as profiles with age | Birth month and year stored, ages computed | Open: Q1, decision 13 | Depends on decision 13 |
| P19 | AI accessed through a floating or sticky action | Scout bar pinned at the bottom of S06; Scout opens from S05 cards too | Resolved (consistent) | S06, S08a |
| P20 | Loading messages indicate general progress, not real model steps | Generating stages show trip-specific details | Open: Q9 | Real trip data, cosmetic timing |
| P21 | Monetization outside the private beta | Paywall not designed | Resolved for beta; launch is decision 6 | Paywall Later if free |

Three conflicts inside the design, not with the PRD, are settled here by DESIGN.md's rule "don't confirm anything that isn't destructive": **Remove item**, **Archive trip** and **Forget a memory** use undo only, and their C1 variants are dropped from the canvas (S01e already archives without a confirm). The canvas gets the fix in the next design export.

### 2.3 Glossary

| Term | Meaning |
| --- | --- |
| Trip | One journey with dates or a length, one or more stops, a crew and a list. Belongs to a household. |
| Stop | A place on the trip with its own dates (or nights). Weather is estimated per stop. |
| Crew | The people in a household: adults (with or without accounts) and kids (profiles only). A trip uses some or all of the crew. |
| Shared | A pseudo-owner for items that belong to everyone (first-aid kit, adapters). Shown as "Us" in ink. |
| Item | A thing to pack, from the catalog or custom. |
| Item line | One item for one owner on one trip, with a required quantity, a packed quantity, a shopping state, an optional bag and an optional note. Progress counts item lines. |
| Bag | A container on a trip (checked case, carry-on, backpack, tote). Optional; an item line has at most one bag. |
| Assumption | A value Scout filled in without being told. Always shown dashed orange and always changeable. |
| Proposal | A change Scout wants to make to a list or to memory. Nothing applies until a person says yes. |
| Memory | A fact about a person or the household that Scout may use on future trips. Saved only after an explicit yes. |
| Guest | Someone using the app with no account. Everything lives on the phone. |
| Household | The unit that owns crew, trips and memories. Any number of adults with accounts (decision 15). |

---

## 3. Rules that hold on every screen

### 3.1 Product rules

- **R1 Guest first.** A guest can create a trip, get a full list and pack it with no account (decision 4). Signing in moves everything on the phone to the account unchanged: no regeneration, no lost check marks, no new IDs visible to the user.
- **R2 Nothing silent.** Scout never changes a list, a trip or a memory without a person approving it. List changes are previewed line by line (S08, S10). Memories need an explicit yes (S08, S09, S09b, S09c).
- **R3 Scout can fail; the user never loses input.** Every Scout call has a fallback (architecture.md, "How a Scout run works and fails"). Typed text, answers and check marks survive any failure, app restart or lost connection.
- **R4 Progress counts item lines.** An item line is done when packed quantity is at least required quantity. Counts read "74 of 160 packed", never a bare percentage. A person's ring and the trip total use the same rule.
- **R5 Packing and shopping are independent.** Shopping state is one of Have it, To buy, Bought. Changing it never changes the packed quantity, and packing never changes it.
- **R6 Kids are profiles.** No child accounts. What is stored about a child depends on decision 13 (Q1).
- **R7 Shared household.** Every trip, crew profile, bag, item line and memory belongs to a household. Any number of adults (decision 15). A new trip starts with 2 adults when the household has 2 or more, otherwise with the household's adults (decision 14).
- **R8 No packing assignment.** No "who packs it" at launch (decision 5). Bags live on their own screen, not in the packing workspace.

### 3.2 Interaction rules

- **R9 Destructive actions confirm; everything else undoes.** Delete, remove, leave, sign out, forget and discard go through C1. Every other change shows a toast with Undo for 5 seconds (DESIGN.md `undo-window`). Undo restores the exact previous state, including packed quantity and shopping state.
- **R10 Optimistic and durable.** Taps update the screen at once and are written to the phone's store before the next frame that depends on them. A sync failure never reverts a local change silently; it retries and, after 3 failures, shows a quiet "Not synced yet" line on trip home (S05). (Sync arrives in W9; until then everything is local.)
- **R11 Offline.** Packing, item edits, bags, past trips and the crew work offline. Anything that needs Scout or the server shows why it is unavailable and keeps the user's input ("Scout needs a connection. Your note is saved."). No offline banner is designed yet (section 10).
- **R12 Back never loses work.** Leaving S02 with any input asks C1 "Discard new trip". Leaving any other form keeps the draft on the phone until the trip is created or discarded.
- **R13 One orange button per screen** (decision 29). Orange only for: Plan a trip (S01a, S01b), Create our packing list (S04), Ask Scout and its send button (S06, S08a, S08), Apply N changes (S08), Create the list from a past trip (S12), Sort them for me (S10). Every other main button is ink on light screens and mist on dark ones. Red only on destructive confirms.
- **R14 Dashed means a guess.** Every value Scout inferred has a dashed orange underline or a dashed card until a person confirms or changes it. Confirming removes the dash. Solid means a person said it.
- **R15 Scout's voice.** First person, short, never cute. Scout names trips from their stops: the country when there is one, a route ("Rome to Cinque Terre") when it reads better. People can rename any trip.
- **R16 Words.** Dates "Nov 20–29" for a trip and "Nov 23 → 26" for a stop. Ages "3 yrs", "1 yr", "Under 1", "Adult". "People" and "crew", never only "family" or "kids". Privacy: "never sold, never used for ads or AI training".

### 3.3 Voice input

- **R17** Every mic opens V1 then V2 and lands back on the screen it came from with the fields filled and visible, plus a Scout-caught summary where the screen has one. Text is made on the phone; audio is never uploaded or saved. **Depends on decision 8**: until it closes, build the mic to use the phone's own speech recognition through V1 and V2; if decision 8 picks keyboard dictation only, mics are removed and nothing else changes.

### 3.4 Accessibility and quality bars (all screens)

- **R18** Touch targets at least 44 by 44 points. Text contrast at least 4.5:1 (decision 35 values). Every icon-only button has the accessibility label given in the design source. Every toggle and chip reports pressed state. Every screen can be completed with VoiceOver and TalkBack (W5-05).
- **R19** Dynamic type up to the largest standard size without clipped buttons or overlapping text; lists scroll instead.
- **R20** Reduced motion turns off every loop (first-run case, generating orbit) and shows the end state.
- **R21** Phones only, portrait. **Depends on decision 9** for tablets and oldest OS versions.
- **R22** Every screen has a loading, an empty and an error state, either drawn or defined below. A screen with no defined error state shows the shared one: "That didn't load. Your trips are safe." with Try again.

### 3.5 Scout states every AI moment uses

| State | What the user sees |
| --- | --- |
| Working | Scout mark, a short first-person line, the user's input still visible and editable where the layout allows. |
| Proposal | Dashed card or per-line preview. Every line skippable. Nothing applied. |
| Applied | Toast "Applied 4 changes" with Undo (5 s), lines highlighted for the undo window. |
| Fallback | The rule-based result with an honest line ("Scout couldn't help just now, so this is our basic list. You can ask Scout again later.") Never presented as Scout's work. |
| Limit | Plain message, no blame: "Scout's free help is used up for now. Save your trip to keep going." for guests; spend-cap version for accounts. Fallback result still shown. |
| Offline | "Scout needs a connection. Your note is saved." Input kept. |

---

## 4. Sections written by other tasks

These are added to this file by the tasks named. Screen sections below refer to them by name.

- **4.1 Intake questions and the trip data model**: W2-16 (due Wed Nov 25).
- **4.2 Scout: follow-ups, building lists, changing lists**: W2-17, detail in `docs/scout-design.md`.
- **4.3 Memory and context fed to Scout**: W2-18.
- **4.4 Privacy and data handling**: W2-26.

Until they land, screens use the behavior written in sections 5 to 9 and `docs/architecture.md`.

---

## 5. Screens: start a trip

### S01a · Home, first run

Source `Main.dc.html` · route `/` when the phone has no trips · built in W3-01.

**Purpose.** Get a new person to start a trip in one tap, with no account.

**Content.** kitmunk wordmark; Sign in (text button, top right); headline "Packing for the whole crew, minus the thinking."; one line on what Scout does; the animated case with four crew chips; "4 lists, packed."; **Plan a trip** (orange); "No account needed. Save it once you like it."

**States.** Default only. The case animation loops every 8 s; reduced motion shows the filled case (R20).

**Rules.**
- Shown when the phone has no trips and the user is not signed in, or is signed in to a household with no trips.
- Plan a trip opens S02 with an empty draft, or the saved draft if one exists (R12).
- Sign in opens S13; after sign-in, the household's trips load and the screen becomes S01b if any exist.
- No tour, no carousel, no permission prompts on this screen.

**Acceptance.**
- S01a-1 A fresh install shows S01a with no network request needed to render it.
- S01a-2 One tap on Plan a trip opens S02.
- S01a-3 A half-filled S02 draft reopens with its content after the app is killed.
- S01a-4 With reduced motion on, nothing on the screen moves.

### S02 · Trip basics

Source `Describe.dc.html` · route `/trips/new` · built in W3-01 (form), W6-02 (Scout reads the notes).

**Purpose.** Collect where, when, who and what, in one scrollable form, step 1 of 3.

**Content.**
- Header: back, "New trip · step 1 of 3", title "Tell me about your trip".
- "Rather just talk?" card: mic that opens V1 with context Trip. Scout fills the form from what was said.
- **Where and when**: trip span ("Nov 20–29 · 9 nights"), numbered stops on a rail, each with a place field, a date button and remove. "Add a stop". Helper: "Each stop gets its own dates, so Scout packs for the weather there."
- **Who's coming**: crew count; one row per person with avatar (crew color, initial), name, age select (Adult, Under 1, 1 yr to 17 yrs), remove. "Add someone".
- Chip groups: **Getting there** (Flying, Driving, Train, Ferry; pick all), **Staying in** (Hotel, Rental, Family or friends, Camping, Cruise; pick all), **What you'll do** (Sightseeing, Museums, Hiking, Beach, Swimming, Skiing, Theme park, Nice dinners, A wedding or event; pick any).
- **Anything else?**: multiline note with placeholder "Laundry, naps, a wedding, gear you rent there." and a mic.
- **Scout caught**: chips of facts Scout read from the note (for example "Laundry in Florence", "Stroller").
- **Continue** (ink).

**States.**
- Dates mode (default) or length mode: a stop's date button can switch to "Length: N nights" (Q2).
- Stop without dates: dashed date button "Add dates for this stop".
- Mic idle or listening (listening is V1).
- Scout caught: hidden when empty; chips appear as the note is read.
- Returning household: Who's coming is prefilled from the crew (all adults plus all kids), each removable for this trip.

**Rules.**
- At least one stop with a place is required. Place is free text; autocomplete is a Should (depends on the weather source, decision 7).
- Stops are in order; each stop's start is the previous stop's end by default. Changing a stop's dates moves the next stop's start to match and says so in S02b ("Cinque Terre moves to start the day you leave.").
- Dates: past days cannot be picked (S02b). A trip may have no dates if every stop has a length.
- At least one person is required. Names: 1 to 30 characters; duplicates allowed but get "Leo (2)" in lists. Ages: as listed. A person picked from the crew carries their profile; a new person here is added to the crew only after the trip is created, and S09 shows them.
- Chips are optional. "Pick all" groups are multi-select; nothing is preselected for a new household.
- Note: up to 2,000 characters. Scout reads it after 1 s of no typing and on Continue (W6-02). What Scout reads appears only as Scout caught chips; the note text itself never changes. A chip can be removed with one tap, which tells Scout to ignore that fact.
- Before W6-02 ships, notes are stored as typed and Scout caught is hidden.
- Continue is enabled when there is one place and one person. It saves the draft and opens S03.
- Back with any input opens C1 Discard new trip (R12).

**Acceptance.**
- S02-1 Create a trip with two stops, dates, 2 adults and a child; Continue opens S03 with all of it in the draft.
- S02-2 Changing stop 1's end date moves stop 2's start to the same day.
- S02-3 Continue stays disabled with no place or no person and says which is missing when tapped.
- S02-4 Typing "the apartment in Florence has a washer" shows a Scout caught chip "Laundry in Florence" within 2 s on a normal connection; removing the chip leaves the note text unchanged.
- S02-5 Offline, the form works and Continue saves the draft; Scout caught shows "Scout will read this when you're back online."
- S02-6 Back with input asks to discard; Keep editing returns with everything intact.
- S02-7 The mic returns from V2 with stops, people and note filled from the transcript, each Scout-filled value dashed until edited or confirmed (R14).

### S02b · Date picker

Source `DatePicker.dc.html` · sheet over S02 · built in W3-01.

**Content.** Sheet title "Dates in Florence" with "Stop 2 of 3"; Arrive and Leave fields; month grid with previous and next; the other stops' dates shown as tinted days with a legend ("Rome, then Cinque Terre"); a Scout line; the button.

**States.** Nothing picked; arrive picked ("Now tap the day you leave Florence."); range picked; past days disabled; today outlined.

**Rules.**
- First tap sets Arrive, second sets Leave. A tap before Arrive restarts the range. Same-day arrive and leave is allowed (0 nights, a day stop).
- Days before today are disabled and announced "in the past". The previous-month arrow is disabled on the current month.
- The Scout line counts nights and says what happens to the next stop.
- Button: "Pick the day you leave" (disabled look) until both are set, then "Set Florence dates" (ink).
- Overlap with another stop is allowed only at the boundary day; a range that swallows another stop asks "Move Cinque Terre too?" inline.

**Acceptance.**
- S02b-1 Past days can't be selected and VoiceOver reads them as in the past.
- S02b-2 Picking Nov 23 then Nov 26 shows "3 nights in Florence" and sets the stop.
- S02b-3 The month arrows move one month; previous is disabled on the current month.

### V1 · Voice, recording · V2 · Voice, transcribing

Sources `VoiceRecord.dc.html`, `VoiceTranscribe.dc.html` · full-screen modals · built in W8-02. **Depends on decision 8** (R17).

**V1 content.** Cancel; "Listening · 0:14"; context line and prompt (Trip: "Telling Scout about the trip"; Item: "Adding items"; Scout: "Asking Scout"); live text as it is heard; level bars; **Tap to finish**; "Turned into text on this phone. Audio is never saved."

**V2 content.** "Transcribing" then "Done"; "Writing it down…" then "Got it. Here is what I heard."; the transcript in quotes; **Check what Scout filled in** (ink); Record again.

**Rules.**
- The first mic tap asks for microphone and speech permission with the system prompt, preceded by one line on what it is for. If refused, the mic shows "Turn on the microphone in Settings to talk to Scout" and typing still works.
- Recording stops on Tap to finish, after 2 minutes, or on Cancel. Cancel discards the text and returns with nothing changed.
- Transcription runs on the phone. The transcript, not audio, is what Scout receives.
- Check what Scout filled in returns to the origin (S02, S07, S07b, S08a, S09b) with the fields filled; Scout-filled values are dashed (R14). Record again returns to V1.

**Acceptance.**
- V-1 No audio file is written outside temporary memory, and none is uploaded (checked by network log in W12-02).
- V-2 Refusing mic permission leaves the typed path fully working.
- V-3 Cancel in V1 returns to the origin with nothing changed.

### S03 · Scout's questions

Source `Clarify.dc.html` · route `/trips/new/questions` · built in W6-02 (questions) and W6-03 (weather, screen).

**Purpose.** Ask only what changes the list, one question at a time, at most three.

**Content.** Back; three-segment progress and "1 of 3"; weather card ("Usual weather for your dates", one column per stop with dates and a range, one summary line); answered rows with key, value and Change; the current question with "Asking because Ivy is 3", the question, why it matters, 2 to 4 option cards with a detail line, and a skip link; when done, Scout's closing card ("That's all I need. Underlined in orange means I guessed.") and **Review the trip** (ink).

**States.** Question 1, 2, 3; answered with Change; skipped shows the assumed value dashed; done; no questions needed (goes straight to done); weather loading; weather unavailable.

**Rules.**
- Questions come from Scout (W2-16 lists every allowed question and what it changes; W2-17 says how Scout picks 0 to 3). A question already answered in S02, the note, a default (Q10) or a confirmed memory is never asked.
- Each question says why it is asked ("Asking because …"). Picking an option saves it and advances. The skip link saves Scout's stated assumption marked as assumed and advances. A question with no safe assumption has no skip link and must be answered.
- Change on an answered row returns to that question with the current answer selected; later answers stay unless the changed answer makes them irrelevant, in which case they are removed and Scout may ask a different one.
- Weather: one range per stop for that stop's dates, from the source in decision 7; no forecast language unless decision 7 picks a forecast. If unavailable, the card says "I couldn't get the usual weather. I'll ask instead." and Scout may ask a weather question (counts toward the 3). Length-mode trips follow Q2.
- If Scout fails, S03 asks the fallback questions from W2-16 (a fixed short set) and logs a fallback run (R3). The user is not told unless the questions change.
- Back returns to S02 with every answer kept.

**Acceptance.**
- S03-1 A trip whose S02 already says laundry access is never asked about laundry.
- S03-2 Skipping a question shows the assumed value dashed in the answered rows and on S04.
- S03-3 Change on answer 1 returns to question 1 with the old answer selected.
- S03-4 No more than three questions are asked on any trip, including a weather question.
- S03-5 With Scout down, the screen still reaches Review the trip.

### S04 · Trip ticket review

Source `Review.dc.html` · route `/trips/new/review` · built in W3-01 (ticket), W6-02 (assumptions).

**Purpose.** Show the facts Scout will pack for, so the user can fix them before the list is made.

**Content.** Back; "New trip · step 3 of 3"; Edit; headline "Here's the trip I'm packing for"; the ticket: trip name ("Scout named it · tap to rename", other ideas), stop count and span, each stop with dates, nights, temperature range and sky; Who's coming with avatars and ages, Edit; **What Scout is using** with a coverage line ("All 6 covered") and fact rows (Getting there, Staying in, Laundry, Luggage, Doing, Packing style), assumed values dashed with "Scout's guess. Tap to change."; **Create our packing list** (orange).

**Rules.**
- The name is Scout's suggestion (R15); tapping it cycles through the suggestions, and a long press or the edit icon allows free text (1 to 40 characters). Before Scout, the name is the first stop's country or place.
- Every fact row is tappable and opens the matching S02 field or S03 question; editing returns here.
- "All N covered" counts the facts W2-16 says the list needs; a missing one reads "Laundry: not sure" dashed and the count reads "5 of 6 covered". Create still works with gaps.
- Create our packing list saves the trip (status building) and opens S04b. A double tap creates one trip, not two.

**Acceptance.**
- S04-1 The ticket shows every stop, date, person and fact entered in S02 and S03.
- S04-2 Assumed facts are dashed and lose the dash once changed or confirmed.
- S04-3 Tapping Laundry opens the laundry answer; changing it returns to S04 with the new value.
- S04-4 Two quick taps on Create make one trip.

### S04b · Generating

Source `Generating.dc.html` · route `/trips/new/generating` · built in W7-02 (screen), W4-01 (rule list), W7-01 (Scout additions).

**Content.** Dark screen; "Scout is packing for Italy"; crew orbit; "Packing for four."; five stages, each with a title and a detail line, done, active or pending; when ready, "Your lists are ready." and **See the list** (mist on ink); "Your trip is saved, even if something goes wrong."

**Rules.**
- The list is built as architecture.md describes: catalog and rules first, then Scout's additions validated against the schema.
- Stages advance one per 1.8 s (DESIGN.md). Stage text uses the trip's real stops, crew and counts (Q9). The last stage holds until the real result arrives.
- Success: "Your lists are ready." and See the list opens S05 in its first-visit state. The screen does not auto-advance; the button is the only exit besides back.
- Failure or fallback by architecture.md: if the rule list exists, open S05 with the fallback line (section 3.5); if nothing could be built, open S04c.
- Leaving the app during generation keeps the trip; reopening shows S04b if still running, else the result.
- Time budget: the result within 20 s at p95 on a normal connection (latency budgets per job come from W2-17).

**Acceptance.**
- S04b-1 The stage text names this trip's stops and people, never Italy sample text.
- S04b-2 Killing the app mid-generation and reopening it lands on the finished trip or on S04b, never on an empty trip.
- S04b-3 A forced Scout timeout opens S05 with the rule list and the honest fallback line, and logs `fallback: timeout`.
- S04b-4 With reduced motion, the orbit is still and stages switch without animation.

### S04c · Generation failed

Source `GenError.dc.html` · route `/trips/new/error` · built in W7-02.

**Content.** "Scout hit a snag"; "That didn't work."; "Your trip is saved exactly as you entered it. You don't need to retype anything."; the saved trip ticket (name, span, people, stops, Saved); **Try again** (ink); "Use a basic checklist" with what it is ("From our tested templates for 2 adults and kids aged 3 and 6. Scout can tailor it later."); Edit trip details.

**States.** Default; retrying (Try again shows progress and is disabled).

**Rules.**
- Shown only when no list could be made, including the rule list (for example the catalog failed to load).
- Try again reruns generation and returns to S04b.
- Use a basic checklist builds the rule-based list from the catalog only, with no Scout call, and opens S05 with the fallback line.
- Edit trip details opens S04.

**Acceptance.**
- S04c-1 Every field entered before the failure is still there after Try again, Edit, or an app restart.
- S04c-2 Use a basic checklist works in airplane mode.

---

## 6. Screens: pack it

### S05 · Trip home

Source `Reveal.dc.html` · route `/trips/[id]` · built in W4-02 (home), W8-02 (Scout cards).

**Content.** Back to all trips; Pack together; trip menu; kicker ("Your lists are ready · Nov 20–29" on first visit, "Nov 20–29 · leaving in 9 days" after); trip name; stops with dates and usual weather; progress ("160 things to pack" first visit, "74 of 160 packed" after); **Scout noticed** card with pager "1 of 3", title, body, a yes and a no; after an answer, a line with what happened and Undo; **Everyone's lists**: one row per person plus Shared with ring, name, age or role, "14 of 31"; **To buy** tile ("6 things to get first"); **Bags** tile ("4 bags · 44 items not in one yet"); **Open the packing list** (ink); for guests, "Save this trip to an account".

**States.** First visit vs in progress; Scout card 1 to 3; answered with undo; caught up (card hidden); fallback (the fallback line replaces the Scout card); no To buy items (tile reads "Nothing to buy"); no bags (tile reads "Add bags if you want them"); guest vs signed in; not synced yet (R10).

**Rules.**
- Scout noticed shows at most 3 cards per trip, one at a time. Each is a proposal (R2): yes applies its change to the list with the result line and Undo (R9); no records the choice and applies nothing. Answered cards don't come back. Card content comes from the list build (W2-17).
- A memory-worthy card (for example "Leo runs cold at night") asks separately to remember it (S08 memory rules).
- Person rows open S06 with that person selected. The rings and counts follow R4 and match S06 exactly.
- To buy opens S06 with the To buy filter on and the first person with To buy items selected.
- Bags opens S10. Pack together opens S11. The menu opens M1.
- "Save this trip to an account" opens S13 and returns here. It is never a blocking modal (R1).
- "Leaving in N days" counts from today to the first stop's start; on the day it reads "leaving today", during the trip "on the trip", after it "Back home" and the trip moves to past trips (S01e) the day after the last stop ends.

**Acceptance.**
- S05-1 First visit shows "160 things to pack" and no progress; after packing one item it shows "1 of 160 packed".
- S05-2 Answering "Makes sense" on card 1 shows its result line, Undo restores the card and the list.
- S05-3 Each person's count matches S06 for that person.
- S05-4 A guest sees the save prompt; a signed-in user doesn't.

### S06 · Packing workspace · S06b · Header collapsed

Sources `Pack.dc.html`, `PackScrolled.dc.html` · route `/trips/[id]/pack` · built in W4-02.

**Content.**
- Header: back to trip home, trip name, progress ("74 of 160 packed · in 9 days"), menu.
- Crew rail: one tile per person and Shared with a progress ring, initial and name; selected tile is white.
- Filters: **To pack N**, **Packed N**, **To buy N** (pills; tap again to clear).
- For the selected person: categories (Clothing, Toiletries, Sleep and comfort, Activities, Travel-day essentials, Other; only those with items), each with "N left" or "Done", open or closed. Rows: check box, name, To buy or Bought tag, bag tag, quantity ("×3", or "2 of 3" when partial).
- Collapsed header (S06b): after about 170 points of scroll, a compact bar with the trip name and mini rings replaces the big header (smoothstep, tied to scroll).
- Bottom: Scout bar "Ask Scout to change anything" (opens S08a) and an add button (opens S07b).
- Toast: "Packed Socks ×6 · Ivy" with Undo.

**States.** Person selected; filter To pack, Packed, To buy or none; category open or closed; row just changed (highlight for 5 s); partial row; toast with undo; empty filter ("Nothing here. Tap the filter again to see everything."); all done for a person ("Ivy is all packed." with the rail ring full); live updates (W11-04: other people's check marks animate in; the Live chip shows when another adult has the app open is Later).

**Rules.**
- Default person on open: the one tapped in S05, else the person with the most left to pack, else the first adult.
- Tapping a check box toggles the whole line: not done becomes packed quantity = required; done becomes packed quantity 0. Partial (0 < packed < required) becomes done. The toast names the item and owner; Undo restores the previous packed quantity exactly.
- Tapping the row (not the box) opens S07.
- With To pack on, a just-packed row stays visible for the 5-second undo window, then leaves.
- Filters never change data. Counts in the pills are for the selected person.
- Category open or closed is remembered per trip and person on the phone.
- Progress in the header, the rail, S05 and S01b all use R4 and always agree.
- When the whole trip reaches 160 of 160, D1 opens once (not again on later visits unless something is unpacked and repacked).
- Order: categories in the order above; items in catalog order, custom items last in the order added. No drag reordering at launch.

**Acceptance.**
- S06-1 Pack 3 of 5 socks in S07, close, kill the app, reopen: the row reads "3 of 5" and counts are unchanged.
- S06-2 Tapping the box on "Pajamas 2 of 3" makes it "×3" done; Undo returns "2 of 3".
- S06-3 With To pack on, a packed row stays visible 5 seconds with Undo, then disappears.
- S06-4 To buy shows only To buy items; marking one Bought in S07 removes it from the filter but not from the list, and doesn't pack it.
- S06-5 The header collapses after about 170 points of scroll and expands back at the top.
- S06-6 The header total, rail rings and S05 counts agree after any change.
- S06-7 VoiceOver reads each box as "Mark packed: Socks" or "Unpack: Socks" and each rail tile as "Ivy, 19 of 41 packed".
- S06-8 Packing 50 items in a row stays responsive (each tap reflected within 100 ms on a mid-range Android phone).

### S07 · Item sheet

Source `Item.dc.html` · sheet over S06 · built in W5-03.

**Content.** Sheet header "Edit item"; editable name; owner and category ("Ivy · Clothing"); Scout's reason when the item came from Scout ("Three because of a wash around day 5, plus a spare."); **Need** and **Packed** steppers ("2 of 3"); **Shopping**: Have it, To buy, Bought; **Bag**: No bag yet, then each trip bag (optional); **Note** with a mic; Remove from list; **Done** (ink).

**Rules.**
- Need: 1 to 99 (Q7 for zero). Lowering Need below Packed lowers Packed to match.
- Packed: 0 to Need.
- Shopping and Packed are independent (R5).
- Bag: one or none. Bags come from S10b; "No bag yet" is the default.
- Name: 1 to 60 characters. Renaming a catalog item keeps its catalog link for Scout and marks it renamed.
- Note: up to 300 characters; mic opens V1 with context Item.
- Owner change is not on this sheet at launch (Should: Move to another person).
- Changes apply as they are made; Done closes the sheet. Each change is undoable from the S06 toast after closing ("Updated Pajamas · Ivy").
- Remove from list removes the line at once, closes the sheet and shows "Removed Pajamas · Ivy" with Undo (2.2).
- Scout's reason shows only for lines Scout added or changed, in Scout text color with the Scout mark.

**Acceptance.**
- S07-1 Need 3, Packed 2; lowering Need to 1 makes Packed 1 and the row done.
- S07-2 Setting Bought leaves Packed unchanged.
- S07-3 Picking a bag shows the bag tag on the S06 row and counts it in S10.
- S07-4 Remove takes the item out of every count and S06 shows the undo toast; Undo restores it with its packed quantity.

### S07b · Add an item

Source `AddItem.dc.html` · sheet over S06 · built in W5-03 (form), W8-02 (Scout reads the text).

**Content.** Sheet "Add to the list" for the trip; a text field ("2 binoculars for Leo") with a mic; "Scout read it as": item name, category, quantity stepper; **For** chips (each person and Shared); **Bag** chips (optional); **Shopping**: Have it, To buy; button "Add to Leo's list" (ink; the label names the owner).

**Rules.**
- As the user types, the text is read into name, quantity (1 to 99, default 1), owner (a named person, "everyone" or "shared" means Shared; default the person selected in S06) and category. Before W8-02 this uses on-phone rules like the canvas; after W8-02 Scout reads it, and on-phone rules remain the fallback.
- Any chip or stepper the user touches overrides the reading and stays overridden until the text changes.
- If the item matches a line already on that person's list, the button reads "Add 2 more to Binoculars" and increases the line's Need instead of adding a duplicate.
- Adding closes the sheet, selects the owner in S06, highlights the new line and shows the undo toast.
- Quick adds: Later (2.1). screens.md lists them but the canvas doesn't draw them.

**Acceptance.**
- S07b-1 Typing "2 swimsuits for Ana" adds Swimsuits ×2 to Ana's list in Clothing.
- S07b-2 Adding an item already on the list raises its quantity instead of duplicating it.
- S07b-3 Works offline with on-phone reading.

### S08a · Ask Scout, opening · S08 · Change preview

Sources `ScoutStart.dc.html`, `Scout.dc.html` · sheet over S06 or S05 · built in W8-01.

**S08a content.** Scout sheet "Editing the Italy list"; "What changed?"; "Type it or say it. You'll see every change before anything moves."; "People often say" examples (tap to fill the field); message field with mic and orange send.

**S08 content.** The user's message; "Here's what I'd change. Nothing happens until you apply it."; "5 of 5 changes selected"; one row per proposed change with a toggle, kind (Add, Change, Remove), title, detail and the people it touches; **Apply 5 changes** (orange; "Nothing selected" and disabled at 0); a memory prompt when Scout heard something lasting ("Leo runs cold at night. Always pack a warm sleep layer for him?" with Remember, Just this trip, Change); message field for a follow-up.

**States.** Idle; listening (V1); Scout working; preview with all selected; some deselected; nothing selected; memory open, saved ("Saved to Leo's profile"), just this trip ("Only for this trip"); no changes needed ("Nothing to change. Your list already covers that."); Scout failed ("I couldn't work that out. Try saying it another way." with the message kept); limit and offline (section 3.5).

**Rules.**
- Every change is a proposal (R2). Kinds: Add (new line), Change (quantity, name or note of an existing line), Remove (delete a line). A Remove row says what will be removed and from whom.
- All rows start selected. Apply applies only selected rows, in one step, and shows "Applied 4 changes" with Undo (R9); Undo reverts all applied rows together.
- A follow-up message replaces the preview with a new one that keeps the user's toggles where the same change appears again.
- The memory prompt is separate from the list changes: Remember saves a memory (shown on S09, S09b, S09c) only after the tap; Just this trip saves nothing; Change opens the text to edit before saving. Ignoring the prompt saves nothing. **Depends on the A1 setting "Let Scout suggest things to remember"**: when off, no memory prompt appears.
- Closing the sheet with an unapplied preview discards it without asking (nothing has changed).
- Scout never proposes a change to another trip or to the crew from this sheet.

**Acceptance.**
- S08-1 "We're skipping the beach day" produces a preview with Remove rows for beach items; deselecting one and applying removes only the others; Undo restores all.
- S08-2 Closing the sheet before Apply leaves the list unchanged.
- S08-3 The memory is saved only after Remember, and appears in S09c with its source ("Saved while packing Italy").
- S08-4 With Scout failing, the message stays in the field and nothing changes.
- S08-5 Apply's label always matches the number of selected rows.

### S10 · Bags · S10b · Bag setup

Sources `Bags.dc.html`, `BagSheet.dc.html` · route `/trips/[id]/bags`, sheet · built in W5-03.

**S10 content.** Back to packing; "Italy · 4 bags"; Edit bags; Scout card with **Sort them for me** (Later, 2.1: not built at launch; the No bag yet card carries the count instead); one card per bag with icon, name, a line (Q3), "44 of 64" packed, a crew color mix bar, expandable rows (check, name, owner, "· to buy"), "N more in this bag", and a note when an item rides in another person's bag; **No bag yet** card with count.

**S10b content.** "Your bags · Name them the way you do."; one row per bag with a name field, a type chip (Checked, Carry-on, Backpack, Tote; tap cycles) and remove; Add a bag; "Removing a bag never removes what's in it."; Scout suggestion card (Later, 2.1); **Done**.

**States.** S10: no bags (Scout card hidden, "Add bags if you want them" and Edit bags); bag expanded; Scout sort states are Later.

**Rules.**
- Bags are per trip. A new trip has no bags unless created from a past trip (S12), which copies them.
- Removing a bag moves its items to No bag yet (copy on screen). No confirm (R9); undo toast instead.
- Sort them for me (Later): when built, it is a Scout proposal (R2) that moves only items with no bag, with Apply, Not now and Undo.
- Checking a row in S10 packs it exactly like S06 (same rules, same toast).
- An item's owner and its bag are independent: Ivy's bunny can ride in Leo's backpack and still counts for Ivy.
- Bag counts follow R4.

**Acceptance.**
- S10-1 Removing a bag sends its items to No bag yet; Undo restores the bag and its items.
- S10-2 Choosing a bag in S07 moves the item between bag cards and updates No bag yet.

### M1 · Trip menu

Source `TripMenu.dc.html` · sheet over S05 or S06 · built in W5-04.

**Content.** Trip name and dates; Edit trip details (S02 in edit mode); Bags (S10); Pack together (S11); New trip from this one (S12); Archive trip (at once, with undo); Delete trip (C1 Delete trip, red).

**Rules.**
- Edit trip details reopens S02, S03 answers and S04 with the trip's values. Saving changes that affect the list (dates, stops, people, activities) asks Scout for a change preview (S08 rules) rather than rebuilding the list. Removing a person from the trip opens C1 Remove person. Before Scout is built (W8-01), the rule list's additions and removals are shown as a preview with the same apply rules.
- Archive moves the trip to S01e Archived; Delete removes it for the whole household (Q4).

**Acceptance.**
- M1-1 Editing dates from 9 to 5 nights proposes lower quantities and changes nothing until applied.
- M1-2 Archive moves the trip off home with an undo toast; Restore in S01e brings it back unchanged.

### D1 · All packed

Source `Done.dc.html` · route `/trips/[id]/done` · built in W5-04.

**Content.** Back to the list; "Italy · Nov 20–29"; "Everything's packed."; "160 of 160 across 4 people. Have a great trip."; crew avatars; **Back to my trips**.

**Rules.** Opens once when the trip reaches all lines done (S06 rules). The trip stays in Upcoming until its last stop ends. Q8 for a door checklist.

**Acceptance.**
- D1-1 Packing the last line opens D1; unpacking one and repacking it does not open it again on the same day.

---

## 7. Screens: home and family memory

### S01b · Home, returning · S01c · Loading · S01d · Could not load

Sources `Trips.dc.html`, `Loading.dc.html`, `HomeError.dc.html` · route `/` · built in W10-04 (S01b), W5-05 (S01c, S01d).

**S01b content.** Wordmark; crew avatars (opens S09); account (opens A1); "Hi Nadia"; "Where to next?"; **Plan a trip** (orange); Repeat a trip (opens S12 picker: the past trips list); **Upcoming · 2** cards (dates and countdown, name, stops, activity line such as "Sam is packing now" or "4 people · not started", progress "74 of 160", menu); **Past trips** (latest two with "Pack like this"); "See all past and archived trips".

**Rules.**
- Upcoming: trips whose last stop hasn't ended, not archived, ordered by start date (undated trips last, by creation). Past: ended trips, newest first. Archived trips appear in neither (S01e).
- The countdown follows S05's wording. The activity line shows the crew count and state ("4 people · not started", "Packing"); "Sam is packing now" is Later with presence.
- Greeting uses the signed-in adult's first name; guests see "Where to next?" only.
- S01c shows on cold start only when there is nothing cached; cached trips render at once and refresh quietly.
- S01d shows when the server can't be reached and nothing is cached for this household on this phone beyond what is listed: "No connection · Your trips didn't load. Your lists are safe." with Try again (spinner, "Trying again…"), the cached trip(s) under "Saved on this phone" with "updated 2 min ago", and "Start a new trip anyway".

**Acceptance.**
- S01b-1 A trip's progress on its card matches S05.
- S01b-2 Archived trips never show on S01b.
- S01b-3 In airplane mode, a signed-in user sees cached trips and can open and pack them.

### S01e · Past and archived trips

Source `PastTrips.dc.html` · route `/trips/past` · built in W5-04.

**Content.** "Where you've been"; tabs Past · 3 and Archived · 1; trip rows (when, name, meta, crew dots) with Pack like this, View list and Archive (past) or Restore and Delete (archived); empty states for each tab; footer "Archiving hides a trip from home. Scout keeps what it learned either way."

**Rules.** Archive and Restore act at once with undo (R9). Delete opens C1 Delete trip. View list opens S05 read-write (packing a past trip is allowed). Pack like this opens S12.

**Acceptance.**
- S01e-1 Archive moves a trip to the Archived tab with undo; Restore moves it back with every check mark intact.

### S09 · Crew · S09b · Profile · S09c · What Scout remembers

Sources `Crew.dc.html`, `Profile.dc.html`, `Memory.dc.html` · routes `/family`, `/family/[id]`, `/family/new`, `/family/memory` · built in W10-03.

**S09 content.** Back; Add someone; "Your crew · Scout uses this on every trip. Nothing new is remembered without your OK."; one card per person (avatar, name, role or age with birth month, up to 3 memory tags and "+N"); What Scout remembers card ("12 things, across 5 lists", per-person counts, "1 suggestion waiting for your OK"); "Ages update on their own from each birth month."; "Kids don't need accounts. Invite another adult" (S11).

**S09b content.** "Crew · profile" or "New person"; avatar preview; Name; Born (month and year, "Month and year only"; adults optional); current age and note ("Ivy turns 4 in July. Scout uses the age on each trip date."); Their color (six crew colors); **Tell Scout about Ivy** (text with mic) and "Scout heard" cards, each with Save and skip; **Always pack** list with Add; **Travels with** chips (Stroller, Pull-ups, Car seat, Travel crib, High chair, Blackout shade); What Scout remembers for this person with Forget; Remove Ivy from the crew (red) or Cancel for a new person; Done.

**S09c content.** Back to crew; "12 memories"; search; filter chips by person with counts; "Waiting for your OK" card for pattern suggestions (Later, 2.1); groups by person with each memory's text, source ("Confirmed after Lisbon", "Saved by you · used on 3 trips") and Forget; empty search ("Nothing matches. Scout only remembers what you've said yes to."); Forget everything Scout knows (C1); How your data is used (A2); toast "Forgot: …" with Undo.

**Rules.**
- Age is computed from birth month and year on each trip's start date (Q1, decision 13). Adults have no age shown unless a birth date is added.
- Crew colors: six per household, assigned in order and changeable; two people may share a color.
- Scout heard cards are proposals (R2): Save adds the memory (and the matching Travels with chip where one exists); skip dismisses. Nothing from the text is stored except what is saved and the text itself if the user keeps it in the field. **Depends on W2-18** for what counts as a memory.
- Always pack items are added to that person's list on every new trip. Travels with chips add their gear and are memories too.
- Forget on S09b or S09c removes the memory at once with undo, no confirm (2.2). Forget everything always confirms (C1). Forgetting never changes lists already made.
- Pattern suggestions ("Waiting for your OK") are Later. S09's "1 suggestion waiting for your OK" line shows only proposals still open from S08.
- Removing a person from the crew (C1 Remove person variant for the crew) keeps them on past trips' lists as a name only; they leave future suggestions.
- Profile edits are saved on Done; leaving with changes asks nothing and saves (R12).

**Acceptance.**
- S09-1 A memory appears in S09, S09b and S09c only after an explicit yes somewhere.
- S09-2 Forget then Undo restores the memory with its source line.
- S09-3 Ivy born Jul 2023 shows "3 yrs" for a Nov 2026 trip and "4 yrs" for an Aug 2027 trip.
- S09-4 Adding "Bunny" to Always pack puts it on Ivy's list for the next new trip, and not on existing trips.
- S09-5 Search "cold" shows "Runs cold at night" and filters counts accordingly.

### S12 · Pack like a past trip

Source `Repeat.dc.html` · route `/trips/new/from/[id]` · built in W10-04.

**Content.** Back; "New trip from a past one"; headline ("Pack like Tahoe, adjusted for snow."); From card (past trip, when, items) and To card (new dates and kind, items); the change summary: Kept 51, Swapped 6, Added +15, Dropped −21, each with examples; "Kids grow." note flagging items to size-check; memory tags used; **Create the ski weekend list** (orange); Start fresh instead.

**Rules.**
- The user first enters the new trip's basics (S02 prefilled from the past trip, then S03 and S04 as usual); S12 then shows Scout's adjustments as a summary.
- Kept lines copy the past line, reset to packed 0 and shopping Have it. Swapped, Added and Dropped are Scout proposals; tapping a group opens its lines with toggles (S08 rules) before creating. Quantities scale with trip length.
- Size-check flags mark clothing and shoes for kids who had a birthday or grew a year since the past trip, as "Check size" tags on the new lines.
- Bags copy from the past trip.
- If Scout fails, Create uses the kept lines plus the rule list for the new trip, with the fallback line.
- Start fresh instead opens S02 empty except for the crew.

**Acceptance.**
- S12-1 The new trip's lines start unpacked even if the past trip was fully packed.
- S12-2 Deselecting "Snow boots ×4" in Swapped keeps the lake shoes instead.
- S12-3 Quantities for a 3-night trip made from a 5-night one are lower for per-day items.

---

## 8. Screens: accounts and sharing

### S13 · Sign in or save · S13b · Join from an invite

Sources `SignIn.dc.html`, `Join.dc.html` · modal; deep link · built in W9-02, W9-03, W11-02 (Apple), W11-04 (invites).

**S13 content.** Close; "Keep your lists. Pack together."; one line on why; the trip that comes along ("Italy · 160 items · on this phone · Comes with you. Nothing is rebuilt."); Continue with Apple; Continue with Google; Or by email: field and Send link; "No password. We email you a link that signs you in."; sent state ("Link sent · Check your inbox. Open the link on this phone and you're in. It works for 15 minutes." Use a different email); "Not now, keep going as a guest"; privacy line and How it works (A2).

**S13b content.** "Nadia invited you"; "Help pack for Italy."; the trip card with progress; three things you can do; "You'll join Nadia's household and see its trips. Kids are profiles, so they don't need accounts."; **Join and start packing**; Not now.

**Rules.**
- Sign-in methods: Apple (iOS only; App Store guideline 4.8 expects a privacy-focused sign-in option next to Google, and Sign in with Apple meets it; W11-02), Google, email magic link (15 minutes, single use, opens the app on the same phone). Android shows Google and email.
- On first sign-in, the guest's trips, crew, memories and check marks move to the new household unchanged (R1). On sign-in to an existing account, guest data on the phone merges into that household; a trip never duplicates.
- Close and Not now return to where S13 opened with nothing lost.
- S13b opens from an invite link. Join requires sign-in (S13 opens if needed) and then adds the adult to the inviting household. Q6 for guest data. An expired or used invite says so and offers to ask for a new one.

**Acceptance.**
- S13-1 A guest with one packed trip signs in with email: the same trip, counts and check marks appear, and no Scout run happens.
- S13-2 An expired magic link explains itself and offers to send a new one.
- S13b-1 Joining from Sam's phone shows Nadia's trips and crew; packing on one phone shows on the other within 2 seconds (W11-04).

### S11 · Pack together

Source `Share.dc.html` · route `/household` · built in W11-04.

**Content.** Back; "Your household · Pack together · Everyone you invite sees every trip and can check things off."; members (avatar, name, "You · owner", "Packing Ivy's list now", pending "Invited 2 days ago · not joined yet" with Resend); Invite someone: field "Email or phone" and Send; Copy invite link ("Link copied"); "Kids are profiles, so they don't need accounts."; Recent on Italy (Later, 2.1).

**Rules.**
- Guests see S13 first; inviting needs an account.
- An invite is a link valid for 7 days, single household, reusable until accepted by one person. Email invites are sent from the server; phone invites open the system share sheet with the link (no SMS sending by us).
- Resend sends again and restarts the 7 days. Cancel invite: Should.
- Recent and presence ("Packing Ivy's list now") are Later. Member rows show "You · owner", "Joined Nov 21" or the pending line.
- No roles (Q4); owner per Q5.

**Acceptance.**
- S11-1 Copy invite link, open it on a second phone, join: the member list updates on both phones.
- S11-2 Both phones check items on one list; the counts agree within 2 seconds; an item edited on both at once ends in a predictable state (W11-05 defines the rule).

### A1 · Account and settings · A2 · Your data and privacy

Sources `Account.dc.html`, `Privacy.dc.html` · routes `/account`, `/account/privacy` · built in W9-03.

**A1 content.** Back; name and email; Household ("2 adults · 1 invited", opens S11); Crew and what Scout remembers (S09); **How Scout packs for you**: Temperature °F/°C, Default packing style Light, Balanced, Ready; toggles "Let Scout suggest things to remember · It always asks first." and "Email me when someone joins"; Your data and privacy (A2); Leave household (C1); Delete my account and data (C1, red); Sign out (C1).

**A2 content.** "Your data, plainly"; Our promises (5 lines); What we keep, and where; Who helps us run kitmunk (Supabase, Anthropic, Apple and Google); Download all my data; Review what Scout remembers (S09c); Delete my account and data (C1); Read the full privacy policy (kitmunk.com/privacy, W15-02).

**Rules.**
- Settings save at once and sync to the account; temperature and style apply to new trips and to display everywhere (Q10, Q12).
- Download all my data produces a file of trips, lists, crew and memories (JSON plus a readable CSV of lists) delivered through the system share sheet. W2-26 sets the format.
- Delete my account and data deletes the account, and the household if no other adult is in it (Q5), from the server and backups on the schedule in W2-26, and signs out. It cannot be undone (C1 says so).
- Every A2 promise must be true of the shipped app (Q13). The copy changes when W2-26 says so.

**Acceptance.**
- A1-1 Switching to °C changes every temperature shown in the app.
- A1-2 Delete account removes the user's data from the server (checked in Supabase) and returns to S01a.
- A1-3 Export opens the share sheet with a file containing every trip and memory.

---

## 9. Shared dialogs

### C1 · Destructive confirm

Source `Confirm.dc.html` · dialog · built with the screen that first needs each variant.

Every variant has an icon, a title that names the thing, one sentence on what happens and what stays, a go button and a back button. Red go button and red icon tint for permanent loss; ink for Sign out, the only variant that loses nothing.

| Variant | From | Title | Go / back | Red | After go |
| --- | --- | --- | --- | --- | --- |
| Delete trip | M1, S01e | Delete Italy for everyone? | Delete trip / Keep it | Yes | Home |
| Remove person | M1 edit, S09b | Remove Leo from this trip? (or from the crew) | Remove from trip / Keep him | Yes | Origin |
| Discard new trip | S02 back | Discard this trip? | Discard / Keep editing | Yes | S01 |
| Forget everything | S09c | Forget everything Scout knows? | Forget everything / Keep it | Yes | S09c |
| Leave household | A1 | Leave the household? | Leave / Stay | Yes | S01a |
| Sign out | A1 | Sign out? | Sign out / Cancel | No | S01a |
| Delete account | A1, A2 | Delete your account? | Delete account / Cancel | Yes | S01a |

**Rules.** The body text uses real names and counts. Back is the default focus. Go performs the action once; double taps do nothing more. Archive trip, Remove item and Forget a memory are not C1 variants: they act at once with an undo toast (2.2). The canvas keeps them as drawn until the next design export removes them.

**Acceptance.**
- C1-1 Each variant's body names the real trip, person, item or memory and the real count.
- C1-2 Back leaves everything unchanged.

---

## 10. Not designed yet

Each needs a design before its build task starts, or the build task draws it from the design system and notes it in the pull request.

- Paywall and manage plan (only if decision 6 is paid; W13-04).
- App icon and splash at final size (W3-06).
- Push notification prompts (none at launch; Later).
- Onboarding for a second adult after joining (S13b lands on S05 at launch).
- Offline banner (R11 line copy is used until designed).
- Move an item to another person (S07) and quick adds (S07b): Later.

---

## 11. Where each screen is built

| Screen | Issue |
| --- | --- |
| S01a, S02, S02b, S04 | #5 W3-01 |
| On-phone storage for all of the above | #6 W3-02 |
| S05, S06, S06b | #10 W4-02 |
| Rule-based list behind S04b and S04c | #9 W4-01 |
| S07, S07b, S10, S10b | #12 W5-03 |
| M1, S01e, D1 | #13 W5-04 |
| S01c, S01d, empty and error states, accessibility (R18 to R22) | #14 W5-05 |
| S02 Scout caught, S03 questions | #15 W6-02 |
| S03 weather, guest limits | #16 W6-03 |
| S04b Scout additions | #17 W7-01 |
| S04b, S04c screens | #18 W7-02 |
| S08a, S08 | #20 W8-01 |
| S05 Scout cards, S07b Scout reading, V1, V2 | #21 W8-02 |
| S13 (Google, email), guest move, sync | #22 W9-02 |
| S13, A1, A2, export, delete | #23 W9-03 |
| S09, S09b, S09c | #24 W10-03 |
| S12, S01b | #25 W10-04 |
| S13 Apple | #26 W11-02 |
| S13b, S11, live check marks | #27 W11-04 |
| Concurrent edits and offline check marks | #28 W11-05 |
