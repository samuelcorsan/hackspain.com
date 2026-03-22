import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import horseRaw    from "../../assets/illustration-horse.svg?raw";
import quixoteRaw  from "../../assets/illustration-quixote.svg?raw";
import sunRaw      from "../../assets/illustration-sun.svg?raw";
import windmillRaw from "../../assets/illustration-windmill.svg?raw";
import logoRaw     from "../../assets/logo.svg?raw";
import googleRaw   from "../../assets/sponsors/google.svg?raw";
import exaLogo     from "../../assets/sponsors/exa.png";
import falLogo     from "../../assets/sponsors/fal.png";
import kfundLogo   from "../../assets/sponsors/kfund.png";
import { InlineSvg }              from "./InlineSvg";
import { MosaicBackground }       from "./MosaicBackground";
import { prepareIllustrationSvg } from "./svg/prepareIllustrationSvg";
import { prepareLogoSvg }         from "./svg/prepareLogoSvg";

const windmillSvg = prepareIllustrationSvg(windmillRaw);
const horseSvg    = prepareIllustrationSvg(horseRaw);
const sunSvg      = prepareIllustrationSvg(sunRaw);
const quixoteSvg  = prepareIllustrationSvg(quixoteRaw);
const logoSvg     = prepareLogoSvg(logoRaw);
const googleSvg   = googleRaw;

const INK = "#2a170f";
const NUM_SECTIONS = 6;

// ── Cell registry ────────────────────────────────────────────────────────────
// Every rectangular polygon region in MosaicBackground.tsx (except illustrations
// and the static "year" cell) is registered here. Coordinates = SVG viewBox 1440×900.
// `clip` avoids the triangle overlay drawn on top of that polygon so content
// never bleeds under a colored triangle corner.
type CellDef = { id: string; x: number; y: number; w: number; h: number; delay: number; clip?: string };

// Triangle overlay mapping (SVG triangle points → clip-path that avoids it):
//
// Triangle (200,0 340,120 200,120) on r1a (200,0,280,120):
//   bottom-left corner, 140px wide on a 280-wide rect → 50% left, full height
//   clip: polygon(50% 0, 100% 0, 100% 100%, 50% 100%)   — but too aggressive;
//   the triangle vertex is at x=340 which is (340-200)/280 = 50% of the cell width.
//   Content safe area = right half → clip avoids the left diagonal.
//
// Triangle (480,0 700,180 480,180) on year (480,0,220,180):
//   full-height left diagonal. Vertex at (700,180) = 100% right, 100% bottom.
//   Content safe = top-right triangle → polygon(100% 0, 100% 100%, 0 0)
//   We use: polygon(0 0, 100% 0, 100% 100%)
//
// Triangle (1300,0 1440,180 1300,180) on r1d (1300,0,140,180):
//   full-height left diagonal → same shape as year.
//
// Triangle (160,120 300,340 160,340) on r2b (160,120,140,220):
//   full-height left diagonal.
//
// Triangle (700,140 880,340 700,340) on r2e (700,140,180,200):
//   full-height left diagonal.
//
// Triangle (1220,180 1440,340 1220,340) on r2h (1220,180,220,160):
//   full-height left diagonal.
//
// Triangle (220,540 480,740 220,740) on r4b (220,540,260,200):
//   full-height left diagonal.
//
// Triangle (1200,560 1440,740 1200,740) on r4e (1200,560,240,180):
//   full-height left diagonal.

const TRI_BL = "polygon(0 0, 100% 0, 100% 100%)";
const TRI_R1A = "polygon(50% 0, 100% 0, 100% 100%, 0 100%)";

const CELLS: CellDef[] = [
  // Row 1 (y 0–180)
  { id: "year", x: 480,  y: 0,   w: 220, h: 180, delay: 0.02 },
  { id: "r1a",  x: 200,  y: 0,   w: 280, h: 120, delay: 0.01, clip: TRI_R1A },
  { id: "r1b",  x: 700,  y: 0,   w: 180, h: 140, delay: 0.03 },
  { id: "r1c",  x: 1140, y: 0,   w: 160, h: 120, delay: 0.05 },
  { id: "r1d",  x: 1300, y: 0,   w: 140, h: 180, delay: 0.02, clip: TRI_BL },

  // Row 2 (y 120–340)
  { id: "r2a",  x: 0,    y: 180, w: 160, h: 160, delay: 0.04 },
  { id: "r2b",  x: 160,  y: 120, w: 140, h: 220, delay: 0.06, clip: TRI_BL },
  { id: "r2c",  x: 300,  y: 180, w: 240, h: 160, delay: 0.03 },
  { id: "r2d",  x: 540,  y: 180, w: 160, h: 160, delay: 0.05 },
  { id: "r2e",  x: 700,  y: 140, w: 180, h: 200, delay: 0.07, clip: TRI_BL },
  { id: "r2f",  x: 880,  y: 180, w: 160, h: 160, delay: 0.02 },
  { id: "r2g",  x: 1040, y: 120, w: 180, h: 220, delay: 0.06 },
  { id: "r2h",  x: 1220, y: 180, w: 220, h: 160, delay: 0.04, clip: TRI_BL },

  // Row 3 (y 340–560) — hero + flanking content
  { id: "r3a",  x: 200,  y: 340, w: 280, h: 200, delay: 0.05 },
  { id: "hero", x: 480,  y: 340, w: 480, h: 220, delay: 0    },
  { id: "r3b",  x: 960,  y: 340, w: 260, h: 200, delay: 0.07 },

  // Row 4 (y 540–740)
  { id: "r4a",  x: 0,    y: 560, w: 220, h: 180, delay: 0.03 },
  { id: "r4b",  x: 220,  y: 540, w: 260, h: 200, delay: 0.06, clip: TRI_BL },
  { id: "r4c",  x: 480,  y: 560, w: 480, h: 180, delay: 0.04 },
  { id: "r4d",  x: 960,  y: 540, w: 240, h: 200, delay: 0.08 },
  { id: "r4e",  x: 1200, y: 560, w: 240, h: 180, delay: 0.05, clip: TRI_BL },

  // Row 5 (y 740–900)
  { id: "r5a",  x: 0,    y: 740, w: 360, h: 160, delay: 0.03 },
  { id: "r5b",  x: 360,  y: 740, w: 360, h: 160, delay: 0.05 },
  { id: "r5c",  x: 720,  y: 740, w: 360, h: 160, delay: 0.07 },
  { id: "r5d",  x: 1080, y: 740, w: 360, h: 160, delay: 0.09 },
];

const ILLS = [
  { x: 0,    y: 0,   w: 200, h: 180, svg: windmillSvg, box: "items-end justify-center",        img: "h-[94%] w-auto" },
  { x: 880,  y: 0,   w: 260, h: 180, svg: sunSvg,      box: "items-center justify-center p-3", img: "h-full w-auto"  },
  { x: 0,    y: 340, w: 200, h: 220, svg: horseSvg,     box: "items-end justify-center",        img: "w-full h-auto"  },
  { x: 1220, y: 340, w: 220, h: 220, svg: quixoteSvg,   box: "items-end justify-center",        img: "h-full w-auto"  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────
function vp(x: number, y: number, w: number, h: number): React.CSSProperties {
  return {
    position: "absolute",
    left:   `${(x / 1440) * 100}%`,
    top:    `${(y / 900)  * 100}%`,
    width:  `${(w / 1440) * 100}%`,
    height: `${(h / 900)  * 100}%`,
  };
}

function P({ bg = "bg-hs-paper", align = "center", children }: {
  bg?: string; align?: "center" | "start"; children: React.ReactNode;
}) {
  const a = align === "start" ? "items-start justify-start" : "items-center justify-center";
  return <div className={`flex h-full w-full flex-col ${a} gap-2 p-3 ${bg}`}>{children}</div>;
}

const SPRING = { type: "spring" as const, stiffness: 300, damping: 30 };

const slideVariants = {
  enter:  (dir: number) => ({ y: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { y: "0%", opacity: 1 },
  exit:   (dir: number) => ({ y: dir > 0 ? "-100%" : "100%", opacity: 0 }),
};

// ── Section content ──────────────────────────────────────────────────────────
// sections[i] = { cellId: ReactNode }
// Cells not listed → transparent (mosaic shows through).
// EVERY section uses a DIFFERENT set of cells. No content is repeated.

function buildSections(): Record<string, React.ReactNode>[] {
  const b = "font-['Bungee']";
  const d = "font-['DM_Sans']";
  const lbl = `${d} text-[0.65rem] font-black tracking-widest uppercase mb-1`;

  return [
    // ── 0: Hero ──────────────────────────────────────────────────────────────
    {
      hero: (
        <P bg="bg-hs-paper">
          <div className="w-full max-w-[380px]">
            <InlineSvg svg={logoSvg} className="w-full h-auto" />
          </div>
        </P>
      ),
      year: (
        <div className="relative h-full w-full">
          <span className={`absolute bottom-[14%] left-[8%] ${b} text-[clamp(2.2rem,5.5vw,4.5rem)] text-white leading-none drop-shadow-sm`}>20</span>
          <span className={`absolute top-[8%] right-[8%] ${b} text-[clamp(2.2rem,5.5vw,4.5rem)] leading-none`} style={{ color: INK }}>26</span>
        </div>
      ),
      r2c: (
        <P bg="bg-hs-gold">
          <span className={`${b} text-[clamp(2.4rem,5vw,4.2rem)] text-hs-ink leading-none`}>+300</span>
          <p className={`mt-1 ${lbl} text-hs-ink`}>PARTICIPANTS</p>
        </P>
      ),
      r3a: (
        <P bg="bg-hs-orange">
          <p className={`${lbl} text-hs-paper/60`}>HACKATHON</p>
          <span className={`${b} text-[clamp(1.3rem,2.8vw,2.2rem)] text-hs-paper leading-tight text-center`}>
            MADRID · JUNE
          </span>
        </P>
      ),
      r2g: (
        <P bg="bg-hs-red">
          <span className={`${b} text-[clamp(2.6rem,5.5vw,4.5rem)] text-hs-paper leading-none`}>24</span>
          <p className={`mt-1 ${lbl} text-hs-paper`}>HOURS</p>
        </P>
      ),
      r5a: (
        <P bg="bg-hs-paper" align="start">
          <p className={`${lbl} text-hs-ink/50`}>FOLLOW US</p>
          <span className={`${d} text-sm font-bold text-hs-ink`}>@hackspain26</span>
        </P>
      ),
      r5c: (
        <P bg="bg-hs-teal">
          <span className={`${d} text-sm font-bold text-white`}>hackspain.com</span>
        </P>
      ),
    },

    // ── 1: Mission ───────────────────────────────────────────────────────────
    {
      hero: (
        <P bg="bg-hs-navy">
          <p className={`${lbl} text-hs-gold`}>MISSION</p>
          <h2 className={`text-center ${b} text-[clamp(1.4rem,3vw,2.8rem)] text-hs-paper leading-tight`}>
            BRING TOGETHER<br />YOUNG, <span className="text-hs-red">TALENTED</span><br />SPANISH CODERS
          </h2>
        </P>
      ),
      r3b: (
        <P bg="bg-hs-paper" align="start">
          <p className={`${lbl} text-hs-ink/40`}>MISSION-DRIVEN</p>
          <p className={`${d} text-sm font-bold text-hs-ink leading-relaxed`}>
            Positioning Spain as a European leader in young tech talent.
          </p>
        </P>
      ),
      r2d: (
        <P bg="bg-hs-ink">
          <p className={`${d} text-sm font-bold text-hs-paper text-center leading-relaxed`}>
            We are fully<br />mission-driven.
          </p>
        </P>
      ),
      r4b: (
        <P bg="bg-hs-teal">
          <p className={`${d} text-sm font-bold text-white text-center leading-relaxed`}>
            24 intense hours of building with Spain's brightest young coders.
          </p>
        </P>
      ),
      r5b: (
        <P bg="bg-hs-paper">
          <span className={`${b} text-sm text-hs-ink/20`}>EST. 2026</span>
        </P>
      ),
      r5d: (
        <P bg="bg-hs-paper">
          <span className={`${b} text-lg text-hs-ink`}>MADRID</span>
        </P>
      ),
    },

    // ── 2: What makes us unique ──────────────────────────────────────────────
    {
      hero: (
        <P bg="bg-hs-sand">
          <p className={`${lbl} text-hs-ink/40`}>HACKSPAIN 2026</p>
          <h2 className={`text-center ${b} text-[clamp(1.4rem,3vw,2.8rem)] text-hs-ink leading-tight`}>
            WHAT MAKES<br />US UNIQUE?
          </h2>
        </P>
      ),
      r3a: (
        <P bg="bg-hs-ink" align="start">
          <p className={`${d} text-sm font-bold text-hs-paper leading-relaxed`}>
            We are fully mission-driven.
          </p>
        </P>
      ),
      r3b: (
        <P bg="bg-hs-navy" align="start">
          <p className={`${lbl} text-hs-gold`}>MEDIA FOCUS</p>
          <p className={`${d} text-sm font-bold text-hs-paper leading-relaxed`}>
            We plan to expand our social media presence.
          </p>
        </P>
      ),
      r2c: (
        <P bg="bg-hs-gold" align="start">
          <p className={`${lbl} text-hs-ink/60`}>AMBASSADORS</p>
          <p className={`${d} text-sm font-bold text-hs-ink leading-relaxed`}>
            From universities and education centres
          </p>
        </P>
      ),
      r2g: (
        <P bg="bg-hs-teal" align="start">
          <p className={`${lbl} text-white/60`}>HIGH-QUALITY CONTENT</p>
          <p className={`${d} text-sm font-bold text-white leading-relaxed`}>
            Focused on telling the stories of the hackers
          </p>
        </P>
      ),
      r4c: (
        <P bg="bg-hs-orange">
          <p className={`${d} text-sm font-bold text-hs-paper text-center leading-relaxed`}>
            Original tracks designed for different skill levels.
          </p>
        </P>
      ),
      r5a: (
        <P bg="bg-hs-paper">
          <span className={`${b} text-lg text-hs-ink/15`}>UNIQUE</span>
        </P>
      ),
      r5c: (
        <P bg="bg-hs-teal">
          <span className={`${b} text-sm text-white/30`}>HACKSPAIN</span>
        </P>
      ),
    },

    // ── 3: Original Tracks ───────────────────────────────────────────────────
    {
      hero: (
        <P bg="bg-hs-teal">
          <p className={`${lbl} text-white/60`}>HACKSPAIN 2026</p>
          <h2 className={`text-center ${b} text-[clamp(1.6rem,3.5vw,3rem)] text-white leading-tight`}>ORIGINAL<br />TRACKS</h2>
        </P>
      ),
      r3a: (
        <P bg="bg-hs-ink" align="start">
          <p className={`${lbl} text-hs-gold`}>ML TRACK</p>
          <p className={`${d} text-sm font-bold text-hs-paper leading-relaxed`}>
            ML challenges using free computing resources
          </p>
        </P>
      ),
      r3b: (
        <P bg="bg-hs-navy" align="start">
          <p className={`${lbl} text-hs-gold`}>NON-TECH TRACK</p>
          <p className={`${d} text-sm font-bold text-hs-paper leading-relaxed`}>
            We'll teach non-technical people how to code high-quality software.
          </p>
        </P>
      ),
      r2e: (
        <P bg="bg-hs-gold">
          <span className={`${b} text-base text-hs-ink`}>FREE COMPUTE</span>
        </P>
      ),
      r4b: (
        <P bg="bg-hs-orange">
          <p className={`${d} text-sm font-bold text-hs-paper text-center leading-relaxed`}>
            Designed for all skill levels — from beginners to experts.
          </p>
        </P>
      ),
      r2f: (
        <P bg="bg-hs-red">
          <span className={`${b} text-base text-hs-paper text-center leading-tight`}>FOR<br />EVERYONE</span>
        </P>
      ),
      r5b: (
        <P bg="bg-hs-paper">
          <span className={`${b} text-sm text-hs-ink/15`}>CODE</span>
        </P>
      ),
      r5d: (
        <P bg="bg-hs-paper">
          <span className={`${b} text-sm text-hs-ink/15`}>BUILD</span>
        </P>
      ),
    },

    // ── 4: Sponsors — one per cell ───────────────────────────────────────────
    {
      hero: (
        <P bg="bg-hs-gold">
          <p className={`${lbl} text-hs-ink/50`}>HACKSPAIN 2026</p>
          <h2 className={`text-center ${b} text-[clamp(1.6rem,3.5vw,3rem)] text-hs-ink leading-tight`}>BACKED BY<br />THE BEST</h2>
        </P>
      ),
      r2c: (
        <P bg="bg-hs-red">
          <InlineSvg svg={googleSvg} className="h-[clamp(1.8rem,4vw,3rem)] w-auto" />
        </P>
      ),
      r2g: (
        <P bg="bg-hs-navy">
          <img src={kfundLogo.src} alt="K Fund" className="h-[clamp(1.8rem,4vw,3rem)] w-auto object-contain brightness-0 invert" />
        </P>
      ),
      r3a: (
        <P bg="bg-hs-teal">
          <img src={falLogo.src} alt="fal.ai" className="h-[clamp(1.8rem,4vw,3rem)] w-auto object-contain brightness-0 invert" />
        </P>
      ),
      r3b: (
        <P bg="bg-hs-orange">
          <img src={exaLogo.src} alt="Exa" className="h-[clamp(1.8rem,4vw,3rem)] w-auto object-contain brightness-0 invert" />
        </P>
      ),
      r4c: (
        <P bg="bg-hs-ink">
          <span className={`${b} text-[clamp(1.4rem,3vw,2.4rem)] text-hs-gold`}>Mozart AI</span>
        </P>
      ),
      r2d: (
        <P bg="bg-hs-paper">
          <p className={`${b} text-[clamp(0.9rem,2vw,1.5rem)] text-hs-ink/40 italic text-center leading-snug`}>and more<br />on the way...</p>
        </P>
      ),
      r4d: (
        <P bg="bg-hs-cream" align="start">
          <p className={`${lbl} text-hs-ink/40`}>PRIZES</p>
          <p className={`${b} text-base text-hs-ink leading-tight`}>Great rewards for the hackers</p>
        </P>
      ),
      r5a: (
        <P bg="bg-hs-gold">
          <span className={`${b} text-sm text-hs-ink/40`}>SPONSORS</span>
        </P>
      ),
      r5c: (
        <P bg="bg-hs-teal">
          <span className={`${d} text-sm font-bold text-white`}>PRIZES & MORE</span>
        </P>
      ),
    },

    // ── 5: Vision + footer ───────────────────────────────────────────────────
    {
      hero: (
        <P bg="bg-hs-red">
          <p className={`${lbl} text-hs-gold`}>LONG-TERM VISION</p>
          <h2 className={`text-center ${b} text-[clamp(1.6rem,3.5vw,3rem)] text-hs-paper leading-tight`}>
            FROM MADRID<br /><span className="text-hs-gold">TO THE WORLD</span>
          </h2>
        </P>
      ),
      r2c: (
        <P bg="bg-hs-orange">
          <span className={`${b} text-[clamp(2rem,4.5vw,3.6rem)] text-hs-paper leading-none`}>5,000</span>
          <p className={`mt-1 ${lbl} text-hs-paper`}>GOAL NEXT YEAR</p>
        </P>
      ),
      r3a: (
        <P bg="bg-hs-ink" align="start">
          <p className={`${d} text-sm font-medium text-hs-paper leading-relaxed`}>
            HackSpain isn't a one-off. It's the cornerstone of a movement positioning Spain as a European tech leader.
          </p>
        </P>
      ),
      r3b: (
        <P bg="bg-hs-red">
          <span className={`${b} text-[clamp(1rem,2.2vw,1.8rem)] text-hs-gold text-center leading-tight`}>
            LARGEST HACKATHON IN EUROPE
          </span>
        </P>
      ),
      r4c: (
        <P bg="bg-hs-navy">
          <p className={`${d} text-sm font-medium text-hs-paper text-center leading-relaxed`}>
            Each edition bigger and more impactful.<br />5,000 participants next year.
          </p>
        </P>
      ),
      r4b: (
        <P bg="bg-hs-gold">
          <p className={`${d} text-sm font-bold text-hs-ink text-center`}>
            The largest hackathon movement in Southern Europe.
          </p>
        </P>
      ),
      r5a: (
        <P bg="bg-hs-paper" align="start">
          <p className={`${lbl} text-hs-ink/50`}>FOLLOW US</p>
          <div className="flex gap-3">
            {["@hackspain26", "hackspain.com"].map(h => (
              <span key={h} className={`${d} text-sm font-bold text-hs-ink underline underline-offset-2`}>{h}</span>
            ))}
          </div>
        </P>
      ),
      r5b: (
        <P bg="bg-hs-paper">
          <p className={`${d} text-sm font-bold tracking-widest text-hs-ink/40 text-center uppercase`}>
            © 2026 HackSpain
          </p>
        </P>
      ),
      r5d: (
        <P bg="bg-hs-paper" align="start">
          <p className={`${lbl} text-hs-ink/50`}>CONTACT</p>
          <span className={`${d} text-sm font-bold text-hs-ink`}>hello@hackspain.com</span>
        </P>
      ),
    },
  ];
}

// ── Main component ────────────────────────────────────────────────────────────
export function LandingPage() {
  const [section, setSection] = useState(0);
  const [dir, setDir] = useState(1);
  const locked = useRef(false);
  const sections = useMemo(buildSections, []);

  const advance = useCallback((d: 1 | -1) => {
    if (locked.current) return;
    locked.current = true;
    setDir(d);
    setSection(s => Math.max(0, Math.min(NUM_SECTIONS - 1, s + d)));
    setTimeout(() => { locked.current = false; }, 700);
  }, []);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) > 5) advance(e.deltaY > 0 ? 1 : -1);
    };
    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      const dy = touchY - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 40) advance(dy > 0 ? 1 : -1);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === " ") { e.preventDefault(); advance(1); }
      if (e.key === "ArrowUp")                     { e.preventDefault(); advance(-1); }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
    };
  }, [advance]);

  const current = sections[section] ?? {};

  return (
    <div className="fixed inset-0" style={{ background: INK }}>
      <MosaicBackground className="absolute inset-0 h-full w-full" />

      {ILLS.map((ill, i) => (
        <div key={i} className={`absolute overflow-hidden flex ${ill.box}`} style={vp(ill.x, ill.y, ill.w, ill.h)}>
          <InlineSvg svg={ill.svg} className={ill.img} />
        </div>
      ))}

      {CELLS.map(cell => (
        <div key={cell.id} className="absolute overflow-hidden" style={{ ...vp(cell.x, cell.y, cell.w, cell.h), ...(cell.clip ? { clipPath: cell.clip } : {}) }}>
          <AnimatePresence mode="popLayout" custom={dir} initial={false}>
            {current[cell.id] && (
              <motion.div
                key={`${cell.id}-${section}`}
                className="absolute inset-0"
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ ...SPRING, delay: cell.delay }}
              >
                {current[cell.id]}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}

      <MosaicBackground className="absolute inset-0 h-full w-full pointer-events-none" strokeOnly />

      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {Array.from({ length: NUM_SECTIONS }, (_, i) => (
          <button
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === section ? "w-6 bg-hs-gold" : "w-2 bg-hs-ink/30"
            }`}
            onClick={() => { setDir(i > section ? 1 : -1); setSection(i); }}
            aria-label={`Go to section ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
