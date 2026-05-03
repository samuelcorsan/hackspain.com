import {
  exaLogo,
  falLogo,
  googleLogo,
  kfundLogo,
  logoSvg,
  mozartLogo,
} from "./assets";
import { INSTAGRAM_SVG, X_SVG } from "./constants";
import { InlineSvg } from "./InlineSvg";
import { P } from "./Panel";
import { ParticipantsCountUp } from "./ParticipantsCountUp";
import { ButtonLink } from "./ui/Button";

const B = "font-bungee";
const D = "font-sans";
const LBL = `${D} text-xs font-black tracking-widest uppercase mb-1`;
const BD = `${D} text-[clamp(0.68rem,2.35vw,1.4rem)] font-bold leading-relaxed`;

const BOTTOM_CELLS = ["r5a", "r5b", "r5c", "r5d"] as const;

function sponsorAlt(brand: string, extra?: string) {
  return `${brand} — patrocinador HackSpain, hackathon Madrid y hackathon España 2026${extra ? `. ${extra}` : ""}`;
}

function brLines(s: string) {
  const lines = s.split("\n");
  return lines.map((line, i) => (
    <span key={i}>
      {i > 0 ? <br /> : null}
      {line}
    </span>
  ));
}

function bottomRow(sectionIdx: number): Record<string, React.ReactNode> {
  const copyEl = (
    <P bg="bg-hs-paper">
      <p
        className={`${D} text-center font-bold text-hs-ink/40 text-sm uppercase tracking-widest`}
      >
        © 2026 HackSpain
      </p>
    </P>
  );

  const actions: React.ReactNode[] = [
    <P bg="bg-hs-paper">
      <div className="flex flex-wrap items-center justify-center gap-2.5 text-hs-ink sm:gap-3">
        <a
          aria-label="HackSpain en X (@hackspain26)"
          className="flex h-5 w-5 shrink-0 items-center justify-center"
          href="https://x.com/hackspain26"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span
            className="h-5 w-5"
            dangerouslySetInnerHTML={{ __html: X_SVG }}
          />
        </a>
        <a
          aria-label="HackSpain en Instagram (@hackspain26)"
          className="flex h-5 w-5 shrink-0 items-center justify-center"
          href="https://www.instagram.com/hackspain26/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span
            className="h-5 w-5"
            dangerouslySetInnerHTML={{ __html: INSTAGRAM_SVG }}
          />
        </a>
        <a
          className={`${D} font-bold text-[clamp(0.7rem,1.1vw,1rem)] underline underline-offset-2`}
          href="https://x.com/hackspain26"
          rel="noopener noreferrer"
          target="_blank"
        >
          @hackspain26
        </a>
      </div>
    </P>,
    <P bg="bg-hs-paper">
      <p
        className={`${D} text-center font-bold text-[clamp(0.7rem,1.1vw,1rem)] text-hs-ink`}
      >
        Hecho con ♥ por{" "}
        <a
          className="underline underline-offset-2"
          href="https://x.com/mrloldev"
          rel="noopener noreferrer"
          target="_blank"
        >
          Leo
        </a>
        {" y "}
        <a
          className="underline underline-offset-2"
          href="https://x.com/disamdev"
          rel="noopener noreferrer"
          target="_blank"
        >
          Samu
        </a>
      </p>
    </P>,
    <P bg="bg-hs-paper">
      <a
        className={`${D} font-bold text-[clamp(0.7rem,1.1vw,1rem)] text-hs-ink underline underline-offset-2`}
        href="https://github.com/samuelcorsan/hackspain.com"
        rel="noopener noreferrer"
        target="_blank"
      >
        Ver el código →
      </a>
    </P>,
    <P bg="bg-hs-paper">
      <a
        className={`${D} font-bold text-[clamp(0.7rem,1.1vw,1rem)] text-hs-ink underline underline-offset-2`}
        href="mailto:leo@hackspain.com"
      >
        leo@hackspain.com
      </a>
    </P>,
  ];

  const i = sectionIdx % 4;
  const actionCell = BOTTOM_CELLS[i];
  const copyCell = BOTTOM_CELLS[(i + 2) % 4];

  return { [actionCell]: actions[i], [copyCell]: copyEl };
}

const gEx = "hackathon España Google, hackathon Spain";
const kEx = "inversión hackathon España";
const fEx = "IA hackathon Madrid";
const eEx = "búsqueda hackathon España";
const mEx = "IA agentes hackathon España";

export function buildSections(): Record<string, React.ReactNode>[] {
  const signupHref = "/signup";
  const ambassadorHref = "/ambassador";

  return [
    {
      hero: (
        <P bg="bg-hs-paper">
          <div className="flex w-full max-w-[380px] flex-col items-center @[220px]:gap-3 gap-2">
            <InlineSvg
              className="h-auto w-full"
              label="HackSpain o Hack Spain — hackathon Madrid, hackathon España y Spain 2026"
              svg={logoSvg}
            />
            <ButtonLink
              aria-label="Solicitar plaza en HackSpain — abrir formulario"
              className="shrink-0"
              href={signupHref}
              size="compact"
              variant="gold"
            >
              Apúntate
            </ButtonLink>
          </div>
        </P>
      ),
      year: (
        <div className="relative h-full w-full">
          <span
            className={`absolute bottom-[14%] left-[8%] ${B} text-[clamp(1.3rem,5.5vw,4.5rem)] text-hs-ink leading-none`}
          >
            20
          </span>
          <span
            className={`absolute top-[8%] right-[8%] ${B} text-[clamp(1.3rem,5.5vw,4.5rem)] text-white leading-none drop-shadow-sm`}
          >
            26
          </span>
        </div>
      ),
      r4d: (
        <P bg="bg-hs-gold">
          <ParticipantsCountUp
            ariaLabel="+300 PARTICIPANTES"
            className={`${B} text-[clamp(1.2rem,4.5vw,3.6rem)] text-hs-ink leading-none`}
          />
          <p className={`mt-1 ${LBL} text-hs-ink`}>PARTICIPANTES</p>
        </P>
      ),
      r3a: (
        <P bg="bg-hs-orange">
          <p className={`${LBL} text-hs-paper/60`}>HACKATHON</p>
          <span
            className={`${B} text-center text-[clamp(0.85rem,2.8vw,2.2rem)] text-hs-paper leading-tight`}
          >
            MADRID · JUNIO
          </span>
        </P>
      ),
      r2g: (
        <P bg="bg-hs-red">
          <span
            className={`${B} text-[clamp(1.3rem,5.5vw,4.5rem)] text-hs-paper leading-none`}
          >
            24
          </span>
          <p className={`mt-1 ${LBL} text-hs-paper`}>HORAS</p>
        </P>
      ),
      ...bottomRow(0),
    },
    {
      hero: (
        <P bg="bg-hs-navy">
          <p className={`${LBL} text-hs-gold`}>MISIÓN</p>
          <h2
            className={`text-center ${B} text-[clamp(1.4rem,3vw,2.8rem)] text-hs-paper leading-tight`}
          >
            UNIR A
            <br />
            JÓVENES <span className="text-hs-red">TALENTOSOS</span>
            <br />
            CODERS ESPAÑOLES
          </h2>
        </P>
      ),
      r3b: (
        <P align="start" bg="bg-hs-paper">
          <p className={`${LBL} text-hs-ink/40`}>MISIÓN</p>
          <p className={`${BD} text-hs-ink`}>
            Posicionar a España como líder europeo en talento tech joven.
          </p>
        </P>
      ),
      r4b: (
        <P bg="bg-hs-teal">
          <p className={`${BD} text-center text-white`}>
            24 horas intensas construyendo con l@s mejores jóvenes programadores
            de España.
          </p>
        </P>
      ),
      ...bottomRow(1),
    },
    {
      hero: (
        <P bg="bg-hs-sand">
          <p className={`${LBL} text-hs-ink/40`}>HACKSPAIN 2026</p>
          <h2
            className={`text-center ${B} text-[clamp(1.4rem,3vw,2.8rem)] text-hs-ink leading-tight`}
          >
            {brLines("¿QUÉ NOS HACE\nÚNICOS?")}
          </h2>
        </P>
      ),
      r3a: (
        <P align="start" bg="bg-hs-ink">
          <p className={`${BD} text-hs-paper`}>
            Estamos totalmente impulsados por la misión.
          </p>
        </P>
      ),
      r3b: (
        <P align="start" bg="bg-hs-navy">
          <p className={`${LBL} text-hs-gold`}>FOCO EN MEDIOS</p>
          <p className={`${BD} text-hs-paper`}>
            Ampliar nuestra presencia en redes y medios.
          </p>
        </P>
      ),
      r2c: (
        <P
          align="start"
          bg="bg-hs-gold"
          className="!gap-0.5 !p-1.5 @[180px]:!gap-1.5 @[180px]:!p-2.5"
        >
          <p className={`${LBL} text-hs-ink/60`}>EMBAJADORES</p>
          <p className={`${BD} text-hs-ink`}>
            Universidades y centros educativos
          </p>
          <ButtonLink
            aria-label="Ver programa de embajadores — HackSpain, abrir página"
            className="!h-auto !border-hs-ink !bg-hs-navy !whitespace-normal !px-1 !py-1 !text-center !text-[clamp(0.48rem,1.05vw+0.3rem,0.78rem)] !font-bungee !normal-case !leading-tight !text-hs-gold !transition-[filter,box-shadow] hover:!brightness-110 focus-visible:!border-hs-paper @[220px]:!px-2 @[220px]:!py-1.5 @[220px]:mt-1 mt-0.5 w-full min-w-0 max-w-full self-stretch shadow-[2px_2px_0_0_var(--color-hs-ink)] focus-visible:shadow-[2px_2px_0_0_var(--color-hs-ink),0_0_0_2px_var(--color-hs-ink)]"
            href={ambassadorHref}
            size="compact"
            variant="gold"
          >
            <span className="block w-full [text-wrap:balance]">
              Ver programa de embajadores
            </span>
          </ButtonLink>
        </P>
      ),
      r2g: (
        <P align="start" bg="bg-hs-teal">
          <p className={`${LBL} text-white/60`}>CONTENIDO DE CALIDAD</p>
          <p className={`${BD} text-white`}>Historias reales de l@s hackers</p>
        </P>
      ),
      r4c: (
        <P bg="bg-hs-orange">
          <p className={`${BD} text-center text-hs-paper`}>
            Tracks originales para distintos niveles.
          </p>
        </P>
      ),
      ...bottomRow(2),
    },
    {
      hero: (
        <P bg="bg-hs-teal">
          <p className={`${LBL} text-white/60`}>HACKSPAIN 2026</p>
          <h2
            className={`text-center ${B} text-[clamp(1.6rem,3.5vw,3rem)] text-white leading-tight`}
          >
            {brLines("TRACKS\nORIGINALES")}
          </h2>
        </P>
      ),
      r3a: (
        <P align="start" bg="bg-hs-ink">
          <p className={`${LBL} text-hs-gold`}>TRACK ML</p>
          <p className={`${BD} text-hs-paper`}>
            Retos de ML con recursos de cómputo gratuitos
          </p>
        </P>
      ),
      r3b: (
        <P align="start" bg="bg-hs-navy">
          <p className={`${LBL} text-hs-gold`}>TRACK NO TÉCNICO</p>
          <p className={`${BD} text-hs-paper`}>
            Enseñamos a perfiles no técnicos a crear software de calidad.
          </p>
        </P>
      ),
      r1e: (
        <div className="flex h-full w-full flex-col items-center justify-center bg-hs-gold px-1 py-0">
          <span
            className={`${B} text-center text-[clamp(0.7rem,1.65vw,0.95rem)] text-hs-ink leading-[1.12]`}
          >
            {brLines("COMPUTE\nGRATIS")}
          </span>
        </div>
      ),
      r4b: (
        <P bg="bg-hs-orange">
          <p className={`${BD} text-center text-hs-paper`}>
            Pensado para todos los niveles — de principiantes a expertos.
          </p>
        </P>
      ),
      r2f: (
        <P bg="bg-hs-red">
          <span
            className={`${B} text-center text-[clamp(0.75rem,1.25vw,1.125rem)] text-hs-paper leading-tight`}
          >
            {brLines("PARA\nTODOS")}
          </span>
        </P>
      ),
      ...bottomRow(3),
    },
    {
      hero: (
        <P bg="bg-hs-gold">
          <p className={`${LBL} text-hs-ink/50`}>HACKSPAIN 2026</p>
          <h2
            className={`text-center ${B} text-[clamp(1.6rem,3.5vw,3rem)] text-hs-ink leading-tight`}
          >
            {brLines("APOYADOS POR\nLOS MEJORES")}
          </h2>
        </P>
      ),
      r2c: (
        <P bg="bg-hs-red">
          <img
            alt={sponsorAlt("Google", gEx)}
            className="h-[clamp(1rem,4vw,3rem)] w-auto object-contain"
            src={googleLogo.src}
          />
        </P>
      ),
      r2g: (
        <P bg="bg-hs-navy">
          <img
            alt={sponsorAlt("Mozart AI", mEx)}
            className="h-[clamp(1rem,4vw,3rem)] w-auto object-contain brightness-0 invert"
            src={mozartLogo.src}
          />
        </P>
      ),
      r3a: (
        <P bg="bg-hs-teal">
          <img
            alt={sponsorAlt("fal.ai", fEx)}
            className="h-[clamp(1rem,4vw,3rem)] w-auto object-contain brightness-0 invert"
            src={falLogo.src}
          />
        </P>
      ),
      r3b: (
        <P bg="bg-hs-orange">
          <img
            alt={sponsorAlt("Exa", eEx)}
            className="h-[clamp(1rem,4vw,3rem)] w-auto object-contain brightness-0 invert"
            src={exaLogo.src}
          />
        </P>
      ),
      r4c: (
        <P bg="bg-hs-ink">
          <img
            alt={sponsorAlt("K Fund", kEx)}
            className="h-[clamp(1rem,4vw,3rem)] w-auto object-contain brightness-0 invert"
            src={kfundLogo.src}
          />
        </P>
      ),
      r2d: (
        <P bg="bg-hs-paper">
          <p
            className={`${B} text-center text-[clamp(0.6rem,2vw,1.5rem)] text-hs-ink/40 italic leading-snug`}
          >
            {brLines("y más\nen camino...")}
          </p>
        </P>
      ),
      r4d: (
        <P align="start" bg="bg-hs-cream">
          <p className={`${LBL} text-hs-ink/40`}>PREMIOS</p>
          <p
            className={`${B} text-[clamp(0.75rem,1.25vw,1.125rem)] text-hs-ink leading-tight`}
          >
            Grandes recompensas para l@s hackers
          </p>
        </P>
      ),
      ...bottomRow(4),
    },
    {
      hero: (
        <P bg="bg-hs-red">
          <p className={`${LBL} text-hs-gold`}>VISIÓN A LARGO PLAZO</p>
          <h2
            className={`text-center ${B} text-[clamp(1.6rem,3.5vw,3rem)] text-hs-paper leading-tight`}
          >
            DE MADRID
            <br />
            <span className="text-hs-gold">AL MUNDO</span>
          </h2>
        </P>
      ),
      r2c: (
        <P bg="bg-hs-orange">
          <span
            className={`${B} text-[clamp(1.2rem,4.5vw,3.6rem)] text-hs-paper leading-none`}
          >
            5.000
          </span>
          <p className={`mt-1 ${LBL} text-hs-paper`}>META EL PRÓXIMO AÑO</p>
        </P>
      ),
      r3a: (
        <P align="start" bg="bg-hs-ink">
          <p className={`${BD} text-hs-paper`}>
            HackSpain no es un evento puntual. Es la base de un movimiento que
            posiciona a España como líder tech en Europa.
          </p>
        </P>
      ),
      r3b: (
        <P bg="bg-hs-red">
          <span
            className={`${B} text-center text-[clamp(0.65rem,2.2vw,1.8rem)] text-hs-gold leading-tight`}
          >
            EL MAYOR HACKATHON DE EUROPA
          </span>
        </P>
      ),
      r4b: (
        <P bg="bg-hs-gold">
          <p className={`${BD} text-center text-hs-ink`}>
            El mayor movimiento de hackathones del sur de Europa.
          </p>
        </P>
      ),
      ...bottomRow(5),
    },
  ];
}
