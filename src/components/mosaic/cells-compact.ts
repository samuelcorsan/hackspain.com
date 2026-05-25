import type { CellDef } from "./cells";

/**
 * Compact (portrait) layout — artboard 1440 x 2560 (≈9:16).
 *
 * Deliberately few, large cards: a full-width hero, two big stacked content
 * cards, and a footer. Each section's scattered desktop tiles are merged into
 * these slots by `buildSectionsCompact` so mobile shows information in a few
 * readable cards instead of a dense grid.
 */
export const CELLS_COMPACT: CellDef[] = [
  { id: "hero", x: 0, y: 0, w: 1440, h: 720, delay: 0 },
  { id: "b1", x: 0, y: 720, w: 1440, h: 680, delay: 0.05 },
  { id: "b2", x: 0, y: 1400, w: 1440, h: 680, delay: 0.1 },
  { id: "foot", x: 0, y: 2080, w: 1440, h: 480, delay: 0.15 },
];
