# kitfactory

A monorepo for our apps. Each app lives in its own top-level folder with its own `CLAUDE.md`.

| Folder | App | Status |
| --- | --- | --- |
| `family-packing/` | Family Packing (working title; the public name is being replaced), the AI family packing app for iOS and Android | Building, launch target week of March 1, 2027 |

## Rules for every app

- Work inside one app folder per task. Read that folder's `CLAUDE.md` before doing anything else.
- Never put API keys, passwords or tokens in the repo or in app code. Secrets live in the service that uses them (Supabase secrets, EAS secrets) and in the shared password vault.
- One task, one branch, one pull request. Branch names: `<app>/<short-task>`, for example `family-packing/trip-form`.
- A pull request says what changed, how it was tested, and what the reviewer should check on a phone.
- Ask before creating any account, paid service or cloud resource.
- Shared code goes in a top-level `packages/` folder only once a second app needs it. Not before.

## Who

- Selman: technical owner. Owns GitHub, Expo, Supabase, the Claude Console and everything in this repo.
- Daniel: business and operations owner. Owns the company (LLC planned for January 2027), domains, email, the business plan, and the Apple and Google store accounts once the LLC exists.
- Shared: the Google Drive folder KitFactory (tracker, notes, business docs) and a free Bitwarden organization for passwords.
- Neither of us writes production code. Claude Code does, and we review on our phones.
