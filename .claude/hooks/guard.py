#!/usr/bin/env python3
"""PreToolUse guard for Kitmunk. Blocks secrets in files and dangerous git pushes.

Exit code 2 blocks the tool call and shows the message to Claude.
"""
import json
import re
import sys

try:
    data = json.load(sys.stdin)
except Exception:
    sys.exit(0)

tool = data.get("tool_name", "")
inp = data.get("tool_input", {}) or {}

SECRET_FILE = re.compile(r"(^|/)(\.env(\..*)?|.*\.pem|.*\.p8|.*\.p12|.*\.key|google-services\.json|GoogleService-Info\.plist|credentials\.json|service-account.*\.json)$")
SECRET_TEXT = [
    re.compile(r"sk-ant-[A-Za-z0-9_\-]{10,}"),
    re.compile(r"-----BEGIN [A-Z ]*PRIVATE KEY-----"),
    re.compile(r"\beyJ[A-Za-z0-9_\-]{20,}\.[A-Za-z0-9_\-]{20,}\.[A-Za-z0-9_\-]{10,}"),
    re.compile(r"\b(sb_secret|service_role)[A-Za-z0-9_\-]*\s*[:=]\s*['\"][^'\"]{20,}"),
    re.compile(r"\bAKIA[0-9A-Z]{16}\b"),
    re.compile(r"\bgh[pousr]_[A-Za-z0-9]{30,}\b"),
]
ALLOWED_EXAMPLES = re.compile(r"\.env\.example$")


def block(msg):
    print(f"Blocked by .claude/hooks/guard.py: {msg}", file=sys.stderr)
    sys.exit(2)


if tool in ("Write", "Edit", "MultiEdit", "NotebookEdit"):
    path = inp.get("file_path") or inp.get("notebook_path") or ""
    if SECRET_FILE.search(path) and not ALLOWED_EXAMPLES.search(path):
        block(f"writing {path} is not allowed. Secrets live in Supabase secrets, EAS secrets and Bitwarden, never in the repo.")
    text = " ".join(str(inp.get(k, "")) for k in ("content", "new_string", "new_source"))
    for edit in inp.get("edits", []) or []:
        text += " " + str(edit.get("new_string", ""))
    for pat in SECRET_TEXT:
        if pat.search(text):
            block("this looks like a key or token. Put it in Supabase or EAS secrets and reference it by name.")

if tool == "Bash":
    cmd = inp.get("command", "")
    if re.search(r"\bgit\s+push\b", cmd):
        if re.search(r"(--force\b|--force-with-lease\b|\s-f\b|\+\S+)", cmd):
            block("force-pushing is not allowed.")
        if re.search(r"\b(main|master)\b", cmd) and not re.search(r"family-packing/", cmd):
            block("pushing to main is not allowed. Push your branch and open a pull request.")
    if re.search(r"\bgit\s+(reset\s+--hard|clean\s+-[a-z]*f)", cmd):
        block("this discards work. Ask a founder first.")
    if re.search(r"\b(cat|less|more|head|tail)\b[^|]*\.env\b", cmd):
        block("do not print .env files.")

sys.exit(0)
