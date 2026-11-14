# lmmh202-skills

Personal agent skills. Each folder in `skills/` is one skill with a `SKILL.md`.

## Skills

### GitHub

| Skill | What it does |
|---|---|
| [`add-issue`](skills/add-issue/SKILL.md) | Draft and open a Bug / Feature / Task issue in Korean, asking which items are still unverified before writing them |
| [`create-pr`](skills/create-pr/SKILL.md) | Draft and open a PR that builds on its linked issue, with a before/after screenshot table and user-confirmed manual checks |
| [`write-comment`](skills/write-comment/SKILL.md) | Draft and post PR/issue comments: review replies, verification reports, reviews, policy questions |
| [`add-wiki`](skills/add-wiki/SKILL.md) | Create or edit a wiki or glossary entry in the intended repository, then commit it |
| [`omit-coauthors`](skills/omit-coauthors/SKILL.md) | Never add a `Co-authored-by` trailer to commits or PRs |

### Machine

| Skill | What it does |
|---|---|
| [`disk-cleanup`](skills/disk-cleanup/SKILL.md) | Free disk space to a target (default 100 GB) by removing only regenerable build output and caches. Runs only when invoked as `/disk-cleanup`; adapted from kdy1/kdy1-scripts |

### Study

| Skill | What it does |
|---|---|
| [`explain-lecture-slides`](skills/explain-lecture-slides/SKILL.md) | Translate lecture slides into Korean and teach them slide by slide, with worked solutions |
| [`create-mock-exams`](skills/create-mock-exams/SKILL.md) | Make an expected exam paper from lecture materials and past exams (questions in English, solutions in Korean) |

## Install on a machine

```bash
git clone <repo-url> ~/repositories/lmmh202-skills
~/repositories/lmmh202-skills/link.sh
```

`link.sh` symlinks each skill into `~/.agents/skills`, so edits in this repo take effect immediately.
Third-party skills stay managed by `npx skills` (see `~/.agents/.skill-lock.json`) and are not tracked here.

## Commit messages

`<type>(<skill>): <summary>`, e.g. `feat(add-issue): add issue templates`. See `AGENTS.md` for the types.
