# Changelog

One line per merged task, newest first.

- 2026-11-21: W1-13 and W1-14: design system v1.0 (design/DESIGN.md, generated tokens.json, build-tokens.py, design/system/ export of the design system artifact with logos), 35 screen images in design/screens/, decisions 29 (extended) and 35 (contrast) in CLAUDE.md.
- 2026-11-21: Build harness: Kitmunk name, "Decided" section, working style, approvals, definition of done and loop stop rules in CLAUDE.md; checker and repo-search agents; /loop; secret and push guard hook; session-start, session-end, screen-from-design, scout-change and pr-checklist skills; PR and build-task templates; lessons.md; architecture.md gains the data model, Scout failure table, evals and the drift map.
- 2026-11-17: Moved the plan, decisions and Claude Project instructions to Google Drive; added docs/architecture.md.
- 2026-11-17: Added design sources, tokens and screen inventory.

## Nov 17, 2026 · Build issues and session workflow

- Created one GitHub issue per build task on the tracker (#3 to #33), titled with the tracker ID, labeled `build`, in weekly milestones.
- `CLAUDE.md`: added "Starting a session" so Claude Code can start from "Work on W3-01" or "Work on the next task" without waiting for weekly issue creation.
