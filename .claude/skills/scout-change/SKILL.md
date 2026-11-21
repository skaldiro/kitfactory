---
name: scout-change
description: Any change to Scout: prompts, Edge Functions under supabase/functions, output schemas, the validator, fallback behaviour, or the eval harness under eval/.
---

Good looks like: every Scout run ends in exactly one logged outcome (ok, repaired, partial or fallback with a reason), no code path returns an empty or trimmed result as a success, and eval scores and cost per list do not get worse without a founder agreeing.

Skeleton:
1. Read `family-packing/docs/architecture.md` (Scout run, failure table, evals) and `docs/scout-design.md` once it exists.
2. Make the change. Prompts live in the repo, versioned; bump the prompt version on any wording change.
3. Run the validator unit tests and the 5-trip eval smoke run (`scripts/check.sh` does both once they exist).
4. In the PR, report before and after: score, fallback rate, partial rate, dropped lines, p95 latency, cost per list.

Fences: the Claude API is called only from Edge Functions; keys only in Supabase secrets; never tune prompts on the held-out trips; never change a list without a preview; never save a memory without a yes; never catch an error and return defaults without logging the outcome.
