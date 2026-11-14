# lmmh202-skills

Personal agent skills. Each folder in `skills/` is one skill with a `SKILL.md`.

## Install on a machine

```bash
git clone <repo-url> ~/repositories/lmmh202-skills
~/repositories/lmmh202-skills/link.sh
```

`link.sh` symlinks each skill into `~/.agents/skills`, so edits in this repo take effect immediately.
Third-party skills stay managed by `npx skills` (see `~/.agents/.skill-lock.json`) and are not tracked here.

## Commit messages

`<type>(<skill>): <summary>`, e.g. `feat(add-issue): add issue templates`. See `CLAUDE.md` for the types.
