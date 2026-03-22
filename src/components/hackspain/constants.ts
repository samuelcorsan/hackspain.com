export const INK = "#2a170f";
export const NUM_SECTIONS = 6;

export const SECTION_MISSION_INDEX = 1;
export const SECTION_UNIQUE_INDEX = 2;
export const HORSE_ILLUSTRATION_INDEX = 2;

export const HORSE_ARTBOARD = { x: 0, y: 340, w: 200, h: 220 } as const;

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
