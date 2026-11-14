# PR body examples

Copied unchanged from the user's public PRs on IceCream0910/kw-klas-plus (collected 2026-10-27). Use them for voice and paragraph flow. Section layout and link rules follow SKILL.md, which is newer than some of these examples.

## 1. One-paragraph PRs

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

## 2. Sectioned PR

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

