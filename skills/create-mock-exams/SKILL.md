---
name: create-mock-exams
description: Create an expected exam paper (예상문제, 예상 시험지) from lecture materials, the exam types the user reports, and optionally a past exam (족보) whose format must be matched. Questions are always in English; all solutions come after the last question and explain each question and its answer in Korean. Use when the user asks for 예상문제, 예상 시험지, mock exams, or practice exams for a course.
---

# Create Mock Exams

Write an expected exam paper for the user's course. Base it on the lecture materials and on what the user says will appear on the exam. If the user gives a past exam (족보), match its format exactly. Always use this layout: every question in English first, then every solution in Korean at the end.

## Inputs

- **Exam scope:** lecture slides, papers, notes, or a textbook range. Read all of it before writing. For PDFs, follow the PDF skill when it is available. Extract the text page by page, and render the pages whose equations, diagrams, or tables did not come through in the extracted text.
  - On this machine the PDF Python environment is `~/.venvs/pdf` (run scripts with `~/.venvs/pdf/bin/python`). It has pypdf, pdfplumber, PyMuPDF (`pymupdf`/`fitz`), pypdfium2, reportlab, Pillow, and pandas. The system `python3` has none of these, so never use it for PDFs, and do not `pip install` into it. `pdftotext`, `pdftoppm`, `qpdf`, `mutool`, and `tesseract` are not installed, and `pytesseract`/`pdf2image` are not in the venv, so render pages with pypdfium2 or PyMuPDF and do not rely on OCR. The PDF skill's examples use bare `python3`; run them with the venv interpreter instead.
  - The textbook `Data-Communications-and-Network-5e.pdf` is about 67 MB; read only the page range in scope, not the whole file.
- **Reported exam types:** topics or question types the user says will appear, such as "10 ALOHA calculation problems" or "draw the CSMA diagram". Cover every one of them, and mark each with ★.
- **Past exam (족보), optional:** a file, image, or pasted text. When one is given, its format is required (see below).
- **Extra materials in the course folder:** quiz notes, summaries, or earlier solution files. Read them too. They often show which formulas or examples the instructor stresses.

If the scope is unclear, ask once. Otherwise make sensible assumptions and state them at the top of the paper.

## Choosing the questions

1. Cover every reported exam type first. If the user gives a count (for example, "10 calculation problems"), write exactly that many and vary them. Use different given values, solve for different unknowns, and include inverse problems.
2. Then add questions the user did not mention but that are likely to appear:
   - worked examples from the slides, with new numbers
   - definitions and comparisons the slides emphasize, such as A vs B tables, advantages and disadvantages, and taxonomies
   - derivations the slides state but do not prove
   - diagrams or flowcharts the slides show
   - key claims, numbers, and assumptions from any assigned paper
3. Group the questions by chapter or topic, unless a past exam dictates another order.
4. Base every question on the given materials. Do not test content outside the scope.

## Matching a past exam (족보)

When a past exam is given, the paper must follow its format:

- the header (semester, course name, professor, and the 학번/이름 line), with the same wording and layout
- the number of questions and how parts are split, such as (a), (b), (c)
- the point notation and point totals, such as **[7]**
- the question style: how commands are phrased (Explain…, Derive…, Calculate…), whether there are multiple-choice, short-answer, or essay questions, and how long each question is
- the numbering scheme and any section headings
- the way equations, matrices, and given data are presented

Keep the past exam's question types and difficulty, and change the specific values and wording so the paper is new practice. If the past exam has several sets, you may write several sets in the same format. Each set has its own questions, and all solutions still come at the very end.

## Paper layout (always)

```
<title / header — from the 족보 if one is given>
<scope and assumptions, one or two lines in Korean>

---

# Questions
<all questions, in English, numbered consecutively>

---

# Solutions
<one entry per question, in the same order and with the same numbers>
```

- **Questions are always in English.** That includes sub-parts, given data, and diagram instructions. Use the lecture's own English terms.
- **Solutions never appear under a question.** No hints and no answers in the Questions section. All solutions go after the last question.
- **Each solution is in Korean.** Keep technical terms in English where the lecture uses them, for example `vulnerable time` or `throughput`. Each solution has these parts:
  - **해석:** what the question asks, in Korean.
  - **풀이:** the full explanation, including formulas, every calculation step, diagrams (in fenced code blocks), and comparison tables where useful.
    - Whenever a step uses a formula, first write the formula exactly as the source states it, with its source, for example `dB = 10·log₁₀(P₂/P₁)` (ch3.4 slide 7) or `T_c = DIFS + RTS + SIFS + CTS` (paper Eq. 15). Then, if the question needs another unknown, rearrange it step by step. Only after that, substitute the given values with their units and calculate.
    - Never start a step with numbers alone, such as `5 × 10^0.4 = 12.56 mW` or `−10 / (−0.5) = 20 km`, without the formula they come from. Keep units through the calculation, and convert units in a separate, visible step.
  - **답:** the final answer, stated clearly. Bold the key numbers or terms.
- Put shared formulas that many solutions use in a short block at the start of the Solutions section.

## Accuracy

- Check every numerical answer by running the calculation (for example, with Python). Do not copy numbers from the slides without checking them. If a slide or paper rounds a number or contains an error, give the exact value and explain the difference.
- Make sure each question can be answered from its given data, and has a single answer.
- Draw diagrams and flowcharts as ASCII in fenced code blocks so they read correctly as plain text.

## Output

- Save the paper as a Markdown file in the course folder of the user's notes repository, for example `<course>/midterm-expected-questions.md`. Follow the naming of files already in that folder.
- Math in the file may use LaTeX only if the course's existing files do. Otherwise write formulas in plain text with Unicode, such as `S = G·e^(−2G)`.
- **PDF or DOCX:** when the user asks for a PDF or a Word file, always leave answer space after every question so the user can solve it on the page. This space is blank or ruled; it never contains hints or answers.
  - Size each space from the written solution, not from the question type. Count the lines the solution needs for that question or sub-part (its calculation steps, diagram rows, and answer), and leave about that many ruled lines plus one or two. Do not round up to half or full pages; most short answers need only two to four lines. Give each sub-part, such as (a) or (b), its own space.
  - Keep a question and its answer space on the same page. Start a new page before a question that does not fit.
  - Start the Solutions section on a new page so the user does not see the answers while solving.
  - Keep the Markdown file without answer space; add the space only in the PDF or DOCX.
- In chat, briefly summarize what the paper covers: which reported types it includes, and what you added and why. Do not paste the whole paper into chat. Commit only when the user asks.
