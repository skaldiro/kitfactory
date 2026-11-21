#!/usr/bin/env bash
# The gate. Every pull request must end with GATE: PASS (locally and in CI).
# Run from anywhere: bash family-packing/scripts/check.sh
set -uo pipefail
cd "$(dirname "$0")/.."

failed=()
step() {
  local name="$1"; shift
  echo "== $name"
  if "$@"; then echo "   ok"; else echo "   FAILED: $name"; failed+=("$name"); fi
}

step "Tokens match DESIGN.md (DESIGN.md lint)" python3 design/build-tokens.py --check
step "Decided sync date at most 8 days old"   node scripts/check-decided.mjs
step "Every screens.md route has a file"       node scripts/check-routes.mjs
step "No design drift in code"                 node scripts/check-drift.mjs
step "Type check"                              npx tsc --noEmit
step "Lint, no warnings"                       npx expo lint --max-warnings 0
step "Tests, including text contrast 4.5:1"    npx jest --ci
step "expo-doctor"                             npx --yes expo-doctor

echo
if [ ${#failed[@]} -eq 0 ]; then
  echo "GATE: PASS"
else
  printf 'GATE: FAIL (%s)\n' "$(IFS=', '; echo "${failed[*]}")"
  exit 1
fi
