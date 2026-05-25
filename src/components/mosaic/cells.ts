import type { LayoutProfile } from "./artboard";
import { CELLS_COMPACT } from "./cells-compact";

export interface CellDef {
  clip?: string;
  delay: number;
  h: number;
  id: string;
  w: number;
  x: number;
  y: number;
}

/**
 * Desktop content grid — strict horizontal bands, no y-overlap.
 *
 * Bands: 0-180 | 180-340 | 340-560 (hero) | 560-740 | 740-900 (footer).
 * Each content cell is a clean rectangle aligned to a mosaic tile.
 * Decorative-only tiles (corners, triangles, accents) are drawn by
 * MosaicBackground and intentionally have no entry here.
 *
 * `year` and `r1e` share a slot because no section uses both.
 */
const CELLS: CellDef[] = [
  // Band 1 — y 0-180
  { id: "year", x: 480, y: 0, w: 240, h: 180, delay: 0.02 },
  { id: "r1e", x: 480, y: 0, w: 240, h: 180, delay: 0.015 },

  // Band 2 — y 180-340
  { id: "r2c", x: 320, y: 180, w: 220, h: 160, delay: 0.03 },
  { id: "r2d", x: 540, y: 180, w: 160, h: 160, delay: 0.05 },
  { id: "r2f", x: 880, y: 180, w: 160, h: 160, delay: 0.02 },
  { id: "r2g", x: 1040, y: 180, w: 200, h: 160, delay: 0.06 },

  // Band 3 (hero row) — y 340-560
  { id: "r3a", x: 200, y: 340, w: 280, h: 220, delay: 0.05 },
  { id: "hero", x: 480, y: 340, w: 480, h: 220, delay: 0 },
  { id: "r3b", x: 960, y: 340, w: 260, h: 220, delay: 0.07 },

  // Band 4 — y 560-740
  { id: "r4b", x: 220, y: 560, w: 260, h: 180, delay: 0.06 },
  { id: "r4c", x: 480, y: 560, w: 480, h: 180, delay: 0.04 },
  { id: "r4d", x: 960, y: 560, w: 260, h: 180, delay: 0.08 },

  // Band 5 (footer) — y 740-900
  { id: "r5a", x: 0, y: 740, w: 360, h: 160, delay: 0.03 },
  { id: "r5b", x: 360, y: 740, w: 360, h: 160, delay: 0.05 },
  { id: "r5c", x: 720, y: 740, w: 360, h: 160, delay: 0.07 },
  { id: "r5d", x: 1080, y: 740, w: 360, h: 160, delay: 0.09 },
];

export function cellsForProfile(profile: LayoutProfile): CellDef[] {
  if (profile !== "compact") {
    return CELLS;
  }
  return CELLS_COMPACT;
}
