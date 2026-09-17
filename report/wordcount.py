import re
from pathlib import Path

t = Path(__file__).with_name("Agrinova_NCSC_Report.tex").read_text(encoding="utf-8")
lines = []
for line in t.splitlines():
    if line.lstrip().startswith("%"):
        continue
    line = re.sub(r"(?<!\\)%.*", "", line)
    lines.append(line)
s = "\n".join(lines)

ab = re.search(r"\\section\*\{Abstract\}(.*?)\\section\*\{Why this project", s, re.S).group(1)
why = re.search(r"\\section\*\{Why this project\?\}(.*?)\\tableofcontents", s, re.S).group(1)
body = re.search(r"\\section\*\{Part I(.*)", s, re.S).group(0)


def tok(x: str) -> list[str]:
    x = re.sub(r"\\begin\{tikzpicture\}.*?\\end\{tikzpicture\}", " ", x, flags=re.S)
    x = re.sub(r"\\(?:begin|end)\{[^}]+\}", " ", x)
    x = re.sub(r"\\[a-zA-Z]+\*?", " ", x)
    x = re.sub(r"[{}\\$&~^_#]", " ", x)
    x = re.sub(r"\[[^\]]*\]", " ", x)
    return re.findall(r"[A-Za-z0-9][A-Za-z0-9'’%-]*", x)

print("ABSTRACT", len(tok(ab)))
print(" ".join(tok(ab)))
print("\nWHY", len(tok(why)))
print(" ".join(tok(why)))
print("\nBODY_FROM_PARTI", len(tok(body)))
print("TOTAL", len(tok(ab)) + len(tok(why)) + len(tok(body)))
