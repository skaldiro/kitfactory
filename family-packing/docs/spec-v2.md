# Kitmunk requirements spec v2

Status: **signed** in W2-09 (Mon Nov 23, 2026, Selman and Daniel), by approving the pull request "W2-09 · Spec v2 signed". Complete (tracker W1-16, W1-15, W2-16, W2-17, W2-18, W2-26).
Built from: design v1.0 (`design/source/`, exported Nov 21 2026), `design/DESIGN.md`, `docs/prd.md` v1.0, `docs/architecture.md`, the tracker's Decisions tab as of Nov 23 2026 and the W2-09 answers. Where the canvas still differs from this spec, the spec wins until W2-31 updates the canvas.

## How to use this spec

- This file is the source of truth for **behavior**. `DESIGN.md` wins on values (color, type, spacing, motion). The screen images and `design/source/` files win on layout and sample copy. The tracker's Decisions tab wins over everything; when a decision closes, this spec changes by pull request the same week.
- Signed in W2-09, it replaces `docs/prd.md`. `family-packing/CLAUDE.md` keeps a short "Decided" mirror of the build-facing decisions with a sync date (decision 33).
- Every screen has an ID from `design/screens.md`. Every acceptance criterion has an ID (`S06-7`) so issues, tests and pull requests can quote it.
- Nothing here assumes an open decision. Where a screen depends on one, the text says **Depends on decision N** and gives the behavior to build until it closes.
- "Must" is a launch requirement. "Should" is wanted but can slip with a note in the pull request. Anything not written here is not required.
- Sample names (Nadia, Sam, Leo, Ivy; Italy, Nov 20 to 29) come from the canvas and are examples only.

## Contents

1. Founders' answers (W2-09)
2. Scope, design vs PRD conflicts, glossary
3. Rules that hold on every screen
4. Intake and data model (W2-16), Scout (W2-17), memory (W2-18), privacy (W2-26)
5. Screens: start a trip (S01a, S02, S02b, V1, V2, S03, S04, S04b, S04c)
6. Screens: pack it (S05, S06, S06b, S07, S07b, S08a, S08, S10, S10b, M1, D1)
7. Screens: home and family memory (S01b, S01c, S01d, S01e, S09, S09b, S09c, S12)
8. Screens: accounts and sharing (S13, S13b, S11, A1, A2)
9. Shared dialogs (C1)
10. Not designed yet
11. Where each screen is built

---

## 1. Founders' answers (W2-09)

Answered in one sitting on Mon Nov 23, 2026. Each answer is applied in the sections it points to. Decisions closed or added that night: 6 to 10, 12, 13, 30, 32 to 34, 36 to 39 (tracker Decisions tab). Still open: 11 (cost ceiling, week 8) and 31 (Scout's model per job, week 8).

| # | Question | Where it bites | Answer |
| --- | --- | --- | --- |
| Q1 | What is stored about children? | S02, S09b, A2, data model (4.1.5, 4.4.3) | **Changed** (decision 13): first names only, for everyone. A kid's age is entered in S02 (months under 2) with the date it was set, so it ages forward. Birth month and year are optional in S09b. Adults have no age. |
| Q2 | Trips entered by length instead of dates. | S02, S03 | **Gone**: dates only. Every stop has arrive and leave dates; there is no length mode. |
| Q3 | A carrier per bag ("Sam carries it")? | S10, S10b | Agreed: no carrier at launch; the bag line shows the bag type. Bag names are already in scope (S10b). A carrier per bag is Later. |
| Q4 | Who can delete a trip, remove a person, or invite? | M1, C1, S11 | **Changed** (decision 37): the household's creator is its admin and the only one who invites and removes accounts, pays, and deletes the household. Every account creates, edits and deletes trips; every destructive confirm names the impact on the household. |
| Q5 | What happens when the creator leaves or deletes their account? | S11, A1, C1 | **Changed** (decision 37): the admin's account delete deletes the household, after the screen states the impact and offers "Make <name> the admin first". The other accounts keep their logins and start an empty household. |
| Q6 | A guest with trips on the phone joins another household. | S13b, data model | As recommended: the guest's trips and crew move into the household. A crew person with the same first name is matched with one question ("Is this the same Leo?"). An invite names the crew person it is for (decision 37). |
| Q7 | Item quantity zero. | S07 | Agreed: Need never goes below 1; minus at 1 offers "Remove from list?" inline, with undo. |
| Q8 | A door checklist on D1? | D1 | Agreed: Later. |
| Q9 | S04b stage text. | S04b | Agreed: built from the trip and the run's real results; timing is cosmetic; the last stage waits for the real result. |
| Q10 | Default packing style vs the style question. | S03, A1 | Agreed: with a default set, Scout doesn't ask; S04 shows the style with Change. |
| Q11 | Scout use before sign-in. | S02 to S08 for guests | **Changed**: starting value 1 list build and 1 change request per guest phone, then sign in. A setting (4.2.5), confirmed after testing. |
| Q12 | Default temperature unit. | S03, S04, S05, A1 | Closed by decision 10: °F, with the °C switch in A1. |
| Q13 | The A2 promises. | A2, 4.4.8 | Agreed; wording per Q25 and decision 39 (4.4.8). |
| Q14 | Limits and timings this draft picked. | Throughout | Agreed as starting values; tune them to the UI during the build. |
| Q15 | The four cuts. | S10, S10b, S09c, S11, S01b, V1, V2 | Scout bag sort and bag suggestion: Later. Memory pattern suggestions: Later. Presence and the Recent feed: **Never**. In-app voice: **back for S02 only** (decision 8); the other mics are Later. Decision 29 drops "Sort them for me (S10)". |
| Q16 | Trip creation: free-text box or the form? | S02 | The form, with in-app voice on "Rather just talk?" (decision 8): prompts while talking, then back to the form to confirm. |
| Q17 | Where a new trip lands. | S04b, S05 | Agreed: trip home (S05) after generating. |
| Q18 | An "All items" view? | S06 | Not at launch; Later if testers ask. |
| Q19 | Should guest data expire? | Guest storage | Agreed: no expiry. Deleting the app deletes it. |
| Q20 | Data model check against test trips. | 4.1.5, W3-03 | Agreed: moved to W3-03. |
| Q21 | How guests call Scout with limits. | 4.2.5, W6-02 | Agreed: a Supabase anonymous session per phone. |
| Q22 | What is not collected. | 4.1.2 | Agreed, plus adult ages and health information. What is collected: 4.4.1. |
| Q23 | Unused memories. | 4.3.2 | Agreed: after 3 unused trips a memory stops going to Scout and S09c tags it. No prompt, no auto-delete. |
| Q24 | Health details. | 4.1.4, 4.3.2, 4.4.4 | **Strengthened** (decision 39): never asked; Scout never saves health details or proposes a memory with a medicine name; a hint under the S02 note; A2 says it plainly. Attorney question added (4.4.9). |
| Q25 | Anthropic's 30-day deletion has exceptions. | A2, 4.4.7 | Agreed: no zero data retention. A2: "deletes them within 30 days, except if flagged for misuse or required by law." |
| Q26 | Keep Scout's validated answers 30 days? | 4.2.6, 4.4.1 | Agreed. Tracing (for example OpenTelemetry) is considered in W7-03. |
| Q27 | Crash reporting vendor. | 4.4.5, A2 | Agreed: EAS Observe; Sentry as the fallback. |
| Q28 | Supabase backup window. | 4.4.6 | Agreed: W9-01 records the plan's backup window; the policy states it. |
| Q29 | The question bank. | S03, 4.1.3 | **Changed**: Scout writes its own questions, up to 6, every one skippable, each filling a fact the list uses. The bank becomes examples and the fallback set. Skipping assumes the item comes. |
| Q30 | Per-day caps by style. | 4.1.2, 4.1.5 | **Changed**: no style caps. Per-day items are nights + 1, up to the first wash plus 1 spare; over 7 nights with laundry unknown, one wash a week. Style decides optional extras only. |
| Q31 | Working cost targets. | 4.2.5 | Agreed as planning numbers; measured in W7-03. |
| Q32 | Limits and the daily spend stop. | 4.2.5 | Agreed as starting values. Every limit and the spend stop is a setting changed without an app release, confirmed after testing. |
| Q33 | J1 reads while typing. | 4.2.1 | Agreed; it also reads the S02 voice transcript once. |
| Q34 | Starting model per job. | 4.2.1, decision 31 | Agreed; the W7-03 sweep includes Opus. |

---

## 2. Scope and glossary

### 2.1 Scope for launch (week of March 1, 2027)

Sized to the tracker's 16 weeks: 9 build weeks (3 to 11, with weeks 6 and 7 over the holidays), feature freeze at the W11-07 meeting on Sat Jan 30, then beta and launch. About 24 build issues fit if each lands in its week; the heavy weeks are 5 (four screen issues), 8 (Scout changes), 9 (accounts, development builds), 10 (crew, past trips, voice on S02) and 11 (Apple sign-in, invites with the admin role, live packing, concurrent edits). The cuts below take load out of those weeks; W2-09 added voice on S02 and the admin role and took out paid plans and length-mode trips.

**Amendment rule.** An item moves up from Later or Never only with evidence from at least 3 testers (beta notes, tester calls or filed issues), recorded on the tracker's Decisions tab and changed here by pull request. After feature freeze (W11-07), nothing moves up before launch; it goes to the first post-launch cycle. Must-have items can move down at any time by a founders' decision, to protect the date.

**Must have** (every screen in sections 5 to 9 unless listed below)

| Area | What | Built in |
| --- | --- | --- |
| Start a trip | S01a, S02 (form, stops with dates, crew with kids' ages, activities, note), S02b, S04 | W3-01, W3-02 |
| Voice | "Rather just talk?" on S02 with V1 and V2, recognition on the phone (decision 8); development builds from week 9 | W9-10, W10-07 |
| Rule-based list | Catalog v1, quantity rules, list for every traveler plus Shared, works offline | W3-03, W4-01 |
| Packing | S05, S06, S06b, S07, S07b, D1; progress by item lines; undo everywhere | W4-02, W5-03, W5-04 |
| Bags | S10 and S10b, manual only (no Scout sort, no Scout bag suggestion) | W5-03 |
| Trips | M1, S01b, S01c, S01d, S01e; archive, restore, delete | W5-04, W5-05, W10-04 |
| Scout: intake | Notes become Scout caught chips; up to 3 tailored questions; usual weather per stop (source per decision 7) | W6-02, W6-03 |
| Scout: list | Additions with reasons on top of the rule list; S04b, S04c; every fallback in architecture.md | W7-01, W7-02, W7-03 |
| Scout: changes | S08a, S08 with per-line preview, apply, undo; S05 Scout noticed cards (up to 3) | W8-01, W8-02 |
| Accounts | S13 with Apple (iOS), Google and email link, adults 18 and over (decision 38); guest move with no rebuild; the household admin (decision 37); A1, A2; export; delete | W9-02, W9-03, W11-02 |
| Ready to charge later | Free at launch (decision 6). One access check before each Scout build and change; trips counted per household; change requests counted per household and per account; Scout limits and the spend stop as settings (4.2.5) | W6-03, W9-02 |
| Crew and memory | S09, S09b, S09c; memories only from an explicit yes in S08, S09b or S09c; forget with undo | W10-03 |
| Pack like a past trip | S12 with kept, swapped, added, dropped and per-line toggles | W10-04 |
| Sharing | S11 invites by link and email, S13b join, live check marks between phones, concurrent-edit rule, offline check marks | W11-04, W11-05 |
| Quality | Crash reporting, the agreed usage events (decision 13), scout_runs logging and alerts, accessibility pass (R18 to R22), security pass | W5-05, W12-01, W12-02 |

**Cut to Later to fit 16 weeks** (confirmed in W2-09, Q15)

| Item | Why it goes | Effect on issues |
| --- | --- | --- |
| Scout "Sort them for me" in S10 and the Scout bag suggestion in S10b | A sixth Scout job with its own eval, for a screen decision 5 already moved off the main path | W5-03 unchanged; nothing added to W8 |
| Pattern suggestions in S09c ("You removed the umbrella from your last 3 trips") | Needs history across trips that beta families won't have yet; memory from explicit yes covers launch | W10-03 smaller |
| In-app voice everywhere except S02 (the mics on S07, S07b, S08a, S09b) | Each mic adds states and tests in the busiest weeks; keyboard dictation already works in every text field | W8-02 loses voice; voice on S02 moves to W10-07 |

**Later** (not at launch; each needs the amendment rule to move up)

- Everything in the cut list above.
- Web version (decision 12) and tablet layouts (decision 9).
- Packing assignment, "who packs it", and a carrier per bag (decision 5, Q3).
- Door checklist on D1 (Q8). An "All items" view (Q18), if testers ask.
- Quick adds in S07b; moving an item to another person; drag to reorder; cancel a pending invite.
- Roles beyond the admin (decision 37). Families across two households (separated parents sharing kids).
- Accounts for teens (decision 38), after the attorney.
- An invite link that carries through installing the app (today the link is tapped again after install).
- Place autocomplete in S02 (NASA POWER has no place search; it needs a separate provider).
- Weather forecasts for trips that are close (decision 7).
- Push notifications (no prompts at launch).
- Paywall and purchases (decision 6): pricing and the paid features (trip limits, change-request limits, memory) are decided after beta (W4-08). Going back to free never deletes or locks data.
- Countries and languages other than the US and US English (decision 10).

**Never** (conflicts with a product rule or isn't this product)

- Scout changing a list, a trip or a memory without a yes (R2).
- Accounts for children under 13, child photos, full birth dates (R6).
- Presence ("Sam is packing now", "Packing Ivy's list now") and the Recent feed in S11 (Q15).
- Asking for, or saving as a fact about a person, any health information (decision 39).
- Ads, ad or tracking SDKs, selling data, using trips to train models (A2 promises).
- Uploading or storing voice audio (decision 8).
- Itinerary planning, reservations, flight imports, passport storage, price comparison and shopping integrations, jet-lag advice, photo recognition of items (PRD "Not in this MVP"; none of them is packing).

### 2.2 Design vs PRD conflicts

The PRD (`docs/prd.md`) is v1.0 and its copy stops partway through S06; for S07 to S13 there is nothing to compare, and the design is the only source. Every conflict found is listed. **Resolved** means a closed decision, the stack, or a DESIGN.md rule already settles it and this spec follows that; **Open** points to a question in section 1.

| # | PRD says | Design or decisions say | Status | This spec does |
| --- | --- | --- | --- | --- |
| P1 | Mobile-first web app or PWA, not native | Native iOS and Android with Expo | Resolved by the stack (CLAUDE.md); web is decision 12 | Native only; web Later |
| P2 | No voice in v1 | Mic on S02, S07, S07b, S08a, S09b with V1 and V2 | Resolved by decision 8 | R17: in-app voice on S02 only; keyboard dictation elsewhere |
| P3 | Up to two collaborating adults | No cap on adults | Resolved by decision 15 | Any number of adults |
| P4 | No live weather APIs | Usual weather per stop on S03, S04, S05 | Resolved by decision 7 | Climate averages per stop, labeled as usual weather |
| P5 | Trip creation is one free-text box ("Tell me about your trip"), AI parses it, manual form only as a failure fallback | Structured form with a note field and "Rather just talk?" voice | Resolved by Q16 | Form first with voice on "Rather just talk?"; Scout reads the note |
| P6 | Clarification asks who is coming, laundry and weather as questions | Crew and activities are in S02; weather is automatic; Scout asks only what's left | Resolved by the design (fewer questions, same facts) | S03 rules |
| P7 | Clarification may group related details in one round | One question per screen, at most 3 | Resolved by the design | S03 rules |
| P8 | After creating a trip, the checklist is the primary screen; overview is optional | Generating lands on trip home (S05), then Open the packing list | Resolved by Q17 | S05 first on a new trip; reopening a trip goes to S05 too |
| P9 | S05 actions "Start packing", "Make changes with AI", "Add family details"; a per-person preview | Scout noticed cards, Everyone's lists, To buy, Bags, Open the packing list; no "Add family details" | Resolved by the design | S05 as drawn; crew editing lives in S09 |
| P10 | Packing views By person, By bag, All items | By person only; bags on their own screen | Resolved by decision 5 and Q18 | No All items view |
| P11 | Filters All, Unpacked, Packed, Need to buy | To pack, Packed, To buy; tap again for all | Resolved (same filters, different words) | S06 rules |
| P12 | Item row shows an optional responsibility label | No responsibility; packing assignment out | Resolved by decision 5 | No responsibility label |
| P13 | Zero-quantity items are removed or excluded | Need stepper stops at 1; screens.md lists a "zero warning" | Resolved by Q7 | Need ≥ 1; minus at 1 offers remove |
| P14 | Trip card actions: open, duplicate, edit, archive | Card opens S05; menu has edit, new trip from this one, archive, delete; past trips have Pack like this | Resolved by the design (duplicate is S12) | M1, S01e |
| P15 | Guest drafts discarded after migration **or expiration** | No expiry in the design | Resolved by Q19 | No expiry; guest data stays until moved or the app is deleted |
| P16 | Excludes complex offline synchronization | Tracker W11-05 includes check marks made with no signal | Resolved by the tracker (W11-05 is planned) | R10, R11; only check marks and item edits sync offline-first |
| P17 | Headline "Packing for the whole family" | "Packing for the whole crew" | Resolved by DESIGN.md words rule (R16) | Design copy |
| P18 | Children as profiles with age | Birth month and year stored, ages computed | Resolved by decision 13 | Age entered in S02; birth month and year optional in S09b |
| P19 | AI accessed through a floating or sticky action | Scout bar pinned at the bottom of S06; Scout opens from S05 cards too | Resolved (consistent) | S06, S08a |
| P20 | Loading messages indicate general progress, not real model steps | Generating stages show trip-specific details | Resolved by Q9 | Real trip data, cosmetic timing |
| P21 | Monetization outside the private beta | Paywall not designed | Resolved by decision 6 | Free at launch; paywall Later |

Three conflicts inside the design, not with the PRD, are settled here by DESIGN.md's rule "don't confirm anything that isn't destructive": **Remove item**, **Archive trip** and **Forget a memory** use undo only, and their C1 variants are dropped from the canvas (S01e already archives without a confirm). The canvas gets the fix in W2-31.

### 2.3 Glossary

| Term | Meaning |
| --- | --- |
| Trip | One journey with dates, one or more stops, a crew and a list. Belongs to a household. |
| Stop | A place on the trip with its own arrive and leave dates. Usual weather is looked up per stop. |
| Crew | The people in a household, as profiles: a first name and a color, plus an age for kids. Adults may or may not have accounts; kids never do. A trip uses some or all of the crew. |
| Account | One adult's login (Apple, Google or an email link), 18 and over (decision 38). Belongs to exactly one household and is linked to that adult's crew profile. |
| Admin | The account that created the household: pays (when there is a plan), invites and removes accounts, deletes the household (decision 37). |
| Shared | A pseudo-owner for items that belong to everyone (first-aid kit, adapters). Shown as "Us" in ink. |
| Item | A thing to pack, from the catalog or custom. |
| Item line | One item for one owner on one trip, with a required quantity, a packed quantity, a shopping state, an optional bag and an optional note. Progress counts item lines. |
| Bag | A container on a trip (checked case, carry-on, backpack, tote). Optional; an item line has at most one bag. |
| Assumption | A value Scout filled in without being told. Always shown dashed orange and always changeable. |
| Proposal | A change Scout wants to make to a list or to memory. Nothing applies until a person says yes. |
| Memory | A fact about a person or the household that Scout may use on future trips. Saved only after an explicit yes. |
| Guest | Someone using the app with no account. Their household lives only on the phone; they can't invite or share. Signing in moves it all to the server unchanged. |
| Household | The unit that owns crew, trips, bags, lists and memories, and later the subscription. Any number of accounts (decision 15), one admin (decision 37). |

---

## 3. Rules that hold on every screen

### 3.1 Product rules

- **R1 Guest first.** A guest can create a trip, get a full list and pack it with no account (decision 4). Signing in moves everything on the phone to the account unchanged: no regeneration, no lost check marks, no new IDs visible to the user.
- **R2 Nothing silent.** Scout never changes a list, a trip or a memory without a person approving it. List changes are previewed line by line (S08, S10). Memories need an explicit yes (S08, S09, S09b, S09c).
- **R3 Scout can fail; the user never loses input.** Every Scout call has a fallback (architecture.md, "How a Scout run works and fails"). Typed text, answers and check marks survive any failure, app restart or lost connection.
- **R4 Progress counts item lines.** An item line is done when packed quantity is at least required quantity. Counts read "74 of 160 packed", never a bare percentage. A person's ring and the trip total use the same rule.
- **R5 Packing and shopping are independent.** Shopping state is one of Have it, To buy, Bought. Changing it never changes the packed quantity, and packing never changes it.
- **R6 Kids are profiles.** Accounts are for adults 18 and over (decision 38). A kid is a first name, a color and an age (with the date it was set, so it ages forward); birth month and year only if a parent adds them (decision 13). Adults have no age.
- **R7 Shared household.** Every trip, crew profile, bag, item line and memory belongs to a household. Any number of adults (decision 15). A new trip starts with 2 adults when the household has 2 or more, otherwise with the household's adults (decision 14).
- **R7b One admin.** The account that created the household is its admin: the only one who invites and removes accounts, pays (when there is a plan) and deletes the household. Every account creates, edits and deletes trips, packs, uses Scout and edits the crew (decision 37). Screens hide what an account can't do rather than showing it disabled.
- **R8 No packing assignment.** No "who packs it" at launch (decision 5). Bags live on their own screen, not in the packing workspace.

### 3.2 Interaction rules

- **R9 Destructive actions confirm; everything else undoes.** Delete, remove, leave, sign out, forget and discard go through C1. Every other change shows a toast with Undo for 5 seconds (DESIGN.md `undo-window`). Undo restores the exact previous state, including packed quantity and shopping state.
- **R10 Optimistic and durable.** Taps update the screen at once and are written to the phone's store before the next frame that depends on them. A sync failure never reverts a local change silently; it retries and, after 3 failures, shows a quiet "Not synced yet" line on trip home (S05). (Sync arrives in W9; until then everything is local.)
- **R11 Offline.** Packing, item edits, bags, past trips and the crew work offline. Anything that needs Scout or the server shows why it is unavailable and keeps the user's input ("Scout needs a connection. Your note is saved."). No offline banner is designed yet (section 10).
- **R12 Back never loses work.** Leaving S02 with any input asks C1 "Discard new trip". Leaving any other form keeps the draft on the phone until the trip is created or discarded.
- **R13 One orange button per screen** (decision 29). Orange only for: Plan a trip (S01a, S01b), Create our packing list (S04), Ask Scout and its send button (S06, S08a, S08), Apply N changes (S08), Create the list from a past trip (S12). Every other main button is ink on light screens and mist on dark ones. Red only on destructive confirms.
- **R14 Dashed means a guess.** Every value Scout inferred has a dashed orange underline or a dashed card until a person confirms or changes it. Confirming removes the dash. Solid means a person said it.
- **R15 Scout's voice.** First person, short, never cute. Scout names trips from their stops: the country when there is one, a route ("Rome to Cinque Terre") when it reads better. People can rename any trip.
- **R16 Words.** Dates "Nov 20–29" for a trip and "Nov 23 → 26" for a stop. Ages "3 yrs", "1 yr", "8 mos" (under 2, from the age stepper), "Adult". "People" and "crew", never only "family" or "kids". Privacy: "never sold, never used for ads or AI training".

### 3.3 Voice input

- **R17** In-app voice exists only on S02's "Rather just talk?" (decision 8). It opens V1, then V2, and lands back on S02 with the trip basics filled for the user to confirm, plus "Scout also caught" for the extra details. Speech is turned into text on the phone; audio is never uploaded or saved. Every other text field uses the keyboard's own dictation; no other screen has a mic. Built in W10-07 on development builds (W9-10); until then the card is hidden.

### 3.4 Accessibility and quality bars (all screens)

- **R18** Touch targets at least 44 by 44 points. Text contrast at least 4.5:1 (decision 35 values). Every icon-only button has the accessibility label given in the design source. Every toggle and chip reports pressed state. Every screen can be completed with VoiceOver and TalkBack (W5-05).
- **R19** Dynamic type up to the largest standard size without clipped buttons or overlapping text; lists scroll instead.
- **R20** Reduced motion turns off every loop (first-run case, generating orbit) and shows the end state.
- **R21** Phones only, portrait; iPads run the phone layout (decision 9). Oldest supported: iOS 16.4 and Android 7 (Expo SDK 58).
- **R22** Every screen has a loading, an empty and an error state, either drawn or defined below. A screen with no defined error state shows the shared one: "That didn't load. Your trips are safe." with Try again.

### 3.5 Scout states every AI moment uses

| State | What the user sees |
| --- | --- |
| Working | Scout mark, a short first-person line, the user's input still visible and editable where the layout allows. |
| Proposal | Dashed card or per-line preview. Every line skippable. Nothing applied. |
| Applied | Toast "Applied 4 changes" with Undo (5 s), lines highlighted for the undo window. |
| Fallback | The rule-based result with an honest line ("Scout couldn't help just now, so this is our basic list. You can ask Scout again later.") Never presented as Scout's work. |
| Limit | Plain message, no blame: "Scout's free help is used up for now. Save your trip to keep going." for guests; limit and spend-stop versions for accounts. Fallback result still shown. Limits are settings (4.2.5). |
| Offline | "Scout needs a connection. Your note is saved." Input kept. |

---

## 4. Intake, Scout, memory and privacy

Written for W2-16, W2-17, W2-18 and W2-26 on Nov 21, 2026, in the same pull request as the rest of the spec so it is reviewed once (W2-09). Questions these sections raised are Q20 to Q34 in section 1, answered in W2-09; decisions 6 to 10, 13 and 37 to 39 closed that night and the text follows them. Decisions 11 and 31 stay open until week 8.

### 4.1 Intake questions and the trip data model (W2-16)

**Principle.** Every fact the app collects must change the list. A fact that changes nothing is not asked, not stored and not sent to Scout. The table in 4.1.2 is the complete list; adding a fact or a question needs a spec change.

#### 4.1.1 Where facts come from, in order of trust

| Source | Example | Shown as | Scout may override? |
| --- | --- | --- | --- |
| The user said it in the form (S02) or answered a question (S03) | Laundry: once, in Florence | Solid | No |
| The user confirmed or edited a Scout value | Tapped the dashed Luggage row and kept it | Solid | No |
| A confirmed memory (4.3) | Ivy: needs pull-ups at night | Solid, with the memory tag | No; it can ask if the trip makes it doubtful |
| An adult's default (A1) | Packing style: Light | Solid | No |
| Read from the note, voice or add-item text (job J1, 4.2) | "the apartment has a washer" becomes Laundry in Florence | Scout caught chip, then dashed on S04 | Yes, until confirmed |
| Scout's assumption on a skipped question or an unasked fact | Luggage: 2 checked bags, 4 carry-ons | Dashed | Yes |
| The rule default when nothing else exists | Laundry unknown: plan for none | Dashed "not sure" on S04 | Yes |

A higher source always wins. A lower source never silently replaces a higher one; Scout can only ask (S03) or propose (S08).

#### 4.1.2 The facts the list needs

The six facts S04 counts ("All 6 covered"), plus the per-stop and per-person facts.

| Fact | Values | Asked in | When unknown (rule default) | What it changes in the list |
| --- | --- | --- | --- | --- |
| Getting there | any of flying, driving, train, ferry | S02 chips | Not driving | Flying: liquids bag, travel-day kit, carry-on comfort items. Driving: car kit, car seats question. Train or ferry: motion sickness items when a child is under 10. |
| Staying in | any of hotel, rental, family or friends, camping, cruise; per stop when the note says so | S02 chips, note | Hotel | Rental or family: kitchen and laundry basics are not packed, toiletries are. Hotel: no towels. Camping: shared camping gear (4.1.4). Cruise: formal night outfit, lanyard. |
| Laundry | none, once (with the stop), weekly, whenever | Note, an S03 question | None for 7 nights or fewer; one wash a week beyond 7 nights | Per-day clothing covers the days until the first wash plus a spare. |
| Luggage | follows packing style and getting there: Light means carry-ons only, Balanced one checked bag, Ready checked bags as needed | Derived; editable through style | From style | Quantity caps; liquids under 100 ml when carry-ons only and flying. Bags are not created from it (S10b stays manual). |
| Doing | any of the nine S02 activity chips, plus events read from the note | S02 chips, note | Sightseeing | Each activity adds its catalog group (swim, hike, ski, formal, theme park). Some trigger a question (4.1.3). |
| Packing style | light, balanced, ready | A1 default, an S03 question | Balanced | Decides optional extras only (a second swimsuit, spare shoes, a dressy outfit); never changes per-day counts (Q30). |
| Per stop: place | free text; resolved to latitude, longitude, place label and country by J1 | S02 | Required | Climate (below), plug adapter when the country differs from home (US, decision 10). |
| Per stop: getting there from the last stop | flying, driving, train, ferry | Note, an S03 question when there are 2 or more stops | Same as the trip's Getting there | Travel-day items per leg (a liquids bag for a flight leg, motion items for a ferry leg); a driving leg triggers the car seats question. |
| Per stop: dates | arrive and leave dates | S02, S02b | Required | Days per stop, total days, per-day quantities, climate months. |
| Per stop: usual weather | low and high temperature, wet days per week, a short sky line; a climate average, never a forecast | Fetched from NASA POWER climatology (decision 7), never asked unless unavailable | A weather question, else "mild with rain" | Warm, cold and rain clothing groups and their quantities. |
| Per person: age at the trip | kids: from birth month and year when set, else from the age entered in S02 plus the time since it was set; computed on the first stop's arrive date; adults "Adult" | S02 age stepper (months under 2), S09b optional birth month and year | Adult | Age bands (under 1, 1 to 2, 3 to 5, 6 to 12, 13 to 17, adult) pick the catalog variants: diapers, wipes, pull-ups, swim diapers, snacks, comfort items, sizes (decision 13). |
| Per person: travels with | stroller, pull-ups, car seat, travel crib, high chair, blackout shade (S09b chips) | S09b memory, S03 questions | Not brought | Adds the gear to Shared, and removes the matching question. |
| Per person: always pack | items the household confirmed (memory) | S09b, S08 memory | None | Adds those lines to the person on every new trip. |

Facts that are **not** collected because they change nothing at launch: home address, exact birth dates, adult ages, gender, clothing sizes, flight numbers, hotel names, budget. Sizes: the "Check size" tag on S12 is enough. Health information is never asked for (decision 39). Adding a fact needs a spec change and a list change it drives (Q22).

#### 4.1.3 Scout's questions (S03)

Scout writes its own questions for each trip (job J2, 4.2), **up to 6**, and **every question can be skipped** (Q29). It is not a fixed list, but every question must fill one fact from 4.1.2 that is not already known from a higher source (4.1.1); a question whose answer would change fewer than 2 lines is not asked. Scout should ask what this trip needs, not what kids need by default: for example, how they get between three destinations, whether a long trip has several stays and laundry, the dress code for a wedding.

**Skipping assumes the item comes.** A skip saves Scout's stated assumption, dashed, and that assumption must be the safe one: when in doubt, the item goes on the list, because removing a line is one tap and finding it missing at the airport isn't. Skipping "Does Ivy still need pull-ups?" keeps pull-ups; skipping "Car seats?" keeps car seats on Shared.

**Examples and the fallback set.** These questions are the starting examples for J2's instructions and the set the phone asks when Scout fails or is offline (S03 rule). The validator checks every Scout question against a fact key and option values, not against this table.

| ID | Question (as shown) | Trigger | Options | Skip assumes | Changes |
| --- | --- | --- | --- | --- | --- |
| K1 | Does {kid} still need pull-ups? | A child aged 2 to 5, not known | Nights only · Day and night · Not anymore | Nights only | Pull-up count; under 2 always gets diapers with no question |
| K4 | Car seats: bringing them or renting? | A child under 8 and driving (any leg, or a rental car in the note) | Bringing · Renting there · Not needed | Bringing | Car seats on Shared, with the count of children |
| L1 | Can you do laundry on this trip? | 5 or more nights and laundry not known | No · Once, at {stop} · About once a week · Whenever we want | No for 7 nights or fewer; once a week beyond | Per-day clothing counts |
| T1 | How are you getting from {stop} to {stop}? | 2 or more stops and the leg not known | Flying · Driving · Train · Ferry | Same as the trip's Getting there | Travel-day items for that leg; a driving leg can trigger K4 |
| A1 | Staying somewhere different at {stop}? | 3 or more stops, or more than 7 nights, and stays not known per stop | Hotel · Rental · Family or friends · Camping · Cruise | The trip's Staying in | Kitchen, laundry and towel items per stop |
| S1 | How do you like to pack? | No default in A1, and 2 or more stops or flying | Light · Balanced · Ready | Balanced | Optional extras; Luggage fact |
| W1 | What weather are you expecting at {stop}? | Climate unavailable for a stop | Warm · Mild · Cold · A mix | A mix | Climate groups as if the range were known |
| K2 | How does {kid} get around on sightseeing days? | A child under 5, and sightseeing, theme park or hiking | Stroller · Carrier · On foot · A mix | Stroller | Stroller or carrier and its accessories, the day bag |
| K3 | Where will {kid} sleep? | A child under 3 and any stay not camping | Crib there · We bring a travel crib · Shares a bed | Crib there | Travel crib, crib sheets, blackout shade |
| E1 | What's the dress code for the {event}? | A wedding or event | Formal · Smart casual · Casual | Smart casual | Formal outfit group per person, shoes |
| H1 | What kind of hikes? | Hiking | Short walks · Day hikes | Day hikes | Hiking boots vs trainers, day packs, water, layers |
| X1 | Renting ski gear there? | Skiing | Renting skis and boots · Bringing our own · Clothes only | Renting skis and boots | Ski gear group vs clothing only |
| G1 | Camping gear: bringing it or is it there? | Camping | Bringing our own · It's provided | Bringing our own | Tent, sleeping bags, mats, stove on Shared |

Rules for every question, Scout's or the fallback set's:
- Each says why it is asked ("Asking because Ivy is 3", "Asking because you have three stops"). With two children in the same band, one question covers both, with per-child answers.
- 2 to 4 options, each mapping to a value of its fact. No free-text answers.
- A question never asks for health information (decision 39). Medicines are things a parent types as items; Scout never turns them into facts about a person (4.4).
- **Fallback order** when Scout fails: the triggered questions above in table order, up to 6. The same order breaks ties for J2.
- An answer can make another question irrelevant; Change on S03 re-runs the triggers.

#### 4.1.4 Read from the parent's own words (job J1)

From the S02 note, the voice transcript and the S07b text, J1 extracts only these, each as a Scout caught chip the user can remove:

| What | Example text | Becomes |
| --- | --- | --- |
| Laundry and where | "the apartment in Florence has a washer" | Laundry: once, in Florence |
| A stop's stay type | "camping the last two nights" | Staying in: camping, at that stop |
| Rental car | "renting a car in Tuscany" | Getting there adds driving for that stop (can trigger K4) |
| Gear there | "the cabin has a crib", "renting skis" | Answers K3, X1 |
| Gear the family brings | "bringing the stroller", "she naps in the stroller" | Travels with: stroller (this trip) |
| Events | "my cousin's wedding on the 25th" | Doing: a wedding or event (triggers E1) |
| Things to pack | "Leo needs his EpiPen", "don't forget the bunny" | Item lines for this trip, with the person; never stored as facts about the person, and no condition is kept (4.4, decision 39) |
| Things not to pack | "no need for swimwear" | A removal applied to the generated list as a proposal card on S05 |
| Places and dates | "Rome, then Florence, then Cinque Terre, the week of July 4" (voice) | Stops in order with dates, dashed until confirmed on S02 |

J1 never extracts or stores: health conditions, allergies, diagnoses, names of people not on the trip, addresses, phone numbers, emails, booking references. If it sees them, it ignores them; the note text itself stays only on the phone until sign-in and in the trip record after (4.4).

#### 4.1.5 The data model

This is what W2-08 builds as TypeScript types and on-phone storage, and what W5-02 and W9-02 build as Postgres tables. Every row carries `household_id`; access rules check it on every read and write. Guests have the same shapes on the phone, with a local household id that becomes the server household id at sign-in (R1). IDs are UUIDs made on the phone, so nothing is renumbered when it moves.

**Household**: `id`, `created_at`, `admin_adult_id` (decision 37), `home_country` (US at launch, decision 10; used for plug adapters), `plan` (`free` at launch; the access check reads it, decision 6).

**Adult** (an account, 18 and over; none for guests): `id`, `household_id`, `first_name` (1 to 30), `email` (sign-in only), `joined_at`, `settings` (`temp_unit` F or C, default F, `default_style` or none, `suggest_memories` boolean, `email_on_join` boolean), `crew_person_id` (the adult's own crew profile). Whether an adult is the admin comes from the household's `admin_adult_id`.

**Person** (a crew profile, adult or child): `id`, `household_id`, `kind` (adult or child), `first_name` (1 to 30), `color` (one of six), `removed_at` (kept as a name on past trips). Children only (decision 13): `age_years` (0 to 17) and `age_months` (0 to 23, used under 2), `age_set_on` (the date entered), and optional `birth_month` and `birth_year` from S09b. Adults have no age fields.

**Trip**: `id`, `household_id`, `name` (1 to 40), `name_source` (scout or user), `status` (draft, building, ready, archived), `created_by`, `created_at`, `updated_at`, `getting_there[]`, `staying_in[]`, `activities[]`, `note` (up to 2,000), `style`, `facts` (one entry per fact in 4.1.2: `value`, `source` from 4.1.1, `confirmed`), `answers` (question text as shown, `fact` key, stop or person it is about, option, `assumed`, `source` scout or fallback), `people[]` (person ids on this trip), `from_trip_id` (S12), `digest` (written when the trip ends, 4.3), `d1_shown_on` (date).

**Stop**: `id`, `trip_id`, `position`, `place_text`, `place` (`label`, `country`, `lat`, `lon`, `resolved_by` J1 or user), `start_date` and `end_date` (both required), `arrive_by` (how they get here from the previous stop; null for the first), `stay_type` (override of the trip's), `climate` (`low`, `high`, `unit` C, `wet_days_per_week`, `sky`, `source`, `fetched_at`).

**Bag**: `id`, `trip_id`, `name` (1 to 30), `type` (checked, carry-on, backpack, tote), `position`.

**Item line**: `id`, `trip_id`, `owner_person_id` or null for Shared, `catalog_item_id` or null for custom, `name` (1 to 60), `renamed` (boolean), `category` (the six in S06), `need` (1 to 99), `packed` (0 to need), `shopping` (have, to_buy, bought), `bag_id` or null, `note` (up to 300), `source` (rule, scout, user, past_trip, always_pack, memory), `reason` (Scout lines only, up to 120 characters), `scout_run_id`, `size_check` (S12), `updated_at`, `updated_by`. A removed line is deleted; undo keeps it on the phone for the 5-second window and re-inserts it with the same id.

**Memory**: see 4.3.2.

**Scout card** (S05 "Scout noticed"): `id`, `trip_id`, `title`, `body`, `proposal` (the change set, same shape as J4's), `memory_proposal` or null, `state` (open, accepted, declined), `position` (1 to 3).

**Scout run**: see 4.2.6.

**Invite**: `id`, `household_id`, `crew_person_id` (who it is for, decision 37), `email` or null for a link, `created_by` (the admin), `expires_at` (7 days), `accepted_by` or null.

**Usage count** (decision 6; one row per household, account and 30-day period): `household_id`, `adult_id` or null for a guest session, `period_start`, `trips_created`, `list_builds`, `change_requests`. Written by the Edge Functions; read by the access check and the limits.

**App settings** (server, not per household; changed by a founder without an app release, Q32): guest and household Scout limits, the daily spend stop, the model and effort per job, prompt versions. Read by every Edge Function.

**Catalog item** (shared, read-only, not owned by a household; W3-03 writes it): `id`, `name`, `category`, `scope` (per person or shared), `age_bands[]`, `when` (conditions over the facts in 4.1.2, for example `activities has beach and age_band in [under1, 1to2]`), `quantity` (rule from the list below), `style_min` (light, balanced or ready: the lightest style that packs it), `tags[]` (for J3's catalog subset).

**Quantity rules** the catalog uses (W4-01 implements them; W3-03 tunes the numbers):
- `fixed n`: always n (toothbrush 1).
- `per_day`: days = nights + 1; with laundry, quantity = days until the first wash + 1 spare. Over 7 nights with laundry unknown or skipped, assume one wash a week. No caps by style (Q30).
- `per_n_days k`: one per k days, at least 1 (pajamas every 3 days).
- `per_night_child`: diapers and pull-ups by age band and K1 answer; this is the one rule with no cap.
- `per_person_shared`: one per traveler, owned by Shared (passports are out of scope; adapters are per 2 people).
- Every quantity is then bounded to 1 to 99.

**Not in the model on purpose**: who packs an item (decision 5), item photos, prices, shopping links, a per-item weight.

**Check against the test trips** (W2-16 step 4): moved to W3-03, which builds catalog v1 from the 20 trips and must show every item on those trips traces back to a fact above or is a custom item. Q20.

### 4.2 Scout: follow-ups, building lists, changing lists (W2-17)

The detail (schemas, prompt layout, eval set, cost model) is in `docs/scout-design.md`. This section is the behavior every build task must follow.

#### 4.2.1 What Scout is

Scout is four bounded jobs, each one model call inside a Supabase Edge Function, with a JSON schema for its answer and a validator after it. It is not an agent: it never calls tools, never loops, never writes to the database itself. The function writes, and only what the validator passes. Architecture.md's five jobs map onto these four: "propose memories" is part of J3 and J4's answers, not a separate call.

| Job | What it does | Runs when | Built in | Starting model (decision 31) | p95 latency budget | Retry inside budget |
| --- | --- | --- | --- | --- | --- | --- |
| J1 Read | Turns free text (S02 note, the S02 voice transcript, S07b text, S09b "Tell Scout") into structured facts, stops with dates and coordinates, people and items (4.1.4) | 1 s after typing stops, at most once per 10 changed characters, on Continue, and once per voice transcript | W6-02, W8-02, W10-07 | Haiku | 2 s | No |
| J2 Ask | Writes 0 to 6 questions, each filling one fact (4.1.3), states each skip assumption, fills assumed facts, suggests up to 3 trip names | S02 Continue | W6-02 | Haiku | 4 s | Once |
| J3 Build | Adds lines and adjusts quantities on top of the rule list, with a reason on each; returns up to 3 Scout noticed cards; may propose memories inside cards | S04 Create our packing list; S12 (from a past trip) | W7-01, W10-04 | Sonnet | 15 s (S04b's 20 s includes the rule list) | Once, if 8 s remain |
| J4 Change | Turns a request (S08, M1 edits) into a change set: add, change, remove, each with a reason; may add one memory proposal | S08 send; saving trip edits in M1 | W8-01 | Sonnet | 8 s | Once, if 4 s remain |

Model names are the current Claude models (Haiku 5.5, Sonnet 5.5, Opus 5.5 as of Nov 2026). The W7-03 sweep runs every job on all three, Opus included, and decision 31 picks per job by eval score per dollar. The model and effort per job are app settings (4.1.5), so a change needs no app release.

#### 4.2.2 Follow-ups (J2)

- Input: the trip draft (facts with sources, stops with dates, people with age bands, activities), the facts still unknown with their impact counts (how many lines and quantities each value would change, computed by the rule engine on the phone or in the function), confirmed memories for these people (4.3), the default style, and the examples in 4.1.3.
- Scout writes the questions whose answers change the most lines, highest first, **at most 6**. It asks none when every fact is known or would change fewer than 2 lines. Ties follow the fallback order in 4.1.3.
- Output: `questions[]` (the `fact` key, the stop or person it is about, the "Asking because" line, the question text with names filled, 2 to 4 options each mapped to a fact value, the skip assumption), `assumed_facts[]` (fact, value, one-line reason), `trip_names[]` (1 to 3, rule R15).
- The validator rejects any question with no valid fact key, an option that maps to no value of its fact, a fact already known from a higher source (4.1.1), a skip assumption that leaves out an item the other answers would add, more than 6 questions, or any wording about health (decision 39). Rejected questions are replaced from the fallback order.

#### 4.2.3 Building the list (J3)

1. The phone or function builds the **rule list** first from the catalog and the facts (W4-01). This always exists and is the fallback.
2. J3 receives a compact rule list (catalog ids and quantities per person), the trip summary, the household summary (4.3.3) and a catalog subset (items whose tags match the trip; about 150 at most).
3. Scout may: **add** lines (catalog item by id, or custom with a flag), **adjust** the quantity of a rule line up or down, each with a reason of at most 120 characters that names the fact it used ("Three because of a wash around day 5, plus a spare."). It may not remove rule lines; a removal is a Scout noticed card (a proposal, R2).
4. It returns up to 3 **Scout noticed cards**: things worth a yes or no ("Rain most days in Florence. Add a rain cover for the stroller?"), each with its change set and, where something is lasting, a memory proposal.
5. Limits: at most 40 additions, at most 40 adjustments, quantities 1 to 99, owners only people on the trip or Shared, no duplicate of a line already there (it adjusts instead).
6. The validator drops invalid lines. If more than 20% of Scout's lines are dropped, or the call runs past its budget, the run is a **fallback**: the rule list ships with the honest fallback line (3.5) (**decision 32**). Otherwise dropped lines are logged as `partial`.

#### 4.2.4 Changing the list (J4)

- Input: the request text, the current list compact (line ids, names, owners, quantities, packed, bag), the trip summary, the household summary, the catalog subset.
- Output: `changes[]`, each `add` (catalog id or custom, owner, need, reason), `change` (line id, the new need, name or note, reason) or `remove` (line id, reason); optionally one `memory_proposal`; or `no_change` with a one-line answer ("Your list already covers that.").
- Every change is shown as a row in S08 and applies only on Apply (R2). A remove of a line that is already packed says so in its row ("Packed already: take it out of the bag").
- Limits: at most 30 changes per request; changes only to this trip; never changes to the crew, other trips, settings or memories.
- Validation as in J3. If more than 20% of the changes are dropped, S08 shows "I couldn't work that out. Try saying it another way." with the message kept (fallback). Otherwise the valid rows show, with "I left out 2 changes I wasn't sure about." when any were dropped.
- M1 edits (dates, stops, people, activities) call J4 with a generated request ("Trip changed: 9 nights to 5 nights"), so the preview follows the same rules (M1-1). Before W8-01, the rule list diff is shown as the preview.

#### 4.2.5 Cost and spending limits

- **Decision 11** sets the ceiling per generated list in week 8 from real numbers. Until then the working target is: one new trip (J1 a few times, J2 once, J3 once) costs at most **$0.05**, and one S08 request at most **$0.01**. These are planning numbers, not measured; W7-03 reports the real cost per job and the decision replaces them. (Low confidence.)
- Prompt caching for the fixed part of every prompt (instructions and the catalog subset format) is required, because it is most of each request.
- **Every limit below is an app setting** (4.1.5), changed by a founder without an app release, and confirmed after testing (Q32).
- Guest limits (Q11): per guest phone, starting at **1 list build and 1 change request**, then the Limit state asks them to save the trip to an account; J1 and J2 are not limited beyond a rate limit of 30 calls per minute. Signed-in households: 30 builds and 200 changes per 30 days. A limit reached means the fallback with the Limit state (3.5), never an error.
- Daily spend stop: when the day's Scout cost passes the setting (start: $5 a day), every job returns the fallback with `fallback: limit` until midnight UTC. The Console's monthly limit (W6-01, $50) is the backstop.
- **Ready to charge later** (decision 6): before every J3 and J4 run, one access check reads the household's `plan`, its usage counts and the limits, and says yes or which limit applies. At launch the plan is `free` and only the limits above apply. Usage counts (4.1.5) record trips created, list builds and change requests per household and per account for each 30-day period. A future paid plan changes the check, not the screens that call it. Going back to free never deletes or locks data; only new work above the free limits stops.
- Guests call Scout through a Supabase anonymous session (Q21), which gives the limits an identity without creating an account or putting the guest's trip on the server.

#### 4.2.6 What every run logs (`scout_runs`)

`id`, `household_id` (or the anonymous session id), `trip_id`, `job`, `prompt_version`, `model`, `effort`, `started_at`, `latency_ms`, `input_tokens`, `output_tokens`, `cached_tokens`, `cost_usd`, `outcome` (ok, repaired, partial, fallback), `reason` (timeout, schema, quality, empty, limit, error), `lines_proposed`, `lines_dropped`, `drop_reasons` (counts by rule), `questions_asked` (bank ids), `retry_count`. Never logged: names, the note or request text, item names typed by the user, emails, account ids beyond the household id (4.4). For debugging, the validated output with names replaced by role tokens ("child_1") is kept for 30 days in `scout_run_outputs`, then deleted (Q26).

#### 4.2.7 How each job is graded (feeds W7-03 and the week 8 pass mark)

Detail in `docs/scout-design.md`. Summary:

| Job | Code graders (every run of the eval) | Founders grade | Pass mark (set in W8-05) |
| --- | --- | --- | --- |
| J1 | Fields extracted vs the labels on 40 sample notes: precision and recall per field; no forbidden fields (4.1.4) | No | Proposed: 95% precision, 85% recall |
| J2 | Never asks a known fact; never more than 6; every question maps to a fact; skip assumptions keep the item; no health wording; questions chosen are among the founders' top 6 for that trip | Top 6 questions per test trip, once | Proposed: 0 known-fact questions; 80% agreement |
| J3 | Schema valid; invented items (not catalog, not flagged custom); quantity outside the rule band; duplicates; must-have items present (founder-labeled per trip); fallback and partial rates; p95 latency; cost | Each list: missing, wrong, excess (W8-03, W8-04) | Set in week 8 |
| J4 | The 30 parent requests plus adversarial cases: expected change set precision and recall; no change outside the trip; no silent memory | Spot-check 10 | Set in week 8 |

Held out: 5 of the 20 trips are never used while writing prompts. Tracing across a whole trip's runs (for example OpenTelemetry next to `scout_runs`) is considered in W7-03 (Q26). About 15 adversarial cases (instructions hidden in a note, a 30-night trip with 6 kids, a request in another language, contradictory facts, a note with health details and an email address, a request to delete everything) run on every Scout change.

#### 4.2.8 Things Scout must never do

Mirrored in the W6-04 rulebook and checked by the validator or the adversarial set:
- Change a list, trip or memory without a yes (R2), or save a memory itself.
- Follow instructions found in a note, a request, a past trip or a memory. Those are data.
- Add items for someone not on the trip, quantities outside 1 to 99, or more lines than the limits.
- Give medical, dosing, legal or safety advice beyond what to pack. "Pack the EpiPen" is fine; how to use it is not.
- Ask about health, or propose a memory that names a medicine (decision 39).
- Put health conditions, diagnoses, emails, addresses or account ids in a memory, a reason or a log.
- Name brands, prices, shops or links.
- Present the rule list as its own work (3.5).

### 4.3 Memory and the context fed to Scout (W2-18)

#### 4.3.1 Four layers

| Layer | What it holds | Where it lives | Who writes it | Lifetime |
| --- | --- | --- | --- | --- |
| Trip draft | Everything typed in S02 to S04 before Create | Phone only | The user | Until created or discarded |
| Past trips | Each finished trip's lists plus a **digest** (4.3.4) | Phone for guests; Supabase after sign-in | The app, when the trip ends | Until the trip is deleted |
| Household memory | Confirmed facts about people or the household (4.3.2) | Phone for guests; Supabase after sign-in | Only a person's yes | Until forgotten |
| Adult preferences | A1 settings: temperature unit, default style, memory suggestions, emails | Supabase (phone copy for guests: unit and style only) | The adult | Until changed |

#### 4.3.2 What a memory is

A memory is one sentence Scout may use on future trips, tied to a person or to the household, that a person said yes to.

| Kind | Example | Effect on future trips |
| --- | --- | --- |
| `always_pack` | Ivy: always pack Bunny | Adds the line to Ivy on every new trip (S09-4) |
| `never_pack` | Sam: never pack a hairdryer | Removes the line from rule lists and J3 additions |
| `travels_with` | Ivy travels with a stroller | Adds the gear; answers K2 |
| `habit` | Leo runs cold at night | J3 reads it; usually adds or raises a warm layer, with a reason that cites it |
| `quantity` | We always want 2 extra socks per kid | J3 adjusts quantities |
| `household` | We always pack a first-aid kit | Adds the line to Shared |

Fields: `id`, `household_id`, `person_id` or null, `kind`, `text` (up to 120 characters, written by Scout, editable by the user), `item_ref` (catalog id or a custom name, for the item kinds), `status` (proposed, confirmed, declined), `source` (S08 prompt, S05 card, S09b Scout heard, S09b typed), `source_trip_id`, `created_by`, `confirmed_at`, `last_used_trip_id`, `use_count`, `trips_since_used`.

Rules:
- Only `confirmed` memories are ever sent to Scout or shown as facts. `proposed` ones live only in their card or prompt until answered; `declined` ones are kept 30 days so Scout doesn't ask the same thing again on the next trip, then deleted.
- A memory never holds a health condition, diagnosis, religion, or anything in 4.4.4 (decision 39). Scout never **proposes** a memory that names a medicine; a parent may still add an item like "EpiPen" to Always pack themselves (S09b), stored by item name only, never with a reason. "Leo has a peanut allergy" is never stored. The validator rejects memory proposals that contain condition or medicine words from a blocklist, and Scout's instructions forbid them (Q24). Whether a parent-typed item like "EpiPen" is itself an issue is an attorney question (4.4.9).
- "Just this trip" (S08) saves nothing to memory; the change applies to the trip only.
- Editing a memory's text (S08 Change, S09b) keeps its kind and item.
- Forget (S09b, S09c) deletes the row at once; the phone keeps a copy for the 5-second undo. Forget everything (C1) deletes every memory row for the household. Forgetting never changes existing lists (S09 rules).
- **Unused memories**: `trips_since_used` counts new trips that included that person and did not use the memory. At 3, the memory stops being sent to Scout and S09c shows it with "Not used on the last 3 trips" and Forget. It is never deleted automatically. The "keep or forget" prompt that W2-18 asked for is the S09c "Waiting for your OK" card, which is Later (2.1), so at launch the tag replaces it (Q23).
- The A1 toggle "Let Scout suggest things to remember", when off, stops all memory proposals; confirmed memories are still used.

#### 4.3.3 What Scout receives on each call

Scout never receives the full history. The Edge Function builds a **household summary** per call from the database (or, for guests, the phone sends it), within a budget per job:

| Job | Trip summary | People | Memories | Past trips | Current list | Budget (input tokens, excluding cached instructions) |
| --- | --- | --- | --- | --- | --- | --- |
| J1 | Stops and people only | First names and age bands | None | None | None | 800 |
| J2 | All facts with sources | First names, age bands, travels with | Confirmed, for people on the trip, at most 8 | None | None | 1,500 |
| J3 | All facts, climate per stop | As J2 | Confirmed, for people on the trip plus household kind, at most 15, ranked by relevance to the trip's facts then by recency | Digests of up to 2 most similar past trips | The rule list, compact | 5,000 plus the cached catalog subset |
| J4 | All facts | As J2 | As J3, at most 10 | Digest of the trip this one came from, if any | The current list, compact | 4,000 plus the cached catalog subset |

- People are sent as first name and age band; ages, not birth dates. No emails, no account ids, no adult surnames (4.4.2).
- When a summary would exceed its budget, the lowest-ranked memories and the past-trip digests are dropped first, then the list is compressed to counts per category for lines Scout can't change (packed ones).
- The summary is rebuilt on every call, so a forgotten memory is gone from the next call with no cache to clear.
- `last_used_trip_id` and `use_count` are updated when J3 or J4 cites a memory in a reason that the user keeps.

#### 4.3.4 Past trips and "Pack like a past trip"

- When a trip ends (the day after its last stop), the app writes its **digest**: kind of trip (activities, stay types, getting there), nights, climate band per stop, crew with age bands at the time, lines the family added themselves, lines they removed, quantities they changed by more than 1, items left unpacked (likely unneeded), and which memories were used. No free text from notes.
- S12 sends J3 the past trip's kept lines and its digest plus the new trip; Scout's output is the Swapped, Added and Dropped groups (S12 rules). Quantities scale with nights (S12-3). Kids who passed a birthday or a year get "Check size" on clothing and shoes.
- J3 on a new trip uses the 2 most similar digests (same activities and climate band first) to adjust, citing them ("You took 2 extra sweaters to Tahoe and used them").

#### 4.3.5 Where memory and context live for a guest

Everything stays on the phone: crew, memories, digests. J2, J3 and J4 calls send the summary built on the phone, under the same budgets. At sign-in, all of it moves to the household unchanged (R1). A guest who deletes the app loses it (Q19).

### 4.4 Privacy and data handling (W2-26)

Written to be checked against the shipped app in W12-07 (data map), W12-03 (policy), W14-02 (store privacy answers) and the attorney review (W12-04). Every promise on A2 must be true of the build; a promise we can't back is removed, not softened (Q13).

#### 4.4.1 Data inventory

| Data | About | Where it lives | Who can read it | Kept | Deleted by |
| --- | --- | --- | --- | --- | --- |
| Email address | Adult with an account | Supabase Auth | That adult; Supabase as processor | While the account exists | Delete account |
| First names, crew colors | Adults and children | Phone (guest); Supabase (household) | Every adult in the household | While the person is in the crew; as a name on past trips after removal | Remove person; delete account (if last adult) |
| Kids' age and the date it was set; birth month and year if added | Children only (decision 13) | Same as above | Same | Same | Same |
| Trips, stops, lists, bags, check marks, notes | Household | Same as above | Same | Until the trip is deleted | Delete trip; delete account |
| Memories | People and household | Same as above | Same | Until forgotten | Forget; Forget everything; delete account |
| Adult settings | Adult | Supabase | That adult | While the account exists | Delete account |
| Invites | The invited email or link | Supabase | Household adults | 7 days, then deleted | Expiry |
| What Scout receives per call | Trip and household summary (4.3.3) | Sent to Anthropic's API | Anthropic as processor | Anthropic deletes API inputs and outputs within 30 days, longer only if flagged under its usage policy or required by law | Automatic |
| `scout_runs` metrics | Household id, no names or text | Supabase | Founders | 13 months | Automatic; delete account removes the household id link |
| `scout_run_outputs` | Scout's validated answer with names replaced by role tokens | Supabase | Founders | 30 days | Automatic |
| Usage events (4.4.5) | Random install id, household id once signed in | Supabase | Founders | 13 months | Automatic; delete account |
| Usage counts (4.1.5) | Household and account ids, counts only | Supabase | Founders | 13 months | Automatic; delete account |
| Crash reports (4.4.5) | Device model, OS, app version, stack trace | The crash service | Founders, the service as processor | 90 days | Automatic |
| Voice (S02 only) | Adult | Recognized on the phone; only the transcript goes to J1 | No one hears audio | Not kept | n/a (decision 8). Android on-phone recognition is checked in W12-07 |

What Anthropic's API does with our requests is from Anthropic's published commercial data retention policy: inputs and outputs are deleted within 30 days unless a zero data retention agreement applies, a usage-policy flag requires longer, or the law does; API data is not used for training without the customer's permission. W12-04 has the attorney confirm the wording.

#### 4.4.2 What Scout receives, and what it never receives

- Receives: the trip (places, dates or nights, activities, stays, getting there, the facts and their sources), climate per stop, the people on the trip as first name and age band, confirmed memories, past-trip digests, the current list, and the user's own words for J1 and J4.
- Never receives: emails, account or device ids, surnames, exact birth dates, the household's other trips, other households' data, location from the phone (we never ask for location).
- The user's own words can contain anything (a note might include an address). J1 is instructed to ignore personal details, and nothing from the text is stored except the extracted facts and the text itself on the trip, which only the household can read.

#### 4.4.3 Children (decision 13)

Decided: **a first name, a color and an age** (entered in S02, in months under 2, with the date it was set so it ages forward); **birth month and year only if a parent adds them** in S09b, marked Optional. No photos, no full birth dates, no gender, no school, no health details as facts. Kids are profiles, never accounts; accounts are for adults 18 and over (R6, decision 38). The app is for parents, and parents enter everything about their children. Whether COPPA applies is a question for the attorney (4.4.9), with this design as the facts.

**Staff access** (decision 13): no admin screens show household data, and the founders never open a household's data except to fix a support request from that household. This is a policy, written into the privacy policy, not encryption; access rules still keep every household's data from every other household.

#### 4.4.4 Never stored as a fact about a person

Health conditions, allergies, diagnoses, medicines tied to a condition, religion, ethnicity, sexual orientation, gender, precise location, photos, government ids, passport numbers. Items the family wants packed (an EpiPen, a prescription, a kippah) are item lines and `always_pack` memories by item name only, never with the reason.

**Health (decision 39).** The app never asks for health information: no question, field or chip. A hint under the S02 note says "Skip health details. Just list what to pack, like 'EpiPen'." Scout ignores conditions it reads in a note, never writes one into a fact, a reason, a memory or a log, and never proposes a memory with a medicine name. What a parent types (a note, an item name) is stored as typed, for their household only; the app never interprets it as health data.

#### 4.4.5 Usage events and crash reporting (decision 13, second half)

- No ad or tracking SDKs, no third-party analytics. Events go to our own Supabase table through an Edge Function.
- Event list (complete; adding one needs a spec change): `app_opened`, `trip_started`, `trip_created` (stop count, nights bucket, crew size, kids count), `questions_answered` (count asked, count skipped), `list_generated` (outcome, line count bucket), `list_opened`, `item_packed` (sent as one count per session, not per tap), `scout_change_requested`, `scout_change_applied` (count), `scout_card_answered` (yes or no), `memory_saved`, `memory_forgotten`, `trip_all_packed`, `signed_in` (method), `invite_sent`, `invite_joined`, `data_exported`, `account_deleted`. No names, no free text, no item names in any event.
- They exist to measure the launch gates (overview section 6) and beta questions, nothing else.
- Crash reporting: **EAS Observe** (decision 13, Q27) (Expo's error and performance reporting; a paid EAS service, price checked in W12-01) so no vendor is added beyond Expo, with user and device identifiers off; the fallback is Sentry with PII scrubbing. Either way the vendor is listed on A2 (Q27). W12-01 builds it.
- Events and crash reports start only after the first launch screen; there is no consent prompt in the US at launch (decision 10; launching in the EU or UK would need one).
- Change requests per account are counted in usage counts (4.1.5), not in events, so events stay free of account ids.

#### 4.4.6 Retention and deletion

- Guest data never leaves the phone except Scout calls (4.4.2). Deleting the app deletes it (Q19).
- **Delete my account and data** (A1, A2): deletes the adult's account, their settings and invites at once. If they are the last adult, it deletes the household: trips, crew, memories, lists. If other adults remain, the household and its trips stay, the leaving adult's crew profile stays as a person (so lists keep working) unless they remove it first, and ownership passes on (Q5). Supabase backups age out on the plan's backup schedule; the policy says "removed from backups within 30 days" only if the plan's window is 30 days or less (Q28).
- **Download all my data** (A2): one JSON file (household, people, trips with stops and lines, bags, memories, settings) and one CSV per trip (person, category, item, need, packed, shopping, bag), zipped, through the share sheet. No Scout logs (they hold no personal data).
- Remove person, Delete trip, Forget: delete the rows at once; undo only within the 5-second window on the phone.

#### 4.4.7 Vendors

| Vendor | Gets | Terms to check before beta (W12-07) |
| --- | --- | --- |
| Supabase | Everything a signed-in household stores | Data processing addendum; region (West US, W5-01); encryption at rest; backup window (Q28) |
| Anthropic | The Scout summary per call (4.4.2) | Commercial terms and data processing addendum; 30-day deletion and no training (confirmed in the published policy as of Nov 2026); zero data retention is available only by agreement with Anthropic's sales team, so it is not planned for launch (Q25) |
| Expo (EAS) | Builds, updates, crash reports if EAS Observe is chosen | Data processing terms for EAS Observe |
| Apple and Google | Sign-in only, if chosen | Their sign-in terms |
| Climate data source | Coordinates of each stop and the months, no personal data | License for commercial use (decision 7) |

#### 4.4.8 The promises on A2 and what each depends on

| Promise (A2 copy) | True when | Status |
| --- | --- | --- |
| We never sell your data. | Policy and contracts | Ours to keep |
| No ads, and no ad or tracking tools in the app. | No ad or analytics SDK in the dependency list; checked in W12-02 | Holds if 4.4.5 is followed |
| Your trips are never used to train AI models. | Anthropic API terms; we don't train anything | Holds (published policy) |
| Scout only remembers what you approve. | R2 and 4.3.2 | Holds by design |
| Delete everything, any time, in two taps. | A1, then C1 | Holds by design |
| Crew: "First names, a color, and an age for kids. Birth month and year only if you add them. No photos, no full birth dates." | Decision 13 | Holds by design |
| Voice: "Turned into text on your phone. The audio is never uploaded or saved." | iPhone: recognition forced on the phone. Android: on-phone recognition depends on the phone and its language pack | Verify both in W12-07; if Android can't guarantee it, the line changes before launch |
| Anthropic: "It does not train on them and deletes them within 30 days, except if flagged for misuse or required by law." | Anthropic's published commercial retention policy | Holds (Q25) |
| Health: "We never ask for health information, and Scout never saves it. Anything you type, like a medicine on your list, stays as you wrote it, only for your household." | Decision 39; the validator and the event list | Holds by design; attorney checks the wording (4.4.9) |
| Supabase: "encrypted, with access only for your household" | Access rules (W5-02, W9-04 test); encryption at rest per Supabase | Verify in W12-07 |

#### 4.4.9 Questions for the attorney (W12-04)

1. Does COPPA apply when parents enter a child's first name and birth month and year, and the service is directed at adults?
2. Which US state privacy laws apply at our size, and what must the policy say (California in particular)?
3. Is a consent screen needed for first-party usage events in the US?
4. What changes if we launch outside the US (decision 10)?
5. Is the A2 wording of the vendor promises accurate enough to publish?
6. Is storing a parent-typed item like "EpiPen", or an Always pack entry for it, without a condition, health data under Washington's My Health My Data Act or California law (decision 39)?
7. What would accounts for teens (13 to 17) require: state teen privacy laws and app-store age rules (decision 38, Later)?
8. If Android voice recognition can send audio to Google, what must the voice line on A2 and the policy say (decision 8)?

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
- "Rather just talk?" card: mic that opens V1 (decision 8). Scout fills the form from what was said, and the user confirms it here. Hidden until W10-07 ships.
- **Where and when**: trip span ("Nov 20–29 · 9 nights"), numbered stops on a rail, each with a place field, a date button and remove. "Add a stop". Helper: "Each stop gets its own dates, so Scout packs for the weather there."
- **Who's coming**: crew count; one row per person with avatar (crew color, initial), name, an Adult or Kid switch, and for kids a minus and plus **age stepper** in years that counts **months under 2** ("8 mos", "18 mos", "3 yrs"); adults show no age; remove. "Add someone".
- Chip groups: **Getting there** (Flying, Driving, Train, Ferry; pick all), **Staying in** (Hotel, Rental, Family or friends, Camping, Cruise; pick all), **What you'll do** (Sightseeing, Museums, Hiking, Beach, Swimming, Skiing, Theme park, Nice dinners, A wedding or event; pick any).
- **Anything else?**: multiline note with placeholder "Laundry, naps, a wedding, gear you rent there." and the hint "Skip health details. Just list what to pack, like 'EpiPen'." (decision 39). No mic; keyboard dictation works here.
- **Scout caught**: chips of facts Scout read from the note (for example "Laundry in Florence", "Stroller").
- **Continue** (ink).

**States.**
- Stop without dates: dashed date button "Add dates for this stop". There is no length mode (Q2).
- After voice: fields Scout filled are dashed (R14), with "Scout also caught N details" above Scout caught.
- Scout caught: hidden when empty; chips appear as the note is read.
- Returning household: Who's coming is prefilled from the crew (all adults plus all kids), each removable for this trip.

**Rules.**
- At least one stop with a place is required. Place is free text; autocomplete is a Should (depends on the weather source, decision 7).
- Stops are in order; each stop's start is the previous stop's end by default. Changing a stop's dates moves the next stop's start to match and says so in S02b ("Cinque Terre moves to start the day you leave.").
- Dates: every stop needs arrive and leave dates; past days cannot be picked (S02b).
- At least one person is required. Names: 1 to 30 characters; duplicates allowed but get "Leo (2)" in lists. Kids' ages: 0 to 23 months, then 2 to 17 years; the stepper starts at 5 yrs for a new kid. Adults: no age. A person picked from the crew carries their profile and current age; changing a kid's age here updates the profile and its date (decision 13). A new person here is added to the crew only after the trip is created, and S09 shows them.
- Chips are optional. "Pick all" groups are multi-select; nothing is preselected for a new household.
- Note: up to 2,000 characters. Scout reads it after 1 s of no typing and on Continue (W6-02). What Scout reads appears only as Scout caught chips; the note text itself never changes. A chip can be removed with one tap, which tells Scout to ignore that fact.
- Before W6-02 ships, notes are stored as typed and Scout caught is hidden.
- Continue is enabled when there is one place with dates and one person. It saves the draft and opens S03.
- Back with any input opens C1 Discard new trip (R12).

**Acceptance.**
- S02-1 Create a trip with two stops, dates, 2 adults and a child; Continue opens S03 with all of it in the draft.
- S02-2 Changing stop 1's end date moves stop 2's start to the same day.
- S02-3 Continue stays disabled with no place or no person and says which is missing when tapped.
- S02-4 Typing "the apartment in Florence has a washer" shows a Scout caught chip "Laundry in Florence" within 2 s on a normal connection; removing the chip leaves the note text unchanged.
- S02-5 Offline, the form works and Continue saves the draft; Scout caught shows "Scout will read this when you're back online."
- S02-6 Back with input asks to discard; Keep editing returns with everything intact.
- S02-7 The mic returns from V2 with stops, dates, people and note filled from the transcript, each Scout-filled value dashed until edited or confirmed (R14), and "Scout also caught N details" when J1 found more.
- S02-8 A kid's age stepper goes 22 mos, 23 mos, 2 yrs on plus and back on minus; an adult row has no age control.

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

Sources `VoiceRecord.dc.html`, `VoiceTranscribe.dc.html` · full-screen modals · built in W10-07 on development builds (W9-10). S02 only (decision 8, R17).

**V1 content.** Cancel; "Listening · 0:14"; "Telling Scout about the trip"; **prompts for what to say**, ticking off as they are heard: where you're going, when, who's coming, how you're getting there, what you'll do, anything special (laundry, naps, gear you rent); live text as it is heard; level bars; **Tap to finish**; "Turned into text on this phone. Audio is never saved."

**V2 content.** "Transcribing" then "Done"; "Writing it down…" then "Got it. Here is what I heard."; the transcript in quotes; **Check what Scout filled in** (ink); Record again.

**Rules.**
- The first mic tap asks for microphone and speech permission with the system prompt, preceded by one line on what it is for. If refused, the mic shows "Turn on the microphone in Settings to talk to Scout" and typing still works.
- Recording stops on Tap to finish, after 2 minutes, or on Cancel. Cancel discards the text and returns with nothing changed.
- Transcription runs on the phone. The transcript, not audio, is what Scout receives.
- V2 sends the transcript to J1 once. Check what Scout filled in returns to S02 with the basics filled for the user to confirm and the extra details as Scout caught chips; Scout-filled values are dashed (R14). Record again returns to V1.
- iPhone: recognition is forced to run on the phone. Android: on-phone recognition is used where the phone supports it; W12-07 checks what happens where it doesn't (4.4.8).

**Acceptance.**
- V-1 No audio file is written outside temporary memory, and none is uploaded (checked by network log in W12-02).
- V-2 Refusing mic permission leaves the typed path fully working.
- V-3 Cancel in V1 returns to the origin with nothing changed.

### S03 · Scout's questions

Source `Clarify.dc.html` · route `/trips/new/questions` · built in W6-02 (questions) and W6-03 (weather, screen).

**Purpose.** Ask only what changes the list, one question at a time, at most six.

**Content.** Back; progress with one segment per question and "1 of N" (N up to 6); **Skip the rest**; weather card ("Usual weather for your dates", labeled as an average, not a forecast, for example "Usually 46 to 60°F in November", one column per stop with dates and a range, one summary line); answered rows with key, value and Change; the current question with "Asking because Ivy is 3", the question, why it matters, 2 to 4 option cards with a detail line, and a skip link; when done, Scout's closing card ("That's all I need. Underlined in orange means I guessed.") and **Review the trip** (ink).

**States.** Question 1 to 6; answered with Change; skipped shows the assumed value dashed; done; no questions needed (goes straight to done); weather loading; weather unavailable.

**Rules.**
- Questions come from Scout (4.1.3, 4.2.2): up to 6, each filling one fact. A question already answered in S02, the note, a default (Q10) or a confirmed memory is never asked.
- Each question says why it is asked ("Asking because …"). Picking an option saves it and advances. **Every question has a skip link**: it saves Scout's stated assumption, which keeps the item on the list (4.1.3), marked as assumed, and advances. **Skip the rest** saves every remaining question's assumption and goes to done.
- Change on an answered row returns to that question with the current answer selected; later answers stay unless the changed answer makes them irrelevant, in which case they are removed and Scout may ask a different one.
- Weather: one range per stop for that stop's dates, climate averages from NASA POWER (decision 7); never forecast language. If unavailable, the card says "I couldn't get the usual weather. I'll ask instead." and Scout may ask a weather question (counts toward the 6).
- If Scout fails, S03 asks the fallback set from 4.1.3 (triggered questions in table order, up to 6) and logs a fallback run (R3). The user is not told unless the questions change.
- Back returns to S02 with every answer kept.

**Acceptance.**
- S03-1 A trip whose S02 already says laundry access is never asked about laundry.
- S03-2 Skipping a question shows the assumed value dashed in the answered rows and on S04; skipping the pull-ups question keeps pull-ups on Ivy's list.
- S03-3 Change on answer 1 returns to question 1 with the old answer selected.
- S03-4 No more than six questions are asked on any trip, including a weather question.
- S03-6 Skip the rest on question 2 of 5 reaches done with questions 2 to 5 assumed and dashed on S04.
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

**Content.** Sheet header "Edit item"; editable name; owner and category ("Ivy · Clothing"); Scout's reason when the item came from Scout ("Three because of a wash around day 5, plus a spare."); **Need** and **Packed** steppers ("2 of 3"); **Shopping**: Have it, To buy, Bought; **Bag**: No bag yet, then each trip bag (optional); **Note** (keyboard dictation; no mic); Remove from list; **Done** (ink).

**Rules.**
- Need: 1 to 99 (Q7 for zero). Lowering Need below Packed lowers Packed to match.
- Packed: 0 to Need.
- Shopping and Packed are independent (R5).
- Bag: one or none. Bags come from S10b; "No bag yet" is the default.
- Name: 1 to 60 characters. Renaming a catalog item keeps its catalog link for Scout and marks it renamed.
- Note: up to 300 characters.
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

**Content.** Sheet "Add to the list" for the trip; a text field ("2 binoculars for Leo"; keyboard dictation, no mic); "Scout read it as": item name, category, quantity stepper; **For** chips (each person and Shared); **Bag** chips (optional); **Shopping**: Have it, To buy; button "Add to Leo's list" (ink; the label names the owner).

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

**S08a content.** Scout sheet "Editing the Italy list"; "What changed?"; "Type it or say it. You'll see every change before anything moves."; "People often say" examples (tap to fill the field); message field (keyboard dictation, no mic) and orange send.

**S08 content.** The user's message; "Here's what I'd change. Nothing happens until you apply it."; "5 of 5 changes selected"; one row per proposed change with a toggle, kind (Add, Change, Remove), title, detail and the people it touches; **Apply 5 changes** (orange; "Nothing selected" and disabled at 0); a memory prompt when Scout heard something lasting ("Leo runs cold at night. Always pack a warm sleep layer for him?" with Remember, Just this trip, Change); message field for a follow-up.

**States.** Idle; Scout working; preview with all selected; some deselected; nothing selected; memory open, saved ("Saved to Leo's profile"), just this trip ("Only for this trip"); no changes needed ("Nothing to change. Your list already covers that."); Scout failed ("I couldn't work that out. Try saying it another way." with the message kept); limit and offline (section 3.5).

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

**S10 content.** Back to packing; "Italy · 4 bags"; Edit bags; no Scout card (the bag sort is Later, 2.1; the No bag yet card carries the count); one card per bag with icon, name, its type ("Checked", "Carry-on"; Q3), "44 of 64" packed, a crew color mix bar, expandable rows (check, name, owner, "· to buy"), "N more in this bag", and a note when an item rides in another person's bag; **No bag yet** card with count.

**S10b content.** "Your bags · Name them the way you do."; one row per bag with a name field, a type chip (Checked, Carry-on, Backpack, Tote; tap cycles) and remove; Add a bag; "Removing a bag never removes what's in it."; **Done**. (The Scout bag suggestion is Later.)

**States.** S10: no bags ("Add bags if you want them" and Edit bags); bag expanded.

**Rules.**
- Bags are per trip. A new trip has no bags unless created from a past trip (S12), which copies them.
- Removing a bag moves its items to No bag yet (copy on screen). No confirm (R9); undo toast instead.
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
- Archive moves the trip to S01e Archived; Delete removes it for the whole household. Any account in the household can do either (decision 37).

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
- Upcoming: trips whose last stop hasn't ended, not archived, ordered by start date. Past: ended trips, newest first. Archived trips appear in neither (S01e).
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

**S09 content.** Back; Add someone; "Your crew · Scout uses this on every trip. Nothing new is remembered without your OK."; one card per person (avatar, name, "Adult" or the kid's age, up to 3 memory tags and "+N"); What Scout remembers card ("12 things, across 5 lists", per-person counts, "1 suggestion waiting for your OK"); "Kids' ages update on their own."; "Kids don't need accounts. Invite another adult" (S11).

**S09b content.** "Crew · profile" or "New person"; avatar preview; Name; for kids: **Age** (the same stepper as S02) and **Born · Optional** (month and year, each optional: "Optional. Without it, Scout uses the age you set and adds a year each year."), and a note ("Ivy turns 4 in July. Scout uses the age on each trip date." when the birth month is known); adults have no age or birth fields; Their color (six crew colors); **Tell Scout about Ivy** (text; keyboard dictation, no mic) and "Scout heard" cards, each with Save and skip; **Always pack** list with Add; **Travels with** chips (Stroller, Pull-ups, Car seat, Travel crib, High chair, Blackout shade); What Scout remembers for this person with Forget; Remove Ivy from the crew (red) or Cancel for a new person; Done.

**S09c content.** Back to crew; "12 memories"; search; filter chips by person with counts; "Waiting for your OK" card for pattern suggestions (Later, 2.1); groups by person with each memory's text, source ("Confirmed after Lisbon", "Saved by you · used on 3 trips") and Forget; empty search ("Nothing matches. Scout only remembers what you've said yes to."); Forget everything Scout knows (C1); How your data is used (A2); toast "Forgot: …" with Undo.

**Rules.**
- A kid's age on a trip is computed on the trip's first arrive date: from birth month and year when set (a year alone counts from July), else from the age and the date it was set (decision 13). Adults have no age.
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
- S09-6 Leo set to "5 yrs" on Nov 23, 2026 with no birth date shows "6 yrs" for a trip in December 2027.
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

**S13b content.** "Nadia invited you"; "Help pack for Italy."; the trip card with progress; three things you can do; "You'll join Nadia's household as Sam and see its trips. Kids are profiles, so they don't need accounts."; **Join and start packing**; Not now.

**Rules.**
- Accounts are for adults 18 and over (decision 38). S13 says so in one line ("Accounts are for adults 18 and over."); a Should for W9-03 is a one-tap "I'm 18 or older" confirm on first sign-in.
- Sign-in methods: Apple (iOS only; App Store guideline 4.8 expects a privacy-focused sign-in option next to Google, and Sign in with Apple meets it; W11-02), Google, email magic link (15 minutes, single use, opens the app on the same phone). Android shows Google and email.
- On first sign-in, the guest's trips, crew, memories and check marks move to the new household unchanged (R1). On sign-in to an existing account, guest data on the phone merges into that household; a trip never duplicates.
- Close and Not now return to where S13 opened with nothing lost.
- S13b opens from an invite link. Join requires sign-in (S13 opens if needed) and then adds the account to the inviting household, linked to the crew person the invite names (decision 37). A guest's trips and crew on the phone come along (Q6); a crew person with the same first name as one in the household asks once "Is this the same Leo?" (Same person merges the profiles; Different keeps both). An account already in another household is asked to leave it first (one household per account). An expired or used invite says so and offers to ask for a new one.
- If the app isn't installed, the link opens kitmunk.com with store buttons; after installing, the person taps the link again (carrying the link through the install is Later).

**Acceptance.**
- S13-1 A guest with one packed trip signs in with email: the same trip, counts and check marks appear, and no Scout run happens.
- S13-2 An expired magic link explains itself and offers to send a new one.
- S13b-1 Joining from Sam's phone shows Nadia's trips and crew; packing on one phone shows on the other within 2 seconds (W11-04).

### S11 · Pack together

Source `Share.dc.html` · route `/household` · built in W11-04.

**Content.** Back; "Your household · Pack together · Everyone you invite sees every trip and can check things off."; members (avatar, name, "You · admin" or "Admin", "Joined Nov 21", pending "Invited 2 days ago · not joined yet" with Resend); for the admin only: **Invite someone** with "Who is this?" (pick an adult from the crew or add a new one), field "Email or phone" and Send, Copy invite link ("Link copied"), and Remove on each member; "Kids are profiles, so they don't need accounts."

**Rules.**
- Guests see S13 first; inviting needs an account. Only the admin invites and removes accounts (decision 37); other members see the member list without those controls.
- An invite names the crew person it is for and is a link valid for 7 days, single household, reusable until accepted by one person. Email invites are sent from the server; phone invites open the system share sheet with the link (no SMS sending by us).
- Resend sends again and restarts the 7 days. Cancel invite: Should.
- Recent and presence ("Packing Ivy's list now") are Never (Q15). Member rows show "You · admin", "Joined Nov 21" or the pending line.
- Removing a member (admin only, C1 Remove account) takes the account out of the household; their crew profile stays as a person so lists keep working. The removed account keeps its login and starts an empty household.

**Acceptance.**
- S11-1 Copy invite link, open it on a second phone, join: the member list updates on both phones.
- S11-2 Both phones check items on one list; the counts agree within 2 seconds; an item edited on both at once ends in a predictable state (W11-05 defines the rule).

### A1 · Account and settings · A2 · Your data and privacy

Sources `Account.dc.html`, `Privacy.dc.html` · routes `/account`, `/account/privacy` · built in W9-03.

**A1 content.** Back; name and email; "Free while we're new" (one quiet line; decision 6); Household ("2 adults · 1 invited", opens S11); Crew and what Scout remembers (S09); **How Scout packs for you**: Temperature °F/°C, Default packing style Light, Balanced, Ready; toggles "Let Scout suggest things to remember · It always asks first." and "Email me when someone joins"; Your data and privacy (A2); Leave household (C1; members only, not the admin); Delete my account and data (C1, red); Sign out (C1).

**A2 content.** "Your data, plainly"; Our promises (5 lines); What we keep, and where; Who helps us run kitmunk (Supabase, Anthropic, Apple and Google); Download all my data; Review what Scout remembers (S09c); Delete my account and data (C1); Read the full privacy policy (kitmunk.com/privacy, W15-02).

**Rules.**
- Settings save at once and sync to the account; temperature and style apply to new trips and to display everywhere (Q10, Q12).
- Download all my data produces a file of trips, lists, crew and memories (JSON plus a readable CSV of lists) delivered through the system share sheet. W2-26 sets the format.
- Delete my account and data, for a member: deletes the account and its settings; the household and its trips stay. For the admin: deletes the household and everything in it (decision 37), after C1 states the impact ("This deletes 6 trips and the crew for Maria too") and offers **Make Maria the admin first**, which moves the admin role and then deletes only the account. Other accounts in a deleted household keep their logins and start an empty household. Data leaves the server at once and backups on the schedule in 4.4.6. It cannot be undone (C1 says so).
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
| Delete account (member) | A1, A2 | Delete your account? | Delete account / Cancel | Yes | S01a |
| Delete account (admin) | A1, A2 | Delete your account and the household? (body names the trips and the other members) | Delete everything / Cancel, plus **Make Maria the admin first** | Yes | S01a |
| Remove account | S11 (admin) | Remove Sam from the household? | Remove / Keep Sam | Yes | S11 |

**Rules.** The body text uses real names and counts. Back is the default focus. Go performs the action once; double taps do nothing more. Archive trip, Remove item and Forget a memory are not C1 variants: they act at once with an undo toast (2.2). W2-31 removes them from the canvas.

**Acceptance.**
- C1-1 Each variant's body names the real trip, person, item or memory and the real count.
- C1-2 Back leaves everything unchanged.

---

## 10. Not designed yet

Each needs a design before its build task starts, or the build task draws it from the design system and notes it in the pull request.

- Paywall and manage plan: Later (decision 6, free at launch).
- Drawn in W2-31 before their build tasks: the S02 age stepper and Adult or Kid switch, V1 prompts, S03 Skip the rest, S11's non-admin view and "Who is this?" picker, C1 Delete account (admin) and Remove account, the A1 "Free while we're new" line.
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
| S05 Scout cards, S07b Scout reading | #21 W8-02 |
| Development builds | W9-10 (issue created when it starts) |
| V1, V2 on S02 | W10-07 (issue created when it starts) |
| S13 (Google, email), guest move, sync | #22 W9-02 |
| S13, A1, A2, export, delete | #23 W9-03 |
| S09, S09b, S09c | #24 W10-03 |
| S12, S01b | #25 W10-04 |
| S13 Apple | #26 W11-02 |
| S13b, S11 with the admin role, live check marks | #27 W11-04 |
| Concurrent edits and offline check marks | #28 W11-05 |
