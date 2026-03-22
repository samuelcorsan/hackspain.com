import horseRaw    from "../../assets/illustration-horse.svg?raw";
import quixoteRaw  from "../../assets/illustration-quixote.svg?raw";
import sunRaw      from "../../assets/illustration-sun.svg?raw";
import windmillRaw from "../../assets/illustration-windmill.svg?raw";
import logoRaw     from "../../assets/logo.svg?raw";
import googleRaw   from "../../assets/sponsors/google.svg?raw";
import exaPng      from "../../assets/sponsors/exa.png";
import falPng      from "../../assets/sponsors/fal.png";
import kfundPng    from "../../assets/sponsors/kfund.png";
import { prepareIllustrationSvg } from "./svg/prepareIllustrationSvg";
import { prepareLogoSvg }         from "./svg/prepareLogoSvg";

export const windmillSvg = prepareIllustrationSvg(windmillRaw);
export const horseSvg    = prepareIllustrationSvg(horseRaw);
export const sunSvg      = prepareIllustrationSvg(sunRaw);
export const quixoteSvg  = prepareIllustrationSvg(quixoteRaw);
export const logoSvg     = prepareLogoSvg(logoRaw);
export const googleSvg   = googleRaw;

export const exaLogo   = exaPng;
export const falLogo   = falPng;
export const kfundLogo = kfundPng;

export type IllDef = {
  x: number; y: number; w: number; h: number;
  svg: string; box: string; img: string;
};

export const ILLS: IllDef[] = [
  { x: 0,    y: 0,   w: 200, h: 180, svg: windmillSvg, box: "items-end justify-center",        img: "h-[94%] w-auto" },
  { x: 1030, y: 0,   w: 200, h: 180, svg: sunSvg,      box: "items-center justify-center p-3", img: "h-full w-auto"  },
  { x: 0,    y: 340, w: 200, h: 220, svg: horseSvg,     box: "items-end justify-center",        img: "w-full h-auto"  },
  { x: 1220, y: 340, w: 220, h: 220, svg: quixoteSvg,   box: "items-end justify-center",        img: "h-full w-auto"  },
];
