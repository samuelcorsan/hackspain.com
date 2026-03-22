export function vp(x: number, y: number, w: number, h: number): React.CSSProperties {
  return {
    position: "absolute",
    left:   `${(x / 1440) * 100}%`,
    top:    `${(y / 900)  * 100}%`,
    width:  `${(w / 1440) * 100}%`,
    height: `${(h / 900)  * 100}%`,
  };
}

export function P({ bg = "bg-hs-paper", align = "center", children }: {
  bg?: string; align?: "center" | "start"; children: React.ReactNode;
}) {
  const a = align === "start" ? "items-start justify-start" : "items-center justify-center";
  return <div className={`flex h-full w-full flex-col ${a} gap-2 p-3 ${bg}`}>{children}</div>;
}
