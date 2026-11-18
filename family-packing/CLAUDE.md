# Family Packing (working title)

An AI-first packing app for families who travel. Parents describe a trip, Scout (the in-app AI) asks a few tailored questions, and the family gets a packing list per person they can work through together on two phones.

Naming: "Kitbag" was the design-stage name and has a legal conflict, so it must not appear in new code, copy or store listings. Until the new name is chosen, use "Family Packing" in docs and the placeholder `APP_NAME` constant in code. The AI assistant is "Scout" (may also change). The wordmark and logo in `design/source/` are placeholders until the new name and logo are chosen.

## Where things live

- This folder holds technical work only: code, the requirements spec, designs exported from the design canvas, the design system, test trips and the changelog.
- The plan, the task tracker, product and business decisions, and accounts live in the shared Google Drive (KitFactory). You don't need them to build.
- Build work arrives as GitHub issues, one per task, created at the start of each week. When asked to work on an issue, read it first; it links the spec sections and screens it covers.
- When a decision changes how the app behaves, it is written into `docs/spec-v2.md` (until that exists, `docs/prd.md` plus `design/screens.md`). The spec in this folder is always the version to build.

## Read these first, in this order

1. The GitHub issue you were asked to work on.
2. `docs/spec-v2.md` once it exists (week 2). Until then, `design/screens.md` plus `docs/prd.md`.
3. `docs/architecture.md`: how the app, Supabase and the Claude API fit together.
4. `design/screens.md`: every screen, its route, states and where each control goes.
5. `design/README.md`: how to read the design source files.

## Stack

- App: Expo (managed workflow, development builds), React Native, TypeScript, Expo Router.
- Backend: Supabase: Postgres with row-level security per household, Auth (Sign in with Apple, Google, email magic link), Realtime, Edge Functions.
- AI: Claude API, called only from Supabase Edge Functions. Never from the app.
- Builds and releases: EAS Build, EAS Submit, EAS Update.
- Planned folder layout once scaffolded: `app/` (routes), `src/components/`, `src/features/<feature>/`, `src/lib/`, `supabase/` (migrations, functions), `eval/` (Scout test trips and harness).

## Product rules that must hold everywhere

- A guest can build and use a full list before signing up. Signing up moves the guest list to the account without regenerating it.
- Scout never changes a list or saves a family memory silently. Every AI change is shown as a preview the user approves line by line. Every memory needs an explicit yes.
- When Scout fails, the app falls back to the rule-based list from the catalog. The user never loses input.
- Progress counts item lines, not units. An item is done when packed quantity is at least the required quantity.
- Packing state and shopping state ("to buy", "bought") are independent.
- Children are profiles with a first name and age only. No child accounts.
- The data model is shared-household from day one, with any number of adults.
- Packing assignment ("who packs it") is out of scope for launch.

## Design rules

- Match `design/screens/` images and `design/source/` files for layout, color, type and copy. Use the values in `design/tokens.json`; never invent new colors.
- Fonts: Archivo (variable, condensed widths for display and numbers), DM Mono for labels.
- Every AI moment uses Scout's mark and the orange "flare" color. Dashed orange means an assumption or a question; solid means fact.
- Touch targets at least 44 by 44 points. Text contrast at least 4.5:1. Every icon-only button has an accessibility label.
- If the design and `docs/spec-v2.md` disagree on behavior, the spec wins. Note the conflict in the pull request.

## How to work

- One task per branch and pull request, branch `family-packing/<task>`. Keep pull requests small enough to review on a phone.
- Before opening a pull request: type check, lint, run tests, and start the app once. Say in the pull request which of these ran.
- Start each session by reading open GitHub issues labeled `blocker`, then `next`.
- Explain anything the founders must do (accounts, consoles, approvals) as numbered steps with exact menu names, and stop until they confirm.
- Write a short entry in `docs/changelog.md` for each merged task, and close the issue from the pull request ("Closes #N").

## Commands

To be filled in by the week 2 scaffold task: install, start, run on iOS simulator, run on Android emulator, test, lint, build a development build.
