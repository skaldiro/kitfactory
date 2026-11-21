---
description: Build, check and fix a task in a loop until the checker accepts it, at most 5 cycles
argument-hint: <issue number or task>
---

Run this task as a loop: $ARGUMENTS

1. Restate the issue's contract in one line: goal, files in scope, Done when.
2. Build the task (or the fix for the checker's last report).
3. Dispatch the `checker` agent with the issue number.
4. ACCEPT: stop and show the evidence.
5. REJECT: fix the exact causes it listed, then go back to step 3.
6. Count cycles out loud ("cycle 2 of 5").

Stop rules (from `family-packing/CLAUDE.md`): 5 cycles used, the same failure twice in a row, or a fix that breaks a check that passed before. On any stop, list what still fails and what was tried, then wait for a founder. Never weaken a check to get green.
