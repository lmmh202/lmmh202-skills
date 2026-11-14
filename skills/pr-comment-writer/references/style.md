# Voice guide and examples

This guide is distilled from the user's PRs and comments on IceCream0910/kw-klas-plus, collected 2026-10-27: 28 PRs, 13 conversation comments, and 27 inline review comments. The excerpts below are copied unchanged from those public PRs.

## Contents

1. Voice traits
2. One-paragraph PR examples (IceCream0910/kw-klas-plus#101, #102, #105)
3. Sectioned PR example (IceCream0910/kw-klas-plus#46)
4. Comment examples

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

## 2. One-paragraph PRs

### [IceCream0910/kw-klas-plus#101](https://github.com/IceCream0910/kw-klas-plus/pull/101) (+4/−3, 3 files)

> `iosAppUnitTests`·`iosApp` 공유 스킴의 테스트 대상이 `parallelizable = "YES"`여서, 플래그 없이 실행하면 Xcode가 시뮬레이터를 여러 대 복제해 동시에 부팅하면서 CPU를 과다하게 쓰고 일부 기기에서 앱 실행 실패와 재시도가 겹쳤습니다. 그래서 두 스킴의 `iosAppTests`·`iosAppUITests`를 `parallelizable = "NO"`로 바꿔, 이미 `-parallel-testing-enabled NO`로 실행하는 CI(`c00012cb`)와 로컬 기본 동작을 맞췄습니다. `AGENTS.md` 검증 기준에도 iOS 앱 테스트는 시뮬레이터 1대에서 이 플래그를 붙여 실행하도록 적었습니다. 앱 코드·저장 키·브리지·WebView 계약 변경은 없습니다(기준 커밋 `557af2e4`). Xcode 27.1, iOS 27.0 시뮬레이터 1대에서 플래그 없이 스킴 설정만으로 `iosAppUnitTests`(`iosAppTests` 226개)와 `iosApp` 스킴의 `iosAppUITests`(4개)가 모두 통과했고, 실행 중 복제 시뮬레이터가 생기지 않았습니다. CI와 같은 플래그를 붙인 `iosAppTests`는 iOS 27.0·26.5·18.6에서도 모두 통과했습니다. Xcode ⌘U 실행도 직렬로 돌아 느려질 수 있으며, 롤백은 이 커밋을 되돌리면 됩니다.

### [IceCream0910/kw-klas-plus#102](https://github.com/IceCream0910/kw-klas-plus/pull/102) (+129/−28, 19 files): the user's reference for "one paragraph"

> 배포 식별자(`com.icecream.kwklasplus`, `group.com.icecream.kwklasplus.Q2C...`)가 entitlements·Swift·Kotlin 여러 곳에 고정되어 있어 배포 팀이 아닌 기여자는 실기기 서명을 할 수 없었습니다. 이를 해결하기 위해 `Config.xcconfig`의 `APP_BUNDLE_IDENTIFIER`·`APP_GROUP_IDENTIFIER`를 단일 출처로 두고, 위젯·테스트 Bundle ID와 앱·위젯 entitlements가 이를 따르며 Kotlin `IosAcademicWidgetDisplayStore`와 Swift `AcademicWidgetStore`는 Info.plist의 `KLASAppGroupIdentifier`를 읽도록 바꿔 배포 그룹 문자열은 `Config.xcconfig`에만 남겼습니다. 값이 없거나 `group.`으로 시작하지 않으면 Kotlin·Swift 모두 배포 그룹으로 대체하지 않습니다. 표시 저장소와 공유 플래그는 앱 기본 저장소로 우회하지 않고, 세션 잠금은 실패하며, `createForWidgetExtension()`은 `null`을 반환해 위젯 캘린더 새로고침을 건너뜁니다. 기여자는 git에서 제외되는 `Config.local.xcconfig`에서만 두 값을 덮어쓰며, CONTRIBUTING에 서명 팀별 설정 방법과 Xcode Signing 화면에서 Team을 고르지 말라는 주의를, ADR-003·ARCHITECTURE에 계약을 기록했습니다. 커밋되는 기본값은 기존 배포 값과 같고, 4개 타깃 × Debug/Release의 빌드 설정과 시뮬레이터 빌드 entitlements에서 이를 확인했습니다. 저장 키·브리지·WebView 계약 변경은 없습니다(기준 커밋 `a8068dca`). 검증으로 `:shared:iosSimulatorArm64Test` 351개(App Group 해석과 그룹이 없을 때 우회하지 않는지 확인하는 새 테스트 5개 포함)와 `iosAppUnitTests` 226개가 통과했고, 값을 덮어쓴 시뮬레이터 빌드도 성공했습니다. Personal Team으로 서명한 실기기(iPhone 15 Pro Max)에서 앱·위젯 App Group과 공유 Keychain이 포함된 것을 확인했고, 로그인·위젯·계정 저장도 정상 동작했습니다. 마지막 커밋 이후에는 Personal Team 서명 빌드로 다시 확인했습니다. 배포 팀 서명 Archive는 검증하지 못했습니다. 현재 심사 중인 빌드에는 영향이 없지만, 첫 배포 이후 머지하는 것을 권하며, 다음 Archive에서 `codesign -d --entitlements -`로 앱·위젯 App Group이 `group.com.icecream.kwklasplus.Q2C...`인지 확인 부탁드립니다. 롤백은 세 커밋을 되돌리면 됩니다.

### [IceCream0910/kw-klas-plus#105](https://github.com/IceCream0910/kw-klas-plus/pull/105) (+76/−7, 6 files): one topic in several paragraphs, no headings

> Closes #104
>
> 게시판 URL을 만들 때 `ProductWebUrls.boardList`·`boardView`가 쿼리 값을 인코딩하지 않아, 웹(`kw-klas-plus-webview` `c2a0c6d`의 `pages/lectureHome.js:98`, `:155`)이 넘기는 `강의 공지사항`·`강의 자료실` 제목이 한글과 공백을 그대로 담은 URL이 되었습니다. iOS 17 미만의 `URL(string:)`은 RFC 1738/1808로 파싱해 이런 URL에 `nil`을 돌려줄 수 있고, `WebViewHolder.load(_:)`는 이때 아무 표시 없이 종료되어 iOS 16에서 게시판 화면이 열리지 않을 수 있었습니다. 그래서 `title`, `boardNo`, `masterNo`를 Ktor `encodeURLParameter()`로 인코딩하고, Android `BoardActivity`도 URL을 직접 조합하지 않고 같은 함수를 쓰도록 바꿨습니다. 함께 `WebViewHolder.load(_:)`는 URL을 만들지 못하면 `.failed(url:, category: .unknown)` 상태를 남겨 실패 화면을 표시합니다.
>
> 웹의 `pages/boardList.js:17-18`은 `URLSearchParams`로 `title`을 읽어 디코딩하므로 웹 저장소 변경 없이 호환됩니다. Android는 한글 제목을 이미 Chromium이 인코딩해 보내고 있어 화면 동작이 같고, 앞으로 제목에 `&`·`#`이 들어가도 잘리지 않습니다. 홈 탭의 `yearHakgi`는 KLAS 학기 코드(`2026,1`)라 문제가 없고 기존 테스트가 Android와 같은 URL 형태를 계약으로 고정하고 있어 이번에는 바꾸지 않았습니다. 저장 키·브리지 메서드·인증 동작 변경은 없습니다(기준 커밋 `a8068dca`).
>
> `ProductWebUrlsTest`에 한글·공백·`&`·`#`·`+`·`%` 인코딩 결과를 고정하는 테스트를 추가하고, `ProductWebUrlEncodingTests`로 iOS 16 이하 파싱을 흉내 낸 `URL(string:encodingInvalidCharacters: false)`에서도 URL이 유효한지, 쿼리 값이 원래대로 복원되는지, URL 생성 실패 시 실패 상태로 바뀌는지 확인했습니다. 로컬에서 `./gradlew :shared:testAndroidHostTest :shared:iosSimulatorArm64Test :androidApp:testDebugUnitTest :androidApp:assembleDebug`가 성공했고, Xcode 27.1과 iOS 18.6 시뮬레이터 1대에서 `-parallel-testing-enabled NO`로 실행한 `iosAppTests` 230개가 모두 통과했습니다.
>
> iOS 16 실기기·런타임 확인은 하지 못했습니다(Xcode 27.1 / macOS 27에서 iOS 16 시뮬레이터 런타임을 받을 수 없음). iOS 16 동작은 위 대용 파서로만 확인했습니다. Android 실기기와 실제 계정으로 게시판을 열어보는 수동 검증, instrumentation 테스트도 하지 않았습니다. 롤백은 이 커밋을 되돌리면 됩니다.

## 3. Sectioned PR

### [IceCream0910/kw-klas-plus#46](https://github.com/IceCream0910/kw-klas-plus/pull/46) (+43/−7, 14 files)

The first line used `related #44`. Under the current rule, write `Closes #N` or `Stacked #N`, or omit the line.

> ## Summary
> - Home 브리지에 인자 없는 `syncCalendar`를 추가했습니다. 웹이 일정 payload를 넘기지 않고, 메인이 현재 월을 `CalendarSyncUseCase`로 다시 조회합니다.
> - 응답은 즉시 Success이며 조회는 백그라운드입니다. iOS는 기존 `IosAcademicWidgets.syncCalendar` persist 경로로 `WidgetCenter.reloadTimelines`를 타고, Android는 `refreshCalendarNow()`로 RemoteViews를 다시 그립니다.
> - 구앱은 메서드를 몰라 거절합니다.
>
> ## Context
> - WebView 커밋: [02789d6a…](https://github.com/IceCream0910/kw-klas-plus-webview/commit/02789d6a6b5a11738eafde7944d8156648c96934)
>
> ## Test plan
> - [x] `:shared:iosSimulatorArm64Test --tests 'com.icecream.kwklasplus.core.bridge.*'`
> - [x] 캘린더 탭에서 일정 추가/수정 성공 후, 앱을 백그라운드로 보내지 않고도 iOS·Android 캘린더 위젯이 갱신되는지
> - [x] 일정 삭제 성공 후 위젯에서 해당 일정이 사라지는지
> - [x] 삭제 confirm 취소 시 브리지 미호출·위젯 불변
> - [x] 저장/삭제 실패 시 위젯 불변
> - [x] 구웹(호출 없음)에서 기존처럼 포그라운드 진입 시 동기화되는지
>
> @IceCream0910 iOS에서는 실기기 테스트까지 수행하였지만, Android쪽 실기기 테스트는 수행하지 못했습니다.(시뮬레이터는 정상동작) 한번 확인 부탁드립니다!

Section order for new PRs is `Summary` → (screenshots) → `Test Plan` → `Context`. A before/after screenshot table looks like this:

```html
<table>
  <tr><th>before</th><th>after</th></tr>
  <tr><td>(이미지)</td><td>(이미지)</td></tr>
</table>
```

## 4. Comments

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
