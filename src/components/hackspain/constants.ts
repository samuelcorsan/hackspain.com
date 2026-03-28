import { HS_PALETTE } from "./palette";

export const INK = HS_PALETTE.ink;
export const NUM_SECTIONS = 6;

export const SECTION_MISSION_INDEX = 1;
export const SECTION_UNIQUE_INDEX = 2;
export const HORSE_ILLUSTRATION_INDEX = 2;

export const HORSE_ARTBOARD = { x: 0, y: 340, w: 200, h: 220 } as const;

export const HORSE_ARTBOARD_COMPACT = { x: 0, y: 0, w: 200, h: 280 } as const;

export const HORSE_CELL_FAR_RIGHT_X_COMPACT = 960;
export const HORSE_CELL_LATE_PULL_X0_COMPACT = 420;
export const HORSE_CELL_LATE_PULL_X1_COMPACT = 1240;

export const HORSE_VIDEO_SRC = "/horse.mp4";

export const HORSE_RETURN_DURATION_S = 2.45;
export const HORSE_RETURN_TELEPORT_FADE_OUT_S = 0.07;
export const HORSE_RETURN_TELEPORT_FADE_IN_S = 0.12;

export const HORSE_CELL_REVEAL_DELAY_MS = 1250;
export const HORSE_CELL_REVEAL_DELAY_FAR_RIGHT_MS = 380;
export const HORSE_CELL_FAR_RIGHT_X = 1080;
export const HORSE_CELL_LATE_PULL_X0 = 780;
export const HORSE_CELL_LATE_PULL_X1 = 1340;
export const HORSE_CELL_LATE_PULL_MAX_ARTBOARD_PX = 340;

export const HORSE_VIDEO_CHROMA_KEY_HEX: string | null = "#0d4f2a";
export const HORSE_VIDEO_CHROMA_TOLERANCE = 72;
export const HORSE_VIDEO_CHROMA_MIN_LUMA = 36;
export const HORSE_VIDEO_CHROMA_GREEN_LEAD_R = 10;
export const HORSE_VIDEO_CHROMA_GREEN_LEAD_B = 6;

export const SPRING = { type: "spring" as const, stiffness: 300, damping: 30 };

export const slideVariants = {
  enter:  (dir: number) => ({ y: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { y: "0%", opacity: 1 },
  exit:   (dir: number) => ({ y: dir > 0 ? "-100%" : "100%", opacity: 0 }),
};

export const TRI_BL  = "polygon(0 0, 100% 0, 100% 100%)";
export const TRI_R1A = "polygon(50% 0, 100% 0, 100% 100%, 0 100%)";

export const X_SVG = '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>';

export const INSTAGRAM_SVG =
  '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>';
