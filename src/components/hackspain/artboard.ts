import { HORSE_ARTBOARD, HORSE_ARTBOARD_COMPACT } from "./constants";

export interface Artboard {
  h: number;
  w: number;
}

export const ARTBOARD_DESKTOP: Artboard = { w: 1440, h: 900 };

export const ARTBOARD_COMPACT: Artboard = { w: 1440, h: 900 };

export type LayoutProfile = "desktop" | "compact";

export const COMPACT_MEDIA_QUERY = "(max-width: 767px)";

export function artboardFor(profile: LayoutProfile): Artboard {
  return profile === "compact" ? ARTBOARD_COMPACT : ARTBOARD_DESKTOP;
}

export function horseArtboardFor(
  profile: LayoutProfile
): typeof HORSE_ARTBOARD | typeof HORSE_ARTBOARD_COMPACT {
  return profile === "compact" ? HORSE_ARTBOARD_COMPACT : HORSE_ARTBOARD;
}
