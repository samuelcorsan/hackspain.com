import {
  addBreadcrumb,
  captureException,
  captureMessage,
  getCurrentScope,
  startSpan,
  withScope,
} from "@sentry/astro";
import { initBotId } from "botid/client/core";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  Controller,
  type SubmitHandler,
  useForm,
  useWatch,
} from "react-hook-form";
import { HACKSPAIN_SOCIAL_URLS } from "../../data/landing-meta";
import {
  normalizeSocialUrl,
  parsePreSignupBodyClient,
} from "../../lib/signup-validation";
import { FormField, Input, SocialPrefixInput } from "../form";
import { X_SVG } from "../theme/constants";
import { Button, ButtonLink } from "../ui/button";

const STORAGE_KEY = "hackspain-presignup-draft-v1";
const STORAGE_APPLIED_KEY = "hackspain-presignup-applied-v1";

const UNICODE_LEFT_ARROW_PREFIX_RE = /^←\s*/;
const ASCII_LEFT_ARROW_PREFIX_RE = /^←\s*/;
const LINE_BREAK_SPLIT_RE = /\r?\n/;

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

interface StoredFields {
  email: string;
  fullName: string;
  githubUrl: string;
  linkedinUrl: string;
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
    return {
      fullName: s("fullName"),
      email: s("email"),
      xUrl: s("xUrl"),
      linkedinUrl: s("linkedinUrl"),
      githubUrl: s("githubUrl"),
      webUrl: s("webUrl"),
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
  title: "Pre-inscripción",
  subtitle:
    "Déjanos tus datos básicos — te avisamos para completar la inscripción a HackSpain 2026.",
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
  submit: "Enviar pre-inscripción",
  submitting: "Enviando…",
  applicationReceived:
    "¡Gracias! Hemos recibido tu pre-inscripción. Te avisaremos por correo para completar el registro.",
  alreadyApplied:
    "Ya enviaste una pre-inscripción desde este navegador. Te contactaremos por correo.",
  errorGeneric: "Algo ha fallado. Prueba otra vez en un momento.",
  errorSocialRequired: "Añade al menos un enlace a perfil o web.",
  errorInvalidSocialUrl:
    "Uno o más enlaces no son válidos para ese campo (revisa X, LinkedIn, GitHub o tu web).",
  errorInvalidEmail: "Introduce un correo electrónico válido.",
  errorDuplicateEmail:
    "Ya hay una solicitud con este correo. Si necesitas cambiar algo, escríbenos o usa otro email.",
  errorAccessDenied:
    "No hemos podido verificar la solicitud. Recarga la página e inténtalo de nuevo, o usa un navegador normal con JavaScript activado.",
  errorFullName: "Indica tu nombre completo.",
  legalSubmitNoticeBefore: "Al enviar este formulario aceptas nuestra ",
  legalPrivacyLinkLabel: "política de privacidad",
  legalSubmitNoticeAfter:
    ", incluida la comunicación de tus datos a patrocinadores oficiales de HackSpain según se indica allí.",
} as const;

export function PreSignupPage() {
  const homeHref = "/";
  const privacyHref = "/privacy";

  const { register, handleSubmit, control, setValue, reset, formState } =
    useForm<StoredFields>({ defaultValues: { ...EMPTY_FIELDS } });
  const { isSubmitting } = formState;

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
    if (import.meta.env.DEV) {
      return;
    }
    initBotId({
      protect: [{ path: "/api/pre-signup", method: "POST" }],
    });
  }, []);

  useEffect(() => {
    getCurrentScope().setTag("flow", "pre-signup");
  }, []);

  const onSubmitForm: SubmitHandler<StoredFields> = async (data) => {
    setErrorMessage("");

    addBreadcrumb({
      category: "ui",
      message: "pre-signup: submit",
      level: "info",
    });

    const payload = { ...data };
    const parsed = parsePreSignupBodyClient(payload);
    if (!parsed.ok) {
      addBreadcrumb({
        category: "pre-signup",
        message: "client validation",
        data: { code: parsed.code },
        level: "info",
      });
      if (parsed.code === "generic") {
        captureMessage(
          "Pre-signup: client validation failed (generic)",
          "warning"
        );
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
      const res = await startSpan(
        { name: "POST /api/pre-signup", op: "http.client" },
        async (span) => {
          const r = await fetch("/api/pre-signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
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
        addBreadcrumb({
          category: "http",
          type: "http",
          data: { status: res.status, error: resJson.error },
          level: "info",
          message: "pre-signup duplicate email (expected)",
        });
      } else {
        addBreadcrumb({
          category: "http",
          type: "http",
          data: { status: res.status, error: resJson.error },
          level: "error",
        });
        withScope((scope) => {
          scope.setTag("flow", "pre-signup");
          scope.setTag("source", "client");
          scope.setTag("http_status", String(res.status));
          if (resJson.error) {
            scope.setTag("api_error", resJson.error);
          }
          captureMessage(
            `Pre-signup: API rejected ${res.status}${resJson.error ? ` (${resJson.error})` : ""}`,
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
      } else if (resJson.error === "fullName_required") {
        setErrorMessage(t.errorFullName);
      } else if (resJson.error === "invalid_email") {
        setErrorMessage(t.errorInvalidEmail);
      } else {
        setErrorMessage(t.errorGeneric);
      }
      setStatus("error");
    } catch (err) {
      if (err instanceof Error) {
        withScope((scope) => {
          scope.setTag("flow", "pre-signup");
          scope.setTag("source", "client");
          captureException(err);
        });
      } else {
        addBreadcrumb({
          category: "pre-signup",
          message: "submit: caught non-Error (ignored for issues)",
          data: { kind: Object.prototype.toString.call(err) },
          level: "warning",
        });
      }
      setErrorMessage(t.errorGeneric);
      setStatus("error");
    }
  };

  const webReg = register("webUrl");

  return (
    <div className="w-full">
      <div className="relative z-0 mx-auto max-w-6xl px-0 pb-0 sm:px-4 sm:pb-10">
        <div className="grid grid-cols-1 gap-0 border-hs-ink bg-hs-ink sm:border-[3px]">
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
              <div className="flex min-h-[calc(100dvh-3.5rem)] flex-col items-center justify-center gap-8 border-hs-ink border-t-[3px] bg-gradient-to-b from-hs-paper/90 to-hs-sand/50 px-6 py-12 text-center sm:min-h-[min(48vh,480px)] sm:px-10 sm:py-16">
                <img
                  alt=""
                  className="h-auto max-h-[min(42vh,300px)] w-[min(88vw,260px)] object-contain object-bottom drop-shadow-[2px_3px_0_var(--color-hs-ink)]"
                  decoding="async"
                  height={320}
                  src="/happy_quijote.png"
                  width={320}
                />
                <div className="flex w-full max-w-lg flex-col items-center gap-8">
                  <p className="font-bold font-sans text-hs-ink text-lg leading-snug sm:text-xl">
                    {status === "alreadyApplied"
                      ? t.alreadyApplied
                      : t.applicationReceived}
                  </p>
                  <div className="flex w-full flex-row flex-wrap items-center justify-center gap-3 sm:gap-4">
                    <ButtonLink href={homeHref} size="success" variant="gold">
                      {t.backHome
                        .replace(UNICODE_LEFT_ARROW_PREFIX_RE, "")
                        .replace(ASCII_LEFT_ARROW_PREFIX_RE, "")
                        .trim() || t.backHome}
                    </ButtonLink>
                    <ButtonLink
                      aria-label="Seguir en Twitter a HackSpain"
                      href={HACKSPAIN_SOCIAL_URLS.x}
                      rel="noopener noreferrer"
                      size="success"
                      target="_blank"
                      variant="teal"
                    >
                      <span className="flex items-center gap-2">
                        <span
                          aria-hidden
                          className="h-4 w-4 shrink-0"
                          // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted SVG from ./constants
                          dangerouslySetInnerHTML={{ __html: X_SVG }}
                        />
                        Seguir en Twitter a HackSpain
                      </span>
                    </ButtonLink>
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
                    id="pre-signup-full-name"
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
                    id="pre-signup-email"
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
                    id="pre-signup-x-url"
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
                    id="pre-signup-linkedin-url"
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
                    id="pre-signup-github-url"
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
                    id="pre-signup-web-url"
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
                            .split(LINE_BREAK_SPLIT_RE)
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
