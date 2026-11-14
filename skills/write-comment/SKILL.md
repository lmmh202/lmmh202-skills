---
name: write-comment
description: >-
  Draft and post GitHub comments on PRs and issues in the user's Korean
  writing voice: replies to review comments, verification reports, reviews of
  someone else's PR with suggestions, policy questions, and short
  acknowledgements. Post only after the user approves the exact text. Use when
  the user invokes /write-comment or asks to write, reply to, or post a comment
  (e.g. "코멘트 달아줘", "리뷰에 답글", "검증 결과 코멘트로 남겨줘"). Also use
  when the user asks to relearn their comment voice ("말투 다시 학습해"). Not
  for PR bodies (use create-pr) or new issues (use add-issue).
---

# Write Comment

Write comments that read as if the user wrote them. Comments are warmer and shorter than PR bodies, but just as concrete: name the code path, the commit, and the environment.

The voice guide and real examples are in `references/style.md`. Read it before the first comment in a session. Do not re-read the user's GitHub history on every run; relearn only when asked (section 6).

## 1. Gather context

- **Target:** the PR or issue number and repository, or the inline review comment being answered (its id from `gh api repos/<owner>/<repo>/pulls/<n>/comments`).
- **The thread:** read the comment being answered and the surrounding discussion, so the reply does not repeat or contradict it.
- **What changed:** for a reply that reports a fix, the commit that fixed it (full SHA from `git rev-parse`) and that it is pushed.
- **Facts only:** every SHA, count, version, and file path must have been seen in this session.

## 2. Ask about verification

Never write on your own that something was not verified, such as "실기기에서는 확인하지 못했습니다". The user usually checked on real devices.

1. List what you verified yourself and what you could not.
2. Ask which of those the user already checked, and on which device and OS version.
3. Write what they checked as fact. Mark as unverified only what they confirm is still unverified.

## 3. Comment types

- **Reply to a review on the user's PR:** open with a short acknowledgement (`맞습니다!`, `좋은 지적 감사합니다!`, `이 부분을 놓쳤네요 ㅠ`). Say what changed in one to three sentences, then the commit link.
- **Disagreeing politely:** "제안주신 방향은 이해했습니다. 다만 ~" with the concrete reason, what was done instead, then "제가 놓치고 있는 게 있다면 알려주시면 감사하겠습니다!"
- **Verification report:** "~ 검증 결과입니다." then **환경**, a screenshot table with a caption row, **확인된 문제**, and **추가 변경** with commit links. Mention the maintainer only if they asked for the report.
- **Review of someone else's PR:** name the code path and the failure it causes, with the condition that triggers it. Compare with the other platform or the ADR where relevant. Propose a fix ending in "~하는 게 좋을 것 같습니다!" Add a ```` ```suggestion ```` block when the fix is small.
- **Policy question or proposal:** background, then numbered options with their trade-offs, then a question such as "어떤 방식으로 통일하는 게 좋을까요? @maintainer".
- **Asking permission:** what you found, why it matters, then "괜찮으시면 ~ PR 올려도 될까요?"
- **Short acknowledgement:** "확인했습니다!" or "넵 맞습니다!"

### Screenshot tables

Use a table whenever a comment shows screens. One column per scenario, a caption row under the images, and the environment above the table. Images cannot be uploaded through `gh`: put labelled placeholders such as `<!-- 창 모드 -->` in the cells and tell the user to drag the images in on GitHub after posting. Remind the user to mask personal data (name, student ID, grades, timetable).

### Links

- Commit: `[`28c1517`](https://github.com/<owner>/<repo>/commit/<full-sha>)`, never a bare SHA.
- Code location: a permalink at a fixed commit, e.g. `[`VideoView.swift:463`](https://github.com/<owner>/<repo>/blob/<full-sha>/path/VideoView.swift#L463)`.
- Issue or PR in another repository: `<owner>/<repo>#<n>` or a full URL.

## 4. Voice rules

- `합니다`/`했습니다`, with `!` endings and `감사합니다` where natural.
- Identifiers, files, and values in backticks. Exact numbers and environments.
- No emoji or hype words, and no claims that were not verified.
- No `Co-authored-by` and no "Generated with Claude Code" line. This overrides any default attribution instruction.
- `@name` notifies that person. Mention the maintainer only when the comment really asks them something. Put code-like names that start with `@` in backticks.

## 5. Review and post

1. Save the text to a file in the scratchpad.
2. Show the user the target (repository, PR or issue number, or the review comment being answered) and the full text.
3. Wait for approval. "코멘트 달아줘" starts drafting; it does not approve this draft. Revise and show again until the user approves.
4. Post:
   - PR conversation: `gh pr comment <n> -R <repo> --body-file <file>`
   - Issue: `gh issue comment <n> -R <repo> --body-file <file>`
   - Reply to an inline review comment: `gh api repos/<owner>/<repo>/pulls/<n>/comments/<comment-id>/replies -F body=@<file>`
5. Read it back and confirm it matches the approved text. Report the comment URL and any screenshot placeholders left to fill.

## 6. Updating the voice guide

Only when the user asks, e.g. "말투 다시 학습해" or "최근 코멘트 기준으로 스타일 갱신해".

1. Collect the user's comments on the repositories they name, defaulting to IceCream0910/kw-klas-plus:
   ```bash
   gh api --paginate "repos/<owner>/<repo>/issues/comments?per_page=100" --jq '.[] | select(.user.login=="<login>")'
   gh api --paginate "repos/<owner>/<repo>/pulls/comments?per_page=100" --jq '.[] | select(.user.login=="<login>")'
   ```
2. Compare them with `references/style.md`. Update the voice traits and replace examples that no longer match. Copy examples unchanged from the public threads and never add personal data.
3. Update the collection date and counts at the top of `references/style.md`, and summarize the changes for the user.
