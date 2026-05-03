import * as Sentry from "@sentry/astro";
import { initBotId } from "botid/client/core";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Controller,
  type SubmitHandler,
  useForm,
  useWatch,
} from "react-hook-form";
import {
  HEARD_FROM_OPTIONS,
  HEARD_FROM_SOURCE_IDS,
  type HeardFromSourceId,
  normalizeSocialUrl,
  parseSignupBodyClient,
} from "../../lib/signupValidation";
import { FormField, Input, SocialPrefixInput, Textarea } from "./form";
import { MosaicBackground } from "./MosaicBackground";
import { Button, ButtonLink } from "./ui/Button";
import { useLayoutProfile } from "./useLayoutProfile";

const STORAGE_KEY = "hackspain-signup-draft-v1";
const STORAGE_APPLIED_KEY = "hackspain-signup-applied-v1";

type FlowStatus = "idle" | "success" | "error" | "alreadyApplied";

function readAppliedFlag(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
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

interface StoredFields {
  achievements: string;
  ambassadorMotivation: string;
  ambassadorStudyWhere: string;
  email: string;
  freeTime: string;
  fullName: string;
  githubUrl: string;
  heardFromOther: string;
  heardFromSource: HeardFromSourceId | "";
  linkedinUrl: string;
  wantsAmbassador: boolean;
  webUrl: string;
  xUrl: string;
}

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
  if (typeof window === "undefined") {
    return { ...EMPTY_FIELDS };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { ...EMPTY_FIELDS };
    }
    const o = JSON.parse(raw) as Record<string, unknown>;
    const s = (k: keyof StoredFields) =>
      typeof o[k] === "string" ? (o[k] as string) : "";
    const wantsAmbassador =
      o.wantsAmbassador === true || o.wantsAmbassador === "true";
    const ids = HEARD_FROM_SOURCE_IDS as readonly string[];
    const sourceRaw =
      typeof o.heardFromSource === "string" ? o.heardFromSource.trim() : "";
    let heardFromSource: HeardFromSourceId | "" =
      sourceRaw !== "" && ids.includes(sourceRaw)
        ? (sourceRaw as HeardFromSourceId)
        : "";
    let heardFromOther =
      typeof o.heardFromOther === "string" ? o.heardFromOther : "";
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
  socialsRequiredHint:
    "Añade al menos un enlace (X, LinkedIn, GitHub o tu web).",
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
  heardFromOtherPlaceholder: "Cuéntanos cómo nos encontraste…",
  submit: "Enviar",
  submitting: "Enviando…",
  applicationReceived:
    "¡Gracias! Hemos recibido tu solicitud. Espera nuestra respuesta por correo; te escribiremos en cuanto podamos.",
  alreadyApplied:
    "Ya enviaste una solicitud desde este navegador. Te contactaremos por correo; usa «Volver a solicitar» solo si necesitas mandar otra.",
  applyAgain: "Volver a solicitar",
  errorGeneric: "Algo ha fallado. Prueba otra vez en un momento.",
  errorSocialRequired: "Añade al menos un enlace a perfil o web.",
  errorInvalidSocialUrl:
    "Uno o más enlaces no son válidos para ese campo (revisa X, LinkedIn, GitHub o tu web).",
  errorInvalidEmail: "Introduce un correo electrónico válido.",
  errorDuplicateEmail:
    "Ya hay una solicitud con este correo. Si necesitas cambiar algo, escríbenos o usa otro email.",
  errorAccessDenied:
    "No hemos podido verificar la solicitud. Recarga la página e inténtalo de nuevo, o usa un navegador normal con JavaScript activado.",
  ambassadorCheckboxBefore: "Quiero participar como ",
  ambassadorCheckboxLink: "embajador/a",
  ambassadorCheckboxAfter: "",
  ambassadorWhyLabel: "¿Por qué quieres ser embajador/a?",
  ambassadorWhyHint:
    "Unas frases sobre qué te mueve — comunidad, tech, tu campus, llegar a gente nueva…",
  ambassadorStudyLabel: "¿Dónde estudias?",
  ambassadorStudyHint:
    "Universidad, bootcamp, centro u organización — lo que encaje.",
  errorFullName: "Indica tu nombre completo.",
  legalSubmitNoticeBefore: "Al enviar este formulario aceptas nuestra ",
  legalPrivacyLinkLabel: "política de privacidad",
  legalSubmitNoticeAfter:
    ", incluida la comunicación de tus datos a patrocinadores oficiales de HackSpain según se indica allí.",
} as const;

function ambassadorQueryEnabled(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  const v = new URLSearchParams(window.location.search).get("ambassador");
  return v === "1" || v === "true" || v === "yes";
}

type SignupAttention = null | "heard" | "ambassador";

export function SignupPage() {
  const profile = useLayoutProfile();
  const homeHref = "/";
  const ambassadorPageHref = "/ambassador";
  const privacyHref = "/privacy";

  const { register, handleSubmit, control, setValue, watch, reset, formState } =
    useForm<StoredFields>({ defaultValues: { ...EMPTY_FIELDS } });
  const { isSubmitting } = formState;
  const heardFromSource = watch("heardFromSource");
  const wantsAmbassador = watch("wantsAmbassador");

  const [attentionTarget, setAttentionTarget] = useState<SignupAttention>(null);
  const heardFromSectionRef = useRef<HTMLDivElement>(null);
  const ambassadorSectionRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<FlowStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useLayoutEffect(() => {
    if (readAppliedFlag()) {
      setStatus("alreadyApplied");
      return;
    }
    reset(readStoredFields());
  }, [reset]);

  const watched = useWatch({ control });
  useEffect(() => {
    if (status === "success" || status === "alreadyApplied") {
      return;
    }
    if (!watched) {
      return;
    }
    writeStoredFields(watched as StoredFields);
  }, [watched, status]);

  useEffect(() => {
    if (ambassadorQueryEnabled()) {
      setValue("wantsAmbassador", true, { shouldDirty: true });
    }
  }, [setValue]);

  useEffect(() => {
    if (import.meta.env.DEV) {
      return;
    }
    initBotId({
      protect: [{ path: "/api/signup", method: "POST" }],
    });
  }, []);

  useEffect(() => {
    Sentry.getCurrentScope().setTag("flow", "signup");
  }, []);

  function pulseAttention(target: "heard" | "ambassador") {
    setErrorMessage("");
    setAttentionTarget(null);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setAttentionTarget(target);
        const el =
          target === "heard"
            ? heardFromSectionRef.current
            : ambassadorSectionRef.current;
        if (!el || typeof window === "undefined") {
          return;
        }
        const smooth = window.matchMedia(
          "(prefers-reduced-motion: no-preference)"
        ).matches;
        el.scrollIntoView({
          behavior: smooth ? "smooth" : "auto",
          block: "center",
        });
      });
    });
  }

  useEffect(() => {
    if (!attentionTarget) {
      return;
    }
    const id = window.setTimeout(() => setAttentionTarget(null), 1400);
    return () => window.clearTimeout(id);
  }, [attentionTarget]);

  function applyAgain() {
    clearAppliedFlag();
    clearStoredFields();
    reset(EMPTY_FIELDS);
    setErrorMessage("");
    setAttentionTarget(null);
    setStatus("idle");
  }

  const onSubmitForm: SubmitHandler<StoredFields> = async (data) => {
    setErrorMessage("");

    Sentry.addBreadcrumb({
      category: "ui",
      message: "signup: submit",
      level: "info",
    });

    if (!data.heardFromSource) {
      Sentry.addBreadcrumb({
        category: "signup",
        message: "no heard from selected",
        level: "info",
      });
      pulseAttention("heard");
      return;
    }
    const payload = { ...data };
    const parsed = parseSignupBodyClient(payload);
    if (!parsed.ok) {
      Sentry.addBreadcrumb({
        category: "signup",
        message: "client validation",
        data: { code: parsed.code },
        level: "info",
      });
      if (parsed.code === "generic") {
        Sentry.captureMessage(
          "Signup: client validation failed (generic)",
          "warning"
        );
      }
      if (parsed.code === "heard_from") {
        pulseAttention("heard");
        return;
      }
      if (parsed.code === "heard_from_other") {
        pulseAttention("heard");
        requestAnimationFrame(() => {
          document.getElementById("signup-heard-from-other")?.focus();
        });
        return;
      }
      if (
        parsed.code === "ambassador_motivation" ||
        parsed.code === "ambassador_study_where"
      ) {
        pulseAttention("ambassador");
        return;
      }
      if (parsed.code === "social_required") {
        setErrorMessage(t.errorSocialRequired);
      } else if (parsed.code === "invalid_social_url") {
        setErrorMessage(t.errorInvalidSocialUrl);
      } else if (parsed.code === "invalid_email") {
        setErrorMessage(t.errorInvalidEmail);
      } else if (parsed.code === "fullName") {
        setErrorMessage(t.errorFullName);
      } else {
        setErrorMessage(t.errorGeneric);
      }
      setStatus("error");
      return;
    }
    try {
      const res = await Sentry.startSpan(
        { name: "POST /api/signup", op: "http.client" },
        async (span) => {
          const r = await fetch("/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            // Same shape as `parseSignupBody` on the server (heardFromSource / heardFromOther).
            body: JSON.stringify(payload),
          });
          span.setAttribute("http.status_code", r.status);
          return r;
        }
      );
      const resJson = (await res.json().catch(() => ({}))) as {
        error?: string;
      };
      if (res.ok) {
        clearStoredFields();
        setAppliedFlag();
        setStatus("success");
        return;
      }
      const isDuplicateEmail =
        res.status === 409 || resJson.error === "duplicate_email";
      if (isDuplicateEmail) {
        Sentry.addBreadcrumb({
          category: "http",
          type: "http",
          data: { status: res.status, error: resJson.error },
          level: "info",
          message: "signup duplicate email (expected)",
        });
      } else {
        Sentry.addBreadcrumb({
          category: "http",
          type: "http",
          data: { status: res.status, error: resJson.error },
          level: "error",
        });
        Sentry.withScope((scope) => {
          scope.setTag("flow", "signup");
          scope.setTag("source", "client");
          scope.setTag("http_status", String(res.status));
          if (resJson.error) {
            scope.setTag("api_error", resJson.error);
          }
          scope.setContext("form", {
            wantsAmbassador: data.wantsAmbassador,
            heardFrom: data.heardFromSource,
          });
          Sentry.captureMessage(
            `Signup: API rejected ${res.status}${resJson.error ? ` (${resJson.error})` : ""}`,
            "error"
          );
        });
      }
      if (res.status === 403) {
        setErrorMessage(t.errorAccessDenied);
      } else if (res.status === 409) {
        setErrorMessage(t.errorDuplicateEmail);
      } else if (resJson.error === "duplicate_email") {
        setErrorMessage(t.errorDuplicateEmail);
      } else if (resJson.error === "social_required") {
        setErrorMessage(t.errorSocialRequired);
      } else if (resJson.error === "invalid_social_url") {
        setErrorMessage(t.errorInvalidSocialUrl);
      } else if (resJson.error === "ambassador_motivation_required") {
        setStatus("error");
        pulseAttention("ambassador");
        return;
      } else if (resJson.error === "ambassador_study_where_required") {
        setStatus("error");
        pulseAttention("ambassador");
        return;
      } else if (resJson.error === "fullName_required") {
        setErrorMessage(t.errorFullName);
      } else if (resJson.error === "heard_from_other_required") {
        setStatus("error");
        pulseAttention("heard");
        requestAnimationFrame(() => {
          document.getElementById("signup-heard-from-other")?.focus();
        });
        return;
      } else if (resJson.error === "heard_from_required") {
        setStatus("error");
        pulseAttention("heard");
        return;
      } else if (resJson.error === "invalid_email") {
        setErrorMessage(t.errorInvalidEmail);
      } else {
        setErrorMessage(t.errorGeneric);
      }
      setStatus("error");
    } catch (err) {
      if (err instanceof Error) {
        Sentry.withScope((scope) => {
          scope.setTag("flow", "signup");
          scope.setTag("source", "client");
          Sentry.captureException(err);
        });
      } else {
        Sentry.addBreadcrumb({
          category: "signup",
          message: "submit: caught non-Error (ignored for issues)",
          data: { kind: Object.prototype.toString.call(err) },
          level: "warning",
        });
      }
      setErrorMessage(t.errorGeneric);
      setStatus("error");
    }
  };

  const webReg = register("webUrl", {
    onChange: () => setAttentionTarget(null),
  });

  return (
    <div className="relative z-0 min-h-dvh w-full">
      <MosaicBackground
        className="pointer-events-none fixed inset-0 -z-10 h-full min-h-dvh w-full"
        variant={profile}
      />
      <div className="relative z-0 mx-auto max-w-6xl px-3 pb-6 sm:px-4 sm:pb-10">
        <div className="grid grid-cols-1 gap-0 border-[3px] border-hs-ink bg-hs-ink">
          <div className="border-hs-ink border-b-[3px] bg-hs-orange px-4 py-5">
            <h1 className="font-bungee text-2xl text-hs-ink leading-tight sm:text-3xl">
              {t.title}
            </h1>
            <p className="mt-2 max-w-xl font-sans font-semibold text-base text-hs-ink leading-snug sm:text-lg">
              {t.subtitle}
            </p>
          </div>

          <div className="bg-hs-paper">
            {status === "success" || status === "alreadyApplied" ? (
              <div className="flex min-h-[min(52vh,440px)] flex-col items-center justify-center gap-8 border-hs-ink border-t-[3px] bg-gradient-to-b from-hs-paper/90 to-hs-sand/50 px-6 py-12 text-center sm:min-h-[min(48vh,480px)] sm:px-10 sm:py-16">
                <img
                  alt=""
                  className="h-auto max-h-[min(42vh,300px)] w-[min(88vw,260px)] object-contain object-bottom drop-shadow-[2px_3px_0_var(--color-hs-ink)]"
                  decoding="async"
                  height={320}
                  src="/happy_quijote.png"
                  width={320}
                />
                <div className="flex max-w-lg flex-col items-center gap-6">
                  <p className="font-bold font-sans text-hs-ink text-lg leading-snug sm:text-xl">
                    {status === "alreadyApplied"
                      ? t.alreadyApplied
                      : t.applicationReceived}
                  </p>
                  <div className="flex w-full flex-row flex-wrap items-center justify-center gap-3 sm:gap-4">
                    <ButtonLink href={homeHref} size="success" variant="gold">
                      {t.backHome
                        .replace(/^\u2190\s*/, "")
                        .replace(/^←\s*/, "")
                        .trim() || t.backHome}
                    </ButtonLink>
                    <Button
                      className="cursor-pointer"
                      onClick={applyAgain}
                      size="success"
                      type="button"
                      variant="teal"
                    >
                      {t.applyAgain}
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <form
                className="flex flex-col gap-0 border-hs-ink border-t-[3px]"
                onSubmit={handleSubmit(onSubmitForm)}
              >
                <div className="grid gap-0 sm:grid-cols-2">
                  <FormField
                    className={cellLeftSm}
                    id="signup-full-name"
                    label={t.fullName}
                    required
                  >
                    <Input
                      autoComplete="name"
                      required
                      {...register("fullName")}
                    />
                  </FormField>
                  <FormField
                    className={cellBase}
                    id="signup-email"
                    label={t.email}
                    required
                  >
                    <Input
                      autoComplete="email"
                      required
                      type="email"
                      {...register("email")}
                    />
                  </FormField>
                </div>

                <div className="border-hs-ink border-b-[3px] bg-hs-teal/25 px-4 py-3">
                  <p className="font-bungee text-base text-hs-ink tracking-wide sm:text-lg">
                    {t.socialsTitle}
                  </p>
                  <p className="mt-1 font-sans font-semibold text-hs-ink text-sm sm:text-base">
                    {t.socialsRequiredHint}
                  </p>
                </div>
                <div className="grid gap-0 sm:grid-cols-2">
                  <FormField
                    className={cellLeftSm}
                    id="signup-x-url"
                    label={t.x}
                    labelVariant="sans"
                  >
                    <Controller
                      control={control}
                      name="xUrl"
                      render={({ field }) => (
                        <SocialPrefixInput
                          name={field.name}
                          onBlur={field.onBlur}
                          onChange={(v) => field.onChange(v)}
                          placeholder={t.socialXPlaceholder}
                          prefix={X_PREFIX}
                          profileKind="x"
                          value={field.value}
                        />
                      )}
                    />
                  </FormField>
                  <FormField
                    className={cellBase}
                    id="signup-linkedin-url"
                    label={t.linkedin}
                    labelVariant="sans"
                  >
                    <Controller
                      control={control}
                      name="linkedinUrl"
                      render={({ field }) => (
                        <SocialPrefixInput
                          name={field.name}
                          onBlur={field.onBlur}
                          onChange={(v) => field.onChange(v)}
                          placeholder={t.socialLinkedinPlaceholder}
                          prefix={LINKEDIN_PREFIX}
                          profileKind="linkedin"
                          value={field.value}
                        />
                      )}
                    />
                  </FormField>
                  <FormField
                    className={cellLeftSm}
                    id="signup-github-url"
                    label={t.github}
                    labelVariant="sans"
                  >
                    <Controller
                      control={control}
                      name="githubUrl"
                      render={({ field }) => (
                        <SocialPrefixInput
                          name={field.name}
                          onBlur={field.onBlur}
                          onChange={(v) => field.onChange(v)}
                          placeholder={t.socialGithubPlaceholder}
                          prefix={GITHUB_PREFIX}
                          profileKind="github"
                          value={field.value}
                        />
                      )}
                    />
                  </FormField>
                  <FormField
                    className={cellBase}
                    id="signup-web-url"
                    label={t.web}
                    labelVariant="sans"
                  >
                    <Input
                      autoComplete="url"
                      inputMode="url"
                      placeholder="yoursite.com or https://..."
                      type="text"
                      {...webReg}
                      onBlur={(e) => {
                        webReg.onBlur(e);
                        const norm = normalizeSocialUrl(
                          e.target.value.trim(),
                          "web"
                        );
                        if (norm) {
                          setValue("webUrl", norm, {
                            shouldValidate: true,
                            shouldTouch: true,
                          });
                        }
                      }}
                      onPaste={(e) => {
                        e.preventDefault();
                        const raw = e.clipboardData.getData("text/plain");
                        const line =
                          raw
                            .split(/\r?\n/)
                            .map((l) => l.trim())
                            .find((l) => l.length > 0) ?? "";
                        if (!line) {
                          return;
                        }
                        const norm = normalizeSocialUrl(line, "web");
                        setValue("webUrl", norm || line, {
                          shouldValidate: true,
                          shouldTouch: true,
                          shouldDirty: true,
                        });
                      }}
                    />
                  </FormField>
                </div>

                <FormField
                  className={cellBase}
                  hint={t.achievementsHint}
                  id="signup-achievements"
                  label={t.achievements}
                >
                  <Textarea
                    className="min-h-[120px] resize-y"
                    rows={5}
                    {...register("achievements")}
                  />
                </FormField>

                <FormField
                  className={cellBase}
                  hint={t.freeTimeHint}
                  id="signup-free-time"
                  label={t.freeTime}
                >
                  <Textarea
                    className="min-h-[120px] resize-y"
                    rows={5}
                    {...register("freeTime")}
                  />
                </FormField>

                <div
                  className={`${cellBase} relative isolate`}
                  ref={heardFromSectionRef}
                >
                  <FormField
                    className="min-w-0 border-0 bg-transparent p-0 shadow-none"
                    id="signup-heard-from"
                    label={t.heardFrom}
                    required
                  >
                    <fieldset className="min-w-0 border-0 p-0">
                      <legend className="sr-only">
                        {t.heardFrom} (obligatorio)
                      </legend>
                      <div className="grid grid-cols-2 gap-1.5 md:grid-cols-4 min-[520px]:grid-cols-3">
                        {HEARD_FROM_OPTIONS.map((opt) => (
                          <label
                            className="flex cursor-pointer items-start gap-1.5 rounded-sm border-[3px] border-hs-ink bg-hs-paper px-2 py-1.5 shadow-[2px_2px_0_0_var(--color-hs-ink)] transition-[background-color,box-shadow] hover:bg-hs-sand/40 has-[:focus-visible]:border-hs-navy has-[:checked]:bg-hs-gold/35"
                            htmlFor={`signup-heard-from-${opt.id}`}
                            key={opt.id}
                          >
                            <div className="relative mt-px h-4 w-4 shrink-0">
                              <input
                                id={`signup-heard-from-${opt.id}`}
                                type="radio"
                                value={opt.id}
                                {...register("heardFromSource", {
                                  onChange: (e) => {
                                    setAttentionTarget(null);
                                    if (e.target.value !== "other") {
                                      setValue("heardFromOther", "", {
                                        shouldDirty: true,
                                      });
                                    }
                                  },
                                })}
                                className="peer absolute inset-0 z-10 h-4 w-4 cursor-pointer appearance-none opacity-0"
                              />
                              <div
                                aria-hidden
                                className="pointer-events-none flex h-4 w-4 items-center justify-center rounded-full border-2 border-hs-ink bg-hs-paper peer-checked:bg-hs-gold [&_span]:opacity-0 [&_span]:transition-opacity peer-checked:[&_span]:opacity-100"
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-hs-ink" />
                              </div>
                            </div>
                            <span className="min-w-0 font-sans font-semibold text-hs-ink text-xs leading-tight sm:text-sm">
                              {opt.label}
                            </span>
                          </label>
                        ))}
                      </div>
                      {heardFromSource === "other" ? (
                        <div className="mt-3">
                          <Input
                            aria-required
                            autoComplete="off"
                            id="signup-heard-from-other"
                            placeholder={t.heardFromOtherPlaceholder}
                            type="text"
                            {...register("heardFromOther", {
                              onChange: () => setAttentionTarget(null),
                            })}
                          />
                        </div>
                      ) : null}
                    </fieldset>
                  </FormField>
                  {attentionTarget === "heard" ? (
                    <div
                      aria-hidden
                      className="hs-signup-field-attention-overlay"
                    />
                  ) : null}
                </div>

                <div className="border-hs-ink border-b-[3px] bg-hs-teal/15 px-4 py-4">
                  <div className="flex items-start gap-3">
                    <div className="relative mt-0.5 h-6 w-6 shrink-0">
                      <input
                        id="signup-wants-ambassador"
                        type="checkbox"
                        {...register("wantsAmbassador", {
                          onChange: () => setAttentionTarget(null),
                        })}
                        className="peer absolute inset-0 z-10 h-6 w-6 cursor-pointer appearance-none opacity-0"
                      />
                      <div
                        aria-hidden
                        className="pointer-events-none flex h-6 w-6 items-center justify-center rounded-sm border-[3px] border-hs-ink bg-hs-paper shadow-[2px_2px_0_0_var(--color-hs-ink)] transition-[background-color,box-shadow,border-color] duration-200 peer-checked:bg-hs-gold peer-hover:bg-hs-sand/55 peer-focus-visible:border-hs-navy [&_svg]:opacity-0 [&_svg]:transition-opacity [&_svg]:duration-200 [&_svg]:ease-out peer-checked:[&_svg]:opacity-100"
                      >
                        <svg
                          className="text-hs-ink"
                          fill="none"
                          height="14"
                          viewBox="0 0 14 14"
                          width="14"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.5 7.2 5.6 10.3 11.5 3.8"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.2"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="min-w-0 font-sans font-semibold text-base text-hs-ink leading-snug sm:text-[1.05rem]">
                      <label
                        className="cursor-pointer"
                        htmlFor="signup-wants-ambassador"
                      >
                        {t.ambassadorCheckboxBefore}
                      </label>
                      <a
                        className="font-extrabold text-hs-navy underline decoration-2 underline-offset-2 hover:text-hs-ink"
                        href={ambassadorPageHref}
                      >
                        {t.ambassadorCheckboxLink}
                      </a>
                      <label
                        className="cursor-pointer"
                        htmlFor="signup-wants-ambassador"
                      >
                        {t.ambassadorCheckboxAfter}
                      </label>
                    </div>
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {wantsAmbassador ? (
                    <motion.div
                      animate={{ opacity: 1, height: "auto" }}
                      className="overflow-hidden border-hs-ink border-b-[3px]"
                      exit={{ opacity: 0, height: 0 }}
                      initial={{ opacity: 0, height: 0 }}
                      key="signup-ambassador-fields"
                      ref={ambassadorSectionRef}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="relative isolate grid gap-0 bg-hs-paper">
                        <FormField
                          className={cellBase}
                          hint={t.ambassadorWhyHint}
                          id="signup-ambassador-motivation"
                          label={t.ambassadorWhyLabel}
                          required
                        >
                          <Textarea
                            className="min-h-[100px] resize-y"
                            rows={4}
                            {...register("ambassadorMotivation", {
                              onChange: () => setAttentionTarget(null),
                            })}
                          />
                        </FormField>
                        <FormField
                          className="bg-hs-paper p-4"
                          hint={t.ambassadorStudyHint}
                          id="signup-ambassador-study"
                          label={t.ambassadorStudyLabel}
                          required
                        >
                          <Input
                            autoComplete="organization"
                            {...register("ambassadorStudyWhere", {
                              onChange: () => setAttentionTarget(null),
                            })}
                          />
                        </FormField>
                        {attentionTarget === "ambassador" ? (
                          <div
                            aria-hidden
                            className="hs-signup-field-attention-overlay"
                          />
                        ) : null}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                {status === "error" && errorMessage ? (
                  <div
                    className="border-hs-ink border-b-[3px] bg-hs-red/20 px-4 py-3 font-bold font-sans text-base text-hs-ink"
                    role="alert"
                  >
                    {errorMessage}
                  </div>
                ) : null}

                <div className="flex flex-col gap-4 bg-hs-sand/30 p-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                  <p className="max-w-xl font-sans font-semibold text-hs-ink text-xs leading-snug sm:max-w-md sm:text-sm">
                    {t.legalSubmitNoticeBefore}
                    <a
                      className="font-extrabold text-hs-navy underline decoration-2 underline-offset-2 hover:text-hs-ink"
                      href={`${privacyHref}#privacy-policy`}
                    >
                      {t.legalPrivacyLinkLabel}
                    </a>
                    {t.legalSubmitNoticeAfter}
                  </p>
                  <Button
                    className="shrink-0 self-end sm:self-auto"
                    disabled={isSubmitting}
                    type="submit"
                    variant="gold"
                  >
                    {isSubmitting ? t.submitting : t.submit}
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
