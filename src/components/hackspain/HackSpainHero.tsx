import horseRaw from "../../assets/illustration-horse.svg?raw";
import sunRaw from "../../assets/illustration-sun.svg?raw";
import windmillRaw from "../../assets/illustration-windmill.svg?raw";
import { DonQuixote } from "./DonQuixote";
import { Hills } from "./Hills";
import { InlineSvg } from "./InlineSvg";
import { LogoGroup } from "./LogoGroup";
import { MosaicBackground } from "./MosaicBackground";
import { NetworkNodes } from "./NetworkNodes";
import { PosterOverlay } from "./PosterOverlay";
import { SanchoLaptop } from "./SanchoLaptop";
import { StatsCard } from "./StatsCard";
import { prepareIllustrationSvg } from "./svg/prepareIllustrationSvg";

const windmillSvg = prepareIllustrationSvg(windmillRaw);
const horseSvg = prepareIllustrationSvg(horseRaw);
const sunSvg = prepareIllustrationSvg(sunRaw);

type Props = {
  posterSrc?: string;
};

export function HackSpainHero({ posterSrc }: Props = {}) {
  return (
    <section
      className="relative isolate flex min-h-dvh flex-col overflow-hidden bg-hs-ink"
      aria-labelledby="hackspain-hero-heading"
    >
      <h1 id="hackspain-hero-heading" className="sr-only">
        HACKSPAIN 2026 — Madrid, June
      </h1>
      <MosaicBackground className="absolute inset-0 h-full w-full" />
      {posterSrc ? (
        <PosterOverlay
          src={posterSrc}
          className="absolute inset-0 h-full w-full object-cover"
          blend="multiply"
          opacity={0.35}
        />
      ) : null}
      <div className="pointer-events-none absolute inset-0 hs-grain mix-blend-multiply opacity-[0.85]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_26%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.14)_50%,rgba(0,0,0,0.48)_100%)]" />

      <div className="absolute bottom-[11%] left-0 right-0 z-1 md:bottom-[9%]">
        <Hills className="h-auto w-full" />
      </div>

      <div className="absolute left-[0.5%] top-[4%] z-2 hidden aspect-square w-[min(42vw,17rem)] max-w-[40vw] md:block md:left-[3%] md:w-[min(36vw,19rem)] md:max-w-none lg:left-[5%] lg:w-80">
        <InlineSvg
          svg={windmillSvg}
          className="h-full w-full drop-shadow-[5px_5px_0_rgba(0,0,0,0.85)]"
        />
      </div>
      <NetworkNodes className="absolute bottom-[22%] left-[2%] z-2 hidden w-32 opacity-90 md:block lg:bottom-[24%] lg:left-[4%] lg:w-40" />
      <div className="absolute right-[4%] top-[2%] z-2 aspect-square w-[min(30vw,10rem)] sm:right-[6%] sm:w-[min(28vw,11rem)] md:right-[8%] md:w-40 lg:w-44">
        <InlineSvg svg={sunSvg} className="h-full w-full drop-shadow-[4px_4px_0_rgba(0,0,0,0.8)]" />
      </div>
      <DonQuixote className="absolute right-[0.5%] top-[14%] z-2 hidden h-[min(42vw,15rem)] w-[min(36vw,12rem)] md:block lg:right-[3%] lg:h-52 lg:w-44" />
      <div className="absolute bottom-[10%] left-[1%] z-3 hidden aspect-232/200 w-[min(72vw,24rem)] max-w-[min(92vw,28rem)] md:block md:left-[3%] lg:bottom-[11%] lg:left-[5%] lg:w-md">
        <InlineSvg
          svg={horseSvg}
          className="h-full w-full drop-shadow-[5px_5px_0_rgba(0,0,0,0.82)]"
        />
      </div>
      <SanchoLaptop className="absolute bottom-[12%] right-[0.5%] z-3 hidden w-[min(48vw,15rem)] md:block md:right-[3%] lg:bottom-[13%] lg:right-[4%] lg:w-70" />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-3 pb-32 pt-12 md:px-6 md:pb-36 md:pt-14">
        <LogoGroup />
      </div>

      <div className="absolute bottom-6 left-0 right-0 z-20 md:bottom-10">
        <StatsCard />
      </div>
    </section>
  );
}
