// Helpers for building a course report .docx in the user's style.
// Usage: write a content script that does
//   const R = require("<this file>");
//   R.build({ out, cover: {...}, body: [R.section("1. Introduction"), R.p("..."), ...] });
// and run it with NODE_PATH pointing at a folder where `docx` is installed.
const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, ImageRun, Table, TableRow, TableCell,
  AlignmentType, WidthType, BorderStyle, ShadingType, PageBreak,
} = require("docx");

const FONT = "Malgun Gothic";
const BODY = 20; // 10pt body text
const LINE = { line: 300, after: 0 }; // about 17pt line pitch, as in the past reports

// **bold** inline markup (no _italic_: underscores in code names like max_lag must stay as text)
function runs(text, base = {}) {
  const out = [];
  const re = /(\*\*[^*]+\*\*)/g;
  let last = 0, m;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(new TextRun({ text: text.slice(last, m.index), ...base }));
    const t = m[0];
    out.push(new TextRun({ text: t.slice(2, -2), bold: true, ...base }));
    last = m.index + t.length;
  }
  if (last < text.length) out.push(new TextRun({ text: text.slice(last), ...base }));
  return out;
}

// Headings are plain Normal paragraphs with bold runs, never Heading styles.
const section = (text) => new Paragraph({            // "1. Introduction": 12pt bold
  spacing: { before: 0, after: 0, line: 300 },
  children: [new TextRun({ text, bold: true, size: 24 })],
});
const sub = (text) => new Paragraph({                // "Assignment2-1", "3.2 ...": 11pt bold
  spacing: { before: 0, after: 0, line: 300 },
  children: [new TextRun({ text, bold: true, size: 22 })],
});
const minor = (text) => new Paragraph({              // "시스템 콜 등록", "a. ...": 10pt bold
  spacing: { before: 0, after: 0, line: 300 },
  children: [new TextRun({ text, bold: true })],
});
const p = (text) => new Paragraph({ spacing: { ...LINE, after: 120 }, alignment: AlignmentType.JUSTIFIED, children: runs(text) });
const bullet = (text) => new Paragraph({ spacing: { ...LINE, after: 40 }, children: runs("- " + text) });
const eq = (text) => new Paragraph({
  alignment: AlignmentType.CENTER, spacing: { before: 60, after: 120 },
  children: [new TextRun({ text, font: "Cambria Math", size: 21 })],
});

// Image with an optional caption below it ("Figure N. ..."). widthPx: 600 ≈ 6.25in (full text width).
function fig(file, caption, widthPx = 600) {
  const buf = fs.readFileSync(file);
  // PNG size from the IHDR chunk
  const w = buf.readUInt32BE(16), h = buf.readUInt32BE(20);
  const out = [new Paragraph({
    alignment: AlignmentType.CENTER, spacing: { before: 120, after: caption ? 60 : 120 },
    children: [new ImageRun({ type: "png", data: buf, transformation: { width: widthPx, height: Math.round(widthPx * h / w) } })],
  })];
  if (caption) out.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 160 }, children: [new TextRun({ text: caption })] }));
  return out;
}

// Simple bordered table; widths in DXA (1440 = 1in), summing to at most 9026 on A4 with 1in margins.
function table(header, rows, widths, caption) {
  const b = { style: BorderStyle.SINGLE, size: 4, color: "999999" };
  const borders = { top: b, bottom: b, left: b, right: b };
  const cell = (t, w, head) => new TableCell({
    borders, width: { size: w, type: WidthType.DXA },
    shading: head ? { fill: "E8E8E8", type: ShadingType.CLEAR, color: "auto" } : undefined,
    margins: { top: 40, bottom: 40, left: 100, right: 100 },
    children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: t, bold: head, size: 18 })] })],
  });
  const out = [];
  if (caption) out.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 120, after: 60 }, children: [new TextRun({ text: caption })] }));
  out.push(new Table({
    width: { size: widths.reduce((a, c) => a + c, 0), type: WidthType.DXA },
    columnWidths: widths, alignment: AlignmentType.CENTER,
    rows: [
      new TableRow({ tableHeader: true, children: header.map((t, i) => cell(t, widths[i], true)) }),
      ...rows.map((r) => new TableRow({ children: r.map((t, i) => cell(t, widths[i], false)) })),
    ],
  }));
  out.push(new Paragraph({ spacing: { after: 120 }, children: [] }));
  return out;
}

// Cover: course name and assignment centered at 48pt bold, ID/name/course right-aligned at 11pt at the bottom.
function cover({ course, title, studentId, name, courseLine }) {
  const blank = (n) => Array.from({ length: n }, () => new Paragraph({ children: [] }));
  return [
    ...blank(12),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 }, children: [new TextRun({ text: course, bold: true, size: 96 })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: title, bold: true, size: 96 })] }),
    ...blank(14),
    ...[`학번: ${studentId}`, `이름: ${name}`, `과목: ${courseLine}`].map((t) =>
      new Paragraph({ alignment: AlignmentType.RIGHT, spacing: { after: 80 }, children: [new TextRun({ text: t, size: 22 })] })),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

function build({ out, cover: c, body }) {
  const doc = new Document({
    styles: { default: { document: { run: { font: FONT, size: BODY } } } },
    sections: [{
      properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
      children: [...(c ? cover(c) : []), ...body.flat()],
    }],
  });
  return Packer.toBuffer(doc).then((buf) => { fs.writeFileSync(out, buf); console.log("wrote", out); });
}

module.exports = { section, sub, minor, p, bullet, eq, fig, table, cover, build };
