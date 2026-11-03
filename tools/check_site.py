#!/usr/bin/env python3
"""Check local page links and assets without depending on remote services."""

import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


class Page(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.source = source
        self.ids = set()
        self.references = []
        self.errors = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get("id"):
            if attrs["id"] in self.ids:
                self.errors.append(f"{self.source}: duplicate ID {attrs['id']}")
            self.ids.add(attrs["id"])
        if tag == "img" and "alt" not in attrs:
            self.errors.append(f"{self.source}: image is missing alternative text")
        for attribute in ("href", "src", "poster"):
            if attrs.get(attribute):
                self.references.append(attrs[attribute])


def check_site(root):
    root = Path(root).resolve()
    pages = {}
    errors = []
    for source in sorted(root.rglob("*.html")):
        if any(part.startswith(".") or part in {"node_modules", "build"} for part in source.relative_to(root).parts):
            continue
        page = Page(source.relative_to(root))
        page.feed(source.read_text(encoding="utf-8-sig"))
        pages[source.resolve()] = page
        errors.extend(page.errors)
    if not pages:
        errors.append("No HTML pages found")
    for source, page in pages.items():
        for reference in page.references:
            url = urlsplit(reference)
            if url.scheme or url.netloc:
                continue
            path = unquote(url.path)
            target = (root / path.lstrip("/") if path.startswith("/") else source.parent / path).resolve() if path else source
            if not target.is_relative_to(root):
                errors.append(f"{page.source}: reference escapes site root: {reference}")
                continue
            if target.is_dir():
                target /= "index.html"
            if not target.is_file():
                errors.append(f"{page.source}: missing local target: {reference}")
            elif url.fragment and target in pages and unquote(url.fragment) not in pages[target].ids:
                errors.append(f"{page.source}: missing fragment: {reference}")
    return len(pages), errors


def main():
    root = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).resolve().parents[1]
    count, errors = check_site(root)
    if errors:
        print("\n".join(errors), file=sys.stderr)
        return 1
    print(f"Checked {count} pages: all local links, fragments, and assets exist.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
