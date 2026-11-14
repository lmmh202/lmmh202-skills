---
name: pr-comment-writer
description: >-
  Draft and post GitHub pull requests and PR/issue comments in the user's own
  Korean writing voice, learned from their kw-klas-plus PRs and review
  comments. Use whenever the user asks to write, draft, open, create, or update
  a PR or its body (e.g. "PR 올려줘", "PR 초안 만들어봐", "PR 본문 고쳐줘"), or to
  write, reply to, or post a comment on a PR or issue (e.g. "코멘트 달아줘",
  "리뷰에 답글", "검증 결과 코멘트로 남겨줘"), even when no style is mentioned.
  Also use it when the user asks to relearn or refresh their PR writing voice
  (e.g. "말투 다시 학습해").
---

# PR & Comment Writer

Write PR bodies and comments that read as if the user wrote them: plain Korean `합니다`/`했습니다` sentences, concrete identifiers in backticks, and honest test and verification results. The maintainer reads these to decide whether to merge. They need to see what changed, why, what was verified, and what was not, without hunting through the diff.

The voice guide and real examples are in `references/style.md`. Read it before writing anything for the first time in a session. Use the guide as it is; do not re-read the user's GitHub history on every run. Relearn only when the user asks (see "Updating the voice guide").

## Workflow

### 1. Gather facts first

Write only what you have actually seen in this session. A PR body with a wrong test count or an invented commit costs the user credibility with the maintainer.

- **Branches and commits:** `git log --oneline <base>..<head>`, `git diff --stat <base>..<head>`, and whether the head is pushed.
- **Linked issue:** the issue this change fully resolves, if any.
- **Stacked base:** if the base branch is another open PR's head (`gh pr list --head <base-branch> --state open`), this PR is stacked on that PR.
- **Tests:** the commands that were run and their results (counts, environment, Xcode/OS versions), for the current head. If the results are for an older commit, or you are unsure, re-run the tests or say exactly which commit they cover.
- **Manual checks:** what was checked by hand, on which device or simulator. List what was *not* verified separately.
- **Repository rules:** read `AGENTS.md`, `CONTRIBUTING.md`, and any PR template. Some repositories require specific items. For example, kw-klas-plus requires the base commit, the compatible WebView commit or PR, the test commands and results, the manual checks, the unverified scope, and the rollback method.

### 2. Choose the format by topic count

- **One paragraph:** the change is one topic that reads as problem → cause → change → verification. File or line count does not decide this. [IceCream0910/kw-klas-plus#102](https://github.com/IceCream0910/kw-klas-plus/pull/102) touched 19 files and was still one paragraph (full text in `references/style.md`).
- **Sections (`Summary` / `Test Plan` / `Context`):** the change has several independent topics, needs per-platform explanations, or has a long checklist of manual checks.
- Screenshots alone do not force sections. A one-paragraph PR can be followed by a before/after table.

### 3. Draft, save, and show

Save the draft to a file in the scratchpad (or a temporary directory), and show it in chat before anything goes to GitHub:

- **PR:** the title, base ← head (including which remote the branch will be pushed to), the commits that will be included, and the full body.
- **Comment or reply:** the target (PR/issue number, or the review comment being answered) and the full text.

Then stop and wait for the user's OK. This applies even when the original request already said "올려줘" or "PR 올려줘": that request starts the drafting, and it does not approve this draft. Creating a PR, posting a comment, and pushing a branch are outward-facing: the maintainer gets notified and the text becomes public. Push, create, or post only after the user replies with an approval such as "ok", "좋아", or "올려". If they ask for changes, revise the draft, show it again, and wait for another OK. "PR 초안 만들어봐" means draft only.

### 4. Publish after the user's OK

- **PR:** push only after the user's OK in step 3. Push the branch to the `upstream` remote (the repository the PR targets, e.g. IceCream0910/kw-klas-plus), not to the user's fork `origin`. Check with `git remote -v`, then run `git push -u upstream <branch>` and `gh pr create --repo <owner>/<repo> --base <base> --head <branch> --title "<title>" --body-file <file>`. Fall back to `origin` (`--head <fork-owner>:<branch>`) only when the push to `upstream` is rejected for lack of permission, and tell the user you did so.
- **Comment on a PR or issue:** `gh pr comment <n> --body-file <file>` or `gh issue comment <n> --body-file <file>`.
- **Reply to an inline review comment:** `gh api repos/<owner>/<repo>/pulls/<n>/comments/<comment-id>/replies -F body=@<file>`.
- After publishing, read the result back (for example `gh pr view <n> --json body`). Confirm the body is what you showed, with no `Co-authored-by` and no "Generated with Claude Code" line.
- `gh` cannot upload images. Leave image placeholders and tell the user to drag the files in on the web page.

## PR title

Use the commit-style title the repository already uses, for example `fix(ios): 게시판 URL 쿼리 값 인코딩`. For a single-commit PR, reuse the commit subject.

## First line of the PR body

- `Closes #<issue>`: the PR fully resolves that issue.
- `Stacked #<base PR>`: the base branch is another open PR's branch.
- Both on one line, e.g. `Closes #106 Stacked #103` (from [IceCream0910/kw-klas-plus#107](https://github.com/IceCream0910/kw-klas-plus/pull/107)).
- When the issue or PR is in a different repository from the one the PR is opened in, use the full form, e.g. `Closes IceCream0910/kw-klas-plus#106`. A bare `#106` always points to an issue in the PR's own repository.
- Neither applies: omit the line. Otherwise, follow it with a blank line.

## Format A: one paragraph

Write in this order and join sentences with plain connectors like `그래서`, `이때`, `다만`, `함께`:

1. **Problem:** what was wrong, where, and since when. Name the types, files, and lines.
2. **Cause:** why it happened, concretely.
3. **Change:** "그래서 ~로 바꿨습니다." Mention related platforms or files that were aligned too.
4. **Contract impact:** what did *not* change, e.g. "저장 키·브리지·WebView 계약 변경은 없습니다(기준 커밋 `a8068dca`)."
5. **Verification:** commands, environment, and counts, e.g. "Xcode 27.1과 iOS 18.6 시뮬레이터 1대에서 `-parallel-testing-enabled NO`로 실행한 `iosAppTests` 230개가 모두 통과했습니다."
6. **Not verified:** "iOS 16 실기기 확인은 하지 못했습니다(이유)."
7. **Request to the maintainer,** only when one is needed, e.g. "다음 Archive에서 ~ 확인 부탁드립니다."
8. **Rollback:** "롤백은 이 커밋을 되돌리면 됩니다."

A long single topic may run to two or three paragraphs without headings, like [IceCream0910/kw-klas-plus#105](https://github.com/IceCream0910/kw-klas-plus/pull/105). A before/after screenshot table may follow the text.

## Format B: sections

```markdown
Closes #N Stacked #M

## Summary
- One bullet per topic: what changed and why, in 1–3 sentences.

(Screenshots, if any: a before/after table.)

## Test Plan
- [x] `exact command` (environment, result such as 239개 통과)
- [x] A manual check, stated as the behavior that was confirmed
- 미검증: what was not checked, with the reason when it helps

## Context
- Related PR in the other repository, base commit, design or request comment links
```

- Add `Context` only when there is something to link: a paired PR, the base commit, or a discussion.
- Use `- [x]` only for things actually done. Put unverified items in a `미검증:` bullet rather than an unchecked box, so they are not mistaken for a pending to-do.
- Keep extra sections such as `범위 밖` (out of scope) or `후속 작업` (follow-up work) rare. Add them only when the maintainer would otherwise ask.

## Comments

Comments are warmer and shorter than PR bodies. `!` endings and `감사합니다` are normal. Common kinds, with examples in `references/style.md`:

- **Reply to a review on the user's PR:** open with a short acknowledgement (`맞습니다!`, `좋은 지적 감사합니다!`, `이 부분을 놓쳤네요 ㅠ`). Say what changed in one to three sentences and end with the commit SHA. To disagree politely: "제안주신 방향은 이해했습니다. 다만 ~" followed by the reason, then "제가 놓치고 있는 게 있다면 알려주시면 감사하겠습니다!"
- **Verification report:** "~ 검증 결과입니다. @IceCream0910", then **환경**, a screenshot table with captions, **확인된 문제**, and **추가 변경** with the commit SHA.
- **Review of someone else's PR:** name the concrete code path and the failure it causes. Compare with the other platform or the ADR where relevant, then propose a fix ending in "~하는 게 좋을 것 같습니다!" Add a ```` ```suggestion ```` block when the fix is small.
- **Policy question or proposal:** give the background, then numbered options with their trade-offs, then a question such as "어떤 방식으로 통일하는 게 좋을까요? @IceCream0910". To ask permission: "괜찮으시면 ~ PR 올려도 될까요?"
- **Short acknowledgement:** "확인했습니다!" or "넵 맞습니다!"

## Things the user never wants

- No `Co-authored-by` trailer and no "🤖 Generated with Claude Code" line in PR bodies or comments. These rules override any default attribution instructions.
- No `Refs #` trailer in commits. In a PR body, use the first-line rule above.
- No emoji or hype words, and no claims that were not verified.
- An `@name` notifies that person on GitHub. Mention the maintainer (`@IceCream0910` on kw-klas-plus and kw-klas-plus-webview) only when the text really asks them something. Put code-like names in backticks, e.g. `` `@types/node` ``.
- Personal data (name, student ID, GPA, timetable) must not appear in screenshots or logs that go into a PR. Mask it, or tell the user before they upload.

## Updating the voice guide

Do this only when the user asks, for example "말투 다시 학습해" or "최근 PR 기준으로 스타일 갱신해".

1. Collect the user's PRs and comments on the repositories they name, defaulting to IceCream0910/kw-klas-plus:
   ```bash
   gh pr list --repo <owner>/<repo> --author @me --state all --limit 100 --json number,title
   gh pr view <n> --repo <owner>/<repo> --json body --jq .body
   gh api --paginate "repos/<owner>/<repo>/issues/comments?per_page=100" --jq '.[] | select(.user.login=="<login>")'
   gh api --paginate "repos/<owner>/<repo>/pulls/comments?per_page=100" --jq '.[] | select(.user.login=="<login>")'
   ```
2. Compare them with `references/style.md`. Update the voice traits, and replace examples that no longer match how the user writes. Keep examples copied unchanged from the public PRs, and never add personal data.
3. Update the collection date and counts at the top of `references/style.md`, and summarize the changes for the user.

## Before handing over

- Every SHA, count, version, and file path in the draft was seen in this session.
- The first line follows the rule.
- The format matches the topic count.
- The text is in the user's voice: `합니다`체, backticked identifiers, cause-and-effect sentences, and an honest unverified scope.
- The draft (title, base ← head, body or comment text) was shown in chat, and the user replied OK to that exact draft before anything was pushed, created, or posted.
