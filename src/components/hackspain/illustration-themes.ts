import type { LayoutProfile } from "./artboard";
import {
  codeSvg,
  communitySvg,
  compassSvg,
  horseSvg,
  medalSvg,
  quixoteSvg,
  sparkSvg,
  sunSvg,
  trophySvg,
  windmillSvg,
} from "./assets";
import { TRI_R1A } from "./constants";

const SVG_MAP = {
  windmill: windmillSvg,
  sun: sunSvg,
  horse: horseSvg,
  quixote: quixoteSvg,
  compass: compassSvg,
  community: communitySvg,
  spark: sparkSvg,
  code: codeSvg,
  trophy: trophySvg,
  medal: medalSvg,
} as const;

export type IllArt = keyof typeof SVG_MAP;

export interface IllDef {
  box: string;
  clip?: string;
  delay: number;
  /** Edge-to-edge in slot (preserveAspectRatio none). */
  fill?: "none";
  h: number;
  id: string;
  img: string;
  svg: string | null;
  w: number;
  x: number;
  y: number;
}

const SCHEDULE: (IllArt | null)[][] = [
  ["windmill", "sun", "horse", "quixote", null, null],
  ["windmill", "quixote", "horse", "compass", null, null],
  [null, "community", "horse", null, "spark", "code"],
  [null, "sun", "horse", "trophy", "spark", "code"],
  ["trophy", "sun", "horse", "compass", "medal", null],
  ["windmill", "quixote", "horse", "compass", null, null],
];

function slot4Geometry(
  art: IllArt | null
): Pick<IllDef, "x" | "y" | "w" | "h" | "clip"> {
  if (art === "spark" || art === "medal") {
    return { x: 700, y: 140, w: 180, h: 200 };
  }
  return { x: 200, y: 0, w: 280, h: 120, clip: TRI_R1A };
}

function slot5Geometry(
  art: IllArt | null
): Pick<IllDef, "x" | "y" | "w" | "h" | "clip"> {
  if (art === "code") {
    return { x: 540, y: 180, w: 160, h: 160 };
  }
  return { x: 160, y: 120, w: 140, h: 220 };
}

function slot4GeometryCompact(
  art: IllArt | null
): Pick<IllDef, "x" | "y" | "w" | "h" | "clip"> {
  if (art === "spark" || art === "medal") {
    return { x: 940, y: 260, w: 500, h: 240 };
  }
  return { x: -20, y: 260, w: 500, h: 240 };
}

function slot5GeometryCompact(
  art: IllArt | null
): Pick<IllDef, "x" | "y" | "w" | "h" | "clip"> {
  if (art === "code") {
    return { x: 940, y: 460, w: 500, h: 200 };
  }
  return { x: -20, y: 460, w: 500, h: 200 };
}

function boxFor(slotIndex: number, art: IllArt | null): string {
  if (slotIndex === 4 && (art === "spark" || art === "medal")) {
    return "items-stretch justify-stretch p-0 min-h-0 min-w-0";
  }
  if (slotIndex === 5 && art === "code") {
    return "items-stretch justify-stretch p-0 min-h-0 min-w-0";
  }
  if (slotIndex === 4) {
    return "items-center justify-center p-2";
  }
  if (slotIndex === 5) {
    return "items-end justify-center pb-2";
  }
  if (slotIndex === 0) {
    return "items-end justify-center";
  }
  if (slotIndex === 1) {
    return "items-center justify-center p-3";
  }
  if (slotIndex === 2) {
    return "items-end justify-center";
  }
  return "items-end justify-center";
}

function delayFor(slotIndex: number, art: IllArt | null): number {
  if (slotIndex === 4 && (art === "spark" || art === "medal")) {
    return 0.07;
  }
  if (slotIndex === 5 && art === "code") {
    return 0.05;
  }
  if (slotIndex === 4) {
    return 0.01;
  }
  if (slotIndex === 5) {
    return 0.06;
  }
  if (slotIndex === 0) {
    return 0.04;
  }
  if (slotIndex === 1) {
    return 0.05;
  }
  if (slotIndex === 2) {
    return 0.03;
  }
  return 0.07;
}

function imgFor(slotIndex: number, art: IllArt | null): string {
  if (slotIndex === 4 && (art === "spark" || art === "medal")) {
    return "";
  }
  if (slotIndex === 5 && art === "code") {
    return "";
  }
  if (slotIndex === 1 && art === "quixote") {
    return "h-[90%] w-auto max-h-[96%]";
  }
  if (slotIndex === 1 && art === "compass") {
    return "h-[92%] w-auto max-h-[96%]";
  }
  if (slotIndex === 3 && art === "compass") {
    return "h-full w-auto max-w-[100%] max-h-full object-contain object-bottom";
  }
  if (slotIndex === 3 && art === "quixote") {
    return "h-full w-auto max-w-[100%] max-h-full object-contain object-bottom";
  }
  if (slotIndex === 0) {
    return "h-[94%] w-auto";
  }
  if (slotIndex === 1) {
    return "h-full w-auto";
  }
  if (slotIndex === 2) {
    return "w-full h-auto";
  }
  if (slotIndex === 3) {
    return "h-full w-auto max-w-[98%]";
  }
  if (slotIndex === 4) {
    return "h-[88%] w-auto max-w-[95%]";
  }
  return "w-[78%] h-auto max-h-[88%]";
}

const SLOT_IDS = [
  "ill-tl",
  "ill-tr",
  "ill-horse",
  "ill-br",
  "ill-slot-4",
  "ill-slot-5",
] as const;

export function illustrationsForSection(
  sectionIndex: number,
  profile: LayoutProfile = "desktop"
): IllDef[] {
  const rowIndex = Math.max(0, Math.min(SCHEDULE.length - 1, sectionIndex));
  const row = SCHEDULE[rowIndex];
  if (row === undefined) {
    return [];
  }
  const compact = profile === "compact";
  return SLOT_IDS.map((id, i) => {
    const art = i === 2 ? "horse" : (row[i] ?? null);
    const svg = art ? SVG_MAP[art] : null;

    let x: number;
    let y: number;
    let w: number;
    let h: number;
    let clip: string | undefined;

    if (compact) {
      if (i === 0) {
        x = -40;
        y = -10;
        w = 500;
        h = 300;
      } else if (i === 1) {
        x = 980;
        y = -10;
        w = 500;
        h = 300;
      } else if (i === 2) {
        x = -20;
        y = -10;
        w = 400;
        h = 300;
      } else if (i === 3) {
        x = 960;
        y = 260;
        w = 500;
        h = 340;
      } else if (i === 4) {
        ({ x, y, w, h, clip } = slot4GeometryCompact(art));
      } else {
        ({ x, y, w, h, clip } = slot5GeometryCompact(art));
      }
    } else if (i === 0) {
      x = 0;
      y = 0;
      w = 200;
      h = 180;
    } else if (i === 1) {
      x = 1030;
      y = 0;
      w = 200;
      h = 180;
    } else if (i === 2) {
      x = 0;
      y = 340;
      w = 200;
      h = 220;
    } else if (i === 3) {
      x = 1180;
      y = 340;
      w = 260;
      h = 220;
    } else if (i === 4) {
      ({ x, y, w, h, clip } = slot4Geometry(art));
    } else {
      ({ x, y, w, h, clip } = slot5Geometry(art));
    }

    const fill =
      (i === 4 && (art === "spark" || art === "medal")) ||
      (i === 5 && art === "code")
        ? ("none" as const)
        : undefined;

    return {
      id,
      x,
      y,
      w,
      h,
      clip,
      svg,
      box: boxFor(i, art),
      img: imgFor(i, art),
      delay: delayFor(i, art),
      fill,
    };
  });
}
