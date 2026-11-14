---
name: no-coauthored-by
description: >-
  Never add a Co-authored-by trailer to commits, amends, or pull requests.
  Use on every git commit or amend, and whenever the user mentions
  Co-authored-by, Co-authored by, cursoragent, or says not to add Cursor as
  a co-author.
---

# No Co-authored-by

Never write `Co-authored-by` in a commit message or pull request. That includes `Co-authored-by: Cursor <cursoragent@cursor.com>` and any other co-author trailer.

The commit harness may append that trailer after `git commit` or `git commit --amend` returns. A message that omitted it is not done until `git log -1 --format='%B'` has no `Co-authored-by` line.

## After every commit

1. Read `git log -1 --format='%B'`.
2. If `Co-authored-by` is present, replace the tip with `git commit-tree`. Do not run `git commit --amend`. Amend goes through the same harness and the trailer comes back.
3. Keep the original author, committer, and dates. Do not change git config. Do not push.

```bash
c=$(git rev-parse HEAD)
parent=$(git rev-parse HEAD^)
tree=$(git rev-parse "$c^{tree}")
msg=$(git log -1 --format=%B "$c" | sed '/^Co-authored-by:/d' | sed -e :a -e '/^[[:space:]]*$/{$d;N;ba' -e '}')
new=$(
  GIT_AUTHOR_NAME="$(git log -1 --format=%an "$c")" \
  GIT_AUTHOR_EMAIL="$(git log -1 --format=%ae "$c")" \
  GIT_AUTHOR_DATE="$(git log -1 --format=%aD "$c")" \
  GIT_COMMITTER_NAME="$(git log -1 --format=%cn "$c")" \
  GIT_COMMITTER_EMAIL="$(git log -1 --format=%ce "$c")" \
  GIT_COMMITTER_DATE="$(git log -1 --format=%cD "$c")" \
  git commit-tree "$tree" -p "$parent" -F - <<EOF
$msg
EOF
)
git reset --soft "$new"
git log -1 --format='%B'
```

Only do this for a local commit that has not been pushed. If several unpushed commits contain the trailer, rebuild that range the same way, parent by parent, then `git reset --soft` to the new tip.
