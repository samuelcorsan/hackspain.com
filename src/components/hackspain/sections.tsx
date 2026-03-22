import type { Locale } from "../../i18n/locales";
import { getCopy } from "../../i18n/copy";
import { InlineSvg } from "./InlineSvg";
import { ParticipantsCountUp } from "./ParticipantsCountUp";
import { P } from "./Panel";
import { X_SVG } from "./constants";
import { logoSvg, googleSvg, exaLogo, falLogo, kfundLogo } from "./assets";

const B = "font-bungee";
const D = "font-sans";
const LBL = `${D} text-xs font-black tracking-widest uppercase mb-1`;

const BOTTOM_CELLS = ["r5a", "r5b", "r5c", "r5d"] as const;

function brLines(s: string) {
  const lines = s.split("\n");
  return lines.map((line, i) => (
    <span key={i}>
      {i > 0 ? <br /> : null}
      {line}
    </span>
  ));
}

function bottomRow(sectionIdx: number, c: ReturnType<typeof getCopy>): Record<string, React.ReactNode> {
  const copyEl = (
    <P bg="bg-hs-paper">
      <p className={`${D} text-sm font-bold tracking-widest text-hs-ink/40 text-center uppercase`}>{c.copyright}</p>
    </P>
  );

  const actions: React.ReactNode[] = [
    <P bg="bg-hs-paper">
      <a href="https://x.com/hackspain26" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-hs-ink">
        <span className="h-5 w-5 shrink-0" dangerouslySetInnerHTML={{ __html: X_SVG }} />
        <span className={`${D} text-base font-bold`}>{c.bottomFollow}</span>
      </a>
    </P>,
    <P bg="bg-hs-paper">
      <p className={`${D} text-base font-bold text-hs-ink text-center`}>
        {c.bottomMade}{" "}
        <a href="https://x.com/mrloldev" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
          {c.bottomMadeLeo}
        </a>
      </p>
    </P>,
    <P bg="bg-hs-paper">
      <a href="https://github.com/hackspain" target="_blank" rel="noopener noreferrer" className={`${D} text-base font-bold text-hs-ink underline underline-offset-2`}>
        {c.bottomCode}
      </a>
    </P>,
    <P bg="bg-hs-paper">
      <a href="mailto:leo@hackspain.com" className={`${D} text-base font-bold text-hs-ink underline underline-offset-2`}>
        {c.bottomEmail}
      </a>
    </P>,
  ];

  const i = sectionIdx % 4;
  const actionCell = BOTTOM_CELLS[i];
  const copyCell = BOTTOM_CELLS[(i + 2) % 4];

  return { [actionCell]: actions[i], [copyCell]: copyEl };
}

export function buildSections(locale: Locale): Record<string, React.ReactNode>[] {
  const c = getCopy(locale);
  const gEx = locale === "es" ? "hackathon España Google, hackathon Spain" : "Google sponsor hackathon Madrid and Spain";
  const kEx = locale === "es" ? "inversión hackathon España" : "venture capital sponsor hackathon Spain";
  const fEx = locale === "es" ? "IA hackathon Madrid" : "AI infrastructure hackathon Spain";
  const eEx = locale === "es" ? "búsqueda hackathon España" : "search hackathon Spain";
  const mSr = c.s4.mozartSr;

  return [
    {
      hero: (
        <P bg="bg-hs-paper">
          <div className="w-full max-w-[380px]">
            <InlineSvg svg={logoSvg} className="w-full h-auto" label={c.logoAria} />
          </div>
        </P>
      ),
      year: (
        <div className="relative h-full w-full">
          <span className={`absolute bottom-[14%] left-[8%] ${B} text-[clamp(2.2rem,5.5vw,4.5rem)] text-hs-ink leading-none`}>20</span>
          <span className={`absolute top-[8%] right-[8%] ${B} text-[clamp(2.2rem,5.5vw,4.5rem)] text-white leading-none drop-shadow-sm`}>26</span>
        </div>
      ),
      r2c: (
        <P bg="bg-hs-gold">
          <ParticipantsCountUp
            ariaLabel={`+300 ${c.s0.participants}`}
            className={`${B} text-[clamp(2.4rem,5vw,4.2rem)] text-hs-ink leading-none`}
          />
          <p className={`mt-1 ${LBL} text-hs-ink`}>{c.s0.participants}</p>
        </P>
      ),
      r3a: (
        <P bg="bg-hs-orange">
          <p className={`${LBL} text-hs-paper/60`}>{c.s0.hackathon}</p>
          <span className={`${B} text-[clamp(1.3rem,2.8vw,2.2rem)] text-hs-paper leading-tight text-center`}>{c.s0.madrid}</span>
        </P>
      ),
      r2g: (
        <P bg="bg-hs-red">
          <span className={`${B} text-[clamp(2.6rem,5.5vw,4.5rem)] text-hs-paper leading-none`}>24</span>
          <p className={`mt-1 ${LBL} text-hs-paper`}>{c.s0.hours}</p>
        </P>
      ),
      ...bottomRow(0, c),
    },
    {
      hero: (
        <P bg="bg-hs-navy">
          <p className={`${LBL} text-hs-gold`}>{c.s1.label}</p>
          <h2 className={`text-center ${B} text-[clamp(1.4rem,3vw,2.8rem)] text-hs-paper leading-tight`}>
            {c.s1.l1}
            <br />
            {c.s1.l2}
            <span className="text-hs-red">{c.s1.l3}</span>
            <br />
            {c.s1.l4}
          </h2>
        </P>
      ),
      r3b: (
        <P bg="bg-hs-paper" align="start">
          <p className={`${LBL} text-hs-ink/40`}>{c.s1.drivenLbl}</p>
          <p className={`${D} text-base font-bold text-hs-ink leading-relaxed`}>{c.s1.drivenBody}</p>
        </P>
      ),
      r2d: (
        <P bg="bg-hs-ink">
          <p className={`${D} text-base font-bold text-hs-paper text-center leading-relaxed`}>{brLines(c.s1.fullMission)}</p>
        </P>
      ),
      r4b: (
        <P bg="bg-hs-teal">
          <p className={`${D} text-base font-bold text-white text-center leading-relaxed`}>{c.s1.tealBody}</p>
        </P>
      ),
      ...bottomRow(1, c),
    },
    {
      hero: (
        <P bg="bg-hs-sand">
          <p className={`${LBL} text-hs-ink/40`}>{c.s2.label}</p>
          <h2 className={`text-center ${B} text-[clamp(1.4rem,3vw,2.8rem)] text-hs-ink leading-tight`}>{brLines(c.s2.title)}</h2>
        </P>
      ),
      r3a: (
        <P bg="bg-hs-ink" align="start">
          <p className={`${D} text-base font-bold text-hs-paper leading-relaxed`}>{c.s2.unique1}</p>
        </P>
      ),
      r3b: (
        <P bg="bg-hs-navy" align="start">
          <p className={`${LBL} text-hs-gold`}>{c.s2.mediaLbl}</p>
          <p className={`${D} text-base font-bold text-hs-paper leading-relaxed`}>{c.s2.mediaBody}</p>
        </P>
      ),
      r2c: (
        <P bg="bg-hs-gold" align="start">
          <p className={`${LBL} text-hs-ink/60`}>{c.s2.ambLbl}</p>
          <p className={`${D} text-base font-bold text-hs-ink leading-relaxed`}>{c.s2.ambBody}</p>
        </P>
      ),
      r2g: (
        <P bg="bg-hs-teal" align="start">
          <p className={`${LBL} text-white/60`}>{c.s2.contentLbl}</p>
          <p className={`${D} text-base font-bold text-white leading-relaxed`}>{c.s2.contentBody}</p>
        </P>
      ),
      r4c: (
        <P bg="bg-hs-orange">
          <p className={`${D} text-base font-bold text-hs-paper text-center leading-relaxed`}>{c.s2.orangeBody}</p>
        </P>
      ),
      ...bottomRow(2, c),
    },
    {
      hero: (
        <P bg="bg-hs-teal">
          <p className={`${LBL} text-white/60`}>{c.s3.label}</p>
          <h2 className={`text-center ${B} text-[clamp(1.6rem,3.5vw,3rem)] text-white leading-tight`}>{brLines(c.s3.title)}</h2>
        </P>
      ),
      r3a: (
        <P bg="bg-hs-ink" align="start">
          <p className={`${LBL} text-hs-gold`}>{c.s3.mlLbl}</p>
          <p className={`${D} text-base font-bold text-hs-paper leading-relaxed`}>{c.s3.mlBody}</p>
        </P>
      ),
      r3b: (
        <P bg="bg-hs-navy" align="start">
          <p className={`${LBL} text-hs-gold`}>{c.s3.ntLbl}</p>
          <p className={`${D} text-base font-bold text-hs-paper leading-relaxed`}>{c.s3.ntBody}</p>
        </P>
      ),
      r2e: (
        <P bg="bg-hs-gold">
          <span className={`${B} text-lg text-hs-ink`}>{c.s3.freeCompute}</span>
        </P>
      ),
      r4b: (
        <P bg="bg-hs-orange">
          <p className={`${D} text-base font-bold text-hs-paper text-center leading-relaxed`}>{c.s3.orangeBody}</p>
        </P>
      ),
      r2f: (
        <P bg="bg-hs-red">
          <span className={`${B} text-lg text-hs-paper text-center leading-tight`}>{brLines(c.s3.forEveryone)}</span>
        </P>
      ),
      ...bottomRow(3, c),
    },
    {
      hero: (
        <P bg="bg-hs-gold">
          <p className={`${LBL} text-hs-ink/50`}>{c.s4.label}</p>
          <h2 className={`text-center ${B} text-[clamp(1.6rem,3.5vw,3rem)] text-hs-ink leading-tight`}>{brLines(c.s4.title)}</h2>
        </P>
      ),
      r2c: (
        <P bg="bg-hs-red">
          <InlineSvg svg={googleSvg} className="h-[clamp(1.8rem,4vw,3rem)] w-auto" label={c.sponsorAlt("Google", gEx)} />
        </P>
      ),
      r2g: (
        <P bg="bg-hs-navy">
          <img src={kfundLogo.src} alt={c.sponsorAlt("K Fund", kEx)} className="h-[clamp(1.8rem,4vw,3rem)] w-auto object-contain brightness-0 invert" />
        </P>
      ),
      r3a: (
        <P bg="bg-hs-teal">
          <img src={falLogo.src} alt={c.sponsorAlt("fal.ai", fEx)} className="h-[clamp(1.8rem,4vw,3rem)] w-auto object-contain brightness-0 invert" />
        </P>
      ),
      r3b: (
        <P bg="bg-hs-orange">
          <img src={exaLogo.src} alt={c.sponsorAlt("Exa", eEx)} className="h-[clamp(1.8rem,4vw,3rem)] w-auto object-contain brightness-0 invert" />
        </P>
      ),
      r4c: (
        <P bg="bg-hs-ink">
          <span className="block text-center">
            <span className="sr-only">{mSr}</span>
            <span className={`${B} text-[clamp(1.4rem,3vw,2.4rem)] text-hs-gold`} aria-hidden>
              Mozart AI
            </span>
          </span>
        </P>
      ),
      r2d: (
        <P bg="bg-hs-paper">
          <p className={`${B} text-[clamp(0.9rem,2vw,1.5rem)] text-hs-ink/40 italic text-center leading-snug`}>{brLines(c.s4.moreWay)}</p>
        </P>
      ),
      r4d: (
        <P bg="bg-hs-cream" align="start">
          <p className={`${LBL} text-hs-ink/40`}>{c.s4.prizesLbl}</p>
          <p className={`${B} text-lg text-hs-ink leading-tight`}>{c.s4.prizesBody}</p>
        </P>
      ),
      ...bottomRow(4, c),
    },
    {
      hero: (
        <P bg="bg-hs-red">
          <p className={`${LBL} text-hs-gold`}>{c.s5.label}</p>
          <h2 className={`text-center ${B} text-[clamp(1.6rem,3.5vw,3rem)] text-hs-paper leading-tight`}>
            {c.s5.title1}
            <br />
            <span className="text-hs-gold">{c.s5.title2}</span>
          </h2>
        </P>
      ),
      r2c: (
        <P bg="bg-hs-orange">
          <span className={`${B} text-[clamp(2rem,4.5vw,3.6rem)] text-hs-paper leading-none`}>{c.s5.goalNum}</span>
          <p className={`mt-1 ${LBL} text-hs-paper`}>{c.s5.goalLbl}</p>
        </P>
      ),
      r3a: (
        <P bg="bg-hs-ink" align="start">
          <p className={`${D} text-base font-medium text-hs-paper leading-relaxed`}>{c.s5.inkBody}</p>
        </P>
      ),
      r3b: (
        <P bg="bg-hs-red">
          <span className={`${B} text-[clamp(1rem,2.2vw,1.8rem)] text-hs-gold text-center leading-tight`}>{c.s5.largest}</span>
        </P>
      ),
      r4c: (
        <P bg="bg-hs-navy">
          <p className={`${D} text-base font-medium text-hs-paper text-center leading-relaxed`}>{brLines(c.s5.navyBody)}</p>
        </P>
      ),
      r4b: (
        <P bg="bg-hs-gold">
          <p className={`${D} text-base font-bold text-hs-ink text-center`}>{c.s5.goldBody}</p>
        </P>
      ),
      ...bottomRow(5, c),
    },
  ];
}
