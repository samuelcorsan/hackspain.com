import { motion } from "motion/react";
import { InlineSvg } from "./InlineSvg";
import logoRaw from "../../assets/logo.svg?raw";
import windmillRaw from "../../assets/illustration-windmill.svg?raw";
import horseRaw from "../../assets/illustration-horse.svg?raw";
import sunRaw from "../../assets/illustration-sun.svg?raw";
import quixoteRaw from "../../assets/illustration-quixote.svg?raw";
import sanchoRaw from "../../assets/illustration-sancho.svg?raw";
import { prepareIllustrationSvg } from "./svg/prepareIllustrationSvg";
import { prepareLogoSvg } from "./svg/prepareLogoSvg";

const windmillSvg = prepareIllustrationSvg(windmillRaw);
const horseSvg = prepareIllustrationSvg(horseRaw);
const sunSvg = prepareIllustrationSvg(sunRaw);
const quixoteSvg = prepareIllustrationSvg(quixoteRaw);
const sanchoSvg = prepareIllustrationSvg(sanchoRaw);
const logoSvg = prepareLogoSvg(logoRaw);

function FlipBlock({
  front,
  back,
  className = "",
}: {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`group relative ${className}`} style={{ perspective: "1000px" }}>
      <motion.div
        className="absolute inset-0 h-full w-full transition-transform duration-1000"
        style={{ transformStyle: "preserve-3d" }}
        initial={{ rotateY: 0 }}
        whileInView={{ rotateY: 180 }}
        viewport={{ once: false, margin: "-15%" }}
      >
        <div
          className="absolute inset-0 h-full w-full overflow-hidden border-[4px] border-hs-ink"
          style={{ backfaceVisibility: "hidden" }}
        >
          {front}
        </div>
        <div
          className="absolute inset-0 h-full w-full overflow-hidden border-[4px] border-hs-ink"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {back}
        </div>
      </motion.div>
    </div>
  );
}

function StaticBlock({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden border-[4px] border-hs-ink ${className}`}>
      {children}
    </div>
  );
}

export function MosaicPage() {
  return (
    <div className="min-h-dvh bg-hs-ink p-2 md:p-4">
      <h1 className="sr-only">HACKSPAIN 2026 — Madrid, June</h1>
      
      <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6 md:gap-4 auto-rows-[200px] md:auto-rows-[250px]">
        
        {/* ROW 1 */}
        <StaticBlock className="col-span-1 bg-hs-sand flex items-end justify-center p-4">
          <InlineSvg svg={windmillSvg} className="h-full w-auto object-contain drop-shadow-[0_4px_0_var(--color-hs-ink)]" />
        </StaticBlock>

        <StaticBlock className="col-span-2 md:col-span-2 lg:col-span-4 bg-hs-paper flex flex-col items-center justify-center p-4 md:p-8">
          <div className="w-full max-w-2xl">
            <InlineSvg svg={logoSvg} className="h-full w-full drop-shadow-[0_4px_0_var(--color-hs-ink)]" />
          </div>
          <span
            className="mt-2 block font-['Bungee'] text-[clamp(2.5rem,8vw,5.5rem)] leading-none text-hs-paper drop-shadow-[0_4px_0_var(--color-hs-red)]"
            style={{
              WebkitTextStroke: "4px var(--color-hs-ink)",
              paintOrder: "stroke fill",
            }}
          >
            2026
          </span>
        </StaticBlock>

        <StaticBlock className="col-span-1 bg-hs-orange flex items-center justify-center p-4">
          <InlineSvg svg={sunSvg} className="h-full w-auto object-contain drop-shadow-[0_4px_0_var(--color-hs-ink)]" />
        </StaticBlock>

        {/* ROW 2 */}
        <StaticBlock className="col-span-2 md:col-span-2 lg:col-span-2 bg-hs-teal flex items-center justify-center p-4">
          <InlineSvg svg={horseSvg} className="w-full h-auto object-contain drop-shadow-[0_4px_0_var(--color-hs-ink)]" />
        </StaticBlock>

        <FlipBlock
          className="col-span-2 md:col-span-2 lg:col-span-2"
          front={
            <div className="flex h-full w-full flex-col items-center justify-center bg-hs-red p-6 text-center">
              <span className="font-['DM_Sans'] text-5xl md:text-6xl font-black text-white">+300</span>
              <span className="mt-2 font-['DM_Sans'] text-sm md:text-base font-bold tracking-widest text-hs-ink">PARTICIPANTS</span>
            </div>
          }
          back={
            <div className="flex h-full w-full flex-col items-center justify-center bg-hs-gold p-6 text-center">
              <span className="font-['Bungee'] text-4xl md:text-5xl text-hs-ink">24</span>
              <span className="font-['Bungee'] text-xl md:text-2xl text-hs-ink">HOURS</span>
            </div>
          }
        />

        <StaticBlock className="col-span-2 md:col-span-2 lg:col-span-2 row-span-2 bg-hs-sand flex items-end justify-center p-4">
          <InlineSvg svg={quixoteSvg} className="h-full w-auto object-contain drop-shadow-[0_4px_0_var(--color-hs-ink)]" />
        </StaticBlock>

        {/* ROW 3 */}
        <FlipBlock
          className="col-span-2 md:col-span-2 lg:col-span-2"
          front={
            <img 
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop" 
              className="h-full w-full object-cover grayscale mix-blend-multiply opacity-80 bg-hs-orange"
              alt="Hackers coding"
            />
          }
          back={
            <div className="flex h-full w-full flex-col justify-center bg-hs-paper p-6 md:p-8">
              <h2 className="mb-2 font-['Bungee'] text-2xl md:text-3xl text-hs-ink leading-tight">What makes us unique?</h2>
              <p className="font-['DM_Sans'] text-base md:text-lg font-bold text-hs-red">We are fully mission-driven.</p>
            </div>
          }
        />

        <StaticBlock className="col-span-2 md:col-span-2 lg:col-span-2 bg-hs-cream flex items-end justify-center p-4">
          <InlineSvg svg={sanchoSvg} className="w-full h-auto object-contain drop-shadow-[0_4px_0_var(--color-hs-ink)]" />
        </StaticBlock>

        {/* ROW 4 */}
        <StaticBlock className="col-span-2 md:col-span-4 lg:col-span-4 bg-hs-navy flex flex-col justify-center p-6 md:p-10 text-white">
          <p className="font-['DM_Sans'] text-sm md:text-base font-black tracking-widest text-hs-gold mb-2">MISSION</p>
          <p className="font-['Bungee'] text-2xl md:text-4xl leading-tight">BRING TOGETHER YOUNG, <span className="text-hs-red">TALENTED</span> SPANISH CODERS</p>
        </StaticBlock>

        <FlipBlock
          className="col-span-2 md:col-span-2 lg:col-span-2"
          front={
            <div className="flex h-full w-full flex-col justify-center bg-hs-orange p-6 md:p-8">
              <h2 className="mb-4 font-['Bungee'] text-2xl md:text-3xl text-hs-ink leading-tight">MEDIA FOCUS</h2>
              <ul className="list-disc pl-5 font-['DM_Sans'] text-sm md:text-base font-bold text-hs-ink space-y-2">
                <li>Ambassadors from universities</li>
                <li>High-quality content telling hacker stories</li>
              </ul>
            </div>
          }
          back={
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop" 
              className="h-full w-full object-cover grayscale mix-blend-multiply opacity-80 bg-hs-teal"
              alt="Team collaboration"
            />
          }
        />

        {/* ROW 5 */}
        <StaticBlock className="col-span-2 md:col-span-2 lg:col-span-3 bg-hs-teal flex flex-col justify-center p-6 md:p-8 text-white">
          <h2 className="mb-4 font-['Bungee'] text-2xl md:text-3xl leading-tight">ORIGINAL TRACKS</h2>
          <div className="space-y-4 font-['DM_Sans'] text-sm md:text-base font-medium">
            <div>
              <strong className="text-hs-gold">ML Track:</strong> ML challenges using free computing resources
            </div>
            <div>
              <strong className="text-hs-gold">Non-tech track:</strong> We'll teach non-technical people how to code high-quality software.
            </div>
          </div>
        </StaticBlock>

        <StaticBlock className="col-span-2 md:col-span-2 lg:col-span-3 bg-hs-gold flex flex-col justify-center p-6 md:p-8 text-hs-ink">
          <h2 className="mb-4 font-['Bungee'] text-2xl md:text-3xl leading-tight">Backed by the best</h2>
          <p className="font-['DM_Sans'] text-sm md:text-base font-bold mb-4">Thanks to our sponsors, we'll be able to offer great prizes and a rewarding experience.</p>
          <p className="font-['Bungee'] text-lg text-hs-red">Google • K Fund • fal.ai • Exa • Mozart AI</p>
          <p className="font-['DM_Sans'] text-xs font-bold mt-2 opacity-70">...and more are on the way!</p>
        </StaticBlock>

        {/* ROW 6 */}
        <StaticBlock className="col-span-2 md:col-span-4 lg:col-span-6 bg-hs-paper flex flex-col items-center justify-center p-8 md:p-12 text-center">
          <h2 className="mb-2 font-['Bungee'] text-3xl md:text-5xl text-hs-ink leading-tight">Our long-term vision</h2>
          <h3 className="mb-6 font-['DM_Sans'] text-xl md:text-2xl font-black tracking-tight text-hs-red">From Madrid to the World</h3>
          <p className="max-w-3xl font-['DM_Sans'] text-base md:text-lg font-medium text-hs-ink leading-relaxed">
            HackSpain isn't just a one-off event. It's the cornerstone of a movement that aims to position Spain as a European leader in young tech talent.
            <br/><br/>
            Each edition will be bigger and more impactful. We aim to reach 5,000 participants next year, making it the largest hackathon in Europe.
          </p>
        </StaticBlock>

      </div>
    </div>
  );
}
