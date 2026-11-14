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

# One commit per skill, in Conventional Commits form with the skill as scope:
#   new skill      -> feat(<skill>): add <skill> skill
#   removed skill  -> chore(<skill>): remove <skill> skill
#   changed skill  -> chore(<skill>): sync changes
#   other files    -> chore(repo): sync changes
if [[ -n "$(git status --porcelain)" ]]; then
  git add -A
  staged=("${(@f)$(git diff --cached --name-only)}")

  skills=(${(f)"$(printf '%s\n' "${staged[@]}" | awk -F/ '$1=="skills" && NF>2 {print $2}' | sort -u)"})

  for skill in "${skills[@]}"; do
    if ! git cat-file -e "HEAD:skills/$skill/SKILL.md" 2>/dev/null; then
      msg="feat($skill): add $skill skill"
    elif [[ ! -e "skills/$skill/SKILL.md" ]]; then
      msg="chore($skill): remove $skill skill"
    else
      msg="chore($skill): sync changes"
    fi
    git commit -qm "$msg" -- "skills/$skill" || { log "commit failed: $skill"; exit 1; }
    log "committed: $msg"
  done

  others=(${staged:#skills/*})
  if (( ${#others} )); then
    git commit -qm "chore(repo): sync changes" -- "${others[@]}" || { log "commit failed: repo"; exit 1; }
    log "committed: chore(repo): sync changes"
  fi
fi

if [[ -n "$has_remote" ]] && [[ -n "$(git log '@{u}..' --oneline 2>/dev/null)" ]]; then
  git push -q && log "pushed" || { log "push failed"; exit 1; }
fi
