import type { jsPDF } from "jspdf";

// Same artwork as the header logo (src/components/common/header.tsx), in the
// 320x360 viewBox units. Segments are relative to START, as jsPDF's `lines`
// expects: 2 numbers = line, 6 numbers = cubic Bézier.
const START = { x: 72, y: 42 };
const SEGMENTS: number[][] = [
  [102, 0],
  [53, 0, 96, 39, 96, 91],
  [0, 39, -24, 72, -59, 85],
  [76, 100],
  [-66, 0],
  [-83, -111],
  [33, 0],
  [30, 0, 53, -21, 53, -51],
  [0, -29, -23, -50, -53, -50],
  [-43, 0],
  [0, 101],
  [-56, 0],
  [0, -165],
];
const DOT = { cx: 92, cy: 266, r: 30 };

const BOUNDS = { x: 62, y: 42, width: 225, height: 276 };

const LETTER_COLOR: [number, number, number] = [16, 29, 23];
const DOT_COLOR: [number, number, number] = [47, 143, 70];

export const LOGO_ASPECT = BOUNDS.width / BOUNDS.height;

export function drawLogo(doc: jsPDF, x: number, y: number, height: number) {
  const scale = height / BOUNDS.height;

  doc.setFillColor(...LETTER_COLOR);
  doc.lines(
    SEGMENTS,
    x + (START.x - BOUNDS.x) * scale,
    y + (START.y - BOUNDS.y) * scale,
    [scale, scale],
    "F",
    true,
  );

  doc.setFillColor(...DOT_COLOR);
  doc.circle(
    x + (DOT.cx - BOUNDS.x) * scale,
    y + (DOT.cy - BOUNDS.y) * scale,
    DOT.r * scale,
    "F",
  );
}
