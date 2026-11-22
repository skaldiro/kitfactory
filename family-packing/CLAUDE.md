# Kitmunk (family-packing)

An AI-first packing app for families who travel. Parents describe a trip, Scout (the in-app AI) asks a few tailored questions, and the family gets a packing list per person they can work through together on two phones.

Naming: the app and the company are **Kitmunk** (decision 1, closed Nov 17). The folder stays `family-packing/`. Use the `APP_NAME` constant in code, set to `Kitmunk`. "Kitbag" has a legal conflict and must never appear in code, copy or store listings. The AI assistant is "Scout". The logo and Scout mark files are in `design/system/assets/Logos/`.

## Where things live

- This folder holds technical work only: code, the requirements spec, designs exported from the design canvas, the design system, test trips, lessons and the changelog.
- The plan, the task tracker, decisions and accounts live in the shared Google Drive folder Kitmunk. The tracker always wins a conflict.
- Every build task has a GitHub issue titled with its tracker ID (for example `W3-01 · ...`), labeled `build`, in a weekly milestone. The issue holds the task contract.
- Decisions that change how the app is built are copied into "Decided" below after each weekly meeting, with a sync date. Once `docs/spec-v2.md` exists, they move into the spec and this section points there.

## Read these first, in this order

1. The GitHub issue you were asked to work on (its contract).
2. "Decided" below, then `docs/spec-v2.md` once it exists (until then `design/screens.md` plus `docs/prd.md`).
3. `docs/lessons.md`: mistakes not to repeat.
4. `docs/architecture.md`: how the parts fit, how Scout fails safely, where each fact lives.
5. `design/DESIGN.md` once it exists, else `design/tokens.json`; then `design/screens.md` and `design/README.md`.

## Decided

Synced from the tracker's Decisions tab on 2026-11-21. If this date is more than 8 days old, or a decision your task needs is not here, stop and ask.

- 1 · Name: Kitmunk, for the app and the company. Domain kitmunk.com.
- 2 · Logo: A, "the Case" (suitcase with four ribs in the crew colors, on an orange tile, lowercase kitmunk wordmark). Scout keeps the blaze. Assets: `design/system/assets/Logos/`.
- 4 · A guest gets a full list before signing up.
- 5 · No packing assignment at launch; bags are off the main view.
- 14 · A new trip starts with 2 adults; no upper limit.
- 15 · No cap on adults in a household.
- 29 · Orange means Scout. A main button is orange only when it hands work to Scout or applies what Scout proposed: Plan a trip (S01), Create our packing list (S04), Ask Scout and its send button (S08), Apply N changes (S08), Create the list from a past trip (S12), Sort them for me (S10). Every other main button is ink on light screens and mist on dark screens. At most one orange button per screen. Progress, tags and links use ink and crew colors, never orange.
- 35 · Contrast: inputs and unselected chips are outlined in edge #7D8B85, never line #D9DFD6. Done green is #0B7A54; crew mint keeps #0F8A5F. The outline button on ink uses #5E8A7C.
- Still open, do not assume: 6 monetization, 7 weather source, 8 voice, 9 tablets and OS versions, 10 country, language and units, 11 cost ceiling, 12 web, 13 child data and usage events, 30 which Claude models build the app, 31 Scout's model per job, 32 when a Scout run counts as failed, 33 how this section stays current, 34 clean session-start rule (the harness already follows 33 and 34 as proposed).

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
- Children are profiles, never accounts. What is stored about a child (first name plus age, or first name plus birth month and year) is decision 13, still open: don't build child fields beyond a first name until it closes.
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
| Latest `main` on any phone | Automatic: every merge touching `family-packing/` publishes to the EAS branch and channel `main` (`.github/workflows/update.yml`). The fixed QR code is in `README.md`. |
| Publish a preview by hand | `npx eas-cli@latest update --branch <name> --environment preview --message "<what changed>"` |
| Development build (needs a founder's yes, and `expo-dev-client` added first) | `npx eas-cli@latest build --profile development --platform ios` |

Code layout: routes in `app/`, components in `src/components/`, the theme in `src/theme/` (the only reader of `design/tokens.json`), shared helpers in `src/lib/`. `src/lib/routes.ts` lists every route in `design/screens.md`.
