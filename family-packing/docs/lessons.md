# Lessons

Mistakes we do not want to repeat. Read before starting a task. Add one line when a mistake happens twice, or once if it was costly. Every line names its cause. A founder prunes this file monthly; delete lines whose reason is gone.

Format: `- YYYY-MM-DD | what to do (or never do), and why | PR or issue`

- 2026-11-21 | The Claude Project's synced copy of this repo lagged GitHub by days (it still showed decisions.md and plan.md after they were removed). When repo state matters, read GitHub, not the Project's synced copy. | harness PR
- 2026-11-22 | On a new Mac, install the GitHub CLI and sign in (`gh auth login`, then `gh auth setup-git`) before the first session. Without it, session-start can't read the issue, CI or open PRs, and `git pull` fails; W2-07 lost its start to this. Sign-ins that need a browser work as device codes (`gh auth login --web`, `eas login --device`), since founders can't type into Claude's terminal tabs. | W2-07
