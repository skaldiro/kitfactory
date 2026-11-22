---
name: pr-checklist
description: Fill in and verify a pull request description for this repo. Use when opening or updating any pull request.
---

Use `.github/pull_request_template.md`. Every section filled, none deleted:

- Objective with the issue link and `Closes #<n>`.
- Changed: files and behaviour, in plain words.
- Verified: paste the `GATE: PASS` output and the checker's ACCEPT; attach screenshots for screen work.
- Not verified: what could not run here (for example a real Android phone, a store build).
- Decisions made: anything decided or assumed during the work, proposed as a tracker Decisions row.
- Risks.
- Check on your phone: 2 to 4 steps a founder can do in under 5 minutes. When the PR touches `family-packing/`, step 1 is opening the Expo Go preview from the QR code the `preview` workflow comments on the PR.

The title starts with the tracker ID, for example `W2-07 · Scaffold the Expo app`.
