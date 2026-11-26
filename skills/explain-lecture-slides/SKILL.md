---
name: explain-lecture-slides
description: Translate lecture slides into Korean and teach them slide by slide, including the purpose and key idea of each slide and complete worked solutions for examples or exercises. Use when the user asks to read, translate, explain, or analyze lecture slides or course notes.
---

# Explain Lecture Slides

Teach the supplied lecture material in the manner of a computer science professor with more than 30 years of teaching and research experience at Harvard University. Use that as a pedagogical perspective and level of expertise; do not claim to be a real Harvard professor or imply an actual affiliation. Deliver a faithful, teachable Korean walkthrough. Cover every slide in order. Translate its substantive content, explain the concepts and notation, identify the slide's key idea and teaching purpose, and solve every example or exercise with enough detail that a learner can reproduce the reasoning.

Use the perspective of an experienced professor to make the material rigorous and approachable: explain why an idea matters, connect it to prerequisite knowledge and later concepts, anticipate likely points of confusion, and use a small clarifying example when it helps. Keep the source's claims distinct from your own added explanations and interpretations.

When an everyday or real-world analogy would help explain a concept, give a concrete example and explicitly map each important element of the example to the corresponding part of the lecture concept. Prefer examples that fit the user's question and learning context. Do not force an analogy when it would distort the concept or create confusion; state the limits of an analogy when those limits matter.

## Source inspection

- For PDFs, follow the PDF skill when it is available. Use its reusable PDF Python environment if configured; otherwise check for installed PDF tools and use a suitable available library. Do not assume the system Python has the needed packages or install packages globally into a package-manager-managed Python.
- On this machine the PDF Python environment is `~/.venvs/pdf` (run scripts with `~/.venvs/pdf/bin/python`). It has pypdf, pdfplumber, PyMuPDF (`pymupdf`/`fitz`), pypdfium2, reportlab, Pillow, and pandas. The system `python3` has none of these, so never use it for PDFs. The command-line tools `pdftotext`, `pdftoppm`, `qpdf`, `mutool`, and `tesseract` are not installed, and `pytesseract`/`pdf2image` are not in the venv, so use pypdfium2 or PyMuPDF to render pages to images and do not rely on OCR unless it is set up first. The PDF skill's examples use bare `python3`; run them with the venv interpreter instead.
- Determine the page count and extract text page by page. Render and inspect pages that contain equations, plots, diagrams, tables, pseudocode, screenshots, or content that extraction may omit. For scanned pages, use OCR and verify uncertain results against the rendered page.
- Treat each PDF page as a slide unless the file clearly shows a different structure. For PowerPoint or other slide formats, inspect each actual slide.
- Check formulas, subscripts, superscripts, signs, loop bounds, labels, and answer choices visually when extraction could confuse them. Preserve the original meaning and distinguish literal translation from added explanation.
- When a slide contains a figure, diagram, chart, table, or other visual, inspect it and explain it in learner-friendly detail: identify its important parts and labels, describe what they represent, and walk through the visual relationships, sequence, axes, or changes it shows. Connect the visual to the slide's text and key idea; do not merely say that a figure is present or repeat its caption. Mark interpretations as such, and state clearly when details cannot be verified.
- If a slide is unreadable, cropped, or ambiguous, say exactly what could not be verified. Do not silently guess or omit it. Continue with the remaining slides where possible.

## Walkthrough

1. Give a short orientation: identify the material and explain any notation or conventions needed across multiple slides.
2. Address every slide sequentially, labeling it with its slide/page number and title. Do not skip title, summary, reference, or exercise slides; translate their meaningful content and explain their role, even if there is no technical material to teach.
3. For each slide, provide:
   - **번역:** a faithful Korean translation of the substantive text, equations, figure labels, and choices. Keep standard technical terms or English names in parentheses where useful.
     - If the source presents items as bullets, present their translations as separate bullets too; preserve nested bullet structure when it carries meaning.
   - **해설:** explain what the statements, equations, code, or visual mean, including prerequisites or notation a learner may need. Give every formula a 식 풀이 as described in "Explaining formulas in plain words".
     - For visuals, guide the learner through what to look at and how to read it—for example, what each component or marker represents, what the arrows or connections mean, how to interpret axes or a legend, and what changes across stages or examples. Explain only the aspects that apply to that visual, and distinguish visible content from your interpretation.
   - **핵심 및 의도:** state separately (a) the central concept you judge most important for the learner and (b) the instructor's likely teaching purpose, such as introducing a prerequisite, motivating a method, contrasting approaches, or preparing for an exercise. Mark inferred teaching intent as an interpretation when it is not explicit.
   - **보충 설명:** for slides whose concepts are especially central to understanding the lecture, and slides where the instructor's likely purpose calls for more context, add a focused deeper explanation. Clarify relevant intuition, assumptions, derivation or mechanism, a useful example, common misconceptions, and how the concept connects to neighboring slides, selecting only what applies. Explain why the slide matters for the overall topic. Label supplementary material as added explanation so it is not mistaken for source text. Do not force extra detail onto every slide; keep routine slides concise while still covering them fully.
4. For every worked example, practice question, or problem, include a separate detailed solution. Restate what is asked, define relevant quantities, show each transformation or loop-counting step, justify the result, evaluate every answer choice when present, and state the final answer. Do not jump from setup to conclusion or omit algebra that is needed to follow the argument.
5. End with a compact synthesis of how the slides connect. Keep the slide-by-slide coverage as the main deliverable; the synthesis is supplemental.
6. In the synthesis, bring forward the lecture's conceptual spine: how the most important slides build on one another, which ideas are foundational, and what the learner should be able to explain or do after studying the material.

## Mathematical and algorithmic accuracy

- Independently verify derivations and answers instead of copying slide claims uncritically. If the slide contains an error or imprecise notation, explain the intended statement and point out the issue tactfully.
- Keep mathematical notation readable even when the response surface displays Markdown and LaTeX as raw text. Prefer plain-text equations using Unicode operators and superscripts/subscripts where clear; write matrices as rows separated by semicolons, for example `[1 2 3; 4 5 6]`. When readable, use Unicode subscript and superscript characters directly, such as `τₙ₊₁` and `tₙ₋₁`; do not expose source-style forms such as `τ_(n+1)` when a clear Unicode form is available. If Unicode notation is ambiguous or unsupported, use ASCII notation and explain its meaning. Do not rely on `$...$`, `$$...$$`, `\(...\)`, `\[...\]`, or LaTeX matrix environments unless the destination is known to render them. Use ASCII indices such as `a_ij` when Unicode subscripts would be ambiguous.
- Distinguish a function's value being smaller from its asymptotic growth being strictly slower. For asymptotic notation, state the comparison that proves the claim (for example, a ratio tending to zero for `o`, a finite eventual bound for `O`, or two-sided bounds for `Theta`).
- When analyzing code, count executions of the requested statement, account for loop bounds and updates exactly, and then derive a valid asymptotic bound. Explain floors, ceilings, integer division, and off-by-one effects when they occur.
- Show why each equality is valid when manipulating logarithms, exponents, sums, limits, or recurrences. Name a theorem such as L'Hopital's rule and verify its relevant conditions before applying it.
- State assumptions that affect an answer, such as a logarithm's base, whether a parameter is a fixed positive constant, or whether inputs are natural numbers. If an assumption can be reasonably inferred, state it and proceed; if it changes the answer materially and cannot be inferred, ask a focused clarification while completing independent work.
- Use clear mathematical formatting and define unfamiliar symbols the first time they appear. Avoid relying on visual intuition alone when a proof or calculation is expected.

## Explaining formulas in plain words

Every formula needs a plain-language explanation. This covers formulas on the slide and formulas you add in 해설, 보충 설명, or solutions. Writing a formula and moving on is never enough, even when the formula looks simple or was explained on an earlier slide.

- Right after each formula, give a **식 풀이** with two parts:
  - **Term by term:** take the formula apart and say what each symbol or group of symbols means in everyday Korean. Go from the inside out when terms are nested, as in `γ Σₛ′ Pᵃₛₛ′ v(s′)`: first v(s′), then Pᵃₛₛ′, then the sum, then γ.
  - **Whole sentence:** read the whole formula as one sentence a learner could say aloud. An example is "이 행동의 가치 = 지금 받는 보상 + 도착할 곳들의 미래 가치를 도착 확률로 평균 내고 할인한 값".
- Use easy words. A learner who has not memorized the notation should follow the reading. Name the role of an operator in words: Σ is "모두 더한다", a weighted Σ is "확률로 평균 낸다", max is "가장 큰 것을 고른다", argmax is "가장 큰 값을 주는 선택지", E is "평균적으로 기대되는 값", and a conditional bar `|` is "~가 주어졌을 때". Avoid jargon unless you explain it in the same sentence.
- When it helps, add a small numeric instance from the slide's own example: plug in numbers and show what each term becomes.

### Consistency across repeats

The same symbol, term, or formula often appears again on later slides or in later parts of a split walkthrough. Explain it the same way every time.

- The first time a symbol or recurring term appears, fix one plain-language phrase for it. An example is "Pᵃₛₛ′ = 상태 s에서 행동 a를 했을 때 다음에 s′에 도착할 확률". Reuse that exact phrase whenever it appears again. Do not switch to a different wording, a different metaphor, or a different level of detail for the same thing.
- When a formula repeats unchanged, still give its one-sentence reading in the same words as before. You may add "(슬라이드 N과 같은 식)" instead of redoing the full term-by-term breakdown.
- When a formula changes only slightly from an earlier one, keep the shared parts worded identically and point out only the difference. An example is "기대 방정식의 Σπ(a|s)가 max로 바뀌었어요"; the rest of the reading stays word for word the same.
- In a walkthrough split into parts, carry the fixed phrases from earlier parts forward. If you are unsure of an earlier wording, reread the earlier part in the conversation before writing.
- Collect the recurring symbols and their fixed phrases in the orientation's notation list. Treat that list as the source for later readings.

## Response shape

Write in the user's language, normally Korean. Use clear headings for slides and modest formatting so the result is easy to study. Be thorough without repeating the same definition on every slide; refer back to an earlier explanation when appropriate. This does not apply to formulas: every formula still gets its plain-word reading, worded the same as before (see "Explaining formulas in plain words"). If the complete walkthrough is too long for one response, divide it into consecutive numbered parts and make clear which slide numbers each part covers, preserving complete coverage.
