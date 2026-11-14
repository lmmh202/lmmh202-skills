---
name: add-issue
description: >-
  Draft and open a GitHub issue in the user's Korean issue style: classify it as
  Bug, Feature, or Task, investigate the code for causes and evidence, ask the
  user which items are still unverified, and post only after approval. Use when
  the user invokes /add-issue or asks to write, draft, file, or open an issue
  (e.g. "이슈 올려줘", "이슈 초안 써줘", "이거 이슈로 만들어줘").
---

# Add Issue

Turn the user's short description into a complete issue, written in Korean the way the user writes issues. Investigate first, draft second, post last. Never post without the user's approval of the final text.

## 1. Find the target repository

- Use the git repository of the current working directory unless the user names another one.
- If that repository is a fork with issues disabled, file the issue in its parent: check with `gh api repos/<owner>/<repo> --jq '.fork, .has_issues, .parent.full_name'`.
- If it is still unclear, ask the user which repository to use.
- Note whether the user owns the target repository. Issues in someone else's repository get the courtesy line described in section 4.

## 2. Investigate before writing

- Read the code involved. Find the actual cause or the actual place a feature would go, and record each finding with its file path and line.
- Record the base commit: the commit of the default branch you read (for a fork, the upstream default branch).
- Note the environment that matters: platform, device, OS version, app version.
- Gather supporting sources such as official documentation, WWDC sessions, or related issues and PRs.
- Keep a separate list of every claim you could not confirm yourself. Section 3 uses it.

## 3. Ask before writing the 미확인 section

Never decide on your own what is unverified. The user often has already verified things you could not.

1. Show the user your list of claims you could not confirm.
2. Ask which ones the user has already verified, and whether there is anything else they have not verified.
3. Write the 미확인 section with only the items the user confirms are still unverified. Fold what the user verified into the relevant section as fact, saying how it was verified if they told you.
4. If nothing remains unverified, leave the section out.

## 4. Draft the issue

### Choose the type

| Type | When | Label (use the repository's own names) |
|---|---|---|
| Bug | Something does not behave as intended | e.g. `fix` |
| Feature | A new feature or an improvement to an existing one | e.g. `feat` |
| Task | Refactoring, chore, docs, test, CI | e.g. `chore`, `docs`, `test`, `ci` |

Run `gh label list -R <repo>` and use only labels that exist. Add platform labels (e.g. `iOS`, `Android`, `Web`) when they exist and apply.

### Title

A plain Korean sentence that states the symptom or the goal. Do not prefix the title with a type such as `fix(ios):`; the labels carry the type and platform.

- Good: `iPadOS 26 창 모드에서 창 제어 버튼이 홈 웹 헤더 로고를 가림`

### Sections

Use only the sections that have content. Headings are Korean `##` headings in this order.

**Bug**

```
## 문제        증상. 필요하면 배경 한두 줄. 플랫폼별 스크린샷·영상 자리
## 재현        환경(기기, OS 버전) + 번호 매긴 단계
## 원인        코드 위치 링크와 근거
## 해결 방향
## 영향 범위    다른 플랫폼, 웹, 문서, 배포 순서에 미치는 영향 (해당 시)
## 미확인       사용자에게 확인받은 항목만 (해당 시)
## 완료 조건    - [ ] 체크리스트
## 참고        기준 커밋, 관련 파일, 관련 이슈·PR
```

**Feature**

```
## 배경과 문제   왜 필요한가
## 제안         무엇을 어떻게. AS-IS / TO-BE, 필요하면 ASCII 배치도
## 영향 범위     (해당 시)
## 미확인        (해당 시)
## 완료 조건
## 참고
```

**Task**

```
## 배경
## 할 일        - [ ] 체크리스트
## 완료 조건
## 참고
```

### Writing style

- 합니다체. Short, factual sentences. Keep facts and proposals clearly apart.
- Put code identifiers, file names, and values in backticks. Use a fenced code block when a few lines of code show the problem.
- In 완료 조건, write checkable items, including tests to add and devices or platforms to verify on.
- Screenshots and videos cannot be uploaded through `gh`. Leave a placeholder such as `<!-- iOS 스크린샷 -->` where they belong and tell the user to attach them on GitHub after posting.
- When the target repository is not the user's, put this line at the top of 해결 방향 or 제안: `> 더 좋은 방법이 있다면 제안주셔도 좋습니다!`

### Links

Always write references as full links so they work from any repository.

- Commit: `[`a8068dc`](https://github.com/<owner>/<repo>/commit/<full-sha>)`. Never a bare short SHA.
- Code location: a permalink at the base commit, e.g. `[`ProductWebUrls.kt:13`](https://github.com/<owner>/<repo>/blob/<full-sha>/path/to/ProductWebUrls.kt#L13)`. Use `#L10-L20` for a range.
- Issue or PR in the same repository: `#103` is fine. In another repository: a full URL, or `<owner>/<repo>#<n>`.
- Get the full SHA with `git rev-parse <ref>`, and make sure the commit exists on the remote you link to.

## 5. Review and post

1. Show the user the title, labels, target repository, and the full body.
2. Revise until the user approves.
3. Post with the body in a file so formatting survives:
   `gh issue create -R <repo> --title "<title>" --label "<a>,<b>" --body-file <file>`
4. Report the issue URL, and remind the user to attach any screenshots or videos left as placeholders.
