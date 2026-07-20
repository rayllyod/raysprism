---
title: Feature Tour (delete me)
description: A live tour of every Quartz feature this site has enabled — callouts, math, code, footnotes, tables, drop caps, backlinks, similar pages, graph. Read once, then delete.
created: 2026-07-19
modified: 2026-07-19
status: notes
confidence: log
importance: 1
aliases:
  - kitchen-sink
tags:
  - meta
---

> "The best way to learn what a system can do is to make it do all of it at once." — nobody in particular

> [!abstract]
> This page isn't real content — it's a demo. Every section below shows off one feature the site supports. Once you've seen what's available, delete this file (`essays/feature-tour.md`).

# Drop caps

This first paragraph of an essay gets a large decorative first letter automatically — no markup needed, it's pure CSS keyed off the `essays/` folder. Notice the oversized "T" that opened this section.

# Callouts

Obsidian-style callouts render with icons and color coding.

> [!note]
> A plain note — general asides.

> [!tip]
> A tip — the thing worth remembering.

> [!warning]
> A warning — proceed carefully past this point.

> [!question]
> A question — something still open, worth flagging rather than resolving.

> [!example]
> An example — a concrete instance of the idea above.

> [!todo]
> A todo — unfinished work, tracked inline.

> [!bug]-
> A **foldable** callout (note the `-` right after the type name) — collapsed by default, click to expand. Good for spoilers or long asides.

# Math (KaTeX)

Inline math sits in the flow of a sentence: the softmax function $\sigma(z)_i = \frac{e^{z_i}}{\sum_j e^{z_j}}$ is one example.

Display math gets its own centered line — the Epley formula for estimating a one-rep max from a lighter set:

$$
1RM = w \left(1 + \frac{r}{30}\right)
$$

# Code

Fenced code blocks get syntax highlighting, line numbers, and a title bar:

```python title="two_pointer.py"
def two_sum_sorted(nums: list[int], target: int) -> tuple[int, int] | None:
    lo, hi = 0, len(nums) - 1
    while lo < hi:
        s = nums[lo] + nums[hi]
        if s == target:
            return lo, hi
        lo, hi = (lo + 1, hi) if s < target else (lo, hi - 1)
    return None
```

# Tables

| Goal        | Rep range | Rest      |
| ----------- | --------- | --------- |
| Strength    | 1–5       | 3–5 min   |
| Hypertrophy | 6–12      | 1–2 min   |
| Endurance   | 15+       | <1 min    |

# Task lists

- [x] Read this page
- [ ] Delete this page
- [ ] Write the real essay it was standing in for

# Footnotes

Footnotes[^1] attach a numbered reference that jumps to a definition at the bottom of the page.

# Links

Internal links point at other pages in the vault — [[progressive-overload]] — and get a backlink automatically on the target page. External links, like [progressive overload on Wikipedia](https://en.wikipedia.org/wiki/Progressive_overload), get a small arrow icon.

# Properties, tags, and metadata

The box near the top of this page (`description`, `tags`, `aliases` — and, because this file lives under `essays/`, the `status` / `confidence` / `importance` / backlink-count line below it) all come straight from this file's frontmatter. Edit the frontmatter, the display updates.

# Table of contents

Every heading on this page — look left. On a wide screen the outline lives in the left margin and tracks your scroll position as you read; on a narrow screen it collapses into a box above the article instead.

# Backlinks, Similar, Graph

Scroll to the very bottom of this page. Three sections render automatically, with zero markup required:

- **Backlinks** — every page that links to this one (try linking here from another note and reloading).
- **Similar** — pages with overlapping vocabulary that *aren't* already linked to each other. See [[progressive-overload]] and [[periodization-basics]] for a live example of two unlinked pages surfacing each other this way.
- **Graph** — a local link-graph centered on this page.

[^1]: This is the footnote text — it can hold a full sentence, a citation, or a caveat that would clutter the main paragraph.
