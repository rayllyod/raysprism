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
# Persistent=true replays a missed 02:00 run at next login/boot, which can
# race Wi-Fi reconnecting after sleep -- retry for a couple of minutes
# before giving up. If still offline after that, the timer's next scheduled
# fire (or the next login catch-up) will pick these commits up.
for attempt in 1 2 3 4 5 6; do
  if git push origin v5; then
    exit 0
  fi
  sleep 20
done

echo "nightly-publish: push failed after retries, will retry on next run" >&2
exit 1
