# ray's prism

Personal essay + notes site, built on [Quartz v5](https://quartz.jzhao.xyz). Deployed via Cloudflare Workers static assets.

## Adding an essay

Create `content/essays/<slug>.md`. Essays require the full metadata schema — the custom metadata line under the title (see `plugins/essay-meta`) reads these fields:

```yaml
---
title: Your Title
description: One sentence, used for popovers and the OG image.
created: YYYY-MM-DD
modified: YYYY-MM-DD
status: notes | draft | in-progress | finished
confidence: log | unlikely | possible | likely | highly-likely | certain
importance: 1-10
tags:
  - ml-engineering # or dsa, fitness, misc
---

Your first paragraph gets a drop cap automatically (essays/ only).
```

Any field you omit is silently skipped in the metadata line — you won't get an "undefined" showing up. Link to other pages with `[[slug]]` or `[[slug|display text]]`.

## Adding a note

Create `content/notes/<slug>.md`. Notes only need:

```yaml
---
title: Your Title
created: YYYY-MM-DD
tags:
  - dsa
---
```

No status/confidence/importance, no drop cap — notes stay low-polish and wiki-like on purpose.

## Local preview

```bash
npm install
npx quartz plugin install    # syncs .quartz/plugins/ with quartz.lock.json
npx quartz build --serve     # http://localhost:8080, hot reload
```

## Deploying

Push to `v5` on `origin` (github.com/rayllyod/raysprism) — Cloudflare auto-builds and deploys:

```bash
git push origin v5
```

Cloudflare's build command is `git fetch --unshallow && npx quartz plugin install && npx quartz build`, output directory `public`. Deploys typically land within 1-3 minutes; check the site's `*.workers.dev` URL (see `wrangler.jsonc` for the project name).

To add a custom domain later: Cloudflare dashboard → Workers & Pages → raysprism → Custom Domains, then update `baseUrl` in `quartz.config.yaml` to match.

## Updating Quartz upstream without losing customizations

The repo has two remotes:

- `origin` → github.com/rayllyod/raysprism (this site)
- `upstream` → github.com/jackyzha0/quartz (stock Quartz)

To pull upstream changes:

```bash
git fetch upstream
git merge upstream/v5   # or rebase, if you prefer a linear history
npx quartz plugin install --from-config   # re-sync plugin versions after merging
```

All customizations live in files upstream doesn't touch — `content/`, `plugins/`, `quartz.config.yaml`, `quartz/styles/custom.scss`, `wrangler.jsonc`, this README — so merges should be conflict-free in practice. **The one exception**: `quartz/components/frames/{Default,FullWidth,Minimal}Frame.tsx` were edited directly (see deviations below). If upstream changes these files, you'll get a real merge conflict there — reapply the `<div class="center">` → `<main class="center">` swap (and matching close tag) by hand.

## Where this deviates from stock Quartz, and why

- **No `content/tags/` directory.** The build spec called for one landing page per top-level topic, but Quartz's native `tag-page` plugin already generates `tags/<tag>` pages from frontmatter automatically — hand-authored files there would collide on slug with the generated ones. `content/index.md` links to `[[tags/ml-engineering]]` etc. directly instead.
- **Mobile typography breakpoint is 800px, not the spec'd 640px.** Reused Quartz's existing `$mobile` SCSS variable (already 800px, used everywhere else in the site) instead of inventing a second breakpoint for one rule.
- **Core files edited: `quartz/components/frames/{Default,FullWidth,Minimal}Frame.tsx`.** Changed `<div class="center">` to `<main class="center">` in all three. This was the only way to fix a missing `landmark-one-main` accessibility check — there's no plugin/component hook for frame-level markup, only full frame *replacement*, which would have meant reimplementing the entire three-column layout to change one tag. Pure tag swap; every existing `.center`-scoped CSS selector is untouched.
- **Lighthouse accessibility sits at 93/100, not the target ≥95.** The remaining two findings (`aria-allowed-attr` in the Explorer plugin, `heading-order` in the Graph plugin) live inside external community plugin dist code. Fixing them means forking and maintaining patched copies of someone else's plugin — out of scope for a personal site. Accepted as a known limitation.
- **`plugins/essay-meta/dist/` and `plugins/similar-links/dist/` are committed to git**, unusual for local-only plugins (Quartz's own docs say these are normally gitignored so they rebuild on every install). Committing the pre-built output means the Cloudflare build doesn't need to `git clone` the `@quartz-community/types` and `@quartz-community/utils` packages on every single deploy — one less thing that can fail mid-build.
- **`plugins/similar-links` has no YAML-configurable options**, even though the spec's `minWordCount`/`topN` felt like natural config knobs. Component-only plugins built as two separate entry points (`index.ts` for `init()`, `components/index.ts` for the actual component) each get an independent copy of any shared module state — `init()` was silently mutating a copy the component never read from. Rather than fight the bundler over cross-chunk state, the two constants are hardcoded directly in `Similar.tsx`.
- **`content-index`'s `includeEmptyFiles` set to `false`** (default is `true`). With it on, the RSS feed included Quartz's auto-generated folder/tag listing pages (`essays`, `notes`, `#dsa`, ...) with blank descriptions, ahead of real content in the feed. Off, the feed only contains actual essays/notes/pages.
- **`wrangler.jsonc` added at the repo root**, not mentioned anywhere in Quartz's own hosting docs (which only describe the classic Cloudflare Pages dashboard flow). This project deploys via Cloudflare's newer Workers-with-static-assets model instead (hence the `*.workers.dev` domain, not `*.pages.dev`), which needs `assets.not_found_handling: "404-page"` explicitly set or unmatched routes silently return an empty body instead of serving `404.html`.
- **Analytics disabled** (`analytics: null`) — explicitly out of scope per the build brief.
- **Fonts are self-hosted via the native `fonts` plugin** (`fontOrigin: selfHosted`, downloads Source Serif 4 / Source Sans 3 / Source Code Pro from Google Fonts at build time and serves them locally), not via `fontsource` npm packages as originally envisioned before Phase 0 recon — Quartz v5 ships a native mechanism that does the same job (self-hosted, zero external requests at runtime), so the native path won out over adding a dependency.

## What's deferred (not built)

Per the original brief: real sidenotes, an annotation/link-archiving database, and Wikipedia-popup integration are out of scope — Quartz's native popovers/backlinks/graph get most of the *feel* at a fraction of the effort, but not the full gwern.net system. Sidenotes specifically were deferred to revisit after this phase, if still wanted.
