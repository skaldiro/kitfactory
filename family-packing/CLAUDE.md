# Kitmunk (family-packing)

An AI-first packing app for families who travel. Parents describe a trip, Scout (the in-app AI) asks a few tailored questions, and the family gets a packing list per person they can work through together on two phones.

Naming: the app and the company are **Kitmunk** (decision 1, closed Nov 17). The folder stays `family-packing/`. Use the `APP_NAME` constant in code, set to `Kitmunk`. "Kitbag" has a legal conflict and must never appear in code, copy or store listings. The AI assistant is "Scout". The logo and Scout mark files are in `design/system/assets/Logos/`.

## Where things live

- This folder holds technical work only: code, the requirements spec, designs exported from the design canvas, the design system, test trips, lessons and the changelog.
- The plan, the task tracker, decisions and accounts live in the shared Google Drive folder Kitmunk. The tracker always wins a conflict.
- Every build task has a GitHub issue titled with its tracker ID (for example `W3-01 · ...`), labeled `build`, in a weekly milestone. The issue holds the task contract.
- Decisions that change how the app is built are copied into "Decided" below after each weekly meeting, with a sync date, and applied in `docs/spec-v2.md` by pull request the same week.

## Read these first, in this order

1. The GitHub issue you were asked to work on (its contract).
2. "Decided" below, then `docs/spec-v2.md` (signed in W2-09; it replaces `docs/prd.md`).
3. `docs/lessons.md`: mistakes not to repeat.
4. `docs/architecture.md`: how the parts fit, how Scout fails safely, where each fact lives.
5. `design/DESIGN.md` once it exists, else `design/tokens.json`; then `design/screens.md` and `design/README.md`.

## Decided

Synced from the tracker's Decisions tab on 2026-11-23 (after W2-09, spec v2 signed). If this date is more than 8 days old, or a decision your task needs is not here, stop and ask. `docs/spec-v2.md` has the detail; where this list and the spec differ, the tracker wins, then the spec.

- 1 · Name: Kitmunk, for the app and the company. Domain kitmunk.com.
- 2 · Logo: A, "the Case" (suitcase with four ribs in the crew colors, on an orange tile, lowercase kitmunk wordmark). Scout keeps the blaze. Assets: `design/system/assets/Logos/`.
- 4 · A guest gets a full list before signing up.
- 5 · No packing assignment at launch; bags are off the main view.
- 6 · Free at launch ("Free while we're new"). Build the seams now: one access check before each Scout build and change, trips counted per household, change requests counted per household and per account, Scout limits and the spend stop as app settings. Paywall and purchases are Later; going back to free never deletes or locks data.
- 7 · Weather: climate averages from NASA POWER, cached per place and month, labeled as usual weather, never a forecast. Forecasts Later.
- 8 · Voice: in-app voice only on S02 "Rather just talk?" (V1, V2), recognized on the phone, audio never uploaded or saved; built in W10-07 on development builds (W9-10). Every other field uses keyboard dictation; no other mics.
- 9 · Phones only, portrait; iPads run the phone layout. Oldest OS: iOS 16.4 and Android 7 (SDK 58).
- 10 · US only, US English, °F by default with the °C switch in A1; home plug US.
- 12 · Web: Later.
- 13 · First names only for everyone. Kids: age set in S02 (minus and plus stepper, months under 2) with the date it was set, so it ages forward; birth month and year optional in S09b. Adults have no age. No photos, no full birth dates, no gender. Usage events: the fixed list in spec 4.4.5. Crash reporting: EAS Observe. Staff don't open household data except for that household's support request.
- 14 · A new trip starts with 2 adults; no upper limit.
- 15 · No cap on adults in a household.
- 17 · Where things live: one home each. Drive holds the tracker, the overview doc, business, legal, brand and notes; GitHub holds technical work only; Claude holds the design canvas. No copies, except the Repo = Y decisions mirrored here with a sync date. The full map is `docs/architecture.md`, "Where each fact lives".
- 29 · Orange means Scout. A main button is orange only when it hands work to Scout or applies what Scout proposed: Plan a trip (S01), Create our packing list (S04), Ask Scout and its send button (S08), Apply N changes (S08), Create the list from a past trip (S12). Every other main button is ink on light screens and mist on dark screens. At most one orange button per screen. Progress, tags and links use ink and crew colors, never orange.
- 30 · Build sessions use Opus for build and spec work, Haiku for read-only repo search; anything else case by case.
- 32 · A Scout run fails (rule list with a notice) when more than 20% of its lines are dropped or it runs past the job's latency budget. Starting value, retuned in W7-03.
- 33 · This section is synced after each weekly meeting; `scripts/check.sh` fails when the date is more than 8 days old.
- 34 · Every session runs the session-start check first; any conflict goes to a founder before work starts.
- 35 · Contrast: inputs and unselected chips are outlined in edge #7D8B85, never line #D9DFD6. Done green is #0B7A54; crew mint keeps #0F8A5F. The outline button on ink uses #5E8A7C.
- 36 · Expo Go plus EAS Update previews on both phones until development builds in week 9 (W9-10).
- 37 · The household's creator is its admin: pays (when there is a plan), invites and removes accounts, deletes the household. Every account creates, edits and deletes trips, packs, uses Scout and edits the crew. Invites name the crew person they are for. The admin's account delete deletes the household after offering "Make <name> the admin first".
- 38 · Accounts are for adults 18 and over. Kids are profiles. Teen accounts Later.
- 39 · No health data: never asked; Scout never saves health details in a fact, reason, memory or log, and never proposes a memory with a medicine name. Parent-typed items are stored as typed.
- Still open, do not assume: 11 cost ceiling per list (week 8; working targets in spec 4.2.5), 31 Scout's model per job (week 8; starting models in spec 4.2.1).

## Stack

- App: Expo (managed workflow, development builds), React Native, TypeScript, Expo Router.
- Backend: Supabase: Postgres with row-level security per household, Auth (Sign in with Apple, Google, email magic link), Realtime, Edge Functions.
- AI: Claude API, called only from Supabase Edge Functions. Never from the app.
- Builds and releases: EAS Build, EAS Submit, EAS Update.
- Folder layout once scaffolded: `app/` (routes), `src/components/`, `src/features/<feature>/`, `src/lib/`, `supabase/` (migrations, functions), `eval/` (Scout test trips and harness), `scripts/check.sh` (the gate).

## Product rules that must hold everywhere

- A guest can build and use a full list before signing up. Signing up moves the guest list to the account without regenerating it.
- Scout never changes a list or saves a family memory silently. Every AI change is shown as a preview the user approves line by line. Every memory needs an explicit yes.
- When Scout fails, the app falls back to the rule-based list from the catalog. The user never loses input. Every Scout run is logged with its outcome and reason (see `docs/architecture.md`); a fallback is never silent in the logs.
- Progress counts item lines, not units. An item is done when packed quantity is at least the required quantity.
- Packing state and shopping state ("to buy", "bought") are independent.
- Children are profiles, never accounts; accounts are for adults 18 and over (decision 38). A child is a first name, a color and an age with the date it was set, plus birth month and year only if a parent adds them (decision 13).
- The household's creator is its admin (decision 37). Never store health information as a fact about a person (decision 39).
- The data model is shared-household from day one, with any number of adults.
- Packing assignment ("who packs it") is out of scope for launch.

## Design rules

- Values come from `design/DESIGN.md` and `design/tokens.json` (generated from DESIGN.md; never edit it by hand). Layout and copy come from the `design/screens/` images and the `design/source/` files (states, sample copy). Where a file disagrees with DESIGN.md, DESIGN.md wins. Never invent new colors.
- Font: Archivo only (100% width for reading, 62.5% for display). No DM Mono.
- Icons: lucide-react-native at strokeWidth 2.2, plus the custom case and Scout marks.
- Every AI moment uses Scout's mark and the orange "flare" color. Dashed orange means an assumption or a question; solid means fact. Button color follows decision 29.
- Touch targets at least 44 by 44 points. Text contrast at least 4.5:1. Every icon-only button has an accessibility label.
- Before a screen PR, critique your own screenshots for AI tells: generic cards, weak hierarchy, uneven spacing, needless gradients, template layouts. Fix them.
- If the design and `docs/spec-v2.md` disagree on behavior, the spec wins. Note the conflict in the pull request.

## Working style

- This codebase is yours: Claude writes all of it, so fix duplication and nearby problems you find, inside the task's scope.
- Keep going until the contract's "Done when" lines pass. Errors, timeouts and failing tools are not blockers: find the cause, then retry, fix the call or take another route.
- Real blockers: anything on the approvals list, missing access, a conflict with a product rule or a decision. Stop, say what you found, propose the safe option.
- One line before you start, one line every few steps, and a change receipt at the end.
- Unattended runs (Claude Code on the web, overnight): a message without a tool call ends your turn and stops all work. Never end a turn with a summary that announces the next step, an offer to continue, a list of non-blocking choices or a milestone report. Put status in the same message as the next tool call.

## Approvals (ask first; nothing else needs asking)

New dependency or native module. Database migration. Creating any account, paid service or cloud resource. EAS build or submit to testers or stores. Anything that deletes data. Changing CI, hooks, `.claude/` or these rules. Pushing to `main` is never allowed; merging is the founders' job.

## Definition of done

- `scripts/check.sh` prints `GATE: PASS` (paste the output in the PR). Until the scaffold creates it, run type check, lint and tests by hand.
- The `checker` agent replies ACCEPT against the issue's contract.
- Screen work: simulator screenshots of every state, beside the matching `design/screens/` image.
- The PR follows `.github/pull_request_template.md`.

## Loop stop rules

- 5 build-check cycles used: stop, list what still fails and what was tried.
- The same failure twice in a row: stop. You are guessing, not fixing.
- A fix breaks a check that passed before: stop.
- Never weaken, skip or delete a check or test to reach green.

## Starting and ending a session

Founders start with "Work on W3-01", "Work on issue #5" or "Work on the next task".

1. Run the `session-start` skill first. If it reports a conflict, stop and wait for a founder. No work starts on a conflict.
2. "Work on the next task": pick the open `blocker` issue first; otherwise the lowest-numbered open `build` issue in the earliest open milestone with no open pull request. Say which and wait for a yes. A named task with no issue: create it from `.github/ISSUE_TEMPLATE/build-task.md` and say so.
3. Switch to `main` and pull. Create `family-packing/<tracker-id>-<short-name>`, for example `family-packing/w3-01-trip-form`.
4. On the founder's Mac: start the app and show the QR code for Expo Go, or open the iOS simulator. In a cloud session: say there is no live preview.
5. Build with the `screen-from-design` skill for screens and the `scout-change` skill for anything under Scout. Use `/loop` for build-check cycles.
6. When the founder says to ship it: run the `session-end` skill. It opens the PR, updates lessons and the changelog, and tells the founder which tracker row to mark Done. Never merge.

## Commands

Run from `family-packing/`. Add packages with `npx expo install <package>` (never `npm install <package>`), and only after a founder's yes.

| What | Command |
| --- | --- |
| Install | `npm ci` |
| Start (QR code for Expo Go on a phone) | `npx expo start --go` |
| Run on the iOS simulator | `npx expo start --go --ios` (the first time, tap Open on the simulator's "Open in Expo Go?" prompt) |
| Run on the Android emulator | `npx expo start --go --android` |
| Type check | `npm run typecheck` |
| Lint (no warnings) | `npm run lint` |
| Test | `npm test` |
| Gate (must print `GATE: PASS`) | `bash scripts/check.sh` |
| Preview on any phone, no Mac running | Automatic: every PR touching `family-packing/` gets an EAS Update on branch `pr-<number>` and a QR code comment (`.github/workflows/preview.yml`, needs the `EXPO_TOKEN` repo secret). Open it in Expo Go. |
| Preview clean-up | Automatic: when a PR is merged or closed, its EAS branch `pr-<number>` is deleted (`.github/workflows/preview-cleanup.yml`); that PR's QR code stops working. |
| Latest `main` on any phone | Automatic: every merge touching `family-packing/` publishes to the EAS branch and channel `main` (`.github/workflows/update.yml`). The fixed QR code is in `README.md`. |
| Publish a preview by hand | `npx eas-cli@latest update --branch <name> --environment preview --message "<what changed>"` |
| Development build (needs a founder's yes, and `expo-dev-client` added first) | `npx eas-cli@latest build --profile development --platform ios` |

Code layout: routes in `app/`, components in `src/components/`, the theme in `src/theme/` (the only reader of `design/tokens.json`), shared helpers in `src/lib/`. `src/lib/routes.ts` lists every route in `design/screens.md`.
