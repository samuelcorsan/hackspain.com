import { TRI_BL, TRI_R1A } from "./constants";

export type CellDef = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  delay: number;
  clip?: string;
};

export const CELLS: CellDef[] = [
  // Row 1 (y 0-180)
  { id: "year", x: 480,  y: 0,   w: 220, h: 180, delay: 0.02 },
  { id: "r1a",  x: 200,  y: 0,   w: 280, h: 120, delay: 0.01, clip: TRI_R1A },
  { id: "r1b",  x: 700,  y: 0,   w: 180, h: 140, delay: 0.03 },
  { id: "r1c",  x: 1140, y: 0,   w: 160, h: 120, delay: 0.05 },
  { id: "r1d",  x: 1300, y: 0,   w: 140, h: 180, delay: 0.02, clip: TRI_BL },
  { id: "r1e",  x: 300,  y: 120, w: 180, h: 60,  delay: 0.015 },

  // Row 2 (y 120-340)
  { id: "r2a",  x: 0,    y: 180, w: 160, h: 160, delay: 0.04 },
  { id: "r2b",  x: 160,  y: 120, w: 140, h: 220, delay: 0.06, clip: TRI_BL },
  { id: "r2c",  x: 300,  y: 180, w: 240, h: 160, delay: 0.03 },
  { id: "r2d",  x: 540,  y: 180, w: 160, h: 160, delay: 0.05 },
  { id: "r2e",  x: 700,  y: 140, w: 180, h: 200, delay: 0.07 },
  { id: "r2f",  x: 880,  y: 180, w: 160, h: 160, delay: 0.02 },
  { id: "r2g",  x: 1040, y: 120, w: 180, h: 220, delay: 0.06 },
  { id: "r2h",  x: 1220, y: 180, w: 220, h: 160, delay: 0.04, clip: TRI_BL },

  // Row 3 (y 340-560) - hero + flanking
  { id: "r3a",  x: 200,  y: 340, w: 280, h: 200, delay: 0.05 },
  { id: "hero", x: 480,  y: 340, w: 480, h: 220, delay: 0    },
  { id: "r3b",  x: 960,  y: 340, w: 260, h: 200, delay: 0.07 },

  // Row 4 (y 540-740)
  { id: "r4a",  x: 0,    y: 560, w: 220, h: 180, delay: 0.03 },
  { id: "r4b",  x: 220,  y: 540, w: 260, h: 200, delay: 0.06 },
  { id: "r4c",  x: 480,  y: 560, w: 480, h: 180, delay: 0.04 },
  { id: "r4d",  x: 960,  y: 540, w: 240, h: 200, delay: 0.08 },
  { id: "r4e",  x: 1200, y: 560, w: 240, h: 180, delay: 0.05, clip: TRI_BL },

  // Row 5 (y 740-900)
  { id: "r5a",  x: 0,    y: 740, w: 360, h: 160, delay: 0.03 },
  { id: "r5b",  x: 360,  y: 740, w: 360, h: 160, delay: 0.05 },
  { id: "r5c",  x: 720,  y: 740, w: 360, h: 160, delay: 0.07 },
  { id: "r5d",  x: 1080, y: 740, w: 360, h: 160, delay: 0.09 },
];
