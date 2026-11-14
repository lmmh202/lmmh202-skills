#!/bin/zsh
# Link every skill in this repo into ~/.agents/skills (run once per machine).
set -e
REPO="${0:A:h}"
DEST="$HOME/.agents/skills"
mkdir -p "$DEST"
for dir in "$REPO"/skills/*(/); do
  name="${dir:t}"
  target="$DEST/$name"
  if [[ -L "$target" ]]; then
    ln -sfn "$dir" "$target"
  elif [[ -e "$target" ]]; then
    echo "skip $name: $target exists and is not a symlink" >&2
    continue
  else
    ln -s "$dir" "$target"
  fi
  echo "linked $name"
done
