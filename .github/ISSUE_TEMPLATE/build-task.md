---
name: Build task
about: One tracker task, as a contract Claude Code can prove is done
title: "W?-?? · "
labels: build
---

**Tracker task W?-??** · week ? · due ?

## Goal
<one sentence: the outcome a parent would notice>

## In scope
<screens, routes, files, functions>

## Must not change
<other screens, auth, the catalog format, ...>

## Read first
- `family-packing/CLAUDE.md` (product rules, Decided)
- `docs/spec-v2.md` sections ... (until it exists: `docs/prd.md` and `design/screens.md`). If the spec and this issue disagree, the spec wins: update this issue first.

## Done when
- [ ] `scripts/check.sh` prints `GATE: PASS` (pasted in the PR)
- [ ] `checker` agent replies ACCEPT
- [ ] <one behaviour check per line, each testable>
- [ ] Screenshots of every new state, beside the design image (screen work)
- [ ] Entry in `docs/changelog.md`; PR follows the template and says `Closes #<this issue>`

## Check on a phone
- [ ] <2 to 4 steps>

## Needs a founder's yes
New dependency, database migration, any account or paid service, EAS build to testers.

## If blocked
Stop, write what you tried in the PR or this issue, and do not guess.
