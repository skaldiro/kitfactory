---
name: session-end
description: Run before ending any Claude Code session on this repo, including unattended ones, and whenever a founder says to ship it. Leaves nothing half-done.
---

1. Run `family-packing/scripts/check.sh` (until it exists: type check, lint, tests) and the `checker` agent. Do not ship on REJECT; follow the loop stop rules.
2. Add one line to `family-packing/docs/changelog.md`.
3. Any mistake that happened twice, or once and was costly: one line in `family-packing/docs/lessons.md` with its cause.
4. Any decision you made or assumed that is not in "Decided" or the spec: do not bury it in code. List it in the PR under "Decisions made" as a proposed tracker Decisions row for the founders.
5. Commit, push the branch, and open the pull request with `.github/pull_request_template.md` filled in, `Closes #<issue>`. Never merge.
   - Check on your phone: when the PR touches `family-packing/`, the `preview` workflow publishes an EAS Update to the branch `pr-<number>` and comments a QR code on the PR. Wait for that comment (`gh pr view <number> --comments`). Step 1 of "Check on your phone" is always: open the QR code from that comment with the phone camera (iPhone) or the Expo Go scanner (Android). No Mac needs to be running. If the comment does not appear, say so in the PR and in your final message.
6. Issues: open one for anything found but not done, labeled `blocker`, `next` or `later`. No TODO in code without an issue number.
7. Delete scratch files and stop any dev servers you started.
8. Final message: what changed and where, the PR link, what is waiting on a founder, and the tracker row to mark Done (for example "Mark W2-07 Done on the tracker"). You cannot edit the tracker yourself.
