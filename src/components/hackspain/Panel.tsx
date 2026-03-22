import type { Artboard } from "./artboard";
import { ARTBOARD_DESKTOP } from "./artboard";

export function vp(
  x: number,
  y: number,
  w: number,
  h: number,
  artboard: Artboard = ARTBOARD_DESKTOP,
): React.CSSProperties {
  return {
    position: "absolute",
    left:   `${(x / artboard.w) * 100}%`,
    top:    `${(y / artboard.h) * 100}%`,
    width:  `${(w / artboard.w) * 100}%`,
    height: `${(h / artboard.h) * 100}%`,
  };
}

export function P({ bg = "bg-hs-paper", align = "center", children }: {
  bg?: string; align?: "center" | "start"; children: React.ReactNode;
}) {
  const a = align === "start" ? "items-start justify-start" : "items-center justify-center";
  return <div className={`flex h-full w-full flex-col ${a} gap-2 p-3 ${bg}`}>{children}</div>;
}
