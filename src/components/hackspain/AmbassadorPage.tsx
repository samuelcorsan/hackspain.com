import { useId } from "react";
import { MosaicBackground } from "./MosaicBackground";
import { ButtonLink } from "./ui/Button";
import { useLayoutProfile } from "./useLayoutProfile";

const panelBorder = "border-[3px] border-hs-ink bg-hs-ink";

const TRAVEL_PERK_INDEX = 5;

const DUTIES = [
  "Hablar de HackSpain en las redes que ya usas. Te damos fechas, enlaces oficiales y lo imprescindible para no equivocarte, pero el post lo escribes y grabas tú, con tu rollo.",
  "Comentarlo en la vida real: el grupo de la asignatura, el Discord del grado, la asociación, amig@s a los que les encaje. Si quieren saber más, que miren hackspain.com o el formulario de registro.",
  "Cuando publiquemos algo gordo—abren plazas, fechas límite, noticias—compártelo o súbelo a historias para que no pase desapercibido.",
] as const;

const PERKS = [
  "Participación asegurada en el hackathon",
  "Merch exclusivo",
  "Badge en X (Twitter)",
  "Carta de recomendación del equipo HackSpain",
  "Certificado físico",
  "Reembolso de viaje",
] as const;

function PerkInfoIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  );
}

export function AmbassadorPage() {
  const profile = useLayoutProfile();
  const travelTipId = useId();
  const signupHref = "/signup?ambassador=1";

  return (
    <div className="relative z-0 min-h-dvh w-full">
      <MosaicBackground
        className="pointer-events-none fixed inset-0 -z-10 h-full min-h-dvh w-full"
        variant={profile}
      />
      <div className="relative z-0 mx-auto max-w-5xl px-3 pb-6 sm:px-4 sm:pb-10">
        <section className={`mb-8 grid grid-cols-1 gap-0 ${panelBorder}`} aria-labelledby="ambassador-hero-title">
          <div className="relative overflow-hidden border-b-[3px] border-hs-ink bg-hs-navy px-4 py-6 sm:px-6 sm:py-8">
            <div
              className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-hs-gold/[0.22] blur-2xl sm:h-72 sm:w-72"
              aria-hidden
            />
            <div className="relative">
              <p className="font-bungee text-xs tracking-[0.12em] text-hs-gold sm:text-sm">Programa de embajadores</p>
              <h1
                id="ambassador-hero-title"
                className="mt-2 font-bungee text-[clamp(1.35rem,4.5vw,2.35rem)] leading-[1.12] text-hs-paper"
              >
                Sé la cara de HackSpain en tu campus.
              </h1>
              <p className="mt-3 max-w-2xl font-sans text-base font-semibold leading-snug text-hs-paper/88 sm:text-lg">
                Junta builders, mueve el boca a boca y empuja hacia el registro — te mantenemos al día con fechas y enlaces
                oficiales, te aclaramos dudas si las tienes, y tienes contacto directo con el equipo para Madrid 2026.
              </p>
              <ButtonLink
                href={signupHref}
                variant="goldInverse"
                size="hero"
                className="mt-5"
              >
                Apúntate desde el registro
              </ButtonLink>
            </div>
          </div>
        </section>

        <section className={`mb-8 grid grid-cols-1 gap-0 ${panelBorder}`} aria-labelledby="ambassador-duties-title">
          <div className="border-b-[3px] border-hs-ink bg-hs-orange px-4 py-4 sm:px-5">
            <h2 id="ambassador-duties-title" className="font-bungee text-xl text-hs-ink sm:text-2xl">
              Qué hacen l@s embajadores
            </h2>
          </div>
          <ul className="divide-y-[3px] divide-hs-ink bg-hs-paper">
            {DUTIES.map((item, i) => (
              <li key={i} className="flex gap-3 px-4 py-4 sm:px-5 sm:py-4">
                <span
                  className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center border-[3px] border-hs-ink bg-hs-sand/50 font-bungee text-sm text-hs-ink"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <span className="font-sans text-base font-semibold leading-snug text-hs-ink sm:text-[1.05rem]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section
          className={`mb-8 grid grid-cols-1 gap-0 ${panelBorder}`}
          aria-labelledby="ambassador-selection-note"
        >
          <div className="border-b-[3px] border-hs-ink bg-hs-sand px-4 py-3 sm:px-5">
            <h2
              id="ambassador-selection-note"
              className="font-bungee text-base leading-tight text-hs-ink sm:text-lg"
            >
              El alcance cuenta en la selección
            </h2>
          </div>
          <p className="bg-hs-paper px-4 py-4 font-sans text-base font-semibold leading-snug text-hs-ink sm:px-5 sm:py-4 sm:text-[1.05rem]">
            Damos más peso a quien ya mueve cifras en alguna red — audiencia sólida, publicación constante o un perfil que la
            gente sigue. Indica qué red y un alcance aproximado en la solicitud para que veamos el encaje.
          </p>
        </section>

        <section className={`mb-8 grid grid-cols-1 gap-0 ${panelBorder}`} aria-labelledby="ambassador-perks-title">
          <div className="border-b-[3px] border-hs-ink bg-hs-navy px-4 py-4 sm:px-5">
            <h2 id="ambassador-perks-title" className="font-bungee text-xl text-hs-paper sm:text-2xl">
              Lo que recibe cada embajador/a
            </h2>
            <p className="mt-2 max-w-2xl font-sans text-sm font-semibold leading-snug text-hs-paper/90 sm:text-base">
              El mismo paquete para tod@s l@s del programa — sin niveles ni excepciones.
            </p>
          </div>
          <div className="flex flex-col bg-hs-paper lg:flex-row lg:items-stretch">
            <div className="relative flex min-h-[11rem] flex-none items-end justify-center overflow-hidden border-b-[3px] border-hs-ink bg-gradient-to-b from-hs-sand/70 via-hs-paper to-hs-paper px-5 pb-0 pt-6 sm:min-h-[12rem] sm:px-8 sm:pt-8 lg:min-h-0 lg:w-[min(34%,11.75rem)] lg:max-w-[13.5rem] lg:border-b-0 lg:border-r-[3px] lg:px-4 lg:pb-1 lg:pt-6 xl:w-[min(34%,14rem)]">
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-hs-gold/[0.07] to-transparent"
                aria-hidden
              />
              <img
                src="/advantages_quijote.png"
                alt=""
                width={320}
                height={320}
                decoding="async"
                loading="lazy"
                className="relative z-[1] h-[clamp(9rem,28vw,12rem)] w-auto max-w-[min(92%,13rem)] object-contain object-bottom drop-shadow-[3px_4px_0_var(--color-hs-ink)] sm:h-[clamp(10rem,26vw,13rem)] lg:h-full lg:max-h-[min(100%,17rem)] lg:w-full lg:max-w-[11.5rem] xl:max-w-[12.5rem]"
              />
            </div>
            <div className="grid min-w-0 flex-1 grid-cols-1 overflow-visible border-t-[3px] border-hs-ink bg-hs-paper sm:grid-cols-2 lg:grid-cols-3 lg:border-t-0">
              {PERKS.map((item, i) => (
                <div
                  key={i}
                  className={`flex min-h-[5.5rem] flex-col justify-center border-b-[3px] border-r-[3px] border-hs-ink p-4 sm:min-h-[6rem] sm:p-5 ${
                    i === TRAVEL_PERK_INDEX ? "relative z-0 overflow-visible sm:z-10" : ""
                  }`}
                >
                  {i === TRAVEL_PERK_INDEX ? (
                    <div className="group/travel relative flex w-full flex-col justify-center">
                      <div className="flex items-start justify-between gap-2">
                        <span className="min-w-0 font-sans text-base font-bold leading-snug text-hs-ink sm:text-[1.05rem]">
                          {item}
                        </span>
                        <button
                          type="button"
                          className="shrink-0 rounded-sm border-[3px] border-hs-ink bg-hs-sand/60 p-1.5 text-hs-ink transition-[filter] hover:bg-hs-gold/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hs-navy focus-visible:ring-offset-2 focus-visible:ring-offset-hs-paper"
                          aria-describedby={travelTipId}
                          aria-label="Más información sobre el reembolso de viaje"
                        >
                          <PerkInfoIcon />
                        </button>
                      </div>
                      <span
                        id={travelTipId}
                        role="tooltip"
                        className="pointer-events-none invisible absolute bottom-[calc(100%+6px)] right-0 z-[80] w-[min(19rem,calc(100vw-2rem))] translate-y-0.5 border-[3px] border-hs-ink bg-hs-paper px-3 py-2.5 font-sans text-sm font-semibold leading-snug text-hs-ink opacity-0 shadow-[3px_3px_0_var(--color-hs-ink)] transition-[opacity,visibility,transform] duration-150 ease-out group-hover/travel:visible group-hover/travel:translate-y-0 group-hover/travel:opacity-100 group-focus-within/travel:visible group-focus-within/travel:translate-y-0 group-focus-within/travel:opacity-100"
                      >
                        Cubrimos el viaje hasta un tope fijo por embajador/a — la cifra exacta y cómo solicitarlo te lo
                        explicamos al incorporarte, para que las expectativas sean claras y justas para tod@s.
                      </span>
                    </div>
                  ) : (
                    <span className="font-sans text-base font-bold leading-snug text-hs-ink sm:text-[1.05rem]">
                      {item}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="ambassador-apply"
          className={`grid grid-cols-1 gap-0 ${panelBorder}`}
          aria-labelledby="ambassador-cta-title"
        >
          <div className="bg-hs-orange px-4 py-5 sm:px-6 sm:py-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
              <div className="min-w-0 flex-1">
                <h2
                  id="ambassador-cta-title"
                  className="font-bungee text-2xl leading-tight text-hs-ink sm:text-3xl"
                >
                  ¿List@ para representar a HackSpain?
                </h2>
                <p className="mt-2 max-w-2xl font-sans text-base font-semibold leading-snug text-hs-ink sm:text-lg">
                  Hazlo desde el formulario de registro al hackathon y marca la opción de embajador/a — te pediremos por qué
                  te interesa y dónde estudias.
                </p>
              </div>
              <ButtonLink
                href={signupHref}
                variant="gold"
                size="lg"
                className="shrink-0 self-stretch text-center sm:self-center"
              >
                Abrir formulario de registro
              </ButtonLink>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
