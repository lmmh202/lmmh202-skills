---
name: create-report
description: Draft a course assignment report (과제 보고서) as a .docx in the user's own report style, from the assignment spec (제안서), the user's code, and its real output and figures. Writes in Korean unless the spec says otherwise, in plain undergraduate-level wording, with plain bold paragraphs as section titles (no Word heading styles), and checks the spec's page limit. Use when the user asks to write, draft, or build a report or 보고서 for an assignment, project, or lab.
---

# Create Report

Write a report for one of the user's course assignments, using their own past reports as the style guide. Every number, log line, and screenshot description in the report comes from the user's actual code, output, or captures. Never invent a result.

## Inputs

- **Assignment spec (제안서):** read all of it before writing. Note the submission rules: language, page limit, required sections, file names, and every question the report has to answer.
- **The user's work:** code, console output, figures, screenshots, and logs. If a number the report needs is not available, run the code to get it (in the project's own venv, if it has one) or ask the user. Do not estimate it.
- **Earlier reports, optional:** if the user gives a past report for the same course, match its cover values and whether it used figure captions. The style itself is described below. Extract PDF text with `~/.venvs/pdf/bin/python` (PyMuPDF/pypdf), because the system `python3` has no PDF packages.

## Language and wording

- Write in **Korean** unless the spec or the user says otherwise (for example, "Submit the report in English"). If the report must be in English, keep the same structure, tone, and plain wording.
- Write for an undergraduate reader. Use the terms from the lecture and the spec. Do not bring in harder terms the course has not used. When a technical idea is needed, say what it does in plain words, as the past reports do ("최대 풀링은 2×2 영역마다 가장 큰 값 하나를 남기는 방식이다").
- Keep code identifiers, commands, function names, and log text in their original form (`kallsyms_lookup_name`, `np.corrcoef`, `dmesg`).
- Use the plain written style: `~이다`, `~하였다`, `~했다`, `~확인하였다`. Do not use `~합니다` or `~요`. Use short declarative sentences, one idea per sentence, and no marketing words or exaggeration.
- Follow these habits:
  - **Open each part by saying what was done:** "커널 메시지 큐 시스템 콜 os_mq를 번호 336번에 등록하고, 사용자 공간 셸 mqsh로 open / send / recv / close를 시연하였다."
  - **Give the reason right after a design choice:** "잠들기 전에는 스핀락을 해제한다. 락을 든 채 잠들면 상대 recv가 큐를 비울 수 없기 때문이다."
  - **Describe the steps, then the result you saw:** "uname -r로 5.4.282-os2021202071을 확인하고, grep __x64_sys_os_mq /proc/kallsyms로 심볼이 적재되었음을 확인하였다."
  - **Read the figure, then interpret it:** "Figure 1은 62개 인물 클래스의 균형화 전후 이미지 수를 보여준다. 균형화 전에는 인물별 이미지 수에 큰 차이가 있었다."
  - **Quote exact values and output text:** "가장 높은 정확도는 whitening을 적용하고 주성분 50개와 k=1을 사용했을 때의 29.68%였다."
  - **Name what can go wrong and what it causes:** "이 이름이 테이블과 구현에서 일치하지 않으면 새 커널로 부팅되지 않는다."
  - **State limits plainly, without hedging:** "검증셋은 인물별로 약 2–3장에 해당하므로 표본 수가 적어 정확도와 손실이 흔들릴 수 있다."
  - **In Consideration:**
    - Say what was new or hard and how it was handled: "가장 까다로웠던 부분은 …이었다."
    - When there are several points, say so first, then go through them: "다음 두 가지 핵심 사항을 고려하여 … 첫째, … 둘째, …"
    - End with what was learned, in one or two sentences.

## Structure

Use the spec's required sections when it names them. Otherwise follow the past reports:

1. **표지:** course name and `AssignmentN` (or the project name) centered in large bold type; `학번`, `이름`, `과목: <과목명>(<교수명> 교수님)` right-aligned near the bottom. Copy the values from a past report of the same course or ask the user. If the report must be in English, translate the labels and ask how to write the names.
2. `1. Introduction`: one paragraph on the goal of the assignment, what was built, and how it was checked. For a multi-part assignment, say what each part (2-1, 2-2, …) does in one or two sentences each.
3. `2. Algorithm` (when there is a method to explain, as in the AI report): numbered subsections (`2.1 …`) that explain the method, formulas, and design choices, before any results.
4. `N. Result`: one subsection per task or part (`3.1 …` or `Assignment2-1`). Put each figure or screenshot right after the paragraph that introduces it, then explain what it shows and what it proves. Answer every question in the spec somewhere in this section or in Consideration, and quote the actual values.
5. `N. Consideration`: interpretation, limits of the result (small samples, choices made on the test set, and so on), problems met during the work and how they were solved, and what was learned. Write it in prose paragraphs, not bullet lists.
6. `N. Reference`: one `- ` line per source: the spec, `강의 자료 참고`, and official documentation with its URL in parentheses.

Answer the spec's questions in this prose structure. Do not copy the spec's numbering (1(a), 1(b), …) into the report unless the spec asks for it. Use paragraphs; use bullet lists only in Reference.

## Formatting

Build the .docx with `scripts/report.js` (docx-js). Its helpers already follow these rules:

- **No Word heading styles.** Section and subsection titles (`1. Introduction`, `3.2 …`, `Assignment2-1`, `a. …`) are Normal paragraphs with bold runs: 12pt for sections, 11pt for subsections, 10pt for minor titles. Never use `Heading1`/`제목 1`.
- Font: 맑은 고딕 (Malgun Gothic) throughout, body 10pt, A4, 1-inch margins, justified body text.
- Figures: centered.
  - Plots and result figures get a caption centered below them, `Figure N. <short English description>`. Refer to each one in the text ("Figure 2는 …").
  - Terminal or log screenshots (as in OS assignments) get no caption. The paragraph before or after the screenshot says what it shows.
- Tables: small centered tables for numbers that are compared (theory vs. sample, before vs. after), with a caption above (`Table N. …`).
- Equations: one centered line in Cambria Math, written with Unicode (φ₁, ρₖ, √, ≈). Keep them short.

Workflow:

1. Install `docx` once in a scratch folder: `npm init -y && npm install docx`, then run scripts with `NODE_PATH=<that folder>/node_modules`.
2. Write a content script in the scratch folder that `require`s `scripts/report.js` and calls `build({ out, cover, body })`. Name the output after the course's file naming (for example `2021202071_AI_project2.docx`) and put it next to the assignment files.
3. Run it, then remove ZIP folder entries: `zip -d out.docx '*/'`.

## Page limit and check

If the spec has a page limit, count the pages in Microsoft Word, which is installed:

```bash
osascript -e 'tell application "Microsoft Word"
open file name "/abs/path/report.docx"
delay 3
compute statistics active document statistic statistic pages
end tell'
```

- Use `open file name` with a POSIX path. `open POSIX file` and `open -a` may silently fail to open a second document.
- Word's AppleScript `close` does not work here, and saving as PDF outside `~/Library/Containers/com.microsoft.Word/Data` hangs on a permission dialog. Count pages only, and tell the user which documents are still open in Word so they can close them without saving.
- If the report is over the limit, cut words first (repeated explanations, restated numbers), then make wide figures a little smaller. Do not shrink the body text or margins.

## Finish

- Report the file path, page count, and the points the user should check: values you could not verify, names on the cover, lecture-slide citations you added without seeing the slides, and any interpretation the user may disagree with.
- Do not commit, push, or submit unless the user asks.
