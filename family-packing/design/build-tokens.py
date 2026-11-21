#!/usr/bin/env python3
"""Generate design/tokens.json from the front matter of design/DESIGN.md.

DESIGN.md is the source. tokens.json is generated: never edit it by hand.

    python3 family-packing/design/build-tokens.py          # write tokens.json
    python3 family-packing/design/build-tokens.py --check  # exit 1 if tokens.json is stale

No dependencies: it reads the YAML subset DESIGN.md uses (nested maps of scalars).
Output is shaped for React Native: lengths are numbers in points, letterSpacing is
converted from em to points, lineHeight is absolute points, durations are milliseconds,
and every {group.token} reference in components is resolved to its value.
"""
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "DESIGN.md")
OUT = os.path.join(HERE, "tokens.json")


def front_matter(text):
    m = re.match(r"^---\n(.*?)\n---\n", text, re.S)
    if not m:
        sys.exit("DESIGN.md has no YAML front matter")
    return m.group(1)


def scalar(raw):
    raw = raw.strip()
    if len(raw) >= 2 and raw[0] == raw[-1] and raw[0] in "\"'":
        return raw[1:-1]
    if re.fullmatch(r"-?\d+", raw):
        return int(raw)
    if re.fullmatch(r"-?\d*\.\d+", raw):
        return float(raw)
    return raw


def parse(yaml_text):
    root = {}
    stack = [(-1, root)]
    for line in yaml_text.splitlines():
        if not line.strip() or line.lstrip().startswith("#"):
            continue
        indent = len(line) - len(line.lstrip(" "))
        key, _, value = line.strip().partition(":")
        key = str(scalar(key))
        while stack[-1][0] >= indent:
            stack.pop()
        parent = stack[-1][1]
        if value.strip() == "":
            parent[key] = {}
            stack.append((indent, parent[key]))
        else:
            parent[key] = scalar(value)
    return root


def length(v):
    if isinstance(v, (int, float)):
        return v
    m = re.fullmatch(r"(-?[\d.]+)px", str(v))
    return float(m.group(1)) if m and "." in m.group(1) else (int(m.group(1)) if m else v)


def ms(v):
    m = re.fullmatch(r"(\d+)ms", str(v))
    return int(m.group(1)) if m else v


def build(tree):
    out = {
        "_generated": "From design/DESIGN.md by design/build-tokens.py. Do not edit.",
        "name": tree.get("name"),
        "color": tree["colors"],
        "typography": {},
        "radius": {k: length(v) for k, v in tree["rounded"].items()},
        "spacing": {k: length(v) for k, v in tree["spacing"].items()},
        "motion": {k: {"duration": ms(v["duration"]), "easing": v.get("timingFunction")} for k, v in tree["motion"].items()},
        "components": {},
    }
    for name, t in tree["typography"].items():
        size = length(t["fontSize"])
        style = {"fontFamily": t["fontFamily"], "fontSize": size, "fontWeight": str(t["fontWeight"])}
        lh = t.get("lineHeight")
        if lh is not None:
            style["lineHeight"] = round(size * lh, 1) if isinstance(lh, (int, float)) else length(lh)
        ls = t.get("letterSpacing")
        if ls is not None:
            m = re.fullmatch(r"(-?[\d.]+)em", str(ls))
            style["letterSpacing"] = round(float(m.group(1)) * size, 2) if m else length(ls)
        if "fontVariation" in t:
            style["width"] = 62.5
        if name == "label":
            style["textTransform"] = "uppercase"
        out["typography"][name] = style

    def resolve(v):
        m = re.fullmatch(r"\{(\w[\w-]*)\.([\w.-]+)\}", str(v))
        if not m:
            return length(v)
        group = {"colors": tree["colors"], "typography": out["typography"], "rounded": out["radius"], "spacing": out["spacing"]}[m.group(1)]
        node = group
        for part in m.group(2).split("."):
            if part not in node:
                sys.exit("Unresolved reference " + v)
            node = node[part]
        return node

    for name, props in tree["components"].items():
        out["components"][name] = {k: resolve(v) for k, v in props.items()}
    return out


def main():
    with open(SRC, encoding="utf-8") as f:
        tree = parse(front_matter(f.read()))
    for required in ("colors", "typography", "rounded", "spacing", "motion", "components"):
        if required not in tree:
            sys.exit("DESIGN.md front matter is missing " + required)
    if "primary" not in tree["colors"]:
        sys.exit("DESIGN.md must define colors.primary")
    text = json.dumps(build(tree), indent=2, ensure_ascii=False) + "\n"
    if "--check" in sys.argv:
        current = open(OUT, encoding="utf-8").read() if os.path.exists(OUT) else ""
        if current != text:
            sys.exit("design/tokens.json is out of date: run python3 family-packing/design/build-tokens.py")
        print("design/tokens.json is current")
        return
    with open(OUT, "w", encoding="utf-8") as f:
        f.write(text)
    print("wrote", os.path.relpath(OUT))


if __name__ == "__main__":
    main()
