---
name: add-wiki
description: >-
  Create or edit a wiki or glossary entry in the user's intended repository,
  then review and commit the change. Use when asked to add, write, or update a
  wiki term; follow that repository's own format and instructions.
---

# Add Wiki

Create the requested wiki entry in the intended repository, make a focused local commit, and report the result. Push only after the user approves the reported commit.

## Choose the repository

- Always create or edit wiki entries under `~/repositories/lmmh202.github.io/wiki/`, regardless of the current working directory or any other repository mentioned or detected for the task.
- Expand `~` to the user's home directory and treat `~/repositories/lmmh202.github.io` as the target Git repository. Confirm its root and Git remote before editing; do not silently fall back to another repository if this location is missing or does not match.
- If the target repository or wiki directory is unavailable, ask the user how to proceed instead of choosing another location.

## Read local guidance and inspect state

- Read the target repository's `AGENTS.md` files that apply to `wiki/`, plus any wiki-specific instructions or referenced skills.
- Use the repository's established directory, frontmatter, language, linking, and rendering conventions. If these are missing or conflict, ask a concise question before making a consequential format choice.
- Inspect the current branch and `git status` before editing. Preserve pre-existing changes. Do not overwrite user work or include unrelated files in the commit.

## Write and review

- Make the smallest complete change that satisfies the request. For a new entry, check for an existing equivalent term and follow the repository's naming and alias conventions.
- Update generated or linked pages only when the repository's instructions require it. Run the relevant documented formatter or validation command when applicable; do not run the full test suite unless requested or required by repository instructions.
- Review the final diff, including staged files, and confirm it contains only this task's changes. If pre-existing edits prevent safe isolation, stop before committing and report the blocker.

## Commit, report, and push gate

- Unless the user asks for a draft only or says not to commit, create a focused local commit containing only the reviewed task files. Follow repository commit guidance and do not add a `Co-authored-by` trailer.
- Report the repository root, branch, commit hash, changed files, and validation performed. State clearly that the commit is local and wait for the user's approval.
- Do not push in the same step as creating the commit. Push only after the user approves that reported commit (for example, by replying “OK”). Before pushing, confirm the branch and remote still match the report and that the commit is still the intended one. If anything relevant changed, report it and wait for fresh approval.
- After an approved push, report the remote and branch and whether the push succeeded.
