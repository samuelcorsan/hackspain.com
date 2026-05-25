import { Fragment } from "react";
import { HACKSPAIN_SOCIAL_URLS } from "../../data/landing-meta";
import { InlineSvg } from "../media/inline-svg";
import { ParticipantsCountUp } from "../media/participants-count-up";
import {
  MOSAIC_BD,
  MOSAIC_BTN,
  MOSAIC_DISPLAY,
  MOSAIC_FOOTER,
  MOSAIC_FOOTER_SM,
  MOSAIC_HEADLINE,
  MOSAIC_HEADLINE_SM,
  MOSAIC_HERO,
  MOSAIC_HERO_LG,
  MOSAIC_LBL,
  MOSAIC_LOGO,
  MOSAIC_LOGO_LG,
  MOSAIC_LOGO_XL,
} from "../mosaic/mosaic-typography";
import {
  communitySvg,
  compassSvg,
  cursorLogo,
  exaLogo,
  exponentialLogo,
  falLogo,
  googleLogo,
  horseSvg,
  kfundLogo,
  logoSvg,
  medalSvg,
  onecoworkLogo,
  quixoteSvg,
  sparkSvg,
  sunSvg,
  trophySvg,
  upmLogo,
  windmillSvg,
} from "../theme/assets";
import { GITHUB_SVG, INSTAGRAM_SVG, X_SVG } from "../theme/constants";
import { ButtonLink } from "../ui/button";
import { P } from "../ui/panel";

const B = "font-bungee";
const D = "font-sans";
const LBL = `${MOSAIC_LBL} mb-1`;
const BD = MOSAIC_BD;

const BOTTOM_CELLS = ["r5a", "r5b", "r5c", "r5d"] as const;

function sponsorAlt(brand: string, extra?: string) {
  return `${brand} — patrocinador HackSpain, hackathon Madrid y hackathon España 2026${extra ? `. ${extra}` : ""}`;
}

function brLines(s: string) {
  const lines = s.split("\n");
  return lines.map((line, i) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: static marketing headings; line order is fixed in source.
    <Fragment key={`${line}__${i}`}>
      {i > 0 ? <br /> : null}
      {line}
    </Fragment>
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
    <Fragment key="footer-social">
      <P bg="bg-hs-paper">
        <div className="flex flex-wrap items-center justify-center gap-2.5 text-hs-ink sm:gap-3">
          <a
            aria-label="HackSpain en X (@hackspain26)"
            className="flex h-5 w-5 shrink-0 items-center justify-center"
            href={HACKSPAIN_SOCIAL_URLS.x}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span
              className="h-5 w-5"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted SVG strings from ./constants
              dangerouslySetInnerHTML={{ __html: X_SVG }}
            />
          </a>
          <a
            aria-label="HackSpain en Instagram (@hackspain26)"
            className="flex h-5 w-5 shrink-0 items-center justify-center"
            href={HACKSPAIN_SOCIAL_URLS.instagram}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span
              className="h-5 w-5"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted SVG strings from ./constants
              dangerouslySetInnerHTML={{ __html: INSTAGRAM_SVG }}
            />
          </a>
          <a
            className={`${D} ${MOSAIC_FOOTER} font-bold underline underline-offset-2`}
            href={HACKSPAIN_SOCIAL_URLS.x}
            rel="noopener noreferrer"
            target="_blank"
          >
            @hackspain26
          </a>
        </div>
      </P>
    </Fragment>,
    <Fragment key="footer-credits">
      <P bg="bg-hs-paper">
        <p
          className={`${D} ${MOSAIC_FOOTER} text-center font-bold text-hs-ink`}
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
      </P>
    </Fragment>,
    <Fragment key="footer-github">
      <P bg="bg-hs-paper">
        <div className="flex flex-col items-center gap-1 text-center text-hs-ink">
          <div
            className={`flex items-center justify-center gap-2 ${D} ${MOSAIC_FOOTER} font-black`}
          >
            <span
              aria-hidden
              className="h-5 w-5 shrink-0"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted SVG strings from ./constants
              dangerouslySetInnerHTML={{ __html: GITHUB_SVG }}
            />
            <span>Esta página web es open source</span>
          </div>
          <a
            className={`${D} ${MOSAIC_FOOTER_SM} font-bold underline underline-offset-2`}
            href={HACKSPAIN_SOCIAL_URLS.github}
            rel="noopener noreferrer"
            target="_blank"
          >
            Ver el código →
          </a>
        </div>
      </P>
    </Fragment>,
    <Fragment key="footer-email">
      <P bg="bg-hs-paper">
        <a
          className={`${D} ${MOSAIC_FOOTER} font-bold text-hs-ink underline underline-offset-2`}
          href="mailto:leo@hackspain.com"
        >
          leo@hackspain.com
        </a>
      </P>
    </Fragment>,
  ];

  const i = sectionIdx % 4;
  const actionCell = BOTTOM_CELLS[i];
  const copyCell = BOTTOM_CELLS[(i + 2) % 4];

  return { [actionCell]: actions[i], [copyCell]: copyEl };
}

// Compact (mobile) typography — viewport-based, unchanged from original layout.
const CH = `${B} leading-tight`;
const CLBL = `${D} text-[clamp(0.7rem,3vw,1rem)] font-black uppercase tracking-widest`;
const CBD = `${D} text-[clamp(0.95rem,4vw,1.6rem)] font-semibold leading-snug`;
const CARD = "!gap-3 !p-5";
// Card variant that hosts a faint decorative illustration behind the text.
const CARDART = `${CARD} relative isolate overflow-hidden`;

function cardArt(svg: string, corner: "tl" | "br") {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute -z-10 aspect-square h-[55%] opacity-50 ${
        corner === "tl" ? "top-2 left-2" : "right-2 bottom-2"
      }`}
    >
      <InlineSvg className="h-full w-full" decorative svg={svg} />
    </span>
  );
}

const gEx = "hackathon España Google, hackathon Spain";
const kEx = "inversión hackathon España";
const fEx = "IA hackathon Madrid";
const eEx = "búsqueda hackathon España";
const cEx = "editor de código IA hackathon España";
const uEx = "universidad hackathon Madrid";
const oEx = "coworking hackathon España";
const xEx = "fondo growth hackathon España";

export function buildSections(): Record<string, React.ReactNode>[] {
  const signupHref = "/pre-signup";
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
            className={`absolute bottom-[14%] left-[8%] ${MOSAIC_DISPLAY} text-hs-ink`}
          >
            20
          </span>
          <span
            className={`absolute top-[8%] right-[8%] ${MOSAIC_DISPLAY} text-white drop-shadow-sm`}
          >
            26
          </span>
        </div>
      ),
      r4d: (
        <P bg="bg-hs-gold">
          <ParticipantsCountUp
            ariaLabel="+250 PARTICIPANTES"
            className={`${MOSAIC_DISPLAY} text-hs-ink`}
          />
          <p className={`mt-1 ${LBL} text-hs-ink`}>PARTICIPANTES</p>
        </P>
      ),
      r3a: (
        <P bg="bg-hs-orange">
          <p className={`${LBL} text-hs-paper/60`}>HACKATHON</p>
          <span className={`${MOSAIC_HEADLINE} text-center text-hs-paper`}>
            MADRID · SEPTIEMBRE
          </span>
        </P>
      ),
      r2g: (
        <P bg="bg-hs-red">
          <span className={`${MOSAIC_DISPLAY} text-hs-paper`}>24</span>
          <p className={`mt-1 ${LBL} text-hs-paper`}>HORAS</p>
        </P>
      ),
      ...bottomRow(0),
    },
    {
      hero: (
        <P bg="bg-hs-navy">
          <p className={`${LBL} text-hs-gold`}>MISIÓN</p>
          <h2 className={`text-center ${MOSAIC_HERO} text-hs-paper`}>
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
          <h2 className={`text-center ${MOSAIC_HERO} text-hs-ink`}>
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
            className={`!h-auto !border-hs-ink !bg-hs-navy !whitespace-normal !px-1 !py-1 !text-center !font-bungee !normal-case !text-hs-gold ${MOSAIC_BTN} !transition-[filter,box-shadow] hover:!brightness-110 focus-visible:!border-hs-paper @[220px]:!px-2 @[220px]:!py-1.5 @[220px]:mt-1 mt-0.5 w-full min-w-0 max-w-full self-stretch shadow-[2px_2px_0_0_var(--color-hs-ink)] focus-visible:shadow-[2px_2px_0_0_var(--color-hs-ink),0_0_0_2px_var(--color-hs-ink)]`}
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
          <h2 className={`text-center ${MOSAIC_HERO_LG} text-white`}>
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
      r4d: (
        <P bg="bg-hs-gold">
          <span className={`${MOSAIC_HEADLINE} text-center text-hs-ink`}>
            {brLines("COMPUTE\nGRATIS")}
          </span>
        </P>
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
          <span className={`${MOSAIC_HEADLINE} text-center text-hs-paper`}>
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
          <h2 className={`text-center ${MOSAIC_HERO_LG} text-hs-ink`}>
            {brLines("APOYADOS POR\nLOS MEJORES")}
          </h2>
        </P>
      ),
      r2c: (
        <P bg="bg-hs-red">
          <img
            alt={sponsorAlt("Exa", eEx)}
            className={`${MOSAIC_LOGO} object-contain brightness-0 invert`}
            height={96}
            src={exaLogo.src}
            width={240}
          />
        </P>
      ),
      r2g: (
        <P bg="bg-hs-navy">
          <img
            alt={sponsorAlt("K Fund", kEx)}
            className={`${MOSAIC_LOGO} object-contain brightness-0 invert`}
            height={96}
            src={kfundLogo.src}
            width={240}
          />
        </P>
      ),
      r2f: (
        <P bg="bg-hs-paper">
          <img
            alt={sponsorAlt("UPM — Universidad Politécnica de Madrid", uEx)}
            className={`${MOSAIC_LOGO_LG} object-contain`}
            height={96}
            src={upmLogo.src}
            width={240}
          />
        </P>
      ),
      r3a: (
        <P bg="bg-hs-teal">
          <img
            alt={sponsorAlt("fal.ai", fEx)}
            className={`${MOSAIC_LOGO} object-contain brightness-0 invert`}
            height={96}
            src={falLogo.src}
            width={240}
          />
        </P>
      ),
      r3b: (
        <P bg="bg-hs-orange">
          <img
            alt={sponsorAlt("Google", gEx)}
            className={`${MOSAIC_LOGO} object-contain brightness-0 invert`}
            height={96}
            src={googleLogo.src}
            width={240}
          />
        </P>
      ),
      r4b: (
        <P bg="bg-hs-paper">
          <img
            alt={sponsorAlt("OneCoWork", oEx)}
            className={`${MOSAIC_LOGO_LG} object-contain`}
            height={96}
            src={onecoworkLogo.src}
            width={240}
          />
        </P>
      ),
      r4c: (
        <P bg="bg-hs-ink">
          <img
            alt={sponsorAlt("Cursor", cEx)}
            className={`${MOSAIC_LOGO_XL} object-contain brightness-0 invert`}
            height={96}
            src={cursorLogo.src}
            width={240}
          />
        </P>
      ),
      r2d: (
        <P align="start" bg="bg-hs-cream">
          <p className={`${LBL} text-hs-ink/40`}>PREMIOS</p>
          <p className={`${MOSAIC_HEADLINE_SM} text-hs-ink`}>
            Grandes recompensas para l@s hackers
          </p>
        </P>
      ),
      r4d: (
        <P bg="bg-hs-paper">
          <img
            alt={sponsorAlt("Exponential", xEx)}
            className={`${MOSAIC_LOGO_LG} object-contain`}
            height={96}
            src={exponentialLogo.src}
            width={240}
          />
        </P>
      ),
      ...bottomRow(4),
    },
    {
      hero: (
        <P bg="bg-hs-red">
          <p className={`${LBL} text-hs-gold`}>VISIÓN A LARGO PLAZO</p>
          <h2 className={`text-center ${MOSAIC_HERO_LG} text-hs-paper`}>
            DE MADRID
            <br />
            <span className="text-hs-gold">AL MUNDO</span>
          </h2>
        </P>
      ),
      r2c: (
        <P bg="bg-hs-orange">
          <span className={`${MOSAIC_DISPLAY} text-hs-paper`}>5.000</span>
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
        <P bg="bg-hs-navy">
          <span className={`${MOSAIC_HEADLINE_SM} text-center text-hs-gold`}>
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

function compactFooter(centered = false): React.ReactNode {
  return (
    <P
      align={centered ? "center" : "start"}
      bg="bg-hs-paper"
      className={`${CARD} !items-center ${centered ? "" : "!pt-6"}`}
    >
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-hs-ink">
        <a
          aria-label="HackSpain en X (@hackspain26)"
          className="flex h-6 w-6 shrink-0 items-center justify-center"
          href={HACKSPAIN_SOCIAL_URLS.x}
          rel="noopener noreferrer"
          target="_blank"
        >
          <span
            className="h-6 w-6"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted SVG strings from ./constants
            dangerouslySetInnerHTML={{ __html: X_SVG }}
          />
        </a>
        <a
          aria-label="HackSpain en Instagram (@hackspain26)"
          className="flex h-6 w-6 shrink-0 items-center justify-center"
          href={HACKSPAIN_SOCIAL_URLS.instagram}
          rel="noopener noreferrer"
          target="_blank"
        >
          <span
            className="h-6 w-6"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted SVG strings from ./constants
            dangerouslySetInnerHTML={{ __html: INSTAGRAM_SVG }}
          />
        </a>
        <a
          className={`${D} font-bold text-base underline underline-offset-2`}
          href={HACKSPAIN_SOCIAL_URLS.x}
          rel="noopener noreferrer"
          target="_blank"
        >
          @hackspain26
        </a>
      </div>
      <p className={`${D} text-center font-bold text-hs-ink text-sm`}>
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
        <span className="text-hs-ink/40"> · © 2026 HackSpain</span>
      </p>
    </P>
  );
}

/**
 * Mobile layout — each section is a hero plus two big content cards and a
 * footer, merging the desktop section's scattered tiles into a few readable
 * cards. Keyed by the compact cell ids: `hero`, `b1`, `b2`, `foot`.
 */
export function buildSectionsCompact(): Record<string, React.ReactNode>[] {
  const signupHref = "/pre-signup";
  const ambassadorHref = "/ambassador";
  const foot = compactFooter();
  const footCentered = compactFooter(true);

  const sponsorImg = (
    brand: string,
    extra: string,
    logo: { src: string },
    invert = true
  ) => (
    <img
      alt={sponsorAlt(brand, extra)}
      className={`h-[clamp(1.8rem,8vw,3.4rem)] w-auto max-w-[85%] object-contain ${invert ? "brightness-0 invert" : ""}`}
      height={96}
      src={logo.src}
      width={240}
    />
  );

  return [
    {
      hero: (
        <P bg="bg-hs-paper" className={CARD}>
          <div className="flex w-full max-w-[420px] flex-col items-center gap-4">
            <InlineSvg
              className="h-auto w-full"
              label="HackSpain o Hack Spain — hackathon Madrid, hackathon España y Spain 2026"
              svg={logoSvg}
            />
            <ButtonLink
              aria-label="Solicitar plaza en HackSpain — abrir formulario"
              className="!px-5 !py-2.5 !text-[clamp(0.85rem,3vw,1.1rem)] shrink-0"
              href={signupHref}
              size="compact"
              variant="gold"
            >
              Apúntate
            </ButtonLink>
          </div>
        </P>
      ),
      b1: (
        <P align="start" bg="bg-hs-orange" className={CARDART}>
          {cardArt(windmillSvg, "br")}
          <p className={`${CLBL} text-hs-paper/70`}>HACKATHON</p>
          <span
            className={`${CH} text-[clamp(1.4rem,6.5vw,2.6rem)] text-hs-paper`}
          >
            MADRID · SEPTIEMBRE 2026
          </span>
          <p className={`${CBD} text-hs-paper/90`}>
            24 horas intensas con l@s mejores jóvenes coders de España.
          </p>
        </P>
      ),
      b2: (
        <P bg="bg-hs-gold" className={CARDART}>
          {cardArt(sunSvg, "br")}
          <ParticipantsCountUp
            ariaLabel="+250 PARTICIPANTES"
            className={`${CH} text-[clamp(2.2rem,11vw,4.5rem)] text-hs-ink`}
          />
          <p className={`${CLBL} text-hs-ink`}>PARTICIPANTES</p>
        </P>
      ),
      foot,
    },
    {
      hero: (
        <P bg="bg-hs-navy" className={CARD}>
          <p className={`${CLBL} text-hs-gold`}>MISIÓN</p>
          <h2
            className={`text-center ${CH} text-[clamp(1.6rem,7vw,3rem)] text-hs-paper`}
          >
            UNIR A JÓVENES <span className="text-hs-red">TALENTOSOS</span>{" "}
            CODERS ESPAÑOLES
          </h2>
        </P>
      ),
      b1: (
        <P align="start" bg="bg-hs-paper" className={CARDART}>
          {cardArt(quixoteSvg, "br")}
          <p className={`${CLBL} text-hs-ink/40`}>MISIÓN</p>
          <p className={`${CBD} text-hs-ink`}>
            Posicionar a España como líder europeo en talento tech joven.
          </p>
        </P>
      ),
      b2: (
        <P bg="bg-hs-teal" className={CARDART}>
          {cardArt(horseSvg, "br")}
          <p className={`${CBD} text-center text-white`}>
            24 horas intensas construyendo con l@s mejores jóvenes programadores
            de España.
          </p>
        </P>
      ),
      foot,
    },
    {
      hero: (
        <P bg="bg-hs-sand" className={CARD}>
          <p className={`${CLBL} text-hs-ink/40`}>HACKSPAIN 2026</p>
          <h2
            className={`text-center ${CH} text-[clamp(1.8rem,8vw,3.2rem)] text-hs-ink`}
          >
            ¿QUÉ NOS HACE ÚNICOS?
          </h2>
        </P>
      ),
      b1: (
        <P align="start" bg="bg-hs-ink" className={CARDART}>
          {cardArt(communitySvg, "br")}
          <p className={`${CBD} text-hs-paper`}>
            Estamos totalmente impulsados por la misión.
          </p>
          <div>
            <p className={`${CLBL} text-hs-gold`}>FOCO EN MEDIOS</p>
            <p className={`${CBD} text-hs-paper/90`}>
              Ampliar nuestra presencia en redes y medios con historias reales
              de l@s hackers.
            </p>
          </div>
        </P>
      ),
      b2: (
        <P align="start" bg="bg-hs-gold" className={CARDART}>
          {cardArt(sparkSvg, "br")}
          <p className={`${CLBL} text-hs-ink/60`}>EMBAJADORES</p>
          <p className={`${CBD} text-hs-ink`}>
            Universidades y centros educativos por toda España.
          </p>
          <ButtonLink
            aria-label="Ver programa de embajadores — HackSpain, abrir página"
            className="!border-hs-ink !bg-hs-navy !text-hs-gold mt-1 self-start"
            href={ambassadorHref}
            size="compact"
            variant="gold"
          >
            Ver programa
          </ButtonLink>
        </P>
      ),
      foot,
    },
    {
      hero: (
        <P bg="bg-hs-teal" className={CARD}>
          <p className={`${CLBL} text-white/60`}>HACKSPAIN 2026</p>
          <h2
            className={`text-center ${CH} text-[clamp(2rem,9vw,3.4rem)] text-white`}
          >
            TRACKS ORIGINALES
          </h2>
        </P>
      ),
      b1: (
        <P align="start" bg="bg-hs-ink" className={CARDART}>
          {cardArt(compassSvg, "br")}
          <div>
            <p className={`${CLBL} text-hs-gold`}>TRACK ML</p>
            <p className={`${CBD} text-hs-paper`}>
              Retos de ML con cómputo gratuito.
            </p>
          </div>
          <div>
            <p className={`${CLBL} text-hs-gold`}>TRACK NO TÉCNICO</p>
            <p className={`${CBD} text-hs-paper/90`}>
              Enseñamos a perfiles no técnicos a crear software de calidad.
            </p>
          </div>
        </P>
      ),
      b2: (
        <P bg="bg-hs-orange" className={CARDART}>
          {cardArt(trophySvg, "br")}
          <span
            className={`${CH} text-center text-[clamp(1.6rem,7vw,2.8rem)] text-hs-paper`}
          >
            COMPUTE GRATIS · PARA TODOS
          </span>
          <p className={`${CBD} text-center text-hs-paper/90`}>
            Pensado para todos los niveles, de principiantes a expertos.
          </p>
        </P>
      ),
      foot,
    },
    {
      hero: (
        <P bg="bg-hs-gold" className={CARD}>
          <p className={`${CLBL} text-hs-ink/50`}>HACKSPAIN 2026</p>
          <h2
            className={`text-center ${CH} text-[clamp(1.8rem,8vw,3.2rem)] text-hs-ink`}
          >
            APOYADOS POR LOS MEJORES
          </h2>
        </P>
      ),
      b1: (
        <P bg="bg-hs-ink" className={CARD}>
          <div className="grid w-full grid-cols-2 place-items-center gap-x-6 gap-y-6">
            {sponsorImg("Google", gEx, googleLogo)}
            {sponsorImg("Cursor", cEx, cursorLogo)}
            {sponsorImg("fal.ai", fEx, falLogo)}
            {sponsorImg("Exa", eEx, exaLogo)}
            {sponsorImg("K Fund", kEx, kfundLogo)}
            {sponsorImg("Exponential", xEx, exponentialLogo)}
            {sponsorImg(
              "UPM — Universidad Politécnica de Madrid",
              uEx,
              upmLogo,
              false
            )}
            {sponsorImg("OneCoWork", oEx, onecoworkLogo)}
          </div>
        </P>
      ),
      b2: (
        <P align="start" bg="bg-hs-cream" className={CARDART}>
          {cardArt(medalSvg, "br")}
          <p className={`${CLBL} text-hs-ink/40`}>PREMIOS</p>
          <p className={`${CH} text-[clamp(1.3rem,5.5vw,2.2rem)] text-hs-ink`}>
            Grandes recompensas para l@s hackers
          </p>
        </P>
      ),
      foot,
    },
    {
      hero: (
        <P bg="bg-hs-red" className={CARD}>
          <p className={`${CLBL} text-hs-gold`}>VISIÓN A LARGO PLAZO</p>
          <h2
            className={`text-center ${CH} text-[clamp(1.6rem,7vw,3rem)] text-hs-paper`}
          >
            DE MADRID <span className="text-hs-gold">AL MUNDO</span>
          </h2>
        </P>
      ),
      b1: (
        <P align="start" bg="bg-hs-ink" className={CARDART}>
          {cardArt(trophySvg, "br")}
          <p className={`${CBD} text-hs-paper`}>
            HackSpain no es un evento puntual. Es la base de un movimiento que
            posiciona a España como líder tech en Europa.
          </p>
          <div className="flex items-baseline gap-2">
            <span
              className={`${CH} text-[clamp(1.8rem,8vw,3rem)] text-hs-gold`}
            >
              5.000
            </span>
            <span className={`${CLBL} text-hs-paper/70`}>
              META EL PRÓXIMO AÑO
            </span>
          </div>
        </P>
      ),
      b2: (
        <P bg="bg-hs-navy" className={CARDART}>
          {cardArt(windmillSvg, "br")}
          <span
            className={`text-center ${CH} text-[clamp(1.3rem,5.5vw,2.2rem)] text-hs-gold`}
          >
            EL MAYOR HACKATHON DE EUROPA
          </span>
          <p className={`${CBD} text-center text-hs-paper/90`}>
            El mayor movimiento de hackathones del sur de Europa.
          </p>
        </P>
      ),
      foot: footCentered,
    },
  ];
}
