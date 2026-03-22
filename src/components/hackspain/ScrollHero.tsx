import horseRaw from "../../assets/illustration-horse.svg?raw";
import sunRaw from "../../assets/illustration-sun.svg?raw";
import windmillRaw from "../../assets/illustration-windmill.svg?raw";
import quixoteRaw from "../../assets/illustration-quixote.svg?raw";
import sanchoRaw from "../../assets/illustration-sancho.svg?raw";
import logoRaw from "../../assets/logo.svg?raw";
import { Hills } from "./Hills";
import { InlineSvg } from "./InlineSvg";
import { MosaicBackground } from "./MosaicBackground";
import { prepareIllustrationSvg } from "./svg/prepareIllustrationSvg";
import { prepareLogoSvg } from "./svg/prepareLogoSvg";

const windmillSvg = prepareIllustrationSvg(windmillRaw);
const horseSvg = prepareIllustrationSvg(horseRaw);
const sunSvg = prepareIllustrationSvg(sunRaw);
const quixoteSvg = prepareIllustrationSvg(quixoteRaw);
const sanchoSvg = prepareIllustrationSvg(sanchoRaw);
const logoSvg = prepareLogoSvg(logoRaw);

export function ScrollHero() {
  return (
    <div className="relative h-[400vh]" id="hero-scroll-container">
      <div className="sticky top-0 h-dvh overflow-hidden">
        <section
          className="relative flex h-full w-full items-center justify-center overflow-hidden bg-hs-paper"
          aria-labelledby="hackspain-hero-heading"
        >
          <h1 id="hackspain-hero-heading" className="sr-only">
            HACKSPAIN 2026 — Madrid, June
          </h1>

          {/* Layer 0: mosaic background */}
          <MosaicBackground className="absolute inset-0 h-full w-full" />

          {/* Layer 1: hills at the very bottom, covering ~35% height */}
          <div className="absolute inset-x-0 bottom-0 z-1 h-[38%] origin-bottom" data-hero-hills>
            <Hills className="h-full w-full" />
          </div>

          {/* Layer 2: illustrations baked into the scene */}
          <div className="absolute left-[2%] bottom-[32%] z-2 w-[clamp(8rem,22vw,16rem)] md:left-[4%] md:bottom-[35%]">
            <InlineSvg svg={windmillSvg} className="h-auto w-full" />
          </div>

          <div className="absolute right-[4%] top-[4%] z-2 w-[clamp(6rem,16vw,12rem)] md:right-[6%] md:top-[6%]">
            <InlineSvg svg={sunSvg} className="h-auto w-full" />
          </div>

          <div className="absolute right-[4%] bottom-[28%] z-2 w-[clamp(8rem,20vw,15rem)] md:right-[6%] md:bottom-[30%]">
            <InlineSvg svg={quixoteSvg} className="h-auto w-full" />
          </div>

          <div className="absolute bottom-[6%] left-[2%] z-3 w-[clamp(12rem,34vw,26rem)] md:bottom-[8%] md:left-[4%]">
            <InlineSvg svg={horseSvg} className="h-auto w-full" />
          </div>

          <div className="absolute bottom-[2%] right-[2%] z-3 w-[clamp(10rem,28vw,20rem)] md:bottom-[4%] md:right-[4%]">
            <InlineSvg svg={sanchoSvg} className="h-auto w-full" />
          </div>

          {/* Layer 4: center content */}
          <div className="relative z-5 flex flex-col items-center px-4 pb-8">
            {/* Logo */}
            <div className="aspect-242/72 w-full max-w-[min(90vw,600px)]">
              <InlineSvg svg={logoSvg} className="h-full w-full drop-shadow-[0_4px_0_var(--color-hs-ink)]" />
            </div>

            {/* Year */}
            <span
              className="mt-2 block font-['Bungee'] text-[clamp(3rem,12vw,6.5rem)] leading-none text-white drop-shadow-[0_6px_0_var(--color-hs-red)]"
              style={{
                WebkitTextStroke: "6px var(--color-hs-ink)",
                paintOrder: "stroke fill",
              }}
            >
              2026
            </span>

            {/* Scroll-animated area */}
            <div className="relative mt-4 flex min-h-24 items-start justify-center">
              {/* Phase 1: MADRID, JUNE + 300 PARTICIPANTS */}
              <div data-hero-phase="1" className="flex flex-col items-center gap-4">
                <div className="rounded-full bg-hs-ink px-8 py-2.5">
                  <p className="font-['DM_Sans'] text-[0.75rem] font-extrabold tracking-[0.22em] text-white sm:text-sm">
                    MADRID, JUNE
                  </p>
                </div>
                <div className="flex items-stretch overflow-hidden border-[4px] border-hs-ink bg-hs-paper shadow-[6px_6px_0_var(--color-hs-ink)]">
                  <div className="flex items-center border-r-[4px] border-hs-ink bg-hs-gold px-5 py-3">
                    <span className="font-['DM_Sans'] text-2xl font-black tracking-tight text-hs-ink sm:text-3xl">
                      +300
                    </span>
                  </div>
                  <div className="flex items-center bg-hs-sand px-4 py-3">
                    <span className="font-['DM_Sans'] text-[0.65rem] font-black tracking-[0.16em] text-hs-ink sm:text-xs">
                      PARTICIPANTS
                    </span>
                  </div>
                </div>
              </div>

              {/* Phase 2: 24 HOURS */}
              <div data-hero-phase="2" className="absolute inset-x-0 flex flex-col items-center gap-3 opacity-0">
                <div className="flex items-stretch overflow-hidden border-[4px] border-hs-ink shadow-[6px_6px_0_var(--color-hs-ink)]">
                  <div className="flex items-center border-r-[4px] border-hs-ink bg-hs-red px-6 py-3.5">
                    <span className="font-['Bungee'] text-3xl text-hs-paper sm:text-4xl">24</span>
                  </div>
                  <div className="flex items-center bg-hs-orange px-5 py-3.5">
                    <span className="font-['Bungee'] text-lg text-hs-paper sm:text-xl">HOURS</span>
                  </div>
                </div>
                <div className="border-[4px] border-hs-ink bg-hs-gold px-5 py-2.5 shadow-[6px_6px_0_var(--color-hs-ink)]">
                  <span className="font-['DM_Sans'] text-[0.6rem] font-black tracking-[0.12em] text-hs-ink sm:text-xs">
                    8-HOUR PARALLEL TRACK (NON-TECHNICAL)
                  </span>
                </div>
              </div>

              {/* Phase 3: MISSION */}
              <div data-hero-phase="3" className="absolute inset-x-0 flex max-w-[min(88vw,36rem)] flex-col items-center gap-2 opacity-0">
                <p className="font-['DM_Sans'] text-[0.65rem] font-black tracking-[0.2em] text-hs-ink sm:text-xs">
                  MISSION
                </p>
                <p className="text-center font-['Bungee'] text-xl leading-snug text-hs-ink drop-shadow-[0_2px_0_var(--color-hs-paper)] sm:text-2xl md:text-3xl">
                  BRING TOGETHER YOUNG,{" "}
                  <span className="text-hs-red">TALENTED</span>{" "}
                  SPANISH CODERS
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
