import { InlineSvg } from "./InlineSvg";
import { P } from "./Panel";
import { INK, X_SVG } from "./constants";
import { logoSvg, googleSvg, exaLogo, falLogo, kfundLogo } from "./assets";

const B   = "font-['Bungee']";
const D   = "font-['DM_Sans']";
const LBL = `${D} text-xs font-black tracking-widest uppercase mb-1`;

const BOTTOM_CELLS = ["r5a", "r5b", "r5c", "r5d"] as const;

function bottomRow(sectionIdx: number): Record<string, React.ReactNode> {
  const copy = (
    <P bg="bg-hs-paper">
      <p className={`${D} text-sm font-bold tracking-widest text-hs-ink/40 text-center uppercase`}>© 2026 HackSpain</p>
    </P>
  );

  const actions: React.ReactNode[] = [
    <P bg="bg-hs-paper">
      <a href="https://x.com/hackspain26" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-hs-ink">
        <span className="h-5 w-5 shrink-0" dangerouslySetInnerHTML={{ __html: X_SVG }} />
        <span className={`${D} text-base font-bold`}>@hackspain26</span>
      </a>
    </P>,
    <P bg="bg-hs-paper">
      <p className={`${D} text-base font-bold text-hs-ink text-center`}>
        Made with ♥ by{' '}
        <a href="https://x.com/mrloldev" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Leo</a>
      </p>
    </P>,
    <P bg="bg-hs-paper">
      <a href="https://github.com/hackspain" target="_blank" rel="noopener noreferrer" className={`${D} text-base font-bold text-hs-ink underline underline-offset-2`}>
        Check this code →
      </a>
    </P>,
    <P bg="bg-hs-paper">
      <a href="mailto:leo@hackspain.com" className={`${D} text-base font-bold text-hs-ink underline underline-offset-2`}>
        leo@hackspain.com
      </a>
    </P>,
  ];

  const i = sectionIdx % 4;
  const actionCell = BOTTOM_CELLS[i];
  const copyCell   = BOTTOM_CELLS[(i + 2) % 4];

  return { [actionCell]: actions[i], [copyCell]: copy };
}

export function buildSections(): Record<string, React.ReactNode>[] {
  return [
    // 0: Hero
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
          <span className={`absolute bottom-[14%] left-[8%] ${B} text-[clamp(2.2rem,5.5vw,4.5rem)] text-white leading-none drop-shadow-sm`}>20</span>
          <span className={`absolute top-[8%] right-[8%] ${B} text-[clamp(2.2rem,5.5vw,4.5rem)] leading-none`} style={{ color: INK }}>26</span>
        </div>
      ),
      r2c: (
        <P bg="bg-hs-gold">
          <span className={`${B} text-[clamp(2.4rem,5vw,4.2rem)] text-hs-ink leading-none`}>+300</span>
          <p className={`mt-1 ${LBL} text-hs-ink`}>PARTICIPANTS</p>
        </P>
      ),
      r3a: (
        <P bg="bg-hs-orange">
          <p className={`${LBL} text-hs-paper/60`}>HACKATHON</p>
          <span className={`${B} text-[clamp(1.3rem,2.8vw,2.2rem)] text-hs-paper leading-tight text-center`}>
            MADRID · JUNE
          </span>
        </P>
      ),
      r2g: (
        <P bg="bg-hs-red">
          <span className={`${B} text-[clamp(2.6rem,5.5vw,4.5rem)] text-hs-paper leading-none`}>24</span>
          <p className={`mt-1 ${LBL} text-hs-paper`}>HOURS</p>
        </P>
      ),
      ...bottomRow(0),
    },

    // 1: Mission
    {
      hero: (
        <P bg="bg-hs-navy">
          <p className={`${LBL} text-hs-gold`}>MISSION</p>
          <h2 className={`text-center ${B} text-[clamp(1.4rem,3vw,2.8rem)] text-hs-paper leading-tight`}>
            BRING TOGETHER<br />YOUNG, <span className="text-hs-red">TALENTED</span><br />SPANISH CODERS
          </h2>
        </P>
      ),
      r3b: (
        <P bg="bg-hs-paper" align="start">
          <p className={`${LBL} text-hs-ink/40`}>MISSION-DRIVEN</p>
          <p className={`${D} text-base font-bold text-hs-ink leading-relaxed`}>
            Positioning Spain as a European leader in young tech talent.
          </p>
        </P>
      ),
      r2d: (
        <P bg="bg-hs-ink">
          <p className={`${D} text-base font-bold text-hs-paper text-center leading-relaxed`}>
            We are fully<br />mission-driven.
          </p>
        </P>
      ),
      r4b: (
        <P bg="bg-hs-teal">
          <p className={`${D} text-base font-bold text-white text-center leading-relaxed`}>
            24 intense hours of building with Spain's brightest young coders.
          </p>
        </P>
      ),
      ...bottomRow(1),
    },

    // 2: What makes us unique
    {
      hero: (
        <P bg="bg-hs-sand">
          <p className={`${LBL} text-hs-ink/40`}>HACKSPAIN 2026</p>
          <h2 className={`text-center ${B} text-[clamp(1.4rem,3vw,2.8rem)] text-hs-ink leading-tight`}>
            WHAT MAKES<br />US UNIQUE?
          </h2>
        </P>
      ),
      r3a: (
        <P bg="bg-hs-ink" align="start">
          <p className={`${D} text-base font-bold text-hs-paper leading-relaxed`}>
            We are fully mission-driven.
          </p>
        </P>
      ),
      r3b: (
        <P bg="bg-hs-navy" align="start">
          <p className={`${LBL} text-hs-gold`}>MEDIA FOCUS</p>
          <p className={`${D} text-base font-bold text-hs-paper leading-relaxed`}>
            We plan to expand our social media presence.
          </p>
        </P>
      ),
      r2c: (
        <P bg="bg-hs-gold" align="start">
          <p className={`${LBL} text-hs-ink/60`}>AMBASSADORS</p>
          <p className={`${D} text-base font-bold text-hs-ink leading-relaxed`}>
            From universities and education centres
          </p>
        </P>
      ),
      r2g: (
        <P bg="bg-hs-teal" align="start">
          <p className={`${LBL} text-white/60`}>HIGH-QUALITY CONTENT</p>
          <p className={`${D} text-base font-bold text-white leading-relaxed`}>
            Focused on telling the stories of the hackers
          </p>
        </P>
      ),
      r4c: (
        <P bg="bg-hs-orange">
          <p className={`${D} text-base font-bold text-hs-paper text-center leading-relaxed`}>
            Original tracks designed for different skill levels.
          </p>
        </P>
      ),
      ...bottomRow(2),
    },

    // 3: Original Tracks
    {
      hero: (
        <P bg="bg-hs-teal">
          <p className={`${LBL} text-white/60`}>HACKSPAIN 2026</p>
          <h2 className={`text-center ${B} text-[clamp(1.6rem,3.5vw,3rem)] text-white leading-tight`}>ORIGINAL<br />TRACKS</h2>
        </P>
      ),
      r3a: (
        <P bg="bg-hs-ink" align="start">
          <p className={`${LBL} text-hs-gold`}>ML TRACK</p>
          <p className={`${D} text-base font-bold text-hs-paper leading-relaxed`}>
            ML challenges using free computing resources
          </p>
        </P>
      ),
      r3b: (
        <P bg="bg-hs-navy" align="start">
          <p className={`${LBL} text-hs-gold`}>NON-TECH TRACK</p>
          <p className={`${D} text-base font-bold text-hs-paper leading-relaxed`}>
            We'll teach non-technical people how to code high-quality software.
          </p>
        </P>
      ),
      r2e: (
        <P bg="bg-hs-gold">
          <span className={`${B} text-lg text-hs-ink`}>FREE COMPUTE</span>
        </P>
      ),
      r4b: (
        <P bg="bg-hs-orange">
          <p className={`${D} text-base font-bold text-hs-paper text-center leading-relaxed`}>
            Designed for all skill levels — from beginners to experts.
          </p>
        </P>
      ),
      r2f: (
        <P bg="bg-hs-red">
          <span className={`${B} text-lg text-hs-paper text-center leading-tight`}>FOR<br />EVERYONE</span>
        </P>
      ),
      ...bottomRow(3),
    },

    // 4: Sponsors
    {
      hero: (
        <P bg="bg-hs-gold">
          <p className={`${LBL} text-hs-ink/50`}>HACKSPAIN 2026</p>
          <h2 className={`text-center ${B} text-[clamp(1.6rem,3.5vw,3rem)] text-hs-ink leading-tight`}>BACKED BY<br />THE BEST</h2>
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
          <span className={`${B} text-[clamp(1.4rem,3vw,2.4rem)] text-hs-gold`}>Mozart AI</span>
        </P>
      ),
      r2d: (
        <P bg="bg-hs-paper">
          <p className={`${B} text-[clamp(0.9rem,2vw,1.5rem)] text-hs-ink/40 italic text-center leading-snug`}>and more<br />on the way...</p>
        </P>
      ),
      r4d: (
        <P bg="bg-hs-cream" align="start">
          <p className={`${LBL} text-hs-ink/40`}>PRIZES</p>
          <p className={`${B} text-lg text-hs-ink leading-tight`}>Great rewards for the hackers</p>
        </P>
      ),
      ...bottomRow(4),
    },

    // 5: Vision
    {
      hero: (
        <P bg="bg-hs-red">
          <p className={`${LBL} text-hs-gold`}>LONG-TERM VISION</p>
          <h2 className={`text-center ${B} text-[clamp(1.6rem,3.5vw,3rem)] text-hs-paper leading-tight`}>
            FROM MADRID<br /><span className="text-hs-gold">TO THE WORLD</span>
          </h2>
        </P>
      ),
      r2c: (
        <P bg="bg-hs-orange">
          <span className={`${B} text-[clamp(2rem,4.5vw,3.6rem)] text-hs-paper leading-none`}>5,000</span>
          <p className={`mt-1 ${LBL} text-hs-paper`}>GOAL NEXT YEAR</p>
        </P>
      ),
      r3a: (
        <P bg="bg-hs-ink" align="start">
          <p className={`${D} text-base font-medium text-hs-paper leading-relaxed`}>
            HackSpain isn't a one-off. It's the cornerstone of a movement positioning Spain as a European tech leader.
          </p>
        </P>
      ),
      r3b: (
        <P bg="bg-hs-red">
          <span className={`${B} text-[clamp(1rem,2.2vw,1.8rem)] text-hs-gold text-center leading-tight`}>
            LARGEST HACKATHON IN EUROPE
          </span>
        </P>
      ),
      r4c: (
        <P bg="bg-hs-navy">
          <p className={`${D} text-base font-medium text-hs-paper text-center leading-relaxed`}>
            Each edition bigger and more impactful.<br />5,000 participants next year.
          </p>
        </P>
      ),
      r4b: (
        <P bg="bg-hs-gold">
          <p className={`${D} text-base font-bold text-hs-ink text-center`}>
            The largest hackathon movement in Southern Europe.
          </p>
        </P>
      ),
      ...bottomRow(5),
    },
  ];
}
