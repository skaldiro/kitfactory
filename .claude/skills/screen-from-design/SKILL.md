---
name: screen-from-design
description: Build or change an app screen or core component from the design. Use for any task that names a screen ID such as S04 or S08, a route from design/screens.md, or the component gallery.
---

Good looks like: the screen matches `family-packing/design/screens/<ID>.png` (or its `design/source/*.dc.html` file until images exist) within a few points; it uses only token values from `design/DESIGN.md` or `design/tokens.json`; it has every state listed for it in `design/screens.md`; it meets the accessibility rules in `family-packing/CLAUDE.md`; and it feels like Kitmunk, not a template.

Skeleton:
1. Read the screen's row in `design/screens.md`, its source file (layout in `<x-dc>`, sample data in the script) and the spec section for its behaviour.
2. Rebuild it as React Native components from shared components and tokens. Never port the HTML or its script.
3. Run the gate.
4. Capture simulator screenshots of every state at 390 by 844 points (iOS simulator on the founder's Mac, or the Expo simulator tools if available), and put them in the PR beside the design image.
5. Critique your own screenshots before the PR: spacing that differs from the source, weak hierarchy, generic cards, needless gradients, colors outside the tokens, any orange that breaks decision 29. Fix and re-shoot.

Fences: no new colors, fonts or radii; no behaviour the spec does not state (note any conflict in the PR); "kitbag" never appears; icon-only buttons have accessibility labels; touch targets at least 44 by 44.
