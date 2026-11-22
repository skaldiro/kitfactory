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
5. Weekly drift audit. Read the "Drift log" tab of the tracker (Google Sheet `1DJ3ZbxSzVUNX4WPQpcNwuJ6CpOcnMy2L_UjKbEfQ4aY`). If its newest Audit date is 7 or more days old, or the tab is empty, run the full audit now, before the task. Otherwise skip to step 6.
   - First recheck every row with Status "Open": is it still true?
   - Then run these checks across the whole project, not just today's task:
     1. Tracker vs GitHub: each Build row's status matches its issue (closed issue but row not Done, or Done row with an open issue); every PR merged in the last 7 days maps to a tracker row; open PRs older than 3 days.
     2. Decisions tab vs "Decided" in `family-packing/CLAUDE.md`: every Closed decision with Repo = Y is there with the same answer; nothing in Decided that the tab doesn't say.
     3. Design canvas (https://claude.ai/artifact/LokjSwqPYHJoJDvZWz5auF) vs `family-packing/design/`: screens or tokens changed on the canvas after the last export. If you can't read the canvas, say it was not checked.
     4. Scope: merged work not in the spec's Scope section (must have), or a later or never item that shipped.
     5. The overview doc (Google Doc `1SIMVPCuJPLFeEZHyXCQvNcn2012MmQARFGghc1i1BfI`) vs both `CLAUDE.md` files and `family-packing/README.md`: roles, where things live, naming (Kitmunk, never Kitbag), weekly rhythm, how to open the app.
     6. Tracker rows past their Due date and not Done, owned by Selman or Claude.
   - Append one row per finding to the Drift log with `append_values` on `'Drift log'!A:J`. Columns: A audit date (YYYY-MM-DD), B finding number, C check (for example "1 Tracker vs GitHub"), D where (tracker ID, issue, PR, file or doc section), E what disagrees, F proposed fix and which source wins, G one link, H "Open". Leave I and J empty; the founders fill them. A repeat of an earlier Open row gets J = "Still open since <date>". An earlier Open row that is no longer true gets a row with C "Recheck", E "No longer found: <finding>", J "Founders can mark the <date> #<n> row Fixed". No findings: one row with B 0, C "All checks", E "Drift audit: clean", H "Fixed".
   - This append is the only tracker write you may make. Never edit, sort, insert or delete anything else in the sheet, and never edit an existing Drift log row. Find tracker rows by the ID in column A, never by row number.
   - Without the Google Sheets connector you can't run or log the audit: say so in your reply, and the founders run it from their Claude Project ("Run the weekly drift audit from the session-start skill").
6. Conflict found in step 3 or 4, or an audit finding that touches today's task: stop. For each, give the two sources, what each says, and the fix you propose. Wait for a founder's answer. Audit findings that don't touch the task don't block it: list them in one line each, and they're settled at step 0 of Friday's meeting.
7. Clean: reply "Session start: clean", with the date of each source you checked and whether the weekly audit ran (with its number of findings), then start the task.
