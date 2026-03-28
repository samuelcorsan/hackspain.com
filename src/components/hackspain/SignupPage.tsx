import { useEffect, useState } from "react";
import { initBotId } from "botid/client/core";
import { MosaicBackground } from "./MosaicBackground";
import { getCopy } from "../../i18n/copy";
import type { Locale } from "../../i18n/locales";
import { parseSignupBodyClient } from "../../lib/signupValidation";
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
};

function readStoredFields(): StoredFields {
  if (typeof window === "undefined") return { ...EMPTY_FIELDS };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...EMPTY_FIELDS };
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
      achievements: s("achievements"),
      freeTime: s("freeTime"),
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

const inputClass =
  "w-full rounded-sm border-[3px] border-hs-ink bg-hs-paper px-2 py-2 text-base text-hs-ink outline-none [color-scheme:light] placeholder:text-hs-ink/42 selection:bg-hs-gold/50 selection:text-hs-ink focus-visible:ring-2 focus-visible:ring-hs-navy focus-visible:ring-offset-2 focus-visible:ring-offset-hs-paper [&:-webkit-autofill]:[-webkit-text-fill-color:var(--color-hs-ink)] [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_var(--color-hs-paper)]";

const sansLabelClass = "font-sans text-sm font-extrabold text-hs-ink sm:text-base";
const hintClass = "font-sans text-sm leading-snug text-hs-brown sm:text-[0.95rem]";

const X_PREFIX = "x.com/";
const LINKEDIN_PREFIX = "linkedin.com/";
const GITHUB_PREFIX = "github.com/";

const socialComboWrapClass =
  "flex w-full min-w-0 rounded-sm border-[3px] border-hs-ink bg-hs-paper focus-within:ring-2 focus-within:ring-hs-navy focus-within:ring-offset-2 focus-within:ring-offset-hs-paper [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_var(--color-hs-paper)]";

const socialPrefixClass =
  "inline-flex shrink-0 items-center self-stretch whitespace-nowrap border-r-[3px] border-hs-ink bg-hs-sand/45 px-2 font-mono text-[clamp(0.62rem,2.2vw,0.8125rem)] font-bold leading-tight tracking-tight text-hs-ink select-none sm:px-2.5 sm:text-sm";

const socialInnerInputClass =
  "font-sans min-w-0 flex-1 border-0 bg-transparent px-2 py-2 text-base text-hs-ink outline-none [color-scheme:light] placeholder:text-hs-ink/42 selection:bg-hs-gold/50 selection:text-hs-ink focus:ring-0 focus-visible:ring-0 [&:-webkit-autofill]:[-webkit-text-fill-color:var(--color-hs-ink)]";

type SocialPrefixInputProps = {
  id: string;
  name: string;
  prefix: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

function SocialPrefixInput({ id, name, prefix, value, onChange, placeholder }: SocialPrefixInputProps) {
  return (
    <div className={socialComboWrapClass}>
      <span className={socialPrefixClass} aria-hidden="true">
        {prefix}
      </span>
      <input
        id={id}
        className={socialInnerInputClass}
        name={name}
        type="text"
        inputMode="text"
        autoComplete="off"
        spellCheck={false}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

type Props = { locale: Locale };

export function SignupPage({ locale }: Props) {
  const t = getCopy(locale).signup;
  const profile = useLayoutProfile();
  const homeHref = locale === "es" ? "/es" : "/";

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
  const [status, setStatus] = useState<FlowStatus>(() => (appliedOnLoad ? "alreadyApplied" : "idle"));
  const [errorMessage, setErrorMessage] = useState("");

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
    setErrorMessage("");
    setStatus("idle");
  }

  useEffect(() => {
    initBotId({
      protect: [{ path: "/api/signup", method: "POST" }],
    });
  }, []);

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
    };
    const parsed = parseSignupBodyClient(payload);
    if (!parsed.ok) {
      if (parsed.code === "social_required") {
        setErrorMessage(t.errorSocialRequired);
      } else if (parsed.code === "invalid_social_url") {
        setErrorMessage(t.errorInvalidSocialUrl);
      } else if (parsed.code === "invalid_email") {
        setErrorMessage(t.errorInvalidEmail);
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
        setErrorMessage(t.errorDuplicate);
      } else if (data.error === "social_required") {
        setErrorMessage(t.errorSocialRequired);
      } else if (data.error === "invalid_social_url") {
        setErrorMessage(t.errorInvalidSocialUrl);
      } else {
        setErrorMessage(typeof data.error === "string" ? data.error : t.errorGeneric);
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
                    <a
                      href={homeHref}
                      className="inline-flex min-w-[8rem] flex-1 items-center justify-center border-[3px] border-hs-ink bg-hs-gold px-5 py-2.5 font-bungee text-sm text-hs-ink transition-[filter] hover:brightness-95 sm:flex-initial"
                    >
                      {t.backHome.replace(/^\u2190\s*/, "").replace(/^←\s*/, "").trim() || t.backHome}
                    </a>
                    <button
                      type="button"
                      onClick={applyAgain}
                      className="inline-flex min-w-[8rem] flex-1 items-center justify-center border-[3px] border-hs-ink bg-hs-teal/35 px-5 py-2.5 font-bungee text-sm text-hs-ink transition-[filter] hover:brightness-95 sm:flex-initial"
                    >
                      {t.applyAgain}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="flex flex-col gap-0 border-t-[3px] border-hs-ink"
              >
                <div className="grid gap-0 sm:grid-cols-2">
                  <label className="flex flex-col gap-1 border-b-[3px] border-hs-ink bg-hs-paper p-4 sm:border-r-[3px]">
                    <span className="font-bungee text-sm tracking-wide text-hs-ink">
                      {t.fullName} *
                    </span>
                    <input
                      className={inputClass}
                      name="fullName"
                      autoComplete="name"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </label>
                  <label className="flex flex-col gap-1 border-b-[3px] border-hs-ink bg-hs-paper p-4">
                    <span className="font-bungee text-sm tracking-wide text-hs-ink">
                      {t.email} *
                    </span>
                    <input
                      className={inputClass}
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </label>
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
                  <label className="flex flex-col gap-1 border-b-[3px] border-hs-ink bg-hs-paper p-4 sm:border-r-[3px]">
                    <span className={sansLabelClass}>{t.x}</span>
                    <SocialPrefixInput
                      id="signup-x-url"
                      name="xUrl"
                      prefix={X_PREFIX}
                      value={xUrl}
                      onChange={setXUrl}
                      placeholder={t.socialXPlaceholder}
                    />
                  </label>
                  <label className="flex flex-col gap-1 border-b-[3px] border-hs-ink bg-hs-paper p-4">
                    <span className={sansLabelClass}>{t.linkedin}</span>
                    <SocialPrefixInput
                      id="signup-linkedin-url"
                      name="linkedinUrl"
                      prefix={LINKEDIN_PREFIX}
                      value={linkedinUrl}
                      onChange={setLinkedinUrl}
                      placeholder={t.socialLinkedinPlaceholder}
                    />
                  </label>
                  <label className="flex flex-col gap-1 border-b-[3px] border-hs-ink bg-hs-paper p-4 sm:border-r-[3px]">
                    <span className={sansLabelClass}>{t.github}</span>
                    <SocialPrefixInput
                      id="signup-github-url"
                      name="githubUrl"
                      prefix={GITHUB_PREFIX}
                      value={githubUrl}
                      onChange={setGithubUrl}
                      placeholder={t.socialGithubPlaceholder}
                    />
                  </label>
                  <label className="flex flex-col gap-1 border-b-[3px] border-hs-ink bg-hs-paper p-4">
                    <span className={sansLabelClass}>{t.web}</span>
                    <input
                      className={inputClass}
                      name="webUrl"
                      type="text"
                      inputMode="url"
                      autoComplete="url"
                      placeholder="yoursite.com or https://..."
                      value={webUrl}
                      onChange={(e) => setWebUrl(e.target.value)}
                    />
                  </label>
                </div>

                <label className="flex flex-col gap-1 border-b-[3px] border-hs-ink bg-hs-paper p-4">
                  <span className="font-bungee text-sm tracking-wide text-hs-ink">
                    {t.achievements}
                  </span>
                  <span className={hintClass}>{t.achievementsHint}</span>
                  <textarea
                    className={`${inputClass} min-h-[120px] resize-y`}
                    name="achievements"
                    rows={5}
                    value={achievements}
                    onChange={(e) => setAchievements(e.target.value)}
                  />
                </label>

                <label className="flex flex-col gap-1 border-b-[3px] border-hs-ink bg-hs-paper p-4">
                  <span className="font-bungee text-sm tracking-wide text-hs-ink">
                    {t.freeTime}
                  </span>
                  <span className={hintClass}>{t.freeTimeHint}</span>
                  <textarea
                    className={`${inputClass} min-h-[120px] resize-y`}
                    name="freeTime"
                    rows={5}
                    value={freeTime}
                    onChange={(e) => setFreeTime(e.target.value)}
                  />
                </label>

                {status === "error" && errorMessage ? (
                  <div
                    className="border-b-[3px] border-hs-ink bg-hs-red/20 px-4 py-3 font-sans text-base font-bold text-hs-ink"
                    role="alert"
                  >
                    {errorMessage}
                  </div>
                ) : null}

                <div className="flex justify-end bg-hs-sand/30 p-4">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="border-[3px] border-hs-ink bg-hs-gold px-6 py-2.5 font-bungee text-sm text-hs-ink hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "submitting" ? t.submitting : t.submit}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
