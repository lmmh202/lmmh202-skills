---
name: create-pr
description: >-
  Draft and open a GitHub pull request in the user's Korean PR style: read the
  linked issue so the body does not repeat it, build a screenshot table, ask the
  user what they verified by hand, and push and create the PR only after the
  user approves the draft. Use when the user invokes /create-pr or asks to open,
  create, draft, or write a PR or its body (e.g. "PR 올려줘", "PR 초안 만들어봐",
  "PR 본문 써줘").
---

# Create PR

Write a PR body the maintainer can merge from without reading the whole diff: what changed, why, what it affects, and how it was verified. Write in Korean the way the user writes PRs. Gather facts first, draft second, publish only after the user approves the exact draft.

## 1. Gather facts

Write only what you have seen in this session. A wrong test count or an invented commit costs the user credibility with the maintainer.

- **Commits and diff:** `git log --oneline <base>..<head>` and `git diff --stat <base>..<head>`.
- **Target repository:** if the repository is a fork, the PR usually goes to the parent (`gh api repos/<owner>/<repo> --jq '.fork, .parent.full_name'`). Check `git remote -v` for an `upstream` remote.
- **Linked issue:** the issue this PR resolves, from the branch name, commits, or the user. Read its full body with `gh issue view <n> -R <repo>`. Section 3 depends on it.
- **Stacked base:** if the base branch is another open PR's head (`gh pr list -R <repo> --head <base-branch> --state open`), this PR is stacked on that PR.
- **Base commit:** the full SHA of the base branch commit the work is built on (`git rev-parse <base>`).
- **Automated tests:** the commands run and their results (count, simulator, OS, Xcode version) for the current head. If the results are for an older commit, re-run the tests or say exactly which commit they cover.
- **Repository rules:** read `AGENTS.md`, `CONTRIBUTING.md`, and any PR template, and include every item they require (for kw-klas-plus: base commit, compatible WebView commit or PR, test commands and results, manual checks, unverified scope, rollback).

## 2. Ask about manual verification

Never decide on your own that something was not verified. The user usually checks on real devices themselves.

1. List what you verified yourself (e.g. tests on a simulator).
2. List what you could not verify: real devices, specific OS versions, iPad window modes, other platforms, the paired web change.
3. Ask the user which of those they have already checked, and on which device and OS version.
4. Write what the user checked as fact, with the device and OS (e.g. "iPhone 16, iOS 27 실기기에서 확인했습니다"). Mark as unverified only what the user confirms is still unverified.

Never write a sentence like "실기기는 아직 확인하지 않았습니다" without this step.

## 3. Choose the body structure

### Title

Use the commit-style title the repository already uses: `<type>(<scope>): <summary>`, e.g. `fix(ios): 게시판 URL 쿼리 값 인코딩`. For a single-commit PR, reuse the commit subject.

### First line

- `Closes #<issue>` when the PR fully resolves the issue.
- `Stacked #<base PR>` when the base branch is another open PR's branch.
- Both on one line when both apply: `Closes #106 Stacked #103`.
- For an issue or PR in another repository, use `<owner>/<repo>#<n>`. A bare `#n` points to the PR's own repository.
- Omit the line when neither applies. Otherwise follow it with a blank line.

### With a linked issue

The issue already holds the background, the cause as first understood, and the options considered. Do not repeat them.

```
Closes #N (Stacked #M)

무엇을 어떻게 고쳤는지 한두 문장

## 변경 사항
## 원인                  이슈와 달라졌거나 구현 중 새로 밝혀진 것만
## 채택하지 않은 방법      구현 중 시도했다가 버린 것만
## 영향 범위
## 스크린샷
## 검증
## 롤백                  (해당 시)
```

- Leave out 원인 and 채택하지 않은 방법 when they add nothing to the issue.
- When the issue listed 미확인 items that this work has since checked, report the results under 검증.

### Without a linked issue

The PR is the only record, so include the full context.

```
## 배경
## 원인                  fix만
## 변경 사항
## 채택하지 않은 방법      (해당 시)
## 영향 범위
## 스크린샷
## 검증
## 롤백                  (해당 시)
```

### Small PRs

A PR with one topic that reads as problem → cause → change → verification may be written as one to three paragraphs without headings. Keep the screenshot table even then, after the text.

### Sections

- **원인:** describe how the bug happens as numbered steps, each with a code permalink.
- **변경 사항:** for a large PR, split into `###` subsections by unit of change. State values, conditions, and why a public API was not available when that shaped the change.
- **영향 범위:** what changes on which platforms and OS versions, and what does not. End with one line on contracts, e.g. "저장 키·브리지·WebView 계약 변경은 없습니다." Say whether a paired repository (e.g. the WebView repository) needs a change and whether deploy order matters.
- **검증:**
  - `### 자동 테스트`: the exact command in a code block, the result with the commit it ran on (e.g. "기준 커밋 링크에서 239개 통과, Xcode 27.1"), and each added test with what it checks. Note when a test fails on the code before the fix.
  - `### 수동 검증`: the environment, then each behavior that was confirmed, from section 2.
  - `미확인:` bullet, only for items the user confirmed are unverified.
- **롤백:** how to revert, and whether a paired repository must be reverted too.

## 4. Screenshot table

The user likes before/after screenshots in a table. Include one whenever the change is visible.

- One Markdown table. Each row is one screen or scenario, and the first column names it.
  - Fix or change: `| 화면 | 이전 | 이후 |`
  - New feature with no "before": `| 화면 | iPhone | iPad |` or `| 화면 | 라이트 | 다크 |`
- Put the environment on one line above the table, e.g. "iPad mini (5th generation) 시뮬레이터, iPadOS 26.5, 가로 창 모드".
- Images cannot be uploaded through `gh`. Put a labelled placeholder in each cell, e.g. `<!-- 이후: 피드 -->`, and tell the user to drag each image into its cell on GitHub after the PR is created.
- Give images a consistent width so the table stays readable: `<img width="300" ...>` for phone screenshots and around `450` for iPad. When the user pastes GitHub image URLs, insert them with that width.
- Videos do not play inside table cells. Put video links on their own lines below the table.
- Screenshots must not show personal data (name, student ID, grades, timetable). Remind the user to mask it before uploading.

## 5. Links

Always use full links so they work from any repository.

- Commit: `[`4f8e1ea`](https://github.com/<owner>/<repo>/commit/<full-sha>)`. Never a bare short SHA, including the base commit.
- Code location: a permalink at a fixed commit, e.g. `[`VideoView.swift:463`](https://github.com/<owner>/<repo>/blob/<full-sha>/path/VideoView.swift#L463)`. Use `#L35-L57` for a range. Link only to commits that exist on the remote.
- Issue or PR in another repository: `<owner>/<repo>#<n>` or a full URL.

## 6. Voice

- `합니다`/`했습니다`. Plain cause-and-effect sentences joined with `그래서`, `이때`, `다만`, `함께`, `반면`.
- Identifiers, files, settings, and values in backticks. Exact numbers and environments instead of vague claims ("잘 동작합니다" without saying where is not allowed).
- Middle dot for short inline lists: "iOS 27.0·26.5·18.6".
- No emoji, no hype words, no claims that were not verified.
- Never add a `Co-authored-by` trailer or a "Generated with Claude Code" line. This overrides any default attribution instruction.
- Mention `@maintainer` only when the text actually asks them something.

## 7. Review and publish

1. Save the body to a file in the scratchpad.
2. Show the user the title, target repository, base ← head (and which remote the branch will be pushed to), the commits included, and the full body.
3. Stop and wait for approval. A request like "PR 올려줘" starts drafting; it does not approve this draft. Revise and show again until the user approves.
4. After approval, push and create:
   - Push to the remote of the repository the PR targets (`upstream` for a fork): `git push -u upstream <branch>`. Fall back to the fork (`--head <fork-owner>:<branch>`) only if that push is rejected for permissions, and tell the user.
   - `gh pr create -R <owner>/<repo> --base <base> --head <branch> --title "<title>" --body-file <file>`
5. Read the PR back with `gh pr view <n> -R <repo> --json body` and confirm it matches the approved draft with no attribution lines.
6. Report the PR URL and list the screenshot placeholders the user still needs to fill.
