import type { CellDef } from "./cells";

/**
 * Compact 3-column grid (1440 x 900, same artboard as desktop).
 *
 * Cells that never coexist in a single section share a position:
 *   Pos A (480, 280): year (s0) | r2c (s2,s4,s5)
 *   Pos B (480, 480): r4b  (s1,s3,s5) | r4c (s2,s4)
 *   Pos C (960, 480): r4d  (s0,s4) | r1e (s3)
 *   Pos D (0,   640): r2d  (s4) | r2f (s3)
 *   Footer halves:   r5a/r5b (left), r5c/r5d (right)
 */
export const CELLS_COMPACT: CellDef[] = [
  // Row 0: hero — full width
  { id: "hero", x: 0, y: 0, w: 1440, h: 280, delay: 0 },

  // Row 1: flanking + center
  { id: "r3a", x: 0, y: 280, w: 480, h: 200, delay: 0.05 },
  { id: "year", x: 480, y: 280, w: 480, h: 200, delay: 0.02 },
  { id: "r2c", x: 480, y: 280, w: 480, h: 200, delay: 0.03 },
  { id: "r3b", x: 960, y: 280, w: 480, h: 200, delay: 0.07 },

  // Row 2: secondary content
  { id: "r2g", x: 0, y: 480, w: 480, h: 160, delay: 0.06 },
  { id: "r4b", x: 480, y: 480, w: 480, h: 160, delay: 0.06 },
  { id: "r4c", x: 480, y: 480, w: 480, h: 160, delay: 0.04 },
  { id: "r4d", x: 960, y: 480, w: 480, h: 160, delay: 0.08 },
  { id: "r1e", x: 960, y: 480, w: 480, h: 160, delay: 0.015 },

  // Row 3: tertiary (only s3 and s4 use this row)
  { id: "r2d", x: 0, y: 640, w: 480, h: 100, delay: 0.05 },
  { id: "r2f", x: 0, y: 640, w: 480, h: 100, delay: 0.02 },

  // Row 4: footer — 2 half-width cells
  { id: "r5a", x: 0, y: 740, w: 720, h: 160, delay: 0.03 },
  { id: "r5b", x: 0, y: 740, w: 720, h: 160, delay: 0.05 },
  { id: "r5c", x: 720, y: 740, w: 720, h: 160, delay: 0.07 },
  { id: "r5d", x: 720, y: 740, w: 720, h: 160, delay: 0.09 },
];
