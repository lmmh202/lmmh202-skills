# Comment voice guide and examples

Distilled from the user's comments on IceCream0910/kw-klas-plus, collected 2026-10-27 (13 conversation comments and 27 inline review comments). Excerpts are copied unchanged from those public PRs. Older excerpts end with bare SHAs; new comments use full commit links instead (see SKILL.md).

## 1. Voice traits

- **Sentence ending:** `합니다`/`했습니다`. Some older PRs (2026-09) used `한다` in Summary bullets, but recent PRs use `합니다` throughout.
- **Concrete identifiers in backticks:** types (`WebViewHolder.load(_:)`), files with line numbers (`pages/lectureHome.js:98`), settings (`parallelizable = "NO"`), and short commit SHAs (`a8068dca`).
- **Exact numbers and environments:** "`iosAppTests` 230개가 모두 통과", "Xcode 27.1, iOS 27.0 시뮬레이터 1대", "4개 타깃 × Debug/Release".
- **Cause-and-effect in plain sentences:** "~해서 ~였습니다. 그래서 ~로 바꿨습니다." Common connectors are `그래서`, `이때`, `함께`, `다만`, and `반면`.
- **Saying what did not change:** "저장 키·브리지·WebView 계약 변경은 없습니다(기준 커밋 `…`)."
- **Honest limits:** "iOS 16 실기기·런타임 확인은 하지 못했습니다(Xcode 27.1 / macOS 27에서 iOS 16 시뮬레이터 런타임을 받을 수 없음)."
- **Middle dot for short inline lists:** "`title`·`boardNo`", "앱·위젯 entitlements", "iOS 27.0·26.5·18.6".
- **Rollback at the end:** "롤백은 이 커밋을 되돌리면 됩니다."
- **Comments run warmer:** `!` endings, `감사합니다`, an occasional `ㅠ` when admitting a miss, and `@IceCream0910` when actually asking the maintainer something.
- **Things the user does not write:** emoji, marketing words, vague claims such as "잘 동작합니다" without saying where it was checked, and AI attribution lines.

## 2. Comment examples

### Reply to a review: accepting

> 이 부분을 놓쳤네요 ㅠ Android CookieManager.getCookie(url)처럼 검증된 쿠키만 쓰도록 sessionCookies만 헤더로 넘기는 방향으로 수정했습니다! 28c151785a544ac3f127a93e979a4777eda51cd8

> 맞습니다! `completePageLoad`를 못 받으면 로딩 오버레이가 남는 상태였습니다.
> `navigationState`가 `.failed`이면 `isPageLoading`을 끄고, 실패 화면에서 현재 탭 URL을 다시 로드하도록 재시도 경로를 넣었습니다. 페이지 로드 실패는 bootstrap 실패로 보지 않고 Home은 `.ready`를 유지했습니다!

> 좋은 지적 감사합니다! 해당 내용 반영하였습니다. 59168f8c6c1cc2b3836ebf7be0eda7816ab23d66

### Reply to a review: partly disagreeing

> 제안주신 내용 방향은 이해했습니다. 다만 KLAS 로그인 시 SESSION 쿠키 Domain이 .kw.ac.kr로 오고, 앱이 세션을 다시 심을 때도 같은 `Domain=.kw.ac.kr` 계약을 씁니다. 이 경우 normalized는 kw.ac.kr이 되어 exact klas.kw.ac.kr이면 오히려 탈락합니다. 따라서 *.kw.ac.kr suffix 매칭을 추가하는게 좋아보여서 해당 방향으로 수정했습니다. 제가 놓치고 있는게 있다면 알려주시면 감사하겠습니다!

### Verification report on a PR

> iPad 레이아웃 검증 결과입니다. @IceCream0910
>
> **환경**: iPad mini (5th generation) 시뮬레이터, iPadOS 26.5
>
> | 세로 전체 화면 | 창 모드 · 상단 탭 바 유지 최소 폭 | 창 모드 · 하단 탭 바로 전환 |
> |:---:|:---:|:---:|
> | (이미지) | (이미지) | (이미지) |
> | 상단 탭 바 · 웹 헤더 겹침 없음 | 탭 바 · 웹 헤더 겹침 없음 | 창 제어 버튼이 웹 헤더 로고를 가림 |
>
> **확인된 문제**
> - **창 제어 버튼과 웹 헤더 로고 겹침**: 창 모드에서 왼쪽 위 창 제어 버튼이 웹 헤더의 로고를 가립니다. 웹 헤더가 창 제어 영역을 피하도록 조정이 필요해 보여서, 말씀하신 대로 별도 이슈로 관리하면 좋을 것 같습니다.
>
> **추가 변경**
> - iOS 26에서는 WebView가 시스템 탭 컨테이너 안으로 들어가면서, 시스템이 위쪽 가장자리에 흐림 효과(scroll edge effect)를 그려 웹 헤더의 기존 블러와 두 겹으로 보였습니다. 시스템 쪽 상단 흐림을 꺼서 웹 헤더 블러만 남도록 수정했습니다 (ff811521). iOS 18~25에는 이 효과가 없어 영향이 없습니다.

### Review of someone else's PR, with a suggestion

> [Android쪽 코멘트](…)와 마찬가지로, 첫 번째 guard가 실패하면 토스트/에러 없이 return이라 완료 화면에서 버튼이 무반응으로 보일 수 있을 것 같습니다!
> 일반 흐름에선 드물지만, phase/step/동의값이 어긋난 경우(예: 프로세스 복원 후 상태 불일치, 완료 화면에서 중복 탭)에 해당합니다. 뒤쪽 write("complete") 실패 분기처럼 피드백을 주는 게 좋을 것 같습니다.
> ```suggestion
>     func finishFunnel() {
>         guard phase == .setup, loginState.step == .complete,
>               loginState.privacyAccepted, loginState.termsAccepted else {
>             showToast("설정 상태를 확인하지 못했습니다. 다시 시도해 주세요.")
>             return
>         }
> ```

> `readLedger()`는 파일은 있는데 읽기에 실패하면 `"unreadable"`을 반환합니다. 이 문자열은 JSON이 아니라서 `ReminderEngine.load()`가 파싱 실패로 보고 `cancelAll()`을 호출합니다. 디스크의 claim은 그대로라 떠 있던 알림만 지워지고, 같은 날 그 항목을 다시 안내하지 않습니다. … Android `AndroidReminderStore.read()`는 읽기 예외를 `STORAGE_FAILED`로 던집니다. … 읽기 실패는 `"unreadable"` 대신 Android처럼 `read()`에서 `STORAGE_FAILED`를 던지고, 실제로 읽은 내용이 JSON으로 깨졌을 때만 `cancelAll()`을 타게 나누는 게 좋을 것 같습니다!

### Policy question

> 로그아웃 시 앱 잠금 PIN을 함께 지울지에 대해 정책을 먼저 정하면 좋을 것 같습니다!
>
> 현재 iOS는 로그아웃해도 앱 잠금 PIN·생체인증 설정을 유지합니다. … 다만 잠금 화면에는 양쪽 모두 「비밀번호를 잊어버린 경우 앱을 재설치해야 해요.」 라고 안내하고 있어서, 로그아웃만으로 PIN이 초기화되면 사용자에게 보이는 설명과 어긋날 수 있을 것 같습니다.
>
> 1. 기기 종속 유지: 로그아웃해도 PIN은 남기고, 로그인 화면에서만 잠금을 건너뜁니다. (현재 iOS)
> 2. 계정 전환 시 초기화: 로그아웃하면 PIN도 지웁니다. 이 경우 잠금 화면 안내 문구도 함께 바꿔야 합니다.
>
> 두 방식 중 어떤 방식으로 통일하는게 좋을까요? @IceCream0910

### Asking permission

> @IceCream0910 이 PR로 iPad에서 탭 바가 상단으로 이동하면서, WebView가 하단 탭 바 뒤에 깔도록 그리던 `GradualBlur`(`components/common/bottomNav.js`)가 탭 바 없이 하단에 남게 됐습니다. iOS 26 Liquid Glass 탭 바는 자체 흐림 효과가 있어서 웹 블러와도 잘 어울리지 않는 것 같습니다. 괜찮으시면 제거하는 PR 올려도 될까요?

### Short acknowledgements

> 확인했습니다!

> 넵 맞습니다! 수동 검증 한 것들 문서까지 업데이트 하였습니다. 혹시 빠진 부분 있으면 말씀해주세요!
