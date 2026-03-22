export const INK = "#2a170f";
export const NUM_SECTIONS = 6;

export const SPRING = { type: "spring" as const, stiffness: 300, damping: 30 };

export const slideVariants = {
  enter:  (dir: number) => ({ y: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { y: "0%", opacity: 1 },
  exit:   (dir: number) => ({ y: dir > 0 ? "-100%" : "100%", opacity: 0 }),
};

export const TRI_BL  = "polygon(0 0, 100% 0, 100% 100%)";
export const TRI_R1A = "polygon(50% 0, 100% 0, 100% 100%, 0 100%)";

export const X_SVG = '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>';
