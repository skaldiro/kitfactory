---
name: session-start
description: Run first in every Claude Code session on this repo, before any work. Checks for conflicts between the task, the decisions, the design and main, and stops if it finds one.
---

No work starts until this check is clean. A conflict goes to a founder before anything else happens.

1. `git switch main && git pull`. Note the latest commit.
2. Read the issue for today's task (`gh api repos/skaldiro/kitfactory/issues/<n>`), `family-packing/CLAUDE.md` and `family-packing/docs/lessons.md`.
3. Look for conflicts:
   - The "Decided" sync date in `family-packing/CLAUDE.md` is more than 8 days old, or the task needs a decision listed as still open.
   - The issue disagrees with `docs/spec-v2.md` (once it exists), `docs/architecture.md` or a product rule.
   - The task touches a screen whose files under `design/` changed after the last code change to that screen (`git log -1 --format=%cs -- <path>`).
   - CI on `main` is red (`gh api repos/skaldiro/kitfactory/commits/main/status`), or this task already has an open pull request or branch.
   - An open issue labeled `blocker`.
   - A line in `lessons.md` that applies to this task (not a conflict: name it and follow it).
4. If you have the Google Sheets connector, also compare the issue's title, due date and owner with the tracker row of the same ID, and the "Decided" list with the Decisions tab. If not, say that the tracker comparison was not run.
5. Conflict found: stop. For each, give the two sources, what each says, and the fix you propose. Wait for a founder's answer.
6. Clean: reply "Session start: clean", with the date of each source you checked, then start the task.
