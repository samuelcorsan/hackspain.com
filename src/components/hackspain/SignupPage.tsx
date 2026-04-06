import { useEffect, useState } from "react";
import { initBotId } from "botid/client/core";
import { AnimatePresence, motion } from "motion/react";
import { MosaicBackground } from "./MosaicBackground";
import {
  FormField,
  Input,
  SocialPrefixInput,
  Textarea,
} from "./form";
import { Button, ButtonLink } from "./ui/Button";
import {
  HEARD_FROM_OPTIONS,
  HEARD_FROM_SOURCE_IDS,
  type HeardFromSourceId,
  normalizeSocialUrl,
  parseSignupBodyClient,
} from "../../lib/signupValidation";
import { useLayoutProfile } from "./useLayoutProfile";

const STORAGE_KEY = "hackspain-signup-draft-v1";
const STORAGE_APPLIED_KEY = "hackspain-signup-applied-v1";

type FlowStatus = "idle" | "submitting" | "success" | "error" | "alreadyApplied";

function readAppliedFlag(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(STORAGE_APPLIED_KEY) === "1";
}

function setAppliedFlag() {
  try {
    localStorage.setItem(STORAGE_APPLIED_KEY, "1");
  } catch {
    /* ignore */
  }
}

function clearAppliedFlag() {
  try {
    localStorage.removeItem(STORAGE_APPLIED_KEY);
  } catch {
    /* ignore */
  }
}

type StoredFields = {
  fullName: string;
  email: string;
  xUrl: string;
  linkedinUrl: string;
  githubUrl: string;
  webUrl: string;
  achievements: string;
  freeTime: string;
  wantsAmbassador: boolean;
  ambassadorMotivation: string;
  ambassadorStudyWhere: string;
  heardFromSource: HeardFromSourceId | "";
  heardFromOther: string;
};

const EMPTY_FIELDS: StoredFields = {
  fullName: "",
  email: "",
  xUrl: "",
  linkedinUrl: "",
  githubUrl: "",
  webUrl: "",
  achievements: "",
  freeTime: "",
  wantsAmbassador: false,
  ambassadorMotivation: "",
  ambassadorStudyWhere: "",
  heardFromSource: "",
  heardFromOther: "",
};

function readStoredFields(): StoredFields {
  if (typeof window === "undefined") return { ...EMPTY_FIELDS };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...EMPTY_FIELDS };
    const o = JSON.parse(raw) as Record<string, unknown>;
    const s = (k: keyof StoredFields) =>
      typeof o[k] === "string" ? (o[k] as string) : "";
    const wantsAmbassador =
      o.wantsAmbassador === true || o.wantsAmbassador === "true";
    const ids = HEARD_FROM_SOURCE_IDS as readonly string[];
    const sourceRaw = typeof o.heardFromSource === "string" ? o.heardFromSource.trim() : "";
    let heardFromSource: HeardFromSourceId | "" =
      sourceRaw !== "" && ids.includes(sourceRaw) ? (sourceRaw as HeardFromSourceId) : "";
    let heardFromOther = typeof o.heardFromOther === "string" ? o.heardFromOther : "";
    const legacy = typeof o.heardFrom === "string" ? o.heardFrom.trim() : "";
    if (!heardFromSource && legacy) {
      if (legacy.startsWith("other:")) {
        heardFromSource = "other";
        heardFromOther = legacy.slice(6).trim();
      } else if (ids.includes(legacy)) {
        heardFromSource = legacy as HeardFromSourceId;
      } else {
        heardFromSource = "other";
        heardFromOther = legacy;
      }
    }
    return {
      fullName: s("fullName"),
      email: s("email"),
      xUrl: s("xUrl"),
      linkedinUrl: s("linkedinUrl"),
      githubUrl: s("githubUrl"),
      webUrl: s("webUrl"),
      achievements: s("achievements"),
      freeTime: s("freeTime"),
      wantsAmbassador,
      ambassadorMotivation: s("ambassadorMotivation"),
      ambassadorStudyWhere: s("ambassadorStudyWhere"),
      heardFromSource,
      heardFromOther,
    };
  } catch {
    return { ...EMPTY_FIELDS };
  }
}

function writeStoredFields(fields: StoredFields) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fields));
  } catch {
    /* ignore quota / private mode */
  }
}

function clearStoredFields() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

const X_PREFIX = "x.com/";
const LINKEDIN_PREFIX = "linkedin.com/in/";
const GITHUB_PREFIX = "github.com/";

const cellBase = "border-b-[3px] border-hs-ink bg-hs-paper p-4";
const cellLeftSm = `${cellBase} sm:border-r-[3px]`;

const t = {
  title: "Apúntate al hackathon",
  subtitle: "Cuéntanos quién eres — te avisamos sobre HackSpain 2026.",
  backHome: "← Inicio",
  fullName: "Nombre completo",
  email: "Email",
  socialsTitle: "Redes y enlaces",
  socialsRequiredHint: "Añade al menos un enlace (X, LinkedIn, GitHub o tu web).",
  x: "X (Twitter)",
  linkedin: "LinkedIn",
  github: "GitHub",
  web: "Web",
  socialXPlaceholder: "usuario, @usuario o pega un enlace",
  socialLinkedinPlaceholder: "usuario, company/acme o pega un enlace",
  socialGithubPlaceholder: "usuario o usuario/repo — o pega un enlace",
  achievements: "Logros y hitos",
  achievementsHint:
    "Lo que te enorgullece — hackathones, estudios, deporte, voluntariado, arte, trabajo… técnico o no.",
  freeTime: "Fuera del cole / curro",
  freeTimeHint:
    "Hobbies, clubes, asociaciones, side projects, cómo desconectas — lo que te represente.",
  heardFrom: "¿Cómo nos has conocido?",
  heardFromHint: "Elige la opción que mejor encaje (opcional).",
  heardFromOtherPlaceholder: "Cuéntanos cómo nos encontraste…",
  errorHeardFromOther: 'Si eliges «Otro», escribe cómo nos conociste.',
  submit: "Enviar",
  submitting: "Enviando…",
  applicationReceived:
    "¡Gracias! Hemos recibido tu solicitud. Espera nuestra respuesta por correo; te escribiremos en cuanto podamos.",
  alreadyApplied:
    "Ya enviaste una solicitud desde este navegador. Te contestaremos por correo; usa «Volver a solicitar» solo si necesitas mandar otra.",
  applyAgain: "Volver a solicitar",
  errorGeneric: "Algo ha fallado. Prueba otra vez en un momento.",
  errorSocialRequired: "Añade al menos un enlace a perfil o web.",
  errorInvalidSocialUrl:
    "Uno o más enlaces no son válidos para ese campo (revisa X, LinkedIn, GitHub o tu web).",
  errorInvalidEmail: "Introduce un correo electrónico válido.",
  errorAccessDenied:
    "No hemos podido verificar la solicitud. Recarga la página e inténtalo de nuevo, o usa un navegador normal con JavaScript activado.",
  ambassadorCheckboxBefore: "Quiero participar como ",
  ambassadorCheckboxLink: "embajador/a",
  ambassadorCheckboxAfter: "",
  ambassadorWhyLabel: "¿Por qué quieres ser embajador/a?",
  ambassadorWhyHint:
    "Unas frases sobre qué te mueve — comunidad, tech, tu campus, llegar a gente nueva…",
  ambassadorStudyLabel: "¿Dónde estudias?",
  ambassadorStudyHint: "Universidad, bootcamp, centro u organización — lo que encaje.",
  errorAmbassadorMotivation: "Cuéntanos por qué quieres ser embajador/a.",
  errorAmbassadorStudyWhere: "Indica dónde estudias.",
  errorFullName: "Indica tu nombre completo.",
  legalSubmitNoticeBefore: "Al enviar este formulario aceptas nuestra ",
  legalPrivacyLinkLabel: "política de privacidad",
  legalSubmitNoticeAfter:
    ", incluida la comunicación de tus datos a patrocinadores oficiales de HackSpain según se indica allí.",
} as const;

function ambassadorQueryEnabled(): boolean {
  if (typeof window === "undefined") return false;
  const v = new URLSearchParams(window.location.search).get("ambassador");
  return v === "1" || v === "true" || v === "yes";
}

export function SignupPage() {
  const profile = useLayoutProfile();
  const homeHref = "/";
  const ambassadorPageHref = "/ambassador";
  const privacyHref = "/privacy";

  const appliedOnLoad = readAppliedFlag();
  const initialFields = appliedOnLoad ? EMPTY_FIELDS : readStoredFields();
  const [fullName, setFullName] = useState(initialFields.fullName);
  const [email, setEmail] = useState(initialFields.email);
  const [xUrl, setXUrl] = useState(initialFields.xUrl);
  const [linkedinUrl, setLinkedinUrl] = useState(initialFields.linkedinUrl);
  const [githubUrl, setGithubUrl] = useState(initialFields.githubUrl);
  const [webUrl, setWebUrl] = useState(initialFields.webUrl);
  const [achievements, setAchievements] = useState(initialFields.achievements);
  const [freeTime, setFreeTime] = useState(initialFields.freeTime);
  const [wantsAmbassador, setWantsAmbassador] = useState(initialFields.wantsAmbassador);
  const [ambassadorMotivation, setAmbassadorMotivation] = useState(
    initialFields.ambassadorMotivation,
  );
  const [ambassadorStudyWhere, setAmbassadorStudyWhere] = useState(
    initialFields.ambassadorStudyWhere,
  );
  const [heardFromSource, setHeardFromSource] = useState(initialFields.heardFromSource);
  const [heardFromOther, setHeardFromOther] = useState(initialFields.heardFromOther);
  const [status, setStatus] = useState<FlowStatus>(() => (appliedOnLoad ? "alreadyApplied" : "idle"));
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (ambassadorQueryEnabled()) setWantsAmbassador(true);
  }, []);

  useEffect(() => {
    if (import.meta.env.PROD) {
      initBotId({
        protect: [{ path: "/api/signup", method: "POST" }],
      });
    }
  }, []);

  function applyAgain() {
    clearAppliedFlag();
    clearStoredFields();
    setFullName("");
    setEmail("");
    setXUrl("");
    setLinkedinUrl("");
    setGithubUrl("");
    setWebUrl("");
    setAchievements("");
    setFreeTime("");
    setWantsAmbassador(false);
    setAmbassadorMotivation("");
    setAmbassadorStudyWhere("");
    setHeardFromSource("");
    setHeardFromOther("");
    setErrorMessage("");
    setStatus("idle");
  }

  useEffect(() => {
    if (status === "success" || status === "alreadyApplied") return;
    writeStoredFields({
      fullName,
      email,
      xUrl,
      linkedinUrl,
      githubUrl,
      webUrl,
      achievements,
      freeTime,
      wantsAmbassador,
      ambassadorMotivation,
      ambassadorStudyWhere,
      heardFromSource,
      heardFromOther,
    });
  }, [
    fullName,
    email,
    xUrl,
    linkedinUrl,
    githubUrl,
    webUrl,
    achievements,
    freeTime,
    wantsAmbassador,
    ambassadorMotivation,
    ambassadorStudyWhere,
    heardFromSource,
    heardFromOther,
    status,
  ]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");
    const payload = {
      fullName,
      email,
      xUrl,
      linkedinUrl,
      githubUrl,
      webUrl,
      achievements,
      freeTime,
      wantsAmbassador,
      ambassadorMotivation,
      ambassadorStudyWhere,
      heardFromSource,
      heardFromOther,
    };
    const parsed = parseSignupBodyClient(payload);
    if (!parsed.ok) {
      if (parsed.code === "social_required") {
        setErrorMessage(t.errorSocialRequired);
      } else if (parsed.code === "invalid_social_url") {
        setErrorMessage(t.errorInvalidSocialUrl);
      } else if (parsed.code === "invalid_email") {
        setErrorMessage(t.errorInvalidEmail);
      } else if (parsed.code === "ambassador_motivation") {
        setErrorMessage(t.errorAmbassadorMotivation);
      } else if (parsed.code === "ambassador_study_where") {
        setErrorMessage(t.errorAmbassadorStudyWhere);
      } else if (parsed.code === "fullName") {
        setErrorMessage(t.errorFullName);
      } else if (parsed.code === "heard_from_other") {
        setErrorMessage(t.errorHeardFromOther);
      } else {
        setErrorMessage(t.errorGeneric);
      }
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (res.ok) {
        clearStoredFields();
        setAppliedFlag();
        setStatus("success");
        return;
      }
      if (res.status === 403) {
        setErrorMessage(t.errorAccessDenied);
      } else if (res.status === 409) {
        setErrorMessage(t.errorInvalidEmail);
      } else if (data.error === "social_required") {
        setErrorMessage(t.errorSocialRequired);
      } else if (data.error === "invalid_social_url") {
        setErrorMessage(t.errorInvalidSocialUrl);
      } else if (data.error === "ambassador_motivation_required") {
        setErrorMessage(t.errorAmbassadorMotivation);
      } else if (data.error === "ambassador_study_where_required") {
        setErrorMessage(t.errorAmbassadorStudyWhere);
      } else if (data.error === "fullName_required") {
        setErrorMessage(t.errorFullName);
      } else if (data.error === "heard_from_other_required") {
        setErrorMessage(t.errorHeardFromOther);
      } else if (data.error === "invalid_email") {
        setErrorMessage(t.errorInvalidEmail);
      } else {
        setErrorMessage(t.errorGeneric);
      }
      setStatus("error");
    } catch {
      setErrorMessage(t.errorGeneric);
      setStatus("error");
    }
  }

  return (
    <div className="relative z-0 min-h-dvh w-full">
      <MosaicBackground
        className="pointer-events-none fixed inset-0 -z-10 h-full min-h-dvh w-full"
        variant={profile}
      />
      <div className="relative z-0 mx-auto max-w-5xl px-3 pb-6 sm:px-4 sm:pb-10">
        <div className="grid grid-cols-1 gap-0 border-[3px] border-hs-ink bg-hs-ink">
          <div className="border-b-[3px] border-hs-ink bg-hs-orange px-4 py-5">
            <h1 className="font-bungee text-2xl leading-tight text-hs-ink sm:text-3xl">
              {t.title}
            </h1>
            <p className="mt-2 max-w-xl font-sans text-base font-semibold leading-snug text-hs-ink sm:text-lg">
              {t.subtitle}
            </p>
          </div>

          <div className="bg-hs-paper">
            {status === "success" || status === "alreadyApplied" ? (
              <div className="flex min-h-[min(52vh,440px)] flex-col items-center justify-center gap-8 border-t-[3px] border-hs-ink bg-gradient-to-b from-hs-paper/90 to-hs-sand/50 px-6 py-12 text-center sm:min-h-[min(48vh,480px)] sm:px-10 sm:py-16">
                <img
                  src="/happy_quijote.png"
                  alt=""
                  width={320}
                  height={320}
                  decoding="async"
                  className="h-auto w-[min(88vw,260px)] max-h-[min(42vh,300px)] object-contain object-bottom drop-shadow-[2px_3px_0_var(--color-hs-ink)]"
                />
                <div className="flex max-w-lg flex-col items-center gap-6">
                  <p className="font-sans text-lg font-bold leading-snug text-hs-ink sm:text-xl">
                    {status === "alreadyApplied" ? t.alreadyApplied : t.applicationReceived}
                  </p>
                  <div className="flex w-full flex-row flex-wrap items-center justify-center gap-3 sm:gap-4">
                    <ButtonLink href={homeHref} variant="gold" size="success">
                      {t.backHome.replace(/^\u2190\s*/, "").replace(/^←\s*/, "").trim() || t.backHome}
                    </ButtonLink>
                    <Button type="button" variant="teal" size="success" onClick={applyAgain}>
                      {t.applyAgain}
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="flex flex-col gap-0 border-t-[3px] border-hs-ink"
              >
                <div className="grid gap-0 sm:grid-cols-2">
                  <FormField
                    id="signup-full-name"
                    label={t.fullName}
                    required
                    className={cellLeftSm}
                  >
                    <Input
                      name="fullName"
                      autoComplete="name"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </FormField>
                  <FormField id="signup-email" label={t.email} required className={cellBase}>
                    <Input
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormField>
                </div>

                <div className="border-b-[3px] border-hs-ink bg-hs-teal/25 px-4 py-3">
                  <p className="font-bungee text-base tracking-wide text-hs-ink sm:text-lg">
                    {t.socialsTitle}
                  </p>
                  <p className="mt-1 font-sans text-sm font-semibold text-hs-ink sm:text-base">
                    {t.socialsRequiredHint}
                  </p>
                </div>
                <div className="grid gap-0 sm:grid-cols-2">
                  <FormField
                    id="signup-x-url"
                    label={t.x}
                    labelVariant="sans"
                    className={cellLeftSm}
                  >
                    <SocialPrefixInput
                      name="xUrl"
                      prefix={X_PREFIX}
                      profileKind="x"
                      value={xUrl}
                      onChange={setXUrl}
                      placeholder={t.socialXPlaceholder}
                    />
                  </FormField>
                  <FormField
                    id="signup-linkedin-url"
                    label={t.linkedin}
                    labelVariant="sans"
                    className={cellBase}
                  >
                    <SocialPrefixInput
                      name="linkedinUrl"
                      prefix={LINKEDIN_PREFIX}
                      profileKind="linkedin"
                      value={linkedinUrl}
                      onChange={setLinkedinUrl}
                      placeholder={t.socialLinkedinPlaceholder}
                    />
                  </FormField>
                  <FormField
                    id="signup-github-url"
                    label={t.github}
                    labelVariant="sans"
                    className={cellLeftSm}
                  >
                    <SocialPrefixInput
                      name="githubUrl"
                      prefix={GITHUB_PREFIX}
                      profileKind="github"
                      value={githubUrl}
                      onChange={setGithubUrl}
                      placeholder={t.socialGithubPlaceholder}
                    />
                  </FormField>
                  <FormField id="signup-web-url" label={t.web} labelVariant="sans" className={cellBase}>
                    <Input
                      name="webUrl"
                      type="text"
                      inputMode="url"
                      autoComplete="url"
                      placeholder="yoursite.com or https://..."
                      value={webUrl}
                      onChange={(e) => setWebUrl(e.target.value)}
                      onBlur={(e) => {
                        const norm = normalizeSocialUrl(e.target.value.trim(), "web");
                        if (norm) setWebUrl(norm);
                      }}
                      onPaste={(e) => {
                        e.preventDefault();
                        const raw = e.clipboardData.getData("text/plain");
                        const line =
                          raw
                            .split(/\r?\n/)
                            .map((l) => l.trim())
                            .find((l) => l.length > 0) ?? "";
                        if (!line) return;
                        const norm = normalizeSocialUrl(line, "web");
                        setWebUrl(norm || line);
                      }}
                    />
                  </FormField>
                </div>

                <FormField
                  id="signup-achievements"
                  label={t.achievements}
                  hint={t.achievementsHint}
                  className={cellBase}
                >
                  <Textarea
                    className="min-h-[120px] resize-y"
                    name="achievements"
                    rows={5}
                    value={achievements}
                    onChange={(e) => setAchievements(e.target.value)}
                  />
                </FormField>

                <FormField
                  id="signup-free-time"
                  label={t.freeTime}
                  hint={t.freeTimeHint}
                  className={cellBase}
                >
                  <Textarea
                    className="min-h-[120px] resize-y"
                    name="freeTime"
                    rows={5}
                    value={freeTime}
                    onChange={(e) => setFreeTime(e.target.value)}
                  />
                </FormField>

                <FormField
                  id="signup-heard-from"
                  label={t.heardFrom}
                  hint={t.heardFromHint}
                  className={cellBase}
                >
                  <fieldset className="min-w-0 border-0 p-0">
                    <legend className="sr-only">{t.heardFrom}</legend>
                    <div className="grid grid-cols-2 gap-1.5 min-[520px]:grid-cols-3 md:grid-cols-4">
                      {HEARD_FROM_OPTIONS.map((opt) => (
                        <label
                          key={opt.id}
                          htmlFor={`signup-heard-from-${opt.id}`}
                          className="flex cursor-pointer items-start gap-1.5 rounded-sm border-[3px] border-hs-ink bg-hs-paper px-2 py-1.5 shadow-[2px_2px_0_0_var(--color-hs-ink)] transition-[background-color,box-shadow] has-[:focus-visible]:border-hs-navy hover:bg-hs-sand/40 has-[:checked]:bg-hs-gold/35"
                        >
                          <div className="relative mt-px h-4 w-4 shrink-0">
                            <input
                              id={`signup-heard-from-${opt.id}`}
                              name="heardFromSource"
                              type="radio"
                              value={opt.id}
                              checked={heardFromSource === opt.id}
                              onChange={() => {
                                setHeardFromSource(opt.id);
                                if (opt.id !== "other") setHeardFromOther("");
                              }}
                              className="peer absolute inset-0 z-10 h-4 w-4 cursor-pointer appearance-none opacity-0"
                            />
                            <div
                              className="pointer-events-none flex h-4 w-4 items-center justify-center rounded-full border-2 border-hs-ink bg-hs-paper peer-checked:bg-hs-gold [&_span]:opacity-0 peer-checked:[&_span]:opacity-100 [&_span]:transition-opacity"
                              aria-hidden
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-hs-ink" />
                            </div>
                          </div>
                          <span className="min-w-0 font-sans text-xs font-semibold leading-tight text-hs-ink sm:text-sm">
                            {opt.label}
                          </span>
                        </label>
                      ))}
                    </div>
                    {heardFromSource === "other" ? (
                      <div className="mt-3">
                        <Input
                          id="signup-heard-from-other"
                          name="heardFromOther"
                          type="text"
                          autoComplete="off"
                          placeholder={t.heardFromOtherPlaceholder}
                          value={heardFromOther}
                          onChange={(e) => setHeardFromOther(e.target.value)}
                          aria-required
                        />
                      </div>
                    ) : null}
                  </fieldset>
                </FormField>

                <div className="border-b-[3px] border-hs-ink bg-hs-teal/15 px-4 py-4">
                  <div className="flex items-start gap-3">
                    <div className="relative mt-0.5 h-6 w-6 shrink-0">
                      <input
                        id="signup-wants-ambassador"
                        name="wantsAmbassador"
                        type="checkbox"
                        checked={wantsAmbassador}
                        onChange={(e) => setWantsAmbassador(e.target.checked)}
                        className="peer absolute inset-0 z-10 h-6 w-6 cursor-pointer appearance-none opacity-0"
                      />
                      <div
                        className="pointer-events-none flex h-6 w-6 items-center justify-center rounded-sm border-[3px] border-hs-ink bg-hs-paper shadow-[2px_2px_0_0_var(--color-hs-ink)] transition-[background-color,box-shadow,border-color] duration-200 peer-hover:bg-hs-sand/55 peer-focus-visible:border-hs-navy peer-checked:bg-hs-gold [&_svg]:opacity-0 [&_svg]:transition-opacity [&_svg]:duration-200 [&_svg]:ease-out peer-checked:[&_svg]:opacity-100"
                        aria-hidden
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-hs-ink"
                        >
                          <path
                            d="M2.5 7.2 5.6 10.3 11.5 3.8"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="min-w-0 font-sans text-base font-semibold leading-snug text-hs-ink sm:text-[1.05rem]">
                      <label htmlFor="signup-wants-ambassador" className="cursor-pointer">
                        {t.ambassadorCheckboxBefore}
                      </label>
                      <a
                        href={ambassadorPageHref}
                        className="font-extrabold text-hs-navy underline decoration-2 underline-offset-2 hover:text-hs-ink"
                      >
                        {t.ambassadorCheckboxLink}
                      </a>
                      <label htmlFor="signup-wants-ambassador" className="cursor-pointer">
                        {t.ambassadorCheckboxAfter}
                      </label>
                    </div>
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {wantsAmbassador ? (
                    <motion.div
                      key="signup-ambassador-fields"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden border-b-[3px] border-hs-ink"
                    >
                      <div className="grid gap-0">
                        <FormField
                          id="signup-ambassador-motivation"
                          label={t.ambassadorWhyLabel}
                          hint={t.ambassadorWhyHint}
                          required
                          className={cellBase}
                        >
                          <Textarea
                            className="min-h-[100px] resize-y"
                            name="ambassadorMotivation"
                            rows={4}
                            value={ambassadorMotivation}
                            onChange={(e) => setAmbassadorMotivation(e.target.value)}
                          />
                        </FormField>
                        <FormField
                          id="signup-ambassador-study"
                          label={t.ambassadorStudyLabel}
                          hint={t.ambassadorStudyHint}
                          required
                          className="bg-hs-paper p-4"
                        >
                          <Input
                            name="ambassadorStudyWhere"
                            autoComplete="organization"
                            value={ambassadorStudyWhere}
                            onChange={(e) => setAmbassadorStudyWhere(e.target.value)}
                          />
                        </FormField>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                {status === "error" && errorMessage ? (
                  <div
                    className="border-b-[3px] border-hs-ink bg-hs-red/20 px-4 py-3 font-sans text-base font-bold text-hs-ink"
                    role="alert"
                  >
                    {errorMessage}
                  </div>
                ) : null}

                <div className="flex flex-col gap-4 bg-hs-sand/30 p-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                  <p className="max-w-xl font-sans text-xs font-semibold leading-snug text-hs-ink sm:max-w-md sm:text-sm">
                    {t.legalSubmitNoticeBefore}
                    <a
                      href={`${privacyHref}#privacy-policy`}
                      className="font-extrabold text-hs-navy underline decoration-2 underline-offset-2 hover:text-hs-ink"
                    >
                      {t.legalPrivacyLinkLabel}
                    </a>
                    {t.legalSubmitNoticeAfter}
                  </p>
                  <Button
                    type="submit"
                    variant="gold"
                    disabled={status === "submitting"}
                    className="shrink-0 self-end sm:self-auto"
                  >
                    {status === "submitting" ? t.submitting : t.submit}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
