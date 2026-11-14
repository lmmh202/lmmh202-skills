# lmmh202-skills

## Commit messages

Use Conventional Commits with the skill name as the scope:

```
<type>(<skill>): <summary>
```

- `feat(<skill>)`: a new skill, or new behavior in a skill (e.g. `feat(add-issue): ask before writing 미확인`)
- `fix(<skill>)`: a skill that misbehaves or triggers wrongly
- `refactor(<skill>)`: rename or restructure without changing behavior
- `docs(<skill>)`: wording or examples only
- `chore(repo)`: files outside `skills/` (README, `sync.sh`, `link.sh`, `.gitignore`)

One skill per commit. Write the summary in English, lowercase, imperative, no trailing period.

`sync.sh` makes hourly fallback commits (`chore(<skill>): sync changes`) for anything left uncommitted; commit intentional changes yourself with a proper type first.
