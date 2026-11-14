#!/bin/zsh
# Commit any changes in this repo; pull/push only when a remote is configured.
# Run hourly by ~/Library/LaunchAgents/com.lmmh202.skills-sync.plist.
set -u
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin"
cd "${0:A:h}" || exit 1

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"; }
has_remote=$(git remote)

if [[ -n "$has_remote" ]]; then
  git pull --rebase --autostash -q || { log "pull failed"; exit 1; }
fi

if [[ -n "$(git status --porcelain)" ]]; then
  git add -A
  changed=$(git diff --cached --name-only | awk -F/ '$1=="skills"{print $2; next} {print $1}' | sort -u | tr '\n' ' ')
  git commit -qm "sync: ${changed% }" || { log "commit failed"; exit 1; }
  log "committed: ${changed% }"
fi

if [[ -n "$has_remote" ]] && [[ -n "$(git log '@{u}..' --oneline 2>/dev/null)" ]]; then
  git push -q && log "pushed" || { log "push failed"; exit 1; }
fi
