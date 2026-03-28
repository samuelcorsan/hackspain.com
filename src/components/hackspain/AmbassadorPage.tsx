import { useEffect, useId, useState } from "react";
import { initBotId } from "botid/client/core";
import { parseAmbassadorBodyClient } from "../../lib/ambassadorValidation";
import { getCopy } from "../../i18n/copy";
import type { Locale } from "../../i18n/locales";
import { MosaicBackground } from "./MosaicBackground";
import { useLayoutProfile } from "./useLayoutProfile";

const STORAGE_KEY = "hackspain-ambassador-draft-v1";
const STORAGE_APPLIED_KEY = "hackspain-ambassador-applied-v1";

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
  institution: string;
  cityRegion: string;
  xUrl: string;
  linkedinUrl: string;
  githubUrl: string;
  webUrl: string;
  motivation: string;
  outreachPlan: string;
};

const EMPTY_FIELDS: StoredFields = {
  fullName: "",
  email: "",
  institution: "",
  cityRegion: "",
  xUrl: "",
  linkedinUrl: "",
  githubUrl: "",
  webUrl: "",
  motivation: "",
  outreachPlan: "",
};

function readStoredFields(): StoredFields {
  if (typeof window === "undefined") return { ...EMPTY_FIELDS };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...EMPTY_FIELDS };
    const o = JSON.parse(raw) as Record<string, unknown>;
    const s = (k: keyof StoredFields) => (typeof o[k] === "string" ? (o[k] as string) : "");
    return {
      fullName: s("fullName"),
      email: s("email"),
      institution: s("institution"),
      cityRegion: s("cityRegion"),
      xUrl: s("xUrl"),
      linkedinUrl: s("linkedinUrl"),
      githubUrl: s("githubUrl"),
      webUrl: s("webUrl"),
      motivation: s("motivation"),
      outreachPlan: s("outreachPlan"),
    };
  } catch {
    return { ...EMPTY_FIELDS };
  }
}

function writeStoredFields(fields: StoredFields) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fields));
  } catch {
    /* ignore */
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

const panelBorder = "border-[3px] border-hs-ink bg-hs-ink";

const TRAVEL_PERK_INDEX = 5;

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

type Props = { locale: Locale };

export function AmbassadorPage({ locale }: Props) {
  const t = getCopy(locale).ambassador;
  const profile = useLayoutProfile();
  const homeHref = locale === "es" ? "/es" : "/";
  const travelTipId = useId();

  const appliedOnLoad = readAppliedFlag();
  const initialFields = appliedOnLoad ? EMPTY_FIELDS : readStoredFields();
  const [fullName, setFullName] = useState(initialFields.fullName);
  const [email, setEmail] = useState(initialFields.email);
  const [institution, setInstitution] = useState(initialFields.institution);
  const [cityRegion, setCityRegion] = useState(initialFields.cityRegion);
  const [xUrl, setXUrl] = useState(initialFields.xUrl);
  const [linkedinUrl, setLinkedinUrl] = useState(initialFields.linkedinUrl);
  const [githubUrl, setGithubUrl] = useState(initialFields.githubUrl);
  const [webUrl, setWebUrl] = useState(initialFields.webUrl);
  const [motivation, setMotivation] = useState(initialFields.motivation);
  const [outreachPlan, setOutreachPlan] = useState(initialFields.outreachPlan);
  const [status, setStatus] = useState<FlowStatus>(() => (appliedOnLoad ? "alreadyApplied" : "idle"));
  const [errorMessage, setErrorMessage] = useState("");

  function applyAgain() {
    clearAppliedFlag();
    clearStoredFields();
    setFullName("");
    setEmail("");
    setInstitution("");
    setCityRegion("");
    setXUrl("");
    setLinkedinUrl("");
    setGithubUrl("");
    setWebUrl("");
    setMotivation("");
    setOutreachPlan("");
    setErrorMessage("");
    setStatus("idle");
  }

  useEffect(() => {
    initBotId({
      protect: [{ path: "/api/ambassador", method: "POST" }],
    });
  }, []);

  useEffect(() => {
    if (status === "success" || status === "alreadyApplied") return;
    writeStoredFields({
      fullName,
      email,
      institution,
      cityRegion,
      xUrl,
      linkedinUrl,
      githubUrl,
      webUrl,
      motivation,
      outreachPlan,
    });
  }, [
    fullName,
    email,
    institution,
    cityRegion,
    xUrl,
    linkedinUrl,
    githubUrl,
    webUrl,
    motivation,
    outreachPlan,
    status,
  ]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");
    const payload = {
      fullName,
      email,
      institution,
      cityRegion,
      xUrl,
      linkedinUrl,
      githubUrl,
      webUrl,
      motivation,
      outreachPlan,
    };
    const parsed = parseAmbassadorBodyClient(payload);
    if (!parsed.ok) {
      if (parsed.code === "social_required") {
        setErrorMessage(t.errorSocialRequired);
      } else if (parsed.code === "invalid_social_url") {
        setErrorMessage(t.errorInvalidSocialUrl);
      } else if (parsed.code === "invalid_email") {
        setErrorMessage(t.errorInvalidEmail);
      } else if (parsed.code === "required_field") {
        setErrorMessage(t.errorRequiredFields);
      } else {
        setErrorMessage(t.errorGeneric);
      }
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/ambassador", {
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
        <section className={`mb-8 grid grid-cols-1 gap-0 ${panelBorder}`} aria-labelledby="ambassador-hero-title">
          <div className="relative overflow-hidden border-b-[3px] border-hs-ink bg-hs-navy px-4 py-6 sm:px-6 sm:py-8">
            <div
              className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-hs-gold/[0.22] blur-2xl sm:h-72 sm:w-72"
              aria-hidden
            />
            <div className="relative">
              <p className="font-bungee text-xs tracking-[0.12em] text-hs-gold sm:text-sm">{t.heroKicker}</p>
              <h1
                id="ambassador-hero-title"
                className="mt-2 font-bungee text-[clamp(1.35rem,4.5vw,2.35rem)] leading-[1.12] text-hs-paper"
              >
                {t.heroTitle}
              </h1>
              <p className="mt-3 max-w-2xl font-sans text-base font-semibold leading-snug text-hs-paper/88 sm:text-lg">
                {t.heroLead}
              </p>
              <a
                href="#ambassador-apply"
                className="mt-5 inline-flex border-[3px] border-hs-paper bg-hs-gold px-5 py-2.5 font-bungee text-sm text-hs-ink transition-[filter] hover:brightness-95"
              >
                {t.heroCta}
              </a>
            </div>
          </div>
        </section>

        <section className={`mb-8 grid grid-cols-1 gap-0 ${panelBorder}`} aria-labelledby="ambassador-duties-title">
          <div className="border-b-[3px] border-hs-ink bg-hs-orange px-4 py-4 sm:px-5">
            <h2 id="ambassador-duties-title" className="font-bungee text-xl text-hs-ink sm:text-2xl">
              {t.dutiesTitle}
            </h2>
          </div>
          <ul className="divide-y-[3px] divide-hs-ink bg-hs-paper">
            {t.duties.map((item, i) => (
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
              {t.selectionNoteTitle}
            </h2>
          </div>
          <p className="bg-hs-paper px-4 py-4 font-sans text-base font-semibold leading-snug text-hs-ink sm:px-5 sm:py-4 sm:text-[1.05rem]">
            {t.selectionNoteBody}
          </p>
        </section>

        <section className={`mb-8 grid grid-cols-1 gap-0 ${panelBorder}`} aria-labelledby="ambassador-perks-title">
          <div className="border-b-[3px] border-hs-ink bg-hs-navy px-4 py-4 sm:px-5">
            <h2 id="ambassador-perks-title" className="font-bungee text-xl text-hs-paper sm:text-2xl">
              {t.perksTitle}
            </h2>
            <p className="mt-2 max-w-2xl font-sans text-sm font-semibold leading-snug text-hs-paper/90 sm:text-base">
              {t.perksIntro}
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
              {t.perksItems.map((item, i) => (
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
                          aria-label={t.perksTravelInfoAria}
                        >
                          <PerkInfoIcon />
                        </button>
                      </div>
                      <span
                        id={travelTipId}
                        role="tooltip"
                        className="pointer-events-none invisible absolute bottom-[calc(100%+6px)] right-0 z-[80] w-[min(19rem,calc(100vw-2rem))] translate-y-0.5 border-[3px] border-hs-ink bg-hs-paper px-3 py-2.5 font-sans text-sm font-semibold leading-snug text-hs-ink opacity-0 shadow-[3px_3px_0_var(--color-hs-ink)] transition-[opacity,visibility,transform] duration-150 ease-out group-hover/travel:visible group-hover/travel:translate-y-0 group-hover/travel:opacity-100 group-focus-within/travel:visible group-focus-within/travel:translate-y-0 group-focus-within/travel:opacity-100"
                      >
                        {t.perksTravelTooltip}
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

        <div id="ambassador-apply" className={`grid grid-cols-1 gap-0 ${panelBorder}`}>
          <div className="border-b-[3px] border-hs-ink bg-hs-orange px-4 py-5">
            <h2 className="font-bungee text-2xl leading-tight text-hs-ink sm:text-3xl">{t.formTitle}</h2>
            <p className="mt-2 max-w-xl font-sans text-base font-semibold leading-snug text-hs-ink sm:text-lg">
              {t.formSubtitle}
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
              <form onSubmit={onSubmit} className="flex flex-col gap-0 border-t-[3px] border-hs-ink">
                <div className="grid gap-0 sm:grid-cols-2">
                  <label className="flex flex-col gap-1 border-b-[3px] border-hs-ink bg-hs-paper p-4 sm:border-r-[3px]">
                    <span className="font-bungee text-sm tracking-wide text-hs-ink">{t.fullName} *</span>
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
                    <span className="font-bungee text-sm tracking-wide text-hs-ink">{t.email} *</span>
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

                <div className="grid gap-0 sm:grid-cols-2">
                  <label className="flex flex-col gap-1 border-b-[3px] border-hs-ink bg-hs-paper p-4 sm:border-r-[3px]">
                    <span className="font-bungee text-sm tracking-wide text-hs-ink">{t.institution} *</span>
                    <input
                      className={inputClass}
                      name="institution"
                      autoComplete="organization"
                      required
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                    />
                  </label>
                  <label className="flex flex-col gap-1 border-b-[3px] border-hs-ink bg-hs-paper p-4">
                    <span className="font-bungee text-sm tracking-wide text-hs-ink">{t.cityRegion} *</span>
                    <input
                      className={inputClass}
                      name="cityRegion"
                      autoComplete="address-level2"
                      required
                      value={cityRegion}
                      onChange={(e) => setCityRegion(e.target.value)}
                    />
                  </label>
                </div>

                <div className="border-b-[3px] border-hs-ink bg-hs-teal/25 px-4 py-3">
                  <p className="font-bungee text-base tracking-wide text-hs-ink sm:text-lg">{t.socialsTitle}</p>
                  <p className="mt-1 font-sans text-sm font-semibold text-hs-ink sm:text-base">
                    {t.socialsRequiredHint}
                  </p>
                </div>
                <div className="grid gap-0 sm:grid-cols-2">
                  <label className="flex flex-col gap-1 border-b-[3px] border-hs-ink bg-hs-paper p-4 sm:border-r-[3px]">
                    <span className={sansLabelClass}>{t.x}</span>
                    <SocialPrefixInput
                      id="ambassador-x-url"
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
                      id="ambassador-linkedin-url"
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
                      id="ambassador-github-url"
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
                  <span className="font-bungee text-sm tracking-wide text-hs-ink">{t.motivation} *</span>
                  <span className={hintClass}>{t.motivationHint}</span>
                  <textarea
                    className={`${inputClass} min-h-[100px] resize-y`}
                    name="motivation"
                    rows={4}
                    required
                    value={motivation}
                    onChange={(e) => setMotivation(e.target.value)}
                  />
                </label>

                <label className="flex flex-col gap-1 border-b-[3px] border-hs-ink bg-hs-paper p-4">
                  <span className="font-bungee text-sm tracking-wide text-hs-ink">{t.outreachPlan} *</span>
                  <span className={hintClass}>{t.outreachPlanHint}</span>
                  <textarea
                    className={`${inputClass} min-h-[120px] resize-y`}
                    name="outreachPlan"
                    rows={5}
                    required
                    value={outreachPlan}
                    onChange={(e) => setOutreachPlan(e.target.value)}
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
