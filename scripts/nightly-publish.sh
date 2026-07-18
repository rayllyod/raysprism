#!/usr/bin/env bash
# Nightly auto-publish for raysPrism.
#
# Commits any content/config changes left in the working tree, then pushes
# the branch. Cloudflare builds and deploys the site from the pushed branch,
# so a push IS a deploy. Safe to run when there's nothing to do: both steps
# no-op cleanly.
#
# Invoked by the raysprism-publish.timer systemd user unit (nightly at 02:00,
# Persistent=true so a missed night runs at next boot/login).
set -euo pipefail

cd "$HOME/Documents/raysPrism/quartz"

# Commit anything left uncommitted (content edits from Obsidian, config, etc.)
if [[ -n "$(git status --porcelain)" ]]; then
  git add -A
  git commit -m "content: nightly auto-publish $(date +%Y-%m-%d)"
fi

# Push whatever is committed but not yet on origin (no-op when up to date).
# If tonight's push fails (e.g. offline), tomorrow's run picks the commits up.
git push origin v5
