import type { CellDef } from "./cells";

/**
 * Compact 3-column grid (1440 x 900, same artboard as desktop).
 *
 * Only cells that carry section content get real positions.
 * Never-populated cells (r1a-d, r2a, r2b, r2e, r2h, r4a, r4e) are
 * zero-sized so they exist in the array but never render visibly.
 *
 * Several cells share the same physical position because they never
 * appear in the same section:
 *   Pos A  (480, 280): year (s0) | r2c (s2,s4,s5)
 *   Pos B  (480, 480): r4b  (s1,s3,s5) | r4c (s2,s4)
 *   Pos C  (960, 480): r4d  (s0,s4) | r1e (s3)
 *   Pos D  (0,   640): r2d  (s4) | r2f (s3)
 *
 * Footer uses 2 half-width cells instead of desktop's 4:
 *   Left  (0,   740): r5a (s0,s2,s4) | r5b (s1,s3,s5)
 *   Right (720, 740): r5c (s0,s2,s4) | r5d (s1,s3,s5)
 */

const ZERO: Pick<CellDef, "x" | "y" | "w" | "h"> = { x: 0, y: 0, w: 0, h: 0 };

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

  // Never-populated cells — zero-sized
  { id: "r1a", ...ZERO, delay: 0.01 },
  { id: "r1b", ...ZERO, delay: 0.03 },
  { id: "r1c", ...ZERO, delay: 0.05 },
  { id: "r1d", ...ZERO, delay: 0.02 },
  { id: "r2a", ...ZERO, delay: 0.04 },
  { id: "r2b", ...ZERO, delay: 0.06 },
  { id: "r2e", ...ZERO, delay: 0.07 },
  { id: "r2h", ...ZERO, delay: 0.04 },
  { id: "r4a", ...ZERO, delay: 0.03 },
  { id: "r4e", ...ZERO, delay: 0.05 },
];
